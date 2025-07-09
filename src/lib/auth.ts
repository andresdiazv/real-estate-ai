import { createClient } from '@supabase/supabase-js'
import { User, Session } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please check your .env.local file.')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
})

// User profile interface
export interface UserProfile {
  id: string
  email: string
  full_name: string
  phone?: string
  user_type: 'buyer' | 'seller' | 'agent'
  avatar_url?: string
  preferences?: {
    favorite_properties?: string[]
    saved_searches?: any[]
    notifications?: boolean
  }
  created_at: string
  updated_at: string
}

// Authentication functions
export const signUp = async (email: string, password: string, fullName: string, userType: UserProfile['user_type']) => {
  try {
    // First, create the auth user
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          user_type: userType
        }
      }
    })
    
    if (error) throw error
    
    // If user was created successfully, create the profile
    if (data.user) {
      try {
        const { error: profileError } = await supabase
          .from('profiles')
          .insert([
            {
              id: data.user.id,
              email: data.user.email,
              full_name: fullName,
              user_type: userType,
              preferences: {
                favorite_properties: [],
                saved_searches: [],
                notifications: true
              }
            }
          ])
        
        if (profileError) {
          console.error('Profile creation error:', profileError)
          // Don't throw error here - the trigger might handle it
        }
      } catch (profileError) {
        console.error('Profile creation failed:', profileError)
        // Continue anyway - the trigger should handle profile creation
      }
    }
    
    return data
  } catch (error) {
    console.error('Signup error:', error)
    throw error
  }
}

export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  })
  
  if (error) throw error
  return data
}

export const signOut = async () => {
  const { error } = await supabase.auth.signOut()
  if (error) throw error
}

export const resetPassword = async (email: string) => {
  const { error } = await supabase.auth.resetPasswordForEmail(email)
  if (error) throw error
}

// Get current user
export const getCurrentUser = async (): Promise<User | null> => {
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

// Get user profile
export const getUserProfile = async (userId: string): Promise<UserProfile | null> => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single()
    
    if (error) {
      console.error('Error fetching user profile:', error)
      return null
    }
    return data
  } catch (error) {
    console.error('Error in getUserProfile:', error)
    return null
  }
}

// Update user profile
export const updateUserProfile = async (userId: string, updates: Partial<UserProfile>) => {
  const { data, error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', userId)
    .select()
    .single()
  
  if (error) throw error
  return data
}

// Toggle favorite property
export const toggleFavoriteProperty = async (userId: string, propertyId: string) => {
  const { data: profile } = await supabase
    .from('profiles')
    .select('preferences')
    .eq('id', userId)
    .single()
  
  const currentFavorites = profile?.preferences?.favorite_properties || []
  const isFavorite = currentFavorites.includes(propertyId)
  
  const newFavorites = isFavorite
    ? currentFavorites.filter((id: string) => id !== propertyId)
    : [...currentFavorites, propertyId]
  
  const { error } = await supabase
    .from('profiles')
    .update({
      preferences: {
        ...profile?.preferences,
        favorite_properties: newFavorites
      }
    })
    .eq('id', userId)
  
  if (error) throw error
  return !isFavorite
}

// Save search preferences
export const saveSearch = async (userId: string, searchData: any) => {
  const { data: profile } = await supabase
    .from('profiles')
    .select('preferences')
    .eq('id', userId)
    .single()
  
  const currentSearches = profile?.preferences?.saved_searches || []
  const newSearches = [...currentSearches, { ...searchData, created_at: new Date().toISOString() }]
  
  const { error } = await supabase
    .from('profiles')
    .update({
      preferences: {
        ...profile?.preferences,
        saved_searches: newSearches
      }
    })
    .eq('id', userId)
  
  if (error) throw error
}

// Realtor-specific functions
export const getRealtorLeads = async (realtorId: string) => {
  const { data, error } = await supabase
    .from('leads')
    .select('*')
    .eq('realtor_id', realtorId)
    .order('created_at', { ascending: false })
  
  if (error) throw error
  return data
}

export const createLead = async (leadData: any) => {
  const { data, error } = await supabase
    .from('leads')
    .insert([leadData])
    .select()
    .single()
  
  if (error) throw error
  return data
}

export const updateLead = async (leadId: string, updates: any) => {
  const { data, error } = await supabase
    .from('leads')
    .update(updates)
    .eq('id', leadId)
    .select()
    .single()
  
  if (error) throw error
  return data
}

export const getRealtorShowings = async (realtorId: string) => {
  const { data, error } = await supabase
    .from('showings')
    .select(`
      *,
      properties (
        id,
        title,
        address,
        price
      )
    `)
    .eq('realtor_id', realtorId)
    .order('date', { ascending: true })
  
  if (error) throw error
  return data
}

export const createShowing = async (showingData: any) => {
  const { data, error } = await supabase
    .from('showings')
    .insert([showingData])
    .select()
    .single()
  
  if (error) throw error
  return data
}

export const getRealtorTemplates = async (realtorId: string) => {
  const { data, error } = await supabase
    .from('templates')
    .select('*')
    .eq('realtor_id', realtorId)
    .order('created_at', { ascending: false })
  
  if (error) throw error
  return data
}

export const createTemplate = async (templateData: any) => {
  const { data, error } = await supabase
    .from('templates')
    .insert([templateData])
    .select()
    .single()
  
  if (error) throw error
  return data
}

export const getRealtorProperties = async (realtorId: string) => {
  const { data, error } = await supabase
    .from('properties')
    .select('*')
    .eq('realtor_id', realtorId)
    .order('created_at', { ascending: false })
  
  if (error) throw error
  return data
}

export const createProperty = async (propertyData: any) => {
  const { data, error } = await supabase
    .from('properties')
    .insert([propertyData])
    .select()
    .single()
  
  if (error) throw error
  return data
} 