/**
 * i18n for Lang Coach widget UI.
 * 10 locales: en, ru, es, pt, hi, tr, zh, ja, ko, ar.
 */

export type Locale =
  | 'en'
  | 'ru'
  | 'es'
  | 'pt'
  | 'hi'
  | 'tr'
  | 'zh'
  | 'ja'
  | 'ko'
  | 'ar'

export interface UiStrings {
  appTitle: string
  placementTitle: string
  placementSubtitle: string
  startTest: string
  questionOf: string
  next: string
  finish: string
  skip: string
  yourLevel: string
  resultTitle: string
  resultDescription: string
  breakdown: string
  correct: string
  tryAgain: string
  grammar: string
  vocabulary: string
  reading: string
  useOfEnglish: string
  levelA1: string
  levelA2: string
  levelB1: string
  levelB2: string
  levelC1: string
  selectAnswer: string
  loading: string
  errorLoad: string
  retry: string
}

/* ═══════════════════════════════════════════════════════════════════════ */

const en: UiStrings = {
  appTitle: 'Lang Coach',
  placementTitle: 'English Level Test',
  placementSubtitle:
    'Answer 50 questions to determine your English level. Take your time — there is no time limit.',
  startTest: 'Start Test',
  questionOf: 'Question {n} of {total}',
  next: 'Next',
  finish: 'Finish',
  skip: 'Skip',
  yourLevel: 'Your level',
  resultTitle: 'Your English Level',
  resultDescription: 'Based on your answers, your approximate level is:',
  breakdown: 'Score breakdown',
  correct: 'correct',
  tryAgain: 'Take the test again',
  grammar: 'Grammar',
  vocabulary: 'Vocabulary',
  reading: 'Reading',
  useOfEnglish: 'Use of English',
  levelA1: 'A1 — Beginner',
  levelA2: 'A2 — Elementary',
  levelB1: 'B1 — Intermediate',
  levelB2: 'B2 — Upper-Intermediate',
  levelC1: 'C1 — Advanced',
  selectAnswer: 'Select an answer',
  loading: 'Loading questions…',
  errorLoad: 'Failed to load questions. Please try again.',
  retry: 'Retry',
}

const ru: UiStrings = {
  appTitle: 'Lang Coach',
  placementTitle: 'Тест на уровень английского',
  placementSubtitle:
    'Ответьте на 50 вопросов, чтобы определить ваш уровень. Не торопитесь — время не ограничено.',
  startTest: 'Начать тест',
  questionOf: 'Вопрос {n} из {total}',
  next: 'Далее',
  finish: 'Завершить',
  skip: 'Пропустить',
  yourLevel: 'Ваш уровень',
  resultTitle: 'Ваш уровень английского',
  resultDescription: 'На основании ваших ответов, ваш примерный уровень:',
  breakdown: 'Результаты по разделам',
  correct: 'правильно',
  tryAgain: 'Пройти тест ещё раз',
  grammar: 'Грамматика',
  vocabulary: 'Лексика',
  reading: 'Чтение',
  useOfEnglish: 'Использование языка',
  levelA1: 'A1 — Начинающий',
  levelA2: 'A2 — Элементарный',
  levelB1: 'B1 — Средний',
  levelB2: 'B2 — Выше среднего',
  levelC1: 'C1 — Продвинутый',
  selectAnswer: 'Выберите ответ',
  loading: 'Загрузка вопросов…',
  errorLoad: 'Не удалось загрузить вопросы. Попробуйте ещё раз.',
  retry: 'Повторить',
}

const es: UiStrings = {
  appTitle: 'Lang Coach',
  placementTitle: 'Test de nivel de inglés',
  placementSubtitle:
    'Responde 50 preguntas para determinar tu nivel de inglés. Tómate tu tiempo — no hay límite.',
  startTest: 'Iniciar test',
  questionOf: 'Pregunta {n} de {total}',
  next: 'Siguiente',
  finish: 'Finalizar',
  skip: 'Omitir',
  yourLevel: 'Tu nivel',
  resultTitle: 'Tu nivel de inglés',
  resultDescription: 'Según tus respuestas, tu nivel aproximado es:',
  breakdown: 'Desglose de puntuación',
  correct: 'correctas',
  tryAgain: 'Repetir el test',
  grammar: 'Gramática',
  vocabulary: 'Vocabulario',
  reading: 'Lectura',
  useOfEnglish: 'Uso del inglés',
  levelA1: 'A1 — Principiante',
  levelA2: 'A2 — Elemental',
  levelB1: 'B1 — Intermedio',
  levelB2: 'B2 — Intermedio alto',
  levelC1: 'C1 — Avanzado',
  selectAnswer: 'Selecciona una respuesta',
  loading: 'Cargando preguntas…',
  errorLoad: 'Error al cargar las preguntas. Inténtalo de nuevo.',
  retry: 'Reintentar',
}

