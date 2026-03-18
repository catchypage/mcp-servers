var wp=Object.create;var Na=Object.defineProperty;var kp=Object.getOwnPropertyDescriptor;var Sp=Object.getOwnPropertyNames;var Np=Object.getPrototypeOf,Cp=Object.prototype.hasOwnProperty;var Ye=(e,n)=>()=>(n||e((n={exports:{}}).exports,n),n.exports);var _p=(e,n,t,r)=>{if(n&&typeof n=="object"||typeof n=="function")for(let l of Sp(n))!Cp.call(e,l)&&l!==t&&Na(e,l,{get:()=>n[l],enumerable:!(r=kp(n,l))||r.enumerable});return e};var J=(e,n,t)=>(t=e!=null?wp(Np(e)):{},_p(n||!e||!e.__esModule?Na(t,"default",{value:e,enumerable:!0}):t,e));var ja=Ye(M=>{"use strict";var Ct=Symbol.for("react.element"),Ep=Symbol.for("react.portal"),zp=Symbol.for("react.fragment"),Pp=Symbol.for("react.strict_mode"),Ip=Symbol.for("react.profiler"),Lp=Symbol.for("react.provider"),Mp=Symbol.for("react.context"),Tp=Symbol.for("react.forward_ref"),Rp=Symbol.for("react.suspense"),Op=Symbol.for("react.memo"),jp=Symbol.for("react.lazy"),Ca=Symbol.iterator;function Dp(e){return e===null||typeof e!="object"?null:(e=Ca&&e[Ca]||e["@@iterator"],typeof e=="function"?e:null)}var za={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},Pa=Object.assign,Ia={};function Yn(e,n,t){this.props=e,this.context=n,this.refs=Ia,this.updater=t||za}Yn.prototype.isReactComponent={};Yn.prototype.setState=function(e,n){if(typeof e!="object"&&typeof e!="function"&&e!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,n,"setState")};Yn.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")};function La(){}La.prototype=Yn.prototype;function bl(e,n,t){this.props=e,this.context=n,this.refs=Ia,this.updater=t||za}var Jl=bl.prototype=new La;Jl.constructor=bl;Pa(Jl,Yn.prototype);Jl.isPureReactComponent=!0;var _a=Array.isArray,Ma=Object.prototype.hasOwnProperty,ql={current:null},Ta={key:!0,ref:!0,__self:!0,__source:!0};function Ra(e,n,t){var r,l={},o=null,i=null;if(n!=null)for(r in n.ref!==void 0&&(i=n.ref),n.key!==void 0&&(o=""+n.key),n)Ma.call(n,r)&&!Ta.hasOwnProperty(r)&&(l[r]=n[r]);var a=arguments.length-2;if(a===1)l.children=t;else if(1<a){for(var s=Array(a),p=0;p<a;p++)s[p]=arguments[p+2];l.children=s}if(e&&e.defaultProps)for(r in a=e.defaultProps,a)l[r]===void 0&&(l[r]=a[r]);return{$$typeof:Ct,type:e,key:o,ref:i,props:l,_owner:ql.current}}function Fp(e,n){return{$$typeof:Ct,type:e.type,key:n,ref:e.ref,props:e.props,_owner:e._owner}}function eo(e){return typeof e=="object"&&e!==null&&e.$$typeof===Ct}function Up(e){var n={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(t){return n[t]})}var Ea=/\/+/g;function Zl(e,n){return typeof e=="object"&&e!==null&&e.key!=null?Up(""+e.key):n.toString(36)}function wr(e,n,t,r,l){var o=typeof e;(o==="undefined"||o==="boolean")&&(e=null);var i=!1;if(e===null)i=!0;else switch(o){case"string":case"number":i=!0;break;case"object":switch(e.$$typeof){case Ct:case Ep:i=!0}}if(i)return i=e,l=l(i),e=r===""?"."+Zl(i,0):r,_a(l)?(t="",e!=null&&(t=e.replace(Ea,"$&/")+"/"),wr(l,n,t,"",function(p){return p})):l!=null&&(eo(l)&&(l=Fp(l,t+(!l.key||i&&i.key===l.key?"":(""+l.key).replace(Ea,"$&/")+"/")+e)),n.push(l)),1;if(i=0,r=r===""?".":r+":",_a(e))for(var a=0;a<e.length;a++){o=e[a];var s=r+Zl(o,a);i+=wr(o,n,t,s,l)}else if(s=Dp(e),typeof s=="function")for(e=s.call(e),a=0;!(o=e.next()).done;)o=o.value,s=r+Zl(o,a++),i+=wr(o,n,t,s,l);else if(o==="object")throw n=String(e),Error("Objects are not valid as a React child (found: "+(n==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":n)+"). If you meant to render a collection of children, use an array instead.");return i}function xr(e,n,t){if(e==null)return e;var r=[],l=0;return wr(e,r,"","",function(o){return n.call(t,o,l++)}),r}function Wp(e){if(e._status===-1){var n=e._result;n=n(),n.then(function(t){(e._status===0||e._status===-1)&&(e._status=1,e._result=t)},function(t){(e._status===0||e._status===-1)&&(e._status=2,e._result=t)}),e._status===-1&&(e._status=0,e._result=n)}if(e._status===1)return e._result.default;throw e._result}var ue={current:null},kr={transition:null},Bp={ReactCurrentDispatcher:ue,ReactCurrentBatchConfig:kr,ReactCurrentOwner:ql};function Oa(){throw Error("act(...) is not supported in production builds of React.")}M.Children={map:xr,forEach:function(e,n,t){xr(e,function(){n.apply(this,arguments)},t)},count:function(e){var n=0;return xr(e,function(){n++}),n},toArray:function(e){return xr(e,function(n){return n})||[]},only:function(e){if(!eo(e))throw Error("React.Children.only expected to receive a single React element child.");return e}};M.Component=Yn;M.Fragment=zp;M.Profiler=Ip;M.PureComponent=bl;M.StrictMode=Pp;M.Suspense=Rp;M.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=Bp;M.act=Oa;M.cloneElement=function(e,n,t){if(e==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+e+".");var r=Pa({},e.props),l=e.key,o=e.ref,i=e._owner;if(n!=null){if(n.ref!==void 0&&(o=n.ref,i=ql.current),n.key!==void 0&&(l=""+n.key),e.type&&e.type.defaultProps)var a=e.type.defaultProps;for(s in n)Ma.call(n,s)&&!Ta.hasOwnProperty(s)&&(r[s]=n[s]===void 0&&a!==void 0?a[s]:n[s])}var s=arguments.length-2;if(s===1)r.children=t;else if(1<s){a=Array(s);for(var p=0;p<s;p++)a[p]=arguments[p+2];r.children=a}return{$$typeof:Ct,type:e.type,key:l,ref:o,props:r,_owner:i}};M.createContext=function(e){return e={$$typeof:Mp,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},e.Provider={$$typeof:Lp,_context:e},e.Consumer=e};M.createElement=Ra;M.createFactory=function(e){var n=Ra.bind(null,e);return n.type=e,n};M.createRef=function(){return{current:null}};M.forwardRef=function(e){return{$$typeof:Tp,render:e}};M.isValidElement=eo;M.lazy=function(e){return{$$typeof:jp,_payload:{_status:-1,_result:e},_init:Wp}};M.memo=function(e,n){return{$$typeof:Op,type:e,compare:n===void 0?null:n}};M.startTransition=function(e){var n=kr.transition;kr.transition={};try{e()}finally{kr.transition=n}};M.unstable_act=Oa;M.useCallback=function(e,n){return ue.current.useCallback(e,n)};M.useContext=function(e){return ue.current.useContext(e)};M.useDebugValue=function(){};M.useDeferredValue=function(e){return ue.current.useDeferredValue(e)};M.useEffect=function(e,n){return ue.current.useEffect(e,n)};M.useId=function(){return ue.current.useId()};M.useImperativeHandle=function(e,n,t){return ue.current.useImperativeHandle(e,n,t)};M.useInsertionEffect=function(e,n){return ue.current.useInsertionEffect(e,n)};M.useLayoutEffect=function(e,n){return ue.current.useLayoutEffect(e,n)};M.useMemo=function(e,n){return ue.current.useMemo(e,n)};M.useReducer=function(e,n,t){return ue.current.useReducer(e,n,t)};M.useRef=function(e){return ue.current.useRef(e)};M.useState=function(e){return ue.current.useState(e)};M.useSyncExternalStore=function(e,n,t){return ue.current.useSyncExternalStore(e,n,t)};M.useTransition=function(){return ue.current.useTransition()};M.version="18.3.1"});var on=Ye((e0,Da)=>{"use strict";Da.exports=ja()});var Ka=Ye(D=>{"use strict";function lo(e,n){var t=e.length;e.push(n);e:for(;0<t;){var r=t-1>>>1,l=e[r];if(0<Sr(l,n))e[r]=n,e[t]=l,t=r;else break e}}function Re(e){return e.length===0?null:e[0]}function Cr(e){if(e.length===0)return null;var n=e[0],t=e.pop();if(t!==n){e[0]=t;e:for(var r=0,l=e.length,o=l>>>1;r<o;){var i=2*(r+1)-1,a=e[i],s=i+1,p=e[s];if(0>Sr(a,t))s<l&&0>Sr(p,a)?(e[r]=p,e[s]=t,r=s):(e[r]=a,e[i]=t,r=i);else if(s<l&&0>Sr(p,t))e[r]=p,e[s]=t,r=s;else break e}}return n}function Sr(e,n){var t=e.sortIndex-n.sortIndex;return t!==0?t:e.id-n.id}typeof performance=="object"&&typeof performance.now=="function"?(Fa=performance,D.unstable_now=function(){return Fa.now()}):(no=Date,Ua=no.now(),D.unstable_now=function(){return no.now()-Ua});var Fa,no,Ua,Ae=[],an=[],Ap=1,_e=null,le=3,_r=!1,Mn=!1,Et=!1,Aa=typeof setTimeout=="function"?setTimeout:null,Va=typeof clearTimeout=="function"?clearTimeout:null,Wa=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function oo(e){for(var n=Re(an);n!==null;){if(n.callback===null)Cr(an);else if(n.startTime<=e)Cr(an),n.sortIndex=n.expirationTime,lo(Ae,n);else break;n=Re(an)}}function io(e){if(Et=!1,oo(e),!Mn)if(Re(Ae)!==null)Mn=!0,so(ao);else{var n=Re(an);n!==null&&uo(io,n.startTime-e)}}function ao(e,n){Mn=!1,Et&&(Et=!1,Va(zt),zt=-1),_r=!0;var t=le;try{for(oo(n),_e=Re(Ae);_e!==null&&(!(_e.expirationTime>n)||e&&!Qa());){var r=_e.callback;if(typeof r=="function"){_e.callback=null,le=_e.priorityLevel;var l=r(_e.expirationTime<=n);n=D.unstable_now(),typeof l=="function"?_e.callback=l:_e===Re(Ae)&&Cr(Ae),oo(n)}else Cr(Ae);_e=Re(Ae)}if(_e!==null)var o=!0;else{var i=Re(an);i!==null&&uo(io,i.startTime-n),o=!1}return o}finally{_e=null,le=t,_r=!1}}var Er=!1,Nr=null,zt=-1,Ha=5,$a=-1;function Qa(){return!(D.unstable_now()-$a<Ha)}function to(){if(Nr!==null){var e=D.unstable_now();$a=e;var n=!0;try{n=Nr(!0,e)}finally{n?_t():(Er=!1,Nr=null)}}else Er=!1}var _t;typeof Wa=="function"?_t=function(){Wa(to)}:typeof MessageChannel<"u"?(ro=new MessageChannel,Ba=ro.port2,ro.port1.onmessage=to,_t=function(){Ba.postMessage(null)}):_t=function(){Aa(to,0)};var ro,Ba;function so(e){Nr=e,Er||(Er=!0,_t())}function uo(e,n){zt=Aa(function(){e(D.unstable_now())},n)}D.unstable_IdlePriority=5;D.unstable_ImmediatePriority=1;D.unstable_LowPriority=4;D.unstable_NormalPriority=3;D.unstable_Profiling=null;D.unstable_UserBlockingPriority=2;D.unstable_cancelCallback=function(e){e.callback=null};D.unstable_continueExecution=function(){Mn||_r||(Mn=!0,so(ao))};D.unstable_forceFrameRate=function(e){0>e||125<e?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):Ha=0<e?Math.floor(1e3/e):5};D.unstable_getCurrentPriorityLevel=function(){return le};D.unstable_getFirstCallbackNode=function(){return Re(Ae)};D.unstable_next=function(e){switch(le){case 1:case 2:case 3:var n=3;break;default:n=le}var t=le;le=n;try{return e()}finally{le=t}};D.unstable_pauseExecution=function(){};D.unstable_requestPaint=function(){};D.unstable_runWithPriority=function(e,n){switch(e){case 1:case 2:case 3:case 4:case 5:break;default:e=3}var t=le;le=e;try{return n()}finally{le=t}};D.unstable_scheduleCallback=function(e,n,t){var r=D.unstable_now();switch(typeof t=="object"&&t!==null?(t=t.delay,t=typeof t=="number"&&0<t?r+t:r):t=r,e){case 1:var l=-1;break;case 2:l=250;break;case 5:l=1073741823;break;case 4:l=1e4;break;default:l=5e3}return l=t+l,e={id:Ap++,callback:n,priorityLevel:e,startTime:t,expirationTime:l,sortIndex:-1},t>r?(e.sortIndex=t,lo(an,e),Re(Ae)===null&&e===Re(an)&&(Et?(Va(zt),zt=-1):Et=!0,uo(io,t-r))):(e.sortIndex=l,lo(Ae,e),Mn||_r||(Mn=!0,so(ao))),e};D.unstable_shouldYield=Qa;D.unstable_wrapCallback=function(e){var n=le;return function(){var t=le;le=n;try{return e.apply(this,arguments)}finally{le=t}}}});var Xa=Ye((t0,Ya)=>{"use strict";Ya.exports=Ka()});var Jc=Ye(Ne=>{"use strict";var Vp=on(),ke=Xa();function x(e){for(var n="https://reactjs.org/docs/error-decoder.html?invariant="+e,t=1;t<arguments.length;t++)n+="&args[]="+encodeURIComponent(arguments[t]);return"Minified React error #"+e+"; visit "+n+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var nu=new Set,Gt={};function $n(e,n){mt(e,n),mt(e+"Capture",n)}function mt(e,n){for(Gt[e]=n,e=0;e<n.length;e++)nu.add(n[e])}var qe=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),Ro=Object.prototype.hasOwnProperty,Hp=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,Ga={},Za={};function $p(e){return Ro.call(Za,e)?!0:Ro.call(Ga,e)?!1:Hp.test(e)?Za[e]=!0:(Ga[e]=!0,!1)}function Qp(e,n,t,r){if(t!==null&&t.type===0)return!1;switch(typeof n){case"function":case"symbol":return!0;case"boolean":return r?!1:t!==null?!t.acceptsBooleans:(e=e.toLowerCase().slice(0,5),e!=="data-"&&e!=="aria-");default:return!1}}function Kp(e,n,t,r){if(n===null||typeof n>"u"||Qp(e,n,t,r))return!0;if(r)return!1;if(t!==null)switch(t.type){case 3:return!n;case 4:return n===!1;case 5:return isNaN(n);case 6:return isNaN(n)||1>n}return!1}function de(e,n,t,r,l,o,i){this.acceptsBooleans=n===2||n===3||n===4,this.attributeName=r,this.attributeNamespace=l,this.mustUseProperty=t,this.propertyName=e,this.type=n,this.sanitizeURL=o,this.removeEmptyString=i}var re={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e){re[e]=new de(e,0,!1,e,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(e){var n=e[0];re[n]=new de(n,1,!1,e[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(e){re[e]=new de(e,2,!1,e.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(e){re[e]=new de(e,2,!1,e,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e){re[e]=new de(e,3,!1,e.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(e){re[e]=new de(e,3,!0,e,null,!1,!1)});["capture","download"].forEach(function(e){re[e]=new de(e,4,!1,e,null,!1,!1)});["cols","rows","size","span"].forEach(function(e){re[e]=new de(e,6,!1,e,null,!1,!1)});["rowSpan","start"].forEach(function(e){re[e]=new de(e,5,!1,e.toLowerCase(),null,!1,!1)});var _i=/[\-:]([a-z])/g;function Ei(e){return e[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e){var n=e.replace(_i,Ei);re[n]=new de(n,1,!1,e,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e){var n=e.replace(_i,Ei);re[n]=new de(n,1,!1,e,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(e){var n=e.replace(_i,Ei);re[n]=new de(n,1,!1,e,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(e){re[e]=new de(e,1,!1,e.toLowerCase(),null,!1,!1)});re.xlinkHref=new de("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(e){re[e]=new de(e,1,!1,e.toLowerCase(),null,!0,!0)});function zi(e,n,t,r){var l=re.hasOwnProperty(n)?re[n]:null;(l!==null?l.type!==0:r||!(2<n.length)||n[0]!=="o"&&n[0]!=="O"||n[1]!=="n"&&n[1]!=="N")&&(Kp(n,t,l,r)&&(t=null),r||l===null?$p(n)&&(t===null?e.removeAttribute(n):e.setAttribute(n,""+t)):l.mustUseProperty?e[l.propertyName]=t===null?l.type===3?!1:"":t:(n=l.attributeName,r=l.attributeNamespace,t===null?e.removeAttribute(n):(l=l.type,t=l===3||l===4&&t===!0?"":""+t,r?e.setAttributeNS(r,n,t):e.setAttribute(n,t))))}var rn=Vp.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,zr=Symbol.for("react.element"),Zn=Symbol.for("react.portal"),bn=Symbol.for("react.fragment"),Pi=Symbol.for("react.strict_mode"),Oo=Symbol.for("react.profiler"),tu=Symbol.for("react.provider"),ru=Symbol.for("react.context"),Ii=Symbol.for("react.forward_ref"),jo=Symbol.for("react.suspense"),Do=Symbol.for("react.suspense_list"),Li=Symbol.for("react.memo"),un=Symbol.for("react.lazy"),lu=Symbol.for("react.offscreen"),ba=Symbol.iterator;function Pt(e){return e===null||typeof e!="object"?null:(e=ba&&e[ba]||e["@@iterator"],typeof e=="function"?e:null)}var Q=Object.assign,co;function Dt(e){if(co===void 0)try{throw Error()}catch(t){var n=t.stack.trim().match(/\n( *(at )?)/);co=n&&n[1]||""}return`
`+co+e}var po=!1;function fo(e,n){if(!e||po)return"";po=!0;var t=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(n)if(n=function(){throw Error()},Object.defineProperty(n.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(n,[])}catch(p){var r=p}Reflect.construct(e,[],n)}else{try{n.call()}catch(p){r=p}e.call(n.prototype)}else{try{throw Error()}catch(p){r=p}e()}}catch(p){if(p&&r&&typeof p.stack=="string"){for(var l=p.stack.split(`
`),o=r.stack.split(`
`),i=l.length-1,a=o.length-1;1<=i&&0<=a&&l[i]!==o[a];)a--;for(;1<=i&&0<=a;i--,a--)if(l[i]!==o[a]){if(i!==1||a!==1)do if(i--,a--,0>a||l[i]!==o[a]){var s=`
`+l[i].replace(" at new "," at ");return e.displayName&&s.includes("<anonymous>")&&(s=s.replace("<anonymous>",e.displayName)),s}while(1<=i&&0<=a);break}}}finally{po=!1,Error.prepareStackTrace=t}return(e=e?e.displayName||e.name:"")?Dt(e):""}function Yp(e){switch(e.tag){case 5:return Dt(e.type);case 16:return Dt("Lazy");case 13:return Dt("Suspense");case 19:return Dt("SuspenseList");case 0:case 2:case 15:return e=fo(e.type,!1),e;case 11:return e=fo(e.type.render,!1),e;case 1:return e=fo(e.type,!0),e;default:return""}}function Fo(e){if(e==null)return null;if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case bn:return"Fragment";case Zn:return"Portal";case Oo:return"Profiler";case Pi:return"StrictMode";case jo:return"Suspense";case Do:return"SuspenseList"}if(typeof e=="object")switch(e.$$typeof){case ru:return(e.displayName||"Context")+".Consumer";case tu:return(e._context.displayName||"Context")+".Provider";case Ii:var n=e.render;return e=e.displayName,e||(e=n.displayName||n.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case Li:return n=e.displayName||null,n!==null?n:Fo(e.type)||"Memo";case un:n=e._payload,e=e._init;try{return Fo(e(n))}catch{}}return null}function Xp(e){var n=e.type;switch(e.tag){case 24:return"Cache";case 9:return(n.displayName||"Context")+".Consumer";case 10:return(n._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return e=n.render,e=e.displayName||e.name||"",n.displayName||(e!==""?"ForwardRef("+e+")":"ForwardRef");case 7:return"Fragment";case 5:return n;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return Fo(n);case 8:return n===Pi?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof n=="function")return n.displayName||n.name||null;if(typeof n=="string")return n}return null}function Nn(e){switch(typeof e){case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function ou(e){var n=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(n==="checkbox"||n==="radio")}function Gp(e){var n=ou(e)?"checked":"value",t=Object.getOwnPropertyDescriptor(e.constructor.prototype,n),r=""+e[n];if(!e.hasOwnProperty(n)&&typeof t<"u"&&typeof t.get=="function"&&typeof t.set=="function"){var l=t.get,o=t.set;return Object.defineProperty(e,n,{configurable:!0,get:function(){return l.call(this)},set:function(i){r=""+i,o.call(this,i)}}),Object.defineProperty(e,n,{enumerable:t.enumerable}),{getValue:function(){return r},setValue:function(i){r=""+i},stopTracking:function(){e._valueTracker=null,delete e[n]}}}}function Pr(e){e._valueTracker||(e._valueTracker=Gp(e))}function iu(e){if(!e)return!1;var n=e._valueTracker;if(!n)return!0;var t=n.getValue(),r="";return e&&(r=ou(e)?e.checked?"true":"false":e.value),e=r,e!==t?(n.setValue(e),!0):!1}function tl(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}function Uo(e,n){var t=n.checked;return Q({},n,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:t??e._wrapperState.initialChecked})}function Ja(e,n){var t=n.defaultValue==null?"":n.defaultValue,r=n.checked!=null?n.checked:n.defaultChecked;t=Nn(n.value!=null?n.value:t),e._wrapperState={initialChecked:r,initialValue:t,controlled:n.type==="checkbox"||n.type==="radio"?n.checked!=null:n.value!=null}}function au(e,n){n=n.checked,n!=null&&zi(e,"checked",n,!1)}function Wo(e,n){au(e,n);var t=Nn(n.value),r=n.type;if(t!=null)r==="number"?(t===0&&e.value===""||e.value!=t)&&(e.value=""+t):e.value!==""+t&&(e.value=""+t);else if(r==="submit"||r==="reset"){e.removeAttribute("value");return}n.hasOwnProperty("value")?Bo(e,n.type,t):n.hasOwnProperty("defaultValue")&&Bo(e,n.type,Nn(n.defaultValue)),n.checked==null&&n.defaultChecked!=null&&(e.defaultChecked=!!n.defaultChecked)}function qa(e,n,t){if(n.hasOwnProperty("value")||n.hasOwnProperty("defaultValue")){var r=n.type;if(!(r!=="submit"&&r!=="reset"||n.value!==void 0&&n.value!==null))return;n=""+e._wrapperState.initialValue,t||n===e.value||(e.value=n),e.defaultValue=n}t=e.name,t!==""&&(e.name=""),e.defaultChecked=!!e._wrapperState.initialChecked,t!==""&&(e.name=t)}function Bo(e,n,t){(n!=="number"||tl(e.ownerDocument)!==e)&&(t==null?e.defaultValue=""+e._wrapperState.initialValue:e.defaultValue!==""+t&&(e.defaultValue=""+t))}var Ft=Array.isArray;function st(e,n,t,r){if(e=e.options,n){n={};for(var l=0;l<t.length;l++)n["$"+t[l]]=!0;for(t=0;t<e.length;t++)l=n.hasOwnProperty("$"+e[t].value),e[t].selected!==l&&(e[t].selected=l),l&&r&&(e[t].defaultSelected=!0)}else{for(t=""+Nn(t),n=null,l=0;l<e.length;l++){if(e[l].value===t){e[l].selected=!0,r&&(e[l].defaultSelected=!0);return}n!==null||e[l].disabled||(n=e[l])}n!==null&&(n.selected=!0)}}function Ao(e,n){if(n.dangerouslySetInnerHTML!=null)throw Error(x(91));return Q({},n,{value:void 0,defaultValue:void 0,children:""+e._wrapperState.initialValue})}function es(e,n){var t=n.value;if(t==null){if(t=n.children,n=n.defaultValue,t!=null){if(n!=null)throw Error(x(92));if(Ft(t)){if(1<t.length)throw Error(x(93));t=t[0]}n=t}n==null&&(n=""),t=n}e._wrapperState={initialValue:Nn(t)}}function su(e,n){var t=Nn(n.value),r=Nn(n.defaultValue);t!=null&&(t=""+t,t!==e.value&&(e.value=t),n.defaultValue==null&&e.defaultValue!==t&&(e.defaultValue=t)),r!=null&&(e.defaultValue=""+r)}function ns(e){var n=e.textContent;n===e._wrapperState.initialValue&&n!==""&&n!==null&&(e.value=n)}function uu(e){switch(e){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function Vo(e,n){return e==null||e==="http://www.w3.org/1999/xhtml"?uu(n):e==="http://www.w3.org/2000/svg"&&n==="foreignObject"?"http://www.w3.org/1999/xhtml":e}var Ir,cu=(function(e){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(n,t,r,l){MSApp.execUnsafeLocalFunction(function(){return e(n,t,r,l)})}:e})(function(e,n){if(e.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in e)e.innerHTML=n;else{for(Ir=Ir||document.createElement("div"),Ir.innerHTML="<svg>"+n.valueOf().toString()+"</svg>",n=Ir.firstChild;e.firstChild;)e.removeChild(e.firstChild);for(;n.firstChild;)e.appendChild(n.firstChild)}});function Zt(e,n){if(n){var t=e.firstChild;if(t&&t===e.lastChild&&t.nodeType===3){t.nodeValue=n;return}}e.textContent=n}var Bt={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},Zp=["Webkit","ms","Moz","O"];Object.keys(Bt).forEach(function(e){Zp.forEach(function(n){n=n+e.charAt(0).toUpperCase()+e.substring(1),Bt[n]=Bt[e]})});function pu(e,n,t){return n==null||typeof n=="boolean"||n===""?"":t||typeof n!="number"||n===0||Bt.hasOwnProperty(e)&&Bt[e]?(""+n).trim():n+"px"}function du(e,n){e=e.style;for(var t in n)if(n.hasOwnProperty(t)){var r=t.indexOf("--")===0,l=pu(t,n[t],r);t==="float"&&(t="cssFloat"),r?e.setProperty(t,l):e[t]=l}}var bp=Q({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function Ho(e,n){if(n){if(bp[e]&&(n.children!=null||n.dangerouslySetInnerHTML!=null))throw Error(x(137,e));if(n.dangerouslySetInnerHTML!=null){if(n.children!=null)throw Error(x(60));if(typeof n.dangerouslySetInnerHTML!="object"||!("__html"in n.dangerouslySetInnerHTML))throw Error(x(61))}if(n.style!=null&&typeof n.style!="object")throw Error(x(62))}}function $o(e,n){if(e.indexOf("-")===-1)return typeof n.is=="string";switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Qo=null;function Mi(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var Ko=null,ut=null,ct=null;function ts(e){if(e=mr(e)){if(typeof Ko!="function")throw Error(x(280));var n=e.stateNode;n&&(n=Ll(n),Ko(e.stateNode,e.type,n))}}function fu(e){ut?ct?ct.push(e):ct=[e]:ut=e}function mu(){if(ut){var e=ut,n=ct;if(ct=ut=null,ts(e),n)for(e=0;e<n.length;e++)ts(n[e])}}function gu(e,n){return e(n)}function hu(){}var mo=!1;function vu(e,n,t){if(mo)return e(n,t);mo=!0;try{return gu(e,n,t)}finally{mo=!1,(ut!==null||ct!==null)&&(hu(),mu())}}function bt(e,n){var t=e.stateNode;if(t===null)return null;var r=Ll(t);if(r===null)return null;t=r[n];e:switch(n){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(r=!r.disabled)||(e=e.type,r=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!r;break e;default:e=!1}if(e)return null;if(t&&typeof t!="function")throw Error(x(231,n,typeof t));return t}var Yo=!1;if(qe)try{Xn={},Object.defineProperty(Xn,"passive",{get:function(){Yo=!0}}),window.addEventListener("test",Xn,Xn),window.removeEventListener("test",Xn,Xn)}catch{Yo=!1}var Xn;function Jp(e,n,t,r,l,o,i,a,s){var p=Array.prototype.slice.call(arguments,3);try{n.apply(t,p)}catch(h){this.onError(h)}}var At=!1,rl=null,ll=!1,Xo=null,qp={onError:function(e){At=!0,rl=e}};function ed(e,n,t,r,l,o,i,a,s){At=!1,rl=null,Jp.apply(qp,arguments)}function nd(e,n,t,r,l,o,i,a,s){if(ed.apply(this,arguments),At){if(At){var p=rl;At=!1,rl=null}else throw Error(x(198));ll||(ll=!0,Xo=p)}}function Qn(e){var n=e,t=e;if(e.alternate)for(;n.return;)n=n.return;else{e=n;do n=e,(n.flags&4098)!==0&&(t=n.return),e=n.return;while(e)}return n.tag===3?t:null}function yu(e){if(e.tag===13){var n=e.memoizedState;if(n===null&&(e=e.alternate,e!==null&&(n=e.memoizedState)),n!==null)return n.dehydrated}return null}function rs(e){if(Qn(e)!==e)throw Error(x(188))}function td(e){var n=e.alternate;if(!n){if(n=Qn(e),n===null)throw Error(x(188));return n!==e?null:e}for(var t=e,r=n;;){var l=t.return;if(l===null)break;var o=l.alternate;if(o===null){if(r=l.return,r!==null){t=r;continue}break}if(l.child===o.child){for(o=l.child;o;){if(o===t)return rs(l),e;if(o===r)return rs(l),n;o=o.sibling}throw Error(x(188))}if(t.return!==r.return)t=l,r=o;else{for(var i=!1,a=l.child;a;){if(a===t){i=!0,t=l,r=o;break}if(a===r){i=!0,r=l,t=o;break}a=a.sibling}if(!i){for(a=o.child;a;){if(a===t){i=!0,t=o,r=l;break}if(a===r){i=!0,r=o,t=l;break}a=a.sibling}if(!i)throw Error(x(189))}}if(t.alternate!==r)throw Error(x(190))}if(t.tag!==3)throw Error(x(188));return t.stateNode.current===t?e:n}function xu(e){return e=td(e),e!==null?wu(e):null}function wu(e){if(e.tag===5||e.tag===6)return e;for(e=e.child;e!==null;){var n=wu(e);if(n!==null)return n;e=e.sibling}return null}var ku=ke.unstable_scheduleCallback,ls=ke.unstable_cancelCallback,rd=ke.unstable_shouldYield,ld=ke.unstable_requestPaint,Y=ke.unstable_now,od=ke.unstable_getCurrentPriorityLevel,Ti=ke.unstable_ImmediatePriority,Su=ke.unstable_UserBlockingPriority,ol=ke.unstable_NormalPriority,id=ke.unstable_LowPriority,Nu=ke.unstable_IdlePriority,El=null,Qe=null;function ad(e){if(Qe&&typeof Qe.onCommitFiberRoot=="function")try{Qe.onCommitFiberRoot(El,e,void 0,(e.current.flags&128)===128)}catch{}}var Ue=Math.clz32?Math.clz32:cd,sd=Math.log,ud=Math.LN2;function cd(e){return e>>>=0,e===0?32:31-(sd(e)/ud|0)|0}var Lr=64,Mr=4194304;function Ut(e){switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return e&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return e}}function il(e,n){var t=e.pendingLanes;if(t===0)return 0;var r=0,l=e.suspendedLanes,o=e.pingedLanes,i=t&268435455;if(i!==0){var a=i&~l;a!==0?r=Ut(a):(o&=i,o!==0&&(r=Ut(o)))}else i=t&~l,i!==0?r=Ut(i):o!==0&&(r=Ut(o));if(r===0)return 0;if(n!==0&&n!==r&&(n&l)===0&&(l=r&-r,o=n&-n,l>=o||l===16&&(o&4194240)!==0))return n;if((r&4)!==0&&(r|=t&16),n=e.entangledLanes,n!==0)for(e=e.entanglements,n&=r;0<n;)t=31-Ue(n),l=1<<t,r|=e[t],n&=~l;return r}function pd(e,n){switch(e){case 1:case 2:case 4:return n+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return n+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function dd(e,n){for(var t=e.suspendedLanes,r=e.pingedLanes,l=e.expirationTimes,o=e.pendingLanes;0<o;){var i=31-Ue(o),a=1<<i,s=l[i];s===-1?((a&t)===0||(a&r)!==0)&&(l[i]=pd(a,n)):s<=n&&(e.expiredLanes|=a),o&=~a}}function Go(e){return e=e.pendingLanes&-1073741825,e!==0?e:e&1073741824?1073741824:0}function Cu(){var e=Lr;return Lr<<=1,(Lr&4194240)===0&&(Lr=64),e}function go(e){for(var n=[],t=0;31>t;t++)n.push(e);return n}function dr(e,n,t){e.pendingLanes|=n,n!==536870912&&(e.suspendedLanes=0,e.pingedLanes=0),e=e.eventTimes,n=31-Ue(n),e[n]=t}function fd(e,n){var t=e.pendingLanes&~n;e.pendingLanes=n,e.suspendedLanes=0,e.pingedLanes=0,e.expiredLanes&=n,e.mutableReadLanes&=n,e.entangledLanes&=n,n=e.entanglements;var r=e.eventTimes;for(e=e.expirationTimes;0<t;){var l=31-Ue(t),o=1<<l;n[l]=0,r[l]=-1,e[l]=-1,t&=~o}}function Ri(e,n){var t=e.entangledLanes|=n;for(e=e.entanglements;t;){var r=31-Ue(t),l=1<<r;l&n|e[r]&n&&(e[r]|=n),t&=~l}}var O=0;function _u(e){return e&=-e,1<e?4<e?(e&268435455)!==0?16:536870912:4:1}var Eu,Oi,zu,Pu,Iu,Zo=!1,Tr=[],gn=null,hn=null,vn=null,Jt=new Map,qt=new Map,pn=[],md="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function os(e,n){switch(e){case"focusin":case"focusout":gn=null;break;case"dragenter":case"dragleave":hn=null;break;case"mouseover":case"mouseout":vn=null;break;case"pointerover":case"pointerout":Jt.delete(n.pointerId);break;case"gotpointercapture":case"lostpointercapture":qt.delete(n.pointerId)}}function It(e,n,t,r,l,o){return e===null||e.nativeEvent!==o?(e={blockedOn:n,domEventName:t,eventSystemFlags:r,nativeEvent:o,targetContainers:[l]},n!==null&&(n=mr(n),n!==null&&Oi(n)),e):(e.eventSystemFlags|=r,n=e.targetContainers,l!==null&&n.indexOf(l)===-1&&n.push(l),e)}function gd(e,n,t,r,l){switch(n){case"focusin":return gn=It(gn,e,n,t,r,l),!0;case"dragenter":return hn=It(hn,e,n,t,r,l),!0;case"mouseover":return vn=It(vn,e,n,t,r,l),!0;case"pointerover":var o=l.pointerId;return Jt.set(o,It(Jt.get(o)||null,e,n,t,r,l)),!0;case"gotpointercapture":return o=l.pointerId,qt.set(o,It(qt.get(o)||null,e,n,t,r,l)),!0}return!1}function Lu(e){var n=On(e.target);if(n!==null){var t=Qn(n);if(t!==null){if(n=t.tag,n===13){if(n=yu(t),n!==null){e.blockedOn=n,Iu(e.priority,function(){zu(t)});return}}else if(n===3&&t.stateNode.current.memoizedState.isDehydrated){e.blockedOn=t.tag===3?t.stateNode.containerInfo:null;return}}}e.blockedOn=null}function Kr(e){if(e.blockedOn!==null)return!1;for(var n=e.targetContainers;0<n.length;){var t=bo(e.domEventName,e.eventSystemFlags,n[0],e.nativeEvent);if(t===null){t=e.nativeEvent;var r=new t.constructor(t.type,t);Qo=r,t.target.dispatchEvent(r),Qo=null}else return n=mr(t),n!==null&&Oi(n),e.blockedOn=t,!1;n.shift()}return!0}function is(e,n,t){Kr(e)&&t.delete(n)}function hd(){Zo=!1,gn!==null&&Kr(gn)&&(gn=null),hn!==null&&Kr(hn)&&(hn=null),vn!==null&&Kr(vn)&&(vn=null),Jt.forEach(is),qt.forEach(is)}function Lt(e,n){e.blockedOn===n&&(e.blockedOn=null,Zo||(Zo=!0,ke.unstable_scheduleCallback(ke.unstable_NormalPriority,hd)))}function er(e){function n(l){return Lt(l,e)}if(0<Tr.length){Lt(Tr[0],e);for(var t=1;t<Tr.length;t++){var r=Tr[t];r.blockedOn===e&&(r.blockedOn=null)}}for(gn!==null&&Lt(gn,e),hn!==null&&Lt(hn,e),vn!==null&&Lt(vn,e),Jt.forEach(n),qt.forEach(n),t=0;t<pn.length;t++)r=pn[t],r.blockedOn===e&&(r.blockedOn=null);for(;0<pn.length&&(t=pn[0],t.blockedOn===null);)Lu(t),t.blockedOn===null&&pn.shift()}var pt=rn.ReactCurrentBatchConfig,al=!0;function vd(e,n,t,r){var l=O,o=pt.transition;pt.transition=null;try{O=1,ji(e,n,t,r)}finally{O=l,pt.transition=o}}function yd(e,n,t,r){var l=O,o=pt.transition;pt.transition=null;try{O=4,ji(e,n,t,r)}finally{O=l,pt.transition=o}}function ji(e,n,t,r){if(al){var l=bo(e,n,t,r);if(l===null)So(e,n,r,sl,t),os(e,r);else if(gd(l,e,n,t,r))r.stopPropagation();else if(os(e,r),n&4&&-1<md.indexOf(e)){for(;l!==null;){var o=mr(l);if(o!==null&&Eu(o),o=bo(e,n,t,r),o===null&&So(e,n,r,sl,t),o===l)break;l=o}l!==null&&r.stopPropagation()}else So(e,n,r,null,t)}}var sl=null;function bo(e,n,t,r){if(sl=null,e=Mi(r),e=On(e),e!==null)if(n=Qn(e),n===null)e=null;else if(t=n.tag,t===13){if(e=yu(n),e!==null)return e;e=null}else if(t===3){if(n.stateNode.current.memoizedState.isDehydrated)return n.tag===3?n.stateNode.containerInfo:null;e=null}else n!==e&&(e=null);return sl=e,null}function Mu(e){switch(e){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(od()){case Ti:return 1;case Su:return 4;case ol:case id:return 16;case Nu:return 536870912;default:return 16}default:return 16}}var fn=null,Di=null,Yr=null;function Tu(){if(Yr)return Yr;var e,n=Di,t=n.length,r,l="value"in fn?fn.value:fn.textContent,o=l.length;for(e=0;e<t&&n[e]===l[e];e++);var i=t-e;for(r=1;r<=i&&n[t-r]===l[o-r];r++);return Yr=l.slice(e,1<r?1-r:void 0)}function Xr(e){var n=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&n===13&&(e=13)):e=n,e===10&&(e=13),32<=e||e===13?e:0}function Rr(){return!0}function as(){return!1}function Se(e){function n(t,r,l,o,i){this._reactName=t,this._targetInst=l,this.type=r,this.nativeEvent=o,this.target=i,this.currentTarget=null;for(var a in e)e.hasOwnProperty(a)&&(t=e[a],this[a]=t?t(o):o[a]);return this.isDefaultPrevented=(o.defaultPrevented!=null?o.defaultPrevented:o.returnValue===!1)?Rr:as,this.isPropagationStopped=as,this}return Q(n.prototype,{preventDefault:function(){this.defaultPrevented=!0;var t=this.nativeEvent;t&&(t.preventDefault?t.preventDefault():typeof t.returnValue!="unknown"&&(t.returnValue=!1),this.isDefaultPrevented=Rr)},stopPropagation:function(){var t=this.nativeEvent;t&&(t.stopPropagation?t.stopPropagation():typeof t.cancelBubble!="unknown"&&(t.cancelBubble=!0),this.isPropagationStopped=Rr)},persist:function(){},isPersistent:Rr}),n}var kt={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Fi=Se(kt),fr=Q({},kt,{view:0,detail:0}),xd=Se(fr),ho,vo,Mt,zl=Q({},fr,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Ui,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==Mt&&(Mt&&e.type==="mousemove"?(ho=e.screenX-Mt.screenX,vo=e.screenY-Mt.screenY):vo=ho=0,Mt=e),ho)},movementY:function(e){return"movementY"in e?e.movementY:vo}}),ss=Se(zl),wd=Q({},zl,{dataTransfer:0}),kd=Se(wd),Sd=Q({},fr,{relatedTarget:0}),yo=Se(Sd),Nd=Q({},kt,{animationName:0,elapsedTime:0,pseudoElement:0}),Cd=Se(Nd),_d=Q({},kt,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),Ed=Se(_d),zd=Q({},kt,{data:0}),us=Se(zd),Pd={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},Id={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},Ld={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function Md(e){var n=this.nativeEvent;return n.getModifierState?n.getModifierState(e):(e=Ld[e])?!!n[e]:!1}function Ui(){return Md}var Td=Q({},fr,{key:function(e){if(e.key){var n=Pd[e.key]||e.key;if(n!=="Unidentified")return n}return e.type==="keypress"?(e=Xr(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?Id[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Ui,charCode:function(e){return e.type==="keypress"?Xr(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?Xr(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),Rd=Se(Td),Od=Q({},zl,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),cs=Se(Od),jd=Q({},fr,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Ui}),Dd=Se(jd),Fd=Q({},kt,{propertyName:0,elapsedTime:0,pseudoElement:0}),Ud=Se(Fd),Wd=Q({},zl,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),Bd=Se(Wd),Ad=[9,13,27,32],Wi=qe&&"CompositionEvent"in window,Vt=null;qe&&"documentMode"in document&&(Vt=document.documentMode);var Vd=qe&&"TextEvent"in window&&!Vt,Ru=qe&&(!Wi||Vt&&8<Vt&&11>=Vt),ps=" ",ds=!1;function Ou(e,n){switch(e){case"keyup":return Ad.indexOf(n.keyCode)!==-1;case"keydown":return n.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function ju(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var Jn=!1;function Hd(e,n){switch(e){case"compositionend":return ju(n);case"keypress":return n.which!==32?null:(ds=!0,ps);case"textInput":return e=n.data,e===ps&&ds?null:e;default:return null}}function $d(e,n){if(Jn)return e==="compositionend"||!Wi&&Ou(e,n)?(e=Tu(),Yr=Di=fn=null,Jn=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(n.ctrlKey||n.altKey||n.metaKey)||n.ctrlKey&&n.altKey){if(n.char&&1<n.char.length)return n.char;if(n.which)return String.fromCharCode(n.which)}return null;case"compositionend":return Ru&&n.locale!=="ko"?null:n.data;default:return null}}var Qd={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function fs(e){var n=e&&e.nodeName&&e.nodeName.toLowerCase();return n==="input"?!!Qd[e.type]:n==="textarea"}function Du(e,n,t,r){fu(r),n=ul(n,"onChange"),0<n.length&&(t=new Fi("onChange","change",null,t,r),e.push({event:t,listeners:n}))}var Ht=null,nr=null;function Kd(e){Yu(e,0)}function Pl(e){var n=nt(e);if(iu(n))return e}function Yd(e,n){if(e==="change")return n}var Fu=!1;qe&&(qe?(jr="oninput"in document,jr||(xo=document.createElement("div"),xo.setAttribute("oninput","return;"),jr=typeof xo.oninput=="function"),Or=jr):Or=!1,Fu=Or&&(!document.documentMode||9<document.documentMode));var Or,jr,xo;function ms(){Ht&&(Ht.detachEvent("onpropertychange",Uu),nr=Ht=null)}function Uu(e){if(e.propertyName==="value"&&Pl(nr)){var n=[];Du(n,nr,e,Mi(e)),vu(Kd,n)}}function Xd(e,n,t){e==="focusin"?(ms(),Ht=n,nr=t,Ht.attachEvent("onpropertychange",Uu)):e==="focusout"&&ms()}function Gd(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return Pl(nr)}function Zd(e,n){if(e==="click")return Pl(n)}function bd(e,n){if(e==="input"||e==="change")return Pl(n)}function Jd(e,n){return e===n&&(e!==0||1/e===1/n)||e!==e&&n!==n}var Be=typeof Object.is=="function"?Object.is:Jd;function tr(e,n){if(Be(e,n))return!0;if(typeof e!="object"||e===null||typeof n!="object"||n===null)return!1;var t=Object.keys(e),r=Object.keys(n);if(t.length!==r.length)return!1;for(r=0;r<t.length;r++){var l=t[r];if(!Ro.call(n,l)||!Be(e[l],n[l]))return!1}return!0}function gs(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function hs(e,n){var t=gs(e);e=0;for(var r;t;){if(t.nodeType===3){if(r=e+t.textContent.length,e<=n&&r>=n)return{node:t,offset:n-e};e=r}e:{for(;t;){if(t.nextSibling){t=t.nextSibling;break e}t=t.parentNode}t=void 0}t=gs(t)}}function Wu(e,n){return e&&n?e===n?!0:e&&e.nodeType===3?!1:n&&n.nodeType===3?Wu(e,n.parentNode):"contains"in e?e.contains(n):e.compareDocumentPosition?!!(e.compareDocumentPosition(n)&16):!1:!1}function Bu(){for(var e=window,n=tl();n instanceof e.HTMLIFrameElement;){try{var t=typeof n.contentWindow.location.href=="string"}catch{t=!1}if(t)e=n.contentWindow;else break;n=tl(e.document)}return n}function Bi(e){var n=e&&e.nodeName&&e.nodeName.toLowerCase();return n&&(n==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||n==="textarea"||e.contentEditable==="true")}function qd(e){var n=Bu(),t=e.focusedElem,r=e.selectionRange;if(n!==t&&t&&t.ownerDocument&&Wu(t.ownerDocument.documentElement,t)){if(r!==null&&Bi(t)){if(n=r.start,e=r.end,e===void 0&&(e=n),"selectionStart"in t)t.selectionStart=n,t.selectionEnd=Math.min(e,t.value.length);else if(e=(n=t.ownerDocument||document)&&n.defaultView||window,e.getSelection){e=e.getSelection();var l=t.textContent.length,o=Math.min(r.start,l);r=r.end===void 0?o:Math.min(r.end,l),!e.extend&&o>r&&(l=r,r=o,o=l),l=hs(t,o);var i=hs(t,r);l&&i&&(e.rangeCount!==1||e.anchorNode!==l.node||e.anchorOffset!==l.offset||e.focusNode!==i.node||e.focusOffset!==i.offset)&&(n=n.createRange(),n.setStart(l.node,l.offset),e.removeAllRanges(),o>r?(e.addRange(n),e.extend(i.node,i.offset)):(n.setEnd(i.node,i.offset),e.addRange(n)))}}for(n=[],e=t;e=e.parentNode;)e.nodeType===1&&n.push({element:e,left:e.scrollLeft,top:e.scrollTop});for(typeof t.focus=="function"&&t.focus(),t=0;t<n.length;t++)e=n[t],e.element.scrollLeft=e.left,e.element.scrollTop=e.top}}var ef=qe&&"documentMode"in document&&11>=document.documentMode,qn=null,Jo=null,$t=null,qo=!1;function vs(e,n,t){var r=t.window===t?t.document:t.nodeType===9?t:t.ownerDocument;qo||qn==null||qn!==tl(r)||(r=qn,"selectionStart"in r&&Bi(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),$t&&tr($t,r)||($t=r,r=ul(Jo,"onSelect"),0<r.length&&(n=new Fi("onSelect","select",null,n,t),e.push({event:n,listeners:r}),n.target=qn)))}function Dr(e,n){var t={};return t[e.toLowerCase()]=n.toLowerCase(),t["Webkit"+e]="webkit"+n,t["Moz"+e]="moz"+n,t}var et={animationend:Dr("Animation","AnimationEnd"),animationiteration:Dr("Animation","AnimationIteration"),animationstart:Dr("Animation","AnimationStart"),transitionend:Dr("Transition","TransitionEnd")},wo={},Au={};qe&&(Au=document.createElement("div").style,"AnimationEvent"in window||(delete et.animationend.animation,delete et.animationiteration.animation,delete et.animationstart.animation),"TransitionEvent"in window||delete et.transitionend.transition);function Il(e){if(wo[e])return wo[e];if(!et[e])return e;var n=et[e],t;for(t in n)if(n.hasOwnProperty(t)&&t in Au)return wo[e]=n[t];return e}var Vu=Il("animationend"),Hu=Il("animationiteration"),$u=Il("animationstart"),Qu=Il("transitionend"),Ku=new Map,ys="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function _n(e,n){Ku.set(e,n),$n(n,[e])}for(Fr=0;Fr<ys.length;Fr++)Ur=ys[Fr],xs=Ur.toLowerCase(),ws=Ur[0].toUpperCase()+Ur.slice(1),_n(xs,"on"+ws);var Ur,xs,ws,Fr;_n(Vu,"onAnimationEnd");_n(Hu,"onAnimationIteration");_n($u,"onAnimationStart");_n("dblclick","onDoubleClick");_n("focusin","onFocus");_n("focusout","onBlur");_n(Qu,"onTransitionEnd");mt("onMouseEnter",["mouseout","mouseover"]);mt("onMouseLeave",["mouseout","mouseover"]);mt("onPointerEnter",["pointerout","pointerover"]);mt("onPointerLeave",["pointerout","pointerover"]);$n("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));$n("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));$n("onBeforeInput",["compositionend","keypress","textInput","paste"]);$n("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));$n("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));$n("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Wt="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),nf=new Set("cancel close invalid load scroll toggle".split(" ").concat(Wt));function ks(e,n,t){var r=e.type||"unknown-event";e.currentTarget=t,nd(r,n,void 0,e),e.currentTarget=null}function Yu(e,n){n=(n&4)!==0;for(var t=0;t<e.length;t++){var r=e[t],l=r.event;r=r.listeners;e:{var o=void 0;if(n)for(var i=r.length-1;0<=i;i--){var a=r[i],s=a.instance,p=a.currentTarget;if(a=a.listener,s!==o&&l.isPropagationStopped())break e;ks(l,a,p),o=s}else for(i=0;i<r.length;i++){if(a=r[i],s=a.instance,p=a.currentTarget,a=a.listener,s!==o&&l.isPropagationStopped())break e;ks(l,a,p),o=s}}}if(ll)throw e=Xo,ll=!1,Xo=null,e}function U(e,n){var t=n[li];t===void 0&&(t=n[li]=new Set);var r=e+"__bubble";t.has(r)||(Xu(n,e,2,!1),t.add(r))}function ko(e,n,t){var r=0;n&&(r|=4),Xu(t,e,r,n)}var Wr="_reactListening"+Math.random().toString(36).slice(2);function rr(e){if(!e[Wr]){e[Wr]=!0,nu.forEach(function(t){t!=="selectionchange"&&(nf.has(t)||ko(t,!1,e),ko(t,!0,e))});var n=e.nodeType===9?e:e.ownerDocument;n===null||n[Wr]||(n[Wr]=!0,ko("selectionchange",!1,n))}}function Xu(e,n,t,r){switch(Mu(n)){case 1:var l=vd;break;case 4:l=yd;break;default:l=ji}t=l.bind(null,n,t,e),l=void 0,!Yo||n!=="touchstart"&&n!=="touchmove"&&n!=="wheel"||(l=!0),r?l!==void 0?e.addEventListener(n,t,{capture:!0,passive:l}):e.addEventListener(n,t,!0):l!==void 0?e.addEventListener(n,t,{passive:l}):e.addEventListener(n,t,!1)}function So(e,n,t,r,l){var o=r;if((n&1)===0&&(n&2)===0&&r!==null)e:for(;;){if(r===null)return;var i=r.tag;if(i===3||i===4){var a=r.stateNode.containerInfo;if(a===l||a.nodeType===8&&a.parentNode===l)break;if(i===4)for(i=r.return;i!==null;){var s=i.tag;if((s===3||s===4)&&(s=i.stateNode.containerInfo,s===l||s.nodeType===8&&s.parentNode===l))return;i=i.return}for(;a!==null;){if(i=On(a),i===null)return;if(s=i.tag,s===5||s===6){r=o=i;continue e}a=a.parentNode}}r=r.return}vu(function(){var p=o,h=Mi(t),f=[];e:{var m=Ku.get(e);if(m!==void 0){var w=Fi,S=e;switch(e){case"keypress":if(Xr(t)===0)break e;case"keydown":case"keyup":w=Rd;break;case"focusin":S="focus",w=yo;break;case"focusout":S="blur",w=yo;break;case"beforeblur":case"afterblur":w=yo;break;case"click":if(t.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":w=ss;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":w=kd;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":w=Dd;break;case Vu:case Hu:case $u:w=Cd;break;case Qu:w=Ud;break;case"scroll":w=xd;break;case"wheel":w=Bd;break;case"copy":case"cut":case"paste":w=Ed;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":w=cs}var _=(n&4)!==0,j=!_&&e==="scroll",u=_?m!==null?m+"Capture":null:m;_=[];for(var c=p,d;c!==null;){d=c;var y=d.stateNode;if(d.tag===5&&y!==null&&(d=y,u!==null&&(y=bt(c,u),y!=null&&_.push(lr(c,y,d)))),j)break;c=c.return}0<_.length&&(m=new w(m,S,null,t,h),f.push({event:m,listeners:_}))}}if((n&7)===0){e:{if(m=e==="mouseover"||e==="pointerover",w=e==="mouseout"||e==="pointerout",m&&t!==Qo&&(S=t.relatedTarget||t.fromElement)&&(On(S)||S[en]))break e;if((w||m)&&(m=h.window===h?h:(m=h.ownerDocument)?m.defaultView||m.parentWindow:window,w?(S=t.relatedTarget||t.toElement,w=p,S=S?On(S):null,S!==null&&(j=Qn(S),S!==j||S.tag!==5&&S.tag!==6)&&(S=null)):(w=null,S=p),w!==S)){if(_=ss,y="onMouseLeave",u="onMouseEnter",c="mouse",(e==="pointerout"||e==="pointerover")&&(_=cs,y="onPointerLeave",u="onPointerEnter",c="pointer"),j=w==null?m:nt(w),d=S==null?m:nt(S),m=new _(y,c+"leave",w,t,h),m.target=j,m.relatedTarget=d,y=null,On(h)===p&&(_=new _(u,c+"enter",S,t,h),_.target=d,_.relatedTarget=j,y=_),j=y,w&&S)n:{for(_=w,u=S,c=0,d=_;d;d=Gn(d))c++;for(d=0,y=u;y;y=Gn(y))d++;for(;0<c-d;)_=Gn(_),c--;for(;0<d-c;)u=Gn(u),d--;for(;c--;){if(_===u||u!==null&&_===u.alternate)break n;_=Gn(_),u=Gn(u)}_=null}else _=null;w!==null&&Ss(f,m,w,_,!1),S!==null&&j!==null&&Ss(f,j,S,_,!0)}}e:{if(m=p?nt(p):window,w=m.nodeName&&m.nodeName.toLowerCase(),w==="select"||w==="input"&&m.type==="file")var P=Yd;else if(fs(m))if(Fu)P=bd;else{P=Gd;var k=Xd}else(w=m.nodeName)&&w.toLowerCase()==="input"&&(m.type==="checkbox"||m.type==="radio")&&(P=Zd);if(P&&(P=P(e,p))){Du(f,P,t,h);break e}k&&k(e,m,p),e==="focusout"&&(k=m._wrapperState)&&k.controlled&&m.type==="number"&&Bo(m,"number",m.value)}switch(k=p?nt(p):window,e){case"focusin":(fs(k)||k.contentEditable==="true")&&(qn=k,Jo=p,$t=null);break;case"focusout":$t=Jo=qn=null;break;case"mousedown":qo=!0;break;case"contextmenu":case"mouseup":case"dragend":qo=!1,vs(f,t,h);break;case"selectionchange":if(ef)break;case"keydown":case"keyup":vs(f,t,h)}var N;if(Wi)e:{switch(e){case"compositionstart":var z="onCompositionStart";break e;case"compositionend":z="onCompositionEnd";break e;case"compositionupdate":z="onCompositionUpdate";break e}z=void 0}else Jn?Ou(e,t)&&(z="onCompositionEnd"):e==="keydown"&&t.keyCode===229&&(z="onCompositionStart");z&&(Ru&&t.locale!=="ko"&&(Jn||z!=="onCompositionStart"?z==="onCompositionEnd"&&Jn&&(N=Tu()):(fn=h,Di="value"in fn?fn.value:fn.textContent,Jn=!0)),k=ul(p,z),0<k.length&&(z=new us(z,e,null,t,h),f.push({event:z,listeners:k}),N?z.data=N:(N=ju(t),N!==null&&(z.data=N)))),(N=Vd?Hd(e,t):$d(e,t))&&(p=ul(p,"onBeforeInput"),0<p.length&&(h=new us("onBeforeInput","beforeinput",null,t,h),f.push({event:h,listeners:p}),h.data=N))}Yu(f,n)})}function lr(e,n,t){return{instance:e,listener:n,currentTarget:t}}function ul(e,n){for(var t=n+"Capture",r=[];e!==null;){var l=e,o=l.stateNode;l.tag===5&&o!==null&&(l=o,o=bt(e,t),o!=null&&r.unshift(lr(e,o,l)),o=bt(e,n),o!=null&&r.push(lr(e,o,l))),e=e.return}return r}function Gn(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5);return e||null}function Ss(e,n,t,r,l){for(var o=n._reactName,i=[];t!==null&&t!==r;){var a=t,s=a.alternate,p=a.stateNode;if(s!==null&&s===r)break;a.tag===5&&p!==null&&(a=p,l?(s=bt(t,o),s!=null&&i.unshift(lr(t,s,a))):l||(s=bt(t,o),s!=null&&i.push(lr(t,s,a)))),t=t.return}i.length!==0&&e.push({event:n,listeners:i})}var tf=/\r\n?/g,rf=/\u0000|\uFFFD/g;function Ns(e){return(typeof e=="string"?e:""+e).replace(tf,`
`).replace(rf,"")}function Br(e,n,t){if(n=Ns(n),Ns(e)!==n&&t)throw Error(x(425))}function cl(){}var ei=null,ni=null;function ti(e,n){return e==="textarea"||e==="noscript"||typeof n.children=="string"||typeof n.children=="number"||typeof n.dangerouslySetInnerHTML=="object"&&n.dangerouslySetInnerHTML!==null&&n.dangerouslySetInnerHTML.__html!=null}var ri=typeof setTimeout=="function"?setTimeout:void 0,lf=typeof clearTimeout=="function"?clearTimeout:void 0,Cs=typeof Promise=="function"?Promise:void 0,of=typeof queueMicrotask=="function"?queueMicrotask:typeof Cs<"u"?function(e){return Cs.resolve(null).then(e).catch(af)}:ri;function af(e){setTimeout(function(){throw e})}function No(e,n){var t=n,r=0;do{var l=t.nextSibling;if(e.removeChild(t),l&&l.nodeType===8)if(t=l.data,t==="/$"){if(r===0){e.removeChild(l),er(n);return}r--}else t!=="$"&&t!=="$?"&&t!=="$!"||r++;t=l}while(t);er(n)}function yn(e){for(;e!=null;e=e.nextSibling){var n=e.nodeType;if(n===1||n===3)break;if(n===8){if(n=e.data,n==="$"||n==="$!"||n==="$?")break;if(n==="/$")return null}}return e}function _s(e){e=e.previousSibling;for(var n=0;e;){if(e.nodeType===8){var t=e.data;if(t==="$"||t==="$!"||t==="$?"){if(n===0)return e;n--}else t==="/$"&&n++}e=e.previousSibling}return null}var St=Math.random().toString(36).slice(2),$e="__reactFiber$"+St,or="__reactProps$"+St,en="__reactContainer$"+St,li="__reactEvents$"+St,sf="__reactListeners$"+St,uf="__reactHandles$"+St;function On(e){var n=e[$e];if(n)return n;for(var t=e.parentNode;t;){if(n=t[en]||t[$e]){if(t=n.alternate,n.child!==null||t!==null&&t.child!==null)for(e=_s(e);e!==null;){if(t=e[$e])return t;e=_s(e)}return n}e=t,t=e.parentNode}return null}function mr(e){return e=e[$e]||e[en],!e||e.tag!==5&&e.tag!==6&&e.tag!==13&&e.tag!==3?null:e}function nt(e){if(e.tag===5||e.tag===6)return e.stateNode;throw Error(x(33))}function Ll(e){return e[or]||null}var oi=[],tt=-1;function En(e){return{current:e}}function W(e){0>tt||(e.current=oi[tt],oi[tt]=null,tt--)}function F(e,n){tt++,oi[tt]=e.current,e.current=n}var Cn={},se=En(Cn),ge=En(!1),Wn=Cn;function gt(e,n){var t=e.type.contextTypes;if(!t)return Cn;var r=e.stateNode;if(r&&r.__reactInternalMemoizedUnmaskedChildContext===n)return r.__reactInternalMemoizedMaskedChildContext;var l={},o;for(o in t)l[o]=n[o];return r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=n,e.__reactInternalMemoizedMaskedChildContext=l),l}function he(e){return e=e.childContextTypes,e!=null}function pl(){W(ge),W(se)}function Es(e,n,t){if(se.current!==Cn)throw Error(x(168));F(se,n),F(ge,t)}function Gu(e,n,t){var r=e.stateNode;if(n=n.childContextTypes,typeof r.getChildContext!="function")return t;r=r.getChildContext();for(var l in r)if(!(l in n))throw Error(x(108,Xp(e)||"Unknown",l));return Q({},t,r)}function dl(e){return e=(e=e.stateNode)&&e.__reactInternalMemoizedMergedChildContext||Cn,Wn=se.current,F(se,e),F(ge,ge.current),!0}function zs(e,n,t){var r=e.stateNode;if(!r)throw Error(x(169));t?(e=Gu(e,n,Wn),r.__reactInternalMemoizedMergedChildContext=e,W(ge),W(se),F(se,e)):W(ge),F(ge,t)}var Ge=null,Ml=!1,Co=!1;function Zu(e){Ge===null?Ge=[e]:Ge.push(e)}function cf(e){Ml=!0,Zu(e)}function zn(){if(!Co&&Ge!==null){Co=!0;var e=0,n=O;try{var t=Ge;for(O=1;e<t.length;e++){var r=t[e];do r=r(!0);while(r!==null)}Ge=null,Ml=!1}catch(l){throw Ge!==null&&(Ge=Ge.slice(e+1)),ku(Ti,zn),l}finally{O=n,Co=!1}}return null}var rt=[],lt=0,fl=null,ml=0,Ee=[],ze=0,Bn=null,Ze=1,be="";function Tn(e,n){rt[lt++]=ml,rt[lt++]=fl,fl=e,ml=n}function bu(e,n,t){Ee[ze++]=Ze,Ee[ze++]=be,Ee[ze++]=Bn,Bn=e;var r=Ze;e=be;var l=32-Ue(r)-1;r&=~(1<<l),t+=1;var o=32-Ue(n)+l;if(30<o){var i=l-l%5;o=(r&(1<<i)-1).toString(32),r>>=i,l-=i,Ze=1<<32-Ue(n)+l|t<<l|r,be=o+e}else Ze=1<<o|t<<l|r,be=e}function Ai(e){e.return!==null&&(Tn(e,1),bu(e,1,0))}function Vi(e){for(;e===fl;)fl=rt[--lt],rt[lt]=null,ml=rt[--lt],rt[lt]=null;for(;e===Bn;)Bn=Ee[--ze],Ee[ze]=null,be=Ee[--ze],Ee[ze]=null,Ze=Ee[--ze],Ee[ze]=null}var we=null,xe=null,V=!1,Fe=null;function Ju(e,n){var t=Pe(5,null,null,0);t.elementType="DELETED",t.stateNode=n,t.return=e,n=e.deletions,n===null?(e.deletions=[t],e.flags|=16):n.push(t)}function Ps(e,n){switch(e.tag){case 5:var t=e.type;return n=n.nodeType!==1||t.toLowerCase()!==n.nodeName.toLowerCase()?null:n,n!==null?(e.stateNode=n,we=e,xe=yn(n.firstChild),!0):!1;case 6:return n=e.pendingProps===""||n.nodeType!==3?null:n,n!==null?(e.stateNode=n,we=e,xe=null,!0):!1;case 13:return n=n.nodeType!==8?null:n,n!==null?(t=Bn!==null?{id:Ze,overflow:be}:null,e.memoizedState={dehydrated:n,treeContext:t,retryLane:1073741824},t=Pe(18,null,null,0),t.stateNode=n,t.return=e,e.child=t,we=e,xe=null,!0):!1;default:return!1}}function ii(e){return(e.mode&1)!==0&&(e.flags&128)===0}function ai(e){if(V){var n=xe;if(n){var t=n;if(!Ps(e,n)){if(ii(e))throw Error(x(418));n=yn(t.nextSibling);var r=we;n&&Ps(e,n)?Ju(r,t):(e.flags=e.flags&-4097|2,V=!1,we=e)}}else{if(ii(e))throw Error(x(418));e.flags=e.flags&-4097|2,V=!1,we=e}}}function Is(e){for(e=e.return;e!==null&&e.tag!==5&&e.tag!==3&&e.tag!==13;)e=e.return;we=e}function Ar(e){if(e!==we)return!1;if(!V)return Is(e),V=!0,!1;var n;if((n=e.tag!==3)&&!(n=e.tag!==5)&&(n=e.type,n=n!=="head"&&n!=="body"&&!ti(e.type,e.memoizedProps)),n&&(n=xe)){if(ii(e))throw qu(),Error(x(418));for(;n;)Ju(e,n),n=yn(n.nextSibling)}if(Is(e),e.tag===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(x(317));e:{for(e=e.nextSibling,n=0;e;){if(e.nodeType===8){var t=e.data;if(t==="/$"){if(n===0){xe=yn(e.nextSibling);break e}n--}else t!=="$"&&t!=="$!"&&t!=="$?"||n++}e=e.nextSibling}xe=null}}else xe=we?yn(e.stateNode.nextSibling):null;return!0}function qu(){for(var e=xe;e;)e=yn(e.nextSibling)}function ht(){xe=we=null,V=!1}function Hi(e){Fe===null?Fe=[e]:Fe.push(e)}var pf=rn.ReactCurrentBatchConfig;function Tt(e,n,t){if(e=t.ref,e!==null&&typeof e!="function"&&typeof e!="object"){if(t._owner){if(t=t._owner,t){if(t.tag!==1)throw Error(x(309));var r=t.stateNode}if(!r)throw Error(x(147,e));var l=r,o=""+e;return n!==null&&n.ref!==null&&typeof n.ref=="function"&&n.ref._stringRef===o?n.ref:(n=function(i){var a=l.refs;i===null?delete a[o]:a[o]=i},n._stringRef=o,n)}if(typeof e!="string")throw Error(x(284));if(!t._owner)throw Error(x(290,e))}return e}function Vr(e,n){throw e=Object.prototype.toString.call(n),Error(x(31,e==="[object Object]"?"object with keys {"+Object.keys(n).join(", ")+"}":e))}function Ls(e){var n=e._init;return n(e._payload)}function ec(e){function n(u,c){if(e){var d=u.deletions;d===null?(u.deletions=[c],u.flags|=16):d.push(c)}}function t(u,c){if(!e)return null;for(;c!==null;)n(u,c),c=c.sibling;return null}function r(u,c){for(u=new Map;c!==null;)c.key!==null?u.set(c.key,c):u.set(c.index,c),c=c.sibling;return u}function l(u,c){return u=Sn(u,c),u.index=0,u.sibling=null,u}function o(u,c,d){return u.index=d,e?(d=u.alternate,d!==null?(d=d.index,d<c?(u.flags|=2,c):d):(u.flags|=2,c)):(u.flags|=1048576,c)}function i(u){return e&&u.alternate===null&&(u.flags|=2),u}function a(u,c,d,y){return c===null||c.tag!==6?(c=Mo(d,u.mode,y),c.return=u,c):(c=l(c,d),c.return=u,c)}function s(u,c,d,y){var P=d.type;return P===bn?h(u,c,d.props.children,y,d.key):c!==null&&(c.elementType===P||typeof P=="object"&&P!==null&&P.$$typeof===un&&Ls(P)===c.type)?(y=l(c,d.props),y.ref=Tt(u,c,d),y.return=u,y):(y=nl(d.type,d.key,d.props,null,u.mode,y),y.ref=Tt(u,c,d),y.return=u,y)}function p(u,c,d,y){return c===null||c.tag!==4||c.stateNode.containerInfo!==d.containerInfo||c.stateNode.implementation!==d.implementation?(c=To(d,u.mode,y),c.return=u,c):(c=l(c,d.children||[]),c.return=u,c)}function h(u,c,d,y,P){return c===null||c.tag!==7?(c=Un(d,u.mode,y,P),c.return=u,c):(c=l(c,d),c.return=u,c)}function f(u,c,d){if(typeof c=="string"&&c!==""||typeof c=="number")return c=Mo(""+c,u.mode,d),c.return=u,c;if(typeof c=="object"&&c!==null){switch(c.$$typeof){case zr:return d=nl(c.type,c.key,c.props,null,u.mode,d),d.ref=Tt(u,null,c),d.return=u,d;case Zn:return c=To(c,u.mode,d),c.return=u,c;case un:var y=c._init;return f(u,y(c._payload),d)}if(Ft(c)||Pt(c))return c=Un(c,u.mode,d,null),c.return=u,c;Vr(u,c)}return null}function m(u,c,d,y){var P=c!==null?c.key:null;if(typeof d=="string"&&d!==""||typeof d=="number")return P!==null?null:a(u,c,""+d,y);if(typeof d=="object"&&d!==null){switch(d.$$typeof){case zr:return d.key===P?s(u,c,d,y):null;case Zn:return d.key===P?p(u,c,d,y):null;case un:return P=d._init,m(u,c,P(d._payload),y)}if(Ft(d)||Pt(d))return P!==null?null:h(u,c,d,y,null);Vr(u,d)}return null}function w(u,c,d,y,P){if(typeof y=="string"&&y!==""||typeof y=="number")return u=u.get(d)||null,a(c,u,""+y,P);if(typeof y=="object"&&y!==null){switch(y.$$typeof){case zr:return u=u.get(y.key===null?d:y.key)||null,s(c,u,y,P);case Zn:return u=u.get(y.key===null?d:y.key)||null,p(c,u,y,P);case un:var k=y._init;return w(u,c,d,k(y._payload),P)}if(Ft(y)||Pt(y))return u=u.get(d)||null,h(c,u,y,P,null);Vr(c,y)}return null}function S(u,c,d,y){for(var P=null,k=null,N=c,z=c=0,A=null;N!==null&&z<d.length;z++){N.index>z?(A=N,N=null):A=N.sibling;var I=m(u,N,d[z],y);if(I===null){N===null&&(N=A);break}e&&N&&I.alternate===null&&n(u,N),c=o(I,c,z),k===null?P=I:k.sibling=I,k=I,N=A}if(z===d.length)return t(u,N),V&&Tn(u,z),P;if(N===null){for(;z<d.length;z++)N=f(u,d[z],y),N!==null&&(c=o(N,c,z),k===null?P=N:k.sibling=N,k=N);return V&&Tn(u,z),P}for(N=r(u,N);z<d.length;z++)A=w(N,u,z,d[z],y),A!==null&&(e&&A.alternate!==null&&N.delete(A.key===null?z:A.key),c=o(A,c,z),k===null?P=A:k.sibling=A,k=A);return e&&N.forEach(function(R){return n(u,R)}),V&&Tn(u,z),P}function _(u,c,d,y){var P=Pt(d);if(typeof P!="function")throw Error(x(150));if(d=P.call(d),d==null)throw Error(x(151));for(var k=P=null,N=c,z=c=0,A=null,I=d.next();N!==null&&!I.done;z++,I=d.next()){N.index>z?(A=N,N=null):A=N.sibling;var R=m(u,N,I.value,y);if(R===null){N===null&&(N=A);break}e&&N&&R.alternate===null&&n(u,N),c=o(R,c,z),k===null?P=R:k.sibling=R,k=R,N=A}if(I.done)return t(u,N),V&&Tn(u,z),P;if(N===null){for(;!I.done;z++,I=d.next())I=f(u,I.value,y),I!==null&&(c=o(I,c,z),k===null?P=I:k.sibling=I,k=I);return V&&Tn(u,z),P}for(N=r(u,N);!I.done;z++,I=d.next())I=w(N,u,z,I.value,y),I!==null&&(e&&I.alternate!==null&&N.delete(I.key===null?z:I.key),c=o(I,c,z),k===null?P=I:k.sibling=I,k=I);return e&&N.forEach(function(ln){return n(u,ln)}),V&&Tn(u,z),P}function j(u,c,d,y){if(typeof d=="object"&&d!==null&&d.type===bn&&d.key===null&&(d=d.props.children),typeof d=="object"&&d!==null){switch(d.$$typeof){case zr:e:{for(var P=d.key,k=c;k!==null;){if(k.key===P){if(P=d.type,P===bn){if(k.tag===7){t(u,k.sibling),c=l(k,d.props.children),c.return=u,u=c;break e}}else if(k.elementType===P||typeof P=="object"&&P!==null&&P.$$typeof===un&&Ls(P)===k.type){t(u,k.sibling),c=l(k,d.props),c.ref=Tt(u,k,d),c.return=u,u=c;break e}t(u,k);break}else n(u,k);k=k.sibling}d.type===bn?(c=Un(d.props.children,u.mode,y,d.key),c.return=u,u=c):(y=nl(d.type,d.key,d.props,null,u.mode,y),y.ref=Tt(u,c,d),y.return=u,u=y)}return i(u);case Zn:e:{for(k=d.key;c!==null;){if(c.key===k)if(c.tag===4&&c.stateNode.containerInfo===d.containerInfo&&c.stateNode.implementation===d.implementation){t(u,c.sibling),c=l(c,d.children||[]),c.return=u,u=c;break e}else{t(u,c);break}else n(u,c);c=c.sibling}c=To(d,u.mode,y),c.return=u,u=c}return i(u);case un:return k=d._init,j(u,c,k(d._payload),y)}if(Ft(d))return S(u,c,d,y);if(Pt(d))return _(u,c,d,y);Vr(u,d)}return typeof d=="string"&&d!==""||typeof d=="number"?(d=""+d,c!==null&&c.tag===6?(t(u,c.sibling),c=l(c,d),c.return=u,u=c):(t(u,c),c=Mo(d,u.mode,y),c.return=u,u=c),i(u)):t(u,c)}return j}var vt=ec(!0),nc=ec(!1),gl=En(null),hl=null,ot=null,$i=null;function Qi(){$i=ot=hl=null}function Ki(e){var n=gl.current;W(gl),e._currentValue=n}function si(e,n,t){for(;e!==null;){var r=e.alternate;if((e.childLanes&n)!==n?(e.childLanes|=n,r!==null&&(r.childLanes|=n)):r!==null&&(r.childLanes&n)!==n&&(r.childLanes|=n),e===t)break;e=e.return}}function dt(e,n){hl=e,$i=ot=null,e=e.dependencies,e!==null&&e.firstContext!==null&&((e.lanes&n)!==0&&(me=!0),e.firstContext=null)}function Le(e){var n=e._currentValue;if($i!==e)if(e={context:e,memoizedValue:n,next:null},ot===null){if(hl===null)throw Error(x(308));ot=e,hl.dependencies={lanes:0,firstContext:e}}else ot=ot.next=e;return n}var jn=null;function Yi(e){jn===null?jn=[e]:jn.push(e)}function tc(e,n,t,r){var l=n.interleaved;return l===null?(t.next=t,Yi(n)):(t.next=l.next,l.next=t),n.interleaved=t,nn(e,r)}function nn(e,n){e.lanes|=n;var t=e.alternate;for(t!==null&&(t.lanes|=n),t=e,e=e.return;e!==null;)e.childLanes|=n,t=e.alternate,t!==null&&(t.childLanes|=n),t=e,e=e.return;return t.tag===3?t.stateNode:null}var cn=!1;function Xi(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function rc(e,n){e=e.updateQueue,n.updateQueue===e&&(n.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,effects:e.effects})}function Je(e,n){return{eventTime:e,lane:n,tag:0,payload:null,callback:null,next:null}}function xn(e,n,t){var r=e.updateQueue;if(r===null)return null;if(r=r.shared,(T&2)!==0){var l=r.pending;return l===null?n.next=n:(n.next=l.next,l.next=n),r.pending=n,nn(e,t)}return l=r.interleaved,l===null?(n.next=n,Yi(r)):(n.next=l.next,l.next=n),r.interleaved=n,nn(e,t)}function Gr(e,n,t){if(n=n.updateQueue,n!==null&&(n=n.shared,(t&4194240)!==0)){var r=n.lanes;r&=e.pendingLanes,t|=r,n.lanes=t,Ri(e,t)}}function Ms(e,n){var t=e.updateQueue,r=e.alternate;if(r!==null&&(r=r.updateQueue,t===r)){var l=null,o=null;if(t=t.firstBaseUpdate,t!==null){do{var i={eventTime:t.eventTime,lane:t.lane,tag:t.tag,payload:t.payload,callback:t.callback,next:null};o===null?l=o=i:o=o.next=i,t=t.next}while(t!==null);o===null?l=o=n:o=o.next=n}else l=o=n;t={baseState:r.baseState,firstBaseUpdate:l,lastBaseUpdate:o,shared:r.shared,effects:r.effects},e.updateQueue=t;return}e=t.lastBaseUpdate,e===null?t.firstBaseUpdate=n:e.next=n,t.lastBaseUpdate=n}function vl(e,n,t,r){var l=e.updateQueue;cn=!1;var o=l.firstBaseUpdate,i=l.lastBaseUpdate,a=l.shared.pending;if(a!==null){l.shared.pending=null;var s=a,p=s.next;s.next=null,i===null?o=p:i.next=p,i=s;var h=e.alternate;h!==null&&(h=h.updateQueue,a=h.lastBaseUpdate,a!==i&&(a===null?h.firstBaseUpdate=p:a.next=p,h.lastBaseUpdate=s))}if(o!==null){var f=l.baseState;i=0,h=p=s=null,a=o;do{var m=a.lane,w=a.eventTime;if((r&m)===m){h!==null&&(h=h.next={eventTime:w,lane:0,tag:a.tag,payload:a.payload,callback:a.callback,next:null});e:{var S=e,_=a;switch(m=n,w=t,_.tag){case 1:if(S=_.payload,typeof S=="function"){f=S.call(w,f,m);break e}f=S;break e;case 3:S.flags=S.flags&-65537|128;case 0:if(S=_.payload,m=typeof S=="function"?S.call(w,f,m):S,m==null)break e;f=Q({},f,m);break e;case 2:cn=!0}}a.callback!==null&&a.lane!==0&&(e.flags|=64,m=l.effects,m===null?l.effects=[a]:m.push(a))}else w={eventTime:w,lane:m,tag:a.tag,payload:a.payload,callback:a.callback,next:null},h===null?(p=h=w,s=f):h=h.next=w,i|=m;if(a=a.next,a===null){if(a=l.shared.pending,a===null)break;m=a,a=m.next,m.next=null,l.lastBaseUpdate=m,l.shared.pending=null}}while(!0);if(h===null&&(s=f),l.baseState=s,l.firstBaseUpdate=p,l.lastBaseUpdate=h,n=l.shared.interleaved,n!==null){l=n;do i|=l.lane,l=l.next;while(l!==n)}else o===null&&(l.shared.lanes=0);Vn|=i,e.lanes=i,e.memoizedState=f}}function Ts(e,n,t){if(e=n.effects,n.effects=null,e!==null)for(n=0;n<e.length;n++){var r=e[n],l=r.callback;if(l!==null){if(r.callback=null,r=t,typeof l!="function")throw Error(x(191,l));l.call(r)}}}var gr={},Ke=En(gr),ir=En(gr),ar=En(gr);function Dn(e){if(e===gr)throw Error(x(174));return e}function Gi(e,n){switch(F(ar,n),F(ir,e),F(Ke,gr),e=n.nodeType,e){case 9:case 11:n=(n=n.documentElement)?n.namespaceURI:Vo(null,"");break;default:e=e===8?n.parentNode:n,n=e.namespaceURI||null,e=e.tagName,n=Vo(n,e)}W(Ke),F(Ke,n)}function yt(){W(Ke),W(ir),W(ar)}function lc(e){Dn(ar.current);var n=Dn(Ke.current),t=Vo(n,e.type);n!==t&&(F(ir,e),F(Ke,t))}function Zi(e){ir.current===e&&(W(Ke),W(ir))}var H=En(0);function yl(e){for(var n=e;n!==null;){if(n.tag===13){var t=n.memoizedState;if(t!==null&&(t=t.dehydrated,t===null||t.data==="$?"||t.data==="$!"))return n}else if(n.tag===19&&n.memoizedProps.revealOrder!==void 0){if((n.flags&128)!==0)return n}else if(n.child!==null){n.child.return=n,n=n.child;continue}if(n===e)break;for(;n.sibling===null;){if(n.return===null||n.return===e)return null;n=n.return}n.sibling.return=n.return,n=n.sibling}return null}var _o=[];function bi(){for(var e=0;e<_o.length;e++)_o[e]._workInProgressVersionPrimary=null;_o.length=0}var Zr=rn.ReactCurrentDispatcher,Eo=rn.ReactCurrentBatchConfig,An=0,$=null,G=null,q=null,xl=!1,Qt=!1,sr=0,df=0;function oe(){throw Error(x(321))}function Ji(e,n){if(n===null)return!1;for(var t=0;t<n.length&&t<e.length;t++)if(!Be(e[t],n[t]))return!1;return!0}function qi(e,n,t,r,l,o){if(An=o,$=n,n.memoizedState=null,n.updateQueue=null,n.lanes=0,Zr.current=e===null||e.memoizedState===null?hf:vf,e=t(r,l),Qt){o=0;do{if(Qt=!1,sr=0,25<=o)throw Error(x(301));o+=1,q=G=null,n.updateQueue=null,Zr.current=yf,e=t(r,l)}while(Qt)}if(Zr.current=wl,n=G!==null&&G.next!==null,An=0,q=G=$=null,xl=!1,n)throw Error(x(300));return e}function ea(){var e=sr!==0;return sr=0,e}function He(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return q===null?$.memoizedState=q=e:q=q.next=e,q}function Me(){if(G===null){var e=$.alternate;e=e!==null?e.memoizedState:null}else e=G.next;var n=q===null?$.memoizedState:q.next;if(n!==null)q=n,G=e;else{if(e===null)throw Error(x(310));G=e,e={memoizedState:G.memoizedState,baseState:G.baseState,baseQueue:G.baseQueue,queue:G.queue,next:null},q===null?$.memoizedState=q=e:q=q.next=e}return q}function ur(e,n){return typeof n=="function"?n(e):n}function zo(e){var n=Me(),t=n.queue;if(t===null)throw Error(x(311));t.lastRenderedReducer=e;var r=G,l=r.baseQueue,o=t.pending;if(o!==null){if(l!==null){var i=l.next;l.next=o.next,o.next=i}r.baseQueue=l=o,t.pending=null}if(l!==null){o=l.next,r=r.baseState;var a=i=null,s=null,p=o;do{var h=p.lane;if((An&h)===h)s!==null&&(s=s.next={lane:0,action:p.action,hasEagerState:p.hasEagerState,eagerState:p.eagerState,next:null}),r=p.hasEagerState?p.eagerState:e(r,p.action);else{var f={lane:h,action:p.action,hasEagerState:p.hasEagerState,eagerState:p.eagerState,next:null};s===null?(a=s=f,i=r):s=s.next=f,$.lanes|=h,Vn|=h}p=p.next}while(p!==null&&p!==o);s===null?i=r:s.next=a,Be(r,n.memoizedState)||(me=!0),n.memoizedState=r,n.baseState=i,n.baseQueue=s,t.lastRenderedState=r}if(e=t.interleaved,e!==null){l=e;do o=l.lane,$.lanes|=o,Vn|=o,l=l.next;while(l!==e)}else l===null&&(t.lanes=0);return[n.memoizedState,t.dispatch]}function Po(e){var n=Me(),t=n.queue;if(t===null)throw Error(x(311));t.lastRenderedReducer=e;var r=t.dispatch,l=t.pending,o=n.memoizedState;if(l!==null){t.pending=null;var i=l=l.next;do o=e(o,i.action),i=i.next;while(i!==l);Be(o,n.memoizedState)||(me=!0),n.memoizedState=o,n.baseQueue===null&&(n.baseState=o),t.lastRenderedState=o}return[o,r]}function oc(){}function ic(e,n){var t=$,r=Me(),l=n(),o=!Be(r.memoizedState,l);if(o&&(r.memoizedState=l,me=!0),r=r.queue,na(uc.bind(null,t,r,e),[e]),r.getSnapshot!==n||o||q!==null&&q.memoizedState.tag&1){if(t.flags|=2048,cr(9,sc.bind(null,t,r,l,n),void 0,null),ee===null)throw Error(x(349));(An&30)!==0||ac(t,n,l)}return l}function ac(e,n,t){e.flags|=16384,e={getSnapshot:n,value:t},n=$.updateQueue,n===null?(n={lastEffect:null,stores:null},$.updateQueue=n,n.stores=[e]):(t=n.stores,t===null?n.stores=[e]:t.push(e))}function sc(e,n,t,r){n.value=t,n.getSnapshot=r,cc(n)&&pc(e)}function uc(e,n,t){return t(function(){cc(n)&&pc(e)})}function cc(e){var n=e.getSnapshot;e=e.value;try{var t=n();return!Be(e,t)}catch{return!0}}function pc(e){var n=nn(e,1);n!==null&&We(n,e,1,-1)}function Rs(e){var n=He();return typeof e=="function"&&(e=e()),n.memoizedState=n.baseState=e,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:ur,lastRenderedState:e},n.queue=e,e=e.dispatch=gf.bind(null,$,e),[n.memoizedState,e]}function cr(e,n,t,r){return e={tag:e,create:n,destroy:t,deps:r,next:null},n=$.updateQueue,n===null?(n={lastEffect:null,stores:null},$.updateQueue=n,n.lastEffect=e.next=e):(t=n.lastEffect,t===null?n.lastEffect=e.next=e:(r=t.next,t.next=e,e.next=r,n.lastEffect=e)),e}function dc(){return Me().memoizedState}function br(e,n,t,r){var l=He();$.flags|=e,l.memoizedState=cr(1|n,t,void 0,r===void 0?null:r)}function Tl(e,n,t,r){var l=Me();r=r===void 0?null:r;var o=void 0;if(G!==null){var i=G.memoizedState;if(o=i.destroy,r!==null&&Ji(r,i.deps)){l.memoizedState=cr(n,t,o,r);return}}$.flags|=e,l.memoizedState=cr(1|n,t,o,r)}function Os(e,n){return br(8390656,8,e,n)}function na(e,n){return Tl(2048,8,e,n)}function fc(e,n){return Tl(4,2,e,n)}function mc(e,n){return Tl(4,4,e,n)}function gc(e,n){if(typeof n=="function")return e=e(),n(e),function(){n(null)};if(n!=null)return e=e(),n.current=e,function(){n.current=null}}function hc(e,n,t){return t=t!=null?t.concat([e]):null,Tl(4,4,gc.bind(null,n,e),t)}function ta(){}function vc(e,n){var t=Me();n=n===void 0?null:n;var r=t.memoizedState;return r!==null&&n!==null&&Ji(n,r[1])?r[0]:(t.memoizedState=[e,n],e)}function yc(e,n){var t=Me();n=n===void 0?null:n;var r=t.memoizedState;return r!==null&&n!==null&&Ji(n,r[1])?r[0]:(e=e(),t.memoizedState=[e,n],e)}function xc(e,n,t){return(An&21)===0?(e.baseState&&(e.baseState=!1,me=!0),e.memoizedState=t):(Be(t,n)||(t=Cu(),$.lanes|=t,Vn|=t,e.baseState=!0),n)}function ff(e,n){var t=O;O=t!==0&&4>t?t:4,e(!0);var r=Eo.transition;Eo.transition={};try{e(!1),n()}finally{O=t,Eo.transition=r}}function wc(){return Me().memoizedState}function mf(e,n,t){var r=kn(e);if(t={lane:r,action:t,hasEagerState:!1,eagerState:null,next:null},kc(e))Sc(n,t);else if(t=tc(e,n,t,r),t!==null){var l=pe();We(t,e,r,l),Nc(t,n,r)}}function gf(e,n,t){var r=kn(e),l={lane:r,action:t,hasEagerState:!1,eagerState:null,next:null};if(kc(e))Sc(n,l);else{var o=e.alternate;if(e.lanes===0&&(o===null||o.lanes===0)&&(o=n.lastRenderedReducer,o!==null))try{var i=n.lastRenderedState,a=o(i,t);if(l.hasEagerState=!0,l.eagerState=a,Be(a,i)){var s=n.interleaved;s===null?(l.next=l,Yi(n)):(l.next=s.next,s.next=l),n.interleaved=l;return}}catch{}t=tc(e,n,l,r),t!==null&&(l=pe(),We(t,e,r,l),Nc(t,n,r))}}function kc(e){var n=e.alternate;return e===$||n!==null&&n===$}function Sc(e,n){Qt=xl=!0;var t=e.pending;t===null?n.next=n:(n.next=t.next,t.next=n),e.pending=n}function Nc(e,n,t){if((t&4194240)!==0){var r=n.lanes;r&=e.pendingLanes,t|=r,n.lanes=t,Ri(e,t)}}var wl={readContext:Le,useCallback:oe,useContext:oe,useEffect:oe,useImperativeHandle:oe,useInsertionEffect:oe,useLayoutEffect:oe,useMemo:oe,useReducer:oe,useRef:oe,useState:oe,useDebugValue:oe,useDeferredValue:oe,useTransition:oe,useMutableSource:oe,useSyncExternalStore:oe,useId:oe,unstable_isNewReconciler:!1},hf={readContext:Le,useCallback:function(e,n){return He().memoizedState=[e,n===void 0?null:n],e},useContext:Le,useEffect:Os,useImperativeHandle:function(e,n,t){return t=t!=null?t.concat([e]):null,br(4194308,4,gc.bind(null,n,e),t)},useLayoutEffect:function(e,n){return br(4194308,4,e,n)},useInsertionEffect:function(e,n){return br(4,2,e,n)},useMemo:function(e,n){var t=He();return n=n===void 0?null:n,e=e(),t.memoizedState=[e,n],e},useReducer:function(e,n,t){var r=He();return n=t!==void 0?t(n):n,r.memoizedState=r.baseState=n,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:n},r.queue=e,e=e.dispatch=mf.bind(null,$,e),[r.memoizedState,e]},useRef:function(e){var n=He();return e={current:e},n.memoizedState=e},useState:Rs,useDebugValue:ta,useDeferredValue:function(e){return He().memoizedState=e},useTransition:function(){var e=Rs(!1),n=e[0];return e=ff.bind(null,e[1]),He().memoizedState=e,[n,e]},useMutableSource:function(){},useSyncExternalStore:function(e,n,t){var r=$,l=He();if(V){if(t===void 0)throw Error(x(407));t=t()}else{if(t=n(),ee===null)throw Error(x(349));(An&30)!==0||ac(r,n,t)}l.memoizedState=t;var o={value:t,getSnapshot:n};return l.queue=o,Os(uc.bind(null,r,o,e),[e]),r.flags|=2048,cr(9,sc.bind(null,r,o,t,n),void 0,null),t},useId:function(){var e=He(),n=ee.identifierPrefix;if(V){var t=be,r=Ze;t=(r&~(1<<32-Ue(r)-1)).toString(32)+t,n=":"+n+"R"+t,t=sr++,0<t&&(n+="H"+t.toString(32)),n+=":"}else t=df++,n=":"+n+"r"+t.toString(32)+":";return e.memoizedState=n},unstable_isNewReconciler:!1},vf={readContext:Le,useCallback:vc,useContext:Le,useEffect:na,useImperativeHandle:hc,useInsertionEffect:fc,useLayoutEffect:mc,useMemo:yc,useReducer:zo,useRef:dc,useState:function(){return zo(ur)},useDebugValue:ta,useDeferredValue:function(e){var n=Me();return xc(n,G.memoizedState,e)},useTransition:function(){var e=zo(ur)[0],n=Me().memoizedState;return[e,n]},useMutableSource:oc,useSyncExternalStore:ic,useId:wc,unstable_isNewReconciler:!1},yf={readContext:Le,useCallback:vc,useContext:Le,useEffect:na,useImperativeHandle:hc,useInsertionEffect:fc,useLayoutEffect:mc,useMemo:yc,useReducer:Po,useRef:dc,useState:function(){return Po(ur)},useDebugValue:ta,useDeferredValue:function(e){var n=Me();return G===null?n.memoizedState=e:xc(n,G.memoizedState,e)},useTransition:function(){var e=Po(ur)[0],n=Me().memoizedState;return[e,n]},useMutableSource:oc,useSyncExternalStore:ic,useId:wc,unstable_isNewReconciler:!1};function je(e,n){if(e&&e.defaultProps){n=Q({},n),e=e.defaultProps;for(var t in e)n[t]===void 0&&(n[t]=e[t]);return n}return n}function ui(e,n,t,r){n=e.memoizedState,t=t(r,n),t=t==null?n:Q({},n,t),e.memoizedState=t,e.lanes===0&&(e.updateQueue.baseState=t)}var Rl={isMounted:function(e){return(e=e._reactInternals)?Qn(e)===e:!1},enqueueSetState:function(e,n,t){e=e._reactInternals;var r=pe(),l=kn(e),o=Je(r,l);o.payload=n,t!=null&&(o.callback=t),n=xn(e,o,l),n!==null&&(We(n,e,l,r),Gr(n,e,l))},enqueueReplaceState:function(e,n,t){e=e._reactInternals;var r=pe(),l=kn(e),o=Je(r,l);o.tag=1,o.payload=n,t!=null&&(o.callback=t),n=xn(e,o,l),n!==null&&(We(n,e,l,r),Gr(n,e,l))},enqueueForceUpdate:function(e,n){e=e._reactInternals;var t=pe(),r=kn(e),l=Je(t,r);l.tag=2,n!=null&&(l.callback=n),n=xn(e,l,r),n!==null&&(We(n,e,r,t),Gr(n,e,r))}};function js(e,n,t,r,l,o,i){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(r,o,i):n.prototype&&n.prototype.isPureReactComponent?!tr(t,r)||!tr(l,o):!0}function Cc(e,n,t){var r=!1,l=Cn,o=n.contextType;return typeof o=="object"&&o!==null?o=Le(o):(l=he(n)?Wn:se.current,r=n.contextTypes,o=(r=r!=null)?gt(e,l):Cn),n=new n(t,o),e.memoizedState=n.state!==null&&n.state!==void 0?n.state:null,n.updater=Rl,e.stateNode=n,n._reactInternals=e,r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=l,e.__reactInternalMemoizedMaskedChildContext=o),n}function Ds(e,n,t,r){e=n.state,typeof n.componentWillReceiveProps=="function"&&n.componentWillReceiveProps(t,r),typeof n.UNSAFE_componentWillReceiveProps=="function"&&n.UNSAFE_componentWillReceiveProps(t,r),n.state!==e&&Rl.enqueueReplaceState(n,n.state,null)}function ci(e,n,t,r){var l=e.stateNode;l.props=t,l.state=e.memoizedState,l.refs={},Xi(e);var o=n.contextType;typeof o=="object"&&o!==null?l.context=Le(o):(o=he(n)?Wn:se.current,l.context=gt(e,o)),l.state=e.memoizedState,o=n.getDerivedStateFromProps,typeof o=="function"&&(ui(e,n,o,t),l.state=e.memoizedState),typeof n.getDerivedStateFromProps=="function"||typeof l.getSnapshotBeforeUpdate=="function"||typeof l.UNSAFE_componentWillMount!="function"&&typeof l.componentWillMount!="function"||(n=l.state,typeof l.componentWillMount=="function"&&l.componentWillMount(),typeof l.UNSAFE_componentWillMount=="function"&&l.UNSAFE_componentWillMount(),n!==l.state&&Rl.enqueueReplaceState(l,l.state,null),vl(e,t,l,r),l.state=e.memoizedState),typeof l.componentDidMount=="function"&&(e.flags|=4194308)}function xt(e,n){try{var t="",r=n;do t+=Yp(r),r=r.return;while(r);var l=t}catch(o){l=`
Error generating stack: `+o.message+`
`+o.stack}return{value:e,source:n,stack:l,digest:null}}function Io(e,n,t){return{value:e,source:null,stack:t??null,digest:n??null}}function pi(e,n){try{console.error(n.value)}catch(t){setTimeout(function(){throw t})}}var xf=typeof WeakMap=="function"?WeakMap:Map;function _c(e,n,t){t=Je(-1,t),t.tag=3,t.payload={element:null};var r=n.value;return t.callback=function(){Sl||(Sl=!0,ki=r),pi(e,n)},t}function Ec(e,n,t){t=Je(-1,t),t.tag=3;var r=e.type.getDerivedStateFromError;if(typeof r=="function"){var l=n.value;t.payload=function(){return r(l)},t.callback=function(){pi(e,n)}}var o=e.stateNode;return o!==null&&typeof o.componentDidCatch=="function"&&(t.callback=function(){pi(e,n),typeof r!="function"&&(wn===null?wn=new Set([this]):wn.add(this));var i=n.stack;this.componentDidCatch(n.value,{componentStack:i!==null?i:""})}),t}function Fs(e,n,t){var r=e.pingCache;if(r===null){r=e.pingCache=new xf;var l=new Set;r.set(n,l)}else l=r.get(n),l===void 0&&(l=new Set,r.set(n,l));l.has(t)||(l.add(t),e=Rf.bind(null,e,n,t),n.then(e,e))}function Us(e){do{var n;if((n=e.tag===13)&&(n=e.memoizedState,n=n!==null?n.dehydrated!==null:!0),n)return e;e=e.return}while(e!==null);return null}function Ws(e,n,t,r,l){return(e.mode&1)===0?(e===n?e.flags|=65536:(e.flags|=128,t.flags|=131072,t.flags&=-52805,t.tag===1&&(t.alternate===null?t.tag=17:(n=Je(-1,1),n.tag=2,xn(t,n,1))),t.lanes|=1),e):(e.flags|=65536,e.lanes=l,e)}var wf=rn.ReactCurrentOwner,me=!1;function ce(e,n,t,r){n.child=e===null?nc(n,null,t,r):vt(n,e.child,t,r)}function Bs(e,n,t,r,l){t=t.render;var o=n.ref;return dt(n,l),r=qi(e,n,t,r,o,l),t=ea(),e!==null&&!me?(n.updateQueue=e.updateQueue,n.flags&=-2053,e.lanes&=~l,tn(e,n,l)):(V&&t&&Ai(n),n.flags|=1,ce(e,n,r,l),n.child)}function As(e,n,t,r,l){if(e===null){var o=t.type;return typeof o=="function"&&!ca(o)&&o.defaultProps===void 0&&t.compare===null&&t.defaultProps===void 0?(n.tag=15,n.type=o,zc(e,n,o,r,l)):(e=nl(t.type,null,r,n,n.mode,l),e.ref=n.ref,e.return=n,n.child=e)}if(o=e.child,(e.lanes&l)===0){var i=o.memoizedProps;if(t=t.compare,t=t!==null?t:tr,t(i,r)&&e.ref===n.ref)return tn(e,n,l)}return n.flags|=1,e=Sn(o,r),e.ref=n.ref,e.return=n,n.child=e}function zc(e,n,t,r,l){if(e!==null){var o=e.memoizedProps;if(tr(o,r)&&e.ref===n.ref)if(me=!1,n.pendingProps=r=o,(e.lanes&l)!==0)(e.flags&131072)!==0&&(me=!0);else return n.lanes=e.lanes,tn(e,n,l)}return di(e,n,t,r,l)}function Pc(e,n,t){var r=n.pendingProps,l=r.children,o=e!==null?e.memoizedState:null;if(r.mode==="hidden")if((n.mode&1)===0)n.memoizedState={baseLanes:0,cachePool:null,transitions:null},F(at,ye),ye|=t;else{if((t&1073741824)===0)return e=o!==null?o.baseLanes|t:t,n.lanes=n.childLanes=1073741824,n.memoizedState={baseLanes:e,cachePool:null,transitions:null},n.updateQueue=null,F(at,ye),ye|=e,null;n.memoizedState={baseLanes:0,cachePool:null,transitions:null},r=o!==null?o.baseLanes:t,F(at,ye),ye|=r}else o!==null?(r=o.baseLanes|t,n.memoizedState=null):r=t,F(at,ye),ye|=r;return ce(e,n,l,t),n.child}function Ic(e,n){var t=n.ref;(e===null&&t!==null||e!==null&&e.ref!==t)&&(n.flags|=512,n.flags|=2097152)}function di(e,n,t,r,l){var o=he(t)?Wn:se.current;return o=gt(n,o),dt(n,l),t=qi(e,n,t,r,o,l),r=ea(),e!==null&&!me?(n.updateQueue=e.updateQueue,n.flags&=-2053,e.lanes&=~l,tn(e,n,l)):(V&&r&&Ai(n),n.flags|=1,ce(e,n,t,l),n.child)}function Vs(e,n,t,r,l){if(he(t)){var o=!0;dl(n)}else o=!1;if(dt(n,l),n.stateNode===null)Jr(e,n),Cc(n,t,r),ci(n,t,r,l),r=!0;else if(e===null){var i=n.stateNode,a=n.memoizedProps;i.props=a;var s=i.context,p=t.contextType;typeof p=="object"&&p!==null?p=Le(p):(p=he(t)?Wn:se.current,p=gt(n,p));var h=t.getDerivedStateFromProps,f=typeof h=="function"||typeof i.getSnapshotBeforeUpdate=="function";f||typeof i.UNSAFE_componentWillReceiveProps!="function"&&typeof i.componentWillReceiveProps!="function"||(a!==r||s!==p)&&Ds(n,i,r,p),cn=!1;var m=n.memoizedState;i.state=m,vl(n,r,i,l),s=n.memoizedState,a!==r||m!==s||ge.current||cn?(typeof h=="function"&&(ui(n,t,h,r),s=n.memoizedState),(a=cn||js(n,t,a,r,m,s,p))?(f||typeof i.UNSAFE_componentWillMount!="function"&&typeof i.componentWillMount!="function"||(typeof i.componentWillMount=="function"&&i.componentWillMount(),typeof i.UNSAFE_componentWillMount=="function"&&i.UNSAFE_componentWillMount()),typeof i.componentDidMount=="function"&&(n.flags|=4194308)):(typeof i.componentDidMount=="function"&&(n.flags|=4194308),n.memoizedProps=r,n.memoizedState=s),i.props=r,i.state=s,i.context=p,r=a):(typeof i.componentDidMount=="function"&&(n.flags|=4194308),r=!1)}else{i=n.stateNode,rc(e,n),a=n.memoizedProps,p=n.type===n.elementType?a:je(n.type,a),i.props=p,f=n.pendingProps,m=i.context,s=t.contextType,typeof s=="object"&&s!==null?s=Le(s):(s=he(t)?Wn:se.current,s=gt(n,s));var w=t.getDerivedStateFromProps;(h=typeof w=="function"||typeof i.getSnapshotBeforeUpdate=="function")||typeof i.UNSAFE_componentWillReceiveProps!="function"&&typeof i.componentWillReceiveProps!="function"||(a!==f||m!==s)&&Ds(n,i,r,s),cn=!1,m=n.memoizedState,i.state=m,vl(n,r,i,l);var S=n.memoizedState;a!==f||m!==S||ge.current||cn?(typeof w=="function"&&(ui(n,t,w,r),S=n.memoizedState),(p=cn||js(n,t,p,r,m,S,s)||!1)?(h||typeof i.UNSAFE_componentWillUpdate!="function"&&typeof i.componentWillUpdate!="function"||(typeof i.componentWillUpdate=="function"&&i.componentWillUpdate(r,S,s),typeof i.UNSAFE_componentWillUpdate=="function"&&i.UNSAFE_componentWillUpdate(r,S,s)),typeof i.componentDidUpdate=="function"&&(n.flags|=4),typeof i.getSnapshotBeforeUpdate=="function"&&(n.flags|=1024)):(typeof i.componentDidUpdate!="function"||a===e.memoizedProps&&m===e.memoizedState||(n.flags|=4),typeof i.getSnapshotBeforeUpdate!="function"||a===e.memoizedProps&&m===e.memoizedState||(n.flags|=1024),n.memoizedProps=r,n.memoizedState=S),i.props=r,i.state=S,i.context=s,r=p):(typeof i.componentDidUpdate!="function"||a===e.memoizedProps&&m===e.memoizedState||(n.flags|=4),typeof i.getSnapshotBeforeUpdate!="function"||a===e.memoizedProps&&m===e.memoizedState||(n.flags|=1024),r=!1)}return fi(e,n,t,r,o,l)}function fi(e,n,t,r,l,o){Ic(e,n);var i=(n.flags&128)!==0;if(!r&&!i)return l&&zs(n,t,!1),tn(e,n,o);r=n.stateNode,wf.current=n;var a=i&&typeof t.getDerivedStateFromError!="function"?null:r.render();return n.flags|=1,e!==null&&i?(n.child=vt(n,e.child,null,o),n.child=vt(n,null,a,o)):ce(e,n,a,o),n.memoizedState=r.state,l&&zs(n,t,!0),n.child}function Lc(e){var n=e.stateNode;n.pendingContext?Es(e,n.pendingContext,n.pendingContext!==n.context):n.context&&Es(e,n.context,!1),Gi(e,n.containerInfo)}function Hs(e,n,t,r,l){return ht(),Hi(l),n.flags|=256,ce(e,n,t,r),n.child}var mi={dehydrated:null,treeContext:null,retryLane:0};function gi(e){return{baseLanes:e,cachePool:null,transitions:null}}function Mc(e,n,t){var r=n.pendingProps,l=H.current,o=!1,i=(n.flags&128)!==0,a;if((a=i)||(a=e!==null&&e.memoizedState===null?!1:(l&2)!==0),a?(o=!0,n.flags&=-129):(e===null||e.memoizedState!==null)&&(l|=1),F(H,l&1),e===null)return ai(n),e=n.memoizedState,e!==null&&(e=e.dehydrated,e!==null)?((n.mode&1)===0?n.lanes=1:e.data==="$!"?n.lanes=8:n.lanes=1073741824,null):(i=r.children,e=r.fallback,o?(r=n.mode,o=n.child,i={mode:"hidden",children:i},(r&1)===0&&o!==null?(o.childLanes=0,o.pendingProps=i):o=Dl(i,r,0,null),e=Un(e,r,t,null),o.return=n,e.return=n,o.sibling=e,n.child=o,n.child.memoizedState=gi(t),n.memoizedState=mi,e):ra(n,i));if(l=e.memoizedState,l!==null&&(a=l.dehydrated,a!==null))return kf(e,n,i,r,a,l,t);if(o){o=r.fallback,i=n.mode,l=e.child,a=l.sibling;var s={mode:"hidden",children:r.children};return(i&1)===0&&n.child!==l?(r=n.child,r.childLanes=0,r.pendingProps=s,n.deletions=null):(r=Sn(l,s),r.subtreeFlags=l.subtreeFlags&14680064),a!==null?o=Sn(a,o):(o=Un(o,i,t,null),o.flags|=2),o.return=n,r.return=n,r.sibling=o,n.child=r,r=o,o=n.child,i=e.child.memoizedState,i=i===null?gi(t):{baseLanes:i.baseLanes|t,cachePool:null,transitions:i.transitions},o.memoizedState=i,o.childLanes=e.childLanes&~t,n.memoizedState=mi,r}return o=e.child,e=o.sibling,r=Sn(o,{mode:"visible",children:r.children}),(n.mode&1)===0&&(r.lanes=t),r.return=n,r.sibling=null,e!==null&&(t=n.deletions,t===null?(n.deletions=[e],n.flags|=16):t.push(e)),n.child=r,n.memoizedState=null,r}function ra(e,n){return n=Dl({mode:"visible",children:n},e.mode,0,null),n.return=e,e.child=n}function Hr(e,n,t,r){return r!==null&&Hi(r),vt(n,e.child,null,t),e=ra(n,n.pendingProps.children),e.flags|=2,n.memoizedState=null,e}function kf(e,n,t,r,l,o,i){if(t)return n.flags&256?(n.flags&=-257,r=Io(Error(x(422))),Hr(e,n,i,r)):n.memoizedState!==null?(n.child=e.child,n.flags|=128,null):(o=r.fallback,l=n.mode,r=Dl({mode:"visible",children:r.children},l,0,null),o=Un(o,l,i,null),o.flags|=2,r.return=n,o.return=n,r.sibling=o,n.child=r,(n.mode&1)!==0&&vt(n,e.child,null,i),n.child.memoizedState=gi(i),n.memoizedState=mi,o);if((n.mode&1)===0)return Hr(e,n,i,null);if(l.data==="$!"){if(r=l.nextSibling&&l.nextSibling.dataset,r)var a=r.dgst;return r=a,o=Error(x(419)),r=Io(o,r,void 0),Hr(e,n,i,r)}if(a=(i&e.childLanes)!==0,me||a){if(r=ee,r!==null){switch(i&-i){case 4:l=2;break;case 16:l=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:l=32;break;case 536870912:l=268435456;break;default:l=0}l=(l&(r.suspendedLanes|i))!==0?0:l,l!==0&&l!==o.retryLane&&(o.retryLane=l,nn(e,l),We(r,e,l,-1))}return ua(),r=Io(Error(x(421))),Hr(e,n,i,r)}return l.data==="$?"?(n.flags|=128,n.child=e.child,n=Of.bind(null,e),l._reactRetry=n,null):(e=o.treeContext,xe=yn(l.nextSibling),we=n,V=!0,Fe=null,e!==null&&(Ee[ze++]=Ze,Ee[ze++]=be,Ee[ze++]=Bn,Ze=e.id,be=e.overflow,Bn=n),n=ra(n,r.children),n.flags|=4096,n)}function $s(e,n,t){e.lanes|=n;var r=e.alternate;r!==null&&(r.lanes|=n),si(e.return,n,t)}function Lo(e,n,t,r,l){var o=e.memoizedState;o===null?e.memoizedState={isBackwards:n,rendering:null,renderingStartTime:0,last:r,tail:t,tailMode:l}:(o.isBackwards=n,o.rendering=null,o.renderingStartTime=0,o.last=r,o.tail=t,o.tailMode=l)}function Tc(e,n,t){var r=n.pendingProps,l=r.revealOrder,o=r.tail;if(ce(e,n,r.children,t),r=H.current,(r&2)!==0)r=r&1|2,n.flags|=128;else{if(e!==null&&(e.flags&128)!==0)e:for(e=n.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&$s(e,t,n);else if(e.tag===19)$s(e,t,n);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===n)break e;for(;e.sibling===null;){if(e.return===null||e.return===n)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}r&=1}if(F(H,r),(n.mode&1)===0)n.memoizedState=null;else switch(l){case"forwards":for(t=n.child,l=null;t!==null;)e=t.alternate,e!==null&&yl(e)===null&&(l=t),t=t.sibling;t=l,t===null?(l=n.child,n.child=null):(l=t.sibling,t.sibling=null),Lo(n,!1,l,t,o);break;case"backwards":for(t=null,l=n.child,n.child=null;l!==null;){if(e=l.alternate,e!==null&&yl(e)===null){n.child=l;break}e=l.sibling,l.sibling=t,t=l,l=e}Lo(n,!0,t,null,o);break;case"together":Lo(n,!1,null,null,void 0);break;default:n.memoizedState=null}return n.child}function Jr(e,n){(n.mode&1)===0&&e!==null&&(e.alternate=null,n.alternate=null,n.flags|=2)}function tn(e,n,t){if(e!==null&&(n.dependencies=e.dependencies),Vn|=n.lanes,(t&n.childLanes)===0)return null;if(e!==null&&n.child!==e.child)throw Error(x(153));if(n.child!==null){for(e=n.child,t=Sn(e,e.pendingProps),n.child=t,t.return=n;e.sibling!==null;)e=e.sibling,t=t.sibling=Sn(e,e.pendingProps),t.return=n;t.sibling=null}return n.child}function Sf(e,n,t){switch(n.tag){case 3:Lc(n),ht();break;case 5:lc(n);break;case 1:he(n.type)&&dl(n);break;case 4:Gi(n,n.stateNode.containerInfo);break;case 10:var r=n.type._context,l=n.memoizedProps.value;F(gl,r._currentValue),r._currentValue=l;break;case 13:if(r=n.memoizedState,r!==null)return r.dehydrated!==null?(F(H,H.current&1),n.flags|=128,null):(t&n.child.childLanes)!==0?Mc(e,n,t):(F(H,H.current&1),e=tn(e,n,t),e!==null?e.sibling:null);F(H,H.current&1);break;case 19:if(r=(t&n.childLanes)!==0,(e.flags&128)!==0){if(r)return Tc(e,n,t);n.flags|=128}if(l=n.memoizedState,l!==null&&(l.rendering=null,l.tail=null,l.lastEffect=null),F(H,H.current),r)break;return null;case 22:case 23:return n.lanes=0,Pc(e,n,t)}return tn(e,n,t)}var Rc,hi,Oc,jc;Rc=function(e,n){for(var t=n.child;t!==null;){if(t.tag===5||t.tag===6)e.appendChild(t.stateNode);else if(t.tag!==4&&t.child!==null){t.child.return=t,t=t.child;continue}if(t===n)break;for(;t.sibling===null;){if(t.return===null||t.return===n)return;t=t.return}t.sibling.return=t.return,t=t.sibling}};hi=function(){};Oc=function(e,n,t,r){var l=e.memoizedProps;if(l!==r){e=n.stateNode,Dn(Ke.current);var o=null;switch(t){case"input":l=Uo(e,l),r=Uo(e,r),o=[];break;case"select":l=Q({},l,{value:void 0}),r=Q({},r,{value:void 0}),o=[];break;case"textarea":l=Ao(e,l),r=Ao(e,r),o=[];break;default:typeof l.onClick!="function"&&typeof r.onClick=="function"&&(e.onclick=cl)}Ho(t,r);var i;t=null;for(p in l)if(!r.hasOwnProperty(p)&&l.hasOwnProperty(p)&&l[p]!=null)if(p==="style"){var a=l[p];for(i in a)a.hasOwnProperty(i)&&(t||(t={}),t[i]="")}else p!=="dangerouslySetInnerHTML"&&p!=="children"&&p!=="suppressContentEditableWarning"&&p!=="suppressHydrationWarning"&&p!=="autoFocus"&&(Gt.hasOwnProperty(p)?o||(o=[]):(o=o||[]).push(p,null));for(p in r){var s=r[p];if(a=l?.[p],r.hasOwnProperty(p)&&s!==a&&(s!=null||a!=null))if(p==="style")if(a){for(i in a)!a.hasOwnProperty(i)||s&&s.hasOwnProperty(i)||(t||(t={}),t[i]="");for(i in s)s.hasOwnProperty(i)&&a[i]!==s[i]&&(t||(t={}),t[i]=s[i])}else t||(o||(o=[]),o.push(p,t)),t=s;else p==="dangerouslySetInnerHTML"?(s=s?s.__html:void 0,a=a?a.__html:void 0,s!=null&&a!==s&&(o=o||[]).push(p,s)):p==="children"?typeof s!="string"&&typeof s!="number"||(o=o||[]).push(p,""+s):p!=="suppressContentEditableWarning"&&p!=="suppressHydrationWarning"&&(Gt.hasOwnProperty(p)?(s!=null&&p==="onScroll"&&U("scroll",e),o||a===s||(o=[])):(o=o||[]).push(p,s))}t&&(o=o||[]).push("style",t);var p=o;(n.updateQueue=p)&&(n.flags|=4)}};jc=function(e,n,t,r){t!==r&&(n.flags|=4)};function Rt(e,n){if(!V)switch(e.tailMode){case"hidden":n=e.tail;for(var t=null;n!==null;)n.alternate!==null&&(t=n),n=n.sibling;t===null?e.tail=null:t.sibling=null;break;case"collapsed":t=e.tail;for(var r=null;t!==null;)t.alternate!==null&&(r=t),t=t.sibling;r===null?n||e.tail===null?e.tail=null:e.tail.sibling=null:r.sibling=null}}function ie(e){var n=e.alternate!==null&&e.alternate.child===e.child,t=0,r=0;if(n)for(var l=e.child;l!==null;)t|=l.lanes|l.childLanes,r|=l.subtreeFlags&14680064,r|=l.flags&14680064,l.return=e,l=l.sibling;else for(l=e.child;l!==null;)t|=l.lanes|l.childLanes,r|=l.subtreeFlags,r|=l.flags,l.return=e,l=l.sibling;return e.subtreeFlags|=r,e.childLanes=t,n}function Nf(e,n,t){var r=n.pendingProps;switch(Vi(n),n.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return ie(n),null;case 1:return he(n.type)&&pl(),ie(n),null;case 3:return r=n.stateNode,yt(),W(ge),W(se),bi(),r.pendingContext&&(r.context=r.pendingContext,r.pendingContext=null),(e===null||e.child===null)&&(Ar(n)?n.flags|=4:e===null||e.memoizedState.isDehydrated&&(n.flags&256)===0||(n.flags|=1024,Fe!==null&&(Ci(Fe),Fe=null))),hi(e,n),ie(n),null;case 5:Zi(n);var l=Dn(ar.current);if(t=n.type,e!==null&&n.stateNode!=null)Oc(e,n,t,r,l),e.ref!==n.ref&&(n.flags|=512,n.flags|=2097152);else{if(!r){if(n.stateNode===null)throw Error(x(166));return ie(n),null}if(e=Dn(Ke.current),Ar(n)){r=n.stateNode,t=n.type;var o=n.memoizedProps;switch(r[$e]=n,r[or]=o,e=(n.mode&1)!==0,t){case"dialog":U("cancel",r),U("close",r);break;case"iframe":case"object":case"embed":U("load",r);break;case"video":case"audio":for(l=0;l<Wt.length;l++)U(Wt[l],r);break;case"source":U("error",r);break;case"img":case"image":case"link":U("error",r),U("load",r);break;case"details":U("toggle",r);break;case"input":Ja(r,o),U("invalid",r);break;case"select":r._wrapperState={wasMultiple:!!o.multiple},U("invalid",r);break;case"textarea":es(r,o),U("invalid",r)}Ho(t,o),l=null;for(var i in o)if(o.hasOwnProperty(i)){var a=o[i];i==="children"?typeof a=="string"?r.textContent!==a&&(o.suppressHydrationWarning!==!0&&Br(r.textContent,a,e),l=["children",a]):typeof a=="number"&&r.textContent!==""+a&&(o.suppressHydrationWarning!==!0&&Br(r.textContent,a,e),l=["children",""+a]):Gt.hasOwnProperty(i)&&a!=null&&i==="onScroll"&&U("scroll",r)}switch(t){case"input":Pr(r),qa(r,o,!0);break;case"textarea":Pr(r),ns(r);break;case"select":case"option":break;default:typeof o.onClick=="function"&&(r.onclick=cl)}r=l,n.updateQueue=r,r!==null&&(n.flags|=4)}else{i=l.nodeType===9?l:l.ownerDocument,e==="http://www.w3.org/1999/xhtml"&&(e=uu(t)),e==="http://www.w3.org/1999/xhtml"?t==="script"?(e=i.createElement("div"),e.innerHTML="<script><\/script>",e=e.removeChild(e.firstChild)):typeof r.is=="string"?e=i.createElement(t,{is:r.is}):(e=i.createElement(t),t==="select"&&(i=e,r.multiple?i.multiple=!0:r.size&&(i.size=r.size))):e=i.createElementNS(e,t),e[$e]=n,e[or]=r,Rc(e,n,!1,!1),n.stateNode=e;e:{switch(i=$o(t,r),t){case"dialog":U("cancel",e),U("close",e),l=r;break;case"iframe":case"object":case"embed":U("load",e),l=r;break;case"video":case"audio":for(l=0;l<Wt.length;l++)U(Wt[l],e);l=r;break;case"source":U("error",e),l=r;break;case"img":case"image":case"link":U("error",e),U("load",e),l=r;break;case"details":U("toggle",e),l=r;break;case"input":Ja(e,r),l=Uo(e,r),U("invalid",e);break;case"option":l=r;break;case"select":e._wrapperState={wasMultiple:!!r.multiple},l=Q({},r,{value:void 0}),U("invalid",e);break;case"textarea":es(e,r),l=Ao(e,r),U("invalid",e);break;default:l=r}Ho(t,l),a=l;for(o in a)if(a.hasOwnProperty(o)){var s=a[o];o==="style"?du(e,s):o==="dangerouslySetInnerHTML"?(s=s?s.__html:void 0,s!=null&&cu(e,s)):o==="children"?typeof s=="string"?(t!=="textarea"||s!=="")&&Zt(e,s):typeof s=="number"&&Zt(e,""+s):o!=="suppressContentEditableWarning"&&o!=="suppressHydrationWarning"&&o!=="autoFocus"&&(Gt.hasOwnProperty(o)?s!=null&&o==="onScroll"&&U("scroll",e):s!=null&&zi(e,o,s,i))}switch(t){case"input":Pr(e),qa(e,r,!1);break;case"textarea":Pr(e),ns(e);break;case"option":r.value!=null&&e.setAttribute("value",""+Nn(r.value));break;case"select":e.multiple=!!r.multiple,o=r.value,o!=null?st(e,!!r.multiple,o,!1):r.defaultValue!=null&&st(e,!!r.multiple,r.defaultValue,!0);break;default:typeof l.onClick=="function"&&(e.onclick=cl)}switch(t){case"button":case"input":case"select":case"textarea":r=!!r.autoFocus;break e;case"img":r=!0;break e;default:r=!1}}r&&(n.flags|=4)}n.ref!==null&&(n.flags|=512,n.flags|=2097152)}return ie(n),null;case 6:if(e&&n.stateNode!=null)jc(e,n,e.memoizedProps,r);else{if(typeof r!="string"&&n.stateNode===null)throw Error(x(166));if(t=Dn(ar.current),Dn(Ke.current),Ar(n)){if(r=n.stateNode,t=n.memoizedProps,r[$e]=n,(o=r.nodeValue!==t)&&(e=we,e!==null))switch(e.tag){case 3:Br(r.nodeValue,t,(e.mode&1)!==0);break;case 5:e.memoizedProps.suppressHydrationWarning!==!0&&Br(r.nodeValue,t,(e.mode&1)!==0)}o&&(n.flags|=4)}else r=(t.nodeType===9?t:t.ownerDocument).createTextNode(r),r[$e]=n,n.stateNode=r}return ie(n),null;case 13:if(W(H),r=n.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(V&&xe!==null&&(n.mode&1)!==0&&(n.flags&128)===0)qu(),ht(),n.flags|=98560,o=!1;else if(o=Ar(n),r!==null&&r.dehydrated!==null){if(e===null){if(!o)throw Error(x(318));if(o=n.memoizedState,o=o!==null?o.dehydrated:null,!o)throw Error(x(317));o[$e]=n}else ht(),(n.flags&128)===0&&(n.memoizedState=null),n.flags|=4;ie(n),o=!1}else Fe!==null&&(Ci(Fe),Fe=null),o=!0;if(!o)return n.flags&65536?n:null}return(n.flags&128)!==0?(n.lanes=t,n):(r=r!==null,r!==(e!==null&&e.memoizedState!==null)&&r&&(n.child.flags|=8192,(n.mode&1)!==0&&(e===null||(H.current&1)!==0?Z===0&&(Z=3):ua())),n.updateQueue!==null&&(n.flags|=4),ie(n),null);case 4:return yt(),hi(e,n),e===null&&rr(n.stateNode.containerInfo),ie(n),null;case 10:return Ki(n.type._context),ie(n),null;case 17:return he(n.type)&&pl(),ie(n),null;case 19:if(W(H),o=n.memoizedState,o===null)return ie(n),null;if(r=(n.flags&128)!==0,i=o.rendering,i===null)if(r)Rt(o,!1);else{if(Z!==0||e!==null&&(e.flags&128)!==0)for(e=n.child;e!==null;){if(i=yl(e),i!==null){for(n.flags|=128,Rt(o,!1),r=i.updateQueue,r!==null&&(n.updateQueue=r,n.flags|=4),n.subtreeFlags=0,r=t,t=n.child;t!==null;)o=t,e=r,o.flags&=14680066,i=o.alternate,i===null?(o.childLanes=0,o.lanes=e,o.child=null,o.subtreeFlags=0,o.memoizedProps=null,o.memoizedState=null,o.updateQueue=null,o.dependencies=null,o.stateNode=null):(o.childLanes=i.childLanes,o.lanes=i.lanes,o.child=i.child,o.subtreeFlags=0,o.deletions=null,o.memoizedProps=i.memoizedProps,o.memoizedState=i.memoizedState,o.updateQueue=i.updateQueue,o.type=i.type,e=i.dependencies,o.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),t=t.sibling;return F(H,H.current&1|2),n.child}e=e.sibling}o.tail!==null&&Y()>wt&&(n.flags|=128,r=!0,Rt(o,!1),n.lanes=4194304)}else{if(!r)if(e=yl(i),e!==null){if(n.flags|=128,r=!0,t=e.updateQueue,t!==null&&(n.updateQueue=t,n.flags|=4),Rt(o,!0),o.tail===null&&o.tailMode==="hidden"&&!i.alternate&&!V)return ie(n),null}else 2*Y()-o.renderingStartTime>wt&&t!==1073741824&&(n.flags|=128,r=!0,Rt(o,!1),n.lanes=4194304);o.isBackwards?(i.sibling=n.child,n.child=i):(t=o.last,t!==null?t.sibling=i:n.child=i,o.last=i)}return o.tail!==null?(n=o.tail,o.rendering=n,o.tail=n.sibling,o.renderingStartTime=Y(),n.sibling=null,t=H.current,F(H,r?t&1|2:t&1),n):(ie(n),null);case 22:case 23:return sa(),r=n.memoizedState!==null,e!==null&&e.memoizedState!==null!==r&&(n.flags|=8192),r&&(n.mode&1)!==0?(ye&1073741824)!==0&&(ie(n),n.subtreeFlags&6&&(n.flags|=8192)):ie(n),null;case 24:return null;case 25:return null}throw Error(x(156,n.tag))}function Cf(e,n){switch(Vi(n),n.tag){case 1:return he(n.type)&&pl(),e=n.flags,e&65536?(n.flags=e&-65537|128,n):null;case 3:return yt(),W(ge),W(se),bi(),e=n.flags,(e&65536)!==0&&(e&128)===0?(n.flags=e&-65537|128,n):null;case 5:return Zi(n),null;case 13:if(W(H),e=n.memoizedState,e!==null&&e.dehydrated!==null){if(n.alternate===null)throw Error(x(340));ht()}return e=n.flags,e&65536?(n.flags=e&-65537|128,n):null;case 19:return W(H),null;case 4:return yt(),null;case 10:return Ki(n.type._context),null;case 22:case 23:return sa(),null;case 24:return null;default:return null}}var $r=!1,ae=!1,_f=typeof WeakSet=="function"?WeakSet:Set,E=null;function it(e,n){var t=e.ref;if(t!==null)if(typeof t=="function")try{t(null)}catch(r){K(e,n,r)}else t.current=null}function vi(e,n,t){try{t()}catch(r){K(e,n,r)}}var Qs=!1;function Ef(e,n){if(ei=al,e=Bu(),Bi(e)){if("selectionStart"in e)var t={start:e.selectionStart,end:e.selectionEnd};else e:{t=(t=e.ownerDocument)&&t.defaultView||window;var r=t.getSelection&&t.getSelection();if(r&&r.rangeCount!==0){t=r.anchorNode;var l=r.anchorOffset,o=r.focusNode;r=r.focusOffset;try{t.nodeType,o.nodeType}catch{t=null;break e}var i=0,a=-1,s=-1,p=0,h=0,f=e,m=null;n:for(;;){for(var w;f!==t||l!==0&&f.nodeType!==3||(a=i+l),f!==o||r!==0&&f.nodeType!==3||(s=i+r),f.nodeType===3&&(i+=f.nodeValue.length),(w=f.firstChild)!==null;)m=f,f=w;for(;;){if(f===e)break n;if(m===t&&++p===l&&(a=i),m===o&&++h===r&&(s=i),(w=f.nextSibling)!==null)break;f=m,m=f.parentNode}f=w}t=a===-1||s===-1?null:{start:a,end:s}}else t=null}t=t||{start:0,end:0}}else t=null;for(ni={focusedElem:e,selectionRange:t},al=!1,E=n;E!==null;)if(n=E,e=n.child,(n.subtreeFlags&1028)!==0&&e!==null)e.return=n,E=e;else for(;E!==null;){n=E;try{var S=n.alternate;if((n.flags&1024)!==0)switch(n.tag){case 0:case 11:case 15:break;case 1:if(S!==null){var _=S.memoizedProps,j=S.memoizedState,u=n.stateNode,c=u.getSnapshotBeforeUpdate(n.elementType===n.type?_:je(n.type,_),j);u.__reactInternalSnapshotBeforeUpdate=c}break;case 3:var d=n.stateNode.containerInfo;d.nodeType===1?d.textContent="":d.nodeType===9&&d.documentElement&&d.removeChild(d.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(x(163))}}catch(y){K(n,n.return,y)}if(e=n.sibling,e!==null){e.return=n.return,E=e;break}E=n.return}return S=Qs,Qs=!1,S}function Kt(e,n,t){var r=n.updateQueue;if(r=r!==null?r.lastEffect:null,r!==null){var l=r=r.next;do{if((l.tag&e)===e){var o=l.destroy;l.destroy=void 0,o!==void 0&&vi(n,t,o)}l=l.next}while(l!==r)}}function Ol(e,n){if(n=n.updateQueue,n=n!==null?n.lastEffect:null,n!==null){var t=n=n.next;do{if((t.tag&e)===e){var r=t.create;t.destroy=r()}t=t.next}while(t!==n)}}function yi(e){var n=e.ref;if(n!==null){var t=e.stateNode;e.tag,e=t,typeof n=="function"?n(e):n.current=e}}function Dc(e){var n=e.alternate;n!==null&&(e.alternate=null,Dc(n)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(n=e.stateNode,n!==null&&(delete n[$e],delete n[or],delete n[li],delete n[sf],delete n[uf])),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}function Fc(e){return e.tag===5||e.tag===3||e.tag===4}function Ks(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||Fc(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function xi(e,n,t){var r=e.tag;if(r===5||r===6)e=e.stateNode,n?t.nodeType===8?t.parentNode.insertBefore(e,n):t.insertBefore(e,n):(t.nodeType===8?(n=t.parentNode,n.insertBefore(e,t)):(n=t,n.appendChild(e)),t=t._reactRootContainer,t!=null||n.onclick!==null||(n.onclick=cl));else if(r!==4&&(e=e.child,e!==null))for(xi(e,n,t),e=e.sibling;e!==null;)xi(e,n,t),e=e.sibling}function wi(e,n,t){var r=e.tag;if(r===5||r===6)e=e.stateNode,n?t.insertBefore(e,n):t.appendChild(e);else if(r!==4&&(e=e.child,e!==null))for(wi(e,n,t),e=e.sibling;e!==null;)wi(e,n,t),e=e.sibling}var ne=null,De=!1;function sn(e,n,t){for(t=t.child;t!==null;)Uc(e,n,t),t=t.sibling}function Uc(e,n,t){if(Qe&&typeof Qe.onCommitFiberUnmount=="function")try{Qe.onCommitFiberUnmount(El,t)}catch{}switch(t.tag){case 5:ae||it(t,n);case 6:var r=ne,l=De;ne=null,sn(e,n,t),ne=r,De=l,ne!==null&&(De?(e=ne,t=t.stateNode,e.nodeType===8?e.parentNode.removeChild(t):e.removeChild(t)):ne.removeChild(t.stateNode));break;case 18:ne!==null&&(De?(e=ne,t=t.stateNode,e.nodeType===8?No(e.parentNode,t):e.nodeType===1&&No(e,t),er(e)):No(ne,t.stateNode));break;case 4:r=ne,l=De,ne=t.stateNode.containerInfo,De=!0,sn(e,n,t),ne=r,De=l;break;case 0:case 11:case 14:case 15:if(!ae&&(r=t.updateQueue,r!==null&&(r=r.lastEffect,r!==null))){l=r=r.next;do{var o=l,i=o.destroy;o=o.tag,i!==void 0&&((o&2)!==0||(o&4)!==0)&&vi(t,n,i),l=l.next}while(l!==r)}sn(e,n,t);break;case 1:if(!ae&&(it(t,n),r=t.stateNode,typeof r.componentWillUnmount=="function"))try{r.props=t.memoizedProps,r.state=t.memoizedState,r.componentWillUnmount()}catch(a){K(t,n,a)}sn(e,n,t);break;case 21:sn(e,n,t);break;case 22:t.mode&1?(ae=(r=ae)||t.memoizedState!==null,sn(e,n,t),ae=r):sn(e,n,t);break;default:sn(e,n,t)}}function Ys(e){var n=e.updateQueue;if(n!==null){e.updateQueue=null;var t=e.stateNode;t===null&&(t=e.stateNode=new _f),n.forEach(function(r){var l=jf.bind(null,e,r);t.has(r)||(t.add(r),r.then(l,l))})}}function Oe(e,n){var t=n.deletions;if(t!==null)for(var r=0;r<t.length;r++){var l=t[r];try{var o=e,i=n,a=i;e:for(;a!==null;){switch(a.tag){case 5:ne=a.stateNode,De=!1;break e;case 3:ne=a.stateNode.containerInfo,De=!0;break e;case 4:ne=a.stateNode.containerInfo,De=!0;break e}a=a.return}if(ne===null)throw Error(x(160));Uc(o,i,l),ne=null,De=!1;var s=l.alternate;s!==null&&(s.return=null),l.return=null}catch(p){K(l,n,p)}}if(n.subtreeFlags&12854)for(n=n.child;n!==null;)Wc(n,e),n=n.sibling}function Wc(e,n){var t=e.alternate,r=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if(Oe(n,e),Ve(e),r&4){try{Kt(3,e,e.return),Ol(3,e)}catch(_){K(e,e.return,_)}try{Kt(5,e,e.return)}catch(_){K(e,e.return,_)}}break;case 1:Oe(n,e),Ve(e),r&512&&t!==null&&it(t,t.return);break;case 5:if(Oe(n,e),Ve(e),r&512&&t!==null&&it(t,t.return),e.flags&32){var l=e.stateNode;try{Zt(l,"")}catch(_){K(e,e.return,_)}}if(r&4&&(l=e.stateNode,l!=null)){var o=e.memoizedProps,i=t!==null?t.memoizedProps:o,a=e.type,s=e.updateQueue;if(e.updateQueue=null,s!==null)try{a==="input"&&o.type==="radio"&&o.name!=null&&au(l,o),$o(a,i);var p=$o(a,o);for(i=0;i<s.length;i+=2){var h=s[i],f=s[i+1];h==="style"?du(l,f):h==="dangerouslySetInnerHTML"?cu(l,f):h==="children"?Zt(l,f):zi(l,h,f,p)}switch(a){case"input":Wo(l,o);break;case"textarea":su(l,o);break;case"select":var m=l._wrapperState.wasMultiple;l._wrapperState.wasMultiple=!!o.multiple;var w=o.value;w!=null?st(l,!!o.multiple,w,!1):m!==!!o.multiple&&(o.defaultValue!=null?st(l,!!o.multiple,o.defaultValue,!0):st(l,!!o.multiple,o.multiple?[]:"",!1))}l[or]=o}catch(_){K(e,e.return,_)}}break;case 6:if(Oe(n,e),Ve(e),r&4){if(e.stateNode===null)throw Error(x(162));l=e.stateNode,o=e.memoizedProps;try{l.nodeValue=o}catch(_){K(e,e.return,_)}}break;case 3:if(Oe(n,e),Ve(e),r&4&&t!==null&&t.memoizedState.isDehydrated)try{er(n.containerInfo)}catch(_){K(e,e.return,_)}break;case 4:Oe(n,e),Ve(e);break;case 13:Oe(n,e),Ve(e),l=e.child,l.flags&8192&&(o=l.memoizedState!==null,l.stateNode.isHidden=o,!o||l.alternate!==null&&l.alternate.memoizedState!==null||(ia=Y())),r&4&&Ys(e);break;case 22:if(h=t!==null&&t.memoizedState!==null,e.mode&1?(ae=(p=ae)||h,Oe(n,e),ae=p):Oe(n,e),Ve(e),r&8192){if(p=e.memoizedState!==null,(e.stateNode.isHidden=p)&&!h&&(e.mode&1)!==0)for(E=e,h=e.child;h!==null;){for(f=E=h;E!==null;){switch(m=E,w=m.child,m.tag){case 0:case 11:case 14:case 15:Kt(4,m,m.return);break;case 1:it(m,m.return);var S=m.stateNode;if(typeof S.componentWillUnmount=="function"){r=m,t=m.return;try{n=r,S.props=n.memoizedProps,S.state=n.memoizedState,S.componentWillUnmount()}catch(_){K(r,t,_)}}break;case 5:it(m,m.return);break;case 22:if(m.memoizedState!==null){Gs(f);continue}}w!==null?(w.return=m,E=w):Gs(f)}h=h.sibling}e:for(h=null,f=e;;){if(f.tag===5){if(h===null){h=f;try{l=f.stateNode,p?(o=l.style,typeof o.setProperty=="function"?o.setProperty("display","none","important"):o.display="none"):(a=f.stateNode,s=f.memoizedProps.style,i=s!=null&&s.hasOwnProperty("display")?s.display:null,a.style.display=pu("display",i))}catch(_){K(e,e.return,_)}}}else if(f.tag===6){if(h===null)try{f.stateNode.nodeValue=p?"":f.memoizedProps}catch(_){K(e,e.return,_)}}else if((f.tag!==22&&f.tag!==23||f.memoizedState===null||f===e)&&f.child!==null){f.child.return=f,f=f.child;continue}if(f===e)break e;for(;f.sibling===null;){if(f.return===null||f.return===e)break e;h===f&&(h=null),f=f.return}h===f&&(h=null),f.sibling.return=f.return,f=f.sibling}}break;case 19:Oe(n,e),Ve(e),r&4&&Ys(e);break;case 21:break;default:Oe(n,e),Ve(e)}}function Ve(e){var n=e.flags;if(n&2){try{e:{for(var t=e.return;t!==null;){if(Fc(t)){var r=t;break e}t=t.return}throw Error(x(160))}switch(r.tag){case 5:var l=r.stateNode;r.flags&32&&(Zt(l,""),r.flags&=-33);var o=Ks(e);wi(e,o,l);break;case 3:case 4:var i=r.stateNode.containerInfo,a=Ks(e);xi(e,a,i);break;default:throw Error(x(161))}}catch(s){K(e,e.return,s)}e.flags&=-3}n&4096&&(e.flags&=-4097)}function zf(e,n,t){E=e,Bc(e,n,t)}function Bc(e,n,t){for(var r=(e.mode&1)!==0;E!==null;){var l=E,o=l.child;if(l.tag===22&&r){var i=l.memoizedState!==null||$r;if(!i){var a=l.alternate,s=a!==null&&a.memoizedState!==null||ae;a=$r;var p=ae;if($r=i,(ae=s)&&!p)for(E=l;E!==null;)i=E,s=i.child,i.tag===22&&i.memoizedState!==null?Zs(l):s!==null?(s.return=i,E=s):Zs(l);for(;o!==null;)E=o,Bc(o,n,t),o=o.sibling;E=l,$r=a,ae=p}Xs(e,n,t)}else(l.subtreeFlags&8772)!==0&&o!==null?(o.return=l,E=o):Xs(e,n,t)}}function Xs(e){for(;E!==null;){var n=E;if((n.flags&8772)!==0){var t=n.alternate;try{if((n.flags&8772)!==0)switch(n.tag){case 0:case 11:case 15:ae||Ol(5,n);break;case 1:var r=n.stateNode;if(n.flags&4&&!ae)if(t===null)r.componentDidMount();else{var l=n.elementType===n.type?t.memoizedProps:je(n.type,t.memoizedProps);r.componentDidUpdate(l,t.memoizedState,r.__reactInternalSnapshotBeforeUpdate)}var o=n.updateQueue;o!==null&&Ts(n,o,r);break;case 3:var i=n.updateQueue;if(i!==null){if(t=null,n.child!==null)switch(n.child.tag){case 5:t=n.child.stateNode;break;case 1:t=n.child.stateNode}Ts(n,i,t)}break;case 5:var a=n.stateNode;if(t===null&&n.flags&4){t=a;var s=n.memoizedProps;switch(n.type){case"button":case"input":case"select":case"textarea":s.autoFocus&&t.focus();break;case"img":s.src&&(t.src=s.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(n.memoizedState===null){var p=n.alternate;if(p!==null){var h=p.memoizedState;if(h!==null){var f=h.dehydrated;f!==null&&er(f)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(x(163))}ae||n.flags&512&&yi(n)}catch(m){K(n,n.return,m)}}if(n===e){E=null;break}if(t=n.sibling,t!==null){t.return=n.return,E=t;break}E=n.return}}function Gs(e){for(;E!==null;){var n=E;if(n===e){E=null;break}var t=n.sibling;if(t!==null){t.return=n.return,E=t;break}E=n.return}}function Zs(e){for(;E!==null;){var n=E;try{switch(n.tag){case 0:case 11:case 15:var t=n.return;try{Ol(4,n)}catch(s){K(n,t,s)}break;case 1:var r=n.stateNode;if(typeof r.componentDidMount=="function"){var l=n.return;try{r.componentDidMount()}catch(s){K(n,l,s)}}var o=n.return;try{yi(n)}catch(s){K(n,o,s)}break;case 5:var i=n.return;try{yi(n)}catch(s){K(n,i,s)}}}catch(s){K(n,n.return,s)}if(n===e){E=null;break}var a=n.sibling;if(a!==null){a.return=n.return,E=a;break}E=n.return}}var Pf=Math.ceil,kl=rn.ReactCurrentDispatcher,la=rn.ReactCurrentOwner,Ie=rn.ReactCurrentBatchConfig,T=0,ee=null,X=null,te=0,ye=0,at=En(0),Z=0,pr=null,Vn=0,jl=0,oa=0,Yt=null,fe=null,ia=0,wt=1/0,Xe=null,Sl=!1,ki=null,wn=null,Qr=!1,mn=null,Nl=0,Xt=0,Si=null,qr=-1,el=0;function pe(){return(T&6)!==0?Y():qr!==-1?qr:qr=Y()}function kn(e){return(e.mode&1)===0?1:(T&2)!==0&&te!==0?te&-te:pf.transition!==null?(el===0&&(el=Cu()),el):(e=O,e!==0||(e=window.event,e=e===void 0?16:Mu(e.type)),e)}function We(e,n,t,r){if(50<Xt)throw Xt=0,Si=null,Error(x(185));dr(e,t,r),((T&2)===0||e!==ee)&&(e===ee&&((T&2)===0&&(jl|=t),Z===4&&dn(e,te)),ve(e,r),t===1&&T===0&&(n.mode&1)===0&&(wt=Y()+500,Ml&&zn()))}function ve(e,n){var t=e.callbackNode;dd(e,n);var r=il(e,e===ee?te:0);if(r===0)t!==null&&ls(t),e.callbackNode=null,e.callbackPriority=0;else if(n=r&-r,e.callbackPriority!==n){if(t!=null&&ls(t),n===1)e.tag===0?cf(bs.bind(null,e)):Zu(bs.bind(null,e)),of(function(){(T&6)===0&&zn()}),t=null;else{switch(_u(r)){case 1:t=Ti;break;case 4:t=Su;break;case 16:t=ol;break;case 536870912:t=Nu;break;default:t=ol}t=Xc(t,Ac.bind(null,e))}e.callbackPriority=n,e.callbackNode=t}}function Ac(e,n){if(qr=-1,el=0,(T&6)!==0)throw Error(x(327));var t=e.callbackNode;if(ft()&&e.callbackNode!==t)return null;var r=il(e,e===ee?te:0);if(r===0)return null;if((r&30)!==0||(r&e.expiredLanes)!==0||n)n=Cl(e,r);else{n=r;var l=T;T|=2;var o=Hc();(ee!==e||te!==n)&&(Xe=null,wt=Y()+500,Fn(e,n));do try{Mf();break}catch(a){Vc(e,a)}while(!0);Qi(),kl.current=o,T=l,X!==null?n=0:(ee=null,te=0,n=Z)}if(n!==0){if(n===2&&(l=Go(e),l!==0&&(r=l,n=Ni(e,l))),n===1)throw t=pr,Fn(e,0),dn(e,r),ve(e,Y()),t;if(n===6)dn(e,r);else{if(l=e.current.alternate,(r&30)===0&&!If(l)&&(n=Cl(e,r),n===2&&(o=Go(e),o!==0&&(r=o,n=Ni(e,o))),n===1))throw t=pr,Fn(e,0),dn(e,r),ve(e,Y()),t;switch(e.finishedWork=l,e.finishedLanes=r,n){case 0:case 1:throw Error(x(345));case 2:Rn(e,fe,Xe);break;case 3:if(dn(e,r),(r&130023424)===r&&(n=ia+500-Y(),10<n)){if(il(e,0)!==0)break;if(l=e.suspendedLanes,(l&r)!==r){pe(),e.pingedLanes|=e.suspendedLanes&l;break}e.timeoutHandle=ri(Rn.bind(null,e,fe,Xe),n);break}Rn(e,fe,Xe);break;case 4:if(dn(e,r),(r&4194240)===r)break;for(n=e.eventTimes,l=-1;0<r;){var i=31-Ue(r);o=1<<i,i=n[i],i>l&&(l=i),r&=~o}if(r=l,r=Y()-r,r=(120>r?120:480>r?480:1080>r?1080:1920>r?1920:3e3>r?3e3:4320>r?4320:1960*Pf(r/1960))-r,10<r){e.timeoutHandle=ri(Rn.bind(null,e,fe,Xe),r);break}Rn(e,fe,Xe);break;case 5:Rn(e,fe,Xe);break;default:throw Error(x(329))}}}return ve(e,Y()),e.callbackNode===t?Ac.bind(null,e):null}function Ni(e,n){var t=Yt;return e.current.memoizedState.isDehydrated&&(Fn(e,n).flags|=256),e=Cl(e,n),e!==2&&(n=fe,fe=t,n!==null&&Ci(n)),e}function Ci(e){fe===null?fe=e:fe.push.apply(fe,e)}function If(e){for(var n=e;;){if(n.flags&16384){var t=n.updateQueue;if(t!==null&&(t=t.stores,t!==null))for(var r=0;r<t.length;r++){var l=t[r],o=l.getSnapshot;l=l.value;try{if(!Be(o(),l))return!1}catch{return!1}}}if(t=n.child,n.subtreeFlags&16384&&t!==null)t.return=n,n=t;else{if(n===e)break;for(;n.sibling===null;){if(n.return===null||n.return===e)return!0;n=n.return}n.sibling.return=n.return,n=n.sibling}}return!0}function dn(e,n){for(n&=~oa,n&=~jl,e.suspendedLanes|=n,e.pingedLanes&=~n,e=e.expirationTimes;0<n;){var t=31-Ue(n),r=1<<t;e[t]=-1,n&=~r}}function bs(e){if((T&6)!==0)throw Error(x(327));ft();var n=il(e,0);if((n&1)===0)return ve(e,Y()),null;var t=Cl(e,n);if(e.tag!==0&&t===2){var r=Go(e);r!==0&&(n=r,t=Ni(e,r))}if(t===1)throw t=pr,Fn(e,0),dn(e,n),ve(e,Y()),t;if(t===6)throw Error(x(345));return e.finishedWork=e.current.alternate,e.finishedLanes=n,Rn(e,fe,Xe),ve(e,Y()),null}function aa(e,n){var t=T;T|=1;try{return e(n)}finally{T=t,T===0&&(wt=Y()+500,Ml&&zn())}}function Hn(e){mn!==null&&mn.tag===0&&(T&6)===0&&ft();var n=T;T|=1;var t=Ie.transition,r=O;try{if(Ie.transition=null,O=1,e)return e()}finally{O=r,Ie.transition=t,T=n,(T&6)===0&&zn()}}function sa(){ye=at.current,W(at)}function Fn(e,n){e.finishedWork=null,e.finishedLanes=0;var t=e.timeoutHandle;if(t!==-1&&(e.timeoutHandle=-1,lf(t)),X!==null)for(t=X.return;t!==null;){var r=t;switch(Vi(r),r.tag){case 1:r=r.type.childContextTypes,r!=null&&pl();break;case 3:yt(),W(ge),W(se),bi();break;case 5:Zi(r);break;case 4:yt();break;case 13:W(H);break;case 19:W(H);break;case 10:Ki(r.type._context);break;case 22:case 23:sa()}t=t.return}if(ee=e,X=e=Sn(e.current,null),te=ye=n,Z=0,pr=null,oa=jl=Vn=0,fe=Yt=null,jn!==null){for(n=0;n<jn.length;n++)if(t=jn[n],r=t.interleaved,r!==null){t.interleaved=null;var l=r.next,o=t.pending;if(o!==null){var i=o.next;o.next=l,r.next=i}t.pending=r}jn=null}return e}function Vc(e,n){do{var t=X;try{if(Qi(),Zr.current=wl,xl){for(var r=$.memoizedState;r!==null;){var l=r.queue;l!==null&&(l.pending=null),r=r.next}xl=!1}if(An=0,q=G=$=null,Qt=!1,sr=0,la.current=null,t===null||t.return===null){Z=1,pr=n,X=null;break}e:{var o=e,i=t.return,a=t,s=n;if(n=te,a.flags|=32768,s!==null&&typeof s=="object"&&typeof s.then=="function"){var p=s,h=a,f=h.tag;if((h.mode&1)===0&&(f===0||f===11||f===15)){var m=h.alternate;m?(h.updateQueue=m.updateQueue,h.memoizedState=m.memoizedState,h.lanes=m.lanes):(h.updateQueue=null,h.memoizedState=null)}var w=Us(i);if(w!==null){w.flags&=-257,Ws(w,i,a,o,n),w.mode&1&&Fs(o,p,n),n=w,s=p;var S=n.updateQueue;if(S===null){var _=new Set;_.add(s),n.updateQueue=_}else S.add(s);break e}else{if((n&1)===0){Fs(o,p,n),ua();break e}s=Error(x(426))}}else if(V&&a.mode&1){var j=Us(i);if(j!==null){(j.flags&65536)===0&&(j.flags|=256),Ws(j,i,a,o,n),Hi(xt(s,a));break e}}o=s=xt(s,a),Z!==4&&(Z=2),Yt===null?Yt=[o]:Yt.push(o),o=i;do{switch(o.tag){case 3:o.flags|=65536,n&=-n,o.lanes|=n;var u=_c(o,s,n);Ms(o,u);break e;case 1:a=s;var c=o.type,d=o.stateNode;if((o.flags&128)===0&&(typeof c.getDerivedStateFromError=="function"||d!==null&&typeof d.componentDidCatch=="function"&&(wn===null||!wn.has(d)))){o.flags|=65536,n&=-n,o.lanes|=n;var y=Ec(o,a,n);Ms(o,y);break e}}o=o.return}while(o!==null)}Qc(t)}catch(P){n=P,X===t&&t!==null&&(X=t=t.return);continue}break}while(!0)}function Hc(){var e=kl.current;return kl.current=wl,e===null?wl:e}function ua(){(Z===0||Z===3||Z===2)&&(Z=4),ee===null||(Vn&268435455)===0&&(jl&268435455)===0||dn(ee,te)}function Cl(e,n){var t=T;T|=2;var r=Hc();(ee!==e||te!==n)&&(Xe=null,Fn(e,n));do try{Lf();break}catch(l){Vc(e,l)}while(!0);if(Qi(),T=t,kl.current=r,X!==null)throw Error(x(261));return ee=null,te=0,Z}function Lf(){for(;X!==null;)$c(X)}function Mf(){for(;X!==null&&!rd();)$c(X)}function $c(e){var n=Yc(e.alternate,e,ye);e.memoizedProps=e.pendingProps,n===null?Qc(e):X=n,la.current=null}function Qc(e){var n=e;do{var t=n.alternate;if(e=n.return,(n.flags&32768)===0){if(t=Nf(t,n,ye),t!==null){X=t;return}}else{if(t=Cf(t,n),t!==null){t.flags&=32767,X=t;return}if(e!==null)e.flags|=32768,e.subtreeFlags=0,e.deletions=null;else{Z=6,X=null;return}}if(n=n.sibling,n!==null){X=n;return}X=n=e}while(n!==null);Z===0&&(Z=5)}function Rn(e,n,t){var r=O,l=Ie.transition;try{Ie.transition=null,O=1,Tf(e,n,t,r)}finally{Ie.transition=l,O=r}return null}function Tf(e,n,t,r){do ft();while(mn!==null);if((T&6)!==0)throw Error(x(327));t=e.finishedWork;var l=e.finishedLanes;if(t===null)return null;if(e.finishedWork=null,e.finishedLanes=0,t===e.current)throw Error(x(177));e.callbackNode=null,e.callbackPriority=0;var o=t.lanes|t.childLanes;if(fd(e,o),e===ee&&(X=ee=null,te=0),(t.subtreeFlags&2064)===0&&(t.flags&2064)===0||Qr||(Qr=!0,Xc(ol,function(){return ft(),null})),o=(t.flags&15990)!==0,(t.subtreeFlags&15990)!==0||o){o=Ie.transition,Ie.transition=null;var i=O;O=1;var a=T;T|=4,la.current=null,Ef(e,t),Wc(t,e),qd(ni),al=!!ei,ni=ei=null,e.current=t,zf(t,e,l),ld(),T=a,O=i,Ie.transition=o}else e.current=t;if(Qr&&(Qr=!1,mn=e,Nl=l),o=e.pendingLanes,o===0&&(wn=null),ad(t.stateNode,r),ve(e,Y()),n!==null)for(r=e.onRecoverableError,t=0;t<n.length;t++)l=n[t],r(l.value,{componentStack:l.stack,digest:l.digest});if(Sl)throw Sl=!1,e=ki,ki=null,e;return(Nl&1)!==0&&e.tag!==0&&ft(),o=e.pendingLanes,(o&1)!==0?e===Si?Xt++:(Xt=0,Si=e):Xt=0,zn(),null}function ft(){if(mn!==null){var e=_u(Nl),n=Ie.transition,t=O;try{if(Ie.transition=null,O=16>e?16:e,mn===null)var r=!1;else{if(e=mn,mn=null,Nl=0,(T&6)!==0)throw Error(x(331));var l=T;for(T|=4,E=e.current;E!==null;){var o=E,i=o.child;if((E.flags&16)!==0){var a=o.deletions;if(a!==null){for(var s=0;s<a.length;s++){var p=a[s];for(E=p;E!==null;){var h=E;switch(h.tag){case 0:case 11:case 15:Kt(8,h,o)}var f=h.child;if(f!==null)f.return=h,E=f;else for(;E!==null;){h=E;var m=h.sibling,w=h.return;if(Dc(h),h===p){E=null;break}if(m!==null){m.return=w,E=m;break}E=w}}}var S=o.alternate;if(S!==null){var _=S.child;if(_!==null){S.child=null;do{var j=_.sibling;_.sibling=null,_=j}while(_!==null)}}E=o}}if((o.subtreeFlags&2064)!==0&&i!==null)i.return=o,E=i;else e:for(;E!==null;){if(o=E,(o.flags&2048)!==0)switch(o.tag){case 0:case 11:case 15:Kt(9,o,o.return)}var u=o.sibling;if(u!==null){u.return=o.return,E=u;break e}E=o.return}}var c=e.current;for(E=c;E!==null;){i=E;var d=i.child;if((i.subtreeFlags&2064)!==0&&d!==null)d.return=i,E=d;else e:for(i=c;E!==null;){if(a=E,(a.flags&2048)!==0)try{switch(a.tag){case 0:case 11:case 15:Ol(9,a)}}catch(P){K(a,a.return,P)}if(a===i){E=null;break e}var y=a.sibling;if(y!==null){y.return=a.return,E=y;break e}E=a.return}}if(T=l,zn(),Qe&&typeof Qe.onPostCommitFiberRoot=="function")try{Qe.onPostCommitFiberRoot(El,e)}catch{}r=!0}return r}finally{O=t,Ie.transition=n}}return!1}function Js(e,n,t){n=xt(t,n),n=_c(e,n,1),e=xn(e,n,1),n=pe(),e!==null&&(dr(e,1,n),ve(e,n))}function K(e,n,t){if(e.tag===3)Js(e,e,t);else for(;n!==null;){if(n.tag===3){Js(n,e,t);break}else if(n.tag===1){var r=n.stateNode;if(typeof n.type.getDerivedStateFromError=="function"||typeof r.componentDidCatch=="function"&&(wn===null||!wn.has(r))){e=xt(t,e),e=Ec(n,e,1),n=xn(n,e,1),e=pe(),n!==null&&(dr(n,1,e),ve(n,e));break}}n=n.return}}function Rf(e,n,t){var r=e.pingCache;r!==null&&r.delete(n),n=pe(),e.pingedLanes|=e.suspendedLanes&t,ee===e&&(te&t)===t&&(Z===4||Z===3&&(te&130023424)===te&&500>Y()-ia?Fn(e,0):oa|=t),ve(e,n)}function Kc(e,n){n===0&&((e.mode&1)===0?n=1:(n=Mr,Mr<<=1,(Mr&130023424)===0&&(Mr=4194304)));var t=pe();e=nn(e,n),e!==null&&(dr(e,n,t),ve(e,t))}function Of(e){var n=e.memoizedState,t=0;n!==null&&(t=n.retryLane),Kc(e,t)}function jf(e,n){var t=0;switch(e.tag){case 13:var r=e.stateNode,l=e.memoizedState;l!==null&&(t=l.retryLane);break;case 19:r=e.stateNode;break;default:throw Error(x(314))}r!==null&&r.delete(n),Kc(e,t)}var Yc;Yc=function(e,n,t){if(e!==null)if(e.memoizedProps!==n.pendingProps||ge.current)me=!0;else{if((e.lanes&t)===0&&(n.flags&128)===0)return me=!1,Sf(e,n,t);me=(e.flags&131072)!==0}else me=!1,V&&(n.flags&1048576)!==0&&bu(n,ml,n.index);switch(n.lanes=0,n.tag){case 2:var r=n.type;Jr(e,n),e=n.pendingProps;var l=gt(n,se.current);dt(n,t),l=qi(null,n,r,e,l,t);var o=ea();return n.flags|=1,typeof l=="object"&&l!==null&&typeof l.render=="function"&&l.$$typeof===void 0?(n.tag=1,n.memoizedState=null,n.updateQueue=null,he(r)?(o=!0,dl(n)):o=!1,n.memoizedState=l.state!==null&&l.state!==void 0?l.state:null,Xi(n),l.updater=Rl,n.stateNode=l,l._reactInternals=n,ci(n,r,e,t),n=fi(null,n,r,!0,o,t)):(n.tag=0,V&&o&&Ai(n),ce(null,n,l,t),n=n.child),n;case 16:r=n.elementType;e:{switch(Jr(e,n),e=n.pendingProps,l=r._init,r=l(r._payload),n.type=r,l=n.tag=Ff(r),e=je(r,e),l){case 0:n=di(null,n,r,e,t);break e;case 1:n=Vs(null,n,r,e,t);break e;case 11:n=Bs(null,n,r,e,t);break e;case 14:n=As(null,n,r,je(r.type,e),t);break e}throw Error(x(306,r,""))}return n;case 0:return r=n.type,l=n.pendingProps,l=n.elementType===r?l:je(r,l),di(e,n,r,l,t);case 1:return r=n.type,l=n.pendingProps,l=n.elementType===r?l:je(r,l),Vs(e,n,r,l,t);case 3:e:{if(Lc(n),e===null)throw Error(x(387));r=n.pendingProps,o=n.memoizedState,l=o.element,rc(e,n),vl(n,r,null,t);var i=n.memoizedState;if(r=i.element,o.isDehydrated)if(o={element:r,isDehydrated:!1,cache:i.cache,pendingSuspenseBoundaries:i.pendingSuspenseBoundaries,transitions:i.transitions},n.updateQueue.baseState=o,n.memoizedState=o,n.flags&256){l=xt(Error(x(423)),n),n=Hs(e,n,r,t,l);break e}else if(r!==l){l=xt(Error(x(424)),n),n=Hs(e,n,r,t,l);break e}else for(xe=yn(n.stateNode.containerInfo.firstChild),we=n,V=!0,Fe=null,t=nc(n,null,r,t),n.child=t;t;)t.flags=t.flags&-3|4096,t=t.sibling;else{if(ht(),r===l){n=tn(e,n,t);break e}ce(e,n,r,t)}n=n.child}return n;case 5:return lc(n),e===null&&ai(n),r=n.type,l=n.pendingProps,o=e!==null?e.memoizedProps:null,i=l.children,ti(r,l)?i=null:o!==null&&ti(r,o)&&(n.flags|=32),Ic(e,n),ce(e,n,i,t),n.child;case 6:return e===null&&ai(n),null;case 13:return Mc(e,n,t);case 4:return Gi(n,n.stateNode.containerInfo),r=n.pendingProps,e===null?n.child=vt(n,null,r,t):ce(e,n,r,t),n.child;case 11:return r=n.type,l=n.pendingProps,l=n.elementType===r?l:je(r,l),Bs(e,n,r,l,t);case 7:return ce(e,n,n.pendingProps,t),n.child;case 8:return ce(e,n,n.pendingProps.children,t),n.child;case 12:return ce(e,n,n.pendingProps.children,t),n.child;case 10:e:{if(r=n.type._context,l=n.pendingProps,o=n.memoizedProps,i=l.value,F(gl,r._currentValue),r._currentValue=i,o!==null)if(Be(o.value,i)){if(o.children===l.children&&!ge.current){n=tn(e,n,t);break e}}else for(o=n.child,o!==null&&(o.return=n);o!==null;){var a=o.dependencies;if(a!==null){i=o.child;for(var s=a.firstContext;s!==null;){if(s.context===r){if(o.tag===1){s=Je(-1,t&-t),s.tag=2;var p=o.updateQueue;if(p!==null){p=p.shared;var h=p.pending;h===null?s.next=s:(s.next=h.next,h.next=s),p.pending=s}}o.lanes|=t,s=o.alternate,s!==null&&(s.lanes|=t),si(o.return,t,n),a.lanes|=t;break}s=s.next}}else if(o.tag===10)i=o.type===n.type?null:o.child;else if(o.tag===18){if(i=o.return,i===null)throw Error(x(341));i.lanes|=t,a=i.alternate,a!==null&&(a.lanes|=t),si(i,t,n),i=o.sibling}else i=o.child;if(i!==null)i.return=o;else for(i=o;i!==null;){if(i===n){i=null;break}if(o=i.sibling,o!==null){o.return=i.return,i=o;break}i=i.return}o=i}ce(e,n,l.children,t),n=n.child}return n;case 9:return l=n.type,r=n.pendingProps.children,dt(n,t),l=Le(l),r=r(l),n.flags|=1,ce(e,n,r,t),n.child;case 14:return r=n.type,l=je(r,n.pendingProps),l=je(r.type,l),As(e,n,r,l,t);case 15:return zc(e,n,n.type,n.pendingProps,t);case 17:return r=n.type,l=n.pendingProps,l=n.elementType===r?l:je(r,l),Jr(e,n),n.tag=1,he(r)?(e=!0,dl(n)):e=!1,dt(n,t),Cc(n,r,l),ci(n,r,l,t),fi(null,n,r,!0,e,t);case 19:return Tc(e,n,t);case 22:return Pc(e,n,t)}throw Error(x(156,n.tag))};function Xc(e,n){return ku(e,n)}function Df(e,n,t,r){this.tag=e,this.key=t,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=n,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Pe(e,n,t,r){return new Df(e,n,t,r)}function ca(e){return e=e.prototype,!(!e||!e.isReactComponent)}function Ff(e){if(typeof e=="function")return ca(e)?1:0;if(e!=null){if(e=e.$$typeof,e===Ii)return 11;if(e===Li)return 14}return 2}function Sn(e,n){var t=e.alternate;return t===null?(t=Pe(e.tag,n,e.key,e.mode),t.elementType=e.elementType,t.type=e.type,t.stateNode=e.stateNode,t.alternate=e,e.alternate=t):(t.pendingProps=n,t.type=e.type,t.flags=0,t.subtreeFlags=0,t.deletions=null),t.flags=e.flags&14680064,t.childLanes=e.childLanes,t.lanes=e.lanes,t.child=e.child,t.memoizedProps=e.memoizedProps,t.memoizedState=e.memoizedState,t.updateQueue=e.updateQueue,n=e.dependencies,t.dependencies=n===null?null:{lanes:n.lanes,firstContext:n.firstContext},t.sibling=e.sibling,t.index=e.index,t.ref=e.ref,t}function nl(e,n,t,r,l,o){var i=2;if(r=e,typeof e=="function")ca(e)&&(i=1);else if(typeof e=="string")i=5;else e:switch(e){case bn:return Un(t.children,l,o,n);case Pi:i=8,l|=8;break;case Oo:return e=Pe(12,t,n,l|2),e.elementType=Oo,e.lanes=o,e;case jo:return e=Pe(13,t,n,l),e.elementType=jo,e.lanes=o,e;case Do:return e=Pe(19,t,n,l),e.elementType=Do,e.lanes=o,e;case lu:return Dl(t,l,o,n);default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case tu:i=10;break e;case ru:i=9;break e;case Ii:i=11;break e;case Li:i=14;break e;case un:i=16,r=null;break e}throw Error(x(130,e==null?e:typeof e,""))}return n=Pe(i,t,n,l),n.elementType=e,n.type=r,n.lanes=o,n}function Un(e,n,t,r){return e=Pe(7,e,r,n),e.lanes=t,e}function Dl(e,n,t,r){return e=Pe(22,e,r,n),e.elementType=lu,e.lanes=t,e.stateNode={isHidden:!1},e}function Mo(e,n,t){return e=Pe(6,e,null,n),e.lanes=t,e}function To(e,n,t){return n=Pe(4,e.children!==null?e.children:[],e.key,n),n.lanes=t,n.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},n}function Uf(e,n,t,r,l){this.tag=n,this.containerInfo=e,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=go(0),this.expirationTimes=go(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=go(0),this.identifierPrefix=r,this.onRecoverableError=l,this.mutableSourceEagerHydrationData=null}function pa(e,n,t,r,l,o,i,a,s){return e=new Uf(e,n,t,a,s),n===1?(n=1,o===!0&&(n|=8)):n=0,o=Pe(3,null,null,n),e.current=o,o.stateNode=e,o.memoizedState={element:r,isDehydrated:t,cache:null,transitions:null,pendingSuspenseBoundaries:null},Xi(o),e}function Wf(e,n,t){var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:Zn,key:r==null?null:""+r,children:e,containerInfo:n,implementation:t}}function Gc(e){if(!e)return Cn;e=e._reactInternals;e:{if(Qn(e)!==e||e.tag!==1)throw Error(x(170));var n=e;do{switch(n.tag){case 3:n=n.stateNode.context;break e;case 1:if(he(n.type)){n=n.stateNode.__reactInternalMemoizedMergedChildContext;break e}}n=n.return}while(n!==null);throw Error(x(171))}if(e.tag===1){var t=e.type;if(he(t))return Gu(e,t,n)}return n}function Zc(e,n,t,r,l,o,i,a,s){return e=pa(t,r,!0,e,l,o,i,a,s),e.context=Gc(null),t=e.current,r=pe(),l=kn(t),o=Je(r,l),o.callback=n??null,xn(t,o,l),e.current.lanes=l,dr(e,l,r),ve(e,r),e}function Fl(e,n,t,r){var l=n.current,o=pe(),i=kn(l);return t=Gc(t),n.context===null?n.context=t:n.pendingContext=t,n=Je(o,i),n.payload={element:e},r=r===void 0?null:r,r!==null&&(n.callback=r),e=xn(l,n,i),e!==null&&(We(e,l,i,o),Gr(e,l,i)),i}function _l(e){return e=e.current,e.child?(e.child.tag===5,e.child.stateNode):null}function qs(e,n){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var t=e.retryLane;e.retryLane=t!==0&&t<n?t:n}}function da(e,n){qs(e,n),(e=e.alternate)&&qs(e,n)}function Bf(){return null}var bc=typeof reportError=="function"?reportError:function(e){console.error(e)};function fa(e){this._internalRoot=e}Ul.prototype.render=fa.prototype.render=function(e){var n=this._internalRoot;if(n===null)throw Error(x(409));Fl(e,n,null,null)};Ul.prototype.unmount=fa.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var n=e.containerInfo;Hn(function(){Fl(null,e,null,null)}),n[en]=null}};function Ul(e){this._internalRoot=e}Ul.prototype.unstable_scheduleHydration=function(e){if(e){var n=Pu();e={blockedOn:null,target:e,priority:n};for(var t=0;t<pn.length&&n!==0&&n<pn[t].priority;t++);pn.splice(t,0,e),t===0&&Lu(e)}};function ma(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function Wl(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11&&(e.nodeType!==8||e.nodeValue!==" react-mount-point-unstable "))}function eu(){}function Af(e,n,t,r,l){if(l){if(typeof r=="function"){var o=r;r=function(){var p=_l(i);o.call(p)}}var i=Zc(n,r,e,0,null,!1,!1,"",eu);return e._reactRootContainer=i,e[en]=i.current,rr(e.nodeType===8?e.parentNode:e),Hn(),i}for(;l=e.lastChild;)e.removeChild(l);if(typeof r=="function"){var a=r;r=function(){var p=_l(s);a.call(p)}}var s=pa(e,0,!1,null,null,!1,!1,"",eu);return e._reactRootContainer=s,e[en]=s.current,rr(e.nodeType===8?e.parentNode:e),Hn(function(){Fl(n,s,t,r)}),s}function Bl(e,n,t,r,l){var o=t._reactRootContainer;if(o){var i=o;if(typeof l=="function"){var a=l;l=function(){var s=_l(i);a.call(s)}}Fl(n,i,e,l)}else i=Af(t,n,e,l,r);return _l(i)}Eu=function(e){switch(e.tag){case 3:var n=e.stateNode;if(n.current.memoizedState.isDehydrated){var t=Ut(n.pendingLanes);t!==0&&(Ri(n,t|1),ve(n,Y()),(T&6)===0&&(wt=Y()+500,zn()))}break;case 13:Hn(function(){var r=nn(e,1);if(r!==null){var l=pe();We(r,e,1,l)}}),da(e,1)}};Oi=function(e){if(e.tag===13){var n=nn(e,134217728);if(n!==null){var t=pe();We(n,e,134217728,t)}da(e,134217728)}};zu=function(e){if(e.tag===13){var n=kn(e),t=nn(e,n);if(t!==null){var r=pe();We(t,e,n,r)}da(e,n)}};Pu=function(){return O};Iu=function(e,n){var t=O;try{return O=e,n()}finally{O=t}};Ko=function(e,n,t){switch(n){case"input":if(Wo(e,t),n=t.name,t.type==="radio"&&n!=null){for(t=e;t.parentNode;)t=t.parentNode;for(t=t.querySelectorAll("input[name="+JSON.stringify(""+n)+'][type="radio"]'),n=0;n<t.length;n++){var r=t[n];if(r!==e&&r.form===e.form){var l=Ll(r);if(!l)throw Error(x(90));iu(r),Wo(r,l)}}}break;case"textarea":su(e,t);break;case"select":n=t.value,n!=null&&st(e,!!t.multiple,n,!1)}};gu=aa;hu=Hn;var Vf={usingClientEntryPoint:!1,Events:[mr,nt,Ll,fu,mu,aa]},Ot={findFiberByHostInstance:On,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},Hf={bundleType:Ot.bundleType,version:Ot.version,rendererPackageName:Ot.rendererPackageName,rendererConfig:Ot.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:rn.ReactCurrentDispatcher,findHostInstanceByFiber:function(e){return e=xu(e),e===null?null:e.stateNode},findFiberByHostInstance:Ot.findFiberByHostInstance||Bf,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"&&(jt=__REACT_DEVTOOLS_GLOBAL_HOOK__,!jt.isDisabled&&jt.supportsFiber))try{El=jt.inject(Hf),Qe=jt}catch{}var jt;Ne.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=Vf;Ne.createPortal=function(e,n){var t=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!ma(n))throw Error(x(200));return Wf(e,n,null,t)};Ne.createRoot=function(e,n){if(!ma(e))throw Error(x(299));var t=!1,r="",l=bc;return n!=null&&(n.unstable_strictMode===!0&&(t=!0),n.identifierPrefix!==void 0&&(r=n.identifierPrefix),n.onRecoverableError!==void 0&&(l=n.onRecoverableError)),n=pa(e,1,!1,null,null,t,!1,r,l),e[en]=n.current,rr(e.nodeType===8?e.parentNode:e),new fa(n)};Ne.findDOMNode=function(e){if(e==null)return null;if(e.nodeType===1)return e;var n=e._reactInternals;if(n===void 0)throw typeof e.render=="function"?Error(x(188)):(e=Object.keys(e).join(","),Error(x(268,e)));return e=xu(n),e=e===null?null:e.stateNode,e};Ne.flushSync=function(e){return Hn(e)};Ne.hydrate=function(e,n,t){if(!Wl(n))throw Error(x(200));return Bl(null,e,n,!0,t)};Ne.hydrateRoot=function(e,n,t){if(!ma(e))throw Error(x(405));var r=t!=null&&t.hydratedSources||null,l=!1,o="",i=bc;if(t!=null&&(t.unstable_strictMode===!0&&(l=!0),t.identifierPrefix!==void 0&&(o=t.identifierPrefix),t.onRecoverableError!==void 0&&(i=t.onRecoverableError)),n=Zc(n,null,e,1,t??null,l,!1,o,i),e[en]=n.current,rr(e),r)for(e=0;e<r.length;e++)t=r[e],l=t._getVersion,l=l(t._source),n.mutableSourceEagerHydrationData==null?n.mutableSourceEagerHydrationData=[t,l]:n.mutableSourceEagerHydrationData.push(t,l);return new Ul(n)};Ne.render=function(e,n,t){if(!Wl(n))throw Error(x(200));return Bl(null,e,n,!1,t)};Ne.unmountComponentAtNode=function(e){if(!Wl(e))throw Error(x(40));return e._reactRootContainer?(Hn(function(){Bl(null,null,e,!1,function(){e._reactRootContainer=null,e[en]=null})}),!0):!1};Ne.unstable_batchedUpdates=aa;Ne.unstable_renderSubtreeIntoContainer=function(e,n,t,r){if(!Wl(t))throw Error(x(200));if(e==null||e._reactInternals===void 0)throw Error(x(38));return Bl(e,n,t,!1,r)};Ne.version="18.3.1-next-f1338f8080-20240426"});var np=Ye((l0,ep)=>{"use strict";function qc(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(qc)}catch(e){console.error(e)}}qc(),ep.exports=Jc()});var rp=Ye(ga=>{"use strict";var tp=np();ga.createRoot=tp.createRoot,ga.hydrateRoot=tp.hydrateRoot;var o0});var op=Ye(Al=>{"use strict";var $f=on(),Qf=Symbol.for("react.element"),Kf=Symbol.for("react.fragment"),Yf=Object.prototype.hasOwnProperty,Xf=$f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,Gf={key:!0,ref:!0,__self:!0,__source:!0};function lp(e,n,t){var r,l={},o=null,i=null;t!==void 0&&(o=""+t),n.key!==void 0&&(o=""+n.key),n.ref!==void 0&&(i=n.ref);for(r in n)Yf.call(n,r)&&!Gf.hasOwnProperty(r)&&(l[r]=n[r]);if(e&&e.defaultProps)for(r in n=e.defaultProps,n)l[r]===void 0&&(l[r]=n[r]);return{$$typeof:Qf,type:e,key:o,ref:i,props:l,_owner:Xf.current}}Al.Fragment=Kf;Al.jsx=lp;Al.jsxs=lp});var Ce=Ye((s0,ip)=>{"use strict";ip.exports=op()});var yp=J(on(),1),xp=J(rp(),1);var b=J(on(),1);var hp=J(on(),1);var v=J(Ce(),1);function hr({className:e="",size:n=24}){return(0,v.jsxs)("svg",{width:n,height:n,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:e,children:[(0,v.jsx)("path",{d:"M6 13.87A4 4 0 0 1 7.41 6a5.11 5.11 0 0 1 1.05-1.54 5 5 0 0 1 7.08 0A5.11 5.11 0 0 1 16.59 6 4 4 0 0 1 18 13.87V21H6Z"}),(0,v.jsx)("line",{x1:"6",x2:"18",y1:"17",y2:"17"})]})}function Vl({className:e="",size:n=24}){return(0,v.jsxs)("svg",{width:n,height:n,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:e,children:[(0,v.jsx)("rect",{width:"18",height:"18",x:"3",y:"4",rx:"2",ry:"2"}),(0,v.jsx)("line",{x1:"16",x2:"16",y1:"2",y2:"6"}),(0,v.jsx)("line",{x1:"8",x2:"8",y1:"2",y2:"6"}),(0,v.jsx)("line",{x1:"3",x2:"21",y1:"10",y2:"10"})]})}function Te({className:e="",size:n=24}){return(0,v.jsxs)("svg",{width:n,height:n,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:e,children:[(0,v.jsx)("line",{x1:"12",x2:"12",y1:"2",y2:"22"}),(0,v.jsx)("path",{d:"M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"})]})}function Pn({className:e="",size:n=24}){return(0,v.jsx)("svg",{width:n,height:n,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:e,children:(0,v.jsx)("path",{d:"M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"})})}function In({className:e="",size:n=24}){return(0,v.jsxs)("svg",{width:n,height:n,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:e,children:[(0,v.jsx)("path",{d:"M12 2a4 4 0 0 0-4 4v2a4 4 0 0 0 8 0V6a4 4 0 0 0-4-4z"}),(0,v.jsx)("path",{d:"M12 12v10"}),(0,v.jsx)("path",{d:"M8 16h8"}),(0,v.jsx)("path",{d:"M6 20h12"})]})}function vr({className:e="",size:n=24}){return(0,v.jsxs)("svg",{width:n,height:n,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:e,children:[(0,v.jsx)("circle",{cx:"8",cy:"21",r:"1"}),(0,v.jsx)("circle",{cx:"19",cy:"21",r:"1"}),(0,v.jsx)("path",{d:"M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"})]})}function Kn({className:e="",size:n=24}){return(0,v.jsxs)("svg",{width:n,height:n,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:e,children:[(0,v.jsx)("circle",{cx:"12",cy:"12",r:"10"}),(0,v.jsx)("polyline",{points:"12 6 12 12 16 14"})]})}function Hl({className:e="",size:n=24}){return(0,v.jsxs)("svg",{width:n,height:n,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:e,children:[(0,v.jsx)("path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"}),(0,v.jsx)("circle",{cx:"9",cy:"7",r:"4"}),(0,v.jsx)("path",{d:"M22 21v-2a4 4 0 0 0-3-3.87"}),(0,v.jsx)("path",{d:"M16 3.13a4 4 0 0 1 0 7.75"})]})}function ap({className:e="",size:n=24}){return(0,v.jsxs)("svg",{width:n,height:n,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:e,children:[(0,v.jsx)("path",{d:"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"}),(0,v.jsx)("path",{d:"M21 3v5h-5"}),(0,v.jsx)("path",{d:"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"}),(0,v.jsx)("path",{d:"M8 16H3v5"})]})}function ha({className:e="",size:n=24}){return(0,v.jsxs)("svg",{width:n,height:n,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:e,children:[(0,v.jsx)("path",{d:"M16 3h5v5"}),(0,v.jsx)("path",{d:"M8 3H3v5"}),(0,v.jsx)("path",{d:"M21 3l-7 7"}),(0,v.jsx)("path",{d:"M3 3l7 7"}),(0,v.jsx)("path",{d:"M16 21h5v-5"}),(0,v.jsx)("path",{d:"M8 21H3v-5"}),(0,v.jsx)("path",{d:"M21 21l-7-7"}),(0,v.jsx)("path",{d:"M3 21l7-7"})]})}function va({className:e="",size:n=24}){return(0,v.jsxs)("svg",{width:n,height:n,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:e,children:[(0,v.jsx)("path",{d:"M15 3h6v6"}),(0,v.jsx)("path",{d:"M9 21H3v-6"}),(0,v.jsx)("path",{d:"M21 3l-7 7"}),(0,v.jsx)("path",{d:"M3 21l7-7"})]})}function $l({className:e="",size:n=24}){return(0,v.jsxs)("svg",{width:n,height:n,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:e,children:[(0,v.jsx)("line",{x1:"18",x2:"6",y1:"6",y2:"18"}),(0,v.jsx)("line",{x1:"6",x2:"18",y1:"6",y2:"18"})]})}function sp({className:e="",size:n=24}){return(0,v.jsx)("svg",{width:n,height:n,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:e,children:(0,v.jsx)("polyline",{points:"20 6 9 17 4 12"})})}function Ql({className:e="",size:n=24}){return(0,v.jsxs)("svg",{width:n,height:n,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:e,children:[(0,v.jsx)("path",{d:"M12 2v4"}),(0,v.jsx)("path",{d:"m4.93 4.93 2.83 2.83"}),(0,v.jsx)("path",{d:"M2 12h4"}),(0,v.jsx)("path",{d:"m4.93 19.07 2.83-2.83"}),(0,v.jsx)("path",{d:"M12 18v4"}),(0,v.jsx)("path",{d:"m19.07 19.07-2.83-2.83"}),(0,v.jsx)("path",{d:"M22 12h-4"}),(0,v.jsx)("path",{d:"m19.07 4.93-2.83 2.83"}),(0,v.jsx)("circle",{cx:"12",cy:"12",r:"4"})]})}function Nt({className:e="",size:n=24}){return(0,v.jsxs)("svg",{width:n,height:n,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:e,children:[(0,v.jsx)("circle",{cx:"12",cy:"12",r:"4"}),(0,v.jsx)("path",{d:"M12 2v2"}),(0,v.jsx)("path",{d:"M12 20v2"}),(0,v.jsx)("path",{d:"m4.93 4.93 1.41 1.41"}),(0,v.jsx)("path",{d:"m17.66 17.66 1.41 1.41"}),(0,v.jsx)("path",{d:"M2 12h2"}),(0,v.jsx)("path",{d:"M20 12h2"}),(0,v.jsx)("path",{d:"m6.34 17.66-1.41 1.41"}),(0,v.jsx)("path",{d:"m19.07 4.93-1.41 1.41"})]})}function Kl({className:e="",size:n=24}){return(0,v.jsx)("svg",{width:n,height:n,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:e,children:(0,v.jsx)("path",{d:"M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"})})}function Yl({className:e="",size:n=24}){return(0,v.jsxs)("svg",{width:n,height:n,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:e,children:[(0,v.jsx)("path",{d:"M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5"}),(0,v.jsx)("path",{d:"M8.5 8.5v.01"}),(0,v.jsx)("path",{d:"M16 15.5v.01"}),(0,v.jsx)("path",{d:"M12 12v.01"}),(0,v.jsx)("path",{d:"M11 17v.01"}),(0,v.jsx)("path",{d:"M7 14v.01"})]})}function Ln({className:e="",size:n=24}){return(0,v.jsxs)("svg",{width:n,height:n,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:e,children:[(0,v.jsx)("path",{d:"M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"}),(0,v.jsx)("path",{d:"M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"})]})}function yr({className:e="",size:n=24}){return(0,v.jsx)("svg",{width:n,height:n,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:e,children:(0,v.jsx)("polygon",{points:"13 2 3 14 12 14 11 22 21 10 12 10 13 2"})})}function up({className:e="",size:n=24}){return(0,v.jsx)("svg",{width:n,height:n,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:e,children:(0,v.jsx)("path",{d:"M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"})})}function cp({className:e="",size:n=24}){return(0,v.jsx)("svg",{width:n,height:n,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:e,children:(0,v.jsx)("path",{d:"m6 9 6 6 6-6"})})}function pp({className:e="",size:n=24}){return(0,v.jsx)("svg",{width:n,height:n,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:e,children:(0,v.jsx)("path",{d:"m18 15-6-6-6 6"})})}function dp({className:e="",size:n=24}){return(0,v.jsx)("svg",{width:n,height:n,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:e,children:(0,v.jsx)("path",{d:"m15 18-6-6 6-6"})})}function fp({className:e="",size:n=24}){return(0,v.jsx)("svg",{width:n,height:n,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:e,children:(0,v.jsx)("path",{d:"m9 18 6-6-6-6"})})}function mp({className:e="",size:n=24}){return(0,v.jsx)("svg",{width:n,height:n,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:e,children:(0,v.jsx)("polygon",{points:"12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"})})}function gp({className:e="",size:n=24}){return(0,v.jsxs)("svg",{width:n,height:n,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:e,children:[(0,v.jsx)("path",{d:"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"}),(0,v.jsx)("polyline",{points:"15 3 21 3 21 9"}),(0,v.jsx)("line",{x1:"10",x2:"21",y1:"14",y2:"3"})]})}var C=J(Ce(),1),Zf={breakfast:Ql,lunch:Nt,dinner:Kl,snack:Yl};function ya({plan:e,onOrderIngredients:n,onOpenFullPlan:t}){let{household:r,constraints:l,budget_summary:o,nutrition_summary:i,days:a}=e,[s,p]=(0,hp.useState)(0),h=l.diet.length>0?l.diet[0].charAt(0).toUpperCase()+l.diet[0].slice(1):"Balanced",f=a[s];return(0,C.jsxs)("div",{className:"cp-inline-widget",children:[(0,C.jsxs)("div",{className:"cp-inline-header",children:[(0,C.jsxs)("div",{className:"cp-inline-logo",children:[(0,C.jsx)(hr,{size:28,className:"cp-icon-green"}),(0,C.jsx)("span",{className:"cp-inline-brand",children:"ChefPlan"})]}),(0,C.jsxs)("button",{className:"cp-expand-btn",onClick:t,children:[(0,C.jsx)(va,{size:18}),"Open Full"]})]}),(0,C.jsx)("h2",{className:"cp-inline-title",children:"Weekly meal plan"}),(0,C.jsxs)("div",{className:"cp-inline-context",children:[(0,C.jsxs)("span",{className:"cp-context-item",children:[(0,C.jsx)(Hl,{size:14}),"Family of ",r.size]}),(0,C.jsx)("span",{className:"cp-context-divider",children:"\xB7"}),(0,C.jsxs)("span",{className:"cp-context-item",children:[(0,C.jsx)(Ln,{size:14}),h]}),(0,C.jsx)("span",{className:"cp-context-divider",children:"\xB7"}),(0,C.jsxs)("span",{className:"cp-context-item",children:[(0,C.jsx)(Te,{size:14}),"Budget <$",l.budget_target]}),(0,C.jsx)("span",{className:"cp-context-divider",children:"\xB7"}),(0,C.jsxs)("span",{className:"cp-context-item",children:[(0,C.jsx)(Vl,{size:14}),"7 days"]})]}),(0,C.jsxs)("div",{className:"cp-inline-metrics",children:[(0,C.jsxs)("div",{className:"cp-metric",children:[(0,C.jsx)(Te,{size:18,className:"cp-icon-orange"}),(0,C.jsxs)("div",{className:"cp-metric-content",children:[(0,C.jsxs)("span",{className:"cp-metric-value",children:["$",o.estimated_total.toFixed(2)]}),(0,C.jsx)("span",{className:"cp-metric-label",children:"Est. total"})]})]}),(0,C.jsxs)("div",{className:"cp-metric",children:[(0,C.jsx)(Pn,{size:18,className:"cp-icon-orange"}),(0,C.jsxs)("div",{className:"cp-metric-content",children:[(0,C.jsx)("span",{className:"cp-metric-value",children:i.avg_calories_per_day}),(0,C.jsx)("span",{className:"cp-metric-label",children:"kcal/day"})]})]}),(0,C.jsxs)("div",{className:"cp-metric",children:[(0,C.jsx)(In,{size:18,className:"cp-icon-green"}),(0,C.jsxs)("div",{className:"cp-metric-content",children:[(0,C.jsxs)("span",{className:"cp-metric-value",children:[i.avg_protein_g,"g"]}),(0,C.jsx)("span",{className:"cp-metric-label",children:"protein/day"})]})]})]}),(0,C.jsx)("div",{className:"cp-day-tabs",children:a.map((m,w)=>(0,C.jsx)("button",{className:`cp-day-tab ${s===w?"active":""}`,onClick:()=>p(w),children:m.day},m.day))}),(0,C.jsx)("div",{className:"cp-meals-grid",children:f.meals.map(m=>{let w=Zf[m.type]||Nt;return(0,C.jsxs)("div",{className:"cp-meal-card",children:[m.image_url?(0,C.jsxs)("div",{className:"cp-meal-image",children:[(0,C.jsx)("img",{src:m.image_url,alt:m.title}),(0,C.jsx)("span",{className:"cp-meal-type-badge",children:m.type})]}):(0,C.jsxs)("div",{className:"cp-meal-placeholder",children:[(0,C.jsx)(w,{size:24}),(0,C.jsx)("span",{className:"cp-meal-type-badge",children:m.type})]}),(0,C.jsxs)("div",{className:"cp-meal-info",children:[(0,C.jsx)("span",{className:"cp-meal-title",children:m.title}),(0,C.jsxs)("div",{className:"cp-meal-meta",children:[(0,C.jsxs)("span",{children:[(0,C.jsx)(Kn,{size:12})," ",m.prep_minutes,"m"]}),(0,C.jsxs)("span",{children:[(0,C.jsx)(Pn,{size:12})," ",m.calories]}),(0,C.jsxs)("span",{children:[(0,C.jsx)(Te,{size:12})," $",m.estimated_cost.toFixed(0)]})]})]})]},m.meal_id)})}),(0,C.jsxs)("div",{className:"cp-day-stats",children:[(0,C.jsxs)("span",{children:[f.totals.calories," kcal"]}),(0,C.jsx)("span",{children:"\xB7"}),(0,C.jsxs)("span",{children:[f.totals.protein_g,"g protein"]}),(0,C.jsx)("span",{children:"\xB7"}),(0,C.jsxs)("span",{children:[f.totals.carbs_g,"g carbs"]}),(0,C.jsx)("span",{children:"\xB7"}),(0,C.jsxs)("span",{children:[f.totals.fat_g,"g fat"]})]}),(0,C.jsxs)("div",{className:"cp-inline-actions",children:[(0,C.jsxs)("button",{className:"cp-btn cp-btn-primary",onClick:t,children:[(0,C.jsx)(va,{size:18}),"View Full Plan"]}),(0,C.jsxs)("button",{className:"cp-btn cp-btn-secondary",onClick:n,children:[(0,C.jsx)(vr,{size:18}),"Order Ingredients"]})]}),(0,C.jsx)("style",{children:`
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
      `})]})}var Xl=J(on(),1);var g=J(Ce(),1),bf={breakfast:Ql,lunch:Nt,dinner:Kl,snack:Yl};function xa({plan:e,selectedRecipe:n,onClose:t,onSwapMeal:r,onRebuildWeek:l,onOrderIngredients:o,onSelectMeal:i}){let[a,s]=(0,Xl.useState)(e.days[0]?.day||"Mon"),[p,h]=(0,Xl.useState)(null),[f,m]=(0,Xl.useState)({Produce:!0,Proteins:!0,Dairy:!1,Pantry:!1,Frozen:!1}),w=e.days.find(u=>u.day===a)||e.days[0],S=u=>{h(u.meal_id),i(e.plan_id,u.meal_id)},_=u=>{m(c=>({...c,[u]:!c[u]}))},j=u=>({"high-protein":"cp-tag-green",quick:"cp-tag-orange",budget:"cp-tag-blue",healthy:"cp-tag-green",vegan:"cp-tag-emerald",vegetarian:"cp-tag-emerald","kid-friendly":"cp-tag-purple",keto:"cp-tag-amber","low-carb":"cp-tag-amber","meal-prep":"cp-tag-blue",popular:"cp-tag-pink"})[u]||"cp-tag-gray";return(0,g.jsxs)("div",{className:"cp-fullscreen",children:[(0,g.jsxs)("header",{className:"cp-fs-header",children:[(0,g.jsxs)("div",{className:"cp-fs-header-left",children:[(0,g.jsx)(hr,{size:28,className:"cp-icon-green"}),(0,g.jsxs)("div",{children:[(0,g.jsx)("h1",{className:"cp-fs-title",children:"Weekly meal plan"}),(0,g.jsxs)("p",{className:"cp-fs-subtitle",children:["Mar 16\u201322 \xB7 Family of ",e.household.size," \xB7"," ",e.constraints.diet[0]||"Balanced"," \xB7 <$",e.constraints.budget_target]})]})]}),(0,g.jsx)("button",{className:"cp-close-btn",onClick:t,children:(0,g.jsx)($l,{size:24})})]}),(0,g.jsxs)("div",{className:"cp-fs-metrics",children:[(0,g.jsxs)("div",{className:"cp-fs-metric",children:[(0,g.jsx)(Te,{size:20,className:"cp-icon-orange"}),(0,g.jsxs)("span",{className:"cp-fs-metric-value",children:["$",e.budget_summary.estimated_total.toFixed(2)]}),(0,g.jsx)("span",{className:"cp-fs-metric-label",children:"Budget"})]}),(0,g.jsxs)("div",{className:"cp-fs-metric",children:[(0,g.jsx)(Pn,{size:20,className:"cp-icon-orange"}),(0,g.jsx)("span",{className:"cp-fs-metric-value",children:e.nutrition_summary.avg_calories_per_day}),(0,g.jsx)("span",{className:"cp-fs-metric-label",children:"Avg/day"})]}),(0,g.jsxs)("div",{className:"cp-fs-metric",children:[(0,g.jsx)(In,{size:20,className:"cp-icon-green"}),(0,g.jsxs)("span",{className:"cp-fs-metric-value",children:[e.nutrition_summary.avg_protein_g,"g"]}),(0,g.jsx)("span",{className:"cp-fs-metric-label",children:"Protein"})]}),(0,g.jsxs)("div",{className:"cp-fs-metric",children:[(0,g.jsx)(Ln,{size:20,className:"cp-icon-green"}),(0,g.jsxs)("span",{className:"cp-fs-metric-value",children:[e.nutrition_summary.avg_carbs_g,"g"]}),(0,g.jsx)("span",{className:"cp-fs-metric-label",children:"Carbs"})]})]}),(0,g.jsxs)("section",{className:"cp-fs-section",children:[(0,g.jsxs)("h2",{className:"cp-fs-section-title",children:[(0,g.jsx)(Vl,{size:20}),"Weekly Calendar"]}),(0,g.jsx)("div",{className:"cp-week-tabs",children:e.days.map(u=>(0,g.jsx)("button",{className:`cp-week-tab ${a===u.day?"active":""}`,onClick:()=>s(u.day),children:u.day},u.day))}),(0,g.jsxs)("div",{className:"cp-day-meals",children:[(0,g.jsxs)("div",{className:"cp-day-header",children:[(0,g.jsx)("span",{className:"cp-day-label",children:w.day}),(0,g.jsxs)("span",{className:"cp-day-stats",children:[w.totals.calories," kcal \xB7 ",w.totals.protein_g,"g protein"]})]}),w.meals.map(u=>{let c=bf[u.type]||Nt,d=p===u.meal_id;return(0,g.jsxs)("div",{className:`cp-meal-card ${d?"selected":""}`,onClick:()=>S(u),children:[u.image_url?(0,g.jsx)("div",{className:"cp-meal-image",children:(0,g.jsx)("img",{src:u.image_url,alt:u.title})}):(0,g.jsx)("div",{className:"cp-meal-icon",children:(0,g.jsx)(c,{size:20})}),(0,g.jsxs)("div",{className:"cp-meal-content",children:[(0,g.jsx)("span",{className:"cp-meal-type",children:u.type}),(0,g.jsx)("span",{className:"cp-meal-title",children:u.title}),(0,g.jsxs)("div",{className:"cp-meal-meta",children:[(0,g.jsxs)("span",{children:[(0,g.jsx)(Kn,{size:12})," ",u.prep_minutes," min"]}),(0,g.jsxs)("span",{children:[(0,g.jsx)(Pn,{size:12})," ",u.calories," kcal"]}),(0,g.jsxs)("span",{children:[(0,g.jsx)(Te,{size:12})," $",u.estimated_cost.toFixed(2)]})]}),u.source&&u.source!=="fallback"&&(0,g.jsxs)("span",{className:"cp-meal-source",children:["via ",u.source]})]}),(0,g.jsxs)("button",{className:"cp-swap-btn",onClick:y=>{y.stopPropagation(),r(u.meal_id)},children:[(0,g.jsx)(ha,{size:16}),"Swap"]})]},u.meal_id)})]})]}),n&&(0,g.jsxs)("section",{className:"cp-fs-section cp-recipe-section",children:[(0,g.jsxs)("h2",{className:"cp-fs-section-title",children:[(0,g.jsx)(hr,{size:20}),"Selected Meal Details"]}),(0,g.jsxs)("div",{className:"cp-recipe-card",children:[(0,g.jsxs)("div",{className:"cp-recipe-header",children:[(0,g.jsx)("h3",{className:"cp-recipe-title",children:n.title}),(0,g.jsxs)("div",{className:"cp-recipe-tags",children:[n.tags.map(u=>(0,g.jsx)("span",{className:`cp-tag ${j(u)}`,children:u.replace("-"," ")},u)),n.source&&n.source!=="fallback"&&(0,g.jsxs)("span",{className:"cp-tag cp-tag-gray",children:["via ",n.source]})]})]}),(0,g.jsxs)("div",{className:"cp-recipe-stats",children:[(0,g.jsxs)("div",{className:"cp-recipe-stat",children:[(0,g.jsx)(Kn,{size:16}),(0,g.jsxs)("span",{children:["Prep ",n.prep_minutes," min"]})]}),(0,g.jsxs)("div",{className:"cp-recipe-stat",children:[(0,g.jsx)(Hl,{size:16}),(0,g.jsxs)("span",{children:["Serves ",n.servings]})]}),(0,g.jsxs)("div",{className:"cp-recipe-stat",children:[(0,g.jsx)(Te,{size:16}),(0,g.jsxs)("span",{children:["$",n.estimated_cost.toFixed(2)," total"]})]})]}),(0,g.jsxs)("div",{className:"cp-recipe-nutrition",children:[(0,g.jsxs)("span",{children:[(0,g.jsx)(In,{size:14})," Protein"," ",n.macros.protein_g,"g"]}),(0,g.jsxs)("span",{children:[(0,g.jsx)(Ln,{size:14})," Carbs ",n.macros.carbs_g,"g"]}),(0,g.jsxs)("span",{children:[(0,g.jsx)(yr,{size:14})," Fat ",n.macros.fat_g,"g"]})]}),(0,g.jsxs)("div",{className:"cp-recipe-ingredients",children:[(0,g.jsx)("h4",{children:"Ingredients"}),(0,g.jsx)("ul",{children:n.ingredients.map((u,c)=>(0,g.jsxs)("li",{children:[u.amount," ",u.name,u.notes&&(0,g.jsxs)("span",{className:"cp-ing-note",children:[" (",u.notes,")"]})]},c))})]}),(0,g.jsxs)("div",{className:"cp-recipe-steps",children:[(0,g.jsx)("h4",{children:"Steps"}),(0,g.jsx)("ol",{children:n.instructions.map((u,c)=>(0,g.jsx)("li",{children:u},c))})]}),(0,g.jsxs)("div",{className:"cp-recipe-actions",children:[(0,g.jsxs)("button",{className:"cp-btn cp-btn-outline",onClick:()=>r(n.meal_id),children:[(0,g.jsx)(ha,{size:16}),"Replace this meal"]}),(0,g.jsxs)("button",{className:"cp-btn cp-btn-outline",children:[(0,g.jsx)(yr,{size:16}),"Make faster"]}),(0,g.jsxs)("button",{className:"cp-btn cp-btn-outline",children:[(0,g.jsx)(Te,{size:16}),"Make cheaper"]})]})]})]}),(0,g.jsxs)("section",{className:"cp-fs-section",children:[(0,g.jsxs)("h2",{className:"cp-fs-section-title",children:[(0,g.jsx)(vr,{size:20}),"Shopping List"]}),(0,g.jsx)("div",{className:"cp-shopping-list",children:e.shopping_list.map(u=>(0,g.jsxs)("div",{className:"cp-shop-section",children:[(0,g.jsxs)("button",{className:"cp-shop-header",onClick:()=>_(u.section),children:[(0,g.jsx)("span",{children:u.section}),(0,g.jsxs)("span",{className:"cp-shop-count",children:[u.items.length," items"]}),f[u.section]?(0,g.jsx)(pp,{size:18}):(0,g.jsx)(cp,{size:18})]}),f[u.section]&&(0,g.jsx)("div",{className:"cp-shop-items",children:u.items.map((c,d)=>(0,g.jsxs)("div",{className:"cp-shop-item",children:[(0,g.jsx)("span",{className:"cp-shop-item-name",children:c.name}),(0,g.jsxs)("span",{className:"cp-shop-item-qty",children:[c.quantity," ",c.unit]}),c.estimated_cost&&(0,g.jsxs)("span",{className:"cp-shop-item-cost",children:["$",c.estimated_cost.toFixed(2)]})]},d))})]},u.section))})]}),(0,g.jsxs)("div",{className:"cp-fs-actions",children:[(0,g.jsxs)("button",{className:"cp-btn cp-btn-outline",onClick:l,children:[(0,g.jsx)(ap,{size:18}),"Rebuild week"]}),(0,g.jsxs)("button",{className:"cp-btn cp-btn-primary",onClick:()=>o("instacart"),children:[(0,g.jsx)(vr,{size:18}),"Order with Instacart",(0,g.jsx)(gp,{size:14})]})]}),(0,g.jsx)("style",{children:`
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
      `})]})}var Gl=J(on(),1),L=J(Ce(),1);function wa({currentMeal:e,candidates:n,onReplace:t,onClose:r}){let[l,o]=(0,Gl.useState)(null),i=(0,Gl.useRef)(null),a=f=>{i.current&&i.current.scrollBy({left:f==="left"?-280:280,behavior:"smooth"})},s=f=>({"high-protein":In,quick:yr,budget:Te,healthy:up,vegan:Ln,vegetarian:Ln})[f]||mp,p=f=>{let m=["high-protein","quick","budget","healthy","vegan","vegetarian"];for(let w of m)if(f.includes(w))return w;return f[0]||null},h=f=>({"high-protein":"cp-badge-green",quick:"cp-badge-orange",budget:"cp-badge-blue",healthy:"cp-badge-emerald",vegan:"cp-badge-emerald",vegetarian:"cp-badge-emerald","kid-friendly":"cp-badge-purple"})[f]||"cp-badge-gray";return(0,L.jsxs)("div",{className:"cp-swap-widget",children:[(0,L.jsxs)("div",{className:"cp-swap-header",children:[(0,L.jsxs)("div",{className:"cp-swap-title-area",children:[(0,L.jsxs)("h2",{className:"cp-swap-title",children:["Replace ",e.type]}),(0,L.jsxs)("p",{className:"cp-swap-current",children:["Current: ",(0,L.jsx)("strong",{children:e.title})]})]}),(0,L.jsx)("button",{className:"cp-swap-close",onClick:r,children:(0,L.jsx)($l,{size:20})})]}),(0,L.jsxs)("div",{className:"cp-swap-nav",children:[(0,L.jsx)("button",{className:"cp-nav-btn",onClick:()=>a("left"),children:(0,L.jsx)(dp,{size:20})}),(0,L.jsxs)("span",{className:"cp-nav-count",children:[n.length," alternatives"]}),(0,L.jsx)("button",{className:"cp-nav-btn",onClick:()=>a("right"),children:(0,L.jsx)(fp,{size:20})})]}),(0,L.jsx)("div",{className:"cp-swap-carousel",ref:i,children:n.map((f,m)=>{let w=p(f.tags),S=w?s(w):null,_=l===f.meal_id;return(0,L.jsxs)("div",{className:`cp-swap-card ${_?"selected":""}`,onClick:()=>o(f.meal_id),children:[(0,L.jsxs)("div",{className:"cp-match-score",children:[Math.round(f.match_score*100),"% match"]}),(0,L.jsx)("h3",{className:"cp-card-title",children:f.title}),(0,L.jsxs)("div",{className:"cp-card-stats",children:[(0,L.jsxs)("span",{className:"cp-card-stat",children:[(0,L.jsx)(Kn,{size:14}),f.prep_minutes," min"]}),(0,L.jsxs)("span",{className:"cp-card-stat",children:[(0,L.jsx)(Pn,{size:14}),f.calories," kcal"]}),(0,L.jsxs)("span",{className:"cp-card-stat",children:[(0,L.jsx)(Te,{size:14}),"$",f.estimated_cost.toFixed(2)]})]}),(0,L.jsx)("div",{className:"cp-card-macros",children:(0,L.jsxs)("span",{children:[(0,L.jsx)(In,{size:12})," ",f.macros.protein_g,"g protein"]})}),w&&S&&(0,L.jsxs)("div",{className:`cp-card-badge ${h(w)}`,children:[(0,L.jsx)(S,{size:14}),w.replace("-"," ")]}),(0,L.jsx)("button",{className:`cp-replace-btn ${_?"active":""}`,onClick:j=>{j.stopPropagation(),t(f.meal_id)},children:_?(0,L.jsxs)(L.Fragment,{children:[(0,L.jsx)(sp,{size:16}),"Confirm"]}):"Replace"})]},f.meal_id)})}),(0,L.jsx)("style",{children:`
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
      `})]})}var B=J(Ce(),1);function ka(){let[e,n]=(0,b.useState)("inline"),[t,r]=(0,b.useState)(null),[l,o]=(0,b.useState)(null),[i,a]=(0,b.useState)(null),[s,p]=(0,b.useState)(!1),[h,f]=(0,b.useState)(null),[m,w]=(0,b.useState)(!1);(0,b.useEffect)(()=>{let k=I=>{if(!I||typeof I!="object")return null;let R=I;if(R.plan_id&&R.days)return R;if(R.plan&&typeof R.plan=="object"){let ln=R.plan;if(ln.plan_id&&ln.days)return ln}return R.structuredContent&&typeof R.structuredContent=="object"?k(R.structuredContent):R.content&&typeof R.content=="object"?k(R.content):R.payload&&typeof R.payload=="object"?k(R.payload):R.result&&typeof R.result=="object"?k(R.result):R.data&&typeof R.data=="object"?k(R.data):null},N=window.__chefplan_init;if(N?.plan){r(N.plan);return}if(N){let I=k(N);if(I){r(I);return}}let z=I=>{let R=I.data,ln=k(R);ln&&r(ln)};window.addEventListener("message",z),window.parent!==window&&window.parent.postMessage({type:"mcp:ready",app:"chefplan"},"*");let A=setTimeout(()=>{w(!0)},8e3);return()=>{window.removeEventListener("message",z),clearTimeout(A)}},[]);let S=(0,b.useCallback)(async(k,N)=>{if(!window.openai?.callTool)return f("OpenAI bridge not available"),null;try{p(!0);let z=await window.openai.callTool(k,N);return z.structuredContent??z}catch(z){return f(z instanceof Error?z.message:"Tool call failed"),null}finally{p(!1)}},[]),_=(0,b.useCallback)(()=>{n("fullscreen")},[]),j=(0,b.useCallback)(async(k="instacart")=>{if(!t)return;let N=await S("create_order_link",{plan_id:t.plan_id,provider:k});N?.deeplink&&window.open(N.deeplink,"_blank")},[t,S]),u=(0,b.useCallback)(async k=>{if(!t)return;let N=await S("swap_meal",{plan_id:t.plan_id,meal_id:k});if(N?.candidates){let z=t.days.flatMap(A=>A.meals).find(A=>A.meal_id===k);z&&(a({meal:z,candidates:N.candidates}),n("swap"))}},[t,S]),c=(0,b.useCallback)(async k=>{if(!t||!i)return;let N=await S("swap_meal",{plan_id:t.plan_id,meal_id:i.meal.meal_id,replace_with:k});N?.updated_plan&&r(N.updated_plan),window.openai?.updateModelContext&&window.openai.updateModelContext({action:"meal_replaced",original:i.meal.title,replacement:i.candidates.find(z=>z.meal_id===k)?.title}),a(null),n("fullscreen")},[t,i,S]),d=(0,b.useCallback)(async()=>{if(!t)return;let k=await S("generate_weekly_plan",{household_size:t.household.size,dietary_preferences:t.constraints.diet,budget_target:t.constraints.budget_target,max_prep_minutes:t.constraints.max_prep_minutes});k?.plan&&r(k.plan)},[t,S]),y=(0,b.useCallback)(async(k,N)=>{let z=await S("get_recipe_details",{plan_id:k,meal_id:N});z?.recipe&&o(z.recipe)},[S]),P=(0,b.useCallback)(()=>{e==="swap"?(a(null),n("fullscreen")):(n("inline"),o(null))},[e]);return t?h?(0,B.jsxs)("div",{className:"cp-error",children:[(0,B.jsxs)("p",{children:["Error: ",h]}),(0,B.jsx)("button",{onClick:()=>{f(null)},children:"Dismiss"}),(0,B.jsx)("style",{children:`
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
        `})]}):(0,B.jsxs)(B.Fragment,{children:[s&&(0,B.jsx)("div",{className:"cp-overlay",children:(0,B.jsx)("div",{className:"cp-spinner"})}),e==="inline"&&(0,B.jsx)(ya,{plan:t,onOrderIngredients:()=>{j()},onOpenFullPlan:_}),e==="fullscreen"&&(0,B.jsx)(xa,{plan:t,selectedRecipe:l,onClose:P,onSwapMeal:k=>{u(k)},onRebuildWeek:()=>{d()},onOrderIngredients:k=>{j(k)},onSelectMeal:(k,N)=>{y(k,N)}}),e==="swap"&&i&&(0,B.jsx)(wa,{currentMeal:i.meal,candidates:i.candidates,onReplace:k=>{c(k)},onClose:P}),(0,B.jsx)("style",{children:`
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
      `})]}):(0,B.jsxs)("div",{className:"cp-loading",children:[m?(0,B.jsxs)(B.Fragment,{children:[(0,B.jsx)("p",{className:"cp-timeout-title",children:"Unable to load meal plan"}),(0,B.jsx)("p",{className:"cp-timeout-hint",children:"The widget did not receive plan data from the host application. Please try refreshing or generating a new meal plan."})]}):(0,B.jsxs)(B.Fragment,{children:[(0,B.jsx)("div",{className:"cp-spinner"}),(0,B.jsx)("p",{children:"Loading meal plan..."})]}),(0,B.jsx)("style",{children:`
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
        `})]})}var Sa=J(Ce(),1);function vp(){let e=document.getElementById("chefplan-widget-root");e?xp.default.createRoot(e).render((0,Sa.jsx)(yp.default.StrictMode,{children:(0,Sa.jsx)(ka,{})})):console.error("ChefPlan widget root element not found")}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",vp):vp();
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
