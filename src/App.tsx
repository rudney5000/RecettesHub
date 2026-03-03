import Navbar from "./components/Navbar.tsx";
import {Route, Routes} from "react-router-dom";
import {HomePage} from "./pages/HomePage.tsx";

export function App() {

  return (
    <div className="min-h-screen flex flex-col bg-base-100">
        <Navbar/>
        <main className="flex-1">
            <Routes>
                <Route path="/" element={<HomePage/>} />
            </Routes>
        </main>
    </div>
  )
}

export default App
