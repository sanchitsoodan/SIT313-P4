import React from 'react';

const projects = [
  {
    title: 'LDR Based Solar Tracking System',
    description:
      'Designed and built a solar panel system using Light Dependent Resistors (LDRs) to track sunlight throughout the day. The system uses LDRs and a servo motor to adjust the panel.',
    details: 'Technologies: LDR, Servo Motor, Arduino',
    image: 'https://i.ibb.co/xwx24Q1/project1.jpg',
    link: 'https://i.ibb.co/xwx24Q1/project1.jpg',
  },
  {
    title: 'BYTE the Clue',
    description:
      'Participated in BYTE the Clue at Chitkara University with Team Byte Storm. We created "The Evolution of Sound", a poster showing how headphones have evolved from early designs to modern wireless and smart headsets.',
    extraText: 'Our team secured 3rd position in the Gadget Genius Award.',
    image: 'https://i.ibb.co/sJwP7LbD/project2.jpg',
    link: 'https://i.ibb.co/sJwP7LbD/project2.jpg',
    postUrl:
      'https://www.linkedin.com/posts/sanchit-soodan-ab62b2283_chitkarauniversity-bytetheclue-teambytestorm-ugcPost-7384232824536547329-A4Qd/',
  },
  {
    title: 'Create & Conquer Hackathon',
    description:
      'Participated in the Create & Conquer Hackathon at TIET, Patiala. Our team worked together to develop a technology-based solution during the hackathon.',
    details: 'Team: Ctrl+Alt+Win',
    image: 'https://i.ibb.co/TDC4Fp6R/project3.jpg',
    link: 'https://i.ibb.co/TDC4Fp6R/project3.jpg',
  },
];

export default function Projects() {
  return (
    <section id="work" className="projects-section">
      <h2>My Projects</h2>
      <div className="projects">
        {projects.map((project) => (
          <article className="project-card" key={project.title}>
            <a href={project.link} target="_blank" rel="noreferrer">
              <img src={project.image} alt={project.title} />
            </a>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            {project.extraText && (
              <p>
                <b>{project.extraText}</b>
              </p>
            )}
            {project.details && (
              <p>
                <b>{project.details}</b>
              </p>
            )}
            {project.postUrl && (
              <div className="project-btn-container">
                <a
                  href={project.postUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="project-link-btn"
                >
                  View Post
                </a>
              </div>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
