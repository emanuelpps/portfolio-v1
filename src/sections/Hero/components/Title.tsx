const Title = () => {
  return (
    <div className="text-center flex flex-col justify-center items-center gap-4 md:h-[220px] text-gray-200">
      <h4 className="font-medium text-3xl">Hello!</h4>
      <h1 className="text-3xl md:text-7xl font-normal">
        I'm <span className="text-white">Emanuel</span>,
        <br />
        <span className="font-semibold text-[#FF4D7D] text-shadow-lg">
          Frontend Developer
        </span>
      </h1>
    </div>
  );
};

export default Title;
