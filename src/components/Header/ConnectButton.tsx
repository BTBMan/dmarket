import { ConnectButton as RainbowConnectButton } from '@rainbow-me/rainbowkit'
import type { HTMLAttributes } from 'react'
import Image from 'next/image'
import { Button } from '../ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip'

type ButtonContent = Parameters<typeof RainbowConnectButton.Custom>[0]['children']
type ChildrenProps = Parameters<ButtonContent>[0]

function LoginButton({ onClick }: { onClick?: () => void }) {
  return (
    <Button onClick={onClick}>
      Log In
    </Button>
  )
}

function ChainButton({ onClick }: { onClick?: () => void }) {
  return (
    <Button onClick={onClick}>
      Wrong network
    </Button>
  )
}

function AccountInfo({
  account,
  chain,
  onChainClick,
}: {
  account: Required<ChildrenProps>['account']
  chain: Required<ChildrenProps>['chain']
  onChainClick?: () => void
}) {
  // console.log(account, chain)

  return (
    <div>
      <div className="flex items-center justify-between">
        {/* <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="cursor-pointer">{account.displayName}</div>
            </TooltipTrigger>
            <TooltipContent>
              Copy
            </TooltipContent>
          </Tooltip>
        </TooltipProvider> */}
        <div className="cursor-pointer">{account.displayName}</div>
        {chain.hasIcon && (
          <div>
            {chain.iconUrl && (
              <Image
                className="cursor-pointer"
                src={chain.iconUrl}
                alt={chain.name || 'Chain Icon'}
                width={20}
                height={20}
                onClick={onChainClick}
              />
            )}
          </div>
        )}
      </div>
      <div className="mt-[4px]">
        <span className="text-[18px] font-bold">{account.displayBalance}</span>
      </div>
    </div>
  )
}

export default function ConnectButton() {
  const buttonContent: ButtonContent = ({
    account,
    chain,
    openChainModal,
    openConnectModal,
    mounted,
  }) => {
    const ready = mounted
    const connected = !!(ready && account && chain)
    const buttonContentProps: HTMLAttributes<HTMLDivElement> | boolean = !ready && {
      'aria-hidden': true,
      'style': {
        opacity: 0,
        pointerEvents: 'none',
        userSelect: 'none',
      },
    }

    return (
      <div
        {...buttonContentProps}
      >
        {
          (() => {
            if (!connected) {
              return <LoginButton onClick={openConnectModal} />
            }

            if (chain?.unsupported) {
              return <ChainButton onClick={openChainModal} />
            }

            return <AccountInfo account={account} chain={chain} onChainClick={openChainModal} />
          })()
        }
      </div>
    )
  }

  return (
    <div>
      <RainbowConnectButton.Custom>
        {buttonContent}
      </RainbowConnectButton.Custom>
    </div>
  )
}
