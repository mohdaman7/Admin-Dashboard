import { useState } from "react"
import { BiSearchAlt2 } from "react-icons/bi";
import { 
  FaCheckCircle, 
  FaExclamationCircle, 
  FaTimesCircle, 
  FaClock 
} from "react-icons/fa";

const mockData = [
  {
    date: "28 JUL 2025",
    checkIn: "09:31 AM",
    status: "Present",
    checkOut: "06:02 PM",
    break: "01h 5m",
    late: "--",
    overtime: "--",
    productionHours: { value: "07.25", color: "green" },
    edit: true,
  },
  {
    date: "27 JUL 2025",
    checkIn: "09:31 AM",
    status: "Present",
    checkOut: "06:02 PM",
    break: "01h 5m",
    late: "--",
    overtime: "03h 15m",
    productionHours: { value: "10.15", color: "blue" },
    edit: true,
  },
  {
    date: "26 JUL 2025",
    checkIn: "--",
    status: "Absent",
    checkOut: "--",
    break: "--",
    late: "--",
    overtime: "--",
    productionHours: { value: "08.3", color: "red" },
    edit: false,
  },
  {
    date: "25 JUL 2025",
    checkIn: "--",
    status: "Absent",
    checkOut: "--",
    break: "--",
    late: "--",
    overtime: "--",
    productionHours: { value: "08.3", color: "red" },
    edit: true,
  },
  {
    date: "24 JUL 2025",
    checkIn: "--",
    status: "Absent",
    checkOut: "--",
    break: "--",
    late: "--",
    overtime: "--",
    productionHours: { value: "08.3", color: "red" },
    edit: true,
  },
  {
    date: "23 JUL 2025",
    checkIn: "09:31 AM",
    status: "Present",
    checkOut: "06:02 PM",
    break: "01h 5m",
    late: "--",
    overtime: "--",
    productionHours: { value: "07.25", color: "green" },
    edit: true,
  },
  {
    date: "22 JUL 2025",
    checkIn: "11:31 AM",
    status: "Late",
    checkOut: "06:02 PM",
    break: "01h 5m",
    late: "02h",
    overtime: "--",
    productionHours: { value: "05.25", color: "orange" },
    edit: true,
  },
]

const statusColors = {
  Present: "text-[#19C773]",
  Absent: "text-[#FF3A3A]",
  Late: "text-[#FFA353]",
}

const pillColors = {
  green: "bg-[#E0FFF1] text-[#03C96F] border border-[#C7F2DD]",
  blue: "bg-[#E0F6FF] text-[#43C8FF] border border-[#BEE6F8]",
  red: "bg-[#FFE4E4] text-[#F11515] border border-[#FFDFDF]",
  orange: "bg-[#FFEFE4] text-[#FD7F20] border border-[#FFE1C2]",
}

