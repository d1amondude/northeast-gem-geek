/**
 * Trade / GIA-course style dimensional weight estimation.
 *
 * Weight formulas: L×W×D (or Ø²×D) × shape factor, with SG correction from diamond.
 * Depth when face-up only: typical total depth % by shape (not a GIA "unknown depth law" —
 * standard cut proportions used for screening estimates).
 *
 * Always label results as estimates — not lab certificates.
 */

export type CutShapeId =
  | "round"
  | "oval"
  | "emerald"
  | "baguette"
  | "pear"
  | "cushion"
  | "princess"
  | "marquise"
  | "heart"
  | "triangle"
  | "asscher"
  | "radiant";

export type DepthProfile = "shallow" | "average" | "deep";

export interface ShapeFormula {
  id: CutShapeId;
  label: string;
  /** Diamond dimensional constant (SG 3.52 baked in) */
  diamondFactor: number;
  /**
   * Typical total depth % of the reference face-up axis (diameter for round;
   * width for fancy cuts). average is the default for screening.
   */
  depthPercent: Record<DepthProfile, number>;
  /** Use L×W×D (true) vs Ø²×D with avg diameter (false) for diamond factor path */
  usesLengthWidth: boolean;
}

/** Industry-standard shape factors (diamond constants). */
export const SHAPE_FORMULAS: Record<CutShapeId, ShapeFormula> = {
  round: {
    id: "round",
    label: "Round brilliant",
    diamondFactor: 0.0061,
    depthPercent: { shallow: 56, average: 61, deep: 68 },
    usesLengthWidth: false,
  },
  oval: {
    id: "oval",
    label: "Oval",
    diamondFactor: 0.0062,
    depthPercent: { shallow: 58, average: 62, deep: 68 },
    usesLengthWidth: true, // also often avg-diam²; we use L×W×D with factor
  },
  emerald: {
    id: "emerald",
    label: "Emerald / step",
    diamondFactor: 0.0092, // mid L:W ~1.5 table
    depthPercent: { shallow: 58, average: 64, deep: 70 },
    usesLengthWidth: true,
  },
  baguette: {
    id: "baguette",
    label: "Baguette",
    diamondFactor: 0.0091,
    depthPercent: { shallow: 55, average: 60, deep: 66 },
    usesLengthWidth: true,
  },
  pear: {
    id: "pear",
    label: "Pear",
    diamondFactor: 0.0060, // ~1.5:1 L:W
    depthPercent: { shallow: 58, average: 62, deep: 68 },
    usesLengthWidth: true,
  },
  cushion: {
    id: "cushion",
    label: "Cushion",
    diamondFactor: 0.0081,
    depthPercent: { shallow: 60, average: 65, deep: 72 },
    usesLengthWidth: true,
  },
  princess: {
    id: "princess",
    label: "Princess",
    diamondFactor: 0.0082,
    depthPercent: { shallow: 65, average: 70, deep: 78 },
    usesLengthWidth: true,
  },
  marquise: {
    id: "marquise",
    label: "Marquise",
    diamondFactor: 0.0058, // ~2:1 L:W
    depthPercent: { shallow: 58, average: 62, deep: 68 },
    usesLengthWidth: true,
  },
  heart: {
    id: "heart",
    label: "Heart",
    diamondFactor: 0.0059,
    depthPercent: { shallow: 54, average: 58, deep: 65 },
    usesLengthWidth: true,
  },
  triangle: {
    id: "triangle",
    label: "Triangle / trillion",
    diamondFactor: 0.0057,
    depthPercent: { shallow: 38, average: 42, deep: 50 },
    usesLengthWidth: true,
  },
  asscher: {
    id: "asscher",
    label: "Asscher",
    diamondFactor: 0.0080,
    depthPercent: { shallow: 60, average: 67, deep: 74 },
    usesLengthWidth: true,
  },
  radiant: {
    id: "radiant",
    label: "Radiant",
    diamondFactor: 0.0081,
    depthPercent: { shallow: 60, average: 65, deep: 72 },
    usesLengthWidth: true,
  },
};

/** L:W-dependent pear factors (trade tables). */
export function pearDiamondFactor(lengthToWidth: number): number {
  if (lengthToWidth <= 1.3) return 0.00615;
  if (lengthToWidth <= 1.55) return 0.0060;
  if (lengthToWidth <= 1.75) return 0.0059;
  return 0.00575;
}

