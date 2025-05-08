interface MainImageProps {
  image: string;
}
export const MainImage = ({ image }: MainImageProps) => {
  return (
    <div className="flex items-center justify-center w-full">
      <img src={image} className="w-[80%]" />
    </div>
  );
};
