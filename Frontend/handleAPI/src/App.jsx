import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
function App() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  useEffect(() => {
    // race condition ko handle krta hai AbortController
    const controller = new AbortController();
    (async () => {
      try {
        setLoading(true);
        setError(false);
        const res = await axios.get("/api/products?search=" + search, {
          signal: controller.signal,
        });
        console.log(res.data);
        setProducts(res.data);
        setLoading(false);
      } catch (error) {
        //AbortController old request ko send krta hai catch ko  aur new wala hi milta hai
        if (axios.isCancel(error)) {
          console.log("REQUEST CANCELLED", error.message);
          return;
        }
        setError(true);
        setLoading(false);
      }
    })();
    // cleanup method jiska use ho chuka hai  old components ko unmount krta hai like koi eventlistiner
    return () => {
      controller.abort();
    };
  }, [search]);

  // if (error) {
  //   return (
  //     <h1>
  //       Something went wrong <span style={{ color: "red" }}>Error..</span>
  //     </h1>
  //   );
  // }

  // if (loading) {
  //   return <h2 style={{ color: "green" }}>Loading...</h2>;
  // }

  return (
    <div>
      {error && (
        <h1>
          Something went wrong <span style={{ color: "red" }}>Error..</span>
        </h1>
      )}
      {loading && <h2 style={{ color: "green" }}>Loading...</h2>}
      <h1>Mobile products</h1>
      <h3>Number of products are : {products.length}</h3>
      <input
        type="text"
        placeholder="Search here.."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <ul>
        {products.map((p) => (
          <li key={p.id}>
            ID: {p.id},Name : {p.name},Price: {p.price},Image:
            <img src={p.imageUrl}></img>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
