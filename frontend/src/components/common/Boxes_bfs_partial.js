// import React, { useState, useEffect } from "react";

// const Boxes = () => {
//   const [boxes, setBoxes] = useState([]);

//   useEffect(() => {
//     fetch("dfs.txt")
//       .then((response) => response.text())
//       .then((data) => {
//         console.log(data);
//         const boxArray = data
//           .trim()
//           .split("\n")
//           .map((line) => line.split(" ").map(parseFloat));
//         setBoxes(boxArray);
//         console.log(boxArray);
//       });
//   }, []);

//   return (
//     <svg width="500" height="500">
//       {boxes.map(([x1, y1, x2, y2], index) => (
//         console.log(x1, y1, x2, y2),
//         <rect
//           key={index}
//           x={x1}
//           y={y1}
//           width={x2 - x1}
//           height={y2 - y1}
//           stroke="black"
//           fill="transparent"
//         />
//       ))}
//     </svg>
//   );
// };

// export default Boxes;
import React from 'react';
import axios from 'axios'; // Import axios

const randomColor = () => {
    // Generate a random number between 0 and 16777215 (the maximum value for a hex color)
    const number = Math.floor(Math.random() * 16777215);
    // Convert the number to hex and pad with zeros if needed
    const hex = number.toString(16).padStart(6, '0');
    // Return the hex color with a # prefix
    return '#' + hex;
  };

// A function to read the coordinates from dfs.txt and return an array of objects
// Use axios to read the input from dfs.txt
const readCoordinates = async () => {
  // Assume dfs.txt is in the public folder
  const response = await axios.get('./dfs_partial.txt');
  const data = response.data;
  console.log(data);
  const lines = data.split('\n');
  const coordinates = [];
  for (let line of lines) {
    // Split the line by whitespace and parse the numbers
    const [x1, y1, x2, y2] = line.split(' ').map(Number);
    // Create an object with the coordinates and push it to the array
    coordinates.push({ x1, y1, x2, y2 });
  }
  return coordinates;
};

// A function to draw a box given the coordinates
const drawBox = ({ x1, y1, x2, y2 }) => {
  // Calculate the width and height of the box
  const width = Math.abs(x2 - x1);
  const height = Math.abs(y2 - y1);
  // Use inline styles to position and style the box
  const color = randomColor();
  const style = {
    position: 'absolute',
    left: `${x1}px`,
    top: `${y1}px`,
    width: `${width}px`,
    height: `${height}px`,
    // border: '2px solid black',
    border: `2px solid ${color}`, // Use the random color for the border
    backgroundColor: color, // Use the random color for the background
  };
  // Return a div element with the style
  return <div style={style}></div>;
};

// An arrow functional es that takes no props and renders the boxes
const Boxes_dfs_partial = () => {
  // Use state to store the coordinates
  const [coordinates, setCoordinates] = React.useState([]);

  // Use effect to read the coordinates from dfs.txt once the component mounts
  React.useEffect(() => {
    // Call the readCoordinates function and update the state
    readCoordinates().then((coords) => setCoordinates(coords));
  }, []);

  // Return a div element that contains all the boxes
  return (
    <div>
      {coordinates.map((coord, index) => (
        // Use the index as a key for each box
        <React.Fragment key={index}>{drawBox(coord)}</React.Fragment>
      ))}
    </div>
  );
};

// Export the component
export default Boxes_dfs_partial;
