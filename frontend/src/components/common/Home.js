import { useState, useEffect } from "react";
import Navbar from "../templates/Navbar";
const Home = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    setName("");
  }, []);

  return <div style={{ textAlign: "center" }}>
    <div><Navbar /></div>
    <div
      style={{
        marginTop: "2em",
      }}
    >
    Click on the navbar buttons to see the visualization of each strategy
    </div>
    </div>;
};

export default Home;
