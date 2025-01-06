#!/usr/bin/env node

const ffmpeg = require('fluent-ffmpeg');
const path = require('path');
const fs = require('fs');

function compressAndConvertToGif(inputVideoPath, outputGifPath) {
  if (!fs.existsSync(inputVideoPath)) {
    console.error('Error: Input video file does not exist!');
    process.exit(1);
  }

  ffmpeg(inputVideoPath)
    .outputOptions([
      '-vf',
      'scale=320:-1:flags=lanczos,fps=15',
      '-c:v',
      'gif',
      '-preset',
      'slow',
    ])
    .on('start', (command) => {
      console.log('FFmpeg process started:', command);
    })
    .on('error', (err) => {
      console.error('Error occurred during conversion:', err.message);
    })
    .on('end', () => {
      console.log(`GIF file created successfully: ${outputGifPath}`);
    })
    .save(outputGifPath);
}

const inputVideoPath = process.argv[2];
console.log(inputVideoPath);
if (!inputVideoPath) {
  console.error('Error: Please provide the video file path as an argument.');
  console.log('Usage: node convert-to-gif.js <video-file-path>');
  process.exit(1);
}

const inputDir = path.dirname(inputVideoPath);
const inputBaseName = path.basename(
  inputVideoPath,
  path.extname(inputVideoPath)
);
const outputGifPath = path.join(inputDir, `${inputBaseName}.gif`);


compressAndConvertToGif(inputVideoPath, outputGifPath);
