"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqs = [
    {
      question: "What is NexusWealth ?",
      answer:
        "NexusWealth is a one stop solution to all your investment needs. Wherether you want to make a simple investment, Stake your position,collecting yields, take out a loan, convert your NWIS holding to it's equivalant portion of the underlying RWA, or simply to cash out. You can do all that  revolutionary blockchain platform that integrates artificial intelligence with decentralized technology, enabling smart contracts that can learn and adapt automatically.",
    },
    {
      question: "How can I buy NWIS tokens?",
      answer:
        "You can purchase NWIS tokens during our presale using ETH or USDT. Simply connect your wallet and follow the purchase process on our platform.",
    },
    {
      question: "What makes NexusWealth different from other blockchain projects?",
      answer:
        "NexusWealth uniquely bridges RWA investment solutions into blockchain technology, opening access for indviduals and businesses around the world to invest in most trusted and profitibale investment categories (Infrastructure and Real-Estate) in the most liquid way ever existed."
    },
    {
      question: "How will NWIS value grow?",
      answer:
        "Our mainnet is scheduled to launch in Phase 3 of our roadmap. Stay tuned to our official channels for exact dates and updates.",
    },
    {
      question: "Is NexusWealth secure?",
      answer:
        "Yes, NexusWealth has undergone comprehensive security audits and implements advanced cryptographic techniques including zero-knowledge proofs to ensure maximum security.",
    },
    {
      question: "How can I get involved with the community?",
      answer:
        "Join our Discord server for real-time updates and community discussions. You can also follow us on social media and participate in our governance once it launches.",
    },
  ]

  return (
    <section className="py-20 bg-[#0c1220] relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Frequently Asked <span className="text-pink-500">Questions</span>
          </h2>
          <p className="text-gray-400 max-w-3xl mx-auto text-lg">
            Find answers to common questions about NexusWealth and our revolutionary investment platform.
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-[#070b14] rounded-xl border border-gray-800 overflow-hidden">
              <button
                className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-800/30 transition-colors"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <h3 className="text-lg font-semibold text-white pr-4">{faq.question}</h3>
                {openIndex === index ? (
                  <ChevronUp className="h-5 w-5 text-purple-400 flex-shrink-0" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-purple-400 flex-shrink-0" />
                )}
              </button>
              {openIndex === index && (
                <div className="px-6 pb-6">
                  <p className="text-gray-400 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
