(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{j0Zy:function(e,r,t){"use strict";t.r(r),t.d(r,"_frontmatter",(function(){return X})),t.d(r,"default",(function(){return Z}));t("1c7q"),t("abGl"),t("gZHo"),t("Fdmb"),t("Ir+3"),t("2mQt");var a=t("lXvq"),n=t.n(a);t("wDqy"),t("yvkl");function c(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}function i(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);r&&(a=a.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,a)}return t}function s(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?i(Object(t),!0).forEach((function(r){c(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):i(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}function o(e,r){if(null==e)return{};var t,a,n=function(e,r){if(null==e)return{};var t,a,n={},c=Object.keys(e);for(a=0;a<c.length;a++)t=c[a],r.indexOf(t)>=0||(n[t]=e[t]);return n}(e,r);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(e);for(a=0;a<c.length;a++)t=c[a],r.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(n[t]=e[t])}return n}var l=n.a.createContext({}),u=function(e){var r=n.a.useContext(l),t=r;return e&&(t="function"==typeof e?e(r):s(s({},r),e)),t},f={inlineCode:"code",wrapper:function(e){var r=e.children;return n.a.createElement(n.a.Fragment,{},r)}},d=n.a.forwardRef((function(e,r){var t=e.components,a=e.mdxType,c=e.originalType,i=e.parentName,l=o(e,["components","mdxType","originalType","parentName"]),d=u(t),p=a,h=d["".concat(i,".").concat(p)]||d[p]||f[p]||c;return t?n.a.createElement(h,s(s({ref:r},l),{},{components:t})):n.a.createElement(h,s({ref:r},l))}));function p(e,r){var t=arguments,a=r&&r.mdxType;if("string"==typeof e||a){var c=t.length,i=new Array(c);i[0]=d;var s={};for(var o in r)hasOwnProperty.call(r,o)&&(s[o]=r[o]);s.originalType=e,s.mdxType="string"==typeof e?e:a,i[1]=s;for(var l=2;l<c;l++)i[l]=t[l];return n.a.createElement.apply(null,i)}return n.a.createElement.apply(null,t)}d.displayName="MDXCreateElement";var h=t("TjRS"),b=(t("nPhU"),t("jr56"),t("Qvie"),t("42WU")),m=t.n(b);t("8sWk"),t("kr69");var g=function(){function e(e){this.isSpeedy=void 0===e.speedy||e.speedy,this.tags=[],this.ctr=0,this.nonce=e.nonce,this.key=e.key,this.container=e.container,this.before=null}var r=e.prototype;return r.insert=function(e){if(this.ctr%(this.isSpeedy?65e3:1)==0){var r,t=function(e){var r=document.createElement("style");return r.setAttribute("data-emotion",e.key),void 0!==e.nonce&&r.setAttribute("nonce",e.nonce),r.appendChild(document.createTextNode("")),r}(this);r=0===this.tags.length?this.before:this.tags[this.tags.length-1].nextSibling,this.container.insertBefore(t,r),this.tags.push(t)}var a=this.tags[this.tags.length-1];if(this.isSpeedy){var n=function(e){if(e.sheet)return e.sheet;for(var r=0;r<document.styleSheets.length;r++)if(document.styleSheets[r].ownerNode===e)return document.styleSheets[r]}(a);try{var c=105===e.charCodeAt(1)&&64===e.charCodeAt(0);n.insertRule(e,c?0:n.cssRules.length)}catch(i){0}}else a.appendChild(document.createTextNode(e));this.ctr++},r.flush=function(){this.tags.forEach((function(e){return e.parentNode.removeChild(e)})),this.tags=[],this.ctr=0},e}();var v=function(e){function r(e,r,a){var n=r.trim().split(h);r=n;var c=n.length,i=e.length;switch(i){case 0:case 1:var s=0;for(e=0===i?"":e[0]+" ";s<c;++s)r[s]=t(e,r[s],a).trim();break;default:var o=s=0;for(r=[];s<c;++s)for(var l=0;l<i;++l)r[o++]=t(e[l]+" ",n[s],a).trim()}return r}function t(e,r,t){var a=r.charCodeAt(0);switch(33>a&&(a=(r=r.trim()).charCodeAt(0)),a){case 38:return r.replace(b,"$1"+e.trim());case 58:return e.trim()+r.replace(b,"$1"+e.trim());default:if(0<1*t&&0<r.indexOf("\f"))return r.replace(b,(58===e.charCodeAt(0)?"":"$1")+e.trim())}return e+r}function a(e,r,t,c){var i=e+";",s=2*r+3*t+4*c;if(944===s){e=i.indexOf(":",9)+1;var o=i.substring(e,i.length-1).trim();return o=i.substring(0,e).trim()+o+";",1===N||2===N&&n(o,1)?"-webkit-"+o+o:o}if(0===N||2===N&&!n(i,1))return i;switch(s){case 1015:return 97===i.charCodeAt(10)?"-webkit-"+i+i:i;case 951:return 116===i.charCodeAt(3)?"-webkit-"+i+i:i;case 963:return 110===i.charCodeAt(5)?"-webkit-"+i+i:i;case 1009:if(100!==i.charCodeAt(4))break;case 969:case 942:return"-webkit-"+i+i;case 978:return"-webkit-"+i+"-moz-"+i+i;case 1019:case 983:return"-webkit-"+i+"-moz-"+i+"-ms-"+i+i;case 883:if(45===i.charCodeAt(8))return"-webkit-"+i+i;if(0<i.indexOf("image-set(",11))return i.replace(x,"$1-webkit-$2")+i;break;case 932:if(45===i.charCodeAt(4))switch(i.charCodeAt(5)){case 103:return"-webkit-box-"+i.replace("-grow","")+"-webkit-"+i+"-ms-"+i.replace("grow","positive")+i;case 115:return"-webkit-"+i+"-ms-"+i.replace("shrink","negative")+i;case 98:return"-webkit-"+i+"-ms-"+i.replace("basis","preferred-size")+i}return"-webkit-"+i+"-ms-"+i+i;case 964:return"-webkit-"+i+"-ms-flex-"+i+i;case 1023:if(99!==i.charCodeAt(8))break;return"-webkit-box-pack"+(o=i.substring(i.indexOf(":",15)).replace("flex-","").replace("space-between","justify"))+"-webkit-"+i+"-ms-flex-pack"+o+i;case 1005:return d.test(i)?i.replace(f,":-webkit-")+i.replace(f,":-moz-")+i:i;case 1e3:switch(r=(o=i.substring(13).trim()).indexOf("-")+1,o.charCodeAt(0)+o.charCodeAt(r)){case 226:o=i.replace(y,"tb");break;case 232:o=i.replace(y,"tb-rl");break;case 220:o=i.replace(y,"lr");break;default:return i}return"-webkit-"+i+"-ms-"+o+i;case 1017:if(-1===i.indexOf("sticky",9))break;case 975:switch(r=(i=e).length-10,s=(o=(33===i.charCodeAt(r)?i.substring(0,r):i).substring(e.indexOf(":",7)+1).trim()).charCodeAt(0)+(0|o.charCodeAt(7))){case 203:if(111>o.charCodeAt(8))break;case 115:i=i.replace(o,"-webkit-"+o)+";"+i;break;case 207:case 102:i=i.replace(o,"-webkit-"+(102<s?"inline-":"")+"box")+";"+i.replace(o,"-webkit-"+o)+";"+i.replace(o,"-ms-"+o+"box")+";"+i}return i+";";case 938:if(45===i.charCodeAt(5))switch(i.charCodeAt(6)){case 105:return o=i.replace("-items",""),"-webkit-"+i+"-webkit-box-"+o+"-ms-flex-"+o+i;case 115:return"-webkit-"+i+"-ms-flex-item-"+i.replace(C,"")+i;default:return"-webkit-"+i+"-ms-flex-line-pack"+i.replace("align-content","").replace(C,"")+i}break;case 973:case 989:if(45!==i.charCodeAt(3)||122===i.charCodeAt(4))break;case 931:case 953:if(!0===A.test(e))return 115===(o=e.substring(e.indexOf(":")+1)).charCodeAt(0)?a(e.replace("stretch","fill-available"),r,t,c).replace(":fill-available",":stretch"):i.replace(o,"-webkit-"+o)+i.replace(o,"-moz-"+o.replace("fill-",""))+i;break;case 962:if(i="-webkit-"+i+(102===i.charCodeAt(5)?"-ms-"+i:"")+i,211===t+c&&105===i.charCodeAt(13)&&0<i.indexOf("transform",10))return i.substring(0,i.indexOf(";",27)+1).replace(p,"$1-webkit-$2")+i}return i}function n(e,r){var t=e.indexOf(1===r?":":"{"),a=e.substring(0,3!==r?t:10);return t=e.substring(t+1,e.length-1),$(2!==r?a:a.replace(O,"$1"),t,r)}function c(e,r){var t=a(r,r.charCodeAt(0),r.charCodeAt(1),r.charCodeAt(2));return t!==r+";"?t.replace(k," or ($1)").substring(4):"("+r+")"}function i(e,r,t,a,n,c,i,s,l,u){for(var f,d=0,p=r;d<_;++d)switch(f=z[d].call(o,e,p,t,a,n,c,i,s,l,u)){case void 0:case!1:case!0:case null:break;default:p=f}if(p!==r)return p}function s(e){return void 0!==(e=e.prefix)&&($=null,e?"function"!=typeof e?N=1:(N=2,$=e):N=0),s}function o(e,t){var s=e;if(33>s.charCodeAt(0)&&(s=s.trim()),s=[s],0<_){var o=i(-1,t,s,s,E,j,0,0,0,0);void 0!==o&&"string"==typeof o&&(t=o)}var f=function e(t,s,o,f,d){for(var p,h,b,y,k,C=0,O=0,A=0,x=0,z=0,$=0,R=b=p=0,T=0,I=0,M=0,G=0,q=o.length,W=q-1,F="",X="",H="",L="";T<q;){if(h=o.charCodeAt(T),T===W&&0!==O+x+A+C&&(0!==O&&(h=47===O?10:47),x=A=C=0,q++,W++),0===O+x+A+C){if(T===W&&(0<I&&(F=F.replace(u,"")),0<F.trim().length)){switch(h){case 32:case 9:case 59:case 13:case 10:break;default:F+=o.charAt(T)}h=59}switch(h){case 123:for(p=(F=F.trim()).charCodeAt(0),b=1,G=++T;T<q;){switch(h=o.charCodeAt(T)){case 123:b++;break;case 125:b--;break;case 47:switch(h=o.charCodeAt(T+1)){case 42:case 47:e:{for(R=T+1;R<W;++R)switch(o.charCodeAt(R)){case 47:if(42===h&&42===o.charCodeAt(R-1)&&T+2!==R){T=R+1;break e}break;case 10:if(47===h){T=R+1;break e}}T=R}}break;case 91:h++;case 40:h++;case 34:case 39:for(;T++<W&&o.charCodeAt(T)!==h;);}if(0===b)break;T++}switch(b=o.substring(G,T),0===p&&(p=(F=F.replace(l,"").trim()).charCodeAt(0)),p){case 64:switch(0<I&&(F=F.replace(u,"")),h=F.charCodeAt(1)){case 100:case 109:case 115:case 45:I=s;break;default:I=P}if(G=(b=e(s,I,b,h,d+1)).length,0<_&&(k=i(3,b,I=r(P,F,M),s,E,j,G,h,d,f),F=I.join(""),void 0!==k&&0===(G=(b=k.trim()).length)&&(h=0,b="")),0<G)switch(h){case 115:F=F.replace(w,c);case 100:case 109:case 45:b=F+"{"+b+"}";break;case 107:b=(F=F.replace(m,"$1 $2"))+"{"+b+"}",b=1===N||2===N&&n("@"+b,3)?"@-webkit-"+b+"@"+b:"@"+b;break;default:b=F+b,112===f&&(X+=b,b="")}else b="";break;default:b=e(s,r(s,F,M),b,f,d+1)}H+=b,b=M=I=R=p=0,F="",h=o.charCodeAt(++T);break;case 125:case 59:if(1<(G=(F=(0<I?F.replace(u,""):F).trim()).length))switch(0===R&&(p=F.charCodeAt(0),45===p||96<p&&123>p)&&(G=(F=F.replace(" ",":")).length),0<_&&void 0!==(k=i(1,F,s,t,E,j,X.length,f,d,f))&&0===(G=(F=k.trim()).length)&&(F="\0\0"),p=F.charCodeAt(0),h=F.charCodeAt(1),p){case 0:break;case 64:if(105===h||99===h){L+=F+o.charAt(T);break}default:58!==F.charCodeAt(G-1)&&(X+=a(F,p,h,F.charCodeAt(2)))}M=I=R=p=0,F="",h=o.charCodeAt(++T)}}switch(h){case 13:case 10:47===O?O=0:0===1+p&&107!==f&&0<F.length&&(I=1,F+="\0"),0<_*D&&i(0,F,s,t,E,j,X.length,f,d,f),j=1,E++;break;case 59:case 125:if(0===O+x+A+C){j++;break}default:switch(j++,y=o.charAt(T),h){case 9:case 32:if(0===x+C+O)switch(z){case 44:case 58:case 9:case 32:y="";break;default:32!==h&&(y=" ")}break;case 0:y="\\0";break;case 12:y="\\f";break;case 11:y="\\v";break;case 38:0===x+O+C&&(I=M=1,y="\f"+y);break;case 108:if(0===x+O+C+S&&0<R)switch(T-R){case 2:112===z&&58===o.charCodeAt(T-3)&&(S=z);case 8:111===$&&(S=$)}break;case 58:0===x+O+C&&(R=T);break;case 44:0===O+A+x+C&&(I=1,y+="\r");break;case 34:case 39:0===O&&(x=x===h?0:0===x?h:x);break;case 91:0===x+O+A&&C++;break;case 93:0===x+O+A&&C--;break;case 41:0===x+O+C&&A--;break;case 40:if(0===x+O+C){if(0===p)switch(2*z+3*$){case 533:break;default:p=1}A++}break;case 64:0===O+A+x+C+R+b&&(b=1);break;case 42:case 47:if(!(0<x+C+A))switch(O){case 0:switch(2*h+3*o.charCodeAt(T+1)){case 235:O=47;break;case 220:G=T,O=42}break;case 42:47===h&&42===z&&G+2!==T&&(33===o.charCodeAt(G+2)&&(X+=o.substring(G,T+1)),y="",O=0)}}0===O&&(F+=y)}$=z,z=h,T++}if(0<(G=X.length)){if(I=s,0<_&&(void 0!==(k=i(2,X,I,t,E,j,G,f,d,f))&&0===(X=k).length))return L+X+H;if(X=I.join(",")+"{"+X+"}",0!=N*S){switch(2!==N||n(X,2)||(S=0),S){case 111:X=X.replace(v,":-moz-$1")+X;break;case 112:X=X.replace(g,"::-webkit-input-$1")+X.replace(g,"::-moz-$1")+X.replace(g,":-ms-input-$1")+X}S=0}}return L+X+H}(P,s,t,0,0);return 0<_&&(void 0!==(o=i(-2,f,s,s,E,j,f.length,0,0,0))&&(f=o)),"",S=0,j=E=1,f}var l=/^\0+/g,u=/[\0\r\f]/g,f=/: */g,d=/zoo|gra/,p=/([,: ])(transform)/g,h=/,\r+?/g,b=/([\t\r\n ])*\f?&/g,m=/@(k\w+)\s*(\S*)\s*/,g=/::(place)/g,v=/:(read-only)/g,y=/[svh]\w+-[tblr]{2}/,w=/\(\s*(.*)\s*\)/g,k=/([\s\S]*?);/g,C=/-self|flex-/g,O=/[^]*?(:[rp][el]a[\w-]+)[^]*/,A=/stretch|:\s*\w+\-(?:conte|avail)/,x=/([^-])(image-set\()/,j=1,E=1,S=0,N=1,P=[],z=[],_=0,$=null,D=0;return o.use=function e(r){switch(r){case void 0:case null:_=z.length=0;break;default:if("function"==typeof r)z[_++]=r;else if("object"==typeof r)for(var t=0,a=r.length;t<a;++t)e(r[t]);else D=0|!!r}return e},o.set=s,void 0!==e&&s(e),o};t("VlJN"),t("IC7P");function y(e){e&&w.current.insert(e+"}")}var w={current:null},k=function(e,r,t,a,n,c,i,s,o,l){switch(e){case 1:switch(r.charCodeAt(0)){case 64:return w.current.insert(r+";"),"";case 108:if(98===r.charCodeAt(2))return""}break;case 2:if(0===s)return r+"/*|*/";break;case 3:switch(s){case 102:case 112:return w.current.insert(t[0]+r),"";default:return r+(0===l?"/*|*/":"")}case-2:r.split("/*|*/}").forEach(y)}},C=function(e){void 0===e&&(e={});var r,t=e.key||"css";void 0!==e.prefix&&(r={prefix:e.prefix});var a=new v(r);var n,c={};n=e.container||document.head;var i,s=document.querySelectorAll("style[data-emotion-"+t+"]");Array.prototype.forEach.call(s,(function(e){e.getAttribute("data-emotion-"+t).split(" ").forEach((function(e){c[e]=!0})),e.parentNode!==n&&n.appendChild(e)})),a.use(e.stylisPlugins)(k),i=function(e,r,t,n){var c=r.name;w.current=t,a(e,r.styles),n&&(o.inserted[c]=!0)};var o={key:t,sheet:new g({key:t,container:n,nonce:e.nonce,speedy:e.speedy}),nonce:e.nonce,inserted:c,registered:{},insert:i};return o};function O(e,r,t){var a="";return t.split(" ").forEach((function(t){void 0!==e[t]?r.push(e[t]):a+=t+" "})),a}var A=function(e,r,t){var a=e.key+"-"+r.name;if(!1===t&&void 0===e.registered[a]&&(e.registered[a]=r.styles),void 0===e.inserted[r.name]){var n=r;do{e.insert("."+a,n,e.sheet,!0);n=n.next}while(void 0!==n)}};t("Eb4t");var x=function(e){for(var r,t=0,a=0,n=e.length;n>=4;++a,n-=4)r=1540483477*(65535&(r=255&e.charCodeAt(a)|(255&e.charCodeAt(++a))<<8|(255&e.charCodeAt(++a))<<16|(255&e.charCodeAt(++a))<<24))+(59797*(r>>>16)<<16),t=1540483477*(65535&(r^=r>>>24))+(59797*(r>>>16)<<16)^1540483477*(65535&t)+(59797*(t>>>16)<<16);switch(n){case 3:t^=(255&e.charCodeAt(a+2))<<16;case 2:t^=(255&e.charCodeAt(a+1))<<8;case 1:t=1540483477*(65535&(t^=255&e.charCodeAt(a)))+(59797*(t>>>16)<<16)}return(((t=1540483477*(65535&(t^=t>>>13))+(59797*(t>>>16)<<16))^t>>>15)>>>0).toString(36)},j={animationIterationCount:1,borderImageOutset:1,borderImageSlice:1,borderImageWidth:1,boxFlex:1,boxFlexGroup:1,boxOrdinalGroup:1,columnCount:1,columns:1,flex:1,flexGrow:1,flexPositive:1,flexShrink:1,flexNegative:1,flexOrder:1,gridRow:1,gridRowEnd:1,gridRowSpan:1,gridRowStart:1,gridColumn:1,gridColumnEnd:1,gridColumnSpan:1,gridColumnStart:1,msGridRow:1,msGridRowSpan:1,msGridColumn:1,msGridColumnSpan:1,fontWeight:1,lineHeight:1,opacity:1,order:1,orphans:1,tabSize:1,widows:1,zIndex:1,zoom:1,WebkitLineClamp:1,fillOpacity:1,floodOpacity:1,stopOpacity:1,strokeDasharray:1,strokeDashoffset:1,strokeMiterlimit:1,strokeOpacity:1,strokeWidth:1};var E=/[A-Z]|^ms/g,S=/_EMO_([^_]+?)_([^]*?)_EMO_/g,N=function(e){return 45===e.charCodeAt(1)},P=function(e){return null!=e&&"boolean"!=typeof e},z=function(e){var r={};return function(t){return void 0===r[t]&&(r[t]=e(t)),r[t]}}((function(e){return N(e)?e:e.replace(E,"-$&").toLowerCase()})),_=function(e,r){switch(e){case"animation":case"animationName":if("string"==typeof r)return r.replace(S,(function(e,r,t){return D={name:r,styles:t,next:D},r}))}return 1===j[e]||N(e)||"number"!=typeof r||0===r?r:r+"px"};function $(e,r,t,a){if(null==t)return"";if(void 0!==t.__emotion_styles)return t;switch(typeof t){case"boolean":return"";case"object":if(1===t.anim)return D={name:t.name,styles:t.styles,next:D},t.name;if(void 0!==t.styles){var n=t.next;if(void 0!==n)for(;void 0!==n;)D={name:n.name,styles:n.styles,next:D},n=n.next;return t.styles+";"}return function(e,r,t){var a="";if(Array.isArray(t))for(var n=0;n<t.length;n++)a+=$(e,r,t[n],!1);else for(var c in t){var i=t[c];if("object"!=typeof i)null!=r&&void 0!==r[i]?a+=c+"{"+r[i]+"}":P(i)&&(a+=z(c)+":"+_(c,i)+";");else if(!Array.isArray(i)||"string"!=typeof i[0]||null!=r&&void 0!==r[i[0]]){var s=$(e,r,i,!1);switch(c){case"animation":case"animationName":a+=z(c)+":"+s+";";break;default:a+=c+"{"+s+"}"}}else for(var o=0;o<i.length;o++)P(i[o])&&(a+=z(c)+":"+_(c,i[o])+";")}return a}(e,r,t);case"function":if(void 0!==e){var c=D,i=t(e);return D=c,$(e,r,i,a)}break;case"string":}if(null==r)return t;var s=r[t];return void 0===s||a?t:s}var D,R=/label:\s*([^\s;\n{]+)\s*;/g;var T=function(e,r,t){if(1===e.length&&"object"==typeof e[0]&&null!==e[0]&&void 0!==e[0].styles)return e[0];var a=!0,n="";D=void 0;var c=e[0];null==c||void 0===c.raw?(a=!1,n+=$(t,r,c,!1)):n+=c[0];for(var i=1;i<e.length;i++)n+=$(t,r,e[i],46===n.charCodeAt(n.length-1)),a&&(n+=c[i]);R.lastIndex=0;for(var s,o="";null!==(s=R.exec(n));)o+="-"+s[1];return{name:x(n)+o,styles:n,next:D}};var I=Object(a.createContext)("undefined"!=typeof HTMLElement?C():null),M=Object(a.createContext)({}),G=(I.Provider,function(e){return Object(a.forwardRef)((function(r,t){return Object(a.createElement)(I.Consumer,null,(function(a){return e(r,a,t)}))}))});Object.prototype.hasOwnProperty;a.Component;var q=function e(r){for(var t=r.length,a=0,n="";a<t;a++){var c=r[a];if(null!=c){var i=void 0;switch(typeof c){case"boolean":break;case"object":if(Array.isArray(c))i=e(c);else for(var s in i="",c)c[s]&&s&&(i&&(i+=" "),i+=s);break;default:i=c}i&&(n&&(n+=" "),n+=i)}}return n};function W(e,r,t){var a=[],n=O(e,a,t);return a.length<2?t:n+r(a)}G((function(e,r){return Object(a.createElement)(M.Consumer,null,(function(t){var a=function(){for(var e=arguments.length,t=new Array(e),a=0;a<e;a++)t[a]=arguments[a];var n=T(t,r.registered);return A(r,n,!1),r.key+"-"+n.name},n={css:a,cx:function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return W(r.registered,a,q(t))},theme:t},c=e.children(n);return!0,c}))}));function F(){return(F=Object.assign||function(e){for(var r=1;r<arguments.length;r++){var t=arguments[r];for(var a in t)Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a])}return e}).apply(this,arguments)}var X={};void 0!==X&&X&&X===Object(X)&&Object.isExtensible(X)&&!X.hasOwnProperty("__filemeta")&&Object.defineProperty(X,"__filemeta",{configurable:!0,value:{name:"_frontmatter",filename:"doc/README.md"}});var H={_frontmatter:X},L=h.a;function Z(e){var r=e.components,t=function(e,r){if(null==e)return{};var t,a,n={},c=Object.keys(e);for(a=0;a<c.length;a++)t=c[a],r.indexOf(t)>=0||(n[t]=e[t]);return n}(e,["components"]);return p(L,F({},H,t,{components:r,mdxType:"MDXLayout"}),p("h1",{id:"basic-docz-example"},"Basic Docz example"),p("h2",{id:"using-create-docz-app"},"Using ",p("inlineCode",{parentName:"h2"},"create-docz-app")),p("pre",null,p("code",F({parentName:"pre"},{className:"language-sh"}),"npx create-docz-app docz-app-basic\n# or\nyarn create docz-app docz-app-basic\n")),p("h2",{id:"download-manually"},"Download manually"),p("pre",null,p("code",F({parentName:"pre"},{className:"language-sh"}),"curl https://codeload.github.com/doczjs/docz/tar.gz/master | tar -xz --strip=2 docz-master/examples/basic\nmv basic docz-basic-example\ncd docz-basic-example\n")),p("h2",{id:"setup"},"Setup"),p("pre",null,p("code",F({parentName:"pre"},{className:"language-sh"}),"yarn # npm i\n")),p("h2",{id:"run"},"Run"),p("pre",null,p("code",F({parentName:"pre"},{className:"language-sh"}),"yarn dev # npm run dev\n")),p("h2",{id:"build"},"Build"),p("pre",null,p("code",F({parentName:"pre"},{className:"language-sh"}),"yarn build # npm run build\n")),p("h2",{id:"serve-built-app"},"Serve built app"),p("pre",null,p("code",F({parentName:"pre"},{className:"language-sh"}),"yarn serve # npm run serve\n")))}void 0!==Z&&Z&&Z===Object(Z)&&Object.isExtensible(Z)&&!Z.hasOwnProperty("__filemeta")&&Object.defineProperty(Z,"__filemeta",{configurable:!0,value:{name:"MDXContent",filename:"doc/README.md"}}),Z.isMDXComponent=!0},lm2h:function(e,r,t){"use strict";t("abGl"),t("gZHo"),t("Fdmb"),t("Ir+3"),t("kr69"),t("1c7q"),t("yvkl");var a=Object.getOwnPropertySymbols,n=Object.prototype.hasOwnProperty,c=Object.prototype.propertyIsEnumerable;function i(e){if(null==e)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(e)}e.exports=function(){try{if(!Object.assign)return!1;var e=new String("abc");if(e[5]="de","5"===Object.getOwnPropertyNames(e)[0])return!1;for(var r={},t=0;t<10;t++)r["_"+String.fromCharCode(t)]=t;if("0123456789"!==Object.getOwnPropertyNames(r).map((function(e){return r[e]})).join(""))return!1;var a={};return"abcdefghijklmnopqrst".split("").forEach((function(e){a[e]=e})),"abcdefghijklmnopqrst"===Object.keys(Object.assign({},a)).join("")}catch(n){return!1}}()?Object.assign:function(e,r){for(var t,s,o=i(e),l=1;l<arguments.length;l++){for(var u in t=Object(arguments[l]))n.call(t,u)&&(o[u]=t[u]);if(a){s=a(t);for(var f=0;f<s.length;f++)c.call(t,s[f])&&(o[s[f]]=t[s[f]])}}return o}}}]);
//# sourceMappingURL=component---doc-readme-md-ce4f8e8592b5469149dc.js.map