import './App.css';

import Header from "./components/Header";
import About from "./components/About";
import Skills from "./components/Skills";
import Footer from "./components/Footer";

function App() {
  const skills = [
    "HTML",
    "CSS",
    "JavaScript",
    "React",
    "Node.js",
  ];

  return (
    <div>
      <Header name="Nandani Dodiya" />

      <About />

      <Skills skillList={skills} />

      <Footer email="nandani@example.com" />
    </div>
  );
}

export default App;