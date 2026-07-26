import { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import ErrorMessage from "../components/ErrorMessage";

function Projects() {

    const [repos, setRepos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState("");

    const fetchRepos = () => {

        setLoading(true);
        setError(null);

        fetch("https://api.github.com/users/Dodiya-Nandani-D25IT132/repos")

            .then((response) => {

                if (!response.ok) {
                    throw new Error("Failed to fetch repositories.");
                }

                return response.json();

            })

            .then((data) => {

                setRepos(data);

            })

            .catch((err) => {

                setError(err.message);

            })

            .finally(() => {

                setLoading(false);

            });

    };

    useEffect(() => {

        fetchRepos();

    }, []);

    const filteredRepos = repos.filter((repo) =>
        repo.name.toLowerCase().includes(search.toLowerCase())
    );

    if (loading) {

        return <Spinner />;

    }

    if (error) {

        return (
            <ErrorMessage
                message={error}
                retry={fetchRepos}
            />
        );

    }

    return (

        <section className="projects">

            <h2>My Projects</h2>

            <p className="project-text">
                Live repositories fetched directly from my GitHub profile.
            </p>

            <input
                type="text"
                placeholder="Search repositories..."
                className="search-box"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            <div className="repo-grid">

                {filteredRepos.map((repo) => (

                    <div className="repo-card" key={repo.id}>

                        <h3>{repo.name}</h3>

                        <p>
                            ⭐ Stars : {repo.stargazers_count}
                        </p>

                        <p>
                            💻 Language : {repo.language || "Not Specified"}
                        </p>

                        <p>
                            📂 Visibility : {repo.visibility}
                        </p>

                        <a
                            href={repo.html_url}
                            target="_blank"
                            rel="noreferrer"
                            className="repo-btn"
                        >
                            View on GitHub →
                        </a>

                    </div>

                ))}

            </div>

        </section>

    );

}

export default Projects;