// src/components/ProfilePage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

function ProfilePage() {
  const [posts, setPosts] = useState([]);
  const [editPostId, setEditPostId] = useState(null);
  const [editContent, setEditContent] = useState('');
  const navigate = useNavigate();

  // Fetch posts when the component mounts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const token = localStorage.getItem('token');
        const decoded = jwtDecode(token)
        const userId = decoded.userId;
        const res = await axios.get(`http://localhost:5000/api/posts/user/${userId}`, {
          headers: { Authorization: token },
        });
        setPosts(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchPosts();
  }, []);

  // Handle post edit
  const handleEdit = (postId, content) => {
    setEditPostId(postId);
    setEditContent(content);
  };

  const handleUpdatePost = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:5000/api/posts/${editPostId}`, { content: editContent }, {
        headers: { Authorization: token },
      });
      setPosts(posts.map(post => (post._id === editPostId ? { ...post, content: editContent } : post)));
      setEditPostId(null);
      setEditContent('');
    } catch (err) {
      console.error(err);
    }
  };

  // Handle post deletion
  const handleDelete = async (postId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/posts/${postId}`, {
        headers: { Authorization: token },
      });
      setPosts(posts.filter(post => post._id !== postId));
    } catch (err) {
      console.error('Error deleting post:', err.response ? err.response.data : err.message);
    }
  };


  return (
    <div>
      <h2>User Profile</h2>
      <div>
        {posts.map(post => (
          <div key={post._id}>
            {editPostId === post._id ? (
              <div>
                <textarea 
                  value={editContent} 
                  onChange={(e) => setEditContent(e.target.value)} 
                />
                <button onClick={handleUpdatePost}>Update</button>
                <button onClick={() => setEditPostId(null)}>Cancel</button>
              </div>
            ) : (
              <div>
                <p>{post.content}</p>
                <button onClick={() => handleEdit(post._id, post.content)}>Edit</button>
                <button onClick={() => handleDelete(post._id)}>Delete</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProfilePage;

