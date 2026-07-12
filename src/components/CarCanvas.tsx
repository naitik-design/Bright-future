import React, { Suspense, useMemo, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger to ensure GSAP is ready
gsap.registerPlugin(ScrollTrigger);

// Cache GLTF to optimize performance and prevent re-fetching
useGLTF.preload('https://res.cloudinary.com/jmoelmzp/image/upload/v1783835016/textured_mesh_pnmwkd.glb');

class WebGLErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean }> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: any) {
    console.error("WebGL Rendering Error:", error);
  }

  render() {
    if (this.state.hasError) return null; // Graceful fallback on crash
    return this.props.children;
  }
}

interface CarModelProps {
  isMobile: boolean;
  carState: React.MutableRefObject<{
    x: number;
    y: number;
    z: number;
    rotX: number;
    rotY: number;
    rotZ: number;
    scale: number;
  }>;
}

function CarModel({ isMobile, carState }: CarModelProps) {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF('https://res.cloudinary.com/jmoelmzp/image/upload/v1783835016/textured_mesh_pnmwkd.glb');

  // Track wheel meshes for rotation
  const wheels = useRef<THREE.Object3D[]>([]);

  // Apply premium metallic physical materials to make reflections react to nebula lights
  const processedScene = useMemo(() => {
    wheels.current = [];
    const clonedScene = scene.clone();
    
    clonedScene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        
        // Identify wheel components to animate on scroll
        const nameLower = child.name.toLowerCase();
        if (nameLower.includes('wheel') || nameLower.includes('tyre') || nameLower.includes('rim')) {
          wheels.current.push(mesh);
        }

        // Adjust existing textures to look extremely premium under nebula light
        if (mesh.material) {
          // Clone material to avoid mutating cached GLTF and allow proper disposal
          const mat = (mesh.material as THREE.Material).clone() as THREE.MeshStandardMaterial;
          mesh.material = mat;

          mat.metalness = Math.max(mat.metalness || 0, 0.85);
          mat.roughness = Math.min(mat.roughness || 1, 0.18);
          
          if ('clearcoat' in mat) {
            (mat as any).clearcoat = 1.0;
            (mat as any).clearcoatRoughness = 0.05;
          }
          
          mat.envMapIntensity = 1.8;
          mesh.castShadow = true;
          mesh.receiveShadow = true;
        }
      }
    });
    return clonedScene;
  }, [scene]);

  // Cleanup cloned materials to prevent GPU memory leaks
  useEffect(() => {
    return () => {
      processedScene.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          const mesh = child as THREE.Mesh;
          if (mesh.material) {
            (mesh.material as THREE.Material).dispose();
          }
        }
      });
    };
  }, [processedScene]);

  // Handle frame-by-frame updates with 0 lag
  useFrame((state) => {
    if (!groupRef.current) return;

    const target = carState.current;

    // Apply the GSAP-animated values directly to the mesh
    groupRef.current.position.x = target.x;
    groupRef.current.position.y = target.y;
    groupRef.current.position.z = target.z;
    
    groupRef.current.rotation.x = target.rotX;
    groupRef.current.rotation.y = target.rotY;
    groupRef.current.rotation.z = target.rotZ;

    groupRef.current.scale.setScalar(target.scale);

    // Subtle floating idle motion to make it feel alive
    const elapsedTime = state.clock.getElapsedTime();
    groupRef.current.position.y += Math.sin(elapsedTime * 1.5) * 0.035;

    // Spin wheels slowly as an interactive drift effect
    if (wheels.current.length > 0) {
      wheels.current.forEach((wheel) => {
        wheel.rotation.x += 0.015;
      });
    }
  });

  return (
    <group ref={groupRef}>
      <primitive object={processedScene} />
    </group>
  );
}

