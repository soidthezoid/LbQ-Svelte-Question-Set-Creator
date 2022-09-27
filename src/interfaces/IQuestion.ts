import type { IAnswer } from "./IAnswer";

export interface IQuestion { id: string; type: string; value: string; rightFeedback: string; wrongFeedback: string; openFeedback: string; answers: IAnswer[ ]; }