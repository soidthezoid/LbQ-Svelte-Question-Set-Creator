import type { IPopupButton } from "./IPopupButton";

export interface IPopupData { width: string; height: string; header: string; message: string; smallInfo: string; buttons: Array<IPopupButton>; }