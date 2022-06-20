import {
  SettingContainer,
  ItemContainer,
  IconContainer,
  ColorCircle,
} from "./Setting.styles";
import { useState } from "react";
import { AiOutlineSetting } from "react-icons/ai";
import { BsCircleFill } from "react-icons/bs";
import { BiEdit } from "react-icons/bi";

function Setting() {
  const [setting, setSetting] = useState(false);

  const toggleSettingHandler = () => {
    setSetting(!setting);
  };

  return (
    <SettingContainer onClick={toggleSettingHandler}>
      <IconContainer className={setting ? "on" : ""}>
        <AiOutlineSetting style={{ width: "25px", height: "25px" }} />
      </IconContainer>
      <ItemContainer className={setting ? "on" : ""}>
        <ColorCircle color={"#0ABF04"} />
        <ColorCircle color={"#a52aca"} />
        <ColorCircle color={"#F28705"} />
        <BiEdit
          style={{
            marginLeft: "10px",
          }}
        />
      </ItemContainer>
    </SettingContainer>
  );
}

export default Setting;
