import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET() {
  const supabase = createRouteHandlerClient({ cookies })

  try {
    const { data, error } = await supabase
      .from('relaciones')
      .select(`
        *,
        persona1:persona1_id(*),
        persona2:persona2_id(*)
      `)
      .order('id')

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
    const { data: newRelacion, error } = await supabase
      .from('relaciones')
      .insert([data])
      .select()

    if (error) throw error

    return NextResponse.json(newRelacion[0])
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
} 