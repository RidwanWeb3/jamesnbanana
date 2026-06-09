import { D as DateUtil, N as NumberUtil } from "./reown__appkit-common.mjs";
import { i, r, n, a as r$1 } from "./lit__reactive-element.mjs";
import { b, o, u, s, T, e, a as e$1, n as n$1 } from "./lit-html.mjs";
import { i as i$1 } from "./lit-element.mjs";
import { Q as QRCodeUtil } from "./qrcode.mjs";
import { g as AlertController } from "./reown__appkit-controllers.mjs";
const MathUtil = {
  interpolate(inputRange, outputRange, value) {
    if (inputRange.length !== 2 || outputRange.length !== 2) {
      throw new Error("inputRange and outputRange must be an array of length 2");
    }
    const originalRangeMin = inputRange[0] || 0;
    const originalRangeMax = inputRange[1] || 0;
    const newRangeMin = outputRange[0] || 0;
    const newRangeMax = outputRange[1] || 0;
    if (value < originalRangeMin) {
      return newRangeMin;
    }
    if (value > originalRangeMax) {
      return newRangeMax;
    }
    return (newRangeMax - newRangeMin) / (originalRangeMax - originalRangeMin) * (value - originalRangeMin) + newRangeMin;
  }
};
const colors = {
  black: "#202020",
  white: "#FFFFFF",
  white010: "rgba(255, 255, 255, 0.1)",
  accent010: "rgba(9, 136, 240, 0.1)",
  accent020: "rgba(9, 136, 240, 0.2)",
  accent030: "rgba(9, 136, 240, 0.3)",
  accent040: "rgba(9, 136, 240, 0.4)",
  accent050: "rgba(9, 136, 240, 0.5)",
  accent060: "rgba(9, 136, 240, 0.6)",
  accent070: "rgba(9, 136, 240, 0.7)",
  accent080: "rgba(9, 136, 240, 0.8)",
  accent090: "rgba(9, 136, 240, 0.9)",
  accent100: "rgba(9, 136, 240, 1.0)",
  accentSecondary010: "rgba(199, 185, 148, 0.1)",
  accentSecondary020: "rgba(199, 185, 148, 0.2)",
  accentSecondary030: "rgba(199, 185, 148, 0.3)",
  accentSecondary040: "rgba(199, 185, 148, 0.4)",
  accentSecondary050: "rgba(199, 185, 148, 0.5)",
  accentSecondary060: "rgba(199, 185, 148, 0.6)",
  accentSecondary070: "rgba(199, 185, 148, 0.7)",
  accentSecondary080: "rgba(199, 185, 148, 0.8)",
  accentSecondary090: "rgba(199, 185, 148, 0.9)",
  accentSecondary100: "rgba(199, 185, 148, 1.0)",
  productWalletKit: "#FFB800",
  productAppKit: "#FF573B",
  productCloud: "#0988F0",
  productDocumentation: "#008847",
  neutrals050: "#F6F6F6",
  neutrals100: "#F3F3F3",
  neutrals200: "#E9E9E9",
  neutrals300: "#D0D0D0",
  neutrals400: "#BBB",
  neutrals500: "#9A9A9A",
  neutrals600: "#6C6C6C",
  neutrals700: "#4F4F4F",
  neutrals800: "#363636",
  neutrals900: "#2A2A2A",
  neutrals1000: "#252525",
  semanticSuccess010: "rgba(48, 164, 107, 0.1)",
  semanticSuccess020: "rgba(48, 164, 107, 0.2)",
  semanticSuccess030: "rgba(48, 164, 107, 0.3)",
  semanticSuccess040: "rgba(48, 164, 107, 0.4)",
  semanticSuccess050: "rgba(48, 164, 107, 0.5)",
  semanticSuccess060: "rgba(48, 164, 107, 0.6)",
  semanticSuccess070: "rgba(48, 164, 107, 0.7)",
  semanticSuccess080: "rgba(48, 164, 107, 0.8)",
  semanticSuccess090: "rgba(48, 164, 107, 0.9)",
  semanticSuccess100: "rgba(48, 164, 107, 1.0)",
  semanticError010: "rgba(223, 74, 52, 0.1)",
  semanticError020: "rgba(223, 74, 52, 0.2)",
  semanticError030: "rgba(223, 74, 52, 0.3)",
  semanticError040: "rgba(223, 74, 52, 0.4)",
  semanticError050: "rgba(223, 74, 52, 0.5)",
  semanticError060: "rgba(223, 74, 52, 0.6)",
  semanticError070: "rgba(223, 74, 52, 0.7)",
  semanticError080: "rgba(223, 74, 52, 0.8)",
  semanticError090: "rgba(223, 74, 52, 0.9)",
  semanticError100: "rgba(223, 74, 52, 1.0)",
  semanticWarning010: "rgba(243, 161, 63, 0.1)",
  semanticWarning020: "rgba(243, 161, 63, 0.2)",
  semanticWarning030: "rgba(243, 161, 63, 0.3)",
  semanticWarning040: "rgba(243, 161, 63, 0.4)",
  semanticWarning050: "rgba(243, 161, 63, 0.5)",
  semanticWarning060: "rgba(243, 161, 63, 0.6)",
  semanticWarning070: "rgba(243, 161, 63, 0.7)",
  semanticWarning080: "rgba(243, 161, 63, 0.8)",
  semanticWarning090: "rgba(243, 161, 63, 0.9)",
  semanticWarning100: "rgba(243, 161, 63, 1.0)"
};
const tokens = {
  core: {
    backgroundAccentPrimary: "#0988F0",
    backgroundAccentCertified: "#C7B994",
    backgroundWalletKit: "#FFB800",
    backgroundAppKit: "#FF573B",
    backgroundCloud: "#0988F0",
    backgroundDocumentation: "#008847",
    backgroundSuccess: "rgba(48, 164, 107, 0.20)",
    backgroundError: "rgba(223, 74, 52, 0.20)",
    backgroundWarning: "rgba(243, 161, 63, 0.20)",
    textAccentPrimary: "#0988F0",
    textAccentCertified: "#C7B994",
    textWalletKit: "#FFB800",
    textAppKit: "#FF573B",
    textCloud: "#0988F0",
    textDocumentation: "#008847",
    textSuccess: "#30A46B",
    textError: "#DF4A34",
    textWarning: "#F3A13F",
    borderAccentPrimary: "#0988F0",
    borderSecondary: "#C7B994",
    borderSuccess: "#30A46B",
    borderError: "#DF4A34",
    borderWarning: "#F3A13F",
    foregroundAccent010: "rgba(9, 136, 240, 0.1)",
    foregroundAccent020: "rgba(9, 136, 240, 0.2)",
    foregroundAccent040: "rgba(9, 136, 240, 0.4)",
    foregroundAccent060: "rgba(9, 136, 240, 0.6)",
    foregroundSecondary020: "rgba(199, 185, 148, 0.2)",
    foregroundSecondary040: "rgba(199, 185, 148, 0.4)",
    foregroundSecondary060: "rgba(199, 185, 148, 0.6)",
    iconAccentPrimary: "#0988F0",
    iconAccentCertified: "#C7B994",
    iconSuccess: "#30A46B",
    iconError: "#DF4A34",
    iconWarning: "#F3A13F",
    glass010: "rgba(255, 255, 255, 0.1)",
    zIndex: "9999"
  },
  dark: {
    overlay: "rgba(0, 0, 0, 0.50)",
    backgroundPrimary: "#202020",
    backgroundInvert: "#FFFFFF",
    textPrimary: "#FFFFFF",
    textSecondary: "#9A9A9A",
    textTertiary: "#BBBBBB",
    textInvert: "#202020",
    borderPrimary: "#2A2A2A",
    borderPrimaryDark: "#363636",
    borderSecondary: "#4F4F4F",
    foregroundPrimary: "#252525",
    foregroundSecondary: "#2A2A2A",
    foregroundTertiary: "#363636",
    iconDefault: "#9A9A9A",
    iconInverse: "#FFFFFF"
  },
  light: {
    overlay: "rgba(230 , 230, 230, 0.5)",
    backgroundPrimary: "#FFFFFF",
    borderPrimaryDark: "#E9E9E9",
    backgroundInvert: "#202020",
    textPrimary: "#202020",
    textSecondary: "#9A9A9A",
    textTertiary: "#6C6C6C",
    textInvert: "#FFFFFF",
    borderPrimary: "#E9E9E9",
    borderSecondary: "#D0D0D0",
    foregroundPrimary: "#F3F3F3",
    foregroundSecondary: "#E9E9E9",
    foregroundTertiary: "#D0D0D0",
    iconDefault: "#9A9A9A",
    iconInverse: "#202020"
  }
};
const borderRadius = {
  "1": "4px",
  "2": "8px",
  "10": "10px",
  "3": "12px",
  "4": "16px",
  "6": "24px",
  "5": "20px",
  "8": "32px",
  "16": "64px",
  "20": "80px",
  "32": "128px",
  "64": "256px",
  "128": "512px",
  round: "9999px"
};
const spacing = {
  "0": "0px",
  "01": "2px",
  "1": "4px",
  "2": "8px",
  "3": "12px",
  "4": "16px",
  "5": "20px",
  "6": "24px",
  "7": "28px",
  "8": "32px",
  "9": "36px",
  "10": "40px",
  "12": "48px",
  "14": "56px",
  "16": "64px",
  "20": "80px",
  "32": "128px",
  "64": "256px"
};
const fontFamily = {
  regular: "KHTeka",
  mono: "KHTekaMono"
};
const fontWeight = {
  regular: "400",
  medium: "500"
};
const textSize = {
  h1: "50px",
  h2: "44px",
  h3: "38px",
  h4: "32px",
  h5: "26px",
  h6: "20px",
  large: "16px",
  medium: "14px",
  small: "12px"
};
const typography = {
  "h1-regular-mono": { lineHeight: "50px", letterSpacing: "-3px" },
  "h1-regular": { lineHeight: "50px", letterSpacing: "-1px" },
  "h1-medium": { lineHeight: "50px", letterSpacing: "-0.84px" },
  "h2-regular-mono": { lineHeight: "44px", letterSpacing: "-2.64px" },
  "h2-regular": { lineHeight: "44px", letterSpacing: "-0.88px" },
  "h2-medium": { lineHeight: "44px", letterSpacing: "-0.88px" },
  "h3-regular-mono": { lineHeight: "38px", letterSpacing: "-2.28px" },
  "h3-regular": { lineHeight: "38px", letterSpacing: "-0.76px" },
  "h3-medium": { lineHeight: "38px", letterSpacing: "-0.76px" },
  "h4-regular-mono": { lineHeight: "32px", letterSpacing: "-1.92px" },
  "h4-regular": { lineHeight: "32px", letterSpacing: "-0.32px" },
  "h4-medium": { lineHeight: "32px", letterSpacing: "-0.32px" },
  "h5-regular-mono": { lineHeight: "26px", letterSpacing: "-1.56px" },
  "h5-regular": { lineHeight: "26px", letterSpacing: "-0.26px" },
  "h5-medium": { lineHeight: "26px", letterSpacing: "-0.26px" },
  "h6-regular-mono": { lineHeight: "20px", letterSpacing: "-1.2px" },
  "h6-regular": { lineHeight: "20px", letterSpacing: "-0.6px" },
  "h6-medium": { lineHeight: "20px", letterSpacing: "-0.6px" },
  "lg-regular-mono": { lineHeight: "16px", letterSpacing: "-0.96px" },
  "lg-regular": { lineHeight: "18px", letterSpacing: "-0.16px" },
  "lg-medium": { lineHeight: "18px", letterSpacing: "-0.16px" },
  "md-regular-mono": { lineHeight: "14px", letterSpacing: "-0.84px" },
  "md-regular": { lineHeight: "16px", letterSpacing: "-0.14px" },
  "md-medium": { lineHeight: "16px", letterSpacing: "-0.14px" },
  "sm-regular-mono": { lineHeight: "12px", letterSpacing: "-0.72px" },
  "sm-regular": { lineHeight: "14px", letterSpacing: "-0.12px" },
  "sm-medium": { lineHeight: "14px", letterSpacing: "-0.12px" }
};
const easings = {
  "ease-out-power-2": "cubic-bezier(0.23, 0.09, 0.08, 1.13)",
  "ease-out-power-1": "cubic-bezier(0.12, 0.04, 0.2, 1.06)",
  "ease-in-power-2": "cubic-bezier(0.92, -0.13, 0.77, 0.91)",
  "ease-in-power-1": "cubic-bezier(0.88, -0.06, 0.8, 0.96)",
  "ease-inout-power-2": "cubic-bezier(0.77, 0.09, 0.23, 1.13)",
  "ease-inout-power-1": "cubic-bezier(0.88, 0.04, 0.12, 1.06)"
};
const durations = {
  xl: "400ms",
  lg: "200ms",
  md: "125ms",
  sm: "75ms"
};
const styles$1b = {
  colors,
  fontFamily,
  fontWeight,
  textSize,
  typography,
  tokens: {
    core: tokens.core,
    theme: tokens.dark
  },
  borderRadius,
  spacing,
  durations,
  easings
};
const PREFIX_VAR = "--apkt";
function normalizeThemeVariables(themeVariables) {
  if (!themeVariables) {
    return {};
  }
  const normalized = {};
  normalized["font-family"] = themeVariables["--apkt-font-family"] ?? themeVariables["--w3m-font-family"] ?? "KHTeka";
  normalized["accent"] = themeVariables["--apkt-accent"] ?? themeVariables["--w3m-accent"] ?? "#0988F0";
  normalized["color-mix"] = themeVariables["--apkt-color-mix"] ?? themeVariables["--w3m-color-mix"] ?? "#000";
  normalized["color-mix-strength"] = themeVariables["--apkt-color-mix-strength"] ?? themeVariables["--w3m-color-mix-strength"] ?? 0;
  normalized["font-size-master"] = themeVariables["--apkt-font-size-master"] ?? themeVariables["--w3m-font-size-master"] ?? "10px";
  normalized["border-radius-master"] = themeVariables["--apkt-border-radius-master"] ?? themeVariables["--w3m-border-radius-master"] ?? "4px";
  if (themeVariables["--apkt-z-index"] !== void 0) {
    normalized["z-index"] = themeVariables["--apkt-z-index"];
  } else if (themeVariables["--w3m-z-index"] !== void 0) {
    normalized["z-index"] = themeVariables["--w3m-z-index"];
  }
  return normalized;
}
const ThemeHelperUtil = {
  createCSSVariables(styles2) {
    const cssVariables = {};
    const cssVariablesVarPrefix = {};
    function createVars(_styles, parent, currentVar = "") {
      for (const [styleKey, styleValue] of Object.entries(_styles)) {
        const variable = currentVar ? `${currentVar}-${styleKey}` : styleKey;
        if (styleValue && typeof styleValue === "object" && Object.keys(styleValue).length) {
          parent[styleKey] = {};
          createVars(styleValue, parent[styleKey], variable);
        } else if (typeof styleValue === "string") {
          parent[styleKey] = `${PREFIX_VAR}-${variable}`;
        }
      }
    }
    function addVarsPrefix(_styles, parent) {
      for (const [key, value] of Object.entries(_styles)) {
        if (value && typeof value === "object") {
          parent[key] = {};
          addVarsPrefix(value, parent[key]);
        } else if (typeof value === "string") {
          parent[key] = `var(${value})`;
        }
      }
    }
    createVars(styles2, cssVariables);
    addVarsPrefix(cssVariables, cssVariablesVarPrefix);
    return { cssVariables, cssVariablesVarPrefix };
  },
  assignCSSVariables(vars2, styles2) {
    const assignedCSSVariables = {};
    function assignVars(_vars, _styles, variable) {
      for (const [varKey, varValue] of Object.entries(_vars)) {
        const nextVariable = variable ? `${variable}-${varKey}` : varKey;
        const styleValues = _styles[varKey];
        if (varValue && typeof varValue === "object") {
          assignVars(varValue, styleValues, nextVariable);
        } else if (typeof styleValues === "string") {
          assignedCSSVariables[`${PREFIX_VAR}-${nextVariable}`] = styleValues;
        }
      }
    }
    assignVars(vars2, styles2);
    return assignedCSSVariables;
  },
  createRootStyles(theme, themeVariables) {
    const styles2 = {
      ...styles$1b,
      tokens: { ...styles$1b.tokens, theme: theme === "light" ? tokens.light : tokens.dark }
    };
    const { cssVariables } = ThemeHelperUtil.createCSSVariables(styles2);
    const assignedCSSVariables = ThemeHelperUtil.assignCSSVariables(cssVariables, styles2);
    const w3mVariables = ThemeHelperUtil.generateW3MVariables(themeVariables);
    const w3mOverrides = ThemeHelperUtil.generateW3MOverrides(themeVariables);
    const scaledVariables = ThemeHelperUtil.generateScaledVariables(themeVariables);
    const baseVariables = ThemeHelperUtil.generateBaseVariables(assignedCSSVariables);
    const allVariables = {
      ...assignedCSSVariables,
      ...baseVariables,
      ...w3mVariables,
      ...w3mOverrides,
      ...scaledVariables
    };
    const colorMixVariables = ThemeHelperUtil.applyColorMixToVariables(themeVariables, allVariables);
    const finalVariables = {
      ...allVariables,
      ...colorMixVariables
    };
    const rootStyles = Object.entries(finalVariables).map(([key, style]) => `${key}:${style.replace("/[:;{}</>]/g", "")};`).join("");
    return `:root {${rootStyles}}`;
  },
  generateW3MVariables(themeVariables) {
    if (!themeVariables) {
      return {};
    }
    const normalized = normalizeThemeVariables(themeVariables);
    const variables = {};
    variables["--w3m-font-family"] = normalized["font-family"];
    variables["--w3m-accent"] = normalized["accent"];
    variables["--w3m-color-mix"] = normalized["color-mix"];
    variables["--w3m-color-mix-strength"] = `${normalized["color-mix-strength"]}%`;
    variables["--w3m-font-size-master"] = normalized["font-size-master"];
    variables["--w3m-border-radius-master"] = normalized["border-radius-master"];
    return variables;
  },
  generateW3MOverrides(themeVariables) {
    if (!themeVariables) {
      return {};
    }
    const normalized = normalizeThemeVariables(themeVariables);
    const overrides = {};
    if (themeVariables["--apkt-accent"] || themeVariables["--w3m-accent"]) {
      const accentColor = normalized["accent"];
      overrides["--apkt-tokens-core-iconAccentPrimary"] = accentColor;
      overrides["--apkt-tokens-core-borderAccentPrimary"] = accentColor;
      overrides["--apkt-tokens-core-textAccentPrimary"] = accentColor;
      overrides["--apkt-tokens-core-backgroundAccentPrimary"] = accentColor;
    }
    if (themeVariables["--apkt-font-family"] || themeVariables["--w3m-font-family"]) {
      overrides["--apkt-fontFamily-regular"] = normalized["font-family"];
    }
    if (normalized["z-index"] !== void 0) {
      overrides["--apkt-tokens-core-zIndex"] = `${normalized["z-index"]}`;
    }
    return overrides;
  },
  generateScaledVariables(themeVariables) {
    if (!themeVariables) {
      return {};
    }
    const normalized = normalizeThemeVariables(themeVariables);
    const scaledVars = {};
    if (themeVariables["--apkt-font-size-master"] || themeVariables["--w3m-font-size-master"]) {
      const masterSize = parseFloat(normalized["font-size-master"].replace("px", ""));
      scaledVars["--apkt-textSize-h1"] = `${Number(masterSize) * 5}px`;
      scaledVars["--apkt-textSize-h2"] = `${Number(masterSize) * 4.4}px`;
      scaledVars["--apkt-textSize-h3"] = `${Number(masterSize) * 3.8}px`;
      scaledVars["--apkt-textSize-h4"] = `${Number(masterSize) * 3.2}px`;
      scaledVars["--apkt-textSize-h5"] = `${Number(masterSize) * 2.6}px`;
      scaledVars["--apkt-textSize-h6"] = `${Number(masterSize) * 2}px`;
      scaledVars["--apkt-textSize-large"] = `${Number(masterSize) * 1.6}px`;
      scaledVars["--apkt-textSize-medium"] = `${Number(masterSize) * 1.4}px`;
      scaledVars["--apkt-textSize-small"] = `${Number(masterSize) * 1.2}px`;
    }
    if (themeVariables["--apkt-border-radius-master"] || themeVariables["--w3m-border-radius-master"]) {
      const masterRadius = parseFloat(normalized["border-radius-master"].replace("px", ""));
      scaledVars["--apkt-borderRadius-1"] = `${Number(masterRadius)}px`;
      scaledVars["--apkt-borderRadius-2"] = `${Number(masterRadius) * 2}px`;
      scaledVars["--apkt-borderRadius-3"] = `${Number(masterRadius) * 3}px`;
      scaledVars["--apkt-borderRadius-4"] = `${Number(masterRadius) * 4}px`;
      scaledVars["--apkt-borderRadius-5"] = `${Number(masterRadius) * 5}px`;
      scaledVars["--apkt-borderRadius-6"] = `${Number(masterRadius) * 6}px`;
      scaledVars["--apkt-borderRadius-8"] = `${Number(masterRadius) * 8}px`;
      scaledVars["--apkt-borderRadius-16"] = `${Number(masterRadius) * 16}px`;
      scaledVars["--apkt-borderRadius-20"] = `${Number(masterRadius) * 20}px`;
      scaledVars["--apkt-borderRadius-32"] = `${Number(masterRadius) * 32}px`;
      scaledVars["--apkt-borderRadius-64"] = `${Number(masterRadius) * 64}px`;
      scaledVars["--apkt-borderRadius-128"] = `${Number(masterRadius) * 128}px`;
    }
    return scaledVars;
  },
  generateColorMixCSS(themeVariables, allVariables) {
    if (!themeVariables?.["--w3m-color-mix"] || !themeVariables["--w3m-color-mix-strength"]) {
      return "";
    }
    const colorMix = themeVariables["--w3m-color-mix"];
    const strength = themeVariables["--w3m-color-mix-strength"];
    if (!strength || strength === 0) {
      return "";
    }
    const colorVariables = Object.keys(allVariables || {}).filter((key) => {
      const isColorToken = key.includes("-tokens-core-background") || key.includes("-tokens-core-text") || key.includes("-tokens-core-border") || key.includes("-tokens-core-foreground") || key.includes("-tokens-core-icon") || key.includes("-tokens-theme-background") || key.includes("-tokens-theme-text") || key.includes("-tokens-theme-border") || key.includes("-tokens-theme-foreground") || key.includes("-tokens-theme-icon");
      const isDimensional = key.includes("-borderRadius-") || key.includes("-spacing-") || key.includes("-textSize-") || key.includes("-fontFamily-") || key.includes("-fontWeight-") || key.includes("-typography-") || key.includes("-duration-") || key.includes("-ease-") || key.includes("-path-") || key.includes("-width-") || key.includes("-height-") || key.includes("-visual-size-") || key.includes("-modal-width") || key.includes("-cover");
      return isColorToken && !isDimensional;
    });
    if (colorVariables.length === 0) {
      return "";
    }
    const colorMixVariables = colorVariables.map((key) => {
      const originalValue = allVariables?.[key] || "";
      if (originalValue.includes("color-mix") || originalValue.startsWith("#") || originalValue.startsWith("rgb")) {
        return `${key}: color-mix(in srgb, ${colorMix} ${strength}%, ${originalValue});`;
      }
      return `${key}: color-mix(in srgb, ${colorMix} ${strength}%, var(${key}-base, ${originalValue}));`;
    }).join("");
    return ` @supports (background: color-mix(in srgb, white 50%, black)) {
      :root {
        ${colorMixVariables}
      }
    }`;
  },
  generateBaseVariables(assignedCSSVariables) {
    const baseVariables = {};
    const themeBackgroundPrimary = assignedCSSVariables["--apkt-tokens-theme-backgroundPrimary"];
    if (themeBackgroundPrimary) {
      baseVariables["--apkt-tokens-theme-backgroundPrimary-base"] = themeBackgroundPrimary;
    }
    const coreBackgroundAccentPrimary = assignedCSSVariables["--apkt-tokens-core-backgroundAccentPrimary"];
    if (coreBackgroundAccentPrimary) {
      baseVariables["--apkt-tokens-core-backgroundAccentPrimary-base"] = coreBackgroundAccentPrimary;
    }
    return baseVariables;
  },
  applyColorMixToVariables(themeVariables, allVariables) {
    const colorMixVariables = {};
    if (allVariables?.["--apkt-tokens-theme-backgroundPrimary"]) {
      colorMixVariables["--apkt-tokens-theme-backgroundPrimary"] = "var(--apkt-tokens-theme-backgroundPrimary-base)";
    }
    if (allVariables?.["--apkt-tokens-core-backgroundAccentPrimary"]) {
      colorMixVariables["--apkt-tokens-core-backgroundAccentPrimary"] = "var(--apkt-tokens-core-backgroundAccentPrimary-base)";
    }
    const normalized = normalizeThemeVariables(themeVariables);
    const colorMix = normalized["color-mix"];
    const strength = normalized["color-mix-strength"];
    if (!strength || strength === 0) {
      return colorMixVariables;
    }
    const colorVariables = Object.keys(allVariables || {}).filter((key) => {
      const isColorToken = key.includes("-tokens-core-background") || key.includes("-tokens-core-text") || key.includes("-tokens-core-border") || key.includes("-tokens-core-foreground") || key.includes("-tokens-core-icon") || key.includes("-tokens-theme-background") || key.includes("-tokens-theme-text") || key.includes("-tokens-theme-border") || key.includes("-tokens-theme-foreground") || key.includes("-tokens-theme-icon") || key.includes("-tokens-theme-overlay");
      const isDimensional = key.includes("-borderRadius-") || key.includes("-spacing-") || key.includes("-textSize-") || key.includes("-fontFamily-") || key.includes("-fontWeight-") || key.includes("-typography-") || key.includes("-duration-") || key.includes("-ease-") || key.includes("-path-") || key.includes("-width-") || key.includes("-height-") || key.includes("-visual-size-") || key.includes("-modal-width") || key.includes("-cover");
      return isColorToken && !isDimensional;
    });
    if (colorVariables.length === 0) {
      return colorMixVariables;
    }
    colorVariables.forEach((key) => {
      const originalValue = allVariables?.[key] || "";
      if (key.endsWith("-base")) {
        return;
      }
      if (key === "--apkt-tokens-theme-backgroundPrimary" || key === "--apkt-tokens-core-backgroundAccentPrimary") {
        colorMixVariables[key] = `color-mix(in srgb, ${colorMix} ${strength}%, var(${key}-base))`;
      } else if (originalValue.includes("color-mix") || originalValue.startsWith("#") || originalValue.startsWith("rgb")) {
        colorMixVariables[key] = `color-mix(in srgb, ${colorMix} ${strength}%, ${originalValue})`;
      } else {
        colorMixVariables[key] = `color-mix(in srgb, ${colorMix} ${strength}%, var(${key}-base, ${originalValue}))`;
      }
    });
    return colorMixVariables;
  }
};
const { cssVariablesVarPrefix: vars } = ThemeHelperUtil.createCSSVariables(styles$1b);
function css(strings, ...values) {
  return i(strings, ...values.map((value) => typeof value === "function" ? r(value(vars)) : r(value)));
}
let apktTag = void 0;
let themeTag = void 0;
let darkModeTag = void 0;
let lightModeTag = void 0;
let currentThemeVariables = void 0;
const fonts = {
  "KHTeka-500-woff2": "https://fonts.reown.com/KHTeka-Medium.woff2",
  "KHTeka-400-woff2": "https://fonts.reown.com/KHTeka-Regular.woff2",
  "KHTeka-300-woff2": "https://fonts.reown.com/KHTeka-Light.woff2",
  "KHTekaMono-400-woff2": "https://fonts.reown.com/KHTekaMono-Regular.woff2",
  "KHTeka-500-woff": "https://fonts.reown.com/KHTeka-Light.woff",
  "KHTeka-400-woff": "https://fonts.reown.com/KHTeka-Regular.woff",
  "KHTeka-300-woff": "https://fonts.reown.com/KHTeka-Light.woff",
  "KHTekaMono-400-woff": "https://fonts.reown.com/KHTekaMono-Regular.woff"
};
function createAppKitTheme(themeVariables, theme = "dark") {
  if (apktTag) {
    document.head.removeChild(apktTag);
  }
  apktTag = document.createElement("style");
  apktTag.textContent = ThemeHelperUtil.createRootStyles(theme, themeVariables);
  document.head.appendChild(apktTag);
}
function initializeTheming(themeVariables, themeMode = "dark") {
  currentThemeVariables = themeVariables;
  themeTag = document.createElement("style");
  darkModeTag = document.createElement("style");
  lightModeTag = document.createElement("style");
  themeTag.textContent = createRootStyles(themeVariables).core.cssText;
  darkModeTag.textContent = createRootStyles(themeVariables).dark.cssText;
  lightModeTag.textContent = createRootStyles(themeVariables).light.cssText;
  document.head.appendChild(themeTag);
  document.head.appendChild(darkModeTag);
  document.head.appendChild(lightModeTag);
  createAppKitTheme(themeVariables, themeMode);
  setColorTheme(themeMode);
  const hasCustomFont = themeVariables?.["--apkt-font-family"] || themeVariables?.["--w3m-font-family"];
  if (!hasCustomFont) {
    for (const [key, url] of Object.entries(fonts)) {
      const link = document.createElement("link");
      link.rel = "preload";
      link.href = url;
      link.as = "font";
      link.type = key.includes("woff2") ? "font/woff2" : "font/woff";
      link.crossOrigin = "anonymous";
      document.head.appendChild(link);
    }
  }
  setColorTheme(themeMode);
}
function setColorTheme(themeMode = "dark") {
  if (darkModeTag && lightModeTag && apktTag) {
    if (themeMode === "light") {
      createAppKitTheme(currentThemeVariables, themeMode);
      darkModeTag.removeAttribute("media");
      lightModeTag.media = "enabled";
    } else {
      createAppKitTheme(currentThemeVariables, themeMode);
      lightModeTag.removeAttribute("media");
      darkModeTag.media = "enabled";
    }
  }
}
function setThemeVariables(_themeVariables) {
  currentThemeVariables = _themeVariables;
  if (themeTag && darkModeTag && lightModeTag) {
    themeTag.textContent = createRootStyles(_themeVariables).core.cssText;
    darkModeTag.textContent = createRootStyles(_themeVariables).dark.cssText;
    lightModeTag.textContent = createRootStyles(_themeVariables).light.cssText;
    const fontFamily2 = _themeVariables?.["--apkt-font-family"] || _themeVariables?.["--w3m-font-family"];
    if (fontFamily2) {
      themeTag.textContent = themeTag.textContent?.replace("font-family: KHTeka", `font-family: ${fontFamily2}`);
      darkModeTag.textContent = darkModeTag.textContent?.replace("font-family: KHTeka", `font-family: ${fontFamily2}`);
      lightModeTag.textContent = lightModeTag.textContent?.replace("font-family: KHTeka", `font-family: ${fontFamily2}`);
    }
  }
  if (apktTag) {
    const currentMode = lightModeTag?.media === "enabled" ? "light" : "dark";
    createAppKitTheme(_themeVariables, currentMode);
  }
}
function createRootStyles(_themeVariables) {
  const hasCustomFontFamily = Boolean(_themeVariables?.["--apkt-font-family"] || _themeVariables?.["--w3m-font-family"]);
  return {
    core: i`
      ${hasCustomFontFamily ? i`` : i`
            @font-face {
              font-family: 'KHTeka';
              src:
                url(${r(fonts["KHTeka-400-woff2"])}) format('woff2'),
                url(${r(fonts["KHTeka-400-woff"])}) format('woff');
              font-weight: 400;
              font-style: normal;
              font-display: swap;
            }

            @font-face {
              font-family: 'KHTeka';
              src:
                url(${r(fonts["KHTeka-300-woff2"])}) format('woff2'),
                url(${r(fonts["KHTeka-300-woff"])}) format('woff');
              font-weight: 300;
              font-style: normal;
            }

            @font-face {
              font-family: 'KHTekaMono';
              src:
                url(${r(fonts["KHTekaMono-400-woff2"])}) format('woff2'),
                url(${r(fonts["KHTekaMono-400-woff"])}) format('woff');
              font-weight: 400;
              font-style: normal;
            }

            @font-face {
              font-family: 'KHTeka';
              src:
                url(${r(fonts["KHTeka-400-woff2"])}) format('woff2'),
                url(${r(fonts["KHTeka-400-woff"])}) format('woff');
              font-weight: 400;
              font-style: normal;
            }
          `}

      @keyframes w3m-shake {
        0% {
          transform: scale(1) rotate(0deg);
        }
        20% {
          transform: scale(1) rotate(-1deg);
        }
        40% {
          transform: scale(1) rotate(1.5deg);
        }
        60% {
          transform: scale(1) rotate(-1.5deg);
        }
        80% {
          transform: scale(1) rotate(1deg);
        }
        100% {
          transform: scale(1) rotate(0deg);
        }
      }
      @keyframes w3m-iframe-fade-out {
        0% {
          opacity: 1;
        }
        100% {
          opacity: 0;
        }
      }
      @keyframes w3m-iframe-zoom-in {
        0% {
          transform: translateY(50px);
          opacity: 0;
        }
        100% {
          transform: translateY(0px);
          opacity: 1;
        }
      }
      @keyframes w3m-iframe-zoom-in-mobile {
        0% {
          transform: scale(0.95);
          opacity: 0;
        }
        100% {
          transform: scale(1);
          opacity: 1;
        }
      }
      :root {
        --apkt-modal-width: 370px;

        --apkt-visual-size-inherit: inherit;
        --apkt-visual-size-sm: 40px;
        --apkt-visual-size-md: 55px;
        --apkt-visual-size-lg: 80px;

        --apkt-path-network-sm: path(
          'M15.4 2.1a5.21 5.21 0 0 1 5.2 0l11.61 6.7a5.21 5.21 0 0 1 2.61 4.52v13.4c0 1.87-1 3.59-2.6 4.52l-11.61 6.7c-1.62.93-3.6.93-5.22 0l-11.6-6.7a5.21 5.21 0 0 1-2.61-4.51v-13.4c0-1.87 1-3.6 2.6-4.52L15.4 2.1Z'
        );

        --apkt-path-network-md: path(
          'M43.4605 10.7248L28.0485 1.61089C25.5438 0.129705 22.4562 0.129705 19.9515 1.61088L4.53951 10.7248C2.03626 12.2051 0.5 14.9365 0.5 17.886V36.1139C0.5 39.0635 2.03626 41.7949 4.53951 43.2752L19.9515 52.3891C22.4562 53.8703 25.5438 53.8703 28.0485 52.3891L43.4605 43.2752C45.9637 41.7949 47.5 39.0635 47.5 36.114V17.8861C47.5 14.9365 45.9637 12.2051 43.4605 10.7248Z'
        );

        --apkt-path-network-lg: path(
          'M78.3244 18.926L50.1808 2.45078C45.7376 -0.150261 40.2624 -0.150262 35.8192 2.45078L7.6756 18.926C3.23322 21.5266 0.5 26.3301 0.5 31.5248V64.4752C0.5 69.6699 3.23322 74.4734 7.6756 77.074L35.8192 93.5492C40.2624 96.1503 45.7376 96.1503 50.1808 93.5492L78.3244 77.074C82.7668 74.4734 85.5 69.6699 85.5 64.4752V31.5248C85.5 26.3301 82.7668 21.5266 78.3244 18.926Z'
        );

        --apkt-width-network-sm: 36px;
        --apkt-width-network-md: 48px;
        --apkt-width-network-lg: 86px;

        --apkt-duration-dynamic: 0ms;
        --apkt-height-network-sm: 40px;
        --apkt-height-network-md: 54px;
        --apkt-height-network-lg: 96px;
      }
    `,
    dark: i`
      :root {
      }
    `,
    light: i`
      :root {
      }
    `
  };
}
const resetStyles = i`
  div,
  span,
  iframe,
  a,
  img,
  form,
  button,
  label,
  *::after,
  *::before {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-style: normal;
    text-rendering: optimizeSpeed;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-tap-highlight-color: transparent;
    backface-visibility: hidden;
  }

  :host {
    font-family: var(--apkt-fontFamily-regular);
  }
`;
const elementStyles = i`
  button,
  a {
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;

    will-change: background-color, color, border, box-shadow, width, height, transform, opacity;
    outline: none;
    border: none;
    text-decoration: none;
    transition:
      background-color var(--apkt-durations-lg) var(--apkt-easings-ease-out-power-2),
      color var(--apkt-durations-lg) var(--apkt-easings-ease-out-power-2),
      border var(--apkt-durations-lg) var(--apkt-easings-ease-out-power-2),
      box-shadow var(--apkt-durations-lg) var(--apkt-easings-ease-out-power-2),
      width var(--apkt-durations-lg) var(--apkt-easings-ease-out-power-2),
      height var(--apkt-durations-lg) var(--apkt-easings-ease-out-power-2),
      transform var(--apkt-durations-lg) var(--apkt-easings-ease-out-power-2),
      opacity var(--apkt-durations-lg) var(--apkt-easings-ease-out-power-2),
      scale var(--apkt-durations-lg) var(--apkt-easings-ease-out-power-2),
      border-radius var(--apkt-durations-lg) var(--apkt-easings-ease-out-power-2);
    will-change:
      background-color, color, border, box-shadow, width, height, transform, opacity, scale,
      border-radius;
  }

  a:active:not([disabled]),
  button:active:not([disabled]) {
    scale: 0.975;
    transform-origin: center;
  }

  button:disabled {
    cursor: default;
  }

  input {
    border: none;
    outline: none;
    appearance: none;
  }
`;
const DECIMAL_POINT = ".";
const UiHelperUtil = {
  getSpacingStyles(spacing2, index) {
    if (Array.isArray(spacing2)) {
      return spacing2[index] ? `var(--apkt-spacing-${spacing2[index]})` : void 0;
    } else if (typeof spacing2 === "string") {
      return `var(--apkt-spacing-${spacing2})`;
    }
    return void 0;
  },
  getFormattedDate(date) {
    return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" }).format(date);
  },
  formatCurrency(amount = 0, options = {}) {
    const numericAmount = Number(amount);
    if (isNaN(numericAmount)) {
      return "$0.00";
    }
    const formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
      ...options
    });
    return formatter.format(numericAmount);
  },
  getHostName(url) {
    try {
      const newUrl = new URL(url);
      return newUrl.hostname;
    } catch (error) {
      return "";
    }
  },
  getTruncateString({ string, charsStart, charsEnd, truncate }) {
    if (string.length <= charsStart + charsEnd) {
      return string;
    }
    if (truncate === "end") {
      return `${string.substring(0, charsStart)}...`;
    } else if (truncate === "start") {
      return `...${string.substring(string.length - charsEnd)}`;
    }
    return `${string.substring(0, Math.floor(charsStart))}...${string.substring(string.length - Math.floor(charsEnd))}`;
  },
  generateAvatarColors(address) {
    const hash = address.toLowerCase().replace(/^0x/iu, "").replace(/[^a-f0-9]/gu, "");
    const baseColor = hash.substring(0, 6).padEnd(6, "0");
    const rgbColor = this.hexToRgb(baseColor);
    const masterBorderRadius = getComputedStyle(document.documentElement).getPropertyValue("--w3m-border-radius-master");
    const radius = Number(masterBorderRadius?.replace("px", ""));
    const edge = 100 - 3 * radius;
    const gradientCircle = `${edge}% ${edge}% at 65% 40%`;
    const colors2 = [];
    for (let i2 = 0; i2 < 5; i2 += 1) {
      const tintedColor = this.tintColor(rgbColor, 0.15 * i2);
      colors2.push(`rgb(${tintedColor[0]}, ${tintedColor[1]}, ${tintedColor[2]})`);
    }
    return `
    --local-color-1: ${colors2[0]};
    --local-color-2: ${colors2[1]};
    --local-color-3: ${colors2[2]};
    --local-color-4: ${colors2[3]};
    --local-color-5: ${colors2[4]};
    --local-radial-circle: ${gradientCircle}
   `;
  },
  hexToRgb(hex) {
    const bigint = parseInt(hex, 16);
    const r2 = bigint >> 16 & 255;
    const g = bigint >> 8 & 255;
    const b2 = bigint & 255;
    return [r2, g, b2];
  },
  tintColor(rgb, tint) {
    const [r2, g, b2] = rgb;
    const tintedR = Math.round(r2 + (255 - r2) * tint);
    const tintedG = Math.round(g + (255 - g) * tint);
    const tintedB = Math.round(b2 + (255 - b2) * tint);
    return [tintedR, tintedG, tintedB];
  },
  isNumber(character) {
    const regex = {
      number: /^[0-9]+$/u
    };
    return regex.number.test(character);
  },
  getColorTheme(theme) {
    if (theme) {
      return theme;
    } else if (typeof window !== "undefined" && window.matchMedia && typeof window.matchMedia === "function") {
      if (window.matchMedia("(prefers-color-scheme: dark)")?.matches) {
        return "dark";
      }
      return "light";
    }
    return "dark";
  },
  splitBalance(input) {
    const parts = input.split(".");
    if (parts.length === 2) {
      return [parts[0], parts[1]];
    }
    return ["0", "00"];
  },
  roundNumber(number, threshold, fixed) {
    const roundedNumber = number.toString().length >= threshold ? Number(number).toFixed(fixed) : number;
    return roundedNumber;
  },
  cssDurationToNumber(duration) {
    if (duration.endsWith("s")) {
      return Number(duration.replace("s", "")) * 1e3;
    } else if (duration.endsWith("ms")) {
      return Number(duration.replace("ms", ""));
    }
    return 0;
  },
  maskInput({ value, decimals, integers }) {
    value = value.replace(",", ".");
    if (value === DECIMAL_POINT) {
      return `0${DECIMAL_POINT}`;
    }
    const [integerPart = "", decimalsPart] = value.split(DECIMAL_POINT).map((p) => p.replace(/[^0-9]/gu, ""));
    const limitedInteger = integers ? integerPart.substring(0, integers) : integerPart;
    const cleanIntegerPart = limitedInteger.length === 2 ? String(Number(limitedInteger)) : limitedInteger;
    const cleanDecimalsPart = typeof decimals === "number" ? decimalsPart?.substring(0, decimals) : decimalsPart;
    const canIncludeDecimals = typeof decimals !== "number" || decimals > 0;
    const maskValue = typeof cleanDecimalsPart === "string" && canIncludeDecimals ? [cleanIntegerPart, cleanDecimalsPart].join(DECIMAL_POINT) : cleanIntegerPart;
    return maskValue ?? "";
  },
  capitalize(value) {
    if (!value) {
      return "";
    }
    return value.charAt(0).toUpperCase() + value.slice(1);
  }
};
const FLOAT_FIXED_VALUE = 3;
const GAS_FEE_THRESHOLD = 0.1;
const plusTypes = ["receive", "deposit", "borrow", "claim"];
const minusTypes = ["withdraw", "repay", "burn"];
const TransactionUtil = {
  getTransactionGroupTitle(year, month) {
    const currentYear = DateUtil.getYear();
    const monthName = DateUtil.getMonthNameByIndex(month);
    const isCurrentYear = year === currentYear;
    const groupTitle = isCurrentYear ? monthName : `${monthName} ${year}`;
    return groupTitle;
  },
  getTransactionImages(transfers) {
    const [transfer] = transfers;
    const hasMultipleTransfers = transfers?.length > 1;
    if (hasMultipleTransfers) {
      return transfers.map((item) => this.getTransactionImage(item));
    }
    return [this.getTransactionImage(transfer)];
  },
  getTransactionImage(transfer) {
    return {
      type: TransactionUtil.getTransactionTransferTokenType(transfer),
      url: TransactionUtil.getTransactionImageURL(transfer)
    };
  },
  getTransactionImageURL(transfer) {
    let imageURL = void 0;
    const isNFT = Boolean(transfer?.nft_info);
    const isFungible = Boolean(transfer?.fungible_info);
    if (transfer && isNFT) {
      imageURL = transfer?.nft_info?.content?.preview?.url;
    } else if (transfer && isFungible) {
      imageURL = transfer?.fungible_info?.icon?.url;
    }
    return imageURL;
  },
  getTransactionTransferTokenType(transfer) {
    if (transfer?.fungible_info) {
      return "FUNGIBLE";
    } else if (transfer?.nft_info) {
      return "NFT";
    }
    return void 0;
  },
  getTransactionDescriptions(transaction, mergedTransfers) {
    const type = transaction?.metadata?.operationType;
    const transfers = mergedTransfers || transaction?.transfers;
    const hasTransfer = transfers && transfers.length > 0;
    const hasMultipleTransfers = transfers && transfers.length > 1;
    const isFungible = hasTransfer && transfers.every((transfer) => Boolean(transfer?.fungible_info));
    const [firstTransfer, secondTransfer] = transfers || [];
    let firstDescription = this.getTransferDescription(firstTransfer);
    let secondDescription = this.getTransferDescription(secondTransfer);
    if (!hasTransfer) {
      const isSendOrReceive = type === "send" || type === "receive";
      if (isSendOrReceive && isFungible) {
        firstDescription = UiHelperUtil.getTruncateString({
          string: transaction?.metadata.sentFrom,
          charsStart: 4,
          charsEnd: 6,
          truncate: "middle"
        });
        secondDescription = UiHelperUtil.getTruncateString({
          string: transaction?.metadata.sentTo,
          charsStart: 4,
          charsEnd: 6,
          truncate: "middle"
        });
        return [firstDescription, secondDescription];
      }
      return [transaction.metadata.status];
    }
    if (hasMultipleTransfers) {
      return transfers?.map((item) => this.getTransferDescription(item));
    }
    let prefix = "";
    if (plusTypes.includes(type)) {
      prefix = "+";
    } else if (minusTypes.includes(type)) {
      prefix = "-";
    }
    firstDescription = prefix.concat(firstDescription);
    return [firstDescription];
  },
  getTransferDescription(transfer) {
    let description = "";
    if (!transfer) {
      return description;
    }
    if (transfer?.nft_info) {
      description = transfer?.nft_info?.name || "-";
    } else if (transfer?.fungible_info) {
      description = this.getFungibleTransferDescription(transfer) || "-";
    }
    return description;
  },
  getFungibleTransferDescription(transfer) {
    if (!transfer) {
      return null;
    }
    const quantity = this.getQuantityFixedValue(transfer?.quantity.numeric);
    const description = [quantity, transfer?.fungible_info?.symbol].join(" ").trim();
    return description;
  },
  mergeTransfers(transfers) {
    if (transfers?.length <= 1) {
      return transfers;
    }
    const filteredTransfers = this.filterGasFeeTransfers(transfers);
    const mergedTransfers = filteredTransfers.reduce((acc, t) => {
      const name = t?.fungible_info?.name;
      const existingTransfer = acc.find(({ fungible_info, direction }) => name && name === fungible_info?.name && direction === t.direction);
      if (existingTransfer) {
        const quantity = Number(existingTransfer.quantity.numeric) + Number(t.quantity.numeric);
        existingTransfer.quantity.numeric = quantity.toString();
        existingTransfer.value = (existingTransfer.value || 0) + (t.value || 0);
      } else {
        acc.push(t);
      }
      return acc;
    }, []);
    let finalTransfers = mergedTransfers;
    if (mergedTransfers.length > 2) {
      finalTransfers = mergedTransfers.sort((a, b2) => (b2.value || 0) - (a.value || 0)).slice(0, 2);
    }
    finalTransfers = finalTransfers.sort((a, b2) => {
      if (a.direction === "out" && b2.direction === "in") {
        return -1;
      }
      if (a.direction === "in" && b2.direction === "out") {
        return 1;
      }
      return 0;
    });
    return finalTransfers;
  },
  filterGasFeeTransfers(transfers) {
    const tokenGroups = transfers?.reduce((groups, transfer) => {
      const tokenName = transfer?.fungible_info?.name;
      if (tokenName) {
        if (!groups[tokenName]) {
          groups[tokenName] = [];
        }
        groups[tokenName].push(transfer);
      }
      return groups;
    }, {});
    const filteredTransfers = [];
    Object.values(tokenGroups ?? {}).forEach((tokenTransfers) => {
      if (tokenTransfers.length === 1) {
        const firstTransfer = tokenTransfers[0];
        if (firstTransfer) {
          filteredTransfers.push(firstTransfer);
        }
      } else {
        const inTransfers = tokenTransfers.filter((t) => t.direction === "in");
        const outTransfers = tokenTransfers.filter((t) => t.direction === "out");
        if (inTransfers.length === 1 && outTransfers.length === 1) {
          const inTransfer = inTransfers[0];
          const outTransfer = outTransfers[0];
          let didApplyGasFeeFilter = false;
          if (inTransfer && outTransfer) {
            const inAmount = Number(inTransfer.quantity.numeric);
            const outAmount = Number(outTransfer.quantity.numeric);
            if (outAmount < inAmount * GAS_FEE_THRESHOLD) {
              filteredTransfers.push(inTransfer);
              didApplyGasFeeFilter = true;
            } else if (inAmount < outAmount * GAS_FEE_THRESHOLD) {
              filteredTransfers.push(outTransfer);
              didApplyGasFeeFilter = true;
            }
          }
          if (!didApplyGasFeeFilter) {
            filteredTransfers.push(...tokenTransfers);
          }
        } else {
          const significantTransfers = this.filterGasFeesFromTokenGroup(tokenTransfers);
          filteredTransfers.push(...significantTransfers);
        }
      }
    });
    transfers?.forEach((transfer) => {
      if (!transfer?.fungible_info?.name) {
        filteredTransfers.push(transfer);
      }
    });
    return filteredTransfers;
  },
  filterGasFeesFromTokenGroup(tokenTransfers) {
    if (tokenTransfers.length <= 1) {
      return tokenTransfers;
    }
    const amounts = tokenTransfers?.map((t) => Number(t.quantity.numeric));
    const maxAmount = Math.max(...amounts);
    const minAmount = Math.min(...amounts);
    const extremeGasThreshold = 0.01;
    if (minAmount < maxAmount * extremeGasThreshold) {
      const filtered = tokenTransfers?.filter((t) => {
        const amount = Number(t.quantity.numeric);
        return amount >= maxAmount * extremeGasThreshold;
      });
      return filtered;
    }
    const inTransfers = tokenTransfers?.filter((t) => t.direction === "in");
    const outTransfers = tokenTransfers?.filter((t) => t.direction === "out");
    if (inTransfers.length === 1 && outTransfers.length === 1) {
      const inTransfer = inTransfers[0];
      const outTransfer = outTransfers[0];
      if (inTransfer && outTransfer) {
        const inAmount = Number(inTransfer.quantity.numeric);
        const outAmount = Number(outTransfer.quantity.numeric);
        if (outAmount < inAmount * GAS_FEE_THRESHOLD) {
          return [inTransfer];
        } else if (inAmount < outAmount * GAS_FEE_THRESHOLD) {
          return [outTransfer];
        }
      }
    }
    return tokenTransfers;
  },
  getQuantityFixedValue(value) {
    if (!value) {
      return null;
    }
    const parsedValue = parseFloat(value);
    return parsedValue.toFixed(FLOAT_FIXED_VALUE);
  }
};
function standardCustomElement(tagName, descriptor) {
  const { kind, elements } = descriptor;
  return {
    kind,
    elements,
    finisher(clazz) {
      if (!customElements.get(tagName)) {
        customElements.define(tagName, clazz);
      }
    }
  };
}
function legacyCustomElement(tagName, clazz) {
  if (!customElements.get(tagName)) {
    customElements.define(tagName, clazz);
  }
  return clazz;
}
function customElement(tagName) {
  return function create(classOrDescriptor) {
    return typeof classOrDescriptor === "function" ? legacyCustomElement(tagName, classOrDescriptor) : standardCustomElement(tagName, classOrDescriptor);
  };
}
const appStoreSvg = b`<svg width="30" height="30" viewBox="0 0 30 30" fill="none">
  <g clip-path="url(#clip0_87_33)">
    <path d="M23.9367 2.29447e-07H6.05917C5.26333 -0.000218805 4.47526 0.156384 3.73997 0.46086C3.00469 0.765337 2.33661 1.21172 1.77391 1.7745C1.21121 2.33727 0.764917 3.00542 0.460542 3.74074C0.156167 4.47607 -0.000327963 5.26417 5.16031e-07 6.06V23.9433C4.48257e-07 24.7389 0.156744 25.5267 0.461276 26.2617C0.765808 26.9967 1.21216 27.6645 1.77484 28.2269C2.33752 28.7894 3.0055 29.2355 3.74061 29.5397C4.47573 29.8439 5.26358 30.0003 6.05917 30H23.9417C25.5486 29.9996 27.0895 29.3609 28.2257 28.2245C29.3618 27.0881 30 25.5469 30 23.94V6.06C29.9993 4.45241 29.3602 2.91091 28.2232 1.77449C27.0861 0.638064 25.5443 -0.000220881 23.9367 2.29447e-07Z" fill="url(#paint0_linear_87_33)"/>
    <path d="M14.8708 6.89259L15.4783 5.84259C15.5679 5.68703 15.6873 5.55064 15.8296 5.44122C15.9719 5.3318 16.1344 5.25148 16.3078 5.20486C16.4812 5.15824 16.662 5.14622 16.8401 5.1695C17.0181 5.19277 17.1898 5.25088 17.3453 5.34051C17.5009 5.43013 17.6373 5.54952 17.7467 5.69186C17.8561 5.83419 17.9364 5.99669 17.9831 6.17006C18.0297 6.34344 18.0417 6.5243 18.0184 6.70232C17.9952 6.88034 17.9371 7.05203 17.8474 7.20759L11.9949 17.3401H16.2283C17.5999 17.3401 18.3691 18.9526 17.7724 20.0701H5.36159C5.18215 20.0707 5.00436 20.0359 4.83845 19.9675C4.67254 19.8992 4.5218 19.7986 4.39492 19.6718C4.26803 19.5449 4.16751 19.3941 4.09915 19.2282C4.03079 19.0623 3.99593 18.8845 3.99659 18.7051C3.99659 17.9476 4.60492 17.3401 5.36159 17.3401H8.84159L13.2958 9.61926L11.9041 7.20426C11.738 6.89096 11.7 6.52543 11.7982 6.18469C11.8963 5.84395 12.1229 5.5546 12.4301 5.37763C12.7374 5.20065 13.1014 5.14987 13.4454 5.23599C13.7893 5.3221 14.0864 5.53838 14.2741 5.83926L14.8708 6.89259ZM9.60659 21.4759L8.29409 23.7526C8.20446 23.9082 8.08506 24.0446 7.94271 24.1541C7.80035 24.2636 7.63783 24.344 7.46441 24.3906C7.291 24.4373 7.11009 24.4493 6.93202 24.4261C6.75395 24.4028 6.58221 24.3447 6.42659 24.2551C6.27097 24.1655 6.13454 24.0461 6.02506 23.9037C5.91559 23.7613 5.83523 23.5988 5.78857 23.4254C5.74191 23.252 5.72986 23.0711 5.75311 22.893C5.77637 22.715 5.83446 22.5432 5.92409 22.3876L6.89909 20.7001C8.00159 20.3584 8.89742 20.6209 9.60659 21.4759ZM20.9066 17.3476H24.4583C25.2158 17.3476 25.8233 17.9551 25.8233 18.7126C25.8233 19.4701 25.2149 20.0776 24.4583 20.0776H22.4858L23.8166 22.3876C24.1916 23.0443 23.9708 23.8726 23.3149 24.2551C23.0006 24.4359 22.6274 24.4845 22.2772 24.3903C21.927 24.2961 21.6286 24.0667 21.4474 23.7526C19.2058 19.8643 17.5216 16.9534 16.4041 15.0151C15.2608 13.0426 16.0783 11.0626 16.8841 10.3909C17.7799 11.9293 19.1191 14.2501 20.9074 17.3476H20.9066Z" fill="white"/>
  </g>
  <defs>
    <linearGradient id="paint0_linear_87_33" x1="15" y1="2.29447e-07" x2="15" y2="30" gradientUnits="userSpaceOnUse">
      <stop stop-color="#18BFFB"/>
      <stop offset="1" stop-color="#2072F3"/>
    </linearGradient>
    <clipPath id="clip0_87_33">
      <rect width="30" height="30" fill="white"/>
    </clipPath>
  </defs>
</svg>`;
const appleSvg = b`<svg fill="none" viewBox="0 0 40 40">
  <g clip-path="url(#a)">
    <g clip-path="url(#b)">
      <circle cx="20" cy="19.89" r="20" fill="#000" />
      <g clip-path="url(#c)">
        <path
          fill="#fff"
          d="M28.77 23.3c-.69 1.99-2.75 5.52-4.87 5.56-1.4.03-1.86-.84-3.46-.84-1.61 0-2.12.81-3.45.86-2.25.1-5.72-5.1-5.72-9.62 0-4.15 2.9-6.2 5.42-6.25 1.36-.02 2.64.92 3.47.92.83 0 2.38-1.13 4.02-.97.68.03 2.6.28 3.84 2.08-3.27 2.14-2.76 6.61.75 8.25ZM24.2 7.88c-2.47.1-4.49 2.69-4.2 4.84 2.28.17 4.47-2.39 4.2-4.84Z"
        />
      </g>
    </g>
  </g>
  <defs>
    <clipPath id="a"><rect width="40" height="40" fill="#fff" rx="20" /></clipPath>
    <clipPath id="b"><path fill="#fff" d="M0 0h40v40H0z" /></clipPath>
    <clipPath id="c"><path fill="#fff" d="M8 7.89h24v24H8z" /></clipPath>
  </defs>
</svg>`;
const bitcoinSvg$1 = b`
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 8 11">
    <path
      fill="var(--apkt-tokens-theme-textPrimary)"
      d="M7.862 4.86c.159-1.064-.652-1.637-1.76-2.018l.36-1.443-.879-.218-.35 1.404c-.23-.058-.468-.112-.703-.166l.352-1.413-.877-.219-.36 1.442a29.02 29.02 0 0 1-.56-.132v-.005l-1.21-.302-.234.938s.652.15.638.158c.356.089.42.324.41.51l-.41 1.644a.715.715 0 0 1 .09.03l-.092-.024-.574 2.302c-.044.108-.154.27-.402.208.008.013-.639-.16-.639-.16L.227 8.403l1.142.285c.213.053.42.109.626.161l-.363 1.459.877.218.36-1.443c.239.065.472.125.7.182l-.36 1.436.879.219.363-1.456c1.497.283 2.623.17 3.097-1.185.381-1.09-.02-1.719-.807-2.129.574-.132 1.006-.51 1.12-1.289ZM5.856 7.673c-.272 1.09-2.107.5-2.702.353l.482-1.933c.595.149 2.503.443 2.22 1.58Zm.271-2.829c-.247.992-1.775.488-2.27.365l.436-1.753c.496.124 2.092.354 1.834 1.388Z"
    />
  </svg>
`;
const checkmarkSvg = b`<svg viewBox="0 0 32 32" fill="none">
<path d="M29.0612 10.0613L13.0612 26.0613C12.9218 26.2011 12.7563 26.3121 12.5739 26.3878C12.3916 26.4635 12.1961 26.5024 11.9987 26.5024C11.8013 26.5024 11.6058 26.4635 11.4235 26.3878C11.2411 26.3121 11.0756 26.2011 10.9362 26.0613L3.9362 19.0613C3.79667 18.9217 3.68599 18.7561 3.61047 18.5738C3.53496 18.3915 3.49609 18.1961 3.49609 17.9988C3.49609 17.8014 3.53496 17.606 3.61047 17.4237C3.68599 17.2414 3.79667 17.0758 3.9362 16.9363C4.07573 16.7967 4.24137 16.686 4.42367 16.6105C4.60598 16.535 4.80137 16.4962 4.9987 16.4962C5.19602 16.4962 5.39141 16.535 5.57372 16.6105C5.75602 16.686 5.92167 16.7967 6.0612 16.9363L11.9999 22.875L26.9387 7.93876C27.2205 7.65697 27.6027 7.49866 28.0012 7.49866C28.3997 7.49866 28.7819 7.65697 29.0637 7.93876C29.3455 8.22055 29.5038 8.60274 29.5038 9.00126C29.5038 9.39977 29.3455 9.78197 29.0637 10.0638L29.0612 10.0613Z" fill="currentColor"/>
</svg>
`;
const chromeStoreSvg = b`<svg width="30" height="30" viewBox="0 0 30 30" fill="none">
<path d="M14.9978 7.80003H27.4668C26.2032 5.61107 24.3857 3.79333 22.1968 2.52955C20.008 1.26577 17.525 0.600485 14.9975 0.600586C12.47 0.600687 9.98712 1.26617 7.79838 2.53012C5.60964 3.79408 3.79221 5.61197 2.52881 7.80103L8.76281 18.599L8.76881 18.598C8.13412 17.5044 7.79906 16.2628 7.79743 14.9983C7.79579 13.7339 8.12764 12.4914 8.7595 11.3961C9.39136 10.3008 10.3009 9.39159 11.3963 8.76005C12.4918 8.12851 13.7344 7.79702 14.9988 7.79903L14.9978 7.80003Z" fill="url(#paint0_linear_87_32)"/>
<path d="M21.237 18.5981L15.003 29.3961C17.5305 29.3961 20.0134 28.7308 22.2022 27.467C24.391 26.2032 26.2086 24.3854 27.4721 22.1965C28.7356 20.0075 29.4006 17.5245 29.4003 14.997C29.3999 12.4695 28.7342 9.9867 27.47 7.7981H15.002L15 7.8041C16.2642 7.80168 17.5067 8.13257 18.6022 8.76342C19.6977 9.39428 20.6076 10.3028 21.2401 11.3974C21.8726 12.492 22.2053 13.734 22.2048 14.9982C22.2042 16.2623 21.8704 17.504 21.237 18.5981Z" fill="url(#paint1_linear_87_32)"/>
<path d="M8.76502 18.601L2.53102 7.80298C1.26664 9.99172 0.600848 12.4748 0.600586 15.0025C0.600324 17.5302 1.2656 20.0134 2.52953 22.2024C3.79345 24.3914 5.61145 26.209 7.80071 27.4725C9.98998 28.736 12.4733 29.4008 15.001 29.4L21.236 18.602L21.232 18.598C20.6022 19.6941 19.6944 20.6049 18.6003 21.2383C17.5062 21.8717 16.2644 22.2055 15.0002 22.2059C13.7359 22.2063 12.4939 21.8733 11.3994 21.2406C10.3049 20.6079 9.39657 19.6977 8.76602 18.602L8.76502 18.601Z" fill="url(#paint2_linear_87_32)"/>
<path d="M14.9998 22.2C16.9094 22.2 18.7407 21.4415 20.091 20.0912C21.4412 18.741 22.1998 16.9096 22.1998 15C22.1998 13.0905 21.4412 11.2591 20.091 9.90888C18.7407 8.55862 16.9094 7.80005 14.9998 7.80005C13.0902 7.80005 11.2589 8.55862 9.90864 9.90888C8.55837 11.2591 7.7998 13.0905 7.7998 15C7.7998 16.9096 8.55837 18.741 9.90864 20.0912C11.2589 21.4415 13.0902 22.2 14.9998 22.2Z" fill="white"/>
<path d="M14.9998 20.7C16.5115 20.7 17.9614 20.0995 19.0303 19.0306C20.0993 17.9616 20.6998 16.5118 20.6998 15C20.6998 13.4883 20.0993 12.0385 19.0303 10.9695C17.9614 9.90058 16.5115 9.30005 14.9998 9.30005C13.4881 9.30005 12.0383 9.90058 10.9693 10.9695C9.90034 12.0385 9.2998 13.4883 9.2998 15C9.2998 16.5118 9.90034 17.9616 10.9693 19.0306C12.0383 20.0995 13.4881 20.7 14.9998 20.7Z" fill="#1A73E8"/>
<defs>
  <linearGradient id="paint0_linear_87_32" x1="3.29381" y1="2.99503" x2="38.0998" y2="2.99503" gradientUnits="userSpaceOnUse">
    <stop stop-color="#D93025"/>
    <stop offset="1" stop-color="#EA4335"/>
  </linearGradient>
  <linearGradient id="paint1_linear_87_32" x1="17.953" y1="29.1431" x2="34.194" y2="-0.298904" gradientUnits="userSpaceOnUse">
    <stop stop-color="#FCC934"/>
    <stop offset="1" stop-color="#FBBC04"/>
  </linearGradient>
  <linearGradient id="paint2_linear_87_32" x1="22.873" y1="28.2" x2="6.63202" y2="-1.24102" gradientUnits="userSpaceOnUse">
    <stop stop-color="#1E8E3E"/>
    <stop offset="1" stop-color="#34A853"/>
  </linearGradient>
</defs>
</svg>`;
const coinsSvg = b`<svg width="32" height="32" viewBox="0 0 32 32" fill="none">
<path d="M23 11.1962V10.5C23 7.365 18.2712 5 12 5C5.72875 5 1 7.365 1 10.5V15.5C1 18.1112 4.28125 20.1863 9 20.8075V21.5C9 24.635 13.7288 27 20 27C26.2712 27 31 24.635 31 21.5V16.5C31 13.9125 27.8225 11.835 23 11.1962ZM7 18.3587C4.55125 17.675 3 16.5487 3 15.5V13.7413C4.02 14.4637 5.38625 15.0463 7 15.4375V18.3587ZM17 15.4375C18.6138 15.0463 19.98 14.4637 21 13.7413V15.5C21 16.5487 19.4487 17.675 17 18.3587V15.4375ZM15 24.3587C12.5513 23.675 11 22.5487 11 21.5V20.9788C11.3287 20.9913 11.6613 21 12 21C12.485 21 12.9587 20.9837 13.4237 20.9562C13.9403 21.1412 14.4665 21.2981 15 21.4263V24.3587ZM15 18.7812C14.0068 18.928 13.004 19.0011 12 19C10.996 19.0011 9.99324 18.928 9 18.7812V15.8075C9.99472 15.9371 10.9969 16.0014 12 16C13.0031 16.0014 14.0053 15.9371 15 15.8075V18.7812ZM23 24.7812C21.0106 25.0729 18.9894 25.0729 17 24.7812V21.8C17.9944 21.9337 18.9967 22.0005 20 22C21.0031 22.0014 22.0053 21.9371 23 21.8075V24.7812ZM29 21.5C29 22.5487 27.4487 23.675 25 24.3587V21.4375C26.6138 21.0462 27.98 20.4637 29 19.7412V21.5Z" fill="currentColor"/>
</svg>
`;
const cursorSvg = b` <svg fill="none" viewBox="0 0 13 4">
  <path fill="currentColor" d="M.5 0h12L8.9 3.13a3.76 3.76 0 0 1-4.8 0L.5 0Z" />
</svg>`;
const discordSvg = b`<svg fill="none" viewBox="0 0 40 40">
  <g clip-path="url(#a)">
    <g clip-path="url(#b)">
      <circle cx="20" cy="19.89" r="20" fill="#5865F2" />
      <path
        fill="#fff"
        fill-rule="evenodd"
        d="M25.71 28.15C30.25 28 32 25.02 32 25.02c0-6.61-2.96-11.98-2.96-11.98-2.96-2.22-5.77-2.15-5.77-2.15l-.29.32c3.5 1.07 5.12 2.61 5.12 2.61a16.75 16.75 0 0 0-10.34-1.93l-.35.04a15.43 15.43 0 0 0-5.88 1.9s1.71-1.63 5.4-2.7l-.2-.24s-2.81-.07-5.77 2.15c0 0-2.96 5.37-2.96 11.98 0 0 1.73 2.98 6.27 3.13l1.37-1.7c-2.6-.79-3.6-2.43-3.6-2.43l.58.35.09.06.08.04.02.01.08.05a17.25 17.25 0 0 0 4.52 1.58 14.4 14.4 0 0 0 8.3-.86c.72-.27 1.52-.66 2.37-1.21 0 0-1.03 1.68-3.72 2.44.61.78 1.35 1.67 1.35 1.67Zm-9.55-9.6c-1.17 0-2.1 1.03-2.1 2.28 0 1.25.95 2.28 2.1 2.28 1.17 0 2.1-1.03 2.1-2.28.01-1.25-.93-2.28-2.1-2.28Zm7.5 0c-1.17 0-2.1 1.03-2.1 2.28 0 1.25.95 2.28 2.1 2.28 1.17 0 2.1-1.03 2.1-2.28 0-1.25-.93-2.28-2.1-2.28Z"
        clip-rule="evenodd"
      />
    </g>
  </g>
  <defs>
    <clipPath id="a"><rect width="40" height="40" fill="#fff" rx="20" /></clipPath>
    <clipPath id="b"><path fill="#fff" d="M0 0h40v40H0z" /></clipPath>
  </defs>
</svg>`;
const ethereumSvg = b`<svg
  xmlns="http://www.w3.org/2000/svg"
  fill="none"
  viewBox="0 0 9 12"
>
  <path
    fill="var(--apkt-tokens-theme-textPrimary)"
    d="M4.666.001v4.435l3.748 1.675L4.666.001Zm0 0L.917 6.111l3.749-1.675V.001Zm0 8.984V12l3.75-5.19-3.75 2.176Zm0 3.014V8.985L.917 6.81 4.666 12Zm0-3.712 3.748-2.176-3.748-1.675v3.851Z"
  />
  <path fill="var(--apkt-tokens-theme-textPrimary)" d="m.917 6.111 3.749 2.176v-3.85L.917 6.11Z" />
</svg>`;
const etherscanSvg = b`<svg fill="none" viewBox="0 0 16 16">
  <path
    fill="currentColor"
    d="M4.25 7a.63.63 0 0 0-.63.63v3.97c0 .28-.2.51-.47.54l-.75.07a.93.93 0 0 1-.9-.47A7.51 7.51 0 0 1 5.54.92a7.5 7.5 0 0 1 9.54 4.62c.12.35.06.72-.16 1-.74.97-1.68 1.78-2.6 2.44V4.44a.64.64 0 0 0-.63-.64h-1.06c-.35 0-.63.3-.63.64v5.5c0 .23-.12.42-.32.5l-.52.23V6.05c0-.36-.3-.64-.64-.64H7.45c-.35 0-.64.3-.64.64v4.97c0 .25-.17.46-.4.52a5.8 5.8 0 0 0-.45.11v-4c0-.36-.3-.65-.64-.65H4.25ZM14.07 12.4A7.49 7.49 0 0 1 3.6 14.08c4.09-.58 9.14-2.5 11.87-6.6v.03a7.56 7.56 0 0 1-1.41 4.91Z"
  />
</svg>`;
const facebookSvg = b`<svg fill="none" viewBox="0 0 40 40">
  <g clip-path="url(#a)">
    <g clip-path="url(#b)">
      <circle cx="20" cy="19.89" r="20" fill="#1877F2" />
      <g clip-path="url(#c)">
        <path
          fill="#fff"
          d="M26 12.38h-2.89c-.92 0-1.61.38-1.61 1.34v1.66H26l-.36 4.5H21.5v12H17v-12h-3v-4.5h3V12.5c0-3.03 1.6-4.62 5.2-4.62H26v4.5Z"
        />
      </g>
    </g>
    <path
      fill="#1877F2"
      d="M40 20a20 20 0 1 0-23.13 19.76V25.78H11.8V20h5.07v-4.4c0-5.02 3-7.79 7.56-7.79 2.19 0 4.48.4 4.48.4v4.91h-2.53c-2.48 0-3.25 1.55-3.25 3.13V20h5.54l-.88 5.78h-4.66v13.98A20 20 0 0 0 40 20Z"
    />
    <path
      fill="#fff"
      d="m27.79 25.78.88-5.78h-5.55v-3.75c0-1.58.78-3.13 3.26-3.13h2.53V8.2s-2.3-.39-4.48-.39c-4.57 0-7.55 2.77-7.55 7.78V20H11.8v5.78h5.07v13.98a20.15 20.15 0 0 0 6.25 0V25.78h4.67Z"
    />
  </g>
  <defs>
    <clipPath id="a"><rect width="40" height="40" fill="#fff" rx="20" /></clipPath>
    <clipPath id="b"><path fill="#fff" d="M0 0h40v40H0z" /></clipPath>
    <clipPath id="c"><path fill="#fff" d="M8 7.89h24v24H8z" /></clipPath>
  </defs>
</svg>`;
const farcasterSvg = b`<svg style="border-radius: 9999px; overflow: hidden;"  fill="none" viewBox="0 0 1000 1000">
  <rect width="1000" height="1000" rx="9999" ry="9999" fill="#855DCD"/>
  <path fill="#855DCD" d="M0 0h1000v1000H0V0Z" />
  <path
    fill="#fff"
    d="M320 248h354v504h-51.96V521.13h-.5c-5.76-63.8-59.31-113.81-124.54-113.81s-118.78 50-124.53 113.81h-.5V752H320V248Z"
  />
  <path
    fill="#fff"
    d="m225 320 21.16 71.46h17.9v289.09a16.29 16.29 0 0 0-16.28 16.24v19.49h-3.25a16.3 16.3 0 0 0-16.28 16.24V752h182.26v-19.48a16.22 16.22 0 0 0-16.28-16.24h-3.25v-19.5a16.22 16.22 0 0 0-16.28-16.23h-19.52V320H225Zm400.3 360.55a16.3 16.3 0 0 0-15.04 10.02 16.2 16.2 0 0 0-1.24 6.22v19.49h-3.25a16.29 16.29 0 0 0-16.27 16.24V752h182.24v-19.48a16.23 16.23 0 0 0-16.27-16.24h-3.25v-19.5a16.2 16.2 0 0 0-10.04-15 16.3 16.3 0 0 0-6.23-1.23v-289.1h17.9L775 320H644.82v360.55H625.3Z"
  />
</svg>`;
const githubSvg = b`<svg fill="none" viewBox="0 0 40 40">
  <g clip-path="url(#a)">
    <g clip-path="url(#b)">
      <circle cx="20" cy="19.89" r="20" fill="#1B1F23" />
      <g clip-path="url(#c)">
        <path
          fill="#fff"
          d="M8 19.89a12 12 0 1 1 15.8 11.38c-.6.12-.8-.26-.8-.57v-3.3c0-1.12-.4-1.85-.82-2.22 2.67-.3 5.48-1.31 5.48-5.92 0-1.31-.47-2.38-1.24-3.22.13-.3.54-1.52-.12-3.18 0 0-1-.32-3.3 1.23a11.54 11.54 0 0 0-6 0c-2.3-1.55-3.3-1.23-3.3-1.23a4.32 4.32 0 0 0-.12 3.18 4.64 4.64 0 0 0-1.24 3.22c0 4.6 2.8 5.63 5.47 5.93-.34.3-.65.83-.76 1.6-.69.31-2.42.84-3.5-1 0 0-.63-1.15-1.83-1.23 0 0-1.18-.02-.09.73 0 0 .8.37 1.34 1.76 0 0 .7 2.14 4.03 1.41v2.24c0 .31-.2.68-.8.57A12 12 0 0 1 8 19.9Z"
        />
      </g>
    </g>
  </g>
  <defs>
    <clipPath id="a"><rect width="40" height="40" fill="#fff" rx="20" /></clipPath>
    <clipPath id="b"><path fill="#fff" d="M0 0h40v40H0z" /></clipPath>
    <clipPath id="c"><path fill="#fff" d="M8 7.89h24v24H8z" /></clipPath>
  </defs>
</svg>`;
const googleSvg$1 = b`<svg fill="none" viewBox="0 0 40 40">
  <path
    fill="#4285F4"
    d="M32.74 20.3c0-.93-.08-1.81-.24-2.66H20.26v5.03h7a6 6 0 0 1-2.62 3.91v3.28h4.22c2.46-2.27 3.88-5.6 3.88-9.56Z"
  />
  <path
    fill="#34A853"
    d="M20.26 33a12.4 12.4 0 0 0 8.6-3.14l-4.22-3.28a7.74 7.74 0 0 1-4.38 1.26 7.76 7.76 0 0 1-7.28-5.36H8.65v3.36A12.99 12.99 0 0 0 20.26 33Z"
  />
  <path
    fill="#FBBC05"
    d="M12.98 22.47a7.79 7.79 0 0 1 0-4.94v-3.36H8.65a12.84 12.84 0 0 0 0 11.66l3.37-2.63.96-.73Z"
  />
  <path
    fill="#EA4335"
    d="M20.26 12.18a7.1 7.1 0 0 1 4.98 1.93l3.72-3.72A12.47 12.47 0 0 0 20.26 7c-5.08 0-9.47 2.92-11.6 7.17l4.32 3.36a7.76 7.76 0 0 1 7.28-5.35Z"
  />
</svg>`;
const infoSealSvg = b`<svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M4.875 0C3.91082 0 2.96829 0.285914 2.1666 0.821586C1.36491 1.35726 0.740067 2.11863 0.371089 3.00942C0.00211226 3.90021 -0.094429 4.88041 0.093674 5.82607C0.281777 6.77172 0.746076 7.64036 1.42786 8.32215C2.10964 9.00393 2.97828 9.46823 3.92394 9.65633C4.86959 9.84443 5.84979 9.74789 6.74058 9.37891C7.63137 9.00994 8.39274 8.38509 8.92842 7.5834C9.46409 6.78171 9.75 5.83918 9.75 4.875C9.74864 3.58249 9.23458 2.34331 8.32064 1.42936C7.4067 0.515418 6.16751 0.00136492 4.875 0ZM4.6875 2.25C4.79875 2.25 4.90751 2.28299 5.00001 2.3448C5.09251 2.40661 5.16461 2.49446 5.20718 2.59724C5.24976 2.70002 5.2609 2.81312 5.23919 2.92224C5.21749 3.03135 5.16392 3.13158 5.08525 3.21025C5.00658 3.28891 4.90635 3.34249 4.79724 3.36419C4.68813 3.3859 4.57503 3.37476 4.47224 3.33218C4.36946 3.28961 4.28161 3.21751 4.2198 3.12501C4.15799 3.03251 4.125 2.92375 4.125 2.8125C4.125 2.66332 4.18427 2.52024 4.28975 2.41475C4.39524 2.30926 4.53832 2.25 4.6875 2.25ZM5.25 7.5C5.05109 7.5 4.86032 7.42098 4.71967 7.28033C4.57902 7.13968 4.5 6.94891 4.5 6.75V4.875C4.40055 4.875 4.30516 4.83549 4.23484 4.76516C4.16451 4.69484 4.125 4.59946 4.125 4.5C4.125 4.40054 4.16451 4.30516 4.23484 4.23484C4.30516 4.16451 4.40055 4.125 4.5 4.125C4.69891 4.125 4.88968 4.20402 5.03033 4.34467C5.17098 4.48532 5.25 4.67609 5.25 4.875V6.75C5.34946 6.75 5.44484 6.78951 5.51517 6.85983C5.58549 6.93016 5.625 7.02554 5.625 7.125C5.625 7.22446 5.58549 7.31984 5.51517 7.39017C5.44484 7.46049 5.34946 7.5 5.25 7.5Z" fill="#9A9A9A"/>
</svg>
`;
const paperPlaneTitleSvg = b`<svg width="32" height="32" viewBox="0 0 32 32" fill="none">
<path d="M28.925 5.5425C28.925 5.5425 28.925 5.555 28.925 5.56125L21.65 29.5537C21.5399 29.9434 21.3132 30.2901 21.0004 30.5473C20.6876 30.8045 20.3036 30.9598 19.9 30.9925C19.8425 30.9975 19.785 31 19.7275 31C19.3493 31.0012 18.9786 30.8941 18.6592 30.6915C18.3398 30.4888 18.085 30.199 17.925 29.8563L13.375 20.5187C13.3295 20.4252 13.3143 20.3197 13.3315 20.2171C13.3488 20.1145 13.3976 20.0198 13.4713 19.9463L20.7113 12.7063C20.8909 12.5172 20.9895 12.2654 20.9862 12.0047C20.9829 11.7439 20.8778 11.4948 20.6934 11.3104C20.509 11.126 20.2599 11.0209 19.9991 11.0176C19.7383 11.0142 19.4866 11.1129 19.2975 11.2925L12.0538 18.5325C11.9802 18.6061 11.8855 18.655 11.7829 18.6722C11.6803 18.6895 11.5748 18.6743 11.4813 18.6287L2.13502 14.08C1.76954 13.9047 1.46598 13.6224 1.26454 13.2706C1.06311 12.9189 0.973316 12.5142 1.00707 12.1102C1.04082 11.7063 1.19652 11.3221 1.45354 11.0087C1.71056 10.6952 2.05676 10.4673 2.44627 10.355L26.4388 3.08H26.4575C26.7991 2.98403 27.1601 2.98066 27.5034 3.07025C27.8468 3.15984 28.1601 3.33916 28.4113 3.58981C28.6624 3.84045 28.8424 4.15341 28.9326 4.49656C29.0229 4.83971 29.0203 5.2007 28.925 5.5425Z" fill="currentColor"/>
</svg>
`;
const playStoreSvg = b` <svg width="27" height="30" viewBox="0 0 27 30" fill="none">
  <path d="M12.5395 14.3237L0.116699 27.5049V27.5188C0.251527 28.0177 0.49972 28.4788 0.841941 28.866C1.18416 29.2533 1.61117 29.5563 2.0897 29.7515C2.56823 29.9467 3.08536 30.0287 3.60081 29.9913C4.11625 29.9538 4.61609 29.7979 5.06139 29.5356L5.0975 29.512L19.0718 21.4519L12.5395 14.3237Z" fill="#EA4335"/>
  <path d="M25.103 12.0833L25.0919 12.0722L19.0611 8.57202L12.2607 14.6279L19.0847 21.4504L25.0919 17.9864C25.6229 17.6983 26.0665 17.2725 26.376 16.7537C26.6854 16.2349 26.8493 15.6422 26.8505 15.0381C26.8516 14.434 26.6899 13.8408 26.3824 13.3208C26.0749 12.8008 25.633 12.3734 25.103 12.0833Z" fill="#FBBC04"/>
  <path d="M0.116672 2.49553C0.047224 2.7761 0 3.05528 0 3.35946V26.6537C0 26.9565 0.0347234 27.237 0.116672 27.5162L12.959 14.6725L0.116672 2.49553Z" fill="#4285F4"/>
  <path d="M12.634 15.0001L19.0607 8.57198L5.0975 0.477133C4.65115 0.210463 4.14916 0.0506574 3.63079 0.0102139C3.11242 -0.0302296 2.59172 0.0497852 2.10941 0.244001C1.6271 0.438216 1.19625 0.741368 0.850556 1.12975C0.504864 1.51813 0.253698 1.98121 0.116699 2.48279L12.634 15.0001Z" fill="#34A853"/>
</svg>`;
const reownSvg = b`<svg width="75" height="20" viewBox="0 0 75 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11.6666 5.83334C11.6666 2.61168 14.2783 0 17.5 0H25.8334C29.055 0 31.6666 2.61168 31.6666 5.83334V14.1666C31.6666 17.3883 29.055 20 25.8334 20H17.5C14.2783 20 11.6666 17.3883 11.6666 14.1666V5.83334Z" fill="var(--apkt-tokens-theme-foregroundTertiary)"/>
<path d="M19.5068 13.7499L22.4309 5.83331H23.2895L20.3654 13.7499H19.5068Z" fill="var(--apkt-tokens-theme-textPrimary)"/>
<path d="M0 5.41666C0 2.42513 2.42513 0 5.41666 0C8.40821 0 10.8334 2.42513 10.8334 5.41666V14.5833C10.8334 17.5748 8.40821 20 5.41666 20C2.42513 20 0 17.5748 0 14.5833V5.41666Z" fill="var(--apkt-tokens-theme-foregroundTertiary)"/>
<path d="M4.89581 12.4997V11.458H5.93747V12.4997H4.89581Z" fill="var(--apkt-tokens-theme-textPrimary)"/>
<path d="M32.5 10C32.5 4.47715 36.6896 0 41.8578 0H65.6422C70.8104 0 75 4.47715 75 10C75 15.5229 70.8104 20 65.6422 20H41.8578C36.6896 20 32.5 15.5229 32.5 10Z" fill="var(--apkt-tokens-theme-foregroundTertiary)"/>
<path d="M61.7108 12.4475V7.82751H62.5266V8.52418C62.8199 8.01084 63.4157 7.70834 64.0757 7.70834C65.0749 7.70834 65.7715 8.34084 65.7715 9.56918V12.4475H64.9649V9.61503C64.9649 8.80831 64.5066 8.38668 63.8374 8.38668C63.1132 8.38668 62.5266 8.9642 62.5266 9.78001V12.4475H61.7108Z" fill="var(--apkt-tokens-theme-textPrimary)"/>
<path d="M56.5671 12.4475L55.7147 7.82748H56.4846L57.0896 11.6409L57.8871 9.12916H58.6479L59.4363 11.6134L60.0505 7.82748H60.8204L59.9679 12.4475H59.0513L58.2721 10.0458L57.4838 12.4475H56.5671Z" fill="var(--apkt-tokens-theme-textPrimary)"/>
<path d="M52.9636 12.5666C51.5611 12.5666 50.7361 11.5217 50.7361 10.1375C50.7361 8.76254 51.5611 7.70834 52.9636 7.70834C54.3661 7.70834 55.1911 8.76254 55.1911 10.1375C55.1911 11.5217 54.3661 12.5666 52.9636 12.5666ZM52.9636 11.8883C53.9719 11.8883 54.357 11.0266 54.357 10.1283C54.357 9.23914 53.9719 8.38668 52.9636 8.38668C51.9552 8.38668 51.5702 9.23914 51.5702 10.1283C51.5702 11.0266 51.9552 11.8883 52.9636 11.8883Z" fill="var(--apkt-tokens-theme-textPrimary)"/>
<path d="M47.8507 12.5666C46.494 12.5666 45.6415 11.5308 45.6415 10.1375C45.6415 8.75337 46.494 7.70834 47.8507 7.70834C48.9965 7.70834 50.0048 8.35917 49.8948 10.3483H46.4756C46.5398 11.2009 46.934 11.8975 47.8507 11.8975C48.4648 11.8975 48.8681 11.5217 49.0057 11.0908H49.8123C49.684 11.8609 48.9598 12.5666 47.8507 12.5666ZM46.494 9.73416H49.1065C49.0423 8.80831 48.6114 8.37751 47.8507 8.37751C47.0165 8.37751 46.604 8.98254 46.494 9.73416Z" fill="var(--apkt-tokens-theme-textPrimary)"/>
<path d="M41.7284 12.4475V7.82748H42.5625V8.60665C42.8559 8.09332 43.3601 7.82748 43.8825 7.82748H44.9917V8.60665H43.8184C43.0851 8.60665 42.5625 9.08331 42.5625 10.0092V12.4475H41.7284Z" fill="var(--apkt-tokens-theme-textPrimary)"/>
</svg>

`;
const solanaSvg$1 = b`
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 8">
    <path
      fill="var(--apkt-tokens-theme-textPrimary)"
      d="m9.524 6.307-1.51 1.584A.35.35 0 0 1 7.76 8H.604a.178.178 0 0 1-.161-.103.168.168 0 0 1 .033-.186l1.51-1.583a.35.35 0 0 1 .256-.11h7.154c.034 0 .068.01.096.029a.168.168 0 0 1 .032.26Zm-1.51-3.189a.35.35 0 0 0-.255-.109H.604a.178.178 0 0 0-.161.103.168.168 0 0 0 .033.186l1.51 1.583a.35.35 0 0 0 .256.11h7.154a.178.178 0 0 0 .16-.104.168.168 0 0 0-.032-.185l-1.51-1.584ZM.605 1.981H7.76a.357.357 0 0 0 .256-.11L9.525.289a.17.17 0 0 0 .032-.185.173.173 0 0 0-.16-.103H2.241a.357.357 0 0 0-.256.109L.476 1.692a.17.17 0 0 0-.033.185.178.178 0 0 0 .16.103Z"
    />
  </svg>
`;
const telegramSvg = b`<svg width="32" height="32" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <g clip-path="url(#a)">
    <path fill="url(#b)" d="M0 0h32v32H0z"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M7.034 15.252c4.975-2.167 8.293-3.596 9.953-4.287 4.74-1.971 5.725-2.314 6.366-2.325.142-.002.457.033.662.198.172.14.22.33.243.463.022.132.05.435.028.671-.257 2.7-1.368 9.248-1.933 12.27-.24 1.28-.71 1.708-1.167 1.75-.99.091-1.743-.655-2.703-1.284-1.502-.985-2.351-1.598-3.81-2.558-1.684-1.11-.592-1.721.368-2.718.252-.261 4.619-4.233 4.703-4.594.01-.045.02-.213-.08-.301-.1-.09-.246-.059-.353-.035-.15.034-2.55 1.62-7.198 4.758-.682.468-1.298.696-1.851.684-.61-.013-1.782-.344-2.653-.628-1.069-.347-1.918-.53-1.845-1.12.039-.308.462-.623 1.27-.944Z" fill="#fff"/>
  </g>
  <path d="M.5 16C.5 7.44 7.44.5 16 .5 24.56.5 31.5 7.44 31.5 16c0 8.56-6.94 15.5-15.5 15.5C7.44 31.5.5 24.56.5 16Z" stroke="#141414" stroke-opacity=".05"/>
  <defs>
    <linearGradient id="b" x1="1600" y1="0" x2="1600" y2="3176.27" gradientUnits="userSpaceOnUse">
      <stop stop-color="#2AABEE"/>
      <stop offset="1" stop-color="#229ED9"/>
    </linearGradient>
    <clipPath id="a">
      <path d="M0 16C0 7.163 7.163 0 16 0s16 7.163 16 16-7.163 16-16 16S0 24.837 0 16Z" fill="#fff"/>
    </clipPath>
  </defs>
</svg>`;
const tonSvg = b`
  <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10">
  <path d="M8.37651 0H1.62309C0.381381 0 -0.405611 1.33944 0.219059 2.42225L4.38701 9.64649C4.659 10.1182 5.3406 10.1182 5.61259 9.64649L9.78139 2.42225C10.4052 1.34117 9.61822 0 8.37736 0H8.37651ZM4.38362 7.48005L3.47591 5.72329L1.2857 1.80606C1.14121 1.55534 1.31968 1.23405 1.62225 1.23405H4.38278V7.4809L4.38362 7.48005ZM8.71221 1.80521L6.52284 5.72414L5.61513 7.48005V1.2332H8.37566C8.67823 1.2332 8.85669 1.55449 8.71221 1.80521Z" fill="var(--apkt-tokens-theme-textPrimary)" />
</svg>
`;
const tronSvg = b`
  <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 64 64">
    <path fill="var(--apkt-tokens-theme-textPrimary)" d="M61.55 19.28c-3-2.77-7.15-7-10.53-10l-.2-.14a3.82 3.82 0 0 0-1.11-.62l0 0C41.56 7 3.63-.09 2.89 0a1.4 1.4 0 0 0-.58.22L2.12.37a2.23 2.23 0 0 0-.52.84l-.05.13v.71l0 .11C5.82 14.05 22.68 53 26 62.14c.2.62.58 1.8 1.29 1.86h.16c.38 0 2-2.14 2-2.14S58.41 26.74 61.34 23a9.46 9.46 0 0 0 1-1.48A2.41 2.41 0 0 0 61.55 19.28ZM36.88 23.37 49.24 13.12l7.25 6.68Zm-4.8-.67L10.8 5.26l34.43 6.35ZM34 27.27l21.78-3.51-24.9 30ZM7.91 7 30.3 26 27.06 53.78Z"/>
  </svg>
`;
const twitchSvg = b`<svg fill="none" viewBox="0 0 40 40">
  <g clip-path="url(#a)">
    <g clip-path="url(#b)">
      <circle cx="20" cy="19.89" r="20" fill="#5A3E85" />
      <g clip-path="url(#c)">
        <path
          fill="#fff"
          d="M18.22 25.7 20 23.91h3.34l2.1-2.1v-6.68H15.4v8.78h2.82v1.77Zm3.87-8.16h1.25v3.66H22.1v-3.66Zm-3.34 0H20v3.66h-1.25v-3.66ZM20 7.9a12 12 0 1 0 0 24 12 12 0 0 0 0-24Zm6.69 14.56-3.66 3.66h-2.72l-1.77 1.78h-1.88V26.1H13.3v-9.82l.94-2.4H26.7v8.56Z"
        />
      </g>
    </g>
  </g>
  <defs>
    <clipPath id="a"><rect width="40" height="40" fill="#fff" rx="20" /></clipPath>
    <clipPath id="b"><path fill="#fff" d="M0 0h40v40H0z" /></clipPath>
    <clipPath id="c"><path fill="#fff" d="M8 7.89h24v24H8z" /></clipPath>
  </defs>
</svg>`;
const twitterIconSvg = b`<svg fill="none" viewBox="0 0 16 16">
  <path
    fill="currentColor"
    d="m14.36 4.74.01.42c0 4.34-3.3 9.34-9.34 9.34A9.3 9.3 0 0 1 0 13.03a6.6 6.6 0 0 0 4.86-1.36 3.29 3.29 0 0 1-3.07-2.28c.5.1 1 .07 1.48-.06A3.28 3.28 0 0 1 .64 6.11v-.04c.46.26.97.4 1.49.41A3.29 3.29 0 0 1 1.11 2.1a9.32 9.32 0 0 0 6.77 3.43 3.28 3.28 0 0 1 5.6-3 6.59 6.59 0 0 0 2.08-.8 3.3 3.3 0 0 1-1.45 1.82A6.53 6.53 0 0 0 16 3.04c-.44.66-1 1.23-1.64 1.7Z"
  />
</svg>`;
const walletConnectSvg = b`
<svg xmlns="http://www.w3.org/2000/svg" width="89" height="89" viewBox="0 0 89 89" fill="none">
<path d="M60.0468 39.2502L65.9116 33.3854C52.6562 20.13 36.1858 20.13 22.9304 33.3854L28.7952 39.2502C38.8764 29.169 49.9725 29.169 60.0536 39.2502H60.0468Z" fill="var(--apkt-tokens-theme-textPrimary)"/>
<path d="M58.0927 52.9146L44.415 39.2369L30.7373 52.9146L17.0596 39.2369L11.2017 45.0949L30.7373 64.6374L44.415 50.9597L58.0927 64.6374L77.6284 45.0949L71.7704 39.2369L58.0927 52.9146Z" fill="var(--apkt-tokens-theme-textPrimary)"/>
</svg>`;
const walletConnectInvertSvg = b`
<svg xmlns="http://www.w3.org/2000/svg" width="89" height="89" viewBox="0 0 89 89" fill="none">
<path d="M60.0468 39.2502L65.9116 33.3854C52.6562 20.13 36.1858 20.13 22.9304 33.3854L28.7952 39.2502C38.8764 29.169 49.9725 29.169 60.0536 39.2502H60.0468Z" fill="var(--apkt-tokens-theme-textInvert)"/>
<path d="M58.0927 52.9146L44.415 39.2369L30.7373 52.9146L17.0596 39.2369L11.2017 45.0949L30.7373 64.6374L44.415 50.9597L58.0927 64.6374L77.6284 45.0949L71.7704 39.2369L58.0927 52.9146Z" fill="var(--apkt-tokens-theme-textInvert)"/>
</svg>`;
const walletConnectLightBrownSvg = b`
<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_22274_4692)">
<path d="M0 6.64C0 4.17295 0 2.93942 0.525474 2.01817C0.880399 1.39592 1.39592 0.880399 2.01817 0.525474C2.93942 0 4.17295 0 6.64 0H9.36C11.8271 0 13.0606 0 13.9818 0.525474C14.6041 0.880399 15.1196 1.39592 15.4745 2.01817C16 2.93942 16 4.17295 16 6.64V9.36C16 11.8271 16 13.0606 15.4745 13.9818C15.1196 14.6041 14.6041 15.1196 13.9818 15.4745C13.0606 16 11.8271 16 9.36 16H6.64C4.17295 16 2.93942 16 2.01817 15.4745C1.39592 15.1196 0.880399 14.6041 0.525474 13.9818C0 13.0606 0 11.8271 0 9.36V6.64Z" fill="#C7B994"/>
<path d="M4.49038 5.76609C6.42869 3.86833 9.5713 3.86833 11.5096 5.76609L11.7429 5.99449C11.8398 6.08938 11.8398 6.24323 11.7429 6.33811L10.9449 7.11942C10.8964 7.16686 10.8179 7.16686 10.7694 7.11942L10.4484 6.80512C9.09617 5.48119 6.90381 5.48119 5.5516 6.80512L5.20782 7.14171C5.15936 7.18915 5.08079 7.18915 5.03234 7.14171L4.23434 6.3604C4.13742 6.26552 4.13742 6.11167 4.23434 6.01678L4.49038 5.76609ZM13.1599 7.38192L13.8702 8.07729C13.9671 8.17217 13.9671 8.32602 13.8702 8.4209L10.6677 11.5564C10.5708 11.6513 10.4137 11.6513 10.3168 11.5564L8.04388 9.33105C8.01965 9.30733 7.98037 9.30733 7.95614 9.33105L5.6833 11.5564C5.58638 11.6513 5.42925 11.6513 5.33234 11.5564L2.12982 8.42087C2.0329 8.32598 2.0329 8.17213 2.12982 8.07724L2.84004 7.38188C2.93695 7.28699 3.09408 7.28699 3.191 7.38188L5.46392 9.60726C5.48815 9.63098 5.52743 9.63098 5.55166 9.60726L7.82447 7.38188C7.92138 7.28699 8.07851 7.28699 8.17543 7.38187L10.4484 9.60726C10.4726 9.63098 10.5119 9.63098 10.5361 9.60726L12.809 7.38192C12.9059 7.28703 13.063 7.28703 13.1599 7.38192Z" fill="currentColor"/>
</g>
<defs>
<clipPath id="clip0_22274_4692">
<path d="M0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8Z" fill="white"/>
</clipPath>
</defs>
</svg>
`;
const walletConnectBrownSvg = b`
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="11" cy="11" r="11" transform="matrix(-1 0 0 1 23 1)" fill="#202020"/>
<circle cx="11" cy="11" r="11.5" transform="matrix(-1 0 0 1 23 1)" stroke="#C7B994" stroke-opacity="0.7"/>
<path d="M15.4523 11.0686L16.7472 9.78167C13.8205 6.87297 10.1838 6.87297 7.25708 9.78167L8.55201 11.0686C10.7779 8.85645 13.2279 8.85645 15.4538 11.0686H15.4523Z" fill="#C7B994"/>
<path d="M15.0199 14.067L12 11.0656L8.98 14.067L5.96004 11.0656L4.66663 12.3511L8.98 16.6393L12 13.638L15.0199 16.6393L19.3333 12.3511L18.0399 11.0656L15.0199 14.067Z" fill="#C7B994"/>
</svg>
`;
const xSvg = b`<svg fill="none" viewBox="0 0 41 40">
  <g clip-path="url(#a)">
    <path fill="#000" d="M.8 0h40v40H.8z" />
    <path
      fill="#fff"
      d="m22.63 18.46 7.14-8.3h-1.69l-6.2 7.2-4.96-7.2H11.2l7.5 10.9-7.5 8.71h1.7l6.55-7.61 5.23 7.61h5.72l-7.77-11.31Zm-9.13-7.03h2.6l11.98 17.13h-2.6L13.5 11.43Z"
    />
  </g>
  <defs>
    <clipPath id="a"><path fill="#fff" d="M.8 20a20 20 0 1 1 40 0 20 20 0 0 1-40 0Z" /></clipPath>
  </defs>
</svg>`;
const styles$1a = i`
  :host {
    display: flex;
    justify-content: center;
    align-items: center;
    aspect-ratio: 1 / 1;
    color: var(--local-color);
    width: var(--local-width);
  }

  svg {
    height: inherit;
    width: inherit;
    object-fit: contain;
    object-position: center;
  }
`;
var __decorate$1a = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
const phosphorIconsMap = {
  add: "ph-plus",
  allWallets: "ph-dots-three",
  arrowBottom: "ph-arrow-down",
  arrowBottomCircle: "ph-arrow-circle-down",
  arrowClockWise: "ph-arrow-clockwise",
  arrowLeft: "ph-arrow-left",
  arrowRight: "ph-arrow-right",
  arrowTop: "ph-arrow-up",
  arrowTopRight: "ph-arrow-up-right",
  bank: "ph-bank",
  bin: "ph-trash",
  browser: "ph-browser",
  card: "ph-credit-card",
  checkmarkBold: "ph-check",
  chevronBottom: "ph-caret-down",
  chevronLeft: "ph-caret-left",
  chevronRight: "ph-caret-right",
  chevronTop: "ph-caret-up",
  clock: "ph-clock",
  close: "ph-x",
  coinPlaceholder: "ph-circle-half",
  compass: "ph-compass",
  copy: "ph-copy",
  desktop: "ph-desktop",
  dollar: "ph-currency-dollar",
  download: "ph-vault",
  exclamationCircle: "ph-warning-circle",
  extension: "ph-puzzle-piece",
  externalLink: "ph-arrow-square-out",
  filters: "ph-funnel-simple",
  helpCircle: "ph-question",
  id: "ph-identification-card",
  image: "ph-image",
  info: "ph-info",
  lightbulb: "ph-lightbulb",
  mail: "ph-envelope",
  mobile: "ph-device-mobile",
  more: "ph-dots-three",
  networkPlaceholder: "ph-globe",
  nftPlaceholder: "ph-image",
  plus: "ph-plus",
  power: "ph-power",
  qrCode: "ph-qr-code",
  questionMark: "ph-question",
  refresh: "ph-arrow-clockwise",
  recycleHorizontal: "ph-arrows-clockwise",
  search: "ph-magnifying-glass",
  sealCheck: "ph-seal-check",
  send: "ph-paper-plane-right",
  signOut: "ph-sign-out",
  spinner: "ph-spinner",
  swapHorizontal: "ph-arrows-left-right",
  swapVertical: "ph-arrows-down-up",
  threeDots: "ph-dots-three",
  user: "ph-user",
  verify: "ph-seal-check",
  verifyFilled: "ph-seal-check",
  wallet: "ph-wallet",
  warning: "ph-warning",
  warningCircle: "ph-warning-circle",
  appStore: "",
  apple: "",
  bitcoin: "",
  coins: "",
  chromeStore: "",
  cursor: "",
  discord: "",
  ethereum: "",
  etherscan: "",
  facebook: "",
  farcaster: "",
  github: "",
  google: "",
  playStore: "",
  paperPlaneTitle: "",
  reown: "",
  solana: "",
  ton: "",
  tron: "",
  telegram: "",
  twitch: "",
  twitterIcon: "",
  twitter: "",
  walletConnect: "",
  walletConnectBrown: "",
  walletConnectLightBrown: "",
  x: "",
  infoSeal: "",
  checkmark: ""
};
const phosphorImports = {
  "ph-arrow-circle-down": () => import("./phosphor-icons__webcomponents.mjs").then(function(n2) {
    return n2.P;
  }),
  "ph-arrow-clockwise": () => import("./phosphor-icons__webcomponents.mjs").then(function(n2) {
    return n2.a;
  }),
  "ph-arrow-down": () => import("./phosphor-icons__webcomponents.mjs").then(function(n2) {
    return n2.b;
  }),
  "ph-arrow-left": () => import("./phosphor-icons__webcomponents.mjs").then(function(n2) {
    return n2.c;
  }),
  "ph-arrow-right": () => import("./phosphor-icons__webcomponents.mjs").then(function(n2) {
    return n2.d;
  }),
  "ph-arrow-square-out": () => import("./phosphor-icons__webcomponents.mjs").then(function(n2) {
    return n2.e;
  }),
  "ph-arrows-down-up": () => import("./phosphor-icons__webcomponents.mjs").then(function(n2) {
    return n2.f;
  }),
  "ph-arrows-left-right": () => import("./phosphor-icons__webcomponents.mjs").then(function(n2) {
    return n2.g;
  }),
  "ph-arrow-up": () => import("./phosphor-icons__webcomponents.mjs").then(function(n2) {
    return n2.h;
  }),
  "ph-arrow-up-right": () => import("./phosphor-icons__webcomponents.mjs").then(function(n2) {
    return n2.i;
  }),
  "ph-arrows-clockwise": () => import("./phosphor-icons__webcomponents.mjs").then(function(n2) {
    return n2.j;
  }),
  "ph-bank": () => import("./phosphor-icons__webcomponents.mjs").then(function(n2) {
    return n2.k;
  }),
  "ph-browser": () => import("./phosphor-icons__webcomponents.mjs").then(function(n2) {
    return n2.l;
  }),
  "ph-caret-down": () => import("./phosphor-icons__webcomponents.mjs").then(function(n2) {
    return n2.m;
  }),
  "ph-caret-left": () => import("./phosphor-icons__webcomponents.mjs").then(function(n2) {
    return n2.n;
  }),
  "ph-caret-right": () => import("./phosphor-icons__webcomponents.mjs").then(function(n2) {
    return n2.o;
  }),
  "ph-caret-up": () => import("./phosphor-icons__webcomponents.mjs").then(function(n2) {
    return n2.p;
  }),
  "ph-check": () => import("./phosphor-icons__webcomponents.mjs").then(function(n2) {
    return n2.q;
  }),
  "ph-circle-half": () => import("./phosphor-icons__webcomponents.mjs").then(function(n2) {
    return n2.r;
  }),
  "ph-clock": () => import("./phosphor-icons__webcomponents.mjs").then(function(n2) {
    return n2.s;
  }),
  "ph-compass": () => import("./phosphor-icons__webcomponents.mjs").then(function(n2) {
    return n2.t;
  }),
  "ph-copy": () => import("./phosphor-icons__webcomponents.mjs").then(function(n2) {
    return n2.u;
  }),
  "ph-credit-card": () => import("./phosphor-icons__webcomponents.mjs").then(function(n2) {
    return n2.v;
  }),
  "ph-currency-dollar": () => import("./phosphor-icons__webcomponents.mjs").then(function(n2) {
    return n2.w;
  }),
  "ph-desktop": () => import("./phosphor-icons__webcomponents.mjs").then(function(n2) {
    return n2.x;
  }),
  "ph-device-mobile": () => import("./phosphor-icons__webcomponents.mjs").then(function(n2) {
    return n2.y;
  }),
  "ph-dots-three": () => import("./phosphor-icons__webcomponents.mjs").then(function(n2) {
    return n2.z;
  }),
  "ph-vault": () => import("./phosphor-icons__webcomponents.mjs").then(function(n2) {
    return n2.A;
  }),
  "ph-envelope": () => import("./phosphor-icons__webcomponents.mjs").then(function(n2) {
    return n2.B;
  }),
  "ph-funnel-simple": () => import("./phosphor-icons__webcomponents.mjs").then(function(n2) {
    return n2.C;
  }),
  "ph-globe": () => import("./phosphor-icons__webcomponents.mjs").then(function(n2) {
    return n2.D;
  }),
  "ph-identification-card": () => import("./phosphor-icons__webcomponents.mjs").then(function(n2) {
    return n2.E;
  }),
  "ph-image": () => import("./phosphor-icons__webcomponents.mjs").then(function(n2) {
    return n2.F;
  }),
  "ph-info": () => import("./phosphor-icons__webcomponents.mjs").then(function(n2) {
    return n2.G;
  }),
  "ph-lightbulb": () => import("./phosphor-icons__webcomponents.mjs").then(function(n2) {
    return n2.H;
  }),
  "ph-magnifying-glass": () => import("./phosphor-icons__webcomponents.mjs").then(function(n2) {
    return n2.I;
  }),
  "ph-paper-plane-right": () => import("./phosphor-icons__webcomponents.mjs").then(function(n2) {
    return n2.J;
  }),
  "ph-plus": () => import("./phosphor-icons__webcomponents.mjs").then(function(n2) {
    return n2.K;
  }),
  "ph-power": () => import("./phosphor-icons__webcomponents.mjs").then(function(n2) {
    return n2.L;
  }),
  "ph-puzzle-piece": () => import("./phosphor-icons__webcomponents.mjs").then(function(n2) {
    return n2.M;
  }),
  "ph-qr-code": () => import("./phosphor-icons__webcomponents.mjs").then(function(n2) {
    return n2.N;
  }),
  "ph-question": () => import("./phosphor-icons__webcomponents.mjs").then(function(n2) {
    return n2.O;
  }),
  "ph-question-circle": () => import("./phosphor-icons__webcomponents.mjs").then(function(n2) {
    return n2.Q;
  }),
  "ph-seal-check": () => import("./phosphor-icons__webcomponents.mjs").then(function(n2) {
    return n2.R;
  }),
  "ph-sign-out": () => import("./phosphor-icons__webcomponents.mjs").then(function(n2) {
    return n2.S;
  }),
  "ph-spinner": () => import("./phosphor-icons__webcomponents.mjs").then(function(n2) {
    return n2.T;
  }),
  "ph-trash": () => import("./phosphor-icons__webcomponents.mjs").then(function(n2) {
    return n2.U;
  }),
  "ph-user": () => import("./phosphor-icons__webcomponents.mjs").then(function(n2) {
    return n2.V;
  }),
  "ph-wallet": () => import("./phosphor-icons__webcomponents.mjs").then(function(n2) {
    return n2.W;
  }),
  "ph-warning": () => import("./phosphor-icons__webcomponents.mjs").then(function(n2) {
    return n2.X;
  }),
  "ph-warning-circle": () => import("./phosphor-icons__webcomponents.mjs").then(function(n2) {
    return n2.Y;
  }),
  "ph-x": () => import("./phosphor-icons__webcomponents.mjs").then(function(n2) {
    return n2.Z;
  })
};
const svgOptions$1 = {
  appStore: appStoreSvg,
  apple: appleSvg,
  bitcoin: bitcoinSvg$1,
  coins: coinsSvg,
  chromeStore: chromeStoreSvg,
  cursor: cursorSvg,
  discord: discordSvg,
  ethereum: ethereumSvg,
  etherscan: etherscanSvg,
  facebook: facebookSvg,
  farcaster: farcasterSvg,
  github: githubSvg,
  google: googleSvg$1,
  playStore: playStoreSvg,
  paperPlaneTitle: paperPlaneTitleSvg,
  reown: reownSvg,
  solana: solanaSvg$1,
  ton: tonSvg,
  tron: tronSvg,
  telegram: telegramSvg,
  twitch: twitchSvg,
  twitter: xSvg,
  twitterIcon: twitterIconSvg,
  walletConnect: walletConnectSvg,
  walletConnectInvert: walletConnectInvertSvg,
  walletConnectBrown: walletConnectBrownSvg,
  walletConnectLightBrown: walletConnectLightBrownSvg,
  x: xSvg,
  infoSeal: infoSealSvg,
  checkmark: checkmarkSvg
};
const ICON_COLOR = {
  "accent-primary": vars.tokens.core.iconAccentPrimary,
  "accent-certified": vars.tokens.core.iconAccentCertified,
  "foreground-secondary": vars.tokens.theme.foregroundSecondary,
  default: vars.tokens.theme.iconDefault,
  success: vars.tokens.core.iconSuccess,
  error: vars.tokens.core.iconError,
  warning: vars.tokens.core.iconWarning,
  inverse: vars.tokens.theme.iconInverse
};
let WuiIcon = class WuiIcon2 extends i$1 {
  constructor() {
    super(...arguments);
    this.size = "md";
    this.name = "copy";
    this.weight = "bold";
    this.color = "inherit";
  }
  render() {
    const getSize = {
      xxs: "2",
      xs: "3",
      sm: "3",
      md: "4",
      mdl: "5",
      lg: "5",
      xl: "6",
      xxl: "7",
      inherit: "inherit"
    };
    this.style.cssText = `
      --local-width: ${this.size === "inherit" ? "inherit" : `var(--apkt-spacing-${getSize[this.size]})`};
      --local-color: ${this.color === "inherit" ? "inherit" : ICON_COLOR[this.color]}
    `;
    const phosphorIconTag = phosphorIconsMap[this.name];
    if (phosphorIconTag && phosphorIconTag !== "") {
      const importFn = phosphorImports[phosphorIconTag];
      if (importFn) {
        importFn();
      }
      const tag = s(phosphorIconTag);
      const getPhosphorSize = {
        xxs: "0.5em",
        xs: "0.75em",
        sm: "0.75em",
        md: "1em",
        mdl: "1.25em",
        lg: "1.25em",
        xl: "1.5em",
        xxl: "1.75em"
      };
      return u`<${tag} size=${o(getPhosphorSize[this.size])} weight="${this.weight}"></${tag}>`;
    }
    return svgOptions$1[this.name] || u``;
  }
};
WuiIcon.styles = [resetStyles, styles$1a];
__decorate$1a([
  n()
], WuiIcon.prototype, "size", void 0);
__decorate$1a([
  n()
], WuiIcon.prototype, "name", void 0);
__decorate$1a([
  n()
], WuiIcon.prototype, "weight", void 0);
__decorate$1a([
  n()
], WuiIcon.prototype, "color", void 0);
WuiIcon = __decorate$1a([
  customElement("wui-icon")
], WuiIcon);
const styles$19 = css`
  :host {
    display: block;
    width: var(--local-width);
    height: var(--local-height);
  }

  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center center;
    border-radius: inherit;
    user-select: none;
    user-drag: none;
    -webkit-user-drag: none;
    -khtml-user-drag: none;
    -moz-user-drag: none;
    -o-user-drag: none;
  }

  :host([data-boxed='true']) {
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${({ tokens: tokens2 }) => tokens2.theme.foregroundPrimary};
    border-radius: ${({ borderRadius: borderRadius2 }) => borderRadius2[2]};
  }

  :host([data-boxed='true']) img {
    width: 20px;
    height: 20px;
    border-radius: ${({ borderRadius: borderRadius2 }) => borderRadius2[16]};
  }

  :host([data-full='true']) img {
    width: 100%;
    height: 100%;
  }

  :host([data-boxed='true']) wui-icon {
    width: 20px;
    height: 20px;
  }

  :host([data-icon='error']) {
    background-color: ${({ tokens: tokens2 }) => tokens2.core.backgroundError};
  }

  :host([data-rounded='true']) {
    border-radius: ${({ borderRadius: borderRadius2 }) => borderRadius2[16]};
  }
`;
var __decorate$19 = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
let WuiImage = class WuiImage2 extends i$1 {
  constructor() {
    super(...arguments);
    this.src = "./path/to/image.jpg";
    this.alt = "Image";
    this.size = void 0;
    this.boxed = false;
    this.rounded = false;
    this.fullSize = false;
  }
  render() {
    const getSize = {
      inherit: "inherit",
      xxs: "2",
      xs: "3",
      sm: "4",
      md: "4",
      mdl: "5",
      lg: "5",
      xl: "6",
      xxl: "7",
      "3xl": "8",
      "4xl": "9",
      "5xl": "10"
    };
    this.style.cssText = `
      --local-width: ${this.size ? `var(--apkt-spacing-${getSize[this.size]});` : "100%"};
      --local-height: ${this.size ? `var(--apkt-spacing-${getSize[this.size]});` : "100%"};
      `;
    this.dataset["boxed"] = this.boxed ? "true" : "false";
    this.dataset["rounded"] = this.rounded ? "true" : "false";
    this.dataset["full"] = this.fullSize ? "true" : "false";
    this.dataset["icon"] = this.iconColor || "inherit";
    if (this.icon) {
      return T`<wui-icon
        color=${this.iconColor || "inherit"}
        name=${this.icon}
        size="lg"
      ></wui-icon> `;
    }
    if (this.logo) {
      return T`<wui-icon size="lg" color="inherit" name=${this.logo}></wui-icon> `;
    }
    return T`<img src=${o(this.src)} alt=${this.alt} @error=${this.handleImageError} />`;
  }
  handleImageError() {
    this.dispatchEvent(new CustomEvent("onLoadError", { bubbles: true, composed: true }));
  }
};
WuiImage.styles = [resetStyles, styles$19];
__decorate$19([
  n()
], WuiImage.prototype, "src", void 0);
__decorate$19([
  n()
], WuiImage.prototype, "logo", void 0);
__decorate$19([
  n()
], WuiImage.prototype, "icon", void 0);
__decorate$19([
  n()
], WuiImage.prototype, "iconColor", void 0);
__decorate$19([
  n()
], WuiImage.prototype, "alt", void 0);
__decorate$19([
  n()
], WuiImage.prototype, "size", void 0);
__decorate$19([
  n({ type: Boolean })
], WuiImage.prototype, "boxed", void 0);
__decorate$19([
  n({ type: Boolean })
], WuiImage.prototype, "rounded", void 0);
__decorate$19([
  n({ type: Boolean })
], WuiImage.prototype, "fullSize", void 0);
WuiImage = __decorate$19([
  customElement("wui-image")
], WuiImage);
const styles$18 = i`
  :host {
    display: flex;
  }

  :host([data-size='sm']) > svg {
    width: 12px;
    height: 12px;
  }

  :host([data-size='md']) > svg {
    width: 16px;
    height: 16px;
  }

  :host([data-size='lg']) > svg {
    width: 24px;
    height: 24px;
  }

  :host([data-size='xl']) > svg {
    width: 32px;
    height: 32px;
  }

  svg {
    animation: rotate 1.4s linear infinite;
    color: var(--local-color);
  }

  :host([data-size='md']) > svg > circle {
    stroke-width: 6px;
  }

  :host([data-size='sm']) > svg > circle {
    stroke-width: 8px;
  }

  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }
`;
var __decorate$18 = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
let WuiLoadingSpinner = class WuiLoadingSpinner2 extends i$1 {
  constructor() {
    super(...arguments);
    this.color = "primary";
    this.size = "lg";
  }
  render() {
    const VARS_BY_COLOR = {
      primary: vars.tokens.theme.textPrimary,
      secondary: vars.tokens.theme.textSecondary,
      tertiary: vars.tokens.theme.textTertiary,
      invert: vars.tokens.theme.textInvert,
      error: vars.tokens.core.textError,
      warning: vars.tokens.core.textWarning,
      "accent-primary": vars.tokens.core.textAccentPrimary
    };
    this.style.cssText = `
      --local-color: ${this.color === "inherit" ? "inherit" : VARS_BY_COLOR[this.color]};
      `;
    this.dataset["size"] = this.size;
    return T`<svg viewBox="0 0 16 17" fill="none">
      <path
        d="M8.75 2.65625V4.65625C8.75 4.85516 8.67098 5.04593 8.53033 5.18658C8.38968 5.32723 8.19891 5.40625 8 5.40625C7.80109 5.40625 7.61032 5.32723 7.46967 5.18658C7.32902 5.04593 7.25 4.85516 7.25 4.65625V2.65625C7.25 2.45734 7.32902 2.26657 7.46967 2.12592C7.61032 1.98527 7.80109 1.90625 8 1.90625C8.19891 1.90625 8.38968 1.98527 8.53033 2.12592C8.67098 2.26657 8.75 2.45734 8.75 2.65625ZM14 7.90625H12C11.8011 7.90625 11.6103 7.98527 11.4697 8.12592C11.329 8.26657 11.25 8.45734 11.25 8.65625C11.25 8.85516 11.329 9.04593 11.4697 9.18658C11.6103 9.32723 11.8011 9.40625 12 9.40625H14C14.1989 9.40625 14.3897 9.32723 14.5303 9.18658C14.671 9.04593 14.75 8.85516 14.75 8.65625C14.75 8.45734 14.671 8.26657 14.5303 8.12592C14.3897 7.98527 14.1989 7.90625 14 7.90625ZM11.3588 10.9544C11.289 10.8846 11.2062 10.8293 11.115 10.7915C11.0239 10.7538 10.9262 10.7343 10.8275 10.7343C10.7288 10.7343 10.6311 10.7538 10.54 10.7915C10.4488 10.8293 10.366 10.8846 10.2963 10.9544C10.2265 11.0241 10.1711 11.107 10.1334 11.1981C10.0956 11.2893 10.0762 11.387 10.0762 11.4856C10.0762 11.5843 10.0956 11.682 10.1334 11.7731C10.1711 11.8643 10.2265 11.9471 10.2963 12.0169L11.7106 13.4312C11.8515 13.5721 12.0426 13.6513 12.2419 13.6513C12.4411 13.6513 12.6322 13.5721 12.7731 13.4312C12.914 13.2904 12.9932 13.0993 12.9932 12.9C12.9932 12.7007 12.914 12.5096 12.7731 12.3687L11.3588 10.9544ZM8 11.9062C7.80109 11.9062 7.61032 11.9853 7.46967 12.1259C7.32902 12.2666 7.25 12.4573 7.25 12.6562V14.6562C7.25 14.8552 7.32902 15.0459 7.46967 15.1866C7.61032 15.3272 7.80109 15.4062 8 15.4062C8.19891 15.4062 8.38968 15.3272 8.53033 15.1866C8.67098 15.0459 8.75 14.8552 8.75 14.6562V12.6562C8.75 12.4573 8.67098 12.2666 8.53033 12.1259C8.38968 11.9853 8.19891 11.9062 8 11.9062ZM4.64125 10.9544L3.22688 12.3687C3.08598 12.5096 3.00682 12.7007 3.00682 12.9C3.00682 13.0993 3.08598 13.2904 3.22688 13.4312C3.36777 13.5721 3.55887 13.6513 3.75813 13.6513C3.95738 13.6513 4.14848 13.5721 4.28937 13.4312L5.70375 12.0169C5.84465 11.876 5.9238 11.6849 5.9238 11.4856C5.9238 11.2864 5.84465 11.0953 5.70375 10.9544C5.56285 10.8135 5.37176 10.7343 5.1725 10.7343C4.97324 10.7343 4.78215 10.8135 4.64125 10.9544ZM4.75 8.65625C4.75 8.45734 4.67098 8.26657 4.53033 8.12592C4.38968 7.98527 4.19891 7.90625 4 7.90625H2C1.80109 7.90625 1.61032 7.98527 1.46967 8.12592C1.32902 8.26657 1.25 8.45734 1.25 8.65625C1.25 8.85516 1.32902 9.04593 1.46967 9.18658C1.61032 9.32723 1.80109 9.40625 2 9.40625H4C4.19891 9.40625 4.38968 9.32723 4.53033 9.18658C4.67098 9.04593 4.75 8.85516 4.75 8.65625ZM4.2875 3.88313C4.1466 3.74223 3.95551 3.66307 3.75625 3.66307C3.55699 3.66307 3.3659 3.74223 3.225 3.88313C3.0841 4.02402 3.00495 4.21512 3.00495 4.41438C3.00495 4.61363 3.0841 4.80473 3.225 4.94562L4.64125 6.35813C4.78215 6.49902 4.97324 6.57818 5.1725 6.57818C5.37176 6.57818 5.56285 6.49902 5.70375 6.35813C5.84465 6.21723 5.9238 6.02613 5.9238 5.82688C5.9238 5.62762 5.84465 5.43652 5.70375 5.29563L4.2875 3.88313Z"
        fill="currentColor"
      />
    </svg>`;
  }
};
WuiLoadingSpinner.styles = [resetStyles, styles$18];
__decorate$18([
  n()
], WuiLoadingSpinner.prototype, "color", void 0);
__decorate$18([
  n()
], WuiLoadingSpinner.prototype, "size", void 0);
WuiLoadingSpinner = __decorate$18([
  customElement("wui-loading-spinner")
], WuiLoadingSpinner);
const styles$17 = css`
  slot {
    width: 100%;
    display: inline-block;
    font-style: normal;
    overflow: inherit;
    text-overflow: inherit;
    text-align: var(--local-align);
    color: var(--local-color);
  }

  .wui-line-clamp-1 {
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
  }

  .wui-line-clamp-2 {
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }

  /* -- Headings --------------------------------------------------- */
  .wui-font-h1-regular-mono {
    font-size: ${({ textSize: textSize2 }) => textSize2.h1};
    line-height: ${({ typography: typography2 }) => typography2["h1-regular-mono"].lineHeight};
    letter-spacing: ${({ typography: typography2 }) => typography2["h1-regular-mono"].letterSpacing};
    font-weight: ${({ fontWeight: fontWeight2 }) => fontWeight2.regular};
    font-family: ${({ fontFamily: fontFamily2 }) => fontFamily2.mono};
  }

  .wui-font-h1-regular {
    font-size: ${({ textSize: textSize2 }) => textSize2.h1};
    line-height: ${({ typography: typography2 }) => typography2["h1-regular"].lineHeight};
    letter-spacing: ${({ typography: typography2 }) => typography2["h1-regular"].letterSpacing};
    font-weight: ${({ fontWeight: fontWeight2 }) => fontWeight2.regular};
    font-family: ${({ fontFamily: fontFamily2 }) => fontFamily2.regular};
    font-feature-settings:
      'liga' off,
      'clig' off;
  }

  .wui-font-h1-medium {
    font-size: ${({ textSize: textSize2 }) => textSize2.h1};
    line-height: ${({ typography: typography2 }) => typography2["h1-medium"].lineHeight};
    letter-spacing: ${({ typography: typography2 }) => typography2["h1-medium"].letterSpacing};
    font-weight: ${({ fontWeight: fontWeight2 }) => fontWeight2.medium};
    font-family: ${({ fontFamily: fontFamily2 }) => fontFamily2.regular};
    font-feature-settings:
      'liga' off,
      'clig' off;
  }

  .wui-font-h2-regular-mono {
    font-size: ${({ textSize: textSize2 }) => textSize2.h2};
    line-height: ${({ typography: typography2 }) => typography2["h2-regular-mono"].lineHeight};
    letter-spacing: ${({ typography: typography2 }) => typography2["h2-regular-mono"].letterSpacing};
    font-weight: ${({ fontWeight: fontWeight2 }) => fontWeight2.regular};
    font-family: ${({ fontFamily: fontFamily2 }) => fontFamily2.mono};
  }

  .wui-font-h2-regular {
    font-size: ${({ textSize: textSize2 }) => textSize2.h2};
    line-height: ${({ typography: typography2 }) => typography2["h2-regular"].lineHeight};
    letter-spacing: ${({ typography: typography2 }) => typography2["h2-regular"].letterSpacing};
    font-weight: ${({ fontWeight: fontWeight2 }) => fontWeight2.regular};
    font-family: ${({ fontFamily: fontFamily2 }) => fontFamily2.regular};
    font-feature-settings:
      'liga' off,
      'clig' off;
  }

  .wui-font-h2-medium {
    font-size: ${({ textSize: textSize2 }) => textSize2.h2};
    line-height: ${({ typography: typography2 }) => typography2["h2-medium"].lineHeight};
    letter-spacing: ${({ typography: typography2 }) => typography2["h2-medium"].letterSpacing};
    font-weight: ${({ fontWeight: fontWeight2 }) => fontWeight2.medium};
    font-family: ${({ fontFamily: fontFamily2 }) => fontFamily2.regular};
    font-feature-settings:
      'liga' off,
      'clig' off;
  }

  .wui-font-h3-regular-mono {
    font-size: ${({ textSize: textSize2 }) => textSize2.h3};
    line-height: ${({ typography: typography2 }) => typography2["h3-regular-mono"].lineHeight};
    letter-spacing: ${({ typography: typography2 }) => typography2["h3-regular-mono"].letterSpacing};
    font-weight: ${({ fontWeight: fontWeight2 }) => fontWeight2.regular};
    font-family: ${({ fontFamily: fontFamily2 }) => fontFamily2.mono};
  }

  .wui-font-h3-regular {
    font-size: ${({ textSize: textSize2 }) => textSize2.h3};
    line-height: ${({ typography: typography2 }) => typography2["h3-regular"].lineHeight};
    letter-spacing: ${({ typography: typography2 }) => typography2["h3-regular"].letterSpacing};
    font-weight: ${({ fontWeight: fontWeight2 }) => fontWeight2.regular};
    font-family: ${({ fontFamily: fontFamily2 }) => fontFamily2.regular};
    font-feature-settings:
      'liga' off,
      'clig' off;
  }

  .wui-font-h3-medium {
    font-size: ${({ textSize: textSize2 }) => textSize2.h3};
    line-height: ${({ typography: typography2 }) => typography2["h3-medium"].lineHeight};
    letter-spacing: ${({ typography: typography2 }) => typography2["h3-medium"].letterSpacing};
    font-weight: ${({ fontWeight: fontWeight2 }) => fontWeight2.medium};
    font-family: ${({ fontFamily: fontFamily2 }) => fontFamily2.regular};
    font-feature-settings:
      'liga' off,
      'clig' off;
  }

  .wui-font-h4-regular-mono {
    font-size: ${({ textSize: textSize2 }) => textSize2.h4};
    line-height: ${({ typography: typography2 }) => typography2["h4-regular-mono"].lineHeight};
    letter-spacing: ${({ typography: typography2 }) => typography2["h4-regular-mono"].letterSpacing};
    font-weight: ${({ fontWeight: fontWeight2 }) => fontWeight2.regular};
    font-family: ${({ fontFamily: fontFamily2 }) => fontFamily2.mono};
  }

  .wui-font-h4-regular {
    font-size: ${({ textSize: textSize2 }) => textSize2.h4};
    line-height: ${({ typography: typography2 }) => typography2["h4-regular"].lineHeight};
    letter-spacing: ${({ typography: typography2 }) => typography2["h4-regular"].letterSpacing};
    font-weight: ${({ fontWeight: fontWeight2 }) => fontWeight2.regular};
    font-family: ${({ fontFamily: fontFamily2 }) => fontFamily2.regular};
    font-feature-settings:
      'liga' off,
      'clig' off;
  }

  .wui-font-h4-medium {
    font-size: ${({ textSize: textSize2 }) => textSize2.h4};
    line-height: ${({ typography: typography2 }) => typography2["h4-medium"].lineHeight};
    letter-spacing: ${({ typography: typography2 }) => typography2["h4-medium"].letterSpacing};
    font-weight: ${({ fontWeight: fontWeight2 }) => fontWeight2.medium};
    font-family: ${({ fontFamily: fontFamily2 }) => fontFamily2.regular};
    font-feature-settings:
      'liga' off,
      'clig' off;
  }

  .wui-font-h5-regular-mono {
    font-size: ${({ textSize: textSize2 }) => textSize2.h5};
    line-height: ${({ typography: typography2 }) => typography2["h5-regular-mono"].lineHeight};
    letter-spacing: ${({ typography: typography2 }) => typography2["h5-regular-mono"].letterSpacing};
    font-weight: ${({ fontWeight: fontWeight2 }) => fontWeight2.regular};
    font-family: ${({ fontFamily: fontFamily2 }) => fontFamily2.mono};
  }

  .wui-font-h5-regular {
    font-size: ${({ textSize: textSize2 }) => textSize2.h5};
    line-height: ${({ typography: typography2 }) => typography2["h5-regular"].lineHeight};
    letter-spacing: ${({ typography: typography2 }) => typography2["h5-regular"].letterSpacing};
    font-weight: ${({ fontWeight: fontWeight2 }) => fontWeight2.regular};
    font-family: ${({ fontFamily: fontFamily2 }) => fontFamily2.regular};
    font-feature-settings:
      'liga' off,
      'clig' off;
  }

  .wui-font-h5-medium {
    font-size: ${({ textSize: textSize2 }) => textSize2.h5};
    line-height: ${({ typography: typography2 }) => typography2["h5-medium"].lineHeight};
    letter-spacing: ${({ typography: typography2 }) => typography2["h5-medium"].letterSpacing};
    font-weight: ${({ fontWeight: fontWeight2 }) => fontWeight2.medium};
    font-family: ${({ fontFamily: fontFamily2 }) => fontFamily2.regular};
    font-feature-settings:
      'liga' off,
      'clig' off;
  }

  .wui-font-h6-regular-mono {
    font-size: ${({ textSize: textSize2 }) => textSize2.h6};
    line-height: ${({ typography: typography2 }) => typography2["h6-regular-mono"].lineHeight};
    letter-spacing: ${({ typography: typography2 }) => typography2["h6-regular-mono"].letterSpacing};
    font-weight: ${({ fontWeight: fontWeight2 }) => fontWeight2.regular};
    font-family: ${({ fontFamily: fontFamily2 }) => fontFamily2.mono};
  }

  .wui-font-h6-regular {
    font-size: ${({ textSize: textSize2 }) => textSize2.h6};
    line-height: ${({ typography: typography2 }) => typography2["h6-regular"].lineHeight};
    letter-spacing: ${({ typography: typography2 }) => typography2["h6-regular"].letterSpacing};
    font-weight: ${({ fontWeight: fontWeight2 }) => fontWeight2.regular};
    font-family: ${({ fontFamily: fontFamily2 }) => fontFamily2.regular};
    font-feature-settings:
      'liga' off,
      'clig' off;
  }

  .wui-font-h6-medium {
    font-size: ${({ textSize: textSize2 }) => textSize2.h6};
    line-height: ${({ typography: typography2 }) => typography2["h6-medium"].lineHeight};
    letter-spacing: ${({ typography: typography2 }) => typography2["h6-medium"].letterSpacing};
    font-weight: ${({ fontWeight: fontWeight2 }) => fontWeight2.medium};
    font-family: ${({ fontFamily: fontFamily2 }) => fontFamily2.regular};
    font-feature-settings:
      'liga' off,
      'clig' off;
  }

  .wui-font-lg-regular-mono {
    font-size: ${({ textSize: textSize2 }) => textSize2.large};
    line-height: ${({ typography: typography2 }) => typography2["lg-regular-mono"].lineHeight};
    letter-spacing: ${({ typography: typography2 }) => typography2["lg-regular-mono"].letterSpacing};
    font-weight: ${({ fontWeight: fontWeight2 }) => fontWeight2.regular};
    font-family: ${({ fontFamily: fontFamily2 }) => fontFamily2.mono};
  }

  .wui-font-lg-regular {
    font-size: ${({ textSize: textSize2 }) => textSize2.large};
    line-height: ${({ typography: typography2 }) => typography2["lg-regular"].lineHeight};
    letter-spacing: ${({ typography: typography2 }) => typography2["lg-regular"].letterSpacing};
    font-weight: ${({ fontWeight: fontWeight2 }) => fontWeight2.regular};
    font-family: ${({ fontFamily: fontFamily2 }) => fontFamily2.regular};
    font-feature-settings:
      'liga' off,
      'clig' off;
  }

  .wui-font-lg-medium {
    font-size: ${({ textSize: textSize2 }) => textSize2.large};
    line-height: ${({ typography: typography2 }) => typography2["lg-medium"].lineHeight};
    letter-spacing: ${({ typography: typography2 }) => typography2["lg-medium"].letterSpacing};
    font-weight: ${({ fontWeight: fontWeight2 }) => fontWeight2.medium};
    font-family: ${({ fontFamily: fontFamily2 }) => fontFamily2.regular};
    font-feature-settings:
      'liga' off,
      'clig' off;
  }

  .wui-font-md-regular-mono {
    font-size: ${({ textSize: textSize2 }) => textSize2.medium};
    line-height: ${({ typography: typography2 }) => typography2["md-regular-mono"].lineHeight};
    letter-spacing: ${({ typography: typography2 }) => typography2["md-regular-mono"].letterSpacing};
    font-weight: ${({ fontWeight: fontWeight2 }) => fontWeight2.regular};
    font-family: ${({ fontFamily: fontFamily2 }) => fontFamily2.mono};
  }

  .wui-font-md-regular {
    font-size: ${({ textSize: textSize2 }) => textSize2.medium};
    line-height: ${({ typography: typography2 }) => typography2["md-regular"].lineHeight};
    letter-spacing: ${({ typography: typography2 }) => typography2["md-regular"].letterSpacing};
    font-weight: ${({ fontWeight: fontWeight2 }) => fontWeight2.regular};
    font-family: ${({ fontFamily: fontFamily2 }) => fontFamily2.regular};
    font-feature-settings:
      'liga' off,
      'clig' off;
  }

  .wui-font-md-medium {
    font-size: ${({ textSize: textSize2 }) => textSize2.medium};
    line-height: ${({ typography: typography2 }) => typography2["md-medium"].lineHeight};
    letter-spacing: ${({ typography: typography2 }) => typography2["md-medium"].letterSpacing};
    font-weight: ${({ fontWeight: fontWeight2 }) => fontWeight2.medium};
    font-family: ${({ fontFamily: fontFamily2 }) => fontFamily2.regular};
    font-feature-settings:
      'liga' off,
      'clig' off;
  }

  .wui-font-sm-regular-mono {
    font-size: ${({ textSize: textSize2 }) => textSize2.small};
    line-height: ${({ typography: typography2 }) => typography2["sm-regular-mono"].lineHeight};
    letter-spacing: ${({ typography: typography2 }) => typography2["sm-regular-mono"].letterSpacing};
    font-weight: ${({ fontWeight: fontWeight2 }) => fontWeight2.regular};
    font-family: ${({ fontFamily: fontFamily2 }) => fontFamily2.mono};
  }

  .wui-font-sm-regular {
    font-size: ${({ textSize: textSize2 }) => textSize2.small};
    line-height: ${({ typography: typography2 }) => typography2["sm-regular"].lineHeight};
    letter-spacing: ${({ typography: typography2 }) => typography2["sm-regular"].letterSpacing};
    font-weight: ${({ fontWeight: fontWeight2 }) => fontWeight2.regular};
    font-family: ${({ fontFamily: fontFamily2 }) => fontFamily2.regular};
    font-feature-settings:
      'liga' off,
      'clig' off;
  }

  .wui-font-sm-medium {
    font-size: ${({ textSize: textSize2 }) => textSize2.small};
    line-height: ${({ typography: typography2 }) => typography2["sm-medium"].lineHeight};
    letter-spacing: ${({ typography: typography2 }) => typography2["sm-medium"].letterSpacing};
    font-weight: ${({ fontWeight: fontWeight2 }) => fontWeight2.medium};
    font-family: ${({ fontFamily: fontFamily2 }) => fontFamily2.regular};
    font-feature-settings:
      'liga' off,
      'clig' off;
  }
`;
var __decorate$17 = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
const TEXT_VARS_BY_COLOR = {
  primary: vars.tokens.theme.textPrimary,
  secondary: vars.tokens.theme.textSecondary,
  tertiary: vars.tokens.theme.textTertiary,
  invert: vars.tokens.theme.textInvert,
  error: vars.tokens.core.textError,
  success: vars.tokens.core.textSuccess,
  warning: vars.tokens.core.textWarning,
  "accent-primary": vars.tokens.core.textAccentPrimary
};
let WuiText = class WuiText2 extends i$1 {
  constructor() {
    super(...arguments);
    this.variant = "md-regular";
    this.color = "inherit";
    this.align = "left";
    this.lineClamp = void 0;
    this.display = "inline-flex";
  }
  render() {
    const classes = {
      [`wui-font-${this.variant}`]: true,
      [`wui-line-clamp-${this.lineClamp}`]: this.lineClamp ? true : false
    };
    this.style.cssText = `
      display: ${this.display};
      --local-align: ${this.align};
      --local-color: ${this.color === "inherit" ? "inherit" : TEXT_VARS_BY_COLOR[this.color ?? "primary"]};
      `;
    return T`<slot class=${e(classes)}></slot>`;
  }
};
WuiText.styles = [resetStyles, styles$17];
__decorate$17([
  n()
], WuiText.prototype, "variant", void 0);
__decorate$17([
  n()
], WuiText.prototype, "color", void 0);
__decorate$17([
  n()
], WuiText.prototype, "align", void 0);
__decorate$17([
  n()
], WuiText.prototype, "lineClamp", void 0);
__decorate$17([
  n()
], WuiText.prototype, "display", void 0);
WuiText = __decorate$17([
  customElement("wui-text")
], WuiText);
const styles$16 = i`
  :host {
    display: flex;
    width: inherit;
    height: inherit;
    box-sizing: border-box;
  }
`;
var __decorate$16 = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
let WuiFlex = class WuiFlex2 extends i$1 {
  render() {
    this.style.cssText = `
      flex-direction: ${this.flexDirection};
      flex-wrap: ${this.flexWrap};
      flex-basis: ${this.flexBasis};
      flex-grow: ${this.flexGrow};
      flex-shrink: ${this.flexShrink};
      align-items: ${this.alignItems};
      justify-content: ${this.justifyContent};
      column-gap: ${this.columnGap && `var(--apkt-spacing-${this.columnGap})`};
      row-gap: ${this.rowGap && `var(--apkt-spacing-${this.rowGap})`};
      gap: ${this.gap && `var(--apkt-spacing-${this.gap})`};
      padding-top: ${this.padding && UiHelperUtil.getSpacingStyles(this.padding, 0)};
      padding-right: ${this.padding && UiHelperUtil.getSpacingStyles(this.padding, 1)};
      padding-bottom: ${this.padding && UiHelperUtil.getSpacingStyles(this.padding, 2)};
      padding-left: ${this.padding && UiHelperUtil.getSpacingStyles(this.padding, 3)};
      margin-top: ${this.margin && UiHelperUtil.getSpacingStyles(this.margin, 0)};
      margin-right: ${this.margin && UiHelperUtil.getSpacingStyles(this.margin, 1)};
      margin-bottom: ${this.margin && UiHelperUtil.getSpacingStyles(this.margin, 2)};
      margin-left: ${this.margin && UiHelperUtil.getSpacingStyles(this.margin, 3)};
      width: ${this.width};
    `;
    return T`<slot></slot>`;
  }
};
WuiFlex.styles = [resetStyles, styles$16];
__decorate$16([
  n()
], WuiFlex.prototype, "flexDirection", void 0);
__decorate$16([
  n()
], WuiFlex.prototype, "flexWrap", void 0);
__decorate$16([
  n()
], WuiFlex.prototype, "flexBasis", void 0);
__decorate$16([
  n()
], WuiFlex.prototype, "flexGrow", void 0);
__decorate$16([
  n()
], WuiFlex.prototype, "flexShrink", void 0);
__decorate$16([
  n()
], WuiFlex.prototype, "alignItems", void 0);
__decorate$16([
  n()
], WuiFlex.prototype, "justifyContent", void 0);
__decorate$16([
  n()
], WuiFlex.prototype, "columnGap", void 0);
__decorate$16([
  n()
], WuiFlex.prototype, "rowGap", void 0);
__decorate$16([
  n()
], WuiFlex.prototype, "gap", void 0);
__decorate$16([
  n()
], WuiFlex.prototype, "padding", void 0);
__decorate$16([
  n()
], WuiFlex.prototype, "margin", void 0);
__decorate$16([
  n()
], WuiFlex.prototype, "width", void 0);
WuiFlex = __decorate$16([
  customElement("wui-flex")
], WuiFlex);
const styles$15 = css`
  :host {
    display: block;
    width: var(--local-width);
    height: var(--local-height);
    border-radius: ${({ borderRadius: borderRadius2 }) => borderRadius2[16]};
    overflow: hidden;
    position: relative;
  }

  :host([data-variant='generated']) {
    --mixed-local-color-1: var(--local-color-1);
    --mixed-local-color-2: var(--local-color-2);
    --mixed-local-color-3: var(--local-color-3);
    --mixed-local-color-4: var(--local-color-4);
    --mixed-local-color-5: var(--local-color-5);
  }

  :host([data-variant='generated']) {
    background: radial-gradient(
      var(--local-radial-circle),
      #fff 0.52%,
      var(--mixed-local-color-5) 31.25%,
      var(--mixed-local-color-3) 51.56%,
      var(--mixed-local-color-2) 65.63%,
      var(--mixed-local-color-1) 82.29%,
      var(--mixed-local-color-4) 100%
    );
  }

  :host([data-variant='default']) {
    background: radial-gradient(
      75.29% 75.29% at 64.96% 24.36%,
      #fff 0.52%,
      #f5ccfc 31.25%,
      #dba4f5 51.56%,
      #9a8ee8 65.63%,
      #6493da 82.29%,
      #6ebdea 100%
    );
  }
`;
var __decorate$15 = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
let WuiAvatar = class WuiAvatar2 extends i$1 {
  constructor() {
    super(...arguments);
    this.imageSrc = void 0;
    this.alt = void 0;
    this.address = void 0;
    this.size = "xl";
  }
  render() {
    const getSize = {
      inherit: "inherit",
      xxs: "3",
      xs: "5",
      sm: "6",
      md: "8",
      mdl: "8",
      lg: "10",
      xl: "16",
      xxl: "20"
    };
    this.style.cssText = `
    --local-width: var(--apkt-spacing-${getSize[this.size ?? "xl"]});
    --local-height: var(--apkt-spacing-${getSize[this.size ?? "xl"]});
    `;
    return T`${this.visualTemplate()}`;
  }
  visualTemplate() {
    if (this.imageSrc) {
      this.dataset["variant"] = "image";
      return T`<wui-image src=${this.imageSrc} alt=${this.alt ?? "avatar"}></wui-image>`;
    } else if (this.address) {
      this.dataset["variant"] = "generated";
      const cssColors = UiHelperUtil.generateAvatarColors(this.address);
      this.style.cssText += `
 ${cssColors}`;
      return null;
    }
    this.dataset["variant"] = "default";
    return null;
  }
};
WuiAvatar.styles = [resetStyles, styles$15];
__decorate$15([
  n()
], WuiAvatar.prototype, "imageSrc", void 0);
__decorate$15([
  n()
], WuiAvatar.prototype, "alt", void 0);
__decorate$15([
  n()
], WuiAvatar.prototype, "address", void 0);
__decorate$15([
  n()
], WuiAvatar.prototype, "size", void 0);
WuiAvatar = __decorate$15([
  customElement("wui-avatar")
], WuiAvatar);
const styles$14 = css`
  :host {
    display: block;
  }

  button {
    border-radius: ${({ borderRadius: borderRadius2 }) => borderRadius2["20"]};
    background: ${({ tokens: tokens2 }) => tokens2.theme.foregroundPrimary};
    display: flex;
    gap: ${({ spacing: spacing2 }) => spacing2[1]};
    padding: ${({ spacing: spacing2 }) => spacing2[1]};
    color: ${({ tokens: tokens2 }) => tokens2.theme.textSecondary};
    border-radius: ${({ borderRadius: borderRadius2 }) => borderRadius2[16]};
    height: 32px;
    transition: box-shadow ${({ durations: durations2 }) => durations2["lg"]}
      ${({ easings: easings2 }) => easings2["ease-out-power-2"]};
    will-change: box-shadow;
  }

  button wui-flex.avatar-container {
    width: 28px;
    height: 24px;
    position: relative;

    wui-flex.network-image-container {
      position: absolute;
      bottom: 0px;
      right: 0px;
      width: 12px;
      height: 12px;
    }

    wui-flex.network-image-container wui-icon {
      background: ${({ tokens: tokens2 }) => tokens2.theme.foregroundPrimary};
    }

    wui-avatar {
      width: 24px;
      min-width: 24px;
      height: 24px;
    }

    wui-icon {
      width: 12px;
      height: 12px;
    }
  }

  wui-image,
  wui-icon {
    border-radius: ${({ borderRadius: borderRadius2 }) => borderRadius2[16]};
  }

  wui-text {
    white-space: nowrap;
  }

  button wui-flex.balance-container {
    height: 100%;
    border-radius: ${({ borderRadius: borderRadius2 }) => borderRadius2[16]};
    padding-left: ${({ spacing: spacing2 }) => spacing2[1]};
    padding-right: ${({ spacing: spacing2 }) => spacing2[1]};
    background: ${({ tokens: tokens2 }) => tokens2.theme.foregroundSecondary};
    color: ${({ tokens: tokens2 }) => tokens2.theme.textPrimary};
    transition: background-color ${({ durations: durations2 }) => durations2["lg"]}
      ${({ easings: easings2 }) => easings2["ease-out-power-2"]};
    will-change: background-color;
  }

  /* -- Hover & Active states ----------------------------------------------------------- */
  button:hover:enabled,
  button:focus-visible:enabled,
  button:active:enabled {
    box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.2);

    wui-flex.balance-container {
      background: ${({ tokens: tokens2 }) => tokens2.theme.foregroundTertiary};
    }
  }

  /* -- Disabled states --------------------------------------------------- */
  button:disabled wui-text,
  button:disabled wui-flex.avatar-container {
    opacity: 0.3;
  }
`;
var __decorate$14 = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
let WuiAccountButton = class WuiAccountButton2 extends i$1 {
  constructor() {
    super(...arguments);
    this.networkSrc = void 0;
    this.avatarSrc = void 0;
    this.balance = void 0;
    this.isUnsupportedChain = void 0;
    this.disabled = false;
    this.loading = false;
    this.address = "";
    this.profileName = "";
    this.charsStart = 4;
    this.charsEnd = 6;
  }
  render() {
    return T`
      <button
        ?disabled=${this.disabled}
        class=${o(this.balance ? void 0 : "local-no-balance")}
        data-error=${o(this.isUnsupportedChain)}
      >
        ${this.imageTemplate()} ${this.addressTemplate()} ${this.balanceTemplate()}
      </button>
    `;
  }
  imageTemplate() {
    const networkElement = this.networkSrc ? T`<wui-image src=${this.networkSrc}></wui-image>` : T` <wui-icon size="inherit" color="inherit" name="networkPlaceholder"></wui-icon> `;
    return T`<wui-flex class="avatar-container">
      <wui-avatar
        .imageSrc=${this.avatarSrc}
        alt=${this.address}
        address=${this.address}
      ></wui-avatar>

      <wui-flex class="network-image-container">${networkElement}</wui-flex>
    </wui-flex>`;
  }
  addressTemplate() {
    return T`<wui-text variant="md-regular" color="inherit">
      ${this.address ? UiHelperUtil.getTruncateString({
      string: this.profileName || this.address,
      charsStart: this.profileName ? 18 : this.charsStart,
      charsEnd: this.profileName ? 0 : this.charsEnd,
      truncate: this.profileName ? "end" : "middle"
    }) : null}
    </wui-text>`;
  }
  balanceTemplate() {
    if (this.balance) {
      const balanceTemplate = this.loading ? T`<wui-loading-spinner size="md" color="inherit"></wui-loading-spinner>` : T`<wui-text variant="md-regular" color="inherit"> ${this.balance}</wui-text>`;
      return T`<wui-flex alignItems="center" justifyContent="center" class="balance-container"
        >${balanceTemplate}</wui-flex
      >`;
    }
    return null;
  }
};
WuiAccountButton.styles = [resetStyles, elementStyles, styles$14];
__decorate$14([
  n()
], WuiAccountButton.prototype, "networkSrc", void 0);
__decorate$14([
  n()
], WuiAccountButton.prototype, "avatarSrc", void 0);
__decorate$14([
  n()
], WuiAccountButton.prototype, "balance", void 0);
__decorate$14([
  n({ type: Boolean })
], WuiAccountButton.prototype, "isUnsupportedChain", void 0);
__decorate$14([
  n({ type: Boolean })
], WuiAccountButton.prototype, "disabled", void 0);
__decorate$14([
  n({ type: Boolean })
], WuiAccountButton.prototype, "loading", void 0);
__decorate$14([
  n()
], WuiAccountButton.prototype, "address", void 0);
__decorate$14([
  n()
], WuiAccountButton.prototype, "profileName", void 0);
__decorate$14([
  n()
], WuiAccountButton.prototype, "charsStart", void 0);
__decorate$14([
  n()
], WuiAccountButton.prototype, "charsEnd", void 0);
WuiAccountButton = __decorate$14([
  customElement("wui-account-button")
], WuiAccountButton);
const styles$13 = css`
  :host {
    position: relative;
    display: block;
  }

  button {
    border-radius: ${({ borderRadius: borderRadius2 }) => borderRadius2[2]};
  }

  button[data-size='sm'] {
    padding: ${({ spacing: spacing2 }) => spacing2[2]};
  }

  button[data-size='md'] {
    padding: ${({ spacing: spacing2 }) => spacing2[3]};
  }

  button[data-size='lg'] {
    padding: ${({ spacing: spacing2 }) => spacing2[4]};
  }

  button[data-variant='primary'] {
    background: ${({ tokens: tokens2 }) => tokens2.core.backgroundAccentPrimary};
  }

  button[data-variant='secondary'] {
    background: ${({ tokens: tokens2 }) => tokens2.core.foregroundAccent010};
  }

  button:hover:enabled {
    border-radius: ${({ borderRadius: borderRadius2 }) => borderRadius2[3]};
  }

  button:disabled {
    cursor: not-allowed;
  }

  button[data-loading='true'] {
    cursor: not-allowed;
  }

  button[data-loading='true'][data-size='sm'] {
    border-radius: ${({ borderRadius: borderRadius2 }) => borderRadius2[32]};
    padding: ${({ spacing: spacing2 }) => spacing2[2]} ${({ spacing: spacing2 }) => spacing2[3]};
  }

  button[data-loading='true'][data-size='md'] {
    border-radius: ${({ borderRadius: borderRadius2 }) => borderRadius2[20]};
    padding: ${({ spacing: spacing2 }) => spacing2[3]} ${({ spacing: spacing2 }) => spacing2[4]};
  }

  button[data-loading='true'][data-size='lg'] {
    border-radius: ${({ borderRadius: borderRadius2 }) => borderRadius2[16]};
    padding: ${({ spacing: spacing2 }) => spacing2[4]} ${({ spacing: spacing2 }) => spacing2[5]};
  }
`;
var __decorate$13 = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
let WuiConnectButton = class WuiConnectButton2 extends i$1 {
  constructor() {
    super(...arguments);
    this.size = "md";
    this.variant = "primary";
    this.loading = false;
    this.text = "Connect Wallet";
  }
  render() {
    return T`
      <button
        data-loading=${this.loading}
        data-variant=${this.variant}
        data-size=${this.size}
        ?disabled=${this.loading}
      >
        ${this.contentTemplate()}
      </button>
    `;
  }
  contentTemplate() {
    const textVariants = {
      lg: "lg-regular",
      md: "md-regular",
      sm: "sm-regular"
    };
    const colors2 = {
      primary: "invert",
      secondary: "accent-primary"
    };
    if (!this.loading) {
      return T` <wui-text variant=${textVariants[this.size]} color=${colors2[this.variant]}>
        ${this.text}
      </wui-text>`;
    }
    return T`<wui-loading-spinner
      color=${colors2[this.variant]}
      size=${this.size}
    ></wui-loading-spinner>`;
  }
};
WuiConnectButton.styles = [resetStyles, elementStyles, styles$13];
__decorate$13([
  n()
], WuiConnectButton.prototype, "size", void 0);
__decorate$13([
  n()
], WuiConnectButton.prototype, "variant", void 0);
__decorate$13([
  n({ type: Boolean })
], WuiConnectButton.prototype, "loading", void 0);
__decorate$13([
  n()
], WuiConnectButton.prototype, "text", void 0);
WuiConnectButton = __decorate$13([
  customElement("wui-connect-button")
], WuiConnectButton);
const styles$12 = css`
  :host {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    border-radius: ${({ borderRadius: borderRadius2 }) => borderRadius2[2]};
    padding: ${({ spacing: spacing2 }) => spacing2[1]} !important;
    background-color: ${({ tokens: tokens2 }) => tokens2.theme.backgroundPrimary};
    position: relative;
  }

  :host([data-padding='2']) {
    padding: ${({ spacing: spacing2 }) => spacing2[2]} !important;
  }

  :host:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: ${({ borderRadius: borderRadius2 }) => borderRadius2[2]};
  }

  :host > wui-icon {
    z-index: 10;
  }

  /* -- Colors --------------------------------------------------- */
  :host([data-color='accent-primary']) {
    color: ${({ tokens: tokens2 }) => tokens2.core.iconAccentPrimary};
  }

  :host([data-color='accent-primary']):after {
    background-color: ${({ tokens: tokens2 }) => tokens2.core.foregroundAccent010};
  }

  :host([data-color='default']),
  :host([data-color='secondary']) {
    color: ${({ tokens: tokens2 }) => tokens2.theme.iconDefault};
  }

  :host([data-color='default']):after {
    background-color: ${({ tokens: tokens2 }) => tokens2.theme.foregroundPrimary};
  }

  :host([data-color='secondary']):after {
    background-color: ${({ tokens: tokens2 }) => tokens2.theme.foregroundSecondary};
  }

  :host([data-color='success']) {
    color: ${({ tokens: tokens2 }) => tokens2.core.iconSuccess};
  }

  :host([data-color='success']):after {
    background-color: ${({ tokens: tokens2 }) => tokens2.core.backgroundSuccess};
  }

  :host([data-color='error']) {
    color: ${({ tokens: tokens2 }) => tokens2.core.iconError};
  }

  :host([data-color='error']):after {
    background-color: ${({ tokens: tokens2 }) => tokens2.core.backgroundError};
  }

  :host([data-color='warning']) {
    color: ${({ tokens: tokens2 }) => tokens2.core.iconWarning};
  }

  :host([data-color='warning']):after {
    background-color: ${({ tokens: tokens2 }) => tokens2.core.backgroundWarning};
  }

  :host([data-color='inverse']) {
    color: ${({ tokens: tokens2 }) => tokens2.theme.iconInverse};
  }

  :host([data-color='inverse']):after {
    background-color: transparent;
  }
`;
var __decorate$12 = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
let WuiIconBox = class WuiIconBox2 extends i$1 {
  constructor() {
    super(...arguments);
    this.icon = "copy";
    this.size = "md";
    this.padding = "1";
    this.color = "default";
  }
  render() {
    this.dataset["padding"] = this.padding;
    this.dataset["color"] = this.color;
    return T`
      <wui-icon size=${o(this.size)} name=${this.icon} color="inherit"></wui-icon>
    `;
  }
};
WuiIconBox.styles = [resetStyles, elementStyles, styles$12];
__decorate$12([
  n()
], WuiIconBox.prototype, "icon", void 0);
__decorate$12([
  n()
], WuiIconBox.prototype, "size", void 0);
__decorate$12([
  n()
], WuiIconBox.prototype, "padding", void 0);
__decorate$12([
  n()
], WuiIconBox.prototype, "color", void 0);
WuiIconBox = __decorate$12([
  customElement("wui-icon-box")
], WuiIconBox);
const styles$11 = css`
  :host {
    display: block;
  }

  button {
    border-radius: ${({ borderRadius: borderRadius2 }) => borderRadius2[32]};
    display: flex;
    gap: ${({ spacing: spacing2 }) => spacing2[1]};
    padding: ${({ spacing: spacing2 }) => spacing2[1]} ${({ spacing: spacing2 }) => spacing2[2]}
      ${({ spacing: spacing2 }) => spacing2[1]} ${({ spacing: spacing2 }) => spacing2[1]};
    background-color: ${({ tokens: tokens2 }) => tokens2.theme.foregroundPrimary};
  }

  button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  @media (hover: hover) {
    button:hover:enabled {
      background-color: ${({ tokens: tokens2 }) => tokens2.theme.foregroundSecondary};
    }
  }

  button[data-size='sm'] > wui-icon-box,
  button[data-size='sm'] > wui-image {
    width: 16px;
    height: 16px;
  }

  button[data-size='md'] > wui-icon-box,
  button[data-size='md'] > wui-image {
    width: 20px;
    height: 20px;
  }

  button[data-size='lg'] > wui-icon-box,
  button[data-size='lg'] > wui-image {
    width: 24px;
    height: 24px;
  }

  wui-image,
  wui-icon-box {
    border-radius: ${({ borderRadius: borderRadius2 }) => borderRadius2[32]};
  }
`;
var __decorate$11 = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
let WuiNetworkButton = class WuiNetworkButton2 extends i$1 {
  constructor() {
    super(...arguments);
    this.imageSrc = void 0;
    this.isUnsupportedChain = void 0;
    this.disabled = false;
    this.size = "lg";
  }
  render() {
    const textVariant = {
      sm: "sm-regular",
      md: "md-regular",
      lg: "lg-regular"
    };
    return T`
      <button data-size=${this.size} data-testid="wui-network-button" ?disabled=${this.disabled}>
        ${this.visualTemplate()}
        <wui-text variant=${textVariant[this.size]} color="primary">
          <slot></slot>
        </wui-text>
      </button>
    `;
  }
  visualTemplate() {
    if (this.isUnsupportedChain) {
      return T` <wui-icon-box color="error" icon="warningCircle"></wui-icon-box> `;
    }
    if (this.imageSrc) {
      return T`<wui-image src=${this.imageSrc}></wui-image>`;
    }
    return T` <wui-icon size="xl" color="default" name="networkPlaceholder"></wui-icon> `;
  }
};
WuiNetworkButton.styles = [resetStyles, elementStyles, styles$11];
__decorate$11([
  n()
], WuiNetworkButton.prototype, "imageSrc", void 0);
__decorate$11([
  n({ type: Boolean })
], WuiNetworkButton.prototype, "isUnsupportedChain", void 0);
__decorate$11([
  n({ type: Boolean })
], WuiNetworkButton.prototype, "disabled", void 0);
__decorate$11([
  n()
], WuiNetworkButton.prototype, "size", void 0);
WuiNetworkButton = __decorate$11([
  customElement("wui-network-button")
], WuiNetworkButton);
const REOWN_URL = "https://reown.com";
const styles$10 = css`
  .reown-logo {
    height: 24px;
  }

  a {
    text-decoration: none;
    cursor: pointer;
    color: ${({ tokens: tokens2 }) => tokens2.theme.textSecondary};
  }

  a:hover {
    opacity: 0.9;
  }
`;
var __decorate$10 = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
let WuiUxByReown = class WuiUxByReown2 extends i$1 {
  render() {
    return T`
      <a
        data-testid="ux-branding-reown"
        href=${REOWN_URL}
        rel="noreferrer"
        target="_blank"
        style="text-decoration: none;"
      >
        <wui-flex
          justifyContent="center"
          alignItems="center"
          gap="1"
          .padding=${["01", "0", "3", "0"]}
        >
          <wui-text variant="sm-regular" color="inherit"> UX by </wui-text>
          <wui-icon name="reown" size="inherit" class="reown-logo"></wui-icon>
        </wui-flex>
      </a>
    `;
  }
};
WuiUxByReown.styles = [resetStyles, elementStyles, styles$10];
WuiUxByReown = __decorate$10([
  customElement("wui-ux-by-reown")
], WuiUxByReown);
const styles$$ = css`
  button {
    border: none;
    background: transparent;
    height: 20px;
    padding: ${({ spacing: spacing2 }) => spacing2[2]};
    column-gap: ${({ spacing: spacing2 }) => spacing2[1]};
    border-radius: ${({ borderRadius: borderRadius2 }) => borderRadius2[1]};
    padding: 0 ${({ spacing: spacing2 }) => spacing2[1]};
    border-radius: ${({ spacing: spacing2 }) => spacing2[1]};
  }

  /* -- Variants --------------------------------------------------------- */
  button[data-variant='accent'] {
    color: ${({ tokens: tokens2 }) => tokens2.core.textAccentPrimary};
  }

  button[data-variant='secondary'] {
    color: ${({ tokens: tokens2 }) => tokens2.theme.textSecondary};
  }

  /* -- Focus states --------------------------------------------------- */
  button:focus-visible:enabled {
    box-shadow: 0px 0px 0px 4px rgba(9, 136, 240, 0.2);
  }

  button[data-variant='accent']:focus-visible:enabled {
    background-color: ${({ tokens: tokens2 }) => tokens2.core.foregroundAccent010};
  }

  button[data-variant='secondary']:focus-visible:enabled {
    background-color: ${({ tokens: tokens2 }) => tokens2.theme.foregroundSecondary};
  }

  /* -- Hover & Active states ----------------------------------------------------------- */
  button[data-variant='accent']:hover:enabled {
    background-color: ${({ tokens: tokens2 }) => tokens2.core.foregroundAccent010};
  }

  button[data-variant='secondary']:hover:enabled {
    background-color: ${({ tokens: tokens2 }) => tokens2.theme.foregroundSecondary};
  }

  button[data-variant='accent']:focus-visible {
    background-color: ${({ tokens: tokens2 }) => tokens2.core.foregroundAccent010};
  }

  button[data-variant='secondary']:focus-visible {
    background-color: ${({ tokens: tokens2 }) => tokens2.theme.foregroundSecondary};
    box-shadow: 0px 0px 0px 4px rgba(9, 136, 240, 0.2);
  }

  button[disabled] {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
var __decorate$$ = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
const TEXT_VARIANT_BY_SIZE$4 = {
  sm: "sm-medium",
  md: "md-medium"
};
const TEXT_COLOR_BY_VARIANT = {
  accent: "accent-primary",
  secondary: "secondary"
};
let WuiLink = class WuiLink2 extends i$1 {
  constructor() {
    super(...arguments);
    this.size = "md";
    this.disabled = false;
    this.variant = "accent";
    this.icon = void 0;
  }
  render() {
    return T`
      <button ?disabled=${this.disabled} data-variant=${this.variant}>
        <slot name="iconLeft"></slot>
        <wui-text
          color=${TEXT_COLOR_BY_VARIANT[this.variant]}
          variant=${TEXT_VARIANT_BY_SIZE$4[this.size]}
        >
          <slot></slot>
        </wui-text>
        ${this.iconTemplate()}
      </button>
    `;
  }
  iconTemplate() {
    if (!this.icon) {
      return null;
    }
    return T`<wui-icon name=${this.icon} size="sm"></wui-icon>`;
  }
};
WuiLink.styles = [resetStyles, elementStyles, styles$$];
__decorate$$([
  n()
], WuiLink.prototype, "size", void 0);
__decorate$$([
  n({ type: Boolean })
], WuiLink.prototype, "disabled", void 0);
__decorate$$([
  n()
], WuiLink.prototype, "variant", void 0);
__decorate$$([
  n()
], WuiLink.prototype, "icon", void 0);
WuiLink = __decorate$$([
  customElement("wui-link")
], WuiLink);
const styles$_ = css`
  button {
    background-color: transparent;
    padding: ${({ spacing: spacing2 }) => spacing2[1]};
  }

  button:focus-visible {
    box-shadow: 0 0 0 4px ${({ tokens: tokens2 }) => tokens2.core.foregroundAccent020};
  }

  button[data-variant='accent']:hover:enabled,
  button[data-variant='accent']:focus-visible {
    background-color: ${({ tokens: tokens2 }) => tokens2.core.foregroundAccent010};
  }

  button[data-variant='primary']:hover:enabled,
  button[data-variant='primary']:focus-visible,
  button[data-variant='secondary']:hover:enabled,
  button[data-variant='secondary']:focus-visible {
    background-color: ${({ tokens: tokens2 }) => tokens2.theme.foregroundSecondary};
  }

  button[data-size='xs'] > wui-icon {
    width: 8px;
    height: 8px;
  }

  button[data-size='sm'] > wui-icon {
    width: 12px;
    height: 12px;
  }

  button[data-size='xs'],
  button[data-size='sm'] {
    border-radius: ${({ borderRadius: borderRadius2 }) => borderRadius2[1]};
  }

  button[data-size='md'],
  button[data-size='lg'] {
    border-radius: ${({ borderRadius: borderRadius2 }) => borderRadius2[2]};
  }

  button[data-size='md'] > wui-icon {
    width: 16px;
    height: 16px;
  }

  button[data-size='lg'] > wui-icon {
    width: 20px;
    height: 20px;
  }

  button:disabled {
    background-color: transparent;
    cursor: not-allowed;
    opacity: 0.5;
  }

  button:hover:not(:disabled) {
    background-color: var(--wui-color-accent-glass-015);
  }

  button:focus-visible:not(:disabled) {
    background-color: var(--wui-color-accent-glass-015);
    box-shadow:
      inset 0 0 0 1px var(--wui-color-accent-100),
      0 0 0 4px var(--wui-color-accent-glass-020);
  }
`;
var __decorate$_ = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
let WuiIconLink = class WuiIconLink2 extends i$1 {
  constructor() {
    super(...arguments);
    this.size = "md";
    this.disabled = false;
    this.icon = "copy";
    this.iconColor = "default";
    this.variant = "accent";
  }
  render() {
    const iconColors = {
      accent: "accent-primary",
      primary: "inverse",
      secondary: "default"
    };
    return T`
      <button data-variant=${this.variant} ?disabled=${this.disabled} data-size=${this.size}>
        <wui-icon
          color=${iconColors[this.variant] || this.iconColor}
          size=${this.size}
          name=${this.icon}
        ></wui-icon>
      </button>
    `;
  }
};
WuiIconLink.styles = [resetStyles, elementStyles, styles$_];
__decorate$_([
  n()
], WuiIconLink.prototype, "size", void 0);
__decorate$_([
  n({ type: Boolean })
], WuiIconLink.prototype, "disabled", void 0);
__decorate$_([
  n()
], WuiIconLink.prototype, "icon", void 0);
__decorate$_([
  n()
], WuiIconLink.prototype, "iconColor", void 0);
__decorate$_([
  n()
], WuiIconLink.prototype, "variant", void 0);
WuiIconLink = __decorate$_([
  customElement("wui-icon-link")
], WuiIconLink);
const styles$Z = css`
  :host {
    width: 100%;
  }

  :host([data-type='primary']) > button {
    background-color: ${({ tokens: tokens2 }) => tokens2.theme.backgroundPrimary};
  }

  :host([data-type='secondary']) > button {
    background-color: ${({ tokens: tokens2 }) => tokens2.theme.foregroundPrimary};
  }

  button {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: ${({ spacing: spacing2 }) => spacing2[3]};
    width: 100%;
    border-radius: ${({ borderRadius: borderRadius2 }) => borderRadius2[4]};
    transition:
      background-color ${({ durations: durations2 }) => durations2["lg"]}
        ${({ easings: easings2 }) => easings2["ease-out-power-2"]},
      scale ${({ durations: durations2 }) => durations2["lg"]} ${({ easings: easings2 }) => easings2["ease-out-power-2"]};
    will-change: background-color, scale;
  }

  wui-text {
    text-transform: capitalize;
  }

  wui-image {
    color: ${({ tokens: tokens2 }) => tokens2.theme.textPrimary};
  }

  @media (hover: hover) {
    :host([data-type='primary']) > button:hover:enabled {
      background-color: ${({ tokens: tokens2 }) => tokens2.theme.foregroundPrimary};
    }

    :host([data-type='secondary']) > button:hover:enabled {
      background-color: ${({ tokens: tokens2 }) => tokens2.theme.foregroundSecondary};
    }
  }

  button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
var __decorate$Z = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
let WuiListItem = class WuiListItem2 extends i$1 {
  constructor() {
    super(...arguments);
    this.type = "primary";
    this.imageSrc = "google";
    this.imageSize = void 0;
    this.loading = false;
    this.boxColor = "foregroundPrimary";
    this.disabled = false;
    this.rightIcon = true;
    this.boxed = true;
    this.rounded = false;
    this.fullSize = false;
  }
  render() {
    this.dataset["rounded"] = this.rounded ? "true" : "false";
    this.dataset["type"] = this.type;
    return T`
      <button
        ?disabled=${this.loading ? true : Boolean(this.disabled)}
        data-loading=${this.loading}
        tabindex=${o(this.tabIdx)}
      >
        <wui-flex gap="2" alignItems="center">
          ${this.templateLeftIcon()}
          <wui-flex gap="1">
            <slot></slot>
          </wui-flex>
        </wui-flex>
        ${this.templateRightIcon()}
      </button>
    `;
  }
  templateLeftIcon() {
    if (this.icon) {
      return T`<wui-image
        icon=${this.icon}
        iconColor=${o(this.iconColor)}
        ?boxed=${this.boxed}
        ?rounded=${this.rounded}
        boxColor=${this.boxColor}
      ></wui-image>`;
    }
    return T`<wui-image
      ?boxed=${this.boxed}
      ?rounded=${this.rounded}
      ?fullSize=${this.fullSize}
      size=${o(this.imageSize)}
      src=${this.imageSrc}
      boxColor=${this.boxColor}
    ></wui-image>`;
  }
  templateRightIcon() {
    if (!this.rightIcon) {
      return null;
    }
    if (this.loading) {
      return T`<wui-loading-spinner size="md" color="accent-primary"></wui-loading-spinner>`;
    }
    return T`<wui-icon name="chevronRight" size="lg" color="default"></wui-icon>`;
  }
};
WuiListItem.styles = [resetStyles, elementStyles, styles$Z];
__decorate$Z([
  n()
], WuiListItem.prototype, "type", void 0);
__decorate$Z([
  n()
], WuiListItem.prototype, "imageSrc", void 0);
__decorate$Z([
  n()
], WuiListItem.prototype, "imageSize", void 0);
__decorate$Z([
  n()
], WuiListItem.prototype, "icon", void 0);
__decorate$Z([
  n()
], WuiListItem.prototype, "iconColor", void 0);
__decorate$Z([
  n({ type: Boolean })
], WuiListItem.prototype, "loading", void 0);
__decorate$Z([
  n()
], WuiListItem.prototype, "tabIdx", void 0);
__decorate$Z([
  n()
], WuiListItem.prototype, "boxColor", void 0);
__decorate$Z([
  n({ type: Boolean })
], WuiListItem.prototype, "disabled", void 0);
__decorate$Z([
  n({ type: Boolean })
], WuiListItem.prototype, "rightIcon", void 0);
__decorate$Z([
  n({ type: Boolean })
], WuiListItem.prototype, "boxed", void 0);
__decorate$Z([
  n({ type: Boolean })
], WuiListItem.prototype, "rounded", void 0);
__decorate$Z([
  n({ type: Boolean })
], WuiListItem.prototype, "fullSize", void 0);
WuiListItem = __decorate$Z([
  customElement("wui-list-item")
], WuiListItem);
const styles$Y = css`
  :host {
    width: var(--local-width);
  }

  button {
    width: var(--local-width);
    white-space: nowrap;
    column-gap: ${({ spacing: spacing2 }) => spacing2[2]};
    transition:
      scale ${({ durations: durations2 }) => durations2["lg"]} ${({ easings: easings2 }) => easings2["ease-out-power-1"]},
      background-color ${({ durations: durations2 }) => durations2["lg"]}
        ${({ easings: easings2 }) => easings2["ease-out-power-2"]},
      border-radius ${({ durations: durations2 }) => durations2["lg"]}
        ${({ easings: easings2 }) => easings2["ease-out-power-1"]};
    will-change: scale, background-color, border-radius;
    cursor: pointer;
  }

  /* -- Sizes --------------------------------------------------- */
  button[data-size='sm'] {
    border-radius: ${({ borderRadius: borderRadius2 }) => borderRadius2[2]};
    padding: 0 ${({ spacing: spacing2 }) => spacing2[2]};
    height: 28px;
  }

  button[data-size='md'] {
    border-radius: ${({ borderRadius: borderRadius2 }) => borderRadius2[3]};
    padding: 0 ${({ spacing: spacing2 }) => spacing2[4]};
    height: 38px;
  }

  button[data-size='lg'] {
    border-radius: ${({ borderRadius: borderRadius2 }) => borderRadius2[4]};
    padding: 0 ${({ spacing: spacing2 }) => spacing2[5]};
    height: 48px;
  }

  /* -- Variants --------------------------------------------------------- */
  button[data-variant='accent-primary'] {
    background-color: ${({ tokens: tokens2 }) => tokens2.core.backgroundAccentPrimary};
    color: ${({ tokens: tokens2 }) => tokens2.theme.textInvert};
  }

  button[data-variant='accent-secondary'] {
    background-color: ${({ tokens: tokens2 }) => tokens2.core.foregroundAccent010};
    color: ${({ tokens: tokens2 }) => tokens2.core.textAccentPrimary};
  }

  button[data-variant='neutral-primary'] {
    background-color: ${({ tokens: tokens2 }) => tokens2.theme.backgroundInvert};
    color: ${({ tokens: tokens2 }) => tokens2.theme.textInvert};
  }

  button[data-variant='neutral-secondary'] {
    background-color: transparent;
    border: 1px solid ${({ tokens: tokens2 }) => tokens2.theme.borderSecondary};
    color: ${({ tokens: tokens2 }) => tokens2.theme.textPrimary};
  }

  button[data-variant='neutral-tertiary'] {
    background-color: ${({ tokens: tokens2 }) => tokens2.theme.foregroundPrimary};
    color: ${({ tokens: tokens2 }) => tokens2.theme.textPrimary};
  }

  button[data-variant='error-primary'] {
    background-color: ${({ tokens: tokens2 }) => tokens2.core.textError};
    color: ${({ tokens: tokens2 }) => tokens2.theme.textInvert};
  }

  button[data-variant='error-secondary'] {
    background-color: ${({ tokens: tokens2 }) => tokens2.core.backgroundError};
    color: ${({ tokens: tokens2 }) => tokens2.core.textError};
  }

  button[data-variant='shade'] {
    background: var(--wui-color-gray-glass-002);
    color: var(--wui-color-fg-200);
    border: none;
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-005);
  }

  /* -- Focus states --------------------------------------------------- */
  button[data-size='sm']:focus-visible:enabled {
    border-radius: 28px;
  }

  button[data-size='md']:focus-visible:enabled {
    border-radius: 38px;
  }

  button[data-size='lg']:focus-visible:enabled {
    border-radius: 48px;
  }
  button[data-variant='shade']:focus-visible:enabled {
    background: var(--wui-color-gray-glass-005);
    box-shadow:
      inset 0 0 0 1px var(--wui-color-gray-glass-010),
      0 0 0 4px var(--wui-color-gray-glass-002);
  }

  /* -- Hover & Active states ----------------------------------------------------------- */
  @media (hover: hover) {
    button[data-size='sm']:hover:enabled {
      border-radius: 28px;
    }

    button[data-size='md']:hover:enabled {
      border-radius: 38px;
    }

    button[data-size='lg']:hover:enabled {
      border-radius: 48px;
    }

    button[data-variant='shade']:hover:enabled {
      background: var(--wui-color-gray-glass-002);
    }

    button[data-variant='shade']:active:enabled {
      background: var(--wui-color-gray-glass-005);
    }
  }

  button[data-size='sm']:active:enabled {
    border-radius: 28px;
  }

  button[data-size='md']:active:enabled {
    border-radius: 38px;
  }

  button[data-size='lg']:active:enabled {
    border-radius: 48px;
  }

  /* -- Disabled states --------------------------------------------------- */
  button:disabled {
    opacity: 0.3;
  }
`;
var __decorate$Y = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
const TEXT_VARIANT_BY_SIZE$3 = {
  lg: "lg-regular-mono",
  md: "md-regular-mono",
  sm: "sm-regular-mono"
};
const SPINNER_SIZE_BY_SIZE = {
  lg: "md",
  md: "md",
  sm: "sm"
};
let WuiButton = class WuiButton2 extends i$1 {
  constructor() {
    super(...arguments);
    this.size = "lg";
    this.disabled = false;
    this.fullWidth = false;
    this.loading = false;
    this.variant = "accent-primary";
  }
  render() {
    this.style.cssText = `
    --local-width: ${this.fullWidth ? "100%" : "auto"};
     `;
    const textVariant = this.textVariant ?? TEXT_VARIANT_BY_SIZE$3[this.size];
    return T`
      <button data-variant=${this.variant} data-size=${this.size} ?disabled=${this.disabled}>
        ${this.loadingTemplate()}
        <slot name="iconLeft"></slot>
        <wui-text variant=${textVariant} color="inherit">
          <slot></slot>
        </wui-text>
        <slot name="iconRight"></slot>
      </button>
    `;
  }
  loadingTemplate() {
    if (this.loading) {
      const size = SPINNER_SIZE_BY_SIZE[this.size];
      const color = this.variant === "neutral-primary" || this.variant === "accent-primary" ? "invert" : "primary";
      return T`<wui-loading-spinner color=${color} size=${size}></wui-loading-spinner>`;
    }
    return null;
  }
};
WuiButton.styles = [resetStyles, elementStyles, styles$Y];
__decorate$Y([
  n()
], WuiButton.prototype, "size", void 0);
__decorate$Y([
  n({ type: Boolean })
], WuiButton.prototype, "disabled", void 0);
__decorate$Y([
  n({ type: Boolean })
], WuiButton.prototype, "fullWidth", void 0);
__decorate$Y([
  n({ type: Boolean })
], WuiButton.prototype, "loading", void 0);
__decorate$Y([
  n()
], WuiButton.prototype, "variant", void 0);
__decorate$Y([
  n()
], WuiButton.prototype, "textVariant", void 0);
WuiButton = __decorate$Y([
  customElement("wui-button")
], WuiButton);
const styles$X = css`
  :host {
    display: block;
  }

  button {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: ${({ spacing: spacing2 }) => spacing2[4]};
    padding: ${({ spacing: spacing2 }) => spacing2[3]};
    border-radius: ${({ borderRadius: borderRadius2 }) => borderRadius2[4]};
    background-color: ${({ tokens: tokens2 }) => tokens2.core.foregroundAccent010};
  }

  wui-flex > wui-icon {
    padding: ${({ spacing: spacing2 }) => spacing2[2]};
    color: ${({ tokens: tokens2 }) => tokens2.theme.textInvert};
    background-color: ${({ tokens: tokens2 }) => tokens2.core.backgroundAccentPrimary};
    border-radius: ${({ borderRadius: borderRadius2 }) => borderRadius2[2]};
    align-items: center;
  }

  @media (hover: hover) {
    button:hover:enabled {
      background-color: ${({ tokens: tokens2 }) => tokens2.core.foregroundAccent020};
    }
  }
`;
var __decorate$X = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
let WuiNoticeCard = class WuiNoticeCard2 extends i$1 {
  constructor() {
    super(...arguments);
    this.label = "";
    this.description = "";
    this.icon = "wallet";
  }
  render() {
    return T`
      <button>
        <wui-flex gap="2" alignItems="center">
          <wui-icon weight="fill" size="lg" name=${this.icon} color="inherit"></wui-icon>
          <wui-flex flexDirection="column" gap="1">
            <wui-text variant="md-medium" color="primary">${this.label}</wui-text>
            <wui-text variant="md-regular" color="tertiary">${this.description}</wui-text>
          </wui-flex>
        </wui-flex>
        <wui-icon size="lg" color="accent-primary" name="chevronRight"></wui-icon>
      </button>
    `;
  }
};
WuiNoticeCard.styles = [resetStyles, elementStyles, styles$X];
__decorate$X([
  n()
], WuiNoticeCard.prototype, "label", void 0);
__decorate$X([
  n()
], WuiNoticeCard.prototype, "description", void 0);
__decorate$X([
  n()
], WuiNoticeCard.prototype, "icon", void 0);
WuiNoticeCard = __decorate$X([
  customElement("wui-notice-card")
], WuiNoticeCard);
const styles$W = css`
  :host {
    flex: 1;
    height: 100%;
  }

  button {
    width: 100%;
    height: 100%;
    display: inline-flex;
    align-items: center;
    padding: ${({ spacing: spacing2 }) => spacing2[1]} ${({ spacing: spacing2 }) => spacing2[2]};
    column-gap: ${({ spacing: spacing2 }) => spacing2[1]};
    color: ${({ tokens: tokens2 }) => tokens2.theme.textSecondary};
    border-radius: ${({ borderRadius: borderRadius2 }) => borderRadius2[20]};
    background-color: transparent;
    transition: background-color ${({ durations: durations2 }) => durations2["lg"]}
      ${({ easings: easings2 }) => easings2["ease-out-power-2"]};
    will-change: background-color;
  }

  /* -- Hover & Active states ----------------------------------------------------------- */
  button[data-active='true'] {
    color: ${({ tokens: tokens2 }) => tokens2.theme.textPrimary};
    background-color: ${({ tokens: tokens2 }) => tokens2.theme.foregroundTertiary};
  }

  button:hover:enabled:not([data-active='true']),
  button:active:enabled:not([data-active='true']) {
    wui-text,
    wui-icon {
      color: ${({ tokens: tokens2 }) => tokens2.theme.textPrimary};
    }
  }
`;
var __decorate$W = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
const TEXT_VARIANT_BY_SIZE$2 = {
  lg: "lg-regular",
  md: "md-regular",
  sm: "sm-regular"
};
const ICON_SIZE$2 = {
  lg: "md",
  md: "sm",
  sm: "sm"
};
let WuiTab = class WuiTab2 extends i$1 {
  constructor() {
    super(...arguments);
    this.icon = "mobile";
    this.size = "md";
    this.label = "";
    this.active = false;
  }
  render() {
    return T`
      <button data-active=${this.active}>
        ${this.icon ? T`<wui-icon size=${ICON_SIZE$2[this.size]} name=${this.icon}></wui-icon>` : ""}
        <wui-text variant=${TEXT_VARIANT_BY_SIZE$2[this.size]}> ${this.label} </wui-text>
      </button>
    `;
  }
};
WuiTab.styles = [resetStyles, elementStyles, styles$W];
__decorate$W([
  n()
], WuiTab.prototype, "icon", void 0);
__decorate$W([
  n()
], WuiTab.prototype, "size", void 0);
__decorate$W([
  n()
], WuiTab.prototype, "label", void 0);
__decorate$W([
  n({ type: Boolean })
], WuiTab.prototype, "active", void 0);
WuiTab = __decorate$W([
  customElement("wui-tab-item")
], WuiTab);
const styles$V = css`
  :host {
    display: inline-flex;
    align-items: center;
    background-color: ${({ tokens: tokens2 }) => tokens2.theme.foregroundSecondary};
    border-radius: ${({ borderRadius: borderRadius2 }) => borderRadius2[32]};
    padding: ${({ spacing: spacing2 }) => spacing2["01"]};
    box-sizing: border-box;
  }

  :host([data-size='sm']) {
    height: 26px;
  }

  :host([data-size='md']) {
    height: 36px;
  }
`;
var __decorate$V = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
let WuiTabs = class WuiTabs2 extends i$1 {
  constructor() {
    super(...arguments);
    this.tabs = [];
    this.onTabChange = () => null;
    this.size = "md";
    this.activeTab = 0;
  }
  render() {
    this.dataset["size"] = this.size;
    return this.tabs.map((tab, index) => {
      const isActive = index === this.activeTab;
      return T`
        <wui-tab-item
          @click=${() => this.onTabClick(index)}
          icon=${tab.icon}
          size=${this.size}
          label=${tab.label}
          ?active=${isActive}
          data-active=${isActive}
          data-testid="tab-${tab.label?.toLowerCase()}"
        ></wui-tab-item>
      `;
    });
  }
  onTabClick(index) {
    this.activeTab = index;
    this.onTabChange(index);
  }
};
WuiTabs.styles = [resetStyles, elementStyles, styles$V];
__decorate$V([
  n({ type: Array })
], WuiTabs.prototype, "tabs", void 0);
__decorate$V([
  n()
], WuiTabs.prototype, "onTabChange", void 0);
__decorate$V([
  n()
], WuiTabs.prototype, "size", void 0);
__decorate$V([
  r$1()
], WuiTabs.prototype, "activeTab", void 0);
WuiTabs = __decorate$V([
  customElement("wui-tabs")
], WuiTabs);
const styles$U = css`
  :host {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: ${({ spacing: spacing2 }) => spacing2[1]};
    text-transform: uppercase;
    white-space: nowrap;
  }

  :host([data-variant='accent']) {
    background-color: ${({ tokens: tokens2 }) => tokens2.core.foregroundAccent010};
    color: ${({ tokens: tokens2 }) => tokens2.core.textAccentPrimary};
  }

  :host([data-variant='info']) {
    background-color: ${({ tokens: tokens2 }) => tokens2.theme.foregroundSecondary};
    color: ${({ tokens: tokens2 }) => tokens2.theme.textSecondary};
  }

  :host([data-variant='success']) {
    background-color: ${({ tokens: tokens2 }) => tokens2.core.backgroundSuccess};
    color: ${({ tokens: tokens2 }) => tokens2.core.textSuccess};
  }

  :host([data-variant='warning']) {
    background-color: ${({ tokens: tokens2 }) => tokens2.core.backgroundWarning};
    color: ${({ tokens: tokens2 }) => tokens2.core.textWarning};
  }

  :host([data-variant='error']) {
    background-color: ${({ tokens: tokens2 }) => tokens2.core.backgroundError};
    color: ${({ tokens: tokens2 }) => tokens2.core.textError};
  }

  :host([data-variant='certified']) {
    background-color: ${({ tokens: tokens2 }) => tokens2.theme.foregroundSecondary};
    color: ${({ tokens: tokens2 }) => tokens2.theme.textSecondary};
  }

  :host([data-size='md']) {
    height: 30px;
    padding: 0 ${({ spacing: spacing2 }) => spacing2[2]};
    border-radius: ${({ borderRadius: borderRadius2 }) => borderRadius2[2]};
  }

  :host([data-size='sm']) {
    height: 20px;
    padding: 0 ${({ spacing: spacing2 }) => spacing2[1]};
    border-radius: ${({ borderRadius: borderRadius2 }) => borderRadius2[1]};
  }
`;
var __decorate$U = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
let WuiTag = class WuiTag2 extends i$1 {
  constructor() {
    super(...arguments);
    this.variant = "accent";
    this.size = "md";
    this.icon = void 0;
  }
  render() {
    this.dataset["variant"] = this.variant;
    this.dataset["size"] = this.size;
    const textVariant = this.size === "md" ? "md-medium" : "sm-medium";
    const iconSize = this.size === "md" ? "md" : "sm";
    return T`
      ${this.icon ? T`<wui-icon size=${iconSize} name=${this.icon}></wui-icon>` : null}
      <wui-text
        display="inline"
        data-variant=${this.variant}
        variant=${textVariant}
        color="inherit"
      >
        <slot></slot>
      </wui-text>
    `;
  }
};
WuiTag.styles = [resetStyles, styles$U];
__decorate$U([
  n()
], WuiTag.prototype, "variant", void 0);
__decorate$U([
  n()
], WuiTag.prototype, "size", void 0);
__decorate$U([
  n()
], WuiTag.prototype, "icon", void 0);
WuiTag = __decorate$U([
  customElement("wui-tag")
], WuiTag);
const styles$T = css`
  button {
    display: flex;
    align-items: center;
    height: 40px;
    padding: ${({ spacing: spacing2 }) => spacing2[2]};
    border-radius: ${({ borderRadius: borderRadius2 }) => borderRadius2[4]};
    column-gap: ${({ spacing: spacing2 }) => spacing2[1]};
    background-color: transparent;
    transition: background-color ${({ durations: durations2 }) => durations2["lg"]}
      ${({ easings: easings2 }) => easings2["ease-out-power-2"]};
    will-change: background-color;
  }

  wui-image,
  .icon-box {
    width: ${({ spacing: spacing2 }) => spacing2[6]};
    height: ${({ spacing: spacing2 }) => spacing2[6]};
    border-radius: ${({ borderRadius: borderRadius2 }) => borderRadius2[4]};
  }

  wui-text {
    flex: 1;
  }

  .icon-box {
    position: relative;
  }

  .icon-box[data-active='true'] {
    background-color: ${({ tokens: tokens2 }) => tokens2.theme.foregroundSecondary};
  }

  .circle {
    position: absolute;
    left: 16px;
    top: 15px;
    width: 8px;
    height: 8px;
    background-color: ${({ tokens: tokens2 }) => tokens2.core.textSuccess};
    box-shadow: 0 0 0 2px ${({ tokens: tokens2 }) => tokens2.theme.foregroundPrimary};
    border-radius: 50%;
  }

  /* -- Hover & Active states ----------------------------------------------------------- */
  @media (hover: hover) {
    button:hover:enabled,
    button:active:enabled {
      background-color: ${({ tokens: tokens2 }) => tokens2.theme.foregroundPrimary};
    }
  }
`;
var __decorate$T = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
let WuiWalletSwitch = class WuiWalletSwitch2 extends i$1 {
  constructor() {
    super(...arguments);
    this.address = "";
    this.profileName = "";
    this.alt = "";
    this.imageSrc = "";
    this.icon = void 0;
    this.iconSize = "md";
    this.enableGreenCircle = true;
    this.loading = false;
    this.charsStart = 4;
    this.charsEnd = 6;
  }
  render() {
    return T`
      <button>
        ${this.leftImageTemplate()} ${this.textTemplate()} ${this.rightImageTemplate()}
      </button>
    `;
  }
  leftImageTemplate() {
    const imageOrIconContent = this.icon ? T`<wui-icon
          size=${o(this.iconSize)}
          color="default"
          name=${this.icon}
          class="icon"
        ></wui-icon>` : T`<wui-image src=${this.imageSrc} alt=${this.alt}></wui-image>`;
    return T`
      <wui-flex
        alignItems="center"
        justifyContent="center"
        class="icon-box"
        data-active=${Boolean(this.icon)}
      >
        ${imageOrIconContent}
        ${this.enableGreenCircle ? T`<wui-flex class="circle"></wui-flex>` : null}
      </wui-flex>
    `;
  }
  textTemplate() {
    return T`
      <wui-text variant="lg-regular" color="primary">
        ${UiHelperUtil.getTruncateString({
      string: this.profileName || this.address,
      charsStart: this.profileName ? 16 : this.charsStart,
      charsEnd: this.profileName ? 0 : this.charsEnd,
      truncate: this.profileName ? "end" : "middle"
    })}
      </wui-text>
    `;
  }
  rightImageTemplate() {
    return T`<wui-icon name="chevronBottom" size="sm" color="default"></wui-icon>`;
  }
};
WuiWalletSwitch.styles = [resetStyles, elementStyles, styles$T];
__decorate$T([
  n()
], WuiWalletSwitch.prototype, "address", void 0);
__decorate$T([
  n()
], WuiWalletSwitch.prototype, "profileName", void 0);
__decorate$T([
  n()
], WuiWalletSwitch.prototype, "alt", void 0);
__decorate$T([
  n()
], WuiWalletSwitch.prototype, "imageSrc", void 0);
__decorate$T([
  n()
], WuiWalletSwitch.prototype, "icon", void 0);
__decorate$T([
  n()
], WuiWalletSwitch.prototype, "iconSize", void 0);
__decorate$T([
  n({ type: Boolean })
], WuiWalletSwitch.prototype, "enableGreenCircle", void 0);
__decorate$T([
  n({ type: Boolean })
], WuiWalletSwitch.prototype, "loading", void 0);
__decorate$T([
  n({ type: Number })
], WuiWalletSwitch.prototype, "charsStart", void 0);
__decorate$T([
  n({ type: Number })
], WuiWalletSwitch.prototype, "charsEnd", void 0);
WuiWalletSwitch = __decorate$T([
  customElement("wui-wallet-switch")
], WuiWalletSwitch);
const styles$S = css`
  span {
    font-weight: 500;
    font-size: 38px;
    color: ${({ tokens: tokens2 }) => tokens2.theme.textPrimary};
    line-height: 38px;
    letter-spacing: -2%;
    text-align: center;
    font-family: var(--apkt-fontFamily-regular);
  }

  .pennies {
    color: ${({ tokens: tokens2 }) => tokens2.theme.textSecondary};
  }
`;
var __decorate$S = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
let WuiBalance = class WuiBalance2 extends i$1 {
  constructor() {
    super(...arguments);
    this.dollars = "0";
    this.pennies = "00";
  }
  render() {
    return T`<span>$${this.dollars}<span class="pennies">.${this.pennies}</span></span>`;
  }
};
WuiBalance.styles = [resetStyles, styles$S];
__decorate$S([
  n()
], WuiBalance.prototype, "dollars", void 0);
__decorate$S([
  n()
], WuiBalance.prototype, "pennies", void 0);
WuiBalance = __decorate$S([
  customElement("wui-balance")
], WuiBalance);
const styles$R = css`
  :host {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    position: relative;
  }

  wui-icon {
    position: absolute;
    width: 12px !important;
    height: 4px !important;
  }

  /* -- Variants --------------------------------------------------------- */
  :host([data-variant='fill']) {
    background-color: ${({ colors: colors2 }) => colors2.neutrals100};
  }

  :host([data-variant='shade']) {
    background-color: ${({ colors: colors2 }) => colors2.neutrals900};
  }

  :host([data-variant='fill']) > wui-text {
    color: ${({ colors: colors2 }) => colors2.black};
  }

  :host([data-variant='shade']) > wui-text {
    color: ${({ colors: colors2 }) => colors2.white};
  }

  :host([data-variant='fill']) > wui-icon {
    color: ${({ colors: colors2 }) => colors2.neutrals100};
  }

  :host([data-variant='shade']) > wui-icon {
    color: ${({ colors: colors2 }) => colors2.neutrals900};
  }

  /* -- Sizes --------------------------------------------------------- */
  :host([data-size='sm']) {
    padding: ${({ spacing: spacing2 }) => spacing2[1]} ${({ spacing: spacing2 }) => spacing2[2]};
    border-radius: ${({ borderRadius: borderRadius2 }) => borderRadius2[2]};
  }

  :host([data-size='md']) {
    padding: ${({ spacing: spacing2 }) => spacing2[2]} ${({ spacing: spacing2 }) => spacing2[3]};
    border-radius: ${({ borderRadius: borderRadius2 }) => borderRadius2[3]};
  }

  /* -- Placements --------------------------------------------------------- */
  wui-icon[data-placement='top'] {
    bottom: 0px;
    left: 50%;
    transform: translate(-50%, 95%);
  }

  wui-icon[data-placement='bottom'] {
    top: 0;
    left: 50%;
    transform: translate(-50%, -95%) rotate(180deg);
  }

  wui-icon[data-placement='right'] {
    top: 50%;
    left: 0;
    transform: translate(-65%, -50%) rotate(90deg);
  }

  wui-icon[data-placement='left'] {
    top: 50%;
    right: 0%;
    transform: translate(65%, -50%) rotate(270deg);
  }
`;
var __decorate$R = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
const TEXT_SIZE = {
  sm: "sm-regular",
  md: "md-regular"
};
let WuiTooltip = class WuiTooltip2 extends i$1 {
  constructor() {
    super(...arguments);
    this.placement = "top";
    this.variant = "fill";
    this.size = "md";
    this.message = "";
  }
  render() {
    this.dataset["variant"] = this.variant;
    this.dataset["size"] = this.size;
    return T`<wui-icon data-placement=${this.placement} size="inherit" name="cursor"></wui-icon>
      <wui-text variant=${TEXT_SIZE[this.size]}>${this.message}</wui-text>`;
  }
};
WuiTooltip.styles = [resetStyles, elementStyles, styles$R];
__decorate$R([
  n()
], WuiTooltip.prototype, "placement", void 0);
__decorate$R([
  n()
], WuiTooltip.prototype, "variant", void 0);
__decorate$R([
  n()
], WuiTooltip.prototype, "size", void 0);
__decorate$R([
  n()
], WuiTooltip.prototype, "message", void 0);
WuiTooltip = __decorate$R([
  customElement("wui-tooltip")
], WuiTooltip);
var TransactionTypePastTense;
(function(TransactionTypePastTense2) {
  TransactionTypePastTense2["approve"] = "approved";
  TransactionTypePastTense2["bought"] = "bought";
  TransactionTypePastTense2["borrow"] = "borrowed";
  TransactionTypePastTense2["burn"] = "burnt";
  TransactionTypePastTense2["cancel"] = "canceled";
  TransactionTypePastTense2["claim"] = "claimed";
  TransactionTypePastTense2["deploy"] = "deployed";
  TransactionTypePastTense2["deposit"] = "deposited";
  TransactionTypePastTense2["execute"] = "executed";
  TransactionTypePastTense2["mint"] = "minted";
  TransactionTypePastTense2["receive"] = "received";
  TransactionTypePastTense2["repay"] = "repaid";
  TransactionTypePastTense2["send"] = "sent";
  TransactionTypePastTense2["sell"] = "sold";
  TransactionTypePastTense2["stake"] = "staked";
  TransactionTypePastTense2["trade"] = "swapped";
  TransactionTypePastTense2["unstake"] = "unstaked";
  TransactionTypePastTense2["withdraw"] = "withdrawn";
})(TransactionTypePastTense || (TransactionTypePastTense = {}));
const styles$Q = css`
  :host > wui-flex {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    width: 40px;
    height: 40px;
    box-shadow: inset 0 0 0 1px ${({ tokens: tokens2 }) => tokens2.core.glass010};
    background-color: ${({ tokens: tokens2 }) => tokens2.theme.foregroundPrimary};
  }

  :host([data-no-images='true']) > wui-flex {
    background-color: ${({ tokens: tokens2 }) => tokens2.theme.foregroundPrimary};
    border-radius: ${({ borderRadius: borderRadius2 }) => borderRadius2[3]} !important;
  }

  :host > wui-flex wui-image {
    display: block;
  }

  :host > wui-flex,
  :host > wui-flex wui-image,
  .swap-images-container,
  .swap-images-container.nft,
  wui-image.nft {
    border-top-left-radius: var(--local-left-border-radius);
    border-top-right-radius: var(--local-right-border-radius);
    border-bottom-left-radius: var(--local-left-border-radius);
    border-bottom-right-radius: var(--local-right-border-radius);
  }

  .swap-images-container {
    position: relative;
    width: 40px;
    height: 40px;
    overflow: hidden;
  }

  .swap-images-container wui-image:first-child {
    position: absolute;
    width: 40px;
    height: 40px;
    top: 0;
    left: 0%;
    clip-path: inset(0px calc(50% + 2px) 0px 0%);
  }

  .swap-images-container wui-image:last-child {
    clip-path: inset(0px 0px 0px calc(50% + 2px));
  }

  .swap-fallback-container {
    position: absolute;
    inset: 0;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .swap-fallback-container.first {
    clip-path: inset(0px calc(50% + 2px) 0px 0%);
  }

  .swap-fallback-container.last {
    clip-path: inset(0px 0px 0px calc(50% + 2px));
  }

  wui-flex.status-box {
    position: absolute;
    right: 0;
    bottom: 0;
    transform: translate(20%, 20%);
    border-radius: ${({ borderRadius: borderRadius2 }) => borderRadius2[4]};
    background-color: ${({ tokens: tokens2 }) => tokens2.theme.backgroundPrimary};
    box-shadow: 0 0 0 2px ${({ tokens: tokens2 }) => tokens2.theme.backgroundPrimary};
    overflow: hidden;
    width: 16px;
    height: 16px;
  }
`;
var __decorate$Q = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
let WuiTransactionVisual = class WuiTransactionVisual2 extends i$1 {
  constructor() {
    super(...arguments);
    this.images = [];
    this.secondImage = {
      type: void 0,
      url: ""
    };
    this.failedImageUrls = /* @__PURE__ */ new Set();
  }
  handleImageError(url) {
    return (event) => {
      event.stopPropagation();
      this.failedImageUrls.add(url);
      this.requestUpdate();
    };
  }
  render() {
    const [firstImage, secondImage] = this.images;
    if (!this.images.length) {
      this.dataset["noImages"] = "true";
    }
    const isLeftNFT = firstImage?.type === "NFT";
    const isRightNFT = secondImage?.url ? secondImage.type === "NFT" : isLeftNFT;
    const leftRadius = isLeftNFT ? "var(--apkt-borderRadius-3)" : "var(--apkt-borderRadius-5)";
    const rightRadius = isRightNFT ? "var(--apkt-borderRadius-3)" : "var(--apkt-borderRadius-5)";
    this.style.cssText = `
    --local-left-border-radius: ${leftRadius};
    --local-right-border-radius: ${rightRadius};
    `;
    return T`<wui-flex> ${this.templateVisual()} ${this.templateIcon()} </wui-flex>`;
  }
  templateVisual() {
    const [firstImage, secondImage] = this.images;
    const hasTwoImages = this.images.length === 2;
    if (hasTwoImages && (firstImage?.url || secondImage?.url)) {
      return this.renderSwapImages(firstImage, secondImage);
    }
    if (firstImage?.url && !this.failedImageUrls.has(firstImage.url)) {
      return this.renderSingleImage(firstImage);
    }
    if (firstImage?.type === "NFT") {
      return this.renderPlaceholderIcon("nftPlaceholder");
    }
    return this.renderPlaceholderIcon("coinPlaceholder");
  }
  renderSwapImages(firstImage, secondImage) {
    return T`<div class="swap-images-container">
      ${firstImage?.url ? this.renderImageOrFallback(firstImage, "first", true) : null}
      ${secondImage?.url ? this.renderImageOrFallback(secondImage, "last", true) : null}
    </div>`;
  }
  renderSingleImage(image) {
    return this.renderImageOrFallback(image, void 0, false);
  }
  renderImageOrFallback(image, position, isInSwapContainer = false) {
    if (!image.url) {
      return null;
    }
    if (this.failedImageUrls.has(image.url)) {
      if (isInSwapContainer && position) {
        return this.renderFallbackIconInContainer(position);
      }
      return this.renderFallbackIcon();
    }
    return T`<wui-image
      src=${image.url}
      alt="Transaction image"
      @onLoadError=${this.handleImageError(image.url)}
    ></wui-image>`;
  }
  renderFallbackIconInContainer(position) {
    return T`<div class="swap-fallback-container ${position}">${this.renderFallbackIcon()}</div>`;
  }
  renderFallbackIcon() {
    return T`<wui-icon
      size="xl"
      weight="regular"
      color="default"
      name="networkPlaceholder"
    ></wui-icon>`;
  }
  renderPlaceholderIcon(iconName) {
    return T`<wui-icon size="xl" weight="regular" color="default" name=${iconName}></wui-icon>`;
  }
  templateIcon() {
    let color = "accent-primary";
    let icon = void 0;
    icon = this.getIcon();
    if (this.status) {
      color = this.getStatusColor();
    }
    if (!icon) {
      return null;
    }
    return T`
      <wui-flex alignItems="center" justifyContent="center" class="status-box">
        <wui-icon-box size="sm" color=${color} icon=${icon}></wui-icon-box>
      </wui-flex>
    `;
  }
  getDirectionIcon() {
    switch (this.direction) {
      case "in":
        return "arrowBottom";
      case "out":
        return "arrowTop";
      default:
        return void 0;
    }
  }
  getIcon() {
    if (this.onlyDirectionIcon) {
      return this.getDirectionIcon();
    }
    if (this.type === "trade") {
      return "swapHorizontal";
    } else if (this.type === "approve") {
      return "checkmark";
    } else if (this.type === "cancel") {
      return "close";
    }
    return this.getDirectionIcon();
  }
  getStatusColor() {
    switch (this.status) {
      case "confirmed":
        return "success";
      case "failed":
        return "error";
      case "pending":
        return "inverse";
      default:
        return "accent-primary";
    }
  }
};
WuiTransactionVisual.styles = [styles$Q];
__decorate$Q([
  n()
], WuiTransactionVisual.prototype, "type", void 0);
__decorate$Q([
  n()
], WuiTransactionVisual.prototype, "status", void 0);
__decorate$Q([
  n()
], WuiTransactionVisual.prototype, "direction", void 0);
__decorate$Q([
  n({ type: Boolean })
], WuiTransactionVisual.prototype, "onlyDirectionIcon", void 0);
__decorate$Q([
  n({ type: Array })
], WuiTransactionVisual.prototype, "images", void 0);
__decorate$Q([
  n({ type: Object })
], WuiTransactionVisual.prototype, "secondImage", void 0);
__decorate$Q([
  r$1()
], WuiTransactionVisual.prototype, "failedImageUrls", void 0);
WuiTransactionVisual = __decorate$Q([
  customElement("wui-transaction-visual")
], WuiTransactionVisual);
const styles$P = css`
  :host {
    width: 100%;
  }

  :host > wui-flex:first-child {
    align-items: center;
    column-gap: ${({ spacing: spacing2 }) => spacing2[2]};
    padding: ${({ spacing: spacing2 }) => spacing2[1]} ${({ spacing: spacing2 }) => spacing2[2]};
    width: 100%;
  }

  :host > wui-flex:first-child wui-text:nth-child(1) {
    text-transform: capitalize;
  }

  wui-transaction-visual {
    width: 40px;
    height: 40px;
  }

  wui-flex {
    flex: 1;
  }

  :host wui-flex wui-flex {
    overflow: hidden;
  }

  :host .description-container wui-text span {
    word-break: break-all;
  }

  :host .description-container wui-text {
    overflow: hidden;
  }

  :host .description-separator-icon {
    margin: 0px 6px;
  }

  :host wui-text > span {
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
  }
`;
var __decorate$P = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
let WuiTransactionListItem = class WuiTransactionListItem2 extends i$1 {
  constructor() {
    super(...arguments);
    this.type = "approve";
    this.onlyDirectionIcon = false;
    this.images = [];
  }
  render() {
    return T`
      <wui-flex>
        <wui-transaction-visual
          .status=${this.status}
          direction=${o(this.direction)}
          type=${this.type}
          .onlyDirectionIcon=${this.onlyDirectionIcon}
          .images=${this.images}
        ></wui-transaction-visual>
        <wui-flex flexDirection="column" gap="1">
          <wui-text variant="lg-medium" color="primary">
            ${TransactionTypePastTense[this.type] || this.type}
          </wui-text>
          <wui-flex class="description-container">
            ${this.templateDescription()} ${this.templateSecondDescription()}
          </wui-flex>
        </wui-flex>
        <wui-text variant="sm-medium" color="secondary"><span>${this.date}</span></wui-text>
      </wui-flex>
    `;
  }
  templateDescription() {
    const description = this.descriptions?.[0];
    return description ? T`
          <wui-text variant="md-regular" color="secondary">
            <span>${description}</span>
          </wui-text>
        ` : null;
  }
  templateSecondDescription() {
    const description = this.descriptions?.[1];
    return description ? T`
          <wui-icon class="description-separator-icon" size="sm" name="arrowRight"></wui-icon>
          <wui-text variant="md-regular" color="secondary">
            <span>${description}</span>
          </wui-text>
        ` : null;
  }
};
WuiTransactionListItem.styles = [resetStyles, styles$P];
__decorate$P([
  n()
], WuiTransactionListItem.prototype, "type", void 0);
__decorate$P([
  n({ type: Array })
], WuiTransactionListItem.prototype, "descriptions", void 0);
__decorate$P([
  n()
], WuiTransactionListItem.prototype, "date", void 0);
__decorate$P([
  n({ type: Boolean })
], WuiTransactionListItem.prototype, "onlyDirectionIcon", void 0);
__decorate$P([
  n()
], WuiTransactionListItem.prototype, "status", void 0);
__decorate$P([
  n()
], WuiTransactionListItem.prototype, "direction", void 0);
__decorate$P([
  n({ type: Array })
], WuiTransactionListItem.prototype, "images", void 0);
WuiTransactionListItem = __decorate$P([
  customElement("wui-transaction-list-item")
], WuiTransactionListItem);
const styles$O = css`
  :host {
    display: block;
    background: linear-gradient(
      90deg,
      ${({ tokens: tokens2 }) => tokens2.theme.foregroundPrimary} 0%,
      ${({ tokens: tokens2 }) => tokens2.theme.foregroundSecondary} 50%,
      ${({ tokens: tokens2 }) => tokens2.theme.foregroundPrimary} 100%
    );
    background-size: 200% 100%;
    animation: shimmer 2s linear infinite;
    border-radius: ${({ borderRadius: borderRadius2 }) => borderRadius2[1]};
  }

  :host([data-rounded='true']) {
    border-radius: ${({ borderRadius: borderRadius2 }) => borderRadius2[16]};
  }

  @keyframes shimmer {
    0% {
      background-position: 100% 0;
    }
    100% {
      background-position: -100% 0;
    }
  }
`;
var __decorate$O = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
let WuiShimmer = class WuiShimmer2 extends i$1 {
  constructor() {
    super(...arguments);
    this.width = "";
    this.height = "";
    this.variant = "default";
    this.rounded = false;
  }
  render() {
    this.style.cssText = `
      width: ${this.width};
      height: ${this.height};
    `;
    this.dataset["rounded"] = this.rounded ? "true" : "false";
    return T`<slot></slot>`;
  }
};
WuiShimmer.styles = [styles$O];
__decorate$O([
  n()
], WuiShimmer.prototype, "width", void 0);
__decorate$O([
  n()
], WuiShimmer.prototype, "height", void 0);
__decorate$O([
  n()
], WuiShimmer.prototype, "variant", void 0);
__decorate$O([
  n({ type: Boolean })
], WuiShimmer.prototype, "rounded", void 0);
WuiShimmer = __decorate$O([
  customElement("wui-shimmer")
], WuiShimmer);
const styles$N = css`
  wui-flex {
    position: relative;
    display: inline-flex;
    justify-content: center;
    align-items: center;
  }

  wui-image {
    border-radius: ${({ borderRadius: borderRadius2 }) => borderRadius2[128]};
  }

  .fallback-icon {
    color: ${({ tokens: tokens2 }) => tokens2.theme.iconInverse};
    border-radius: ${({ borderRadius: borderRadius2 }) => borderRadius2[3]};
    background-color: ${({ tokens: tokens2 }) => tokens2.theme.foregroundPrimary};
  }

  .direction-icon,
  .status-image {
    position: absolute;
    right: 0;
    bottom: 0;
    border-radius: ${({ borderRadius: borderRadius2 }) => borderRadius2[128]};
    border: 2px solid ${({ tokens: tokens2 }) => tokens2.theme.backgroundPrimary};
  }

  .direction-icon {
    padding: ${({ spacing: spacing2 }) => spacing2["01"]};
    color: ${({ tokens: tokens2 }) => tokens2.core.iconSuccess};

    background-color: color-mix(
      in srgb,
      ${({ tokens: tokens2 }) => tokens2.core.textSuccess} 30%,
      ${({ tokens: tokens2 }) => tokens2.theme.backgroundPrimary} 70%
    );
  }

  /* -- Sizes --------------------------------------------------- */
  :host([data-size='sm']) > wui-image:not(.status-image),
  :host([data-size='sm']) > wui-flex {
    width: 24px;
    height: 24px;
  }

  :host([data-size='lg']) > wui-image:not(.status-image),
  :host([data-size='lg']) > wui-flex {
    width: 40px;
    height: 40px;
  }

  :host([data-size='sm']) .fallback-icon {
    height: 16px;
    width: 16px;
    padding: ${({ spacing: spacing2 }) => spacing2[1]};
  }

  :host([data-size='lg']) .fallback-icon {
    height: 32px;
    width: 32px;
    padding: ${({ spacing: spacing2 }) => spacing2[1]};
  }

  :host([data-size='sm']) .direction-icon,
  :host([data-size='sm']) .status-image {
    transform: translate(40%, 30%);
  }

  :host([data-size='lg']) .direction-icon,
  :host([data-size='lg']) .status-image {
    transform: translate(40%, 10%);
  }

  :host([data-size='sm']) .status-image {
    height: 14px;
    width: 14px;
  }

  :host([data-size='lg']) .status-image {
    height: 20px;
    width: 20px;
  }

  /* -- Crop effects --------------------------------------------------- */
  .swap-crop-left-image,
  .swap-crop-right-image {
    position: absolute;
    top: 0;
    bottom: 0;
  }

  .swap-crop-left-image {
    left: 0;
    clip-path: inset(0px calc(50% + 1.5px) 0px 0%);
  }

  .swap-crop-right-image {
    right: 0;
    clip-path: inset(0px 0px 0px calc(50% + 1.5px));
  }
`;
var __decorate$N = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
const ICON_SIZE$1 = {
  sm: "xxs",
  lg: "md"
};
let WuiTransactionThumbnail = class WuiTransactionThumbnail2 extends i$1 {
  constructor() {
    super(...arguments);
    this.type = "approve";
    this.size = "lg";
    this.statusImageUrl = "";
    this.images = [];
  }
  render() {
    return T`<wui-flex>${this.templateVisual()} ${this.templateIcon()}</wui-flex>`;
  }
  templateVisual() {
    this.dataset["size"] = this.size;
    switch (this.type) {
      case "trade":
        return this.swapTemplate();
      case "fiat":
        return this.fiatTemplate();
      case "unknown":
        return this.unknownTemplate();
      default:
        return this.tokenTemplate();
    }
  }
  swapTemplate() {
    const [firstImageUrl, secondImageUrl] = this.images;
    const twoImages = this.images.length === 2 && (firstImageUrl || secondImageUrl);
    if (twoImages) {
      return T`
        <wui-image class="swap-crop-left-image" src=${firstImageUrl} alt="Swap image"></wui-image>
        <wui-image class="swap-crop-right-image" src=${secondImageUrl} alt="Swap image"></wui-image>
      `;
    }
    if (firstImageUrl) {
      return T`<wui-image src=${firstImageUrl} alt="Swap image"></wui-image>`;
    }
    return null;
  }
  fiatTemplate() {
    return T`<wui-icon
      class="fallback-icon"
      size=${ICON_SIZE$1[this.size]}
      name="dollar"
    ></wui-icon>`;
  }
  unknownTemplate() {
    return T`<wui-icon
      class="fallback-icon"
      size=${ICON_SIZE$1[this.size]}
      name="questionMark"
    ></wui-icon>`;
  }
  tokenTemplate() {
    const [imageUrl] = this.images;
    if (imageUrl) {
      return T`<wui-image src=${imageUrl} alt="Token image"></wui-image> `;
    }
    return T`<wui-icon
      class="fallback-icon"
      name=${this.type === "nft" ? "image" : "coinPlaceholder"}
    ></wui-icon>`;
  }
  templateIcon() {
    if (this.statusImageUrl) {
      return T`<wui-image
        class="status-image"
        src=${this.statusImageUrl}
        alt="Status image"
      ></wui-image>`;
    }
    return T`<wui-icon
      class="direction-icon"
      size=${ICON_SIZE$1[this.size]}
      name=${this.getTemplateIcon()}
    ></wui-icon>`;
  }
  getTemplateIcon() {
    if (this.type === "trade") {
      return "arrowClockWise";
    }
    return "arrowBottom";
  }
};
WuiTransactionThumbnail.styles = [styles$N];
__decorate$N([
  n()
], WuiTransactionThumbnail.prototype, "type", void 0);
__decorate$N([
  n()
], WuiTransactionThumbnail.prototype, "size", void 0);
__decorate$N([
  n()
], WuiTransactionThumbnail.prototype, "statusImageUrl", void 0);
__decorate$N([
  n({ type: Array })
], WuiTransactionThumbnail.prototype, "images", void 0);
WuiTransactionThumbnail = __decorate$N([
  customElement("wui-transaction-thumbnail")
], WuiTransactionThumbnail);
const styles$M = css`
  :host > wui-flex:first-child {
    gap: ${({ spacing: spacing2 }) => spacing2[2]};
    padding: ${({ spacing: spacing2 }) => spacing2[3]};
    width: 100%;
  }

  wui-flex {
    display: flex;
    flex: 1;
  }
`;
var __decorate$M = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
let WuiTransactionListItemLoader = class WuiTransactionListItemLoader2 extends i$1 {
  render() {
    return T`
      <wui-flex alignItems="center" .padding=${["1", "2", "1", "2"]}>
        <wui-shimmer width="40px" height="40px" rounded></wui-shimmer>
        <wui-flex flexDirection="column" gap="1">
          <wui-shimmer width="124px" height="16px" rounded></wui-shimmer>
          <wui-shimmer width="60px" height="14px" rounded></wui-shimmer>
        </wui-flex>
        <wui-shimmer width="24px" height="12px" rounded></wui-shimmer>
      </wui-flex>
    `;
  }
};
WuiTransactionListItemLoader.styles = [resetStyles, styles$M];
WuiTransactionListItemLoader = __decorate$M([
  customElement("wui-transaction-list-item-loader")
], WuiTransactionListItemLoader);
const styles$L = css`
  :host {
    width: 100%;
  }

  button {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: ${({ spacing: spacing2 }) => spacing2[4]};
    padding: ${({ spacing: spacing2 }) => spacing2[4]};
    background-color: transparent;
    border-radius: ${({ borderRadius: borderRadius2 }) => borderRadius2[4]};
  }

  wui-text {
    max-width: 174px;
  }

  .tag-container {
    width: fit-content;
  }

  @media (hover: hover) {
    button:hover:enabled {
      background-color: ${({ tokens: tokens2 }) => tokens2.theme.foregroundPrimary};
    }
  }
`;
var __decorate$L = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
let WuiListDescription = class WuiListDescription2 extends i$1 {
  constructor() {
    super(...arguments);
    this.icon = "card";
    this.text = "";
    this.description = "";
    this.tag = void 0;
    this.disabled = false;
  }
  render() {
    return T`
      <button ?disabled=${this.disabled}>
        <wui-flex alignItems="center" gap="3">
          <wui-icon-box padding="2" color="secondary" icon=${this.icon} size="lg"></wui-icon-box>
          <wui-flex flexDirection="column" gap="1">
            <wui-text variant="md-medium" color="primary">${this.text}</wui-text>
            ${this.description ? T`<wui-text variant="md-regular" color="secondary">
                  ${this.description}</wui-text
                >` : null}
          </wui-flex>
        </wui-flex>

        <wui-flex class="tag-container" alignItems="center" gap="1" justifyContent="flex-end">
          ${this.tag ? T`<wui-tag tagType="main" size="sm">${this.tag}</wui-tag>` : null}
          <wui-icon size="md" name="chevronRight" color="default"></wui-icon>
        </wui-flex>
      </button>
    `;
  }
};
WuiListDescription.styles = [resetStyles, elementStyles, styles$L];
__decorate$L([
  n()
], WuiListDescription.prototype, "icon", void 0);
__decorate$L([
  n()
], WuiListDescription.prototype, "text", void 0);
__decorate$L([
  n()
], WuiListDescription.prototype, "description", void 0);
__decorate$L([
  n()
], WuiListDescription.prototype, "tag", void 0);
__decorate$L([
  n({ type: Boolean })
], WuiListDescription.prototype, "disabled", void 0);
WuiListDescription = __decorate$L([
  customElement("wui-list-description")
], WuiListDescription);
const styles$K = css`
  :host {
    width: 100%;
  }

  button {
    padding: ${({ spacing: spacing2 }) => spacing2[3]};
    display: flex;
    gap: ${({ spacing: spacing2 }) => spacing2[3]};
    justify-content: space-between;
    width: 100%;
    border-radius: ${({ borderRadius: borderRadius2 }) => borderRadius2[4]};
    background-color: transparent;
  }

  @media (hover: hover) {
    button:hover:enabled {
      background-color: ${({ tokens: tokens2 }) => tokens2.theme.foregroundSecondary};
    }
  }

  button:focus-visible:enabled {
    background-color: ${({ tokens: tokens2 }) => tokens2.theme.foregroundSecondary};
    box-shadow: 0 0 0 4px ${({ tokens: tokens2 }) => tokens2.core.foregroundAccent040};
  }

  button[data-clickable='false'] {
    pointer-events: none;
    background-color: transparent;
  }

  wui-image,
  wui-icon {
    width: ${({ spacing: spacing2 }) => spacing2[10]};
    height: ${({ spacing: spacing2 }) => spacing2[10]};
  }

  wui-image {
    border-radius: ${({ borderRadius: borderRadius2 }) => borderRadius2[16]};
  }

  .token-name-container {
    flex: 1;
  }
`;
var __decorate$K = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
let WuiListToken = class WuiListToken2 extends i$1 {
  constructor() {
    super(...arguments);
    this.tokenName = "";
    this.tokenImageUrl = "";
    this.tokenValue = 0;
    this.tokenAmount = "0.0";
    this.tokenCurrency = "";
    this.clickable = false;
  }
  render() {
    return T`
      <button data-clickable=${String(this.clickable)}>
        <wui-flex gap="2" alignItems="center">
          ${this.visualTemplate()}
          <wui-flex
            flexDirection="column"
            justifyContent="space-between"
            gap="1"
            class="token-name-container"
          >
            <wui-text variant="md-regular" color="primary" lineClamp="1">
              ${this.tokenName}
            </wui-text>
            <wui-text variant="sm-regular-mono" color="secondary">
              ${NumberUtil.formatNumberToLocalString(this.tokenAmount, 4)} ${this.tokenCurrency}
            </wui-text>
          </wui-flex>
        </wui-flex>
        <wui-flex
          flexDirection="column"
          justifyContent="space-between"
          gap="1"
          alignItems="flex-end"
          width="auto"
        >
          <wui-text variant="md-regular-mono" color="primary"
            >$${this.tokenValue.toFixed(2)}</wui-text
          >
          <wui-text variant="sm-regular-mono" color="secondary">
            ${NumberUtil.formatNumberToLocalString(this.tokenAmount, 4)}
          </wui-text>
        </wui-flex>
      </button>
    `;
  }
  visualTemplate() {
    if (this.tokenName && this.tokenImageUrl) {
      return T`<wui-image alt=${this.tokenName} src=${this.tokenImageUrl}></wui-image>`;
    }
    return T`<wui-icon name="coinPlaceholder" color="default"></wui-icon>`;
  }
};
WuiListToken.styles = [resetStyles, elementStyles, styles$K];
__decorate$K([
  n()
], WuiListToken.prototype, "tokenName", void 0);
__decorate$K([
  n()
], WuiListToken.prototype, "tokenImageUrl", void 0);
__decorate$K([
  n({ type: Number })
], WuiListToken.prototype, "tokenValue", void 0);
__decorate$K([
  n()
], WuiListToken.prototype, "tokenAmount", void 0);
__decorate$K([
  n()
], WuiListToken.prototype, "tokenCurrency", void 0);
__decorate$K([
  n({ type: Boolean })
], WuiListToken.prototype, "clickable", void 0);
WuiListToken = __decorate$K([
  customElement("wui-list-token")
], WuiListToken);
const styles$J = css`
  :host {
    position: relative;
    background-color: ${({ tokens: tokens2 }) => tokens2.theme.foregroundTertiary};
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: inherit;
    border-radius: var(--local-border-radius);
  }

  :host([data-image='true']) {
    background-color: transparent;
  }

  :host > wui-flex {
    overflow: hidden;
    border-radius: inherit;
    border-radius: var(--local-border-radius);
  }

  :host([data-size='sm']) {
    width: 32px;
    height: 32px;
  }

  :host([data-size='md']) {
    width: 40px;
    height: 40px;
  }

  :host([data-size='lg']) {
    width: 56px;
    height: 56px;
  }

  :host([name='Extension'])::after {
    border: 1px solid ${({ colors: colors2 }) => colors2.accent010};
  }

  :host([data-wallet-icon='allWallets'])::after {
    border: 1px solid ${({ colors: colors2 }) => colors2.accent010};
  }

  wui-icon[data-parent-size='inherit'] {
    width: 75%;
    height: 75%;
    align-items: center;
  }

  wui-icon {
    color: ${({ tokens: tokens2 }) => tokens2.theme.iconDefault};
  }

  wui-icon[data-parent-size='sm'] {
    width: 24px;
    height: 24px;
  }

  wui-icon[data-parent-size='md'] {
    width: 32px;
    height: 32px;
  }

  :host > wui-icon-box {
    position: absolute;
    overflow: hidden;
    right: -1px;
    bottom: -2px;
    z-index: 1;
    border: 2px solid ${({ tokens: tokens2 }) => tokens2.theme.backgroundPrimary};
    padding: 1px;
  }
`;
var __decorate$J = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
let WuiWalletImage = class WuiWalletImage2 extends i$1 {
  constructor() {
    super(...arguments);
    this.size = "md";
    this.name = "";
    this.installed = false;
    this.badgeSize = "xs";
  }
  render() {
    let borderRadius2 = "1";
    if (this.size === "lg") {
      borderRadius2 = "4";
    } else if (this.size === "md") {
      borderRadius2 = "2";
    } else if (this.size === "sm") {
      borderRadius2 = "1";
    }
    this.style.cssText = `
       --local-border-radius: var(--apkt-borderRadius-${borderRadius2});
   `;
    this.dataset["size"] = this.size;
    if (this.imageSrc) {
      this.dataset["image"] = "true";
    }
    if (this.walletIcon) {
      this.dataset["walletIcon"] = this.walletIcon;
    }
    return T`
      <wui-flex justifyContent="center" alignItems="center"> ${this.templateVisual()} </wui-flex>
    `;
  }
  templateVisual() {
    if (this.imageSrc) {
      return T`<wui-image src=${this.imageSrc} alt=${this.name}></wui-image>`;
    } else if (this.walletIcon) {
      return T`<wui-icon size="md" color="default" name=${this.walletIcon}></wui-icon>`;
    }
    return T`<wui-icon
      data-parent-size=${this.size}
      size="inherit"
      color="inherit"
      name="wallet"
    ></wui-icon>`;
  }
};
WuiWalletImage.styles = [resetStyles, styles$J];
__decorate$J([
  n()
], WuiWalletImage.prototype, "size", void 0);
__decorate$J([
  n()
], WuiWalletImage.prototype, "name", void 0);
__decorate$J([
  n()
], WuiWalletImage.prototype, "imageSrc", void 0);
__decorate$J([
  n()
], WuiWalletImage.prototype, "walletIcon", void 0);
__decorate$J([
  n({ type: Boolean })
], WuiWalletImage.prototype, "installed", void 0);
__decorate$J([
  n()
], WuiWalletImage.prototype, "badgeSize", void 0);
WuiWalletImage = __decorate$J([
  customElement("wui-wallet-image")
], WuiWalletImage);
const styles$I = css`
  wui-image {
    width: 24px;
    height: 24px;
    border-radius: ${({ borderRadius: borderRadius2 }) => borderRadius2[2]};
  }

  wui-image,
  .icon-box {
    width: 32px;
    height: 32px;
    border-radius: ${({ borderRadius: borderRadius2 }) => borderRadius2[2]};
  }

  wui-icon:not(.custom-icon, .icon-badge) {
    cursor: pointer;
  }

  .icon-box {
    position: relative;
    border-radius: ${({ borderRadius: borderRadius2 }) => borderRadius2[2]};
    background-color: ${({ tokens: tokens2 }) => tokens2.theme.foregroundSecondary};
  }

  .icon-badge {
    position: absolute;
    top: 18px;
    left: 23px;
    z-index: 3;
    background-color: ${({ tokens: tokens2 }) => tokens2.theme.foregroundPrimary};
    border: 2px solid ${({ tokens: tokens2 }) => tokens2.theme.backgroundPrimary};
    border-radius: 50%;
    padding: ${({ spacing: spacing2 }) => spacing2["01"]};
  }

  .icon-badge {
    width: 8px;
    height: 8px;
  }
`;
var __decorate$I = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
let WuiActiveProfileWalletItem = class WuiActiveProfileWalletItem2 extends i$1 {
  constructor() {
    super(...arguments);
    this.address = "";
    this.profileName = "";
    this.content = [];
    this.alt = "";
    this.imageSrc = "";
    this.icon = void 0;
    this.iconSize = "md";
    this.iconBadge = void 0;
    this.iconBadgeSize = "md";
    this.buttonVariant = "neutral-primary";
    this.enableMoreButton = false;
    this.charsStart = 4;
    this.charsEnd = 6;
  }
  render() {
    return T`
      <wui-flex flexDirection="column" rowgap="2">
        ${this.topTemplate()} ${this.bottomTemplate()}
      </wui-flex>
    `;
  }
  topTemplate() {
    return T`
      <wui-flex alignItems="flex-start" justifyContent="space-between">
        ${this.imageOrIconTemplate()}
        <wui-icon-link
          variant="secondary"
          size="md"
          icon="copy"
          @click=${this.dispatchCopyEvent}
        ></wui-icon-link>
        <wui-icon-link
          variant="secondary"
          size="md"
          icon="externalLink"
          @click=${this.dispatchExternalLinkEvent}
        ></wui-icon-link>
        ${this.enableMoreButton ? T`<wui-icon-link
              variant="secondary"
              size="md"
              icon="threeDots"
              @click=${this.dispatchMoreButtonEvent}
              data-testid="wui-active-profile-wallet-item-more-button"
            ></wui-icon-link>` : null}
      </wui-flex>
    `;
  }
  bottomTemplate() {
    return T` <wui-flex flexDirection="column">${this.contentTemplate()}</wui-flex> `;
  }
  imageOrIconTemplate() {
    if (this.icon) {
      return T`
        <wui-flex flexGrow="1" alignItems="center">
          <wui-flex alignItems="center" justifyContent="center" class="icon-box">
            <wui-icon size="lg" color="default" name=${this.icon} class="custom-icon"></wui-icon>

            ${this.iconBadge ? T`<wui-icon
                  color="accent-primary"
                  size="inherit"
                  name=${this.iconBadge}
                  class="icon-badge"
                ></wui-icon>` : null}
          </wui-flex>
        </wui-flex>
      `;
    }
    return T`
      <wui-flex flexGrow="1" alignItems="center">
        <wui-image objectFit="contain" src=${this.imageSrc} alt=${this.alt}></wui-image>
      </wui-flex>
    `;
  }
  contentTemplate() {
    if (this.content.length === 0) {
      return null;
    }
    return T`
      <wui-flex flexDirection="column" rowgap="3">
        ${this.content.map((item) => this.labelAndTagTemplate(item))}
      </wui-flex>
    `;
  }
  labelAndTagTemplate({ address, profileName, label, description, enableButton, buttonType, buttonLabel, buttonVariant, tagVariant, tagLabel, alignItems = "flex-end" }) {
    return T`
      <wui-flex justifyContent="space-between" alignItems=${alignItems} columngap="1">
        <wui-flex flexDirection="column" rowgap="01">
          ${label ? T`<wui-text variant="sm-medium" color="secondary">${label}</wui-text>` : null}

          <wui-flex alignItems="center" columngap="1">
            <wui-text variant="md-regular" color="primary">
              ${UiHelperUtil.getTruncateString({
      string: profileName || address,
      charsStart: profileName ? 16 : this.charsStart,
      charsEnd: profileName ? 0 : this.charsEnd,
      truncate: profileName ? "end" : "middle"
    })}
            </wui-text>

            ${tagVariant && tagLabel ? T`<wui-tag variant=${tagVariant} size="sm">${tagLabel}</wui-tag>` : null}
          </wui-flex>

          ${description ? T`<wui-text variant="sm-regular" color="secondary">${description}</wui-text>` : null}
        </wui-flex>

        ${enableButton ? this.buttonTemplate({ buttonType, buttonLabel, buttonVariant }) : null}
      </wui-flex>
    `;
  }
  buttonTemplate({ buttonType, buttonLabel, buttonVariant }) {
    return T`
      <wui-button
        size="sm"
        variant=${buttonVariant}
        @click=${buttonType === "disconnect" ? this.dispatchDisconnectEvent.bind(this) : this.dispatchSwitchEvent.bind(this)}
        data-testid=${buttonType === "disconnect" ? "wui-active-profile-wallet-item-disconnect-button" : "wui-active-profile-wallet-item-switch-button"}
      >
        ${buttonLabel}
      </wui-button>
    `;
  }
  dispatchDisconnectEvent() {
    this.dispatchEvent(new CustomEvent("disconnect", { bubbles: true, composed: true }));
  }
  dispatchSwitchEvent() {
    this.dispatchEvent(new CustomEvent("switch", { bubbles: true, composed: true }));
  }
  dispatchExternalLinkEvent() {
    this.dispatchEvent(new CustomEvent("externalLink", { bubbles: true, composed: true }));
  }
  dispatchMoreButtonEvent() {
    this.dispatchEvent(new CustomEvent("more", { bubbles: true, composed: true }));
  }
  dispatchCopyEvent() {
    this.dispatchEvent(new CustomEvent("copy", { bubbles: true, composed: true }));
  }
};
WuiActiveProfileWalletItem.styles = [resetStyles, elementStyles, styles$I];
__decorate$I([
  n()
], WuiActiveProfileWalletItem.prototype, "address", void 0);
__decorate$I([
  n()
], WuiActiveProfileWalletItem.prototype, "profileName", void 0);
__decorate$I([
  n({ type: Array })
], WuiActiveProfileWalletItem.prototype, "content", void 0);
__decorate$I([
  n()
], WuiActiveProfileWalletItem.prototype, "alt", void 0);
__decorate$I([
  n()
], WuiActiveProfileWalletItem.prototype, "imageSrc", void 0);
__decorate$I([
  n()
], WuiActiveProfileWalletItem.prototype, "icon", void 0);
__decorate$I([
  n()
], WuiActiveProfileWalletItem.prototype, "iconSize", void 0);
__decorate$I([
  n()
], WuiActiveProfileWalletItem.prototype, "iconBadge", void 0);
__decorate$I([
  n()
], WuiActiveProfileWalletItem.prototype, "iconBadgeSize", void 0);
__decorate$I([
  n()
], WuiActiveProfileWalletItem.prototype, "buttonVariant", void 0);
__decorate$I([
  n({ type: Boolean })
], WuiActiveProfileWalletItem.prototype, "enableMoreButton", void 0);
__decorate$I([
  n({ type: Number })
], WuiActiveProfileWalletItem.prototype, "charsStart", void 0);
__decorate$I([
  n({ type: Number })
], WuiActiveProfileWalletItem.prototype, "charsEnd", void 0);
WuiActiveProfileWalletItem = __decorate$I([
  customElement("wui-active-profile-wallet-item")
], WuiActiveProfileWalletItem);
const styles$H = css`
  wui-image,
  .icon-box {
    width: 32px;
    height: 32px;
    border-radius: ${({ borderRadius: borderRadius2 }) => borderRadius2[2]};
  }

  .right-icon {
    cursor: pointer;
  }

  .icon-box {
    position: relative;
    background-color: ${({ tokens: tokens2 }) => tokens2.theme.foregroundPrimary};
  }

  .icon-badge {
    position: absolute;
    top: 18px;
    left: 23px;
    z-index: 3;
    background-color: ${({ tokens: tokens2 }) => tokens2.theme.foregroundPrimary};
    border: 2px solid ${({ tokens: tokens2 }) => tokens2.theme.backgroundPrimary};
    border-radius: 50%;
    padding: ${({ spacing: spacing2 }) => spacing2["01"]};
  }

  .icon-badge {
    width: 8px;
    height: 8px;
  }
`;
var __decorate$H = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
let WuiInactiveProfileWalletItem = class WuiInactiveProfileWalletItem2 extends i$1 {
  constructor() {
    super(...arguments);
    this.address = "";
    this.profileName = "";
    this.alt = "";
    this.buttonLabel = "";
    this.buttonVariant = "accent-primary";
    this.imageSrc = "";
    this.icon = void 0;
    this.iconSize = "md";
    this.iconBadgeSize = "md";
    this.rightIcon = "signOut";
    this.rightIconSize = "md";
    this.loading = false;
    this.charsStart = 4;
    this.charsEnd = 6;
  }
  render() {
    return T`
      <wui-flex alignItems="center" columngap="2">
        ${this.imageOrIconTemplate()} ${this.labelAndDescriptionTemplate()}
        ${this.buttonActionTemplate()}
      </wui-flex>
    `;
  }
  imageOrIconTemplate() {
    if (this.icon) {
      return T`
        <wui-flex alignItems="center" justifyContent="center" class="icon-box">
          <wui-flex alignItems="center" justifyContent="center" class="icon-box">
            <wui-icon size="lg" color="default" name=${this.icon} class="custom-icon"></wui-icon>

            ${this.iconBadge ? T`<wui-icon
                  color="default"
                  size="inherit"
                  name=${this.iconBadge}
                  class="icon-badge"
                ></wui-icon>` : null}
          </wui-flex>
        </wui-flex>
      `;
    }
    return T`<wui-image objectFit="contain" src=${this.imageSrc} alt=${this.alt}></wui-image>`;
  }
  labelAndDescriptionTemplate() {
    return T`
      <wui-flex
        flexDirection="column"
        flexGrow="1"
        justifyContent="flex-start"
        alignItems="flex-start"
      >
        <wui-text variant="lg-regular" color="primary">
          ${UiHelperUtil.getTruncateString({
      string: this.profileName || this.address,
      charsStart: this.profileName ? 16 : this.charsStart,
      charsEnd: this.profileName ? 0 : this.charsEnd,
      truncate: this.profileName ? "end" : "middle"
    })}
        </wui-text>
      </wui-flex>
    `;
  }
  buttonActionTemplate() {
    return T`
      <wui-flex columngap="1" alignItems="center" justifyContent="center">
        <wui-button
          size="sm"
          variant=${this.buttonVariant}
          .loading=${this.loading}
          @click=${this.handleButtonClick}
          data-testid="wui-inactive-profile-wallet-item-button"
        >
          ${this.buttonLabel}
        </wui-button>

        <wui-icon-link
          variant="secondary"
          size="md"
          icon=${o(this.rightIcon)}
          class="right-icon"
          @click=${this.handleIconClick}
        ></wui-icon-link>
      </wui-flex>
    `;
  }
  handleButtonClick() {
    this.dispatchEvent(new CustomEvent("buttonClick", { bubbles: true, composed: true }));
  }
  handleIconClick() {
    this.dispatchEvent(new CustomEvent("iconClick", { bubbles: true, composed: true }));
  }
};
WuiInactiveProfileWalletItem.styles = [resetStyles, elementStyles, styles$H];
__decorate$H([
  n()
], WuiInactiveProfileWalletItem.prototype, "address", void 0);
__decorate$H([
  n()
], WuiInactiveProfileWalletItem.prototype, "profileName", void 0);
__decorate$H([
  n()
], WuiInactiveProfileWalletItem.prototype, "alt", void 0);
__decorate$H([
  n()
], WuiInactiveProfileWalletItem.prototype, "buttonLabel", void 0);
__decorate$H([
  n()
], WuiInactiveProfileWalletItem.prototype, "buttonVariant", void 0);
__decorate$H([
  n()
], WuiInactiveProfileWalletItem.prototype, "imageSrc", void 0);
__decorate$H([
  n()
], WuiInactiveProfileWalletItem.prototype, "icon", void 0);
__decorate$H([
  n()
], WuiInactiveProfileWalletItem.prototype, "iconSize", void 0);
__decorate$H([
  n()
], WuiInactiveProfileWalletItem.prototype, "iconBadge", void 0);
__decorate$H([
  n()
], WuiInactiveProfileWalletItem.prototype, "iconBadgeSize", void 0);
__decorate$H([
  n()
], WuiInactiveProfileWalletItem.prototype, "rightIcon", void 0);
__decorate$H([
  n()
], WuiInactiveProfileWalletItem.prototype, "rightIconSize", void 0);
__decorate$H([
  n({ type: Boolean })
], WuiInactiveProfileWalletItem.prototype, "loading", void 0);
__decorate$H([
  n({ type: Number })
], WuiInactiveProfileWalletItem.prototype, "charsStart", void 0);
__decorate$H([
  n({ type: Number })
], WuiInactiveProfileWalletItem.prototype, "charsEnd", void 0);
WuiInactiveProfileWalletItem = __decorate$H([
  customElement("wui-inactive-profile-wallet-item")
], WuiInactiveProfileWalletItem);
const styles$G = css`
  :host {
    position: relative;
    display: flex;
    width: 100%;
    height: 1px;
    background-color: ${({ tokens: tokens2 }) => tokens2.theme.borderPrimary};
    justify-content: center;
    align-items: center;
  }

  :host > wui-text {
    position: absolute;
    padding: 0px 8px;
    transition: background-color ${({ durations: durations2 }) => durations2["lg"]}
      ${({ easings: easings2 }) => easings2["ease-out-power-2"]};
    will-change: background-color;
  }

  :host([data-bg-color='primary']) > wui-text {
    background-color: ${({ tokens: tokens2 }) => tokens2.theme.backgroundPrimary};
  }

  :host([data-bg-color='secondary']) > wui-text {
    background-color: ${({ tokens: tokens2 }) => tokens2.theme.foregroundPrimary};
  }
`;
var __decorate$G = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
let WuiSeparator = class WuiSeparator2 extends i$1 {
  constructor() {
    super(...arguments);
    this.text = "";
    this.bgColor = "primary";
  }
  render() {
    this.dataset["bgColor"] = this.bgColor;
    return T`${this.template()}`;
  }
  template() {
    if (this.text) {
      return T`<wui-text variant="md-regular" color="secondary">${this.text}</wui-text>`;
    }
    return null;
  }
};
WuiSeparator.styles = [resetStyles, styles$G];
__decorate$G([
  n()
], WuiSeparator.prototype, "text", void 0);
__decorate$G([
  n()
], WuiSeparator.prototype, "bgColor", void 0);
WuiSeparator = __decorate$G([
  customElement("wui-separator")
], WuiSeparator);
const styles$F = css`
  :host {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  label {
    position: relative;
    display: inline-block;
    user-select: none;
    transition:
      background-color ${({ durations: durations2 }) => durations2["lg"]}
        ${({ easings: easings2 }) => easings2["ease-out-power-2"]},
      color ${({ durations: durations2 }) => durations2["lg"]} ${({ easings: easings2 }) => easings2["ease-out-power-2"]},
      border ${({ durations: durations2 }) => durations2["lg"]} ${({ easings: easings2 }) => easings2["ease-out-power-2"]},
      box-shadow ${({ durations: durations2 }) => durations2["lg"]}
        ${({ easings: easings2 }) => easings2["ease-out-power-2"]},
      width ${({ durations: durations2 }) => durations2["lg"]} ${({ easings: easings2 }) => easings2["ease-out-power-2"]},
      height ${({ durations: durations2 }) => durations2["lg"]} ${({ easings: easings2 }) => easings2["ease-out-power-2"]},
      transform ${({ durations: durations2 }) => durations2["lg"]}
        ${({ easings: easings2 }) => easings2["ease-out-power-2"]},
      opacity ${({ durations: durations2 }) => durations2["lg"]} ${({ easings: easings2 }) => easings2["ease-out-power-2"]};
    will-change: background-color, color, border, box-shadow, width, height, transform, opacity;
  }

  input {
    width: 0;
    height: 0;
    opacity: 0;
  }

  span {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: ${({ colors: colors2 }) => colors2.neutrals300};
    border-radius: ${({ borderRadius: borderRadius2 }) => borderRadius2.round};
    border: 1px solid transparent;
    will-change: border;
    transition:
      background-color ${({ durations: durations2 }) => durations2["lg"]}
        ${({ easings: easings2 }) => easings2["ease-out-power-2"]},
      color ${({ durations: durations2 }) => durations2["lg"]} ${({ easings: easings2 }) => easings2["ease-out-power-2"]},
      border ${({ durations: durations2 }) => durations2["lg"]} ${({ easings: easings2 }) => easings2["ease-out-power-2"]},
      box-shadow ${({ durations: durations2 }) => durations2["lg"]}
        ${({ easings: easings2 }) => easings2["ease-out-power-2"]},
      width ${({ durations: durations2 }) => durations2["lg"]} ${({ easings: easings2 }) => easings2["ease-out-power-2"]},
      height ${({ durations: durations2 }) => durations2["lg"]} ${({ easings: easings2 }) => easings2["ease-out-power-2"]},
      transform ${({ durations: durations2 }) => durations2["lg"]}
        ${({ easings: easings2 }) => easings2["ease-out-power-2"]},
      opacity ${({ durations: durations2 }) => durations2["lg"]} ${({ easings: easings2 }) => easings2["ease-out-power-2"]};
    will-change: background-color, color, border, box-shadow, width, height, transform, opacity;
  }

  span:before {
    content: '';
    position: absolute;
    background-color: ${({ colors: colors2 }) => colors2.white};
    border-radius: 50%;
  }

  /* -- Sizes --------------------------------------------------------- */
  label[data-size='lg'] {
    width: 48px;
    height: 32px;
  }

  label[data-size='md'] {
    width: 40px;
    height: 28px;
  }

  label[data-size='sm'] {
    width: 32px;
    height: 22px;
  }

  label[data-size='lg'] > span:before {
    height: 24px;
    width: 24px;
    left: 4px;
    top: 3px;
  }

  label[data-size='md'] > span:before {
    height: 20px;
    width: 20px;
    left: 4px;
    top: 3px;
  }

  label[data-size='sm'] > span:before {
    height: 16px;
    width: 16px;
    left: 3px;
    top: 2px;
  }

  /* -- Focus states --------------------------------------------------- */
  input:focus-visible:not(:checked) + span,
  input:focus:not(:checked) + span {
    border: 1px solid ${({ tokens: tokens2 }) => tokens2.core.iconAccentPrimary};
    background-color: ${({ tokens: tokens2 }) => tokens2.theme.textTertiary};
    box-shadow: 0px 0px 0px 4px rgba(9, 136, 240, 0.2);
  }

  input:focus-visible:checked + span,
  input:focus:checked + span {
    border: 1px solid ${({ tokens: tokens2 }) => tokens2.core.iconAccentPrimary};
    box-shadow: 0px 0px 0px 4px rgba(9, 136, 240, 0.2);
  }

  /* -- Checked states --------------------------------------------------- */
  input:checked + span {
    background-color: ${({ tokens: tokens2 }) => tokens2.core.iconAccentPrimary};
  }

  label[data-size='lg'] > input:checked + span:before {
    transform: translateX(calc(100% - 9px));
  }

  label[data-size='md'] > input:checked + span:before {
    transform: translateX(calc(100% - 9px));
  }

  label[data-size='sm'] > input:checked + span:before {
    transform: translateX(calc(100% - 7px));
  }

  /* -- Hover states ------------------------------------------------------- */
  label:hover > input:not(:checked):not(:disabled) + span {
    background-color: ${({ colors: colors2 }) => colors2.neutrals400};
  }

  label:hover > input:checked:not(:disabled) + span {
    background-color: ${({ colors: colors2 }) => colors2.accent080};
  }

  /* -- Disabled state --------------------------------------------------- */
  label:has(input:disabled) {
    pointer-events: none;
    user-select: none;
  }

  input:not(:checked):disabled + span {
    background-color: ${({ colors: colors2 }) => colors2.neutrals700};
  }

  input:checked:disabled + span {
    background-color: ${({ colors: colors2 }) => colors2.neutrals700};
  }

  input:not(:checked):disabled + span::before {
    background-color: ${({ colors: colors2 }) => colors2.neutrals400};
  }

  input:checked:disabled + span::before {
    background-color: ${({ tokens: tokens2 }) => tokens2.theme.textTertiary};
  }
`;
var __decorate$F = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
let WuiToggle = class WuiToggle2 extends i$1 {
  constructor() {
    super(...arguments);
    this.inputElementRef = e$1();
    this.checked = false;
    this.disabled = false;
    this.size = "md";
  }
  render() {
    return T`
      <label data-size=${this.size}>
        <input
          ${n$1(this.inputElementRef)}
          type="checkbox"
          ?checked=${this.checked}
          ?disabled=${this.disabled}
          @change=${this.dispatchChangeEvent.bind(this)}
        />
        <span></span>
      </label>
    `;
  }
  dispatchChangeEvent() {
    this.dispatchEvent(new CustomEvent("switchChange", {
      detail: this.inputElementRef.value?.checked,
      bubbles: true,
      composed: true
    }));
  }
};
WuiToggle.styles = [resetStyles, elementStyles, styles$F];
__decorate$F([
  n({ type: Boolean })
], WuiToggle.prototype, "checked", void 0);
__decorate$F([
  n({ type: Boolean })
], WuiToggle.prototype, "disabled", void 0);
__decorate$F([
  n()
], WuiToggle.prototype, "size", void 0);
WuiToggle = __decorate$F([
  customElement("wui-toggle")
], WuiToggle);
const styles$E = css`
  :host {
    height: auto;
  }

  :host > wui-flex {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    column-gap: ${({ spacing: spacing2 }) => spacing2["2"]};
    padding: ${({ spacing: spacing2 }) => spacing2["2"]} ${({ spacing: spacing2 }) => spacing2["3"]};
    background-color: ${({ tokens: tokens2 }) => tokens2.theme.foregroundPrimary};
    border-radius: ${({ borderRadius: borderRadius2 }) => borderRadius2["4"]};
    box-shadow: inset 0 0 0 1px ${({ tokens: tokens2 }) => tokens2.theme.foregroundPrimary};
    transition: background-color ${({ durations: durations2 }) => durations2["lg"]}
      ${({ easings: easings2 }) => easings2["ease-out-power-2"]};
    will-change: background-color;
    cursor: pointer;
  }

  wui-switch {
    pointer-events: none;
  }
`;
var __decorate$E = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
let WuiCertifiedSwitch = class WuiCertifiedSwitch2 extends i$1 {
  constructor() {
    super(...arguments);
    this.checked = false;
  }
  render() {
    return T`
      <wui-flex>
        <wui-icon size="xl" name="walletConnectBrown"></wui-icon>
        <wui-toggle
          ?checked=${this.checked}
          size="sm"
          @switchChange=${this.handleToggleChange.bind(this)}
        ></wui-toggle>
      </wui-flex>
    `;
  }
  handleToggleChange(event) {
    event.stopPropagation();
    this.checked = event.detail;
    this.dispatchSwitchEvent();
  }
  dispatchSwitchEvent() {
    this.dispatchEvent(new CustomEvent("certifiedSwitchChange", {
      detail: this.checked,
      bubbles: true,
      composed: true
    }));
  }
};
WuiCertifiedSwitch.styles = [resetStyles, elementStyles, styles$E];
__decorate$E([
  n({ type: Boolean })
], WuiCertifiedSwitch.prototype, "checked", void 0);
WuiCertifiedSwitch = __decorate$E([
  customElement("wui-certified-switch")
], WuiCertifiedSwitch);
const styles$D = css`
  :host {
    position: relative;
    width: 100%;
    display: inline-flex;
    flex-direction: column;
    gap: ${({ spacing: spacing2 }) => spacing2[3]};
    color: ${({ tokens: tokens2 }) => tokens2.theme.textPrimary};
    caret-color: ${({ tokens: tokens2 }) => tokens2.core.textAccentPrimary};
  }

  .wui-input-text-container {
    position: relative;
    display: flex;
  }

  input {
    width: 100%;
    border-radius: ${({ borderRadius: borderRadius2 }) => borderRadius2[4]};
    color: inherit;
    background: transparent;
    border: 1px solid ${({ tokens: tokens2 }) => tokens2.theme.borderPrimary};
    caret-color: ${({ tokens: tokens2 }) => tokens2.core.textAccentPrimary};
    padding: ${({ spacing: spacing2 }) => spacing2[3]} ${({ spacing: spacing2 }) => spacing2[3]}
      ${({ spacing: spacing2 }) => spacing2[3]} ${({ spacing: spacing2 }) => spacing2[10]};
    font-size: ${({ textSize: textSize2 }) => textSize2.large};
    line-height: ${({ typography: typography2 }) => typography2["lg-regular"].lineHeight};
    letter-spacing: ${({ typography: typography2 }) => typography2["lg-regular"].letterSpacing};
    font-weight: ${({ fontWeight: fontWeight2 }) => fontWeight2.regular};
    font-family: ${({ fontFamily: fontFamily2 }) => fontFamily2.regular};
  }

  input[data-size='lg'] {
    padding: ${({ spacing: spacing2 }) => spacing2[4]} ${({ spacing: spacing2 }) => spacing2[3]}
      ${({ spacing: spacing2 }) => spacing2[4]} ${({ spacing: spacing2 }) => spacing2[10]};
  }

  @media (hover: hover) and (pointer: fine) {
    input:hover:enabled {
      border: 1px solid ${({ tokens: tokens2 }) => tokens2.theme.borderSecondary};
    }
  }

  input:disabled {
    cursor: unset;
    border: 1px solid ${({ tokens: tokens2 }) => tokens2.theme.borderPrimary};
  }

  input::placeholder {
    color: ${({ tokens: tokens2 }) => tokens2.theme.textSecondary};
  }

  input:focus:enabled {
    border: 1px solid ${({ tokens: tokens2 }) => tokens2.theme.borderSecondary};
    background-color: ${({ tokens: tokens2 }) => tokens2.theme.foregroundPrimary};
    -webkit-box-shadow: 0px 0px 0px 4px ${({ tokens: tokens2 }) => tokens2.core.foregroundAccent040};
    -moz-box-shadow: 0px 0px 0px 4px ${({ tokens: tokens2 }) => tokens2.core.foregroundAccent040};
    box-shadow: 0px 0px 0px 4px ${({ tokens: tokens2 }) => tokens2.core.foregroundAccent040};
  }

  div.wui-input-text-container:has(input:disabled) {
    opacity: 0.5;
  }

  wui-icon.wui-input-text-left-icon {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none;
    left: ${({ spacing: spacing2 }) => spacing2[4]};
    color: ${({ tokens: tokens2 }) => tokens2.theme.iconDefault};
  }

  button.wui-input-text-submit-button {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: ${({ spacing: spacing2 }) => spacing2[3]};
    width: 24px;
    height: 24px;
    border: none;
    background: transparent;
    border-radius: ${({ borderRadius: borderRadius2 }) => borderRadius2[2]};
    color: ${({ tokens: tokens2 }) => tokens2.core.textAccentPrimary};
  }

  button.wui-input-text-submit-button:disabled {
    opacity: 1;
  }

  button.wui-input-text-submit-button.loading wui-icon {
    animation: spin 1s linear infinite;
  }

  button.wui-input-text-submit-button:hover {
    background: ${({ tokens: tokens2 }) => tokens2.core.foregroundAccent010};
  }

  input:has(+ .wui-input-text-submit-button) {
    padding-right: ${({ spacing: spacing2 }) => spacing2[12]};
  }

  input[type='number'] {
    -moz-appearance: textfield;
  }

  input[type='search']::-webkit-search-decoration,
  input[type='search']::-webkit-search-cancel-button,
  input[type='search']::-webkit-search-results-button,
  input[type='search']::-webkit-search-results-decoration {
    -webkit-appearance: none;
  }

  /* -- Keyframes --------------------------------------------------- */
  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;
var __decorate$D = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
let WuiInputText = class WuiInputText2 extends i$1 {
  constructor() {
    super(...arguments);
    this.inputElementRef = e$1();
    this.disabled = false;
    this.loading = false;
    this.placeholder = "";
    this.type = "text";
    this.value = "";
    this.size = "md";
  }
  render() {
    return T` <div class="wui-input-text-container">
        ${this.templateLeftIcon()}
        <input
          data-size=${this.size}
          ${n$1(this.inputElementRef)}
          data-testid="wui-input-text"
          type=${this.type}
          enterkeyhint=${o(this.enterKeyHint)}
          ?disabled=${this.disabled}
          placeholder=${this.placeholder}
          @input=${this.dispatchInputChangeEvent.bind(this)}
          @keydown=${this.onKeyDown}
          .value=${this.value || ""}
        />
        ${this.templateSubmitButton()}
        <slot class="wui-input-text-slot"></slot>
      </div>
      ${this.templateError()} ${this.templateWarning()}`;
  }
  templateLeftIcon() {
    if (this.icon) {
      return T`<wui-icon
        class="wui-input-text-left-icon"
        size="md"
        data-size=${this.size}
        color="inherit"
        name=${this.icon}
      ></wui-icon>`;
    }
    return null;
  }
  templateSubmitButton() {
    if (this.onSubmit) {
      return T`<button
        class="wui-input-text-submit-button ${this.loading ? "loading" : ""}"
        @click=${this.onSubmit?.bind(this)}
        ?disabled=${this.disabled || this.loading}
      >
        ${this.loading ? T`<wui-icon name="spinner" size="md"></wui-icon>` : T`<wui-icon name="chevronRight" size="md"></wui-icon>`}
      </button>`;
    }
    return null;
  }
  templateError() {
    if (this.errorText) {
      return T`<wui-text variant="sm-regular" color="error">${this.errorText}</wui-text>`;
    }
    return null;
  }
  templateWarning() {
    if (this.warningText) {
      return T`<wui-text variant="sm-regular" color="warning">${this.warningText}</wui-text>`;
    }
    return null;
  }
  dispatchInputChangeEvent() {
    this.dispatchEvent(new CustomEvent("inputChange", {
      detail: this.inputElementRef.value?.value,
      bubbles: true,
      composed: true
    }));
  }
};
WuiInputText.styles = [resetStyles, elementStyles, styles$D];
__decorate$D([
  n()
], WuiInputText.prototype, "icon", void 0);
__decorate$D([
  n({ type: Boolean })
], WuiInputText.prototype, "disabled", void 0);
__decorate$D([
  n({ type: Boolean })
], WuiInputText.prototype, "loading", void 0);
__decorate$D([
  n()
], WuiInputText.prototype, "placeholder", void 0);
__decorate$D([
  n()
], WuiInputText.prototype, "type", void 0);
__decorate$D([
  n()
], WuiInputText.prototype, "value", void 0);
__decorate$D([
  n()
], WuiInputText.prototype, "errorText", void 0);
__decorate$D([
  n()
], WuiInputText.prototype, "warningText", void 0);
__decorate$D([
  n()
], WuiInputText.prototype, "onSubmit", void 0);
__decorate$D([
  n()
], WuiInputText.prototype, "size", void 0);
__decorate$D([
  n({ attribute: false })
], WuiInputText.prototype, "onKeyDown", void 0);
WuiInputText = __decorate$D([
  customElement("wui-input-text")
], WuiInputText);
const styles$C = css`
  :host {
    position: relative;
    display: inline-block;
    width: 100%;
  }

  wui-icon {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: ${({ spacing: spacing2 }) => spacing2[3]};
    color: ${({ tokens: tokens2 }) => tokens2.theme.iconDefault};
    cursor: pointer;
    padding: ${({ spacing: spacing2 }) => spacing2[2]};
    background-color: transparent;
    border-radius: ${({ borderRadius: borderRadius2 }) => borderRadius2[4]};
    transition: background-color ${({ durations: durations2 }) => durations2["lg"]}
      ${({ easings: easings2 }) => easings2["ease-out-power-2"]};
  }

  @media (hover: hover) {
    wui-icon:hover {
      background-color: ${({ tokens: tokens2 }) => tokens2.theme.foregroundSecondary};
    }
  }
`;
var __decorate$C = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
let WuiSearchBar = class WuiSearchBar2 extends i$1 {
  constructor() {
    super(...arguments);
    this.inputComponentRef = e$1();
    this.inputValue = "";
  }
  render() {
    return T`
      <wui-input-text
        ${n$1(this.inputComponentRef)}
        placeholder="Search wallet"
        icon="search"
        type="search"
        enterKeyHint="search"
        size="sm"
        @inputChange=${this.onInputChange}
      >
        ${this.inputValue ? T`<wui-icon
              @click=${this.clearValue}
              color="inherit"
              size="sm"
              name="close"
            ></wui-icon>` : null}
      </wui-input-text>
    `;
  }
  onInputChange(event) {
    this.inputValue = event.detail || "";
  }
  clearValue() {
    const component = this.inputComponentRef.value;
    const inputElement = component?.inputElementRef.value;
    if (inputElement) {
      inputElement.value = "";
      this.inputValue = "";
      inputElement.focus();
      inputElement.dispatchEvent(new Event("input"));
    }
  }
};
WuiSearchBar.styles = [resetStyles, styles$C];
__decorate$C([
  n()
], WuiSearchBar.prototype, "inputValue", void 0);
WuiSearchBar = __decorate$C([
  customElement("wui-search-bar")
], WuiSearchBar);
const networkSvgMd = b`<svg  viewBox="0 0 48 54" fill="none">
  <path
    d="M43.4605 10.7248L28.0485 1.61089C25.5438 0.129705 22.4562 0.129705 19.9515 1.61088L4.53951 10.7248C2.03626 12.2051 0.5 14.9365 0.5 17.886V36.1139C0.5 39.0635 2.03626 41.7949 4.53951 43.2752L19.9515 52.3891C22.4562 53.8703 25.5438 53.8703 28.0485 52.3891L43.4605 43.2752C45.9637 41.7949 47.5 39.0635 47.5 36.114V17.8861C47.5 14.9365 45.9637 12.2051 43.4605 10.7248Z"
  />
</svg>`;
const styles$B = css`
  :host {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 104px;
    width: 104px;
    row-gap: ${({ spacing: spacing2 }) => spacing2[2]};
    background-color: ${({ tokens: tokens2 }) => tokens2.theme.foregroundPrimary};
    border-radius: ${({ borderRadius: borderRadius2 }) => borderRadius2[5]};
    position: relative;
  }

  wui-shimmer[data-type='network'] {
    border: none;
    -webkit-clip-path: var(--apkt-path-network);
    clip-path: var(--apkt-path-network);
  }

  svg {
    position: absolute;
    width: 48px;
    height: 54px;
    z-index: 1;
  }

  svg > path {
    stroke: ${({ tokens: tokens2 }) => tokens2.theme.foregroundSecondary};
    stroke-width: 1px;
  }

  @media (max-width: 350px) {
    :host {
      width: 100%;
    }
  }
`;
var __decorate$B = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
let WuiCardSelectLoader = class WuiCardSelectLoader2 extends i$1 {
  constructor() {
    super(...arguments);
    this.type = "wallet";
  }
  render() {
    return T`
      ${this.shimmerTemplate()}
      <wui-shimmer width="80px" height="20px"></wui-shimmer>
    `;
  }
  shimmerTemplate() {
    if (this.type === "network") {
      return T` <wui-shimmer data-type=${this.type} width="48px" height="54px"></wui-shimmer>
        ${networkSvgMd}`;
    }
    return T`<wui-shimmer width="56px" height="56px"></wui-shimmer>`;
  }
};
WuiCardSelectLoader.styles = [resetStyles, elementStyles, styles$B];
__decorate$B([
  n()
], WuiCardSelectLoader.prototype, "type", void 0);
WuiCardSelectLoader = __decorate$B([
  customElement("wui-card-select-loader")
], WuiCardSelectLoader);
const styles$A = i`
  :host {
    display: grid;
    width: inherit;
    height: inherit;
  }
`;
var __decorate$A = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
let WuiGrid = class WuiGrid2 extends i$1 {
  render() {
    this.style.cssText = `
      grid-template-rows: ${this.gridTemplateRows};
      grid-template-columns: ${this.gridTemplateColumns};
      justify-items: ${this.justifyItems};
      align-items: ${this.alignItems};
      justify-content: ${this.justifyContent};
      align-content: ${this.alignContent};
      column-gap: ${this.columnGap && `var(--apkt-spacing-${this.columnGap})`};
      row-gap: ${this.rowGap && `var(--apkt-spacing-${this.rowGap})`};
      gap: ${this.gap && `var(--apkt-spacing-${this.gap})`};
      padding-top: ${this.padding && UiHelperUtil.getSpacingStyles(this.padding, 0)};
      padding-right: ${this.padding && UiHelperUtil.getSpacingStyles(this.padding, 1)};
      padding-bottom: ${this.padding && UiHelperUtil.getSpacingStyles(this.padding, 2)};
      padding-left: ${this.padding && UiHelperUtil.getSpacingStyles(this.padding, 3)};
      margin-top: ${this.margin && UiHelperUtil.getSpacingStyles(this.margin, 0)};
      margin-right: ${this.margin && UiHelperUtil.getSpacingStyles(this.margin, 1)};
      margin-bottom: ${this.margin && UiHelperUtil.getSpacingStyles(this.margin, 2)};
      margin-left: ${this.margin && UiHelperUtil.getSpacingStyles(this.margin, 3)};
    `;
    return T`<slot></slot>`;
  }
};
WuiGrid.styles = [resetStyles, styles$A];
__decorate$A([
  n()
], WuiGrid.prototype, "gridTemplateRows", void 0);
__decorate$A([
  n()
], WuiGrid.prototype, "gridTemplateColumns", void 0);
__decorate$A([
  n()
], WuiGrid.prototype, "justifyItems", void 0);
__decorate$A([
  n()
], WuiGrid.prototype, "alignItems", void 0);
__decorate$A([
  n()
], WuiGrid.prototype, "justifyContent", void 0);
__decorate$A([
  n()
], WuiGrid.prototype, "alignContent", void 0);
__decorate$A([
  n()
], WuiGrid.prototype, "columnGap", void 0);
__decorate$A([
  n()
], WuiGrid.prototype, "rowGap", void 0);
__decorate$A([
  n()
], WuiGrid.prototype, "gap", void 0);
__decorate$A([
  n()
], WuiGrid.prototype, "padding", void 0);
__decorate$A([
  n()
], WuiGrid.prototype, "margin", void 0);
WuiGrid = __decorate$A([
  customElement("wui-grid")
], WuiGrid);
const styles$z = css`
  button {
    display: flex;
    gap: ${({ spacing: spacing2 }) => spacing2[1]};
    padding: ${({ spacing: spacing2 }) => spacing2[4]};
    width: 100%;
    background-color: ${({ tokens: tokens2 }) => tokens2.theme.foregroundPrimary};
    border-radius: ${({ borderRadius: borderRadius2 }) => borderRadius2[4]};
    justify-content: center;
    align-items: center;
  }

  :host([data-size='sm']) button {
    padding: ${({ spacing: spacing2 }) => spacing2[2]};
    border-radius: ${({ borderRadius: borderRadius2 }) => borderRadius2[2]};
  }

  :host([data-size='md']) button {
    padding: ${({ spacing: spacing2 }) => spacing2[3]};
    border-radius: ${({ borderRadius: borderRadius2 }) => borderRadius2[3]};
  }

  button:hover {
    background-color: ${({ tokens: tokens2 }) => tokens2.theme.foregroundSecondary};
  }

  button:disabled {
    opacity: 0.5;
  }
`;
var __decorate$z = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
let WuiListButton = class WuiListButton2 extends i$1 {
  constructor() {
    super(...arguments);
    this.text = "";
    this.disabled = false;
    this.size = "lg";
    this.icon = "copy";
    this.tabIdx = void 0;
  }
  render() {
    this.dataset["size"] = this.size;
    const textVariant = `${this.size}-regular`;
    return T`
      <button ?disabled=${this.disabled} tabindex=${o(this.tabIdx)}>
        <wui-icon name=${this.icon} size=${this.size} color="default"></wui-icon>
        <wui-text align="center" variant=${textVariant} color="primary">${this.text}</wui-text>
      </button>
    `;
  }
};
WuiListButton.styles = [resetStyles, elementStyles, styles$z];
__decorate$z([
  n()
], WuiListButton.prototype, "text", void 0);
__decorate$z([
  n({ type: Boolean })
], WuiListButton.prototype, "disabled", void 0);
__decorate$z([
  n()
], WuiListButton.prototype, "size", void 0);
__decorate$z([
  n()
], WuiListButton.prototype, "icon", void 0);
__decorate$z([
  n()
], WuiListButton.prototype, "tabIdx", void 0);
WuiListButton = __decorate$z([
  customElement("wui-list-button")
], WuiListButton);
const styles$y = i`
  :host {
    position: relative;
    display: inline-block;
    width: 100%;
  }
`;
var __decorate$y = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
let WuiEmailInput = class WuiEmailInput2 extends i$1 {
  constructor() {
    super(...arguments);
    this.disabled = false;
  }
  render() {
    return T`
      <wui-input-text
        type="email"
        placeholder="Email"
        icon="mail"
        size="lg"
        .disabled=${this.disabled}
        .value=${this.value}
        data-testid="wui-email-input"
        tabIdx=${o(this.tabIdx)}
      ></wui-input-text>
      ${this.templateError()}
    `;
  }
  templateError() {
    if (this.errorMessage) {
      return T`<wui-text variant="sm-regular" color="error">${this.errorMessage}</wui-text>`;
    }
    return null;
  }
};
WuiEmailInput.styles = [resetStyles, styles$y];
__decorate$y([
  n()
], WuiEmailInput.prototype, "errorMessage", void 0);
__decorate$y([
  n({ type: Boolean })
], WuiEmailInput.prototype, "disabled", void 0);
__decorate$y([
  n()
], WuiEmailInput.prototype, "value", void 0);
__decorate$y([
  n()
], WuiEmailInput.prototype, "tabIdx", void 0);
WuiEmailInput = __decorate$y([
  customElement("wui-email-input")
], WuiEmailInput);
const styles$x = css`
  label {
    display: inline-flex;
    align-items: center;
    cursor: pointer;
    user-select: none;
    column-gap: ${({ spacing: spacing2 }) => spacing2[2]};
  }

  label > input[type='checkbox'] {
    height: 0;
    width: 0;
    opacity: 0;
    position: absolute;
  }

  label > span {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
    border: 1px solid ${({ colors: colors2 }) => colors2.neutrals400};
    color: ${({ colors: colors2 }) => colors2.white};
    background-color: transparent;
    will-change: border-color, background-color;
  }

  label > span > wui-icon {
    opacity: 0;
    will-change: opacity;
  }

  label > input[type='checkbox']:checked + span > wui-icon {
    color: ${({ colors: colors2 }) => colors2.white};
  }

  label > input[type='checkbox']:not(:checked) > span > wui-icon {
    color: ${({ colors: colors2 }) => colors2.neutrals900};
  }

  label > input[type='checkbox']:checked + span > wui-icon {
    opacity: 1;
  }

  /* -- Sizes --------------------------------------------------- */
  label[data-size='lg'] > span {
    width: 24px;
    height: 24px;
    min-width: 24px;
    min-height: 24px;
    border-radius: ${({ borderRadius: borderRadius2 }) => borderRadius2[10]};
  }

  label[data-size='md'] > span {
    width: 20px;
    height: 20px;
    min-width: 20px;
    min-height: 20px;
    border-radius: ${({ borderRadius: borderRadius2 }) => borderRadius2[2]};
  }

  label[data-size='sm'] > span {
    width: 16px;
    height: 16px;
    min-width: 16px;
    min-height: 16px;
    border-radius: ${({ borderRadius: borderRadius2 }) => borderRadius2[1]};
  }

  /* -- Focus states --------------------------------------------------- */
  label > input[type='checkbox']:focus-visible + span,
  label > input[type='checkbox']:focus + span {
    border: 1px solid ${({ tokens: tokens2 }) => tokens2.core.borderAccentPrimary};
    box-shadow: 0px 0px 0px 4px rgba(9, 136, 240, 0.2);
  }

  /* -- Checked states --------------------------------------------------- */
  label > input[type='checkbox']:checked + span {
    background-color: ${({ tokens: tokens2 }) => tokens2.core.iconAccentPrimary};
    border: 1px solid transparent;
  }

  /* -- Hover states --------------------------------------------------- */
  input[type='checkbox']:not(:checked):not(:disabled) + span:hover {
    border: 1px solid ${({ colors: colors2 }) => colors2.neutrals700};
    background-color: ${({ colors: colors2 }) => colors2.neutrals800};
    box-shadow: none;
  }

  input[type='checkbox']:checked:not(:disabled) + span:hover {
    border: 1px solid transparent;
    background-color: ${({ colors: colors2 }) => colors2.accent080};
    box-shadow: none;
  }

  /* -- Disabled state --------------------------------------------------- */
  label > input[type='checkbox']:checked:disabled + span {
    border: 1px solid transparent;
    opacity: 0.3;
  }

  label > input[type='checkbox']:not(:checked):disabled + span {
    border: 1px solid ${({ colors: colors2 }) => colors2.neutrals700};
  }

  label:has(input[type='checkbox']:disabled) {
    cursor: auto;
  }

  label > input[type='checkbox']:disabled + span {
    cursor: not-allowed;
  }
`;
var __decorate$x = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
const ICON_SIZE = {
  lg: "md",
  md: "sm",
  sm: "sm"
};
let WuiCheckBox = class WuiCheckBox2 extends i$1 {
  constructor() {
    super(...arguments);
    this.inputElementRef = e$1();
    this.checked = void 0;
    this.disabled = false;
    this.size = "md";
  }
  render() {
    const iconSize = ICON_SIZE[this.size];
    return T`
      <label data-size=${this.size}>
        <input
          ${n$1(this.inputElementRef)}
          ?checked=${o(this.checked)}
          ?disabled=${this.disabled}
          type="checkbox"
          @change=${this.dispatchChangeEvent}
        />
        <span>
          <wui-icon name="checkmarkBold" size=${iconSize}></wui-icon>
        </span>
        <slot></slot>
      </label>
    `;
  }
  dispatchChangeEvent() {
    this.dispatchEvent(new CustomEvent("checkboxChange", {
      detail: this.inputElementRef.value?.checked,
      bubbles: true,
      composed: true
    }));
  }
};
WuiCheckBox.styles = [resetStyles, styles$x];
__decorate$x([
  n({ type: Boolean })
], WuiCheckBox.prototype, "checked", void 0);
__decorate$x([
  n({ type: Boolean })
], WuiCheckBox.prototype, "disabled", void 0);
__decorate$x([
  n()
], WuiCheckBox.prototype, "size", void 0);
WuiCheckBox = __decorate$x([
  customElement("wui-checkbox")
], WuiCheckBox);
const styles$w = css`
  :host {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    border-radius: ${({ borderRadius: borderRadius2 }) => borderRadius2["20"]};
    overflow: hidden;
  }

  wui-icon {
    width: 100%;
    height: 100%;
  }
`;
var __decorate$w = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
let WuiLogo = class WuiLogo2 extends i$1 {
  constructor() {
    super(...arguments);
    this.logo = "google";
  }
  render() {
    return T`<wui-icon color="inherit" size="inherit" name=${this.logo}></wui-icon> `;
  }
};
WuiLogo.styles = [resetStyles, styles$w];
__decorate$w([
  n()
], WuiLogo.prototype, "logo", void 0);
WuiLogo = __decorate$w([
  customElement("wui-logo")
], WuiLogo);
const styles$v = css`
  :host {
    width: 100%;
  }

  button {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: ${({ spacing: spacing2 }) => spacing2[3]};
    width: 100%;
    background-color: transparent;
    border-radius: ${({ borderRadius: borderRadius2 }) => borderRadius2[4]};
  }

  wui-text {
    text-transform: capitalize;
  }

  @media (hover: hover) {
    button:hover:enabled {
      background-color: ${({ tokens: tokens2 }) => tokens2.theme.foregroundPrimary};
    }
  }

  button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
var __decorate$v = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
let WuiListSocial = class WuiListSocial2 extends i$1 {
  constructor() {
    super(...arguments);
    this.logo = "google";
    this.name = "Continue with google";
    this.disabled = false;
  }
  render() {
    return T`
      <button ?disabled=${this.disabled} tabindex=${o(this.tabIdx)}>
        <wui-flex gap="2" alignItems="center">
          <wui-image ?boxed=${true} logo=${this.logo}></wui-image>
          <wui-text variant="lg-regular" color="primary">${this.name}</wui-text>
        </wui-flex>
        <wui-icon name="chevronRight" size="lg" color="default"></wui-icon>
      </button>
    `;
  }
};
WuiListSocial.styles = [resetStyles, elementStyles, styles$v];
__decorate$v([
  n()
], WuiListSocial.prototype, "logo", void 0);
__decorate$v([
  n()
], WuiListSocial.prototype, "name", void 0);
__decorate$v([
  n()
], WuiListSocial.prototype, "tabIdx", void 0);
__decorate$v([
  n({ type: Boolean })
], WuiListSocial.prototype, "disabled", void 0);
WuiListSocial = __decorate$v([
  customElement("wui-list-social")
], WuiListSocial);
const styles$u = css`
  :host {
    display: block;
    width: 100%;
  }

  button {
    width: 100%;
    height: 52px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${({ tokens: tokens2 }) => tokens2.theme.foregroundPrimary};
    border-radius: ${({ borderRadius: borderRadius2 }) => borderRadius2[4]};
  }

  @media (hover: hover) {
    button:hover:enabled {
      background: ${({ tokens: tokens2 }) => tokens2.theme.foregroundSecondary};
    }
  }

  button:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;
var __decorate$u = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
let WuiLogoSelect = class WuiLogoSelect2 extends i$1 {
  constructor() {
    super(...arguments);
    this.logo = "google";
    this.disabled = false;
    this.tabIdx = void 0;
  }
  render() {
    return T`
      <button ?disabled=${this.disabled} tabindex=${o(this.tabIdx)}>
        <wui-icon size="xxl" name=${this.logo}></wui-icon>
      </button>
    `;
  }
};
WuiLogoSelect.styles = [resetStyles, elementStyles, styles$u];
__decorate$u([
  n()
], WuiLogoSelect.prototype, "logo", void 0);
__decorate$u([
  n({ type: Boolean })
], WuiLogoSelect.prototype, "disabled", void 0);
__decorate$u([
  n()
], WuiLogoSelect.prototype, "tabIdx", void 0);
WuiLogoSelect = __decorate$u([
  customElement("wui-logo-select")
], WuiLogoSelect);
const styles$t = css`
  :host {
    position: relative;
    border-radius: ${({ borderRadius: borderRadius2 }) => borderRadius2[2]};
    width: 40px;
    height: 40px;
    overflow: hidden;
    background: ${({ tokens: tokens2 }) => tokens2.theme.foregroundPrimary};
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    column-gap: ${({ spacing: spacing2 }) => spacing2[1]};
    padding: ${({ spacing: spacing2 }) => spacing2[1]};
  }

  :host > wui-wallet-image {
    width: 14px;
    height: 14px;
    border-radius: 2px;
  }
`;
var __decorate$t = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
const TOTAL_IMAGES = 4;
let WuiAllWalletsImage = class WuiAllWalletsImage2 extends i$1 {
  constructor() {
    super(...arguments);
    this.walletImages = [];
  }
  render() {
    const isPlaceholders = this.walletImages.length < TOTAL_IMAGES;
    return T`${this.walletImages.slice(0, TOTAL_IMAGES).map(({ src, walletName }) => T`
          <wui-wallet-image
            size="sm"
            imageSrc=${src}
            name=${o(walletName)}
          ></wui-wallet-image>
        `)}
    ${isPlaceholders ? [...Array(TOTAL_IMAGES - this.walletImages.length)].map(() => T` <wui-wallet-image size="sm" name=""></wui-wallet-image>`) : null} `;
  }
};
WuiAllWalletsImage.styles = [resetStyles, styles$t];
__decorate$t([
  n({ type: Array })
], WuiAllWalletsImage.prototype, "walletImages", void 0);
WuiAllWalletsImage = __decorate$t([
  customElement("wui-all-wallets-image")
], WuiAllWalletsImage);
const styles$s = css`
  :host {
    width: 100%;
  }

  button {
    column-gap: ${({ spacing: spacing2 }) => spacing2[2]};
    padding: ${({ spacing: spacing2 }) => spacing2[3]};
    width: 100%;
    background-color: transparent;
    border-radius: ${({ borderRadius: borderRadius2 }) => borderRadius2[4]};
    color: ${({ tokens: tokens2 }) => tokens2.theme.textPrimary};
  }

  button > wui-wallet-image {
    background: ${({ tokens: tokens2 }) => tokens2.theme.foregroundSecondary};
  }

  button > wui-text:nth-child(2) {
    display: flex;
    flex: 1;
  }

  button:hover:enabled {
    background-color: ${({ tokens: tokens2 }) => tokens2.theme.foregroundPrimary};
  }

  button[data-all-wallets='true'] {
    background-color: ${({ tokens: tokens2 }) => tokens2.theme.foregroundPrimary};
  }

  button[data-all-wallets='true']:hover:enabled {
    background-color: ${({ tokens: tokens2 }) => tokens2.theme.foregroundSecondary};
  }

  button:focus-visible:enabled {
    background-color: ${({ tokens: tokens2 }) => tokens2.theme.foregroundPrimary};
    box-shadow: 0 0 0 4px ${({ tokens: tokens2 }) => tokens2.core.foregroundAccent020};
  }

  button:disabled {
    background-color: ${({ tokens: tokens2 }) => tokens2.theme.foregroundPrimary};
    opacity: 0.5;
    cursor: not-allowed;
  }

  button:disabled > wui-tag {
    background-color: ${({ tokens: tokens2 }) => tokens2.core.glass010};
    color: ${({ tokens: tokens2 }) => tokens2.theme.foregroundTertiary};
  }

  wui-flex.namespace-icon {
    width: 16px;
    height: 16px;
    border-radius: ${({ borderRadius: borderRadius2 }) => borderRadius2.round};
    background-color: ${({ tokens: tokens2 }) => tokens2.theme.foregroundSecondary};
    box-shadow: 0 0 0 2px ${({ tokens: tokens2 }) => tokens2.theme.backgroundPrimary};
    transition: box-shadow var(--apkt-durations-lg) var(--apkt-easings-ease-out-power-2);
  }

  button:hover:enabled wui-flex.namespace-icon {
    box-shadow: 0 0 0 2px ${({ tokens: tokens2 }) => tokens2.theme.foregroundPrimary};
  }

  wui-flex.namespace-icon > wui-icon {
    width: 10px;
    height: 10px;
  }

  wui-flex.namespace-icon:not(:first-child) {
    margin-left: -4px;
  }
`;
var __decorate$s = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
const NAMESPACE_ICONS = {
  eip155: "ethereum",
  solana: "solana",
  bip122: "bitcoin",
  polkadot: void 0,
  cosmos: void 0,
  sui: void 0,
  stacks: void 0,
  ton: "ton",
  tron: "tron"
};
let WuiListWallet = class WuiListWallet2 extends i$1 {
  constructor() {
    super(...arguments);
    this.walletImages = [];
    this.imageSrc = "";
    this.name = "";
    this.size = "md";
    this.tabIdx = void 0;
    this.namespaces = [];
    this.disabled = false;
    this.showAllWallets = false;
    this.loading = false;
    this.loadingSpinnerColor = "accent-100";
  }
  render() {
    this.dataset["size"] = this.size;
    return T`
      <button
        ?disabled=${this.disabled}
        data-all-wallets=${this.showAllWallets}
        tabindex=${o(this.tabIdx)}
      >
        ${this.templateAllWallets()} ${this.templateWalletImage()}
        <wui-flex flexDirection="column" justifyContent="center" alignItems="flex-start" gap="1">
          <wui-text variant="lg-regular" color="inherit">${this.name}</wui-text>
          ${this.templateNamespaces()}
        </wui-flex>
        ${this.templateStatus()}
        <wui-icon name="chevronRight" size="lg" color="default"></wui-icon>
      </button>
    `;
  }
  templateNamespaces() {
    if (this.namespaces?.length) {
      return T`<wui-flex alignItems="center" gap="0">
        ${this.namespaces.map((namespace, index) => T`<wui-flex
              alignItems="center"
              justifyContent="center"
              zIndex=${(this.namespaces?.length ?? 0) * 2 - index}
              class="namespace-icon"
            >
              <wui-icon
                name=${o(NAMESPACE_ICONS[namespace])}
                size="sm"
                color="default"
              ></wui-icon>
            </wui-flex>`)}
      </wui-flex>`;
    }
    return null;
  }
  templateAllWallets() {
    if (this.showAllWallets && this.imageSrc) {
      return T` <wui-all-wallets-image .imageeSrc=${this.imageSrc}> </wui-all-wallets-image> `;
    } else if (this.showAllWallets && this.walletIcon) {
      return T` <wui-wallet-image .walletIcon=${this.walletIcon} size="sm"> </wui-wallet-image> `;
    }
    return null;
  }
  templateWalletImage() {
    if (!this.showAllWallets && this.imageSrc) {
      return T`<wui-wallet-image
        size=${o(this.size === "sm" ? "sm" : "md")}
        imageSrc=${this.imageSrc}
        name=${this.name}
      ></wui-wallet-image>`;
    } else if (!this.showAllWallets && !this.imageSrc) {
      return T`<wui-wallet-image size="sm" name=${this.name}></wui-wallet-image>`;
    }
    return null;
  }
  templateStatus() {
    if (this.loading) {
      return T`<wui-loading-spinner size="lg" color="accent-primary"></wui-loading-spinner>`;
    } else if (this.tagLabel && this.tagVariant) {
      return T`<wui-tag size="sm" variant=${this.tagVariant}>${this.tagLabel}</wui-tag>`;
    }
    return null;
  }
};
WuiListWallet.styles = [resetStyles, elementStyles, styles$s];
__decorate$s([
  n({ type: Array })
], WuiListWallet.prototype, "walletImages", void 0);
__decorate$s([
  n()
], WuiListWallet.prototype, "imageSrc", void 0);
__decorate$s([
  n()
], WuiListWallet.prototype, "name", void 0);
__decorate$s([
  n()
], WuiListWallet.prototype, "size", void 0);
__decorate$s([
  n()
], WuiListWallet.prototype, "tagLabel", void 0);
__decorate$s([
  n()
], WuiListWallet.prototype, "tagVariant", void 0);
__decorate$s([
  n()
], WuiListWallet.prototype, "walletIcon", void 0);
__decorate$s([
  n()
], WuiListWallet.prototype, "tabIdx", void 0);
__decorate$s([
  n({ type: Array })
], WuiListWallet.prototype, "namespaces", void 0);
__decorate$s([
  n({ type: Boolean })
], WuiListWallet.prototype, "disabled", void 0);
__decorate$s([
  n({ type: Boolean })
], WuiListWallet.prototype, "showAllWallets", void 0);
__decorate$s([
  n({ type: Boolean })
], WuiListWallet.prototype, "loading", void 0);
__decorate$s([
  n({ type: String })
], WuiListWallet.prototype, "loadingSpinnerColor", void 0);
WuiListWallet = __decorate$s([
  customElement("wui-list-wallet")
], WuiListWallet);
const styles$r = css`
  :host {
    display: block;
    width: 100px;
    height: 100px;
  }

  svg {
    width: 100px;
    height: 100px;
  }

  rect {
    fill: none;
    stroke: ${(tokens2) => tokens2.colors.accent100};
    stroke-width: 3px;
    stroke-linecap: round;
    animation: dash 1s linear infinite;
  }

  @keyframes dash {
    to {
      stroke-dashoffset: 0px;
    }
  }
`;
var __decorate$r = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
let WuiLoadingThumbnail = class WuiLoadingThumbnail2 extends i$1 {
  constructor() {
    super(...arguments);
    this.radius = 36;
  }
  render() {
    return this.svgLoaderTemplate();
  }
  svgLoaderTemplate() {
    const radius = this.radius > 50 ? 50 : this.radius;
    const standardValue = 36;
    const radiusFactor = standardValue - radius;
    const dashArrayStart = 116 + radiusFactor;
    const dashArrayEnd = 245 + radiusFactor;
    const dashOffset = 360 + radiusFactor * 1.75;
    return T`
      <svg viewBox="0 0 110 110" width="110" height="110">
        <rect
          x="2"
          y="2"
          width="106"
          height="106"
          rx=${radius}
          stroke-dasharray="${dashArrayStart} ${dashArrayEnd}"
          stroke-dashoffset=${dashOffset}
        />
      </svg>
    `;
  }
};
WuiLoadingThumbnail.styles = [resetStyles, styles$r];
__decorate$r([
  n({ type: Number })
], WuiLoadingThumbnail.prototype, "radius", void 0);
WuiLoadingThumbnail = __decorate$r([
  customElement("wui-loading-thumbnail")
], WuiLoadingThumbnail);
const styles$q = css`
  wui-flex {
    width: 100%;
    height: 52px;
    box-sizing: border-box;
    background-color: ${({ tokens: tokens2 }) => tokens2.theme.foregroundPrimary};
    border-radius: ${({ borderRadius: borderRadius2 }) => borderRadius2[5]};
    padding-left: ${({ spacing: spacing2 }) => spacing2[3]};
    padding-right: ${({ spacing: spacing2 }) => spacing2[3]};
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: ${({ spacing: spacing2 }) => spacing2[6]};
  }

  wui-text {
    color: ${({ tokens: tokens2 }) => tokens2.theme.textSecondary};
  }

  wui-icon {
    width: 12px;
    height: 12px;
  }
`;
var __decorate$q = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
let WuiCtaButton = class WuiCtaButton2 extends i$1 {
  constructor() {
    super(...arguments);
    this.disabled = false;
    this.label = "";
    this.buttonLabel = "";
  }
  render() {
    return T`
      <wui-flex justifyContent="space-between" alignItems="center">
        <wui-text variant="lg-regular" color="inherit">${this.label}</wui-text>
        <wui-button variant="accent-secondary" size="sm">
          ${this.buttonLabel}
          <wui-icon name="chevronRight" color="inherit" size="inherit" slot="iconRight"></wui-icon>
        </wui-button>
      </wui-flex>
    `;
  }
};
WuiCtaButton.styles = [resetStyles, elementStyles, styles$q];
__decorate$q([
  n({ type: Boolean })
], WuiCtaButton.prototype, "disabled", void 0);
__decorate$q([
  n()
], WuiCtaButton.prototype, "label", void 0);
__decorate$q([
  n()
], WuiCtaButton.prototype, "buttonLabel", void 0);
WuiCtaButton = __decorate$q([
  customElement("wui-cta-button")
], WuiCtaButton);
const CONNECTING_ERROR_MARGIN = 0.1;
const CIRCLE_SIZE_MODIFIER = 2.5;
const QRCODE_MATRIX_MARGIN = 7;
function isAdjecentDots(cy, otherCy, cellSize) {
  if (cy === otherCy) {
    return false;
  }
  const diff = cy - otherCy < 0 ? otherCy - cy : cy - otherCy;
  return diff <= cellSize + CONNECTING_ERROR_MARGIN;
}
function getMatrix(value, errorCorrectionLevel) {
  const arr = Array.prototype.slice.call(QRCodeUtil.create(value, { errorCorrectionLevel }).modules.data, 0);
  const sqrt = Math.sqrt(arr.length);
  return arr.reduce((rows, key, index) => (index % sqrt === 0 ? rows.push([key]) : rows[rows.length - 1].push(key)) && rows, []);
}
const QrCodeUtil = {
  generate({ uri, size, logoSize, padding = 8, dotColor = "var(--apkt-colors-black)" }) {
    const strokeWidth = 10;
    const dots = [];
    const matrix = getMatrix(uri, "Q");
    const cellSize = (size - 2 * padding) / matrix.length;
    const qrList = [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 0, y: 1 }
    ];
    qrList.forEach(({ x, y }) => {
      const x1 = (matrix.length - QRCODE_MATRIX_MARGIN) * cellSize * x + padding;
      const y1 = (matrix.length - QRCODE_MATRIX_MARGIN) * cellSize * y + padding;
      const borderRadius2 = 0.45;
      for (let i2 = 0; i2 < qrList.length; i2 += 1) {
        const dotSize = cellSize * (QRCODE_MATRIX_MARGIN - i2 * 2);
        dots.push(b`
            <rect
              fill=${i2 === 2 ? "var(--apkt-colors-black)" : "var(--apkt-colors-white)"}
              width=${i2 === 0 ? dotSize - strokeWidth : dotSize}
              rx= ${i2 === 0 ? (dotSize - strokeWidth) * borderRadius2 : dotSize * borderRadius2}
              ry= ${i2 === 0 ? (dotSize - strokeWidth) * borderRadius2 : dotSize * borderRadius2}
              stroke=${dotColor}
              stroke-width=${i2 === 0 ? strokeWidth : 0}
              height=${i2 === 0 ? dotSize - strokeWidth : dotSize}
              x= ${i2 === 0 ? y1 + cellSize * i2 + strokeWidth / 2 : y1 + cellSize * i2}
              y= ${i2 === 0 ? x1 + cellSize * i2 + strokeWidth / 2 : x1 + cellSize * i2}
            />
          `);
      }
    });
    const clearArenaSize = Math.floor((logoSize + 25) / cellSize);
    const matrixMiddleStart = matrix.length / 2 - clearArenaSize / 2;
    const matrixMiddleEnd = matrix.length / 2 + clearArenaSize / 2 - 1;
    const circles = [];
    matrix.forEach((row, i2) => {
      row.forEach((_, j) => {
        if (matrix[i2][j]) {
          if (!(i2 < QRCODE_MATRIX_MARGIN && j < QRCODE_MATRIX_MARGIN || i2 > matrix.length - (QRCODE_MATRIX_MARGIN + 1) && j < QRCODE_MATRIX_MARGIN || i2 < QRCODE_MATRIX_MARGIN && j > matrix.length - (QRCODE_MATRIX_MARGIN + 1))) {
            if (!(i2 > matrixMiddleStart && i2 < matrixMiddleEnd && j > matrixMiddleStart && j < matrixMiddleEnd)) {
              const cx = i2 * cellSize + cellSize / 2 + padding;
              const cy = j * cellSize + cellSize / 2 + padding;
              circles.push([cx, cy]);
            }
          }
        }
      });
    });
    const circlesToConnect = {};
    circles.forEach(([cx, cy]) => {
      if (circlesToConnect[cx]) {
        circlesToConnect[cx]?.push(cy);
      } else {
        circlesToConnect[cx] = [cy];
      }
    });
    Object.entries(circlesToConnect).map(([cx, cys]) => {
      const newCys = cys.filter((cy) => cys.every((otherCy) => !isAdjecentDots(cy, otherCy, cellSize)));
      return [Number(cx), newCys];
    }).forEach(([cx, cys]) => {
      cys.forEach((cy) => {
        dots.push(b`<circle cx=${cx} cy=${cy} fill=${dotColor} r=${cellSize / CIRCLE_SIZE_MODIFIER} />`);
      });
    });
    Object.entries(circlesToConnect).filter(([_, cys]) => cys.length > 1).map(([cx, cys]) => {
      const newCys = cys.filter((cy) => cys.some((otherCy) => isAdjecentDots(cy, otherCy, cellSize)));
      return [Number(cx), newCys];
    }).map(([cx, cys]) => {
      cys.sort((a, b2) => a < b2 ? -1 : 1);
      const groups = [];
      for (const cy of cys) {
        const group = groups.find((item) => item.some((otherCy) => isAdjecentDots(cy, otherCy, cellSize)));
        if (group) {
          group.push(cy);
        } else {
          groups.push([cy]);
        }
      }
      return [cx, groups.map((item) => [item[0], item[item.length - 1]])];
    }).forEach(([cx, groups]) => {
      groups.forEach(([y1, y2]) => {
        dots.push(b`
              <line
                x1=${cx}
                x2=${cx}
                y1=${y1}
                y2=${y2}
                stroke=${dotColor}
                stroke-width=${cellSize / (CIRCLE_SIZE_MODIFIER / 2)}
                stroke-linecap="round"
              />
            `);
      });
    });
    return dots;
  }
};
const styles$p = css`
  :host {
    position: relative;
    user-select: none;
    display: block;
    overflow: hidden;
    aspect-ratio: 1 / 1;
    width: 100%;
    height: 100%;
    background-color: ${({ colors: colors2 }) => colors2.white};
    border: 1px solid ${({ tokens: tokens2 }) => tokens2.theme.borderPrimary};
  }

  :host {
    border-radius: ${({ borderRadius: borderRadius2 }) => borderRadius2[4]};
    display: flex;
    align-items: center;
    justify-content: center;
  }

  :host([data-clear='true']) > wui-icon {
    display: none;
  }

  svg:first-child,
  wui-image,
  wui-icon {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateY(-50%) translateX(-50%);
    background-color: ${({ tokens: tokens2 }) => tokens2.theme.backgroundPrimary};
    box-shadow: inset 0 0 0 4px ${({ tokens: tokens2 }) => tokens2.theme.backgroundPrimary};
    border-radius: ${({ borderRadius: borderRadius2 }) => borderRadius2[6]};
  }

  wui-image {
    width: 25%;
    height: 25%;
    border-radius: ${({ borderRadius: borderRadius2 }) => borderRadius2[2]};
  }

  wui-icon {
    width: 100%;
    height: 100%;
    color: #3396ff !important;
    transform: translateY(-50%) translateX(-50%) scale(0.25);
  }

  wui-icon > svg {
    width: inherit;
    height: inherit;
  }
`;
var __decorate$p = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
let WuiQrCode = class WuiQrCode2 extends i$1 {
  constructor() {
    super(...arguments);
    this.uri = "";
    this.size = 500;
    this.theme = "dark";
    this.imageSrc = void 0;
    this.alt = void 0;
    this.arenaClear = void 0;
    this.farcaster = void 0;
  }
  render() {
    this.dataset["theme"] = this.theme;
    this.dataset["clear"] = String(this.arenaClear);
    return T`<wui-flex
      alignItems="center"
      justifyContent="center"
      class="wui-qr-code"
      direction="column"
      gap="4"
      width="100%"
      style="height: 100%"
    >
      ${this.templateVisual()} ${this.templateSvg()}
    </wui-flex>`;
  }
  templateSvg() {
    return b`
      <svg viewBox="0 0 ${this.size} ${this.size}" width="100%" height="100%">
        ${QrCodeUtil.generate({
      uri: this.uri,
      size: this.size,
      logoSize: this.arenaClear ? 0 : this.size / 4
    })}
      </svg>
    `;
  }
  templateVisual() {
    if (this.imageSrc) {
      return T`<wui-image src=${this.imageSrc} alt=${this.alt ?? "logo"}></wui-image>`;
    }
    if (this.farcaster) {
      return T`<wui-icon
        class="farcaster"
        size="inherit"
        color="inherit"
        name="farcaster"
      ></wui-icon>`;
    }
    return T`<wui-icon size="inherit" color="inherit" name="walletConnect"></wui-icon>`;
  }
};
WuiQrCode.styles = [resetStyles, styles$p];
__decorate$p([
  n()
], WuiQrCode.prototype, "uri", void 0);
__decorate$p([
  n({ type: Number })
], WuiQrCode.prototype, "size", void 0);
__decorate$p([
  n()
], WuiQrCode.prototype, "theme", void 0);
__decorate$p([
  n()
], WuiQrCode.prototype, "imageSrc", void 0);
__decorate$p([
  n()
], WuiQrCode.prototype, "alt", void 0);
__decorate$p([
  n({ type: Boolean })
], WuiQrCode.prototype, "arenaClear", void 0);
__decorate$p([
  n({ type: Boolean })
], WuiQrCode.prototype, "farcaster", void 0);
WuiQrCode = __decorate$p([
  customElement("wui-qr-code")
], WuiQrCode);
const bitcoinSvg = b`<svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="64" height="64" fill="#F7931A"/>
  <g clip-path="url(#clip0_1045_17)">
    <path d="M63.0394 39.7409C58.7654 56.8839 41.4024 67.3169 24.2574 63.0419C7.11937 58.7679 -3.31363 41.4039 0.962367 24.2619C5.23437 7.11686 22.5974 -3.31714 39.7374 0.956863C56.8814 5.23086 67.3134 22.5969 63.0394 39.7409Z" fill="#F7931A"/>
    <path d="M46.1092 27.4409C46.7462 23.1829 43.5042 20.8939 39.0712 19.3669L40.5092 13.5989L36.9982 12.7239L35.5982 18.3399C34.6752 18.1099 33.7272 17.8929 32.7852 17.6779L34.1952 12.0249L30.6862 11.1499L29.2472 16.9159C28.4832 16.7419 27.7332 16.5699 27.0052 16.3889L27.0092 16.3709L22.1672 15.1619L21.2332 18.9119C21.2332 18.9119 23.8382 19.5089 23.7832 19.5459C25.2052 19.9009 25.4622 20.8419 25.4192 21.5879L23.7812 28.1589C23.8792 28.1839 24.0062 28.2199 24.1462 28.2759C24.0292 28.2469 23.9042 28.2149 23.7752 28.1839L21.4792 37.3889C21.3052 37.8209 20.8642 38.4689 19.8702 38.2229C19.9052 38.2739 17.3182 37.5859 17.3182 37.5859L15.5752 41.6049L20.1442 42.7439C20.9942 42.9569 21.8272 43.1799 22.6472 43.3899L21.1942 49.2239L24.7012 50.0989L26.1402 44.3269C27.0982 44.5869 28.0282 44.8269 28.9382 45.0529L27.5042 50.7979L31.0152 51.6729L32.4682 45.8499C38.4552 46.9829 42.9572 46.5259 44.8522 41.1109C46.3792 36.7509 44.7762 34.2359 41.6262 32.5959C43.9202 32.0669 45.6482 30.5579 46.1092 27.4409ZM38.0872 38.6899C37.0022 43.0499 29.6612 40.6929 27.2812 40.1019L29.2092 32.3729C31.5892 32.9669 39.2212 34.1429 38.0872 38.6899ZM39.1732 27.3779C38.1832 31.3439 32.0732 29.3289 30.0912 28.8349L31.8392 21.8249C33.8212 22.3189 40.2042 23.2409 39.1732 27.3779Z" fill="white"/>
  </g>
  <defs>
    <clipPath id="clip0_1045_17">
      <rect width="64" height="64" fill="white"/>
    </clipPath>
  </defs>
</svg>
`;
const browserSvg = b`<svg fill="none" viewBox="0 0 60 60">
  <rect width="60" height="60" fill="#1DC956" rx="30" />
  <circle cx="30" cy="30" r="3" fill="#fff" />
  <path
    fill="#2BEE6C"
    stroke="#fff"
    stroke-width="2"
    d="m45.32 17.9-.88-.42.88.42.02-.05c.1-.2.21-.44.26-.7l-.82-.15.82.16a2 2 0 0 0-.24-1.4c-.13-.23-.32-.42-.47-.57a8.42 8.42 0 0 1-.04-.04l-.04-.04a2.9 2.9 0 0 0-.56-.47l-.51.86.5-.86a2 2 0 0 0-1.4-.24c-.26.05-.5.16-.69.26l-.05.02-15.05 7.25-.1.05c-1.14.55-1.85.89-2.46 1.37a7 7 0 0 0-1.13 1.14c-.5.6-.83 1.32-1.38 2.45l-.05.11-7.25 15.05-.02.05c-.1.2-.21.43-.26.69a2 2 0 0 0 .24 1.4l.85-.5-.85.5c.13.23.32.42.47.57l.04.04.04.04c.15.15.34.34.56.47a2 2 0 0 0 1.41.24l-.2-.98.2.98c.25-.05.5-.17.69-.26l.05-.02-.42-.87.42.87 15.05-7.25.1-.05c1.14-.55 1.85-.89 2.46-1.38a7 7 0 0 0 1.13-1.13 12.87 12.87 0 0 0 1.43-2.56l7.25-15.05Z"
  />
  <path
    fill="#1DC956"
    d="M33.38 32.72 30.7 29.3 15.86 44.14l.2.2a1 1 0 0 0 1.14.2l15.1-7.27a3 3 0 0 0 1.08-4.55Z"
  />
  <path
    fill="#86F999"
    d="m26.62 27.28 2.67 3.43 14.85-14.85-.2-.2a1 1 0 0 0-1.14-.2l-15.1 7.27a3 3 0 0 0-1.08 4.55Z"
  />
  <circle cx="30" cy="30" r="3" fill="#fff" transform="rotate(45 30 30)" />
  <rect width="59" height="59" x=".5" y=".5" stroke="#062B2B" stroke-opacity=".1" rx="29.5" />
</svg> `;
const daoSvg = b`<svg viewBox="0 0 60 60" fill="none">
  <g clip-path="url(#clip0_7734_50402)">
    <path
      d="M0 24.9C0 15.6485 0 11.0228 1.97053 7.56812C3.3015 5.23468 5.23468 3.3015 7.56812 1.97053C11.0228 0 15.6485 0 24.9 0H35.1C44.3514 0 48.9772 0 52.4319 1.97053C54.7653 3.3015 56.6985 5.23468 58.0295 7.56812C60 11.0228 60 15.6485 60 24.9V35.1C60 44.3514 60 48.9772 58.0295 52.4319C56.6985 54.7653 54.7653 56.6985 52.4319 58.0295C48.9772 60 44.3514 60 35.1 60H24.9C15.6485 60 11.0228 60 7.56812 58.0295C5.23468 56.6985 3.3015 54.7653 1.97053 52.4319C0 48.9772 0 44.3514 0 35.1V24.9Z"
      fill="#EB8B47"
    />
    <path
      d="M0.5 24.9C0.5 20.2652 0.50047 16.8221 0.744315 14.105C0.987552 11.3946 1.46987 9.45504 2.40484 7.81585C3.69145 5.56019 5.56019 3.69145 7.81585 2.40484C9.45504 1.46987 11.3946 0.987552 14.105 0.744315C16.8221 0.50047 20.2652 0.5 24.9 0.5H35.1C39.7348 0.5 43.1779 0.50047 45.895 0.744315C48.6054 0.987552 50.545 1.46987 52.1841 2.40484C54.4398 3.69145 56.3086 5.56019 57.5952 7.81585C58.5301 9.45504 59.0124 11.3946 59.2557 14.105C59.4995 16.8221 59.5 20.2652 59.5 24.9V35.1C59.5 39.7348 59.4995 43.1779 59.2557 45.895C59.0124 48.6054 58.5301 50.545 57.5952 52.1841C56.3086 54.4398 54.4398 56.3086 52.1841 57.5952C50.545 58.5301 48.6054 59.0124 45.895 59.2557C43.1779 59.4995 39.7348 59.5 35.1 59.5H24.9C20.2652 59.5 16.8221 59.4995 14.105 59.2557C11.3946 59.0124 9.45504 58.5301 7.81585 57.5952C5.56019 56.3086 3.69145 54.4398 2.40484 52.1841C1.46987 50.545 0.987552 48.6054 0.744315 45.895C0.50047 43.1779 0.5 39.7348 0.5 35.1V24.9Z"
      stroke="#062B2B"
      stroke-opacity="0.1"
    />
    <path
      d="M19 52C24.5228 52 29 47.5228 29 42C29 36.4772 24.5228 32 19 32C13.4772 32 9 36.4772 9 42C9 47.5228 13.4772 52 19 52Z"
      fill="#FF974C"
      stroke="white"
      stroke-width="2"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M42.8437 8.3264C42.4507 7.70891 41.5493 7.70891 41.1564 8.32641L28.978 27.4638C28.5544 28.1295 29.0326 29.0007 29.8217 29.0007H54.1783C54.9674 29.0007 55.4456 28.1295 55.022 27.4638L42.8437 8.3264Z"
      fill="white"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M42.3348 11.6456C42.659 11.7608 42.9061 12.1492 43.4005 12.926L50.7332 24.4488C51.2952 25.332 51.5763 25.7737 51.5254 26.1382C51.4915 26.3808 51.3698 26.6026 51.1833 26.7614C50.9031 27 50.3796 27 49.3327 27H34.6673C33.6204 27 33.0969 27 32.8167 26.7614C32.6302 26.6026 32.5085 26.3808 32.4746 26.1382C32.4237 25.7737 32.7048 25.332 33.2669 24.4488L40.5995 12.926C41.0939 12.1492 41.341 11.7608 41.6652 11.6456C41.8818 11.5687 42.1182 11.5687 42.3348 11.6456ZM35.0001 26.999C38.8661 26.999 42.0001 23.865 42.0001 19.999C42.0001 23.865 45.1341 26.999 49.0001 26.999H35.0001Z"
      fill="#FF974C"
    />
    <path
      d="M10.1061 9.35712C9.9973 9.67775 9.99867 10.0388 9.99978 10.3323C9.99989 10.3611 10 10.3893 10 10.4167V25.5833C10 25.6107 9.99989 25.6389 9.99978 25.6677C9.99867 25.9612 9.9973 26.3222 10.1061 26.6429C10.306 27.2317 10.7683 27.694 11.3571 27.8939C11.6777 28.0027 12.0388 28.0013 12.3323 28.0002C12.3611 28.0001 12.3893 28 12.4167 28H19C24.5228 28 29 23.5228 29 18C29 12.4772 24.5228 8 19 8H12.4167C12.3893 8 12.3611 7.99989 12.3323 7.99978C12.0388 7.99867 11.6778 7.9973 11.3571 8.10614C10.7683 8.306 10.306 8.76834 10.1061 9.35712Z"
      fill="#FF974C"
      stroke="white"
      stroke-width="2"
    />
    <circle cx="19" cy="18" r="4" fill="#EB8B47" stroke="white" stroke-width="2" />
    <circle cx="19" cy="42" r="4" fill="#EB8B47" stroke="white" stroke-width="2" />
  </g>
  <defs>
    <clipPath id="clip0_7734_50402">
      <rect width="60" height="60" fill="white" />
    </clipPath>
  </defs>
</svg> `;
const defiSvg = b`<svg fill="none" viewBox="0 0 60 60">
  <g clip-path="url(#a)">
    <path
      fill="#1DC956"
      d="M0 25.01c0-9.25 0-13.88 1.97-17.33a15 15 0 0 1 5.6-5.6C11.02.11 15.65.11 24.9.11h10.2c9.25 0 13.88 0 17.33 1.97a15 15 0 0 1 5.6 5.6C60 11.13 60 15.76 60 25v10.2c0 9.25 0 13.88-1.97 17.33a15 15 0 0 1-5.6 5.6c-3.45 1.97-8.08 1.97-17.33 1.97H24.9c-9.25 0-13.88 0-17.33-1.97a15 15 0 0 1-5.6-5.6C0 49.1 0 44.46 0 35.21v-10.2Z"
    />
    <path
      fill="#2BEE6C"
      d="M16.1 60c-3.82-.18-6.4-.64-8.53-1.86a15 15 0 0 1-5.6-5.6C.55 50.06.16 46.97.04 41.98L4.2 40.6a4 4 0 0 0 2.48-2.39l4.65-12.4a2 2 0 0 1 2.5-1.2l2.53.84a2 2 0 0 0 2.43-1l2.96-5.94a2 2 0 0 1 3.7.32l3.78 12.58a2 2 0 0 0 3.03 1.09l3.34-2.23a2 2 0 0 0 .65-.7l5.3-9.72a2 2 0 0 1 1.42-1.01l4.14-.69a2 2 0 0 1 1.6.44l3.9 3.24a2 2 0 0 0 2.7-.12l4.62-4.63c.08 2.2.08 4.8.08 7.93v10.2c0 9.25 0 13.88-1.97 17.33a15 15 0 0 1-5.6 5.6c-2.13 1.22-4.7 1.68-8.54 1.86H16.11Z"
    />
    <path
      fill="#fff"
      d="m.07 43.03-.05-2.1 3.85-1.28a3 3 0 0 0 1.86-1.79l4.66-12.4a3 3 0 0 1 3.75-1.8l2.53.84a1 1 0 0 0 1.21-.5l2.97-5.94a3 3 0 0 1 5.56.48l3.77 12.58a1 1 0 0 0 1.51.55l3.34-2.23a1 1 0 0 0 .33-.35l5.3-9.71a3 3 0 0 1 2.14-1.53l4.13-.69a3 3 0 0 1 2.41.66l3.9 3.24a1 1 0 0 0 1.34-.06l5.28-5.28c.05.85.08 1.75.1 2.73L56 22.41a3 3 0 0 1-4.04.19l-3.9-3.25a1 1 0 0 0-.8-.21l-4.13.69a1 1 0 0 0-.72.5l-5.3 9.72a3 3 0 0 1-.97 1.05l-3.34 2.23a3 3 0 0 1-4.53-1.63l-3.78-12.58a1 1 0 0 0-1.85-.16l-2.97 5.94a3 3 0 0 1-3.63 1.5l-2.53-.84a1 1 0 0 0-1.25.6l-4.65 12.4a5 5 0 0 1-3.1 3L.07 43.02Z"
    />
    <path
      fill="#fff"
      fill-rule="evenodd"
      d="M49.5 19a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0Z"
      clip-rule="evenodd"
    />
    <path fill="#fff" d="M45 .28v59.66l-2 .1V.19c.7.02 1.37.05 2 .1Z" />
    <path fill="#2BEE6C" d="M47.5 19a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" />
    <path
      stroke="#fff"
      stroke-opacity=".1"
      d="M.5 25.01c0-4.63 0-8.08.24-10.8.25-2.7.73-4.64 1.66-6.28a14.5 14.5 0 0 1 5.42-5.41C9.46 1.58 11.39 1.1 14.1.85A133 133 0 0 1 24.9.61h10.2c4.63 0 8.08 0 10.8.24 2.7.25 4.65.73 6.28 1.67a14.5 14.5 0 0 1 5.42 5.4c.93 1.65 1.41 3.58 1.66 6.3.24 2.71.24 6.16.24 10.79v10.2c0 4.64 0 8.08-.24 10.8-.25 2.7-.73 4.65-1.66 6.28a14.5 14.5 0 0 1-5.42 5.42c-1.63.93-3.57 1.41-6.28 1.66-2.72.24-6.17.24-10.8.24H24.9c-4.63 0-8.08 0-10.8-.24-2.7-.25-4.64-.73-6.28-1.66a14.5 14.5 0 0 1-5.42-5.42C1.47 50.66 1 48.72.74 46.01A133 133 0 0 1 .5 35.2v-10.2Z"
    />
  </g>
  <defs>
    <clipPath id="a"><path fill="#fff" d="M0 0h60v60H0z" /></clipPath>
  </defs>
</svg>`;
const defiAltSvg = b`<svg fill="none" viewBox="0 0 60 60">
  <g clip-path="url(#a)">
    <rect width="60" height="60" fill="#C653C6" rx="30" />
    <path
      fill="#E87DE8"
      d="M57.98.01v19.5a4.09 4.09 0 0 0-2.63 2.29L50.7 34.2a2 2 0 0 1-2.5 1.2l-2.53-.84a2 2 0 0 0-2.42 1l-2.97 5.94a2 2 0 0 1-3.7-.32L32.8 28.6a2 2 0 0 0-3.02-1.09l-3.35 2.23a2 2 0 0 0-.64.7l-5.3 9.72a2 2 0 0 1-1.43 1.01l-4.13.69a2 2 0 0 1-1.61-.44l-3.9-3.24a2 2 0 0 0-2.69.12L2.1 42.93.02 43V.01h57.96Z"
    />
    <path
      fill="#fff"
      d="m61.95 16.94.05 2.1-3.85 1.28a3 3 0 0 0-1.86 1.79l-4.65 12.4a3 3 0 0 1-3.76 1.8l-2.53-.84a1 1 0 0 0-1.2.5l-2.98 5.94a3 3 0 0 1-5.55-.48l-3.78-12.58a1 1 0 0 0-1.5-.55l-3.35 2.23a1 1 0 0 0-.32.35l-5.3 9.72a3 3 0 0 1-2.14 1.52l-4.14.69a3 3 0 0 1-2.41-.66l-3.9-3.24a1 1 0 0 0-1.34.06l-5.28 5.28c-.05-.84-.08-1.75-.1-2.73l3.97-3.96a3 3 0 0 1 4.04-.19l3.89 3.25a1 1 0 0 0 .8.21l4.14-.68a1 1 0 0 0 .71-.51l5.3-9.71a3 3 0 0 1 .97-1.06l3.34-2.23a3 3 0 0 1 4.54 1.63l3.77 12.58a1 1 0 0 0 1.86.16l2.96-5.93a3 3 0 0 1 3.64-1.5l2.52.83a1 1 0 0 0 1.25-.6l4.66-12.4a5 5 0 0 1 3.1-2.99l4.43-1.48Z"
    />
    <path
      fill="#fff"
      fill-rule="evenodd"
      d="M35.5 27a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0Z"
      clip-rule="evenodd"
    />
    <path fill="#fff" d="M31 0v60h-2V0h2Z" />
    <path fill="#E87DE8" d="M33.5 27a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" />
  </g>
  <rect width="59" height="59" x=".5" y=".5" stroke="#fff" stroke-opacity=".1" rx="29.5" />
  <defs>
    <clipPath id="a"><rect width="60" height="60" fill="#fff" rx="30" /></clipPath>
  </defs>
</svg> `;
const ethSvg = b`<svg fill="none" viewBox="0 0 60 60">
  <g clip-path="url(#a)">
    <rect width="60" height="60" fill="#987DE8" rx="30" />
    <path
      fill="#fff"
      fill-rule="evenodd"
      d="m15.48 28.37 11.97-19.3a3 3 0 0 1 5.1 0l11.97 19.3a6 6 0 0 1 .9 3.14v.03a6 6 0 0 1-1.16 3.56L33.23 50.2a4 4 0 0 1-6.46 0L15.73 35.1a6 6 0 0 1-1.15-3.54v-.03a6 6 0 0 1 .9-3.16Z"
      clip-rule="evenodd"
    />
    <path
      fill="#643CDD"
      d="M30.84 10.11a1 1 0 0 0-.84-.46V24.5l12.6 5.53a2 2 0 0 0-.28-1.4L30.84 10.11Z"
    />
    <path
      fill="#BDADEB"
      d="M30 9.65a1 1 0 0 0-.85.46L17.66 28.64a2 2 0 0 0-.26 1.39L30 24.5V9.65Z"
    />
    <path
      fill="#643CDD"
      d="M30 50.54a1 1 0 0 0 .8-.4l11.24-15.38c.3-.44-.2-1-.66-.73l-9.89 5.68a3 3 0 0 1-1.5.4v10.43Z"
    />
    <path
      fill="#BDADEB"
      d="m17.97 34.76 11.22 15.37c.2.28.5.41.8.41V40.11a3 3 0 0 1-1.49-.4l-9.88-5.68c-.47-.27-.97.3-.65.73Z"
    />
    <path
      fill="#401AB3"
      d="M42.6 30.03 30 24.5v13.14a3 3 0 0 0 1.5-.4l10.14-5.83a2 2 0 0 0 .95-1.38Z"
    />
    <path
      fill="#7C5AE2"
      d="M30 37.64V24.46l-12.6 5.57a2 2 0 0 0 .97 1.39l10.13 5.82a3 3 0 0 0 1.5.4Z"
    />
  </g>
  <rect width="59" height="59" x=".5" y=".5" stroke="#fff" stroke-opacity=".1" rx="29.5" />
  <defs>
    <clipPath id="a"><rect width="60" height="60" fill="#fff" rx="30" /></clipPath>
  </defs>
</svg> `;
const googleSvg = b`<svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="64" height="64" rx="30" fill="#1DC956"/>
  <rect x="0.5" y="0.5" width="63" height="63" rx="29.5" stroke="#141414" stroke-opacity="0.1"/>
  <path d="M32.4053 19.8031C35.3901 19.8031 38.0431 20.8349 40.1619 22.8247L45.9656 17.0211C42.4465 13.7416 37.8773 11.7333 32.4053 11.7333C24.4829 11.7333 17.6475 16.2841 14.3127 22.9168L21.056 28.1493C22.6589 23.359 27.136 19.8031 32.4053 19.8031Z" fill="#1DC956" stroke="white" stroke-width="2" stroke-linejoin="round"/>
  <path d="M32.4053 52.2667C37.8773 52.2667 42.465 50.4611 45.8182 47.3658L39.2407 42.2623C37.4351 43.4783 35.1321 44.2153 32.4053 44.2153C27.136 44.2153 22.6589 40.6594 21.056 35.8691L14.3127 41.1016C17.6475 47.7159 24.4829 52.2667 32.4053 52.2667Z" fill="#2BEE6C"/>
  <path d="M21.056 35.8507L19.5636 36.993L14.3127 41.0832M39.2407 42.2623L45.8182 47.3658C42.465 50.4611 37.8773 52.2667 32.4053 52.2667C24.4829 52.2667 17.6475 47.7159 14.3127 41.1016L21.056 35.8691C22.6589 40.6594 27.136 44.2153 32.4053 44.2153C35.1321 44.2153 37.4351 43.4783 39.2407 42.2623Z" stroke="white" stroke-width="2" stroke-linejoin="round"/>
  <path d="M51.8613 32.4606C51.8613 31.0235 51.7323 29.6417 51.4928 28.3151H32.4053V36.1638H43.3124C42.8334 38.688 41.3963 40.8252 39.2407 42.2623L45.8181 47.3658C49.6503 43.8283 51.8613 38.6327 51.8613 32.4606Z" fill="#1FAD7E" stroke="white" stroke-width="2" stroke-linejoin="round"/>
  <path d="M21.056 35.8507C20.6507 34.6347 20.4111 33.345 20.4111 32C20.4111 30.655 20.6507 29.3653 21.056 28.1493L14.3127 22.9169C12.9309 25.6437 12.1387 28.7205 12.1387 32C12.1387 35.2795 12.9309 38.3564 14.3127 41.0831L19.5636 36.993L21.056 35.8507Z" fill="#86F999"/>
  <path d="M21.056 35.8691L14.3127 41.1016M21.056 35.8507C20.6507 34.6347 20.4111 33.345 20.4111 32C20.4111 30.655 20.6507 29.3653 21.056 28.1493L14.3127 22.9169C12.9309 25.6437 12.1387 28.7205 12.1387 32C12.1387 35.2795 12.9309 38.3564 14.3127 41.0831L19.5636 36.993L21.056 35.8507Z" stroke="white" stroke-width="2" stroke-linejoin="round"/>
</svg>
`;
const layersSvg = b`<svg fill="none" viewBox="0 0 60 60">
  <rect width="60" height="60" fill="#1DC956" rx="3" />
  <path
    fill="#1FAD7E"
    stroke="#fff"
    stroke-width="2"
    d="m30.49 29.13-.49-.27-.49.27-12.77 7.1-.05.02c-.86.48-1.58.88-2.1 1.24-.54.37-1.04.81-1.28 1.45a3 3 0 0 0 0 2.12c.24.63.74 1.08 1.27 1.45.53.36 1.25.76 2.11 1.24l.05.03 6.33 3.51.17.1c2.33 1.3 3.72 2.06 5.22 2.32a9 9 0 0 0 3.08 0c1.5-.26 2.9-1.03 5.22-2.32l.18-.1 6.32-3.51.05-.03a26.9 26.9 0 0 0 2.1-1.24 3.21 3.21 0 0 0 1.28-1.45l-.94-.35.94.35a3 3 0 0 0 0-2.12l-.94.35.94-.35a3.21 3.21 0 0 0-1.27-1.45c-.53-.36-1.25-.76-2.11-1.24l-.05-.03-12.77-7.1Z"
  />
  <path
    fill="#2BEE6C"
    stroke="#fff"
    stroke-width="2"
    d="m30.49 19.13-.49-.27-.49.27-12.77 7.1-.05.02c-.86.48-1.58.88-2.1 1.24-.54.37-1.04.81-1.28 1.45a3 3 0 0 0 0 2.12c.24.63.74 1.08 1.27 1.45.53.36 1.25.76 2.11 1.24l.05.03 6.33 3.51.17.1c2.33 1.3 3.72 2.06 5.22 2.32a9 9 0 0 0 3.08 0c1.5-.26 2.9-1.03 5.22-2.32l.18-.1 6.32-3.51.05-.03a26.9 26.9 0 0 0 2.1-1.24 3.21 3.21 0 0 0 1.28-1.45l-.94-.35.94.35a3 3 0 0 0 0-2.12l-.94.35.94-.35a3.21 3.21 0 0 0-1.27-1.45c-.53-.36-1.25-.76-2.11-1.24l-.05-.03-12.77-7.1Z"
  />
  <path
    fill="#86F999"
    stroke="#fff"
    stroke-width="2"
    d="m46.69 21.06-.94-.35.94.35a3 3 0 0 0 0-2.12l-.94.35.94-.35a3.21 3.21 0 0 0-1.27-1.45c-.53-.36-1.25-.76-2.11-1.24l-.05-.03-6.32-3.51-.18-.1c-2.33-1.3-3.72-2.06-5.22-2.33a9 9 0 0 0-3.08 0c-1.5.27-2.9 1.04-5.22 2.33l-.17.1-6.33 3.51-.05.03c-.86.48-1.58.88-2.1 1.24-.54.37-1.04.81-1.28 1.45a3 3 0 0 0 0 2.12c.24.63.74 1.08 1.27 1.45.53.36 1.25.76 2.11 1.24l.05.03 6.33 3.51.17.1c2.33 1.3 3.72 2.06 5.22 2.32a9 9 0 0 0 3.08 0c1.5-.26 2.9-1.03 5.22-2.32l.18-.1 6.32-3.51.05-.03a26.9 26.9 0 0 0 2.1-1.24 3.21 3.21 0 0 0 1.28-1.45Z"
  />
  <rect width="59" height="59" x=".5" y=".5" stroke="#fff" stroke-opacity=".1" rx="2.5" />
</svg>`;
const lightbulbSvg = b`<svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g clip-path="url(#clip0_241_31636)">
    <path d="M0 26.5595C0 16.6913 0 11.7572 2.1019 8.07217C3.5216 5.58318 5.58366 3.52111 8.07266 2.10141C11.7577 -0.000488281 16.6918 -0.000488281 26.56 -0.000488281H37.44C47.3082 -0.000488281 52.2423 -0.000488281 55.9273 2.10141C58.4163 3.52111 60.4784 5.58318 61.8981 8.07217C64 11.7572 64 16.6913 64 26.5595V37.4395C64 47.3077 64 52.2418 61.8981 55.9269C60.4784 58.4159 58.4163 60.4779 55.9273 61.8976C52.2423 63.9995 47.3082 63.9995 37.44 63.9995H26.56C16.6918 63.9995 11.7577 63.9995 8.07266 61.8976C5.58366 60.4779 3.5216 58.4159 2.1019 55.9269C0 52.2418 0 47.3077 0 37.4395V26.5595Z" fill="#794CFF"/>
    <path d="M0.5 26.5595C0.5 21.6163 0.50047 17.942 0.760736 15.0418C1.02039 12.1485 1.53555 10.0742 2.53621 8.3199C3.91155 5.90869 5.90917 3.91106 8.32039 2.53572C10.0747 1.53506 12.1489 1.01991 15.0423 0.760247C17.9425 0.499981 21.6168 0.499512 26.56 0.499512H37.44C42.3832 0.499512 46.0575 0.499981 48.9577 0.760247C51.8511 1.01991 53.9253 1.53506 55.6796 2.53572C58.0908 3.91106 60.0885 5.90869 61.4638 8.3199C62.4645 10.0742 62.9796 12.1485 63.2393 15.0418C63.4995 17.942 63.5 21.6163 63.5 26.5595V37.4395C63.5 42.3827 63.4995 46.057 63.2393 48.9572C62.9796 51.8506 62.4645 53.9248 61.4638 55.6791C60.0885 58.0903 58.0908 60.088 55.6796 61.4633C53.9253 62.464 51.8511 62.9791 48.9577 63.2388C46.0575 63.499 42.3832 63.4995 37.44 63.4995H26.56C21.6168 63.4995 17.9425 63.499 15.0423 63.2388C12.1489 62.9791 10.0747 62.464 8.32039 61.4633C5.90917 60.088 3.91155 58.0903 2.53621 55.6791C1.53555 53.9248 1.02039 51.8506 0.760736 48.9572C0.50047 46.057 0.5 42.3827 0.5 37.4395V26.5595Z" stroke="#141414" stroke-opacity="0.1"/>
    <path d="M40 39.4595C44.7824 36.693 48 31.5222 48 25.6C48 16.7634 40.8366 9.59998 32 9.59998C23.1634 9.59998 16 16.7634 16 25.6C16 31.5222 19.2176 36.693 24 39.4595V45.8144H40V39.4595Z" fill="#906EF7"/>
    <path d="M24 49.9689C24 51.8192 24 52.7444 24.3941 53.4353C24.6603 53.902 25.0469 54.2886 25.5136 54.5548C26.2046 54.9489 27.1297 54.9489 28.98 54.9489H35.02C36.8703 54.9489 37.7954 54.9489 38.4864 54.5548C38.9531 54.2886 39.3397 53.902 39.6059 53.4353C40 52.7444 40 51.8192 40 49.9689V45.8144H24V49.9689Z" fill="#906EF7"/>
    <path d="M24 45.8144V39.4595C19.2176 36.693 16 31.5222 16 25.6C16 16.7634 23.1634 9.59998 32 9.59998C40.8366 9.59998 48 16.7634 48 25.6C48 31.5222 44.7824 36.693 40 39.4595V45.8144M24 45.8144H40M24 45.8144V49.9689C24 51.8192 24 52.7444 24.3941 53.4353C24.6603 53.902 25.0469 54.2886 25.5136 54.5548C26.2046 54.9489 27.1297 54.9489 28.98 54.9489H35.02C36.8703 54.9489 37.7954 54.9489 38.4864 54.5548C38.9531 54.2886 39.3397 53.902 39.6059 53.4353C40 52.7444 40 51.8192 40 49.9689V45.8144" stroke="white" stroke-width="2" stroke-linejoin="round"/>
    <path d="M24 49.9689C24 51.8192 24 52.7444 24.3941 53.4353C24.6603 53.902 25.0469 54.2886 25.5136 54.5548C26.2046 54.9489 27.1297 54.9489 28.98 54.9489H35.02C36.8703 54.9489 37.7954 54.9489 38.4864 54.5548C38.9531 54.2886 39.3397 53.902 39.6059 53.4353C40 52.7444 40 51.8192 40 49.9689V45.8144H24V49.9689Z" fill="#643CDD" stroke="white" stroke-width="2" stroke-linejoin="round"/>
    <path d="M29.6735 26.9101V29.1109H34.0753V26.9101C34.0753 25.6945 35.0607 24.7092 36.2762 24.7092C37.4917 24.7092 38.4771 25.6945 38.4771 26.9101C38.4771 28.1256 37.4917 29.1109 36.2762 29.1109H34.0753H29.6735H27.4726C26.2571 29.1109 25.2717 28.1256 25.2717 26.9101C25.2717 25.6945 26.2571 24.7092 27.4726 24.7092C28.6881 24.7092 29.6735 25.6945 29.6735 26.9101Z" fill="#906EF7"/>
    <path d="M29.6735 45.3183V26.9101C29.6735 25.6945 28.6881 24.7092 27.4726 24.7092V24.7092C26.2571 24.7092 25.2717 25.6945 25.2717 26.9101V26.9101C25.2717 28.1256 26.2571 29.1109 27.4726 29.1109H36.2762C37.4917 29.1109 38.4771 28.1256 38.4771 26.9101V26.9101C38.4771 25.6945 37.4917 24.7092 36.2762 24.7092V24.7092C35.0607 24.7092 34.0753 25.6945 34.0753 26.9101V45.3183" stroke="white" stroke-width="2" stroke-linejoin="round"/>
  </g>
  <defs>
    <clipPath id="clip0_241_31636">
      <rect width="64" height="64" fill="white"/>
    </clipPath>
  </defs>
</svg>
`;
const lockSvg = b`<svg fill="none" viewBox="0 0 60 60">
  <rect width="60" height="60" fill="#C653C6" rx="3" />
  <path
    fill="#fff"
    d="M20.03 15.22C20 15.6 20 16.07 20 17v2.8c0 1.14 0 1.7-.2 2.12-.15.31-.3.5-.58.71-.37.28-1.06.42-2.43.7-.59.12-1.11.29-1.6.51a9 9 0 0 0-4.35 4.36C10 30 10 32.34 10 37c0 4.66 0 7 .84 8.8a9 9 0 0 0 4.36 4.36C17 51 19.34 51 24 51h12c4.66 0 7 0 8.8-.84a9 9 0 0 0 4.36-4.36C50 44 50 41.66 50 37c0-4.66 0-7-.84-8.8a9 9 0 0 0-4.36-4.36c-.48-.22-1-.39-1.6-.5-1.36-.29-2.05-.43-2.42-.7-.27-.22-.43-.4-.58-.72-.2-.42-.2-.98-.2-2.11V17c0-.93 0-1.4-.03-1.78a9 9 0 0 0-8.19-8.19C31.4 7 30.93 7 30 7s-1.4 0-1.78.03a9 9 0 0 0-8.19 8.19Z"
  />
  <path
    fill="#E87DE8"
    d="M22 17c0-.93 0-1.4.04-1.78a7 7 0 0 1 6.18-6.18C28.6 9 29.07 9 30 9s1.4 0 1.78.04a7 7 0 0 1 6.18 6.18c.04.39.04.85.04 1.78v4.5a1.5 1.5 0 0 1-3 0V17c0-.93 0-1.4-.08-1.78a4 4 0 0 0-3.14-3.14C31.39 12 30.93 12 30 12s-1.4 0-1.78.08a4 4 0 0 0-3.14 3.14c-.08.39-.08.85-.08 1.78v4.5a1.5 1.5 0 0 1-3 0V17Z"
  />
  <path
    fill="#E87DE8"
    fill-rule="evenodd"
    d="M12 36.62c0-4.32 0-6.48.92-8.09a7 7 0 0 1 2.61-2.61C17.14 25 19.3 25 23.62 25h6.86c.46 0 .7 0 .9.02 2.73.22 4.37 2.43 4.62 4.98.27-2.7 2.11-5 5.02-5A6.98 6.98 0 0 1 48 31.98v5.4c0 4.32 0 6.48-.92 8.09a7 7 0 0 1-2.61 2.61c-1.61.92-3.77.92-8.09.92h-5.86c-.46 0-.7 0-.9-.02-2.73-.22-4.37-2.43-4.62-4.98-.26 2.58-1.94 4.82-4.71 4.99l-.7.01c-.55 0-.82 0-1.05-.02a7 7 0 0 1-6.52-6.52c-.02-.23-.02-.5-.02-1.05v-4.79Zm21.24-.27a4 4 0 1 0-6.48 0 31.28 31.28 0 0 1 1.57 2.23c.17.4.17.81.17 1.24V42.5a1.5 1.5 0 0 0 3 0V39.82c0-.43 0-.85.17-1.24.09-.2.58-.87 1.57-2.23Z"
    clip-rule="evenodd"
  />
  <rect width="59" height="59" x=".5" y=".5" stroke="#fff" stroke-opacity=".1" rx="2.5" />
</svg>`;
const loginSvg = b`<svg fill="none" viewBox="0 0 60 60">
  <g clip-path="url(#a)">
    <path
      fill="#EB8B47"
      d="M0 24.9c0-9.25 0-13.88 1.97-17.33a15 15 0 0 1 5.6-5.6C11.02 0 15.65 0 24.9 0h10.2c9.25 0 13.88 0 17.33 1.97a15 15 0 0 1 5.6 5.6C60 11.02 60 15.65 60 24.9v10.2c0 9.25 0 13.88-1.97 17.33a15 15 0 0 1-5.6 5.6C48.98 60 44.35 60 35.1 60H24.9c-9.25 0-13.88 0-17.33-1.97a15 15 0 0 1-5.6-5.6C0 48.98 0 44.35 0 35.1V24.9Z"
    />
    <path
      stroke="#062B2B"
      stroke-opacity=".1"
      d="M.5 24.9c0-4.64 0-8.08.24-10.8.25-2.7.73-4.65 1.66-6.28A14.5 14.5 0 0 1 7.82 2.4C9.46 1.47 11.39 1 14.1.74A133 133 0 0 1 24.9.5h10.2c4.63 0 8.08 0 10.8.24 2.7.25 4.65.73 6.28 1.66a14.5 14.5 0 0 1 5.42 5.42c.93 1.63 1.41 3.57 1.66 6.28.24 2.72.24 6.16.24 10.8v10.2c0 4.63 0 8.08-.24 10.8-.25 2.7-.73 4.64-1.66 6.28a14.5 14.5 0 0 1-5.42 5.41c-1.63.94-3.57 1.42-6.28 1.67-2.72.24-6.17.24-10.8.24H24.9c-4.63 0-8.08 0-10.8-.24-2.7-.25-4.64-.73-6.28-1.67a14.5 14.5 0 0 1-5.42-5.4C1.47 50.53 1 48.6.74 45.88A133 133 0 0 1 .5 35.1V24.9Z"
    />
    <path
      fill="#FF974C"
      stroke="#fff"
      stroke-width="2"
      d="M39.2 29.2a13 13 0 1 0-18.4 0l1.3 1.28a12.82 12.82 0 0 1 2.1 2.39 6 6 0 0 1 .6 1.47c.2.76.2 1.56.2 3.17v11.24c0 1.08 0 1.61.13 2.12a4 4 0 0 0 .41.98c.26.45.64.83 1.4 1.6l.3.29c.65.65.98.98 1.36 1.09.26.07.54.07.8 0 .38-.11.7-.44 1.36-1.1l3.48-3.47c.65-.65.98-.98 1.09-1.36a1.5 1.5 0 0 0 0-.8c-.1-.38-.44-.7-1.1-1.36l-.47-.48c-.65-.65-.98-.98-1.09-1.36a1.5 1.5 0 0 1 0-.8c.1-.38.44-.7 1.1-1.36l.47-.48c.65-.65.98-.98 1.09-1.36a1.5 1.5 0 0 0 0-.8c-.1-.38-.44-.7-1.1-1.36l-.48-.5c-.65-.64-.98-.97-1.08-1.35a1.5 1.5 0 0 1 0-.79c.1-.38.42-.7 1.06-1.36l5.46-5.55Z"
    />
    <circle cx="30" cy="17" r="4" fill="#EB8B47" stroke="#fff" stroke-width="2" />
  </g>
  <defs>
    <clipPath id="a"><path fill="#fff" d="M0 0h60v60H0z" /></clipPath>
  </defs>
</svg> `;
const meldSvg = b`<svg width="40" height="42" viewBox="0 0 40 42" fill="none">
<path opacity="0.7" d="M19.9526 41.9076L7.3877 34.655V26.1226L19.9526 33.3751V41.9076Z" fill="url(#paint0_linear_2113_32117)"/>
<path opacity="0.7" d="M19.9521 41.9076L32.5171 34.655V26.1226L19.9521 33.3751V41.9076Z" fill="url(#paint1_linear_2113_32117)"/>
<path opacity="0.7" d="M39.9095 7.34521V21.8562L32.5166 26.1225V11.6114L39.9095 7.34521Z" fill="url(#paint2_linear_2113_32117)"/>
<path d="M39.9099 7.34536L27.345 0.0927734L19.9521 4.359L32.5171 11.6116L39.9099 7.34536Z" fill="url(#paint3_linear_2113_32117)"/>
<path d="M0 7.34536L12.5649 0.0927734L19.9519 4.359L7.387 11.6116L0 7.34536Z" fill="#F969D3"/>
<path opacity="0.7" d="M0 7.34521V21.8562L7.387 26.1225V11.6114L0 7.34521Z" fill="url(#paint4_linear_2113_32117)"/>
<defs>
<linearGradient id="paint0_linear_2113_32117" x1="18.6099" y1="41.8335" x2="7.73529" y2="8.31842" gradientUnits="userSpaceOnUse">
<stop stop-color="#E98ADA"/>
<stop offset="1" stop-color="#7E4DBD"/>
</linearGradient>
<linearGradient id="paint1_linear_2113_32117" x1="26.2346" y1="26.1226" x2="26.2346" y2="41.9076" gradientUnits="userSpaceOnUse">
<stop stop-color="#719DED"/>
<stop offset="1" stop-color="#2545BE"/>
</linearGradient>
<linearGradient id="paint2_linear_2113_32117" x1="36.213" y1="7.34521" x2="36.213" y2="26.1225" gradientUnits="userSpaceOnUse">
<stop stop-color="#93EBFF"/>
<stop offset="1" stop-color="#197DDB"/>
</linearGradient>
<linearGradient id="paint3_linear_2113_32117" x1="29.931" y1="0.0927734" x2="38.2156" y2="14.8448" gradientUnits="userSpaceOnUse">
<stop stop-color="#F969D3"/>
<stop offset="1" stop-color="#4F51C0"/>
</linearGradient>
<linearGradient id="paint4_linear_2113_32117" x1="18.1251" y1="44.2539" x2="-7.06792" y2="15.2763" gradientUnits="userSpaceOnUse">
<stop stop-color="#E98ADA"/>
<stop offset="1" stop-color="#7E4DBD"/>
</linearGradient>
</defs>
</svg>`;
const networkSvg = b`<svg fill="none" viewBox="0 0 60 60">
  <g clip-path="url(#a)">
    <rect width="60" height="60" fill="#00ACE6" rx="30" />
    <circle cx="64" cy="39" r="50" fill="#1AC6FF" stroke="#fff" stroke-width="2" />
    <circle cx="78" cy="30" r="50" fill="#4DD2FF" stroke="#fff" stroke-width="2" />
    <circle cx="72" cy="15" r="35" fill="#80DFFF" stroke="#fff" stroke-width="2" />
    <circle cx="34" cy="-17" r="45" stroke="#fff" stroke-width="2" />
    <circle cx="34" cy="-5" r="50" stroke="#fff" stroke-width="2" />
    <circle cx="30" cy="45" r="4" fill="#4DD2FF" stroke="#fff" stroke-width="2" />
    <circle cx="39.5" cy="27.5" r="4" fill="#80DFFF" stroke="#fff" stroke-width="2" />
    <circle cx="16" cy="24" r="4" fill="#19C6FF" stroke="#fff" stroke-width="2" />
  </g>
  <rect width="59" height="59" x=".5" y=".5" stroke="#062B2B" stroke-opacity=".1" rx="29.5" />
  <defs>
    <clipPath id="a"><rect width="60" height="60" fill="#fff" rx="30" /></clipPath>
  </defs>
</svg>`;
const nftSvg = b`<svg fill="none" viewBox="0 0 60 60">
  <g clip-path="url(#a)">
    <rect width="60" height="60" fill="#C653C6" rx="3" />
    <path
      fill="#E87DE8"
      stroke="#fff"
      stroke-width="2"
      d="M52.1 47.34c0-4.24-1.44-9.55-5.9-12.4a2.86 2.86 0 0 0-1.6-3.89v-.82c0-1.19-.52-2.26-1.35-3a4.74 4.74 0 0 0-2.4-6.26v-5.5a11.31 11.31 0 1 0-22.63 0v2.15a3.34 3.34 0 0 0-1.18 5.05 4.74 4.74 0 0 0-.68 6.44A5.22 5.22 0 0 0 14 35.92c-3.06 4.13-6.1 8.3-6.1 15.64 0 2.67.37 4.86.74 6.39a20.3 20.3 0 0 0 .73 2.39l.02.04v.01l.92-.39-.92.4.26.6h38.26l.3-.49-.87-.51.86.5.02-.01.03-.07a16.32 16.32 0 0 0 .57-1.05c.36-.72.85-1.74 1.33-2.96a25.51 25.51 0 0 0 1.94-9.07Z"
    />
    <path
      fill="#fff"
      fill-rule="evenodd"
      d="M26.5 29.5c-3-.5-5.5-3-5.5-7v-7c0-.47 0-.7.03-.9a3 3 0 0 1 2.58-2.57c.2-.03.42-.03.89-.03 2 0 2.5-2.5 2.5-2.5s0 2.5 2.5 2.5c1.4 0 2.1 0 2.65.23a3 3 0 0 1 1.62 1.62c.23.55.23 1.25.23 2.65v6c0 4-3 7-6.5 7 1.35.23 4 0 6.5-2v9.53C34 38.5 31.5 40 28 40s-6-1.5-6-2.97L24 34l2.5 1.5v-6ZM26 47h4.5c2.5 0 3 4 3 5.5h-3l-1-1.5H26v-4Zm-6.25 5.5H24V57h-8c0-1 1-4.5 3.75-4.5Z"
      clip-rule="evenodd"
    />
  </g>
  <rect width="59" height="59" x=".5" y=".5" stroke="#fff" stroke-opacity=".1" rx="2.5" />
  <defs>
    <clipPath id="a"><rect width="60" height="60" fill="#fff" rx="3" /></clipPath>
  </defs>
</svg> `;
const nounSvg = b`<svg fill="none" viewBox="0 0 60 60">
  <rect width="60" height="60" fill="#794CFF" rx="3" />
  <path
    fill="#987DE8"
    stroke="#fff"
    stroke-width="2"
    d="M33 22.5v-1H16v5H8.5V36H13v-5h3v7.5h17V31h1v7.5h17v-17H34v5h-1v-4Z"
  />
  <path fill="#fff" d="M37.5 25h10v10h-10z" />
  <path fill="#4019B2" d="M42.5 25h5v10h-5z" />
  <path fill="#fff" d="M19.5 25h10v10h-10z" />
  <path fill="#4019B2" d="M24.5 25h5v10h-5z" />
  <path fill="#fff" d="M12 30.5h4V37h-4v-6.5Z" />
  <rect width="59" height="59" x=".5" y=".5" stroke="#fff" stroke-opacity=".1" rx="2.5" />
</svg>`;
const onrampCardSvg = b`<svg width="60" height="60" viewBox="0 0 60 60" fill="none">
<g clip-path="url(#clip0_13859_31161)">
  <path d="M0 24.8995C0 15.6481 0 11.0223 1.97053 7.56763C3.3015 5.2342 5.23468 3.30101 7.56812 1.97004C11.0228 -0.000488281 15.6485 -0.000488281 24.9 -0.000488281H35.1C44.3514 -0.000488281 48.9772 -0.000488281 52.4319 1.97004C54.7653 3.30101 56.6985 5.2342 58.0295 7.56763C60 11.0223 60 15.6481 60 24.8995V35.0995C60 44.351 60 48.9767 58.0295 52.4314C56.6985 54.7648 54.7653 56.698 52.4319 58.029C48.9772 59.9995 44.3514 59.9995 35.1 59.9995H24.9C15.6485 59.9995 11.0228 59.9995 7.56812 58.029C5.23468 56.698 3.3015 54.7648 1.97053 52.4314C0 48.9767 0 44.351 0 35.0995V24.8995Z" fill="#EB8B47"/>
  <path d="M0.5 24.8995C0.5 20.2647 0.50047 16.8216 0.744315 14.1045C0.987552 11.3941 1.46987 9.45455 2.40484 7.81536C3.69145 5.55971 5.56019 3.69096 7.81585 2.40435C9.45504 1.46938 11.3946 0.987064 14.105 0.743826C16.8221 0.499981 20.2652 0.499512 24.9 0.499512H35.1C39.7348 0.499512 43.1779 0.499981 45.895 0.743826C48.6054 0.987064 50.545 1.46938 52.1841 2.40435C54.4398 3.69096 56.3086 5.55971 57.5952 7.81536C58.5301 9.45455 59.0124 11.3941 59.2557 14.1045C59.4995 16.8216 59.5 20.2647 59.5 24.8995V35.0995C59.5 39.7343 59.4995 43.1774 59.2557 45.8945C59.0124 48.6049 58.5301 50.5445 57.5952 52.1837C56.3086 54.4393 54.4398 56.3081 52.1841 57.5947C50.545 58.5296 48.6054 59.012 45.895 59.2552C43.1779 59.499 39.7348 59.4995 35.1 59.4995H24.9C20.2652 59.4995 16.8221 59.499 14.105 59.2552C11.3946 59.012 9.45504 58.5296 7.81585 57.5947C5.56019 56.3081 3.69145 54.4393 2.40484 52.1837C1.46987 50.5445 0.987552 48.6049 0.744315 45.8945C0.50047 43.1774 0.5 39.7343 0.5 35.0995V24.8995Z" stroke="#141414" stroke-opacity="0.1"/>
  <path d="M13 26.0335C13 21.7838 13 19.659 14.0822 18.1694C14.4318 17.6883 14.8548 17.2653 15.3359 16.9157C16.8255 15.8335 18.9503 15.8335 23.2 15.8335H36.8C41.0497 15.8335 43.1745 15.8335 44.6641 16.9157C45.1452 17.2653 45.5682 17.6883 45.9178 18.1694C47 19.659 47 21.7838 47 26.0335V33.9668C47 38.2165 47 40.3414 45.9178 41.831C45.5682 42.312 45.1452 42.7351 44.6641 43.0846C43.1745 44.1668 41.0497 44.1668 36.8 44.1668H23.2C18.9503 44.1668 16.8255 44.1668 15.3359 43.0846C14.8548 42.7351 14.4318 42.312 14.0822 41.831C13 40.3414 13 38.2165 13 33.9668V26.0335Z" fill="#FF974C" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M39.5 36.667H36.6666" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M45.2 23.0645H14.8C14.0501 23.0645 13.6751 23.0645 13.4122 23.2554C13.3273 23.3171 13.2527 23.3918 13.191 23.4767C13 23.7395 13 24.1145 13 24.8645V27.2645C13 28.0144 13 28.3894 13.191 28.6522C13.2527 28.7371 13.3273 28.8118 13.4122 28.8735C13.6751 29.0645 14.0501 29.0645 14.8 29.0645H45.2C45.9499 29.0645 46.3249 29.0645 46.5878 28.8735C46.6727 28.8118 46.7473 28.7371 46.809 28.6522C47 28.3894 47 28.0144 47 27.2645V24.8645C47 24.1145 47 23.7395 46.809 23.4767C46.7473 23.3918 46.6727 23.3171 46.5878 23.2554C46.3249 23.0645 45.9499 23.0645 45.2 23.0645Z" fill="white" fill-opacity="0.4" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</g>
<defs>
  <clipPath id="clip0_13859_31161">
    <rect width="60" height="60" fill="white"/>
  </clipPath>
</defs>
</svg>`;
const pencilSvg = b`<svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g clip-path="url(#clip0_241_31635)">
    <path d="M0 26.5595C0 16.6913 0 11.7572 2.1019 8.07217C3.5216 5.58317 5.58366 3.52111 8.07266 2.10141C11.7577 -0.000488281 16.6918 -0.000488281 26.56 -0.000488281H37.44C47.3082 -0.000488281 52.2423 -0.000488281 55.9273 2.10141C58.4163 3.52111 60.4784 5.58317 61.8981 8.07217C64 11.7572 64 16.6913 64 26.5595V37.4395C64 47.3077 64 52.2418 61.8981 55.9268C60.4784 58.4158 58.4163 60.4779 55.9273 61.8976C52.2423 63.9995 47.3082 63.9995 37.44 63.9995H26.56C16.6918 63.9995 11.7577 63.9995 8.07266 61.8976C5.58366 60.4779 3.5216 58.4158 2.1019 55.9268C0 52.2418 0 47.3077 0 37.4395V26.5595Z" fill="#EB8B47"/>
    <path d="M0.5 26.5595C0.5 21.6163 0.50047 17.942 0.760736 15.0418C1.02039 12.1485 1.53555 10.0742 2.53621 8.3199C3.91155 5.90869 5.90917 3.91106 8.32039 2.53572C10.0747 1.53506 12.1489 1.01991 15.0423 0.760247C17.9425 0.499981 21.6168 0.499512 26.56 0.499512H37.44C42.3832 0.499512 46.0575 0.499981 48.9577 0.760247C51.8511 1.01991 53.9253 1.53506 55.6796 2.53572C58.0908 3.91106 60.0885 5.90869 61.4638 8.3199C62.4645 10.0742 62.9796 12.1485 63.2393 15.0418C63.4995 17.942 63.5 21.6163 63.5 26.5595V37.4395C63.5 42.3827 63.4995 46.057 63.2393 48.9572C62.9796 51.8506 62.4645 53.9248 61.4638 55.6791C60.0885 58.0903 58.0908 60.088 55.6796 61.4633C53.9253 62.464 51.8511 62.9791 48.9577 63.2388C46.0575 63.499 42.3832 63.4995 37.44 63.4995H26.56C21.6168 63.4995 17.9425 63.499 15.0423 63.2388C12.1489 62.9791 10.0747 62.464 8.32039 61.4633C5.90917 60.088 3.91155 58.0903 2.53621 55.6791C1.53555 53.9248 1.02039 51.8506 0.760736 48.9572C0.50047 46.057 0.5 42.3827 0.5 37.4395V26.5595Z" stroke="#141414" stroke-opacity="0.1"/>
    <path d="M28.1042 49.2329L13.1024 51.2077L15.0772 36.2059L37.1015 14.1815C39.2441 12.039 40.3154 10.9677 41.5718 10.624C42.4205 10.3918 43.3159 10.3918 44.1645 10.624C45.421 10.9677 46.4922 12.039 48.6348 14.1815L50.1286 15.6753C52.2711 17.8179 53.3424 18.8891 53.6861 20.1456C53.9183 20.9942 53.9183 21.8896 53.6861 22.7383C53.3424 23.9947 52.2711 25.066 50.1286 27.2086L28.1042 49.2329Z" fill="#FF974C" stroke="#E4E7E7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M38.5962 20.5376L22.4199 36.7139" stroke="#E4E7E7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M43.7727 25.714L27.5964 41.8903" stroke="#E4E7E7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M22.3703 36.7635C19.3258 39.808 16.0198 36.6395 16.2616 35.0324" stroke="#E4E7E7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M27.5466 41.9399C24.5034 44.9831 28.155 48.7098 29.2738 48.0475" stroke="#E4E7E7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M27.5468 41.9398C23.428 46.0586 18.2516 40.8822 22.3704 36.7634" stroke="#E4E7E7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M15.8191 50.5214C15.4711 49.5823 14.728 48.8392 13.7889 48.4912" stroke="#E4E7E7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M49.2862 29.5805L34.7275 15.0219" stroke="#E4E7E7" stroke-width="2" stroke-linejoin="round"/>
  </g>
  <defs>
    <clipPath id="clip0_241_31635">
      <rect width="64" height="64" fill="white"/>
    </clipPath>
  </defs>
</svg>
`;
const profileSvg = b`<svg
  viewBox="0 0 60 60"
  fill="none"
>
  <g clip-path="url(#1)">
    <rect width="60" height="60" rx="30" fill="#00ACE6" />
    <path
      d="M59 73C59 89.0163 46.0163 102 30 102C13.9837 102 1 89.0163 1 73C1 56.9837 12 44 30 44C48 44 59 56.9837 59 73Z"
      fill="#1AC6FF"
      stroke="white"
      stroke-width="2"
    />
    <path
      d="M18.6904 19.9015C19.6264 15.3286 23.3466 11.8445 27.9708 11.2096C29.3231 11.024 30.6751 11.0238 32.0289 11.2096C36.6532 11.8445 40.3733 15.3286 41.3094 19.9015C41.4868 20.7681 41.6309 21.6509 41.7492 22.5271C41.8811 23.5041 41.8811 24.4944 41.7492 25.4715C41.6309 26.3476 41.4868 27.2304 41.3094 28.097C40.3733 32.6699 36.6532 36.154 32.0289 36.7889C30.6772 36.9744 29.3216 36.9743 27.9708 36.7889C23.3466 36.154 19.6264 32.6699 18.6904 28.097C18.513 27.2304 18.3689 26.3476 18.2506 25.4715C18.1186 24.4944 18.1186 23.5041 18.2506 22.5271C18.3689 21.6509 18.513 20.7681 18.6904 19.9015Z"
      fill="#1AC6FF"
      stroke="white"
      stroke-width="2"
    />
    <circle cx="24.5" cy="23.5" r="1.5" fill="white" />
    <circle cx="35.5" cy="23.5" r="1.5" fill="white" />
    <path
      d="M31 20L28 28H32"
      stroke="white"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </g>
  <rect x="0.5" y="0.5" width="59" height="59" rx="29.5" stroke="white" stroke-opacity="0.1" />
  <defs>
    <clipPath id="1">
      <rect width="60" height="60" rx="30" fill="white" />
    </clipPath>
  </defs>
</svg> `;
const solanaSvg = b`<svg fill="none" viewBox="0 0 80 80">
  <g clip-path="url(#a)">
    <path fill="url(#b)" d="M40 80a40 40 0 1 0 0-80 40 40 0 0 0 0 80Z" />
    <path
      stroke="#fff"
      stroke-opacity=".1"
      d="M79.5 40a39.5 39.5 0 1 1-79 0 39.5 39.5 0 0 1 79 0Z"
    />
    <path
      fill="#fff"
      d="m62.62 51.54-7.54 7.91a1.75 1.75 0 0 1-1.29.55H18.02a.9.9 0 0 1-.8-.52.84.84 0 0 1 .16-.92l7.55-7.92a1.75 1.75 0 0 1 1.28-.55h35.77a.87.87 0 0 1 .8.52.84.84 0 0 1-.16.93Zm-7.54-15.95a1.75 1.75 0 0 0-1.29-.54H18.02a.89.89 0 0 0-.8.51.84.84 0 0 0 .16.93l7.55 7.92a1.75 1.75 0 0 0 1.28.54h35.77a.89.89 0 0 0 .8-.51.84.84 0 0 0-.16-.93l-7.54-7.92ZM18.02 29.9h35.77a1.79 1.79 0 0 0 1.29-.54l7.54-7.92a.85.85 0 0 0 .16-.93.87.87 0 0 0-.8-.51H26.21a1.79 1.79 0 0 0-1.28.54l-7.55 7.92a.85.85 0 0 0-.16.93.89.89 0 0 0 .8.52Z"
    />
  </g>
  <defs>
    <linearGradient id="b" x1="6.75" x2="80.68" y1="81.91" y2="7.37" gradientUnits="userSpaceOnUse">
      <stop offset=".08" stop-color="#9945FF" />
      <stop offset=".3" stop-color="#8752F3" />
      <stop offset=".5" stop-color="#5497D5" />
      <stop offset=".6" stop-color="#43B4CA" />
      <stop offset=".72" stop-color="#28E0B9" />
      <stop offset=".97" stop-color="#19FB9B" />
    </linearGradient>
    <clipPath id="a"><path fill="#fff" d="M0 0h80v80H0z" /></clipPath>
  </defs>
</svg> `;
const systemSvg = b`<svg viewBox="0 0 60 60" fill="none">
  <g clip-path="url(#1)">
    <path
      d="M0 24.9C0 15.6485 0 11.0228 1.97053 7.56812C3.3015 5.23468 5.23468 3.3015 7.56812 1.97053C11.0228 0 15.6485 0 24.9 0H35.1C44.3514 0 48.9772 0 52.4319 1.97053C54.7653 3.3015 56.6985 5.23468 58.0295 7.56812C60 11.0228 60 15.6485 60 24.9V35.1C60 44.3514 60 48.9772 58.0295 52.4319C56.6985 54.7653 54.7653 56.6985 52.4319 58.0295C48.9772 60 44.3514 60 35.1 60H24.9C15.6485 60 11.0228 60 7.56812 58.0295C5.23468 56.6985 3.3015 54.7653 1.97053 52.4319C0 48.9772 0 44.3514 0 35.1V24.9Z"
      fill="#794CFF"
    />
    <path
      d="M0.5 24.9C0.5 20.2652 0.50047 16.8221 0.744315 14.105C0.987552 11.3946 1.46987 9.45504 2.40484 7.81585C3.69145 5.56019 5.56019 3.69145 7.81585 2.40484C9.45504 1.46987 11.3946 0.987552 14.105 0.744315C16.8221 0.50047 20.2652 0.5 24.9 0.5H35.1C39.7348 0.5 43.1779 0.50047 45.895 0.744315C48.6054 0.987552 50.545 1.46987 52.1841 2.40484C54.4398 3.69145 56.3086 5.56019 57.5952 7.81585C58.5301 9.45504 59.0124 11.3946 59.2557 14.105C59.4995 16.8221 59.5 20.2652 59.5 24.9V35.1C59.5 39.7348 59.4995 43.1779 59.2557 45.895C59.0124 48.6054 58.5301 50.545 57.5952 52.1841C56.3086 54.4398 54.4398 56.3086 52.1841 57.5952C50.545 58.5301 48.6054 59.0124 45.895 59.2557C43.1779 59.4995 39.7348 59.5 35.1 59.5H24.9C20.2652 59.5 16.8221 59.4995 14.105 59.2557C11.3946 59.0124 9.45504 58.5301 7.81585 57.5952C5.56019 56.3086 3.69145 54.4398 2.40484 52.1841C1.46987 50.545 0.987552 48.6054 0.744315 45.895C0.50047 43.1779 0.5 39.7348 0.5 35.1V24.9Z"
      stroke="#062B2B"
      stroke-opacity="0.1"
    />
    <path
      d="M35.1403 31.5016C35.1193 30.9637 35.388 30.4558 35.8446 30.1707C36.1207 29.9982 36.4761 29.8473 36.7921 29.7685C37.3143 29.6382 37.8664 29.7977 38.2386 30.1864C38.8507 30.8257 39.3004 31.6836 39.8033 32.408C40.2796 33.0942 41.4695 33.2512 41.9687 32.5047C42.4839 31.7341 42.9405 30.8229 43.572 30.1399C43.9375 29.7447 44.4866 29.5756 45.0111 29.6967C45.3283 29.7701 45.6863 29.9147 45.9655 30.0823C46.4269 30.3595 46.7045 30.8626 46.6928 31.4008C46.6731 32.3083 46.3764 33.2571 46.2158 34.1473C46.061 35.0048 46.9045 35.8337 47.7592 35.664C48.6464 35.4878 49.5899 35.1747 50.497 35.1391C51.0348 35.1181 51.5427 35.3868 51.8279 35.8433C52.0004 36.1195 52.1513 36.4749 52.2301 36.7908C52.3604 37.3131 52.2009 37.8651 51.8121 38.2374C51.1729 38.8495 50.3151 39.2991 49.5908 39.8019C48.9046 40.2782 48.7473 41.4683 49.4939 41.9675C50.2644 42.4827 51.1757 42.9393 51.8587 43.5708C52.2539 43.9362 52.423 44.4854 52.3018 45.0099C52.2285 45.3271 52.0839 45.6851 51.9162 45.9642C51.6391 46.4257 51.1359 46.7032 50.5978 46.6916C49.6903 46.6719 48.7417 46.3753 47.8516 46.2146C46.9939 46.0598 46.1648 46.9035 46.3346 47.7583C46.5108 48.6454 46.8239 49.5888 46.8594 50.4958C46.8805 51.0336 46.6117 51.5415 46.1552 51.8267C45.879 51.9992 45.5236 52.15 45.2077 52.2289C44.6854 52.3592 44.1334 52.1997 43.7611 51.8109C43.1491 51.1718 42.6996 50.314 42.1968 49.5897C41.7203 48.9034 40.5301 48.7463 40.0309 49.493C39.5157 50.2634 39.0592 51.1746 38.4278 51.8574C38.0623 52.2527 37.5132 52.4218 36.9887 52.3006C36.6715 52.2273 36.3135 52.0826 36.0343 51.915C35.5729 51.6379 35.2953 51.1347 35.307 50.5966C35.3267 49.6891 35.6233 48.7405 35.7839 47.8505C35.9388 46.9928 35.0951 46.1636 34.2402 46.3334C33.3531 46.5096 32.4098 46.8227 31.5028 46.8582C30.9649 46.8793 30.457 46.6105 30.1719 46.154C29.9994 45.8778 29.8485 45.5224 29.7697 45.2065C29.6394 44.6842 29.7989 44.1322 30.1877 43.7599C30.8269 43.1479 31.6847 42.6982 32.4091 42.1954C33.0954 41.7189 33.2522 40.5289 32.5056 40.0297C31.7351 39.5145 30.824 39.058 30.1411 38.4265C29.7459 38.0611 29.5768 37.5119 29.698 36.9875C29.7713 36.6702 29.9159 36.3122 30.0836 36.0331C30.3607 35.5717 30.8638 35.2941 31.402 35.3058C32.3095 35.3255 33.2583 35.6221 34.1485 35.7828C35.006 35.9376 35.8349 35.094 35.6652 34.2393C35.489 33.3521 35.1759 32.4087 35.1403 31.5016Z"
      fill="#906EF7"
      stroke="white"
      stroke-width="2"
    />
    <path
      d="M20.7706 8.22357C20.9036 7.51411 21.5231 7 22.2449 7H23.7551C24.4769 7 25.0964 7.51411 25.2294 8.22357C25.5051 9.69403 25.4829 11.6321 27.1202 12.2606C27.3092 12.3331 27.4958 12.4105 27.6798 12.4926C29.2818 13.2072 30.6374 11.8199 31.8721 10.9752C32.4678 10.5676 33.2694 10.6421 33.7798 11.1525L34.8477 12.2204C35.3581 12.7308 35.4326 13.5323 35.025 14.128C34.1802 15.3627 32.7931 16.7183 33.5077 18.3202C33.5898 18.5043 33.6672 18.6909 33.7398 18.88C34.3683 20.5171 36.3061 20.4949 37.7764 20.7706C38.4859 20.9036 39 21.5231 39 22.2449V23.7551C39 24.4769 38.4859 25.0964 37.7764 25.2294C36.3061 25.5051 34.3685 25.483 33.7401 27.1201C33.6675 27.3093 33.59 27.4961 33.5079 27.6803C32.7934 29.282 34.1803 30.6374 35.025 31.8719C35.4326 32.4677 35.3581 33.2692 34.8477 33.7796L33.7798 34.8475C33.2694 35.3579 32.4678 35.4324 31.8721 35.0248C30.6376 34.1801 29.2823 32.7934 27.6806 33.508C27.4962 33.5903 27.3093 33.6678 27.12 33.7405C25.483 34.3688 25.5051 36.3062 25.2294 37.7764C25.0964 38.4859 24.4769 39 23.7551 39H22.2449C21.5231 39 20.9036 38.4859 20.7706 37.7764C20.4949 36.3062 20.517 34.3688 18.88 33.7405C18.6908 33.6678 18.5039 33.5903 18.3196 33.5081C16.7179 32.7936 15.3625 34.1804 14.1279 35.0251C13.5322 35.4327 12.7307 35.3582 12.2203 34.8478L11.1524 33.7799C10.642 33.2695 10.5675 32.4679 10.9751 31.8722C11.8198 30.6376 13.2067 29.2822 12.4922 27.6804C12.41 27.4962 12.3325 27.3093 12.2599 27.1201C11.6315 25.483 9.69392 25.5051 8.22357 25.2294C7.51411 25.0964 7 24.4769 7 23.7551V22.2449C7 21.5231 7.51411 20.9036 8.22357 20.7706C9.69394 20.4949 11.6317 20.5171 12.2602 18.88C12.3328 18.6909 12.4103 18.5042 12.4924 18.3201C13.207 16.7181 11.8198 15.3625 10.975 14.1278C10.5674 13.5321 10.6419 12.7305 11.1523 12.2201L12.2202 11.1522C12.7306 10.6418 13.5322 10.5673 14.1279 10.9749C15.3626 11.8197 16.7184 13.2071 18.3204 12.4925C18.5044 12.4105 18.6909 12.3331 18.8799 12.2606C20.5171 11.6321 20.4949 9.69403 20.7706 8.22357Z"
      fill="#906EF7"
      stroke="white"
      stroke-width="2"
    />
    <circle cx="23" cy="23" r="6" fill="#794CFF" stroke="white" stroke-width="2" />
    <circle cx="41" cy="41" r="4" fill="#794CFF" stroke="white" stroke-width="2" />
  </g>
  <defs>
    <clipPath id="1">
      <rect width="60" height="60" fill="white" />
    </clipPath>
  </defs>
</svg> `;
const styles$o = i`
  :host {
    display: block;
    width: var(--local-size);
    height: var(--local-size);
  }

  :host svg {
    width: 100%;
    height: 100%;
  }
`;
var __decorate$o = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
const svgOptions = {
  browser: browserSvg,
  dao: daoSvg,
  defi: defiSvg,
  defiAlt: defiAltSvg,
  eth: ethSvg,
  layers: layersSvg,
  lock: lockSvg,
  login: loginSvg,
  network: networkSvg,
  nft: nftSvg,
  noun: nounSvg,
  profile: profileSvg,
  system: systemSvg,
  meld: meldSvg,
  onrampCard: onrampCardSvg,
  google: googleSvg,
  pencil: pencilSvg,
  lightbulb: lightbulbSvg,
  solana: solanaSvg,
  ton: tonSvg,
  bitcoin: bitcoinSvg
};
let WuiVisual = class WuiVisual2 extends i$1 {
  constructor() {
    super(...arguments);
    this.name = "browser";
    this.size = "md";
  }
  render() {
    this.style.cssText = `
       --local-size: var(--apkt-visual-size-${this.size});
   `;
    return T`${svgOptions[this.name]}`;
  }
};
WuiVisual.styles = [resetStyles, styles$o];
__decorate$o([
  n()
], WuiVisual.prototype, "name", void 0);
__decorate$o([
  n()
], WuiVisual.prototype, "size", void 0);
WuiVisual = __decorate$o([
  customElement("wui-visual")
], WuiVisual);
const styles$n = css`
  :host {
    display: block;
    width: 120px;
    height: 120px;
  }

  svg {
    width: 120px;
    height: 120px;
    fill: none;
    stroke: transparent;
    stroke-linecap: round;
  }

  use {
    stroke: ${(tokens2) => tokens2.colors.accent100};
    stroke-width: 2px;
    stroke-dasharray: 54, 118;
    stroke-dashoffset: 172;
    animation: dash 1s linear infinite;
  }

  @keyframes dash {
    to {
      stroke-dashoffset: 0px;
    }
  }
`;
var __decorate$n = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
let WuiLoadingHexagon = class WuiLoadingHexagon2 extends i$1 {
  render() {
    return T`
      <svg viewBox="0 0 54 59">
        <path
          id="wui-loader-path"
          d="M17.22 5.295c3.877-2.277 5.737-3.363 7.72-3.726a11.44 11.44 0 0 1 4.12 0c1.983.363 3.844 1.45 7.72 3.726l6.065 3.562c3.876 2.276 5.731 3.372 7.032 4.938a11.896 11.896 0 0 1 2.06 3.63c.683 1.928.688 4.11.688 8.663v7.124c0 4.553-.005 6.735-.688 8.664a11.896 11.896 0 0 1-2.06 3.63c-1.3 1.565-3.156 2.66-7.032 4.937l-6.065 3.563c-3.877 2.276-5.737 3.362-7.72 3.725a11.46 11.46 0 0 1-4.12 0c-1.983-.363-3.844-1.449-7.72-3.726l-6.065-3.562c-3.876-2.276-5.731-3.372-7.032-4.938a11.885 11.885 0 0 1-2.06-3.63c-.682-1.928-.688-4.11-.688-8.663v-7.124c0-4.553.006-6.735.688-8.664a11.885 11.885 0 0 1 2.06-3.63c1.3-1.565 3.156-2.66 7.032-4.937l6.065-3.562Z"
        />
        <use xlink:href="#wui-loader-path"></use>
      </svg>
    `;
  }
};
WuiLoadingHexagon.styles = [resetStyles, styles$n];
WuiLoadingHexagon = __decorate$n([
  customElement("wui-loading-hexagon")
], WuiLoadingHexagon);
const networkSvgLg = b`<svg width="86" height="96" fill="none">
  <path
    d="M78.3244 18.926L50.1808 2.45078C45.7376 -0.150261 40.2624 -0.150262 35.8192 2.45078L7.6756 18.926C3.23322 21.5266 0.5 26.3301 0.5 31.5248V64.4752C0.5 69.6699 3.23322 74.4734 7.6756 77.074L35.8192 93.5492C40.2624 96.1503 45.7376 96.1503 50.1808 93.5492L78.3244 77.074C82.7668 74.4734 85.5 69.6699 85.5 64.4752V31.5248C85.5 26.3301 82.7668 21.5266 78.3244 18.926Z"
  />
</svg>`;
const networkSvgSm = b`
  <svg fill="none" viewBox="0 0 36 40">
    <path
      d="M15.4 2.1a5.21 5.21 0 0 1 5.2 0l11.61 6.7a5.21 5.21 0 0 1 2.61 4.52v13.4c0 1.87-1 3.59-2.6 4.52l-11.61 6.7c-1.62.93-3.6.93-5.22 0l-11.6-6.7a5.21 5.21 0 0 1-2.61-4.51v-13.4c0-1.87 1-3.6 2.6-4.52L15.4 2.1Z"
    />
  </svg>
`;
const styles$m = css`
  :host {
    position: relative;
    border-radius: inherit;
    display: flex;
    justify-content: center;
    align-items: center;
    width: var(--local-width);
    height: var(--local-height);
  }

  :host([data-round='true']) {
    background: ${({ tokens: tokens2 }) => tokens2.theme.foregroundPrimary};
    border-radius: 100%;
    outline: 1px solid ${({ tokens: tokens2 }) => tokens2.core.glass010};
  }

  svg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
  }

  svg > path {
    stroke: var(--local-stroke);
  }

  wui-image {
    width: 100%;
    height: 100%;
    -webkit-clip-path: var(--local-path);
    clip-path: var(--local-path);
    background: ${({ tokens: tokens2 }) => tokens2.theme.foregroundPrimary};
  }

  wui-icon {
    transform: translateY(-5%);
    width: var(--local-icon-size);
    height: var(--local-icon-size);
  }
`;
var __decorate$m = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
let WuiNetworkImage = class WuiNetworkImage2 extends i$1 {
  constructor() {
    super(...arguments);
    this.size = "md";
    this.name = "uknown";
    this.networkImagesBySize = {
      sm: networkSvgSm,
      md: networkSvgMd,
      lg: networkSvgLg
    };
    this.selected = false;
    this.round = false;
  }
  render() {
    const getSize = {
      sm: "4",
      md: "6",
      lg: "10"
    };
    if (this.round) {
      this.dataset["round"] = "true";
      this.style.cssText = `
      --local-width: var(--apkt-spacing-10);
      --local-height: var(--apkt-spacing-10);
      --local-icon-size: var(--apkt-spacing-4);
    `;
    } else {
      this.style.cssText = `

      --local-path: var(--apkt-path-network-${this.size});
      --local-width:  var(--apkt-width-network-${this.size});
      --local-height:  var(--apkt-height-network-${this.size});
      --local-icon-size:  var(--apkt-spacing-${getSize[this.size]});
    `;
    }
    return T`${this.templateVisual()} ${this.svgTemplate()} `;
  }
  svgTemplate() {
    if (this.round) {
      return null;
    }
    return this.networkImagesBySize[this.size];
  }
  templateVisual() {
    if (this.imageSrc) {
      return T`<wui-image src=${this.imageSrc} alt=${this.name}></wui-image>`;
    }
    return T`<wui-icon size="inherit" color="default" name="networkPlaceholder"></wui-icon>`;
  }
};
WuiNetworkImage.styles = [resetStyles, styles$m];
__decorate$m([
  n()
], WuiNetworkImage.prototype, "size", void 0);
__decorate$m([
  n()
], WuiNetworkImage.prototype, "name", void 0);
__decorate$m([
  n({ type: Object })
], WuiNetworkImage.prototype, "networkImagesBySize", void 0);
__decorate$m([
  n()
], WuiNetworkImage.prototype, "imageSrc", void 0);
__decorate$m([
  n({ type: Boolean })
], WuiNetworkImage.prototype, "selected", void 0);
__decorate$m([
  n({ type: Boolean })
], WuiNetworkImage.prototype, "round", void 0);
WuiNetworkImage = __decorate$m([
  customElement("wui-network-image")
], WuiNetworkImage);
const styles$l = css`
  :host {
    width: 100%;
  }

  button {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: ${({ spacing: spacing2 }) => spacing2[3]};
    width: 100%;
    background-color: transparent;
    border-radius: ${({ borderRadius: borderRadius2 }) => borderRadius2[4]};
  }

  wui-text {
    text-transform: capitalize;
  }

  @media (hover: hover) {
    button:hover:enabled {
      background-color: ${({ tokens: tokens2 }) => tokens2.theme.foregroundPrimary};
    }
  }

  button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
var __decorate$l = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
let WuiListNetwork = class WuiListNetwork2 extends i$1 {
  constructor() {
    super(...arguments);
    this.imageSrc = void 0;
    this.name = "Ethereum";
    this.disabled = false;
  }
  render() {
    return T`
      <button ?disabled=${this.disabled} tabindex=${o(this.tabIdx)}>
        <wui-flex gap="2" alignItems="center">
          ${this.imageTemplate()}
          <wui-text variant="lg-regular" color="primary">${this.name}</wui-text>
        </wui-flex>
        <wui-icon name="chevronRight" size="lg" color="default"></wui-icon>
      </button>
    `;
  }
  imageTemplate() {
    if (this.imageSrc) {
      return T`<wui-image ?boxed=${true} src=${this.imageSrc}></wui-image>`;
    }
    return T`<wui-image
      ?boxed=${true}
      icon="networkPlaceholder"
      size="lg"
      iconColor="default"
    ></wui-image>`;
  }
};
WuiListNetwork.styles = [resetStyles, elementStyles, styles$l];
__decorate$l([
  n()
], WuiListNetwork.prototype, "imageSrc", void 0);
__decorate$l([
  n()
], WuiListNetwork.prototype, "name", void 0);
__decorate$l([
  n()
], WuiListNetwork.prototype, "tabIdx", void 0);
__decorate$l([
  n({ type: Boolean })
], WuiListNetwork.prototype, "disabled", void 0);
WuiListNetwork = __decorate$l([
  customElement("wui-list-network")
], WuiListNetwork);
const styles$k = css`
  wui-flex {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: ${({ spacing: spacing2 }) => spacing2[2]};
    border-radius: ${({ borderRadius: borderRadius2 }) => borderRadius2[4]};
    padding: ${({ spacing: spacing2 }) => spacing2[3]};
  }

  /* -- Types --------------------------------------------------------- */
  wui-flex[data-type='info'] {
    color: ${({ tokens: tokens2 }) => tokens2.theme.textSecondary};
    background-color: ${({ tokens: tokens2 }) => tokens2.theme.foregroundPrimary};
  }

  wui-flex[data-type='success'] {
    color: ${({ tokens: tokens2 }) => tokens2.core.textSuccess};
    background-color: ${({ tokens: tokens2 }) => tokens2.core.backgroundSuccess};
  }

  wui-flex[data-type='error'] {
    color: ${({ tokens: tokens2 }) => tokens2.core.textError};
    background-color: ${({ tokens: tokens2 }) => tokens2.core.backgroundError};
  }

  wui-flex[data-type='warning'] {
    color: ${({ tokens: tokens2 }) => tokens2.core.textWarning};
    background-color: ${({ tokens: tokens2 }) => tokens2.core.backgroundWarning};
  }

  wui-flex[data-type='info'] wui-icon-box {
    background-color: ${({ tokens: tokens2 }) => tokens2.theme.foregroundSecondary};
  }

  wui-flex[data-type='success'] wui-icon-box {
    background-color: ${({ tokens: tokens2 }) => tokens2.core.backgroundSuccess};
  }

  wui-flex[data-type='error'] wui-icon-box {
    background-color: ${({ tokens: tokens2 }) => tokens2.core.backgroundError};
  }

  wui-flex[data-type='warning'] wui-icon-box {
    background-color: ${({ tokens: tokens2 }) => tokens2.core.backgroundWarning};
  }

  wui-text {
    flex: 1;
  }
`;
var __decorate$k = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
let WuiBanner = class WuiBanner2 extends i$1 {
  constructor() {
    super(...arguments);
    this.icon = "externalLink";
    this.text = "";
    this.type = "info";
  }
  render() {
    return T`
      <wui-flex alignItems="center" data-type=${this.type}>
        <wui-icon-box size="sm" color="inherit" icon=${this.icon}></wui-icon-box>
        <wui-text variant="md-regular" color="inherit">${this.text}</wui-text>
      </wui-flex>
    `;
  }
};
WuiBanner.styles = [resetStyles, elementStyles, styles$k];
__decorate$k([
  n()
], WuiBanner.prototype, "icon", void 0);
__decorate$k([
  n()
], WuiBanner.prototype, "text", void 0);
__decorate$k([
  n()
], WuiBanner.prototype, "type", void 0);
WuiBanner = __decorate$k([
  customElement("wui-banner")
], WuiBanner);
const styles$j = css`
  :host {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 56px;
    height: 56px;
    box-shadow: 0 0 0 8px ${({ tokens: tokens2 }) => tokens2.theme.borderPrimary};
    border-radius: ${({ borderRadius: borderRadius2 }) => borderRadius2[4]};
    overflow: hidden;
  }

  :host([data-border-radius-full='true']) {
    border-radius: 50px;
  }

  wui-icon {
    width: 32px;
    height: 32px;
  }
`;
var __decorate$j = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
let WuiVisualThumbnail = class WuiVisualThumbnail2 extends i$1 {
  render() {
    this.dataset["borderRadiusFull"] = this.borderRadiusFull ? "true" : "false";
    return T`${this.templateVisual()}`;
  }
  templateVisual() {
    if (this.imageSrc) {
      return T`<wui-image src=${this.imageSrc} alt=${this.alt ?? ""}></wui-image>`;
    }
    return T`<wui-icon
      data-parent-size="md"
      size="inherit"
      color="inherit"
      name="wallet"
    ></wui-icon>`;
  }
};
WuiVisualThumbnail.styles = [resetStyles, styles$j];
__decorate$j([
  n()
], WuiVisualThumbnail.prototype, "imageSrc", void 0);
__decorate$j([
  n()
], WuiVisualThumbnail.prototype, "alt", void 0);
__decorate$j([
  n({ type: Boolean })
], WuiVisualThumbnail.prototype, "borderRadiusFull", void 0);
WuiVisualThumbnail = __decorate$j([
  customElement("wui-visual-thumbnail")
], WuiVisualThumbnail);
const styles$i = css`
  a {
    border: none;
    border-radius: ${({ borderRadius: borderRadius2 }) => borderRadius2["20"]};
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: ${({ spacing: spacing2 }) => spacing2[1]};
    transition:
      background-color ${({ durations: durations2 }) => durations2["lg"]}
        ${({ easings: easings2 }) => easings2["ease-out-power-2"]},
      box-shadow ${({ durations: durations2 }) => durations2["lg"]}
        ${({ easings: easings2 }) => easings2["ease-out-power-2"]},
      border ${({ durations: durations2 }) => durations2["lg"]} ${({ easings: easings2 }) => easings2["ease-out-power-2"]};
    will-change: background-color, box-shadow, border;
  }

  /* -- Variants --------------------------------------------------------------- */
  a[data-type='success'] {
    background-color: ${({ tokens: tokens2 }) => tokens2.core.backgroundSuccess};
    color: ${({ tokens: tokens2 }) => tokens2.core.textSuccess};
  }

  a[data-type='error'] {
    background-color: ${({ tokens: tokens2 }) => tokens2.core.backgroundError};
    color: ${({ tokens: tokens2 }) => tokens2.core.textError};
  }

  a[data-type='warning'] {
    background-color: ${({ tokens: tokens2 }) => tokens2.core.backgroundWarning};
    color: ${({ tokens: tokens2 }) => tokens2.core.textWarning};
  }

  /* -- Sizes --------------------------------------------------------------- */
  a[data-size='sm'] {
    height: 24px;
  }

  a[data-size='md'] {
    height: 28px;
  }

  a[data-size='lg'] {
    height: 32px;
  }

  a[data-size='sm'] > wui-image,
  a[data-size='sm'] > wui-icon {
    width: 16px;
    height: 16px;
  }

  a[data-size='md'] > wui-image,
  a[data-size='md'] > wui-icon {
    width: 20px;
    height: 20px;
  }

  a[data-size='lg'] > wui-image,
  a[data-size='lg'] > wui-icon {
    width: 24px;
    height: 24px;
  }

  wui-text {
    padding-left: ${({ spacing: spacing2 }) => spacing2[1]};
    padding-right: ${({ spacing: spacing2 }) => spacing2[1]};
  }

  wui-image {
    border-radius: ${({ borderRadius: borderRadius2 }) => borderRadius2[3]};
    overflow: hidden;
    user-drag: none;
    user-select: none;
    -moz-user-select: none;
    -webkit-user-drag: none;
    -webkit-user-select: none;
    -ms-user-select: none;
  }

  /* -- States --------------------------------------------------------------- */
  @media (hover: hover) and (pointer: fine) {
    a[data-type='success']:not(:disabled):hover {
      background-color: ${({ tokens: tokens2 }) => tokens2.theme.foregroundPrimary};
      box-shadow: 0px 0px 0px 1px ${({ tokens: tokens2 }) => tokens2.core.borderSuccess};
    }

    a[data-type='error']:not(:disabled):hover {
      background-color: ${({ tokens: tokens2 }) => tokens2.theme.foregroundPrimary};
      box-shadow: 0px 0px 0px 1px ${({ tokens: tokens2 }) => tokens2.core.borderError};
    }

    a[data-type='warning']:not(:disabled):hover {
      background-color: ${({ tokens: tokens2 }) => tokens2.theme.foregroundPrimary};
      box-shadow: 0px 0px 0px 1px ${({ tokens: tokens2 }) => tokens2.core.borderWarning};
    }
  }

  a[data-type='success']:not(:disabled):focus-visible {
    box-shadow:
      0px 0px 0px 1px ${({ tokens: tokens2 }) => tokens2.core.backgroundAccentPrimary},
      0px 0px 0px 4px ${({ tokens: tokens2 }) => tokens2.core.foregroundAccent020};
  }

  a[data-type='error']:not(:disabled):focus-visible {
    box-shadow:
      0px 0px 0px 1px ${({ tokens: tokens2 }) => tokens2.core.backgroundAccentPrimary},
      0px 0px 0px 4px ${({ tokens: tokens2 }) => tokens2.core.foregroundAccent020};
  }

  a[data-type='warning']:not(:disabled):focus-visible {
    box-shadow:
      0px 0px 0px 1px ${({ tokens: tokens2 }) => tokens2.core.backgroundAccentPrimary},
      0px 0px 0px 4px ${({ tokens: tokens2 }) => tokens2.core.foregroundAccent020};
  }

  a:disabled {
    opacity: 0.5;
  }
`;
var __decorate$i = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
const TEXT_BY_SIZE = {
  sm: "md-regular",
  md: "lg-regular",
  lg: "lg-regular"
};
const ICON_BY_TYPE = {
  success: "sealCheck",
  error: "warning",
  warning: "exclamationCircle"
};
let WuiSemanticChip = class WuiSemanticChip2 extends i$1 {
  constructor() {
    super(...arguments);
    this.type = "success";
    this.size = "md";
    this.imageSrc = void 0;
    this.disabled = false;
    this.href = "";
    this.text = void 0;
  }
  render() {
    return T`
      <a
        rel="noreferrer"
        target="_blank"
        href=${this.href}
        class=${this.disabled ? "disabled" : ""}
        data-type=${this.type}
        data-size=${this.size}
      >
        ${this.imageTemplate()}
        <wui-text variant=${TEXT_BY_SIZE[this.size]} color="inherit">${this.text}</wui-text>
      </a>
    `;
  }
  imageTemplate() {
    if (this.imageSrc) {
      return T`<wui-image src=${this.imageSrc} size="inherit"></wui-image>`;
    }
    return T`<wui-icon
      name=${ICON_BY_TYPE[this.type]}
      weight="fill"
      color="inherit"
      size="inherit"
      class="image-icon"
    ></wui-icon>`;
  }
};
WuiSemanticChip.styles = [resetStyles, elementStyles, styles$i];
__decorate$i([
  n()
], WuiSemanticChip.prototype, "type", void 0);
__decorate$i([
  n()
], WuiSemanticChip.prototype, "size", void 0);
__decorate$i([
  n()
], WuiSemanticChip.prototype, "imageSrc", void 0);
__decorate$i([
  n({ type: Boolean })
], WuiSemanticChip.prototype, "disabled", void 0);
__decorate$i([
  n()
], WuiSemanticChip.prototype, "href", void 0);
__decorate$i([
  n()
], WuiSemanticChip.prototype, "text", void 0);
WuiSemanticChip = __decorate$i([
  customElement("wui-semantic-chip")
], WuiSemanticChip);
const styles$h = css`
  :host {
    width: 100%;
  }

  button {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: ${({ tokens: tokens2 }) => tokens2.theme.foregroundPrimary};
    border-radius: ${({ borderRadius: borderRadius2 }) => borderRadius2[4]};
    padding: ${({ spacing: spacing2 }) => spacing2[4]};
  }

  .name {
    max-width: 75%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  @media (hover: hover) and (pointer: fine) {
    button:hover:enabled {
      cursor: pointer;
      background-color: ${({ tokens: tokens2 }) => tokens2.theme.foregroundSecondary};
      border-radius: ${({ borderRadius: borderRadius2 }) => borderRadius2[6]};
    }
  }

  button:disabled {
    opacity: 0.5;
    cursor: default;
  }

  button:focus-visible:enabled {
    box-shadow: 0 0 0 4px ${({ tokens: tokens2 }) => tokens2.core.foregroundAccent040};
    background-color: ${({ tokens: tokens2 }) => tokens2.theme.foregroundSecondary};
  }
`;
var __decorate$h = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
let WuiAccountNameSuggestionItem = class WuiAccountNameSuggestionItem2 extends i$1 {
  constructor() {
    super(...arguments);
    this.name = "";
    this.registered = false;
    this.loading = false;
    this.disabled = false;
  }
  render() {
    return T`
      <button ?disabled=${this.disabled}>
        <wui-text class="name" color="primary" variant="md-regular">${this.name}</wui-text>
        ${this.templateRightContent()}
      </button>
    `;
  }
  templateRightContent() {
    if (this.loading) {
      return T`<wui-loading-spinner size="lg" color="primary"></wui-loading-spinner>`;
    }
    return this.registered ? T`<wui-tag variant="info" size="sm">Registered</wui-tag>` : T`<wui-tag variant="success" size="sm">Available</wui-tag>`;
  }
};
WuiAccountNameSuggestionItem.styles = [resetStyles, elementStyles, styles$h];
__decorate$h([
  n()
], WuiAccountNameSuggestionItem.prototype, "name", void 0);
__decorate$h([
  n({ type: Boolean })
], WuiAccountNameSuggestionItem.prototype, "registered", void 0);
__decorate$h([
  n({ type: Boolean })
], WuiAccountNameSuggestionItem.prototype, "loading", void 0);
__decorate$h([
  n({ type: Boolean })
], WuiAccountNameSuggestionItem.prototype, "disabled", void 0);
WuiAccountNameSuggestionItem = __decorate$h([
  customElement("wui-account-name-suggestion-item")
], WuiAccountNameSuggestionItem);
const styles$g = css`
  :host {
    position: relative;
    width: 100%;
    display: inline-block;
  }

  :host([disabled]) {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .base-name {
    position: absolute;
    right: ${({ spacing: spacing2 }) => spacing2[4]};
    top: 50%;
    transform: translateY(-50%);
    text-align: right;
    padding: ${({ spacing: spacing2 }) => spacing2[1]};
    background-color: ${({ tokens: tokens2 }) => tokens2.theme.foregroundSecondary};
    border-radius: ${({ borderRadius: borderRadius2 }) => borderRadius2[1]};
  }
`;
var __decorate$g = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
let WuiEnsInput = class WuiEnsInput2 extends i$1 {
  constructor() {
    super(...arguments);
    this.disabled = false;
    this.loading = false;
  }
  render() {
    return T`
      <wui-input-text
        value=${o(this.value)}
        ?disabled=${this.disabled}
        .value=${this.value || ""}
        data-testid="wui-ens-input"
        icon="search"
        inputRightPadding="5xl"
        .onKeyDown=${this.onKeyDown}
      ></wui-input-text>
    `;
  }
};
WuiEnsInput.styles = [resetStyles, styles$g];
__decorate$g([
  n()
], WuiEnsInput.prototype, "errorMessage", void 0);
__decorate$g([
  n({ type: Boolean })
], WuiEnsInput.prototype, "disabled", void 0);
__decorate$g([
  n()
], WuiEnsInput.prototype, "value", void 0);
__decorate$g([
  n({ type: Boolean })
], WuiEnsInput.prototype, "loading", void 0);
__decorate$g([
  n({ attribute: false })
], WuiEnsInput.prototype, "onKeyDown", void 0);
WuiEnsInput = __decorate$g([
  customElement("wui-ens-input")
], WuiEnsInput);
const styles$f = css`
  :host {
    position: relative;
    display: inline-block;
  }

  input {
    width: 48px;
    height: 48px;
    background: ${({ tokens: tokens2 }) => tokens2.theme.foregroundPrimary};
    border-radius: ${({ borderRadius: borderRadius2 }) => borderRadius2[4]};
    border: 1px solid ${({ tokens: tokens2 }) => tokens2.theme.borderPrimary};
    font-family: ${({ fontFamily: fontFamily2 }) => fontFamily2.regular};
    font-size: ${({ textSize: textSize2 }) => textSize2.large};
    line-height: 18px;
    letter-spacing: -0.16px;
    text-align: center;
    color: ${({ tokens: tokens2 }) => tokens2.theme.textPrimary};
    caret-color: ${({ tokens: tokens2 }) => tokens2.core.textAccentPrimary};
    transition:
      background-color ${({ durations: durations2 }) => durations2["lg"]}
        ${({ easings: easings2 }) => easings2["ease-out-power-2"]},
      border-color ${({ durations: durations2 }) => durations2["lg"]}
        ${({ easings: easings2 }) => easings2["ease-out-power-2"]},
      box-shadow ${({ durations: durations2 }) => durations2["lg"]}
        ${({ easings: easings2 }) => easings2["ease-out-power-2"]};
    will-change: background-color, border-color, box-shadow;
    box-sizing: border-box;
    -webkit-appearance: none;
    -moz-appearance: textfield;
    padding: ${({ spacing: spacing2 }) => spacing2[4]};
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input[type='number'] {
    -moz-appearance: textfield;
  }

  input:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  input:focus-visible:enabled {
    background-color: transparent;
    border: 1px solid ${({ tokens: tokens2 }) => tokens2.theme.borderSecondary};
    box-shadow: 0px 0px 0px 4px ${({ tokens: tokens2 }) => tokens2.core.foregroundAccent040};
  }
`;
var __decorate$f = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
let WuiInputNumeric = class WuiInputNumeric2 extends i$1 {
  constructor() {
    super(...arguments);
    this.disabled = false;
    this.value = "";
  }
  render() {
    return T`<input
      type="number"
      maxlength="1"
      inputmode="numeric"
      autofocus
      ?disabled=${this.disabled}
      value=${this.value}
    /> `;
  }
};
WuiInputNumeric.styles = [resetStyles, elementStyles, styles$f];
__decorate$f([
  n({ type: Boolean })
], WuiInputNumeric.prototype, "disabled", void 0);
__decorate$f([
  n({ type: String })
], WuiInputNumeric.prototype, "value", void 0);
WuiInputNumeric = __decorate$f([
  customElement("wui-input-numeric")
], WuiInputNumeric);
const styles$e = i`
  :host {
    position: relative;
    display: block;
  }
`;
var __decorate$e = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
let WuiOtp = class WuiOtp2 extends i$1 {
  constructor() {
    super(...arguments);
    this.length = 6;
    this.otp = "";
    this.values = Array.from({ length: this.length }).map(() => "");
    this.numerics = [];
    this.shouldInputBeEnabled = (index) => {
      const previousInputs = this.values.slice(0, index);
      return previousInputs.every((input) => input !== "");
    };
    this.handleKeyDown = (e2, index) => {
      const inputElement = e2.target;
      const input = this.getInputElement(inputElement);
      const keyArr = ["ArrowLeft", "ArrowRight", "Shift", "Delete"];
      if (!input) {
        return;
      }
      if (keyArr.includes(e2.key)) {
        e2.preventDefault();
      }
      const currentCaretPos = input.selectionStart;
      switch (e2.key) {
        case "ArrowLeft":
          if (currentCaretPos) {
            input.setSelectionRange(currentCaretPos + 1, currentCaretPos + 1);
          }
          this.focusInputField("prev", index);
          break;
        case "ArrowRight":
          this.focusInputField("next", index);
          break;
        case "Shift":
          this.focusInputField("next", index);
          break;
        case "Delete":
          if (input.value === "") {
            this.focusInputField("prev", index);
          } else {
            this.updateInput(input, index, "");
          }
          break;
        case "Backspace":
          if (input.value === "") {
            this.focusInputField("prev", index);
          } else {
            this.updateInput(input, index, "");
          }
          break;
      }
    };
    this.focusInputField = (dir, index) => {
      if (dir === "next") {
        const nextIndex = index + 1;
        if (!this.shouldInputBeEnabled(nextIndex)) {
          return;
        }
        const numeric = this.numerics[nextIndex < this.length ? nextIndex : index];
        const input = numeric ? this.getInputElement(numeric) : void 0;
        if (input) {
          input.disabled = false;
          input.focus();
        }
      }
      if (dir === "prev") {
        const nextIndex = index - 1;
        const numeric = this.numerics[nextIndex > -1 ? nextIndex : index];
        const input = numeric ? this.getInputElement(numeric) : void 0;
        if (input) {
          input.focus();
        }
      }
    };
  }
  firstUpdated() {
    if (this.otp) {
      this.values = this.otp.split("");
    }
    const numericElements = this.shadowRoot?.querySelectorAll("wui-input-numeric");
    if (numericElements) {
      this.numerics = Array.from(numericElements);
    }
    this.numerics[0]?.focus();
  }
  render() {
    return T`
      <wui-flex gap="1" data-testid="wui-otp-input">
        ${Array.from({ length: this.length }).map((_, index) => T`
            <wui-input-numeric
              @input=${(e2) => this.handleInput(e2, index)}
              @click=${(e2) => this.selectInput(e2)}
              @keydown=${(e2) => this.handleKeyDown(e2, index)}
              .disabled=${!this.shouldInputBeEnabled(index)}
              .value=${this.values[index] || ""}
            >
            </wui-input-numeric>
          `)}
      </wui-flex>
    `;
  }
  updateInput(element, index, value) {
    const numeric = this.numerics[index];
    const input = element || (numeric ? this.getInputElement(numeric) : void 0);
    if (input) {
      input.value = value;
      this.values = this.values.map((val, i2) => i2 === index ? value : val);
    }
  }
  selectInput(e2) {
    const targetElement = e2.target;
    if (targetElement) {
      const inputElement = this.getInputElement(targetElement);
      inputElement?.select();
    }
  }
  handleInput(e2, index) {
    const inputElement = e2.target;
    const input = this.getInputElement(inputElement);
    if (input) {
      const inputValue = input.value;
      if (e2.inputType === "insertFromPaste") {
        this.handlePaste(input, inputValue, index);
      } else {
        const isValid = UiHelperUtil.isNumber(inputValue);
        if (isValid && e2.data) {
          this.updateInput(input, index, e2.data);
          this.focusInputField("next", index);
        } else {
          this.updateInput(input, index, "");
        }
      }
    }
    this.dispatchInputChangeEvent();
  }
  handlePaste(input, inputValue, index) {
    const value = inputValue[0];
    const isValid = value && UiHelperUtil.isNumber(value);
    if (isValid) {
      this.updateInput(input, index, value);
      const inputString = inputValue.substring(1);
      if (index + 1 < this.length && inputString.length) {
        const nextNumeric = this.numerics[index + 1];
        const nextInput = nextNumeric ? this.getInputElement(nextNumeric) : void 0;
        if (nextInput) {
          this.handlePaste(nextInput, inputString, index + 1);
        }
      } else {
        this.focusInputField("next", index);
      }
    } else {
      this.updateInput(input, index, "");
    }
  }
  getInputElement(el) {
    if (el.shadowRoot?.querySelector("input")) {
      return el.shadowRoot.querySelector("input");
    }
    return null;
  }
  dispatchInputChangeEvent() {
    const value = this.values.join("");
    this.dispatchEvent(new CustomEvent("inputChange", {
      detail: value,
      bubbles: true,
      composed: true
    }));
  }
};
WuiOtp.styles = [resetStyles, styles$e];
__decorate$e([
  n({ type: Number })
], WuiOtp.prototype, "length", void 0);
__decorate$e([
  n({ type: String })
], WuiOtp.prototype, "otp", void 0);
__decorate$e([
  r$1()
], WuiOtp.prototype, "values", void 0);
WuiOtp = __decorate$e([
  customElement("wui-otp")
], WuiOtp);
const styles$d = css`
  button {
    display: block;
    display: flex;
    align-items: center;
    padding: ${({ spacing: spacing2 }) => spacing2[1]};
    transition: background-color ${({ durations: durations2 }) => durations2["lg"]}
      ${({ easings: easings2 }) => easings2["ease-out-power-2"]};
    will-change: background-color;
    background-color: ${({ tokens: tokens2 }) => tokens2.theme.foregroundPrimary};
    border-radius: ${({ borderRadius: borderRadius2 }) => borderRadius2[32]};
  }

  wui-image {
    border-radius: ${({ borderRadius: borderRadius2 }) => borderRadius2[32]};
  }

  wui-text {
    padding-left: ${({ spacing: spacing2 }) => spacing2[1]};
    padding-right: ${({ spacing: spacing2 }) => spacing2[1]};
  }

  .left-icon-container {
    width: 24px;
    height: 24px;
    justify-content: center;
    align-items: center;
  }

  .left-image-container {
    position: relative;
    justify-content: center;
    align-items: center;
  }

  .chain-image {
    position: absolute;
    border: 1px solid ${({ tokens: tokens2 }) => tokens2.theme.foregroundPrimary};
  }

  /* -- Sizes --------------------------------------------------- */
  button[data-size='lg'] {
    height: 32px;
  }

  button[data-size='md'] {
    height: 28px;
  }

  button[data-size='sm'] {
    height: 24px;
  }

  button[data-size='lg'] .token-image {
    width: 24px;
    height: 24px;
  }

  button[data-size='md'] .token-image {
    width: 20px;
    height: 20px;
  }

  button[data-size='sm'] .token-image {
    width: 16px;
    height: 16px;
  }

  button[data-size='lg'] .left-icon-container {
    width: 24px;
    height: 24px;
  }

  button[data-size='md'] .left-icon-container {
    width: 20px;
    height: 20px;
  }

  button[data-size='sm'] .left-icon-container {
    width: 16px;
    height: 16px;
  }

  button[data-size='lg'] .chain-image {
    width: 12px;
    height: 12px;
    bottom: 2px;
    right: -4px;
  }

  button[data-size='md'] .chain-image {
    width: 10px;
    height: 10px;
    bottom: 2px;
    right: -4px;
  }

  button[data-size='sm'] .chain-image {
    width: 8px;
    height: 8px;
    bottom: 2px;
    right: -3px;
  }

  /* -- Focus states --------------------------------------------------- */
  button:focus-visible:enabled {
    background-color: ${({ tokens: tokens2 }) => tokens2.theme.foregroundSecondary};
    box-shadow: 0 0 0 4px ${({ tokens: tokens2 }) => tokens2.core.foregroundAccent040};
  }

  /* -- Hover & Active states ----------------------------------------------------------- */
  @media (hover: hover) {
    button:hover:enabled,
    button:active:enabled {
      background-color: ${({ tokens: tokens2 }) => tokens2.theme.foregroundSecondary};
    }
  }

  /* -- Disabled states --------------------------------------------------- */
  button:disabled {
    background-color: ${({ tokens: tokens2 }) => tokens2.theme.foregroundSecondary};
    opacity: 0.5;
  }
`;
var __decorate$d = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
const TEXT_VARIANT_BY_SIZE$1 = {
  lg: "lg-regular",
  md: "lg-regular",
  sm: "md-regular"
};
const ICON_SIZE_BY_SIZE$1 = {
  lg: "lg",
  md: "md",
  sm: "sm"
};
let WuiTokenButton = class WuiTokenButton2 extends i$1 {
  constructor() {
    super(...arguments);
    this.size = "md";
    this.disabled = false;
    this.text = "";
    this.loading = false;
  }
  render() {
    if (this.loading) {
      return T` <wui-flex alignItems="center" gap="01" padding="01">
        <wui-shimmer width="20px" height="20px"></wui-shimmer>
        <wui-shimmer width="32px" height="18px" borderRadius="4xs"></wui-shimmer>
      </wui-flex>`;
    }
    return T`
      <button ?disabled=${this.disabled} data-size=${this.size}>
        ${this.imageTemplate()} ${this.textTemplate()}
      </button>
    `;
  }
  imageTemplate() {
    if (this.imageSrc && this.chainImageSrc) {
      return T`<wui-flex class="left-image-container">
        <wui-image src=${this.imageSrc} class="token-image"></wui-image>
        <wui-image src=${this.chainImageSrc} class="chain-image"></wui-image>
      </wui-flex>`;
    }
    if (this.imageSrc) {
      return T`<wui-image src=${this.imageSrc} class="token-image"></wui-image>`;
    }
    const iconSize = ICON_SIZE_BY_SIZE$1[this.size];
    return T`<wui-flex class="left-icon-container">
      <wui-icon size=${iconSize} name="networkPlaceholder"></wui-icon>
    </wui-flex>`;
  }
  textTemplate() {
    const textVariant = TEXT_VARIANT_BY_SIZE$1[this.size];
    return T`<wui-text color="primary" variant=${textVariant}
      >${this.text}</wui-text
    >`;
  }
};
WuiTokenButton.styles = [resetStyles, elementStyles, styles$d];
__decorate$d([
  n()
], WuiTokenButton.prototype, "size", void 0);
__decorate$d([
  n()
], WuiTokenButton.prototype, "imageSrc", void 0);
__decorate$d([
  n()
], WuiTokenButton.prototype, "chainImageSrc", void 0);
__decorate$d([
  n({ type: Boolean })
], WuiTokenButton.prototype, "disabled", void 0);
__decorate$d([
  n()
], WuiTokenButton.prototype, "text", void 0);
__decorate$d([
  n({ type: Boolean })
], WuiTokenButton.prototype, "loading", void 0);
WuiTokenButton = __decorate$d([
  customElement("wui-token-button")
], WuiTokenButton);
const styles$c = css`
  :host {
    width: 100%;
    height: 60px;
    min-height: 60px;
  }

  :host > wui-flex {
    cursor: pointer;
    height: 100%;
    display: flex;
    column-gap: ${({ spacing: spacing2 }) => spacing2["3"]};
    padding: ${({ spacing: spacing2 }) => spacing2["2"]};
    padding-right: ${({ spacing: spacing2 }) => spacing2["4"]};
    width: 100%;
    background-color: transparent;
    border-radius: ${({ borderRadius: borderRadius2 }) => borderRadius2["4"]};
    color: ${({ tokens: tokens2 }) => tokens2.theme.foregroundSecondary};
    transition:
      background-color ${({ durations: durations2 }) => durations2["lg"]}
        ${({ easings: easings2 }) => easings2["ease-out-power-2"]},
      opacity ${({ durations: durations2 }) => durations2["lg"]} ${({ easings: easings2 }) => easings2["ease-out-power-2"]};
    will-change: background-color, opacity;
  }

  @media (hover: hover) and (pointer: fine) {
    :host > wui-flex:hover {
      background-color: ${({ tokens: tokens2 }) => tokens2.theme.foregroundPrimary};
    }

    :host > wui-flex:active {
      background-color: ${({ tokens: tokens2 }) => tokens2.core.glass010};
    }
  }

  :host([disabled]) > wui-flex {
    opacity: 0.6;
  }

  :host([disabled]) > wui-flex:hover {
    background-color: transparent;
  }

  :host > wui-flex > wui-flex {
    flex: 1;
  }

  :host > wui-flex > wui-image,
  :host > wui-flex > .token-item-image-placeholder {
    width: 40px;
    max-width: 40px;
    height: 40px;
    border-radius: ${({ borderRadius: borderRadius2 }) => borderRadius2["20"]};
    position: relative;
  }

  :host > wui-flex > .token-item-image-placeholder {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  :host > wui-flex > wui-image::after,
  :host > wui-flex > .token-item-image-placeholder::after {
    position: absolute;
    content: '';
    inset: 0;
    box-shadow: inset 0 0 0 1px ${({ tokens: tokens2 }) => tokens2.core.glass010};
    border-radius: ${({ borderRadius: borderRadius2 }) => borderRadius2["8"]};
  }

  button > wui-icon-box[data-variant='square-blue'] {
    border-radius: ${({ borderRadius: borderRadius2 }) => borderRadius2["2"]};
    position: relative;
    border: none;
    width: 36px;
    height: 36px;
  }
`;
var __decorate$c = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
let WuiTokenListItem = class WuiTokenListItem2 extends i$1 {
  constructor() {
    super();
    this.observer = new IntersectionObserver(() => void 0);
    this.imageSrc = void 0;
    this.name = void 0;
    this.symbol = void 0;
    this.price = void 0;
    this.amount = void 0;
    this.visible = false;
    this.imageError = false;
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.visible = true;
        } else {
          this.visible = false;
        }
      });
    }, { threshold: 0.1 });
  }
  firstUpdated() {
    this.observer.observe(this);
  }
  disconnectedCallback() {
    this.observer.disconnect();
  }
  render() {
    if (!this.visible) {
      return null;
    }
    const value = this.amount && this.price ? NumberUtil.multiply(this.price, this.amount)?.toFixed(3) : null;
    return T`
      <wui-flex alignItems="center">
        ${this.visualTemplate()}
        <wui-flex flexDirection="column" gap="1">
          <wui-flex justifyContent="space-between">
            <wui-text variant="md-medium" color="primary" lineClamp="1">${this.name}</wui-text>
            ${value ? T`
                  <wui-text variant="md-medium" color="primary">
                    $${NumberUtil.formatNumberToLocalString(value, 3)}
                  </wui-text>
                ` : null}
          </wui-flex>
          <wui-flex justifyContent="space-between">
            <wui-text variant="sm-regular" color="secondary" lineClamp="1">${this.symbol}</wui-text>
            ${this.amount ? T`<wui-text variant="sm-regular" color="secondary">
                  ${NumberUtil.formatNumberToLocalString(this.amount, 5)}
                </wui-text>` : null}
          </wui-flex>
        </wui-flex>
      </wui-flex>
    `;
  }
  visualTemplate() {
    if (this.imageError) {
      return T`<wui-flex class="token-item-image-placeholder">
        <wui-icon name="image" color="inherit"></wui-icon>
      </wui-flex>`;
    }
    if (this.imageSrc) {
      return T`<wui-image
        width="40"
        height="40"
        src=${this.imageSrc}
        @onLoadError=${this.imageLoadError}
      ></wui-image>`;
    }
    return null;
  }
  imageLoadError() {
    this.imageError = true;
  }
};
WuiTokenListItem.styles = [resetStyles, elementStyles, styles$c];
__decorate$c([
  n()
], WuiTokenListItem.prototype, "imageSrc", void 0);
__decorate$c([
  n()
], WuiTokenListItem.prototype, "name", void 0);
__decorate$c([
  n()
], WuiTokenListItem.prototype, "symbol", void 0);
__decorate$c([
  n()
], WuiTokenListItem.prototype, "price", void 0);
__decorate$c([
  n()
], WuiTokenListItem.prototype, "amount", void 0);
__decorate$c([
  r$1()
], WuiTokenListItem.prototype, "visible", void 0);
__decorate$c([
  r$1()
], WuiTokenListItem.prototype, "imageError", void 0);
WuiTokenListItem = __decorate$c([
  customElement("wui-token-list-item")
], WuiTokenListItem);
const styles$b = css`
  :host {
    width: 100%;
  }

  :host > wui-flex {
    cursor: pointer;
    height: 100%;
    width: 100%;
    display: flex;
    column-gap: ${({ spacing: spacing2 }) => spacing2["3"]};
    padding: ${({ spacing: spacing2 }) => spacing2["2"]};
    padding-right: ${({ spacing: spacing2 }) => spacing2["4"]};
  }

  wui-flex {
    display: flex;
    flex: 1;
  }
`;
var __decorate$b = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
let WuiTokenListItemLoader = class WuiTokenListItemLoader2 extends i$1 {
  render() {
    return T`
      <wui-flex alignItems="center">
        <wui-shimmer width="40px" height="40px"></wui-shimmer>
        <wui-flex flexDirection="column" gap="1">
          <wui-shimmer width="72px" height="16px" borderRadius="4xs"></wui-shimmer>
          <wui-shimmer width="148px" height="14px" borderRadius="4xs"></wui-shimmer>
        </wui-flex>
        <wui-flex flexDirection="column" gap="1" alignItems="flex-end">
          <wui-shimmer width="24px" height="12px" borderRadius="4xs"></wui-shimmer>
          <wui-shimmer width="32px" height="12px" borderRadius="4xs"></wui-shimmer>
        </wui-flex>
      </wui-flex>
    `;
  }
};
WuiTokenListItemLoader.styles = [resetStyles, styles$b];
WuiTokenListItemLoader = __decorate$b([
  customElement("wui-token-list-item-loader")
], WuiTokenListItemLoader);
const styles$a = css`
  :host {
    position: relative;
    display: inline-block;
  }

  :host([data-error='true']) > input {
    color: ${({ tokens: tokens2 }) => tokens2.core.textError};
  }

  :host([data-error='false']) > input {
    color: ${({ tokens: tokens2 }) => tokens2.theme.textPrimary};
  }

  input {
    background: transparent;
    height: auto;
    box-sizing: border-box;
    color: ${({ tokens: tokens2 }) => tokens2.theme.textPrimary};
    font-feature-settings: 'case' on;
    font-size: ${({ textSize: textSize2 }) => textSize2.h4};
    caret-color: ${({ tokens: tokens2 }) => tokens2.core.backgroundAccentPrimary};
    line-height: ${({ typography: typography2 }) => typography2["h4-regular-mono"].lineHeight};
    letter-spacing: ${({ typography: typography2 }) => typography2["h4-regular-mono"].letterSpacing};
    -webkit-appearance: none;
    -moz-appearance: textfield;
    padding: 0px;
    font-family: ${({ fontFamily: fontFamily2 }) => fontFamily2.mono};
  }

  :host([data-width-variant='auto']) input {
    width: 100%;
  }

  :host([data-width-variant='fit']) input {
    width: 1ch;
  }

  .wui-input-amount-fit-mirror {
    position: absolute;
    visibility: hidden;
    white-space: pre;
    font-size: var(--local-font-size);
    line-height: 130%;
    letter-spacing: -1.28px;
    font-family: ${({ fontFamily: fontFamily2 }) => fontFamily2.mono};
  }

  .wui-input-amount-fit-width {
    display: inline-block;
    position: relative;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input::placeholder {
    color: ${({ tokens: tokens2 }) => tokens2.theme.textSecondary};
  }
`;
var __decorate$a = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
let WuiInputAmount = class WuiInputAmount2 extends i$1 {
  constructor() {
    super(...arguments);
    this.inputElementRef = e$1();
    this.disabled = false;
    this.value = "";
    this.placeholder = "0";
    this.widthVariant = "auto";
    this.maxDecimals = void 0;
    this.maxIntegers = void 0;
    this.fontSize = "h4";
    this.error = false;
  }
  firstUpdated() {
    this.resizeInput();
  }
  updated() {
    this.style.setProperty("--local-font-size", vars.textSize[this.fontSize]);
    this.resizeInput();
  }
  render() {
    this.dataset["widthVariant"] = this.widthVariant;
    this.dataset["error"] = String(this.error);
    if (this.inputElementRef?.value && this.value) {
      this.inputElementRef.value.value = this.value;
    }
    if (this.widthVariant === "auto") {
      return this.inputTemplate();
    }
    return T`
      <div class="wui-input-amount-fit-width">
        <span class="wui-input-amount-fit-mirror"></span>
        ${this.inputTemplate()}
      </div>
    `;
  }
  inputTemplate() {
    return T`<input
      ${n$1(this.inputElementRef)}
      type="text"
      inputmode="decimal"
      pattern="[0-9,.]*"
      placeholder=${this.placeholder}
      ?disabled=${this.disabled}
      autofocus
      value=${this.value ?? ""}
      @input=${this.dispatchInputChangeEvent.bind(this)}
    />`;
  }
  dispatchInputChangeEvent() {
    if (this.inputElementRef.value) {
      this.inputElementRef.value.value = UiHelperUtil.maskInput({
        value: this.inputElementRef.value.value,
        decimals: this.maxDecimals,
        integers: this.maxIntegers
      });
      this.dispatchEvent(new CustomEvent("inputChange", {
        detail: this.inputElementRef.value.value,
        bubbles: true,
        composed: true
      }));
      this.resizeInput();
    }
  }
  resizeInput() {
    if (this.widthVariant === "fit") {
      const inputElement = this.inputElementRef.value;
      if (inputElement) {
        const mirror = inputElement.previousElementSibling;
        if (mirror) {
          mirror.textContent = inputElement.value || "0";
          inputElement.style.width = `${mirror.offsetWidth}px`;
        }
      }
    }
  }
};
WuiInputAmount.styles = [resetStyles, elementStyles, styles$a];
__decorate$a([
  n({ type: Boolean })
], WuiInputAmount.prototype, "disabled", void 0);
__decorate$a([
  n({ type: String })
], WuiInputAmount.prototype, "value", void 0);
__decorate$a([
  n({ type: String })
], WuiInputAmount.prototype, "placeholder", void 0);
__decorate$a([
  n({ type: String })
], WuiInputAmount.prototype, "widthVariant", void 0);
__decorate$a([
  n({ type: Number })
], WuiInputAmount.prototype, "maxDecimals", void 0);
__decorate$a([
  n({ type: Number })
], WuiInputAmount.prototype, "maxIntegers", void 0);
__decorate$a([
  n({ type: String })
], WuiInputAmount.prototype, "fontSize", void 0);
__decorate$a([
  n({ type: Boolean })
], WuiInputAmount.prototype, "error", void 0);
WuiInputAmount = __decorate$a([
  customElement("wui-input-amount")
], WuiInputAmount);
const styles$9 = css`
  :host {
    height: 32px;
    display: flex;
    align-items: center;
    gap: ${({ spacing: spacing2 }) => spacing2[1]};
    border-radius: ${({ borderRadius: borderRadius2 }) => borderRadius2[32]};
    background-color: ${({ tokens: tokens2 }) => tokens2.theme.foregroundPrimary};
    padding: ${({ spacing: spacing2 }) => spacing2[1]};
    padding-left: ${({ spacing: spacing2 }) => spacing2[2]};
  }

  wui-avatar,
  wui-image {
    width: 24px;
    height: 24px;
    border-radius: ${({ borderRadius: borderRadius2 }) => borderRadius2[16]};
  }

  wui-icon {
    border-radius: ${({ borderRadius: borderRadius2 }) => borderRadius2[16]};
  }
`;
var __decorate$9 = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
let WuiPreviewItem = class WuiPreviewItem2 extends i$1 {
  constructor() {
    super(...arguments);
    this.text = "";
  }
  render() {
    return T`<wui-text variant="lg-regular" color="primary">${this.text}</wui-text>
      ${this.imageTemplate()}`;
  }
  imageTemplate() {
    if (this.address) {
      return T`<wui-avatar address=${this.address} .imageSrc=${this.imageSrc}></wui-avatar>`;
    } else if (this.imageSrc) {
      return T`<wui-image src=${this.imageSrc}></wui-image>`;
    }
    return T`<wui-icon size="lg" color="inverse" name="networkPlaceholder"></wui-icon>`;
  }
};
WuiPreviewItem.styles = [resetStyles, elementStyles, styles$9];
__decorate$9([
  n({ type: String })
], WuiPreviewItem.prototype, "text", void 0);
__decorate$9([
  n({ type: String })
], WuiPreviewItem.prototype, "address", void 0);
__decorate$9([
  n({ type: String })
], WuiPreviewItem.prototype, "imageSrc", void 0);
WuiPreviewItem = __decorate$9([
  customElement("wui-preview-item")
], WuiPreviewItem);
const styles$8 = css`
  :host {
    display: flex;
    padding: ${({ spacing: spacing2 }) => spacing2[4]} ${({ spacing: spacing2 }) => spacing2[3]};
    width: 100%;
    background-color: ${({ tokens: tokens2 }) => tokens2.theme.foregroundPrimary};
    border-radius: ${({ borderRadius: borderRadius2 }) => borderRadius2[4]};
  }

  wui-image {
    width: 20px;
    height: 20px;
    border-radius: ${({ borderRadius: borderRadius2 }) => borderRadius2[16]};
  }

  wui-icon {
    width: 20px;
    height: 20px;
  }
`;
var __decorate$8 = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
let WuiListContent = class WuiListContent2 extends i$1 {
  constructor() {
    super(...arguments);
    this.imageSrc = void 0;
    this.textTitle = "";
    this.textValue = void 0;
  }
  render() {
    return T`
      <wui-flex justifyContent="space-between" alignItems="center">
        <wui-text variant="lg-regular" color="primary"> ${this.textTitle} </wui-text>
        ${this.templateContent()}
      </wui-flex>
    `;
  }
  templateContent() {
    if (this.imageSrc) {
      return T`<wui-image src=${this.imageSrc} alt=${this.textTitle}></wui-image>`;
    } else if (this.textValue) {
      return T` <wui-text variant="md-regular" color="secondary"> ${this.textValue} </wui-text>`;
    }
    return T`<wui-icon size="inherit" color="default" name="networkPlaceholder"></wui-icon>`;
  }
};
WuiListContent.styles = [resetStyles, elementStyles, styles$8];
__decorate$8([
  n()
], WuiListContent.prototype, "imageSrc", void 0);
__decorate$8([
  n()
], WuiListContent.prototype, "textTitle", void 0);
__decorate$8([
  n()
], WuiListContent.prototype, "textValue", void 0);
WuiListContent = __decorate$8([
  customElement("wui-list-content")
], WuiListContent);
const styles$7 = css`
  button {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: ${({ spacing: spacing2 }) => spacing2[4]};
    background-color: ${({ tokens: tokens2 }) => tokens2.theme.foregroundPrimary};
    border-radius: ${({ borderRadius: borderRadius2 }) => borderRadius2[3]};
    border: none;
    padding: ${({ spacing: spacing2 }) => spacing2[3]};
    transition: background-color ${({ durations: durations2 }) => durations2["lg"]}
      ${({ easings: easings2 }) => easings2["ease-out-power-2"]};
    will-change: background-color;
  }

  /* -- Hover & Active states ----------------------------------------------------------- */
  button:hover:enabled,
  button:active:enabled {
    background-color: ${({ tokens: tokens2 }) => tokens2.theme.foregroundSecondary};
  }

  wui-text {
    flex: 1;
    color: ${({ tokens: tokens2 }) => tokens2.theme.textSecondary};
  }

  wui-flex {
    width: auto;
    display: flex;
    align-items: center;
    gap: ${({ spacing: spacing2 }) => spacing2["01"]};
  }

  wui-icon {
    color: ${({ tokens: tokens2 }) => tokens2.theme.iconDefault};
  }

  .network-icon {
    position: relative;
    width: 20px;
    height: 20px;
    border-radius: ${({ borderRadius: borderRadius2 }) => borderRadius2[4]};
    overflow: hidden;
    margin-left: -8px;
  }

  .network-icon:first-child {
    margin-left: 0px;
  }

  .network-icon:after {
    position: absolute;
    inset: 0;
    content: '';
    display: block;
    height: 100%;
    width: 100%;
    border-radius: ${({ borderRadius: borderRadius2 }) => borderRadius2[4]};
    box-shadow: inset 0 0 0 1px ${({ tokens: tokens2 }) => tokens2.core.glass010};
  }
`;
var __decorate$7 = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
let WuiCompatibleNetwork = class WuiCompatibleNetwork2 extends i$1 {
  constructor() {
    super(...arguments);
    this.networkImages = [""];
    this.text = "";
  }
  render() {
    return T`
      <button>
        <wui-text variant="md-regular" color="inherit">${this.text}</wui-text>
        <wui-flex>
          ${this.networksTemplate()}
          <wui-icon name="chevronRight" size="sm" color="inherit"></wui-icon>
        </wui-flex>
      </button>
    `;
  }
  networksTemplate() {
    const slicedNetworks = this.networkImages.slice(0, 5);
    return T` <wui-flex class="networks">
      ${slicedNetworks?.map((network) => T` <wui-flex class="network-icon"> <wui-image src=${network}></wui-image> </wui-flex>`)}
    </wui-flex>`;
  }
};
WuiCompatibleNetwork.styles = [resetStyles, elementStyles, styles$7];
__decorate$7([
  n({ type: Array })
], WuiCompatibleNetwork.prototype, "networkImages", void 0);
__decorate$7([
  n()
], WuiCompatibleNetwork.prototype, "text", void 0);
WuiCompatibleNetwork = __decorate$7([
  customElement("wui-compatible-network")
], WuiCompatibleNetwork);
const styles$6 = css`
  button {
    border: none;
    border-radius: ${({ borderRadius: borderRadius2 }) => borderRadius2["20"]};
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: ${({ spacing: spacing2 }) => spacing2[1]};
    transition:
      background-color ${({ durations: durations2 }) => durations2["lg"]}
        ${({ easings: easings2 }) => easings2["ease-out-power-2"]},
      box-shadow ${({ durations: durations2 }) => durations2["lg"]}
        ${({ easings: easings2 }) => easings2["ease-out-power-2"]};
    will-change: background-color, box-shadow;
  }

  /* -- Variants --------------------------------------------------------------- */
  button[data-type='accent'] {
    background-color: ${({ tokens: tokens2 }) => tokens2.core.backgroundAccentPrimary};
    color: ${({ tokens: tokens2 }) => tokens2.theme.textPrimary};
  }

  button[data-type='neutral'] {
    background-color: ${({ tokens: tokens2 }) => tokens2.theme.foregroundSecondary};
    color: ${({ tokens: tokens2 }) => tokens2.theme.textPrimary};
  }

  /* -- Sizes --------------------------------------------------------------- */
  button[data-size='sm'] {
    height: 24px;
  }

  button[data-size='md'] {
    height: 28px;
  }

  button[data-size='lg'] {
    height: 32px;
  }

  button[data-size='sm'] > wui-image,
  button[data-size='sm'] > wui-icon {
    width: 16px;
    height: 16px;
  }

  button[data-size='md'] > wui-image,
  button[data-size='md'] > wui-icon {
    width: 20px;
    height: 20px;
  }

  button[data-size='lg'] > wui-image,
  button[data-size='lg'] > wui-icon {
    width: 24px;
    height: 24px;
  }

  wui-text {
    padding-left: ${({ spacing: spacing2 }) => spacing2[1]};
    padding-right: ${({ spacing: spacing2 }) => spacing2[1]};
  }

  wui-image {
    border-radius: ${({ borderRadius: borderRadius2 }) => borderRadius2[3]};
    overflow: hidden;
    user-drag: none;
    user-select: none;
    -moz-user-select: none;
    -webkit-user-drag: none;
    -webkit-user-select: none;
    -ms-user-select: none;
  }

  /* -- States --------------------------------------------------------------- */
  @media (hover: hover) and (pointer: fine) {
    button[data-type='accent']:not(:disabled):hover {
      background-color: ${({ tokens: tokens2 }) => tokens2.core.foregroundAccent060};
    }

    button[data-type='neutral']:not(:disabled):hover {
      background-color: ${({ tokens: tokens2 }) => tokens2.theme.foregroundTertiary};
    }
  }

  button[data-type='accent']:not(:disabled):focus-visible,
  button[data-type='accent']:not(:disabled):active {
    box-shadow: 0 0 0 4px ${({ tokens: tokens2 }) => tokens2.core.foregroundAccent020};
  }

  button[data-type='neutral']:not(:disabled):focus-visible,
  button[data-type='neutral']:not(:disabled):active {
    box-shadow: 0 0 0 4px ${({ tokens: tokens2 }) => tokens2.core.foregroundAccent020};
  }

  button:disabled {
    opacity: 0.5;
  }
`;
var __decorate$6 = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
const FONT_BY_SIZE = {
  sm: "sm-regular",
  md: "md-regular",
  lg: "lg-regular"
};
let WuiChipButton = class WuiChipButton2 extends i$1 {
  constructor() {
    super(...arguments);
    this.type = "accent";
    this.size = "md";
    this.imageSrc = "";
    this.disabled = false;
    this.leftIcon = void 0;
    this.rightIcon = void 0;
    this.text = "";
  }
  render() {
    return T`
      <button ?disabled=${this.disabled} data-type=${this.type} data-size=${this.size}>
        ${this.imageSrc ? T`<wui-image src=${this.imageSrc}></wui-image>` : null}
        ${this.leftIcon ? T`<wui-icon name=${this.leftIcon} color="inherit" size="inherit"></wui-icon>` : null}
        <wui-text variant=${FONT_BY_SIZE[this.size]} color="inherit">${this.text}</wui-text>
        ${this.rightIcon ? T`<wui-icon name=${this.rightIcon} color="inherit" size="inherit"></wui-icon>` : null}
      </button>
    `;
  }
};
WuiChipButton.styles = [resetStyles, elementStyles, styles$6];
__decorate$6([
  n()
], WuiChipButton.prototype, "type", void 0);
__decorate$6([
  n()
], WuiChipButton.prototype, "size", void 0);
__decorate$6([
  n()
], WuiChipButton.prototype, "imageSrc", void 0);
__decorate$6([
  n({ type: Boolean })
], WuiChipButton.prototype, "disabled", void 0);
__decorate$6([
  n()
], WuiChipButton.prototype, "leftIcon", void 0);
__decorate$6([
  n()
], WuiChipButton.prototype, "rightIcon", void 0);
__decorate$6([
  n()
], WuiChipButton.prototype, "text", void 0);
WuiChipButton = __decorate$6([
  customElement("wui-chip-button")
], WuiChipButton);
const styles$5 = css`
  :host {
    position: relative;
  }

  button {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: transparent;
    padding: ${({ spacing: spacing2 }) => spacing2[1]};
  }

  /* -- Colors --------------------------------------------------- */
  button[data-type='accent'] wui-icon {
    color: ${({ tokens: tokens2 }) => tokens2.core.iconAccentPrimary};
  }

  button[data-type='neutral'][data-variant='primary'] wui-icon {
    color: ${({ tokens: tokens2 }) => tokens2.theme.iconInverse};
  }

  button[data-type='neutral'][data-variant='secondary'] wui-icon {
    color: ${({ tokens: tokens2 }) => tokens2.theme.iconDefault};
  }

  button[data-type='success'] wui-icon {
    color: ${({ tokens: tokens2 }) => tokens2.core.iconSuccess};
  }

  button[data-type='error'] wui-icon {
    color: ${({ tokens: tokens2 }) => tokens2.core.iconError};
  }

  /* -- Sizes --------------------------------------------------- */
  button[data-size='xs'] {
    width: 16px;
    height: 16px;

    border-radius: ${({ borderRadius: borderRadius2 }) => borderRadius2[1]};
  }

  button[data-size='sm'] {
    width: 20px;
    height: 20px;
    border-radius: ${({ borderRadius: borderRadius2 }) => borderRadius2[1]};
  }

  button[data-size='md'] {
    width: 24px;
    height: 24px;
    border-radius: ${({ borderRadius: borderRadius2 }) => borderRadius2[2]};
  }

  button[data-size='lg'] {
    width: 28px;
    height: 28px;
    border-radius: ${({ borderRadius: borderRadius2 }) => borderRadius2[2]};
  }

  button[data-size='xs'] wui-icon {
    width: 8px;
    height: 8px;
  }

  button[data-size='sm'] wui-icon {
    width: 12px;
    height: 12px;
  }

  button[data-size='md'] wui-icon {
    width: 16px;
    height: 16px;
  }

  button[data-size='lg'] wui-icon {
    width: 20px;
    height: 20px;
  }

  /* -- Hover --------------------------------------------------- */
  @media (hover: hover) {
    button[data-type='accent']:hover:enabled {
      background-color: ${({ tokens: tokens2 }) => tokens2.core.foregroundAccent010};
    }

    button[data-variant='primary'][data-type='neutral']:hover:enabled {
      background-color: ${({ tokens: tokens2 }) => tokens2.theme.foregroundSecondary};
    }

    button[data-variant='secondary'][data-type='neutral']:hover:enabled {
      background-color: ${({ tokens: tokens2 }) => tokens2.theme.foregroundSecondary};
    }

    button[data-type='success']:hover:enabled {
      background-color: ${({ tokens: tokens2 }) => tokens2.core.backgroundSuccess};
    }

    button[data-type='error']:hover:enabled {
      background-color: ${({ tokens: tokens2 }) => tokens2.core.backgroundError};
    }
  }

  /* -- Focus --------------------------------------------------- */
  button:focus-visible {
    box-shadow: 0 0 0 4px ${({ tokens: tokens2 }) => tokens2.core.foregroundAccent020};
  }

  /* -- Properties --------------------------------------------------- */
  button[data-full-width='true'] {
    width: 100%;
  }

  :host([fullWidth]) {
    width: 100%;
  }

  button[disabled] {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
var __decorate$5 = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
let WuiIconButton = class WuiIconButton2 extends i$1 {
  constructor() {
    super(...arguments);
    this.icon = "card";
    this.variant = "primary";
    this.type = "accent";
    this.size = "md";
    this.iconSize = void 0;
    this.fullWidth = false;
    this.disabled = false;
  }
  render() {
    return T`<button
      data-variant=${this.variant}
      data-type=${this.type}
      data-size=${this.size}
      data-full-width=${this.fullWidth}
      ?disabled=${this.disabled}
    >
      <wui-icon color="inherit" name=${this.icon} size=${o(this.iconSize)}></wui-icon>
    </button>`;
  }
};
WuiIconButton.styles = [resetStyles, elementStyles, styles$5];
__decorate$5([
  n()
], WuiIconButton.prototype, "icon", void 0);
__decorate$5([
  n()
], WuiIconButton.prototype, "variant", void 0);
__decorate$5([
  n()
], WuiIconButton.prototype, "type", void 0);
__decorate$5([
  n()
], WuiIconButton.prototype, "size", void 0);
__decorate$5([
  n()
], WuiIconButton.prototype, "iconSize", void 0);
__decorate$5([
  n({ type: Boolean })
], WuiIconButton.prototype, "fullWidth", void 0);
__decorate$5([
  n({ type: Boolean })
], WuiIconButton.prototype, "disabled", void 0);
WuiIconButton = __decorate$5([
  customElement("wui-icon-button")
], WuiIconButton);
const styles$4 = css`
  :host {
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  .pulse-container {
    position: relative;
    width: var(--pulse-size);
    height: var(--pulse-size);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .pulse-rings {
    position: absolute;
    inset: 0;
    pointer-events: none;
  }

  .pulse-ring {
    position: absolute;
    inset: 0;
    border-radius: 50%;
    border: 2px solid var(--pulse-color);
    opacity: 0;
    animation: pulse var(--pulse-duration, 2s) ease-out infinite;
  }

  .pulse-content {
    position: relative;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  @keyframes pulse {
    0% {
      transform: scale(0.5);
      opacity: var(--pulse-opacity, 0.3);
    }
    50% {
      opacity: calc(var(--pulse-opacity, 0.3) * 0.5);
    }
    100% {
      transform: scale(1.2);
      opacity: 0;
    }
  }
`;
var __decorate$4 = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
const DEFAULT_RINGS = 3;
const DEFAULT_DURATION = 2;
const DEFAULT_OPACITY = 0.3;
const DEFAULT_SIZE = "200px";
const COLOR_BY_VARIANT = {
  "accent-primary": vars.tokens.core.backgroundAccentPrimary
};
let WuiPulse = class WuiPulse2 extends i$1 {
  constructor() {
    super(...arguments);
    this.rings = DEFAULT_RINGS;
    this.duration = DEFAULT_DURATION;
    this.opacity = DEFAULT_OPACITY;
    this.size = DEFAULT_SIZE;
    this.variant = "accent-primary";
  }
  render() {
    const color = COLOR_BY_VARIANT[this.variant];
    this.style.cssText = `
      --pulse-size: ${this.size};
      --pulse-duration: ${this.duration}s;
      --pulse-color: ${color};
      --pulse-opacity: ${this.opacity};
    `;
    const ringElements = Array.from({ length: this.rings }, (_, i2) => this.renderRing(i2, this.rings));
    return T`
      <div class="pulse-container">
        <div class="pulse-rings">${ringElements}</div>
        <div class="pulse-content">
          <slot></slot>
        </div>
      </div>
    `;
  }
  renderRing(index, total) {
    const delay = index / total * this.duration;
    const style = `animation-delay: ${delay}s;`;
    return T`<div class="pulse-ring" style=${style}></div>`;
  }
};
WuiPulse.styles = [resetStyles, styles$4];
__decorate$4([
  n({ type: Number })
], WuiPulse.prototype, "rings", void 0);
__decorate$4([
  n({ type: Number })
], WuiPulse.prototype, "duration", void 0);
__decorate$4([
  n({ type: Number })
], WuiPulse.prototype, "opacity", void 0);
__decorate$4([
  n()
], WuiPulse.prototype, "size", void 0);
__decorate$4([
  n()
], WuiPulse.prototype, "variant", void 0);
WuiPulse = __decorate$4([
  customElement("wui-pulse")
], WuiPulse);
const styles$3 = css`
  :host {
    display: block;
    border-radius: clamp(0px, ${({ borderRadius: borderRadius2 }) => borderRadius2["8"]}, 44px);
    box-shadow: 0 0 0 1px ${({ tokens: tokens2 }) => tokens2.theme.foregroundPrimary};
    overflow: hidden;
  }
`;
var __decorate$3 = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
let WuiCard = class WuiCard2 extends i$1 {
  render() {
    return T`<slot></slot>`;
  }
};
WuiCard.styles = [resetStyles, styles$3];
WuiCard = __decorate$3([
  customElement("wui-card")
], WuiCard);
const styles$2 = css`
  :host {
    width: 100%;
  }

  :host > wui-flex {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: ${({ spacing: spacing2 }) => spacing2[2]};
    padding: ${({ spacing: spacing2 }) => spacing2[3]};
    border-radius: ${({ borderRadius: borderRadius2 }) => borderRadius2[6]};
    border: 1px solid ${({ tokens: tokens2 }) => tokens2.theme.borderPrimary};
    box-sizing: border-box;
    background-color: ${({ tokens: tokens2 }) => tokens2.theme.foregroundPrimary};
    box-shadow: 0px 0px 16px 0px rgba(0, 0, 0, 0.25);
    color: ${({ tokens: tokens2 }) => tokens2.theme.textPrimary};
  }

  :host > wui-flex[data-type='info'] {
    .icon-box {
      background-color: ${({ tokens: tokens2 }) => tokens2.theme.foregroundSecondary};

      wui-icon {
        color: ${({ tokens: tokens2 }) => tokens2.theme.iconDefault};
      }
    }
  }
  :host > wui-flex[data-type='success'] {
    .icon-box {
      background-color: ${({ tokens: tokens2 }) => tokens2.core.backgroundSuccess};

      wui-icon {
        color: ${({ tokens: tokens2 }) => tokens2.core.borderSuccess};
      }
    }
  }
  :host > wui-flex[data-type='warning'] {
    .icon-box {
      background-color: ${({ tokens: tokens2 }) => tokens2.core.backgroundWarning};

      wui-icon {
        color: ${({ tokens: tokens2 }) => tokens2.core.borderWarning};
      }
    }
  }
  :host > wui-flex[data-type='error'] {
    .icon-box {
      background-color: ${({ tokens: tokens2 }) => tokens2.core.backgroundError};

      wui-icon {
        color: ${({ tokens: tokens2 }) => tokens2.core.borderError};
      }
    }
  }

  wui-flex {
    width: 100%;
  }

  wui-text {
    word-break: break-word;
    flex: 1;
  }

  .close {
    cursor: pointer;
    color: ${({ tokens: tokens2 }) => tokens2.theme.iconDefault};
  }

  .icon-box {
    height: 40px;
    width: 40px;
    border-radius: ${({ borderRadius: borderRadius2 }) => borderRadius2["2"]};
    background-color: var(--local-icon-bg-value);
  }
`;
var __decorate$2 = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
const TYPE_ICON_NAME = {
  info: "info",
  success: "checkmark",
  warning: "warningCircle",
  error: "warning"
};
let WuiAlertBar = class WuiAlertBar2 extends i$1 {
  constructor() {
    super(...arguments);
    this.message = "";
    this.type = "info";
  }
  render() {
    return T`
      <wui-flex
        data-type=${o(this.type)}
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        gap="2"
      >
        <wui-flex columnGap="2" flexDirection="row" alignItems="center">
          <wui-flex
            flexDirection="row"
            alignItems="center"
            justifyContent="center"
            class="icon-box"
          >
            <wui-icon color="inherit" size="md" name=${TYPE_ICON_NAME[this.type]}></wui-icon>
          </wui-flex>
          <wui-text variant="md-medium" color="inherit" data-testid="wui-alertbar-text"
            >${this.message}</wui-text
          >
        </wui-flex>
        <wui-icon
          class="close"
          color="inherit"
          size="sm"
          name="close"
          @click=${this.onClose}
        ></wui-icon>
      </wui-flex>
    `;
  }
  onClose() {
    AlertController.close();
  }
};
WuiAlertBar.styles = [resetStyles, styles$2];
__decorate$2([
  n()
], WuiAlertBar.prototype, "message", void 0);
__decorate$2([
  n()
], WuiAlertBar.prototype, "type", void 0);
WuiAlertBar = __decorate$2([
  customElement("wui-alertbar")
], WuiAlertBar);
const styles$1 = css`
  button {
    display: block;
    display: flex;
    align-items: center;
    padding: ${({ spacing: spacing2 }) => spacing2[1]};
    transition: background-color ${({ durations: durations2 }) => durations2["lg"]}
      ${({ easings: easings2 }) => easings2["ease-out-power-2"]};
    will-change: background-color;
    border-radius: ${({ borderRadius: borderRadius2 }) => borderRadius2[32]};
  }

  wui-image {
    border-radius: 100%;
  }

  wui-text {
    padding-left: ${({ spacing: spacing2 }) => spacing2[1]};
  }

  .left-icon-container,
  .right-icon-container {
    width: 24px;
    height: 24px;
    justify-content: center;
    align-items: center;
  }

  wui-icon {
    color: ${({ tokens: tokens2 }) => tokens2.theme.iconDefault};
  }

  /* -- Sizes --------------------------------------------------- */
  button[data-size='lg'] {
    height: 32px;
  }

  button[data-size='md'] {
    height: 28px;
  }

  button[data-size='sm'] {
    height: 24px;
  }

  button[data-size='lg'] wui-image {
    width: 24px;
    height: 24px;
  }

  button[data-size='md'] wui-image {
    width: 20px;
    height: 20px;
  }

  button[data-size='sm'] wui-image {
    width: 16px;
    height: 16px;
  }

  button[data-size='lg'] .left-icon-container {
    width: 24px;
    height: 24px;
  }

  button[data-size='md'] .left-icon-container {
    width: 20px;
    height: 20px;
  }

  button[data-size='sm'] .left-icon-container {
    width: 16px;
    height: 16px;
  }

  /* -- Variants --------------------------------------------------------- */
  button[data-type='filled-dropdown'] {
    background-color: ${({ tokens: tokens2 }) => tokens2.theme.foregroundPrimary};
  }

  button[data-type='text-dropdown'] {
    background-color: transparent;
  }

  /* -- Focus states --------------------------------------------------- */
  button:focus-visible:enabled {
    background-color: ${({ tokens: tokens2 }) => tokens2.theme.foregroundSecondary};
    box-shadow: 0 0 0 4px ${({ tokens: tokens2 }) => tokens2.core.foregroundAccent040};
  }

  /* -- Hover & Active states ----------------------------------------------------------- */
  @media (hover: hover) and (pointer: fine) {
    button:hover:enabled,
    button:active:enabled {
      background-color: ${({ tokens: tokens2 }) => tokens2.theme.foregroundSecondary};
    }
  }

  /* -- Disabled states --------------------------------------------------- */
  button:disabled {
    background-color: ${({ tokens: tokens2 }) => tokens2.theme.foregroundSecondary};
    opacity: 0.5;
  }
`;
var __decorate$1 = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
const TEXT_VARIANT_BY_SIZE = {
  lg: "lg-regular",
  md: "md-regular",
  sm: "sm-regular"
};
const ICON_SIZE_BY_SIZE = {
  lg: "lg",
  md: "md",
  sm: "sm"
};
let WuiSelect = class WuiSelect2 extends i$1 {
  constructor() {
    super(...arguments);
    this.imageSrc = "";
    this.text = "";
    this.size = "lg";
    this.type = "text-dropdown";
    this.disabled = false;
  }
  render() {
    return T`<button ?disabled=${this.disabled} data-size=${this.size} data-type=${this.type}>
      ${this.imageTemplate()} ${this.textTemplate()}
      <wui-flex class="right-icon-container">
        <wui-icon name="chevronBottom"></wui-icon>
      </wui-flex>
    </button>`;
  }
  textTemplate() {
    const textSize2 = TEXT_VARIANT_BY_SIZE[this.size];
    if (this.text) {
      return T`<wui-text color="primary" variant=${textSize2}>${this.text}</wui-text>`;
    }
    return null;
  }
  imageTemplate() {
    if (this.imageSrc) {
      return T`<wui-image src=${this.imageSrc} alt="select visual"></wui-image>`;
    }
    const iconSize = ICON_SIZE_BY_SIZE[this.size];
    return T` <wui-flex class="left-icon-container">
      <wui-icon size=${iconSize} name="networkPlaceholder"></wui-icon>
    </wui-flex>`;
  }
};
WuiSelect.styles = [resetStyles, elementStyles, styles$1];
__decorate$1([
  n()
], WuiSelect.prototype, "imageSrc", void 0);
__decorate$1([
  n()
], WuiSelect.prototype, "text", void 0);
__decorate$1([
  n()
], WuiSelect.prototype, "size", void 0);
__decorate$1([
  n()
], WuiSelect.prototype, "type", void 0);
__decorate$1([
  n({ type: Boolean })
], WuiSelect.prototype, "disabled", void 0);
WuiSelect = __decorate$1([
  customElement("wui-select")
], WuiSelect);
const styles = css`
  :host {
    display: flex;
    align-items: center;
    gap: ${({ spacing: spacing2 }) => spacing2[1]};
    padding: ${({ spacing: spacing2 }) => spacing2[2]} ${({ spacing: spacing2 }) => spacing2[3]}
      ${({ spacing: spacing2 }) => spacing2[2]} ${({ spacing: spacing2 }) => spacing2[2]};
    border-radius: ${({ borderRadius: borderRadius2 }) => borderRadius2[20]};
    background-color: ${({ tokens: tokens2 }) => tokens2.theme.foregroundPrimary};
    box-shadow:
      0px 0px 8px 0px rgba(0, 0, 0, 0.1),
      inset 0 0 0 1px ${({ tokens: tokens2 }) => tokens2.theme.borderPrimary};
    max-width: 320px;
  }

  wui-icon-box {
    border-radius: ${({ borderRadius: borderRadius2 }) => borderRadius2.round} !important;
    overflow: hidden;
  }

  wui-loading-spinner {
    padding: ${({ spacing: spacing2 }) => spacing2[1]};
    background-color: ${({ tokens: tokens2 }) => tokens2.core.foregroundAccent010};
    border-radius: ${({ borderRadius: borderRadius2 }) => borderRadius2.round} !important;
  }
`;
var __decorate = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
let WuiSnackbar = class WuiSnackbar2 extends i$1 {
  constructor() {
    super(...arguments);
    this.message = "";
    this.variant = "success";
  }
  render() {
    return T`
      ${this.templateIcon()}
      <wui-text variant="lg-regular" color="primary" data-testid="wui-snackbar-message"
        >${this.message}</wui-text
      >
    `;
  }
  templateIcon() {
    const COLOR = {
      success: "success",
      error: "error",
      warning: "warning",
      info: "default"
    };
    const ICON = {
      success: "checkmark",
      error: "warning",
      warning: "warningCircle",
      info: "info"
    };
    if (this.variant === "loading") {
      return T`<wui-loading-spinner size="md" color="accent-primary"></wui-loading-spinner>`;
    }
    return T`<wui-icon-box
      size="md"
      color=${COLOR[this.variant]}
      icon=${ICON[this.variant]}
    ></wui-icon-box>`;
  }
};
WuiSnackbar.styles = [resetStyles, styles];
__decorate([
  n()
], WuiSnackbar.prototype, "message", void 0);
__decorate([
  n()
], WuiSnackbar.prototype, "variant", void 0);
WuiSnackbar = __decorate([
  customElement("wui-snackbar")
], WuiSnackbar);
export {
  MathUtil as M,
  TransactionUtil as T,
  UiHelperUtil as U,
  setThemeVariables as a,
  css as b,
  customElement as c,
  initializeTheming as i,
  setColorTheme as s,
  vars as v
};
