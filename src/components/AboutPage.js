import React from 'react';
import './AboutPage.css';

function AboutPage() {
  const teamMembers = [
    {
      name: "Jonah Tran",
      role: "Full Stack Developer",
      bio: "Lead developer focusing on the frontend architecture and user experience design.",
      photoPath: "/path-to-jonah-photo.jpg"
    },
    {
      name: "Connor Mckenna",
      role: "Backend Developer",
      bio: "Backend specialist responsible for AI integration and data processing systems.",
      photoPath: "/path-to-connor-photo.jpg"
    },
    {
      name: "Kainoa Borges",
      role: "Full Stack Developer",
      bio: "Full stack developer with expertise in financial data visualization and analysis.",
      photoPath: "/path-to-kainoa-photo.jpg"
    },
    {
      name: "Aidan Amato",
      role: "Full Stack Developer",
      bio: "Full stack developer specializing in secure user authentication and data management.",
      photoPath: "/path-to-aidan-photo.jpg"
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

          <section className="how-it-works">
            <h2>How It Works</h2>
            <div className="steps">
              <div className="step">
                <h3>1. Share Your Goal</h3>
                <p>Start by telling us about your financial goal, whether it's saving for a home, planning for retirement, or building an emergency fund.</p>
              </div>
              <div className="step">
                <h3>2. Provide Context</h3>
                <p>Our AI assistant gathers relevant information about your current financial situation through natural conversation.</p>
              </div>
              <div className="step">
                <h3>3. Get Personalized Plans</h3>
                <p>Receive customized recommendations and visual budget comparisons to help you achieve your goals.</p>
              </div>
              <div className="step">
                <h3>4. Track Progress</h3>
                <p>Monitor your progress and receive ongoing guidance as you work toward your financial objectives.</p>
              </div>
            </div>
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
                  <p className="member-bio">{member.bio}</p>
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