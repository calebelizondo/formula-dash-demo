import { Layout } from "react-grid-layout";

//valid handles to resize widgets
export const HANDLES = ["s", "w", "e", "n", "sw", "nw", "se", "ne"];
export enum Handle {"s", "w", "e", "n", "sw", "nw", "se", "ne"};

//tie together layout and nested component
export interface WidgetProps {
    className?: string;
    onClick?: () => void;
    children?: React.ReactNode;
    style?: React.CSSProperties;
  }
  

export interface Widget {
    id: string;
    layout: Layout
    component: React.ForwardRefExoticComponent<WidgetProps & React.RefAttributes<HTMLDivElement>>
}