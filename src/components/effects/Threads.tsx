import { useEffect, useRef, useState } from "react";
import type { HTMLAttributes } from "react";

import "./Threads.css";

const vertexShader = `
attribute vec2 position;
attribute vec2 uv;
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const createFragmentShader = (lineCount: number) => `
precision highp float;

uniform float iTime;
uniform vec3 iResolution;
uniform vec3 uColor;
uniform float uAmplitude;
uniform float uDistance;
uniform vec2 uMouse;

#define PI 3.1415926538

const int u_line_count = ${lineCount};
const float u_line_width = 7.0;
const float u_line_blur = 10.0;

float Perlin2D(vec2 P) {
    vec2 Pi = floor(P);
    vec4 Pf_Pfmin1 = P.xyxy - vec4(Pi, Pi + 1.0);
    vec4 Pt = vec4(Pi.xy, Pi.xy + 1.0);
    Pt = Pt - floor(Pt * (1.0 / 71.0)) * 71.0;
    Pt += vec2(26.0, 161.0).xyxy;
    Pt *= Pt;
    Pt = Pt.xzxz * Pt.yyww;
    vec4 hash_x = fract(Pt * (1.0 / 951.135664));
    vec4 hash_y = fract(Pt * (1.0 / 642.949883));
    vec4 grad_x = hash_x - 0.49999;
    vec4 grad_y = hash_y - 0.49999;
    vec4 grad_results = inversesqrt(grad_x * grad_x + grad_y * grad_y)
        * (grad_x * Pf_Pfmin1.xzxz + grad_y * Pf_Pfmin1.yyww);
    grad_results *= 1.4142135623730950;
    vec2 blend = Pf_Pfmin1.xy * Pf_Pfmin1.xy * Pf_Pfmin1.xy
               * (Pf_Pfmin1.xy * (Pf_Pfmin1.xy * 6.0 - 15.0) + 10.0);
    vec4 blend2 = vec4(blend, vec2(1.0 - blend));
    return dot(grad_results, blend2.zxzx * blend2.wwyy);
}

float pixel(float count, vec2 resolution) {
    return (1.0 / max(resolution.x, resolution.y)) * count;
}

float lineFn(vec2 st, float width, float perc, float offset, vec2 mouse, float time, float amplitude, float distance) {
    float split_offset = (perc * 0.4);
    float split_point = 0.1 + split_offset;

    float amplitude_normal = smoothstep(split_point, 0.7, st.x);
    float amplitude_strength = 0.5;
    float finalAmplitude = amplitude_normal * amplitude_strength
                           * amplitude * (1.0 + (mouse.y - 0.5) * 0.2);

    float time_scaled = time / 10.0 + (mouse.x - 0.5) * 1.0;
    float blur = smoothstep(split_point, split_point + 0.05, st.x) * perc;

    float xnoise = mix(
        Perlin2D(vec2(time_scaled, st.x + perc) * 2.5),
        Perlin2D(vec2(time_scaled, st.x + time_scaled) * 3.5) / 1.5,
        st.x * 0.3
    );

    float y = 0.5 + (perc - 0.5) * distance + xnoise / 2.0 * finalAmplitude;

    float line_start = smoothstep(
        y + (width / 2.0) + (u_line_blur * pixel(1.0, iResolution.xy) * blur),
        y,
        st.y
    );

    float line_end = smoothstep(
        y,
        y - (width / 2.0) - (u_line_blur * pixel(1.0, iResolution.xy) * blur),
        st.y
    );

    return clamp(
        (line_start - line_end) * (1.0 - smoothstep(0.0, 1.0, pow(perc, 0.3))),
        0.0,
        1.0
    );
}

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    vec2 uv = fragCoord / iResolution.xy;

    float line_strength = 1.0;
    for (int i = 0; i < u_line_count; i++) {
        float p = float(i) / float(u_line_count);
        line_strength *= (1.0 - lineFn(
            uv,
            u_line_width * pixel(1.0, iResolution.xy) * (1.0 - p),
            p,
            (PI * 1.0) * p,
            uMouse,
            iTime,
            uAmplitude,
            uDistance
        ));
    }

    float colorVal = 1.0 - line_strength;
    fragColor = vec4(uColor * colorVal, colorVal);
}

