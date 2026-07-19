import { useState } from "react";

function Contact() {

  const [message, setMessage] = useState("");
  const [showHelp, setShowHelp] = useState(false);

  return (
    <section className="contact">

      <h2>Contact Me</h2>

      <label>Message</label>

      <br />

      <input
        type="text"
        placeholder="Enter your message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <p>You typed: {message}</p>

      <button onClick={() => setShowHelp(!showHelp)}>
        {showHelp ? "Hide Help" : "Show Help"}
      </button>

      {
        showHelp && (
          <p>Please enter your message in the input box.</p>
        )
      }

    </section>
  );
}

export default Contact;