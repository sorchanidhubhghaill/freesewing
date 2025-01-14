import { version } from "../package.json";

export default {
  name: "simon",
  version,
  design: "Joost De Cock",
  code: "Joost De Cock",
  department: "menswear",
  type: "pattern",
  difficulty: 4,
  tags: ["top"],
  optionGroups: {
    fit: [
      "chestEase",
      "collarEase",
      "bicepsEase",
      "cuffEase",
      "shoulderEase",
      "lengthBonus",
      "sleeveLengthBonus",
      "waistEase",
      "hipsEase",
      "yokeDart"
    ],
    style: [
      "splitYoke",
      "hemStyle",
      "hemCurve",
      {
        closure: [
          "extraTopButton",
          "buttons",
          "seperateButtonPlacket",
          "buttonPlacketStyle",
          "seperateButtonholePlacket",
          "buttonholePlacketStyle",
          "buttonPlacketWidth",
          "buttonholePlacketWidth",
          "buttonholePlacketFoldWidth",
          "buttonFreeLength"
        ]
      },
      {
        cuffs: [
          "cuffStyle",
          "barrelCuffNarrowButton",
          "cuffButtonRows",
          "sleevePlacketWidth",
          "sleevePlacketLength",
          "cuffDrape",
          "cuffLength"
        ]
      },
      {
        collar: [
          "collarAngle",
          "collarStandBend",
          "collarStandCurve",
          "collarFlare",
          "collarStandWidth",
          "collarBend",
          "collarGap",
          "collarRoll"
        ]
      }
    ],
    advanced: [
      "acrossBackFactor",
      "armholeDepthFactor",
      "backNeckCutout",
      "frontArmholeDeeper",
      "shoulderSlopeReduction",
      "sleeveWidthGuarantee",
      {
        sleevecap: [
          "sleevecapEase",
          "sleevecapTopFactorX",
          "sleevecapTopFactorY",
          "sleevecapBackFactorX",
          "sleevecapBackFactorY",
          "sleevecapFrontFactorX",
          "sleevecapFrontFactorY",
          "sleevecapQ1Offset",
          "sleevecapQ2Offset",
          "sleevecapQ3Offset",
          "sleevecapQ4Offset",
          "sleevecapQ1Spread1",
          "sleevecapQ1Spread2",
          "sleevecapQ2Spread1",
          "sleevecapQ2Spread2",
          "sleevecapQ3Spread1",
          "sleevecapQ3Spread2",
          "sleevecapQ4Spread1",
          "sleevecapQ4Spread2"
        ]
      }
    ]
  },
  measurements: [
    "bicepsCircumference",
    "centerBackNeckToWaist",
    "chestCircumference",
    "naturalWaist",
    "naturalWaistToHip",
    "neckCircumference",
    "shoulderSlope",
    "shoulderToShoulder",
    "hipsCircumference",
    "shoulderToWrist",
    "wristCircumference"
  ],
  dependencies: {
    sleeveBase: ["frontBase", "backBase"],
    sleeve: ["sleeveBase", "front", "back"]
  },
  inject: {
    frontBase: "base",
    backBase: "base",
    back: "backBase",
    front: "frontBase",
    frontRight: "front",
    frontLeft: "front",
    buttonPlacket: "front",
    buttonholePlacket: "front",
    yoke: "backBase",
    sleeveBase: "front",
    sleeve: "sleeveBase"
  },
  parts: [
    "collarStand",
    "collar",
    "sleevePlacketUnderlap",
    "sleevePlacketOverlap",
    "cuff"
  ],
  hide: ["base", "frontBase", "front", "backBase", "sleeveBase"],
  options: {
    // Constants
    collarFactor: 5,
    minimalDartShaping: 5,
    brianFitSleeve: true,
    cuffOverlap: 0.15,
    frenchCuffRoundFactor: 0.05,

    // Booleans
    extraTopButton: { bool: true },
    splitYoke: { bool: false },
    barrelCuffNarrowButton: { bool: true },
    seperateButtonPlacket: { bool: false },
    seperateButtonholePlacket: { bool: false },

    // Lists
    hemStyle: {
      list: ["straight", "baseball", "slashed"],
      dflt: "straight"
    },
    buttonPlacketStyle: {
      list: ["classic", "seamless"],
      dflt: "classic"
    },
    buttonholePlacketStyle: {
      list: ["classic", "seamless"],
      dflt: "seamless"
    },
    cuffStyle: {
      list: [
        "roundedBarrelCuff",
        "angledBarrelCuff",
        "straightBarrelCuff",
        "roundedFrenchCuff",
        "angledFrenchCuff",
        "straightFrenchCuff"
      ],
      dflt: "angledBarrelCuff"
    },

    // Counters
    buttons: { count: 7, min: 4, max: 12 },
    cuffButtonRows: { count: 1, min: 1, max: 2 },

    // Angles
    collarAngle: { deg: 85, min: 60, max: 130 },
    collarStandBend: { deg: 3, min: 0, max: 5 },
    collarStandCurve: { deg: 2, min: 0, max: 5 },
    collarFlare: { deg: 4, min: 0, max: 10 },

    // Millimeter
    buttonPlacketWidth: { mm: 20, min: 10, max: 30 },
    buttonholePlacketWidth: { mm: 35, min: 20, max: 45 },
    buttonholePlacketFoldWidth: { mm: 6, min: 3, max: 10 },
    collarStandWidth: { mm: 35, min: 15, max: 60 },
    sleevePlacketWidth: { mm: 25, min: 15, max: 35 },

    // Percentages
    acrossBackFactor: { pct: 97, min: 93, max: 100 },
    armholeDepthFactor: { pct: 60, min: 50, max: 70 },
    backNeckCutout: { pct: 5, min: 2, max: 8 },
    bicepsEase: { pct: 15, min: 0, max: 50 },
    buttonFreeLength: { pct: 2, min: 0, max: 15 },
    chestEase: { pct: 8, min: -4, max: 20 },
    collarBend: { pct: 5, min: 0, max: 10 },
    collarEase: { pct: 3.5, min: 0, max: 10 },
    collarGap: { pct: 3, min: 0, max: 6 },
    collarRoll: { pct: 3, min: 0, max: 6 },
    cuffDrape: { pct: 5, min: 0, max: 10 },
    cuffEase: { pct: 20, min: 0, max: 30 },
    cuffLength: { pct: 10, min: 3, max: 15 },
    frontArmholeDeeper: { pct: 0.5, min: 0, max: 1.5 },
    hemCurve: { pct: 50, min: 25, max: 100 },
    hipsEase: { pct: 8, min: -4, max: 20 },
    lengthBonus: { pct: 25, min: -4, max: 60 },
    shoulderEase: { pct: 0, min: -2, max: 6 },
    shoulderSlopeReduction: { pct: 0, min: 0, max: 8 },
    sleevecapEase: { pct: 1, min: 0, max: 10 },
    sleevecapTopFactorX: { pct: 50, min: 25, max: 75 },
    sleevecapTopFactorY: { pct: 100, min: 35, max: 165 },
    sleevecapBackFactorX: { pct: 60, min: 35, max: 65 },
    sleevecapBackFactorY: { pct: 33, min: 35, max: 65 },
    sleevecapFrontFactorX: { pct: 55, min: 35, max: 65 },
    sleevecapFrontFactorY: { pct: 33, min: 35, max: 65 },
    sleevecapQ1Offset: { pct: 3, min: 0, max: 7 },
    sleevecapQ2Offset: { pct: 5.5, min: 0, max: 7 },
    sleevecapQ3Offset: { pct: 4.5, min: 0, max: 7 },
    sleevecapQ4Offset: { pct: 1, min: 0, max: 7 },
    sleevecapQ1Spread1: { pct: 6, min: 4, max: 20 },
    sleevecapQ1Spread2: { pct: 15, min: 4, max: 20 },
    sleevecapQ2Spread1: { pct: 15, min: 4, max: 20 },
    sleevecapQ2Spread2: { pct: 10, min: 4, max: 20 },
    sleevecapQ3Spread1: { pct: 10, min: 4, max: 20 },
    sleevecapQ3Spread2: { pct: 8, min: 4, max: 20 },
    sleevecapQ4Spread1: { pct: 7, min: 4, max: 20 },
    sleevecapQ4Spread2: { pct: 7, min: 4, max: 20 },
    sleeveWidthGuarantee: { pct: 90, min: 25, max: 100 },
    sleeveLengthBonus: { pct: 0, min: -40, max: 10 },
    sleevePlacketLength: { pct: 25, min: 15, max: 35 },
    waistEase: { pct: 8, min: -4, max: 20 },
    yokeDart: { pct: 0, min: 0, max: 15 }
  }
};
