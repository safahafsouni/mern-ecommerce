/*! For license information please see main.c05cb02b.js.LICENSE.txt */
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,bB=iB`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,EB=iB`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,CB=aB("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${yB} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${bB} 0.15s ease-out forwards;
    animation-delay: 150ms;
    position: absolute;
    border-radius: 3px;
    opacity: 0;
    background: ${e=>e.secondary||"#fff"};
    bottom: 9px;
    left: 4px;
    height: 2px;
    width: 12px;
  }

  &:before {
    animation: ${EB} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,wB=iB`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,xB=aB("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${wB} 1s linear infinite;
`,SB=iB`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,_B=iB`
0% {
	height: 0;
	width: 0;
	opacity: 0;
}
40% {
  height: 0;
	width: 6px;
	opacity: 1;
}
100% {
  opacity: 1;
  height: 10px;
}`,PB=aB("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${SB} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${_B} 0.2s ease-out forwards;
    opacity: 0;
    animation-delay: 200ms;
    position: absolute;
    border-right: 2px solid;
    border-bottom: 2px solid;
    border-color: ${e=>e.secondary||"#fff"};
    bottom: 6px;
    left: 6px;
    height: 10px;
    width: 6px;
  }
`,kB=aB("div")`
  position: absolute;
`,OB=aB("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,NB=iB`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,IB=aB("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${NB} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,TB=e=>{let{toast:t}=e,{icon:n,type:o,iconTheme:i}=t;return void 0!==n?"string"==typeof n?r.createElement(IB,null,n):n:"blank"===o?null:r.createElement(OB,null,r.createElement(xB,{...i}),"loading"!==o&&r.createElement(kB,null,"error"===o?r.createElement(CB,{...i}):r.createElement(PB,{...i})))},AB=e=>`\n0% {transform: translate3d(0,${-200*e}%,0) scale(.6); opacity:.5;}\n100% {transform: translate3d(0,0,0) scale(1); opacity:1;}\n`,MB=e=>`\n0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}\n100% {transform: translate3d(0,${-150*e}%,-1px) scale(.6); opacity:0;}\n`,DB=aB("div")`
  display: flex;
  align-items: center;
  background: #fff;
  color: #363636;
  line-height: 1.3;
  will-change: transform;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1), 0 3px 3px rgba(0, 0, 0, 0.05);
  max-width: 350px;
  pointer-events: auto;
  padding: 8px 10px;
  border-radius: 8px;
`,RB=aB("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`;r.memo((e=>{let{toast:t,position:n,style:o,children:i}=e,a=t.height?((e,t)=>{let n=e.includes("top")?1:-1,[r,o]=cB()?["0%{opacity:0;} 100%{opacity:1;}","0%{opacity:1;} 100%{opacity:0;}"]:[AB(n),MB(n)];return{animation:t?`${iB(r)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${iB(o)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}})(t.position||n||"top-center",t.visible):{opacity:0},l=r.createElement(TB,{toast:t}),s=r.createElement(RB,{...t.ariaProps},lB(t.message,t));return r.createElement(DB,{className:t.className,style:{...a,...o,...t.style}},"function"==typeof i?i({icon:l,message:s}):r.createElement(r.Fragment,null,l,s))}));!function(e,t,n,r){Xz.p=t,nB=e,rB=n,oB=r}(r.createElement);tB`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`;var $B=vB;const{Option:LB}=RM,FB=()=>{const[e,t]=(0,r.useState)(["Not Processed","Processing","Shipped","Delivered","Cancelled"]),[n,o]=(0,r.useState)([]),[i]=ar(),a=async()=>{try{const{data:e}=await nr.get("/api/v1/auth/orders/all");o((null===e||void 0===e?void 0:e.orders)||[])}catch(e){console.error("Error fetching orders:",e)}};(0,r.useEffect)((()=>{null!==i&&void 0!==i&&i.token&&a()}),[null===i||void 0===i?void 0:i.token]);const l=e=>{switch(e){case"Not Processed":default:return"secondary";case"Processing":return"info";case"Shipped":return"primary";case"Delivered":return"success";case"Cancelled":return"danger"}},s=[{title:"Order #",dataIndex:"_id",key:"_id",render:(e,t,n)=>n+1},{title:"Status",dataIndex:"status",key:"status",render:(t,n)=>(0,rr.jsxs)("div",{children:[(0,rr.jsx)(ex,{count:t,style:{backgroundColor:"secondary"===l(t)?"#d6d6d6":"info"===l(t)?"#17a2b8":"primary"===l(t)?"#007bff":"success"===l(t)?"#28a745":"#dc3545",color:"#fff"}}),(0,rr.jsx)(RM,{variant:!1,defaultValue:t,onChange:e=>(async(e,t)=>{try{await nr.put(`/api/v1/auth/order-status/${e}`,{status:t}),$B.success("Order status updated successfully"),a()}catch(n){console.error("Error updating order status:",n),$B.error("Failed to update order status")}})(n._id,e),style:{marginLeft:8},children:e.map(((e,t)=>(0,rr.jsx)(LB,{value:e,children:e},t)))})]})},{title:"Buyer",dataIndex:"buyer",key:"buyer",render:e=>(null===e||void 0===e?void 0:e.name)||"N/A"},{title:"Date",dataIndex:"createdAt",key:"createdAt",render:e=>dF()(e).fromNow()},{title:"Payment",dataIndex:"payment",key:"payment",render:e=>(0,rr.jsx)(ex,{count:null!==e&&void 0!==e&&e.success?"Success":"Failed",style:{backgroundColor:null!==e&&void 0!==e&&e.success?"green":"red",color:"#fff"}})},{title:"Quantity",dataIndex:"products",key:"products",render:e=>(null===e||void 0===e?void 0:e.length)||0}];return(0,rr.jsx)(pS,{title:"All Orders Data",children:(0,rr.jsx)("div",{className:"container-fluid m-3 p-3",children:(0,rr.jsxs)("div",{className:"row",children:[(0,rr.jsx)("div",{className:"col-md-3",children:(0,rr.jsx)(LO,{})}),(0,rr.jsxs)("div",{className:"col-md-9",children:[(0,rr.jsx)("h1",{className:"text-center",children:"All Orders"}),(0,rr.jsx)(F$,{dataSource:n,columns:s,rowKey:"_id",expandable:{expandedRowRender:e=>(0,rr.jsx)("div",{className:"container",children:e.products.map((e=>(0,rr.jsxs)("div",{className:"row mb-2 p-2 card flex-row",style:{border:"1px solid #ddd",borderRadius:"5px"},children:[(0,rr.jsx)("div",{className:"col-md-3",children:(0,rr.jsx)("img",{src:`/api/v1/product/product-photo/${e._id}`,className:"card-img-top",alt:e.name,style:{width:"80px",height:"80px",objectFit:"cover"}})}),(0,rr.jsxs)("div",{className:"col-md-9 d-flex flex-column justify-content-center",children:[(0,rr.jsx)("h5",{style:{margin:"0 0 5px 0"},children:e.name}),(0,rr.jsxs)("p",{style:{margin:0},children:[(0,rr.jsx)("strong",{children:"Price:"})," $",e.price.toFixed(2)]})]})]},e._id)))})}})]})]})})})};const jB=function(){const[e,t]=(0,r.useState)([]);return(0,r.useEffect)((()=>{(async()=>{try{const{data:e}=await nr.get("/api/v1/auth/users/all");console.log("Fetched users:",e.users),t(e.users)}catch(e){console.log(e),Mr.error("Something Went Wrong")}})()}),[]),(0,rr.jsx)(pS,{title:"Dashboard - User List",children:(0,rr.jsx)("div",{className:"container-fluid m-3 p-3",children:(0,rr.jsxs)("div",{className:"row",children:[(0,rr.jsx)("div",{className:"col-md-3",children:(0,rr.jsx)(LO,{})}),(0,rr.jsxs)("div",{className:"col-md-9",children:[(0,rr.jsx)("h1",{className:"text-center",children:"All Users List"}),(0,rr.jsx)(F$,{columns:[{title:"#",key:"index",render:(e,t,n)=>n+1,width:60},{title:"Name",dataIndex:"name",key:"name"},{title:"Email",dataIndex:"email",key:"email"},{title:"Phone",dataIndex:"phone",key:"phone"},{title:"Address",dataIndex:"address",key:"address"}],dataSource:e,pagination:{pageSize:5},rowKey:"_id"})]})]})})})};const zB=function(){return(0,rr.jsx)(rr.Fragment,{children:(0,rr.jsxs)(ye,{children:[(0,rr.jsx)(ge,{path:"/",element:(0,rr.jsx)(YP,{})}),(0,rr.jsx)(ge,{path:"/product/:slug",element:(0,rr.jsx)(Iz,{})}),(0,rr.jsx)(ge,{path:"/categories",element:(0,rr.jsx)(Dz,{})}),(0,rr.jsx)(ge,{path:"/cart",element:(0,rr.jsx)(Uz,{})}),(0,rr.jsx)(ge,{path:"/category/:slug",element:(0,rr.jsx)(Lz,{})}),(0,rr.jsx)(ge,{path:"/search",element:(0,rr.jsx)(gF,{})}),(0,rr.jsxs)(ge,{path:"/dashboard",element:(0,rr.jsx)(DO,{}),children:[(0,rr.jsx)(ge,{path:"user",element:(0,rr.jsx)(AO,{})}),(0,rr.jsx)(ge,{path:"user/orders",element:(0,rr.jsx)(uF,{})}),(0,rr.jsx)(ge,{path:"user/profile",element:(0,rr.jsx)(pF,{})})]}),(0,rr.jsxs)(ge,{path:"/dashboard",element:(0,rr.jsx)($O,{}),children:[(0,rr.jsx)(ge,{path:"admin",element:(0,rr.jsx)(FO,{})}),(0,rr.jsx)(ge,{path:"admin/create-category",element:(0,rr.jsx)(aF,{})}),(0,rr.jsx)(ge,{path:"admin/create-product",element:(0,rr.jsx)(sF,{})}),(0,rr.jsx)(ge,{path:"admin/product/:slug",element:(0,rr.jsx)(hF,{})}),(0,rr.jsx)(ge,{path:"admin/products",element:(0,rr.jsx)(fF,{})}),(0,rr.jsx)(ge,{path:"admin/users",element:(0,rr.jsx)(jB,{})}),(0,rr.jsx)(ge,{path:"admin/orders",element:(0,rr.jsx)(FB,{})})]}),(0,rr.jsx)(ge,{path:"/register",element:(0,rr.jsx)(EO,{})}),(0,rr.jsx)(ge,{path:"/forgot-password",element:(0,rr.jsx)(RO,{})}),(0,rr.jsx)(ge,{path:"/login",element:(0,rr.jsx)(CO,{})}),(0,rr.jsx)(ge,{path:"/about",element:(0,rr.jsx)(qP,{})}),(0,rr.jsx)(ge,{path:"/contact",element:(0,rr.jsx)(ck,{})}),(0,rr.jsx)(ge,{path:"/policy",element:(0,rr.jsx)(dk,{})}),(0,rr.jsx)(ge,{path:"*",element:(0,rr.jsx)(uk,{})})]})})},BB=e=>{e&&e instanceof Function&&n.e(453).then(n.bind(n,453)).then((t=>{let{getCLS:n,getFID:r,getFCP:o,getLCP:i,getTTFB:a}=t;n(e),r(e),o(e),i(e),a(e)}))};i.createRoot(document.getElementById("root")).render((0,rr.jsx)(ir,{children:(0,rr.jsx)(Hr,{children:(0,rr.jsx)(vg,{children:(0,rr.jsx)(Oe,{children:(0,rr.jsx)(zB,{})})})})})),BB()})()})();
//# sourceMappingURL=main.c05cb02b.js.map