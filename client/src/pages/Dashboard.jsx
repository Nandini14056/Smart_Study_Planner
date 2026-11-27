function Dashboard() {
  const stats = [
    { title: "Total Tasks", count: 8 },
    { title: "Completed", count: 3 },
    { title: "Pending", count: 5 },
  ];

  return (
    <section className="dashboard p-5">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <p className="text-gray-500">
        Here's an overview of your study progress.
      </p>

      <div className="flex justify-between px-3 py-4 rounded-3xl bg-violet-200 items-center my-5">
        <div>
          <h3 className="text-xl text-purple-500 font-bold">
            Small steps, big progress!
          </h3>
          <p className="text-gray-500">
            organize your tasks, manage your time and achieve your goals.
          </p>
          <button className="rounded-2xl bg-purple-500 h-10 w-40 text-white hover:bg-purple-800 cursor-pointer transition-colors mt-4">
            Generate Plan
          </button>
        </div>

        <div className="text-6xl">🎓</div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.title}
            className="border border-gray-300 rounded-2xl py-3 px-2 bg-white shadow-sm"
          >
            <h2 className="font-bold text-3xl">{stat.count}</h2>
            <p className="text-gray-600">{stat.title}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Dashboard;
