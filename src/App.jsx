import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home.jsx";
import CursorGlowEffect from "./components/CursorGlowEffect.jsx";
//import background tiles
import BackgroundTiles from "./components/BackgroundTiles.jsx";
import Header from "./components/Header.jsx";
import Projects from "./components/Projects.jsx";

function App() {
  return (
    <div className="min-h-[100dvh] min-w-[100vw] max-w-full overflow-x-hidden flex flex-col items-center justify-center">
      <CursorGlowEffect />
      <BackgroundTiles />
      <Header />
      <div className="flex items-center justify-center mt-16 bg-inherit">
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
