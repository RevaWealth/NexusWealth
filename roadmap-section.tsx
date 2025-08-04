import { CheckCircle, Circle, Clock } from "lucide-react"

export default function RoadmapSection() {
  const roadmapItems = [
    {
      phase: "Phase 1",
      title: "Foundation & Launch",
      status: "current",
      items: ["Smart Contract Development", "Security Audits", "Token Launch", "Community Building"],
    },
    {
      phase: "Phase 2",
      title: "AI Integration",
      status: "upcoming",
      items: ["AI Model Integration", "Testnet Launch", "Developer Tools", "Partnership Expansion"],
    },
    {
      phase: "Phase 3",
      title: "Mainnet & Scaling",
      status: "upcoming",
      items: ["Mainnet Launch", "Cross-chain Integration", "Enterprise Solutions", "Global Expansion"],
    },
    {
      phase: "Phase 4",
      title: "Exponential Growth",
      status: "upcoming",
      items: ["DeFi Integration", "NFT Marketplace", "Mobile Applications", "Governance Launch"],
    },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-6 w-6 text-green-400" />
      case "current":
        return <Clock className="h-6 w-6 text-yellow-400" />
      default:
        return <Circle className="h-6 w-6 text-gray-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "border-green-400"
      case "current":
        return "border-yellow-400"
      default:
        return "border-gray-600"
    }
  }

  return (
    <section className="py-20 bg-[#070b14] relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Development <span className="text-indigo-400">Roadmap</span>
          </h2>
          <p className="text-gray-400 max-w-3xl mx-auto text-lg">
            Our strategically aggressive roadmap outlines the key milestones in building the future investment through the tokenization of the RWA        
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {roadmapItems.map((item, index) => (
            <div key={index} className={`p-6 bg-[#0c1220] rounded-xl border-2 ${getStatusColor(item.status)}`}>
              <div className="flex items-center mb-4">
                {getStatusIcon(item.status)}
                <span className="ml-2 text-sm font-medium text-gray-400">{item.phase}</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">{item.title}</h3>
              <ul className="space-y-2">
                {item.items.map((listItem, itemIndex) => (
                  <li key={itemIndex} className="text-gray-400 text-sm flex items-center">
                    <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mr-2"></div>
                    {listItem}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
