import React, { useState } from 'react';

interface User {
  id: number;
  username: string;
  fullName: string;
}

interface KomentarzProps {
  id: number;
  body: string;
  postId: number;
  likes: number;
  user: User;
}

const Komentarz: React.FC<KomentarzProps> = ({ id, body, postId, likes: initialLikes, user }) => {
  const [likes, setLikes] = useState(initialLikes);
  const [userOpinion, setUserOpinion] = useState<'like' | 'dislike' | null>(null);

  const handleLike = () => {
    if (userOpinion === 'like') {
      setLikes(likes - 1);
      setUserOpinion(null);
    } else {
      if (userOpinion === 'dislike') {
        setLikes(likes + 2);
      } else {
        setLikes(likes + 1);
      }
      setUserOpinion('like');
    }
  };

  const handleDislike = () => {
    if (userOpinion === 'dislike') {
      setLikes(likes + 1);
      setUserOpinion(null);
    } else {
      if (userOpinion === 'like') {
        setLikes(likes - 2);
      } else {
        setLikes(likes - 1);
      }
      setUserOpinion('dislike');
    }
  };

  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0', borderRadius: '5px' }}>
      <div style={{ marginBottom: '10px' }}>
        <strong>{user.fullName} (@{user.username})</strong>
      </div>
      <div style={{ marginBottom: '10px' }}>
        {body}
      </div>
      <div style={{ display: 'none' }}>
        {/* Dummy usage of id and postId */}
        <span>{id}</span>
        <span>{postId}</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <button 
          onClick={handleLike} 
          style={{ marginRight: '10px', backgroundColor: userOpinion === 'like' ? 'lightgreen' : 'white' }}
        >
          👍
        </button>
        <button 
          onClick={handleDislike} 
          style={{ backgroundColor: userOpinion === 'dislike' ? 'lightcoral' : 'white' }}
        >
          👎
        </button>
        <span style={{ marginLeft: '10px' }}>Likes: {likes}</span>
      </div>
    </div>
  );
};

export default Komentarz;