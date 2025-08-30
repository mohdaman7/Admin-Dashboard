import { useState } from "react"

const Header = () => {
  const [profileImg] = useState("/abstract-profile.png")
  const [hasNotification] = useState(true)
  const [isOnline] = useState(true)

  return (
    <header className="w-full bg-white shadow-[0px_1px_1px_#0000003f]">
      <div className="w-full bg-gray-50 pl-0 pr-4 sm:pr-6 lg:pl-[36px] py-4 sm:py-5 lg:py-[22px]">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between w-full gap-4">
          {/* Left Section */}
          <div className="flex flex-row gap-6 items-center w-full lg:w-auto">
            {/* Dashboard Title with Icon */}
            <div className="flex flex-row gap-[4px] justify-start items-center pr-[37px]">
              <svg className="w-[24px] h-[24px]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z" fill="currentColor" />
              </svg>
              <span className="text-[14px] sm:text-[16px] lg:text-[16px] font-normal text-gray-800 ml-2 font-['Poppins']">
                Dashboard
              </span>
            </div>

            {/* Search Bar */}
            <div className="flex flex-row items-center w-[290px] h-[34px] shadow-[0px_0px_1px_#0000003f] rounded-[5px] bg-gray-50 pl-2 pr-[2px] border border-[#b6b5b5]">
              <div className="flex flex-row gap-2 items-center w-full">
                <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <input
                  type="text"
                  placeholder="Search here"
                  className="w-full bg-transparent outline-none text-[12px] sm:text-[13px] lg:text-[14px] text-gray-600 placeholder:text-gray-400 font-['Poppins']"
                />
              </div>
              <button className="w-[66px] h-[28px] text-[11px] leading-[14px] p-0 rounded-[5px] bg-blue-500 text-white hover:bg-blue-600 transition-colors">
                Search
              </button>
            </div>
          </div>

          {/* Profile Section */}
          <div className="flex flex-row justify-end items-center gap-3 sm:gap-10">
            {/* Profile */}
            <div className="relative w-fit h-fit">
              <img
                src={profileImg || "/placeholder.svg"}
                className="w-[28px] sm:w-[30px] lg:w-[32px] h-[30px] sm:h-[32px] lg:h-[34px] object-cover rounded-full"
                alt="Profile"
              />
              {isOnline && (
                <span className="absolute bottom-0 right-0 w-[12px] h-[12px] bg-green-500 rounded-full border-[2px] border-white shadow-sm"></span>
              )}
            </div>

            {/* Bell */}
            <div className="relative w-fit h-fit">
              <svg
                className="w-[22px] sm:w-[22px] lg:w-[17px] h-[20px] sm:h-[20px] lg:h-[20px]"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 8A6 6 0 1 1 18 8c0 7-3 9-3 9H9s-3-2-3-9ZM13.73 21a2 2 0 0 1-3.46 0"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {hasNotification && (
                <span className="absolute top-[1px] right-0 w-[10px] h-[10px] bg-red-500 rounded-full border-[2px] border-white shadow-sm"></span>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
