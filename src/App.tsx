import React, { useState, useMemo, useRef, useEffect } from "react";
import { 
  Gem, 
  Search, 
  SlidersHorizontal, 
  Sparkles, 
  FileText, 
  ShieldAlert, 
  BookOpen, 
  MessageSquare, 
  RotateCcw, 
  Send, 
  ChevronRight, 
  Fingerprint, 
  CheckCircle2, 
  Layers, 
  Zap, 
  Compass, 
  AlertTriangle,
  ClipboardList,
  Split,
  Camera,
  Upload,
  RefreshCw,
  Cpu,
  Check,
  Play,
  Ruler,
  Scale,
  ZoomIn,
  X,
  Crown
} from "lucide-react";
import { gemstonesDatabase, Gemstone } from "./data/gemstones";
import {
  CUT_SHAPE_OPTIONS,
  estimateCaratWeight,
  estimateDepthMm,
  depthPercentFor,
  normalizeCutShape,
  resolveSG,
  GEM_SG_MAP,
  type CutShapeId,
  type DepthProfile,
} from "./data/gemWeightFormulas";
import PaywallModal from "./components/PaywallModal";
import {
  billingHeaders,
  fetchBillingStatus,
  type BillingStatus,
} from "./lib/billing";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

/** Gemini POST with device id + 402 paywall signal */
async function geminiPost(url: string, body: Record<string, unknown>) {
  const res = await fetch(url, {
    method: "POST",
    headers: billingHeaders(),
    body: JSON.stringify(body),
  });
  const data = await res.json().catch(() => ({} as any));
  if (res.status === 402) {
    const err = new Error(data.error || "AI quota exceeded — upgrade to Pro") as Error & {
      code?: string;
      upgradeRequired?: boolean;
      billing?: BillingStatus;
    };
    err.code = "QUOTA_EXCEEDED";
    err.upgradeRequired = !!data.upgradeRequired;
    err.billing = data.billing;
    throw err;
  }
  if (!res.ok) {
    throw new Error(data.error || `Request failed (${res.status})`);
  }
  return data;
}

/** Specimen photo from catalog imageUrl (real mineral/gem photos). No stock/Picsum fallbacks. */
const getGemstoneImage = (gemOrId: Gemstone | string): string => {
  if (typeof gemOrId !== "string") {
    return gemOrId.imageUrl || "";
  }
  const gem = gemstonesDatabase.find((g) => g.id === gemOrId);
  return gem?.imageUrl || "";
};

/** Rare collector stones show * after the name */
const formatGemName = (gem: Gemstone) => (gem.rare ? `${gem.name}*` : gem.name);

