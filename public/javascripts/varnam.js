function initPreviewMode(){if(typeof Storage=="undefined")return;var e=localStorage.previewMode||"both";logglePreview(e)}function logglePreview(e){$("#"+e+"Btn").click()}function selectLastUsedLanguage(){if(typeof Storage!="undefined"&&localStorage.language){var e=JSON.parse(localStorage.language);$(".dropdown-toggle").html(e.name+" <span class='caret'></span>"),$("#selected_lang").data("lang",e.code)}}function updatePreview(e){if(!$("#preview_div").is(":visible")&&!e)return;var t=document.getElementById("preview");t.contentWindow.document.body.innerHTML=converter.makeHtml(Varnam.editor.getValue())}function savePreviewMode(e){if(typeof Storage=="undefined")return;localStorage.previewMode=e}function toggleErrorMessageVisibility(e){e?$("#network-error").fadeIn("slow"):$("#network-error").fadeOut("slow")}(function(){function p(){var t='<div id="'+e+'" class="CodeMirror-completions" style="display: none;"><select multiple="false"></select></div>';$("body").append(t)}function d(){$("body").on("dblclick",r,function(){m(y()),s=!0}),$(n).keydown(function(e){if(e.keyCode===u.ESCAPE)T(),f.focus();else if(w(e.keyCode)){var t=$(this).find(":selected").text();if(t!==undefined&&t!==""){m(t);if(e.keyCode==u.ENTER)return e.preventDefault(),e.stopPropagation(),s=!0,!0}}})}function m(e){var t=C(f),n=t.start,r=f.charCoords(n),i=t.word;i!==""&&(f.replaceRange(e,n,t.end),f.focus()),T(),g(e)}function g(e){if(c===undefined||c==="en")return;$.post("learn",{text:e,lang:c})}function y(){return $(n).find(":selected").text()}function b(){var e=y();e!==undefined&&e!==""&&m(e)}function w(e){var t=$.inArray(e,a)==-1?!1:!0;return t?!0:!1}function E(e,t){var r=$.event.fix(t);if(r.type!="keydown")return;s=!1;if(r.keyCode==u.ESCAPE){T();return}if(i){if(r.keyCode===u.DOWN_ARROW)return $(n).focus(),r.preventDefault(),r.stopPropagation(),!0;if(w(r.keyCode)){b();if(r.keyCode===u.ENTER)return r.preventDefault(),r.stopPropagation(),s=!0,!0}}else if(r.keyCode==u.SPACE){s=!0;var o=C(f);v[o.word]=o}else w(r.keyCode)&&(s=!0)}function S(){var e=C(f),t=f.charCoords(e.start);e.word!==""?x(t.x,t.y,e.word):T()}function x(e,r,s){if(c==="en")return;var o={text:s,lang:c};show_error=!1,T(),request=$.ajax({url:"tl?"+$.param(o),dataType:"jsonp",crossDomain:"true",success:function(s){h!==null&&h(!1),html="";var o=0;if(v[s.input]!==undefined)wordToReplace=v[s.input],actualValueAtThatPos=f.getRange(wordToReplace.start,wordToReplace.end),actualValueAtThatPos==s.input&&f.replaceRange(s.result[0],wordToReplace.start,wordToReplace.end),delete v[s.input];else if(C(f).word==s.input){$.each(s.result,function(e,t){e===0?html+="<option selected>"+t+"</option>":html+="<option>"+t+"</option>",o<t.length&&(o=t.length),$(n).html(html).css("width",o+2+"em")}),$(n).html(html).css("height",s.result.length+1+"em");var u=$(".CodeMirror"),a=$(t).css("display","block").css("left",e+"px").css("top",r+15+"px"),l=a.height(),c=a.width();r+l>u.position().top+u.innerHeight()&&a.css("top",r-l+"px"),e+c>u.position().left+u.innerWidth()&&a.css("left",e-c+"px"),i=!0}},error:function(e,t,n){show_error=!0,window.setTimeout(function(){show_error&&h!==null&&h(!0)},2e3)}})}function T(){$(t).css("display","none"),i=!1}function N(e){return e===null||e===""||e==" "||e=="\n"||e=="."||e=="	"||e=="\r"||e=='"'||e=="'"||e=="?"||e=="!"||e==","||e=="("||e==")"||e==""||e=="\f"||e==""||e=="\u2028"||e=="\u2029"||e=="\r"||e=="\n"||e==";"?!0:!1}function C(e){var t=e.getCursor(),n=0,r=0,i=e.getValue().length+1,s=t.ch;n=t;while(s){text=e.getRange({line:t.line,ch:s-1},{line:t.line,ch:s});if(N(text))break;--s,n={line:t.line,ch:s}}r=t,s=t.ch;while(s<i){text=e.getRange({line:t.line,ch:s},{line:t.line,ch:s+1});if(N(text))break;++s,r={line:t.line,ch:s}}return{start:n,end:r,word:e.getRange(n,r)}}function k(e,t,n,r,i){window.clearTimeout(o);if(s)return;o=window.setTimeout(function(){S()},10),l!==null&&l(e,t,n,r,i)}window.Varnam={};var e="popup",t="#"+e,n=t+" select",r=t+n+" option",i=!1,s=!1,o=null,u={ESCAPE:27,ENTER:13,TAB:9,SPACE:32,PERIOD:190,DOWN_ARROW:40,QUESTION:191,EXCLAMATION:49,COMMA:188,LEFT_BRACKET:57,RIGHT_BRACKET:48,SEMICOLON:59},a=[u.ENTER,u.TAB,u.SPACE,u.PERIOD,u.QUESTION,u.EXCLAMATION,u.COMMA,u.LEFT_BRACKET,u.RIGHT_BRACKET,u.SEMICOLON],f=null,l=null,c=null,h=null;Varnam.init=function(e){f=CodeMirror.fromTextArea(e.textArea,{mode:e.mode,lineNumbers:e.lineNumbers,lineWrapping:!0,onChange:k,extraKeys:{"Ctrl-Space":function(e){S()}},onKeyEvent:E}),l=e.textChangedCallback,Varnam.editor=f,Varnam.setLanguage(e.language),h=e.errorCallback,p(),d()},Varnam.setLanguage=function(e){c=e};var v={}})();var converter=new Showdown.converter;window.onbeforeunload=function(e){e=e||window.event;if($.trim(myCodeMirror.getValue())!=="")return e&&(e.returnValue="You will loose the text. Are you sure?"),"You will loose the text. Are you sure?"},$("button").click(function(){var e=$(this).data("preview");switch(e){case"editor":$("#editor_div").removeClass("span6").addClass("span12"),$("#preview_div").hide(),$("#editor_div").show();break;case"both":$("#editor_div").removeClass("span12").addClass("span6"),$("#preview_div").show(),$("#editor_div").show(),$("#preview_div").css("margin-left",$("#reserve").css("margin-left")),$("#preview_div").removeClass("span12").addClass("span6"),updatePreview();break;case"preview":$("#editor_div").hide(),$("#preview_div").show(),$("#preview_div").removeClass("span6").addClass("span12"),$("#preview_div").css("margin-left","0"),updatePreview()}savePreviewMode(e)}),$("#printBtn").click(function(){updatePreview(!0),window.print()}),$(".lang").click(function(){$(".dropdown-toggle").html($(this).text()+" <span class='caret'></span>"),$("#selected_lang").data("lang",$(this).data("lang")),Varnam.setLanguage($(this).data("lang"));if(typeof Storage=="undefined")return;localStorage.language=JSON.stringify({name:$(this).text(),code:$(this).data("lang")})}),$("#network-error-close").click(function(){toggleErrorMessageVisibility(!1)});