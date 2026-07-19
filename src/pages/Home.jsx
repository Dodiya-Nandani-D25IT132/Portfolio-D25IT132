import Header from "../components/Header";
import About from "../components/About";
import Skills from "../components/Skills";
import Footer from "../components/Footer";

function Home() {

  const skills = [
    "HTML",
    "CSS",
    "JavaScript",
    "React"
  ];

  return (
    <>
      <Header name="Nandani Dodiya" />

      <About />

      <Skills skillList={skills} />

      <Footer email="nandani@example.com" />
    </>
  );
}

export default Home;