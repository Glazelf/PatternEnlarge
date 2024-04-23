const readline = require('readline');
const fs = require('fs');
const Canvas = require('canvas');

let outputFileName = "output";
let outputFileType = "png";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
// Ask for file name
rl.question('File name: ', async function (fileName) {
    let img = await Canvas.loadImage(`./${fileName}`).catch(err => {
        return console.log(err);
    });
    if (!img) return console.log("Image not found.");
    // Create canvas
    let canvas = Canvas.createCanvas(img.width * 2, img.height * 2);
    let ctx = canvas.getContext('2d');
    // Add copies of the image
    ctx.drawImage(img, 0, 0);
    ctx.drawImage(img, img.width, 0);
    ctx.drawImage(img, 0, img.height);
    ctx.drawImage(img, img.width, img.height);
    // Save the image to a file.
    const buffer = canvas.toBuffer(`image/${outputFileType}`);
    fs.writeFileSync(`./${outputFileName}.${outputFileType}`, buffer);
    return console.log(`Image saved to ${outputFileName}.${outputFileType}.`);
});
