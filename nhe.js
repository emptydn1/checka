const nhentai = require("nhentai-js");
const path = require("path");
const fs = require("fs");
const axios = require("axios");
const cheerio = require("cheerio");

// const downloadImg = async (url, g) => {
//   await axios
//     .get(encodeURI(url), {
//       responseType: "stream",
//       adapter: require("axios/lib/adapters/http"),
//     })
//     .then(async (res) => {
//       await new Promise((resolve) => {
//         res.data
//           .pipe(fs.createWriteStream(__dirname + `\\pdf\\${g}.jpg`))
//           .on("finish", () => {
//             console.log(`Download ${g}-Img Done`);
//             resolve();
//           });
//       });
//     })
//     .catch(async (err) => {
//       await new Promise((resolve) => {
//         console.log("err fpd");
//         this.#defaultIMG
//           .pipe(fs.createWriteStream(__dirname + `\\pdf\\${g}.jpg`))
//           .on("finish", () => {
//             console.log(`Download ${g}-Img Done`);
//             resolve();
//           });
//       });
//     });
// };

//check manga of author
// const a = document.querySelectorAll("#content .container .gallery a");
// let arr = [];
// for (let i = 0; i < a.length; i++) {
//   arr.push(a[i].getAttribute("href").slice(3, -1));
// }

const downloadImage = async (url, path, check) => {
  const writer = fs.createWriteStream(path);
  const response = await axios({
    url,
    method: "GET",
    responseType: "stream",
    headers: check
      ? {
          referer: "https://hentaivn.tv/",
        }
      : "",
  });

  response.data.pipe(writer);

  return new Promise((resolve, reject) => {
    writer.on("finish", resolve);
    writer.on("error", reject);
  });
};

const folderExist = (nameFolder) => {
  const folder = path.join(__dirname, `./${nameFolder}`);
  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder);
  } else {
    console.log("folder exist");
  }
};

const sleep2 = (timeountMS) =>
  new Promise((resolve) => {
    setTimeout(resolve, timeountMS);
  });

(async () => {
  // const code = 177013;

  let arrx = [
    27126, 25862, 25415, 25414, 25273, 24541, 357686, 326682, 318472, 299872,
    // 279994, 260287, 218744, 207984, 202932, 181750, 179114, 178068, 152420,
    // 150703, 115362, 110964, 104294, 90508, 89054, 89053, 86593, 85390, 80499,
    // 78399, 71377,
  ];

  try {
    for (let zx = 0; zx < arrx.length; zx++) {
      await new Promise(async (resolve) => {
        if (typeof arrx[zx] === "string") {
          const tvn = [];
          let rmUrl = arrx[zx].slice(20, -5);
          console.log(rmUrl);
          const text = await axios({ method: "get", url: arrx[zx] });
          const $ = cheerio.load(text.data);
          if ($("#image img").length) {
            $("#image img").each((c, d) => {
              tvn.push($(d).attr("src"));
            });

            folderExist(rmUrl);
            await sleep2(1000);

            for (let i = 0; i < tvn.length; i++) {
              let imgPath = path.resolve(__dirname, `${rmUrl}/${i + 1}.jpg`);
              await sleep2(500);
              downloadImage(tvn[i], imgPath, true)
                .then((_) => {
                  console.log(`Image ${i + 1} downloaded`);
                })
                .catch((_) => {
                  console.log("error");
                });
            }
            resolve("ok");
          }
        } else {
          // https://nhentai.net/artist/yamashita-kurowo/
          if (nhentai.exists(`${arrx[zx]}`)) {
            const dojin = await nhentai.getDoujin(`${arrx[zx]}`);
            console.log(arrx[zx]);
            folderExist(arrx[zx]);
            await sleep2(1000);
            for (let i = 0; i < dojin.pages.length; i++) {
              let imgPath = path.resolve(__dirname, `${arrx[zx]}/${i + 1}.jpg`);
              await sleep2(500);
              downloadImage(dojin.pages[i], imgPath, false)
                .then((_) => {
                  console.log(`Image ${i + 1} downloaded`);
                })
                .catch((_) => {
                  console.log("error");
                });
            }
          }
          resolve("ok");
        }
      });
    }
  } catch (_) {
    console.log("loi vl");
  }
})();
