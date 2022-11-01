import { ReactNode } from "react";
import { createContext, useState, useEffect } from "react";

export type ColorCtxType = {
  color: string | null;
  colorPicker: (colorValue: string) => void;
};

export const ColorContext = createContext<ColorCtxType>({
  color: null,
  colorPicker: (colorValue: string) => {},
});

export const COLOR_TYPE_TABLE = {
  purple: "#a52aca",
  green: "#0ABF04",
  orange: "#F28705",
  white: "#fff",
  blue: "#3958fc",
};

const ColorProvider = ({ children }: { children: ReactNode }) => {
  const [color, setColor] = useState<string>(COLOR_TYPE_TABLE.blue);

  const colorPicker = (colorValue: string) => {
    localStorage.setItem("Theme-color", JSON.stringify(colorValue));
    setColor(colorValue);
  };

  useEffect(() => {
    let themeColor = localStorage.getItem("Theme-color");
    if (themeColor) {
      const initialColor = JSON.parse(themeColor);
      setColor(initialColor);
    }
  }, []);

  const value: ColorCtxType = {
    color: color,
    colorPicker: colorPicker,
  };

  return (
    <ColorContext.Provider value={value}>{children}</ColorContext.Provider>
  );
};

export default ColorProvider;
