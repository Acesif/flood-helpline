import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function Feed() {
  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState('');
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchPosts = async () => {
      console.log('Fetching posts...'); 
      try {
        const token = localStorage.getItem('token');
        console.log('Token:', token); 
        if (!token) {
          navigate('/');
          return;
        }
  
        const res = await axios.get('http://localhost:5000/api/posts', {
          headers: { Authorization: token },
        });
        console.log('Posts fetched:', res.data);
        setPosts(res.data);
      } catch (err) {
        console.error('Failed to fetch posts:', err);
        if (err.response && err.response.status === 401) {
          navigate('/');
        }
      }
    };
    fetchPosts();
  }, [navigate]);

  const handlePost = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post(
        'http://localhost:5000/api/posts',
        { content },
        {
          headers: { Authorization: token },
        }
      );
      setPosts([res.data, ...posts]);
      setContent('');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Feed</h2>
      <form onSubmit={handlePost}>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What's on your mind?"
          required
        />
        <button type="submit">Post</button>
      </form>
      <div>
        {posts.map((post) => (
          <div key={post._id}>
            <p>{post.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Feed;
