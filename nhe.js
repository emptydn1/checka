const nhentai = require("nhentai-js");
const path = require("path");
const fs = require("fs");
const axios = require("axios");

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

const downloadImage = async (url, path) => {
  const writer = fs.createWriteStream(path);
  const response = await axios({
    url,
    method: "GET",
    responseType: "stream",
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

  // const code = 348212;
  // const code = 343413;
  // const code = 342544;
  // const code = 340997;
  // const code = 337797;
  // const code = 335976;
  // const code = 331625;
  // const code = 331208;
  // const code = 327847;
  // const code = 322845;
  // const code = 312100;
  // const code = 310688;
  // const code = 307711;
  // const code = 302103;
  // const code = 301713;
  // const code = 301575;
  // const code = 297061;
  // const code = 290440;
  // const code = 290358;
  // const code = 290167;
  // const code = 289954;
  // const code = 288705;
  // const code = 285906;
  // const code = 284499;
  // const code = 282589;
  // const code = 278018;
  // const code = 276074;
  // const code = 272090;
  // const code = 268989;
  // const code = 268970;
  // const code = 268580;
  // const code = 261680;
  // const code = 258254;
  // const code = 251468;
  // const code = 251011;
  // const code = 250823;
  // const code = 244880;
  // const code = 243520;
  // const code = 241328;
  // const code = 231231;
  // const code = 231105;
  // const code = 230891;
  // const code = 228738;
  // const code = 227964;
  // const code = 224758;
  // const code = 224680;
  // const code = 218107;
  // const code = 211890;
  // const code = 206954;
  // const code = 206314;
  // const code = 192711;
  // const code = 182604;
  // const code = 182603;
  // const code = 182570;
  // const code = 182569;
  // const code = 177269;
  // const code = 177238;
  // const code = 177237;
  // const code = 149832;
  // const code = 147326;
  // const code = 147325;
  // const code = 146987;
  // const code = 122551;
  // const code = 120914;
  // const code = 119044;
  // const code = 97933;
  // const code = 90798;

  // const code = 309824;
  // const code = 310202;
  // const code = 317511;
  // const code = 318435;
  // const code = 318352;
  // const code = 319214;
  // const code = 319550;
  // const code = 320700;

  // const code = 323741;
  // const code = 328264;
  // const code = 328071;
  // const code = 328919;
  // const code = 97980;
  // const code = 113759;
  // const code = 122792;
  // const code = 143982;
  // const code = 173529;
  // const code = 123866;



  // https://nhentai.net/artist/yamashita-kurowo/
  if (nhentai.exists(`${code}`)) {
    const dojin = await nhentai.getDoujin(`${code}`);
    folderExist(code);
    await sleep2(1000);
    for (let i = 0; i < dojin.pages.length; i++) {
      let imgPath = path.resolve(__dirname, `${code}/${i + 1}.jpg`);

      await sleep2(500);
      downloadImage(dojin.pages[i], imgPath)
        .then((_) => {
          console.log(`Image ${i + 1} downloaded`);
        })
        .catch((_) => {
          console.log("error");
        });
    }
  }
})();
