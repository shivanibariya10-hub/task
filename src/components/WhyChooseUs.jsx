import "./WhyChoose.css";



const WhyChoose = () => {
  return (
    <section className="why-section">
      <div className="why-container">

        {/* LEFT TEXT */}
        <div className="why-text">
          <h2>Why Choose Our App</h2>
          <p className="subtitle">
            Manage your tasks smarter with a clean interface,
            clear deadlines and powerful productivity tools.
          </p>

          <ul className="why-list">
            <li>Visual task scheduling</li>
            <li>Priority & deadline tracking</li>
            <li>Simple team collaboration</li>
            <li>Fast, secure and easy to use</li>
          </ul>
        </div>

        {/* RIGHT IMAGE */}
        <div className="why-image">
         <img src="/images/calendar-preview.png" alt="Why choose preview" />

        </div>

      </div>
    </section>
  );
};

export default WhyChoose;
