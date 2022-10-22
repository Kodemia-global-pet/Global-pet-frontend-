import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import PetDetail from "./pages/PetDetail";
import FaqPage from "./pages/FaqPage";



function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/faq" element={<FaqPage />} />
        <Route path="/pet/:petID" element={<PetDetail />} />
      </Routes>
    </div>
  );
}

export default App;
