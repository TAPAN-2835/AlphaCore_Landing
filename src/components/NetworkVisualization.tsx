import { Suspense, useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { motion, useInView } from "framer-motion";
import * as THREE from "three";

const NODE_COUNT = 60;
const CONNECTION_COUNT = 80;

function NetworkGraph() {
  const pointsRef = useRef<THREE.Points>(null!);
  const linesRef = useRef<THREE.LineSegments>(null!);

  const { positions, connections } = useMemo(() => {
    const pos = new Float32Array(NODE_COUNT * 3);
    for (let i = 0; i < NODE_COUNT; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 6;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 6;
    }

    const conn = new Float32Array(CONNECTION_COUNT * 6);
    for (let i = 0; i < CONNECTION_COUNT; i++) {
      const a = Math.floor(Math.random() * NODE_COUNT);
      const b = Math.floor(Math.random() * NODE_COUNT);
      conn[i * 6] = pos[a * 3];
      conn[i * 6 + 1] = pos[a * 3 + 1];
      conn[i * 6 + 2] = pos[a * 3 + 2];
      conn[i * 6 + 3] = pos[b * 3];
      conn[i * 6 + 4] = pos[b * 3 + 1];
      conn[i * 6 + 5] = pos[b * 3 + 2];
    }

    return { positions: pos, connections: conn };
  }, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (pointsRef.current) {
      pointsRef.current.rotation.y = t * 0.05;
      pointsRef.current.rotation.x = Math.sin(t * 0.03) * 0.1;
    }
    if (linesRef.current) {
      linesRef.current.rotation.y = t * 0.05;
      linesRef.current.rotation.x = Math.sin(t * 0.03) * 0.1;
    }
  });

  return (
    <group>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.08}
          color="#38BDF8"
          transparent
          opacity={0.8}
          sizeAttenuation
        />
      </points>

      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[connections, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color="#818CF8"
          transparent
          opacity={0.15}
        />
      </lineSegments>
    </group>
  );
}

const NetworkVisualization = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <span className="text-primary font-mono text-sm tracking-wider uppercase">Global Network</span>
          <h2 className="text-3xl sm:text-5xl font-bold mt-4 text-foreground">
            Cyber Threat <span className="text-gradient-cyber">Visualization</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Real-time network graph showing simulated attack paths flowing between organizational nodes.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1, delay: 0.3 }}
          className="glass-card glow-border overflow-hidden"
          style={{ height: "500px" }}
        >
          <Suspense fallback={
            <div className="w-full h-full flex items-center justify-center">
              <span className="font-mono text-sm text-muted-foreground animate-pulse">Initializing network...</span>
            </div>
          }>
            <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
              <ambientLight intensity={0.3} />
              <NetworkGraph />
            </Canvas>
          </Suspense>

          {/* Overlay info */}
          <div className="absolute bottom-4 left-4 flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary" />
              <span className="text-[10px] font-mono text-muted-foreground">Nodes</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-secondary" />
              <span className="text-[10px] font-mono text-muted-foreground">Attack Paths</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default NetworkVisualization;
