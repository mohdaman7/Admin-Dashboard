import { BsPersonGear } from "react-icons/bs";
import { FaFingerprint } from "react-icons/fa";

const EmployeeProfile = () => {
  return (
    <div
      className="border border-[#E5F0FA] rounded-lg shadow-sm bg-white"
      style={{ width: 1469, height: 525, padding: 16 }}
    >
      <div className="flex flex-row h-full ">
        {/* Profile image and buttons column */}
        <div
          className="flex flex-col items-center"
          style={{ width: 220, marginTop: 30, marginLeft: 30 }}
        >
          <img
            src="/profile-img-6.jpg"
            alt="Employee Profile"
            className="rounded-full object-cover border-4 border-white shadow-lg"
            style={{ width: 220, height: 220 }}
          />
          <div className="flex flex-col w-full gap-3 mt-6">
            {/* Leave Today Button - Fingerprint icon, NO background, black text, border, black icon */}
            <button
              className="flex items-center justify-center gap-2 w-full py-3 rounded text-black text-[15px] font-medium transition bg-transparent hover:bg-gray-100"
              style={{ boxShadow: 'none', fontWeight: 500 }}
            >
              <FaFingerprint className="w-5 h-5 text-cyan-500" />
              Leave Today
            </button>
            {/* Modify Profile Button - Blue, white text */}
            <button className="flex items-center justify-center gap-2 w-full py-3 rounded bg-cyan-500 hover:bg-cyan-600 text-white text-[15px] font-semibold transition">
              <BsPersonGear className="w-4 h-4" />
              Modify Profile
            </button>
          </div>
        </div>

        {/* Profile details column */}
        <div className="flex-1 pl-12 pr-6 pt-10 pb-6 flex flex-col">
          {/* Name and info */}
          <div className="flex flex-col mb-4">
            <div className="flex items-center gap-2">
              <span className="text-[24px] font-semibold text-black">
                Amal Ahammed
              </span>
              <span
                className="text-[13px] font-medium px-2 py-0.5 rounded"
                style={{ color: '#94C21A' }}
              >
                WFO
              </span>
            </div>
            <div className="mt-2 text-[15px] text-black font-medium">
              Employee ID <span className="font-normal text-gray-600">: SD201</span>
            </div>
            <div className="mt-1 text-[15px] text-black font-medium">
              Email ID <span className="font-normal text-gray-600">: amal.ahammed@company.com</span>
            </div>
          </div>
          {/* Divider */}
          <div className="w-full mb-7" style={{ borderTop: "1px solid #43C8FF" }}></div>
          {/* Details grid */}
          <div className="grid grid-cols-3 gap-x-10 gap-y-2 text-[15px]">
            {/* Personal Info */}
            <div className="space-y-2">
              {[
                ["Ph. No", "+91 98472 34567"],
                ["Emp. No", "+91 96334 11223"],
                ["Addr.", "Noor Manzil, Near Juma Masjid, Puthanpally Road, P.O. Kuttichira, Kozhikode – 673001, Kerala, India"],
                ["Gen.", "Male"],
                ["D.O.B.", "12/05/2002"],
                ["Nat.", "Indian"],
                ["BG", "O+"],
              ].map(([label, value]) => (
                <div className="flex items-start" key={label}>
                  <span className="w-24 font-semibold text-black flex-shrink-0">{label}</span>
                  <span className="mx-2 flex-shrink-0" style={{ lineHeight: "24px", minWidth: 10, textAlign: 'center' }}>:</span>
                  <span className="text-black">{value}</span>
                </div>
              ))}
            </div>
            {/* Job Info */}
            <div className="space-y-2">
              {[
                ["Job Type", "Offline Employee(WFO)"],
                ["Designation", "React Developers"],
                ["Department", "Software Development Department"],
                ["Rep Mgr / TL", "Project Lead"],
                ["User Type", "Admin Team Lead"],
                ["Salary", "₹1.5LPM"],
              ].map(([label, value]) => (
                <div className="flex items-start" key={label}>
                  <span className="w-36 font-semibold text-black flex-shrink-0">{label}</span>
                  <span className="mx-2 flex-shrink-0" style={{ lineHeight: "24px", minWidth: 10, textAlign: 'center' }}>:</span>
                  <span className="text-black">{value}</span>
                </div>
              ))}
            </div>
            {/* Bank Info */}
            <div className="space-y-2">
              {[
                ["Bank", "State Bank of India"],
                ["A/C No.", "123456789012"],
                ["A/C Holder", "Amal Ahammed"],
                ["Br. Name", "Kuttichira, Kozhikode"],
                ["IFSC", "SBIN0001234"],
                ["Attach. Docs", "hsuh"],
              ].map(([label, value]) => (
                <div className="flex items-start" key={label}>
                  <span className="w-36 font-semibold text-black flex-shrink-0">{label}</span>
                  <span className="mx-2 flex-shrink-0" style={{ lineHeight: "24px", minWidth: 10, textAlign: 'center' }}>:</span>
                  <span className="text-black">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EmployeeProfile



