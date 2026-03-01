// rayjs binding full smoke sample
// Goal: touch as many bindings as practical in one runnable script.
// Run from repository root:
//   ./rayjs examples/binding_full_smoke.js

const SCREEN_WIDTH = 1280;
const SCREEN_HEIGHT = 720;
const MAX_FRAMES = 420;
const LOG_PREFIX = "[binding-smoke]";

const PATH_SELF = "binding_full_smoke.js";
const PATH_TTF = "text/resources/DotGothic16-Regular.ttf";
const PATH_WAV = "audio/resources/coin.wav";
const PATH_OGG = "audio/resources/target.ogg";
const PATH_MODEL_OBJ = "models/resources/models/obj/cube.obj";
const PATH_MODEL_ANIM = "models/resources/models/iqm/guyanim.iqm";
const PATH_MODEL_ANIM_TARGET = "models/resources/models/iqm/guy.iqm";
const PATH_MODEL_GLB = "models/resources/models/gltf/robot.glb";
const TMP_TEXT = "binding_smoke_tmp.txt";
const TMP_BIN = "binding_smoke_tmp.bin";
const TMP_DATA_H = "binding_smoke_data.h";
const TMP_WAVE = "binding_smoke_wave.wav";
const TMP_WAVE_H = "binding_smoke_wave.h";
const TMP_FONT_H = "binding_smoke_font.h";
const TMP_MESH_H = "binding_smoke_mesh.h";

const stats = {
    total: 0,
    pass: 0,
    fail: 0,
    errors: []
};

function safe(name, fn) {
    stats.total += 1;
    try {
        const value = fn();
        stats.pass += 1;
        return value;
    } catch (err) {
        stats.fail += 1;
        const msg = `${LOG_PREFIX} FAIL ${name}: ${String(err)}`;
        stats.errors.push(msg);
        traceLog(LOG_WARNING, msg);
        return null;
    }
}

const missingOptional = {};
function callOptional(name, ...args) {
    const fn = globalThis[name];
    if (typeof fn !== "function") {
        if (!missingOptional[name]) {
            missingOptional[name] = true;
            traceLog(LOG_WARNING, `${LOG_PREFIX} optional API not found: ${name}`);
        }
        return null;
    }
    return fn(...args);
}

function pushIfValid(list, value) {
    if (value !== null && value !== undefined) list.push(value);
}

setConfigFlags(FLAG_MSAA_4X_HINT | FLAG_WINDOW_RESIZABLE | FLAG_VSYNC_HINT);
initWindow(SCREEN_WIDTH, SCREEN_HEIGHT, "rayjs binding full smoke");
setExitKey(0);
setTargetFPS(60);
setTraceLogLevel(LOG_INFO);

const resources = {
    images: [],
    textures: [],
    renderTextures: [],
    fonts: [],
    meshes: [],
    models: [],
    materials: [],
    shaders: [],
    waves: [],
    sounds: [],
    soundAliases: [],
    musics: [],
    streams: []
};

traceLog(LOG_INFO, `${LOG_PREFIX} start`);

// Core callback wrappers (current implementation is intentionally no-op).
safe("setTraceLogCallback", () => setTraceLogCallback(() => {}));
safe("setLoadFileDataCallback", () => setLoadFileDataCallback(() => null));
safe("setSaveFileDataCallback", () => setSaveFileDataCallback(() => true));
safe("setLoadFileTextCallback", () => setLoadFileTextCallback(() => null));
safe("setSaveFileTextCallback", () => setSaveFileTextCallback(() => true));

// Window/core state + query functions.
safe("setWindowState", () => setWindowState(FLAG_WINDOW_ALWAYS_RUN));
safe("clearWindowState", () => clearWindowState(FLAG_WINDOW_ALWAYS_RUN));
safe("setWindowMinSize", () => setWindowMinSize(640, 360));
safe("setWindowMaxSize", () => setWindowMaxSize(1920, 1080));
safe("setWindowSize", () => setWindowSize(SCREEN_WIDTH, SCREEN_HEIGHT));
safe("setWindowOpacity", () => setWindowOpacity(0.98));
safe("restoreWindow", () => restoreWindow());
safe("maximizeWindow", () => maximizeWindow());
safe("restoreWindow#2", () => restoreWindow());
safe("minimizeWindow", () => minimizeWindow());
safe("restoreWindow#3", () => restoreWindow());
safe("setWindowPosition", () => setWindowPosition(80, 40));
safe("getWindowHandle", () => getWindowHandle());
safe("getScreenWidth", () => getScreenWidth());
safe("getScreenHeight", () => getScreenHeight());
safe("getRenderWidth", () => getRenderWidth());
safe("getRenderHeight", () => getRenderHeight());
safe("getMonitorCount", () => getMonitorCount());
safe("getCurrentMonitor", () => getCurrentMonitor());
safe("getMonitorPosition", () => getMonitorPosition(0));
safe("getMonitorWidth", () => getMonitorWidth(0));
safe("getMonitorHeight", () => getMonitorHeight(0));
safe("getMonitorPhysicalWidth", () => getMonitorPhysicalWidth(0));
safe("getMonitorPhysicalHeight", () => getMonitorPhysicalHeight(0));
safe("getMonitorRefreshRate", () => getMonitorRefreshRate(0));
safe("getMonitorName", () => getMonitorName(0));
safe("getWindowPosition", () => getWindowPosition());
safe("getWindowScaleDPI", () => getWindowScaleDPI());
safe("setClipboardText", () => setClipboardText("rayjs binding smoke"));
safe("getClipboardText", () => getClipboardText());
const clipboardImage = safe("getClipboardImage", () => getClipboardImage());
pushIfValid(resources.images, clipboardImage);
safe("setRandomSeed", () => setRandomSeed(1337));
safe("getRandomValue", () => getRandomValue(-100, 100));
const randomSeq = safe("loadRandomSequence", () => loadRandomSequence(32, 1, 1000));
if (randomSeq) safe("unloadRandomSequence", () => unloadRandomSequence(randomSeq));
safe("pollInputEvents", () => pollInputEvents());
safe("waitTime", () => waitTime(0.0005));

