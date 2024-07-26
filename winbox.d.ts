declare module 'winbox/src/js/winbox' {
  interface WinBoxOptions {
    url?: string;
    width?: string | number;
    height?: string | number;
    top?: number;
    right?: number;
    bottom?: number;
    left?: number;
    title?: string;
    class?: string;
    onfocus?: () => void;
    onblur?: () => void;
  }

  class WinBox {
    constructor(title: string, options?: WinBoxOptions);
    setBackground(color: string): void;
  }

  export default WinBox;
}