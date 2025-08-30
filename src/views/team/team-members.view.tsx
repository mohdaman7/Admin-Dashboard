import { Mails, Phone } from "lucide-react"

interface TeamMember {
  id: number
  name: string
  role: string
  avatar: string
}

const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Karan Malhotra",
    role: "Python Developers",
    avatar: "/profile-img-6.jpg",
  },
  {
    id: 2,
    name: "Amal Ahammed",
    role: "React Developers",
    avatar: "/profile-img-6.jpg",
  },
  {
    id: 3,
    name: "Priya Singh",
    role: "MERN Stack Developers",
    avatar: "/profile-img-6.jpg",
  },
  {
    id: 4,
    name: "Shamnas",
    role: "Flutter Developers",
    avatar: "/profile-img-6.jpg",
  },
  {
    id: 5,
    name: "Arjun Reddy",
    role: "MEAN Stack Developers",
    avatar: "/public/profile-img-6.jpg",
  },
  {
    id: 6,
    name: "Neha Kulkarni",
    role: "Python Developers",
    avatar: "/profile-img-6.jpg",
  },
]

export default function TeamMembers() {
  return (
    <div
      className="bg-white rounded-lg shadow-sm"
      style={{
        width: "511px",
        height: "650px",
        padding: "16px",
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-2xl font-semibold text-gray-800 p-4">Team Members</h2>
        <button className="text-gray-500 hover:text-gray-700 font-normal transition-colors">View All</button>
      </div>

      {/* Divider */}
      <div className="w-full h-0.5 bg-blue-200 animate-scale-x mb-5" />

      {/* Team Members List */}
      <div className="space-y-1 overflow-y-auto mt-8" style={{ height: "calc(650px - 120px)" }}>
        {teamMembers.map((member) => (
          <div
            key={member.id}
            className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors border-2"
          >
            {/* Left side - Avatar and Info */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                <img
                  src={member.avatar || "/placeholder.svg"}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="pl-3">
                <h3 className="text-lg font-semibold text-gray-900">{member.name}</h3>
                <p className="text-base font-medium text-gray-500">{member.role}</p>
              </div>
            </div>

            {/* Right side - Action Icons */}
            <div className="flex items-center gap-5">
              <button className="h-8 w-8 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors">
                <Mails className="h-6 w-6" />
              </button>
              <button className="h-8 w-8 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors">
                <Phone className="h-6 w-6" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