const pt: UiStrings = {
  appTitle: 'Lang Coach',
  placementTitle: 'Teste de nível de inglês',
  placementSubtitle:
    'Responda 50 perguntas para determinar seu nível de inglês. Sem pressa — não há limite de tempo.',
  startTest: 'Iniciar teste',
  questionOf: 'Pergunta {n} de {total}',
  next: 'Próxima',
  finish: 'Finalizar',
  skip: 'Pular',
  yourLevel: 'Seu nível',
  resultTitle: 'Seu nível de inglês',
  resultDescription: 'Com base nas suas respostas, seu nível aproximado é:',
  breakdown: 'Detalhamento da pontuação',
  correct: 'corretas',
  tryAgain: 'Fazer o teste novamente',
  grammar: 'Gramática',
  vocabulary: 'Vocabulário',
  reading: 'Leitura',
  useOfEnglish: 'Uso do inglês',
  levelA1: 'A1 — Iniciante',
  levelA2: 'A2 — Elementar',
  levelB1: 'B1 — Intermediário',
  levelB2: 'B2 — Intermediário superior',
  levelC1: 'C1 — Avançado',
  selectAnswer: 'Selecione uma resposta',
  loading: 'Carregando perguntas…',
  errorLoad: 'Falha ao carregar perguntas. Tente novamente.',
  retry: 'Tentar novamente',
}

const hi: UiStrings = {
  appTitle: 'Lang Coach',
  placementTitle: 'अंग्रेज़ी स्तर परीक्षा',
  placementSubtitle:
    'अपना अंग्रेज़ी स्तर जानने के लिए 50 प्रश्नों के उत्तर दें। जल्दी न करें — कोई समय सीमा नहीं है।',
  startTest: 'परीक्षा शुरू करें',
  questionOf: 'प्रश्न {n} / {total}',
  next: 'अगला',
  finish: 'समाप्त',
  skip: 'छोड़ें',
  yourLevel: 'आपका स्तर',
  resultTitle: 'आपका अंग्रेज़ी स्तर',
  resultDescription: 'आपके उत्तरों के आधार पर, आपका अनुमानित स्तर है:',
  breakdown: 'अंकों का विवरण',
  correct: 'सही',
  tryAgain: 'फिर से परीक्षा दें',
  grammar: 'व्याकरण',
  vocabulary: 'शब्दावली',
  reading: 'पठन',
  useOfEnglish: 'अंग्रेज़ी का प्रयोग',
  levelA1: 'A1 — शुरुआती',
  levelA2: 'A2 — प्राथमिक',
  levelB1: 'B1 — मध्यवर्ती',
  levelB2: 'B2 — उच्च मध्यवर्ती',
  levelC1: 'C1 — उन्नत',
  selectAnswer: 'एक उत्तर चुनें',
  loading: 'प्रश्न लोड हो रहे हैं…',
  errorLoad: 'प्रश्न लोड करने में विफल। कृपया पुनः प्रयास करें।',
  retry: 'पुनः प्रयास',
}

const tr: UiStrings = {
  appTitle: 'Lang Coach',
  placementTitle: 'İngilizce Seviye Testi',
  placementSubtitle:
    'İngilizce seviyenizi belirlemek için 50 soruyu cevaplayın. Aceleniz yok — süre sınırı yoktur.',
  startTest: 'Teste Başla',
  questionOf: 'Soru {n} / {total}',
  next: 'Sonraki',
  finish: 'Bitir',
  skip: 'Atla',
  yourLevel: 'Seviyeniz',
  resultTitle: 'İngilizce Seviyeniz',
  resultDescription: 'Yanıtlarınıza göre tahmini seviyeniz:',
  breakdown: 'Puan dağılımı',
  correct: 'doğru',
  tryAgain: 'Testi tekrar çöz',
  grammar: 'Dilbilgisi',
  vocabulary: 'Kelime bilgisi',
  reading: 'Okuma',
  useOfEnglish: 'İngilizce kullanımı',
  levelA1: 'A1 — Başlangıç',
  levelA2: 'A2 — Temel',
  levelB1: 'B1 — Orta',
  levelB2: 'B2 — Orta üstü',
  levelC1: 'C1 — İleri',
  selectAnswer: 'Bir cevap seçin',
  loading: 'Sorular yükleniyor…',
  errorLoad: 'Sorular yüklenemedi. Lütfen tekrar deneyin.',
  retry: 'Tekrar dene',
}

const zh: UiStrings = {
  appTitle: 'Lang Coach',
  placementTitle: '英语水平测试',
  placementSubtitle: '回答50道题来确定你的英语水平。不要着急——没有时间限制。',
  startTest: '开始测试',
  questionOf: '第 {n} 题，共 {total} 题',
  next: '下一题',
  finish: '完成',
  skip: '跳过',
  yourLevel: '你的水平',
  resultTitle: '你的英语水平',
  resultDescription: '根据你的答题情况，你的大致水平为：',
  breakdown: '分数明细',
  correct: '正确',
  tryAgain: '重新测试',
  grammar: '语法',
  vocabulary: '词汇',
  reading: '阅读',
  useOfEnglish: '英语运用',
  levelA1: 'A1 — 入门',
  levelA2: 'A2 — 基础',
  levelB1: 'B1 — 中级',
  levelB2: 'B2 — 中高级',
  levelC1: 'C1 — 高级',
  selectAnswer: '请选择一个答案',
  loading: '正在加载题目…',
  errorLoad: '加载题目失败，请重试。',
  retry: '重试',
}

