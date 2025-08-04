"use client"

import { CheckCircle, TrendingUp, Lock, Globe } from "lucide-react"

export default function FeaturesSection() {
  const features = [
    {
      icon: CheckCircle,
      title: "Verified Assets",
      description: "All real-world assets are thoroughly verified and audited before tokenization.",
      benefits: ["Professional audits", "Legal compliance", "Asset verification", "Risk assessment"],
    },
    {
      icon: TrendingUp,
      title: "Growth Potential",
      description: "Access high-growth investment opportunities previously available only to institutions.",
      benefits: ["Institutional-grade deals", "Diversified portfolio", "Professional management", "Market insights"],
    },
    {
      icon: Lock,
      title: "Secure Platform",
      description: "Military-grade security protecting your investments and personal information.",
      benefits: ["Multi-sig wallets", "Cold storage", "Insurance coverage", "24/7 monitoring"],
    },
    {
      icon: Globe,
      title: "Global Access",
      description: "Invest in real-world assets from anywhere in the world, 24/7.",
      benefits: ["No geographical limits", "24/7 trading", "Multiple currencies", "Global opportunities"],
    },
  ]

  return (
    <section id="features" className="py-20 bg-[#070b14]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Platform Features</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Discover the powerful features that make NexusWealth the premier platform for blockchain-based real-world
            asset investment.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-[#0c1220] rounded-xl p-6 border border-gray-800">
              <div className="flex items-start space-x-4">
                <div className="bg-purple-600/20 rounded-lg p-3 flex-shrink-0">
                  <feature.icon className="h-6 w-6 text-purple-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-400 mb-4">{feature.description}</p>
                  <ul className="space-y-2">
                    {feature.benefits.map((benefit, benefitIndex) => (
                      <li key={benefitIndex} className="flex items-center text-sm text-gray-300">
                        <CheckCircle className="h-4 w-4 text-green-400 mr-2 flex-shrink-0" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
