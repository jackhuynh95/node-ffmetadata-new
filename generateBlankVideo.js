var ffmpeg = require("fluent-ffmpeg");
var path = require("path");

const outputFilePath = 'output.mp4';
const durationInSeconds = 5;
const ffmpegPath = path.join(__dirname, "bin/ffmpeg");

ffmpeg.setFfmpegPath(ffmpegPath);

ffmpeg()
  .input('color=black:s=1280x720')
  .inputOptions('-f lavfi')
  .inputOptions(`-t ${durationInSeconds}`)
  .output(outputFilePath)
  .outputOptions('-c:v libx265')
  .on('end', () => {
    console.log('Blank video generation complete');
  })
  .run();