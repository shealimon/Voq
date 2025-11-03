"use client";

import { useState } from "react";
import DashboardNav from "@/components/dashboard/DashboardNav";

const PlusIcon = () => (
  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M12 4v16m8-8H4"/>
  </svg>
);

const PeopleIcon = () => (
  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M12 11c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v3h16v-3c0-2.66-5.33-4-8-4z"/>
  </svg>
);

const SearchIcon = () => (
  <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
  </svg>
);

const FilterIcon = () => (
  <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"/>
  </svg>
);

const OrgChartIcon = () => (
  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"></path>
    <path d="M23 21v-2a4 4 0 00-3-3.87"></path>
    <path d="M16 3.13a4 4 0 010 7.75"></path>
    <path d="M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
  </svg>
);

const CalendarIcon = () => (
  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
  </svg>
);

const WorkforcePlanningIcon = () => (
  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M12 11c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v3h16v-3c0-2.66-5.33-4-8-4z"></path>
    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"></path>
  </svg>
);

const DotsIcon = () => (
  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path>
  </svg>
);

const LinkIcon = () => (
  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path>
  </svg>
);

const ChartIcon = () => (
  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M3 17v-6h6v6H3zm6 0V7h6v10h-6zm6 0v-4h6v4h-6z"></path>
  </svg>
);

const DocumentIcon = () => (
  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
  </svg>
);

const GlobeIcon = () => (
  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
  </svg>
);

const FingerprintIcon = () => (
  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"></path>
  </svg>
);

const ChevronRightIcon = () => (
  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M9 5l7 7-7 7"></path>
  </svg>
);

const InfoIcon = () => (
  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
  </svg>
);

const EllipsisIcon = () => (
  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"></path>
  </svg>
);

const MaximizeIcon = () => (
  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M8 3H5a2 2 0 00-2 2v3m18 0V5a2 2 0 00-2-2h-3m0 18h3a2 2 0 002-2v-3M3 16v3a2 2 0 002 2h3"></path>
  </svg>
);

// Sample People Data
const samplePeople = [
  {
    id: 1,
    name: "Adriana Costa",
    jobTitle: "QA Tester",
    avatar: "AC",
    avatarColor: "from-gray-400 to-gray-600",
    country: "Sweden",
    countryFlag: "🇸🇪",
    group: "SE - Payroll Connect (...)",
    workerType: "Direct Employee Payroll",
    workerStatus: "ACTIVE",
    startDate: "May 1st 2025"
  },
  {
    id: 2,
    name: "Alverta Kingcote",
    jobTitle: "Product Management",
    avatar: "AK",
    avatarColor: "from-gray-500 to-gray-700",
    country: "Australia",
    countryFlag: "🇦🇺",
    group: "AU - Payroll Connect -....",
    workerType: "Direct Employee Payroll",
    workerStatus: "ACTIVE",
    startDate: "May 1st 2025"
  },
  {
    id: 3,
    name: "Ambros Rhodef",
    jobTitle: "Group Lead",
    avatar: "AR",
    avatarColor: "from-gray-400 to-gray-600",
    country: "Australia",
    countryFlag: "🇦🇺",
    group: "AU - Payroll Connect -....",
    workerType: "Direct Employee Payroll",
    workerStatus: "ACTIVE",
    startDate: "May 1st 2025"
  }
];

const peopleSubNavItems = [
  { label: "People", icon: PeopleIcon },
  { label: "Org chart", icon: OrgChartIcon },
  { label: "Time off", icon: CalendarIcon },
  { label: "Workforce planning", icon: WorkforcePlanningIcon },
  { label: "Deel Talent", icon: DotsIcon },
  { label: "Tracker", icon: LinkIcon },
  { label: "Compliance hub", icon: ChartIcon },
  { label: "Documents", icon: DocumentIcon },
  { label: "Immigration", icon: GlobeIcon },
  { label: "Background", icon: FingerprintIcon }
];

export default function PeoplePage() {
  const [activeSubNav, setActiveSubNav] = useState("People");

  const filteredPeople = samplePeople;

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardNav activePage="people" />

      {/* Secondary Navigation Bar */}
      <div className="bg-white border-b border-gray-200 overflow-x-auto">
        <div className="flex items-center gap-2 px-4 py-2 min-w-max">
          {peopleSubNavItems.map((item) => (
            <button
              key={item.label}
              onClick={() => setActiveSubNav(item.label)}
              className={`flex items-center gap-2 px-3 py-2 rounded-md whitespace-nowrap ${
                activeSubNav === item.label
                  ? "bg-gray-900 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <item.icon />
              <span className="text-sm">{item.label}</span>
            </button>
          ))}
          <ChevronRightIcon />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4 sm:mb-6">
          <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">People</h1>
          <button className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition w-full sm:w-auto justify-center">
            <PlusIcon />
            <span>Add people</span>
          </button>
        </div>

        {/* Filter and Search Bar */}
        <div className="bg-white border border-gray-200 rounded-lg p-3 sm:p-4 mb-4">
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            <button className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-full hover:bg-gray-50">
              <SearchIcon />
            </button>
            <button className="relative w-10 h-10 flex items-center justify-center border border-gray-300 rounded-full hover:bg-gray-50">
              <FilterIcon />
              <span className="absolute -top-1 -right-1 bg-gray-900 text-white text-xs px-1.5 py-0.5 rounded-full">9+</span>
            </button>
            <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>Group</option>
            </select>
            <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>Worker status</option>
            </select>
            <span className="bg-gray-900 text-white text-xs px-2 py-0.5 rounded-full">9+</span>
            <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>Worker type</option>
            </select>
            <span className="bg-gray-900 text-white text-xs px-2 py-0.5 rounded-full">1</span>
            <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>Job title</option>
            </select>
            <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>Contract type</option>
            </select>
            <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>Contract status</option>
            </select>
            <button className="px-3 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">
              View as report
            </button>
            <button className="px-3 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">
              Configure columns
            </button>
            <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <EllipsisIcon />
            </button>
            <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <MaximizeIcon />
            </button>
          </div>
        </div>

        {/* Summary */}
        <div className="mb-4">
          <p className="text-sm text-gray-600">Total {filteredPeople.length} people</p>
        </div>

        {/* People Table */}
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden overflow-x-auto">
          <table className="w-full min-w-[640px]">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Person
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Country
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Group
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Worker type
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  <div className="flex items-center gap-1">
                    Worker status
                    <InfoIcon />
                  </div>
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  <div className="flex items-center gap-1">
                    Start date
                    <InfoIcon />
                  </div>
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider"></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredPeople.map((person) => (
                <tr key={person.id} className="hover:bg-gray-50">
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${person.avatarColor} flex items-center justify-center text-white font-semibold`}>
                        {person.avatar}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{person.name}</div>
                        <div className="text-sm text-gray-500">{person.jobTitle}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span className="text-2xl">{person.countryFlag}</span>
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-900">{person.group}</td>
                  <td className="px-4 py-4 text-sm text-gray-900">{person.workerType}</td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      <span className="text-sm text-gray-900">{person.workerStatus}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-900">{person.startDate}</td>
                  <td className="px-4 py-4">
                    <button className="text-gray-400 hover:text-gray-600">
                      <EllipsisIcon />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

