import "./App.css";
import Dashboard from "./pages/Dashboard";
import MainLayout from "./components/layout/MainLayout";
import "./styles/layout.css";

function App() {
  return (
    <MainLayout>
      <Dashboard />
    </MainLayout>
  );
}

export default App;