// Memory, hash, compression and file APIs.
const rawData = new Uint8Array([1, 3, 3, 7, 9, 11, 13, 17, 21, 42, 77, 99]).buffer;
const memA = safe("memAlloc", () => memAlloc(32));
if (memA) {
    const memB = safe("memRealloc", () => memRealloc(memA, 64));
    if (memB) safe("memFree", () => memFree(memB));
}
const comp = safe("compressData", () => compressData(rawData));
if (comp) safe("decompressData", () => decompressData(comp));
const b64 = safe("encodeDataBase64", () => encodeDataBase64(rawData));
if (b64) safe("decodeDataBase64", () => decodeDataBase64(b64));
safe("computeCRC32", () => computeCRC32(rawData, rawData.byteLength));
safe("computeMD5", () => computeMD5(rawData));
safe("computeSHA1", () => computeSHA1(rawData));
safe("fileExists", () => fileExists(PATH_SELF));
safe("directoryExists", () => directoryExists("."));
safe("isFileExtension", () => isFileExtension(PATH_SELF, ".js"));
safe("getFileLength", () => getFileLength(PATH_SELF));
safe("getFileExtension", () => getFileExtension(PATH_SELF));
safe("getFileName", () => getFileName(PATH_SELF));
safe("getFileNameWithoutExt", () => getFileNameWithoutExt(PATH_SELF));
safe("getDirectoryPath", () => getDirectoryPath(PATH_SELF));
safe("getPrevDirectoryPath", () => getPrevDirectoryPath("."));
safe("getWorkingDirectory", () => getWorkingDirectory());
safe("getApplicationDirectory", () => getApplicationDirectory());
safe("makeDirectory", () => makeDirectory("binding_smoke_tmp_dir"));
safe("changeDirectory-noop", () => changeDirectory("."));
safe("isPathFile", () => isPathFile(PATH_SELF));
safe("isFileNameValid", () => isFileNameValid(PATH_SELF));
const fileText = safe("loadFileText", () => loadFileText(PATH_SELF));
if (fileText !== null) {
    safe("textLength(fileText)", () => textLength(fileText));
}
const fileData = safe("loadFileData", () => loadFileData(PATH_SELF));
if (fileData) {
    safe("saveFileData", () => saveFileData(TMP_BIN, fileData, fileData.byteLength));
    safe("exportDataAsCode", () => exportDataAsCode(fileData, TMP_DATA_H));
    safe("unloadFileData", () => unloadFileData(fileData));
}
safe("saveFileText", () => saveFileText(TMP_TEXT, "rayjs binding smoke temp"));
safe("unloadFileText", () => unloadFileText(fileText || ""));
safe("getFileModTime", () => getFileModTime(PATH_SELF));
const filesA = safe("loadDirectoryFiles", () => loadDirectoryFiles("."));
if (filesA) safe("unloadDirectoryFiles", () => unloadDirectoryFiles(filesA));
const filesB = safe("loadDirectoryFilesEx", () => loadDirectoryFilesEx("models/resources/models", "*.obj;*.glb;*.iqm", true));
if (filesB) safe("unloadDirectoryFilesEx", () => unloadDirectoryFiles(filesB));
safe("isFileDropped", () => isFileDropped());
const dropped = safe("loadDroppedFiles", () => loadDroppedFiles());
if (dropped) safe("unloadDroppedFiles", () => unloadDroppedFiles(dropped));

