import React from "react";
import "../styles/home.css";

const BoardWorkflow = () => {
  return (
    <section className="board-workflow">
      <div className="board-container">

        {/* LEFT SIDE – TEXT */}
        <div className="board-text">
          <h3>Success Starts With a Smart Task Board</h3>

          <p>
            Our task manager app uses a board-based system to help users
            move from planning to completion. After secure login, each
            user gets a personal dashboard to create, organize, and track
            tasks with ease.
          </p>

          <p>
            Tasks can be updated as work progresses, helping users stay
            focused, productive, and in control of their workflow.
          </p>

          <ul>
            <li>✔ Secure User Login & Registration</li>
            <li>✔ Personal Task Boards</li>
            <li>✔ Easy Task Tracking</li>
            <li>✔ Real-time Progress Updates</li>
          </ul>
        </div>

        {/* RIGHT SIDE – IMAGE */}
        <div className="board-image">
          <img
           src="/images/task-board.png"

            alt="Task Board Workflow Preview"
          />
        </div>

      </div>
    </section>
  );
};

export default BoardWorkflow;
