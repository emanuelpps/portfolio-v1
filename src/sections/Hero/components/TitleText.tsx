const TitleText = () => {
  return (
    <div className="text-center flex flex-col justify-center items-center gap-6 md:h-[220px] text-gray-200">
      <h4 className="text-3xl text-[#FF4D7D] font-bold">
        Emanuel Pagés
        <br />
        <span className="font-normal text-white">Frontend Developer</span>
      </h4>
      <p className="text-lg font-light w-[50%] leading-relaxed">
        <span className="font-semibold">I have been working as a developer for two years</span>, and I
        bring over 10 years of experience in Marketing and Digital Products.
        This background has given me a unique perspective that allows me to see
        things from both a user’s and a developer’s perspective, creating
        solutions that are not just functional but truly impactful.
      </p>
    </div>
  );
};

export default TitleText;
