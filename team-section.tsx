import Image from "next/image"

export default function TeamSection() {
  const teamMembers = [
    {
      name: "Dr. Sarah Chen",
      role: "CEO & Co-Founder",
      bio: "Former AI researcher at Google with 15+ years in machine learning and blockchain technology.",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      name: "Michael Rodriguez",
      role: "CTO & Co-Founder",
      bio: "Blockchain architect with extensive experience in distributed systems and cryptocurrency development.",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      name: "Dr. Emily Watson",
      role: "Head of AI Research",
      bio: "PhD in Computer Science, specializing in neural networks and decentralized AI systems.",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      name: "David Kim",
      role: "Lead Developer",
      bio: "Full-stack developer with expertise in smart contracts and blockchain infrastructure.",
      image: "/placeholder.svg?height=300&width=300",
    },
  ]

  return (
    <section className="py-20 bg-[#0c1220] relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Meet Our <span className="text-pink-500">Team</span>
          </h2>
          <p className="text-gray-400 max-w-3xl mx-auto text-lg">
            Our diverse team of experts brings together decades of experience in AI, blockchain, and technology
            innovation.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="text-center p-6 bg-[#070b14] rounded-xl border border-gray-800 hover:border-purple-600/50 transition-colors"
            >
              <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden">
                <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{member.name}</h3>
              <p className="text-purple-400 font-medium mb-3">{member.role}</p>
              <p className="text-gray-400 text-sm">{member.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
