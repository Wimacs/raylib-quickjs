#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const rootDir = path.resolve(__dirname, "..");
const apiPath = path.join(rootDir, "thirdparty/raylib/parser/output/raylib_api.json");
const dtsPath = path.join(rootDir, "examples/lib.raylib.d.ts");

const outArg = process.argv.find((arg) => arg.startsWith("--out="));
const outPath = outArg
    ? path.resolve(rootDir, outArg.slice("--out=".length))
    : path.join(rootDir, "API_C_JS_CHEATSHEET.md");

function toJsName(cName) {
    return cName.charAt(0).toLowerCase() + cName.slice(1);
}

function escapeMd(text) {
    return String(text)
        .replace(/\|/g, "\\|")
        .replace(/\r?\n/g, " ")
        .trim();
}

function parseDeclaredFunctions(dtsText) {
    const map = new Map();
    const re = /^declare function (\w+)\(([^)]*)\): ([^;]+);/gm;
    let m = re.exec(dtsText);
    while (m) {
        const name = m[1];
        const params = m[2].trim();
        const ret = m[3].trim();
        map.set(name, {
            name,
            params,
            ret,
            signature: `${name}(${params}): ${ret}`,
        });
        m = re.exec(dtsText);
    }
    return map;
}

function buildMarkdown() {
    const api = JSON.parse(fs.readFileSync(apiPath, "utf8"));
    const dtsText = fs.readFileSync(dtsPath, "utf8");
    const dtsFunctions = parseDeclaredFunctions(dtsText);

    const rows = [];
    let mapped = 0;

    for (let i = 0; i < api.functions.length; i++) {
        const fn = api.functions[i];
        const cName = fn.name;
        const jsName = toJsName(cName);
        const dts = dtsFunctions.get(jsName);

        const cParams = (fn.params || [])
            .map((p) => `${p.type} ${p.name}`)
            .join(", ");
        const cSig = `${fn.returnType} ${cName}(${cParams})`;
        const jsSig = dts ? dts.signature : `${jsName}(...)`;

        if (dts) mapped += 1;

        rows.push({
            index: i + 1,
            cSig,
            jsSig,
            desc: fn.description || "-",
            mapped: !!dts,
        });
    }

    const lines = [];
    lines.push("# Raylib C API 与 RayJS API 对照表");
    lines.push("");
    lines.push(`- 生成时间: ${new Date().toISOString()}`);
    lines.push(`- 基线: \`thirdparty/raylib/parser/output/raylib_api.json\``);
    lines.push(`- JS 声明: \`examples/lib.raylib.d.ts\``);
    lines.push(`- Cheatsheet 函数总数: **${api.functions.length}**`);
    lines.push(`- 已匹配 JS 声明: **${mapped}**`);
    lines.push(`- 匹配率: **${((mapped / api.functions.length) * 100).toFixed(2)}%**`);
    lines.push("");
    lines.push("> 说明: JS API 名称默认按 lowerCamelCase 规则从 C API 名称映射，并以 d.ts 实际导出为准。");
    lines.push("");
    lines.push("| # | C API (签名) | JS API (签名) | 用途简介 |");
    lines.push("| --- | --- | --- | --- |");

    for (const row of rows) {
        const cCell = `\`${escapeMd(row.cSig)}\``;
        const jsCell = row.mapped
            ? `\`${escapeMd(row.jsSig)}\``
            : `⚠️ \`${escapeMd(row.jsSig)}\``;
        lines.push(
            `| ${row.index} | ${cCell} | ${jsCell} | ${escapeMd(row.desc)} |`
        );
    }

    lines.push("");
    return lines.join("\n");
}

const markdown = buildMarkdown();
fs.writeFileSync(outPath, markdown);
console.log(`Wrote cheatsheet mapping to ${outPath}`);
