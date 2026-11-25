# Performance

The continental preset contains 256 cities, 287 rail links, 32 regional circuits, and 2,048 active three-car trains. It starts in the flat map. The larger preset accepts `?layout=stress&cities=512&trains=4096`; city counts must be multiples of eight. Requested fleets are limited by safe track capacity, rather than spawning overlapping trains.

## Reproduce

```sh
npm ci
npm test
npm run build
npm run preview
node --expose-gc scripts/benchmark-generation.mjs 3
node --expose-gc scripts/benchmark-traffic.mjs --stress
node scripts/benchmark-picking.mjs
node scripts/benchmark-indexing.mjs
```

Open the production preview with `?layout=stress&cities=256&trains=2048`. The canvas exposes diagnostics through `data-*` attributes without visible text: `cities`, `trains`, `active-trains`, `cpu-p95`, `frame-p95`, `draw-calls`, `triangles`, `geometries`, and detail cache/loading statistics. Frame and CPU percentiles use a rolling 180-frame window, published once a second. CPU time measures JavaScript plus WebGL submission, not GPU completion. Frame intervals measure requestAnimationFrame delivery, which also depends on display refresh and browser scheduling. Check steady state separately from initial loading and transitions.

## Measurements

Measure with the browser visibly presenting the game. A hidden desktop preview can throttle JavaScript after roughly a minute even while delivering animation callbacks; it produced misleading 35–45ms samples that immediately returned to approximately 6ms when shown, without reloading or changing the cache.

Measured on an Apple M4 Pro, macOS arm64, Node 24.14.0. These are local measurements, not guarantees for every device. Traffic measurements advance all requested trains, with exact carriage poses, safe headway, and crossing reservations enabled.

| Generated 256-city network | 128 trains | 512 trains | 2,048 trains |
| --- | ---: | ---: | ---: |
| Traffic initialization | 31.9ms | 27.4ms | 34.2ms |
| Update median, 300 frames after warmup | 0.080ms | 0.359ms | 1.976ms |
| Update p95 | 0.114ms | 0.552ms | 2.167ms |

The previous controller from commit `5a9c266` was compared with the same 256-city circle fixture; only fleet allocation was adapted to request identical counts. A single cold 60Hz update took 12.25 / 190.73 / 3,124.44ms at 128 / 512 / 2,048 trains. The replacement took 0.55 / 1.09 / 3.02ms. This isolates the old quadratic traffic cost; it is not a whole-browser speedup claim.

Full showcase generation fell from a profiled 3,253ms to approximately 539ms. The larger network-only plan takes approximately 991ms, validation 18.5ms, and a local 192-unit scenery plan 50.6ms. Geometry construction and tunnel excavation are additional worker work.

For a dense detailed chunk with 75,567 triangles, 400 identical selection rays produced identical nearest hits. Native raycasting p95 was 2.33ms; the transferred BVH reduced it to 0.024ms. BVH hydration took 0.11ms; construction runs in the worker.

Exact vertex indexing reduces a representative 486-asset cell's GPU attribute/index buffers from 9.87MB to 5.53MB (44%), and total geometry/BVH transfer data by 40%. Expanded triangle attributes remain bit-for-bit identical. The numeric hash-table pass takes approximately 10–23ms in the worker and also shortens BVH construction. Packets keep the original representation if indexing would increase their byte size.

In the 1280×720 browser preview, the 256-city / 2,048-train map uses 38 draw calls and approximately 60,633 triangles, with no detailed scenery allocated. Steady-state CPU p95 measured approximately 3.7–4.4ms and frame interval p95 approximately 8.4–8.7ms on this machine.

After adding blended terrain, the 512-city / 4,096-train map uses 34 draw calls and approximately 182,639 triangles. In the 1280×720 production preview, CPU p95 measured 5.6ms and frame interval p95 8.4ms, with all 4,096 trains active. Worker preparation took 2.27s; the map appeared after approximately 2.47s. Adaptive map color tessellation concentrates triangles at biome transitions and keeps broad uniform ground coarse.

