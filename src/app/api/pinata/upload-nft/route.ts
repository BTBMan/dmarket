import { type NextRequest, NextResponse } from 'next/server'
import { pinata } from '@/lib/pinata'

export interface UploadNftRequestData<Image = File> {
  name: string
  description: string
  image: Image
  attributes?: Record<string, any>[]
}

export interface UploadNftResponseData {
  url: string
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const data: UploadNftRequestData = Object.entries(Object.fromEntries(formData.entries())).reduce((init, [key, value]) => {
      init[key] = value
      return init
    }, {} as any)

    const file = formData.get('image') as File
    const { cid: fileCid } = await pinata.upload.public.file(file)
    const fileUrl = await pinata.gateways.public.convert(fileCid)
    const { cid: keyValuesCid } = await pinata.upload.public.json({
      ...data,
      image: fileUrl,
    })
    const url = await pinata.gateways.public.convert(keyValuesCid)

    return NextResponse.json<UploadNftResponseData>({ url }, { status: 200 })
  }
  catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    )
  }
}
