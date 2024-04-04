import ffmpeg from "fluent-ffmpeg";
import ffmpegPath from "@ffmpeg-installer/ffmpeg";
import fs from "fs-extra";
import path from "path";
import { videoToText, getSubtitleFile } from "./configAssemblyAI.mjs";
import { dir } from "console";

ffmpeg.setFfmpegPath(ffmpegPath.path);

function convertToaudio(file) {
  return new Promise((resolve, reject) => {
    const FileName = file.replace(".mp4", "");
    const audioUrl = `./uploads/audio/${FileName}.mp3`;
    const Filesubtitles = `./uploads/subtitles/${FileName}.vtt`;
    const __dirname = path.resolve('../../');
    const absoluteFilePath = path.join(__dirname, 'public', 'videos', file);

    ffmpeg(absoluteFilePath)
      .audioCodec("libmp3lame")
      .save(audioUrl)
      .on("end", async () => {
        const text = await videoToText(audioUrl);
        const subtitles = await getSubtitleFile(text, "vtt");
        await fs.writeFile(Filesubtitles, subtitles);
        console.log("Subtitles created");
        resolve(Filesubtitles);
      }).on("error", (err) => {
        reject(err);
      });
  });
}

export default convertToaudio;
