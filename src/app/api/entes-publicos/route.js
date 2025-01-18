import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET() {
  const supabase = createRouteHandlerClient({ cookies })

  try {
    const { data, error } = await supabase
      .from('entes_publicos')
      .select(`
        *,
        jefe:jefe_id(*)
      `)
      .order('nombre')

    if (error) throw error

    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
}

export async function POST(request) {
  const supabase = createRouteHandlerClient({ cookies })
  const data = await request.json()

  try {
    const { data: newEntePublico, error } = await supabase
      .from('entes_publicos')
      .insert([data])
      .select()

    if (error) throw error

    return NextResponse.json(newEntePublico[0])
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
} 