import express from "express";
import multer from "multer";
import storage from "./multerConfig.mjs";
import cors from "cors";
import convertToaudio from "./convertToaudio.mjs";
import { vttToObject } from "../convert/vttToObject.mjs";
// import path from "path";

// const __dirname = path.resolve();

const app = express();
const upload = multer({ storage: storage });
app.use(cors());

app.post("/upload", upload.single("file"), async (req, res) => {
  const vttPath = await convertToaudio(req.file.filename);
  const legendasFormatadas = await vttToObject(vttPath);
  res.send({ legendas: legendasFormatadas, filename: req.file.filename});
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
