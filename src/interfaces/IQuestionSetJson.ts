import type { ILevel } from "./ILevel";
import type { IQuestion } from "./IQuestion";

export interface IQuestionSetJson {
    id: string,
    parentid: string,
    name: string,
    slideFull: string,
    slideSource: string,
    description: string,
    wrongFeedback: string,
    rightFeedback: string,
    openFeedback: string,
    competency: string,
    yearGroup: Array<number>, /********************** TBD: CHECK TYPE ********************/
    walt: string,
    notes: string,
    questions: Array<IQuestion>,
    levels: Array<ILevel>
    verFrom: string,
    capabilityDate: string,
    retries: number
    published: number,
    shared: boolean,
    reference: string, /********************** TBD: CHECK TYPE ********************/
    slide: string
}