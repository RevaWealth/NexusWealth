import Image from "next/image"

export default function PartnersSection() {
  const partners = [
    { name: "Binance", logo: "/placeholder.svg?height=80&width=200" },
    { name: "Coinbase", logo: "/placeholder.svg?height=80&width=200" },
    { name: "Polygon", logo: "/placeholder.svg?height=80&width=200" },
    { name: "Chainlink", logo: "/placeholder.svg?height=80&width=200" },
    { name: "OpenAI", logo: "/placeholder.svg?height=80&width=200" },
    { name: "NVIDIA", logo: "/placeholder.svg?height=80&width=200" },
  ]

  return (
    <section className="py-20 bg-[#070b14] relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Trusted <span className="text-indigo-400">Partners</span>
          </h2>
          <p className="text-gray-400 max-w-3xl mx-auto text-lg">
            We collaborate with industry leaders to build the future of AI and blockchain technology.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
          {partners.map((partner, index) => (
            <div
              key={index}
              className="flex items-center justify-center p-4 bg-[#0c1220] rounded-lg border border-gray-800 hover:border-gray-600 transition-colors"
            >
              <Image
                src={partner.logo || "/placeholder.svg"}
                alt={partner.name}
                width={120}
                height={60}
                className="opacity-70 hover:opacity-100 transition-opacity filter grayscale hover:grayscale-0"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
