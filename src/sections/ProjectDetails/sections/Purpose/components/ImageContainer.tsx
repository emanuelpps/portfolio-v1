interface ImageProps {
  images: string[];
}

export const ImageContainer = ({ images }: ImageProps) => {
  return (
    <div className="grid grid-cols-2 gap-4 w-[80%] mx-auto">
      {images.slice(0, 4).map((image, i) => (
        <div key={i} className="w-full h-[200px] overflow-hidden">
          <img
            src={image}
            alt={`Imagen ${i}`}
            className="w-full h-full object-cover"
          />
        </div>
      ))}
    </div>
  );
};
