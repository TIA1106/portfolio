"use client";
import { cn } from "@/lib/utils";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import React, { useMemo, useRef } from "react";
import * as THREE from "three";

export const CanvasRevealEffect = ({
  animationSpeed = 0.4,
  opacities = [0.3, 0.3, 0.3, 0.5, 0.5, 0.5, 0.8, 0.8, 0.8, 1],
  colors = [[0, 255, 255]],
  containerClassName,
  dotSize,
  showGradient = true,
}) => {
  return (
    <div className={cn("h-full relative bg-white w-full", containerClassName)}>
      <div className="h-full w-full">
        {/* The Fix: DotMatrix must be wrapped in Canvas */}
        <Canvas>
          <DotMatrix
            colors={colors}
            dotSize={dotSize}
            opacities={opacities}
            shader={`
              uniform float u_time;
              uniform float u_opacities[10];
              uniform vec3 u_colors[6];
              uniform float u_total_size;
              uniform float u_dot_size;
              uniform vec2 u_resolution;
              layout(location = 0) out vec4 fragColor;
              float PHI = 1.61803398874989484820459;
              float random(vec2 xy) {
                  return fract(tan(distance(xy * PHI, xy) * 0.5) * xy.x);
              }
              void main() {
                  vec2 st = gl_FragCoord.xy;
                  float total_size = u_total_size;
                  float dot_size = u_dot_size;
                  float opacity = 0.0;
                  vec3 color = vec3(0.0);
                  
                  // Simplified shader logic for stability
                  float rand = random(st);
                  if (rand < 0.5) {
                    opacity = u_opacities[0];
                    color = u_colors[0];
                  } else {
                     opacity = u_opacities[1];
                     color = u_colors[1];
                  }

                  fragColor = vec4(color, opacity);
              }
            `}
          />
        </Canvas>
      </div>
      {showGradient && (
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950 to-[84%]" />
      )}
    </div>
  );
};

const DotMatrix = ({
  colors = [[0, 0, 0]],
  opacities = [0.04, 0.04, 0.04, 0.04, 0.04, 0.08, 0.08, 0.08, 0.08, 0.14],
  totalSize = 4,
  dotSize = 2,
  shader = "",
  center = ["x", "y"],
}) => {
  const uniforms = useMemo(() => {
    let colorsArray = [
      colors[0],
      colors[0],
      colors[0],
      colors[0],
      colors[0],
      colors[0],
    ];
    if (colors.length === 2) {
      colorsArray = [
        colors[0],
        colors[0],
        colors[0],
        colors[1],
        colors[1],
        colors[1],
      ];
    } else if (colors.length === 3) {
      colorsArray = [
        colors[0],
        colors[0],
        colors[1],
        colors[1],
        colors[2],
        colors[2],
      ];
    }

    return {
      u_colors: {
        value: colorsArray.map((c) => [c[0] / 255, c[1] / 255, c[2] / 255]),
      },
      u_opacities: {
        value: opacities,
      },
      u_total_size: {
        value: totalSize,
      },
      u_dot_size: {
        value: dotSize,
      },
    };
  }, [colors, opacities, totalSize, dotSize]);

  return (
    <ShaderMaterial
      source={`
        precision mediump float;
        in vec2 fragCoord;

        uniform float u_time;
        uniform float u_opacities[10];
        uniform vec3 u_colors[6];
        uniform float u_total_size;
        uniform float u_dot_size;
        uniform vec2 u_resolution;

        layout(location = 0) out vec4 fragColor;
        
        float random(vec2 xy) {
            return fract(sin(dot(xy, vec2(12.9898, 78.233))) * 43758.5453);
        }

        void main() {
            vec2 st = fragCoord;
            float r = random(st);
            vec3 color = u_colors[0];
            float opacity = u_opacities[0];
            
            // Basic random flickering effect
            if (r > 0.5) {
                color = u_colors[1];
                opacity = u_opacities[5];
            }

            fragColor = vec4(color, opacity);
        }
      `}
      uniforms={uniforms}
      maxFps={60}
    />
  );
};

// Simplified ShaderMaterial to avoid complex shader errors
const ShaderMaterial = ({ source, uniforms, maxFps = 60 }) => {
  const { size } = useThree();
  const ref = useRef();
  let lastFrameTime = 0;

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const timestamp = clock.getElapsedTime();
    if (timestamp - lastFrameTime < 1 / maxFps) {
      return;
    }
    lastFrameTime = timestamp;

    const material = ref.current.material;
    if (material) {
      material.uniforms.u_time.value = timestamp;
    }
  });

  const getUniforms = () => {
    const preparedUniforms = {};
    for (const uniformName in uniforms) {
      const uniform = uniforms[uniformName];
      switch (uniform.type) {
        case "uniform1f":
          preparedUniforms[uniformName] = { value: uniform.value, type: "1f" };
          break;
        case "uniform3f":
          preparedUniforms[uniformName] = {
            value: new THREE.Vector3().fromArray(uniform.value),
            type: "3f",
          };
          break;
        case "uniform1fv":
          preparedUniforms[uniformName] = { value: uniform.value, type: "1fv" };
          break;
        case "uniform3fv":
          preparedUniforms[uniformName] = {
            value: uniform.value.map((v) => new THREE.Vector3().fromArray(v)),
            type: "3fv",
          };
          break;
        case "uniform2f":
          preparedUniforms[uniformName] = {
            value: new THREE.Vector2().fromArray(uniform.value),
            type: "2f",
          };
          break;
        default:
          preparedUniforms[uniformName] = { value: uniform.value };
      }
    }

    preparedUniforms["u_time"] = { value: 0, type: "1f" };
    preparedUniforms["u_resolution"] = {
      value: new THREE.Vector2(size.width, size.height),
    };
    return preparedUniforms;
  };

  const materialUniforms = useMemo(() => getUniforms(), [size, uniforms]);

  return (
    <mesh ref={ref}>
      <planeGeometry args={[size.width, size.height]} />
      <shaderMaterial
        uniforms={materialUniforms}
        vertexShader={`
          precision mediump float;
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `}
        fragmentShader={source}
      />
    </mesh>
  );
};