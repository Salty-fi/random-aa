import { GrRadial, GrRadialSelected } from "react-icons/gr";
import GridSvg, { GridSvgSettingsProps } from "./gridSvg";

type OptionType = "choice" | "button"

export interface Option {
  optionName: string;
  handleChoose: () => void;
};

export interface ChoiceSettingInputProps {
  options: Option[];
  selectedIndex: number;
};

interface SettingBoxProps {
  message: string;
  optionType: OptionType;
  optionInput: Option | ChoiceSettingInputProps;
  boxKey: number;
  isChosenTracker?: number;
  onclick?: () => void;
};
const SettingBox: React.FC<SettingBoxProps> = ({
  message,
  optionType,
  optionInput,
  boxKey,
  isChosenTracker,
  onclick: onBoxClick
}) => {
  

  const isChosen = isChosenTracker === boxKey;

  const boxColor = isChosen ? "amber-300" : "transparent";
  const bgColor = isChosen ? "white" : "transparent";
  const textColor = isChosen ? "black" : "white";
  const tickBoxisChosenColor = isChosen ? "#38a1de" : "#eee";
  
  const DividerSvg: React.FC = () => {
    const patternId = "LineDash";
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="mt-1 w-full"
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
                stroke="#fff"
                strokeWidth={4}
                strokeDasharray={"8,8"}
              />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${patternId})`} />
      </svg>
    );
  };

  const ChoiceSettingInput: React.FC<ChoiceSettingInputProps> = (Props) => {
    return (
      <div className={"flex justify-center items-center"}>
        {Props.options.map((option, index) => (
          <div className={"flex flex-col w-1/3 items-center"} key={index}>
            <p className="text-black font-serif">{option.optionName}</p>
            {index === Props.selectedIndex ? (
              <GrRadialSelected color={tickBoxisChosenColor} className="mb-1 cursor-pointer" />
            ) : (
              <GrRadial
                color="#222"
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

  const bgClassName = "bg-" + bgColor;
  const textClassName = "ml-[10%] text-2xl font-serif z-10 text-" + textColor;
  const boxTriangleClassName = `absolute top-1/2 right-0 translate-y-[-50%] w-0 h-0 
                              border-y-[24px] border-l-[24px] 
                              border-y-transparent border-l-${boxColor} 
                             `;
  const boxRectangleClassName = `absolute left-0 top-0 h-full w-[calc(100%-24px)] bg-${boxColor}`;
  return (
    <div className={bgClassName} onClick={onBoxClick}>
      <div className="mx-[1] overflow-hidden">
        <div className="flex mt-2">
          <div className="ml-[1%] w-1/3 self-center relative h-12 flex items-center">
            {/* Text content */}
            <p className={textClassName}>{message}</p>

            {/* Triangle */}
              <div className={boxRectangleClassName} />
              <div className="absolute right-0 w-6 h-full">
                <div className={boxTriangleClassName} />
              </div>
          </div>
          <div className="mr-[2.5%] bg-[#ffffff70] w-2/3">
            {optionType == "choice" ? (
              <ChoiceSettingInput
                {...(optionInput as ChoiceSettingInputProps)}
              />
            ) : optionType == "button" ? (
              <ButtonSettingInput {...(optionInput as Option)} />
            ) : (
              <div />
            )}
          </div>
        </div>
        <div className="mx-[2.5%]">
          <DividerSvg></DividerSvg>
        </div>
      </div>
    </div>
  );
};

export default SettingBox;
