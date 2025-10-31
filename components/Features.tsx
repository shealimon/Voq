const FEATURES = [
  {
    title: "HR",
    icon: () => (
      <svg className="w-8 h-8 text-blue-600 mb-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 11c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v3h16v-3c0-2.66-5.33-4-8-4z"/></svg>
    ),
    desc: "Manage your organization\'s structure, onboarding, and workflows."
  },
  {
    title: "Payroll",
    icon: () => (
      <svg className="w-8 h-8 text-blue-600 mb-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M2 12h20M2 6h20M2 18h20"/></svg>
    ),
    desc: "Automate payroll with compliance, tax calculations, and global payouts."
  },
  {
    title: "Attendance",
    icon: () => (
      <svg className="w-8 h-8 text-blue-600 mb-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
    ),
    desc: "Track time, leaves, and shifts — real-time analytics."
  },
  {
    title: "Analytics",
    icon: () => (
      <svg className="w-8 h-8 text-blue-600 mb-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 17v-6h6v6H3zm6 0V7h6v10h-6zm6 0v-4h6v4h-6z"/></svg>
    ),
    desc: "Gain insights with advanced workforce and compliance analytics."
  }
];

export default function Features() {
  return (
    <section id="features" className="py-20 px-4 bg-white dark:bg-zinc-900">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-blue-800 dark:text-blue-200 mb-12">
          All-In-One HCM Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {FEATURES.map((f) => (
            <div key={f.title} className="bg-blue-50 dark:bg-blue-950 rounded-2xl shadow hover:shadow-lg transition p-8 flex flex-col items-center text-center">
              {f.icon()}
              <h3 className="font-semibold text-lg text-blue-900 dark:text-blue-100 mb-2">{f.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
