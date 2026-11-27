function Sidebar() {
  const pages = ["Dashboard", "My Tasks", "Planner", "History"];

  return (
    <aside className="sidebar w-60 bg-white p-6 border-r shrink-0 space-y-4 border-gray-200">
      <h2 className="text-3xl font-bold text-purple-600">StudyFlow</h2>
      <nav className="flex flex-col gap-2">
        {pages.map((page) => (
          <button
            key={page}
            className="text-left px-4 py-3 hover:bg-violet-100 hover:text-violet-600 cursor-pointer transition-colors rounded-lg"
          >
            {page}
          </button>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;
