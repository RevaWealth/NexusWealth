"use client"

import { ConnectKitButton } from "connectkit"
import { useAccount, useDisconnect } from "wagmi"
import { Copy, LogOut, X, QrCode, Check } from "lucide-react"
import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { LoadingSpinner } from "./components/loading-spinner"

export function WalletButton() {
  const { address, isConnected } = useAccount()
  const { disconnect } = useDisconnect()
  const [showDropdown, setShowDropdown] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false)
  const [copySuccess, setCopySuccess] = useState(false)
  const [copied, setCopied] = useState(false)

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`
  }

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopySuccess(true)
      setTimeout(() => setCopySuccess(false), 2000)
      console.log("Address copied to clipboard")
    } catch (err) {
      console.error("Failed to copy address:", err)
    }
  }

  const openEtherscan = (addr: string) => {
    window.open(`https://etherscan.io/address/${addr}`, "_blank")
  }

  const copyAddress = async () => {
    if (address) {
      await navigator.clipboard.writeText(address)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  // Enhanced function to aggressively close WalletConnect modals
  const forceCloseWalletConnectModal = useCallback(() => {
    console.log("Attempting to close WalletConnect modal...")

    // Method 1: Find and click close buttons
    const closeButtonSelectors = [
      '[data-testid="wcm-modal-close"]',
      ".wcm-modal__close",
      '[aria-label="Close modal"]',
      ".wcm-header__close",
      ".wcm-modal-close",
      '[data-close="modal"]',
      ".wcm-close-button",
      'button[aria-label*="close" i]',
      'button[title*="close" i]',
      ".ck-modal-close",
      '[data-ck="modal-close"]',
    ]

    closeButtonSelectors.forEach((selector) => {
      const buttons = document.querySelectorAll(selector)
      buttons.forEach((button) => {
        if (button instanceof HTMLElement) {
          console.log(`Clicking close button: ${selector}`)
          button.click()
        }
      })
    })

    // Method 2: Remove modal elements directly
    const modalSelectors = [
      ".wcm-modal",
      ".wcm-overlay",
      '[data-testid="wcm-modal"]',
      '[data-testid="wcm-overlay"]',
      ".wcm-container",
      "wcm-modal",
      "wcm-overlay",
    ]

    modalSelectors.forEach((selector) => {
      const elements = document.querySelectorAll(selector)
      elements.forEach((element) => {
        if (element instanceof HTMLElement) {
          console.log(`Removing modal element: ${selector}`)
          element.style.display = "none"
          element.style.visibility = "hidden"
          element.style.opacity = "0"
          element.style.pointerEvents = "none"
          element.remove()
        }
      })
    })

    // Method 3: Remove any elements with WalletConnect-related classes
    const wcElements = document.querySelectorAll(
      '[class*="wcm"], [class*="walletconnect"], [id*="wcm"], [id*="walletconnect"]',
    )
    wcElements.forEach((element) => {
      if (element instanceof HTMLElement) {
        console.log(`Removing WC element: ${element.className}`)
        element.style.display = "none"
        element.remove()
      }
    })

    // Method 4: Reset body overflow and remove modal-related classes
    document.body.style.overflow = "auto"
    document.body.classList.remove("wcm-modal-open", "modal-open")
    document.documentElement.classList.remove("wcm-modal-open", "modal-open")

    // Method 5: Dispatch escape key event to trigger any modal close handlers
    const escapeEvent = new KeyboardEvent("keydown", {
      key: "Escape",
      code: "Escape",
      keyCode: 27,
      which: 27,
      bubbles: true,
      cancelable: true,
    })
    document.dispatchEvent(escapeEvent)
    window.dispatchEvent(escapeEvent)

    console.log("Modal close attempt completed")
  }, [])

  // Function to monitor and auto-close stuck modals
  const monitorAndCloseModals = useCallback(() => {
    const checkForModals = () => {
      const modals = document.querySelectorAll('.wcm-modal, .wcm-overlay, [data-testid="wcm-modal"]')
      if (modals.length > 0) {
        console.log(`Found ${modals.length} WalletConnect modals, attempting to close...`)
        forceCloseWalletConnectModal()
      }
    }

    // Check immediately and then every 2 seconds
    checkForModals()
    const interval = setInterval(checkForModals, 2000)

    // Clear interval after 30 seconds
    setTimeout(() => {
      clearInterval(interval)
    }, 30000)

    return () => clearInterval(interval)
  }, [forceCloseWalletConnectModal])

  // Function to show QR code modal
  const showQRCode = useCallback(() => {
    console.log("Attempting to show QR code...")
    setIsConnecting(true)

    // Start monitoring for modals
    monitorAndCloseModals()

    // Look for WalletConnect button and click it to show QR
    setTimeout(() => {
      const wcButtons = document.querySelectorAll(
        '[data-testid="wallet-connect"], [data-wallet="walletConnect"], button:has([alt*="WalletConnect" i]), button:has([alt*="walletconnect" i])',
      )

      if (wcButtons.length > 0) {
        console.log("Found WalletConnect button, clicking...")
        const wcButton = wcButtons[0] as HTMLElement
        wcButton.click()
      } else {
        console.log("No WalletConnect button found, searching in modal...")
        // If no direct WalletConnect button, try to find it in the modal
        setTimeout(() => {
          const wcModalButtons = document.querySelectorAll(
            'button[data-wallet="walletConnect"], button:has([alt*="WalletConnect"]), button:has([alt*="walletconnect"]), [data-testid="wallet-connect"]',
          )
          if (wcModalButtons.length > 0) {
            console.log("Found WalletConnect button in modal, clicking...")
            const wcModalButton = wcModalButtons[0] as HTMLElement
            wcModalButton.click()
          }
        }, 500)
      }

      // Reset connecting state after timeout
      setTimeout(() => setIsConnecting(false), 5000)
    }, 300)
  }, [monitorAndCloseModals])

  // Enhanced escape key and click outside handler
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        console.log("Escape key pressed, closing modals...")
        forceCloseWalletConnectModal()
        setShowDropdown(false)
        setIsConnecting(false)
      }
    }

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (target && (target.classList.contains("wcm-overlay") || target.classList.contains("ck-overlay"))) {
        console.log("Clicked outside modal, closing...")
        forceCloseWalletConnectModal()
        setIsConnecting(false)
      }
    }

    document.addEventListener("keydown", handleEscapeKey)
    document.addEventListener("click", handleClickOutside)

    return () => {
      document.removeEventListener("keydown", handleEscapeKey)
      document.removeEventListener("click", handleClickOutside)
    }
  }, [forceCloseWalletConnectModal])

  // Auto-cleanup on component unmount
  useEffect(() => {
    return () => {
      forceCloseWalletConnectModal()
    }
  }, [forceCloseWalletConnectModal])

  if (!mounted) {
    return (
      <Button className="bg-pink-600 text-white font-bold py-2 px-4 rounded flex items-center space-x-2">
        <LoadingSpinner size="sm" />
        <span>Loading...</span>
      </Button>
    )
  }

  if (isConnected && address) {
    return (
      <div className="relative flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={copyAddress}
          className="bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700"
        >
          {copied ? (
            <>
              <Check className="h-4 w-4 mr-2 text-green-500" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="h-4 w-4 mr-2" />
              {formatAddress(address)}
            </>
          )}
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            disconnect()
            forceCloseWalletConnectModal()
          }}
          className="bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700"
        >
          <LogOut className="h-4 w-4 mr-2" />
          Disconnect
        </Button>
      </div>
    )
  }

  return (
    <ConnectKitButton.Custom>
      {({ isConnected, isConnecting: connectKitConnecting, show, address }) => {
        const isCurrentlyConnecting = connectKitConnecting || isConnecting

        return (
          <div className="relative flex items-center space-x-2">
            <Button
              onClick={() => {
                setIsConnecting(true)
                show()
                setTimeout(() => setIsConnecting(false), 5000)
              }}
              disabled={isCurrentlyConnecting}
              className="bg-pink-600 hover:bg-pink-700 disabled:bg-pink-800 disabled:cursor-not-allowed text-white font-bold py-2 px-4 rounded transition-colors flex items-center space-x-2"
            >
              {isCurrentlyConnecting && <LoadingSpinner size="sm" />}
              <span>{isCurrentlyConnecting ? "CONNECTING..." : "CONNECT WALLET"}</span>
            </Button>

            {/* QR Code Button */}
            <Button
              onClick={() => {
                console.log("QR Code button clicked")
                show()
                showQRCode()
              }}
              disabled={isCurrentlyConnecting}
              className="bg-purple-600 hover:bg-purple-700 disabled:bg-purple-800 disabled:cursor-not-allowed text-white p-2 rounded transition-colors flex items-center justify-center"
              title="Connect with Mobile Wallet (QR Code)"
            >
              {isConnecting ? <LoadingSpinner size="sm" /> : <QrCode className="h-5 w-5" />}
            </Button>

            {/* Emergency close button */}
            <Button
              onClick={() => {
                console.log("Emergency close button clicked")
                forceCloseWalletConnectModal()
                setIsConnecting(false)
                // Additional aggressive cleanup after a delay
                setTimeout(forceCloseWalletConnectModal, 500)
                setTimeout(forceCloseWalletConnectModal, 1000)
              }}
              className="bg-red-600 hover:bg-red-700 text-white p-2 rounded opacity-75 hover:opacity-100 transition-opacity"
              title="Force close wallet modal"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        )
      }}
    </ConnectKitButton.Custom>
  )
}

