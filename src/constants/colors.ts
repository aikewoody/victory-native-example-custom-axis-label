const green = '#69BB00';
const red = '#FF2A13';
const blue = '#1990C6';

const yellow = '#FFB200';
const orange = '#FF7614';

const gray1 = '#666666';
const gray2 = '#ABABAB';
const gray3 = '#CCCCCC';
const gray4 = '#D9D9D9';
const gray5 = '#EBEBEB';

const black = '#000000';
const white = '#FFFFFF';

export const colors = {
  black,
  blue,
  border: gray2,
  danger: red,
  gray1,
  gray2,
  gray3,
  gray4,
  gray5,
  green,
  info: blue,
  orange,
  overlayBackground: 'rgba(0,0,0,0.8)',
  primary: yellow,
  red,
  secondary: orange,
  success: green,
  transparent: 'transparent',
  warning: orange,
  white,
  yellow,
} as const;

export type TColorKey = keyof typeof colors;
