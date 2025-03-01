import React from 'react';
import './AboutPage.css';
import jonahPhoto from '../images/IMG_5398.jpeg';
import connorPhoto from '../images/IMG_5850.jpeg';
import michaelPhoto from '../images/IMG_5398.jpeg';
import alexPhoto from '../images/IMG_5885.jpeg';

const LinkedInIcon = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
  </svg>
);

function AboutPage() {
  const teamMembers = [
    {
      name: "Jonah Tran",
      role: "Full Stack Developer",
      photoPath: jonahPhoto,
      linkedIn: "https://www.linkedin.com/in/jonah-tran/"
    },
    {
      name: "Connor Koefelda",
      role: "Full Stack Developer",
      photoPath: connorPhoto,
      linkedIn: "https://www.linkedin.com/in/connor-koefelda/"
    },
    {
      name: "Michael Zayed",
      role: "Full Stack Developer",
      photoPath: michaelPhoto,
      linkedIn: "https://www.linkedin.com/in/michael-zayed/"
    },
    {
      name: "Alexander Lauinger",
      role: "Full Stack Developer",
      photoPath: alexPhoto,
      linkedIn: "https://www.linkedin.com/in/alexander-lauinger/"
    }
  ];

  return (
    <div className="about-page">
      <div className="about-content">
        <div className="about-section">
          <h1>About Ekewaka</h1>
          
          <section className="problem-statement">
            <h2>The Problem</h2>
            <p>
              In today's complex financial landscape, many people struggle to effectively plan and achieve their financial goals. 
              Traditional financial planning tools often:
            </p>
            <ul>
              <li>Lack personalization and context-awareness</li>
              <li>Provide generic advice that doesn't account for individual circumstances</li>
              <li>Feel overwhelming and difficult to navigate</li>
              <li>Miss the human element in financial guidance</li>
            </ul>
          </section>

          <section className="our-solution">
            <h2>Our Solution</h2>
            <p>
              Ekewaka is an intelligent financial planning assistant that combines the power of AI with personalized financial guidance. 
              Our platform:
            </p>
            <ul>
              <li>
                <strong>Personalized Guidance:</strong> Provides tailored financial advice based on your specific goals, income, and circumstances
              </li>
              <li>
                <strong>Interactive Planning:</strong> Engages in natural conversations to understand your needs and adjust recommendations in real-time
              </li>
              <li>
                <strong>Visual Analytics:</strong> Offers clear visual comparisons between current and proposed budgets to help you make informed decisions
              </li>
              <li>
                <strong>Actionable Steps:</strong> Breaks down large financial goals into manageable, achievable steps
              </li>
            </ul>
          </section>

          <section className="team-section">
            <h2>Meet Our Team</h2>
            <p className="team-intro">
              We're a passionate team of developers committed to making financial planning accessible and effective for everyone.
            </p>
            <div className="team-grid">
              {teamMembers.map((member, index) => (
                <div key={index} className="team-member">
                  <div className="member-photo">
                    <img src={member.photoPath} alt={member.name} className="member-img" />
                  </div>
                  <h3>{member.name}</h3>
                  <p className="member-role">{member.role}</p>
                  <a 
                    href={member.linkedIn}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="linkedin-button"
                    title="Connect on LinkedIn"
                  >
                    <LinkedInIcon />
                  </a>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default AboutPage; 