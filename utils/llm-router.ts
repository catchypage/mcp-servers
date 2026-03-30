// Check if we're running on the client or server
const isClient = typeof window !== 'undefined'

/*
 * LLM Router configuration
 * On client side, we'll use the API route instead of direct connection
 */
const LLM_ROUTER_BASE_URL =
  process.env.NEXT_PUBLIC_LLM_ROUTER_BASE_URL || process.env.LLM_ROUTER_BASE_URL
const LLM_ROUTER_BEARER_TOKEN =
  process.env.NEXT_PUBLIC_LLM_ROUTER_BEARER_TOKEN ||
  process.env.LLM_ROUTER_BEARER_TOKEN

// Only check for env vars on server side
if (!isClient && (!LLM_ROUTER_BASE_URL || !LLM_ROUTER_BEARER_TOKEN)) {
  throw new Error(
    'LLM_ROUTER_BASE_URL and LLM_ROUTER_BEARER_TOKEN must be set in environment variables',
  )
}

// Простой in-memory кеш для предотвращения дублирующихся запросов
const pendingRequests = new Map<string, Promise<string>>()

function getRequestKey(request: LLMRouterRequest): string {
  // Создаем уникальный ключ на основе system + user промптов
  return `${request.system.substring(0, 100)}_${request.user.substring(0, 100)}`
}

interface LLMRouterRequest {
  system: string
  user: string
  temperature?: number
  model?: string // если указана — v1/smart с этой моделью, иначе v1/generate
  skipDedup?: boolean // отключить deduplication (нужно для агентных циклов)
}

interface LLMRouterResponse {
  text?: string // LLM Router возвращает поле "text", а не "response"
  request_id?: string
  provider?: string
  model?: string
  usage?: {
    prompt_tokens: number
    total_tokens: number
    completion_tokens: number
  }
  duration_ms?: number
  attempts?: number
  failedProviders?: string[]
}

/**
 * Вызов LLM Router API с увеличенным таймаутом для длинных запросов
 * Защита от дублирующихся запросов: если такой же запрос уже выполняется, возвращаем его результат
 * @param request - параметры запроса (system, user, temperature)
 * @param timeoutMs - таймаут в миллисекундах (по умолчанию 55 секунд)
 */
