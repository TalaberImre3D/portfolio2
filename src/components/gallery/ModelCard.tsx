"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stage, useGLTF } from "@react-three/drei";
import { Suspense, useEffect, useState } from "react";

type ModelCardProps = {
  src: string;
  alt: string;
  aspectRatio: string;
  poster?: string;
};

function Model({ src }: { src: string }) {
  const gltf = useGLTF(src);
  return <primitive object={gltf.scene} dispose={null} />;
}

export default function ModelCard({ src, alt, aspectRatio, poster }: ModelCardProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        style={{
          width: "100%",
          aspectRatio,
          minHeight: 220,
          borderRadius: "1rem",
          overflow: "hidden",
          backgroundColor: "#000",
          backgroundImage: poster ? `url(${poster})` : undefined,
          backgroundSize: "cover",
          backgroundPosition: "center",
          border: "none",
          padding: 0,
          cursor: "pointer",
          position: "relative",
        }}
        aria-label={`Open full screen preview for ${alt}`}
      >
        <span
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(180deg, rgba(0,0,0,0.1), rgba(0,0,0,0.55))",
          }}
        />
        <span
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            fontSize: "1rem",
            fontWeight: 600,
            textShadow: "0 0 20px rgba(0,0,0,0.65)",
          }}
        >
          View 3D model
        </span>
      </button>

      {open && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            backgroundColor: "rgba(0, 0, 0, 0.95)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1rem",
          }}
          aria-label={`Full screen preview of ${alt}`}
        >
          <button
            type="button"
            onClick={() => setOpen(false)}
            style={{
              position: "absolute",
              top: "1rem",
              right: "1rem",
              zIndex: 10000,
              border: "none",
              background: "rgba(0,0,0,0.4)",
              color: "#fff",
              padding: "0.75rem 1rem",
              borderRadius: "999px",
              cursor: "pointer",
            }}
          >
            Close
          </button>
          <div
            style={{
              width: "100%",
              maxWidth: 1200,
              aspectRatio,
              minHeight: 320,
              borderRadius: "1rem",
              overflow: "hidden",
              backgroundColor: "#000",
            }}
          >
            <Canvas camera={{ position: [0, 0, 4], fov: 35 }}>
              <ambientLight intensity={0.8} />
              <directionalLight position={[5, 5, 5]} intensity={1} />
              <Suspense
                fallback={
                  <mesh>
                    <boxGeometry args={[1, 1, 1]} />
                    <meshStandardMaterial color="#444" />
                  </mesh>
                }
              >
                <Stage adjustCamera environment="city" intensity={0.8}>
                  <Model src={src} />
                </Stage>
              </Suspense>
              <OrbitControls autoRotate enablePan={false} enableZoom />
            </Canvas>
          </div>
        </div>
      )}
    </>
  );
}
