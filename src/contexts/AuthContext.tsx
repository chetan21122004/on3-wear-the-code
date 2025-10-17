import React, { createContext, useContext, useEffect, useState } from 'react'
import { User, Session, AuthError } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase'
import { authService, SignUpData, SignInData } from '@/services/authService'
import type { User as UserProfile } from '@/lib/supabase'

interface AuthContextType {
  user: User | null
  userProfile: UserProfile | null
  session: Session | null
  loading: boolean
  signUp: (data: SignUpData) => Promise<{ error: AuthError | null }>
  signIn: (data: SignInData) => Promise<{ error: AuthError | null }>
  signInWithGoogle: () => Promise<{ error: AuthError | null }>
  signOut: () => Promise<{ error: AuthError | null }>
  resetPassword: (email: string) => Promise<{ error: AuthError | null }>
  updateProfile: (updates: Partial<UserProfile>) => Promise<{ error: any }>
  refreshProfile: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

interface AuthProviderProps {
  children: React.ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  const fetchUserProfile = async (userId: string) => {
    try {
      // Add timeout to prevent hanging
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Profile fetch timeout')), 10000)
      )
      
      const fetchPromise = supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single()

      const { data, error } = await Promise.race([fetchPromise, timeoutPromise]) as any

      if (error) {
        console.error('Error fetching user profile:', error)
        // Return a basic profile if fetch fails to prevent infinite loading
        return {
          id: userId,
          email: null,
          full_name: null,
          gender: null,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      }

      return data
    } catch (error) {
      console.error('Error fetching user profile:', error)
      // Return a basic profile if fetch fails to prevent infinite loading
      return {
        id: userId,
        email: null,
        full_name: null,
        gender: null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    }
  }

  const refreshProfile = async () => {
    if (user) {
      const profile = await fetchUserProfile(user.id)
      setUserProfile(profile)
    }
  }

  useEffect(() => {
    let mounted = true

    // Failsafe: ensure loading never stays true indefinitely
    const maxLoadingTimeout = setTimeout(() => {
      if (mounted) {
        setLoading(false)
      }
    }, 15000) // 15 seconds max loading time

    // Get initial session
    const initializeAuth = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession()
        
        if (!mounted) return
        
        if (error) {
          console.error('Error getting session:', error)
          setLoading(false)
          return
        }

        setSession(session)
        setUser(session?.user ?? null)
        
        if (session?.user) {
          const profile = await fetchUserProfile(session.user.id)
          if (mounted) {
            setUserProfile(profile)
          }
        } else {
          setUserProfile(null)
        }
        
        if (mounted) {
          setLoading(false)
        }
      } catch (error) {
        console.error('Error initializing auth:', error)
        if (mounted) {
          setLoading(false)
        }
      }
    }

    initializeAuth()

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (!mounted) return

      
      setSession(session)
      setUser(session?.user ?? null)
      
      if (session?.user) {
        try {
          const profile = await fetchUserProfile(session.user.id)
          if (mounted) {
            setUserProfile(profile)
          }
        } catch (error) {
          console.error('Error fetching profile on auth change:', error)
          if (mounted) {
            setUserProfile(null)
          }
        }
      } else {
        setUserProfile(null)
      }
      
      // Set loading to false for all events except during initial session recovery
      if (mounted) {
        setLoading(false)
      }
    })

    return () => {
      mounted = false
      clearTimeout(maxLoadingTimeout)
      subscription.unsubscribe()
    }
  }, [])

  const signUp = async (data: SignUpData) => {
    const { error } = await authService.signUp(data)
    return { error }
  }

  const signIn = async (data: SignInData) => {
    const { error } = await authService.signIn(data)
    return { error }
  }

  const signInWithGoogle = async () => {
    const { error } = await authService.signInWithGoogle()
    return { error }
  }


  const signOut = async () => {
    const { error } = await authService.signOut()
    return { error }
  }

  const resetPassword = async (email: string) => {
    const { error } = await authService.resetPassword(email)
    return { error }
  }

  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (!user) {
      return { error: new Error('No user logged in') }
    }

    const { error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', user.id)

    if (!error) {
      await refreshProfile()
    }

    return { error }
  }

  const value: AuthContextType = {
    user,
    userProfile,
    session,
    loading,
    signUp,
    signIn,
    signInWithGoogle,
    signOut,
    resetPassword,
    updateProfile,
    refreshProfile,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