export async function callLLMRouter(
  request: LLMRouterRequest,
  timeoutMs = 55000,
): Promise<string> {
  /*
   * Проверяем, не выполняется ли уже такой же запрос (только если skipDedup не
   * задан)
   */
  const requestKey = getRequestKey(request)
  if (!request.skipDedup) {
    const existingRequest = pendingRequests.get(requestKey)
    if (existingRequest) {
      console.log('⚠️ Обнаружен дублирующийся запрос, ждем результата...')
      return existingRequest
    }
  }

  // Создаем промис для запроса
  const requestPromise = (async () => {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs)

    try {
      /*
       * Use API route on client side, direct connection on server side
       * model задан → v1/smart (с моделью), иначе → v1/generate (без модели)
       */
      const endpoint = request.model ? 'v1/smart' : 'v1/generatev2'
      const url = isClient
        ? '/api/llm-router'
        : `${LLM_ROUTER_BASE_URL}/${endpoint}`

      const headers: HeadersInit = {
        'Content-Type': 'application/json',
      }

      // Only add Authorization header for direct server-side requests
      if (!isClient) {
        headers.Authorization = `Bearer ${LLM_ROUTER_BEARER_TOKEN}`
      }

      const body: Record<string, any> = {
        system: request.system,
        user: request.user,
        temperature: request.temperature,
        max_output_tokens: 25000,
      }
      if (request.model) {
        body.model = request.model
      }

      const response = await fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify(body),
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      if (!response.ok) {
        const errorText = await response.text()
        console.error(`❌ LLM Router error response:`, {
          status: response.status,
          statusText: response.statusText,
          errorBody: errorText.substring(0, 500),
        })
        throw new Error(
          `LLM Router API error: ${response.status} ${response.statusText}`,
        )
      }

      // Получаем raw text для логирования
      const rawText = await response.text()
      console.log('📥 Raw response from LLM Router:', {
        length: rawText.length,
        preview: rawText.substring(0, 500), // увеличили preview
        isClient,
        url: isClient ? '/api/llm-router' : 'direct LLM Router',
      })

      // Парсим JSON
      let result: LLMRouterResponse
      try {
        result = JSON.parse(rawText) as LLMRouterResponse
      } catch (parseError) {
        console.error(
          '❌ Failed to parse LLM Router response as JSON:',
          parseError,
        )
        console.error('Raw text:', rawText.substring(0, 1000))
        throw new Error('Invalid JSON response from LLM Router')
      }

      // Детальное логирование для отладки
      console.log('📦 LLM Router response structure:', {
        hasText: !!result.text,
        provider: result.provider,
        model: result.model,
        durationMs: result.duration_ms,
        attempts: result.attempts,
        textLength: result.text?.length ?? 0,
        textPreview: result.text
          ? result.text.substring(0, 100)
          : 'NO TEXT FIELD',
      })

      const responseText = result.text

      if (!responseText || responseText.trim() === '') {
        console.error('❌ LLM Router returned empty text field!')
        console.error('Full result:', JSON.stringify(result, null, 2))
        console.error('Usage info:', {
          prompt_tokens: result.usage?.prompt_tokens,
          completion_tokens: result.usage?.completion_tokens,
          total_tokens: result.usage?.total_tokens,
        })
        console.error('Request details:', {
          request_id: result.request_id,
          provider: result.provider,
          model: result.model,
          duration_ms: result.duration_ms,
          attempts: result.attempts,
          failedProviders: result.failedProviders,
        })
        throw new Error(
          `LLM Router returned empty response (request_id: ${result.request_id}, provider: ${result.provider}, completion_tokens: ${result.usage?.completion_tokens})`,
        )
      }

      console.log(
        `✅ Получен ответ от LLM Router (${result.provider}, ${result.duration_ms}ms, ${responseText.length} chars)`,
      )
      return responseText
    } catch (error) {
      clearTimeout(timeoutId)
      if (error instanceof Error && error.name === 'AbortError') {
        throw new Error(`LLM Router request timeout after ${timeoutMs}ms`)
      }
      throw error
    } finally {
      // Удаляем запрос из кеша после завершения
      pendingRequests.delete(requestKey)
    }
  })()

  // Сохраняем промис в кеше (только если dedup не отключен)
  if (!request.skipDedup) {
    pendingRequests.set(requestKey, requestPromise)
  }

  return requestPromise
}

/**
 * Вызов LLM Router API с повторными попытками
 * По умолчанию: 2 попытки с таймаутом 55 секунд и задержкой 10 секунд между
 * попытками
 */
export async function callLLMRouterWithRetry(
  request: LLMRouterRequest,
  maxRetries = 2,
  timeoutMs = 55000,
): Promise<string> {
  const RETRY_DELAY = 10000 // 10 секунд между попытками

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      console.log(
        `🚀 Попытка ${attempt}/${maxRetries}: Отправляем запрос к LLM Router (таймаут: ${timeoutMs}ms)...`,
      )

      const response = await callLLMRouter(request, timeoutMs)

      console.log(
        `✅ Попытка ${attempt}/${maxRetries}: Успешно получен ответ от LLM Router`,
      )

      return response
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error)
      console.error(
        `❌ Попытка ${attempt}/${maxRetries} провалилась: ${errorMessage}`,
      )

      if (attempt === maxRetries) {
        console.error(
          `❌ Все ${maxRetries} попытки провалились, выбрасываем ошибку`,
        )
        throw error
      }

      console.log(
        `⏳ Ждем ${RETRY_DELAY}ms перед следующей попыткой (${
          attempt + 1
        }/${maxRetries})...`,
      )
      await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY))
    }
  }

  throw new Error('Failed to get response from LLM Router')
}
