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
    const res = await pinata.upload.public.file(file).keyvalues({
      a: 'aa',
      b: 'bb',
    })
    const url = await pinata.gateways.public.convert(res.cid)

    return NextResponse.json({ url, res }, { status: 200 })
  }
  catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    )
  }
}
