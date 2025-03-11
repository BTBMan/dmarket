'use client'

import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { FileUpload } from '@/components/FileUpload'

const formSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }).max(20),
  description: z.string().min(1, { message: 'Description is required' }).max(100),
  image: z.string().min(1, { message: 'Image is required' }),
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
      image: '',
      ethPrice: '',
    },
  })

  function onSubmit(_values: FieldValues) {
    //
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
                      {/* <Input {...field} /> */}
                      <FileUpload
                        {...field}
                        onFilesSelected={(files) => {
                          console.log('Files selected:', files)
                        }}
                        maxFiles={5}
                        accept="image/*"
                      />
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
