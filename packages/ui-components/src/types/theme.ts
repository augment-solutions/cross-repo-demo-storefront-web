export interface ColorScale {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
  950: string;
}

export interface ThemeColors {
  primary: ColorScale;
  secondary: ColorScale;
  success: Partial<ColorScale>;
  warning: Partial<ColorScale>;
  error: Partial<ColorScale>;
  gray: ColorScale;
}

export interface ThemeSpacing {
  0: string;
  1: string;
  2: string;
  3: string;
  4: string;
  5: string;
  6: string;
  8: string;
  10: string;
  12: string;
  16: string;
  20: string;
  24: string;
}

export interface ThemeBorderRadius {
  none: string;
  sm: string;
  DEFAULT: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
  full: string;
}

export interface ThemeShadow {
  sm: string;
  DEFAULT: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
  inner: string;
  none: string;
}

export interface ThemeFontSize {
  xs: [string, { lineHeight: string }];
  sm: [string, { lineHeight: string }];
  base: [string, { lineHeight: string }];
  lg: [string, { lineHeight: string }];
  xl: [string, { lineHeight: string }];
  '2xl': [string, { lineHeight: string }];
  '3xl': [string, { lineHeight: string }];
  '4xl': [string, { lineHeight: string }];
  '5xl': [string, { lineHeight: string }];
}

export interface ThemeBreakpoints {
  sm: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
}

export interface Theme {
  colors: ThemeColors;
  spacing: ThemeSpacing;
  borderRadius: ThemeBorderRadius;
  shadow: ThemeShadow;
  fontSize: ThemeFontSize;
  breakpoints: ThemeBreakpoints;
}

