import Navbar from "./components/Navbar.tsx";
import {Outlet} from "react-router-dom";
export function App() {

  return (
    <div className="min-h-screen flex flex-col bg-base-100">
      <Navbar/>
      <main className="flex-1">
        <Outlet/>
      </main>
    </div>
  )
}

export default App
