<template>
    <Div class="columns">
        <Div class="column">

            <Button @click="getJson">Save</Button>
            <Level v-for="(l, index) in json.levels" :data="l" :firstLevel="index === 0" :noDelete="false" :collapsed="false" :levelInfo="getLevelInfo(l)"></Level>
            <Question v-for="(q, index) in json.questions" :class="getQClass(q.type)" :data="q"></Question>
            <InputText v-model="json.levels[0].levelName" />

            <!--Level :level="1" :levelName="myProp" ></Level-->

            <!--Div contenteditable="true">{{json.competency}}</Div-->

            <!--P class="green">Para 1</P>
            <P>Para 2</P>

            <Div>
                <Button>Button Component</Button>
            </Div>

            <LabelledButton>
                <template v-slot:label>
                    LabelledButton Label
                </template>
                LabelledButton Button
            </LabelledButton-->

        </Div>
        <Div class="column narrow">
            
        </Div>
    </Div>
</template>


<script lang="ts">

    console.log("App.vue script begin");
    var apiURL = 'https://localhost:6001';

    import { AuthenticationClient } from './../ProtocolBuffer/AuthenticationServiceClientPb';
    import
   {
        AuthenticationGetTokenRequest,
        AuthenticationGetTokenResponse,
        AuthenticationLoginRequest,
        AuthenticationLoginResponse
   } from './../ProtocolBuffer/Authentication_pb';

    import { UserAccountClient } from './../ProtocolBuffer/UserAccountServiceClientPb';
    import
   {
        UserAccountSecuredProcedureRequest,
        UserAccountSecuredProcedureResponse
   } from './../ProtocolBuffer/UserAccount_pb';

    const authenticationClient = new AuthenticationClient(apiURL, null, {
        'withCredentials': true
   });
    const userAccountClient = new UserAccountClient(apiURL, null, {
        'withCredentials': true
   });

    var authenticationLoginRequest = new AuthenticationLoginRequest();
    authenticationLoginRequest.setUsername('credentials_test_username');
    authenticationLoginRequest.setPassword('password');

    authenticationClient.login(authenticationLoginRequest, null, function (error, response: AuthenticationLoginResponse) {
        if (response.getIsauthenticated()) {
            //alert('Logged In');
       }
   });

    var authenticationGetTokenRequest = new AuthenticationGetTokenRequest();
    authenticationGetTokenRequest.setUsername('credentials_test_username');
    authenticationGetTokenRequest.setPassword('password');

    authenticationClient.getToken(authenticationGetTokenRequest, null, function (error, response: AuthenticationGetTokenResponse) {
        if (response.getIsauthenticated()) {
            var token = response.getToken();
            var securedProcedureRequest = new UserAccountSecuredProcedureRequest();

            userAccountClient.securedProcedure(securedProcedureRequest, { 'Authorization': 'Bearer ' + token }, function (error, response: UserAccountSecuredProcedureResponse) {
                if (error == null) {
                    //alert('Got resource');
               }
                else {
                    //alert('Failed resource authorization');
               }
           });

            //alert('Got token');
       }
        else {
            //alert('Incorrect credentials');
       }
   });

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    import { /*ref,*/ reactive } from 'vue';
    import Div from "./Atoms/Div.svelte";
    //import P from "./Atoms/P.svelte";
    import Button from "./Atoms/Button.svelte";
    //import LabelledButton from "./Molecules/LabelledButton.svelte";
    import Level from "./Organisms/Level/Level.svelte";
    import Question from "./Organisms/Question/Question.svelte";
    import InputText from "./Atoms/InputText.svelte";

    import { LevelObj } from "../Services/LevelObj";
    
    export default {
        components: { Div, /*P,*/ Button, /*LabelledButton,*/ Level, Question, InputText },
        setup(props: any, context: any) { // context is a non-reactive object so can use ES6 destructuring on it, e.g. setup(props, { attrs, slots, emit }) { ... })
            // Attributes (Non-reactive object)
            console.log(context.attrs);

            // Slots (Non-reactive object)
            console.log(context.slots);

            // Emit Events (Method)
            console.log(context.emit);

            // NOTE: Since they are non-reactive, to apply side effects based on attrs or slots changes, do so inside an onUpdated lifecycle hook
            // NOTE: Since setup is executed BEFORE component created, there's no access to data, computed or methods within it

            const json = reactive({
                loading: false,
                saving: false,
                capabilityDate: "/Date(1558349340950)/",
                competency: "Q set competency here",
                description: "Q set description here",
                id: "e4c76c4a-0615-4966-9e55-1950c593be4b",
                levels: [
                   {
                        id: "c36ecc4e-3148-452f-ab3d-2050d02d99d9",
                        level: 1,
                        levelName: "Level 1 - Beginner",
                        navigation: true,
                        progress: 4,
                        questions: [
                           { id: "8e2b29f5-1938-453f-81f7-d65036d396aa", retries: 0 },
                        ],
                        random: false,
                        retries: 9,
                        collapsed: false
                   },
                   {
                        id: "321b5b1e-b7cd-4fa3-9513-04bcd11af2e9",
                        level: 2,
                        levelName: "Level 2 - Advanced",
                        navigation: false,
                        progress: 5,
                        questions: [
                           { id: "c7f5d184-0ef8-4e86-860d-047a7c378f97", retries: 0 }
                        ],
                        random: true,
                        retries: 10,
                        collapsed: false
                   }
                ],
                name: "Q set name here",
                notes: "Q set notes here",
                published: 0,
                questions: [
                   {
                        id: "8e2b29f5-1938-453f-81f7-d65036d396aa",
                        noOfResponses: 1,
                        openFeedback: "",
                        published: 0,
                        questionUserRole: 3,
                        random: false,
                        rightFeedback: "",
                        type: "MultipleChoice",
                        uses: 1,
                        value: "Q1",
                        wrongFeedback: "",
                        _isMultiline: false,
                        _isMultipleAnswer: false,
                        _points: 0,
                        _rect: null,
                        answers: [
                           {
                                feedback: "f1",
                                id: "70f1a6f6-5f9b-4b05-85bf-73cd59e061c0",
                                isCaseSensitive: false,
                                isCorrect: true,
                                value: "a1",
                                whiteSpace: 0
                           }
                        ]
                   },
                   {
                        id: "c7f5d184-0ef8-4e86-860d-047a7c378f97",
                        noOfResponses: 1,
                        openFeedback: "",
                        published: 0,
                        questionUserRole: 3,
                        random: false,
                        rightFeedback: "",
                        type: "Sort",
                        uses: 1,
                        value: "Q2",
                        wrongFeedback: "",
                        _isMultiline: false,
                        _isMultipleAnswer: false,
                        _points: 0,
                        _rect: null,
                        answers: [
                           {
                                feedback: "f2",
                                id: "bb8abd14-030a-4799-b8ef-634cfd07ae6b",
                                isCaseSensitive: false,
                                value: "a2",
                                whiteSpace: 0
                           }
                        ]
                   }
                ],
                retries: 0,
                shared: false,
                verFrom: "/Date(1558349500884)/",
                walt: "Q set WALT here",
                yearGroup: [ ]
           });

            const getLevelInfo = (data: LevelObj) => {
                let numQ = data.questions.length;
                let questions: string[ ] = [ ];
                for (let i: number = 0; i < data.questions.length; i++) {
                    for (let j = 0; j < json.questions.length; j++) {
                        if (data.questions[i].id === json.questions[j].id) { questions.push("Q" + String(j + 1)); }
                   }
               }
                return numQ + (numQ === 1 ? " question [ " : " questions [ ") + questions.join(", ") + " ]";
           }

            const getQClass = (qType: string) => { return qType + "Type Advance"; }
            const getJson = () => { console.log("JSON Level 1 name = ", json.levels[0].levelName); }

            return { json, getLevelInfo, getQClass, getJson } // anything returned here will be available for the rest of the component, i.e. computed properties, methods, lifecycle hooks etc.
       }
        
        // the "rest" of the component
   }

