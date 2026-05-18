import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const vertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragmentShader = `
precision highp float;

uniform float uTime;
uniform vec2 uMouse;
uniform vec2 uResolution;
uniform vec3 uBaseColor;
uniform vec3 uGlowColor;
uniform float uMouseIntensity;
uniform float uNoiseScale;
uniform float uDistortionAmount;
uniform float uSmoothSpeed;

varying vec2 vUv;

vec3 mod289v3(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec2 mod289v2(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }

vec3 permute(vec3 x) { return mod289v3(((x*34.0)+1.0)*x); }

float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
  vec2 i = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1;
  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod289v2(i);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
  m = m*m; m = m*m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
  vec3 g;
  g.x = a0.x * x0.x + h.x * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

float fbm(vec2 x, int octaves) {
  float v = 0.0;
  float a = 0.5;
  vec2 shift = vec2(100.0);
  mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.5));
  for (int i = 0; i < 5; i++) {
    if (i >= octaves) break;
    v += a * snoise(x);
    x = rot * x * 2.0 + shift;
    a *= 0.5;
  }
  return v;
}

float thicknessDistortion(vec2 uv, float t) {
  float n1 = fbm(uv * 3.0 + t * 0.1, 3);
  float n2 = fbm(uv * 2.0 - t * 0.15, 3);
  return 0.5 + 0.5 * n1 * n2;
}

float lightShaft(vec2 uv, vec2 center, float width, float rotation, float t) {
  vec2 p = uv - center;
  float cosR = cos(rotation);
  float sinR = sin(rotation);
  p = vec2(p.x * cosR - p.y * sinR, p.x * sinR + p.y * cosR);
  float dist = abs(p.y);
  float w = width * thicknessDistortion(uv, t);
  float edge = smoothstep(w, 0.0, dist);
  float core = 1.0 - smoothstep(0.0, w * 0.3, dist);
  edge = max(edge * 0.6, core);
  float len = length(p);
  edge *= 1.0 - smoothstep(0.0, 0.5, len);
  float breathe = 0.7 + 0.3 * sin(t * 0.3);
  return edge * breathe;
}

void main() {
  vec2 uv = (vUv - 0.5) * uResolution / min(uResolution.x, uResolution.y);
  float t = uTime * uSmoothSpeed;

  vec2 mouseOffset = (uMouse - 0.5) * uMouseIntensity;
  vec2 center = vec2(0.0) + mouseOffset;

  float glowRadius = length(uv - center);
  float mouseGlow = exp(-glowRadius * 3.0);

  float s1 = lightShaft(uv, center + vec2(0.1, 0.0), 0.1 + mouseGlow * 0.15, 0.8 + sin(t * 0.2) * 0.1, t);
  float s2 = lightShaft(uv, center - vec2(0.05, 0.05), 0.08 + mouseGlow * 0.1, -0.5 + cos(t * 0.15) * 0.2, t * 0.9);
  float s3 = lightShaft(uv, center + vec2(-0.05, 0.08), 0.06, 0.2 + sin(t * 0.25) * 0.3, t * 1.1);

  float shafts = clamp(s1 + s2 * 0.8 + s3 * 0.5, 0.0, 1.0);

  float noiseField = fbm(uv * uNoiseScale + t * 0.05, 4);
  float distort = (snoise(uv * 2.0 + t * 0.1) - 0.5) * uDistortionAmount;
  float aurora = fbm(vec2(noiseField + distort, noiseField * 0.5) * 2.0, 3);

  float form = smoothstep(0.4, 0.6, aurora + mouseGlow * 0.3);

  vec3 finalColor = mix(uBaseColor, uGlowColor, form * 0.7 + shafts * 0.3);
  finalColor += uGlowColor * mouseGlow * 0.5;

  gl_FragColor = vec4(finalColor, form * 0.85 + shafts * 0.5);
}
`;

function GlowPlane() {
  const meshRef = useRef<THREE.Mesh>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const smoothMouseRef = useRef({ x: 0.5, y: 0.5 });
  const { viewport } = useThree();

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uResolution: { value: new THREE.Vector2(viewport.width, viewport.height) },
      uBaseColor: { value: new THREE.Color(0.05, 0.05, 0.05) },
      uGlowColor: { value: new THREE.Color(0.54, 0.11, 0.11) },
      uMouseIntensity: { value: 0.5 },
      uNoiseScale: { value: 4.0 },
      uDistortionAmount: { value: 0.3 },
      uSmoothSpeed: { value: 0.2 },
    }),
    []
  );

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX / window.innerWidth;
      mouseRef.current.y = 1.0 - e.clientY / window.innerHeight;
    };
    window.addEventListener('pointermove', handleMouseMove);
    return () => window.removeEventListener('pointermove', handleMouseMove);
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const mat = meshRef.current.material as THREE.ShaderMaterial;
    mat.uniforms.uTime.value = state.clock.elapsedTime;
    smoothMouseRef.current.x += (mouseRef.current.x - smoothMouseRef.current.x) * 0.05;
    smoothMouseRef.current.y += (mouseRef.current.y - smoothMouseRef.current.y) * 0.05;
    mat.uniforms.uMouse.value.set(smoothMouseRef.current.x, smoothMouseRef.current.y);
    mat.uniforms.uResolution.value.set(viewport.width, viewport.height);
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[viewport.width, viewport.height]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent={true}
      />
    </mesh>
  );
}

export default function TaoistGlow() {
  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
      <Canvas
        orthographic
        camera={{ zoom: 1, position: [0, 0, 5] }}
        gl={{ alpha: true, antialias: false }}
        style={{ width: '100%', height: '100%' }}
      >
        <GlowPlane />
      </Canvas>
    </div>
  );
}
