import { SectionTypes } from "./Types";

export class PrimarySection implements SectionTypes {
  title: string | null;
  text: string;
  images: string | string[];

  constructor(title: string | null, text: string, images: string | string[]) {
    this.title = title;
    this.text = text;
    this.images = images;
  }

  render() {
    return (
      <section className="primary-section">
        {this.title && <h1>{this.title}</h1>}
        <p>{this.text}</p>
        <div className="grid grid-cols-2 gap-4">
          {(Array.isArray(this.images) ? this.images : [this.images]).map(
            (img, i) => (
              <img
                key={i}
                src={img}
                alt={`Primary image ${i}`}
                className="w-full h-[200px] object-cover"
              />
            )
          )}
        </div>
      </section>
    );
  }
}
