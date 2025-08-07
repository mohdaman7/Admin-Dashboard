const TaskProgress = () => {
  const taskData = [
    {
      percentage: 78,
      label: "Ongoing",
      color: "#22c55e",
      strokeColor: "stroke-green-500",
      icon: "📋",
      bgColor: "bg-green-50",
    },
    {
      percentage: 25,
      label: "Pending",
      color: "#f59e0b",
      strokeColor: "stroke-amber-500",
      icon: "⏳",
      bgColor: "bg-amber-50",
    },
    {
      percentage: 32,
      label: "On Hold",
      color: "#3b82f6",
      strokeColor: "stroke-blue-500",
      icon: "⏸️",
      bgColor: "bg-blue-50",
    },
    {
      percentage: 8,
      label: "Overdue",
      color: "#ef4444",
      strokeColor: "stroke-red-500",
      icon: "⚠️",
      bgColor: "bg-red-50",
    },
  ]

  const CircularProgress = ({ percentage, color, strokeColor, size = 120 }) => {
    const radius = (size - 10) / 2
    const circumference = 2 * Math.PI * radius
    const strokeDasharray = circumference
    const strokeDashoffset = circumference - (percentage / 100) * circumference

    return (
      <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="transform -rotate-90">
          <circle cx={size / 2} cy={size / 2} r={radius} fill="transparent" stroke="#e5e7eb" strokeWidth="8" />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="transparent"
            stroke={color}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-500 ease-in-out"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-bold text-gray-700">{percentage}%</span>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg max-w-4xl mx-auto font-sans">
      {/* Header */}
      <div className="mb-8 pb-4 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-full flex items-center justify-center text-lg">
            📊
          </div>
          <h2 className="text-xl font-semibold text-gray-700">Today's Tasks Progress</h2>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        <div className="flex-1">
          <div className="flex flex-wrap justify-center lg:justify-start gap-6 lg:gap-8">
            {taskData.map((task, index) => (
              <div key={index} className="flex flex-col items-center gap-3">
                <CircularProgress percentage={task.percentage} color={task.color} strokeColor={task.strokeColor} size={100} />
                <div className="flex flex-col items-center gap-1">
                  <div className={`w-6 h-6 ${task.bgColor} rounded-md flex items-center justify-center text-sm`}>
                    {task.icon}
                  </div>
                  <span className="text-xs font-medium text-gray-600">{task.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:min-w-[180px] w-full lg:w-auto">
          <div className="bg-gray-50 rounded-xl p-4 flex flex-col items-center gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-700 mb-1">3/8 hrs</div>
              <div className="text-xs text-gray-500 leading-relaxed">
                Spent on Overall
                <br />
                Tasks this Day
              </div>
            </div>
            <button className="text-xs text-gray-500 hover:text-gray-700 hover:bg-gray-200 px-3 py-1.5 rounded-md transition-all duration-200">
              View All
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TaskProgress
