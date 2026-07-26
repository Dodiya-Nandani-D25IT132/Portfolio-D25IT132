import { useState } from "react";

function Contact() {

    const [message, setMessage] = useState("");

    return (

        <section className="contact">

            <h2>Contact Me</h2>

            <label>Enter your message</label>

            <br />

            <input
                type="text"
                placeholder="Type your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />

            <p>
                You typed: <strong>{message}</strong>
            </p>

            <button>Send Message</button>

        </section>

    );

}

export default Contact;