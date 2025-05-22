import { SectionTypes } from "./Types";

export class PrimarySection implements SectionTypes {
  text: string;
  images: string | string[];

  constructor(text: string, images: string | string[]) {
    this.text = text;
    this.images = images;
  }

  render() {
    return (
      <section className="primary-section flex flex-col gap-10">
        <div className="flex w-full justify-center">
          <p className="w-[80%] text-white text-[0.8lh]">{this.text}</p>
        </div>
        <div className="grid grid-cols-2 gap-4 w-[80%] mx-auto">
          {(Array.isArray(this.images) ? this.images : [this.images]).map(
            (img, i) => (
              <div className="w-full rounded-2xl overflow-hidden">
                <img
                  key={i}
                  src={img}
                  alt={`Primary image ${i}`}
                  className="w-full h-[320px] object-co"
                />
              </div>
            )
          )}
        </div>
      </section>
    );
  }
}
