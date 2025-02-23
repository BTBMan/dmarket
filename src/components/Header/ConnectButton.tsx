import { ConnectButton as RainbowConnectButton } from '@rainbow-me/rainbowkit'
import type { HTMLAttributes } from 'react'
import { Button } from '../ui/button'

type ButtonContent = Parameters<typeof RainbowConnectButton.Custom>[0]['children']
type ChildrenProps = Parameters<ButtonContent>[0]

function LoginButton({ onClick }: { onClick: () => void }) {
  return (
    <Button onClick={onClick}>
      Log In
    </Button>
  )
}

function ChainButton({ onClick }: { onClick: () => void }) {
  return (
    <Button onClick={onClick}>
      Wrong network
    </Button>
  )
}

function AccountInfo({ account }: { account: Required<ChildrenProps>['account'] }) {
  return (
    <>
      {account.displayName}
      {account.displayBalance
        ? ` (${account.displayBalance})`
        : ''}
    </>
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

            return <AccountInfo account={account} />
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