void main() {
    mainImage(gl_FragColor, gl_FragCoord.xy);
}
`;

type ThreadsProps = HTMLAttributes<HTMLDivElement> & {
  threadColor?: [number, number, number];
  amplitude?: number;
  distance?: number;
  enableMouseInteraction?: boolean;
};

export default function Threads({
  threadColor = [0.11, 0.11, 0.13],
  amplitude = 1,
  distance = 0,
  enableMouseInteraction = false,
  ...rest
}: ThreadsProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const animationFrameId = useRef<number | undefined>(undefined);
  const [renderMode, setRenderMode] = useState<"mobile" | "desktop" | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const isLargeScreen = window.matchMedia("(min-width: 768px)").matches;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) return;

    const start = () => setRenderMode(isLargeScreen ? "desktop" : "mobile");

    const idleWindow = window as Window & {
      requestIdleCallback?: (
        callback: IdleRequestCallback,
        options?: IdleRequestOptions,
      ) => number;
      cancelIdleCallback?: (handle: number) => void;
    };

    if (idleWindow.requestIdleCallback) {
      const idleId = idleWindow.requestIdleCallback(start, {
        timeout: isLargeScreen ? 1200 : 800,
      });
      return () => idleWindow.cancelIdleCallback?.(idleId);
    }

    const timeoutId = window.setTimeout(start, isLargeScreen ? 250 : 350);
    return () => window.clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    if (!containerRef.current || !renderMode) return;

    const container = containerRef.current;
    const isMobile = renderMode === "mobile";
    let isMounted = true;
    let isVisible = true;
    let cleanupMouseListeners: (() => void) | undefined;
    let cleanupResizeListener: (() => void) | undefined;
    let cleanupVisibilityListener: (() => void) | undefined;
    let cleanupIntersectionObserver: (() => void) | undefined;
    let rendererCanvas: HTMLCanvasElement | undefined;
    let glContext: WebGLRenderingContext | null = null;

    async function init() {
      const { Color, Mesh, Program, Renderer, Triangle } = await import("ogl");
      if (!isMounted) return;

      const renderer = new Renderer({
        alpha: true,
        dpr: isMobile ? 0.85 : Math.min(window.devicePixelRatio, 1.25),
      });
      const gl = renderer.gl;
      glContext = gl;

      gl.clearColor(0, 0, 0, 0);
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
      container.appendChild(gl.canvas);
      rendererCanvas = gl.canvas;

      const geometry = new Triangle(gl);
      const program = new Program(gl, {
        vertex: vertexShader,
        fragment: createFragmentShader(isMobile ? 22 : 40),
        uniforms: {
          iTime: { value: 0 },
          iResolution: {
            value: new Color(
              gl.canvas.width,
              gl.canvas.height,
              gl.canvas.width / gl.canvas.height,
            ),
          },
          uColor: { value: new Color(...threadColor) },
          uAmplitude: { value: isMobile ? amplitude * 0.72 : amplitude },
          uDistance: { value: isMobile ? distance * 0.82 : distance },
          uMouse: { value: new Float32Array([0.5, 0.5]) },
        },
      });

      const mesh = new Mesh(gl, { geometry, program });

      function resize() {
        const { clientWidth, clientHeight } = container;
        renderer.setSize(clientWidth, clientHeight);
        program.uniforms.iResolution.value.r = clientWidth;
        program.uniforms.iResolution.value.g = clientHeight;
        program.uniforms.iResolution.value.b = clientWidth / clientHeight;
      }

      window.addEventListener("resize", resize, { passive: true });
      cleanupResizeListener = () => window.removeEventListener("resize", resize);
      resize();

      const handleVisibilityChange = () => {
        isVisible = document.visibilityState === "visible";
      };

      document.addEventListener("visibilitychange", handleVisibilityChange);
      cleanupVisibilityListener = () =>
        document.removeEventListener("visibilitychange", handleVisibilityChange);

      const observer = new IntersectionObserver(
        ([entry]) => {
          isVisible = Boolean(entry?.isIntersecting) && document.visibilityState === "visible";
        },
        { threshold: 0.08 },
      );

      observer.observe(container);
      cleanupIntersectionObserver = () => observer.disconnect();

      let currentMouse: [number, number] = [0.5, 0.5];
      let targetMouse: [number, number] = [0.5, 0.5];

      function handleMouseMove(event: MouseEvent) {
        const rect = container.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width;
        const y = 1 - (event.clientY - rect.top) / rect.height;
        targetMouse = [x, y];
      }

      function handleMouseLeave() {
        targetMouse = [0.5, 0.5];
      }

      if (enableMouseInteraction) {
        container.addEventListener("mousemove", handleMouseMove, { passive: true });
        container.addEventListener("mouseleave", handleMouseLeave, { passive: true });
        cleanupMouseListeners = () => {
          container.removeEventListener("mousemove", handleMouseMove);
          container.removeEventListener("mouseleave", handleMouseLeave);
        };
      }

      let lastRenderTime = 0;
      const minFrameInterval = isMobile ? 1000 / 30 : 1000 / 60;

      function update(time: number) {
        if (!isMounted) return;

        animationFrameId.current = window.requestAnimationFrame(update);

        if (!isVisible) return;
        if (time - lastRenderTime < minFrameInterval) return;

        lastRenderTime = time;

        if (enableMouseInteraction) {
          const smoothing = 0.05;
          currentMouse[0] += smoothing * (targetMouse[0] - currentMouse[0]);
          currentMouse[1] += smoothing * (targetMouse[1] - currentMouse[1]);
          program.uniforms.uMouse.value[0] = currentMouse[0];
          program.uniforms.uMouse.value[1] = currentMouse[1];
        } else {
          program.uniforms.uMouse.value[0] = 0.5;
          program.uniforms.uMouse.value[1] = 0.5;
        }

        program.uniforms.iTime.value = time * 0.001;
        renderer.render({ scene: mesh });
      }

      animationFrameId.current = window.requestAnimationFrame(update);
    }

    init();

    return () => {
      isMounted = false;
      if (animationFrameId.current) window.cancelAnimationFrame(animationFrameId.current);
      cleanupResizeListener?.();
      cleanupMouseListeners?.();
      cleanupVisibilityListener?.();
      cleanupIntersectionObserver?.();

      if (rendererCanvas && container.contains(rendererCanvas)) {
        container.removeChild(rendererCanvas);
      }

      glContext?.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, [amplitude, threadColor, distance, enableMouseInteraction, renderMode]);

  return <div ref={containerRef} className="threads-container" {...rest} />;
}
