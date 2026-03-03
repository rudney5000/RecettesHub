import Navbar from "./components/Navbar.tsx";
import {Outlet} from "react-router-dom";
import Footer from "./components/Footer.tsx";
export function App() {

  return (
    <div className="min-h-screen flex flex-col bg-base-100">
      <Navbar/>
      <main className="flex-1">
        <Outlet/>
      </main>
        <Footer/>
    </div>
  )
}

export default App
