interface MainImageTwoProps {
  image: string;
  type: string;
}

export const MainImageTwo = ({ image, type }: MainImageTwoProps) => {
  return (
    <div className="relative flex items-center justify-center md:w-full w-[95vw] mt-2 rounded-2xl overflow-hidden bg-[#0F1724] ">
      <img
        src={image}
        className={
          type === "Project"
            ? "md:w-[90%] w-[95vw] rounded-2xl h-full"
            : "md:w-[50%] w-[95vw] object-contain rounded-2xl"
        }
        alt="Main visual"
      />
      <div
        className={`pointer-events-none ${
          type === "Project"
            ? "absolute bottom-0 md:w-[90%] w-full md:h-40 h-20 bg-gradient-to-b from-transparent to-[#0F1724]"
            : ""
        }`}
      />
    </div>
  );
};
