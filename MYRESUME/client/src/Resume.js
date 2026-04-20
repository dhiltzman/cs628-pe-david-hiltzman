import React from "react";
import "./Resume.css";

const Resume = () => {
  return (
    <div className="resume">
      <header className="header">
        <h1>David Hiltzman</h1>
        <p>Lynnwood, WA | (918) 352-8354 | david.hiltzman@gmail.com | github.com/dhiltzman | linkedin.com/in/david-hiltzman</p>
      </header>

      <section className="section">
        <h2>Education</h2>
        <div className="education">
          <h3>Master of Science in Computer Science</h3>
          <p>City University of Seattle | Expected May 2025</p>
          <h3>Bachelor of Science in Computer Science</h3>
          <p>Oklahoma State University | December 2022</p>
          <h3>Study Abroad</h3>
          <p>Hochschule Augsburg, Germany | February 2018 - August 2018</p>
        </div>
      </section>

      <section className="section">
        <h2>Professional Experience</h2>
        <div className="experience">
          <h3>Systems Reliability Engineer II</h3>
          <p>Blue Origin, Kent, WA | March 2026 - Present</p>
          <ul>
            <li>Build and maintain automations within Coupa and Vroozi, covering approval routing, user provisioning, vendor management, and invoice approvals; manage all scripts and configurations via GitLab.</li>
            <li>Monitor system performance via Datadog, identifying bottlenecks and optimizing compute resource utilization and uptime.</li>
            <li>Design audit and compliance metrics to flag data quality issues and deploy automated escalation processes to enforce data standards.</li>
            <li>Collaborate with cross-functional teams to identify automation opportunities and integrate solutions across operational systems.</li>
          </ul>

          <h3>Sourcing System Administrator II</h3>
          <p>Blue Origin, Kent, WA | December 2024 - March 2026</p>
          <ul>
            <li>Administered Vroozi and Exostar procurement systems, managing $45+ million in purchase orders and onboarding 2,600+ users.</li>
            <li>Resolved $3+ million in past-due invoices across 3,400+ transactions, preventing supplier account holds and ensuring supply chain continuity.</li>
            <li>Implemented automated solutions through Databricks for purchase requests, supplier reporting, and receipt tracking.</li>
          </ul>

          <h3>Contract Buyer II</h3>
          <p>Blue Origin, Kent, WA | August 2024 - November 2024</p>
          <ul>
            <li>Processed and managed purchase requisitions with a deep understanding of the approvals process, ensuring timely and efficient execution while maintaining compliance with internal and external regulations.</li>
            <li>Identified and worked to develop scalable solutions to complex supply chain challenges, leveraging a passion for end-to-end problem-solving and a deep understanding of industry best practices.</li>
            <li>Enhanced stakeholder engagement by regularly updating JIRA tickets, ensuring all parties had access to the latest information on procurement activities.</li>
          </ul>

          <h3>Program Manager / Sourcing Specialist II</h3>
          <p>Ditch Witch, Perry, Oklahoma | September 2022 - July 2024</p>
          <ul>
            <li>Engineered a desktop app with React JS and Rust to automate communication workflows for Purchase Orders, reducing process time and saving an average of 16 hours per person per quarter.</li>
            <li>Orchestrated cross-functional teams in resolving intricate supply chain issues through adept program management techniques.</li>
            <li>Brokered supplier pricing/contracts and devised supplier metrics, KPIs, and scorecards to enforce compliance to contracts.</li>
          </ul>
        </div>
      </section>

      <section className="section">
        <h2>Projects</h2>
        <div className="projects">
          <h3>GeoBuzz Mobile Application</h3>
          <p>August 2024</p>
          <p>Developed a mobile app using React Native, Expo, and AWS Lambda that delivers real-time local news alerts via push notifications, ensuring users stay informed on important events in their area.</p>
          <p>Implemented robust security measures using secure coding concepts to safeguard user data and maintain privacy while delivering location-based news alerts.</p>

          <h3>weCAPTCHA for Stanford's Treehacks Hackathon 2021</h3>
          <p>February 2021</p>
          <p>Designed and constructed a React web application to preserve lesser-known languages with games created in Firebase.</p>
          <p>Interfaced with public-facing social media plugins to assist in translation assistance.</p>

          <h3>Automated Super Air Meter</h3>
          <p>Oklahoma State University, Bert Cooper Engineering Laboratory | December 2020 - April 2021</p>
          <p>Automated a time-intensive process into a microcontroller-based program that reduces time by over 90%.</p>
          <p>Modernized with an Android-based dynamic application built in Flutter, communicating through Bluetooth.</p>
        </div>
      </section>

      <section className="section">
        <h2>Technical Skills</h2>
        <div className="skills">
          <ul>
            <li><strong>Languages &amp; Frameworks:</strong> AWS, Bash, C, C#, C++, CSS, HTML, Java, JavaScript, Linux, PowerShell, Python, React, Redux, Rust</li>
            <li><strong>Work Management:</strong> Agile, SDLC, CI/CD, Git, Jira</li>
            <li><strong>CAD Software:</strong> SolidWorks, Autodesk Inventor, AutoCAD</li>
            <li><strong>Fabrication:</strong> Additive, Rapid Prototyping, CNC Operation, Embedded Systems</li>
            <li><strong>Certifications:</strong> Front End Developer, HTML Developer, CSS Developer, JavaScript Developer, SolidWorks Associate, Six Sigma Green Belt, Part 107 Remote Pilot</li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default Resume;