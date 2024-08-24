import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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

        const res = await axios.get(
          "http://localhost:5000/api/posts/zilla-count",
          {
            headers: { Authorization: token },
          }
        );
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
      <h2>Distribution</h2>
      <table border="1" cellPadding="10" cellSpacing="0">
        <thead>
          <tr>
            <th>জেলা</th>
            <th>পোস্ট সংখ্যা</th>
          </tr>
        </thead>
        <tbody>
          {zillas?.map((z) => 
            <tr key={z.zilla}>
              <td>{z.zilla}</td>
              <td>{z.count}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Heatmap;
