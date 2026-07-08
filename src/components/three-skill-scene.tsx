"use client";

import { Float, Html, OrbitControls, Sphere, Stars } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Group } from "three";
import type { Skill } from "@/types/profile";

const palette = ["#60a5fa", "#34d399", "#fbbf24", "#fb7185", "#a78bfa", "#22d3ee"];

function SkillCluster({ skills }: { skills: Skill[] }) {
  const groupRef = useRef<Group>(null);
  const visibleSkills = skills.slice(0, 8);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.16;
      groupRef.current.rotation.x = Math.sin(Date.now() * 0.00035) * 0.12;
    }
  });

  return (
    <group ref={groupRef}>
      {visibleSkills.map((skill, index) => {
        const angle = (index / visibleSkills.length) * Math.PI * 2;
        const radius = index % 2 === 0 ? 2.3 : 1.62;
        const y = ((index % 4) - 1.5) * 0.62;
        const color = palette[index % palette.length];

        return (
          <Float key={skill.id} speed={1.2 + index * 0.08} rotationIntensity={0.5} floatIntensity={0.8}>
            <group position={[Math.cos(angle) * radius, y, Math.sin(angle) * radius]}>
              <Sphere args={[0.22 + skill.level / 650, 32, 32]}>
                <meshStandardMaterial
                  color={color}
                  emissive={color}
                  emissiveIntensity={0.35}
                  roughness={0.3}
                  metalness={0.42}
                />
              </Sphere>
              <Html center distanceFactor={8}>
                <span className="rounded-[var(--radius)] border border-white/20 bg-black/45 px-2 py-1 text-[10px] font-semibold text-white shadow-xl backdrop-blur-md">
                  {skill.name}
                </span>
              </Html>
            </group>
          </Float>
        );
      })}
      <Sphere args={[0.54, 48, 48]}>
        <meshStandardMaterial
          color="#e0f2fe"
          emissive="#60a5fa"
          emissiveIntensity={0.42}
          roughness={0.2}
          metalness={0.62}
        />
      </Sphere>
    </group>
  );
}

export function ThreeSkillScene({ skills }: { skills: Skill[] }) {
  return (
    <Canvas camera={{ position: [0, 0.45, 5.6], fov: 48 }} dpr={[1, 1.7]}>
      <ambientLight intensity={0.8} />
      <pointLight position={[4, 4, 4]} intensity={4.5} color="#60a5fa" />
      <pointLight position={[-4, -2, 3]} intensity={2.4} color="#34d399" />
      <Stars radius={32} depth={20} count={1200} factor={2.6} fade speed={0.45} />
      <SkillCluster skills={skills} />
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.6} />
    </Canvas>
  );
}
