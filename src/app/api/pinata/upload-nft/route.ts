import { type NextRequest, NextResponse } from 'next/server'
import { pinata } from '@/lib/pinata'

// Interface here...

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    const keyValues = Object.entries(Object.fromEntries(formData.entries())).reduce((init, [key, value]) => {
      if (key !== 'file') {
        init[key] = value
      }
      return init
    }, {} as Record<string, any>)

    const { cid: fileCid } = await pinata.upload.public.file(file)
    const fileUrl = await pinata.gateways.public.convert(fileCid)
    const { cid: keyValuesCid } = await pinata.upload.public.json({
      ...keyValues,
      image: fileUrl,
    })
    const url = await pinata.gateways.public.convert(keyValuesCid)

    return NextResponse.json({ url }, { status: 200 })
  }
  catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    )
  }
}