// Text/unicode wrappers and helpers.
const dstText = { text: "" };
const appendPos = { position: 2 };
safe("textCopy", () => textCopy(dstText, "rayjs"));
safe("textFormat", () => textFormat("format-smoke"));
const joined = safe("textJoin", () => textJoin(["ray", "js", "smoke"], "-"));
const splitOut = { count: 0 };
const splitArr = safe("textSplit", () => textSplit("a|b|c|d", "|", splitOut));
safe("textAppend", () => textAppend(dstText, "_ok", appendPos));
safe("textIsEqual", () => textIsEqual("A", "A"));
safe("textSubtext", () => textSubtext("abcdef", 1, 3));
safe("textReplace", () => textReplace("a-b-c", "-", "_"));
safe("textInsert", () => textInsert("abef", "cd", 2));
safe("textFindIndex", () => textFindIndex("rayjs", "js"));
safe("textToUpper", () => textToUpper("rayjs"));
safe("textToLower", () => textToLower("RAYJS"));
safe("textToPascal", () => textToPascal("ray js smoke"));
safe("textToSnake", () => textToSnake("RayJsSmoke"));
safe("textToCamel", () => textToCamel("ray_js_smoke"));
safe("textToInteger", () => textToInteger("1234"));
safe("textToFloat", () => textToFloat("56.78"));
const codepointSize = { codepointSize: 0 };
safe("getCodepoint", () => getCodepoint("你好", codepointSize));
safe("getCodepointNext", () => getCodepointNext("你好", { codepointSize: 0 }));
safe("getCodepointPrevious", () => getCodepointPrevious("你好", { codepointSize: 0 }));
safe("codepointToUTF8", () => codepointToUTF8(0x4F60, { utf8Size: 0 }));
const codepointsIn = new Int32Array([72, 101, 108, 108, 111]).buffer;
const utf8Text = safe("loadUTF8", () => loadUTF8(codepointsIn, 5));
if (utf8Text !== null) safe("unloadUTF8", () => unloadUTF8(utf8Text));
const loadedCodepointCount = { count: 0 };
const loadedCodepoints = safe("loadCodepoints", () => loadCodepoints("RayJS", loadedCodepointCount));
if (loadedCodepoints) safe("unloadCodepoints", () => unloadCodepoints(loadedCodepoints));

// Image + texture + color APIs.
const iconA = safe("genImageChecked(iconA)", () => genImageChecked(32, 32, 4, 4, ORANGE, BROWN));
const iconB = safe("genImageGradientLinear(iconB)", () => genImageGradientLinear(32, 32, 45, SKYBLUE, DARKBLUE));
pushIfValid(resources.images, iconA);
pushIfValid(resources.images, iconB);
if (iconA) safe("setWindowIcon", () => setWindowIcon(iconA));
if (iconA && iconB) safe("setWindowIcons", () => setWindowIcons([iconA, iconB]));

const image = safe("genImageGradientSquare", () => genImageGradientSquare(256, 256, 0.35, SKYBLUE, DARKBLUE));
pushIfValid(resources.images, image);
if (image) {
    safe("isImageValid", () => isImageValid(image));
    safe("imageDrawText", () => imageDrawText(image, "SMOKE", 8, 8, 20, BLACK));
    safe("imageDrawRectangle", () => imageDrawRectangle(image, 24, 40, 80, 60, RED));
    safe("imageDrawCircle", () => imageDrawCircle(image, 180, 120, 36, GREEN));
    safe("imageAlphaPremultiply", () => imageAlphaPremultiply(image));
    safe("imageFlipHorizontal", () => imageFlipHorizontal(image));
    safe("imageRotateCW", () => imageRotateCW(image));
    safe("imageColorContrast", () => imageColorContrast(image, 15));
    safe("imageColorBrightness", () => imageColorBrightness(image, -10));
    const kernel = new Float32Array([
        0, -1, 0,
        -1, 5, -1,
        0, -1, 0
    ]).buffer;
    safe("imageKernelConvolution", () => imageKernelConvolution(image, kernel, 3));
    safe("getImageAlphaBorder", () => getImageAlphaBorder(image, 0.1));
    safe("getImageColor", () => getImageColor(image, 0, 0));
    safe("imageReadPixel", () => imageReadPixel(image, 2, 2));
    const palOut = { colorCount: 0 };
    const palette = safe("loadImagePalette", () => loadImagePalette(image, 32, palOut));
    if (palette) safe("unloadImagePalette", () => unloadImagePalette(palette));
}

const pixelFormat = PIXELFORMAT_UNCOMPRESSED_R8G8B8A8;
const onePixelSize = safe("getPixelDataSize", () => getPixelDataSize(1, 1, pixelFormat)) || 4;
const onePixel = new Uint8Array(onePixelSize).buffer;
safe("setPixelColor", () => setPixelColor(onePixel, new Color(250, 40, 80, 255), pixelFormat));
safe("getPixelColor", () => getPixelColor(onePixel, pixelFormat));

const texture = image ? safe("loadTextureFromImage", () => loadTextureFromImage(image)) : null;
pushIfValid(resources.textures, texture);
if (texture) {
    safe("isTextureValid", () => isTextureValid(texture));
    safe("setTextureFilter", () => setTextureFilter(texture, TEXTURE_FILTER_BILINEAR));
    safe("setTextureWrap", () => setTextureWrap(texture, TEXTURE_WRAP_REPEAT));
    safe("genTextureMipmaps", () => genTextureMipmaps(texture));
}

if (image && texture) {
    const imagePixels = safe("loadImageColors(update)", () => loadImageColors(image));
    if (imagePixels) {
        safe("updateTexture", () => updateTexture(texture, imagePixels));
        safe("updateTextureRec", () => updateTextureRec(texture, new Rectangle(0, 0, 16, 16), imagePixels));
        safe("unloadImageColors", () => unloadImageColors(imagePixels));
    }
}

const renderTexture = safe("loadRenderTexture", () => loadRenderTexture(256, 256));
pushIfValid(resources.renderTextures, renderTexture);
if (renderTexture) safe("isRenderTextureValid", () => isRenderTextureValid(renderTexture));

