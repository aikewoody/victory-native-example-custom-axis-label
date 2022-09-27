/* eslint-disable sort-keys-fix/sort-keys-fix */
export const grid = {
  xxxs: 2,
  xxs: 4,
  xs: 8,
  s: 12,
  screen: 16.0,
  m: 16,
  l: 24,
  xl: 32,
  xxl: 48,
  xxxl: 64,
} as const;
/* eslint-enable sort-keys-fix/sort-keys-fix */

export type TGridSizeKey = keyof typeof grid;

export const sizes = {
  ...grid,
  backgroundTopImageHeight: 180,
  badge: grid.l,
  borderRadiusButton: grid.xs,
  breweryLogo: 128,
  buttonHeight: 56,
  imageInput: 128,
  itemHeightMedium: 96,
  itemHeightSmall: 84,
  itemPadding: grid.s,
  pillHeight: 42,
  profileImage: 128,
  profileImageSmall: grid.xl,
  // @todo: Complete the refactor from value l to m
  screenPadding: grid.m,
  searchFieldHeight: 42,
  segmentControlHeight: 42,
  storyCircle: grid.xxxl,
  tagHeight: grid.xl,
  tooltip: grid.xs,
} as const;
