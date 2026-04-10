import fs from "fs"

const inputPath = "./NotoSans-Regular.ttf"
const outputPath = "./NotoSans-Regular.js"

const fontBuffer = fs.readFileSync(inputPath)
const base64 = fontBuffer.toString("base64")

const content = `export const NotoSansRegular = \`${base64}\`;\n`

fs.writeFileSync(outputPath, content, "utf8")
console.log("Готово:", outputPath)