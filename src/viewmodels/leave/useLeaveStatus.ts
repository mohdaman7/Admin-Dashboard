import { useMemo, useState, useEffect } from "react";
import { toast } from "sonner";

export interface Role {
  id: string;
  name: string;
  position: React.CSSProperties;
  status: "approved" | "pending" | "inactive";
  image: string;
  fallback: string;
  labelPosition: "top" | "bottom";
}

export interface LineConnection {
  src: string;
  srcGreen?: string;
  from?: number;
  to?: number;
  style: React.CSSProperties;
}

export interface LeaveRequest {
  employeeName: string;
  employeeId: string;
  leaveDays: number;
  leaveType: string;
  startDate: string;
  endDate: string;
  reason: string;
  currentApprover: string;
  status: "pending" | "approved" | "rejected";
  transferHistory: TransferRecord[];
}

export interface ChecklistItem {
  id: string;
  label: string;
  checked: boolean;
}

export interface TransferRecord {
  from: string;
  to: string;
  timestamp: string;
  fromRoleName: string;
  toRoleName: string;
}

export interface RolePermissions {
  canView: boolean;
  canApprove: boolean;
  canReject: boolean;
  canTransfer: boolean;
}

// Simulated current user role - in real app this would come from auth context
const CURRENT_USER_ROLE = "teamlead"; // Change this to test different roles

