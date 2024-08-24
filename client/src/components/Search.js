import React, { useState } from "react";
import axios from "axios";

function Search() {
  const [zilla, setZilla] = useState("");
  const [content, setContent] = useState("");
  const [results, setResults] = useState([]);
  const zillaOptions = [
      "কুমিল্লা",
      "ফেনী",
      "ব্রাহ্মণবাড়িয়া",
      "রাঙ্গামাটি",
      "নোয়াখালী",
      "চাঁদপুর",
      "লক্ষ্মীপুর",
      "চট্টগ্রাম",
      "কক্সবাজার",
      "খাগড়াছড়ি",
      "বান্দরবান",
      "সিরাজগঞ্জ",
      "পাবনা",
      "বগুড়া",
      "রাজশাহী",
      "নাটোর",
      "জয়পুরহাট",
      "চাঁপাইনবাবগঞ্জ",
      "নওগাঁ",
      "যশোর",
      "সাতক্ষীরা",
      "মেহেরপুর",
      "নড়াইল",
      "চুয়াডাঙ্গা",
      "কুষ্টিয়া",
      "মাগুরা",
      "খুলনা",
      "বাগেরহাট",
      "ঝিনাইদহ",
      "ঝালকাঠি", 
      "পটুয়াখালী", 
      "পিরোজপুর", 
      "বরিশাল", 
      "ভোলা", 
      "বরগুনা",
      "সিলেট", 
      "মৌলভীবাজার", 
      "হবিগঞ্জ", 
      "সুনামগঞ্জ",
      "নরসিংদী",
      "গাজীপুর",
      "শরীয়তপুর",
      "নারায়ণগঞ্জ",
      "টাঙ্গাইল",
      "কিশোরগঞ্জ",
      "মানিকগঞ্জ",
      "ঢাকা",
      "মুন্সিগঞ্জ",
      "রাজবাড়ী",
      "মাদারীপুর",
      "গোপালগঞ্জ",
      "ফরিদপুর",
      "পঞ্চগড়",
      "দিনাজপুর",
      "লালমনিরহাট",
      "নীলফামারী",
      "গাইবান্ধা",
      "ঠাকুরগাঁও",
      "রংপুর",
      "কুড়িগ্রাম",
      "শেরপুর", 
      "ময়মনসিংহ", 
      "জামালপুর", 
      "নেত্রকোণা"
  ];

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const query = new URLSearchParams();
      if (zilla) query.append("zilla", zilla);
      if (content) query.append("content", content);
      const res = await axios.get(
        `http://localhost:5000/api/posts?${query.toString()}`
      );
      setResults(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Search Posts</h2>
      <form onSubmit={handleSearch}>
        <label htmlFor="zillaSelect">Search by Zilla: </label>
        <select
          id="zillaSelect"
          value={zilla}
          onChange={(e) => setZilla(e.target.value)}
          placeholder="Search by zilla"
        >
          <option value="" disabled>
            Select a Zilla
          </option>
          {zillaOptions.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Search by content"
        />
        <button type="submit">Search</button>
      </form>
      <div>
        {results.map((post) => (
          <div key={post._id}>
            <p>Zilla: {post.zilla}</p>
            <p>Content: {post.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Search;
