function ErrorMessage({ message, retry }) {

    return (

        <div className="error-container">

            <h2>❌ Unable to Fetch Repositories</h2>

            <p>{message}</p>

            <button
                className="retry-btn"
                onClick={retry}
            >
                Retry
            </button>

        </div>

    );

}

export default ErrorMessage;