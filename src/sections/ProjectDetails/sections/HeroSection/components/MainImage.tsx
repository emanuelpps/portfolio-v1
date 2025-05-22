interface MainImageProps {
  image: string;
}
export const MainImage = ({ image }: MainImageProps) => {
  return (
    <div className="relative flex items-center justify-center w-full">
      <div className="absolute top-0 w-[80%] h-40 bg-gradient-to-t from-transparent to-[#0F1724] pointer-events-none" />
      <img src={image} className="w-[80%] rounded-2xl" />
    </div>
  );
};
