const fs = require("fs");
const path = require("path");
const url = require("url");
const { Core } = require("../core/index.ts");

module.exports = async ({ src, dest, item }) => {
    return new Promise(async (resolve, reject) => {
        try {
            await new Promise(resolve => {
                const script = document.createElement("script");
                script.src = url.pathToFileURL(path.resolve(`${__dirname}/lib/jszip.min.js`)).href;
                document.body.appendChild(script);
                script.addEventListener("load", resolve);
            });
            await new Promise(resolve => {
                const script = document.createElement("script");
                script.src = url.pathToFileURL(path.resolve(`${__dirname}/lib/jszip-utils.min.js`)).href;
                document.body.appendChild(script);
                script.addEventListener("load", resolve);
            });

            const div = document.createElement("div");
            div.id = "player";
            document.body.appendChild(div);

            const svga = new Core({
                element: "#player"
            });
            await svga.loadFile(src);

            const size = svga.getSize();
            document.body.style.width = `${size.width}px`;
            document.body.style.height = `${size.height}px`;

            svga.svgaPlayer.stepToPercentage(.5);
            await new Promise(resolve => setTimeout(resolve));

            const canvas = div.querySelector("canvas");
            const blob = await new Promise(resolve => canvas.toBlob(resolve));
            if(blob) {
                await fs.promises.writeFile(dest, Buffer.from(await blob.arrayBuffer()));
            }

            item.width = size.width;
            item.height = size.height;
            resolve(item);
        } catch (err) {
            reject(err);
        }
    });
}
