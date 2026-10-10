import React from 'react';

const pictures = [
  { src: 'https://i.ibb.co/gMqqn017/campus.jpg', alt: 'Campus' },
  { src: 'https://i.ibb.co/N677bLkb/hostel.jpg', alt: 'Hostel' },
  { src: 'https://i.ibb.co/h1X6dwHz/moon.jpg', alt: 'Moon' },
  { src: 'https://i.ibb.co/XZBF61W4/arduino.jpg', alt: 'Arduino project' },
  { src: 'https://i.ibb.co/HL0rd7gF/mountain.jpg', alt: 'Mountain valley' },
  { src: 'https://i.ibb.co/wNpGyQsK/eye.jpg', alt: 'Eye' },
];

export default function Gallery() {
  return (
    <section id="gallery" className="gallery-section">
      <h2>My Gallery</h2>
      <div className="gallery">
        {pictures.map((pic) => (
          <a
            href={pic.src}
            target="_blank"
            rel="noreferrer"
            key={pic.alt}
            className="gallery-item"
          >
            <img src={pic.src} alt={pic.alt} />
          </a>
        ))}
      </div>
    </section>
  );
}
