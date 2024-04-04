"use client";

import { useState, useEffect } from "react";
// import { Video } from "./video";
import { atualizarLegendas } from "@/script/convert/ObjectToHtml.mjs";
import dynamic from "next/dynamic";
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

function InputFile() {
  const [videoPath, setVideoPath] = useState("");
  const [legendas, setLegendas] = useState("");
  const [videoSrc, setVideoSrc] = useState(videoPath);
  const [currentTime, setCurrentTime] = useState(0);

  const handleProgress = (progress) => {
    setCurrentTime(progress.playedSeconds);
  };

  useEffect(() => {
    setVideoSrc(videoPath);
  }, [videoPath]);

  const postVideo = async (file) => {
    const formData = new FormData();
    console.log(file.target.files[0]);
    console.log("aAa");
    formData.append("file", file.target.files[0]);
    try {
      // Esperar a conclusão da solicitação fetch
      const path = await fetch("http://localhost:5000/upload", {
        method: "POST",
        body: formData,
      });
      // console.log(a);
      const data = await path.json();
      // console.log(data);
      setVideoPath(data.filename);
      setLegendas(data.legendas);
      console.log(data.filename);
      console.log(data.legendas);
      console.log("Upload concluído com sucesso");
    } catch (error) {
      console.error("Erro durante o upload:", error);
    }
  };

  return (
    <div>
      <input
        type="file"
        onChange={(e) => {
          postVideo(e);
        }}
      />
      {/* videoSrc */}
      {videoSrc && (
        <div className="flex gap-3">
          <div>
            <ReactPlayer
              className="react-player"
              url={`/videos/chiclete.mp4`}
              width="100%"
              height="100%"
              controls={true}
              muted={true}
              playing={true}
              preload="auto"
              onProgress={handleProgress}
            />
            <source src={videoSrc} type="video/mp4" />
          </div>
          <div
            className="border-2 border-color4 w-80 h-24 *:font-semibold p-2 text-wrap"
            dangerouslySetInnerHTML={atualizarLegendas(legendas, currentTime)}
          >
            {/* <p>hoje o dia foi muito intenso para os miliatares</p> */}
          </div>
        </div>
      )}
    </div>
  );
}

export default InputFile;
