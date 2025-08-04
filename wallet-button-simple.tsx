"use client"

import { ConnectKitButton } from "connectkit"
import { useAccount } from "wagmi"

export function WalletButton() {
  const { isConnected, address } = useAccount()

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`
  }

  return (
    <ConnectKitButton.Custom>
      {({ isConnected, isConnecting, show, address }) => {
        if (isConnected && address) {
          return (
            <button
              onClick={show}
              className="bg-pink-600 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded transition-colors"
            >
              {formatAddress(address)}
            </button>
          )
        }

        return (
          <button
            onClick={show}
            disabled={isConnecting}
            className="bg-pink-600 hover:bg-pink-700 disabled:bg-pink-800 disabled:cursor-not-allowed text-white font-bold py-2 px-4 rounded transition-colors"
          >
            {isConnecting ? "CONNECTING..." : "CONNECT WALLET"}
          </button>
        )
      }}
    </ConnectKitButton.Custom>
  )
}
