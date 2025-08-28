import { useState } from "react"

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
  Present: "text-green-500",
  Absent: "text-red-500",
  Late: "text-orange-500",
}

const pillColors = {
  green: "bg-green-50 text-green-600 border border-green-300",
  blue: "bg-blue-50 text-blue-500 border border-blue-200",
  red: "bg-red-50 text-red-500 border border-red-200",
  orange: "bg-orange-50 text-orange-500 border border-orange-200",
}

export default function AttendanceLogTable() {
  const [search, setSearch] = useState("")

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      {/* Top controls */}
      <div className="flex flex-col md:flex-row md:items-center md:gap-4 gap-3 mb-4">
        {/* Search */}
        <div className="flex items-center border border-gray-300 rounded-md bg-white px-2 py-1 w-full md:w-auto">
          <svg className="w-4 h-4 text-gray-400 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="M21 21l-2-2"/></svg>
          <input
            className="bg-transparent focus:outline-none w-full"
            placeholder="Search here"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <button className="ml-2 px-2 py-1 bg-gray-100 text-gray-500 text-xs rounded border border-gray-300 hover:bg-gray-200">Search</button>
        </div>
        {/* Date Range */}
        <div className="flex items-center border border-gray-300 rounded-md bg-white px-3 py-1 min-w-[210px]">
          <span className="text-gray-500 text-xs md:text-sm">07/09/2025 - 07/08/2024</span>
          <svg className="w-4 h-4 text-gray-400 ml-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/></svg>
        </div>
        {/* Sort By */}
        <div className="flex items-center border border-gray-300 rounded-md bg-white px-3 py-1 min-w-[180px]">
          <span className="text-gray-500 text-xs md:text-sm">Sort By : Last 7 Days</span>
          <svg className="w-4 h-4 text-gray-400 ml-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/></svg>
        </div>
        {/* Status */}
        <div className="flex items-center border border-gray-300 rounded-md bg-white px-3 py-1 min-w-[150px]">
          <span className="text-gray-500 text-xs md:text-sm">Select Status</span>
          <svg className="w-4 h-4 text-gray-400 ml-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/></svg>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 text-gray-400 font-semibold text-xs">
              <th className="py-3 px-2 text-left min-w-[90px]">Date</th>
              <th className="py-3 px-2 text-left min-w-[80px]">Check In</th>
              <th className="py-3 px-2 text-left min-w-[70px]">Status</th>
              <th className="py-3 px-2 text-left min-w-[92px]">Check Out</th>
              <th className="py-3 px-2 text-left min-w-[60px]">Break</th>
              <th className="py-3 px-2 text-left min-w-[40px]">Late</th>
              <th className="py-3 px-2 text-left min-w-[60px]">Overtime</th>
              <th className="py-3 px-2 text-left min-w-[140px]">Production Hours</th>
              <th className="py-3 px-2 text-left min-w-[70px]">Edit</th>
            </tr>
          </thead>
          <tbody>
            {mockData.map((row, i) => (
              <tr key={i} className="text-gray-700 border-b last:border-b-0">
                <td className="py-3 px-2">{row.date}</td>
                <td className="py-3 px-2">{row.checkIn}</td>
                <td className="py-3 px-2 font-semibold">
                  <span className={statusColors[row.status] || "text-gray-500"}>{row.status}</span>
                </td>
                <td className="py-3 px-2">{row.checkOut}</td>
                <td className="py-3 px-2">{row.break}</td>
                <td className="py-3 px-2">{row.late}</td>
                <td className="py-3 px-2">{row.overtime}</td>
                <td className="py-3 px-2">
                  <span
                    className={`inline-flex items-center gap-1 text-xs rounded-full font-semibold px-3 py-1 ${pillColors[row.productionHours.color]}`}
                  >
                    {row.productionHours.color === "green" && (
                      <svg className="w-4 h-4" fill="none" stroke="#2ECC71" strokeWidth="2" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="10" stroke="#2ECC71" strokeWidth="2" fill="none"/>
                        <path d="M9.5 12.5l2 2 3-4" stroke="#2ECC71" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                    {row.productionHours.color === "blue" && (
                      <svg className="w-4 h-4" fill="none" stroke="#37B6E9" strokeWidth="2" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="10" stroke="#37B6E9" strokeWidth="2" fill="none"/>
                        <path d="M12 8v4l2 2" stroke="#37B6E9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                    {row.productionHours.color === "red" && (
                      <svg className="w-4 h-4" fill="none" stroke="#FF5757" strokeWidth="2" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="10" stroke="#FF5757" strokeWidth="2" fill="none"/>
                        <path d="M15 9l-6 6M9 9l6 6" stroke="#FF5757" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                    {row.productionHours.color === "orange" && (
                      <svg className="w-4 h-4" fill="none" stroke="#FFA500" strokeWidth="2" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="10" stroke="#FFA500" strokeWidth="2" fill="none"/>
                        <path d="M12 8v4h4" stroke="#FFA500" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                    <span>
                      {row.productionHours.value} Hrs
                    </span>
                  </span>
                </td>
                <td className="py-3 px-2">
                  {row.edit && (
                    <a href="#" className="text-sky-500 text-sm hover:underline font-semibold flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="#37B6E9" strokeWidth={2} viewBox="0 0 24 24"><path d="M15.232 5.232l3.536 3.536M16.5 3.5a2.121 2.121 0 113 3l-12.5 12.5-4 1 1-4 12.5-12.5z"/></svg>
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