export function useLeaveStatus() {
  const [hoveredRole, setHoveredRole] = useState<string | null>(null);
  const [showTransferPopup, setShowTransferPopup] = useState(false);
  const [latestTransfer, setLatestTransfer] = useState<TransferRecord | null>(null);
  
  const [leaveRequest, setLeaveRequest] = useState<LeaveRequest>({
    employeeName: "Amal Ahammed",
    employeeId: "SD201",
    leaveDays: 6,
    leaveType: "Casual Leave",
    startDate: "25/08/2025",
    endDate: "30/08/2025",
    reason: "Personal work",
    currentApprover: "teamlead",
    status: "pending",
    transferHistory: []
  });

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
  });

  const roleHierarchy = ["employee", "teamlead", "projectlead", "hr", "ceo"];
  
  const roleNames = {
    employee: "Employee",
    teamlead: "Team Lead",
    projectlead: "Project Lead", 
    hr: "HR",
    ceo: "CEO"
  };

  // Role-based permissions
  const rolePermissions: Record<string, RolePermissions> = {
    employee: { canView: true, canApprove: false, canReject: false, canTransfer: false },
    teamlead: { canView: true, canApprove: true, canReject: true, canTransfer: true },
    projectlead: { canView: true, canApprove: true, canReject: true, canTransfer: true },
    hr: { canView: true, canApprove: true, canReject: true, canTransfer: true },
    ceo: { canView: true, canApprove: true, canReject: true, canTransfer: false }
  };

  // Check if current user has permission for current request
  const hasPermission = (action: keyof RolePermissions) => {
    const userPermissions = rolePermissions[CURRENT_USER_ROLE];
    const isCurrentApprover = leaveRequest.currentApprover === CURRENT_USER_ROLE;
    const isPending = leaveRequest.status === "pending";
    
    return userPermissions?.[action] && isCurrentApprover && isPending;
  };

  const roles: Role[] = useMemo(
    () => [
      {
        id: "employee",
        name: "Employee",
        position: { left: "4rem", top: "4rem" },
        status: "approved",
        image: "/profile-img-6.jpg",
        fallback: "E",
        labelPosition: "top",
      },
      {
        id: "teamlead",
        name: "Team Lead",
        position: { left: "14.6rem", top: "14rem" },
        status: leaveRequest.currentApprover === "teamlead" ? "pending" : "approved",
        image: "/profile-img-6.jpg",
        fallback: "TL",
        labelPosition: "bottom",
      },
      {
        id: "projectlead",
        name: "Project Lead",
        position: { left: "47%", top: "0.5rem", transform: "translateX(-50%)" },
        status: leaveRequest.currentApprover === "projectlead" ? "pending" : 
               roleHierarchy.indexOf(leaveRequest.currentApprover) > roleHierarchy.indexOf("projectlead") ? "approved" : "inactive",
        image: "/profile-img-6.jpg",
        fallback: "PL",
        labelPosition: "top",
      },
      {
        id: "hr",
        name: "HR",
        position: { right: "14.2rem", top: "13.3rem" },
        status: leaveRequest.currentApprover === "hr" ? "pending" :
               roleHierarchy.indexOf(leaveRequest.currentApprover) > roleHierarchy.indexOf("hr") ? "approved" : "inactive",
        image: "/profile-img-6.jpg",
        fallback: "HR",
        labelPosition: "bottom",
      },
      {
        id: "ceo",
        name: "CEO",
        position: { right: "4.2rem", top: "4rem" },
        status: leaveRequest.currentApprover === "ceo" ? "pending" : "inactive",
        image: "/profile-img-6.jpg",
        fallback: "CEO",
        labelPosition: "top",
      },
    ],
    [leaveRequest.currentApprover],
  );

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
  );

  const lastActiveRoleIndex = useMemo(
    () => {
      const currentIndex = roleHierarchy.indexOf(leaveRequest.currentApprover);
      return Math.max(0, currentIndex - 1);
    },
    [leaveRequest.currentApprover],
  );

  // Show transfer popup effect - DISABLED to avoid duplicate with Sonner toast
  useEffect(() => {
    if (latestTransfer) {
      // Only set latest transfer for the visual popup, don't show the custom popup
      const timer = setTimeout(() => {
        setLatestTransfer(null);
      }, 100); // Quick cleanup
      return () => clearTimeout(timer);
    }
  }, [latestTransfer]);

  const handleApprove = () => {
    if (!hasPermission('canApprove')) {
      toast.error("You don't have permission to approve this request.");
      return;
    }
    setLeaveRequest(prev => ({ ...prev, status: "approved" }));
    toast.success("Leave request approved successfully!", {
      description: "The employee has been notified of the approval."
    });
  };

  const handleReject = () => {
    if (!hasPermission('canReject')) {
      toast.error("You don't have permission to reject this request.");
      return;
    }
    setLeaveRequest(prev => ({ ...prev, status: "rejected" }));
    toast.error("Leave request rejected.", {
      description: "The employee has been notified of the rejection."
    });
  };

  const handleTransfer = () => {
    if (!hasPermission('canTransfer')) {
      toast.error("You don't have permission to transfer this request.");
      return;
    }
    
    const currentIndex = roleHierarchy.indexOf(leaveRequest.currentApprover);
    const nextRole = roleHierarchy[currentIndex + 1];
    
    if (nextRole) {
      const transferRecord: TransferRecord = {
        from: leaveRequest.currentApprover,
        to: nextRole,
        timestamp: new Date().toLocaleString(),
        fromRoleName: roleNames[leaveRequest.currentApprover as keyof typeof roleNames],
        toRoleName: roleNames[nextRole as keyof typeof roleNames]
      };

      setLeaveRequest(prev => ({
        ...prev,
        currentApprover: nextRole,
        transferHistory: [...prev.transferHistory, transferRecord]
      }));

      setLatestTransfer(transferRecord);
      
      toast.info("Request transferred successfully", {
        description: `From ${transferRecord.fromRoleName} to ${transferRecord.toRoleName}`
      });
    }
  };

  const canTransfer = () => {
    const currentIndex = roleHierarchy.indexOf(leaveRequest.currentApprover);
    return hasPermission('canTransfer') && currentIndex < roleHierarchy.length - 1;
  };

  const toggleChecklistItem = (roleId: string, itemId: string) => {
    setChecklistItems(prev => ({
      ...prev,
      [roleId]: prev[roleId].map(item =>
        item.id === itemId ? { ...item, checked: !item.checked } : item
      )
    }));
  };

  const getPopupTitle = (roleId: string) => {
    if (roleId === "employee") return "Leave Applied";
    if (roleId === "ceo" && leaveRequest.status === "approved") return "Leave viewed CEO";
    return `Leave viewed\n${roles.find(r => r.id === roleId)?.name || ""}`;
  };

  return {
    // State
    hoveredRole,
    setHoveredRole,
    showTransferPopup,
    setShowTransferPopup,
    latestTransfer,
    leaveRequest,
    checklistItems,
    
    // Computed values
    roles,
    lineConnections,
    lastActiveRoleIndex,
    roleNames,
    
    // Constants
    CURRENT_USER_ROLE: leaveRequest.status === "pending" ? CURRENT_USER_ROLE : null, // Hide role indicator when not pending
    
    // Functions
    hasPermission,
    handleApprove,
    handleReject,
    handleTransfer,
    canTransfer,
    toggleChecklistItem,
    getPopupTitle
  };
}