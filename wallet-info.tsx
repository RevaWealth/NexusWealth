"use client"

import { useAccount, useBalance } from "wagmi"
import { formatEther } from "viem"
import { useState, useEffect } from "react"

export function WalletInfo() {
  const { address, isConnected, chain } = useAccount()
  const { data: balance } = useBalance({
    address: address,
  })
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="bg-[#0c1220] border border-gray-800 rounded-lg p-4 text-center">
        <p className="text-gray-400">Loading wallet information...</p>
      </div>
    )
  }

  if (!isConnected || !address) {
    return (
      <div className="bg-[#0c1220] border border-gray-800 rounded-lg p-4 text-center">
        <p className="text-gray-400">Connect your wallet to view balance and interact with NexusWealth</p>
      </div>
    )
  }

  return (
    <div className="bg-[#0c1220] border border-gray-800 rounded-lg p-4 space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-gray-400 text-sm">Wallet Address:</span>
        <span className="text-white font-mono text-sm">{`${address.slice(0, 6)}...${address.slice(-4)}`}</span>
      </div>

      {balance && (
        <div className="flex items-center justify-between">
          <span className="text-gray-400 text-sm">Balance:</span>
          <span className="text-white font-semibold">
            {Number.parseFloat(formatEther(balance.value)).toFixed(4)} {balance.symbol}
          </span>
        </div>
      )}

      {chain && (
        <div className="flex items-center justify-between">
          <span className="text-gray-400 text-sm">Network:</span>
          <span className="text-white">{chain.name}</span>
        </div>
      )}
    </div>
  )
}
