#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const rootDir = path.resolve(__dirname, "..");
const apiPath = path.join(rootDir, "thirdparty/raylib/parser/output/raylib_api.json");
const dtsPath = path.join(rootDir, "examples/lib.raylib.d.ts");
const bindingsIndexPath = path.join(rootDir, "bindings/src/index.ts");

const outArg = process.argv.find((arg) => arg.startsWith("--out="));
const outPath = outArg ? path.resolve(rootDir, outArg.slice("--out=".length)) : null;

function readJson(filePath) {
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function parseDeclaredFunctions(dtsText) {
    return new Set([...dtsText.matchAll(/^declare function (\w+)\(/gm)].map((m) => m[1]));
}

function parseExplicitIgnores(indexTs) {
    return [...indexTs.matchAll(/^\s*ignore\("([^"]+)"\)/gm)].map((m) => m[1]).sort();
}

function toJsName(cName) {
    return cName.charAt(0).toLowerCase() + cName.slice(1);
}

function categorize(name) {
    if (/^Draw(LineStrip|TriangleFan|TriangleStrip)$/.test(name) || /^CheckCollision(PointPoly|Lines)$/.test(name)) return "shapes";
    if (/^(LoadImageAnim|LoadImageAnimFromMemory|ExportImageToMemory|ExportImageAsCode|ImageKernelConvolution|LoadImagePalette|UnloadImageColors|UnloadImagePalette|GetPixelColor|SetPixelColor)$/.test(name)) return "textures";
    if (/^(LoadFontFromMemory|LoadFontData|GenImageFontAtlas|UnloadFontData|ExportFontAsCode|DrawTextCodepoints|GetGlyphInfo|LoadUTF8|UnloadUTF8|LoadCodepoints|UnloadCodepoints|GetCodepointCount|GetCodepoint|GetCodepointNext|GetCodepointPrevious|CodepointToUTF8|Text)/.test(name)) return "text";
    if (/^(DrawTriangleStrip3D|LoadMaterials|LoadModelAnimations|UpdateModelAnimation|UnloadModelAnimation|UnloadModelAnimations|IsModelAnimationValid)$/.test(name)) return "models";
    if (/^(ExportWaveAsCode|LoadWaveSamples|UnloadWaveSamples|LoadMusicStreamFromMemory|LoadAudioStream|IsAudioStreamReady|UnloadAudioStream|UpdateAudioStream|IsAudioStreamProcessed|PlayAudioStream|PauseAudioStream|ResumeAudioStream|IsAudioStreamPlaying|StopAudioStream|SetAudioStreamVolume|SetAudioStreamPitch|SetAudioStreamPan|SetAudioStreamBufferSizeDefault|SetAudioStreamCallback|AttachAudioStreamProcessor|DetachAudioStreamProcessor|AttachAudioMixedProcessor|DetachAudioMixedProcessor)$/.test(name)) return "audio";
    return "core";
}

function buildReport() {
    const api = readJson(apiPath);
    const dtsText = fs.readFileSync(dtsPath, "utf8");
    const indexTs = fs.readFileSync(bindingsIndexPath, "utf8");

    const declaredFunctions = parseDeclaredFunctions(dtsText);
    const explicitIgnores = parseExplicitIgnores(indexTs);
    const totalCheatsheetFunctions = api.functions.length;
    const missing = api.functions.map((f) => f.name).filter((name) => !declaredFunctions.has(toJsName(name))).sort();
    const supported = totalCheatsheetFunctions - missing.length;
    const coveragePercent = ((supported / totalCheatsheetFunctions) * 100).toFixed(2);

    const grouped = {
        core: [],
        shapes: [],
        textures: [],
        text: [],
        models: [],
        audio: [],
    };
    for (const name of missing) grouped[categorize(name)].push(name);

    const now = new Date().toISOString();
    const lines = [];
    lines.push("# Binding Coverage Snapshot");
    lines.push("");
    lines.push(`- Generated: ${now}`);
    lines.push(`- Raylib API baseline: \`thirdparty/raylib/parser/output/raylib_api.json\``);
    lines.push(`- Type declarations source: \`examples/lib.raylib.d.ts\``);
    lines.push("");
    lines.push("## Summary");
    lines.push("");
    lines.push(`- Cheatsheet-visible functions: **${totalCheatsheetFunctions}**`);
    lines.push(`- Bound in JS declarations: **${supported}**`);
    lines.push(`- Missing from JS declarations: **${missing.length}**`);
    lines.push(`- Coverage: **${coveragePercent}%**`);
    lines.push(`- Explicit \`ignore(\"...\")\` entries in generator: **${explicitIgnores.length}**`);
    lines.push("");
    lines.push("## Missing By Module");
    lines.push("");
    for (const section of Object.keys(grouped)) {
        lines.push(`### ${section} (${grouped[section].length})`);
        lines.push("");
        if (grouped[section].length === 0) lines.push("- _none_");
        else grouped[section].forEach((name) => lines.push(`- \`${name}\``));
        lines.push("");
    }

    lines.push("## Explicit Ignores");
    lines.push("");
    explicitIgnores.forEach((name) => lines.push(`- \`${name}\``));
    lines.push("");

    return lines.join("\n");
}

const report = buildReport();

if (outPath) {
    fs.mkdirSync(path.dirname(outPath), { recursive: true });
    fs.writeFileSync(outPath, report);
    console.log(`Wrote coverage report to ${outPath}`);
} else {
    console.log(report);
}
