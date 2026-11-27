function Header() {
  return (
    <header className="header flex justify-between items-center py-4 px-6 bg-white border-b border-gray-200">
      <div>
        <h2 className="text-xl font-bold">Welcome back! </h2>
        <p className="text-sm text-gray-500">Let's make today productive.</p>
      </div>

      <div className="bg-violet-200 rounded-full w-10 h-10 flex items-center justify-center">
        👩🏻
      </div>
    </header>
  );
}

export default Header;
