import{u as c,r as i,c as m,j as e,s as l}from"./index-622637dd.js";function u({id:a,closeModal:r}){const s=c(),n=i.useCallback(t=>{t.preventDefault();const o=new FormData(t.target);m({dispatch:s,entry:{id:new Date().toString().slice(4,24),name:o.get("name"),color:o.get("color")}}),t.target.reset(),r()});return e.jsxs("form",{id:a,className:l.new_collection_modal_form,onSubmit:n,children:[e.jsxs("label",{children:[e.jsx("h3",{children:"Collection name"}),e.jsx("input",{name:"name",type:"text"})]}),e.jsxs("label",{className:l["color-picker"],children:[e.jsx("h3",{children:"Collection color"}),e.jsx("input",{name:"color",type:"color"})]})]})}export{u as default};
