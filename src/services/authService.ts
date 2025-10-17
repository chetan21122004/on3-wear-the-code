import { supabase } from '@/lib/supabase'
import type { User, AuthError } from '@supabase/supabase-js'

export interface SignUpData {
  email: string
  password: string
  fullName?: string
  gender?: string
}

export interface SignInData {
  email: string
  password: string
}

export interface AuthResponse {
  user: User | null
  error: AuthError | null
}

export const authService = {
  // Sign up with email and password
  async signUp({ email, password, fullName, gender }: SignUpData): Promise<AuthResponse> {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          gender: gender,
        }
      }
    })

    return {
      user: data.user,
      error: error
    }
  },

  // Sign in with email and password
  async signIn({ email, password }: SignInData): Promise<AuthResponse> {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    return {
      user: data.user,
      error: error
    }
  },

  // Sign in with Google
  async signInWithGoogle() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
        // Use PKCE flow instead of implicit flow for better security
        skipBrowserRedirect: false,
        scopes: 'email profile'
      }
    })

    return { data, error }
  },


  // Sign out
  async signOut() {
    const { error } = await supabase.auth.signOut()
    return { error }
  },

  // Get current user
  async getCurrentUser() {
    const { data: { user }, error } = await supabase.auth.getUser()
    return { user, error }
  },

  // Get current session
  async getCurrentSession() {
    const { data: { session }, error } = await supabase.auth.getSession()
    return { session, error }
  },

  // Reset password
  async resetPassword(email: string) {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/reset-password`
    })

    return { data, error }
  },

  // Update password
  async updatePassword(password: string) {
    const { data, error } = await supabase.auth.updateUser({
      password: password
    })

    return { data, error }
  },

  // Update user profile
  async updateProfile(updates: { full_name?: string; gender?: string; avatar_url?: string }) {
    const { data, error } = await supabase.auth.updateUser({
      data: updates
    })

    return { data, error }
  },

  // Listen to auth state changes
  onAuthStateChange(callback: (event: string, session: any) => void) {
    return supabase.auth.onAuthStateChange(callback)
  }
}
