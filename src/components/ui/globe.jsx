import GlobeGL from "react-globe.gl";
import { feature } from "topojson-client";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

// Bengaluru, Karnataka, India — 12.9716° N, 77.5946° E
const BENGALURU = { lat: 12.9716, lng: 77.5946 };
const BENGALURU_DATA = [{ lat: BENGALURU.lat, lng: BENGALURU.lng, name: "Bengaluru, KA" }];

export function Globe({ className }) {
  const globeRef = useRef(null);
  const containerRef = useRef(null);
  const [countries, setCountries] = useState([]);
  const [size, setSize] = useState(300);
  const [ready, setReady] = useState(false);

  // Fetch world atlas GeoJSON once
  useEffect(() => {
    fetch("https://unpkg.com/world-atlas@2/countries-110m.json")
      .then((r) => r.json())
      .then((topo) => {
        setCountries(feature(topo, topo.objects.countries).features);
      })
      .catch(() => setCountries([]));
  }, []);

  // Track container width for responsive sizing
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setSize(el.offsetWidth || 300));
    ro.observe(el);
    setSize(el.offsetWidth || 300);
    return () => ro.disconnect();
  }, []);

  // Center camera directly at Bengaluru, India
  const handleGlobeReady = () => {
    if (!globeRef.current) return;
    const g = globeRef.current;
    // Position camera facing India (lat 15° N, lng 82° E)
    g.pointOfView({ lat: 15, lng: 82, altitude: 1.7 }, 0);
    const c = g.controls();
    c.autoRotate = true;
    c.autoRotateSpeed = 0.2;
    c.enableZoom = false;
    c.enablePan = false;
    setTimeout(() => setReady(true), 250);
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "absolute top-8 inset-x-0 mx-auto aspect-[1/1] w-full max-w-[450px] overflow-hidden",
        className
      )}
      style={{ opacity: ready ? 1 : 0, transition: "opacity 0.6s ease" }}
    >
      {countries.length > 0 && (
        <GlobeGL
          ref={globeRef}
          width={size}
          height={size}
          backgroundColor="rgba(0,0,0,0)"
          showAtmosphere={true}
          atmosphereColor="#8caadc"
          atmosphereAltitude={0.1}
          globeImageUrl={null}
          // Sleek subtle 3D Vector Map
          polygonsData={countries}
          polygonCapColor={() => "#789bd2"}
          polygonSideColor={() => "rgba(0, 0, 0, 0)"}
          polygonStrokeColor={() => "#a0c3f5"}
          polygonAltitude={0.005}
          // Bengaluru 3D Point Marker (glowing green 3D sphere)
          pointsData={BENGALURU_DATA}
          pointLat="lat"
          pointLng="lng"
          pointColor={() => "#22c55e"}
          pointAltitude={0.03}
          pointRadius={1.8}
          pointsMerge={false}
          // Expanding 3D Rings centered exactly on Bengaluru
          ringsData={BENGALURU_DATA}
          ringLat="lat"
          ringLng="lng"
          ringColor={() => (t) => `rgba(34,197,94,${Math.max(0, 1 - t)})`}
          ringMaxRadius={6}
          ringPropagationSpeed={2.5}
          ringRepeatPeriod={1000}
          ringAltitude={0.01}
          // Interaction
          enablePointerInteraction={false}
          onGlobeReady={handleGlobeReady}
        />
      )}
    </div>
  );
}
