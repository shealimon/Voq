const TESTIMONIALS = [
  {
    name: "Sarah Lee",
    company: "Acme Corp",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    text: "VOQ transformed our HR operations – onboarding was seamless and our team loves the interface!"
  },
  {
    name: "James Miller",
    company: "Globex",
    avatar: "https://randomuser.me/api/portraits/men/12.jpg",
    text: "Payroll is now a breeze and compliance is stress-free. Highly recommend VOQ to any growing business."
  },
  {
    name: "Priya K. Singh",
    company: "Remoteify",
    avatar: "https://randomuser.me/api/portraits/women/9.jpg",
    text: "From time tracking to analytics, VOQ gives us everything to manage our global workforce efficiently."
  }
];

export default function Testimonials() {
  return (
    <section className="py-20 px-4 bg-zinc-50 dark:bg-zinc-950">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-blue-800 dark:text-blue-200 mb-12">
          What Our Customers Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t) => (
            <div key={t.name} className="bg-white dark:bg-zinc-900 rounded-2xl shadow p-8 flex flex-col items-center text-center transition hover:shadow-lg">
              <img src={t.avatar} alt={t.name} className="w-16 h-16 rounded-full mb-4 border-4 border-blue-100 dark:border-zinc-800 object-cover" />
              <blockquote className="text-lg italic text-gray-700 dark:text-gray-100 mb-3">“{t.text}”</blockquote>
              <div className="mt-auto">
                <span className="font-semibold text-blue-800 dark:text-blue-300">{t.name}</span>
                <div className="text-sm text-gray-500 dark:text-gray-400">{t.company}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