export default function App() {
  // Tab State: 'library' | 'identify' | 'verify' | 'photo' | 'consult'
  const [activeTab, setActiveTab] = useState<"library" | "identify" | "verify" | "photo" | "consult">("library");

  // --- Billing / Pro paywall ---
  const [billing, setBilling] = useState<BillingStatus | null>(null);
  const [paywallOpen, setPaywallOpen] = useState(false);
  const [paywallReason, setPaywallReason] = useState<string | null>(null);

  useEffect(() => {
    fetchBillingStatus()
      .then(setBilling)
      .catch(() => setBilling(null));
  }, []);

  const handleQuotaError = (err: unknown) => {
    const e = err as Error & { code?: string; billing?: BillingStatus };
    if (e?.code === "QUOTA_EXCEEDED") {
      if (e.billing) setBilling(e.billing);
      setPaywallReason(e.message);
      setPaywallOpen(true);
      return true;
    }
    return false;
  };

  // --- Gem Library State ---
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedColor, setSelectedColor] = useState("All");
  const [selectedCrystal, setSelectedCrystal] = useState("All");
  const [selectedOptic, setSelectedOptic] = useState("All");
  const [rareOnly, setRareOnly] = useState(false);
  const [selectedGemId, setSelectedGemId] = useState<string>("diamond");
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  // --- Catalog AI Audit State ---
  const [catalogAuditOpen, setCatalogAuditOpen] = useState(false);
  const [auditReports, setAuditReports] = useState<Record<string, { verified: boolean; confidence: number; rating: string; verdict: string; critique: string }>>({});
  const [auditLoading, setAuditLoading] = useState<Record<string, boolean>>({});
  const [bulkAuditLoading, setBulkAuditLoading] = useState(false);

  // Selected gemstone record
  const selectedGem = useMemo(() => {
    return gemstonesDatabase.find(g => g.id === selectedGemId) || gemstonesDatabase[0];
  }, [selectedGemId]);

  // Unique lists for filters
  const colorsList = ["All", "Colorless", "Red", "Blue", "Green", "Yellow", "Violet", "Pink", "Orange", "Purple", "White", "Grey", "Black", "Lavender", "Peach", "Brown"];
  const crystalSystemsList = ["All", "Cubic (Isometric)", "Trigonal", "Hexagonal", "Orthorhombic", "Amorphous", "Tetragonal", "Monoclinic", "Triclinic"];
  const opticCharactersList = ["All", "Singly Refractive (Isotropic)", "Doubly Refractive (Uniaxial Negative)", "Doubly Refractive (Uniaxial Positive)", "Doubly Refractive (Biaxial Positive)", "Doubly Refractive (Biaxial Negative)"];

  // Filter logic
  const filteredGemstones = useMemo(() => {
    return gemstonesDatabase.filter(gem => {
      const matchesSearch = 
        gem.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        gem.species.toLowerCase().includes(searchTerm.toLowerCase()) ||
        gem.formula.toLowerCase().includes(searchTerm.toLowerCase()) ||
        gem.description.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesColor = selectedColor === "All" || 
        gem.color.toLowerCase().includes(selectedColor.toLowerCase()) ||
        selectedColor.toLowerCase().includes(gem.color.toLowerCase());

      const matchesCrystal = selectedCrystal === "All" || 
        gem.crystalSystem.toLowerCase().includes(selectedCrystal.toLowerCase()) ||
        selectedCrystal.toLowerCase().includes(gem.crystalSystem.toLowerCase());

      const matchesOptic = selectedOptic === "All" || 
        gem.opticCharacter.toLowerCase().includes(selectedOptic.toLowerCase()) ||
        selectedOptic.toLowerCase().includes(gem.opticCharacter.toLowerCase());

      const matchesRare = !rareOnly || !!gem.rare;

      return matchesSearch && matchesColor && matchesCrystal && matchesOptic && matchesRare;
    });
  }, [searchTerm, selectedColor, selectedCrystal, selectedOptic, rareOnly]);


  // --- AI Gemstone Identifier State ---
  const [labColor, setLabColor] = useState("");
  const [labRI, setLabRI] = useState("");
  const [labSG, setLabSG] = useState("");
  const [labHardness, setLabHardness] = useState("");
  const [labOpticChar, setLabOpticChar] = useState("");
  const [labInclusions, setLabInclusions] = useState("");
  const [isIdentifying, setIsIdentifying] = useState(false);
  const [identificationReport, setIdentificationReport] = useState<string | null>(null);

  const runSpecimenAudit = async (gemId: string) => {
    const gem = gemstonesDatabase.find(g => g.id === gemId);
    if (!gem) return;
    setAuditLoading(prev => ({ ...prev, [gemId]: true }));
    try {
      const imageUrl = getGemstoneImage(gemId);
      const data = await geminiPost("/api/gemini/verify-catalog-item", {
        gemId,
        imageUrl,
        gemName: gem.name,
        species: gem.species,
        formula: gem.formula,
        color: gem.color,
        description: gem.description,
      });
      setAuditReports((prev) => ({ ...prev, [gemId]: data }));
      fetchBillingStatus().then(setBilling).catch(() => {});
    } catch (err: any) {
      console.error(err);
      if (handleQuotaError(err)) return;
      setAuditReports((prev) => ({
        ...prev,
        [gemId]: {
          verified: false,
          confidence: 0,
          rating: "Mismatched",
          verdict: "AUDIT FAILURE",
          critique: `Could not connect to AI diagnostic server: ${err.message}`,
        },
      }));
    } finally {
      setAuditLoading((prev) => ({ ...prev, [gemId]: false }));
    }
  };

  const runAllCatalogAudits = async () => {
    setBulkAuditLoading(true);
    for (const gem of gemstonesDatabase) {
      await runSpecimenAudit(gem.id);
    }
    setBulkAuditLoading(false);
  };

  const resetLabForm = () => {
    setLabColor("");
    setLabRI("");
    setLabSG("");
    setLabHardness("");
    setLabOpticChar("");
    setLabInclusions("");
    setIdentificationReport(null);
  };

  const autoSelectIdentifiedGem = (text: string) => {
    if (!text) return;
    const textLower = text.toLowerCase();
    
    // Sort gemstones from database by name length descending to avoid partial matches
    // e.g. "blue sapphire" before "sapphire" or "almandine garnet" before "garnet"
    const sortedGems = [...gemstonesDatabase].sort((a, b) => b.name.length - a.name.length);
    const foundGem = sortedGems.find(g => {
      const nameLower = g.name.toLowerCase();
      const speciesLower = g.species.toLowerCase();
      return textLower.includes(nameLower) || textLower.includes(speciesLower);
    });

    if (foundGem) {
      setSelectedGemId(foundGem.id);
      setCalcGemType(foundGem.id);
      setCalcSG(String(resolveSG(foundGem.id, foundGem.specificGravity)));
    }
  };

  const handleRunIdentification = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsIdentifying(true);
    setIdentificationReport(null);
    try {
      const data = await geminiPost("/api/gemini/identify", {
        color: labColor,
        refractiveIndex: labRI,
        specificGravity: labSG,
        hardness: labHardness,
        opticCharacter: labOpticChar,
        inclusions: labInclusions,
      });
      setIdentificationReport(data.text);
      autoSelectIdentifiedGem(data.text);
      fetchBillingStatus().then(setBilling).catch(() => {});
    } catch (err: any) {
      if (handleQuotaError(err)) {
        setIdentificationReport(`Limit reached: ${err.message}`);
      } else {
        setIdentificationReport(`Error: ${err.message}`);
      }
    } finally {
      setIsIdentifying(false);
    }
  };


  // --- AI Authenticity & Verification State ---
  const [verifyName, setVerifyName] = useState("");
  const [verifySource, setVerifySource] = useState("");
  const [verifySimulants, setVerifySimulants] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationReport, setVerificationReport] = useState<string | null>(null);

  const handleRunVerification = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsVerifying(true);
    setVerificationReport(null);
    try {
      const data = await geminiPost("/api/gemini/verify", {
        gemstoneName: verifyName,
        allegedSource: verifySource,
        suspectedSimulants: verifySimulants,
      });
      setVerificationReport(data.text);
      fetchBillingStatus().then(setBilling).catch(() => {});
    } catch (err: any) {
      if (handleQuotaError(err)) {
        setVerificationReport(`Limit reached: ${err.message}`);
      } else {
        setVerificationReport(`Error: ${err.message}`);
      }
    } finally {
      setIsVerifying(false);
    }
  };


  // --- AI Photo Analyzer State ---
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [technicianNotes, setTechnicianNotes] = useState("");
  const [isCapturing, setIsCapturing] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);
  const [photoReport, setPhotoReport] = useState<string | null>(null);
  const [isAnalyzingPhoto, setIsAnalyzingPhoto] = useState(false);

  // --- AI Estimated Proportions State ---
  const [aiEstimatedProportions, setAiEstimatedProportions] = useState<{
    shape?: string;
    length?: number;
    width?: number;
    depth?: number;
    species?: string;
  } | null>(null);

  // --- Caliper & Carat Weight Calculator State ---
  const [calcGemType, setCalcGemType] = useState<string>("diamond");
  const [calcSG, setCalcSG] = useState<string>("3.52");
  const [calcCutShape, setCalcCutShape] = useState<string>("round");
  const [calcLength, setCalcLength] = useState<number>(6.5);
  const [calcWidth, setCalcWidth] = useState<number>(6.5);
  const [calcDepth, setCalcDepth] = useState<number>(3.96); // ~61% of 6.5mm
  /** measured = user/caliper depth; estimated = depth-% from face-up proportions */
  const [depthMode, setDepthMode] = useState<"measured" | "estimated">("estimated");
  const [depthProfile, setDepthProfile] = useState<DepthProfile>("average");
  const [weightCorrectionPct, setWeightCorrectionPct] = useState<number>(0);

  // Caliper overlay state
  const [caliperActive, setCaliperActive] = useState<boolean>(false);
  const [caliperWidthPx, setCaliperWidthPx] = useState<number>(120);
  const [caliperHeightPx, setCaliperHeightPx] = useState<number>(120);
  const [caliperOffsetX, setCaliperOffsetX] = useState<number>(0);
  const [caliperOffsetY, setCaliperOffsetY] = useState<number>(0);
  const [caliperCalibration, setCaliperCalibration] = useState<number>(20); // px per mm

  // Click & Drag Caliper state
  const [caliperDragMode, setCaliperDragMode] = useState<'none' | 'length' | 'width' | 'shank'>('none');
  const [lengthDragStart, setLengthDragStart] = useState<{ x: number, y: number } | null>(null);
  const [lengthDragEnd, setLengthDragEnd] = useState<{ x: number, y: number } | null>(null);
  const [widthDragStart, setWidthDragStart] = useState<{ x: number, y: number } | null>(null);
  const [widthDragEnd, setWidthDragEnd] = useState<{ x: number, y: number } | null>(null);
  const [shankDragStart, setShankDragStart] = useState<{ x: number, y: number } | null>(null);
  const [shankDragEnd, setShankDragEnd] = useState<{ x: number, y: number } | null>(null);
  const [isDraggingCaliperLine, setIsDraggingCaliperLine] = useState<boolean>(false);

  // SG map from shared formulas module (string values for controlled inputs)
  const gemSGMap: Record<string, string> = useMemo(() => {
    const m: Record<string, string> = {};
    for (const [k, v] of Object.entries(GEM_SG_MAP)) {
      m[k] = String(v);
    }
    return m;
  }, []);

  const handleGemTypeChange = (type: string) => {
    setCalcGemType(type);
    const sg = resolveSG(type);
    setCalcSG(String(sg));
  };

  const cutShapeId = useMemo(
    () => normalizeCutShape(calcCutShape),
    [calcCutShape]
  );

  // When depth is estimated, keep D in sync with face-up size + shape profile
  useEffect(() => {
    if (depthMode !== "estimated") return;
    const d = estimateDepthMm(cutShapeId, calcLength, calcWidth, depthProfile);
    if (d > 0) setCalcDepth(d);
  }, [depthMode, cutShapeId, calcLength, calcWidth, depthProfile]);

  // Live carat estimator — industry dimensional formulas + depth-% tables
  const caratEstimate = useMemo(() => {
    return estimateCaratWeight({
      shape: cutShapeId,
      lengthMm: calcLength,
      widthMm: calcCutShape === "round" ? calcLength : calcWidth,
      depthMm: depthMode === "measured" ? calcDepth : undefined,
      sg: resolveSG(calcGemType, calcSG),
      depthProfile,
      estimateDepthIfMissing: depthMode === "estimated",
      weightCorrection: weightCorrectionPct / 100,
    });
  }, [
    cutShapeId,
    calcLength,
    calcWidth,
    calcDepth,
    calcSG,
    calcGemType,
    calcCutShape,
    depthMode,
    depthProfile,
    weightCorrectionPct,
  ]);

  const calculatedCaratWeight = caratEstimate.carats;

  // Apply digital caliper pixel-scaled mm readings (face-up); depth stays estimated unless measured
  const applyCaliperMeasurements = () => {
    const computedLength = Number((caliperWidthPx / caliperCalibration).toFixed(2));
    const computedWidth = Number((caliperHeightPx / caliperCalibration).toFixed(2));
    setCalcLength(computedLength);
    if (calcCutShape !== "round") {
      setCalcWidth(computedWidth);
    } else {
      setCalcWidth(computedLength);
    }
    // Face-up calipers → prefer depth-% estimate from proportions
    setDepthMode("estimated");
  };

  const handleCaliperMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!caliperActive || caliperDragMode === 'none') return;
    e.preventDefault();
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setIsDraggingCaliperLine(true);
    if (caliperDragMode === 'length') {
      setLengthDragStart({ x, y });
      setLengthDragEnd({ x, y });
    } else if (caliperDragMode === 'width') {
      setWidthDragStart({ x, y });
      setWidthDragEnd({ x, y });
    } else if (caliperDragMode === 'shank') {
      setShankDragStart({ x, y });
      setShankDragEnd({ x, y });
    }
  };

  const handleCaliperMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!caliperActive || caliperDragMode === 'none' || !isDraggingCaliperLine) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.max(0, Math.min(rect.width, e.clientX - rect.left));
    const y = Math.max(0, Math.min(rect.height, e.clientY - rect.top));

    if (caliperDragMode === 'length' && lengthDragStart) {
      setLengthDragEnd({ x, y });
      const px = Math.sqrt((x - lengthDragStart.x) ** 2 + (y - lengthDragStart.y) ** 2);
      setCaliperWidthPx(Math.round(px));
    } else if (caliperDragMode === 'width' && widthDragStart) {
      setWidthDragEnd({ x, y });
      const px = Math.sqrt((x - widthDragStart.x) ** 2 + (y - widthDragStart.y) ** 2);
      setCaliperHeightPx(Math.round(px));
    } else if (caliperDragMode === 'shank' && shankDragStart) {
      setShankDragEnd({ x, y });
      const px = Math.sqrt((x - shankDragStart.x) ** 2 + (y - shankDragStart.y) ** 2);
      if (px > 5) {
        const newCalib = Math.max(2, Math.min(150, px / 17.35));
        setCaliperCalibration(Math.round(newCalib * 10) / 10);
      }
    }
  };

  const handleCaliperMouseUp = () => {
    setIsDraggingCaliperLine(false);
  };

  const handleCaliperTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!caliperActive || caliperDragMode === 'none') return;
    e.preventDefault();
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    if (e.touches.length === 0) return;
    const touch = e.touches[0];
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;

    setIsDraggingCaliperLine(true);
    if (caliperDragMode === 'length') {
      setLengthDragStart({ x, y });
      setLengthDragEnd({ x, y });
    } else if (caliperDragMode === 'width') {
      setWidthDragStart({ x, y });
      setWidthDragEnd({ x, y });
    } else if (caliperDragMode === 'shank') {
      setShankDragStart({ x, y });
      setShankDragEnd({ x, y });
    }
  };

  const handleCaliperTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!caliperActive || caliperDragMode === 'none' || !isDraggingCaliperLine) return;
    e.preventDefault();
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    if (e.touches.length === 0) return;
    const touch = e.touches[0];
    const x = Math.max(0, Math.min(rect.width, touch.clientX - rect.left));
    const y = Math.max(0, Math.min(rect.height, touch.clientY - rect.top));

    if (caliperDragMode === 'length' && lengthDragStart) {
      setLengthDragEnd({ x, y });
      const px = Math.sqrt((x - lengthDragStart.x) ** 2 + (y - lengthDragStart.y) ** 2);
      setCaliperWidthPx(Math.round(px));
    } else if (caliperDragMode === 'width' && widthDragStart) {
      setWidthDragEnd({ x, y });
      const px = Math.sqrt((x - widthDragStart.x) ** 2 + (y - widthDragStart.y) ** 2);
      setCaliperHeightPx(Math.round(px));
    } else if (caliperDragMode === 'shank' && shankDragStart) {
      setShankDragEnd({ x, y });
      const px = Math.sqrt((x - shankDragStart.x) ** 2 + (y - shankDragStart.y) ** 2);
      if (px > 5) {
        const newCalib = Math.max(2, Math.min(150, px / 17.35));
        setCaliperCalibration(Math.round(newCalib * 10) / 10);
      }
    }
  };

  // Lock page scroll while measuring so the screen doesn't move under the finger/stylus
  const measuringActive =
    caliperActive && (caliperDragMode !== "none" || isDraggingCaliperLine);

  useEffect(() => {
    if (!measuringActive) return;
    const html = document.documentElement;
    const body = document.body;
    const prev = {
      htmlOverflow: html.style.overflow,
      bodyOverflow: body.style.overflow,
      bodyTouch: body.style.touchAction,
      bodyPos: body.style.position,
      bodyTop: body.style.top,
      bodyWidth: body.style.width,
      scrollY: window.scrollY,
    };
    body.style.position = "fixed";
    body.style.top = `-${prev.scrollY}px`;
    body.style.width = "100%";
    body.style.overflow = "hidden";
    body.style.touchAction = "none";
    html.style.overflow = "hidden";
    return () => {
      html.style.overflow = prev.htmlOverflow;
      body.style.overflow = prev.bodyOverflow;
      body.style.touchAction = prev.bodyTouch;
      body.style.position = prev.bodyPos;
      body.style.top = prev.bodyTop;
      body.style.width = prev.bodyWidth;
      window.scrollTo(0, prev.scrollY);
    };
  }, [measuringActive]);

  // Non-passive touchmove so preventDefault stops scroll on iOS/Android (React listeners are often passive)
  const viewfinderRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const el = viewfinderRef.current;
    if (!el || !measuringActive) return;
    const blockMove = (e: TouchEvent) => {
      e.preventDefault();
    };
    el.addEventListener("touchmove", blockMove, { passive: false });
    return () => {
      el.removeEventListener("touchmove", blockMove);
    };
  }, [measuringActive]);

  // Apply AI Vision estimated proportions to caliper & calculator fields
  const applyAiEstimatedProportions = () => {
    if (!aiEstimatedProportions) return;
    const { shape, length, width, depth, species } = aiEstimatedProportions;
    if (shape) {
      const normalizedShape = shape.toLowerCase();
      const validShapes = ["round", "oval", "emerald", "pear", "cushion", "princess", "marquise", "baguette"];
      if (validShapes.includes(normalizedShape)) {
        setCalcCutShape(normalizedShape);
      }
    }
    if (length) setCalcLength(length);
    if (width) setCalcWidth(width);
    if (depth) {
      setDepthMode("measured");
      setCalcDepth(depth);
    } else {
      setDepthMode("estimated");
    }
    if (species) {
      const normalizedSpecies = species.toLowerCase();
      const matchingKey = Object.keys(gemSGMap).find(k => k.includes(normalizedSpecies) || normalizedSpecies.includes(k));
      if (matchingKey) {
        handleGemTypeChange(matchingKey);
      } else {
        handleGemTypeChange("custom");
        const dbGem = gemstonesDatabase.find(g => g.name.toLowerCase().includes(normalizedSpecies) || g.species.toLowerCase().includes(normalizedSpecies));
        if (dbGem) {
          setCalcSG(dbGem.specificGravity);
        }
      }
    }
  };
  
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Start webcam
  const startCamera = async () => {
    setImageSrc(null);
    setPhotoReport(null);
    try {
      setCameraActive(true);
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: "environment", width: 640, height: 480 } 
      });
      mediaStreamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    } catch (err) {
      console.error("Failed to acquire camera stream:", err);
      alert("Could not access the camera. Please upload an image file instead or check device permissions.");
      setCameraActive(false);
    }
  };

  // Stop webcam
  const stopCamera = () => {
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach(track => track.stop());
      mediaStreamRef.current = null;
    }
    setCameraActive(false);
  };

  // Capture frame
  const capturePhoto = () => {
    if (videoRef.current) {
      const canvas = document.createElement("canvas");
      canvas.width = videoRef.current.videoWidth || 640;
      canvas.height = videoRef.current.videoHeight || 480;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL("image/jpeg", 0.85);
        setImageSrc(dataUrl);
        stopCamera();
      }
    }
  };

  // Handle uploaded file
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setImageSrc(event.target.result as string);
          setPhotoReport(null);
          stopCamera();
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Submit Photo to Gemini 3.5 Flash server route
  const analyzeGemstonePhoto = async () => {
    if (!imageSrc) return;
    setIsAnalyzingPhoto(true);
    setPhotoReport(null);
    setAiEstimatedProportions(null);

    try {
      const data = await geminiPost("/api/gemini/analyze-photo", {
        image: imageSrc,
        notes: technicianNotes,
      });
      const fullText = data.text || "";
      const parts = fullText.split("---ESTIMATED_PROPORTIONS---");
      const mainReport = parts[0].trim();
      setPhotoReport(mainReport);

      let autoSelected = false;

      if (parts.length > 1) {
        try {
          const jsonText = parts[1].trim();
          const cleanedJsonText = jsonText.replace(/```json/g, "").replace(/```/g, "").trim();
          const parsedProportions = JSON.parse(cleanedJsonText);
          setAiEstimatedProportions(parsedProportions);

          if (parsedProportions.species) {
            const speciesLower = parsedProportions.species.toLowerCase();
            const sortedGems = [...gemstonesDatabase].sort((a, b) => b.name.length - a.name.length);
            const foundGem = sortedGems.find((g) => {
              const nameLower = g.name.toLowerCase();
              const speciesLowerDb = g.species.toLowerCase();
              return (
                speciesLower.includes(nameLower) ||
                speciesLower.includes(speciesLowerDb) ||
                nameLower.includes(speciesLower) ||
                speciesLowerDb.includes(speciesLower)
              );
            });
            if (foundGem) {
              setSelectedGemId(foundGem.id);
              if (gemSGMap[foundGem.id]) {
                setCalcGemType(foundGem.id);
                setCalcSG(gemSGMap[foundGem.id]);
              } else {
                setCalcGemType("custom");
                setCalcSG(foundGem.specificGravity);
              }
              autoSelected = true;
            }
          }
        } catch (e) {
          console.error("Could not parse estimated proportions JSON:", e);
        }
      }

      if (!autoSelected) {
        autoSelectIdentifiedGem(fullText);
      }
      fetchBillingStatus().then(setBilling).catch(() => {});
    } catch (err: any) {
      if (handleQuotaError(err)) {
        setPhotoReport(`Limit reached: ${err.message}`);
      } else {
        setPhotoReport(`Error: Visual pipeline connection failed. ${err.message}`);
      }
    } finally {
      setIsAnalyzingPhoto(false);
    }
  };

  // Clean up camera on tab change or unmount
  useEffect(() => {
    return () => {
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, [activeTab]);


  // --- Lab Q&A Chat State ---
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState<Array<{ role: "user" | "assistant"; text: string }>>([
    { 
      role: "assistant", 
      text: "Welcome to Northeast Gemological's pocket Gem Geek. I can assist with spectroscopic absorption signatures, advanced test sequencing, gemstone origin diagnostics, and inclusions. What can I evaluate for you today?" 
    }
  ]);
  const [isChatting, setIsChatting] = useState(false);

  const sendChatMessage = async (customText?: string) => {
    const textToSend = customText || chatInput;
    if (!textToSend.trim()) return;

    const newUserMessage = { role: "user" as const, text: textToSend };
    setChatMessages(prev => [...prev, newUserMessage]);
    if (!customText) setChatInput("");
    setIsChatting(true);

    try {
      const history = chatMessages.map((msg) => ({
        role: msg.role === "user" ? "user" : "model",
        text: msg.text,
      }));

      const data = await geminiPost("/api/gemini/ask", {
        message: textToSend,
        history,
      });
      setChatMessages((prev) => [...prev, { role: "assistant", text: data.text }]);
      fetchBillingStatus().then(setBilling).catch(() => {});
    } catch (err: any) {
      if (handleQuotaError(err)) {
        setChatMessages((prev) => [
          ...prev,
          { role: "assistant", text: `Limit reached: ${err.message} Open Pro to continue.` },
        ]);
      } else {
        setChatMessages((prev) => [
          ...prev,
          { role: "assistant", text: `Connection failure: ${err.message}` },
        ]);
      }
    } finally {
      setIsChatting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#080808] text-[#E0E0E0] font-sans antialiased selection:bg-[#D4AF37]/30 selection:text-[#FFF2B2] flex flex-col justify-between">
      
      {/* Gem Geek brand header — app icon + wordmark */}
      <header className="relative w-full bg-gradient-to-b from-[#0c0e12] via-[#08090c] to-[#050506] border-b border-[#D4AF37]/25">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(212,175,55,0.08)_0%,transparent_55%)] pointer-events-none" />
        <div className="relative z-10 max-w-7xl mx-auto px-3 sm:px-5 md:px-8 py-4 sm:py-5 md:py-6">
          <div className="flex items-center gap-3 sm:gap-4 md:gap-5">
            {/* App icon button (home) */}
            <button
              type="button"
              onClick={() => setActiveTab("library")}
              className="shrink-0 rounded-[1.1rem] sm:rounded-[1.35rem] p-0.5 bg-gradient-to-br from-[#D4AF37]/50 via-white/10 to-[#AA7C11]/30 shadow-[0_10px_28px_rgba(0,0,0,0.65)] ring-1 ring-[#D4AF37]/25 hover:ring-[#D4AF37]/55 hover:scale-[1.02] active:scale-[0.98] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
              title="Gem Geek home"
              aria-label="Gem Geek home"
            >
              <img
                src="/gem-geek-icon.png"
                alt="Gem Geek"
                className="h-14 w-14 sm:h-[4.5rem] sm:w-[4.5rem] md:h-24 md:w-24 rounded-[0.95rem] sm:rounded-[1.15rem] object-cover select-none"
                draggable={false}
              />
            </button>
            <div className="min-w-0 flex-1 text-left">
              <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                <img
                  src="/NElogoMM.png"
                  alt=""
                  className="hidden xs:block h-7 w-auto sm:h-8 md:h-9 object-contain opacity-90 flex-shrink-0"
                  aria-hidden
                  draggable={false}
                />
                <div className="min-w-0">
                  <p className="text-[10px] sm:text-xs md:text-sm tracking-[0.2em] sm:tracking-[0.26em] uppercase text-[#94A3B8] font-semibold">
                    Northeast Gemological&apos;s
                  </p>
                  <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] font-serif font-black tracking-wide bg-gradient-to-b from-[#FFF2B2] via-[#D4AF37] to-[#AA7C11] bg-clip-text text-transparent leading-tight">
                    Gem Geek
                  </h1>
                </div>
              </div>
              <p className="mt-0.5 sm:mt-1 text-[10px] sm:text-xs md:text-sm text-[#64748B] max-w-xl leading-snug">
                <span className="hidden sm:inline">Bench assistant · screening ID, photo notes &amp; verification · </span>
                <span className="text-[#D4AF37]/80">not a laboratory certificate</span>
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                setPaywallReason(null);
                setPaywallOpen(true);
              }}
              className="shrink-0 flex flex-col items-end gap-1 rounded-xl border border-[#D4AF37]/35 bg-black/50 px-2.5 sm:px-3 py-2 hover:border-[#D4AF37]/70 transition-colors"
            >
              <span className="inline-flex items-center gap-1 text-[10px] sm:text-xs font-mono font-black uppercase tracking-wider text-[#D4AF37]">
                <Crown className="w-3.5 h-3.5" />
                {billing?.isPaid ? billing.planName : "Free"}
              </span>
              <span className="text-[9px] sm:text-[10px] text-white/45 font-medium">
                {billing?.usage
                  ? `AI ${billing.usage.weekCalls}${billing.usage.weekLimit != null ? `/${billing.usage.weekLimit}` : ""} wk`
                  : "Plans"}
              </span>
            </button>
          </div>
        </div>
      </header>

      <PaywallModal
        open={paywallOpen}
        onClose={() => setPaywallOpen(false)}
        billing={billing}
        onBillingChange={setBilling}
        reason={paywallReason}
      />

      {/* Sticky nav — short labels on phone, full on tablet+ */}
      <div className="sticky top-0 z-50 w-full bg-gradient-to-b from-[#FFFFFF] via-[#E8EEF5] to-[#CBD5E1] border-b-2 border-[#94A3B8]/80 shadow-[0_6px_18px_-6px_rgba(0,0,0,0.55)]">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 py-2 sm:py-2.5">
          <nav className="grid grid-cols-5 sm:flex sm:items-center sm:justify-center gap-0.5 sm:gap-2 md:gap-3 w-full" aria-label="Gem Geek tools">
            {([
              { id: "library" as const, short: "Home", long: "Home" },
              { id: "photo" as const, short: "Photo", long: "Photo" },
              { id: "identify" as const, short: "Lab", long: "Lab ID" },
              { id: "verify" as const, short: "Verify", long: "Verify" },
              { id: "consult" as const, short: "Chat", long: "Consult" },
            ]).map((tab) => (
              <button
                key={tab.id}
                id={`tab-btn-${tab.id}`}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`min-w-0 px-1 sm:px-4 md:px-5 py-2.5 sm:py-3 rounded-lg sm:rounded-xl text-[10px] xs:text-[11px] sm:text-sm md:text-base font-serif font-black uppercase tracking-tight sm:tracking-wide transition-all relative ${
                  activeTab === tab.id
                    ? "bg-[#AA7C11]/18 text-[#8C6239] shadow-inner"
                    : "text-[#1E293B] hover:bg-[#AA7C11]/10 hover:text-[#AA7C11]"
                }`}
              >
                <span className="sm:hidden">{tab.short}</span>
                <span className="hidden sm:inline">{tab.long}</span>
                {activeTab === tab.id && (
                  <span className="absolute bottom-0.5 left-1 right-1 sm:bottom-1 sm:left-3 sm:right-3 h-[3px] bg-[#AA7C11] rounded-full" />
                )}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lab-grid flex-1 w-full">

        {/* ==================== TAB 1: GEMSTONE DATABASE & REFERENCE LIBRARY ==================== */}
        {activeTab === "library" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Filters and Gem List (4 cols) */}
            <div className="lg:col-span-4 bg-[#0A0A0A] rounded-2xl border border-white/5 p-6 shadow-lg space-y-6">
              
              <div className="flex items-center justify-between border-b border-white/5 pb-4">
                <div className="flex items-center gap-2.5">
                  <SlidersHorizontal className="w-5 h-5 text-[#D4AF37]" />
                  <h3 className="font-serif text-base tracking-wide text-white font-bold">Database Filters</h3>
                </div>
                <button 
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedColor("All");
                    setSelectedCrystal("All");
                    setSelectedOptic("All");
                  }}
                  className="text-xs sm:text-sm text-[#D4AF37] hover:text-[#FFF2B2] uppercase font-bold tracking-wider flex items-center gap-1.5"
                >
                  <RotateCcw className="w-4 h-4" />
                  Reset
                </button>
              </div>

              {/* Text Search */}
              <div className="relative">
                <Search className="absolute left-3.5 top-3.5 h-5 w-5 text-white/40" />
                <input
                  type="text"
                  placeholder="Search gems, species, formulas..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-black border border-white/10 rounded-xl pl-11 pr-4 py-3.5 text-sm sm:text-base focus:outline-hidden focus:border-[#D4AF37]/50 focus:bg-white/5 transition-all text-white placeholder:text-white/40 font-medium"
                />
              </div>

              {/* Filter selectors */}
              <div className="grid grid-cols-1 gap-4.5 pt-1">
                <div>
                  <label className="block text-xs sm:text-sm font-extrabold text-[#D4AF37] uppercase tracking-wider mb-2">Dominant Color</label>
                  <select
                    value={selectedColor}
                    onChange={(e) => setSelectedColor(e.target.value)}
                    className="w-full bg-black border border-white/10 rounded-lg p-3.5 py-3 text-sm sm:text-base text-white/90 font-medium focus:outline-hidden focus:border-[#D4AF37]/50"
                  >
                    {colorsList.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-extrabold text-[#D4AF37] uppercase tracking-wider mb-2">Crystal System</label>
                  <select
                    value={selectedCrystal}
                    onChange={(e) => setSelectedCrystal(e.target.value)}
                    className="w-full bg-black border border-white/10 rounded-lg p-3.5 py-3 text-sm sm:text-base text-white/90 font-medium focus:outline-hidden focus:border-[#D4AF37]/50"
                  >
                    {crystalSystemsList.map(cr => <option key={cr} value={cr}>{cr}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-extrabold text-[#D4AF37] uppercase tracking-wider mb-2">Optic Character</label>
                  <select
                    value={selectedOptic}
                    onChange={(e) => setSelectedOptic(e.target.value)}
                    className="w-full bg-black border border-white/10 rounded-lg p-3.5 py-3 text-sm sm:text-base text-white/90 font-medium focus:outline-hidden focus:border-[#D4AF37]/50"
                  >
                    {opticCharactersList.map(op => <option key={op} value={op}>{op}</option>)}
                  </select>
                </div>

                <label className="flex items-center gap-3 cursor-pointer select-none rounded-lg border border-white/10 bg-black/40 px-3.5 py-3 hover:border-amber-400/30 transition-colors">
                  <input
                    type="checkbox"
                    checked={rareOnly}
                    onChange={(e) => setRareOnly(e.target.checked)}
                    className="w-4 h-4 accent-[#D4AF37]"
                  />
                  <span className="text-xs sm:text-sm font-bold text-amber-200/90">
                    Rare only <span className="text-white/50 font-medium">(* scarce / collector)</span>
                  </span>
                </label>
              </div>

              {/* Offline Preloaded Gemstones List */}
              <div className="pt-4 border-t border-white/5 space-y-4">
                <button
                  type="button"
                  onClick={() => setCatalogAuditOpen(true)}
                  className="w-full bg-gradient-to-r from-neutral-900 to-black hover:from-[#D4AF37]/10 hover:to-black text-xs sm:text-sm font-black uppercase tracking-wider text-[#D4AF37] hover:text-[#FFF2B2] py-3.5 rounded-xl border border-[#D4AF37]/20 hover:border-[#D4AF37]/40 flex items-center justify-center gap-2 transition-all shadow-md group"
                >
                  <Cpu className="w-4 h-4 text-[#D4AF37] group-hover:animate-pulse" />
                  AI Catalog Auditor Lab
                </button>

                <div className="flex justify-between items-center mb-1.5 pt-1">
                  <span className="text-xs sm:text-sm font-extrabold text-white/60 uppercase tracking-wider">
                    Minerals Preloaded ({filteredGemstones.length} / {gemstonesDatabase.length})
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]"></span>
                    <span className="text-xs text-emerald-400 font-mono uppercase tracking-widest font-black">
                      DB LOCAL
                    </span>
                  </div>
                </div>
                <p className="text-[11px] sm:text-xs text-white/40 font-medium -mt-1 mb-1">
                  * = rare / scarce collector stone · specimen photos from mineral references
                </p>

                <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-1">
                  {filteredGemstones.length > 0 ? (
                    filteredGemstones.map((gem) => (
                      <button
                        key={gem.id}
                        onClick={() => setSelectedGemId(gem.id)}
                        className={`w-full text-left p-3.5 rounded-xl border transition-all duration-150 flex items-center justify-between gap-4 group ${selectedGemId === gem.id ? "bg-white/5 border-[#D4AF37] text-white shadow-md scale-[1.01]" : "bg-black/30 border-white/5 text-white/70 hover:bg-white/5"}`}
                      >
                        <div className="flex items-center gap-3.5 min-w-0">
                          {/* Image Thumbnail for quick reference */}
                          <div className="w-12 h-12 rounded-xl overflow-hidden bg-neutral-900 border border-white/10 shrink-0 relative">
                            <img 
                              src={getGemstoneImage(gem)} 
                              alt={formatGemName(gem)} 
                              referrerPolicy="no-referrer"
                              className="object-cover w-full h-full"
                              loading="lazy"
                              onError={(e) => {
                                const el = e.currentTarget;
                                el.style.opacity = "0.35";
                                el.alt = `${gem.name} (photo unavailable)`;
                              }}
                            />
                          </div>
                          <div className="truncate">
                            <div className={`font-black text-sm sm:text-base tracking-wide truncate ${selectedGemId === gem.id ? "text-[#D4AF37]" : "text-white"}`}>
                              {formatGemName(gem)}
                              {gem.rare && (
                                <span className="ml-1.5 text-[10px] font-mono font-bold tracking-wider text-amber-300/90 align-middle">RARE</span>
                              )}
                            </div>
                            <div className="text-xs sm:text-sm mt-1 text-white/50 truncate font-medium">{gem.species} • H {gem.hardness}</div>
                          </div>
                        </div>
                        <ChevronRight className={`w-4.5 h-4.5 shrink-0 transition-transform ${selectedGemId === gem.id ? "text-[#D4AF37] translate-x-1" : "text-white/40 group-hover:translate-x-1"}`} />
                      </button>
                    ))
                  ) : (
                    <div className="text-center py-10 text-sm sm:text-base text-white/40 bg-black/30 rounded-xl border border-dashed border-white/10">
                      No mineral species matches filters.
                    </div>
                  )}
                </div>
              </div>

            </div>

            {/* Right Column: Gemstone Lab Sheet (8 cols) */}
            <div className="lg:col-span-8 space-y-6">
              
              <div className="bg-[#0A0A0A] rounded-2xl border border-white/5 shadow-2xl overflow-hidden relative">
                
                {/* Corner Decorative Accent Bars for lab device vibe */}
                <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-[#D4AF37]/50"></div>
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-[#D4AF37]/50"></div>

                {/* Header Banner */}
                <div className="bg-black/85 text-white p-6 sm:p-8 relative border-b border-white/5">
                  <div className="absolute right-4 top-4 opacity-10 pointer-events-none">
                    <Gem className="w-28 h-28 text-[#D4AF37]" />
                  </div>
                  
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <div className="text-xs sm:text-sm uppercase font-mono tracking-widest text-[#D4AF37] font-black">Standard Reference Laboratory Card</div>
                      <h2 className="text-4xl sm:text-5xl font-serif font-black tracking-wide text-white mt-2">
                        {formatGemName(selectedGem)}
                        {selectedGem.rare && (
                          <span className="ml-3 align-middle text-sm sm:text-base font-mono font-bold tracking-widest text-amber-300 border border-amber-400/40 bg-amber-500/10 px-2.5 py-1 rounded-lg">RARE</span>
                        )}
                      </h2>
                      <p className="text-sm sm:text-base text-white/60 mt-1.5">Species group: <strong className="text-white/95 font-bold">{selectedGem.species}</strong> | Chemical formula: <code className="bg-white/10 text-[#D4AF37] px-2.5 py-1 rounded font-mono text-xs border border-white/20 ml-1.5">{selectedGem.formula}</code></p>
                      {selectedGem.rare && (
                        <p className="text-xs sm:text-sm text-amber-200/80 mt-2 font-medium">* Rare / scarce collector material — limited localities or low natural abundance.</p>
                      )}
                    </div>
                    <div className="bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] rounded-xl px-5 py-3 text-center min-w-[120px]">
                      <div className="text-xs font-mono font-bold tracking-wider uppercase opacity-90">Hardness (Mohs)</div>
                      <div className="text-3xl font-black font-mono text-white mt-1">{selectedGem.hardness}</div>
                    </div>
                  </div>
                </div>

                {/* Body details */}
                <div className="p-6 sm:p-8 space-y-8">
                  
                  {/* Quick description + Specimen Visual Reference */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                    <div className="md:col-span-7 space-y-5">
                      <h4 className="text-xs sm:text-sm font-black text-[#D4AF37] uppercase tracking-wider mb-1">Description & Origin Overview</h4>
                      <p className="text-base sm:text-lg text-white leading-relaxed font-sans font-medium">{selectedGem.description}</p>
                      
                      {/* Interactive magnifying glass or details tag */}
                      <div className="text-xs sm:text-sm text-white/70 border border-white/10 bg-black/40 px-4 py-3 rounded-xl flex items-center gap-2.5">
                        <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                        <span>Hover over the visual reference card to examine microscopic details, or click to enlarge.</span>
                      </div>
                    </div>
                    
                    <div className="md:col-span-5">
                      <h4 className="text-xs sm:text-sm font-black text-[#D4AF37] uppercase tracking-wider mb-2.5">Specimen Photographic Reference</h4>
                      <button
                        type="button"
                        onClick={() => {
                          const url = getGemstoneImage(selectedGem);
                          if (url) setLightboxImage(url);
                        }}
                        className="w-full text-left relative group overflow-hidden rounded-xl border border-[#D4AF37]/30 bg-black p-2 shadow-xl transition-all duration-300 hover:border-[#D4AF37]/60 hover:shadow-2xl hover:shadow-[#D4AF37]/10 focus:outline-hidden focus:ring-1 focus:ring-[#D4AF37]"
                      >
                        {/* Golden corner brackets */}
                        <div className="absolute top-2 left-2 w-3.5 h-3.5 border-t border-l border-[#D4AF37]/60 pointer-events-none z-10"></div>
                        <div className="absolute top-2 right-2 w-3.5 h-3.5 border-t border-r border-[#D4AF37]/60 pointer-events-none z-10"></div>
                        <div className="absolute bottom-2 left-2 w-3.5 h-3.5 border-b border-l border-[#D4AF37]/60 pointer-events-none z-10"></div>
                        <div className="absolute bottom-2 right-2 w-3.5 h-3.5 border-b border-r border-[#D4AF37]/60 pointer-events-none z-10"></div>
                        
                        {/* Image aspect ratio container */}
                        <div className="aspect-square w-full overflow-hidden rounded-lg bg-neutral-900 flex items-center justify-center relative">
                          <img 
                            src={getGemstoneImage(selectedGem)} 
                            alt={`${formatGemName(selectedGem)} specimen`} 
                            referrerPolicy="no-referrer"
                            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                            onError={(e) => {
                              e.currentTarget.style.opacity = "0.4";
                            }}
                          />
                          
                          {/* Zoom Icon overlay */}
                          <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                            <div className="bg-black/80 border border-[#D4AF37]/40 rounded-full p-2.5 text-[#D4AF37]">
                              <ZoomIn className="w-5 h-5" />
                            </div>
                          </div>
                                              {/* Photo analytical HUD overlay */}
                          <div className="absolute bottom-2 left-2 bg-black/85 border border-white/10 rounded px-2.5 py-1 text-xs font-mono text-[#D4AF37] tracking-wider uppercase font-bold">
                            {selectedGem.id.toUpperCase()}-LAB-STD
                          </div>
                          
                          <div className="absolute top-2 right-2 bg-black/85 border border-white/10 rounded px-2.5 py-1 text-xs font-mono text-white/70 tracking-wider font-bold">
                            CLICK TO ZOOM
                          </div>
                        </div>
                      </button>

                      {/* Computer-Vision Reference Photo Audit */}
                      <div className="mt-4">
                        {auditReports[selectedGem.id] ? (
                          <div className={`p-4 sm:p-5 rounded-xl border ${auditReports[selectedGem.id].verified ? 'bg-emerald-950/20 border-emerald-500/30' : 'bg-amber-950/20 border-amber-500/30'} text-sm relative overflow-hidden`}>
                            {/* Subtle side glow */}
                            <div className={`absolute top-0 right-0 w-24 h-24 rounded-full blur-2xl opacity-10 ${auditReports[selectedGem.id].verified ? 'bg-emerald-400' : 'bg-amber-400'}`} />
                            
                            <div className="flex items-center justify-between mb-3">
                              <span className="font-mono text-xs uppercase tracking-wider text-white/50 font-bold">AI Specimen Audit Status</span>
                              <span className={`px-2.5 py-1 rounded text-xs font-mono font-black tracking-wider ${auditReports[selectedGem.id].verified ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'}`}>
                                {auditReports[selectedGem.id].verdict}
                              </span>
                            </div>
                            
                            <div className="flex items-center gap-2.5 mb-3">
                              <div className="text-base font-mono font-bold text-white bg-white/10 border border-white/20 px-2.5 py-1 rounded">{auditReports[selectedGem.id].confidence}%</div>
                              <div className="text-xs sm:text-sm text-white/60 font-medium">AI computer-vision match rating: <strong className="text-[#D4AF37] font-bold">{auditReports[selectedGem.id].rating}</strong></div>
                            </div>
                            
                            <p className="text-white/95 italic text-sm sm:text-base leading-relaxed font-serif border-t border-white/10 pt-3 mt-3">
                              "{auditReports[selectedGem.id].critique}"
                            </p>
                            
                            <button
                              type="button"
                              onClick={() => runSpecimenAudit(selectedGem.id)}
                              disabled={auditLoading[selectedGem.id]}
                              className="mt-4 w-full bg-black/40 hover:bg-[#D4AF37]/10 hover:text-white text-xs sm:text-sm font-mono font-bold uppercase tracking-wider text-[#D4AF37] border border-white/10 py-3 rounded-lg flex items-center justify-center gap-2 transition-all"
                            >
                              <RefreshCw className={`w-4 h-4 ${auditLoading[selectedGem.id] ? "animate-spin" : ""}`} />
                              Re-Audit Specimen Image
                            </button>
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={() => runSpecimenAudit(selectedGem.id)}
                            disabled={auditLoading[selectedGem.id]}
                            className="w-full bg-black hover:bg-white/5 text-xs sm:text-sm font-black uppercase tracking-wider text-[#D4AF37] hover:text-[#FFF2B2] py-3.5 rounded-xl border border-[#D4AF37]/30 hover:border-[#D4AF37]/60 flex items-center justify-center gap-2 transition-all shadow-md active:scale-95"
                          >
                            <Cpu className={`w-4 h-4 ${auditLoading[selectedGem.id] ? "animate-spin" : "text-[#D4AF37]"}`} />
                            {auditLoading[selectedGem.id] ? "Auditing Specimen Photo..." : "AI Computer-Vision Audit"}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
 
                  {/* Scientific Properties Grid */}
                  <div>
                    <h4 className="text-xs sm:text-sm font-black text-[#D4AF37] uppercase tracking-wider mb-4">Physical & Optical Reference standards</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      
                      <div className="bg-black/40 p-5 rounded-xl border border-white/5 flex flex-col justify-between">
                        <div>
                          <span className="text-xs sm:text-sm font-bold text-white/50 uppercase tracking-wider">Refractive Index (RI)</span>
                          <p className="text-base sm:text-lg font-bold text-white mt-1.5 font-mono">{selectedGem.refractiveIndex}</p>
                        </div>
                        <span className="text-xs text-white/40 mt-2 block leading-tight font-medium">Standard refractometer measurement limit.</span>
                      </div>

                      <div className="bg-black/40 p-5 rounded-xl border border-white/5 flex flex-col justify-between">
                        <div>
                          <span className="text-xs sm:text-sm font-bold text-white/50 uppercase tracking-wider">Specific Gravity (SG)</span>
                          <p className="text-base sm:text-lg font-bold text-white mt-1.5 font-mono">{selectedGem.specificGravity}</p>
                        </div>
                        <span className="text-xs text-white/40 mt-2 block leading-tight font-medium">Hydrostatic balance density benchmark.</span>
                      </div>

                      <div className="bg-black/40 p-5 rounded-xl border border-white/5 flex flex-col justify-between">
                        <div>
                          <span className="text-xs sm:text-sm font-bold text-white/50 uppercase tracking-wider">Optic Character</span>
                          <p className="text-base sm:text-lg font-bold text-white mt-1.5 font-sans">{selectedGem.opticCharacter}</p>
                        </div>
                        <span className="text-xs text-white/40 mt-2 block leading-tight font-medium">Polariscope pattern diagnosis.</span>
                      </div>

                      <div className="bg-black/40 p-5 rounded-xl border border-white/5 flex flex-col justify-between">
                        <div>
                          <span className="text-xs sm:text-sm font-bold text-white/50 uppercase tracking-wider">Birefringence Range</span>
                          <p className="text-base sm:text-lg font-bold text-white mt-1.5 font-mono">{selectedGem.birefringence}</p>
                        </div>
                        <span className="text-xs text-white/40 mt-2 block leading-tight font-medium">Calculated maximum optical axis deviation.</span>
                      </div>

                      <div className="bg-black/40 p-5 rounded-xl border border-white/5 flex flex-col justify-between col-span-1 md:col-span-2">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <span className="text-xs sm:text-sm font-bold text-white/50 uppercase tracking-wider">Luster</span>
                            <p className="text-sm sm:text-base font-bold text-[#D4AF37] mt-1">{selectedGem.luster}</p>
                          </div>
                          <div>
                            <span className="text-xs sm:text-sm font-bold text-white/50 uppercase tracking-wider">Cleavage</span>
                            <p className="text-sm sm:text-base font-bold text-white mt-1">{selectedGem.cleavage}</p>
                          </div>
                        </div>
                        <span className="text-xs text-white/40 mt-2 block leading-tight font-medium">Crystallographic cleavage planes & reflective surface property.</span>
                      </div>

                    </div>
                  </div>

                  {/* Microscopic Inclusions */}
                  <div className="bg-black/60 p-6 sm:p-8 rounded-2xl border border-white/5">
                    <div className="flex items-center gap-3 mb-3.5">
                      <Fingerprint className="w-6 h-6 text-[#D4AF37]" />
                      <h4 className="text-sm sm:text-base font-black text-white uppercase tracking-wider">Diagnostic Microscopic Inclusions (Standard Reference)</h4>
                    </div>
                    <p className="text-xs sm:text-sm text-white/60 mb-5 leading-relaxed font-medium">Geological markers trapped inside the crystalline lattice. These inclusions confirm natural igneous/metamorphic growth rather than industrial synthesis.</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                      {selectedGem.diagnosticInclusions.map((incl, idx) => (
                        <div key={idx} className="flex items-start gap-3 bg-black/40 p-4 rounded-xl border border-white/5">
                          <CheckCircle2 className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
                          <span className="text-xs sm:text-sm text-white/90 font-bold leading-normal">{incl}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* UV Fluorescence */}
                  <div className="bg-[#D4AF37]/5 p-6 sm:p-8 rounded-2xl border border-[#D4AF37]/10">
                    <div className="flex items-center gap-3 mb-3">
                      <Zap className="w-6 h-6 text-[#D4AF37]" />
                      <h4 className="text-sm sm:text-base font-black text-white uppercase tracking-wider">UV Spectroscopic Fluorescence</h4>
                    </div>
                    <p className="text-xs sm:text-sm text-[#FFF2B2] font-mono bg-black/50 border border-white/10 px-5 py-4 rounded-xl leading-relaxed font-bold">{selectedGem.fluorescentReaction}</p>
                  </div>

                  {/* Gemstone Separation Worksheet */}
                  <div className="bg-black/60 p-6 sm:p-8 rounded-2xl border border-[#D4AF37]/20 relative overflow-hidden">
                    {/* Elegant decorative top-right tag */}
                    <div className="absolute top-0 right-0 bg-[#D4AF37]/10 border-b border-l border-[#D4AF37]/30 text-[#D4AF37] font-mono text-[10px] uppercase tracking-widest px-4 py-1.5 rounded-bl-xl font-bold">
                      Separation Worksheet
                    </div>
                    
                    <div className="flex items-center gap-3 mb-4">
                      <Split className="w-6 h-6 text-[#D4AF37]" />
                      <h4 className="text-sm sm:text-base font-black text-white uppercase tracking-wider">Gemological Separation Guides</h4>
                    </div>
                    
                    <p className="text-sm sm:text-base text-white/60 mb-5 leading-relaxed font-medium">
                      Distinguishing genuine {selectedGem.name} from common natural look-alikes, treated materials, and synthetic simulants using standard optical, hydrostatic, and spectroscopic methods.
                    </p>

                    {/* Display commonly mistaken list */}
                    <div className="flex flex-wrap items-center gap-3 mb-6 pb-5 border-b border-white/10">
                      <span className="text-xs sm:text-sm font-mono text-white/50 uppercase tracking-wider font-bold">Common Look-Alikes:</span>
                      {selectedGem.commonlyMistaken?.map((sim, i) => (
                        <span key={i} className="text-xs sm:text-sm bg-white/10 border border-white/25 text-[#D4AF37] px-3.5 py-1.5 rounded-xl font-bold">
                          {sim}
                        </span>
                      ))}
                    </div>

                    {/* List display of separation guides */}
                    <div className="space-y-5">
                      {selectedGem.separationGuide?.map((guide, idx) => (
                        <div key={idx} className="bg-black/50 border border-white/10 rounded-2xl overflow-hidden">
                          {/* Simulant header */}
                          <div className="bg-white/5 px-5 py-3.5 border-b border-white/10 flex justify-between items-center">
                            <span className="text-sm sm:text-base font-black text-white font-serif">{selectedGem.name} <span className="text-white/50 font-sans font-normal mx-2">vs.</span> {guide.simulant}</span>
                            <span className="text-xs font-mono font-bold text-[#D4AF37] bg-[#D4AF37]/10 px-3 py-1 rounded border border-[#D4AF37]/35 uppercase tracking-wider">Diagnostic Key</span>
                          </div>
                          {/* Properties table or list */}
                          <div className="p-5 space-y-4">
                            {guide.properties.map((prop, pIdx) => (
                              <div key={pIdx} className="grid grid-cols-1 md:grid-cols-4 gap-3 pb-3 last:pb-0 last:border-b-0 border-b border-white/10">
                                <div className="md:col-span-1 flex items-center gap-2">
                                  <div className="w-2 h-2 rounded-full bg-[#D4AF37]"></div>
                                  <span className="text-xs font-mono font-bold text-[#D4AF37] uppercase tracking-wider">{prop.property}</span>
                                </div>
                                <div className="md:col-span-3 text-xs sm:text-sm text-white/90 font-medium leading-relaxed pl-3 md:pl-0 border-l md:border-l-0 border-white/15 md:border-transparent">
                                  {prop.diagnosticDifference}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* High Quality Authentication Tips */}
                  <div className="bg-black/50 p-6 sm:p-8 rounded-2xl border border-white/5">
                    <div className="flex items-center gap-3 mb-4">
                      <ShieldAlert className="w-6 h-6 text-red-500 animate-pulse" />
                      <h4 className="text-sm sm:text-base font-black text-white uppercase tracking-wider">Verification & Anti-Counterfeiting Checklist</h4>
                    </div>
                    <div className="bg-black/80 border border-white/10 p-5 sm:p-6 rounded-2xl">
                      <div className="text-sm sm:text-base text-white/95 leading-relaxed font-sans font-medium whitespace-pre-line">
                        {selectedGem.authenticationTips}
                      </div>
                    </div>
                  </div>

                </div>

                {/* Footer status bar */}
                <div className="bg-black border-t border-white/10 px-6 sm:px-8 py-5 flex flex-col sm:flex-row justify-between items-center gap-4">
                  <span className="text-xs text-white/40 font-mono tracking-wider">GEO-CERT REGISTERED LAB DATA-ID: LAB-{selectedGem.id.toUpperCase()}</span>
                  <button 
                    onClick={() => {
                      setVerifyName(selectedGem.name);
                      const uniqueSims = Array.from(new Set([
                        `Synthetic ${selectedGem.name} (Verneuil flame-fusion, flux-grown, hydrothermal)`,
                        ...selectedGem.separationGuide.map(s => s.simulant),
                        ...selectedGem.commonlyMistaken
                      ])).join(", ");
                      setVerifySimulants(uniqueSims);
                      setActiveTab("verify");
                    }}
                    className="text-xs sm:text-sm font-black text-black bg-[#D4AF37] hover:bg-[#FFF2B2] px-6 py-3 rounded-xl transition-all uppercase tracking-wider hover:scale-[1.02] active:scale-95 shadow-lg"
                  >
                    Build Protocol for {selectedGem.name} →
                  </button>
                </div>

              </div>

            </div>

          </div>
        )}

        {/* ==================== TAB 2: AI PHOTO IDENTIFIER (MULTIMODAL SPECIMEN CAM) ==================== */}
        {activeTab === "photo" && (
          <div className="max-w-4xl mx-auto space-y-8">
            
            <div className="bg-[#0A0A0A] rounded-2xl border border-white/5 p-6 sm:p-8 shadow-xl relative">
              {/* Decorative brackets */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-[#D4AF37]/50"></div>
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-[#D4AF37]/50"></div>

              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-[#D4AF37]/10 rounded-xl text-[#D4AF37] border border-[#D4AF37]/20">
                  <Camera className="w-7 h-7" />
                </div>
                <div>
                  <h2 className="text-3xl sm:text-4xl font-serif font-black text-white tracking-wide">Gemstone Photo-Spectrum Analyzer</h2>
                  <p className="text-sm sm:text-base text-white/60 mt-1.5">Capture or upload high-resolution gemstone images. Expert-trained Gemini Vision evaluates color, luster, facets, and diagnostic mineral properties.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start pt-2">
                
                {/* Camera / Viewfinder Workspace (5 cols) */}
                <div className="md:col-span-5 flex flex-col gap-4">
                  
                  <span className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-widest block">Laboratory Viewfinder</span>
                  
                  {/* Viewfinder frame */}
                  <div 
                    ref={viewfinderRef}
                    onMouseDown={handleCaliperMouseDown}
                    onMouseMove={handleCaliperMouseMove}
                    onMouseUp={handleCaliperMouseUp}
                    onMouseLeave={handleCaliperMouseUp}
                    onTouchStart={handleCaliperTouchStart}
                    onTouchMove={handleCaliperTouchMove}
                    onTouchEnd={handleCaliperMouseUp}
                    className={`relative aspect-square bg-black rounded-2xl overflow-hidden border border-white/10 flex items-center justify-center group shadow-inner ${
                      measuringActive
                        ? "cursor-crosshair select-none touch-none overscroll-none ring-2 ring-[#D4AF37]/40"
                        : caliperActive && caliperDragMode !== "none"
                          ? "cursor-crosshair select-none"
                          : ""
                    }`}
                    style={measuringActive ? { touchAction: "none", WebkitUserSelect: "none", userSelect: "none" } : undefined}
                  >
                    
                    {/* Viewfinder Overlay Elements */}
                    <div className="absolute inset-0 border-[12px] border-black/35 pointer-events-none z-10"></div>
                    <div className="absolute inset-x-8 top-1/2 -translate-y-1/2 border-t border-white/10 border-dashed pointer-events-none z-10"></div>
                    <div className="absolute inset-y-8 left-1/2 -translate-x-1/2 border-l border-white/10 border-dashed pointer-events-none z-10"></div>
                    <div className="absolute w-12 h-12 border border-dashed border-[#D4AF37]/40 rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10"></div>
                    
                    {/* Scanline Animation */}
                    {isAnalyzingPhoto && (
                      <div className="absolute inset-x-0 h-0.5 bg-[#D4AF37] shadow-[0_0_8px_#D4AF37] top-0 animate-[bounce_3s_infinite] z-20 pointer-events-none"></div>
                    )}

                    {/* Camera Video Feed */}
                    {cameraActive && !imageSrc && (
                      <video 
                        ref={videoRef} 
                        playsInline 
                        muted 
                        className="w-full h-full object-cover"
                      />
                    )}

                    {/* Captured/Uploaded Image Preview */}
                    {imageSrc && (
                      <img 
                        src={imageSrc} 
                        alt="Gemstone specimen" 
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    )}

                    {/* SVG overlay for custom drawing/measuring */}
                    {caliperActive && (
                      <svg className="absolute inset-0 w-full h-full pointer-events-none z-40">
                        {/* Length Line */}
                        {lengthDragStart && lengthDragEnd && (
                          <g>
                            <line
                              x1={lengthDragStart.x}
                              y1={lengthDragStart.y}
                              x2={lengthDragEnd.x}
                              y2={lengthDragEnd.y}
                              stroke="#D4AF37"
                              strokeWidth="3"
                              strokeDasharray="4 2"
                            />
                            {/* End ticks */}
                            <circle cx={lengthDragStart.x} cy={lengthDragStart.y} r="5" fill="#D4AF37" />
                            <circle cx={lengthDragEnd.x} cy={lengthDragEnd.y} r="5" fill="#D4AF37" />
                            {/* Label */}
                            <g transform={`translate(${(lengthDragStart.x + lengthDragEnd.x) / 2}, ${(lengthDragStart.y + lengthDragEnd.y) / 2 - 14})`}>
                              <rect x="-35" y="-10" width="70" height="18" rx="4" fill="black" stroke="#D4AF37" strokeWidth="1" />
                              <text x="0" y="2" fill="#D4AF37" fontSize="9" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                                L: {((Math.sqrt((lengthDragStart.x - lengthDragEnd.x)**2 + (lengthDragStart.y - lengthDragEnd.y)**2)) / caliperCalibration).toFixed(2)}mm
                              </text>
                            </g>
                          </g>
                        )}

                        {/* Width Line */}
                        {widthDragStart && widthDragEnd && (
                          <g>
                            <line
                              x1={widthDragStart.x}
                              y1={widthDragStart.y}
                              x2={widthDragEnd.x}
                              y2={widthDragEnd.y}
                              stroke="#38BDF8"
                              strokeWidth="3"
                              strokeDasharray="4 2"
                            />
                            {/* End ticks */}
                            <circle cx={widthDragStart.x} cy={widthDragStart.y} r="5" fill="#38BDF8" />
                            <circle cx={widthDragEnd.x} cy={widthDragEnd.y} r="5" fill="#38BDF8" />
                            {/* Label */}
                            <g transform={`translate(${(widthDragStart.x + widthDragEnd.x) / 2}, ${(widthDragStart.y + widthDragEnd.y) / 2 - 14})`}>
                              <rect x="-35" y="-10" width="70" height="18" rx="4" fill="black" stroke="#38BDF8" strokeWidth="1" />
                              <text x="0" y="2" fill="#38BDF8" fontSize="9" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                                W: {((Math.sqrt((widthDragStart.x - widthDragEnd.x)**2 + (widthDragStart.y - widthDragEnd.y)**2)) / caliperCalibration).toFixed(2)}mm
                              </text>
                            </g>
                          </g>
                        )}

                        {/* Ring Shank Calibration Line */}
                        {shankDragStart && shankDragEnd && (
                          <g>
                            <line
                              x1={shankDragStart.x}
                              y1={shankDragStart.y}
                              x2={shankDragEnd.x}
                              y2={shankDragEnd.y}
                              stroke="#10B981"
                              strokeWidth="3.5"
                              strokeDasharray="5 3"
                            />
                            {/* End ticks */}
                            <circle cx={shankDragStart.x} cy={shankDragStart.y} r="6" fill="#10B981" />
                            <circle cx={shankDragEnd.x} cy={shankDragEnd.y} r="6" fill="#10B981" />
                            {/* Label */}
                            <g transform={`translate(${(shankDragStart.x + shankDragEnd.x) / 2}, ${(shankDragStart.y + shankDragEnd.y) / 2 - 14})`}>
                              <rect x="-65" y="-10" width="130" height="18" rx="4" fill="black" stroke="#10B981" strokeWidth="1" />
                              <text x="0" y="2" fill="#10B981" fontSize="9" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                                💍 US Size 7 Shank (17.35mm)
                              </text>
                            </g>
                          </g>
                        )}
                      </svg>
                    )}

                    {/* Interactive Caliper Overlay (Lab Scale) - Only show when in Box mode */}
                    {caliperActive && imageSrc && caliperDragMode === 'none' && (
                      <div 
                        className="absolute border-2 border-dashed border-[#D4AF37] pointer-events-none z-30 transition-all duration-75"
                        style={{
                          width: `${caliperWidthPx}px`,
                          height: `${caliperHeightPx}px`,
                          transform: `translate(${caliperOffsetX}px, ${caliperOffsetY}px)`,
                          backgroundColor: "rgba(212, 175, 55, 0.08)",
                          boxShadow: "0 0 15px rgba(212, 175, 55, 0.4)",
                          borderRadius: calcCutShape === "round" || calcCutShape === "oval" ? "50%" : calcCutShape === "pear" ? "50% 50% 50% 15%" : "8px"
                        }}
                      >
                        {/* Center Crosshair */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-4 h-[1px] bg-[#D4AF37]/60"></div>
                          <div className="h-4 w-[1px] bg-[#D4AF37]/60"></div>
                        </div>
                        {/* Brackets */}
                        <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#D4AF37]"></div>
                        <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#D4AF37]"></div>
                        <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#D4AF37]"></div>
                        <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#D4AF37]"></div>

                        {/* Real-time scaled readings */}
                        <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-black/95 text-[10px] text-[#D4AF37] px-2 py-0.5 rounded-md font-mono font-bold border border-[#D4AF37]/30 whitespace-nowrap shadow-md">
                          L: {(caliperWidthPx / caliperCalibration).toFixed(2)} mm
                        </div>
                        <div className="absolute -right-20 top-1/2 -translate-y-1/2 bg-black/95 text-[10px] text-[#D4AF37] px-2 py-0.5 rounded-md font-mono font-bold border border-[#D4AF37]/30 whitespace-nowrap shadow-md">
                          W: {(caliperHeightPx / caliperCalibration).toFixed(2)} mm
                        </div>
                      </div>
                    )}

                    {/* Initial State (Placeholder) */}
                    {!cameraActive && !imageSrc && (
                      <div className="text-center p-8 flex flex-col items-center gap-4 text-white/40">
                        <Gem className="w-14 h-14 text-[#D4AF37]/45 animate-pulse" />
                        <div>
                          <p className="text-sm sm:text-base font-black text-white/90">Awaiting Specimen Photo</p>
                          <p className="text-xs sm:text-sm text-white/50 mt-1.5 max-w-[220px] mx-auto leading-relaxed">Activate live camera feed or upload an image file to trigger analysis.</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Camera Controls */}
                  <div className="flex flex-col gap-3">
                    
                    <div className="flex gap-3">
                      {cameraActive ? (
                        <>
                          <button
                            type="button"
                            onClick={capturePhoto}
                            className="flex-1 bg-emerald-500 hover:bg-emerald-400 text-black py-3.5 px-4 rounded-xl text-xs sm:text-sm font-black uppercase tracking-wider flex items-center justify-center gap-2 shadow-md active:scale-95 transition-transform"
                          >
                            <Check className="w-5 h-5" />
                            Capture Specimen
                          </button>
                          <button
                            type="button"
                            onClick={stopCamera}
                            className="bg-black hover:bg-white/5 border border-white/10 text-white/70 px-4 py-3.5 rounded-xl text-xs sm:text-sm font-bold active:scale-95 transition-transform"
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <button
                          type="button"
                          onClick={startCamera}
                          className="flex-1 bg-black hover:bg-white/5 border border-white/15 text-[#D4AF37] py-3.5 px-4 rounded-xl text-xs sm:text-sm font-black uppercase tracking-wider flex items-center justify-center gap-2 active:scale-95 transition-transform"
                        >
                          <Camera className="w-5 h-5" />
                          Activate Camera Feed
                        </button>
                      )}
                    </div>

                    <div className="relative">
                      <input
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="w-full bg-white/5 hover:bg-white/10 border border-white/10 text-white py-3.5 rounded-xl text-xs sm:text-sm font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-all active:scale-95"
                      >
                        <Upload className="w-5 h-5 text-white/70" />
                        Upload High-Res File
                      </button>
                    </div>

                  </div>

                </div>

                {/* Analytical Inputs & Submission (7 cols) */}
                <div className="md:col-span-7 space-y-5">
                  <div>
                    <label className="block text-xs sm:text-sm font-black text-[#D4AF37] uppercase tracking-wider mb-2">Visual Observation Notes (Optional)</label>
                    <textarea
                      rows={3}
                      placeholder="e.g., Intense purple color, under magnification shows fine internal silk webs and bubbles. Found in alluvial deposits in Sri Lanka."
                      value={technicianNotes}
                      onChange={(e) => setTechnicianNotes(e.target.value)}
                      className="w-full bg-black border border-white/10 rounded-xl p-4 text-sm sm:text-base text-white focus:outline-hidden focus:border-[#D4AF37]/50 focus:bg-white/5 transition-all placeholder:text-white/30 font-medium"
                    />
                  </div>

                  <div className="bg-black/40 border border-white/10 p-5 rounded-2xl space-y-3">
                    <h5 className="text-xs sm:text-sm font-black text-[#D4AF37] uppercase tracking-wider">Multi-Spectral Diagnosis Engine</h5>
                    <p className="text-xs sm:text-sm text-white/60 leading-relaxed font-medium">The embedded AI vision processor evaluates mineral structural indicators, transparency, crystal facet symmetry, and chromatic hues based on official laboratory catalog matrices.</p>
                  </div>

                  <button
                    type="button"
                    onClick={analyzeGemstonePhoto}
                    disabled={isAnalyzingPhoto || !imageSrc}
                    className="w-full bg-[#D4AF37] hover:bg-[#FFF2B2] disabled:bg-white/10 disabled:text-white/20 text-black py-4 px-5 rounded-xl text-xs sm:text-sm font-black uppercase tracking-widest transition-all shadow-md flex items-center justify-center gap-2.5 active:scale-95"
                  >
                    {isAnalyzingPhoto ? (
                      <>
                        <RefreshCw className="w-5 h-5 animate-spin" />
                        Analyzing Facet Refractions...
                      </>
                    ) : (
                      <>
                        <Cpu className="w-5 h-5" />
                        Run AI Photo Assessment
                      </>
                    )}
                  </button>

                  {imageSrc && (
                    <button
                      type="button"
                      onClick={() => {
                        setImageSrc(null);
                        setPhotoReport(null);
                        setTechnicianNotes("");
                      }}
                      className="w-full text-center text-xs sm:text-sm font-bold text-red-400 hover:text-red-300 hover:underline py-1"
                    >
                      Reset Specimen Workspace
                    </button>
                  )}
                </div>

              </div>

            </div>

            {/* ==================== DIGITAL CALIPER & CARAT ESTIMATOR WORKBENCH ==================== */}
            <div className="bg-[#0A0A0A] rounded-2xl border border-white/5 p-6 sm:p-8 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-[#D4AF37]/50"></div>
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-[#D4AF37]/50"></div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-5 mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-[#D4AF37]/10 rounded-lg text-[#D4AF37] border border-[#D4AF37]/20">
                    <Ruler className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xl font-serif text-white tracking-wide">Digital Caliper & Carat Weight Estimator</h3>
                    <p className="text-[10px] text-white/40 mt-0.5">Use on-screen visual calipers or manually input precise dimensions to calculate weight from library formulas.</p>
                  </div>
                </div>

                {/* Import AI Estimated Proportions if available */}
                {aiEstimatedProportions && (
                  <button
                    type="button"
                    onClick={applyAiEstimatedProportions}
                    className="flex items-center gap-2 px-3.5 py-2 bg-[#D4AF37]/10 hover:bg-[#D4AF37]/30 border border-[#D4AF37]/30 text-[#D4AF37] text-[10px] font-extrabold rounded-xl transition-all uppercase tracking-wider shadow-lg animate-pulse"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    Apply AI Proportions ({aiEstimatedProportions.shape})
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                
                {/* Left Side: Formula Configuration & Inputs (7 cols) */}
                <div className="md:col-span-7 space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    
                    {/* Gemstone Variety Selection */}
                    <div>
                      <label className="block text-[10px] font-bold text-[#D4AF37] uppercase tracking-widest mb-1.5 opacity-80">Mineral Species / Specific Gravity</label>
                      <select
                        value={calcGemType}
                        onChange={(e) => handleGemTypeChange(e.target.value)}
                        className="w-full bg-black border border-white/10 rounded-lg p-2.5 text-xs text-white/80 focus:outline-hidden focus:border-[#D4AF37]/50"
                      >
                        <option value="diamond">Diamond (SG 3.52)</option>
                        <option value="ruby">Ruby (Corundum, SG 4.00)</option>
                        <option value="sapphire">Blue Sapphire (Corundum, SG 4.00)</option>
                        <option value="emerald">Emerald (Beryl, SG 2.72)</option>
                        <option value="aquamarine">Aquamarine (Beryl, SG 2.68)</option>
                        <option value="alexandrite">Alexandrite (Chrysoberyl, SG 3.73)</option>
                        <option value="tanzanite">Tanzanite (Zoisite, SG 3.35)</option>
                        <option value="spinel">Spinel (Spinel, SG 3.60)</option>
                        <option value="topaz">Topaz (Topaz, SG 3.53)</option>
                        <option value="quartz">Quartz (Amethyst/Citrine, SG 2.65)</option>
                        <option value="garnet_almandine">Almandine Garnet (SG 4.05)</option>
                        <option value="garnet_spessartine">Spessartine Garnet (SG 4.15)</option>
                        <option value="tourmaline">Tourmaline (SG 3.06)</option>
                        <option value="zircon">Zircon (SG 4.69)</option>
                        <option value="peridot">Peridot (SG 3.34)</option>
                        <option value="custom">Custom / Other Mineral...</option>
                      </select>
                    </div>

                    {/* Specific Gravity Value */}
                    <div>
                      <label className="block text-[10px] font-bold text-[#D4AF37] uppercase tracking-widest mb-1.5 opacity-80">Specific Gravity (SG)</label>
                      <input
                        type="number"
                        step="0.01"
                        min="0.1"
                        max="10"
                        value={calcSG}
                        onChange={(e) => {
                          setCalcGemType("custom");
                          setCalcSG(e.target.value);
                        }}
                        className="w-full bg-black border border-white/10 rounded-lg p-2.5 text-xs text-white focus:outline-hidden focus:border-[#D4AF37]/50"
                      />
                    </div>

                    {/* Cut/Shape Selection */}
                    <div>
                      <label className="block text-[10px] font-bold text-[#D4AF37] uppercase tracking-widest mb-1.5 opacity-80">Standard Cut / Shape</label>
                      <select
                        value={calcCutShape}
                        onChange={(e) => setCalcCutShape(e.target.value)}
                        className="w-full bg-black border border-white/10 rounded-lg p-2.5 text-xs text-white/80 focus:outline-hidden focus:border-[#D4AF37]/50"
                      >
                        {CUT_SHAPE_OPTIONS.map((opt) => (
                          <option key={opt.id} value={opt.id}>{opt.label}</option>
                        ))}
                      </select>
                    </div>

                    {/* Depth mode: estimated (depth %) vs measured */}
                    <div>
                      <label className="block text-[10px] font-bold text-[#D4AF37] uppercase tracking-widest mb-1.5 opacity-80">Depth source</label>
                      <div className="grid grid-cols-2 gap-1.5">
                        <button
                          type="button"
                          onClick={() => setDepthMode("estimated")}
                          className={`py-2 rounded-lg text-[10px] font-bold uppercase border transition-all ${
                            depthMode === "estimated"
                              ? "bg-[#D4AF37]/20 border-[#D4AF37] text-[#D4AF37]"
                              : "bg-black border-white/10 text-white/60"
                          }`}
                        >
                          Est. from shape
                        </button>
                        <button
                          type="button"
                          onClick={() => setDepthMode("measured")}
                          className={`py-2 rounded-lg text-[10px] font-bold uppercase border transition-all ${
                            depthMode === "measured"
                              ? "bg-[#D4AF37]/20 border-[#D4AF37] text-[#D4AF37]"
                              : "bg-black border-white/10 text-white/60"
                          }`}
                        >
                          Measured
                        </button>
                      </div>
                    </div>

                    {depthMode === "estimated" && (
                      <div className="sm:col-span-2">
                        <label className="block text-[10px] font-bold text-[#D4AF37] uppercase tracking-widest mb-1.5 opacity-80">
                          Cut profile (depth %) — {depthPercentFor(cutShapeId, depthProfile)}% → {calcDepth} mm
                        </label>
                        <div className="grid grid-cols-3 gap-1.5">
                          {(["shallow", "average", "deep"] as DepthProfile[]).map((p) => (
                            <button
                              key={p}
                              type="button"
                              onClick={() => setDepthProfile(p)}
                              className={`py-2 rounded-lg text-[10px] font-bold uppercase border transition-all ${
                                depthProfile === p
                                  ? "bg-[#D4AF37]/20 border-[#D4AF37] text-[#D4AF37]"
                                  : "bg-black border-white/10 text-white/60"
                              }`}
                            >
                              {p} ({depthPercentFor(cutShapeId, p)}%)
                            </button>
                          ))}
                        </div>
                        <p className="mt-1.5 text-[9px] text-white/40 leading-snug">
                          Face-up only: depth ≈ width (or diameter) × typical total depth % for shape. Screening estimate.
                        </p>
                      </div>
                    )}

                    {/* Depth Slider */}
                    <div className={depthMode === "estimated" ? "sm:col-span-2 opacity-80" : ""}>
                      <label className="block text-[10px] font-bold text-[#D4AF37] uppercase tracking-widest mb-1.5 opacity-80">
                        Depth (mm): {calcDepth} mm
                        {depthMode === "estimated" && (
                          <span className="ml-2 text-white/40 normal-case tracking-normal font-medium">
                            (auto from {depthPercentFor(cutShapeId, depthProfile)}%)
                          </span>
                        )}
                      </label>
                      <input
                        type="range"
                        min="0.5"
                        max="15.0"
                        step="0.1"
                        value={calcDepth}
                        disabled={depthMode === "estimated"}
                        onChange={(e) => {
                          setDepthMode("measured");
                          setCalcDepth(parseFloat(e.target.value));
                        }}
                        className="w-full accent-[#D4AF37] bg-black border border-white/10 rounded-lg h-8 disabled:opacity-40"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-[10px] font-bold text-[#D4AF37] uppercase tracking-widest mb-1.5 opacity-80">
                        Girdle / bulge correction: +{weightCorrectionPct}%
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="18"
                        step="1"
                        value={weightCorrectionPct}
                        onChange={(e) => setWeightCorrectionPct(parseInt(e.target.value, 10))}
                        className="w-full accent-[#D4AF37]"
                      />
                      <p className="text-[9px] text-white/40">Weight correction for thick girdle or pavilion bulge (0–18%).</p>
                    </div>

                  </div>

                  {/* Manual Dimension Sliders / Input Fields */}
                  <div className="bg-black/50 p-4 rounded-xl border border-white/5 space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-[11px] font-bold text-white/70 uppercase">Caliper Dimensions (Manual MM override)</span>
                      <div className="flex gap-1">
                        <button
                          type="button"
                          onClick={() => {
                            setCalcLength(6.5);
                            setCalcWidth(6.5);
                            setCalcDepth(3.8);
                          }}
                          className="text-[9px] text-white/40 hover:text-white uppercase font-mono"
                        >
                          Reset Dimensions
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="flex justify-between text-[10px] mb-1">
                          <span className="text-white/50">{calcCutShape === "round" ? "Diameter" : "Length"} (mm)</span>
                          <span className="text-[#D4AF37] font-mono font-bold">{calcLength} mm</span>
                        </div>
                        <input
                          type="range"
                          min="1.0"
                          max="25.0"
                          step="0.1"
                          value={calcLength}
                          onChange={(e) => {
                            const val = parseFloat(e.target.value);
                            setCalcLength(val);
                            if (calcCutShape === "round") {
                              setCalcWidth(val);
                            }
                          }}
                          className="w-full accent-[#D4AF37]"
                        />
                        <input
                          type="number"
                          step="0.01"
                          min="0.1"
                          value={calcLength}
                          onChange={(e) => {
                            const val = parseFloat(e.target.value) || 0;
                            setCalcLength(val);
                            if (calcCutShape === "round") {
                              setCalcWidth(val);
                            }
                          }}
                          className="w-full mt-1.5 bg-black border border-white/10 rounded-md p-1.5 text-xs text-white text-center font-mono"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between text-[10px] mb-1">
                          <span className="text-white/50">Width (mm)</span>
                          <span className="text-[#D4AF37] font-mono font-bold">{calcWidth} mm</span>
                        </div>
                        <input
                          type="range"
                          min="1.0"
                          max="25.0"
                          step="0.1"
                          value={calcWidth}
                          disabled={calcCutShape === "round"}
                          onChange={(e) => setCalcWidth(parseFloat(e.target.value))}
                          className="w-full accent-[#D4AF37] disabled:opacity-30"
                        />
                        <input
                          type="number"
                          step="0.01"
                          min="0.1"
                          value={calcWidth}
                          disabled={calcCutShape === "round"}
                          onChange={(e) => setCalcWidth(parseFloat(e.target.value) || 0)}
                          className="w-full mt-1.5 bg-black border border-white/10 rounded-md p-1.5 text-xs text-white text-center font-mono disabled:opacity-30"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Interactive Caliper Calibration Console (Only shown if imageSrc exists) */}
                  {imageSrc && (
                    <div className="bg-black/80 border border-[#D4AF37]/20 p-4 rounded-xl space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-ping"></span>
                          <span className="text-xs font-bold text-white uppercase tracking-wider">🔬 Interactive Visual Specimen Overlay Caliper</span>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input 
                            type="checkbox" 
                            checked={caliperActive} 
                            onChange={(e) => {
                              const active = e.target.checked;
                              setCaliperActive(active);
                              if (!active) {
                                setCaliperDragMode('none');
                                setLengthDragStart(null);
                                setLengthDragEnd(null);
                                setWidthDragStart(null);
                                setWidthDragEnd(null);
                                setShankDragStart(null);
                                setShankDragEnd(null);
                              }
                            }} 
                            className="sr-only peer" 
                          />
                          <div className="w-9 h-5 bg-white/10 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-gray-300 after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#D4AF37]"></div>
                          <span className="ml-2 text-[10px] text-white/60 font-semibold uppercase font-mono">
                            {caliperActive ? "ACTIVE" : "OFF"}
                          </span>
                        </label>
                      </div>

                      {caliperActive && (
                        <div className="space-y-3 pt-1 border-t border-white/5">
                          <p className="text-[10px] text-white/50 leading-normal">
                            Choose a caliper mode below. Use the traditional adjustable box overlay, click-and-drag directly on the photo to measure Length/Width, or use a <strong>standard US Size 7 ring shank (17.35mm inside diameter) as a real-world scale reference</strong> to automatically calibrate zoom.
                          </p>
                          {measuringActive && (
                            <p className="text-[10px] font-bold text-emerald-400/90 uppercase tracking-wider bg-emerald-500/10 border border-emerald-500/25 rounded-lg px-2.5 py-1.5">
                              Screen locked for measuring — draw on the photo without scrolling
                            </p>
                          )}

                          {/* New drag measurement selector */}
                          <div className="bg-white/5 p-2.5 rounded-lg border border-white/10 space-y-1.5">
                            <span className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-wider block">Measurement Tool Mode</span>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                              <button
                                type="button"
                                onClick={() => {
                                  setCaliperDragMode('none');
                                }}
                                className={`py-1.5 rounded text-[10px] font-bold uppercase transition-all flex items-center justify-center gap-1 ${caliperDragMode === 'none' ? 'bg-[#D4AF37] text-black shadow-md' : 'bg-black text-white/70 hover:bg-white/5 border border-white/10'}`}
                              >
                                📦 Box Caliper
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  setCaliperDragMode('length');
                                }}
                                className={`py-1.5 rounded text-[10px] font-bold uppercase transition-all flex items-center justify-center gap-1 ${caliperDragMode === 'length' ? 'bg-[#D4AF37] text-black shadow-md' : 'bg-black text-white/70 hover:bg-white/5 border border-white/10'}`}
                              >
                                📏 Measure L
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  setCaliperDragMode('width');
                                }}
                                className={`py-1.5 rounded text-[10px] font-bold uppercase transition-all flex items-center justify-center gap-1 ${caliperDragMode === 'width' ? 'bg-sky-400 text-black shadow-md' : 'bg-black text-white/70 hover:bg-white/5 border border-white/10'}`}
                              >
                                📏 Measure W
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  setCaliperDragMode('shank');
                                }}
                                className={`py-1.5 rounded text-[10px] font-bold uppercase transition-all flex items-center justify-center gap-1 ${caliperDragMode === 'shank' ? 'bg-[#10B981] text-black shadow-md' : 'bg-black text-[#10B981]/80 hover:bg-white/5 border border-[#10B981]/20'}`}
                              >
                                💍 Size 7 Shank
                              </button>
                            </div>
                            
                            {caliperDragMode !== 'none' ? (
                              <div className="flex justify-between items-center text-[9px] text-white/50 bg-black/30 p-1.5 rounded border border-white/5">
                                <span>
                                  {caliperDragMode === 'shank' 
                                    ? "👆 Click & drag a line across the ring's inside shank (17.35mm reference)."
                                    : "👆 Click and drag on the specimen photo to measure."}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => {
                                    if (caliperDragMode === 'length') {
                                      setLengthDragStart(null);
                                      setLengthDragEnd(null);
                                    } else if (caliperDragMode === 'width') {
                                      setWidthDragStart(null);
                                      setWidthDragEnd(null);
                                    } else if (caliperDragMode === 'shank') {
                                      setShankDragStart(null);
                                      setShankDragEnd(null);
                                    }
                                  }}
                                  className="text-red-400 font-bold uppercase hover:underline animate-pulse"
                                >
                                  Clear
                                </button>
                              </div>
                            ) : (
                              <p className="text-[9px] text-white/40 italic leading-snug">
                                Drag the sliders below to move and resize the box caliper over the specimen.
                              </p>
                            )}
                          </div>
                          
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-[10px]">
                            
                            {/* Guideline Width & Height */}
                            <div className="space-y-1.5">
                              <span className="text-white/60 block">Caliper Length Bounds (Width in Pixels): <strong>{caliperWidthPx}px</strong></span>
                              <input 
                                type="range" 
                                min="20" 
                                max="320" 
                                value={caliperWidthPx} 
                                onChange={(e) => {
                                  const val = parseInt(e.target.value);
                                  setCaliperWidthPx(val);
                                  if (calcCutShape === "round") {
                                    setCaliperHeightPx(val);
                                  }
                                }} 
                                className="w-full accent-[#D4AF37]" 
                              />
                            </div>

                            <div className="space-y-1.5">
                              <span className="text-white/60 block">Caliper Width Bounds (Height in Pixels): <strong>{caliperHeightPx}px</strong></span>
                              <input 
                                type="range" 
                                min="20" 
                                max="320" 
                                value={caliperHeightPx} 
                                disabled={calcCutShape === "round"}
                                onChange={(e) => setCaliperHeightPx(parseInt(e.target.value))} 
                                className="w-full accent-[#D4AF37] disabled:opacity-30" 
                              />
                            </div>

                            {/* Offset X & Y */}
                            <div className="space-y-1.5">
                              <span className="text-white/60 block">Horizontal Offset (Move Left/Right): <strong>{caliperOffsetX}px</strong></span>
                              <input 
                                type="range" 
                                min="-150" 
                                max="150" 
                                value={caliperOffsetX} 
                                onChange={(e) => setCaliperOffsetX(parseInt(e.target.value))} 
                                className="w-full accent-[#D4AF37]" 
                              />
                            </div>

                            <div className="space-y-1.5">
                              <span className="text-white/60 block">Vertical Offset (Move Up/Down): <strong>{caliperOffsetY}px</strong></span>
                              <input 
                                type="range" 
                                min="-150" 
                                max="150" 
                                value={caliperOffsetY} 
                                onChange={(e) => setCaliperOffsetY(parseInt(e.target.value))} 
                                className="w-full accent-[#D4AF37]" 
                              />
                            </div>

                            {/* Pixel Calibration Ratio */}
                            <div className="sm:col-span-2 space-y-1.5 bg-black/40 p-2.5 rounded-lg border border-white/5">
                              <div className="flex justify-between items-center">
                                <span className="text-white/60 font-semibold uppercase">Pixel Calibration Factor: <strong>{caliperCalibration} px/mm</strong></span>
                                <span className="text-[9px] text-[#D4AF37] font-mono leading-none font-semibold uppercase bg-[#D4AF37]/10 px-1.5 py-0.5 rounded">
                                  1 mm = {caliperCalibration} pixels
                                </span>
                              </div>
                              <input 
                                type="range" 
                                min="5" 
                                max="60" 
                                value={caliperCalibration} 
                                onChange={(e) => setCaliperCalibration(parseInt(e.target.value))} 
                                className="w-full accent-[#D4AF37]" 
                              />
                              <p className="text-[9px] text-white/30 italic">Increase this scale if the gemstone appears smaller relative to the camera focal zoom.</p>
                            </div>

                          </div>

                          <button
                            type="button"
                            onClick={applyCaliperMeasurements}
                            className="w-full mt-2.5 py-2 bg-[#D4AF37] hover:bg-[#FFF2B2] text-black text-[10px] font-extrabold uppercase tracking-widest rounded-lg transition-colors flex items-center justify-center gap-1.5"
                          >
                            <Check className="w-3.5 h-3.5" />
                            Lock Caliper mm Measurements to Calculator
                          </button>
                        </div>
                      )}

                    </div>
                  )}

                </div>

                {/* Right Side: Digital Scales Weight Output Box (5 cols) */}
                <div className="md:col-span-5 bg-black border border-[#D4AF37]/20 rounded-2xl p-6 flex flex-col justify-between h-full min-h-[300px] relative">
                  
                  {/* Decorative circuit lines */}
                  <div className="absolute top-0 right-0 w-16 h-16 border-t border-r border-[#D4AF37]/25 pointer-events-none"></div>
                  <div className="absolute bottom-0 left-0 w-16 h-16 border-b border-l border-[#D4AF37]/25 pointer-events-none"></div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center border-b border-white/5 pb-3">
                      <span className="text-[10px] font-mono tracking-widest text-[#D4AF37] font-bold uppercase">Lab Scale Interface</span>
                      <div className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                        <span className="text-[9px] text-emerald-400 font-mono font-bold uppercase">READY</span>
                      </div>
                    </div>

                    {/* giant digital reading */}
                    <div className="py-6 text-center">
                      <div className="text-[9px] font-mono text-white/40 uppercase tracking-widest">Estimated Carat Weight</div>
                      <div className="text-5xl sm:text-6xl font-light font-mono text-white mt-2 select-all flex items-baseline justify-center gap-1">
                        <span className="text-white">{calculatedCaratWeight.toFixed(3)}</span>
                        <span className="text-[#D4AF37] text-2xl font-normal">ct</span>
                      </div>
                      <div className="text-[10px] text-[#D4AF37] font-mono mt-1 font-semibold uppercase tracking-wider bg-[#D4AF37]/10 py-1 px-3 rounded-full inline-block">
                        {(calculatedCaratWeight * 0.2).toFixed(4)} grams
                      </div>
                      {caratEstimate.depthEstimated && (
                        <p className="mt-3 text-[10px] text-[#D4AF37]/90 font-sans font-medium max-w-xs mx-auto leading-snug">
                          Depth est. {caratEstimate.depthMm} mm · {caratEstimate.depthPercentUsed}% ({depthProfile})
                        </p>
                      )}
                      <p className="mt-2 text-[9px] text-white/35 font-sans max-w-xs mx-auto leading-snug">
                        Screening estimate only — not a laboratory certificate.
                      </p>
                    </div>

                    {/* Formula Specs display */}
                    <div className="bg-black/60 p-4 rounded-xl border border-white/5 space-y-2 font-mono text-[10px] text-white/60">
                      <div className="text-white/40 uppercase text-[9px] font-bold tracking-wider mb-1">Industry dimensional formula</div>
                      <div className="flex justify-between gap-2">
                        <span>Cut constant:</span>
                        <span className="text-white text-right">
                          {caratEstimate.diamondFactor.toFixed(4)} ({caratEstimate.formulaLabel})
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Specific Gravity (SG):</span>
                        <span className="text-[#D4AF37] font-bold">{caratEstimate.sg} ({calcGemType})</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Dimensions:</span>
                        <span className="text-white">{calcLength} × {calcWidth} × {calcDepth} mm</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Depth source:</span>
                        <span className="text-white">
                          {depthMode === "estimated"
                            ? `Est. ${depthPercentFor(cutShapeId, depthProfile)}% face-up`
                            : "Measured"}
                        </span>
                      </div>
                      {weightCorrectionPct > 0 && (
                        <div className="flex justify-between">
                          <span>Girdle/bulge WCF:</span>
                          <span className="text-white">+{weightCorrectionPct}%</span>
                        </div>
                      )}
                      <div className="border-t border-white/5 pt-2 mt-2 font-bold text-[#D4AF37] leading-snug">
                        {calcCutShape === "round" || calcCutShape === "oval" ? (
                          <span>Ø² × Depth × factor × (SG / 3.52)</span>
                        ) : (
                          <span>L × W × Depth × factor × (SG / 3.52)</span>
                        )}
                      </div>
                      <p className="text-[9px] text-white/35 font-sans font-normal normal-case tracking-normal leading-snug pt-1">
                        {caratEstimate.note}
                      </p>
                    </div>

                  </div>

                  <div className="pt-6 border-t border-white/5 text-[9px] text-white/30 leading-normal font-sans">
                    <strong>Notice:</strong> This is a photographic mathematical estimation. Carat weights calculated via dimension formulas assume optimal symmetry, standard facet depth alignments, and a flat/thin girdle. Variations in pavilion bulge or thick girdles may cause actual scale readings to differ.
                  </div>

                </div>

              </div>

            </div>

            {/* Diagnostic Report Output */}
            {photoReport && (
              <div className="bg-black border border-[#D4AF37]/30 text-slate-100 rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
                <div className="absolute right-0 top-0 w-32 h-32 bg-gradient-to-br from-[#D4AF37]/15 to-transparent rounded-full blur-3xl pointer-events-none"></div>
                <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-[#D4AF37]/50"></div>
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-[#D4AF37]/50"></div>

                <div className="flex items-center gap-3 mb-6 text-[#D4AF37] border-b border-white/10 pb-4">
                  <ClipboardList className="w-6 h-6" />
                  <h3 className="font-serif text-lg sm:text-xl font-black tracking-wider uppercase">Visual Diagnostic Certificate & Assessment</h3>
                </div>

                <div className="markdown-report text-sm sm:text-base leading-relaxed space-y-4 text-slate-200 font-medium">
                  <Markdown remarkPlugins={[remarkGfm, remarkMath]} rehypePlugins={[rehypeKatex]}>
                    {photoReport}
                  </Markdown>
                </div>

                {/* Integration helpers */}
                <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4 bg-black/60 -mx-6 -mb-6 sm:-mx-8 sm:-mb-8 p-6">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 bg-[#D4AF37] rounded-full shadow-[0_0_8px_#D4AF37]"></span>
                    <span className="text-xs text-white/50 tracking-wider font-mono font-bold">AUTHORIZED BY NORTHEAST GEMOLOGICAL</span>
                  </div>

                  <div className="flex gap-3 w-full sm:w-auto">
                    <button
                      onClick={() => {
                        setActiveTab("identify");
                        setLabColor(technicianNotes || "Observed from photo");
                      }}
                      className="flex-1 sm:flex-initial text-xs sm:text-sm bg-white/5 hover:bg-white/10 border border-white/15 text-[#D4AF37] font-black px-5 py-3 rounded-xl uppercase tracking-wider transition-colors active:scale-95"
                    >
                      Fill into Diagnostics
                    </button>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(photoReport);
                      }}
                      className="flex-1 sm:flex-initial text-xs sm:text-sm bg-[#D4AF37] hover:bg-[#FFF2B2] text-black font-black px-5 py-3 rounded-xl uppercase tracking-wider transition-all active:scale-95 shadow-md"
                    >
                      Copy Certificate
                    </button>
                  </div>
                </div>

              </div>
            )}

          </div>
        )}

        {/* ==================== TAB 3: AI GEMSTONE MANUAL DIAGNOSTICS ==================== */}
        {activeTab === "identify" && (
          <div className="max-w-4xl mx-auto space-y-6">
            
            <div className="bg-[#0A0A0A] rounded-2xl border border-white/5 p-6 sm:p-8 shadow-xl relative">
              <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-[#D4AF37]/50"></div>
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-[#D4AF37]/50"></div>

              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-[#D4AF37]/10 rounded-xl text-[#D4AF37] border border-[#D4AF37]/20">
                  <Compass className="w-7 h-7" />
                </div>
                <div>
                  <h2 className="text-3xl sm:text-4xl font-serif font-black text-white tracking-wide">AI Gemstone Diagnostic Identifier</h2>
                  <p className="text-sm sm:text-base text-white/60 mt-1.5">Input laboratory readings and physical observations to cross-examine laboratory benchmarks and diagnose the mineral group.</p>
                </div>
              </div>

              <form onSubmit={handleRunIdentification} className="space-y-6 pt-4">
                
                {/* Inputs Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  
                  <div>
                    <label className="block text-sm sm:text-base font-black text-[#D4AF37] uppercase tracking-wider mb-2">Color / Pleochroism</label>
                    <input
                      type="text"
                      placeholder="e.g. Deep bluish green, intense green-blue dichroism"
                      value={labColor}
                      onChange={(e) => setLabColor(e.target.value)}
                      className="w-full bg-black border border-white/10 rounded-xl p-4 text-sm sm:text-base text-white focus:outline-hidden focus:border-[#D4AF37]/50 focus:bg-white/5 transition-colors placeholder:text-white/30 font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-sm sm:text-base font-black text-[#D4AF37] uppercase tracking-wider mb-2">Refractive Index (RI)</label>
                    <input
                      type="text"
                      placeholder="e.g. 1.762 - 1.770 or single spot reading 1.76"
                      value={labRI}
                      onChange={(e) => setLabRI(e.target.value)}
                      className="w-full bg-black border border-white/10 rounded-xl p-4 text-sm sm:text-base text-white focus:outline-hidden focus:border-[#D4AF37]/50 focus:bg-white/5 transition-colors placeholder:text-white/30 font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-sm sm:text-base font-black text-[#D4AF37] uppercase tracking-wider mb-2">Specific Gravity (SG)</label>
                    <input
                      type="text"
                      placeholder="e.g. 4.00, or floating in liquid 3.32"
                      value={labSG}
                      onChange={(e) => setLabSG(e.target.value)}
                      className="w-full bg-black border border-white/10 rounded-xl p-4 text-sm sm:text-base text-white focus:outline-hidden focus:border-[#D4AF37]/50 focus:bg-white/5 transition-colors placeholder:text-white/30 font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-sm sm:text-base font-black text-[#D4AF37] uppercase tracking-wider mb-2">Mohs Hardness</label>
                    <input
                      type="text"
                      placeholder="e.g. Scratches quartz, scratched by sapphire (approx 8)"
                      value={labHardness}
                      onChange={(e) => setLabHardness(e.target.value)}
                      className="w-full bg-black border border-white/10 rounded-xl p-4 text-sm sm:text-base text-white focus:outline-hidden focus:border-[#D4AF37]/50 focus:bg-white/5 transition-colors placeholder:text-white/30 font-medium"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm sm:text-base font-black text-[#D4AF37] uppercase tracking-wider mb-2">Optic Character (Polariscope reaction)</label>
                    <select
                      value={labOpticChar}
                      onChange={(e) => setLabOpticChar(e.target.value)}
                      className="w-full bg-black border border-white/10 rounded-xl p-4 text-sm sm:text-base text-white focus:outline-hidden focus:border-[#D4AF37]/50 focus:bg-white/5 font-medium"
                    >
                      <option value="">-- Choose optic character behavior --</option>
                      <option value="Isotropic / Singly Refractive (Stays dark on rotation)">Isotropic / Singly Refractive (Stays dark on rotation)</option>
                      <option value="Anomalous Double Refraction (Blinks randomly, tattered patterns)">Anomalous Double Refraction (Blinks randomly, tattered patterns)</option>
                      <option value="Doubly Refractive Uniaxial (Blinks 4 times, bull's eye figure)">Doubly Refractive Uniaxial (Blinks 4 times, bull's eye figure)</option>
                      <option value="Doubly Refractive Biaxial (Blinks 4 times, 2 optic axes)">Doubly Refractive Biaxial (Blinks 4 times, 2 optic axes)</option>
                      <option value="Aggregate (Polycrystalline, stays light on rotation)">Aggregate (Polycrystalline, stays light on rotation)</option>
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm sm:text-base font-black text-[#D4AF37] uppercase tracking-wider mb-2">Observed Microscopic Inclusions</label>
                    <textarea
                      rows={3}
                      placeholder="e.g. Hexagonal color zoning, fine thread-like tubes, fingerprint feathers, or flux residues"
                      value={labInclusions}
                      onChange={(e) => setLabInclusions(e.target.value)}
                      className="w-full bg-black border border-white/10 rounded-xl p-4 text-sm sm:text-base text-white focus:outline-hidden focus:border-[#D4AF37]/50 focus:bg-white/5 transition-colors placeholder:text-white/30 font-medium"
                    />
                  </div>

                </div>

                {/* Form Buttons */}
                <div className="flex gap-4 justify-end pt-3">
                  <button
                    type="button"
                    onClick={resetLabForm}
                    className="px-6 py-4 text-xs sm:text-sm font-black uppercase tracking-wider text-white/60 hover:text-white bg-white/5 hover:bg-white/10 rounded-xl transition-all border border-white/10"
                  >
                    Clear Form
                  </button>
                  <button
                    type="submit"
                    disabled={isIdentifying}
                    className="px-8 py-4 text-xs sm:text-sm font-black uppercase tracking-widest text-black bg-[#D4AF37] hover:bg-[#FFF2B2] disabled:bg-white/10 disabled:text-white/30 rounded-xl shadow-md transition-all flex items-center gap-2.5 active:scale-95"
                  >
                    {isIdentifying ? (
                      <>
                        <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                        Consulting Diagnostic Matrix...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-5 h-5" />
                        Run Diagnostic Analysis
                      </>
                    )}
                  </button>
                </div>

              </form>

            </div>

            {/* Diagnostic Report Output */}
            {identificationReport && (
              <div className="bg-black border border-[#D4AF37]/30 text-slate-100 rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-[#D4AF37]/50"></div>
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-[#D4AF37]/50"></div>
                
                <div className="flex items-center gap-3 mb-6 text-[#D4AF37] border-b border-white/10 pb-4">
                  <ClipboardList className="w-6 h-6" />
                  <h3 className="font-serif text-lg sm:text-xl font-black uppercase tracking-wider">Official Diagnostic Identification Report</h3>
                </div>
                
                <div className="markdown-report text-sm sm:text-base leading-relaxed space-y-4 text-slate-200 font-medium">
                  <Markdown remarkPlugins={[remarkGfm, remarkMath]} rehypePlugins={[rehypeKatex]}>
                    {identificationReport}
                  </Markdown>
                </div>

                <div className="mt-8 pt-6 border-t border-white/10 text-xs text-white/50 flex flex-col sm:flex-row justify-between items-center gap-4">
                  <span className="font-mono font-bold tracking-wide uppercase">Authorized by Northeast Gemological Engine</span>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(identificationReport);
                    }}
                    className="text-xs sm:text-sm bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] font-black px-5 py-2.5 rounded-xl uppercase tracking-wider transition-all active:scale-95"
                  >
                    Copy Report Content
                  </button>
                </div>
              </div>
            )}

          </div>
        )}

        {/* ==================== TAB 4: AI AUTHENTICITY PROTOCOL PLANNER ==================== */}
        {activeTab === "verify" && (
          <div className="max-w-4xl mx-auto space-y-6">
            
            <div className="bg-[#0A0A0A] rounded-2xl border border-white/5 p-6 sm:p-8 shadow-xl relative">
              <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-[#D4AF37]/50"></div>
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-[#D4AF37]/50"></div>

              <div className="flex items-center gap-3 mb-2">
                <div className="p-2.5 bg-[#D4AF37]/10 rounded-lg text-[#D4AF37] border border-[#D4AF37]/20">
                  <ShieldAlert className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-serif text-white tracking-wide">Authenticity & Origin Protocol Planner</h2>
                  <p className="text-xs text-white/40 mt-0.5">Formulate high-level laboratory procedures to confidently distinguish your fine minerals from advanced synthetics and clever simulants.</p>
                </div>
              </div>

              <form onSubmit={handleRunVerification} className="space-y-6 pt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  
                  <div>
                    <label className="block text-sm sm:text-base font-black text-[#D4AF37] uppercase tracking-wider mb-2">Alleged Gemstone Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Sapphire, Ruby, Emerald, Alexandrite..."
                      value={verifyName}
                      onChange={(e) => {
                        const val = e.target.value;
                        setVerifyName(val);
                        if (val.trim() === "") {
                          setVerifySimulants("");
                        } else {
                          // Try to find matching gemstone in the database
                          const matchedGem = gemstonesDatabase.find(
                            g => g.name.toLowerCase() === val.trim().toLowerCase()
                          );
                          if (matchedGem) {
                            const uniqueSims = Array.from(new Set([
                              `Synthetic ${matchedGem.name} (Verneuil flame-fusion, flux-grown, hydrothermal)`,
                              ...matchedGem.separationGuide.map(s => s.simulant),
                              ...matchedGem.commonlyMistaken
                            ])).join(", ");
                            setVerifySimulants(uniqueSims);
                          } else {
                            setVerifySimulants(`Synthetic counterparts of ${val}, glass imitations, paste, doublets`);
                          }
                        }
                      }}
                      className="w-full bg-black border border-white/10 rounded-xl p-4 text-sm sm:text-base text-white focus:outline-hidden focus:border-[#D4AF37]/50 focus:bg-white/5 transition-colors placeholder:text-white/30 font-medium"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm sm:text-base font-black text-[#D4AF37] uppercase tracking-wider mb-2">Claimed Origin or Mine (Optional)</label>
                    <input
                      type="text"
                      placeholder="e.g. Colombia (Muzo), Kashmir, Myanmar, Madagascar"
                      value={verifySource}
                      onChange={(e) => setVerifySource(e.target.value)}
                      className="w-full bg-black border border-white/10 rounded-xl p-4 text-sm sm:text-base text-white focus:outline-hidden focus:border-[#D4AF37]/50 focus:bg-white/5 transition-colors placeholder:text-white/30 font-medium"
                    />
                  </div>

                  {verifyName.trim() !== "" && (
                    <div className="md:col-span-2">
                      <label className="block text-sm sm:text-base font-black text-[#D4AF37] uppercase tracking-wider mb-2">Suspected Simulants, Artificial Treatments, or Synthetics to Exclude</label>
                      <input
                        type="text"
                        placeholder="e.g. Synthetic flame-fusion rubies, lead glass fracture filled corundum, dyed glass"
                        value={verifySimulants}
                        onChange={(e) => setVerifySimulants(e.target.value)}
                        className="w-full bg-black border border-white/10 rounded-xl p-4 text-sm sm:text-base text-white focus:outline-hidden focus:border-[#D4AF37]/50 focus:bg-white/5 transition-colors placeholder:text-white/30 font-medium"
                      />
                    </div>
                  )}

                </div>

                <div className="flex gap-4 justify-end pt-3">
                  <button
                    type="submit"
                    disabled={isVerifying}
                    className="px-8 py-4 text-xs sm:text-sm font-black uppercase tracking-widest text-black bg-[#D4AF37] hover:bg-[#FFF2B2] disabled:bg-white/10 disabled:text-white/30 rounded-xl shadow-md transition-all flex items-center gap-2.5 active:scale-95"
                  >
                    {isVerifying ? (
                      <>
                        <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                        Generating Verification Blueprint...
                      </>
                    ) : (
                      <>
                        <FileText className="w-5 h-5" />
                        Generate Verification Protocol
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>

            {/* Verification Blueprint Report Output */}
            {verificationReport && (
              <div className="bg-black border border-[#D4AF37]/30 text-slate-100 rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-[#D4AF37]/50"></div>
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-[#D4AF37]/50"></div>
                
                <div className="flex items-center gap-3 mb-6 text-[#D4AF37] border-b border-white/10 pb-4">
                  <ShieldAlert className="w-6 h-6 text-red-500" />
                  <h3 className="font-serif text-lg sm:text-xl font-black uppercase tracking-wider">Northeast Gemological Authenticity & Origin Verification Protocol</h3>
                </div>

                <div className="markdown-report text-sm sm:text-base leading-relaxed space-y-4 text-slate-200 font-medium">
                  <Markdown remarkPlugins={[remarkGfm, remarkMath]} rehypePlugins={[rehypeKatex]}>
                    {verificationReport}
                  </Markdown>
                </div>

                <div className="mt-8 pt-6 border-t border-white/10 text-xs sm:text-sm text-white/50 flex flex-col sm:flex-row justify-between items-center gap-4">
                  <span className="flex items-center gap-2 text-amber-400 font-bold leading-relaxed">
                    <AlertTriangle className="w-5 h-5 text-[#D4AF37] shrink-0" />
                    Avoid destructive testing (like chemical scratch or thermal tests) without master lab tools.
                  </span>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(verificationReport);
                    }}
                    className="text-xs sm:text-sm bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] font-black px-5 py-2.5 rounded-xl uppercase tracking-wider transition-all active:scale-95 whitespace-nowrap"
                  >
                    Copy Blueprint Data
                  </button>
                </div>
              </div>
            )}

          </div>
        )}

        {/* ==================== TAB 5: LAB CONSULTING Q&A CHAT ==================== */}
        {activeTab === "consult" && (
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
            
            {/* Quick Suggestions (4 cols) */}
            <div className="md:col-span-4 bg-[#0A0A0A] rounded-2xl border border-white/5 p-6 shadow-xl flex flex-col justify-between">
              <div>
                <h3 className="font-serif text-base sm:text-lg text-white font-black tracking-wide border-b border-white/5 pb-3 mb-4">Diagnostic Presets</h3>
                <p className="text-xs sm:text-sm text-white/50 mb-5 leading-relaxed font-medium">Select a topic below to initiate a structured line of inquiry with our expert-level machine model.</p>
                
                <div className="space-y-3">
                  <button
                    onClick={() => sendChatMessage("Compare flame fusion (Verneuil) synthetic rubies against natural Myanmar ruby inclusions.")}
                    className="w-full text-left p-4 rounded-xl border border-white/5 bg-black/40 text-xs sm:text-sm text-white/70 hover:bg-white/5 hover:text-[#D4AF37] hover:border-[#D4AF37]/30 transition-all font-bold"
                  >
                    🔬 Inclusions: Ruby vs. Synthetic
                  </button>
                  <button
                    onClick={() => sendChatMessage("How do I measure the Refractive Index of a gemstone mounted in a closed backing where the pavilion isn't accessible?")}
                    className="w-full text-left p-4 rounded-xl border border-white/5 bg-black/40 text-xs sm:text-sm text-white/70 hover:bg-white/5 hover:text-[#D4AF37] hover:border-[#D4AF37]/30 transition-all font-bold"
                  >
                    📐 Mounted Jewelry RI Testing
                  </button>
                  <button
                    onClick={() => sendChatMessage("What is anomalous double refraction (ADR) in synthetic vs natural spinel?")}
                    className="w-full text-left p-4 rounded-xl border border-white/5 bg-black/40 text-xs sm:text-sm text-white/70 hover:bg-white/5 hover:text-[#D4AF37] hover:border-[#D4AF37]/30 transition-all font-bold"
                  >
                    💎 ADR Spinel Diagnostics
                  </button>
                  <button
                    onClick={() => sendChatMessage("Explain the three-phase inclusions that are characteristic of Colombian emeralds.")}
                    className="w-full text-left p-4 rounded-xl border border-white/5 bg-black/40 text-xs sm:text-sm text-white/70 hover:bg-white/5 hover:text-[#D4AF37] hover:border-[#D4AF37]/30 transition-all font-bold"
                  >
                    🔬 Colombian Three-Phase Markers
                  </button>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/5">
                <div className="bg-[#D4AF37]/5 rounded-xl p-4 border border-[#D4AF37]/10 text-xs text-[#FFF2B2] leading-relaxed font-bold">
                  <strong>Advisory Note:</strong> Information is compiled according to global gemological and mineralogical laboratory benchmarks for scientific mineralogical reference and advanced laboratory research purposes.
                </div>
              </div>
            </div>

            {/* Chat Box (8 cols) */}
            <div className="md:col-span-8 bg-[#0A0A0A] rounded-2xl border border-white/5 shadow-xl flex flex-col h-[580px] overflow-hidden">
              
              {/* Chat Header */}
              <div className="bg-black/90 p-4 border-b border-white/5 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-ping"></div>
                  <span className="text-xs font-black text-[#D4AF37] uppercase tracking-widest font-mono">Expert Engine Connected</span>
                </div>
                <button
                  onClick={() => setChatMessages([
                    { role: "assistant", text: "Welcome back. Ask me any specialized gemological query." }
                  ])}
                  className="text-xs text-white/40 hover:text-white uppercase font-black tracking-wider hover:underline"
                >
                  Clear Logs
                </button>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-black/20">
                {chatMessages.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-5 py-4 text-sm sm:text-base leading-relaxed ${
                        msg.role === "user"
                          ? "bg-white/5 border border-white/10 text-white rounded-br-none"
                          : "bg-black/60 border border-white/5 text-slate-200 rounded-bl-none"
                      }`}
                    >
                      <div className="font-black text-xs uppercase tracking-wider mb-1.5 text-[#D4AF37] opacity-90">
                        {msg.role === "user" ? "Laboratory Technician" : "Expert Consultant"}
                      </div>
                      <div className="markdown-report font-medium text-sm sm:text-base">
                        <Markdown remarkPlugins={[remarkGfm, remarkMath]} rehypePlugins={[rehypeKatex]}>
                          {msg.text}
                        </Markdown>
                      </div>
                    </div>
                  </div>
                ))}
                {isChatting && (
                  <div className="flex justify-start">
                    <div className="bg-black/40 border border-white/5 text-white/40 rounded-2xl rounded-bl-none px-4 py-3 text-xs sm:text-sm flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full animate-bounce"></span>
                      <span className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full animate-bounce [animation-delay:0.2s]"></span>
                      <span className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full animate-bounce [animation-delay:0.4s]"></span>
                      <span className="text-xs ml-1 text-white/50">Consulting optical signatures...</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Chat Input */}
              <div className="p-4 bg-[#0A0A0A] border-t border-white/5">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    sendChatMessage();
                  }}
                  className="flex gap-3"
                >
                  <input
                    type="text"
                    placeholder="Ask about absorption spectrum lines, density testing steps, cleavage axes..."
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    disabled={isChatting}
                    className="flex-1 bg-black border border-white/10 rounded-xl px-5 py-4 text-sm sm:text-base text-white placeholder:text-white/30 focus:outline-hidden focus:border-[#D4AF37]/50 focus:bg-white/5 transition-all font-medium"
                  />
                  <button
                    type="submit"
                    disabled={isChatting || !chatInput.trim()}
                    className="bg-[#D4AF37] text-black hover:bg-[#FFF2B2] disabled:bg-white/10 disabled:text-white/20 px-6 rounded-xl transition-all font-black uppercase tracking-wider text-xs sm:text-sm active:scale-95 whitespace-nowrap"
                  >
                    Send
                  </button>
                </form>
              </div>

            </div>

          </div>
        )}

      </main>

      {/* Catalog Visual Audit Modal */}
      {catalogAuditOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-md transition-all duration-300 animate-fadeIn"
          onClick={() => setCatalogAuditOpen(false)}
        >
          <div 
            className="relative max-w-4xl w-full h-[85vh] bg-[#0A0A0A] rounded-3xl border border-white/10 overflow-hidden shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-black/95 px-6 py-5 border-b border-white/5 flex justify-between items-center relative">
              <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-[#D4AF37]/40 pointer-events-none"></div>
              <div>
                <div className="text-[10px] uppercase font-mono tracking-widest text-[#D4AF37] font-bold flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5 animate-pulse" />
                  Visual Standard Audit Lab
                </div>
                <h3 className="text-xl font-serif text-white tracking-wide mt-1">Gemstone Reference Photo Validation</h3>
              </div>
              <button
                type="button"
                onClick={() => setCatalogAuditOpen(false)}
                className="p-2 bg-black hover:bg-red-500/10 border border-white/10 hover:border-red-500/30 rounded-full text-white/70 hover:text-red-400 transition-all"
                title="Close Audit Lab"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Dashboard Control Banner */}
            <div className="bg-gradient-to-r from-neutral-950 to-[#0F0F0F] px-6 py-4 border-b border-white/5 flex flex-wrap gap-4 items-center justify-between">
              <div className="text-xs text-white/50 max-w-md">
                This diagnostic lab runs computer-vision audits across our library photos to verify if the catalog representations are authentic, accurate, and correct visual representations of each mineral.
              </div>
              <div className="flex gap-2.5">
                <button
                  type="button"
                  onClick={runAllCatalogAudits}
                  disabled={bulkAuditLoading}
                  className="px-4 py-2 bg-[#D4AF37] hover:bg-[#FFF2B2] disabled:bg-white/10 text-black disabled:text-white/30 text-[11px] font-bold uppercase tracking-widest rounded-xl transition-all flex items-center gap-2 shadow-lg"
                >
                  {bulkAuditLoading ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      Bulk Scanning ({Object.keys(auditReports).length} / 12)...
                    </>
                  ) : (
                    <>
                      <Zap className="w-3.5 h-3.5" />
                      Audit Entire Catalog
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setAuditReports({})}
                  className="px-3 py-2 bg-black border border-white/10 hover:border-white/20 text-white/70 text-[10px] uppercase tracking-widest rounded-xl transition-all"
                >
                  Clear Logs
                </button>
              </div>
            </div>

            {/* Main scrollable audit list */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-black/30">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {gemstonesDatabase.map((gem) => {
                  const report = auditReports[gem.id];
                  const isLoading = auditLoading[gem.id];

                  return (
                    <div 
                      key={gem.id}
                      className={`p-4 rounded-2xl border transition-all duration-300 relative overflow-hidden flex flex-col justify-between ${
                        isLoading 
                          ? "bg-[#D4AF37]/5 border-[#D4AF37]/30 shadow-[0_0_12px_rgba(212,175,55,0.05)] animate-pulse" 
                          : report 
                            ? report.verified
                              ? "bg-emerald-950/10 border-emerald-500/20 hover:border-emerald-500/35"
                              : "bg-amber-950/10 border-amber-500/20 hover:border-amber-500/35"
                            : "bg-black/50 border-white/5 hover:border-white/15"
                      }`}
                    >
                      {/* Gem details row */}
                      <div className="flex gap-3.5 items-start">
                        {/* Reference Photo */}
                        <div className="w-16 h-16 rounded-xl overflow-hidden bg-neutral-950 border border-white/10 shrink-0 relative group">
                          <img 
                            src={getGemstoneImage(gem)} 
                            alt={formatGemName(gem)} 
                            referrerPolicy="no-referrer"
                            className="object-cover w-full h-full"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <span className="text-[8px] font-mono uppercase text-white/80">View Ref</span>
                          </div>
                        </div>

                        {/* Species info */}
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <h4 className="font-serif font-semibold text-xs text-white">{formatGemName(gem)}</h4>
                            <span className="text-[9px] px-1.5 py-0.2 bg-white/5 border border-white/10 rounded text-white/50 font-mono">
                              H:{gem.hardness}
                            </span>
                          </div>
                          <p className="text-[10px] text-white/40 mt-0.5 truncate">{gem.species} • {gem.formula}</p>
                          <p className="text-[10px] text-white/50 italic mt-1 truncate">Color range: {gem.color}</p>
                        </div>
                      </div>

                      {/* Audit Results section */}
                      <div className="mt-4 pt-3.5 border-t border-white/5 flex-1 flex flex-col justify-end">
                        {isLoading ? (
                          <div className="flex items-center gap-2 text-xs text-[#D4AF37] font-mono">
                            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                            <span>Gem Geek is fetching & analyzing photographic matrix...</span>
                          </div>
                        ) : report ? (
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className={`text-[9px] font-bold font-mono tracking-wider uppercase px-2 py-0.5 rounded ${
                                report.verified 
                                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                                  : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                              }`}>
                                {report.verdict}
                              </span>
                              <div className="flex items-center gap-1 text-[10px] font-mono text-white/60">
                                <span>AI Match:</span>
                                <strong className="text-white font-bold">{report.confidence}%</strong>
                              </div>
                            </div>
                            
                            <p className="text-[11px] text-white/80 leading-relaxed italic bg-black/30 p-2.5 rounded-lg border border-white/5">
                              "{report.critique}"
                            </p>
                          </div>
                        ) : (
                          <div className="flex items-center justify-between gap-4">
                            <span className="text-[9px] font-mono text-white/30 uppercase tracking-wider">Audit scan pending</span>
                            <button
                              type="button"
                              onClick={() => runSpecimenAudit(gem.id)}
                              className="px-3 py-1.5 bg-black hover:bg-white/5 border border-[#D4AF37]/30 hover:border-[#D4AF37] text-[#D4AF37] text-[9px] font-mono uppercase tracking-wider rounded-lg transition-all"
                            >
                              Run Audit Specimen
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Footer */}
            <div className="bg-black border-t border-white/5 px-6 py-4 flex justify-between items-center text-[9px] text-white/30 font-mono tracking-wider">
              <span>NORTHEAST COMPUTER-VISION ENGINE V4.2</span>
              <span>TOTAL PRELOADED REFERENCE IMAGES: {gemstonesDatabase.length} · RARE*: {gemstonesDatabase.filter((g) => g.rare).length}</span>
            </div>
          </div>
        </div>
      )}

      {/* Lightbox Zoom Modal */}
      {lightboxImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md transition-all duration-300 animate-fadeIn"
          onClick={() => setLightboxImage(null)}
        >
          <div 
            className="relative max-w-3xl w-full bg-[#0A0A0A] rounded-2xl border border-white/10 p-2 sm:p-3 overflow-hidden shadow-2xl shadow-[#D4AF37]/5"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setLightboxImage(null)}
              className="absolute top-4 right-4 z-10 p-2 bg-black/85 hover:bg-[#D4AF37] border border-white/10 rounded-full text-white hover:text-black transition-all"
              title="Close"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Specimen Info Overlay */}
            <div className="absolute bottom-4 left-4 right-4 z-10 p-4 bg-black/85 border border-white/5 rounded-xl backdrop-blur-md">
              <div className="text-[10px] uppercase font-mono tracking-widest text-[#D4AF37] font-bold">Standard Reference Specimen Card</div>
              <h3 className="text-lg font-serif text-white tracking-wide mt-1">{formatGemName(selectedGem)}</h3>
              <p className="text-xs text-white/60 mt-1">Chemical Composition: <span className="font-mono text-[#D4AF37]">{selectedGem.formula}</span> | Specific Gravity: <span className="font-mono text-white/80">{selectedGem.specificGravity}</span></p>
            </div>

            {/* Premium Image Container */}
            <div className="aspect-square sm:aspect-video w-full overflow-hidden rounded-xl bg-neutral-950 flex items-center justify-center">
              <img 
                src={lightboxImage} 
                alt={`${selectedGem.name} high resolution specimen`} 
                referrerPolicy="no-referrer"
                className="object-contain w-full h-full max-h-[75vh]"
              />
            </div>
          </div>
        </div>
      )}

      {/* Bottom Status Bar */}
      <footer className="h-12 bg-black border-t border-white/10 flex items-center justify-between px-8 text-[9px] uppercase tracking-[0.25em] text-white/30 font-medium">
        <div className="flex gap-6">
          <span>Active Session: NORTHEAST-GEEK-2026</span>
          <span className="hidden md:inline">Hardware Interface: Photometer V4 Sync Ready</span>
        </div>
        <div className="flex gap-6">
          <span className="text-[#D4AF37]">Multimodal AI Active</span>
          <span>System Time: {new Date().toLocaleTimeString()}</span>
        </div>
      </footer>

    </div>
  );
}
