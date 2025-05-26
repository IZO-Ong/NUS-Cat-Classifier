import{r as a,j as i}from"./index-CkCXjceP.js";/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const f=t=>t.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),y=t=>t.replace(/^([A-Z])|[\s-_]+(\w)/g,(e,o,r)=>r?r.toUpperCase():o.toLowerCase()),d=t=>{const e=y(t);return e.charAt(0).toUpperCase()+e.slice(1)},p=(...t)=>t.filter((e,o,r)=>!!e&&e.trim()!==""&&r.indexOf(e)===o).join(" ").trim(),k=t=>{for(const e in t)if(e.startsWith("aria-")||e==="role"||e==="title")return!0};/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var x={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const b=a.forwardRef(({color:t="currentColor",size:e=24,strokeWidth:o=2,absoluteStrokeWidth:r,className:n="",children:s,iconNode:c,...l},h)=>a.createElement("svg",{ref:h,...x,width:e,height:e,stroke:t,strokeWidth:r?Number(o)*24/Number(e):o,className:p("lucide",n),...!s&&!k(l)&&{"aria-hidden":"true"},...l},[...c.map(([m,w])=>a.createElement(m,w)),...Array.isArray(s)?s:[s]]));/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const u=(t,e)=>{const o=a.forwardRef(({className:r,...n},s)=>a.createElement(b,{ref:s,iconNode:e,className:p(`lucide-${f(d(t))}`,`lucide-${t}`,r),...n}));return o.displayName=d(t),o};/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const C=[["path",{d:"M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49",key:"ct8e1f"}],["path",{d:"M14.084 14.158a3 3 0 0 1-4.242-4.242",key:"151rxh"}],["path",{d:"M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143",key:"13bj9a"}],["path",{d:"m2 2 20 20",key:"1ooewy"}]],g=u("eye-off",C);/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const j=[["path",{d:"M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",key:"1nclc0"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]],v=u("eye",j);function E({label:t="Password",value:e,onChange:o,placeholder:r="Password",onKeyDown:n,required:s=!1}){const[c,l]=a.useState(!1);return i.jsxs("div",{className:"password-field",style:{position:"relative"},children:[i.jsx("input",{type:c?"text":"password",value:e,onChange:o,onKeyDown:n,placeholder:r,required:s,className:"password-input",style:{width:"100%",paddingRight:"3rem"}}),i.jsx("button",{type:"button",onClick:()=>l(!c),style:{position:"absolute",right:"0rem",top:"50%",transform:"translateY(-50%)",background:"none",border:"none",cursor:"pointer"},children:c?i.jsx(g,{size:18,color:"black"}):i.jsx(v,{size:18,color:"black"})})]})}export{E as P};