/** L:W-dependent marquise factors. */
export function marquiseDiamondFactor(lengthToWidth: number): number {
  if (lengthToWidth <= 1.5) return 0.00565;
  if (lengthToWidth <= 2.1) return 0.0058;
  if (lengthToWidth <= 2.6) return 0.00585;
  return 0.00595;
}

/** L:W-dependent emerald/step factors. */
export function emeraldDiamondFactor(lengthToWidth: number): number {
  if (lengthToWidth <= 1.15) return 0.0080;
  if (lengthToWidth <= 1.65) return 0.0092;
  if (lengthToWidth <= 2.15) return 0.01;
  return 0.0106;
}

export const DIAMOND_SG = 3.52;

/** Species SG map (screening averages). */
export const GEM_SG_MAP: Record<string, number> = {
  diamond: 3.52,
  ruby: 4.0,
  sapphire: 4.0,
  emerald: 2.72,
  aquamarine: 2.68,
  alexandrite: 3.73,
  tanzanite: 3.35,
  spinel: 3.6,
  topaz: 3.53,
  quartz: 2.65,
  amethyst: 2.65,
  citrine: 2.65,
  garnet_almandine: 4.05,
  almandine_garnet: 4.05,
  garnet_spessartine: 4.15,
  spessartine_garnet: 4.15,
  pyrope_garnet: 3.78,
  tsavorite_garnet: 3.61,
  tourmaline: 3.06,
  zircon: 4.69,
  peridot: 3.34,
  morganite: 2.8,
  kunzite: 3.18,
  moonstone: 2.57,
  turquoise: 2.76,
  lapis_lazuli: 2.8,
  iolite: 2.61,
  apatite: 3.2,
  chrome_diopside: 3.3,
  jadeite: 3.34,
  nephrite: 3.0,
  chrysoberyl: 3.73,
  opal: 2.1,
  custom: 3.0,
};

export function resolveSG(speciesKey: string, override?: number | string): number {
  if (override !== undefined && override !== "" && !Number.isNaN(Number(override))) {
    return Number(override);
  }
  const k = speciesKey.toLowerCase().replace(/\s+/g, "_");
  if (GEM_SG_MAP[k] != null) return GEM_SG_MAP[k];
  const hit = Object.keys(GEM_SG_MAP).find(
    (key) => k.includes(key) || key.includes(k)
  );
  return hit ? GEM_SG_MAP[hit] : 3.0;
}

/**
 * Estimate depth (mm) from face-up measurements using typical total depth %.
 * Round: uses diameter (length). Fancy: uses the smaller face-up axis (width).
 */
export function estimateDepthMm(
  shape: CutShapeId,
  lengthMm: number,
  widthMm: number,
  profile: DepthProfile = "average"
): number {
  const formula = SHAPE_FORMULAS[shape] || SHAPE_FORMULAS.round;
  const pct = formula.depthPercent[profile] / 100;
  const axis =
    shape === "round"
      ? lengthMm || widthMm
      : Math.min(lengthMm || widthMm, widthMm || lengthMm);
  if (!axis || axis <= 0) return 0;
  return Math.round(axis * pct * 100) / 100;
}

export function depthPercentFor(
  shape: CutShapeId,
  profile: DepthProfile = "average"
): number {
  return (SHAPE_FORMULAS[shape] || SHAPE_FORMULAS.round).depthPercent[profile];
}

export interface CaratEstimateInput {
  shape: CutShapeId;
  lengthMm: number;
  widthMm: number;
  /** Measured depth; if omitted/0 and estimateDepthIfMissing, depth is estimated */
  depthMm?: number;
  sg: number;
  depthProfile?: DepthProfile;
  estimateDepthIfMissing?: boolean;
  /** Extra girdle/bulge correction 0–0.18 (e.g. 0.05 = +5%) */
  weightCorrection?: number;
}

export interface CaratEstimateResult {
  carats: number;
  depthMm: number;
  depthEstimated: boolean;
  depthPercentUsed: number | null;
  diamondFactor: number;
  sg: number;
  formulaLabel: string;
  note: string;
}

