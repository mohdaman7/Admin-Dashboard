"use client"

import { useState } from "react"

export default function LeaveStatus() {
  const [hoveredRole, setHoveredRole] = useState(null)

  const roles = [
    {
      id: "employee",
      name: "Employee",
      position: { left: "4rem", top: "6rem" },
      status: "active",
      image: "/public/profile-img-6.jpg",
      fallback: "E",
    },
    {
      id: "teamlead",
      name: "Team Lead",
      position: { left: "16rem", top: "14rem" },
      status: "active",
      image: "/public/profile-img-6.jpg",
      fallback: "TL",
    },
    {
      id: "projectlead",
      name: "Project Lead",
      position: { left: "50%", top: "2rem", transform: "translateX(-50%)" },
      status: "pending",
      image: "/public/profile-img-6.jpg",
      fallback: "PL",
    },
    {
      id: "hr",
      name: "HR",
      position: { right: "16rem", top: "14rem" },
      status: "pending",
      image: "/public/profile-img-6.jpg",
      fallback: "HR",
    },
    {
      id: "ceo",
      name: "CEO",
      position: { right: "4rem", top: "6rem" },
      status: "pending",
      image: "/public/profile-img-6.jpg",
      fallback: "CEO",
    },
  ]

  return (
    <div
      className="bg-white rounded-lg shadow-sm"
      style={{
        width: "943px",
        height: "650px",
        padding: "16px",
      }}
    >
      <div className="mb-8 animate-fade-in">
        <h1 className="text-2xl font-semibold text-gray-800 mb-2 p-4 pl-5">Leave Status</h1>
        <div className="ml-5 w-11/12 h-0.5 bg-blue-200 animate-scale-x" />
      </div>

      <div className="relative mb-8" style={{ height: "280px" }}>
        <img
          src="/Vector 3.jpg"
          alt="Employee to Team Lead connection"
          className="absolute animate-fade-in"
          style={{
            left: "90px",
            top: "160px",
            width: "180px",
            height: "80px",
            animationDelay: "0.5s",
          }}
        />

        <img
          src="/Vector 4.jpg"
          alt="Team Lead to Project Lead connection"
          className="absolute animate-fade-in"
          style={{
            left: "305px",
            top: "50px",
            width: "180px",
            height: "210px",
            animationDelay: "1s",
          }}
        />

        <img
          src="/Vector 5.jpg"
          alt="Project Lead to HR connection"
          className="absolute animate-fade-in"
          style={{
            left: "480px",
            top: "60px",
            width: "160px",
            height: "170px",
            animationDelay: "1.5s",
          }}
        />

        <img
          src="/Vector 6.jpg"
          alt="HR to CEO connection"
          className="absolute animate-fade-in"
          style={{
            left: "655px",
            top: "125px",
            width: "155px",
            height: "145px",
            animationDelay: "2s",
          }}
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
              <div className="relative">
                <div
                  className={`rounded-full border-2 transition-all duration-300 overflow-hidden transform hover:scale-110 ${
                    role.status === "active" ? "border-green-400 shadow-lg shadow-green-200" : "border-gray-300"
                  } ${hoveredRole === role.id ? "shadow-xl" : ""}`}
                  style={{
                    width: "40px",
                    height: "40px",
                  }}
                >
                  <img
                    src={role.image || "/placeholder.svg"}
                    alt={role.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = "none"
                      e.target.parentElement.innerHTML = `<div class="w-full h-full flex items-center justify-center text-xs font-medium ${
                        role.status === "active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"
                      }">${role.fallback}</div>`
                    }}
                  />
                </div>

              </div>
              <span
                className={`mt-2 text-base font-semibold transition-all duration-300 ${
                  hoveredRole === role.id ? "text-blue-600 transform -translate-y-0.5" : "text-gray-700"
                }`}
              >
                {role.name}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="text-right animate-fade-in-up mt-24 mr-12">
        <p className="text-right text-gray-700 mb-4 text-lg pr-12">Check Details, Then Approve or Reject</p>
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
      `}</style>
    </div>
  )
}
