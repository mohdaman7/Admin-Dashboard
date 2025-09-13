import React from "react";
import { useLeaveStatus, type Role, type TransferRecord } from "../../viewmodels/leave/useLeaveStatus";

export default function LeaveStatus() {
  const {
    hoveredRole,
    setHoveredRole,
    showTransferPopup,
    setShowTransferPopup,
    latestTransfer,
    leaveRequest,
    checklistItems,
    roles,
    lineConnections,
    lastActiveRoleIndex,
    roleNames,
    CURRENT_USER_ROLE,
    hasPermission,
    handleApprove,
    handleReject,
    handleTransfer,
    canTransfer,
    toggleChecklistItem,
    getPopupTitle
  } = useLeaveStatus();

  const renderHoverPopup = (role: Role) => {
    if (role.id === "employee") {
      return (
        <div className="absolute z-50 bg-white border-2 border-blue-300 rounded-lg p-4 shadow-lg"
             style={{
               left: role.labelPosition === "top" ? "-50px" : "-50px",
               top: role.labelPosition === "top" ? "60px" : "-140px",
               width: "200px",
               minHeight: "120px"
             }}>
          <div className="text-sm font-semibold text-gray-700 mb-2">Leave Applied</div>
          <hr className="mb-3 border-gray-200" />
          <div className="space-y-1 text-xs text-gray-600">
            <div>{leaveRequest.employeeName} {leaveRequest.employeeId}</div>
            <div>{leaveRequest.leaveType}</div>
            <div>{leaveRequest.startDate} - {leaveRequest.endDate}</div>
          </div>
        </div>
      );
    }

    // Special case for CEO when leave is approved
    if (role.id === "ceo" && leaveRequest.status === "approved") {
      return (
        <div className="absolute z-50 bg-white border-2 border-blue-300 rounded-lg p-4 shadow-lg"
             style={{
               left: role.labelPosition === "top" ? "-100px" : "-100px",
               top: role.labelPosition === "top" ? "60px" : "-130px",
               width: "200px"
             }}>
          <div className="text-sm font-semibold text-gray-700 mb-2">Leave viewed CEO</div>
          <hr className="mb-3 border-gray-200" />
          <div className="space-y-2">
            <div className="flex items-center text-sm">
              <span className="text-green-500 mr-2">✓</span>
              <span className="text-green-600 font-medium">Leave Approved</span>
            </div>
            <div className="text-sm text-center italic text-blue-500 bg-blue-50 p-2 rounded">
              "Enjoy your break,<br />See you soon!"
            </div>
          </div>
        </div>
      );
    }

    if (checklistItems[role.id]) {
      return (
        <div className="absolute z-50 bg-white border-2 border-blue-300 rounded-lg p-4 shadow-lg"
             style={{
               left: role.labelPosition === "top" ? "-80px" : "-80px",
               top: role.labelPosition === "top" ? "60px" : "-120px",
               width: "160px"
             }}>
          <div className="text-sm font-semibold text-gray-700 mb-2 whitespace-pre-line">
            {getPopupTitle(role.id)}
          </div>
          <hr className="mb-3 border-gray-200" />
          <div className="space-y-2">
            {checklistItems[role.id].map(item => (
              <label key={item.id} className="flex items-center cursor-pointer text-sm">
                <input
                  type="checkbox"
                  checked={item.checked}
                  onChange={() => toggleChecklistItem(role.id, item.id)}
                  className="mr-2 h-3 w-3 text-green-500"
                  disabled={!hasPermission('canView')}
                />
                <span className={item.checked ? "text-green-600 line-through" : "text-gray-700"}>
                  {item.label}
                </span>
                {item.checked && <span className="ml-1 text-green-500">✓</span>}
              </label>
            ))}
          </div>
        </div>
      );
    }

    return null;
  };

  // Transfer Notification Popup
  const TransferPopup = () => (
    <div className={`fixed top-4 right-4 z-50 bg-white border-l-4 border-orange-500 rounded-lg shadow-xl p-4 transform transition-all duration-300 ${
      showTransferPopup ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
    }`} style={{ width: '350px' }}>
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
            <span className="text-orange-600 text-sm font-bold">→</span>
          </div>
        </div>
        <div className="ml-3 flex-1">
          <h3 className="text-sm font-semibold text-gray-900 mb-1">Request Transferred</h3>
          {latestTransfer && (
            <div className="text-sm text-gray-600">
              <p className="mb-1">From: <span className="font-medium text-gray-800">{latestTransfer.fromRoleName}</span></p>
              <p className="mb-1">To: <span className="font-medium text-gray-800">{latestTransfer.toRoleName}</span></p>
              <p className="text-xs text-gray-500">{latestTransfer.timestamp}</p>
            </div>
          )}
        </div>
        <button 
          onClick={() => setShowTransferPopup(false)}
          className="ml-2 text-gray-400 hover:text-gray-600"
        >
          ×
        </button>
      </div>
    </div>
  );

  // Current User Role Indicator
  const RoleIndicator = () => (
    <div className="absolute top-4 left-4 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
      Current Role: {roleNames[CURRENT_USER_ROLE as keyof typeof roleNames]}
    </div>
  );

  if (leaveRequest.status !== "pending") {
    return (
      <div className="bg-white rounded-lg shadow-sm relative" style={{ width: "943px", height: "650px", padding: "16px" }}>
        <TransferPopup />
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-800 mb-2 p-4 pl-5">Leave Status</h1>
          <div className="ml-5 w-11/12 h-0.5 bg-blue-200" />
        </div>
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Leave Request {leaveRequest.status.charAt(0).toUpperCase() + leaveRequest.status.slice(1)}
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              {leaveRequest.status === "approved" 
                ? "The leave request has been approved successfully." 
                : "The leave request has been rejected."}
            </p>
            
            {leaveRequest.transferHistory.length > 0 && (
              <div className="mt-6 bg-gray-50 rounded-lg p-4 max-w-md mx-auto">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">Transfer History</h3>
                <div className="space-y-2">
                  {leaveRequest.transferHistory.map((transfer: TransferRecord, index: number) => (
                    <div key={index} className="text-sm text-gray-600 bg-white rounded p-2">
                      <span className="font-medium">{transfer.fromRoleName}</span> → <span className="font-medium">{transfer.toRoleName}</span>
                      <div className="text-xs text-gray-500 mt-1">{transfer.timestamp}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm relative" style={{ width: "943px", height: "650px", padding: "16px" }}>
      <TransferPopup />
      
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-800 mb-2 p-4 pl-5">Leave Status</h1>
        <div className="ml-5 w-11/12 h-0.5 bg-blue-200" />
      </div>

      <div className="relative mb-8" style={{ height: "280px" }}>
        <img
          src="/Vector 3.jpg"
          alt="Employee to Team Lead connection"
          className="absolute"
          style={lineConnections[0].style}
        />
        <img
          src={lastActiveRoleIndex >= 2 ? (lineConnections[1].srcGreen as string) : lineConnections[1].src}
          alt="Team Lead to Project Lead connection"
          className="absolute"
          style={lineConnections[1].style}
        />
        <img
          src={lastActiveRoleIndex >= 3 ? (lineConnections[2].srcGreen as string) : lineConnections[2].src}
          alt="Project Lead to HR connection"
          className="absolute"
          style={lineConnections[2].style}
        />
        <img
          src={lastActiveRoleIndex >= 4 ? (lineConnections[3].srcGreen as string) : lineConnections[3].src}
          alt="HR to CEO connection"
          className="absolute"
          style={lineConnections[3].style}
        />

        {roles.map((role, index) => (
          <div
            key={role.id}
            className="absolute animate-scale-in"
            style={{ ...role.position, animationDelay: `${index * 0.2}s` }}
            onMouseEnter={() => setHoveredRole(role.id)}
            onMouseLeave={() => setHoveredRole(null)}
          >
            <div className="flex flex-col items-center cursor-pointer relative">
              {role.labelPosition === "top" && (
                <span
                  className={`mb-2 text-base font-semibold transition-all duration-300 ${
                    hoveredRole === role.id ? "text-blue-600 transform -translate-y-0.5" : "text-gray-700"
                  } ${role.id === CURRENT_USER_ROLE ? "text-blue-600 font-bold" : ""}`}
                >
                  {role.name}
                  {role.id === CURRENT_USER_ROLE && <span className="text-xs ml-1">(You)</span>}
                </span>
              )}

              <div className="relative leave-avatar-wrapper">
                <div
                  className={`leave-avatar
                    ${role.status === "approved" ? "leave-avatar-approved" : "leave-avatar-pending"}
                    ${role.id === CURRENT_USER_ROLE ? "leave-avatar-current-user" : ""}
                    ${hoveredRole === role.id ? "shadow-xl" : ""}
                  `}
                >
                  <img
                    src={role.image || "/placeholder.svg?height=40&width=40&query=avatar%20placeholder"}
                    alt={role.name}
                    className="w-full h-full object-cover"
                    onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                      const img = e.currentTarget;
                      img.style.display = "none";
                      const parent = img.parentElement;
                      if (parent) {
                        parent.innerHTML = `<div class="w-full h-full flex items-center justify-center text-xs font-medium ${
                          role.status === "approved" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"
                        }">${role.fallback}</div>`;
                      }
                    }}
                  />
                </div>
              </div>

              {role.labelPosition === "bottom" && (
                <span
                  className={`mt-2 text-base font-semibold transition-all duration-300 ${
                    hoveredRole === role.id ? "text-blue-600 transform -translate-y-0.5" : "text-gray-700"
                  } ${role.id === CURRENT_USER_ROLE ? "text-blue-600 font-bold" : ""}`}
                >
                  {role.name}
                  {role.id === CURRENT_USER_ROLE && <span className="text-xs ml-1">(You)</span>}
                </span>
              )}

              {/* Hover Popup */}
              {hoveredRole === role.id && renderHoverPopup(role)}
            </div>
          </div>
        ))}
      </div>

      <div className="text-right animate-fade-in-up mt-24 mr-12">
        {leaveRequest.status === "pending" ? (
          <>
            <p className="text-right text-gray-700 mb-4 text-lg pr-12 font-medium">
              {CURRENT_USER_ROLE === leaveRequest.currentApprover 
                ? "Check Details, Then Approve or Reject" 
                : "Waiting for current approver to take action"}
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={handleReject}
                disabled={!hasPermission('canReject')}
                style={{ backgroundColor: hasPermission('canReject') ? "#F34040" : "#9CA3AF" }}
                className={`px-6 py-2 text-xl font-medium text-white rounded-md shadow-lg transition-all duration-300 ${
                  hasPermission('canReject') 
                    ? "hover:bg-red-600 hover:shadow-xl transform hover:scale-105 active:scale-95" 
                    : "cursor-not-allowed"
                }`}
              >
                Reject Leave
              </button>
              {canTransfer() && (
                <button
                  onClick={handleTransfer}
                  style={{ backgroundColor: "#FF9500" }}
                  className="px-6 py-2 text-xl font-medium hover:bg-orange-600 text-white rounded-md shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95"
                >
                  Transfer Request
                </button>
              )}
              <button
                onClick={handleApprove}
                disabled={!hasPermission('canApprove')}
                style={{ backgroundColor: hasPermission('canApprove') ? "#31ED31" : "#9CA3AF" }}
                className={`px-6 py-2 text-xl font-medium text-white rounded-md shadow-lg transition-all duration-300 ${
                  hasPermission('canApprove') 
                    ? "hover:bg-green-600 hover:shadow-xl transform hover:scale-105 active:scale-95" 
                    : "cursor-not-allowed"
                }`}
              >
                Approve Leave
              </button>
            </div>
          </>
        ) : (
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600 mb-2">Leave Request Approved!</p>
            <p className="text-lg text-gray-600">Hover over CEO to see the approval message</p>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(-20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes scaleX { from { transform: scaleX(0); } to { transform: scaleX(1); } }
        @keyframes scaleIn { from { opacity: 0; transform: scale(0); } to { opacity: 1; transform: scale(1); } }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in { animation: fadeIn 0.6s ease-out; }
        .animate-scale-x { animation: scaleX 0.8s ease-out 0.3s both; transform-origin: left; }
        .animate-scale-in { animation: scaleIn 0.5s ease-out both; }
        .animate-fade-in-up { animation: fadeInUp 0.6s ease-out 2s both; }
        .leave-avatar-wrapper { padding: 6px; background: transparent; }
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
          border: 3px solid #fff; 
        }
        .leave-avatar-approved { 
          box-shadow: 0 0 18px 6px #6EFF86; 
          border: 2px solid #fff;
        }
        .leave-avatar-pending { 
          box-shadow: 0 0 20px 8px rgba(0, 0, 0, 0.3); 
          border: 2px solid #fff;
        }
        .leave-avatar-current-user { 
          border: 3px solid #3B82F6; 
        }
      `}</style>
    </div>
  );
}