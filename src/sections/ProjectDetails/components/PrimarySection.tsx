import { SectionTypes } from "./Types";

export class PrimarySection implements SectionTypes {
  text: string;
  images?: string[];

  constructor(text: string, images?: string | string[]) {
    this.text = text;
    this.images = typeof images === "string" ? [images] : images;
  }

  render() {
    return (
      <section className="flex flex-col gap-10 primary-section">
        <div className="flex justify-center w-full">
          <p className="w-[95vw] md:w-[80%] text-white text-[0.8lh]">{this.text}</p>
        </div>
        {this.images && (
          <div className="flex flex-col md:grid md:grid-cols-2 md:gap-4 gap-10 md:w-[80%] w-[95vw] mx-auto">
            {this.images.map((img, i) => (
              <div
                key={i}
                className="object-contain w-full overflow-hidden rounded-2xl"
              >
                <img
                  src={img}
                  alt={`Primary image ${i}`}
                  className="w-full h-full md:h-[350px] rounded-2xl"
                />
              </div>
            ))}
          </div>
        )}
      </section>
    );
  }
}
