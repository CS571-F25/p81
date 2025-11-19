import React, { useState, useRef } from "react";

const dorms = ["Witte", "Sellery", "Barnard", "Bradley", "Slichter", "Tripp", "Van Vleck", "Smith", "Dejope", "Phillips", "Kronshage", "Ogg", "Jorns", "Sullivan"];

export default function DormLottery() {
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const wheelRef = useRef(null);

  const spin = () => {
    if (spinning) return;
    setSpinning(true);

    const sliceDeg = 360 / dorms.length;
    const randomSlice = Math.floor(Math.random() * dorms.length);

    // We spin 4 full turns then land exactly on the chosen slice
    const finalRotation = 360 * 4 + randomSlice * sliceDeg + sliceDeg / 2;
    setRotation(finalRotation);

    // Fire results after animation
    setTimeout(() => {
      alert("You got: " + dorms[randomSlice]);
      setSpinning(false);
    }, 4000); // match CSS transition duration
  };

  return (
    <div style={{ textAlign: "center" }}>
      <div
        ref={wheelRef}
        style={{
          margin: "20px auto",
          width: "300px",
          height: "300px",
          borderRadius: "50%",
          border: "10px solid #333",
          position: "relative",
          transition: "transform 4s cubic-bezier(0.33, 1, 0.68, 1)",
          transform: `rotate(${rotation}deg)`,
          overflow: "hidden",
        }}
      >
        {dorms.map((name, index) => {
            const sliceDeg = 360 / dorms.length;
            const rotation = index * sliceDeg;

            return (
                <div
                key={index}
                style={{
                    position: "absolute",
                    width: "50%",
                    height: "50%",
                    background: index % 2 === 0 ? "#ffd35a" : "#f57824ff",
                    transformOrigin: "100% 100%",
                    transform: `rotate(${rotation}deg) skewY(${90 - sliceDeg}deg)`,
                    borderRight: "1px solid #333",
                }}
                >
                </div>
            );
            })}


    </div>

      {/* Pointer */}
      <div
        style={{
          margin: "0 auto",
          width: 0,
          height: 0,
          borderLeft: "15px solid transparent",
          borderRight: "15px solid transparent",
          borderBottom: "25px solid red",
        }}
      />

      <button
        onClick={spin}
        disabled={spinning}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          fontSize: "18px",
        }}
      >
        {spinning ? "Spinning..." : "SPIN"}
      </button>
    </div>
  );
}