export function CarCanvas() {
  const [isMobile, setIsMobile] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // High-performance shared coordinate reference - entirely avoids React re-renders on scroll
  const carState = useRef({
    x: 3.5,
    y: -2.5,
    z: -2.0,
    rotX: 0.1,
    rotY: -1.2,
    rotZ: 0,
    scale: 0.8,
  });

  // Check screen resizing and visibility on mount
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    const handleScroll = () => {
      // Show car past Hero section (100px)
      setIsVisible(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Initialize internal GSAP ScrollTrigger timeline to animate the car state reference
  useEffect(() => {
    const stateObj = carState.current;

    // Set responsive initial positions
    gsap.set(stateObj, {
      x: isMobile ? 0 : 3.5,
      y: isMobile ? -3.0 : -2.5,
      z: -2.0,
      rotX: 0.1,
      rotY: -1.2,
      rotZ: 0,
      scale: isMobile ? 0.45 : 0.8,
    });

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '#root',
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.5, // Buttery smooth scrubbing and lag reduction
        }
      });

      // Animate coordinates smoothly matching user's scroll story
      tl.to(stateObj, {
        x: isMobile ? 0 : 1.8,
        y: isMobile ? -0.8 : -0.5,
        z: 0.5,
        rotX: 0.05,
        rotY: -0.8,
        rotZ: 0.02,
        scale: isMobile ? 0.65 : 1.35,
        duration: 1,
      })
      .to(stateObj, {
        x: isMobile ? 0 : 0.6,
        y: isMobile ? -0.6 : -0.4,
        z: 1.5,
        rotX: -0.05,
        rotY: -0.4,
        rotZ: 0.05,
        scale: isMobile ? 0.75 : 1.6,
        duration: 1,
      })
      .to(stateObj, {
        x: isMobile ? 0 : -1.6,
        y: isMobile ? -0.7 : -0.5,
        z: 0.2,
        rotX: 0.02,
        rotY: -1.57, // Perfectly profiles side view
        rotZ: -0.02,
        scale: isMobile ? 0.6 : 1.4,
        duration: 1,
      })
      .to(stateObj, {
        x: isMobile ? 0 : 0,
        y: isMobile ? -0.7 : -0.5,
        z: 0,
        rotX: 0.05,
        rotY: Math.PI * 1.2, // Full scenic orbit rotation
        rotZ: 0,
        scale: isMobile ? 0.65 : 1.3,
        duration: 1,
      })
      .to(stateObj, {
        x: 0,
        y: isMobile ? -0.65 : -0.4,
        z: 1.0,
        rotX: 0.05,
        rotY: Math.PI * 1.9, // Facing the visitor
        rotZ: 0,
        scale: isMobile ? 0.7 : 1.5,
        duration: 1,
      });
    });

    return () => ctx.revert();
  }, [isMobile]);

  return (
    <div 
      className={`fixed inset-0 w-full h-full pointer-events-none transition-opacity duration-1000 ease-out z-0`}
      style={{ display: isVisible ? 'block' : 'none' }}
    >
      <WebGLErrorBoundary>
        <Canvas
          shadows
          gl={{ 
            antialias: true, 
            powerPreference: "high-performance",
            alpha: true,
            preserveDrawingBuffer: false
          }}
          dpr={isMobile ? 1 : Math.min(2, Math.round(window.devicePixelRatio || 1))} // Fix for Android WebGL fractional DPR static/noise glitch
        >
          <PerspectiveCamera makeDefault position={[0, 0, 5.5]} fov={isMobile ? 55 : 45} />

        {/* Cinematic Ambient Space Lighting */}
        <ambientLight intensity={0.4} />

        {/* Nebula Deep Purple Light Accent */}
        <directionalLight 
          position={[-5, 3, 2]} 
          intensity={2.5} 
          color="#5B21B6" 
          castShadow
        />

        {/* Nebula Orange Light Accent */}
        <directionalLight 
          position={[5, -2, 3]} 
          intensity={3.0} 
          color="#FF5A36" 
        />

        {/* Luxury Gold/Warm Rim Glow */}
        <directionalLight 
          position={[0, 5, -3]} 
          intensity={1.8} 
          color="#F6C453" 
        />

        {/* Headlight illumination effect */}
        <spotLight 
          position={[0, 0, 4]} 
          angle={0.6} 
          penumbra={1} 
          intensity={2.0} 
          color="#3B82F6" 
        />

        <Suspense fallback={null}>
            <CarModel isMobile={isMobile} carState={carState} />
          </Suspense>
        </Canvas>
      </WebGLErrorBoundary>
    </div>
  );
}
