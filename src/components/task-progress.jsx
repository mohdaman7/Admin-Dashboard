const TaskProgress = () => {
  const taskData = [
    {
      percentage: 78,
      label: "Ongoing",
      color: "#22c55e",
      icon: "📋",
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      percentage: 25,
      label: "Pending",
      color: "#f59e0b",
      icon: "📋",
      iconBg: "bg-amber-100",
      iconColor: "text-amber-600",
    },
    {
      percentage: 32,
      label: "On Hold",
      color: "#3b82f6",
      icon: "⏸️",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      percentage: 8,
      label: "Overdue",
      color: "#ef4444",
      icon: "📋",
      iconBg: "bg-red-100",
      iconColor: "text-red-600",
    },
  ]

  const CircularProgress = ({ percentage, color, size = 180 }) => {
    const radius = (size - 18) / 2
    const circumference = 2 * Math.PI * radius
    const strokeDasharray = circumference
    const strokeDashoffset = circumference - (percentage / 100) * circumference

    return (
      <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="transform -rotate-90">
          {/* Background circle */}
          <circle cx={size / 2} cy={size / 2} r={radius} fill="transparent" stroke="#e9e4f0" strokeWidth="16" />
          {/* Progress circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="transparent"
            stroke={color}
            strokeWidth="16"
            strokeLinecap="round"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-3xl font-normal text-gray-600">{percentage < 10 ? `0${percentage}` : percentage}%</span>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-purple-50 to-indigo-50 flex items-center justify-center p-8">
      <div className="w-full h-full flex flex-col">
        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 flex-1 flex flex-col">
          {/* Header */}
          <div className="px-12 py-8 border-b border-gray-100">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-cyan-400 to-cyan-500 rounded-full flex items-center justify-center">
                <div className="w-7 h-7 bg-white rounded-full flex items-center justify-center">
                  <div className="w-3 h-3 bg-cyan-500 rounded-full"></div>
                </div>
              </div>
              <h1 className="text-2xl font-normal text-gray-700">Today's Tasks Progress</h1>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 px-12 py-12 flex items-center justify-center">
            <div className="w-full flex items-center justify-between">
              {/* Progress Items Row */}
              <div className="flex items-center justify-center gap-20 flex-1">
                {taskData.map((task, index) => (
                  <div key={index} className="flex flex-col items-center gap-6">
                    <div className="flex items-center justify-center">
                      <CircularProgress percentage={task.percentage} color={task.color} />
                    </div>
                    <div className="flex items-center justify-center gap-3">
                      <div
                        className={`w-10 h-10 ${task.iconBg} rounded-xl flex items-center justify-center ${task.iconColor}`}
                      >
                        <span className="text-lg">{task.icon}</span>
                      </div>
                      <span className="text-lg font-normal text-gray-600 whitespace-nowrap">{task.label}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Summary Section */}
              <div className="flex flex-col items-center justify-center gap-8 min-w-[280px] ml-16">
                <div className="text-center">
                  <div className="text-4xl font-normal text-gray-700 mb-4">3/8 hrs</div>
                  <div className="text-lg font-normal text-gray-500 leading-relaxed">
                    Spent on Overall
                    <br />
                    Tasks this Day
                  </div>
                </div>
                <button className="text-lg font-normal text-gray-500 hover:text-gray-700 px-8 py-3 rounded-xl transition-colors duration-200 border border-gray-200 hover:border-gray-300">
                  View All
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TaskProgress
