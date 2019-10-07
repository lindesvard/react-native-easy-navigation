import { ModeType } from '../types';

export const isModal = (mode: ModeType) => mode === 'modal';
export const isDrawer = (mode: ModeType) => mode === 'drawer';
export const isHalfPanel = (mode: ModeType) => mode === 'half-panel';
export const isPush = (mode: ModeType) => mode === 'push';
export const hasYTransition = (mode: ModeType) =>
  isModal(mode) || isHalfPanel(mode);
export const hasXTransition = (mode: ModeType) => !hasYTransition(mode);
export const getModeBackground = (mode: ModeType) => {
  switch (mode) {
    case 'half-panel':
    case 'overlay':
    case 'drawer':
      return 'transparent';
    default:
      return '#fff';
  }
};
