import {
  SettingContainer,
  ItemContainer,
  IconContainer,
  ColorCircle,
} from "./Setting.styles";
import { useContext, useState } from "react";
import { AiOutlineSetting } from "react-icons/ai";

import { ColorContext, COLOR_TYPE_TABLE } from "../../context/color.context";

function Setting() {
  const [setting, setSetting] = useState(false);
  const { colorPicker } = useContext(ColorContext);
  const toggleSettingHandler = () => {
    setSetting(!setting);
  };

  const colorChangeHandler = (color: string) => {
    colorPicker(color);
  };

  return (
    <SettingContainer>
      <IconContainer
        onClick={toggleSettingHandler}
        className={setting ? "on" : ""}
      >
        <AiOutlineSetting style={{ width: "25px", height: "25px" }} />
      </IconContainer>
      <ItemContainer className={setting ? "on" : ""}>
        <ColorCircle
          onClick={colorChangeHandler.bind(null, COLOR_TYPE_TABLE.green)}
          color={COLOR_TYPE_TABLE.green}
        />
        <ColorCircle
          onClick={colorChangeHandler.bind(null, COLOR_TYPE_TABLE.purple)}
          color={COLOR_TYPE_TABLE.purple}
        />
        <ColorCircle
          onClick={colorChangeHandler.bind(null, COLOR_TYPE_TABLE.orange)}
          color={COLOR_TYPE_TABLE.orange}
        />
        <ColorCircle
          onClick={colorChangeHandler.bind(null, COLOR_TYPE_TABLE.white)}
          color={COLOR_TYPE_TABLE.white}
        />
        <ColorCircle
          onClick={colorChangeHandler.bind(null, COLOR_TYPE_TABLE.blue)}
          color={COLOR_TYPE_TABLE.blue}
        />
      </ItemContainer>
    </SettingContainer>
  );
}

export default Setting;
