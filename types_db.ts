import { Session } from '@supabase/supabase-js'

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      customers: {
        Row: {
          id: string
          stripe_customer_id: string | null
        }
        Insert: {
          id: string
          stripe_customer_id?: string | null
        }
        Update: {
          id?: string
          stripe_customer_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'customers_id_fkey'
            columns: ['id']
            referencedRelation: 'users'
            referencedColumns: ['id']
          },
        ]
      }
      achievements: {
        Row: {
          id: number
          created_at: string
          name: string | null
          description: string | null
        }
        Insert: {
          name?: string | null
          description?: string | null
        }
        Update: {
          name?: string | null
          description?: string | null
        }
        Relationships: []
      }
      achievements_users: {
        Row: {
          id: number
          user_id: string
          achievement_id: number
          created_at: string
        }
        Insert: {
          user_id: string
          achievement_id: number
        }
        Update: {
          user_id?: string
          achievement_id?: number
        }
        Relationships: [
          {
            foreignKeyName: 'achievements_users_achievement_id_fkey'
            columns: ['achievement_id']
            referencedRelation: 'achievements'
            referencedColumns: ['id']
          },
        ]
      }
      birth_charts_users: {
        Row: {
          id: number
          created_at: string
          user_id: string | null
          parameters: Json | null
        }
        Insert: {
          user_id?: string | null
          parameters?: Json | null
        }
        Update: {
          user_id?: string | null
          parameters?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: 'birth_charts_users_user_id_fkey'
            columns: ['user_id']
            referencedRelation: 'users'
            referencedColumns: ['id']
          },
        ]
      }
      caching_info: {
        Row: {
          id: number
          horoscopes_full: Json | null
          horoscopes_short: Json | null
          horoscopes_middle: Json | null
          full_cache_updated_at: string | null
          short_cache_updated_at: string | null
          middle_cache_updated_at: string | null
          news_info: Json | null
          news_updated_at: string | null
          created_at: string | null
        }
        Insert: {
          horoscopes_full?: Json | null
          horoscopes_short?: Json | null
          horoscopes_middle?: Json | null
          full_cache_updated_at?: string | null
          short_cache_updated_at?: string | null
          middle_cache_updated_at?: string | null
          news_info?: Json | null
          news_updated_at?: string | null
          created_at?: string | null
        }
        Update: {
          horoscopes_full?: Json | null
          horoscopes_short?: Json | null
          horoscopes_middle?: Json | null
          full_cache_updated_at?: string | null
          short_cache_updated_at?: string | null
          middle_cache_updated_at?: string | null
          news_info?: Json | null
          news_updated_at?: string | null
          created_at?: string | null
        }
        Relationships: []
      }
      comprehensive_cache: {
        Row: {
          id: number
          date: string
          sign: string
          period: string
          horoscope_data: Json | null
          energy_data: Json | null
          lunar_data: Json | null
          lucky_data: Json | null
          affirmation_data: Json | null
          biorhythm_data: Json | null
          power_hours_data: Json | null
          emotional_weather_data: Json | null
          compatibility_data: Json | null
          insights_data: Json | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          date: string
          sign: string
          period: string
          horoscope_data?: Json | null
          energy_data?: Json | null
          lunar_data?: Json | null
          lucky_data?: Json | null
          affirmation_data?: Json | null
          biorhythm_data?: Json | null
          power_hours_data?: Json | null
          emotional_weather_data?: Json | null
          compatibility_data?: Json | null
          insights_data?: Json | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: number
          date?: string
          sign?: string
          period?: string
          horoscope_data?: Json | null
          energy_data?: Json | null
          lunar_data?: Json | null
          lucky_data?: Json | null
          affirmation_data?: Json | null
          biorhythm_data?: Json | null
          power_hours_data?: Json | null
          emotional_weather_data?: Json | null
          compatibility_data?: Json | null
          insights_data?: Json | null
          created_at?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      chinese_horoscope_cache: {
        Row: {
          id: number
          date: string
          sign: string
          period: string
          horoscope_data: Json | null
          lucky_data: Json | null
          energy_data: Json | null
          daily_advice: string | null
          best_activity: string | null
          avoid_activity: string | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          date: string
          sign: string
          period: string
          horoscope_data?: Json | null
          lucky_data?: Json | null
          energy_data?: Json | null
          daily_advice?: string | null
          best_activity?: string | null
          avoid_activity?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: number
          date?: string
          sign?: string
          period?: string
          horoscope_data?: Json | null
          lucky_data?: Json | null
          energy_data?: Json | null
          daily_advice?: string | null
          best_activity?: string | null
          avoid_activity?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      images: {
        Row: {
          id: string
          short_id: string
          user_id: string | null
          prompt: string
          negative_prompt: string | null
          image_url: string
          thumbnail_url: string | null
          width: number
          height: number
          model: string
          model_style: string
          steps: number
          seed: number | null
          cfg_scale: number
          status: 'pending' | 'processing' | 'completed' | 'failed'
          format: 'jpeg' | 'png' | 'webp'
          created_at: string
          updated_at: string
          metadata: Json | null
          cost: number | null
          user_cost: number | null
        }
        Insert: {
          id?: string
          short_id: string
          user_id?: string | null
          prompt: string
          negative_prompt?: string | null
          image_url: string
          thumbnail_url?: string | null
          width: number
          height: number
          model: string
          model_style: string
          steps: number
          seed?: number | null
          cfg_scale: number
          status: 'pending' | 'processing' | 'completed' | 'failed'
          format: 'jpeg' | 'png' | 'webp'
          created_at?: string
          updated_at?: string
          metadata?: Json | null
          cost?: number | null
          user_cost?: number | null
        }
        Update: {
          id?: string
          short_id?: string
          user_id?: string | null
          prompt?: string
          negative_prompt?: string | null
          image_url?: string
          thumbnail_url?: string | null
          width?: number
          height?: number
          model?: string
          model_style?: string
          steps?: number
          seed?: number | null
          cfg_scale?: number
          status?: 'pending' | 'processing' | 'completed' | 'failed'
          format?: 'jpeg' | 'png' | 'webp'
          created_at?: string
          updated_at?: string
          metadata?: Json | null
          cost?: number | null
          user_cost?: number | null
        }
        Relationships: [
          {
            foreignKeyName: 'images_user_id_fkey'
            columns: ['user_id']
            referencedRelation: 'users'
            referencedColumns: ['id']
          },
        ]
      }
      songs: {
        Row: {
          id: string
          user_id: string | null
          title: string | null
          prompt: string | null
          negative_prompt: string | null
          song_url: string | null
          preview_url: string | null
          duration: number | null
          tempo: number | null
          model: string | null
          genre: Database['public']['Enums']['genre_type'] | null
          mood: string | null
          lyrics: string | null
          instruments: string[] | null
          vocals: boolean | null
          status: string | null
          created_at: string | null
          updated_at: string | null
          metadata: Json | null
          short_id: string
          format: Database['public']['Enums']['audio_format'] | null
          model_style: string | null
          cost: number | null
          user_cost: number | null
        }
        Insert: {
          id?: string
          user_id?: string | null
          title?: string | null
          prompt?: string | null
          negative_prompt?: string | null
          song_url?: string | null
          preview_url?: string | null
          duration?: number | null
          tempo?: number | null
          model?: string | null
          genre?: Database['public']['Enums']['genre_type'] | null
          mood?: string | null
          lyrics?: string | null
          instruments?: string[] | null
          vocals?: boolean | null
          status?: string | null
          created_at?: string | null
          updated_at?: string | null
          metadata?: Json | null
          short_id: string
          format?: Database['public']['Enums']['audio_format'] | null
          model_style?: string | null
          cost?: number | null
          user_cost?: number | null
        }
        Update: {
          id?: string
          user_id?: string | null
          title?: string | null
          prompt?: string | null
          negative_prompt?: string | null
          song_url?: string | null
          preview_url?: string | null
          duration?: number | null
          tempo?: number | null
          model?: string | null
          genre?: Database['public']['Enums']['genre_type'] | null
          mood?: string | null
          lyrics?: string | null
          instruments?: string[] | null
          vocals?: boolean | null
          status?: string | null
          created_at?: string | null
          updated_at?: string | null
          metadata?: Json | null
          short_id?: string
          format?: Database['public']['Enums']['audio_format'] | null
          model_style?: string | null
          cost?: number | null
          user_cost?: number | null
        }
        Relationships: [
          {
            foreignKeyName: 'songs_user_id_fkey'
            columns: ['user_id']
            referencedRelation: 'users'
            referencedColumns: ['id']
          },
        ]
      }
      presentations: {
        Row: {
          id: string
          user_id: string | null
          presentation_name: string
          presentation_data: string
          gpt_token: string | null
          last_modified: Date
          created_at: Date
          preview: string
          keywords: string[]
        }
        Insert: {
          id?: string
          user_id?: string | null
          presentation_name?: string
          presentation_data?: string
          gpt_token?: string | null
          last_modified?: Date
          created_at?: Date
          preview?: string
          keywords?: string[]
        }
        Update: {
          id?: string
          user_id?: string | null
          presentation_name?: string
          presentation_data?: string
          gpt_token?: string | null
          last_modified?: Date
          created_at?: Date
          preview?: string
          keywords?: string[]
        }
        Relationships: [
          {
            foreignKeyName: 'presentations_user_id_fkey'
            columns: ['user_id']
            referencedRelation: 'users'
            referencedColumns: ['id']
          },
        ]
      }
      one_time_token_gpt: {
        Row: {
          id: string
          code: string
          token_type: Session['token_type']
          access_token: Session['access_token']
          refresh_token: Session['refresh_token']
          expires_in: Session['expires_in']
          created_at: string | Date
        }
        Insert: Partial<{
          id: string
          code: string
          token_type: Session['token_type']
          access_token: Session['access_token']
          refresh_token: Session['refresh_token']
          expires_in: Session['expires_in']
          created_at: string | Date
        }>
        Update: Partial<{
          id: string
          code: string
          token_type: Session['token_type']
          access_token: Session['access_token']
          refresh_token: Session['refresh_token']
          expires_in: Session['expires_in']
          created_at: string | Date
        }>
        Relationships: []
      }
      prices: {
        Row: {
          active: boolean | null
          currency: string | null
          description: string | null
          id: string
          interval: Database['public']['Enums']['pricing_plan_interval'] | null
          interval_count: number | null
          metadata: Json | null
          product_id: string | null
          trial_period_days: number | null
          type: Database['public']['Enums']['pricing_type'] | null
          unit_amount: number | null
          product?: Database['public']['Tables']['products']['Row']
        }
        Insert: {
          active?: boolean | null
          currency?: string | null
          description?: string | null
          id: string
          interval?: Database['public']['Enums']['pricing_plan_interval'] | null
          interval_count?: number | null
          metadata?: Json | null
          product_id?: string | null
          trial_period_days?: number | null
          type?: Database['public']['Enums']['pricing_type'] | null
          unit_amount?: number | null
        }
        Update: {
          active?: boolean | null
          currency?: string | null
          description?: string | null
          id?: string
          interval?: Database['public']['Enums']['pricing_plan_interval'] | null
          interval_count?: number | null
          metadata?: Json | null
          product_id?: string | null
          trial_period_days?: number | null
          type?: Database['public']['Enums']['pricing_type'] | null
          unit_amount?: number | null
        }
        Relationships: [
          {
            foreignKeyName: 'prices_product_id_fkey'
            columns: ['product_id']
            referencedRelation: 'products'
            referencedColumns: ['id']
          },
        ]
      }
      products: {
        Row: {
          active: boolean | null
          description: string | null
          id: string
          image: string | null
          metadata: Json | null
          name: string | null
          prices?: Database['public']['Tables']['prices']['Row'][]
        }
        Insert: {
          active?: boolean | null
          description?: string | null
          id: string
          image?: string | null
          metadata?: Json | null
          name?: string | null
        }
        Update: {
          active?: boolean | null
          description?: string | null
          id?: string
          image?: string | null
          metadata?: Json | null
          name?: string | null
        }
        Relationships: []
      }
      subscriptions: {
        Row: {
          cancel_at: string | null
          cancel_at_period_end: boolean | null
          canceled_at: string | null
          created: string
          current_period_end: string
          current_period_start: string
          ended_at: string | null
          id: string
          metadata: Json | null
          price_id: string | null
          quantity: number | null
          status: Database['public']['Enums']['subscription_status'] | null
          trial_end: string | null
          trial_start: string | null
          user_id: string
          price?: Database['public']['Tables']['prices']['Row']
        }
        Insert: {
          cancel_at?: string | null
          cancel_at_period_end?: boolean | null
          canceled_at?: string | null
          created?: string
          current_period_end?: string
          current_period_start?: string
          ended_at?: string | null
          id: string
          metadata?: Json | null
          price_id?: string | null
          quantity?: number | null
          status?: Database['public']['Enums']['subscription_status'] | null
          trial_end?: string | null
          trial_start?: string | null
          user_id: string
        }
        Update: {
          cancel_at?: string | null
          cancel_at_period_end?: boolean | null
          canceled_at?: string | null
          created?: string
          current_period_end?: string
          current_period_start?: string
          ended_at?: string | null
          id?: string
          metadata?: Json | null
          price_id?: string | null
          quantity?: number | null
          status?: Database['public']['Enums']['subscription_status'] | null
          trial_end?: string | null
          trial_start?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'subscriptions_price_id_fkey'
            columns: ['price_id']
            referencedRelation: 'prices'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'subscriptions_user_id_fkey'
            columns: ['user_id']
            referencedRelation: 'users'
            referencedColumns: ['id']
          },
        ]
      }
      users: {
        Row: {
          id: string
          email: string
          full_name: string | null
          avatar_url: string | null
          billing_address: Json | null
          payment_method: Json | null
          consent_status: Database['public']['Enums']['consent_status']
          user_request: string | null
          gpt_id: string | null
          auth_id: string | null
          password_hash: string | null
          ip_address: string | null
          geo_location: string | null
          created_at: string | null
        }
        Insert: {
          id?: string
          email?: string
          full_name?: string | null
          avatar_url?: string | null
          billing_address?: Json | null
          payment_method?: Json | null
          consent_status?: Database['public']['Enums']['consent_status']
          user_request?: string | null
          gpt_id?: string | null
          auth_id?: string | null
          password_hash?: string | null
          ip_address?: string | null
          geo_location?: string | null
          created_at?: string | null
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          avatar_url?: string | null
          billing_address?: Json | null
          payment_method?: Json | null
          consent_status?: Database['public']['Enums']['consent_status']
          user_request?: string | null
          gpt_id?: string | null
          auth_id?: string | null
          password_hash?: string | null
          ip_address?: string | null
          geo_location?: string | null
          created_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'users_id_fkey'
            columns: ['id']
            referencedRelation: 'users'
            referencedColumns: ['id']
          },
        ]
      }

      deleted_images: {
        Row: {
          id: string
          original_image_id: string
          user_id: string | null
          short_id: string
          prompt: string
          negative_prompt: string | null
          image_url: string
          thumbnail_url: string | null
          width: number
          height: number
          model: string
          model_style: string
          steps: number
          seed: number | null
          cfg_scale: number
          status: string
          format: string
          cost: number | null
          user_cost: number | null
          created_at: string
          deleted_at: string
          restore_available_until: string
          metadata: Json | null
        }
        Insert: {
          id?: string
          original_image_id: string
          user_id?: string | null
          short_id: string
          prompt: string
          negative_prompt?: string | null
          image_url: string
          thumbnail_url?: string | null
          width: number
          height: number
          model: string
          model_style: string
          steps: number
          seed?: number | null
          cfg_scale: number
          status: string
          format: string
          cost?: number | null
          user_cost?: number | null
          created_at: string
          deleted_at: string
          restore_available_until: string
          metadata?: Json | null
        }
        Update: {
          id?: string
          original_image_id?: string
          user_id?: string | null
          short_id?: string
          prompt?: string
          negative_prompt?: string | null
          image_url?: string
          thumbnail_url?: string | null
          width?: number
          height?: number
          model?: string
          model_style?: string
          steps?: number
          seed?: number | null
          cfg_scale?: number
          status?: string
          format?: string
          cost?: number | null
          user_cost?: number | null
          created_at?: string
          deleted_at?: string
          restore_available_until?: string
          metadata?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: 'deleted_images_user_id_fkey'
            columns: ['user_id']
            referencedRelation: 'users'
            referencedColumns: ['id']
          },
        ]
      }
      deleted_subscriptions: {
        Row: {
          id: string
          original_subscription_id: string
          user_id: string
          status: Database['public']['Enums']['subscription_status'] | null
          price_id: string | null
          quantity: number | null
          cancel_at_period_end: boolean | null
          created: string
          current_period_start: string
          current_period_end: string
          ended_at: string | null
          cancel_at: string | null
          canceled_at: string | null
          trial_start: string | null
          trial_end: string | null
          deleted_at: string
          metadata: Json | null
        }
        Insert: {
          id?: string
          original_subscription_id: string
          user_id: string
          status?: Database['public']['Enums']['subscription_status'] | null
          price_id?: string | null
          quantity?: number | null
          cancel_at_period_end?: boolean | null
          created: string
          current_period_start: string
          current_period_end: string
          ended_at?: string | null
          cancel_at?: string | null
          canceled_at?: string | null
          trial_start?: string | null
          trial_end?: string | null
          deleted_at: string
          metadata?: Json | null
        }
        Update: {
          id?: string
          original_subscription_id?: string
          user_id?: string
          status?: Database['public']['Enums']['subscription_status'] | null
          price_id?: string | null
          quantity?: number | null
          cancel_at_period_end?: boolean | null
          created?: string
          current_period_start?: string
          current_period_end?: string
          ended_at?: string | null
          cancel_at?: string | null
          canceled_at?: string | null
          trial_start?: string | null
          trial_end?: string | null
          deleted_at?: string
          metadata?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: 'deleted_subscriptions_user_id_fkey'
            columns: ['user_id']
            referencedRelation: 'users'
            referencedColumns: ['id']
          },
        ]
      }
      user_info: {
        Row: {
          id: string
          user_id: string
          short_id: string
          name: string | null
          birth_date: string | null
          birth_time: string | null
          birth_location: string | null
          zodiak_sign: string | null
          birth_chart_info: Json | null
          narcissistic_awareness_result: string | null
          metadata: Json | null
          cost: number | null
          user_cost: number | null
          mbti_test_results: Json | null
          life_path: number | null
          psychological_patterns: Json | null
          psychological_journey: Json | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          short_id: string
          name?: string | null
          birth_date?: string | null
          birth_time?: string | null
          birth_location?: string | null
          zodiak_sign?: string | null
          birth_chart_info?: Json | null
          narcissistic_awareness_result?: string | null
          metadata?: Json | null
          cost?: number | null
          user_cost?: number | null
          mbti_test_results?: Json | null
          life_path?: number | null
          psychological_patterns?: Json | null
          psychological_journey?: Json | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          short_id?: string
          name?: string | null
          birth_date?: string | null
          birth_time?: string | null
          birth_location?: string | null
          zodiak_sign?: string | null
          birth_chart_info?: Json | null
          narcissistic_awareness_result?: string | null
          metadata?: Json | null
          cost?: number | null
          user_cost?: number | null
          mbti_test_results?: Json | null
          life_path?: number | null
          psychological_patterns?: Json | null
          psychological_journey?: Json | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: 'user_info_user_id_fkey'
            columns: ['user_id']
            referencedRelation: 'users'
            referencedColumns: ['id']
          },
        ]
      }
      journal_user: {
        Row: {
          id: string
          user_id: string
          message: string | null
          created_at: string
        }
        Insert: {
          user_id?: string
          message?: string | null
          created_at?: string
        }
        Update: {
          user_id?: string
          message?: string | null
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: 'journal_user_user_id_fkey'
            columns: ['user_id']
            referencedRelation: 'users'
            referencedColumns: ['id']
          },
        ]
      }
      mcp_oauth_codes: {
        Row: {
          code: string
          client_id: string
          user_id: string
          redirect_uri: string
          scope: string
          code_challenge: string
          code_challenge_method: string
          resource: string | null
          state: string
          expires_at: string
          created_at: string
        }
        Insert: {
          code: string
          client_id: string
          user_id: string
          redirect_uri: string
          scope?: string
          code_challenge: string
          code_challenge_method: string
          resource?: string | null
          state: string
          expires_at: string
          created_at?: string
        }
        Update: Partial<{
          code: string
          client_id: string
          user_id: string
          redirect_uri: string
          scope: string
          code_challenge: string
          code_challenge_method: string
          resource: string | null
          state: string
          expires_at: string
          created_at: string
        }>
        Relationships: []
      }
      mcp_oauth_states: {
        Row: {
          id: string
          client_id: string
          redirect_uri: string
          scope: string
          state: string
          code_challenge: string
          code_challenge_method: string
          resource: string | null
          expires_at: string
          created_at: string
        }
        Insert: {
          id?: string
          client_id: string
          redirect_uri: string
          scope?: string
          state: string
          code_challenge: string
          code_challenge_method: string
          resource?: string | null
          expires_at: string
          created_at?: string
        }
        Update: Partial<{
          id: string
          client_id: string
          redirect_uri: string
          scope: string
          state: string
          code_challenge: string
          code_challenge_method: string
          resource: string | null
          expires_at: string
          created_at: string
        }>
        Relationships: []
      }
    }
    Views: {
      v_gpt_callback: {
        Row: {
          id: number
          create_at: Date
          gpt_id: string
          gpt: string | null
        }

        Relationships: []
      }
    }

    Functions: {
      [_ in never]: never
    }
    Enums: {
      consent_status: 'not_specified' | 'consented' | 'declined'
      pricing_plan_interval: 'day' | 'week' | 'month' | 'year'
      pricing_type: 'one_time' | 'recurring'
      subscription_status:
        | 'trialing'
        | 'active'
        | 'canceled'
        | 'incomplete'
        | 'incomplete_expired'
        | 'past_due'
        | 'unpaid'
        | 'paused'
      audio_format: 'mp3' | 'wav' | 'ogg' | 'flac'
      genre_type:
        | 'pop'
        | 'rock'
        | 'electronic'
        | 'hip_hop'
        | 'jazz'
        | 'classical'
        | 'folk'
        | 'ambient'
        | 'other'
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
