/** Auto-curated expansion: trade core + rare(*) collector stones. Specimen images prefer Wikimedia mineral photos. */
import type { Gemstone } from "./gemstones";

export const gemstonesExtended: Gemstone[] = [
  {
    id: "moissanite",
    name: "Moissanite (Synthetic)",
    species: "Silicon carbide",
    formula: "SiC",
    crystalSystem: "Hexagonal",
    color: "Colorless, near-colorless, green, yellow, black",
    refractiveIndex: "2.65–2.69",
    specificGravity: "3.22",
    hardness: "9.25",
    birefringence: "0.043",
    opticCharacter: "Doubly Refractive (Uniaxial Positive)",
    luster: "Adamantine",
    cleavage: "None",
    pleochroism: "Weak",
    diagnosticInclusions: ["See species notes", "Growth features vary by origin"],
    fluorescentReaction: "Variable; check LW/SW UV as part of standard screening.",
    authenticationTips: "Confirm with RI, SG, optic character, and magnification; rare stones often require advanced lab tests for origin/treatment.",
    description: "Lab-grown silicon carbide simulant of diamond; strong doubling of facets under 10×.",
    commonlyMistaken: ["Diamond", "CZ"],
    rare: false,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/0/05/Moissanite-USGS-20-1001d-14x-.jpg",
    separationGuide: [
      {
        simulant: "Diamond",
        properties: [
          { property: "RI / SG / Optics", diagnosticDifference: "Use standard gemological tests to separate Moissanite (Synthetic) from Diamond and other look-alikes listed in commonly mistaken materials." }
        ]
      }
    ]
  },
  {
    id: "cubic_zirconia",
    name: "Cubic Zirconia (CZ)",
    species: "Zirconium dioxide (cubic)",
    formula: "ZrO₂",
    crystalSystem: "Cubic (Isometric)",
    color: "Colorless and all colors by doping",
    refractiveIndex: "2.15–2.18",
    specificGravity: "5.60–6.00",
    hardness: "8–8.5",
    birefringence: "None (Isotropic)",
    opticCharacter: "Singly Refractive (Isotropic)",
    luster: "Adamantine to vitreous",
    cleavage: "None",
    pleochroism: "None",
    diagnosticInclusions: ["See species notes", "Growth features vary by origin"],
    fluorescentReaction: "Variable; check LW/SW UV as part of standard screening.",
    authenticationTips: "Confirm with RI, SG, optic character, and magnification; rare stones often require advanced lab tests for origin/treatment.",
    description: "Common diamond simulant; high SG, softer facet junctions, cold feel less than diamond.",
    commonlyMistaken: ["Diamond", "Zircon", "Moissanite"],
    rare: false,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Cubic_zirconia_loose_stones.jpg/640px-Cubic_zirconia_loose_stones.jpg",
    separationGuide: [
      {
        simulant: "Diamond",
        properties: [
          { property: "RI / SG / Optics", diagnosticDifference: "Use standard gemological tests to separate Cubic Zirconia (CZ) from Diamond and other look-alikes listed in commonly mistaken materials." }
        ]
      }
    ]
  },
  {
    id: "glass_paste",
    name: "Glass (Paste)",
    species: "Amorphous silica glass",
    formula: "SiO₂ (amorphous, variable)",
    crystalSystem: "Amorphous",
    color: "Any color",
    refractiveIndex: "1.47–1.70",
    specificGravity: "2.3–4.5",
    hardness: "5–6",
    birefringence: "None",
    opticCharacter: "Singly Refractive (Isotropic)",
    luster: "Vitreous",
    cleavage: "None",
    pleochroism: "None",
    diagnosticInclusions: ["See species notes", "Growth features vary by origin"],
    fluorescentReaction: "Variable; check LW/SW UV as part of standard screening.",
    authenticationTips: "Confirm with RI, SG, optic character, and magnification; rare stones often require advanced lab tests for origin/treatment.",
    description: "Historic and modern gem simulant; gas bubbles, swirl lines, conchoidal fracture.",
    commonlyMistaken: ["Quartz", "Topaz", "Beryl", "Tourmaline"],
    rare: false,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/7/7d/Mycenaean_Necklace%2C_glass_paste%2C_Kanellopoulos_Museum%2C_225050x.jpg",
    separationGuide: [
      {
        simulant: "Quartz",
        properties: [
          { property: "RI / SG / Optics", diagnosticDifference: "Use standard gemological tests to separate Glass (Paste) from Quartz and other look-alikes listed in commonly mistaken materials." }
        ]
      }
    ]
  },
  {
    id: "synthetic_ruby",
    name: "Synthetic Ruby (Verneuil)",
    species: "Corundum (lab-grown)",
    formula: "Al₂O₃ (Cr)",
    crystalSystem: "Trigonal",
    color: "Red",
    refractiveIndex: "1.762–1.770",
    specificGravity: "4.00",
    hardness: "9",
    birefringence: "0.008",
    opticCharacter: "Doubly Refractive (Uniaxial Negative)",
    luster: "Vitreous",
    cleavage: "None",
    pleochroism: "Strong red dichroism",
    diagnosticInclusions: ["See species notes", "Growth features vary by origin"],
    fluorescentReaction: "Variable; check LW/SW UV as part of standard screening.",
    authenticationTips: "Confirm with RI, SG, optic character, and magnification; rare stones often require advanced lab tests for origin/treatment.",
    description: "Flame-fusion ruby; curved striae and gas bubbles separate from natural silk and zoning.",
    commonlyMistaken: ["Natural Ruby", "Red Spinel", "Garnet"],
    rare: false,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/6/67/Synthetic_sapphire%2C_ruby_and_emerald.gk.jpg",
    separationGuide: [
      {
        simulant: "Natural Ruby",
        properties: [
          { property: "RI / SG / Optics", diagnosticDifference: "Use standard gemological tests to separate Synthetic Ruby (Verneuil) from Natural Ruby and other look-alikes listed in commonly mistaken materials." }
        ]
      }
    ]
  },
  {
    id: "synthetic_sapphire",
    name: "Synthetic Sapphire (Verneuil)",
    species: "Corundum (lab-grown)",
    formula: "Al₂O₃",
    crystalSystem: "Trigonal",
    color: "Blue, colorless, fancy colors",
    refractiveIndex: "1.762–1.770",
    specificGravity: "4.00",
    hardness: "9",
    birefringence: "0.008",
    opticCharacter: "Doubly Refractive (Uniaxial Negative)",
    luster: "Vitreous",
    cleavage: "None",
    pleochroism: "Dichroic in blue",
    diagnosticInclusions: ["See species notes", "Growth features vary by origin"],
    fluorescentReaction: "Variable; check LW/SW UV as part of standard screening.",
    authenticationTips: "Confirm with RI, SG, optic character, and magnification; rare stones often require advanced lab tests for origin/treatment.",
    description: "Common lab sapphire; curved color bands and bubbles vs natural angular zoning and silk.",
    commonlyMistaken: ["Natural Sapphire", "Tanzanite", "Spinel"],
    rare: false,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/a/ad/Synthetic_sapphire_1.jpg",
    separationGuide: [
      {
        simulant: "Natural Sapphire",
        properties: [
          { property: "RI / SG / Optics", diagnosticDifference: "Use standard gemological tests to separate Synthetic Sapphire (Verneuil) from Natural Sapphire and other look-alikes listed in commonly mistaken materials." }
        ]
      }
    ]
  },
  {
    id: "synthetic_emerald",
    name: "Synthetic Emerald",
    species: "Beryl (lab-grown)",
    formula: "Be₃Al₂Si₆O₁₈ (Cr/V)",
    crystalSystem: "Hexagonal",
    color: "Green",
    refractiveIndex: "1.560–1.580 (varies by process)",
    specificGravity: "2.65–2.72",
    hardness: "7.5–8",
    birefringence: "0.005–0.006",
    opticCharacter: "Doubly Refractive (Uniaxial Negative)",
    luster: "Vitreous",
    cleavage: "Imperfect basal",
    pleochroism: "Weak",
    diagnosticInclusions: ["See species notes", "Growth features vary by origin"],
    fluorescentReaction: "Variable; check LW/SW UV as part of standard screening.",
    authenticationTips: "Confirm with RI, SG, optic character, and magnification; rare stones often require advanced lab tests for origin/treatment.",
    description: "Flux or hydrothermal emerald; chevron growth, nailhead spicules, or flux veils.",
    commonlyMistaken: ["Natural Emerald", "Tsavorite", "Chrome Tourmaline"],
    rare: false,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/d/df/B%C3%A9ryl_var._%C3%A9meraude_sur_gangue_%28Muzo_Mine_Boyaca_-_Colombie%29_2.jpg",
    separationGuide: [
      {
        simulant: "Natural Emerald",
        properties: [
          { property: "RI / SG / Optics", diagnosticDifference: "Use standard gemological tests to separate Synthetic Emerald from Natural Emerald and other look-alikes listed in commonly mistaken materials." }
        ]
      }
    ]
  },
  {
    id: "lab_grown_diamond",
    name: "Lab-Grown Diamond (HPHT/CVD)",
    species: "Diamond (lab-grown)",
    formula: "C",
    crystalSystem: "Cubic (Isometric)",
    color: "Colorless to fancy",
    refractiveIndex: "2.417",
    specificGravity: "3.52",
    hardness: "10",
    birefringence: "None (Isotropic)",
    opticCharacter: "Singly Refractive (Isotropic)",
    luster: "Adamantine",
    cleavage: "Perfect octahedral",
    pleochroism: "None",
    diagnosticInclusions: ["See species notes", "Growth features vary by origin"],
    fluorescentReaction: "Variable; check LW/SW UV as part of standard screening.",
    authenticationTips: "Confirm with RI, SG, optic character, and magnification; rare stones often require advanced lab tests for origin/treatment.",
    description: "Chemically diamond; separation needs UV fluorescence patterns, spectroscopy, or lab report.",
    commonlyMistaken: ["Natural Diamond", "Moissanite"],
    rare: false,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/2/29/CVD_diamond.jpg",
    separationGuide: [
      {
        simulant: "Natural Diamond",
        properties: [
          { property: "RI / SG / Optics", diagnosticDifference: "Use standard gemological tests to separate Lab-Grown Diamond (HPHT/CVD) from Natural Diamond and other look-alikes listed in commonly mistaken materials." }
        ]
      }
    ]
  },
  {
    id: "yag",
    name: "YAG (Yttrium Aluminum Garnet)",
    species: "Synthetic garnet-structure oxide",
    formula: "Y₃Al₅O₁₂",
    crystalSystem: "Cubic (Isotropic)",
    color: "Colorless, green, blue, etc.",
    refractiveIndex: "1.83",
    specificGravity: "4.55",
    hardness: "8.5",
    birefringence: "None",
    opticCharacter: "Singly Refractive (Isotropic)",
    luster: "Vitreous to sub-adamantine",
    cleavage: "None",
    pleochroism: "None",
    diagnosticInclusions: ["See species notes", "Growth features vary by origin"],
    fluorescentReaction: "Variable; check LW/SW UV as part of standard screening.",
    authenticationTips: "Confirm with RI, SG, optic character, and magnification; rare stones often require advanced lab tests for origin/treatment.",
    description: "Older diamond simulant; lower RI/dispersion than diamond, no doubling.",
    commonlyMistaken: ["Diamond", "CZ", "GGG"],
    rare: false,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/4/45/Yttrium-aluminum_garnet_%28synthetic_gemstone%29_1.jpg",
    separationGuide: [
      {
        simulant: "Diamond",
        properties: [
          { property: "RI / SG / Optics", diagnosticDifference: "Use standard gemological tests to separate YAG (Yttrium Aluminum Garnet) from Diamond and other look-alikes listed in commonly mistaken materials." }
        ]
      }
    ]
  },
  {
    id: "black_diamond",
    name: "Black Diamond",
    species: "Diamond",
    formula: "C (often polycrystalline / inclusions)",
    crystalSystem: "Cubic (Isotropic)",
    color: "Black, dark gray",
    refractiveIndex: "2.417",
    specificGravity: "3.52",
    hardness: "10",
    birefringence: "None",
    opticCharacter: "Singly Refractive (Isotropic)",
    luster: "Adamantine to metallic",
    cleavage: "Perfect octahedral",
    pleochroism: "None",
    diagnosticInclusions: ["See species notes", "Growth features vary by origin"],
    fluorescentReaction: "Variable; check LW/SW UV as part of standard screening.",
    authenticationTips: "Confirm with RI, SG, optic character, and magnification; rare stones often require advanced lab tests for origin/treatment.",
    description: "Bodycolor or heavily included black diamond; confirm vs black spinel/hematite simulants.",
    commonlyMistaken: ["Black Spinel", "Hematite", "Silicon carbide"],
    rare: false,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/4/40/Carbonado_diamondites_Bangui_region%2C_Central_African_Republic.jpg",
    separationGuide: [
      {
        simulant: "Black Spinel",
        properties: [
          { property: "RI / SG / Optics", diagnosticDifference: "Use standard gemological tests to separate Black Diamond from Black Spinel and other look-alikes listed in commonly mistaken materials." }
        ]
      }
    ]
  },
  {
    id: "yellow_diamond",
    name: "Yellow Diamond (Fancy)",
    species: "Diamond",
    formula: "C (nitrogen-related color)",
    crystalSystem: "Cubic (Isotropic)",
    color: "Yellow to orangey-yellow",
    refractiveIndex: "2.417",
    specificGravity: "3.52",
    hardness: "10",
    birefringence: "None",
    opticCharacter: "Singly Refractive (Isotropic)",
    luster: "Adamantine",
    cleavage: "Perfect octahedral",
    pleochroism: "None",
    diagnosticInclusions: ["See species notes", "Growth features vary by origin"],
    fluorescentReaction: "Variable; check LW/SW UV as part of standard screening.",
    authenticationTips: "Confirm with RI, SG, optic character, and magnification; rare stones often require advanced lab tests for origin/treatment.",
    description: "Fancy yellow diamond; spectroscopy and fluorescence aid type classification.",
    commonlyMistaken: ["Yellow Sapphire", "Citrine", "CZ"],
    rare: false,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/b/ba/Tiffany_Diamond2.jpg",
    separationGuide: [
      {
        simulant: "Yellow Sapphire",
        properties: [
          { property: "RI / SG / Optics", diagnosticDifference: "Use standard gemological tests to separate Yellow Diamond (Fancy) from Yellow Sapphire and other look-alikes listed in commonly mistaken materials." }
        ]
      }
    ]
  },
  {
    id: "padparadscha",
    name: "Padparadscha Sapphire",
    species: "Corundum",
    formula: "Al₂O₃ (Cr + Fe)",
    crystalSystem: "Trigonal",
    color: "Pinkish-orange to orangey-pink (lotus)",
    refractiveIndex: "1.762–1.770",
    specificGravity: "4.00",
    hardness: "9",
    birefringence: "0.008",
    opticCharacter: "Doubly Refractive (Uniaxial Negative)",
    luster: "Vitreous",
    cleavage: "None",
    pleochroism: "Dichroic",
    diagnosticInclusions: ["See species notes", "Growth features vary by origin"],
    fluorescentReaction: "Variable; check LW/SW UV as part of standard screening.",
    authenticationTips: "Confirm with RI, SG, optic character, and magnification; rare stones often require advanced lab tests for origin/treatment.",
    description: "Rare sapphire color trade name; strict hue windows—many 'pad' stones are heated fancy sapphire.",
    commonlyMistaken: ["Pink Sapphire", "Orange Sapphire", "Spinel"],
    rare: true,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/2/24/Padparadscha_sapphire.jpg",
    separationGuide: [
      {
        simulant: "Pink Sapphire",
        properties: [
          { property: "RI / SG / Optics", diagnosticDifference: "Use standard gemological tests to separate Padparadscha Sapphire from Pink Sapphire and other look-alikes listed in commonly mistaken materials." }
        ]
      }
    ]
  },
  {
    id: "star_sapphire",
    name: "Star Sapphire",
    species: "Corundum",
    formula: "Al₂O₃",
    crystalSystem: "Trigonal",
    color: "Blue, gray, black, fancy (asteriated)",
    refractiveIndex: "1.762–1.770",
    specificGravity: "4.00",
    hardness: "9",
    birefringence: "0.008",
    opticCharacter: "Doubly Refractive (Uniaxial Negative)",
    luster: "Vitreous",
    cleavage: "None",
    pleochroism: "Variable",
    diagnosticInclusions: ["See species notes", "Growth features vary by origin"],
    fluorescentReaction: "Variable; check LW/SW UV as part of standard screening.",
    authenticationTips: "Confirm with RI, SG, optic character, and magnification; rare stones often require advanced lab tests for origin/treatment.",
    description: "Asterism from oriented rutile silk; cabochon cut; synthetic stars show curved silk.",
    commonlyMistaken: ["Star Ruby", "Synthetic Star Sapphire"],
    rare: true,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/e/ee/Star-Saphire.jpg",
    separationGuide: [
      {
        simulant: "Star Ruby",
        properties: [
          { property: "RI / SG / Optics", diagnosticDifference: "Use standard gemological tests to separate Star Sapphire from Star Ruby and other look-alikes listed in commonly mistaken materials." }
        ]
      }
    ]
  },
  {
    id: "star_ruby",
    name: "Star Ruby",
    species: "Corundum",
    formula: "Al₂O₃ (Cr)",
    crystalSystem: "Trigonal",
    color: "Red asteriated",
    refractiveIndex: "1.762–1.770",
    specificGravity: "4.00",
    hardness: "9",
    birefringence: "0.008",
    opticCharacter: "Doubly Refractive (Uniaxial Negative)",
    luster: "Vitreous",
    cleavage: "None",
    pleochroism: "Strong",
    diagnosticInclusions: ["See species notes", "Growth features vary by origin"],
    fluorescentReaction: "Variable; check LW/SW UV as part of standard screening.",
    authenticationTips: "Confirm with RI, SG, optic character, and magnification; rare stones often require advanced lab tests for origin/treatment.",
    description: "Rare asteriated ruby; fine silk network produces 6-ray star.",
    commonlyMistaken: ["Star Sapphire", "Garnet", "Synthetic Star Ruby"],
    rare: true,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Star_ruby.jpg",
    separationGuide: [
      {
        simulant: "Star Sapphire",
        properties: [
          { property: "RI / SG / Optics", diagnosticDifference: "Use standard gemological tests to separate Star Ruby from Star Sapphire and other look-alikes listed in commonly mistaken materials." }
        ]
      }
    ]
  },
  {
    id: "yellow_sapphire",
    name: "Yellow Sapphire",
    species: "Corundum",
    formula: "Al₂O₃ (Fe)",
    crystalSystem: "Trigonal",
    color: "Yellow, greenish-yellow, orangey-yellow",
    refractiveIndex: "1.762–1.770",
    specificGravity: "4.00",
    hardness: "9",
    birefringence: "0.008",
    opticCharacter: "Doubly Refractive (Uniaxial Negative)",
    luster: "Vitreous",
    cleavage: "None",
    pleochroism: "Weak to moderate",
    diagnosticInclusions: ["See species notes", "Growth features vary by origin"],
    fluorescentReaction: "Variable; check LW/SW UV as part of standard screening.",
    authenticationTips: "Confirm with RI, SG, optic character, and magnification; rare stones often require advanced lab tests for origin/treatment.",
    description: "Common fancy sapphire; separate from topaz/citrine by RI/SG.",
    commonlyMistaken: ["Citrine", "Topaz", "Heliodor"],
    rare: false,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/9/90/Yellow_sapphire_oval_gemstone.JPG",
    separationGuide: [
      {
        simulant: "Citrine",
        properties: [
          { property: "RI / SG / Optics", diagnosticDifference: "Use standard gemological tests to separate Yellow Sapphire from Citrine and other look-alikes listed in commonly mistaken materials." }
        ]
      }
    ]
  },
  {
    id: "pink_sapphire",
    name: "Pink Sapphire",
    species: "Corundum",
    formula: "Al₂O₃ (Cr)",
    crystalSystem: "Trigonal",
    color: "Pink to purplish-pink",
    refractiveIndex: "1.762–1.770",
    specificGravity: "4.00",
    hardness: "9",
    birefringence: "0.008",
    opticCharacter: "Doubly Refractive (Uniaxial Negative)",
    luster: "Vitreous",
    cleavage: "None",
    pleochroism: "Moderate",
    diagnosticInclusions: ["See species notes", "Growth features vary by origin"],
    fluorescentReaction: "Variable; check LW/SW UV as part of standard screening.",
    authenticationTips: "Confirm with RI, SG, optic character, and magnification; rare stones often require advanced lab tests for origin/treatment.",
    description: "Corundum between ruby and colorless; trade boundary with ruby is lab/policy dependent.",
    commonlyMistaken: ["Ruby", "Pink Spinel", "Morganite", "Tourmaline"],
    rare: false,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/a/a1/Sapphire_pink_octagon_1.17cts.jpg",
    separationGuide: [
      {
        simulant: "Ruby",
        properties: [
          { property: "RI / SG / Optics", diagnosticDifference: "Use standard gemological tests to separate Pink Sapphire from Ruby and other look-alikes listed in commonly mistaken materials." }
        ]
      }
    ]
  },
  {
    id: "white_sapphire",
    name: "White (Colorless) Sapphire",
    species: "Corundum",
    formula: "Al₂O₃",
    crystalSystem: "Trigonal",
    color: "Colorless to very light gray",
    refractiveIndex: "1.762–1.770",
    specificGravity: "4.00",
    hardness: "9",
    birefringence: "0.008",
    opticCharacter: "Doubly Refractive (Uniaxial Negative)",
    luster: "Vitreous",
    cleavage: "None",
    pleochroism: "None to weak",
    diagnosticInclusions: ["See species notes", "Growth features vary by origin"],
    fluorescentReaction: "Variable; check LW/SW UV as part of standard screening.",
    authenticationTips: "Confirm with RI, SG, optic character, and magnification; rare stones often require advanced lab tests for origin/treatment.",
    description: "Diamond simulant historically; lower RI/dispersion than diamond, doubly refractive.",
    commonlyMistaken: ["Diamond", "CZ", "Topaz"],
    rare: false,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/4/4d/LEUCO_SAPPHIRE_FROM_KAN%2C_RUSSIA%2C_COLL._ROSTISLAW_KAISCHEW_AT_THE_EARTH_AND_MAN_MUSEUM_IN_SOFIA.jpg",
    separationGuide: [
      {
        simulant: "Diamond",
        properties: [
          { property: "RI / SG / Optics", diagnosticDifference: "Use standard gemological tests to separate White (Colorless) Sapphire from Diamond and other look-alikes listed in commonly mistaken materials." }
        ]
      }
    ]
  },
  {
    id: "heliodor",
    name: "Heliodor (Golden Beryl)",
    species: "Beryl",
    formula: "Be₃Al₂Si₆O₁₈",
    crystalSystem: "Hexagonal",
    color: "Yellow to greenish-yellow",
    refractiveIndex: "1.570–1.583",
    specificGravity: "2.66–2.72",
    hardness: "7.5–8",
    birefringence: "0.005–0.007",
    opticCharacter: "Doubly Refractive (Uniaxial Negative)",
    luster: "Vitreous",
    cleavage: "Imperfect basal",
    pleochroism: "Weak",
    diagnosticInclusions: ["See species notes", "Growth features vary by origin"],
    fluorescentReaction: "Variable; check LW/SW UV as part of standard screening.",
    authenticationTips: "Confirm with RI, SG, optic character, and magnification; rare stones often require advanced lab tests for origin/treatment.",
    description: "Yellow beryl; separate from topaz/citrine by SG and RI.",
    commonlyMistaken: ["Citrine", "Topaz", "Yellow Sapphire"],
    rare: false,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/d/db/Heliodor-G-EmpireTheWorldOfGems.jpg",
    separationGuide: [
      {
        simulant: "Citrine",
        properties: [
          { property: "RI / SG / Optics", diagnosticDifference: "Use standard gemological tests to separate Heliodor (Golden Beryl) from Citrine and other look-alikes listed in commonly mistaken materials." }
        ]
      }
    ]
  },
  {
    id: "goshenite",
    name: "Goshenite",
    species: "Beryl",
    formula: "Be₃Al₂Si₆O₁₈",
    crystalSystem: "Hexagonal",
    color: "Colorless",
    refractiveIndex: "1.570–1.583",
    specificGravity: "2.66–2.72",
    hardness: "7.5–8",
    birefringence: "0.005–0.007",
    opticCharacter: "Doubly Refractive (Uniaxial Negative)",
    luster: "Vitreous",
    cleavage: "Imperfect basal",
    pleochroism: "None",
    diagnosticInclusions: ["See species notes", "Growth features vary by origin"],
    fluorescentReaction: "Variable; check LW/SW UV as part of standard screening.",
    authenticationTips: "Confirm with RI, SG, optic character, and magnification; rare stones often require advanced lab tests for origin/treatment.",
    description: "Colorless beryl; may be irradiated to colors—check origin claims carefully.",
    commonlyMistaken: ["Rock Crystal", "Topaz", "White Sapphire"],
    rare: false,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/7/7c/Goshenit-G-EmpireTheWorldOfGems.jpg",
    separationGuide: [
      {
        simulant: "Rock Crystal",
        properties: [
          { property: "RI / SG / Optics", diagnosticDifference: "Use standard gemological tests to separate Goshenite from Rock Crystal and other look-alikes listed in commonly mistaken materials." }
        ]
      }
    ]
  },
  {
    id: "red_beryl",
    name: "Red Beryl (Bixbite)",
    species: "Beryl",
    formula: "Be₃Al₂Si₆O₁₈ (Mn)",
    crystalSystem: "Hexagonal",
    color: "Red to purplish-red",
    refractiveIndex: "1.568–1.576",
    specificGravity: "2.66–2.70",
    hardness: "7.5–8",
    birefringence: "0.004–0.008",
    opticCharacter: "Doubly Refractive (Uniaxial Negative)",
    luster: "Vitreous",
    cleavage: "Imperfect basal",
    pleochroism: "Moderate",
    diagnosticInclusions: ["See species notes", "Growth features vary by origin"],
    fluorescentReaction: "Variable; check LW/SW UV as part of standard screening.",
    authenticationTips: "Confirm with RI, SG, optic character, and magnification; rare stones often require advanced lab tests for origin/treatment.",
    description: "Extremely rare Utah red beryl; tiny crystals, high value—often confused with pezzottaite.",
    commonlyMistaken: ["Pezzottaite", "Rubellite", "Spinel"],
    rare: true,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/4/48/RedBeryl-G-EmpireTheWorldOfGems.jpg",
    separationGuide: [
      {
        simulant: "Pezzottaite",
        properties: [
          { property: "RI / SG / Optics", diagnosticDifference: "Use standard gemological tests to separate Red Beryl (Bixbite) from Pezzottaite and other look-alikes listed in commonly mistaken materials." }
        ]
      }
    ]
  },
  {
    id: "maxixe",
    name: "Maxixe Beryl",
    species: "Beryl",
    formula: "Be₃Al₂Si₆O₁₈ (color centers)",
    crystalSystem: "Hexagonal",
    color: "Deep blue (fades in light)",
    refractiveIndex: "1.570–1.583",
    specificGravity: "2.70",
    hardness: "7.5–8",
    birefringence: "0.006",
    opticCharacter: "Doubly Refractive (Uniaxial Negative)",
    luster: "Vitreous",
    cleavage: "Imperfect basal",
    pleochroism: "Strong",
    diagnosticInclusions: ["See species notes", "Growth features vary by origin"],
    fluorescentReaction: "Variable; check LW/SW UV as part of standard screening.",
    authenticationTips: "Confirm with RI, SG, optic character, and magnification; rare stones often require advanced lab tests for origin/treatment.",
    description: "Rare deep-blue beryl color center; unstable to light—trade caution.",
    commonlyMistaken: ["Aquamarine", "Blue Topaz", "Sapphire"],
    rare: true,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/c/c3/Maxixe_Mozambique.jpg",
    separationGuide: [
      {
        simulant: "Aquamarine",
        properties: [
          { property: "RI / SG / Optics", diagnosticDifference: "Use standard gemological tests to separate Maxixe Beryl from Aquamarine and other look-alikes listed in commonly mistaken materials." }
        ]
      }
    ]
  },
  {
    id: "rubellite",
    name: "Rubellite (Pink/Red Tourmaline)",
    species: "Tourmaline (Elbaite)",
    formula: "Complex borosilicate",
    crystalSystem: "Trigonal",
    color: "Pink to red",
    refractiveIndex: "1.624–1.644",
    specificGravity: "3.06",
    hardness: "7–7.5",
    birefringence: "0.018–0.020",
    opticCharacter: "Doubly Refractive (Uniaxial Negative)",
    luster: "Vitreous",
    cleavage: "None",
    pleochroism: "Strong",
    diagnosticInclusions: ["See species notes", "Growth features vary by origin"],
    fluorescentReaction: "Variable; check LW/SW UV as part of standard screening.",
    authenticationTips: "Confirm with RI, SG, optic character, and magnification; rare stones often require advanced lab tests for origin/treatment.",
    description: "Pink-red elbaite; strong pleochroism; separate from ruby by RI/SG/optic.",
    commonlyMistaken: ["Ruby", "Spinel", "Garnet"],
    rare: false,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/c/c1/Tourmaline_var._rubellite_%28Br%C3%A9sil%29.jpg",
    separationGuide: [
      {
        simulant: "Ruby",
        properties: [
          { property: "RI / SG / Optics", diagnosticDifference: "Use standard gemological tests to separate Rubellite (Pink/Red Tourmaline) from Ruby and other look-alikes listed in commonly mistaken materials." }
        ]
      }
    ]
  },
  {
    id: "indicolite",
    name: "Indicolite (Blue Tourmaline)",
    species: "Tourmaline (Elbaite)",
    formula: "Complex borosilicate",
    crystalSystem: "Trigonal",
    color: "Blue to greenish-blue",
    refractiveIndex: "1.624–1.644",
    specificGravity: "3.06",
    hardness: "7–7.5",
    birefringence: "0.018–0.020",
    opticCharacter: "Doubly Refractive (Uniaxial Negative)",
    luster: "Vitreous",
    cleavage: "None",
    pleochroism: "Strong",
    diagnosticInclusions: ["See species notes", "Growth features vary by origin"],
    fluorescentReaction: "Variable; check LW/SW UV as part of standard screening.",
    authenticationTips: "Confirm with RI, SG, optic character, and magnification; rare stones often require advanced lab tests for origin/treatment.",
    description: "Blue tourmaline; often heat-treated; strong dichroism.",
    commonlyMistaken: ["Sapphire", "Aquamarine", "Tanzanite"],
    rare: false,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/0/02/Elbaite-ch06e.jpg",
    separationGuide: [
      {
        simulant: "Sapphire",
        properties: [
          { property: "RI / SG / Optics", diagnosticDifference: "Use standard gemological tests to separate Indicolite (Blue Tourmaline) from Sapphire and other look-alikes listed in commonly mistaken materials." }
        ]
      }
    ]
  },
  {
    id: "paraiba_tourmaline",
    name: "Paraíba Tourmaline",
    species: "Tourmaline (Elbaite, Cu-bearing)",
    formula: "Complex borosilicate (Cu, Mn)",
    crystalSystem: "Trigonal",
    color: "Neon blue, green, violet-blue",
    refractiveIndex: "1.624–1.644",
    specificGravity: "3.06",
    hardness: "7–7.5",
    birefringence: "0.018–0.020",
    opticCharacter: "Doubly Refractive (Uniaxial Negative)",
    luster: "Vitreous",
    cleavage: "None",
    pleochroism: "Strong",
    diagnosticInclusions: ["See species notes", "Growth features vary by origin"],
    fluorescentReaction: "Variable; check LW/SW UV as part of standard screening.",
    authenticationTips: "Confirm with RI, SG, optic character, and magnification; rare stones often require advanced lab tests for origin/treatment.",
    description: "Copper-bearing neon tourmaline; origin/chemistry (Cu) critical for trade name.",
    commonlyMistaken: ["Apatite", "Aquamarine", "Glass"],
    rare: true,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/f/fc/Tourmaline_para%C3%AFba_%28Br%C3%A9sil%29.JPG",
    separationGuide: [
      {
        simulant: "Apatite",
        properties: [
          { property: "RI / SG / Optics", diagnosticDifference: "Use standard gemological tests to separate Paraíba Tourmaline from Apatite and other look-alikes listed in commonly mistaken materials." }
        ]
      }
    ]
  },
  {
    id: "chrome_tourmaline",
    name: "Chrome Tourmaline",
    species: "Tourmaline",
    formula: "Complex borosilicate (Cr/V)",
    crystalSystem: "Trigonal",
    color: "Intense green",
    refractiveIndex: "1.624–1.644",
    specificGravity: "3.06–3.10",
    hardness: "7–7.5",
    birefringence: "0.018–0.020",
    opticCharacter: "Doubly Refractive (Uniaxial Negative)",
    luster: "Vitreous",
    cleavage: "None",
    pleochroism: "Strong",
    diagnosticInclusions: ["See species notes", "Growth features vary by origin"],
    fluorescentReaction: "Variable; check LW/SW UV as part of standard screening.",
    authenticationTips: "Confirm with RI, SG, optic character, and magnification; rare stones often require advanced lab tests for origin/treatment.",
    description: "Vivid green Cr/V tourmaline; can mimic tsavorite/emerald.",
    commonlyMistaken: ["Tsavorite", "Emerald", "Chrome Diopside"],
    rare: true,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/5/54/Verdelite_%28green%29_tourmaline%2C_muscovite%2C_quartz_%2826043659821%29.jpg",
    separationGuide: [
      {
        simulant: "Tsavorite",
        properties: [
          { property: "RI / SG / Optics", diagnosticDifference: "Use standard gemological tests to separate Chrome Tourmaline from Tsavorite and other look-alikes listed in commonly mistaken materials." }
        ]
      }
    ]
  },
  {
    id: "watermelon_tourmaline",
    name: "Watermelon Tourmaline",
    species: "Tourmaline (Elbaite)",
    formula: "Complex borosilicate",
    crystalSystem: "Trigonal",
    color: "Pink core, green rim (zoned)",
    refractiveIndex: "1.624–1.644",
    specificGravity: "3.06",
    hardness: "7–7.5",
    birefringence: "0.018–0.020",
    opticCharacter: "Doubly Refractive (Uniaxial Negative)",
    luster: "Vitreous",
    cleavage: "None",
    pleochroism: "Strong",
    diagnosticInclusions: ["See species notes", "Growth features vary by origin"],
    fluorescentReaction: "Variable; check LW/SW UV as part of standard screening.",
    authenticationTips: "Confirm with RI, SG, optic character, and magnification; rare stones often require advanced lab tests for origin/treatment.",
    description: "Color-zoned tourmaline slices; classic collector and jewelry material.",
    commonlyMistaken: ["Glass", "Assembled triplets"],
    rare: false,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/c/c7/Maine_Mineral_and_Gem_Museum%2C_Bethel_-_Elbaite_tourmaline_-_watermelon_tourmaline.jpg",
    separationGuide: [
      {
        simulant: "Glass",
        properties: [
          { property: "RI / SG / Optics", diagnosticDifference: "Use standard gemological tests to separate Watermelon Tourmaline from Glass and other look-alikes listed in commonly mistaken materials." }
        ]
      }
    ]
  },
  {
    id: "blue_topaz",
    name: "Blue Topaz",
    species: "Topaz",
    formula: "Al₂SiO₄(F,OH)₂",
    crystalSystem: "Orthorhombic",
    color: "Sky to London blue (often irradiated+heat)",
    refractiveIndex: "1.609–1.643",
    specificGravity: "3.53",
    hardness: "8",
    birefringence: "0.008–0.010",
    opticCharacter: "Doubly Refractive (Biaxial Positive)",
    luster: "Vitreous",
    cleavage: "Perfect basal",
    pleochroism: "Weak to moderate",
    diagnosticInclusions: ["See species notes", "Growth features vary by origin"],
    fluorescentReaction: "Variable; check LW/SW UV as part of standard screening.",
    authenticationTips: "Confirm with RI, SG, optic character, and magnification; rare stones often require advanced lab tests for origin/treatment.",
    description: "Common treated blue topaz; perfect cleavage risk if hit.",
    commonlyMistaken: ["Aquamarine", "Blue Glass", "Spinel"],
    rare: false,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/5/5e/Blue_topaz_briolettes.jpg",
    separationGuide: [
      {
        simulant: "Aquamarine",
        properties: [
          { property: "RI / SG / Optics", diagnosticDifference: "Use standard gemological tests to separate Blue Topaz from Aquamarine and other look-alikes listed in commonly mistaken materials." }
        ]
      }
    ]
  },
  {
    id: "imperial_topaz",
    name: "Imperial Topaz",
    species: "Topaz",
    formula: "Al₂SiO₄(F,OH)₂",
    crystalSystem: "Orthorhombic",
    color: "Golden-orange to pinkish-orange",
    refractiveIndex: "1.609–1.643",
    specificGravity: "3.53",
    hardness: "8",
    birefringence: "0.008–0.010",
    opticCharacter: "Doubly Refractive (Biaxial Positive)",
    luster: "Vitreous",
    cleavage: "Perfect basal",
    pleochroism: "Moderate",
    diagnosticInclusions: ["See species notes", "Growth features vary by origin"],
    fluorescentReaction: "Variable; check LW/SW UV as part of standard screening.",
    authenticationTips: "Confirm with RI, SG, optic character, and magnification; rare stones often require advanced lab tests for origin/treatment.",
    description: "Valued orange-pink topaz trade category; often from Ouro Preto region.",
    commonlyMistaken: ["Citrine", "Heliodor", "Sapphire"],
    rare: true,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/2/26/Imperial_topaz_NHMLA.png",
    separationGuide: [
      {
        simulant: "Citrine",
        properties: [
          { property: "RI / SG / Optics", diagnosticDifference: "Use standard gemological tests to separate Imperial Topaz from Citrine and other look-alikes listed in commonly mistaken materials." }
        ]
      }
    ]
  },
  {
    id: "pink_topaz",
    name: "Pink Topaz",
    species: "Topaz",
    formula: "Al₂SiO₄(F,OH)₂",
    crystalSystem: "Orthorhombic",
    color: "Pink to violetish-pink",
    refractiveIndex: "1.609–1.643",
    specificGravity: "3.53",
    hardness: "8",
    birefringence: "0.008–0.010",
    opticCharacter: "Doubly Refractive (Biaxial Positive)",
    luster: "Vitreous",
    cleavage: "Perfect basal",
    pleochroism: "Moderate",
    diagnosticInclusions: ["See species notes", "Growth features vary by origin"],
    fluorescentReaction: "Variable; check LW/SW UV as part of standard screening.",
    authenticationTips: "Confirm with RI, SG, optic character, and magnification; rare stones often require advanced lab tests for origin/treatment.",
    description: "Pink topaz; may be heated imperial; cleavage caution.",
    commonlyMistaken: ["Kunzite", "Morganite", "Tourmaline"],
    rare: false,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/c/cd/Topaz-121980.jpg",
    separationGuide: [
      {
        simulant: "Kunzite",
        properties: [
          { property: "RI / SG / Optics", diagnosticDifference: "Use standard gemological tests to separate Pink Topaz from Kunzite and other look-alikes listed in commonly mistaken materials." }
        ]
      }
    ]
  },
  {
    id: "black_opal",
    name: "Black Opal",
    species: "Opal",
    formula: "SiO₂·nH₂O",
    crystalSystem: "Amorphous",
    color: "Dark bodycolor with play-of-color",
    refractiveIndex: "1.37–1.47",
    specificGravity: "1.98–2.20",
    hardness: "5.5–6.5",
    birefringence: "None",
    opticCharacter: "Singly Refractive (Isotropic)",
    luster: "Vitreous to waxy",
    cleavage: "None",
    pleochroism: "None",
    diagnosticInclusions: ["See species notes", "Growth features vary by origin"],
    fluorescentReaction: "Variable; check LW/SW UV as part of standard screening.",
    authenticationTips: "Confirm with RI, SG, optic character, and magnification; rare stones often require advanced lab tests for origin/treatment.",
    description: "Dark-body precious opal (classically Lightning Ridge); high value for play-of-color.",
    commonlyMistaken: ["Doublet/Triplet", "Synthetic Opal", "Glass"],
    rare: true,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/1/1e/Opal-black.jpg",
    separationGuide: [
      {
        simulant: "Doublet/Triplet",
        properties: [
          { property: "RI / SG / Optics", diagnosticDifference: "Use standard gemological tests to separate Black Opal from Doublet/Triplet and other look-alikes listed in commonly mistaken materials." }
        ]
      }
    ]
  },
  {
    id: "fire_opal",
    name: "Fire Opal",
    species: "Opal",
    formula: "SiO₂·nH₂O",
    crystalSystem: "Amorphous",
    color: "Orange to red (may lack play-of-color)",
    refractiveIndex: "1.37–1.47",
    specificGravity: "1.98–2.20",
    hardness: "5.5–6.5",
    birefringence: "None",
    opticCharacter: "Singly Refractive (Isotropic)",
    luster: "Vitreous",
    cleavage: "None",
    pleochroism: "None",
    diagnosticInclusions: ["See species notes", "Growth features vary by origin"],
    fluorescentReaction: "Variable; check LW/SW UV as part of standard screening.",
    authenticationTips: "Confirm with RI, SG, optic character, and magnification; rare stones often require advanced lab tests for origin/treatment.",
    description: "Bodycolor orange-red opal; often Mexican; care with heat/dryness.",
    commonlyMistaken: ["Carnelian", "Glass", "Garnet"],
    rare: false,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/e/ec/Fire_opal_in_matrix_%28Juniper_Ridge%2C_Lake_County%2C_Oregon%2C_USA%29_8.jpg",
    separationGuide: [
      {
        simulant: "Carnelian",
        properties: [
          { property: "RI / SG / Optics", diagnosticDifference: "Use standard gemological tests to separate Fire Opal from Carnelian and other look-alikes listed in commonly mistaken materials." }
        ]
      }
    ]
  },
  {
    id: "boulder_opal",
    name: "Boulder Opal",
    species: "Opal on ironstone",
    formula: "SiO₂·nH₂O on matrix",
    crystalSystem: "Amorphous",
    color: "Play-of-color on brown ironstone",
    refractiveIndex: "1.37–1.47",
    specificGravity: "Variable",
    hardness: "5.5–6.5",
    birefringence: "None",
    opticCharacter: "Singly Refractive (Isotropic)",
    luster: "Vitreous",
    cleavage: "None",
    pleochroism: "None",
    diagnosticInclusions: ["See species notes", "Growth features vary by origin"],
    fluorescentReaction: "Variable; check LW/SW UV as part of standard screening.",
    authenticationTips: "Confirm with RI, SG, optic character, and magnification; rare stones often require advanced lab tests for origin/treatment.",
    description: "Opal veins in ironstone host; Australian classic.",
    commonlyMistaken: ["Doublet", "Assembled"],
    rare: false,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/1/17/Boulder_Opal.jpg",
    separationGuide: [
      {
        simulant: "Doublet",
        properties: [
          { property: "RI / SG / Optics", diagnosticDifference: "Use standard gemological tests to separate Boulder Opal from Doublet and other look-alikes listed in commonly mistaken materials." }
        ]
      }
    ]
  },
  {
    id: "cats_eye_chrysoberyl",
    name: "Cat's-Eye Chrysoberyl",
    species: "Chrysoberyl",
    formula: "BeAl₂O₄",
    crystalSystem: "Orthorhombic",
    color: "Honey to greenish chatoyant",
    refractiveIndex: "1.746–1.755",
    specificGravity: "3.73",
    hardness: "8.5",
    birefringence: "0.008–0.010",
    opticCharacter: "Doubly Refractive (Biaxial Positive)",
    luster: "Vitreous",
    cleavage: "Distinct",
    pleochroism: "Moderate",
    diagnosticInclusions: ["See species notes", "Growth features vary by origin"],
    fluorescentReaction: "Variable; check LW/SW UV as part of standard screening.",
    authenticationTips: "Confirm with RI, SG, optic character, and magnification; rare stones often require advanced lab tests for origin/treatment.",
    description: "Chatoyant chrysoberyl with sharp eye; finest are milk-and-honey.",
    commonlyMistaken: ["Quartz Cat's-Eye", "Tourmaline Cat's-Eye", "Glass"],
    rare: true,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/3/3a/Cymophane.jpg",
    separationGuide: [
      {
        simulant: "Quartz Cat's-Eye",
        properties: [
          { property: "RI / SG / Optics", diagnosticDifference: "Use standard gemological tests to separate Cat's-Eye Chrysoberyl from Quartz Cat's-Eye and other look-alikes listed in commonly mistaken materials." }
        ]
      }
    ]
  },
  {
    id: "demantoid",
    name: "Demantoid Garnet",
    species: "Andradite Garnet",
    formula: "Ca₃Fe₂(SiO₄)₃",
    crystalSystem: "Cubic (Isometric)",
    color: "Green to yellowish-green",
    refractiveIndex: "1.88–1.89",
    specificGravity: "3.82–3.85",
    hardness: "6.5–7",
    birefringence: "None (Isotropic)",
    opticCharacter: "Singly Refractive (Isotropic)",
    luster: "Adamantine to vitreous",
    cleavage: "None",
    pleochroism: "None",
    diagnosticInclusions: ["See species notes", "Growth features vary by origin"],
    fluorescentReaction: "Variable; check LW/SW UV as part of standard screening.",
    authenticationTips: "Confirm with RI, SG, optic character, and magnification; rare stones often require advanced lab tests for origin/treatment.",
    description: "Rare green andradite; horsetail inclusions classic for Russian material.",
    commonlyMistaken: ["Tsavorite", "Emerald", "Peridot"],
    rare: true,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/a/a3/Granat%2C_demantoid_-_Usakos%2C_Karibib_District%2C_Erongo_Region%2C_Namibia._Afryka..JPG",
    separationGuide: [
      {
        simulant: "Tsavorite",
        properties: [
          { property: "RI / SG / Optics", diagnosticDifference: "Use standard gemological tests to separate Demantoid Garnet from Tsavorite and other look-alikes listed in commonly mistaken materials." }
        ]
      }
    ]
  },
  {
    id: "hessonite",
    name: "Hessonite Garnet",
    species: "Grossular Garnet",
    formula: "Ca₃Al₂(SiO₄)₃",
    crystalSystem: "Cubic (Isometric)",
    color: "Orange to brownish-orange",
    refractiveIndex: "1.74–1.75",
    specificGravity: "3.65",
    hardness: "7–7.5",
    birefringence: "None (Isotropic)",
    opticCharacter: "Singly Refractive (Isotropic)",
    luster: "Vitreous",
    cleavage: "None",
    pleochroism: "None",
    diagnosticInclusions: ["See species notes", "Growth features vary by origin"],
    fluorescentReaction: "Variable; check LW/SW UV as part of standard screening.",
    authenticationTips: "Confirm with RI, SG, optic character, and magnification; rare stones often require advanced lab tests for origin/treatment.",
    description: "Cinnamon grossular; roiled 'treacle' internal look common.",
    commonlyMistaken: ["Spessartine", "Zircon", "Topaz"],
    rare: false,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/b/bc/Hessonite_%28grossular_garnet_variety%29_Ca3Al2Si3O12_locality-_%C5%BDulov%C3%A1%2C_Czech_Republic_%2850655481563%29.jpg",
    separationGuide: [
      {
        simulant: "Spessartine",
        properties: [
          { property: "RI / SG / Optics", diagnosticDifference: "Use standard gemological tests to separate Hessonite Garnet from Spessartine and other look-alikes listed in commonly mistaken materials." }
        ]
      }
    ]
  },
  {
    id: "rhodolite",
    name: "Rhodolite Garnet",
    species: "Pyrope-Almandine series",
    formula: "Mg,Fe aluminum silicate",
    crystalSystem: "Cubic (Isometric)",
    color: "Purplish-red to raspberry",
    refractiveIndex: "1.76–1.78",
    specificGravity: "3.84–3.90",
    hardness: "7–7.5",
    birefringence: "None (Isotropic)",
    opticCharacter: "Singly Refractive (Isotropic)",
    luster: "Vitreous",
    cleavage: "None",
    pleochroism: "None",
    diagnosticInclusions: ["See species notes", "Growth features vary by origin"],
    fluorescentReaction: "Variable; check LW/SW UV as part of standard screening.",
    authenticationTips: "Confirm with RI, SG, optic character, and magnification; rare stones often require advanced lab tests for origin/treatment.",
    description: "Trade name for purplish pyrope-almandine; popular jewelry garnet.",
    commonlyMistaken: ["Ruby", "Spinel", "Tourmaline"],
    rare: false,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/7/72/Rhodolite1b.jpg",
    separationGuide: [
      {
        simulant: "Ruby",
        properties: [
          { property: "RI / SG / Optics", diagnosticDifference: "Use standard gemological tests to separate Rhodolite Garnet from Ruby and other look-alikes listed in commonly mistaken materials." }
        ]
      }
    ]
  },
  {
    id: "color_change_garnet",
    name: "Color-Change Garnet",
    species: "Garnet (mixed series)",
    formula: "Variable (often pyrope-spessartine)",
    crystalSystem: "Cubic (Isometric)",
    color: "Blue-green to red/purple change",
    refractiveIndex: "1.76–1.81",
    specificGravity: "3.80–4.20",
    hardness: "7–7.5",
    birefringence: "None (Isotropic)",
    opticCharacter: "Singly Refractive (Isotropic)",
    luster: "Vitreous",
    cleavage: "None",
    pleochroism: "None",
    diagnosticInclusions: ["See species notes", "Growth features vary by origin"],
    fluorescentReaction: "Variable; check LW/SW UV as part of standard screening.",
    authenticationTips: "Confirm with RI, SG, optic character, and magnification; rare stones often require advanced lab tests for origin/treatment.",
    description: "Garnet with alexandrite-like color change; spectrum and RI separate from alexandrite.",
    commonlyMistaken: ["Alexandrite", "Sapphire", "Spinel"],
    rare: true,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/c/cb/Almandine_garnet_1.jpg",
    separationGuide: [
      {
        simulant: "Alexandrite",
        properties: [
          { property: "RI / SG / Optics", diagnosticDifference: "Use standard gemological tests to separate Color-Change Garnet from Alexandrite and other look-alikes listed in commonly mistaken materials." }
        ]
      }
    ]
  },
  {
    id: "andradite",
    name: "Andradite Garnet",
    species: "Andradite",
    formula: "Ca₃Fe₂(SiO₄)₃",
    crystalSystem: "Cubic (Isometric)",
    color: "Yellow, green, brown, black",
    refractiveIndex: "1.88–1.89",
    specificGravity: "3.8–3.9",
    hardness: "6.5–7",
    birefringence: "None (Isotropic)",
    opticCharacter: "Singly Refractive (Isotropic)",
    luster: "Adamantine to vitreous",
    cleavage: "None",
    pleochroism: "None",
    diagnosticInclusions: ["See species notes", "Growth features vary by origin"],
    fluorescentReaction: "Variable; check LW/SW UV as part of standard screening.",
    authenticationTips: "Confirm with RI, SG, optic character, and magnification; rare stones often require advanced lab tests for origin/treatment.",
    description: "Calcium-iron garnet species including demantoid and topazolite.",
    commonlyMistaken: ["Zircon", "Sphene", "Diamond simulants"],
    rare: false,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/c/c1/Andradite-Mali.jpg",
    separationGuide: [
      {
        simulant: "Zircon",
        properties: [
          { property: "RI / SG / Optics", diagnosticDifference: "Use standard gemological tests to separate Andradite Garnet from Zircon and other look-alikes listed in commonly mistaken materials." }
        ]
      }
    ]
  },
  {
    id: "mali_garnet",
    name: "Mali Garnet",
    species: "Grossular-Andradite",
    formula: "Ca aluminum-iron silicate",
    crystalSystem: "Cubic (Isometric)",
    color: "Yellow-green to brownish",
    refractiveIndex: "1.76–1.80",
    specificGravity: "3.65–3.70",
    hardness: "7",
    birefringence: "None (Isotropic)",
    opticCharacter: "Singly Refractive (Isotropic)",
    luster: "Vitreous",
    cleavage: "None",
    pleochroism: "None",
    diagnosticInclusions: ["See species notes", "Growth features vary by origin"],
    fluorescentReaction: "Variable; check LW/SW UV as part of standard screening.",
    authenticationTips: "Confirm with RI, SG, optic character, and magnification; rare stones often require advanced lab tests for origin/treatment.",
    description: "West African grossular-andradite mix; bright yellow-greens popular.",
    commonlyMistaken: ["Demantoid", "Sphene", "Chrysoberyl"],
    rare: false,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/c/c1/Andradite-Mali.jpg",
    separationGuide: [
      {
        simulant: "Demantoid",
        properties: [
          { property: "RI / SG / Optics", diagnosticDifference: "Use standard gemological tests to separate Mali Garnet from Demantoid and other look-alikes listed in commonly mistaken materials." }
        ]
      }
    ]
  },
  {
    id: "red_spinel",
    name: "Red Spinel",
    species: "Spinel",
    formula: "MgAl₂O₄",
    crystalSystem: "Cubic (Isometric)",
    color: "Red to pinkish-red",
    refractiveIndex: "1.718",
    specificGravity: "3.60",
    hardness: "8",
    birefringence: "None (Isotropic)",
    opticCharacter: "Singly Refractive (Isotropic)",
    luster: "Vitreous",
    cleavage: "None",
    pleochroism: "None",
    diagnosticInclusions: ["See species notes", "Growth features vary by origin"],
    fluorescentReaction: "Variable; check LW/SW UV as part of standard screening.",
    authenticationTips: "Confirm with RI, SG, optic character, and magnification; rare stones often require advanced lab tests for origin/treatment.",
    description: "Historic ruby look-alike; isotropic, octahedral crystals, no silk at 60°.",
    commonlyMistaken: ["Ruby", "Garnet", "Tourmaline"],
    rare: false,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/c/cb/Red_Spinel.jpg",
    separationGuide: [
      {
        simulant: "Ruby",
        properties: [
          { property: "RI / SG / Optics", diagnosticDifference: "Use standard gemological tests to separate Red Spinel from Ruby and other look-alikes listed in commonly mistaken materials." }
        ]
      }
    ]
  },
  {
    id: "blue_spinel",
    name: "Blue Spinel",
    species: "Spinel",
    formula: "MgAl₂O₄ (Fe, Co, Zn vary)",
    crystalSystem: "Cubic (Isometric)",
    color: "Blue to violet-blue",
    refractiveIndex: "1.71–1.73",
    specificGravity: "3.58–3.61",
    hardness: "8",
    birefringence: "None (Isotropic)",
    opticCharacter: "Singly Refractive (Isotropic)",
    luster: "Vitreous",
    cleavage: "None",
    pleochroism: "None",
    diagnosticInclusions: ["See species notes", "Growth features vary by origin"],
    fluorescentReaction: "Variable; check LW/SW UV as part of standard screening.",
    authenticationTips: "Confirm with RI, SG, optic character, and magnification; rare stones often require advanced lab tests for origin/treatment.",
    description: "Blue spinel; cobalt blues can be vivid—trade interest high.",
    commonlyMistaken: ["Sapphire", "Tanzanite", "Glass"],
    rare: false,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/5/54/Spinel-tn37a.jpg",
    separationGuide: [
      {
        simulant: "Sapphire",
        properties: [
          { property: "RI / SG / Optics", diagnosticDifference: "Use standard gemological tests to separate Blue Spinel from Sapphire and other look-alikes listed in commonly mistaken materials." }
        ]
      }
    ]
  },
  {
    id: "black_spinel",
    name: "Black Spinel",
    species: "Spinel",
    formula: "MgAl₂O₄ (opaque)",
    crystalSystem: "Cubic (Isometric)",
    color: "Black",
    refractiveIndex: "1.72",
    specificGravity: "3.60",
    hardness: "8",
    birefringence: "None (Isotropic)",
    opticCharacter: "Singly Refractive (Isotropic)",
    luster: "Vitreous to submetallic",
    cleavage: "None",
    pleochroism: "None",
    diagnosticInclusions: ["See species notes", "Growth features vary by origin"],
    fluorescentReaction: "Variable; check LW/SW UV as part of standard screening.",
    authenticationTips: "Confirm with RI, SG, optic character, and magnification; rare stones often require advanced lab tests for origin/treatment.",
    description: "Opaque black spinel jewelry stone; harder than many black simulants.",
    commonlyMistaken: ["Black Diamond", "Hematite", "Onyx"],
    rare: false,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/7/72/Spinel_%28Pleonaste%29_%2840945046743%29.jpg",
    separationGuide: [
      {
        simulant: "Black Diamond",
        properties: [
          { property: "RI / SG / Optics", diagnosticDifference: "Use standard gemological tests to separate Black Spinel from Black Diamond and other look-alikes listed in commonly mistaken materials." }
        ]
      }
    ]
  },
  {
    id: "cobalt_spinel",
    name: "Cobalt Blue Spinel",
    species: "Spinel",
    formula: "MgAl₂O₄ (Co)",
    crystalSystem: "Cubic (Isometric)",
    color: "Vivid cobalt blue",
    refractiveIndex: "1.71–1.72",
    specificGravity: "3.58–3.60",
    hardness: "8",
    birefringence: "None (Isotropic)",
    opticCharacter: "Singly Refractive (Isotropic)",
    luster: "Vitreous",
    cleavage: "None",
    pleochroism: "None",
    diagnosticInclusions: ["See species notes", "Growth features vary by origin"],
    fluorescentReaction: "Variable; check LW/SW UV as part of standard screening.",
    authenticationTips: "Confirm with RI, SG, optic character, and magnification; rare stones often require advanced lab tests for origin/treatment.",
    description: "Rare vivid Co-bearing blue spinel; chemistry distinguishes marketing claims.",
    commonlyMistaken: ["Sapphire", "Synthetic Spinel", "Glass"],
    rare: true,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/1/12/Spinel-200576.jpg",
    separationGuide: [
      {
        simulant: "Sapphire",
        properties: [
          { property: "RI / SG / Optics", diagnosticDifference: "Use standard gemological tests to separate Cobalt Blue Spinel from Sapphire and other look-alikes listed in commonly mistaken materials." }
        ]
      }
    ]
  },
  {
    id: "labradorite",
    name: "Labradorite",
    species: "Plagioclase Feldspar",
    formula: "(Ca,Na)AlSi₃O₈",
    crystalSystem: "Triclinic",
    color: "Gray with labradorescence (spectral flash)",
    refractiveIndex: "1.559–1.568",
    specificGravity: "2.69–2.70",
    hardness: "6–6.5",
    birefringence: "0.008–0.010",
    opticCharacter: "Doubly Refractive (Biaxial)",
    luster: "Vitreous",
    cleavage: "Perfect",
    pleochroism: "None",
    diagnosticInclusions: ["See species notes", "Growth features vary by origin"],
    fluorescentReaction: "Variable; check LW/SW UV as part of standard screening.",
    authenticationTips: "Confirm with RI, SG, optic character, and magnification; rare stones often require advanced lab tests for origin/treatment.",
    description: "Schiller labradorescence from lamellar structure; popular cabochon material.",
    commonlyMistaken: ["Moonstone", "Opal", "Glass"],
    rare: false,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Labradorite_polie_3%28Madagascar%29.jpg/3840px-Labradorite_polie_3%28Madagascar%29.jpg",
    separationGuide: [
      {
        simulant: "Moonstone",
        properties: [
          { property: "RI / SG / Optics", diagnosticDifference: "Use standard gemological tests to separate Labradorite from Moonstone and other look-alikes listed in commonly mistaken materials." }
        ]
      }
    ]
  },
  {
    id: "sunstone",
    name: "Sunstone (Oligoclase/Andesine)",
    species: "Plagioclase Feldspar",
    formula: "(Na,Ca)AlSi₃O₈",
    crystalSystem: "Triclinic",
    color: "Orange to red with aventurescence",
    refractiveIndex: "1.54–1.55",
    specificGravity: "2.64–2.66",
    hardness: "6–6.5",
    birefringence: "0.007–0.010",
    opticCharacter: "Doubly Refractive (Biaxial)",
    luster: "Vitreous",
    cleavage: "Perfect",
    pleochroism: "None",
    diagnosticInclusions: ["See species notes", "Growth features vary by origin"],
    fluorescentReaction: "Variable; check LW/SW UV as part of standard screening.",
    authenticationTips: "Confirm with RI, SG, optic character, and magnification; rare stones often require advanced lab tests for origin/treatment.",
    description: "Aventurescent feldspar with copper or hematite platelets.",
    commonlyMistaken: ["Glass Aventurine", "Carnelian", "Garnet"],
    rare: false,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/f/fc/Sunstone1.jpg",
    separationGuide: [
      {
        simulant: "Glass Aventurine",
        properties: [
          { property: "RI / SG / Optics", diagnosticDifference: "Use standard gemological tests to separate Sunstone (Oligoclase/Andesine) from Glass Aventurine and other look-alikes listed in commonly mistaken materials." }
        ]
      }
    ]
  },
  {
    id: "amazonite",
    name: "Amazonite",
    species: "Microcline Feldspar",
    formula: "KAlSi₃O₈",
    crystalSystem: "Triclinic",
    color: "Green to blue-green",
    refractiveIndex: "1.522–1.530",
    specificGravity: "2.56–2.58",
    hardness: "6–6.5",
    birefringence: "0.008",
    opticCharacter: "Doubly Refractive (Biaxial Negative)",
    luster: "Vitreous",
    cleavage: "Perfect",
    pleochroism: "None",
    diagnosticInclusions: ["See species notes", "Growth features vary by origin"],
    fluorescentReaction: "Variable; check LW/SW UV as part of standard screening.",
    authenticationTips: "Confirm with RI, SG, optic character, and magnification; rare stones often require advanced lab tests for origin/treatment.",
    description: "Green microcline; gridiron twinning under microscope.",
    commonlyMistaken: ["Jade", "Turquoise", "Chrysoprase"],
    rare: false,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/1/16/Amazonita1.jpeg",
    separationGuide: [
      {
        simulant: "Jade",
        properties: [
          { property: "RI / SG / Optics", diagnosticDifference: "Use standard gemological tests to separate Amazonite from Jade and other look-alikes listed in commonly mistaken materials." }
        ]
      }
    ]
  },
  {
    id: "orthoclase",
    name: "Orthoclase (Yellow)",
    species: "Potassium Feldspar",
    formula: "KAlSi₃O₈",
    crystalSystem: "Monoclinic",
    color: "Yellow to champagne",
    refractiveIndex: "1.518–1.526",
    specificGravity: "2.56",
    hardness: "6–6.5",
    birefringence: "0.005",
    opticCharacter: "Doubly Refractive (Biaxial Negative)",
    luster: "Vitreous",
    cleavage: "Perfect",
    pleochroism: "None",
    diagnosticInclusions: ["See species notes", "Growth features vary by origin"],
    fluorescentReaction: "Variable; check LW/SW UV as part of standard screening.",
    authenticationTips: "Confirm with RI, SG, optic character, and magnification; rare stones often require advanced lab tests for origin/treatment.",
    description: "Transparent yellow orthoclase gem; cleavage requires careful setting.",
    commonlyMistaken: ["Citrine", "Topaz", "Heliodor"],
    rare: false,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/9/97/Orthoclase.jpg",
    separationGuide: [
      {
        simulant: "Citrine",
        properties: [
          { property: "RI / SG / Optics", diagnosticDifference: "Use standard gemological tests to separate Orthoclase (Yellow) from Citrine and other look-alikes listed in commonly mistaken materials." }
        ]
      }
    ]
  },
  {
    id: "rose_quartz",
    name: "Rose Quartz",
    species: "Quartz",
    formula: "SiO₂",
    crystalSystem: "Trigonal",
    color: "Pink",
    refractiveIndex: "1.544–1.553",
    specificGravity: "2.65",
    hardness: "7",
    birefringence: "0.009",
    opticCharacter: "Doubly Refractive (Uniaxial Positive)",
    luster: "Vitreous",
    cleavage: "None",
    pleochroism: "None",
    diagnosticInclusions: ["See species notes", "Growth features vary by origin"],
    fluorescentReaction: "Variable; check LW/SW UV as part of standard screening.",
    authenticationTips: "Confirm with RI, SG, optic character, and magnification; rare stones often require advanced lab tests for origin/treatment.",
    description: "Translucent pink quartz; dumortierite or other causes of color debated.",
    commonlyMistaken: ["Kunzite", "Morganite", "Glass"],
    rare: false,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/0/01/Two_rose_quartz_cabocons_1.jpg",
    separationGuide: [
      {
        simulant: "Kunzite",
        properties: [
          { property: "RI / SG / Optics", diagnosticDifference: "Use standard gemological tests to separate Rose Quartz from Kunzite and other look-alikes listed in commonly mistaken materials." }
        ]
      }
    ]
  },
  {
    id: "smoky_quartz",
    name: "Smoky Quartz",
    species: "Quartz",
    formula: "SiO₂",
    crystalSystem: "Trigonal",
    color: "Brown to blackish-brown",
    refractiveIndex: "1.544–1.553",
    specificGravity: "2.65",
    hardness: "7",
    birefringence: "0.009",
    opticCharacter: "Doubly Refractive (Uniaxial Positive)",
    luster: "Vitreous",
    cleavage: "None",
    pleochroism: "None",
    diagnosticInclusions: ["See species notes", "Growth features vary by origin"],
    fluorescentReaction: "Variable; check LW/SW UV as part of standard screening.",
    authenticationTips: "Confirm with RI, SG, optic character, and magnification; rare stones often require advanced lab tests for origin/treatment.",
    description: "Color centers from irradiation (natural or treated).",
    commonlyMistaken: ["Andalusite", "Tourmaline", "Glass"],
    rare: false,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/3/32/Smoky-quartz-TUCQTZ09-03-arkenstone-irocks.png",
    separationGuide: [
      {
        simulant: "Andalusite",
        properties: [
          { property: "RI / SG / Optics", diagnosticDifference: "Use standard gemological tests to separate Smoky Quartz from Andalusite and other look-alikes listed in commonly mistaken materials." }
        ]
      }
    ]
  },
  {
    id: "rock_crystal",
    name: "Rock Crystal",
    species: "Quartz",
    formula: "SiO₂",
    crystalSystem: "Trigonal",
    color: "Colorless",
    refractiveIndex: "1.544–1.553",
    specificGravity: "2.65",
    hardness: "7",
    birefringence: "0.009",
    opticCharacter: "Doubly Refractive (Uniaxial Positive)",
    luster: "Vitreous",
    cleavage: "None",
    pleochroism: "None",
    diagnosticInclusions: ["See species notes", "Growth features vary by origin"],
    fluorescentReaction: "Variable; check LW/SW UV as part of standard screening.",
    authenticationTips: "Confirm with RI, SG, optic character, and magnification; rare stones often require advanced lab tests for origin/treatment.",
    description: "Colorless macrocrystalline quartz.",
    commonlyMistaken: ["Diamond", "Topaz", "Glass"],
    rare: false,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/c/ce/Quartz_Br%C3%A9sil.jpg",
    separationGuide: [
      {
        simulant: "Diamond",
        properties: [
          { property: "RI / SG / Optics", diagnosticDifference: "Use standard gemological tests to separate Rock Crystal from Diamond and other look-alikes listed in commonly mistaken materials." }
        ]
      }
    ]
  },
  {
    id: "rutilated_quartz",
    name: "Rutilated Quartz",
    species: "Quartz with rutile",
    formula: "SiO₂ + TiO₂ needles",
    crystalSystem: "Trigonal",
    color: "Colorless/smoky with gold needles",
    refractiveIndex: "1.544–1.553",
    specificGravity: "2.65–2.70",
    hardness: "7",
    birefringence: "0.009",
    opticCharacter: "Doubly Refractive (Uniaxial Positive)",
    luster: "Vitreous",
    cleavage: "None",
    pleochroism: "None",
    diagnosticInclusions: ["See species notes", "Growth features vary by origin"],
    fluorescentReaction: "Variable; check LW/SW UV as part of standard screening.",
    authenticationTips: "Confirm with RI, SG, optic character, and magnification; rare stones often require advanced lab tests for origin/treatment.",
    description: "Quartz host with oriented rutile needles—jewelry classic.",
    commonlyMistaken: ["Tourmalinated Quartz", "Glass"],
    rare: false,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/c/c5/Rutilated_quartz.jpg",
    separationGuide: [
      {
        simulant: "Tourmalinated Quartz",
        properties: [
          { property: "RI / SG / Optics", diagnosticDifference: "Use standard gemological tests to separate Rutilated Quartz from Tourmalinated Quartz and other look-alikes listed in commonly mistaken materials." }
        ]
      }
    ]
  },
  {
    id: "tiger_eye",
    name: "Tiger's-Eye",
    species: "Quartz (pseudomorph)",
    formula: "SiO₂ after crocidolite",
    crystalSystem: "Trigonal (aggregate)",
    color: "Golden-brown chatoyant",
    refractiveIndex: "1.54–1.55",
    specificGravity: "2.64–2.71",
    hardness: "6.5–7",
    birefringence: "Aggregate",
    opticCharacter: "Aggregate",
    luster: "Silky to vitreous",
    cleavage: "None",
    pleochroism: "None",
    diagnosticInclusions: ["See species notes", "Growth features vary by origin"],
    fluorescentReaction: "Variable; check LW/SW UV as part of standard screening.",
    authenticationTips: "Confirm with RI, SG, optic character, and magnification; rare stones often require advanced lab tests for origin/treatment.",
    description: "Chatoyant quartz after asbestos fibers; hawk's-eye is blue variant.",
    commonlyMistaken: ["Cat's-Eye Quartz", "Plastic"],
    rare: false,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/b/be/Tiger%27s_eye.jpg",
    separationGuide: [
      {
        simulant: "Cat's-Eye Quartz",
        properties: [
          { property: "RI / SG / Optics", diagnosticDifference: "Use standard gemological tests to separate Tiger's-Eye from Cat's-Eye Quartz and other look-alikes listed in commonly mistaken materials." }
        ]
      }
    ]
  },
  {
    id: "chrysoprase",
    name: "Chrysoprase",
    species: "Chalcedony",
    formula: "SiO₂ (Ni-colored)",
    crystalSystem: "Trigonal (microcrystalline)",
    color: "Apple green",
    refractiveIndex: "1.53–1.54",
    specificGravity: "2.58–2.64",
    hardness: "6.5–7",
    birefringence: "Aggregate",
    opticCharacter: "Aggregate",
    luster: "Waxy to vitreous",
    cleavage: "None",
    pleochroism: "None",
    diagnosticInclusions: ["See species notes", "Growth features vary by origin"],
    fluorescentReaction: "Variable; check LW/SW UV as part of standard screening.",
    authenticationTips: "Confirm with RI, SG, optic character, and magnification; rare stones often require advanced lab tests for origin/treatment.",
    description: "Ni-colored green chalcedony; can fade with heat/light in some material.",
    commonlyMistaken: ["Jade", "Prehnite", "Glass"],
    rare: false,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/2/2b/Chrysoprase_cabochon_1.jpg",
    separationGuide: [
      {
        simulant: "Jade",
        properties: [
          { property: "RI / SG / Optics", diagnosticDifference: "Use standard gemological tests to separate Chrysoprase from Jade and other look-alikes listed in commonly mistaken materials." }
        ]
      }
    ]
  },
  {
    id: "carnelian",
    name: "Carnelian",
    species: "Chalcedony",
    formula: "SiO₂ (Fe-colored)",
    crystalSystem: "Trigonal (microcrystalline)",
    color: "Orange to red-orange",
    refractiveIndex: "1.53–1.54",
    specificGravity: "2.58–2.64",
    hardness: "6.5–7",
    birefringence: "Aggregate",
    opticCharacter: "Aggregate",
    luster: "Waxy to vitreous",
    cleavage: "None",
    pleochroism: "None",
    diagnosticInclusions: ["See species notes", "Growth features vary by origin"],
    fluorescentReaction: "Variable; check LW/SW UV as part of standard screening.",
    authenticationTips: "Confirm with RI, SG, optic character, and magnification; rare stones often require advanced lab tests for origin/treatment.",
    description: "Translucent orange-red chalcedony; often heat-enhanced.",
    commonlyMistaken: ["Fire Opal", "Glass", "Garnet"],
    rare: false,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/e/e2/Carnelian.jpg",
    separationGuide: [
      {
        simulant: "Fire Opal",
        properties: [
          { property: "RI / SG / Optics", diagnosticDifference: "Use standard gemological tests to separate Carnelian from Fire Opal and other look-alikes listed in commonly mistaken materials." }
        ]
      }
    ]
  },
  {
    id: "onyx",
    name: "Onyx (Black)",
    species: "Chalcedony",
    formula: "SiO₂ (often dyed)",
    crystalSystem: "Trigonal (microcrystalline)",
    color: "Black (commonly dyed)",
    refractiveIndex: "1.53–1.54",
    specificGravity: "2.58–2.64",
    hardness: "6.5–7",
    birefringence: "Aggregate",
    opticCharacter: "Aggregate",
    luster: "Waxy to vitreous",
    cleavage: "None",
    pleochroism: "None",
    diagnosticInclusions: ["See species notes", "Growth features vary by origin"],
    fluorescentReaction: "Variable; check LW/SW UV as part of standard screening.",
    authenticationTips: "Confirm with RI, SG, optic character, and magnification; rare stones often require advanced lab tests for origin/treatment.",
    description: "Banded chalcedony; black onyx jewelry is frequently dyed.",
    commonlyMistaken: ["Black Spinel", "Obsidian", "Glass"],
    rare: false,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/8/80/Onyx.jpg",
    separationGuide: [
      {
        simulant: "Black Spinel",
        properties: [
          { property: "RI / SG / Optics", diagnosticDifference: "Use standard gemological tests to separate Onyx (Black) from Black Spinel and other look-alikes listed in commonly mistaken materials." }
        ]
      }
    ]
  },
  {
    id: "agate",
    name: "Agate",
    species: "Chalcedony",
    formula: "SiO₂",
    crystalSystem: "Trigonal (microcrystalline)",
    color: "Banded multicolor",
    refractiveIndex: "1.53–1.54",
    specificGravity: "2.60",
    hardness: "6.5–7",
    birefringence: "Aggregate",
    opticCharacter: "Aggregate",
    luster: "Waxy to vitreous",
    cleavage: "None",
    pleochroism: "None",
    diagnosticInclusions: ["See species notes", "Growth features vary by origin"],
    fluorescentReaction: "Variable; check LW/SW UV as part of standard screening.",
    authenticationTips: "Confirm with RI, SG, optic character, and magnification; rare stones often require advanced lab tests for origin/treatment.",
    description: "Concentric banded chalcedony; widely dyed for commerce.",
    commonlyMistaken: ["Jasper", "Glass"],
    rare: false,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/2/26/Malawi_Agate_%28Malawi%2C_southeastern_Africa%29_%2832734668126%29.jpg",
    separationGuide: [
      {
        simulant: "Jasper",
        properties: [
          { property: "RI / SG / Optics", diagnosticDifference: "Use standard gemological tests to separate Agate from Jasper and other look-alikes listed in commonly mistaken materials." }
        ]
      }
    ]
  },
  {
    id: "jasper",
    name: "Jasper",
    species: "Chalcedony (opaque)",
    formula: "SiO₂ + impurities",
    crystalSystem: "Trigonal (microcrystalline)",
    color: "Red, yellow, brown, multicolor",
    refractiveIndex: "1.54",
    specificGravity: "2.58–2.91",
    hardness: "6.5–7",
    birefringence: "Aggregate",
    opticCharacter: "Aggregate",
    luster: "Vitreous to dull",
    cleavage: "None",
    pleochroism: "None",
    diagnosticInclusions: ["See species notes", "Growth features vary by origin"],
    fluorescentReaction: "Variable; check LW/SW UV as part of standard screening.",
    authenticationTips: "Confirm with RI, SG, optic character, and magnification; rare stones often require advanced lab tests for origin/treatment.",
    description: "Opaque impure chalcedony; decorative cabochon material.",
    commonlyMistaken: ["Unakite", "Rhyolite"],
    rare: false,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/7/7c/Jasper_outcrop_in_the_Bucegi_Mountains.jpg",
    separationGuide: [
      {
        simulant: "Unakite",
        properties: [
          { property: "RI / SG / Optics", diagnosticDifference: "Use standard gemological tests to separate Jasper from Unakite and other look-alikes listed in commonly mistaken materials." }
        ]
      }
    ]
  },
  {
    id: "bloodstone",
    name: "Bloodstone (Heliotrope)",
    species: "Chalcedony",
    formula: "SiO₂ with Fe oxides",
    crystalSystem: "Trigonal (microcrystalline)",
    color: "Dark green with red spots",
    refractiveIndex: "1.53–1.54",
    specificGravity: "2.61",
    hardness: "6.5–7",
    birefringence: "Aggregate",
    opticCharacter: "Aggregate",
    luster: "Waxy to vitreous",
    cleavage: "None",
    pleochroism: "None",
    diagnosticInclusions: ["See species notes", "Growth features vary by origin"],
    fluorescentReaction: "Variable; check LW/SW UV as part of standard screening.",
    authenticationTips: "Confirm with RI, SG, optic character, and magnification; rare stones often require advanced lab tests for origin/treatment.",
    description: "Green chalcedony with red hematite spots; historic amulet stone.",
    commonlyMistaken: ["Jasper", "Glass"],
    rare: false,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/9/9e/Bloodstone_5.jpg",
    separationGuide: [
      {
        simulant: "Jasper",
        properties: [
          { property: "RI / SG / Optics", diagnosticDifference: "Use standard gemological tests to separate Bloodstone (Heliotrope) from Jasper and other look-alikes listed in commonly mistaken materials." }
        ]
      }
    ]
  },
  {
    id: "ametrine",
    name: "Ametrine",
    species: "Quartz",
    formula: "SiO₂",
    crystalSystem: "Trigonal",
    color: "Zoned purple and yellow",
    refractiveIndex: "1.544–1.553",
    specificGravity: "2.65",
    hardness: "7",
    birefringence: "0.009",
    opticCharacter: "Doubly Refractive (Uniaxial Positive)",
    luster: "Vitreous",
    cleavage: "None",
    pleochroism: "None",
    diagnosticInclusions: ["See species notes", "Growth features vary by origin"],
    fluorescentReaction: "Variable; check LW/SW UV as part of standard screening.",
    authenticationTips: "Confirm with RI, SG, optic character, and magnification; rare stones often require advanced lab tests for origin/treatment.",
    description: "Natural amethyst-citrine zoning (Bolivia classic); synthetic exists.",
    commonlyMistaken: ["Assembled doublets", "Glass"],
    rare: false,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/4/4c/Ametrine_cut.jpg",
    separationGuide: [
      {
        simulant: "Assembled doublets",
        properties: [
          { property: "RI / SG / Optics", diagnosticDifference: "Use standard gemological tests to separate Ametrine from Assembled doublets and other look-alikes listed in commonly mistaken materials." }
        ]
      }
    ]
  },
  {
    id: "aventurine",
    name: "Aventurine Quartz",
    species: "Quartz (aventurescent)",
    formula: "SiO₂ + mica/fuchsite",
    crystalSystem: "Trigonal",
    color: "Green (common) with sparkle",
    refractiveIndex: "1.54–1.55",
    specificGravity: "2.64–2.69",
    hardness: "7",
    birefringence: "0.009",
    opticCharacter: "Doubly Refractive (Uniaxial Positive)",
    luster: "Vitreous",
    cleavage: "None",
    pleochroism: "None",
    diagnosticInclusions: ["See species notes", "Growth features vary by origin"],
    fluorescentReaction: "Variable; check LW/SW UV as part of standard screening.",
    authenticationTips: "Confirm with RI, SG, optic character, and magnification; rare stones often require advanced lab tests for origin/treatment.",
    description: "Quartz with platy inclusions causing aventurescence.",
    commonlyMistaken: ["Jade", "Malachite glass", "Plastic"],
    rare: false,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/8/84/Aventurine.jpg",
    separationGuide: [
      {
        simulant: "Jade",
        properties: [
          { property: "RI / SG / Optics", diagnosticDifference: "Use standard gemological tests to separate Aventurine Quartz from Jade and other look-alikes listed in commonly mistaken materials." }
        ]
      }
    ]
  },
  {
    id: "prasiolite",
    name: "Prasiolite (Green Quartz)",
    species: "Quartz",
    formula: "SiO₂",
    crystalSystem: "Trigonal",
    color: "Leek green",
    refractiveIndex: "1.544–1.553",
    specificGravity: "2.65",
    hardness: "7",
    birefringence: "0.009",
    opticCharacter: "Doubly Refractive (Uniaxial Positive)",
    luster: "Vitreous",
    cleavage: "None",
    pleochroism: "None",
    diagnosticInclusions: ["See species notes", "Growth features vary by origin"],
    fluorescentReaction: "Variable; check LW/SW UV as part of standard screening.",
    authenticationTips: "Confirm with RI, SG, optic character, and magnification; rare stones often require advanced lab tests for origin/treatment.",
    description: "Green quartz, often heat-treated amethyst; not emerald.",
    commonlyMistaken: ["Emerald", "Tourmaline", "Glass"],
    rare: false,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/b/bf/Prasiolite_from_Poland.jpg",
    separationGuide: [
      {
        simulant: "Emerald",
        properties: [
          { property: "RI / SG / Optics", diagnosticDifference: "Use standard gemological tests to separate Prasiolite (Green Quartz) from Emerald and other look-alikes listed in commonly mistaken materials." }
        ]
      }
    ]
  },
  {
    id: "hiddenite",
    name: "Hiddenite",
    species: "Spodumene",
    formula: "LiAlSi₂O₆ (Cr)",
    crystalSystem: "Monoclinic",
    color: "Green",
    refractiveIndex: "1.660–1.676",
    specificGravity: "3.18",
    hardness: "6.5–7",
    birefringence: "0.014–0.016",
    opticCharacter: "Doubly Refractive (Biaxial Positive)",
    luster: "Vitreous",
    cleavage: "Perfect prismatic",
    pleochroism: "Strong",
    diagnosticInclusions: ["See species notes", "Growth features vary by origin"],
    fluorescentReaction: "Variable; check LW/SW UV as part of standard screening.",
    authenticationTips: "Confirm with RI, SG, optic character, and magnification; rare stones often require advanced lab tests for origin/treatment.",
    description: "Rare Cr-green spodumene; cleavage makes cutting/setting delicate.",
    commonlyMistaken: ["Emerald", "Tourmaline", "Diopside"],
    rare: true,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/1/10/Hiddenite.jpg",
    separationGuide: [
      {
        simulant: "Emerald",
        properties: [
          { property: "RI / SG / Optics", diagnosticDifference: "Use standard gemological tests to separate Hiddenite from Emerald and other look-alikes listed in commonly mistaken materials." }
        ]
      }
    ]
  },
  {
    id: "spodumene",
    name: "Spodumene (Yellow/Green)",
    species: "Spodumene",
    formula: "LiAlSi₂O₆",
    crystalSystem: "Monoclinic",
    color: "Yellow, green, colorless",
    refractiveIndex: "1.660–1.676",
    specificGravity: "3.18",
    hardness: "6.5–7",
    birefringence: "0.014–0.016",
    opticCharacter: "Doubly Refractive (Biaxial Positive)",
    luster: "Vitreous",
    cleavage: "Perfect prismatic",
    pleochroism: "Strong",
    diagnosticInclusions: ["See species notes", "Growth features vary by origin"],
    fluorescentReaction: "Variable; check LW/SW UV as part of standard screening.",
    authenticationTips: "Confirm with RI, SG, optic character, and magnification; rare stones often require advanced lab tests for origin/treatment.",
    description: "Li pyroxene family including kunzite/hiddenite; strong pleochroism.",
    commonlyMistaken: ["Topaz", "Beryl", "Quartz"],
    rare: false,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/4/4c/Spodumene.jpg",
    separationGuide: [
      {
        simulant: "Topaz",
        properties: [
          { property: "RI / SG / Optics", diagnosticDifference: "Use standard gemological tests to separate Spodumene (Yellow/Green) from Topaz and other look-alikes listed in commonly mistaken materials." }
        ]
      }
    ]
  },
  {
    id: "sphene",
    name: "Sphene (Titanite)",
    species: "Titanite",
    formula: "CaTiSiO₅",
    crystalSystem: "Monoclinic",
    color: "Yellow, green, brown",
    refractiveIndex: "1.880–2.050",
    specificGravity: "3.52–3.54",
    hardness: "5–5.5",
    birefringence: "0.100–0.135",
    opticCharacter: "Doubly Refractive (Biaxial Positive)",
    luster: "Adamantine to resinous",
    cleavage: "Distinct",
    pleochroism: "Strong",
    diagnosticInclusions: ["See species notes", "Growth features vary by origin"],
    fluorescentReaction: "Variable; check LW/SW UV as part of standard screening.",
    authenticationTips: "Confirm with RI, SG, optic character, and magnification; rare stones often require advanced lab tests for origin/treatment.",
    description: "Extreme birefringence and fire; soft for daily wear rings.",
    commonlyMistaken: ["Diamond", "Zircon", "Demantoid"],
    rare: false,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/f/fc/Titanite%2C_Albite%2C_Epidote%2C_Minas_Gerais%2C_Brazil-8799.jpg",
    separationGuide: [
      {
        simulant: "Diamond",
        properties: [
          { property: "RI / SG / Optics", diagnosticDifference: "Use standard gemological tests to separate Sphene (Titanite) from Diamond and other look-alikes listed in commonly mistaken materials." }
        ]
      }
    ]
  },
  {
    id: "andalusite",
    name: "Andalusite",
    species: "Andalusite",
    formula: "Al₂SiO₅",
    crystalSystem: "Orthorhombic",
    color: "Brown-green-red trichroic",
    refractiveIndex: "1.634–1.643",
    specificGravity: "3.17",
    hardness: "7–7.5",
    birefringence: "0.009–0.010",
    opticCharacter: "Doubly Refractive (Biaxial Negative)",
    luster: "Vitreous",
    cleavage: "Distinct",
    pleochroism: "Very strong trichroism",
    diagnosticInclusions: ["See species notes", "Growth features vary by origin"],
    fluorescentReaction: "Variable; check LW/SW UV as part of standard screening.",
    authenticationTips: "Confirm with RI, SG, optic character, and magnification; rare stones often require advanced lab tests for origin/treatment.",
    description: "Strong trichroism shows multiple colors face-up.",
    commonlyMistaken: ["Tourmaline", "Smoky Quartz", "Alexandrite"],
    rare: false,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Andalusite_-_Malacheta%2C_Minas_Gerais%2C_Brazil.jpg/3840px-Andalusite_-_Malacheta%2C_Minas_Gerais%2C_Brazil.jpg",
    separationGuide: [
      {
        simulant: "Tourmaline",
        properties: [
          { property: "RI / SG / Optics", diagnosticDifference: "Use standard gemological tests to separate Andalusite from Tourmaline and other look-alikes listed in commonly mistaken materials." }
        ]
      }
    ]
  },
  {
    id: "kyanite",
    name: "Kyanite",
    species: "Kyanite",
    formula: "Al₂SiO₅",
    crystalSystem: "Triclinic",
    color: "Blue to green-blue",
    refractiveIndex: "1.710–1.734",
    specificGravity: "3.65–3.68",
    hardness: "4–7 (anisotropic)",
    birefringence: "0.012–0.017",
    opticCharacter: "Doubly Refractive (Biaxial Negative)",
    luster: "Vitreous",
    cleavage: "Perfect",
    pleochroism: "Strong",
    diagnosticInclusions: ["See species notes", "Growth features vary by origin"],
    fluorescentReaction: "Variable; check LW/SW UV as part of standard screening.",
    authenticationTips: "Confirm with RI, SG, optic character, and magnification; rare stones often require advanced lab tests for origin/treatment.",
    description: "Hardness varies by direction; cleavage; vivid blue blades.",
    commonlyMistaken: ["Sapphire", "Tanzanite", "Iolite"],
    rare: false,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/0/00/Kyanite_crystals.jpg",
    separationGuide: [
      {
        simulant: "Sapphire",
        properties: [
          { property: "RI / SG / Optics", diagnosticDifference: "Use standard gemological tests to separate Kyanite from Sapphire and other look-alikes listed in commonly mistaken materials." }
        ]
      }
    ]
  },
  {
    id: "sillimanite",
    name: "Sillimanite (Fibrolite)",
    species: "Sillimanite",
    formula: "Al₂SiO₅",
    crystalSystem: "Orthorhombic",
    color: "Colorless, yellow, blue-gray, chatoyant",
    refractiveIndex: "1.654–1.673",
    specificGravity: "3.24",
    hardness: "6.5–7.5",
    birefringence: "0.014–0.021",
    opticCharacter: "Doubly Refractive (Biaxial Positive)",
    luster: "Vitreous to silky",
    cleavage: "Perfect",
    pleochroism: "Moderate",
    diagnosticInclusions: ["See species notes", "Growth features vary by origin"],
    fluorescentReaction: "Variable; check LW/SW UV as part of standard screening.",
    authenticationTips: "Confirm with RI, SG, optic character, and magnification; rare stones often require advanced lab tests for origin/treatment.",
    description: "Often fibrous; cat's-eye possible; metamorphic aluminum silicate.",
    commonlyMistaken: ["Quartz Cat's-Eye", "Tourmaline"],
    rare: false,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/7/73/Sillimanite.jpg",
    separationGuide: [
      {
        simulant: "Quartz Cat's-Eye",
        properties: [
          { property: "RI / SG / Optics", diagnosticDifference: "Use standard gemological tests to separate Sillimanite (Fibrolite) from Quartz Cat's-Eye and other look-alikes listed in commonly mistaken materials." }
        ]
      }
    ]
  },
  {
    id: "diopside",
    name: "Diopside",
    species: "Diopside",
    formula: "CaMgSi₂O₆",
    crystalSystem: "Monoclinic",
    color: "Green to brownish-green",
    refractiveIndex: "1.664–1.730",
    specificGravity: "3.22–3.38",
    hardness: "5.5–6.5",
    birefringence: "0.024–0.030",
    opticCharacter: "Doubly Refractive (Biaxial Positive)",
    luster: "Vitreous",
    cleavage: "Perfect prismatic",
    pleochroism: "Moderate",
    diagnosticInclusions: ["See species notes", "Growth features vary by origin"],
    fluorescentReaction: "Variable; check LW/SW UV as part of standard screening.",
    authenticationTips: "Confirm with RI, SG, optic character, and magnification; rare stones often require advanced lab tests for origin/treatment.",
    description: "Clinopyroxene; chrome diopside is the vivid green gem variety.",
    commonlyMistaken: ["Emerald", "Tourmaline", "Tsavorite"],
    rare: false,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/0/00/Chrome_diopside_and_quartz_%28GeoDIL_number_-_990%29.jpg",
    separationGuide: [
      {
        simulant: "Emerald",
        properties: [
          { property: "RI / SG / Optics", diagnosticDifference: "Use standard gemological tests to separate Diopside from Emerald and other look-alikes listed in commonly mistaken materials." }
        ]
      }
    ]
  },
  {
    id: "enstatite",
    name: "Enstatite",
    species: "Enstatite",
    formula: "Mg₂Si₂O₆",
    crystalSystem: "Orthorhombic",
    color: "Brown, green, colorless",
    refractiveIndex: "1.650–1.680",
    specificGravity: "3.20–3.30",
    hardness: "5–6",
    birefringence: "0.009–0.012",
    opticCharacter: "Doubly Refractive (Biaxial Positive)",
    luster: "Vitreous",
    cleavage: "Good",
    pleochroism: "Moderate",
    diagnosticInclusions: ["See species notes", "Growth features vary by origin"],
    fluorescentReaction: "Variable; check LW/SW UV as part of standard screening.",
    authenticationTips: "Confirm with RI, SG, optic character, and magnification; rare stones often require advanced lab tests for origin/treatment.",
    description: "Orthopyroxene gem; less common in jewelry.",
    commonlyMistaken: ["Diopside", "Tourmaline"],
    rare: false,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/e/e5/Enstatite.jpg",
    separationGuide: [
      {
        simulant: "Diopside",
        properties: [
          { property: "RI / SG / Optics", diagnosticDifference: "Use standard gemological tests to separate Enstatite from Diopside and other look-alikes listed in commonly mistaken materials." }
        ]
      }
    ]
  },
  {
    id: "prehnite",
    name: "Prehnite",
    species: "Prehnite",
    formula: "Ca₂Al₂Si₃O₁₀(OH)₂",
    crystalSystem: "Orthorhombic",
    color: "Yellow-green to green",
    refractiveIndex: "1.611–1.669",
    specificGravity: "2.80–2.95",
    hardness: "6–6.5",
    birefringence: "0.021–0.033",
    opticCharacter: "Doubly Refractive (Biaxial Positive)",
    luster: "Vitreous to waxy",
    cleavage: "Distinct",
    pleochroism: "Weak",
    diagnosticInclusions: ["See species notes", "Growth features vary by origin"],
    fluorescentReaction: "Variable; check LW/SW UV as part of standard screening.",
    authenticationTips: "Confirm with RI, SG, optic character, and magnification; rare stones often require advanced lab tests for origin/treatment.",
    description: "Translucent green botryoidal material popular in beads/cabs.",
    commonlyMistaken: ["Chrysoprase", "Jade", "Serpentine"],
    rare: false,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Prehnite_-_Southbury%2C_Connecticut%2C_USA.jpg/3840px-Prehnite_-_Southbury%2C_Connecticut%2C_USA.jpg",
    separationGuide: [
      {
        simulant: "Chrysoprase",
        properties: [
          { property: "RI / SG / Optics", diagnosticDifference: "Use standard gemological tests to separate Prehnite from Chrysoprase and other look-alikes listed in commonly mistaken materials." }
        ]
      }
    ]
  },
  {
    id: "epidote",
    name: "Epidote",
    species: "Epidote",
    formula: "Ca₂(Al,Fe)₃Si₃O₁₂(OH)",
    crystalSystem: "Monoclinic",
    color: "Pistachio green to brown",
    refractiveIndex: "1.715–1.797",
    specificGravity: "3.3–3.5",
    hardness: "6–7",
    birefringence: "0.015–0.049",
    opticCharacter: "Doubly Refractive (Biaxial Negative)",
    luster: "Vitreous",
    cleavage: "Perfect",
    pleochroism: "Strong",
    diagnosticInclusions: ["See species notes", "Growth features vary by origin"],
    fluorescentReaction: "Variable; check LW/SW UV as part of standard screening.",
    authenticationTips: "Confirm with RI, SG, optic character, and magnification; rare stones often require advanced lab tests for origin/treatment.",
    description: "Strong pleochroism; deep green crystals more collector than jewelry.",
    commonlyMistaken: ["Tourmaline", "Diopside"],
    rare: false,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/6/66/Epidote.jpg",
    separationGuide: [
      {
        simulant: "Tourmaline",
        properties: [
          { property: "RI / SG / Optics", diagnosticDifference: "Use standard gemological tests to separate Epidote from Tourmaline and other look-alikes listed in commonly mistaken materials." }
        ]
      }
    ]
  },
  {
    id: "vesuvianite",
    name: "Vesuvianite (Idocrase)",
    species: "Vesuvianite",
    formula: "Complex Ca-Al silicate",
    crystalSystem: "Tetragonal",
    color: "Green, yellow-green, brown, purple",
    refractiveIndex: "1.702–1.736",
    specificGravity: "3.32–3.47",
    hardness: "6.5",
    birefringence: "0.001–0.012",
    opticCharacter: "Doubly Refractive (Uniaxial or anomalous)",
    luster: "Vitreous",
    cleavage: "Poor",
    pleochroism: "Weak to moderate",
    diagnosticInclusions: ["See species notes", "Growth features vary by origin"],
    fluorescentReaction: "Variable; check LW/SW UV as part of standard screening.",
    authenticationTips: "Confirm with RI, SG, optic character, and magnification; rare stones often require advanced lab tests for origin/treatment.",
    description: "Can mimic jade/emerald colors; RI higher than jade.",
    commonlyMistaken: ["Jade", "Grossular", "Tourmaline"],
    rare: false,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/9/90/Vesuvianite.jpg",
    separationGuide: [
      {
        simulant: "Jade",
        properties: [
          { property: "RI / SG / Optics", diagnosticDifference: "Use standard gemological tests to separate Vesuvianite (Idocrase) from Jade and other look-alikes listed in commonly mistaken materials." }
        ]
      }
    ]
  },
  {
    id: "scapolite",
    name: "Scapolite",
    species: "Scapolite series",
    formula: "Complex Na-Ca aluminosilicate",
    crystalSystem: "Tetragonal",
    color: "Yellow, purple, colorless, pink",
    refractiveIndex: "1.540–1.580",
    specificGravity: "2.57–2.74",
    hardness: "5.5–6",
    birefringence: "0.006–0.037",
    opticCharacter: "Doubly Refractive (Uniaxial Negative)",
    luster: "Vitreous",
    cleavage: "Good",
    pleochroism: "Moderate to strong",
    diagnosticInclusions: ["See species notes", "Growth features vary by origin"],
    fluorescentReaction: "Variable; check LW/SW UV as part of standard screening.",
    authenticationTips: "Confirm with RI, SG, optic character, and magnification; rare stones often require advanced lab tests for origin/treatment.",
    description: "Cat's-eye and purple scapolite appear in trade; cleavage care.",
    commonlyMistaken: ["Amethyst", "Kunzite", "Quartz"],
    rare: false,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/9/99/Scapolite.jpg",
    separationGuide: [
      {
        simulant: "Amethyst",
        properties: [
          { property: "RI / SG / Optics", diagnosticDifference: "Use standard gemological tests to separate Scapolite from Amethyst and other look-alikes listed in commonly mistaken materials." }
        ]
      }
    ]
  },
  {
    id: "danburite",
    name: "Danburite",
    species: "Danburite",
    formula: "CaB₂Si₂O₈",
    crystalSystem: "Orthorhombic",
    color: "Colorless to pale yellow/pink",
    refractiveIndex: "1.630–1.636",
    specificGravity: "3.00",
    hardness: "7–7.5",
    birefringence: "0.006",
    opticCharacter: "Doubly Refractive (Biaxial Negative)",
    luster: "Vitreous to greasy",
    cleavage: "Poor",
    pleochroism: "Weak",
    diagnosticInclusions: ["See species notes", "Growth features vary by origin"],
    fluorescentReaction: "Variable; check LW/SW UV as part of standard screening.",
    authenticationTips: "Confirm with RI, SG, optic character, and magnification; rare stones often require advanced lab tests for origin/treatment.",
    description: "Hard colorless stone sometimes used as diamond alternative.",
    commonlyMistaken: ["Topaz", "Quartz", "Diamond"],
    rare: false,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/c/c7/Danburite-162634.jpg",
    separationGuide: [
      {
        simulant: "Topaz",
        properties: [
          { property: "RI / SG / Optics", diagnosticDifference: "Use standard gemological tests to separate Danburite from Topaz and other look-alikes listed in commonly mistaken materials." }
        ]
      }
    ]
  },
  {
    id: "phenakite",
    name: "Phenakite",
    species: "Phenakite",
    formula: "Be₂SiO₄",
    crystalSystem: "Trigonal",
    color: "Colorless, pale yellow/pink",
    refractiveIndex: "1.654–1.670",
    specificGravity: "2.95–2.97",
    hardness: "7.5–8",
    birefringence: "0.016",
    opticCharacter: "Doubly Refractive (Uniaxial Positive)",
    luster: "Vitreous",
    cleavage: "Distinct",
    pleochroism: "None",
    diagnosticInclusions: ["See species notes", "Growth features vary by origin"],
    fluorescentReaction: "Variable; check LW/SW UV as part of standard screening.",
    authenticationTips: "Confirm with RI, SG, optic character, and magnification; rare stones often require advanced lab tests for origin/treatment.",
    description: "Rare hard beryllium silicate; high brilliance for size.",
    commonlyMistaken: ["Diamond", "Topaz", "Quartz"],
    rare: true,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/4/4c/Phenakite.jpg",
    separationGuide: [
      {
        simulant: "Diamond",
        properties: [
          { property: "RI / SG / Optics", diagnosticDifference: "Use standard gemological tests to separate Phenakite from Diamond and other look-alikes listed in commonly mistaken materials." }
        ]
      }
    ]
  },
  {
    id: "brazilianite",
    name: "Brazilianite",
    species: "Brazilianite",
    formula: "NaAl₃(PO₄)₂(OH)₄",
    crystalSystem: "Monoclinic",
    color: "Yellow-green",
    refractiveIndex: "1.602–1.623",
    specificGravity: "2.98–2.99",
    hardness: "5.5",
    birefringence: "0.019–0.021",
    opticCharacter: "Doubly Refractive (Biaxial Positive)",
    luster: "Vitreous",
    cleavage: "Perfect",
    pleochroism: "Weak",
    diagnosticInclusions: ["See species notes", "Growth features vary by origin"],
    fluorescentReaction: "Variable; check LW/SW UV as part of standard screening.",
    authenticationTips: "Confirm with RI, SG, optic character, and magnification; rare stones often require advanced lab tests for origin/treatment.",
    description: "Bright yellow-green phosphate; soft cleavage—pendant use safer.",
    commonlyMistaken: ["Chrysoberyl", "Heliodor", "Peridot"],
    rare: false,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/9/91/Mus%C3%A9um_de_Nantes_-_022_-_Brazilianite_%28Br%C3%A9sil%29.jpg",
    separationGuide: [
      {
        simulant: "Chrysoberyl",
        properties: [
          { property: "RI / SG / Optics", diagnosticDifference: "Use standard gemological tests to separate Brazilianite from Chrysoberyl and other look-alikes listed in commonly mistaken materials." }
        ]
      }
    ]
  },
  {
    id: "amblygonite",
    name: "Amblygonite",
    species: "Amblygonite-Montebrasite",
    formula: "LiAlPO₄(F,OH)",
    crystalSystem: "Triclinic",
    color: "Yellow, green, colorless",
    refractiveIndex: "1.578–1.646",
    specificGravity: "3.01–3.11",
    hardness: "5.5–6",
    birefringence: "0.020–0.027",
    opticCharacter: "Doubly Refractive (Biaxial)",
    luster: "Vitreous to greasy",
    cleavage: "Perfect",
    pleochroism: "Weak",
    diagnosticInclusions: ["See species notes", "Growth features vary by origin"],
    fluorescentReaction: "Variable; check LW/SW UV as part of standard screening.",
    authenticationTips: "Confirm with RI, SG, optic character, and magnification; rare stones often require advanced lab tests for origin/treatment.",
    description: "Li phosphate gem; sensitive to ultrasonic/heat.",
    commonlyMistaken: ["Brazilianite", "Topaz"],
    rare: false,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/d/d0/Amblygonite-mun05-37b.jpg",
    separationGuide: [
      {
        simulant: "Brazilianite",
        properties: [
          { property: "RI / SG / Optics", diagnosticDifference: "Use standard gemological tests to separate Amblygonite from Brazilianite and other look-alikes listed in commonly mistaken materials." }
        ]
      }
    ]
  },
  {
    id: "apatite_neon",
    name: "Neon Blue Apatite",
    species: "Apatite",
    formula: "Ca₅(PO₄)₃(F,Cl,OH)",
    crystalSystem: "Hexagonal",
    color: "Neon blue to green-blue",
    refractiveIndex: "1.632–1.646",
    specificGravity: "3.16–3.23",
    hardness: "5",
    birefringence: "0.002–0.008",
    opticCharacter: "Doubly Refractive (Uniaxial Negative)",
    luster: "Vitreous",
    cleavage: "Indistinct",
    pleochroism: "Moderate to strong",
    diagnosticInclusions: ["See species notes", "Growth features vary by origin"],
    fluorescentReaction: "Variable; check LW/SW UV as part of standard screening.",
    authenticationTips: "Confirm with RI, SG, optic character, and magnification; rare stones often require advanced lab tests for origin/treatment.",
    description: "Vivid blue apatite can imitate Paraíba; softer hardness 5.",
    commonlyMistaken: ["Paraíba Tourmaline", "Aquamarine", "Glass"],
    rare: false,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/e/e4/Apatite_crystal_%28GeoDIL_number_-_23%29.jpg",
    separationGuide: [
      {
        simulant: "Paraíba Tourmaline",
        properties: [
          { property: "RI / SG / Optics", diagnosticDifference: "Use standard gemological tests to separate Neon Blue Apatite from Paraíba Tourmaline and other look-alikes listed in commonly mistaken materials." }
        ]
      }
    ]
  },
  {
    id: "fluorite",
    name: "Fluorite",
    species: "Fluorite",
    formula: "CaF₂",
    crystalSystem: "Cubic (Isometric)",
    color: "Purple, green, blue, yellow, colorless",
    refractiveIndex: "1.434",
    specificGravity: "3.18",
    hardness: "4",
    birefringence: "None (Isotropic)",
    opticCharacter: "Singly Refractive (Isotropic)",
    luster: "Vitreous",
    cleavage: "Perfect octahedral",
    pleochroism: "None",
    diagnosticInclusions: ["See species notes", "Growth features vary by origin"],
    fluorescentReaction: "Variable; check LW/SW UV as part of standard screening.",
    authenticationTips: "Confirm with RI, SG, optic character, and magnification; rare stones often require advanced lab tests for origin/treatment.",
    description: "Soft perfect cleavage; fluorescence common; collector more than ring stone.",
    commonlyMistaken: ["Amethyst", "Glass", "Beryl"],
    rare: false,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/0/0d/3192M-fluorite1.jpg",
    separationGuide: [
      {
        simulant: "Amethyst",
        properties: [
          { property: "RI / SG / Optics", diagnosticDifference: "Use standard gemological tests to separate Fluorite from Amethyst and other look-alikes listed in commonly mistaken materials." }
        ]
      }
    ]
  },
  {
    id: "calcite",
    name: "Calcite (Optical)",
    species: "Calcite",
    formula: "CaCO₃",
    crystalSystem: "Trigonal",
    color: "Colorless (Iceland spar) and colors",
    refractiveIndex: "1.486–1.658",
    specificGravity: "2.71",
    hardness: "3",
    birefringence: "0.172",
    opticCharacter: "Doubly Refractive (Uniaxial Negative)",
    luster: "Vitreous",
    cleavage: "Perfect rhombohedral",
    pleochroism: "None",
    diagnosticInclusions: ["See species notes", "Growth features vary by origin"],
    fluorescentReaction: "Variable; check LW/SW UV as part of standard screening.",
    authenticationTips: "Confirm with RI, SG, optic character, and magnification; rare stones often require advanced lab tests for origin/treatment.",
    description: "Extreme birefringence (double image); soft—tool stone not jewelry.",
    commonlyMistaken: ["Quartz", "Glass"],
    rare: false,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Iceland_spar.jpg/640px-Iceland_spar.jpg",
    separationGuide: [
      {
        simulant: "Quartz",
        properties: [
          { property: "RI / SG / Optics", diagnosticDifference: "Use standard gemological tests to separate Calcite (Optical) from Quartz and other look-alikes listed in commonly mistaken materials." }
        ]
      }
    ]
  },
  {
    id: "malachite",
    name: "Malachite",
    species: "Malachite",
    formula: "Cu₂CO₃(OH)₂",
    crystalSystem: "Monoclinic",
    color: "Banded green",
    refractiveIndex: "1.655–1.909",
    specificGravity: "3.6–4.0",
    hardness: "3.5–4",
    birefringence: "0.125",
    opticCharacter: "Doubly Refractive (Biaxial)",
    luster: "Silky to adamantine",
    cleavage: "Perfect",
    pleochroism: "Strong",
    diagnosticInclusions: ["See species notes", "Growth features vary by origin"],
    fluorescentReaction: "Variable; check LW/SW UV as part of standard screening.",
    authenticationTips: "Confirm with RI, SG, optic character, and magnification; rare stones often require advanced lab tests for origin/treatment.",
    description: "Banded copper carbonate; soft; acid sensitive; often stabilized.",
    commonlyMistaken: ["Chrysocolla", "Glass", "Plastic"],
    rare: false,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/5/55/Malachite%2C_Zaire.jpg",
    separationGuide: [
      {
        simulant: "Chrysocolla",
        properties: [
          { property: "RI / SG / Optics", diagnosticDifference: "Use standard gemological tests to separate Malachite from Chrysocolla and other look-alikes listed in commonly mistaken materials." }
        ]
      }
    ]
  },
  {
    id: "azurite",
    name: "Azurite",
    species: "Azurite",
    formula: "Cu₃(CO₃)₂(OH)₂",
    crystalSystem: "Monoclinic",
    color: "Deep blue",
    refractiveIndex: "1.730–1.838",
    specificGravity: "3.77",
    hardness: "3.5–4",
    birefringence: "0.11",
    opticCharacter: "Doubly Refractive (Biaxial)",
    luster: "Vitreous to adamantine",
    cleavage: "Perfect",
    pleochroism: "Strong",
    diagnosticInclusions: ["See species notes", "Growth features vary by origin"],
    fluorescentReaction: "Variable; check LW/SW UV as part of standard screening.",
    authenticationTips: "Confirm with RI, SG, optic character, and magnification; rare stones often require advanced lab tests for origin/treatment.",
    description: "Deep blue copper carbonate; soft and unstable to handling/heat.",
    commonlyMistaken: ["Lapis", "Sodalite", "Glass"],
    rare: false,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/8/8a/Azurite.jpg",
    separationGuide: [
      {
        simulant: "Lapis",
        properties: [
          { property: "RI / SG / Optics", diagnosticDifference: "Use standard gemological tests to separate Azurite from Lapis and other look-alikes listed in commonly mistaken materials." }
        ]
      }
    ]
  },
  {
    id: "chrysocolla",
    name: "Chrysocolla",
    species: "Chrysocolla (often mixed)",
    formula: "Cu silicate hydrate",
    crystalSystem: "Orthorhombic / amorphous mix",
    color: "Blue-green",
    refractiveIndex: "1.46–1.57",
    specificGravity: "2.0–2.4",
    hardness: "2–4",
    birefringence: "Variable",
    opticCharacter: "Aggregate",
    luster: "Vitreous to earthy",
    cleavage: "None",
    pleochroism: "None",
    diagnosticInclusions: ["See species notes", "Growth features vary by origin"],
    fluorescentReaction: "Variable; check LW/SW UV as part of standard screening.",
    authenticationTips: "Confirm with RI, SG, optic character, and magnification; rare stones often require advanced lab tests for origin/treatment.",
    description: "Soft copper silicate; gem use usually as chalcedony-stabilized material.",
    commonlyMistaken: ["Turquoise", "Malachite", "Glass"],
    rare: false,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/e/ee/Chrysocolla-230109.jpg",
    separationGuide: [
      {
        simulant: "Turquoise",
        properties: [
          { property: "RI / SG / Optics", diagnosticDifference: "Use standard gemological tests to separate Chrysocolla from Turquoise and other look-alikes listed in commonly mistaken materials." }
        ]
      }
    ]
  },
  {
    id: "rhodochrosite",
    name: "Rhodochrosite",
    species: "Rhodochrosite",
    formula: "MnCO₃",
    crystalSystem: "Trigonal",
    color: "Pink to red banded",
    refractiveIndex: "1.597–1.817",
    specificGravity: "3.45–3.70",
    hardness: "3.5–4",
    birefringence: "0.22",
    opticCharacter: "Doubly Refractive (Uniaxial Negative)",
    luster: "Vitreous",
    cleavage: "Perfect",
    pleochroism: "None",
    diagnosticInclusions: ["See species notes", "Growth features vary by origin"],
    fluorescentReaction: "Variable; check LW/SW UV as part of standard screening.",
    authenticationTips: "Confirm with RI, SG, optic character, and magnification; rare stones often require advanced lab tests for origin/treatment.",
    description: "Banded pink manganese carbonate; soft cleavage.",
    commonlyMistaken: ["Rhodonite", "Opal", "Glass"],
    rare: false,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Rhodochrosite_on_Matrix_-_Peru.jpg/3840px-Rhodochrosite_on_Matrix_-_Peru.jpg",
    separationGuide: [
      {
        simulant: "Rhodonite",
        properties: [
          { property: "RI / SG / Optics", diagnosticDifference: "Use standard gemological tests to separate Rhodochrosite from Rhodonite and other look-alikes listed in commonly mistaken materials." }
        ]
      }
    ]
  },
  {
    id: "rhodonite",
    name: "Rhodonite",
    species: "Rhodonite",
    formula: "MnSiO₃",
    crystalSystem: "Triclinic",
    color: "Pink with black veins",
    refractiveIndex: "1.716–1.752",
    specificGravity: "3.57–3.76",
    hardness: "5.5–6.5",
    birefringence: "0.011–0.014",
    opticCharacter: "Doubly Refractive (Biaxial)",
    luster: "Vitreous",
    cleavage: "Perfect",
    pleochroism: "None",
    diagnosticInclusions: ["See species notes", "Growth features vary by origin"],
    fluorescentReaction: "Variable; check LW/SW UV as part of standard screening.",
    authenticationTips: "Confirm with RI, SG, optic character, and magnification; rare stones often require advanced lab tests for origin/treatment.",
    description: "Pink manganese silicate with black manganese oxide veins.",
    commonlyMistaken: ["Rhodochrosite", "Thulite", "Glass"],
    rare: false,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/9/9e/Rhodonite.jpg",
    separationGuide: [
      {
        simulant: "Rhodochrosite",
        properties: [
          { property: "RI / SG / Optics", diagnosticDifference: "Use standard gemological tests to separate Rhodonite from Rhodochrosite and other look-alikes listed in commonly mistaken materials." }
        ]
      }
    ]
  },
  {
    id: "serpentine",
    name: "Serpentine (Bowenite)",
    species: "Serpentine group",
    formula: "Mg silicate hydrate",
    crystalSystem: "Monoclinic (group)",
    color: "Green to yellow-green",
    refractiveIndex: "1.56–1.57",
    specificGravity: "2.44–2.62",
    hardness: "2.5–5.5",
    birefringence: "Variable",
    opticCharacter: "Aggregate",
    luster: "Waxy to greasy",
    cleavage: "None",
    pleochroism: "None",
    diagnosticInclusions: ["See species notes", "Growth features vary by origin"],
    fluorescentReaction: "Variable; check LW/SW UV as part of standard screening.",
    authenticationTips: "Confirm with RI, SG, optic character, and magnification; rare stones often require advanced lab tests for origin/treatment.",
    description: "Common jade simulant; lower hardness/RI than jadeite.",
    commonlyMistaken: ["Jadeite", "Nephrite", "Chrysoprase"],
    rare: false,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/0/0b/Serpentine.jpg",
    separationGuide: [
      {
        simulant: "Jadeite",
        properties: [
          { property: "RI / SG / Optics", diagnosticDifference: "Use standard gemological tests to separate Serpentine (Bowenite) from Jadeite and other look-alikes listed in commonly mistaken materials." }
        ]
      }
    ]
  },
  {
    id: "sodalite",
    name: "Sodalite",
    species: "Sodalite",
    formula: "Na₈Al₆Si₆O₂₄Cl₂",
    crystalSystem: "Cubic (Isometric)",
    color: "Royal blue with white veins",
    refractiveIndex: "1.483–1.487",
    specificGravity: "2.15–2.40",
    hardness: "5.5–6",
    birefringence: "None (Isotropic)",
    opticCharacter: "Singly Refractive (Isotropic)",
    luster: "Vitreous",
    cleavage: "Poor",
    pleochroism: "None",
    diagnosticInclusions: ["See species notes", "Growth features vary by origin"],
    fluorescentReaction: "Variable; check LW/SW UV as part of standard screening.",
    authenticationTips: "Confirm with RI, SG, optic character, and magnification; rare stones often require advanced lab tests for origin/treatment.",
    description: "Blue decorative stone; lighter SG than lapis; lacks pyrite usually.",
    commonlyMistaken: ["Lapis Lazuli", "Azurite", "Glass"],
    rare: false,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/f/ff/Sodalith_-_Rohstein.jpg",
    separationGuide: [
      {
        simulant: "Lapis Lazuli",
        properties: [
          { property: "RI / SG / Optics", diagnosticDifference: "Use standard gemological tests to separate Sodalite from Lapis Lazuli and other look-alikes listed in commonly mistaken materials." }
        ]
      }
    ]
  },
  {
    id: "obsidian",
    name: "Obsidian",
    species: "Volcanic glass",
    formula: "SiO₂ (amorphous)",
    crystalSystem: "Amorphous",
    color: "Black, brown, sheen varieties",
    refractiveIndex: "1.48–1.51",
    specificGravity: "2.35–2.60",
    hardness: "5–5.5",
    birefringence: "None",
    opticCharacter: "Singly Refractive (Isotropic)",
    luster: "Vitreous",
    cleavage: "None (conchoidal)",
    pleochroism: "None",
    diagnosticInclusions: ["See species notes", "Growth features vary by origin"],
    fluorescentReaction: "Variable; check LW/SW UV as part of standard screening.",
    authenticationTips: "Confirm with RI, SG, optic character, and magnification; rare stones often require advanced lab tests for origin/treatment.",
    description: "Natural volcanic glass; conchoidal fracture; snowflake and rainbow varieties.",
    commonlyMistaken: ["Onyx", "Glass", "Jet"],
    rare: false,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Obsidian.jpg/640px-Obsidian.jpg",
    separationGuide: [
      {
        simulant: "Onyx",
        properties: [
          { property: "RI / SG / Optics", diagnosticDifference: "Use standard gemological tests to separate Obsidian from Onyx and other look-alikes listed in commonly mistaken materials." }
        ]
      }
    ]
  },
  {
    id: "moldavite",
    name: "Moldavite",
    species: "Tektite (natural glass)",
    formula: "SiO₂-rich glass",
    crystalSystem: "Amorphous",
    color: "Bottle green to brownish-green",
    refractiveIndex: "1.48–1.50",
    specificGravity: "2.32–2.38",
    hardness: "5.5",
    birefringence: "None",
    opticCharacter: "Singly Refractive (Isotropic)",
    luster: "Vitreous",
    cleavage: "None",
    pleochroism: "None",
    diagnosticInclusions: ["See species notes", "Growth features vary by origin"],
    fluorescentReaction: "Variable; check LW/SW UV as part of standard screening.",
    authenticationTips: "Confirm with RI, SG, optic character, and magnification; rare stones often require advanced lab tests for origin/treatment.",
    description: "Czech tektite glass with wrinkled surface; fakes common.",
    commonlyMistaken: ["Glass", "Obsidian", "Peridot glass"],
    rare: true,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/8/82/Moldavite.jpg",
    separationGuide: [
      {
        simulant: "Glass",
        properties: [
          { property: "RI / SG / Optics", diagnosticDifference: "Use standard gemological tests to separate Moldavite from Glass and other look-alikes listed in commonly mistaken materials." }
        ]
      }
    ]
  },
  {
    id: "pearl",
    name: "Pearl (Natural/Cultured)",
    species: "Organic nacre",
    formula: "CaCO₃ + conchiolin + water",
    crystalSystem: "Organic aggregate",
    color: "White, cream, black, fancy",
    refractiveIndex: "1.53–1.69",
    specificGravity: "2.60–2.85",
    hardness: "2.5–4.5",
    birefringence: "Aggregate",
    opticCharacter: "Aggregate",
    luster: "Pearly",
    cleavage: "None",
    pleochroism: "None",
    diagnosticInclusions: ["See species notes", "Growth features vary by origin"],
    fluorescentReaction: "Variable; check LW/SW UV as part of standard screening.",
    authenticationTips: "Confirm with RI, SG, optic character, and magnification; rare stones often require advanced lab tests for origin/treatment.",
    description: "Nacreous organic gem; X-ray structure separates natural vs cultured vs imitation.",
    commonlyMistaken: ["Shell bead", "Plastic", "Glass pearl"],
    rare: false,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/5/5e/Various_pearls.jpg",
    separationGuide: [
      {
        simulant: "Shell bead",
        properties: [
          { property: "RI / SG / Optics", diagnosticDifference: "Use standard gemological tests to separate Pearl (Natural/Cultured) from Shell bead and other look-alikes listed in commonly mistaken materials." }
        ]
      }
    ]
  },
  {
    id: "amber",
    name: "Amber",
    species: "Fossil resin",
    formula: "C-H-O resin polymers",
    crystalSystem: "Amorphous organic",
    color: "Yellow to brown, rare green/blue",
    refractiveIndex: "1.54",
    specificGravity: "1.05–1.10",
    hardness: "2–2.5",
    birefringence: "None",
    opticCharacter: "Singly Refractive (Isotropic)",
    luster: "Resinous",
    cleavage: "None",
    pleochroism: "None",
    diagnosticInclusions: ["See species notes", "Growth features vary by origin"],
    fluorescentReaction: "Variable; check LW/SW UV as part of standard screening.",
    authenticationTips: "Confirm with RI, SG, optic character, and magnification; rare stones often require advanced lab tests for origin/treatment.",
    description: "Fossil tree resin; warm to touch; saltwater float test; inclusions prized.",
    commonlyMistaken: ["Copal", "Plastic", "Glass"],
    rare: false,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/5/5a/Amber.jpg",
    separationGuide: [
      {
        simulant: "Copal",
        properties: [
          { property: "RI / SG / Optics", diagnosticDifference: "Use standard gemological tests to separate Amber from Copal and other look-alikes listed in commonly mistaken materials." }
        ]
      }
    ]
  },
  {
    id: "jet",
    name: "Jet",
    species: "Organic coal-like",
    formula: "Carbonaceous organic",
    crystalSystem: "Amorphous organic",
    color: "Black",
    refractiveIndex: "1.64–1.68",
    specificGravity: "1.30–1.35",
    hardness: "2.5–4",
    birefringence: "None",
    opticCharacter: "Singly Refractive (Isotropic)",
    luster: "Velvety to vitreous",
    cleavage: "None",
    pleochroism: "None",
    diagnosticInclusions: ["See species notes", "Growth features vary by origin"],
    fluorescentReaction: "Variable; check LW/SW UV as part of standard screening.",
    authenticationTips: "Confirm with RI, SG, optic character, and magnification; rare stones often require advanced lab tests for origin/treatment.",
    description: "Compact lignitic organic gem; Victorian mourning jewelry classic.",
    commonlyMistaken: ["Onyx", "Glass", "Plastic"],
    rare: false,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/c/c4/Jet_%28lignite%29_low_quality.jpg",
    separationGuide: [
      {
        simulant: "Onyx",
        properties: [
          { property: "RI / SG / Optics", diagnosticDifference: "Use standard gemological tests to separate Jet from Onyx and other look-alikes listed in commonly mistaken materials." }
        ]
      }
    ]
  },
  {
    id: "coral",
    name: "Coral (Precious)",
    species: "Organic carbonate",
    formula: "CaCO₃ (organic structure)",
    crystalSystem: "Organic aggregate",
    color: "Red, pink, white, black (different spp.)",
    refractiveIndex: "1.48–1.65",
    specificGravity: "2.6–2.7",
    hardness: "3–4",
    birefringence: "Aggregate",
    opticCharacter: "Aggregate",
    luster: "Dull to vitreous",
    cleavage: "None",
    pleochroism: "None",
    diagnosticInclusions: ["See species notes", "Growth features vary by origin"],
    fluorescentReaction: "Variable; check LW/SW UV as part of standard screening.",
    authenticationTips: "Confirm with RI, SG, optic character, and magnification; rare stones often require advanced lab tests for origin/treatment.",
    description: "Organic gem from marine polyps; trade and CITES issues for some species.",
    commonlyMistaken: ["Glass", "Plastic", "Bone"],
    rare: false,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/3/3a/Corallium_rubrum_%28Linnaeus%2C_1758%29_11.jpg",
    separationGuide: [
      {
        simulant: "Glass",
        properties: [
          { property: "RI / SG / Optics", diagnosticDifference: "Use standard gemological tests to separate Coral (Precious) from Glass and other look-alikes listed in commonly mistaken materials." }
        ]
      }
    ]
  },
  {
    id: "benitoite",
    name: "Benitoite",
    species: "Benitoite",
    formula: "BaTiSi₃O₉",
    crystalSystem: "Hexagonal",
    color: "Blue to violet-blue",
    refractiveIndex: "1.757–1.804",
    specificGravity: "3.64–3.68",
    hardness: "6–6.5",
    birefringence: "0.047",
    opticCharacter: "Doubly Refractive (Uniaxial Positive)",
    luster: "Vitreous to adamantine",
    cleavage: "None",
    pleochroism: "Strong",
    diagnosticInclusions: ["See species notes", "Growth features vary by origin"],
    fluorescentReaction: "Variable; check LW/SW UV as part of standard screening.",
    authenticationTips: "Confirm with RI, SG, optic character, and magnification; rare stones often require advanced lab tests for origin/treatment.",
    description: "California state gem; rare barium titanium silicate; strong dispersion.",
    commonlyMistaken: ["Sapphire", "Tanzanite", "Spinel"],
    rare: true,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/b/b4/Benitoite.jpg",
    separationGuide: [
      {
        simulant: "Sapphire",
        properties: [
          { property: "RI / SG / Optics", diagnosticDifference: "Use standard gemological tests to separate Benitoite from Sapphire and other look-alikes listed in commonly mistaken materials." }
        ]
      }
    ]
  },
  {
    id: "painite",
    name: "Painite",
    species: "Painite",
    formula: "CaZrAl₉O₁₅(BO₃)",
    crystalSystem: "Hexagonal",
    color: "Red-brown to orange-brown",
    refractiveIndex: "1.787–1.816",
    specificGravity: "4.00–4.03",
    hardness: "8",
    birefringence: "0.029",
    opticCharacter: "Doubly Refractive (Uniaxial Negative)",
    luster: "Vitreous",
    cleavage: "None",
    pleochroism: "Strong",
    diagnosticInclusions: ["See species notes", "Growth features vary by origin"],
    fluorescentReaction: "Variable; check LW/SW UV as part of standard screening.",
    authenticationTips: "Confirm with RI, SG, optic character, and magnification; rare stones often require advanced lab tests for origin/treatment.",
    description: "Once among the rarest minerals; Myanmar; brownish-red crystals.",
    commonlyMistaken: ["Ruby", "Garnet", "Zircon"],
    rare: true,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/e/e7/Painite.jpg",
    separationGuide: [
      {
        simulant: "Ruby",
        properties: [
          { property: "RI / SG / Optics", diagnosticDifference: "Use standard gemological tests to separate Painite from Ruby and other look-alikes listed in commonly mistaken materials." }
        ]
      }
    ]
  },
  {
    id: "taaffeite",
    name: "Taaffeite",
    species: "Taaffeite",
    formula: "Mg₃Al₈BeO₁₆",
    crystalSystem: "Hexagonal",
    color: "Mauve, pink, violet, red",
    refractiveIndex: "1.717–1.724",
    specificGravity: "3.60–3.62",
    hardness: "8–8.5",
    birefringence: "0.004–0.009",
    opticCharacter: "Doubly Refractive (Uniaxial Negative)",
    luster: "Vitreous",
    cleavage: "None",
    pleochroism: "Weak to moderate",
    diagnosticInclusions: ["See species notes", "Growth features vary by origin"],
    fluorescentReaction: "Variable; check LW/SW UV as part of standard screening.",
    authenticationTips: "Confirm with RI, SG, optic character, and magnification; rare stones often require advanced lab tests for origin/treatment.",
    description: "Discovered as a cut stone mistaken for spinel; doubly refractive vs spinel.",
    commonlyMistaken: ["Spinel", "Sapphire", "Garnet"],
    rare: true,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/3/3e/Fotostrecke_Weltraritaeten-_Taaffeit-G-EmpireTheWorldOfGems.jpg",
    separationGuide: [
      {
        simulant: "Spinel",
        properties: [
          { property: "RI / SG / Optics", diagnosticDifference: "Use standard gemological tests to separate Taaffeite from Spinel and other look-alikes listed in commonly mistaken materials." }
        ]
      }
    ]
  },
  {
    id: "grandidierite",
    name: "Grandidierite",
    species: "Grandidierite",
    formula: "(Mg,Fe)Al₃(BO₄)(SiO₄)O",
    crystalSystem: "Orthorhombic",
    color: "Blue-green",
    refractiveIndex: "1.590–1.639",
    specificGravity: "2.98–3.00",
    hardness: "7.5",
    birefringence: "0.037–0.039",
    opticCharacter: "Doubly Refractive (Biaxial Negative)",
    luster: "Vitreous",
    cleavage: "Distinct",
    pleochroism: "Very strong",
    diagnosticInclusions: ["See species notes", "Growth features vary by origin"],
    fluorescentReaction: "Variable; check LW/SW UV as part of standard screening.",
    authenticationTips: "Confirm with RI, SG, optic character, and magnification; rare stones often require advanced lab tests for origin/treatment.",
    description: "Rare blue-green borosilicate from Madagascar; strong pleochroism.",
    commonlyMistaken: ["Tourmaline", "Apatite", "Paraíba"],
    rare: true,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/6/64/Grandidierite.jpg",
    separationGuide: [
      {
        simulant: "Tourmaline",
        properties: [
          { property: "RI / SG / Optics", diagnosticDifference: "Use standard gemological tests to separate Grandidierite from Tourmaline and other look-alikes listed in commonly mistaken materials." }
        ]
      }
    ]
  },
  {
    id: "pezzottaite",
    name: "Pezzottaite",
    species: "Pezzottaite",
    formula: "Cs(Be₂Li)Al₂Si₆O₁₈",
    crystalSystem: "Trigonal",
    color: "Raspberry pink to red",
    refractiveIndex: "1.601–1.620",
    specificGravity: "3.03–3.12",
    hardness: "8",
    birefringence: "0.008–0.011",
    opticCharacter: "Doubly Refractive (Uniaxial Negative)",
    luster: "Vitreous",
    cleavage: "Imperfect",
    pleochroism: "Moderate",
    diagnosticInclusions: ["See species notes", "Growth features vary by origin"],
    fluorescentReaction: "Variable; check LW/SW UV as part of standard screening.",
    authenticationTips: "Confirm with RI, SG, optic character, and magnification; rare stones often require advanced lab tests for origin/treatment.",
    description: "Cs-rich raspberry beryl-group mineral; often confused with red beryl.",
    commonlyMistaken: ["Red Beryl", "Rubellite", "Morganite"],
    rare: true,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/3/34/Pezzottaite%2C_quartz%2C_albite_2.jpg",
    separationGuide: [
      {
        simulant: "Red Beryl",
        properties: [
          { property: "RI / SG / Optics", diagnosticDifference: "Use standard gemological tests to separate Pezzottaite from Red Beryl and other look-alikes listed in commonly mistaken materials." }
        ]
      }
    ]
  },
  {
    id: "jeremejevite",
    name: "Jeremejevite",
    species: "Jeremejevite",
    formula: "Al₆B₅O₁₅(F,OH)₃",
    crystalSystem: "Hexagonal",
    color: "Cornflower blue to colorless",
    refractiveIndex: "1.639–1.650",
    specificGravity: "3.28–3.31",
    hardness: "6.5–7.5",
    birefringence: "0.007–0.009",
    opticCharacter: "Doubly Refractive (Uniaxial Negative)",
    luster: "Vitreous",
    cleavage: "None",
    pleochroism: "Weak to moderate",
    diagnosticInclusions: ["See species notes", "Growth features vary by origin"],
    fluorescentReaction: "Variable; check LW/SW UV as part of standard screening.",
    authenticationTips: "Confirm with RI, SG, optic character, and magnification; rare stones often require advanced lab tests for origin/treatment.",
    description: "Rare aluminum borate; Namibia/Myanmar crystals prized.",
    commonlyMistaken: ["Aquamarine", "Sapphire", "Apatite"],
    rare: true,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/4/41/Jeremejevite-48273.jpg",
    separationGuide: [
      {
        simulant: "Aquamarine",
        properties: [
          { property: "RI / SG / Optics", diagnosticDifference: "Use standard gemological tests to separate Jeremejevite from Aquamarine and other look-alikes listed in commonly mistaken materials." }
        ]
      }
    ]
  },
  {
    id: "euclase",
    name: "Euclase",
    species: "Euclase",
    formula: "BeAlSiO₄(OH)",
    crystalSystem: "Monoclinic",
    color: "Colorless, blue, green",
    refractiveIndex: "1.650–1.677",
    specificGravity: "3.05–3.10",
    hardness: "7.5",
    birefringence: "0.019–0.025",
    opticCharacter: "Doubly Refractive (Biaxial Positive)",
    luster: "Vitreous",
    cleavage: "Perfect",
    pleochroism: "Moderate to strong",
    diagnosticInclusions: ["See species notes", "Growth features vary by origin"],
    fluorescentReaction: "Variable; check LW/SW UV as part of standard screening.",
    authenticationTips: "Confirm with RI, SG, optic character, and magnification; rare stones often require advanced lab tests for origin/treatment.",
    description: "Beautiful but rare Be silicate; perfect cleavage challenges durability.",
    commonlyMistaken: ["Aquamarine", "Topaz", "Beryl"],
    rare: true,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/0/06/Euclase.jpg",
    separationGuide: [
      {
        simulant: "Aquamarine",
        properties: [
          { property: "RI / SG / Optics", diagnosticDifference: "Use standard gemological tests to separate Euclase from Aquamarine and other look-alikes listed in commonly mistaken materials." }
        ]
      }
    ]
  },
  {
    id: "kornerupine",
    name: "Kornerupine",
    species: "Kornerupine",
    formula: "(Mg,Fe)₃Al₆(Si,Al,B)₅O₂₁(OH)",
    crystalSystem: "Orthorhombic",
    color: "Green, yellow-green, brown",
    refractiveIndex: "1.660–1.685",
    specificGravity: "3.28–3.35",
    hardness: "6.5–7",
    birefringence: "0.012–0.017",
    opticCharacter: "Doubly Refractive (Biaxial Negative)",
    luster: "Vitreous",
    cleavage: "Distinct",
    pleochroism: "Strong",
    diagnosticInclusions: ["See species notes", "Growth features vary by origin"],
    fluorescentReaction: "Variable; check LW/SW UV as part of standard screening.",
    authenticationTips: "Confirm with RI, SG, optic character, and magnification; rare stones often require advanced lab tests for origin/treatment.",
    description: "Complex borosilicate; cat's-eye known; strong pleochroism.",
    commonlyMistaken: ["Tourmaline", "Enstatite", "Jade"],
    rare: false,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/9/96/Kornerupine-500959.jpg",
    separationGuide: [
      {
        simulant: "Tourmaline",
        properties: [
          { property: "RI / SG / Optics", diagnosticDifference: "Use standard gemological tests to separate Kornerupine from Tourmaline and other look-alikes listed in commonly mistaken materials." }
        ]
      }
    ]
  },
  {
    id: "charoite",
    name: "Charoite",
    species: "Charoite",
    formula: "Complex K-Ca silicate",
    crystalSystem: "Monoclinic",
    color: "Swirled purple",
    refractiveIndex: "1.550–1.559",
    specificGravity: "2.54–2.58",
    hardness: "5–6",
    birefringence: "Aggregate",
    opticCharacter: "Aggregate",
    luster: "Vitreous to silky",
    cleavage: "None",
    pleochroism: "None",
    diagnosticInclusions: ["See species notes", "Growth features vary by origin"],
    fluorescentReaction: "Variable; check LW/SW UV as part of standard screening.",
    authenticationTips: "Confirm with RI, SG, optic character, and magnification; rare stones often require advanced lab tests for origin/treatment.",
    description: "Siberian purple ornamental stone with fibrous swirls; only commercial source regionally limited.",
    commonlyMistaken: ["Sugilite", "Amethyst", "Glass"],
    rare: true,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/2/29/Czaroit1.jpg",
    separationGuide: [
      {
        simulant: "Sugilite",
        properties: [
          { property: "RI / SG / Optics", diagnosticDifference: "Use standard gemological tests to separate Charoite from Sugilite and other look-alikes listed in commonly mistaken materials." }
        ]
      }
    ]
  },
  {
    id: "sugilite",
    name: "Sugilite",
    species: "Sugilite",
    formula: "KNa₂(Fe,Mn,Al)₂Li₃Si₁₂O₃₀",
    crystalSystem: "Hexagonal",
    color: "Purple to magenta",
    refractiveIndex: "1.607–1.611",
    specificGravity: "2.74–2.80",
    hardness: "5.5–6.5",
    birefringence: "0.003",
    opticCharacter: "Doubly Refractive (Uniaxial Negative)",
    luster: "Vitreous",
    cleavage: "None",
    pleochroism: "Weak",
    diagnosticInclusions: ["See species notes", "Growth features vary by origin"],
    fluorescentReaction: "Variable; check LW/SW UV as part of standard screening.",
    authenticationTips: "Confirm with RI, SG, optic character, and magnification; rare stones often require advanced lab tests for origin/treatment.",
    description: "Royal purple cyclosilicate; Wessels mine material famous.",
    commonlyMistaken: ["Charoite", "Amethyst", "Glass"],
    rare: true,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/6/6f/Sugilite.jpg",
    separationGuide: [
      {
        simulant: "Charoite",
        properties: [
          { property: "RI / SG / Optics", diagnosticDifference: "Use standard gemological tests to separate Sugilite from Charoite and other look-alikes listed in commonly mistaken materials." }
        ]
      }
    ]
  },
  {
    id: "larimar",
    name: "Larimar",
    species: "Pectolite",
    formula: "NaCa₂Si₃O₈(OH)",
    crystalSystem: "Triclinic",
    color: "Blue to white (Caribbean)",
    refractiveIndex: "1.595–1.645",
    specificGravity: "2.84–2.90",
    hardness: "4.5–5",
    birefringence: "0.038",
    opticCharacter: "Doubly Refractive (Biaxial)",
    luster: "Silky to vitreous",
    cleavage: "Perfect",
    pleochroism: "None",
    diagnosticInclusions: ["See species notes", "Growth features vary by origin"],
    fluorescentReaction: "Variable; check LW/SW UV as part of standard screening.",
    authenticationTips: "Confirm with RI, SG, optic character, and magnification; rare stones often require advanced lab tests for origin/treatment.",
    description: "Blue pectolite from Dominican Republic; soft for rings.",
    commonlyMistaken: ["Turquoise", "Amazonite", "Glass"],
    rare: true,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/4/4b/Larimar.jpg",
    separationGuide: [
      {
        simulant: "Turquoise",
        properties: [
          { property: "RI / SG / Optics", diagnosticDifference: "Use standard gemological tests to separate Larimar from Turquoise and other look-alikes listed in commonly mistaken materials." }
        ]
      }
    ]
  },
  {
    id: "dioptase",
    name: "Dioptase",
    species: "Dioptase",
    formula: "CuSiO₃·H₂O",
    crystalSystem: "Trigonal",
    color: "Intense emerald green",
    refractiveIndex: "1.644–1.709",
    specificGravity: "3.28–3.35",
    hardness: "5",
    birefringence: "0.053",
    opticCharacter: "Doubly Refractive (Uniaxial Positive)",
    luster: "Vitreous",
    cleavage: "Perfect",
    pleochroism: "Weak",
    diagnosticInclusions: ["See species notes", "Growth features vary by origin"],
    fluorescentReaction: "Variable; check LW/SW UV as part of standard screening.",
    authenticationTips: "Confirm with RI, SG, optic character, and magnification; rare stones often require advanced lab tests for origin/treatment.",
    description: "Vivid green copper cyclosilicate crystals; brittle cleavage—collector gem.",
    commonlyMistaken: ["Emerald", "Tsavorite", "Chrome Diopside"],
    rare: true,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/c/c5/Dioptase.jpg",
    separationGuide: [
      {
        simulant: "Emerald",
        properties: [
          { property: "RI / SG / Optics", diagnosticDifference: "Use standard gemological tests to separate Dioptase from Emerald and other look-alikes listed in commonly mistaken materials." }
        ]
      }
    ]
  },
  {
    id: "hauyne",
    name: "Haüyne",
    species: "Haüyne",
    formula: "(Na,Ca)₄–₈Al₆Si₆(O,S)₂₄(SO₄,Cl)₁–₂",
    crystalSystem: "Cubic (Isometric)",
    color: "Bright blue",
    refractiveIndex: "1.496–1.505",
    specificGravity: "2.4–2.5",
    hardness: "5.5–6",
    birefringence: "None (Isotropic)",
    opticCharacter: "Singly Refractive (Isotropic)",
    luster: "Vitreous",
    cleavage: "Distinct",
    pleochroism: "None",
    diagnosticInclusions: ["See species notes", "Growth features vary by origin"],
    fluorescentReaction: "Variable; check LW/SW UV as part of standard screening.",
    authenticationTips: "Confirm with RI, SG, optic character, and magnification; rare stones often require advanced lab tests for origin/treatment.",
    description: "Rare vivid blue feldspathoid; German Eifel classics; soft for daily wear.",
    commonlyMistaken: ["Lapis", "Sodalite", "Glass"],
    rare: true,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/6/65/Ha%C3%BCyne.jpg",
    separationGuide: [
      {
        simulant: "Lapis",
        properties: [
          { property: "RI / SG / Optics", diagnosticDifference: "Use standard gemological tests to separate Haüyne from Lapis and other look-alikes listed in commonly mistaken materials." }
        ]
      }
    ]
  },
  {
    id: "mawsitsit",
    name: "Maw-sit-sit",
    species: "Rock (kosmochlor + others)",
    formula: "Cr-rich rock aggregate",
    crystalSystem: "Aggregate",
    color: "Green-black mottled",
    refractiveIndex: "1.52–1.74 (varies)",
    specificGravity: "2.5–3.5",
    hardness: "6–7",
    birefringence: "Aggregate",
    opticCharacter: "Aggregate",
    luster: "Vitreous to dull",
    cleavage: "None",
    pleochroism: "None",
    diagnosticInclusions: ["See species notes", "Growth features vary by origin"],
    fluorescentReaction: "Variable; check LW/SW UV as part of standard screening.",
    authenticationTips: "Confirm with RI, SG, optic character, and magnification; rare stones often require advanced lab tests for origin/treatment.",
    description: "Myanmar ornamental rock associated with jadeite tracts; not pure mineral species.",
    commonlyMistaken: ["Jadeite", "Chloromelanite", "Glass"],
    rare: true,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/1/14/Mawsitsit_%28chromian_jade%29_%28Namshamaw_Deposit%2C_Hpakan-Tawmaw_Jade_Tract%2C_Late_Jurassic%2C_147_Ma%3B_Maw_Sit_Sit%2C_near_Kansi%2C_western_Kachin_State%2C_Indo-Burma_Range%2C_northern_Burma%29_5_%2817062584510%29.jpg",
    separationGuide: [
      {
        simulant: "Jadeite",
        properties: [
          { property: "RI / SG / Optics", diagnosticDifference: "Use standard gemological tests to separate Maw-sit-sit from Jadeite and other look-alikes listed in commonly mistaken materials." }
        ]
      }
    ]
  },
  {
    id: "liddicoatite",
    name: "Liddicoatite Tourmaline",
    species: "Tourmaline (Liddicoatite)",
    formula: "Ca-rich complex borosilicate",
    crystalSystem: "Trigonal",
    color: "Multicolor geometric zoning",
    refractiveIndex: "1.62–1.64",
    specificGravity: "3.02–3.10",
    hardness: "7–7.5",
    birefringence: "0.016–0.021",
    opticCharacter: "Doubly Refractive (Uniaxial Negative)",
    luster: "Vitreous",
    cleavage: "None",
    pleochroism: "Strong",
    diagnosticInclusions: ["See species notes", "Growth features vary by origin"],
    fluorescentReaction: "Variable; check LW/SW UV as part of standard screening.",
    authenticationTips: "Confirm with RI, SG, optic character, and magnification; rare stones often require advanced lab tests for origin/treatment.",
    description: "Ca-tourmaline species; Madagascar slices with geometric color zones prized.",
    commonlyMistaken: ["Elbaite", "Glass doublets"],
    rare: true,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/0/0c/Liddicoatite-t5151b.jpg",
    separationGuide: [
      {
        simulant: "Elbaite",
        properties: [
          { property: "RI / SG / Optics", diagnosticDifference: "Use standard gemological tests to separate Liddicoatite Tourmaline from Elbaite and other look-alikes listed in commonly mistaken materials." }
        ]
      }
    ]
  },
  {
    id: "umbalite",
    name: "Umbalite Garnet",
    species: "Pyrope-Spessartine",
    formula: "Mg-Mn aluminum silicate",
    crystalSystem: "Cubic (Isometric)",
    color: "Pink to purplish-red",
    refractiveIndex: "1.74–1.76",
    specificGravity: "3.80–3.95",
    hardness: "7–7.5",
    birefringence: "None (Isotropic)",
    opticCharacter: "Singly Refractive (Isotropic)",
    luster: "Vitreous",
    cleavage: "None",
    pleochroism: "None",
    diagnosticInclusions: ["See species notes", "Growth features vary by origin"],
    fluorescentReaction: "Variable; check LW/SW UV as part of standard screening.",
    authenticationTips: "Confirm with RI, SG, optic character, and magnification; rare stones often require advanced lab tests for origin/treatment.",
    description: "East African pink-purple garnet trade name (Umba valley association).",
    commonlyMistaken: ["Rhodolite", "Spinel", "Sapphire"],
    rare: false,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/e/ec/Malaya-garnet-Lizunova-Fine-Jewels-Sydney-jeweller-Chifley-Square.jpg",
    separationGuide: [
      {
        simulant: "Rhodolite",
        properties: [
          { property: "RI / SG / Optics", diagnosticDifference: "Use standard gemological tests to separate Umbalite Garnet from Rhodolite and other look-alikes listed in commonly mistaken materials." }
        ]
      }
    ]
  },
  {
    id: "hackmanite",
    name: "Hackmanite",
    species: "Sodalite variety",
    formula: "Na₈Al₆Si₆O₂₄(Cl₂,S)",
    crystalSystem: "Cubic (Isometric)",
    color: "Pink to violet (tenebrescent)",
    refractiveIndex: "1.483–1.487",
    specificGravity: "2.15–2.40",
    hardness: "5.5–6",
    birefringence: "None (Isotropic)",
    opticCharacter: "Singly Refractive (Isotropic)",
    luster: "Vitreous",
    cleavage: "Poor",
    pleochroism: "None",
    diagnosticInclusions: ["See species notes", "Growth features vary by origin"],
    fluorescentReaction: "Variable; check LW/SW UV as part of standard screening.",
    authenticationTips: "Confirm with RI, SG, optic character, and magnification; rare stones often require advanced lab tests for origin/treatment.",
    description: "Tenebrescent sodalite; color changes with light exposure—collector favorite.",
    commonlyMistaken: ["Amethyst", "Fluorite", "Glass"],
    rare: true,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/6/6a/Hackmanite_sous_UVL.JPG",
    separationGuide: [
      {
        simulant: "Amethyst",
        properties: [
          { property: "RI / SG / Optics", diagnosticDifference: "Use standard gemological tests to separate Hackmanite from Amethyst and other look-alikes listed in commonly mistaken materials." }
        ]
      }
    ]
  },
  {
    id: "gaspeite",
    name: "Gaspeite",
    species: "Gaspeite",
    formula: "NiCO₃",
    crystalSystem: "Trigonal",
    color: "Bright apple green",
    refractiveIndex: "1.61–1.83",
    specificGravity: "3.7",
    hardness: "4.5–5",
    birefringence: "0.22",
    opticCharacter: "Doubly Refractive (Uniaxial Negative)",
    luster: "Vitreous",
    cleavage: "Perfect",
    pleochroism: "None",
    diagnosticInclusions: ["See species notes", "Growth features vary by origin"],
    fluorescentReaction: "Variable; check LW/SW UV as part of standard screening.",
    authenticationTips: "Confirm with RI, SG, optic character, and magnification; rare stones often require advanced lab tests for origin/treatment.",
    description: "Rare nickel carbonate; vivid green cabs; soft for rings.",
    commonlyMistaken: ["Chrysoprase", "Turquoise", "Glass"],
    rare: true,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/8/8d/Gaspeite-235283.jpg",
    separationGuide: [
      {
        simulant: "Chrysoprase",
        properties: [
          { property: "RI / SG / Optics", diagnosticDifference: "Use standard gemological tests to separate Gaspeite from Chrysoprase and other look-alikes listed in commonly mistaken materials." }
        ]
      }
    ]
  },
  {
    id: "smithsonite",
    name: "Smithsonite",
    species: "Smithsonite",
    formula: "ZnCO₃",
    crystalSystem: "Trigonal",
    color: "Blue, pink, green, yellow",
    refractiveIndex: "1.621–1.849",
    specificGravity: "4.3–4.5",
    hardness: "4–4.5",
    birefringence: "0.228",
    opticCharacter: "Doubly Refractive (Uniaxial Negative)",
    luster: "Vitreous to pearly",
    cleavage: "Perfect",
    pleochroism: "None",
    diagnosticInclusions: ["See species notes", "Growth features vary by origin"],
    fluorescentReaction: "Variable; check LW/SW UV as part of standard screening.",
    authenticationTips: "Confirm with RI, SG, optic character, and magnification; rare stones often require advanced lab tests for origin/treatment.",
    description: "Zinc carbonate; high SG; soft botryoidal gems.",
    commonlyMistaken: ["Hemimorphite", "Turquoise", "Calcite"],
    rare: false,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/d/d7/Smithsonite.jpg",
    separationGuide: [
      {
        simulant: "Hemimorphite",
        properties: [
          { property: "RI / SG / Optics", diagnosticDifference: "Use standard gemological tests to separate Smithsonite from Hemimorphite and other look-alikes listed in commonly mistaken materials." }
        ]
      }
    ]
  },
  {
    id: "hemimorphite",
    name: "Hemimorphite",
    species: "Hemimorphite",
    formula: "Zn₄Si₂O₇(OH)₂·H₂O",
    crystalSystem: "Orthorhombic",
    color: "Blue to blue-green, colorless",
    refractiveIndex: "1.614–1.636",
    specificGravity: "3.4–3.5",
    hardness: "4.5–5",
    birefringence: "0.022",
    opticCharacter: "Doubly Refractive (Biaxial Positive)",
    luster: "Vitreous",
    cleavage: "Perfect",
    pleochroism: "Weak",
    diagnosticInclusions: ["See species notes", "Growth features vary by origin"],
    fluorescentReaction: "Variable; check LW/SW UV as part of standard screening.",
    authenticationTips: "Confirm with RI, SG, optic character, and magnification; rare stones often require advanced lab tests for origin/treatment.",
    description: "Zinc silicate often confused with smithsonite; blue botryoidal forms.",
    commonlyMistaken: ["Smithsonite", "Turquoise", "Chrysocolla"],
    rare: false,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Hemimorphite_-_Mapimi%2C_Durango%2C_Mexico.jpg/3840px-Hemimorphite_-_Mapimi%2C_Durango%2C_Mexico.jpg",
    separationGuide: [
      {
        simulant: "Smithsonite",
        properties: [
          { property: "RI / SG / Optics", diagnosticDifference: "Use standard gemological tests to separate Hemimorphite from Smithsonite and other look-alikes listed in commonly mistaken materials." }
        ]
      }
    ]
  },
  {
    id: "variscite",
    name: "Variscite",
    species: "Variscite",
    formula: "AlPO₄·2H₂O",
    crystalSystem: "Orthorhombic",
    color: "Green to blue-green",
    refractiveIndex: "1.55–1.59",
    specificGravity: "2.5–2.6",
    hardness: "3.5–4.5",
    birefringence: "0.031",
    opticCharacter: "Doubly Refractive (Biaxial Negative)",
    luster: "Waxy to vitreous",
    cleavage: "Perfect",
    pleochroism: "None",
    diagnosticInclusions: ["See species notes", "Growth features vary by origin"],
    fluorescentReaction: "Variable; check LW/SW UV as part of standard screening.",
    authenticationTips: "Confirm with RI, SG, optic character, and magnification; rare stones often require advanced lab tests for origin/treatment.",
    description: "Aluminum phosphate; turquoise look-alike with lower hardness.",
    commonlyMistaken: ["Turquoise", "Chrysoprase", "Glass"],
    rare: false,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/5/59/Variscite-Pyrite-179447.jpg",
    separationGuide: [
      {
        simulant: "Turquoise",
        properties: [
          { property: "RI / SG / Optics", diagnosticDifference: "Use standard gemological tests to separate Variscite from Turquoise and other look-alikes listed in commonly mistaken materials." }
        ]
      }
    ]
  },
  {
    id: "howlite",
    name: "Howlite (often dyed)",
    species: "Howlite",
    formula: "Ca₂B₅SiO₉(OH)₅",
    crystalSystem: "Monoclinic",
    color: "White with gray veins (dyed turquoise-blue common)",
    refractiveIndex: "1.586–1.605",
    specificGravity: "2.53–2.59",
    hardness: "3.5",
    birefringence: "0.019",
    opticCharacter: "Doubly Refractive (Biaxial)",
    luster: "Vitreous to dull",
    cleavage: "None",
    pleochroism: "None",
    diagnosticInclusions: ["See species notes", "Growth features vary by origin"],
    fluorescentReaction: "Variable; check LW/SW UV as part of standard screening.",
    authenticationTips: "Confirm with RI, SG, optic character, and magnification; rare stones often require advanced lab tests for origin/treatment.",
    description: "Soft white borate; mass-dyed to imitate turquoise—acetone swab may bleed dye.",
    commonlyMistaken: ["Turquoise", "Magnesite", "Plastic"],
    rare: false,
    imageUrl: "https://upload.wikimedia.org/wikipedia/en/0/0f/Howlite.jpg",
    separationGuide: [
      {
        simulant: "Turquoise",
        properties: [
          { property: "RI / SG / Optics", diagnosticDifference: "Use standard gemological tests to separate Howlite (often dyed) from Turquoise and other look-alikes listed in commonly mistaken materials." }
        ]
      }
    ]
  },
  {
    id: "thulite",
    name: "Thulite",
    species: "Zoisite (Mn)",
    formula: "Ca₂Al₃(SiO₄)₃(OH)",
    crystalSystem: "Orthorhombic",
    color: "Pink",
    refractiveIndex: "1.69–1.70",
    specificGravity: "3.15–3.50",
    hardness: "6–7",
    birefringence: "0.006–0.018",
    opticCharacter: "Doubly Refractive (Biaxial Positive)",
    luster: "Vitreous",
    cleavage: "Perfect",
    pleochroism: "Weak",
    diagnosticInclusions: ["See species notes", "Growth features vary by origin"],
    fluorescentReaction: "Variable; check LW/SW UV as part of standard screening.",
    authenticationTips: "Confirm with RI, SG, optic character, and magnification; rare stones often require advanced lab tests for origin/treatment.",
    description: "Pink zoisite aggregate; ornamental and cabochon use.",
    commonlyMistaken: ["Rhodonite", "Rhodochrosite", "Kunzite"],
    rare: false,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/c/c1/Thulite.jpg",
    separationGuide: [
      {
        simulant: "Rhodonite",
        properties: [
          { property: "RI / SG / Optics", diagnosticDifference: "Use standard gemological tests to separate Thulite from Rhodonite and other look-alikes listed in commonly mistaken materials." }
        ]
      }
    ]
  },
  {
    id: "zoisite",
    name: "Zoisite (Anyolite/Green)",
    species: "Zoisite",
    formula: "Ca₂Al₃(SiO₄)₃(OH)",
    crystalSystem: "Orthorhombic",
    color: "Green, brown, pink (anyolite with ruby)",
    refractiveIndex: "1.69–1.70",
    specificGravity: "3.15–3.36",
    hardness: "6–7",
    birefringence: "0.006–0.018",
    opticCharacter: "Doubly Refractive (Biaxial Positive)",
    luster: "Vitreous",
    cleavage: "Perfect",
    pleochroism: "Moderate",
    diagnosticInclusions: ["See species notes", "Growth features vary by origin"],
    fluorescentReaction: "Variable; check LW/SW UV as part of standard screening.",
    authenticationTips: "Confirm with RI, SG, optic character, and magnification; rare stones often require advanced lab tests for origin/treatment.",
    description: "Species including tanzanite (blue) and green anyolite matrix.",
    commonlyMistaken: ["Tourmaline", "Jade", "Epidote"],
    rare: false,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/2/23/Zoisite-33616.jpg",
    separationGuide: [
      {
        simulant: "Tourmaline",
        properties: [
          { property: "RI / SG / Optics", diagnosticDifference: "Use standard gemological tests to separate Zoisite (Anyolite/Green) from Tourmaline and other look-alikes listed in commonly mistaken materials." }
        ]
      }
    ]
  },
  {
    id: "unakite",
    name: "Unakite",
    species: "Rock (epidote + feldspar)",
    formula: "Aggregate rock",
    crystalSystem: "Aggregate",
    color: "Green and pink mottled",
    refractiveIndex: "Variable",
    specificGravity: "2.8–3.2",
    hardness: "6–7",
    birefringence: "Aggregate",
    opticCharacter: "Aggregate",
    luster: "Vitreous",
    cleavage: "None",
    pleochroism: "None",
    diagnosticInclusions: ["See species notes", "Growth features vary by origin"],
    fluorescentReaction: "Variable; check LW/SW UV as part of standard screening.",
    authenticationTips: "Confirm with RI, SG, optic character, and magnification; rare stones often require advanced lab tests for origin/treatment.",
    description: "Epidote-pink feldspar metamorphic rock; beads and cabochons.",
    commonlyMistaken: ["Jasper", "Serpentine"],
    rare: false,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/3/36/Unakite.jpg",
    separationGuide: [
      {
        simulant: "Jasper",
        properties: [
          { property: "RI / SG / Optics", diagnosticDifference: "Use standard gemological tests to separate Unakite from Jasper and other look-alikes listed in commonly mistaken materials." }
        ]
      }
    ]
  },
  {
    id: "nummite",
    name: "Nuummite",
    species: "Anthophyllite-gedrite rock",
    formula: "Metamorphic amphibole rock",
    crystalSystem: "Aggregate",
    color: "Black with iridescent flashes",
    refractiveIndex: "Variable",
    specificGravity: "2.9–3.4",
    hardness: "5.5–6",
    birefringence: "Aggregate",
    opticCharacter: "Aggregate",
    luster: "Vitreous to silky",
    cleavage: "None",
    pleochroism: "None",
    diagnosticInclusions: ["See species notes", "Growth features vary by origin"],
    fluorescentReaction: "Variable; check LW/SW UV as part of standard screening.",
    authenticationTips: "Confirm with RI, SG, optic character, and magnification; rare stones often require advanced lab tests for origin/treatment.",
    description: "Greenland iridescent amphibole rock; ornamental cabochons.",
    commonlyMistaken: ["Labradorite", "Obsidian"],
    rare: false,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/0/0b/Nuummite-001B.jpg",
    separationGuide: [
      {
        simulant: "Labradorite",
        properties: [
          { property: "RI / SG / Optics", diagnosticDifference: "Use standard gemological tests to separate Nuummite from Labradorite and other look-alikes listed in commonly mistaken materials." }
        ]
      }
    ]
  },
];

// Count: 118 extended stones
