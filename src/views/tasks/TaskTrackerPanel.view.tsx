import type React from "react"

type ChipProps = {
  children: React.ReactNode
  variant?: "gray" | "blue" | "red" | "green"
}

function Chip({ children, variant = "gray" }: ChipProps) {
  const styles: Record<NonNullable<ChipProps["variant"]>, string> = {
    gray: "bg-gray-100 text-gray-700",
    blue: "bg-sky-100 text-sky-700",
    red: "bg-rose-100 text-rose-700",
    green: "bg-emerald-100 text-emerald-700",
  }
  return (
    <span className={`inline-flex items-center rounded-md px-2.5 py-1 text-xs font-medium ${styles[variant]}`}>
      {children}
    </span>
  )
}

export default function TaskTrackerPanel() {
  return (
    <section
      aria-label="Project Task Tracker details"
      className="mx-auto rounded-lg bg-white shadow-sm"
      style={{ width: 1469, height: 876 }}
    >
      {/* Container: two columns without any divider line */}
      <div className="flex h-full w-full gap-8 p-6">
        {/* Left column (self-contained, no vertical border) */}
        <aside className="flex w-[300px] shrink-0 flex-col items-stretch gap-6">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-black">
              <img src="/abstract-circle-logo.png" alt="Brand logo" className="h-16 w-16 rounded-full opacity-0" />
              <span className="sr-only">Brand</span>
            </div>
            <div className="text-sm text-gray-500">Ziya Attendance</div>
          </div>

          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md bg-sky-500 px-4 py-2 text-sm font-medium text-white hover:bg-sky-600 transition-colors"
          >
            Edit Project
          </button>

          {/* Time Spent card */}
          <div className="rounded-lg border border-gray-200">
            <div className="flex flex-col items-center gap-4 p-5">
              <div className="text-center">
                <div className="text-[28px] font-semibold text-sky-600">25/120 Hrs</div>
              </div>
              <div className="text-center text-xs text-gray-500">Time Spent on this Project</div>
            </div>
          </div>

          {/* Task details card */}
          <div className="rounded-lg border border-gray-200">
            <div className="border-b border-gray-100 px-4 py-3 text-sm font-medium text-gray-700">Task Details</div>
            <div className="px-4 py-4">
              <div className="mb-3 text-xs text-gray-500">Task Done</div>
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium text-gray-800">1/6</div>
                <Chip variant="blue">Completed</Chip>
              </div>
            </div>
          </div>
        </aside>

        {/* Right column: project details */}
        <main className="flex min-w-0 flex-1 flex-col">
          {/* Header title row */}
          <div className="mb-6">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-balance text-xl font-semibold text-gray-900">TaskSphere</h2>
                <div className="mt-1 flex items-center gap-3 text-xs text-gray-500">
                  <span>Project ID</span>
                  <span>:</span>
                  <span className="font-medium text-gray-700">TSH‑1001</span>
                </div>
              </div>
              {/* subtle accent line */}
              <div className="mt-4 h-px w-1/2 bg-sky-200" aria-hidden="true" />
            </div>
          </div>

          {/* Details grid */}
          <div className="grid grid-cols-2 gap-x-10 gap-y-5">
            {/* Client */}
            <div className="flex items-center gap-2 text-sm">
              <span className="w-24 shrink-0 text-gray-500">Client</span>
              <span className="text-gray-400">:</span>
              <span className="font-medium text-gray-800">Smart Vision Enterprises</span>
            </div>
            {/* Status */}
            <div className="flex items-center gap-2 text-sm">
              <span className="w-24 shrink-0 text-gray-500">Status</span>
              <span className="text-gray-400">:</span>
              <Chip variant="blue">In Progress</Chip>
            </div>

            {/* Pro.Value */}
            <div className="flex items-center gap-2 text-sm">
              <span className="w-24 shrink-0 text-gray-500">Pro.Value</span>
              <span className="text-gray-400">:</span>
              <span className="font-medium text-gray-800">$1400</span>
            </div>
            {/* Team Members */}
            <div className="flex items-center gap-2 text-sm">
              <span className="w-24 shrink-0 text-gray-500">Team Members</span>
              <span className="text-gray-400">:</span>
              <div className="flex flex-wrap items-center gap-2">
                <Chip>Divya Iyer</Chip>
                <Chip>Arjun Menon</Chip>
                <Chip>Divya Iyer</Chip>
                <Chip>Karthik Reddy</Chip>
                <Chip>Neha Verma</Chip>
                <Chip>Rahul Nair</Chip>
                <Chip>Sandeep Kulkarni</Chip>
                <Chip>Priya Sharma</Chip>
                <button className="rounded-md border border-gray-200 px-2.5 py-1 text-xs text-gray-600 hover:bg-gray-50">
                  Add New
                </button>
              </div>
            </div>

            {/* Wrk Hrs */}
            <div className="flex items-center gap-2 text-sm">
              <span className="w-24 shrink-0 text-gray-500">Wrk Hrs</span>
              <span className="text-gray-400">:</span>
              <span className="font-medium text-gray-800">150 Hrs</span>
            </div>
            {/* Created On */}
            <div className="flex items-center gap-2 text-sm">
              <span className="w-24 shrink-0 text-gray-500">Created on</span>
              <span className="text-gray-400">:</span>
              <span className="font-medium text-gray-800">12/05/2025</span>
            </div>

            {/* Created by */}
            <div className="flex items-center gap-2 text-sm">
              <span className="w-24 shrink-0 text-gray-500">Created by</span>
              <span className="text-gray-400">:</span>
              <Chip>Divya Iyer</Chip>
            </div>
            {/* Tags */}
            <div className="flex items-center gap-2 text-sm">
              <span className="w-24 shrink-0 text-gray-500">Tags</span>
              <span className="text-gray-400">:</span>
              <div className="flex flex-wrap items-center gap-2">
                <Chip>Divya Iyer</Chip>
                <Chip>Divya Iyer</Chip>
                <button className="rounded-md border border-gray-200 px-2.5 py-1 text-xs text-gray-600 hover:bg-gray-50">
                  Add New
                </button>
              </div>
            </div>

            {/* Start on */}
            <div className="flex items-center gap-2 text-sm">
              <span className="w-24 shrink-0 text-gray-500">Start on</span>
              <span className="text-gray-400">:</span>
              <span className="font-medium text-gray-800">12/05/2025</span>
            </div>
            {/* Team Lead */}
            <div className="flex items-center gap-2 text-sm">
              <span className="w-24 shrink-0 text-gray-500">Team Lead</span>
              <span className="text-gray-400">:</span>
              <div className="flex flex-wrap items-center gap-2">
                <Chip>Athwarya Rao</Chip>
                <Chip>Vivek Krishnan</Chip>
                <Chip>Rohan Desh</Chip>
                <button className="rounded-md border border-gray-200 px-2.5 py-1 text-xs text-gray-600 hover:bg-gray-50">
                  Add New
                </button>
              </div>
            </div>

            {/* Due Date */}
            <div className="flex items-center gap-2 text-sm">
              <span className="w-24 shrink-0 text-gray-500">Due Date</span>
              <span className="text-gray-400">:</span>
              <span className="font-medium text-gray-800">27/05/2025</span>
            </div>
            {/* Project Manager */}
            <div className="flex items-center gap-2 text-sm">
              <span className="w-24 shrink-0 text-gray-500">Project Manager</span>
              <span className="text-gray-400">:</span>
              <div className="flex items-center gap-2">
                <Chip>Arjun Mohan</Chip>
                <button className="rounded-md border border-gray-200 px-2.5 py-1 text-xs text-gray-600 hover:bg-gray-50">
                  Add New
                </button>
              </div>
            </div>

            {/* Priority */}
            <div className="flex items-center gap-2 text-sm">
              <span className="w-24 shrink-0 text-gray-500">Priority</span>
              <span className="text-gray-400">:</span>
              <Chip variant="red">High</Chip>
            </div>
          </div>

          {/* Description */}
          <div className="mt-6">
            <div className="mb-2 text-sm font-medium text-gray-700">Description</div>
            <p className="max-w-4xl text-sm leading-6 text-gray-600">
              Donec non sem sit amet mi hendrerit ultrices quis ac sem. Quisque vitae elit nunc. Maecenas dictum sed
              eros fermentum convallis. Pellentesque porta mauris eu nisi dignissim, ut convallis massa finibus. Vivamus
              tempor, quam facilisis molestie euismod, ante augue cursus lacus, sit amet facilisis dui tortor fermentum
              felis. Mauris quis tortor in enim malesuada dictum id nec sem. Integer vehicula eleifend sem, ut molestie
              ligula pharetra vitae. In hac habitasse platea dictumst. Nullam mollis, mi at luctus eleifend, velit
              tortor tincidunt urna, id volutpat lorem mi eget orci.
            </p>
          </div>
        </main>
      </div>
    </section>
  )
}
