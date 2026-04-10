const TitleText = () => (
  <div className="max-w-3xl min-h-[260px] sm:min-h-[280px] mx-auto space-y-5 sm:space-y-6 px-2 sm:px-0">
    <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight">
      Design-Focused <span className="text-[#FF4D7D]">Frontend Developer</span>
    </h3>
    <p className="text-gray-400 text-base sm:text-lg leading-relaxed font-light">
      I bring over{" "}
      <span className="text-white font-semibold">10 years of experience</span>{" "}
      working on digital products, helping turn ideas into clean and functional
      experiences. I combine an eye for design with solid frontend development
      to build interfaces that feel simple and intuitive. I care deeply about{" "}
      <span className="italic text-white">user experience</span> and focus on
      creating products that truly make a difference.
    </p>
    <div className="flex flex-row items-center justify-center gap-6 sm:gap-8 pt-4">
      <div className="text-center">
        <p className="text-2xl font-bold text-white">10+</p>
        <p className="text-[10px] uppercase tracking-widest text-gray-500">
          Years Exp.
        </p>
      </div>
      <div className="hidden sm:block w-[1px] h-10 bg-white/10" />
      <div className="text-center">
        <p className="text-2xl font-bold text-white">3+</p>
        <p className="text-[10px] uppercase tracking-widest text-gray-500">
          Years Coding
        </p>
      </div>
    </div>
  </div>
);

export default TitleText;
