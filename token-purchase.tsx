"use client"

import { useState, useEffect } from "react"
import { useAccount } from "wagmi"
import { ConnectKitButton } from "connectkit"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { LoadingSpinner } from "./components/loading-spinner"
import { TokenPurchaseSkeleton } from "./components/loading-skeleton"
import { EthIcon, UsdtIcon, UsdcIcon } from "./components/crypto-icons"
import { useTokenCalculation } from "./hooks/use-token-calculation"

interface TokenPurchaseProps {
  currentPrice: string
  amountRaised: string
  tokenValue: string
}

const currencyConfig = {
  ETH: { icon: EthIcon, color: "text-blue-400" },
  USDT: { icon: UsdtIcon, color: "text-green-400" },
  USDC: { icon: UsdcIcon, color: "text-blue-500" },
}

export default function TokenPurchase({ currentPrice, amountRaised, tokenValue }: TokenPurchaseProps) {
  const { isConnected } = useAccount()
  const [amount, setAmount] = useState("")
  const [currency, setCurrency] = useState<keyof typeof currencyConfig>("ETH")
  const [isLoading, setIsLoading] = useState(false)
  const [isPurchasing, setIsPurchasing] = useState(false)
  const [componentLoading, setComponentLoading] = useState(true)

  // Use token calculation hook
  const { tokenAmount, isCalculating } = useTokenCalculation({ amount, currency })

  // Simulate component loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setComponentLoading(false)
    }, 800)
    return () => clearTimeout(timer)
  }, [])

  const handlePurchase = async () => {
    setIsPurchasing(true)
    // Simulate purchase process
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsPurchasing(false)
  }

  const handleCurrencyChange = async (newCurrency: keyof typeof currencyConfig) => {
    setIsLoading(true)
    setCurrency(newCurrency)
    // Simulate currency conversion loading
    await new Promise((resolve) => setTimeout(resolve, 500))
    setIsLoading(false)
  }

  if (componentLoading) {
    return <TokenPurchaseSkeleton />
  }

  const progressValue = 0

  return (
    <div className="space-y-6">
      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Raised</span>
          <span className="text-white">{progressValue}%</span>
        </div>
        <Progress
          value={progressValue}
          className="h-2 bg-gray-800 [&>div]:bg-gradient-to-r [&>div]:from-purple-500 [&>div]:to-purple-600"
        />
        <div className="flex justify-between text-xs text-gray-500">
          <span>{amountRaised}</span>
          <span>$30,000,000</span>
        </div>
      </div>

      {/* Current Price */}
      <div className="text-center">
        <p className="text-gray-400 text-sm mb-1">Current Price</p>
        <p className="text-2xl font-bold text-white">{currentPrice}</p>
        <p className="text-gray-500 text-xs">{tokenValue}</p>
      </div>

      {/* Purchase Form */}
      <div className="space-y-4">
        <div className="grid grid-cols-3 gap-2">
          {(Object.keys(currencyConfig) as Array<keyof typeof currencyConfig>).map((curr) => {
            const { icon: Icon, color } = currencyConfig[curr]
            return (
              <Button
                key={curr}
                variant={currency === curr ? "default" : "outline"}
                size="sm"
                onClick={() => handleCurrencyChange(curr)}
                disabled={isLoading}
                className={`${
                  currency === curr
                    ? "bg-purple-600 hover:bg-purple-700 text-white"
                    : "bg-gray-800 hover:bg-gray-700 text-gray-300 border-gray-700"
                } flex items-center justify-center gap-2`}
              >
                {isLoading && currency === curr ? (
                  <LoadingSpinner size="sm" />
                ) : (
                  <>
                    <Icon className={`h-4 w-4 ${currency === curr ? "text-white" : color}`} />
                    {curr}
                  </>
                )}
              </Button>
            )
          })}
        </div>

        <div className="space-y-2">
          <Input
            type="number"
            placeholder={`Enter ${currency} amount`}
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="bg-gray-800 border-gray-700 text-white placeholder-gray-500"
            disabled={!isConnected}
          />

          {/* Token Calculation Field */}
          <div className="bg-gray-800/50 border border-gray-700 rounded-md p-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-400 text-sm">You will receive:</span>
              {isCalculating ? (
                <LoadingSpinner size="sm" className="text-purple-400" />
              ) : (
                <span className="text-white font-medium">{tokenAmount ? `${tokenAmount} NWIS` : "0 NWIS"}</span>
              )}
            </div>
            {!isConnected && <p className="text-xs text-gray-500 mt-1">Connect wallet to see token calculation</p>}
          </div>
        </div>

        {/* Buy Button with Wallet Connection Check */}
        {!isConnected ? (
          <ConnectKitButton.Custom>
            {({ show }) => (
              <Button
                onClick={show}
                className="w-full bg-gradient-to-r from-pink-600 to-purple-500 hover:from-pink-700 hover:to-purple-600 text-white font-semibold py-3"
              >
                CONNECT WALLET
              </Button>
            )}
          </ConnectKitButton.Custom>
        ) : (
          <Button
            onClick={handlePurchase}
            disabled={!amount || isPurchasing}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white font-semibold py-3"
          >
            {isPurchasing ? (
              <>
                <LoadingSpinner size="sm" className="mr-2" />
                Processing Purchase...
              </>
            ) : (
              `Buy NWIS with ${currency}`
            )}
          </Button>
        )}
      </div>

      {/* Additional Info */}
      <div className="text-center space-y-2">
        <p className="text-xs text-gray-500">
          Min purchase: 10 {currency} • Max purchase: 10,000 {currency}
        </p>
        <p className="text-xs text-gray-500">Next price increase in: 2,847,392 NWIS</p>
      </div>
    </div>
  )
}
