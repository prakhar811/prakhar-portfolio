"use client";

import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, type RefObject } from "react";
import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  CanvasTexture,
  Color,
  DoubleSide,
  type Group,
  type LineBasicMaterial,
  type MeshBasicMaterial,
  SRGBColorSpace,
} from "three";
import { buildBlocks, LAYER_D, LAYER_W, LAYERS } from "@/lib/architecture";
import type { ArchShared } from "./ArchitectureScene";

const AMBER = new Color("#e0a458");
const CHAMPAGNE = new Color("#ead9b5");
const tmp = new Color();
const BLOCK_H = 0.1;

function makeLabelTexture(index: number) {
  const { label, sub } = LAYERS[index];
  const canvas = document.createElement("canvas");
  canvas.width = 768;
  canvas.height = 160;
  const g = canvas.getContext("2d")!;
  g.fillStyle = "#ead9b5";
  g.font = "600 52px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";
  g.textBaseline = "alphabetic";
  g.fillText(`0${index + 1}  ${label.toUpperCase()}`, 8, 70);
  g.fillStyle = "#e0a458";
  g.font = "400 34px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";
  g.fillText(sub.toUpperCase(), 8, 125);
  const tex = new CanvasTexture(canvas);
  tex.colorSpace = SRGBColorSpace;
  tex.anisotropy = 4;
  return tex;
}

function buildGeometries(layer: number) {
  const blocks = buildBlocks(layer);

  // Grid + border (flat, y = 0)
  const grid: number[] = [];
  const hw = LAYER_W / 2;
  const hd = LAYER_D / 2;
  for (let k = 0; k <= 12; k++) {
    const x = -hw + (LAYER_W / 12) * k;
    grid.push(x, 0, -hd, x, 0, hd);
  }
  for (let k = 0; k <= 7; k++) {
    const z = -hd + (LAYER_D / 7) * k;
    grid.push(-hw, 0, z, hw, 0, z);
  }
  const border = [-hw, 0, -hd, hw, 0, -hd, hw, 0, -hd, hw, 0, hd, hw, 0, hd, -hw, 0, hd, -hw, 0, hd, -hw, 0, -hd];

  // Block top faces (fill) and box edges
  const fill: number[] = [];
  const edges: number[] = [];
  for (const b of blocks) {
    const x0 = b.x - b.w / 2;
    const x1 = b.x + b.w / 2;
    const z0 = b.z - b.d / 2;
    const z1 = b.z + b.d / 2;
    const y = BLOCK_H;
    fill.push(x0, y, z0, x1, y, z0, x1, y, z1, x0, y, z0, x1, y, z1, x0, y, z1);
    const quad = (yy: number) => [x0, yy, z0, x1, yy, z0, x1, yy, z0, x1, yy, z1, x1, yy, z1, x0, yy, z1, x0, yy, z1, x0, yy, z0];
    edges.push(...quad(0), ...quad(y));
    for (const [px, pz] of [[x0, z0], [x1, z0], [x1, z1], [x0, z1]]) edges.push(px, 0, pz, px, y, pz);
  }

  const mk = (arr: number[]) => {
    const geo = new BufferGeometry();
    geo.setAttribute("position", new BufferAttribute(new Float32Array(arr), 3));
    return geo;
  };
  return { grid: mk(grid), border: mk(border), fill: mk(fill), edges: mk(edges) };
}

interface Props {
  index: number;
  shared: RefObject<ArchShared>;
}

/** One architecture layer: slab, grid, system blocks and a flat label. Opacity follows its "light". */
export function SystemLayer({ index, shared }: Props) {
  const group = useRef<Group>(null);
  const base = useRef<MeshBasicMaterial>(null);
  const grid = useRef<LineBasicMaterial>(null);
  const border = useRef<LineBasicMaterial>(null);
  const fill = useRef<MeshBasicMaterial>(null);
  const edges = useRef<LineBasicMaterial>(null);
  const label = useRef<MeshBasicMaterial>(null);

  const geo = useMemo(() => buildGeometries(index), [index]);
  const texture = useMemo(() => makeLabelTexture(index), [index]);
  const tint = useMemo(() => new Color(LAYERS[index].tint), [index]);

  useEffect(
    () => () => {
      texture.dispose();
      Object.values(geo).forEach((g) => g.dispose());
    },
    [texture, geo],
  );

  useFrame(() => {
    const sh = shared.current;
    const L = sh.light[index];
    const b = sh.bright;
    if (group.current) group.current.position.y = sh.layerY[index];

    // Edge colour: amber normally, tinted by domain when the Skills stage groups layers.
    tmp.copy(AMBER).lerp(tint, sh.skillMix);
    const edgeColor = tmp;
    for (const m of [border.current, edges.current, grid.current]) m?.color.copy(edgeColor);
    fill.current?.color.copy(edgeColor);
    label.current?.color.copy(CHAMPAGNE).lerp(tint, sh.skillMix * 0.5);

    if (base.current) base.current.opacity = (0.05 + 0.16 * L) * b;
    if (grid.current) grid.current.opacity = (0.03 + 0.12 * L) * b;
    if (border.current) border.current.opacity = (0.18 + 0.7 * L) * b;
    if (fill.current) fill.current.opacity = (0.03 + 0.2 * L) * b;
    if (edges.current) edges.current.opacity = (0.15 + 0.7 * L) * b;
    if (label.current) label.current.opacity = Math.min(1, (0.2 + 0.9 * L) * b * 1.1);
  });

  return (
    <group ref={group}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} frustumCulled={false}>
        <planeGeometry args={[LAYER_W, LAYER_D]} />
        <meshBasicMaterial ref={base} color="#14203a" transparent depthWrite={false} side={DoubleSide} toneMapped={false} />
      </mesh>
      <lineSegments geometry={geo.grid} frustumCulled={false}>
        <lineBasicMaterial ref={grid} transparent depthWrite={false} blending={AdditiveBlending} toneMapped={false} />
      </lineSegments>
      <lineSegments geometry={geo.border} frustumCulled={false}>
        <lineBasicMaterial ref={border} transparent depthWrite={false} blending={AdditiveBlending} toneMapped={false} />
      </lineSegments>
      <mesh geometry={geo.fill} frustumCulled={false}>
        <meshBasicMaterial ref={fill} transparent depthWrite={false} side={DoubleSide} blending={AdditiveBlending} toneMapped={false} />
      </mesh>
      <lineSegments geometry={geo.edges} frustumCulled={false}>
        <lineBasicMaterial ref={edges} transparent depthWrite={false} blending={AdditiveBlending} toneMapped={false} />
      </lineSegments>
      <mesh position={[-LAYER_W / 2 + 1.95, 0.012, LAYER_D / 2 + 0.5]} rotation={[-Math.PI / 2, 0, 0]} frustumCulled={false}>
        <planeGeometry args={[3.9, 0.81]} />
        <meshBasicMaterial ref={label} map={texture} transparent depthWrite={false} toneMapped={false} />
      </mesh>
    </group>
  );
}
