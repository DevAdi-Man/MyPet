# ✅ React Native Skia – Complete Documentation Summary

> Comprehensive reference for React Native Skia (Shopify) graphics library
> Last updated: 2026-06-12

## 🎨 Canvas

- `<Canvas>` is the root of all Skia drawings, treated like a regular RN View
- Props: `style`, `ref` (SkiaView), `onSize` (SharedValue), `androidWarmup`
- `useCanvasSize()` hook for JS-thread size; `onSize` SharedValue for UI-thread size
- `makeImageSnapshot()` / `makeImageSnapshotAsync()` for saving drawings as images
- Supports all RN accessibility props

## 🖼️ Rendering Modes

- **Retained Mode** (default): Declarative React tree → display list; near-zero FFI cost for animating property values; best for UI/interactive graphics
- **Immediate Mode**: Via the `Picture` API — use `Skia.PictureRecorder()` inside `useDerivedValue`; best for variable drawing commands per frame (games, particles, generative art)
- Both modes can be combined in one `<Canvas>`

## 🔗 Contexts

- Skia uses its own React renderer — React contexts don't auto-bridge
- Solution: use `its-fine` library (`useContextBridge`, `FiberProvider`) to re-inject contexts

## 🖌️ Painting / Paint

- Paint attributes: `color`, `blendMode`, `style` (fill/stroke), `strokeWidth`, `strokeJoin`, `strokeCap`, `strokeMiter`, `opacity`, `antiAlias`, `dither`
- Can be set as **props** on any drawing component or `<Paint>`
- Complex attributes (Shaders, Image Filters, etc.) set as **children**
- Multiple `<Paint>` children = multiple fills/strokes per shape
- Paint **inherits** down through `<Group>` hierarchy
- Manual assignment via `Skia.Paint()` ref and `paint={ref}` prop

## 👥 Group

- Core grouping primitive; supports deep nesting
- Props: `transform` (same as RN transforms but origin is top-left, rotations in radians), `origin`, `clip` (rect/rrect/path), `invertClip`, `layer` (bitmap + effects), `zIndex`
- `clip` → show inside region; `invertClip` → show outside region
- `layer` → rasterize children as bitmap, apply Paint effects (blur, color matrix)
- `zIndex` → controls draw order among siblings (default 0, supports negatives)
- **`FitBox`** component: auto-scales drawings from `src` rect to `dst` rect with `fit` modes (contain, fill, cover, fitHeight, fitWidth, scaleDown, none)
- **Note**: `<Image>`, `<SVG>`, `<Skottie>` don't inherit group paint — use `layer` for those

## 🖼️ Pictures (Immediate Mode)

- `<Picture>` renders an `SkPicture`
- Create via `Skia.PictureRecorder()` → `beginRecording()` → draw commands → `finishRecordingAsPicture()`
- Immutable, reusable across canvases
- Apply effects via parent `<Group>...>` wrapping
- Serializable: `picture.serialize()` → UInt8Array; `Skia.Picture.MakePicture(bytes)` to deserialize
- Instance methods: `makeShader()`, `serialize()`

## 🛣️ Path

- Semantically identical to SVG Paths
- Props: `path` (string SVG notation or `SkPath` object), `start`/`end` (0–1 trim), `stroke` (StrokeOptions: width, strokeMiterLimit, precision), `fillType` (winding, evenOdd, inverseWinding, inverseEvenOdd)
- Build with `Skia.PathBuilder.Make()` (fluent API)
- Path migration guide available

## 🔷 Polygons

- `<Rect>` — basic rectangle
- `<RoundedRect>` — corner radius (uniform or per-corner via `rect` prop with custom rrect object)
- `<RRectDiff>` — difference between two (r)rects
- `<Line>` — line between two points
- `<Points>` — draw points; mode: `points`, `lines`, `polygon`

## ⭕ Ellipses

- `<Circle>` — circle
- `<Oval>` — oval within bounding rectangle

## 🗺️ Atlas

- Efficient sprite/tile rendering via single draw call
- `useRectBuffer` / `useRSXformBuffer` hooks for animated atlas transforms

## 📐 Vertices

- Draw custom triangle meshes with vertices, colors, texCoords