</script>

<style lang="scss">

.CREATOR-BODY input::-webkit-input-placeholder { color: rgba(0,0,0,0.4); }  .CREATOR-BODY input:-moz-placeholder { color: rgba(0,0,0,0.4); }  .CREATOR-BODY input::-moz-placeholder { color: rgba(0,0,0,0.4); }  .CREATOR-BODY input:-ms-input-placeholder { color: rgba(0,0,0,0.4); } 
.CREATOR-BODY textarea::-webkit-input-placeholder { color: rgba(0,0,0,0.4); }  .CREATOR-BODY textarea:-moz-placeholder { color: rgba(0,0,0,0.4); }  .CREATOR-BODY textarea::-moz-placeholder { color: rgba(0,0,0,0.4); }  .CREATOR-BODY textarea:-ms-input-placeholder { color: rgba(0,0,0,0.4); } 
.CREATOR-BODY textarea { font-family: Arial, sans-serif; } 
.no-select { -webkit-touch-callout: none; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; } 

html, body { position: fixed; touch-action:none; margin:0; padding:0; width:100%; height:100%; overflow: hidden; min-width:350px; background:#222; font-family: Arial, sans-serif; transform: translate3d(0,0,0);-webkit-transform: translate3d(0,0,0); } 
body.disabled { pointer-events:none; } 

.one-line { text-overflow: ellipsis; overflow: hidden; white-space: nowrap; } 
.circle-preloader { position:relative; width:40px; height:40px; } 
.circle-preloader:after { content:""; position:absolute; width:40px; height:40px; background-image:url(../asset/circle-preload-icon.svg); background-size:contain; animation-name: rotate-clockwise; animation-duration: .4s; animation-iteration-count: infinite; animation-timing-function: linear; } 
@keyframes rotate-clockwise { from { transform: rotate(0deg); }  to { transform: rotate(360deg); } } 
@keyframes rotate-counter-clockwise { from { transform: rotate(0deg); }  to { transform: rotate(-360deg); } } 

.qsc-save-screen { position:fixed; width:100%; height:100%; background:rgba(0,0,0,0.3); top:0; left:0; z-index:31; transition:width .2s ease; pointer-events:none; display:none; } 
    .qsc-save-screen-info { position: relative; top: calc(50% - 59px); border-radius: 5px; background: #222; left: 50%; transform: translateX(-50%) translateY(-50%); transition: width .3s ease, height .3s ease; width: 200px; height: auto; overflow: hidden; } 
        .qsc-save-screen-info.creator-save-failed { width:320px; } 
    .qsc-save-screen-info-text { position:relative; margin: 0 auto; text-align: center; padding: 10px; color: #fff; font-weight: bold; font-size: 29px; } 
    .qsc-save-screen-info-icon { position:relative; width:50px; height:50px; margin: 0 auto; padding: 2px; } 
        .qsc-save-screen-info-icon:after { content:""; position:absolute; width:32px; height:32px; top:7px; left:0; background:url(../asset/preload-cog1.svg) no-repeat; background-size:contain; animation-name: rotate-clockwise; animation-duration: 2s; animation-iteration-count: infinite; animation-timing-function: linear; } 
        .qsc-save-screen-info-icon:before { content:""; position:absolute; width:32px; height:32px; top:29px; left:22px; background:url(../asset/preload-cog2.svg) no-repeat; background-size:contain; animation-name: rotate-counter-clockwise; animation-duration: 2s; animation-iteration-count: infinite; animation-timing-function: linear; } 

.CREATOR-BODY { position: relative; width: 100%; height: 100%; font-family:Arial, sans-serif; } 
.creator-element { position: relative; width: 100%; height: 100%; } 
.creator-element.expand-0:not(.collapsed):not(.max-width) { width:calc(100% - 140px); } 
.creator-element.expand-1:not(.collapsed):not(.max-width) { width:calc(100% - 271px); } 
.creator-element.expand-2:not(.collapsed):not(.max-width) { width:calc(100% - 404px); } 
.creator-element.expand-3:not(.collapsed):not(.max-width) { width:calc(100% - 485px); } 
.creator-element.max-width { width:100%; } 

    .qsc-topbar { position:relative; width:100%; height:auto; min-height:40px; overflow:hidden; background:#666; font-family: Arial, sans-serif; font-size: 13px; box-shadow: 0 5px 15px 0 rgba(0,0,0,0.2); border-bottom:solid 2px #555; } 
        .qsc-topbar.expanded:before { position: absolute; content: ""; width: 37px; height: 100%; background: rgba(0,0,0,0.2); } 
        .qsc-topbar-toggle-arrow { position: relative; transform: rotate(-90deg); transform-origin: 50% 50%; width: 0; height: 0; float: left; top: 9px; border-left: 11px solid transparent; border-right: 11px solid transparent; border-top: 15px solid white; cursor: pointer; margin: 4px 9px; margin-right: 3px; transition: transform .2s ease; } 
        .qsc-topbar.expanded .qsc-topbar-toggle-arrow { transform: rotate(0deg); transform-origin: 50% 50%; } 
        .qsc-title-field-header { position: relative; float: left; margin: 5px 0 0 5px; font-size: 14px; } 
        .qsc-title-field { position: relative; min-height: 23px; float: left; width: calc(100% - 323px); margin: 4px; height:23px; padding: 6px 0px 0px 6px; font-size: 16px; resize: vertical; } 
        .qsc-topbar.admin .qsc-title-field:not(.comp):not(.notes) { width: calc(100% - 455px); } 
            .qsc-title-field.comp, .qsc-title-field.notes { width: calc(100% - 59px); left: 33px; } 
            .qsc-topbar-spacer { position: relative; width: calc(100% - 43px); height: 1px; background: #444; margin: 5px; margin-top: 0; border-bottom: 1px solid #ccc; float: left; left: 32px; } 
            .qsc-topbar-more-options { position: relative; visibility:hidden; float: left; width: 100%; margin-bottom: 0; max-height: 0; opacity:0; transition:max-height .2s ease, opacity .2s ease; } 
            .qsc-topbar.expanded .qsc-topbar-more-options { visibility:visible; max-height: 180px; opacity:1; margin-bottom: 6px; } 
            .qsc-topbar-feedback-area { position: relative; float: left; width: calc(100% - 43px); left: 37px; border-radius: 3px; background: rgba(251, 176, 59, 0.7); overflow: hidden; } 
            .qsc-topbar-feedback-area.error { background:#800; color:white; } 
                .qsc-topbar-feedback-area-header { margin: 0; color: white; position: relative; font-size: 15px; display: block; padding: 5px; background: rgba(0, 0, 0, 0.5); width:calc(100% - 10px); text-align: center; margin-bottom: 5px; } 
                    .qsc-topbar-feedback-area-header:after { position: absolute; content: ""; background: url(../asset/feedback-icon.png) no-repeat; width: 21px; height: 21px; top: 3px; left: 3px; background-size: contain; } 
                .qsc-topbar-feedback-area-feedback-holder { left: 38px; width: calc(33.33% - 10px); float: left; margin-right:13px; margin-bottom: 4px; } 
                .qsc-topbar-feedback-area-feedback-holder:last-child { margin-right:0; } 
                    .qsc-topbar-feedback-area-input-label { position: relative; float: left; height: 30px; width: 63px; color: white; font-size: 16px; margin: 0; line-height: 31px; text-align: right; margin-right:10px; } 
                    .qsc-topbar-feedback-area-input { position:relative; float:left; font-size: 16px; width:calc(100% - 74px); } 

        .qsc-title-popup-input { position: relative; width: calc(100% - 26px); margin: 5px 5px; height: 27px; padding: 0 6px; font-size: 16px; } 

    .qsc-question-set-holder { position: relative; height: calc(100% - 89px); box-shadow: 0 5px 15px 0 rgba(0,0,0,0.2); transition:height .2s ease; } 
    .qsc-question-set-holder.smallh { height:calc(100% - 245px); } 
    .qsc-question-set-holder.error-panel-showing { height:calc(100% - 129px); } 
    .qsc-question-set-holder.smallh.error-panel-showing { height:calc(100% - 286px); } 

        .qsc-question-set-container { position: relative; height: 100%; background: #fff; overflow-y: auto; } 
        .qsc-question-set-container.drag-over { pointer-events:none; } 
        .qsc-question-set-container div:last-child { margin-bottom:0; } 

    .qsc-retries { position: relative; float: left; } 
        .qsc-retries div { float: left; } 
        .qsc-retries input { float: left; width: 35px; height: 24px; margin-left: 2px; font-size: 17px; text-align: center; } 

    .qsc-button { position:relative; width:30px; height:30px; cursor:pointer; border-radius: 2px; } 
       .qsc-button.add { background:#8CC63F; } 
       .qsc-button.add:after { content:"+"; position:absolute; margin: 0; font-weight: bold; color: white; line-height: 31px; text-align: center; font-size: 28px; top:0; left:7px; } 
       .qsc-button.duplicate { background-color:#29ABE2; background-image:url(../asset/duplicate-icon.png); background-size:contain; } 
       .qsc-button.duplicate.disabled:not(.qsc-question-answer-btn):not(.qsc-level-button) { background-color: #444 !important; background-image:url(../asset/lbq-disabled-icon.png); background-size:contain; } 
       .qsc-button.feedback { background-color:#9b9995; background-image:url(../asset/feedback-icon-disabled.png); background-size:contain; cursor:default; } 
       .qsc-button.disabled { background-color:#ccc !important; } 
       .qsc-button.settings { background-color:#8CC63F; background-image:url(../asset/settings-icon.png); background-size:contain; } 
       .qsc-button.feedback-minimize { background-color:#fbb03b; background-image:url(../asset/supplement-minimize-icon.svg); background-size:contain; } 
       .qsc-button.delete { background-color:#FF3630; } 
       .qsc-button.delete:after { content:""; background: white; position: absolute; width: 60%; height: 4px; top: calc(50% - 2.5px); left: calc(50% - 9px); } 
       .qsc-button-text { margin: 0; line-height: 30px; } 
     
   .qsc-menu-button-holder { position:relative; float: right; width: 265px; } 
   .qsc-menu-button-holder.admin { width: 405px; } 
   .qsc-menu-button { position: relative; float: right; margin-right: 5px; width: 40px; background-color: rgba(0,0,0,0.2); height:40px; background-repeat:no-repeat; border-radius:0; background-position: 5px; background-size: 30px; } 
   .qsc-menu-button:first-child { margin-right:0; } 
   .qsc-menu-button:hover { background-color:#8CC63F; } 
       /*.qsc-menu-button.menu { background-image:url(../asset/collapse-menu-icon.svg); display:none; } */
       /*.qsc-menu-button.print { background-image:url(../asset/print-icon.svg); } */
       .qsc-menu-button.import-excel { background-image:url(../asset/import-icon.svg); } 
       .qsc-menu-button.export-excel { background-image:url(../asset/export-icon.svg); } 
       .qsc-menu-button.test { background-image:url(../asset/test-icon.svg); } 
       .qsc-menu-button.save { background-image:url(../asset/save-icon.svg); } 
       .qsc-menu-button.save-new { background-image:url(../asset/save-new-icon.svg); } 
    .qsc-menu-button.save-duplicate { background-image: url(../asset/save-duplicate-icon.svg); } 
       .qsc-menu-button.go-home { background-image:url(../asset/home-icon.svg); } 
       /*.qsc-menu-button.my-question-sets { background-image:url(../asset/user-icon.svg); background-size: 40px; background-position: 0; } */

    /*.qsc-collapsed-menu { position: fixed; width: 250px; height: 100%; right:0; top: 0; background: #222; transition: right .1s ease; box-shadow: -9px 0 16px -2px rgba(0,0,0,0.26); z-index: 31; color:white; font-family:Arial, sans-serif; } 
    .qsc-collapsed-menu.collapsed { right:-300px; } 
        .qsc-collapsed-menu-header.qsc-collapsed-menu-button { background:#444; } 
        .qsc-collapsed-menu-button { position:relative; width:100%; height:42px; background:#666; border-radius: 0; } 
        .qsc-collapsed-menu-button:not(.qsc-collapsed-menu-header):after { content:""; position:absolute; left:0; bottom:0; width:100%; height:1px; background:#444; } 
        .qsc-collapsed-menu-button:not(.qsc-collapsed-menu-header):hover { background:#8CC63F; } 
        .qsc-collapsed-menu-button:last-child { box-shadow:0 10px 28px 0 rgba(0,0,0,0.14); } 
            .qsc-collapsed-menu-button p { position:relative; text-align:left; margin:0; width:calc(100% - 45px); height:40px; line-height:40px; float:left; } 
            .qsc-collapsed-menu-header.qsc-collapsed-menu-button p { text-align:center; width:100%; } 
            .qsc-collapsed-menu-button .qsc-button-icon { position: relative; float: left; width: 40px; height: 42px; background-repeat:no-repeat; background-position: 5px; background-size: 30px; background-color: rgba(0,0,0,0.1); margin-right: 5px; } 
                .qsc-collapsed-menu-button.print .qsc-button-icon { background-image:url(../asset/print-icon.svg); } 
                .qsc-collapsed-menu-button.import-json .qsc-button-icon { background-image:url(../asset/import-icon.svg); } 
                .qsc-collapsed-menu-button.export-json .qsc-button-icon { background-image:url(../asset/export-icon.svg); } 
                .qsc-collapsed-menu-button.test .qsc-button-icon { background-image:url(../asset/test-icon.svg); } 
                .qsc-collapsed-menu-button.save .qsc-button-icon { background-image:url(../asset/save-icon.svg); } 
                .qsc-collapsed-menu-button.save-new .qsc-button-icon { background-image:url(../asset/save-new-icon.svg); } 
                .qsc-collapsed-menu-button.go-home .qsc-button-icon { background-image:url(../asset/home-icon.svg); } 
                .qsc-collapsed-menu-button.my-question-sets .qsc-button-icon { background-image:url(../asset/user-icon.svg); background-size: 40px; background-position: 0; } 

    .qsc-sub-bar { position: relative; width: calc(100% - 4px); height: 30px; overflow:hidden; padding:2px; font-family: Arial, sans-serif; color: white; font-weight: bold; font-size: 13px; background:#888; box-shadow: 0 5px 15px 0 rgba(0,0,0,0.2); border-bottom: solid 2px #555; } 
    .qsc-sub-bar-retries { margin-left:10px; font-size: 15px; line-height:29px; } 
    .qsc-sub-bar-no-of-questions { float: right; line-height: 30px; margin-right: 3px; font-size: 15px; } 
        .qsc-util-button { float:left; margin-right: 6px; background:none; background-color:#888; background-repeat:no-repeat; background-size:contain; width:30px; height:30px; border-radius:3px; } 
        .qsc-util-button.expand { background-image:url(../asset/expand-answers-icon.svg); } 
        .qsc-util-button.hide-feedback { background-image:url(../asset/hide-feedback-icon.svg); } 
        .qsc-util-button.eval { background-image:url(../asset/eval-icon.svg); opacity:1; } 
        .qsc-util-button.expand.checked:after { content: "+"; position: absolute; top: 8px; left: 5px; font-weight: bold; color: white; } 
        .qsc-util-button.char { background-image:url(../asset/special-char-icon.svg); background-size: 35px; background-position: -2px -2px; margin-right:0; } 
        .qsc-util-button.level { background-image:url(../asset/cp-question-level-icon.svg); opacity:1; background-size: 55px; background-position: -12px -2px; background-color:#048; } 

    .qsc-supplement-popup { border: 1px solid black; } 
    .qsc-supplement-popup .max-size { position: absolute; top: 16px; left: 110px; font-size: 13px; } 
    .qsc-supplement-popup .ldl-util-richeditor-textarea { height: 93%; overflow: scroll; } 

    .qsc-import-json-popup .qsc-json-import-field { position: relative; padding: 10px 10px; width: 500px; height: 240px; top: 20px; font-family: Arial, sans-serif; word-wrap: break-word; border: 1px solid black; overflow-y: auto; } 
    .qsc-export-json-popup .qsc-json-export-field { position: relative; padding: 10px 10px; width: 500px; height: 260px; top: 20px; left: 20px; word-wrap: break-word; border: 1px solid black; overflow-x: hidden; overflow-y: auto; text-align: left; background: white; } */

    .qsc-add-questions { float: left; width: 340px; height: 30px; margin: 5px 0 0 340px; } 
        .qsc-add-questions .qsc-button { float: left; width: 50px; height: 30px; margin-right: 4px; background-color: green; border: 1px solid white; } 
        .qsc-add-text-question:after { content:"text"; position:absolute; margin: 0; font-weight: bold; color: white; line-height: 31px; text-align: center; font-size: 13px; top:0; width: 100%; } 
        .qsc-add-numeric-question:after { content:"numeric"; position:absolute; margin: 0; font-weight: bold; color: white; line-height: 31px; text-align: center; font-size: 13px; top:0; width: 100%; } 
        .qsc-add-yesno-question:after { content:"y/n"; position:absolute; margin: 0; font-weight: bold; color: white; line-height: 31px; text-align: center; font-size: 13px; top:0; width: 100%; } 
        .qsc-add-truefalse-question:after { content:"t/f"; position:absolute; margin: 0; font-weight: bold; color: white; line-height: 31px; text-align: center; font-size: 13px; top:0; width: 100%; } 
        .qsc-add-multiplechoice-question:after { content:"m/c"; position:absolute; margin: 0; font-weight: bold; color: white; line-height: 31px; text-align: center; font-size: 13px; top:0; width: 100%; } 
        .qsc-add-sort-question:after { content:"sort"; position:absolute; margin: 0; font-weight: bold; color: white; line-height: 31px; text-align: center; font-size: 13px; top:0; width: 100%; } 

    .qsc-vertical-separator { position: relative; width: 1px; height: 100%; background: #444; margin: 0 5px; margin-top: 0; border-right: 1px solid #ccc; float:left; } 

    .qsc-error-panel { position: relative; width: 100%; min-height: 42px; background: #300; box-shadow: 0 -10px 35px -8px rgba(0,0,0,0.22); overflow:hidden; transition:background .2s ease; } 
        .qsc-error-panel-icon { transition:background .2s ease; position: relative; float: left; z-index:1; width: 32px; height: 32px; background-color: #900; background-image: url(../asset/error-icon.svg); background-size: 34px; background-repeat: no-repeat; background-position: 4px; padding: 5px; box-shadow: 10px 0 35px -12px rgba(0,0,0,0.3); } 
        .qsc-error-panel-error-text { position: absolute; left: 42px; width: auto; background: #300; color: white; font-size: 16px; margin: 0; padding: 12px 10px; opacity: 1; top: 0; transition:background .2s ease, opacity .2s ease, top .2s ease; } 
        .qsc-error-panel-error-text.hide { top: -32px; opacity: 0; transition:none; }       
        .qsc-error-panel-num-errors { transition:background .2s ease; position: relative; float: right; width: 88px; color: white; font-size: 16px; line-height: 18px; padding: 12px 5px; text-align: center; margin: 0; background:#900; } 
        .qsc-error-panel-next-btn { transition:background .2s ease; position: relative; float: right; width: 93px; height: 42px; color: white; font-weight: bold; font-size: 21px; cursor: pointer; background: none; box-shadow: -10px 0 35px -12px rgba(0,0,0,0.3); } 
        .qsc-error-panel-next-btn:after { position: absolute; content: ""; width: 0; height: 0; right: 7px; top: 13px; border-left: 11px solid transparent; border-right: 11px solid transparent; border-top: 15px solid white; transform: rotate(-90deg); transform-origin: 50% 50%; } 
        .qsc-error-panel-next-btn { background:#300; } 
        .qsc-error-panel-next-btn.disabled p { opacity:0.5; } 
        .qsc-error-panel-next-btn.disabled:after { opacity:0.5; } 
            .qsc-error-panel-next-btn p { float: left; margin: 0; line-height: 42px; margin-left: 10px; } 

     .qsc-error-panel.correct { background:#030; } 
         .qsc-error-panel.correct .qsc-error-panel-icon { background:#090; background-image: url(../asset/error-tick-icon.svg); background-size: 34px; background-repeat: no-repeat; background-position: 4px; } 
         .qsc-error-panel.correct .qsc-error-panel-error-text { background:#030; } 
         .qsc-error-panel.correct .qsc-error-panel-num-errors.zero { background:#050; } 
         .qsc-error-panel.correct .qsc-error-panel-next-btn { background:#090; } 

    .error-solved { font-style: italic; font-weight: bold; color: #006200; margin-left: 10px; } 

/*.qsc-see-where { cursor:pointer; } 
.qsc-link-panel { position: fixed; left: -40%; pointer-events:none; top: 0; width: 40%; min-width:250px; max-width: 530px; height: 100%; background: #666; border-right: solid 4px #eee; z-index: 30; box-shadow: 6px 0 25px 11px rgba(0,0,0,0.2); opacity: 0; transition:left .2s ease, opacity .2s ease; } 
    .qsc-link-panel.show { left:0; pointer-events:auto; opacity:1; } 
    .qsc-link-handle { background: #eee; width: 35px; height: 70px; transition: opacity 1s ease, background .2s ease; border-bottom-right-radius: 70px; border-top-right-radius: 70px; position: absolute; right: -35px; top: calc(45% - 35px); box-shadow: 7px 0 16px -2px rgba(0,0,0,0.26); cursor: pointer; } 
        .qsc-link-handle:after { position: absolute; content:""; width: 0; height: 0; top: 22px; left: 5px; transform: rotate(180deg); transition: transform .2s ease, left .2s ease; border-top: 13px solid transparent; border-bottom: 13px solid transparent; border-left: 14px solid #666; } 
    .qsc-link-header { display: block; margin: 5px; text-align: center; background: rgba(255,255,255,0.3); color: white; padding: 6px 0; } 
    .qsc-link-holder { overflow: hidden; position: relative; width: calc(100% - 10px); height: calc(100% - 85px); margin: 5px; margin-top: 0; } 
    .qsc-question-link-holder { position: relative; width: 100%; background: #444; border-radius: 4px; height: auto; overflow: hidden; margin-bottom: 5px; } 
        .qsc-question-link { text-decoration: none; position: relative; width: calc(100% - 52px); height: 40px; display: block; line-height: 40px; color: white; background: #444; border-radius: 4px; padding: 0 10px; margin-left: 32px; } 
            .qsc-link-question { position: relative; background: white; margin: 5px; padding: 5px; border-radius: 2px; color:#666; } 
            .qsc-link-icon { position: absolute; cursor:pointer; left: 5px; top: 5px; width: 30px; height: 30px; border: none; background-size:contain; background-repeat:no-repeat; background-color:transparent; } 
                .qsc-link-icon.icon-1 { background-image:url(../asset/user-icon.svg); } 
                .qsc-link-icon.icon-2 { background-image:url(../asset/school-icon.svg); } 
                .qsc-link-icon.icon-3 { background-image:url(../asset/core-icon.svg); } 
            .qsc-question-link-info-holder { display:none; position: relative; margin: 5px; max-height: 0; transition:max-height .2s ease; font-size:15px; margin-top: 0; background: #ccc; padding: 5px; color: #222; width: calc(100% - 20px); height: auto; overflow: hidden; border-radius: 4px; } 
            .qsc-question-link-info-holder > label { font-weight:bold; margin-bottom:5px; display: inline-block; } 
                .qsc-question-link-list { position: relative; padding-left: 20px; margin:0; margin-bottom: 5px; } 
                .qsc-question-link-list:after { position: absolute; content: "•"; top: 0; left: 7px; transform: scale(1.5); } 

        .qsc-question-link-holder.show .qsc-question-link-info-holder { max-height:700px; } */

/*==================================================MEDIA QUERIES=================================================*/
@media only screen and (min-width:1024px) { 
    .creator-element { min-width:1024px;  transition:width .2s ease; } 
 } 

@media only screen and (max-width:681px) { 
    .qsc-menu-button-holder.admin { width:40px; } 
    .qsc-menu-button-holder.admin .qsc-menu-button { display:none; } 
    .qsc-menu-button-holder.admin .qsc-menu-button.menu { display:block; margin-right:0; } 
    .qsc-topbar.admin .qsc-title-field:not(.comp):not(.notes) { width:calc(100% - 98px); } 
 } 

@media only screen and (max-width:650px) { 
    .qsc-topbar-feedback-area-feedback-holder { width: calc(100% - 10px); margin-right: 0; } 
    .qsc-topbar-feedback-area-input-label { margin-left:10px } 
    .qsc-topbar-feedback-area-input { width:calc(100% - 83px); } 
    .qsc-topbar.expanded .qsc-topbar-more-options { max-height: 247px; } 
    .qsc-question-set-holder.smallh { height: calc(100% - 311px); } 
    .qsc-question-set-holder.smallh.error-panel-showing { height:calc(100% - 354px); } 
 } 

@media only screen and (max-width:591px) { 
    .qsc-menu-button-holder { width:40px; }     
        .qsc-menu-button-holder:not(.admin) .qsc-menu-button { display:none; } 
        .qsc-menu-button-holder:not(.admin) .qsc-menu-button.menu { display:block; margin-right:0; } 

    .qsc-error-panel-next-btn { width:42px; } 
    .qsc-error-panel-next-btn p { display:none; } 
    .qsc-title-field { width:calc(100% - 98px); } 
 } 

/********************************* DYNAMIC QUESTIONS *************************************/
.qsc-dynamic-question-popup-left-cont { position: relative; float: left; width: 280px; padding: 5px 5px; } 
.qsc-dynamic-question-popup-right-cont { position: relative; float: left; width: calc(100% - 304px); padding: 5px 5px; } 
.qsc-dynamic-question-popup-upper-cont, .qsc-dynamic-question-popup-lower-cont { position: relative; float: left; width: 100%; } 
#qsc-widget-preview-placeholder { position: absolute; left: 5px; width: 280px; height: 210px; border: 0; } 
#qsc-widget-preview { position: relative; width: 280px; height: 210px; border: 0; } 
.qsc-dynamic-question-popup { font-family: Arial, sans-serif; font-size: 13px; } 
.qsc-dynamic-question-popup-type { position: relative; margin-bottom: 3px; } 
.qsc-dynamic-question-popup-rules { position: relative; color: red; } 
.qsc-dynamic-question-popup-new-answer-button { position: absolute; left: 109px; top: -5px; transform: scale(0.6, 0.6); z-index: 999; } 
.qsc-dynamic-question-popup-field-label { position: relative; float: left; width: 144px; padding-top: 3px; } 
.qsc-dynamic-question-popup-field { position: relative; float: left; width: calc(100% - 149px); margin-bottom: 2px; } 
.qsc-dynamic-question-popup input[type="checkbox"] { position: relative; width: auto; margin-left: 0; } 
qsc-dynamic-question-popup-radio-cont, .qsc-dynamic-question-popup-checkbox-cont { position: relative; float: left; width: 100%; } 
.qsc-dynamic-question-popup .description { position: relative; width: calc(100% - 5px); margin: 3px 0 3px 0; font-family: Arial, sans-serif; } 
.qsc-dynamic-question-popup-footnote { position: relative; float: left; } 
/*************************************** EXCEL *******************************************/
#menu-toggle { display: none; } 
#menu-toggle-label { padding: 5px 15px 5px 15px; font-family: Sans-Serif; color: #dbf5d9; z-index: 999; position: relative; box-shadow: 0 2px 10px #888888; background-color: #26ae90; border-radius: 0 0 5px 5px; cursor: pointer; }  
#menu { display: none; } 
#menu-toggle:checked + #menu { display: block; background: linear-gradient(to bottom, #45484d 0%,#000000 100%); padding: 0 50px 40px 40px; margin-left: -10px; margin-top: -30px; min-width: 100%; height: 80px; top: 0; left: 0; z-index: 998; } 
#menu-item-first, #menu-item { margin-right: 15px; top: 10px; z-index: 1; position: relative; font-family: Sans-Serif; color: #dbf5d9; float:left; width:340px; margin-top:30px; height: 39px; } 
#excel-menu-item { padding-left: 200px; } 
#excel-menu-item-submit { margin-top: -20px; margin-left: 50px; } 
#ImportWarnings { padding-top: 10px; color: orangered; }  
#DisabledImport, #DisabledExport { position:relative; top: -15px; color:orangered; } 
#menu fieldset { padding-bottom: 0; height: 66px; } 

p.green { 
    color: #00ff00;
 } 

/*p > .p-label { 
    color: blue;
 } */

button { 
    cursor: pointer;
 } 

</style>