const path = require("path");
const fs = require("fs");
const { exec } = require("child_process");

const checkFolder = (x, pathFolder = path.join(__dirname, "public")) => {
  let tete = x;
  if (fs.existsSync(`${pathFolder}/${tete}`)) {
    tete += "1";
    return checkFolder(tete);
  } else {
    fs.mkdirSync(`${pathFolder}/${tete}`);
    return `${pathFolder}/${tete}`;
  }
};

const _getAllFilesFromFolder = function (dir, deco = "/") {
  let results = [];

  fs.readdirSync(dir).forEach(function (file) {
    if (file === "node_modules") return;
    file = dir + deco + file;
    const stat = fs.statSync(file);

    if (stat && stat.isDirectory()) {
      results = results.concat(_getAllFilesFromFolder(file));
    } else results.push(file);
  });
  return results;
};

const getAllFromFolder = async (dir, deco = "/") => {
  let results = [];
  const pathnewfolder = await checkFolder(`temp`);

  fs.readdirSync(dir).forEach((file) => {
    if (file === "node_modules") return;
    let tempFile = file;
    file = dir + deco + file;

    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      checkFolder(tempFile, pathnewfolder);
      results = results.concat(_getAllFilesFromFolder(file));
    } else {
      results.push(file);
    }
  });
  return { results, pathnewfolder };
};

(async () => {
  const pathFolder = path.join(__dirname, "abc");
  const value = await getAllFromFolder(pathFolder);
  const { results, pathnewfolder } = value;
  let count = 1;
  let checkEx = "srt";
  //   let r2 = results.map((e) => {
  //     return e.replace(/.mp4|.srt/, "");
  //   });
  // if(req.query)

  fs.readdirSync(pathnewfolder).forEach((file) => {
    if (file === "node_modules") return;
    let tpFile = file;
    file = pathnewfolder + "/" + file;

    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      let tenFolder = file;

      // let tempResu = results.map((e) => {
      //   let temm1 = e.replace(/(?<=\/)[^\/]+$/g, "");
      //   return (
      //     temm1 +
      //     e
      // .match(/(?<=\/)[^\/]+$/g)[0]
      // .replace(/.mp4|.srt|.vtt/, "")
      // .normalize("NFD")
      // .replace(/[\u0300-\u036f]/g, "")
      // .replace(/đ/g, "d")
      // .replace(/Đ/g, "D")
      // .replace(/[^\.^\w\s^-]/gi, "")
      // .replace(/[. ]/g, "-")
      // .replace(/\n/g, "")
      //   );
      // });

      results.find((e, index) => {
        if (e.includes(tpFile) && e.includes(".mp4")) {
          e = e.replace(/.mp4|.srt|.vtt/, "");
          let temm1 = e
            .replace(/.mp4|.srt|.vtt/, "")
            .match(/(?<=\/)[^\/]+$/g)[0]
            .replace(/.mp4|.srt|.vtt/, "")
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/đ/g, "d")
            .replace(/Đ/g, "D")
            .replace(/[^\.^\w\s^-]/gi, "")
            .replace(/[. ]/g, "-")
            .replace(/\n/g, "");

          if (checkEx === "srt") {
            exec(
              `ffmpeg -nostdin -i "${e}.mp4" -f srt -i "${e}.srt" -c:v copy -c:a copy -c:s mov_text "${
                tenFolder + "/" + temm1
              }.mp4"`,
              async (err, stdout, stderr) => {
                if (err) console.error(err);
                console.log("ok");
              }
            );
          } else if (checkEx === "vtt") {
            exec(
              `ffmpeg -nostdin -i "${e}.mp4" -i "${e}.vtt" -map 0:v -map 0:a -map 1 -metadata:s:s:0 language=eng -c:v copy -c:a copy -c:s srt "${
                tenFolder + "/" + count
              }.mkv"`,
              async (err, stdout, stderr) => {
                if (err) console.error(err);
                console.log("ok");
              }
            );
          }
          count++;
        }
      });
    }
  });
})();