## 🔲 Patch

- Cubic Coons patch: mesh-based warping

## 🖼️ Images

- Load: `useImage(require(...))`, `useImage(url)`, `useImage("BundleAssetName")`
- Returns `null` until loaded (async); optional error handler as 2nd arg
- Manual: `Skia.Image.MakeImageFromEncoded(data)`, `Skia.Image.MakeImage(info, data, bytesPerRow)`
- `<Image>`
- Fit modes: `contain`, `fill`, `cover`, `fitHeight`, `fitWidth`, `scaleDown`, `none`
- Sampling: `CubicSampling`, `FilterMode`, `MipmapMode`
- Instance methods: `height`, `width`, `getImageInfo()`, `encodeToBytes()`, `encodeToBase64()`, `readPixels()`

## 🎞️ Animated Images

- GIF/WebP animated images via `useAnimatedImage`

## 🎨 SVG Images

- `<SVG>` using `Skia.SVG.MakeFromString()` or `useSVG()`
- Apply effects via `<Group>` wrapper

## 📸 Snapshot Views

- Capture React Native views as Skia images via `makeImageSnapshotAsync`

## 🎬 Video

- `useVideoTexture` / `<Video>` for hardware-accelerated video playback in canvas

## 🎭 Skottie

- Lottie animation player via `<Skottie>` and `useSkottie`

## 📝 Text

- **Paragraph**: `useParagraph`, `<Paragraph>` — rich text with styles (apply effects via `<Group>`)
- **Text**: `<Text>` — simple text with `useFont(require(...), size)`
- **Glyphs**: `<Glyphs>` — manual glyph positioning
- **Path Text**: `<PathText>` — text along a path
- **Text Blob**: `<TextBlob>` — pre-built text blob for performance

## ✨ Shaders

- **Custom SKSL**: `Skia.RuntimeEffect.Make(source)` → `<RuntimeShader>` (children? Nested shaders supported; uniforms: float, float2–4, int types, arrays)
- **Image Shaders**: `<ImageShader>` — tile/fit image as shader
- **Gradients**:
  - `<LinearGradient>`
  - `<RadialGradient>`
  - `<SweepGradient>`
  - `<TwoPointConicalGradient>`
  - Common: `colors`, `positions?`, `mode?` (clamp/repeat/mirror/decal), `flags?`, `transform?`
- **Perlin Noise**: `<Noise>`, `<Turbulence>` shaders
- **Blending/Colors**: `<Blend>`, `<ColorMatrix>`, `<LumaMask>`, `<Offset>`

## 🌫️ Mask Filters

- `<MaskFilter>` — blur/shadow effects; style: `normal`, `solid`, `outer`, `inner`

## 🔲 Backdrop Filters

- `<BackdropFilter>` (children) — apply filters to content behind
- Uses `<ImageFilter>` and other image filters

## 🎨 Color Filters

- `<ColorMatrix>` — 4×5 color matrix transformation
- `<Blend>` — blend color filter
- `<LumaMask>` — luminosity mask
- `<Offset>`, `<Threshold>` — gamma correction
- `<Compose>` — compose two color filters

## 🎭 Mask

- `<Mask>` (children) — alpha or luminance masking
- Modes: `alpha` (default), `luminance`

## 🌀 Path Effects

- `<DashPathEffect>` — dashed/dotted lines
- `<DiscretePathEffect>` — rough/jagged path
- `<CornerPathEffect>` — round corners
- `<Path1DPathEffect>` — stamp shape along path
- `<Path2DPathEffect>` — tile 2D path
- `<Line2DPathEffect>` — hatching
- `<SumPathEffect>` / `<ComposePathEffect>` — combine effects

## 🎬 Animations