function diamondFactorForShape(
  shape: CutShapeId,
  lengthMm: number,
  widthMm: number
): number {
  const lw =
    widthMm > 0 ? lengthMm / widthMm : 1;
  if (shape === "pear") return pearDiamondFactor(lw);
  if (shape === "marquise") return marquiseDiamondFactor(lw);
  if (shape === "emerald" || shape === "asscher") return emeraldDiamondFactor(lw);
  return (SHAPE_FORMULAS[shape] || SHAPE_FORMULAS.round).diamondFactor;
}

/**
 * Estimate carat weight (screening only).
 *
 * Diamond path: Ø²×D×0.0061 or L×W×D×factor
 * Colored stones: same × (SG / 3.52)  ≡  L×W×D×SG×~0.0018 family
 */
export function estimateCaratWeight(input: CaratEstimateInput): CaratEstimateResult {
  const shape = input.shape in SHAPE_FORMULAS ? input.shape : "round";
  const formula = SHAPE_FORMULAS[shape];
  const l = Number(input.lengthMm);
  const w = Number(input.widthMm) || l;
  const sg = Number(input.sg) > 0 ? Number(input.sg) : DIAMOND_SG;
  const profile = input.depthProfile || "average";
  const wcf = Math.max(0, Math.min(0.2, Number(input.weightCorrection) || 0));

  let depth = Number(input.depthMm) || 0;
  let depthEstimated = false;
  let depthPercentUsed: number | null = null;

  if (
    (depth <= 0 || input.estimateDepthIfMissing) &&
    input.estimateDepthIfMissing !== false &&
    depth <= 0
  ) {
    depth = estimateDepthMm(shape, l, w, profile);
    depthEstimated = true;
    depthPercentUsed = formula.depthPercent[profile];
  } else if (depth > 0) {
    const axis = shape === "round" ? l || w : Math.min(l, w) || l;
    if (axis > 0) depthPercentUsed = Math.round((depth / axis) * 1000) / 10;
  }

  if (!(l > 0) || !(w > 0) || !(depth > 0) || !(sg > 0)) {
    return {
      carats: 0,
      depthMm: depth,
      depthEstimated,
      depthPercentUsed,
      diamondFactor: formula.diamondFactor,
      sg,
      formulaLabel: formula.label,
      note: "Need length, width, and depth (or face-up size + depth estimate).",
    };
  }

  const factor = diamondFactorForShape(shape, l, w);
  const sgCorrection = sg / DIAMOND_SG;

  let raw: number;
  if (shape === "round" || shape === "oval") {
    // Round / oval often use average diameter²
    const avgDiam = shape === "round" ? l : (l + w) / 2;
    raw = avgDiam * avgDiam * depth * factor * sgCorrection;
  } else {
    raw = l * w * depth * factor * sgCorrection;
  }

  const carats = Math.round(raw * (1 + wcf) * 1000) / 1000;

  const noteParts = [
    depthEstimated
      ? `Depth estimated at ${depthPercentUsed}% (${profile} cut profile).`
      : "Depth measured / entered.",
    wcf > 0 ? `Weight correction +${Math.round(wcf * 100)}%.` : null,
    "Screening estimate only — not a laboratory certificate.",
  ].filter(Boolean);

  return {
    carats,
    depthMm: depth,
    depthEstimated,
    depthPercentUsed,
    diamondFactor: factor,
    sg,
    formulaLabel: formula.label,
    note: noteParts.join(" "),
  };
}

export const CUT_SHAPE_OPTIONS: { id: CutShapeId; label: string }[] = (
  Object.values(SHAPE_FORMULAS) as ShapeFormula[]
).map((s) => ({ id: s.id, label: s.label }));

/** Map legacy UI shape ids if needed */
export function normalizeCutShape(raw: string): CutShapeId {
  const k = (raw || "round").toLowerCase();
  if (k in SHAPE_FORMULAS) return k as CutShapeId;
  if (k.includes("emerald") || k.includes("step")) return "emerald";
  if (k.includes("princess")) return "princess";
  if (k.includes("cushion")) return "cushion";
  if (k.includes("marquise")) return "marquise";
  if (k.includes("pear")) return "pear";
  if (k.includes("oval")) return "oval";
  if (k.includes("heart")) return "heart";
  if (k.includes("baguette")) return "baguette";
  if (k.includes("radiant")) return "radiant";
  if (k.includes("asscher")) return "asscher";
  if (k.includes("triangle") || k.includes("trillion")) return "triangle";
  return "round";
}