// Font bindings, including the newly added loadFontData/genImageFontAtlas.
const defaultFont = safe("getFontDefault", () => getFontDefault());
const ttfBytes = safe("loadFileData(ttf)", () => loadFileData(PATH_TTF));
if (ttfBytes) {
    const fontMem = safe("loadFontFromMemory", () => loadFontFromMemory(".ttf", ttfBytes, 26));
    pushIfValid(resources.fonts, fontMem);
    if (fontMem) {
        safe("isFontValid", () => isFontValid(fontMem));
        safe("exportFontAsCode", () => exportFontAsCode(fontMem, TMP_FONT_H));
    }

    const codepointList = new Int32Array([32, 65, 66, 67, 68, 69, 97, 98, 99, 20013, 25991]);
    const glyphs = safe("loadFontData", () => loadFontData(ttfBytes, 26, codepointList.buffer, codepointList.length, FONT_DEFAULT));
    if (glyphs && glyphs.length > 0) {
        const atlas = safe("genImageFontAtlas", () => genImageFontAtlas(glyphs, 26, 2, 0));
        pushIfValid(resources.images, atlas);
        safe("unloadFontData(compat)", () => unloadFontData(glyphs[0], glyphs.length));
    }
    safe("unloadFileData(ttf)", () => unloadFileData(ttfBytes));
}

// Camera + math + collision + geometry utilities.
const camera3D = new Camera3D(
    new Vector3(4.0, 4.0, 4.0),
    new Vector3(0.0, 1.0, 0.0),
    new Vector3(0.0, 1.0, 0.0),
    60.0,
    CAMERA_PERSPECTIVE
);
const camera2D = new Camera2D(new Vector2(0, 0), new Vector2(0, 0), 0.0, 1.0);
safe("getCameraMatrix", () => getCameraMatrix(camera3D));
safe("getCameraMatrix2D", () => getCameraMatrix2D(camera2D));
safe("getScreenToWorldRay", () => getScreenToWorldRay(new Vector2(100, 100), camera3D));
safe("getScreenToWorldRayEx", () => getScreenToWorldRayEx(new Vector2(100, 100), camera3D, SCREEN_WIDTH, SCREEN_HEIGHT));
safe("getWorldToScreen", () => getWorldToScreen(new Vector3(1, 2, 3), camera3D));
safe("getWorldToScreenEx", () => getWorldToScreenEx(new Vector3(1, 2, 3), camera3D, SCREEN_WIDTH, SCREEN_HEIGHT));
safe("getWorldToScreen2D", () => getWorldToScreen2D(new Vector2(10, 20), camera2D));
safe("getScreenToWorld2D", () => getScreenToWorld2D(new Vector2(10, 20), camera2D));
safe("vector2Add", () => vector2Add(new Vector2(1, 2), new Vector2(3, 4)));
safe("vector3CrossProduct", () => vector3CrossProduct(new Vector3(1, 0, 0), new Vector3(0, 1, 0)));
safe("vector3Normalize", () => vector3Normalize(new Vector3(3, 4, 5)));
safe("matrixMultiply", () => matrixMultiply(matrixRotateY(0.2), matrixTranslate(1, 2, 3)));
safe("matrixInvert", () => matrixInvert(matrixIdentity()));
safe("quaternionFromEuler", () => quaternionFromEuler(0.1, 0.2, 0.3));
safe("clamp", () => clamp(10, 0, 5));
safe("lerp", () => lerp(0, 10, 0.25));
safe("remap", () => remap(5, 0, 10, -1, 1));
safe("normalize", () => normalize(5, 0, 10));
safe("checkCollisionSpheres", () => checkCollisionSpheres(new Vector3(0, 0, 0), 1, new Vector3(1, 0, 0), 1));
safe("checkCollisionBoxes", () => checkCollisionBoxes(new BoundingBox(new Vector3(-1, -1, -1), new Vector3(1, 1, 1)), new BoundingBox(new Vector3(0, 0, 0), new Vector3(2, 2, 2))));
safe("checkCollisionBoxSphere", () => checkCollisionBoxSphere(new BoundingBox(new Vector3(-1, -1, -1), new Vector3(1, 1, 1)), new Vector3(2, 0, 0), 0.75));
safe("getRayCollisionSphere", () => getRayCollisionSphere(new Ray(new Vector3(0, 0, 0), new Vector3(1, 0, 0)), new Vector3(5, 0, 0), 1));

const polyPoints2 = new Float32Array([
    100, 200,
    130, 150,
    180, 170,
    165, 230,
    120, 240
]).buffer;
safe("checkCollisionPointPoly", () => checkCollisionPointPoly(new Vector2(140, 190), polyPoints2, 5));
safe("checkCollisionLines", () => checkCollisionLines(new Vector2(50, 50), new Vector2(250, 250), new Vector2(250, 50), new Vector2(50, 250), { x: 0, y: 0 }));

const strip3D = new Float32Array([
    -1, 0, -1,
    0, 0.8, 0,
    1, 0, -1,
    2, 0.6, 0,
    3, 0, -1
]).buffer;

