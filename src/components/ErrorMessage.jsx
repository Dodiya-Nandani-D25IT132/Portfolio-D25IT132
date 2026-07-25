function ErrorMessage({ message, onRetry }) {
  return (
    <div className="error-container">
      <h2>❌ Unable to Fetch Repositories</h2>
      <p>{message}</p>
      <button onClick={onRetry}>
        Retry
      </button>
    </div>
  );
}

export default ErrorMessage;