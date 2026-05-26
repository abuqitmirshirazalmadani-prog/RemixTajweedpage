"use client";

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register green light theme
const THEME_ACCENT_COLOR = 0xC8EB5F; // Premium lime green
const SECONDARY_ACCENT_COLOR = 0x059669; // Emerald green

interface HorizonCanvasProps {
  className?: string;
}

export const HorizonCanvas: React.FC<HorizonCanvasProps> = ({ className }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  
  const smoothCameraPos = useRef({ x: 0, y: 30, z: 100 });
  const [isReady, setIsReady] = useState(false);

  const threeRefs = useRef<{
    scene: THREE.Scene | null;
    camera: THREE.PerspectiveCamera | null;
    renderer: THREE.WebGLRenderer | null;
    stars: THREE.Points[];
    nebula: THREE.Mesh | null;
    mountains: THREE.Mesh[];
    animationId: number | null;
    targetCameraX?: number;
    targetCameraY?: number;
    targetCameraZ?: number;
    locations?: number[];
  }>({
    scene: null,
    camera: null,
    renderer: null,
    stars: [],
    nebula: null,
    mountains: [],
    animationId: null
  });

  useEffect(() => {
    // Dynamically check and register GSAP ScrollTrigger
    if (typeof window !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
    }

    let active = true;

    const initThree = async () => {
      const { current: refs } = threeRefs;
      if (!canvasRef.current || !active) return;

      // 1. Local typed variables to guarantee type-safety
      const scene = new THREE.Scene();
      scene.fog = new THREE.FogExp2(0x060709, 0.0003);
      refs.scene = scene;

      const width = window.innerWidth;
      const height = window.innerHeight;
      const camera = new THREE.PerspectiveCamera(70, width / height, 0.1, 2000);
      camera.position.z = 150;
      camera.position.y = 25;
      refs.camera = camera;

      const renderer = new THREE.WebGLRenderer({
        canvas: canvasRef.current,
        antialias: true,
        alpha: true,
        powerPreference: "high-performance"
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 0.6;
      refs.renderer = renderer;

      // Create Custom High-Contrast Star Fields
      const starCount = 3500;
      const starsList: THREE.Points[] = [];

      for (let i = 0; i < 3; i++) {
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(starCount * 3);
        const colors = new Float32Array(starCount * 3);
        const sizes = new Float32Array(starCount);

        for (let j = 0; j < starCount; j++) {
          const radius = i === 0 ? 100 + Math.random() * 400 : 300 + Math.random() * 700;
          const theta = Math.random() * Math.PI * 2;
          const phi = Math.acos(Math.random() * 2 - 1);

          positions[j * 3] = radius * Math.sin(phi) * Math.cos(theta);
          positions[j * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
          positions[j * 3 + 2] = radius * Math.cos(phi);

          // Color palette with luxury accents (#C8EB5F, soft white, crystal blue)
          const color = new THREE.Color();
          const p = Math.random();
          if (p < 0.45) {
            color.setHex(THEME_ACCENT_COLOR); // Premium lime gold accent
          } else if (p < 0.75) {
            color.setHex(0xFFFFFF); // Brilliant white shine
          } else {
            color.setHex(SECONDARY_ACCENT_COLOR); // Emerald cosmic background
          }

          colors[j * 3] = color.r;
          colors[j * 3 + 1] = color.g;
          colors[j * 3 + 2] = color.b;
          sizes[j] = Math.random() * 1.5 + (0.5 - i * 0.1);
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

        const material = new THREE.ShaderMaterial({
          uniforms: {
            time: { value: 0 },
            depth: { value: i }
          },
          vertexShader: `
            attribute float size;
            attribute vec3 color;
            varying vec3 vColor;
            uniform float time;
            uniform float depth;
            
            void main() {
              vColor = color;
              vec3 pos = position;
              
              // Slow elegant rotation based on camera depth
              float angle = time * 0.02 * (1.0 - depth * 0.25);
              mat2 rot = mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
              pos.xy = rot * pos.xy;
              
              vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
              gl_PointSize = size * (250.0 / -mvPosition.z) * (1.0 + sin(time * 0.8 + pos.x) * 0.15);
              gl_Position = projectionMatrix * mvPosition;
            }
          `,
          fragmentShader: `
            varying vec3 vColor;
            
            void main() {
              float dist = length(gl_PointCoord - vec2(0.5));
              if (dist > 0.5) discard;
              
              float opacity = 1.0 - smoothstep(0.0, 0.5, dist);
              gl_FragColor = vec4(vColor, opacity * 0.95);
            }
          `,
          transparent: true,
          blending: THREE.AdditiveBlending,
          depthWrite: false
        });

        const starField = new THREE.Points(geometry, material);
        scene.add(starField);
        starsList.push(starField);
      }
      refs.stars = starsList;

      // Create Custom Luxury Nebula Plane
      const nebulaGeo = new THREE.PlaneGeometry(5000, 2500, 40, 40);
      const nebulaMat = new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0 },
          color1: { value: new THREE.Color(SECONDARY_ACCENT_COLOR) },
          color2: { value: new THREE.Color(THEME_ACCENT_COLOR) },
          opacity: { value: 0.16 }
        },
        vertexShader: `
          varying vec2 vUv;
          varying float vElevation;
          uniform float time;
          
          void main() {
            vUv = uv;
            vec3 pos = position;
            float elevation = sin(pos.x * 0.012 + time * 0.6) * cos(pos.y * 0.008 + time * 0.4) * 15.0;
            pos.z += elevation;
            vElevation = elevation;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
          }
        `,
        fragmentShader: `
          uniform vec3 color1;
          uniform vec3 color2;
          uniform float opacity;
          uniform float time;
          varying vec2 vUv;
          varying float vElevation;
          
          void main() {
            float m = sin(vUv.x * 4.0 + time * 0.2) * cos(vUv.y * 4.0 + time * 0.18);
            vec3 finalColor = mix(color1, color2, m * 0.5 + 0.5);
            float alpha = opacity * (1.0 - length(vUv - 0.5) * 1.8);
            alpha *= 1.0 + vElevation * 0.008;
            gl_FragColor = vec4(finalColor, max(alpha, 0.0));
          }
        `,
        transparent: true,
        blending: THREE.AdditiveBlending,
        side: THREE.DoubleSide,
        depthWrite: false
      });

      const nebula = new THREE.Mesh(nebulaGeo, nebulaMat);
      nebula.position.z = -900;
      scene.add(nebula);
      refs.nebula = nebula;

      // Create Layered Vector Mountains (Parallax heights)
      const mountainsList: THREE.Mesh[] = [];
      const layers = [
        { distance: -60, height: 45, color: THEME_ACCENT_COLOR, opacity: 0.15 },
        { distance: -120, height: 60, color: SECONDARY_ACCENT_COLOR, opacity: 0.22 },
        { distance: -180, height: 80, color: 0x060709, opacity: 0.65 },
        { distance: -240, height: 110, color: 0x010203, opacity: 0.95 }
      ];

      const baseLocations: number[] = [];

      layers.forEach((layer, index) => {
        const points = [];
        const segments = 60;
        const widthRange = 1200;

        for (let i = 0; i <= segments; i++) {
          const x = (i / segments - 0.5) * widthRange;
          // Structured mathematical sine formula for a gorgeous landscape look
          const y = Math.sin(i * 0.18) * layer.height * 0.7 +
                    Math.cos(i * 0.08) * layer.height * 0.35 +
                    Math.sin(index + i * 0.04) * layer.height * 0.1 - 70;
          points.push(new THREE.Vector2(x, y));
        }

        // Complete poly points to cover bottom screen smoothly
        points.push(new THREE.Vector2(widthRange * 2, -500));
        points.push(new THREE.Vector2(-widthRange * 2, -500));

        const mtnShape = new THREE.Shape(points);
        const geometry = new THREE.ShapeGeometry(mtnShape);
        const material = new THREE.MeshBasicMaterial({
          color: layer.color,
          transparent: true,
          opacity: layer.opacity,
          side: THREE.DoubleSide,
          depthTest: true
        });

        const mountainMesh = new THREE.Mesh(geometry, material);
        mountainMesh.position.z = layer.distance;
        mountainMesh.position.y = layer.distance * 0.2 - 20;
        mountainMesh.userData = { baseZ: layer.distance, index };
        
        scene.add(mountainMesh);
        mountainsList.push(mountainMesh);
        baseLocations.push(layer.distance);
      });

      refs.mountains = mountainsList;
      refs.locations = baseLocations;

      // Pulse Atmosphere Glow Sphere
      const sphereGeo = new THREE.SphereGeometry(750, 40, 40);
      const sphereMat = new THREE.ShaderMaterial({
        uniforms: { time: { value: 0 } },
        vertexShader: `
          varying vec3 vNormal;
          void main() {
            vNormal = normalize(normalMatrix * normal);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          varying vec3 vNormal;
          uniform float time;
          void main() {
            float intensity = pow(0.66 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.5);
            vec3 glow = vec3(0.78, 0.92, 0.37) * intensity; // Soft yellowish lime
            float heartbeat = sin(time * 1.5) * 0.08 + 0.92;
            gl_FragColor = vec4(glow * heartbeat, intensity * 0.18);
          }
        `,
        side: THREE.BackSide,
        blending: THREE.AdditiveBlending,
        transparent: true,
        depthWrite: false
      });

      const atmosphere = new THREE.Mesh(sphereGeo, sphereMat);
      atmosphere.position.z = -950;
      scene.add(atmosphere);

      // 4. Animation loop
      let lastTime = 0;
      const animate = (now: number) => {
        if (!active) return;
        refs.animationId = requestAnimationFrame(animate);

        lastTime = now;
        const timeUniform = now * 0.001;

        // Twinkle and rotate stars
        refs.stars.forEach((starField) => {
          if (starField.material instanceof THREE.ShaderMaterial) {
            starField.material.uniforms.time.value = timeUniform;
          }
        });

        // Update nebula waves
        if (refs.nebula && refs.nebula.material instanceof THREE.ShaderMaterial) {
          refs.nebula.material.uniforms.time.value = timeUniform * 0.3;
        }

        // Atmosphere heartbeat pulse time uniform
        atmosphere.material.uniforms.time.value = timeUniform;

        // Smoothly glide camera toward targeted coords with easing controls
        if (refs.camera) {
          const targetX = refs.targetCameraX ?? 0;
          const targetY = refs.targetCameraY ?? 30;
          const targetZ = refs.targetCameraZ ?? 250;

          smoothCameraPos.current.x += (targetX - smoothCameraPos.current.x) * 0.05;
          smoothCameraPos.current.y += (targetY - smoothCameraPos.current.y) * 0.05;
          smoothCameraPos.current.z += (targetZ - smoothCameraPos.current.z) * 0.05;

          const floatX = Math.sin(timeUniform * 0.2) * 1.5;
          const floatY = Math.cos(timeUniform * 0.25) * 1.0;

          refs.camera.position.x = smoothCameraPos.current.x + floatX;
          refs.camera.position.y = smoothCameraPos.current.y + floatY;
          refs.camera.position.z = smoothCameraPos.current.z;

          // Camera always looks toward the distant holy horizon
          refs.camera.lookAt(0, -10, -500);
        }

        // Animate mountain parallax ridges
        refs.mountains.forEach((mountain, i) => {
          const mtnSpeed = 1 + i * 0.35;
          mountain.position.x = Math.sin(timeUniform * 0.15) * 1 * mtnSpeed;
        });

        if (refs.renderer && refs.scene && refs.camera) {
          refs.renderer.render(refs.scene, refs.camera);
        }
      };

      refs.animationId = requestAnimationFrame(animate);
      setIsReady(true);
    };

    initThree();

    const handleResize = () => {
      const { current: refs } = threeRefs;
      if (refs.camera && refs.renderer) {
        const width = window.innerWidth;
        const height = window.innerHeight;
        refs.camera.aspect = width / height;
        refs.camera.updateProjectionMatrix();
        refs.renderer.setSize(width, height);
      }
    };

    window.addEventListener('resize', handleResize);

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
      const maxScroll = Math.max(docHeight - windowHeight, 200);
      const progress = Math.min(scrollY / maxScroll, 1);

      const { current: refs } = threeRefs;

      // Glide through cosmic viewpoints on scroll
      const cameraCheckpoints = [
        { x: 0, y: 30, z: 250 },   // Start: immersive close horizon
        { x: 0, y: 45, z: 80 },    // Scrolling: dive deep close to mountains
        { x: 0, y: 70, z: -100 }   // Midpage: floating overview of interstellar system
      ];

      const currentSec = Math.floor(progress * (cameraCheckpoints.length - 1));
      const sectionProgress = (progress * (cameraCheckpoints.length - 1)) % 1;

      const currentPos = cameraCheckpoints[currentSec] || cameraCheckpoints[0];
      const nextPos = cameraCheckpoints[currentSec + 1] || cameraCheckpoints[cameraCheckpoints.length - 1];

      refs.targetCameraX = currentPos.x + (nextPos.x - currentPos.x) * sectionProgress;
      refs.targetCameraY = currentPos.y + (nextPos.y - currentPos.y) * sectionProgress;
      refs.targetCameraZ = currentPos.z + (nextPos.z - currentPos.z) * sectionProgress;

      // Dynamically push background mountains further or fade out
      refs.mountains.forEach((mountain, i) => {
        const speedFactor = 1.0 + i * 0.6;
        if (refs.locations) {
          const baseZ = refs.locations[i];
          const dynamicZ = baseZ + scrollY * speedFactor * 0.35;
          mountain.position.z = dynamicZ;

          // Fade out the mountains once we scroll heavily past them
          if (progress > 0.6) {
            mountain.position.y = -600; // Send deep
          } else {
            mountain.position.y = baseZ * 0.2 - 20;
          }
        }
      });
      
      if (refs.nebula) {
        refs.nebula.position.z = -900 + scrollY * 0.15;
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      active = false;
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);

      const { current: refs } = threeRefs;
      if (refs.animationId) {
        cancelAnimationFrame(refs.animationId);
      }

      // Dispose of resources safely to avoid memory leaks
      refs.stars.forEach(starField => {
        starField.geometry.dispose();
        if (starField.material instanceof THREE.Material) {
          starField.material.dispose();
        }
      });

      refs.mountains.forEach(mtn => {
        mtn.geometry.dispose();
        if (mtn.material instanceof THREE.Material) {
          mtn.material.dispose();
        }
      });

      if (refs.nebula) {
        refs.nebula.geometry.dispose();
        if (refs.nebula.material instanceof THREE.Material) {
          refs.nebula.material.dispose();
        }
      }

      if (refs.renderer) {
        refs.renderer.dispose();
      }
    };
  }, []);

  return (
    <div ref={containerRef} className={`absolute inset-0 bg-transparent min-h-screen overflow-hidden pointer-events-none z-0 ${className}`}>
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full object-cover pointer-events-none" />
    </div>
  );
};