// Mesh/model/material/shader bindings.
const meshModel = safe("genMeshCube(model)", () => genMeshCube(1.2, 1.2, 1.2));
let modelFromMesh = null;
if (meshModel) {
    modelFromMesh = safe("loadModelFromMesh", () => loadModelFromMesh(meshModel));
    pushIfValid(resources.models, modelFromMesh);
}

const meshA = safe("genMeshSphere", () => genMeshSphere(0.7, 16, 16));
const meshB = safe("genMeshTorus", () => genMeshTorus(0.5, 0.2, 16, 16));
pushIfValid(resources.meshes, meshA);
pushIfValid(resources.meshes, meshB);
if (meshA) {
    safe("uploadMesh", () => uploadMesh(meshA, false));
    safe("genMeshTangents", () => genMeshTangents(meshA));
    safe("getMeshBoundingBox", () => getMeshBoundingBox(meshA));
    safe("exportMeshAsCode", () => exportMeshAsCode(meshA, TMP_MESH_H));
    safe("exportMesh", () => exportMesh(meshA, "binding_smoke_mesh.obj"));
}
if (meshA && meshB) {
    const meshCopyA = safe("meshCopy", () => meshCopy(meshA));
    pushIfValid(resources.meshes, meshCopyA);
    const merged = safe("meshMerge", () => meshMerge(meshA, meshB));
    pushIfValid(resources.meshes, merged);
}

const modelFromFile = safe("loadModel(file)", () => loadModel(PATH_MODEL_OBJ));
pushIfValid(resources.models, modelFromFile);
if (modelFromFile) {
    safe("isModelValid", () => isModelValid(modelFromFile));
    safe("getModelBoundingBox", () => getModelBoundingBox(modelFromFile));
}

const modelForAnimation = safe("loadModel(anim-target)", () => loadModel(PATH_MODEL_ANIM_TARGET));
pushIfValid(resources.models, modelForAnimation);

const defaultMaterial = safe("loadMaterialDefault", () => loadMaterialDefault());
pushIfValid(resources.materials, defaultMaterial);
if (defaultMaterial && texture) {
    safe("isMaterialValid", () => isMaterialValid(defaultMaterial));
    safe("setMaterialTexture", () => setMaterialTexture(defaultMaterial, MATERIAL_MAP_DIFFUSE, texture));
}
if (modelFromMesh && defaultMaterial) {
    safe("setModelMaterial", () => setModelMaterial(modelFromMesh, 0, defaultMaterial));
    safe("setModelMeshMaterial", () => setModelMeshMaterial(modelFromMesh, 0, 0));
    safe("getModelMaterial", () => getModelMaterial(modelFromMesh, 0));
    safe("getModelMesh", () => getModelMesh(modelFromMesh, 0));
}

const loadedMatCount = { materialCount: 0 };
const loadedMaterials = safe("loadMaterials", () => loadMaterials(PATH_MODEL_GLB, loadedMatCount));
if (loadedMaterials && loadedMaterials.length > 0) {
    for (let i = 0; i < loadedMaterials.length; i++) pushIfValid(resources.materials, loadedMaterials[i]);
}

const animCountA = { animCount: 0 };
const animsA = safe("loadModelAnimations(A)", () => loadModelAnimations(PATH_MODEL_ANIM, animCountA));
if (animsA && animsA.length > 0 && modelForAnimation) {
    safe("updateModelAnimation", () => updateModelAnimation(modelForAnimation, animsA[0], 0));
    safe("updateModelAnimationBones", () => updateModelAnimationBones(modelForAnimation, animsA[0], 0));
    safe("isModelAnimationValid", () => isModelAnimationValid(modelForAnimation, animsA[0]));
    safe("unloadModelAnimation", () => unloadModelAnimation(animsA[0]));
}
const animCountB = { animCount: 0 };
const animsB = safe("loadModelAnimations(B)", () => loadModelAnimations(PATH_MODEL_ANIM, animCountB));
if (animsB && animsB.length > 0) safe("unloadModelAnimations", () => unloadModelAnimations(animsB));

const shader = safe("loadShader(default)", () => loadShader(null, null));
pushIfValid(resources.shaders, shader);
if (shader) {
    safe("isShaderValid", () => isShaderValid(shader));
    const locTime = safe("getShaderLocation", () => getShaderLocation(shader, "uTime"));
    safe("getShaderLocationAttrib", () => getShaderLocationAttrib(shader, "vertexPosition"));
    if (locTime !== null) {
        safe("setShaderValue", () => setShaderValue(shader, locTime, 1.0, SHADER_UNIFORM_FLOAT));
        safe("setShaderValueV", () => setShaderValueV(shader, locTime, new Float32Array([1.0, 0.5, 0.2, 1.0]).buffer, SHADER_UNIFORM_VEC4, 1));
        safe("setShaderValueMatrix", () => setShaderValueMatrix(shader, locTime, matrixIdentity()));
        if (texture) safe("setShaderValueTexture", () => setShaderValueTexture(shader, locTime, texture));
        safe("setShaderLocation(custom)", () => setShaderLocation(shader, SHADER_LOC_COLOR_DIFFUSE, locTime));
    }
}

