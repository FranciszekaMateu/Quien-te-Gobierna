import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'

export async function POST(request) {
  try {
    console.log('Request headers:', request.headers)
    
    const formData = await request.json()
    console.log('Datos recibidos:', formData)

    if (!formData?.username || !formData?.password) {
      console.log('Datos inválidos:', formData)
      const response = NextResponse.json(
        { error: 'Usuario y contraseña son requeridos' },
        { status: 400 }
      )
      console.log('Respuesta de error:', response)
      return response
    }

    const supabase = createRouteHandlerClient({ cookies })

    const { data: existingUser, error: checkError } = await supabase
      .from('Users')
      .select('user')
      .eq('user', formData.username)
      .single()

    if (checkError) {
      console.log('Error al verificar usuario:', checkError)
    }

    if (existingUser) {
      console.log('Usuario existente:', existingUser)
      return NextResponse.json(
        { error: 'El nombre de usuario ya está en uso' },
        { status: 400 }
      )
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(formData.password, salt)

    const { data: newUser, error: insertError } = await supabase
      .from('Users')
      .insert([
        {
          user: formData.username,
          password: hashedPassword
        }
      ])
      .select('id, user, created_at')
      .single()

    if (insertError) {
      console.error('Error al crear usuario:', insertError)
      return NextResponse.json(
        { error: 'Error al crear el usuario' },
        { status: 500 }
      )
    }

    console.log('Usuario creado:', newUser)
    const successResponse = NextResponse.json({
      message: 'Usuario creado exitosamente',
      user: newUser
    })
    console.log('Respuesta de éxito:', successResponse)
    return successResponse

  } catch (error) {
    console.error('Error en el servidor:', error)
    console.error('Stack trace:', error.stack)
    return NextResponse.json(
      { error: 'Error al procesar la solicitud' },
      { status: 500 }
    )
  }
} 