import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AppViewer from "./pages/AppViewer";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/app/:appId" element={<AppViewer />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
