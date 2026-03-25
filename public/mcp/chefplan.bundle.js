var Np=Object.create;var Ea=Object.defineProperty;var Cp=Object.getOwnPropertyDescriptor;var _p=Object.getOwnPropertyNames;var Ep=Object.getPrototypeOf,Pp=Object.prototype.hasOwnProperty;var Ge=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var zp=(e,t,n,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let l of _p(t))!Pp.call(e,l)&&l!==n&&Ea(e,l,{get:()=>t[l],enumerable:!(r=Cp(t,l))||r.enumerable});return e};var q=(e,t,n)=>(n=e!=null?Np(Ep(e)):{},zp(t||!e||!e.__esModule?Ea(n,"default",{value:e,enumerable:!0}):n,e));var Ua=Ge(L=>{"use strict";var En=Symbol.for("react.element"),Ip=Symbol.for("react.portal"),Lp=Symbol.for("react.fragment"),Mp=Symbol.for("react.strict_mode"),Tp=Symbol.for("react.profiler"),Rp=Symbol.for("react.provider"),Op=Symbol.for("react.context"),Dp=Symbol.for("react.forward_ref"),jp=Symbol.for("react.suspense"),Fp=Symbol.for("react.memo"),Up=Symbol.for("react.lazy"),Pa=Symbol.iterator;function Wp(e){return e===null||typeof e!="object"?null:(e=Pa&&e[Pa]||e["@@iterator"],typeof e=="function"?e:null)}var La={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},Ma=Object.assign,Ta={};function Xt(e,t,n){this.props=e,this.context=t,this.refs=Ta,this.updater=n||La}Xt.prototype.isReactComponent={};Xt.prototype.setState=function(e,t){if(typeof e!="object"&&typeof e!="function"&&e!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,t,"setState")};Xt.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")};function Ra(){}Ra.prototype=Xt.prototype;function eo(e,t,n){this.props=e,this.context=t,this.refs=Ta,this.updater=n||La}var to=eo.prototype=new Ra;to.constructor=eo;Ma(to,Xt.prototype);to.isPureReactComponent=!0;var za=Array.isArray,Oa=Object.prototype.hasOwnProperty,no={current:null},Da={key:!0,ref:!0,__self:!0,__source:!0};function ja(e,t,n){var r,l={},o=null,i=null;if(t!=null)for(r in t.ref!==void 0&&(i=t.ref),t.key!==void 0&&(o=""+t.key),t)Oa.call(t,r)&&!Da.hasOwnProperty(r)&&(l[r]=t[r]);var a=arguments.length-2;if(a===1)l.children=n;else if(1<a){for(var s=Array(a),p=0;p<a;p++)s[p]=arguments[p+2];l.children=s}if(e&&e.defaultProps)for(r in a=e.defaultProps,a)l[r]===void 0&&(l[r]=a[r]);return{$$typeof:En,type:e,key:o,ref:i,props:l,_owner:no.current}}function Bp(e,t){return{$$typeof:En,type:e.type,key:t,ref:e.ref,props:e.props,_owner:e._owner}}function ro(e){return typeof e=="object"&&e!==null&&e.$$typeof===En}function Ap(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(n){return t[n]})}var Ia=/\/+/g;function ql(e,t){return typeof e=="object"&&e!==null&&e.key!=null?Ap(""+e.key):t.toString(36)}function Sr(e,t,n,r,l){var o=typeof e;(o==="undefined"||o==="boolean")&&(e=null);var i=!1;if(e===null)i=!0;else switch(o){case"string":case"number":i=!0;break;case"object":switch(e.$$typeof){case En:case Ip:i=!0}}if(i)return i=e,l=l(i),e=r===""?"."+ql(i,0):r,za(l)?(n="",e!=null&&(n=e.replace(Ia,"$&/")+"/"),Sr(l,t,n,"",function(p){return p})):l!=null&&(ro(l)&&(l=Bp(l,n+(!l.key||i&&i.key===l.key?"":(""+l.key).replace(Ia,"$&/")+"/")+e)),t.push(l)),1;if(i=0,r=r===""?".":r+":",za(e))for(var a=0;a<e.length;a++){o=e[a];var s=r+ql(o,a);i+=Sr(o,t,n,s,l)}else if(s=Wp(e),typeof s=="function")for(e=s.call(e),a=0;!(o=e.next()).done;)o=o.value,s=r+ql(o,a++),i+=Sr(o,t,n,s,l);else if(o==="object")throw t=String(e),Error("Objects are not valid as a React child (found: "+(t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t)+"). If you meant to render a collection of children, use an array instead.");return i}function kr(e,t,n){if(e==null)return e;var r=[],l=0;return Sr(e,r,"","",function(o){return t.call(n,o,l++)}),r}function Vp(e){if(e._status===-1){var t=e._result;t=t(),t.then(function(n){(e._status===0||e._status===-1)&&(e._status=1,e._result=n)},function(n){(e._status===0||e._status===-1)&&(e._status=2,e._result=n)}),e._status===-1&&(e._status=0,e._result=t)}if(e._status===1)return e._result.default;throw e._result}var ce={current:null},Nr={transition:null},Hp={ReactCurrentDispatcher:ce,ReactCurrentBatchConfig:Nr,ReactCurrentOwner:no};function Fa(){throw Error("act(...) is not supported in production builds of React.")}L.Children={map:kr,forEach:function(e,t,n){kr(e,function(){t.apply(this,arguments)},n)},count:function(e){var t=0;return kr(e,function(){t++}),t},toArray:function(e){return kr(e,function(t){return t})||[]},only:function(e){if(!ro(e))throw Error("React.Children.only expected to receive a single React element child.");return e}};L.Component=Xt;L.Fragment=Lp;L.Profiler=Tp;L.PureComponent=eo;L.StrictMode=Mp;L.Suspense=jp;L.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=Hp;L.act=Fa;L.cloneElement=function(e,t,n){if(e==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+e+".");var r=Ma({},e.props),l=e.key,o=e.ref,i=e._owner;if(t!=null){if(t.ref!==void 0&&(o=t.ref,i=no.current),t.key!==void 0&&(l=""+t.key),e.type&&e.type.defaultProps)var a=e.type.defaultProps;for(s in t)Oa.call(t,s)&&!Da.hasOwnProperty(s)&&(r[s]=t[s]===void 0&&a!==void 0?a[s]:t[s])}var s=arguments.length-2;if(s===1)r.children=n;else if(1<s){a=Array(s);for(var p=0;p<s;p++)a[p]=arguments[p+2];r.children=a}return{$$typeof:En,type:e.type,key:l,ref:o,props:r,_owner:i}};L.createContext=function(e){return e={$$typeof:Op,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},e.Provider={$$typeof:Rp,_context:e},e.Consumer=e};L.createElement=ja;L.createFactory=function(e){var t=ja.bind(null,e);return t.type=e,t};L.createRef=function(){return{current:null}};L.forwardRef=function(e){return{$$typeof:Dp,render:e}};L.isValidElement=ro;L.lazy=function(e){return{$$typeof:Up,_payload:{_status:-1,_result:e},_init:Vp}};L.memo=function(e,t){return{$$typeof:Fp,type:e,compare:t===void 0?null:t}};L.startTransition=function(e){var t=Nr.transition;Nr.transition={};try{e()}finally{Nr.transition=t}};L.unstable_act=Fa;L.useCallback=function(e,t){return ce.current.useCallback(e,t)};L.useContext=function(e){return ce.current.useContext(e)};L.useDebugValue=function(){};L.useDeferredValue=function(e){return ce.current.useDeferredValue(e)};L.useEffect=function(e,t){return ce.current.useEffect(e,t)};L.useId=function(){return ce.current.useId()};L.useImperativeHandle=function(e,t,n){return ce.current.useImperativeHandle(e,t,n)};L.useInsertionEffect=function(e,t){return ce.current.useInsertionEffect(e,t)};L.useLayoutEffect=function(e,t){return ce.current.useLayoutEffect(e,t)};L.useMemo=function(e,t){return ce.current.useMemo(e,t)};L.useReducer=function(e,t,n){return ce.current.useReducer(e,t,n)};L.useRef=function(e){return ce.current.useRef(e)};L.useState=function(e){return ce.current.useState(e)};L.useSyncExternalStore=function(e,t,n){return ce.current.useSyncExternalStore(e,t,n)};L.useTransition=function(){return ce.current.useTransition()};L.version="18.3.1"});var it=Ge((r0,Wa)=>{"use strict";Wa.exports=Ua()});var Ga=Ge(F=>{"use strict";function ao(e,t){var n=e.length;e.push(t);e:for(;0<n;){var r=n-1>>>1,l=e[r];if(0<Cr(l,t))e[r]=t,e[n]=l,n=r;else break e}}function De(e){return e.length===0?null:e[0]}function Er(e){if(e.length===0)return null;var t=e[0],n=e.pop();if(n!==t){e[0]=n;e:for(var r=0,l=e.length,o=l>>>1;r<o;){var i=2*(r+1)-1,a=e[i],s=i+1,p=e[s];if(0>Cr(a,n))s<l&&0>Cr(p,a)?(e[r]=p,e[s]=n,r=s):(e[r]=a,e[i]=n,r=i);else if(s<l&&0>Cr(p,n))e[r]=p,e[s]=n,r=s;else break e}}return t}function Cr(e,t){var n=e.sortIndex-t.sortIndex;return n!==0?n:e.id-t.id}typeof performance=="object"&&typeof performance.now=="function"?(Ba=performance,F.unstable_now=function(){return Ba.now()}):(lo=Date,Aa=lo.now(),F.unstable_now=function(){return lo.now()-Aa});var Ba,lo,Aa,He=[],at=[],$p=1,Ee=null,oe=3,Pr=!1,Mt=!1,zn=!1,$a=typeof setTimeout=="function"?setTimeout:null,Qa=typeof clearTimeout=="function"?clearTimeout:null,Va=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function so(e){for(var t=De(at);t!==null;){if(t.callback===null)Er(at);else if(t.startTime<=e)Er(at),t.sortIndex=t.expirationTime,ao(He,t);else break;t=De(at)}}function uo(e){if(zn=!1,so(e),!Mt)if(De(He)!==null)Mt=!0,po(co);else{var t=De(at);t!==null&&fo(uo,t.startTime-e)}}function co(e,t){Mt=!1,zn&&(zn=!1,Qa(In),In=-1),Pr=!0;var n=oe;try{for(so(t),Ee=De(He);Ee!==null&&(!(Ee.expirationTime>t)||e&&!Xa());){var r=Ee.callback;if(typeof r=="function"){Ee.callback=null,oe=Ee.priorityLevel;var l=r(Ee.expirationTime<=t);t=F.unstable_now(),typeof l=="function"?Ee.callback=l:Ee===De(He)&&Er(He),so(t)}else Er(He);Ee=De(He)}if(Ee!==null)var o=!0;else{var i=De(at);i!==null&&fo(uo,i.startTime-t),o=!1}return o}finally{Ee=null,oe=n,Pr=!1}}var zr=!1,_r=null,In=-1,Ka=5,Ya=-1;function Xa(){return!(F.unstable_now()-Ya<Ka)}function oo(){if(_r!==null){var e=F.unstable_now();Ya=e;var t=!0;try{t=_r(!0,e)}finally{t?Pn():(zr=!1,_r=null)}}else zr=!1}var Pn;typeof Va=="function"?Pn=function(){Va(oo)}:typeof MessageChannel<"u"?(io=new MessageChannel,Ha=io.port2,io.port1.onmessage=oo,Pn=function(){Ha.postMessage(null)}):Pn=function(){$a(oo,0)};var io,Ha;function po(e){_r=e,zr||(zr=!0,Pn())}function fo(e,t){In=$a(function(){e(F.unstable_now())},t)}F.unstable_IdlePriority=5;F.unstable_ImmediatePriority=1;F.unstable_LowPriority=4;F.unstable_NormalPriority=3;F.unstable_Profiling=null;F.unstable_UserBlockingPriority=2;F.unstable_cancelCallback=function(e){e.callback=null};F.unstable_continueExecution=function(){Mt||Pr||(Mt=!0,po(co))};F.unstable_forceFrameRate=function(e){0>e||125<e?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):Ka=0<e?Math.floor(1e3/e):5};F.unstable_getCurrentPriorityLevel=function(){return oe};F.unstable_getFirstCallbackNode=function(){return De(He)};F.unstable_next=function(e){switch(oe){case 1:case 2:case 3:var t=3;break;default:t=oe}var n=oe;oe=t;try{return e()}finally{oe=n}};F.unstable_pauseExecution=function(){};F.unstable_requestPaint=function(){};F.unstable_runWithPriority=function(e,t){switch(e){case 1:case 2:case 3:case 4:case 5:break;default:e=3}var n=oe;oe=e;try{return t()}finally{oe=n}};F.unstable_scheduleCallback=function(e,t,n){var r=F.unstable_now();switch(typeof n=="object"&&n!==null?(n=n.delay,n=typeof n=="number"&&0<n?r+n:r):n=r,e){case 1:var l=-1;break;case 2:l=250;break;case 5:l=1073741823;break;case 4:l=1e4;break;default:l=5e3}return l=n+l,e={id:$p++,callback:t,priorityLevel:e,startTime:n,expirationTime:l,sortIndex:-1},n>r?(e.sortIndex=n,ao(at,e),De(He)===null&&e===De(at)&&(zn?(Qa(In),In=-1):zn=!0,fo(uo,n-r))):(e.sortIndex=l,ao(He,e),Mt||Pr||(Mt=!0,po(co))),e};F.unstable_shouldYield=Xa;F.unstable_wrapCallback=function(e){var t=oe;return function(){var n=oe;oe=t;try{return e.apply(this,arguments)}finally{oe=n}}}});var ba=Ge((o0,Za)=>{"use strict";Za.exports=Ga()});var tp=Ge(Ce=>{"use strict";var Qp=it(),Se=ba();function x(e){for(var t="https://reactjs.org/docs/error-decoder.html?invariant="+e,n=1;n<arguments.length;n++)t+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var lu=new Set,bn={};function $t(e,t){hn(e,t),hn(e+"Capture",t)}function hn(e,t){for(bn[e]=t,e=0;e<t.length;e++)lu.add(t[e])}var tt=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),jo=Object.prototype.hasOwnProperty,Kp=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,Ja={},qa={};function Yp(e){return jo.call(qa,e)?!0:jo.call(Ja,e)?!1:Kp.test(e)?qa[e]=!0:(Ja[e]=!0,!1)}function Xp(e,t,n,r){if(n!==null&&n.type===0)return!1;switch(typeof t){case"function":case"symbol":return!0;case"boolean":return r?!1:n!==null?!n.acceptsBooleans:(e=e.toLowerCase().slice(0,5),e!=="data-"&&e!=="aria-");default:return!1}}function Gp(e,t,n,r){if(t===null||typeof t>"u"||Xp(e,t,n,r))return!0;if(r)return!1;if(n!==null)switch(n.type){case 3:return!t;case 4:return t===!1;case 5:return isNaN(t);case 6:return isNaN(t)||1>t}return!1}function fe(e,t,n,r,l,o,i){this.acceptsBooleans=t===2||t===3||t===4,this.attributeName=r,this.attributeNamespace=l,this.mustUseProperty=n,this.propertyName=e,this.type=t,this.sanitizeURL=o,this.removeEmptyString=i}var le={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e){le[e]=new fe(e,0,!1,e,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(e){var t=e[0];le[t]=new fe(t,1,!1,e[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(e){le[e]=new fe(e,2,!1,e.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(e){le[e]=new fe(e,2,!1,e,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e){le[e]=new fe(e,3,!1,e.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(e){le[e]=new fe(e,3,!0,e,null,!1,!1)});["capture","download"].forEach(function(e){le[e]=new fe(e,4,!1,e,null,!1,!1)});["cols","rows","size","span"].forEach(function(e){le[e]=new fe(e,6,!1,e,null,!1,!1)});["rowSpan","start"].forEach(function(e){le[e]=new fe(e,5,!1,e.toLowerCase(),null,!1,!1)});var zi=/[\-:]([a-z])/g;function Ii(e){return e[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e){var t=e.replace(zi,Ii);le[t]=new fe(t,1,!1,e,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e){var t=e.replace(zi,Ii);le[t]=new fe(t,1,!1,e,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(e){var t=e.replace(zi,Ii);le[t]=new fe(t,1,!1,e,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(e){le[e]=new fe(e,1,!1,e.toLowerCase(),null,!1,!1)});le.xlinkHref=new fe("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(e){le[e]=new fe(e,1,!1,e.toLowerCase(),null,!0,!0)});function Li(e,t,n,r){var l=le.hasOwnProperty(t)?le[t]:null;(l!==null?l.type!==0:r||!(2<t.length)||t[0]!=="o"&&t[0]!=="O"||t[1]!=="n"&&t[1]!=="N")&&(Gp(t,n,l,r)&&(n=null),r||l===null?Yp(t)&&(n===null?e.removeAttribute(t):e.setAttribute(t,""+n)):l.mustUseProperty?e[l.propertyName]=n===null?l.type===3?!1:"":n:(t=l.attributeName,r=l.attributeNamespace,n===null?e.removeAttribute(t):(l=l.type,n=l===3||l===4&&n===!0?"":""+n,r?e.setAttributeNS(r,t,n):e.setAttribute(t,n))))}var ot=Qp.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,Ir=Symbol.for("react.element"),bt=Symbol.for("react.portal"),Jt=Symbol.for("react.fragment"),Mi=Symbol.for("react.strict_mode"),Fo=Symbol.for("react.profiler"),ou=Symbol.for("react.provider"),iu=Symbol.for("react.context"),Ti=Symbol.for("react.forward_ref"),Uo=Symbol.for("react.suspense"),Wo=Symbol.for("react.suspense_list"),Ri=Symbol.for("react.memo"),ut=Symbol.for("react.lazy"),au=Symbol.for("react.offscreen"),es=Symbol.iterator;function Ln(e){return e===null||typeof e!="object"?null:(e=es&&e[es]||e["@@iterator"],typeof e=="function"?e:null)}var Q=Object.assign,mo;function Un(e){if(mo===void 0)try{throw Error()}catch(n){var t=n.stack.trim().match(/\n( *(at )?)/);mo=t&&t[1]||""}return`
`+mo+e}var go=!1;function ho(e,t){if(!e||go)return"";go=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(t)if(t=function(){throw Error()},Object.defineProperty(t.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(t,[])}catch(p){var r=p}Reflect.construct(e,[],t)}else{try{t.call()}catch(p){r=p}e.call(t.prototype)}else{try{throw Error()}catch(p){r=p}e()}}catch(p){if(p&&r&&typeof p.stack=="string"){for(var l=p.stack.split(`
`),o=r.stack.split(`
`),i=l.length-1,a=o.length-1;1<=i&&0<=a&&l[i]!==o[a];)a--;for(;1<=i&&0<=a;i--,a--)if(l[i]!==o[a]){if(i!==1||a!==1)do if(i--,a--,0>a||l[i]!==o[a]){var s=`
`+l[i].replace(" at new "," at ");return e.displayName&&s.includes("<anonymous>")&&(s=s.replace("<anonymous>",e.displayName)),s}while(1<=i&&0<=a);break}}}finally{go=!1,Error.prepareStackTrace=n}return(e=e?e.displayName||e.name:"")?Un(e):""}function Zp(e){switch(e.tag){case 5:return Un(e.type);case 16:return Un("Lazy");case 13:return Un("Suspense");case 19:return Un("SuspenseList");case 0:case 2:case 15:return e=ho(e.type,!1),e;case 11:return e=ho(e.type.render,!1),e;case 1:return e=ho(e.type,!0),e;default:return""}}function Bo(e){if(e==null)return null;if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case Jt:return"Fragment";case bt:return"Portal";case Fo:return"Profiler";case Mi:return"StrictMode";case Uo:return"Suspense";case Wo:return"SuspenseList"}if(typeof e=="object")switch(e.$$typeof){case iu:return(e.displayName||"Context")+".Consumer";case ou:return(e._context.displayName||"Context")+".Provider";case Ti:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case Ri:return t=e.displayName||null,t!==null?t:Bo(e.type)||"Memo";case ut:t=e._payload,e=e._init;try{return Bo(e(t))}catch{}}return null}function bp(e){var t=e.type;switch(e.tag){case 24:return"Cache";case 9:return(t.displayName||"Context")+".Consumer";case 10:return(t._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return e=t.render,e=e.displayName||e.name||"",t.displayName||(e!==""?"ForwardRef("+e+")":"ForwardRef");case 7:return"Fragment";case 5:return t;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return Bo(t);case 8:return t===Mi?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t}return null}function Nt(e){switch(typeof e){case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function su(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function Jp(e){var t=su(e)?"checked":"value",n=Object.getOwnPropertyDescriptor(e.constructor.prototype,t),r=""+e[t];if(!e.hasOwnProperty(t)&&typeof n<"u"&&typeof n.get=="function"&&typeof n.set=="function"){var l=n.get,o=n.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return l.call(this)},set:function(i){r=""+i,o.call(this,i)}}),Object.defineProperty(e,t,{enumerable:n.enumerable}),{getValue:function(){return r},setValue:function(i){r=""+i},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function Lr(e){e._valueTracker||(e._valueTracker=Jp(e))}function uu(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),r="";return e&&(r=su(e)?e.checked?"true":"false":e.value),e=r,e!==n?(t.setValue(e),!0):!1}function ll(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}function Ao(e,t){var n=t.checked;return Q({},t,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:n??e._wrapperState.initialChecked})}function ts(e,t){var n=t.defaultValue==null?"":t.defaultValue,r=t.checked!=null?t.checked:t.defaultChecked;n=Nt(t.value!=null?t.value:n),e._wrapperState={initialChecked:r,initialValue:n,controlled:t.type==="checkbox"||t.type==="radio"?t.checked!=null:t.value!=null}}function cu(e,t){t=t.checked,t!=null&&Li(e,"checked",t,!1)}function Vo(e,t){cu(e,t);var n=Nt(t.value),r=t.type;if(n!=null)r==="number"?(n===0&&e.value===""||e.value!=n)&&(e.value=""+n):e.value!==""+n&&(e.value=""+n);else if(r==="submit"||r==="reset"){e.removeAttribute("value");return}t.hasOwnProperty("value")?Ho(e,t.type,n):t.hasOwnProperty("defaultValue")&&Ho(e,t.type,Nt(t.defaultValue)),t.checked==null&&t.defaultChecked!=null&&(e.defaultChecked=!!t.defaultChecked)}function ns(e,t,n){if(t.hasOwnProperty("value")||t.hasOwnProperty("defaultValue")){var r=t.type;if(!(r!=="submit"&&r!=="reset"||t.value!==void 0&&t.value!==null))return;t=""+e._wrapperState.initialValue,n||t===e.value||(e.value=t),e.defaultValue=t}n=e.name,n!==""&&(e.name=""),e.defaultChecked=!!e._wrapperState.initialChecked,n!==""&&(e.name=n)}function Ho(e,t,n){(t!=="number"||ll(e.ownerDocument)!==e)&&(n==null?e.defaultValue=""+e._wrapperState.initialValue:e.defaultValue!==""+n&&(e.defaultValue=""+n))}var Wn=Array.isArray;function cn(e,t,n,r){if(e=e.options,t){t={};for(var l=0;l<n.length;l++)t["$"+n[l]]=!0;for(n=0;n<e.length;n++)l=t.hasOwnProperty("$"+e[n].value),e[n].selected!==l&&(e[n].selected=l),l&&r&&(e[n].defaultSelected=!0)}else{for(n=""+Nt(n),t=null,l=0;l<e.length;l++){if(e[l].value===n){e[l].selected=!0,r&&(e[l].defaultSelected=!0);return}t!==null||e[l].disabled||(t=e[l])}t!==null&&(t.selected=!0)}}function $o(e,t){if(t.dangerouslySetInnerHTML!=null)throw Error(x(91));return Q({},t,{value:void 0,defaultValue:void 0,children:""+e._wrapperState.initialValue})}function rs(e,t){var n=t.value;if(n==null){if(n=t.children,t=t.defaultValue,n!=null){if(t!=null)throw Error(x(92));if(Wn(n)){if(1<n.length)throw Error(x(93));n=n[0]}t=n}t==null&&(t=""),n=t}e._wrapperState={initialValue:Nt(n)}}function pu(e,t){var n=Nt(t.value),r=Nt(t.defaultValue);n!=null&&(n=""+n,n!==e.value&&(e.value=n),t.defaultValue==null&&e.defaultValue!==n&&(e.defaultValue=n)),r!=null&&(e.defaultValue=""+r)}function ls(e){var t=e.textContent;t===e._wrapperState.initialValue&&t!==""&&t!==null&&(e.value=t)}function du(e){switch(e){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function Qo(e,t){return e==null||e==="http://www.w3.org/1999/xhtml"?du(t):e==="http://www.w3.org/2000/svg"&&t==="foreignObject"?"http://www.w3.org/1999/xhtml":e}var Mr,fu=(function(e){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(t,n,r,l){MSApp.execUnsafeLocalFunction(function(){return e(t,n,r,l)})}:e})(function(e,t){if(e.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in e)e.innerHTML=t;else{for(Mr=Mr||document.createElement("div"),Mr.innerHTML="<svg>"+t.valueOf().toString()+"</svg>",t=Mr.firstChild;e.firstChild;)e.removeChild(e.firstChild);for(;t.firstChild;)e.appendChild(t.firstChild)}});function Jn(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&n.nodeType===3){n.nodeValue=t;return}}e.textContent=t}var Vn={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},qp=["Webkit","ms","Moz","O"];Object.keys(Vn).forEach(function(e){qp.forEach(function(t){t=t+e.charAt(0).toUpperCase()+e.substring(1),Vn[t]=Vn[e]})});function mu(e,t,n){return t==null||typeof t=="boolean"||t===""?"":n||typeof t!="number"||t===0||Vn.hasOwnProperty(e)&&Vn[e]?(""+t).trim():t+"px"}function gu(e,t){e=e.style;for(var n in t)if(t.hasOwnProperty(n)){var r=n.indexOf("--")===0,l=mu(n,t[n],r);n==="float"&&(n="cssFloat"),r?e.setProperty(n,l):e[n]=l}}var ed=Q({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function Ko(e,t){if(t){if(ed[e]&&(t.children!=null||t.dangerouslySetInnerHTML!=null))throw Error(x(137,e));if(t.dangerouslySetInnerHTML!=null){if(t.children!=null)throw Error(x(60));if(typeof t.dangerouslySetInnerHTML!="object"||!("__html"in t.dangerouslySetInnerHTML))throw Error(x(61))}if(t.style!=null&&typeof t.style!="object")throw Error(x(62))}}function Yo(e,t){if(e.indexOf("-")===-1)return typeof t.is=="string";switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Xo=null;function Oi(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var Go=null,pn=null,dn=null;function os(e){if(e=hr(e)){if(typeof Go!="function")throw Error(x(280));var t=e.stateNode;t&&(t=Tl(t),Go(e.stateNode,e.type,t))}}function hu(e){pn?dn?dn.push(e):dn=[e]:pn=e}function vu(){if(pn){var e=pn,t=dn;if(dn=pn=null,os(e),t)for(e=0;e<t.length;e++)os(t[e])}}function yu(e,t){return e(t)}function xu(){}var vo=!1;function wu(e,t,n){if(vo)return e(t,n);vo=!0;try{return yu(e,t,n)}finally{vo=!1,(pn!==null||dn!==null)&&(xu(),vu())}}function qn(e,t){var n=e.stateNode;if(n===null)return null;var r=Tl(n);if(r===null)return null;n=r[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(r=!r.disabled)||(e=e.type,r=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!r;break e;default:e=!1}if(e)return null;if(n&&typeof n!="function")throw Error(x(231,t,typeof n));return n}var Zo=!1;if(tt)try{Gt={},Object.defineProperty(Gt,"passive",{get:function(){Zo=!0}}),window.addEventListener("test",Gt,Gt),window.removeEventListener("test",Gt,Gt)}catch{Zo=!1}var Gt;function td(e,t,n,r,l,o,i,a,s){var p=Array.prototype.slice.call(arguments,3);try{t.apply(n,p)}catch(h){this.onError(h)}}var Hn=!1,ol=null,il=!1,bo=null,nd={onError:function(e){Hn=!0,ol=e}};function rd(e,t,n,r,l,o,i,a,s){Hn=!1,ol=null,td.apply(nd,arguments)}function ld(e,t,n,r,l,o,i,a,s){if(rd.apply(this,arguments),Hn){if(Hn){var p=ol;Hn=!1,ol=null}else throw Error(x(198));il||(il=!0,bo=p)}}function Qt(e){var t=e,n=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,(t.flags&4098)!==0&&(n=t.return),e=t.return;while(e)}return t.tag===3?n:null}function ku(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function is(e){if(Qt(e)!==e)throw Error(x(188))}function od(e){var t=e.alternate;if(!t){if(t=Qt(e),t===null)throw Error(x(188));return t!==e?null:e}for(var n=e,r=t;;){var l=n.return;if(l===null)break;var o=l.alternate;if(o===null){if(r=l.return,r!==null){n=r;continue}break}if(l.child===o.child){for(o=l.child;o;){if(o===n)return is(l),e;if(o===r)return is(l),t;o=o.sibling}throw Error(x(188))}if(n.return!==r.return)n=l,r=o;else{for(var i=!1,a=l.child;a;){if(a===n){i=!0,n=l,r=o;break}if(a===r){i=!0,r=l,n=o;break}a=a.sibling}if(!i){for(a=o.child;a;){if(a===n){i=!0,n=o,r=l;break}if(a===r){i=!0,r=o,n=l;break}a=a.sibling}if(!i)throw Error(x(189))}}if(n.alternate!==r)throw Error(x(190))}if(n.tag!==3)throw Error(x(188));return n.stateNode.current===n?e:t}function Su(e){return e=od(e),e!==null?Nu(e):null}function Nu(e){if(e.tag===5||e.tag===6)return e;for(e=e.child;e!==null;){var t=Nu(e);if(t!==null)return t;e=e.sibling}return null}var Cu=Se.unstable_scheduleCallback,as=Se.unstable_cancelCallback,id=Se.unstable_shouldYield,ad=Se.unstable_requestPaint,Y=Se.unstable_now,sd=Se.unstable_getCurrentPriorityLevel,Di=Se.unstable_ImmediatePriority,_u=Se.unstable_UserBlockingPriority,al=Se.unstable_NormalPriority,ud=Se.unstable_LowPriority,Eu=Se.unstable_IdlePriority,zl=null,Ye=null;function cd(e){if(Ye&&typeof Ye.onCommitFiberRoot=="function")try{Ye.onCommitFiberRoot(zl,e,void 0,(e.current.flags&128)===128)}catch{}}var Be=Math.clz32?Math.clz32:fd,pd=Math.log,dd=Math.LN2;function fd(e){return e>>>=0,e===0?32:31-(pd(e)/dd|0)|0}var Tr=64,Rr=4194304;function Bn(e){switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return e&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return e}}function sl(e,t){var n=e.pendingLanes;if(n===0)return 0;var r=0,l=e.suspendedLanes,o=e.pingedLanes,i=n&268435455;if(i!==0){var a=i&~l;a!==0?r=Bn(a):(o&=i,o!==0&&(r=Bn(o)))}else i=n&~l,i!==0?r=Bn(i):o!==0&&(r=Bn(o));if(r===0)return 0;if(t!==0&&t!==r&&(t&l)===0&&(l=r&-r,o=t&-t,l>=o||l===16&&(o&4194240)!==0))return t;if((r&4)!==0&&(r|=n&16),t=e.entangledLanes,t!==0)for(e=e.entanglements,t&=r;0<t;)n=31-Be(t),l=1<<n,r|=e[n],t&=~l;return r}function md(e,t){switch(e){case 1:case 2:case 4:return t+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function gd(e,t){for(var n=e.suspendedLanes,r=e.pingedLanes,l=e.expirationTimes,o=e.pendingLanes;0<o;){var i=31-Be(o),a=1<<i,s=l[i];s===-1?((a&n)===0||(a&r)!==0)&&(l[i]=md(a,t)):s<=t&&(e.expiredLanes|=a),o&=~a}}function Jo(e){return e=e.pendingLanes&-1073741825,e!==0?e:e&1073741824?1073741824:0}function Pu(){var e=Tr;return Tr<<=1,(Tr&4194240)===0&&(Tr=64),e}function yo(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function mr(e,t,n){e.pendingLanes|=t,t!==536870912&&(e.suspendedLanes=0,e.pingedLanes=0),e=e.eventTimes,t=31-Be(t),e[t]=n}function hd(e,t){var n=e.pendingLanes&~t;e.pendingLanes=t,e.suspendedLanes=0,e.pingedLanes=0,e.expiredLanes&=t,e.mutableReadLanes&=t,e.entangledLanes&=t,t=e.entanglements;var r=e.eventTimes;for(e=e.expirationTimes;0<n;){var l=31-Be(n),o=1<<l;t[l]=0,r[l]=-1,e[l]=-1,n&=~o}}function ji(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){var r=31-Be(n),l=1<<r;l&t|e[r]&t&&(e[r]|=t),n&=~l}}var O=0;function zu(e){return e&=-e,1<e?4<e?(e&268435455)!==0?16:536870912:4:1}var Iu,Fi,Lu,Mu,Tu,qo=!1,Or=[],gt=null,ht=null,vt=null,er=new Map,tr=new Map,pt=[],vd="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function ss(e,t){switch(e){case"focusin":case"focusout":gt=null;break;case"dragenter":case"dragleave":ht=null;break;case"mouseover":case"mouseout":vt=null;break;case"pointerover":case"pointerout":er.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":tr.delete(t.pointerId)}}function Mn(e,t,n,r,l,o){return e===null||e.nativeEvent!==o?(e={blockedOn:t,domEventName:n,eventSystemFlags:r,nativeEvent:o,targetContainers:[l]},t!==null&&(t=hr(t),t!==null&&Fi(t)),e):(e.eventSystemFlags|=r,t=e.targetContainers,l!==null&&t.indexOf(l)===-1&&t.push(l),e)}function yd(e,t,n,r,l){switch(t){case"focusin":return gt=Mn(gt,e,t,n,r,l),!0;case"dragenter":return ht=Mn(ht,e,t,n,r,l),!0;case"mouseover":return vt=Mn(vt,e,t,n,r,l),!0;case"pointerover":var o=l.pointerId;return er.set(o,Mn(er.get(o)||null,e,t,n,r,l)),!0;case"gotpointercapture":return o=l.pointerId,tr.set(o,Mn(tr.get(o)||null,e,t,n,r,l)),!0}return!1}function Ru(e){var t=Ot(e.target);if(t!==null){var n=Qt(t);if(n!==null){if(t=n.tag,t===13){if(t=ku(n),t!==null){e.blockedOn=t,Tu(e.priority,function(){Lu(n)});return}}else if(t===3&&n.stateNode.current.memoizedState.isDehydrated){e.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}e.blockedOn=null}function Xr(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var n=ei(e.domEventName,e.eventSystemFlags,t[0],e.nativeEvent);if(n===null){n=e.nativeEvent;var r=new n.constructor(n.type,n);Xo=r,n.target.dispatchEvent(r),Xo=null}else return t=hr(n),t!==null&&Fi(t),e.blockedOn=n,!1;t.shift()}return!0}function us(e,t,n){Xr(e)&&n.delete(t)}function xd(){qo=!1,gt!==null&&Xr(gt)&&(gt=null),ht!==null&&Xr(ht)&&(ht=null),vt!==null&&Xr(vt)&&(vt=null),er.forEach(us),tr.forEach(us)}function Tn(e,t){e.blockedOn===t&&(e.blockedOn=null,qo||(qo=!0,Se.unstable_scheduleCallback(Se.unstable_NormalPriority,xd)))}function nr(e){function t(l){return Tn(l,e)}if(0<Or.length){Tn(Or[0],e);for(var n=1;n<Or.length;n++){var r=Or[n];r.blockedOn===e&&(r.blockedOn=null)}}for(gt!==null&&Tn(gt,e),ht!==null&&Tn(ht,e),vt!==null&&Tn(vt,e),er.forEach(t),tr.forEach(t),n=0;n<pt.length;n++)r=pt[n],r.blockedOn===e&&(r.blockedOn=null);for(;0<pt.length&&(n=pt[0],n.blockedOn===null);)Ru(n),n.blockedOn===null&&pt.shift()}var fn=ot.ReactCurrentBatchConfig,ul=!0;function wd(e,t,n,r){var l=O,o=fn.transition;fn.transition=null;try{O=1,Ui(e,t,n,r)}finally{O=l,fn.transition=o}}function kd(e,t,n,r){var l=O,o=fn.transition;fn.transition=null;try{O=4,Ui(e,t,n,r)}finally{O=l,fn.transition=o}}function Ui(e,t,n,r){if(ul){var l=ei(e,t,n,r);if(l===null)_o(e,t,r,cl,n),ss(e,r);else if(yd(l,e,t,n,r))r.stopPropagation();else if(ss(e,r),t&4&&-1<vd.indexOf(e)){for(;l!==null;){var o=hr(l);if(o!==null&&Iu(o),o=ei(e,t,n,r),o===null&&_o(e,t,r,cl,n),o===l)break;l=o}l!==null&&r.stopPropagation()}else _o(e,t,r,null,n)}}var cl=null;function ei(e,t,n,r){if(cl=null,e=Oi(r),e=Ot(e),e!==null)if(t=Qt(e),t===null)e=null;else if(n=t.tag,n===13){if(e=ku(t),e!==null)return e;e=null}else if(n===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null);return cl=e,null}function Ou(e){switch(e){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(sd()){case Di:return 1;case _u:return 4;case al:case ud:return 16;case Eu:return 536870912;default:return 16}default:return 16}}var ft=null,Wi=null,Gr=null;function Du(){if(Gr)return Gr;var e,t=Wi,n=t.length,r,l="value"in ft?ft.value:ft.textContent,o=l.length;for(e=0;e<n&&t[e]===l[e];e++);var i=n-e;for(r=1;r<=i&&t[n-r]===l[o-r];r++);return Gr=l.slice(e,1<r?1-r:void 0)}function Zr(e){var t=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function Dr(){return!0}function cs(){return!1}function Ne(e){function t(n,r,l,o,i){this._reactName=n,this._targetInst=l,this.type=r,this.nativeEvent=o,this.target=i,this.currentTarget=null;for(var a in e)e.hasOwnProperty(a)&&(n=e[a],this[a]=n?n(o):o[a]);return this.isDefaultPrevented=(o.defaultPrevented!=null?o.defaultPrevented:o.returnValue===!1)?Dr:cs,this.isPropagationStopped=cs,this}return Q(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=Dr)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=Dr)},persist:function(){},isPersistent:Dr}),t}var Nn={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Bi=Ne(Nn),gr=Q({},Nn,{view:0,detail:0}),Sd=Ne(gr),xo,wo,Rn,Il=Q({},gr,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Ai,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==Rn&&(Rn&&e.type==="mousemove"?(xo=e.screenX-Rn.screenX,wo=e.screenY-Rn.screenY):wo=xo=0,Rn=e),xo)},movementY:function(e){return"movementY"in e?e.movementY:wo}}),ps=Ne(Il),Nd=Q({},Il,{dataTransfer:0}),Cd=Ne(Nd),_d=Q({},gr,{relatedTarget:0}),ko=Ne(_d),Ed=Q({},Nn,{animationName:0,elapsedTime:0,pseudoElement:0}),Pd=Ne(Ed),zd=Q({},Nn,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),Id=Ne(zd),Ld=Q({},Nn,{data:0}),ds=Ne(Ld),Md={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},Td={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},Rd={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function Od(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=Rd[e])?!!t[e]:!1}function Ai(){return Od}var Dd=Q({},gr,{key:function(e){if(e.key){var t=Md[e.key]||e.key;if(t!=="Unidentified")return t}return e.type==="keypress"?(e=Zr(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?Td[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Ai,charCode:function(e){return e.type==="keypress"?Zr(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?Zr(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),jd=Ne(Dd),Fd=Q({},Il,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),fs=Ne(Fd),Ud=Q({},gr,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Ai}),Wd=Ne(Ud),Bd=Q({},Nn,{propertyName:0,elapsedTime:0,pseudoElement:0}),Ad=Ne(Bd),Vd=Q({},Il,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),Hd=Ne(Vd),$d=[9,13,27,32],Vi=tt&&"CompositionEvent"in window,$n=null;tt&&"documentMode"in document&&($n=document.documentMode);var Qd=tt&&"TextEvent"in window&&!$n,ju=tt&&(!Vi||$n&&8<$n&&11>=$n),ms=" ",gs=!1;function Fu(e,t){switch(e){case"keyup":return $d.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Uu(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var qt=!1;function Kd(e,t){switch(e){case"compositionend":return Uu(t);case"keypress":return t.which!==32?null:(gs=!0,ms);case"textInput":return e=t.data,e===ms&&gs?null:e;default:return null}}function Yd(e,t){if(qt)return e==="compositionend"||!Vi&&Fu(e,t)?(e=Du(),Gr=Wi=ft=null,qt=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return ju&&t.locale!=="ko"?null:t.data;default:return null}}var Xd={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function hs(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!Xd[e.type]:t==="textarea"}function Wu(e,t,n,r){hu(r),t=pl(t,"onChange"),0<t.length&&(n=new Bi("onChange","change",null,n,r),e.push({event:n,listeners:t}))}var Qn=null,rr=null;function Gd(e){Zu(e,0)}function Ll(e){var t=nn(e);if(uu(t))return e}function Zd(e,t){if(e==="change")return t}var Bu=!1;tt&&(tt?(Fr="oninput"in document,Fr||(So=document.createElement("div"),So.setAttribute("oninput","return;"),Fr=typeof So.oninput=="function"),jr=Fr):jr=!1,Bu=jr&&(!document.documentMode||9<document.documentMode));var jr,Fr,So;function vs(){Qn&&(Qn.detachEvent("onpropertychange",Au),rr=Qn=null)}function Au(e){if(e.propertyName==="value"&&Ll(rr)){var t=[];Wu(t,rr,e,Oi(e)),wu(Gd,t)}}function bd(e,t,n){e==="focusin"?(vs(),Qn=t,rr=n,Qn.attachEvent("onpropertychange",Au)):e==="focusout"&&vs()}function Jd(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return Ll(rr)}function qd(e,t){if(e==="click")return Ll(t)}function ef(e,t){if(e==="input"||e==="change")return Ll(t)}function tf(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var Ve=typeof Object.is=="function"?Object.is:tf;function lr(e,t){if(Ve(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var n=Object.keys(e),r=Object.keys(t);if(n.length!==r.length)return!1;for(r=0;r<n.length;r++){var l=n[r];if(!jo.call(t,l)||!Ve(e[l],t[l]))return!1}return!0}function ys(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function xs(e,t){var n=ys(e);e=0;for(var r;n;){if(n.nodeType===3){if(r=e+n.textContent.length,e<=t&&r>=t)return{node:n,offset:t-e};e=r}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=ys(n)}}function Vu(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?Vu(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function Hu(){for(var e=window,t=ll();t instanceof e.HTMLIFrameElement;){try{var n=typeof t.contentWindow.location.href=="string"}catch{n=!1}if(n)e=t.contentWindow;else break;t=ll(e.document)}return t}function Hi(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}function nf(e){var t=Hu(),n=e.focusedElem,r=e.selectionRange;if(t!==n&&n&&n.ownerDocument&&Vu(n.ownerDocument.documentElement,n)){if(r!==null&&Hi(n)){if(t=r.start,e=r.end,e===void 0&&(e=t),"selectionStart"in n)n.selectionStart=t,n.selectionEnd=Math.min(e,n.value.length);else if(e=(t=n.ownerDocument||document)&&t.defaultView||window,e.getSelection){e=e.getSelection();var l=n.textContent.length,o=Math.min(r.start,l);r=r.end===void 0?o:Math.min(r.end,l),!e.extend&&o>r&&(l=r,r=o,o=l),l=xs(n,o);var i=xs(n,r);l&&i&&(e.rangeCount!==1||e.anchorNode!==l.node||e.anchorOffset!==l.offset||e.focusNode!==i.node||e.focusOffset!==i.offset)&&(t=t.createRange(),t.setStart(l.node,l.offset),e.removeAllRanges(),o>r?(e.addRange(t),e.extend(i.node,i.offset)):(t.setEnd(i.node,i.offset),e.addRange(t)))}}for(t=[],e=n;e=e.parentNode;)e.nodeType===1&&t.push({element:e,left:e.scrollLeft,top:e.scrollTop});for(typeof n.focus=="function"&&n.focus(),n=0;n<t.length;n++)e=t[n],e.element.scrollLeft=e.left,e.element.scrollTop=e.top}}var rf=tt&&"documentMode"in document&&11>=document.documentMode,en=null,ti=null,Kn=null,ni=!1;function ws(e,t,n){var r=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;ni||en==null||en!==ll(r)||(r=en,"selectionStart"in r&&Hi(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),Kn&&lr(Kn,r)||(Kn=r,r=pl(ti,"onSelect"),0<r.length&&(t=new Bi("onSelect","select",null,t,n),e.push({event:t,listeners:r}),t.target=en)))}function Ur(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n["Webkit"+e]="webkit"+t,n["Moz"+e]="moz"+t,n}var tn={animationend:Ur("Animation","AnimationEnd"),animationiteration:Ur("Animation","AnimationIteration"),animationstart:Ur("Animation","AnimationStart"),transitionend:Ur("Transition","TransitionEnd")},No={},$u={};tt&&($u=document.createElement("div").style,"AnimationEvent"in window||(delete tn.animationend.animation,delete tn.animationiteration.animation,delete tn.animationstart.animation),"TransitionEvent"in window||delete tn.transitionend.transition);function Ml(e){if(No[e])return No[e];if(!tn[e])return e;var t=tn[e],n;for(n in t)if(t.hasOwnProperty(n)&&n in $u)return No[e]=t[n];return e}var Qu=Ml("animationend"),Ku=Ml("animationiteration"),Yu=Ml("animationstart"),Xu=Ml("transitionend"),Gu=new Map,ks="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function _t(e,t){Gu.set(e,t),$t(t,[e])}for(Wr=0;Wr<ks.length;Wr++)Br=ks[Wr],Ss=Br.toLowerCase(),Ns=Br[0].toUpperCase()+Br.slice(1),_t(Ss,"on"+Ns);var Br,Ss,Ns,Wr;_t(Qu,"onAnimationEnd");_t(Ku,"onAnimationIteration");_t(Yu,"onAnimationStart");_t("dblclick","onDoubleClick");_t("focusin","onFocus");_t("focusout","onBlur");_t(Xu,"onTransitionEnd");hn("onMouseEnter",["mouseout","mouseover"]);hn("onMouseLeave",["mouseout","mouseover"]);hn("onPointerEnter",["pointerout","pointerover"]);hn("onPointerLeave",["pointerout","pointerover"]);$t("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));$t("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));$t("onBeforeInput",["compositionend","keypress","textInput","paste"]);$t("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));$t("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));$t("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var An="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),lf=new Set("cancel close invalid load scroll toggle".split(" ").concat(An));function Cs(e,t,n){var r=e.type||"unknown-event";e.currentTarget=n,ld(r,t,void 0,e),e.currentTarget=null}function Zu(e,t){t=(t&4)!==0;for(var n=0;n<e.length;n++){var r=e[n],l=r.event;r=r.listeners;e:{var o=void 0;if(t)for(var i=r.length-1;0<=i;i--){var a=r[i],s=a.instance,p=a.currentTarget;if(a=a.listener,s!==o&&l.isPropagationStopped())break e;Cs(l,a,p),o=s}else for(i=0;i<r.length;i++){if(a=r[i],s=a.instance,p=a.currentTarget,a=a.listener,s!==o&&l.isPropagationStopped())break e;Cs(l,a,p),o=s}}}if(il)throw e=bo,il=!1,bo=null,e}function W(e,t){var n=t[ai];n===void 0&&(n=t[ai]=new Set);var r=e+"__bubble";n.has(r)||(bu(t,e,2,!1),n.add(r))}function Co(e,t,n){var r=0;t&&(r|=4),bu(n,e,r,t)}var Ar="_reactListening"+Math.random().toString(36).slice(2);function or(e){if(!e[Ar]){e[Ar]=!0,lu.forEach(function(n){n!=="selectionchange"&&(lf.has(n)||Co(n,!1,e),Co(n,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[Ar]||(t[Ar]=!0,Co("selectionchange",!1,t))}}function bu(e,t,n,r){switch(Ou(t)){case 1:var l=wd;break;case 4:l=kd;break;default:l=Ui}n=l.bind(null,t,n,e),l=void 0,!Zo||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(l=!0),r?l!==void 0?e.addEventListener(t,n,{capture:!0,passive:l}):e.addEventListener(t,n,!0):l!==void 0?e.addEventListener(t,n,{passive:l}):e.addEventListener(t,n,!1)}function _o(e,t,n,r,l){var o=r;if((t&1)===0&&(t&2)===0&&r!==null)e:for(;;){if(r===null)return;var i=r.tag;if(i===3||i===4){var a=r.stateNode.containerInfo;if(a===l||a.nodeType===8&&a.parentNode===l)break;if(i===4)for(i=r.return;i!==null;){var s=i.tag;if((s===3||s===4)&&(s=i.stateNode.containerInfo,s===l||s.nodeType===8&&s.parentNode===l))return;i=i.return}for(;a!==null;){if(i=Ot(a),i===null)return;if(s=i.tag,s===5||s===6){r=o=i;continue e}a=a.parentNode}}r=r.return}wu(function(){var p=o,h=Oi(n),f=[];e:{var m=Gu.get(e);if(m!==void 0){var w=Bi,S=e;switch(e){case"keypress":if(Zr(n)===0)break e;case"keydown":case"keyup":w=jd;break;case"focusin":S="focus",w=ko;break;case"focusout":S="blur",w=ko;break;case"beforeblur":case"afterblur":w=ko;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":w=ps;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":w=Cd;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":w=Wd;break;case Qu:case Ku:case Yu:w=Pd;break;case Xu:w=Ad;break;case"scroll":w=Sd;break;case"wheel":w=Hd;break;case"copy":case"cut":case"paste":w=Id;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":w=fs}var C=(t&4)!==0,D=!C&&e==="scroll",u=C?m!==null?m+"Capture":null:m;C=[];for(var c=p,d;c!==null;){d=c;var y=d.stateNode;if(d.tag===5&&y!==null&&(d=y,u!==null&&(y=qn(c,u),y!=null&&C.push(ir(c,y,d)))),D)break;c=c.return}0<C.length&&(m=new w(m,S,null,n,h),f.push({event:m,listeners:C}))}}if((t&7)===0){e:{if(m=e==="mouseover"||e==="pointerover",w=e==="mouseout"||e==="pointerout",m&&n!==Xo&&(S=n.relatedTarget||n.fromElement)&&(Ot(S)||S[nt]))break e;if((w||m)&&(m=h.window===h?h:(m=h.ownerDocument)?m.defaultView||m.parentWindow:window,w?(S=n.relatedTarget||n.toElement,w=p,S=S?Ot(S):null,S!==null&&(D=Qt(S),S!==D||S.tag!==5&&S.tag!==6)&&(S=null)):(w=null,S=p),w!==S)){if(C=ps,y="onMouseLeave",u="onMouseEnter",c="mouse",(e==="pointerout"||e==="pointerover")&&(C=fs,y="onPointerLeave",u="onPointerEnter",c="pointer"),D=w==null?m:nn(w),d=S==null?m:nn(S),m=new C(y,c+"leave",w,n,h),m.target=D,m.relatedTarget=d,y=null,Ot(h)===p&&(C=new C(u,c+"enter",S,n,h),C.target=d,C.relatedTarget=D,y=C),D=y,w&&S)t:{for(C=w,u=S,c=0,d=C;d;d=Zt(d))c++;for(d=0,y=u;y;y=Zt(y))d++;for(;0<c-d;)C=Zt(C),c--;for(;0<d-c;)u=Zt(u),d--;for(;c--;){if(C===u||u!==null&&C===u.alternate)break t;C=Zt(C),u=Zt(u)}C=null}else C=null;w!==null&&_s(f,m,w,C,!1),S!==null&&D!==null&&_s(f,D,S,C,!0)}}e:{if(m=p?nn(p):window,w=m.nodeName&&m.nodeName.toLowerCase(),w==="select"||w==="input"&&m.type==="file")var z=Zd;else if(hs(m))if(Bu)z=ef;else{z=Jd;var k=bd}else(w=m.nodeName)&&w.toLowerCase()==="input"&&(m.type==="checkbox"||m.type==="radio")&&(z=qd);if(z&&(z=z(e,p))){Wu(f,z,n,h);break e}k&&k(e,m,p),e==="focusout"&&(k=m._wrapperState)&&k.controlled&&m.type==="number"&&Ho(m,"number",m.value)}switch(k=p?nn(p):window,e){case"focusin":(hs(k)||k.contentEditable==="true")&&(en=k,ti=p,Kn=null);break;case"focusout":Kn=ti=en=null;break;case"mousedown":ni=!0;break;case"contextmenu":case"mouseup":case"dragend":ni=!1,ws(f,n,h);break;case"selectionchange":if(rf)break;case"keydown":case"keyup":ws(f,n,h)}var _;if(Vi)e:{switch(e){case"compositionstart":var P="onCompositionStart";break e;case"compositionend":P="onCompositionEnd";break e;case"compositionupdate":P="onCompositionUpdate";break e}P=void 0}else qt?Fu(e,n)&&(P="onCompositionEnd"):e==="keydown"&&n.keyCode===229&&(P="onCompositionStart");P&&(ju&&n.locale!=="ko"&&(qt||P!=="onCompositionStart"?P==="onCompositionEnd"&&qt&&(_=Du()):(ft=h,Wi="value"in ft?ft.value:ft.textContent,qt=!0)),k=pl(p,P),0<k.length&&(P=new ds(P,e,null,n,h),f.push({event:P,listeners:k}),_?P.data=_:(_=Uu(n),_!==null&&(P.data=_)))),(_=Qd?Kd(e,n):Yd(e,n))&&(p=pl(p,"onBeforeInput"),0<p.length&&(h=new ds("onBeforeInput","beforeinput",null,n,h),f.push({event:h,listeners:p}),h.data=_))}Zu(f,t)})}function ir(e,t,n){return{instance:e,listener:t,currentTarget:n}}function pl(e,t){for(var n=t+"Capture",r=[];e!==null;){var l=e,o=l.stateNode;l.tag===5&&o!==null&&(l=o,o=qn(e,n),o!=null&&r.unshift(ir(e,o,l)),o=qn(e,t),o!=null&&r.push(ir(e,o,l))),e=e.return}return r}function Zt(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5);return e||null}function _s(e,t,n,r,l){for(var o=t._reactName,i=[];n!==null&&n!==r;){var a=n,s=a.alternate,p=a.stateNode;if(s!==null&&s===r)break;a.tag===5&&p!==null&&(a=p,l?(s=qn(n,o),s!=null&&i.unshift(ir(n,s,a))):l||(s=qn(n,o),s!=null&&i.push(ir(n,s,a)))),n=n.return}i.length!==0&&e.push({event:t,listeners:i})}var of=/\r\n?/g,af=/\u0000|\uFFFD/g;function Es(e){return(typeof e=="string"?e:""+e).replace(of,`
`).replace(af,"")}function Vr(e,t,n){if(t=Es(t),Es(e)!==t&&n)throw Error(x(425))}function dl(){}var ri=null,li=null;function oi(e,t){return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var ii=typeof setTimeout=="function"?setTimeout:void 0,sf=typeof clearTimeout=="function"?clearTimeout:void 0,Ps=typeof Promise=="function"?Promise:void 0,uf=typeof queueMicrotask=="function"?queueMicrotask:typeof Ps<"u"?function(e){return Ps.resolve(null).then(e).catch(cf)}:ii;function cf(e){setTimeout(function(){throw e})}function Eo(e,t){var n=t,r=0;do{var l=n.nextSibling;if(e.removeChild(n),l&&l.nodeType===8)if(n=l.data,n==="/$"){if(r===0){e.removeChild(l),nr(t);return}r--}else n!=="$"&&n!=="$?"&&n!=="$!"||r++;n=l}while(n);nr(t)}function yt(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t==="$"||t==="$!"||t==="$?")break;if(t==="/$")return null}}return e}function zs(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="$"||n==="$!"||n==="$?"){if(t===0)return e;t--}else n==="/$"&&t++}e=e.previousSibling}return null}var Cn=Math.random().toString(36).slice(2),Ke="__reactFiber$"+Cn,ar="__reactProps$"+Cn,nt="__reactContainer$"+Cn,ai="__reactEvents$"+Cn,pf="__reactListeners$"+Cn,df="__reactHandles$"+Cn;function Ot(e){var t=e[Ke];if(t)return t;for(var n=e.parentNode;n;){if(t=n[nt]||n[Ke]){if(n=t.alternate,t.child!==null||n!==null&&n.child!==null)for(e=zs(e);e!==null;){if(n=e[Ke])return n;e=zs(e)}return t}e=n,n=e.parentNode}return null}function hr(e){return e=e[Ke]||e[nt],!e||e.tag!==5&&e.tag!==6&&e.tag!==13&&e.tag!==3?null:e}function nn(e){if(e.tag===5||e.tag===6)return e.stateNode;throw Error(x(33))}function Tl(e){return e[ar]||null}var si=[],rn=-1;function Et(e){return{current:e}}function B(e){0>rn||(e.current=si[rn],si[rn]=null,rn--)}function U(e,t){rn++,si[rn]=e.current,e.current=t}var Ct={},ue=Et(Ct),he=Et(!1),Wt=Ct;function vn(e,t){var n=e.type.contextTypes;if(!n)return Ct;var r=e.stateNode;if(r&&r.__reactInternalMemoizedUnmaskedChildContext===t)return r.__reactInternalMemoizedMaskedChildContext;var l={},o;for(o in n)l[o]=t[o];return r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=t,e.__reactInternalMemoizedMaskedChildContext=l),l}function ve(e){return e=e.childContextTypes,e!=null}function fl(){B(he),B(ue)}function Is(e,t,n){if(ue.current!==Ct)throw Error(x(168));U(ue,t),U(he,n)}function Ju(e,t,n){var r=e.stateNode;if(t=t.childContextTypes,typeof r.getChildContext!="function")return n;r=r.getChildContext();for(var l in r)if(!(l in t))throw Error(x(108,bp(e)||"Unknown",l));return Q({},n,r)}function ml(e){return e=(e=e.stateNode)&&e.__reactInternalMemoizedMergedChildContext||Ct,Wt=ue.current,U(ue,e),U(he,he.current),!0}function Ls(e,t,n){var r=e.stateNode;if(!r)throw Error(x(169));n?(e=Ju(e,t,Wt),r.__reactInternalMemoizedMergedChildContext=e,B(he),B(ue),U(ue,e)):B(he),U(he,n)}var be=null,Rl=!1,Po=!1;function qu(e){be===null?be=[e]:be.push(e)}function ff(e){Rl=!0,qu(e)}function Pt(){if(!Po&&be!==null){Po=!0;var e=0,t=O;try{var n=be;for(O=1;e<n.length;e++){var r=n[e];do r=r(!0);while(r!==null)}be=null,Rl=!1}catch(l){throw be!==null&&(be=be.slice(e+1)),Cu(Di,Pt),l}finally{O=t,Po=!1}}return null}var ln=[],on=0,gl=null,hl=0,Pe=[],ze=0,Bt=null,Je=1,qe="";function Tt(e,t){ln[on++]=hl,ln[on++]=gl,gl=e,hl=t}function ec(e,t,n){Pe[ze++]=Je,Pe[ze++]=qe,Pe[ze++]=Bt,Bt=e;var r=Je;e=qe;var l=32-Be(r)-1;r&=~(1<<l),n+=1;var o=32-Be(t)+l;if(30<o){var i=l-l%5;o=(r&(1<<i)-1).toString(32),r>>=i,l-=i,Je=1<<32-Be(t)+l|n<<l|r,qe=o+e}else Je=1<<o|n<<l|r,qe=e}function $i(e){e.return!==null&&(Tt(e,1),ec(e,1,0))}function Qi(e){for(;e===gl;)gl=ln[--on],ln[on]=null,hl=ln[--on],ln[on]=null;for(;e===Bt;)Bt=Pe[--ze],Pe[ze]=null,qe=Pe[--ze],Pe[ze]=null,Je=Pe[--ze],Pe[ze]=null}var ke=null,we=null,V=!1,We=null;function tc(e,t){var n=Ie(5,null,null,0);n.elementType="DELETED",n.stateNode=t,n.return=e,t=e.deletions,t===null?(e.deletions=[n],e.flags|=16):t.push(n)}function Ms(e,t){switch(e.tag){case 5:var n=e.type;return t=t.nodeType!==1||n.toLowerCase()!==t.nodeName.toLowerCase()?null:t,t!==null?(e.stateNode=t,ke=e,we=yt(t.firstChild),!0):!1;case 6:return t=e.pendingProps===""||t.nodeType!==3?null:t,t!==null?(e.stateNode=t,ke=e,we=null,!0):!1;case 13:return t=t.nodeType!==8?null:t,t!==null?(n=Bt!==null?{id:Je,overflow:qe}:null,e.memoizedState={dehydrated:t,treeContext:n,retryLane:1073741824},n=Ie(18,null,null,0),n.stateNode=t,n.return=e,e.child=n,ke=e,we=null,!0):!1;default:return!1}}function ui(e){return(e.mode&1)!==0&&(e.flags&128)===0}function ci(e){if(V){var t=we;if(t){var n=t;if(!Ms(e,t)){if(ui(e))throw Error(x(418));t=yt(n.nextSibling);var r=ke;t&&Ms(e,t)?tc(r,n):(e.flags=e.flags&-4097|2,V=!1,ke=e)}}else{if(ui(e))throw Error(x(418));e.flags=e.flags&-4097|2,V=!1,ke=e}}}function Ts(e){for(e=e.return;e!==null&&e.tag!==5&&e.tag!==3&&e.tag!==13;)e=e.return;ke=e}function Hr(e){if(e!==ke)return!1;if(!V)return Ts(e),V=!0,!1;var t;if((t=e.tag!==3)&&!(t=e.tag!==5)&&(t=e.type,t=t!=="head"&&t!=="body"&&!oi(e.type,e.memoizedProps)),t&&(t=we)){if(ui(e))throw nc(),Error(x(418));for(;t;)tc(e,t),t=yt(t.nextSibling)}if(Ts(e),e.tag===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(x(317));e:{for(e=e.nextSibling,t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="/$"){if(t===0){we=yt(e.nextSibling);break e}t--}else n!=="$"&&n!=="$!"&&n!=="$?"||t++}e=e.nextSibling}we=null}}else we=ke?yt(e.stateNode.nextSibling):null;return!0}function nc(){for(var e=we;e;)e=yt(e.nextSibling)}function yn(){we=ke=null,V=!1}function Ki(e){We===null?We=[e]:We.push(e)}var mf=ot.ReactCurrentBatchConfig;function On(e,t,n){if(e=n.ref,e!==null&&typeof e!="function"&&typeof e!="object"){if(n._owner){if(n=n._owner,n){if(n.tag!==1)throw Error(x(309));var r=n.stateNode}if(!r)throw Error(x(147,e));var l=r,o=""+e;return t!==null&&t.ref!==null&&typeof t.ref=="function"&&t.ref._stringRef===o?t.ref:(t=function(i){var a=l.refs;i===null?delete a[o]:a[o]=i},t._stringRef=o,t)}if(typeof e!="string")throw Error(x(284));if(!n._owner)throw Error(x(290,e))}return e}function $r(e,t){throw e=Object.prototype.toString.call(t),Error(x(31,e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e))}function Rs(e){var t=e._init;return t(e._payload)}function rc(e){function t(u,c){if(e){var d=u.deletions;d===null?(u.deletions=[c],u.flags|=16):d.push(c)}}function n(u,c){if(!e)return null;for(;c!==null;)t(u,c),c=c.sibling;return null}function r(u,c){for(u=new Map;c!==null;)c.key!==null?u.set(c.key,c):u.set(c.index,c),c=c.sibling;return u}function l(u,c){return u=St(u,c),u.index=0,u.sibling=null,u}function o(u,c,d){return u.index=d,e?(d=u.alternate,d!==null?(d=d.index,d<c?(u.flags|=2,c):d):(u.flags|=2,c)):(u.flags|=1048576,c)}function i(u){return e&&u.alternate===null&&(u.flags|=2),u}function a(u,c,d,y){return c===null||c.tag!==6?(c=Oo(d,u.mode,y),c.return=u,c):(c=l(c,d),c.return=u,c)}function s(u,c,d,y){var z=d.type;return z===Jt?h(u,c,d.props.children,y,d.key):c!==null&&(c.elementType===z||typeof z=="object"&&z!==null&&z.$$typeof===ut&&Rs(z)===c.type)?(y=l(c,d.props),y.ref=On(u,c,d),y.return=u,y):(y=rl(d.type,d.key,d.props,null,u.mode,y),y.ref=On(u,c,d),y.return=u,y)}function p(u,c,d,y){return c===null||c.tag!==4||c.stateNode.containerInfo!==d.containerInfo||c.stateNode.implementation!==d.implementation?(c=Do(d,u.mode,y),c.return=u,c):(c=l(c,d.children||[]),c.return=u,c)}function h(u,c,d,y,z){return c===null||c.tag!==7?(c=Ut(d,u.mode,y,z),c.return=u,c):(c=l(c,d),c.return=u,c)}function f(u,c,d){if(typeof c=="string"&&c!==""||typeof c=="number")return c=Oo(""+c,u.mode,d),c.return=u,c;if(typeof c=="object"&&c!==null){switch(c.$$typeof){case Ir:return d=rl(c.type,c.key,c.props,null,u.mode,d),d.ref=On(u,null,c),d.return=u,d;case bt:return c=Do(c,u.mode,d),c.return=u,c;case ut:var y=c._init;return f(u,y(c._payload),d)}if(Wn(c)||Ln(c))return c=Ut(c,u.mode,d,null),c.return=u,c;$r(u,c)}return null}function m(u,c,d,y){var z=c!==null?c.key:null;if(typeof d=="string"&&d!==""||typeof d=="number")return z!==null?null:a(u,c,""+d,y);if(typeof d=="object"&&d!==null){switch(d.$$typeof){case Ir:return d.key===z?s(u,c,d,y):null;case bt:return d.key===z?p(u,c,d,y):null;case ut:return z=d._init,m(u,c,z(d._payload),y)}if(Wn(d)||Ln(d))return z!==null?null:h(u,c,d,y,null);$r(u,d)}return null}function w(u,c,d,y,z){if(typeof y=="string"&&y!==""||typeof y=="number")return u=u.get(d)||null,a(c,u,""+y,z);if(typeof y=="object"&&y!==null){switch(y.$$typeof){case Ir:return u=u.get(y.key===null?d:y.key)||null,s(c,u,y,z);case bt:return u=u.get(y.key===null?d:y.key)||null,p(c,u,y,z);case ut:var k=y._init;return w(u,c,d,k(y._payload),z)}if(Wn(y)||Ln(y))return u=u.get(d)||null,h(c,u,y,z,null);$r(c,y)}return null}function S(u,c,d,y){for(var z=null,k=null,_=c,P=c=0,j=null;_!==null&&P<d.length;P++){_.index>P?(j=_,_=null):j=_.sibling;var M=m(u,_,d[P],y);if(M===null){_===null&&(_=j);break}e&&_&&M.alternate===null&&t(u,_),c=o(M,c,P),k===null?z=M:k.sibling=M,k=M,_=j}if(P===d.length)return n(u,_),V&&Tt(u,P),z;if(_===null){for(;P<d.length;P++)_=f(u,d[P],y),_!==null&&(c=o(_,c,P),k===null?z=_:k.sibling=_,k=_);return V&&Tt(u,P),z}for(_=r(u,_);P<d.length;P++)j=w(_,u,P,d[P],y),j!==null&&(e&&j.alternate!==null&&_.delete(j.key===null?P:j.key),c=o(j,c,P),k===null?z=j:k.sibling=j,k=j);return e&&_.forEach(function(Oe){return t(u,Oe)}),V&&Tt(u,P),z}function C(u,c,d,y){var z=Ln(d);if(typeof z!="function")throw Error(x(150));if(d=z.call(d),d==null)throw Error(x(151));for(var k=z=null,_=c,P=c=0,j=null,M=d.next();_!==null&&!M.done;P++,M=d.next()){_.index>P?(j=_,_=null):j=_.sibling;var Oe=m(u,_,M.value,y);if(Oe===null){_===null&&(_=j);break}e&&_&&Oe.alternate===null&&t(u,_),c=o(Oe,c,P),k===null?z=Oe:k.sibling=Oe,k=Oe,_=j}if(M.done)return n(u,_),V&&Tt(u,P),z;if(_===null){for(;!M.done;P++,M=d.next())M=f(u,M.value,y),M!==null&&(c=o(M,c,P),k===null?z=M:k.sibling=M,k=M);return V&&Tt(u,P),z}for(_=r(u,_);!M.done;P++,M=d.next())M=w(_,u,P,M.value,y),M!==null&&(e&&M.alternate!==null&&_.delete(M.key===null?P:M.key),c=o(M,c,P),k===null?z=M:k.sibling=M,k=M);return e&&_.forEach(function(Jl){return t(u,Jl)}),V&&Tt(u,P),z}function D(u,c,d,y){if(typeof d=="object"&&d!==null&&d.type===Jt&&d.key===null&&(d=d.props.children),typeof d=="object"&&d!==null){switch(d.$$typeof){case Ir:e:{for(var z=d.key,k=c;k!==null;){if(k.key===z){if(z=d.type,z===Jt){if(k.tag===7){n(u,k.sibling),c=l(k,d.props.children),c.return=u,u=c;break e}}else if(k.elementType===z||typeof z=="object"&&z!==null&&z.$$typeof===ut&&Rs(z)===k.type){n(u,k.sibling),c=l(k,d.props),c.ref=On(u,k,d),c.return=u,u=c;break e}n(u,k);break}else t(u,k);k=k.sibling}d.type===Jt?(c=Ut(d.props.children,u.mode,y,d.key),c.return=u,u=c):(y=rl(d.type,d.key,d.props,null,u.mode,y),y.ref=On(u,c,d),y.return=u,u=y)}return i(u);case bt:e:{for(k=d.key;c!==null;){if(c.key===k)if(c.tag===4&&c.stateNode.containerInfo===d.containerInfo&&c.stateNode.implementation===d.implementation){n(u,c.sibling),c=l(c,d.children||[]),c.return=u,u=c;break e}else{n(u,c);break}else t(u,c);c=c.sibling}c=Do(d,u.mode,y),c.return=u,u=c}return i(u);case ut:return k=d._init,D(u,c,k(d._payload),y)}if(Wn(d))return S(u,c,d,y);if(Ln(d))return C(u,c,d,y);$r(u,d)}return typeof d=="string"&&d!==""||typeof d=="number"?(d=""+d,c!==null&&c.tag===6?(n(u,c.sibling),c=l(c,d),c.return=u,u=c):(n(u,c),c=Oo(d,u.mode,y),c.return=u,u=c),i(u)):n(u,c)}return D}var xn=rc(!0),lc=rc(!1),vl=Et(null),yl=null,an=null,Yi=null;function Xi(){Yi=an=yl=null}function Gi(e){var t=vl.current;B(vl),e._currentValue=t}function pi(e,t,n){for(;e!==null;){var r=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,r!==null&&(r.childLanes|=t)):r!==null&&(r.childLanes&t)!==t&&(r.childLanes|=t),e===n)break;e=e.return}}function mn(e,t){yl=e,Yi=an=null,e=e.dependencies,e!==null&&e.firstContext!==null&&((e.lanes&t)!==0&&(ge=!0),e.firstContext=null)}function Me(e){var t=e._currentValue;if(Yi!==e)if(e={context:e,memoizedValue:t,next:null},an===null){if(yl===null)throw Error(x(308));an=e,yl.dependencies={lanes:0,firstContext:e}}else an=an.next=e;return t}var Dt=null;function Zi(e){Dt===null?Dt=[e]:Dt.push(e)}function oc(e,t,n,r){var l=t.interleaved;return l===null?(n.next=n,Zi(t)):(n.next=l.next,l.next=n),t.interleaved=n,rt(e,r)}function rt(e,t){e.lanes|=t;var n=e.alternate;for(n!==null&&(n.lanes|=t),n=e,e=e.return;e!==null;)e.childLanes|=t,n=e.alternate,n!==null&&(n.childLanes|=t),n=e,e=e.return;return n.tag===3?n.stateNode:null}var ct=!1;function bi(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function ic(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,effects:e.effects})}function et(e,t){return{eventTime:e,lane:t,tag:0,payload:null,callback:null,next:null}}function xt(e,t,n){var r=e.updateQueue;if(r===null)return null;if(r=r.shared,(T&2)!==0){var l=r.pending;return l===null?t.next=t:(t.next=l.next,l.next=t),r.pending=t,rt(e,n)}return l=r.interleaved,l===null?(t.next=t,Zi(r)):(t.next=l.next,l.next=t),r.interleaved=t,rt(e,n)}function br(e,t,n){if(t=t.updateQueue,t!==null&&(t=t.shared,(n&4194240)!==0)){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,ji(e,n)}}function Os(e,t){var n=e.updateQueue,r=e.alternate;if(r!==null&&(r=r.updateQueue,n===r)){var l=null,o=null;if(n=n.firstBaseUpdate,n!==null){do{var i={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};o===null?l=o=i:o=o.next=i,n=n.next}while(n!==null);o===null?l=o=t:o=o.next=t}else l=o=t;n={baseState:r.baseState,firstBaseUpdate:l,lastBaseUpdate:o,shared:r.shared,effects:r.effects},e.updateQueue=n;return}e=n.lastBaseUpdate,e===null?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}function xl(e,t,n,r){var l=e.updateQueue;ct=!1;var o=l.firstBaseUpdate,i=l.lastBaseUpdate,a=l.shared.pending;if(a!==null){l.shared.pending=null;var s=a,p=s.next;s.next=null,i===null?o=p:i.next=p,i=s;var h=e.alternate;h!==null&&(h=h.updateQueue,a=h.lastBaseUpdate,a!==i&&(a===null?h.firstBaseUpdate=p:a.next=p,h.lastBaseUpdate=s))}if(o!==null){var f=l.baseState;i=0,h=p=s=null,a=o;do{var m=a.lane,w=a.eventTime;if((r&m)===m){h!==null&&(h=h.next={eventTime:w,lane:0,tag:a.tag,payload:a.payload,callback:a.callback,next:null});e:{var S=e,C=a;switch(m=t,w=n,C.tag){case 1:if(S=C.payload,typeof S=="function"){f=S.call(w,f,m);break e}f=S;break e;case 3:S.flags=S.flags&-65537|128;case 0:if(S=C.payload,m=typeof S=="function"?S.call(w,f,m):S,m==null)break e;f=Q({},f,m);break e;case 2:ct=!0}}a.callback!==null&&a.lane!==0&&(e.flags|=64,m=l.effects,m===null?l.effects=[a]:m.push(a))}else w={eventTime:w,lane:m,tag:a.tag,payload:a.payload,callback:a.callback,next:null},h===null?(p=h=w,s=f):h=h.next=w,i|=m;if(a=a.next,a===null){if(a=l.shared.pending,a===null)break;m=a,a=m.next,m.next=null,l.lastBaseUpdate=m,l.shared.pending=null}}while(!0);if(h===null&&(s=f),l.baseState=s,l.firstBaseUpdate=p,l.lastBaseUpdate=h,t=l.shared.interleaved,t!==null){l=t;do i|=l.lane,l=l.next;while(l!==t)}else o===null&&(l.shared.lanes=0);Vt|=i,e.lanes=i,e.memoizedState=f}}function Ds(e,t,n){if(e=t.effects,t.effects=null,e!==null)for(t=0;t<e.length;t++){var r=e[t],l=r.callback;if(l!==null){if(r.callback=null,r=n,typeof l!="function")throw Error(x(191,l));l.call(r)}}}var vr={},Xe=Et(vr),sr=Et(vr),ur=Et(vr);function jt(e){if(e===vr)throw Error(x(174));return e}function Ji(e,t){switch(U(ur,t),U(sr,e),U(Xe,vr),e=t.nodeType,e){case 9:case 11:t=(t=t.documentElement)?t.namespaceURI:Qo(null,"");break;default:e=e===8?t.parentNode:t,t=e.namespaceURI||null,e=e.tagName,t=Qo(t,e)}B(Xe),U(Xe,t)}function wn(){B(Xe),B(sr),B(ur)}function ac(e){jt(ur.current);var t=jt(Xe.current),n=Qo(t,e.type);t!==n&&(U(sr,e),U(Xe,n))}function qi(e){sr.current===e&&(B(Xe),B(sr))}var H=Et(0);function wl(e){for(var t=e;t!==null;){if(t.tag===13){var n=t.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||n.data==="$?"||n.data==="$!"))return t}else if(t.tag===19&&t.memoizedProps.revealOrder!==void 0){if((t.flags&128)!==0)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var zo=[];function ea(){for(var e=0;e<zo.length;e++)zo[e]._workInProgressVersionPrimary=null;zo.length=0}var Jr=ot.ReactCurrentDispatcher,Io=ot.ReactCurrentBatchConfig,At=0,$=null,Z=null,ee=null,kl=!1,Yn=!1,cr=0,gf=0;function ie(){throw Error(x(321))}function ta(e,t){if(t===null)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!Ve(e[n],t[n]))return!1;return!0}function na(e,t,n,r,l,o){if(At=o,$=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,Jr.current=e===null||e.memoizedState===null?xf:wf,e=n(r,l),Yn){o=0;do{if(Yn=!1,cr=0,25<=o)throw Error(x(301));o+=1,ee=Z=null,t.updateQueue=null,Jr.current=kf,e=n(r,l)}while(Yn)}if(Jr.current=Sl,t=Z!==null&&Z.next!==null,At=0,ee=Z=$=null,kl=!1,t)throw Error(x(300));return e}function ra(){var e=cr!==0;return cr=0,e}function Qe(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return ee===null?$.memoizedState=ee=e:ee=ee.next=e,ee}function Te(){if(Z===null){var e=$.alternate;e=e!==null?e.memoizedState:null}else e=Z.next;var t=ee===null?$.memoizedState:ee.next;if(t!==null)ee=t,Z=e;else{if(e===null)throw Error(x(310));Z=e,e={memoizedState:Z.memoizedState,baseState:Z.baseState,baseQueue:Z.baseQueue,queue:Z.queue,next:null},ee===null?$.memoizedState=ee=e:ee=ee.next=e}return ee}function pr(e,t){return typeof t=="function"?t(e):t}function Lo(e){var t=Te(),n=t.queue;if(n===null)throw Error(x(311));n.lastRenderedReducer=e;var r=Z,l=r.baseQueue,o=n.pending;if(o!==null){if(l!==null){var i=l.next;l.next=o.next,o.next=i}r.baseQueue=l=o,n.pending=null}if(l!==null){o=l.next,r=r.baseState;var a=i=null,s=null,p=o;do{var h=p.lane;if((At&h)===h)s!==null&&(s=s.next={lane:0,action:p.action,hasEagerState:p.hasEagerState,eagerState:p.eagerState,next:null}),r=p.hasEagerState?p.eagerState:e(r,p.action);else{var f={lane:h,action:p.action,hasEagerState:p.hasEagerState,eagerState:p.eagerState,next:null};s===null?(a=s=f,i=r):s=s.next=f,$.lanes|=h,Vt|=h}p=p.next}while(p!==null&&p!==o);s===null?i=r:s.next=a,Ve(r,t.memoizedState)||(ge=!0),t.memoizedState=r,t.baseState=i,t.baseQueue=s,n.lastRenderedState=r}if(e=n.interleaved,e!==null){l=e;do o=l.lane,$.lanes|=o,Vt|=o,l=l.next;while(l!==e)}else l===null&&(n.lanes=0);return[t.memoizedState,n.dispatch]}function Mo(e){var t=Te(),n=t.queue;if(n===null)throw Error(x(311));n.lastRenderedReducer=e;var r=n.dispatch,l=n.pending,o=t.memoizedState;if(l!==null){n.pending=null;var i=l=l.next;do o=e(o,i.action),i=i.next;while(i!==l);Ve(o,t.memoizedState)||(ge=!0),t.memoizedState=o,t.baseQueue===null&&(t.baseState=o),n.lastRenderedState=o}return[o,r]}function sc(){}function uc(e,t){var n=$,r=Te(),l=t(),o=!Ve(r.memoizedState,l);if(o&&(r.memoizedState=l,ge=!0),r=r.queue,la(dc.bind(null,n,r,e),[e]),r.getSnapshot!==t||o||ee!==null&&ee.memoizedState.tag&1){if(n.flags|=2048,dr(9,pc.bind(null,n,r,l,t),void 0,null),te===null)throw Error(x(349));(At&30)!==0||cc(n,t,l)}return l}function cc(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},t=$.updateQueue,t===null?(t={lastEffect:null,stores:null},$.updateQueue=t,t.stores=[e]):(n=t.stores,n===null?t.stores=[e]:n.push(e))}function pc(e,t,n,r){t.value=n,t.getSnapshot=r,fc(t)&&mc(e)}function dc(e,t,n){return n(function(){fc(t)&&mc(e)})}function fc(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!Ve(e,n)}catch{return!0}}function mc(e){var t=rt(e,1);t!==null&&Ae(t,e,1,-1)}function js(e){var t=Qe();return typeof e=="function"&&(e=e()),t.memoizedState=t.baseState=e,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:pr,lastRenderedState:e},t.queue=e,e=e.dispatch=yf.bind(null,$,e),[t.memoizedState,e]}function dr(e,t,n,r){return e={tag:e,create:t,destroy:n,deps:r,next:null},t=$.updateQueue,t===null?(t={lastEffect:null,stores:null},$.updateQueue=t,t.lastEffect=e.next=e):(n=t.lastEffect,n===null?t.lastEffect=e.next=e:(r=n.next,n.next=e,e.next=r,t.lastEffect=e)),e}function gc(){return Te().memoizedState}function qr(e,t,n,r){var l=Qe();$.flags|=e,l.memoizedState=dr(1|t,n,void 0,r===void 0?null:r)}function Ol(e,t,n,r){var l=Te();r=r===void 0?null:r;var o=void 0;if(Z!==null){var i=Z.memoizedState;if(o=i.destroy,r!==null&&ta(r,i.deps)){l.memoizedState=dr(t,n,o,r);return}}$.flags|=e,l.memoizedState=dr(1|t,n,o,r)}function Fs(e,t){return qr(8390656,8,e,t)}function la(e,t){return Ol(2048,8,e,t)}function hc(e,t){return Ol(4,2,e,t)}function vc(e,t){return Ol(4,4,e,t)}function yc(e,t){if(typeof t=="function")return e=e(),t(e),function(){t(null)};if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function xc(e,t,n){return n=n!=null?n.concat([e]):null,Ol(4,4,yc.bind(null,t,e),n)}function oa(){}function wc(e,t){var n=Te();t=t===void 0?null:t;var r=n.memoizedState;return r!==null&&t!==null&&ta(t,r[1])?r[0]:(n.memoizedState=[e,t],e)}function kc(e,t){var n=Te();t=t===void 0?null:t;var r=n.memoizedState;return r!==null&&t!==null&&ta(t,r[1])?r[0]:(e=e(),n.memoizedState=[e,t],e)}function Sc(e,t,n){return(At&21)===0?(e.baseState&&(e.baseState=!1,ge=!0),e.memoizedState=n):(Ve(n,t)||(n=Pu(),$.lanes|=n,Vt|=n,e.baseState=!0),t)}function hf(e,t){var n=O;O=n!==0&&4>n?n:4,e(!0);var r=Io.transition;Io.transition={};try{e(!1),t()}finally{O=n,Io.transition=r}}function Nc(){return Te().memoizedState}function vf(e,t,n){var r=kt(e);if(n={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null},Cc(e))_c(t,n);else if(n=oc(e,t,n,r),n!==null){var l=de();Ae(n,e,r,l),Ec(n,t,r)}}function yf(e,t,n){var r=kt(e),l={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null};if(Cc(e))_c(t,l);else{var o=e.alternate;if(e.lanes===0&&(o===null||o.lanes===0)&&(o=t.lastRenderedReducer,o!==null))try{var i=t.lastRenderedState,a=o(i,n);if(l.hasEagerState=!0,l.eagerState=a,Ve(a,i)){var s=t.interleaved;s===null?(l.next=l,Zi(t)):(l.next=s.next,s.next=l),t.interleaved=l;return}}catch{}n=oc(e,t,l,r),n!==null&&(l=de(),Ae(n,e,r,l),Ec(n,t,r))}}function Cc(e){var t=e.alternate;return e===$||t!==null&&t===$}function _c(e,t){Yn=kl=!0;var n=e.pending;n===null?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function Ec(e,t,n){if((n&4194240)!==0){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,ji(e,n)}}var Sl={readContext:Me,useCallback:ie,useContext:ie,useEffect:ie,useImperativeHandle:ie,useInsertionEffect:ie,useLayoutEffect:ie,useMemo:ie,useReducer:ie,useRef:ie,useState:ie,useDebugValue:ie,useDeferredValue:ie,useTransition:ie,useMutableSource:ie,useSyncExternalStore:ie,useId:ie,unstable_isNewReconciler:!1},xf={readContext:Me,useCallback:function(e,t){return Qe().memoizedState=[e,t===void 0?null:t],e},useContext:Me,useEffect:Fs,useImperativeHandle:function(e,t,n){return n=n!=null?n.concat([e]):null,qr(4194308,4,yc.bind(null,t,e),n)},useLayoutEffect:function(e,t){return qr(4194308,4,e,t)},useInsertionEffect:function(e,t){return qr(4,2,e,t)},useMemo:function(e,t){var n=Qe();return t=t===void 0?null:t,e=e(),n.memoizedState=[e,t],e},useReducer:function(e,t,n){var r=Qe();return t=n!==void 0?n(t):t,r.memoizedState=r.baseState=t,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:t},r.queue=e,e=e.dispatch=vf.bind(null,$,e),[r.memoizedState,e]},useRef:function(e){var t=Qe();return e={current:e},t.memoizedState=e},useState:js,useDebugValue:oa,useDeferredValue:function(e){return Qe().memoizedState=e},useTransition:function(){var e=js(!1),t=e[0];return e=hf.bind(null,e[1]),Qe().memoizedState=e,[t,e]},useMutableSource:function(){},useSyncExternalStore:function(e,t,n){var r=$,l=Qe();if(V){if(n===void 0)throw Error(x(407));n=n()}else{if(n=t(),te===null)throw Error(x(349));(At&30)!==0||cc(r,t,n)}l.memoizedState=n;var o={value:n,getSnapshot:t};return l.queue=o,Fs(dc.bind(null,r,o,e),[e]),r.flags|=2048,dr(9,pc.bind(null,r,o,n,t),void 0,null),n},useId:function(){var e=Qe(),t=te.identifierPrefix;if(V){var n=qe,r=Je;n=(r&~(1<<32-Be(r)-1)).toString(32)+n,t=":"+t+"R"+n,n=cr++,0<n&&(t+="H"+n.toString(32)),t+=":"}else n=gf++,t=":"+t+"r"+n.toString(32)+":";return e.memoizedState=t},unstable_isNewReconciler:!1},wf={readContext:Me,useCallback:wc,useContext:Me,useEffect:la,useImperativeHandle:xc,useInsertionEffect:hc,useLayoutEffect:vc,useMemo:kc,useReducer:Lo,useRef:gc,useState:function(){return Lo(pr)},useDebugValue:oa,useDeferredValue:function(e){var t=Te();return Sc(t,Z.memoizedState,e)},useTransition:function(){var e=Lo(pr)[0],t=Te().memoizedState;return[e,t]},useMutableSource:sc,useSyncExternalStore:uc,useId:Nc,unstable_isNewReconciler:!1},kf={readContext:Me,useCallback:wc,useContext:Me,useEffect:la,useImperativeHandle:xc,useInsertionEffect:hc,useLayoutEffect:vc,useMemo:kc,useReducer:Mo,useRef:gc,useState:function(){return Mo(pr)},useDebugValue:oa,useDeferredValue:function(e){var t=Te();return Z===null?t.memoizedState=e:Sc(t,Z.memoizedState,e)},useTransition:function(){var e=Mo(pr)[0],t=Te().memoizedState;return[e,t]},useMutableSource:sc,useSyncExternalStore:uc,useId:Nc,unstable_isNewReconciler:!1};function Fe(e,t){if(e&&e.defaultProps){t=Q({},t),e=e.defaultProps;for(var n in e)t[n]===void 0&&(t[n]=e[n]);return t}return t}function di(e,t,n,r){t=e.memoizedState,n=n(r,t),n=n==null?t:Q({},t,n),e.memoizedState=n,e.lanes===0&&(e.updateQueue.baseState=n)}var Dl={isMounted:function(e){return(e=e._reactInternals)?Qt(e)===e:!1},enqueueSetState:function(e,t,n){e=e._reactInternals;var r=de(),l=kt(e),o=et(r,l);o.payload=t,n!=null&&(o.callback=n),t=xt(e,o,l),t!==null&&(Ae(t,e,l,r),br(t,e,l))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var r=de(),l=kt(e),o=et(r,l);o.tag=1,o.payload=t,n!=null&&(o.callback=n),t=xt(e,o,l),t!==null&&(Ae(t,e,l,r),br(t,e,l))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=de(),r=kt(e),l=et(n,r);l.tag=2,t!=null&&(l.callback=t),t=xt(e,l,r),t!==null&&(Ae(t,e,r,n),br(t,e,r))}};function Us(e,t,n,r,l,o,i){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(r,o,i):t.prototype&&t.prototype.isPureReactComponent?!lr(n,r)||!lr(l,o):!0}function Pc(e,t,n){var r=!1,l=Ct,o=t.contextType;return typeof o=="object"&&o!==null?o=Me(o):(l=ve(t)?Wt:ue.current,r=t.contextTypes,o=(r=r!=null)?vn(e,l):Ct),t=new t(n,o),e.memoizedState=t.state!==null&&t.state!==void 0?t.state:null,t.updater=Dl,e.stateNode=t,t._reactInternals=e,r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=l,e.__reactInternalMemoizedMaskedChildContext=o),t}function Ws(e,t,n,r){e=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(n,r),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(n,r),t.state!==e&&Dl.enqueueReplaceState(t,t.state,null)}function fi(e,t,n,r){var l=e.stateNode;l.props=n,l.state=e.memoizedState,l.refs={},bi(e);var o=t.contextType;typeof o=="object"&&o!==null?l.context=Me(o):(o=ve(t)?Wt:ue.current,l.context=vn(e,o)),l.state=e.memoizedState,o=t.getDerivedStateFromProps,typeof o=="function"&&(di(e,t,o,n),l.state=e.memoizedState),typeof t.getDerivedStateFromProps=="function"||typeof l.getSnapshotBeforeUpdate=="function"||typeof l.UNSAFE_componentWillMount!="function"&&typeof l.componentWillMount!="function"||(t=l.state,typeof l.componentWillMount=="function"&&l.componentWillMount(),typeof l.UNSAFE_componentWillMount=="function"&&l.UNSAFE_componentWillMount(),t!==l.state&&Dl.enqueueReplaceState(l,l.state,null),xl(e,n,l,r),l.state=e.memoizedState),typeof l.componentDidMount=="function"&&(e.flags|=4194308)}function kn(e,t){try{var n="",r=t;do n+=Zp(r),r=r.return;while(r);var l=n}catch(o){l=`
Error generating stack: `+o.message+`
`+o.stack}return{value:e,source:t,stack:l,digest:null}}function To(e,t,n){return{value:e,source:null,stack:n??null,digest:t??null}}function mi(e,t){try{console.error(t.value)}catch(n){setTimeout(function(){throw n})}}var Sf=typeof WeakMap=="function"?WeakMap:Map;function zc(e,t,n){n=et(-1,n),n.tag=3,n.payload={element:null};var r=t.value;return n.callback=function(){Cl||(Cl=!0,Ci=r),mi(e,t)},n}function Ic(e,t,n){n=et(-1,n),n.tag=3;var r=e.type.getDerivedStateFromError;if(typeof r=="function"){var l=t.value;n.payload=function(){return r(l)},n.callback=function(){mi(e,t)}}var o=e.stateNode;return o!==null&&typeof o.componentDidCatch=="function"&&(n.callback=function(){mi(e,t),typeof r!="function"&&(wt===null?wt=new Set([this]):wt.add(this));var i=t.stack;this.componentDidCatch(t.value,{componentStack:i!==null?i:""})}),n}function Bs(e,t,n){var r=e.pingCache;if(r===null){r=e.pingCache=new Sf;var l=new Set;r.set(t,l)}else l=r.get(t),l===void 0&&(l=new Set,r.set(t,l));l.has(n)||(l.add(n),e=jf.bind(null,e,t,n),t.then(e,e))}function As(e){do{var t;if((t=e.tag===13)&&(t=e.memoizedState,t=t!==null?t.dehydrated!==null:!0),t)return e;e=e.return}while(e!==null);return null}function Vs(e,t,n,r,l){return(e.mode&1)===0?(e===t?e.flags|=65536:(e.flags|=128,n.flags|=131072,n.flags&=-52805,n.tag===1&&(n.alternate===null?n.tag=17:(t=et(-1,1),t.tag=2,xt(n,t,1))),n.lanes|=1),e):(e.flags|=65536,e.lanes=l,e)}var Nf=ot.ReactCurrentOwner,ge=!1;function pe(e,t,n,r){t.child=e===null?lc(t,null,n,r):xn(t,e.child,n,r)}function Hs(e,t,n,r,l){n=n.render;var o=t.ref;return mn(t,l),r=na(e,t,n,r,o,l),n=ra(),e!==null&&!ge?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~l,lt(e,t,l)):(V&&n&&$i(t),t.flags|=1,pe(e,t,r,l),t.child)}function $s(e,t,n,r,l){if(e===null){var o=n.type;return typeof o=="function"&&!fa(o)&&o.defaultProps===void 0&&n.compare===null&&n.defaultProps===void 0?(t.tag=15,t.type=o,Lc(e,t,o,r,l)):(e=rl(n.type,null,r,t,t.mode,l),e.ref=t.ref,e.return=t,t.child=e)}if(o=e.child,(e.lanes&l)===0){var i=o.memoizedProps;if(n=n.compare,n=n!==null?n:lr,n(i,r)&&e.ref===t.ref)return lt(e,t,l)}return t.flags|=1,e=St(o,r),e.ref=t.ref,e.return=t,t.child=e}function Lc(e,t,n,r,l){if(e!==null){var o=e.memoizedProps;if(lr(o,r)&&e.ref===t.ref)if(ge=!1,t.pendingProps=r=o,(e.lanes&l)!==0)(e.flags&131072)!==0&&(ge=!0);else return t.lanes=e.lanes,lt(e,t,l)}return gi(e,t,n,r,l)}function Mc(e,t,n){var r=t.pendingProps,l=r.children,o=e!==null?e.memoizedState:null;if(r.mode==="hidden")if((t.mode&1)===0)t.memoizedState={baseLanes:0,cachePool:null,transitions:null},U(un,xe),xe|=n;else{if((n&1073741824)===0)return e=o!==null?o.baseLanes|n:n,t.lanes=t.childLanes=1073741824,t.memoizedState={baseLanes:e,cachePool:null,transitions:null},t.updateQueue=null,U(un,xe),xe|=e,null;t.memoizedState={baseLanes:0,cachePool:null,transitions:null},r=o!==null?o.baseLanes:n,U(un,xe),xe|=r}else o!==null?(r=o.baseLanes|n,t.memoizedState=null):r=n,U(un,xe),xe|=r;return pe(e,t,l,n),t.child}function Tc(e,t){var n=t.ref;(e===null&&n!==null||e!==null&&e.ref!==n)&&(t.flags|=512,t.flags|=2097152)}function gi(e,t,n,r,l){var o=ve(n)?Wt:ue.current;return o=vn(t,o),mn(t,l),n=na(e,t,n,r,o,l),r=ra(),e!==null&&!ge?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~l,lt(e,t,l)):(V&&r&&$i(t),t.flags|=1,pe(e,t,n,l),t.child)}function Qs(e,t,n,r,l){if(ve(n)){var o=!0;ml(t)}else o=!1;if(mn(t,l),t.stateNode===null)el(e,t),Pc(t,n,r),fi(t,n,r,l),r=!0;else if(e===null){var i=t.stateNode,a=t.memoizedProps;i.props=a;var s=i.context,p=n.contextType;typeof p=="object"&&p!==null?p=Me(p):(p=ve(n)?Wt:ue.current,p=vn(t,p));var h=n.getDerivedStateFromProps,f=typeof h=="function"||typeof i.getSnapshotBeforeUpdate=="function";f||typeof i.UNSAFE_componentWillReceiveProps!="function"&&typeof i.componentWillReceiveProps!="function"||(a!==r||s!==p)&&Ws(t,i,r,p),ct=!1;var m=t.memoizedState;i.state=m,xl(t,r,i,l),s=t.memoizedState,a!==r||m!==s||he.current||ct?(typeof h=="function"&&(di(t,n,h,r),s=t.memoizedState),(a=ct||Us(t,n,a,r,m,s,p))?(f||typeof i.UNSAFE_componentWillMount!="function"&&typeof i.componentWillMount!="function"||(typeof i.componentWillMount=="function"&&i.componentWillMount(),typeof i.UNSAFE_componentWillMount=="function"&&i.UNSAFE_componentWillMount()),typeof i.componentDidMount=="function"&&(t.flags|=4194308)):(typeof i.componentDidMount=="function"&&(t.flags|=4194308),t.memoizedProps=r,t.memoizedState=s),i.props=r,i.state=s,i.context=p,r=a):(typeof i.componentDidMount=="function"&&(t.flags|=4194308),r=!1)}else{i=t.stateNode,ic(e,t),a=t.memoizedProps,p=t.type===t.elementType?a:Fe(t.type,a),i.props=p,f=t.pendingProps,m=i.context,s=n.contextType,typeof s=="object"&&s!==null?s=Me(s):(s=ve(n)?Wt:ue.current,s=vn(t,s));var w=n.getDerivedStateFromProps;(h=typeof w=="function"||typeof i.getSnapshotBeforeUpdate=="function")||typeof i.UNSAFE_componentWillReceiveProps!="function"&&typeof i.componentWillReceiveProps!="function"||(a!==f||m!==s)&&Ws(t,i,r,s),ct=!1,m=t.memoizedState,i.state=m,xl(t,r,i,l);var S=t.memoizedState;a!==f||m!==S||he.current||ct?(typeof w=="function"&&(di(t,n,w,r),S=t.memoizedState),(p=ct||Us(t,n,p,r,m,S,s)||!1)?(h||typeof i.UNSAFE_componentWillUpdate!="function"&&typeof i.componentWillUpdate!="function"||(typeof i.componentWillUpdate=="function"&&i.componentWillUpdate(r,S,s),typeof i.UNSAFE_componentWillUpdate=="function"&&i.UNSAFE_componentWillUpdate(r,S,s)),typeof i.componentDidUpdate=="function"&&(t.flags|=4),typeof i.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof i.componentDidUpdate!="function"||a===e.memoizedProps&&m===e.memoizedState||(t.flags|=4),typeof i.getSnapshotBeforeUpdate!="function"||a===e.memoizedProps&&m===e.memoizedState||(t.flags|=1024),t.memoizedProps=r,t.memoizedState=S),i.props=r,i.state=S,i.context=s,r=p):(typeof i.componentDidUpdate!="function"||a===e.memoizedProps&&m===e.memoizedState||(t.flags|=4),typeof i.getSnapshotBeforeUpdate!="function"||a===e.memoizedProps&&m===e.memoizedState||(t.flags|=1024),r=!1)}return hi(e,t,n,r,o,l)}function hi(e,t,n,r,l,o){Tc(e,t);var i=(t.flags&128)!==0;if(!r&&!i)return l&&Ls(t,n,!1),lt(e,t,o);r=t.stateNode,Nf.current=t;var a=i&&typeof n.getDerivedStateFromError!="function"?null:r.render();return t.flags|=1,e!==null&&i?(t.child=xn(t,e.child,null,o),t.child=xn(t,null,a,o)):pe(e,t,a,o),t.memoizedState=r.state,l&&Ls(t,n,!0),t.child}function Rc(e){var t=e.stateNode;t.pendingContext?Is(e,t.pendingContext,t.pendingContext!==t.context):t.context&&Is(e,t.context,!1),Ji(e,t.containerInfo)}function Ks(e,t,n,r,l){return yn(),Ki(l),t.flags|=256,pe(e,t,n,r),t.child}var vi={dehydrated:null,treeContext:null,retryLane:0};function yi(e){return{baseLanes:e,cachePool:null,transitions:null}}function Oc(e,t,n){var r=t.pendingProps,l=H.current,o=!1,i=(t.flags&128)!==0,a;if((a=i)||(a=e!==null&&e.memoizedState===null?!1:(l&2)!==0),a?(o=!0,t.flags&=-129):(e===null||e.memoizedState!==null)&&(l|=1),U(H,l&1),e===null)return ci(t),e=t.memoizedState,e!==null&&(e=e.dehydrated,e!==null)?((t.mode&1)===0?t.lanes=1:e.data==="$!"?t.lanes=8:t.lanes=1073741824,null):(i=r.children,e=r.fallback,o?(r=t.mode,o=t.child,i={mode:"hidden",children:i},(r&1)===0&&o!==null?(o.childLanes=0,o.pendingProps=i):o=Ul(i,r,0,null),e=Ut(e,r,n,null),o.return=t,e.return=t,o.sibling=e,t.child=o,t.child.memoizedState=yi(n),t.memoizedState=vi,e):ia(t,i));if(l=e.memoizedState,l!==null&&(a=l.dehydrated,a!==null))return Cf(e,t,i,r,a,l,n);if(o){o=r.fallback,i=t.mode,l=e.child,a=l.sibling;var s={mode:"hidden",children:r.children};return(i&1)===0&&t.child!==l?(r=t.child,r.childLanes=0,r.pendingProps=s,t.deletions=null):(r=St(l,s),r.subtreeFlags=l.subtreeFlags&14680064),a!==null?o=St(a,o):(o=Ut(o,i,n,null),o.flags|=2),o.return=t,r.return=t,r.sibling=o,t.child=r,r=o,o=t.child,i=e.child.memoizedState,i=i===null?yi(n):{baseLanes:i.baseLanes|n,cachePool:null,transitions:i.transitions},o.memoizedState=i,o.childLanes=e.childLanes&~n,t.memoizedState=vi,r}return o=e.child,e=o.sibling,r=St(o,{mode:"visible",children:r.children}),(t.mode&1)===0&&(r.lanes=n),r.return=t,r.sibling=null,e!==null&&(n=t.deletions,n===null?(t.deletions=[e],t.flags|=16):n.push(e)),t.child=r,t.memoizedState=null,r}function ia(e,t){return t=Ul({mode:"visible",children:t},e.mode,0,null),t.return=e,e.child=t}function Qr(e,t,n,r){return r!==null&&Ki(r),xn(t,e.child,null,n),e=ia(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function Cf(e,t,n,r,l,o,i){if(n)return t.flags&256?(t.flags&=-257,r=To(Error(x(422))),Qr(e,t,i,r)):t.memoizedState!==null?(t.child=e.child,t.flags|=128,null):(o=r.fallback,l=t.mode,r=Ul({mode:"visible",children:r.children},l,0,null),o=Ut(o,l,i,null),o.flags|=2,r.return=t,o.return=t,r.sibling=o,t.child=r,(t.mode&1)!==0&&xn(t,e.child,null,i),t.child.memoizedState=yi(i),t.memoizedState=vi,o);if((t.mode&1)===0)return Qr(e,t,i,null);if(l.data==="$!"){if(r=l.nextSibling&&l.nextSibling.dataset,r)var a=r.dgst;return r=a,o=Error(x(419)),r=To(o,r,void 0),Qr(e,t,i,r)}if(a=(i&e.childLanes)!==0,ge||a){if(r=te,r!==null){switch(i&-i){case 4:l=2;break;case 16:l=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:l=32;break;case 536870912:l=268435456;break;default:l=0}l=(l&(r.suspendedLanes|i))!==0?0:l,l!==0&&l!==o.retryLane&&(o.retryLane=l,rt(e,l),Ae(r,e,l,-1))}return da(),r=To(Error(x(421))),Qr(e,t,i,r)}return l.data==="$?"?(t.flags|=128,t.child=e.child,t=Ff.bind(null,e),l._reactRetry=t,null):(e=o.treeContext,we=yt(l.nextSibling),ke=t,V=!0,We=null,e!==null&&(Pe[ze++]=Je,Pe[ze++]=qe,Pe[ze++]=Bt,Je=e.id,qe=e.overflow,Bt=t),t=ia(t,r.children),t.flags|=4096,t)}function Ys(e,t,n){e.lanes|=t;var r=e.alternate;r!==null&&(r.lanes|=t),pi(e.return,t,n)}function Ro(e,t,n,r,l){var o=e.memoizedState;o===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:r,tail:n,tailMode:l}:(o.isBackwards=t,o.rendering=null,o.renderingStartTime=0,o.last=r,o.tail=n,o.tailMode=l)}function Dc(e,t,n){var r=t.pendingProps,l=r.revealOrder,o=r.tail;if(pe(e,t,r.children,n),r=H.current,(r&2)!==0)r=r&1|2,t.flags|=128;else{if(e!==null&&(e.flags&128)!==0)e:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&Ys(e,n,t);else if(e.tag===19)Ys(e,n,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;e.sibling===null;){if(e.return===null||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}r&=1}if(U(H,r),(t.mode&1)===0)t.memoizedState=null;else switch(l){case"forwards":for(n=t.child,l=null;n!==null;)e=n.alternate,e!==null&&wl(e)===null&&(l=n),n=n.sibling;n=l,n===null?(l=t.child,t.child=null):(l=n.sibling,n.sibling=null),Ro(t,!1,l,n,o);break;case"backwards":for(n=null,l=t.child,t.child=null;l!==null;){if(e=l.alternate,e!==null&&wl(e)===null){t.child=l;break}e=l.sibling,l.sibling=n,n=l,l=e}Ro(t,!0,n,null,o);break;case"together":Ro(t,!1,null,null,void 0);break;default:t.memoizedState=null}return t.child}function el(e,t){(t.mode&1)===0&&e!==null&&(e.alternate=null,t.alternate=null,t.flags|=2)}function lt(e,t,n){if(e!==null&&(t.dependencies=e.dependencies),Vt|=t.lanes,(n&t.childLanes)===0)return null;if(e!==null&&t.child!==e.child)throw Error(x(153));if(t.child!==null){for(e=t.child,n=St(e,e.pendingProps),t.child=n,n.return=t;e.sibling!==null;)e=e.sibling,n=n.sibling=St(e,e.pendingProps),n.return=t;n.sibling=null}return t.child}function _f(e,t,n){switch(t.tag){case 3:Rc(t),yn();break;case 5:ac(t);break;case 1:ve(t.type)&&ml(t);break;case 4:Ji(t,t.stateNode.containerInfo);break;case 10:var r=t.type._context,l=t.memoizedProps.value;U(vl,r._currentValue),r._currentValue=l;break;case 13:if(r=t.memoizedState,r!==null)return r.dehydrated!==null?(U(H,H.current&1),t.flags|=128,null):(n&t.child.childLanes)!==0?Oc(e,t,n):(U(H,H.current&1),e=lt(e,t,n),e!==null?e.sibling:null);U(H,H.current&1);break;case 19:if(r=(n&t.childLanes)!==0,(e.flags&128)!==0){if(r)return Dc(e,t,n);t.flags|=128}if(l=t.memoizedState,l!==null&&(l.rendering=null,l.tail=null,l.lastEffect=null),U(H,H.current),r)break;return null;case 22:case 23:return t.lanes=0,Mc(e,t,n)}return lt(e,t,n)}var jc,xi,Fc,Uc;jc=function(e,t){for(var n=t.child;n!==null;){if(n.tag===5||n.tag===6)e.appendChild(n.stateNode);else if(n.tag!==4&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===t)break;for(;n.sibling===null;){if(n.return===null||n.return===t)return;n=n.return}n.sibling.return=n.return,n=n.sibling}};xi=function(){};Fc=function(e,t,n,r){var l=e.memoizedProps;if(l!==r){e=t.stateNode,jt(Xe.current);var o=null;switch(n){case"input":l=Ao(e,l),r=Ao(e,r),o=[];break;case"select":l=Q({},l,{value:void 0}),r=Q({},r,{value:void 0}),o=[];break;case"textarea":l=$o(e,l),r=$o(e,r),o=[];break;default:typeof l.onClick!="function"&&typeof r.onClick=="function"&&(e.onclick=dl)}Ko(n,r);var i;n=null;for(p in l)if(!r.hasOwnProperty(p)&&l.hasOwnProperty(p)&&l[p]!=null)if(p==="style"){var a=l[p];for(i in a)a.hasOwnProperty(i)&&(n||(n={}),n[i]="")}else p!=="dangerouslySetInnerHTML"&&p!=="children"&&p!=="suppressContentEditableWarning"&&p!=="suppressHydrationWarning"&&p!=="autoFocus"&&(bn.hasOwnProperty(p)?o||(o=[]):(o=o||[]).push(p,null));for(p in r){var s=r[p];if(a=l?.[p],r.hasOwnProperty(p)&&s!==a&&(s!=null||a!=null))if(p==="style")if(a){for(i in a)!a.hasOwnProperty(i)||s&&s.hasOwnProperty(i)||(n||(n={}),n[i]="");for(i in s)s.hasOwnProperty(i)&&a[i]!==s[i]&&(n||(n={}),n[i]=s[i])}else n||(o||(o=[]),o.push(p,n)),n=s;else p==="dangerouslySetInnerHTML"?(s=s?s.__html:void 0,a=a?a.__html:void 0,s!=null&&a!==s&&(o=o||[]).push(p,s)):p==="children"?typeof s!="string"&&typeof s!="number"||(o=o||[]).push(p,""+s):p!=="suppressContentEditableWarning"&&p!=="suppressHydrationWarning"&&(bn.hasOwnProperty(p)?(s!=null&&p==="onScroll"&&W("scroll",e),o||a===s||(o=[])):(o=o||[]).push(p,s))}n&&(o=o||[]).push("style",n);var p=o;(t.updateQueue=p)&&(t.flags|=4)}};Uc=function(e,t,n,r){n!==r&&(t.flags|=4)};function Dn(e,t){if(!V)switch(e.tailMode){case"hidden":t=e.tail;for(var n=null;t!==null;)t.alternate!==null&&(n=t),t=t.sibling;n===null?e.tail=null:n.sibling=null;break;case"collapsed":n=e.tail;for(var r=null;n!==null;)n.alternate!==null&&(r=n),n=n.sibling;r===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:r.sibling=null}}function ae(e){var t=e.alternate!==null&&e.alternate.child===e.child,n=0,r=0;if(t)for(var l=e.child;l!==null;)n|=l.lanes|l.childLanes,r|=l.subtreeFlags&14680064,r|=l.flags&14680064,l.return=e,l=l.sibling;else for(l=e.child;l!==null;)n|=l.lanes|l.childLanes,r|=l.subtreeFlags,r|=l.flags,l.return=e,l=l.sibling;return e.subtreeFlags|=r,e.childLanes=n,t}function Ef(e,t,n){var r=t.pendingProps;switch(Qi(t),t.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return ae(t),null;case 1:return ve(t.type)&&fl(),ae(t),null;case 3:return r=t.stateNode,wn(),B(he),B(ue),ea(),r.pendingContext&&(r.context=r.pendingContext,r.pendingContext=null),(e===null||e.child===null)&&(Hr(t)?t.flags|=4:e===null||e.memoizedState.isDehydrated&&(t.flags&256)===0||(t.flags|=1024,We!==null&&(Pi(We),We=null))),xi(e,t),ae(t),null;case 5:qi(t);var l=jt(ur.current);if(n=t.type,e!==null&&t.stateNode!=null)Fc(e,t,n,r,l),e.ref!==t.ref&&(t.flags|=512,t.flags|=2097152);else{if(!r){if(t.stateNode===null)throw Error(x(166));return ae(t),null}if(e=jt(Xe.current),Hr(t)){r=t.stateNode,n=t.type;var o=t.memoizedProps;switch(r[Ke]=t,r[ar]=o,e=(t.mode&1)!==0,n){case"dialog":W("cancel",r),W("close",r);break;case"iframe":case"object":case"embed":W("load",r);break;case"video":case"audio":for(l=0;l<An.length;l++)W(An[l],r);break;case"source":W("error",r);break;case"img":case"image":case"link":W("error",r),W("load",r);break;case"details":W("toggle",r);break;case"input":ts(r,o),W("invalid",r);break;case"select":r._wrapperState={wasMultiple:!!o.multiple},W("invalid",r);break;case"textarea":rs(r,o),W("invalid",r)}Ko(n,o),l=null;for(var i in o)if(o.hasOwnProperty(i)){var a=o[i];i==="children"?typeof a=="string"?r.textContent!==a&&(o.suppressHydrationWarning!==!0&&Vr(r.textContent,a,e),l=["children",a]):typeof a=="number"&&r.textContent!==""+a&&(o.suppressHydrationWarning!==!0&&Vr(r.textContent,a,e),l=["children",""+a]):bn.hasOwnProperty(i)&&a!=null&&i==="onScroll"&&W("scroll",r)}switch(n){case"input":Lr(r),ns(r,o,!0);break;case"textarea":Lr(r),ls(r);break;case"select":case"option":break;default:typeof o.onClick=="function"&&(r.onclick=dl)}r=l,t.updateQueue=r,r!==null&&(t.flags|=4)}else{i=l.nodeType===9?l:l.ownerDocument,e==="http://www.w3.org/1999/xhtml"&&(e=du(n)),e==="http://www.w3.org/1999/xhtml"?n==="script"?(e=i.createElement("div"),e.innerHTML="<script><\/script>",e=e.removeChild(e.firstChild)):typeof r.is=="string"?e=i.createElement(n,{is:r.is}):(e=i.createElement(n),n==="select"&&(i=e,r.multiple?i.multiple=!0:r.size&&(i.size=r.size))):e=i.createElementNS(e,n),e[Ke]=t,e[ar]=r,jc(e,t,!1,!1),t.stateNode=e;e:{switch(i=Yo(n,r),n){case"dialog":W("cancel",e),W("close",e),l=r;break;case"iframe":case"object":case"embed":W("load",e),l=r;break;case"video":case"audio":for(l=0;l<An.length;l++)W(An[l],e);l=r;break;case"source":W("error",e),l=r;break;case"img":case"image":case"link":W("error",e),W("load",e),l=r;break;case"details":W("toggle",e),l=r;break;case"input":ts(e,r),l=Ao(e,r),W("invalid",e);break;case"option":l=r;break;case"select":e._wrapperState={wasMultiple:!!r.multiple},l=Q({},r,{value:void 0}),W("invalid",e);break;case"textarea":rs(e,r),l=$o(e,r),W("invalid",e);break;default:l=r}Ko(n,l),a=l;for(o in a)if(a.hasOwnProperty(o)){var s=a[o];o==="style"?gu(e,s):o==="dangerouslySetInnerHTML"?(s=s?s.__html:void 0,s!=null&&fu(e,s)):o==="children"?typeof s=="string"?(n!=="textarea"||s!=="")&&Jn(e,s):typeof s=="number"&&Jn(e,""+s):o!=="suppressContentEditableWarning"&&o!=="suppressHydrationWarning"&&o!=="autoFocus"&&(bn.hasOwnProperty(o)?s!=null&&o==="onScroll"&&W("scroll",e):s!=null&&Li(e,o,s,i))}switch(n){case"input":Lr(e),ns(e,r,!1);break;case"textarea":Lr(e),ls(e);break;case"option":r.value!=null&&e.setAttribute("value",""+Nt(r.value));break;case"select":e.multiple=!!r.multiple,o=r.value,o!=null?cn(e,!!r.multiple,o,!1):r.defaultValue!=null&&cn(e,!!r.multiple,r.defaultValue,!0);break;default:typeof l.onClick=="function"&&(e.onclick=dl)}switch(n){case"button":case"input":case"select":case"textarea":r=!!r.autoFocus;break e;case"img":r=!0;break e;default:r=!1}}r&&(t.flags|=4)}t.ref!==null&&(t.flags|=512,t.flags|=2097152)}return ae(t),null;case 6:if(e&&t.stateNode!=null)Uc(e,t,e.memoizedProps,r);else{if(typeof r!="string"&&t.stateNode===null)throw Error(x(166));if(n=jt(ur.current),jt(Xe.current),Hr(t)){if(r=t.stateNode,n=t.memoizedProps,r[Ke]=t,(o=r.nodeValue!==n)&&(e=ke,e!==null))switch(e.tag){case 3:Vr(r.nodeValue,n,(e.mode&1)!==0);break;case 5:e.memoizedProps.suppressHydrationWarning!==!0&&Vr(r.nodeValue,n,(e.mode&1)!==0)}o&&(t.flags|=4)}else r=(n.nodeType===9?n:n.ownerDocument).createTextNode(r),r[Ke]=t,t.stateNode=r}return ae(t),null;case 13:if(B(H),r=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(V&&we!==null&&(t.mode&1)!==0&&(t.flags&128)===0)nc(),yn(),t.flags|=98560,o=!1;else if(o=Hr(t),r!==null&&r.dehydrated!==null){if(e===null){if(!o)throw Error(x(318));if(o=t.memoizedState,o=o!==null?o.dehydrated:null,!o)throw Error(x(317));o[Ke]=t}else yn(),(t.flags&128)===0&&(t.memoizedState=null),t.flags|=4;ae(t),o=!1}else We!==null&&(Pi(We),We=null),o=!0;if(!o)return t.flags&65536?t:null}return(t.flags&128)!==0?(t.lanes=n,t):(r=r!==null,r!==(e!==null&&e.memoizedState!==null)&&r&&(t.child.flags|=8192,(t.mode&1)!==0&&(e===null||(H.current&1)!==0?b===0&&(b=3):da())),t.updateQueue!==null&&(t.flags|=4),ae(t),null);case 4:return wn(),xi(e,t),e===null&&or(t.stateNode.containerInfo),ae(t),null;case 10:return Gi(t.type._context),ae(t),null;case 17:return ve(t.type)&&fl(),ae(t),null;case 19:if(B(H),o=t.memoizedState,o===null)return ae(t),null;if(r=(t.flags&128)!==0,i=o.rendering,i===null)if(r)Dn(o,!1);else{if(b!==0||e!==null&&(e.flags&128)!==0)for(e=t.child;e!==null;){if(i=wl(e),i!==null){for(t.flags|=128,Dn(o,!1),r=i.updateQueue,r!==null&&(t.updateQueue=r,t.flags|=4),t.subtreeFlags=0,r=n,n=t.child;n!==null;)o=n,e=r,o.flags&=14680066,i=o.alternate,i===null?(o.childLanes=0,o.lanes=e,o.child=null,o.subtreeFlags=0,o.memoizedProps=null,o.memoizedState=null,o.updateQueue=null,o.dependencies=null,o.stateNode=null):(o.childLanes=i.childLanes,o.lanes=i.lanes,o.child=i.child,o.subtreeFlags=0,o.deletions=null,o.memoizedProps=i.memoizedProps,o.memoizedState=i.memoizedState,o.updateQueue=i.updateQueue,o.type=i.type,e=i.dependencies,o.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),n=n.sibling;return U(H,H.current&1|2),t.child}e=e.sibling}o.tail!==null&&Y()>Sn&&(t.flags|=128,r=!0,Dn(o,!1),t.lanes=4194304)}else{if(!r)if(e=wl(i),e!==null){if(t.flags|=128,r=!0,n=e.updateQueue,n!==null&&(t.updateQueue=n,t.flags|=4),Dn(o,!0),o.tail===null&&o.tailMode==="hidden"&&!i.alternate&&!V)return ae(t),null}else 2*Y()-o.renderingStartTime>Sn&&n!==1073741824&&(t.flags|=128,r=!0,Dn(o,!1),t.lanes=4194304);o.isBackwards?(i.sibling=t.child,t.child=i):(n=o.last,n!==null?n.sibling=i:t.child=i,o.last=i)}return o.tail!==null?(t=o.tail,o.rendering=t,o.tail=t.sibling,o.renderingStartTime=Y(),t.sibling=null,n=H.current,U(H,r?n&1|2:n&1),t):(ae(t),null);case 22:case 23:return pa(),r=t.memoizedState!==null,e!==null&&e.memoizedState!==null!==r&&(t.flags|=8192),r&&(t.mode&1)!==0?(xe&1073741824)!==0&&(ae(t),t.subtreeFlags&6&&(t.flags|=8192)):ae(t),null;case 24:return null;case 25:return null}throw Error(x(156,t.tag))}function Pf(e,t){switch(Qi(t),t.tag){case 1:return ve(t.type)&&fl(),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return wn(),B(he),B(ue),ea(),e=t.flags,(e&65536)!==0&&(e&128)===0?(t.flags=e&-65537|128,t):null;case 5:return qi(t),null;case 13:if(B(H),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(x(340));yn()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return B(H),null;case 4:return wn(),null;case 10:return Gi(t.type._context),null;case 22:case 23:return pa(),null;case 24:return null;default:return null}}var Kr=!1,se=!1,zf=typeof WeakSet=="function"?WeakSet:Set,E=null;function sn(e,t){var n=e.ref;if(n!==null)if(typeof n=="function")try{n(null)}catch(r){K(e,t,r)}else n.current=null}function wi(e,t,n){try{n()}catch(r){K(e,t,r)}}var Xs=!1;function If(e,t){if(ri=ul,e=Hu(),Hi(e)){if("selectionStart"in e)var n={start:e.selectionStart,end:e.selectionEnd};else e:{n=(n=e.ownerDocument)&&n.defaultView||window;var r=n.getSelection&&n.getSelection();if(r&&r.rangeCount!==0){n=r.anchorNode;var l=r.anchorOffset,o=r.focusNode;r=r.focusOffset;try{n.nodeType,o.nodeType}catch{n=null;break e}var i=0,a=-1,s=-1,p=0,h=0,f=e,m=null;t:for(;;){for(var w;f!==n||l!==0&&f.nodeType!==3||(a=i+l),f!==o||r!==0&&f.nodeType!==3||(s=i+r),f.nodeType===3&&(i+=f.nodeValue.length),(w=f.firstChild)!==null;)m=f,f=w;for(;;){if(f===e)break t;if(m===n&&++p===l&&(a=i),m===o&&++h===r&&(s=i),(w=f.nextSibling)!==null)break;f=m,m=f.parentNode}f=w}n=a===-1||s===-1?null:{start:a,end:s}}else n=null}n=n||{start:0,end:0}}else n=null;for(li={focusedElem:e,selectionRange:n},ul=!1,E=t;E!==null;)if(t=E,e=t.child,(t.subtreeFlags&1028)!==0&&e!==null)e.return=t,E=e;else for(;E!==null;){t=E;try{var S=t.alternate;if((t.flags&1024)!==0)switch(t.tag){case 0:case 11:case 15:break;case 1:if(S!==null){var C=S.memoizedProps,D=S.memoizedState,u=t.stateNode,c=u.getSnapshotBeforeUpdate(t.elementType===t.type?C:Fe(t.type,C),D);u.__reactInternalSnapshotBeforeUpdate=c}break;case 3:var d=t.stateNode.containerInfo;d.nodeType===1?d.textContent="":d.nodeType===9&&d.documentElement&&d.removeChild(d.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(x(163))}}catch(y){K(t,t.return,y)}if(e=t.sibling,e!==null){e.return=t.return,E=e;break}E=t.return}return S=Xs,Xs=!1,S}function Xn(e,t,n){var r=t.updateQueue;if(r=r!==null?r.lastEffect:null,r!==null){var l=r=r.next;do{if((l.tag&e)===e){var o=l.destroy;l.destroy=void 0,o!==void 0&&wi(t,n,o)}l=l.next}while(l!==r)}}function jl(e,t){if(t=t.updateQueue,t=t!==null?t.lastEffect:null,t!==null){var n=t=t.next;do{if((n.tag&e)===e){var r=n.create;n.destroy=r()}n=n.next}while(n!==t)}}function ki(e){var t=e.ref;if(t!==null){var n=e.stateNode;e.tag,e=n,typeof t=="function"?t(e):t.current=e}}function Wc(e){var t=e.alternate;t!==null&&(e.alternate=null,Wc(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&(delete t[Ke],delete t[ar],delete t[ai],delete t[pf],delete t[df])),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}function Bc(e){return e.tag===5||e.tag===3||e.tag===4}function Gs(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||Bc(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function Si(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.nodeType===8?n.parentNode.insertBefore(e,t):n.insertBefore(e,t):(n.nodeType===8?(t=n.parentNode,t.insertBefore(e,n)):(t=n,t.appendChild(e)),n=n._reactRootContainer,n!=null||t.onclick!==null||(t.onclick=dl));else if(r!==4&&(e=e.child,e!==null))for(Si(e,t,n),e=e.sibling;e!==null;)Si(e,t,n),e=e.sibling}function Ni(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.insertBefore(e,t):n.appendChild(e);else if(r!==4&&(e=e.child,e!==null))for(Ni(e,t,n),e=e.sibling;e!==null;)Ni(e,t,n),e=e.sibling}var ne=null,Ue=!1;function st(e,t,n){for(n=n.child;n!==null;)Ac(e,t,n),n=n.sibling}function Ac(e,t,n){if(Ye&&typeof Ye.onCommitFiberUnmount=="function")try{Ye.onCommitFiberUnmount(zl,n)}catch{}switch(n.tag){case 5:se||sn(n,t);case 6:var r=ne,l=Ue;ne=null,st(e,t,n),ne=r,Ue=l,ne!==null&&(Ue?(e=ne,n=n.stateNode,e.nodeType===8?e.parentNode.removeChild(n):e.removeChild(n)):ne.removeChild(n.stateNode));break;case 18:ne!==null&&(Ue?(e=ne,n=n.stateNode,e.nodeType===8?Eo(e.parentNode,n):e.nodeType===1&&Eo(e,n),nr(e)):Eo(ne,n.stateNode));break;case 4:r=ne,l=Ue,ne=n.stateNode.containerInfo,Ue=!0,st(e,t,n),ne=r,Ue=l;break;case 0:case 11:case 14:case 15:if(!se&&(r=n.updateQueue,r!==null&&(r=r.lastEffect,r!==null))){l=r=r.next;do{var o=l,i=o.destroy;o=o.tag,i!==void 0&&((o&2)!==0||(o&4)!==0)&&wi(n,t,i),l=l.next}while(l!==r)}st(e,t,n);break;case 1:if(!se&&(sn(n,t),r=n.stateNode,typeof r.componentWillUnmount=="function"))try{r.props=n.memoizedProps,r.state=n.memoizedState,r.componentWillUnmount()}catch(a){K(n,t,a)}st(e,t,n);break;case 21:st(e,t,n);break;case 22:n.mode&1?(se=(r=se)||n.memoizedState!==null,st(e,t,n),se=r):st(e,t,n);break;default:st(e,t,n)}}function Zs(e){var t=e.updateQueue;if(t!==null){e.updateQueue=null;var n=e.stateNode;n===null&&(n=e.stateNode=new zf),t.forEach(function(r){var l=Uf.bind(null,e,r);n.has(r)||(n.add(r),r.then(l,l))})}}function je(e,t){var n=t.deletions;if(n!==null)for(var r=0;r<n.length;r++){var l=n[r];try{var o=e,i=t,a=i;e:for(;a!==null;){switch(a.tag){case 5:ne=a.stateNode,Ue=!1;break e;case 3:ne=a.stateNode.containerInfo,Ue=!0;break e;case 4:ne=a.stateNode.containerInfo,Ue=!0;break e}a=a.return}if(ne===null)throw Error(x(160));Ac(o,i,l),ne=null,Ue=!1;var s=l.alternate;s!==null&&(s.return=null),l.return=null}catch(p){K(l,t,p)}}if(t.subtreeFlags&12854)for(t=t.child;t!==null;)Vc(t,e),t=t.sibling}function Vc(e,t){var n=e.alternate,r=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if(je(t,e),$e(e),r&4){try{Xn(3,e,e.return),jl(3,e)}catch(C){K(e,e.return,C)}try{Xn(5,e,e.return)}catch(C){K(e,e.return,C)}}break;case 1:je(t,e),$e(e),r&512&&n!==null&&sn(n,n.return);break;case 5:if(je(t,e),$e(e),r&512&&n!==null&&sn(n,n.return),e.flags&32){var l=e.stateNode;try{Jn(l,"")}catch(C){K(e,e.return,C)}}if(r&4&&(l=e.stateNode,l!=null)){var o=e.memoizedProps,i=n!==null?n.memoizedProps:o,a=e.type,s=e.updateQueue;if(e.updateQueue=null,s!==null)try{a==="input"&&o.type==="radio"&&o.name!=null&&cu(l,o),Yo(a,i);var p=Yo(a,o);for(i=0;i<s.length;i+=2){var h=s[i],f=s[i+1];h==="style"?gu(l,f):h==="dangerouslySetInnerHTML"?fu(l,f):h==="children"?Jn(l,f):Li(l,h,f,p)}switch(a){case"input":Vo(l,o);break;case"textarea":pu(l,o);break;case"select":var m=l._wrapperState.wasMultiple;l._wrapperState.wasMultiple=!!o.multiple;var w=o.value;w!=null?cn(l,!!o.multiple,w,!1):m!==!!o.multiple&&(o.defaultValue!=null?cn(l,!!o.multiple,o.defaultValue,!0):cn(l,!!o.multiple,o.multiple?[]:"",!1))}l[ar]=o}catch(C){K(e,e.return,C)}}break;case 6:if(je(t,e),$e(e),r&4){if(e.stateNode===null)throw Error(x(162));l=e.stateNode,o=e.memoizedProps;try{l.nodeValue=o}catch(C){K(e,e.return,C)}}break;case 3:if(je(t,e),$e(e),r&4&&n!==null&&n.memoizedState.isDehydrated)try{nr(t.containerInfo)}catch(C){K(e,e.return,C)}break;case 4:je(t,e),$e(e);break;case 13:je(t,e),$e(e),l=e.child,l.flags&8192&&(o=l.memoizedState!==null,l.stateNode.isHidden=o,!o||l.alternate!==null&&l.alternate.memoizedState!==null||(ua=Y())),r&4&&Zs(e);break;case 22:if(h=n!==null&&n.memoizedState!==null,e.mode&1?(se=(p=se)||h,je(t,e),se=p):je(t,e),$e(e),r&8192){if(p=e.memoizedState!==null,(e.stateNode.isHidden=p)&&!h&&(e.mode&1)!==0)for(E=e,h=e.child;h!==null;){for(f=E=h;E!==null;){switch(m=E,w=m.child,m.tag){case 0:case 11:case 14:case 15:Xn(4,m,m.return);break;case 1:sn(m,m.return);var S=m.stateNode;if(typeof S.componentWillUnmount=="function"){r=m,n=m.return;try{t=r,S.props=t.memoizedProps,S.state=t.memoizedState,S.componentWillUnmount()}catch(C){K(r,n,C)}}break;case 5:sn(m,m.return);break;case 22:if(m.memoizedState!==null){Js(f);continue}}w!==null?(w.return=m,E=w):Js(f)}h=h.sibling}e:for(h=null,f=e;;){if(f.tag===5){if(h===null){h=f;try{l=f.stateNode,p?(o=l.style,typeof o.setProperty=="function"?o.setProperty("display","none","important"):o.display="none"):(a=f.stateNode,s=f.memoizedProps.style,i=s!=null&&s.hasOwnProperty("display")?s.display:null,a.style.display=mu("display",i))}catch(C){K(e,e.return,C)}}}else if(f.tag===6){if(h===null)try{f.stateNode.nodeValue=p?"":f.memoizedProps}catch(C){K(e,e.return,C)}}else if((f.tag!==22&&f.tag!==23||f.memoizedState===null||f===e)&&f.child!==null){f.child.return=f,f=f.child;continue}if(f===e)break e;for(;f.sibling===null;){if(f.return===null||f.return===e)break e;h===f&&(h=null),f=f.return}h===f&&(h=null),f.sibling.return=f.return,f=f.sibling}}break;case 19:je(t,e),$e(e),r&4&&Zs(e);break;case 21:break;default:je(t,e),$e(e)}}function $e(e){var t=e.flags;if(t&2){try{e:{for(var n=e.return;n!==null;){if(Bc(n)){var r=n;break e}n=n.return}throw Error(x(160))}switch(r.tag){case 5:var l=r.stateNode;r.flags&32&&(Jn(l,""),r.flags&=-33);var o=Gs(e);Ni(e,o,l);break;case 3:case 4:var i=r.stateNode.containerInfo,a=Gs(e);Si(e,a,i);break;default:throw Error(x(161))}}catch(s){K(e,e.return,s)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function Lf(e,t,n){E=e,Hc(e,t,n)}function Hc(e,t,n){for(var r=(e.mode&1)!==0;E!==null;){var l=E,o=l.child;if(l.tag===22&&r){var i=l.memoizedState!==null||Kr;if(!i){var a=l.alternate,s=a!==null&&a.memoizedState!==null||se;a=Kr;var p=se;if(Kr=i,(se=s)&&!p)for(E=l;E!==null;)i=E,s=i.child,i.tag===22&&i.memoizedState!==null?qs(l):s!==null?(s.return=i,E=s):qs(l);for(;o!==null;)E=o,Hc(o,t,n),o=o.sibling;E=l,Kr=a,se=p}bs(e,t,n)}else(l.subtreeFlags&8772)!==0&&o!==null?(o.return=l,E=o):bs(e,t,n)}}function bs(e){for(;E!==null;){var t=E;if((t.flags&8772)!==0){var n=t.alternate;try{if((t.flags&8772)!==0)switch(t.tag){case 0:case 11:case 15:se||jl(5,t);break;case 1:var r=t.stateNode;if(t.flags&4&&!se)if(n===null)r.componentDidMount();else{var l=t.elementType===t.type?n.memoizedProps:Fe(t.type,n.memoizedProps);r.componentDidUpdate(l,n.memoizedState,r.__reactInternalSnapshotBeforeUpdate)}var o=t.updateQueue;o!==null&&Ds(t,o,r);break;case 3:var i=t.updateQueue;if(i!==null){if(n=null,t.child!==null)switch(t.child.tag){case 5:n=t.child.stateNode;break;case 1:n=t.child.stateNode}Ds(t,i,n)}break;case 5:var a=t.stateNode;if(n===null&&t.flags&4){n=a;var s=t.memoizedProps;switch(t.type){case"button":case"input":case"select":case"textarea":s.autoFocus&&n.focus();break;case"img":s.src&&(n.src=s.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(t.memoizedState===null){var p=t.alternate;if(p!==null){var h=p.memoizedState;if(h!==null){var f=h.dehydrated;f!==null&&nr(f)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(x(163))}se||t.flags&512&&ki(t)}catch(m){K(t,t.return,m)}}if(t===e){E=null;break}if(n=t.sibling,n!==null){n.return=t.return,E=n;break}E=t.return}}function Js(e){for(;E!==null;){var t=E;if(t===e){E=null;break}var n=t.sibling;if(n!==null){n.return=t.return,E=n;break}E=t.return}}function qs(e){for(;E!==null;){var t=E;try{switch(t.tag){case 0:case 11:case 15:var n=t.return;try{jl(4,t)}catch(s){K(t,n,s)}break;case 1:var r=t.stateNode;if(typeof r.componentDidMount=="function"){var l=t.return;try{r.componentDidMount()}catch(s){K(t,l,s)}}var o=t.return;try{ki(t)}catch(s){K(t,o,s)}break;case 5:var i=t.return;try{ki(t)}catch(s){K(t,i,s)}}}catch(s){K(t,t.return,s)}if(t===e){E=null;break}var a=t.sibling;if(a!==null){a.return=t.return,E=a;break}E=t.return}}var Mf=Math.ceil,Nl=ot.ReactCurrentDispatcher,aa=ot.ReactCurrentOwner,Le=ot.ReactCurrentBatchConfig,T=0,te=null,X=null,re=0,xe=0,un=Et(0),b=0,fr=null,Vt=0,Fl=0,sa=0,Gn=null,me=null,ua=0,Sn=1/0,Ze=null,Cl=!1,Ci=null,wt=null,Yr=!1,mt=null,_l=0,Zn=0,_i=null,tl=-1,nl=0;function de(){return(T&6)!==0?Y():tl!==-1?tl:tl=Y()}function kt(e){return(e.mode&1)===0?1:(T&2)!==0&&re!==0?re&-re:mf.transition!==null?(nl===0&&(nl=Pu()),nl):(e=O,e!==0||(e=window.event,e=e===void 0?16:Ou(e.type)),e)}function Ae(e,t,n,r){if(50<Zn)throw Zn=0,_i=null,Error(x(185));mr(e,n,r),((T&2)===0||e!==te)&&(e===te&&((T&2)===0&&(Fl|=n),b===4&&dt(e,re)),ye(e,r),n===1&&T===0&&(t.mode&1)===0&&(Sn=Y()+500,Rl&&Pt()))}function ye(e,t){var n=e.callbackNode;gd(e,t);var r=sl(e,e===te?re:0);if(r===0)n!==null&&as(n),e.callbackNode=null,e.callbackPriority=0;else if(t=r&-r,e.callbackPriority!==t){if(n!=null&&as(n),t===1)e.tag===0?ff(eu.bind(null,e)):qu(eu.bind(null,e)),uf(function(){(T&6)===0&&Pt()}),n=null;else{switch(zu(r)){case 1:n=Di;break;case 4:n=_u;break;case 16:n=al;break;case 536870912:n=Eu;break;default:n=al}n=bc(n,$c.bind(null,e))}e.callbackPriority=t,e.callbackNode=n}}function $c(e,t){if(tl=-1,nl=0,(T&6)!==0)throw Error(x(327));var n=e.callbackNode;if(gn()&&e.callbackNode!==n)return null;var r=sl(e,e===te?re:0);if(r===0)return null;if((r&30)!==0||(r&e.expiredLanes)!==0||t)t=El(e,r);else{t=r;var l=T;T|=2;var o=Kc();(te!==e||re!==t)&&(Ze=null,Sn=Y()+500,Ft(e,t));do try{Of();break}catch(a){Qc(e,a)}while(!0);Xi(),Nl.current=o,T=l,X!==null?t=0:(te=null,re=0,t=b)}if(t!==0){if(t===2&&(l=Jo(e),l!==0&&(r=l,t=Ei(e,l))),t===1)throw n=fr,Ft(e,0),dt(e,r),ye(e,Y()),n;if(t===6)dt(e,r);else{if(l=e.current.alternate,(r&30)===0&&!Tf(l)&&(t=El(e,r),t===2&&(o=Jo(e),o!==0&&(r=o,t=Ei(e,o))),t===1))throw n=fr,Ft(e,0),dt(e,r),ye(e,Y()),n;switch(e.finishedWork=l,e.finishedLanes=r,t){case 0:case 1:throw Error(x(345));case 2:Rt(e,me,Ze);break;case 3:if(dt(e,r),(r&130023424)===r&&(t=ua+500-Y(),10<t)){if(sl(e,0)!==0)break;if(l=e.suspendedLanes,(l&r)!==r){de(),e.pingedLanes|=e.suspendedLanes&l;break}e.timeoutHandle=ii(Rt.bind(null,e,me,Ze),t);break}Rt(e,me,Ze);break;case 4:if(dt(e,r),(r&4194240)===r)break;for(t=e.eventTimes,l=-1;0<r;){var i=31-Be(r);o=1<<i,i=t[i],i>l&&(l=i),r&=~o}if(r=l,r=Y()-r,r=(120>r?120:480>r?480:1080>r?1080:1920>r?1920:3e3>r?3e3:4320>r?4320:1960*Mf(r/1960))-r,10<r){e.timeoutHandle=ii(Rt.bind(null,e,me,Ze),r);break}Rt(e,me,Ze);break;case 5:Rt(e,me,Ze);break;default:throw Error(x(329))}}}return ye(e,Y()),e.callbackNode===n?$c.bind(null,e):null}function Ei(e,t){var n=Gn;return e.current.memoizedState.isDehydrated&&(Ft(e,t).flags|=256),e=El(e,t),e!==2&&(t=me,me=n,t!==null&&Pi(t)),e}function Pi(e){me===null?me=e:me.push.apply(me,e)}function Tf(e){for(var t=e;;){if(t.flags&16384){var n=t.updateQueue;if(n!==null&&(n=n.stores,n!==null))for(var r=0;r<n.length;r++){var l=n[r],o=l.getSnapshot;l=l.value;try{if(!Ve(o(),l))return!1}catch{return!1}}}if(n=t.child,t.subtreeFlags&16384&&n!==null)n.return=t,t=n;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function dt(e,t){for(t&=~sa,t&=~Fl,e.suspendedLanes|=t,e.pingedLanes&=~t,e=e.expirationTimes;0<t;){var n=31-Be(t),r=1<<n;e[n]=-1,t&=~r}}function eu(e){if((T&6)!==0)throw Error(x(327));gn();var t=sl(e,0);if((t&1)===0)return ye(e,Y()),null;var n=El(e,t);if(e.tag!==0&&n===2){var r=Jo(e);r!==0&&(t=r,n=Ei(e,r))}if(n===1)throw n=fr,Ft(e,0),dt(e,t),ye(e,Y()),n;if(n===6)throw Error(x(345));return e.finishedWork=e.current.alternate,e.finishedLanes=t,Rt(e,me,Ze),ye(e,Y()),null}function ca(e,t){var n=T;T|=1;try{return e(t)}finally{T=n,T===0&&(Sn=Y()+500,Rl&&Pt())}}function Ht(e){mt!==null&&mt.tag===0&&(T&6)===0&&gn();var t=T;T|=1;var n=Le.transition,r=O;try{if(Le.transition=null,O=1,e)return e()}finally{O=r,Le.transition=n,T=t,(T&6)===0&&Pt()}}function pa(){xe=un.current,B(un)}function Ft(e,t){e.finishedWork=null,e.finishedLanes=0;var n=e.timeoutHandle;if(n!==-1&&(e.timeoutHandle=-1,sf(n)),X!==null)for(n=X.return;n!==null;){var r=n;switch(Qi(r),r.tag){case 1:r=r.type.childContextTypes,r!=null&&fl();break;case 3:wn(),B(he),B(ue),ea();break;case 5:qi(r);break;case 4:wn();break;case 13:B(H);break;case 19:B(H);break;case 10:Gi(r.type._context);break;case 22:case 23:pa()}n=n.return}if(te=e,X=e=St(e.current,null),re=xe=t,b=0,fr=null,sa=Fl=Vt=0,me=Gn=null,Dt!==null){for(t=0;t<Dt.length;t++)if(n=Dt[t],r=n.interleaved,r!==null){n.interleaved=null;var l=r.next,o=n.pending;if(o!==null){var i=o.next;o.next=l,r.next=i}n.pending=r}Dt=null}return e}function Qc(e,t){do{var n=X;try{if(Xi(),Jr.current=Sl,kl){for(var r=$.memoizedState;r!==null;){var l=r.queue;l!==null&&(l.pending=null),r=r.next}kl=!1}if(At=0,ee=Z=$=null,Yn=!1,cr=0,aa.current=null,n===null||n.return===null){b=1,fr=t,X=null;break}e:{var o=e,i=n.return,a=n,s=t;if(t=re,a.flags|=32768,s!==null&&typeof s=="object"&&typeof s.then=="function"){var p=s,h=a,f=h.tag;if((h.mode&1)===0&&(f===0||f===11||f===15)){var m=h.alternate;m?(h.updateQueue=m.updateQueue,h.memoizedState=m.memoizedState,h.lanes=m.lanes):(h.updateQueue=null,h.memoizedState=null)}var w=As(i);if(w!==null){w.flags&=-257,Vs(w,i,a,o,t),w.mode&1&&Bs(o,p,t),t=w,s=p;var S=t.updateQueue;if(S===null){var C=new Set;C.add(s),t.updateQueue=C}else S.add(s);break e}else{if((t&1)===0){Bs(o,p,t),da();break e}s=Error(x(426))}}else if(V&&a.mode&1){var D=As(i);if(D!==null){(D.flags&65536)===0&&(D.flags|=256),Vs(D,i,a,o,t),Ki(kn(s,a));break e}}o=s=kn(s,a),b!==4&&(b=2),Gn===null?Gn=[o]:Gn.push(o),o=i;do{switch(o.tag){case 3:o.flags|=65536,t&=-t,o.lanes|=t;var u=zc(o,s,t);Os(o,u);break e;case 1:a=s;var c=o.type,d=o.stateNode;if((o.flags&128)===0&&(typeof c.getDerivedStateFromError=="function"||d!==null&&typeof d.componentDidCatch=="function"&&(wt===null||!wt.has(d)))){o.flags|=65536,t&=-t,o.lanes|=t;var y=Ic(o,a,t);Os(o,y);break e}}o=o.return}while(o!==null)}Xc(n)}catch(z){t=z,X===n&&n!==null&&(X=n=n.return);continue}break}while(!0)}function Kc(){var e=Nl.current;return Nl.current=Sl,e===null?Sl:e}function da(){(b===0||b===3||b===2)&&(b=4),te===null||(Vt&268435455)===0&&(Fl&268435455)===0||dt(te,re)}function El(e,t){var n=T;T|=2;var r=Kc();(te!==e||re!==t)&&(Ze=null,Ft(e,t));do try{Rf();break}catch(l){Qc(e,l)}while(!0);if(Xi(),T=n,Nl.current=r,X!==null)throw Error(x(261));return te=null,re=0,b}function Rf(){for(;X!==null;)Yc(X)}function Of(){for(;X!==null&&!id();)Yc(X)}function Yc(e){var t=Zc(e.alternate,e,xe);e.memoizedProps=e.pendingProps,t===null?Xc(e):X=t,aa.current=null}function Xc(e){var t=e;do{var n=t.alternate;if(e=t.return,(t.flags&32768)===0){if(n=Ef(n,t,xe),n!==null){X=n;return}}else{if(n=Pf(n,t),n!==null){n.flags&=32767,X=n;return}if(e!==null)e.flags|=32768,e.subtreeFlags=0,e.deletions=null;else{b=6,X=null;return}}if(t=t.sibling,t!==null){X=t;return}X=t=e}while(t!==null);b===0&&(b=5)}function Rt(e,t,n){var r=O,l=Le.transition;try{Le.transition=null,O=1,Df(e,t,n,r)}finally{Le.transition=l,O=r}return null}function Df(e,t,n,r){do gn();while(mt!==null);if((T&6)!==0)throw Error(x(327));n=e.finishedWork;var l=e.finishedLanes;if(n===null)return null;if(e.finishedWork=null,e.finishedLanes=0,n===e.current)throw Error(x(177));e.callbackNode=null,e.callbackPriority=0;var o=n.lanes|n.childLanes;if(hd(e,o),e===te&&(X=te=null,re=0),(n.subtreeFlags&2064)===0&&(n.flags&2064)===0||Yr||(Yr=!0,bc(al,function(){return gn(),null})),o=(n.flags&15990)!==0,(n.subtreeFlags&15990)!==0||o){o=Le.transition,Le.transition=null;var i=O;O=1;var a=T;T|=4,aa.current=null,If(e,n),Vc(n,e),nf(li),ul=!!ri,li=ri=null,e.current=n,Lf(n,e,l),ad(),T=a,O=i,Le.transition=o}else e.current=n;if(Yr&&(Yr=!1,mt=e,_l=l),o=e.pendingLanes,o===0&&(wt=null),cd(n.stateNode,r),ye(e,Y()),t!==null)for(r=e.onRecoverableError,n=0;n<t.length;n++)l=t[n],r(l.value,{componentStack:l.stack,digest:l.digest});if(Cl)throw Cl=!1,e=Ci,Ci=null,e;return(_l&1)!==0&&e.tag!==0&&gn(),o=e.pendingLanes,(o&1)!==0?e===_i?Zn++:(Zn=0,_i=e):Zn=0,Pt(),null}function gn(){if(mt!==null){var e=zu(_l),t=Le.transition,n=O;try{if(Le.transition=null,O=16>e?16:e,mt===null)var r=!1;else{if(e=mt,mt=null,_l=0,(T&6)!==0)throw Error(x(331));var l=T;for(T|=4,E=e.current;E!==null;){var o=E,i=o.child;if((E.flags&16)!==0){var a=o.deletions;if(a!==null){for(var s=0;s<a.length;s++){var p=a[s];for(E=p;E!==null;){var h=E;switch(h.tag){case 0:case 11:case 15:Xn(8,h,o)}var f=h.child;if(f!==null)f.return=h,E=f;else for(;E!==null;){h=E;var m=h.sibling,w=h.return;if(Wc(h),h===p){E=null;break}if(m!==null){m.return=w,E=m;break}E=w}}}var S=o.alternate;if(S!==null){var C=S.child;if(C!==null){S.child=null;do{var D=C.sibling;C.sibling=null,C=D}while(C!==null)}}E=o}}if((o.subtreeFlags&2064)!==0&&i!==null)i.return=o,E=i;else e:for(;E!==null;){if(o=E,(o.flags&2048)!==0)switch(o.tag){case 0:case 11:case 15:Xn(9,o,o.return)}var u=o.sibling;if(u!==null){u.return=o.return,E=u;break e}E=o.return}}var c=e.current;for(E=c;E!==null;){i=E;var d=i.child;if((i.subtreeFlags&2064)!==0&&d!==null)d.return=i,E=d;else e:for(i=c;E!==null;){if(a=E,(a.flags&2048)!==0)try{switch(a.tag){case 0:case 11:case 15:jl(9,a)}}catch(z){K(a,a.return,z)}if(a===i){E=null;break e}var y=a.sibling;if(y!==null){y.return=a.return,E=y;break e}E=a.return}}if(T=l,Pt(),Ye&&typeof Ye.onPostCommitFiberRoot=="function")try{Ye.onPostCommitFiberRoot(zl,e)}catch{}r=!0}return r}finally{O=n,Le.transition=t}}return!1}function tu(e,t,n){t=kn(n,t),t=zc(e,t,1),e=xt(e,t,1),t=de(),e!==null&&(mr(e,1,t),ye(e,t))}function K(e,t,n){if(e.tag===3)tu(e,e,n);else for(;t!==null;){if(t.tag===3){tu(t,e,n);break}else if(t.tag===1){var r=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof r.componentDidCatch=="function"&&(wt===null||!wt.has(r))){e=kn(n,e),e=Ic(t,e,1),t=xt(t,e,1),e=de(),t!==null&&(mr(t,1,e),ye(t,e));break}}t=t.return}}function jf(e,t,n){var r=e.pingCache;r!==null&&r.delete(t),t=de(),e.pingedLanes|=e.suspendedLanes&n,te===e&&(re&n)===n&&(b===4||b===3&&(re&130023424)===re&&500>Y()-ua?Ft(e,0):sa|=n),ye(e,t)}function Gc(e,t){t===0&&((e.mode&1)===0?t=1:(t=Rr,Rr<<=1,(Rr&130023424)===0&&(Rr=4194304)));var n=de();e=rt(e,t),e!==null&&(mr(e,t,n),ye(e,n))}function Ff(e){var t=e.memoizedState,n=0;t!==null&&(n=t.retryLane),Gc(e,n)}function Uf(e,t){var n=0;switch(e.tag){case 13:var r=e.stateNode,l=e.memoizedState;l!==null&&(n=l.retryLane);break;case 19:r=e.stateNode;break;default:throw Error(x(314))}r!==null&&r.delete(t),Gc(e,n)}var Zc;Zc=function(e,t,n){if(e!==null)if(e.memoizedProps!==t.pendingProps||he.current)ge=!0;else{if((e.lanes&n)===0&&(t.flags&128)===0)return ge=!1,_f(e,t,n);ge=(e.flags&131072)!==0}else ge=!1,V&&(t.flags&1048576)!==0&&ec(t,hl,t.index);switch(t.lanes=0,t.tag){case 2:var r=t.type;el(e,t),e=t.pendingProps;var l=vn(t,ue.current);mn(t,n),l=na(null,t,r,e,l,n);var o=ra();return t.flags|=1,typeof l=="object"&&l!==null&&typeof l.render=="function"&&l.$$typeof===void 0?(t.tag=1,t.memoizedState=null,t.updateQueue=null,ve(r)?(o=!0,ml(t)):o=!1,t.memoizedState=l.state!==null&&l.state!==void 0?l.state:null,bi(t),l.updater=Dl,t.stateNode=l,l._reactInternals=t,fi(t,r,e,n),t=hi(null,t,r,!0,o,n)):(t.tag=0,V&&o&&$i(t),pe(null,t,l,n),t=t.child),t;case 16:r=t.elementType;e:{switch(el(e,t),e=t.pendingProps,l=r._init,r=l(r._payload),t.type=r,l=t.tag=Bf(r),e=Fe(r,e),l){case 0:t=gi(null,t,r,e,n);break e;case 1:t=Qs(null,t,r,e,n);break e;case 11:t=Hs(null,t,r,e,n);break e;case 14:t=$s(null,t,r,Fe(r.type,e),n);break e}throw Error(x(306,r,""))}return t;case 0:return r=t.type,l=t.pendingProps,l=t.elementType===r?l:Fe(r,l),gi(e,t,r,l,n);case 1:return r=t.type,l=t.pendingProps,l=t.elementType===r?l:Fe(r,l),Qs(e,t,r,l,n);case 3:e:{if(Rc(t),e===null)throw Error(x(387));r=t.pendingProps,o=t.memoizedState,l=o.element,ic(e,t),xl(t,r,null,n);var i=t.memoizedState;if(r=i.element,o.isDehydrated)if(o={element:r,isDehydrated:!1,cache:i.cache,pendingSuspenseBoundaries:i.pendingSuspenseBoundaries,transitions:i.transitions},t.updateQueue.baseState=o,t.memoizedState=o,t.flags&256){l=kn(Error(x(423)),t),t=Ks(e,t,r,n,l);break e}else if(r!==l){l=kn(Error(x(424)),t),t=Ks(e,t,r,n,l);break e}else for(we=yt(t.stateNode.containerInfo.firstChild),ke=t,V=!0,We=null,n=lc(t,null,r,n),t.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling;else{if(yn(),r===l){t=lt(e,t,n);break e}pe(e,t,r,n)}t=t.child}return t;case 5:return ac(t),e===null&&ci(t),r=t.type,l=t.pendingProps,o=e!==null?e.memoizedProps:null,i=l.children,oi(r,l)?i=null:o!==null&&oi(r,o)&&(t.flags|=32),Tc(e,t),pe(e,t,i,n),t.child;case 6:return e===null&&ci(t),null;case 13:return Oc(e,t,n);case 4:return Ji(t,t.stateNode.containerInfo),r=t.pendingProps,e===null?t.child=xn(t,null,r,n):pe(e,t,r,n),t.child;case 11:return r=t.type,l=t.pendingProps,l=t.elementType===r?l:Fe(r,l),Hs(e,t,r,l,n);case 7:return pe(e,t,t.pendingProps,n),t.child;case 8:return pe(e,t,t.pendingProps.children,n),t.child;case 12:return pe(e,t,t.pendingProps.children,n),t.child;case 10:e:{if(r=t.type._context,l=t.pendingProps,o=t.memoizedProps,i=l.value,U(vl,r._currentValue),r._currentValue=i,o!==null)if(Ve(o.value,i)){if(o.children===l.children&&!he.current){t=lt(e,t,n);break e}}else for(o=t.child,o!==null&&(o.return=t);o!==null;){var a=o.dependencies;if(a!==null){i=o.child;for(var s=a.firstContext;s!==null;){if(s.context===r){if(o.tag===1){s=et(-1,n&-n),s.tag=2;var p=o.updateQueue;if(p!==null){p=p.shared;var h=p.pending;h===null?s.next=s:(s.next=h.next,h.next=s),p.pending=s}}o.lanes|=n,s=o.alternate,s!==null&&(s.lanes|=n),pi(o.return,n,t),a.lanes|=n;break}s=s.next}}else if(o.tag===10)i=o.type===t.type?null:o.child;else if(o.tag===18){if(i=o.return,i===null)throw Error(x(341));i.lanes|=n,a=i.alternate,a!==null&&(a.lanes|=n),pi(i,n,t),i=o.sibling}else i=o.child;if(i!==null)i.return=o;else for(i=o;i!==null;){if(i===t){i=null;break}if(o=i.sibling,o!==null){o.return=i.return,i=o;break}i=i.return}o=i}pe(e,t,l.children,n),t=t.child}return t;case 9:return l=t.type,r=t.pendingProps.children,mn(t,n),l=Me(l),r=r(l),t.flags|=1,pe(e,t,r,n),t.child;case 14:return r=t.type,l=Fe(r,t.pendingProps),l=Fe(r.type,l),$s(e,t,r,l,n);case 15:return Lc(e,t,t.type,t.pendingProps,n);case 17:return r=t.type,l=t.pendingProps,l=t.elementType===r?l:Fe(r,l),el(e,t),t.tag=1,ve(r)?(e=!0,ml(t)):e=!1,mn(t,n),Pc(t,r,l),fi(t,r,l,n),hi(null,t,r,!0,e,n);case 19:return Dc(e,t,n);case 22:return Mc(e,t,n)}throw Error(x(156,t.tag))};function bc(e,t){return Cu(e,t)}function Wf(e,t,n,r){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Ie(e,t,n,r){return new Wf(e,t,n,r)}function fa(e){return e=e.prototype,!(!e||!e.isReactComponent)}function Bf(e){if(typeof e=="function")return fa(e)?1:0;if(e!=null){if(e=e.$$typeof,e===Ti)return 11;if(e===Ri)return 14}return 2}function St(e,t){var n=e.alternate;return n===null?(n=Ie(e.tag,t,e.key,e.mode),n.elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=e.flags&14680064,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n}function rl(e,t,n,r,l,o){var i=2;if(r=e,typeof e=="function")fa(e)&&(i=1);else if(typeof e=="string")i=5;else e:switch(e){case Jt:return Ut(n.children,l,o,t);case Mi:i=8,l|=8;break;case Fo:return e=Ie(12,n,t,l|2),e.elementType=Fo,e.lanes=o,e;case Uo:return e=Ie(13,n,t,l),e.elementType=Uo,e.lanes=o,e;case Wo:return e=Ie(19,n,t,l),e.elementType=Wo,e.lanes=o,e;case au:return Ul(n,l,o,t);default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case ou:i=10;break e;case iu:i=9;break e;case Ti:i=11;break e;case Ri:i=14;break e;case ut:i=16,r=null;break e}throw Error(x(130,e==null?e:typeof e,""))}return t=Ie(i,n,t,l),t.elementType=e,t.type=r,t.lanes=o,t}function Ut(e,t,n,r){return e=Ie(7,e,r,t),e.lanes=n,e}function Ul(e,t,n,r){return e=Ie(22,e,r,t),e.elementType=au,e.lanes=n,e.stateNode={isHidden:!1},e}function Oo(e,t,n){return e=Ie(6,e,null,t),e.lanes=n,e}function Do(e,t,n){return t=Ie(4,e.children!==null?e.children:[],e.key,t),t.lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}function Af(e,t,n,r,l){this.tag=t,this.containerInfo=e,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=yo(0),this.expirationTimes=yo(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=yo(0),this.identifierPrefix=r,this.onRecoverableError=l,this.mutableSourceEagerHydrationData=null}function ma(e,t,n,r,l,o,i,a,s){return e=new Af(e,t,n,a,s),t===1?(t=1,o===!0&&(t|=8)):t=0,o=Ie(3,null,null,t),e.current=o,o.stateNode=e,o.memoizedState={element:r,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null},bi(o),e}function Vf(e,t,n){var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:bt,key:r==null?null:""+r,children:e,containerInfo:t,implementation:n}}function Jc(e){if(!e)return Ct;e=e._reactInternals;e:{if(Qt(e)!==e||e.tag!==1)throw Error(x(170));var t=e;do{switch(t.tag){case 3:t=t.stateNode.context;break e;case 1:if(ve(t.type)){t=t.stateNode.__reactInternalMemoizedMergedChildContext;break e}}t=t.return}while(t!==null);throw Error(x(171))}if(e.tag===1){var n=e.type;if(ve(n))return Ju(e,n,t)}return t}function qc(e,t,n,r,l,o,i,a,s){return e=ma(n,r,!0,e,l,o,i,a,s),e.context=Jc(null),n=e.current,r=de(),l=kt(n),o=et(r,l),o.callback=t??null,xt(n,o,l),e.current.lanes=l,mr(e,l,r),ye(e,r),e}function Wl(e,t,n,r){var l=t.current,o=de(),i=kt(l);return n=Jc(n),t.context===null?t.context=n:t.pendingContext=n,t=et(o,i),t.payload={element:e},r=r===void 0?null:r,r!==null&&(t.callback=r),e=xt(l,t,i),e!==null&&(Ae(e,l,i,o),br(e,l,i)),i}function Pl(e){return e=e.current,e.child?(e.child.tag===5,e.child.stateNode):null}function nu(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var n=e.retryLane;e.retryLane=n!==0&&n<t?n:t}}function ga(e,t){nu(e,t),(e=e.alternate)&&nu(e,t)}function Hf(){return null}var ep=typeof reportError=="function"?reportError:function(e){console.error(e)};function ha(e){this._internalRoot=e}Bl.prototype.render=ha.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(x(409));Wl(e,t,null,null)};Bl.prototype.unmount=ha.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;Ht(function(){Wl(null,e,null,null)}),t[nt]=null}};function Bl(e){this._internalRoot=e}Bl.prototype.unstable_scheduleHydration=function(e){if(e){var t=Mu();e={blockedOn:null,target:e,priority:t};for(var n=0;n<pt.length&&t!==0&&t<pt[n].priority;n++);pt.splice(n,0,e),n===0&&Ru(e)}};function va(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function Al(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11&&(e.nodeType!==8||e.nodeValue!==" react-mount-point-unstable "))}function ru(){}function $f(e,t,n,r,l){if(l){if(typeof r=="function"){var o=r;r=function(){var p=Pl(i);o.call(p)}}var i=qc(t,r,e,0,null,!1,!1,"",ru);return e._reactRootContainer=i,e[nt]=i.current,or(e.nodeType===8?e.parentNode:e),Ht(),i}for(;l=e.lastChild;)e.removeChild(l);if(typeof r=="function"){var a=r;r=function(){var p=Pl(s);a.call(p)}}var s=ma(e,0,!1,null,null,!1,!1,"",ru);return e._reactRootContainer=s,e[nt]=s.current,or(e.nodeType===8?e.parentNode:e),Ht(function(){Wl(t,s,n,r)}),s}function Vl(e,t,n,r,l){var o=n._reactRootContainer;if(o){var i=o;if(typeof l=="function"){var a=l;l=function(){var s=Pl(i);a.call(s)}}Wl(t,i,e,l)}else i=$f(n,t,e,l,r);return Pl(i)}Iu=function(e){switch(e.tag){case 3:var t=e.stateNode;if(t.current.memoizedState.isDehydrated){var n=Bn(t.pendingLanes);n!==0&&(ji(t,n|1),ye(t,Y()),(T&6)===0&&(Sn=Y()+500,Pt()))}break;case 13:Ht(function(){var r=rt(e,1);if(r!==null){var l=de();Ae(r,e,1,l)}}),ga(e,1)}};Fi=function(e){if(e.tag===13){var t=rt(e,134217728);if(t!==null){var n=de();Ae(t,e,134217728,n)}ga(e,134217728)}};Lu=function(e){if(e.tag===13){var t=kt(e),n=rt(e,t);if(n!==null){var r=de();Ae(n,e,t,r)}ga(e,t)}};Mu=function(){return O};Tu=function(e,t){var n=O;try{return O=e,t()}finally{O=n}};Go=function(e,t,n){switch(t){case"input":if(Vo(e,n),t=n.name,n.type==="radio"&&t!=null){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+t)+'][type="radio"]'),t=0;t<n.length;t++){var r=n[t];if(r!==e&&r.form===e.form){var l=Tl(r);if(!l)throw Error(x(90));uu(r),Vo(r,l)}}}break;case"textarea":pu(e,n);break;case"select":t=n.value,t!=null&&cn(e,!!n.multiple,t,!1)}};yu=ca;xu=Ht;var Qf={usingClientEntryPoint:!1,Events:[hr,nn,Tl,hu,vu,ca]},jn={findFiberByHostInstance:Ot,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},Kf={bundleType:jn.bundleType,version:jn.version,rendererPackageName:jn.rendererPackageName,rendererConfig:jn.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:ot.ReactCurrentDispatcher,findHostInstanceByFiber:function(e){return e=Su(e),e===null?null:e.stateNode},findFiberByHostInstance:jn.findFiberByHostInstance||Hf,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"&&(Fn=__REACT_DEVTOOLS_GLOBAL_HOOK__,!Fn.isDisabled&&Fn.supportsFiber))try{zl=Fn.inject(Kf),Ye=Fn}catch{}var Fn;Ce.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=Qf;Ce.createPortal=function(e,t){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!va(t))throw Error(x(200));return Vf(e,t,null,n)};Ce.createRoot=function(e,t){if(!va(e))throw Error(x(299));var n=!1,r="",l=ep;return t!=null&&(t.unstable_strictMode===!0&&(n=!0),t.identifierPrefix!==void 0&&(r=t.identifierPrefix),t.onRecoverableError!==void 0&&(l=t.onRecoverableError)),t=ma(e,1,!1,null,null,n,!1,r,l),e[nt]=t.current,or(e.nodeType===8?e.parentNode:e),new ha(t)};Ce.findDOMNode=function(e){if(e==null)return null;if(e.nodeType===1)return e;var t=e._reactInternals;if(t===void 0)throw typeof e.render=="function"?Error(x(188)):(e=Object.keys(e).join(","),Error(x(268,e)));return e=Su(t),e=e===null?null:e.stateNode,e};Ce.flushSync=function(e){return Ht(e)};Ce.hydrate=function(e,t,n){if(!Al(t))throw Error(x(200));return Vl(null,e,t,!0,n)};Ce.hydrateRoot=function(e,t,n){if(!va(e))throw Error(x(405));var r=n!=null&&n.hydratedSources||null,l=!1,o="",i=ep;if(n!=null&&(n.unstable_strictMode===!0&&(l=!0),n.identifierPrefix!==void 0&&(o=n.identifierPrefix),n.onRecoverableError!==void 0&&(i=n.onRecoverableError)),t=qc(t,null,e,1,n??null,l,!1,o,i),e[nt]=t.current,or(e),r)for(e=0;e<r.length;e++)n=r[e],l=n._getVersion,l=l(n._source),t.mutableSourceEagerHydrationData==null?t.mutableSourceEagerHydrationData=[n,l]:t.mutableSourceEagerHydrationData.push(n,l);return new Bl(t)};Ce.render=function(e,t,n){if(!Al(t))throw Error(x(200));return Vl(null,e,t,!1,n)};Ce.unmountComponentAtNode=function(e){if(!Al(e))throw Error(x(40));return e._reactRootContainer?(Ht(function(){Vl(null,null,e,!1,function(){e._reactRootContainer=null,e[nt]=null})}),!0):!1};Ce.unstable_batchedUpdates=ca;Ce.unstable_renderSubtreeIntoContainer=function(e,t,n,r){if(!Al(n))throw Error(x(200));if(e==null||e._reactInternals===void 0)throw Error(x(38));return Vl(e,t,n,!1,r)};Ce.version="18.3.1-next-f1338f8080-20240426"});var lp=Ge((a0,rp)=>{"use strict";function np(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(np)}catch(e){console.error(e)}}np(),rp.exports=tp()});var ip=Ge(ya=>{"use strict";var op=lp();ya.createRoot=op.createRoot,ya.hydrateRoot=op.hydrateRoot;var s0});var sp=Ge(Hl=>{"use strict";var Yf=it(),Xf=Symbol.for("react.element"),Gf=Symbol.for("react.fragment"),Zf=Object.prototype.hasOwnProperty,bf=Yf.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,Jf={key:!0,ref:!0,__self:!0,__source:!0};function ap(e,t,n){var r,l={},o=null,i=null;n!==void 0&&(o=""+n),t.key!==void 0&&(o=""+t.key),t.ref!==void 0&&(i=t.ref);for(r in t)Zf.call(t,r)&&!Jf.hasOwnProperty(r)&&(l[r]=t[r]);if(e&&e.defaultProps)for(r in t=e.defaultProps,t)l[r]===void 0&&(l[r]=t[r]);return{$$typeof:Xf,type:e,key:o,ref:i,props:l,_owner:bf.current}}Hl.Fragment=Gf;Hl.jsx=ap;Hl.jsxs=ap});var _e=Ge((p0,up)=>{"use strict";up.exports=sp()});var kp=q(it(),1),Sp=q(ip(),1);var J=q(it(),1);var xp=q(it(),1);var v=q(_e(),1);function yr({className:e="",size:t=24}){return(0,v.jsxs)("svg",{width:t,height:t,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:e,children:[(0,v.jsx)("path",{d:"M6 13.87A4 4 0 0 1 7.41 6a5.11 5.11 0 0 1 1.05-1.54 5 5 0 0 1 7.08 0A5.11 5.11 0 0 1 16.59 6 4 4 0 0 1 18 13.87V21H6Z"}),(0,v.jsx)("line",{x1:"6",x2:"18",y1:"17",y2:"17"})]})}function $l({className:e="",size:t=24}){return(0,v.jsxs)("svg",{width:t,height:t,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:e,children:[(0,v.jsx)("rect",{width:"18",height:"18",x:"3",y:"4",rx:"2",ry:"2"}),(0,v.jsx)("line",{x1:"16",x2:"16",y1:"2",y2:"6"}),(0,v.jsx)("line",{x1:"8",x2:"8",y1:"2",y2:"6"}),(0,v.jsx)("line",{x1:"3",x2:"21",y1:"10",y2:"10"})]})}function Re({className:e="",size:t=24}){return(0,v.jsxs)("svg",{width:t,height:t,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:e,children:[(0,v.jsx)("line",{x1:"12",x2:"12",y1:"2",y2:"22"}),(0,v.jsx)("path",{d:"M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"})]})}function zt({className:e="",size:t=24}){return(0,v.jsx)("svg",{width:t,height:t,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:e,children:(0,v.jsx)("path",{d:"M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"})})}function It({className:e="",size:t=24}){return(0,v.jsxs)("svg",{width:t,height:t,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:e,children:[(0,v.jsx)("path",{d:"M12 2a4 4 0 0 0-4 4v2a4 4 0 0 0 8 0V6a4 4 0 0 0-4-4z"}),(0,v.jsx)("path",{d:"M12 12v10"}),(0,v.jsx)("path",{d:"M8 16h8"}),(0,v.jsx)("path",{d:"M6 20h12"})]})}function xr({className:e="",size:t=24}){return(0,v.jsxs)("svg",{width:t,height:t,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:e,children:[(0,v.jsx)("circle",{cx:"8",cy:"21",r:"1"}),(0,v.jsx)("circle",{cx:"19",cy:"21",r:"1"}),(0,v.jsx)("path",{d:"M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"})]})}function Kt({className:e="",size:t=24}){return(0,v.jsxs)("svg",{width:t,height:t,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:e,children:[(0,v.jsx)("circle",{cx:"12",cy:"12",r:"10"}),(0,v.jsx)("polyline",{points:"12 6 12 12 16 14"})]})}function Ql({className:e="",size:t=24}){return(0,v.jsxs)("svg",{width:t,height:t,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:e,children:[(0,v.jsx)("path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"}),(0,v.jsx)("circle",{cx:"9",cy:"7",r:"4"}),(0,v.jsx)("path",{d:"M22 21v-2a4 4 0 0 0-3-3.87"}),(0,v.jsx)("path",{d:"M16 3.13a4 4 0 0 1 0 7.75"})]})}function cp({className:e="",size:t=24}){return(0,v.jsxs)("svg",{width:t,height:t,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:e,children:[(0,v.jsx)("path",{d:"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"}),(0,v.jsx)("path",{d:"M21 3v5h-5"}),(0,v.jsx)("path",{d:"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"}),(0,v.jsx)("path",{d:"M8 16H3v5"})]})}function xa({className:e="",size:t=24}){return(0,v.jsxs)("svg",{width:t,height:t,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:e,children:[(0,v.jsx)("path",{d:"M16 3h5v5"}),(0,v.jsx)("path",{d:"M8 3H3v5"}),(0,v.jsx)("path",{d:"M21 3l-7 7"}),(0,v.jsx)("path",{d:"M3 3l7 7"}),(0,v.jsx)("path",{d:"M16 21h5v-5"}),(0,v.jsx)("path",{d:"M8 21H3v-5"}),(0,v.jsx)("path",{d:"M21 21l-7-7"}),(0,v.jsx)("path",{d:"M3 21l7-7"})]})}function wa({className:e="",size:t=24}){return(0,v.jsxs)("svg",{width:t,height:t,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:e,children:[(0,v.jsx)("path",{d:"M15 3h6v6"}),(0,v.jsx)("path",{d:"M9 21H3v-6"}),(0,v.jsx)("path",{d:"M21 3l-7 7"}),(0,v.jsx)("path",{d:"M3 21l7-7"})]})}function Kl({className:e="",size:t=24}){return(0,v.jsxs)("svg",{width:t,height:t,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:e,children:[(0,v.jsx)("line",{x1:"18",x2:"6",y1:"6",y2:"18"}),(0,v.jsx)("line",{x1:"6",x2:"18",y1:"6",y2:"18"})]})}function pp({className:e="",size:t=24}){return(0,v.jsx)("svg",{width:t,height:t,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:e,children:(0,v.jsx)("polyline",{points:"20 6 9 17 4 12"})})}function Yl({className:e="",size:t=24}){return(0,v.jsxs)("svg",{width:t,height:t,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:e,children:[(0,v.jsx)("path",{d:"M12 2v4"}),(0,v.jsx)("path",{d:"m4.93 4.93 2.83 2.83"}),(0,v.jsx)("path",{d:"M2 12h4"}),(0,v.jsx)("path",{d:"m4.93 19.07 2.83-2.83"}),(0,v.jsx)("path",{d:"M12 18v4"}),(0,v.jsx)("path",{d:"m19.07 19.07-2.83-2.83"}),(0,v.jsx)("path",{d:"M22 12h-4"}),(0,v.jsx)("path",{d:"m19.07 4.93-2.83 2.83"}),(0,v.jsx)("circle",{cx:"12",cy:"12",r:"4"})]})}function _n({className:e="",size:t=24}){return(0,v.jsxs)("svg",{width:t,height:t,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:e,children:[(0,v.jsx)("circle",{cx:"12",cy:"12",r:"4"}),(0,v.jsx)("path",{d:"M12 2v2"}),(0,v.jsx)("path",{d:"M12 20v2"}),(0,v.jsx)("path",{d:"m4.93 4.93 1.41 1.41"}),(0,v.jsx)("path",{d:"m17.66 17.66 1.41 1.41"}),(0,v.jsx)("path",{d:"M2 12h2"}),(0,v.jsx)("path",{d:"M20 12h2"}),(0,v.jsx)("path",{d:"m6.34 17.66-1.41 1.41"}),(0,v.jsx)("path",{d:"m19.07 4.93-1.41 1.41"})]})}function Xl({className:e="",size:t=24}){return(0,v.jsx)("svg",{width:t,height:t,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:e,children:(0,v.jsx)("path",{d:"M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"})})}function Gl({className:e="",size:t=24}){return(0,v.jsxs)("svg",{width:t,height:t,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:e,children:[(0,v.jsx)("path",{d:"M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5"}),(0,v.jsx)("path",{d:"M8.5 8.5v.01"}),(0,v.jsx)("path",{d:"M16 15.5v.01"}),(0,v.jsx)("path",{d:"M12 12v.01"}),(0,v.jsx)("path",{d:"M11 17v.01"}),(0,v.jsx)("path",{d:"M7 14v.01"})]})}function Lt({className:e="",size:t=24}){return(0,v.jsxs)("svg",{width:t,height:t,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:e,children:[(0,v.jsx)("path",{d:"M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"}),(0,v.jsx)("path",{d:"M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"})]})}function wr({className:e="",size:t=24}){return(0,v.jsx)("svg",{width:t,height:t,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:e,children:(0,v.jsx)("polygon",{points:"13 2 3 14 12 14 11 22 21 10 12 10 13 2"})})}function dp({className:e="",size:t=24}){return(0,v.jsx)("svg",{width:t,height:t,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:e,children:(0,v.jsx)("path",{d:"M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"})})}function fp({className:e="",size:t=24}){return(0,v.jsx)("svg",{width:t,height:t,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:e,children:(0,v.jsx)("path",{d:"m6 9 6 6 6-6"})})}function mp({className:e="",size:t=24}){return(0,v.jsx)("svg",{width:t,height:t,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:e,children:(0,v.jsx)("path",{d:"m18 15-6-6-6 6"})})}function gp({className:e="",size:t=24}){return(0,v.jsx)("svg",{width:t,height:t,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:e,children:(0,v.jsx)("path",{d:"m15 18-6-6 6-6"})})}function hp({className:e="",size:t=24}){return(0,v.jsx)("svg",{width:t,height:t,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:e,children:(0,v.jsx)("path",{d:"m9 18 6-6-6-6"})})}function vp({className:e="",size:t=24}){return(0,v.jsx)("svg",{width:t,height:t,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:e,children:(0,v.jsx)("polygon",{points:"12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"})})}function yp({className:e="",size:t=24}){return(0,v.jsxs)("svg",{width:t,height:t,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:e,children:[(0,v.jsx)("path",{d:"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"}),(0,v.jsx)("polyline",{points:"15 3 21 3 21 9"}),(0,v.jsx)("line",{x1:"10",x2:"21",y1:"14",y2:"3"})]})}var N=q(_e(),1),qf={breakfast:Yl,lunch:_n,dinner:Xl,snack:Gl};function ka({plan:e,onOrderIngredients:t,onOpenFullPlan:n}){let{household:r,constraints:l,budget_summary:o,nutrition_summary:i,days:a}=e,[s,p]=(0,xp.useState)(0),h=l.diet.length>0?l.diet[0].charAt(0).toUpperCase()+l.diet[0].slice(1):"Balanced",f=a[s];return(0,N.jsxs)("div",{className:"cp-inline-widget",children:[(0,N.jsxs)("div",{className:"cp-inline-header",children:[(0,N.jsxs)("div",{className:"cp-inline-logo",children:[(0,N.jsx)(yr,{size:28,className:"cp-icon-green"}),(0,N.jsx)("span",{className:"cp-inline-brand",children:"ChefPlan"})]}),(0,N.jsxs)("button",{className:"cp-expand-btn",onClick:n,children:[(0,N.jsx)(wa,{size:18}),"Open Full"]})]}),(0,N.jsx)("h2",{className:"cp-inline-title",children:"Weekly meal plan"}),(0,N.jsxs)("div",{className:"cp-inline-context",children:[(0,N.jsxs)("span",{className:"cp-context-item",children:[(0,N.jsx)(Ql,{size:14}),"Family of ",r.size]}),(0,N.jsx)("span",{className:"cp-context-divider",children:"\xB7"}),(0,N.jsxs)("span",{className:"cp-context-item",children:[(0,N.jsx)(Lt,{size:14}),h]}),(0,N.jsx)("span",{className:"cp-context-divider",children:"\xB7"}),(0,N.jsxs)("span",{className:"cp-context-item",children:[(0,N.jsx)(Re,{size:14}),"Budget <$",l.budget_target]}),(0,N.jsx)("span",{className:"cp-context-divider",children:"\xB7"}),(0,N.jsxs)("span",{className:"cp-context-item",children:[(0,N.jsx)($l,{size:14}),"7 days"]})]}),(0,N.jsxs)("div",{className:"cp-inline-metrics",children:[(0,N.jsxs)("div",{className:"cp-metric",children:[(0,N.jsx)(Re,{size:18,className:"cp-icon-orange"}),(0,N.jsxs)("div",{className:"cp-metric-content",children:[(0,N.jsxs)("span",{className:"cp-metric-value",children:["$",o.estimated_total.toFixed(2)]}),(0,N.jsx)("span",{className:"cp-metric-label",children:"Est. total"})]})]}),(0,N.jsxs)("div",{className:"cp-metric",children:[(0,N.jsx)(zt,{size:18,className:"cp-icon-orange"}),(0,N.jsxs)("div",{className:"cp-metric-content",children:[(0,N.jsx)("span",{className:"cp-metric-value",children:i.avg_calories_per_day}),(0,N.jsx)("span",{className:"cp-metric-label",children:"kcal/day"})]})]}),(0,N.jsxs)("div",{className:"cp-metric",children:[(0,N.jsx)(It,{size:18,className:"cp-icon-green"}),(0,N.jsxs)("div",{className:"cp-metric-content",children:[(0,N.jsxs)("span",{className:"cp-metric-value",children:[i.avg_protein_g,"g"]}),(0,N.jsx)("span",{className:"cp-metric-label",children:"protein/day"})]})]})]}),(0,N.jsx)("div",{className:"cp-day-tabs",children:a.map((m,w)=>(0,N.jsx)("button",{className:`cp-day-tab ${s===w?"active":""}`,onClick:()=>p(w),children:m.day},m.day))}),(0,N.jsx)("div",{className:"cp-meals-grid",children:f.meals.map(m=>{let w=qf[m.type]||_n;return(0,N.jsxs)("div",{className:"cp-meal-card",children:[m.image_url?(0,N.jsxs)("div",{className:"cp-meal-image",children:[(0,N.jsx)("img",{src:m.image_url,alt:m.title}),(0,N.jsx)("span",{className:"cp-meal-type-badge",children:m.type})]}):(0,N.jsxs)("div",{className:"cp-meal-placeholder",children:[(0,N.jsx)(w,{size:24}),(0,N.jsx)("span",{className:"cp-meal-type-badge",children:m.type})]}),(0,N.jsxs)("div",{className:"cp-meal-info",children:[(0,N.jsx)("span",{className:"cp-meal-title",children:m.title}),(0,N.jsxs)("div",{className:"cp-meal-meta",children:[(0,N.jsxs)("span",{children:[(0,N.jsx)(Kt,{size:12})," ",m.prep_minutes,"m"]}),(0,N.jsxs)("span",{children:[(0,N.jsx)(zt,{size:12})," ",m.calories]}),(0,N.jsxs)("span",{children:[(0,N.jsx)(Re,{size:12})," $",m.estimated_cost.toFixed(0)]})]})]})]},m.meal_id)})}),(0,N.jsxs)("div",{className:"cp-day-stats",children:[(0,N.jsxs)("span",{children:[f.totals.calories," kcal"]}),(0,N.jsx)("span",{children:"\xB7"}),(0,N.jsxs)("span",{children:[f.totals.protein_g,"g protein"]}),(0,N.jsx)("span",{children:"\xB7"}),(0,N.jsxs)("span",{children:[f.totals.carbs_g,"g carbs"]}),(0,N.jsx)("span",{children:"\xB7"}),(0,N.jsxs)("span",{children:[f.totals.fat_g,"g fat"]})]}),(0,N.jsxs)("div",{className:"cp-inline-actions",children:[(0,N.jsxs)("button",{className:"cp-btn cp-btn-primary",onClick:n,children:[(0,N.jsx)(wa,{size:18}),"View Full Plan"]}),(0,N.jsxs)("button",{className:"cp-btn cp-btn-secondary",onClick:t,children:[(0,N.jsx)(xr,{size:18}),"Order Ingredients"]})]}),(0,N.jsx)("style",{children:`
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
      `})]})}var Zl=q(it(),1);var g=q(_e(),1),e0={breakfast:Yl,lunch:_n,dinner:Xl,snack:Gl};function Sa({plan:e,selectedRecipe:t,onClose:n,onSwapMeal:r,onRebuildWeek:l,onOrderIngredients:o,onSelectMeal:i}){let[a,s]=(0,Zl.useState)(e.days[0]?.day||"Mon"),[p,h]=(0,Zl.useState)(null),[f,m]=(0,Zl.useState)({Produce:!0,Proteins:!0,Dairy:!1,Pantry:!1,Frozen:!1}),w=e.days.find(u=>u.day===a)||e.days[0],S=u=>{h(u.meal_id),i(e.plan_id,u.meal_id)},C=u=>{m(c=>({...c,[u]:!c[u]}))},D=u=>({"high-protein":"cp-tag-green",quick:"cp-tag-orange",budget:"cp-tag-blue",healthy:"cp-tag-green",vegan:"cp-tag-emerald",vegetarian:"cp-tag-emerald","kid-friendly":"cp-tag-purple",keto:"cp-tag-amber","low-carb":"cp-tag-amber","meal-prep":"cp-tag-blue",popular:"cp-tag-pink"})[u]||"cp-tag-gray";return(0,g.jsxs)("div",{className:"cp-fullscreen",children:[(0,g.jsxs)("header",{className:"cp-fs-header",children:[(0,g.jsxs)("div",{className:"cp-fs-header-left",children:[(0,g.jsx)(yr,{size:28,className:"cp-icon-green"}),(0,g.jsxs)("div",{children:[(0,g.jsx)("h1",{className:"cp-fs-title",children:"Weekly meal plan"}),(0,g.jsxs)("p",{className:"cp-fs-subtitle",children:["Mar 16\u201322 \xB7 Family of ",e.household.size," \xB7"," ",e.constraints.diet[0]||"Balanced"," \xB7 <$",e.constraints.budget_target]})]})]}),(0,g.jsx)("button",{className:"cp-close-btn",onClick:n,children:(0,g.jsx)(Kl,{size:24})})]}),(0,g.jsxs)("div",{className:"cp-fs-metrics",children:[(0,g.jsxs)("div",{className:"cp-fs-metric",children:[(0,g.jsx)(Re,{size:20,className:"cp-icon-orange"}),(0,g.jsxs)("span",{className:"cp-fs-metric-value",children:["$",e.budget_summary.estimated_total.toFixed(2)]}),(0,g.jsx)("span",{className:"cp-fs-metric-label",children:"Budget"})]}),(0,g.jsxs)("div",{className:"cp-fs-metric",children:[(0,g.jsx)(zt,{size:20,className:"cp-icon-orange"}),(0,g.jsx)("span",{className:"cp-fs-metric-value",children:e.nutrition_summary.avg_calories_per_day}),(0,g.jsx)("span",{className:"cp-fs-metric-label",children:"Avg/day"})]}),(0,g.jsxs)("div",{className:"cp-fs-metric",children:[(0,g.jsx)(It,{size:20,className:"cp-icon-green"}),(0,g.jsxs)("span",{className:"cp-fs-metric-value",children:[e.nutrition_summary.avg_protein_g,"g"]}),(0,g.jsx)("span",{className:"cp-fs-metric-label",children:"Protein"})]}),(0,g.jsxs)("div",{className:"cp-fs-metric",children:[(0,g.jsx)(Lt,{size:20,className:"cp-icon-green"}),(0,g.jsxs)("span",{className:"cp-fs-metric-value",children:[e.nutrition_summary.avg_carbs_g,"g"]}),(0,g.jsx)("span",{className:"cp-fs-metric-label",children:"Carbs"})]})]}),(0,g.jsxs)("section",{className:"cp-fs-section",children:[(0,g.jsxs)("h2",{className:"cp-fs-section-title",children:[(0,g.jsx)($l,{size:20}),"Weekly Calendar"]}),(0,g.jsx)("div",{className:"cp-week-tabs",children:e.days.map(u=>(0,g.jsx)("button",{className:`cp-week-tab ${a===u.day?"active":""}`,onClick:()=>s(u.day),children:u.day},u.day))}),(0,g.jsxs)("div",{className:"cp-day-meals",children:[(0,g.jsxs)("div",{className:"cp-day-header",children:[(0,g.jsx)("span",{className:"cp-day-label",children:w.day}),(0,g.jsxs)("span",{className:"cp-day-stats",children:[w.totals.calories," kcal \xB7 ",w.totals.protein_g,"g protein"]})]}),w.meals.map(u=>{let c=e0[u.type]||_n,d=p===u.meal_id;return(0,g.jsxs)("div",{className:`cp-meal-card ${d?"selected":""}`,onClick:()=>S(u),children:[u.image_url?(0,g.jsx)("div",{className:"cp-meal-image",children:(0,g.jsx)("img",{src:u.image_url,alt:u.title})}):(0,g.jsx)("div",{className:"cp-meal-icon",children:(0,g.jsx)(c,{size:20})}),(0,g.jsxs)("div",{className:"cp-meal-content",children:[(0,g.jsx)("span",{className:"cp-meal-type",children:u.type}),(0,g.jsx)("span",{className:"cp-meal-title",children:u.title}),(0,g.jsxs)("div",{className:"cp-meal-meta",children:[(0,g.jsxs)("span",{children:[(0,g.jsx)(Kt,{size:12})," ",u.prep_minutes," min"]}),(0,g.jsxs)("span",{children:[(0,g.jsx)(zt,{size:12})," ",u.calories," kcal"]}),(0,g.jsxs)("span",{children:[(0,g.jsx)(Re,{size:12})," $",u.estimated_cost.toFixed(2)]})]}),u.source&&u.source!=="fallback"&&(0,g.jsxs)("span",{className:"cp-meal-source",children:["via ",u.source]})]}),(0,g.jsxs)("button",{className:"cp-swap-btn",onClick:y=>{y.stopPropagation(),r(u.meal_id)},children:[(0,g.jsx)(xa,{size:16}),"Swap"]})]},u.meal_id)})]})]}),t&&(0,g.jsxs)("section",{className:"cp-fs-section cp-recipe-section",children:[(0,g.jsxs)("h2",{className:"cp-fs-section-title",children:[(0,g.jsx)(yr,{size:20}),"Selected Meal Details"]}),(0,g.jsxs)("div",{className:"cp-recipe-card",children:[(0,g.jsxs)("div",{className:"cp-recipe-header",children:[(0,g.jsx)("h3",{className:"cp-recipe-title",children:t.title}),(0,g.jsxs)("div",{className:"cp-recipe-tags",children:[t.tags.map(u=>(0,g.jsx)("span",{className:`cp-tag ${D(u)}`,children:u.replace("-"," ")},u)),t.source&&t.source!=="fallback"&&(0,g.jsxs)("span",{className:"cp-tag cp-tag-gray",children:["via ",t.source]})]})]}),(0,g.jsxs)("div",{className:"cp-recipe-stats",children:[(0,g.jsxs)("div",{className:"cp-recipe-stat",children:[(0,g.jsx)(Kt,{size:16}),(0,g.jsxs)("span",{children:["Prep ",t.prep_minutes," min"]})]}),(0,g.jsxs)("div",{className:"cp-recipe-stat",children:[(0,g.jsx)(Ql,{size:16}),(0,g.jsxs)("span",{children:["Serves ",t.servings]})]}),(0,g.jsxs)("div",{className:"cp-recipe-stat",children:[(0,g.jsx)(Re,{size:16}),(0,g.jsxs)("span",{children:["$",t.estimated_cost.toFixed(2)," total"]})]})]}),(0,g.jsxs)("div",{className:"cp-recipe-nutrition",children:[(0,g.jsxs)("span",{children:[(0,g.jsx)(It,{size:14})," Protein"," ",t.macros.protein_g,"g"]}),(0,g.jsxs)("span",{children:[(0,g.jsx)(Lt,{size:14})," Carbs ",t.macros.carbs_g,"g"]}),(0,g.jsxs)("span",{children:[(0,g.jsx)(wr,{size:14})," Fat ",t.macros.fat_g,"g"]})]}),(0,g.jsxs)("div",{className:"cp-recipe-ingredients",children:[(0,g.jsx)("h4",{children:"Ingredients"}),(0,g.jsx)("ul",{children:t.ingredients.map((u,c)=>(0,g.jsxs)("li",{children:[u.amount," ",u.name,u.notes&&(0,g.jsxs)("span",{className:"cp-ing-note",children:[" (",u.notes,")"]})]},c))})]}),(0,g.jsxs)("div",{className:"cp-recipe-steps",children:[(0,g.jsx)("h4",{children:"Steps"}),(0,g.jsx)("ol",{children:t.instructions.map((u,c)=>(0,g.jsx)("li",{children:u},c))})]}),(0,g.jsxs)("div",{className:"cp-recipe-actions",children:[(0,g.jsxs)("button",{className:"cp-btn cp-btn-outline",onClick:()=>r(t.meal_id),children:[(0,g.jsx)(xa,{size:16}),"Replace this meal"]}),(0,g.jsxs)("button",{className:"cp-btn cp-btn-outline",children:[(0,g.jsx)(wr,{size:16}),"Make faster"]}),(0,g.jsxs)("button",{className:"cp-btn cp-btn-outline",children:[(0,g.jsx)(Re,{size:16}),"Make cheaper"]})]})]})]}),(0,g.jsxs)("section",{className:"cp-fs-section",children:[(0,g.jsxs)("h2",{className:"cp-fs-section-title",children:[(0,g.jsx)(xr,{size:20}),"Shopping List"]}),(0,g.jsx)("div",{className:"cp-shopping-list",children:e.shopping_list.map(u=>(0,g.jsxs)("div",{className:"cp-shop-section",children:[(0,g.jsxs)("button",{className:"cp-shop-header",onClick:()=>C(u.section),children:[(0,g.jsx)("span",{children:u.section}),(0,g.jsxs)("span",{className:"cp-shop-count",children:[u.items.length," items"]}),f[u.section]?(0,g.jsx)(mp,{size:18}):(0,g.jsx)(fp,{size:18})]}),f[u.section]&&(0,g.jsx)("div",{className:"cp-shop-items",children:u.items.map((c,d)=>(0,g.jsxs)("div",{className:"cp-shop-item",children:[(0,g.jsx)("span",{className:"cp-shop-item-name",children:c.name}),(0,g.jsxs)("span",{className:"cp-shop-item-qty",children:[c.quantity," ",c.unit]}),c.estimated_cost&&(0,g.jsxs)("span",{className:"cp-shop-item-cost",children:["$",c.estimated_cost.toFixed(2)]})]},d))})]},u.section))})]}),(0,g.jsxs)("div",{className:"cp-fs-actions",children:[(0,g.jsxs)("button",{className:"cp-btn cp-btn-outline",onClick:l,children:[(0,g.jsx)(cp,{size:18}),"Rebuild week"]}),(0,g.jsxs)("button",{className:"cp-btn cp-btn-primary",onClick:()=>o("instacart"),children:[(0,g.jsx)(xr,{size:18}),"Order with Instacart",(0,g.jsx)(yp,{size:14})]})]}),(0,g.jsx)("style",{children:`
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
      `})]})}var bl=q(it(),1),I=q(_e(),1);function Na({currentMeal:e,candidates:t,onReplace:n,onClose:r}){let[l,o]=(0,bl.useState)(null),i=(0,bl.useRef)(null),a=f=>{i.current&&i.current.scrollBy({left:f==="left"?-280:280,behavior:"smooth"})},s=f=>({"high-protein":It,quick:wr,budget:Re,healthy:dp,vegan:Lt,vegetarian:Lt})[f]||vp,p=f=>{let m=["high-protein","quick","budget","healthy","vegan","vegetarian"];for(let w of m)if(f.includes(w))return w;return f[0]||null},h=f=>({"high-protein":"cp-badge-green",quick:"cp-badge-orange",budget:"cp-badge-blue",healthy:"cp-badge-emerald",vegan:"cp-badge-emerald",vegetarian:"cp-badge-emerald","kid-friendly":"cp-badge-purple"})[f]||"cp-badge-gray";return(0,I.jsxs)("div",{className:"cp-swap-widget",children:[(0,I.jsxs)("div",{className:"cp-swap-header",children:[(0,I.jsxs)("div",{className:"cp-swap-title-area",children:[(0,I.jsxs)("h2",{className:"cp-swap-title",children:["Replace ",e.type]}),(0,I.jsxs)("p",{className:"cp-swap-current",children:["Current: ",(0,I.jsx)("strong",{children:e.title})]})]}),(0,I.jsx)("button",{className:"cp-swap-close",onClick:r,children:(0,I.jsx)(Kl,{size:20})})]}),(0,I.jsxs)("div",{className:"cp-swap-nav",children:[(0,I.jsx)("button",{className:"cp-nav-btn",onClick:()=>a("left"),children:(0,I.jsx)(gp,{size:20})}),(0,I.jsxs)("span",{className:"cp-nav-count",children:[t.length," alternatives"]}),(0,I.jsx)("button",{className:"cp-nav-btn",onClick:()=>a("right"),children:(0,I.jsx)(hp,{size:20})})]}),(0,I.jsx)("div",{className:"cp-swap-carousel",ref:i,children:t.map((f,m)=>{let w=p(f.tags),S=w?s(w):null,C=l===f.meal_id;return(0,I.jsxs)("div",{className:`cp-swap-card ${C?"selected":""}`,onClick:()=>o(f.meal_id),children:[(0,I.jsxs)("div",{className:"cp-match-score",children:[Math.round(f.match_score*100),"% match"]}),(0,I.jsx)("h3",{className:"cp-card-title",children:f.title}),(0,I.jsxs)("div",{className:"cp-card-stats",children:[(0,I.jsxs)("span",{className:"cp-card-stat",children:[(0,I.jsx)(Kt,{size:14}),f.prep_minutes," min"]}),(0,I.jsxs)("span",{className:"cp-card-stat",children:[(0,I.jsx)(zt,{size:14}),f.calories," kcal"]}),(0,I.jsxs)("span",{className:"cp-card-stat",children:[(0,I.jsx)(Re,{size:14}),"$",f.estimated_cost.toFixed(2)]})]}),(0,I.jsx)("div",{className:"cp-card-macros",children:(0,I.jsxs)("span",{children:[(0,I.jsx)(It,{size:12})," ",f.macros.protein_g,"g protein"]})}),w&&S&&(0,I.jsxs)("div",{className:`cp-card-badge ${h(w)}`,children:[(0,I.jsx)(S,{size:14}),w.replace("-"," ")]}),(0,I.jsx)("button",{className:`cp-replace-btn ${C?"active":""}`,onClick:D=>{D.stopPropagation(),n(f.meal_id)},children:C?(0,I.jsxs)(I.Fragment,{children:[(0,I.jsx)(pp,{size:16}),"Confirm"]}):"Replace"})]},f.meal_id)})}),(0,I.jsx)("style",{children:`
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
      `})]})}var A=q(_e(),1);function Ca(){let[e,t]=(0,J.useState)("inline"),[n,r]=(0,J.useState)(null),[l,o]=(0,J.useState)(null),[i,a]=(0,J.useState)(null),[s,p]=(0,J.useState)(!1),[h,f]=(0,J.useState)(null),[m,w]=(0,J.useState)(!1);(0,J.useEffect)(()=>{let k=G=>{if(!G||typeof G!="object")return null;let R=G;if(R.plan_id&&R.days)return R;if(R.plan&&typeof R.plan=="object"){let Yt=R.plan;if(Yt.plan_id&&Yt.days)return Yt}return R.structuredContent&&typeof R.structuredContent=="object"?k(R.structuredContent):R.content&&typeof R.content=="object"?k(R.content):R.payload&&typeof R.payload=="object"?k(R.payload):R.result&&typeof R.result=="object"?k(R.result):R.data&&typeof R.data=="object"?k(R.data):null},P=document.getElementById("chefplan-widget-root")?.getAttribute("data-plan");if(P)try{let G=atob(P),R=JSON.parse(G);if(R?.plan_id&&R?.days){r(R);return}}catch(G){console.error("[ChefPlan] Failed to parse data-plan attribute:",G)}let j=window.__chefplan_init;if(j?.plan){r(j.plan);return}if(j){let G=k(j);if(G){r(G);return}}(async()=>{if(window.openai?.toolResult){let G=k(window.openai.toolResult);if(G)return r(G),!0}if(window.openai?.getToolResult)try{let G=await window.openai.getToolResult(),R=k(G);if(R)return r(R),!0}catch(G){console.error("[ChefPlan] getToolResult failed:",G)}return!1})();let Oe=G=>{let R=G.data,Yt=k(R);Yt&&r(Yt)};window.addEventListener("message",Oe),window.parent!==window&&window.parent.postMessage({type:"mcp:ready",app:"chefplan"},"*");let Jl=setTimeout(()=>{w(!0)},8e3);return()=>{window.removeEventListener("message",Oe),clearTimeout(Jl)}},[]);let S=(0,J.useCallback)(async(k,_)=>{if(!window.openai?.callTool)return f("OpenAI bridge not available"),null;try{p(!0);let P=await window.openai.callTool(k,_);return P.structuredContent??P}catch(P){return f(P instanceof Error?P.message:"Tool call failed"),null}finally{p(!1)}},[]),C=(0,J.useCallback)(()=>{t("fullscreen")},[]),D=(0,J.useCallback)(async(k="instacart")=>{if(!n)return;let _=await S("create_order_link",{plan_id:n.plan_id,provider:k});_?.deeplink&&window.open(_.deeplink,"_blank")},[n,S]),u=(0,J.useCallback)(async k=>{if(!n)return;let _=await S("swap_meal",{plan_id:n.plan_id,meal_id:k});if(_?.candidates){let P=n.days.flatMap(j=>j.meals).find(j=>j.meal_id===k);P&&(a({meal:P,candidates:_.candidates}),t("swap"))}},[n,S]),c=(0,J.useCallback)(async k=>{if(!n||!i)return;let _=await S("swap_meal",{plan_id:n.plan_id,meal_id:i.meal.meal_id,replace_with:k});_?.updated_plan&&r(_.updated_plan),window.openai?.updateModelContext&&window.openai.updateModelContext({action:"meal_replaced",original:i.meal.title,replacement:i.candidates.find(P=>P.meal_id===k)?.title}),a(null),t("fullscreen")},[n,i,S]),d=(0,J.useCallback)(async()=>{if(!n)return;let k=await S("generate_weekly_plan",{household_size:n.household.size,dietary_preferences:n.constraints.diet,budget_target:n.constraints.budget_target,max_prep_minutes:n.constraints.max_prep_minutes});k?.plan&&r(k.plan)},[n,S]),y=(0,J.useCallback)(async(k,_)=>{let P=await S("get_recipe_details",{plan_id:k,meal_id:_});P?.recipe&&o(P.recipe)},[S]),z=(0,J.useCallback)(()=>{e==="swap"?(a(null),t("fullscreen")):(t("inline"),o(null))},[e]);return n?h?(0,A.jsxs)("div",{className:"cp-error",children:[(0,A.jsxs)("p",{children:["Error: ",h]}),(0,A.jsx)("button",{onClick:()=>{f(null)},children:"Dismiss"}),(0,A.jsx)("style",{children:`
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
        `})]}):(0,A.jsxs)(A.Fragment,{children:[s&&(0,A.jsx)("div",{className:"cp-overlay",children:(0,A.jsx)("div",{className:"cp-spinner"})}),e==="inline"&&(0,A.jsx)(ka,{plan:n,onOrderIngredients:()=>{D()},onOpenFullPlan:C}),e==="fullscreen"&&(0,A.jsx)(Sa,{plan:n,selectedRecipe:l,onClose:z,onSwapMeal:k=>{u(k)},onRebuildWeek:()=>{d()},onOrderIngredients:k=>{D(k)},onSelectMeal:(k,_)=>{y(k,_)}}),e==="swap"&&i&&(0,A.jsx)(Na,{currentMeal:i.meal,candidates:i.candidates,onReplace:k=>{c(k)},onClose:z}),(0,A.jsx)("style",{children:`
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
      `})]}):(0,A.jsxs)("div",{className:"cp-loading",children:[m?(0,A.jsxs)(A.Fragment,{children:[(0,A.jsx)("p",{className:"cp-timeout-title",children:"Unable to load meal plan"}),(0,A.jsx)("p",{className:"cp-timeout-hint",children:"The widget did not receive plan data from the host application. Please try refreshing or generating a new meal plan."})]}):(0,A.jsxs)(A.Fragment,{children:[(0,A.jsx)("div",{className:"cp-spinner"}),(0,A.jsx)("p",{children:"Loading meal plan..."})]}),(0,A.jsx)("style",{children:`
          .cp-loading {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 300px;
            font-family: 'Inter', system-ui, sans-serif;
            color: #6b7280;
            text-align: center;
            padding: 24px;
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
          .cp-timeout-title {
            font-size: 18px;
            font-weight: 600;
            color: #374151;
            margin-bottom: 8px;
          }
          .cp-timeout-hint {
            font-size: 14px;
            color: #6b7280;
            max-width: 300px;
          }
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `})]})}var _a=q(_e(),1);function wp(){let e=document.getElementById("chefplan-widget-root");e?Sp.default.createRoot(e).render((0,_a.jsx)(kp.default.StrictMode,{children:(0,_a.jsx)(Ca,{})})):console.error("ChefPlan widget root element not found")}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",wp):wp();
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
