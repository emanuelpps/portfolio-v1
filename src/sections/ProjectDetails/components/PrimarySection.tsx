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
      <section className="primary-section flex flex-col gap-10">
        <div className="flex w-full justify-center">
          <p className="w-[80%] text-white text-[0.8lh]">{this.text}</p>
        </div>
        {this.images && (
          <div className="grid grid-cols-2 gap-4 w-[80%] mx-auto">
            {this.images.map((img, i) => (
              <div
                key={i}
                className="w-full rounded-2xl overflow-hidden object-contain"
              >
                <img
                  src={img}
                  alt={`Primary image ${i}`} className="w-full h-[350px] rounded-2xl"
                />
              </div>
            ))}
          </div>
        )}
      </section>
    );
  }
}
