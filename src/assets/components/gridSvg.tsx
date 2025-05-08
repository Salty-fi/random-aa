import { ReactNode } from "react";

export interface GridSvgSettingsProps {
  GridSize: number;
  StrokeWidth: number;
  Angle: number;
  isDash: boolean;
  Color: string;
  Opacity: number;
}

export interface GridSvgProps {
  Settings: GridSvgSettingsProps;
  children?: ReactNode;
}

const GridSvg: React.FC<GridSvgProps> = (
  Props
) => {
  const patternId = `${Props.Settings.isDash ? "dashed-" : ""}grid-${Props.Settings.Angle}-${Props.Settings.Color}`;
  return (
    <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern
          id={patternId}
          patternUnits="userSpaceOnUse"
          width={Props.Settings.GridSize}
          height={Props.Settings.GridSize}
        >
          <path
            d={`M 0 ${Props.Settings.GridSize / -2} L 0 50`}
            stroke={Props.Settings.Color}
            strokeWidth={Props.Settings.StrokeWidth}
            strokeDasharray={`5,${Props.Settings.isDash ? "5" : "0"}`}
            opacity={Props.Settings.Opacity}
            transform={`rotate(${Props.Settings.Angle} ${
              Props.Settings.GridSize / 2
            } ${Props.Settings.GridSize / 2}) translate(${
              Props.Settings.GridSize / 2
            } 0)`}
          />
          <path
            d={`M ${Props.Settings.GridSize / -2} 0 L 50 0`}
            stroke={Props.Settings.Color}
            strokeWidth={Props.Settings.StrokeWidth}
            strokeDasharray={`5,${Props.Settings.isDash ? "5" : "0"}`}
            opacity={Props.Settings.Opacity}
            transform={`rotate(${Props.Settings.Angle} ${
              Props.Settings.GridSize / 2
            } ${Props.Settings.GridSize / 2}) translate(0 ${
              Props.Settings.GridSize / 2
            })`}
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${patternId})`} />
      <foreignObject
        x="0"
        y="0"
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/1999/xhtml"
      >
        <div className="w-full h-full flex justify-center">
          {Props.children}
        </div>
      </foreignObject>
    </svg>
  );
};

export default GridSvg;
