import React, { useState } from 'react';
import axios from 'axios';

function Search() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(`http://localhost:5000/api/posts/search?query=${query}`);
      setResults(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Search Posts</h2>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by content"
          required
        />
        <button type="submit">Search</button>
      </form>
      <div>
        {results.map((post) => (
          <div key={post._id}>
            <p>{post.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Search;

