import createGlobe from "cobe";
import { useMotionValue, useSpring } from "framer-motion";
import { useEffect, useMemo, useRef } from "react";
import { cn } from "@/lib/utils";

const MOVEMENT_DAMPING = 1400;

const CURRENT_LOCATION = { lat: 12.9716, lng: 77.5946 };
const GREEN = "rgb(34, 197, 94)";

// Convert longitude to initial phi angle in radians so Bengaluru faces front
const BENGALURU_PHI = (CURRENT_LOCATION.lng * Math.PI) / 180 - 0.2;

const GLOBE_CONFIG = {
  width: 800,
  height: 800,
  onRender: () => {},
  devicePixelRatio: 2,
  phi: BENGALURU_PHI,
  theta: 0.35,
  dark: 1,
  diffuse: 1.2,
  mapSamples: 16000,
  mapBrightness: 6,
  baseColor: [0.3, 0.3, 0.35],
  markerColor: [0.1, 0.8, 0.3],
  glowColor: [0.15, 0.15, 0.15],
  markers: [
    { location: [CURRENT_LOCATION.lat, CURRENT_LOCATION.lng], size: 0.08 }
  ],
};

export function Globe({
  className,
  config = GLOBE_CONFIG,
}) {
  const canvasRef = useRef(null);
  const overlayRef = useRef(null);
  const pointerInteracting = useRef(null);
  const pointerInteractionMovement = useRef(0);

  const r = useMotionValue(0);
  const rs = useSpring(r, {
    mass: 1,
    damping: 50,
    stiffness: 500,
  });

  const globeConfig = useMemo(() => ({
    ...config,
    dark: 1,
    diffuse: 1.2,
    mapBrightness: 6,
    baseColor: [0.3, 0.3, 0.35],
    markerColor: [0.1, 0.8, 0.3],
    glowColor: [0.15, 0.15, 0.15],
    markers: [
      { location: [CURRENT_LOCATION.lat, CURRENT_LOCATION.lng], size: 0.08 }
    ],
  }), [config]);

  const updatePointerInteraction = (value) => {
    pointerInteracting.current = value;
  };

  const updateMovement = (clientX) => {
    if (pointerInteracting.current !== null) {
      const delta = clientX - pointerInteracting.current;
      pointerInteractionMovement.current = delta;
      r.set(r.get() + delta / MOVEMENT_DAMPING);
    }
  };

  useEffect(() => {
    let phi = BENGALURU_PHI;
    let width = canvasRef.current?.offsetWidth || 400;
    let currentPhi = BENGALURU_PHI;
    let overlayAnimId = 0;
    const theta = globeConfig.theta ?? 0.35;

    const onResize = () => {
      if (canvasRef.current) {
        width = canvasRef.current.offsetWidth || 400;
      }
    };

    window.addEventListener("resize", onResize);
    onResize();

    const globe = createGlobe(canvasRef.current, {
      ...globeConfig,
      width: width * 2,
      height: width * 2,
      onRender: (state) => {
        if (!pointerInteracting.current) phi += 0.003;
        const currentWidth = canvasRef.current?.offsetWidth || width || 400;
        width = currentWidth;
        state.phi = phi + rs.get();
        state.width = currentWidth * 2;
        state.height = currentWidth * 2;
        currentPhi = state.phi;
      },
    });

    setTimeout(() => {
      if (canvasRef.current) {
        canvasRef.current.style.opacity = "1";
      }
    }, 0);

    const toVec = (lat, lng) => {
      const latR = (lat * Math.PI) / 180;
      const lngR = (lng * Math.PI) / 180;
      const cosLat = Math.cos(latR);
      return {
        x: cosLat * Math.cos(lngR),
        y: Math.sin(latR),
        z: -cosLat * Math.sin(lngR),
      };
    };

    const project = (p, phiRot) => {
      const cosP = Math.cos(phiRot);
      const sinP = Math.sin(phiRot);
      const cosT = Math.cos(theta);
      const sinT = Math.sin(theta);
      const x1 = cosP * p.x + sinP * p.z;
      const y1 = p.y;
      const z1 = -sinP * p.x + cosP * p.z;
      return {
        x: x1,
        y: cosT * y1 - sinT * z1,
        z: sinT * y1 + cosT * z1,
      };
    };

    const drawOverlay = () => {
      const overlay = overlayRef.current;
      if (!overlay || width === 0) {
        overlayAnimId = requestAnimationFrame(drawOverlay);
        return;
      }
      const ctx = overlay.getContext("2d");
      if (!ctx) return;

      const dpr = 2;
      const W = width;
      if (overlay.width !== W * dpr) {
        overlay.width = W * dpr;
        overlay.height = W * dpr;
      }

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, W);

      const cx = W / 2;
      const cy = W / 2;
      const radius = (W / 2) * 0.8;

      const drawDot = (lat, lng, color) => {
        const pr = project(toVec(lat, lng), currentPhi);
        if (pr.z < -0.02) return;
        const sx = cx + pr.x * radius;
        const sy = cy - pr.y * radius;
        const zAlpha = Math.max(0.25, Math.min(1, pr.z + 0.4));

        const glow = ctx.createRadialGradient(sx, sy, 0, sx, sy, 14);
        glow.addColorStop(0, color);
        glow.addColorStop(1, "rgba(0,0,0,0)");
        ctx.globalAlpha = zAlpha * 0.65;
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(sx, sy, 14, 0, Math.PI * 2);
        ctx.fill();

        ctx.globalAlpha = zAlpha;
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(sx, sy, 4.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      };

      drawDot(CURRENT_LOCATION.lat, CURRENT_LOCATION.lng, GREEN);

      overlayAnimId = requestAnimationFrame(drawOverlay);
    };

    overlayAnimId = requestAnimationFrame(drawOverlay);

    return () => {
      cancelAnimationFrame(overlayAnimId);
      if (globe) globe.destroy();
      window.removeEventListener("resize", onResize);
    };
  }, [rs, globeConfig]);

  return (
    <div
      className={cn(
        "absolute inset-0 mt-8 mx-auto aspect-[1/1] w-full max-w-[450px]",
        className
      )}
    >
      <canvas
        className={cn(
          "size-full opacity-0 transition-opacity duration-500 [contain:layout_paint_size]"
        )}
        ref={canvasRef}
        onPointerDown={(e) =>
          updatePointerInteraction(
            e.clientX - pointerInteractionMovement.current
          )
        }
        onPointerUp={() => updatePointerInteraction(null)}
        onPointerOut={() => updatePointerInteraction(null)}
        onMouseMove={(e) => updateMovement(e.clientX)}
        onTouchMove={(e) =>
          e.touches[0] && updateMovement(e.touches[0].clientX)
        }
      />
      <canvas
        ref={overlayRef}
        className="pointer-events-none absolute inset-0 size-full"
      />
    </div>
  );
}
