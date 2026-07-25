import { useState, useEffect } from "react";
import Spinner from "../components/Spinner";
import ErrorMessage from "../components/ErrorMessage";


function Projects() {

    const [repos, setRepos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
      fetch("https://api.github.com/users/Dodiya-Nandani-D25IT132/repos")
          .then((response) => response.json())
          .then((data) => {
              setRepos(data);
          })
          .catch((err) => {
              setError(err.message);
          })
          .finally(() => {
              setLoading(false);
          });
    }, []);
    if (loading) {
      return <Spinner />;
    }

    if (error) {
        return <ErrorMessage message={error} />;
      }

    return (
        <section className="projects">
            <h2>My GitHub Repositories</h2>

            <p>API integration will be added in the next phase.</p>
        </section>
    );
}

export default Projects;