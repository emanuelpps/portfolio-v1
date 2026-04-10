const Bottom = () => {
  return (
    <div className="w-full flex flex-col md:flex-row justify-between items-center gap-4  text-[10px] tracking-[0.2em] text-gray-500 uppercase">
      <div>
        © 2025 <span className="font-bold text-white">EMANUEL PAGÉS</span>
      </div>
      <div className="flex gap-2 md:gap-4">
        <span>Vite</span>
        <span className="text-[#FF4D7D]">•</span>
        <span>TypeScript</span>
        <span className="text-[#FF4D7D]">•</span>
        <span>React</span>
        <span className="text-[#FF4D7D]">•</span>
        <span>Framer Motion</span>
      </div>
      <div className="opacity-50">Rio Negro, ARG</div>
    </div>
  );
};

export default Bottom;
