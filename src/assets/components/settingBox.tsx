import { GrRadial, GrRadialSelected } from "react-icons/gr";
//import { getContentBoxWidth } from "../modules/useWindowDimensions";
import GridSvg, { GridSvgSettingsProps } from "./gridSvg";

type OptionType = "choice" | "button"

export interface Option {
  optionName: string;
  handleChoose: () => void;
}

export interface ChoiceSettingInputProps {
  options: Option[];
  selectedIndex: number;
}

const settingBox = (message: string, optionType: OptionType, optionInput: Option | ChoiceSettingInputProps) => {
  //const contentBoxWidth = getContentBoxWidth();
  const DividerSvg: React.FC = () => {
    const patternId = "LineDash";
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="my-1 w-full"
        //width={contentBoxWidth}
        height={2}
      >
        <defs>
          <pattern
            id={patternId}
            patternUnits="userSpaceOnUse"
            width={16}
            height={4}
          >
            <path
              d={"M 0 0 L 10 0"}
              stroke={"#ffffff"}
              strokeWidth={4}
              strokeDasharray={"8,8"}
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${patternId})`} />
      </svg>
    );
  };

  const ChoiceSettingInput: React.FC<ChoiceSettingInputProps> = (
  Props) => {
    return (
      <div className={"flex justify-center items-center"}>
        {Props.options.map((option, index) => (
          <div className={"flex flex-col w-1/3 items-center"} key={index}>
            <p className="text-black font-serif">{option.optionName}</p>
            {index === Props.selectedIndex ? (
              <GrRadialSelected
                color="#000"
                className="mb-1 cursor-pointer"
              />
            ) : (
              <GrRadial
                color="#ccc"
                className="mb-1 cursor-pointer"
                onClick={option.handleChoose}
              />
            )}
          </div>
        ))}
      </div>
    );
  };

  const ButtonSettingInput: React.FC<Option> = (inputOption: Option) => {
    const GridSvgSettings: GridSvgSettingsProps = {
        GridSize: 4,
        StrokeWidth: 1,
        Angle: 45,
        Color: "#2781b3",
        Opacity: 0.5,
        isDash: false,
      };
    return (
      <div
        className="h-10 mx-2 my-1 border-2 border-[#ffffff] bg-[#38a1de] cursor-pointer"
        onClick={inputOption.handleChoose}
      >
        <GridSvg Settings={GridSvgSettings}>
          <div className="flex items-center justify-center h-full">
            <p className="text-[#ffffff] text-2xl font-serif">
              {inputOption.optionName}
            </p>
          </div>
        </GridSvg>
      </div>
    );
  };

  return (
    <div className={`mx-[5%] overflow-hidden`}>
      <div className="flex">
        <div className="w-1/3 self-center">
          <p className="text-[#ffffff] text-2xl font-serif">{message}</p>
        </div>
        <div className="bg-[#ffffff70] w-2/3">
          {
            optionType == "choice" ?
              (<ChoiceSettingInput {...optionInput as ChoiceSettingInputProps} />)
            : optionType == "button" ?
              (<ButtonSettingInput {...optionInput as Option} />)
            : (<div />)  
        }
          
        </div>
      </div>
      <DividerSvg></DividerSvg>
    </div>
  );
};

export default settingBox;
