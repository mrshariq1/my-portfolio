import Navbar from "./components/Navbar";
import Home from "./sections/Home";
import About from "./sections/About";
import Skills from "./sections/Skills";
import Projects from "./sections/Projects";
import Contact from "./sections/Contact";
import NotFound from "./components/Notfound";

import { Routes, Route } from "react-router-dom";

function Portfolio() {
  return (
    <>
      <Navbar />
      <Home />
    </>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Portfolio />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;