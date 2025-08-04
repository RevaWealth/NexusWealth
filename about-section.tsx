"use client"

import { Shield, Target, Users, Zap } from "lucide-react"

export default function AboutSection() {
  const features = [
    {
      icon: Shield,
      title: "Secure & Transparent",
      description: "Built on blockchain technology ensuring complete transparency and security for all transactions.",
    },
    {
      icon: Target,
      title: "Real-World Assets",
      description: "Bridging traditional investments with blockchain technology for tangible value creation.",
    },
    {
      icon: Users,
      title: "Community Driven",
      description: "Empowering our community with governance rights and decision-making power.",
    },
    {
      icon: Zap,
      title: "Innovation First",
      description: "Leveraging cutting-edge technology to revolutionize the investment landscape.",
    },
  ]

  return (
    <section id="about" className="py-20 bg-[#0a0f1a]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">About NexusWealth</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            We're revolutionizing the investment landscape by bridging traditional real-world assets with blockchain
            technology, creating unprecedented opportunities for wealth generation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center">
              <div className="bg-purple-600/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <feature.icon className="h-8 w-8 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
