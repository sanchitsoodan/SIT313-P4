import React from 'react';
import { Star } from 'lucide-react';

export default function ContentCard({ item }) {
  return (
    <article className="content-card">
      <img src={item.image} alt={item.title} />
      <h3>{item.title}</h3>
      <p>{item.description}</p>
      <div className="content-meta">
        <span className="rating">
          <Star size={16} fill="#f5a623" color="#f5a623" />
          <b>{item.rating}</b>
        </span>
        <span className="author">{item.author}</span>
      </div>
    </article>
  );
}
