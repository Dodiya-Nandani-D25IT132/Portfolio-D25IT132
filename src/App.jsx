import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";

import "./App.css";

// Lazy load route-based components
const Home = lazy(() => import("./pages/Home"));
const Projects = lazy(() => import("./pages/Projects"));
const Contact = lazy(() => import("./pages/Contact"));
const Tasks = lazy(() => import("./pages/Tasks"));

function App() {
  return (
    <div className="app">
      <NavBar />

      <Suspense
        fallback={
          <div className="spinner-container">
            <div className="spinner"></div>
            <h3>Loading page...</h3>
            <p>Please wait while the component is loading.</p>
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/tasks" element={<Tasks />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;