import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Profile() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/posts/user', {
          headers: { Authorization: token },
        });
        setPosts(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchUserPosts();
  }, []);

  const handleDelete = async (postId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/posts/${postId}`, {
        headers: { Authorization: token },
      });
      setPosts(posts.filter(post => post._id !== postId));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>My Profile</h2>
      <div>
        {posts.map(post => (
          <div key={post._id}>
            <p>{post.content}</p>
            <button onClick={() => handleDelete(post._id)}>Resolved</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Profile;
