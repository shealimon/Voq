"use client";

import DashboardNav from "@/components/dashboard/DashboardNav";

const ExclamationIcon = () => (
  <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
  </svg>
);

const InfoIcon = () => (
  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
  </svg>
);

const RefreshIcon = () => (
  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M1 4v6h6M23 20v-6h-6M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15"/>
  </svg>
);

const WarningIcon = () => (
  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
  </svg>
);

const ContractorsIcon = () => (
  <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"></path>
    <path d="M12 11c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"></path>
    <path d="M8 14v2m4-2v2"></path>
  </svg>
);

const CandidatesIcon = () => (
  <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"></path>
    <path d="M23 21v-2a4 4 0 00-3-3.87"></path>
    <path d="M16 3.13a4 4 0 010 7.75"></path>
    <path d="M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
  </svg>
);

const TasksIcon = () => (
  <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/>
  </svg>
);

const TeamIcon = () => (
  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"></path>
    <path d="M23 21v-2a4 4 0 00-3-3.87"></path>
    <path d="M16 3.13a4 4 0 010 7.75"></path>
    <path d="M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
  </svg>
);

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardNav activePage="home" />

      {/* Main Content Area */}
      <div className="p-4 sm:p-6">
        <div className="mb-4 sm:mb-6">
          <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">Hey, Joyce 👋</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            {/* Payments Tracker Card */}
            <div className="bg-white border border-gray-200 rounded-md p-4 sm:p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <p className="text-sm text-gray-600 mb-2">Payments due</p>
                  <p className="text-2xl font-semibold text-gray-900">$0</p>
                  <p className="text-sm text-gray-500">USD · 0 invoices</p>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <p className="text-sm text-gray-600">Awaiting funds</p>
                    <ExclamationIcon />
                  </div>
                  <p className="text-2xl font-semibold text-gray-900">$810.0K</p>
                  <p className="text-sm text-gray-500">USD · 4 payments</p>
                </div>
              </div>
            </div>

            {/* Processing Payments Details Card */}
            <div className="bg-red-50 border border-red-200 rounded-md p-4 sm:p-6">
              <div className="flex items-start gap-3 mb-4">
                <ExclamationIcon />
                <div>
                  <h3 className="text-base font-semibold text-red-900 mb-2">Action required: overdue payments</h3>
                  <p className="text-sm text-red-800 mb-4">
                    Please make payments as soon as possible to avoid further complications or delays to payroll
                  </p>
                  <div className="flex items-center gap-2 mb-4">
                    <InfoIcon />
                    <span className="text-sm text-red-900">4 payments overdue</span>
                  </div>
                  <p className="text-sm text-red-800 mb-4">Overdue for: 109 days</p>
                  <button className="bg-gray-900 text-white px-4 py-2 rounded-md hover:bg-gray-800 transition">
                    View now
                  </button>
                </div>
              </div>
            </div>

            {/* Payroll Requests Card */}
            <div className="bg-white border border-gray-200 rounded-md p-4 sm:p-6">
              <p className="text-sm text-gray-900 mb-4">Showing requests for payroll cycle Jun 1st - 30th, 2025</p>
              <div className="flex items-start gap-3 mb-4">
                <InfoIcon />
                <p className="text-sm text-gray-600">You have no support request yet</p>
              </div>
              <button className="border border-gray-300 text-gray-900 px-4 py-2 rounded-md hover:bg-gray-50 text-sm">
                Go To Payroll Requests
              </button>
            </div>

            {/* Payment History Card */}
            <div className="bg-white border border-gray-200 rounded-md p-4 sm:p-6">
              <div className="flex items-start gap-3">
                <InfoIcon />
                <p className="text-sm text-gray-600">No payments have been completed yet</p>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4 sm:space-y-6">
            {/* For You Today Card */}
            <div className="bg-white border border-gray-200 rounded-md p-4 sm:p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">For you today</h2>
              <p className="text-sm text-gray-600 mb-6">To-dos that require your attention</p>
              
              <div className="space-y-4">
                {/* Contractors */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <ContractorsIcon />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Contractors' submissions</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="bg-gray-100 text-gray-900 text-xs px-2 py-1 rounded-full font-semibold">77</span>
                    <button className="text-gray-900 text-sm font-medium hover:underline">Review</button>
                  </div>
                </div>

                {/* Candidates */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <CandidatesIcon />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Candidates</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="bg-gray-100 text-gray-900 text-xs px-2 py-1 rounded-full font-semibold">14</span>
                    <button className="text-gray-900 text-sm font-medium hover:underline">Review</button>
                  </div>
                </div>

                {/* Tasks */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <TasksIcon />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Tasks</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="bg-gray-100 text-gray-900 text-xs px-2 py-1 rounded-full font-semibold">13</span>
                    <button className="text-gray-900 text-sm font-medium hover:underline">View</button>
                  </div>
                </div>
              </div>
            </div>

            {/* Maximize Your VOQ Experience Card */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-800 rounded-md p-4 sm:p-6 text-white">
              <div className="flex items-center gap-3 mb-4">
                <TeamIcon />
              </div>
              <h2 className="text-lg font-semibold mb-2">Manage your global team</h2>
              <p className="text-sm text-gray-300 mb-6">Centralized, compliant and scalable people management</p>
              <button className="bg-white text-gray-900 px-4 py-2 rounded-md hover:bg-gray-100 transition font-medium">
                Explore
              </button>
            </div>

            {/* Cycles Tracker Card */}
            <div className="bg-white border border-gray-200 rounded-md p-4 sm:p-6">
              <div className="flex items-center gap-2 mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Cycles Tracker</h2>
                <span className="bg-green-500 text-white text-xs px-2 py-0.5 rounded-full font-semibold">NEW</span>
              </div>
              
              <select className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>All countries</option>
              </select>

              <div className="space-y-6">
                {/* Cycle 1 */}
                <div>
                  <p className="text-sm font-medium text-gray-900 mb-3">CA entity · Payroll Group</p>
                  <p className="text-xs text-gray-600 mb-3">Jun 1st - 15th, 2025</p>
                  <div className="mb-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-gray-600">Submission</span>
                      <span className="text-xs text-gray-600">30%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: '30%' }}></div>
                    </div>
                  </div>
                  <button className="text-gray-900 text-sm font-medium hover:underline mb-2">Review payroll</button>
                  <p className="text-xs text-gray-600">Submit in 9 days</p>
                </div>

                {/* Cycle 2 */}
                <div className="border-t border-gray-200 pt-6">
                  <p className="text-sm font-medium text-gray-900 mb-3">US entity · Payroll Group</p>
                  <p className="text-xs text-gray-600 mb-3">Jun 1st - 15th, 2025</p>
                  <div className="mb-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-gray-600">Submission</span>
                      <span className="text-xs text-gray-600">30%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: '30%' }}></div>
                    </div>
                  </div>
                  <button className="text-gray-900 text-sm font-medium hover:underline mb-2">Review payroll</button>
                  <p className="text-xs text-gray-600">Submit in 9 days</p>
                </div>

                {/* Cycle 3 */}
                <div className="border-t border-gray-200 pt-6">
                  <p className="text-sm font-medium text-gray-900 mb-3">BD entity · Payroll Group</p>
                  <p className="text-xs text-gray-600">Processing report</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom-left Warning Icon */}
      <div className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-10">
        <button className="text-gray-600 p-2 bg-white rounded-full shadow-lg hover:bg-gray-50">
          <WarningIcon />
        </button>
      </div>

      {/* Bottom-right Refresh Button */}
      <button className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 w-12 h-12 bg-black text-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-800 z-10">
        <RefreshIcon />
      </button>
    </div>
  );
}
