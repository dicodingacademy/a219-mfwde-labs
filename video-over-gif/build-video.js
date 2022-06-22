const path = require("path");
const FFmpeg = require("fluent-ffmpeg");

const gify = new FFmpeg({
  source: path.resolve(__dirname, "src/images/animation-footage.gif"),
});

gify
  .clone()
  .withVideoCodec("libx264")
  .withFps(25)
  .toFormat("mp4")
  .saveToFile(path.resolve(__dirname, "src/images/animation-footage.mp4"));

gify
  .clone()
  .withFps(25)
  .toFormat("webm")
  .saveToFile(path.resolve(__dirname, "src/images/animation-footage.webm"));
