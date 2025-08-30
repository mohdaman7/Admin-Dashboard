import type React from "react"
export type RoleStatus = "approved" | "pending"
export type LabelPosition = "top" | "bottom"

export interface Role {
  id: string
  name: string
  position: React.CSSProperties
  status: RoleStatus
  image?: string
  fallback: string
  labelPosition: LabelPosition
}

export interface LineConnection {
  src: string
  srcGreen?: string
  from?: number
  to?: number
  style: React.CSSProperties
}
