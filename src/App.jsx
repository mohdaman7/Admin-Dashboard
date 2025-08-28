import { useState } from "react"
import EmployeeProfile from "./components/employee-profile"
import Header from "./components/header"
import Sidebar from "./components/sidebar"
import LeaveStatus from "./components/leave-status"
import TeamMembers from "./components/team-members"
import AttendanceLogTable from "./components/AttendanceLogTable"

function App() {
  const [selectedItem, setSelectedItem] = useState("Employee Dashboard")

  const handleItemClick = (itemLabel) => {
    setSelectedItem(itemLabel)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar selectedItem={selectedItem} onItemClick={handleItemClick} />
      <div className="flex-1 flex flex-col">
        <Header />
        <div className="flex-1">
          <div className="bg-white border-b border-gray-200 px-6 py-4">
            <div className="flex items-center space-x-4">
              <button className="flex items-center text-gray-600 hover:text-gray-800">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back
              </button>
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-blue-100 rounded flex items-center justify-center">
                  <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="text-gray-800 font-medium">Employees Dashboard</span>
              </div>
            </div>
          </div>
          <div className="p-6">
            <EmployeeProfile />
            <div className="mt-8 flex gap-6">
              <LeaveStatus />
              <TeamMembers />
            </div>
            <div className="mt-8">
              <AttendanceLogTable />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App