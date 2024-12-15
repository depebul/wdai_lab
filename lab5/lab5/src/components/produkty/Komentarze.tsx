import React, { useState, useEffect } from 'react';
import Komentarz from './Komentarz';

interface User {
  id: number;
  username: string;
  fullName: string;
}

interface Comment {
  id: number;
  body: string;
  postId: number;
  likes: number;
  user: User;
}

const Komentarze: React.FC = () => {
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    fetch('https://dummyjson.com/comments')
      .then(response => response.json())
      .then(data => {
        const commentsData = data.comments.map((comment: Comment) => ({
          id: comment.id,
          body: comment.body,
          postId: comment.postId,
          likes: comment.likes,
          user: {
            id: comment.user.id,
            username: comment.user.username,
            fullName: comment.user.username // Assuming fullName is not available in the API
          }
        }));
        setComments(commentsData);
      });
  }, []);

  return (
    <div>
      <h2>Komentarze</h2>
      {comments.map(comment => (
        <Komentarz key={comment.id} {...comment} />
      ))}
    </div>
  );
};

export default Komentarze;