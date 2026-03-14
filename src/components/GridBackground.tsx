import { useRef, useMemo, useState, useEffect, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";

// 3D Grid Component
const ThreeDGrid = () => {
  const meshRef = useRef<THREE.LineSegments>(null);
  
  const gridPositions = useMemo(() => {
    const size = 100;
    const divisions = 50;
    const vertices = [];
    for (let i = -size; i <= size; i += size / divisions) {
      vertices.push(i, 0, -size, i, 0, size);
      vertices.push(-size, 0, i, size, 0, i);
    }
    return new Float32Array(vertices);
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    meshRef.current.position.z = (t * 2) % 2;
  });

  return (
    <lineSegments ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={gridPositions.length / 3}
          array={gridPositions}
          itemSize={3}
        />
      </bufferGeometry>
      <lineBasicMaterial color="#00f2ff" transparent opacity={0.25} />
    </lineSegments>
  );
};

// Main Hybrid Background Component
const GridBackground = () => {
  const [webglSupported, setWebglSupported] = useState(true);

  useEffect(() => {
    // Check for WebGL support
    try {
      const canvas = document.createElement('canvas');
      const supported = !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
      setWebglSupported(supported);
    } catch (e) {
      setWebglSupported(false);
    }
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full bg-[#020617] -z-10 pointer-events-none overflow-hidden">
      {/* 2D CSS Grid (Always present as primary or backdrop) */}
      <div 
        className={`absolute inset-0 transition-opacity duration-1000 ${webglSupported ? 'opacity-[0.05]' : 'opacity-[0.15]'}`} 
        style={{ 
          backgroundImage: 'linear-gradient(#00f2ff 1px, transparent 1px), linear-gradient(90deg, #00f2ff 1px, transparent 1px)', 
          backgroundSize: '50px 50px',
          maskImage: 'radial-gradient(ellipse at center, black, transparent 80%)'
        }} 
      />

      {/* 3D Grid (Only if supported) */}
      {webglSupported && (
        <div className="absolute inset-0">
          <Canvas 
            gl={{ antialias: true, alpha: true }} 
            dpr={[1, 1.5]}
            onError={() => setWebglSupported(false)}
          >
            <PerspectiveCamera makeDefault position={[0, 2, 10]} fov={75} />
            <fog attach="fog" args={["#020617", 5, 25]} />
            <ambientLight intensity={0.5} />
            <Suspense fallback={null}>
               <ThreeDGrid />
            </Suspense>
          </Canvas>
        </div>
      )}

      {/* Cinematic Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-[#020617] opacity-80" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.6)_100%)]" />
      
      {/* Scanline Effect */}
      <div className="scanline opacity-10" />
    </div>
  );
};

export default GridBackground;
