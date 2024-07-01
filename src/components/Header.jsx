import React from "react";
import cheeseImage from "./mishi avatar.png"; // Import the image
import "./Header.css";
const Header = () => {
  return (
    <header
      style={{ display: "flex", alignItems: "center", marginRight: "50px" }}
    >
      <img
        src={cheeseImage}
        alt="Cheese"
        style={{
          width: "40px",
          height: "60px",

          borderRadius: "50%", // Make the image circular
        }}
      />
      <h1>Taskify</h1> {/* Header text */}
    </header>
  );
};

export default Header;
