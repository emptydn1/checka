// https://www.codetd.com/en/article/7367875
const fs = require("fs");

var source = fs.readFileSync("./test.m3u8", "utf-8"); 
var arr = source.split("\n");
arr = arr.filter((item) => {
  return item.match(/\.ts$/);
});

//
//ffmpeg -i "concat:1.ts|2.ts" -acodec copy out.mp3

//ffmpeg -i "concat:1.ts|2.ts" -acodec copy -vcodec copy -absf aac_adtstoasc output.mp4

// ffmpeg -i input.txt -acodec copy -vcodec copy -absf aac_adtstoasc output.mp4

// ffconcat version 1.0
// file  0.ts
// file  1.ts

// function Down (URL) {
//     Request ({
//         URL: URL,
//         headers: {
//             '- Agent-the User': 'the Mozilla / 5.0 (the Windows NT 6.1; the WOW64) AppleWebKit /537.36 (KHTML, like the Gecko) the Chrome / 71.0.3578.98 Safari / 537.36 ',
//             ' X-Requested-With-':' the XMLHttpRequest '
//         }
//     }, function (ERR, Response, body) {
//         ! IF (ERR = && Response.StatusCode 200 is =) {
//             Load ();
//         } {the else
//             the console.log ( "error", ERR)
//         }
//     }) pipe (fs.createWriteStream (rpath));.
// }
