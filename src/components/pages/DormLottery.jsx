import React, { useState, useRef } from "react";

const COLORS = [
  "#F54927", "#FAA18F", "#C7740E", "#F7C991", "#E8D546",
  "#F7F1BF", "#2A820C", "#58E629", "#B4ED9F", "#115B8A",
  "#4AAFED", "#BEE2F9", "#463699", "#341f97", "#9180E0",
  "#711C87", "#DA84F0", "#8b838bff", "#d6a8d6ff", "#DEDBDE"
];

const dorms = [
  "Adams","Barnard","Bradley","Chadbourne","Cole","Dejope","Jorns","Kronshage",
  "Leopold","Lowell","Merit","Ogg","Phillips","Sellery","Slichter","Smith",
  "Sullivan","Tripp","Waters","Witte"
];

const dormImages = {
  "Adams": "/p81/src/assets/Adams.png",
  "Barnard": "/p81/src/assets/Barnard.png",
  "Bradley": "/p81/src/assets/Bradley.png",
  "Chadbourne": "/p81/src/assets/Chadbourne.png",
  "Cole": "/p81/src/assets/Cole.png",
  "Dejope": "/p81/src/assets/Dejope.png",
  "Jorns": "/p81/src/assets/Jorns.png",
  "Kronshage": "/p81/src/assets/Kronshage.png",
  "Leopold": "/p81/src/assets/Leopold.png",
  "Lowell": "/p81/src/assets/Lowell.png",
  "Merit": "/p81/src/assets/Merit.png",
  "Ogg": "/p81/src/assets/Ogg.png",
  "Phillips": "/p81/src/assets/Phillips.png",
  "Sellery": "/p81/src/assets/Sellery.png",
  "Slichter": "/p81/src/assets/Slichter.png",
  "Smith": "/p81/src/assets/Smith.png",
  "Sullivan": "/p81/src/assets/Sullivan.png",
  "Tripp": "/p81/src/assets/Tripp.png",
  "Waters": "/p81/src/assets/Waters.png",
  "Witte": "/p81/src/assets/Witte.png"
}

function deg2rad(deg){ return (deg * Math.PI) / 180; }

function describeSector(cx, cy, r, startAngle, endAngle){
  const start = { x: cx + r * Math.cos(deg2rad(startAngle)), y: cy + r * Math.sin(deg2rad(startAngle)) };
  const end = { x: cx + r * Math.cos(deg2rad(endAngle)), y: cy + r * Math.sin(deg2rad(endAngle)) };
  const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
  return [`M ${cx} ${cy}`, `L ${start.x} ${start.y}`, `A ${r} ${r} 0 ${largeArcFlag} 1 ${end.x} ${end.y}`, "Z"].join(" ");
}

