import Navbar from "./components/Navbar"
import { Routes, Route } from "react-router-dom"
import WorksSpace from "./pages/WorksSpace"
import Login from "./pages/Login"

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/workspace/*" element={<WorksSpace />} />
    </Routes>
  )
}

export default App