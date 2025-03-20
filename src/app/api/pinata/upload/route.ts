import { type NextRequest, NextResponse } from 'next/server'
import { pinata } from '@/lib/pinata'

export const config = {
  api: {
    responseLimit: false,
  },
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData()
    const file = data.get('file') as File
    const { cid } = await pinata.upload.public.file(file)
    const url = await pinata.gateways.public.convert(cid)

    return NextResponse.json({ url }, { status: 200 })
  }
  catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    )
  }
}
