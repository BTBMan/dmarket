'use client'

import NFTForm from './index'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'

export default function DialogForm() {
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button>Create My NFT</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create</DialogTitle>
            <DialogDescription className="hidden" />
          </DialogHeader>
          <NFTForm />
        </DialogContent>
      </Dialog>
    </div>
  )
}
