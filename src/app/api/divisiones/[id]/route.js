import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function PUT(request, { params }) {
  const supabase = createRouteHandlerClient({ cookies })
  const { id } = params
  const data = await request.json()

  try {
    const { data: updatedDivision, error } = await supabase
      .from('divisiones')
      .update(data)
      .eq('id', id)
      .select()

    if (error) throw error

    return NextResponse.json(updatedDivision[0])
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
      .from('divisiones')
      .delete()
      .eq('id', id)

    if (error) throw error

    return NextResponse.json({ message: 'División eliminada exitosamente' })
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
} 