import { useMemo, useState } from "react"
import type { Role, LineConnection } from "../../models/leave"

export function useLeaveStatus() {
  const [hoveredRole, setHoveredRole] = useState<string | null>(null)

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
        status: "approved",
        image: "/public/profile-img-6.jpg",
        fallback: "TL",
        labelPosition: "bottom",
      },
      {
        id: "projectlead",
        name: "Project Lead",
        position: { left: "47%", top: "0.5rem", transform: "translateX(-50%)" },
        status: "approved",
        image: "/public/profile-img-6.jpg",
        fallback: "PL",
        labelPosition: "top",
      },
      {
        id: "hr",
        name: "HR",
        position: { right: "14.2rem", top: "13.3rem" },
        status: "approved",
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
    ],
    [],
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
    () => roles.reduce((acc, role, idx) => (role.status === "approved" ? idx : acc), -1),
    [roles],
  )

  return {
    roles,
    lineConnections,
    hoveredRole,
    setHoveredRole,
    lastActiveRoleIndex,
  }
}