// Export enhanced functions
export const closeWalletModal = () => {
  console.log("closeWalletModal called")

  // Multiple attempts with delays
  const attemptClose = () => {
    const closeButtonSelectors = [
      '[data-testid="wcm-modal-close"]',
      ".wcm-modal__close",
      '[aria-label="Close modal"]',
      ".wcm-header__close",
      ".wcm-modal-close",
      '[data-close="modal"]',
      ".wcm-close-button",
      'button[aria-label*="close" i]',
      'button[title*="close" i]',
      ".ck-modal-close",
      '[data-ck="modal-close"]',
    ]

    closeButtonSelectors.forEach((selector) => {
      const buttons = document.querySelectorAll(selector)
      buttons.forEach((button) => {
        if (button instanceof HTMLElement) {
          button.click()
        }
      })
    })

    // Remove modal elements
    const modalSelectors = [
      ".wcm-modal",
      ".wcm-overlay",
      '[data-testid="wcm-modal"]',
      '[data-testid="wcm-overlay"]',
      ".wcm-container",
      "wcm-modal",
      "wcm-overlay",
    ]

    modalSelectors.forEach((selector) => {
      const elements = document.querySelectorAll(selector)
      elements.forEach((element) => {
        if (element instanceof HTMLElement) {
          element.style.display = "none"
          element.remove()
        }
      })
    })

    // Reset body
    document.body.style.overflow = "auto"
    document.body.classList.remove("wcm-modal-open", "modal-open")
  }

  // Attempt close immediately and with delays
  attemptClose()
  setTimeout(attemptClose, 100)
  setTimeout(attemptClose, 500)
  setTimeout(attemptClose, 1000)
}

export const showWalletQRCode = () => {
  console.log("showWalletQRCode called")

  setTimeout(() => {
    const wcButtons = document.querySelectorAll('[data-testid="wallet-connect"], [data-wallet="walletConnect"]')
    if (wcButtons.length > 0) {
      const wcButton = wcButtons[0] as HTMLElement
      wcButton.click()
    }
  }, 200)
}
