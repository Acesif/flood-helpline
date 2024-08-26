import axios from "axios";
import React, { useState } from "react";
import { Card, Select, Input, Button } from "antd";
const { TextArea } = Input;

function Search() {
  const [zilla, setZilla] = useState("");
  const [content, setContent] = useState("");
  const [results, setResults] = useState([]);

  const selectOptions = [
    {
      value: "কুমিল্লা",
      label: "কুমিল্লা",
    },
    {
      value: "ফেনী",
      label: "ফেনী",
    },
    {
      value: "ব্রাহ্মণবাড়িয়া",
      label: "ব্রাহ্মণবাড়িয়া",
    },
    {
      value: "রাঙ্গামাটি",
      label: "রাঙ্গামাটি",
    },
    {
      value: "নোয়াখালী",
      label: "নোয়াখালী",
    },
    {
      value: "চাঁদপুর",
      label: "চাঁদপুর",
    },
    {
      value: "লক্ষ্মীপুর",
      label: "লক্ষ্মীপুর",
    },
    {
      value: "চট্টগ্রাম",
      label: "চট্টগ্রাম",
    },
    {
      value: "কক্সবাজার",
      label: "কক্সবাজার",
    },
    {
      value: "খাগড়াছড়ি",
      label: "খাগড়াছড়ি",
    },
    {
      value: "বান্দরবান",
      label: "বান্দরবান",
    },
    {
      value: "সিরাজগঞ্জ",
      label: "সিরাজগঞ্জ",
    },
    {
      value: "পাবনা",
      label: "পাবনা",
    },
    {
      value: "বগুড়া",
      label: "বগুড়া",
    },
    {
      value: "রাজশাহী",
      label: "রাজশাহী",
    },
    {
      value: "নাটোর",
      label: "নাটোর",
    },
    {
      value: "জয়পুরহাট",
      label: "জয়পুরহাট",
    },
    {
      value: "চাঁপাইনবাবগঞ্জ",
      label: "চাঁপাইনবাবগঞ্জ",
    },
    {
      value: "নওগাঁ",
      label: "নওগাঁ",
    },
    {
      value: "যশোর",
      label: "যশোর",
    },
    {
      value: "সাতক্ষীরা",
      label: "সাতক্ষীরা",
    },
    {
      value: "মেহেরপুর",
      label: "মেহেরপুর",
    },
    {
      value: "নড়াইল",
      label: "নড়াইল",
    },
    {
      value: "চুয়াডাঙ্গা",
      label: "চুয়াডাঙ্গা",
    },
    {
      value: "কুষ্টিয়া",
      label: "কুষ্টিয়া",
    },
    {
      value: "মাগুরা",
      label: "মাগুরা",
    },
    {
      value: "খুলনা",
      label: "খুলনা",
    },
    {
      value: "বাগেরহাট",
      label: "বাগেরহাট",
    },
    {
      value: "ঝিনাইদহ",
      label: "ঝিনাইদহ",
    },
    {
      value: "ঝালকাঠি",
      label: "ঝালকাঠি",
    },
    {
      value: "পটুয়াখালী",
      label: "পটুয়াখালী",
    },
    {
      value: "পিরোজপুর",
      label: "পিরোজপুর",
    },
    {
      value: "বরিশাল",
      label: "বরিশাল",
    },
    {
      value: "ভোলা",
      label: "ভোলা",
    },
    {
      value: "বরগুনা",
      label: "বরগুনা",
    },
    {
      value: "সিলেট",
      label: "সিলেট",
    },
    {
      value: "মৌলভীবাজার",
      label: "মৌলভীবাজার",
    },
    {
      value: "হবিগঞ্জ",
      label: "হবিগঞ্জ",
    },
    {
      value: "সুনামগঞ্জ",
      label: "সুনামগঞ্জ",
    },
    {
      value: "নরসিংদী",
      label: "নরসিংদী",
    },
    {
      value: "গাজীপুর",
      label: "গাজীপুর",
    },
    {
      value: "শরীয়তপুর",
      label: "শরীয়তপুর",
    },
    {
      value: "নারায়ণগঞ্জ",
      label: "নারায়ণগঞ্জ",
    },
    {
      value: "টাঙ্গাইল",
      label: "টাঙ্গাইল",
    },
    {
      value: "কিশোরগঞ্জ",
      label: "কিশোরগঞ্জ",
    },
    {
      value: "মানিকগঞ্জ",
      label: "মানিকগঞ্জ",
    },
    {
      value: "ঢাকা",
      label: "ঢাকা",
    },
    {
      value: "মুন্সিগঞ্জ",
      label: "মুন্সিগঞ্জ",
    },
    {
      value: "রাজবাড়ী",
      label: "রাজবাড়ী",
    },
    {
      value: "মাদারীপুর",
      label: "মাদারীপুর",
    },
    {
      value: "গোপালগঞ্জ",
      label: "গোপালগঞ্জ",
    },
    {
      value: "ফরিদপুর",
      label: "ফরিদপুর",
    },
    {
      value: "পঞ্চগড়",
      label: "পঞ্চগড়",
    },
    {
      value: "দিনাজপুর",
      label: "দিনাজপুর",
    },
    {
      value: "লালমনিরহাট",
      label: "লালমনিরহাট",
    },
    {
      value: "নীলফামারী",
      label: "নীলফামারী",
    },
    {
      value: "গাইবান্ধা",
      label: "গাইবান্ধা",
    },
    {
      value: "ঠাকুরগাঁও",
      label: "ঠাকুরগাঁও",
    },
    {
      value: "রংপুর",
      label: "রংপুর",
    },
    {
      value: "কুড়িগ্রাম",
      label: "কুড়িগ্রাম",
    },
    {
      value: "শেরপুর",
      label: "শেরপুর",
    },
    {
      value: "ময়মনসিংহ",
      label: "ময়মনসিংহ",
    },
    {
      value: "জামালপুর",
      label: "জামালপুর",
    },
    {
      value: "নেত্রকোণা",
      label: "নেত্রকোণা",
    },
  ];

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const query = new URLSearchParams();
      if (zilla) query.append("zilla", zilla);
      if (content) query.append("content", content);
      const res = await axios.get(`https://flood-helpline-server.vercel.app/api/posts?${query.toString()}`);
      setResults(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSelectChange = (value) => {
    console.log("VALUE ", value);
    setZilla(value);
  };

  const handleInputChange = (e) => {
    console.log("INPUT ", e.target.value);
    setContent(e.target.value);
  };

  return (
    <div>
      <h1 style={{ textAlign: "center", marginBottom: "12px" }}>Search Posts</h1>

      <form onSubmit={handleSearch} style={{ display: "flex", flexDirection: "column", gap: "24px", marginBottom: "24px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <label htmlFor="zillaSelect">Search by Zilla: </label>
          <Select id="zillaSelect" defaultValue="কুমিল্লা" onChange={handleSelectChange} options={selectOptions} />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <label htmlFor="inputContent">Search by Content: </label>
          <TextArea rows={4} onChange={handleInputChange} />
        </div>

        <Button type="primary" htmlType="submit" size="large">
          Search
        </Button>
      </form>

      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {results.map((post) => (
          <Card key={post._id} title={post.zilla} style={{ backgroundColor: "#e6e8ea" }}>
            <p>{post.content}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Search;
