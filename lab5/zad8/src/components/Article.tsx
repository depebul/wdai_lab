import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './Article.css';

interface Article {
  id: number;
  title: string;
  content: string;
}

const Article: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [article, setArticle] = useState<Article | null>(null);

  useEffect(() => {
    const savedArticles = localStorage.getItem('articles');
    if (savedArticles) {
      const articles = JSON.parse(savedArticles);
      const foundArticle = articles.find((a: Article) => a.id === parseInt(id!));
      setArticle(foundArticle);
    }
  }, [id]);

  if (!article) {
    return <div>Artykuł nie znaleziony</div>;
  }

  return (
    <div className="article-container">
      <h2>{article.title}</h2>
      <p>{article.content}</p>
    </div>
  );
};

export default Article;