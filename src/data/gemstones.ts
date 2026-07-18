import { gemstonesExtended } from "./gemstones-extended";

export interface SeparationGuideItem {
  simulant: string;
  properties: {
    property: string;
    diagnosticDifference: string;
  }[];
}

export interface Gemstone {
  id: string;
  name: string;
  species: string;
  formula: string;
  crystalSystem: string;
  color: string;
  refractiveIndex: string;
  specificGravity: string;
  hardness: string;
  birefringence: string;
  opticCharacter: string;
  luster: string;
  cleavage: string;
  pleochroism: string;
  diagnosticInclusions: string[];
  fluorescentReaction: string;
  authenticationTips: string;
  description: string;
  commonlyMistaken: string[];
  separationGuide: SeparationGuideItem[];
  /** Collector / scarce material — show * next to name in UI */
  rare?: boolean;
  /** Specimen photo URL (prefer real mineral/gem photos, e.g. Wikimedia) */
  imageUrl?: string;
}

export const gemstonesCore: Gemstone[] = [
  {
    id: "diamond",
    name: "Diamond",
    species: "Diamond",
    formula: "C (Carbon)",
    crystalSystem: "Cubic (Isometric)",
    color: "Colorless, yellow, brown, blue, pink, green, orange, red, black",
    refractiveIndex: "2.417",
    specificGravity: "3.52",
    hardness: "10",
    birefringence: "None (Isotropic)",
    opticCharacter: "Singly Refractive (Isotropic)",
    luster: "Adamantine",
    cleavage: "Perfect octahedral in 4 directions",
    pleochroism: "None",
    diagnosticInclusions: [
      "Mineral crystals (olivine, garnet, diopside, graphite)",
      "Feathers (tensional fractures)",
      "Growth lines / graining (internal strain)",
      "Clouds (micro-inclusions of pinpoints)"
    ],
    fluorescentReaction: "Varies; most commonly medium to strong Blue under Long Wave UV, often yellow or green under Short Wave UV.",
    authenticationTips: "High thermal conductivity (measured by thermal testers), high refractive index (displays total internal reflection, read-through test is negative), does not double facets under magnification (unlike Moissanite, which is strongly birefringent).",
    description: "The hardest known natural material. Composed of pure carbon arranged in a face-centered cubic crystal structure. Valued for its unmatched brilliance, fire (dispersion), and extreme durability.",
    commonlyMistaken: ["Synthetic Moissanite", "Cubic Zirconia (CZ)", "Synthetic White Sapphire", "Quartz (Rock Crystal)"],
    rare: false,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/1/18/Diamond-diamond_macle2.jpg",
    separationGuide: [
      {
        simulant: "Synthetic Moissanite",
        properties: [
          { property: "Birefringence / Refractive Index", diagnosticDifference: "Moissanite has extreme birefringence (0.043) causing strong doubling of back facet junctions under 10x magnification. Diamond is isotropic (singly refractive) and will never show facet doubling." },
          { property: "Thermal & Electrical Conductivity", diagnosticDifference: "While moissanite is thermally conductive like diamond, it exhibits slight electrical conductivity. Multi-testers can easily distinguish them using electrical resistivity." }
        ]
      },
      {
        simulant: "Cubic Zirconia (CZ)",
        properties: [
          { property: "Specific Gravity (SG)", diagnosticDifference: "Cubic Zirconia is far heavier (SG 5.60 - 6.00) than Diamond (SG 3.52). CZ will sink much faster in standard high-density gemological testing fluids, and weighs nearly 1.7x more for the same size." },
          { property: "Luster & Hardness", diagnosticDifference: "CZ is softer (8.5 Mohs) and will show wear/abraded facet edges over time. Diamond (10 Mohs) remains pristine with razor-sharp facet junctions." }
        ]
      },
      {
        simulant: "Synthetic White Sapphire",
        properties: [
          { property: "Refractive Index (RI) & Luster", diagnosticDifference: "Sapphire has an RI of 1.76 - 1.77 and vitreous luster, whereas Diamond has an extremely high RI of 2.417 and adamantine luster, creating vastly superior dispersion and fire." }
        ]
      }
    ]
  },
  {
    id: "ruby",
    name: "Ruby",
    species: "Corundum",
    formula: "Al₂O₃ (Chromium colored)",
    crystalSystem: "Trigonal",
    color: "Red, purplish-red, orangey-red, dark red",
    refractiveIndex: "1.762 - 1.770",
    specificGravity: "4.00",
    hardness: "9",
    birefringence: "0.008",
    opticCharacter: "Doubly Refractive (Uniaxial Negative)",
    luster: "Vitreous to sub-adamantine",
    cleavage: "None (parting along twin planes)",
    pleochroism: "Strong; purplish-red and orangey-red",
    diagnosticInclusions: [
      "Fine needles of rutile intersecting at 60/120 degrees ('silk')",
      "Fingerprint inclusions (healed fractures with fluid bubbles)",
      "Hexagonal color zoning",
      "Rounded zircon crystals with stress halos"
    ],
    fluorescentReaction: "Strong red under Long Wave UV (especially in low-iron sources like Myanmar/Burma rubies).",
    authenticationTips: "Synthetic rubies made via flame fusion (Verneuil) show curved growth striae and gas bubbles instead of straight hexagonal growth lines. Flux-grown synthetics show orange-reflective flux residues and platinum platelets.",
    description: "The red variety of the mineral species Corundum. Colored by chromium. Historically associated with royalty, strength, and passion. Burmese rubies are highly prized for their deep 'pigeon's blood' red color.",
    commonlyMistaken: ["Red Spinel", "Almandine Garnet", "Rubellite Tourmaline", "Synthetic Flame-Fusion Ruby"],
    rare: false,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/d/dd/Corundum_%28Variety_trapiche_ruby%29-649829.jpg",
    separationGuide: [
      {
        simulant: "Red Spinel",
        properties: [
          { property: "Optic Character", diagnosticDifference: "Spinel is singly refractive/isotropic (SR), showing dark-to-light-extinction under a polariscope. Ruby is doubly refractive (DR) and uniaxial negative." },
          { property: "Refractive Index (RI)", diagnosticDifference: "Spinel has a fixed RI of 1.718, whereas Ruby has a higher RI range of 1.762 - 1.770 with a birefringence of 0.008." }
        ]
      },
      {
        simulant: "Almandine Garnet",
        properties: [
          { property: "Spectroscopy", diagnosticDifference: "Almandine garnet displays a distinctive three-band absorption spectrum in the green-yellow region (504, 520, 573 nm). Ruby has a chromium spectrum with a bright red emission line (fluorescence) at 694 nm and absorption in the violet/blue." },
          { property: "Optic Character", diagnosticDifference: "Garnet is singly refractive (SR/isotropic) while Ruby is doubly refractive." }
        ]
      },
      {
        simulant: "Rubellite Tourmaline",
        properties: [
          { property: "Refractive Index & Birefringence", diagnosticDifference: "Tourmaline has a much lower RI (1.624 - 1.644) and higher birefringence (0.018 - 0.020) than Ruby (RI 1.76-1.77, birefringence 0.008)." },
          { property: "Specific Gravity (SG)", diagnosticDifference: "Ruby is extremely dense (SG 4.00) and sinks in liquids where Tourmaline (SG 3.06) will float." }
        ]
      }
    ]
  },
  {
    id: "sapphire",
    name: "Blue Sapphire",
    species: "Corundum",
    formula: "Al₂O₃ (Iron and Titanium colored)",
    crystalSystem: "Trigonal",
    color: "Blue, violet-blue, greenish-blue",
    refractiveIndex: "1.762 - 1.770",
    specificGravity: "4.00",
    hardness: "9",
    birefringence: "0.008",
    opticCharacter: "Doubly Refractive (Uniaxial Negative)",
    luster: "Vitreous",
    cleavage: "None (parting along twin planes)",
    pleochroism: "Strong; violet-blue and greenish-blue",
    diagnosticInclusions: [
      "Intersecting rutile needles ('silk') at 60/120 degrees",
      "Hexagonal color banding and angular growth lines",
      "Liquid-filled feathers / fingerprints",
      "Zircon crystals with halo cracks"
    ],
    fluorescentReaction: "Inert to weak red/violet under Long Wave UV. Iron rich (Thai/Australian) stones are completely inert.",
    authenticationTips: "Synthetic flame-fusion blue sapphires show curved color banding (never angular). Diffusion-treated sapphires display concentration of blue color at facet junctions and edges when immersed in heavy liquids.",
    description: "Any gem-quality corundum that is not red (which is ruby). Colored by trace amounts of iron and titanium. Renowned for its superb hardness and deep royal blue tones.",
    commonlyMistaken: ["Blue Spinel", "Tanzanite", "Blue Tourmaline (Indicolite)", "Cobalt Blue Glass"],
    rare: false,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/e/ee/Sapphire_%28gem_gravel_mine%2C_Ratnapura_area%2C_Sri_Lanka%29_2_%2834726082111%29.jpg",
    separationGuide: [
      {
        simulant: "Blue Spinel",
        properties: [
          { property: "Refractive Index (RI)", diagnosticDifference: "Blue Spinel has a constant RI of 1.718, significantly lower than Sapphire's 1.762 - 1.770." },
          { property: "Optic Character", diagnosticDifference: "Spinel is singly refractive/isotropic, whereas Sapphire is doubly refractive and uniaxial negative." }
        ]
      },
      {
        simulant: "Tanzanite",
        properties: [
          { property: "Refractive Index & Specific Gravity", diagnosticDifference: "Tanzanite has an RI of 1.691 - 1.700 and a lower density (SG 3.35) than Blue Sapphire (RI 1.76 - 1.77, SG 4.00)." },
          { property: "Pleochroism", diagnosticDifference: "Tanzanite is strongly biaxial positive and trichroic (displays blue, violet, and red-bronze before heat), while Sapphire is uniaxial negative and dichroic (blue and green-blue)." }
        ]
      },
      {
        simulant: "Blue Tourmaline (Indicolite)",
        properties: [
          { property: "Birefringence", diagnosticDifference: "Tourmaline has much higher birefringence (0.018 - 0.020) than Sapphire (0.008), causing diagnostic doubling under 10x magnification." },
          { property: "Refractive Index & Specific Gravity", diagnosticDifference: "Tourmaline RI is 1.624 - 1.644 and SG is 3.06, much lower than Sapphire." }
        ]
      }
    ]
  },
  {
    id: "emerald",
    name: "Emerald",
    species: "Beryl",
    formula: "Be₃Al₂Si₆O₁₈ (Chromium/Vanadium colored)",
    crystalSystem: "Hexagonal",
    color: "Green, bluish-green, yellowish-green",
    refractiveIndex: "1.577 - 1.583 (to 1.590 in Colombian)",
    specificGravity: "2.72",
    hardness: "7.5 - 8",
    birefringence: "0.006",
    opticCharacter: "Doubly Refractive (Uniaxial Negative)",
    luster: "Vitreous",
    cleavage: "Poor basal",
    pleochroism: "Moderate; green and bluish-green",
    diagnosticInclusions: [
      "Three-phase inclusions (cavities with liquid, a gas bubble, and a halite crystal - diagnostic of Colombian origin)",
      "Two-phase inclusions (liquid and gas bubble)",
      "Jardin (complex network of fissures/fractures)",
      "Tremolite or actinolite fibers (Siberian/Sandawana origins)"
    ],
    fluorescentReaction: "Inert to weak orangey-red under Long Wave UV. High-quality synthetic emeralds often fluoresce strong red under both LW and SW UV.",
    authenticationTips: "Most natural emeralds are fracture-filled with cedarwood oil or epoxy resins (detectable under UV or flash effects under a microscope). Synthetic emeralds have lower RI (1.560-1.565) and SG (2.65-2.68) than natural counterparts.",
    description: "The green variety of Beryl, colored by chromium and/or vanadium. Famous for its rich color and characteristic internal inclusions, affectionately termed 'jardin' (the French word for garden).",
    commonlyMistaken: ["Green Tsavorite Garnet", "Green Tourmaline (Chrome)", "Peridot", "Green Glass / Paste"],
    rare: false,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/6/69/Beryl-Quartz-Emerald-Zambia-33mm_0891.jpg",
    separationGuide: [
      {
        simulant: "Green Tsavorite Garnet",
        properties: [
          { property: "Optic Character & RI", diagnosticDifference: "Tsavorite Garnet is singly refractive (SR) with a much higher RI of 1.740, compared to Emerald which is doubly refractive (DR) with a low RI of 1.577 - 1.583." },
          { property: "Specific Gravity (SG)", diagnosticDifference: "Tsavorite is extremely heavy (SG 3.61) compared to Emerald (SG 2.72). Tsavorite will sink instantly in liquids where Emerald floats." }
        ]
      },
      {
        simulant: "Green Tourmaline (Chrome)",
        properties: [
          { property: "Refractive Index & Birefringence", diagnosticDifference: "Tourmaline has a much higher RI (1.624 - 1.644) and high birefringence (0.018 - 0.020), showing prominent facet doubling. Emerald birefringence (0.006) is barely noticeable." },
          { property: "Polariscope (Optic Figure)", diagnosticDifference: "Both are uniaxial negative, but tourmaline's higher birefringence and refractive index easily separate it on a standard refractometer." }
        ]
      },
      {
        simulant: "Peridot",
        properties: [
          { property: "Birefringence", diagnosticDifference: "Peridot has extremely high birefringence (0.036), exhibiting severe back facet doubling, and has a distinctive yellowish-green 'lime' color. Peridot's RI is 1.654 - 1.690." },
          { property: "Specific Gravity (SG)", diagnosticDifference: "Peridot is dense (SG 3.34) and sinks in methylene iodide, whereas Emerald (SG 2.72) floats." }
        ]
      }
    ]
  },
  {
    id: "alexandrite",
    name: "Alexandrite",
    species: "Chrysoberyl",
    formula: "BeAl₂O₄ (Chromium colored)",
    crystalSystem: "Orthorhombic",
    color: "Color-change: bluish-green in daylight, purplish-red in incandescent light",
    refractiveIndex: "1.746 - 1.755",
    specificGravity: "3.73",
    hardness: "8.5",
    birefringence: "0.009",
    opticCharacter: "Doubly Refractive (Biaxial Positive)",
    luster: "Vitreous",
    cleavage: "Distinct distinct in one direction, weak in another",
    pleochroism: "Strong; green, orange, and purplish-red (trichroic)",
    diagnosticInclusions: [
      "Fine silk-like parallel tubes",
      "Multiphase fluid inclusions",
      "Step-like growth features"
    ],
    fluorescentReaction: "Weak to moderate red under Long Wave UV.",
    authenticationTips: "Cheap synthetic color-change corundum (used in tourist jewelry) displays an amethyst-purple/blue change, with RI of 1.76-1.77. True synthetic alexandrite displays the correct RI (1.74-1.75) but has flux residues or metallic inclusions.",
    description: "A rare color-change variety of Chrysoberyl. Named after Russian Tsar Alexander II, it appears green in sunlight and red under warm candlelight or incandescent lamps.",
    commonlyMistaken: ["Synthetic Color-Change Corundum", "Color-Change Garnet", "Color-Change Spinel"],
    rare: true,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/e/e7/Alexandrite.jpg",
    separationGuide: [
      {
        simulant: "Synthetic Color-Change Corundum",
        properties: [
          { property: "Refractive Index (RI)", diagnosticDifference: "Synthetic corundum (very common in cheap vintage rings) has a higher RI of 1.762 - 1.770, compared to Alexandrite's 1.746 - 1.755." },
          { property: "Color Shift Character", diagnosticDifference: "Synthetic corundum shifts from a grayish-blue to an amethyst-purple. Natural Alexandrite displays a distinct, sharp forest-green to raspberry-red transition." }
        ]
      },
      {
        simulant: "Color-Change Garnet",
        properties: [
          { property: "Optic Character", diagnosticDifference: "Garnet is singly refractive (SR/isotropic) and exhibits no birefringence. Alexandrite is biaxial positive and strongly doubly refractive (DR)." },
          { property: "Specific Gravity (SG)", diagnosticDifference: "Color-change Garnet has a higher SG (typically 3.80 - 4.20) than Alexandrite (SG 3.73)." }
        ]
      }
    ]
  },
  {
    id: "tanzanite",
    name: "Tanzanite",
    species: "Zoisite",
    formula: "Ca₂Al₃(SiO₄)₃(OH) (Vanadium colored)",
    crystalSystem: "Orthorhombic",
    color: "Violet-blue to bluish-violet",
    refractiveIndex: "1.691 - 1.700",
    specificGravity: "3.35",
    hardness: "6 - 7",
    birefringence: "0.009",
    opticCharacter: "Doubly Refractive (Biaxial Positive)",
    luster: "Vitreous",
    cleavage: "Perfect in 1 direction",
    pleochroism: "Extreme; deep blue, violet, and red-bronze (before heat treatment; heat treatment removes the bronze color, leaving blue/violet)",
    diagnosticInclusions: [
      "Growth tubes or parallel rod inclusions",
      "Fluid inclusions forming small fingerprints",
      "Cleavage fractures"
    ],
    fluorescentReaction: "Inert under both Long Wave and Short Wave UV.",
    authenticationTips: "Almost 95% of tanzanite is heated to remove brown/bronze tones. It can be simulated by synthetic blue-violet forsterite (strongly birefringent, shows high dispersion), or heavy lead glass, or YAG.",
    description: "A single-source gemstone found only in the Merelani Hills of Tanzania. Known for its intense pleochroism and stunning violet-blue hues. Relatively soft and brittle compared to sapphire.",
    commonlyMistaken: ["Blue Sapphire", "Iolite", "Synthetic Violet Forsterite", "Yttrium Aluminum Garnet (YAG)"],
    rare: true,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/1/16/Trichroic_Tanzanite_Crystal_-_violet_%26_burgundy.jpg",
    separationGuide: [
      {
        simulant: "Blue Sapphire",
        properties: [
          { property: "Refractive Index & Specific Gravity", diagnosticDifference: "Sapphire has a significantly higher RI (1.762 - 1.770) and higher density (SG 4.00) than Tanzanite (RI 1.691 - 1.700, SG 3.35)." },
          { property: "Hardness & Cleavage", diagnosticDifference: "Sapphire (9 Mohs) has no cleavage and is extremely durable. Tanzanite is much softer (6 - 7 Mohs) and possesses perfect cleavage in one direction, making it prone to splitting." }
        ]
      },
      {
        simulant: "Iolite",
        properties: [
          { property: "Pleochroism", diagnosticDifference: "While both display strong pleochroism, Iolite shifts from violet-blue to a distinct light yellow-gray or colorless. Tanzanite shifts from violet to royal blue to deep purple." },
          { property: "Refractive Index (RI)", diagnosticDifference: "Iolite has a much lower RI of 1.542 - 1.551 (overlapping with quartz) compared to Tanzanite (RI 1.691 - 1.700)." }
        ]
      },
      {
        simulant: "Synthetic Violet Forsterite",
        properties: [
          { property: "Birefringence", diagnosticDifference: "Synthetic forsterite has extremely high birefringence (0.035), causing pronounced back-facet doubling. Tanzanite (birefringence 0.009) displays no noticeable doubling under a 10x loupe." }
        ]
      }
    ]
  },
  {
    id: "spinel",
    name: "Spinel",
    species: "Spinel",
    formula: "MgAl₂O₄",
    crystalSystem: "Cubic (Isometric)",
    color: "Red, pink, blue, purple, orange, grey, black",
    refractiveIndex: "1.718",
    specificGravity: "3.60",
    hardness: "8",
    birefringence: "None (Isotropic)",
    opticCharacter: "Singly Refractive (Isotropic)",
    luster: "Vitreous",
    cleavage: "Imperfect / Poor",
    pleochroism: "None",
    diagnosticInclusions: [
      "Rows of octahedral crystals (usually magnetite or other spinel) resembling fingerprints",
      "Spessartine garnet crystals",
      "Iron-cross or herringbone tensional features"
    ],
    fluorescentReaction: "Red spinel exhibits strong red fluorescence under Long Wave UV. Blue spinel may show green/red or be inert.",
    authenticationTips: "Synthetic spinel (very common in class rings) is easily detected under a polariscope because it exhibits strong 'anomalous double refraction' (ADR) producing cross-hatched tattersall patterns, and has a higher RI of 1.727.",
    description: "Historically mistaken for ruby and sapphire (such as the Black Prince's Ruby in the British Crown Jewels). It has excellent hardness and brilliance, with singly refractive nature resulting in very pure, saturated colors.",
    commonlyMistaken: ["Ruby", "Almandine Garnet", "Synthetic Spinel", "Glass / Paste"],
    rare: false,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Spinel-Pyrrhotite-153483.jpg",
    separationGuide: [
      {
        simulant: "Ruby",
        properties: [
          { property: "Optic Character", diagnosticDifference: "Ruby is doubly refractive (DR) and strongly pleochroic. Spinel is singly refractive (SR) and isotropic with no pleochroism." },
          { property: "Refractive Index (RI)", diagnosticDifference: "Spinel RI is 1.718, whereas Ruby has a higher RI of 1.762 - 1.770." }
        ]
      },
      {
        simulant: "Synthetic Spinel",
        properties: [
          { property: "Polariscope (ADR)", diagnosticDifference: "Synthetic spinels (class-ring variety) display strong 'anomalous double refraction' (ADR) forming cross-hatched 'tattersall' strain patterns under crossed polarizers. Natural Spinel is either completely dark or shows very faint, uniform strain." },
          { property: "Refractive Index (RI)", diagnosticDifference: "Synthetic Spinel has an RI of 1.727 due to excess alumina, higher than Natural Spinel's 1.718." }
        ]
      }
    ]
  },
  {
    id: "topaz",
    name: "Topaz",
    species: "Topaz",
    formula: "Al₂SiO₄(F,OH)₂",
    crystalSystem: "Orthorhombic",
    color: "Colorless, blue (usually treated), yellow, orange (Imperial), pink, brown",
    refractiveIndex: "1.619 - 1.627",
    specificGravity: "3.53",
    hardness: "8",
    birefringence: "0.008",
    opticCharacter: "Doubly Refractive (Biaxial Positive)",
    luster: "Vitreous",
    cleavage: "Perfect basal in 1 direction",
    pleochroism: "Distinct in pink and yellow topaz; weak in blue topaz",
    diagnosticInclusions: [
      "Two-phase and three-phase fluid inclusions",
      "Cavities containing immiscible liquids (water and liquid CO₂)",
      "Negative crystals (rhombic shapes)"
    ],
    fluorescentReaction: "Inert to weak yellow or greenish-yellow under Long Wave UV.",
    authenticationTips: "Topaz has a very slippery feel due to its perfect cleavage. It can be distinguished from quartz (RI 1.54) and aquamarine (RI 1.57) by its higher specific gravity (topaz sinks in methylene iodide, whereas quartz and beryl float).",
    description: "A silicate mineral containing fluorine and hydroxyl. Imperial Topaz (reddish-orange/yellow) is the most valuable natural color. Almost all blue topaz is produced by irradiating and heating colorless topaz.",
    commonlyMistaken: ["Aquamarine (for Blue)", "Citrine Quartz (for Imperial)", "Synthetic Flame-Fusion Sapphire (for Blue)"],
    rare: false,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/f/f9/Bixbyite-Topaz-258621.jpg",
    separationGuide: [
      {
        simulant: "Aquamarine",
        properties: [
          { property: "Specific Gravity (SG)", diagnosticDifference: "Topaz has a high density (SG 3.53) and sinks in standard heavy liquids (methylene iodide), whereas Aquamarine (SG 2.72) floats. Topaz feels significantly heavier in hand for its size." },
          { property: "Refractive Index (RI)", diagnosticDifference: "Topaz has a higher RI (1.619 - 1.627) than Aquamarine (1.577 - 1.583)." }
        ]
      },
      {
        simulant: "Citrine Quartz",
        properties: [
          { property: "Cleavage vs. Fracture", diagnosticDifference: "Topaz has perfect basal cleavage (splits cleanly along flat planes). Citrine Quartz has no cleavage and displays a classic conchoidal (shell-like) fracture." },
          { property: "Refractive Index & Specific Gravity", diagnosticDifference: "Citrine has a lower RI (1.544 - 1.553) and much lower SG (2.65, floats in heavy liquids) compared to Topaz (RI 1.619 - 1.627, SG 3.53)." }
        ]
      }
    ]
  },
  {
    id: "opal",
    name: "Precious Opal",
    species: "Opal",
    formula: "SiO₂ · nH₂O (Hydrous Silica)",
    crystalSystem: "Amorphous",
    color: "White, black, grey, orange, showing play-of-color",
    refractiveIndex: "1.37 - 1.47",
    specificGravity: "1.98 - 2.20",
    hardness: "5.5 - 6.5",
    birefringence: "None",
    opticCharacter: "Isotropic (Amorphous)",
    luster: "Sub-vitreous to waxy",
    cleavage: "None",
    pleochroism: "None",
    diagnosticInclusions: [
      "Sand, sandstone, or ironstone matrix",
      "Gas bubbles or cracks from drying (crazing)",
      "Under high magnification, regular arrays of silica spheres"
    ],
    fluorescentReaction: "Varies; often green or white phosphorescence.",
    authenticationTips: "Synthetic opals (e.g. Gilson opal) exhibit a diagnostic 'lizard skin' or 'chicken wire' pattern of color patches under magnification. Doublets and triplets show a clear glue line and dark backing when viewed from the side.",
    description: "An amorphous hydrated silica gemstone. Its play-of-color is caused by the diffraction of light passing through orderly arranged micro-spheres of silica. Black opal from Lightning Ridge, Australia is highly prized.",
    commonlyMistaken: ["Opal Doublets / Triplets", "Gilson Synthetic Opal", "Slocum Stone (Glass Imitation)"],
    rare: false,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/1/14/Hydrophane_opal_%28precious_opal%29.jpg",
    separationGuide: [
      {
        simulant: "Opal Doublets / Triplets",
        properties: [
          { property: "Microscopy (Side Profile)", diagnosticDifference: "Viewed from the side, a doublet shows a sharp, flat boundary line where the thin precious opal slice is glued to a dark backing (obsidian, ironstone, or black plastic). A triplet also shows a clear glass or quartz protective dome glued on top." }
        ]
      },
      {
        simulant: "Gilson Synthetic Opal",
        properties: [
          { property: "Microscopy (Columnar Structure)", diagnosticDifference: "Gilson synthetic opal displays a highly diagnostic 'lizard skin' or 'chicken wire' pattern. The color patches have jagged, column-like boundaries under magnification, unlike the flowing, irregular color zones in natural precious opal." }
        ]
      },
      {
        simulant: "Slocum Stone (Glass Imitation)",
        properties: [
          { property: "Microscopy", diagnosticDifference: "Slocum stone is a glass simulant that shows crumpled, highly metallic, thin tinfoil-like flakes of glitter inside, accompanied by diagnostic round gas bubbles. Natural opal has no gas bubbles and its color blocks are structural reflections." }
        ]
      }
    ]
  },
  {
    id: "peridot",
    name: "Peridot",
    species: "Olivine",
    formula: "(Mg,Fe)₂SiO₄",
    crystalSystem: "Orthorhombic",
    color: "Lime green, olive green, yellowish-green",
    refractiveIndex: "1.654 - 1.690",
    specificGravity: "3.34",
    hardness: "6.5 - 7",
    birefringence: "0.036 (Very High)",
    opticCharacter: "Doubly Refractive (Biaxial Positive or Negative)",
    luster: "Vitreous to oily",
    cleavage: "Poor",
    pleochroism: "Weak; green and yellowish-green",
    diagnosticInclusions: [
      "'Lily pad' inclusions (flat circular stress discs around a chromite or biotite mica crystal)",
      "Small dark chromite octahedral crystals",
      "Pronounced doubling of back facet junctions when viewed through the table"
    ],
    fluorescentReaction: "Inert under both Long Wave and Short Wave UV.",
    authenticationTips: "Extremely high birefringence (0.036) causes noticeable 'doubling' of the back facets when looking through the crown with a 10x loupe. This easily distinguishes peridot from green tourmaline or glass.",
    description: "The gem variety of olivine. One of the few gemstones that occurs in only one color: green, though the shade depends on the percentage of iron in the crystal structure.",
    commonlyMistaken: ["Green Tourmaline", "Green Glass (Paste)", "Synthetic Green Spinel", "Tsavorite Garnet"],
    rare: false,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/9/90/Peridot_%28GeoDIL_number_-_1027%29.jpg",
    separationGuide: [
      {
        simulant: "Green Tourmaline",
        properties: [
          { property: "Birefringence & Facet Doubling", diagnosticDifference: "While both are doubly refractive, Peridot's birefringence is extremely high (0.036), showing severe, dramatic facet doubling under a 10x loupe. Tourmaline's birefringence (0.018) is half as strong." },
          { property: "Specific Gravity (SG)", diagnosticDifference: "Peridot is denser (SG 3.34) and sinks in standard heavy liquids (methylene iodide). Tourmaline (SG 3.06) will float." }
        ]
      },
      {
        simulant: "Green Glass (Paste)",
        properties: [
          { property: "Optic Character", diagnosticDifference: "Glass is isotropic/singly refractive (SR) and shows zero birefringence or facet doubling. It also shows diagnostic spherical gas bubbles and swirl lines under microscopy." }
        ]
      }
    ]
  },
  {
    id: "tourmaline",
    name: "Tourmaline",
    species: "Tourmaline (Group)",
    formula: "Complex borosilicate",
    crystalSystem: "Trigonal",
    color: "Every color: Green (Verdelite), Blue (Indicolite), Pink/Red (Rubellite), Multicolored (Watermelon), Copper-bearing Neon Blue (Paraiba)",
    refractiveIndex: "1.624 - 1.644",
    specificGravity: "3.06",
    hardness: "7 - 7.5",
    birefringence: "0.018 - 0.020",
    opticCharacter: "Doubly Refractive (Uniaxial Negative)",
    luster: "Vitreous",
    cleavage: "Indistinct",
    pleochroism: "Strong to extreme; often shows a dark 'axis' (almost black when viewed down the c-axis)",
    diagnosticInclusions: [
      "Thread-like trichites (fluid-filled capillaries / tubes)",
      "Flat liquid-filled films and gas bubbles",
      "Two-phase tubes parallel to the long crystal axis"
    ],
    fluorescentReaction: "Typically inert, but neon pinks may show weak red under LWUV.",
    authenticationTips: "Strong pleochroism and a high birefringence doubling can be seen. Paraiba tourmalines (copper-colored) can be distinguished from apatite by their superior hardness (7 vs 5) and higher RI.",
    description: "A boron-rich silicate group. Tourmaline has one of the widest color ranges of any gem. It is both pyroelectric (develops electrical charge when heated) and piezoelectric.",
    commonlyMistaken: ["Amethyst (for Pink/Purple)", "Apatite (for Neon Paraiba)", "Emerald (for Green Tourmaline)"],
    rare: false,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/f/f1/Tourmaline-35209.jpg",
    separationGuide: [
      {
        simulant: "Amethyst (Quartz)",
        properties: [
          { property: "Optic Character & Figure", diagnosticDifference: "Under polariscope, Quartz (Amethyst) displays a diagnostic 'bull's eye' uniaxial positive optic figure. Tourmaline is uniaxial negative with no bull's eye." },
          { property: "Refractive Index (RI)", diagnosticDifference: "Amethyst has a lower RI (1.544 - 1.553) than Tourmaline (1.624 - 1.644)." }
        ]
      },
      {
        simulant: "Apatite (for Neon Paraiba)",
        properties: [
          { property: "Hardness", diagnosticDifference: "Tourmaline has a high hardness of 7 - 7.5 Mohs and easily scratches glass. Apatite is very soft (5 Mohs) and can be scratched by a steel file or knife, showing severe facet abrasion." },
          { property: "Birefringence", diagnosticDifference: "Apatite has very low birefringence (0.003, showing no facet doubling), whereas Tourmaline has high birefringence (0.018 - 0.020) with noticeable doubling." }
        ]
      }
    ]
  },
  {
    id: "zircon",
    name: "Zircon",
    species: "Zircon",
    formula: "ZrSiO₄",
    crystalSystem: "Tetragonal",
    color: "Blue, brown, green, yellow, colorless, orange, red",
    refractiveIndex: "1.925 - 1.984 (high type); 1.810 - 1.815 (low type)",
    specificGravity: "4.70 (high type); 4.00 (low type due to metamictization)",
    hardness: "6.5 - 7.5",
    birefringence: "0.059 (Extremely High)",
    opticCharacter: "Doubly Refractive (Uniaxial Positive)",
    luster: "Sub-adamantine to vitreous",
    cleavage: "Faint",
    pleochroism: "Strong in blue zircon (blue and colorless/yellowish)",
    diagnosticInclusions: [
      "Extremely pronounced doubling of all back facet edges (looks blurry under magnification)",
      "Radioactive halos (caused by uranium/thorium decaying over geological time)",
      "Parallel growth bands"
    ],
    fluorescentReaction: "Varies; weak orange/yellow, sometimes inert.",
    authenticationTips: "Extreme birefringence (0.059) displays spectacular doubling of facets under a loupe, making it simple to distinguish from diamond and cubic zirconia. Zircon also has a very high specific gravity, sinking rapidly in almost all heavy liquids.",
    description: "A natural zirconium silicate. Historically used as a diamond simulant due to its adamantine luster and high fire. Blue zircon is the most popular variety, almost always produced by heat treating brown crystals.",
    commonlyMistaken: ["Diamond", "Cubic Zirconia (CZ)", "Synthetic Moissanite"],
    rare: false,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Zircon-dtn1a.jpg",
    separationGuide: [
      {
        simulant: "Diamond",
        properties: [
          { property: "Birefringence & Facet Doubling", diagnosticDifference: "Zircon has extreme birefringence (0.059), causing all back facet edges to appear dramatically doubled (fuzzy or overlapping) under a loupe. Diamond is isotropic (singly refractive) and will never display facet doubling." },
          { property: "Specific Gravity (SG)", diagnosticDifference: "Zircon is exceptionally heavy (SG 4.70) compared to Diamond (SG 3.52) and sinks rapidly in heavy liquids." }
        ]
      },
      {
        simulant: "Cubic Zirconia (CZ)",
        properties: [
          { property: "Birefringence", diagnosticDifference: "Cubic Zirconia is singly refractive (isotropic) with no facet doubling. Zircon displays intense doubling of back facets." },
          { property: "Specific Gravity (SG)", diagnosticDifference: "CZ is heavier (SG 5.60 - 6.00) than high-type Zircon (SG 4.70)." }
        ]
      }
    ]
  },
  {
    id: "aquamarine",
    name: "Aquamarine",
    species: "Beryl",
    formula: "Be₃Al₂Si₆O₁₈",
    crystalSystem: "Hexagonal",
    color: "Light blue, greenish-blue",
    refractiveIndex: "1.577 - 1.583",
    specificGravity: "2.72",
    hardness: "7.5 - 8",
    birefringence: "0.005 - 0.009",
    opticCharacter: "Doubly Refractive (Uniaxial Negative)",
    luster: "Vitreous",
    cleavage: "Indistinct",
    pleochroism: "Moderate; colorless to deep blue",
    diagnosticInclusions: ["Parallel growth tubes (rain)", "Two-phase inclusions"],
    fluorescentReaction: "Inert.",
    authenticationTips: "Floats in standard 2.89 heavy liquids, separating it from Topaz which sinks.",
    description: "The pale blue-to-greenish-blue variety of Beryl, named from the Latin for 'seawater'.",
    commonlyMistaken: ["Blue Topaz", "Synthetic Blue Spinel"],
    rare: false,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/d/de/Aquamarine_%28GeoDIL_number_-_2732%29.jpg",
    separationGuide: [{
      simulant: "Blue Topaz",
      properties: [{ property: "Specific Gravity", diagnosticDifference: "Topaz is denser (SG 3.53) and sinks in 2.89 liquid; Aquamarine (SG 2.72) floats." }]
    }]
  },
  {
    id: "amethyst",
    name: "Amethyst",
    species: "Quartz",
    formula: "SiO₂",
    crystalSystem: "Trigonal",
    color: "Purple, violet, reddish-purple",
    refractiveIndex: "1.544 - 1.553",
    specificGravity: "2.66",
    hardness: "7",
    birefringence: "0.009",
    opticCharacter: "Doubly Refractive (Uniaxial Positive)",
    luster: "Vitreous",
    cleavage: "None",
    pleochroism: "Weak to moderate; purple and reddish-purple",
    diagnosticInclusions: ["'Tiger stripe' healed fractures", "Chevron color zoning"],
    fluorescentReaction: "Inert.",
    authenticationTips: "Natural quartz displays a diagnostic 'bull's eye' optic figure under polariscope.",
    description: "The highly popular purple variety of Quartz, colored by trace iron and natural irradiation.",
    commonlyMistaken: ["Synthetic Amethyst", "Purple Spinel"],
    rare: false,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/4/40/Amethyst_specimen.jpg",
    separationGuide: [{
      simulant: "Synthetic Amethyst",
      properties: [{ property: "Twinning & Inclusions", diagnosticDifference: "Natural amethyst shows Brazil-law twinning and tiger-stripe inclusions; synthetics are clean or show breadcrumb seed grains." }]
    }]
  },
  {
    id: "citrine",
    name: "Citrine",
    species: "Quartz",
    formula: "SiO₂",
    crystalSystem: "Trigonal",
    color: "Yellow, golden, amber, brownish-orange",
    refractiveIndex: "1.544 - 1.553",
    specificGravity: "2.66",
    hardness: "7",
    birefringence: "0.009",
    opticCharacter: "Doubly Refractive (Uniaxial Positive)",
    luster: "Vitreous",
    cleavage: "None",
    pleochroism: "Very weak; yellow and pale yellow",
    diagnosticInclusions: ["Two-phase inclusions", "Hexagonal growth zoning"],
    fluorescentReaction: "Inert.",
    authenticationTips: "Most commercial citrine is heat-treated amethyst, displaying reddish tips and no pleochroism.",
    description: "The golden yellow to orange variety of Quartz, named after 'citron' (lemon).",
    commonlyMistaken: ["Yellow Topaz", "Heat-Treated Amethyst"],
    rare: false,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/0/0c/Quartz_Citrine_Crystals_in_Their_Natural_Form.jpg",
    separationGuide: [{
      simulant: "Yellow Topaz",
      properties: [{ property: "Specific Gravity", diagnosticDifference: "Topaz is far denser (SG 3.53) and has a higher RI (1.61 - 1.63) than Citrine." }]
    }]
  },
  {
    id: "jadeite",
    name: "Jadeite",
    species: "Jadeite (Pyroxene)",
    formula: "NaAlSi₂O₆",
    crystalSystem: "Monoclinic",
    color: "Imperial green, lavender, orange, white, black",
    refractiveIndex: "1.666 (spot)",
    specificGravity: "3.34",
    hardness: "6.5 - 7",
    birefringence: "0.012 - 0.020",
    opticCharacter: "Doubly Refractive (Biaxial Positive, aggregate)",
    luster: "Sub-vitreous to greasy",
    cleavage: "None observable",
    pleochroism: "None",
    diagnosticInclusions: ["Interlocking granular microtexture", "Polished orange-peel surface"],
    fluorescentReaction: "Inert. Dyed stones fluoresce green-yellow under LWUV.",
    authenticationTips: "Shows a diagnostic 437 nm absorption line in natural green jadeite under spectroscope.",
    description: "An aluminum sodium pyroxene aggregate. The most valuable and historically significant variety of Jade.",
    commonlyMistaken: ["Nephrite Jade", "Chrysoprase"],
    rare: false,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/8/8d/Jadeite_%28GeoDIL_number_-_1607%29.jpg",
    separationGuide: [{
      simulant: "Nephrite Jade",
      properties: [{ property: "RI & SG", diagnosticDifference: "Nephrite has a lower RI (1.61 - 1.62) and lower SG (3.00) than Jadeite." }]
    }]
  },
  {
    id: "nephrite",
    name: "Nephrite",
    species: "Tremolite-Actinolite",
    formula: "Ca₂(Mg,Fe)₅Si₈O₂₂(OH)₂",
    crystalSystem: "Monoclinic",
    color: "Spinach green, cream white (mutton-fat), brown",
    refractiveIndex: "1.610 - 1.620 (spot)",
    specificGravity: "2.95 - 3.05",
    hardness: "6 - 6.5",
    birefringence: "None observable",
    opticCharacter: "Doubly Refractive (Biaxial Negative, aggregate)",
    luster: "Greasy to waxy",
    cleavage: "None observable",
    pleochroism: "None",
    diagnosticInclusions: ["Interlocking felted fibers", "Black magnetite octahedral specks"],
    fluorescentReaction: "Inert.",
    authenticationTips: "Exhibits unmatched toughness. Features a lower RI (1.61) and SG (3.00) than Jadeite.",
    description: "A calcium magnesium iron silicate aggregate. Highly tough and historically prized as jade.",
    commonlyMistaken: ["Jadeite Jade", "Serpentine"],
    rare: false,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/9/96/Nephrite_jade_ventifact_%28Precambrian%3B_Granite_Mountains%2C_Wyoming%2C_USA%29_4_%2824664737756%29.jpg",
    separationGuide: [{
      simulant: "Jadeite Jade",
      properties: [{ property: "Specific Gravity", diagnosticDifference: "Jadeite is denser (SG 3.34 vs 3.00) and has a higher RI (1.66)." }]
    }]
  },
  {
    id: "chrysoberyl",
    name: "Chrysoberyl",
    species: "Chrysoberyl",
    formula: "BeAl₂O₄",
    crystalSystem: "Orthorhombic",
    color: "Yellow, yellowish-green, brown",
    refractiveIndex: "1.744 - 1.755",
    specificGravity: "3.73",
    hardness: "8.5",
    birefringence: "0.009",
    opticCharacter: "Doubly Refractive (Biaxial Positive)",
    luster: "Vitreous to sub-adamantine",
    cleavage: "Distinct in 1 direction",
    pleochroism: "Distinct; yellow, green, brown",
    diagnosticInclusions: ["Parallel silk needles", "Step-like growth twins"],
    fluorescentReaction: "Inert.",
    authenticationTips: "Extremely hard (8.5). Cat's eye variety displays sharp chatoyancy with a 'milk and honey' effect.",
    description: "An exceptionally hard oxide mineral distinct from beryl, famous for its chatoyant and color-change forms.",
    commonlyMistaken: ["Yellow Sapphire", "Apatite Cat's Eye"],
    rare: false,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/5/50/Chrysoberyl-282796.jpg",
    separationGuide: [{
      simulant: "Yellow Sapphire",
      properties: [{ property: "Optic Sign & SG", diagnosticDifference: "Sapphire is Uniaxial Negative with higher SG (4.00); Chrysoberyl is Biaxial Positive (SG 3.73)." }]
    }]
  },
  {
    id: "almandine_garnet",
    name: "Almandine Garnet",
    species: "Almandine (Garnet Group)",
    formula: "Fe₃Al₂Si₃O₁₂",
    crystalSystem: "Cubic (Isometric)",
    color: "Deep red, purplish-red, brownish-red",
    refractiveIndex: "1.770 - 1.815",
    specificGravity: "3.93 - 4.30",
    hardness: "7 - 7.5",
    birefringence: "None",
    opticCharacter: "Singly Refractive (Isotropic)",
    luster: "Vitreous to sub-adamantine",
    cleavage: "None",
    pleochroism: "None",
    diagnosticInclusions: ["Intersecting rutile needles at 70/110 degrees", "Zircon crystals with stress halos"],
    fluorescentReaction: "Inert.",
    authenticationTips: "Displays a diagnostic iron spectrum (bands at 504, 520, 573 nm) and is highly magnetic.",
    description: "The classic deep red iron-aluminum garnet. The most common variety of the garnet group.",
    commonlyMistaken: ["Ruby", "Red Spinel"],
    rare: false,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/7/76/Almandine_garnet_2.jpg",
    separationGuide: [{
      simulant: "Ruby",
      properties: [{ property: "Optic Character", diagnosticDifference: "Ruby is doubly refractive (uniaxial negative) and pleochroic; Almandine Garnet is singly refractive (isotropic)." }]
    }]
  },
  {
    id: "pyrope_garnet",
    name: "Pyrope Garnet",
    species: "Pyrope (Garnet Group)",
    formula: "Mg₃Al₂Si₃O₁₂",
    crystalSystem: "Cubic (Isometric)",
    color: "Bright crimson red, dark red",
    refractiveIndex: "1.720 - 1.756",
    specificGravity: "3.62 - 3.87",
    hardness: "7 - 7.5",
    birefringence: "None",
    opticCharacter: "Singly Refractive (Isotropic)",
    luster: "Vitreous",
    cleavage: "None",
    pleochroism: "None",
    diagnosticInclusions: ["Rounded crystal grains of quartz", "Fine acicular needles"],
    fluorescentReaction: "Inert.",
    authenticationTips: "Has a lower RI (1.72 - 1.75) and lower SG (3.7) than Almandine Garnet, and lacks its extreme iron spectrum.",
    description: "The magnesium-aluminum garnet variety, celebrated for its brilliant, high-clarity blood-red tones.",
    commonlyMistaken: ["Ruby", "Almandine Garnet"],
    rare: false,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/b/b0/Grenat_pyrope_.jpg",
    separationGuide: [{
      simulant: "Ruby",
      properties: [{ property: "UV Fluorescence", diagnosticDifference: "Ruby fluoresces bright red under LWUV and is doubly refractive; Pyrope Garnet is inert and singly refractive." }]
    }]
  },
  {
    id: "spessartine_garnet",
    name: "Spessartine Garnet",
    species: "Spessartine (Garnet Group)",
    formula: "Mn₃Al₂Si₃O₁₂",
    crystalSystem: "Cubic (Isometric)",
    color: "Mandarin orange, reddish-orange",
    refractiveIndex: "1.790 - 1.814",
    specificGravity: "4.12 - 4.20",
    hardness: "7 - 7.5",
    birefringence: "None",
    opticCharacter: "Singly Refractive (Isotropic)",
    luster: "Vitreous to sub-adamantine",
    cleavage: "None",
    pleochroism: "None",
    diagnosticInclusions: ["Wavy fluid feathers resembling 'shredded wheat'", "Manganese dendritic formations"],
    fluorescentReaction: "Inert.",
    authenticationTips: "Displays a manganese spectrum (lines at 412, 424, 432 nm). RI is usually over standard refractometer limits.",
    description: "The manganese-aluminum garnet variety, highly prized for its vibrant and electric orange colors.",
    commonlyMistaken: ["Hessonite Garnet", "Orange Sapphire"],
    rare: false,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/5/53/Garnet_-_Spessartine_crystal_detail.jpg",
    separationGuide: [{
      simulant: "Hessonite Garnet",
      properties: [{ property: "Microscopy & RI", diagnosticDifference: "Hessonite Grossular Garnet has a lower RI (1.73 - 1.75) and displays a 'roiled-water' flow pattern of inclusions." }]
    }]
  },
  {
    id: "tsavorite_garnet",
    name: "Tsavorite Garnet",
    species: "Grossular (Garnet Group)",
    formula: "Ca₃Al₂Si₃O₁₂",
    crystalSystem: "Cubic (Isometric)",
    color: "Vivid forest green, mint green",
    refractiveIndex: "1.731 - 1.754",
    specificGravity: "3.57 - 3.65",
    hardness: "7 - 7.5",
    birefringence: "None",
    opticCharacter: "Singly Refractive (Isotropic)",
    luster: "Vitreous to sub-adamantine",
    cleavage: "None",
    pleochroism: "None",
    diagnosticInclusions: ["Rounded apatite crystal inclusions", "Actinolite fiber needles"],
    fluorescentReaction: "Inert.",
    authenticationTips: "Singly refractive (isotropic) with a much higher RI (1.74) and luster than Emerald (RI 1.57 - 1.58).",
    description: "The chromium-vanadium grossular garnet. Discovered in Kenya, it offers an exceptionally brilliant, vivid green.",
    commonlyMistaken: ["Emerald", "Chrome Diopside"],
    rare: true,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/d/d0/Grossular-122165.jpg",
    separationGuide: [{
      simulant: "Emerald",
      properties: [{ property: "RI & Optics", diagnosticDifference: "Emerald is doubly refractive, has lower RI (1.57) and lower SG (2.72) than Tsavorite (SG 3.60)." }]
    }]
  },
  {
    id: "morganite",
    name: "Morganite",
    species: "Beryl",
    formula: "Be₃Al₂Si₆O₁₈",
    crystalSystem: "Hexagonal",
    color: "Peach, pink, salmon, pale rose",
    refractiveIndex: "1.572 - 1.590",
    specificGravity: "2.71 - 2.90",
    hardness: "7.5 - 8",
    birefringence: "0.005 - 0.009",
    opticCharacter: "Doubly Refractive (Uniaxial Negative)",
    luster: "Vitreous",
    cleavage: "Indistinct",
    pleochroism: "Weak to moderate; pale pink and bluish-pink",
    diagnosticInclusions: ["Parallel growth tubes", "Two-phase inclusions"],
    fluorescentReaction: "Faint violet-pink.",
    authenticationTips: "Floats in 2.89 heavy liquids, easily distinguishing it from Pink Topaz and Kunzite which sink.",
    description: "The delicate peach-to-pink variety of Beryl, named after American gem collector J.P. Morgan.",
    commonlyMistaken: ["Pink Topaz", "Kunzite"],
    rare: false,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/d/de/Aquamarine_%28GeoDIL_number_-_2732%29.jpg",
    separationGuide: [{
      simulant: "Pink Topaz",
      properties: [{ property: "Specific Gravity", diagnosticDifference: "Topaz is significantly denser (SG 3.53) and sinks rapidly in standard density fluids; Morganite (SG 2.75) floats." }]
    }]
  },
  {
    id: "kunzite",
    name: "Kunzite",
    species: "Spodumene",
    formula: "LiAlSi₂O₆",
    crystalSystem: "Monoclinic",
    color: "Pale pink, violet-pink, lilac",
    refractiveIndex: "1.660 - 1.676",
    specificGravity: "3.16 - 3.20",
    hardness: "6.5 - 7",
    birefringence: "0.014 - 0.016",
    opticCharacter: "Doubly Refractive (Biaxial Negative)",
    luster: "Vitreous",
    cleavage: "Perfect in 2 directions at 90 degrees",
    pleochroism: "Strong; pink, violet, and colorless",
    diagnosticInclusions: ["Parallel etch tubes and pipes", "Splintery cleavage fractures"],
    fluorescentReaction: "Strong orange-pink; phosphorescent.",
    authenticationTips: "Displays extreme pleochroism and fluoresces intense orange-pink with a persistent afterglow.",
    description: "The lilac-pink variety of Spodumene, named after gemologist George Frederick Kunz in 1902.",
    commonlyMistaken: ["Morganite", "Pink Tourmaline"],
    rare: false,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/0/07/Kunzite_5.jpg",
    separationGuide: [{
      simulant: "Morganite",
      properties: [{ property: "Refractive Index & Hardness", diagnosticDifference: "Morganite has lower RI (1.57 - 1.58) and is harder (7.5 - 8 Mohs) with no perfect cleavage." }]
    }]
  },
  {
    id: "moonstone",
    name: "Moonstone",
    species: "Feldspar (Orthoclase / Albite)",
    formula: "(K,Na)AlSi₃O₈",
    crystalSystem: "Monoclinic",
    color: "Colorless, white, grey, peach, showing adularescence",
    refractiveIndex: "1.518 - 1.525",
    specificGravity: "2.56 - 2.59",
    hardness: "6 - 6.5",
    birefringence: "0.005 - 0.008",
    opticCharacter: "Doubly Refractive (Biaxial Negative)",
    luster: "Vitreous to pearly",
    cleavage: "Perfect in 2 directions at 90 degrees",
    pleochroism: "None",
    diagnosticInclusions: ["'Centipede' inclusions", "Parallel exsolution lamellae"],
    fluorescentReaction: "Inert to weak bluish.",
    authenticationTips: "Adularescence is a floating billowy sheen of light, combined with diagnostic centipede-like fissures.",
    description: "A potassium-sodium feldspar displaying a billowy, moonlight-like adularescent sheen.",
    commonlyMistaken: ["Opalite (Glass)", "Chalcedony"],
    rare: false,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/c/cf/Moonstone_%28iridescent_peristerite-oligoclase_feldspar%29_%28Chupa_Pegmatite_Field%2C_Mesoproterozoic%2C_1.75_to_2.10_Ga%3B_at_or_near_Chupa_Bay%2C_Karelia%2C_Russia%29_2.jpg",
    separationGuide: [{
      simulant: "Opalite (Glass)",
      properties: [{ property: "Optic Character", diagnosticDifference: "Opalite is singly refractive (isotropic), has lower RI (~1.48), and contains gas bubbles." }]
    }]
  },
  {
    id: "turquoise",
    name: "Turquoise",
    species: "Turquoise",
    formula: "CuAl₆(PO₄)₄(OH)₈·4H₂O",
    crystalSystem: "Triclinic",
    color: "Sky blue, robin's-egg blue, greenish-blue",
    refractiveIndex: "1.610 - 1.650 (spot ~1.62)",
    specificGravity: "2.60 - 2.90",
    hardness: "5 - 6",
    birefringence: "None observable",
    opticCharacter: "Doubly Refractive (Biaxial Positive, aggregate)",
    luster: "Waxy to sub-vitreous",
    cleavage: "None observable",
    pleochroism: "None",
    diagnosticInclusions: ["Spiderweb matrix veins", "Microgranular aggregate texture"],
    fluorescentReaction: "Inert to weak greenish-yellow.",
    authenticationTips: "Dyed howlite imitations will bleed blue ink when wiped with acetone.",
    description: "A hydrous phosphate of copper and aluminum, celebrated across history for its vivid sky blue color.",
    commonlyMistaken: ["Dyed Howlite", "Dyed Magnesite"],
    rare: false,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/4/4b/Turquoise_Cerillos_Smithsonian.jpg",
    separationGuide: [{
      simulant: "Dyed Howlite",
      properties: [{ property: "Acetone Swab Test", diagnosticDifference: "Dyed howlite bleeds its dye under a cotton swab with acetone, and has a lower SG (2.58)." }]
    }]
  },
  {
    id: "lapis_lazuli",
    name: "Lapis Lazuli",
    species: "Lapis Lazuli (Rock)",
    formula: "Lazurite, Calcite, and Pyrite aggregate",
    crystalSystem: "Cubic",
    color: "Deep royal blue with gold pyrite and white calcite patches",
    refractiveIndex: "~1.500 (spot)",
    specificGravity: "2.70 - 2.90",
    hardness: "5 - 6",
    birefringence: "None observable",
    opticCharacter: "Isotropic (aggregate)",
    luster: "Vitreous to greasy",
    cleavage: "None",
    pleochroism: "None",
    diagnosticInclusions: ["Brassy golden flecks of Pyrite", "White bands of Calcite"],
    fluorescentReaction: "Calcite bands fluoresce orange-pink under SWUV.",
    authenticationTips: "Dyed lapis bleeds blue when rubbed with acetone. Natural lapis has well-formed golden pyrite flakes.",
    description: "A famous ancient blue rock containing lazurite, sparkling golden pyrite, and white calcite veins.",
    commonlyMistaken: ["Sodalite", "Swiss Lapis (Jasper)"],
    rare: false,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/c/ce/Lapis_lazuli%2C_Smithsonian_Objects_of_Wonder.jpg",
    separationGuide: [{
      simulant: "Sodalite",
      properties: [{ property: "Specific Gravity & Pyrite", diagnosticDifference: "Sodalite is much lighter (SG 2.20 - 2.30) and completely lacks the golden pyrite flakes of Lapis Lazuli." }]
    }]
  },
  {
    id: "iolite",
    name: "Iolite",
    species: "Cordierite",
    formula: "Mg₂Al₄Si₅O₁₈",
    crystalSystem: "Orthorhombic",
    color: "Violet-blue, dark blue, light grey",
    refractiveIndex: "1.542 - 1.551",
    specificGravity: "2.58 - 2.66",
    hardness: "7 - 7.5",
    birefringence: "0.008 - 0.012",
    opticCharacter: "Doubly Refractive (Biaxial Negative)",
    luster: "Vitreous",
    cleavage: "Distinct in 1 direction",
    pleochroism: "Extreme (Trichroic); violet-blue, light blue, and yellowish-grey",
    diagnosticInclusions: ["Parallel plates of hematite", "Liquid fingerprint feathers"],
    fluorescentReaction: "Inert.",
    authenticationTips: "Extreme trichroism is easily visible without instrument: shifts from purple-blue to pale yellow-grey.",
    description: "A magnesium silicate. Historically used by Vikings as a polarizing filter to navigate on overcast days.",
    commonlyMistaken: ["Blue Sapphire", "Tanzanite"],
    rare: false,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/0/00/Iolite%2C_yellow_brown_direction_%285109698214%29.jpg",
    separationGuide: [{
      simulant: "Blue Sapphire",
      properties: [{ property: "Specific Gravity & RI", diagnosticDifference: "Sapphire has a much higher SG (4.00) and higher RI (1.76 - 1.77) than Iolite." }]
    }]
  },
  {
    id: "apatite",
    name: "Apatite",
    species: "Apatite",
    formula: "Ca₅(PO₄)₃(F,Cl,OH)",
    crystalSystem: "Hexagonal",
    color: "Neon blue, teal green, yellow",
    refractiveIndex: "1.634 - 1.638",
    specificGravity: "3.18",
    hardness: "5",
    birefringence: "0.002 - 0.008",
    opticCharacter: "Doubly Refractive (Uniaxial Negative)",
    luster: "Vitreous",
    cleavage: "Poor",
    pleochroism: "Strong in blue stones; blue and yellowish-green",
    diagnosticInclusions: ["Parallel fibrous growth tubes", "Fluid feathers"],
    fluorescentReaction: "Lilac to yellow under LWUV.",
    authenticationTips: "Extremely soft (5 Mohs scale reference mineral) showing heavily abraded, fuzzy facet junctions.",
    description: "A calcium phosphate mineral prized for its intense neon shades that closely mimic rare Paraiba tourmaline.",
    commonlyMistaken: ["Paraiba Tourmaline", "Aquamarine"],
    rare: false,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/e/e4/Apatite_crystal_%28GeoDIL_number_-_23%29.jpg",
    separationGuide: [{
      simulant: "Paraiba Tourmaline",
      properties: [{ property: "Birefringence & Hardness", diagnosticDifference: "Tourmaline is harder (7 - 7.5) and displays strong facet doubling; Apatite has extremely low birefringence and is soft (5)." }]
    }]
  },
  {
    id: "chrome_diopside",
    name: "Chrome Diopside",
    species: "Diopside",
    formula: "CaMgSi₂O₆ (colored by chromium)",
    crystalSystem: "Monoclinic",
    color: "Vibrant forest green",
    refractiveIndex: "1.675 - 1.705",
    specificGravity: "3.22 - 3.38",
    hardness: "5.5 - 6",
    birefringence: "0.024 - 0.028",
    opticCharacter: "Doubly Refractive (Biaxial Positive)",
    luster: "Vitreous",
    cleavage: "Good in 2 directions at 90 degrees",
    pleochroism: "Moderate to strong; dark green and light green",
    diagnosticInclusions: ["Parallel cleavage cracks", "Facet doubling due to high birefringence"],
    fluorescentReaction: "Inert.",
    authenticationTips: "Forest green body color with high birefringence showing noticeable facet doubling. Scratches easily.",
    description: "A Siberian-sourced chromium calcium magnesium silicate offering an emerald-green color at a lower hardness.",
    commonlyMistaken: ["Emerald", "Tsavorite Garnet"],
    rare: false,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/0/00/Chrome_diopside_and_quartz_%28GeoDIL_number_-_990%29.jpg",
    separationGuide: [{
      simulant: "Tsavorite Garnet",
      properties: [{ property: "Optic Character", diagnosticDifference: "Tsavorite is singly refractive (isotropic) with no pleochroism, whereas Chrome Diopside is doubly refractive." }]
    }]
  }
];

/** Full library: core trade stones + extended catalog. Rare stones use rare:true (UI shows *). */
export const gemstonesDatabase: Gemstone[] = [...gemstonesCore, ...gemstonesExtended];
