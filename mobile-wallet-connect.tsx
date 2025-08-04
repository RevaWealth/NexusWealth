"use client"

import { useState } from "react"
import { QrCode, Smartphone, X } from "lucide-react"
import { ConnectKitButton } from "connectkit"

export function MobileWalletConnect() {
  const [showQRModal, setShowQRModal] = useState(false)

  const popularMobileWallets = [
    { name: "MetaMask", icon: "🦊" },
    { name: "Trust Wallet", icon: "🛡️" },
    { name: "Rainbow", icon: "🌈" },
    { name: "Coinbase Wallet", icon: "🔵" },
    { name: "WalletConnect", icon: "🔗" },
  ]

  return (
    <>
      <button
        onClick={() => setShowQRModal(true)}
        className="flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105"
      >
        <Smartphone className="h-5 w-5" />
        <span>Connect Mobile Wallet</span>
        <QrCode className="h-5 w-5" />
      </button>

      {/* QR Code Modal */}
      {showQRModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[10000]">
          <div className="bg-[#0c1220] border border-gray-800 rounded-xl p-6 max-w-md w-full mx-4">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">Connect Mobile Wallet</h3>
              <button
                onClick={() => setShowQRModal(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="text-center mb-6">
              <div className="bg-white p-4 rounded-lg mb-4 inline-block">
                <QrCode className="h-32 w-32 text-black" />
              </div>
              <p className="text-gray-400 text-sm mb-4">Scan this QR code with your mobile wallet app to connect</p>
            </div>

            <div className="mb-6">
              <h4 className="text-white font-semibold mb-3">Popular Mobile Wallets:</h4>
              <div className="grid grid-cols-2 gap-2">
                {popularMobileWallets.map((wallet, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-2 p-2 bg-[#070b14] rounded-lg border border-gray-800"
                  >
                    <span className="text-lg">{wallet.icon}</span>
                    <span className="text-white text-sm">{wallet.name}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <ConnectKitButton.Custom>
                {({ show }) => (
                  <button
                    onClick={() => {
                      show()
                      setShowQRModal(false)
                    }}
                    className="w-full bg-pink-600 hover:bg-pink-700 text-white font-bold py-3 px-4 rounded-lg transition-colors"
                  >
                    Open Wallet Selection
                  </button>
                )}
              </ConnectKitButton.Custom>

              <button
                onClick={() => setShowQRModal(false)}
                className="w-full bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-4 rounded-lg transition-colors"
              >
                Cancel
              </button>
            </div>

            <div className="mt-4 text-xs text-gray-500 text-center">
              Make sure your mobile wallet supports WalletConnect protocol
            </div>
          </div>
        </div>
      )}
    </>
  )
}
