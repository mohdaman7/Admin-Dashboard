import React from "react";

// Chip Component
type ChipProps = {
  children: React.ReactNode;
  variant?: "gray" | "blue" | "red" | "green";
};

function Chip({ children, variant = "gray" }: ChipProps) {
  const styles: Record<NonNullable<ChipProps["variant"]>, string> = {
    gray: "bg-gray-100 text-gray-700",
    blue: "bg-sky-100 text-sky-600",
    red: "bg-rose-100 text-rose-600",
    green: "bg-emerald-100 text-emerald-600",
  };
  return (
    <span
      className={`inline-flex items-center rounded-md px-2 py-0.5 text-[11px] font-medium whitespace-nowrap ${styles[variant]}`}
    >
      {children}
    </span>
  );
}

// Main Panel Component
export default function App() {
  return (
    <section
      aria-label="Project Task Tracker details"
      className="mx-auto rounded-xl bg-white shadow-xl"
      style={{ width: 1469, height: 876 }}
    >
      {/* Container: two columns */}
      <div className="flex w-full h-full gap-6 p-6">
        {/* Left Sidebar */}
        <aside className="w-[240px] shrink-0 flex flex-col items-center gap-6">
          {/* Brand */}
          <div className="flex h-[90px] w-[90px] items-center justify-center rounded-full bg-black">
            <span className="text-white text-lg font-bold">dyson</span>
          </div>

          {/* Edit Project button */}
          <button
            type="button"
            className="w-full rounded-lg bg-sky-500 px-4 py-2 text-sm font-medium text-white hover:bg-sky-600 transition-colors"
          >
            Edit Project
          </button>

          {/* Time Spent card */}
          <div className="rounded-lg border border-gray-200 flex flex-col justify-between items-center p-5 w-[220px] h-[180px]">
            <div className="text-[24px] font-semibold text-sky-600 text-center">
              25/120 Hrs
            </div>
            <div className="text-center text-[11px] text-gray-500">
              Time Spent on this Project
            </div>
          </div>

          {/* Task details card */}
          <div className="rounded-lg border border-gray-200 overflow-hidden w-[220px] h-[140px]">
            <div className="border-b border-gray-200 px-4 py-3 text-[13px] font-medium text-gray-700">
              Task Details
            </div>
            <div className="px-4 py-4">
              <div className="mb-3 text-[11px] text-gray-500">Task Done</div>
              <div className="flex items-center justify-between">
                <div className="text-[13px] font-medium text-gray-800">1/6</div>
                <Chip variant="blue">Completed</Chip>
              </div>
            </div>
          </div>
        </aside>

        {/* Right column: project details */}
        <main className="flex-1 flex flex-col pl-4">
          {/* Header */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900">TaskSphere</h2>
            <div className="mt-1 flex items-center gap-2 text-xs text-gray-500">
              <span>Project ID</span>
              <span>:</span>
              <span className="font-medium text-gray-700">TSH-1001</span>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-200 mb-6 w-full" />

          {/* Details grid */}
          <div className="grid grid-cols-2 gap-x-8 gap-y-4 w-full text-[13px]">
            {/* Client */}
            <div className="flex items-center gap-2 overflow-hidden">
              <span className="w-28 shrink-0 text-gray-500">Client</span>
              <span className="text-gray-400">:</span>
              <span className="font-medium text-gray-800 truncate">
                Smart Vision Enterprises
              </span>
            </div>

            {/* Status */}
            <div className="flex items-center gap-2 overflow-hidden">
              <span className="w-28 shrink-0 text-gray-500">Status</span>
              <span className="text-gray-400">:</span>
              <Chip variant="blue">In Progress</Chip>
            </div>

            {/* Pro.Value */}
            <div className="flex items-center gap-2 overflow-hidden">
              <span className="w-28 shrink-0 text-gray-500">Pro.Value</span>
              <span className="text-gray-400">:</span>
              <span className="font-medium text-gray-800">$1400</span>
            </div>

            {/* Team Members */}
            <div className="flex items-start gap-2 overflow-hidden">
              <span className="w-28 shrink-0 text-gray-500">Team Members</span>
              <span className="text-gray-400">:</span>
              <div className="flex flex-wrap gap-2">
                <Chip>Divya Iyer</Chip>
                <Chip>Arjun Menon</Chip>
                <Chip>Karthik Reddy</Chip>
                <Chip>Neha Verma</Chip>
                <Chip>Rahul Nair</Chip>
                <Chip>Sandeep Kulkarni</Chip>
                <Chip>Priya Sharma</Chip>
                <button className="rounded-md border border-gray-200 px-2 py-0.5 text-[11px] text-gray-600 hover:bg-gray-50">
                  + Add
                </button>
              </div>
            </div>

            {/* Wrk Hrs */}
            <div className="flex items-center gap-2 overflow-hidden">
              <span className="w-28 shrink-0 text-gray-500">Wrk Hrs</span>
              <span className="text-gray-400">:</span>
              <span className="font-medium text-gray-800">150 Hrs</span>
            </div>

            {/* Created On */}
            <div className="flex items-center gap-2 overflow-hidden">
              <span className="w-28 shrink-0 text-gray-500">Created on</span>
              <span className="text-gray-400">:</span>
              <span className="font-medium text-gray-800">12/05/2025</span>
            </div>

            {/* Created by */}
            <div className="flex items-center gap-2 overflow-hidden">
              <span className="w-28 shrink-0 text-gray-500">Created by</span>
              <span className="text-gray-400">:</span>
              <Chip>Divya Iyer</Chip>
            </div>

            {/* Tags */}
            <div className="flex items-start gap-2 overflow-hidden">
              <span className="w-28 shrink-0 text-gray-500">Tags</span>
              <span className="text-gray-400">:</span>
              <div className="flex flex-wrap gap-2">
                <Chip>Divya Iyer</Chip>
                <Chip>Divya Iyer</Chip>
                <button className="rounded-md border border-gray-200 px-2 py-0.5 text-[11px] text-gray-600 hover:bg-gray-50">
                  + Add
                </button>
              </div>
            </div>

            {/* Start on */}
            <div className="flex items-center gap-2 overflow-hidden">
              <span className="w-28 shrink-0 text-gray-500">Start on</span>
              <span className="text-gray-400">:</span>
              <span className="font-medium text-gray-800">12/05/2025</span>
            </div>

            {/* Team Lead */}
            <div className="flex items-start gap-2 overflow-hidden">
              <span className="w-28 shrink-0 text-gray-500">Team Lead</span>
              <span className="text-gray-400">:</span>
              <div className="flex flex-wrap gap-2">
                <Chip>Athwarya Rao</Chip>
                <Chip>Vivek Krishnan</Chip>
                <Chip>Rohan Desh</Chip>
                <button className="rounded-md border border-gray-200 px-2 py-0.5 text-[11px] text-gray-600 hover:bg-gray-50">
                  + Add
                </button>
              </div>
            </div>

            {/* Due Date */}
            <div className="flex items-center gap-2 overflow-hidden">
              <span className="w-28 shrink-0 text-gray-500">Due Date</span>
              <span className="text-gray-400">:</span>
              <span className="font-medium text-gray-800">27/05/2025</span>
            </div>

            {/* Project Manager */}
            <div className="flex items-start gap-2 overflow-hidden">
              <span className="w-28 shrink-0 text-gray-500">Project Manager</span>
              <span className="text-gray-400">:</span>
              <div className="flex flex-wrap gap-2">
                <Chip>Arjun Mohan</Chip>
                <button className="rounded-md border border-gray-200 px-2 py-0.5 text-[11px] text-gray-600 hover:bg-gray-50">
                  + Add
                </button>
              </div>
            </div>

            {/* Priority */}
            <div className="flex items-center gap-2 overflow-hidden">
              <span className="w-28 shrink-0 text-gray-500">Priority</span>
              <span className="text-gray-400">:</span>
              <Chip variant="red">High</Chip>
            </div>
          </div>

          {/* Description */}
          <div className="mt-6 w-full">
            <div className="mb-2 text-sm font-medium text-gray-700">
              Description
            </div>
            <div className="h-[100px] overflow-y-auto pr-2 text-[13px] leading-6 text-gray-600">
              Donec non sem sit amet mi hendrerit ultrices quis ac sem. Quisque
              vitae elit nunc. Maecenas dictum sed eros fermentum convallis.
              Pellentesque porta mauris eu nisi dignissim, ut convallis massa
              finibus. Vivamus tempor, quam facilisis molestie euismod, ante
              augue cursus lacus, sit amet facilisis dui tortor fermentum felis.
              Mauris quis tortor in enim malesuada dictum id nec sem. Integer
              vehicula eleifend sem, ut molestie ligula pharetra vitae. In hac
              habitasse platea dictumst. Nullam mollis, mi at luctus eleifend,
              velit tortor tincidunt urna, id volutpat lorem mi eget orci.
            </div>
          </div>
        </main>
      </div>
    </section>
  );
}
