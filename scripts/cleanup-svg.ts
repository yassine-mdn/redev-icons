import fs, { readdirSync, writeFileSync } from 'fs';
import { resolve, join, basename } from 'path';

const iconsDir = resolve('src');
const indexPath = join(resolve(), 'index.ts');

const files = readdirSync(iconsDir).filter((file) => file.endsWith('.tsx'));

const cleanUp = (path: string) => {
    const data = fs.readFileSync(path, 'utf-8');

    const cleanedData = data
        .replace(/^.*shapePadding: 0,.*\n?/gm, "")
        .replace(/^.*solidColor: "#000",.*\n?/gm, "")
        .replace(/^.*InkscapeStroke: "none",.*\n?/gm, "")
        .replace(/^.*solidOpacity: 1,.*\n?/gm, "");

    fs.writeFileSync(path, cleanedData, 'utf-8');
    console.log(`${path.split(iconsDir)[1]} cleaned up`);
}

files.forEach((file) => {
    cleanUp(`${iconsDir}/${file}`);
})