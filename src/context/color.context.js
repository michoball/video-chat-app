import { useEffect } from "react";
import { createContext, useState } from "react";

export const ColorContext = createContext({
  color: null,
  colorPicker: () => {},
});

export const COLOR_TYPE_TABLE = {
  purple: "#a52aca",
  green: "#0ABF04",
  orange: "#F28705",
  white: "#fff",
  blue: "#3958fc",
};

export const ColorProvider = ({ children }) => {
  const [color, setColor] = useState(COLOR_TYPE_TABLE.purple);

  const colorPicker = (colorValue) => {
    localStorage.setItem("Theme-color", JSON.stringify(colorValue));
    setColor(colorValue);
  };

  useEffect(() => {
    if (localStorage.getItem("Theme-color")) {
      const initialColor = JSON.parse(localStorage.getItem("Theme-color"));
      console.log(initialColor);
      setColor(initialColor);
    }
  }, []);

  const value = {
    color,
    colorPicker,
  };

  return (
    <ColorContext.Provider value={value}>{children}</ColorContext.Provider>
  );
};
