
type ChipProps = {
  children: React.ReactNode;
  variant?: "gray" | "blue" | "red" | "green" | "orange";
};

function Chip({ children, variant = "gray" }: ChipProps) {
  const styles: Record<NonNullable<ChipProps["variant"]>, string> = {
    gray: "bg-gray-100 text-gray-800",
    blue: "bg-blue-100 text-blue-600",
    red: "bg-red-100 text-red-600",
    green: "bg-green-100 text-green-600",
    orange: "bg-orange-100 text-orange-600",
  };
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium whitespace-nowrap ${styles[variant]}`}
    >
      {children}
    </span>
  );
}

// Main Panel Component
export default function App() {
  return (
    <div className="bg-gray-50 p-8 min-h-screen">
      <section
        aria-label="Project Task Tracker details"
        className="mx-auto rounded-2xl bg-white shadow-lg"
        style={{ width: 1469, height: 876 }}
      >
        {/* Container: two columns */}
        <div className="flex w-full h-full">
          {/* Left Sidebar */}
          <aside className="w-64 shrink-0 flex flex-col items-center gap-6 p-6 border-r border-gray-100">
            {/* Brand */}
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-black">
              <span className="text-white text-sm font-semibold">dyson</span>
            </div>

            {/* Edit Project button */}
            <button
              type="button"
              className="w-full rounded-md bg-blue-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-600 transition-colors"
            >
              Edit Project
            </button>

            {/* Time Spent card */}
            <div className="rounded-xl border border-gray-200 flex flex-col justify-center items-center p-6 w-full bg-blue-50">
              <div className="text-2xl font-bold text-blue-600 mb-1">
                25/120 Hrs
              </div>
              <div className="text-center text-xs text-blue-600 font-medium">
                Time Spent on this Project
              </div>
            </div>

            {/* Task details card */}
            <div className="rounded-xl border border-gray-200 overflow-hidden w-full bg-blue-50">
              <div className="border-b border-gray-200 px-4 py-3 text-sm font-semibold text-blue-600">
                Task Details
              </div>
              <div className="px-4 py-4">
                <div className="mb-2 text-xs text-gray-600">Task Done</div>
                <div className="flex items-center justify-between">
                  <div className="text-lg font-bold text-gray-900">1/6</div>
                  <Chip variant="blue">Completed</Chip>
                </div>
              </div>
            </div>
          </aside>

          {/* Right column: project details */}
          <main className="flex-1 flex flex-col p-6">
            {/* Header */}
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-1">TaskSphere</h1>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span>Project ID</span>
                <span>:</span>
                <span className="font-medium text-gray-700">TSH-1001</span>
              </div>
            </div>

            {/* Details grid */}
            <div className="space-y-4 text-sm">
              {/* Row 1 */}
              <div className="grid grid-cols-2 gap-8">
                <div className="flex items-center">
                  <span className="w-32 text-gray-500">Client</span>
                  <span className="text-gray-400 mr-2">:</span>
                  <span className="font-medium text-gray-900">Smart Vision Enterprises</span>
                </div>
                <div className="flex items-center">
                  <span className="w-32 text-gray-500">Status</span>
                  <span className="text-gray-400 mr-2">:</span>
                  <Chip variant="blue">In Progress</Chip>
                </div>
              </div>

              {/* Row 2 */}
              <div className="grid grid-cols-2 gap-8">
                <div className="flex items-center">
                  <span className="w-32 text-gray-500">Pro.Value</span>
                  <span className="text-gray-400 mr-2">:</span>
                  <span className="font-medium text-gray-900">$1400</span>
                </div>
                <div className="flex items-start">
                  <span className="w-32 text-gray-500 mt-1">Team Members</span>
                  <span className="text-gray-400 mr-2 mt-1">:</span>
                  <div className="flex flex-wrap gap-1">
                    <Chip>Divya Iyer</Chip>
                    <Chip>Arjun Menon</Chip>
                    <Chip>Divya Iyer</Chip>
                    <Chip>Karthik Reddy</Chip>
                    <Chip>Neha Verma</Chip>
                    <Chip>Rahul Nair</Chip>
                    <Chip>Sandeep Kulkarni</Chip>
                    <Chip>Priya Sharma</Chip>
                    <button className="rounded-full border border-gray-300 px-2 py-1 text-xs text-gray-600 hover:bg-gray-50 flex items-center">
                      <span className="text-lg leading-none mr-1">+</span>
                      <span>Add New</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Row 3 */}
              <div className="grid grid-cols-2 gap-8">
                <div className="flex items-center">
                  <span className="w-32 text-gray-500">Wrk Hrs</span>
                  <span className="text-gray-400 mr-2">:</span>
                  <span className="font-medium text-gray-900">150 Hrs</span>
                </div>
                <div className="flex items-start">
                  <span className="w-32 text-gray-500 mt-1">Team Lead</span>
                  <span className="text-gray-400 mr-2 mt-1">:</span>
                  <div className="flex flex-wrap gap-1">
                    <Chip variant="orange">Aishwarya Rao</Chip>
                    <Chip>Vivek Krishnan</Chip>
                    <Chip>Rohan Desh</Chip>
                    <button className="rounded-full border border-gray-300 px-2 py-1 text-xs text-gray-600 hover:bg-gray-50 flex items-center">
                      <span className="text-lg leading-none mr-1">+</span>
                      <span>Add New</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Row 4 */}
              <div className="grid grid-cols-2 gap-8">
                <div className="flex items-center">
                  <span className="w-32 text-gray-500">Created on</span>
                  <span className="text-gray-400 mr-2">:</span>
                  <span className="font-medium text-gray-900">12/05/2025</span>
                </div>
                <div className="flex items-start">
                  <span className="w-32 text-gray-500 mt-1">Project Manager</span>
                  <span className="text-gray-400 mr-2 mt-1">:</span>
                  <div className="flex flex-wrap gap-1">
                    <Chip>Arjun Mohan</Chip>
                    <button className="rounded-full border border-gray-300 px-2 py-1 text-xs text-gray-600 hover:bg-gray-50 flex items-center">
                      <span className="text-lg leading-none mr-1">+</span>
                      <span>Add New</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Row 5 */}
              <div className="grid grid-cols-2 gap-8">
                <div className="flex items-center">
                  <span className="w-32 text-gray-500">Created by</span>
                  <span className="text-gray-400 mr-2">:</span>
                  <Chip>Divya Iyer</Chip>
                </div>
                <div className="flex items-center">
                  <span className="w-32 text-gray-500">Priority</span>
                  <span className="text-gray-400 mr-2">:</span>
                  <Chip variant="red">High</Chip>
                </div>
              </div>

              {/* Row 6 */}
              <div className="grid grid-cols-2 gap-8">
                <div className="flex items-start">
                  <span className="w-32 text-gray-500 mt-1">Tags</span>
                  <span className="text-gray-400 mr-2 mt-1">:</span>
                  <div className="flex flex-wrap gap-1">
                    <Chip>Divya Iyer</Chip>
                    <Chip variant="orange">Divya Iyer</Chip>
                    <button className="rounded-full border border-gray-300 px-2 py-1 text-xs text-gray-600 hover:bg-gray-50 flex items-center">
                      <span className="text-lg leading-none mr-1">+</span>
                      <span>Add New</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Row 7 */}
              <div className="grid grid-cols-2 gap-8">
                <div className="flex items-center">
                  <span className="w-32 text-gray-500">Start on</span>
                  <span className="text-gray-400 mr-2">:</span>
                  <span className="font-medium text-gray-900">12/05/2025</span>
                </div>
              </div>

              {/* Row 8 */}
              <div className="grid grid-cols-2 gap-8">
                <div className="flex items-center">
                  <span className="w-32 text-gray-500">Due Date</span>
                  <span className="text-gray-400 mr-2">:</span>
                  <span className="font-medium text-gray-900">27/05/2025</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mt-8">
              <div className="mb-3 text-sm font-semibold text-gray-700">
                Description
              </div>
              <div className="text-sm leading-relaxed text-gray-600 pr-4" style={{ maxHeight: '120px', overflowY: 'auto' }}>
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
    </div>
  );
}