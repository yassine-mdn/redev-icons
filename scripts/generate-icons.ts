import fs from "fs";
import { transform } from "@svgr/core";
import path from "path";
import { glob } from "glob";

const ICONS_SOURCE_DIR = "assets";
const COMPONENTS_DIR = "src";

function capitalizeFirstLetter(val: string): string {
    return val.charAt(0).toUpperCase() + val.slice(1);
}

// Template to generate named exports instead of default ones
const iconComponentTemplate = (
    { template }: any,
    opts: any,
    { imports, componentName, jsx }: any
) =>
    template.smart({ plugins: ["typescript"] }).ast`
        ${imports}
        ${"\n"}
        export const ${componentName} = (props: React.SVGProps<SVGSVGElement>) => ${jsx};
    `;

if (!fs.existsSync(COMPONENTS_DIR)) {
    fs.mkdirSync(COMPONENTS_DIR, { recursive: true });
}

const icons = glob.sync(`${ICONS_SOURCE_DIR}/**.svg`);

for (const icon of icons) {
    const svg = fs.readFileSync(icon, "utf8");
    const componentName = path.parse(icon).name;
    const outputName = capitalizeFirstLetter(componentName) + "Icon";

    const componentCode = transform.sync(
        svg,
        {
            icon: true,
            typescript: true,
            plugins: ["@svgr/plugin-svgo", "@svgr/plugin-jsx", "@svgr/plugin-prettier"],
        },
        { componentName: outputName }
    );

    if (componentCode) {
        fs.writeFileSync(`${COMPONENTS_DIR}/${outputName}.tsx`, componentCode);
    }

    console.log(`Added new ${outputName} component`);
}

