import { writable } from "svelte/store";

import Popup from "../component/Molecules/Popup.svelte";

import type { IPopupButton } from "../interfaces/IPopupButton";
import type { IQuestionSetJson } from "../interfaces/IQuestionSetJson";
import type { ILevel } from "../interfaces/ILevel";
import type { ILevelQuestion } from "../interfaces/ILevelQuestion";
import type { IQuestion } from "../interfaces/IQuestion";
import type { IMarker } from "../interfaces/IMarker";
import type { IIndexRange } from "../interfaces/IIndexRange";
import type { DefaultObjectType } from "../utils/Utils";

import { Utils } from "../utils/Utils";

export type VisibleList = Array<ILevel | IQuestion | IMarker>;

export const json: IQuestionSetJson = { /**************************** TBD: input should be either a brand-new, inited JSON or loaded JSON *************************************/
    "id": "e4c76c4a-0615-4966-9e55-1950c593be4b",
    "parentid": "null",
    "name": "Q Set Title Here",
    "slideFull": "null",
    "slideSource": "null",
    "description": "",
    "wrongFeedback": "Incorrect, try again.",
    "rightFeedback": "Correct.",
    "openFeedback": "Thank you.",
    "competency": "Q Set Objective Here",
    "yearGroup": [ ],
    "walt": "",
    "notes": "Q Set Notes Here",
    "questions": [
        { id: "8e2b29f5-1938-453f-81f7-d65036d396aa", type: "Text", value: "A", rightFeedback: "Utterly correct!", wrongFeedback: "Horrendously wrong!", openFeedback: "Whatever man.", answers: [ { id: "6a291f7c-973a-b92c-c03a-c47a96e9df83", value: "Right answer", feedback: "Spot on!",                       isCaseSensitive: true,  isCorrect: true,     whitespace: 1 }, { id: "b1acb3ce-8a70-d35a-55de-9edc1fb96f80",     value: "Wrong answer",  feedback: "Oops! Try again.",   isCaseSensitive: true,  isCorrect: false,   whitespace: 2 } ] },
        { id: "c7f5d184-0ef8-4e86-860d-047a7c378f97", type: "Text", value: "B", rightFeedback: "Utterly correct!", wrongFeedback: "Horrendously wrong!", openFeedback: "Whatever man.", answers: [ { id: "a39e0dd3-7e24-b384-2676-b5f70b5d42a6", value: "Lyons",        feedback: "No, give that another shot.",    isCaseSensitive: false, isCorrect: false,   whitespace: 1 }, { id: "fbedb5ad-f639-1e0d-3bc0-966cb88b32ea",      value: "Paris",         feedback: "Excellent!",         isCaseSensitive: false, isCorrect: true,    whitespace: 2 } ] },
        { id: "6213b97b-f500-4239-a41e-c671bfd9c6cb", type: "Text", value: "C", rightFeedback: "Utterly correct!", wrongFeedback: "Horrendously wrong!", openFeedback: "Whatever man.", answers: [ { id: "1f291f7c-973a-b92c-c03a-c47a96e9df83", value: "Right answer", feedback: "Spot on!",                       isCaseSensitive: true,  isCorrect: true,     whitespace: 1 }, { id: "e3rcb3ce-8a70-d35a-55de-9edc1fb96f80",     value: "Wrong answer",  feedback: "Oops! Try again.",   isCaseSensitive: true,  isCorrect: false,   whitespace: 2 } ] },
        { id: "fda6314d-bc8c-49e3-92ab-e1421b90f9df", type: "Text", value: "D", rightFeedback: "Utterly correct!", wrongFeedback: "Horrendously wrong!", openFeedback: "Whatever man.", answers: [ { id: "3u291f7c-973a-b92c-c03a-c47a96e9df83", value: "Right answer", feedback: "Spot on!",                       isCaseSensitive: true,  isCorrect: true,     whitespace: 1 }, { id: "d48cb3ce-8a70-d35a-55de-9edc1fb96f80",     value: "Wrong answer",  feedback: "Oops! Try again.",   isCaseSensitive: true,  isCorrect: false,   whitespace: 2 } ] }
    ],
    "levels": [
        {
            "questions": [
                {
                    "id": "8e2b29f5-1938-453f-81f7-d65036d396aa",
                    "retries": 12
                },
                {
                    "id": "c7f5d184-0ef8-4e86-860d-047a7c378f97",
                    "retries": 8
                }
            ],
            "id": "c36ecc4e-3148-452f-ab3d-2050d02d99d9",
            "level": 1,
            "levelName": "First Level",
            "progress": 2,
            "navigation": false,
            "random": false,
            "retries": 3,
            "collapsed": false
        },
        {
            "questions": [
                {
                    "id": "6213b97b-f500-4239-a41e-c671bfd9c6cb",
                    "retries": 13
                },
                {
                    "id": "fda6314d-bc8c-49e3-92ab-e1421b90f9df",
                    "retries": 2
                }
            ],
            "id": "321b5b1e-b7cd-4fa3-9513-04bcd11af2e9",
            "level": 2,
            "levelName": "Second Level",
            "progress": 2,
            "navigation": false,
            "random": false,
            "retries": 4,
            "collapsed": false
        }
    ],
    "verFrom": "/Date(1651679983009)/",
    "capabilityDate": "/Date(1558349340950)/",
    "retries": 0,
    "published": 0,
    "shared": false,
    "reference": "null",
    "slide": "null"
};