- **Reanimated v3+** integration: pass SharedValues/DerivedValues directly as props — no `createAnimatedComponent` needed
- `interpolateColors(value, inputRange, colors)` — Skia-specific color interpolation (replaces Reanimated's `interpolateColor`)
- **Gestures**: Use `react-native-gesture-handler` with `GestureDetector`; overlay Animated.View for element tracking

### Animation Hooks

- `usePathInterpolation(progress, inputRange, paths)` — interpolate between path shapes
- `usePathValue(workletFn, defaultPath?, transformFn?)` — efficient path animation
- `useClock()` — milliseconds elapsed since activation
- `useRectBuffer(count, workletFn)` — animated rect array (for Atlas)
- `useRSXformBuffer(count, workletFn)` — animated rotate-scale transform array

### Textures (Reanimated UI thread)

- `useTexture(reactElement, dimensions)` → SharedValue
- `useImageAsTexture(source)` → GPU-uploaded image
- `usePictureAsTexture(picture, dimensions)` → texture from SkPicture
- Manual: `runOnUI` + `Skia.Surface.MakeOffscreen()` for custom GPU textures

---

## 📚 Official Documentation Links

- [Canvas Overview](https://shopify.github.io/react-native-skia/docs/canvas/overview)
- [Rendering Modes](https://shopify.github.io/react-native-skia/docs/canvas/rendering-modes/)
- [Contexts](https://shopify.github.io/react-native-skia/docs/canvas/contexts)
- [Paint Overview](https://shopify.github.io/react-native-skia/docs/paint/overview)
- [Paint Properties](https://shopify.github.io/react-native-skia/docs/paint/properties)
- [Group](https://shopify.github.io/react-native-skia/docs/group)
- [Pictures](https://shopify.github.io/react-native-skia/docs/shapes/pictures)
- [Path](https://shopify.github.io/react-native-skia/docs/shapes/path)
- [Path Migration](https://shopify.github.io/react-native-skia/docs/shapes/path-migration)
- [Polygons](https://shopify.github.io/react-native-skia/docs/shapes/polygons)
- [Ellipses](https://shopify.github.io/react-native-skia/docs/shapes/ellipses)
- [Atlas](https://shopify.github.io/react-native-skia/docs/shapes/atlas)
- [Vertices](https://shopify.github.io/react-native-skia/docs/shapes/vertices)
- [Patch](https://shopify.github.io/react-native-skia/docs/shapes/patch)
- [Images](https://shopify.github.io/react-native-skia/docs/images)
- [Animated Images](https://shopify.github.io/react-native-skia/docs/animated-images)
- [SVG Images](https://shopify.github.io/react-native-skia/docs/images-svg)
- [Snapshot Views](https://shopify.github.io/react-native-skia/docs/snapshotviews)
- [Video](https://shopify.github.io/react-native-skia/docs/video)
- [Skottie](https://shopify.github.io/react-native-skia/docs/skottie)
- [Paragraph Text](https://shopify.github.io/react-native-skia/docs/text/paragraph)
- [Text](https://shopify.github.io/react-native-skia/docs/text/text)
- [Glyphs](https://shopify.github.io/react-native-skia/docs/text/glyphs)
- [Path Text](https://shopify.github.io/react-native-skia/docs/text/path)
- [Text Blob](https://shopify.github.io/react-native-skia/docs/text/blob)
- [Shaders Overview](https://shopify.github.io/react-native-skia/docs/shaders/overview)
- [Image Shaders](https://shopify.github.io/react-native-skia/docs/shaders/images)
- [Gradients](https://shopify.github.io/react-native-skia/docs/shaders/gradients)
- [Perlin Noise](https://shopify.github.io/react-native-skia/docs/shaders/perlin-noise)
- [Color Shaders](https://shopify.github.io/react-native-skia/docs/shaders/colors)
- [Mask Filters](https://shopify.github.io/react-native-skia/docs/mask-filters)
- [Backdrop Filters](https://shopify.github.io/react-native-skia/docs/backdrops-filters)
- [Color Filters](https://shopify.github.io/react-native-skia/docs/color-filters)
- [Mask](https://shopify.github.io/react-native-skia/docs/mask)
- [Path Effects](https://shopify.github.io/react-native-skia/docs/path-effects)
- [Animations](https://shopify.github.io/react-native-skia/docs/animations/animations)
- [Gestures](https://shopify.github.io/react-native-skia/docs/animations/gestures)
- [Animation Hooks](https://shopify.github.io/react-native-skia/docs/animations/hooks)
- [Textures](https://shopify.github.io/react-native-skia/docs/animations/textures)
