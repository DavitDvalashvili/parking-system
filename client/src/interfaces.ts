import { DetailedHTMLProps, HTMLAttributes } from "react";
import { type Tailwindest } from "tailwindest";

export type Props = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

export interface tailwindProps extends Props {
  size?: Tailwindest["width"] | "w-1/3";
  bg?: Tailwindest["backgroundColor"];
  color?: Tailwindest["color"];
}
