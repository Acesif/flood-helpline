import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Feed() {
  const divisions = [
    "চট্টগ্রাম",
    "রাজশাহী",
    "খুলনা",
    "বরিশাল",
    "সিলেট",
    "ঢাকা",
    "রংপুর",
    "ময়মনসিংহ",
  ];

  const zillas = [
    [
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
    ],
    [
      "সিরাজগঞ্জ",
      "পাবনা",
      "বগুড়া",
      "রাজশাহী",
      "নাটোর",
      "জয়পুরহাট",
      "চাঁপাইনবাবগঞ্জ",
      "নওগাঁ",
    ],
    [
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
    ],
    ["ঝালকাঠি", "পটুয়াখালী", "পিরোজপুর", "বরিশাল", "ভোলা", "বরগুনা"],
    ["সিলেট", "মৌলভীবাজার", "হবিগঞ্জ", "সুনামগঞ্জ"],
    [
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
    ],
    [
      "পঞ্চগড়",
      "দিনাজপুর",
      "লালমনিরহাট",
      "নীলফামারী",
      "গাইবান্ধা",
      "ঠাকুরগাঁও",
      "রংপুর",
      "কুড়িগ্রাম",
    ],
    ["শেরপুর", "ময়মনসিংহ", "জামালপুর", "নেত্রকোণা"],
  ];

  const [selectedDivision, setSelectedDivision] = useState("");
  const [availableZillas, setAvailableZillas] = useState([]);
  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/");
          return;
        }

        const res = await axios.get("http://localhost:5000/api/posts", {
          headers: { Authorization: token },
        });
        setPosts(res.data);
      } catch (err) {
        if (err.response && err.response.status === 401) {
          navigate("/");
        }
      }
    };
    fetchPosts();
  }, [navigate]);

  useEffect(() => {
    if (selectedDivision) {
      const divisionIndex = divisions.indexOf(selectedDivision);
      setAvailableZillas(zillas[divisionIndex]);
    } else {
      setAvailableZillas([]);
    }
  }, [selectedDivision]);

  const handlePost = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "http://localhost:5000/api/posts",
        { content },
        {
          headers: { Authorization: token },
        }
      );
      setPosts([res.data, ...posts]);
      setContent("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>পোস্ট ফিড</h2>
      <form onSubmit={handlePost}>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="এখানে লিখুন, আপনি কি সাহায্য চাচ্ছেন ?"
          required
        />
        <br />
        <br />
        <br />
        <div>
          <label>বিভাগ</label>
          <select
            value={selectedDivision}
            onChange={(e) => setSelectedDivision(e.target.value)}
            required
          >
            <option value="" disabled hidden>
              বিভাগ নির্বাচন করুন
            </option>
            {divisions.map((division, index) => (
              <option key={index} value={division}>
                {division}
              </option>
            ))}
          </select>

          <label>জেলা</label>
          <select required>
            <option value="" disabled hidden>
              জেলা নির্বাচন করুন
            </option>
            {availableZillas.map((zilla, index) => (
              <option key={index} value={zilla}>
                {zilla}
              </option>
            ))}
          </select>
        </div>
        <br />
        <button type="submit">পোস্ট করুন</button>
      </form>

      <br />
      <br />
      <div>
        {posts.map((post) => (
          <div className="card" key={post._id}>
            <p>{post.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Feed;
