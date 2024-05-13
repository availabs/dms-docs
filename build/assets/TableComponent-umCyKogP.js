import{aj as be,r as N,L as Ee,b as e,a as De,j as c,k as Me,ak as he,al as re}from"./vendor-9mQZ5CO5.js";import{L as Te}from"./LexicalNestedComposer-B2QbZ0L1.js";import{C as xe,c as de,d as Oe,e as fe,I as me,f as _e,g as we,h as $e,i as Ie}from"./index-m1bSR3mx.js";const F=[];function Ae(){const l=e.$createRangeSelection();return l.focus.set("root",e.$getRoot().getChildrenSize(),"element"),l}function je(l){return`<p class="${l.paragraph}"><br></p>`}function ie(l,s){const u=l.querySelector(`[data-id=${s}]`);u!=null&&u.focus()}function Le(l){return l.nodeType===1&&l.hasAttribute("data-table-resize")}function Pe(l,s){const u=s.parseEditorState(l);let d=fe.get(l);if(d===void 0){d=u.read(()=>he.$generateHtmlFromNodes(s,null));const E=u.read(()=>e.$getRoot().getTextContent());fe.set(l,d),de.set(l,E)}return d}function pe(l){const s=l.getRootElement();return s!==null?s.ownerDocument:document}function ke(l,s,u,d){return s?!1:l===67?me?u:d:!1}function Ye(l,s,u,d){return s?!1:l===88?me?u:d:!1}function ve(l,s,u,d){return s?!1:l===86?me?u:d:!1}function ue(l){let s=l;for(;s!==null;){const u=s.getAttribute("data-id");if(u!=null)return u;s=s.parentElement}return null}function Ke(l){let s=l;for(;s!==null;){if(s.nodeName==="TH"||s.nodeName==="TD")return s.getBoundingClientRect().width;s=s.parentElement}return 0}function Q(l,s,u,d,E,S){for(const R of s){const w=oe(l,R,u);if(w!==null&&d!==null){const $=d.parseEditorState(w.json);d._headless=!0,d.setEditorState($),d.update(S,{discrete:!0}),d._headless=!1;const P=JSON.stringify(d.getEditorState());E(D=>{const[O,j]=u.get(R);e.$addUpdateTag("history-push"),D.updateCellJSON(O,j,P)})}}}function Ue(l){let s=l;for(;s!==null;){const u=s.nodeName;if(u==="BUTTON"||u==="INPUT"||u==="TEXTAREA")return!0;s=s.parentElement}return!1}function Ne(l,s,u){const d=u.get(l),E=u.get(s);if(d===void 0||E===void 0)return null;const S=Math.min(d[0],E[0]),R=Math.max(d[0],E[0]),w=Math.min(d[1],E[1]),$=Math.max(d[1],E[1]);return{endX:R,endY:$,startX:S,startY:w}}function Ce(l,s,u,d){const E=Ne(s,u,d);if(E===null)return[];const{startX:S,endY:R,endX:w,startY:$}=E,P=[];for(let D=S;D<=w;D++)for(let O=$;O<=R;O++)P.push(l[O].cells[D].id);return P}function We(l,s){const{startX:u,endY:d,endX:E,startY:S}=s,R=[];for(let w=S;w<=d;w++){const $=l[w],P=$e();for(let D=u;D<=E;D++){const O={...$.cells[D]};O.id=Ie(),P.cells.push(O)}R.push(P)}return R}function ze({cellEditor:l}){const{cellEditorConfig:s,cellEditorPlugins:u}=N.useContext(xe);return u===null||s===null?null:c.jsx(Te.LexicalNestedComposer,{initialEditor:l,initialTheme:s.theme,initialNodes:s.nodes,skipCollabChecks:!0,children:u})}function oe(l,s,u){const d=u.get(s);if(d===void 0)return null;const[E,S]=d;return l[S].cells[E]}function Xe({cell:l,rows:s,cellCoordMap:u,menuElem:d,updateCellsByID:E,onClose:S,updateTableNode:R,setSortingOptions:w,sortingOptions:$}){const P=N.useRef(null);N.useEffect(()=>{const t=P.current;if(t!==null){const k=d.getBoundingClientRect();t.style.top=`${k.y}px`,t.style.left=`${k.x}px`}},[d]),N.useEffect(()=>{const t=k=>{const X=P.current;X!==null&&!X.contains(k.target)&&k.stopPropagation()};return window.addEventListener("click",t),()=>window.removeEventListener("click",t)},[S]);const D=u.get(l.id);if(D===void 0)return null;const[O,j]=D;return c.jsxs("div",{className:"dropdown",ref:P,onPointerMove:t=>{t.stopPropagation()},onPointerDown:t=>{t.stopPropagation()},onPointerUp:t=>{t.stopPropagation()},onClick:t=>{t.stopPropagation()},children:[c.jsx("button",{className:"item",onClick:()=>{R(t=>{e.$addUpdateTag("history-push"),t.updateCellType(O,j,l.type==="normal"?"header":"normal")}),S()},children:c.jsx("span",{className:"text",children:l.type==="normal"?"Make header":"Remove header"})}),c.jsx("button",{className:"item",onClick:()=>{E([l.id],()=>{const t=e.$getRoot();t.clear(),t.append(e.$createParagraphNode())}),S()},children:c.jsx("span",{className:"text",children:"Clear cell"})}),c.jsx("hr",{}),l.type==="header"&&j===0&&c.jsxs(c.Fragment,{children:[$!==null&&$.x===O&&c.jsx("button",{className:"item",onClick:()=>{w(null),S()},children:c.jsx("span",{className:"text",children:"Remove sorting"})}),($===null||$.x!==O||$.type==="descending")&&c.jsx("button",{className:"item",onClick:()=>{w({type:"ascending",x:O}),S()},children:c.jsx("span",{className:"text",children:"Sort ascending"})}),($===null||$.x!==O||$.type==="ascending")&&c.jsx("button",{className:"item",onClick:()=>{w({type:"descending",x:O}),S()},children:c.jsx("span",{className:"text",children:"Sort descending"})}),c.jsx("hr",{})]}),c.jsx("button",{className:"item",onClick:()=>{R(t=>{e.$addUpdateTag("history-push"),t.insertRowAt(j)}),S()},children:c.jsx("span",{className:"text",children:"Insert row above"})}),c.jsx("button",{className:"item",onClick:()=>{R(t=>{e.$addUpdateTag("history-push"),t.insertRowAt(j+1)}),S()},children:c.jsx("span",{className:"text",children:"Insert row below"})}),c.jsx("hr",{}),c.jsx("button",{className:"item",onClick:()=>{R(t=>{e.$addUpdateTag("history-push"),t.insertColumnAt(O)}),S()},children:c.jsx("span",{className:"text",children:"Insert column left"})}),c.jsx("button",{className:"item",onClick:()=>{R(t=>{e.$addUpdateTag("history-push"),t.insertColumnAt(O+1)}),S()},children:c.jsx("span",{className:"text",children:"Insert column right"})}),c.jsx("hr",{}),s[0].cells.length!==1&&c.jsx("button",{className:"item",onClick:()=>{R(t=>{e.$addUpdateTag("history-push"),t.deleteColumnAt(O)}),S()},children:c.jsx("span",{className:"text",children:"Delete column"})}),s.length!==1&&c.jsx("button",{className:"item",onClick:()=>{R(t=>{e.$addUpdateTag("history-push"),t.deleteRowAt(j)}),S()},children:c.jsx("span",{className:"text",children:"Delete row"})}),c.jsx("button",{className:"item",onClick:()=>{R(t=>{e.$addUpdateTag("history-push"),t.selectNext(),t.remove()}),S()},children:c.jsx("span",{className:"text",children:"Delete table"})})]})}function Be({cell:l,cellCoordMap:s,cellEditor:u,isEditing:d,isSelected:E,isPrimarySelected:S,theme:R,updateCellsByID:w,updateTableNode:$,rows:P,setSortingOptions:D,sortingOptions:O}){const[j,t]=N.useState(!1),k=N.useRef(null),X=l.type!=="normal",V=l.json,ae=X?"th":"td",Z=l.width,C=k.current,v=s.get(l.id),B=O!==null&&v!==void 0&&v[0]===O.x&&v[1]===0;return N.useEffect(()=>{(d||!S)&&t(!1)},[d,S]),c.jsxs(ae,{className:`${R.tableCell} ${X?R.tableCellHeader:""} ${E?R.tableCellSelected:""}`,"data-id":l.id,tabIndex:-1,style:{width:Z!==null?Z:void 0},children:[S&&c.jsx("div",{className:`${R.tableCellPrimarySelected} ${d?R.tableCellEditing:""}`}),S&&d?c.jsx(ze,{cellEditor:u}):c.jsxs(c.Fragment,{children:[c.jsx("div",{dangerouslySetInnerHTML:{__html:V===""?je(R):Pe(V,u)}}),c.jsx("div",{className:R.tableCellResizer,"data-table-resize":"true"})]}),S&&!d&&c.jsx("div",{className:R.tableCellActionButtonContainer,ref:k,children:c.jsx("button",{className:R.tableCellActionButton,onClick:ee=>{t(!j),ee.stopPropagation()},children:c.jsx("i",{className:"chevron-down"})})}),j&&C!==null&&Me.createPortal(c.jsx(Xe,{cell:l,menuElem:C,updateCellsByID:w,onClose:()=>t(!1),updateTableNode:$,cellCoordMap:s,rows:P,setSortingOptions:D,sortingOptions:O}),document.body),B&&c.jsx("div",{className:R.tableCellSortedIndicator})]})}function Ge({nodeKey:l,rows:s,theme:u}){const[d,E,S]=be.useLexicalNodeSelection(l),R=N.useRef({point:0,size:0}),[w,$]=N.useState(null),P=N.useRef(null),D=N.useRef(null),O=N.useRef(null),{cellEditorConfig:j}=N.useContext(xe),[t,k]=N.useState(!1),[X,V]=N.useState(!1),[ae,Z]=N.useState(!1),[C]=Ee.useLexicalComposerContext(),v=N.useRef(!1),[B,ee]=N.useState(null),G=N.useRef(null),M=N.useMemo(()=>{const a=new Map;for(let x=0;x<s.length;x++){const A=s[x].cells;for(let g=0;g<A.length;g++){const b=A[g];a.set(b.id,[g,x])}}return a},[s]),T=N.useMemo(()=>{if(w===null)return s;const a=s.slice(1);return a.sort((x,I)=>{const A=x.cells,g=I.cells,b=w.x,Y=de.get(A[b].json)||"",_=de.get(g[b].json)||"";return Y===""||_===""?1:w.type==="ascending"?Y.localeCompare(_):_.localeCompare(Y)}),a.unshift(s[0]),a},[s,w]),[f,H]=N.useState(null),y=N.useMemo(()=>{if(j===null)return null;const a=e.createEditor({namespace:j.namespace,nodes:j.nodes,onError:x=>j.onError(x,a),theme:j.theme});return a},[j]),[U,W]=N.useState([]),ge=N.useMemo(()=>new Set(U),[U]);N.useEffect(()=>{const a=G.current;d&&document.activeElement===document.body&&a!==null&&a.focus()},[d]);const L=N.useCallback(a=>{C.update(()=>{const x=e.$getNodeByKey(l);Oe(x)&&a(x)})},[C,l]),Re=()=>{L(a=>{e.$addUpdateTag("history-push"),a.addColumns(1)})},Se=()=>{L(a=>{e.$addUpdateTag("history-push"),a.addRows(1)})},J=N.useCallback((a,x,I)=>{const A=T[x].cells[a].id;if(D.current=A,I){const g=Ce(T,f,A,M);W(g)}else H(A),W(F),ie(G.current,A)},[M,f,T]),q=N.useCallback(()=>{if(y!==null&&f!==null){const a=JSON.stringify(y.getEditorState());L(x=>{const I=M.get(f);if(I===void 0)return;e.$addUpdateTag("history-push");const[A,g]=I;x.updateCellJSON(A,g,a)})}},[M,y,f,L]),te=N.useCallback(()=>{setTimeout(()=>{var x;const a=C.getRootElement();a!==null&&(a.focus({preventScroll:!0}),(x=window.getSelection())==null||x.removeAllRanges())},20)},[C]);N.useEffect(()=>{const a=G.current;if(a===null)return;const x=pe(C),I=_=>{const n=_.clientX-g.x,r=_.clientY-g.y;return n<5||r<5},A=_=>{const n=ue(_.target);if(n!==null&&C.isEditable()&&a.contains(_.target)){if(I(_)){E(!0),H(null),te();return}if(E(!1),Le(_.target)){ee(n),a.style.userSelect="none",R.current={point:_.clientX,size:Ke(_.target)};return}v.current=!0,f!==n?(t&&q(),H(n),k(!1),D.current=n):D.current=null,W(F)}else f!==null&&!Ue(_.target)&&(E(!1),v.current=!1,t&&q(),H(null),W(F),k(!1),D.current=null)},g=a.getBoundingClientRect(),b=_=>{if(B!==null){const r=O.current;if(r!==null){const{size:o,point:m}=R.current,p=_.clientX-m,h=o+p;let i=_.clientX-g.x;i<10?i=10:i>g.width-10?i=g.width-10:h<20&&(i=m-o+20-g.x),r.style.left=`${i}px`}return}if(!t){const{clientX:r,clientY:o}=_,{width:m,x:p,y:h,height:i}=g,z=r>p+m*.9&&r<p+m+40&&!v.current;V(z);const K=_.target===P.current||o>h+i*.85&&o<h+i+5&&!v.current;Z(K)}if(t||!v.current||f===null)return;const n=ue(_.target);if(n!==null&&n!==D.current){U.length===0&&(a.style.userSelect="none");const r=Ce(T,f,n,M);r.length===1?W(F):W(r),D.current=n}},Y=_=>{var n;if(B!==null){const{size:r,point:o}=R.current,m=_.clientX-o;let p=r+m;p<10&&(p=10),L(h=>{const[i]=M.get(B);e.$addUpdateTag("history-push"),h.updateColumnWidth(i,p)}),ee(null)}a!==null&&U.length>1&&v.current&&(a.style.userSelect="text",(n=window.getSelection())==null||n.removeAllRanges()),v.current=!1};return x.addEventListener("pointerdown",A),x.addEventListener("pointermove",b),x.addEventListener("pointerup",Y),()=>{x.removeEventListener("pointerdown",A),x.removeEventListener("pointermove",b),x.removeEventListener("pointerup",Y)}},[y,C,t,T,q,f,ge,U,M,B,L,E,te]),N.useEffect(()=>{if(!t&&f!==null){const a=pe(C),x=g=>{if(g!==null&&y!==null){const b=g.json,Y=y.parseEditorState(b);y.setEditorState(Y)}},I=g=>{const b=ue(g.target);if(b===f&&C.isEditable()){const Y=oe(T,b,M);x(Y),k(!0),W(F)}},A=g=>{const b=g.keyCode;if(b===16||b===27||b===9||b===37||b===38||b===39||b===40||b===8||b===46||!C.isEditable())return;if(b===13&&g.preventDefault(),!t&&f!==null&&C.getEditorState().read(()=>e.$getSelection()===null)&&g.target.contentEditable!=="true"){if(ke(b,g.shiftKey,g.metaKey,g.ctrlKey)){C.dispatchCommand(e.COPY_COMMAND,g);return}if(Ye(b,g.shiftKey,g.metaKey,g.ctrlKey)){C.dispatchCommand(e.CUT_COMMAND,g);return}if(ve(b,g.shiftKey,g.metaKey,g.ctrlKey)){C.dispatchCommand(e.PASTE_COMMAND,g);return}}if(g.metaKey||g.ctrlKey||g.altKey)return;const Y=oe(T,f,M);x(Y),k(!0),W(F)};return a.addEventListener("dblclick",I),a.addEventListener("keydown",A),()=>{a.removeEventListener("dblclick",I),a.removeEventListener("keydown",A)}}},[y,C,t,T,f,M]);const ce=N.useCallback((a,x)=>{Q(T,a,M,y,L,x)},[M,y,T,L]),ne=N.useCallback(()=>f!==null&&!t?(ce([f,...U],()=>{const a=e.$getRoot();a.clear(),a.append(e.$createParagraphNode())}),!0):(d&&L(a=>{e.$addUpdateTag("history-push"),a.selectNext(),a.remove()}),!1),[t,d,f,U,ce,L]);if(N.useEffect(()=>{const a=G.current;if(a===null)return;const x=(n,r,o,m)=>{const p=n instanceof KeyboardEvent?null:n.clipboardData;if(n.preventDefault(),p!=null)p.setData("text/html",r),p.setData("text/plain",m),p.setData("application/x-lexical-editor",o);else{const h=navigator.clipboard;if(h!=null){const i=[new ClipboardItem({"text/html":new Blob([r],{type:"text/html"})})];h.write(i)}}},I=async(n,r)=>{try{return n instanceof DataTransfer?n.getData(r):n instanceof ClipboardItem?await(await n.getType(r)).text():""}catch{return""}},A=async n=>{let r=(n instanceof InputEvent?null:n.clipboardData)||null;if(f!==null&&y!==null){if(n.preventDefault(),r===null)try{r=(await navigator.clipboard.read())[0]}catch{}const o=r!==null?await I(r,"application/x-lexical-editor"):"";if(o)try{const h=JSON.parse(o);if(h.namespace===C._config.namespace&&Array.isArray(h.nodes)){Q(T,[f],M,y,L,()=>{const i=e.$getRoot();i.clear(),i.append(e.$createParagraphNode()),i.selectEnd();const z=re.$generateNodesFromSerializedNodes(h.nodes),K=e.$getSelection();e.$isRangeSelection(K)&&re.$insertGeneratedNodes(y,z,K)});return}}catch{}const m=r!==null?await I(r,"text/html"):"";if(m)try{const i=new DOMParser().parseFromString(m,"text/html"),z=i.querySelector("table");if(z!=null){const K=_e(z);L(le=>{const[se,ye]=M.get(f);e.$addUpdateTag("history-push"),le.mergeRows(se,ye,K)});return}Q(T,[f],M,y,L,()=>{const K=e.$getRoot();K.clear(),K.append(e.$createParagraphNode()),K.selectEnd();const le=he.$generateNodesFromDOM(C,i),se=e.$getSelection();e.$isRangeSelection(se)&&re.$insertGeneratedNodes(y,le,se)});return}catch{}const p=r!==null?await I(r,"text/plain"):"";p!=null&&Q(T,[f],M,y,L,()=>{const h=e.$getRoot();h.clear(),h.selectEnd();const i=e.$getSelection();i!==null&&i.insertRawText(p)})}},g=n=>{if(f!==null&&y!==null){const o=oe(T,f,M).json,m=fe.get(o)||null;if(m===null)return;const p=y.parseEditorState(o),h=p.read(()=>e.$getRoot().getTextContent()),i=p.read(()=>JSON.stringify(re.$generateJSONFromSelectedNodes(y,null)));x(n,m,i,h)}},b=n=>{const r=D.current;if(f!==null&&y!==null&&r!==null){const o=Ne(f,r,M);if(o===null)return;const m=we(T,o),p=m.outerHTML,h=m.outerText,i=C.getEditorState().read(()=>e.$getNodeByKey(l).exportJSON());i.rows=We(T,o);const z={namespace:y._config.namespace,nodes:[i]},K=JSON.stringify(z);x(n,p,K,h)}},Y=(n,r)=>{const o=e.$getSelection();return f!==null&&!t&&o===null&&r===C?(A(n),v.current=!1,W(F),!0):!1},_=(n,r)=>{const o=e.$getSelection();return f!==null&&!t&&o===null&&r===C?(U.length===0?g(n):b(n),!0):!1};return De.mergeRegister(C.registerCommand(e.CLICK_COMMAND,n=>{const r=e.$getSelection();return!!e.$isNodeSelection(r)},e.COMMAND_PRIORITY_LOW),C.registerCommand(e.PASTE_COMMAND,Y,e.COMMAND_PRIORITY_LOW),C.registerCommand(e.COPY_COMMAND,_,e.COMMAND_PRIORITY_LOW),C.registerCommand(e.CUT_COMMAND,(n,r)=>_(n,r)?(ne(),!0):!1,e.COMMAND_PRIORITY_LOW),C.registerCommand(e.KEY_BACKSPACE_COMMAND,ne,e.COMMAND_PRIORITY_LOW),C.registerCommand(e.KEY_DELETE_COMMAND,ne,e.COMMAND_PRIORITY_LOW),C.registerCommand(e.FORMAT_TEXT_COMMAND,n=>f!==null&&!t?(Q(T,[f,...U],M,y,L,()=>{Ae().formatText(n)}),!0):!1,e.COMMAND_PRIORITY_LOW),C.registerCommand(e.KEY_ENTER_COMMAND,(n,r)=>{const o=e.$getSelection();if(f===null&&!t&&e.$isNodeSelection(o)&&o.has(l)&&o.getNodes().length===1&&r===C){const m=T[0].cells[0].id;return H(m),ie(a,m),n.preventDefault(),n.stopPropagation(),S(),!0}return!1},e.COMMAND_PRIORITY_LOW),C.registerCommand(e.KEY_TAB_COMMAND,n=>{const r=e.$getSelection();if(!t&&r===null&&f!==null){const o=n.shiftKey,[m,p]=M.get(f);n.preventDefault();let h=null,i=null;if(m===0&&o?p!==0&&(i=p-1,h=T[i].cells.length-1):m===T[p].cells.length-1&&!o?p!==T.length-1&&(i=p+1,h=0):o?(h=m-1,i=p):(h=m+1,i=p),h!==null&&i!==null)return J(h,i,!1),!0}return!1},e.COMMAND_PRIORITY_LOW),C.registerCommand(e.KEY_ARROW_UP_COMMAND,(n,r)=>{const o=e.$getSelection();if(!t&&o===null){const m=n.shiftKey,p=m&&D.current||f;if(p!==null){const[h,i]=M.get(p);if(i!==0)return J(h,i-1,m),!0}}return!e.$isRangeSelection(o)||r!==y?!1:o.isCollapsed()&&o.anchor.getNode().getTopLevelElementOrThrow().getPreviousSibling()===null?(n.preventDefault(),!0):!1},e.COMMAND_PRIORITY_LOW),C.registerCommand(e.KEY_ARROW_DOWN_COMMAND,(n,r)=>{const o=e.$getSelection();if(!t&&o===null){const m=n.shiftKey,p=m&&D.current||f;if(p!==null){const[h,i]=M.get(p);if(i!==T.length-1)return J(h,i+1,m),!0}}return!e.$isRangeSelection(o)||r!==y?!1:o.isCollapsed()&&o.anchor.getNode().getTopLevelElementOrThrow().getNextSibling()===null?(n.preventDefault(),!0):!1},e.COMMAND_PRIORITY_LOW),C.registerCommand(e.KEY_ARROW_LEFT_COMMAND,(n,r)=>{const o=e.$getSelection();if(!t&&o===null){const m=n.shiftKey,p=m&&D.current||f;if(p!==null){const[h,i]=M.get(p);if(h!==0)return J(h-1,i,m),!0}}return!e.$isRangeSelection(o)||r!==y?!1:o.isCollapsed()&&o.anchor.offset===0?(n.preventDefault(),!0):!1},e.COMMAND_PRIORITY_LOW),C.registerCommand(e.KEY_ARROW_RIGHT_COMMAND,(n,r)=>{const o=e.$getSelection();if(!t&&o===null){const m=n.shiftKey,p=m&&D.current||f;if(p!==null){const[h,i]=M.get(p);if(h!==T[i].cells.length-1)return J(h+1,i,m),!0}}if(!e.$isRangeSelection(o)||r!==y)return!1;if(o.isCollapsed()){const m=o.anchor;if(m.type==="text"&&m.offset===m.getNode().getTextContentSize()||m.type==="element"&&m.offset===m.getNode().getChildrenSize())return n.preventDefault(),!0}return!1},e.COMMAND_PRIORITY_LOW),C.registerCommand(e.KEY_ESCAPE_COMMAND,(n,r)=>{const o=e.$getSelection();return!t&&o===null&&r===C?(E(!0),H(null),te(),!0):e.$isRangeSelection(o)&&t?(q(),k(!1),f!==null&&setTimeout(()=>{ie(a,f)},20),!0):!1},e.COMMAND_PRIORITY_LOW))},[M,y,ne,S,C,t,J,l,f,T,q,te,U,E,L]),y!==null)return c.jsxs("div",{style:{position:"relative"},children:[c.jsx("table",{className:`${u.table} ${d?u.tableSelected:""}`,ref:G,tabIndex:-1,children:c.jsx("tbody",{children:T.map(a=>c.jsx("tr",{className:u.tableRow,children:a.cells.map(x=>{const{id:I}=x;return c.jsx(Be,{cell:x,theme:u,isSelected:ge.has(I),isPrimarySelected:f===I,isEditing:t,sortingOptions:w,cellEditor:y,updateCellsByID:ce,updateTableNode:L,cellCoordMap:M,rows:T,setSortingOptions:$},I)})},a.id))})}),X&&c.jsx("button",{className:u.tableAddColumns,onClick:Re}),ae&&c.jsx("button",{className:u.tableAddRows,onClick:Se,ref:P}),B!==null&&c.jsx("div",{className:u.tableResizeRuler,ref:O})]})}export{Ge as default};