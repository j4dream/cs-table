(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{qG2a:function(e,t,n){"use strict";n.r(t),n.d(t,"_frontmatter",(function(){return c})),n.d(t,"default",(function(){return d}));n("1c7q"),n("abGl"),n("gZHo"),n("Fdmb"),n("Ir+3"),n("2mQt"),n("mXGw");var a=n("/FXl"),r=n("TjRS"),o=n("ZFoC"),l=n("urmJ");n("CpJs"),n("aD51");function i(){return(i=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e}).apply(this,arguments)}var c={};void 0!==c&&c&&c===Object(c)&&Object.isExtensible(c)&&!c.hasOwnProperty("__filemeta")&&Object.defineProperty(c,"__filemeta",{configurable:!0,value:{name:"_frontmatter",filename:"src/table/Table.mdx"}});var b={_frontmatter:c},s=r.a;function d(e){var t,n=e.components,d=function(e,t){if(null==e)return{};var n,a,r={},o=Object.keys(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,["components"]);return Object(a.b)(s,i({},b,d,{components:n,mdxType:"MDXLayout"}),Object(a.b)("h1",{id:"table"},"Table"),Object(a.b)("h3",{id:"table-props"},"Table Props"),Object(a.b)(o.d,{of:l.b,mdxType:"Props"}),Object(a.b)("h2",{id:"basic-usage"},"Basic usage"),Object(a.b)(o.c,{__position:1,__code:"() => {\n  const header = [\n    {\n      label: 'Email (Fixed)',\n      fixed: true,\n      prop: 'email',\n    },\n  ]\n  console.log('redo')\n  for (let i = 0; i < 10; i++) {\n    header.push({\n      label: `H ${i}`,\n      prop: `${i}`,\n    })\n  }\n  const data = []\n  for (let r = 0; r < 100000; r++) {\n    const row = {}\n    for (let c = 0; c < 10; c++) {\n      row[c] = `data ${r}:${c}`\n    }\n    row['email'] = `test_${r}@email.com`\n    data.push(row)\n  }\n  return (\n    <Table header={header} data={data} cellWidth={200} enableResize={true} />\n  )\n}",__scope:(t={props:d,DefaultLayout:r.a,Playground:o.c,Props:o.d,Table:l.b},t.DefaultLayout=r.a,t._frontmatter=c,t),mdxType:"Playground"},(function(){var e=[{label:"Email (Fixed)",fixed:!0,prop:"email"}];console.log("redo");for(var t=0;t<10;t++)e.push({label:"H "+t,prop:""+t});for(var n=[],r=0;r<1e5;r++){for(var o={},i=0;i<10;i++)o[i]="data "+r+":"+i;o.email="test_"+r+"@email.com",n.push(o)}return Object(a.b)(l.b,{header:e,data:n,cellWidth:200,enableResize:!0,mdxType:"Table"})})))}void 0!==d&&d&&d===Object(d)&&Object.isExtensible(d)&&!d.hasOwnProperty("__filemeta")&&Object.defineProperty(d,"__filemeta",{configurable:!0,value:{name:"MDXContent",filename:"src/table/Table.mdx"}}),d.isMDXComponent=!0}}]);
//# sourceMappingURL=component---src-table-table-mdx-0a92d743f70d46a0874b.js.map