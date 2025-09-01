import { useState } from "react"
import { BiSearchAlt2 } from "react-icons/bi"
import { FaCheckCircle, FaExclamationCircle, FaTimesCircle, FaClock } from "react-icons/fa"

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
  const [rows, setRows] = useState(() => mockData.map((r) => ({ ...r, edit: true })))

  const START_TIME = "09:31 AM"

  const toMinutes = (time: string) => {
    if (!time || time === "--") return null
    const [hhmm, meridiem] = time.split(" ")
    let [h, m] = hhmm.split(":").map((n) => Number.parseInt(n, 10))
    if (meridiem === "PM" && h !== 12) h += 12
    if (meridiem === "AM" && h === 0) h = 0
    return h * 60 + m
  }

  type Meridiem = "AM" | "PM"
  type TimeForm = { hour: string; min: string; meridiem: Meridiem }

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editIndex, setEditIndex] = useState<number | null>(null)
  const [checkInForm, setCheckInForm] = useState<TimeForm>({ hour: "09", min: "00", meridiem: "AM" })
  const [checkOutForm, setCheckOutForm] = useState<TimeForm>({ hour: "06", min: "00", meridiem: "PM" })

  const clamp = (v: number, min: number, max: number) => Math.min(Math.max(v, min), max)
  const pad2 = (v: number | string) => String(v).padStart(2, "0")

  const parseTimeToForm = (time?: string | null): TimeForm => {
    if (!time || time === "--") return { hour: "09", min: "00", meridiem: "AM" }
    const [hhmm, meridiem] = time.split(" ")
    const [h, m] = hhmm.split(":").map((n) => Number.parseInt(n, 10))
    const hour12 = ((h + 11) % 12) + 1 // convert 0-23 to 1-12
    return { hour: pad2(hour12), min: pad2(m), meridiem: (meridiem as Meridiem) || "AM" }
  }

  const formatForm = (t: TimeForm) =>
    `${pad2(clamp(Number(t.hour) || 0, 1, 12))}:${pad2(clamp(Number(t.min) || 0, 0, 59))} ${t.meridiem}`

  const openEditModal = (index: number) => {
    const r = rows[index]
    setEditIndex(index)
    setCheckInForm(parseTimeToForm(r.checkIn))
    setCheckOutForm(parseTimeToForm(r.checkOut))
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setEditIndex(null)
  }

  const lateLabel = (minsLate: number) => {
    if (minsLate <= 0) return "--"
    const h = Math.floor(minsLate / 60)
    const m = minsLate % 60
    if (m === 0) return `${String(h).padStart(2, "0")}h`
    if (h === 0) return `${m}m`
    return `${String(h).padStart(2, "0")}h ${m}m`
  }

  const parseBreakToMinutes = (b?: string) => {
    if (!b || b === "--") return 0
    const h = Number.parseInt(b.match(/(\d+)\s*h/i)?.[1] ?? "0", 10)
    const m = Number.parseInt(b.match(/(\d+)\s*m/i)?.[1] ?? "0", 10)
    return h * 60 + m
  }

  // Formats minutes as "HH.MM" to match your pill display (e.g., 07.25 Hrs)
  const formatProductionValue = (mins: number) => {
    const h = Math.floor(mins / 60)
    const m = mins % 60
    return `${String(h).padStart(2, "0")}.${String(m).padStart(2, "0")}`
  }

  type PillColor = "green" | "blue" | "red" | "orange"
  const computeProductionColor = (status: string, workedMins: number): PillColor => {
    // Absent or no worked time -> red
    if (status === "Absent" || workedMins <= 0) return "red"
    // Long day/overtime -> blue (>= 9h)
    if (workedMins >= 9 * 60) return "blue"
    // Normal day -> green (>= 7h)
    if (workedMins >= 7 * 60) return "green"
    // Short day -> orange
    return "orange"
  }

  const editTimes = (rowIndex: number, newCheckIn = "09:00 AM", newCheckOut = "06:00 PM") => {
    setRows((prev) =>
      prev.map((r, i) => {
        if (i !== rowIndex) return r

        const start = toMinutes(START_TIME) ?? 0
        const inMins = toMinutes(newCheckIn)
        const outMins = toMinutes(newCheckOut)

        const lateMins = inMins !== null ? inMins - start : 0
        const nextStatus = inMins !== null && lateMins > 0 ? "Late" : "Present"
        const nextLate = inMins !== null ? lateLabel(lateMins) : r.late

        // production hours = (checkout - checkin - break)
        const breakMins = parseBreakToMinutes(r.break)
        const workedMins = inMins !== null && outMins !== null ? Math.max(outMins - inMins - breakMins, 0) : 0
        const nextProductionValue = formatProductionValue(workedMins)
        const nextProductionColor = computeProductionColor(nextStatus, workedMins)

        return {
          ...r,
          checkIn: newCheckIn,
          checkOut: newCheckOut,
          status: nextStatus,
          late: nextLate,
          productionHours: { value: nextProductionValue, color: nextProductionColor },
          edit: true,
        }
      }),
    )
  }

  const handleUpdateTimes = () => {
    if (editIndex === null) return
    const newIn = formatForm(checkInForm)
    const newOut = formatForm(checkOutForm)
    editTimes(editIndex, newIn, newOut)
    closeModal()
  }

  const filteredRows = rows.filter((row) => {
    if (!search) return true
    const q = search.toLowerCase()
    return (
      row.date.toLowerCase().includes(q) ||
      (row.checkIn || "").toLowerCase().includes(q) ||
      (row.checkOut || "").toLowerCase().includes(q) ||
      row.status.toLowerCase().includes(q)
    )
  })

  return (
    <div
      className="bg-white rounded-[10px] shadow-sm min-h-full my-16"
      style={{
        width: "1469px",
        borderRadius: "10px",
        background: "#FFF",
      }}
    >
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
              <th className="py-5 px-3 text-left" style={{ width: "87px" }}>
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
            {filteredRows.map((row, i) => (
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
                    className={`inline-flex items-center gap-1 text-base rounded-md font-medium px-3 py-1 ${pillColors[row.productionHours.color]}`}
                  >
                    {row.productionHours.color === "green" && <FaCheckCircle className="w-4 h-4" color="#19C773" />}
                    {row.productionHours.color === "blue" && <FaClock className="w-4 h-4" color="#37B6E9" />}
                    {row.productionHours.color === "red" && <FaTimesCircle className="w-4 h-4" color="#FF3A3A" />}
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
                      onClick={(e) => {
                        e.preventDefault()
                        openEditModal(i)
                      }}
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

      {/* Time Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="edit-times-title"
            className="bg-white rounded-xl shadow-xl w-[760px] max-w-[95%] p-6 relative"
          >
            <button
              aria-label="Close"
              onClick={closeModal}
              className="absolute right-4 top-3 text-[#8E8E8E] hover:text-[#4D4D4D]"
            >
              ✕
            </button>

            <h3 id="edit-times-title" className="text-[#4D4D4D] text-xl font-semibold mb-4">
              Edit Punch In Time
            </h3>

            <div className="rounded-xl bg-[#06A4E2] px-6 py-5 mb-6 text-white">
              <div className="flex items-center gap-6">
                {/* Hours */}
                <div className="flex flex-col items-center">
                  <input
                    type="number"
                    min={1}
                    max={12}
                    value={checkInForm.hour}
                    onChange={(e) =>
                      setCheckInForm((f) => ({ ...f, hour: pad2(clamp(Number(e.target.value) || 0, 1, 12)) }))
                    }
                    className="w-24 text-center text-4xl font-semibold bg-white text-[#0A4B66] rounded-md py-2 no-spinner"
                  />
                  <span className="mt-2 text-xs tracking-wider">HOURS</span>
                </div>

                <span className="text-4xl font-bold opacity-70">|</span>

                {/* Minutes */}
                <div className="flex flex-col items-center">
                  <input
                    type="number"
                    min={0}
                    max={59}
                    value={checkInForm.min}
                    onChange={(e) =>
                      setCheckInForm((f) => ({ ...f, min: pad2(clamp(Number(e.target.value) || 0, 0, 59)) }))
                    }
                    className="w-24 text-center text-4xl font-semibold bg-white text-[#0A4B66] rounded-md py-2 no-spinner"
                  />
                  <span className="mt-2 text-xs tracking-wider">MINS</span>
                </div>

                {/* AM/PM */}
                <div className="ml-auto flex items-center gap-2">
                  {(["AM", "PM"] as const).map((m) => (
                    <button
                      key={m}
                      onClick={() => setCheckInForm((f) => ({ ...f, meridiem: m }))}
                      className={`px-3 py-2 rounded-md border text-sm ${
                        checkInForm.meridiem === m
                          ? "bg-white text-[#06A4E2] border-white"
                          : "bg-transparent border-white"
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <h3 className="text-[#4D4D4D] text-xl font-semibold mb-4">Edit Punch Out Time</h3>

            <div className="rounded-xl bg-[#06A4E2] px-6 py-5 mb-6 text-white">
              <div className="flex items-center gap-6">
                {/* Hours */}
                <div className="flex flex-col items-center">
                  <input
                    type="number"
                    min={1}
                    max={12}
                    value={checkOutForm.hour}
                    onChange={(e) =>
                      setCheckOutForm((f) => ({ ...f, hour: pad2(clamp(Number(e.target.value) || 0, 1, 12)) }))
                    }
                    className="w-24 text-center text-4xl font-semibold bg-white text-[#0A4B66] rounded-md py-2 no-spinner"
                  />
                  <span className="mt-2 text-xs tracking-wider">HOURS</span>
                </div>

                <span className="text-4xl font-bold opacity-70">|</span>

                {/* Minutes */}
                <div className="flex flex-col items-center">
                  <input
                    type="number"
                    min={0}
                    max={59}
                    value={checkOutForm.min}
                    onChange={(e) =>
                      setCheckOutForm((f) => ({ ...f, min: pad2(clamp(Number(e.target.value) || 0, 0, 59)) }))
                    }
                    className="w-24 text-center text-4xl font-semibold bg-white text-[#0A4B66] rounded-md py-2 no-spinner"
                  />
                  <span className="mt-2 text-xs tracking-wider">MINS</span>
                </div>

                {/* AM/PM */}
                <div className="ml-auto flex items-center gap-2">
                  {(["AM", "PM"] as const).map((m) => (
                    <button
                      key={m}
                      onClick={() => setCheckOutForm((f) => ({ ...f, meridiem: m }))}
                      className={`px-3 py-2 rounded-md border text-sm ${
                        checkOutForm.meridiem === m
                          ? "bg-white text-[#06A4E2] border-white"
                          : "bg-transparent border-white"
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={handleUpdateTimes}
                className="px-5 py-2 rounded-md border border-[#06A4E2] text-[#06A4E2] hover:bg-[#06A4E2]/5 transition-colors"
              >
                Update Time
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
