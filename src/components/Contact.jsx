
import React, { useState } from "react";
import "./Contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Integrate your API here
    setSuccess(true);
    setFormData({ name: "", email: "", subject: "", message: "" });
    setTimeout(() => setSuccess(false), 3000);
  };

  const scrollToForm = () => {
    document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="contact-hero">
        <div className="container hero-content">
          <h1 className="hero-title">Contact Task manager app</h1>
          <p className="hero-subtitle">
            Your trusted partner in smarter real-estate decisions
          </p>
          <button
  className="btn"
  onClick={() => {
    const formSection = document.getElementById("contact-form");
    if (formSection) {
      const yOffset = -20; // Thoda gap top se
      const y = formSection.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });

      // Fade-in class add karo
      formSection.classList.add("visible");
    }
  }}
>
  Get Started
</button>

        </div>
      </section>

      {/* Contact Info Boxes */}
      <section className="contact-info-section">
        <div className="container info-grid">
          <div className="info-box">
            
            <h3>Our Office</h3>
            <p>anand, India</p>
            <p>Serving clients nationwide</p>
          </div>
          <div className="info-box">
            <h3>Call Us</h3>
            <p>+91 98765 43210</p>
            <p>Mon - Sat, 9AM - 6PM</p>
          </div>
          <div className="info-box">
            <h3>Email</h3>
            <p>support@taskmanagerapp.com</p>
         <p>
    <strong>Support Hours:</strong> Mon-Fri, 10AM - 7PM
  </p>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
     <section className="contact-split">
  
  {/* Left Image */}
  <div className="contact-left"></div>

  {/* Right Form */}
  <div className="contact-right">
    <h2>Contact Us</h2>

    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Name" required />
      <input type="text" placeholder="Phone Number" required />
      <input type="email" placeholder="Email" required />
      <textarea placeholder="Message" rows="4" required></textarea>

      <button type="submit">Send Message</button>
    </form>
  </div>

</section>
      {success && <div className="success-message">Message sent successfully!</div>}
    </div>
  );
};

export default Contact;
