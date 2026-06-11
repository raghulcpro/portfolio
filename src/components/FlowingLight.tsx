import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const LuminousArcVertexShader = `
  varying vec3 vNormal;
  varying vec3 vPosition;
  void main() {
    vNormal = normal;
    vPosition = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const LuminousArcFragmentShader = `
  uniform float uTime;
  uniform vec3 uLightPos;
  uniform vec3 uColor;
  uniform float uGlowIntensity;
  varying vec3 vNormal;
  varying vec3 vPosition;
  void main() {
    vec3 worldPos = (modelMatrix * vec4(vPosition, 1.0)).xyz;
    vec3 lightVec = uLightPos - worldPos;
    float lightDist = length(lightVec);
    float distFactor = 1.0 / (1.0 + lightDist * lightDist * 0.05);
    vec3 lightDir = normalize(lightVec);
    float dotProduct = max(dot(vNormal, lightDir), 0.0);
    vec3 baseColor = mix(vec3(1.0), uColor, 0.5);
    vec3 finalColor = baseColor * dotProduct * distFactor * uGlowIntensity;
    float alpha = dotProduct * distFactor;
    gl_FragColor = vec4(finalColor, alpha);
  }
`;

interface BandConfig {
  radius: number;
  yOffset: number;
  color: number;
  glowIntensity: number;
}

const BAND_CONFIGS: BandConfig[] = [
  { radius: 8, yOffset: -2, color: 0x3b82f6, glowIntensity: 2.2 },
  { radius: 10, yOffset: 0, color: 0x22d3ee, glowIntensity: 2.0 },
  { radius: 7, yOffset: 2, color: 0x60a5fa, glowIntensity: 1.8 },
  { radius: 12, yOffset: -1, color: 0x3b82f6, glowIntensity: 1.6 },
  { radius: 9, yOffset: 1.5, color: 0x22d3ee, glowIntensity: 2.0 },
  { radius: 6, yOffset: 3, color: 0x93c5fd, glowIntensity: 1.5 },
];

class LuminousBand {
  mesh: THREE.Mesh;
  material: THREE.ShaderMaterial;
  private tubeGeometry: THREE.TubeGeometry;

  constructor(scene: THREE.Scene, index: number) {
    const config = BAND_CONFIGS[index % BAND_CONFIGS.length];
    const numPoints = 10;
    const points: THREE.Vector3[] = [];

    for (let i = 0; i < numPoints; i++) {
      const angle = (i / (numPoints - 1)) * Math.PI * 1.5 - Math.PI * 0.75;
      const x = Math.cos(angle) * config.radius;
      const z = Math.sin(angle) * config.radius;
      const y = config.yOffset + (Math.sin(angle * 2 + index) * 1.5);
      points.push(new THREE.Vector3(x, y, z));
    }

    const curve = new THREE.CatmullRomCurve3(points);
    this.tubeGeometry = new THREE.TubeGeometry(curve, 128, 0.15, 16, false);

    this.material = new THREE.ShaderMaterial({
      vertexShader: LuminousArcVertexShader,
      fragmentShader: LuminousArcFragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uLightPos: { value: new THREE.Vector3(0, 5, 0) },
        uColor: { value: new THREE.Color(config.color) },
        uGlowIntensity: { value: config.glowIntensity },
      },
      transparent: true,
      depthWrite: false,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
    });

    this.mesh = new THREE.Mesh(this.tubeGeometry, this.material);
    scene.add(this.mesh);
  }

  update(time: number, globalSpeed: number) {
    this.material.uniforms.uTime.value = time * globalSpeed;
    this.material.uniforms.uLightPos.value.set(
      Math.sin(time * 0.5 + this.mesh.id) * 10,
      6,
      Math.cos(time * 0.3 + this.mesh.id) * 10
    );
  }

  dispose() {
    this.mesh.parent?.remove(this.mesh);
    this.tubeGeometry.dispose();
    this.material.dispose();
  }
}

interface FlowingLightConfig {
  backgroundColor: number;
  globalSpeed: number;
  brightness: number;
}

class FlowingLight {
  private config: FlowingLightConfig;
  private container: HTMLElement;
  private width: number;
  private height: number;
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  private clock: THREE.Clock;
  private bands: LuminousBand[];
  private animationId: number | null = null;
  private isDisposed = false;

  constructor(container: HTMLElement, options: Partial<FlowingLightConfig> = {}) {
    this.container = container;
    this.width = window.innerWidth;
    this.height = window.innerHeight;

    this.config = {
      backgroundColor: 0x0a0e1a,
      globalSpeed: 1.0,
      brightness: 1.0,
      ...options,
    };

    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.Fog(this.config.backgroundColor, 10, 35);

    this.camera = new THREE.PerspectiveCamera(45, this.width / this.height, 0.1, 1000);
    this.camera.position.set(0, 6, 18);
    this.camera.lookAt(0, 0, 0);

    this.renderer = new THREE.WebGLRenderer({ antialias: false, alpha: false });
    this.renderer.setSize(this.width, this.height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setClearColor(this.config.backgroundColor, 1);
    this.container.appendChild(this.renderer.domElement);

    this.clock = new THREE.Clock();

    this.bands = [];
    for (let i = 0; i < 6; i++) {
      this.bands.push(new LuminousBand(this.scene, i));
    }
  }

  update() {
    if (this.isDisposed) return;
    const elapsed = this.clock.getElapsedTime();
    this.bands.forEach(band => band.update(elapsed, this.config.globalSpeed));
    this.renderer.render(this.scene, this.camera);
  }

  animate() {
    if (this.isDisposed) return;
    this.update();
    this.animationId = requestAnimationFrame(() => this.animate());
  }

  resize() {
    if (this.isDisposed) return;
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.camera.aspect = this.width / this.height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.width, this.height);
  }

  setBackgroundColor(color: number) {
    this.config.backgroundColor = color;
    this.renderer.setClearColor(color, 1);
    if (this.scene.fog) {
      (this.scene.fog as THREE.Fog).color.setHex(color);
    }
  }

  dispose() {
    this.isDisposed = true;
    if (this.animationId !== null) {
      cancelAnimationFrame(this.animationId);
    }
    this.bands.forEach(band => band.dispose());
    this.renderer.dispose();
    if (this.renderer.domElement.parentNode) {
      this.renderer.domElement.parentNode.removeChild(this.renderer.domElement);
    }
  }
}

interface FlowingLightProps {
  isLightMode: boolean;
}

export default function FlowingLightCanvas({ isLightMode }: FlowingLightProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<FlowingLight | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const bgColor = isLightMode ? 0xF0F2F7 : 0x0a0e1a;
    const scene = new FlowingLight(containerRef.current, {
      backgroundColor: bgColor,
      globalSpeed: 0.8,
      brightness: 1.0,
    });

    sceneRef.current = scene;
    scene.animate();

    const handleResize = () => scene.resize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      scene.dispose();
      sceneRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (sceneRef.current) {
      const bgColor = isLightMode ? 0xF0F2F7 : 0x0a0e1a;
      sceneRef.current.setBackgroundColor(bgColor);
    }
  }, [isLightMode]);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        overflow: 'hidden',
      }}
    />
  );
}
