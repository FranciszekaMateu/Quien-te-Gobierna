import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'

export async function POST(request) {
  try {
    const formData = await request.json()
    console.log('Login attempt for user:', formData.username)
    
    const supabase = createRouteHandlerClient({ cookies })

    const { data: userData, error } = await supabase
      .from('Users')
      .select('*')
      .eq('user', formData.username)
      .single()

    if (error) {
      console.error('Supabase error fetching user:', error)
      return NextResponse.json(
        { error: 'Credenciales inválidas' },
        { status: 401 }
      )
    }

    if (!userData) {
      console.error('No user found with username:', formData.username)
      return NextResponse.json(
        { error: 'Credenciales inválidas' },
        { status: 401 }
      )
    }

    console.log('User found:', { id: userData.id, username: userData.user })

    const passwordMatch = await bcrypt.compare(formData.password, userData.password)
    
    if (!passwordMatch) {
      console.error('Password mismatch for user:', formData.username)
      return NextResponse.json(
        { error: 'Credenciales inválidas' },
        { status: 401 }
      )
    }

    console.log('Login successful for user:', formData.username)

    const session = {
      user: {
        id: userData.id,
        username: userData.user,
        created_at: userData.created_at
      }
    }

    return NextResponse.json({
      message: 'Login exitoso',
      session
    })
  } catch (error) {
    console.error('Unexpected error during login:', error)
    return NextResponse.json(
      { error: 'Error al procesar la solicitud' },
      { status: 500 }
    )
  }
} 