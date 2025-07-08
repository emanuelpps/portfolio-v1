interface MainImageProps {
  image: string;
}
export const MainImage = ({ image }: MainImageProps) => {
  return (
    <div className="relative flex items-center justify-center md:w-full w-[95vw]">
      <div className="absolute top-0 md:w-[80%] w-full md:h-40 h-20 bg-gradient-to-t from-transparent to-[#0F1724] pointer-events-none" />
      <img src={image} className="md:w-[80%] rounded-2xl md:h-full h-full" />
    </div>
  );
};
