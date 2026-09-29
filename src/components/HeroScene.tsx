import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function Celebration() {
  const group = useRef<THREE.Group>(null);
  const particles = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const values = new Float32Array(360 * 3);
    for (let index = 0; index < 360; index += 1) {
      const seed = (index * 16807) % 2147483647;
      values[index * 3] = ((seed % 1000) / 1000 - 0.5) * 15;
      values[index * 3 + 1] = (((seed * 13) % 1000) / 1000 - 0.5) * 9;
      values[index * 3 + 2] = (((seed * 29) % 1000) / 1000 - 0.5) * 6;
    }
    return values;
  }, []);

  useFrame((state, rawDelta) => {
    const delta = Math.min(rawDelta, 0.05);
    if (group.current) {
      group.current.rotation.y += delta * 0.08;
      group.current.rotation.x = THREE.MathUtils.lerp(
        group.current.rotation.x,
        state.pointer.y * 0.12,
        1 - Math.exp(-3 * delta),
      );
      group.current.rotation.y +=
        (state.pointer.x * 0.18 - group.current.rotation.y) * (1 - Math.exp(-2 * delta));
    }
    if (particles.current) particles.current.rotation.z += delta * 0.025;
  });

  return (
    <group ref={group} position={[2.4, 0, 0]}>
      <mesh position={[0, 0.25, 0]} rotation={[0.2, 0.4, 0]}>
        <icosahedronGeometry args={[1.55, 4]} />
        <meshStandardMaterial color="#d9b76f" metalness={1} roughness={0.08} wireframe />
      </mesh>
      <mesh position={[-2.2, 1.25, -1.5]}>
        <sphereGeometry args={[0.62, 24, 24]} />
        <meshPhysicalMaterial
          color="#8f46ff"
          metalness={0.7}
          roughness={0.2}
          emissive="#3f116f"
          emissiveIntensity={0.8}
        />
      </mesh>
      <mesh position={[2.4, -1.2, -1]}>
        <sphereGeometry args={[0.86, 28, 28]} />
        <meshPhysicalMaterial color="#e8c57a" metalness={0.95} roughness={0.12} />
      </mesh>
      <points ref={particles}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <pointsMaterial color="#f3d792" size={0.035} sizeAttenuation transparent opacity={0.8} />
      </points>
    </group>
  );
}

export default function HeroScene() {
  return (
    <div className="absolute inset-0" aria-hidden="true">
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 8], fov: 48 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.7} />
        <pointLight position={[2, 4, 4]} intensity={18} color="#f1cf85" />
        <pointLight position={[-4, -2, 3]} intensity={10} color="#8d45ff" />
        <Celebration />
        <Environment resolution={64}>
          <Lightformer intensity={3} position={[0, 5, 2]} scale={[10, 10, 1]} />
          <Lightformer
            intensity={2}
            color="#8d45ff"
            position={[-5, 1, 0]}
            rotation-y={Math.PI / 2}
            scale={[10, 1, 1]}
          />
        </Environment>
      </Canvas>
    </div>
  );
}
