import "./App.css";
import { useEffect, useState } from "react";
import GridSvg, { GridSvgSettingsProps } from "./assets/components/gridSvg";
import settingBox, { ChoiceSettingInputProps, Option } from "./assets/components/settingBox";

function App() {
  function useOrientation() {
    const getOrientation = () => {
      if (window.screen.orientation) {
        return window.screen.orientation.type.includes("portrait")
          ? "portrait"
          : "landscape";
      }
      // Fallback (older iOS)
      return window.innerHeight > window.innerWidth ? "portrait" : "landscape";
    };

    const [orientation, setOrientation] = useState(getOrientation());

    useEffect(() => {
      const handleChange = () => {
        setOrientation(getOrientation());
      };

      window.addEventListener("resize", handleChange); // works in most modern devices
      window.addEventListener("orientationchange", handleChange); // fallback

      const timeout = setTimeout(handleChange, 100);

      return () => {
        window.removeEventListener("resize", handleChange);
        window.removeEventListener("orientationchange", handleChange);
        clearTimeout(timeout);
      };
    }, []);

    return orientation;
  };
  const orientation = useOrientation();

  const GridSvgSettingsBg: GridSvgSettingsProps = {
    GridSize: 40,
    StrokeWidth: 2,
    Angle: 0,
    Color: "#ffffff",
    Opacity: 1,
    isDash: true,
  };
  const GridSvgSettingsContent: GridSvgSettingsProps = {
    GridSize: 4,
    StrokeWidth: 1,
    Angle: 45,
    Color: "#2781b3",
    Opacity: 0.5,
    isDash: false,
  };
  const GridSvgSettingsNarrator: GridSvgSettingsProps = {
    GridSize: 4,
    StrokeWidth: 1,
    Angle: 45,
    Color: "#000000",
    Opacity: 0.5,
    isDash: false,
  };

  const [isReverse, setIsReverse] = useState<boolean>(false);
  const reverseOption: ChoiceSettingInputProps = {
    options: [
      {
        optionName: "Off",
        handleChoose: () => {
          setIsReverse(false);
        },
      },
      {
        optionName: "On",
        handleChoose: () => {
          setIsReverse(true);
        },
      },
    ],
    selectedIndex: +isReverse,
  };

  const [slowDownRate, setSlowDownRate] = useState<number>(1);
  const [selectedslowDownOption, setSelectedSlowDownOption] = useState<number>(2);
  const slowDownOption: ChoiceSettingInputProps = {
    options: [
      {
        optionName: "25%",
        handleChoose: () => {
          setSelectedSlowDownOption(0);
          setSlowDownRate(0.25);
        },
      },
      {
        optionName: "50%",
        handleChoose: () => {
          setSelectedSlowDownOption(1);
          setSlowDownRate(0.5);
        },
      },
      {
        optionName: "Normal",
        handleChoose: () => {
          setSelectedSlowDownOption(2);
          setSlowDownRate(1);
        },
      },
    ],
    selectedIndex: selectedslowDownOption,
  };

  const holdItAudio = new Audio("/audios/PW-HoldIt.mp3");
  const holdItAudioReversed = new Audio("/audios/PW-HoldIt-RV.mp3");
  function handlePlayAudio(audio: HTMLAudioElement) {
    audio.playbackRate = slowDownRate;
    audio.currentTime = isReverse ? 0.75 : 0; //removes the noise that comes before the reversed line
    audio.play();
  };
  const holdItButtonOption: Option = {
    optionName: "HOLD IT!",
    handleChoose: () => {
      handlePlayAudio(isReverse ? holdItAudioReversed : holdItAudio);
    },
  };

  return (
    <div>
      {orientation === "portrait" ? (
        /* PORTRAIT MODE */

        <div className="relative w-screen h-screen bg-[#226DB7FE] flex items-center justify-center">
          {/* Centered text */}
          <p className="text-white text-2xl font-sarabun text-center">
            {"กรุณาวางจอเป็นแนวนอน"}
          </p>

          {/* Background-sticky */}
          <img
            alt="naruhodo"
            src="/images/naruhodo.png"
            className="absolute bottom-0 left-[2%] w-[37%] h-auto"
          />
          <img
            alt="mayoi"
            src="/images/mayoi.png"
            className="absolute bottom-0 w-[25%] h-auto"
          />
          <img
            alt="mitsurugi"
            src="/images/mitsurugi.png"
            className="absolute bottom-0 right-[2%] w-[35%] h-auto"
          />
          <div className="absolute top-[2%] right-[2%] text-white text-sm font-sarabun text-right">
            <p>{"Website นี้จัดทำโดย เชฟเกลือ"}</p>
            <p>{"เพื่อความบันเทิงเท่านั้น"}</p>
            <p>{"Discord: saltyOwO"}</p>
            <a
              href="https://github.com/Salty-fi/random-aa"
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-blue-300 hover:text-blue-400"
            >
              {"Source Code (GitHub)"}
            </a>
            <p>{"และขอขอบคุณ"}</p>
            <p>{"Fanarts น่ารัก ๆ โดยคุณ Miso"}</p>
            <a
              href="https://x.com/Miso_28_?t=pxbFuHT4uGVahalW65SlRw"
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-blue-300 hover:text-blue-400"
            >
              {"X (Twitter)"}
            </a>
          </div>
        </div>
      ) : (
        /* LANDSCAPE MODE */

        <div className="fixed top-0 left-0 w-screen h-screen bg-[url('/images/courtroom.png')] bg-no-repeat bg-cover -z-10 filter bg-[center_20%]">
          <GridSvg Settings={GridSvgSettingsBg}>
            <div className="bg-[#000000b0] flex-col justify-center items-center h-screen w-screen">
              <div className={`flex h-3/4 justify-center items-center`}>
                <div
                  className={`bg-[#38a1de] border-4 border-white w-3/4 h-50 justify-self-center filter brightness-125 overflow-hidden`}
                >
                  <GridSvg Settings={GridSvgSettingsContent}>
                    <div className="my-[2%] w-full">
                      {settingBox("Reverse", "choice", reverseOption)}
                      {settingBox("Slow Down", "choice", slowDownOption)}
                      {settingBox("Ready?", "button", holdItButtonOption)}
                    </div>
                  </GridSvg>
                </div>
              </div>
              <div className="h-1/4">
                <div
                  className={`bg-[#181f33] border-t-2 border-b-4 border-white h-7/8`}
                >
                  <GridSvg Settings={GridSvgSettingsNarrator}>
                    <div className="bx-2 pt-2 w-full">
                      <p className=" text-white text-xl font-serif break-words w-full text-center">
                        <span className="font-sarabun">
                          {"รู้หรือไม่: หากคุณนำเสียง"}
                        </span>
                        <span className="text-red-600">{" HOLD IT!"}</span>
                        <span className="font-sarabun">{" ของ"}</span>
                        {" Phoenix Wright"}
                        <span className="font-sarabun">{" มา"}</span>
                        <span className="text-red-600">{" Reverse"}</span>
                        <span className="font-sarabun">
                          {" คุณจะได้ยินเขากำลังด่าว่า"}
                        </span>
                        {' "'}
                        <span className="text-red-600 font-sarabun">
                          {"เอ็งโง่"}
                        </span>
                        <span className="text-red-600">{"!"}</span>
                        {'"'}
                      </p>
                      <p className=" text-green-600 text-xl font-serif break-words w-full text-center">
                        <span className="font-sarabun">{"ลองปรับ"}</span>
                        <span className="text-red-600">{" Slow Down"}</span>
                        <span className=" font-sarabun">
                          {" เพื่อให้ฟังได้ชัด ๆ"}
                        </span>
                      </p>
                    </div>
                  </GridSvg>
                </div>
              </div>
            </div>
          </GridSvg>
        </div>
      )}
    </div>
  );
}

export default App;
