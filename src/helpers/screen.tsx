export enum Mode {
  Modal = "modal",
  HalfPanel = "half-panel",
  Replace = "replace",
  Initial = "initial",
  Push = "push"
}
export const isModal = (mode: Mode) => mode === Mode.Modal;
export const isHalfPanel = (mode: Mode) => mode === Mode.HalfPanel;
export const isPush = (mode: Mode) => mode === Mode.Push;
export const hasYTransition = (mode: Mode) =>
  isModal(mode) || isHalfPanel(mode);
export const hasXTransition = (mode: Mode) => !hasYTransition(mode);
export const getModeBackground = (mode: Mode) => {
  switch (mode) {
    case "half-panel":
      return "transparent";
    default:
      return "#fff";
  }
};
