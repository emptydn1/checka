//Web Security & Bug Bounty Learn Penetration Testing in 2022
const path = require("path");
const fs = require("fs");
const util = require("util");
const { copyFile, rm } = require("fs/promises");

const checkFolderExist = (name, check = true) => {
    // name = name.replace(/\s/g, "-");
    let newFolder = check ? path.join(__dirname, name) : name;
    if (fs.existsSync(newFolder)) {
        name += "1";
        return checkFolderExist(name, check);
    } else {
        fs.mkdirSync(newFolder);
        return newFolder;
    }
};

const _getAllFilesFromFolder = (dir) => {
    let results = [];

    fs.readdirSync(dir).forEach((file) => {
        if (file === "node_modules") return;
        let pathNameFile = path.join(dir, file);
        const stat = fs.statSync(pathNameFile);

        if (stat && stat.isDirectory())
            results = results.concat(_getAllFilesFromFolder(pathNameFile));
        else results.push(pathNameFile);
    });
    return results;
};

const getAllFromFolder = async (dir) => {
    let regex = /^\d+/g;
    let results = [];
    fs.readdirSync(dir).sort((a, b) => a.match(regex) - b.match(regex)).forEach((file) => {
        if (file === "node_modules") return;
        let pathNameFile = path.join(dir, file);

        const stat = fs.statSync(pathNameFile);

        if (stat && stat.isDirectory()) {
            results = results.concat(_getAllFilesFromFolder(pathNameFile));
        } else {
            results.push(file);
        }
    })
    return { results };
};

const sleep2 = (timeountMS) =>
    new Promise((resolve) => {
        setTimeout(resolve, timeountMS);
    });

const replacePositionPractical = (n = 3, e, count) => {
    let i = 0;
    return e.replace(/\d+/g, (match, p1) => {
        i++;
        if (i == n) return count;
        else return match;
    });
}



(async () => {
    const rootFolder = path.join(
        __dirname,
        "Cracking Software Legally CSL"
    );
    let { results } = await getAllFromFolder(rootFolder);




    // // handle trash file
    // let trashTxtFile = results.filter((e) => /.txt$/g.test(e))
    // for (i in trashTxtFile) {
    //     await rm(trashTxtFile[i]);
    //     await sleep2(50);
    // }
    // await sleep2(5000);




    // // handle name mp4
    let regexMp4 = /((?!\\).)+$/g;
    let sourceMp4 = results.filter((e) => /.mp4$/g.test(e))
    let newNameSourceMp4 = sourceMp4.map((e, i) => e.replace(regexMp4, replacePositionPractical(1, e.match(regexMp4)[0], i + 1)))
    for (i in sourceMp4) {
        fs.renameSync(sourceMp4[i], newNameSourceMp4[i]);
    }
    console.log(newNameSourceMp4);



    // // handle extension file
    // let sourceSrt = results.filter((e) => /.srt$/g.test(e));
    // let newNameSourceSrt = sourceSrt.map((e) => e.replace(/.srt$/g, ".txt"));

    // // coppy file
    // for (i in sourceSrt) {
    //     await copyFile(sourceSrt[i], newNameSourceSrt[i]);
    //     await sleep2(50);
    // }

    // // change data
    // for (i in newNameSourceSrt) {
    //     fs.readFile(newNameSourceSrt[i], { encoding: "utf-8" }, function (err, data) {
    //         if (!err) {
    //             data = data
    //                 .replace(/\d+$/gm, "")
    //                 .replace(/.+-->.+(\r\n|\n|\r)/g, "")
    //                 .replace(/(\r\n|\n|\r)+/g, "\n\n");

    //             fs.writeFileSync(newNameSourceSrt[i], data, {
    //                 encoding: "utf8",
    //                 flag: "w",
    //             });
    //         } else {
    //             console.log(err);
    //         }
    //     });
    //     await sleep2(500);
    //     console.log(newNameSourceSrt[i]);
    // }
})();
