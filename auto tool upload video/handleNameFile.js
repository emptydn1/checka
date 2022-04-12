//Web Security & Bug Bounty Learn Penetration Testing in 2022
const path = require("path");
const fs = require("fs");
const util = require("util");
const { copyFile } = require("fs/promises");

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
    let results = [];
    // const pathNewParent = await checkFolderExist(`temp`);

    fs.readdirSync(dir).forEach((file) => {
        if (file === "node_modules") return;
        // let pathNewChild = path.join(pathNewParent, file);
        let pathNameFile = path.join(dir, file);
        const stat = fs.statSync(pathNameFile);

        if (stat && stat.isDirectory()) {
            // checkFolderExist(pathNewChild, false);
            results = results.concat(_getAllFilesFromFolder(pathNameFile));
        } else {
            results.push(file);
        }
    });
    return { results };
};
const sleep2 = (timeountMS) =>
    new Promise((resolve) => {
        setTimeout(resolve, timeountMS);
    });

(async (check = true) => {
    const rootFolder = path.join(
        __dirname,
        "React Node SocketIo Public and Private Chat App"
    );
    let { results } = await getAllFromFolder(rootFolder);
    results = check
        ? results.filter((e) => /.srt$/g.test(e))
        : results.filter((e) => /.txt$/g.test(e));
    console.log(results);

    let results2 = check
        ? results.map((e) => e.replace(/.srt$/g, ".txt"))
        : results.map((e) => e.replace(/.txt$/g, ".srt"));

    // coppy file
    for (x in results) {
        await copyFile(results[x], results[x] + "-copy");
        await sleep2(50);
    }

    // change data
    for (x in results) {
        fs.readFile(results[x], { encoding: "utf-8" }, function (err, data) {
            if (!err) {
                data = data
                    .replace(/\d+$/gm, "")
                    .replace(/.+-->.+(\r\n|\n|\r)/g, "")
                    .replace(/(\r\n|\n|\r)+/g, "\n\n");

                fs.writeFileSync(results[x], data, {
                    encoding: "utf8",
                    flag: "w",
                });
            } else {
                console.log(err);
            }
        });
        await sleep2(500);
        console.log(results[x]);
    }

    // chuyen sang txt
    for (x in results) {
        fs.renameSync(results[x], results2[x]);
    }
})();
