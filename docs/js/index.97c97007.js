(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["index"],{"0519":function(e,t,n){var a,i,o;(function(n,r){i=[t],a=r,o="function"===typeof a?a.apply(t,i):a,void 0===o||(e.exports=o)})("undefined"!==typeof globalThis?globalThis:"undefined"!==typeof self&&self,(function(e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var t=[{title:"更新日志",path:"/update",icon:"el-icon-s-promotion"},{title:"project",path:"/router",icon:"iconfont icon-header"},{title:"组件",icon:"el-icon-s-grid",children:[{title:"头部组件",path:"/header",icon:"iconfont icon-header"},{title:"页面组件",path:"/view",icon:"iconfont icon-view",children:[{title:"MultiView",path:"/view/multi/:id",onOpen:function(e){console.log("tab-open:nav-data",e),"103"===e.route.params.id&&(e.title="lucky number")},onClose:function(e){console.log("tab-close:nav-data",e)},visible:!1},{title:"SingleView",path:"/view/single/:id",visible:!1}]},{title:"upload",path:"/upload",icon:"el-icon-picture-outline"}]},{title:"错误页面",icon:"el-icon-warning",children:[{title:"404",path:"/error/404"},{title:"403",path:"/error/403"}]}];e.default=t}))},"0a80":function(e,t,n){"use strict";var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("ea-view",{staticClass:"ea-document",attrs:{center:""}},[n("intro-md",[n("el-button",[e._v("默认按钮")])],1)],1)},i=[];n.d(t,"a",(function(){return a})),n.d(t,"b",(function(){return i}))},"2a99":function(e,t,n){},"31fe":function(e,t,n){"use strict";n.r(t);var a=n("fecc"),i=n.n(a);for(var o in a)"default"!==o&&function(e){n.d(t,e,(function(){return a[e]}))}(o);t["default"]=i.a},"335f":function(e,t,n){"use strict";var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("ea-admin",{scopedSlots:e._u([{key:"header",fn:function(){return[n("ea-header",{attrs:{collapse:e.headerCollapse,fullscreen:e.fullscreen,"nav-data":e.headerNavData,user:e.user},on:{"update:collapse":function(t){e.headerCollapse=t},command:e.handleCommand}})]},proxy:!0},{key:"side",fn:function(){return[e.logoVisible?n("ea-logo",{attrs:{name:"joker-blog","logo-type":"image"}}):e._e(),n("ea-nav-menu",{attrs:{router:"",data:e.navData},model:{value:e.active,callback:function(t){e.active=t},expression:"active"}})]},proxy:!0}])})},i=[];n.d(t,"a",(function(){return a})),n.d(t,"b",(function(){return i}))},"50ad":function(e,t,n){"use strict";n.r(t);var a=n("f2fa"),i=n.n(a);for(var o in a)"default"!==o&&function(e){n.d(t,e,(function(){return a[e]}))}(o);t["default"]=i.a},b7a4:function(e,t,n){"use strict";n.r(t);var a=function(){var e=this,t=e.$createElement;e._self._c;return e._m(0)},i=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"markdown"},[n("h1",[e._v("e-admin")]),n("p",[e._v("基于 "),n("a",{attrs:{href:"https://github.com/ElemeFE/element"}},[e._v("element")]),e._v(" 封装的即开即用渐进式中后台组件库"),n("br"),e._v("当前文档项目通过"),n("code",[e._v("e-admin")]),e._v("搭建")]),n("h4",[e._v("快速上手")]),n("p",[e._v("请参考 "),n("a",{attrs:{href:"#/install"}},[e._v("安装")])])])}],o=n("2877"),r={},u=Object(o["a"])(r,a,i,!1,null,null,null);t["default"]=u.exports},ba18:function(e,t,n){"use strict";n.r(t);var a=n("0a80"),i=n("50ad");for(var o in i)"default"!==o&&function(e){n.d(t,e,(function(){return i[e]}))}(o);var r=n("2877"),u=Object(r["a"])(i["default"],a["a"],a["b"],!1,null,null,null);t["default"]=u.exports},d504:function(e,t,n){"use strict";n.r(t);var a=n("335f"),i=n("31fe");for(var o in i)"default"!==o&&function(e){n.d(t,e,(function(){return i[e]}))}(o);n("f204");var r=n("2877"),u=Object(r["a"])(i["default"],a["a"],a["b"],!1,null,"c133ab50",null);t["default"]=u.exports},f204:function(e,t,n){"use strict";var a=n("2a99"),i=n.n(a);i.a},f2fa:function(e,t,n){var a,i,o;(function(r,u){i=[t,n("b7a4")],a=u,o="function"===typeof a?a.apply(t,i):a,void 0===o||(e.exports=o)})("undefined"!==typeof globalThis?globalThis:"undefined"!==typeof self&&self,(function(e,t){"use strict";var a=n("1bd5");Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,t=a(t);var i={name:"Intro",components:{introMd:t.default},props:{},watch:{},data:function(){return{}},computed:{},methods:{},created:function(){},mounted:function(){}};e.default=i}))},fecc:function(e,t,n){var a,i,o;(function(r,u){i=[t,n("0519"),n("4360")],a=u,o="function"===typeof a?a.apply(t,i):a,void 0===o||(e.exports=o)})("undefined"!==typeof globalThis?globalThis:"undefined"!==typeof self&&self,(function(e,t,a){"use strict";var i=n("1bd5");Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,t=i(t),a=i(a);var o={name:"Index",data:function(){return{user:a.default.user,collapse:!1,active:"",navData:t.default,headerCollapseActive:!0,fullscreen:!0,headerNavDataActive:!0,logoVisible:!0}},computed:{headerCollapse:{get:function(){return this.headerCollapseActive?this.$ea.config.collapse:"false"},set:function(e){this.$ea.config.collapse=e}},headerNavData:function(){return this.headerNavDataActive?t.default:[]}},methods:{handleCommand:function(e){switch(e){case"me":this.$message.warning("未实现");break;case"setting":this.$message.warning("未实现");break;case"logout":a.default.user={name:"",id:""},this.$message.success("已退出"),localStorage.setItem("document_user",JSON.stringify(a.default.user)),this.$router.push("/login");break}}},created:function(){},mounted:function(){}};e.default=o}))}}]);
//# sourceMappingURL=index.97c97007.js.map