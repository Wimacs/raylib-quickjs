# Raylib C API 与 RayJS API 对照表

- 生成时间: 2026-03-01T09:35:27.693Z
- 基线: `thirdparty/raylib/parser/output/raylib_api.json`
- JS 声明: `examples/lib.raylib.d.ts`
- Cheatsheet 函数总数: **581**
- 已匹配 JS 声明: **581**
- 匹配率: **100.00%**

> 说明: JS API 名称默认按 lowerCamelCase 规则从 C API 名称映射，并以 d.ts 实际导出为准。

| # | C API (签名) | JS API (签名) | 用途简介 |
| --- | --- | --- | --- |
| 1 | `void InitWindow(int width, int height, const char * title)` | `initWindow(width: number, height: number, title: string \| undefined \| null): void` | Initialize window and OpenGL context |
| 2 | `void CloseWindow()` | `closeWindow(): void` | Close window and unload OpenGL context |
| 3 | `bool WindowShouldClose()` | `windowShouldClose(): boolean` | Check if application should close (KEY_ESCAPE pressed or windows close icon clicked) |
| 4 | `bool IsWindowReady()` | `isWindowReady(): boolean` | Check if window has been initialized successfully |
| 5 | `bool IsWindowFullscreen()` | `isWindowFullscreen(): boolean` | Check if window is currently fullscreen |
| 6 | `bool IsWindowHidden()` | `isWindowHidden(): boolean` | Check if window is currently hidden |
| 7 | `bool IsWindowMinimized()` | `isWindowMinimized(): boolean` | Check if window is currently minimized |
| 8 | `bool IsWindowMaximized()` | `isWindowMaximized(): boolean` | Check if window is currently maximized |
| 9 | `bool IsWindowFocused()` | `isWindowFocused(): boolean` | Check if window is currently focused |
| 10 | `bool IsWindowResized()` | `isWindowResized(): boolean` | Check if window has been resized last frame |
| 11 | `bool IsWindowState(unsigned int flag)` | `isWindowState(flag: number): boolean` | Check if one specific window flag is enabled |
| 12 | `void SetWindowState(unsigned int flags)` | `setWindowState(flags: number): void` | Set window configuration state using flags |
| 13 | `void ClearWindowState(unsigned int flags)` | `clearWindowState(flags: number): void` | Clear window configuration state flags |
| 14 | `void ToggleFullscreen()` | `toggleFullscreen(): void` | Toggle window state: fullscreen/windowed, resizes monitor to match window resolution |
| 15 | `void ToggleBorderlessWindowed()` | `toggleBorderlessWindowed(): void` | Toggle window state: borderless windowed, resizes window to match monitor resolution |
| 16 | `void MaximizeWindow()` | `maximizeWindow(): void` | Set window state: maximized, if resizable |
| 17 | `void MinimizeWindow()` | `minimizeWindow(): void` | Set window state: minimized, if resizable |
| 18 | `void RestoreWindow()` | `restoreWindow(): void` | Set window state: not minimized/maximized |
| 19 | `void SetWindowIcon(Image image)` | `setWindowIcon(image: Image): void` | Set icon for window (single image, RGBA 32bit) |
| 20 | `void SetWindowIcons(Image * images, int count)` | `setWindowIcons(images: Image[]): void` | Set icon for window (multiple images, RGBA 32bit) |
| 21 | `void SetWindowTitle(const char * title)` | `setWindowTitle(title: string \| undefined \| null): void` | Set title for window |
| 22 | `void SetWindowPosition(int x, int y)` | `setWindowPosition(x: number, y: number): void` | Set window position on screen |
| 23 | `void SetWindowMonitor(int monitor)` | `setWindowMonitor(monitor: number): void` | Set monitor for the current window |
| 24 | `void SetWindowMinSize(int width, int height)` | `setWindowMinSize(width: number, height: number): void` | Set window minimum dimensions (for FLAG_WINDOW_RESIZABLE) |
| 25 | `void SetWindowMaxSize(int width, int height)` | `setWindowMaxSize(width: number, height: number): void` | Set window maximum dimensions (for FLAG_WINDOW_RESIZABLE) |
| 26 | `void SetWindowSize(int width, int height)` | `setWindowSize(width: number, height: number): void` | Set window dimensions |
| 27 | `void SetWindowOpacity(float opacity)` | `setWindowOpacity(opacity: number): void` | Set window opacity [0.0f..1.0f] |
| 28 | `void SetWindowFocused()` | `setWindowFocused(): void` | Set window focused |
| 29 | `void * GetWindowHandle()` | `getWindowHandle(): any` | Get native window handle |
| 30 | `int GetScreenWidth()` | `getScreenWidth(): number` | Get current screen width |
| 31 | `int GetScreenHeight()` | `getScreenHeight(): number` | Get current screen height |
| 32 | `int GetRenderWidth()` | `getRenderWidth(): number` | Get current render width (it considers HiDPI) |
| 33 | `int GetRenderHeight()` | `getRenderHeight(): number` | Get current render height (it considers HiDPI) |
| 34 | `int GetMonitorCount()` | `getMonitorCount(): number` | Get number of connected monitors |
| 35 | `int GetCurrentMonitor()` | `getCurrentMonitor(): number` | Get current monitor where window is placed |
| 36 | `Vector2 GetMonitorPosition(int monitor)` | `getMonitorPosition(monitor: number): Vector2` | Get specified monitor position |
| 37 | `int GetMonitorWidth(int monitor)` | `getMonitorWidth(monitor: number): number` | Get specified monitor width (current video mode used by monitor) |
| 38 | `int GetMonitorHeight(int monitor)` | `getMonitorHeight(monitor: number): number` | Get specified monitor height (current video mode used by monitor) |
| 39 | `int GetMonitorPhysicalWidth(int monitor)` | `getMonitorPhysicalWidth(monitor: number): number` | Get specified monitor physical width in millimetres |
| 40 | `int GetMonitorPhysicalHeight(int monitor)` | `getMonitorPhysicalHeight(monitor: number): number` | Get specified monitor physical height in millimetres |
| 41 | `int GetMonitorRefreshRate(int monitor)` | `getMonitorRefreshRate(monitor: number): number` | Get specified monitor refresh rate |
| 42 | `Vector2 GetWindowPosition()` | `getWindowPosition(): Vector2` | Get window position XY on monitor |
| 43 | `Vector2 GetWindowScaleDPI()` | `getWindowScaleDPI(): Vector2` | Get window scale DPI factor |
| 44 | `const char * GetMonitorName(int monitor)` | `getMonitorName(monitor: number): string \| undefined \| null` | Get the human-readable, UTF-8 encoded name of the specified monitor |
| 45 | `void SetClipboardText(const char * text)` | `setClipboardText(text: string \| undefined \| null): void` | Set clipboard text content |
| 46 | `const char * GetClipboardText()` | `getClipboardText(): string \| undefined \| null` | Get clipboard text content |
| 47 | `Image GetClipboardImage()` | `getClipboardImage(): Image` | Get clipboard image content |
| 48 | `void EnableEventWaiting()` | `enableEventWaiting(): void` | Enable waiting for events on EndDrawing(), no automatic event polling |
| 49 | `void DisableEventWaiting()` | `disableEventWaiting(): void` | Disable waiting for events on EndDrawing(), automatic events polling |
| 50 | `void ShowCursor()` | `showCursor(): void` | Shows cursor |
| 51 | `void HideCursor()` | `hideCursor(): void` | Hides cursor |
| 52 | `bool IsCursorHidden()` | `isCursorHidden(): boolean` | Check if cursor is not visible |
| 53 | `void EnableCursor()` | `enableCursor(): void` | Enables cursor (unlock cursor) |
| 54 | `void DisableCursor()` | `disableCursor(): void` | Disables cursor (lock cursor) |
| 55 | `bool IsCursorOnScreen()` | `isCursorOnScreen(): boolean` | Check if cursor is on the screen |
| 56 | `void ClearBackground(Color color)` | `clearBackground(color: Color): void` | Set background color (framebuffer clear color) |
| 57 | `void BeginDrawing()` | `beginDrawing(): void` | Setup canvas (framebuffer) to start drawing |
| 58 | `void EndDrawing()` | `endDrawing(): void` | End canvas drawing and swap buffers (double buffering) |
| 59 | `void BeginMode2D(Camera2D camera)` | `beginMode2D(camera: Camera2D): void` | Begin 2D mode with custom camera (2D) |
| 60 | `void EndMode2D()` | `endMode2D(): void` | Ends 2D mode with custom camera |
| 61 | `void BeginMode3D(Camera3D camera)` | `beginMode3D(camera: Camera3D): void` | Begin 3D mode with custom camera (3D) |
| 62 | `void EndMode3D()` | `endMode3D(): void` | Ends 3D mode and returns to default 2D orthographic mode |
| 63 | `void BeginTextureMode(RenderTexture2D target)` | `beginTextureMode(target: RenderTexture): void` | Begin drawing to render texture |
| 64 | `void EndTextureMode()` | `endTextureMode(): void` | Ends drawing to render texture |
| 65 | `void BeginShaderMode(Shader shader)` | `beginShaderMode(shader: Shader): void` | Begin custom shader drawing |
| 66 | `void EndShaderMode()` | `endShaderMode(): void` | End custom shader drawing (use default shader) |
| 67 | `void BeginBlendMode(int mode)` | `beginBlendMode(mode: number): void` | Begin blending mode (alpha, additive, multiplied, subtract, custom) |
| 68 | `void EndBlendMode()` | `endBlendMode(): void` | End blending mode (reset to default: alpha blending) |
| 69 | `void BeginScissorMode(int x, int y, int width, int height)` | `beginScissorMode(x: number, y: number, width: number, height: number): void` | Begin scissor mode (define screen area for following drawing) |
| 70 | `void EndScissorMode()` | `endScissorMode(): void` | End scissor mode |
| 71 | `void BeginVrStereoMode(VrStereoConfig config)` | `beginVrStereoMode(config: VrStereoConfig): void` | Begin stereo rendering (requires VR simulator) |
| 72 | `void EndVrStereoMode()` | `endVrStereoMode(): void` | End stereo rendering (requires VR simulator) |
| 73 | `VrStereoConfig LoadVrStereoConfig(VrDeviceInfo device)` | `loadVrStereoConfig(device: VrDeviceInfo): VrStereoConfig` | Load VR stereo config for VR simulator device parameters |
| 74 | `void UnloadVrStereoConfig(VrStereoConfig config)` | `unloadVrStereoConfig(config: VrStereoConfig): void` | Unload VR stereo config |
| 75 | `Shader LoadShader(const char * vsFileName, const char * fsFileName)` | `loadShader(vsFileName: string \| undefined \| null, fsFileName: string \| undefined \| null): Shader` | Load shader from files and bind default locations |
| 76 | `Shader LoadShaderFromMemory(const char * vsCode, const char * fsCode)` | `loadShaderFromMemory(vsCode: string \| undefined \| null, fsCode: string \| undefined \| null): Shader` | Load shader from code strings and bind default locations |
| 77 | `bool IsShaderValid(Shader shader)` | `isShaderValid(shader: Shader): boolean` | Check if a shader is valid (loaded on GPU) |
| 78 | `int GetShaderLocation(Shader shader, const char * uniformName)` | `getShaderLocation(shader: Shader, uniformName: string \| undefined \| null): number` | Get shader uniform location |
| 79 | `int GetShaderLocationAttrib(Shader shader, const char * attribName)` | `getShaderLocationAttrib(shader: Shader, attribName: string \| undefined \| null): number` | Get shader attribute location |
| 80 | `void SetShaderValue(Shader shader, int locIndex, const void * value, int uniformType)` | `setShaderValue(shader: Shader, locIndex: number, value: any, uniformType: number): void` | Set shader uniform value |
| 81 | `void SetShaderValueV(Shader shader, int locIndex, const void * value, int uniformType, int count)` | `setShaderValueV(shader: Shader, locIndex: number, value: ArrayBuffer, uniformType: number, count: number): void` | Set shader uniform value vector |
| 82 | `void SetShaderValueMatrix(Shader shader, int locIndex, Matrix mat)` | `setShaderValueMatrix(shader: Shader, locIndex: number, mat: Matrix): void` | Set shader uniform value (matrix 4x4) |
| 83 | `void SetShaderValueTexture(Shader shader, int locIndex, Texture2D texture)` | `setShaderValueTexture(shader: Shader, locIndex: number, texture: Texture): void` | Set shader uniform value for texture (sampler2d) |
| 84 | `void UnloadShader(Shader shader)` | `unloadShader(shader: Shader): void` | Unload shader from GPU memory (VRAM) |
| 85 | `Ray GetScreenToWorldRay(Vector2 position, Camera camera)` | `getScreenToWorldRay(position: Vector2, camera: Camera3D): Ray` | Get a ray trace from screen position (i.e mouse) |
| 86 | `Ray GetScreenToWorldRayEx(Vector2 position, Camera camera, int width, int height)` | `getScreenToWorldRayEx(position: Vector2, camera: Camera3D, width: number, height: number): Ray` | Get a ray trace from screen position (i.e mouse) in a viewport |
| 87 | `Vector2 GetWorldToScreen(Vector3 position, Camera camera)` | `getWorldToScreen(position: Vector3, camera: Camera3D): Vector2` | Get the screen space position for a 3d world space position |
| 88 | `Vector2 GetWorldToScreenEx(Vector3 position, Camera camera, int width, int height)` | `getWorldToScreenEx(position: Vector3, camera: Camera3D, width: number, height: number): Vector2` | Get size position for a 3d world space position |
| 89 | `Vector2 GetWorldToScreen2D(Vector2 position, Camera2D camera)` | `getWorldToScreen2D(position: Vector2, camera: Camera2D): Vector2` | Get the screen space position for a 2d camera world space position |
| 90 | `Vector2 GetScreenToWorld2D(Vector2 position, Camera2D camera)` | `getScreenToWorld2D(position: Vector2, camera: Camera2D): Vector2` | Get the world space position for a 2d camera screen space position |
| 91 | `Matrix GetCameraMatrix(Camera camera)` | `getCameraMatrix(camera: Camera3D): Matrix` | Get camera transform matrix (view matrix) |
| 92 | `Matrix GetCameraMatrix2D(Camera2D camera)` | `getCameraMatrix2D(camera: Camera2D): Matrix` | Get camera 2d transform matrix |
| 93 | `void SetTargetFPS(int fps)` | `setTargetFPS(fps: number): void` | Set target FPS (maximum) |
| 94 | `float GetFrameTime()` | `getFrameTime(): number` | Get time in seconds for last frame drawn (delta time) |
| 95 | `double GetTime()` | `getTime(): number` | Get elapsed time in seconds since InitWindow() |
| 96 | `int GetFPS()` | `getFPS(): number` | Get current FPS |
| 97 | `void SwapScreenBuffer()` | `swapScreenBuffer(): void` | Swap back buffer with front buffer (screen drawing) |
| 98 | `void PollInputEvents()` | `pollInputEvents(): void` | Register all input events |
| 99 | `void WaitTime(double seconds)` | `waitTime(seconds: number): void` | Wait for some time (halt program execution) |
| 100 | `void SetRandomSeed(unsigned int seed)` | `setRandomSeed(seed: number): void` | Set the seed for the random number generator |
| 101 | `int GetRandomValue(int min, int max)` | `getRandomValue(min: number, max: number): number` | Get a random value between min and max (both included) |
| 102 | `int * LoadRandomSequence(unsigned int count, int min, int max)` | `loadRandomSequence(count: number, min: number, max: number): ArrayBuffer \| null` | Load random values sequence, no values repeated |
| 103 | `void UnloadRandomSequence(int * sequence)` | `unloadRandomSequence(sequence: int): void` | Unload random values sequence |
| 104 | `void TakeScreenshot(const char * fileName)` | `takeScreenshot(fileName: string \| undefined \| null): void` | Takes a screenshot of current screen (filename extension defines format) |
| 105 | `void SetConfigFlags(unsigned int flags)` | `setConfigFlags(flags: number): void` | Setup init configuration flags (view FLAGS) |
| 106 | `void OpenURL(const char * url)` | `openURL(url: string \| undefined \| null): void` | Open URL with default system browser (if available) |
| 107 | `void TraceLog(int logLevel, const char * text, ... args)` | `traceLog(logLevel: number, text: string \| undefined \| null): void` | Show trace log messages (LOG_DEBUG, LOG_INFO, LOG_WARNING, LOG_ERROR...) |
| 108 | `void SetTraceLogLevel(int logLevel)` | `setTraceLogLevel(logLevel: number): void` | Set the current threshold (minimum) log level |
| 109 | `void * MemAlloc(unsigned int size)` | `memAlloc(size: number): ArrayBuffer \| null` | Internal memory allocator |
| 110 | `void * MemRealloc(void * ptr, unsigned int size)` | `memRealloc(ptr: ArrayBuffer, size: number): ArrayBuffer \| null` | Internal memory reallocator |
| 111 | `void MemFree(void * ptr)` | `memFree(ptr: any): void` | Internal memory free |
| 112 | `void SetTraceLogCallback(TraceLogCallback callback)` | `setTraceLogCallback(callback: any): void` | Set custom trace log |
| 113 | `void SetLoadFileDataCallback(LoadFileDataCallback callback)` | `setLoadFileDataCallback(callback: any): void` | Set custom file binary data loader |
| 114 | `void SetSaveFileDataCallback(SaveFileDataCallback callback)` | `setSaveFileDataCallback(callback: any): void` | Set custom file binary data saver |
| 115 | `void SetLoadFileTextCallback(LoadFileTextCallback callback)` | `setLoadFileTextCallback(callback: any): void` | Set custom file text data loader |
| 116 | `void SetSaveFileTextCallback(SaveFileTextCallback callback)` | `setSaveFileTextCallback(callback: any): void` | Set custom file text data saver |
| 117 | `unsigned char * LoadFileData(const char * fileName, int * dataSize)` | `loadFileData(fileName: string \| undefined \| null): ArrayBuffer` | Load file data as byte array (read) |
| 118 | `void UnloadFileData(unsigned char * data)` | `unloadFileData(data: ArrayBuffer): void` | Unload file data allocated by LoadFileData() |
| 119 | `bool SaveFileData(const char * fileName, void * data, int dataSize)` | `saveFileData(fileName: string \| undefined \| null, data: any, dataSize: number): boolean` | Save data to file from byte array (write), returns true on success |
| 120 | `bool ExportDataAsCode(const unsigned char * data, int dataSize, const char * fileName)` | `exportDataAsCode(data: ArrayBuffer, fileName: string \| undefined \| null): boolean` | Export data to code (.h), returns true on success |
| 121 | `char * LoadFileText(const char * fileName)` | `loadFileText(fileName: string \| undefined \| null): string \| undefined \| null` | Load text data from file (read), returns a '\0' terminated string |
| 122 | `void UnloadFileText(char * text)` | `unloadFileText(text: string \| undefined \| null): void` | Unload file text data allocated by LoadFileText() |
| 123 | `bool SaveFileText(const char * fileName, char * text)` | `saveFileText(fileName: string \| undefined \| null, text: string \| undefined \| null): boolean` | Save text data to file (write), string must be '\0' terminated, returns true on success |
| 124 | `bool FileExists(const char * fileName)` | `fileExists(fileName: string \| undefined \| null): boolean` | Check if file exists |
| 125 | `bool DirectoryExists(const char * dirPath)` | `directoryExists(dirPath: string \| undefined \| null): boolean` | Check if a directory path exists |
| 126 | `bool IsFileExtension(const char * fileName, const char * ext)` | `isFileExtension(fileName: string \| undefined \| null, ext: string \| undefined \| null): boolean` | Check file extension (including point: .png, .wav) |
| 127 | `int GetFileLength(const char * fileName)` | `getFileLength(fileName: string \| undefined \| null): number` | Get file length in bytes (NOTE: GetFileSize() conflicts with windows.h) |
| 128 | `const char * GetFileExtension(const char * fileName)` | `getFileExtension(fileName: string \| undefined \| null): string \| undefined \| null` | Get pointer to extension for a filename string (includes dot: '.png') |
| 129 | `const char * GetFileName(const char * filePath)` | `getFileName(filePath: string \| undefined \| null): string \| undefined \| null` | Get pointer to filename for a path string |
| 130 | `const char * GetFileNameWithoutExt(const char * filePath)` | `getFileNameWithoutExt(filePath: string \| undefined \| null): string \| undefined \| null` | Get filename string without extension (uses static string) |
| 131 | `const char * GetDirectoryPath(const char * filePath)` | `getDirectoryPath(filePath: string \| undefined \| null): string \| undefined \| null` | Get full path for a given fileName with path (uses static string) |
| 132 | `const char * GetPrevDirectoryPath(const char * dirPath)` | `getPrevDirectoryPath(dirPath: string \| undefined \| null): string \| undefined \| null` | Get previous directory path for a given path (uses static string) |
| 133 | `const char * GetWorkingDirectory()` | `getWorkingDirectory(): string \| undefined \| null` | Get current working directory (uses static string) |
| 134 | `const char * GetApplicationDirectory()` | `getApplicationDirectory(): string \| undefined \| null` | Get the directory of the running application (uses static string) |
| 135 | `int MakeDirectory(const char * dirPath)` | `makeDirectory(dirPath: string \| undefined \| null): number` | Create directories (including full path requested), returns 0 on success |
| 136 | `bool ChangeDirectory(const char * dir)` | `changeDirectory(dir: string \| undefined \| null): boolean` | Change working directory, return true on success |
| 137 | `bool IsPathFile(const char * path)` | `isPathFile(path: string \| undefined \| null): boolean` | Check if a given path is a file or a directory |
| 138 | `bool IsFileNameValid(const char * fileName)` | `isFileNameValid(fileName: string \| undefined \| null): boolean` | Check if fileName is valid for the platform/OS |
| 139 | `FilePathList LoadDirectoryFiles(const char * dirPath)` | `loadDirectoryFiles(dirPath: string \| undefined \| null): string[]` | Load directory filepaths |
| 140 | `FilePathList LoadDirectoryFilesEx(const char * basePath, const char * filter, bool scanSubdirs)` | `loadDirectoryFilesEx(basePath: string \| undefined \| null, filter: string \| undefined \| null, scanSubdirs: boolean): string[]` | Load directory filepaths with extension filtering and recursive directory scan. Use 'DIR' in the filter string to include directories in the result |
| 141 | `void UnloadDirectoryFiles(FilePathList files)` | `unloadDirectoryFiles(files: FilePathList): void` | Unload filepaths |
| 142 | `bool IsFileDropped()` | `isFileDropped(): boolean` | Check if a file has been dropped into window |
| 143 | `FilePathList LoadDroppedFiles()` | `loadDroppedFiles(): string[]` | Load dropped filepaths |
| 144 | `void UnloadDroppedFiles(FilePathList files)` | `unloadDroppedFiles(files: FilePathList): void` | Unload dropped filepaths |
| 145 | `long GetFileModTime(const char * fileName)` | `getFileModTime(fileName: string \| undefined \| null): number` | Get file modification time (last write time) |
| 146 | `unsigned char * CompressData(const unsigned char * data, int dataSize, int * compDataSize)` | `compressData(data: ArrayBuffer): ArrayBuffer \| null` | Compress data (DEFLATE algorithm), memory must be MemFree() |
| 147 | `unsigned char * DecompressData(const unsigned char * compData, int compDataSize, int * dataSize)` | `decompressData(compData: ArrayBuffer): ArrayBuffer \| null` | Decompress data (DEFLATE algorithm), memory must be MemFree() |
| 148 | `char * EncodeDataBase64(const unsigned char * data, int dataSize, int * outputSize)` | `encodeDataBase64(data: ArrayBuffer): string \| null` | Encode data to Base64 string, memory must be MemFree() |
| 149 | `unsigned char * DecodeDataBase64(const unsigned char * data, int * outputSize)` | `decodeDataBase64(data: string \| null \| undefined): ArrayBuffer \| null` | Decode Base64 string data, memory must be MemFree() |
| 150 | `unsigned int ComputeCRC32(unsigned char * data, int dataSize)` | `computeCRC32(data: ArrayBuffer, dataSize: number): number` | Compute CRC32 hash code |
| 151 | `unsigned int * ComputeMD5(unsigned char * data, int dataSize)` | `computeMD5(data: ArrayBuffer): ArrayBuffer` | Compute MD5 hash code, returns static int[4] (16 bytes) |
| 152 | `unsigned int * ComputeSHA1(unsigned char * data, int dataSize)` | `computeSHA1(data: ArrayBuffer): ArrayBuffer` | Compute SHA1 hash code, returns static int[5] (20 bytes) |
| 153 | `AutomationEventList LoadAutomationEventList(const char * fileName)` | `loadAutomationEventList(fileName: string \| undefined \| null): AutomationEventList` | Load automation events list from file, NULL for empty list, capacity = MAX_AUTOMATION_EVENTS |
| 154 | `void UnloadAutomationEventList(AutomationEventList list)` | `unloadAutomationEventList(list: AutomationEventList): void` | Unload automation events list from file |
| 155 | `bool ExportAutomationEventList(AutomationEventList list, const char * fileName)` | `exportAutomationEventList(list: AutomationEventList, fileName: string \| undefined \| null): boolean` | Export automation events list as text file |
| 156 | `void SetAutomationEventList(AutomationEventList * list)` | `setAutomationEventList(list: AutomationEventList): void` | Set automation event list to record to |
| 157 | `void SetAutomationEventBaseFrame(int frame)` | `setAutomationEventBaseFrame(frame: number): void` | Set automation event internal base frame to start recording |
| 158 | `void StartAutomationEventRecording()` | `startAutomationEventRecording(): void` | Start recording automation events (AutomationEventList must be set) |
| 159 | `void StopAutomationEventRecording()` | `stopAutomationEventRecording(): void` | Stop recording automation events |
| 160 | `void PlayAutomationEvent(AutomationEvent event)` | `playAutomationEvent(event: AutomationEvent): void` | Play a recorded automation event |
| 161 | `bool IsKeyPressed(int key)` | `isKeyPressed(key: number): boolean` | Check if a key has been pressed once |
| 162 | `bool IsKeyPressedRepeat(int key)` | `isKeyPressedRepeat(key: number): boolean` | Check if a key has been pressed again |
| 163 | `bool IsKeyDown(int key)` | `isKeyDown(key: number): boolean` | Check if a key is being pressed |
| 164 | `bool IsKeyReleased(int key)` | `isKeyReleased(key: number): boolean` | Check if a key has been released once |
| 165 | `bool IsKeyUp(int key)` | `isKeyUp(key: number): boolean` | Check if a key is NOT being pressed |
| 166 | `int GetKeyPressed()` | `getKeyPressed(): number` | Get key pressed (keycode), call it multiple times for keys queued, returns 0 when the queue is empty |
| 167 | `int GetCharPressed()` | `getCharPressed(): number` | Get char pressed (unicode), call it multiple times for chars queued, returns 0 when the queue is empty |
| 168 | `void SetExitKey(int key)` | `setExitKey(key: number): void` | Set a custom key to exit program (default is ESC) |
| 169 | `bool IsGamepadAvailable(int gamepad)` | `isGamepadAvailable(gamepad: number): boolean` | Check if a gamepad is available |
| 170 | `const char * GetGamepadName(int gamepad)` | `getGamepadName(gamepad: number): string \| undefined \| null` | Get gamepad internal name id |
| 171 | `bool IsGamepadButtonPressed(int gamepad, int button)` | `isGamepadButtonPressed(gamepad: number, button: number): boolean` | Check if a gamepad button has been pressed once |
| 172 | `bool IsGamepadButtonDown(int gamepad, int button)` | `isGamepadButtonDown(gamepad: number, button: number): boolean` | Check if a gamepad button is being pressed |
| 173 | `bool IsGamepadButtonReleased(int gamepad, int button)` | `isGamepadButtonReleased(gamepad: number, button: number): boolean` | Check if a gamepad button has been released once |
| 174 | `bool IsGamepadButtonUp(int gamepad, int button)` | `isGamepadButtonUp(gamepad: number, button: number): boolean` | Check if a gamepad button is NOT being pressed |
| 175 | `int GetGamepadButtonPressed()` | `getGamepadButtonPressed(): number` | Get the last gamepad button pressed |
| 176 | `int GetGamepadAxisCount(int gamepad)` | `getGamepadAxisCount(gamepad: number): number` | Get gamepad axis count for a gamepad |
| 177 | `float GetGamepadAxisMovement(int gamepad, int axis)` | `getGamepadAxisMovement(gamepad: number, axis: number): number` | Get axis movement value for a gamepad axis |
| 178 | `int SetGamepadMappings(const char * mappings)` | `setGamepadMappings(mappings: string \| undefined \| null): number` | Set internal gamepad mappings (SDL_GameControllerDB) |
| 179 | `void SetGamepadVibration(int gamepad, float leftMotor, float rightMotor, float duration)` | `setGamepadVibration(gamepad: number, leftMotor: number, rightMotor: number, duration: number): void` | Set gamepad vibration for both motors (duration in seconds) |
| 180 | `bool IsMouseButtonPressed(int button)` | `isMouseButtonPressed(button: number): boolean` | Check if a mouse button has been pressed once |
| 181 | `bool IsMouseButtonDown(int button)` | `isMouseButtonDown(button: number): boolean` | Check if a mouse button is being pressed |
| 182 | `bool IsMouseButtonReleased(int button)` | `isMouseButtonReleased(button: number): boolean` | Check if a mouse button has been released once |
| 183 | `bool IsMouseButtonUp(int button)` | `isMouseButtonUp(button: number): boolean` | Check if a mouse button is NOT being pressed |
| 184 | `int GetMouseX()` | `getMouseX(): number` | Get mouse position X |
| 185 | `int GetMouseY()` | `getMouseY(): number` | Get mouse position Y |
| 186 | `Vector2 GetMousePosition()` | `getMousePosition(): Vector2` | Get mouse position XY |
| 187 | `Vector2 GetMouseDelta()` | `getMouseDelta(): Vector2` | Get mouse delta between frames |
| 188 | `void SetMousePosition(int x, int y)` | `setMousePosition(x: number, y: number): void` | Set mouse position XY |
| 189 | `void SetMouseOffset(int offsetX, int offsetY)` | `setMouseOffset(offsetX: number, offsetY: number): void` | Set mouse offset |
| 190 | `void SetMouseScale(float scaleX, float scaleY)` | `setMouseScale(scaleX: number, scaleY: number): void` | Set mouse scaling |
| 191 | `float GetMouseWheelMove()` | `getMouseWheelMove(): number` | Get mouse wheel movement for X or Y, whichever is larger |
| 192 | `Vector2 GetMouseWheelMoveV()` | `getMouseWheelMoveV(): Vector2` | Get mouse wheel movement for both X and Y |
| 193 | `void SetMouseCursor(int cursor)` | `setMouseCursor(cursor: number): void` | Set mouse cursor |
| 194 | `int GetTouchX()` | `getTouchX(): number` | Get touch position X for touch point 0 (relative to screen size) |
| 195 | `int GetTouchY()` | `getTouchY(): number` | Get touch position Y for touch point 0 (relative to screen size) |
| 196 | `Vector2 GetTouchPosition(int index)` | `getTouchPosition(index: number): Vector2` | Get touch position XY for a touch point index (relative to screen size) |
| 197 | `int GetTouchPointId(int index)` | `getTouchPointId(index: number): number` | Get touch point identifier for given index |
| 198 | `int GetTouchPointCount()` | `getTouchPointCount(): number` | Get number of touch points |
| 199 | `void SetGesturesEnabled(unsigned int flags)` | `setGesturesEnabled(flags: number): void` | Enable a set of gestures using flags |
| 200 | `bool IsGestureDetected(unsigned int gesture)` | `isGestureDetected(gesture: number): boolean` | Check if a gesture have been detected |
| 201 | `int GetGestureDetected()` | `getGestureDetected(): number` | Get latest detected gesture |
| 202 | `float GetGestureHoldDuration()` | `getGestureHoldDuration(): number` | Get gesture hold time in seconds |
| 203 | `Vector2 GetGestureDragVector()` | `getGestureDragVector(): Vector2` | Get gesture drag vector |
| 204 | `float GetGestureDragAngle()` | `getGestureDragAngle(): number` | Get gesture drag angle |
| 205 | `Vector2 GetGesturePinchVector()` | `getGesturePinchVector(): Vector2` | Get gesture pinch delta |
| 206 | `float GetGesturePinchAngle()` | `getGesturePinchAngle(): number` | Get gesture pinch angle |
| 207 | `void UpdateCamera(Camera * camera, int mode)` | `updateCamera(camera: Camera3D, mode: number): void` | Update camera position for selected mode |
| 208 | `void UpdateCameraPro(Camera * camera, Vector3 movement, Vector3 rotation, float zoom)` | `updateCameraPro(camera: Camera3D, movement: Vector3, rotation: Vector3, zoom: number): void` | Update camera movement/rotation |
| 209 | `void SetShapesTexture(Texture2D texture, Rectangle source)` | `setShapesTexture(texture: Texture, source: Rectangle): void` | Set texture and rectangle to be used on shapes drawing |
| 210 | `Texture2D GetShapesTexture()` | `getShapesTexture(): Texture` | Get texture that is used for shapes drawing |
| 211 | `Rectangle GetShapesTextureRectangle()` | `getShapesTextureRectangle(): Rectangle` | Get texture source rectangle that is used for shapes drawing |
| 212 | `void DrawPixel(int posX, int posY, Color color)` | `drawPixel(posX: number, posY: number, color: Color): void` | Draw a pixel using geometry [Can be slow, use with care] |
| 213 | `void DrawPixelV(Vector2 position, Color color)` | `drawPixelV(position: Vector2, color: Color): void` | Draw a pixel using geometry (Vector version) [Can be slow, use with care] |
| 214 | `void DrawLine(int startPosX, int startPosY, int endPosX, int endPosY, Color color)` | `drawLine(startPosX: number, startPosY: number, endPosX: number, endPosY: number, color: Color): void` | Draw a line |
| 215 | `void DrawLineV(Vector2 startPos, Vector2 endPos, Color color)` | `drawLineV(startPos: Vector2, endPos: Vector2, color: Color): void` | Draw a line (using gl lines) |
| 216 | `void DrawLineEx(Vector2 startPos, Vector2 endPos, float thick, Color color)` | `drawLineEx(startPos: Vector2, endPos: Vector2, thick: number, color: Color): void` | Draw a line (using triangles/quads) |
| 217 | `void DrawLineStrip(const Vector2 * points, int pointCount, Color color)` | `drawLineStrip(points: ArrayBuffer, pointCount: number, color: Color): void` | Draw lines sequence (using gl lines) |
| 218 | `void DrawLineBezier(Vector2 startPos, Vector2 endPos, float thick, Color color)` | `drawLineBezier(startPos: Vector2, endPos: Vector2, thick: number, color: Color): void` | Draw line segment cubic-bezier in-out interpolation |
| 219 | `void DrawCircle(int centerX, int centerY, float radius, Color color)` | `drawCircle(centerX: number, centerY: number, radius: number, color: Color): void` | Draw a color-filled circle |
| 220 | `void DrawCircleSector(Vector2 center, float radius, float startAngle, float endAngle, int segments, Color color)` | `drawCircleSector(center: Vector2, radius: number, startAngle: number, endAngle: number, segments: number, color: Color): void` | Draw a piece of a circle |
| 221 | `void DrawCircleSectorLines(Vector2 center, float radius, float startAngle, float endAngle, int segments, Color color)` | `drawCircleSectorLines(center: Vector2, radius: number, startAngle: number, endAngle: number, segments: number, color: Color): void` | Draw circle sector outline |
| 222 | `void DrawCircleGradient(int centerX, int centerY, float radius, Color inner, Color outer)` | `drawCircleGradient(centerX: number, centerY: number, radius: number, inner: Color, outer: Color): void` | Draw a gradient-filled circle |
| 223 | `void DrawCircleV(Vector2 center, float radius, Color color)` | `drawCircleV(center: Vector2, radius: number, color: Color): void` | Draw a color-filled circle (Vector version) |
| 224 | `void DrawCircleLines(int centerX, int centerY, float radius, Color color)` | `drawCircleLines(centerX: number, centerY: number, radius: number, color: Color): void` | Draw circle outline |
| 225 | `void DrawCircleLinesV(Vector2 center, float radius, Color color)` | `drawCircleLinesV(center: Vector2, radius: number, color: Color): void` | Draw circle outline (Vector version) |
| 226 | `void DrawEllipse(int centerX, int centerY, float radiusH, float radiusV, Color color)` | `drawEllipse(centerX: number, centerY: number, radiusH: number, radiusV: number, color: Color): void` | Draw ellipse |
| 227 | `void DrawEllipseLines(int centerX, int centerY, float radiusH, float radiusV, Color color)` | `drawEllipseLines(centerX: number, centerY: number, radiusH: number, radiusV: number, color: Color): void` | Draw ellipse outline |
| 228 | `void DrawRing(Vector2 center, float innerRadius, float outerRadius, float startAngle, float endAngle, int segments, Color color)` | `drawRing(center: Vector2, innerRadius: number, outerRadius: number, startAngle: number, endAngle: number, segments: number, color: Color): void` | Draw ring |
| 229 | `void DrawRingLines(Vector2 center, float innerRadius, float outerRadius, float startAngle, float endAngle, int segments, Color color)` | `drawRingLines(center: Vector2, innerRadius: number, outerRadius: number, startAngle: number, endAngle: number, segments: number, color: Color): void` | Draw ring outline |
| 230 | `void DrawRectangle(int posX, int posY, int width, int height, Color color)` | `drawRectangle(posX: number, posY: number, width: number, height: number, color: Color): void` | Draw a color-filled rectangle |
| 231 | `void DrawRectangleV(Vector2 position, Vector2 size, Color color)` | `drawRectangleV(position: Vector2, size: Vector2, color: Color): void` | Draw a color-filled rectangle (Vector version) |
| 232 | `void DrawRectangleRec(Rectangle rec, Color color)` | `drawRectangleRec(rec: Rectangle, color: Color): void` | Draw a color-filled rectangle |
| 233 | `void DrawRectanglePro(Rectangle rec, Vector2 origin, float rotation, Color color)` | `drawRectanglePro(rec: Rectangle, origin: Vector2, rotation: number, color: Color): void` | Draw a color-filled rectangle with pro parameters |
| 234 | `void DrawRectangleGradientV(int posX, int posY, int width, int height, Color top, Color bottom)` | `drawRectangleGradientV(posX: number, posY: number, width: number, height: number, top: Color, bottom: Color): void` | Draw a vertical-gradient-filled rectangle |
| 235 | `void DrawRectangleGradientH(int posX, int posY, int width, int height, Color left, Color right)` | `drawRectangleGradientH(posX: number, posY: number, width: number, height: number, left: Color, right: Color): void` | Draw a horizontal-gradient-filled rectangle |
| 236 | `void DrawRectangleGradientEx(Rectangle rec, Color topLeft, Color bottomLeft, Color topRight, Color bottomRight)` | `drawRectangleGradientEx(rec: Rectangle, topLeft: Color, bottomLeft: Color, topRight: Color, bottomRight: Color): void` | Draw a gradient-filled rectangle with custom vertex colors |
| 237 | `void DrawRectangleLines(int posX, int posY, int width, int height, Color color)` | `drawRectangleLines(posX: number, posY: number, width: number, height: number, color: Color): void` | Draw rectangle outline |
| 238 | `void DrawRectangleLinesEx(Rectangle rec, float lineThick, Color color)` | `drawRectangleLinesEx(rec: Rectangle, lineThick: number, color: Color): void` | Draw rectangle outline with extended parameters |
| 239 | `void DrawRectangleRounded(Rectangle rec, float roundness, int segments, Color color)` | `drawRectangleRounded(rec: Rectangle, roundness: number, segments: number, color: Color): void` | Draw rectangle with rounded edges |
| 240 | `void DrawRectangleRoundedLines(Rectangle rec, float roundness, int segments, Color color)` | `drawRectangleRoundedLines(rec: Rectangle, roundness: number, segments: number, color: Color): void` | Draw rectangle lines with rounded edges |
| 241 | `void DrawRectangleRoundedLinesEx(Rectangle rec, float roundness, int segments, float lineThick, Color color)` | `drawRectangleRoundedLinesEx(rec: Rectangle, roundness: number, segments: number, lineThick: number, color: Color): void` | Draw rectangle with rounded edges outline |
| 242 | `void DrawTriangle(Vector2 v1, Vector2 v2, Vector2 v3, Color color)` | `drawTriangle(v1: Vector2, v2: Vector2, v3: Vector2, color: Color): void` | Draw a color-filled triangle (vertex in counter-clockwise order!) |
| 243 | `void DrawTriangleLines(Vector2 v1, Vector2 v2, Vector2 v3, Color color)` | `drawTriangleLines(v1: Vector2, v2: Vector2, v3: Vector2, color: Color): void` | Draw triangle outline (vertex in counter-clockwise order!) |
| 244 | `void DrawTriangleFan(const Vector2 * points, int pointCount, Color color)` | `drawTriangleFan(points: ArrayBuffer, pointCount: number, color: Color): void` | Draw a triangle fan defined by points (first vertex is the center) |
| 245 | `void DrawTriangleStrip(const Vector2 * points, int pointCount, Color color)` | `drawTriangleStrip(points: ArrayBuffer, pointCount: number, color: Color): void` | Draw a triangle strip defined by points |
| 246 | `void DrawPoly(Vector2 center, int sides, float radius, float rotation, Color color)` | `drawPoly(center: Vector2, sides: number, radius: number, rotation: number, color: Color): void` | Draw a regular polygon (Vector version) |
| 247 | `void DrawPolyLines(Vector2 center, int sides, float radius, float rotation, Color color)` | `drawPolyLines(center: Vector2, sides: number, radius: number, rotation: number, color: Color): void` | Draw a polygon outline of n sides |
| 248 | `void DrawPolyLinesEx(Vector2 center, int sides, float radius, float rotation, float lineThick, Color color)` | `drawPolyLinesEx(center: Vector2, sides: number, radius: number, rotation: number, lineThick: number, color: Color): void` | Draw a polygon outline of n sides with extended parameters |
| 249 | `void DrawSplineLinear(const Vector2 * points, int pointCount, float thick, Color color)` | `drawSplineLinear(points: Vector2, pointCount: number, thick: number, color: Color): void` | Draw spline: Linear, minimum 2 points |
| 250 | `void DrawSplineBasis(const Vector2 * points, int pointCount, float thick, Color color)` | `drawSplineBasis(points: Vector2, pointCount: number, thick: number, color: Color): void` | Draw spline: B-Spline, minimum 4 points |
| 251 | `void DrawSplineCatmullRom(const Vector2 * points, int pointCount, float thick, Color color)` | `drawSplineCatmullRom(points: Vector2, pointCount: number, thick: number, color: Color): void` | Draw spline: Catmull-Rom, minimum 4 points |
| 252 | `void DrawSplineBezierQuadratic(const Vector2 * points, int pointCount, float thick, Color color)` | `drawSplineBezierQuadratic(points: Vector2, pointCount: number, thick: number, color: Color): void` | Draw spline: Quadratic Bezier, minimum 3 points (1 control point): [p1, c2, p3, c4...] |
| 253 | `void DrawSplineBezierCubic(const Vector2 * points, int pointCount, float thick, Color color)` | `drawSplineBezierCubic(points: Vector2, pointCount: number, thick: number, color: Color): void` | Draw spline: Cubic Bezier, minimum 4 points (2 control points): [p1, c2, c3, p4, c5, c6...] |
| 254 | `void DrawSplineSegmentLinear(Vector2 p1, Vector2 p2, float thick, Color color)` | `drawSplineSegmentLinear(p1: Vector2, p2: Vector2, thick: number, color: Color): void` | Draw spline segment: Linear, 2 points |
| 255 | `void DrawSplineSegmentBasis(Vector2 p1, Vector2 p2, Vector2 p3, Vector2 p4, float thick, Color color)` | `drawSplineSegmentBasis(p1: Vector2, p2: Vector2, p3: Vector2, p4: Vector2, thick: number, color: Color): void` | Draw spline segment: B-Spline, 4 points |
| 256 | `void DrawSplineSegmentCatmullRom(Vector2 p1, Vector2 p2, Vector2 p3, Vector2 p4, float thick, Color color)` | `drawSplineSegmentCatmullRom(p1: Vector2, p2: Vector2, p3: Vector2, p4: Vector2, thick: number, color: Color): void` | Draw spline segment: Catmull-Rom, 4 points |
| 257 | `void DrawSplineSegmentBezierQuadratic(Vector2 p1, Vector2 c2, Vector2 p3, float thick, Color color)` | `drawSplineSegmentBezierQuadratic(p1: Vector2, c2: Vector2, p3: Vector2, thick: number, color: Color): void` | Draw spline segment: Quadratic Bezier, 2 points, 1 control point |
| 258 | `void DrawSplineSegmentBezierCubic(Vector2 p1, Vector2 c2, Vector2 c3, Vector2 p4, float thick, Color color)` | `drawSplineSegmentBezierCubic(p1: Vector2, c2: Vector2, c3: Vector2, p4: Vector2, thick: number, color: Color): void` | Draw spline segment: Cubic Bezier, 2 points, 2 control points |
| 259 | `Vector2 GetSplinePointLinear(Vector2 startPos, Vector2 endPos, float t)` | `getSplinePointLinear(startPos: Vector2, endPos: Vector2, t: number): Vector2` | Get (evaluate) spline point: Linear |
| 260 | `Vector2 GetSplinePointBasis(Vector2 p1, Vector2 p2, Vector2 p3, Vector2 p4, float t)` | `getSplinePointBasis(p1: Vector2, p2: Vector2, p3: Vector2, p4: Vector2, t: number): Vector2` | Get (evaluate) spline point: B-Spline |
| 261 | `Vector2 GetSplinePointCatmullRom(Vector2 p1, Vector2 p2, Vector2 p3, Vector2 p4, float t)` | `getSplinePointCatmullRom(p1: Vector2, p2: Vector2, p3: Vector2, p4: Vector2, t: number): Vector2` | Get (evaluate) spline point: Catmull-Rom |
| 262 | `Vector2 GetSplinePointBezierQuad(Vector2 p1, Vector2 c2, Vector2 p3, float t)` | `getSplinePointBezierQuad(p1: Vector2, c2: Vector2, p3: Vector2, t: number): Vector2` | Get (evaluate) spline point: Quadratic Bezier |
| 263 | `Vector2 GetSplinePointBezierCubic(Vector2 p1, Vector2 c2, Vector2 c3, Vector2 p4, float t)` | `getSplinePointBezierCubic(p1: Vector2, c2: Vector2, c3: Vector2, p4: Vector2, t: number): Vector2` | Get (evaluate) spline point: Cubic Bezier |
| 264 | `bool CheckCollisionRecs(Rectangle rec1, Rectangle rec2)` | `checkCollisionRecs(rec1: Rectangle, rec2: Rectangle): boolean` | Check collision between two rectangles |
| 265 | `bool CheckCollisionCircles(Vector2 center1, float radius1, Vector2 center2, float radius2)` | `checkCollisionCircles(center1: Vector2, radius1: number, center2: Vector2, radius2: number): boolean` | Check collision between two circles |
| 266 | `bool CheckCollisionCircleRec(Vector2 center, float radius, Rectangle rec)` | `checkCollisionCircleRec(center: Vector2, radius: number, rec: Rectangle): boolean` | Check collision between circle and rectangle |
| 267 | `bool CheckCollisionCircleLine(Vector2 center, float radius, Vector2 p1, Vector2 p2)` | `checkCollisionCircleLine(center: Vector2, radius: number, p1: Vector2, p2: Vector2): boolean` | Check if circle collides with a line created betweeen two points [p1] and [p2] |
| 268 | `bool CheckCollisionPointRec(Vector2 point, Rectangle rec)` | `checkCollisionPointRec(point: Vector2, rec: Rectangle): boolean` | Check if point is inside rectangle |
| 269 | `bool CheckCollisionPointCircle(Vector2 point, Vector2 center, float radius)` | `checkCollisionPointCircle(point: Vector2, center: Vector2, radius: number): boolean` | Check if point is inside circle |
| 270 | `bool CheckCollisionPointTriangle(Vector2 point, Vector2 p1, Vector2 p2, Vector2 p3)` | `checkCollisionPointTriangle(point: Vector2, p1: Vector2, p2: Vector2, p3: Vector2): boolean` | Check if point is inside a triangle |
| 271 | `bool CheckCollisionPointLine(Vector2 point, Vector2 p1, Vector2 p2, int threshold)` | `checkCollisionPointLine(point: Vector2, p1: Vector2, p2: Vector2, threshold: number): boolean` | Check if point belongs to line created between two points [p1] and [p2] with defined margin in pixels [threshold] |
| 272 | `bool CheckCollisionPointPoly(Vector2 point, const Vector2 * points, int pointCount)` | `checkCollisionPointPoly(point: Vector2, points: ArrayBuffer, pointCount: number): boolean` | Check if point is within a polygon described by array of vertices |
| 273 | `bool CheckCollisionLines(Vector2 startPos1, Vector2 endPos1, Vector2 startPos2, Vector2 endPos2, Vector2 * collisionPoint)` | `checkCollisionLines(startPos1: Vector2, endPos1: Vector2, startPos2: Vector2, endPos2: Vector2, collisionPoint: { x: number, y: number } \| null \| undefined): boolean` | Check the collision between two lines defined by two points each, returns collision point by reference |
| 274 | `Rectangle GetCollisionRec(Rectangle rec1, Rectangle rec2)` | `getCollisionRec(rec1: Rectangle, rec2: Rectangle): Rectangle` | Get collision rectangle for two rectangles collision |
| 275 | `Image LoadImage(const char * fileName)` | `loadImage(fileName: string \| undefined \| null): Image` | Load image from file into CPU memory (RAM) |
| 276 | `Image LoadImageRaw(const char * fileName, int width, int height, int format, int headerSize)` | `loadImageRaw(fileName: string \| undefined \| null, width: number, height: number, format: number, headerSize: number): Image` | Load image from RAW file data |
| 277 | `Image LoadImageAnim(const char * fileName, int * frames)` | `loadImageAnim(fileName: string \| undefined \| null, frames: { frames: number } \| null \| undefined): Image` | Load image sequence from file (frames appended to image.data) |
| 278 | `Image LoadImageAnimFromMemory(const char * fileType, const unsigned char * fileData, int dataSize, int * frames)` | `loadImageAnimFromMemory(fileType: string \| undefined \| null, fileData: ArrayBuffer, frames: { frames: number } \| null \| undefined): Image` | Load image sequence from memory buffer |
| 279 | `Image LoadImageFromMemory(const char * fileType, const unsigned char * fileData, int dataSize)` | `loadImageFromMemory(fileType: string \| undefined \| null, fileData: ArrayBuffer, dataSize: number): Image` | Load image from memory buffer, fileType refers to extension: i.e. '.png' |
| 280 | `Image LoadImageFromTexture(Texture2D texture)` | `loadImageFromTexture(texture: Texture): Image` | Load image from GPU texture data |
| 281 | `Image LoadImageFromScreen()` | `loadImageFromScreen(): Image` | Load image from screen buffer and (screenshot) |
| 282 | `bool IsImageValid(Image image)` | `isImageValid(image: Image): boolean` | Check if an image is valid (data and parameters) |
| 283 | `void UnloadImage(Image image)` | `unloadImage(image: Image): void` | Unload image from CPU memory (RAM) |
| 284 | `bool ExportImage(Image image, const char * fileName)` | `exportImage(image: Image, fileName: string \| undefined \| null): boolean` | Export image data to file, returns true on success |
| 285 | `unsigned char * ExportImageToMemory(Image image, const char * fileType, int * fileSize)` | `exportImageToMemory(image: Image, fileType: string \| undefined \| null): ArrayBuffer \| null` | Export image to memory buffer |
| 286 | `bool ExportImageAsCode(Image image, const char * fileName)` | `exportImageAsCode(image: Image, fileName: string \| undefined \| null): boolean` | Export image as code file defining an array of bytes, returns true on success |
| 287 | `Image GenImageColor(int width, int height, Color color)` | `genImageColor(width: number, height: number, color: Color): Image` | Generate image: plain color |
| 288 | `Image GenImageGradientLinear(int width, int height, int direction, Color start, Color end)` | `genImageGradientLinear(width: number, height: number, direction: number, start: Color, end: Color): Image` | Generate image: linear gradient, direction in degrees [0..360], 0=Vertical gradient |
| 289 | `Image GenImageGradientRadial(int width, int height, float density, Color inner, Color outer)` | `genImageGradientRadial(width: number, height: number, density: number, inner: Color, outer: Color): Image` | Generate image: radial gradient |
| 290 | `Image GenImageGradientSquare(int width, int height, float density, Color inner, Color outer)` | `genImageGradientSquare(width: number, height: number, density: number, inner: Color, outer: Color): Image` | Generate image: square gradient |
| 291 | `Image GenImageChecked(int width, int height, int checksX, int checksY, Color col1, Color col2)` | `genImageChecked(width: number, height: number, checksX: number, checksY: number, col1: Color, col2: Color): Image` | Generate image: checked |
| 292 | `Image GenImageWhiteNoise(int width, int height, float factor)` | `genImageWhiteNoise(width: number, height: number, factor: number): Image` | Generate image: white noise |
| 293 | `Image GenImagePerlinNoise(int width, int height, int offsetX, int offsetY, float scale)` | `genImagePerlinNoise(width: number, height: number, offsetX: number, offsetY: number, scale: number): Image` | Generate image: perlin noise |
| 294 | `Image GenImageCellular(int width, int height, int tileSize)` | `genImageCellular(width: number, height: number, tileSize: number): Image` | Generate image: cellular algorithm, bigger tileSize means bigger cells |
| 295 | `Image GenImageText(int width, int height, const char * text)` | `genImageText(width: number, height: number, text: string \| undefined \| null): Image` | Generate image: grayscale image from text data |
| 296 | `Image ImageCopy(Image image)` | `imageCopy(image: Image): Image` | Create an image duplicate (useful for transformations) |
| 297 | `Image ImageFromImage(Image image, Rectangle rec)` | `imageFromImage(image: Image, rec: Rectangle): Image` | Create an image from another image piece |
| 298 | `Image ImageFromChannel(Image image, int selectedChannel)` | `imageFromChannel(image: Image, selectedChannel: number): Image` | Create an image from a selected channel of another image (GRAYSCALE) |
| 299 | `Image ImageText(const char * text, int fontSize, Color color)` | `imageText(text: string \| undefined \| null, fontSize: number, color: Color): Image` | Create an image from text (default font) |
| 300 | `Image ImageTextEx(Font font, const char * text, float fontSize, float spacing, Color tint)` | `imageTextEx(font: Font, text: string \| undefined \| null, fontSize: number, spacing: number, tint: Color): Image` | Create an image from text (custom sprite font) |
| 301 | `void ImageFormat(Image * image, int newFormat)` | `imageFormat(image: Image, newFormat: number): void` | Convert image data to desired format |
| 302 | `void ImageToPOT(Image * image, Color fill)` | `imageToPOT(image: Image, fill: Color): void` | Convert image to POT (power-of-two) |
| 303 | `void ImageCrop(Image * image, Rectangle crop)` | `imageCrop(image: Image, crop: Rectangle): void` | Crop an image to a defined rectangle |
| 304 | `void ImageAlphaCrop(Image * image, float threshold)` | `imageAlphaCrop(image: Image, threshold: number): void` | Crop image depending on alpha value |
| 305 | `void ImageAlphaClear(Image * image, Color color, float threshold)` | `imageAlphaClear(image: Image, color: Color, threshold: number): void` | Clear alpha channel to desired color |
| 306 | `void ImageAlphaMask(Image * image, Image alphaMask)` | `imageAlphaMask(image: Image, alphaMask: Image): void` | Apply alpha mask to image |
| 307 | `void ImageAlphaPremultiply(Image * image)` | `imageAlphaPremultiply(image: Image): void` | Premultiply alpha channel |
| 308 | `void ImageBlurGaussian(Image * image, int blurSize)` | `imageBlurGaussian(image: Image, blurSize: number): void` | Apply Gaussian blur using a box blur approximation |
| 309 | `void ImageKernelConvolution(Image * image, const float * kernel, int kernelSize)` | `imageKernelConvolution(image: Image, kernel: ArrayBuffer, kernelSize: number): void` | Apply custom square convolution kernel to image |
| 310 | `void ImageResize(Image * image, int newWidth, int newHeight)` | `imageResize(image: Image, newWidth: number, newHeight: number): void` | Resize image (Bicubic scaling algorithm) |
| 311 | `void ImageResizeNN(Image * image, int newWidth, int newHeight)` | `imageResizeNN(image: Image, newWidth: number, newHeight: number): void` | Resize image (Nearest-Neighbor scaling algorithm) |
| 312 | `void ImageResizeCanvas(Image * image, int newWidth, int newHeight, int offsetX, int offsetY, Color fill)` | `imageResizeCanvas(image: Image, newWidth: number, newHeight: number, offsetX: number, offsetY: number, fill: Color): void` | Resize canvas and fill with color |
| 313 | `void ImageMipmaps(Image * image)` | `imageMipmaps(image: Image): void` | Compute all mipmap levels for a provided image |
| 314 | `void ImageDither(Image * image, int rBpp, int gBpp, int bBpp, int aBpp)` | `imageDither(image: Image, rBpp: number, gBpp: number, bBpp: number, aBpp: number): void` | Dither image data to 16bpp or lower (Floyd-Steinberg dithering) |
| 315 | `void ImageFlipVertical(Image * image)` | `imageFlipVertical(image: Image): void` | Flip image vertically |
| 316 | `void ImageFlipHorizontal(Image * image)` | `imageFlipHorizontal(image: Image): void` | Flip image horizontally |
| 317 | `void ImageRotate(Image * image, int degrees)` | `imageRotate(image: Image, degrees: number): void` | Rotate image by input angle in degrees (-359 to 359) |
| 318 | `void ImageRotateCW(Image * image)` | `imageRotateCW(image: Image): void` | Rotate image clockwise 90deg |
| 319 | `void ImageRotateCCW(Image * image)` | `imageRotateCCW(image: Image): void` | Rotate image counter-clockwise 90deg |
| 320 | `void ImageColorTint(Image * image, Color color)` | `imageColorTint(image: Image, color: Color): void` | Modify image color: tint |
| 321 | `void ImageColorInvert(Image * image)` | `imageColorInvert(image: Image): void` | Modify image color: invert |
| 322 | `void ImageColorGrayscale(Image * image)` | `imageColorGrayscale(image: Image): void` | Modify image color: grayscale |
| 323 | `void ImageColorContrast(Image * image, float contrast)` | `imageColorContrast(image: Image, contrast: number): void` | Modify image color: contrast (-100 to 100) |
| 324 | `void ImageColorBrightness(Image * image, int brightness)` | `imageColorBrightness(image: Image, brightness: number): void` | Modify image color: brightness (-255 to 255) |
| 325 | `void ImageColorReplace(Image * image, Color color, Color replace)` | `imageColorReplace(image: Image, color: Color, replace: Color): void` | Modify image color: replace color |
| 326 | `Color * LoadImageColors(Image image)` | `loadImageColors(image: Image): ArrayBuffer` | Load color data from image as a Color array (RGBA - 32bit) |
| 327 | `Color * LoadImagePalette(Image image, int maxPaletteSize, int * colorCount)` | `loadImagePalette(image: Image, maxPaletteSize: number, colorCount: { colorCount: number } \| null \| undefined): ArrayBuffer \| null` | Load colors palette from image as a Color array (RGBA - 32bit) |
| 328 | `void UnloadImageColors(Color * colors)` | `unloadImageColors(colors: Color): void` | Unload color data loaded with LoadImageColors() |
| 329 | `void UnloadImagePalette(Color * colors)` | `unloadImagePalette(colors: Color): void` | Unload colors palette loaded with LoadImagePalette() |
| 330 | `Rectangle GetImageAlphaBorder(Image image, float threshold)` | `getImageAlphaBorder(image: Image, threshold: number): Rectangle` | Get image alpha border rectangle |
| 331 | `Color GetImageColor(Image image, int x, int y)` | `getImageColor(image: Image, x: number, y: number): Color` | Get image pixel color at (x, y) position |
| 332 | `void ImageClearBackground(Image * dst, Color color)` | `imageClearBackground(dst: Image, color: Color): void` | Clear image background with given color |
| 333 | `void ImageDrawPixel(Image * dst, int posX, int posY, Color color)` | `imageDrawPixel(dst: Image, posX: number, posY: number, color: Color): void` | Draw pixel within an image |
| 334 | `void ImageDrawPixelV(Image * dst, Vector2 position, Color color)` | `imageDrawPixelV(dst: Image, position: Vector2, color: Color): void` | Draw pixel within an image (Vector version) |
| 335 | `void ImageDrawLine(Image * dst, int startPosX, int startPosY, int endPosX, int endPosY, Color color)` | `imageDrawLine(dst: Image, startPosX: number, startPosY: number, endPosX: number, endPosY: number, color: Color): void` | Draw line within an image |
| 336 | `void ImageDrawLineV(Image * dst, Vector2 start, Vector2 end, Color color)` | `imageDrawLineV(dst: Image, start: Vector2, end: Vector2, color: Color): void` | Draw line within an image (Vector version) |
| 337 | `void ImageDrawLineEx(Image * dst, Vector2 start, Vector2 end, int thick, Color color)` | `imageDrawLineEx(dst: Image, start: Vector2, end: Vector2, thick: number, color: Color): void` | Draw a line defining thickness within an image |
| 338 | `void ImageDrawCircle(Image * dst, int centerX, int centerY, int radius, Color color)` | `imageDrawCircle(dst: Image, centerX: number, centerY: number, radius: number, color: Color): void` | Draw a filled circle within an image |
| 339 | `void ImageDrawCircleV(Image * dst, Vector2 center, int radius, Color color)` | `imageDrawCircleV(dst: Image, center: Vector2, radius: number, color: Color): void` | Draw a filled circle within an image (Vector version) |
| 340 | `void ImageDrawCircleLines(Image * dst, int centerX, int centerY, int radius, Color color)` | `imageDrawCircleLines(dst: Image, centerX: number, centerY: number, radius: number, color: Color): void` | Draw circle outline within an image |
| 341 | `void ImageDrawCircleLinesV(Image * dst, Vector2 center, int radius, Color color)` | `imageDrawCircleLinesV(dst: Image, center: Vector2, radius: number, color: Color): void` | Draw circle outline within an image (Vector version) |
| 342 | `void ImageDrawRectangle(Image * dst, int posX, int posY, int width, int height, Color color)` | `imageDrawRectangle(dst: Image, posX: number, posY: number, width: number, height: number, color: Color): void` | Draw rectangle within an image |
| 343 | `void ImageDrawRectangleV(Image * dst, Vector2 position, Vector2 size, Color color)` | `imageDrawRectangleV(dst: Image, position: Vector2, size: Vector2, color: Color): void` | Draw rectangle within an image (Vector version) |
| 344 | `void ImageDrawRectangleRec(Image * dst, Rectangle rec, Color color)` | `imageDrawRectangleRec(dst: Image, rec: Rectangle, color: Color): void` | Draw rectangle within an image |
| 345 | `void ImageDrawRectangleLines(Image * dst, Rectangle rec, int thick, Color color)` | `imageDrawRectangleLines(dst: Image, rec: Rectangle, thick: number, color: Color): void` | Draw rectangle lines within an image |
| 346 | `void ImageDrawTriangle(Image * dst, Vector2 v1, Vector2 v2, Vector2 v3, Color color)` | `imageDrawTriangle(dst: Image, v1: Vector2, v2: Vector2, v3: Vector2, color: Color): void` | Draw triangle within an image |
| 347 | `void ImageDrawTriangleEx(Image * dst, Vector2 v1, Vector2 v2, Vector2 v3, Color c1, Color c2, Color c3)` | `imageDrawTriangleEx(dst: Image, v1: Vector2, v2: Vector2, v3: Vector2, c1: Color, c2: Color, c3: Color): void` | Draw triangle with interpolated colors within an image |
| 348 | `void ImageDrawTriangleLines(Image * dst, Vector2 v1, Vector2 v2, Vector2 v3, Color color)` | `imageDrawTriangleLines(dst: Image, v1: Vector2, v2: Vector2, v3: Vector2, color: Color): void` | Draw triangle outline within an image |
| 349 | `void ImageDrawTriangleFan(Image * dst, Vector2 * points, int pointCount, Color color)` | `imageDrawTriangleFan(dst: Image, points: Vector2, pointCount: number, color: Color): void` | Draw a triangle fan defined by points within an image (first vertex is the center) |
| 350 | `void ImageDrawTriangleStrip(Image * dst, Vector2 * points, int pointCount, Color color)` | `imageDrawTriangleStrip(dst: Image, points: Vector2, pointCount: number, color: Color): void` | Draw a triangle strip defined by points within an image |
| 351 | `void ImageDraw(Image * dst, Image src, Rectangle srcRec, Rectangle dstRec, Color tint)` | `imageDraw(dst: Image, src: Image, srcRec: Rectangle, dstRec: Rectangle, tint: Color): void` | Draw a source image within a destination image (tint applied to source) |
| 352 | `void ImageDrawText(Image * dst, const char * text, int posX, int posY, int fontSize, Color color)` | `imageDrawText(dst: Image, text: string \| undefined \| null, posX: number, posY: number, fontSize: number, color: Color): void` | Draw text (using default font) within an image (destination) |
| 353 | `void ImageDrawTextEx(Image * dst, Font font, const char * text, Vector2 position, float fontSize, float spacing, Color tint)` | `imageDrawTextEx(dst: Image, font: Font, text: string \| undefined \| null, position: Vector2, fontSize: number, spacing: number, tint: Color): void` | Draw text (custom sprite font) within an image (destination) |
| 354 | `Texture2D LoadTexture(const char * fileName)` | `loadTexture(fileName: string \| undefined \| null): Texture` | Load texture from file into GPU memory (VRAM) |
| 355 | `Texture2D LoadTextureFromImage(Image image)` | `loadTextureFromImage(image: Image): Texture` | Load texture from image data |
| 356 | `TextureCubemap LoadTextureCubemap(Image image, int layout)` | `loadTextureCubemap(image: Image, layout: number): Texture` | Load cubemap from image, multiple image cubemap layouts supported |
| 357 | `RenderTexture2D LoadRenderTexture(int width, int height)` | `loadRenderTexture(width: number, height: number): RenderTexture` | Load texture for rendering (framebuffer) |
| 358 | `bool IsTextureValid(Texture2D texture)` | `isTextureValid(texture: Texture): boolean` | Check if a texture is valid (loaded in GPU) |
| 359 | `void UnloadTexture(Texture2D texture)` | `unloadTexture(texture: Texture): void` | Unload texture from GPU memory (VRAM) |
| 360 | `bool IsRenderTextureValid(RenderTexture2D target)` | `isRenderTextureValid(target: RenderTexture): boolean` | Check if a render texture is valid (loaded in GPU) |
| 361 | `void UnloadRenderTexture(RenderTexture2D target)` | `unloadRenderTexture(target: RenderTexture): void` | Unload render texture from GPU memory (VRAM) |
| 362 | `void UpdateTexture(Texture2D texture, const void * pixels)` | `updateTexture(texture: Texture, pixels: any): void` | Update GPU texture with new data |
| 363 | `void UpdateTextureRec(Texture2D texture, Rectangle rec, const void * pixels)` | `updateTextureRec(texture: Texture, rec: Rectangle, pixels: any): void` | Update GPU texture rectangle with new data |
| 364 | `void GenTextureMipmaps(Texture2D * texture)` | `genTextureMipmaps(texture: Texture): void` | Generate GPU mipmaps for a texture |
| 365 | `void SetTextureFilter(Texture2D texture, int filter)` | `setTextureFilter(texture: Texture, filter: number): void` | Set texture scaling filter mode |
| 366 | `void SetTextureWrap(Texture2D texture, int wrap)` | `setTextureWrap(texture: Texture, wrap: number): void` | Set texture wrapping mode |
| 367 | `void DrawTexture(Texture2D texture, int posX, int posY, Color tint)` | `drawTexture(texture: Texture, posX: number, posY: number, tint: Color): void` | Draw a Texture2D |
| 368 | `void DrawTextureV(Texture2D texture, Vector2 position, Color tint)` | `drawTextureV(texture: Texture, position: Vector2, tint: Color): void` | Draw a Texture2D with position defined as Vector2 |
| 369 | `void DrawTextureEx(Texture2D texture, Vector2 position, float rotation, float scale, Color tint)` | `drawTextureEx(texture: Texture, position: Vector2, rotation: number, scale: number, tint: Color): void` | Draw a Texture2D with extended parameters |
| 370 | `void DrawTextureRec(Texture2D texture, Rectangle source, Vector2 position, Color tint)` | `drawTextureRec(texture: Texture, source: Rectangle, position: Vector2, tint: Color): void` | Draw a part of a texture defined by a rectangle |
| 371 | `void DrawTexturePro(Texture2D texture, Rectangle source, Rectangle dest, Vector2 origin, float rotation, Color tint)` | `drawTexturePro(texture: Texture, source: Rectangle, dest: Rectangle, origin: Vector2, rotation: number, tint: Color): void` | Draw a part of a texture defined by a rectangle with 'pro' parameters |
| 372 | `void DrawTextureNPatch(Texture2D texture, NPatchInfo nPatchInfo, Rectangle dest, Vector2 origin, float rotation, Color tint)` | `drawTextureNPatch(texture: Texture, nPatchInfo: NPatchInfo, dest: Rectangle, origin: Vector2, rotation: number, tint: Color): void` | Draws a texture (or part of it) that stretches or shrinks nicely |
| 373 | `bool ColorIsEqual(Color col1, Color col2)` | `colorIsEqual(col1: Color, col2: Color): boolean` | Check if two colors are equal |
| 374 | `Color Fade(Color color, float alpha)` | `fade(color: Color, alpha: number): Color` | Get color with alpha applied, alpha goes from 0.0f to 1.0f |
| 375 | `int ColorToInt(Color color)` | `colorToInt(color: Color): number` | Get hexadecimal value for a Color (0xRRGGBBAA) |
| 376 | `Vector4 ColorNormalize(Color color)` | `colorNormalize(color: Color): Vector4` | Get Color normalized as float [0..1] |
| 377 | `Color ColorFromNormalized(Vector4 normalized)` | `colorFromNormalized(normalized: Vector4): Color` | Get Color from normalized values [0..1] |
| 378 | `Vector3 ColorToHSV(Color color)` | `colorToHSV(color: Color): Vector3` | Get HSV values for a Color, hue [0..360], saturation/value [0..1] |
| 379 | `Color ColorFromHSV(float hue, float saturation, float value)` | `colorFromHSV(hue: number, saturation: number, value: number): Color` | Get a Color from HSV values, hue [0..360], saturation/value [0..1] |
| 380 | `Color ColorTint(Color color, Color tint)` | `colorTint(color: Color, tint: Color): Color` | Get color multiplied with another color |
| 381 | `Color ColorBrightness(Color color, float factor)` | `colorBrightness(color: Color, factor: number): Color` | Get color with brightness correction, brightness factor goes from -1.0f to 1.0f |
| 382 | `Color ColorContrast(Color color, float contrast)` | `colorContrast(color: Color, contrast: number): Color` | Get color with contrast correction, contrast values between -1.0f and 1.0f |
| 383 | `Color ColorAlpha(Color color, float alpha)` | `colorAlpha(color: Color, alpha: number): Color` | Get color with alpha applied, alpha goes from 0.0f to 1.0f |
| 384 | `Color ColorAlphaBlend(Color dst, Color src, Color tint)` | `colorAlphaBlend(dst: Color, src: Color, tint: Color): Color` | Get src alpha-blended into dst color with tint |
| 385 | `Color ColorLerp(Color color1, Color color2, float factor)` | `colorLerp(color1: Color, color2: Color, factor: number): Color` | Get color lerp interpolation between two colors, factor [0.0f..1.0f] |
| 386 | `Color GetColor(unsigned int hexValue)` | `getColor(hexValue: number): Color` | Get Color structure from hexadecimal value |
| 387 | `Color GetPixelColor(void * srcPtr, int format)` | `getPixelColor(srcPtr: any, format: number): Color` | Get Color from a source pixel pointer of certain format |
| 388 | `void SetPixelColor(void * dstPtr, Color color, int format)` | `setPixelColor(dstPtr: any, color: Color, format: number): void` | Set color formatted into destination pixel pointer |
| 389 | `int GetPixelDataSize(int width, int height, int format)` | `getPixelDataSize(width: number, height: number, format: number): number` | Get pixel data size in bytes for certain format |
| 390 | `Font GetFontDefault()` | `getFontDefault(): Font` | Get the default Font |
| 391 | `Font LoadFont(const char * fileName)` | `loadFont(fileName: string \| undefined \| null): Font` | Load font from file into GPU memory (VRAM) |
| 392 | `Font LoadFontEx(const char * fileName, int fontSize, int * codepoints, int codepointCount)` | `loadFontEx(fileName: string \| undefined \| null, fontSize: number): Font` | Load font from file with extended parameters, use NULL for codepoints and 0 for codepointCount to load the default character set, font size is provided in pixels height |
| 393 | `Font LoadFontFromImage(Image image, Color key, int firstChar)` | `loadFontFromImage(image: Image, key: Color, firstChar: number): Font` | Load font from Image (XNA style) |
| 394 | `Font LoadFontFromMemory(const char * fileType, const unsigned char * fileData, int dataSize, int fontSize, int * codepoints, int codepointCount)` | `loadFontFromMemory(fileType: string \| undefined \| null, fileData: ArrayBuffer, fontSize: number): Font` | Load font from memory buffer, fileType refers to extension: i.e. '.ttf' |
| 395 | `bool IsFontValid(Font font)` | `isFontValid(font: Font): boolean` | Check if a font is valid (font data loaded, WARNING: GPU texture not checked) |
| 396 | `GlyphInfo * LoadFontData(const unsigned char * fileData, int dataSize, int fontSize, int * codepoints, int codepointCount, int type)` | `loadFontData(fileData: ArrayBuffer, fontSize: number, codepoints: ArrayBuffer \| null \| undefined, codepointCount: number, type: number): GlyphInfo[] \| null` | Load font data for further use |
| 397 | `Image GenImageFontAtlas(const GlyphInfo * glyphs, Rectangle ** glyphRecs, int glyphCount, int fontSize, int padding, int packMethod)` | `genImageFontAtlas(glyphs: GlyphInfo[], fontSize: number, padding: number, packMethod: number): Image` | Generate image font atlas using chars info |
| 398 | `void UnloadFontData(GlyphInfo * glyphs, int glyphCount)` | `unloadFontData(glyphs: GlyphInfo, glyphCount: number): void` | Unload font chars info data (RAM) |
| 399 | `void UnloadFont(Font font)` | `unloadFont(font: Font): void` | Unload font from GPU memory (VRAM) |
| 400 | `bool ExportFontAsCode(Font font, const char * fileName)` | `exportFontAsCode(font: Font, fileName: string \| undefined \| null): boolean` | Export font as code file, returns true on success |
| 401 | `void DrawFPS(int posX, int posY)` | `drawFPS(posX: number, posY: number): void` | Draw current FPS |
| 402 | `void DrawText(const char * text, int posX, int posY, int fontSize, Color color)` | `drawText(text: string \| undefined \| null, posX: number, posY: number, fontSize: number, color: Color): void` | Draw text (using default font) |
| 403 | `void DrawTextEx(Font font, const char * text, Vector2 position, float fontSize, float spacing, Color tint)` | `drawTextEx(font: Font, text: string \| undefined \| null, position: Vector2, fontSize: number, spacing: number, tint: Color): void` | Draw text using font and additional parameters |
| 404 | `void DrawTextPro(Font font, const char * text, Vector2 position, Vector2 origin, float rotation, float fontSize, float spacing, Color tint)` | `drawTextPro(font: Font, text: string \| undefined \| null, position: Vector2, origin: Vector2, rotation: number, fontSize: number, spacing: number, tint: Color): void` | Draw text using Font and pro parameters (rotation) |
| 405 | `void DrawTextCodepoint(Font font, int codepoint, Vector2 position, float fontSize, Color tint)` | `drawTextCodepoint(font: Font, codepoint: number, position: Vector2, fontSize: number, tint: Color): void` | Draw one character (codepoint) |
| 406 | `void DrawTextCodepoints(Font font, const int * codepoints, int codepointCount, Vector2 position, float fontSize, float spacing, Color tint)` | `drawTextCodepoints(font: Font, codepoints: ArrayBuffer, codepointCount: number, position: Vector2, fontSize: number, spacing: number, tint: Color): void` | Draw multiple character (codepoint) |
| 407 | `void SetTextLineSpacing(int spacing)` | `setTextLineSpacing(spacing: number): void` | Set vertical line spacing when drawing with line-breaks |
| 408 | `int MeasureText(const char * text, int fontSize)` | `measureText(text: string \| undefined \| null, fontSize: number): number` | Measure string width for default font |
| 409 | `Vector2 MeasureTextEx(Font font, const char * text, float fontSize, float spacing)` | `measureTextEx(font: Font, text: string \| undefined \| null, fontSize: number, spacing: number): Vector2` | Measure string size for Font |
| 410 | `int GetGlyphIndex(Font font, int codepoint)` | `getGlyphIndex(font: Font, codepoint: number): number` | Get glyph index position in font for a codepoint (unicode character), fallback to '?' if not found |
| 411 | `GlyphInfo GetGlyphInfo(Font font, int codepoint)` | `getGlyphInfo(font: Font, codepoint: number): GlyphInfo` | Get glyph font info data for a codepoint (unicode character), fallback to '?' if not found |
| 412 | `Rectangle GetGlyphAtlasRec(Font font, int codepoint)` | `getGlyphAtlasRec(font: Font, codepoint: number): Rectangle` | Get glyph rectangle in font atlas for a codepoint (unicode character), fallback to '?' if not found |
| 413 | `char * LoadUTF8(const int * codepoints, int length)` | `loadUTF8(codepoints: ArrayBuffer, length: number): string \| null` | Load UTF-8 text encoded from codepoints array |
| 414 | `void UnloadUTF8(char * text)` | `unloadUTF8(text: string \| undefined \| null): void` | Unload UTF-8 text encoded from codepoints array |
| 415 | `int * LoadCodepoints(const char * text, int * count)` | `loadCodepoints(text: string \| undefined \| null, count: { count: number } \| null \| undefined): ArrayBuffer \| null` | Load all codepoints from a UTF-8 text string, codepoints count returned by parameter |
| 416 | `void UnloadCodepoints(int * codepoints)` | `unloadCodepoints(codepoints: int): void` | Unload codepoints data from memory |
| 417 | `int GetCodepointCount(const char * text)` | `getCodepointCount(text: string \| undefined \| null): number` | Get total number of codepoints in a UTF-8 encoded string |
| 418 | `int GetCodepoint(const char * text, int * codepointSize)` | `getCodepoint(text: string \| undefined \| null, codepointSize: { codepointSize: number } \| null \| undefined): number` | Get next codepoint in a UTF-8 encoded string, 0x3f('?') is returned on failure |
| 419 | `int GetCodepointNext(const char * text, int * codepointSize)` | `getCodepointNext(text: string \| undefined \| null, codepointSize: { codepointSize: number } \| null \| undefined): number` | Get next codepoint in a UTF-8 encoded string, 0x3f('?') is returned on failure |
| 420 | `int GetCodepointPrevious(const char * text, int * codepointSize)` | `getCodepointPrevious(text: string \| undefined \| null, codepointSize: { codepointSize: number } \| null \| undefined): number` | Get previous codepoint in a UTF-8 encoded string, 0x3f('?') is returned on failure |
| 421 | `const char * CodepointToUTF8(int codepoint, int * utf8Size)` | `codepointToUTF8(codepoint: number, utf8Size: { utf8Size: number } \| null \| undefined): string \| undefined \| null` | Encode one codepoint into UTF-8 byte array (array length returned as parameter) |
| 422 | `int TextCopy(char * dst, const char * src)` | `textCopy(dst: { text: string } \| null \| undefined, src: string \| undefined \| null): number` | Copy one string to another, returns bytes copied |
| 423 | `bool TextIsEqual(const char * text1, const char * text2)` | `textIsEqual(text1: string \| undefined \| null, text2: string \| undefined \| null): boolean` | Check if two text string are equal |
| 424 | `unsigned int TextLength(const char * text)` | `textLength(text: string \| undefined \| null): number` | Get text length, checks for '\0' ending |
| 425 | `const char * TextFormat(const char * text, ... args)` | `textFormat(text: string \| undefined \| null): string \| undefined \| null` | Text formatting with variables (sprintf() style) |
| 426 | `const char * TextSubtext(const char * text, int position, int length)` | `textSubtext(text: string \| undefined \| null, position: number, length: number): string \| undefined \| null` | Get a piece of a text string |
| 427 | `char * TextReplace(const char * text, const char * replace, const char * by)` | `textReplace(text: string \| undefined \| null, replace: string \| undefined \| null, by: string \| undefined \| null): string \| undefined \| null` | Replace text string (WARNING: memory must be freed!) |
| 428 | `char * TextInsert(const char * text, const char * insert, int position)` | `textInsert(text: string \| undefined \| null, insert: string \| undefined \| null, position: number): string \| undefined \| null` | Insert text in a position (WARNING: memory must be freed!) |
| 429 | `const char * TextJoin(const char ** textList, int count, const char * delimiter)` | `textJoin(textList: string[], delimiter: string \| undefined \| null): string \| undefined \| null` | Join text strings with delimiter |
| 430 | `const char ** TextSplit(const char * text, char delimiter, int * count)` | `textSplit(text: string \| undefined \| null, delimiter: string \| null \| undefined, count: { count: number } \| null \| undefined): string[]` | Split text into multiple strings |
| 431 | `void TextAppend(char * text, const char * append, int * position)` | `textAppend(text: { text: string, position?: number } \| null \| undefined, append: string \| undefined \| null, position: { position: number } \| null \| undefined): void` | Append text at specific position and move cursor! |
| 432 | `int TextFindIndex(const char * text, const char * find)` | `textFindIndex(text: string \| undefined \| null, find: string \| undefined \| null): number` | Find first text occurrence within a string |
| 433 | `const char * TextToUpper(const char * text)` | `textToUpper(text: string \| undefined \| null): string \| undefined \| null` | Get upper case version of provided string |
| 434 | `const char * TextToLower(const char * text)` | `textToLower(text: string \| undefined \| null): string \| undefined \| null` | Get lower case version of provided string |
| 435 | `const char * TextToPascal(const char * text)` | `textToPascal(text: string \| undefined \| null): string \| undefined \| null` | Get Pascal case notation version of provided string |
| 436 | `const char * TextToSnake(const char * text)` | `textToSnake(text: string \| undefined \| null): string \| undefined \| null` | Get Snake case notation version of provided string |
| 437 | `const char * TextToCamel(const char * text)` | `textToCamel(text: string \| undefined \| null): string \| undefined \| null` | Get Camel case notation version of provided string |
| 438 | `int TextToInteger(const char * text)` | `textToInteger(text: string \| undefined \| null): number` | Get integer value from text (negative values not supported) |
| 439 | `float TextToFloat(const char * text)` | `textToFloat(text: string \| undefined \| null): number` | Get float value from text (negative values not supported) |
| 440 | `void DrawLine3D(Vector3 startPos, Vector3 endPos, Color color)` | `drawLine3D(startPos: Vector3, endPos: Vector3, color: Color): void` | Draw a line in 3D world space |
| 441 | `void DrawPoint3D(Vector3 position, Color color)` | `drawPoint3D(position: Vector3, color: Color): void` | Draw a point in 3D space, actually a small line |
| 442 | `void DrawCircle3D(Vector3 center, float radius, Vector3 rotationAxis, float rotationAngle, Color color)` | `drawCircle3D(center: Vector3, radius: number, rotationAxis: Vector3, rotationAngle: number, color: Color): void` | Draw a circle in 3D world space |
| 443 | `void DrawTriangle3D(Vector3 v1, Vector3 v2, Vector3 v3, Color color)` | `drawTriangle3D(v1: Vector3, v2: Vector3, v3: Vector3, color: Color): void` | Draw a color-filled triangle (vertex in counter-clockwise order!) |
| 444 | `void DrawTriangleStrip3D(const Vector3 * points, int pointCount, Color color)` | `drawTriangleStrip3D(points: ArrayBuffer, pointCount: number, color: Color): void` | Draw a triangle strip defined by points |
| 445 | `void DrawCube(Vector3 position, float width, float height, float length, Color color)` | `drawCube(position: Vector3, width: number, height: number, length: number, color: Color): void` | Draw cube |
| 446 | `void DrawCubeV(Vector3 position, Vector3 size, Color color)` | `drawCubeV(position: Vector3, size: Vector3, color: Color): void` | Draw cube (Vector version) |
| 447 | `void DrawCubeWires(Vector3 position, float width, float height, float length, Color color)` | `drawCubeWires(position: Vector3, width: number, height: number, length: number, color: Color): void` | Draw cube wires |
| 448 | `void DrawCubeWiresV(Vector3 position, Vector3 size, Color color)` | `drawCubeWiresV(position: Vector3, size: Vector3, color: Color): void` | Draw cube wires (Vector version) |
| 449 | `void DrawSphere(Vector3 centerPos, float radius, Color color)` | `drawSphere(centerPos: Vector3, radius: number, color: Color): void` | Draw sphere |
| 450 | `void DrawSphereEx(Vector3 centerPos, float radius, int rings, int slices, Color color)` | `drawSphereEx(centerPos: Vector3, radius: number, rings: number, slices: number, color: Color): void` | Draw sphere with extended parameters |
| 451 | `void DrawSphereWires(Vector3 centerPos, float radius, int rings, int slices, Color color)` | `drawSphereWires(centerPos: Vector3, radius: number, rings: number, slices: number, color: Color): void` | Draw sphere wires |
| 452 | `void DrawCylinder(Vector3 position, float radiusTop, float radiusBottom, float height, int slices, Color color)` | `drawCylinder(position: Vector3, radiusTop: number, radiusBottom: number, height: number, slices: number, color: Color): void` | Draw a cylinder/cone |
| 453 | `void DrawCylinderEx(Vector3 startPos, Vector3 endPos, float startRadius, float endRadius, int sides, Color color)` | `drawCylinderEx(startPos: Vector3, endPos: Vector3, startRadius: number, endRadius: number, sides: number, color: Color): void` | Draw a cylinder with base at startPos and top at endPos |
| 454 | `void DrawCylinderWires(Vector3 position, float radiusTop, float radiusBottom, float height, int slices, Color color)` | `drawCylinderWires(position: Vector3, radiusTop: number, radiusBottom: number, height: number, slices: number, color: Color): void` | Draw a cylinder/cone wires |
| 455 | `void DrawCylinderWiresEx(Vector3 startPos, Vector3 endPos, float startRadius, float endRadius, int sides, Color color)` | `drawCylinderWiresEx(startPos: Vector3, endPos: Vector3, startRadius: number, endRadius: number, sides: number, color: Color): void` | Draw a cylinder wires with base at startPos and top at endPos |
| 456 | `void DrawCapsule(Vector3 startPos, Vector3 endPos, float radius, int slices, int rings, Color color)` | `drawCapsule(startPos: Vector3, endPos: Vector3, radius: number, slices: number, rings: number, color: Color): void` | Draw a capsule with the center of its sphere caps at startPos and endPos |
| 457 | `void DrawCapsuleWires(Vector3 startPos, Vector3 endPos, float radius, int slices, int rings, Color color)` | `drawCapsuleWires(startPos: Vector3, endPos: Vector3, radius: number, slices: number, rings: number, color: Color): void` | Draw capsule wireframe with the center of its sphere caps at startPos and endPos |
| 458 | `void DrawPlane(Vector3 centerPos, Vector2 size, Color color)` | `drawPlane(centerPos: Vector3, size: Vector2, color: Color): void` | Draw a plane XZ |
| 459 | `void DrawRay(Ray ray, Color color)` | `drawRay(ray: Ray, color: Color): void` | Draw a ray line |
| 460 | `void DrawGrid(int slices, float spacing)` | `drawGrid(slices: number, spacing: number): void` | Draw a grid (centered at (0, 0, 0)) |
| 461 | `Model LoadModel(const char * fileName)` | `loadModel(fileName: string \| undefined \| null): Model` | Load model from files (meshes and materials) |
| 462 | `Model LoadModelFromMesh(Mesh mesh)` | `loadModelFromMesh(mesh: Mesh): Model` | Load model from generated mesh (default material) |
| 463 | `bool IsModelValid(Model model)` | `isModelValid(model: Model): boolean` | Check if a model is valid (loaded in GPU, VAO/VBOs) |
| 464 | `void UnloadModel(Model model)` | `unloadModel(model: Model): void` | Unload model (including meshes) from memory (RAM and/or VRAM) |
| 465 | `BoundingBox GetModelBoundingBox(Model model)` | `getModelBoundingBox(model: Model): BoundingBox` | Compute model bounding box limits (considers all meshes) |
| 466 | `void DrawModel(Model model, Vector3 position, float scale, Color tint)` | `drawModel(model: Model, position: Vector3, scale: number, tint: Color): void` | Draw a model (with texture if set) |
| 467 | `void DrawModelEx(Model model, Vector3 position, Vector3 rotationAxis, float rotationAngle, Vector3 scale, Color tint)` | `drawModelEx(model: Model, position: Vector3, rotationAxis: Vector3, rotationAngle: number, scale: Vector3, tint: Color): void` | Draw a model with extended parameters |
| 468 | `void DrawModelWires(Model model, Vector3 position, float scale, Color tint)` | `drawModelWires(model: Model, position: Vector3, scale: number, tint: Color): void` | Draw a model wires (with texture if set) |
| 469 | `void DrawModelWiresEx(Model model, Vector3 position, Vector3 rotationAxis, float rotationAngle, Vector3 scale, Color tint)` | `drawModelWiresEx(model: Model, position: Vector3, rotationAxis: Vector3, rotationAngle: number, scale: Vector3, tint: Color): void` | Draw a model wires (with texture if set) with extended parameters |
| 470 | `void DrawModelPoints(Model model, Vector3 position, float scale, Color tint)` | `drawModelPoints(model: Model, position: Vector3, scale: number, tint: Color): void` | Draw a model as points |
| 471 | `void DrawModelPointsEx(Model model, Vector3 position, Vector3 rotationAxis, float rotationAngle, Vector3 scale, Color tint)` | `drawModelPointsEx(model: Model, position: Vector3, rotationAxis: Vector3, rotationAngle: number, scale: Vector3, tint: Color): void` | Draw a model as points with extended parameters |
| 472 | `void DrawBoundingBox(BoundingBox box, Color color)` | `drawBoundingBox(box: BoundingBox, color: Color): void` | Draw bounding box (wires) |
| 473 | `void DrawBillboard(Camera camera, Texture2D texture, Vector3 position, float scale, Color tint)` | `drawBillboard(camera: Camera3D, texture: Texture, position: Vector3, scale: number, tint: Color): void` | Draw a billboard texture |
| 474 | `void DrawBillboardRec(Camera camera, Texture2D texture, Rectangle source, Vector3 position, Vector2 size, Color tint)` | `drawBillboardRec(camera: Camera3D, texture: Texture, source: Rectangle, position: Vector3, size: Vector2, tint: Color): void` | Draw a billboard texture defined by source |
| 475 | `void DrawBillboardPro(Camera camera, Texture2D texture, Rectangle source, Vector3 position, Vector3 up, Vector2 size, Vector2 origin, float rotation, Color tint)` | `drawBillboardPro(camera: Camera3D, texture: Texture, source: Rectangle, position: Vector3, up: Vector3, size: Vector2, origin: Vector2, rotation: number, tint: Color): void` | Draw a billboard texture defined by source and rotation |
| 476 | `void UploadMesh(Mesh * mesh, bool dynamic)` | `uploadMesh(mesh: Mesh, dynamic: boolean): void` | Upload mesh vertex data in GPU and provide VAO/VBO ids |
| 477 | `void UpdateMeshBuffer(Mesh mesh, int index, const void * data, int dataSize, int offset)` | `updateMeshBuffer(mesh: Mesh, index: number, data: any, dataSize: number, offset: number): void` | Update mesh vertex data in GPU for a specific buffer index |
| 478 | `void UnloadMesh(Mesh mesh)` | `unloadMesh(mesh: Mesh): void` | Unload mesh data from CPU and GPU |
| 479 | `void DrawMesh(Mesh mesh, Material material, Matrix transform)` | `drawMesh(mesh: Mesh, material: Material, transform: Matrix): void` | Draw a 3d mesh with material and transform |
| 480 | `void DrawMeshInstanced(Mesh mesh, Material material, const Matrix * transforms, int instances)` | `drawMeshInstanced(mesh: Mesh, material: Material, transforms: Matrix, instances: number): void` | Draw multiple mesh instances with material and different transforms |
| 481 | `BoundingBox GetMeshBoundingBox(Mesh mesh)` | `getMeshBoundingBox(mesh: Mesh): BoundingBox` | Compute mesh bounding box limits |
| 482 | `void GenMeshTangents(Mesh * mesh)` | `genMeshTangents(mesh: Mesh): void` | Compute mesh tangents |
| 483 | `bool ExportMesh(Mesh mesh, const char * fileName)` | `exportMesh(mesh: Mesh, fileName: string \| undefined \| null): boolean` | Export mesh data to file, returns true on success |
| 484 | `bool ExportMeshAsCode(Mesh mesh, const char * fileName)` | `exportMeshAsCode(mesh: Mesh, fileName: string \| undefined \| null): boolean` | Export mesh as code file (.h) defining multiple arrays of vertex attributes |
| 485 | `Mesh GenMeshPoly(int sides, float radius)` | `genMeshPoly(sides: number, radius: number): Mesh` | Generate polygonal mesh |
| 486 | `Mesh GenMeshPlane(float width, float length, int resX, int resZ)` | `genMeshPlane(width: number, length: number, resX: number, resZ: number): Mesh` | Generate plane mesh (with subdivisions) |
| 487 | `Mesh GenMeshCube(float width, float height, float length)` | `genMeshCube(width: number, height: number, length: number): Mesh` | Generate cuboid mesh |
| 488 | `Mesh GenMeshSphere(float radius, int rings, int slices)` | `genMeshSphere(radius: number, rings: number, slices: number): Mesh` | Generate sphere mesh (standard sphere) |
| 489 | `Mesh GenMeshHemiSphere(float radius, int rings, int slices)` | `genMeshHemiSphere(radius: number, rings: number, slices: number): Mesh` | Generate half-sphere mesh (no bottom cap) |
| 490 | `Mesh GenMeshCylinder(float radius, float height, int slices)` | `genMeshCylinder(radius: number, height: number, slices: number): Mesh` | Generate cylinder mesh |
| 491 | `Mesh GenMeshCone(float radius, float height, int slices)` | `genMeshCone(radius: number, height: number, slices: number): Mesh` | Generate cone/pyramid mesh |
| 492 | `Mesh GenMeshTorus(float radius, float size, int radSeg, int sides)` | `genMeshTorus(radius: number, size: number, radSeg: number, sides: number): Mesh` | Generate torus mesh |
| 493 | `Mesh GenMeshKnot(float radius, float size, int radSeg, int sides)` | `genMeshKnot(radius: number, size: number, radSeg: number, sides: number): Mesh` | Generate trefoil knot mesh |
| 494 | `Mesh GenMeshHeightmap(Image heightmap, Vector3 size)` | `genMeshHeightmap(heightmap: Image, size: Vector3): Mesh` | Generate heightmap mesh from image data |
| 495 | `Mesh GenMeshCubicmap(Image cubicmap, Vector3 cubeSize)` | `genMeshCubicmap(cubicmap: Image, cubeSize: Vector3): Mesh` | Generate cubes-based map mesh from image data |
| 496 | `Material * LoadMaterials(const char * fileName, int * materialCount)` | `loadMaterials(fileName: string \| undefined \| null, materialCount: { materialCount: number } \| null \| undefined): Material[] \| null` | Load materials from model file |
| 497 | `Material LoadMaterialDefault()` | `loadMaterialDefault(): Material` | Load default material (Supports: DIFFUSE, SPECULAR, NORMAL maps) |
| 498 | `bool IsMaterialValid(Material material)` | `isMaterialValid(material: Material): boolean` | Check if a material is valid (shader assigned, map textures loaded in GPU) |
| 499 | `void UnloadMaterial(Material material)` | `unloadMaterial(material: Material): void` | Unload material from GPU memory (VRAM) |
| 500 | `void SetMaterialTexture(Material * material, int mapType, Texture2D texture)` | `setMaterialTexture(material: Material, mapType: number, texture: Texture): void` | Set texture for a material map type (MATERIAL_MAP_DIFFUSE, MATERIAL_MAP_SPECULAR...) |
| 501 | `void SetModelMeshMaterial(Model * model, int meshId, int materialId)` | `setModelMeshMaterial(model: Model, meshId: number, materialId: number): void` | Set material for a mesh |
| 502 | `ModelAnimation * LoadModelAnimations(const char * fileName, int * animCount)` | `loadModelAnimations(fileName: string \| undefined \| null, animCount: { animCount: number } \| null \| undefined): ModelAnimation[] \| null` | Load model animations from file |
| 503 | `void UpdateModelAnimation(Model model, ModelAnimation anim, int frame)` | `updateModelAnimation(model: Model, anim: ModelAnimation, frame: number): void` | Update model animation pose (CPU) |
| 504 | `void UpdateModelAnimationBones(Model model, ModelAnimation anim, int frame)` | `updateModelAnimationBones(model: Model, anim: ModelAnimation, frame: number): void` | Update model animation mesh bone matrices (GPU skinning) |
| 505 | `void UnloadModelAnimation(ModelAnimation anim)` | `unloadModelAnimation(anim: ModelAnimation): void` | Unload animation data |
| 506 | `void UnloadModelAnimations(ModelAnimation * animations, int animCount)` | `unloadModelAnimations(animations: ModelAnimation[]): void` | Unload animation array data |
| 507 | `bool IsModelAnimationValid(Model model, ModelAnimation anim)` | `isModelAnimationValid(model: Model, anim: ModelAnimation): boolean` | Check model animation skeleton match |
| 508 | `bool CheckCollisionSpheres(Vector3 center1, float radius1, Vector3 center2, float radius2)` | `checkCollisionSpheres(center1: Vector3, radius1: number, center2: Vector3, radius2: number): boolean` | Check collision between two spheres |
| 509 | `bool CheckCollisionBoxes(BoundingBox box1, BoundingBox box2)` | `checkCollisionBoxes(box1: BoundingBox, box2: BoundingBox): boolean` | Check collision between two bounding boxes |
| 510 | `bool CheckCollisionBoxSphere(BoundingBox box, Vector3 center, float radius)` | `checkCollisionBoxSphere(box: BoundingBox, center: Vector3, radius: number): boolean` | Check collision between box and sphere |
| 511 | `RayCollision GetRayCollisionSphere(Ray ray, Vector3 center, float radius)` | `getRayCollisionSphere(ray: Ray, center: Vector3, radius: number): RayCollision` | Get collision info between ray and sphere |
| 512 | `RayCollision GetRayCollisionBox(Ray ray, BoundingBox box)` | `getRayCollisionBox(ray: Ray, box: BoundingBox): RayCollision` | Get collision info between ray and box |
| 513 | `RayCollision GetRayCollisionMesh(Ray ray, Mesh mesh, Matrix transform)` | `getRayCollisionMesh(ray: Ray, mesh: Mesh, transform: Matrix): RayCollision` | Get collision info between ray and mesh |
| 514 | `RayCollision GetRayCollisionTriangle(Ray ray, Vector3 p1, Vector3 p2, Vector3 p3)` | `getRayCollisionTriangle(ray: Ray, p1: Vector3, p2: Vector3, p3: Vector3): RayCollision` | Get collision info between ray and triangle |
| 515 | `RayCollision GetRayCollisionQuad(Ray ray, Vector3 p1, Vector3 p2, Vector3 p3, Vector3 p4)` | `getRayCollisionQuad(ray: Ray, p1: Vector3, p2: Vector3, p3: Vector3, p4: Vector3): RayCollision` | Get collision info between ray and quad |
| 516 | `void InitAudioDevice()` | `initAudioDevice(): void` | Initialize audio device and context |
| 517 | `void CloseAudioDevice()` | `closeAudioDevice(): void` | Close the audio device and context |
| 518 | `bool IsAudioDeviceReady()` | `isAudioDeviceReady(): boolean` | Check if audio device has been initialized successfully |
| 519 | `void SetMasterVolume(float volume)` | `setMasterVolume(volume: number): void` | Set master volume (listener) |
| 520 | `float GetMasterVolume()` | `getMasterVolume(): number` | Get master volume (listener) |
| 521 | `Wave LoadWave(const char * fileName)` | `loadWave(fileName: string \| undefined \| null): Wave` | Load wave data from file |
| 522 | `Wave LoadWaveFromMemory(const char * fileType, const unsigned char * fileData, int dataSize)` | `loadWaveFromMemory(fileType: string \| undefined \| null, fileData: ArrayBuffer, dataSize: number): Wave` | Load wave from memory buffer, fileType refers to extension: i.e. '.wav' |
| 523 | `bool IsWaveValid(Wave wave)` | `isWaveValid(wave: Wave): boolean` | Checks if wave data is valid (data loaded and parameters) |
| 524 | `Sound LoadSound(const char * fileName)` | `loadSound(fileName: string \| undefined \| null): Sound` | Load sound from file |
| 525 | `Sound LoadSoundFromWave(Wave wave)` | `loadSoundFromWave(wave: Wave): Sound` | Load sound from wave data |
| 526 | `Sound LoadSoundAlias(Sound source)` | `loadSoundAlias(source: Sound): Sound` | Create a new sound that shares the same sample data as the source sound, does not own the sound data |
| 527 | `bool IsSoundValid(Sound sound)` | `isSoundValid(sound: Sound): boolean` | Checks if a sound is valid (data loaded and buffers initialized) |
| 528 | `void UpdateSound(Sound sound, const void * data, int sampleCount)` | `updateSound(sound: Sound, data: any, sampleCount: number): void` | Update sound buffer with new data |
| 529 | `void UnloadWave(Wave wave)` | `unloadWave(wave: Wave): void` | Unload wave data |
| 530 | `void UnloadSound(Sound sound)` | `unloadSound(sound: Sound): void` | Unload sound |
| 531 | `void UnloadSoundAlias(Sound alias)` | `unloadSoundAlias(alias: Sound): void` | Unload a sound alias (does not deallocate sample data) |
| 532 | `bool ExportWave(Wave wave, const char * fileName)` | `exportWave(wave: Wave, fileName: string \| undefined \| null): boolean` | Export wave data to file, returns true on success |
| 533 | `bool ExportWaveAsCode(Wave wave, const char * fileName)` | `exportWaveAsCode(wave: Wave, fileName: string \| undefined \| null): boolean` | Export wave sample data to code (.h), returns true on success |
| 534 | `void PlaySound(Sound sound)` | `playSound(sound: Sound): void` | Play a sound |
| 535 | `void StopSound(Sound sound)` | `stopSound(sound: Sound): void` | Stop playing a sound |
| 536 | `void PauseSound(Sound sound)` | `pauseSound(sound: Sound): void` | Pause a sound |
| 537 | `void ResumeSound(Sound sound)` | `resumeSound(sound: Sound): void` | Resume a paused sound |
| 538 | `bool IsSoundPlaying(Sound sound)` | `isSoundPlaying(sound: Sound): boolean` | Check if a sound is currently playing |
| 539 | `void SetSoundVolume(Sound sound, float volume)` | `setSoundVolume(sound: Sound, volume: number): void` | Set volume for a sound (1.0 is max level) |
| 540 | `void SetSoundPitch(Sound sound, float pitch)` | `setSoundPitch(sound: Sound, pitch: number): void` | Set pitch for a sound (1.0 is base level) |
| 541 | `void SetSoundPan(Sound sound, float pan)` | `setSoundPan(sound: Sound, pan: number): void` | Set pan for a sound (0.5 is center) |
| 542 | `Wave WaveCopy(Wave wave)` | `waveCopy(wave: Wave): Wave` | Copy a wave to a new wave |
| 543 | `void WaveCrop(Wave * wave, int initFrame, int finalFrame)` | `waveCrop(wave: Wave, initFrame: number, finalFrame: number): void` | Crop a wave to defined frames range |
| 544 | `void WaveFormat(Wave * wave, int sampleRate, int sampleSize, int channels)` | `waveFormat(wave: Wave, sampleRate: number, sampleSize: number, channels: number): void` | Convert wave data to desired format |
| 545 | `float * LoadWaveSamples(Wave wave)` | `loadWaveSamples(wave: Wave): ArrayBuffer \| null` | Load samples data from wave as a 32bit float data array |
| 546 | `void UnloadWaveSamples(float * samples)` | `unloadWaveSamples(samples: ArrayBuffer): void` | Unload samples data loaded with LoadWaveSamples() |
| 547 | `Music LoadMusicStream(const char * fileName)` | `loadMusicStream(fileName: string \| undefined \| null): Music` | Load music stream from file |
| 548 | `Music LoadMusicStreamFromMemory(const char * fileType, const unsigned char * data, int dataSize)` | `loadMusicStreamFromMemory(fileType: string \| undefined \| null, data: ArrayBuffer): Music` | Load music stream from data |
| 549 | `bool IsMusicValid(Music music)` | `isMusicValid(music: Music): boolean` | Checks if a music stream is valid (context and buffers initialized) |
| 550 | `void UnloadMusicStream(Music music)` | `unloadMusicStream(music: Music): void` | Unload music stream |
| 551 | `void PlayMusicStream(Music music)` | `playMusicStream(music: Music): void` | Start music playing |
| 552 | `bool IsMusicStreamPlaying(Music music)` | `isMusicStreamPlaying(music: Music): boolean` | Check if music is playing |
| 553 | `void UpdateMusicStream(Music music)` | `updateMusicStream(music: Music): void` | Updates buffers for music streaming |
| 554 | `void StopMusicStream(Music music)` | `stopMusicStream(music: Music): void` | Stop music playing |
| 555 | `void PauseMusicStream(Music music)` | `pauseMusicStream(music: Music): void` | Pause music playing |
| 556 | `void ResumeMusicStream(Music music)` | `resumeMusicStream(music: Music): void` | Resume playing paused music |
| 557 | `void SeekMusicStream(Music music, float position)` | `seekMusicStream(music: Music, position: number): void` | Seek music to a position (in seconds) |
| 558 | `void SetMusicVolume(Music music, float volume)` | `setMusicVolume(music: Music, volume: number): void` | Set volume for music (1.0 is max level) |
| 559 | `void SetMusicPitch(Music music, float pitch)` | `setMusicPitch(music: Music, pitch: number): void` | Set pitch for a music (1.0 is base level) |
| 560 | `void SetMusicPan(Music music, float pan)` | `setMusicPan(music: Music, pan: number): void` | Set pan for a music (0.5 is center) |
| 561 | `float GetMusicTimeLength(Music music)` | `getMusicTimeLength(music: Music): number` | Get music time length (in seconds) |
| 562 | `float GetMusicTimePlayed(Music music)` | `getMusicTimePlayed(music: Music): number` | Get current music time played (in seconds) |
| 563 | `AudioStream LoadAudioStream(unsigned int sampleRate, unsigned int sampleSize, unsigned int channels)` | `loadAudioStream(sampleRate: number, sampleSize: number, channels: number): AudioStream` | Load audio stream (to stream raw audio pcm data) |
| 564 | `bool IsAudioStreamValid(AudioStream stream)` | `isAudioStreamValid(stream: AudioStream): boolean` | Checks if an audio stream is valid (buffers initialized) |
| 565 | `void UnloadAudioStream(AudioStream stream)` | `unloadAudioStream(stream: AudioStream): void` | Unload audio stream and free memory |
| 566 | `void UpdateAudioStream(AudioStream stream, const void * data, int frameCount)` | `updateAudioStream(stream: AudioStream, data: ArrayBuffer, frameCount: number): void` | Update audio stream buffers with data |
| 567 | `bool IsAudioStreamProcessed(AudioStream stream)` | `isAudioStreamProcessed(stream: AudioStream): boolean` | Check if any audio stream buffers requires refill |
| 568 | `void PlayAudioStream(AudioStream stream)` | `playAudioStream(stream: AudioStream): void` | Play audio stream |
| 569 | `void PauseAudioStream(AudioStream stream)` | `pauseAudioStream(stream: AudioStream): void` | Pause audio stream |
| 570 | `void ResumeAudioStream(AudioStream stream)` | `resumeAudioStream(stream: AudioStream): void` | Resume audio stream |
| 571 | `bool IsAudioStreamPlaying(AudioStream stream)` | `isAudioStreamPlaying(stream: AudioStream): boolean` | Check if audio stream is playing |
| 572 | `void StopAudioStream(AudioStream stream)` | `stopAudioStream(stream: AudioStream): void` | Stop audio stream |
| 573 | `void SetAudioStreamVolume(AudioStream stream, float volume)` | `setAudioStreamVolume(stream: AudioStream, volume: number): void` | Set volume for audio stream (1.0 is max level) |
| 574 | `void SetAudioStreamPitch(AudioStream stream, float pitch)` | `setAudioStreamPitch(stream: AudioStream, pitch: number): void` | Set pitch for audio stream (1.0 is base level) |
| 575 | `void SetAudioStreamPan(AudioStream stream, float pan)` | `setAudioStreamPan(stream: AudioStream, pan: number): void` | Set pan for audio stream (0.5 is centered) |
| 576 | `void SetAudioStreamBufferSizeDefault(int size)` | `setAudioStreamBufferSizeDefault(size: number): void` | Default size for new audio streams |
| 577 | `void SetAudioStreamCallback(AudioStream stream, AudioCallback callback)` | `setAudioStreamCallback(stream: AudioStream, callback: any): void` | Audio thread callback to request new data |
| 578 | `void AttachAudioStreamProcessor(AudioStream stream, AudioCallback processor)` | `attachAudioStreamProcessor(stream: AudioStream, processor: any): void` | Attach audio stream processor to stream, receives the samples as 'float' |
| 579 | `void DetachAudioStreamProcessor(AudioStream stream, AudioCallback processor)` | `detachAudioStreamProcessor(stream: AudioStream, processor: any): void` | Detach audio stream processor from stream |
| 580 | `void AttachAudioMixedProcessor(AudioCallback processor)` | `attachAudioMixedProcessor(processor: any): void` | Attach audio stream processor to the entire audio pipeline, receives the samples as 'float' |
| 581 | `void DetachAudioMixedProcessor(AudioCallback processor)` | `detachAudioMixedProcessor(processor: any): void` | Detach audio stream processor from the entire audio pipeline |
