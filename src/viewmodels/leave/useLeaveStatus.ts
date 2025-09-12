import { useMemo, useState } from "react"

export interface Role {
  id: string
  name: string
  position: React.CSSProperties
  status: "approved" | "pending" | "inactive"
  image: string
  fallback: string
  labelPosition: "top" | "bottom"
}

export interface LineConnection {
  src: string
  srcGreen?: string
  from?: number
  to?: number
  style: React.CSSProperties
}

export interface LeaveRequest {
  employeeName: string
  employeeId: string
  leaveDays: number
  leaveType: string
  startDate: string
  endDate: string
  reason: string
  currentApprover: string
  status: "pending" | "approved" | "rejected"
}

export interface ChecklistItem {
  id: string
  label: string
  checked: boolean
}

export function useLeaveStatus() {
  const [hoveredRole, setHoveredRole] = useState<string | null>(null)
  const [leaveRequest, setLeaveRequest] = useState<LeaveRequest>({
    employeeName: "Amal Ahammed",
    employeeId: "SD201",
    leaveDays: 6,
    leaveType: "Casual Leave",
    startDate: "25/08/2025",
    endDate: "30/08/2025",
    reason: "Personal work",
    currentApprover: "teamlead",
    status: "pending"
  })

  // Checklist items for each role
  const [checklistItems, setChecklistItems] = useState<Record<string, ChecklistItem[]>>({
    teamlead: [
      { id: "workload", label: "Workload", checked: false },
      { id: "impact", label: "Project Impact", checked: false },
      { id: "availability", label: "Team availability", checked: false }
    ],
    projectlead: [
      { id: "team-availability", label: "Team availability", checked: false },
      { id: "project-deadlines", label: "Project deadlines", checked: false }
    ],
    hr: [
      { id: "leave-balance", label: "Leave balance", checked: false },
      { id: "documentation", label: "Documentation", checked: false }
    ],
    ceo: [
      { id: "business-impact", label: "Business Impact", checked: false },
      { id: "strategic-planning", label: "Strategic Planning", checked: false }
    ]
  })

  const roleHierarchy = ["employee", "teamlead", "projectlead", "hr", "ceo"]

  const roles: Role[] = useMemo(
    () => [
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
        status: leaveRequest.currentApprover === "teamlead" ? "pending" : "approved",
        image: "/public/profile-img-6.jpg",
        fallback: "TL",
        labelPosition: "bottom",
      },
      {
        id: "projectlead",
        name: "Project Lead",
        position: { left: "47%", top: "0.5rem", transform: "translateX(-50%)" },
        status: leaveRequest.currentApprover === "projectlead" ? "pending" : 
               roleHierarchy.indexOf(leaveRequest.currentApprover) > roleHierarchy.indexOf("projectlead") ? "approved" : "inactive",
        image: "/public/profile-img-6.jpg",
        fallback: "PL",
        labelPosition: "top",
      },
      {
        id: "hr",
        name: "HR",
        position: { right: "14.2rem", top: "13.3rem" },
        status: leaveRequest.currentApprover === "hr" ? "pending" :
               roleHierarchy.indexOf(leaveRequest.currentApprover) > roleHierarchy.indexOf("hr") ? "approved" : "inactive",
        image: "/public/profile-img-6.jpg",
        fallback: "HR",
        labelPosition: "bottom",
      },
      {
        id: "ceo",
        name: "CEO",
        position: { right: "4.2rem", top: "4rem" },
        status: leaveRequest.currentApprover === "ceo" ? "pending" : "inactive",
        image: "/public/profile-img-6.jpg",
        fallback: "CEO",
        labelPosition: "top",
      },
    ],
    [leaveRequest.currentApprover],
  )

  const lineConnections: LineConnection[] = useMemo(
    () => [
      { src: "/Vector 3.jpg", style: { left: "94px", top: "140px", width: "180px", height: "120px" } },
      {
        src: "/Vector 4.jpg",
        srcGreen: "/Vector 4_green.jpg",
        from: 1,
        to: 2,
        style: { left: "305px", top: "55px", width: "180px", height: "200px" },
      },
      {
        src: "/Vector 5.jpg",
        srcGreen: "/Vector 5_green.jpg",
        from: 2,
        to: 3,
        style: { left: "480px", top: "60px", width: "180px", height: "200px" },
      },
      {
        src: "/Vector 6.jpg",
        srcGreen: "/Vector 6_green.jpg",
        from: 3,
        to: 4,
        style: { left: "655px", top: "125px", width: "180px", height: "145px" },
      },
    ],
    [],
  )

  const lastActiveRoleIndex = useMemo(
    () => {
      const currentIndex = roleHierarchy.indexOf(leaveRequest.currentApprover)
      return Math.max(0, currentIndex - 1)
    },
    [leaveRequest.currentApprover],
  )

  const handleApprove = () => {
    setLeaveRequest(prev => ({ ...prev, status: "approved" }))
  }

  const handleReject = () => {
    setLeaveRequest(prev => ({ ...prev, status: "rejected" }))
  }

  const handleTransfer = () => {
    const currentIndex = roleHierarchy.indexOf(leaveRequest.currentApprover)
    const nextRole = roleHierarchy[currentIndex + 1]
    
    if (nextRole) {
      setLeaveRequest(prev => ({
        ...prev,
        currentApprover: nextRole
      }))
    }
  }

  const canTransfer = () => {
    const currentIndex = roleHierarchy.indexOf(leaveRequest.currentApprover)
    return currentIndex < roleHierarchy.length - 1 && leaveRequest.status === "pending"
  }

  const toggleChecklistItem = (roleId: string, itemId: string) => {
    setChecklistItems(prev => ({
      ...prev,
      [roleId]: prev[roleId].map(item =>
        item.id === itemId ? { ...item, checked: !item.checked } : item
      )
    }))
  }

  const getPopupTitle = (roleId: string) => {
    if (roleId === "employee") return "Leave Applied"
    return `Leave viewed\n${roles.find(r => r.id === roleId)?.name || ""}`
  }

  return {
    roles,
    lineConnections,
    hoveredRole,
    setHoveredRole,
    lastActiveRoleIndex,
    leaveRequest,
    checklistItems,
    handleApprove,
    handleReject,
    handleTransfer,
    canTransfer,
    toggleChecklistItem,
    getPopupTitle
  }
}