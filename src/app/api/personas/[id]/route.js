import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function PUT(request, { params }) {
  const supabase = createRouteHandlerClient({ cookies })
  const { id } = params
  const data = await request.json()

  try {
    const { data: updatedPersona, error } = await supabase
      .from('persona')
      .update(data)
      .eq('id', id)
      .select()

    if (error) throw error

    return NextResponse.json(updatedPersona[0])
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
}

export async function DELETE(request, { params }) {
  const supabase = createRouteHandlerClient({ cookies })
  const { id } = params

  try {
    const { error } = await supabase
      .from('persona')
      .delete()
      .eq('id', id)

    if (error) throw error

    return NextResponse.json({ message: 'Persona eliminada exitosamente' })
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
} 