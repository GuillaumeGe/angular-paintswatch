export interface Paintswatch
  extends Readonly<{
    colors: PaintswatchColor[];
    manufacturerNames: string[];
    description?: string;
  }> {}

export interface PaintswatchColor
  extends Readonly<{
    baseColorRGBCode: string;
    mediumLightColorRGBColor?: string;
    highLightColorRGBCode?: string;
  }> {}
