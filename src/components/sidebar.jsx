"use client"
import { FiGrid, FiClock, FiFileText, FiCheckSquare, FiTrendingUp, FiZap } from "react-icons/fi"

const Sidebar = ({ selectedItem, onItemClick }) => {
  const sidebarItems = [
    { id: "overview", label: "Overview Cards", icon: FiGrid },
    { id: "attendance", label: "Attendance Summary", icon: FiClock },
    { id: "leave", label: "Leave Requests", icon: FiFileText },
    { id: "task", label: "Task Tracker", icon: FiCheckSquare },
    { id: "productivity", label: "Productivity & Stats", icon: FiTrendingUp },
    { id: "quick", label: "Quick Action Panel", icon: FiZap },
  ]

  return (
    <div className="w-[250px] md:w-[300px] lg:w-[300px] min-h-screen bg-white border-r border-gray-200 flex flex-col">
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 pt-6 pb-5">
        <div className="w-[34px] h-[34px] bg-blue-600 rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-lg">Z</span>
        </div>
        <h1 className="text-[18px] font-semibold text-blue-600 tracking-wide font-sans">Ziya Attendance</h1>
      </div>

      {/* Divider */}
      <div className="w-full h-[1px] bg-gray-200 mb-4" />

      {/* Sidebar Items */}
      <div className="flex flex-col gap-2 px-3">
        {sidebarItems.map((item) => {
          const isActive = selectedItem === item.label
          const IconComponent = item.icon

          return (
            <div
              key={item.id}
              onClick={() => onItemClick(item.label)}
              className={`flex items-center gap-3 px-3 py-3 rounded-md cursor-pointer transition-all duration-200 ${
                isActive ? "bg-[#E1F1FF]" : "hover:bg-[#E1F1FF]"
              }`}
            >
              <IconComponent
                className={`w-[24px] h-[24px] transition-all duration-200 ${
                  isActive ? "text-blue-600" : "text-gray-600"
                }`}
              />
              <span className={`text-sm font-medium font-sans ${isActive ? "text-blue-600" : "text-gray-700"}`}>
                {item.label}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Sidebar
