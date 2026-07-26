import Header from "../components/Header";
import About from "../components/About";
import Skills from "../components/Skills";
import Footer from "../components/Footer";

function Home() {

    const skills = [
        "HTML5",
        "CSS3",
        "JavaScript (ES6+)",
        "React.js",
        "React Router",
        "REST API",
        "Git & GitHub",
        "Responsive Web Design"
    ];

    return (
        <>

            <Header name="Nandani Dodiya" />

            <About />

            <Skills skillList={skills} />

            <Footer email="nandani.dodiya@example.com" />

        </>
    );
}

export default Home;