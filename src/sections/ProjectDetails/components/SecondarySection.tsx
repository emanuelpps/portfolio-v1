/* import { SectionTypes } from "./Types";

export class SecondarySection implements SectionTypes {
  text: string;
  images?: string | string[];

  constructor(text: string, images: string | string[]) {
    this.text = text;
    this.images = images;
  }

  render() {
    return (
      <section className="secondary-section">
        <p>{this.text}</p>
        <div className="grid grid-cols-2 gap-4">
          {(Array.isArray(this.images) ? this.images : [this.images]).map(
            (img, i) => (
              <img
                key={i}
                src={img}
                alt={`Secondary image ${i}`}
                className="w-full h-[200px] object-cover rounded-2xl"
              />
            )
          )}
        </div>
      </section>
    );
  }
}
 */