interface MainImageTwoProps {
  image: string;
}

export const MainImageTwo = ({ image }: MainImageTwoProps) => {
  return (
    <div className="flex items-center justify-center w-full">
      <img src={image} className="w-[80%] rounded-2xl" />
    </div>
  );
};
