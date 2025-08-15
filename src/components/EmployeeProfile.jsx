import React from 'react';
import { HiOutlineCalendar } from 'react-icons/hi';

const FieldRow = ({ label, value }) => {
	return (
		<div className="flex items-start text-sm">
			<div className="text-gray-500 shrink-0 w-32 md:w-40 leading-6">{label}</div>
			<div className="text-gray-300 px-2 shrink-0">:</div>
			<div className="text-gray-800 leading-6 break-words">{value}</div>
		</div>
	);
};

const EmployeeProfile = () => {
	return (
		<div className="bg-white border border-gray-200 rounded-xl p-5 md:p-7 shadow-sm">
			{/* Header */}
			<div className="flex items-start gap-4 md:gap-6">
				<img
					src="https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=256&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
					alt="Profile avatar"
					className="h-20 w-20 md:h-24 md:w-24 rounded-full object-cover ring-1 ring-gray-200"
				/>
				<div className="flex-1">
					<div className="flex items-center flex-wrap gap-2">
						<h2 className="text-lg md:text-xl font-semibold text-gray-900">Amal Ahammed</h2>
						<span className="text-[10px] md:text-xs font-semibold uppercase tracking-wide text-green-600 bg-green-50 border border-green-200 rounded px-1.5 py-0.5">WFO</span>
					</div>

					<div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-y-1 text-sm">
						<div className="flex items-center text-gray-700">
							<span className="text-gray-500 mr-2">Employee ID</span>
							<span className="text-gray-300 mr-2">:</span>
							<span className="font-medium">SD201</span>
						</div>
						<div className="flex items-center text-gray-700">
							<span className="text-gray-500 mr-2">Email ID</span>
							<span className="text-gray-300 mr-2">:</span>
							<span className="font-medium">amal.ahammed@company.com</span>
						</div>
					</div>
				</div>
			</div>

			<div className="border-t border-gray-200 mt-5 md:mt-6 mb-4"></div>

			{/* Body */}
			<div className="md:flex md:items-start md:gap-10">
				{/* Aside actions */}
				<div className="mb-5 md:mb-0 md:w-48 flex md:flex-col items-start gap-3">
					<button type="button" className="inline-flex items-center gap-2 text-sky-600 bg-sky-50 hover:bg-sky-100 border border-sky-200 rounded-full px-3 py-1.5 text-sm">
						<HiOutlineCalendar className="text-sky-500 text-base" />
						<span>Leave Today</span>
					</button>
					<button type="button" className="inline-flex items-center justify-center rounded-md bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 text-sm shadow-sm">
						Modify Profile
					</button>
				</div>

				{/* Details grid */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-2 flex-1">
					<div className="space-y-1.5">
						<FieldRow label="Ph. No" value={"+91 98472 34567"} />
						<FieldRow label="Emg. No" value={"+91 96333 11223"} />
						<FieldRow
							label="Addr."
							value={
								<span>
									Noor Manzil, Near Juma Masjid, Puthanpally Road,
									<br className="hidden md:block" />
									P.O. Kuttichira, Kozhikode – 673001, Kerala, India
								</span>
							}
						/>
						<FieldRow label="Gen." value={"Male"} />
						<FieldRow label="D.O.B." value={"12/05/2002"} />
						<FieldRow label="Nat." value={"Indian"} />
						<FieldRow label="BG" value={"O+"} />
					</div>

					<div className="space-y-1.5">
						<FieldRow label="Job Type" value={<span>Offline Employee<span className="hidden sm:inline">(WFO)</span></span>} />
						<FieldRow label="Designation" value={"React Developers"} />
						<FieldRow label="Department" value={"Software Development Department"} />
						<FieldRow label="Rep Mgr / TL" value={"Project Lead"} />
						<FieldRow label="User Type" value={"Admin Team Lead"} />
						<FieldRow label="Salary" value={"₹1.5 LPM"} />
						<div className="pt-1"></div>
						<FieldRow label="Bank" value={"State Bank of India"} />
						<FieldRow label="A/C No." value={"123456789012"} />
						<FieldRow label="A/C Holder" value={"Amal Ahammed"} />
						<FieldRow label="Br. Name" value={"Kuttichira, Kozhikode"} />
						<FieldRow label="IFSC" value={"SBIN0001234"} />
						<FieldRow label="Attach. Docs" value={"hsuh"} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default EmployeeProfile;