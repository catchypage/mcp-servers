var wp=Object.create;var Sa=Object.defineProperty;var kp=Object.getOwnPropertyDescriptor;var Sp=Object.getOwnPropertyNames;var Np=Object.getPrototypeOf,Cp=Object.prototype.hasOwnProperty;var Ke=(e,n)=>()=>(n||e((n={exports:{}}).exports,n),n.exports);var _p=(e,n,t,r)=>{if(n&&typeof n=="object"||typeof n=="function")for(let l of Sp(n))!Cp.call(e,l)&&l!==t&&Sa(e,l,{get:()=>n[l],enumerable:!(r=kp(n,l))||r.enumerable});return e};var Z=(e,n,t)=>(t=e!=null?wp(Np(e)):{},_p(n||!e||!e.__esModule?Sa(t,"default",{value:e,enumerable:!0}):t,e));var Oa=Ke(L=>{"use strict";var Nt=Symbol.for("react.element"),Ep=Symbol.for("react.portal"),zp=Symbol.for("react.fragment"),Pp=Symbol.for("react.strict_mode"),Ip=Symbol.for("react.profiler"),Lp=Symbol.for("react.provider"),Mp=Symbol.for("react.context"),Tp=Symbol.for("react.forward_ref"),Rp=Symbol.for("react.suspense"),Op=Symbol.for("react.memo"),Dp=Symbol.for("react.lazy"),Na=Symbol.iterator;function jp(e){return e===null||typeof e!="object"?null:(e=Na&&e[Na]||e["@@iterator"],typeof e=="function"?e:null)}var Ea={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},za=Object.assign,Pa={};function Kn(e,n,t){this.props=e,this.context=n,this.refs=Pa,this.updater=t||Ea}Kn.prototype.isReactComponent={};Kn.prototype.setState=function(e,n){if(typeof e!="object"&&typeof e!="function"&&e!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,n,"setState")};Kn.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")};function Ia(){}Ia.prototype=Kn.prototype;function Zl(e,n,t){this.props=e,this.context=n,this.refs=Pa,this.updater=t||Ea}var bl=Zl.prototype=new Ia;bl.constructor=Zl;za(bl,Kn.prototype);bl.isPureReactComponent=!0;var Ca=Array.isArray,La=Object.prototype.hasOwnProperty,Jl={current:null},Ma={key:!0,ref:!0,__self:!0,__source:!0};function Ta(e,n,t){var r,l={},o=null,i=null;if(n!=null)for(r in n.ref!==void 0&&(i=n.ref),n.key!==void 0&&(o=""+n.key),n)La.call(n,r)&&!Ma.hasOwnProperty(r)&&(l[r]=n[r]);var a=arguments.length-2;if(a===1)l.children=t;else if(1<a){for(var s=Array(a),p=0;p<a;p++)s[p]=arguments[p+2];l.children=s}if(e&&e.defaultProps)for(r in a=e.defaultProps,a)l[r]===void 0&&(l[r]=a[r]);return{$$typeof:Nt,type:e,key:o,ref:i,props:l,_owner:Jl.current}}function Fp(e,n){return{$$typeof:Nt,type:e.type,key:n,ref:e.ref,props:e.props,_owner:e._owner}}function ql(e){return typeof e=="object"&&e!==null&&e.$$typeof===Nt}function Wp(e){var n={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(t){return n[t]})}var _a=/\/+/g;function Gl(e,n){return typeof e=="object"&&e!==null&&e.key!=null?Wp(""+e.key):n.toString(36)}function xr(e,n,t,r,l){var o=typeof e;(o==="undefined"||o==="boolean")&&(e=null);var i=!1;if(e===null)i=!0;else switch(o){case"string":case"number":i=!0;break;case"object":switch(e.$$typeof){case Nt:case Ep:i=!0}}if(i)return i=e,l=l(i),e=r===""?"."+Gl(i,0):r,Ca(l)?(t="",e!=null&&(t=e.replace(_a,"$&/")+"/"),xr(l,n,t,"",function(p){return p})):l!=null&&(ql(l)&&(l=Fp(l,t+(!l.key||i&&i.key===l.key?"":(""+l.key).replace(_a,"$&/")+"/")+e)),n.push(l)),1;if(i=0,r=r===""?".":r+":",Ca(e))for(var a=0;a<e.length;a++){o=e[a];var s=r+Gl(o,a);i+=xr(o,n,t,s,l)}else if(s=jp(e),typeof s=="function")for(e=s.call(e),a=0;!(o=e.next()).done;)o=o.value,s=r+Gl(o,a++),i+=xr(o,n,t,s,l);else if(o==="object")throw n=String(e),Error("Objects are not valid as a React child (found: "+(n==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":n)+"). If you meant to render a collection of children, use an array instead.");return i}function yr(e,n,t){if(e==null)return e;var r=[],l=0;return xr(e,r,"","",function(o){return n.call(t,o,l++)}),r}function Up(e){if(e._status===-1){var n=e._result;n=n(),n.then(function(t){(e._status===0||e._status===-1)&&(e._status=1,e._result=t)},function(t){(e._status===0||e._status===-1)&&(e._status=2,e._result=t)}),e._status===-1&&(e._status=0,e._result=n)}if(e._status===1)return e._result.default;throw e._result}var se={current:null},wr={transition:null},Bp={ReactCurrentDispatcher:se,ReactCurrentBatchConfig:wr,ReactCurrentOwner:Jl};function Ra(){throw Error("act(...) is not supported in production builds of React.")}L.Children={map:yr,forEach:function(e,n,t){yr(e,function(){n.apply(this,arguments)},t)},count:function(e){var n=0;return yr(e,function(){n++}),n},toArray:function(e){return yr(e,function(n){return n})||[]},only:function(e){if(!ql(e))throw Error("React.Children.only expected to receive a single React element child.");return e}};L.Component=Kn;L.Fragment=zp;L.Profiler=Ip;L.PureComponent=Zl;L.StrictMode=Pp;L.Suspense=Rp;L.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=Bp;L.act=Ra;L.cloneElement=function(e,n,t){if(e==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+e+".");var r=za({},e.props),l=e.key,o=e.ref,i=e._owner;if(n!=null){if(n.ref!==void 0&&(o=n.ref,i=Jl.current),n.key!==void 0&&(l=""+n.key),e.type&&e.type.defaultProps)var a=e.type.defaultProps;for(s in n)La.call(n,s)&&!Ma.hasOwnProperty(s)&&(r[s]=n[s]===void 0&&a!==void 0?a[s]:n[s])}var s=arguments.length-2;if(s===1)r.children=t;else if(1<s){a=Array(s);for(var p=0;p<s;p++)a[p]=arguments[p+2];r.children=a}return{$$typeof:Nt,type:e.type,key:l,ref:o,props:r,_owner:i}};L.createContext=function(e){return e={$$typeof:Mp,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},e.Provider={$$typeof:Lp,_context:e},e.Consumer=e};L.createElement=Ta;L.createFactory=function(e){var n=Ta.bind(null,e);return n.type=e,n};L.createRef=function(){return{current:null}};L.forwardRef=function(e){return{$$typeof:Tp,render:e}};L.isValidElement=ql;L.lazy=function(e){return{$$typeof:Dp,_payload:{_status:-1,_result:e},_init:Up}};L.memo=function(e,n){return{$$typeof:Op,type:e,compare:n===void 0?null:n}};L.startTransition=function(e){var n=wr.transition;wr.transition={};try{e()}finally{wr.transition=n}};L.unstable_act=Ra;L.useCallback=function(e,n){return se.current.useCallback(e,n)};L.useContext=function(e){return se.current.useContext(e)};L.useDebugValue=function(){};L.useDeferredValue=function(e){return se.current.useDeferredValue(e)};L.useEffect=function(e,n){return se.current.useEffect(e,n)};L.useId=function(){return se.current.useId()};L.useImperativeHandle=function(e,n,t){return se.current.useImperativeHandle(e,n,t)};L.useInsertionEffect=function(e,n){return se.current.useInsertionEffect(e,n)};L.useLayoutEffect=function(e,n){return se.current.useLayoutEffect(e,n)};L.useMemo=function(e,n){return se.current.useMemo(e,n)};L.useReducer=function(e,n,t){return se.current.useReducer(e,n,t)};L.useRef=function(e){return se.current.useRef(e)};L.useState=function(e){return se.current.useState(e)};L.useSyncExternalStore=function(e,n,t){return se.current.useSyncExternalStore(e,n,t)};L.useTransition=function(){return se.current.useTransition()};L.version="18.3.1"});var ln=Ke((e0,Da)=>{"use strict";Da.exports=Oa()});var Qa=Ke(D=>{"use strict";function ro(e,n){var t=e.length;e.push(n);e:for(;0<t;){var r=t-1>>>1,l=e[r];if(0<kr(l,n))e[r]=n,e[t]=l,t=r;else break e}}function Te(e){return e.length===0?null:e[0]}function Nr(e){if(e.length===0)return null;var n=e[0],t=e.pop();if(t!==n){e[0]=t;e:for(var r=0,l=e.length,o=l>>>1;r<o;){var i=2*(r+1)-1,a=e[i],s=i+1,p=e[s];if(0>kr(a,t))s<l&&0>kr(p,a)?(e[r]=p,e[s]=t,r=s):(e[r]=a,e[i]=t,r=i);else if(s<l&&0>kr(p,t))e[r]=p,e[s]=t,r=s;else break e}}return n}function kr(e,n){var t=e.sortIndex-n.sortIndex;return t!==0?t:e.id-n.id}typeof performance=="object"&&typeof performance.now=="function"?(ja=performance,D.unstable_now=function(){return ja.now()}):(eo=Date,Fa=eo.now(),D.unstable_now=function(){return eo.now()-Fa});var ja,eo,Fa,Be=[],on=[],Ap=1,Ce=null,re=3,Cr=!1,Ln=!1,_t=!1,Ba=typeof setTimeout=="function"?setTimeout:null,Aa=typeof clearTimeout=="function"?clearTimeout:null,Wa=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function lo(e){for(var n=Te(on);n!==null;){if(n.callback===null)Nr(on);else if(n.startTime<=e)Nr(on),n.sortIndex=n.expirationTime,ro(Be,n);else break;n=Te(on)}}function oo(e){if(_t=!1,lo(e),!Ln)if(Te(Be)!==null)Ln=!0,ao(io);else{var n=Te(on);n!==null&&so(oo,n.startTime-e)}}function io(e,n){Ln=!1,_t&&(_t=!1,Aa(Et),Et=-1),Cr=!0;var t=re;try{for(lo(n),Ce=Te(Be);Ce!==null&&(!(Ce.expirationTime>n)||e&&!$a());){var r=Ce.callback;if(typeof r=="function"){Ce.callback=null,re=Ce.priorityLevel;var l=r(Ce.expirationTime<=n);n=D.unstable_now(),typeof l=="function"?Ce.callback=l:Ce===Te(Be)&&Nr(Be),lo(n)}else Nr(Be);Ce=Te(Be)}if(Ce!==null)var o=!0;else{var i=Te(on);i!==null&&so(oo,i.startTime-n),o=!1}return o}finally{Ce=null,re=t,Cr=!1}}var _r=!1,Sr=null,Et=-1,Va=5,Ha=-1;function $a(){return!(D.unstable_now()-Ha<Va)}function no(){if(Sr!==null){var e=D.unstable_now();Ha=e;var n=!0;try{n=Sr(!0,e)}finally{n?Ct():(_r=!1,Sr=null)}}else _r=!1}var Ct;typeof Wa=="function"?Ct=function(){Wa(no)}:typeof MessageChannel<"u"?(to=new MessageChannel,Ua=to.port2,to.port1.onmessage=no,Ct=function(){Ua.postMessage(null)}):Ct=function(){Ba(no,0)};var to,Ua;function ao(e){Sr=e,_r||(_r=!0,Ct())}function so(e,n){Et=Ba(function(){e(D.unstable_now())},n)}D.unstable_IdlePriority=5;D.unstable_ImmediatePriority=1;D.unstable_LowPriority=4;D.unstable_NormalPriority=3;D.unstable_Profiling=null;D.unstable_UserBlockingPriority=2;D.unstable_cancelCallback=function(e){e.callback=null};D.unstable_continueExecution=function(){Ln||Cr||(Ln=!0,ao(io))};D.unstable_forceFrameRate=function(e){0>e||125<e?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):Va=0<e?Math.floor(1e3/e):5};D.unstable_getCurrentPriorityLevel=function(){return re};D.unstable_getFirstCallbackNode=function(){return Te(Be)};D.unstable_next=function(e){switch(re){case 1:case 2:case 3:var n=3;break;default:n=re}var t=re;re=n;try{return e()}finally{re=t}};D.unstable_pauseExecution=function(){};D.unstable_requestPaint=function(){};D.unstable_runWithPriority=function(e,n){switch(e){case 1:case 2:case 3:case 4:case 5:break;default:e=3}var t=re;re=e;try{return n()}finally{re=t}};D.unstable_scheduleCallback=function(e,n,t){var r=D.unstable_now();switch(typeof t=="object"&&t!==null?(t=t.delay,t=typeof t=="number"&&0<t?r+t:r):t=r,e){case 1:var l=-1;break;case 2:l=250;break;case 5:l=1073741823;break;case 4:l=1e4;break;default:l=5e3}return l=t+l,e={id:Ap++,callback:n,priorityLevel:e,startTime:t,expirationTime:l,sortIndex:-1},t>r?(e.sortIndex=t,ro(on,e),Te(Be)===null&&e===Te(on)&&(_t?(Aa(Et),Et=-1):_t=!0,so(oo,t-r))):(e.sortIndex=l,ro(Be,e),Ln||Cr||(Ln=!0,ao(io))),e};D.unstable_shouldYield=$a;D.unstable_wrapCallback=function(e){var n=re;return function(){var t=re;re=n;try{return e.apply(this,arguments)}finally{re=t}}}});var Ya=Ke((t0,Ka)=>{"use strict";Ka.exports=Qa()});var bc=Ke(Se=>{"use strict";var Vp=ln(),we=Ya();function x(e){for(var n="https://reactjs.org/docs/error-decoder.html?invariant="+e,t=1;t<arguments.length;t++)n+="&args[]="+encodeURIComponent(arguments[t]);return"Minified React error #"+e+"; visit "+n+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var eu=new Set,Xt={};function Hn(e,n){ft(e,n),ft(e+"Capture",n)}function ft(e,n){for(Xt[e]=n,e=0;e<n.length;e++)eu.add(n[e])}var Je=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),To=Object.prototype.hasOwnProperty,Hp=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,Xa={},Ga={};function $p(e){return To.call(Ga,e)?!0:To.call(Xa,e)?!1:Hp.test(e)?Ga[e]=!0:(Xa[e]=!0,!1)}function Qp(e,n,t,r){if(t!==null&&t.type===0)return!1;switch(typeof n){case"function":case"symbol":return!0;case"boolean":return r?!1:t!==null?!t.acceptsBooleans:(e=e.toLowerCase().slice(0,5),e!=="data-"&&e!=="aria-");default:return!1}}function Kp(e,n,t,r){if(n===null||typeof n>"u"||Qp(e,n,t,r))return!0;if(r)return!1;if(t!==null)switch(t.type){case 3:return!n;case 4:return n===!1;case 5:return isNaN(n);case 6:return isNaN(n)||1>n}return!1}function pe(e,n,t,r,l,o,i){this.acceptsBooleans=n===2||n===3||n===4,this.attributeName=r,this.attributeNamespace=l,this.mustUseProperty=t,this.propertyName=e,this.type=n,this.sanitizeURL=o,this.removeEmptyString=i}var te={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e){te[e]=new pe(e,0,!1,e,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(e){var n=e[0];te[n]=new pe(n,1,!1,e[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(e){te[e]=new pe(e,2,!1,e.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(e){te[e]=new pe(e,2,!1,e,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e){te[e]=new pe(e,3,!1,e.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(e){te[e]=new pe(e,3,!0,e,null,!1,!1)});["capture","download"].forEach(function(e){te[e]=new pe(e,4,!1,e,null,!1,!1)});["cols","rows","size","span"].forEach(function(e){te[e]=new pe(e,6,!1,e,null,!1,!1)});["rowSpan","start"].forEach(function(e){te[e]=new pe(e,5,!1,e.toLowerCase(),null,!1,!1)});var Ci=/[\-:]([a-z])/g;function _i(e){return e[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e){var n=e.replace(Ci,_i);te[n]=new pe(n,1,!1,e,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e){var n=e.replace(Ci,_i);te[n]=new pe(n,1,!1,e,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(e){var n=e.replace(Ci,_i);te[n]=new pe(n,1,!1,e,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(e){te[e]=new pe(e,1,!1,e.toLowerCase(),null,!1,!1)});te.xlinkHref=new pe("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(e){te[e]=new pe(e,1,!1,e.toLowerCase(),null,!0,!0)});function Ei(e,n,t,r){var l=te.hasOwnProperty(n)?te[n]:null;(l!==null?l.type!==0:r||!(2<n.length)||n[0]!=="o"&&n[0]!=="O"||n[1]!=="n"&&n[1]!=="N")&&(Kp(n,t,l,r)&&(t=null),r||l===null?$p(n)&&(t===null?e.removeAttribute(n):e.setAttribute(n,""+t)):l.mustUseProperty?e[l.propertyName]=t===null?l.type===3?!1:"":t:(n=l.attributeName,r=l.attributeNamespace,t===null?e.removeAttribute(n):(l=l.type,t=l===3||l===4&&t===!0?"":""+t,r?e.setAttributeNS(r,n,t):e.setAttribute(n,t))))}var tn=Vp.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,Er=Symbol.for("react.element"),Gn=Symbol.for("react.portal"),Zn=Symbol.for("react.fragment"),zi=Symbol.for("react.strict_mode"),Ro=Symbol.for("react.profiler"),nu=Symbol.for("react.provider"),tu=Symbol.for("react.context"),Pi=Symbol.for("react.forward_ref"),Oo=Symbol.for("react.suspense"),Do=Symbol.for("react.suspense_list"),Ii=Symbol.for("react.memo"),sn=Symbol.for("react.lazy"),ru=Symbol.for("react.offscreen"),Za=Symbol.iterator;function zt(e){return e===null||typeof e!="object"?null:(e=Za&&e[Za]||e["@@iterator"],typeof e=="function"?e:null)}var V=Object.assign,uo;function Dt(e){if(uo===void 0)try{throw Error()}catch(t){var n=t.stack.trim().match(/\n( *(at )?)/);uo=n&&n[1]||""}return`
`+uo+e}var co=!1;function po(e,n){if(!e||co)return"";co=!0;var t=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(n)if(n=function(){throw Error()},Object.defineProperty(n.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(n,[])}catch(p){var r=p}Reflect.construct(e,[],n)}else{try{n.call()}catch(p){r=p}e.call(n.prototype)}else{try{throw Error()}catch(p){r=p}e()}}catch(p){if(p&&r&&typeof p.stack=="string"){for(var l=p.stack.split(`
`),o=r.stack.split(`
`),i=l.length-1,a=o.length-1;1<=i&&0<=a&&l[i]!==o[a];)a--;for(;1<=i&&0<=a;i--,a--)if(l[i]!==o[a]){if(i!==1||a!==1)do if(i--,a--,0>a||l[i]!==o[a]){var s=`
`+l[i].replace(" at new "," at ");return e.displayName&&s.includes("<anonymous>")&&(s=s.replace("<anonymous>",e.displayName)),s}while(1<=i&&0<=a);break}}}finally{co=!1,Error.prepareStackTrace=t}return(e=e?e.displayName||e.name:"")?Dt(e):""}function Yp(e){switch(e.tag){case 5:return Dt(e.type);case 16:return Dt("Lazy");case 13:return Dt("Suspense");case 19:return Dt("SuspenseList");case 0:case 2:case 15:return e=po(e.type,!1),e;case 11:return e=po(e.type.render,!1),e;case 1:return e=po(e.type,!0),e;default:return""}}function jo(e){if(e==null)return null;if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case Zn:return"Fragment";case Gn:return"Portal";case Ro:return"Profiler";case zi:return"StrictMode";case Oo:return"Suspense";case Do:return"SuspenseList"}if(typeof e=="object")switch(e.$$typeof){case tu:return(e.displayName||"Context")+".Consumer";case nu:return(e._context.displayName||"Context")+".Provider";case Pi:var n=e.render;return e=e.displayName,e||(e=n.displayName||n.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case Ii:return n=e.displayName||null,n!==null?n:jo(e.type)||"Memo";case sn:n=e._payload,e=e._init;try{return jo(e(n))}catch{}}return null}function Xp(e){var n=e.type;switch(e.tag){case 24:return"Cache";case 9:return(n.displayName||"Context")+".Consumer";case 10:return(n._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return e=n.render,e=e.displayName||e.name||"",n.displayName||(e!==""?"ForwardRef("+e+")":"ForwardRef");case 7:return"Fragment";case 5:return n;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return jo(n);case 8:return n===zi?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof n=="function")return n.displayName||n.name||null;if(typeof n=="string")return n}return null}function Sn(e){switch(typeof e){case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function lu(e){var n=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(n==="checkbox"||n==="radio")}function Gp(e){var n=lu(e)?"checked":"value",t=Object.getOwnPropertyDescriptor(e.constructor.prototype,n),r=""+e[n];if(!e.hasOwnProperty(n)&&typeof t<"u"&&typeof t.get=="function"&&typeof t.set=="function"){var l=t.get,o=t.set;return Object.defineProperty(e,n,{configurable:!0,get:function(){return l.call(this)},set:function(i){r=""+i,o.call(this,i)}}),Object.defineProperty(e,n,{enumerable:t.enumerable}),{getValue:function(){return r},setValue:function(i){r=""+i},stopTracking:function(){e._valueTracker=null,delete e[n]}}}}function zr(e){e._valueTracker||(e._valueTracker=Gp(e))}function ou(e){if(!e)return!1;var n=e._valueTracker;if(!n)return!0;var t=n.getValue(),r="";return e&&(r=lu(e)?e.checked?"true":"false":e.value),e=r,e!==t?(n.setValue(e),!0):!1}function nl(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}function Fo(e,n){var t=n.checked;return V({},n,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:t??e._wrapperState.initialChecked})}function ba(e,n){var t=n.defaultValue==null?"":n.defaultValue,r=n.checked!=null?n.checked:n.defaultChecked;t=Sn(n.value!=null?n.value:t),e._wrapperState={initialChecked:r,initialValue:t,controlled:n.type==="checkbox"||n.type==="radio"?n.checked!=null:n.value!=null}}function iu(e,n){n=n.checked,n!=null&&Ei(e,"checked",n,!1)}function Wo(e,n){iu(e,n);var t=Sn(n.value),r=n.type;if(t!=null)r==="number"?(t===0&&e.value===""||e.value!=t)&&(e.value=""+t):e.value!==""+t&&(e.value=""+t);else if(r==="submit"||r==="reset"){e.removeAttribute("value");return}n.hasOwnProperty("value")?Uo(e,n.type,t):n.hasOwnProperty("defaultValue")&&Uo(e,n.type,Sn(n.defaultValue)),n.checked==null&&n.defaultChecked!=null&&(e.defaultChecked=!!n.defaultChecked)}function Ja(e,n,t){if(n.hasOwnProperty("value")||n.hasOwnProperty("defaultValue")){var r=n.type;if(!(r!=="submit"&&r!=="reset"||n.value!==void 0&&n.value!==null))return;n=""+e._wrapperState.initialValue,t||n===e.value||(e.value=n),e.defaultValue=n}t=e.name,t!==""&&(e.name=""),e.defaultChecked=!!e._wrapperState.initialChecked,t!==""&&(e.name=t)}function Uo(e,n,t){(n!=="number"||nl(e.ownerDocument)!==e)&&(t==null?e.defaultValue=""+e._wrapperState.initialValue:e.defaultValue!==""+t&&(e.defaultValue=""+t))}var jt=Array.isArray;function at(e,n,t,r){if(e=e.options,n){n={};for(var l=0;l<t.length;l++)n["$"+t[l]]=!0;for(t=0;t<e.length;t++)l=n.hasOwnProperty("$"+e[t].value),e[t].selected!==l&&(e[t].selected=l),l&&r&&(e[t].defaultSelected=!0)}else{for(t=""+Sn(t),n=null,l=0;l<e.length;l++){if(e[l].value===t){e[l].selected=!0,r&&(e[l].defaultSelected=!0);return}n!==null||e[l].disabled||(n=e[l])}n!==null&&(n.selected=!0)}}function Bo(e,n){if(n.dangerouslySetInnerHTML!=null)throw Error(x(91));return V({},n,{value:void 0,defaultValue:void 0,children:""+e._wrapperState.initialValue})}function qa(e,n){var t=n.value;if(t==null){if(t=n.children,n=n.defaultValue,t!=null){if(n!=null)throw Error(x(92));if(jt(t)){if(1<t.length)throw Error(x(93));t=t[0]}n=t}n==null&&(n=""),t=n}e._wrapperState={initialValue:Sn(t)}}function au(e,n){var t=Sn(n.value),r=Sn(n.defaultValue);t!=null&&(t=""+t,t!==e.value&&(e.value=t),n.defaultValue==null&&e.defaultValue!==t&&(e.defaultValue=t)),r!=null&&(e.defaultValue=""+r)}function es(e){var n=e.textContent;n===e._wrapperState.initialValue&&n!==""&&n!==null&&(e.value=n)}function su(e){switch(e){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function Ao(e,n){return e==null||e==="http://www.w3.org/1999/xhtml"?su(n):e==="http://www.w3.org/2000/svg"&&n==="foreignObject"?"http://www.w3.org/1999/xhtml":e}var Pr,uu=(function(e){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(n,t,r,l){MSApp.execUnsafeLocalFunction(function(){return e(n,t,r,l)})}:e})(function(e,n){if(e.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in e)e.innerHTML=n;else{for(Pr=Pr||document.createElement("div"),Pr.innerHTML="<svg>"+n.valueOf().toString()+"</svg>",n=Pr.firstChild;e.firstChild;)e.removeChild(e.firstChild);for(;n.firstChild;)e.appendChild(n.firstChild)}});function Gt(e,n){if(n){var t=e.firstChild;if(t&&t===e.lastChild&&t.nodeType===3){t.nodeValue=n;return}}e.textContent=n}var Ut={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},Zp=["Webkit","ms","Moz","O"];Object.keys(Ut).forEach(function(e){Zp.forEach(function(n){n=n+e.charAt(0).toUpperCase()+e.substring(1),Ut[n]=Ut[e]})});function cu(e,n,t){return n==null||typeof n=="boolean"||n===""?"":t||typeof n!="number"||n===0||Ut.hasOwnProperty(e)&&Ut[e]?(""+n).trim():n+"px"}function pu(e,n){e=e.style;for(var t in n)if(n.hasOwnProperty(t)){var r=t.indexOf("--")===0,l=cu(t,n[t],r);t==="float"&&(t="cssFloat"),r?e.setProperty(t,l):e[t]=l}}var bp=V({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function Vo(e,n){if(n){if(bp[e]&&(n.children!=null||n.dangerouslySetInnerHTML!=null))throw Error(x(137,e));if(n.dangerouslySetInnerHTML!=null){if(n.children!=null)throw Error(x(60));if(typeof n.dangerouslySetInnerHTML!="object"||!("__html"in n.dangerouslySetInnerHTML))throw Error(x(61))}if(n.style!=null&&typeof n.style!="object")throw Error(x(62))}}function Ho(e,n){if(e.indexOf("-")===-1)return typeof n.is=="string";switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var $o=null;function Li(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var Qo=null,st=null,ut=null;function ns(e){if(e=fr(e)){if(typeof Qo!="function")throw Error(x(280));var n=e.stateNode;n&&(n=Il(n),Qo(e.stateNode,e.type,n))}}function du(e){st?ut?ut.push(e):ut=[e]:st=e}function fu(){if(st){var e=st,n=ut;if(ut=st=null,ns(e),n)for(e=0;e<n.length;e++)ns(n[e])}}function mu(e,n){return e(n)}function gu(){}var fo=!1;function hu(e,n,t){if(fo)return e(n,t);fo=!0;try{return mu(e,n,t)}finally{fo=!1,(st!==null||ut!==null)&&(gu(),fu())}}function Zt(e,n){var t=e.stateNode;if(t===null)return null;var r=Il(t);if(r===null)return null;t=r[n];e:switch(n){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(r=!r.disabled)||(e=e.type,r=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!r;break e;default:e=!1}if(e)return null;if(t&&typeof t!="function")throw Error(x(231,n,typeof t));return t}var Ko=!1;if(Je)try{Yn={},Object.defineProperty(Yn,"passive",{get:function(){Ko=!0}}),window.addEventListener("test",Yn,Yn),window.removeEventListener("test",Yn,Yn)}catch{Ko=!1}var Yn;function Jp(e,n,t,r,l,o,i,a,s){var p=Array.prototype.slice.call(arguments,3);try{n.apply(t,p)}catch(v){this.onError(v)}}var Bt=!1,tl=null,rl=!1,Yo=null,qp={onError:function(e){Bt=!0,tl=e}};function ed(e,n,t,r,l,o,i,a,s){Bt=!1,tl=null,Jp.apply(qp,arguments)}function nd(e,n,t,r,l,o,i,a,s){if(ed.apply(this,arguments),Bt){if(Bt){var p=tl;Bt=!1,tl=null}else throw Error(x(198));rl||(rl=!0,Yo=p)}}function $n(e){var n=e,t=e;if(e.alternate)for(;n.return;)n=n.return;else{e=n;do n=e,(n.flags&4098)!==0&&(t=n.return),e=n.return;while(e)}return n.tag===3?t:null}function vu(e){if(e.tag===13){var n=e.memoizedState;if(n===null&&(e=e.alternate,e!==null&&(n=e.memoizedState)),n!==null)return n.dehydrated}return null}function ts(e){if($n(e)!==e)throw Error(x(188))}function td(e){var n=e.alternate;if(!n){if(n=$n(e),n===null)throw Error(x(188));return n!==e?null:e}for(var t=e,r=n;;){var l=t.return;if(l===null)break;var o=l.alternate;if(o===null){if(r=l.return,r!==null){t=r;continue}break}if(l.child===o.child){for(o=l.child;o;){if(o===t)return ts(l),e;if(o===r)return ts(l),n;o=o.sibling}throw Error(x(188))}if(t.return!==r.return)t=l,r=o;else{for(var i=!1,a=l.child;a;){if(a===t){i=!0,t=l,r=o;break}if(a===r){i=!0,r=l,t=o;break}a=a.sibling}if(!i){for(a=o.child;a;){if(a===t){i=!0,t=o,r=l;break}if(a===r){i=!0,r=o,t=l;break}a=a.sibling}if(!i)throw Error(x(189))}}if(t.alternate!==r)throw Error(x(190))}if(t.tag!==3)throw Error(x(188));return t.stateNode.current===t?e:n}function yu(e){return e=td(e),e!==null?xu(e):null}function xu(e){if(e.tag===5||e.tag===6)return e;for(e=e.child;e!==null;){var n=xu(e);if(n!==null)return n;e=e.sibling}return null}var wu=we.unstable_scheduleCallback,rs=we.unstable_cancelCallback,rd=we.unstable_shouldYield,ld=we.unstable_requestPaint,$=we.unstable_now,od=we.unstable_getCurrentPriorityLevel,Mi=we.unstable_ImmediatePriority,ku=we.unstable_UserBlockingPriority,ll=we.unstable_NormalPriority,id=we.unstable_LowPriority,Su=we.unstable_IdlePriority,_l=null,$e=null;function ad(e){if($e&&typeof $e.onCommitFiberRoot=="function")try{$e.onCommitFiberRoot(_l,e,void 0,(e.current.flags&128)===128)}catch{}}var Fe=Math.clz32?Math.clz32:cd,sd=Math.log,ud=Math.LN2;function cd(e){return e>>>=0,e===0?32:31-(sd(e)/ud|0)|0}var Ir=64,Lr=4194304;function Ft(e){switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return e&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return e}}function ol(e,n){var t=e.pendingLanes;if(t===0)return 0;var r=0,l=e.suspendedLanes,o=e.pingedLanes,i=t&268435455;if(i!==0){var a=i&~l;a!==0?r=Ft(a):(o&=i,o!==0&&(r=Ft(o)))}else i=t&~l,i!==0?r=Ft(i):o!==0&&(r=Ft(o));if(r===0)return 0;if(n!==0&&n!==r&&(n&l)===0&&(l=r&-r,o=n&-n,l>=o||l===16&&(o&4194240)!==0))return n;if((r&4)!==0&&(r|=t&16),n=e.entangledLanes,n!==0)for(e=e.entanglements,n&=r;0<n;)t=31-Fe(n),l=1<<t,r|=e[t],n&=~l;return r}function pd(e,n){switch(e){case 1:case 2:case 4:return n+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return n+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function dd(e,n){for(var t=e.suspendedLanes,r=e.pingedLanes,l=e.expirationTimes,o=e.pendingLanes;0<o;){var i=31-Fe(o),a=1<<i,s=l[i];s===-1?((a&t)===0||(a&r)!==0)&&(l[i]=pd(a,n)):s<=n&&(e.expiredLanes|=a),o&=~a}}function Xo(e){return e=e.pendingLanes&-1073741825,e!==0?e:e&1073741824?1073741824:0}function Nu(){var e=Ir;return Ir<<=1,(Ir&4194240)===0&&(Ir=64),e}function mo(e){for(var n=[],t=0;31>t;t++)n.push(e);return n}function pr(e,n,t){e.pendingLanes|=n,n!==536870912&&(e.suspendedLanes=0,e.pingedLanes=0),e=e.eventTimes,n=31-Fe(n),e[n]=t}function fd(e,n){var t=e.pendingLanes&~n;e.pendingLanes=n,e.suspendedLanes=0,e.pingedLanes=0,e.expiredLanes&=n,e.mutableReadLanes&=n,e.entangledLanes&=n,n=e.entanglements;var r=e.eventTimes;for(e=e.expirationTimes;0<t;){var l=31-Fe(t),o=1<<l;n[l]=0,r[l]=-1,e[l]=-1,t&=~o}}function Ti(e,n){var t=e.entangledLanes|=n;for(e=e.entanglements;t;){var r=31-Fe(t),l=1<<r;l&n|e[r]&n&&(e[r]|=n),t&=~l}}var R=0;function Cu(e){return e&=-e,1<e?4<e?(e&268435455)!==0?16:536870912:4:1}var _u,Ri,Eu,zu,Pu,Go=!1,Mr=[],mn=null,gn=null,hn=null,bt=new Map,Jt=new Map,cn=[],md="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function ls(e,n){switch(e){case"focusin":case"focusout":mn=null;break;case"dragenter":case"dragleave":gn=null;break;case"mouseover":case"mouseout":hn=null;break;case"pointerover":case"pointerout":bt.delete(n.pointerId);break;case"gotpointercapture":case"lostpointercapture":Jt.delete(n.pointerId)}}function Pt(e,n,t,r,l,o){return e===null||e.nativeEvent!==o?(e={blockedOn:n,domEventName:t,eventSystemFlags:r,nativeEvent:o,targetContainers:[l]},n!==null&&(n=fr(n),n!==null&&Ri(n)),e):(e.eventSystemFlags|=r,n=e.targetContainers,l!==null&&n.indexOf(l)===-1&&n.push(l),e)}function gd(e,n,t,r,l){switch(n){case"focusin":return mn=Pt(mn,e,n,t,r,l),!0;case"dragenter":return gn=Pt(gn,e,n,t,r,l),!0;case"mouseover":return hn=Pt(hn,e,n,t,r,l),!0;case"pointerover":var o=l.pointerId;return bt.set(o,Pt(bt.get(o)||null,e,n,t,r,l)),!0;case"gotpointercapture":return o=l.pointerId,Jt.set(o,Pt(Jt.get(o)||null,e,n,t,r,l)),!0}return!1}function Iu(e){var n=Rn(e.target);if(n!==null){var t=$n(n);if(t!==null){if(n=t.tag,n===13){if(n=vu(t),n!==null){e.blockedOn=n,Pu(e.priority,function(){Eu(t)});return}}else if(n===3&&t.stateNode.current.memoizedState.isDehydrated){e.blockedOn=t.tag===3?t.stateNode.containerInfo:null;return}}}e.blockedOn=null}function Qr(e){if(e.blockedOn!==null)return!1;for(var n=e.targetContainers;0<n.length;){var t=Zo(e.domEventName,e.eventSystemFlags,n[0],e.nativeEvent);if(t===null){t=e.nativeEvent;var r=new t.constructor(t.type,t);$o=r,t.target.dispatchEvent(r),$o=null}else return n=fr(t),n!==null&&Ri(n),e.blockedOn=t,!1;n.shift()}return!0}function os(e,n,t){Qr(e)&&t.delete(n)}function hd(){Go=!1,mn!==null&&Qr(mn)&&(mn=null),gn!==null&&Qr(gn)&&(gn=null),hn!==null&&Qr(hn)&&(hn=null),bt.forEach(os),Jt.forEach(os)}function It(e,n){e.blockedOn===n&&(e.blockedOn=null,Go||(Go=!0,we.unstable_scheduleCallback(we.unstable_NormalPriority,hd)))}function qt(e){function n(l){return It(l,e)}if(0<Mr.length){It(Mr[0],e);for(var t=1;t<Mr.length;t++){var r=Mr[t];r.blockedOn===e&&(r.blockedOn=null)}}for(mn!==null&&It(mn,e),gn!==null&&It(gn,e),hn!==null&&It(hn,e),bt.forEach(n),Jt.forEach(n),t=0;t<cn.length;t++)r=cn[t],r.blockedOn===e&&(r.blockedOn=null);for(;0<cn.length&&(t=cn[0],t.blockedOn===null);)Iu(t),t.blockedOn===null&&cn.shift()}var ct=tn.ReactCurrentBatchConfig,il=!0;function vd(e,n,t,r){var l=R,o=ct.transition;ct.transition=null;try{R=1,Oi(e,n,t,r)}finally{R=l,ct.transition=o}}function yd(e,n,t,r){var l=R,o=ct.transition;ct.transition=null;try{R=4,Oi(e,n,t,r)}finally{R=l,ct.transition=o}}function Oi(e,n,t,r){if(il){var l=Zo(e,n,t,r);if(l===null)ko(e,n,r,al,t),ls(e,r);else if(gd(l,e,n,t,r))r.stopPropagation();else if(ls(e,r),n&4&&-1<md.indexOf(e)){for(;l!==null;){var o=fr(l);if(o!==null&&_u(o),o=Zo(e,n,t,r),o===null&&ko(e,n,r,al,t),o===l)break;l=o}l!==null&&r.stopPropagation()}else ko(e,n,r,null,t)}}var al=null;function Zo(e,n,t,r){if(al=null,e=Li(r),e=Rn(e),e!==null)if(n=$n(e),n===null)e=null;else if(t=n.tag,t===13){if(e=vu(n),e!==null)return e;e=null}else if(t===3){if(n.stateNode.current.memoizedState.isDehydrated)return n.tag===3?n.stateNode.containerInfo:null;e=null}else n!==e&&(e=null);return al=e,null}function Lu(e){switch(e){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(od()){case Mi:return 1;case ku:return 4;case ll:case id:return 16;case Su:return 536870912;default:return 16}default:return 16}}var dn=null,Di=null,Kr=null;function Mu(){if(Kr)return Kr;var e,n=Di,t=n.length,r,l="value"in dn?dn.value:dn.textContent,o=l.length;for(e=0;e<t&&n[e]===l[e];e++);var i=t-e;for(r=1;r<=i&&n[t-r]===l[o-r];r++);return Kr=l.slice(e,1<r?1-r:void 0)}function Yr(e){var n=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&n===13&&(e=13)):e=n,e===10&&(e=13),32<=e||e===13?e:0}function Tr(){return!0}function is(){return!1}function ke(e){function n(t,r,l,o,i){this._reactName=t,this._targetInst=l,this.type=r,this.nativeEvent=o,this.target=i,this.currentTarget=null;for(var a in e)e.hasOwnProperty(a)&&(t=e[a],this[a]=t?t(o):o[a]);return this.isDefaultPrevented=(o.defaultPrevented!=null?o.defaultPrevented:o.returnValue===!1)?Tr:is,this.isPropagationStopped=is,this}return V(n.prototype,{preventDefault:function(){this.defaultPrevented=!0;var t=this.nativeEvent;t&&(t.preventDefault?t.preventDefault():typeof t.returnValue!="unknown"&&(t.returnValue=!1),this.isDefaultPrevented=Tr)},stopPropagation:function(){var t=this.nativeEvent;t&&(t.stopPropagation?t.stopPropagation():typeof t.cancelBubble!="unknown"&&(t.cancelBubble=!0),this.isPropagationStopped=Tr)},persist:function(){},isPersistent:Tr}),n}var wt={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},ji=ke(wt),dr=V({},wt,{view:0,detail:0}),xd=ke(dr),go,ho,Lt,El=V({},dr,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Fi,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==Lt&&(Lt&&e.type==="mousemove"?(go=e.screenX-Lt.screenX,ho=e.screenY-Lt.screenY):ho=go=0,Lt=e),go)},movementY:function(e){return"movementY"in e?e.movementY:ho}}),as=ke(El),wd=V({},El,{dataTransfer:0}),kd=ke(wd),Sd=V({},dr,{relatedTarget:0}),vo=ke(Sd),Nd=V({},wt,{animationName:0,elapsedTime:0,pseudoElement:0}),Cd=ke(Nd),_d=V({},wt,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),Ed=ke(_d),zd=V({},wt,{data:0}),ss=ke(zd),Pd={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},Id={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},Ld={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function Md(e){var n=this.nativeEvent;return n.getModifierState?n.getModifierState(e):(e=Ld[e])?!!n[e]:!1}function Fi(){return Md}var Td=V({},dr,{key:function(e){if(e.key){var n=Pd[e.key]||e.key;if(n!=="Unidentified")return n}return e.type==="keypress"?(e=Yr(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?Id[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Fi,charCode:function(e){return e.type==="keypress"?Yr(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?Yr(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),Rd=ke(Td),Od=V({},El,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),us=ke(Od),Dd=V({},dr,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Fi}),jd=ke(Dd),Fd=V({},wt,{propertyName:0,elapsedTime:0,pseudoElement:0}),Wd=ke(Fd),Ud=V({},El,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),Bd=ke(Ud),Ad=[9,13,27,32],Wi=Je&&"CompositionEvent"in window,At=null;Je&&"documentMode"in document&&(At=document.documentMode);var Vd=Je&&"TextEvent"in window&&!At,Tu=Je&&(!Wi||At&&8<At&&11>=At),cs=" ",ps=!1;function Ru(e,n){switch(e){case"keyup":return Ad.indexOf(n.keyCode)!==-1;case"keydown":return n.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Ou(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var bn=!1;function Hd(e,n){switch(e){case"compositionend":return Ou(n);case"keypress":return n.which!==32?null:(ps=!0,cs);case"textInput":return e=n.data,e===cs&&ps?null:e;default:return null}}function $d(e,n){if(bn)return e==="compositionend"||!Wi&&Ru(e,n)?(e=Mu(),Kr=Di=dn=null,bn=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(n.ctrlKey||n.altKey||n.metaKey)||n.ctrlKey&&n.altKey){if(n.char&&1<n.char.length)return n.char;if(n.which)return String.fromCharCode(n.which)}return null;case"compositionend":return Tu&&n.locale!=="ko"?null:n.data;default:return null}}var Qd={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function ds(e){var n=e&&e.nodeName&&e.nodeName.toLowerCase();return n==="input"?!!Qd[e.type]:n==="textarea"}function Du(e,n,t,r){du(r),n=sl(n,"onChange"),0<n.length&&(t=new ji("onChange","change",null,t,r),e.push({event:t,listeners:n}))}var Vt=null,er=null;function Kd(e){Ku(e,0)}function zl(e){var n=et(e);if(ou(n))return e}function Yd(e,n){if(e==="change")return n}var ju=!1;Je&&(Je?(Or="oninput"in document,Or||(yo=document.createElement("div"),yo.setAttribute("oninput","return;"),Or=typeof yo.oninput=="function"),Rr=Or):Rr=!1,ju=Rr&&(!document.documentMode||9<document.documentMode));var Rr,Or,yo;function fs(){Vt&&(Vt.detachEvent("onpropertychange",Fu),er=Vt=null)}function Fu(e){if(e.propertyName==="value"&&zl(er)){var n=[];Du(n,er,e,Li(e)),hu(Kd,n)}}function Xd(e,n,t){e==="focusin"?(fs(),Vt=n,er=t,Vt.attachEvent("onpropertychange",Fu)):e==="focusout"&&fs()}function Gd(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return zl(er)}function Zd(e,n){if(e==="click")return zl(n)}function bd(e,n){if(e==="input"||e==="change")return zl(n)}function Jd(e,n){return e===n&&(e!==0||1/e===1/n)||e!==e&&n!==n}var Ue=typeof Object.is=="function"?Object.is:Jd;function nr(e,n){if(Ue(e,n))return!0;if(typeof e!="object"||e===null||typeof n!="object"||n===null)return!1;var t=Object.keys(e),r=Object.keys(n);if(t.length!==r.length)return!1;for(r=0;r<t.length;r++){var l=t[r];if(!To.call(n,l)||!Ue(e[l],n[l]))return!1}return!0}function ms(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function gs(e,n){var t=ms(e);e=0;for(var r;t;){if(t.nodeType===3){if(r=e+t.textContent.length,e<=n&&r>=n)return{node:t,offset:n-e};e=r}e:{for(;t;){if(t.nextSibling){t=t.nextSibling;break e}t=t.parentNode}t=void 0}t=ms(t)}}function Wu(e,n){return e&&n?e===n?!0:e&&e.nodeType===3?!1:n&&n.nodeType===3?Wu(e,n.parentNode):"contains"in e?e.contains(n):e.compareDocumentPosition?!!(e.compareDocumentPosition(n)&16):!1:!1}function Uu(){for(var e=window,n=nl();n instanceof e.HTMLIFrameElement;){try{var t=typeof n.contentWindow.location.href=="string"}catch{t=!1}if(t)e=n.contentWindow;else break;n=nl(e.document)}return n}function Ui(e){var n=e&&e.nodeName&&e.nodeName.toLowerCase();return n&&(n==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||n==="textarea"||e.contentEditable==="true")}function qd(e){var n=Uu(),t=e.focusedElem,r=e.selectionRange;if(n!==t&&t&&t.ownerDocument&&Wu(t.ownerDocument.documentElement,t)){if(r!==null&&Ui(t)){if(n=r.start,e=r.end,e===void 0&&(e=n),"selectionStart"in t)t.selectionStart=n,t.selectionEnd=Math.min(e,t.value.length);else if(e=(n=t.ownerDocument||document)&&n.defaultView||window,e.getSelection){e=e.getSelection();var l=t.textContent.length,o=Math.min(r.start,l);r=r.end===void 0?o:Math.min(r.end,l),!e.extend&&o>r&&(l=r,r=o,o=l),l=gs(t,o);var i=gs(t,r);l&&i&&(e.rangeCount!==1||e.anchorNode!==l.node||e.anchorOffset!==l.offset||e.focusNode!==i.node||e.focusOffset!==i.offset)&&(n=n.createRange(),n.setStart(l.node,l.offset),e.removeAllRanges(),o>r?(e.addRange(n),e.extend(i.node,i.offset)):(n.setEnd(i.node,i.offset),e.addRange(n)))}}for(n=[],e=t;e=e.parentNode;)e.nodeType===1&&n.push({element:e,left:e.scrollLeft,top:e.scrollTop});for(typeof t.focus=="function"&&t.focus(),t=0;t<n.length;t++)e=n[t],e.element.scrollLeft=e.left,e.element.scrollTop=e.top}}var ef=Je&&"documentMode"in document&&11>=document.documentMode,Jn=null,bo=null,Ht=null,Jo=!1;function hs(e,n,t){var r=t.window===t?t.document:t.nodeType===9?t:t.ownerDocument;Jo||Jn==null||Jn!==nl(r)||(r=Jn,"selectionStart"in r&&Ui(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),Ht&&nr(Ht,r)||(Ht=r,r=sl(bo,"onSelect"),0<r.length&&(n=new ji("onSelect","select",null,n,t),e.push({event:n,listeners:r}),n.target=Jn)))}function Dr(e,n){var t={};return t[e.toLowerCase()]=n.toLowerCase(),t["Webkit"+e]="webkit"+n,t["Moz"+e]="moz"+n,t}var qn={animationend:Dr("Animation","AnimationEnd"),animationiteration:Dr("Animation","AnimationIteration"),animationstart:Dr("Animation","AnimationStart"),transitionend:Dr("Transition","TransitionEnd")},xo={},Bu={};Je&&(Bu=document.createElement("div").style,"AnimationEvent"in window||(delete qn.animationend.animation,delete qn.animationiteration.animation,delete qn.animationstart.animation),"TransitionEvent"in window||delete qn.transitionend.transition);function Pl(e){if(xo[e])return xo[e];if(!qn[e])return e;var n=qn[e],t;for(t in n)if(n.hasOwnProperty(t)&&t in Bu)return xo[e]=n[t];return e}var Au=Pl("animationend"),Vu=Pl("animationiteration"),Hu=Pl("animationstart"),$u=Pl("transitionend"),Qu=new Map,vs="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function Cn(e,n){Qu.set(e,n),Hn(n,[e])}for(jr=0;jr<vs.length;jr++)Fr=vs[jr],ys=Fr.toLowerCase(),xs=Fr[0].toUpperCase()+Fr.slice(1),Cn(ys,"on"+xs);var Fr,ys,xs,jr;Cn(Au,"onAnimationEnd");Cn(Vu,"onAnimationIteration");Cn(Hu,"onAnimationStart");Cn("dblclick","onDoubleClick");Cn("focusin","onFocus");Cn("focusout","onBlur");Cn($u,"onTransitionEnd");ft("onMouseEnter",["mouseout","mouseover"]);ft("onMouseLeave",["mouseout","mouseover"]);ft("onPointerEnter",["pointerout","pointerover"]);ft("onPointerLeave",["pointerout","pointerover"]);Hn("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));Hn("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));Hn("onBeforeInput",["compositionend","keypress","textInput","paste"]);Hn("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));Hn("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));Hn("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Wt="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),nf=new Set("cancel close invalid load scroll toggle".split(" ").concat(Wt));function ws(e,n,t){var r=e.type||"unknown-event";e.currentTarget=t,nd(r,n,void 0,e),e.currentTarget=null}function Ku(e,n){n=(n&4)!==0;for(var t=0;t<e.length;t++){var r=e[t],l=r.event;r=r.listeners;e:{var o=void 0;if(n)for(var i=r.length-1;0<=i;i--){var a=r[i],s=a.instance,p=a.currentTarget;if(a=a.listener,s!==o&&l.isPropagationStopped())break e;ws(l,a,p),o=s}else for(i=0;i<r.length;i++){if(a=r[i],s=a.instance,p=a.currentTarget,a=a.listener,s!==o&&l.isPropagationStopped())break e;ws(l,a,p),o=s}}}if(rl)throw e=Yo,rl=!1,Yo=null,e}function F(e,n){var t=n[ri];t===void 0&&(t=n[ri]=new Set);var r=e+"__bubble";t.has(r)||(Yu(n,e,2,!1),t.add(r))}function wo(e,n,t){var r=0;n&&(r|=4),Yu(t,e,r,n)}var Wr="_reactListening"+Math.random().toString(36).slice(2);function tr(e){if(!e[Wr]){e[Wr]=!0,eu.forEach(function(t){t!=="selectionchange"&&(nf.has(t)||wo(t,!1,e),wo(t,!0,e))});var n=e.nodeType===9?e:e.ownerDocument;n===null||n[Wr]||(n[Wr]=!0,wo("selectionchange",!1,n))}}function Yu(e,n,t,r){switch(Lu(n)){case 1:var l=vd;break;case 4:l=yd;break;default:l=Oi}t=l.bind(null,n,t,e),l=void 0,!Ko||n!=="touchstart"&&n!=="touchmove"&&n!=="wheel"||(l=!0),r?l!==void 0?e.addEventListener(n,t,{capture:!0,passive:l}):e.addEventListener(n,t,!0):l!==void 0?e.addEventListener(n,t,{passive:l}):e.addEventListener(n,t,!1)}function ko(e,n,t,r,l){var o=r;if((n&1)===0&&(n&2)===0&&r!==null)e:for(;;){if(r===null)return;var i=r.tag;if(i===3||i===4){var a=r.stateNode.containerInfo;if(a===l||a.nodeType===8&&a.parentNode===l)break;if(i===4)for(i=r.return;i!==null;){var s=i.tag;if((s===3||s===4)&&(s=i.stateNode.containerInfo,s===l||s.nodeType===8&&s.parentNode===l))return;i=i.return}for(;a!==null;){if(i=Rn(a),i===null)return;if(s=i.tag,s===5||s===6){r=o=i;continue e}a=a.parentNode}}r=r.return}hu(function(){var p=o,v=Li(t),m=[];e:{var f=Qu.get(e);if(f!==void 0){var w=ji,S=e;switch(e){case"keypress":if(Yr(t)===0)break e;case"keydown":case"keyup":w=Rd;break;case"focusin":S="focus",w=vo;break;case"focusout":S="blur",w=vo;break;case"beforeblur":case"afterblur":w=vo;break;case"click":if(t.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":w=as;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":w=kd;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":w=jd;break;case Au:case Vu:case Hu:w=Cd;break;case $u:w=Wd;break;case"scroll":w=xd;break;case"wheel":w=Bd;break;case"copy":case"cut":case"paste":w=Ed;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":w=us}var C=(n&4)!==0,O=!C&&e==="scroll",u=C?f!==null?f+"Capture":null:f;C=[];for(var c=p,d;c!==null;){d=c;var h=d.stateNode;if(d.tag===5&&h!==null&&(d=h,u!==null&&(h=Zt(c,u),h!=null&&C.push(rr(c,h,d)))),O)break;c=c.return}0<C.length&&(f=new w(f,S,null,t,v),m.push({event:f,listeners:C}))}}if((n&7)===0){e:{if(f=e==="mouseover"||e==="pointerover",w=e==="mouseout"||e==="pointerout",f&&t!==$o&&(S=t.relatedTarget||t.fromElement)&&(Rn(S)||S[qe]))break e;if((w||f)&&(f=v.window===v?v:(f=v.ownerDocument)?f.defaultView||f.parentWindow:window,w?(S=t.relatedTarget||t.toElement,w=p,S=S?Rn(S):null,S!==null&&(O=$n(S),S!==O||S.tag!==5&&S.tag!==6)&&(S=null)):(w=null,S=p),w!==S)){if(C=as,h="onMouseLeave",u="onMouseEnter",c="mouse",(e==="pointerout"||e==="pointerover")&&(C=us,h="onPointerLeave",u="onPointerEnter",c="pointer"),O=w==null?f:et(w),d=S==null?f:et(S),f=new C(h,c+"leave",w,t,v),f.target=O,f.relatedTarget=d,h=null,Rn(v)===p&&(C=new C(u,c+"enter",S,t,v),C.target=d,C.relatedTarget=O,h=C),O=h,w&&S)n:{for(C=w,u=S,c=0,d=C;d;d=Xn(d))c++;for(d=0,h=u;h;h=Xn(h))d++;for(;0<c-d;)C=Xn(C),c--;for(;0<d-c;)u=Xn(u),d--;for(;c--;){if(C===u||u!==null&&C===u.alternate)break n;C=Xn(C),u=Xn(u)}C=null}else C=null;w!==null&&ks(m,f,w,C,!1),S!==null&&O!==null&&ks(m,O,S,C,!0)}}e:{if(f=p?et(p):window,w=f.nodeName&&f.nodeName.toLowerCase(),w==="select"||w==="input"&&f.type==="file")var k=Yd;else if(ds(f))if(ju)k=bd;else{k=Gd;var _=Xd}else(w=f.nodeName)&&w.toLowerCase()==="input"&&(f.type==="checkbox"||f.type==="radio")&&(k=Zd);if(k&&(k=k(e,p))){Du(m,k,t,v);break e}_&&_(e,f,p),e==="focusout"&&(_=f._wrapperState)&&_.controlled&&f.type==="number"&&Uo(f,"number",f.value)}switch(_=p?et(p):window,e){case"focusin":(ds(_)||_.contentEditable==="true")&&(Jn=_,bo=p,Ht=null);break;case"focusout":Ht=bo=Jn=null;break;case"mousedown":Jo=!0;break;case"contextmenu":case"mouseup":case"dragend":Jo=!1,hs(m,t,v);break;case"selectionchange":if(ef)break;case"keydown":case"keyup":hs(m,t,v)}var z;if(Wi)e:{switch(e){case"compositionstart":var P="onCompositionStart";break e;case"compositionend":P="onCompositionEnd";break e;case"compositionupdate":P="onCompositionUpdate";break e}P=void 0}else bn?Ru(e,t)&&(P="onCompositionEnd"):e==="keydown"&&t.keyCode===229&&(P="onCompositionStart");P&&(Tu&&t.locale!=="ko"&&(bn||P!=="onCompositionStart"?P==="onCompositionEnd"&&bn&&(z=Mu()):(dn=v,Di="value"in dn?dn.value:dn.textContent,bn=!0)),_=sl(p,P),0<_.length&&(P=new ss(P,e,null,t,v),m.push({event:P,listeners:_}),z?P.data=z:(z=Ou(t),z!==null&&(P.data=z)))),(z=Vd?Hd(e,t):$d(e,t))&&(p=sl(p,"onBeforeInput"),0<p.length&&(v=new ss("onBeforeInput","beforeinput",null,t,v),m.push({event:v,listeners:p}),v.data=z))}Ku(m,n)})}function rr(e,n,t){return{instance:e,listener:n,currentTarget:t}}function sl(e,n){for(var t=n+"Capture",r=[];e!==null;){var l=e,o=l.stateNode;l.tag===5&&o!==null&&(l=o,o=Zt(e,t),o!=null&&r.unshift(rr(e,o,l)),o=Zt(e,n),o!=null&&r.push(rr(e,o,l))),e=e.return}return r}function Xn(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5);return e||null}function ks(e,n,t,r,l){for(var o=n._reactName,i=[];t!==null&&t!==r;){var a=t,s=a.alternate,p=a.stateNode;if(s!==null&&s===r)break;a.tag===5&&p!==null&&(a=p,l?(s=Zt(t,o),s!=null&&i.unshift(rr(t,s,a))):l||(s=Zt(t,o),s!=null&&i.push(rr(t,s,a)))),t=t.return}i.length!==0&&e.push({event:n,listeners:i})}var tf=/\r\n?/g,rf=/\u0000|\uFFFD/g;function Ss(e){return(typeof e=="string"?e:""+e).replace(tf,`
`).replace(rf,"")}function Ur(e,n,t){if(n=Ss(n),Ss(e)!==n&&t)throw Error(x(425))}function ul(){}var qo=null,ei=null;function ni(e,n){return e==="textarea"||e==="noscript"||typeof n.children=="string"||typeof n.children=="number"||typeof n.dangerouslySetInnerHTML=="object"&&n.dangerouslySetInnerHTML!==null&&n.dangerouslySetInnerHTML.__html!=null}var ti=typeof setTimeout=="function"?setTimeout:void 0,lf=typeof clearTimeout=="function"?clearTimeout:void 0,Ns=typeof Promise=="function"?Promise:void 0,of=typeof queueMicrotask=="function"?queueMicrotask:typeof Ns<"u"?function(e){return Ns.resolve(null).then(e).catch(af)}:ti;function af(e){setTimeout(function(){throw e})}function So(e,n){var t=n,r=0;do{var l=t.nextSibling;if(e.removeChild(t),l&&l.nodeType===8)if(t=l.data,t==="/$"){if(r===0){e.removeChild(l),qt(n);return}r--}else t!=="$"&&t!=="$?"&&t!=="$!"||r++;t=l}while(t);qt(n)}function vn(e){for(;e!=null;e=e.nextSibling){var n=e.nodeType;if(n===1||n===3)break;if(n===8){if(n=e.data,n==="$"||n==="$!"||n==="$?")break;if(n==="/$")return null}}return e}function Cs(e){e=e.previousSibling;for(var n=0;e;){if(e.nodeType===8){var t=e.data;if(t==="$"||t==="$!"||t==="$?"){if(n===0)return e;n--}else t==="/$"&&n++}e=e.previousSibling}return null}var kt=Math.random().toString(36).slice(2),He="__reactFiber$"+kt,lr="__reactProps$"+kt,qe="__reactContainer$"+kt,ri="__reactEvents$"+kt,sf="__reactListeners$"+kt,uf="__reactHandles$"+kt;function Rn(e){var n=e[He];if(n)return n;for(var t=e.parentNode;t;){if(n=t[qe]||t[He]){if(t=n.alternate,n.child!==null||t!==null&&t.child!==null)for(e=Cs(e);e!==null;){if(t=e[He])return t;e=Cs(e)}return n}e=t,t=e.parentNode}return null}function fr(e){return e=e[He]||e[qe],!e||e.tag!==5&&e.tag!==6&&e.tag!==13&&e.tag!==3?null:e}function et(e){if(e.tag===5||e.tag===6)return e.stateNode;throw Error(x(33))}function Il(e){return e[lr]||null}var li=[],nt=-1;function _n(e){return{current:e}}function W(e){0>nt||(e.current=li[nt],li[nt]=null,nt--)}function j(e,n){nt++,li[nt]=e.current,e.current=n}var Nn={},ae=_n(Nn),me=_n(!1),Wn=Nn;function mt(e,n){var t=e.type.contextTypes;if(!t)return Nn;var r=e.stateNode;if(r&&r.__reactInternalMemoizedUnmaskedChildContext===n)return r.__reactInternalMemoizedMaskedChildContext;var l={},o;for(o in t)l[o]=n[o];return r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=n,e.__reactInternalMemoizedMaskedChildContext=l),l}function ge(e){return e=e.childContextTypes,e!=null}function cl(){W(me),W(ae)}function _s(e,n,t){if(ae.current!==Nn)throw Error(x(168));j(ae,n),j(me,t)}function Xu(e,n,t){var r=e.stateNode;if(n=n.childContextTypes,typeof r.getChildContext!="function")return t;r=r.getChildContext();for(var l in r)if(!(l in n))throw Error(x(108,Xp(e)||"Unknown",l));return V({},t,r)}function pl(e){return e=(e=e.stateNode)&&e.__reactInternalMemoizedMergedChildContext||Nn,Wn=ae.current,j(ae,e),j(me,me.current),!0}function Es(e,n,t){var r=e.stateNode;if(!r)throw Error(x(169));t?(e=Xu(e,n,Wn),r.__reactInternalMemoizedMergedChildContext=e,W(me),W(ae),j(ae,e)):W(me),j(me,t)}var Xe=null,Ll=!1,No=!1;function Gu(e){Xe===null?Xe=[e]:Xe.push(e)}function cf(e){Ll=!0,Gu(e)}function En(){if(!No&&Xe!==null){No=!0;var e=0,n=R;try{var t=Xe;for(R=1;e<t.length;e++){var r=t[e];do r=r(!0);while(r!==null)}Xe=null,Ll=!1}catch(l){throw Xe!==null&&(Xe=Xe.slice(e+1)),wu(Mi,En),l}finally{R=n,No=!1}}return null}var tt=[],rt=0,dl=null,fl=0,_e=[],Ee=0,Un=null,Ge=1,Ze="";function Mn(e,n){tt[rt++]=fl,tt[rt++]=dl,dl=e,fl=n}function Zu(e,n,t){_e[Ee++]=Ge,_e[Ee++]=Ze,_e[Ee++]=Un,Un=e;var r=Ge;e=Ze;var l=32-Fe(r)-1;r&=~(1<<l),t+=1;var o=32-Fe(n)+l;if(30<o){var i=l-l%5;o=(r&(1<<i)-1).toString(32),r>>=i,l-=i,Ge=1<<32-Fe(n)+l|t<<l|r,Ze=o+e}else Ge=1<<o|t<<l|r,Ze=e}function Bi(e){e.return!==null&&(Mn(e,1),Zu(e,1,0))}function Ai(e){for(;e===dl;)dl=tt[--rt],tt[rt]=null,fl=tt[--rt],tt[rt]=null;for(;e===Un;)Un=_e[--Ee],_e[Ee]=null,Ze=_e[--Ee],_e[Ee]=null,Ge=_e[--Ee],_e[Ee]=null}var xe=null,ye=null,U=!1,je=null;function bu(e,n){var t=ze(5,null,null,0);t.elementType="DELETED",t.stateNode=n,t.return=e,n=e.deletions,n===null?(e.deletions=[t],e.flags|=16):n.push(t)}function zs(e,n){switch(e.tag){case 5:var t=e.type;return n=n.nodeType!==1||t.toLowerCase()!==n.nodeName.toLowerCase()?null:n,n!==null?(e.stateNode=n,xe=e,ye=vn(n.firstChild),!0):!1;case 6:return n=e.pendingProps===""||n.nodeType!==3?null:n,n!==null?(e.stateNode=n,xe=e,ye=null,!0):!1;case 13:return n=n.nodeType!==8?null:n,n!==null?(t=Un!==null?{id:Ge,overflow:Ze}:null,e.memoizedState={dehydrated:n,treeContext:t,retryLane:1073741824},t=ze(18,null,null,0),t.stateNode=n,t.return=e,e.child=t,xe=e,ye=null,!0):!1;default:return!1}}function oi(e){return(e.mode&1)!==0&&(e.flags&128)===0}function ii(e){if(U){var n=ye;if(n){var t=n;if(!zs(e,n)){if(oi(e))throw Error(x(418));n=vn(t.nextSibling);var r=xe;n&&zs(e,n)?bu(r,t):(e.flags=e.flags&-4097|2,U=!1,xe=e)}}else{if(oi(e))throw Error(x(418));e.flags=e.flags&-4097|2,U=!1,xe=e}}}function Ps(e){for(e=e.return;e!==null&&e.tag!==5&&e.tag!==3&&e.tag!==13;)e=e.return;xe=e}function Br(e){if(e!==xe)return!1;if(!U)return Ps(e),U=!0,!1;var n;if((n=e.tag!==3)&&!(n=e.tag!==5)&&(n=e.type,n=n!=="head"&&n!=="body"&&!ni(e.type,e.memoizedProps)),n&&(n=ye)){if(oi(e))throw Ju(),Error(x(418));for(;n;)bu(e,n),n=vn(n.nextSibling)}if(Ps(e),e.tag===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(x(317));e:{for(e=e.nextSibling,n=0;e;){if(e.nodeType===8){var t=e.data;if(t==="/$"){if(n===0){ye=vn(e.nextSibling);break e}n--}else t!=="$"&&t!=="$!"&&t!=="$?"||n++}e=e.nextSibling}ye=null}}else ye=xe?vn(e.stateNode.nextSibling):null;return!0}function Ju(){for(var e=ye;e;)e=vn(e.nextSibling)}function gt(){ye=xe=null,U=!1}function Vi(e){je===null?je=[e]:je.push(e)}var pf=tn.ReactCurrentBatchConfig;function Mt(e,n,t){if(e=t.ref,e!==null&&typeof e!="function"&&typeof e!="object"){if(t._owner){if(t=t._owner,t){if(t.tag!==1)throw Error(x(309));var r=t.stateNode}if(!r)throw Error(x(147,e));var l=r,o=""+e;return n!==null&&n.ref!==null&&typeof n.ref=="function"&&n.ref._stringRef===o?n.ref:(n=function(i){var a=l.refs;i===null?delete a[o]:a[o]=i},n._stringRef=o,n)}if(typeof e!="string")throw Error(x(284));if(!t._owner)throw Error(x(290,e))}return e}function Ar(e,n){throw e=Object.prototype.toString.call(n),Error(x(31,e==="[object Object]"?"object with keys {"+Object.keys(n).join(", ")+"}":e))}function Is(e){var n=e._init;return n(e._payload)}function qu(e){function n(u,c){if(e){var d=u.deletions;d===null?(u.deletions=[c],u.flags|=16):d.push(c)}}function t(u,c){if(!e)return null;for(;c!==null;)n(u,c),c=c.sibling;return null}function r(u,c){for(u=new Map;c!==null;)c.key!==null?u.set(c.key,c):u.set(c.index,c),c=c.sibling;return u}function l(u,c){return u=kn(u,c),u.index=0,u.sibling=null,u}function o(u,c,d){return u.index=d,e?(d=u.alternate,d!==null?(d=d.index,d<c?(u.flags|=2,c):d):(u.flags|=2,c)):(u.flags|=1048576,c)}function i(u){return e&&u.alternate===null&&(u.flags|=2),u}function a(u,c,d,h){return c===null||c.tag!==6?(c=Lo(d,u.mode,h),c.return=u,c):(c=l(c,d),c.return=u,c)}function s(u,c,d,h){var k=d.type;return k===Zn?v(u,c,d.props.children,h,d.key):c!==null&&(c.elementType===k||typeof k=="object"&&k!==null&&k.$$typeof===sn&&Is(k)===c.type)?(h=l(c,d.props),h.ref=Mt(u,c,d),h.return=u,h):(h=el(d.type,d.key,d.props,null,u.mode,h),h.ref=Mt(u,c,d),h.return=u,h)}function p(u,c,d,h){return c===null||c.tag!==4||c.stateNode.containerInfo!==d.containerInfo||c.stateNode.implementation!==d.implementation?(c=Mo(d,u.mode,h),c.return=u,c):(c=l(c,d.children||[]),c.return=u,c)}function v(u,c,d,h,k){return c===null||c.tag!==7?(c=Fn(d,u.mode,h,k),c.return=u,c):(c=l(c,d),c.return=u,c)}function m(u,c,d){if(typeof c=="string"&&c!==""||typeof c=="number")return c=Lo(""+c,u.mode,d),c.return=u,c;if(typeof c=="object"&&c!==null){switch(c.$$typeof){case Er:return d=el(c.type,c.key,c.props,null,u.mode,d),d.ref=Mt(u,null,c),d.return=u,d;case Gn:return c=Mo(c,u.mode,d),c.return=u,c;case sn:var h=c._init;return m(u,h(c._payload),d)}if(jt(c)||zt(c))return c=Fn(c,u.mode,d,null),c.return=u,c;Ar(u,c)}return null}function f(u,c,d,h){var k=c!==null?c.key:null;if(typeof d=="string"&&d!==""||typeof d=="number")return k!==null?null:a(u,c,""+d,h);if(typeof d=="object"&&d!==null){switch(d.$$typeof){case Er:return d.key===k?s(u,c,d,h):null;case Gn:return d.key===k?p(u,c,d,h):null;case sn:return k=d._init,f(u,c,k(d._payload),h)}if(jt(d)||zt(d))return k!==null?null:v(u,c,d,h,null);Ar(u,d)}return null}function w(u,c,d,h,k){if(typeof h=="string"&&h!==""||typeof h=="number")return u=u.get(d)||null,a(c,u,""+h,k);if(typeof h=="object"&&h!==null){switch(h.$$typeof){case Er:return u=u.get(h.key===null?d:h.key)||null,s(c,u,h,k);case Gn:return u=u.get(h.key===null?d:h.key)||null,p(c,u,h,k);case sn:var _=h._init;return w(u,c,d,_(h._payload),k)}if(jt(h)||zt(h))return u=u.get(d)||null,v(c,u,h,k,null);Ar(c,h)}return null}function S(u,c,d,h){for(var k=null,_=null,z=c,P=c=0,G=null;z!==null&&P<d.length;P++){z.index>P?(G=z,z=null):G=z.sibling;var T=f(u,z,d[P],h);if(T===null){z===null&&(z=G);break}e&&z&&T.alternate===null&&n(u,z),c=o(T,c,P),_===null?k=T:_.sibling=T,_=T,z=G}if(P===d.length)return t(u,z),U&&Mn(u,P),k;if(z===null){for(;P<d.length;P++)z=m(u,d[P],h),z!==null&&(c=o(z,c,P),_===null?k=z:_.sibling=z,_=z);return U&&Mn(u,P),k}for(z=r(u,z);P<d.length;P++)G=w(z,u,P,d[P],h),G!==null&&(e&&G.alternate!==null&&z.delete(G.key===null?P:G.key),c=o(G,c,P),_===null?k=G:_.sibling=G,_=G);return e&&z.forEach(function(rn){return n(u,rn)}),U&&Mn(u,P),k}function C(u,c,d,h){var k=zt(d);if(typeof k!="function")throw Error(x(150));if(d=k.call(d),d==null)throw Error(x(151));for(var _=k=null,z=c,P=c=0,G=null,T=d.next();z!==null&&!T.done;P++,T=d.next()){z.index>P?(G=z,z=null):G=z.sibling;var rn=f(u,z,T.value,h);if(rn===null){z===null&&(z=G);break}e&&z&&rn.alternate===null&&n(u,z),c=o(rn,c,P),_===null?k=rn:_.sibling=rn,_=rn,z=G}if(T.done)return t(u,z),U&&Mn(u,P),k;if(z===null){for(;!T.done;P++,T=d.next())T=m(u,T.value,h),T!==null&&(c=o(T,c,P),_===null?k=T:_.sibling=T,_=T);return U&&Mn(u,P),k}for(z=r(u,z);!T.done;P++,T=d.next())T=w(z,u,P,T.value,h),T!==null&&(e&&T.alternate!==null&&z.delete(T.key===null?P:T.key),c=o(T,c,P),_===null?k=T:_.sibling=T,_=T);return e&&z.forEach(function(xp){return n(u,xp)}),U&&Mn(u,P),k}function O(u,c,d,h){if(typeof d=="object"&&d!==null&&d.type===Zn&&d.key===null&&(d=d.props.children),typeof d=="object"&&d!==null){switch(d.$$typeof){case Er:e:{for(var k=d.key,_=c;_!==null;){if(_.key===k){if(k=d.type,k===Zn){if(_.tag===7){t(u,_.sibling),c=l(_,d.props.children),c.return=u,u=c;break e}}else if(_.elementType===k||typeof k=="object"&&k!==null&&k.$$typeof===sn&&Is(k)===_.type){t(u,_.sibling),c=l(_,d.props),c.ref=Mt(u,_,d),c.return=u,u=c;break e}t(u,_);break}else n(u,_);_=_.sibling}d.type===Zn?(c=Fn(d.props.children,u.mode,h,d.key),c.return=u,u=c):(h=el(d.type,d.key,d.props,null,u.mode,h),h.ref=Mt(u,c,d),h.return=u,u=h)}return i(u);case Gn:e:{for(_=d.key;c!==null;){if(c.key===_)if(c.tag===4&&c.stateNode.containerInfo===d.containerInfo&&c.stateNode.implementation===d.implementation){t(u,c.sibling),c=l(c,d.children||[]),c.return=u,u=c;break e}else{t(u,c);break}else n(u,c);c=c.sibling}c=Mo(d,u.mode,h),c.return=u,u=c}return i(u);case sn:return _=d._init,O(u,c,_(d._payload),h)}if(jt(d))return S(u,c,d,h);if(zt(d))return C(u,c,d,h);Ar(u,d)}return typeof d=="string"&&d!==""||typeof d=="number"?(d=""+d,c!==null&&c.tag===6?(t(u,c.sibling),c=l(c,d),c.return=u,u=c):(t(u,c),c=Lo(d,u.mode,h),c.return=u,u=c),i(u)):t(u,c)}return O}var ht=qu(!0),ec=qu(!1),ml=_n(null),gl=null,lt=null,Hi=null;function $i(){Hi=lt=gl=null}function Qi(e){var n=ml.current;W(ml),e._currentValue=n}function ai(e,n,t){for(;e!==null;){var r=e.alternate;if((e.childLanes&n)!==n?(e.childLanes|=n,r!==null&&(r.childLanes|=n)):r!==null&&(r.childLanes&n)!==n&&(r.childLanes|=n),e===t)break;e=e.return}}function pt(e,n){gl=e,Hi=lt=null,e=e.dependencies,e!==null&&e.firstContext!==null&&((e.lanes&n)!==0&&(fe=!0),e.firstContext=null)}function Ie(e){var n=e._currentValue;if(Hi!==e)if(e={context:e,memoizedValue:n,next:null},lt===null){if(gl===null)throw Error(x(308));lt=e,gl.dependencies={lanes:0,firstContext:e}}else lt=lt.next=e;return n}var On=null;function Ki(e){On===null?On=[e]:On.push(e)}function nc(e,n,t,r){var l=n.interleaved;return l===null?(t.next=t,Ki(n)):(t.next=l.next,l.next=t),n.interleaved=t,en(e,r)}function en(e,n){e.lanes|=n;var t=e.alternate;for(t!==null&&(t.lanes|=n),t=e,e=e.return;e!==null;)e.childLanes|=n,t=e.alternate,t!==null&&(t.childLanes|=n),t=e,e=e.return;return t.tag===3?t.stateNode:null}var un=!1;function Yi(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function tc(e,n){e=e.updateQueue,n.updateQueue===e&&(n.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,effects:e.effects})}function be(e,n){return{eventTime:e,lane:n,tag:0,payload:null,callback:null,next:null}}function yn(e,n,t){var r=e.updateQueue;if(r===null)return null;if(r=r.shared,(M&2)!==0){var l=r.pending;return l===null?n.next=n:(n.next=l.next,l.next=n),r.pending=n,en(e,t)}return l=r.interleaved,l===null?(n.next=n,Ki(r)):(n.next=l.next,l.next=n),r.interleaved=n,en(e,t)}function Xr(e,n,t){if(n=n.updateQueue,n!==null&&(n=n.shared,(t&4194240)!==0)){var r=n.lanes;r&=e.pendingLanes,t|=r,n.lanes=t,Ti(e,t)}}function Ls(e,n){var t=e.updateQueue,r=e.alternate;if(r!==null&&(r=r.updateQueue,t===r)){var l=null,o=null;if(t=t.firstBaseUpdate,t!==null){do{var i={eventTime:t.eventTime,lane:t.lane,tag:t.tag,payload:t.payload,callback:t.callback,next:null};o===null?l=o=i:o=o.next=i,t=t.next}while(t!==null);o===null?l=o=n:o=o.next=n}else l=o=n;t={baseState:r.baseState,firstBaseUpdate:l,lastBaseUpdate:o,shared:r.shared,effects:r.effects},e.updateQueue=t;return}e=t.lastBaseUpdate,e===null?t.firstBaseUpdate=n:e.next=n,t.lastBaseUpdate=n}function hl(e,n,t,r){var l=e.updateQueue;un=!1;var o=l.firstBaseUpdate,i=l.lastBaseUpdate,a=l.shared.pending;if(a!==null){l.shared.pending=null;var s=a,p=s.next;s.next=null,i===null?o=p:i.next=p,i=s;var v=e.alternate;v!==null&&(v=v.updateQueue,a=v.lastBaseUpdate,a!==i&&(a===null?v.firstBaseUpdate=p:a.next=p,v.lastBaseUpdate=s))}if(o!==null){var m=l.baseState;i=0,v=p=s=null,a=o;do{var f=a.lane,w=a.eventTime;if((r&f)===f){v!==null&&(v=v.next={eventTime:w,lane:0,tag:a.tag,payload:a.payload,callback:a.callback,next:null});e:{var S=e,C=a;switch(f=n,w=t,C.tag){case 1:if(S=C.payload,typeof S=="function"){m=S.call(w,m,f);break e}m=S;break e;case 3:S.flags=S.flags&-65537|128;case 0:if(S=C.payload,f=typeof S=="function"?S.call(w,m,f):S,f==null)break e;m=V({},m,f);break e;case 2:un=!0}}a.callback!==null&&a.lane!==0&&(e.flags|=64,f=l.effects,f===null?l.effects=[a]:f.push(a))}else w={eventTime:w,lane:f,tag:a.tag,payload:a.payload,callback:a.callback,next:null},v===null?(p=v=w,s=m):v=v.next=w,i|=f;if(a=a.next,a===null){if(a=l.shared.pending,a===null)break;f=a,a=f.next,f.next=null,l.lastBaseUpdate=f,l.shared.pending=null}}while(!0);if(v===null&&(s=m),l.baseState=s,l.firstBaseUpdate=p,l.lastBaseUpdate=v,n=l.shared.interleaved,n!==null){l=n;do i|=l.lane,l=l.next;while(l!==n)}else o===null&&(l.shared.lanes=0);An|=i,e.lanes=i,e.memoizedState=m}}function Ms(e,n,t){if(e=n.effects,n.effects=null,e!==null)for(n=0;n<e.length;n++){var r=e[n],l=r.callback;if(l!==null){if(r.callback=null,r=t,typeof l!="function")throw Error(x(191,l));l.call(r)}}}var mr={},Qe=_n(mr),or=_n(mr),ir=_n(mr);function Dn(e){if(e===mr)throw Error(x(174));return e}function Xi(e,n){switch(j(ir,n),j(or,e),j(Qe,mr),e=n.nodeType,e){case 9:case 11:n=(n=n.documentElement)?n.namespaceURI:Ao(null,"");break;default:e=e===8?n.parentNode:n,n=e.namespaceURI||null,e=e.tagName,n=Ao(n,e)}W(Qe),j(Qe,n)}function vt(){W(Qe),W(or),W(ir)}function rc(e){Dn(ir.current);var n=Dn(Qe.current),t=Ao(n,e.type);n!==t&&(j(or,e),j(Qe,t))}function Gi(e){or.current===e&&(W(Qe),W(or))}var B=_n(0);function vl(e){for(var n=e;n!==null;){if(n.tag===13){var t=n.memoizedState;if(t!==null&&(t=t.dehydrated,t===null||t.data==="$?"||t.data==="$!"))return n}else if(n.tag===19&&n.memoizedProps.revealOrder!==void 0){if((n.flags&128)!==0)return n}else if(n.child!==null){n.child.return=n,n=n.child;continue}if(n===e)break;for(;n.sibling===null;){if(n.return===null||n.return===e)return null;n=n.return}n.sibling.return=n.return,n=n.sibling}return null}var Co=[];function Zi(){for(var e=0;e<Co.length;e++)Co[e]._workInProgressVersionPrimary=null;Co.length=0}var Gr=tn.ReactCurrentDispatcher,_o=tn.ReactCurrentBatchConfig,Bn=0,A=null,K=null,b=null,yl=!1,$t=!1,ar=0,df=0;function le(){throw Error(x(321))}function bi(e,n){if(n===null)return!1;for(var t=0;t<n.length&&t<e.length;t++)if(!Ue(e[t],n[t]))return!1;return!0}function Ji(e,n,t,r,l,o){if(Bn=o,A=n,n.memoizedState=null,n.updateQueue=null,n.lanes=0,Gr.current=e===null||e.memoizedState===null?hf:vf,e=t(r,l),$t){o=0;do{if($t=!1,ar=0,25<=o)throw Error(x(301));o+=1,b=K=null,n.updateQueue=null,Gr.current=yf,e=t(r,l)}while($t)}if(Gr.current=xl,n=K!==null&&K.next!==null,Bn=0,b=K=A=null,yl=!1,n)throw Error(x(300));return e}function qi(){var e=ar!==0;return ar=0,e}function Ve(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return b===null?A.memoizedState=b=e:b=b.next=e,b}function Le(){if(K===null){var e=A.alternate;e=e!==null?e.memoizedState:null}else e=K.next;var n=b===null?A.memoizedState:b.next;if(n!==null)b=n,K=e;else{if(e===null)throw Error(x(310));K=e,e={memoizedState:K.memoizedState,baseState:K.baseState,baseQueue:K.baseQueue,queue:K.queue,next:null},b===null?A.memoizedState=b=e:b=b.next=e}return b}function sr(e,n){return typeof n=="function"?n(e):n}function Eo(e){var n=Le(),t=n.queue;if(t===null)throw Error(x(311));t.lastRenderedReducer=e;var r=K,l=r.baseQueue,o=t.pending;if(o!==null){if(l!==null){var i=l.next;l.next=o.next,o.next=i}r.baseQueue=l=o,t.pending=null}if(l!==null){o=l.next,r=r.baseState;var a=i=null,s=null,p=o;do{var v=p.lane;if((Bn&v)===v)s!==null&&(s=s.next={lane:0,action:p.action,hasEagerState:p.hasEagerState,eagerState:p.eagerState,next:null}),r=p.hasEagerState?p.eagerState:e(r,p.action);else{var m={lane:v,action:p.action,hasEagerState:p.hasEagerState,eagerState:p.eagerState,next:null};s===null?(a=s=m,i=r):s=s.next=m,A.lanes|=v,An|=v}p=p.next}while(p!==null&&p!==o);s===null?i=r:s.next=a,Ue(r,n.memoizedState)||(fe=!0),n.memoizedState=r,n.baseState=i,n.baseQueue=s,t.lastRenderedState=r}if(e=t.interleaved,e!==null){l=e;do o=l.lane,A.lanes|=o,An|=o,l=l.next;while(l!==e)}else l===null&&(t.lanes=0);return[n.memoizedState,t.dispatch]}function zo(e){var n=Le(),t=n.queue;if(t===null)throw Error(x(311));t.lastRenderedReducer=e;var r=t.dispatch,l=t.pending,o=n.memoizedState;if(l!==null){t.pending=null;var i=l=l.next;do o=e(o,i.action),i=i.next;while(i!==l);Ue(o,n.memoizedState)||(fe=!0),n.memoizedState=o,n.baseQueue===null&&(n.baseState=o),t.lastRenderedState=o}return[o,r]}function lc(){}function oc(e,n){var t=A,r=Le(),l=n(),o=!Ue(r.memoizedState,l);if(o&&(r.memoizedState=l,fe=!0),r=r.queue,ea(sc.bind(null,t,r,e),[e]),r.getSnapshot!==n||o||b!==null&&b.memoizedState.tag&1){if(t.flags|=2048,ur(9,ac.bind(null,t,r,l,n),void 0,null),J===null)throw Error(x(349));(Bn&30)!==0||ic(t,n,l)}return l}function ic(e,n,t){e.flags|=16384,e={getSnapshot:n,value:t},n=A.updateQueue,n===null?(n={lastEffect:null,stores:null},A.updateQueue=n,n.stores=[e]):(t=n.stores,t===null?n.stores=[e]:t.push(e))}function ac(e,n,t,r){n.value=t,n.getSnapshot=r,uc(n)&&cc(e)}function sc(e,n,t){return t(function(){uc(n)&&cc(e)})}function uc(e){var n=e.getSnapshot;e=e.value;try{var t=n();return!Ue(e,t)}catch{return!0}}function cc(e){var n=en(e,1);n!==null&&We(n,e,1,-1)}function Ts(e){var n=Ve();return typeof e=="function"&&(e=e()),n.memoizedState=n.baseState=e,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:sr,lastRenderedState:e},n.queue=e,e=e.dispatch=gf.bind(null,A,e),[n.memoizedState,e]}function ur(e,n,t,r){return e={tag:e,create:n,destroy:t,deps:r,next:null},n=A.updateQueue,n===null?(n={lastEffect:null,stores:null},A.updateQueue=n,n.lastEffect=e.next=e):(t=n.lastEffect,t===null?n.lastEffect=e.next=e:(r=t.next,t.next=e,e.next=r,n.lastEffect=e)),e}function pc(){return Le().memoizedState}function Zr(e,n,t,r){var l=Ve();A.flags|=e,l.memoizedState=ur(1|n,t,void 0,r===void 0?null:r)}function Ml(e,n,t,r){var l=Le();r=r===void 0?null:r;var o=void 0;if(K!==null){var i=K.memoizedState;if(o=i.destroy,r!==null&&bi(r,i.deps)){l.memoizedState=ur(n,t,o,r);return}}A.flags|=e,l.memoizedState=ur(1|n,t,o,r)}function Rs(e,n){return Zr(8390656,8,e,n)}function ea(e,n){return Ml(2048,8,e,n)}function dc(e,n){return Ml(4,2,e,n)}function fc(e,n){return Ml(4,4,e,n)}function mc(e,n){if(typeof n=="function")return e=e(),n(e),function(){n(null)};if(n!=null)return e=e(),n.current=e,function(){n.current=null}}function gc(e,n,t){return t=t!=null?t.concat([e]):null,Ml(4,4,mc.bind(null,n,e),t)}function na(){}function hc(e,n){var t=Le();n=n===void 0?null:n;var r=t.memoizedState;return r!==null&&n!==null&&bi(n,r[1])?r[0]:(t.memoizedState=[e,n],e)}function vc(e,n){var t=Le();n=n===void 0?null:n;var r=t.memoizedState;return r!==null&&n!==null&&bi(n,r[1])?r[0]:(e=e(),t.memoizedState=[e,n],e)}function yc(e,n,t){return(Bn&21)===0?(e.baseState&&(e.baseState=!1,fe=!0),e.memoizedState=t):(Ue(t,n)||(t=Nu(),A.lanes|=t,An|=t,e.baseState=!0),n)}function ff(e,n){var t=R;R=t!==0&&4>t?t:4,e(!0);var r=_o.transition;_o.transition={};try{e(!1),n()}finally{R=t,_o.transition=r}}function xc(){return Le().memoizedState}function mf(e,n,t){var r=wn(e);if(t={lane:r,action:t,hasEagerState:!1,eagerState:null,next:null},wc(e))kc(n,t);else if(t=nc(e,n,t,r),t!==null){var l=ce();We(t,e,r,l),Sc(t,n,r)}}function gf(e,n,t){var r=wn(e),l={lane:r,action:t,hasEagerState:!1,eagerState:null,next:null};if(wc(e))kc(n,l);else{var o=e.alternate;if(e.lanes===0&&(o===null||o.lanes===0)&&(o=n.lastRenderedReducer,o!==null))try{var i=n.lastRenderedState,a=o(i,t);if(l.hasEagerState=!0,l.eagerState=a,Ue(a,i)){var s=n.interleaved;s===null?(l.next=l,Ki(n)):(l.next=s.next,s.next=l),n.interleaved=l;return}}catch{}t=nc(e,n,l,r),t!==null&&(l=ce(),We(t,e,r,l),Sc(t,n,r))}}function wc(e){var n=e.alternate;return e===A||n!==null&&n===A}function kc(e,n){$t=yl=!0;var t=e.pending;t===null?n.next=n:(n.next=t.next,t.next=n),e.pending=n}function Sc(e,n,t){if((t&4194240)!==0){var r=n.lanes;r&=e.pendingLanes,t|=r,n.lanes=t,Ti(e,t)}}var xl={readContext:Ie,useCallback:le,useContext:le,useEffect:le,useImperativeHandle:le,useInsertionEffect:le,useLayoutEffect:le,useMemo:le,useReducer:le,useRef:le,useState:le,useDebugValue:le,useDeferredValue:le,useTransition:le,useMutableSource:le,useSyncExternalStore:le,useId:le,unstable_isNewReconciler:!1},hf={readContext:Ie,useCallback:function(e,n){return Ve().memoizedState=[e,n===void 0?null:n],e},useContext:Ie,useEffect:Rs,useImperativeHandle:function(e,n,t){return t=t!=null?t.concat([e]):null,Zr(4194308,4,mc.bind(null,n,e),t)},useLayoutEffect:function(e,n){return Zr(4194308,4,e,n)},useInsertionEffect:function(e,n){return Zr(4,2,e,n)},useMemo:function(e,n){var t=Ve();return n=n===void 0?null:n,e=e(),t.memoizedState=[e,n],e},useReducer:function(e,n,t){var r=Ve();return n=t!==void 0?t(n):n,r.memoizedState=r.baseState=n,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:n},r.queue=e,e=e.dispatch=mf.bind(null,A,e),[r.memoizedState,e]},useRef:function(e){var n=Ve();return e={current:e},n.memoizedState=e},useState:Ts,useDebugValue:na,useDeferredValue:function(e){return Ve().memoizedState=e},useTransition:function(){var e=Ts(!1),n=e[0];return e=ff.bind(null,e[1]),Ve().memoizedState=e,[n,e]},useMutableSource:function(){},useSyncExternalStore:function(e,n,t){var r=A,l=Ve();if(U){if(t===void 0)throw Error(x(407));t=t()}else{if(t=n(),J===null)throw Error(x(349));(Bn&30)!==0||ic(r,n,t)}l.memoizedState=t;var o={value:t,getSnapshot:n};return l.queue=o,Rs(sc.bind(null,r,o,e),[e]),r.flags|=2048,ur(9,ac.bind(null,r,o,t,n),void 0,null),t},useId:function(){var e=Ve(),n=J.identifierPrefix;if(U){var t=Ze,r=Ge;t=(r&~(1<<32-Fe(r)-1)).toString(32)+t,n=":"+n+"R"+t,t=ar++,0<t&&(n+="H"+t.toString(32)),n+=":"}else t=df++,n=":"+n+"r"+t.toString(32)+":";return e.memoizedState=n},unstable_isNewReconciler:!1},vf={readContext:Ie,useCallback:hc,useContext:Ie,useEffect:ea,useImperativeHandle:gc,useInsertionEffect:dc,useLayoutEffect:fc,useMemo:vc,useReducer:Eo,useRef:pc,useState:function(){return Eo(sr)},useDebugValue:na,useDeferredValue:function(e){var n=Le();return yc(n,K.memoizedState,e)},useTransition:function(){var e=Eo(sr)[0],n=Le().memoizedState;return[e,n]},useMutableSource:lc,useSyncExternalStore:oc,useId:xc,unstable_isNewReconciler:!1},yf={readContext:Ie,useCallback:hc,useContext:Ie,useEffect:ea,useImperativeHandle:gc,useInsertionEffect:dc,useLayoutEffect:fc,useMemo:vc,useReducer:zo,useRef:pc,useState:function(){return zo(sr)},useDebugValue:na,useDeferredValue:function(e){var n=Le();return K===null?n.memoizedState=e:yc(n,K.memoizedState,e)},useTransition:function(){var e=zo(sr)[0],n=Le().memoizedState;return[e,n]},useMutableSource:lc,useSyncExternalStore:oc,useId:xc,unstable_isNewReconciler:!1};function Oe(e,n){if(e&&e.defaultProps){n=V({},n),e=e.defaultProps;for(var t in e)n[t]===void 0&&(n[t]=e[t]);return n}return n}function si(e,n,t,r){n=e.memoizedState,t=t(r,n),t=t==null?n:V({},n,t),e.memoizedState=t,e.lanes===0&&(e.updateQueue.baseState=t)}var Tl={isMounted:function(e){return(e=e._reactInternals)?$n(e)===e:!1},enqueueSetState:function(e,n,t){e=e._reactInternals;var r=ce(),l=wn(e),o=be(r,l);o.payload=n,t!=null&&(o.callback=t),n=yn(e,o,l),n!==null&&(We(n,e,l,r),Xr(n,e,l))},enqueueReplaceState:function(e,n,t){e=e._reactInternals;var r=ce(),l=wn(e),o=be(r,l);o.tag=1,o.payload=n,t!=null&&(o.callback=t),n=yn(e,o,l),n!==null&&(We(n,e,l,r),Xr(n,e,l))},enqueueForceUpdate:function(e,n){e=e._reactInternals;var t=ce(),r=wn(e),l=be(t,r);l.tag=2,n!=null&&(l.callback=n),n=yn(e,l,r),n!==null&&(We(n,e,r,t),Xr(n,e,r))}};function Os(e,n,t,r,l,o,i){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(r,o,i):n.prototype&&n.prototype.isPureReactComponent?!nr(t,r)||!nr(l,o):!0}function Nc(e,n,t){var r=!1,l=Nn,o=n.contextType;return typeof o=="object"&&o!==null?o=Ie(o):(l=ge(n)?Wn:ae.current,r=n.contextTypes,o=(r=r!=null)?mt(e,l):Nn),n=new n(t,o),e.memoizedState=n.state!==null&&n.state!==void 0?n.state:null,n.updater=Tl,e.stateNode=n,n._reactInternals=e,r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=l,e.__reactInternalMemoizedMaskedChildContext=o),n}function Ds(e,n,t,r){e=n.state,typeof n.componentWillReceiveProps=="function"&&n.componentWillReceiveProps(t,r),typeof n.UNSAFE_componentWillReceiveProps=="function"&&n.UNSAFE_componentWillReceiveProps(t,r),n.state!==e&&Tl.enqueueReplaceState(n,n.state,null)}function ui(e,n,t,r){var l=e.stateNode;l.props=t,l.state=e.memoizedState,l.refs={},Yi(e);var o=n.contextType;typeof o=="object"&&o!==null?l.context=Ie(o):(o=ge(n)?Wn:ae.current,l.context=mt(e,o)),l.state=e.memoizedState,o=n.getDerivedStateFromProps,typeof o=="function"&&(si(e,n,o,t),l.state=e.memoizedState),typeof n.getDerivedStateFromProps=="function"||typeof l.getSnapshotBeforeUpdate=="function"||typeof l.UNSAFE_componentWillMount!="function"&&typeof l.componentWillMount!="function"||(n=l.state,typeof l.componentWillMount=="function"&&l.componentWillMount(),typeof l.UNSAFE_componentWillMount=="function"&&l.UNSAFE_componentWillMount(),n!==l.state&&Tl.enqueueReplaceState(l,l.state,null),hl(e,t,l,r),l.state=e.memoizedState),typeof l.componentDidMount=="function"&&(e.flags|=4194308)}function yt(e,n){try{var t="",r=n;do t+=Yp(r),r=r.return;while(r);var l=t}catch(o){l=`
Error generating stack: `+o.message+`
`+o.stack}return{value:e,source:n,stack:l,digest:null}}function Po(e,n,t){return{value:e,source:null,stack:t??null,digest:n??null}}function ci(e,n){try{console.error(n.value)}catch(t){setTimeout(function(){throw t})}}var xf=typeof WeakMap=="function"?WeakMap:Map;function Cc(e,n,t){t=be(-1,t),t.tag=3,t.payload={element:null};var r=n.value;return t.callback=function(){kl||(kl=!0,wi=r),ci(e,n)},t}function _c(e,n,t){t=be(-1,t),t.tag=3;var r=e.type.getDerivedStateFromError;if(typeof r=="function"){var l=n.value;t.payload=function(){return r(l)},t.callback=function(){ci(e,n)}}var o=e.stateNode;return o!==null&&typeof o.componentDidCatch=="function"&&(t.callback=function(){ci(e,n),typeof r!="function"&&(xn===null?xn=new Set([this]):xn.add(this));var i=n.stack;this.componentDidCatch(n.value,{componentStack:i!==null?i:""})}),t}function js(e,n,t){var r=e.pingCache;if(r===null){r=e.pingCache=new xf;var l=new Set;r.set(n,l)}else l=r.get(n),l===void 0&&(l=new Set,r.set(n,l));l.has(t)||(l.add(t),e=Rf.bind(null,e,n,t),n.then(e,e))}function Fs(e){do{var n;if((n=e.tag===13)&&(n=e.memoizedState,n=n!==null?n.dehydrated!==null:!0),n)return e;e=e.return}while(e!==null);return null}function Ws(e,n,t,r,l){return(e.mode&1)===0?(e===n?e.flags|=65536:(e.flags|=128,t.flags|=131072,t.flags&=-52805,t.tag===1&&(t.alternate===null?t.tag=17:(n=be(-1,1),n.tag=2,yn(t,n,1))),t.lanes|=1),e):(e.flags|=65536,e.lanes=l,e)}var wf=tn.ReactCurrentOwner,fe=!1;function ue(e,n,t,r){n.child=e===null?ec(n,null,t,r):ht(n,e.child,t,r)}function Us(e,n,t,r,l){t=t.render;var o=n.ref;return pt(n,l),r=Ji(e,n,t,r,o,l),t=qi(),e!==null&&!fe?(n.updateQueue=e.updateQueue,n.flags&=-2053,e.lanes&=~l,nn(e,n,l)):(U&&t&&Bi(n),n.flags|=1,ue(e,n,r,l),n.child)}function Bs(e,n,t,r,l){if(e===null){var o=t.type;return typeof o=="function"&&!ua(o)&&o.defaultProps===void 0&&t.compare===null&&t.defaultProps===void 0?(n.tag=15,n.type=o,Ec(e,n,o,r,l)):(e=el(t.type,null,r,n,n.mode,l),e.ref=n.ref,e.return=n,n.child=e)}if(o=e.child,(e.lanes&l)===0){var i=o.memoizedProps;if(t=t.compare,t=t!==null?t:nr,t(i,r)&&e.ref===n.ref)return nn(e,n,l)}return n.flags|=1,e=kn(o,r),e.ref=n.ref,e.return=n,n.child=e}function Ec(e,n,t,r,l){if(e!==null){var o=e.memoizedProps;if(nr(o,r)&&e.ref===n.ref)if(fe=!1,n.pendingProps=r=o,(e.lanes&l)!==0)(e.flags&131072)!==0&&(fe=!0);else return n.lanes=e.lanes,nn(e,n,l)}return pi(e,n,t,r,l)}function zc(e,n,t){var r=n.pendingProps,l=r.children,o=e!==null?e.memoizedState:null;if(r.mode==="hidden")if((n.mode&1)===0)n.memoizedState={baseLanes:0,cachePool:null,transitions:null},j(it,ve),ve|=t;else{if((t&1073741824)===0)return e=o!==null?o.baseLanes|t:t,n.lanes=n.childLanes=1073741824,n.memoizedState={baseLanes:e,cachePool:null,transitions:null},n.updateQueue=null,j(it,ve),ve|=e,null;n.memoizedState={baseLanes:0,cachePool:null,transitions:null},r=o!==null?o.baseLanes:t,j(it,ve),ve|=r}else o!==null?(r=o.baseLanes|t,n.memoizedState=null):r=t,j(it,ve),ve|=r;return ue(e,n,l,t),n.child}function Pc(e,n){var t=n.ref;(e===null&&t!==null||e!==null&&e.ref!==t)&&(n.flags|=512,n.flags|=2097152)}function pi(e,n,t,r,l){var o=ge(t)?Wn:ae.current;return o=mt(n,o),pt(n,l),t=Ji(e,n,t,r,o,l),r=qi(),e!==null&&!fe?(n.updateQueue=e.updateQueue,n.flags&=-2053,e.lanes&=~l,nn(e,n,l)):(U&&r&&Bi(n),n.flags|=1,ue(e,n,t,l),n.child)}function As(e,n,t,r,l){if(ge(t)){var o=!0;pl(n)}else o=!1;if(pt(n,l),n.stateNode===null)br(e,n),Nc(n,t,r),ui(n,t,r,l),r=!0;else if(e===null){var i=n.stateNode,a=n.memoizedProps;i.props=a;var s=i.context,p=t.contextType;typeof p=="object"&&p!==null?p=Ie(p):(p=ge(t)?Wn:ae.current,p=mt(n,p));var v=t.getDerivedStateFromProps,m=typeof v=="function"||typeof i.getSnapshotBeforeUpdate=="function";m||typeof i.UNSAFE_componentWillReceiveProps!="function"&&typeof i.componentWillReceiveProps!="function"||(a!==r||s!==p)&&Ds(n,i,r,p),un=!1;var f=n.memoizedState;i.state=f,hl(n,r,i,l),s=n.memoizedState,a!==r||f!==s||me.current||un?(typeof v=="function"&&(si(n,t,v,r),s=n.memoizedState),(a=un||Os(n,t,a,r,f,s,p))?(m||typeof i.UNSAFE_componentWillMount!="function"&&typeof i.componentWillMount!="function"||(typeof i.componentWillMount=="function"&&i.componentWillMount(),typeof i.UNSAFE_componentWillMount=="function"&&i.UNSAFE_componentWillMount()),typeof i.componentDidMount=="function"&&(n.flags|=4194308)):(typeof i.componentDidMount=="function"&&(n.flags|=4194308),n.memoizedProps=r,n.memoizedState=s),i.props=r,i.state=s,i.context=p,r=a):(typeof i.componentDidMount=="function"&&(n.flags|=4194308),r=!1)}else{i=n.stateNode,tc(e,n),a=n.memoizedProps,p=n.type===n.elementType?a:Oe(n.type,a),i.props=p,m=n.pendingProps,f=i.context,s=t.contextType,typeof s=="object"&&s!==null?s=Ie(s):(s=ge(t)?Wn:ae.current,s=mt(n,s));var w=t.getDerivedStateFromProps;(v=typeof w=="function"||typeof i.getSnapshotBeforeUpdate=="function")||typeof i.UNSAFE_componentWillReceiveProps!="function"&&typeof i.componentWillReceiveProps!="function"||(a!==m||f!==s)&&Ds(n,i,r,s),un=!1,f=n.memoizedState,i.state=f,hl(n,r,i,l);var S=n.memoizedState;a!==m||f!==S||me.current||un?(typeof w=="function"&&(si(n,t,w,r),S=n.memoizedState),(p=un||Os(n,t,p,r,f,S,s)||!1)?(v||typeof i.UNSAFE_componentWillUpdate!="function"&&typeof i.componentWillUpdate!="function"||(typeof i.componentWillUpdate=="function"&&i.componentWillUpdate(r,S,s),typeof i.UNSAFE_componentWillUpdate=="function"&&i.UNSAFE_componentWillUpdate(r,S,s)),typeof i.componentDidUpdate=="function"&&(n.flags|=4),typeof i.getSnapshotBeforeUpdate=="function"&&(n.flags|=1024)):(typeof i.componentDidUpdate!="function"||a===e.memoizedProps&&f===e.memoizedState||(n.flags|=4),typeof i.getSnapshotBeforeUpdate!="function"||a===e.memoizedProps&&f===e.memoizedState||(n.flags|=1024),n.memoizedProps=r,n.memoizedState=S),i.props=r,i.state=S,i.context=s,r=p):(typeof i.componentDidUpdate!="function"||a===e.memoizedProps&&f===e.memoizedState||(n.flags|=4),typeof i.getSnapshotBeforeUpdate!="function"||a===e.memoizedProps&&f===e.memoizedState||(n.flags|=1024),r=!1)}return di(e,n,t,r,o,l)}function di(e,n,t,r,l,o){Pc(e,n);var i=(n.flags&128)!==0;if(!r&&!i)return l&&Es(n,t,!1),nn(e,n,o);r=n.stateNode,wf.current=n;var a=i&&typeof t.getDerivedStateFromError!="function"?null:r.render();return n.flags|=1,e!==null&&i?(n.child=ht(n,e.child,null,o),n.child=ht(n,null,a,o)):ue(e,n,a,o),n.memoizedState=r.state,l&&Es(n,t,!0),n.child}function Ic(e){var n=e.stateNode;n.pendingContext?_s(e,n.pendingContext,n.pendingContext!==n.context):n.context&&_s(e,n.context,!1),Xi(e,n.containerInfo)}function Vs(e,n,t,r,l){return gt(),Vi(l),n.flags|=256,ue(e,n,t,r),n.child}var fi={dehydrated:null,treeContext:null,retryLane:0};function mi(e){return{baseLanes:e,cachePool:null,transitions:null}}function Lc(e,n,t){var r=n.pendingProps,l=B.current,o=!1,i=(n.flags&128)!==0,a;if((a=i)||(a=e!==null&&e.memoizedState===null?!1:(l&2)!==0),a?(o=!0,n.flags&=-129):(e===null||e.memoizedState!==null)&&(l|=1),j(B,l&1),e===null)return ii(n),e=n.memoizedState,e!==null&&(e=e.dehydrated,e!==null)?((n.mode&1)===0?n.lanes=1:e.data==="$!"?n.lanes=8:n.lanes=1073741824,null):(i=r.children,e=r.fallback,o?(r=n.mode,o=n.child,i={mode:"hidden",children:i},(r&1)===0&&o!==null?(o.childLanes=0,o.pendingProps=i):o=Dl(i,r,0,null),e=Fn(e,r,t,null),o.return=n,e.return=n,o.sibling=e,n.child=o,n.child.memoizedState=mi(t),n.memoizedState=fi,e):ta(n,i));if(l=e.memoizedState,l!==null&&(a=l.dehydrated,a!==null))return kf(e,n,i,r,a,l,t);if(o){o=r.fallback,i=n.mode,l=e.child,a=l.sibling;var s={mode:"hidden",children:r.children};return(i&1)===0&&n.child!==l?(r=n.child,r.childLanes=0,r.pendingProps=s,n.deletions=null):(r=kn(l,s),r.subtreeFlags=l.subtreeFlags&14680064),a!==null?o=kn(a,o):(o=Fn(o,i,t,null),o.flags|=2),o.return=n,r.return=n,r.sibling=o,n.child=r,r=o,o=n.child,i=e.child.memoizedState,i=i===null?mi(t):{baseLanes:i.baseLanes|t,cachePool:null,transitions:i.transitions},o.memoizedState=i,o.childLanes=e.childLanes&~t,n.memoizedState=fi,r}return o=e.child,e=o.sibling,r=kn(o,{mode:"visible",children:r.children}),(n.mode&1)===0&&(r.lanes=t),r.return=n,r.sibling=null,e!==null&&(t=n.deletions,t===null?(n.deletions=[e],n.flags|=16):t.push(e)),n.child=r,n.memoizedState=null,r}function ta(e,n){return n=Dl({mode:"visible",children:n},e.mode,0,null),n.return=e,e.child=n}function Vr(e,n,t,r){return r!==null&&Vi(r),ht(n,e.child,null,t),e=ta(n,n.pendingProps.children),e.flags|=2,n.memoizedState=null,e}function kf(e,n,t,r,l,o,i){if(t)return n.flags&256?(n.flags&=-257,r=Po(Error(x(422))),Vr(e,n,i,r)):n.memoizedState!==null?(n.child=e.child,n.flags|=128,null):(o=r.fallback,l=n.mode,r=Dl({mode:"visible",children:r.children},l,0,null),o=Fn(o,l,i,null),o.flags|=2,r.return=n,o.return=n,r.sibling=o,n.child=r,(n.mode&1)!==0&&ht(n,e.child,null,i),n.child.memoizedState=mi(i),n.memoizedState=fi,o);if((n.mode&1)===0)return Vr(e,n,i,null);if(l.data==="$!"){if(r=l.nextSibling&&l.nextSibling.dataset,r)var a=r.dgst;return r=a,o=Error(x(419)),r=Po(o,r,void 0),Vr(e,n,i,r)}if(a=(i&e.childLanes)!==0,fe||a){if(r=J,r!==null){switch(i&-i){case 4:l=2;break;case 16:l=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:l=32;break;case 536870912:l=268435456;break;default:l=0}l=(l&(r.suspendedLanes|i))!==0?0:l,l!==0&&l!==o.retryLane&&(o.retryLane=l,en(e,l),We(r,e,l,-1))}return sa(),r=Po(Error(x(421))),Vr(e,n,i,r)}return l.data==="$?"?(n.flags|=128,n.child=e.child,n=Of.bind(null,e),l._reactRetry=n,null):(e=o.treeContext,ye=vn(l.nextSibling),xe=n,U=!0,je=null,e!==null&&(_e[Ee++]=Ge,_e[Ee++]=Ze,_e[Ee++]=Un,Ge=e.id,Ze=e.overflow,Un=n),n=ta(n,r.children),n.flags|=4096,n)}function Hs(e,n,t){e.lanes|=n;var r=e.alternate;r!==null&&(r.lanes|=n),ai(e.return,n,t)}function Io(e,n,t,r,l){var o=e.memoizedState;o===null?e.memoizedState={isBackwards:n,rendering:null,renderingStartTime:0,last:r,tail:t,tailMode:l}:(o.isBackwards=n,o.rendering=null,o.renderingStartTime=0,o.last=r,o.tail=t,o.tailMode=l)}function Mc(e,n,t){var r=n.pendingProps,l=r.revealOrder,o=r.tail;if(ue(e,n,r.children,t),r=B.current,(r&2)!==0)r=r&1|2,n.flags|=128;else{if(e!==null&&(e.flags&128)!==0)e:for(e=n.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&Hs(e,t,n);else if(e.tag===19)Hs(e,t,n);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===n)break e;for(;e.sibling===null;){if(e.return===null||e.return===n)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}r&=1}if(j(B,r),(n.mode&1)===0)n.memoizedState=null;else switch(l){case"forwards":for(t=n.child,l=null;t!==null;)e=t.alternate,e!==null&&vl(e)===null&&(l=t),t=t.sibling;t=l,t===null?(l=n.child,n.child=null):(l=t.sibling,t.sibling=null),Io(n,!1,l,t,o);break;case"backwards":for(t=null,l=n.child,n.child=null;l!==null;){if(e=l.alternate,e!==null&&vl(e)===null){n.child=l;break}e=l.sibling,l.sibling=t,t=l,l=e}Io(n,!0,t,null,o);break;case"together":Io(n,!1,null,null,void 0);break;default:n.memoizedState=null}return n.child}function br(e,n){(n.mode&1)===0&&e!==null&&(e.alternate=null,n.alternate=null,n.flags|=2)}function nn(e,n,t){if(e!==null&&(n.dependencies=e.dependencies),An|=n.lanes,(t&n.childLanes)===0)return null;if(e!==null&&n.child!==e.child)throw Error(x(153));if(n.child!==null){for(e=n.child,t=kn(e,e.pendingProps),n.child=t,t.return=n;e.sibling!==null;)e=e.sibling,t=t.sibling=kn(e,e.pendingProps),t.return=n;t.sibling=null}return n.child}function Sf(e,n,t){switch(n.tag){case 3:Ic(n),gt();break;case 5:rc(n);break;case 1:ge(n.type)&&pl(n);break;case 4:Xi(n,n.stateNode.containerInfo);break;case 10:var r=n.type._context,l=n.memoizedProps.value;j(ml,r._currentValue),r._currentValue=l;break;case 13:if(r=n.memoizedState,r!==null)return r.dehydrated!==null?(j(B,B.current&1),n.flags|=128,null):(t&n.child.childLanes)!==0?Lc(e,n,t):(j(B,B.current&1),e=nn(e,n,t),e!==null?e.sibling:null);j(B,B.current&1);break;case 19:if(r=(t&n.childLanes)!==0,(e.flags&128)!==0){if(r)return Mc(e,n,t);n.flags|=128}if(l=n.memoizedState,l!==null&&(l.rendering=null,l.tail=null,l.lastEffect=null),j(B,B.current),r)break;return null;case 22:case 23:return n.lanes=0,zc(e,n,t)}return nn(e,n,t)}var Tc,gi,Rc,Oc;Tc=function(e,n){for(var t=n.child;t!==null;){if(t.tag===5||t.tag===6)e.appendChild(t.stateNode);else if(t.tag!==4&&t.child!==null){t.child.return=t,t=t.child;continue}if(t===n)break;for(;t.sibling===null;){if(t.return===null||t.return===n)return;t=t.return}t.sibling.return=t.return,t=t.sibling}};gi=function(){};Rc=function(e,n,t,r){var l=e.memoizedProps;if(l!==r){e=n.stateNode,Dn(Qe.current);var o=null;switch(t){case"input":l=Fo(e,l),r=Fo(e,r),o=[];break;case"select":l=V({},l,{value:void 0}),r=V({},r,{value:void 0}),o=[];break;case"textarea":l=Bo(e,l),r=Bo(e,r),o=[];break;default:typeof l.onClick!="function"&&typeof r.onClick=="function"&&(e.onclick=ul)}Vo(t,r);var i;t=null;for(p in l)if(!r.hasOwnProperty(p)&&l.hasOwnProperty(p)&&l[p]!=null)if(p==="style"){var a=l[p];for(i in a)a.hasOwnProperty(i)&&(t||(t={}),t[i]="")}else p!=="dangerouslySetInnerHTML"&&p!=="children"&&p!=="suppressContentEditableWarning"&&p!=="suppressHydrationWarning"&&p!=="autoFocus"&&(Xt.hasOwnProperty(p)?o||(o=[]):(o=o||[]).push(p,null));for(p in r){var s=r[p];if(a=l?.[p],r.hasOwnProperty(p)&&s!==a&&(s!=null||a!=null))if(p==="style")if(a){for(i in a)!a.hasOwnProperty(i)||s&&s.hasOwnProperty(i)||(t||(t={}),t[i]="");for(i in s)s.hasOwnProperty(i)&&a[i]!==s[i]&&(t||(t={}),t[i]=s[i])}else t||(o||(o=[]),o.push(p,t)),t=s;else p==="dangerouslySetInnerHTML"?(s=s?s.__html:void 0,a=a?a.__html:void 0,s!=null&&a!==s&&(o=o||[]).push(p,s)):p==="children"?typeof s!="string"&&typeof s!="number"||(o=o||[]).push(p,""+s):p!=="suppressContentEditableWarning"&&p!=="suppressHydrationWarning"&&(Xt.hasOwnProperty(p)?(s!=null&&p==="onScroll"&&F("scroll",e),o||a===s||(o=[])):(o=o||[]).push(p,s))}t&&(o=o||[]).push("style",t);var p=o;(n.updateQueue=p)&&(n.flags|=4)}};Oc=function(e,n,t,r){t!==r&&(n.flags|=4)};function Tt(e,n){if(!U)switch(e.tailMode){case"hidden":n=e.tail;for(var t=null;n!==null;)n.alternate!==null&&(t=n),n=n.sibling;t===null?e.tail=null:t.sibling=null;break;case"collapsed":t=e.tail;for(var r=null;t!==null;)t.alternate!==null&&(r=t),t=t.sibling;r===null?n||e.tail===null?e.tail=null:e.tail.sibling=null:r.sibling=null}}function oe(e){var n=e.alternate!==null&&e.alternate.child===e.child,t=0,r=0;if(n)for(var l=e.child;l!==null;)t|=l.lanes|l.childLanes,r|=l.subtreeFlags&14680064,r|=l.flags&14680064,l.return=e,l=l.sibling;else for(l=e.child;l!==null;)t|=l.lanes|l.childLanes,r|=l.subtreeFlags,r|=l.flags,l.return=e,l=l.sibling;return e.subtreeFlags|=r,e.childLanes=t,n}function Nf(e,n,t){var r=n.pendingProps;switch(Ai(n),n.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return oe(n),null;case 1:return ge(n.type)&&cl(),oe(n),null;case 3:return r=n.stateNode,vt(),W(me),W(ae),Zi(),r.pendingContext&&(r.context=r.pendingContext,r.pendingContext=null),(e===null||e.child===null)&&(Br(n)?n.flags|=4:e===null||e.memoizedState.isDehydrated&&(n.flags&256)===0||(n.flags|=1024,je!==null&&(Ni(je),je=null))),gi(e,n),oe(n),null;case 5:Gi(n);var l=Dn(ir.current);if(t=n.type,e!==null&&n.stateNode!=null)Rc(e,n,t,r,l),e.ref!==n.ref&&(n.flags|=512,n.flags|=2097152);else{if(!r){if(n.stateNode===null)throw Error(x(166));return oe(n),null}if(e=Dn(Qe.current),Br(n)){r=n.stateNode,t=n.type;var o=n.memoizedProps;switch(r[He]=n,r[lr]=o,e=(n.mode&1)!==0,t){case"dialog":F("cancel",r),F("close",r);break;case"iframe":case"object":case"embed":F("load",r);break;case"video":case"audio":for(l=0;l<Wt.length;l++)F(Wt[l],r);break;case"source":F("error",r);break;case"img":case"image":case"link":F("error",r),F("load",r);break;case"details":F("toggle",r);break;case"input":ba(r,o),F("invalid",r);break;case"select":r._wrapperState={wasMultiple:!!o.multiple},F("invalid",r);break;case"textarea":qa(r,o),F("invalid",r)}Vo(t,o),l=null;for(var i in o)if(o.hasOwnProperty(i)){var a=o[i];i==="children"?typeof a=="string"?r.textContent!==a&&(o.suppressHydrationWarning!==!0&&Ur(r.textContent,a,e),l=["children",a]):typeof a=="number"&&r.textContent!==""+a&&(o.suppressHydrationWarning!==!0&&Ur(r.textContent,a,e),l=["children",""+a]):Xt.hasOwnProperty(i)&&a!=null&&i==="onScroll"&&F("scroll",r)}switch(t){case"input":zr(r),Ja(r,o,!0);break;case"textarea":zr(r),es(r);break;case"select":case"option":break;default:typeof o.onClick=="function"&&(r.onclick=ul)}r=l,n.updateQueue=r,r!==null&&(n.flags|=4)}else{i=l.nodeType===9?l:l.ownerDocument,e==="http://www.w3.org/1999/xhtml"&&(e=su(t)),e==="http://www.w3.org/1999/xhtml"?t==="script"?(e=i.createElement("div"),e.innerHTML="<script><\/script>",e=e.removeChild(e.firstChild)):typeof r.is=="string"?e=i.createElement(t,{is:r.is}):(e=i.createElement(t),t==="select"&&(i=e,r.multiple?i.multiple=!0:r.size&&(i.size=r.size))):e=i.createElementNS(e,t),e[He]=n,e[lr]=r,Tc(e,n,!1,!1),n.stateNode=e;e:{switch(i=Ho(t,r),t){case"dialog":F("cancel",e),F("close",e),l=r;break;case"iframe":case"object":case"embed":F("load",e),l=r;break;case"video":case"audio":for(l=0;l<Wt.length;l++)F(Wt[l],e);l=r;break;case"source":F("error",e),l=r;break;case"img":case"image":case"link":F("error",e),F("load",e),l=r;break;case"details":F("toggle",e),l=r;break;case"input":ba(e,r),l=Fo(e,r),F("invalid",e);break;case"option":l=r;break;case"select":e._wrapperState={wasMultiple:!!r.multiple},l=V({},r,{value:void 0}),F("invalid",e);break;case"textarea":qa(e,r),l=Bo(e,r),F("invalid",e);break;default:l=r}Vo(t,l),a=l;for(o in a)if(a.hasOwnProperty(o)){var s=a[o];o==="style"?pu(e,s):o==="dangerouslySetInnerHTML"?(s=s?s.__html:void 0,s!=null&&uu(e,s)):o==="children"?typeof s=="string"?(t!=="textarea"||s!=="")&&Gt(e,s):typeof s=="number"&&Gt(e,""+s):o!=="suppressContentEditableWarning"&&o!=="suppressHydrationWarning"&&o!=="autoFocus"&&(Xt.hasOwnProperty(o)?s!=null&&o==="onScroll"&&F("scroll",e):s!=null&&Ei(e,o,s,i))}switch(t){case"input":zr(e),Ja(e,r,!1);break;case"textarea":zr(e),es(e);break;case"option":r.value!=null&&e.setAttribute("value",""+Sn(r.value));break;case"select":e.multiple=!!r.multiple,o=r.value,o!=null?at(e,!!r.multiple,o,!1):r.defaultValue!=null&&at(e,!!r.multiple,r.defaultValue,!0);break;default:typeof l.onClick=="function"&&(e.onclick=ul)}switch(t){case"button":case"input":case"select":case"textarea":r=!!r.autoFocus;break e;case"img":r=!0;break e;default:r=!1}}r&&(n.flags|=4)}n.ref!==null&&(n.flags|=512,n.flags|=2097152)}return oe(n),null;case 6:if(e&&n.stateNode!=null)Oc(e,n,e.memoizedProps,r);else{if(typeof r!="string"&&n.stateNode===null)throw Error(x(166));if(t=Dn(ir.current),Dn(Qe.current),Br(n)){if(r=n.stateNode,t=n.memoizedProps,r[He]=n,(o=r.nodeValue!==t)&&(e=xe,e!==null))switch(e.tag){case 3:Ur(r.nodeValue,t,(e.mode&1)!==0);break;case 5:e.memoizedProps.suppressHydrationWarning!==!0&&Ur(r.nodeValue,t,(e.mode&1)!==0)}o&&(n.flags|=4)}else r=(t.nodeType===9?t:t.ownerDocument).createTextNode(r),r[He]=n,n.stateNode=r}return oe(n),null;case 13:if(W(B),r=n.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(U&&ye!==null&&(n.mode&1)!==0&&(n.flags&128)===0)Ju(),gt(),n.flags|=98560,o=!1;else if(o=Br(n),r!==null&&r.dehydrated!==null){if(e===null){if(!o)throw Error(x(318));if(o=n.memoizedState,o=o!==null?o.dehydrated:null,!o)throw Error(x(317));o[He]=n}else gt(),(n.flags&128)===0&&(n.memoizedState=null),n.flags|=4;oe(n),o=!1}else je!==null&&(Ni(je),je=null),o=!0;if(!o)return n.flags&65536?n:null}return(n.flags&128)!==0?(n.lanes=t,n):(r=r!==null,r!==(e!==null&&e.memoizedState!==null)&&r&&(n.child.flags|=8192,(n.mode&1)!==0&&(e===null||(B.current&1)!==0?Y===0&&(Y=3):sa())),n.updateQueue!==null&&(n.flags|=4),oe(n),null);case 4:return vt(),gi(e,n),e===null&&tr(n.stateNode.containerInfo),oe(n),null;case 10:return Qi(n.type._context),oe(n),null;case 17:return ge(n.type)&&cl(),oe(n),null;case 19:if(W(B),o=n.memoizedState,o===null)return oe(n),null;if(r=(n.flags&128)!==0,i=o.rendering,i===null)if(r)Tt(o,!1);else{if(Y!==0||e!==null&&(e.flags&128)!==0)for(e=n.child;e!==null;){if(i=vl(e),i!==null){for(n.flags|=128,Tt(o,!1),r=i.updateQueue,r!==null&&(n.updateQueue=r,n.flags|=4),n.subtreeFlags=0,r=t,t=n.child;t!==null;)o=t,e=r,o.flags&=14680066,i=o.alternate,i===null?(o.childLanes=0,o.lanes=e,o.child=null,o.subtreeFlags=0,o.memoizedProps=null,o.memoizedState=null,o.updateQueue=null,o.dependencies=null,o.stateNode=null):(o.childLanes=i.childLanes,o.lanes=i.lanes,o.child=i.child,o.subtreeFlags=0,o.deletions=null,o.memoizedProps=i.memoizedProps,o.memoizedState=i.memoizedState,o.updateQueue=i.updateQueue,o.type=i.type,e=i.dependencies,o.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),t=t.sibling;return j(B,B.current&1|2),n.child}e=e.sibling}o.tail!==null&&$()>xt&&(n.flags|=128,r=!0,Tt(o,!1),n.lanes=4194304)}else{if(!r)if(e=vl(i),e!==null){if(n.flags|=128,r=!0,t=e.updateQueue,t!==null&&(n.updateQueue=t,n.flags|=4),Tt(o,!0),o.tail===null&&o.tailMode==="hidden"&&!i.alternate&&!U)return oe(n),null}else 2*$()-o.renderingStartTime>xt&&t!==1073741824&&(n.flags|=128,r=!0,Tt(o,!1),n.lanes=4194304);o.isBackwards?(i.sibling=n.child,n.child=i):(t=o.last,t!==null?t.sibling=i:n.child=i,o.last=i)}return o.tail!==null?(n=o.tail,o.rendering=n,o.tail=n.sibling,o.renderingStartTime=$(),n.sibling=null,t=B.current,j(B,r?t&1|2:t&1),n):(oe(n),null);case 22:case 23:return aa(),r=n.memoizedState!==null,e!==null&&e.memoizedState!==null!==r&&(n.flags|=8192),r&&(n.mode&1)!==0?(ve&1073741824)!==0&&(oe(n),n.subtreeFlags&6&&(n.flags|=8192)):oe(n),null;case 24:return null;case 25:return null}throw Error(x(156,n.tag))}function Cf(e,n){switch(Ai(n),n.tag){case 1:return ge(n.type)&&cl(),e=n.flags,e&65536?(n.flags=e&-65537|128,n):null;case 3:return vt(),W(me),W(ae),Zi(),e=n.flags,(e&65536)!==0&&(e&128)===0?(n.flags=e&-65537|128,n):null;case 5:return Gi(n),null;case 13:if(W(B),e=n.memoizedState,e!==null&&e.dehydrated!==null){if(n.alternate===null)throw Error(x(340));gt()}return e=n.flags,e&65536?(n.flags=e&-65537|128,n):null;case 19:return W(B),null;case 4:return vt(),null;case 10:return Qi(n.type._context),null;case 22:case 23:return aa(),null;case 24:return null;default:return null}}var Hr=!1,ie=!1,_f=typeof WeakSet=="function"?WeakSet:Set,E=null;function ot(e,n){var t=e.ref;if(t!==null)if(typeof t=="function")try{t(null)}catch(r){H(e,n,r)}else t.current=null}function hi(e,n,t){try{t()}catch(r){H(e,n,r)}}var $s=!1;function Ef(e,n){if(qo=il,e=Uu(),Ui(e)){if("selectionStart"in e)var t={start:e.selectionStart,end:e.selectionEnd};else e:{t=(t=e.ownerDocument)&&t.defaultView||window;var r=t.getSelection&&t.getSelection();if(r&&r.rangeCount!==0){t=r.anchorNode;var l=r.anchorOffset,o=r.focusNode;r=r.focusOffset;try{t.nodeType,o.nodeType}catch{t=null;break e}var i=0,a=-1,s=-1,p=0,v=0,m=e,f=null;n:for(;;){for(var w;m!==t||l!==0&&m.nodeType!==3||(a=i+l),m!==o||r!==0&&m.nodeType!==3||(s=i+r),m.nodeType===3&&(i+=m.nodeValue.length),(w=m.firstChild)!==null;)f=m,m=w;for(;;){if(m===e)break n;if(f===t&&++p===l&&(a=i),f===o&&++v===r&&(s=i),(w=m.nextSibling)!==null)break;m=f,f=m.parentNode}m=w}t=a===-1||s===-1?null:{start:a,end:s}}else t=null}t=t||{start:0,end:0}}else t=null;for(ei={focusedElem:e,selectionRange:t},il=!1,E=n;E!==null;)if(n=E,e=n.child,(n.subtreeFlags&1028)!==0&&e!==null)e.return=n,E=e;else for(;E!==null;){n=E;try{var S=n.alternate;if((n.flags&1024)!==0)switch(n.tag){case 0:case 11:case 15:break;case 1:if(S!==null){var C=S.memoizedProps,O=S.memoizedState,u=n.stateNode,c=u.getSnapshotBeforeUpdate(n.elementType===n.type?C:Oe(n.type,C),O);u.__reactInternalSnapshotBeforeUpdate=c}break;case 3:var d=n.stateNode.containerInfo;d.nodeType===1?d.textContent="":d.nodeType===9&&d.documentElement&&d.removeChild(d.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(x(163))}}catch(h){H(n,n.return,h)}if(e=n.sibling,e!==null){e.return=n.return,E=e;break}E=n.return}return S=$s,$s=!1,S}function Qt(e,n,t){var r=n.updateQueue;if(r=r!==null?r.lastEffect:null,r!==null){var l=r=r.next;do{if((l.tag&e)===e){var o=l.destroy;l.destroy=void 0,o!==void 0&&hi(n,t,o)}l=l.next}while(l!==r)}}function Rl(e,n){if(n=n.updateQueue,n=n!==null?n.lastEffect:null,n!==null){var t=n=n.next;do{if((t.tag&e)===e){var r=t.create;t.destroy=r()}t=t.next}while(t!==n)}}function vi(e){var n=e.ref;if(n!==null){var t=e.stateNode;e.tag,e=t,typeof n=="function"?n(e):n.current=e}}function Dc(e){var n=e.alternate;n!==null&&(e.alternate=null,Dc(n)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(n=e.stateNode,n!==null&&(delete n[He],delete n[lr],delete n[ri],delete n[sf],delete n[uf])),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}function jc(e){return e.tag===5||e.tag===3||e.tag===4}function Qs(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||jc(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function yi(e,n,t){var r=e.tag;if(r===5||r===6)e=e.stateNode,n?t.nodeType===8?t.parentNode.insertBefore(e,n):t.insertBefore(e,n):(t.nodeType===8?(n=t.parentNode,n.insertBefore(e,t)):(n=t,n.appendChild(e)),t=t._reactRootContainer,t!=null||n.onclick!==null||(n.onclick=ul));else if(r!==4&&(e=e.child,e!==null))for(yi(e,n,t),e=e.sibling;e!==null;)yi(e,n,t),e=e.sibling}function xi(e,n,t){var r=e.tag;if(r===5||r===6)e=e.stateNode,n?t.insertBefore(e,n):t.appendChild(e);else if(r!==4&&(e=e.child,e!==null))for(xi(e,n,t),e=e.sibling;e!==null;)xi(e,n,t),e=e.sibling}var ee=null,De=!1;function an(e,n,t){for(t=t.child;t!==null;)Fc(e,n,t),t=t.sibling}function Fc(e,n,t){if($e&&typeof $e.onCommitFiberUnmount=="function")try{$e.onCommitFiberUnmount(_l,t)}catch{}switch(t.tag){case 5:ie||ot(t,n);case 6:var r=ee,l=De;ee=null,an(e,n,t),ee=r,De=l,ee!==null&&(De?(e=ee,t=t.stateNode,e.nodeType===8?e.parentNode.removeChild(t):e.removeChild(t)):ee.removeChild(t.stateNode));break;case 18:ee!==null&&(De?(e=ee,t=t.stateNode,e.nodeType===8?So(e.parentNode,t):e.nodeType===1&&So(e,t),qt(e)):So(ee,t.stateNode));break;case 4:r=ee,l=De,ee=t.stateNode.containerInfo,De=!0,an(e,n,t),ee=r,De=l;break;case 0:case 11:case 14:case 15:if(!ie&&(r=t.updateQueue,r!==null&&(r=r.lastEffect,r!==null))){l=r=r.next;do{var o=l,i=o.destroy;o=o.tag,i!==void 0&&((o&2)!==0||(o&4)!==0)&&hi(t,n,i),l=l.next}while(l!==r)}an(e,n,t);break;case 1:if(!ie&&(ot(t,n),r=t.stateNode,typeof r.componentWillUnmount=="function"))try{r.props=t.memoizedProps,r.state=t.memoizedState,r.componentWillUnmount()}catch(a){H(t,n,a)}an(e,n,t);break;case 21:an(e,n,t);break;case 22:t.mode&1?(ie=(r=ie)||t.memoizedState!==null,an(e,n,t),ie=r):an(e,n,t);break;default:an(e,n,t)}}function Ks(e){var n=e.updateQueue;if(n!==null){e.updateQueue=null;var t=e.stateNode;t===null&&(t=e.stateNode=new _f),n.forEach(function(r){var l=Df.bind(null,e,r);t.has(r)||(t.add(r),r.then(l,l))})}}function Re(e,n){var t=n.deletions;if(t!==null)for(var r=0;r<t.length;r++){var l=t[r];try{var o=e,i=n,a=i;e:for(;a!==null;){switch(a.tag){case 5:ee=a.stateNode,De=!1;break e;case 3:ee=a.stateNode.containerInfo,De=!0;break e;case 4:ee=a.stateNode.containerInfo,De=!0;break e}a=a.return}if(ee===null)throw Error(x(160));Fc(o,i,l),ee=null,De=!1;var s=l.alternate;s!==null&&(s.return=null),l.return=null}catch(p){H(l,n,p)}}if(n.subtreeFlags&12854)for(n=n.child;n!==null;)Wc(n,e),n=n.sibling}function Wc(e,n){var t=e.alternate,r=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if(Re(n,e),Ae(e),r&4){try{Qt(3,e,e.return),Rl(3,e)}catch(C){H(e,e.return,C)}try{Qt(5,e,e.return)}catch(C){H(e,e.return,C)}}break;case 1:Re(n,e),Ae(e),r&512&&t!==null&&ot(t,t.return);break;case 5:if(Re(n,e),Ae(e),r&512&&t!==null&&ot(t,t.return),e.flags&32){var l=e.stateNode;try{Gt(l,"")}catch(C){H(e,e.return,C)}}if(r&4&&(l=e.stateNode,l!=null)){var o=e.memoizedProps,i=t!==null?t.memoizedProps:o,a=e.type,s=e.updateQueue;if(e.updateQueue=null,s!==null)try{a==="input"&&o.type==="radio"&&o.name!=null&&iu(l,o),Ho(a,i);var p=Ho(a,o);for(i=0;i<s.length;i+=2){var v=s[i],m=s[i+1];v==="style"?pu(l,m):v==="dangerouslySetInnerHTML"?uu(l,m):v==="children"?Gt(l,m):Ei(l,v,m,p)}switch(a){case"input":Wo(l,o);break;case"textarea":au(l,o);break;case"select":var f=l._wrapperState.wasMultiple;l._wrapperState.wasMultiple=!!o.multiple;var w=o.value;w!=null?at(l,!!o.multiple,w,!1):f!==!!o.multiple&&(o.defaultValue!=null?at(l,!!o.multiple,o.defaultValue,!0):at(l,!!o.multiple,o.multiple?[]:"",!1))}l[lr]=o}catch(C){H(e,e.return,C)}}break;case 6:if(Re(n,e),Ae(e),r&4){if(e.stateNode===null)throw Error(x(162));l=e.stateNode,o=e.memoizedProps;try{l.nodeValue=o}catch(C){H(e,e.return,C)}}break;case 3:if(Re(n,e),Ae(e),r&4&&t!==null&&t.memoizedState.isDehydrated)try{qt(n.containerInfo)}catch(C){H(e,e.return,C)}break;case 4:Re(n,e),Ae(e);break;case 13:Re(n,e),Ae(e),l=e.child,l.flags&8192&&(o=l.memoizedState!==null,l.stateNode.isHidden=o,!o||l.alternate!==null&&l.alternate.memoizedState!==null||(oa=$())),r&4&&Ks(e);break;case 22:if(v=t!==null&&t.memoizedState!==null,e.mode&1?(ie=(p=ie)||v,Re(n,e),ie=p):Re(n,e),Ae(e),r&8192){if(p=e.memoizedState!==null,(e.stateNode.isHidden=p)&&!v&&(e.mode&1)!==0)for(E=e,v=e.child;v!==null;){for(m=E=v;E!==null;){switch(f=E,w=f.child,f.tag){case 0:case 11:case 14:case 15:Qt(4,f,f.return);break;case 1:ot(f,f.return);var S=f.stateNode;if(typeof S.componentWillUnmount=="function"){r=f,t=f.return;try{n=r,S.props=n.memoizedProps,S.state=n.memoizedState,S.componentWillUnmount()}catch(C){H(r,t,C)}}break;case 5:ot(f,f.return);break;case 22:if(f.memoizedState!==null){Xs(m);continue}}w!==null?(w.return=f,E=w):Xs(m)}v=v.sibling}e:for(v=null,m=e;;){if(m.tag===5){if(v===null){v=m;try{l=m.stateNode,p?(o=l.style,typeof o.setProperty=="function"?o.setProperty("display","none","important"):o.display="none"):(a=m.stateNode,s=m.memoizedProps.style,i=s!=null&&s.hasOwnProperty("display")?s.display:null,a.style.display=cu("display",i))}catch(C){H(e,e.return,C)}}}else if(m.tag===6){if(v===null)try{m.stateNode.nodeValue=p?"":m.memoizedProps}catch(C){H(e,e.return,C)}}else if((m.tag!==22&&m.tag!==23||m.memoizedState===null||m===e)&&m.child!==null){m.child.return=m,m=m.child;continue}if(m===e)break e;for(;m.sibling===null;){if(m.return===null||m.return===e)break e;v===m&&(v=null),m=m.return}v===m&&(v=null),m.sibling.return=m.return,m=m.sibling}}break;case 19:Re(n,e),Ae(e),r&4&&Ks(e);break;case 21:break;default:Re(n,e),Ae(e)}}function Ae(e){var n=e.flags;if(n&2){try{e:{for(var t=e.return;t!==null;){if(jc(t)){var r=t;break e}t=t.return}throw Error(x(160))}switch(r.tag){case 5:var l=r.stateNode;r.flags&32&&(Gt(l,""),r.flags&=-33);var o=Qs(e);xi(e,o,l);break;case 3:case 4:var i=r.stateNode.containerInfo,a=Qs(e);yi(e,a,i);break;default:throw Error(x(161))}}catch(s){H(e,e.return,s)}e.flags&=-3}n&4096&&(e.flags&=-4097)}function zf(e,n,t){E=e,Uc(e,n,t)}function Uc(e,n,t){for(var r=(e.mode&1)!==0;E!==null;){var l=E,o=l.child;if(l.tag===22&&r){var i=l.memoizedState!==null||Hr;if(!i){var a=l.alternate,s=a!==null&&a.memoizedState!==null||ie;a=Hr;var p=ie;if(Hr=i,(ie=s)&&!p)for(E=l;E!==null;)i=E,s=i.child,i.tag===22&&i.memoizedState!==null?Gs(l):s!==null?(s.return=i,E=s):Gs(l);for(;o!==null;)E=o,Uc(o,n,t),o=o.sibling;E=l,Hr=a,ie=p}Ys(e,n,t)}else(l.subtreeFlags&8772)!==0&&o!==null?(o.return=l,E=o):Ys(e,n,t)}}function Ys(e){for(;E!==null;){var n=E;if((n.flags&8772)!==0){var t=n.alternate;try{if((n.flags&8772)!==0)switch(n.tag){case 0:case 11:case 15:ie||Rl(5,n);break;case 1:var r=n.stateNode;if(n.flags&4&&!ie)if(t===null)r.componentDidMount();else{var l=n.elementType===n.type?t.memoizedProps:Oe(n.type,t.memoizedProps);r.componentDidUpdate(l,t.memoizedState,r.__reactInternalSnapshotBeforeUpdate)}var o=n.updateQueue;o!==null&&Ms(n,o,r);break;case 3:var i=n.updateQueue;if(i!==null){if(t=null,n.child!==null)switch(n.child.tag){case 5:t=n.child.stateNode;break;case 1:t=n.child.stateNode}Ms(n,i,t)}break;case 5:var a=n.stateNode;if(t===null&&n.flags&4){t=a;var s=n.memoizedProps;switch(n.type){case"button":case"input":case"select":case"textarea":s.autoFocus&&t.focus();break;case"img":s.src&&(t.src=s.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(n.memoizedState===null){var p=n.alternate;if(p!==null){var v=p.memoizedState;if(v!==null){var m=v.dehydrated;m!==null&&qt(m)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(x(163))}ie||n.flags&512&&vi(n)}catch(f){H(n,n.return,f)}}if(n===e){E=null;break}if(t=n.sibling,t!==null){t.return=n.return,E=t;break}E=n.return}}function Xs(e){for(;E!==null;){var n=E;if(n===e){E=null;break}var t=n.sibling;if(t!==null){t.return=n.return,E=t;break}E=n.return}}function Gs(e){for(;E!==null;){var n=E;try{switch(n.tag){case 0:case 11:case 15:var t=n.return;try{Rl(4,n)}catch(s){H(n,t,s)}break;case 1:var r=n.stateNode;if(typeof r.componentDidMount=="function"){var l=n.return;try{r.componentDidMount()}catch(s){H(n,l,s)}}var o=n.return;try{vi(n)}catch(s){H(n,o,s)}break;case 5:var i=n.return;try{vi(n)}catch(s){H(n,i,s)}}}catch(s){H(n,n.return,s)}if(n===e){E=null;break}var a=n.sibling;if(a!==null){a.return=n.return,E=a;break}E=n.return}}var Pf=Math.ceil,wl=tn.ReactCurrentDispatcher,ra=tn.ReactCurrentOwner,Pe=tn.ReactCurrentBatchConfig,M=0,J=null,Q=null,ne=0,ve=0,it=_n(0),Y=0,cr=null,An=0,Ol=0,la=0,Kt=null,de=null,oa=0,xt=1/0,Ye=null,kl=!1,wi=null,xn=null,$r=!1,fn=null,Sl=0,Yt=0,ki=null,Jr=-1,qr=0;function ce(){return(M&6)!==0?$():Jr!==-1?Jr:Jr=$()}function wn(e){return(e.mode&1)===0?1:(M&2)!==0&&ne!==0?ne&-ne:pf.transition!==null?(qr===0&&(qr=Nu()),qr):(e=R,e!==0||(e=window.event,e=e===void 0?16:Lu(e.type)),e)}function We(e,n,t,r){if(50<Yt)throw Yt=0,ki=null,Error(x(185));pr(e,t,r),((M&2)===0||e!==J)&&(e===J&&((M&2)===0&&(Ol|=t),Y===4&&pn(e,ne)),he(e,r),t===1&&M===0&&(n.mode&1)===0&&(xt=$()+500,Ll&&En()))}function he(e,n){var t=e.callbackNode;dd(e,n);var r=ol(e,e===J?ne:0);if(r===0)t!==null&&rs(t),e.callbackNode=null,e.callbackPriority=0;else if(n=r&-r,e.callbackPriority!==n){if(t!=null&&rs(t),n===1)e.tag===0?cf(Zs.bind(null,e)):Gu(Zs.bind(null,e)),of(function(){(M&6)===0&&En()}),t=null;else{switch(Cu(r)){case 1:t=Mi;break;case 4:t=ku;break;case 16:t=ll;break;case 536870912:t=Su;break;default:t=ll}t=Yc(t,Bc.bind(null,e))}e.callbackPriority=n,e.callbackNode=t}}function Bc(e,n){if(Jr=-1,qr=0,(M&6)!==0)throw Error(x(327));var t=e.callbackNode;if(dt()&&e.callbackNode!==t)return null;var r=ol(e,e===J?ne:0);if(r===0)return null;if((r&30)!==0||(r&e.expiredLanes)!==0||n)n=Nl(e,r);else{n=r;var l=M;M|=2;var o=Vc();(J!==e||ne!==n)&&(Ye=null,xt=$()+500,jn(e,n));do try{Mf();break}catch(a){Ac(e,a)}while(!0);$i(),wl.current=o,M=l,Q!==null?n=0:(J=null,ne=0,n=Y)}if(n!==0){if(n===2&&(l=Xo(e),l!==0&&(r=l,n=Si(e,l))),n===1)throw t=cr,jn(e,0),pn(e,r),he(e,$()),t;if(n===6)pn(e,r);else{if(l=e.current.alternate,(r&30)===0&&!If(l)&&(n=Nl(e,r),n===2&&(o=Xo(e),o!==0&&(r=o,n=Si(e,o))),n===1))throw t=cr,jn(e,0),pn(e,r),he(e,$()),t;switch(e.finishedWork=l,e.finishedLanes=r,n){case 0:case 1:throw Error(x(345));case 2:Tn(e,de,Ye);break;case 3:if(pn(e,r),(r&130023424)===r&&(n=oa+500-$(),10<n)){if(ol(e,0)!==0)break;if(l=e.suspendedLanes,(l&r)!==r){ce(),e.pingedLanes|=e.suspendedLanes&l;break}e.timeoutHandle=ti(Tn.bind(null,e,de,Ye),n);break}Tn(e,de,Ye);break;case 4:if(pn(e,r),(r&4194240)===r)break;for(n=e.eventTimes,l=-1;0<r;){var i=31-Fe(r);o=1<<i,i=n[i],i>l&&(l=i),r&=~o}if(r=l,r=$()-r,r=(120>r?120:480>r?480:1080>r?1080:1920>r?1920:3e3>r?3e3:4320>r?4320:1960*Pf(r/1960))-r,10<r){e.timeoutHandle=ti(Tn.bind(null,e,de,Ye),r);break}Tn(e,de,Ye);break;case 5:Tn(e,de,Ye);break;default:throw Error(x(329))}}}return he(e,$()),e.callbackNode===t?Bc.bind(null,e):null}function Si(e,n){var t=Kt;return e.current.memoizedState.isDehydrated&&(jn(e,n).flags|=256),e=Nl(e,n),e!==2&&(n=de,de=t,n!==null&&Ni(n)),e}function Ni(e){de===null?de=e:de.push.apply(de,e)}function If(e){for(var n=e;;){if(n.flags&16384){var t=n.updateQueue;if(t!==null&&(t=t.stores,t!==null))for(var r=0;r<t.length;r++){var l=t[r],o=l.getSnapshot;l=l.value;try{if(!Ue(o(),l))return!1}catch{return!1}}}if(t=n.child,n.subtreeFlags&16384&&t!==null)t.return=n,n=t;else{if(n===e)break;for(;n.sibling===null;){if(n.return===null||n.return===e)return!0;n=n.return}n.sibling.return=n.return,n=n.sibling}}return!0}function pn(e,n){for(n&=~la,n&=~Ol,e.suspendedLanes|=n,e.pingedLanes&=~n,e=e.expirationTimes;0<n;){var t=31-Fe(n),r=1<<t;e[t]=-1,n&=~r}}function Zs(e){if((M&6)!==0)throw Error(x(327));dt();var n=ol(e,0);if((n&1)===0)return he(e,$()),null;var t=Nl(e,n);if(e.tag!==0&&t===2){var r=Xo(e);r!==0&&(n=r,t=Si(e,r))}if(t===1)throw t=cr,jn(e,0),pn(e,n),he(e,$()),t;if(t===6)throw Error(x(345));return e.finishedWork=e.current.alternate,e.finishedLanes=n,Tn(e,de,Ye),he(e,$()),null}function ia(e,n){var t=M;M|=1;try{return e(n)}finally{M=t,M===0&&(xt=$()+500,Ll&&En())}}function Vn(e){fn!==null&&fn.tag===0&&(M&6)===0&&dt();var n=M;M|=1;var t=Pe.transition,r=R;try{if(Pe.transition=null,R=1,e)return e()}finally{R=r,Pe.transition=t,M=n,(M&6)===0&&En()}}function aa(){ve=it.current,W(it)}function jn(e,n){e.finishedWork=null,e.finishedLanes=0;var t=e.timeoutHandle;if(t!==-1&&(e.timeoutHandle=-1,lf(t)),Q!==null)for(t=Q.return;t!==null;){var r=t;switch(Ai(r),r.tag){case 1:r=r.type.childContextTypes,r!=null&&cl();break;case 3:vt(),W(me),W(ae),Zi();break;case 5:Gi(r);break;case 4:vt();break;case 13:W(B);break;case 19:W(B);break;case 10:Qi(r.type._context);break;case 22:case 23:aa()}t=t.return}if(J=e,Q=e=kn(e.current,null),ne=ve=n,Y=0,cr=null,la=Ol=An=0,de=Kt=null,On!==null){for(n=0;n<On.length;n++)if(t=On[n],r=t.interleaved,r!==null){t.interleaved=null;var l=r.next,o=t.pending;if(o!==null){var i=o.next;o.next=l,r.next=i}t.pending=r}On=null}return e}function Ac(e,n){do{var t=Q;try{if($i(),Gr.current=xl,yl){for(var r=A.memoizedState;r!==null;){var l=r.queue;l!==null&&(l.pending=null),r=r.next}yl=!1}if(Bn=0,b=K=A=null,$t=!1,ar=0,ra.current=null,t===null||t.return===null){Y=1,cr=n,Q=null;break}e:{var o=e,i=t.return,a=t,s=n;if(n=ne,a.flags|=32768,s!==null&&typeof s=="object"&&typeof s.then=="function"){var p=s,v=a,m=v.tag;if((v.mode&1)===0&&(m===0||m===11||m===15)){var f=v.alternate;f?(v.updateQueue=f.updateQueue,v.memoizedState=f.memoizedState,v.lanes=f.lanes):(v.updateQueue=null,v.memoizedState=null)}var w=Fs(i);if(w!==null){w.flags&=-257,Ws(w,i,a,o,n),w.mode&1&&js(o,p,n),n=w,s=p;var S=n.updateQueue;if(S===null){var C=new Set;C.add(s),n.updateQueue=C}else S.add(s);break e}else{if((n&1)===0){js(o,p,n),sa();break e}s=Error(x(426))}}else if(U&&a.mode&1){var O=Fs(i);if(O!==null){(O.flags&65536)===0&&(O.flags|=256),Ws(O,i,a,o,n),Vi(yt(s,a));break e}}o=s=yt(s,a),Y!==4&&(Y=2),Kt===null?Kt=[o]:Kt.push(o),o=i;do{switch(o.tag){case 3:o.flags|=65536,n&=-n,o.lanes|=n;var u=Cc(o,s,n);Ls(o,u);break e;case 1:a=s;var c=o.type,d=o.stateNode;if((o.flags&128)===0&&(typeof c.getDerivedStateFromError=="function"||d!==null&&typeof d.componentDidCatch=="function"&&(xn===null||!xn.has(d)))){o.flags|=65536,n&=-n,o.lanes|=n;var h=_c(o,a,n);Ls(o,h);break e}}o=o.return}while(o!==null)}$c(t)}catch(k){n=k,Q===t&&t!==null&&(Q=t=t.return);continue}break}while(!0)}function Vc(){var e=wl.current;return wl.current=xl,e===null?xl:e}function sa(){(Y===0||Y===3||Y===2)&&(Y=4),J===null||(An&268435455)===0&&(Ol&268435455)===0||pn(J,ne)}function Nl(e,n){var t=M;M|=2;var r=Vc();(J!==e||ne!==n)&&(Ye=null,jn(e,n));do try{Lf();break}catch(l){Ac(e,l)}while(!0);if($i(),M=t,wl.current=r,Q!==null)throw Error(x(261));return J=null,ne=0,Y}function Lf(){for(;Q!==null;)Hc(Q)}function Mf(){for(;Q!==null&&!rd();)Hc(Q)}function Hc(e){var n=Kc(e.alternate,e,ve);e.memoizedProps=e.pendingProps,n===null?$c(e):Q=n,ra.current=null}function $c(e){var n=e;do{var t=n.alternate;if(e=n.return,(n.flags&32768)===0){if(t=Nf(t,n,ve),t!==null){Q=t;return}}else{if(t=Cf(t,n),t!==null){t.flags&=32767,Q=t;return}if(e!==null)e.flags|=32768,e.subtreeFlags=0,e.deletions=null;else{Y=6,Q=null;return}}if(n=n.sibling,n!==null){Q=n;return}Q=n=e}while(n!==null);Y===0&&(Y=5)}function Tn(e,n,t){var r=R,l=Pe.transition;try{Pe.transition=null,R=1,Tf(e,n,t,r)}finally{Pe.transition=l,R=r}return null}function Tf(e,n,t,r){do dt();while(fn!==null);if((M&6)!==0)throw Error(x(327));t=e.finishedWork;var l=e.finishedLanes;if(t===null)return null;if(e.finishedWork=null,e.finishedLanes=0,t===e.current)throw Error(x(177));e.callbackNode=null,e.callbackPriority=0;var o=t.lanes|t.childLanes;if(fd(e,o),e===J&&(Q=J=null,ne=0),(t.subtreeFlags&2064)===0&&(t.flags&2064)===0||$r||($r=!0,Yc(ll,function(){return dt(),null})),o=(t.flags&15990)!==0,(t.subtreeFlags&15990)!==0||o){o=Pe.transition,Pe.transition=null;var i=R;R=1;var a=M;M|=4,ra.current=null,Ef(e,t),Wc(t,e),qd(ei),il=!!qo,ei=qo=null,e.current=t,zf(t,e,l),ld(),M=a,R=i,Pe.transition=o}else e.current=t;if($r&&($r=!1,fn=e,Sl=l),o=e.pendingLanes,o===0&&(xn=null),ad(t.stateNode,r),he(e,$()),n!==null)for(r=e.onRecoverableError,t=0;t<n.length;t++)l=n[t],r(l.value,{componentStack:l.stack,digest:l.digest});if(kl)throw kl=!1,e=wi,wi=null,e;return(Sl&1)!==0&&e.tag!==0&&dt(),o=e.pendingLanes,(o&1)!==0?e===ki?Yt++:(Yt=0,ki=e):Yt=0,En(),null}function dt(){if(fn!==null){var e=Cu(Sl),n=Pe.transition,t=R;try{if(Pe.transition=null,R=16>e?16:e,fn===null)var r=!1;else{if(e=fn,fn=null,Sl=0,(M&6)!==0)throw Error(x(331));var l=M;for(M|=4,E=e.current;E!==null;){var o=E,i=o.child;if((E.flags&16)!==0){var a=o.deletions;if(a!==null){for(var s=0;s<a.length;s++){var p=a[s];for(E=p;E!==null;){var v=E;switch(v.tag){case 0:case 11:case 15:Qt(8,v,o)}var m=v.child;if(m!==null)m.return=v,E=m;else for(;E!==null;){v=E;var f=v.sibling,w=v.return;if(Dc(v),v===p){E=null;break}if(f!==null){f.return=w,E=f;break}E=w}}}var S=o.alternate;if(S!==null){var C=S.child;if(C!==null){S.child=null;do{var O=C.sibling;C.sibling=null,C=O}while(C!==null)}}E=o}}if((o.subtreeFlags&2064)!==0&&i!==null)i.return=o,E=i;else e:for(;E!==null;){if(o=E,(o.flags&2048)!==0)switch(o.tag){case 0:case 11:case 15:Qt(9,o,o.return)}var u=o.sibling;if(u!==null){u.return=o.return,E=u;break e}E=o.return}}var c=e.current;for(E=c;E!==null;){i=E;var d=i.child;if((i.subtreeFlags&2064)!==0&&d!==null)d.return=i,E=d;else e:for(i=c;E!==null;){if(a=E,(a.flags&2048)!==0)try{switch(a.tag){case 0:case 11:case 15:Rl(9,a)}}catch(k){H(a,a.return,k)}if(a===i){E=null;break e}var h=a.sibling;if(h!==null){h.return=a.return,E=h;break e}E=a.return}}if(M=l,En(),$e&&typeof $e.onPostCommitFiberRoot=="function")try{$e.onPostCommitFiberRoot(_l,e)}catch{}r=!0}return r}finally{R=t,Pe.transition=n}}return!1}function bs(e,n,t){n=yt(t,n),n=Cc(e,n,1),e=yn(e,n,1),n=ce(),e!==null&&(pr(e,1,n),he(e,n))}function H(e,n,t){if(e.tag===3)bs(e,e,t);else for(;n!==null;){if(n.tag===3){bs(n,e,t);break}else if(n.tag===1){var r=n.stateNode;if(typeof n.type.getDerivedStateFromError=="function"||typeof r.componentDidCatch=="function"&&(xn===null||!xn.has(r))){e=yt(t,e),e=_c(n,e,1),n=yn(n,e,1),e=ce(),n!==null&&(pr(n,1,e),he(n,e));break}}n=n.return}}function Rf(e,n,t){var r=e.pingCache;r!==null&&r.delete(n),n=ce(),e.pingedLanes|=e.suspendedLanes&t,J===e&&(ne&t)===t&&(Y===4||Y===3&&(ne&130023424)===ne&&500>$()-oa?jn(e,0):la|=t),he(e,n)}function Qc(e,n){n===0&&((e.mode&1)===0?n=1:(n=Lr,Lr<<=1,(Lr&130023424)===0&&(Lr=4194304)));var t=ce();e=en(e,n),e!==null&&(pr(e,n,t),he(e,t))}function Of(e){var n=e.memoizedState,t=0;n!==null&&(t=n.retryLane),Qc(e,t)}function Df(e,n){var t=0;switch(e.tag){case 13:var r=e.stateNode,l=e.memoizedState;l!==null&&(t=l.retryLane);break;case 19:r=e.stateNode;break;default:throw Error(x(314))}r!==null&&r.delete(n),Qc(e,t)}var Kc;Kc=function(e,n,t){if(e!==null)if(e.memoizedProps!==n.pendingProps||me.current)fe=!0;else{if((e.lanes&t)===0&&(n.flags&128)===0)return fe=!1,Sf(e,n,t);fe=(e.flags&131072)!==0}else fe=!1,U&&(n.flags&1048576)!==0&&Zu(n,fl,n.index);switch(n.lanes=0,n.tag){case 2:var r=n.type;br(e,n),e=n.pendingProps;var l=mt(n,ae.current);pt(n,t),l=Ji(null,n,r,e,l,t);var o=qi();return n.flags|=1,typeof l=="object"&&l!==null&&typeof l.render=="function"&&l.$$typeof===void 0?(n.tag=1,n.memoizedState=null,n.updateQueue=null,ge(r)?(o=!0,pl(n)):o=!1,n.memoizedState=l.state!==null&&l.state!==void 0?l.state:null,Yi(n),l.updater=Tl,n.stateNode=l,l._reactInternals=n,ui(n,r,e,t),n=di(null,n,r,!0,o,t)):(n.tag=0,U&&o&&Bi(n),ue(null,n,l,t),n=n.child),n;case 16:r=n.elementType;e:{switch(br(e,n),e=n.pendingProps,l=r._init,r=l(r._payload),n.type=r,l=n.tag=Ff(r),e=Oe(r,e),l){case 0:n=pi(null,n,r,e,t);break e;case 1:n=As(null,n,r,e,t);break e;case 11:n=Us(null,n,r,e,t);break e;case 14:n=Bs(null,n,r,Oe(r.type,e),t);break e}throw Error(x(306,r,""))}return n;case 0:return r=n.type,l=n.pendingProps,l=n.elementType===r?l:Oe(r,l),pi(e,n,r,l,t);case 1:return r=n.type,l=n.pendingProps,l=n.elementType===r?l:Oe(r,l),As(e,n,r,l,t);case 3:e:{if(Ic(n),e===null)throw Error(x(387));r=n.pendingProps,o=n.memoizedState,l=o.element,tc(e,n),hl(n,r,null,t);var i=n.memoizedState;if(r=i.element,o.isDehydrated)if(o={element:r,isDehydrated:!1,cache:i.cache,pendingSuspenseBoundaries:i.pendingSuspenseBoundaries,transitions:i.transitions},n.updateQueue.baseState=o,n.memoizedState=o,n.flags&256){l=yt(Error(x(423)),n),n=Vs(e,n,r,t,l);break e}else if(r!==l){l=yt(Error(x(424)),n),n=Vs(e,n,r,t,l);break e}else for(ye=vn(n.stateNode.containerInfo.firstChild),xe=n,U=!0,je=null,t=ec(n,null,r,t),n.child=t;t;)t.flags=t.flags&-3|4096,t=t.sibling;else{if(gt(),r===l){n=nn(e,n,t);break e}ue(e,n,r,t)}n=n.child}return n;case 5:return rc(n),e===null&&ii(n),r=n.type,l=n.pendingProps,o=e!==null?e.memoizedProps:null,i=l.children,ni(r,l)?i=null:o!==null&&ni(r,o)&&(n.flags|=32),Pc(e,n),ue(e,n,i,t),n.child;case 6:return e===null&&ii(n),null;case 13:return Lc(e,n,t);case 4:return Xi(n,n.stateNode.containerInfo),r=n.pendingProps,e===null?n.child=ht(n,null,r,t):ue(e,n,r,t),n.child;case 11:return r=n.type,l=n.pendingProps,l=n.elementType===r?l:Oe(r,l),Us(e,n,r,l,t);case 7:return ue(e,n,n.pendingProps,t),n.child;case 8:return ue(e,n,n.pendingProps.children,t),n.child;case 12:return ue(e,n,n.pendingProps.children,t),n.child;case 10:e:{if(r=n.type._context,l=n.pendingProps,o=n.memoizedProps,i=l.value,j(ml,r._currentValue),r._currentValue=i,o!==null)if(Ue(o.value,i)){if(o.children===l.children&&!me.current){n=nn(e,n,t);break e}}else for(o=n.child,o!==null&&(o.return=n);o!==null;){var a=o.dependencies;if(a!==null){i=o.child;for(var s=a.firstContext;s!==null;){if(s.context===r){if(o.tag===1){s=be(-1,t&-t),s.tag=2;var p=o.updateQueue;if(p!==null){p=p.shared;var v=p.pending;v===null?s.next=s:(s.next=v.next,v.next=s),p.pending=s}}o.lanes|=t,s=o.alternate,s!==null&&(s.lanes|=t),ai(o.return,t,n),a.lanes|=t;break}s=s.next}}else if(o.tag===10)i=o.type===n.type?null:o.child;else if(o.tag===18){if(i=o.return,i===null)throw Error(x(341));i.lanes|=t,a=i.alternate,a!==null&&(a.lanes|=t),ai(i,t,n),i=o.sibling}else i=o.child;if(i!==null)i.return=o;else for(i=o;i!==null;){if(i===n){i=null;break}if(o=i.sibling,o!==null){o.return=i.return,i=o;break}i=i.return}o=i}ue(e,n,l.children,t),n=n.child}return n;case 9:return l=n.type,r=n.pendingProps.children,pt(n,t),l=Ie(l),r=r(l),n.flags|=1,ue(e,n,r,t),n.child;case 14:return r=n.type,l=Oe(r,n.pendingProps),l=Oe(r.type,l),Bs(e,n,r,l,t);case 15:return Ec(e,n,n.type,n.pendingProps,t);case 17:return r=n.type,l=n.pendingProps,l=n.elementType===r?l:Oe(r,l),br(e,n),n.tag=1,ge(r)?(e=!0,pl(n)):e=!1,pt(n,t),Nc(n,r,l),ui(n,r,l,t),di(null,n,r,!0,e,t);case 19:return Mc(e,n,t);case 22:return zc(e,n,t)}throw Error(x(156,n.tag))};function Yc(e,n){return wu(e,n)}function jf(e,n,t,r){this.tag=e,this.key=t,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=n,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function ze(e,n,t,r){return new jf(e,n,t,r)}function ua(e){return e=e.prototype,!(!e||!e.isReactComponent)}function Ff(e){if(typeof e=="function")return ua(e)?1:0;if(e!=null){if(e=e.$$typeof,e===Pi)return 11;if(e===Ii)return 14}return 2}function kn(e,n){var t=e.alternate;return t===null?(t=ze(e.tag,n,e.key,e.mode),t.elementType=e.elementType,t.type=e.type,t.stateNode=e.stateNode,t.alternate=e,e.alternate=t):(t.pendingProps=n,t.type=e.type,t.flags=0,t.subtreeFlags=0,t.deletions=null),t.flags=e.flags&14680064,t.childLanes=e.childLanes,t.lanes=e.lanes,t.child=e.child,t.memoizedProps=e.memoizedProps,t.memoizedState=e.memoizedState,t.updateQueue=e.updateQueue,n=e.dependencies,t.dependencies=n===null?null:{lanes:n.lanes,firstContext:n.firstContext},t.sibling=e.sibling,t.index=e.index,t.ref=e.ref,t}function el(e,n,t,r,l,o){var i=2;if(r=e,typeof e=="function")ua(e)&&(i=1);else if(typeof e=="string")i=5;else e:switch(e){case Zn:return Fn(t.children,l,o,n);case zi:i=8,l|=8;break;case Ro:return e=ze(12,t,n,l|2),e.elementType=Ro,e.lanes=o,e;case Oo:return e=ze(13,t,n,l),e.elementType=Oo,e.lanes=o,e;case Do:return e=ze(19,t,n,l),e.elementType=Do,e.lanes=o,e;case ru:return Dl(t,l,o,n);default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case nu:i=10;break e;case tu:i=9;break e;case Pi:i=11;break e;case Ii:i=14;break e;case sn:i=16,r=null;break e}throw Error(x(130,e==null?e:typeof e,""))}return n=ze(i,t,n,l),n.elementType=e,n.type=r,n.lanes=o,n}function Fn(e,n,t,r){return e=ze(7,e,r,n),e.lanes=t,e}function Dl(e,n,t,r){return e=ze(22,e,r,n),e.elementType=ru,e.lanes=t,e.stateNode={isHidden:!1},e}function Lo(e,n,t){return e=ze(6,e,null,n),e.lanes=t,e}function Mo(e,n,t){return n=ze(4,e.children!==null?e.children:[],e.key,n),n.lanes=t,n.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},n}function Wf(e,n,t,r,l){this.tag=n,this.containerInfo=e,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=mo(0),this.expirationTimes=mo(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=mo(0),this.identifierPrefix=r,this.onRecoverableError=l,this.mutableSourceEagerHydrationData=null}function ca(e,n,t,r,l,o,i,a,s){return e=new Wf(e,n,t,a,s),n===1?(n=1,o===!0&&(n|=8)):n=0,o=ze(3,null,null,n),e.current=o,o.stateNode=e,o.memoizedState={element:r,isDehydrated:t,cache:null,transitions:null,pendingSuspenseBoundaries:null},Yi(o),e}function Uf(e,n,t){var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:Gn,key:r==null?null:""+r,children:e,containerInfo:n,implementation:t}}function Xc(e){if(!e)return Nn;e=e._reactInternals;e:{if($n(e)!==e||e.tag!==1)throw Error(x(170));var n=e;do{switch(n.tag){case 3:n=n.stateNode.context;break e;case 1:if(ge(n.type)){n=n.stateNode.__reactInternalMemoizedMergedChildContext;break e}}n=n.return}while(n!==null);throw Error(x(171))}if(e.tag===1){var t=e.type;if(ge(t))return Xu(e,t,n)}return n}function Gc(e,n,t,r,l,o,i,a,s){return e=ca(t,r,!0,e,l,o,i,a,s),e.context=Xc(null),t=e.current,r=ce(),l=wn(t),o=be(r,l),o.callback=n??null,yn(t,o,l),e.current.lanes=l,pr(e,l,r),he(e,r),e}function jl(e,n,t,r){var l=n.current,o=ce(),i=wn(l);return t=Xc(t),n.context===null?n.context=t:n.pendingContext=t,n=be(o,i),n.payload={element:e},r=r===void 0?null:r,r!==null&&(n.callback=r),e=yn(l,n,i),e!==null&&(We(e,l,i,o),Xr(e,l,i)),i}function Cl(e){return e=e.current,e.child?(e.child.tag===5,e.child.stateNode):null}function Js(e,n){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var t=e.retryLane;e.retryLane=t!==0&&t<n?t:n}}function pa(e,n){Js(e,n),(e=e.alternate)&&Js(e,n)}function Bf(){return null}var Zc=typeof reportError=="function"?reportError:function(e){console.error(e)};function da(e){this._internalRoot=e}Fl.prototype.render=da.prototype.render=function(e){var n=this._internalRoot;if(n===null)throw Error(x(409));jl(e,n,null,null)};Fl.prototype.unmount=da.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var n=e.containerInfo;Vn(function(){jl(null,e,null,null)}),n[qe]=null}};function Fl(e){this._internalRoot=e}Fl.prototype.unstable_scheduleHydration=function(e){if(e){var n=zu();e={blockedOn:null,target:e,priority:n};for(var t=0;t<cn.length&&n!==0&&n<cn[t].priority;t++);cn.splice(t,0,e),t===0&&Iu(e)}};function fa(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function Wl(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11&&(e.nodeType!==8||e.nodeValue!==" react-mount-point-unstable "))}function qs(){}function Af(e,n,t,r,l){if(l){if(typeof r=="function"){var o=r;r=function(){var p=Cl(i);o.call(p)}}var i=Gc(n,r,e,0,null,!1,!1,"",qs);return e._reactRootContainer=i,e[qe]=i.current,tr(e.nodeType===8?e.parentNode:e),Vn(),i}for(;l=e.lastChild;)e.removeChild(l);if(typeof r=="function"){var a=r;r=function(){var p=Cl(s);a.call(p)}}var s=ca(e,0,!1,null,null,!1,!1,"",qs);return e._reactRootContainer=s,e[qe]=s.current,tr(e.nodeType===8?e.parentNode:e),Vn(function(){jl(n,s,t,r)}),s}function Ul(e,n,t,r,l){var o=t._reactRootContainer;if(o){var i=o;if(typeof l=="function"){var a=l;l=function(){var s=Cl(i);a.call(s)}}jl(n,i,e,l)}else i=Af(t,n,e,l,r);return Cl(i)}_u=function(e){switch(e.tag){case 3:var n=e.stateNode;if(n.current.memoizedState.isDehydrated){var t=Ft(n.pendingLanes);t!==0&&(Ti(n,t|1),he(n,$()),(M&6)===0&&(xt=$()+500,En()))}break;case 13:Vn(function(){var r=en(e,1);if(r!==null){var l=ce();We(r,e,1,l)}}),pa(e,1)}};Ri=function(e){if(e.tag===13){var n=en(e,134217728);if(n!==null){var t=ce();We(n,e,134217728,t)}pa(e,134217728)}};Eu=function(e){if(e.tag===13){var n=wn(e),t=en(e,n);if(t!==null){var r=ce();We(t,e,n,r)}pa(e,n)}};zu=function(){return R};Pu=function(e,n){var t=R;try{return R=e,n()}finally{R=t}};Qo=function(e,n,t){switch(n){case"input":if(Wo(e,t),n=t.name,t.type==="radio"&&n!=null){for(t=e;t.parentNode;)t=t.parentNode;for(t=t.querySelectorAll("input[name="+JSON.stringify(""+n)+'][type="radio"]'),n=0;n<t.length;n++){var r=t[n];if(r!==e&&r.form===e.form){var l=Il(r);if(!l)throw Error(x(90));ou(r),Wo(r,l)}}}break;case"textarea":au(e,t);break;case"select":n=t.value,n!=null&&at(e,!!t.multiple,n,!1)}};mu=ia;gu=Vn;var Vf={usingClientEntryPoint:!1,Events:[fr,et,Il,du,fu,ia]},Rt={findFiberByHostInstance:Rn,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},Hf={bundleType:Rt.bundleType,version:Rt.version,rendererPackageName:Rt.rendererPackageName,rendererConfig:Rt.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:tn.ReactCurrentDispatcher,findHostInstanceByFiber:function(e){return e=yu(e),e===null?null:e.stateNode},findFiberByHostInstance:Rt.findFiberByHostInstance||Bf,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"&&(Ot=__REACT_DEVTOOLS_GLOBAL_HOOK__,!Ot.isDisabled&&Ot.supportsFiber))try{_l=Ot.inject(Hf),$e=Ot}catch{}var Ot;Se.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=Vf;Se.createPortal=function(e,n){var t=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!fa(n))throw Error(x(200));return Uf(e,n,null,t)};Se.createRoot=function(e,n){if(!fa(e))throw Error(x(299));var t=!1,r="",l=Zc;return n!=null&&(n.unstable_strictMode===!0&&(t=!0),n.identifierPrefix!==void 0&&(r=n.identifierPrefix),n.onRecoverableError!==void 0&&(l=n.onRecoverableError)),n=ca(e,1,!1,null,null,t,!1,r,l),e[qe]=n.current,tr(e.nodeType===8?e.parentNode:e),new da(n)};Se.findDOMNode=function(e){if(e==null)return null;if(e.nodeType===1)return e;var n=e._reactInternals;if(n===void 0)throw typeof e.render=="function"?Error(x(188)):(e=Object.keys(e).join(","),Error(x(268,e)));return e=yu(n),e=e===null?null:e.stateNode,e};Se.flushSync=function(e){return Vn(e)};Se.hydrate=function(e,n,t){if(!Wl(n))throw Error(x(200));return Ul(null,e,n,!0,t)};Se.hydrateRoot=function(e,n,t){if(!fa(e))throw Error(x(405));var r=t!=null&&t.hydratedSources||null,l=!1,o="",i=Zc;if(t!=null&&(t.unstable_strictMode===!0&&(l=!0),t.identifierPrefix!==void 0&&(o=t.identifierPrefix),t.onRecoverableError!==void 0&&(i=t.onRecoverableError)),n=Gc(n,null,e,1,t??null,l,!1,o,i),e[qe]=n.current,tr(e),r)for(e=0;e<r.length;e++)t=r[e],l=t._getVersion,l=l(t._source),n.mutableSourceEagerHydrationData==null?n.mutableSourceEagerHydrationData=[t,l]:n.mutableSourceEagerHydrationData.push(t,l);return new Fl(n)};Se.render=function(e,n,t){if(!Wl(n))throw Error(x(200));return Ul(null,e,n,!1,t)};Se.unmountComponentAtNode=function(e){if(!Wl(e))throw Error(x(40));return e._reactRootContainer?(Vn(function(){Ul(null,null,e,!1,function(){e._reactRootContainer=null,e[qe]=null})}),!0):!1};Se.unstable_batchedUpdates=ia;Se.unstable_renderSubtreeIntoContainer=function(e,n,t,r){if(!Wl(t))throw Error(x(200));if(e==null||e._reactInternals===void 0)throw Error(x(38));return Ul(e,n,t,!1,r)};Se.version="18.3.1-next-f1338f8080-20240426"});var ep=Ke((l0,qc)=>{"use strict";function Jc(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(Jc)}catch(e){console.error(e)}}Jc(),qc.exports=bc()});var tp=Ke(ma=>{"use strict";var np=ep();ma.createRoot=np.createRoot,ma.hydrateRoot=np.hydrateRoot;var o0});var lp=Ke(Bl=>{"use strict";var $f=ln(),Qf=Symbol.for("react.element"),Kf=Symbol.for("react.fragment"),Yf=Object.prototype.hasOwnProperty,Xf=$f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,Gf={key:!0,ref:!0,__self:!0,__source:!0};function rp(e,n,t){var r,l={},o=null,i=null;t!==void 0&&(o=""+t),n.key!==void 0&&(o=""+n.key),n.ref!==void 0&&(i=n.ref);for(r in n)Yf.call(n,r)&&!Gf.hasOwnProperty(r)&&(l[r]=n[r]);if(e&&e.defaultProps)for(r in n=e.defaultProps,n)l[r]===void 0&&(l[r]=n[r]);return{$$typeof:Qf,type:e,key:o,ref:i,props:l,_owner:Xf.current}}Bl.Fragment=Kf;Bl.jsx=rp;Bl.jsxs=rp});var Ne=Ke((s0,op)=>{"use strict";op.exports=lp()});var vp=Z(ln(),1),yp=Z(tp(),1);var q=Z(ln(),1);var gp=Z(ln(),1);var y=Z(Ne(),1);function gr({className:e="",size:n=24}){return(0,y.jsxs)("svg",{width:n,height:n,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:e,children:[(0,y.jsx)("path",{d:"M6 13.87A4 4 0 0 1 7.41 6a5.11 5.11 0 0 1 1.05-1.54 5 5 0 0 1 7.08 0A5.11 5.11 0 0 1 16.59 6 4 4 0 0 1 18 13.87V21H6Z"}),(0,y.jsx)("line",{x1:"6",x2:"18",y1:"17",y2:"17"})]})}function Al({className:e="",size:n=24}){return(0,y.jsxs)("svg",{width:n,height:n,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:e,children:[(0,y.jsx)("rect",{width:"18",height:"18",x:"3",y:"4",rx:"2",ry:"2"}),(0,y.jsx)("line",{x1:"16",x2:"16",y1:"2",y2:"6"}),(0,y.jsx)("line",{x1:"8",x2:"8",y1:"2",y2:"6"}),(0,y.jsx)("line",{x1:"3",x2:"21",y1:"10",y2:"10"})]})}function Me({className:e="",size:n=24}){return(0,y.jsxs)("svg",{width:n,height:n,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:e,children:[(0,y.jsx)("line",{x1:"12",x2:"12",y1:"2",y2:"22"}),(0,y.jsx)("path",{d:"M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"})]})}function zn({className:e="",size:n=24}){return(0,y.jsx)("svg",{width:n,height:n,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:e,children:(0,y.jsx)("path",{d:"M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"})})}function Pn({className:e="",size:n=24}){return(0,y.jsxs)("svg",{width:n,height:n,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:e,children:[(0,y.jsx)("path",{d:"M12 2a4 4 0 0 0-4 4v2a4 4 0 0 0 8 0V6a4 4 0 0 0-4-4z"}),(0,y.jsx)("path",{d:"M12 12v10"}),(0,y.jsx)("path",{d:"M8 16h8"}),(0,y.jsx)("path",{d:"M6 20h12"})]})}function hr({className:e="",size:n=24}){return(0,y.jsxs)("svg",{width:n,height:n,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:e,children:[(0,y.jsx)("circle",{cx:"8",cy:"21",r:"1"}),(0,y.jsx)("circle",{cx:"19",cy:"21",r:"1"}),(0,y.jsx)("path",{d:"M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"})]})}function Qn({className:e="",size:n=24}){return(0,y.jsxs)("svg",{width:n,height:n,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:e,children:[(0,y.jsx)("circle",{cx:"12",cy:"12",r:"10"}),(0,y.jsx)("polyline",{points:"12 6 12 12 16 14"})]})}function Vl({className:e="",size:n=24}){return(0,y.jsxs)("svg",{width:n,height:n,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:e,children:[(0,y.jsx)("path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"}),(0,y.jsx)("circle",{cx:"9",cy:"7",r:"4"}),(0,y.jsx)("path",{d:"M22 21v-2a4 4 0 0 0-3-3.87"}),(0,y.jsx)("path",{d:"M16 3.13a4 4 0 0 1 0 7.75"})]})}function ip({className:e="",size:n=24}){return(0,y.jsxs)("svg",{width:n,height:n,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:e,children:[(0,y.jsx)("path",{d:"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"}),(0,y.jsx)("path",{d:"M21 3v5h-5"}),(0,y.jsx)("path",{d:"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"}),(0,y.jsx)("path",{d:"M8 16H3v5"})]})}function ga({className:e="",size:n=24}){return(0,y.jsxs)("svg",{width:n,height:n,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:e,children:[(0,y.jsx)("path",{d:"M16 3h5v5"}),(0,y.jsx)("path",{d:"M8 3H3v5"}),(0,y.jsx)("path",{d:"M21 3l-7 7"}),(0,y.jsx)("path",{d:"M3 3l7 7"}),(0,y.jsx)("path",{d:"M16 21h5v-5"}),(0,y.jsx)("path",{d:"M8 21H3v-5"}),(0,y.jsx)("path",{d:"M21 21l-7-7"}),(0,y.jsx)("path",{d:"M3 21l7-7"})]})}function ha({className:e="",size:n=24}){return(0,y.jsxs)("svg",{width:n,height:n,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:e,children:[(0,y.jsx)("path",{d:"M15 3h6v6"}),(0,y.jsx)("path",{d:"M9 21H3v-6"}),(0,y.jsx)("path",{d:"M21 3l-7 7"}),(0,y.jsx)("path",{d:"M3 21l7-7"})]})}function Hl({className:e="",size:n=24}){return(0,y.jsxs)("svg",{width:n,height:n,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:e,children:[(0,y.jsx)("line",{x1:"18",x2:"6",y1:"6",y2:"18"}),(0,y.jsx)("line",{x1:"6",x2:"18",y1:"6",y2:"18"})]})}function ap({className:e="",size:n=24}){return(0,y.jsx)("svg",{width:n,height:n,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:e,children:(0,y.jsx)("polyline",{points:"20 6 9 17 4 12"})})}function $l({className:e="",size:n=24}){return(0,y.jsxs)("svg",{width:n,height:n,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:e,children:[(0,y.jsx)("path",{d:"M12 2v4"}),(0,y.jsx)("path",{d:"m4.93 4.93 2.83 2.83"}),(0,y.jsx)("path",{d:"M2 12h4"}),(0,y.jsx)("path",{d:"m4.93 19.07 2.83-2.83"}),(0,y.jsx)("path",{d:"M12 18v4"}),(0,y.jsx)("path",{d:"m19.07 19.07-2.83-2.83"}),(0,y.jsx)("path",{d:"M22 12h-4"}),(0,y.jsx)("path",{d:"m19.07 4.93-2.83 2.83"}),(0,y.jsx)("circle",{cx:"12",cy:"12",r:"4"})]})}function St({className:e="",size:n=24}){return(0,y.jsxs)("svg",{width:n,height:n,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:e,children:[(0,y.jsx)("circle",{cx:"12",cy:"12",r:"4"}),(0,y.jsx)("path",{d:"M12 2v2"}),(0,y.jsx)("path",{d:"M12 20v2"}),(0,y.jsx)("path",{d:"m4.93 4.93 1.41 1.41"}),(0,y.jsx)("path",{d:"m17.66 17.66 1.41 1.41"}),(0,y.jsx)("path",{d:"M2 12h2"}),(0,y.jsx)("path",{d:"M20 12h2"}),(0,y.jsx)("path",{d:"m6.34 17.66-1.41 1.41"}),(0,y.jsx)("path",{d:"m19.07 4.93-1.41 1.41"})]})}function Ql({className:e="",size:n=24}){return(0,y.jsx)("svg",{width:n,height:n,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:e,children:(0,y.jsx)("path",{d:"M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"})})}function Kl({className:e="",size:n=24}){return(0,y.jsxs)("svg",{width:n,height:n,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:e,children:[(0,y.jsx)("path",{d:"M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5"}),(0,y.jsx)("path",{d:"M8.5 8.5v.01"}),(0,y.jsx)("path",{d:"M16 15.5v.01"}),(0,y.jsx)("path",{d:"M12 12v.01"}),(0,y.jsx)("path",{d:"M11 17v.01"}),(0,y.jsx)("path",{d:"M7 14v.01"})]})}function In({className:e="",size:n=24}){return(0,y.jsxs)("svg",{width:n,height:n,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:e,children:[(0,y.jsx)("path",{d:"M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"}),(0,y.jsx)("path",{d:"M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"})]})}function vr({className:e="",size:n=24}){return(0,y.jsx)("svg",{width:n,height:n,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:e,children:(0,y.jsx)("polygon",{points:"13 2 3 14 12 14 11 22 21 10 12 10 13 2"})})}function sp({className:e="",size:n=24}){return(0,y.jsx)("svg",{width:n,height:n,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:e,children:(0,y.jsx)("path",{d:"M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"})})}function up({className:e="",size:n=24}){return(0,y.jsx)("svg",{width:n,height:n,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:e,children:(0,y.jsx)("path",{d:"m6 9 6 6 6-6"})})}function cp({className:e="",size:n=24}){return(0,y.jsx)("svg",{width:n,height:n,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:e,children:(0,y.jsx)("path",{d:"m18 15-6-6-6 6"})})}function pp({className:e="",size:n=24}){return(0,y.jsx)("svg",{width:n,height:n,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:e,children:(0,y.jsx)("path",{d:"m15 18-6-6 6-6"})})}function dp({className:e="",size:n=24}){return(0,y.jsx)("svg",{width:n,height:n,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:e,children:(0,y.jsx)("path",{d:"m9 18 6-6-6-6"})})}function fp({className:e="",size:n=24}){return(0,y.jsx)("svg",{width:n,height:n,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:e,children:(0,y.jsx)("polygon",{points:"12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"})})}function mp({className:e="",size:n=24}){return(0,y.jsxs)("svg",{width:n,height:n,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:e,children:[(0,y.jsx)("path",{d:"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"}),(0,y.jsx)("polyline",{points:"15 3 21 3 21 9"}),(0,y.jsx)("line",{x1:"10",x2:"21",y1:"14",y2:"3"})]})}var N=Z(Ne(),1),Zf={breakfast:$l,lunch:St,dinner:Ql,snack:Kl};function va({plan:e,onOrderIngredients:n,onOpenFullPlan:t}){let{household:r,constraints:l,budget_summary:o,nutrition_summary:i,days:a}=e,[s,p]=(0,gp.useState)(0),v=l.diet.length>0?l.diet[0].charAt(0).toUpperCase()+l.diet[0].slice(1):"Balanced",m=a[s];return(0,N.jsxs)("div",{className:"cp-inline-widget",children:[(0,N.jsxs)("div",{className:"cp-inline-header",children:[(0,N.jsxs)("div",{className:"cp-inline-logo",children:[(0,N.jsx)(gr,{size:28,className:"cp-icon-green"}),(0,N.jsx)("span",{className:"cp-inline-brand",children:"ChefPlan"})]}),(0,N.jsxs)("button",{className:"cp-expand-btn",onClick:t,children:[(0,N.jsx)(ha,{size:18}),"Open Full"]})]}),(0,N.jsx)("h2",{className:"cp-inline-title",children:"Weekly meal plan"}),(0,N.jsxs)("div",{className:"cp-inline-context",children:[(0,N.jsxs)("span",{className:"cp-context-item",children:[(0,N.jsx)(Vl,{size:14}),"Family of ",r.size]}),(0,N.jsx)("span",{className:"cp-context-divider",children:"\xB7"}),(0,N.jsxs)("span",{className:"cp-context-item",children:[(0,N.jsx)(In,{size:14}),v]}),(0,N.jsx)("span",{className:"cp-context-divider",children:"\xB7"}),(0,N.jsxs)("span",{className:"cp-context-item",children:[(0,N.jsx)(Me,{size:14}),"Budget <$",l.budget_target]}),(0,N.jsx)("span",{className:"cp-context-divider",children:"\xB7"}),(0,N.jsxs)("span",{className:"cp-context-item",children:[(0,N.jsx)(Al,{size:14}),"7 days"]})]}),(0,N.jsxs)("div",{className:"cp-inline-metrics",children:[(0,N.jsxs)("div",{className:"cp-metric",children:[(0,N.jsx)(Me,{size:18,className:"cp-icon-orange"}),(0,N.jsxs)("div",{className:"cp-metric-content",children:[(0,N.jsxs)("span",{className:"cp-metric-value",children:["$",o.estimated_total.toFixed(2)]}),(0,N.jsx)("span",{className:"cp-metric-label",children:"Est. total"})]})]}),(0,N.jsxs)("div",{className:"cp-metric",children:[(0,N.jsx)(zn,{size:18,className:"cp-icon-orange"}),(0,N.jsxs)("div",{className:"cp-metric-content",children:[(0,N.jsx)("span",{className:"cp-metric-value",children:i.avg_calories_per_day}),(0,N.jsx)("span",{className:"cp-metric-label",children:"kcal/day"})]})]}),(0,N.jsxs)("div",{className:"cp-metric",children:[(0,N.jsx)(Pn,{size:18,className:"cp-icon-green"}),(0,N.jsxs)("div",{className:"cp-metric-content",children:[(0,N.jsxs)("span",{className:"cp-metric-value",children:[i.avg_protein_g,"g"]}),(0,N.jsx)("span",{className:"cp-metric-label",children:"protein/day"})]})]})]}),(0,N.jsx)("div",{className:"cp-day-tabs",children:a.map((f,w)=>(0,N.jsx)("button",{className:`cp-day-tab ${s===w?"active":""}`,onClick:()=>p(w),children:f.day},f.day))}),(0,N.jsx)("div",{className:"cp-meals-grid",children:m.meals.map(f=>{let w=Zf[f.type]||St;return(0,N.jsxs)("div",{className:"cp-meal-card",children:[f.image_url?(0,N.jsxs)("div",{className:"cp-meal-image",children:[(0,N.jsx)("img",{src:f.image_url,alt:f.title}),(0,N.jsx)("span",{className:"cp-meal-type-badge",children:f.type})]}):(0,N.jsxs)("div",{className:"cp-meal-placeholder",children:[(0,N.jsx)(w,{size:24}),(0,N.jsx)("span",{className:"cp-meal-type-badge",children:f.type})]}),(0,N.jsxs)("div",{className:"cp-meal-info",children:[(0,N.jsx)("span",{className:"cp-meal-title",children:f.title}),(0,N.jsxs)("div",{className:"cp-meal-meta",children:[(0,N.jsxs)("span",{children:[(0,N.jsx)(Qn,{size:12})," ",f.prep_minutes,"m"]}),(0,N.jsxs)("span",{children:[(0,N.jsx)(zn,{size:12})," ",f.calories]}),(0,N.jsxs)("span",{children:[(0,N.jsx)(Me,{size:12})," $",f.estimated_cost.toFixed(0)]})]})]})]},f.meal_id)})}),(0,N.jsxs)("div",{className:"cp-day-stats",children:[(0,N.jsxs)("span",{children:[m.totals.calories," kcal"]}),(0,N.jsx)("span",{children:"\xB7"}),(0,N.jsxs)("span",{children:[m.totals.protein_g,"g protein"]}),(0,N.jsx)("span",{children:"\xB7"}),(0,N.jsxs)("span",{children:[m.totals.carbs_g,"g carbs"]}),(0,N.jsx)("span",{children:"\xB7"}),(0,N.jsxs)("span",{children:[m.totals.fat_g,"g fat"]})]}),(0,N.jsxs)("div",{className:"cp-inline-actions",children:[(0,N.jsxs)("button",{className:"cp-btn cp-btn-primary",onClick:t,children:[(0,N.jsx)(ha,{size:18}),"View Full Plan"]}),(0,N.jsxs)("button",{className:"cp-btn cp-btn-secondary",onClick:n,children:[(0,N.jsx)(hr,{size:18}),"Order Ingredients"]})]}),(0,N.jsx)("style",{children:`
        .cp-inline-widget {
          background: rgba(255, 255, 255, 0.92);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(0, 0, 0, 0.08);
          border-radius: 20px;
          padding: 24px;
          width: 100%;
          max-height: 800px;
          overflow-y: auto;
          box-shadow:
            0 4px 24px rgba(0, 0, 0, 0.08),
            0 1px 2px rgba(0, 0, 0, 0.04);
          font-family: 'Inter', system-ui, -apple-system, sans-serif;
          box-sizing: border-box;
        }

        .cp-inline-widget::-webkit-scrollbar {
          width: 8px;
        }

        .cp-inline-widget::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.05);
          border-radius: 4px;
        }

        .cp-inline-widget::-webkit-scrollbar-thumb {
          background: rgba(0, 0, 0, 0.2);
          border-radius: 4px;
        }

        .cp-inline-widget::-webkit-scrollbar-thumb:hover {
          background: rgba(0, 0, 0, 0.3);
        }

        .cp-inline-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 16px;
        }

        .cp-inline-logo {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .cp-inline-brand {
          font-weight: 700;
          font-size: 18px;
          background: linear-gradient(135deg, #16a34a, #22c55e);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .cp-expand-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 8px 14px;
          border-radius: 10px;
          border: 1px solid rgba(34, 197, 94, 0.3);
          background: rgba(34, 197, 94, 0.1);
          color: #16a34a;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }

        .cp-expand-btn:hover {
          background: rgba(34, 197, 94, 0.2);
          border-color: #16a34a;
        }

        .cp-icon-green { color: #16a34a; }
        .cp-icon-orange { color: #f97316; }

        .cp-inline-title {
          font-size: 24px;
          font-weight: 700;
          color: #111827;
          margin: 0 0 8px 0;
        }

        .cp-inline-context {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 6px;
          color: #6b7280;
          font-size: 13px;
          margin-bottom: 20px;
        }

        .cp-context-item {
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .cp-context-divider {
          color: #d1d5db;
        }

        .cp-inline-metrics {
          display: flex;
          gap: 16px;
          padding: 16px;
          background: linear-gradient(135deg, rgba(240, 253, 244, 0.8), rgba(255, 255, 255, 0.8));
          border-radius: 14px;
          margin-bottom: 20px;
          border: 1px solid rgba(34, 197, 94, 0.15);
        }

        .cp-metric {
          flex: 1;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .cp-metric-content {
          display: flex;
          flex-direction: column;
        }

        .cp-metric-value {
          font-size: 18px;
          font-weight: 700;
          color: #111827;
        }

        .cp-metric-label {
          font-size: 11px;
          color: #6b7280;
        }

        .cp-day-tabs {
          display: flex;
          gap: 6px;
          margin-bottom: 16px;
          overflow-x: auto;
          padding-bottom: 4px;
        }

        .cp-day-tab {
          flex: 1;
          min-width: 44px;
          padding: 10px 8px;
          border-radius: 10px;
          border: 1px solid rgba(0, 0, 0, 0.08);
          background: rgba(255, 255, 255, 0.8);
          font-size: 13px;
          font-weight: 600;
          color: #6b7280;
          cursor: pointer;
          transition: all 0.2s;
          text-align: center;
        }

        .cp-day-tab:hover {
          border-color: rgba(34, 197, 94, 0.3);
          color: #16a34a;
        }

        .cp-day-tab.active {
          background: linear-gradient(135deg, #22c55e, #16a34a);
          color: white;
          border-color: transparent;
          box-shadow: 0 2px 8px rgba(34, 197, 94, 0.3);
        }

        .cp-meals-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
          margin-bottom: 16px;
        }

        .cp-meal-card {
          background: rgba(255, 255, 255, 0.9);
          border-radius: 14px;
          overflow: hidden;
          border: 1px solid rgba(0, 0, 0, 0.06);
          transition: all 0.2s;
        }

        .cp-meal-card:hover {
          border-color: rgba(34, 197, 94, 0.3);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
          transform: translateY(-2px);
        }

        .cp-meal-image {
          position: relative;
          width: 100%;
          height: 100px;
          overflow: hidden;
        }

        .cp-meal-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .cp-meal-placeholder {
          position: relative;
          width: 100%;
          height: 100px;
          background: linear-gradient(135deg, #f0fdf4, #dcfce7);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #16a34a;
        }

        .cp-meal-type-badge {
          position: absolute;
          top: 8px;
          left: 8px;
          padding: 4px 8px;
          background: rgba(0, 0, 0, 0.6);
          backdrop-filter: blur(4px);
          color: white;
          font-size: 10px;
          font-weight: 600;
          text-transform: uppercase;
          border-radius: 6px;
        }

        .cp-meal-info {
          padding: 12px;
        }

        .cp-meal-title {
          display: block;
          font-size: 13px;
          font-weight: 600;
          color: #111827;
          margin-bottom: 6px;
          line-height: 1.3;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }

        .cp-meal-meta {
          display: flex;
          gap: 8px;
          font-size: 11px;
          color: #6b7280;
        }

        .cp-meal-meta span {
          display: flex;
          align-items: center;
          gap: 3px;
        }

        .cp-day-stats {
          display: flex;
          justify-content: center;
          gap: 8px;
          font-size: 12px;
          color: #6b7280;
          padding: 12px;
          background: rgba(0, 0, 0, 0.02);
          border-radius: 10px;
          margin-bottom: 20px;
        }

        .cp-inline-actions {
          display: flex;
          gap: 12px;
        }

        .cp-btn {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 14px 20px;
          border-radius: 14px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          border: none;
          font-family: inherit;
        }

        .cp-btn-primary {
          background: linear-gradient(135deg, #22c55e, #16a34a);
          color: white;
          box-shadow: 0 4px 14px rgba(34, 197, 94, 0.35);
        }

        .cp-btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(34, 197, 94, 0.45);
        }

        .cp-btn-secondary {
          background: rgba(255, 255, 255, 0.9);
          color: #374151;
          border: 1px solid rgba(0, 0, 0, 0.1);
        }

        .cp-btn-secondary:hover {
          background: white;
          border-color: #f97316;
          color: #f97316;
        }

        @media (max-width: 480px) {
          .cp-meals-grid {
            grid-template-columns: 1fr;
          }

          .cp-inline-actions {
            flex-direction: column;
          }

          .cp-inline-metrics {
            flex-wrap: wrap;
          }

          .cp-metric {
            flex: 1 1 45%;
          }
        }
      `})]})}var Yl=Z(ln(),1);var g=Z(Ne(),1),bf={breakfast:$l,lunch:St,dinner:Ql,snack:Kl};function ya({plan:e,selectedRecipe:n,onClose:t,onSwapMeal:r,onRebuildWeek:l,onOrderIngredients:o,onSelectMeal:i}){let[a,s]=(0,Yl.useState)(e.days[0]?.day||"Mon"),[p,v]=(0,Yl.useState)(null),[m,f]=(0,Yl.useState)({Produce:!0,Proteins:!0,Dairy:!1,Pantry:!1,Frozen:!1}),w=e.days.find(u=>u.day===a)||e.days[0],S=u=>{v(u.meal_id),i(e.plan_id,u.meal_id)},C=u=>{f(c=>({...c,[u]:!c[u]}))},O=u=>({"high-protein":"cp-tag-green",quick:"cp-tag-orange",budget:"cp-tag-blue",healthy:"cp-tag-green",vegan:"cp-tag-emerald",vegetarian:"cp-tag-emerald","kid-friendly":"cp-tag-purple",keto:"cp-tag-amber","low-carb":"cp-tag-amber","meal-prep":"cp-tag-blue",popular:"cp-tag-pink"})[u]||"cp-tag-gray";return(0,g.jsxs)("div",{className:"cp-fullscreen",children:[(0,g.jsxs)("header",{className:"cp-fs-header",children:[(0,g.jsxs)("div",{className:"cp-fs-header-left",children:[(0,g.jsx)(gr,{size:28,className:"cp-icon-green"}),(0,g.jsxs)("div",{children:[(0,g.jsx)("h1",{className:"cp-fs-title",children:"Weekly meal plan"}),(0,g.jsxs)("p",{className:"cp-fs-subtitle",children:["Mar 16\u201322 \xB7 Family of ",e.household.size," \xB7"," ",e.constraints.diet[0]||"Balanced"," \xB7 <$",e.constraints.budget_target]})]})]}),(0,g.jsx)("button",{className:"cp-close-btn",onClick:t,children:(0,g.jsx)(Hl,{size:24})})]}),(0,g.jsxs)("div",{className:"cp-fs-metrics",children:[(0,g.jsxs)("div",{className:"cp-fs-metric",children:[(0,g.jsx)(Me,{size:20,className:"cp-icon-orange"}),(0,g.jsxs)("span",{className:"cp-fs-metric-value",children:["$",e.budget_summary.estimated_total.toFixed(2)]}),(0,g.jsx)("span",{className:"cp-fs-metric-label",children:"Budget"})]}),(0,g.jsxs)("div",{className:"cp-fs-metric",children:[(0,g.jsx)(zn,{size:20,className:"cp-icon-orange"}),(0,g.jsx)("span",{className:"cp-fs-metric-value",children:e.nutrition_summary.avg_calories_per_day}),(0,g.jsx)("span",{className:"cp-fs-metric-label",children:"Avg/day"})]}),(0,g.jsxs)("div",{className:"cp-fs-metric",children:[(0,g.jsx)(Pn,{size:20,className:"cp-icon-green"}),(0,g.jsxs)("span",{className:"cp-fs-metric-value",children:[e.nutrition_summary.avg_protein_g,"g"]}),(0,g.jsx)("span",{className:"cp-fs-metric-label",children:"Protein"})]}),(0,g.jsxs)("div",{className:"cp-fs-metric",children:[(0,g.jsx)(In,{size:20,className:"cp-icon-green"}),(0,g.jsxs)("span",{className:"cp-fs-metric-value",children:[e.nutrition_summary.avg_carbs_g,"g"]}),(0,g.jsx)("span",{className:"cp-fs-metric-label",children:"Carbs"})]})]}),(0,g.jsxs)("section",{className:"cp-fs-section",children:[(0,g.jsxs)("h2",{className:"cp-fs-section-title",children:[(0,g.jsx)(Al,{size:20}),"Weekly Calendar"]}),(0,g.jsx)("div",{className:"cp-week-tabs",children:e.days.map(u=>(0,g.jsx)("button",{className:`cp-week-tab ${a===u.day?"active":""}`,onClick:()=>s(u.day),children:u.day},u.day))}),(0,g.jsxs)("div",{className:"cp-day-meals",children:[(0,g.jsxs)("div",{className:"cp-day-header",children:[(0,g.jsx)("span",{className:"cp-day-label",children:w.day}),(0,g.jsxs)("span",{className:"cp-day-stats",children:[w.totals.calories," kcal \xB7 ",w.totals.protein_g,"g protein"]})]}),w.meals.map(u=>{let c=bf[u.type]||St,d=p===u.meal_id;return(0,g.jsxs)("div",{className:`cp-meal-card ${d?"selected":""}`,onClick:()=>S(u),children:[u.image_url?(0,g.jsx)("div",{className:"cp-meal-image",children:(0,g.jsx)("img",{src:u.image_url,alt:u.title})}):(0,g.jsx)("div",{className:"cp-meal-icon",children:(0,g.jsx)(c,{size:20})}),(0,g.jsxs)("div",{className:"cp-meal-content",children:[(0,g.jsx)("span",{className:"cp-meal-type",children:u.type}),(0,g.jsx)("span",{className:"cp-meal-title",children:u.title}),(0,g.jsxs)("div",{className:"cp-meal-meta",children:[(0,g.jsxs)("span",{children:[(0,g.jsx)(Qn,{size:12})," ",u.prep_minutes," min"]}),(0,g.jsxs)("span",{children:[(0,g.jsx)(zn,{size:12})," ",u.calories," kcal"]}),(0,g.jsxs)("span",{children:[(0,g.jsx)(Me,{size:12})," $",u.estimated_cost.toFixed(2)]})]}),u.source&&u.source!=="fallback"&&(0,g.jsxs)("span",{className:"cp-meal-source",children:["via ",u.source]})]}),(0,g.jsxs)("button",{className:"cp-swap-btn",onClick:h=>{h.stopPropagation(),r(u.meal_id)},children:[(0,g.jsx)(ga,{size:16}),"Swap"]})]},u.meal_id)})]})]}),n&&(0,g.jsxs)("section",{className:"cp-fs-section cp-recipe-section",children:[(0,g.jsxs)("h2",{className:"cp-fs-section-title",children:[(0,g.jsx)(gr,{size:20}),"Selected Meal Details"]}),(0,g.jsxs)("div",{className:"cp-recipe-card",children:[(0,g.jsxs)("div",{className:"cp-recipe-header",children:[(0,g.jsx)("h3",{className:"cp-recipe-title",children:n.title}),(0,g.jsxs)("div",{className:"cp-recipe-tags",children:[n.tags.map(u=>(0,g.jsx)("span",{className:`cp-tag ${O(u)}`,children:u.replace("-"," ")},u)),n.source&&n.source!=="fallback"&&(0,g.jsxs)("span",{className:"cp-tag cp-tag-gray",children:["via ",n.source]})]})]}),(0,g.jsxs)("div",{className:"cp-recipe-stats",children:[(0,g.jsxs)("div",{className:"cp-recipe-stat",children:[(0,g.jsx)(Qn,{size:16}),(0,g.jsxs)("span",{children:["Prep ",n.prep_minutes," min"]})]}),(0,g.jsxs)("div",{className:"cp-recipe-stat",children:[(0,g.jsx)(Vl,{size:16}),(0,g.jsxs)("span",{children:["Serves ",n.servings]})]}),(0,g.jsxs)("div",{className:"cp-recipe-stat",children:[(0,g.jsx)(Me,{size:16}),(0,g.jsxs)("span",{children:["$",n.estimated_cost.toFixed(2)," total"]})]})]}),(0,g.jsxs)("div",{className:"cp-recipe-nutrition",children:[(0,g.jsxs)("span",{children:[(0,g.jsx)(Pn,{size:14})," Protein"," ",n.macros.protein_g,"g"]}),(0,g.jsxs)("span",{children:[(0,g.jsx)(In,{size:14})," Carbs ",n.macros.carbs_g,"g"]}),(0,g.jsxs)("span",{children:[(0,g.jsx)(vr,{size:14})," Fat ",n.macros.fat_g,"g"]})]}),(0,g.jsxs)("div",{className:"cp-recipe-ingredients",children:[(0,g.jsx)("h4",{children:"Ingredients"}),(0,g.jsx)("ul",{children:n.ingredients.map((u,c)=>(0,g.jsxs)("li",{children:[u.amount," ",u.name,u.notes&&(0,g.jsxs)("span",{className:"cp-ing-note",children:[" (",u.notes,")"]})]},c))})]}),(0,g.jsxs)("div",{className:"cp-recipe-steps",children:[(0,g.jsx)("h4",{children:"Steps"}),(0,g.jsx)("ol",{children:n.instructions.map((u,c)=>(0,g.jsx)("li",{children:u},c))})]}),(0,g.jsxs)("div",{className:"cp-recipe-actions",children:[(0,g.jsxs)("button",{className:"cp-btn cp-btn-outline",onClick:()=>r(n.meal_id),children:[(0,g.jsx)(ga,{size:16}),"Replace this meal"]}),(0,g.jsxs)("button",{className:"cp-btn cp-btn-outline",children:[(0,g.jsx)(vr,{size:16}),"Make faster"]}),(0,g.jsxs)("button",{className:"cp-btn cp-btn-outline",children:[(0,g.jsx)(Me,{size:16}),"Make cheaper"]})]})]})]}),(0,g.jsxs)("section",{className:"cp-fs-section",children:[(0,g.jsxs)("h2",{className:"cp-fs-section-title",children:[(0,g.jsx)(hr,{size:20}),"Shopping List"]}),(0,g.jsx)("div",{className:"cp-shopping-list",children:e.shopping_list.map(u=>(0,g.jsxs)("div",{className:"cp-shop-section",children:[(0,g.jsxs)("button",{className:"cp-shop-header",onClick:()=>C(u.section),children:[(0,g.jsx)("span",{children:u.section}),(0,g.jsxs)("span",{className:"cp-shop-count",children:[u.items.length," items"]}),m[u.section]?(0,g.jsx)(cp,{size:18}):(0,g.jsx)(up,{size:18})]}),m[u.section]&&(0,g.jsx)("div",{className:"cp-shop-items",children:u.items.map((c,d)=>(0,g.jsxs)("div",{className:"cp-shop-item",children:[(0,g.jsx)("span",{className:"cp-shop-item-name",children:c.name}),(0,g.jsxs)("span",{className:"cp-shop-item-qty",children:[c.quantity," ",c.unit]}),c.estimated_cost&&(0,g.jsxs)("span",{className:"cp-shop-item-cost",children:["$",c.estimated_cost.toFixed(2)]})]},d))})]},u.section))})]}),(0,g.jsxs)("div",{className:"cp-fs-actions",children:[(0,g.jsxs)("button",{className:"cp-btn cp-btn-outline",onClick:l,children:[(0,g.jsx)(ip,{size:18}),"Rebuild week"]}),(0,g.jsxs)("button",{className:"cp-btn cp-btn-primary",onClick:()=>o("instacart"),children:[(0,g.jsx)(hr,{size:18}),"Order with Instacart",(0,g.jsx)(mp,{size:14})]})]}),(0,g.jsx)("style",{children:`
        .cp-fullscreen {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          overflow-y: auto;
          background: linear-gradient(135deg, #f0fdf4 0%, #ffffff 50%, #fff7ed 100%);
          padding-bottom: 100px;
          font-family: 'Inter', system-ui, -apple-system, sans-serif;
          z-index: 50;
        }

        .cp-fullscreen::-webkit-scrollbar {
          width: 8px;
        }

        .cp-fullscreen::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.05);
        }

        .cp-fullscreen::-webkit-scrollbar-thumb {
          background: rgba(0, 0, 0, 0.2);
          border-radius: 4px;
        }

        .cp-fullscreen::-webkit-scrollbar-thumb:hover {
          background: rgba(0, 0, 0, 0.3);
        }

        .cp-fs-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 20px 24px;
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid rgba(0, 0, 0, 0.05);
          position: sticky;
          top: 0;
          z-index: 100;
        }

        .cp-fs-header-left {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .cp-fs-title {
          font-size: 20px;
          font-weight: 700;
          color: #111827;
          margin: 0;
        }

        .cp-fs-subtitle {
          font-size: 13px;
          color: #6b7280;
          margin: 4px 0 0 0;
        }

        .cp-close-btn {
          background: rgba(0, 0, 0, 0.05);
          border: none;
          border-radius: 12px;
          padding: 10px;
          cursor: pointer;
          color: #6b7280;
          transition: all 0.2s;
        }

        .cp-close-btn:hover {
          background: rgba(0, 0, 0, 0.1);
          color: #111827;
        }

        .cp-icon-green { color: #16a34a; }
        .cp-icon-orange { color: #f97316; }

        .cp-fs-metrics {
          display: flex;
          gap: 16px;
          padding: 20px 24px;
          background: rgba(255, 255, 255, 0.7);
          margin: 16px 24px;
          border-radius: 16px;
          border: 1px solid rgba(255, 255, 255, 0.5);
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.04);
        }

        .cp-fs-metric {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
        }

        .cp-fs-metric-value {
          font-size: 18px;
          font-weight: 700;
          color: #111827;
        }

        .cp-fs-metric-label {
          font-size: 11px;
          color: #6b7280;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .cp-fs-section {
          margin: 24px;
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(12px);
          border-radius: 20px;
          padding: 24px;
          border: 1px solid rgba(255, 255, 255, 0.5);
          box-shadow: 0 4px 24px rgba(0, 0, 0, 0.04);
        }

        .cp-fs-section-title {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 16px;
          font-weight: 700;
          color: #111827;
          margin: 0 0 20px 0;
        }

        .cp-week-tabs {
          display: flex;
          gap: 8px;
          margin-bottom: 20px;
          overflow-x: auto;
          padding-bottom: 4px;
        }

        .cp-week-tab {
          padding: 10px 20px;
          border-radius: 12px;
          border: 1px solid rgba(0, 0, 0, 0.08);
          background: rgba(255, 255, 255, 0.8);
          font-size: 14px;
          font-weight: 600;
          color: #374151;
          cursor: pointer;
          transition: all 0.2s;
          white-space: nowrap;
        }

        .cp-week-tab:hover {
          border-color: #22c55e;
          color: #16a34a;
        }

        .cp-week-tab.active {
          background: linear-gradient(135deg, #22c55e, #16a34a);
          color: white;
          border-color: transparent;
          box-shadow: 0 4px 12px rgba(34, 197, 94, 0.3);
        }

        .cp-day-meals {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .cp-day-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-bottom: 12px;
          border-bottom: 1px solid rgba(0, 0, 0, 0.05);
        }

        .cp-day-label {
          font-size: 18px;
          font-weight: 700;
          color: #111827;
        }

        .cp-day-stats {
          font-size: 13px;
          color: #6b7280;
        }

        .cp-meal-card {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 16px;
          background: rgba(255, 255, 255, 0.9);
          border-radius: 14px;
          border: 1px solid rgba(0, 0, 0, 0.05);
          cursor: pointer;
          transition: all 0.2s;
        }

        .cp-meal-card:hover {
          border-color: rgba(34, 197, 94, 0.3);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
        }

        .cp-meal-card.selected {
          border-color: #22c55e;
          box-shadow: 0 4px 16px rgba(34, 197, 94, 0.2);
        }

        .cp-meal-icon {
          width: 44px;
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #f0fdf4, #dcfce7);
          border-radius: 12px;
          color: #16a34a;
          flex-shrink: 0;
        }

        .cp-meal-image {
          width: 64px;
          height: 64px;
          border-radius: 12px;
          overflow: hidden;
          flex-shrink: 0;
        }

        .cp-meal-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .cp-meal-source {
          display: inline-block;
          font-size: 10px;
          color: #9ca3af;
          text-transform: uppercase;
          letter-spacing: 0.3px;
          margin-top: 4px;
        }

        .cp-meal-content {
          flex: 1;
        }

        .cp-meal-type {
          display: block;
          font-size: 11px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: #9ca3af;
        }

        .cp-meal-title {
          display: block;
          font-size: 15px;
          font-weight: 600;
          color: #111827;
          margin: 2px 0 6px;
        }

        .cp-meal-meta {
          display: flex;
          gap: 12px;
          font-size: 12px;
          color: #6b7280;
        }

        .cp-meal-meta span {
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .cp-swap-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 8px 14px;
          border-radius: 10px;
          border: 1px solid rgba(0, 0, 0, 0.1);
          background: white;
          font-size: 13px;
          font-weight: 500;
          color: #374151;
          cursor: pointer;
          transition: all 0.2s;
        }

        .cp-swap-btn:hover {
          border-color: #f97316;
          color: #f97316;
        }

        .cp-recipe-section {
          background: rgba(255, 255, 255, 0.95);
        }

        .cp-recipe-card {
          background: linear-gradient(135deg, rgba(240, 253, 244, 0.5), rgba(255, 255, 255, 0.8));
          border-radius: 16px;
          padding: 24px;
          border: 1px solid rgba(34, 197, 94, 0.15);
        }

        .cp-recipe-image {
          width: 100%;
          height: 200px;
          border-radius: 12px;
          overflow: hidden;
          margin-bottom: 16px;
        }

        .cp-recipe-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .cp-recipe-header {
          margin-bottom: 16px;
        }

        .cp-recipe-title {
          font-size: 20px;
          font-weight: 700;
          color: #111827;
          margin: 0 0 10px;
        }

        .cp-recipe-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .cp-tag {
          padding: 4px 10px;
          border-radius: 20px;
          font-size: 11px;
          font-weight: 600;
          text-transform: capitalize;
        }

        .cp-tag-green {
          background: #dcfce7;
          color: #166534;
        }

        .cp-tag-orange {
          background: #ffedd5;
          color: #c2410c;
        }

        .cp-tag-blue {
          background: #dbeafe;
          color: #1e40af;
        }

        .cp-tag-emerald {
          background: #d1fae5;
          color: #065f46;
        }

        .cp-tag-purple {
          background: #f3e8ff;
          color: #7c3aed;
        }

        .cp-tag-amber {
          background: #fef3c7;
          color: #b45309;
        }

        .cp-tag-pink {
          background: #fce7f3;
          color: #be185d;
        }

        .cp-tag-gray {
          background: #f3f4f6;
          color: #4b5563;
        }

        .cp-recipe-stats {
          display: flex;
          gap: 20px;
          margin-bottom: 16px;
          padding: 12px 0;
          border-bottom: 1px solid rgba(0, 0, 0, 0.05);
        }

        .cp-recipe-stat {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          color: #6b7280;
        }

        .cp-recipe-nutrition {
          display: flex;
          gap: 16px;
          font-size: 13px;
          color: #374151;
          margin-bottom: 20px;
        }

        .cp-recipe-nutrition span {
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .cp-recipe-ingredients,
        .cp-recipe-steps {
          margin-bottom: 20px;
        }

        .cp-recipe-ingredients h4,
        .cp-recipe-steps h4 {
          font-size: 14px;
          font-weight: 600;
          color: #111827;
          margin: 0 0 10px;
        }

        .cp-recipe-ingredients ul,
        .cp-recipe-steps ol {
          padding-left: 20px;
          margin: 0;
        }

        .cp-recipe-ingredients li,
        .cp-recipe-steps li {
          font-size: 14px;
          color: #374151;
          padding: 4px 0;
        }

        .cp-ing-note {
          color: #9ca3af;
          font-style: italic;
        }

        .cp-recipe-actions {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }

        .cp-shopping-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .cp-shop-section {
          background: rgba(255, 255, 255, 0.8);
          border-radius: 12px;
          overflow: hidden;
          border: 1px solid rgba(0, 0, 0, 0.04);
        }

        .cp-shop-header {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 14px 16px;
          background: transparent;
          border: none;
          font-size: 14px;
          font-weight: 600;
          color: #374151;
          cursor: pointer;
          transition: background 0.2s;
        }

        .cp-shop-header:hover {
          background: rgba(0, 0, 0, 0.02);
        }

        .cp-shop-count {
          color: #9ca3af;
          font-weight: 400;
          margin-right: auto;
          margin-left: 8px;
        }

        .cp-shop-items {
          padding: 0 16px 14px;
        }

        .cp-shop-item {
          display: flex;
          align-items: center;
          padding: 8px 0;
          border-bottom: 1px solid rgba(0, 0, 0, 0.04);
        }

        .cp-shop-item:last-child {
          border-bottom: none;
        }

        .cp-shop-item-name {
          flex: 1;
          font-size: 14px;
          color: #374151;
        }

        .cp-shop-item-qty {
          font-size: 13px;
          color: #6b7280;
          margin-right: 16px;
        }

        .cp-shop-item-cost {
          font-size: 13px;
          font-weight: 500;
          color: #16a34a;
        }

        .cp-fs-actions {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          display: flex;
          gap: 12px;
          padding: 20px 24px;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(12px);
          border-top: 1px solid rgba(0, 0, 0, 0.05);
          z-index: 100;
        }

        .cp-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 14px 24px;
          border-radius: 14px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          border: none;
          font-family: inherit;
        }

        .cp-btn-primary {
          flex: 2;
          background: linear-gradient(135deg, #22c55e, #16a34a);
          color: white;
          box-shadow: 0 4px 14px rgba(34, 197, 94, 0.35);
        }

        .cp-btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(34, 197, 94, 0.45);
        }

        .cp-btn-outline {
          flex: 1;
          background: rgba(255, 255, 255, 0.9);
          color: #374151;
          border: 1px solid rgba(0, 0, 0, 0.1);
        }

        .cp-btn-outline:hover {
          background: white;
          border-color: #22c55e;
          color: #16a34a;
        }

        @media (max-width: 640px) {
          .cp-fs-metrics {
            flex-wrap: wrap;
          }

          .cp-fs-metric {
            flex: 1 1 45%;
          }

          .cp-recipe-actions {
            flex-direction: column;
          }

          .cp-fs-actions {
            flex-direction: column;
          }

          .cp-btn {
            flex: none;
            width: 100%;
          }
        }
      `})]})}var Xl=Z(ln(),1),I=Z(Ne(),1);function xa({currentMeal:e,candidates:n,onReplace:t,onClose:r}){let[l,o]=(0,Xl.useState)(null),i=(0,Xl.useRef)(null),a=m=>{i.current&&i.current.scrollBy({left:m==="left"?-280:280,behavior:"smooth"})},s=m=>({"high-protein":Pn,quick:vr,budget:Me,healthy:sp,vegan:In,vegetarian:In})[m]||fp,p=m=>{let f=["high-protein","quick","budget","healthy","vegan","vegetarian"];for(let w of f)if(m.includes(w))return w;return m[0]||null},v=m=>({"high-protein":"cp-badge-green",quick:"cp-badge-orange",budget:"cp-badge-blue",healthy:"cp-badge-emerald",vegan:"cp-badge-emerald",vegetarian:"cp-badge-emerald","kid-friendly":"cp-badge-purple"})[m]||"cp-badge-gray";return(0,I.jsxs)("div",{className:"cp-swap-widget",children:[(0,I.jsxs)("div",{className:"cp-swap-header",children:[(0,I.jsxs)("div",{className:"cp-swap-title-area",children:[(0,I.jsxs)("h2",{className:"cp-swap-title",children:["Replace ",e.type]}),(0,I.jsxs)("p",{className:"cp-swap-current",children:["Current: ",(0,I.jsx)("strong",{children:e.title})]})]}),(0,I.jsx)("button",{className:"cp-swap-close",onClick:r,children:(0,I.jsx)(Hl,{size:20})})]}),(0,I.jsxs)("div",{className:"cp-swap-nav",children:[(0,I.jsx)("button",{className:"cp-nav-btn",onClick:()=>a("left"),children:(0,I.jsx)(pp,{size:20})}),(0,I.jsxs)("span",{className:"cp-nav-count",children:[n.length," alternatives"]}),(0,I.jsx)("button",{className:"cp-nav-btn",onClick:()=>a("right"),children:(0,I.jsx)(dp,{size:20})})]}),(0,I.jsx)("div",{className:"cp-swap-carousel",ref:i,children:n.map((m,f)=>{let w=p(m.tags),S=w?s(w):null,C=l===m.meal_id;return(0,I.jsxs)("div",{className:`cp-swap-card ${C?"selected":""}`,onClick:()=>o(m.meal_id),children:[(0,I.jsxs)("div",{className:"cp-match-score",children:[Math.round(m.match_score*100),"% match"]}),(0,I.jsx)("h3",{className:"cp-card-title",children:m.title}),(0,I.jsxs)("div",{className:"cp-card-stats",children:[(0,I.jsxs)("span",{className:"cp-card-stat",children:[(0,I.jsx)(Qn,{size:14}),m.prep_minutes," min"]}),(0,I.jsxs)("span",{className:"cp-card-stat",children:[(0,I.jsx)(zn,{size:14}),m.calories," kcal"]}),(0,I.jsxs)("span",{className:"cp-card-stat",children:[(0,I.jsx)(Me,{size:14}),"$",m.estimated_cost.toFixed(2)]})]}),(0,I.jsx)("div",{className:"cp-card-macros",children:(0,I.jsxs)("span",{children:[(0,I.jsx)(Pn,{size:12})," ",m.macros.protein_g,"g protein"]})}),w&&S&&(0,I.jsxs)("div",{className:`cp-card-badge ${v(w)}`,children:[(0,I.jsx)(S,{size:14}),w.replace("-"," ")]}),(0,I.jsx)("button",{className:`cp-replace-btn ${C?"active":""}`,onClick:O=>{O.stopPropagation(),t(m.meal_id)},children:C?(0,I.jsxs)(I.Fragment,{children:[(0,I.jsx)(ap,{size:16}),"Confirm"]}):"Replace"})]},m.meal_id)})}),(0,I.jsx)("style",{children:`
        .cp-swap-widget {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.5);
          border-radius: 24px;
          padding: 24px;
          max-width: 100%;
          box-shadow: 0 8px 40px rgba(0, 0, 0, 0.1);
          font-family: 'Inter', system-ui, -apple-system, sans-serif;
        }

        .cp-swap-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 20px;
        }

        .cp-swap-title-area {
          flex: 1;
        }

        .cp-swap-title {
          font-size: 18px;
          font-weight: 700;
          color: #111827;
          margin: 0 0 4px;
        }

        .cp-swap-current {
          font-size: 13px;
          color: #6b7280;
          margin: 0;
        }

        .cp-swap-current strong {
          color: #374151;
        }

        .cp-swap-close {
          background: rgba(0, 0, 0, 0.05);
          border: none;
          border-radius: 10px;
          padding: 8px;
          cursor: pointer;
          color: #6b7280;
          transition: all 0.2s;
        }

        .cp-swap-close:hover {
          background: rgba(0, 0, 0, 0.1);
          color: #111827;
        }

        .cp-swap-nav {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
          margin-bottom: 16px;
        }

        .cp-nav-btn {
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.9);
          border: 1px solid rgba(0, 0, 0, 0.1);
          border-radius: 10px;
          cursor: pointer;
          color: #374151;
          transition: all 0.2s;
        }

        .cp-nav-btn:hover {
          background: white;
          border-color: #22c55e;
          color: #16a34a;
        }

        .cp-nav-count {
          font-size: 13px;
          color: #6b7280;
        }

        .cp-swap-carousel {
          display: flex;
          gap: 16px;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          scrollbar-width: none;
          -ms-overflow-style: none;
          padding: 4px;
        }

        .cp-swap-carousel::-webkit-scrollbar {
          display: none;
        }

        .cp-swap-card {
          flex: 0 0 260px;
          scroll-snap-align: start;
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(240, 253, 244, 0.5));
          border: 2px solid rgba(0, 0, 0, 0.06);
          border-radius: 18px;
          padding: 20px;
          cursor: pointer;
          transition: all 0.25s ease;
          position: relative;
        }

        .cp-swap-card:hover {
          border-color: rgba(34, 197, 94, 0.3);
          transform: translateY(-4px);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
        }

        .cp-swap-card.selected {
          border-color: #22c55e;
          box-shadow: 0 8px 28px rgba(34, 197, 94, 0.2);
        }

        .cp-match-score {
          position: absolute;
          top: 12px;
          right: 12px;
          padding: 4px 10px;
          background: linear-gradient(135deg, #22c55e, #16a34a);
          color: white;
          font-size: 11px;
          font-weight: 600;
          border-radius: 20px;
        }

        .cp-card-title {
          font-size: 16px;
          font-weight: 700;
          color: #111827;
          margin: 0 0 12px;
          padding-right: 70px;
        }

        .cp-card-stats {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin-bottom: 12px;
        }

        .cp-card-stat {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 12px;
          color: #6b7280;
        }

        .cp-card-macros {
          font-size: 12px;
          color: #374151;
          margin-bottom: 14px;
        }

        .cp-card-macros span {
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .cp-card-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
          text-transform: capitalize;
          margin-bottom: 16px;
        }

        .cp-badge-green {
          background: #dcfce7;
          color: #166534;
        }

        .cp-badge-orange {
          background: #ffedd5;
          color: #c2410c;
        }

        .cp-badge-blue {
          background: #dbeafe;
          color: #1e40af;
        }

        .cp-badge-emerald {
          background: #d1fae5;
          color: #065f46;
        }

        .cp-badge-purple {
          background: #f3e8ff;
          color: #7c3aed;
        }

        .cp-badge-gray {
          background: #f3f4f6;
          color: #4b5563;
        }

        .cp-replace-btn {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          padding: 12px;
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.9);
          border: 1px solid rgba(0, 0, 0, 0.1);
          font-size: 14px;
          font-weight: 600;
          color: #374151;
          cursor: pointer;
          transition: all 0.2s;
        }

        .cp-replace-btn:hover {
          background: white;
          border-color: #22c55e;
          color: #16a34a;
        }

        .cp-replace-btn.active {
          background: linear-gradient(135deg, #22c55e, #16a34a);
          border-color: transparent;
          color: white;
          box-shadow: 0 4px 14px rgba(34, 197, 94, 0.35);
        }

        @media (max-width: 640px) {
          .cp-swap-card {
            flex: 0 0 240px;
          }
        }
      `})]})}var X=Z(Ne(),1);function wa(){let[e,n]=(0,q.useState)("inline"),[t,r]=(0,q.useState)(null),[l,o]=(0,q.useState)(null),[i,a]=(0,q.useState)(null),[s,p]=(0,q.useState)(!1),[v,m]=(0,q.useState)(null);(0,q.useEffect)(()=>{let h=window.__chefplan_init;h?.plan&&r(h.plan)},[]);let f=(0,q.useCallback)(async(h,k)=>{if(!window.openai?.callTool)return m("OpenAI bridge not available"),null;try{p(!0);let _=await window.openai.callTool(h,k);return _.structuredContent??_}catch(_){return m(_ instanceof Error?_.message:"Tool call failed"),null}finally{p(!1)}},[]),w=(0,q.useCallback)(()=>{n("fullscreen")},[]),S=(0,q.useCallback)(async(h="instacart")=>{if(!t)return;let k=await f("create_order_link",{plan_id:t.plan_id,provider:h});k?.deeplink&&window.open(k.deeplink,"_blank")},[t,f]),C=(0,q.useCallback)(async h=>{if(!t)return;let k=await f("swap_meal",{plan_id:t.plan_id,meal_id:h});if(k?.candidates){let _=t.days.flatMap(z=>z.meals).find(z=>z.meal_id===h);_&&(a({meal:_,candidates:k.candidates}),n("swap"))}},[t,f]),O=(0,q.useCallback)(async h=>{if(!t||!i)return;let k=await f("swap_meal",{plan_id:t.plan_id,meal_id:i.meal.meal_id,replace_with:h});k?.updated_plan&&r(k.updated_plan),window.openai?.updateModelContext&&window.openai.updateModelContext({action:"meal_replaced",original:i.meal.title,replacement:i.candidates.find(_=>_.meal_id===h)?.title}),a(null),n("fullscreen")},[t,i,f]),u=(0,q.useCallback)(async()=>{if(!t)return;let h=await f("generate_weekly_plan",{household_size:t.household.size,dietary_preferences:t.constraints.diet,budget_target:t.constraints.budget_target,max_prep_minutes:t.constraints.max_prep_minutes});h?.plan&&r(h.plan)},[t,f]),c=(0,q.useCallback)(async(h,k)=>{let _=await f("get_recipe_details",{plan_id:h,meal_id:k});_?.recipe&&o(_.recipe)},[f]),d=(0,q.useCallback)(()=>{e==="swap"?(a(null),n("fullscreen")):(n("inline"),o(null))},[e]);return t?v?(0,X.jsxs)("div",{className:"cp-error",children:[(0,X.jsxs)("p",{children:["Error: ",v]}),(0,X.jsx)("button",{onClick:()=>{m(null)},children:"Dismiss"}),(0,X.jsx)("style",{children:`
          .cp-error {
            padding: 24px;
            background: #fef2f2;
            border: 1px solid #fecaca;
            border-radius: 12px;
            text-align: center;
            font-family: 'Inter', system-ui, sans-serif;
          }
          .cp-error p {
            color: #dc2626;
            margin: 0 0 16px;
          }
          .cp-error button {
            padding: 8px 16px;
            background: white;
            border: 1px solid #d1d5db;
            border-radius: 8px;
            cursor: pointer;
          }
        `})]}):(0,X.jsxs)(X.Fragment,{children:[s&&(0,X.jsx)("div",{className:"cp-overlay",children:(0,X.jsx)("div",{className:"cp-spinner"})}),e==="inline"&&(0,X.jsx)(va,{plan:t,onOrderIngredients:()=>{S()},onOpenFullPlan:w}),e==="fullscreen"&&(0,X.jsx)(ya,{plan:t,selectedRecipe:l,onClose:d,onSwapMeal:h=>{C(h)},onRebuildWeek:()=>{u()},onOrderIngredients:h=>{S(h)},onSelectMeal:(h,k)=>{c(h,k)}}),e==="swap"&&i&&(0,X.jsx)(xa,{currentMeal:i.meal,candidates:i.candidates,onReplace:h=>{O(h)},onClose:d}),(0,X.jsx)("style",{children:`
        .cp-overlay {
          position: fixed;
          inset: 0;
          background: rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }
        .cp-spinner {
          width: 48px;
          height: 48px;
          border: 4px solid #e5e7eb;
          border-top-color: #22c55e;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `})]}):(0,X.jsxs)("div",{className:"cp-loading",children:[(0,X.jsx)("div",{className:"cp-spinner"}),(0,X.jsx)("p",{children:"Loading meal plan..."}),(0,X.jsx)("style",{children:`
          .cp-loading {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 300px;
            font-family: 'Inter', system-ui, sans-serif;
            color: #6b7280;
          }
          .cp-spinner {
            width: 40px;
            height: 40px;
            border: 3px solid #e5e7eb;
            border-top-color: #22c55e;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin-bottom: 16px;
          }
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `})]})}var ka=Z(Ne(),1);function hp(){let e=document.getElementById("chefplan-widget-root");e?yp.default.createRoot(e).render((0,ka.jsx)(vp.default.StrictMode,{children:(0,ka.jsx)(wa,{})})):console.error("ChefPlan widget root element not found")}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",hp):hp();
/*! Bundled license information:

react/cjs/react.production.min.js:
  (**
   * @license React
   * react.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

scheduler/cjs/scheduler.production.min.js:
  (**
   * @license React
   * scheduler.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react-dom/cjs/react-dom.production.min.js:
  (**
   * @license React
   * react-dom.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react/cjs/react-jsx-runtime.production.min.js:
  (**
   * @license React
   * react-jsx-runtime.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)
*/
