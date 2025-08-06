export interface IImage {
  src?: string;
  alt?: string;
  srcSet?: string[];
  caption?: string | JSX.Element;
  thumbnail?: string;
  initialRotation?: number;
  initialZoom?: number;
}
