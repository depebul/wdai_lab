import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddArticle.css';

const AddArticle: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const newArticle = {
      id: Date.now(),
      title,
      content
    };
    const savedArticles = localStorage.getItem('articles');
    const articles = savedArticles ? JSON.parse(savedArticles) : [];
    articles.push(newArticle);
    localStorage.setItem('articles', JSON.stringify(articles));
    navigate('/blog');
  };

  const handleContentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [content]);

  return (
    <div className="add-article-container">
      <h2>Dodaj Artykuł</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Tytuł:
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
          </label>
        </div>
        <div>
          <label>
            Treść:
            <textarea
              ref={textareaRef}
              value={content}
              onChange={handleContentChange}
              rows={5}
              required
            />
          </label>
        </div>
        <button type="submit">DODAJ</button>
      </form>
    </div>
  );
};

export default AddArticle;