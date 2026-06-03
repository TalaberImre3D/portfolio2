"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stage, useGLTF } from "@react-three/drei";
import { Suspense } from "react";

type ModelCardProps = {
  src: string;
  alt: string;
  aspectRatio: string;
};

function Model({ src }: { src: string }) {
  const gltf = useGLTF(src);
  return <primitive object={gltf.scene} dispose={null} />;
}

export default function ModelCard({ src, alt, aspectRatio }: ModelCardProps) {
  return (
    <div
      style={{
        width: "100%",
        aspectRatio,
        minHeight: 220,
        borderRadius: "1rem",
        overflow: "hidden",
        backgroundColor: "#000",
      }}
      aria-label={alt}
      role="img"
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
  );
}