// Audio bindings.
safe("initAudioDevice", () => initAudioDevice());
safe("isAudioDeviceReady", () => isAudioDeviceReady());
safe("setMasterVolume", () => setMasterVolume(0.25));
safe("getMasterVolume", () => getMasterVolume());

const wave = safe("loadWave", () => loadWave(PATH_WAV));
pushIfValid(resources.waves, wave);
if (wave) {
    safe("isWaveValid", () => isWaveValid(wave));
    const waveCopyData = safe("waveCopy", () => waveCopy(wave));
    pushIfValid(resources.waves, waveCopyData);
    if (waveCopyData) {
        safe("waveCrop", () => waveCrop(waveCopyData, 0, 1024));
        safe("waveFormat", () => waveFormat(waveCopyData, 22050, 16, 1));
    }
    const waveSamples = safe("loadWaveSamples", () => loadWaveSamples(wave));
    if (waveSamples) safe("unloadWaveSamples", () => unloadWaveSamples(waveSamples));
    safe("exportWave", () => exportWave(wave, TMP_WAVE));
    safe("exportWaveAsCode", () => exportWaveAsCode(wave, TMP_WAVE_H));
}

const sound = wave ? safe("loadSoundFromWave", () => loadSoundFromWave(wave)) : null;
pushIfValid(resources.sounds, sound);
if (sound) {
    safe("isSoundValid", () => isSoundValid(sound));
    safe("playSound", () => playSound(sound));
    safe("pauseSound", () => pauseSound(sound));
    safe("resumeSound", () => resumeSound(sound));
    safe("isSoundPlaying", () => isSoundPlaying(sound));
    safe("setSoundVolume", () => setSoundVolume(sound, 0.3));
    safe("setSoundPitch", () => setSoundPitch(sound, 1.05));
    safe("setSoundPan", () => setSoundPan(sound, 0.5));
    safe("updateSound", () => updateSound(sound, new Int16Array(1024).buffer, 512));
    safe("stopSound", () => stopSound(sound));
    const alias = safe("loadSoundAlias", () => loadSoundAlias(sound));
    pushIfValid(resources.soundAliases, alias);
}

const soundFromFile = safe("loadSound(file)", () => loadSound(PATH_WAV));
pushIfValid(resources.sounds, soundFromFile);

const music = safe("loadMusicStream", () => loadMusicStream(PATH_OGG));
pushIfValid(resources.musics, music);
if (music) {
    safe("isMusicValid", () => isMusicValid(music));
    safe("playMusicStream", () => playMusicStream(music));
    safe("updateMusicStream(init)", () => updateMusicStream(music));
    safe("isMusicStreamPlaying", () => isMusicStreamPlaying(music));
    safe("seekMusicStream", () => seekMusicStream(music, 0.05));
    safe("setMusicVolume", () => setMusicVolume(music, 0.25));
    safe("setMusicPitch", () => setMusicPitch(music, 1.0));
    safe("setMusicPan", () => setMusicPan(music, 0.5));
    safe("getMusicTimeLength", () => getMusicTimeLength(music));
    safe("getMusicTimePlayed", () => getMusicTimePlayed(music));
}

const oggBytes = safe("loadFileData(ogg)", () => loadFileData(PATH_OGG));
if (oggBytes) {
    const musicFromMemory = safe("loadMusicStreamFromMemory", () => loadMusicStreamFromMemory(".ogg", oggBytes));
    pushIfValid(resources.musics, musicFromMemory);
    safe("unloadFileData(ogg)", () => unloadFileData(oggBytes));
}

const stream = safe("loadAudioStream", () => loadAudioStream(22050, 16, 1));
pushIfValid(resources.streams, stream);
if (stream) {
    safe("isAudioStreamValid", () => isAudioStreamValid(stream));
    safe("setAudioStreamBufferSizeDefault", () => setAudioStreamBufferSizeDefault(4096));
    safe("playAudioStream", () => playAudioStream(stream));
    safe("updateAudioStream", () => updateAudioStream(stream, new Int16Array(1024).buffer, 1024));
    safe("isAudioStreamProcessed", () => isAudioStreamProcessed(stream));
    safe("isAudioStreamPlaying", () => isAudioStreamPlaying(stream));
    safe("setAudioStreamVolume", () => setAudioStreamVolume(stream, 0.2));
    safe("setAudioStreamPitch", () => setAudioStreamPitch(stream, 1.0));
    safe("setAudioStreamPan", () => setAudioStreamPan(stream, 0.5));
    safe("setAudioStreamCallback", () => setAudioStreamCallback(stream, () => {}));
    safe("attachAudioStreamProcessor", () => attachAudioStreamProcessor(stream, () => {}));
    safe("detachAudioStreamProcessor", () => detachAudioStreamProcessor(stream, () => {}));
    safe("attachAudioMixedProcessor", () => attachAudioMixedProcessor(() => {}));
    safe("detachAudioMixedProcessor", () => detachAudioMixedProcessor(() => {}));
    safe("pauseAudioStream", () => pauseAudioStream(stream));
    safe("resumeAudioStream", () => resumeAudioStream(stream));
    safe("stopAudioStream", () => stopAudioStream(stream));
}

