'use client'

import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useReadContract, useWriteContract } from 'wagmi'
import { parseEther } from 'viem'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import FileUpload from '@/components/FileUpload'
import { NFTMarketplace } from '@/contract-data/NFTMarketplace'

const formSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }).max(20),
  description: z.string().min(1, { message: 'Description is required' }).max(100),
  image: z.array(z.instanceof(File)).min(1, { message: 'Image is required' }),
  ethPrice: z.string().min(1, { message: 'ETH Price is required' }),
})

type FieldValues = z.infer<typeof formSchema>

const leftSpace = {
  w: 'w-[80px]',
  ml: 'ml-[88px]',
}

export default function NFTForm() {
  const form = useForm<FieldValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
      image: [],
      ethPrice: '',
    },
  })

  const { data: listingFee } = useReadContract({ ...NFTMarketplace, functionName: 'getListingFee' })

  async function onSubmit(values: FieldValues) {
    // console.log(ret)
    // const { url } = await uploadMetadata(values)
    await mintNFT(values.ethPrice, 'url')
  }

  async function uploadMetadata(data: FieldValues) {
    const formData = new FormData()
    formData.append('image', data.image[0])
    formData.append('name', data.name)
    formData.append('description', data.description)

    const response = await fetch('/api/pinata/upload-metadata', {
      method: 'POST',
      body: formData,
    })

    return await response.json()
  }

  // Mint NFT
  const { writeContract } = useWriteContract()
  async function mintNFT(price: string, tokenUri: string) {
    writeContract({
      ...NFTMarketplace,
      functionName: 'createMarketItem',
      args: [parseEther(price), tokenUri],
      value: listingFee,
    })
  }

  return (
    <div>
      <Form {...form}>
        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => {
              return (
                <FormItem>
                  <div className="flex items-center gap-[8px]">
                    <FormLabel className={leftSpace.w}><span className="text-foreground">Name</span></FormLabel>
                    <FormControl className="flex-1">
                      <Input {...field} />
                    </FormControl>
                  </div>
                  <FormMessage className={leftSpace.ml} />
                </FormItem>
              )
            }}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => {
              return (
                <FormItem>
                  <div className="flex items-center gap-[8px]">
                    <FormLabel className={leftSpace.w}><span className="text-foreground">Description</span></FormLabel>
                    <FormControl className="flex-1">
                      <Input {...field} />
                    </FormControl>
                  </div>
                  <FormMessage className={leftSpace.ml} />
                </FormItem>
              )
            }}
          />
          <FormField
            control={form.control}
            name="ethPrice"
            render={({ field }) => {
              return (
                <FormItem>
                  <div className="flex items-center gap-[8px]">
                    <FormLabel className={leftSpace.w}><span className="text-foreground">ETH Price</span></FormLabel>
                    <FormControl className="flex-1">
                      <Input {...field} />
                    </FormControl>
                  </div>
                  <FormMessage className={leftSpace.ml} />
                </FormItem>
              )
            }}
          />
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => {
              return (
                <FormItem>
                  <div className="flex items-center gap-[8px]">
                    <FormLabel className={leftSpace.w}><span className="text-foreground">Image</span></FormLabel>
                    <FormControl className="flex-1">
                      <FileUpload {...field} />
                    </FormControl>
                  </div>
                  <FormMessage className={leftSpace.ml} />
                </FormItem>
              )
            }}
          />
          <div className="flex justify-end">
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
