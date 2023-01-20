export interface Paintswatch {
  colors: PaintswatchColor[];
  manufacturerNames: string[];
  description?: string;
}

export interface PaintswatchColor {
  baseColorRGBCode: string;
  mediumColorRGBColor?: string;
  highColorRGBCode?: string;
}
