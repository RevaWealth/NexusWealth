"use client"

import { useEffect } from "react"

export function ModalCleanup() {
  useEffect(() => {
    // Aggressive modal cleanup on page load
    const cleanupModals = () => {
      console.log("Running modal cleanup...")

      // Remove any existing WalletConnect modals
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
            element.remove()
          }
        })
      })

      // Reset body styles
      document.body.style.overflow = "auto"
      document.body.classList.remove("wcm-modal-open", "modal-open")
      document.documentElement.classList.remove("wcm-modal-open", "modal-open")
    }

    // Clean up immediately
    cleanupModals()

    // Set up mutation observer to catch dynamically added modals
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node instanceof HTMLElement) {
            // Check if the added node is a WalletConnect modal
            if (
              node.classList.contains("wcm-modal") ||
              node.classList.contains("wcm-overlay") ||
              node.getAttribute("data-testid") === "wcm-modal" ||
              node.getAttribute("data-testid") === "wcm-overlay"
            ) {
              console.log("Detected WalletConnect modal added to DOM")

              // Add close button listener if it doesn't exist
              const closeButton = node.querySelector('[data-testid="wcm-modal-close"], .wcm-modal__close')
              if (closeButton && !closeButton.hasAttribute("data-enhanced-close")) {
                closeButton.setAttribute("data-enhanced-close", "true")
                closeButton.addEventListener("click", () => {
                  console.log("Enhanced close button clicked")
                  setTimeout(() => {
                    if (node.parentNode) {
                      node.remove()
                    }
                  }, 100)
                })
              }
            }
          }
        })
      })
    })

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    })

    // Cleanup function
    return () => {
      observer.disconnect()
      cleanupModals()
    }
  }, [])

  return null
}