With that fleet still running, a visible 747×831 local isometric view measured 6.6ms CPU p95 and 8.4ms frame interval p95 after approximately three minutes of simulation. It drew 38 visible trains and approximately 1.51 million triangles in 119 calls, with 36 cached regions retaining 123.6MB of geometry/BVH buffers. The exact visible counts vary with the camera and train positions.

A 12,000-frame run of the same 4,096-train simulation kept all trains moving. Successive 1,000-frame samples stayed at 3.77–4.18ms median and 4.10–4.85ms p95. The final browser build's first regional crossfade measured 15.5ms maximum CPU work, compared with approximately 80ms before incremental uploads and shader preparation. These transition figures include both representations and are separate from steady-state map timing.

The geographic Europe preset contains 50 cities and 180 active trains. Its conformal projection, detailed coast, 57 river systems, 51 lakes, and continuous ranges require more polygon work than the synthetic stress preset. In the 1280×720 production preview, initial worker preparation took 10.15s and the world appeared at 10.25s. The overview uses 35 draw calls and approximately 157,226 triangles. Follow and core views measured roughly 0.6–2.5ms CPU p95, with 9.6–10.0ms frame intervals. The first map-to-follow transition peaked at 8.9ms CPU. The Alpine view had four required regions, 20 cached regions using 97.3MiB, and zero detail errors. These measurements describe this local run and viewport, not a cross-device guarantee.

Terrain uses vertex colors in both representations, sampled from a continuous world-space field. Detailed chunk edges share canonical two-unit samples, so independent shoreline triangulations cannot create color seams. A 192-unit cell adds only 256 perimeter triangles in the regression fixture. Mountain vegetation shares the regional cache; farm variation stays inside the existing strict reservations. The denser farm fixture covers 26% more land with 10,890 triangles, slightly fewer than its previous 11,132.

## Architecture and limits

- Route and river queries use exact spatial indexes. Junction discovery prunes distant segments before intersection tests. Deterministic region generation reuses the same immutable network indexes.
- Traffic keeps ordered same-route leaders, indexed conflict blocks, and a persistent spatial hash of carriage footprints. Sampling uses exact line/arc segments with indexed distance lookup. A shared typed pose buffer feeds both representations.
- Terrain clipping and triangulation for the far map run in the worker and transfer ready-made position buffers. The far map uses coarse curve tessellation, batched city glyphs, and a single readable marker per train. Hidden map updates are skipped.
- Detailed carriages share owner/cab templates, with instancing only for visible trains. Static colors become vertex colors, allowing a few shading batches per region instead of separate draws for every material color. Exact indexed vertices reduce buffer size without altering the art.
- World planning, asset placement, mountain CSG, color batching, and selection BVHs run in a module worker. Transferable buffers avoid copying geometry back to the main thread. Hydration has a per-frame CPU budget.
- Detail coverage is computed from the destination camera. Required cells gate the map-to-3D transition; surrounding cells prefetch without resetting readiness. Each CPU-hydrated mesh uploads through a hidden 1×1 render pass, at most one mesh per frame. The pass submits one triangle to initialize its attribute and index buffers, then restores the original draw range, render target, and shadow state. A region becomes ready only after every upload is acknowledged. Before the fade, an empty draw with the actual world lights initializes shadow targets, then offscreen, shadow-depth (ordinary and instanced), and direct-render shader variants compile in sequence. Tiny retained depth proxies warm those shadow programs without drawing terrain. The preparation restores visibility and renderer state immediately between asynchronous steps. This spreads buffer upload work across frames instead of paying for all newly visible geometry on the first detailed frame.
- The detail cache limits retained geometry/BVH buffers to 128MiB and 48 chunks. Visible required chunks take priority and can exceed the byte budget; `budgetOverflow` reports that case. GPU attribute storage is additional. Prefetch stops before exhausting the budget. Views requiring more than 36 detail chunks remain maps until zoomed closer.
- Shadows cover the local camera region. Far maps render directly without shadow passes or transition framebuffers. Animation suspends in hidden tabs.

The stress preset uses separated regional circuits to demonstrate a large moving fleet. Dense shared junctions intentionally reduce throughput through reservations; arbitrary authored networks still have finite train capacity. The prototype has no economy or pathfinding game loop. Mobile hardware, unusual display resolutions, and very dense imported city layouts require their own profiling.
