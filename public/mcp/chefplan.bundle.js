var yp=Object.create;var ya=Object.defineProperty;var xp=Object.getOwnPropertyDescriptor;var wp=Object.getOwnPropertyNames;var kp=Object.getPrototypeOf,_p=Object.prototype.hasOwnProperty;var Ye=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var Sp=(e,t,n,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let l of wp(t))!_p.call(e,l)&&l!==n&&ya(e,l,{get:()=>t[l],enumerable:!(r=xp(t,l))||r.enumerable});return e};var J=(e,t,n)=>(n=e!=null?yp(kp(e)):{},Sp(t||!e||!e.__esModule?ya(n,"default",{value:e,enumerable:!0}):n,e));var Ia=Ye(I=>{"use strict";var kn=Symbol.for("react.element"),Np=Symbol.for("react.portal"),Cp=Symbol.for("react.fragment"),Ep=Symbol.for("react.strict_mode"),Pp=Symbol.for("react.profiler"),zp=Symbol.for("react.provider"),Lp=Symbol.for("react.context"),Ip=Symbol.for("react.forward_ref"),Mp=Symbol.for("react.suspense"),Tp=Symbol.for("react.memo"),Rp=Symbol.for("react.lazy"),xa=Symbol.iterator;function Op(e){return e===null||typeof e!="object"?null:(e=xa&&e[xa]||e["@@iterator"],typeof e=="function"?e:null)}var _a={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},Sa=Object.assign,Na={};function $t(e,t,n){this.props=e,this.context=t,this.refs=Na,this.updater=n||_a}$t.prototype.isReactComponent={};$t.prototype.setState=function(e,t){if(typeof e!="object"&&typeof e!="function"&&e!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,t,"setState")};$t.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")};function Ca(){}Ca.prototype=$t.prototype;function Yl(e,t,n){this.props=e,this.context=t,this.refs=Na,this.updater=n||_a}var Kl=Yl.prototype=new Ca;Kl.constructor=Yl;Sa(Kl,$t.prototype);Kl.isPureReactComponent=!0;var wa=Array.isArray,Ea=Object.prototype.hasOwnProperty,Gl={current:null},Pa={key:!0,ref:!0,__self:!0,__source:!0};function za(e,t,n){var r,l={},o=null,i=null;if(t!=null)for(r in t.ref!==void 0&&(i=t.ref),t.key!==void 0&&(o=""+t.key),t)Ea.call(t,r)&&!Pa.hasOwnProperty(r)&&(l[r]=t[r]);var a=arguments.length-2;if(a===1)l.children=n;else if(1<a){for(var s=Array(a),p=0;p<a;p++)s[p]=arguments[p+2];l.children=s}if(e&&e.defaultProps)for(r in a=e.defaultProps,a)l[r]===void 0&&(l[r]=a[r]);return{$$typeof:kn,type:e,key:o,ref:i,props:l,_owner:Gl.current}}function Dp(e,t){return{$$typeof:kn,type:e.type,key:t,ref:e.ref,props:e.props,_owner:e._owner}}function Xl(e){return typeof e=="object"&&e!==null&&e.$$typeof===kn}function jp(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(n){return t[n]})}var ka=/\/+/g;function Ql(e,t){return typeof e=="object"&&e!==null&&e.key!=null?jp(""+e.key):t.toString(36)}function yr(e,t,n,r,l){var o=typeof e;(o==="undefined"||o==="boolean")&&(e=null);var i=!1;if(e===null)i=!0;else switch(o){case"string":case"number":i=!0;break;case"object":switch(e.$$typeof){case kn:case Np:i=!0}}if(i)return i=e,l=l(i),e=r===""?"."+Ql(i,0):r,wa(l)?(n="",e!=null&&(n=e.replace(ka,"$&/")+"/"),yr(l,t,n,"",function(p){return p})):l!=null&&(Xl(l)&&(l=Dp(l,n+(!l.key||i&&i.key===l.key?"":(""+l.key).replace(ka,"$&/")+"/")+e)),t.push(l)),1;if(i=0,r=r===""?".":r+":",wa(e))for(var a=0;a<e.length;a++){o=e[a];var s=r+Ql(o,a);i+=yr(o,t,n,s,l)}else if(s=Op(e),typeof s=="function")for(e=s.call(e),a=0;!(o=e.next()).done;)o=o.value,s=r+Ql(o,a++),i+=yr(o,t,n,s,l);else if(o==="object")throw t=String(e),Error("Objects are not valid as a React child (found: "+(t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t)+"). If you meant to render a collection of children, use an array instead.");return i}function vr(e,t,n){if(e==null)return e;var r=[],l=0;return yr(e,r,"","",function(o){return t.call(n,o,l++)}),r}function Fp(e){if(e._status===-1){var t=e._result;t=t(),t.then(function(n){(e._status===0||e._status===-1)&&(e._status=1,e._result=n)},function(n){(e._status===0||e._status===-1)&&(e._status=2,e._result=n)}),e._status===-1&&(e._status=0,e._result=t)}if(e._status===1)return e._result.default;throw e._result}var se={current:null},xr={transition:null},Bp={ReactCurrentDispatcher:se,ReactCurrentBatchConfig:xr,ReactCurrentOwner:Gl};function La(){throw Error("act(...) is not supported in production builds of React.")}I.Children={map:vr,forEach:function(e,t,n){vr(e,function(){t.apply(this,arguments)},n)},count:function(e){var t=0;return vr(e,function(){t++}),t},toArray:function(e){return vr(e,function(t){return t})||[]},only:function(e){if(!Xl(e))throw Error("React.Children.only expected to receive a single React element child.");return e}};I.Component=$t;I.Fragment=Cp;I.Profiler=Pp;I.PureComponent=Yl;I.StrictMode=Ep;I.Suspense=Mp;I.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=Bp;I.act=La;I.cloneElement=function(e,t,n){if(e==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+e+".");var r=Sa({},e.props),l=e.key,o=e.ref,i=e._owner;if(t!=null){if(t.ref!==void 0&&(o=t.ref,i=Gl.current),t.key!==void 0&&(l=""+t.key),e.type&&e.type.defaultProps)var a=e.type.defaultProps;for(s in t)Ea.call(t,s)&&!Pa.hasOwnProperty(s)&&(r[s]=t[s]===void 0&&a!==void 0?a[s]:t[s])}var s=arguments.length-2;if(s===1)r.children=n;else if(1<s){a=Array(s);for(var p=0;p<s;p++)a[p]=arguments[p+2];r.children=a}return{$$typeof:kn,type:e.type,key:l,ref:o,props:r,_owner:i}};I.createContext=function(e){return e={$$typeof:Lp,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},e.Provider={$$typeof:zp,_context:e},e.Consumer=e};I.createElement=za;I.createFactory=function(e){var t=za.bind(null,e);return t.type=e,t};I.createRef=function(){return{current:null}};I.forwardRef=function(e){return{$$typeof:Ip,render:e}};I.isValidElement=Xl;I.lazy=function(e){return{$$typeof:Rp,_payload:{_status:-1,_result:e},_init:Fp}};I.memo=function(e,t){return{$$typeof:Tp,type:e,compare:t===void 0?null:t}};I.startTransition=function(e){var t=xr.transition;xr.transition={};try{e()}finally{xr.transition=t}};I.unstable_act=La;I.useCallback=function(e,t){return se.current.useCallback(e,t)};I.useContext=function(e){return se.current.useContext(e)};I.useDebugValue=function(){};I.useDeferredValue=function(e){return se.current.useDeferredValue(e)};I.useEffect=function(e,t){return se.current.useEffect(e,t)};I.useId=function(){return se.current.useId()};I.useImperativeHandle=function(e,t,n){return se.current.useImperativeHandle(e,t,n)};I.useInsertionEffect=function(e,t){return se.current.useInsertionEffect(e,t)};I.useLayoutEffect=function(e,t){return se.current.useLayoutEffect(e,t)};I.useMemo=function(e,t){return se.current.useMemo(e,t)};I.useReducer=function(e,t,n){return se.current.useReducer(e,t,n)};I.useRef=function(e){return se.current.useRef(e)};I.useState=function(e){return se.current.useState(e)};I.useSyncExternalStore=function(e,t,n){return se.current.useSyncExternalStore(e,t,n)};I.useTransition=function(){return se.current.useTransition()};I.version="18.3.1"});var Pt=Ye((bf,Ma)=>{"use strict";Ma.exports=Ia()});var Aa=Ye(D=>{"use strict";function Jl(e,t){var n=e.length;e.push(t);e:for(;0<n;){var r=n-1>>>1,l=e[r];if(0<wr(l,t))e[r]=t,e[n]=l,n=r;else break e}}function Me(e){return e.length===0?null:e[0]}function _r(e){if(e.length===0)return null;var t=e[0],n=e.pop();if(n!==t){e[0]=n;e:for(var r=0,l=e.length,o=l>>>1;r<o;){var i=2*(r+1)-1,a=e[i],s=i+1,p=e[s];if(0>wr(a,n))s<l&&0>wr(p,a)?(e[r]=p,e[s]=n,r=s):(e[r]=a,e[i]=n,r=i);else if(s<l&&0>wr(p,n))e[r]=p,e[s]=n,r=s;else break e}}return t}function wr(e,t){var n=e.sortIndex-t.sortIndex;return n!==0?n:e.id-t.id}typeof performance=="object"&&typeof performance.now=="function"?(Ta=performance,D.unstable_now=function(){return Ta.now()}):(Zl=Date,Ra=Zl.now(),D.unstable_now=function(){return Zl.now()-Ra});var Ta,Zl,Ra,Ue=[],lt=[],Wp=1,Ne=null,re=3,Sr=!1,zt=!1,Sn=!1,ja=typeof setTimeout=="function"?setTimeout:null,Fa=typeof clearTimeout=="function"?clearTimeout:null,Oa=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function eo(e){for(var t=Me(lt);t!==null;){if(t.callback===null)_r(lt);else if(t.startTime<=e)_r(lt),t.sortIndex=t.expirationTime,Jl(Ue,t);else break;t=Me(lt)}}function to(e){if(Sn=!1,eo(e),!zt)if(Me(Ue)!==null)zt=!0,ro(no);else{var t=Me(lt);t!==null&&lo(to,t.startTime-e)}}function no(e,t){zt=!1,Sn&&(Sn=!1,Fa(Nn),Nn=-1),Sr=!0;var n=re;try{for(eo(t),Ne=Me(Ue);Ne!==null&&(!(Ne.expirationTime>t)||e&&!Ua());){var r=Ne.callback;if(typeof r=="function"){Ne.callback=null,re=Ne.priorityLevel;var l=r(Ne.expirationTime<=t);t=D.unstable_now(),typeof l=="function"?Ne.callback=l:Ne===Me(Ue)&&_r(Ue),eo(t)}else _r(Ue);Ne=Me(Ue)}if(Ne!==null)var o=!0;else{var i=Me(lt);i!==null&&lo(to,i.startTime-t),o=!1}return o}finally{Ne=null,re=n,Sr=!1}}var Nr=!1,kr=null,Nn=-1,Ba=5,Wa=-1;function Ua(){return!(D.unstable_now()-Wa<Ba)}function ql(){if(kr!==null){var e=D.unstable_now();Wa=e;var t=!0;try{t=kr(!0,e)}finally{t?_n():(Nr=!1,kr=null)}}else Nr=!1}var _n;typeof Oa=="function"?_n=function(){Oa(ql)}:typeof MessageChannel<"u"?(bl=new MessageChannel,Da=bl.port2,bl.port1.onmessage=ql,_n=function(){Da.postMessage(null)}):_n=function(){ja(ql,0)};var bl,Da;function ro(e){kr=e,Nr||(Nr=!0,_n())}function lo(e,t){Nn=ja(function(){e(D.unstable_now())},t)}D.unstable_IdlePriority=5;D.unstable_ImmediatePriority=1;D.unstable_LowPriority=4;D.unstable_NormalPriority=3;D.unstable_Profiling=null;D.unstable_UserBlockingPriority=2;D.unstable_cancelCallback=function(e){e.callback=null};D.unstable_continueExecution=function(){zt||Sr||(zt=!0,ro(no))};D.unstable_forceFrameRate=function(e){0>e||125<e?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):Ba=0<e?Math.floor(1e3/e):5};D.unstable_getCurrentPriorityLevel=function(){return re};D.unstable_getFirstCallbackNode=function(){return Me(Ue)};D.unstable_next=function(e){switch(re){case 1:case 2:case 3:var t=3;break;default:t=re}var n=re;re=t;try{return e()}finally{re=n}};D.unstable_pauseExecution=function(){};D.unstable_requestPaint=function(){};D.unstable_runWithPriority=function(e,t){switch(e){case 1:case 2:case 3:case 4:case 5:break;default:e=3}var n=re;re=e;try{return t()}finally{re=n}};D.unstable_scheduleCallback=function(e,t,n){var r=D.unstable_now();switch(typeof n=="object"&&n!==null?(n=n.delay,n=typeof n=="number"&&0<n?r+n:r):n=r,e){case 1:var l=-1;break;case 2:l=250;break;case 5:l=1073741823;break;case 4:l=1e4;break;default:l=5e3}return l=n+l,e={id:Wp++,callback:t,priorityLevel:e,startTime:n,expirationTime:l,sortIndex:-1},n>r?(e.sortIndex=n,Jl(lt,e),Me(Ue)===null&&e===Me(lt)&&(Sn?(Fa(Nn),Nn=-1):Sn=!0,lo(to,n-r))):(e.sortIndex=l,Jl(Ue,e),zt||Sr||(zt=!0,ro(no))),e};D.unstable_shouldYield=Ua;D.unstable_wrapCallback=function(e){var t=re;return function(){var n=re;re=t;try{return e.apply(this,arguments)}finally{re=n}}}});var Ha=Ye((em,Va)=>{"use strict";Va.exports=Aa()});var Kc=Ye(_e=>{"use strict";var Up=Pt(),we=Ha();function x(e){for(var t="https://reactjs.org/docs/error-decoder.html?invariant="+e,n=1;n<arguments.length;n++)t+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var Zs=new Set,Yn={};function At(e,t){dn(e,t),dn(e+"Capture",t)}function dn(e,t){for(Yn[e]=t,e=0;e<t.length;e++)Zs.add(t[e])}var be=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),zo=Object.prototype.hasOwnProperty,Ap=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,$a={},Qa={};function Vp(e){return zo.call(Qa,e)?!0:zo.call($a,e)?!1:Ap.test(e)?Qa[e]=!0:($a[e]=!0,!1)}function Hp(e,t,n,r){if(n!==null&&n.type===0)return!1;switch(typeof t){case"function":case"symbol":return!0;case"boolean":return r?!1:n!==null?!n.acceptsBooleans:(e=e.toLowerCase().slice(0,5),e!=="data-"&&e!=="aria-");default:return!1}}function $p(e,t,n,r){if(t===null||typeof t>"u"||Hp(e,t,n,r))return!0;if(r)return!1;if(n!==null)switch(n.type){case 3:return!t;case 4:return t===!1;case 5:return isNaN(t);case 6:return isNaN(t)||1>t}return!1}function pe(e,t,n,r,l,o,i){this.acceptsBooleans=t===2||t===3||t===4,this.attributeName=r,this.attributeNamespace=l,this.mustUseProperty=n,this.propertyName=e,this.type=t,this.sanitizeURL=o,this.removeEmptyString=i}var ne={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e){ne[e]=new pe(e,0,!1,e,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(e){var t=e[0];ne[t]=new pe(t,1,!1,e[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(e){ne[e]=new pe(e,2,!1,e.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(e){ne[e]=new pe(e,2,!1,e,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e){ne[e]=new pe(e,3,!1,e.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(e){ne[e]=new pe(e,3,!0,e,null,!1,!1)});["capture","download"].forEach(function(e){ne[e]=new pe(e,4,!1,e,null,!1,!1)});["cols","rows","size","span"].forEach(function(e){ne[e]=new pe(e,6,!1,e,null,!1,!1)});["rowSpan","start"].forEach(function(e){ne[e]=new pe(e,5,!1,e.toLowerCase(),null,!1,!1)});var wi=/[\-:]([a-z])/g;function ki(e){return e[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e){var t=e.replace(wi,ki);ne[t]=new pe(t,1,!1,e,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e){var t=e.replace(wi,ki);ne[t]=new pe(t,1,!1,e,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(e){var t=e.replace(wi,ki);ne[t]=new pe(t,1,!1,e,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(e){ne[e]=new pe(e,1,!1,e.toLowerCase(),null,!1,!1)});ne.xlinkHref=new pe("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(e){ne[e]=new pe(e,1,!1,e.toLowerCase(),null,!0,!0)});function _i(e,t,n,r){var l=ne.hasOwnProperty(t)?ne[t]:null;(l!==null?l.type!==0:r||!(2<t.length)||t[0]!=="o"&&t[0]!=="O"||t[1]!=="n"&&t[1]!=="N")&&($p(t,n,l,r)&&(n=null),r||l===null?Vp(t)&&(n===null?e.removeAttribute(t):e.setAttribute(t,""+n)):l.mustUseProperty?e[l.propertyName]=n===null?l.type===3?!1:"":n:(t=l.attributeName,r=l.attributeNamespace,n===null?e.removeAttribute(t):(l=l.type,n=l===3||l===4&&n===!0?"":""+n,r?e.setAttributeNS(r,t,n):e.setAttribute(t,n))))}var nt=Up.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,Cr=Symbol.for("react.element"),Kt=Symbol.for("react.portal"),Gt=Symbol.for("react.fragment"),Si=Symbol.for("react.strict_mode"),Lo=Symbol.for("react.profiler"),qs=Symbol.for("react.provider"),bs=Symbol.for("react.context"),Ni=Symbol.for("react.forward_ref"),Io=Symbol.for("react.suspense"),Mo=Symbol.for("react.suspense_list"),Ci=Symbol.for("react.memo"),it=Symbol.for("react.lazy"),Js=Symbol.for("react.offscreen"),Ya=Symbol.iterator;function Cn(e){return e===null||typeof e!="object"?null:(e=Ya&&e[Ya]||e["@@iterator"],typeof e=="function"?e:null)}var V=Object.assign,oo;function Rn(e){if(oo===void 0)try{throw Error()}catch(n){var t=n.stack.trim().match(/\n( *(at )?)/);oo=t&&t[1]||""}return`
`+oo+e}var io=!1;function ao(e,t){if(!e||io)return"";io=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(t)if(t=function(){throw Error()},Object.defineProperty(t.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(t,[])}catch(p){var r=p}Reflect.construct(e,[],t)}else{try{t.call()}catch(p){r=p}e.call(t.prototype)}else{try{throw Error()}catch(p){r=p}e()}}catch(p){if(p&&r&&typeof p.stack=="string"){for(var l=p.stack.split(`
`),o=r.stack.split(`
`),i=l.length-1,a=o.length-1;1<=i&&0<=a&&l[i]!==o[a];)a--;for(;1<=i&&0<=a;i--,a--)if(l[i]!==o[a]){if(i!==1||a!==1)do if(i--,a--,0>a||l[i]!==o[a]){var s=`
`+l[i].replace(" at new "," at ");return e.displayName&&s.includes("<anonymous>")&&(s=s.replace("<anonymous>",e.displayName)),s}while(1<=i&&0<=a);break}}}finally{io=!1,Error.prepareStackTrace=n}return(e=e?e.displayName||e.name:"")?Rn(e):""}function Qp(e){switch(e.tag){case 5:return Rn(e.type);case 16:return Rn("Lazy");case 13:return Rn("Suspense");case 19:return Rn("SuspenseList");case 0:case 2:case 15:return e=ao(e.type,!1),e;case 11:return e=ao(e.type.render,!1),e;case 1:return e=ao(e.type,!0),e;default:return""}}function To(e){if(e==null)return null;if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case Gt:return"Fragment";case Kt:return"Portal";case Lo:return"Profiler";case Si:return"StrictMode";case Io:return"Suspense";case Mo:return"SuspenseList"}if(typeof e=="object")switch(e.$$typeof){case bs:return(e.displayName||"Context")+".Consumer";case qs:return(e._context.displayName||"Context")+".Provider";case Ni:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case Ci:return t=e.displayName||null,t!==null?t:To(e.type)||"Memo";case it:t=e._payload,e=e._init;try{return To(e(t))}catch{}}return null}function Yp(e){var t=e.type;switch(e.tag){case 24:return"Cache";case 9:return(t.displayName||"Context")+".Consumer";case 10:return(t._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return e=t.render,e=e.displayName||e.name||"",t.displayName||(e!==""?"ForwardRef("+e+")":"ForwardRef");case 7:return"Fragment";case 5:return t;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return To(t);case 8:return t===Si?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t}return null}function wt(e){switch(typeof e){case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function eu(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function Kp(e){var t=eu(e)?"checked":"value",n=Object.getOwnPropertyDescriptor(e.constructor.prototype,t),r=""+e[t];if(!e.hasOwnProperty(t)&&typeof n<"u"&&typeof n.get=="function"&&typeof n.set=="function"){var l=n.get,o=n.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return l.call(this)},set:function(i){r=""+i,o.call(this,i)}}),Object.defineProperty(e,t,{enumerable:n.enumerable}),{getValue:function(){return r},setValue:function(i){r=""+i},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function Er(e){e._valueTracker||(e._valueTracker=Kp(e))}function tu(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),r="";return e&&(r=eu(e)?e.checked?"true":"false":e.value),e=r,e!==n?(t.setValue(e),!0):!1}function el(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}function Ro(e,t){var n=t.checked;return V({},t,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:n??e._wrapperState.initialChecked})}function Ka(e,t){var n=t.defaultValue==null?"":t.defaultValue,r=t.checked!=null?t.checked:t.defaultChecked;n=wt(t.value!=null?t.value:n),e._wrapperState={initialChecked:r,initialValue:n,controlled:t.type==="checkbox"||t.type==="radio"?t.checked!=null:t.value!=null}}function nu(e,t){t=t.checked,t!=null&&_i(e,"checked",t,!1)}function Oo(e,t){nu(e,t);var n=wt(t.value),r=t.type;if(n!=null)r==="number"?(n===0&&e.value===""||e.value!=n)&&(e.value=""+n):e.value!==""+n&&(e.value=""+n);else if(r==="submit"||r==="reset"){e.removeAttribute("value");return}t.hasOwnProperty("value")?Do(e,t.type,n):t.hasOwnProperty("defaultValue")&&Do(e,t.type,wt(t.defaultValue)),t.checked==null&&t.defaultChecked!=null&&(e.defaultChecked=!!t.defaultChecked)}function Ga(e,t,n){if(t.hasOwnProperty("value")||t.hasOwnProperty("defaultValue")){var r=t.type;if(!(r!=="submit"&&r!=="reset"||t.value!==void 0&&t.value!==null))return;t=""+e._wrapperState.initialValue,n||t===e.value||(e.value=t),e.defaultValue=t}n=e.name,n!==""&&(e.name=""),e.defaultChecked=!!e._wrapperState.initialChecked,n!==""&&(e.name=n)}function Do(e,t,n){(t!=="number"||el(e.ownerDocument)!==e)&&(n==null?e.defaultValue=""+e._wrapperState.initialValue:e.defaultValue!==""+n&&(e.defaultValue=""+n))}var On=Array.isArray;function on(e,t,n,r){if(e=e.options,t){t={};for(var l=0;l<n.length;l++)t["$"+n[l]]=!0;for(n=0;n<e.length;n++)l=t.hasOwnProperty("$"+e[n].value),e[n].selected!==l&&(e[n].selected=l),l&&r&&(e[n].defaultSelected=!0)}else{for(n=""+wt(n),t=null,l=0;l<e.length;l++){if(e[l].value===n){e[l].selected=!0,r&&(e[l].defaultSelected=!0);return}t!==null||e[l].disabled||(t=e[l])}t!==null&&(t.selected=!0)}}function jo(e,t){if(t.dangerouslySetInnerHTML!=null)throw Error(x(91));return V({},t,{value:void 0,defaultValue:void 0,children:""+e._wrapperState.initialValue})}function Xa(e,t){var n=t.value;if(n==null){if(n=t.children,t=t.defaultValue,n!=null){if(t!=null)throw Error(x(92));if(On(n)){if(1<n.length)throw Error(x(93));n=n[0]}t=n}t==null&&(t=""),n=t}e._wrapperState={initialValue:wt(n)}}function ru(e,t){var n=wt(t.value),r=wt(t.defaultValue);n!=null&&(n=""+n,n!==e.value&&(e.value=n),t.defaultValue==null&&e.defaultValue!==n&&(e.defaultValue=n)),r!=null&&(e.defaultValue=""+r)}function Za(e){var t=e.textContent;t===e._wrapperState.initialValue&&t!==""&&t!==null&&(e.value=t)}function lu(e){switch(e){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function Fo(e,t){return e==null||e==="http://www.w3.org/1999/xhtml"?lu(t):e==="http://www.w3.org/2000/svg"&&t==="foreignObject"?"http://www.w3.org/1999/xhtml":e}var Pr,ou=(function(e){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(t,n,r,l){MSApp.execUnsafeLocalFunction(function(){return e(t,n,r,l)})}:e})(function(e,t){if(e.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in e)e.innerHTML=t;else{for(Pr=Pr||document.createElement("div"),Pr.innerHTML="<svg>"+t.valueOf().toString()+"</svg>",t=Pr.firstChild;e.firstChild;)e.removeChild(e.firstChild);for(;t.firstChild;)e.appendChild(t.firstChild)}});function Kn(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&n.nodeType===3){n.nodeValue=t;return}}e.textContent=t}var Fn={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},Gp=["Webkit","ms","Moz","O"];Object.keys(Fn).forEach(function(e){Gp.forEach(function(t){t=t+e.charAt(0).toUpperCase()+e.substring(1),Fn[t]=Fn[e]})});function iu(e,t,n){return t==null||typeof t=="boolean"||t===""?"":n||typeof t!="number"||t===0||Fn.hasOwnProperty(e)&&Fn[e]?(""+t).trim():t+"px"}function au(e,t){e=e.style;for(var n in t)if(t.hasOwnProperty(n)){var r=n.indexOf("--")===0,l=iu(n,t[n],r);n==="float"&&(n="cssFloat"),r?e.setProperty(n,l):e[n]=l}}var Xp=V({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function Bo(e,t){if(t){if(Xp[e]&&(t.children!=null||t.dangerouslySetInnerHTML!=null))throw Error(x(137,e));if(t.dangerouslySetInnerHTML!=null){if(t.children!=null)throw Error(x(60));if(typeof t.dangerouslySetInnerHTML!="object"||!("__html"in t.dangerouslySetInnerHTML))throw Error(x(61))}if(t.style!=null&&typeof t.style!="object")throw Error(x(62))}}function Wo(e,t){if(e.indexOf("-")===-1)return typeof t.is=="string";switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Uo=null;function Ei(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var Ao=null,an=null,sn=null;function qa(e){if(e=pr(e)){if(typeof Ao!="function")throw Error(x(280));var t=e.stateNode;t&&(t=zl(t),Ao(e.stateNode,e.type,t))}}function su(e){an?sn?sn.push(e):sn=[e]:an=e}function uu(){if(an){var e=an,t=sn;if(sn=an=null,qa(e),t)for(e=0;e<t.length;e++)qa(t[e])}}function cu(e,t){return e(t)}function pu(){}var so=!1;function du(e,t,n){if(so)return e(t,n);so=!0;try{return cu(e,t,n)}finally{so=!1,(an!==null||sn!==null)&&(pu(),uu())}}function Gn(e,t){var n=e.stateNode;if(n===null)return null;var r=zl(n);if(r===null)return null;n=r[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(r=!r.disabled)||(e=e.type,r=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!r;break e;default:e=!1}if(e)return null;if(n&&typeof n!="function")throw Error(x(231,t,typeof n));return n}var Vo=!1;if(be)try{Qt={},Object.defineProperty(Qt,"passive",{get:function(){Vo=!0}}),window.addEventListener("test",Qt,Qt),window.removeEventListener("test",Qt,Qt)}catch{Vo=!1}var Qt;function Zp(e,t,n,r,l,o,i,a,s){var p=Array.prototype.slice.call(arguments,3);try{t.apply(n,p)}catch(v){this.onError(v)}}var Bn=!1,tl=null,nl=!1,Ho=null,qp={onError:function(e){Bn=!0,tl=e}};function bp(e,t,n,r,l,o,i,a,s){Bn=!1,tl=null,Zp.apply(qp,arguments)}function Jp(e,t,n,r,l,o,i,a,s){if(bp.apply(this,arguments),Bn){if(Bn){var p=tl;Bn=!1,tl=null}else throw Error(x(198));nl||(nl=!0,Ho=p)}}function Vt(e){var t=e,n=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,(t.flags&4098)!==0&&(n=t.return),e=t.return;while(e)}return t.tag===3?n:null}function fu(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function ba(e){if(Vt(e)!==e)throw Error(x(188))}function ed(e){var t=e.alternate;if(!t){if(t=Vt(e),t===null)throw Error(x(188));return t!==e?null:e}for(var n=e,r=t;;){var l=n.return;if(l===null)break;var o=l.alternate;if(o===null){if(r=l.return,r!==null){n=r;continue}break}if(l.child===o.child){for(o=l.child;o;){if(o===n)return ba(l),e;if(o===r)return ba(l),t;o=o.sibling}throw Error(x(188))}if(n.return!==r.return)n=l,r=o;else{for(var i=!1,a=l.child;a;){if(a===n){i=!0,n=l,r=o;break}if(a===r){i=!0,r=l,n=o;break}a=a.sibling}if(!i){for(a=o.child;a;){if(a===n){i=!0,n=o,r=l;break}if(a===r){i=!0,r=o,n=l;break}a=a.sibling}if(!i)throw Error(x(189))}}if(n.alternate!==r)throw Error(x(190))}if(n.tag!==3)throw Error(x(188));return n.stateNode.current===n?e:t}function mu(e){return e=ed(e),e!==null?gu(e):null}function gu(e){if(e.tag===5||e.tag===6)return e;for(e=e.child;e!==null;){var t=gu(e);if(t!==null)return t;e=e.sibling}return null}var hu=we.unstable_scheduleCallback,Ja=we.unstable_cancelCallback,td=we.unstable_shouldYield,nd=we.unstable_requestPaint,$=we.unstable_now,rd=we.unstable_getCurrentPriorityLevel,Pi=we.unstable_ImmediatePriority,vu=we.unstable_UserBlockingPriority,rl=we.unstable_NormalPriority,ld=we.unstable_LowPriority,yu=we.unstable_IdlePriority,Nl=null,$e=null;function od(e){if($e&&typeof $e.onCommitFiberRoot=="function")try{$e.onCommitFiberRoot(Nl,e,void 0,(e.current.flags&128)===128)}catch{}}var je=Math.clz32?Math.clz32:sd,id=Math.log,ad=Math.LN2;function sd(e){return e>>>=0,e===0?32:31-(id(e)/ad|0)|0}var zr=64,Lr=4194304;function Dn(e){switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return e&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return e}}function ll(e,t){var n=e.pendingLanes;if(n===0)return 0;var r=0,l=e.suspendedLanes,o=e.pingedLanes,i=n&268435455;if(i!==0){var a=i&~l;a!==0?r=Dn(a):(o&=i,o!==0&&(r=Dn(o)))}else i=n&~l,i!==0?r=Dn(i):o!==0&&(r=Dn(o));if(r===0)return 0;if(t!==0&&t!==r&&(t&l)===0&&(l=r&-r,o=t&-t,l>=o||l===16&&(o&4194240)!==0))return t;if((r&4)!==0&&(r|=n&16),t=e.entangledLanes,t!==0)for(e=e.entanglements,t&=r;0<t;)n=31-je(t),l=1<<n,r|=e[n],t&=~l;return r}function ud(e,t){switch(e){case 1:case 2:case 4:return t+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function cd(e,t){for(var n=e.suspendedLanes,r=e.pingedLanes,l=e.expirationTimes,o=e.pendingLanes;0<o;){var i=31-je(o),a=1<<i,s=l[i];s===-1?((a&n)===0||(a&r)!==0)&&(l[i]=ud(a,t)):s<=t&&(e.expiredLanes|=a),o&=~a}}function $o(e){return e=e.pendingLanes&-1073741825,e!==0?e:e&1073741824?1073741824:0}function xu(){var e=zr;return zr<<=1,(zr&4194240)===0&&(zr=64),e}function uo(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function ur(e,t,n){e.pendingLanes|=t,t!==536870912&&(e.suspendedLanes=0,e.pingedLanes=0),e=e.eventTimes,t=31-je(t),e[t]=n}function pd(e,t){var n=e.pendingLanes&~t;e.pendingLanes=t,e.suspendedLanes=0,e.pingedLanes=0,e.expiredLanes&=t,e.mutableReadLanes&=t,e.entangledLanes&=t,t=e.entanglements;var r=e.eventTimes;for(e=e.expirationTimes;0<n;){var l=31-je(n),o=1<<l;t[l]=0,r[l]=-1,e[l]=-1,n&=~o}}function zi(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){var r=31-je(n),l=1<<r;l&t|e[r]&t&&(e[r]|=t),n&=~l}}var R=0;function wu(e){return e&=-e,1<e?4<e?(e&268435455)!==0?16:536870912:4:1}var ku,Li,_u,Su,Nu,Qo=!1,Ir=[],dt=null,ft=null,mt=null,Xn=new Map,Zn=new Map,st=[],dd="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function es(e,t){switch(e){case"focusin":case"focusout":dt=null;break;case"dragenter":case"dragleave":ft=null;break;case"mouseover":case"mouseout":mt=null;break;case"pointerover":case"pointerout":Xn.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":Zn.delete(t.pointerId)}}function En(e,t,n,r,l,o){return e===null||e.nativeEvent!==o?(e={blockedOn:t,domEventName:n,eventSystemFlags:r,nativeEvent:o,targetContainers:[l]},t!==null&&(t=pr(t),t!==null&&Li(t)),e):(e.eventSystemFlags|=r,t=e.targetContainers,l!==null&&t.indexOf(l)===-1&&t.push(l),e)}function fd(e,t,n,r,l){switch(t){case"focusin":return dt=En(dt,e,t,n,r,l),!0;case"dragenter":return ft=En(ft,e,t,n,r,l),!0;case"mouseover":return mt=En(mt,e,t,n,r,l),!0;case"pointerover":var o=l.pointerId;return Xn.set(o,En(Xn.get(o)||null,e,t,n,r,l)),!0;case"gotpointercapture":return o=l.pointerId,Zn.set(o,En(Zn.get(o)||null,e,t,n,r,l)),!0}return!1}function Cu(e){var t=Mt(e.target);if(t!==null){var n=Vt(t);if(n!==null){if(t=n.tag,t===13){if(t=fu(n),t!==null){e.blockedOn=t,Nu(e.priority,function(){_u(n)});return}}else if(t===3&&n.stateNode.current.memoizedState.isDehydrated){e.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}e.blockedOn=null}function $r(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var n=Yo(e.domEventName,e.eventSystemFlags,t[0],e.nativeEvent);if(n===null){n=e.nativeEvent;var r=new n.constructor(n.type,n);Uo=r,n.target.dispatchEvent(r),Uo=null}else return t=pr(n),t!==null&&Li(t),e.blockedOn=n,!1;t.shift()}return!0}function ts(e,t,n){$r(e)&&n.delete(t)}function md(){Qo=!1,dt!==null&&$r(dt)&&(dt=null),ft!==null&&$r(ft)&&(ft=null),mt!==null&&$r(mt)&&(mt=null),Xn.forEach(ts),Zn.forEach(ts)}function Pn(e,t){e.blockedOn===t&&(e.blockedOn=null,Qo||(Qo=!0,we.unstable_scheduleCallback(we.unstable_NormalPriority,md)))}function qn(e){function t(l){return Pn(l,e)}if(0<Ir.length){Pn(Ir[0],e);for(var n=1;n<Ir.length;n++){var r=Ir[n];r.blockedOn===e&&(r.blockedOn=null)}}for(dt!==null&&Pn(dt,e),ft!==null&&Pn(ft,e),mt!==null&&Pn(mt,e),Xn.forEach(t),Zn.forEach(t),n=0;n<st.length;n++)r=st[n],r.blockedOn===e&&(r.blockedOn=null);for(;0<st.length&&(n=st[0],n.blockedOn===null);)Cu(n),n.blockedOn===null&&st.shift()}var un=nt.ReactCurrentBatchConfig,ol=!0;function gd(e,t,n,r){var l=R,o=un.transition;un.transition=null;try{R=1,Ii(e,t,n,r)}finally{R=l,un.transition=o}}function hd(e,t,n,r){var l=R,o=un.transition;un.transition=null;try{R=4,Ii(e,t,n,r)}finally{R=l,un.transition=o}}function Ii(e,t,n,r){if(ol){var l=Yo(e,t,n,r);if(l===null)vo(e,t,r,il,n),es(e,r);else if(fd(l,e,t,n,r))r.stopPropagation();else if(es(e,r),t&4&&-1<dd.indexOf(e)){for(;l!==null;){var o=pr(l);if(o!==null&&ku(o),o=Yo(e,t,n,r),o===null&&vo(e,t,r,il,n),o===l)break;l=o}l!==null&&r.stopPropagation()}else vo(e,t,r,null,n)}}var il=null;function Yo(e,t,n,r){if(il=null,e=Ei(r),e=Mt(e),e!==null)if(t=Vt(e),t===null)e=null;else if(n=t.tag,n===13){if(e=fu(t),e!==null)return e;e=null}else if(n===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null);return il=e,null}function Eu(e){switch(e){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(rd()){case Pi:return 1;case vu:return 4;case rl:case ld:return 16;case yu:return 536870912;default:return 16}default:return 16}}var ct=null,Mi=null,Qr=null;function Pu(){if(Qr)return Qr;var e,t=Mi,n=t.length,r,l="value"in ct?ct.value:ct.textContent,o=l.length;for(e=0;e<n&&t[e]===l[e];e++);var i=n-e;for(r=1;r<=i&&t[n-r]===l[o-r];r++);return Qr=l.slice(e,1<r?1-r:void 0)}function Yr(e){var t=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function Mr(){return!0}function ns(){return!1}function ke(e){function t(n,r,l,o,i){this._reactName=n,this._targetInst=l,this.type=r,this.nativeEvent=o,this.target=i,this.currentTarget=null;for(var a in e)e.hasOwnProperty(a)&&(n=e[a],this[a]=n?n(o):o[a]);return this.isDefaultPrevented=(o.defaultPrevented!=null?o.defaultPrevented:o.returnValue===!1)?Mr:ns,this.isPropagationStopped=ns,this}return V(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=Mr)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=Mr)},persist:function(){},isPersistent:Mr}),t}var xn={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Ti=ke(xn),cr=V({},xn,{view:0,detail:0}),vd=ke(cr),co,po,zn,Cl=V({},cr,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Ri,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==zn&&(zn&&e.type==="mousemove"?(co=e.screenX-zn.screenX,po=e.screenY-zn.screenY):po=co=0,zn=e),co)},movementY:function(e){return"movementY"in e?e.movementY:po}}),rs=ke(Cl),yd=V({},Cl,{dataTransfer:0}),xd=ke(yd),wd=V({},cr,{relatedTarget:0}),fo=ke(wd),kd=V({},xn,{animationName:0,elapsedTime:0,pseudoElement:0}),_d=ke(kd),Sd=V({},xn,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),Nd=ke(Sd),Cd=V({},xn,{data:0}),ls=ke(Cd),Ed={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},Pd={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},zd={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function Ld(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=zd[e])?!!t[e]:!1}function Ri(){return Ld}var Id=V({},cr,{key:function(e){if(e.key){var t=Ed[e.key]||e.key;if(t!=="Unidentified")return t}return e.type==="keypress"?(e=Yr(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?Pd[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Ri,charCode:function(e){return e.type==="keypress"?Yr(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?Yr(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),Md=ke(Id),Td=V({},Cl,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),os=ke(Td),Rd=V({},cr,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Ri}),Od=ke(Rd),Dd=V({},xn,{propertyName:0,elapsedTime:0,pseudoElement:0}),jd=ke(Dd),Fd=V({},Cl,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),Bd=ke(Fd),Wd=[9,13,27,32],Oi=be&&"CompositionEvent"in window,Wn=null;be&&"documentMode"in document&&(Wn=document.documentMode);var Ud=be&&"TextEvent"in window&&!Wn,zu=be&&(!Oi||Wn&&8<Wn&&11>=Wn),is=" ",as=!1;function Lu(e,t){switch(e){case"keyup":return Wd.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Iu(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var Xt=!1;function Ad(e,t){switch(e){case"compositionend":return Iu(t);case"keypress":return t.which!==32?null:(as=!0,is);case"textInput":return e=t.data,e===is&&as?null:e;default:return null}}function Vd(e,t){if(Xt)return e==="compositionend"||!Oi&&Lu(e,t)?(e=Pu(),Qr=Mi=ct=null,Xt=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return zu&&t.locale!=="ko"?null:t.data;default:return null}}var Hd={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function ss(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!Hd[e.type]:t==="textarea"}function Mu(e,t,n,r){su(r),t=al(t,"onChange"),0<t.length&&(n=new Ti("onChange","change",null,n,r),e.push({event:n,listeners:t}))}var Un=null,bn=null;function $d(e){Vu(e,0)}function El(e){var t=bt(e);if(tu(t))return e}function Qd(e,t){if(e==="change")return t}var Tu=!1;be&&(be?(Rr="oninput"in document,Rr||(mo=document.createElement("div"),mo.setAttribute("oninput","return;"),Rr=typeof mo.oninput=="function"),Tr=Rr):Tr=!1,Tu=Tr&&(!document.documentMode||9<document.documentMode));var Tr,Rr,mo;function us(){Un&&(Un.detachEvent("onpropertychange",Ru),bn=Un=null)}function Ru(e){if(e.propertyName==="value"&&El(bn)){var t=[];Mu(t,bn,e,Ei(e)),du($d,t)}}function Yd(e,t,n){e==="focusin"?(us(),Un=t,bn=n,Un.attachEvent("onpropertychange",Ru)):e==="focusout"&&us()}function Kd(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return El(bn)}function Gd(e,t){if(e==="click")return El(t)}function Xd(e,t){if(e==="input"||e==="change")return El(t)}function Zd(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var Be=typeof Object.is=="function"?Object.is:Zd;function Jn(e,t){if(Be(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var n=Object.keys(e),r=Object.keys(t);if(n.length!==r.length)return!1;for(r=0;r<n.length;r++){var l=n[r];if(!zo.call(t,l)||!Be(e[l],t[l]))return!1}return!0}function cs(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function ps(e,t){var n=cs(e);e=0;for(var r;n;){if(n.nodeType===3){if(r=e+n.textContent.length,e<=t&&r>=t)return{node:n,offset:t-e};e=r}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=cs(n)}}function Ou(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?Ou(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function Du(){for(var e=window,t=el();t instanceof e.HTMLIFrameElement;){try{var n=typeof t.contentWindow.location.href=="string"}catch{n=!1}if(n)e=t.contentWindow;else break;t=el(e.document)}return t}function Di(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}function qd(e){var t=Du(),n=e.focusedElem,r=e.selectionRange;if(t!==n&&n&&n.ownerDocument&&Ou(n.ownerDocument.documentElement,n)){if(r!==null&&Di(n)){if(t=r.start,e=r.end,e===void 0&&(e=t),"selectionStart"in n)n.selectionStart=t,n.selectionEnd=Math.min(e,n.value.length);else if(e=(t=n.ownerDocument||document)&&t.defaultView||window,e.getSelection){e=e.getSelection();var l=n.textContent.length,o=Math.min(r.start,l);r=r.end===void 0?o:Math.min(r.end,l),!e.extend&&o>r&&(l=r,r=o,o=l),l=ps(n,o);var i=ps(n,r);l&&i&&(e.rangeCount!==1||e.anchorNode!==l.node||e.anchorOffset!==l.offset||e.focusNode!==i.node||e.focusOffset!==i.offset)&&(t=t.createRange(),t.setStart(l.node,l.offset),e.removeAllRanges(),o>r?(e.addRange(t),e.extend(i.node,i.offset)):(t.setEnd(i.node,i.offset),e.addRange(t)))}}for(t=[],e=n;e=e.parentNode;)e.nodeType===1&&t.push({element:e,left:e.scrollLeft,top:e.scrollTop});for(typeof n.focus=="function"&&n.focus(),n=0;n<t.length;n++)e=t[n],e.element.scrollLeft=e.left,e.element.scrollTop=e.top}}var bd=be&&"documentMode"in document&&11>=document.documentMode,Zt=null,Ko=null,An=null,Go=!1;function ds(e,t,n){var r=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;Go||Zt==null||Zt!==el(r)||(r=Zt,"selectionStart"in r&&Di(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),An&&Jn(An,r)||(An=r,r=al(Ko,"onSelect"),0<r.length&&(t=new Ti("onSelect","select",null,t,n),e.push({event:t,listeners:r}),t.target=Zt)))}function Or(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n["Webkit"+e]="webkit"+t,n["Moz"+e]="moz"+t,n}var qt={animationend:Or("Animation","AnimationEnd"),animationiteration:Or("Animation","AnimationIteration"),animationstart:Or("Animation","AnimationStart"),transitionend:Or("Transition","TransitionEnd")},go={},ju={};be&&(ju=document.createElement("div").style,"AnimationEvent"in window||(delete qt.animationend.animation,delete qt.animationiteration.animation,delete qt.animationstart.animation),"TransitionEvent"in window||delete qt.transitionend.transition);function Pl(e){if(go[e])return go[e];if(!qt[e])return e;var t=qt[e],n;for(n in t)if(t.hasOwnProperty(n)&&n in ju)return go[e]=t[n];return e}var Fu=Pl("animationend"),Bu=Pl("animationiteration"),Wu=Pl("animationstart"),Uu=Pl("transitionend"),Au=new Map,fs="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function _t(e,t){Au.set(e,t),At(t,[e])}for(Dr=0;Dr<fs.length;Dr++)jr=fs[Dr],ms=jr.toLowerCase(),gs=jr[0].toUpperCase()+jr.slice(1),_t(ms,"on"+gs);var jr,ms,gs,Dr;_t(Fu,"onAnimationEnd");_t(Bu,"onAnimationIteration");_t(Wu,"onAnimationStart");_t("dblclick","onDoubleClick");_t("focusin","onFocus");_t("focusout","onBlur");_t(Uu,"onTransitionEnd");dn("onMouseEnter",["mouseout","mouseover"]);dn("onMouseLeave",["mouseout","mouseover"]);dn("onPointerEnter",["pointerout","pointerover"]);dn("onPointerLeave",["pointerout","pointerover"]);At("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));At("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));At("onBeforeInput",["compositionend","keypress","textInput","paste"]);At("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));At("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));At("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var jn="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),Jd=new Set("cancel close invalid load scroll toggle".split(" ").concat(jn));function hs(e,t,n){var r=e.type||"unknown-event";e.currentTarget=n,Jp(r,t,void 0,e),e.currentTarget=null}function Vu(e,t){t=(t&4)!==0;for(var n=0;n<e.length;n++){var r=e[n],l=r.event;r=r.listeners;e:{var o=void 0;if(t)for(var i=r.length-1;0<=i;i--){var a=r[i],s=a.instance,p=a.currentTarget;if(a=a.listener,s!==o&&l.isPropagationStopped())break e;hs(l,a,p),o=s}else for(i=0;i<r.length;i++){if(a=r[i],s=a.instance,p=a.currentTarget,a=a.listener,s!==o&&l.isPropagationStopped())break e;hs(l,a,p),o=s}}}if(nl)throw e=Ho,nl=!1,Ho=null,e}function F(e,t){var n=t[Jo];n===void 0&&(n=t[Jo]=new Set);var r=e+"__bubble";n.has(r)||(Hu(t,e,2,!1),n.add(r))}function ho(e,t,n){var r=0;t&&(r|=4),Hu(n,e,r,t)}var Fr="_reactListening"+Math.random().toString(36).slice(2);function er(e){if(!e[Fr]){e[Fr]=!0,Zs.forEach(function(n){n!=="selectionchange"&&(Jd.has(n)||ho(n,!1,e),ho(n,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[Fr]||(t[Fr]=!0,ho("selectionchange",!1,t))}}function Hu(e,t,n,r){switch(Eu(t)){case 1:var l=gd;break;case 4:l=hd;break;default:l=Ii}n=l.bind(null,t,n,e),l=void 0,!Vo||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(l=!0),r?l!==void 0?e.addEventListener(t,n,{capture:!0,passive:l}):e.addEventListener(t,n,!0):l!==void 0?e.addEventListener(t,n,{passive:l}):e.addEventListener(t,n,!1)}function vo(e,t,n,r,l){var o=r;if((t&1)===0&&(t&2)===0&&r!==null)e:for(;;){if(r===null)return;var i=r.tag;if(i===3||i===4){var a=r.stateNode.containerInfo;if(a===l||a.nodeType===8&&a.parentNode===l)break;if(i===4)for(i=r.return;i!==null;){var s=i.tag;if((s===3||s===4)&&(s=i.stateNode.containerInfo,s===l||s.nodeType===8&&s.parentNode===l))return;i=i.return}for(;a!==null;){if(i=Mt(a),i===null)return;if(s=i.tag,s===5||s===6){r=o=i;continue e}a=a.parentNode}}r=r.return}du(function(){var p=o,v=Ei(n),f=[];e:{var m=Au.get(e);if(m!==void 0){var w=Ti,_=e;switch(e){case"keypress":if(Yr(n)===0)break e;case"keydown":case"keyup":w=Md;break;case"focusin":_="focus",w=fo;break;case"focusout":_="blur",w=fo;break;case"beforeblur":case"afterblur":w=fo;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":w=rs;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":w=xd;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":w=Od;break;case Fu:case Bu:case Wu:w=_d;break;case Uu:w=jd;break;case"scroll":w=vd;break;case"wheel":w=Bd;break;case"copy":case"cut":case"paste":w=Nd;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":w=os}var N=(t&4)!==0,O=!N&&e==="scroll",u=N?m!==null?m+"Capture":null:m;N=[];for(var c=p,d;c!==null;){d=c;var h=d.stateNode;if(d.tag===5&&h!==null&&(d=h,u!==null&&(h=Gn(c,u),h!=null&&N.push(tr(c,h,d)))),O)break;c=c.return}0<N.length&&(m=new w(m,_,null,n,v),f.push({event:m,listeners:N}))}}if((t&7)===0){e:{if(m=e==="mouseover"||e==="pointerover",w=e==="mouseout"||e==="pointerout",m&&n!==Uo&&(_=n.relatedTarget||n.fromElement)&&(Mt(_)||_[Je]))break e;if((w||m)&&(m=v.window===v?v:(m=v.ownerDocument)?m.defaultView||m.parentWindow:window,w?(_=n.relatedTarget||n.toElement,w=p,_=_?Mt(_):null,_!==null&&(O=Vt(_),_!==O||_.tag!==5&&_.tag!==6)&&(_=null)):(w=null,_=p),w!==_)){if(N=rs,h="onMouseLeave",u="onMouseEnter",c="mouse",(e==="pointerout"||e==="pointerover")&&(N=os,h="onPointerLeave",u="onPointerEnter",c="pointer"),O=w==null?m:bt(w),d=_==null?m:bt(_),m=new N(h,c+"leave",w,n,v),m.target=O,m.relatedTarget=d,h=null,Mt(v)===p&&(N=new N(u,c+"enter",_,n,v),N.target=d,N.relatedTarget=O,h=N),O=h,w&&_)t:{for(N=w,u=_,c=0,d=N;d;d=Yt(d))c++;for(d=0,h=u;h;h=Yt(h))d++;for(;0<c-d;)N=Yt(N),c--;for(;0<d-c;)u=Yt(u),d--;for(;c--;){if(N===u||u!==null&&N===u.alternate)break t;N=Yt(N),u=Yt(u)}N=null}else N=null;w!==null&&vs(f,m,w,N,!1),_!==null&&O!==null&&vs(f,O,_,N,!0)}}e:{if(m=p?bt(p):window,w=m.nodeName&&m.nodeName.toLowerCase(),w==="select"||w==="input"&&m.type==="file")var k=Qd;else if(ss(m))if(Tu)k=Xd;else{k=Kd;var C=Yd}else(w=m.nodeName)&&w.toLowerCase()==="input"&&(m.type==="checkbox"||m.type==="radio")&&(k=Gd);if(k&&(k=k(e,p))){Mu(f,k,n,v);break e}C&&C(e,m,p),e==="focusout"&&(C=m._wrapperState)&&C.controlled&&m.type==="number"&&Do(m,"number",m.value)}switch(C=p?bt(p):window,e){case"focusin":(ss(C)||C.contentEditable==="true")&&(Zt=C,Ko=p,An=null);break;case"focusout":An=Ko=Zt=null;break;case"mousedown":Go=!0;break;case"contextmenu":case"mouseup":case"dragend":Go=!1,ds(f,n,v);break;case"selectionchange":if(bd)break;case"keydown":case"keyup":ds(f,n,v)}var S;if(Oi)e:{switch(e){case"compositionstart":var P="onCompositionStart";break e;case"compositionend":P="onCompositionEnd";break e;case"compositionupdate":P="onCompositionUpdate";break e}P=void 0}else Xt?Lu(e,n)&&(P="onCompositionEnd"):e==="keydown"&&n.keyCode===229&&(P="onCompositionStart");P&&(zu&&n.locale!=="ko"&&(Xt||P!=="onCompositionStart"?P==="onCompositionEnd"&&Xt&&(S=Pu()):(ct=v,Mi="value"in ct?ct.value:ct.textContent,Xt=!0)),C=al(p,P),0<C.length&&(P=new ls(P,e,null,n,v),f.push({event:P,listeners:C}),S?P.data=S:(S=Iu(n),S!==null&&(P.data=S)))),(S=Ud?Ad(e,n):Vd(e,n))&&(p=al(p,"onBeforeInput"),0<p.length&&(v=new ls("onBeforeInput","beforeinput",null,n,v),f.push({event:v,listeners:p}),v.data=S))}Vu(f,t)})}function tr(e,t,n){return{instance:e,listener:t,currentTarget:n}}function al(e,t){for(var n=t+"Capture",r=[];e!==null;){var l=e,o=l.stateNode;l.tag===5&&o!==null&&(l=o,o=Gn(e,n),o!=null&&r.unshift(tr(e,o,l)),o=Gn(e,t),o!=null&&r.push(tr(e,o,l))),e=e.return}return r}function Yt(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5);return e||null}function vs(e,t,n,r,l){for(var o=t._reactName,i=[];n!==null&&n!==r;){var a=n,s=a.alternate,p=a.stateNode;if(s!==null&&s===r)break;a.tag===5&&p!==null&&(a=p,l?(s=Gn(n,o),s!=null&&i.unshift(tr(n,s,a))):l||(s=Gn(n,o),s!=null&&i.push(tr(n,s,a)))),n=n.return}i.length!==0&&e.push({event:t,listeners:i})}var ef=/\r\n?/g,tf=/\u0000|\uFFFD/g;function ys(e){return(typeof e=="string"?e:""+e).replace(ef,`
`).replace(tf,"")}function Br(e,t,n){if(t=ys(t),ys(e)!==t&&n)throw Error(x(425))}function sl(){}var Xo=null,Zo=null;function qo(e,t){return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var bo=typeof setTimeout=="function"?setTimeout:void 0,nf=typeof clearTimeout=="function"?clearTimeout:void 0,xs=typeof Promise=="function"?Promise:void 0,rf=typeof queueMicrotask=="function"?queueMicrotask:typeof xs<"u"?function(e){return xs.resolve(null).then(e).catch(lf)}:bo;function lf(e){setTimeout(function(){throw e})}function yo(e,t){var n=t,r=0;do{var l=n.nextSibling;if(e.removeChild(n),l&&l.nodeType===8)if(n=l.data,n==="/$"){if(r===0){e.removeChild(l),qn(t);return}r--}else n!=="$"&&n!=="$?"&&n!=="$!"||r++;n=l}while(n);qn(t)}function gt(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t==="$"||t==="$!"||t==="$?")break;if(t==="/$")return null}}return e}function ws(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="$"||n==="$!"||n==="$?"){if(t===0)return e;t--}else n==="/$"&&t++}e=e.previousSibling}return null}var wn=Math.random().toString(36).slice(2),He="__reactFiber$"+wn,nr="__reactProps$"+wn,Je="__reactContainer$"+wn,Jo="__reactEvents$"+wn,of="__reactListeners$"+wn,af="__reactHandles$"+wn;function Mt(e){var t=e[He];if(t)return t;for(var n=e.parentNode;n;){if(t=n[Je]||n[He]){if(n=t.alternate,t.child!==null||n!==null&&n.child!==null)for(e=ws(e);e!==null;){if(n=e[He])return n;e=ws(e)}return t}e=n,n=e.parentNode}return null}function pr(e){return e=e[He]||e[Je],!e||e.tag!==5&&e.tag!==6&&e.tag!==13&&e.tag!==3?null:e}function bt(e){if(e.tag===5||e.tag===6)return e.stateNode;throw Error(x(33))}function zl(e){return e[nr]||null}var ei=[],Jt=-1;function St(e){return{current:e}}function B(e){0>Jt||(e.current=ei[Jt],ei[Jt]=null,Jt--)}function j(e,t){Jt++,ei[Jt]=e.current,e.current=t}var kt={},ae=St(kt),me=St(!1),jt=kt;function fn(e,t){var n=e.type.contextTypes;if(!n)return kt;var r=e.stateNode;if(r&&r.__reactInternalMemoizedUnmaskedChildContext===t)return r.__reactInternalMemoizedMaskedChildContext;var l={},o;for(o in n)l[o]=t[o];return r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=t,e.__reactInternalMemoizedMaskedChildContext=l),l}function ge(e){return e=e.childContextTypes,e!=null}function ul(){B(me),B(ae)}function ks(e,t,n){if(ae.current!==kt)throw Error(x(168));j(ae,t),j(me,n)}function $u(e,t,n){var r=e.stateNode;if(t=t.childContextTypes,typeof r.getChildContext!="function")return n;r=r.getChildContext();for(var l in r)if(!(l in t))throw Error(x(108,Yp(e)||"Unknown",l));return V({},n,r)}function cl(e){return e=(e=e.stateNode)&&e.__reactInternalMemoizedMergedChildContext||kt,jt=ae.current,j(ae,e),j(me,me.current),!0}function _s(e,t,n){var r=e.stateNode;if(!r)throw Error(x(169));n?(e=$u(e,t,jt),r.__reactInternalMemoizedMergedChildContext=e,B(me),B(ae),j(ae,e)):B(me),j(me,n)}var Ge=null,Ll=!1,xo=!1;function Qu(e){Ge===null?Ge=[e]:Ge.push(e)}function sf(e){Ll=!0,Qu(e)}function Nt(){if(!xo&&Ge!==null){xo=!0;var e=0,t=R;try{var n=Ge;for(R=1;e<n.length;e++){var r=n[e];do r=r(!0);while(r!==null)}Ge=null,Ll=!1}catch(l){throw Ge!==null&&(Ge=Ge.slice(e+1)),hu(Pi,Nt),l}finally{R=t,xo=!1}}return null}var en=[],tn=0,pl=null,dl=0,Ce=[],Ee=0,Ft=null,Xe=1,Ze="";function Lt(e,t){en[tn++]=dl,en[tn++]=pl,pl=e,dl=t}function Yu(e,t,n){Ce[Ee++]=Xe,Ce[Ee++]=Ze,Ce[Ee++]=Ft,Ft=e;var r=Xe;e=Ze;var l=32-je(r)-1;r&=~(1<<l),n+=1;var o=32-je(t)+l;if(30<o){var i=l-l%5;o=(r&(1<<i)-1).toString(32),r>>=i,l-=i,Xe=1<<32-je(t)+l|n<<l|r,Ze=o+e}else Xe=1<<o|n<<l|r,Ze=e}function ji(e){e.return!==null&&(Lt(e,1),Yu(e,1,0))}function Fi(e){for(;e===pl;)pl=en[--tn],en[tn]=null,dl=en[--tn],en[tn]=null;for(;e===Ft;)Ft=Ce[--Ee],Ce[Ee]=null,Ze=Ce[--Ee],Ce[Ee]=null,Xe=Ce[--Ee],Ce[Ee]=null}var xe=null,ye=null,W=!1,De=null;function Ku(e,t){var n=Pe(5,null,null,0);n.elementType="DELETED",n.stateNode=t,n.return=e,t=e.deletions,t===null?(e.deletions=[n],e.flags|=16):t.push(n)}function Ss(e,t){switch(e.tag){case 5:var n=e.type;return t=t.nodeType!==1||n.toLowerCase()!==t.nodeName.toLowerCase()?null:t,t!==null?(e.stateNode=t,xe=e,ye=gt(t.firstChild),!0):!1;case 6:return t=e.pendingProps===""||t.nodeType!==3?null:t,t!==null?(e.stateNode=t,xe=e,ye=null,!0):!1;case 13:return t=t.nodeType!==8?null:t,t!==null?(n=Ft!==null?{id:Xe,overflow:Ze}:null,e.memoizedState={dehydrated:t,treeContext:n,retryLane:1073741824},n=Pe(18,null,null,0),n.stateNode=t,n.return=e,e.child=n,xe=e,ye=null,!0):!1;default:return!1}}function ti(e){return(e.mode&1)!==0&&(e.flags&128)===0}function ni(e){if(W){var t=ye;if(t){var n=t;if(!Ss(e,t)){if(ti(e))throw Error(x(418));t=gt(n.nextSibling);var r=xe;t&&Ss(e,t)?Ku(r,n):(e.flags=e.flags&-4097|2,W=!1,xe=e)}}else{if(ti(e))throw Error(x(418));e.flags=e.flags&-4097|2,W=!1,xe=e}}}function Ns(e){for(e=e.return;e!==null&&e.tag!==5&&e.tag!==3&&e.tag!==13;)e=e.return;xe=e}function Wr(e){if(e!==xe)return!1;if(!W)return Ns(e),W=!0,!1;var t;if((t=e.tag!==3)&&!(t=e.tag!==5)&&(t=e.type,t=t!=="head"&&t!=="body"&&!qo(e.type,e.memoizedProps)),t&&(t=ye)){if(ti(e))throw Gu(),Error(x(418));for(;t;)Ku(e,t),t=gt(t.nextSibling)}if(Ns(e),e.tag===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(x(317));e:{for(e=e.nextSibling,t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="/$"){if(t===0){ye=gt(e.nextSibling);break e}t--}else n!=="$"&&n!=="$!"&&n!=="$?"||t++}e=e.nextSibling}ye=null}}else ye=xe?gt(e.stateNode.nextSibling):null;return!0}function Gu(){for(var e=ye;e;)e=gt(e.nextSibling)}function mn(){ye=xe=null,W=!1}function Bi(e){De===null?De=[e]:De.push(e)}var uf=nt.ReactCurrentBatchConfig;function Ln(e,t,n){if(e=n.ref,e!==null&&typeof e!="function"&&typeof e!="object"){if(n._owner){if(n=n._owner,n){if(n.tag!==1)throw Error(x(309));var r=n.stateNode}if(!r)throw Error(x(147,e));var l=r,o=""+e;return t!==null&&t.ref!==null&&typeof t.ref=="function"&&t.ref._stringRef===o?t.ref:(t=function(i){var a=l.refs;i===null?delete a[o]:a[o]=i},t._stringRef=o,t)}if(typeof e!="string")throw Error(x(284));if(!n._owner)throw Error(x(290,e))}return e}function Ur(e,t){throw e=Object.prototype.toString.call(t),Error(x(31,e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e))}function Cs(e){var t=e._init;return t(e._payload)}function Xu(e){function t(u,c){if(e){var d=u.deletions;d===null?(u.deletions=[c],u.flags|=16):d.push(c)}}function n(u,c){if(!e)return null;for(;c!==null;)t(u,c),c=c.sibling;return null}function r(u,c){for(u=new Map;c!==null;)c.key!==null?u.set(c.key,c):u.set(c.index,c),c=c.sibling;return u}function l(u,c){return u=xt(u,c),u.index=0,u.sibling=null,u}function o(u,c,d){return u.index=d,e?(d=u.alternate,d!==null?(d=d.index,d<c?(u.flags|=2,c):d):(u.flags|=2,c)):(u.flags|=1048576,c)}function i(u){return e&&u.alternate===null&&(u.flags|=2),u}function a(u,c,d,h){return c===null||c.tag!==6?(c=Eo(d,u.mode,h),c.return=u,c):(c=l(c,d),c.return=u,c)}function s(u,c,d,h){var k=d.type;return k===Gt?v(u,c,d.props.children,h,d.key):c!==null&&(c.elementType===k||typeof k=="object"&&k!==null&&k.$$typeof===it&&Cs(k)===c.type)?(h=l(c,d.props),h.ref=Ln(u,c,d),h.return=u,h):(h=Jr(d.type,d.key,d.props,null,u.mode,h),h.ref=Ln(u,c,d),h.return=u,h)}function p(u,c,d,h){return c===null||c.tag!==4||c.stateNode.containerInfo!==d.containerInfo||c.stateNode.implementation!==d.implementation?(c=Po(d,u.mode,h),c.return=u,c):(c=l(c,d.children||[]),c.return=u,c)}function v(u,c,d,h,k){return c===null||c.tag!==7?(c=Dt(d,u.mode,h,k),c.return=u,c):(c=l(c,d),c.return=u,c)}function f(u,c,d){if(typeof c=="string"&&c!==""||typeof c=="number")return c=Eo(""+c,u.mode,d),c.return=u,c;if(typeof c=="object"&&c!==null){switch(c.$$typeof){case Cr:return d=Jr(c.type,c.key,c.props,null,u.mode,d),d.ref=Ln(u,null,c),d.return=u,d;case Kt:return c=Po(c,u.mode,d),c.return=u,c;case it:var h=c._init;return f(u,h(c._payload),d)}if(On(c)||Cn(c))return c=Dt(c,u.mode,d,null),c.return=u,c;Ur(u,c)}return null}function m(u,c,d,h){var k=c!==null?c.key:null;if(typeof d=="string"&&d!==""||typeof d=="number")return k!==null?null:a(u,c,""+d,h);if(typeof d=="object"&&d!==null){switch(d.$$typeof){case Cr:return d.key===k?s(u,c,d,h):null;case Kt:return d.key===k?p(u,c,d,h):null;case it:return k=d._init,m(u,c,k(d._payload),h)}if(On(d)||Cn(d))return k!==null?null:v(u,c,d,h,null);Ur(u,d)}return null}function w(u,c,d,h,k){if(typeof h=="string"&&h!==""||typeof h=="number")return u=u.get(d)||null,a(c,u,""+h,k);if(typeof h=="object"&&h!==null){switch(h.$$typeof){case Cr:return u=u.get(h.key===null?d:h.key)||null,s(c,u,h,k);case Kt:return u=u.get(h.key===null?d:h.key)||null,p(c,u,h,k);case it:var C=h._init;return w(u,c,d,C(h._payload),k)}if(On(h)||Cn(h))return u=u.get(d)||null,v(c,u,h,k,null);Ur(c,h)}return null}function _(u,c,d,h){for(var k=null,C=null,S=c,P=c=0,X=null;S!==null&&P<d.length;P++){S.index>P?(X=S,S=null):X=S.sibling;var T=m(u,S,d[P],h);if(T===null){S===null&&(S=X);break}e&&S&&T.alternate===null&&t(u,S),c=o(T,c,P),C===null?k=T:C.sibling=T,C=T,S=X}if(P===d.length)return n(u,S),W&&Lt(u,P),k;if(S===null){for(;P<d.length;P++)S=f(u,d[P],h),S!==null&&(c=o(S,c,P),C===null?k=S:C.sibling=S,C=S);return W&&Lt(u,P),k}for(S=r(u,S);P<d.length;P++)X=w(S,u,P,d[P],h),X!==null&&(e&&X.alternate!==null&&S.delete(X.key===null?P:X.key),c=o(X,c,P),C===null?k=X:C.sibling=X,C=X);return e&&S.forEach(function(rt){return t(u,rt)}),W&&Lt(u,P),k}function N(u,c,d,h){var k=Cn(d);if(typeof k!="function")throw Error(x(150));if(d=k.call(d),d==null)throw Error(x(151));for(var C=k=null,S=c,P=c=0,X=null,T=d.next();S!==null&&!T.done;P++,T=d.next()){S.index>P?(X=S,S=null):X=S.sibling;var rt=m(u,S,T.value,h);if(rt===null){S===null&&(S=X);break}e&&S&&rt.alternate===null&&t(u,S),c=o(rt,c,P),C===null?k=rt:C.sibling=rt,C=rt,S=X}if(T.done)return n(u,S),W&&Lt(u,P),k;if(S===null){for(;!T.done;P++,T=d.next())T=f(u,T.value,h),T!==null&&(c=o(T,c,P),C===null?k=T:C.sibling=T,C=T);return W&&Lt(u,P),k}for(S=r(u,S);!T.done;P++,T=d.next())T=w(S,u,P,T.value,h),T!==null&&(e&&T.alternate!==null&&S.delete(T.key===null?P:T.key),c=o(T,c,P),C===null?k=T:C.sibling=T,C=T);return e&&S.forEach(function(vp){return t(u,vp)}),W&&Lt(u,P),k}function O(u,c,d,h){if(typeof d=="object"&&d!==null&&d.type===Gt&&d.key===null&&(d=d.props.children),typeof d=="object"&&d!==null){switch(d.$$typeof){case Cr:e:{for(var k=d.key,C=c;C!==null;){if(C.key===k){if(k=d.type,k===Gt){if(C.tag===7){n(u,C.sibling),c=l(C,d.props.children),c.return=u,u=c;break e}}else if(C.elementType===k||typeof k=="object"&&k!==null&&k.$$typeof===it&&Cs(k)===C.type){n(u,C.sibling),c=l(C,d.props),c.ref=Ln(u,C,d),c.return=u,u=c;break e}n(u,C);break}else t(u,C);C=C.sibling}d.type===Gt?(c=Dt(d.props.children,u.mode,h,d.key),c.return=u,u=c):(h=Jr(d.type,d.key,d.props,null,u.mode,h),h.ref=Ln(u,c,d),h.return=u,u=h)}return i(u);case Kt:e:{for(C=d.key;c!==null;){if(c.key===C)if(c.tag===4&&c.stateNode.containerInfo===d.containerInfo&&c.stateNode.implementation===d.implementation){n(u,c.sibling),c=l(c,d.children||[]),c.return=u,u=c;break e}else{n(u,c);break}else t(u,c);c=c.sibling}c=Po(d,u.mode,h),c.return=u,u=c}return i(u);case it:return C=d._init,O(u,c,C(d._payload),h)}if(On(d))return _(u,c,d,h);if(Cn(d))return N(u,c,d,h);Ur(u,d)}return typeof d=="string"&&d!==""||typeof d=="number"?(d=""+d,c!==null&&c.tag===6?(n(u,c.sibling),c=l(c,d),c.return=u,u=c):(n(u,c),c=Eo(d,u.mode,h),c.return=u,u=c),i(u)):n(u,c)}return O}var gn=Xu(!0),Zu=Xu(!1),fl=St(null),ml=null,nn=null,Wi=null;function Ui(){Wi=nn=ml=null}function Ai(e){var t=fl.current;B(fl),e._currentValue=t}function ri(e,t,n){for(;e!==null;){var r=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,r!==null&&(r.childLanes|=t)):r!==null&&(r.childLanes&t)!==t&&(r.childLanes|=t),e===n)break;e=e.return}}function cn(e,t){ml=e,Wi=nn=null,e=e.dependencies,e!==null&&e.firstContext!==null&&((e.lanes&t)!==0&&(fe=!0),e.firstContext=null)}function Le(e){var t=e._currentValue;if(Wi!==e)if(e={context:e,memoizedValue:t,next:null},nn===null){if(ml===null)throw Error(x(308));nn=e,ml.dependencies={lanes:0,firstContext:e}}else nn=nn.next=e;return t}var Tt=null;function Vi(e){Tt===null?Tt=[e]:Tt.push(e)}function qu(e,t,n,r){var l=t.interleaved;return l===null?(n.next=n,Vi(t)):(n.next=l.next,l.next=n),t.interleaved=n,et(e,r)}function et(e,t){e.lanes|=t;var n=e.alternate;for(n!==null&&(n.lanes|=t),n=e,e=e.return;e!==null;)e.childLanes|=t,n=e.alternate,n!==null&&(n.childLanes|=t),n=e,e=e.return;return n.tag===3?n.stateNode:null}var at=!1;function Hi(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function bu(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,effects:e.effects})}function qe(e,t){return{eventTime:e,lane:t,tag:0,payload:null,callback:null,next:null}}function ht(e,t,n){var r=e.updateQueue;if(r===null)return null;if(r=r.shared,(M&2)!==0){var l=r.pending;return l===null?t.next=t:(t.next=l.next,l.next=t),r.pending=t,et(e,n)}return l=r.interleaved,l===null?(t.next=t,Vi(r)):(t.next=l.next,l.next=t),r.interleaved=t,et(e,n)}function Kr(e,t,n){if(t=t.updateQueue,t!==null&&(t=t.shared,(n&4194240)!==0)){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,zi(e,n)}}function Es(e,t){var n=e.updateQueue,r=e.alternate;if(r!==null&&(r=r.updateQueue,n===r)){var l=null,o=null;if(n=n.firstBaseUpdate,n!==null){do{var i={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};o===null?l=o=i:o=o.next=i,n=n.next}while(n!==null);o===null?l=o=t:o=o.next=t}else l=o=t;n={baseState:r.baseState,firstBaseUpdate:l,lastBaseUpdate:o,shared:r.shared,effects:r.effects},e.updateQueue=n;return}e=n.lastBaseUpdate,e===null?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}function gl(e,t,n,r){var l=e.updateQueue;at=!1;var o=l.firstBaseUpdate,i=l.lastBaseUpdate,a=l.shared.pending;if(a!==null){l.shared.pending=null;var s=a,p=s.next;s.next=null,i===null?o=p:i.next=p,i=s;var v=e.alternate;v!==null&&(v=v.updateQueue,a=v.lastBaseUpdate,a!==i&&(a===null?v.firstBaseUpdate=p:a.next=p,v.lastBaseUpdate=s))}if(o!==null){var f=l.baseState;i=0,v=p=s=null,a=o;do{var m=a.lane,w=a.eventTime;if((r&m)===m){v!==null&&(v=v.next={eventTime:w,lane:0,tag:a.tag,payload:a.payload,callback:a.callback,next:null});e:{var _=e,N=a;switch(m=t,w=n,N.tag){case 1:if(_=N.payload,typeof _=="function"){f=_.call(w,f,m);break e}f=_;break e;case 3:_.flags=_.flags&-65537|128;case 0:if(_=N.payload,m=typeof _=="function"?_.call(w,f,m):_,m==null)break e;f=V({},f,m);break e;case 2:at=!0}}a.callback!==null&&a.lane!==0&&(e.flags|=64,m=l.effects,m===null?l.effects=[a]:m.push(a))}else w={eventTime:w,lane:m,tag:a.tag,payload:a.payload,callback:a.callback,next:null},v===null?(p=v=w,s=f):v=v.next=w,i|=m;if(a=a.next,a===null){if(a=l.shared.pending,a===null)break;m=a,a=m.next,m.next=null,l.lastBaseUpdate=m,l.shared.pending=null}}while(!0);if(v===null&&(s=f),l.baseState=s,l.firstBaseUpdate=p,l.lastBaseUpdate=v,t=l.shared.interleaved,t!==null){l=t;do i|=l.lane,l=l.next;while(l!==t)}else o===null&&(l.shared.lanes=0);Wt|=i,e.lanes=i,e.memoizedState=f}}function Ps(e,t,n){if(e=t.effects,t.effects=null,e!==null)for(t=0;t<e.length;t++){var r=e[t],l=r.callback;if(l!==null){if(r.callback=null,r=n,typeof l!="function")throw Error(x(191,l));l.call(r)}}}var dr={},Qe=St(dr),rr=St(dr),lr=St(dr);function Rt(e){if(e===dr)throw Error(x(174));return e}function $i(e,t){switch(j(lr,t),j(rr,e),j(Qe,dr),e=t.nodeType,e){case 9:case 11:t=(t=t.documentElement)?t.namespaceURI:Fo(null,"");break;default:e=e===8?t.parentNode:t,t=e.namespaceURI||null,e=e.tagName,t=Fo(t,e)}B(Qe),j(Qe,t)}function hn(){B(Qe),B(rr),B(lr)}function Ju(e){Rt(lr.current);var t=Rt(Qe.current),n=Fo(t,e.type);t!==n&&(j(rr,e),j(Qe,n))}function Qi(e){rr.current===e&&(B(Qe),B(rr))}var U=St(0);function hl(e){for(var t=e;t!==null;){if(t.tag===13){var n=t.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||n.data==="$?"||n.data==="$!"))return t}else if(t.tag===19&&t.memoizedProps.revealOrder!==void 0){if((t.flags&128)!==0)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var wo=[];function Yi(){for(var e=0;e<wo.length;e++)wo[e]._workInProgressVersionPrimary=null;wo.length=0}var Gr=nt.ReactCurrentDispatcher,ko=nt.ReactCurrentBatchConfig,Bt=0,A=null,Y=null,Z=null,vl=!1,Vn=!1,or=0,cf=0;function le(){throw Error(x(321))}function Ki(e,t){if(t===null)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!Be(e[n],t[n]))return!1;return!0}function Gi(e,t,n,r,l,o){if(Bt=o,A=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,Gr.current=e===null||e.memoizedState===null?mf:gf,e=n(r,l),Vn){o=0;do{if(Vn=!1,or=0,25<=o)throw Error(x(301));o+=1,Z=Y=null,t.updateQueue=null,Gr.current=hf,e=n(r,l)}while(Vn)}if(Gr.current=yl,t=Y!==null&&Y.next!==null,Bt=0,Z=Y=A=null,vl=!1,t)throw Error(x(300));return e}function Xi(){var e=or!==0;return or=0,e}function Ve(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return Z===null?A.memoizedState=Z=e:Z=Z.next=e,Z}function Ie(){if(Y===null){var e=A.alternate;e=e!==null?e.memoizedState:null}else e=Y.next;var t=Z===null?A.memoizedState:Z.next;if(t!==null)Z=t,Y=e;else{if(e===null)throw Error(x(310));Y=e,e={memoizedState:Y.memoizedState,baseState:Y.baseState,baseQueue:Y.baseQueue,queue:Y.queue,next:null},Z===null?A.memoizedState=Z=e:Z=Z.next=e}return Z}function ir(e,t){return typeof t=="function"?t(e):t}function _o(e){var t=Ie(),n=t.queue;if(n===null)throw Error(x(311));n.lastRenderedReducer=e;var r=Y,l=r.baseQueue,o=n.pending;if(o!==null){if(l!==null){var i=l.next;l.next=o.next,o.next=i}r.baseQueue=l=o,n.pending=null}if(l!==null){o=l.next,r=r.baseState;var a=i=null,s=null,p=o;do{var v=p.lane;if((Bt&v)===v)s!==null&&(s=s.next={lane:0,action:p.action,hasEagerState:p.hasEagerState,eagerState:p.eagerState,next:null}),r=p.hasEagerState?p.eagerState:e(r,p.action);else{var f={lane:v,action:p.action,hasEagerState:p.hasEagerState,eagerState:p.eagerState,next:null};s===null?(a=s=f,i=r):s=s.next=f,A.lanes|=v,Wt|=v}p=p.next}while(p!==null&&p!==o);s===null?i=r:s.next=a,Be(r,t.memoizedState)||(fe=!0),t.memoizedState=r,t.baseState=i,t.baseQueue=s,n.lastRenderedState=r}if(e=n.interleaved,e!==null){l=e;do o=l.lane,A.lanes|=o,Wt|=o,l=l.next;while(l!==e)}else l===null&&(n.lanes=0);return[t.memoizedState,n.dispatch]}function So(e){var t=Ie(),n=t.queue;if(n===null)throw Error(x(311));n.lastRenderedReducer=e;var r=n.dispatch,l=n.pending,o=t.memoizedState;if(l!==null){n.pending=null;var i=l=l.next;do o=e(o,i.action),i=i.next;while(i!==l);Be(o,t.memoizedState)||(fe=!0),t.memoizedState=o,t.baseQueue===null&&(t.baseState=o),n.lastRenderedState=o}return[o,r]}function ec(){}function tc(e,t){var n=A,r=Ie(),l=t(),o=!Be(r.memoizedState,l);if(o&&(r.memoizedState=l,fe=!0),r=r.queue,Zi(lc.bind(null,n,r,e),[e]),r.getSnapshot!==t||o||Z!==null&&Z.memoizedState.tag&1){if(n.flags|=2048,ar(9,rc.bind(null,n,r,l,t),void 0,null),q===null)throw Error(x(349));(Bt&30)!==0||nc(n,t,l)}return l}function nc(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},t=A.updateQueue,t===null?(t={lastEffect:null,stores:null},A.updateQueue=t,t.stores=[e]):(n=t.stores,n===null?t.stores=[e]:n.push(e))}function rc(e,t,n,r){t.value=n,t.getSnapshot=r,oc(t)&&ic(e)}function lc(e,t,n){return n(function(){oc(t)&&ic(e)})}function oc(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!Be(e,n)}catch{return!0}}function ic(e){var t=et(e,1);t!==null&&Fe(t,e,1,-1)}function zs(e){var t=Ve();return typeof e=="function"&&(e=e()),t.memoizedState=t.baseState=e,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:ir,lastRenderedState:e},t.queue=e,e=e.dispatch=ff.bind(null,A,e),[t.memoizedState,e]}function ar(e,t,n,r){return e={tag:e,create:t,destroy:n,deps:r,next:null},t=A.updateQueue,t===null?(t={lastEffect:null,stores:null},A.updateQueue=t,t.lastEffect=e.next=e):(n=t.lastEffect,n===null?t.lastEffect=e.next=e:(r=n.next,n.next=e,e.next=r,t.lastEffect=e)),e}function ac(){return Ie().memoizedState}function Xr(e,t,n,r){var l=Ve();A.flags|=e,l.memoizedState=ar(1|t,n,void 0,r===void 0?null:r)}function Il(e,t,n,r){var l=Ie();r=r===void 0?null:r;var o=void 0;if(Y!==null){var i=Y.memoizedState;if(o=i.destroy,r!==null&&Ki(r,i.deps)){l.memoizedState=ar(t,n,o,r);return}}A.flags|=e,l.memoizedState=ar(1|t,n,o,r)}function Ls(e,t){return Xr(8390656,8,e,t)}function Zi(e,t){return Il(2048,8,e,t)}function sc(e,t){return Il(4,2,e,t)}function uc(e,t){return Il(4,4,e,t)}function cc(e,t){if(typeof t=="function")return e=e(),t(e),function(){t(null)};if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function pc(e,t,n){return n=n!=null?n.concat([e]):null,Il(4,4,cc.bind(null,t,e),n)}function qi(){}function dc(e,t){var n=Ie();t=t===void 0?null:t;var r=n.memoizedState;return r!==null&&t!==null&&Ki(t,r[1])?r[0]:(n.memoizedState=[e,t],e)}function fc(e,t){var n=Ie();t=t===void 0?null:t;var r=n.memoizedState;return r!==null&&t!==null&&Ki(t,r[1])?r[0]:(e=e(),n.memoizedState=[e,t],e)}function mc(e,t,n){return(Bt&21)===0?(e.baseState&&(e.baseState=!1,fe=!0),e.memoizedState=n):(Be(n,t)||(n=xu(),A.lanes|=n,Wt|=n,e.baseState=!0),t)}function pf(e,t){var n=R;R=n!==0&&4>n?n:4,e(!0);var r=ko.transition;ko.transition={};try{e(!1),t()}finally{R=n,ko.transition=r}}function gc(){return Ie().memoizedState}function df(e,t,n){var r=yt(e);if(n={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null},hc(e))vc(t,n);else if(n=qu(e,t,n,r),n!==null){var l=ce();Fe(n,e,r,l),yc(n,t,r)}}function ff(e,t,n){var r=yt(e),l={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null};if(hc(e))vc(t,l);else{var o=e.alternate;if(e.lanes===0&&(o===null||o.lanes===0)&&(o=t.lastRenderedReducer,o!==null))try{var i=t.lastRenderedState,a=o(i,n);if(l.hasEagerState=!0,l.eagerState=a,Be(a,i)){var s=t.interleaved;s===null?(l.next=l,Vi(t)):(l.next=s.next,s.next=l),t.interleaved=l;return}}catch{}n=qu(e,t,l,r),n!==null&&(l=ce(),Fe(n,e,r,l),yc(n,t,r))}}function hc(e){var t=e.alternate;return e===A||t!==null&&t===A}function vc(e,t){Vn=vl=!0;var n=e.pending;n===null?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function yc(e,t,n){if((n&4194240)!==0){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,zi(e,n)}}var yl={readContext:Le,useCallback:le,useContext:le,useEffect:le,useImperativeHandle:le,useInsertionEffect:le,useLayoutEffect:le,useMemo:le,useReducer:le,useRef:le,useState:le,useDebugValue:le,useDeferredValue:le,useTransition:le,useMutableSource:le,useSyncExternalStore:le,useId:le,unstable_isNewReconciler:!1},mf={readContext:Le,useCallback:function(e,t){return Ve().memoizedState=[e,t===void 0?null:t],e},useContext:Le,useEffect:Ls,useImperativeHandle:function(e,t,n){return n=n!=null?n.concat([e]):null,Xr(4194308,4,cc.bind(null,t,e),n)},useLayoutEffect:function(e,t){return Xr(4194308,4,e,t)},useInsertionEffect:function(e,t){return Xr(4,2,e,t)},useMemo:function(e,t){var n=Ve();return t=t===void 0?null:t,e=e(),n.memoizedState=[e,t],e},useReducer:function(e,t,n){var r=Ve();return t=n!==void 0?n(t):t,r.memoizedState=r.baseState=t,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:t},r.queue=e,e=e.dispatch=df.bind(null,A,e),[r.memoizedState,e]},useRef:function(e){var t=Ve();return e={current:e},t.memoizedState=e},useState:zs,useDebugValue:qi,useDeferredValue:function(e){return Ve().memoizedState=e},useTransition:function(){var e=zs(!1),t=e[0];return e=pf.bind(null,e[1]),Ve().memoizedState=e,[t,e]},useMutableSource:function(){},useSyncExternalStore:function(e,t,n){var r=A,l=Ve();if(W){if(n===void 0)throw Error(x(407));n=n()}else{if(n=t(),q===null)throw Error(x(349));(Bt&30)!==0||nc(r,t,n)}l.memoizedState=n;var o={value:n,getSnapshot:t};return l.queue=o,Ls(lc.bind(null,r,o,e),[e]),r.flags|=2048,ar(9,rc.bind(null,r,o,n,t),void 0,null),n},useId:function(){var e=Ve(),t=q.identifierPrefix;if(W){var n=Ze,r=Xe;n=(r&~(1<<32-je(r)-1)).toString(32)+n,t=":"+t+"R"+n,n=or++,0<n&&(t+="H"+n.toString(32)),t+=":"}else n=cf++,t=":"+t+"r"+n.toString(32)+":";return e.memoizedState=t},unstable_isNewReconciler:!1},gf={readContext:Le,useCallback:dc,useContext:Le,useEffect:Zi,useImperativeHandle:pc,useInsertionEffect:sc,useLayoutEffect:uc,useMemo:fc,useReducer:_o,useRef:ac,useState:function(){return _o(ir)},useDebugValue:qi,useDeferredValue:function(e){var t=Ie();return mc(t,Y.memoizedState,e)},useTransition:function(){var e=_o(ir)[0],t=Ie().memoizedState;return[e,t]},useMutableSource:ec,useSyncExternalStore:tc,useId:gc,unstable_isNewReconciler:!1},hf={readContext:Le,useCallback:dc,useContext:Le,useEffect:Zi,useImperativeHandle:pc,useInsertionEffect:sc,useLayoutEffect:uc,useMemo:fc,useReducer:So,useRef:ac,useState:function(){return So(ir)},useDebugValue:qi,useDeferredValue:function(e){var t=Ie();return Y===null?t.memoizedState=e:mc(t,Y.memoizedState,e)},useTransition:function(){var e=So(ir)[0],t=Ie().memoizedState;return[e,t]},useMutableSource:ec,useSyncExternalStore:tc,useId:gc,unstable_isNewReconciler:!1};function Re(e,t){if(e&&e.defaultProps){t=V({},t),e=e.defaultProps;for(var n in e)t[n]===void 0&&(t[n]=e[n]);return t}return t}function li(e,t,n,r){t=e.memoizedState,n=n(r,t),n=n==null?t:V({},t,n),e.memoizedState=n,e.lanes===0&&(e.updateQueue.baseState=n)}var Ml={isMounted:function(e){return(e=e._reactInternals)?Vt(e)===e:!1},enqueueSetState:function(e,t,n){e=e._reactInternals;var r=ce(),l=yt(e),o=qe(r,l);o.payload=t,n!=null&&(o.callback=n),t=ht(e,o,l),t!==null&&(Fe(t,e,l,r),Kr(t,e,l))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var r=ce(),l=yt(e),o=qe(r,l);o.tag=1,o.payload=t,n!=null&&(o.callback=n),t=ht(e,o,l),t!==null&&(Fe(t,e,l,r),Kr(t,e,l))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=ce(),r=yt(e),l=qe(n,r);l.tag=2,t!=null&&(l.callback=t),t=ht(e,l,r),t!==null&&(Fe(t,e,r,n),Kr(t,e,r))}};function Is(e,t,n,r,l,o,i){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(r,o,i):t.prototype&&t.prototype.isPureReactComponent?!Jn(n,r)||!Jn(l,o):!0}function xc(e,t,n){var r=!1,l=kt,o=t.contextType;return typeof o=="object"&&o!==null?o=Le(o):(l=ge(t)?jt:ae.current,r=t.contextTypes,o=(r=r!=null)?fn(e,l):kt),t=new t(n,o),e.memoizedState=t.state!==null&&t.state!==void 0?t.state:null,t.updater=Ml,e.stateNode=t,t._reactInternals=e,r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=l,e.__reactInternalMemoizedMaskedChildContext=o),t}function Ms(e,t,n,r){e=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(n,r),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(n,r),t.state!==e&&Ml.enqueueReplaceState(t,t.state,null)}function oi(e,t,n,r){var l=e.stateNode;l.props=n,l.state=e.memoizedState,l.refs={},Hi(e);var o=t.contextType;typeof o=="object"&&o!==null?l.context=Le(o):(o=ge(t)?jt:ae.current,l.context=fn(e,o)),l.state=e.memoizedState,o=t.getDerivedStateFromProps,typeof o=="function"&&(li(e,t,o,n),l.state=e.memoizedState),typeof t.getDerivedStateFromProps=="function"||typeof l.getSnapshotBeforeUpdate=="function"||typeof l.UNSAFE_componentWillMount!="function"&&typeof l.componentWillMount!="function"||(t=l.state,typeof l.componentWillMount=="function"&&l.componentWillMount(),typeof l.UNSAFE_componentWillMount=="function"&&l.UNSAFE_componentWillMount(),t!==l.state&&Ml.enqueueReplaceState(l,l.state,null),gl(e,n,l,r),l.state=e.memoizedState),typeof l.componentDidMount=="function"&&(e.flags|=4194308)}function vn(e,t){try{var n="",r=t;do n+=Qp(r),r=r.return;while(r);var l=n}catch(o){l=`
Error generating stack: `+o.message+`
`+o.stack}return{value:e,source:t,stack:l,digest:null}}function No(e,t,n){return{value:e,source:null,stack:n??null,digest:t??null}}function ii(e,t){try{console.error(t.value)}catch(n){setTimeout(function(){throw n})}}var vf=typeof WeakMap=="function"?WeakMap:Map;function wc(e,t,n){n=qe(-1,n),n.tag=3,n.payload={element:null};var r=t.value;return n.callback=function(){wl||(wl=!0,hi=r),ii(e,t)},n}function kc(e,t,n){n=qe(-1,n),n.tag=3;var r=e.type.getDerivedStateFromError;if(typeof r=="function"){var l=t.value;n.payload=function(){return r(l)},n.callback=function(){ii(e,t)}}var o=e.stateNode;return o!==null&&typeof o.componentDidCatch=="function"&&(n.callback=function(){ii(e,t),typeof r!="function"&&(vt===null?vt=new Set([this]):vt.add(this));var i=t.stack;this.componentDidCatch(t.value,{componentStack:i!==null?i:""})}),n}function Ts(e,t,n){var r=e.pingCache;if(r===null){r=e.pingCache=new vf;var l=new Set;r.set(t,l)}else l=r.get(t),l===void 0&&(l=new Set,r.set(t,l));l.has(n)||(l.add(n),e=Mf.bind(null,e,t,n),t.then(e,e))}function Rs(e){do{var t;if((t=e.tag===13)&&(t=e.memoizedState,t=t!==null?t.dehydrated!==null:!0),t)return e;e=e.return}while(e!==null);return null}function Os(e,t,n,r,l){return(e.mode&1)===0?(e===t?e.flags|=65536:(e.flags|=128,n.flags|=131072,n.flags&=-52805,n.tag===1&&(n.alternate===null?n.tag=17:(t=qe(-1,1),t.tag=2,ht(n,t,1))),n.lanes|=1),e):(e.flags|=65536,e.lanes=l,e)}var yf=nt.ReactCurrentOwner,fe=!1;function ue(e,t,n,r){t.child=e===null?Zu(t,null,n,r):gn(t,e.child,n,r)}function Ds(e,t,n,r,l){n=n.render;var o=t.ref;return cn(t,l),r=Gi(e,t,n,r,o,l),n=Xi(),e!==null&&!fe?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~l,tt(e,t,l)):(W&&n&&ji(t),t.flags|=1,ue(e,t,r,l),t.child)}function js(e,t,n,r,l){if(e===null){var o=n.type;return typeof o=="function"&&!oa(o)&&o.defaultProps===void 0&&n.compare===null&&n.defaultProps===void 0?(t.tag=15,t.type=o,_c(e,t,o,r,l)):(e=Jr(n.type,null,r,t,t.mode,l),e.ref=t.ref,e.return=t,t.child=e)}if(o=e.child,(e.lanes&l)===0){var i=o.memoizedProps;if(n=n.compare,n=n!==null?n:Jn,n(i,r)&&e.ref===t.ref)return tt(e,t,l)}return t.flags|=1,e=xt(o,r),e.ref=t.ref,e.return=t,t.child=e}function _c(e,t,n,r,l){if(e!==null){var o=e.memoizedProps;if(Jn(o,r)&&e.ref===t.ref)if(fe=!1,t.pendingProps=r=o,(e.lanes&l)!==0)(e.flags&131072)!==0&&(fe=!0);else return t.lanes=e.lanes,tt(e,t,l)}return ai(e,t,n,r,l)}function Sc(e,t,n){var r=t.pendingProps,l=r.children,o=e!==null?e.memoizedState:null;if(r.mode==="hidden")if((t.mode&1)===0)t.memoizedState={baseLanes:0,cachePool:null,transitions:null},j(ln,ve),ve|=n;else{if((n&1073741824)===0)return e=o!==null?o.baseLanes|n:n,t.lanes=t.childLanes=1073741824,t.memoizedState={baseLanes:e,cachePool:null,transitions:null},t.updateQueue=null,j(ln,ve),ve|=e,null;t.memoizedState={baseLanes:0,cachePool:null,transitions:null},r=o!==null?o.baseLanes:n,j(ln,ve),ve|=r}else o!==null?(r=o.baseLanes|n,t.memoizedState=null):r=n,j(ln,ve),ve|=r;return ue(e,t,l,n),t.child}function Nc(e,t){var n=t.ref;(e===null&&n!==null||e!==null&&e.ref!==n)&&(t.flags|=512,t.flags|=2097152)}function ai(e,t,n,r,l){var o=ge(n)?jt:ae.current;return o=fn(t,o),cn(t,l),n=Gi(e,t,n,r,o,l),r=Xi(),e!==null&&!fe?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~l,tt(e,t,l)):(W&&r&&ji(t),t.flags|=1,ue(e,t,n,l),t.child)}function Fs(e,t,n,r,l){if(ge(n)){var o=!0;cl(t)}else o=!1;if(cn(t,l),t.stateNode===null)Zr(e,t),xc(t,n,r),oi(t,n,r,l),r=!0;else if(e===null){var i=t.stateNode,a=t.memoizedProps;i.props=a;var s=i.context,p=n.contextType;typeof p=="object"&&p!==null?p=Le(p):(p=ge(n)?jt:ae.current,p=fn(t,p));var v=n.getDerivedStateFromProps,f=typeof v=="function"||typeof i.getSnapshotBeforeUpdate=="function";f||typeof i.UNSAFE_componentWillReceiveProps!="function"&&typeof i.componentWillReceiveProps!="function"||(a!==r||s!==p)&&Ms(t,i,r,p),at=!1;var m=t.memoizedState;i.state=m,gl(t,r,i,l),s=t.memoizedState,a!==r||m!==s||me.current||at?(typeof v=="function"&&(li(t,n,v,r),s=t.memoizedState),(a=at||Is(t,n,a,r,m,s,p))?(f||typeof i.UNSAFE_componentWillMount!="function"&&typeof i.componentWillMount!="function"||(typeof i.componentWillMount=="function"&&i.componentWillMount(),typeof i.UNSAFE_componentWillMount=="function"&&i.UNSAFE_componentWillMount()),typeof i.componentDidMount=="function"&&(t.flags|=4194308)):(typeof i.componentDidMount=="function"&&(t.flags|=4194308),t.memoizedProps=r,t.memoizedState=s),i.props=r,i.state=s,i.context=p,r=a):(typeof i.componentDidMount=="function"&&(t.flags|=4194308),r=!1)}else{i=t.stateNode,bu(e,t),a=t.memoizedProps,p=t.type===t.elementType?a:Re(t.type,a),i.props=p,f=t.pendingProps,m=i.context,s=n.contextType,typeof s=="object"&&s!==null?s=Le(s):(s=ge(n)?jt:ae.current,s=fn(t,s));var w=n.getDerivedStateFromProps;(v=typeof w=="function"||typeof i.getSnapshotBeforeUpdate=="function")||typeof i.UNSAFE_componentWillReceiveProps!="function"&&typeof i.componentWillReceiveProps!="function"||(a!==f||m!==s)&&Ms(t,i,r,s),at=!1,m=t.memoizedState,i.state=m,gl(t,r,i,l);var _=t.memoizedState;a!==f||m!==_||me.current||at?(typeof w=="function"&&(li(t,n,w,r),_=t.memoizedState),(p=at||Is(t,n,p,r,m,_,s)||!1)?(v||typeof i.UNSAFE_componentWillUpdate!="function"&&typeof i.componentWillUpdate!="function"||(typeof i.componentWillUpdate=="function"&&i.componentWillUpdate(r,_,s),typeof i.UNSAFE_componentWillUpdate=="function"&&i.UNSAFE_componentWillUpdate(r,_,s)),typeof i.componentDidUpdate=="function"&&(t.flags|=4),typeof i.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof i.componentDidUpdate!="function"||a===e.memoizedProps&&m===e.memoizedState||(t.flags|=4),typeof i.getSnapshotBeforeUpdate!="function"||a===e.memoizedProps&&m===e.memoizedState||(t.flags|=1024),t.memoizedProps=r,t.memoizedState=_),i.props=r,i.state=_,i.context=s,r=p):(typeof i.componentDidUpdate!="function"||a===e.memoizedProps&&m===e.memoizedState||(t.flags|=4),typeof i.getSnapshotBeforeUpdate!="function"||a===e.memoizedProps&&m===e.memoizedState||(t.flags|=1024),r=!1)}return si(e,t,n,r,o,l)}function si(e,t,n,r,l,o){Nc(e,t);var i=(t.flags&128)!==0;if(!r&&!i)return l&&_s(t,n,!1),tt(e,t,o);r=t.stateNode,yf.current=t;var a=i&&typeof n.getDerivedStateFromError!="function"?null:r.render();return t.flags|=1,e!==null&&i?(t.child=gn(t,e.child,null,o),t.child=gn(t,null,a,o)):ue(e,t,a,o),t.memoizedState=r.state,l&&_s(t,n,!0),t.child}function Cc(e){var t=e.stateNode;t.pendingContext?ks(e,t.pendingContext,t.pendingContext!==t.context):t.context&&ks(e,t.context,!1),$i(e,t.containerInfo)}function Bs(e,t,n,r,l){return mn(),Bi(l),t.flags|=256,ue(e,t,n,r),t.child}var ui={dehydrated:null,treeContext:null,retryLane:0};function ci(e){return{baseLanes:e,cachePool:null,transitions:null}}function Ec(e,t,n){var r=t.pendingProps,l=U.current,o=!1,i=(t.flags&128)!==0,a;if((a=i)||(a=e!==null&&e.memoizedState===null?!1:(l&2)!==0),a?(o=!0,t.flags&=-129):(e===null||e.memoizedState!==null)&&(l|=1),j(U,l&1),e===null)return ni(t),e=t.memoizedState,e!==null&&(e=e.dehydrated,e!==null)?((t.mode&1)===0?t.lanes=1:e.data==="$!"?t.lanes=8:t.lanes=1073741824,null):(i=r.children,e=r.fallback,o?(r=t.mode,o=t.child,i={mode:"hidden",children:i},(r&1)===0&&o!==null?(o.childLanes=0,o.pendingProps=i):o=Ol(i,r,0,null),e=Dt(e,r,n,null),o.return=t,e.return=t,o.sibling=e,t.child=o,t.child.memoizedState=ci(n),t.memoizedState=ui,e):bi(t,i));if(l=e.memoizedState,l!==null&&(a=l.dehydrated,a!==null))return xf(e,t,i,r,a,l,n);if(o){o=r.fallback,i=t.mode,l=e.child,a=l.sibling;var s={mode:"hidden",children:r.children};return(i&1)===0&&t.child!==l?(r=t.child,r.childLanes=0,r.pendingProps=s,t.deletions=null):(r=xt(l,s),r.subtreeFlags=l.subtreeFlags&14680064),a!==null?o=xt(a,o):(o=Dt(o,i,n,null),o.flags|=2),o.return=t,r.return=t,r.sibling=o,t.child=r,r=o,o=t.child,i=e.child.memoizedState,i=i===null?ci(n):{baseLanes:i.baseLanes|n,cachePool:null,transitions:i.transitions},o.memoizedState=i,o.childLanes=e.childLanes&~n,t.memoizedState=ui,r}return o=e.child,e=o.sibling,r=xt(o,{mode:"visible",children:r.children}),(t.mode&1)===0&&(r.lanes=n),r.return=t,r.sibling=null,e!==null&&(n=t.deletions,n===null?(t.deletions=[e],t.flags|=16):n.push(e)),t.child=r,t.memoizedState=null,r}function bi(e,t){return t=Ol({mode:"visible",children:t},e.mode,0,null),t.return=e,e.child=t}function Ar(e,t,n,r){return r!==null&&Bi(r),gn(t,e.child,null,n),e=bi(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function xf(e,t,n,r,l,o,i){if(n)return t.flags&256?(t.flags&=-257,r=No(Error(x(422))),Ar(e,t,i,r)):t.memoizedState!==null?(t.child=e.child,t.flags|=128,null):(o=r.fallback,l=t.mode,r=Ol({mode:"visible",children:r.children},l,0,null),o=Dt(o,l,i,null),o.flags|=2,r.return=t,o.return=t,r.sibling=o,t.child=r,(t.mode&1)!==0&&gn(t,e.child,null,i),t.child.memoizedState=ci(i),t.memoizedState=ui,o);if((t.mode&1)===0)return Ar(e,t,i,null);if(l.data==="$!"){if(r=l.nextSibling&&l.nextSibling.dataset,r)var a=r.dgst;return r=a,o=Error(x(419)),r=No(o,r,void 0),Ar(e,t,i,r)}if(a=(i&e.childLanes)!==0,fe||a){if(r=q,r!==null){switch(i&-i){case 4:l=2;break;case 16:l=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:l=32;break;case 536870912:l=268435456;break;default:l=0}l=(l&(r.suspendedLanes|i))!==0?0:l,l!==0&&l!==o.retryLane&&(o.retryLane=l,et(e,l),Fe(r,e,l,-1))}return la(),r=No(Error(x(421))),Ar(e,t,i,r)}return l.data==="$?"?(t.flags|=128,t.child=e.child,t=Tf.bind(null,e),l._reactRetry=t,null):(e=o.treeContext,ye=gt(l.nextSibling),xe=t,W=!0,De=null,e!==null&&(Ce[Ee++]=Xe,Ce[Ee++]=Ze,Ce[Ee++]=Ft,Xe=e.id,Ze=e.overflow,Ft=t),t=bi(t,r.children),t.flags|=4096,t)}function Ws(e,t,n){e.lanes|=t;var r=e.alternate;r!==null&&(r.lanes|=t),ri(e.return,t,n)}function Co(e,t,n,r,l){var o=e.memoizedState;o===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:r,tail:n,tailMode:l}:(o.isBackwards=t,o.rendering=null,o.renderingStartTime=0,o.last=r,o.tail=n,o.tailMode=l)}function Pc(e,t,n){var r=t.pendingProps,l=r.revealOrder,o=r.tail;if(ue(e,t,r.children,n),r=U.current,(r&2)!==0)r=r&1|2,t.flags|=128;else{if(e!==null&&(e.flags&128)!==0)e:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&Ws(e,n,t);else if(e.tag===19)Ws(e,n,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;e.sibling===null;){if(e.return===null||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}r&=1}if(j(U,r),(t.mode&1)===0)t.memoizedState=null;else switch(l){case"forwards":for(n=t.child,l=null;n!==null;)e=n.alternate,e!==null&&hl(e)===null&&(l=n),n=n.sibling;n=l,n===null?(l=t.child,t.child=null):(l=n.sibling,n.sibling=null),Co(t,!1,l,n,o);break;case"backwards":for(n=null,l=t.child,t.child=null;l!==null;){if(e=l.alternate,e!==null&&hl(e)===null){t.child=l;break}e=l.sibling,l.sibling=n,n=l,l=e}Co(t,!0,n,null,o);break;case"together":Co(t,!1,null,null,void 0);break;default:t.memoizedState=null}return t.child}function Zr(e,t){(t.mode&1)===0&&e!==null&&(e.alternate=null,t.alternate=null,t.flags|=2)}function tt(e,t,n){if(e!==null&&(t.dependencies=e.dependencies),Wt|=t.lanes,(n&t.childLanes)===0)return null;if(e!==null&&t.child!==e.child)throw Error(x(153));if(t.child!==null){for(e=t.child,n=xt(e,e.pendingProps),t.child=n,n.return=t;e.sibling!==null;)e=e.sibling,n=n.sibling=xt(e,e.pendingProps),n.return=t;n.sibling=null}return t.child}function wf(e,t,n){switch(t.tag){case 3:Cc(t),mn();break;case 5:Ju(t);break;case 1:ge(t.type)&&cl(t);break;case 4:$i(t,t.stateNode.containerInfo);break;case 10:var r=t.type._context,l=t.memoizedProps.value;j(fl,r._currentValue),r._currentValue=l;break;case 13:if(r=t.memoizedState,r!==null)return r.dehydrated!==null?(j(U,U.current&1),t.flags|=128,null):(n&t.child.childLanes)!==0?Ec(e,t,n):(j(U,U.current&1),e=tt(e,t,n),e!==null?e.sibling:null);j(U,U.current&1);break;case 19:if(r=(n&t.childLanes)!==0,(e.flags&128)!==0){if(r)return Pc(e,t,n);t.flags|=128}if(l=t.memoizedState,l!==null&&(l.rendering=null,l.tail=null,l.lastEffect=null),j(U,U.current),r)break;return null;case 22:case 23:return t.lanes=0,Sc(e,t,n)}return tt(e,t,n)}var zc,pi,Lc,Ic;zc=function(e,t){for(var n=t.child;n!==null;){if(n.tag===5||n.tag===6)e.appendChild(n.stateNode);else if(n.tag!==4&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===t)break;for(;n.sibling===null;){if(n.return===null||n.return===t)return;n=n.return}n.sibling.return=n.return,n=n.sibling}};pi=function(){};Lc=function(e,t,n,r){var l=e.memoizedProps;if(l!==r){e=t.stateNode,Rt(Qe.current);var o=null;switch(n){case"input":l=Ro(e,l),r=Ro(e,r),o=[];break;case"select":l=V({},l,{value:void 0}),r=V({},r,{value:void 0}),o=[];break;case"textarea":l=jo(e,l),r=jo(e,r),o=[];break;default:typeof l.onClick!="function"&&typeof r.onClick=="function"&&(e.onclick=sl)}Bo(n,r);var i;n=null;for(p in l)if(!r.hasOwnProperty(p)&&l.hasOwnProperty(p)&&l[p]!=null)if(p==="style"){var a=l[p];for(i in a)a.hasOwnProperty(i)&&(n||(n={}),n[i]="")}else p!=="dangerouslySetInnerHTML"&&p!=="children"&&p!=="suppressContentEditableWarning"&&p!=="suppressHydrationWarning"&&p!=="autoFocus"&&(Yn.hasOwnProperty(p)?o||(o=[]):(o=o||[]).push(p,null));for(p in r){var s=r[p];if(a=l?.[p],r.hasOwnProperty(p)&&s!==a&&(s!=null||a!=null))if(p==="style")if(a){for(i in a)!a.hasOwnProperty(i)||s&&s.hasOwnProperty(i)||(n||(n={}),n[i]="");for(i in s)s.hasOwnProperty(i)&&a[i]!==s[i]&&(n||(n={}),n[i]=s[i])}else n||(o||(o=[]),o.push(p,n)),n=s;else p==="dangerouslySetInnerHTML"?(s=s?s.__html:void 0,a=a?a.__html:void 0,s!=null&&a!==s&&(o=o||[]).push(p,s)):p==="children"?typeof s!="string"&&typeof s!="number"||(o=o||[]).push(p,""+s):p!=="suppressContentEditableWarning"&&p!=="suppressHydrationWarning"&&(Yn.hasOwnProperty(p)?(s!=null&&p==="onScroll"&&F("scroll",e),o||a===s||(o=[])):(o=o||[]).push(p,s))}n&&(o=o||[]).push("style",n);var p=o;(t.updateQueue=p)&&(t.flags|=4)}};Ic=function(e,t,n,r){n!==r&&(t.flags|=4)};function In(e,t){if(!W)switch(e.tailMode){case"hidden":t=e.tail;for(var n=null;t!==null;)t.alternate!==null&&(n=t),t=t.sibling;n===null?e.tail=null:n.sibling=null;break;case"collapsed":n=e.tail;for(var r=null;n!==null;)n.alternate!==null&&(r=n),n=n.sibling;r===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:r.sibling=null}}function oe(e){var t=e.alternate!==null&&e.alternate.child===e.child,n=0,r=0;if(t)for(var l=e.child;l!==null;)n|=l.lanes|l.childLanes,r|=l.subtreeFlags&14680064,r|=l.flags&14680064,l.return=e,l=l.sibling;else for(l=e.child;l!==null;)n|=l.lanes|l.childLanes,r|=l.subtreeFlags,r|=l.flags,l.return=e,l=l.sibling;return e.subtreeFlags|=r,e.childLanes=n,t}function kf(e,t,n){var r=t.pendingProps;switch(Fi(t),t.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return oe(t),null;case 1:return ge(t.type)&&ul(),oe(t),null;case 3:return r=t.stateNode,hn(),B(me),B(ae),Yi(),r.pendingContext&&(r.context=r.pendingContext,r.pendingContext=null),(e===null||e.child===null)&&(Wr(t)?t.flags|=4:e===null||e.memoizedState.isDehydrated&&(t.flags&256)===0||(t.flags|=1024,De!==null&&(xi(De),De=null))),pi(e,t),oe(t),null;case 5:Qi(t);var l=Rt(lr.current);if(n=t.type,e!==null&&t.stateNode!=null)Lc(e,t,n,r,l),e.ref!==t.ref&&(t.flags|=512,t.flags|=2097152);else{if(!r){if(t.stateNode===null)throw Error(x(166));return oe(t),null}if(e=Rt(Qe.current),Wr(t)){r=t.stateNode,n=t.type;var o=t.memoizedProps;switch(r[He]=t,r[nr]=o,e=(t.mode&1)!==0,n){case"dialog":F("cancel",r),F("close",r);break;case"iframe":case"object":case"embed":F("load",r);break;case"video":case"audio":for(l=0;l<jn.length;l++)F(jn[l],r);break;case"source":F("error",r);break;case"img":case"image":case"link":F("error",r),F("load",r);break;case"details":F("toggle",r);break;case"input":Ka(r,o),F("invalid",r);break;case"select":r._wrapperState={wasMultiple:!!o.multiple},F("invalid",r);break;case"textarea":Xa(r,o),F("invalid",r)}Bo(n,o),l=null;for(var i in o)if(o.hasOwnProperty(i)){var a=o[i];i==="children"?typeof a=="string"?r.textContent!==a&&(o.suppressHydrationWarning!==!0&&Br(r.textContent,a,e),l=["children",a]):typeof a=="number"&&r.textContent!==""+a&&(o.suppressHydrationWarning!==!0&&Br(r.textContent,a,e),l=["children",""+a]):Yn.hasOwnProperty(i)&&a!=null&&i==="onScroll"&&F("scroll",r)}switch(n){case"input":Er(r),Ga(r,o,!0);break;case"textarea":Er(r),Za(r);break;case"select":case"option":break;default:typeof o.onClick=="function"&&(r.onclick=sl)}r=l,t.updateQueue=r,r!==null&&(t.flags|=4)}else{i=l.nodeType===9?l:l.ownerDocument,e==="http://www.w3.org/1999/xhtml"&&(e=lu(n)),e==="http://www.w3.org/1999/xhtml"?n==="script"?(e=i.createElement("div"),e.innerHTML="<script><\/script>",e=e.removeChild(e.firstChild)):typeof r.is=="string"?e=i.createElement(n,{is:r.is}):(e=i.createElement(n),n==="select"&&(i=e,r.multiple?i.multiple=!0:r.size&&(i.size=r.size))):e=i.createElementNS(e,n),e[He]=t,e[nr]=r,zc(e,t,!1,!1),t.stateNode=e;e:{switch(i=Wo(n,r),n){case"dialog":F("cancel",e),F("close",e),l=r;break;case"iframe":case"object":case"embed":F("load",e),l=r;break;case"video":case"audio":for(l=0;l<jn.length;l++)F(jn[l],e);l=r;break;case"source":F("error",e),l=r;break;case"img":case"image":case"link":F("error",e),F("load",e),l=r;break;case"details":F("toggle",e),l=r;break;case"input":Ka(e,r),l=Ro(e,r),F("invalid",e);break;case"option":l=r;break;case"select":e._wrapperState={wasMultiple:!!r.multiple},l=V({},r,{value:void 0}),F("invalid",e);break;case"textarea":Xa(e,r),l=jo(e,r),F("invalid",e);break;default:l=r}Bo(n,l),a=l;for(o in a)if(a.hasOwnProperty(o)){var s=a[o];o==="style"?au(e,s):o==="dangerouslySetInnerHTML"?(s=s?s.__html:void 0,s!=null&&ou(e,s)):o==="children"?typeof s=="string"?(n!=="textarea"||s!=="")&&Kn(e,s):typeof s=="number"&&Kn(e,""+s):o!=="suppressContentEditableWarning"&&o!=="suppressHydrationWarning"&&o!=="autoFocus"&&(Yn.hasOwnProperty(o)?s!=null&&o==="onScroll"&&F("scroll",e):s!=null&&_i(e,o,s,i))}switch(n){case"input":Er(e),Ga(e,r,!1);break;case"textarea":Er(e),Za(e);break;case"option":r.value!=null&&e.setAttribute("value",""+wt(r.value));break;case"select":e.multiple=!!r.multiple,o=r.value,o!=null?on(e,!!r.multiple,o,!1):r.defaultValue!=null&&on(e,!!r.multiple,r.defaultValue,!0);break;default:typeof l.onClick=="function"&&(e.onclick=sl)}switch(n){case"button":case"input":case"select":case"textarea":r=!!r.autoFocus;break e;case"img":r=!0;break e;default:r=!1}}r&&(t.flags|=4)}t.ref!==null&&(t.flags|=512,t.flags|=2097152)}return oe(t),null;case 6:if(e&&t.stateNode!=null)Ic(e,t,e.memoizedProps,r);else{if(typeof r!="string"&&t.stateNode===null)throw Error(x(166));if(n=Rt(lr.current),Rt(Qe.current),Wr(t)){if(r=t.stateNode,n=t.memoizedProps,r[He]=t,(o=r.nodeValue!==n)&&(e=xe,e!==null))switch(e.tag){case 3:Br(r.nodeValue,n,(e.mode&1)!==0);break;case 5:e.memoizedProps.suppressHydrationWarning!==!0&&Br(r.nodeValue,n,(e.mode&1)!==0)}o&&(t.flags|=4)}else r=(n.nodeType===9?n:n.ownerDocument).createTextNode(r),r[He]=t,t.stateNode=r}return oe(t),null;case 13:if(B(U),r=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(W&&ye!==null&&(t.mode&1)!==0&&(t.flags&128)===0)Gu(),mn(),t.flags|=98560,o=!1;else if(o=Wr(t),r!==null&&r.dehydrated!==null){if(e===null){if(!o)throw Error(x(318));if(o=t.memoizedState,o=o!==null?o.dehydrated:null,!o)throw Error(x(317));o[He]=t}else mn(),(t.flags&128)===0&&(t.memoizedState=null),t.flags|=4;oe(t),o=!1}else De!==null&&(xi(De),De=null),o=!0;if(!o)return t.flags&65536?t:null}return(t.flags&128)!==0?(t.lanes=n,t):(r=r!==null,r!==(e!==null&&e.memoizedState!==null)&&r&&(t.child.flags|=8192,(t.mode&1)!==0&&(e===null||(U.current&1)!==0?K===0&&(K=3):la())),t.updateQueue!==null&&(t.flags|=4),oe(t),null);case 4:return hn(),pi(e,t),e===null&&er(t.stateNode.containerInfo),oe(t),null;case 10:return Ai(t.type._context),oe(t),null;case 17:return ge(t.type)&&ul(),oe(t),null;case 19:if(B(U),o=t.memoizedState,o===null)return oe(t),null;if(r=(t.flags&128)!==0,i=o.rendering,i===null)if(r)In(o,!1);else{if(K!==0||e!==null&&(e.flags&128)!==0)for(e=t.child;e!==null;){if(i=hl(e),i!==null){for(t.flags|=128,In(o,!1),r=i.updateQueue,r!==null&&(t.updateQueue=r,t.flags|=4),t.subtreeFlags=0,r=n,n=t.child;n!==null;)o=n,e=r,o.flags&=14680066,i=o.alternate,i===null?(o.childLanes=0,o.lanes=e,o.child=null,o.subtreeFlags=0,o.memoizedProps=null,o.memoizedState=null,o.updateQueue=null,o.dependencies=null,o.stateNode=null):(o.childLanes=i.childLanes,o.lanes=i.lanes,o.child=i.child,o.subtreeFlags=0,o.deletions=null,o.memoizedProps=i.memoizedProps,o.memoizedState=i.memoizedState,o.updateQueue=i.updateQueue,o.type=i.type,e=i.dependencies,o.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),n=n.sibling;return j(U,U.current&1|2),t.child}e=e.sibling}o.tail!==null&&$()>yn&&(t.flags|=128,r=!0,In(o,!1),t.lanes=4194304)}else{if(!r)if(e=hl(i),e!==null){if(t.flags|=128,r=!0,n=e.updateQueue,n!==null&&(t.updateQueue=n,t.flags|=4),In(o,!0),o.tail===null&&o.tailMode==="hidden"&&!i.alternate&&!W)return oe(t),null}else 2*$()-o.renderingStartTime>yn&&n!==1073741824&&(t.flags|=128,r=!0,In(o,!1),t.lanes=4194304);o.isBackwards?(i.sibling=t.child,t.child=i):(n=o.last,n!==null?n.sibling=i:t.child=i,o.last=i)}return o.tail!==null?(t=o.tail,o.rendering=t,o.tail=t.sibling,o.renderingStartTime=$(),t.sibling=null,n=U.current,j(U,r?n&1|2:n&1),t):(oe(t),null);case 22:case 23:return ra(),r=t.memoizedState!==null,e!==null&&e.memoizedState!==null!==r&&(t.flags|=8192),r&&(t.mode&1)!==0?(ve&1073741824)!==0&&(oe(t),t.subtreeFlags&6&&(t.flags|=8192)):oe(t),null;case 24:return null;case 25:return null}throw Error(x(156,t.tag))}function _f(e,t){switch(Fi(t),t.tag){case 1:return ge(t.type)&&ul(),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return hn(),B(me),B(ae),Yi(),e=t.flags,(e&65536)!==0&&(e&128)===0?(t.flags=e&-65537|128,t):null;case 5:return Qi(t),null;case 13:if(B(U),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(x(340));mn()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return B(U),null;case 4:return hn(),null;case 10:return Ai(t.type._context),null;case 22:case 23:return ra(),null;case 24:return null;default:return null}}var Vr=!1,ie=!1,Sf=typeof WeakSet=="function"?WeakSet:Set,E=null;function rn(e,t){var n=e.ref;if(n!==null)if(typeof n=="function")try{n(null)}catch(r){H(e,t,r)}else n.current=null}function di(e,t,n){try{n()}catch(r){H(e,t,r)}}var Us=!1;function Nf(e,t){if(Xo=ol,e=Du(),Di(e)){if("selectionStart"in e)var n={start:e.selectionStart,end:e.selectionEnd};else e:{n=(n=e.ownerDocument)&&n.defaultView||window;var r=n.getSelection&&n.getSelection();if(r&&r.rangeCount!==0){n=r.anchorNode;var l=r.anchorOffset,o=r.focusNode;r=r.focusOffset;try{n.nodeType,o.nodeType}catch{n=null;break e}var i=0,a=-1,s=-1,p=0,v=0,f=e,m=null;t:for(;;){for(var w;f!==n||l!==0&&f.nodeType!==3||(a=i+l),f!==o||r!==0&&f.nodeType!==3||(s=i+r),f.nodeType===3&&(i+=f.nodeValue.length),(w=f.firstChild)!==null;)m=f,f=w;for(;;){if(f===e)break t;if(m===n&&++p===l&&(a=i),m===o&&++v===r&&(s=i),(w=f.nextSibling)!==null)break;f=m,m=f.parentNode}f=w}n=a===-1||s===-1?null:{start:a,end:s}}else n=null}n=n||{start:0,end:0}}else n=null;for(Zo={focusedElem:e,selectionRange:n},ol=!1,E=t;E!==null;)if(t=E,e=t.child,(t.subtreeFlags&1028)!==0&&e!==null)e.return=t,E=e;else for(;E!==null;){t=E;try{var _=t.alternate;if((t.flags&1024)!==0)switch(t.tag){case 0:case 11:case 15:break;case 1:if(_!==null){var N=_.memoizedProps,O=_.memoizedState,u=t.stateNode,c=u.getSnapshotBeforeUpdate(t.elementType===t.type?N:Re(t.type,N),O);u.__reactInternalSnapshotBeforeUpdate=c}break;case 3:var d=t.stateNode.containerInfo;d.nodeType===1?d.textContent="":d.nodeType===9&&d.documentElement&&d.removeChild(d.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(x(163))}}catch(h){H(t,t.return,h)}if(e=t.sibling,e!==null){e.return=t.return,E=e;break}E=t.return}return _=Us,Us=!1,_}function Hn(e,t,n){var r=t.updateQueue;if(r=r!==null?r.lastEffect:null,r!==null){var l=r=r.next;do{if((l.tag&e)===e){var o=l.destroy;l.destroy=void 0,o!==void 0&&di(t,n,o)}l=l.next}while(l!==r)}}function Tl(e,t){if(t=t.updateQueue,t=t!==null?t.lastEffect:null,t!==null){var n=t=t.next;do{if((n.tag&e)===e){var r=n.create;n.destroy=r()}n=n.next}while(n!==t)}}function fi(e){var t=e.ref;if(t!==null){var n=e.stateNode;e.tag,e=n,typeof t=="function"?t(e):t.current=e}}function Mc(e){var t=e.alternate;t!==null&&(e.alternate=null,Mc(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&(delete t[He],delete t[nr],delete t[Jo],delete t[of],delete t[af])),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}function Tc(e){return e.tag===5||e.tag===3||e.tag===4}function As(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||Tc(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function mi(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.nodeType===8?n.parentNode.insertBefore(e,t):n.insertBefore(e,t):(n.nodeType===8?(t=n.parentNode,t.insertBefore(e,n)):(t=n,t.appendChild(e)),n=n._reactRootContainer,n!=null||t.onclick!==null||(t.onclick=sl));else if(r!==4&&(e=e.child,e!==null))for(mi(e,t,n),e=e.sibling;e!==null;)mi(e,t,n),e=e.sibling}function gi(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.insertBefore(e,t):n.appendChild(e);else if(r!==4&&(e=e.child,e!==null))for(gi(e,t,n),e=e.sibling;e!==null;)gi(e,t,n),e=e.sibling}var ee=null,Oe=!1;function ot(e,t,n){for(n=n.child;n!==null;)Rc(e,t,n),n=n.sibling}function Rc(e,t,n){if($e&&typeof $e.onCommitFiberUnmount=="function")try{$e.onCommitFiberUnmount(Nl,n)}catch{}switch(n.tag){case 5:ie||rn(n,t);case 6:var r=ee,l=Oe;ee=null,ot(e,t,n),ee=r,Oe=l,ee!==null&&(Oe?(e=ee,n=n.stateNode,e.nodeType===8?e.parentNode.removeChild(n):e.removeChild(n)):ee.removeChild(n.stateNode));break;case 18:ee!==null&&(Oe?(e=ee,n=n.stateNode,e.nodeType===8?yo(e.parentNode,n):e.nodeType===1&&yo(e,n),qn(e)):yo(ee,n.stateNode));break;case 4:r=ee,l=Oe,ee=n.stateNode.containerInfo,Oe=!0,ot(e,t,n),ee=r,Oe=l;break;case 0:case 11:case 14:case 15:if(!ie&&(r=n.updateQueue,r!==null&&(r=r.lastEffect,r!==null))){l=r=r.next;do{var o=l,i=o.destroy;o=o.tag,i!==void 0&&((o&2)!==0||(o&4)!==0)&&di(n,t,i),l=l.next}while(l!==r)}ot(e,t,n);break;case 1:if(!ie&&(rn(n,t),r=n.stateNode,typeof r.componentWillUnmount=="function"))try{r.props=n.memoizedProps,r.state=n.memoizedState,r.componentWillUnmount()}catch(a){H(n,t,a)}ot(e,t,n);break;case 21:ot(e,t,n);break;case 22:n.mode&1?(ie=(r=ie)||n.memoizedState!==null,ot(e,t,n),ie=r):ot(e,t,n);break;default:ot(e,t,n)}}function Vs(e){var t=e.updateQueue;if(t!==null){e.updateQueue=null;var n=e.stateNode;n===null&&(n=e.stateNode=new Sf),t.forEach(function(r){var l=Rf.bind(null,e,r);n.has(r)||(n.add(r),r.then(l,l))})}}function Te(e,t){var n=t.deletions;if(n!==null)for(var r=0;r<n.length;r++){var l=n[r];try{var o=e,i=t,a=i;e:for(;a!==null;){switch(a.tag){case 5:ee=a.stateNode,Oe=!1;break e;case 3:ee=a.stateNode.containerInfo,Oe=!0;break e;case 4:ee=a.stateNode.containerInfo,Oe=!0;break e}a=a.return}if(ee===null)throw Error(x(160));Rc(o,i,l),ee=null,Oe=!1;var s=l.alternate;s!==null&&(s.return=null),l.return=null}catch(p){H(l,t,p)}}if(t.subtreeFlags&12854)for(t=t.child;t!==null;)Oc(t,e),t=t.sibling}function Oc(e,t){var n=e.alternate,r=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if(Te(t,e),Ae(e),r&4){try{Hn(3,e,e.return),Tl(3,e)}catch(N){H(e,e.return,N)}try{Hn(5,e,e.return)}catch(N){H(e,e.return,N)}}break;case 1:Te(t,e),Ae(e),r&512&&n!==null&&rn(n,n.return);break;case 5:if(Te(t,e),Ae(e),r&512&&n!==null&&rn(n,n.return),e.flags&32){var l=e.stateNode;try{Kn(l,"")}catch(N){H(e,e.return,N)}}if(r&4&&(l=e.stateNode,l!=null)){var o=e.memoizedProps,i=n!==null?n.memoizedProps:o,a=e.type,s=e.updateQueue;if(e.updateQueue=null,s!==null)try{a==="input"&&o.type==="radio"&&o.name!=null&&nu(l,o),Wo(a,i);var p=Wo(a,o);for(i=0;i<s.length;i+=2){var v=s[i],f=s[i+1];v==="style"?au(l,f):v==="dangerouslySetInnerHTML"?ou(l,f):v==="children"?Kn(l,f):_i(l,v,f,p)}switch(a){case"input":Oo(l,o);break;case"textarea":ru(l,o);break;case"select":var m=l._wrapperState.wasMultiple;l._wrapperState.wasMultiple=!!o.multiple;var w=o.value;w!=null?on(l,!!o.multiple,w,!1):m!==!!o.multiple&&(o.defaultValue!=null?on(l,!!o.multiple,o.defaultValue,!0):on(l,!!o.multiple,o.multiple?[]:"",!1))}l[nr]=o}catch(N){H(e,e.return,N)}}break;case 6:if(Te(t,e),Ae(e),r&4){if(e.stateNode===null)throw Error(x(162));l=e.stateNode,o=e.memoizedProps;try{l.nodeValue=o}catch(N){H(e,e.return,N)}}break;case 3:if(Te(t,e),Ae(e),r&4&&n!==null&&n.memoizedState.isDehydrated)try{qn(t.containerInfo)}catch(N){H(e,e.return,N)}break;case 4:Te(t,e),Ae(e);break;case 13:Te(t,e),Ae(e),l=e.child,l.flags&8192&&(o=l.memoizedState!==null,l.stateNode.isHidden=o,!o||l.alternate!==null&&l.alternate.memoizedState!==null||(ta=$())),r&4&&Vs(e);break;case 22:if(v=n!==null&&n.memoizedState!==null,e.mode&1?(ie=(p=ie)||v,Te(t,e),ie=p):Te(t,e),Ae(e),r&8192){if(p=e.memoizedState!==null,(e.stateNode.isHidden=p)&&!v&&(e.mode&1)!==0)for(E=e,v=e.child;v!==null;){for(f=E=v;E!==null;){switch(m=E,w=m.child,m.tag){case 0:case 11:case 14:case 15:Hn(4,m,m.return);break;case 1:rn(m,m.return);var _=m.stateNode;if(typeof _.componentWillUnmount=="function"){r=m,n=m.return;try{t=r,_.props=t.memoizedProps,_.state=t.memoizedState,_.componentWillUnmount()}catch(N){H(r,n,N)}}break;case 5:rn(m,m.return);break;case 22:if(m.memoizedState!==null){$s(f);continue}}w!==null?(w.return=m,E=w):$s(f)}v=v.sibling}e:for(v=null,f=e;;){if(f.tag===5){if(v===null){v=f;try{l=f.stateNode,p?(o=l.style,typeof o.setProperty=="function"?o.setProperty("display","none","important"):o.display="none"):(a=f.stateNode,s=f.memoizedProps.style,i=s!=null&&s.hasOwnProperty("display")?s.display:null,a.style.display=iu("display",i))}catch(N){H(e,e.return,N)}}}else if(f.tag===6){if(v===null)try{f.stateNode.nodeValue=p?"":f.memoizedProps}catch(N){H(e,e.return,N)}}else if((f.tag!==22&&f.tag!==23||f.memoizedState===null||f===e)&&f.child!==null){f.child.return=f,f=f.child;continue}if(f===e)break e;for(;f.sibling===null;){if(f.return===null||f.return===e)break e;v===f&&(v=null),f=f.return}v===f&&(v=null),f.sibling.return=f.return,f=f.sibling}}break;case 19:Te(t,e),Ae(e),r&4&&Vs(e);break;case 21:break;default:Te(t,e),Ae(e)}}function Ae(e){var t=e.flags;if(t&2){try{e:{for(var n=e.return;n!==null;){if(Tc(n)){var r=n;break e}n=n.return}throw Error(x(160))}switch(r.tag){case 5:var l=r.stateNode;r.flags&32&&(Kn(l,""),r.flags&=-33);var o=As(e);gi(e,o,l);break;case 3:case 4:var i=r.stateNode.containerInfo,a=As(e);mi(e,a,i);break;default:throw Error(x(161))}}catch(s){H(e,e.return,s)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function Cf(e,t,n){E=e,Dc(e,t,n)}function Dc(e,t,n){for(var r=(e.mode&1)!==0;E!==null;){var l=E,o=l.child;if(l.tag===22&&r){var i=l.memoizedState!==null||Vr;if(!i){var a=l.alternate,s=a!==null&&a.memoizedState!==null||ie;a=Vr;var p=ie;if(Vr=i,(ie=s)&&!p)for(E=l;E!==null;)i=E,s=i.child,i.tag===22&&i.memoizedState!==null?Qs(l):s!==null?(s.return=i,E=s):Qs(l);for(;o!==null;)E=o,Dc(o,t,n),o=o.sibling;E=l,Vr=a,ie=p}Hs(e,t,n)}else(l.subtreeFlags&8772)!==0&&o!==null?(o.return=l,E=o):Hs(e,t,n)}}function Hs(e){for(;E!==null;){var t=E;if((t.flags&8772)!==0){var n=t.alternate;try{if((t.flags&8772)!==0)switch(t.tag){case 0:case 11:case 15:ie||Tl(5,t);break;case 1:var r=t.stateNode;if(t.flags&4&&!ie)if(n===null)r.componentDidMount();else{var l=t.elementType===t.type?n.memoizedProps:Re(t.type,n.memoizedProps);r.componentDidUpdate(l,n.memoizedState,r.__reactInternalSnapshotBeforeUpdate)}var o=t.updateQueue;o!==null&&Ps(t,o,r);break;case 3:var i=t.updateQueue;if(i!==null){if(n=null,t.child!==null)switch(t.child.tag){case 5:n=t.child.stateNode;break;case 1:n=t.child.stateNode}Ps(t,i,n)}break;case 5:var a=t.stateNode;if(n===null&&t.flags&4){n=a;var s=t.memoizedProps;switch(t.type){case"button":case"input":case"select":case"textarea":s.autoFocus&&n.focus();break;case"img":s.src&&(n.src=s.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(t.memoizedState===null){var p=t.alternate;if(p!==null){var v=p.memoizedState;if(v!==null){var f=v.dehydrated;f!==null&&qn(f)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(x(163))}ie||t.flags&512&&fi(t)}catch(m){H(t,t.return,m)}}if(t===e){E=null;break}if(n=t.sibling,n!==null){n.return=t.return,E=n;break}E=t.return}}function $s(e){for(;E!==null;){var t=E;if(t===e){E=null;break}var n=t.sibling;if(n!==null){n.return=t.return,E=n;break}E=t.return}}function Qs(e){for(;E!==null;){var t=E;try{switch(t.tag){case 0:case 11:case 15:var n=t.return;try{Tl(4,t)}catch(s){H(t,n,s)}break;case 1:var r=t.stateNode;if(typeof r.componentDidMount=="function"){var l=t.return;try{r.componentDidMount()}catch(s){H(t,l,s)}}var o=t.return;try{fi(t)}catch(s){H(t,o,s)}break;case 5:var i=t.return;try{fi(t)}catch(s){H(t,i,s)}}}catch(s){H(t,t.return,s)}if(t===e){E=null;break}var a=t.sibling;if(a!==null){a.return=t.return,E=a;break}E=t.return}}var Ef=Math.ceil,xl=nt.ReactCurrentDispatcher,Ji=nt.ReactCurrentOwner,ze=nt.ReactCurrentBatchConfig,M=0,q=null,Q=null,te=0,ve=0,ln=St(0),K=0,sr=null,Wt=0,Rl=0,ea=0,$n=null,de=null,ta=0,yn=1/0,Ke=null,wl=!1,hi=null,vt=null,Hr=!1,pt=null,kl=0,Qn=0,vi=null,qr=-1,br=0;function ce(){return(M&6)!==0?$():qr!==-1?qr:qr=$()}function yt(e){return(e.mode&1)===0?1:(M&2)!==0&&te!==0?te&-te:uf.transition!==null?(br===0&&(br=xu()),br):(e=R,e!==0||(e=window.event,e=e===void 0?16:Eu(e.type)),e)}function Fe(e,t,n,r){if(50<Qn)throw Qn=0,vi=null,Error(x(185));ur(e,n,r),((M&2)===0||e!==q)&&(e===q&&((M&2)===0&&(Rl|=n),K===4&&ut(e,te)),he(e,r),n===1&&M===0&&(t.mode&1)===0&&(yn=$()+500,Ll&&Nt()))}function he(e,t){var n=e.callbackNode;cd(e,t);var r=ll(e,e===q?te:0);if(r===0)n!==null&&Ja(n),e.callbackNode=null,e.callbackPriority=0;else if(t=r&-r,e.callbackPriority!==t){if(n!=null&&Ja(n),t===1)e.tag===0?sf(Ys.bind(null,e)):Qu(Ys.bind(null,e)),rf(function(){(M&6)===0&&Nt()}),n=null;else{switch(wu(r)){case 1:n=Pi;break;case 4:n=vu;break;case 16:n=rl;break;case 536870912:n=yu;break;default:n=rl}n=Hc(n,jc.bind(null,e))}e.callbackPriority=t,e.callbackNode=n}}function jc(e,t){if(qr=-1,br=0,(M&6)!==0)throw Error(x(327));var n=e.callbackNode;if(pn()&&e.callbackNode!==n)return null;var r=ll(e,e===q?te:0);if(r===0)return null;if((r&30)!==0||(r&e.expiredLanes)!==0||t)t=_l(e,r);else{t=r;var l=M;M|=2;var o=Bc();(q!==e||te!==t)&&(Ke=null,yn=$()+500,Ot(e,t));do try{Lf();break}catch(a){Fc(e,a)}while(!0);Ui(),xl.current=o,M=l,Q!==null?t=0:(q=null,te=0,t=K)}if(t!==0){if(t===2&&(l=$o(e),l!==0&&(r=l,t=yi(e,l))),t===1)throw n=sr,Ot(e,0),ut(e,r),he(e,$()),n;if(t===6)ut(e,r);else{if(l=e.current.alternate,(r&30)===0&&!Pf(l)&&(t=_l(e,r),t===2&&(o=$o(e),o!==0&&(r=o,t=yi(e,o))),t===1))throw n=sr,Ot(e,0),ut(e,r),he(e,$()),n;switch(e.finishedWork=l,e.finishedLanes=r,t){case 0:case 1:throw Error(x(345));case 2:It(e,de,Ke);break;case 3:if(ut(e,r),(r&130023424)===r&&(t=ta+500-$(),10<t)){if(ll(e,0)!==0)break;if(l=e.suspendedLanes,(l&r)!==r){ce(),e.pingedLanes|=e.suspendedLanes&l;break}e.timeoutHandle=bo(It.bind(null,e,de,Ke),t);break}It(e,de,Ke);break;case 4:if(ut(e,r),(r&4194240)===r)break;for(t=e.eventTimes,l=-1;0<r;){var i=31-je(r);o=1<<i,i=t[i],i>l&&(l=i),r&=~o}if(r=l,r=$()-r,r=(120>r?120:480>r?480:1080>r?1080:1920>r?1920:3e3>r?3e3:4320>r?4320:1960*Ef(r/1960))-r,10<r){e.timeoutHandle=bo(It.bind(null,e,de,Ke),r);break}It(e,de,Ke);break;case 5:It(e,de,Ke);break;default:throw Error(x(329))}}}return he(e,$()),e.callbackNode===n?jc.bind(null,e):null}function yi(e,t){var n=$n;return e.current.memoizedState.isDehydrated&&(Ot(e,t).flags|=256),e=_l(e,t),e!==2&&(t=de,de=n,t!==null&&xi(t)),e}function xi(e){de===null?de=e:de.push.apply(de,e)}function Pf(e){for(var t=e;;){if(t.flags&16384){var n=t.updateQueue;if(n!==null&&(n=n.stores,n!==null))for(var r=0;r<n.length;r++){var l=n[r],o=l.getSnapshot;l=l.value;try{if(!Be(o(),l))return!1}catch{return!1}}}if(n=t.child,t.subtreeFlags&16384&&n!==null)n.return=t,t=n;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function ut(e,t){for(t&=~ea,t&=~Rl,e.suspendedLanes|=t,e.pingedLanes&=~t,e=e.expirationTimes;0<t;){var n=31-je(t),r=1<<n;e[n]=-1,t&=~r}}function Ys(e){if((M&6)!==0)throw Error(x(327));pn();var t=ll(e,0);if((t&1)===0)return he(e,$()),null;var n=_l(e,t);if(e.tag!==0&&n===2){var r=$o(e);r!==0&&(t=r,n=yi(e,r))}if(n===1)throw n=sr,Ot(e,0),ut(e,t),he(e,$()),n;if(n===6)throw Error(x(345));return e.finishedWork=e.current.alternate,e.finishedLanes=t,It(e,de,Ke),he(e,$()),null}function na(e,t){var n=M;M|=1;try{return e(t)}finally{M=n,M===0&&(yn=$()+500,Ll&&Nt())}}function Ut(e){pt!==null&&pt.tag===0&&(M&6)===0&&pn();var t=M;M|=1;var n=ze.transition,r=R;try{if(ze.transition=null,R=1,e)return e()}finally{R=r,ze.transition=n,M=t,(M&6)===0&&Nt()}}function ra(){ve=ln.current,B(ln)}function Ot(e,t){e.finishedWork=null,e.finishedLanes=0;var n=e.timeoutHandle;if(n!==-1&&(e.timeoutHandle=-1,nf(n)),Q!==null)for(n=Q.return;n!==null;){var r=n;switch(Fi(r),r.tag){case 1:r=r.type.childContextTypes,r!=null&&ul();break;case 3:hn(),B(me),B(ae),Yi();break;case 5:Qi(r);break;case 4:hn();break;case 13:B(U);break;case 19:B(U);break;case 10:Ai(r.type._context);break;case 22:case 23:ra()}n=n.return}if(q=e,Q=e=xt(e.current,null),te=ve=t,K=0,sr=null,ea=Rl=Wt=0,de=$n=null,Tt!==null){for(t=0;t<Tt.length;t++)if(n=Tt[t],r=n.interleaved,r!==null){n.interleaved=null;var l=r.next,o=n.pending;if(o!==null){var i=o.next;o.next=l,r.next=i}n.pending=r}Tt=null}return e}function Fc(e,t){do{var n=Q;try{if(Ui(),Gr.current=yl,vl){for(var r=A.memoizedState;r!==null;){var l=r.queue;l!==null&&(l.pending=null),r=r.next}vl=!1}if(Bt=0,Z=Y=A=null,Vn=!1,or=0,Ji.current=null,n===null||n.return===null){K=1,sr=t,Q=null;break}e:{var o=e,i=n.return,a=n,s=t;if(t=te,a.flags|=32768,s!==null&&typeof s=="object"&&typeof s.then=="function"){var p=s,v=a,f=v.tag;if((v.mode&1)===0&&(f===0||f===11||f===15)){var m=v.alternate;m?(v.updateQueue=m.updateQueue,v.memoizedState=m.memoizedState,v.lanes=m.lanes):(v.updateQueue=null,v.memoizedState=null)}var w=Rs(i);if(w!==null){w.flags&=-257,Os(w,i,a,o,t),w.mode&1&&Ts(o,p,t),t=w,s=p;var _=t.updateQueue;if(_===null){var N=new Set;N.add(s),t.updateQueue=N}else _.add(s);break e}else{if((t&1)===0){Ts(o,p,t),la();break e}s=Error(x(426))}}else if(W&&a.mode&1){var O=Rs(i);if(O!==null){(O.flags&65536)===0&&(O.flags|=256),Os(O,i,a,o,t),Bi(vn(s,a));break e}}o=s=vn(s,a),K!==4&&(K=2),$n===null?$n=[o]:$n.push(o),o=i;do{switch(o.tag){case 3:o.flags|=65536,t&=-t,o.lanes|=t;var u=wc(o,s,t);Es(o,u);break e;case 1:a=s;var c=o.type,d=o.stateNode;if((o.flags&128)===0&&(typeof c.getDerivedStateFromError=="function"||d!==null&&typeof d.componentDidCatch=="function"&&(vt===null||!vt.has(d)))){o.flags|=65536,t&=-t,o.lanes|=t;var h=kc(o,a,t);Es(o,h);break e}}o=o.return}while(o!==null)}Uc(n)}catch(k){t=k,Q===n&&n!==null&&(Q=n=n.return);continue}break}while(!0)}function Bc(){var e=xl.current;return xl.current=yl,e===null?yl:e}function la(){(K===0||K===3||K===2)&&(K=4),q===null||(Wt&268435455)===0&&(Rl&268435455)===0||ut(q,te)}function _l(e,t){var n=M;M|=2;var r=Bc();(q!==e||te!==t)&&(Ke=null,Ot(e,t));do try{zf();break}catch(l){Fc(e,l)}while(!0);if(Ui(),M=n,xl.current=r,Q!==null)throw Error(x(261));return q=null,te=0,K}function zf(){for(;Q!==null;)Wc(Q)}function Lf(){for(;Q!==null&&!td();)Wc(Q)}function Wc(e){var t=Vc(e.alternate,e,ve);e.memoizedProps=e.pendingProps,t===null?Uc(e):Q=t,Ji.current=null}function Uc(e){var t=e;do{var n=t.alternate;if(e=t.return,(t.flags&32768)===0){if(n=kf(n,t,ve),n!==null){Q=n;return}}else{if(n=_f(n,t),n!==null){n.flags&=32767,Q=n;return}if(e!==null)e.flags|=32768,e.subtreeFlags=0,e.deletions=null;else{K=6,Q=null;return}}if(t=t.sibling,t!==null){Q=t;return}Q=t=e}while(t!==null);K===0&&(K=5)}function It(e,t,n){var r=R,l=ze.transition;try{ze.transition=null,R=1,If(e,t,n,r)}finally{ze.transition=l,R=r}return null}function If(e,t,n,r){do pn();while(pt!==null);if((M&6)!==0)throw Error(x(327));n=e.finishedWork;var l=e.finishedLanes;if(n===null)return null;if(e.finishedWork=null,e.finishedLanes=0,n===e.current)throw Error(x(177));e.callbackNode=null,e.callbackPriority=0;var o=n.lanes|n.childLanes;if(pd(e,o),e===q&&(Q=q=null,te=0),(n.subtreeFlags&2064)===0&&(n.flags&2064)===0||Hr||(Hr=!0,Hc(rl,function(){return pn(),null})),o=(n.flags&15990)!==0,(n.subtreeFlags&15990)!==0||o){o=ze.transition,ze.transition=null;var i=R;R=1;var a=M;M|=4,Ji.current=null,Nf(e,n),Oc(n,e),qd(Zo),ol=!!Xo,Zo=Xo=null,e.current=n,Cf(n,e,l),nd(),M=a,R=i,ze.transition=o}else e.current=n;if(Hr&&(Hr=!1,pt=e,kl=l),o=e.pendingLanes,o===0&&(vt=null),od(n.stateNode,r),he(e,$()),t!==null)for(r=e.onRecoverableError,n=0;n<t.length;n++)l=t[n],r(l.value,{componentStack:l.stack,digest:l.digest});if(wl)throw wl=!1,e=hi,hi=null,e;return(kl&1)!==0&&e.tag!==0&&pn(),o=e.pendingLanes,(o&1)!==0?e===vi?Qn++:(Qn=0,vi=e):Qn=0,Nt(),null}function pn(){if(pt!==null){var e=wu(kl),t=ze.transition,n=R;try{if(ze.transition=null,R=16>e?16:e,pt===null)var r=!1;else{if(e=pt,pt=null,kl=0,(M&6)!==0)throw Error(x(331));var l=M;for(M|=4,E=e.current;E!==null;){var o=E,i=o.child;if((E.flags&16)!==0){var a=o.deletions;if(a!==null){for(var s=0;s<a.length;s++){var p=a[s];for(E=p;E!==null;){var v=E;switch(v.tag){case 0:case 11:case 15:Hn(8,v,o)}var f=v.child;if(f!==null)f.return=v,E=f;else for(;E!==null;){v=E;var m=v.sibling,w=v.return;if(Mc(v),v===p){E=null;break}if(m!==null){m.return=w,E=m;break}E=w}}}var _=o.alternate;if(_!==null){var N=_.child;if(N!==null){_.child=null;do{var O=N.sibling;N.sibling=null,N=O}while(N!==null)}}E=o}}if((o.subtreeFlags&2064)!==0&&i!==null)i.return=o,E=i;else e:for(;E!==null;){if(o=E,(o.flags&2048)!==0)switch(o.tag){case 0:case 11:case 15:Hn(9,o,o.return)}var u=o.sibling;if(u!==null){u.return=o.return,E=u;break e}E=o.return}}var c=e.current;for(E=c;E!==null;){i=E;var d=i.child;if((i.subtreeFlags&2064)!==0&&d!==null)d.return=i,E=d;else e:for(i=c;E!==null;){if(a=E,(a.flags&2048)!==0)try{switch(a.tag){case 0:case 11:case 15:Tl(9,a)}}catch(k){H(a,a.return,k)}if(a===i){E=null;break e}var h=a.sibling;if(h!==null){h.return=a.return,E=h;break e}E=a.return}}if(M=l,Nt(),$e&&typeof $e.onPostCommitFiberRoot=="function")try{$e.onPostCommitFiberRoot(Nl,e)}catch{}r=!0}return r}finally{R=n,ze.transition=t}}return!1}function Ks(e,t,n){t=vn(n,t),t=wc(e,t,1),e=ht(e,t,1),t=ce(),e!==null&&(ur(e,1,t),he(e,t))}function H(e,t,n){if(e.tag===3)Ks(e,e,n);else for(;t!==null;){if(t.tag===3){Ks(t,e,n);break}else if(t.tag===1){var r=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof r.componentDidCatch=="function"&&(vt===null||!vt.has(r))){e=vn(n,e),e=kc(t,e,1),t=ht(t,e,1),e=ce(),t!==null&&(ur(t,1,e),he(t,e));break}}t=t.return}}function Mf(e,t,n){var r=e.pingCache;r!==null&&r.delete(t),t=ce(),e.pingedLanes|=e.suspendedLanes&n,q===e&&(te&n)===n&&(K===4||K===3&&(te&130023424)===te&&500>$()-ta?Ot(e,0):ea|=n),he(e,t)}function Ac(e,t){t===0&&((e.mode&1)===0?t=1:(t=Lr,Lr<<=1,(Lr&130023424)===0&&(Lr=4194304)));var n=ce();e=et(e,t),e!==null&&(ur(e,t,n),he(e,n))}function Tf(e){var t=e.memoizedState,n=0;t!==null&&(n=t.retryLane),Ac(e,n)}function Rf(e,t){var n=0;switch(e.tag){case 13:var r=e.stateNode,l=e.memoizedState;l!==null&&(n=l.retryLane);break;case 19:r=e.stateNode;break;default:throw Error(x(314))}r!==null&&r.delete(t),Ac(e,n)}var Vc;Vc=function(e,t,n){if(e!==null)if(e.memoizedProps!==t.pendingProps||me.current)fe=!0;else{if((e.lanes&n)===0&&(t.flags&128)===0)return fe=!1,wf(e,t,n);fe=(e.flags&131072)!==0}else fe=!1,W&&(t.flags&1048576)!==0&&Yu(t,dl,t.index);switch(t.lanes=0,t.tag){case 2:var r=t.type;Zr(e,t),e=t.pendingProps;var l=fn(t,ae.current);cn(t,n),l=Gi(null,t,r,e,l,n);var o=Xi();return t.flags|=1,typeof l=="object"&&l!==null&&typeof l.render=="function"&&l.$$typeof===void 0?(t.tag=1,t.memoizedState=null,t.updateQueue=null,ge(r)?(o=!0,cl(t)):o=!1,t.memoizedState=l.state!==null&&l.state!==void 0?l.state:null,Hi(t),l.updater=Ml,t.stateNode=l,l._reactInternals=t,oi(t,r,e,n),t=si(null,t,r,!0,o,n)):(t.tag=0,W&&o&&ji(t),ue(null,t,l,n),t=t.child),t;case 16:r=t.elementType;e:{switch(Zr(e,t),e=t.pendingProps,l=r._init,r=l(r._payload),t.type=r,l=t.tag=Df(r),e=Re(r,e),l){case 0:t=ai(null,t,r,e,n);break e;case 1:t=Fs(null,t,r,e,n);break e;case 11:t=Ds(null,t,r,e,n);break e;case 14:t=js(null,t,r,Re(r.type,e),n);break e}throw Error(x(306,r,""))}return t;case 0:return r=t.type,l=t.pendingProps,l=t.elementType===r?l:Re(r,l),ai(e,t,r,l,n);case 1:return r=t.type,l=t.pendingProps,l=t.elementType===r?l:Re(r,l),Fs(e,t,r,l,n);case 3:e:{if(Cc(t),e===null)throw Error(x(387));r=t.pendingProps,o=t.memoizedState,l=o.element,bu(e,t),gl(t,r,null,n);var i=t.memoizedState;if(r=i.element,o.isDehydrated)if(o={element:r,isDehydrated:!1,cache:i.cache,pendingSuspenseBoundaries:i.pendingSuspenseBoundaries,transitions:i.transitions},t.updateQueue.baseState=o,t.memoizedState=o,t.flags&256){l=vn(Error(x(423)),t),t=Bs(e,t,r,n,l);break e}else if(r!==l){l=vn(Error(x(424)),t),t=Bs(e,t,r,n,l);break e}else for(ye=gt(t.stateNode.containerInfo.firstChild),xe=t,W=!0,De=null,n=Zu(t,null,r,n),t.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling;else{if(mn(),r===l){t=tt(e,t,n);break e}ue(e,t,r,n)}t=t.child}return t;case 5:return Ju(t),e===null&&ni(t),r=t.type,l=t.pendingProps,o=e!==null?e.memoizedProps:null,i=l.children,qo(r,l)?i=null:o!==null&&qo(r,o)&&(t.flags|=32),Nc(e,t),ue(e,t,i,n),t.child;case 6:return e===null&&ni(t),null;case 13:return Ec(e,t,n);case 4:return $i(t,t.stateNode.containerInfo),r=t.pendingProps,e===null?t.child=gn(t,null,r,n):ue(e,t,r,n),t.child;case 11:return r=t.type,l=t.pendingProps,l=t.elementType===r?l:Re(r,l),Ds(e,t,r,l,n);case 7:return ue(e,t,t.pendingProps,n),t.child;case 8:return ue(e,t,t.pendingProps.children,n),t.child;case 12:return ue(e,t,t.pendingProps.children,n),t.child;case 10:e:{if(r=t.type._context,l=t.pendingProps,o=t.memoizedProps,i=l.value,j(fl,r._currentValue),r._currentValue=i,o!==null)if(Be(o.value,i)){if(o.children===l.children&&!me.current){t=tt(e,t,n);break e}}else for(o=t.child,o!==null&&(o.return=t);o!==null;){var a=o.dependencies;if(a!==null){i=o.child;for(var s=a.firstContext;s!==null;){if(s.context===r){if(o.tag===1){s=qe(-1,n&-n),s.tag=2;var p=o.updateQueue;if(p!==null){p=p.shared;var v=p.pending;v===null?s.next=s:(s.next=v.next,v.next=s),p.pending=s}}o.lanes|=n,s=o.alternate,s!==null&&(s.lanes|=n),ri(o.return,n,t),a.lanes|=n;break}s=s.next}}else if(o.tag===10)i=o.type===t.type?null:o.child;else if(o.tag===18){if(i=o.return,i===null)throw Error(x(341));i.lanes|=n,a=i.alternate,a!==null&&(a.lanes|=n),ri(i,n,t),i=o.sibling}else i=o.child;if(i!==null)i.return=o;else for(i=o;i!==null;){if(i===t){i=null;break}if(o=i.sibling,o!==null){o.return=i.return,i=o;break}i=i.return}o=i}ue(e,t,l.children,n),t=t.child}return t;case 9:return l=t.type,r=t.pendingProps.children,cn(t,n),l=Le(l),r=r(l),t.flags|=1,ue(e,t,r,n),t.child;case 14:return r=t.type,l=Re(r,t.pendingProps),l=Re(r.type,l),js(e,t,r,l,n);case 15:return _c(e,t,t.type,t.pendingProps,n);case 17:return r=t.type,l=t.pendingProps,l=t.elementType===r?l:Re(r,l),Zr(e,t),t.tag=1,ge(r)?(e=!0,cl(t)):e=!1,cn(t,n),xc(t,r,l),oi(t,r,l,n),si(null,t,r,!0,e,n);case 19:return Pc(e,t,n);case 22:return Sc(e,t,n)}throw Error(x(156,t.tag))};function Hc(e,t){return hu(e,t)}function Of(e,t,n,r){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Pe(e,t,n,r){return new Of(e,t,n,r)}function oa(e){return e=e.prototype,!(!e||!e.isReactComponent)}function Df(e){if(typeof e=="function")return oa(e)?1:0;if(e!=null){if(e=e.$$typeof,e===Ni)return 11;if(e===Ci)return 14}return 2}function xt(e,t){var n=e.alternate;return n===null?(n=Pe(e.tag,t,e.key,e.mode),n.elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=e.flags&14680064,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n}function Jr(e,t,n,r,l,o){var i=2;if(r=e,typeof e=="function")oa(e)&&(i=1);else if(typeof e=="string")i=5;else e:switch(e){case Gt:return Dt(n.children,l,o,t);case Si:i=8,l|=8;break;case Lo:return e=Pe(12,n,t,l|2),e.elementType=Lo,e.lanes=o,e;case Io:return e=Pe(13,n,t,l),e.elementType=Io,e.lanes=o,e;case Mo:return e=Pe(19,n,t,l),e.elementType=Mo,e.lanes=o,e;case Js:return Ol(n,l,o,t);default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case qs:i=10;break e;case bs:i=9;break e;case Ni:i=11;break e;case Ci:i=14;break e;case it:i=16,r=null;break e}throw Error(x(130,e==null?e:typeof e,""))}return t=Pe(i,n,t,l),t.elementType=e,t.type=r,t.lanes=o,t}function Dt(e,t,n,r){return e=Pe(7,e,r,t),e.lanes=n,e}function Ol(e,t,n,r){return e=Pe(22,e,r,t),e.elementType=Js,e.lanes=n,e.stateNode={isHidden:!1},e}function Eo(e,t,n){return e=Pe(6,e,null,t),e.lanes=n,e}function Po(e,t,n){return t=Pe(4,e.children!==null?e.children:[],e.key,t),t.lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}function jf(e,t,n,r,l){this.tag=t,this.containerInfo=e,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=uo(0),this.expirationTimes=uo(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=uo(0),this.identifierPrefix=r,this.onRecoverableError=l,this.mutableSourceEagerHydrationData=null}function ia(e,t,n,r,l,o,i,a,s){return e=new jf(e,t,n,a,s),t===1?(t=1,o===!0&&(t|=8)):t=0,o=Pe(3,null,null,t),e.current=o,o.stateNode=e,o.memoizedState={element:r,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null},Hi(o),e}function Ff(e,t,n){var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:Kt,key:r==null?null:""+r,children:e,containerInfo:t,implementation:n}}function $c(e){if(!e)return kt;e=e._reactInternals;e:{if(Vt(e)!==e||e.tag!==1)throw Error(x(170));var t=e;do{switch(t.tag){case 3:t=t.stateNode.context;break e;case 1:if(ge(t.type)){t=t.stateNode.__reactInternalMemoizedMergedChildContext;break e}}t=t.return}while(t!==null);throw Error(x(171))}if(e.tag===1){var n=e.type;if(ge(n))return $u(e,n,t)}return t}function Qc(e,t,n,r,l,o,i,a,s){return e=ia(n,r,!0,e,l,o,i,a,s),e.context=$c(null),n=e.current,r=ce(),l=yt(n),o=qe(r,l),o.callback=t??null,ht(n,o,l),e.current.lanes=l,ur(e,l,r),he(e,r),e}function Dl(e,t,n,r){var l=t.current,o=ce(),i=yt(l);return n=$c(n),t.context===null?t.context=n:t.pendingContext=n,t=qe(o,i),t.payload={element:e},r=r===void 0?null:r,r!==null&&(t.callback=r),e=ht(l,t,i),e!==null&&(Fe(e,l,i,o),Kr(e,l,i)),i}function Sl(e){return e=e.current,e.child?(e.child.tag===5,e.child.stateNode):null}function Gs(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var n=e.retryLane;e.retryLane=n!==0&&n<t?n:t}}function aa(e,t){Gs(e,t),(e=e.alternate)&&Gs(e,t)}function Bf(){return null}var Yc=typeof reportError=="function"?reportError:function(e){console.error(e)};function sa(e){this._internalRoot=e}jl.prototype.render=sa.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(x(409));Dl(e,t,null,null)};jl.prototype.unmount=sa.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;Ut(function(){Dl(null,e,null,null)}),t[Je]=null}};function jl(e){this._internalRoot=e}jl.prototype.unstable_scheduleHydration=function(e){if(e){var t=Su();e={blockedOn:null,target:e,priority:t};for(var n=0;n<st.length&&t!==0&&t<st[n].priority;n++);st.splice(n,0,e),n===0&&Cu(e)}};function ua(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function Fl(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11&&(e.nodeType!==8||e.nodeValue!==" react-mount-point-unstable "))}function Xs(){}function Wf(e,t,n,r,l){if(l){if(typeof r=="function"){var o=r;r=function(){var p=Sl(i);o.call(p)}}var i=Qc(t,r,e,0,null,!1,!1,"",Xs);return e._reactRootContainer=i,e[Je]=i.current,er(e.nodeType===8?e.parentNode:e),Ut(),i}for(;l=e.lastChild;)e.removeChild(l);if(typeof r=="function"){var a=r;r=function(){var p=Sl(s);a.call(p)}}var s=ia(e,0,!1,null,null,!1,!1,"",Xs);return e._reactRootContainer=s,e[Je]=s.current,er(e.nodeType===8?e.parentNode:e),Ut(function(){Dl(t,s,n,r)}),s}function Bl(e,t,n,r,l){var o=n._reactRootContainer;if(o){var i=o;if(typeof l=="function"){var a=l;l=function(){var s=Sl(i);a.call(s)}}Dl(t,i,e,l)}else i=Wf(n,t,e,l,r);return Sl(i)}ku=function(e){switch(e.tag){case 3:var t=e.stateNode;if(t.current.memoizedState.isDehydrated){var n=Dn(t.pendingLanes);n!==0&&(zi(t,n|1),he(t,$()),(M&6)===0&&(yn=$()+500,Nt()))}break;case 13:Ut(function(){var r=et(e,1);if(r!==null){var l=ce();Fe(r,e,1,l)}}),aa(e,1)}};Li=function(e){if(e.tag===13){var t=et(e,134217728);if(t!==null){var n=ce();Fe(t,e,134217728,n)}aa(e,134217728)}};_u=function(e){if(e.tag===13){var t=yt(e),n=et(e,t);if(n!==null){var r=ce();Fe(n,e,t,r)}aa(e,t)}};Su=function(){return R};Nu=function(e,t){var n=R;try{return R=e,t()}finally{R=n}};Ao=function(e,t,n){switch(t){case"input":if(Oo(e,n),t=n.name,n.type==="radio"&&t!=null){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+t)+'][type="radio"]'),t=0;t<n.length;t++){var r=n[t];if(r!==e&&r.form===e.form){var l=zl(r);if(!l)throw Error(x(90));tu(r),Oo(r,l)}}}break;case"textarea":ru(e,n);break;case"select":t=n.value,t!=null&&on(e,!!n.multiple,t,!1)}};cu=na;pu=Ut;var Uf={usingClientEntryPoint:!1,Events:[pr,bt,zl,su,uu,na]},Mn={findFiberByHostInstance:Mt,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},Af={bundleType:Mn.bundleType,version:Mn.version,rendererPackageName:Mn.rendererPackageName,rendererConfig:Mn.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:nt.ReactCurrentDispatcher,findHostInstanceByFiber:function(e){return e=mu(e),e===null?null:e.stateNode},findFiberByHostInstance:Mn.findFiberByHostInstance||Bf,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"&&(Tn=__REACT_DEVTOOLS_GLOBAL_HOOK__,!Tn.isDisabled&&Tn.supportsFiber))try{Nl=Tn.inject(Af),$e=Tn}catch{}var Tn;_e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=Uf;_e.createPortal=function(e,t){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!ua(t))throw Error(x(200));return Ff(e,t,null,n)};_e.createRoot=function(e,t){if(!ua(e))throw Error(x(299));var n=!1,r="",l=Yc;return t!=null&&(t.unstable_strictMode===!0&&(n=!0),t.identifierPrefix!==void 0&&(r=t.identifierPrefix),t.onRecoverableError!==void 0&&(l=t.onRecoverableError)),t=ia(e,1,!1,null,null,n,!1,r,l),e[Je]=t.current,er(e.nodeType===8?e.parentNode:e),new sa(t)};_e.findDOMNode=function(e){if(e==null)return null;if(e.nodeType===1)return e;var t=e._reactInternals;if(t===void 0)throw typeof e.render=="function"?Error(x(188)):(e=Object.keys(e).join(","),Error(x(268,e)));return e=mu(t),e=e===null?null:e.stateNode,e};_e.flushSync=function(e){return Ut(e)};_e.hydrate=function(e,t,n){if(!Fl(t))throw Error(x(200));return Bl(null,e,t,!0,n)};_e.hydrateRoot=function(e,t,n){if(!ua(e))throw Error(x(405));var r=n!=null&&n.hydratedSources||null,l=!1,o="",i=Yc;if(n!=null&&(n.unstable_strictMode===!0&&(l=!0),n.identifierPrefix!==void 0&&(o=n.identifierPrefix),n.onRecoverableError!==void 0&&(i=n.onRecoverableError)),t=Qc(t,null,e,1,n??null,l,!1,o,i),e[Je]=t.current,er(e),r)for(e=0;e<r.length;e++)n=r[e],l=n._getVersion,l=l(n._source),t.mutableSourceEagerHydrationData==null?t.mutableSourceEagerHydrationData=[n,l]:t.mutableSourceEagerHydrationData.push(n,l);return new jl(t)};_e.render=function(e,t,n){if(!Fl(t))throw Error(x(200));return Bl(null,e,t,!1,n)};_e.unmountComponentAtNode=function(e){if(!Fl(e))throw Error(x(40));return e._reactRootContainer?(Ut(function(){Bl(null,null,e,!1,function(){e._reactRootContainer=null,e[Je]=null})}),!0):!1};_e.unstable_batchedUpdates=na;_e.unstable_renderSubtreeIntoContainer=function(e,t,n,r){if(!Fl(n))throw Error(x(200));if(e==null||e._reactInternals===void 0)throw Error(x(38));return Bl(e,t,n,!1,r)};_e.version="18.3.1-next-f1338f8080-20240426"});var Zc=Ye((nm,Xc)=>{"use strict";function Gc(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(Gc)}catch(e){console.error(e)}}Gc(),Xc.exports=Kc()});var bc=Ye(ca=>{"use strict";var qc=Zc();ca.createRoot=qc.createRoot,ca.hydrateRoot=qc.hydrateRoot;var rm});var ep=Ye(Wl=>{"use strict";var Vf=Pt(),Hf=Symbol.for("react.element"),$f=Symbol.for("react.fragment"),Qf=Object.prototype.hasOwnProperty,Yf=Vf.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,Kf={key:!0,ref:!0,__self:!0,__source:!0};function Jc(e,t,n){var r,l={},o=null,i=null;n!==void 0&&(o=""+n),t.key!==void 0&&(o=""+t.key),t.ref!==void 0&&(i=t.ref);for(r in t)Qf.call(t,r)&&!Kf.hasOwnProperty(r)&&(l[r]=t[r]);if(e&&e.defaultProps)for(r in t=e.defaultProps,t)l[r]===void 0&&(l[r]=t[r]);return{$$typeof:Hf,type:e,key:o,ref:i,props:l,_owner:Yf.current}}Wl.Fragment=$f;Wl.jsx=Jc;Wl.jsxs=Jc});var Se=Ye((im,tp)=>{"use strict";tp.exports=ep()});var gp=J(Pt(),1),hp=J(bc(),1);var b=J(Pt(),1);var y=J(Se(),1);function fr({className:e="",size:t=24}){return(0,y.jsxs)("svg",{width:t,height:t,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:e,children:[(0,y.jsx)("path",{d:"M6 13.87A4 4 0 0 1 7.41 6a5.11 5.11 0 0 1 1.05-1.54 5 5 0 0 1 7.08 0A5.11 5.11 0 0 1 16.59 6 4 4 0 0 1 18 13.87V21H6Z"}),(0,y.jsx)("line",{x1:"6",x2:"18",y1:"17",y2:"17"})]})}function Ul({className:e="",size:t=24}){return(0,y.jsxs)("svg",{width:t,height:t,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:e,children:[(0,y.jsx)("rect",{width:"18",height:"18",x:"3",y:"4",rx:"2",ry:"2"}),(0,y.jsx)("line",{x1:"16",x2:"16",y1:"2",y2:"6"}),(0,y.jsx)("line",{x1:"8",x2:"8",y1:"2",y2:"6"}),(0,y.jsx)("line",{x1:"3",x2:"21",y1:"10",y2:"10"})]})}function We({className:e="",size:t=24}){return(0,y.jsxs)("svg",{width:t,height:t,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:e,children:[(0,y.jsx)("line",{x1:"12",x2:"12",y1:"2",y2:"22"}),(0,y.jsx)("path",{d:"M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"})]})}function Ht({className:e="",size:t=24}){return(0,y.jsx)("svg",{width:t,height:t,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:e,children:(0,y.jsx)("path",{d:"M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"})})}function Ct({className:e="",size:t=24}){return(0,y.jsxs)("svg",{width:t,height:t,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:e,children:[(0,y.jsx)("path",{d:"M12 2a4 4 0 0 0-4 4v2a4 4 0 0 0 8 0V6a4 4 0 0 0-4-4z"}),(0,y.jsx)("path",{d:"M12 12v10"}),(0,y.jsx)("path",{d:"M8 16h8"}),(0,y.jsx)("path",{d:"M6 20h12"})]})}function mr({className:e="",size:t=24}){return(0,y.jsxs)("svg",{width:t,height:t,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:e,children:[(0,y.jsx)("circle",{cx:"8",cy:"21",r:"1"}),(0,y.jsx)("circle",{cx:"19",cy:"21",r:"1"}),(0,y.jsx)("path",{d:"M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"})]})}function gr({className:e="",size:t=24}){return(0,y.jsxs)("svg",{width:t,height:t,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:e,children:[(0,y.jsx)("circle",{cx:"12",cy:"12",r:"10"}),(0,y.jsx)("polyline",{points:"12 6 12 12 16 14"})]})}function Al({className:e="",size:t=24}){return(0,y.jsxs)("svg",{width:t,height:t,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:e,children:[(0,y.jsx)("path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"}),(0,y.jsx)("circle",{cx:"9",cy:"7",r:"4"}),(0,y.jsx)("path",{d:"M22 21v-2a4 4 0 0 0-3-3.87"}),(0,y.jsx)("path",{d:"M16 3.13a4 4 0 0 1 0 7.75"})]})}function np({className:e="",size:t=24}){return(0,y.jsxs)("svg",{width:t,height:t,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:e,children:[(0,y.jsx)("path",{d:"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"}),(0,y.jsx)("path",{d:"M21 3v5h-5"}),(0,y.jsx)("path",{d:"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"}),(0,y.jsx)("path",{d:"M8 16H3v5"})]})}function pa({className:e="",size:t=24}){return(0,y.jsxs)("svg",{width:t,height:t,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:e,children:[(0,y.jsx)("path",{d:"M16 3h5v5"}),(0,y.jsx)("path",{d:"M8 3H3v5"}),(0,y.jsx)("path",{d:"M21 3l-7 7"}),(0,y.jsx)("path",{d:"M3 3l7 7"}),(0,y.jsx)("path",{d:"M16 21h5v-5"}),(0,y.jsx)("path",{d:"M8 21H3v-5"}),(0,y.jsx)("path",{d:"M21 21l-7-7"}),(0,y.jsx)("path",{d:"M3 21l7-7"})]})}function Vl({className:e="",size:t=24}){return(0,y.jsxs)("svg",{width:t,height:t,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:e,children:[(0,y.jsx)("line",{x1:"18",x2:"6",y1:"6",y2:"18"}),(0,y.jsx)("line",{x1:"6",x2:"18",y1:"6",y2:"18"})]})}function rp({className:e="",size:t=24}){return(0,y.jsx)("svg",{width:t,height:t,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:e,children:(0,y.jsx)("polyline",{points:"20 6 9 17 4 12"})})}function lp({className:e="",size:t=24}){return(0,y.jsxs)("svg",{width:t,height:t,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:e,children:[(0,y.jsx)("path",{d:"M12 2v4"}),(0,y.jsx)("path",{d:"m4.93 4.93 2.83 2.83"}),(0,y.jsx)("path",{d:"M2 12h4"}),(0,y.jsx)("path",{d:"m4.93 19.07 2.83-2.83"}),(0,y.jsx)("path",{d:"M12 18v4"}),(0,y.jsx)("path",{d:"m19.07 19.07-2.83-2.83"}),(0,y.jsx)("path",{d:"M22 12h-4"}),(0,y.jsx)("path",{d:"m19.07 4.93-2.83 2.83"}),(0,y.jsx)("circle",{cx:"12",cy:"12",r:"4"})]})}function da({className:e="",size:t=24}){return(0,y.jsxs)("svg",{width:t,height:t,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:e,children:[(0,y.jsx)("circle",{cx:"12",cy:"12",r:"4"}),(0,y.jsx)("path",{d:"M12 2v2"}),(0,y.jsx)("path",{d:"M12 20v2"}),(0,y.jsx)("path",{d:"m4.93 4.93 1.41 1.41"}),(0,y.jsx)("path",{d:"m17.66 17.66 1.41 1.41"}),(0,y.jsx)("path",{d:"M2 12h2"}),(0,y.jsx)("path",{d:"M20 12h2"}),(0,y.jsx)("path",{d:"m6.34 17.66-1.41 1.41"}),(0,y.jsx)("path",{d:"m19.07 4.93-1.41 1.41"})]})}function op({className:e="",size:t=24}){return(0,y.jsx)("svg",{width:t,height:t,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:e,children:(0,y.jsx)("path",{d:"M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"})})}function ip({className:e="",size:t=24}){return(0,y.jsxs)("svg",{width:t,height:t,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:e,children:[(0,y.jsx)("path",{d:"M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5"}),(0,y.jsx)("path",{d:"M8.5 8.5v.01"}),(0,y.jsx)("path",{d:"M16 15.5v.01"}),(0,y.jsx)("path",{d:"M12 12v.01"}),(0,y.jsx)("path",{d:"M11 17v.01"}),(0,y.jsx)("path",{d:"M7 14v.01"})]})}function Et({className:e="",size:t=24}){return(0,y.jsxs)("svg",{width:t,height:t,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:e,children:[(0,y.jsx)("path",{d:"M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"}),(0,y.jsx)("path",{d:"M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"})]})}function hr({className:e="",size:t=24}){return(0,y.jsx)("svg",{width:t,height:t,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:e,children:(0,y.jsx)("polygon",{points:"13 2 3 14 12 14 11 22 21 10 12 10 13 2"})})}function ap({className:e="",size:t=24}){return(0,y.jsx)("svg",{width:t,height:t,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:e,children:(0,y.jsx)("path",{d:"M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"})})}function sp({className:e="",size:t=24}){return(0,y.jsx)("svg",{width:t,height:t,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:e,children:(0,y.jsx)("path",{d:"m6 9 6 6 6-6"})})}function up({className:e="",size:t=24}){return(0,y.jsx)("svg",{width:t,height:t,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:e,children:(0,y.jsx)("path",{d:"m18 15-6-6-6 6"})})}function cp({className:e="",size:t=24}){return(0,y.jsx)("svg",{width:t,height:t,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:e,children:(0,y.jsx)("path",{d:"m15 18-6-6 6-6"})})}function pp({className:e="",size:t=24}){return(0,y.jsx)("svg",{width:t,height:t,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:e,children:(0,y.jsx)("path",{d:"m9 18 6-6-6-6"})})}function dp({className:e="",size:t=24}){return(0,y.jsx)("svg",{width:t,height:t,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:e,children:(0,y.jsx)("polygon",{points:"12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"})})}function fp({className:e="",size:t=24}){return(0,y.jsxs)("svg",{width:t,height:t,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:e,children:[(0,y.jsx)("path",{d:"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"}),(0,y.jsx)("polyline",{points:"15 3 21 3 21 9"}),(0,y.jsx)("line",{x1:"10",x2:"21",y1:"14",y2:"3"})]})}var z=J(Se(),1);function fa({plan:e,onOrderIngredients:t}){let{household:n,constraints:r,budget_summary:l,nutrition_summary:o,days:i}=e,a=r.diet.length>0?r.diet[0].charAt(0).toUpperCase()+r.diet[0].slice(1):"Balanced";return(0,z.jsxs)("div",{className:"cp-inline-widget",children:[(0,z.jsx)("div",{className:"cp-inline-header",children:(0,z.jsxs)("div",{className:"cp-inline-logo",children:[(0,z.jsx)(fr,{size:28,className:"cp-icon-green"}),(0,z.jsx)("span",{className:"cp-inline-brand",children:"ChefPlan"})]})}),(0,z.jsx)("h2",{className:"cp-inline-title",children:"Weekly meal plan"}),(0,z.jsxs)("div",{className:"cp-inline-context",children:[(0,z.jsxs)("span",{className:"cp-context-item",children:[(0,z.jsx)(Al,{size:14}),"Family of ",n.size]}),(0,z.jsx)("span",{className:"cp-context-divider",children:"\xB7"}),(0,z.jsxs)("span",{className:"cp-context-item",children:[(0,z.jsx)(Et,{size:14}),a]}),(0,z.jsx)("span",{className:"cp-context-divider",children:"\xB7"}),(0,z.jsxs)("span",{className:"cp-context-item",children:[(0,z.jsx)(We,{size:14}),"Budget <$",r.budget_target]}),(0,z.jsx)("span",{className:"cp-context-divider",children:"\xB7"}),(0,z.jsxs)("span",{className:"cp-context-item",children:[(0,z.jsx)(Ul,{size:14}),"7 days"]})]}),(0,z.jsx)("div",{className:"cp-inline-week",children:i.map(s=>(0,z.jsxs)("div",{className:"cp-day-card",children:[(0,z.jsx)("span",{className:"cp-day-name",children:s.day}),(0,z.jsx)("span",{className:"cp-day-meals",children:s.meals.length})]},s.day))}),(0,z.jsxs)("div",{className:"cp-inline-metrics",children:[(0,z.jsxs)("div",{className:"cp-metric",children:[(0,z.jsx)(We,{size:18,className:"cp-icon-orange"}),(0,z.jsxs)("div",{className:"cp-metric-content",children:[(0,z.jsxs)("span",{className:"cp-metric-value",children:["$",l.estimated_total.toFixed(2)]}),(0,z.jsx)("span",{className:"cp-metric-label",children:"Est. total"})]})]}),(0,z.jsxs)("div",{className:"cp-metric",children:[(0,z.jsx)(Ht,{size:18,className:"cp-icon-orange"}),(0,z.jsxs)("div",{className:"cp-metric-content",children:[(0,z.jsx)("span",{className:"cp-metric-value",children:o.avg_calories_per_day}),(0,z.jsx)("span",{className:"cp-metric-label",children:"kcal/day"})]})]}),(0,z.jsxs)("div",{className:"cp-metric",children:[(0,z.jsx)(Ct,{size:18,className:"cp-icon-green"}),(0,z.jsxs)("div",{className:"cp-metric-content",children:[(0,z.jsxs)("span",{className:"cp-metric-value",children:[o.avg_protein_g,"g"]}),(0,z.jsx)("span",{className:"cp-metric-label",children:"protein/day"})]})]})]}),(0,z.jsxs)("div",{className:"cp-inline-daily",children:[i.slice(0,3).map(s=>(0,z.jsxs)("div",{className:"cp-daily-row",children:[(0,z.jsxs)("span",{className:"cp-daily-day",children:[s.day,":"]}),(0,z.jsx)("span",{className:"cp-daily-meals",children:s.meals.map(p=>p.title).join(" / ")})]},s.day)),i.length>3&&(0,z.jsxs)("div",{className:"cp-daily-more",children:["+ ",i.length-3," more days"]})]}),(0,z.jsx)("div",{className:"cp-inline-actions",children:(0,z.jsxs)("button",{className:"cp-btn cp-btn-secondary",onClick:t,children:[(0,z.jsx)(mr,{size:18}),"Order ingredients"]})}),(0,z.jsx)("style",{children:`
        .cp-inline-widget {
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.5);
          border-radius: 20px;
          padding: 24px;
          max-width: 480px;
          max-height: 500px;
          overflow-y: auto;
          box-shadow:
            0 4px 24px rgba(0, 0, 0, 0.06),
            0 1px 2px rgba(0, 0, 0, 0.04);
          font-family: 'Inter', system-ui, -apple-system, sans-serif;
        }

        .cp-inline-widget::-webkit-scrollbar {
          width: 6px;
        }

        .cp-inline-widget::-webkit-scrollbar-track {
          background: transparent;
        }

        .cp-inline-widget::-webkit-scrollbar-thumb {
          background: rgba(0, 0, 0, 0.15);
          border-radius: 3px;
        }

        .cp-inline-widget::-webkit-scrollbar-thumb:hover {
          background: rgba(0, 0, 0, 0.25);
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

        .cp-icon-green {
          color: #16a34a;
        }

        .cp-icon-orange {
          color: #f97316;
        }

        .cp-inline-title {
          font-size: 22px;
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

        .cp-inline-week {
          display: flex;
          gap: 8px;
          margin-bottom: 20px;
        }

        .cp-day-card {
          flex: 1;
          background: rgba(255, 255, 255, 0.9);
          border: 1px solid rgba(34, 197, 94, 0.2);
          border-radius: 12px;
          padding: 10px 6px;
          text-align: center;
          transition: all 0.2s ease;
        }

        .cp-day-card:hover {
          border-color: rgba(34, 197, 94, 0.5);
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(34, 197, 94, 0.15);
        }

        .cp-day-name {
          display: block;
          font-size: 11px;
          font-weight: 600;
          color: #374151;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .cp-day-meals {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 24px;
          height: 24px;
          background: linear-gradient(135deg, #22c55e, #16a34a);
          color: white;
          border-radius: 50%;
          font-size: 12px;
          font-weight: 600;
          margin: 6px auto 0;
        }

        .cp-inline-metrics {
          display: flex;
          gap: 12px;
          padding: 16px;
          background: rgba(255, 255, 255, 0.7);
          border-radius: 14px;
          margin-bottom: 16px;
          border: 1px solid rgba(0, 0, 0, 0.04);
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
          font-size: 16px;
          font-weight: 700;
          color: #111827;
        }

        .cp-metric-label {
          font-size: 11px;
          color: #6b7280;
        }

        .cp-inline-daily {
          margin-bottom: 20px;
        }

        .cp-daily-row {
          display: flex;
          gap: 8px;
          padding: 8px 0;
          border-bottom: 1px solid rgba(0, 0, 0, 0.04);
          font-size: 13px;
        }

        .cp-daily-row:last-child {
          border-bottom: none;
        }

        .cp-daily-day {
          font-weight: 600;
          color: #374151;
          min-width: 36px;
        }

        .cp-daily-meals {
          color: #6b7280;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .cp-daily-more {
          font-size: 12px;
          color: #9ca3af;
          padding-top: 8px;
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
      `})]})}var Hl=J(Pt(),1);var g=J(Se(),1),Gf={breakfast:lp,lunch:da,dinner:op,snack:ip};function ma({plan:e,selectedRecipe:t,onClose:n,onSwapMeal:r,onRebuildWeek:l,onOrderIngredients:o,onSelectMeal:i}){let[a,s]=(0,Hl.useState)(e.days[0]?.day||"Mon"),[p,v]=(0,Hl.useState)(null),[f,m]=(0,Hl.useState)({Produce:!0,Proteins:!0,Dairy:!1,Pantry:!1,Frozen:!1}),w=e.days.find(u=>u.day===a)||e.days[0],_=u=>{v(u.meal_id),i(e.plan_id,u.meal_id)},N=u=>{m(c=>({...c,[u]:!c[u]}))},O=u=>({"high-protein":"cp-tag-green",quick:"cp-tag-orange",budget:"cp-tag-blue",healthy:"cp-tag-green",vegan:"cp-tag-emerald",vegetarian:"cp-tag-emerald","kid-friendly":"cp-tag-purple",keto:"cp-tag-amber","low-carb":"cp-tag-amber","meal-prep":"cp-tag-blue",popular:"cp-tag-pink"})[u]||"cp-tag-gray";return(0,g.jsxs)("div",{className:"cp-fullscreen",children:[(0,g.jsxs)("header",{className:"cp-fs-header",children:[(0,g.jsxs)("div",{className:"cp-fs-header-left",children:[(0,g.jsx)(fr,{size:28,className:"cp-icon-green"}),(0,g.jsxs)("div",{children:[(0,g.jsx)("h1",{className:"cp-fs-title",children:"Weekly meal plan"}),(0,g.jsxs)("p",{className:"cp-fs-subtitle",children:["Mar 16\u201322 \xB7 Family of ",e.household.size," \xB7"," ",e.constraints.diet[0]||"Balanced"," \xB7 <$",e.constraints.budget_target]})]})]}),(0,g.jsx)("button",{className:"cp-close-btn",onClick:n,children:(0,g.jsx)(Vl,{size:24})})]}),(0,g.jsxs)("div",{className:"cp-fs-metrics",children:[(0,g.jsxs)("div",{className:"cp-fs-metric",children:[(0,g.jsx)(We,{size:20,className:"cp-icon-orange"}),(0,g.jsxs)("span",{className:"cp-fs-metric-value",children:["$",e.budget_summary.estimated_total.toFixed(2)]}),(0,g.jsx)("span",{className:"cp-fs-metric-label",children:"Budget"})]}),(0,g.jsxs)("div",{className:"cp-fs-metric",children:[(0,g.jsx)(Ht,{size:20,className:"cp-icon-orange"}),(0,g.jsx)("span",{className:"cp-fs-metric-value",children:e.nutrition_summary.avg_calories_per_day}),(0,g.jsx)("span",{className:"cp-fs-metric-label",children:"Avg/day"})]}),(0,g.jsxs)("div",{className:"cp-fs-metric",children:[(0,g.jsx)(Ct,{size:20,className:"cp-icon-green"}),(0,g.jsxs)("span",{className:"cp-fs-metric-value",children:[e.nutrition_summary.avg_protein_g,"g"]}),(0,g.jsx)("span",{className:"cp-fs-metric-label",children:"Protein"})]}),(0,g.jsxs)("div",{className:"cp-fs-metric",children:[(0,g.jsx)(Et,{size:20,className:"cp-icon-green"}),(0,g.jsxs)("span",{className:"cp-fs-metric-value",children:[e.nutrition_summary.avg_carbs_g,"g"]}),(0,g.jsx)("span",{className:"cp-fs-metric-label",children:"Carbs"})]})]}),(0,g.jsxs)("section",{className:"cp-fs-section",children:[(0,g.jsxs)("h2",{className:"cp-fs-section-title",children:[(0,g.jsx)(Ul,{size:20}),"Weekly Calendar"]}),(0,g.jsx)("div",{className:"cp-week-tabs",children:e.days.map(u=>(0,g.jsx)("button",{className:`cp-week-tab ${a===u.day?"active":""}`,onClick:()=>s(u.day),children:u.day},u.day))}),(0,g.jsxs)("div",{className:"cp-day-meals",children:[(0,g.jsxs)("div",{className:"cp-day-header",children:[(0,g.jsx)("span",{className:"cp-day-label",children:w.day}),(0,g.jsxs)("span",{className:"cp-day-stats",children:[w.totals.calories," kcal \xB7 ",w.totals.protein_g,"g protein"]})]}),w.meals.map(u=>{let c=Gf[u.type]||da,d=p===u.meal_id;return(0,g.jsxs)("div",{className:`cp-meal-card ${d?"selected":""}`,onClick:()=>_(u),children:[u.image_url?(0,g.jsx)("div",{className:"cp-meal-image",children:(0,g.jsx)("img",{src:u.image_url,alt:u.title})}):(0,g.jsx)("div",{className:"cp-meal-icon",children:(0,g.jsx)(c,{size:20})}),(0,g.jsxs)("div",{className:"cp-meal-content",children:[(0,g.jsx)("span",{className:"cp-meal-type",children:u.type}),(0,g.jsx)("span",{className:"cp-meal-title",children:u.title}),(0,g.jsxs)("div",{className:"cp-meal-meta",children:[(0,g.jsxs)("span",{children:[(0,g.jsx)(gr,{size:12})," ",u.prep_minutes," min"]}),(0,g.jsxs)("span",{children:[(0,g.jsx)(Ht,{size:12})," ",u.calories," kcal"]}),(0,g.jsxs)("span",{children:[(0,g.jsx)(We,{size:12})," $",u.estimated_cost.toFixed(2)]})]}),u.source&&u.source!=="fallback"&&(0,g.jsxs)("span",{className:"cp-meal-source",children:["via ",u.source]})]}),(0,g.jsxs)("button",{className:"cp-swap-btn",onClick:h=>{h.stopPropagation(),r(u.meal_id)},children:[(0,g.jsx)(pa,{size:16}),"Swap"]})]},u.meal_id)})]})]}),t&&(0,g.jsxs)("section",{className:"cp-fs-section cp-recipe-section",children:[(0,g.jsxs)("h2",{className:"cp-fs-section-title",children:[(0,g.jsx)(fr,{size:20}),"Selected Meal Details"]}),(0,g.jsxs)("div",{className:"cp-recipe-card",children:[t.image_url&&(0,g.jsx)("div",{className:"cp-recipe-image",children:(0,g.jsx)("img",{src:t.image_url,alt:t.title})}),(0,g.jsxs)("div",{className:"cp-recipe-header",children:[(0,g.jsx)("h3",{className:"cp-recipe-title",children:t.title}),(0,g.jsxs)("div",{className:"cp-recipe-tags",children:[t.tags.map(u=>(0,g.jsx)("span",{className:`cp-tag ${O(u)}`,children:u.replace("-"," ")},u)),t.source&&t.source!=="fallback"&&(0,g.jsxs)("span",{className:"cp-tag cp-tag-gray",children:["via ",t.source]})]})]}),(0,g.jsxs)("div",{className:"cp-recipe-stats",children:[(0,g.jsxs)("div",{className:"cp-recipe-stat",children:[(0,g.jsx)(gr,{size:16}),(0,g.jsxs)("span",{children:["Prep ",t.prep_minutes," min"]})]}),(0,g.jsxs)("div",{className:"cp-recipe-stat",children:[(0,g.jsx)(Al,{size:16}),(0,g.jsxs)("span",{children:["Serves ",t.servings]})]}),(0,g.jsxs)("div",{className:"cp-recipe-stat",children:[(0,g.jsx)(We,{size:16}),(0,g.jsxs)("span",{children:["$",t.estimated_cost.toFixed(2)," total"]})]})]}),(0,g.jsxs)("div",{className:"cp-recipe-nutrition",children:[(0,g.jsxs)("span",{children:[(0,g.jsx)(Ct,{size:14})," Protein"," ",t.macros.protein_g,"g"]}),(0,g.jsxs)("span",{children:[(0,g.jsx)(Et,{size:14})," Carbs ",t.macros.carbs_g,"g"]}),(0,g.jsxs)("span",{children:[(0,g.jsx)(hr,{size:14})," Fat ",t.macros.fat_g,"g"]})]}),(0,g.jsxs)("div",{className:"cp-recipe-ingredients",children:[(0,g.jsx)("h4",{children:"Ingredients"}),(0,g.jsx)("ul",{children:t.ingredients.map((u,c)=>(0,g.jsxs)("li",{children:[u.amount," ",u.name,u.notes&&(0,g.jsxs)("span",{className:"cp-ing-note",children:[" (",u.notes,")"]})]},c))})]}),(0,g.jsxs)("div",{className:"cp-recipe-steps",children:[(0,g.jsx)("h4",{children:"Steps"}),(0,g.jsx)("ol",{children:t.instructions.map((u,c)=>(0,g.jsx)("li",{children:u},c))})]}),(0,g.jsxs)("div",{className:"cp-recipe-actions",children:[(0,g.jsxs)("button",{className:"cp-btn cp-btn-outline",onClick:()=>r(t.meal_id),children:[(0,g.jsx)(pa,{size:16}),"Replace this meal"]}),(0,g.jsxs)("button",{className:"cp-btn cp-btn-outline",children:[(0,g.jsx)(hr,{size:16}),"Make faster"]}),(0,g.jsxs)("button",{className:"cp-btn cp-btn-outline",children:[(0,g.jsx)(We,{size:16}),"Make cheaper"]})]})]})]}),(0,g.jsxs)("section",{className:"cp-fs-section",children:[(0,g.jsxs)("h2",{className:"cp-fs-section-title",children:[(0,g.jsx)(mr,{size:20}),"Shopping List"]}),(0,g.jsx)("div",{className:"cp-shopping-list",children:e.shopping_list.map(u=>(0,g.jsxs)("div",{className:"cp-shop-section",children:[(0,g.jsxs)("button",{className:"cp-shop-header",onClick:()=>N(u.section),children:[(0,g.jsx)("span",{children:u.section}),(0,g.jsxs)("span",{className:"cp-shop-count",children:[u.items.length," items"]}),f[u.section]?(0,g.jsx)(up,{size:18}):(0,g.jsx)(sp,{size:18})]}),f[u.section]&&(0,g.jsx)("div",{className:"cp-shop-items",children:u.items.map((c,d)=>(0,g.jsxs)("div",{className:"cp-shop-item",children:[(0,g.jsx)("span",{className:"cp-shop-item-name",children:c.name}),(0,g.jsxs)("span",{className:"cp-shop-item-qty",children:[c.quantity," ",c.unit]}),c.estimated_cost&&(0,g.jsxs)("span",{className:"cp-shop-item-cost",children:["$",c.estimated_cost.toFixed(2)]})]},d))})]},u.section))})]}),(0,g.jsxs)("div",{className:"cp-fs-actions",children:[(0,g.jsxs)("button",{className:"cp-btn cp-btn-outline",onClick:l,children:[(0,g.jsx)(np,{size:18}),"Rebuild week"]}),(0,g.jsxs)("button",{className:"cp-btn cp-btn-primary",onClick:()=>o("instacart"),children:[(0,g.jsx)(mr,{size:18}),"Order with Instacart",(0,g.jsx)(fp,{size:14})]})]}),(0,g.jsx)("style",{children:`
        .cp-fullscreen {
          height: 100vh;
          max-height: 100vh;
          overflow-y: auto;
          background: linear-gradient(135deg, #f0fdf4 0%, #ffffff 50%, #fff7ed 100%);
          padding-bottom: 100px;
          font-family: 'Inter', system-ui, -apple-system, sans-serif;
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
      `})]})}var $l=J(Pt(),1),L=J(Se(),1);function ga({currentMeal:e,candidates:t,onReplace:n,onClose:r}){let[l,o]=(0,$l.useState)(null),i=(0,$l.useRef)(null),a=f=>{i.current&&i.current.scrollBy({left:f==="left"?-280:280,behavior:"smooth"})},s=f=>({"high-protein":Ct,quick:hr,budget:We,healthy:ap,vegan:Et,vegetarian:Et})[f]||dp,p=f=>{let m=["high-protein","quick","budget","healthy","vegan","vegetarian"];for(let w of m)if(f.includes(w))return w;return f[0]||null},v=f=>({"high-protein":"cp-badge-green",quick:"cp-badge-orange",budget:"cp-badge-blue",healthy:"cp-badge-emerald",vegan:"cp-badge-emerald",vegetarian:"cp-badge-emerald","kid-friendly":"cp-badge-purple"})[f]||"cp-badge-gray";return(0,L.jsxs)("div",{className:"cp-swap-widget",children:[(0,L.jsxs)("div",{className:"cp-swap-header",children:[(0,L.jsxs)("div",{className:"cp-swap-title-area",children:[(0,L.jsxs)("h2",{className:"cp-swap-title",children:["Replace ",e.type]}),(0,L.jsxs)("p",{className:"cp-swap-current",children:["Current: ",(0,L.jsx)("strong",{children:e.title})]})]}),(0,L.jsx)("button",{className:"cp-swap-close",onClick:r,children:(0,L.jsx)(Vl,{size:20})})]}),(0,L.jsxs)("div",{className:"cp-swap-nav",children:[(0,L.jsx)("button",{className:"cp-nav-btn",onClick:()=>a("left"),children:(0,L.jsx)(cp,{size:20})}),(0,L.jsxs)("span",{className:"cp-nav-count",children:[t.length," alternatives"]}),(0,L.jsx)("button",{className:"cp-nav-btn",onClick:()=>a("right"),children:(0,L.jsx)(pp,{size:20})})]}),(0,L.jsx)("div",{className:"cp-swap-carousel",ref:i,children:t.map((f,m)=>{let w=p(f.tags),_=w?s(w):null,N=l===f.meal_id;return(0,L.jsxs)("div",{className:`cp-swap-card ${N?"selected":""}`,onClick:()=>o(f.meal_id),children:[(0,L.jsxs)("div",{className:"cp-match-score",children:[Math.round(f.match_score*100),"% match"]}),(0,L.jsx)("h3",{className:"cp-card-title",children:f.title}),(0,L.jsxs)("div",{className:"cp-card-stats",children:[(0,L.jsxs)("span",{className:"cp-card-stat",children:[(0,L.jsx)(gr,{size:14}),f.prep_minutes," min"]}),(0,L.jsxs)("span",{className:"cp-card-stat",children:[(0,L.jsx)(Ht,{size:14}),f.calories," kcal"]}),(0,L.jsxs)("span",{className:"cp-card-stat",children:[(0,L.jsx)(We,{size:14}),"$",f.estimated_cost.toFixed(2)]})]}),(0,L.jsx)("div",{className:"cp-card-macros",children:(0,L.jsxs)("span",{children:[(0,L.jsx)(Ct,{size:12})," ",f.macros.protein_g,"g protein"]})}),w&&_&&(0,L.jsxs)("div",{className:`cp-card-badge ${v(w)}`,children:[(0,L.jsx)(_,{size:14}),w.replace("-"," ")]}),(0,L.jsx)("button",{className:`cp-replace-btn ${N?"active":""}`,onClick:O=>{O.stopPropagation(),n(f.meal_id)},children:N?(0,L.jsxs)(L.Fragment,{children:[(0,L.jsx)(rp,{size:16}),"Confirm"]}):"Replace"})]},f.meal_id)})}),(0,L.jsx)("style",{children:`
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
      `})]})}var G=J(Se(),1),Xf={plan_id:"demo_plan_123",title:"Healthy Weekly Meal Plan",household:{size:4},constraints:{budget_target:75,diet:["healthy"],allergies:[],max_prep_minutes:30},budget_summary:{estimated_total:68.5,per_day_avg:9.79},nutrition_summary:{avg_calories_per_day:1950,avg_protein_g:118,avg_carbs_g:190,avg_fat_g:62},days:[{day:"Mon",totals:{calories:1750,protein_g:110,carbs_g:180,fat_g:58},meals:[{meal_id:"m1",type:"breakfast",title:"Greek Yogurt Parfait",servings:4,prep_minutes:10,estimated_cost:4.5,calories:320,macros:{protein_g:22,carbs_g:28,fat_g:9},tags:["high-protein","quick"]},{meal_id:"m2",type:"lunch",title:"Chicken Rice Bowls",servings:4,prep_minutes:20,estimated_cost:8.2,calories:540,macros:{protein_g:38,carbs_g:52,fat_g:16},tags:["high-protein","meal-prep"]},{meal_id:"m3",type:"dinner",title:"Lentil Pasta Bake",servings:4,prep_minutes:25,estimated_cost:7.8,calories:710,macros:{protein_g:29,carbs_g:66,fat_g:18},tags:["comfort-food","family"]},{meal_id:"m4",type:"snack",title:"Apple & Peanut Butter",servings:4,prep_minutes:2,estimated_cost:3,calories:180,macros:{protein_g:6,carbs_g:22,fat_g:8},tags:["quick","healthy"]}]},{day:"Tue",totals:{calories:1820,protein_g:115,carbs_g:185,fat_g:60},meals:[{meal_id:"m5",type:"breakfast",title:"Overnight Oats",servings:4,prep_minutes:5,estimated_cost:2.8,calories:350,macros:{protein_g:12,carbs_g:58,fat_g:8},tags:["budget","meal-prep"]},{meal_id:"m6",type:"lunch",title:"Turkey Wrap",servings:4,prep_minutes:10,estimated_cost:6.5,calories:480,macros:{protein_g:32,carbs_g:42,fat_g:18},tags:["quick","portable"]},{meal_id:"m7",type:"dinner",title:"Grilled Salmon with Veggies",servings:4,prep_minutes:22,estimated_cost:14,calories:580,macros:{protein_g:42,carbs_g:18,fat_g:32},tags:["high-protein","healthy"]},{meal_id:"m8",type:"snack",title:"Greek Yogurt & Berries",servings:4,prep_minutes:3,estimated_cost:3.5,calories:150,macros:{protein_g:12,carbs_g:18,fat_g:2},tags:["high-protein","low-fat"]}]},{day:"Wed",totals:{calories:1900,protein_g:120,carbs_g:195,fat_g:64},meals:[{meal_id:"m9",type:"breakfast",title:"Avocado Toast with Eggs",servings:4,prep_minutes:15,estimated_cost:6.2,calories:420,macros:{protein_g:18,carbs_g:32,fat_g:24},tags:["healthy","popular"]},{meal_id:"m10",type:"lunch",title:"Mediterranean Salad",servings:4,prep_minutes:15,estimated_cost:8,calories:420,macros:{protein_g:24,carbs_g:28,fat_g:22},tags:["healthy","mediterranean"]},{meal_id:"m11",type:"dinner",title:"Chicken Stir Fry",servings:4,prep_minutes:20,estimated_cost:9.5,calories:520,macros:{protein_g:38,carbs_g:42,fat_g:18},tags:["quick","asian"]},{meal_id:"m12",type:"snack",title:"Trail Mix",servings:4,prep_minutes:1,estimated_cost:4,calories:200,macros:{protein_g:6,carbs_g:20,fat_g:12},tags:["portable","energy"]}]},{day:"Thu",totals:{calories:1980,protein_g:125,carbs_g:188,fat_g:68},meals:[{meal_id:"m13",type:"breakfast",title:"Smoothie Bowl",servings:4,prep_minutes:8,estimated_cost:5.5,calories:380,macros:{protein_g:14,carbs_g:52,fat_g:12},tags:["vegan","refreshing"]},{meal_id:"m14",type:"lunch",title:"Tuna Poke Bowl",servings:4,prep_minutes:15,estimated_cost:10,calories:450,macros:{protein_g:36,carbs_g:38,fat_g:14},tags:["high-protein","fresh"]},{meal_id:"m15",type:"dinner",title:"Beef Tacos",servings:4,prep_minutes:25,estimated_cost:11,calories:640,macros:{protein_g:34,carbs_g:48,fat_g:28},tags:["kid-friendly","popular"]},{meal_id:"m16",type:"snack",title:"Hummus & Veggies",servings:4,prep_minutes:5,estimated_cost:4.5,calories:160,macros:{protein_g:6,carbs_g:18,fat_g:8},tags:["vegan","fiber"]}]},{day:"Fri",totals:{calories:1850,protein_g:112,carbs_g:192,fat_g:60},meals:[{meal_id:"m17",type:"breakfast",title:"Veggie Omelette",servings:4,prep_minutes:12,estimated_cost:4,calories:280,macros:{protein_g:20,carbs_g:8,fat_g:18},tags:["low-carb","keto"]},{meal_id:"m18",type:"lunch",title:"Lentil Soup",servings:4,prep_minutes:25,estimated_cost:4.5,calories:320,macros:{protein_g:18,carbs_g:48,fat_g:4},tags:["budget","vegan"]},{meal_id:"m19",type:"dinner",title:"Veggie Curry",servings:4,prep_minutes:30,estimated_cost:7.5,calories:480,macros:{protein_g:16,carbs_g:58,fat_g:18},tags:["vegan","spicy"]},{meal_id:"m20",type:"snack",title:"Apple & Peanut Butter",servings:4,prep_minutes:2,estimated_cost:3,calories:180,macros:{protein_g:6,carbs_g:22,fat_g:8},tags:["quick","healthy"]}]},{day:"Sat",totals:{calories:2050,protein_g:128,carbs_g:200,fat_g:70},meals:[{meal_id:"m21",type:"breakfast",title:"Greek Yogurt Parfait",servings:4,prep_minutes:10,estimated_cost:4.5,calories:320,macros:{protein_g:22,carbs_g:28,fat_g:9},tags:["high-protein","quick"]},{meal_id:"m22",type:"lunch",title:"Chicken Rice Bowls",servings:4,prep_minutes:20,estimated_cost:8.2,calories:540,macros:{protein_g:38,carbs_g:52,fat_g:16},tags:["high-protein","meal-prep"]},{meal_id:"m23",type:"dinner",title:"Grilled Salmon with Veggies",servings:4,prep_minutes:22,estimated_cost:14,calories:580,macros:{protein_g:42,carbs_g:18,fat_g:32},tags:["high-protein","healthy"]},{meal_id:"m24",type:"snack",title:"Trail Mix",servings:4,prep_minutes:1,estimated_cost:4,calories:200,macros:{protein_g:6,carbs_g:20,fat_g:12},tags:["portable","energy"]}]},{day:"Sun",totals:{calories:1920,protein_g:118,carbs_g:188,fat_g:65},meals:[{meal_id:"m25",type:"breakfast",title:"Avocado Toast with Eggs",servings:4,prep_minutes:15,estimated_cost:6.2,calories:420,macros:{protein_g:18,carbs_g:32,fat_g:24},tags:["healthy","popular"]},{meal_id:"m26",type:"lunch",title:"Turkey Wrap",servings:4,prep_minutes:10,estimated_cost:6.5,calories:480,macros:{protein_g:32,carbs_g:42,fat_g:18},tags:["quick","portable"]},{meal_id:"m27",type:"dinner",title:"Lentil Pasta Bake",servings:4,prep_minutes:25,estimated_cost:7.8,calories:710,macros:{protein_g:29,carbs_g:66,fat_g:18},tags:["comfort-food","family"]},{meal_id:"m28",type:"snack",title:"Greek Yogurt & Berries",servings:4,prep_minutes:3,estimated_cost:3.5,calories:150,macros:{protein_g:12,carbs_g:18,fat_g:2},tags:["high-protein","low-fat"]}]}],shopping_list:[{section:"Produce",items:[{name:"Broccoli",quantity:2,unit:"heads",estimated_cost:4},{name:"Onions",quantity:4,unit:"medium",estimated_cost:2},{name:"Garlic",quantity:2,unit:"heads",estimated_cost:1.5},{name:"Spinach",quantity:1,unit:"bag",estimated_cost:3.5},{name:"Avocados",quantity:4,unit:"pieces",estimated_cost:6}]},{section:"Proteins",items:[{name:"Chicken Breast",quantity:2,unit:"lbs",estimated_cost:12},{name:"Salmon Fillet",quantity:1,unit:"lb",estimated_cost:14},{name:"Ground Turkey",quantity:1,unit:"lb",estimated_cost:8},{name:"Eggs",quantity:12,unit:"pieces",estimated_cost:5}]},{section:"Dairy",items:[{name:"Greek Yogurt",quantity:32,unit:"oz",estimated_cost:6},{name:"Feta Cheese",quantity:8,unit:"oz",estimated_cost:5}]},{section:"Pantry",items:[{name:"Brown Rice",quantity:2,unit:"lbs",estimated_cost:4},{name:"Lentils",quantity:1,unit:"lb",estimated_cost:3},{name:"Olive Oil",quantity:1,unit:"bottle",estimated_cost:8}]}],order_options:[{provider:"instacart",available:!0,cta:"Order with Instacart"},{provider:"amazon_fresh",available:!0,cta:"Order with Amazon Fresh"}]};function ha(){let[e,t]=(0,b.useState)("inline"),[n,r]=(0,b.useState)(null),[l,o]=(0,b.useState)(null),[i,a]=(0,b.useState)(null),[s,p]=(0,b.useState)(!1),[v,f]=(0,b.useState)(null);(0,b.useEffect)(()=>{let h=window.__chefplan_init;h?.plan?r(h.plan):r(Xf)},[]);let m=(0,b.useCallback)(async(h,k)=>{if(window.openai?.callTool)try{p(!0);let C=await window.openai.callTool(h,k);return C.structuredContent??C}catch(C){return f(C instanceof Error?C.message:"Tool call failed"),null}finally{p(!1)}return console.log("Demo mode - tool call:",h,k),null},[]),w=(0,b.useCallback)(()=>{t("fullscreen")},[]),_=(0,b.useCallback)(async(h="instacart")=>{if(!n)return;let k=await m("create_order_link",{plan_id:n.plan_id,provider:h});k?.deeplink?window.open(k.deeplink,"_blank"):alert(`Order link would open for ${h}`)},[n,m]),N=(0,b.useCallback)(async h=>{if(!n)return;let k=await m("swap_meal",{plan_id:n.plan_id,meal_id:h});if(k?.candidates){let C=n.days.flatMap(S=>S.meals).find(S=>S.meal_id===h);C&&(a({meal:C,candidates:k.candidates}),t("swap"))}else{let C=n.days.flatMap(S=>S.meals).find(S=>S.meal_id===h);C&&(a({meal:C,candidates:[{meal_id:"swap_1",title:"Lemon Chicken Tray Bake",prep_minutes:30,calories:610,estimated_cost:9.8,macros:{protein_g:42,carbs_g:28,fat_g:22},tags:["high-protein"],match_score:.92},{meal_id:"swap_2",title:"Turkey Taco Bowls",prep_minutes:20,calories:580,estimated_cost:8.4,macros:{protein_g:36,carbs_g:42,fat_g:18},tags:["budget","quick"],match_score:.85},{meal_id:"swap_3",title:"Chickpea Curry",prep_minutes:25,calories:540,estimated_cost:6.9,macros:{protein_g:18,carbs_g:58,fat_g:16},tags:["vegetarian","budget"],match_score:.78},{meal_id:"swap_4",title:"Sheet Pan Salmon",prep_minutes:28,calories:520,estimated_cost:12.5,macros:{protein_g:44,carbs_g:14,fat_g:28},tags:["healthy","high-protein"],match_score:.72}]}),t("swap"))}},[n,m]),O=(0,b.useCallback)(async h=>{if(!n||!i)return;let k=await m("swap_meal",{plan_id:n.plan_id,meal_id:i.meal.meal_id,replace_with:h});k?.updated_plan&&r(k.updated_plan),window.openai?.updateModelContext&&window.openai.updateModelContext({action:"meal_replaced",original:i.meal.title,replacement:i.candidates.find(C=>C.meal_id===h)?.title}),a(null),t("fullscreen")},[n,i,m]),u=(0,b.useCallback)(async()=>{if(!n)return;let h=await m("generate_weekly_plan",{household_size:n.household.size,dietary_preferences:n.constraints.diet,budget_target:n.constraints.budget_target,max_prep_minutes:n.constraints.max_prep_minutes});h?.plan&&r(h.plan)},[n,m]),c=(0,b.useCallback)(async(h,k)=>{let C=await m("get_recipe_details",{plan_id:h,meal_id:k});if(C?.recipe)o(C.recipe);else{let S=n?.days.flatMap(P=>P.meals).find(P=>P.meal_id===k);S&&o({meal_id:S.meal_id,title:S.title,prep_minutes:S.prep_minutes,cook_minutes:Math.round(S.prep_minutes*1.5),servings:S.servings,estimated_cost:S.estimated_cost,calories:S.calories,macros:S.macros,tags:S.tags,ingredients:[{name:"Main Protein",amount:"1 lb"},{name:"Olive Oil",amount:"2 tbsp"},{name:"Garlic",amount:"3 cloves",notes:"minced"},{name:"Salt & Pepper",amount:"to taste"},{name:"Fresh Herbs",amount:"1/4 cup",notes:"chopped"}],instructions:["Prepare all ingredients and set aside.","Heat olive oil in a large pan over medium-high heat.","Add the main protein and cook until golden, about 4-5 minutes per side.","Add garlic and cook for 1 minute until fragrant.","Season with salt, pepper, and fresh herbs.","Serve immediately and enjoy!"],substitutions:[{original:"Olive oil",alternative:"Avocado oil",notes:"Same amount"}]})}},[n,m]),d=(0,b.useCallback)(()=>{e==="swap"?(a(null),t("fullscreen")):(t("inline"),o(null))},[e]);return n?v?(0,G.jsxs)("div",{className:"cp-error",children:[(0,G.jsxs)("p",{children:["Error: ",v]}),(0,G.jsx)("button",{onClick:()=>{f(null)},children:"Dismiss"}),(0,G.jsx)("style",{children:`
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
        `})]}):(0,G.jsxs)(G.Fragment,{children:[s&&(0,G.jsx)("div",{className:"cp-overlay",children:(0,G.jsx)("div",{className:"cp-spinner"})}),e==="inline"&&(0,G.jsx)(fa,{plan:n,onOrderIngredients:()=>{_()}}),e==="fullscreen"&&(0,G.jsx)(ma,{plan:n,selectedRecipe:l,onClose:d,onSwapMeal:h=>{N(h)},onRebuildWeek:()=>{u()},onOrderIngredients:h=>{_(h)},onSelectMeal:(h,k)=>{c(h,k)}}),e==="swap"&&i&&(0,G.jsx)(ga,{currentMeal:i.meal,candidates:i.candidates,onReplace:h=>{O(h)},onClose:d}),(0,G.jsx)("style",{children:`
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
      `})]}):(0,G.jsxs)("div",{className:"cp-loading",children:[(0,G.jsx)("div",{className:"cp-spinner"}),(0,G.jsx)("p",{children:"Loading meal plan..."}),(0,G.jsx)("style",{children:`
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
        `})]})}var va=J(Se(),1);function mp(){let e=document.getElementById("chefplan-widget-root");e?hp.default.createRoot(e).render((0,va.jsx)(gp.default.StrictMode,{children:(0,va.jsx)(ha,{})})):console.error("ChefPlan widget root element not found")}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",mp):mp();
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