export default function DormLottery(){
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState(null);
  const [showModal, setShowModal] = useState(false); // <-- modal state
  const wheelRef = useRef(null);

  const size = 360;
  const cx = size / 2;
  const cy = size / 2;
  const radius = size * 0.45;
  const sliceDeg = 360 / dorms.length;
  const startOffset = -90;

  const onSpinClick = () => {
    if (spinning) return;
    setSpinning(true);
    setResult(null);

    const randomIndex = Math.floor(Math.random() * dorms.length);
    const sectorCenter = startOffset + randomIndex * sliceDeg + sliceDeg / 2;
    const currentMod = ((rotation % 360) + 360) % 360;
    const desiredMod = ((-90 - sectorCenter) % 360 + 360) % 360;
    let delta = (desiredMod - currentMod + 360) % 360;
    const extraSpins = 360 * 5;
    const newRotation = rotation + extraSpins + delta;

    setRotation(newRotation);
    wheelRef.current.dataset.chosenIndex = randomIndex;
  };

  const handleTransitionEnd = (e) => {
    if (e.propertyName !== "transform") return;
    const chosen = Number(wheelRef.current.dataset.chosenIndex);
    if (!Number.isNaN(chosen)) {
      setResult(dorms[chosen]);
      setShowModal(true); // <-- open celebration modal
    }
    setSpinning(false);
  };

  const closeModal = () => setShowModal(false);

  return (
    <div style={{ textAlign: "center", fontFamily: "sans-serif" }}>
      {/* Wheel */}
      <div style={{ width: size, margin: "12px auto" }}>
        <div style={{ position: "relative", width: size, height: size }}>
          {/* Pointer */}
          <div style={{
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%) rotate(180deg)",
            top: -10,
            zIndex: 3,
            width: 0,
            height: 0,
            borderLeft: "12px solid transparent",
            borderRight: "12px solid transparent",
            borderBottom: "20px solid red",
            filter: "drop-shadow(0 1px 1px rgba(0,0,0,0.3))"
          }} />

          {/* Spinning slices */}
          <svg
            width={size}
            height={size}
            viewBox={`0 0 ${size} ${size}`}
            style={{
              transform: `rotate(${rotation}deg)`,
              transition: spinning ? "transform 4s cubic-bezier(0.33, 1, 0.68, 1)" : "none"
            }}
            ref={wheelRef}
            onTransitionEnd={handleTransitionEnd}
          >
            <circle cx={cx} cy={cy} r={radius + 10} fill="none" stroke="#333" strokeWidth={4} />
            {dorms.map((name, i) => {
              const startAngle = startOffset + i * sliceDeg;
              const endAngle = startOffset + (i + 1) * sliceDeg;
              const path = describeSector(cx, cy, radius, startAngle, endAngle);
              const midAngle = startOffset + i * sliceDeg + sliceDeg / 2;
              const labelRadius = radius * 0.5;
              const lx = cx + labelRadius * Math.cos(deg2rad(midAngle));
              const ly = cy + labelRadius * Math.sin(deg2rad(midAngle));
              let textRotation, anchor;
              if (midAngle > 90 && midAngle < 270) {
                textRotation = midAngle + 180;
                anchor = "end";
              } else {
                textRotation = midAngle;
                anchor = "start";
              }
              return (
                <g key={i}>
                  <path d={path} fill={COLORS[i % COLORS.length]} stroke="#333" strokeWidth="0.5" />
                  <text x={lx} y={ly} fill="#111" fontSize="11" textAnchor={anchor} dominantBaseline="middle"
                        transform={`rotate(${textRotation}, ${lx}, ${ly})`}>
                    {name}
                  </text>
                </g>
              );
            })}
          </svg>

          {/* Fixed center circle */}
          <div style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: radius * 0.36,
            height: radius * 0.36,
            transform: "translate(-50%, -50%)",
            borderRadius: "50%",
            backgroundColor: "#fff",
            border: "2px solid #333",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontWeight: 600,
            fontSize: 16,
            zIndex: 2
          }}>
            DORM
          </div>
        </div>
      </div>

      <button
        onClick={onSpinClick}
        disabled={spinning}
        style={{ marginTop: 12, padding: "10px 22px", fontSize: 16, cursor: spinning ? "not-allowed" : "pointer" }}
      >
        {spinning ? "Spinning..." : "SPIN"}
      </button>

      {/* Legend */}
      <div style={{ maxWidth: 540, margin: "18px auto 0", display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
        {dorms.map((name, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", margin: "6px 12px", minWidth: 120 }}>
            <div style={{ width: 18, height: 18, background: COLORS[i % COLORS.length], border: "1px solid #333", marginRight: 8 }} />
            <div style={{ fontSize: 14 }}>{name}</div>
          </div>
        ))}
      </div>

      {result && <div style={{ marginTop: 12, fontWeight: 600 }}>Result: {result}</div>}

      {/* Celebration Modal */}
      {showModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 10,
            animation: "fadeInBackdrop 0.3s ease forwards"
          }}
        >
          <div
            style={{
              backgroundColor: "#fff",
              padding: "30px 24px",
              borderRadius: 12,
              maxWidth: 1000,
              width: "90%",
              textAlign: "center",
              boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
              transform: "scale(0.8)",
              animation: "scaleIn 0.3s forwards",
            }}
          >
            <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 12 }}>🎉 Congratulations! 🎉</h2>
            <p style={{ fontSize: 16, marginBottom: 12 }}>
              You will be staying in: <strong>{result}</strong>. Time to find your roommates!
            </p>

            {/* Display image from src/assets */}
            <img
              src={dormImages[result]}
              alt={result}
              style={{ width: "80%", borderRadius: 8, marginBottom: 16 }}
            />
            <br />
            <a
              href={`https://www.housing.wisc.edu/undergraduate/residence-halls/${result}/`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-block",
                marginBottom: 16,
                padding: "10px 18px",
                fontSize: 14,
                fontWeight: 600,
                color: "#fff",
                backgroundColor: "#3b82f6",
                borderRadius: 8,
                textDecoration: "none"
              }}
            >
              Learn More
            </a>
            <br/>
            <button
              onClick={closeModal}
              style={{
                padding: "8px 16px",
                fontSize: 14,
                borderRadius: 8,
                backgroundColor: "#e5e7eb",
                border: "none",
                fontWeight: 600,
                cursor: "pointer",
                transition: "background-color 0.2s",
              }}
              onMouseOver={e => e.currentTarget.style.backgroundColor="#d1d5db"}
              onMouseOut={e => e.currentTarget.style.backgroundColor="#e5e7eb"}
            >
              Close
            </button>
          </div>

          {/* Animations */}
          <style>{`
            @keyframes fadeInBackdrop {
              from { background-color: rgba(0,0,0,0); }
              to { background-color: rgba(0,0,0,0.5); }
            }
            @keyframes scaleIn {
              from { transform: scale(0.8); opacity: 0; }
              to { transform: scale(1); opacity: 1; }
            }
          `}</style>
        </div>
      )}
    </div>
  );
}
