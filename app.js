var ffmpeg = require("fluent-ffmpeg");
var path = require("path");

const sourceFilePath = path.join(__dirname, "source/test.mp4");
const ffprobePath = path.join(__dirname, "bin/ffprobe.exe");

ffmpeg.setFfprobePath(ffprobePath);
ffmpeg.ffprobe(sourceFilePath, function (err, metadata) {
  if (err) {
    console.log(err);
  } else {
    const streams = metadata.streams;
    const streamVideo = streams.find((stream) => stream.codec_type == "video");
    const allowed = [
      "width",
      "height",
      "display_aspect_ratio",
      "avg_frame_rate",
      "nb_frames",
      "duration",
    ];
    const filtered =  (raw) => Object.keys(raw)
      .filter((key) => allowed.includes(key))
      .reduce((obj, key) => {
        obj[key] = raw[key];
        return obj;
      }, {});
    const metadataVideo = filtered(streamVideo);

    console.log("metadata-video", metadataVideo);
  }
});
