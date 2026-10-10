import React from 'react';
import ContentCard from './ContentCard';

// Task P3 requirement: Data stored as an array of objects and rendered via .map()
const articles = [
  {
    title: 'React vs Vue: Choosing the Right Framework',
    description:
      'Explore the architectural differences, state management approaches, and component lifecycles between React and Vue.',
    rating: '5',
    author: 'Dan Abramov',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=700&q=80',
  },
  {
    title: 'Node.js Architecture & Asynchronous I/O',
    description:
      'Learn how the Node.js event loop, libuv, and non-blocking I/O enable high-performance server-side web development.',
    rating: '5',
    author: 'Ryan Dahl',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=700&q=80',
  },
  {
    title: 'Mastering React Hooks & Custom Logic',
    description:
      'Deep dive into useState, useEffect, useMemo, and creating custom reusable hooks for clean component state.',
    rating: '5',
    author: 'Sophie Alpert',
    image: 'https://images.unsplash.com/photo-1555099962-4199c345e5dd?auto=format&fit=crop&w=700&q=80',
  },
];

const tutorials = [
  {
    title: 'Modern JavaScript (ES6+) Complete Guide',
    description:
      'Master arrow functions, destructuring, spread operators, promises, and async/await for modern frontend coding.',
    rating: '5',
    author: 'sanchit_dev',
    image: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=700&q=80',
  },
  {
    title: 'React Router v6 Navigation & Nested Routes',
    description:
      'Learn how to set up declarative routing, protected routes, and URL parameters in single-page React applications.',
    rating: '5',
    author: 'react_expert',
    image: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&w=700&q=80',
  },
  {
    title: 'Express.js REST API Development & Middleware',
    description:
      'Create robust API endpoints, parse JSON requests, handle CORS, and manage HTTP status codes effectively.',
    rating: '4.9',
    author: 'backend_ninja',
    image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?auto=format&fit=crop&w=700&q=80',
  },
];

function SectionBlock({ id, title, items, buttonText }) {
  return (
    <section id={id} className="feature-section">
      <h2>{title}</h2>
      <div className="content-grid">
        {items.map((item) => (
          <ContentCard item={item} key={item.title} />
        ))}
      </div>
      <div className="see-all-container">
        <button type="button" className="see-all-button">
          {buttonText}
        </button>
      </div>
    </section>
  );
}

export default function FeaturedContent() {
  return (
    <>
      <SectionBlock
        id="articles"
        title="Featured Articles"
        items={articles}
        buttonText="See all articles"
      />
      <SectionBlock
        id="tutorials"
        title="Featured Tutorials"
        items={tutorials}
        buttonText="See all tutorials"
      />
    </>
  );
}
