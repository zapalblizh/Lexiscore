import nodeHtmlToImage from "node-html-to-image";
import chalk from "chalk";

console.log(chalk.blue("Generating OG images..."));
console.log(chalk.blue("Please wait..."));

const htmlTemplate = `
<html lang="en" style="width: 1200px; height: 630px;">
<head>
    <meta charset="UTF-8">
    <meta name="robots" content="noindex,nofollow">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>{{title}}</title>
    <style>
        .bg-color {
            background: linear-gradient(270deg, #80454E 0%, #6A1F2B 100%);
        }
        
        h1 {
            display: -webkit-box;
            text-wrap: pretty;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 3;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        
        h1 span {
            display: block;
            white-space: nowrap !important;
        }
        
        .logo {
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 100px;
          line-height: 0;
          width: 200px;
          height: 200px;
          margin: -30px 0 0 -30px;
        }
        .logo img {
            filter: drop-shadow(0 0 0.35rem rgba(0,0,0,0.7));
        }
    
        .shadow {
            text-shadow: 0 0 10px rgba(0,0,0,0.5);
        }
        
        .img-shadow {
            box-shadow: 0 0 10px rgba(0,0,0,0.5);
        }
    </style>
</head>
<body style="width: 1200px; height: 630px; padding: 0; margin: 0; font-family: sans-serif">
    <div class="card bg-color" style="width: 1200px; height: 630px; box-sizing: border-box; color: #fff; padding: 70px 70px">
        <div class="logo">
            <img src="https://lexiscore.netlify.app/public/img/lexiscore-logo.png" alt="Lexiscore Logo" style="width: 100%; height: 100%" />
        </div>
        <h1 class="shadow" style="font-size: 72px; font-weight: 700; margin: 20px 0 10px 40px;">Lexiscore - Scrabble Companion</h1>
        <p class="shadow" style="margin: 20px 0 0 40px; font-size: 24px; font-weight: 700;">LEXISCORE.NETLIFY.APP</p>
    </div>
</body>
`;

const generateImage = async () => {
    const outputPath = `./public/img/og/lexiscore.png`;
    await nodeHtmlToImage({
        output: outputPath,
        html: htmlTemplate,
    }).then(() => {
        console.log(chalk.green(`✅ Generated image for Lexiscore`));
    });
};

// start the process
(async () => {
    await generateImage();
    console.log(chalk.blue("All done!"));
})();