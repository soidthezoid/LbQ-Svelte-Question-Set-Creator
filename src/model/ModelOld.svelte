<div class="model"></div>

<script lang="ts">
    import { getContext } from "svelte";
    import { writable } from "svelte/store";

    //import type { QuestionSetJson } from "../interfaces/QuestionSetJson";
    import type { LevelObj } from "../interfaces/LevelObj";
    import type { LevelQuestionObj } from "../interfaces/LevelQuestionObj";
    import type { QuestionObj } from "../interfaces/QuestionObj";
    import type { IndexRange } from "../interfaces/IndexRange";
    //import type {LevelQuestionObj} from "../interfaces/LevelQuestionObj";
    
    import {Utils} from "../utils/Utils";
    
    export let json: Record<string, unknown>;
    
    const fullList = writable(initList( { visOnly: false } ));
    export const visList = writable(initList( { visOnly: true } ));
    export const visListArray = $visList;
    
    console.log("$visList in model = ", $visList);

    const { DELETE_L, DELETE_Q, openPopup } = getContext(Utils.CREATOR_KEY);

    let cPanelIns = { id: "none", index: -1, type: "" };
    
    export function addQuestion(): void {
        visList.set([...$visList, Utils.getEmptyObject("Text") ]); /*sortableList.scrollToBottom();*/ //update();
    }
    export function logJSON(): void {
        console.clear(); console.log($json);
    }
    export function initList(options?: { visOnly: boolean } ): Array<LevelObj | QuestionObj> {
        let ret: Array<LevelObj | QuestionObj> = [ ]; for (let l of $json.levels as Array<LevelObj>) { ret.push(l); if (!options || !options.visOnly || !l.collapsed) { for (let obj of l.questions) { for (let q of $json.questions as Array<QuestionObj>) { if (obj.id === q.id) { ret.push(q); } } } } } return ret;
    }
    export function updateVisList(): void {
        let newVisList = [ ]; for (let obj of $fullList) { if ((<LevelObj>obj).level) { newVisList.push(obj); if (!(<LevelObj>obj).collapsed) { for (let q of (<LevelObj>obj).questions) { newVisList.push((<QuestionObj>Utils.getObjectById($fullList, q.id))); } } } } visList.set(newVisList);
    }
    export function sortList(ev: CustomEvent) {
        let e = ev as Record<string, unknown>; visList.set(e.detail); update();
    }
    export function getQuestionInsertMarkerIndex(): number {
        for (let i = 0; i < $visList.length; i++) { if ($visList[i].id.includes("marker-")) { return i; } } return -1;
    }
    export function creativePanelDragEnd(): void {
        if (cPanelIns.type !== "") { $visList.splice(cPanelIns.index, 0, Utils.getEmptyObject(cPanelIns.type)); visList.set($visList); } removeInsertMarker(); update(); updateVisList();
    }
    export function removeInsertMarker(): void {
        for (let i = 0; i < $visList.length; i++) { if ($visList[i].id.includes("marker-")) { $visList.splice(i, 1); break; } } visList.set($visList); cPanelIns = { id: "none", index: -1, type: "" };
    }
    export function duplicateLevel(e: CustomEvent): void {
        let detail = e.detail as Record<string, unknown>; let indexRange = detail.indexRange as IndexRange; let level; let levelCopy: LevelObj; for (let i = 0; i < indexRange.length; i++) { let obj = $visList[Number(indexRange.start) + i]; let copy = Utils.copyObject(obj, { uniqueId: true }) as QuestionObj; if (i === 0) { level = obj; levelCopy = copy as LevelObj; levelCopy.questions = [ ]; } else { levelCopy.questions.push( { id: copy.id, retries: (<LevelObj>level).questions[i - 1].retries } ); } $visList.splice(indexRange.end + 1 + i, 0, copy); } visList.set($visList); update();
    }
    export function deleteLevel(e: CustomEvent): void {
        let detail = e.detail as Record<string, unknown>; let indexRange = detail.indexRange as IndexRange; openPopup({ ...DELETE_L, width: "400px", height: "230px", buttons: [ { label: "Level only", callback: () => { doDeleteLevel(indexRange, { levelOnly: true }); } }, { label: "Level and questions", callback: () => { doDeleteLevel(indexRange); } },{ label: "Cancel" } ] } );
    }
    export function doDeleteLevel(indexRange: IndexRange, options?: { levelOnly: boolean; }): void {
        visList.set($visList.filter(function(el, index) { return options && options.levelOnly ? index !== indexRange.start : index < indexRange.start || index > indexRange.end; })); update();
    }
    export function addLevelQuestion(e: CustomEvent): void {
        let detail = e.detail as Record<string, unknown>;
        $visList.splice(detail.insertAt, 0, Utils.getEmptyObject("Text")); visList.set($visList);
        //if (detail.insertAt === $visList.length - 1) { sortableList.scrollToBottom(); }
        update();
    }
    export function duplicateQuestion(e: CustomEvent): void {
        let detail = e.detail as Record<string, unknown>; $visList.splice(Number(detail.index) + 1, 0, Utils.copyObject($visList[Number(detail.index)], { uniqueId: true })); visList.set($visList); update();
    }
    export function deleteQuestion(e: CustomEvent): void {
        let detail = e.detail as Record<string, unknown>; openPopup( { ...DELETE_Q, buttons: [ { label: "Ok", callback: () => { doDeleteQuestion(Number(detail.index)); } }, { label: "Cancel" } ] } );
    }
    export function doDeleteQuestion(delIndex: number): void {
        visList.set($visList.filter(function(el, index) { return index !== delIndex; })); update();
    }
    export function creativePanelClickInsert(ev: CustomEvent): void {
        let detail = ev.detail as Record<string, unknown>; visList.set([...$visList, Utils.getEmptyObject(String(detail.target.id))]); update(); //sortableList.scrollToBottom();
    }
    export function creativePanelDragInsert(ev: CustomEvent): void {
        let detail = ev.detail as Record<string, unknown>;
        let sourceDataset = detail.sourceNode.dataset as Record<string, unknown>;
        let targetDataset = detail.targetNode ? detail.targetNode.dataset as Record<string, unknown> : undefined;
        let insertId = detail.targetNode ? String(targetDataset.id) : null; if (insertId && insertId.includes("marker-")) { return; }
        let insertIndex: number = detail.targetNode ? Number(targetDataset.index) : detail.aboveFirstNode ? 0 : detail.belowLastNode ? $visList.length - 1 : null; //ev.detail.dragDirection === "up" ? targetDataset.index : Number(targetDataset.index) + 1;
        let insertType = String(sourceDataset.id);
        let dragChange = (detail.dragDirection === "up" && getQuestionInsertMarkerIndex() > insertIndex) || (detail.dragDirection === "down" && getQuestionInsertMarkerIndex() < insertIndex); //ev.detail.dragDirection !== ev.detail.prevDragDirection;
        if (insertId !== cPanelIns.id || dragChange) {
            removeInsertMarker();
            $visList.splice(insertIndex, 0, { id: "marker-" + Utils.createGuid() } );
            visList.set($visList);
            cPanelIns = { id: insertId, index: insertIndex, type: insertType };
        }
    }
    export function update(): void {

        // UPDATE FULL LIST
        let newFullList = [ ];
        let currentLevelObject: LevelObj;
        let updatedLevelQuestions1: Array<LevelQuestionObj> = [ ];
        let allLevelQuestions: Array<LevelQuestionObj> = [ ]; for (let obj of $visList) { if ((<LevelObj>obj).questions) { allLevelQuestions = allLevelQuestions.concat((<LevelObj>obj).questions); } }

        for (let obj of $visList) {
            if ((<LevelObj>obj).level) {
                if (currentLevelObject) { currentLevelObject.questions = updatedLevelQuestions1; currentLevelObject.collapsed = currentLevelObject.questions.length === 0; }
                currentLevelObject = obj as LevelObj;
                updatedLevelQuestions1 = [ ];
                newFullList.push(currentLevelObject);

                if (currentLevelObject.collapsed) {
                    updatedLevelQuestions1 = currentLevelObject.questions;
                    for (let question of currentLevelObject.questions) {
                        newFullList.push((<QuestionObj>Utils.getObjectById($fullList, question.id)));
                    }
                }
            } else {
                updatedLevelQuestions1.push(Utils.getObjectById(allLevelQuestions, obj.id) as LevelQuestionObj || { id: obj.id, retries: 0 });
                newFullList.push(obj);
            }
        }
        currentLevelObject.questions = updatedLevelQuestions1;
        currentLevelObject.collapsed = currentLevelObject.questions.length === 0;
        fullList.set(newFullList);

        // UPDATE LEVELS
        let counter = 1; for (let obj of $visList) {
            if ((<LevelObj>obj).level) {
                (<LevelObj>obj).level = counter; counter++;
                if ((<LevelObj>obj).progress === 0 && (<LevelObj>obj).questions.length > 0) { (<LevelObj>obj).progress = 1; }
                if ((<LevelObj>obj).progress > (<LevelObj>obj).questions.length) { (<LevelObj>obj).progress = (<LevelObj>obj).questions.length; }
            }
        }

        // BUILD JSON
        let levels: Array<LevelObj> = [ ];
        let questions: Array<QuestionObj> = [ ];
        let updatedLevelQuestions2: Array<LevelQuestionObj> = [ ];

        for (let i = 0; i < $fullList.length; i++) {
            let obj = $fullList[i];

            if ((<LevelObj>obj).level) {
                if (i > 0) { levels[levels.length - 1].questions = updatedLevelQuestions2; updatedLevelQuestions2 = [ ]; }
                levels.push(obj);
            } else {
                updatedLevelQuestions2.push(Utils.getObjectById(levels[levels.length - 1].questions, (<QuestionObj>obj).id) as LevelQuestionObj || { id: (<QuestionObj>obj).id, retries: 0 });
                questions.push(<QuestionObj>obj);
            }
        }

        $json.levels = levels;
        $json.questions = questions;
        json.set($json);
    }
    
</script>