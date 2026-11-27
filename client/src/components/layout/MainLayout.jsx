import Sidebar from "./Sidebar.jsx";
import Header from "./Header";

function MainLayout({ children }) {
  return (
    <div className="app-layout  flex min-h-screen bg-[#F8F7FC]">
      <Sidebar />

      <div className="main-content  flex-1 min-w-0">
        <Header />
        {children}
      </div>
    </div>
  );
}

export default MainLayout;
