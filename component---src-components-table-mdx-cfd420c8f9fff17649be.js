(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{wCm4:function(e,n,r){"use strict";r.r(n),r.d(n,"_frontmatter",(function(){return p})),r.d(n,"default",(function(){return b}));r("5hJT"),r("W1QL"),r("K/PF"),r("t91x"),r("75LO"),r("PJhk"),r("mXGw");var t=r("/FXl"),a=r("TjRS"),o=r("ZFoC"),i=r("wojR");r("aD51");function l(){return(l=Object.assign||function(e){for(var n=1;n<arguments.length;n++){var r=arguments[n];for(var t in r)Object.prototype.hasOwnProperty.call(r,t)&&(e[t]=r[t])}return e}).apply(this,arguments)}var p={};void 0!==p&&p&&p===Object(p)&&Object.isExtensible(p)&&!p.hasOwnProperty("__filemeta")&&Object.defineProperty(p,"__filemeta",{configurable:!0,value:{name:"_frontmatter",filename:"src/components/Table.mdx"}});var c={_frontmatter:p},d=a.a;function b(e){var n,r=e.components,b=function(e,n){if(null==e)return{};var r,t,a={},o=Object.keys(e);for(t=0;t<o.length;t++)r=o[t],n.indexOf(r)>=0||(a[r]=e[r]);return a}(e,["components"]);return Object(t.b)(d,l({},c,b,{components:r,mdxType:"MDXLayout"}),Object(t.b)("h1",{id:"table"},"Table"),Object(t.b)("h2",{id:"properties"},"Properties"),Object(t.b)("h2",{id:"basic-usage"},"Basic usage"),Object(t.b)(o.c,{__position:0,__code:"() => {\n  const header = [\n    {\n      label: 'Operation',\n      fixed: true,\n      prop: 'op',\n      width: 90,\n      renderHeader: (h, p) => <a href=\"#\">Operation</a>,\n      renderCell: () => <a href=\"#\">OP</a>,\n    },\n    {\n      label: 'Email (Fixed)',\n      fixed: true,\n      prop: 'email',\n    },\n  ]\n  for (let i = 0; i < 200; i++) {\n    header.push({\n      label: `H ${i}`,\n      prop: `${i}`,\n    })\n  }\n\n  const data = []\n  for (let r = 0; r < 10000; r++) {\n    const row = {}\n    for (let c = 0; c < 200; c++) {\n      row[c] = `data ${r}:${c}`\n    }\n    row['email'] = `test_${r}@email.com`\n    data.push(row)\n  }\n\n  return (\n    <Table\n      header={header}\n      data={data}\n      enableResize\n      // renderCell={(record, prop) => record[prop]}\n      // renderHeader={(header, prop) => header[prop]}\n    />\n  )\n}",__scope:(n={props:b,DefaultLayout:a.a,Playground:o.c,Props:o.d,Table:i.b},n.DefaultLayout=a.a,n._frontmatter=p,n),mdxType:"Playground"},(function(){for(var e=[{label:"Operation",fixed:!0,prop:"op",width:90,renderHeader:function(e,n){return Object(t.b)("a",{href:"#"},"Operation")},renderCell:function(){return Object(t.b)("a",{href:"#"},"OP")}},{label:"Email (Fixed)",fixed:!0,prop:"email"}],n=0;n<200;n++)e.push({label:"H "+n,prop:""+n});for(var r=[],a=0;a<1e4;a++){for(var o={},l=0;l<200;l++)o[l]="data "+a+":"+l;o.email="test_"+a+"@email.com",r.push(o)}return Object(t.b)(i.b,{header:e,data:r,enableResize:!0,mdxType:"Table"})})))}void 0!==b&&b&&b===Object(b)&&Object.isExtensible(b)&&!b.hasOwnProperty("__filemeta")&&Object.defineProperty(b,"__filemeta",{configurable:!0,value:{name:"MDXContent",filename:"src/components/Table.mdx"}}),b.isMDXComponent=!0}}]);
//# sourceMappingURL=component---src-components-table-mdx-cfd420c8f9fff17649be.js.map