let cPanelIns = { id: "none", index: -1, type: "" };
let fullList = initList();
export let visList = initList( { visOnly: true } );
export const visListStore = writable(visList); // ********** TBD: Should be readable instead ?

/*************** TBD: MAKE MODEL.TS SOME KIND OF EVENT DISPATCHER SO THAT GUI IN QUESTION-SET-CREATOR ROUTE KNOWS IF AND WHEN TO RESPOND TO CHANGES IN DATA E.G. DraggableList.scrollToBottom() ***************/

export function addQuestion(): void {
    visList = [...visList, Utils.getDefaultObject("Text")]; visListStore.set(visList); /*sortableList.scrollToBottom();*/ update();
}
export function logJSON(): void {
    console.clear(); console.log(json);
}
export function initList(options?: { visOnly: boolean } ): VisibleList {
    const ret: Array<ILevel | IQuestion> = [ ];
    for (const l of json.levels) { 
        ret.push(l); 
        if (!options || !options.visOnly || !l.collapsed) { 
            for (const obj of l.questions) { 
                for (const q of json.questions) { 
                    if (obj.id === q.id) { 
                        ret.push(q); 
                    } 
                } 
            } 
        } 
    }
    return ret;
}
export function updateVisList(): void {
    const newVisList = [ ]; 
    for (const obj of fullList) { 
        if ((<ILevel>obj).level) { 
            newVisList.push(obj); 
            if (!(<ILevel>obj).collapsed) { 
                for (const q of (<ILevel>obj).questions) { 
                    newVisList.push(Utils.getObjectById(fullList, q.id)); 
                } 
            } 
        } 
    } 
    visList = newVisList as VisibleList; visListStore.set(visList);
}
export function sortList(ev: CustomEvent) {
    visList = ev.detail as Array<ILevel | IQuestion>; 
    visListStore.set(visList); //update();
}
export function listDragEnd() {
    update(); updateVisList();
}
export function getQuestionInsertMarkerIndex(): number {
    for (let i = 0; i < visList.length; i++) { 
        if ((<ILevel | IQuestion | IMarker>visList[i]).id.includes("marker-")) { 
            return i; 
        } 
    } 
    return -1;
}
export function creativePanelDragEnd(): void {
    if (cPanelIns.type !== "") { 
        visList.splice(cPanelIns.index, 0, Utils.getDefaultObject(cPanelIns.type as DefaultObjectType)); 
        visListStore.set(visList); 
    } 
    removeInsertMarker(); 
    update(); 
    updateVisList();
}
export function removeInsertMarker(): void {
    for (let i = 0; i < visList.length; i++) { 
        if ((<ILevel | IQuestion | IMarker>visList[i]).id.includes("marker-")) { 
            visList.splice(i, 1); 
            break; 
        } 
    } 
    visListStore.set(visList); cPanelIns = { id: "none", index: -1, type: "" };
}
export function duplicateLevel(e: CustomEvent): void {
    const detail = e.detail as Record<string, unknown>; 
    const indexRange = getLevelIndexRange(detail.levelData as ILevel); 
    const level = visList[Number(indexRange.start)]; 
    const levelCopy = Utils.copyObject(level, { uniqueId: true }) as unknown as ILevel; 
    levelCopy.questions = [ ];
    visList.splice(indexRange.end + 1, 0, levelCopy);
    for (let i = 1; i < indexRange.length; i++) { 
        const obj = visList[Number(indexRange.start) + i]; 
        const copy = Utils.copyObject(obj, { uniqueId: true }) as unknown as IQuestion; 
        levelCopy.questions.push( { id: copy.id, retries: (<ILevel>level).questions[i - 1].retries } ); 
        visList.splice(indexRange.end + 1 + i, 0, copy);
    } 
    visListStore.set(visList);
    update();
}
export function deleteLevel(e: CustomEvent): void {
    const detail = e.detail as Record<string, unknown>;
    const indexRange = getLevelIndexRange(detail.levelData as ILevel);
    openPopup({ 
        header: "Attention", 
        msg: "How would you like to proceed with deletion of this level?", 
        small: "[ to bypass prompt hold SHIFT to delete level only or CTRL to delete level & its questions ]", 
        width: "400px", 
        height: "230px", 
        buttons: [ 
            { label: "Level only", callback: () => { doDeleteLevel(indexRange, { levelOnly: true }); } }, 
            { label: "Level and questions", callback: () => { doDeleteLevel(indexRange); } }, 
            { label: "Cancel" } 
        ] 
    });
}
export function doDeleteLevel(indexRange: IIndexRange, options?: { levelOnly: boolean; }): void {
    visList = visList.filter(function(el, index) { 
        return options && options.levelOnly ? index !== indexRange.start : index < indexRange.start || index > indexRange.end; 
    }); 
    visListStore.set(visList); 
    update();
}
export function addLevelQuestion(e: CustomEvent): void {
    const detail = e.detail as Record<string, unknown>;
    const indexRange = getLevelIndexRange(detail.levelData as ILevel);
    //const insertAt = detail.insertAt as number;
    visList.splice(indexRange.end + 1, 0, Utils.getDefaultObject("Text")); 
    visListStore.set(visList);
    //if (detail.insertAt === visList.length - 1) { sortableList.scrollToBottom(); }
    update();
}
export function duplicateQuestion(e: CustomEvent): void {
    const detail = e.detail as Record<string, unknown>;
    const index = visList.indexOf(detail.data as IQuestion);
    visList.splice(Number(index) + 1, 0, Utils.copyObject(visList[Number(index)], { uniqueId: true }) as unknown as IQuestion); 
    visListStore.set(visList); 
    update();
}
export function deleteQuestion(e: CustomEvent): void {
    const detail = e.detail as Record<string, unknown>;
    const index = visList.indexOf(detail.data as IQuestion);
    openPopup( { 
        header: "Attention", 
        msg: "Would you like to delete this question?", 
        small: "[ Hold SHIFT to delete without prompt ]", 
        buttons: [ 
            { label: "Ok", callback: () => { doDeleteQuestion(Number(index)); } }, 
            { label: "Cancel" } 
        ] 
    });
}
export function doDeleteQuestion(delIndex: number): void {
    visList = visList.filter(function(el, index) { return index !== delIndex; }); visListStore.set(visList); update();
}
export function creativePanelClickInsert(ev: CustomEvent): void {
    const detail = ev.detail as Record<string, unknown>; const target = detail.target as Record<string, unknown>; visList = [...visList, Utils.getDefaultObject(target.id as DefaultObjectType)] as VisibleList; visListStore.set(visList); update(); //sortableList.scrollToBottom();
}
export function creativePanelDragInsert(ev: CustomEvent): void {
    const detail = ev.detail as Record<string, unknown>;
    const sourceNode = detail.sourceNode as Record<string, unknown>;
    const sourceDataset = sourceNode.dataset as Record<string, unknown>;
    const targetNode = detail.targetNode as Record<string, unknown>;
    const targetDataset = targetNode ? targetNode.dataset as Record<string, unknown> : undefined;
    const insertId = targetDataset ? String(targetDataset.id) : null; 
    if (insertId && insertId.includes("marker-")) { return; }
    const insertIndex: number | null = targetDataset ? Number(targetDataset.index) : detail.aboveFirstNode ? 0 : detail.belowLastNode ? visList.length - 1 : null; //ev.detail.dragDirection === "up" ? targetDataset.index : Number(targetDataset.index) + 1;
    const insertType = String(sourceDataset.id);
    const dragChange = (detail.dragDirection === "up" && insertIndex !== null && getQuestionInsertMarkerIndex() > insertIndex) || (detail.dragDirection === "down" && insertIndex !== null && getQuestionInsertMarkerIndex() < insertIndex); //ev.detail.dragDirection !== ev.detail.prevDragDirection;
    
    if ((insertId !== cPanelIns.id || dragChange) && insertId !== null && insertIndex !== null) {
        removeInsertMarker();
        visList.splice(insertIndex, 0, { id: "marker-" + Utils.createGuid() } );
        visListStore.set(visList);
        cPanelIns = { id: insertId, index: insertIndex, type: insertType };
    }
}
export function update(): void {
    // UPDATE FULL LIST
    const newFullList = [ ];
    let currentLevelObj: ILevel = visList[0] as ILevel;
    let updatedLevelQuestions1: Array<ILevelQuestion> = [ ];
    let allLevelQuestions: Array<ILevelQuestion> = [ ]; 
    for (const obj of visList) { 
        if ((<ILevel>obj).questions) { 
            allLevelQuestions = allLevelQuestions.concat((<ILevel>obj).questions); 
        } 
    }

    newFullList.push(currentLevelObj);

    if (currentLevelObj.collapsed) {
        //updatedLevelQuestions1 = currentLevelObj.questions;
        for (const question of currentLevelObj.questions) {
            newFullList.push((<IQuestion>Utils.getObjectById(fullList, question.id)));
        }
    }
    
    for (let i = 1; i < visList.length; i++) {
        const obj = visList[i];
        if ((<ILevel>obj).level) {
            if (i > 0) {
                currentLevelObj.questions = updatedLevelQuestions1;
                if (currentLevelObj.questions.length === 0) { 
                    currentLevelObj.collapsed = true; 
                }
            }
            currentLevelObj = obj as ILevel;
            updatedLevelQuestions1 = [ ];
            newFullList.push(currentLevelObj);

            if (currentLevelObj.collapsed) {
                updatedLevelQuestions1 = currentLevelObj.questions;
                for (const question of currentLevelObj.questions) {
                    newFullList.push((<IQuestion>Utils.getObjectById(fullList, question.id)));
                }
            }
        } else {
            updatedLevelQuestions1.push(Utils.getObjectById(allLevelQuestions, (<IQuestion>obj).id) as ILevelQuestion || { id: (<IQuestion>obj).id, retries: 0 });
            newFullList.push(obj);
        }
    }
    currentLevelObj.questions = updatedLevelQuestions1;
    
    if (currentLevelObj.questions.length === 0) { 
        currentLevelObj.collapsed = true; 
    }
    
    fullList = newFullList;
    
    // UPDATE LEVELS
    let counter = 1; for (const obj of visList) {
        if ((<ILevel>obj).level) {
            (<ILevel>obj).level = counter; 
            counter++;
            if ((<ILevel>obj).progress === 0 && (<ILevel>obj).questions.length > 0) { 
                (<ILevel>obj).progress = 1; 
            }
            if ((<ILevel>obj).progress > (<ILevel>obj).questions.length) { 
                (<ILevel>obj).progress = (<ILevel>obj).questions.length; 
            }
        }
    }

    // BUILD JSON
    const levels: Array<ILevel> = [ ];
    const questions: Array<IQuestion> = [ ];
    let updatedLevelQuestions2: Array<ILevelQuestion> = [ ];

    for (let i = 0; i < fullList.length; i++) {
        const obj = fullList[i];

        if ((<ILevel>obj).level) {
            if (i > 0) { 
                levels[levels.length - 1].questions = updatedLevelQuestions2; 
                updatedLevelQuestions2 = [ ]; 
            }
            levels.push(obj as ILevel);
        } else {
            updatedLevelQuestions2.push(Utils.getObjectById(levels[levels.length - 1].questions, (<IQuestion>obj).id) as ILevelQuestion || { id: (<IQuestion>obj).id, retries: 0 });
            questions.push(<IQuestion>obj);
        }
    }

    json.levels = levels;
    json.questions = questions;
}
export function openPopup(data: { width?: string; height?: string; header: string; msg: string; small: string; buttons?: Array<IPopupButton>; }): void {
    const popup = new Popup({ 
        target: document.body, 
        props: { 
            data: { 
                width: data.width || "300px", 
                height: data.height || "200px", 
                header: data.header, 
                message: data.msg, 
                smallInfo: data.small, 
                buttons: data.buttons || [ ] 
            } 
        } 
    });
    popup.$on("close", () => { popup.$destroy(); });
}
export function getLevelInfo(data: ILevel): string {
    return data.questions && data.questions.length ? String(data.questions.length) + (data.questions.length > 1 ? " Questions " : " Question ") +  "[ Q" + String(getQuestionNumber(data.questions[0])) + (data.questions.length > 1 ? " - Q" + String(getQuestionNumber(data.questions[data.questions.length - 1])) : "" )  + " ]" : "This level has no questions";
}
export function getQuestionNumber(data: ILevelQuestion | IQuestion): number {
    for (let i = 0; i < json.questions.length; i++) { if (json.questions[i].id === data.id) { return i + 1; } } return -1;
}
export function getLevelQuestion(data: IQuestion): ILevelQuestion | null {
    for (const level of json.levels) {
        for (const question of level.questions) {
            if (question.id === data.id) {
                return question;
            }
        }    
    }
    return null;
}
function getLevelIndexRange(data: ILevel): IIndexRange {
    return { start: visList.indexOf(data), end: visList.indexOf(data) + data.questions.length, length: data.questions.length + 1 };
}