"use client";

import { useRef, useState } from "react";

const lyrics1 = [
  [
    { word: "Hey", start: "00.25.500", duration: 350 },
    { word: "jan", start: "00.26.00", duration: 300 },
    { word: "ghapama", start: "00.26.400", duration: 900 },
  ],
  [
    { word: "Hamov", start: "00.27.500", duration: 400 },
    { word: "hodov", start: "00.28.00", duration: 400 },
    { word: "ghapama", start: "00.28.500", duration: 900 },
  ],
  [
    { word: "Hey", start: "00.29.600", duration: 350 },
    { word: "jan", start: "00.30.100", duration: 300 },
    { word: "ghapama", start: "00.30.200", duration: 900 },
  ],
  [
    { word: "Hamov", start: "00.31.100", duration: 500 },
    { word: "hodov", start: "00.31.700", duration: 500 },
    { word: "ghapama", start: "00.32.300", duration: 800 },
  ],
  [
    { word: "Hey", start: "00.33.200", duration: 400 },
    { word: "jan", start: "00.33.700", duration: 400 },
    { word: "ghapama", start: "00.34.200", duration: 800 },
  ],
  [
    { word: "Hamov", start: "00.40.00", duration: 400 },
    { word: "hodov", start: "00.41.00", duration: 400 },
    { word: "ghapama", start: "00.42.00", duration: 400 },
  ],
  [
    { word: "Hey", start: "00.43.00", duration: 400 },
    { word: "jan", start: "00.44.00", duration: 400 },
    { word: "ghapama", start: "00.45.00", duration: 400 },
  ],
  [
    { word: "Hamov", start: "00.46.00", duration: 400 },
    { word: "hodov", start: "00.47.00", duration: 400 },
    { word: "ghapama", start: "00.48.00", duration: 400 },
  ],
];

export default function FileUploader() {
  const [audioSrc, setAudioSrc] = useState("");
  const [currentMsTotal, setCurrentMsTotal] = useState(0);
  const [intervaId, setIntervalId] = useState<any>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];

    if (file) {
      const localAudioSrc = URL.createObjectURL(file);
      setAudioSrc(localAudioSrc);
    }
  };

  const getTotalMs = (minutes: number, seconds: number, ms: number): number => {
    const msRatio = 1000;
    const totalMs: number = minutes * 60 * msRatio + seconds * msRatio + ms;

    return totalMs;
  };

  const start = () => {
    const audio = audioRef.current!;

    const id = setInterval(() => {
      const currentTime = audio.currentTime;
      const minutes = Math.floor(currentTime / 60);
      const seconds = Math.floor(currentTime % 60);
      const ms = Math.floor((currentTime % 1) * 1000);
      const totalMs = getTotalMs(minutes, seconds, ms);

      setCurrentMsTotal(totalMs);
    }, 1);

    setIntervalId(id);
  };

  return (
    <div>
      <input
        type="file"
        accept="audio/mp3,audio/*"
        onChange={handleFileChange}
      />
      {audioSrc && (
        <audio
          controls
          ref={audioRef}
          src={audioSrc}
          onPlay={start}
          onPause={() => clearInterval(intervaId)}
        >
          Your browser does not support the audio element.
        </audio>
      )}
      <div className="flex justify-center pt-6">
        <div className="w-[80%] mt-6 text-5xl text-center font-sans">
          {lyrics1.map((chunk, i) => {
            return (
              <div key={i} className="mb-2">
                {chunk.map((item, m) => {
                  const startTime = item.start.split(".");
                  const startMinutes = +startTime[0];
                  const startSeconds = +startTime[1];
                  const startMs = +startTime[2];
                  const startMsTotal = getTotalMs(
                    startMinutes,
                    startSeconds,
                    startMs
                  );

                  let className = "";
                  let style: CustomCSSProperties = {
                    "--erase-duration": `${item.duration}ms`,
                  };

                  if (startMsTotal + item.duration <= currentMsTotal) {
                    className = " text-red-500";
                  } else if (startMsTotal <= currentMsTotal) {
                    className = " text-red-500 animate-erase";
                  }

                  return (
                    <span className="relative" key={m}>
                      <span>{item.word}&nbsp;</span>
                      <span
                        style={style}
                        className={`absolute inline-flex overflow-hidden h-full left-0${className}`}
                      >
                        {item.word}
                      </span>
                    </span>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

interface CustomCSSProperties extends React.CSSProperties {
  "--erase-duration"?: string;
}