// GUI state for raygui bindings.
let guiChecked = true;
let guiSliderValue = 0.35;
let guiSliderBarValue = 0.7;
let guiProgress = 0.2;
const guiDropdownActive = { active: 0 };
const guiSpinnerValue = { value: 12 };
const guiValueBoxValue = { value: 50 };
const guiListScroll = { scrollIndex: 0 };
const guiTextState = { text: "rayjs" };
let guiColor = new Color(120, 170, 255, 255);
let guiAlpha = 1.0;
let guiHue = 0.5;

let frame = 0;
while (!windowShouldClose() && frame < MAX_FRAMES) {
    frame += 1;
    const t = getTime();
    const dt = getFrameTime();

    if (music) safe("updateMusicStream(frame)", () => updateMusicStream(music));

    callOptional("updateCameraPro", camera3D, new Vector3(0, 0, 0), new Vector3(0, dt * 4, 0), 0.0);
    camera2D.rotation = Math.sin(t * 0.8) * 2.0;
    camera2D.zoom = 1.0 + Math.sin(t * 0.6) * 0.03;

    if (renderTexture) {
        beginTextureMode(renderTexture);
        clearBackground(new Color(20, 25, 40, 255));
        drawCircle(128, 128, 60 + Math.sin(t * 3.0) * 18, SKYBLUE);
        drawCircleLines(128, 128, 72, WHITE);
        drawLine(0, 0, 255, 255, LIGHTGRAY);
        drawLine(0, 255, 255, 0, LIGHTGRAY);
        endTextureMode();
    }

    beginDrawing();
    clearBackground(new Color(18, 20, 28, 255));

    beginBlendMode(BLEND_ALPHA);
    beginScissorMode(12, 12, 620, 300);
    drawRectangleGradientH(20, 20, 600, 260, DARKBLUE, BLACK);
    drawRectangleLines(20, 20, 600, 260, RAYWHITE);
    drawLineBezier(new Vector2(40, 120), new Vector2(560, 180), 2.0, GOLD);
    drawCircleSector(new Vector2(120, 160), 52, 20, 300, 20, ORANGE);
    drawRing(new Vector2(250, 160), 20, 50, 0, 340, 24, SKYBLUE);
    callOptional("drawTriangleFan", polyPoints2, 5, new Color(255, 100, 100, 120));
    callOptional("drawTriangleStrip", polyPoints2, 5, new Color(100, 255, 100, 120));
    callOptional("drawLineStrip", polyPoints2, 5, WHITE);
    endScissorMode();
    endBlendMode();

    beginMode2D(camera2D);
    drawRectangleRounded(new Rectangle(680, 30, 220, 120), 0.2, 8, new Color(40, 80, 120, 220));
    drawText("Mode2D", 742, 72, 28, WHITE);
    endMode2D();

    if (shader) beginShaderMode(shader);
    if (texture) {
        drawTexture(texture, 920, 24, WHITE);
        drawTextureEx(texture, new Vector2(1060, 64), t * 30, 0.4, WHITE);
        drawTextureRec(texture, new Rectangle(0, 0, 96, 96), new Vector2(920, 200), WHITE);
        drawTexturePro(texture, new Rectangle(0, 0, 128, 128), new Rectangle(1090, 220, 120, 120), new Vector2(60, 60), t * 20, WHITE);
    }
    if (renderTexture) {
        const src = new Rectangle(0, 0, renderTexture.texture.width, -renderTexture.texture.height);
        drawTextureRec(renderTexture.texture, src, new Vector2(930, 360), WHITE);
    }
    if (shader) endShaderMode();

    beginMode3D(camera3D);
    drawGrid(10, 1.0);
    drawCube(new Vector3(0, 1, 0), 1, 1, 1, RED);
    drawCubeWires(new Vector3(0, 1, 0), 1, 1, 1, WHITE);
    drawSphere(new Vector3(-2, 1, 0), 0.8, SKYBLUE);
    drawCylinder(new Vector3(2, 1, 0), 0.5, 0.5, 1.8, 16, GREEN);
    drawCapsule(new Vector3(-3, 0.5, 2), new Vector3(-3, 1.8, 2), 0.35, 8, 8, ORANGE);
    callOptional("drawTriangleStrip3D", strip3D, 5, PURPLE);

    if (modelFromMesh) {
        drawModel(modelFromMesh, new Vector3(0, 0.6, -2.5), 1.0, WHITE);
        drawModelWires(modelFromMesh, new Vector3(0, 0.6, -2.5), 1.0, BLACK);
        drawModelPoints(modelFromMesh, new Vector3(0, 0.6, -2.5), 1.0, YELLOW);
        drawModelEx(modelFromMesh, new Vector3(1.7, 0.6, -2.5), new Vector3(0, 1, 0), t * 30, new Vector3(1, 1, 1), WHITE);
        drawModelWiresEx(modelFromMesh, new Vector3(-1.7, 0.6, -2.5), new Vector3(0, 1, 0), t * -30, new Vector3(1, 1, 1), BLACK);
    }
    if (modelFromFile) {
        drawModel(modelFromFile, new Vector3(3.0, 0.0, -1.5), 1.0, WHITE);
        const box = getModelBoundingBox(modelFromFile);
        drawBoundingBox(box, GREEN);
    }
    if (meshA && defaultMaterial) drawMesh(meshA, defaultMaterial, matrixTranslate(-2, 1.0, -1));
    endMode3D();

    drawFPS(16, 12);
    drawText("rayjs binding full smoke", 16, 36, 20, RAYWHITE);
    drawText(`frame: ${frame}/${MAX_FRAMES}`, 16, 62, 18, LIGHTGRAY);
    drawText(`tests: ${stats.total}`, 16, 88, 18, LIGHTGRAY);
    drawText(`pass: ${stats.pass}`, 16, 112, 18, GREEN);
    drawText(`fail: ${stats.fail}`, 16, 136, 18, stats.fail > 0 ? RED : GREEN);
    if (joined !== null) drawText(`textJoin: ${joined}`, 16, 164, 18, LIGHTGRAY);
    if (splitArr) drawText(`textSplit count: ${splitOut.count}`, 16, 188, 18, LIGHTGRAY);
    drawText(`textAppend: ${dstText.text} @${appendPos.position}`, 16, 212, 18, LIGHTGRAY);

    {
        const v = callOptional("guiCheckBox", new Rectangle(16, 250, 20, 20), "Check", guiChecked);
        if (typeof v === "boolean") guiChecked = v;
    }
    {
        const v = callOptional("guiSlider", new Rectangle(16, 282, 240, 20), "L", "R", guiSliderValue, 0.0, 1.0);
        if (typeof v === "number") guiSliderValue = v;
    }
    {
        const v = callOptional("guiSliderBar", new Rectangle(16, 310, 240, 18), "A", "B", guiSliderBarValue, 0.0, 1.0);
        if (typeof v === "number") guiSliderBarValue = v;
    }
    {
        const v = callOptional("guiProgressBar", new Rectangle(16, 336, 240, 18), "P", "", guiProgress, 0.0, 1.0);
        if (typeof v === "number") guiProgress = v;
    }
    callOptional("guiDropdownBox", new Rectangle(16, 362, 180, 24), "A;B;C", guiDropdownActive, false);
    callOptional("guiSpinner", new Rectangle(16, 392, 180, 24), "Spin", guiSpinnerValue, 0, 100, false);
    callOptional("guiValueBox", new Rectangle(16, 422, 180, 24), "Value", guiValueBoxValue, 0, 100, false);
    callOptional("guiTextBox", new Rectangle(16, 452, 180, 24), guiTextState, false);
    callOptional("guiListView", new Rectangle(16, 482, 180, 60), "One;Two;Three;Four;Five", guiListScroll, 1);
    callOptional("guiLabel", new Rectangle(216, 362, 210, 24), "raygui smoke");
    {
        const v = callOptional("guiColorPicker", new Rectangle(216, 392, 120, 120), "Color", guiColor);
        if (v) guiColor = v;
    }
    {
        const v = callOptional("guiColorBarAlpha", new Rectangle(216, 520, 120, 16), "A", guiAlpha);
        if (typeof v === "number") guiAlpha = v;
    }
    {
        const v = callOptional("guiColorBarHue", new Rectangle(216, 542, 120, 16), "H", guiHue);
        if (typeof v === "number") guiHue = v;
    }
    callOptional("guiGrid", new Rectangle(360, 392, 180, 166), "", 12, 4);

    endDrawing();
}

