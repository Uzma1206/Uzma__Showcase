export default function Vignette() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-[55]"
      style={{
        background:
          'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.55) 100%)',
      }}
    />
  );
}
