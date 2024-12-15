import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Blog.css';

interface Article {
  id: number;
  title: string;
  content: string;
}

const Blog: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    const savedArticles = localStorage.getItem('articles');
    if (savedArticles) {
      setArticles(JSON.parse(savedArticles));
    }
  }, []);

  return (
    <div className="blog-container">
      <h2>Blog</h2>
      <ul className="article-list">
        {articles.map(article => (
          <li key={article.id} className="article-item">
            <Link to={`/article/${article.id}`} className="article-link">{article.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Blog;