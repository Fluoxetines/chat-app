import { InputSelectIcon } from "./CustomIcon";

export default function Select() {
  return {
    MuiSelect: {
      defaultProps: {
        IconComponent: InputSelectIcon,
      },
    },
  };
}
