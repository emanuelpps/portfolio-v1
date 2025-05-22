interface MainImageTwoProps {
  image: string;
}

export const MainImageTwo = ({ image }: MainImageTwoProps) => {
  return (
    <div className="relative flex items-center justify-center w-full rounded-2xl overflow-hidden bg-[#0F1724]">
      <img src={image} className="w-[80%] rounded-2xl object-cover" />
      <div className="absolute bottom-0 w-[80%] h-40 bg-gradient-to-b from-transparent to-[#0F1724] pointer-events-none" />
    </div>
  );
};
