const TitleText = () => (
  <div className="max-w-3xl mx-auto space-y-6">
    <h3 className="text-3xl md:text-4xl font-bold text-white">
      Design-Driven <span className="text-[#FF4D7D]">Frontend Developer</span>
    </h3>
    <p className="text-gray-400 text-lg leading-relaxed font-light">
      I bring over{" "}
      <span className="text-white font-semibold">10 years of experience</span>{" "}
      in Digital Products. My unique background allows me to bridge the gap
      between complex code and impactful user experiences. I don't just build
      functions; I build <span className="italic text-white">impact</span>.
    </p>
    <div className="flex justify-center gap-8 pt-4">
      <div className="text-center">
        <p className="text-2xl font-bold text-white">10+</p>
        <p className="text-[10px] uppercase tracking-widest text-gray-500">
          Years Exp.
        </p>
      </div>
      <div className="w-[1px] h-10 bg-white/10" />
      <div className="text-center">
        <p className="text-2xl font-bold text-white">20+</p>
        <p className="text-[10px] uppercase tracking-widest text-gray-500">
          Projects
        </p>
      </div>
    </div>
  </div>
);

export default TitleText;
