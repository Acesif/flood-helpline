import axios from "axios";
import { Space, Table, Tag } from "antd";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const columns = [
  {
    title: "জেলা",
    dataIndex: "zilla",
    key: "zilla",
  },
  {
    title: "পোস্ট সংখ্যা",
    dataIndex: "count",
    key: "count",
  },
];

function Heatmap() {
  const navigate = useNavigate();

  const [zillas, setZillas] = useState();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/");
          return;
        }

        const res = await axios.get("http://localhost:5000/api/posts/zilla-count", {
          headers: { Authorization: token },
        });
        setZillas(res.data);
        // console.log(res.data);
      } catch (err) {
        if (err.response && err.response.status === 401) {
          navigate("/");
        }
      }
    };
    fetchPosts();
  }, [navigate]);

  return (
    <div>
      <h1 style={{ textAlign: "center", marginBottom: "12px" }}>Distribution</h1>

      <Table columns={columns} dataSource={zillas} />
    </div>
  );
}

export default Heatmap;
