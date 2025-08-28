import { useState } from "react"

export default function LeaveStatus() {
  const [hoveredRole, setHoveredRole] = useState(null)

  const roles = [
    {
      id: "employee",
      name: "Employee",
      position: { left: "4rem", top: "4rem" },
      status: "approved",
      image: "/public/profile-img-6.jpg",
      fallback: "E",
      labelPosition: "top",
    },
    {
      id: "teamlead",
      name: "Team Lead",
      position: { left: "15.5rem", top: "14rem" },
      status: "approved",
      image: "/public/profile-img-6.jpg",
      fallback: "TL",
      labelPosition: "bottom",
    },
    {
      id: "projectlead",
      name: "Project Lead",
      position: { left: "47%", top: "0.5rem", transform: "translateX(-50%)" },
      status: "pending",
      image: "/public/profile-img-6.jpg",
      fallback: "PL",
      labelPosition: "top",
    },
    {
      id: "hr",
      name: "HR",
      position: { right: "14.2rem", top: "13.3rem" },
      status: "pending",
      image: "/public/profile-img-6.jpg",
      fallback: "HR",
      labelPosition: "bottom",
    },
    {
      id: "ceo",
      name: "CEO",
      position: { right: "4.2rem", top: "4rem" },
      status: "pending",
      image: "/public/profile-img-6.jpg",
      fallback: "CEO",
      labelPosition: "top",
    },
  ]

  const lineConnections = [
    { src: "/Vector 3.jpg", green: false, style: { left: "94px", top: "140px", width: "180px", height: "120px" } },
    { src: "/Vector 4.jpg", srcGreen: "/Vector 4_green.jpg", from: 1, to: 2, style: { left: "305px", top: "55px", width: "180px", height: "200px" } },
    { src: "/Vector 5.jpg", srcGreen: "/Vector 5_green.jpg", from: 2, to: 3, style: { left: "480px", top: "60px", width: "180px", height: "200px" } },
    { src: "/Vector 6.jpg", srcGreen: "/Vector 6_green.jpg", from: 3, to: 4, style: { left: "655px", top: "125px", width: "180px", height: "145px" } },
  ]

  const lastActiveRoleIndex = roles.reduce(
    (acc, role, idx) => role.status === "approved" ? idx : acc,
    -1
  )

  return (
    <div
      className="bg-white rounded-lg shadow-sm"
      style={{
        width: "943px",
        height: "650px",
        padding: "16px",
      }}
    >
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-800 mb-2 p-4 pl-5">Leave Status</h1>
        <div className="ml-5 w-11/12 h-0.5 bg-blue-200" />
      </div>

      <div className="relative mb-8" style={{ height: "280px" }}>
        {/* No animation classes on lines */}
        <img src="/Vector 3.jpg" alt="Employee to Team Lead connection" className="absolute" style={lineConnections[0].style} />
        <img
          src={lastActiveRoleIndex >= 2 ? lineConnections[1].srcGreen : lineConnections[1].src}
          alt="Team Lead to Project Lead connection"
          className="absolute"
          style={lineConnections[1].style}
        />
        <img
          src={lastActiveRoleIndex >= 3 ? lineConnections[2].srcGreen : lineConnections[2].src}
          alt="Project Lead to HR connection"
          className="absolute"
          style={lineConnections[2].style}
        />
        <img
          src={lastActiveRoleIndex >= 4 ? lineConnections[3].srcGreen : lineConnections[3].src}
          alt="HR to CEO connection"
          className="absolute"
          style={lineConnections[3].style}
        />

        {roles.map((role, index) => (
          <div
            key={role.id}
            className={`absolute animate-scale-in`}
            style={{
              ...role.position,
              animationDelay: `${index * 0.2}s`,
            }}
            onMouseEnter={() => setHoveredRole(role.id)}
            onMouseLeave={() => setHoveredRole(null)}
          >
            <div className="flex flex-col items-center cursor-pointer">
              {role.labelPosition === "top" && (
                <span
                  className={`mb-2 text-base font-semibold transition-all duration-300 ${
                    hoveredRole === role.id ? "text-blue-600 transform -translate-y-0.5" : "text-gray-700"
                  }`}
                >
                  {role.name}
                </span>
              )}

              <div className="relative leave-avatar-wrapper">
                <div
                  className={`leave-avatar
                    ${role.status === "approved" ? "leave-avatar-approved" : ""}
                    ${role.status === "pending" ? "leave-avatar-pending" : ""}
                    ${hoveredRole === role.id ? "shadow-xl" : ""}
                  `}
                >
                  <img
                    src={role.image || "/placeholder.svg"}
                    alt={role.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = "none"
                      e.target.parentElement.innerHTML = `<div class="w-full h-full flex items-center justify-center text-xs font-medium ${
                        role.status === "approved" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"
                      }">${role.fallback}</div>`
                    }}
                  />
                </div>
              </div>

              {/* Label below */}
              {role.labelPosition === "bottom" && (
                <span
                  className={`mt-2 text-base font-semibold transition-all duration-300 ${
                    hoveredRole === role.id ? "text-blue-600 transform -translate-y-0.5" : "text-gray-700"
                  }`}
                >
                  {role.name}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="text-right animate-fade-in-up mt-24 mr-12">
        <p className="text-right text-gray-700 mb-4 text-lg pr-12 font-medium">Check Details, Then Approve or Reject</p>
        <div className="flex justify-end gap-3 ">
          <button style={{ backgroundColor: "#F34040"}} className="px-6 py-2 text-xl font-medium bg-red-500 hover:bg-red-600 text-white rounded-md shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95">
            Reject Leave
          </button>
          <button style={{ backgroundColor: "#31ED31" }} className="px-6 py-2 text-xl font-medium hover:bg-green-600 text-white rounded-md shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95">
            Approve Leave
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes scaleX {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }

        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0); }
          to { opacity: 1; transform: scale(1); }
        }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .animate-fade-in {
          animation: fadeIn 0.6s ease-out;
        }

        .animate-scale-x {
          animation: scaleX 0.8s ease-out 0.3s both;
          transform-origin: left;
        }

        .animate-scale-in {
          animation: scaleIn 0.5s ease-out both;
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.6s ease-out 2s both;
        }

        .leave-avatar-wrapper {
          padding: 6px;
          background: transparent;
        }
        .leave-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          overflow: hidden;
          background: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: box-shadow 0.3s, border 0.3s;
          border: 2.5px solid #fff;
        }
        .leave-avatar-approved {
          box-shadow: 0 0 18px 6px #6EFF86;
        }
        .leave-avatar-pending {
          box-shadow: 0 0 18px 4px #2224;
        }
      `}</style>
    </div>
  )
}