// Cleanup (reverse-ish order).
for (let i = 0; i < resources.streams.length; i++) safe(`unloadAudioStream[${i}]`, () => unloadAudioStream(resources.streams[i]));
for (let i = 0; i < resources.musics.length; i++) safe(`unloadMusicStream[${i}]`, () => unloadMusicStream(resources.musics[i]));
for (let i = 0; i < resources.soundAliases.length; i++) safe(`unloadSoundAlias[${i}]`, () => unloadSoundAlias(resources.soundAliases[i]));
for (let i = 0; i < resources.sounds.length; i++) safe(`unloadSound[${i}]`, () => unloadSound(resources.sounds[i]));
for (let i = 0; i < resources.waves.length; i++) safe(`unloadWave[${i}]`, () => unloadWave(resources.waves[i]));
safe("closeAudioDevice", () => closeAudioDevice());

for (let i = 0; i < resources.shaders.length; i++) safe(`unloadShader[${i}]`, () => unloadShader(resources.shaders[i]));
for (let i = 0; i < resources.fonts.length; i++) safe(`unloadFont[${i}]`, () => unloadFont(resources.fonts[i]));
for (let i = 0; i < resources.renderTextures.length; i++) safe(`unloadRenderTexture[${i}]`, () => unloadRenderTexture(resources.renderTextures[i]));
for (let i = 0; i < resources.textures.length; i++) safe(`unloadTexture[${i}]`, () => unloadTexture(resources.textures[i]));
for (let i = 0; i < resources.images.length; i++) safe(`unloadImage[${i}]`, () => unloadImage(resources.images[i]));

traceLog(LOG_INFO, `${LOG_PREFIX} done: total=${stats.total}, pass=${stats.pass}, fail=${stats.fail}`);
if (stats.errors.length > 0) {
    traceLog(LOG_WARNING, `${LOG_PREFIX} first error: ${stats.errors[0]}`);
}

closeWindow();
