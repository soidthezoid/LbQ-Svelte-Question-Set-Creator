
  <ul class={`relative float-left p-0 list-none ${$$props.class}`} bind:this={ul} >
    {#if data && data.length}
        {#each data as item, index (getKey(item))}
          <li
            class={computedLiClass}
            data-index={index}
            data-id={JSON.stringify(getKey(item))}
            draggable="true"
            on:mousedown|stopPropagation={mouseDown}
            on:mouseup={mouseUp}
            on:drag|stopPropagation={drag}
            on:dragleave|stopPropagation={dragLeave}
            on:drop|stopPropagation={drop}
            on:dragend|stopPropagation={dragEnd}
            in:receive={{ key: getKey(item) }}
            out:send={{ key: getKey(item) }}
            animate:flip={{ duration: dur }}
           >
            <slot {item} {index}>
              <p>{getKey(item)}</p>
            </slot>
          </li>
        {/each}
    {/if}
  </ul>

<script lang="ts">
  //import { quintOut } from "svelte/easing";

  import { onMount } from "svelte";
  import { crossfade } from "svelte/transition";
  import { flip } from "svelte/animate";
  import { createEventDispatcher } from "svelte";

  //import DraggableList from "DraggableList.svelte";

  import { Utils } from "../../utils/Utils";
  //import AnswerBinary from "./Answer/AnswerBinary.svelte";
  
  
  // PROPS
  export let data: Array<unknown>;
  export let key: string;
  export let restrict: { top?: boolean; right?: boolean; bottom?: boolean; left?: boolean; } = { };
  export let liClass = "";
  export let targetList: Record<string, unknown> = null; // NOTE: targetList type is DraggableList
  export let dragHandleClass = "";
  export let lockFirstNode = false;

  //

  let canDrag: boolean;
  let ul: HTMLUListElement;
  let ulBounds: DOMRect;
  let li: Array<ChildNode>;
  let computedLiClass: string = "h-auto overflow-hidden" + (liClass ? " " + liClass : "");
  let source: { node: HTMLLIElement, dataset: Record<string, unknown> };
  let clone: HTMLLIElement;
  let prevHit: {id: string; index: number; offsetY: number; aboveFirstNode?: boolean; belowLastNode?: boolean; } = { id: "none", index: -1, offsetY: 0, aboveFirstNode: false, belowLastNode: false };
  let startOffset: { x: number, y: number };
  let prevPageX: number | null = null;
  let prevPageY: number | null = null;
  let dragDirection = "none";
  let prevDragDirection = "none";

  const dur = 100;
  
  onMount( () => { li = Array.from(ul.childNodes).slice(0, data.length); });

  const dispatch = createEventDispatcher();

  // FLIP ANIMATION
  const [send, receive] = crossfade({
    duration: d => Math.sqrt(d * dur),

    /*fallback(node, params) {
      return {
        duration: 0,
        easing: quintOut
      };
    }*/
  });

  export const getBounds = (): DOMRect => {
      return ul.getBoundingClientRect();
  };

  export const getList = (): { nodes: Array<ChildNode>, data: Array<unknown> } => {
      return { nodes: Array.from(ul.childNodes).slice(0, data.length), data: data };
  };

  export const scrollToBottom = () => {
      setTimeout( () => { ul.scrollTop = ul.scrollHeight; }, 100);
  };

  const mouseDown = (ev: MouseEvent) => {
      //console.log("MOUSEDOWN: ", ev);
      let target = ev.target as Element;
      let listNode = Utils.getNodeAncestor(target, "LI") as Record<string, unknown>;
      let dataset = listNode.dataset as Record<string, unknown>;
      canDrag = (dragHandleClass.length === 0 || target.classList.contains(dragHandleClass)) && (!lockFirstNode || dataset.index > 0);
      if (canDrag) {
          li = Array.from(ul.childNodes).slice(0, data.length);
          ulBounds = getBounds();
          source = { node: listNode as HTMLLIElement, dataset: dataset };
          startOffset = { x: ev.pageX - source.node.getBoundingClientRect().left, y: ev.pageY - source.node.getBoundingClientRect().top - ul.scrollTop };

          /*// TEST
          new AnswerBinary({
              target: ul,
              props: {
                  qId: "fake-qId",
                  data: { id: "fake-id", value: "test clone", feedback: "test clone feedback", isCorrect: false }
              }
          });
          //

          clone =  ul.childNodes[ul.childNodes.length - 3];*/

          clone = Utils.cloneNode(source.node) as HTMLLIElement;
          clone.style.position = "absolute";
          clone.style.width = String(source.node.clientWidth) + "px";
          clone.style.height = String(source.node.clientHeight) + "px";
          clone.style.pointerEvents = "none";
          clone.style.top = String(ev.pageY - ulBounds.top - startOffset.y) + "px";
          clone.style.left = String(ev.pageX - ulBounds.left - startOffset.x) + "px";
          ul.appendChild(clone);
          source.node.style.opacity = "0";
          prevPageY = ev.pageY;
      }
  };

  const mouseUp = () => {
      //console.log("MOUSEUP");
      if (canDrag) { 
          clone.remove();
          source.node.style.opacity = "1";
      }
  };

  const drag = (ev: MouseEvent) => {
      //console.log("DRAG: ", ev.offsetY);
      if (!canDrag) { ev.preventDefault(); return; }
      let dragging = ev.pageX !== prevPageX || ev.pageY !== prevPageY;

      if (dragging) {
          //ev.target.style.opacity = 0;
          let topValid = !restrict || !restrict.top || ev.pageY - startOffset.y > ulBounds.top;
          let rightValid = !restrict || !restrict.right || ev.pageX - startOffset.x + source.node.clientWidth < ulBounds.right;
          let bottomValid = !restrict || !restrict.bottom || ev.pageY - startOffset.y + source.node.clientHeight < ulBounds.bottom;
          let leftValid = !restrict || !restrict.left || ev.pageX - startOffset.x > ulBounds.left;

          if (prevPageY) {
              if (ev.pageY < prevPageY) { dragDirection = "up"; }
              else if (ev.pageY > prevPageY) { dragDirection = "down"; }
          }

          prevPageY = ev.pageY;

          if (topValid && bottomValid && ev.pageY > 0) { clone.style.top = String(ev.pageY - ulBounds.top - startOffset.y) + "px"; }
          if (leftValid && rightValid && ev.pageX > 0) { clone.style.left = String(ev.pageX - ulBounds.left - startOffset.x) + "px"; }

          let hit = collision(ev);

          if (hit) {
            if (!hit.targetNode || hit.targetNode.dataset.flipping !== "true") {
                if (source != null) {
                    let hitId = hit.targetNode ? Utils.stripQuotes(hit.targetNode.dataset.id) : "none";

                    if (hit.internal) {
                        let from;
                        let to;

                        if (prevHit.id !== hitId) {
                            prevHit = { id: hit.targetNode.dataset.id as string, index: hit.targetNode.dataset.index as number, offsetY: ev.offsetY};
                            from = source.dataset.index; // getItemIndex(source.dataset.id);
                            to = hit.targetNode.dataset.index; //getItemIndex(hit.targetNode.id);
                        } else if (dragDirection !== prevDragDirection) {
                            to = source.dataset.index; // getItemIndex(source.dataset.id);
                            from = hit.targetNode.dataset.index; //getItemIndex(hit.targetNode.id);
                        }
                        if (from !== to) { reorder(from, to, hit); }
                    } else if (ev.pageY > 0) {
                        /*let testA = hit.aboveFirstNode === true && prevHit.aboveFirstNode === true;
                        let testB = hit.belowLastNode === true && prevHit.belowLastNode === true;
                        let testC = hitId === prevHit.id;
                        let testD = dragDirection === prevDragDirection;
                        let newHit = testA === false && testB === false && (testC === false || testD === false);*/

                        //if (newHit) {
                            console.log("DISPATCH EXT HIT: ", { sourceNode: hit.sourceNode, targetNode: hit.targetNode, aboveFirstNode: hit.aboveFirstNode, belowLastNode: hit.belowLastNode, dragDirection: dragDirection, prevDragDirection: prevDragDirection });
                            dispatch("externalhit", { sourceNode: hit.sourceNode, targetNode: hit.targetNode, aboveFirstNode: hit.aboveFirstNode, belowLastNode: hit.belowLastNode, dragDirection: dragDirection, prevDragDirection: prevDragDirection });
                        //}

                        prevHit = { id: hitId, index: -1, offsetY: -1, aboveFirstNode: hit.aboveFirstNode, belowLastNode: hit.belowLastNode };
                    }
                }
            }
         } else {
            if (targetList !== null) {
                let targetListBounds = targetList.getBounds() as Record<string, unknown>;
                let outsideTargetListBoundsH = ev.pageX < targetListBounds.left || ev.pageX > targetListBounds.right;
                if (outsideTargetListBoundsH /*|| (ev.pageX === 0 && ev.pageY > 0) || (ev.pageX > 0 && ev.pageY === 0)*/) { console.log("OUTSIDE TARGET LIST"); dispatch("outsidetargetlist"); }
            }

            prevHit = { id: "none", index: -1, offsetY: 0 };
         }

         prevDragDirection = dragDirection;
     }
  };

  const collision = (ev: MouseEvent): { sourceNode: HTMLLIElement; targetNode?: HTMLLIElement; internal: boolean; aboveFirstNode?: boolean; belowLastNode?: boolean; } => {
      let internal = targetList === null;
      let targetListGetList = targetList ? targetList.getList() as Record<string, unknown> : undefined;
      let nodes = internal ? li as NodeListOf<HTMLLIElement> : targetListGetList.nodes as NodeListOf<HTMLLIElement>;
      
      for (let i = 0; i < nodes.length; i++) {
          if (i == 0 && lockFirstNode) { continue; }
          if (nodes[i] !== clone) {
              let nodeRect = nodes[i].getBoundingClientRect();
              let withinNodeBoundsH = (ev.pageX > 0) && (ev.pageX >= nodeRect.left) && (ev.pageX <= nodeRect.right);
              let withinNodeBoundsV = (ev.pageY > 0) && (ev.pageY >= nodeRect.top) && (ev.pageY <= nodeRect.bottom);
              if (internal ? withinNodeBoundsV : withinNodeBoundsH && withinNodeBoundsV) { return { sourceNode: source.node, targetNode: nodes[i], internal: internal }; }
          }
      }

      if (!internal) {
          let targetListBounds = targetList.getBounds() as DOMRect;
          let withinTargetListBoundsH = ev.pageX > 0 && ev.pageX >= targetListBounds.left && ev.pageX <= targetListBounds.right;

          if (withinTargetListBoundsH) {
              let aboveFirst = ev.pageY <  nodes[0].getBoundingClientRect().top;
              let belowLast = ev.pageY >  nodes[nodes.length - 1].getBoundingClientRect().bottom;
              if (aboveFirst && !lockFirstNode) { return { sourceNode: source.node, aboveFirstNode: true, internal: false }; }
              if (belowLast) { return { sourceNode: source.node, belowLastNode: true, internal: false }; }

              for (let j = 0; j < nodes.length - 1; j++) {
                  if (nodes[j] !== clone) {
                    let nodeRect1 = nodes[j].getBoundingClientRect();
                    let nodeRect2 = nodes[j + 1].getBoundingClientRect();
                    let betweenNodes = ev.pageY > nodeRect1.bottom && ev.pageY < nodeRect2.top;
                    if (betweenNodes) { return { sourceNode: source.node, targetNode: nodes[j + 1], internal: false }; }
                  }
              }
          }
      }

      return null;
  };

  const dragLeave = (ev: MouseEvent) => {
    //if (!canDrag) { ev.preventDefault(); return; }
    let target = ev.target as Record<string, unknown>
    let dataset = target.dataset as Record<string, unknown>;
    if (prevHit.id === Utils.stripQuotes(dataset.id as string)) { prevHit = { id: "none", index: -1, offsetY: 0 }; }  
  };

  const drop = (ev: MouseEvent) => {
    //if (!canDrag) { ev.preventDefault(); return; }
    prevHit = { id: "none", index: -1, offsetY: 0 };
    ev.preventDefault();
  };

  const dragEnd = () => {
    //if (!canDrag) { ev.preventDefault(); return; }
    if (source) { source.node.style.opacity = "1"; }
    clone.remove();
    dragDirection = "none";
    prevDragDirection = "none";
    dispatch("dragend");
  };

  const reorder = (from: number, to: number, hit: { sourceNode: HTMLLIElement; targetNode?: HTMLLIElement; internal: boolean; aboveFirstNode?: boolean; belowLastNode?: boolean; }) => {
    //console.log("reorder(", from , to, ")"); //, hit, ")");
    let newData = [...data];
    newData[from] = [newData[to], (newData[to] = newData[from])][0];
    source.dataset.flipping = "true";
    hit.targetNode.dataset.flipping = "true";
    setTimeout( () => { source.dataset.flipping = "false"; hit.targetNode.dataset.flipping = "false"; }, dur);
    dispatch("sort", newData);
  };

  // UTILS
  const getKey = (item: unknown): unknown => { return key ? item[key] : item; };

  // LEGACY

  /*const mouseMove = (ev: any): void => {
      let body: HTMLBodyElement = Utils.getNodeAncestor(ev.target, "BODY");
      console.log("body = ", body);
      body.style.cursor = "move";
  };*/

  /*const getParentList = (node: any): HTMLUListElement => {
      let ret = node;
      while (ret.tagName !== "UL") { ret = ret.parentNode; }
      return ret;
  };*/

  /*const getDraggedLi = (node: any) => {
    return (node.dataset.index && node.dataset) || getDraggedLi(node.parentNode);
  };*/

  /*let getDraggedLi: Function = (node: any): any => {
    let ret = node;
    while (ret === undefined || ret.dataset.index === undefined) { ret = ret.parentNode; }
    return { node: ret, dataset: ret.dataset };
  };*/

  /*const getItemIndex = (id: string): number => {
      //console.log("getItemIndex(", id, ")");
      for (let i = 0; i < list.length; i++) {
          if (list[i].id === id.replaceAll('"', '')) { return i; }
      }
      return -1;
  };*/

  /*const over = (ev: any) => {
    ev.preventDefault();
    if (dragging && !flipping) {
        let dragged = getDraggedLi(ev.target);
        if (prevHit !== dragged.id) {
            prevHit = JSON.parse(dragged.id);
            //console.log("prevHit, prevOver = ", prevHit, prevOver);
            if ((prevHit !== prevOver) && source !== null) {
                prevOver = prevHit;
                let from = source.dataset.index; // getItemIndex(source.dataset.id);
                let to = dragged.index; //getItemIndex(dragged.id);
                if (from !== to) { //if ((from !== -1 && to !== -1) && (from !== to)) {
                    reorder(from, to);
                }
            }
        }
    }
  };*/

</script>