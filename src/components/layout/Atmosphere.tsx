/** Fixed ambient background: soft accent/blue glows + a faint editorial grid. */
export function Atmosphere() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="absolute -left-40 top-[-10%] h-[40rem] w-[40rem] rounded-full bg-[color:var(--accent-soft)] blur-[140px]" />
      <div className="absolute -right-40 top-[40%] h-[36rem] w-[36rem] rounded-full bg-blue-500/10 blur-[150px]" />
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(var(--line) 1px, transparent 1px), linear-gradient(90deg, var(--line) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />
    </div>
  );
}
