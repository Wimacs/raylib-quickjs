import { readFileSync, writeFileSync } from "fs";
import { RayLibApi, RayLibFunction, RayLibStruct } from "./interfaces";
import { RayLibHeader } from "./raylib-header";
import { HeaderParser } from "./header-parser";
import { RayLibAlias } from "./interfaces";
import { QuickJsGenerator } from "./quickjs";

let api: RayLibApi

function getFunction(funList: RayLibFunction[], name: string){
    return funList.find(x => x.name === name) 
}

function getStruct(strList: RayLibStruct[], name: string){
    return strList.find(x => x.name === name) 
}

function getAliases(aliasList: RayLibAlias[], name: string) {
    return aliasList.filter(x => x.type === name).map(x => x.name)
}

function ignore(name: string){
    const fn = getFunction(api.functions, name)
    if (!fn) {
        console.warn(`[bindings] Skip ignore for missing function: ${name}`)
        return
    }
    fn.binding = { ignore: true }
}

function main(){
     
    // Load the pre-generated raylib api
    api = <RayLibApi>JSON.parse(readFileSync("thirdparty/raylib/parser/output/raylib_api.json", 'utf8'))

    const parser = new HeaderParser()
    
    const rmathHeader = readFileSync("thirdparty/raylib/src/raymath.h","utf8");
    const mathApi = parser.parseFunctions(rmathHeader)
    mathApi.forEach(x => api.functions.push(x))
    
    const rcameraHeader = readFileSync("thirdparty/raylib/src/rcamera.h","utf8");
    const cameraApi = parser.parseFunctionDefinitions(rcameraHeader);
    cameraApi.forEach(x => api.functions.push(x))
    
    const rguiHeader = readFileSync("thirdparty/raygui/src/raygui.h","utf8");
    const rguiFunctions = parser.parseFunctionDefinitions(rguiHeader);
    const rguiEnums = parser.parseEnums(rguiHeader);
    //rguiApi.forEach(x => console.log(`core.addApiFunctionByName("${x.name}")`))
    rguiFunctions.forEach(x => api.functions.push(x))
    rguiEnums.forEach(x => api.enums.push(x))
    
    const rlightsHeader = readFileSync("include/rlights.h","utf8");
    const rlightsFunctions = parser.parseFunctions(rlightsHeader, true);
    api.functions.push(rlightsFunctions[0])
    api.functions.push(rlightsFunctions[1])
    const rlightsEnums = parser.parseEnums(rlightsHeader)
    rlightsEnums.forEach(x => api.enums.push(x))
    const rlightsStructs = parser.parseStructs(rlightsHeader)
    rlightsStructs[0].binding = {
        properties: {
            type: { get: true, set: true },
            enabled: { get: true, set: true },
            position: { get: true, set: true },
            target: { get: true, set: true },
            color: { get: true, set: true },
            attenuation: { get: true, set: true },
        },
    }
    api.structs.push(rlightsStructs[0])

    const reasingsHeader = readFileSync("include/reasings.h","utf8");
    const reasingsFunctions = parser.parseFunctions(reasingsHeader);
    reasingsFunctions.forEach(x => api.functions.push(x))

    const rlightmapperHeader = readFileSync("src/rlightmapper.h", "utf8");
    const rlightmapperFunctions = parser.parseFunctionDefinitions(rlightmapperHeader);
    const rlightmapperStructs = parser.parseStructs(rlightmapperHeader);
    rlightmapperFunctions.forEach(x => api.functions.push(x));
    rlightmapperStructs.forEach(x => api.structs.push(x));
    rlightmapperStructs[0].binding = {
        properties: {
            w: { get: true },
            h: { get: true },
            progress: { get: true }
        }
    }
    rlightmapperStructs[1].binding = {
        properties: {
            hemisphereSize: { get: true, set: true },
            zNear: { get: true, set: true },
            zFar: { get: true, set: true },
            backgroundColor: { get: true, set: true },
            interpolationPasses: { get: true, set: true },
            interpolationThreshold: { get: true, set: true },
            cameraToSurfaceDistanceModifier: { get: true, set: true },
        }
    }

    const rextensionsHeader = readFileSync("src/rextensions.h","utf8");
    const rextensionsFunctions = parser.parseFunctionDefinitions(rextensionsHeader);
    console.log(rextensionsFunctions);
    rextensionsFunctions.forEach(x => api.functions.push(x))

    // Define a new header
    const core = new RayLibHeader("raylib_core")
    core.includes.include("raymath.h")
    core.includes.include("rcamera.h")
    core.includes.line("#define RAYGUI_IMPLEMENTATION")
    core.includes.include("raygui.h")
    core.includes.line("#define RLIGHTS_IMPLEMENTATION")
    core.includes.include("rlights.h")
    core.includes.include("reasings.h")
    core.includes.line("#define RLIGHTMAPPER_IMPLEMENTATION")
    core.includes.include("rlightmapper.h")

    getStruct(api.structs, "Color")!.binding = {
        properties: {
            r: { get: true, set: true },
            g: { get: true, set: true },
            b: { get: true, set: true },
            a: { get: true, set: true },
        },
        createConstructor: true
    }
    getStruct(api.structs, "Rectangle")!.binding = {
        properties: {
            x: { get: true, set: true },
            y: { get: true, set: true },
            width: { get: true, set: true },
            height: { get: true, set: true },
        },
        createConstructor: true
    }    
    getStruct(api.structs, "Vector2")!.binding = {
        properties: {
            x: { get: true, set: true },
            y: { get: true, set: true },
        },
        createConstructor: true
    }
    getStruct(api.structs, "Vector3")!.binding = {
        properties: {
            x: { get: true, set: true },
            y: { get: true, set: true },
            z: { get: true, set: true },
        },
        createConstructor: true
    }
    getStruct(api.structs, "Vector4")!.binding = {
        properties: {
            x: { get: true, set: true },
            y: { get: true, set: true },
            z: { get: true, set: true },
            w: { get: true, set: true },
        },
        createConstructor: true,
        aliases: getAliases(api.aliases, "Vector4")
    }
    getStruct(api.structs, "Ray")!.binding = {
        properties: {
            position: { get: false, set: true },
            direction: { get: false, set: true },
        },
        createConstructor: true
    }
    getStruct(api.structs, "RayCollision")!.binding = {
        properties: {
            hit: { get: true, set: false },
            distance: { get: true, set: false },
            point: { get: true, set: false },
            normal: { get: true, set: false },
        },
        createConstructor: false
    }
    getStruct(api.structs, "Camera2D")!.binding = {
        properties: {
            offset: { get: true, set: true },
            target: { get: true, set: true },
            rotation: { get: true, set: true },
            zoom: { get: true, set: true },
        },
        createConstructor: true
    }
    getStruct(api.structs, "Camera3D")!.binding = {
        properties: {
            position: { get: true, set: true },
            target: { get: true, set: true },
            up: { get: false, set: true },
            fovy: { get: true, set: true },
            projection: { get: true, set: true },
        },
        createConstructor: true,
        aliases: getAliases(api.aliases, "Camera3D")
    }
    getStruct(api.structs, "BoundingBox")!.binding = {
        properties: {
            min: { get: true, set: true },
            max: { get: true, set: true },
        },
        createConstructor: true
    }
    getStruct(api.structs, "Matrix")!.binding = {
        properties: {},
        createConstructor: false
    }
    getStruct(api.structs, "NPatchInfo")!.binding = {
        properties: {
            source: { get: true, set: true },
            left: { get: true, set: true },
            top: { get: true, set: true },
            right: { get: true, set: true },
            bottom: { get: true, set: true },
            layout: { get: true, set: true },
        },
        createConstructor: true
    }
    getStruct(api.structs, "Image")!.binding = { 
        properties: { 
            data: { set: true },
            width: { get: true, set: true }, 
            height: { get: true, set: true },
            mipmaps: { get: true, set: true },
            format: { get: true, set: true }
        },
        createEmptyConstructor: true
        //destructor: "UnloadImage"
    }
    getStruct(api.structs, "Wave")!.binding = { 
        properties: { 
            frameCount: { get: true }, 
            sampleRate: { get: true },
            sampleSize: { get: true },
            channels: { get: true }
        },
        //destructor: "UnloadWave"
    }
    getStruct(api.structs, "Sound")!.binding = { 
        properties: { 
            frameCount: { get: true }
        },
        //destructor: "UnloadSound"
    }
    getStruct(api.structs, "Music")!.binding = { 
        properties: { 
            frameCount: { get: true },
            looping: { get: true, set: true },
            ctxType: { get: true },
        },
        //destructor: "UnloadMusicStream"
    }
    getStruct(api.structs, "Model")!.binding = { 
        properties: {
            transform: { get: true, set: true },
            meshCount: { get: true },
            materialCount: { get: true },
            boneCount: { get: true },
        },
        //destructor: "UnloadModel"
    }
    getStruct(api.structs, "Mesh")!.binding = { 
        properties: {
            vertexCount: { get: true, set: true },
            triangleCount: { get: true, set: true },
            // TODO: Free previous pointers before overwriting
            vertices: { set: true },
            texcoords: { set: true },
            texcoords2: { set: true },
            normals: { set: true },
            tangents: { set: true },
            colors: { set: true },
            indices: { set: true },
            animVertices: { set: true },
            animNormals: { set: true },
            boneIds: { set: true },
            boneWeights: { set: true },
        },
        createEmptyConstructor: true
        //destructor: "UnloadMesh"
    }
    getStruct(api.structs, "Shader")!.binding = { 
        properties: {
            id: { get: true }
        },
        //destructor: "UnloadShader"
    }
    getStruct(api.structs, "Texture")!.binding = { 
        properties: { 
            width: { get: true }, 
            height: { get: true },
            mipmaps: { get: true },
            format: { get: true },
        },
        aliases: getAliases(api.aliases, "Texture")
        //destructor: "UnloadTexture"
    }
    getStruct(api.structs, "Font")!.binding = { 
        properties: { 
            baseSize: { get: true },
            glyphCount: { get: true },
            glyphPadding: { get: true },
        },
        //destructor: "UnloadFont"
    }
    getStruct(api.structs, "RenderTexture")!.binding = { 
        properties: {
            id: { get: true },
            texture: { get: true },
            depth: { get: true },
        },
        aliases: getAliases(api.aliases, "RenderTexture")
        //destructor: "UnloadRenderTexture"
    }
    getStruct(api.structs, "MaterialMap")!.binding = { 
        properties: { 
            texture: { set: true },
            color: { set: true, get: true },
            value: { get: true, set: true }
        },
        //destructor: "UnloadMaterialMap"
    }
    getStruct(api.structs, "Material")!.binding = { 
        properties: { 
            shader: { get: true, set: true }
        },
        //destructor: "UnloadMaterial"
    }

    const structDI = getStruct(api.structs, "VrDeviceInfo")!
    const lensDistortionValuesField = structDI.fields.find(x => x.name === "lensDistortionValues")
    if (lensDistortionValuesField) lensDistortionValuesField.type = "Vector4"
    const vrProperties: Record<string, { set: boolean, get: boolean }> = {
        hResolution: { set: true, get: true },
        vResolution: { set: true, get: true },
        hScreenSize: { set: true, get: true },
        vScreenSize: { set: true, get: true },
        eyeToScreenDistance: { set: true, get: true },
        lensSeparationDistance: { set: true, get: true },
        interpupillaryDistance: { set: true, get: true },
    }
    if (structDI.fields.some(x => x.name === "vScreenCenter")) {
        vrProperties.vScreenCenter = { set: true, get: true }
    }
    structDI.binding = {
        createEmptyConstructor: true,
        properties: vrProperties
    }

    getFunction(api.functions, "EndDrawing")!.binding = { after: gen => gen.call("app_update_quickjs", []) }
    getFunction(api.functions, "SetWindowIcons")!.params![0].binding = { jsType: "Image[]" }
    getFunction(api.functions, "SetWindowIcons")!.params![1].binding = { ignore: true }
    getFunction(api.functions, "SetWindowIcons")!.binding = {
        body: gen => {
            gen.call("JS_GetPropertyStr", ["ctx", "argv[0]", "\"length\""], { name: "lengthJs", type: "JSValue" })
            gen.declare("count", "int", false, "0")
            gen.call("JS_ToInt32", ["ctx", "&count", "lengthJs"])
            gen.call("JS_FreeValue", ["ctx", "lengthJs"])
            gen.declare("icons", "Image *", false, "(Image *)malloc(sizeof(Image) * (count > 0 ? count : 1))")
            gen.if("icons == NULL").returnExp("JS_EXCEPTION")
            gen.line("for(int i = 0; i < count; i++) {")
            gen.indent()
            gen.call("JS_GetPropertyUint32", ["ctx", "argv[0]", "i"], { name: "iconJs", type: "JSValue" })
            gen.jsOpqToStructPtr("Image", "iconPtr", "iconJs", core.structLookup["Image"])
            const invalidIcon = gen.if("iconPtr == NULL")
            invalidIcon.call("JS_FreeValue", ["ctx", "iconJs"])
            invalidIcon.call("free", ["icons"])
            invalidIcon.returnExp("JS_EXCEPTION")
            gen.statement("icons[i] = *iconPtr")
            gen.call("JS_FreeValue", ["ctx", "iconJs"])
            gen.unindent()
            gen.line("}")
            gen.call("SetWindowIcons", ["icons", "count"])
            gen.call("free", ["icons"])
            gen.returnExp("JS_UNDEFINED")
        }
    }
    getFunction(api.functions, "GetWindowHandle")!.binding = { jsReturns: "any", body: gen => gen.returnExp("JS_NULL") }

    // Custom frame control functions are exposed for advanced frame-loop control.
    
    //ignore("BeginVrStereoMode")
    //ignore("EndVrStereoMode")
    //ignore("LoadVrStereoConfig")
    //ignore("UnloadVrStereoConfig")
    
    getFunction(api.functions, "SetShaderValue")!.binding = { body: (gen) => {
        gen.jsToC("Shader","shader","argv[0]", core.structLookup)
        gen.jsToC("int","locIndex","argv[1]", core.structLookup)
        gen.declare("value","void *", false, "NULL")
        gen.declare("valueFloat", "float")
        gen.declare("valueInt", "int")
        gen.jsToC("int","uniformType","argv[3]", core.structLookup)
        const sw = gen.switch("uniformType")
        let b = sw.caseBreak("SHADER_UNIFORM_FLOAT")
        b.jsToC("float", "valueFloat", "argv[2]", core.structLookup, true)
        b.statement("value = (void *)&valueFloat")
        b = sw.caseBreak("SHADER_UNIFORM_VEC2")
        b.jsToC("Vector2 *", "valueV2", "argv[2]", core.structLookup)
        b.statement("value = (void*)valueV2")
        b = sw.caseBreak("SHADER_UNIFORM_VEC3")
        b.jsToC("Vector3 *", "valueV3", "argv[2]", core.structLookup)
        b.statement("value = (void*)valueV3")
        b = sw.caseBreak("SHADER_UNIFORM_VEC4")
        b.jsToC("Vector4 *", "valueV4", "argv[2]", core.structLookup)
        b.statement("value = (void*)valueV4")
        b = sw.caseBreak("SHADER_UNIFORM_INT")
        b.jsToC("int", "valueInt", "argv[2]", core.structLookup, true)
        b.statement("value = (void*)&valueInt")
        b = sw.defaultBreak()
        b.returnExp("JS_EXCEPTION")
        gen.call("SetShaderValue", ["shader","locIndex","value","uniformType"])
        gen.returnExp("JS_UNDEFINED")
    }} 
    getFunction(api.functions, "SetShaderValueV")!.params![2].binding = { typeAlias: "const void *", jsType: "ArrayBuffer" }

    const traceLog = getFunction(api.functions, "TraceLog")!
    traceLog.params?.pop()

    // Memory/random helpers exposed as JS ArrayBuffer based compatibility shims.
    getFunction(api.functions, "MemAlloc")!.binding = {
        jsReturns: "ArrayBuffer | null",
        body: gen => {
            gen.jsToC("unsigned int", "size", "argv[0]", core.structLookup)
            gen.call("MemAlloc", ["size"], { type: "void *", name: "ptr" })
            gen.declare("ret", "JSValue", false, "JS_NULL")
            const hasPtr = gen.if("ptr != NULL")
            hasPtr.call("memset", ["ptr", "0", "size"])
            hasPtr.statement("ret = JS_NewArrayBufferCopy(ctx, (const uint8_t *)ptr, size)")
            hasPtr.call("MemFree", ["ptr"])
            gen.returnExp("ret")
        }
    }
    getFunction(api.functions, "MemRealloc")!.params![0].binding = { jsType: "ArrayBuffer" }
    getFunction(api.functions, "MemRealloc")!.binding = {
        jsReturns: "ArrayBuffer | null",
        body: gen => {
            gen.declare("oldSize", "size_t")
            gen.declare("oldJsPtr", "void *", false, "JS_GetArrayBuffer(ctx, &oldSize, argv[0])")
            gen.if("oldJsPtr == NULL").returnExp("JS_EXCEPTION")
            gen.jsToC("unsigned int", "size", "argv[1]", core.structLookup)
            gen.call("MemAlloc", ["(unsigned int)oldSize"], { type: "void *", name: "oldPtr" })
            gen.if("oldPtr == NULL").returnExp("JS_NULL")
            gen.call("memcpy", ["oldPtr", "oldJsPtr", "oldSize"])
            gen.call("MemRealloc", ["oldPtr", "size"], { type: "void *", name: "newPtr" })
            gen.declare("ret", "JSValue", false, "JS_NULL")
            const hasPtr = gen.if("newPtr != NULL")
            const clearTail = hasPtr.if("size > oldSize")
            clearTail.call("memset", ["((unsigned char *)newPtr) + oldSize", "0", "size - oldSize"])
            hasPtr.statement("ret = JS_NewArrayBufferCopy(ctx, (const uint8_t *)newPtr, size)")
            hasPtr.call("MemFree", ["newPtr"])
            gen.returnExp("ret")
        }
    }
    getFunction(api.functions, "MemFree")!.binding = { body: gen => gen.returnExp("JS_UNDEFINED"), jsReturns: "void" }
    getFunction(api.functions, "LoadRandomSequence")!.binding = {
        jsReturns: "ArrayBuffer | null",
        body: gen => {
            gen.jsToC("unsigned int", "count", "argv[0]", core.structLookup)
            gen.jsToC("int", "min", "argv[1]", core.structLookup)
            gen.jsToC("int", "max", "argv[2]", core.structLookup)
            gen.call("LoadRandomSequence", ["count", "min", "max"], { type: "int *", name: "sequence" })
            gen.declare("ret", "JSValue", false, "JS_NULL")
            const hasSequence = gen.if("sequence != NULL")
            hasSequence.statement("ret = JS_NewArrayBufferCopy(ctx, (const uint8_t *)sequence, count*sizeof(int))")
            hasSequence.call("UnloadRandomSequence", ["sequence"])
            gen.returnExp("ret")
        }
    }
    getFunction(api.functions, "UnloadRandomSequence")!.binding = { body: gen => gen.returnExp("JS_UNDEFINED"), jsReturns: "void" }
    
    // Callbacks not supported on JS
    getFunction(api.functions, "SetTraceLogCallback")!.params![0].binding = { jsType: "any" }
    getFunction(api.functions, "SetTraceLogCallback")!.binding = { body: gen => gen.returnExp("JS_UNDEFINED"), jsReturns: "void" }
    getFunction(api.functions, "SetLoadFileDataCallback")!.params![0].binding = { jsType: "any" }
    getFunction(api.functions, "SetLoadFileDataCallback")!.binding = { body: gen => gen.returnExp("JS_UNDEFINED"), jsReturns: "void" }
    getFunction(api.functions, "SetSaveFileDataCallback")!.params![0].binding = { jsType: "any" }
    getFunction(api.functions, "SetSaveFileDataCallback")!.binding = { body: gen => gen.returnExp("JS_UNDEFINED"), jsReturns: "void" }
    getFunction(api.functions, "SetLoadFileTextCallback")!.params![0].binding = { jsType: "any" }
    getFunction(api.functions, "SetLoadFileTextCallback")!.binding = { body: gen => gen.returnExp("JS_UNDEFINED"), jsReturns: "void" }
    getFunction(api.functions, "SetSaveFileTextCallback")!.params![0].binding = { jsType: "any" }
    getFunction(api.functions, "SetSaveFileTextCallback")!.binding = { body: gen => gen.returnExp("JS_UNDEFINED"), jsReturns: "void" }

    // Files management functions
    const lfd = getFunction(api.functions, "LoadFileData")!
    lfd.params![lfd.params!.length-1].binding = { ignore: true }
    lfd.binding = {
        body: gen => {
            gen.jsToC("const char *", "fileName", "argv[0]")
            gen.declare("bytesRead", "int")
            gen.call("LoadFileData", ["fileName", "&bytesRead"], { type: "unsigned char *", name: "retVal" })
            gen.statement("JSValue buffer = JS_NewArrayBufferCopy(ctx, (const uint8_t*)retVal, bytesRead)")
            gen.call("UnloadFileData", ["retVal"])
            gen.jsCleanUpParameter("const char*","fileName")
            gen.returnExp("buffer")
        } 
    }
    getFunction(api.functions, "UnloadFileData")!.binding = { body: gen => gen.returnExp("JS_UNDEFINED"), jsReturns: "void" }
    
    // TODO: SaveFileData works but unnecessary makes copy of memory
    getFunction(api.functions, "SaveFileData")!.binding = { }
    getFunction(api.functions, "ExportDataAsCode")!.params![1].binding = { ignore: true }
    getFunction(api.functions, "ExportDataAsCode")!.binding = {
        body: gen => {
            gen.jsToC("const unsigned char *", "data", "argv[0]")
            gen.jsToC("const char *", "fileName", "argv[1]")
            gen.call("ExportDataAsCode", ["data", "(int)data_size", "fileName"], { type: "bool", name: "returnVal" })
            gen.jsCleanUpParameter("const unsigned char *", "data")
            gen.jsCleanUpParameter("const char *", "fileName")
            gen.jsToJs("bool", "ret", "returnVal", core.structLookup)
            gen.returnExp("ret")
        }
    }
    getFunction(api.functions, "LoadFileText")!.binding = { after: gen => gen.call("UnloadFileText", ["returnVal"]) } 
    getFunction(api.functions, "SaveFileText")!.params![1].binding = { typeAlias: "const char *" } 
    getFunction(api.functions, "UnloadFileText")!.binding = { body: gen => gen.returnExp("JS_UNDEFINED"), jsReturns: "void" }
    
    const createFileList = (gen: QuickJsGenerator, loadName: string, unloadName: string, args: string[]) => {
        gen.call(loadName, args, { type: "FilePathList", name: "files" })
        gen.call("JS_NewArray", ["ctx"], { type: "JSValue", name:"ret"})
        const f = gen.for("i", "files.count")
        f.call("JS_SetPropertyUint32", ["ctx","ret", "i", "JS_NewString(ctx,files.paths[i])"])
        gen.call(unloadName, ["files"])
    }
    getFunction(api.functions, "LoadDirectoryFiles")!.binding = { 
        jsReturns: "string[]",
        body: gen => {
            gen.jsToC("const char *", "dirPath", "argv[0]")
            createFileList(gen, "LoadDirectoryFiles", "UnloadDirectoryFiles", ["dirPath"])
            gen.jsCleanUpParameter("const char *", "dirPath")
            gen.returnExp("ret")
        }
    }
    getFunction(api.functions, "LoadDirectoryFilesEx")!.binding = { 
        jsReturns: "string[]",
        body: gen => {
            gen.jsToC("const char *", "basePath", "argv[0]")
            gen.jsToC("const char *", "filter", "argv[1]")
            gen.jsToC("bool", "scanSubdirs", "argv[2]")
            createFileList(gen, "LoadDirectoryFilesEx", "UnloadDirectoryFiles", ["basePath", "filter", "scanSubdirs"])
            gen.jsCleanUpParameter("const char *", "basePath")
            gen.jsCleanUpParameter("const char *", "filter")
            gen.returnExp("ret")
        }
    }
    getFunction(api.functions, "UnloadDirectoryFiles")!.binding = { body: gen => gen.returnExp("JS_UNDEFINED"), jsReturns: "void" }
    getFunction(api.functions, "LoadDroppedFiles")!.binding = { 
        jsReturns: "string[]",
        body: gen => { 
            createFileList(gen, "LoadDroppedFiles", "UnloadDroppedFiles", [])
            gen.returnExp("ret")
        }
    }
    getFunction(api.functions, "UnloadDroppedFiles")!.binding = { body: gen => gen.returnExp("JS_UNDEFINED"), jsReturns: "void" }
    
    // Compression/encoding functionality
    getFunction(api.functions, "CompressData")!.params![1].binding = { ignore: true }
    getFunction(api.functions, "CompressData")!.params![2].binding = { ignore: true }
    getFunction(api.functions, "CompressData")!.binding = {
        jsReturns: "ArrayBuffer | null",
        body: gen => {
            gen.jsToC("const unsigned char *", "data", "argv[0]")
            gen.declare("compDataSize", "int", false, "0")
            gen.call("CompressData", ["data", "(int)data_size", "&compDataSize"], { type: "unsigned char *", name: "compData" })
            gen.declare("ret", "JSValue", false, "JS_NULL")
            const hasData = gen.if("compData != NULL")
            hasData.statement("ret = JS_NewArrayBufferCopy(ctx, (const uint8_t *)compData, compDataSize)")
            hasData.call("MemFree", ["compData"])
            gen.jsCleanUpParameter("const unsigned char *", "data")
            gen.returnExp("ret")
        }
    }
    getFunction(api.functions, "DecompressData")!.params![1].binding = { ignore: true }
    getFunction(api.functions, "DecompressData")!.params![2].binding = { ignore: true }
    getFunction(api.functions, "DecompressData")!.binding = {
        jsReturns: "ArrayBuffer | null",
        body: gen => {
            gen.jsToC("const unsigned char *", "compData", "argv[0]")
            gen.declare("dataSize", "int", false, "0")
            gen.call("DecompressData", ["compData", "(int)compData_size", "&dataSize"], { type: "unsigned char *", name: "data" })
            gen.declare("ret", "JSValue", false, "JS_NULL")
            const hasData = gen.if("data != NULL")
            hasData.statement("ret = JS_NewArrayBufferCopy(ctx, (const uint8_t *)data, dataSize)")
            hasData.call("MemFree", ["data"])
            gen.jsCleanUpParameter("const unsigned char *", "compData")
            gen.returnExp("ret")
        }
    }
    getFunction(api.functions, "EncodeDataBase64")!.params![1].binding = { ignore: true }
    getFunction(api.functions, "EncodeDataBase64")!.params![2].binding = { ignore: true }
    getFunction(api.functions, "EncodeDataBase64")!.binding = {
        jsReturns: "string | null",
        body: gen => {
            gen.jsToC("const unsigned char *", "data", "argv[0]")
            gen.declare("outputSize", "int", false, "0")
            gen.call("EncodeDataBase64", ["data", "(int)data_size", "&outputSize"], { type: "char *", name: "encodedData" })
            gen.declare("ret", "JSValue", false, "JS_NULL")
            const hasText = gen.if("encodedData != NULL")
            hasText.statement("ret = JS_NewStringLen(ctx, encodedData, outputSize)")
            hasText.call("MemFree", ["encodedData"])
            gen.jsCleanUpParameter("const unsigned char *", "data")
            gen.returnExp("ret")
        }
    }
    getFunction(api.functions, "DecodeDataBase64")!.params![0].binding = { jsType: "string | null | undefined" }
    getFunction(api.functions, "DecodeDataBase64")!.params![1].binding = { ignore: true }
    getFunction(api.functions, "DecodeDataBase64")!.binding = {
        jsReturns: "ArrayBuffer | null",
        body: gen => {
            gen.jsToC("const char *", "base64Data", "argv[0]")
            gen.declare("outputSize", "int", false, "0")
            gen.call("DecodeDataBase64", ["(const unsigned char *)base64Data", "&outputSize"], { type: "unsigned char *", name: "decodedData" })
            gen.declare("ret", "JSValue", false, "JS_NULL")
            const hasData = gen.if("decodedData != NULL")
            hasData.statement("ret = JS_NewArrayBufferCopy(ctx, (const uint8_t *)decodedData, outputSize)")
            hasData.call("MemFree", ["decodedData"])
            gen.jsCleanUpParameter("const char *", "base64Data")
            gen.returnExp("ret")
        }
    }
    getFunction(api.functions, "ComputeMD5")!.params![1].binding = { ignore: true }
    getFunction(api.functions, "ComputeMD5")!.binding = {
        jsReturns: "ArrayBuffer",
        body: gen => {
            gen.jsToC("unsigned char *", "data", "argv[0]")
            gen.call("ComputeMD5", ["data", "(int)data_size"], { type: "unsigned int *", name: "hash" })
            gen.statement("JSValue ret = JS_NewArrayBufferCopy(ctx, (const uint8_t *)hash, 4*sizeof(unsigned int))")
            gen.jsCleanUpParameter("unsigned char *", "data")
            gen.returnExp("ret")
        }
    }
    getFunction(api.functions, "ComputeSHA1")!.params![1].binding = { ignore: true }
    getFunction(api.functions, "ComputeSHA1")!.binding = {
        jsReturns: "ArrayBuffer",
        body: gen => {
            gen.jsToC("unsigned char *", "data", "argv[0]")
            gen.call("ComputeSHA1", ["data", "(int)data_size"], { type: "unsigned int *", name: "hash" })
            gen.statement("JSValue ret = JS_NewArrayBufferCopy(ctx, (const uint8_t *)hash, 5*sizeof(unsigned int))")
            gen.jsCleanUpParameter("unsigned char *", "data")
            gen.returnExp("ret")
        }
    }

    const bindVector2DrawCall = (name: string) => {
        getFunction(api.functions, name)!.params![0].binding = { jsType: "ArrayBuffer" }
        getFunction(api.functions, name)!.binding = {
            body: gen => {
                gen.declare("pointsSize", "size_t")
                gen.declare("pointsBuffer", "void *", false, "JS_GetArrayBuffer(ctx, &pointsSize, argv[0])")
                gen.if("pointsBuffer == NULL").returnExp("JS_EXCEPTION")
                gen.declare("points", "const Vector2 *", false, "(const Vector2 *)pointsBuffer")
                gen.jsToC("int", "pointCount", "argv[1]", core.structLookup)
                gen.jsToC("Color", "color", "argv[2]", core.structLookup)
                gen.if("pointsSize < ((size_t)pointCount*sizeof(Vector2))").returnExp("JS_EXCEPTION")
                gen.call(name, ["points", "pointCount", "color"])
                gen.returnExp("JS_UNDEFINED")
            }
        }
    }
    bindVector2DrawCall("DrawLineStrip")
    bindVector2DrawCall("DrawTriangleFan")
    bindVector2DrawCall("DrawTriangleStrip")

    getFunction(api.functions, "CheckCollisionPointPoly")!.params![1].binding = { jsType: "ArrayBuffer" }
    getFunction(api.functions, "CheckCollisionPointPoly")!.binding = {
        body: gen => {
            gen.jsToC("Vector2", "point", "argv[0]", core.structLookup)
            gen.declare("pointsSize", "size_t")
            gen.declare("pointsBuffer", "void *", false, "JS_GetArrayBuffer(ctx, &pointsSize, argv[1])")
            gen.if("pointsBuffer == NULL").returnExp("JS_EXCEPTION")
            gen.declare("points", "const Vector2 *", false, "(const Vector2 *)pointsBuffer")
            gen.jsToC("int", "pointCount", "argv[2]", core.structLookup)
            gen.if("pointsSize < ((size_t)pointCount*sizeof(Vector2))").returnExp("JS_EXCEPTION")
            gen.call("CheckCollisionPointPoly", ["point", "points", "pointCount"], { type: "bool", name: "returnVal" })
            gen.jsToJs("bool", "ret", "returnVal", core.structLookup)
            gen.returnExp("ret")
        }
    }
    getFunction(api.functions, "CheckCollisionLines")!.params![4].binding = { jsType: "{ x: number, y: number } | null | undefined" }
    getFunction(api.functions, "CheckCollisionLines")!.binding = {
        body: gen => {
            gen.jsToC("Vector2", "startPos1", "argv[0]", core.structLookup)
            gen.jsToC("Vector2", "endPos1", "argv[1]", core.structLookup)
            gen.jsToC("Vector2", "startPos2", "argv[2]", core.structLookup)
            gen.jsToC("Vector2", "endPos2", "argv[3]", core.structLookup)
            gen.statement("bool hasCollisionPoint = !JS_IsNull(argv[4]) && !JS_IsUndefined(argv[4])")
            gen.declare("collisionPoint", "Vector2")
            gen.declare("collisionPointPtr", "Vector2 *", false, "hasCollisionPoint ? &collisionPoint : NULL")
            gen.call("CheckCollisionLines", ["startPos1", "endPos1", "startPos2", "endPos2", "collisionPointPtr"], { type: "bool", name: "hit" })
            const hasPoint = gen.if("hasCollisionPoint")
            hasPoint.call("JS_SetPropertyStr", ["ctx", "argv[4]", "\"x\"", "JS_NewFloat64(ctx, collisionPoint.x)"])
            hasPoint.call("JS_SetPropertyStr", ["ctx", "argv[4]", "\"y\"", "JS_NewFloat64(ctx, collisionPoint.y)"])
            gen.jsToJs("bool", "ret", "hit", core.structLookup)
            gen.returnExp("ret")
        }
    }
    // LoadImageAnim/LoadImageAnimFromMemory expose frames as out-parameter object: { frames: number }
    getFunction(api.functions, "ExportImageAsCode")!.binding = {}

    getFunction(api.functions, "LoadImageAnim")!.params![1].binding = { jsType: "{ frames: number } | null | undefined" }
    getFunction(api.functions, "LoadImageAnim")!.binding = {
        body: gen => {
            gen.jsToC("const char *", "fileName", "argv[0]")
            gen.declare("frames", "int", false, "0")
            gen.call("LoadImageAnim", ["fileName", "&frames"], { type: "Image", name: "returnVal" })
            gen.jsCleanUpParameter("const char *", "fileName")
            const hasFrames = gen.if("!JS_IsNull(argv[1]) && !JS_IsUndefined(argv[1])")
            hasFrames.call("JS_SetPropertyStr", ["ctx", "argv[1]", "\"frames\"", "JS_NewInt32(ctx, frames)"])
            gen.jsToJs("Image", "ret", "returnVal", core.structLookup)
            gen.returnExp("ret")
        }
    }
    getFunction(api.functions, "LoadImageAnimFromMemory")!.params![2].binding = { ignore: true }
    getFunction(api.functions, "LoadImageAnimFromMemory")!.params![3].binding = { jsType: "{ frames: number } | null | undefined" }
    getFunction(api.functions, "LoadImageAnimFromMemory")!.binding = {
        body: gen => {
            gen.jsToC("const char *", "fileType", "argv[0]")
            gen.jsToC("const unsigned char *", "fileData", "argv[1]")
            gen.declare("frames", "int", false, "0")
            gen.call("LoadImageAnimFromMemory", ["fileType", "fileData", "(int)fileData_size", "&frames"], { type: "Image", name: "returnVal" })
            gen.jsCleanUpParameter("const char *", "fileType")
            gen.jsCleanUpParameter("const unsigned char *", "fileData")
            const hasFrames = gen.if("!JS_IsNull(argv[2]) && !JS_IsUndefined(argv[2])")
            hasFrames.call("JS_SetPropertyStr", ["ctx", "argv[2]", "\"frames\"", "JS_NewInt32(ctx, frames)"])
            gen.jsToJs("Image", "ret", "returnVal", core.structLookup)
            gen.returnExp("ret")
        }
    }

    getFunction(api.functions, "LoadImageColors")!.binding = {
        jsReturns: "ArrayBuffer",
        body: gen => {
            gen.jsToC("Image","image","argv[0]", core.structLookup)
            gen.call("LoadImageColors", ["image"], {name:"colors",type:"Color *"})
            gen.statement("JSValue retVal = JS_NewArrayBufferCopy(ctx, (const uint8_t*)colors, image.width*image.height*sizeof(Color))")
            gen.call("UnloadImageColors", ["colors"])
            gen.returnExp("retVal")
        }
    }

    getFunction(api.functions, "ExportImageToMemory")!.params![2].binding = { ignore: true }
    getFunction(api.functions, "ExportImageToMemory")!.binding = {
        jsReturns: "ArrayBuffer | null",
        body: gen => {
            gen.jsToC("Image", "image", "argv[0]", core.structLookup)
            gen.jsToC("const char *", "fileType", "argv[1]")
            gen.declare("fileSize", "int", false, "0")
            gen.call("ExportImageToMemory", ["image", "fileType", "&fileSize"], { type: "unsigned char *", name: "data" })
            gen.declare("ret", "JSValue", false, "JS_NULL")
            const hasData = gen.if("data != NULL")
            hasData.statement("ret = JS_NewArrayBufferCopy(ctx, (const uint8_t *)data, fileSize)")
            hasData.call("MemFree", ["data"])
            gen.jsCleanUpParameter("const char *", "fileType")
            gen.returnExp("ret")
        }
    }

    getFunction(api.functions, "LoadImagePalette")!.params![2].binding = { jsType: "{ colorCount: number } | null | undefined" }
    getFunction(api.functions, "LoadImagePalette")!.binding = {
        jsReturns: "ArrayBuffer | null",
        body: gen => {
            gen.jsToC("Image", "image", "argv[0]", core.structLookup)
            gen.jsToC("int", "maxPaletteSize", "argv[1]", core.structLookup)
            gen.declare("colorCount", "int", false, "0")
            gen.call("LoadImagePalette", ["image", "maxPaletteSize", "&colorCount"], { name: "colors", type: "Color *" })
            gen.declare("ret", "JSValue", false, "JS_NULL")
            const hasColors = gen.if("colors != NULL")
            hasColors.statement("ret = JS_NewArrayBufferCopy(ctx, (const uint8_t*)colors, colorCount*sizeof(Color))")
            hasColors.call("UnloadImagePalette", ["colors"])
            const hasCount = gen.if("!JS_IsNull(argv[2]) && !JS_IsUndefined(argv[2])")
            hasCount.call("JS_SetPropertyStr", ["ctx", "argv[2]", "\"colorCount\"", "JS_NewInt32(ctx, colorCount)"])
            gen.returnExp("ret")
        }
    }
    getFunction(api.functions, "UnloadImageColors")!.binding = { body: gen => gen.returnExp("JS_UNDEFINED"), jsReturns: "void" }
    getFunction(api.functions, "UnloadImagePalette")!.binding = { body: gen => gen.returnExp("JS_UNDEFINED"), jsReturns: "void" }
    getFunction(api.functions, "GetPixelColor")!.binding = {
        body: gen => {
            gen.declare("srcSize", "size_t")
            gen.declare("srcPtr", "void *", false, "JS_GetArrayBuffer(ctx, &srcSize, argv[0])")
            gen.if("srcPtr == NULL").returnExp("JS_EXCEPTION")
            gen.jsToC("int", "format", "argv[1]", core.structLookup)
            gen.call("GetPixelDataSize", ["1", "1", "format"], { type: "int", name: "requiredSize" })
            gen.if("srcSize < (size_t)requiredSize").returnExp("JS_EXCEPTION")
            gen.call("GetPixelColor", ["srcPtr", "format"], { type: "Color", name: "returnVal" })
            gen.jsToJs("Color", "ret", "returnVal", core.structLookup)
            gen.returnExp("ret")
        }
    }
    getFunction(api.functions, "SetPixelColor")!.binding = {
        body: gen => {
            gen.declare("dstSize", "size_t")
            gen.declare("dstPtr", "void *", false, "JS_GetArrayBuffer(ctx, &dstSize, argv[0])")
            gen.if("dstPtr == NULL").returnExp("JS_EXCEPTION")
            gen.jsToC("Color", "color", "argv[1]", core.structLookup)
            gen.jsToC("int", "format", "argv[2]", core.structLookup)
            gen.call("GetPixelDataSize", ["1", "1", "format"], { type: "int", name: "requiredSize" })
            gen.if("dstSize < (size_t)requiredSize").returnExp("JS_EXCEPTION")
            gen.call("SetPixelColor", ["dstPtr", "color", "format"])
            gen.returnExp("JS_UNDEFINED")
        }
    }
    getFunction(api.functions, "ImageKernelConvolution")!.params![1].binding = { typeAlias: "float *", jsType: "ArrayBuffer" }

    const lfx = getFunction(api.functions, "LoadFontEx")!
    lfx.params![2].binding = { ignore: true }
    lfx.params![3].binding = { ignore: true }
    lfx.binding = { customizeCall: "Font returnVal = LoadFontEx(fileName, fontSize, NULL, 0);" }

    const lffm = getFunction(api.functions, "LoadFontFromMemory")!
    lffm.params![2].binding = { ignore: true }
    lffm.params![4].binding = { ignore: true }
    lffm.params![5].binding = { ignore: true }
    lffm.binding = { customizeCall: "Font returnVal = LoadFontFromMemory(fileType, fileData, (int)fileData_size, fontSize, NULL, 0);" }
    const lfdData = getFunction(api.functions, "LoadFontData")!
    lfdData.params![1].binding = { ignore: true }
    lfdData.params![3].binding = { jsType: "ArrayBuffer | null | undefined" }
    lfdData.binding = {
        jsReturns: "GlyphInfo[] | null",
        body: gen => {
            gen.jsToC("const unsigned char *", "fileData", "argv[0]")
            gen.jsToC("int", "fontSize", "argv[1]")
            gen.jsToC("int", "codepointCount", "argv[3]")
            gen.declare("codepoints", "int *", false, "NULL")
            const hasCodepoints = gen.if("!JS_IsNull(argv[2]) && !JS_IsUndefined(argv[2])")
            hasCodepoints.declare("codepointsSize", "size_t")
            hasCodepoints.declare("codepointsBuffer", "void *", false, "JS_GetArrayBuffer(ctx, &codepointsSize, argv[2])")
            hasCodepoints.if("codepointsBuffer == NULL").returnExp("JS_EXCEPTION")
            hasCodepoints.if("codepointsSize < ((size_t)codepointCount*sizeof(int))").returnExp("JS_EXCEPTION")
            hasCodepoints.statement("codepoints = (int *)codepointsBuffer")
            gen.jsToC("int", "type", "argv[4]")
            gen.call("LoadFontData", ["fileData", "(int)fileData_size", "fontSize", "codepoints", "codepointCount", "type"], { type: "GlyphInfo *", name: "glyphs" })
            gen.jsCleanUpParameter("const unsigned char *", "fileData")
            gen.declare("ret", "JSValue", false, "JS_NULL")
            const hasGlyphs = gen.if("glyphs != NULL")
            hasGlyphs.statement("ret = JS_NewArray(ctx)")
            hasGlyphs.line("for(int i = 0; i < codepointCount; i++) {")
            hasGlyphs.indent()
            hasGlyphs.declare("glyph", "GlyphInfo", false, "glyphs[i]")
            hasGlyphs.jsToJs("GlyphInfo", "item", "glyph", core.structLookup)
            hasGlyphs.call("JS_SetPropertyUint32", ["ctx", "ret", "i", "item"])
            hasGlyphs.unindent()
            hasGlyphs.line("}")
            hasGlyphs.call("UnloadFontData", ["glyphs", "codepointCount"])
            gen.returnExp("ret")
        }
    }
    const gifa = getFunction(api.functions, "GenImageFontAtlas")!
    gifa.params![0].binding = { jsType: "GlyphInfo[]" }
    gifa.params![1].binding = { ignore: true }
    gifa.params![2].binding = { ignore: true }
    gifa.binding = {
        body: gen => {
            gen.call("JS_GetPropertyStr", ["ctx", "argv[0]", "\"length\""], { name: "lengthJs", type: "JSValue" })
            gen.declare("glyphCount", "int", false, "0")
            gen.call("JS_ToInt32", ["ctx", "&glyphCount", "lengthJs"])
            gen.call("JS_FreeValue", ["ctx", "lengthJs"])
            gen.declare("glyphs", "GlyphInfo *", false, "(GlyphInfo *)malloc(sizeof(GlyphInfo) * (glyphCount > 0 ? glyphCount : 1))")
            gen.if("glyphs == NULL").returnExp("JS_EXCEPTION")
            gen.line("for(int i = 0; i < glyphCount; i++) {")
            gen.indent()
            gen.call("JS_GetPropertyUint32", ["ctx", "argv[0]", "i"], { name: "glyphJs", type: "JSValue" })
            gen.jsOpqToStructPtr("GlyphInfo", "glyphPtr", "glyphJs", core.structLookup["GlyphInfo"])
            const invalidGlyph = gen.if("glyphPtr == NULL")
            invalidGlyph.call("JS_FreeValue", ["ctx", "glyphJs"])
            invalidGlyph.call("free", ["glyphs"])
            invalidGlyph.returnExp("JS_EXCEPTION")
            gen.statement("glyphs[i] = *glyphPtr")
            gen.call("JS_FreeValue", ["ctx", "glyphJs"])
            gen.unindent()
            gen.line("}")
            gen.jsToC("int", "fontSize", "argv[1]")
            gen.jsToC("int", "padding", "argv[2]")
            gen.jsToC("int", "packMethod", "argv[3]")
            gen.declare("glyphRecs", "Rectangle *", false, "NULL")
            gen.call("GenImageFontAtlas", ["glyphs", "&glyphRecs", "glyphCount", "fontSize", "padding", "packMethod"], { type: "Image", name: "returnVal" })
            gen.statement("if(glyphRecs != NULL) MemFree((void *)glyphRecs)")
            gen.call("free", ["glyphs"])
            gen.jsToJs("Image", "ret", "returnVal", core.structLookup)
            gen.returnExp("ret")
        }
    }
    getFunction(api.functions, "UnloadFontData")!.binding = { body: gen => gen.returnExp("JS_UNDEFINED"), jsReturns: "void" }
    getFunction(api.functions, "ExportFontAsCode")!.binding = {}
    getFunction(api.functions, "DrawTextCodepoints")!.params![1].binding = { jsType: "ArrayBuffer" }
    getFunction(api.functions, "DrawTextCodepoints")!.binding = {
        body: gen => {
            gen.jsToC("Font", "font", "argv[0]", core.structLookup)
            gen.declare("codepointsSize", "size_t")
            gen.declare("codepointsBuffer", "void *", false, "JS_GetArrayBuffer(ctx, &codepointsSize, argv[1])")
            gen.if("codepointsBuffer == NULL").returnExp("JS_EXCEPTION")
            gen.declare("codepoints", "const int *", false, "(const int *)codepointsBuffer")
            gen.jsToC("int", "codepointCount", "argv[2]", core.structLookup)
            gen.jsToC("Vector2", "position", "argv[3]", core.structLookup)
            gen.jsToC("float", "fontSize", "argv[4]", core.structLookup)
            gen.jsToC("float", "spacing", "argv[5]", core.structLookup)
            gen.jsToC("Color", "tint", "argv[6]", core.structLookup)
            gen.if("codepointsSize < ((size_t)codepointCount*sizeof(int))").returnExp("JS_EXCEPTION")
            gen.call("DrawTextCodepoints", ["font", "codepoints", "codepointCount", "position", "fontSize", "spacing", "tint"])
            gen.returnExp("JS_UNDEFINED")
        }
    }
    getFunction(api.functions, "GetGlyphInfo")!.binding = {}
    getFunction(api.functions, "LoadUTF8")!.params![0].binding = { jsType: "ArrayBuffer" }
    getFunction(api.functions, "LoadUTF8")!.binding = {
        jsReturns: "string | null",
        body: gen => {
            gen.declare("codepointsSize", "size_t")
            gen.declare("codepointsBuffer", "void *", false, "JS_GetArrayBuffer(ctx, &codepointsSize, argv[0])")
            gen.if("codepointsBuffer == NULL").returnExp("JS_EXCEPTION")
            gen.declare("codepoints", "const int *", false, "(const int *)codepointsBuffer")
            gen.jsToC("int", "length", "argv[1]", core.structLookup)
            gen.if("codepointsSize < ((size_t)length*sizeof(int))").returnExp("JS_EXCEPTION")
            gen.call("LoadUTF8", ["codepoints", "length"], { type: "char *", name: "text" })
            gen.declare("ret", "JSValue", false, "JS_NULL")
            const hasText = gen.if("text != NULL")
            hasText.statement("ret = JS_NewString(ctx, text)")
            hasText.call("UnloadUTF8", ["text"])
            gen.returnExp("ret")
        }
    }
    getFunction(api.functions, "UnloadUTF8")!.binding = { body: gen => gen.returnExp("JS_UNDEFINED"), jsReturns: "void" }
    getFunction(api.functions, "LoadCodepoints")!.params![1].binding = { jsType: "{ count: number } | null | undefined" }
    getFunction(api.functions, "LoadCodepoints")!.binding = {
        jsReturns: "ArrayBuffer | null",
        body: gen => {
            gen.jsToC("const char *", "text", "argv[0]")
            gen.declare("count", "int", false, "0")
            gen.call("LoadCodepoints", ["text", "&count"], { type: "int *", name: "codepoints" })
            gen.declare("ret", "JSValue", false, "JS_NULL")
            const hasCodepoints = gen.if("codepoints != NULL")
            hasCodepoints.statement("ret = JS_NewArrayBufferCopy(ctx, (const uint8_t *)codepoints, count*sizeof(int))")
            hasCodepoints.call("UnloadCodepoints", ["codepoints"])
            const hasCount = gen.if("!JS_IsNull(argv[1]) && !JS_IsUndefined(argv[1])")
            hasCount.call("JS_SetPropertyStr", ["ctx", "argv[1]", "\"count\"", "JS_NewInt32(ctx, count)"])
            gen.jsCleanUpParameter("const char *", "text")
            gen.returnExp("ret")
        }
    }
    getFunction(api.functions, "UnloadCodepoints")!.binding = { body: gen => gen.returnExp("JS_UNDEFINED"), jsReturns: "void" }
    getFunction(api.functions, "GetCodepointCount")!.binding = {}
    getFunction(api.functions, "GetCodepoint")!.binding = {}
    getFunction(api.functions, "GetCodepointNext")!.binding = {}
    getFunction(api.functions, "GetCodepointPrevious")!.binding = {}
    getFunction(api.functions, "CodepointToUTF8")!.binding = {}

    getFunction(api.functions, "TextCopy")!.params![0].binding = { jsType: "{ text: string } | null | undefined" }
    getFunction(api.functions, "TextCopy")!.binding = {
        body: gen => {
            gen.jsToC("const char *", "src", "argv[1]")
            const hasDst = gen.if("!JS_IsNull(argv[0]) && !JS_IsUndefined(argv[0])")
            hasDst.call("JS_SetPropertyStr", ["ctx", "argv[0]", "\"text\"", "JS_NewString(ctx, src ? src : \"\")"])
            gen.declare("bytes", "int", false, "src ? (int)strlen(src) : 0")
            gen.jsCleanUpParameter("const char *", "src")
            gen.jsToJs("int", "ret", "bytes", core.structLookup)
            gen.returnExp("ret")
        }
    }
    getFunction(api.functions, "TextFormat")!.params![1].binding = { ignore: true }
    getFunction(api.functions, "TextFormat")!.binding = {
        body: gen => {
            gen.jsToC("const char *", "text", "argv[0]")
            gen.declare("ret", "JSValue", false, "JS_NewString(ctx, text ? text : \"\")")
            gen.jsCleanUpParameter("const char *", "text")
            gen.returnExp("ret")
        }
    }
    getFunction(api.functions, "TextJoin")!.params![0].binding = { jsType: "string[]" }
    getFunction(api.functions, "TextJoin")!.params![1].binding = { ignore: true }
    getFunction(api.functions, "TextJoin")!.binding = {
        body: gen => {
            gen.declare("joinFn", "JSValue", false, "JS_GetPropertyStr(ctx, argv[0], \"join\")")
            gen.if("JS_IsException(joinFn)").returnExp("JS_EXCEPTION")
            gen.declare("joinArg", "JSValue", false, "argv[1]")
            gen.call("JS_Call", ["ctx", "joinFn", "argv[0]", "1", "&joinArg"], { type: "JSValue", name: "ret" })
            gen.call("JS_FreeValue", ["ctx", "joinFn"])
            gen.returnExp("ret")
        }
    }
    getFunction(api.functions, "TextSplit")!.params![1].binding = { jsType: "string | null | undefined" }
    getFunction(api.functions, "TextSplit")!.params![2].binding = { jsType: "{ count: number } | null | undefined" }
    getFunction(api.functions, "TextSplit")!.binding = {
        jsReturns: "string[]",
        body: gen => {
            gen.declare("splitFn", "JSValue", false, "JS_GetPropertyStr(ctx, argv[0], \"split\")")
            gen.if("JS_IsException(splitFn)").returnExp("JS_EXCEPTION")
            gen.declare("splitArg", "JSValue", false, "argv[1]")
            gen.call("JS_Call", ["ctx", "splitFn", "argv[0]", "1", "&splitArg"], { type: "JSValue", name: "ret" })
            gen.call("JS_FreeValue", ["ctx", "splitFn"])
            gen.if("JS_IsException(ret)").returnExp("JS_EXCEPTION")
            const hasCount = gen.if("!JS_IsNull(argv[2]) && !JS_IsUndefined(argv[2])")
            hasCount.call("JS_GetPropertyStr", ["ctx", "ret", "\"length\""], { name: "lengthJs", type: "JSValue" })
            hasCount.declare("count", "int", false, "0")
            hasCount.call("JS_ToInt32", ["ctx", "&count", "lengthJs"])
            hasCount.call("JS_FreeValue", ["ctx", "lengthJs"])
            hasCount.call("JS_SetPropertyStr", ["ctx", "argv[2]", "\"count\"", "JS_NewInt32(ctx, count)"])
            gen.returnExp("ret")
        }
    }
    getFunction(api.functions, "TextAppend")!.params![0].binding = { jsType: "{ text: string, position?: number } | null | undefined" }
    getFunction(api.functions, "TextAppend")!.params![2].binding = { jsType: "{ position: number } | null | undefined" }
    getFunction(api.functions, "TextAppend")!.binding = {
        body: gen => {
            gen.statement("const char *base = \"\"")
            gen.statement("bool baseOwned = false")
            gen.statement("JSValue textJs = JS_UNDEFINED")
            const hasTextObj = gen.if("!JS_IsNull(argv[0]) && !JS_IsUndefined(argv[0])")
            hasTextObj.statement("textJs = JS_GetPropertyStr(ctx, argv[0], \"text\")")
            hasTextObj.statement("if(!JS_IsNull(textJs) && !JS_IsUndefined(textJs)) { base = JS_ToCString(ctx, textJs); baseOwned = true; }")
            gen.jsToC("const char *", "append", "argv[1]")
            gen.declare("position", "int", false, "0")
            const hasPosArg = gen.if("!JS_IsNull(argv[2]) && !JS_IsUndefined(argv[2])")
            hasPosArg.call("JS_GetPropertyStr", ["ctx", "argv[2]", "\"position\""], { name: "positionJs", type: "JSValue" })
            hasPosArg.call("JS_ToInt32", ["ctx", "&position", "positionJs"])
            hasPosArg.call("JS_FreeValue", ["ctx", "positionJs"])
            gen.declare("baseLen", "int", false, "(int)strlen(base)")
            gen.if("position < 0").statement("position = 0")
            gen.if("position > baseLen").statement("position = baseLen")
            gen.declare("appendLen", "int", false, "append ? (int)strlen(append) : 0")
            gen.declare("newLen", "int", false, "baseLen + appendLen")
            gen.declare("merged", "char *", false, "(char *)malloc(newLen + 1)")
            gen.if("merged == NULL").returnExp("JS_EXCEPTION")
            gen.call("memcpy", ["merged", "base", "position"])
            gen.call("memcpy", ["merged + position", "append", "appendLen"])
            gen.call("memcpy", ["merged + position + appendLen", "base + position", "baseLen - position"])
            gen.statement("merged[newLen] = 0")
            const setText = gen.if("!JS_IsNull(argv[0]) && !JS_IsUndefined(argv[0])")
            setText.call("JS_SetPropertyStr", ["ctx", "argv[0]", "\"text\"", "JS_NewString(ctx, merged)"])
            gen.statement("position += appendLen")
            const setPos = gen.if("!JS_IsNull(argv[2]) && !JS_IsUndefined(argv[2])")
            setPos.call("JS_SetPropertyStr", ["ctx", "argv[2]", "\"position\"", "JS_NewInt32(ctx, position)"])
            gen.statement("if(baseOwned) JS_FreeCString(ctx, base)")
            gen.call("JS_FreeValue", ["ctx", "textJs"])
            gen.jsCleanUpParameter("const char *", "append")
            gen.statement("free(merged)")
            gen.returnExp("JS_UNDEFINED")
        }
    }
    getFunction(api.functions, "TextReplace")!.binding = { after: gen => gen.call("MemFree", ["(void *)returnVal"]) }
    getFunction(api.functions, "TextInsert")!.binding = { after: gen => gen.call("MemFree", ["(void *)returnVal"]) }

    getFunction(api.functions, "DrawTriangleStrip3D")!.params![0].binding = { jsType: "ArrayBuffer" }
    getFunction(api.functions, "DrawTriangleStrip3D")!.binding = {
        body: gen => {
            gen.declare("pointsSize", "size_t")
            gen.declare("pointsBuffer", "void *", false, "JS_GetArrayBuffer(ctx, &pointsSize, argv[0])")
            gen.if("pointsBuffer == NULL").returnExp("JS_EXCEPTION")
            gen.declare("points", "const Vector3 *", false, "(const Vector3 *)pointsBuffer")
            gen.jsToC("int", "pointCount", "argv[1]", core.structLookup)
            gen.jsToC("Color", "color", "argv[2]", core.structLookup)
            gen.if("pointsSize < ((size_t)pointCount*sizeof(Vector3))").returnExp("JS_EXCEPTION")
            gen.call("DrawTriangleStrip3D", ["points", "pointCount", "color"])
            gen.returnExp("JS_UNDEFINED")
        }
    }
    getFunction(api.functions, "LoadMaterials")!.params![1].binding = { jsType: "{ materialCount: number } | null | undefined" }
    getFunction(api.functions, "LoadMaterials")!.binding = {
        jsReturns: "Material[] | null",
        body: gen => {
            gen.jsToC("const char *", "fileName", "argv[0]")
            gen.declare("materialCount", "int", false, "0")
            gen.call("LoadMaterials", ["fileName", "&materialCount"], { type: "Material *", name: "materials" })
            gen.jsCleanUpParameter("const char *", "fileName")
            gen.declare("ret", "JSValue", false, "JS_NULL")
            const hasMaterials = gen.if("materials != NULL")
            hasMaterials.statement("ret = JS_NewArray(ctx)")
            hasMaterials.line("for(int i = 0; i < materialCount; i++) {")
            hasMaterials.indent()
            hasMaterials.declare("material", "Material", false, "materials[i]")
            hasMaterials.jsToJs("Material", "item", "material", core.structLookup)
            hasMaterials.call("JS_SetPropertyUint32", ["ctx", "ret", "i", "item"])
            hasMaterials.unindent()
            hasMaterials.line("}")
            hasMaterials.call("MemFree", ["(void *)materials"])
            const hasCount = gen.if("!JS_IsNull(argv[1]) && !JS_IsUndefined(argv[1])")
            hasCount.call("JS_SetPropertyStr", ["ctx", "argv[1]", "\"materialCount\"", "JS_NewInt32(ctx, materialCount)"])
            gen.returnExp("ret")
        }
    }
    getFunction(api.functions, "LoadModelAnimations")!.params![1].binding = { jsType: "{ animCount: number } | null | undefined" }
    getFunction(api.functions, "LoadModelAnimations")!.binding = {
        jsReturns: "ModelAnimation[] | null",
        body: gen => {
            gen.jsToC("const char *", "fileName", "argv[0]")
            gen.declare("animCount", "int", false, "0")
            gen.call("LoadModelAnimations", ["fileName", "&animCount"], { type: "ModelAnimation *", name: "animations" })
            gen.jsCleanUpParameter("const char *", "fileName")
            gen.declare("ret", "JSValue", false, "JS_NULL")
            const hasAnims = gen.if("animations != NULL")
            hasAnims.statement("ret = JS_NewArray(ctx)")
            hasAnims.line("for(int i = 0; i < animCount; i++) {")
            hasAnims.indent()
            hasAnims.declare("anim", "ModelAnimation", false, "animations[i]")
            hasAnims.jsToJs("ModelAnimation", "item", "anim", core.structLookup)
            hasAnims.call("JS_SetPropertyUint32", ["ctx", "ret", "i", "item"])
            hasAnims.unindent()
            hasAnims.line("}")
            hasAnims.call("MemFree", ["(void *)animations"])
            const hasCount = gen.if("!JS_IsNull(argv[1]) && !JS_IsUndefined(argv[1])")
            hasCount.call("JS_SetPropertyStr", ["ctx", "argv[1]", "\"animCount\"", "JS_NewInt32(ctx, animCount)"])
            gen.returnExp("ret")
        }
    }
    getFunction(api.functions, "UpdateModelAnimation")!.binding = {}
    getFunction(api.functions, "UnloadModelAnimation")!.binding = {}
    getFunction(api.functions, "UnloadModelAnimations")!.params![0].binding = { jsType: "ModelAnimation[]" }
    getFunction(api.functions, "UnloadModelAnimations")!.params![1].binding = { ignore: true }
    getFunction(api.functions, "UnloadModelAnimations")!.binding = {
        body: gen => {
            gen.call("JS_GetPropertyStr", ["ctx", "argv[0]", "\"length\""], { name: "lengthJs", type: "JSValue" })
            gen.declare("animCount", "int", false, "0")
            gen.call("JS_ToInt32", ["ctx", "&animCount", "lengthJs"])
            gen.call("JS_FreeValue", ["ctx", "lengthJs"])
            gen.line("for(int i = 0; i < animCount; i++) {")
            gen.indent()
            gen.call("JS_GetPropertyUint32", ["ctx", "argv[0]", "i"], { name: "animJs", type: "JSValue" })
            gen.jsOpqToStructPtr("ModelAnimation", "animPtr", "animJs", core.structLookup["ModelAnimation"])
            const hasAnim = gen.if("animPtr != NULL")
            hasAnim.call("UnloadModelAnimation", ["*animPtr"])
            gen.call("JS_FreeValue", ["ctx", "animJs"])
            gen.unindent()
            gen.line("}")
            gen.returnExp("JS_UNDEFINED")
        }
    }
    getFunction(api.functions, "IsModelAnimationValid")!.binding = {}
    getFunction(api.functions, "ExportWaveAsCode")!.binding = {}

    // Wave/Sound management functions
    getFunction(api.functions, "LoadWaveSamples")!.binding = {
        jsReturns: "ArrayBuffer | null",
        body: gen => {
            gen.jsToC("Wave", "wave", "argv[0]", core.structLookup)
            gen.call("LoadWaveSamples", ["wave"], { type: "float *", name: "samples" })
            gen.declare("ret", "JSValue", false, "JS_NULL")
            const hasSamples = gen.if("samples != NULL")
            hasSamples.statement("ret = JS_NewArrayBufferCopy(ctx, (const uint8_t *)samples, wave.frameCount*wave.channels*sizeof(float))")
            hasSamples.call("UnloadWaveSamples", ["samples"])
            gen.returnExp("ret")
        }
    }
    getFunction(api.functions, "UnloadWaveSamples")!.binding = { body: gen => gen.returnExp("JS_UNDEFINED"), jsReturns: "void" }
    getFunction(api.functions, "LoadMusicStreamFromMemory")!.params![2].binding = { ignore: true }
    getFunction(api.functions, "LoadMusicStreamFromMemory")!.binding = {
        customizeCall: "Music returnVal = LoadMusicStreamFromMemory(fileType, data, (int)data_size);"
    }
    getFunction(api.functions, "LoadAudioStream")!.binding = {}
    getFunction(api.functions, "UnloadAudioStream")!.binding = {}
    getFunction(api.functions, "UpdateAudioStream")!.params![1].binding = { typeAlias: "const void *", jsType: "ArrayBuffer" }
    getFunction(api.functions, "UpdateAudioStream")!.binding = {}
    getFunction(api.functions, "IsAudioStreamProcessed")!.binding = {}
    getFunction(api.functions, "PlayAudioStream")!.binding = {}
    getFunction(api.functions, "PauseAudioStream")!.binding = {}
    getFunction(api.functions, "ResumeAudioStream")!.binding = {}
    getFunction(api.functions, "IsAudioStreamPlaying")!.binding = {}
    getFunction(api.functions, "StopAudioStream")!.binding = {}
    getFunction(api.functions, "SetAudioStreamVolume")!.binding = {}
    getFunction(api.functions, "SetAudioStreamPitch")!.binding = {}
    getFunction(api.functions, "SetAudioStreamPan")!.binding = {}
    getFunction(api.functions, "SetAudioStreamBufferSizeDefault")!.binding = {}
    getFunction(api.functions, "SetAudioStreamCallback")!.params![1].binding = { jsType: "any" }
    getFunction(api.functions, "SetAudioStreamCallback")!.binding = { body: gen => gen.returnExp("JS_UNDEFINED"), jsReturns: "void" }
    getFunction(api.functions, "AttachAudioStreamProcessor")!.params![1].binding = { jsType: "any" }
    getFunction(api.functions, "AttachAudioStreamProcessor")!.binding = { body: gen => gen.returnExp("JS_UNDEFINED"), jsReturns: "void" }
    getFunction(api.functions, "DetachAudioStreamProcessor")!.params![1].binding = { jsType: "any" }
    getFunction(api.functions, "DetachAudioStreamProcessor")!.binding = { body: gen => gen.returnExp("JS_UNDEFINED"), jsReturns: "void" }
    getFunction(api.functions, "AttachAudioMixedProcessor")!.params![0].binding = { jsType: "any" }
    getFunction(api.functions, "AttachAudioMixedProcessor")!.binding = { body: gen => gen.returnExp("JS_UNDEFINED"), jsReturns: "void" }
    getFunction(api.functions, "DetachAudioMixedProcessor")!.params![0].binding = { jsType: "any" }
    getFunction(api.functions, "DetachAudioMixedProcessor")!.binding = { body: gen => gen.returnExp("JS_UNDEFINED"), jsReturns: "void" }

    ignore("Vector3OrthoNormalize")
    ignore("Vector3ToFloatV")
    ignore("MatrixToFloatV")
    ignore("QuaternionToAxisAngle")
    core.exportGlobalDouble("DEG2RAD", "(PI/180.0)")
    core.exportGlobalDouble("RAD2DEG", "(180.0/PI)")

    const setOutParam = (fun: RayLibFunction, index: number) => {
        const param = fun!.params![index]
        param.binding = { 
            jsType: `{ ${param.name}: number } | null | undefined`,
            customConverter: (gen,src) => {
                gen.declare(param.name, param.type, false, "NULL");
                gen.declare(param.name+"_out", param.type.replace(" *",""))
                const body = gen.if("!JS_IsNull("+src+") && !JS_IsUndefined("+src+")")
                body.statement(param.name + " = &" + param.name + "_out")
                body.call("JS_GetPropertyStr", ["ctx",src, '"'+param.name+'"'], { name: param.name+"_js", type: "JSValue" })
                body.call("JS_ToInt32", ["ctx",param.name,param.name+"_js"])
            },
            customCleanup: (gen,src) => {
                const body = gen.if("!JS_IsNull("+src+") && !JS_IsUndefined("+src+")")
                body.call("JS_SetPropertyStr", ["ctx", src, `"${param.name}"`, "JS_NewInt32(ctx,"+param.name+"_out)"])
            } 
        }
    }
    const setOutParamString = (fun: RayLibFunction, index: number, indexLen: number) => {
        const lenParam = fun!.params![indexLen]
        lenParam.binding = { ignore: true }
        const param = fun!.params![index]
        param.binding = { 
            jsType: `{ ${param.name}: string }`,
            customConverter: (gen,src) => {
                gen.call("JS_GetPropertyStr", ["ctx",src, '"'+param.name+'"'], { name: param.name+"_js", type: "JSValue" })
                gen.declare(param.name+"_len", "size_t");
                gen.call("JS_ToCStringLen",["ctx", "&"+param.name+"_len", param.name+"_js"], { name: param.name+"_val", type: "const char *" })
                gen.call("memcpy", ["(void *)textbuffer", param.name+"_val", param.name+"_len"])
                gen.statement("textbuffer["+param.name+"_len] = 0")
                gen.declare(param.name, param.type, false, "textbuffer");
                gen.declare(lenParam.name, lenParam.type, false, "4096")
            },
            customCleanup: (gen, src) => {
                gen.jsCleanUpParameter("const char *", param.name + "_val")
                gen.call("JS_SetPropertyStr", ["ctx", src, `"${param.name}"`, "JS_NewString(ctx,"+param.name+")"])
            } 
        }

    }

    core.definitions.declare("textbuffer[4096]", "char", true)

    setOutParam(getFunction(api.functions, "GuiDropdownBox")!, 2)
    setOutParam(getFunction(api.functions, "GuiSpinner")!, 2)
    setOutParam(getFunction(api.functions, "GuiValueBox")!, 2)
    setOutParam(getFunction(api.functions, "GuiListView")!, 2)
    setOutParam(getFunction(api.functions, "GetCodepoint")!, 1)
    setOutParam(getFunction(api.functions, "GetCodepointNext")!, 1)
    setOutParam(getFunction(api.functions, "GetCodepointPrevious")!, 1)
    setOutParam(getFunction(api.functions, "CodepointToUTF8")!, 1)

    // const setStringListParam = (fun: RayLibFunction, index: number, indexLen: number) => {
    //     const lenParam = fun!.params![indexLen]
    //     lenParam.binding = { ignore: true }
    //     const param = fun!.params![index]
    //     fun.binding = { customizeCall: "int returnVal = GuiListViewEx(bounds, text, count, focus, scrollIndex, active);" }
    //     param.binding = { 
    //         jsType: `{ ${param.name}: string[] }`,
    //         customConverter: (gen,src) => {
    //             gen.line("// TODO: Read string values")
    //         },
    //         customCleanup: (gen, src) => {
    //             gen.line("// TODO: Dispose strings")
    //         }             
    //     }

    // }

    //const glve = getFunction(api.functions, "GuiListViewEx")!
    //setStringListParam(glve, 1,2)
    //setOutParam(glve, 3)
    //setOutParam(glve, 4)
    ignore("GuiListViewEx");

    setOutParamString(getFunction(api.functions, "GuiTextBox")!, 1,2)

    const gtib = getFunction(api.functions, "GuiTextInputBox")!
    setOutParamString(gtib,4,5)
    setOutParam(gtib, 6)
    
    // needs string array
    ignore("GuiTabBar")
    ignore("GuiGetIcons")
    ignore("GuiLoadIcons")

    api.structs.forEach(x => core.addApiStruct(x))
    api.functions.forEach(x => core.addApiFunction(x))
    api.defines.filter(x => x.type === "COLOR").map(x => ({ name: x.name, description: x.description, values: (x.value.match(/\{([^}]+)\}/) || "")[1].split(',').map(x => x.trim()) })).forEach(x => {
        core.exportGlobalStruct("Color", x.name, x.values, x.description)
    })
    api.enums.forEach(x => core.addEnum(x))
    core.exportGlobalInt("MATERIAL_MAP_DIFFUSE", "Albedo material (same as: MATERIAL_MAP_DIFFUSE")
    core.exportGlobalInt("MATERIAL_MAP_SPECULAR", "Metalness material (same as: MATERIAL_MAP_SPECULAR)")
    core.writeTo("src/bindings/js_raylib_core.h")
    core.typings.writeTo("examples/lib.raylib.d.ts")
    const ignored = api.functions.filter(x => x.binding?.ignore).length
    console.log(`Converted ${api.functions.length-ignored} function. ${ignored} ignored`)
    console.log("Success!")

    // TODO: Expose PLatform defines
}

main()
