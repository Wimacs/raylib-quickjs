# RayJS API Cheatsheet & Binding Status

Last updated: 2026-03-01

## 1) 总体结论

- Raylib cheatsheet 可见函数总数: **581**
- JS 绑定声明已覆盖: **581**
- 缺失: **0**
- 覆盖率: **100.00%**

当前状态可以认为：**cheatsheet 口径下的 API 已全部可调用并有声明**。

## 2) 数据来源

本结论来自以下两个来源对齐：

- 基线 API: `thirdparty/raylib/parser/output/raylib_api.json`
- 已导出 JS 声明: `examples/lib.raylib.d.ts`

对应自动报告文件：

- `doc/binding-coverage/latest.md`
- `doc/binding-coverage/archive/2026-03-01-batch-01.md`
- `doc/binding-coverage/archive/2026-03-01-batch-02.md`
- `doc/binding-coverage/archive/2026-03-01-batch-03.md`
- `doc/binding-coverage/archive/2026-03-01-batch-04.md`

## 3) 非 cheatsheet 的显式忽略项

生成器中仍有 **8** 个 `ignore("...")`，但不影响 cheatsheet 覆盖率：

- `GuiGetIcons`
- `GuiListViewEx`
- `GuiLoadIcons`
- `GuiTabBar`
- `MatrixToFloatV`
- `QuaternionToAxisAngle`
- `Vector3OrthoNormalize`
- `Vector3ToFloatV`

说明：这些函数属于扩展/附加 API 范围（如 raygui/raymath 细分接口），不在 cheatsheet 主清单统计口径内。

## 4) 近期关键补齐点（已落地）

- 文本相关补齐：`TextCopy`、`TextFormat`、`TextJoin`、`TextSplit`、`TextAppend`
- 模型动画/材质补齐：`LoadMaterials`、`LoadModelAnimations`、`UpdateModelAnimation`、`UnloadModelAnimation`、`UnloadModelAnimations`、`IsModelAnimationValid`
- 回调兼容包装：`SetTraceLogCallback`、`SetLoadFileDataCallback`、`SetSaveFileDataCallback`、`SetLoadFileTextCallback`、`SetSaveFileTextCallback`、音频 stream processor 系列
- 最终缺口补齐：`SetWindowIcons`、`GetWindowHandle`、`LoadFontData`、`GenImageFontAtlas`

## 5) 可执行验证结果

新增了综合样例：

- `examples/binding_full_smoke.js`

重新生成绑定并编译后，运行结果：

- `./rayjs examples/binding_full_smoke.js`
- `done: total=710, pass=710, fail=0`

这表明当前可执行文件与最新绑定代码一致，且在该 smoke 场景下未出现绑定调用失败。

## 6) 复现命令

```bash
npm --prefix bindings run build
node generate-bindings.js
cmake --build build -j
node tools/report-binding-coverage.js --out=doc/binding-coverage/latest.md
./rayjs examples/binding_full_smoke.js
```

## 7) 建议的后续维护策略

- 每个 batch 结束后固定更新 `doc/binding-coverage/latest.md` + `archive/*.md`
- 保持 `binding_full_smoke.js` 作为回归冒烟基线
- 若后续启用剩余 8 个 ignore，建议放在单独 batch 并附加风险说明（内存/ABI/兼容性）
