export interface Profile {
  id: string
  full_name: string | null
  phone_number: string | null
  address: string | null
  avatar_url: string | null
  loyalty_points: number
  created_at: string
  updated_at: string
}

export interface UserProfile {
  full_name: string
  phone_number: string
  address: string
  avatar_url?: string
  loyalty_points: number
}