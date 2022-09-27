import type { ILevel } from "../interfaces/ILevel";
import type { IQuestion } from "../interfaces/IQuestion";
import type { IMarker } from "../interfaces/IMarker";

export type DefaultObjectType = "Level" | "Text" | "Numeric" | "YesNo" | "TrueFalse" | "MultipleChoice" | "Sort";

export class Utils {

    static CREATOR_KEY = Symbol();static cloneNode(node: Element): Element {
        const clone = node.cloneNode(true) as Element;
        const selects1 = node.getElementsByTagName("SELECT") as HTMLCollectionOf<HTMLSelectElement>;
        const selects2 = clone.getElementsByTagName("SELECT") as HTMLCollectionOf<HTMLSelectElement>;
        for (let i = 0; i < selects2.length; i++) { selects2[i].value = selects1[i].value; }
        return clone;
    }

    static getDefaultObject(type: DefaultObjectType): ILevel | IQuestion {
        const objectType = Utils.stripQuotes(type);
        if (objectType === "Text") { return { id: Utils.createGuid(), type: "Text", value: "", rightFeedback: "", wrongFeedback: "", openFeedback: "", answers: [] }; }
        else if (objectType === "Numeric") { return { id: Utils.createGuid(), type: "Numeric", value: "", rightFeedback: "", wrongFeedback: "", openFeedback: "", answers: [] }; }
        else if (objectType === "YesNo") { return { id: Utils.createGuid(), type: "YesNo", value: "", rightFeedback: "", wrongFeedback: "", openFeedback: "", answers: [{ "id": Utils.createGuid(), "value": "Yes", "feedback": "", "isCorrect": false }, { "id": Utils.createGuid(), "value": "No", "feedback": "", "isCorrect": false }] }; }
        else if (objectType === "TrueFalse") { return { id: Utils.createGuid(), type: "TrueFalse", value: "", rightFeedback: "", wrongFeedback: "", openFeedback: "", answers: [{ "id": Utils.createGuid(), "value": "True", "feedback": "", "isCorrect": false }, { "id": Utils.createGuid(), "value": "False", "feedback": "", "isCorrect": false }] }; }
        else if (objectType === "MultipleChoice") { return { id: Utils.createGuid(), type: "MultipleChoice", value: "", rightFeedback: "", wrongFeedback: "", openFeedback: "", answers: [] }; }
        else if (objectType === "Sort") { return { id: Utils.createGuid(), type: "Sort", value: "", rightFeedback: "", wrongFeedback: "", openFeedback: "", answers: [] }; }
        else { return { id: Utils.createGuid(), level: 1, levelName: "", progress: 0, navigation: false, random: false, retries: 0, collapsed: false, questions: [ ] }; }
    }

    static copyObject(obj: ILevel | IQuestion | IMarker | null, options?: { uniqueId: boolean }): Record<string, unknown> {
        const ret = JSON.parse(JSON.stringify(obj)) as Record<string, unknown>;
        if (options && options.uniqueId) {
            if (ret.id) { ret.id = Utils.createGuid(); }
            const qObj = ret as unknown as IQuestion;
            if (qObj.answers) { for (const a of qObj.answers) { a.id = Utils.createGuid(); } }
        }
        //for (const prop in obj) { if (typeof obj[prop] === "function") { ret[prop] = obj[prop]; } }
        return ret;
    }

    static getObjectById(array: Array<ILevel | IQuestion | IMarker>, id: string): ILevel | IQuestion | IMarker | null {
        for (const obj of array) { if (obj && obj.id === id) { return obj; } }
        return null;
    }

    static stripQuotes(str: string): string {
        return str ? str.replaceAll("\"", "") : "";
    }

    static createGuid(): string {
        const _p8 = (s?: boolean) => {
            const p = (Math.random().toString(16) + "000000000").substr(2, 8);
            return s ? "-" + p.substr(0, 4) + "-" + p.substr(4, 4) : p;
        };
        return _p8() + _p8(true) + _p8(true) + _p8();
    }

    static getNodeAncestor(node: Node, tagName: string): ParentNode {
        let ret = node as ParentNode;
        let element = ret as Element;
        while (element.tagName !== tagName.toUpperCase()) { ret = ret.parentNode as ParentNode; element = ret as Element; }
        return ret;
    }
    
    static getCursorPos(textarea: any): { start: number, end: number } {
        if ("selectionStart" in textarea && document.activeElement === textarea) {
            return { start: textarea.selectionStart, end: textarea.selectionEnd };
        }
        else if (textarea.createTextRange) {
            const sel = document.selection.createRange();
            if (sel.parentElement() === textarea) {
                const rng = textarea.createTextRange();
                let len;
                let pos;

                rng.moveToBookmark(sel.getBookmark());

                for (len = 0;
                     rng.compareEndPoints("EndToStart", rng) > 0;
                     rng.moveEnd("character", -1)) {
                    len++;
                }

                rng.setEndPoint("StartToStart", textarea.createTextRange());

                for (pos = { start: 0, end: len };
                     rng.compareEndPoints("EndToStart", rng) > 0;
                     rng.moveEnd("character", -1)) {
                    pos.start++;
                    pos.end++;
                }
                return pos;
            }
        }
        return { start: -1, end: -1 };
    }

    /*static setCursorPos(textarea: any, start: number, end: number) {
        if (arguments.length < 3) { end = start };
        if ("selectionStart" in textarea) {
            setTimeout( () => {
                textarea.selectionStart = start;
                textarea.selectionEnd = end;
            }, 1);
        }
        else if (textarea.createTextRange) {
            var rng = textarea.createTextRange();
            rng.moveStart("character", start);
            rng.collapse();
            rng.moveEnd("character", end - start);
            rng.select();
        }
    }*/

    /*static getListComponent(item: ILevel | IQuestion): unknown {
        return item.id.includes("marker-") ? AddButton : ((<IQuestion>item).answers ? Question : Level);
    }*/

    /*static getObjectNumber(item: ILevel | IQuestion, json: any): number { 
        for (let i = 0; i < json.levels.length; i++) { if (item.id === json.levels[i].id) { return i + 1; } }
        for (let j = 0; j < json.questions.length; j++) { if (item.id === json.questions[j].id) { return j + 1; } }
        return -1;
    }*/

    /*static getObjectNumber(index: number, visList: Array<ILevel | IQuestion>): number {
        if ((<ILevel>visList[index]).level) { return (<ILevel>visList[index]).level; }
        let num = 0; for (let i = 0; i < index; i++) { if (!(<ILevel>visList[i]).level) { num++; } } return num;
    }*/

    /*static getArrayItemByProp(arr: Array<any>, prop: { key: string; value: any; }): any {
        for (let item of arr) { if (item[prop.key] === prop.value) { return item; } }
        return null;
    }*/
}