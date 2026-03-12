export interface Database {
  public: {
    Tables: {
      achievements: {
        Row: {
          id: number
          created_at: string
          name: string
          description: string
        }
        Insert: {
          name: string
          description: string
        }
        Update: {
          name?: string
          description?: string
        }
      }
      achievements_users: {
        Row: {
          id: number
          created_at: string
          achievement_id: number
          user_id: string
        }
        Insert: {
          achievement_id: number
          user_id: string
        }
        Update: {
          achievement_id?: number
          user_id?: string
        }
      }
      caching_info: {
        Row: {
          id: string
          news_info: {
            timeWindow: {
              from: string
              to: string
            }
            timezone: string
            news: {
              date: string
              title: string
              description: string
              source: string
              category: string
            }[]
            events: {
              date: string
              eventType: string
              title: string
              description: string
              advice: string
              severity?: string
            }[]
          }
          news_updated_at: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          news_info: {
            timeWindow: {
              from: string
              to: string
            }
            timezone: string
            news: {
              date: string
              title: string
              description: string
              source: string
              category: string
            }[]
            events: {
              date: string
              eventType: string
              title: string
              description: string
              advice: string
              severity?: string
            }[]
          }
          news_updated_at?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          news_info?: {
            timeWindow: {
              from: string
              to: string
            }
            timezone: string
            news: {
              date: string
              title: string
              description: string
              source: string
              category: string
            }[]
            events: {
              date: string
              eventType: string
              title: string
              description: string
              advice: string
              severity?: string
            }[]
          }
          news_updated_at?: string
          created_at?: string
          updated_at?: string
        }
      }
      journal_user: {
        Row: {
          id: number
          user_id: string
          message: string
          created_at: string
        }
        Insert: {
          user_id: string
          message: string
          created_at?: string
        }
        Update: {
          user_id?: string
          message?: string
          created_at?: string
        }
      }
    }
  }
}
