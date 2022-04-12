const fs = require("fs");
const { readdirSync, rename } = require("fs");
const { exec } = require("child_process");

const stream = fs.createWriteStream(__dirname + `/file.txt`);
(async () => {
  const sleep2 = (timeountMS) =>
    new Promise((resolve) => {
      setTimeout(resolve, timeountMS);
    });

  const files = readdirSync(__dirname);

  files.forEach((file) => {
    const oldPath = __dirname + `/${file}`;

    // lowercasing the filename
    const newStr = file
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d")
      .replace(/Đ/g, "D")
      .replace(/[^\.^\w\s^-]/gi, "")
      .replace(/ /g, "-");
    console.log(newStr);
    const newPath = __dirname + `/${newStr}`;

    // Rename file
    rename(oldPath, newPath, (err) => console.log(err));
  });

  await sleep2(2000);
  let arr = ["concatfile-ffmpeg.js", "file.txt", "full.mp3"];
  let checkTimeVideo = true;
  const checkFileExist = (checkbt = false) => {
    let arrC = fs.readdirSync(__dirname).map(function (v) {
      if (checkbt) {
        if (!arr.includes(v)) stream.write(`file ${v}\n`);
        return v;
      }
      return {
        name: v,
        time: fs.statSync(__dirname + `\\${v}`).mtime.getTime(),
      };
    });

    if (checkbt) return arrC;
    return arrC
      .sort(function (a, b) {
        return a.time - b.time;
      })
      .filter(function (v) {
        return !arr.includes(v.name);
      })
      .map(function (v) {
        stream.write(`file ${v.name}\n`);
        return v.name;
      });
  };
  // console.table({ firstname : "John", lastname : "Doe" });
  let temp = checkFileExist(checkTimeVideo);
  console.log(temp);
  // console.table({ "arr-reject": arr });
  // console.table({ "name-file": temp });

  await sleep2(4000);
  console.log(1);
  exec(
    "ffmpeg -f concat -i file.txt -c copy -y full.mp3",
    (err, stdout, stderr) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log(stdout);
    }
  );
})();