const ja: UiStrings = {
  appTitle: 'Lang Coach',
  placementTitle: '英語レベルテスト',
  placementSubtitle:
    '50問に答えて英語レベルを判定します。時間制限はありません。',
  startTest: 'テスト開始',
  questionOf: '問題 {n} / {total}',
  next: '次へ',
  finish: '完了',
  skip: 'スキップ',
  yourLevel: 'あなたのレベル',
  resultTitle: 'あなたの英語レベル',
  resultDescription: '回答に基づくおおよそのレベル：',
  breakdown: 'スコア内訳',
  correct: '正解',
  tryAgain: 'もう一度テストする',
  grammar: '文法',
  vocabulary: '語彙',
  reading: '読解',
  useOfEnglish: '英語運用',
  levelA1: 'A1 — 入門',
  levelA2: 'A2 — 初級',
  levelB1: 'B1 — 中級',
  levelB2: 'B2 — 中上級',
  levelC1: 'C1 — 上級',
  selectAnswer: '答えを選んでください',
  loading: '問題を読み込み中…',
  errorLoad: '問題の読み込みに失敗しました。もう一度お試しください。',
  retry: '再試行',
}

const ko: UiStrings = {
  appTitle: 'Lang Coach',
  placementTitle: '영어 레벨 테스트',
  placementSubtitle:
    '50개 문제에 답하여 영어 수준을 확인하세요. 시간 제한은 없습니다.',
  startTest: '테스트 시작',
  questionOf: '문제 {n} / {total}',
  next: '다음',
  finish: '완료',
  skip: '건너뛰기',
  yourLevel: '당신의 레벨',
  resultTitle: '당신의 영어 레벨',
  resultDescription: '응답을 기반으로 한 대략적인 레벨:',
  breakdown: '점수 상세',
  correct: '정답',
  tryAgain: '다시 테스트하기',
  grammar: '문법',
  vocabulary: '어휘',
  reading: '독해',
  useOfEnglish: '영어 활용',
  levelA1: 'A1 — 입문',
  levelA2: 'A2 — 초급',
  levelB1: 'B1 — 중급',
  levelB2: 'B2 — 중상급',
  levelC1: 'C1 — 고급',
  selectAnswer: '답을 선택하세요',
  loading: '문제를 불러오는 중…',
  errorLoad: '문제를 불러오지 못했습니다. 다시 시도해 주세요.',
  retry: '재시도',
}

const ar: UiStrings = {
  appTitle: 'Lang Coach',
  placementTitle: 'اختبار مستوى اللغة الإنجليزية',
  placementSubtitle:
    'أجب عن 50 سؤالاً لتحديد مستواك في اللغة الإنجليزية. خذ وقتك — لا يوجد حدّ زمني.',
  startTest: 'ابدأ الاختبار',
  questionOf: 'السؤال {n} من {total}',
  next: 'التالي',
  finish: 'إنهاء',
  skip: 'تخطّي',
  yourLevel: 'مستواك',
  resultTitle: 'مستواك في اللغة الإنجليزية',
  resultDescription: 'بناءً على إجاباتك، مستواك التقريبي هو:',
  breakdown: 'تفاصيل النتيجة',
  correct: 'صحيحة',
  tryAgain: 'أعد الاختبار',
  grammar: 'القواعد',
  vocabulary: 'المفردات',
  reading: 'القراءة',
  useOfEnglish: 'استخدام اللغة',
  levelA1: 'A1 — مبتدئ',
  levelA2: 'A2 — أساسي',
  levelB1: 'B1 — متوسط',
  levelB2: 'B2 — فوق المتوسط',
  levelC1: 'C1 — متقدم',
  selectAnswer: 'اختر إجابة',
  loading: 'جارٍ تحميل الأسئلة…',
  errorLoad: 'فشل تحميل الأسئلة. يرجى المحاولة مرة أخرى.',
  retry: 'إعادة المحاولة',
}

const STRINGS: Record<Locale, UiStrings> = {
  en,
  ru,
  es,
  pt,
  hi,
  tr,
  zh,
  ja,
  ko,
  ar,
}

export const LOCALE_LABELS: Record<Locale, string> = {
  en: 'EN',
  ru: 'RU',
  es: 'ES',
  pt: 'PT',
  hi: 'हिं',
  tr: 'TR',
  zh: '中',
  ja: '日',
  ko: '한',
  ar: 'ع',
}

export const ALL_LOCALES: Locale[] = [
  'en',
  'ru',
  'es',
  'pt',
  'hi',
  'tr',
  'zh',
  'ja',
  'ko',
  'ar',
]

export function t(locale: Locale): UiStrings {
  return STRINGS[locale] ?? STRINGS.en
}

export function fmt(
  template: string,
  vars: Record<string, string | number>,
): string {
  let result = template
  for (const [k, v] of Object.entries(vars)) {
    result = result.replace(`{${k}}`, String(v))
  }
  return result
}