export default function AttendanceLogTable() {
  const [search, setSearch] = useState("")

  return (
    <div
      className="bg-white rounded-[10px] shadow-sm min-h-full my-16"
      style={{
        width: "1469px",
        borderRadius: "10px",
        background: "#FFF",
      }}
    >
      {/* Top controls */}
      <div className="flex items-center gap-4 mb-6 px-10 pt-10">
        {/* Search */}
        <div className="flex items-center border border-[#E1E1E1] rounded-md bg-[#FFFFFF] px-2 py-1.5 w-[273px] h-[40px] mr-14">
          <BiSearchAlt2 className="w-5 h-5 text-[#B8B8B8] mr-1" />
          <input
            className="bg-transparent focus:outline-none flex-1 placeholder:text-[#B8B8B8] text-xs text-[#535353] min-w-0"
            placeholder="Search here"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="ml-1 px-2 py-0.5 bg-[#EAECEC] text-[#4D4D4D] text-xs rounded border border-[#E1E1E1] hover:bg-gray-50 transition-colors">
            Search
          </button>
        </div>

        {/* Date Range */}
        <div className="flex items-center justify-between border border-[#E1E1E1] rounded-md bg-[#FFFFFF] px-4 py-3 min-w-[320px] h-[50px] cursor-pointer hover:bg-gray-50 transition-colors">
          <span className="text-[#535353] text-lg font-poppins">07/09/2025 - 07/09/2024</span>
          <svg
            className="w-4 h-4 text-[#B8B8B8] ml-2"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>

        {/* Sort By */}
        <div className="flex items-center justify-between border border-[#E1E1E1] rounded-md bg-[#FFFFFF] px-4 py-3 min-w-[320px] h-[50px] cursor-pointer hover:bg-gray-50 transition-colors">
          <span className="text-[#535353] text-lg font-poppins">Sort By : Last 7 Days</span>
          <svg
            className="w-4 h-4 text-[#B8B8B8] ml-2"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>

        {/* Status */}
        <div className="flex items-center justify-between border border-[#E1E1E1] rounded-md bg-[#FFFFFF] px-4 py-3 min-w-[320px] h-[50px] cursor-pointer hover:bg-gray-50 transition-colors">
          <span className="text-[#535353] text-lg font-poppins">Select Status</span>
          <svg
            className="w-4 h-4 text-[#B8B8B8] ml-2"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto px-6 pb-6 -mx-6">
        <table className="w-full text-sm font-medium">
          <thead>
            <tr className="bg-[#F4F4F4] text-[#4D4D4D] font-bold text-base border-b border-[#F3F3F3]">
              <th className="py-4.3 px-3 pl-10 text-left" style={{ width: "124px" }}>
                Date
              </th>
              <th className="py-5 px-2 text-left" style={{ width: "100px" }}>
                Check In
              </th>
              <th className="py-5 px-3 text-left" style={{ width: "87px" }}>
                Status
              </th>
              <th className="py-5 px-3 text-left" style={{ width: "124px" }}>
                Check Out
              </th>
              <th className="py-5 px-3 text-left" style={{ width: "100px" }}>
                Break
              </th>
              <th className="py-5 px-2 text-left" style={{ width: "87px" }}>
                Late
              </th>
              <th className="py-5 px-2 text-left" style={{ width: "100px" }}>
                Overtime
              </th>
              <th className="py-5 px-2 text-left" style={{ width: "140px" }}>
                Production Hours
              </th>
              <th className="py-5 px-3 text-left" style={{ width: "76px" }}>
                Edit
              </th>
            </tr>
          </thead>
          <tbody>
            {mockData.map((row, i) => (
              <tr key={i} className="border-b last:border-b-0 border-[#F3F3F3] text-base">
                <td className="py-4 px-3 pl-10 text-[#535353]">{row.date}</td>
                <td className="py-4 px-3 text-[#535353]">{row.checkIn}</td>
                <td className="py-4 px-3 font-semibold">
                  <span className={statusColors[row.status] || "text-[#B8B8B8]"}>{row.status}</span>
                </td>
                <td className="py-4 px-3 text-[#535353]">{row.checkOut}</td>
                <td className="py-4 px-3 text-[#535353]">{row.break}</td>
                <td className="py-4 px-3 text-[#535353]">{row.late}</td>
                <td className="py-4 px-3 text-[#535353]">{row.overtime}</td>
                <td className="py-4 px-3">
                  <span
                    className={`inline-flex items-center gap-1 text-base rounded-md font-medium px-3 py-1 bord ${pillColors[row.productionHours.color]}`}
                  >
                    {row.productionHours.color === "green" && (
                      <FaCheckCircle className="w-4 h-4" color="#19C773" />
                    )}
                    {row.productionHours.color === "blue" && (
                      <FaClock className="w-4 h-4" color="#37B6E9" />
                    )}
                    {row.productionHours.color === "red" && (
                      <FaTimesCircle className="w-4 h-4" color="#FF3A3A" />
                    )}
                    {row.productionHours.color === "orange" && (
                      <FaExclamationCircle className="w-4 h-4" color="#FFA353" />
                    )}
                    <span className="ml-1">{row.productionHours.value} Hrs</span>
                  </span>
                </td>
                <td className="py-3 px-1">
                  {row.edit && (
                    <a
                      href="#"
                      className="text-[#00A0E3] text-sm hover:underline font-semibold flex items-center gap-1"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="#37B6E9" strokeWidth={2} viewBox="0 0 24 24">
                        <path d="M15.232 5.232l3.536 3.536M16.5 3.5a2.121 2.121 0 113 3l-12.5 12.5-4 1 1-4 12.5-12.5z" />
                      </svg>
                      Edit Log
                    </a>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}