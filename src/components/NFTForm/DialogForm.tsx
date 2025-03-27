'use client'

import { useState } from 'react'
import NFTForm from './index'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'

interface Props {
  onMinted?: () => void
}

export default function DialogForm({ onMinted }: Props) {
  const [open, setOpen] = useState(false)

  const _onMinted = () => {
    setOpen(false)
    onMinted?.()
  }

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button>Listing NFT</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>NFT</DialogTitle>
            <DialogDescription className="hidden" />
          </DialogHeader>
          <NFTForm onMinted={_onMinted} />
        </DialogContent>
      </Dialog>
    </div>
  )
}
