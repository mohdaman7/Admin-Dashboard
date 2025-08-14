import React, { useState, useEffect } from "react";


const TaskProgress = () => {
  const taskProgress = [
    {
      percentage: "78%",
      label: "Ongoing",
      color: "#25841B",
      bgColor: "#DFF3D6",
    },
    {
      percentage: "25%",
      label: "Pending",
      color: "#FFC107",
      bgColor: "#FFF8E1",
    },
    {
      percentage: "32%",
      label: "On Hold",
      color: "#1B84FF",
      bgColor: "#D7E8FF",
    },
    {
      percentage: "08%",
      label: "Overdue",
      color: "#E70D0D",
      bgColor: "#FFE6E6",
    },
  ];

  const AnimatedCircularProgress = ({
    percentage,
    color,
    bgColor,
    delay = 0,
  }) => {
    const [animatedPercentage, setAnimatedPercentage] = useState(0);
    const [displayPercentage, setDisplayPercentage] = useState(0);
    const numericPercentage = parseInt(percentage);
    const radius = 70;
    const circumference = 2 * Math.PI * radius;

    useEffect(() => {
      const timer = setTimeout(() => {
        setAnimatedPercentage(numericPercentage);

        let current = 0;
        const increment = numericPercentage / 60;
        const numberTimer = setInterval(() => {
          current += increment;
          if (current >= numericPercentage) {
            current = numericPercentage;
            clearInterval(numberTimer);
          }
          setDisplayPercentage(Math.round(current));
        }, 25);

        return () => clearInterval(numberTimer);
      }, delay);

      return () => clearTimeout(timer);
    }, [numericPercentage, delay]);

    const strokeDasharray = circumference;
    const strokeDashoffset =
      circumference - (animatedPercentage / 100) * circumference;

    return (
      <div className="relative w-[160px] h-[160px]">
        <svg
          className="w-full h-full transform -rotate-90"
          viewBox="0 0 160 160"
        >
          {/* Background circle */}
          <circle
            cx="80"
            cy="80"
            r={radius}
            stroke={bgColor}
            strokeWidth="14"
            fill="transparent"
          />
          {/* Progress circle */}
          <circle
            cx="80"
            cy="80"
            r={radius}
            stroke={color}
            strokeWidth="14"
            fill="transparent"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-[1.5s] ease-out"
            style={{ filter: "drop-shadow(0px 2px 6px rgba(0,0,0,0.08))" }}
          />
        </svg>
        {/* Center percentage text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-poppins font-thin text-[#4C4C4C] text-[28px] tracking-[1.2px]">
            {displayPercentage.toString().padStart(2, "0")}%
          </span>
        </div>
      </div>
    );
  };

  const TaskIcon = ({ type, color }) => {
    switch (type) {
      case "ongoing":
        return (
          <div
            className="w-9 h-9 rounded-lg flex items-center justify-center bg-white shadow-sm"
            style={{ border: `2.5px solid ${color}` }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke={color}
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {/* Checkmark */}
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
        );
      case "pending":
        return (
          <div
            className="w-9 h-9 rounded-lg flex items-center justify-center bg-white shadow-sm"
            style={{ border: `2.5px solid ${color}` }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke={color}
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {/* Clock / Pending Icon */}
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
          </div>
        );
      case "onhold":
        return (
          <div
            className="w-9 h-9 rounded-lg flex items-center justify-center bg-white shadow-sm"
            style={{ border: `2.5px solid ${color}` }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke={color}
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {/* Pause Icon */}
              <rect x="6" y="5" width="4" height="14" />
              <rect x="14" y="5" width="4" height="14" />
            </svg>
          </div>
        );
      case "overdue":
        return (
          <div
            className="w-9 h-9 rounded-lg flex items-center justify-center bg-white shadow-sm"
            style={{ border: `2.5px solid ${color}` }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke={color}
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {/* Cross Icon */}
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full bg-[#FCFCFC] rounded-lg shadow-md p-10">
      {/* Header */}
      <div className="flex items-center gap-5 mb-10">
        <div className="w-12 h-12 bg-[#1B84FF] rounded-lg flex items-center justify-center shadow-lg">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="3" />
            <path d="M12 1V3M12 21V23M4.22 4.22L5.64 5.64M18.36 18.36L19.78 19.78M1 12H3M21 12H23M4.22 19.78L5.64 18.36M18.36 5.64L19.78 4.22" />
          </svg>
        </div>
        <h2 className="font-poppins font-medium text-[#4C4C4C] text-3xl tracking-wide">
          Today's Tasks Progress
        </h2>
      </div>

      {/* Divider */}
      <hr className="border-t border-gray-300 mb-16" />

      {/* Progress Section */}
      <div className="flex items-start justify-between">
        {/* Progress Circles */}
        <div className="flex gap-16">
          {taskProgress.map((task, i) => (
            <div key={i} className="flex flex-col items-center">
              <AnimatedCircularProgress
                percentage={task.percentage}
                color={task.color}
                bgColor={task.bgColor}
                delay={i * 350}
              />
              <div className="flex items-center gap-3 mt-5">
                <TaskIcon
                  type={task.label.toLowerCase().replace(/\s/g, "")}
                  color={task.color}
                />
                <span className="font-poppins font-medium text-[#6B7280] text-lg">
                  {task.label}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Summary Card */}
        <div className="w-52 h-64 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg flex flex-col items-center justify-center p-6 shadow-sm">
          <div className="text-center mb-6">
            <div className="font-poppins font-normal text-[#374151] text-3xl mb-2">
              3/8 hrs
            </div>
            <p className="font-poppins font-normal text-[#6B7280] text-sm leading-5">
              Spent on Overall
              <br />
              Tasks this Day
            </p>
          </div>
          <button className="text-[#6B7280] font-poppins font-medium text-sm hover:text-[#374151] transition-colors">
            View All
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskProgress;