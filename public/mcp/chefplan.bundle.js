var Np=Object.create;var Ea=Object.defineProperty;var Cp=Object.getOwnPropertyDescriptor;var _p=Object.getOwnPropertyNames;var Ep=Object.getPrototypeOf,Pp=Object.prototype.hasOwnProperty;var Ge=(e,n)=>()=>(n||e((n={exports:{}}).exports,n),n.exports);var zp=(e,n,t,r)=>{if(n&&typeof n=="object"||typeof n=="function")for(let l of _p(n))!Pp.call(e,l)&&l!==t&&Ea(e,l,{get:()=>n[l],enumerable:!(r=Cp(n,l))||r.enumerable});return e};var q=(e,n,t)=>(t=e!=null?Np(Ep(e)):{},zp(n||!e||!e.__esModule?Ea(t,"default",{value:e,enumerable:!0}):t,e));var Ua=Ge(L=>{"use strict";var Et=Symbol.for("react.element"),Ip=Symbol.for("react.portal"),Lp=Symbol.for("react.fragment"),Mp=Symbol.for("react.strict_mode"),Tp=Symbol.for("react.profiler"),Rp=Symbol.for("react.provider"),Op=Symbol.for("react.context"),Dp=Symbol.for("react.forward_ref"),jp=Symbol.for("react.suspense"),Fp=Symbol.for("react.memo"),Up=Symbol.for("react.lazy"),Pa=Symbol.iterator;function Wp(e){return e===null||typeof e!="object"?null:(e=Pa&&e[Pa]||e["@@iterator"],typeof e=="function"?e:null)}var La={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},Ma=Object.assign,Ta={};function Gn(e,n,t){this.props=e,this.context=n,this.refs=Ta,this.updater=t||La}Gn.prototype.isReactComponent={};Gn.prototype.setState=function(e,n){if(typeof e!="object"&&typeof e!="function"&&e!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,n,"setState")};Gn.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")};function Ra(){}Ra.prototype=Gn.prototype;function eo(e,n,t){this.props=e,this.context=n,this.refs=Ta,this.updater=t||La}var no=eo.prototype=new Ra;no.constructor=eo;Ma(no,Gn.prototype);no.isPureReactComponent=!0;var za=Array.isArray,Oa=Object.prototype.hasOwnProperty,to={current:null},Da={key:!0,ref:!0,__self:!0,__source:!0};function ja(e,n,t){var r,l={},o=null,i=null;if(n!=null)for(r in n.ref!==void 0&&(i=n.ref),n.key!==void 0&&(o=""+n.key),n)Oa.call(n,r)&&!Da.hasOwnProperty(r)&&(l[r]=n[r]);var a=arguments.length-2;if(a===1)l.children=t;else if(1<a){for(var s=Array(a),p=0;p<a;p++)s[p]=arguments[p+2];l.children=s}if(e&&e.defaultProps)for(r in a=e.defaultProps,a)l[r]===void 0&&(l[r]=a[r]);return{$$typeof:Et,type:e,key:o,ref:i,props:l,_owner:to.current}}function Bp(e,n){return{$$typeof:Et,type:e.type,key:n,ref:e.ref,props:e.props,_owner:e._owner}}function ro(e){return typeof e=="object"&&e!==null&&e.$$typeof===Et}function Ap(e){var n={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(t){return n[t]})}var Ia=/\/+/g;function ql(e,n){return typeof e=="object"&&e!==null&&e.key!=null?Ap(""+e.key):n.toString(36)}function Sr(e,n,t,r,l){var o=typeof e;(o==="undefined"||o==="boolean")&&(e=null);var i=!1;if(e===null)i=!0;else switch(o){case"string":case"number":i=!0;break;case"object":switch(e.$$typeof){case Et:case Ip:i=!0}}if(i)return i=e,l=l(i),e=r===""?"."+ql(i,0):r,za(l)?(t="",e!=null&&(t=e.replace(Ia,"$&/")+"/"),Sr(l,n,t,"",function(p){return p})):l!=null&&(ro(l)&&(l=Bp(l,t+(!l.key||i&&i.key===l.key?"":(""+l.key).replace(Ia,"$&/")+"/")+e)),n.push(l)),1;if(i=0,r=r===""?".":r+":",za(e))for(var a=0;a<e.length;a++){o=e[a];var s=r+ql(o,a);i+=Sr(o,n,t,s,l)}else if(s=Wp(e),typeof s=="function")for(e=s.call(e),a=0;!(o=e.next()).done;)o=o.value,s=r+ql(o,a++),i+=Sr(o,n,t,s,l);else if(o==="object")throw n=String(e),Error("Objects are not valid as a React child (found: "+(n==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":n)+"). If you meant to render a collection of children, use an array instead.");return i}function kr(e,n,t){if(e==null)return e;var r=[],l=0;return Sr(e,r,"","",function(o){return n.call(t,o,l++)}),r}function Vp(e){if(e._status===-1){var n=e._result;n=n(),n.then(function(t){(e._status===0||e._status===-1)&&(e._status=1,e._result=t)},function(t){(e._status===0||e._status===-1)&&(e._status=2,e._result=t)}),e._status===-1&&(e._status=0,e._result=n)}if(e._status===1)return e._result.default;throw e._result}var ce={current:null},Nr={transition:null},Hp={ReactCurrentDispatcher:ce,ReactCurrentBatchConfig:Nr,ReactCurrentOwner:to};function Fa(){throw Error("act(...) is not supported in production builds of React.")}L.Children={map:kr,forEach:function(e,n,t){kr(e,function(){n.apply(this,arguments)},t)},count:function(e){var n=0;return kr(e,function(){n++}),n},toArray:function(e){return kr(e,function(n){return n})||[]},only:function(e){if(!ro(e))throw Error("React.Children.only expected to receive a single React element child.");return e}};L.Component=Gn;L.Fragment=Lp;L.Profiler=Tp;L.PureComponent=eo;L.StrictMode=Mp;L.Suspense=jp;L.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=Hp;L.act=Fa;L.cloneElement=function(e,n,t){if(e==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+e+".");var r=Ma({},e.props),l=e.key,o=e.ref,i=e._owner;if(n!=null){if(n.ref!==void 0&&(o=n.ref,i=to.current),n.key!==void 0&&(l=""+n.key),e.type&&e.type.defaultProps)var a=e.type.defaultProps;for(s in n)Oa.call(n,s)&&!Da.hasOwnProperty(s)&&(r[s]=n[s]===void 0&&a!==void 0?a[s]:n[s])}var s=arguments.length-2;if(s===1)r.children=t;else if(1<s){a=Array(s);for(var p=0;p<s;p++)a[p]=arguments[p+2];r.children=a}return{$$typeof:Et,type:e.type,key:l,ref:o,props:r,_owner:i}};L.createContext=function(e){return e={$$typeof:Op,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},e.Provider={$$typeof:Rp,_context:e},e.Consumer=e};L.createElement=ja;L.createFactory=function(e){var n=ja.bind(null,e);return n.type=e,n};L.createRef=function(){return{current:null}};L.forwardRef=function(e){return{$$typeof:Dp,render:e}};L.isValidElement=ro;L.lazy=function(e){return{$$typeof:Up,_payload:{_status:-1,_result:e},_init:Vp}};L.memo=function(e,n){return{$$typeof:Fp,type:e,compare:n===void 0?null:n}};L.startTransition=function(e){var n=Nr.transition;Nr.transition={};try{e()}finally{Nr.transition=n}};L.unstable_act=Fa;L.useCallback=function(e,n){return ce.current.useCallback(e,n)};L.useContext=function(e){return ce.current.useContext(e)};L.useDebugValue=function(){};L.useDeferredValue=function(e){return ce.current.useDeferredValue(e)};L.useEffect=function(e,n){return ce.current.useEffect(e,n)};L.useId=function(){return ce.current.useId()};L.useImperativeHandle=function(e,n,t){return ce.current.useImperativeHandle(e,n,t)};L.useInsertionEffect=function(e,n){return ce.current.useInsertionEffect(e,n)};L.useLayoutEffect=function(e,n){return ce.current.useLayoutEffect(e,n)};L.useMemo=function(e,n){return ce.current.useMemo(e,n)};L.useReducer=function(e,n,t){return ce.current.useReducer(e,n,t)};L.useRef=function(e){return ce.current.useRef(e)};L.useState=function(e){return ce.current.useState(e)};L.useSyncExternalStore=function(e,n,t){return ce.current.useSyncExternalStore(e,n,t)};L.useTransition=function(){return ce.current.useTransition()};L.version="18.3.1"});var an=Ge((r0,Wa)=>{"use strict";Wa.exports=Ua()});var Ga=Ge(F=>{"use strict";function ao(e,n){var t=e.length;e.push(n);e:for(;0<t;){var r=t-1>>>1,l=e[r];if(0<Cr(l,n))e[r]=n,e[t]=l,t=r;else break e}}function De(e){return e.length===0?null:e[0]}function Er(e){if(e.length===0)return null;var n=e[0],t=e.pop();if(t!==n){e[0]=t;e:for(var r=0,l=e.length,o=l>>>1;r<o;){var i=2*(r+1)-1,a=e[i],s=i+1,p=e[s];if(0>Cr(a,t))s<l&&0>Cr(p,a)?(e[r]=p,e[s]=t,r=s):(e[r]=a,e[i]=t,r=i);else if(s<l&&0>Cr(p,t))e[r]=p,e[s]=t,r=s;else break e}}return n}function Cr(e,n){var t=e.sortIndex-n.sortIndex;return t!==0?t:e.id-n.id}typeof performance=="object"&&typeof performance.now=="function"?(Ba=performance,F.unstable_now=function(){return Ba.now()}):(lo=Date,Aa=lo.now(),F.unstable_now=function(){return lo.now()-Aa});var Ba,lo,Aa,He=[],sn=[],$p=1,Ee=null,oe=3,Pr=!1,Tn=!1,zt=!1,$a=typeof setTimeout=="function"?setTimeout:null,Qa=typeof clearTimeout=="function"?clearTimeout:null,Va=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function so(e){for(var n=De(sn);n!==null;){if(n.callback===null)Er(sn);else if(n.startTime<=e)Er(sn),n.sortIndex=n.expirationTime,ao(He,n);else break;n=De(sn)}}function uo(e){if(zt=!1,so(e),!Tn)if(De(He)!==null)Tn=!0,po(co);else{var n=De(sn);n!==null&&fo(uo,n.startTime-e)}}function co(e,n){Tn=!1,zt&&(zt=!1,Qa(It),It=-1),Pr=!0;var t=oe;try{for(so(n),Ee=De(He);Ee!==null&&(!(Ee.expirationTime>n)||e&&!Xa());){var r=Ee.callback;if(typeof r=="function"){Ee.callback=null,oe=Ee.priorityLevel;var l=r(Ee.expirationTime<=n);n=F.unstable_now(),typeof l=="function"?Ee.callback=l:Ee===De(He)&&Er(He),so(n)}else Er(He);Ee=De(He)}if(Ee!==null)var o=!0;else{var i=De(sn);i!==null&&fo(uo,i.startTime-n),o=!1}return o}finally{Ee=null,oe=t,Pr=!1}}var zr=!1,_r=null,It=-1,Ka=5,Ya=-1;function Xa(){return!(F.unstable_now()-Ya<Ka)}function oo(){if(_r!==null){var e=F.unstable_now();Ya=e;var n=!0;try{n=_r(!0,e)}finally{n?Pt():(zr=!1,_r=null)}}else zr=!1}var Pt;typeof Va=="function"?Pt=function(){Va(oo)}:typeof MessageChannel<"u"?(io=new MessageChannel,Ha=io.port2,io.port1.onmessage=oo,Pt=function(){Ha.postMessage(null)}):Pt=function(){$a(oo,0)};var io,Ha;function po(e){_r=e,zr||(zr=!0,Pt())}function fo(e,n){It=$a(function(){e(F.unstable_now())},n)}F.unstable_IdlePriority=5;F.unstable_ImmediatePriority=1;F.unstable_LowPriority=4;F.unstable_NormalPriority=3;F.unstable_Profiling=null;F.unstable_UserBlockingPriority=2;F.unstable_cancelCallback=function(e){e.callback=null};F.unstable_continueExecution=function(){Tn||Pr||(Tn=!0,po(co))};F.unstable_forceFrameRate=function(e){0>e||125<e?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):Ka=0<e?Math.floor(1e3/e):5};F.unstable_getCurrentPriorityLevel=function(){return oe};F.unstable_getFirstCallbackNode=function(){return De(He)};F.unstable_next=function(e){switch(oe){case 1:case 2:case 3:var n=3;break;default:n=oe}var t=oe;oe=n;try{return e()}finally{oe=t}};F.unstable_pauseExecution=function(){};F.unstable_requestPaint=function(){};F.unstable_runWithPriority=function(e,n){switch(e){case 1:case 2:case 3:case 4:case 5:break;default:e=3}var t=oe;oe=e;try{return n()}finally{oe=t}};F.unstable_scheduleCallback=function(e,n,t){var r=F.unstable_now();switch(typeof t=="object"&&t!==null?(t=t.delay,t=typeof t=="number"&&0<t?r+t:r):t=r,e){case 1:var l=-1;break;case 2:l=250;break;case 5:l=1073741823;break;case 4:l=1e4;break;default:l=5e3}return l=t+l,e={id:$p++,callback:n,priorityLevel:e,startTime:t,expirationTime:l,sortIndex:-1},t>r?(e.sortIndex=t,ao(sn,e),De(He)===null&&e===De(sn)&&(zt?(Qa(It),It=-1):zt=!0,fo(uo,t-r))):(e.sortIndex=l,ao(He,e),Tn||Pr||(Tn=!0,po(co))),e};F.unstable_shouldYield=Xa;F.unstable_wrapCallback=function(e){var n=oe;return function(){var t=oe;oe=n;try{return e.apply(this,arguments)}finally{oe=t}}}});var ba=Ge((o0,Za)=>{"use strict";Za.exports=Ga()});var np=Ge(Ce=>{"use strict";var Qp=an(),Se=ba();function x(e){for(var n="https://reactjs.org/docs/error-decoder.html?invariant="+e,t=1;t<arguments.length;t++)n+="&args[]="+encodeURIComponent(arguments[t]);return"Minified React error #"+e+"; visit "+n+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var lu=new Set,bt={};function Qn(e,n){ht(e,n),ht(e+"Capture",n)}function ht(e,n){for(bt[e]=n,e=0;e<n.length;e++)lu.add(n[e])}var nn=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),jo=Object.prototype.hasOwnProperty,Kp=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,Ja={},qa={};function Yp(e){return jo.call(qa,e)?!0:jo.call(Ja,e)?!1:Kp.test(e)?qa[e]=!0:(Ja[e]=!0,!1)}function Xp(e,n,t,r){if(t!==null&&t.type===0)return!1;switch(typeof n){case"function":case"symbol":return!0;case"boolean":return r?!1:t!==null?!t.acceptsBooleans:(e=e.toLowerCase().slice(0,5),e!=="data-"&&e!=="aria-");default:return!1}}function Gp(e,n,t,r){if(n===null||typeof n>"u"||Xp(e,n,t,r))return!0;if(r)return!1;if(t!==null)switch(t.type){case 3:return!n;case 4:return n===!1;case 5:return isNaN(n);case 6:return isNaN(n)||1>n}return!1}function fe(e,n,t,r,l,o,i){this.acceptsBooleans=n===2||n===3||n===4,this.attributeName=r,this.attributeNamespace=l,this.mustUseProperty=t,this.propertyName=e,this.type=n,this.sanitizeURL=o,this.removeEmptyString=i}var le={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e){le[e]=new fe(e,0,!1,e,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(e){var n=e[0];le[n]=new fe(n,1,!1,e[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(e){le[e]=new fe(e,2,!1,e.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(e){le[e]=new fe(e,2,!1,e,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e){le[e]=new fe(e,3,!1,e.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(e){le[e]=new fe(e,3,!0,e,null,!1,!1)});["capture","download"].forEach(function(e){le[e]=new fe(e,4,!1,e,null,!1,!1)});["cols","rows","size","span"].forEach(function(e){le[e]=new fe(e,6,!1,e,null,!1,!1)});["rowSpan","start"].forEach(function(e){le[e]=new fe(e,5,!1,e.toLowerCase(),null,!1,!1)});var zi=/[\-:]([a-z])/g;function Ii(e){return e[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e){var n=e.replace(zi,Ii);le[n]=new fe(n,1,!1,e,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e){var n=e.replace(zi,Ii);le[n]=new fe(n,1,!1,e,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(e){var n=e.replace(zi,Ii);le[n]=new fe(n,1,!1,e,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(e){le[e]=new fe(e,1,!1,e.toLowerCase(),null,!1,!1)});le.xlinkHref=new fe("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(e){le[e]=new fe(e,1,!1,e.toLowerCase(),null,!0,!0)});function Li(e,n,t,r){var l=le.hasOwnProperty(n)?le[n]:null;(l!==null?l.type!==0:r||!(2<n.length)||n[0]!=="o"&&n[0]!=="O"||n[1]!=="n"&&n[1]!=="N")&&(Gp(n,t,l,r)&&(t=null),r||l===null?Yp(n)&&(t===null?e.removeAttribute(n):e.setAttribute(n,""+t)):l.mustUseProperty?e[l.propertyName]=t===null?l.type===3?!1:"":t:(n=l.attributeName,r=l.attributeNamespace,t===null?e.removeAttribute(n):(l=l.type,t=l===3||l===4&&t===!0?"":""+t,r?e.setAttributeNS(r,n,t):e.setAttribute(n,t))))}var on=Qp.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,Ir=Symbol.for("react.element"),Jn=Symbol.for("react.portal"),qn=Symbol.for("react.fragment"),Mi=Symbol.for("react.strict_mode"),Fo=Symbol.for("react.profiler"),ou=Symbol.for("react.provider"),iu=Symbol.for("react.context"),Ti=Symbol.for("react.forward_ref"),Uo=Symbol.for("react.suspense"),Wo=Symbol.for("react.suspense_list"),Ri=Symbol.for("react.memo"),cn=Symbol.for("react.lazy"),au=Symbol.for("react.offscreen"),es=Symbol.iterator;function Lt(e){return e===null||typeof e!="object"?null:(e=es&&e[es]||e["@@iterator"],typeof e=="function"?e:null)}var Q=Object.assign,mo;function Ut(e){if(mo===void 0)try{throw Error()}catch(t){var n=t.stack.trim().match(/\n( *(at )?)/);mo=n&&n[1]||""}return`
`+mo+e}var go=!1;function ho(e,n){if(!e||go)return"";go=!0;var t=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(n)if(n=function(){throw Error()},Object.defineProperty(n.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(n,[])}catch(p){var r=p}Reflect.construct(e,[],n)}else{try{n.call()}catch(p){r=p}e.call(n.prototype)}else{try{throw Error()}catch(p){r=p}e()}}catch(p){if(p&&r&&typeof p.stack=="string"){for(var l=p.stack.split(`
`),o=r.stack.split(`
`),i=l.length-1,a=o.length-1;1<=i&&0<=a&&l[i]!==o[a];)a--;for(;1<=i&&0<=a;i--,a--)if(l[i]!==o[a]){if(i!==1||a!==1)do if(i--,a--,0>a||l[i]!==o[a]){var s=`
`+l[i].replace(" at new "," at ");return e.displayName&&s.includes("<anonymous>")&&(s=s.replace("<anonymous>",e.displayName)),s}while(1<=i&&0<=a);break}}}finally{go=!1,Error.prepareStackTrace=t}return(e=e?e.displayName||e.name:"")?Ut(e):""}function Zp(e){switch(e.tag){case 5:return Ut(e.type);case 16:return Ut("Lazy");case 13:return Ut("Suspense");case 19:return Ut("SuspenseList");case 0:case 2:case 15:return e=ho(e.type,!1),e;case 11:return e=ho(e.type.render,!1),e;case 1:return e=ho(e.type,!0),e;default:return""}}function Bo(e){if(e==null)return null;if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case qn:return"Fragment";case Jn:return"Portal";case Fo:return"Profiler";case Mi:return"StrictMode";case Uo:return"Suspense";case Wo:return"SuspenseList"}if(typeof e=="object")switch(e.$$typeof){case iu:return(e.displayName||"Context")+".Consumer";case ou:return(e._context.displayName||"Context")+".Provider";case Ti:var n=e.render;return e=e.displayName,e||(e=n.displayName||n.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case Ri:return n=e.displayName||null,n!==null?n:Bo(e.type)||"Memo";case cn:n=e._payload,e=e._init;try{return Bo(e(n))}catch{}}return null}function bp(e){var n=e.type;switch(e.tag){case 24:return"Cache";case 9:return(n.displayName||"Context")+".Consumer";case 10:return(n._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return e=n.render,e=e.displayName||e.name||"",n.displayName||(e!==""?"ForwardRef("+e+")":"ForwardRef");case 7:return"Fragment";case 5:return n;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return Bo(n);case 8:return n===Mi?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof n=="function")return n.displayName||n.name||null;if(typeof n=="string")return n}return null}function Cn(e){switch(typeof e){case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function su(e){var n=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(n==="checkbox"||n==="radio")}function Jp(e){var n=su(e)?"checked":"value",t=Object.getOwnPropertyDescriptor(e.constructor.prototype,n),r=""+e[n];if(!e.hasOwnProperty(n)&&typeof t<"u"&&typeof t.get=="function"&&typeof t.set=="function"){var l=t.get,o=t.set;return Object.defineProperty(e,n,{configurable:!0,get:function(){return l.call(this)},set:function(i){r=""+i,o.call(this,i)}}),Object.defineProperty(e,n,{enumerable:t.enumerable}),{getValue:function(){return r},setValue:function(i){r=""+i},stopTracking:function(){e._valueTracker=null,delete e[n]}}}}function Lr(e){e._valueTracker||(e._valueTracker=Jp(e))}function uu(e){if(!e)return!1;var n=e._valueTracker;if(!n)return!0;var t=n.getValue(),r="";return e&&(r=su(e)?e.checked?"true":"false":e.value),e=r,e!==t?(n.setValue(e),!0):!1}function ll(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}function Ao(e,n){var t=n.checked;return Q({},n,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:t??e._wrapperState.initialChecked})}function ns(e,n){var t=n.defaultValue==null?"":n.defaultValue,r=n.checked!=null?n.checked:n.defaultChecked;t=Cn(n.value!=null?n.value:t),e._wrapperState={initialChecked:r,initialValue:t,controlled:n.type==="checkbox"||n.type==="radio"?n.checked!=null:n.value!=null}}function cu(e,n){n=n.checked,n!=null&&Li(e,"checked",n,!1)}function Vo(e,n){cu(e,n);var t=Cn(n.value),r=n.type;if(t!=null)r==="number"?(t===0&&e.value===""||e.value!=t)&&(e.value=""+t):e.value!==""+t&&(e.value=""+t);else if(r==="submit"||r==="reset"){e.removeAttribute("value");return}n.hasOwnProperty("value")?Ho(e,n.type,t):n.hasOwnProperty("defaultValue")&&Ho(e,n.type,Cn(n.defaultValue)),n.checked==null&&n.defaultChecked!=null&&(e.defaultChecked=!!n.defaultChecked)}function ts(e,n,t){if(n.hasOwnProperty("value")||n.hasOwnProperty("defaultValue")){var r=n.type;if(!(r!=="submit"&&r!=="reset"||n.value!==void 0&&n.value!==null))return;n=""+e._wrapperState.initialValue,t||n===e.value||(e.value=n),e.defaultValue=n}t=e.name,t!==""&&(e.name=""),e.defaultChecked=!!e._wrapperState.initialChecked,t!==""&&(e.name=t)}function Ho(e,n,t){(n!=="number"||ll(e.ownerDocument)!==e)&&(t==null?e.defaultValue=""+e._wrapperState.initialValue:e.defaultValue!==""+t&&(e.defaultValue=""+t))}var Wt=Array.isArray;function ct(e,n,t,r){if(e=e.options,n){n={};for(var l=0;l<t.length;l++)n["$"+t[l]]=!0;for(t=0;t<e.length;t++)l=n.hasOwnProperty("$"+e[t].value),e[t].selected!==l&&(e[t].selected=l),l&&r&&(e[t].defaultSelected=!0)}else{for(t=""+Cn(t),n=null,l=0;l<e.length;l++){if(e[l].value===t){e[l].selected=!0,r&&(e[l].defaultSelected=!0);return}n!==null||e[l].disabled||(n=e[l])}n!==null&&(n.selected=!0)}}function $o(e,n){if(n.dangerouslySetInnerHTML!=null)throw Error(x(91));return Q({},n,{value:void 0,defaultValue:void 0,children:""+e._wrapperState.initialValue})}function rs(e,n){var t=n.value;if(t==null){if(t=n.children,n=n.defaultValue,t!=null){if(n!=null)throw Error(x(92));if(Wt(t)){if(1<t.length)throw Error(x(93));t=t[0]}n=t}n==null&&(n=""),t=n}e._wrapperState={initialValue:Cn(t)}}function pu(e,n){var t=Cn(n.value),r=Cn(n.defaultValue);t!=null&&(t=""+t,t!==e.value&&(e.value=t),n.defaultValue==null&&e.defaultValue!==t&&(e.defaultValue=t)),r!=null&&(e.defaultValue=""+r)}function ls(e){var n=e.textContent;n===e._wrapperState.initialValue&&n!==""&&n!==null&&(e.value=n)}function du(e){switch(e){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function Qo(e,n){return e==null||e==="http://www.w3.org/1999/xhtml"?du(n):e==="http://www.w3.org/2000/svg"&&n==="foreignObject"?"http://www.w3.org/1999/xhtml":e}var Mr,fu=(function(e){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(n,t,r,l){MSApp.execUnsafeLocalFunction(function(){return e(n,t,r,l)})}:e})(function(e,n){if(e.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in e)e.innerHTML=n;else{for(Mr=Mr||document.createElement("div"),Mr.innerHTML="<svg>"+n.valueOf().toString()+"</svg>",n=Mr.firstChild;e.firstChild;)e.removeChild(e.firstChild);for(;n.firstChild;)e.appendChild(n.firstChild)}});function Jt(e,n){if(n){var t=e.firstChild;if(t&&t===e.lastChild&&t.nodeType===3){t.nodeValue=n;return}}e.textContent=n}var Vt={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},qp=["Webkit","ms","Moz","O"];Object.keys(Vt).forEach(function(e){qp.forEach(function(n){n=n+e.charAt(0).toUpperCase()+e.substring(1),Vt[n]=Vt[e]})});function mu(e,n,t){return n==null||typeof n=="boolean"||n===""?"":t||typeof n!="number"||n===0||Vt.hasOwnProperty(e)&&Vt[e]?(""+n).trim():n+"px"}function gu(e,n){e=e.style;for(var t in n)if(n.hasOwnProperty(t)){var r=t.indexOf("--")===0,l=mu(t,n[t],r);t==="float"&&(t="cssFloat"),r?e.setProperty(t,l):e[t]=l}}var ed=Q({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function Ko(e,n){if(n){if(ed[e]&&(n.children!=null||n.dangerouslySetInnerHTML!=null))throw Error(x(137,e));if(n.dangerouslySetInnerHTML!=null){if(n.children!=null)throw Error(x(60));if(typeof n.dangerouslySetInnerHTML!="object"||!("__html"in n.dangerouslySetInnerHTML))throw Error(x(61))}if(n.style!=null&&typeof n.style!="object")throw Error(x(62))}}function Yo(e,n){if(e.indexOf("-")===-1)return typeof n.is=="string";switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Xo=null;function Oi(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var Go=null,pt=null,dt=null;function os(e){if(e=hr(e)){if(typeof Go!="function")throw Error(x(280));var n=e.stateNode;n&&(n=Tl(n),Go(e.stateNode,e.type,n))}}function hu(e){pt?dt?dt.push(e):dt=[e]:pt=e}function vu(){if(pt){var e=pt,n=dt;if(dt=pt=null,os(e),n)for(e=0;e<n.length;e++)os(n[e])}}function yu(e,n){return e(n)}function xu(){}var vo=!1;function wu(e,n,t){if(vo)return e(n,t);vo=!0;try{return yu(e,n,t)}finally{vo=!1,(pt!==null||dt!==null)&&(xu(),vu())}}function qt(e,n){var t=e.stateNode;if(t===null)return null;var r=Tl(t);if(r===null)return null;t=r[n];e:switch(n){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(r=!r.disabled)||(e=e.type,r=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!r;break e;default:e=!1}if(e)return null;if(t&&typeof t!="function")throw Error(x(231,n,typeof t));return t}var Zo=!1;if(nn)try{Zn={},Object.defineProperty(Zn,"passive",{get:function(){Zo=!0}}),window.addEventListener("test",Zn,Zn),window.removeEventListener("test",Zn,Zn)}catch{Zo=!1}var Zn;function nd(e,n,t,r,l,o,i,a,s){var p=Array.prototype.slice.call(arguments,3);try{n.apply(t,p)}catch(h){this.onError(h)}}var Ht=!1,ol=null,il=!1,bo=null,td={onError:function(e){Ht=!0,ol=e}};function rd(e,n,t,r,l,o,i,a,s){Ht=!1,ol=null,nd.apply(td,arguments)}function ld(e,n,t,r,l,o,i,a,s){if(rd.apply(this,arguments),Ht){if(Ht){var p=ol;Ht=!1,ol=null}else throw Error(x(198));il||(il=!0,bo=p)}}function Kn(e){var n=e,t=e;if(e.alternate)for(;n.return;)n=n.return;else{e=n;do n=e,(n.flags&4098)!==0&&(t=n.return),e=n.return;while(e)}return n.tag===3?t:null}function ku(e){if(e.tag===13){var n=e.memoizedState;if(n===null&&(e=e.alternate,e!==null&&(n=e.memoizedState)),n!==null)return n.dehydrated}return null}function is(e){if(Kn(e)!==e)throw Error(x(188))}function od(e){var n=e.alternate;if(!n){if(n=Kn(e),n===null)throw Error(x(188));return n!==e?null:e}for(var t=e,r=n;;){var l=t.return;if(l===null)break;var o=l.alternate;if(o===null){if(r=l.return,r!==null){t=r;continue}break}if(l.child===o.child){for(o=l.child;o;){if(o===t)return is(l),e;if(o===r)return is(l),n;o=o.sibling}throw Error(x(188))}if(t.return!==r.return)t=l,r=o;else{for(var i=!1,a=l.child;a;){if(a===t){i=!0,t=l,r=o;break}if(a===r){i=!0,r=l,t=o;break}a=a.sibling}if(!i){for(a=o.child;a;){if(a===t){i=!0,t=o,r=l;break}if(a===r){i=!0,r=o,t=l;break}a=a.sibling}if(!i)throw Error(x(189))}}if(t.alternate!==r)throw Error(x(190))}if(t.tag!==3)throw Error(x(188));return t.stateNode.current===t?e:n}function Su(e){return e=od(e),e!==null?Nu(e):null}function Nu(e){if(e.tag===5||e.tag===6)return e;for(e=e.child;e!==null;){var n=Nu(e);if(n!==null)return n;e=e.sibling}return null}var Cu=Se.unstable_scheduleCallback,as=Se.unstable_cancelCallback,id=Se.unstable_shouldYield,ad=Se.unstable_requestPaint,Y=Se.unstable_now,sd=Se.unstable_getCurrentPriorityLevel,Di=Se.unstable_ImmediatePriority,_u=Se.unstable_UserBlockingPriority,al=Se.unstable_NormalPriority,ud=Se.unstable_LowPriority,Eu=Se.unstable_IdlePriority,zl=null,Ye=null;function cd(e){if(Ye&&typeof Ye.onCommitFiberRoot=="function")try{Ye.onCommitFiberRoot(zl,e,void 0,(e.current.flags&128)===128)}catch{}}var Be=Math.clz32?Math.clz32:fd,pd=Math.log,dd=Math.LN2;function fd(e){return e>>>=0,e===0?32:31-(pd(e)/dd|0)|0}var Tr=64,Rr=4194304;function Bt(e){switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return e&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return e}}function sl(e,n){var t=e.pendingLanes;if(t===0)return 0;var r=0,l=e.suspendedLanes,o=e.pingedLanes,i=t&268435455;if(i!==0){var a=i&~l;a!==0?r=Bt(a):(o&=i,o!==0&&(r=Bt(o)))}else i=t&~l,i!==0?r=Bt(i):o!==0&&(r=Bt(o));if(r===0)return 0;if(n!==0&&n!==r&&(n&l)===0&&(l=r&-r,o=n&-n,l>=o||l===16&&(o&4194240)!==0))return n;if((r&4)!==0&&(r|=t&16),n=e.entangledLanes,n!==0)for(e=e.entanglements,n&=r;0<n;)t=31-Be(n),l=1<<t,r|=e[t],n&=~l;return r}function md(e,n){switch(e){case 1:case 2:case 4:return n+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return n+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function gd(e,n){for(var t=e.suspendedLanes,r=e.pingedLanes,l=e.expirationTimes,o=e.pendingLanes;0<o;){var i=31-Be(o),a=1<<i,s=l[i];s===-1?((a&t)===0||(a&r)!==0)&&(l[i]=md(a,n)):s<=n&&(e.expiredLanes|=a),o&=~a}}function Jo(e){return e=e.pendingLanes&-1073741825,e!==0?e:e&1073741824?1073741824:0}function Pu(){var e=Tr;return Tr<<=1,(Tr&4194240)===0&&(Tr=64),e}function yo(e){for(var n=[],t=0;31>t;t++)n.push(e);return n}function mr(e,n,t){e.pendingLanes|=n,n!==536870912&&(e.suspendedLanes=0,e.pingedLanes=0),e=e.eventTimes,n=31-Be(n),e[n]=t}function hd(e,n){var t=e.pendingLanes&~n;e.pendingLanes=n,e.suspendedLanes=0,e.pingedLanes=0,e.expiredLanes&=n,e.mutableReadLanes&=n,e.entangledLanes&=n,n=e.entanglements;var r=e.eventTimes;for(e=e.expirationTimes;0<t;){var l=31-Be(t),o=1<<l;n[l]=0,r[l]=-1,e[l]=-1,t&=~o}}function ji(e,n){var t=e.entangledLanes|=n;for(e=e.entanglements;t;){var r=31-Be(t),l=1<<r;l&n|e[r]&n&&(e[r]|=n),t&=~l}}var O=0;function zu(e){return e&=-e,1<e?4<e?(e&268435455)!==0?16:536870912:4:1}var Iu,Fi,Lu,Mu,Tu,qo=!1,Or=[],hn=null,vn=null,yn=null,er=new Map,nr=new Map,dn=[],vd="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function ss(e,n){switch(e){case"focusin":case"focusout":hn=null;break;case"dragenter":case"dragleave":vn=null;break;case"mouseover":case"mouseout":yn=null;break;case"pointerover":case"pointerout":er.delete(n.pointerId);break;case"gotpointercapture":case"lostpointercapture":nr.delete(n.pointerId)}}function Mt(e,n,t,r,l,o){return e===null||e.nativeEvent!==o?(e={blockedOn:n,domEventName:t,eventSystemFlags:r,nativeEvent:o,targetContainers:[l]},n!==null&&(n=hr(n),n!==null&&Fi(n)),e):(e.eventSystemFlags|=r,n=e.targetContainers,l!==null&&n.indexOf(l)===-1&&n.push(l),e)}function yd(e,n,t,r,l){switch(n){case"focusin":return hn=Mt(hn,e,n,t,r,l),!0;case"dragenter":return vn=Mt(vn,e,n,t,r,l),!0;case"mouseover":return yn=Mt(yn,e,n,t,r,l),!0;case"pointerover":var o=l.pointerId;return er.set(o,Mt(er.get(o)||null,e,n,t,r,l)),!0;case"gotpointercapture":return o=l.pointerId,nr.set(o,Mt(nr.get(o)||null,e,n,t,r,l)),!0}return!1}function Ru(e){var n=Dn(e.target);if(n!==null){var t=Kn(n);if(t!==null){if(n=t.tag,n===13){if(n=ku(t),n!==null){e.blockedOn=n,Tu(e.priority,function(){Lu(t)});return}}else if(n===3&&t.stateNode.current.memoizedState.isDehydrated){e.blockedOn=t.tag===3?t.stateNode.containerInfo:null;return}}}e.blockedOn=null}function Xr(e){if(e.blockedOn!==null)return!1;for(var n=e.targetContainers;0<n.length;){var t=ei(e.domEventName,e.eventSystemFlags,n[0],e.nativeEvent);if(t===null){t=e.nativeEvent;var r=new t.constructor(t.type,t);Xo=r,t.target.dispatchEvent(r),Xo=null}else return n=hr(t),n!==null&&Fi(n),e.blockedOn=t,!1;n.shift()}return!0}function us(e,n,t){Xr(e)&&t.delete(n)}function xd(){qo=!1,hn!==null&&Xr(hn)&&(hn=null),vn!==null&&Xr(vn)&&(vn=null),yn!==null&&Xr(yn)&&(yn=null),er.forEach(us),nr.forEach(us)}function Tt(e,n){e.blockedOn===n&&(e.blockedOn=null,qo||(qo=!0,Se.unstable_scheduleCallback(Se.unstable_NormalPriority,xd)))}function tr(e){function n(l){return Tt(l,e)}if(0<Or.length){Tt(Or[0],e);for(var t=1;t<Or.length;t++){var r=Or[t];r.blockedOn===e&&(r.blockedOn=null)}}for(hn!==null&&Tt(hn,e),vn!==null&&Tt(vn,e),yn!==null&&Tt(yn,e),er.forEach(n),nr.forEach(n),t=0;t<dn.length;t++)r=dn[t],r.blockedOn===e&&(r.blockedOn=null);for(;0<dn.length&&(t=dn[0],t.blockedOn===null);)Ru(t),t.blockedOn===null&&dn.shift()}var ft=on.ReactCurrentBatchConfig,ul=!0;function wd(e,n,t,r){var l=O,o=ft.transition;ft.transition=null;try{O=1,Ui(e,n,t,r)}finally{O=l,ft.transition=o}}function kd(e,n,t,r){var l=O,o=ft.transition;ft.transition=null;try{O=4,Ui(e,n,t,r)}finally{O=l,ft.transition=o}}function Ui(e,n,t,r){if(ul){var l=ei(e,n,t,r);if(l===null)_o(e,n,r,cl,t),ss(e,r);else if(yd(l,e,n,t,r))r.stopPropagation();else if(ss(e,r),n&4&&-1<vd.indexOf(e)){for(;l!==null;){var o=hr(l);if(o!==null&&Iu(o),o=ei(e,n,t,r),o===null&&_o(e,n,r,cl,t),o===l)break;l=o}l!==null&&r.stopPropagation()}else _o(e,n,r,null,t)}}var cl=null;function ei(e,n,t,r){if(cl=null,e=Oi(r),e=Dn(e),e!==null)if(n=Kn(e),n===null)e=null;else if(t=n.tag,t===13){if(e=ku(n),e!==null)return e;e=null}else if(t===3){if(n.stateNode.current.memoizedState.isDehydrated)return n.tag===3?n.stateNode.containerInfo:null;e=null}else n!==e&&(e=null);return cl=e,null}function Ou(e){switch(e){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(sd()){case Di:return 1;case _u:return 4;case al:case ud:return 16;case Eu:return 536870912;default:return 16}default:return 16}}var mn=null,Wi=null,Gr=null;function Du(){if(Gr)return Gr;var e,n=Wi,t=n.length,r,l="value"in mn?mn.value:mn.textContent,o=l.length;for(e=0;e<t&&n[e]===l[e];e++);var i=t-e;for(r=1;r<=i&&n[t-r]===l[o-r];r++);return Gr=l.slice(e,1<r?1-r:void 0)}function Zr(e){var n=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&n===13&&(e=13)):e=n,e===10&&(e=13),32<=e||e===13?e:0}function Dr(){return!0}function cs(){return!1}function Ne(e){function n(t,r,l,o,i){this._reactName=t,this._targetInst=l,this.type=r,this.nativeEvent=o,this.target=i,this.currentTarget=null;for(var a in e)e.hasOwnProperty(a)&&(t=e[a],this[a]=t?t(o):o[a]);return this.isDefaultPrevented=(o.defaultPrevented!=null?o.defaultPrevented:o.returnValue===!1)?Dr:cs,this.isPropagationStopped=cs,this}return Q(n.prototype,{preventDefault:function(){this.defaultPrevented=!0;var t=this.nativeEvent;t&&(t.preventDefault?t.preventDefault():typeof t.returnValue!="unknown"&&(t.returnValue=!1),this.isDefaultPrevented=Dr)},stopPropagation:function(){var t=this.nativeEvent;t&&(t.stopPropagation?t.stopPropagation():typeof t.cancelBubble!="unknown"&&(t.cancelBubble=!0),this.isPropagationStopped=Dr)},persist:function(){},isPersistent:Dr}),n}var Nt={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Bi=Ne(Nt),gr=Q({},Nt,{view:0,detail:0}),Sd=Ne(gr),xo,wo,Rt,Il=Q({},gr,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Ai,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==Rt&&(Rt&&e.type==="mousemove"?(xo=e.screenX-Rt.screenX,wo=e.screenY-Rt.screenY):wo=xo=0,Rt=e),xo)},movementY:function(e){return"movementY"in e?e.movementY:wo}}),ps=Ne(Il),Nd=Q({},Il,{dataTransfer:0}),Cd=Ne(Nd),_d=Q({},gr,{relatedTarget:0}),ko=Ne(_d),Ed=Q({},Nt,{animationName:0,elapsedTime:0,pseudoElement:0}),Pd=Ne(Ed),zd=Q({},Nt,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),Id=Ne(zd),Ld=Q({},Nt,{data:0}),ds=Ne(Ld),Md={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},Td={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},Rd={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function Od(e){var n=this.nativeEvent;return n.getModifierState?n.getModifierState(e):(e=Rd[e])?!!n[e]:!1}function Ai(){return Od}var Dd=Q({},gr,{key:function(e){if(e.key){var n=Md[e.key]||e.key;if(n!=="Unidentified")return n}return e.type==="keypress"?(e=Zr(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?Td[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Ai,charCode:function(e){return e.type==="keypress"?Zr(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?Zr(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),jd=Ne(Dd),Fd=Q({},Il,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),fs=Ne(Fd),Ud=Q({},gr,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Ai}),Wd=Ne(Ud),Bd=Q({},Nt,{propertyName:0,elapsedTime:0,pseudoElement:0}),Ad=Ne(Bd),Vd=Q({},Il,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),Hd=Ne(Vd),$d=[9,13,27,32],Vi=nn&&"CompositionEvent"in window,$t=null;nn&&"documentMode"in document&&($t=document.documentMode);var Qd=nn&&"TextEvent"in window&&!$t,ju=nn&&(!Vi||$t&&8<$t&&11>=$t),ms=" ",gs=!1;function Fu(e,n){switch(e){case"keyup":return $d.indexOf(n.keyCode)!==-1;case"keydown":return n.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Uu(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var et=!1;function Kd(e,n){switch(e){case"compositionend":return Uu(n);case"keypress":return n.which!==32?null:(gs=!0,ms);case"textInput":return e=n.data,e===ms&&gs?null:e;default:return null}}function Yd(e,n){if(et)return e==="compositionend"||!Vi&&Fu(e,n)?(e=Du(),Gr=Wi=mn=null,et=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(n.ctrlKey||n.altKey||n.metaKey)||n.ctrlKey&&n.altKey){if(n.char&&1<n.char.length)return n.char;if(n.which)return String.fromCharCode(n.which)}return null;case"compositionend":return ju&&n.locale!=="ko"?null:n.data;default:return null}}var Xd={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function hs(e){var n=e&&e.nodeName&&e.nodeName.toLowerCase();return n==="input"?!!Xd[e.type]:n==="textarea"}function Wu(e,n,t,r){hu(r),n=pl(n,"onChange"),0<n.length&&(t=new Bi("onChange","change",null,t,r),e.push({event:t,listeners:n}))}var Qt=null,rr=null;function Gd(e){Zu(e,0)}function Ll(e){var n=rt(e);if(uu(n))return e}function Zd(e,n){if(e==="change")return n}var Bu=!1;nn&&(nn?(Fr="oninput"in document,Fr||(So=document.createElement("div"),So.setAttribute("oninput","return;"),Fr=typeof So.oninput=="function"),jr=Fr):jr=!1,Bu=jr&&(!document.documentMode||9<document.documentMode));var jr,Fr,So;function vs(){Qt&&(Qt.detachEvent("onpropertychange",Au),rr=Qt=null)}function Au(e){if(e.propertyName==="value"&&Ll(rr)){var n=[];Wu(n,rr,e,Oi(e)),wu(Gd,n)}}function bd(e,n,t){e==="focusin"?(vs(),Qt=n,rr=t,Qt.attachEvent("onpropertychange",Au)):e==="focusout"&&vs()}function Jd(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return Ll(rr)}function qd(e,n){if(e==="click")return Ll(n)}function ef(e,n){if(e==="input"||e==="change")return Ll(n)}function nf(e,n){return e===n&&(e!==0||1/e===1/n)||e!==e&&n!==n}var Ve=typeof Object.is=="function"?Object.is:nf;function lr(e,n){if(Ve(e,n))return!0;if(typeof e!="object"||e===null||typeof n!="object"||n===null)return!1;var t=Object.keys(e),r=Object.keys(n);if(t.length!==r.length)return!1;for(r=0;r<t.length;r++){var l=t[r];if(!jo.call(n,l)||!Ve(e[l],n[l]))return!1}return!0}function ys(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function xs(e,n){var t=ys(e);e=0;for(var r;t;){if(t.nodeType===3){if(r=e+t.textContent.length,e<=n&&r>=n)return{node:t,offset:n-e};e=r}e:{for(;t;){if(t.nextSibling){t=t.nextSibling;break e}t=t.parentNode}t=void 0}t=ys(t)}}function Vu(e,n){return e&&n?e===n?!0:e&&e.nodeType===3?!1:n&&n.nodeType===3?Vu(e,n.parentNode):"contains"in e?e.contains(n):e.compareDocumentPosition?!!(e.compareDocumentPosition(n)&16):!1:!1}function Hu(){for(var e=window,n=ll();n instanceof e.HTMLIFrameElement;){try{var t=typeof n.contentWindow.location.href=="string"}catch{t=!1}if(t)e=n.contentWindow;else break;n=ll(e.document)}return n}function Hi(e){var n=e&&e.nodeName&&e.nodeName.toLowerCase();return n&&(n==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||n==="textarea"||e.contentEditable==="true")}function tf(e){var n=Hu(),t=e.focusedElem,r=e.selectionRange;if(n!==t&&t&&t.ownerDocument&&Vu(t.ownerDocument.documentElement,t)){if(r!==null&&Hi(t)){if(n=r.start,e=r.end,e===void 0&&(e=n),"selectionStart"in t)t.selectionStart=n,t.selectionEnd=Math.min(e,t.value.length);else if(e=(n=t.ownerDocument||document)&&n.defaultView||window,e.getSelection){e=e.getSelection();var l=t.textContent.length,o=Math.min(r.start,l);r=r.end===void 0?o:Math.min(r.end,l),!e.extend&&o>r&&(l=r,r=o,o=l),l=xs(t,o);var i=xs(t,r);l&&i&&(e.rangeCount!==1||e.anchorNode!==l.node||e.anchorOffset!==l.offset||e.focusNode!==i.node||e.focusOffset!==i.offset)&&(n=n.createRange(),n.setStart(l.node,l.offset),e.removeAllRanges(),o>r?(e.addRange(n),e.extend(i.node,i.offset)):(n.setEnd(i.node,i.offset),e.addRange(n)))}}for(n=[],e=t;e=e.parentNode;)e.nodeType===1&&n.push({element:e,left:e.scrollLeft,top:e.scrollTop});for(typeof t.focus=="function"&&t.focus(),t=0;t<n.length;t++)e=n[t],e.element.scrollLeft=e.left,e.element.scrollTop=e.top}}var rf=nn&&"documentMode"in document&&11>=document.documentMode,nt=null,ni=null,Kt=null,ti=!1;function ws(e,n,t){var r=t.window===t?t.document:t.nodeType===9?t:t.ownerDocument;ti||nt==null||nt!==ll(r)||(r=nt,"selectionStart"in r&&Hi(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),Kt&&lr(Kt,r)||(Kt=r,r=pl(ni,"onSelect"),0<r.length&&(n=new Bi("onSelect","select",null,n,t),e.push({event:n,listeners:r}),n.target=nt)))}function Ur(e,n){var t={};return t[e.toLowerCase()]=n.toLowerCase(),t["Webkit"+e]="webkit"+n,t["Moz"+e]="moz"+n,t}var tt={animationend:Ur("Animation","AnimationEnd"),animationiteration:Ur("Animation","AnimationIteration"),animationstart:Ur("Animation","AnimationStart"),transitionend:Ur("Transition","TransitionEnd")},No={},$u={};nn&&($u=document.createElement("div").style,"AnimationEvent"in window||(delete tt.animationend.animation,delete tt.animationiteration.animation,delete tt.animationstart.animation),"TransitionEvent"in window||delete tt.transitionend.transition);function Ml(e){if(No[e])return No[e];if(!tt[e])return e;var n=tt[e],t;for(t in n)if(n.hasOwnProperty(t)&&t in $u)return No[e]=n[t];return e}var Qu=Ml("animationend"),Ku=Ml("animationiteration"),Yu=Ml("animationstart"),Xu=Ml("transitionend"),Gu=new Map,ks="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function En(e,n){Gu.set(e,n),Qn(n,[e])}for(Wr=0;Wr<ks.length;Wr++)Br=ks[Wr],Ss=Br.toLowerCase(),Ns=Br[0].toUpperCase()+Br.slice(1),En(Ss,"on"+Ns);var Br,Ss,Ns,Wr;En(Qu,"onAnimationEnd");En(Ku,"onAnimationIteration");En(Yu,"onAnimationStart");En("dblclick","onDoubleClick");En("focusin","onFocus");En("focusout","onBlur");En(Xu,"onTransitionEnd");ht("onMouseEnter",["mouseout","mouseover"]);ht("onMouseLeave",["mouseout","mouseover"]);ht("onPointerEnter",["pointerout","pointerover"]);ht("onPointerLeave",["pointerout","pointerover"]);Qn("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));Qn("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));Qn("onBeforeInput",["compositionend","keypress","textInput","paste"]);Qn("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));Qn("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));Qn("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var At="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),lf=new Set("cancel close invalid load scroll toggle".split(" ").concat(At));function Cs(e,n,t){var r=e.type||"unknown-event";e.currentTarget=t,ld(r,n,void 0,e),e.currentTarget=null}function Zu(e,n){n=(n&4)!==0;for(var t=0;t<e.length;t++){var r=e[t],l=r.event;r=r.listeners;e:{var o=void 0;if(n)for(var i=r.length-1;0<=i;i--){var a=r[i],s=a.instance,p=a.currentTarget;if(a=a.listener,s!==o&&l.isPropagationStopped())break e;Cs(l,a,p),o=s}else for(i=0;i<r.length;i++){if(a=r[i],s=a.instance,p=a.currentTarget,a=a.listener,s!==o&&l.isPropagationStopped())break e;Cs(l,a,p),o=s}}}if(il)throw e=bo,il=!1,bo=null,e}function W(e,n){var t=n[ai];t===void 0&&(t=n[ai]=new Set);var r=e+"__bubble";t.has(r)||(bu(n,e,2,!1),t.add(r))}function Co(e,n,t){var r=0;n&&(r|=4),bu(t,e,r,n)}var Ar="_reactListening"+Math.random().toString(36).slice(2);function or(e){if(!e[Ar]){e[Ar]=!0,lu.forEach(function(t){t!=="selectionchange"&&(lf.has(t)||Co(t,!1,e),Co(t,!0,e))});var n=e.nodeType===9?e:e.ownerDocument;n===null||n[Ar]||(n[Ar]=!0,Co("selectionchange",!1,n))}}function bu(e,n,t,r){switch(Ou(n)){case 1:var l=wd;break;case 4:l=kd;break;default:l=Ui}t=l.bind(null,n,t,e),l=void 0,!Zo||n!=="touchstart"&&n!=="touchmove"&&n!=="wheel"||(l=!0),r?l!==void 0?e.addEventListener(n,t,{capture:!0,passive:l}):e.addEventListener(n,t,!0):l!==void 0?e.addEventListener(n,t,{passive:l}):e.addEventListener(n,t,!1)}function _o(e,n,t,r,l){var o=r;if((n&1)===0&&(n&2)===0&&r!==null)e:for(;;){if(r===null)return;var i=r.tag;if(i===3||i===4){var a=r.stateNode.containerInfo;if(a===l||a.nodeType===8&&a.parentNode===l)break;if(i===4)for(i=r.return;i!==null;){var s=i.tag;if((s===3||s===4)&&(s=i.stateNode.containerInfo,s===l||s.nodeType===8&&s.parentNode===l))return;i=i.return}for(;a!==null;){if(i=Dn(a),i===null)return;if(s=i.tag,s===5||s===6){r=o=i;continue e}a=a.parentNode}}r=r.return}wu(function(){var p=o,h=Oi(t),f=[];e:{var m=Gu.get(e);if(m!==void 0){var w=Bi,S=e;switch(e){case"keypress":if(Zr(t)===0)break e;case"keydown":case"keyup":w=jd;break;case"focusin":S="focus",w=ko;break;case"focusout":S="blur",w=ko;break;case"beforeblur":case"afterblur":w=ko;break;case"click":if(t.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":w=ps;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":w=Cd;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":w=Wd;break;case Qu:case Ku:case Yu:w=Pd;break;case Xu:w=Ad;break;case"scroll":w=Sd;break;case"wheel":w=Hd;break;case"copy":case"cut":case"paste":w=Id;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":w=fs}var C=(n&4)!==0,D=!C&&e==="scroll",u=C?m!==null?m+"Capture":null:m;C=[];for(var c=p,d;c!==null;){d=c;var y=d.stateNode;if(d.tag===5&&y!==null&&(d=y,u!==null&&(y=qt(c,u),y!=null&&C.push(ir(c,y,d)))),D)break;c=c.return}0<C.length&&(m=new w(m,S,null,t,h),f.push({event:m,listeners:C}))}}if((n&7)===0){e:{if(m=e==="mouseover"||e==="pointerover",w=e==="mouseout"||e==="pointerout",m&&t!==Xo&&(S=t.relatedTarget||t.fromElement)&&(Dn(S)||S[tn]))break e;if((w||m)&&(m=h.window===h?h:(m=h.ownerDocument)?m.defaultView||m.parentWindow:window,w?(S=t.relatedTarget||t.toElement,w=p,S=S?Dn(S):null,S!==null&&(D=Kn(S),S!==D||S.tag!==5&&S.tag!==6)&&(S=null)):(w=null,S=p),w!==S)){if(C=ps,y="onMouseLeave",u="onMouseEnter",c="mouse",(e==="pointerout"||e==="pointerover")&&(C=fs,y="onPointerLeave",u="onPointerEnter",c="pointer"),D=w==null?m:rt(w),d=S==null?m:rt(S),m=new C(y,c+"leave",w,t,h),m.target=D,m.relatedTarget=d,y=null,Dn(h)===p&&(C=new C(u,c+"enter",S,t,h),C.target=d,C.relatedTarget=D,y=C),D=y,w&&S)n:{for(C=w,u=S,c=0,d=C;d;d=bn(d))c++;for(d=0,y=u;y;y=bn(y))d++;for(;0<c-d;)C=bn(C),c--;for(;0<d-c;)u=bn(u),d--;for(;c--;){if(C===u||u!==null&&C===u.alternate)break n;C=bn(C),u=bn(u)}C=null}else C=null;w!==null&&_s(f,m,w,C,!1),S!==null&&D!==null&&_s(f,D,S,C,!0)}}e:{if(m=p?rt(p):window,w=m.nodeName&&m.nodeName.toLowerCase(),w==="select"||w==="input"&&m.type==="file")var z=Zd;else if(hs(m))if(Bu)z=ef;else{z=Jd;var k=bd}else(w=m.nodeName)&&w.toLowerCase()==="input"&&(m.type==="checkbox"||m.type==="radio")&&(z=qd);if(z&&(z=z(e,p))){Wu(f,z,t,h);break e}k&&k(e,m,p),e==="focusout"&&(k=m._wrapperState)&&k.controlled&&m.type==="number"&&Ho(m,"number",m.value)}switch(k=p?rt(p):window,e){case"focusin":(hs(k)||k.contentEditable==="true")&&(nt=k,ni=p,Kt=null);break;case"focusout":Kt=ni=nt=null;break;case"mousedown":ti=!0;break;case"contextmenu":case"mouseup":case"dragend":ti=!1,ws(f,t,h);break;case"selectionchange":if(rf)break;case"keydown":case"keyup":ws(f,t,h)}var _;if(Vi)e:{switch(e){case"compositionstart":var P="onCompositionStart";break e;case"compositionend":P="onCompositionEnd";break e;case"compositionupdate":P="onCompositionUpdate";break e}P=void 0}else et?Fu(e,t)&&(P="onCompositionEnd"):e==="keydown"&&t.keyCode===229&&(P="onCompositionStart");P&&(ju&&t.locale!=="ko"&&(et||P!=="onCompositionStart"?P==="onCompositionEnd"&&et&&(_=Du()):(mn=h,Wi="value"in mn?mn.value:mn.textContent,et=!0)),k=pl(p,P),0<k.length&&(P=new ds(P,e,null,t,h),f.push({event:P,listeners:k}),_?P.data=_:(_=Uu(t),_!==null&&(P.data=_)))),(_=Qd?Kd(e,t):Yd(e,t))&&(p=pl(p,"onBeforeInput"),0<p.length&&(h=new ds("onBeforeInput","beforeinput",null,t,h),f.push({event:h,listeners:p}),h.data=_))}Zu(f,n)})}function ir(e,n,t){return{instance:e,listener:n,currentTarget:t}}function pl(e,n){for(var t=n+"Capture",r=[];e!==null;){var l=e,o=l.stateNode;l.tag===5&&o!==null&&(l=o,o=qt(e,t),o!=null&&r.unshift(ir(e,o,l)),o=qt(e,n),o!=null&&r.push(ir(e,o,l))),e=e.return}return r}function bn(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5);return e||null}function _s(e,n,t,r,l){for(var o=n._reactName,i=[];t!==null&&t!==r;){var a=t,s=a.alternate,p=a.stateNode;if(s!==null&&s===r)break;a.tag===5&&p!==null&&(a=p,l?(s=qt(t,o),s!=null&&i.unshift(ir(t,s,a))):l||(s=qt(t,o),s!=null&&i.push(ir(t,s,a)))),t=t.return}i.length!==0&&e.push({event:n,listeners:i})}var of=/\r\n?/g,af=/\u0000|\uFFFD/g;function Es(e){return(typeof e=="string"?e:""+e).replace(of,`
`).replace(af,"")}function Vr(e,n,t){if(n=Es(n),Es(e)!==n&&t)throw Error(x(425))}function dl(){}var ri=null,li=null;function oi(e,n){return e==="textarea"||e==="noscript"||typeof n.children=="string"||typeof n.children=="number"||typeof n.dangerouslySetInnerHTML=="object"&&n.dangerouslySetInnerHTML!==null&&n.dangerouslySetInnerHTML.__html!=null}var ii=typeof setTimeout=="function"?setTimeout:void 0,sf=typeof clearTimeout=="function"?clearTimeout:void 0,Ps=typeof Promise=="function"?Promise:void 0,uf=typeof queueMicrotask=="function"?queueMicrotask:typeof Ps<"u"?function(e){return Ps.resolve(null).then(e).catch(cf)}:ii;function cf(e){setTimeout(function(){throw e})}function Eo(e,n){var t=n,r=0;do{var l=t.nextSibling;if(e.removeChild(t),l&&l.nodeType===8)if(t=l.data,t==="/$"){if(r===0){e.removeChild(l),tr(n);return}r--}else t!=="$"&&t!=="$?"&&t!=="$!"||r++;t=l}while(t);tr(n)}function xn(e){for(;e!=null;e=e.nextSibling){var n=e.nodeType;if(n===1||n===3)break;if(n===8){if(n=e.data,n==="$"||n==="$!"||n==="$?")break;if(n==="/$")return null}}return e}function zs(e){e=e.previousSibling;for(var n=0;e;){if(e.nodeType===8){var t=e.data;if(t==="$"||t==="$!"||t==="$?"){if(n===0)return e;n--}else t==="/$"&&n++}e=e.previousSibling}return null}var Ct=Math.random().toString(36).slice(2),Ke="__reactFiber$"+Ct,ar="__reactProps$"+Ct,tn="__reactContainer$"+Ct,ai="__reactEvents$"+Ct,pf="__reactListeners$"+Ct,df="__reactHandles$"+Ct;function Dn(e){var n=e[Ke];if(n)return n;for(var t=e.parentNode;t;){if(n=t[tn]||t[Ke]){if(t=n.alternate,n.child!==null||t!==null&&t.child!==null)for(e=zs(e);e!==null;){if(t=e[Ke])return t;e=zs(e)}return n}e=t,t=e.parentNode}return null}function hr(e){return e=e[Ke]||e[tn],!e||e.tag!==5&&e.tag!==6&&e.tag!==13&&e.tag!==3?null:e}function rt(e){if(e.tag===5||e.tag===6)return e.stateNode;throw Error(x(33))}function Tl(e){return e[ar]||null}var si=[],lt=-1;function Pn(e){return{current:e}}function B(e){0>lt||(e.current=si[lt],si[lt]=null,lt--)}function U(e,n){lt++,si[lt]=e.current,e.current=n}var _n={},ue=Pn(_n),he=Pn(!1),Bn=_n;function vt(e,n){var t=e.type.contextTypes;if(!t)return _n;var r=e.stateNode;if(r&&r.__reactInternalMemoizedUnmaskedChildContext===n)return r.__reactInternalMemoizedMaskedChildContext;var l={},o;for(o in t)l[o]=n[o];return r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=n,e.__reactInternalMemoizedMaskedChildContext=l),l}function ve(e){return e=e.childContextTypes,e!=null}function fl(){B(he),B(ue)}function Is(e,n,t){if(ue.current!==_n)throw Error(x(168));U(ue,n),U(he,t)}function Ju(e,n,t){var r=e.stateNode;if(n=n.childContextTypes,typeof r.getChildContext!="function")return t;r=r.getChildContext();for(var l in r)if(!(l in n))throw Error(x(108,bp(e)||"Unknown",l));return Q({},t,r)}function ml(e){return e=(e=e.stateNode)&&e.__reactInternalMemoizedMergedChildContext||_n,Bn=ue.current,U(ue,e),U(he,he.current),!0}function Ls(e,n,t){var r=e.stateNode;if(!r)throw Error(x(169));t?(e=Ju(e,n,Bn),r.__reactInternalMemoizedMergedChildContext=e,B(he),B(ue),U(ue,e)):B(he),U(he,t)}var be=null,Rl=!1,Po=!1;function qu(e){be===null?be=[e]:be.push(e)}function ff(e){Rl=!0,qu(e)}function zn(){if(!Po&&be!==null){Po=!0;var e=0,n=O;try{var t=be;for(O=1;e<t.length;e++){var r=t[e];do r=r(!0);while(r!==null)}be=null,Rl=!1}catch(l){throw be!==null&&(be=be.slice(e+1)),Cu(Di,zn),l}finally{O=n,Po=!1}}return null}var ot=[],it=0,gl=null,hl=0,Pe=[],ze=0,An=null,Je=1,qe="";function Rn(e,n){ot[it++]=hl,ot[it++]=gl,gl=e,hl=n}function ec(e,n,t){Pe[ze++]=Je,Pe[ze++]=qe,Pe[ze++]=An,An=e;var r=Je;e=qe;var l=32-Be(r)-1;r&=~(1<<l),t+=1;var o=32-Be(n)+l;if(30<o){var i=l-l%5;o=(r&(1<<i)-1).toString(32),r>>=i,l-=i,Je=1<<32-Be(n)+l|t<<l|r,qe=o+e}else Je=1<<o|t<<l|r,qe=e}function $i(e){e.return!==null&&(Rn(e,1),ec(e,1,0))}function Qi(e){for(;e===gl;)gl=ot[--it],ot[it]=null,hl=ot[--it],ot[it]=null;for(;e===An;)An=Pe[--ze],Pe[ze]=null,qe=Pe[--ze],Pe[ze]=null,Je=Pe[--ze],Pe[ze]=null}var ke=null,we=null,V=!1,We=null;function nc(e,n){var t=Ie(5,null,null,0);t.elementType="DELETED",t.stateNode=n,t.return=e,n=e.deletions,n===null?(e.deletions=[t],e.flags|=16):n.push(t)}function Ms(e,n){switch(e.tag){case 5:var t=e.type;return n=n.nodeType!==1||t.toLowerCase()!==n.nodeName.toLowerCase()?null:n,n!==null?(e.stateNode=n,ke=e,we=xn(n.firstChild),!0):!1;case 6:return n=e.pendingProps===""||n.nodeType!==3?null:n,n!==null?(e.stateNode=n,ke=e,we=null,!0):!1;case 13:return n=n.nodeType!==8?null:n,n!==null?(t=An!==null?{id:Je,overflow:qe}:null,e.memoizedState={dehydrated:n,treeContext:t,retryLane:1073741824},t=Ie(18,null,null,0),t.stateNode=n,t.return=e,e.child=t,ke=e,we=null,!0):!1;default:return!1}}function ui(e){return(e.mode&1)!==0&&(e.flags&128)===0}function ci(e){if(V){var n=we;if(n){var t=n;if(!Ms(e,n)){if(ui(e))throw Error(x(418));n=xn(t.nextSibling);var r=ke;n&&Ms(e,n)?nc(r,t):(e.flags=e.flags&-4097|2,V=!1,ke=e)}}else{if(ui(e))throw Error(x(418));e.flags=e.flags&-4097|2,V=!1,ke=e}}}function Ts(e){for(e=e.return;e!==null&&e.tag!==5&&e.tag!==3&&e.tag!==13;)e=e.return;ke=e}function Hr(e){if(e!==ke)return!1;if(!V)return Ts(e),V=!0,!1;var n;if((n=e.tag!==3)&&!(n=e.tag!==5)&&(n=e.type,n=n!=="head"&&n!=="body"&&!oi(e.type,e.memoizedProps)),n&&(n=we)){if(ui(e))throw tc(),Error(x(418));for(;n;)nc(e,n),n=xn(n.nextSibling)}if(Ts(e),e.tag===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(x(317));e:{for(e=e.nextSibling,n=0;e;){if(e.nodeType===8){var t=e.data;if(t==="/$"){if(n===0){we=xn(e.nextSibling);break e}n--}else t!=="$"&&t!=="$!"&&t!=="$?"||n++}e=e.nextSibling}we=null}}else we=ke?xn(e.stateNode.nextSibling):null;return!0}function tc(){for(var e=we;e;)e=xn(e.nextSibling)}function yt(){we=ke=null,V=!1}function Ki(e){We===null?We=[e]:We.push(e)}var mf=on.ReactCurrentBatchConfig;function Ot(e,n,t){if(e=t.ref,e!==null&&typeof e!="function"&&typeof e!="object"){if(t._owner){if(t=t._owner,t){if(t.tag!==1)throw Error(x(309));var r=t.stateNode}if(!r)throw Error(x(147,e));var l=r,o=""+e;return n!==null&&n.ref!==null&&typeof n.ref=="function"&&n.ref._stringRef===o?n.ref:(n=function(i){var a=l.refs;i===null?delete a[o]:a[o]=i},n._stringRef=o,n)}if(typeof e!="string")throw Error(x(284));if(!t._owner)throw Error(x(290,e))}return e}function $r(e,n){throw e=Object.prototype.toString.call(n),Error(x(31,e==="[object Object]"?"object with keys {"+Object.keys(n).join(", ")+"}":e))}function Rs(e){var n=e._init;return n(e._payload)}function rc(e){function n(u,c){if(e){var d=u.deletions;d===null?(u.deletions=[c],u.flags|=16):d.push(c)}}function t(u,c){if(!e)return null;for(;c!==null;)n(u,c),c=c.sibling;return null}function r(u,c){for(u=new Map;c!==null;)c.key!==null?u.set(c.key,c):u.set(c.index,c),c=c.sibling;return u}function l(u,c){return u=Nn(u,c),u.index=0,u.sibling=null,u}function o(u,c,d){return u.index=d,e?(d=u.alternate,d!==null?(d=d.index,d<c?(u.flags|=2,c):d):(u.flags|=2,c)):(u.flags|=1048576,c)}function i(u){return e&&u.alternate===null&&(u.flags|=2),u}function a(u,c,d,y){return c===null||c.tag!==6?(c=Oo(d,u.mode,y),c.return=u,c):(c=l(c,d),c.return=u,c)}function s(u,c,d,y){var z=d.type;return z===qn?h(u,c,d.props.children,y,d.key):c!==null&&(c.elementType===z||typeof z=="object"&&z!==null&&z.$$typeof===cn&&Rs(z)===c.type)?(y=l(c,d.props),y.ref=Ot(u,c,d),y.return=u,y):(y=rl(d.type,d.key,d.props,null,u.mode,y),y.ref=Ot(u,c,d),y.return=u,y)}function p(u,c,d,y){return c===null||c.tag!==4||c.stateNode.containerInfo!==d.containerInfo||c.stateNode.implementation!==d.implementation?(c=Do(d,u.mode,y),c.return=u,c):(c=l(c,d.children||[]),c.return=u,c)}function h(u,c,d,y,z){return c===null||c.tag!==7?(c=Wn(d,u.mode,y,z),c.return=u,c):(c=l(c,d),c.return=u,c)}function f(u,c,d){if(typeof c=="string"&&c!==""||typeof c=="number")return c=Oo(""+c,u.mode,d),c.return=u,c;if(typeof c=="object"&&c!==null){switch(c.$$typeof){case Ir:return d=rl(c.type,c.key,c.props,null,u.mode,d),d.ref=Ot(u,null,c),d.return=u,d;case Jn:return c=Do(c,u.mode,d),c.return=u,c;case cn:var y=c._init;return f(u,y(c._payload),d)}if(Wt(c)||Lt(c))return c=Wn(c,u.mode,d,null),c.return=u,c;$r(u,c)}return null}function m(u,c,d,y){var z=c!==null?c.key:null;if(typeof d=="string"&&d!==""||typeof d=="number")return z!==null?null:a(u,c,""+d,y);if(typeof d=="object"&&d!==null){switch(d.$$typeof){case Ir:return d.key===z?s(u,c,d,y):null;case Jn:return d.key===z?p(u,c,d,y):null;case cn:return z=d._init,m(u,c,z(d._payload),y)}if(Wt(d)||Lt(d))return z!==null?null:h(u,c,d,y,null);$r(u,d)}return null}function w(u,c,d,y,z){if(typeof y=="string"&&y!==""||typeof y=="number")return u=u.get(d)||null,a(c,u,""+y,z);if(typeof y=="object"&&y!==null){switch(y.$$typeof){case Ir:return u=u.get(y.key===null?d:y.key)||null,s(c,u,y,z);case Jn:return u=u.get(y.key===null?d:y.key)||null,p(c,u,y,z);case cn:var k=y._init;return w(u,c,d,k(y._payload),z)}if(Wt(y)||Lt(y))return u=u.get(d)||null,h(c,u,y,z,null);$r(c,y)}return null}function S(u,c,d,y){for(var z=null,k=null,_=c,P=c=0,j=null;_!==null&&P<d.length;P++){_.index>P?(j=_,_=null):j=_.sibling;var M=m(u,_,d[P],y);if(M===null){_===null&&(_=j);break}e&&_&&M.alternate===null&&n(u,_),c=o(M,c,P),k===null?z=M:k.sibling=M,k=M,_=j}if(P===d.length)return t(u,_),V&&Rn(u,P),z;if(_===null){for(;P<d.length;P++)_=f(u,d[P],y),_!==null&&(c=o(_,c,P),k===null?z=_:k.sibling=_,k=_);return V&&Rn(u,P),z}for(_=r(u,_);P<d.length;P++)j=w(_,u,P,d[P],y),j!==null&&(e&&j.alternate!==null&&_.delete(j.key===null?P:j.key),c=o(j,c,P),k===null?z=j:k.sibling=j,k=j);return e&&_.forEach(function(Oe){return n(u,Oe)}),V&&Rn(u,P),z}function C(u,c,d,y){var z=Lt(d);if(typeof z!="function")throw Error(x(150));if(d=z.call(d),d==null)throw Error(x(151));for(var k=z=null,_=c,P=c=0,j=null,M=d.next();_!==null&&!M.done;P++,M=d.next()){_.index>P?(j=_,_=null):j=_.sibling;var Oe=m(u,_,M.value,y);if(Oe===null){_===null&&(_=j);break}e&&_&&Oe.alternate===null&&n(u,_),c=o(Oe,c,P),k===null?z=Oe:k.sibling=Oe,k=Oe,_=j}if(M.done)return t(u,_),V&&Rn(u,P),z;if(_===null){for(;!M.done;P++,M=d.next())M=f(u,M.value,y),M!==null&&(c=o(M,c,P),k===null?z=M:k.sibling=M,k=M);return V&&Rn(u,P),z}for(_=r(u,_);!M.done;P++,M=d.next())M=w(_,u,P,M.value,y),M!==null&&(e&&M.alternate!==null&&_.delete(M.key===null?P:M.key),c=o(M,c,P),k===null?z=M:k.sibling=M,k=M);return e&&_.forEach(function(Jl){return n(u,Jl)}),V&&Rn(u,P),z}function D(u,c,d,y){if(typeof d=="object"&&d!==null&&d.type===qn&&d.key===null&&(d=d.props.children),typeof d=="object"&&d!==null){switch(d.$$typeof){case Ir:e:{for(var z=d.key,k=c;k!==null;){if(k.key===z){if(z=d.type,z===qn){if(k.tag===7){t(u,k.sibling),c=l(k,d.props.children),c.return=u,u=c;break e}}else if(k.elementType===z||typeof z=="object"&&z!==null&&z.$$typeof===cn&&Rs(z)===k.type){t(u,k.sibling),c=l(k,d.props),c.ref=Ot(u,k,d),c.return=u,u=c;break e}t(u,k);break}else n(u,k);k=k.sibling}d.type===qn?(c=Wn(d.props.children,u.mode,y,d.key),c.return=u,u=c):(y=rl(d.type,d.key,d.props,null,u.mode,y),y.ref=Ot(u,c,d),y.return=u,u=y)}return i(u);case Jn:e:{for(k=d.key;c!==null;){if(c.key===k)if(c.tag===4&&c.stateNode.containerInfo===d.containerInfo&&c.stateNode.implementation===d.implementation){t(u,c.sibling),c=l(c,d.children||[]),c.return=u,u=c;break e}else{t(u,c);break}else n(u,c);c=c.sibling}c=Do(d,u.mode,y),c.return=u,u=c}return i(u);case cn:return k=d._init,D(u,c,k(d._payload),y)}if(Wt(d))return S(u,c,d,y);if(Lt(d))return C(u,c,d,y);$r(u,d)}return typeof d=="string"&&d!==""||typeof d=="number"?(d=""+d,c!==null&&c.tag===6?(t(u,c.sibling),c=l(c,d),c.return=u,u=c):(t(u,c),c=Oo(d,u.mode,y),c.return=u,u=c),i(u)):t(u,c)}return D}var xt=rc(!0),lc=rc(!1),vl=Pn(null),yl=null,at=null,Yi=null;function Xi(){Yi=at=yl=null}function Gi(e){var n=vl.current;B(vl),e._currentValue=n}function pi(e,n,t){for(;e!==null;){var r=e.alternate;if((e.childLanes&n)!==n?(e.childLanes|=n,r!==null&&(r.childLanes|=n)):r!==null&&(r.childLanes&n)!==n&&(r.childLanes|=n),e===t)break;e=e.return}}function mt(e,n){yl=e,Yi=at=null,e=e.dependencies,e!==null&&e.firstContext!==null&&((e.lanes&n)!==0&&(ge=!0),e.firstContext=null)}function Me(e){var n=e._currentValue;if(Yi!==e)if(e={context:e,memoizedValue:n,next:null},at===null){if(yl===null)throw Error(x(308));at=e,yl.dependencies={lanes:0,firstContext:e}}else at=at.next=e;return n}var jn=null;function Zi(e){jn===null?jn=[e]:jn.push(e)}function oc(e,n,t,r){var l=n.interleaved;return l===null?(t.next=t,Zi(n)):(t.next=l.next,l.next=t),n.interleaved=t,rn(e,r)}function rn(e,n){e.lanes|=n;var t=e.alternate;for(t!==null&&(t.lanes|=n),t=e,e=e.return;e!==null;)e.childLanes|=n,t=e.alternate,t!==null&&(t.childLanes|=n),t=e,e=e.return;return t.tag===3?t.stateNode:null}var pn=!1;function bi(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function ic(e,n){e=e.updateQueue,n.updateQueue===e&&(n.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,effects:e.effects})}function en(e,n){return{eventTime:e,lane:n,tag:0,payload:null,callback:null,next:null}}function wn(e,n,t){var r=e.updateQueue;if(r===null)return null;if(r=r.shared,(T&2)!==0){var l=r.pending;return l===null?n.next=n:(n.next=l.next,l.next=n),r.pending=n,rn(e,t)}return l=r.interleaved,l===null?(n.next=n,Zi(r)):(n.next=l.next,l.next=n),r.interleaved=n,rn(e,t)}function br(e,n,t){if(n=n.updateQueue,n!==null&&(n=n.shared,(t&4194240)!==0)){var r=n.lanes;r&=e.pendingLanes,t|=r,n.lanes=t,ji(e,t)}}function Os(e,n){var t=e.updateQueue,r=e.alternate;if(r!==null&&(r=r.updateQueue,t===r)){var l=null,o=null;if(t=t.firstBaseUpdate,t!==null){do{var i={eventTime:t.eventTime,lane:t.lane,tag:t.tag,payload:t.payload,callback:t.callback,next:null};o===null?l=o=i:o=o.next=i,t=t.next}while(t!==null);o===null?l=o=n:o=o.next=n}else l=o=n;t={baseState:r.baseState,firstBaseUpdate:l,lastBaseUpdate:o,shared:r.shared,effects:r.effects},e.updateQueue=t;return}e=t.lastBaseUpdate,e===null?t.firstBaseUpdate=n:e.next=n,t.lastBaseUpdate=n}function xl(e,n,t,r){var l=e.updateQueue;pn=!1;var o=l.firstBaseUpdate,i=l.lastBaseUpdate,a=l.shared.pending;if(a!==null){l.shared.pending=null;var s=a,p=s.next;s.next=null,i===null?o=p:i.next=p,i=s;var h=e.alternate;h!==null&&(h=h.updateQueue,a=h.lastBaseUpdate,a!==i&&(a===null?h.firstBaseUpdate=p:a.next=p,h.lastBaseUpdate=s))}if(o!==null){var f=l.baseState;i=0,h=p=s=null,a=o;do{var m=a.lane,w=a.eventTime;if((r&m)===m){h!==null&&(h=h.next={eventTime:w,lane:0,tag:a.tag,payload:a.payload,callback:a.callback,next:null});e:{var S=e,C=a;switch(m=n,w=t,C.tag){case 1:if(S=C.payload,typeof S=="function"){f=S.call(w,f,m);break e}f=S;break e;case 3:S.flags=S.flags&-65537|128;case 0:if(S=C.payload,m=typeof S=="function"?S.call(w,f,m):S,m==null)break e;f=Q({},f,m);break e;case 2:pn=!0}}a.callback!==null&&a.lane!==0&&(e.flags|=64,m=l.effects,m===null?l.effects=[a]:m.push(a))}else w={eventTime:w,lane:m,tag:a.tag,payload:a.payload,callback:a.callback,next:null},h===null?(p=h=w,s=f):h=h.next=w,i|=m;if(a=a.next,a===null){if(a=l.shared.pending,a===null)break;m=a,a=m.next,m.next=null,l.lastBaseUpdate=m,l.shared.pending=null}}while(!0);if(h===null&&(s=f),l.baseState=s,l.firstBaseUpdate=p,l.lastBaseUpdate=h,n=l.shared.interleaved,n!==null){l=n;do i|=l.lane,l=l.next;while(l!==n)}else o===null&&(l.shared.lanes=0);Hn|=i,e.lanes=i,e.memoizedState=f}}function Ds(e,n,t){if(e=n.effects,n.effects=null,e!==null)for(n=0;n<e.length;n++){var r=e[n],l=r.callback;if(l!==null){if(r.callback=null,r=t,typeof l!="function")throw Error(x(191,l));l.call(r)}}}var vr={},Xe=Pn(vr),sr=Pn(vr),ur=Pn(vr);function Fn(e){if(e===vr)throw Error(x(174));return e}function Ji(e,n){switch(U(ur,n),U(sr,e),U(Xe,vr),e=n.nodeType,e){case 9:case 11:n=(n=n.documentElement)?n.namespaceURI:Qo(null,"");break;default:e=e===8?n.parentNode:n,n=e.namespaceURI||null,e=e.tagName,n=Qo(n,e)}B(Xe),U(Xe,n)}function wt(){B(Xe),B(sr),B(ur)}function ac(e){Fn(ur.current);var n=Fn(Xe.current),t=Qo(n,e.type);n!==t&&(U(sr,e),U(Xe,t))}function qi(e){sr.current===e&&(B(Xe),B(sr))}var H=Pn(0);function wl(e){for(var n=e;n!==null;){if(n.tag===13){var t=n.memoizedState;if(t!==null&&(t=t.dehydrated,t===null||t.data==="$?"||t.data==="$!"))return n}else if(n.tag===19&&n.memoizedProps.revealOrder!==void 0){if((n.flags&128)!==0)return n}else if(n.child!==null){n.child.return=n,n=n.child;continue}if(n===e)break;for(;n.sibling===null;){if(n.return===null||n.return===e)return null;n=n.return}n.sibling.return=n.return,n=n.sibling}return null}var zo=[];function ea(){for(var e=0;e<zo.length;e++)zo[e]._workInProgressVersionPrimary=null;zo.length=0}var Jr=on.ReactCurrentDispatcher,Io=on.ReactCurrentBatchConfig,Vn=0,$=null,Z=null,ee=null,kl=!1,Yt=!1,cr=0,gf=0;function ie(){throw Error(x(321))}function na(e,n){if(n===null)return!1;for(var t=0;t<n.length&&t<e.length;t++)if(!Ve(e[t],n[t]))return!1;return!0}function ta(e,n,t,r,l,o){if(Vn=o,$=n,n.memoizedState=null,n.updateQueue=null,n.lanes=0,Jr.current=e===null||e.memoizedState===null?xf:wf,e=t(r,l),Yt){o=0;do{if(Yt=!1,cr=0,25<=o)throw Error(x(301));o+=1,ee=Z=null,n.updateQueue=null,Jr.current=kf,e=t(r,l)}while(Yt)}if(Jr.current=Sl,n=Z!==null&&Z.next!==null,Vn=0,ee=Z=$=null,kl=!1,n)throw Error(x(300));return e}function ra(){var e=cr!==0;return cr=0,e}function Qe(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return ee===null?$.memoizedState=ee=e:ee=ee.next=e,ee}function Te(){if(Z===null){var e=$.alternate;e=e!==null?e.memoizedState:null}else e=Z.next;var n=ee===null?$.memoizedState:ee.next;if(n!==null)ee=n,Z=e;else{if(e===null)throw Error(x(310));Z=e,e={memoizedState:Z.memoizedState,baseState:Z.baseState,baseQueue:Z.baseQueue,queue:Z.queue,next:null},ee===null?$.memoizedState=ee=e:ee=ee.next=e}return ee}function pr(e,n){return typeof n=="function"?n(e):n}function Lo(e){var n=Te(),t=n.queue;if(t===null)throw Error(x(311));t.lastRenderedReducer=e;var r=Z,l=r.baseQueue,o=t.pending;if(o!==null){if(l!==null){var i=l.next;l.next=o.next,o.next=i}r.baseQueue=l=o,t.pending=null}if(l!==null){o=l.next,r=r.baseState;var a=i=null,s=null,p=o;do{var h=p.lane;if((Vn&h)===h)s!==null&&(s=s.next={lane:0,action:p.action,hasEagerState:p.hasEagerState,eagerState:p.eagerState,next:null}),r=p.hasEagerState?p.eagerState:e(r,p.action);else{var f={lane:h,action:p.action,hasEagerState:p.hasEagerState,eagerState:p.eagerState,next:null};s===null?(a=s=f,i=r):s=s.next=f,$.lanes|=h,Hn|=h}p=p.next}while(p!==null&&p!==o);s===null?i=r:s.next=a,Ve(r,n.memoizedState)||(ge=!0),n.memoizedState=r,n.baseState=i,n.baseQueue=s,t.lastRenderedState=r}if(e=t.interleaved,e!==null){l=e;do o=l.lane,$.lanes|=o,Hn|=o,l=l.next;while(l!==e)}else l===null&&(t.lanes=0);return[n.memoizedState,t.dispatch]}function Mo(e){var n=Te(),t=n.queue;if(t===null)throw Error(x(311));t.lastRenderedReducer=e;var r=t.dispatch,l=t.pending,o=n.memoizedState;if(l!==null){t.pending=null;var i=l=l.next;do o=e(o,i.action),i=i.next;while(i!==l);Ve(o,n.memoizedState)||(ge=!0),n.memoizedState=o,n.baseQueue===null&&(n.baseState=o),t.lastRenderedState=o}return[o,r]}function sc(){}function uc(e,n){var t=$,r=Te(),l=n(),o=!Ve(r.memoizedState,l);if(o&&(r.memoizedState=l,ge=!0),r=r.queue,la(dc.bind(null,t,r,e),[e]),r.getSnapshot!==n||o||ee!==null&&ee.memoizedState.tag&1){if(t.flags|=2048,dr(9,pc.bind(null,t,r,l,n),void 0,null),ne===null)throw Error(x(349));(Vn&30)!==0||cc(t,n,l)}return l}function cc(e,n,t){e.flags|=16384,e={getSnapshot:n,value:t},n=$.updateQueue,n===null?(n={lastEffect:null,stores:null},$.updateQueue=n,n.stores=[e]):(t=n.stores,t===null?n.stores=[e]:t.push(e))}function pc(e,n,t,r){n.value=t,n.getSnapshot=r,fc(n)&&mc(e)}function dc(e,n,t){return t(function(){fc(n)&&mc(e)})}function fc(e){var n=e.getSnapshot;e=e.value;try{var t=n();return!Ve(e,t)}catch{return!0}}function mc(e){var n=rn(e,1);n!==null&&Ae(n,e,1,-1)}function js(e){var n=Qe();return typeof e=="function"&&(e=e()),n.memoizedState=n.baseState=e,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:pr,lastRenderedState:e},n.queue=e,e=e.dispatch=yf.bind(null,$,e),[n.memoizedState,e]}function dr(e,n,t,r){return e={tag:e,create:n,destroy:t,deps:r,next:null},n=$.updateQueue,n===null?(n={lastEffect:null,stores:null},$.updateQueue=n,n.lastEffect=e.next=e):(t=n.lastEffect,t===null?n.lastEffect=e.next=e:(r=t.next,t.next=e,e.next=r,n.lastEffect=e)),e}function gc(){return Te().memoizedState}function qr(e,n,t,r){var l=Qe();$.flags|=e,l.memoizedState=dr(1|n,t,void 0,r===void 0?null:r)}function Ol(e,n,t,r){var l=Te();r=r===void 0?null:r;var o=void 0;if(Z!==null){var i=Z.memoizedState;if(o=i.destroy,r!==null&&na(r,i.deps)){l.memoizedState=dr(n,t,o,r);return}}$.flags|=e,l.memoizedState=dr(1|n,t,o,r)}function Fs(e,n){return qr(8390656,8,e,n)}function la(e,n){return Ol(2048,8,e,n)}function hc(e,n){return Ol(4,2,e,n)}function vc(e,n){return Ol(4,4,e,n)}function yc(e,n){if(typeof n=="function")return e=e(),n(e),function(){n(null)};if(n!=null)return e=e(),n.current=e,function(){n.current=null}}function xc(e,n,t){return t=t!=null?t.concat([e]):null,Ol(4,4,yc.bind(null,n,e),t)}function oa(){}function wc(e,n){var t=Te();n=n===void 0?null:n;var r=t.memoizedState;return r!==null&&n!==null&&na(n,r[1])?r[0]:(t.memoizedState=[e,n],e)}function kc(e,n){var t=Te();n=n===void 0?null:n;var r=t.memoizedState;return r!==null&&n!==null&&na(n,r[1])?r[0]:(e=e(),t.memoizedState=[e,n],e)}function Sc(e,n,t){return(Vn&21)===0?(e.baseState&&(e.baseState=!1,ge=!0),e.memoizedState=t):(Ve(t,n)||(t=Pu(),$.lanes|=t,Hn|=t,e.baseState=!0),n)}function hf(e,n){var t=O;O=t!==0&&4>t?t:4,e(!0);var r=Io.transition;Io.transition={};try{e(!1),n()}finally{O=t,Io.transition=r}}function Nc(){return Te().memoizedState}function vf(e,n,t){var r=Sn(e);if(t={lane:r,action:t,hasEagerState:!1,eagerState:null,next:null},Cc(e))_c(n,t);else if(t=oc(e,n,t,r),t!==null){var l=de();Ae(t,e,r,l),Ec(t,n,r)}}function yf(e,n,t){var r=Sn(e),l={lane:r,action:t,hasEagerState:!1,eagerState:null,next:null};if(Cc(e))_c(n,l);else{var o=e.alternate;if(e.lanes===0&&(o===null||o.lanes===0)&&(o=n.lastRenderedReducer,o!==null))try{var i=n.lastRenderedState,a=o(i,t);if(l.hasEagerState=!0,l.eagerState=a,Ve(a,i)){var s=n.interleaved;s===null?(l.next=l,Zi(n)):(l.next=s.next,s.next=l),n.interleaved=l;return}}catch{}t=oc(e,n,l,r),t!==null&&(l=de(),Ae(t,e,r,l),Ec(t,n,r))}}function Cc(e){var n=e.alternate;return e===$||n!==null&&n===$}function _c(e,n){Yt=kl=!0;var t=e.pending;t===null?n.next=n:(n.next=t.next,t.next=n),e.pending=n}function Ec(e,n,t){if((t&4194240)!==0){var r=n.lanes;r&=e.pendingLanes,t|=r,n.lanes=t,ji(e,t)}}var Sl={readContext:Me,useCallback:ie,useContext:ie,useEffect:ie,useImperativeHandle:ie,useInsertionEffect:ie,useLayoutEffect:ie,useMemo:ie,useReducer:ie,useRef:ie,useState:ie,useDebugValue:ie,useDeferredValue:ie,useTransition:ie,useMutableSource:ie,useSyncExternalStore:ie,useId:ie,unstable_isNewReconciler:!1},xf={readContext:Me,useCallback:function(e,n){return Qe().memoizedState=[e,n===void 0?null:n],e},useContext:Me,useEffect:Fs,useImperativeHandle:function(e,n,t){return t=t!=null?t.concat([e]):null,qr(4194308,4,yc.bind(null,n,e),t)},useLayoutEffect:function(e,n){return qr(4194308,4,e,n)},useInsertionEffect:function(e,n){return qr(4,2,e,n)},useMemo:function(e,n){var t=Qe();return n=n===void 0?null:n,e=e(),t.memoizedState=[e,n],e},useReducer:function(e,n,t){var r=Qe();return n=t!==void 0?t(n):n,r.memoizedState=r.baseState=n,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:n},r.queue=e,e=e.dispatch=vf.bind(null,$,e),[r.memoizedState,e]},useRef:function(e){var n=Qe();return e={current:e},n.memoizedState=e},useState:js,useDebugValue:oa,useDeferredValue:function(e){return Qe().memoizedState=e},useTransition:function(){var e=js(!1),n=e[0];return e=hf.bind(null,e[1]),Qe().memoizedState=e,[n,e]},useMutableSource:function(){},useSyncExternalStore:function(e,n,t){var r=$,l=Qe();if(V){if(t===void 0)throw Error(x(407));t=t()}else{if(t=n(),ne===null)throw Error(x(349));(Vn&30)!==0||cc(r,n,t)}l.memoizedState=t;var o={value:t,getSnapshot:n};return l.queue=o,Fs(dc.bind(null,r,o,e),[e]),r.flags|=2048,dr(9,pc.bind(null,r,o,t,n),void 0,null),t},useId:function(){var e=Qe(),n=ne.identifierPrefix;if(V){var t=qe,r=Je;t=(r&~(1<<32-Be(r)-1)).toString(32)+t,n=":"+n+"R"+t,t=cr++,0<t&&(n+="H"+t.toString(32)),n+=":"}else t=gf++,n=":"+n+"r"+t.toString(32)+":";return e.memoizedState=n},unstable_isNewReconciler:!1},wf={readContext:Me,useCallback:wc,useContext:Me,useEffect:la,useImperativeHandle:xc,useInsertionEffect:hc,useLayoutEffect:vc,useMemo:kc,useReducer:Lo,useRef:gc,useState:function(){return Lo(pr)},useDebugValue:oa,useDeferredValue:function(e){var n=Te();return Sc(n,Z.memoizedState,e)},useTransition:function(){var e=Lo(pr)[0],n=Te().memoizedState;return[e,n]},useMutableSource:sc,useSyncExternalStore:uc,useId:Nc,unstable_isNewReconciler:!1},kf={readContext:Me,useCallback:wc,useContext:Me,useEffect:la,useImperativeHandle:xc,useInsertionEffect:hc,useLayoutEffect:vc,useMemo:kc,useReducer:Mo,useRef:gc,useState:function(){return Mo(pr)},useDebugValue:oa,useDeferredValue:function(e){var n=Te();return Z===null?n.memoizedState=e:Sc(n,Z.memoizedState,e)},useTransition:function(){var e=Mo(pr)[0],n=Te().memoizedState;return[e,n]},useMutableSource:sc,useSyncExternalStore:uc,useId:Nc,unstable_isNewReconciler:!1};function Fe(e,n){if(e&&e.defaultProps){n=Q({},n),e=e.defaultProps;for(var t in e)n[t]===void 0&&(n[t]=e[t]);return n}return n}function di(e,n,t,r){n=e.memoizedState,t=t(r,n),t=t==null?n:Q({},n,t),e.memoizedState=t,e.lanes===0&&(e.updateQueue.baseState=t)}var Dl={isMounted:function(e){return(e=e._reactInternals)?Kn(e)===e:!1},enqueueSetState:function(e,n,t){e=e._reactInternals;var r=de(),l=Sn(e),o=en(r,l);o.payload=n,t!=null&&(o.callback=t),n=wn(e,o,l),n!==null&&(Ae(n,e,l,r),br(n,e,l))},enqueueReplaceState:function(e,n,t){e=e._reactInternals;var r=de(),l=Sn(e),o=en(r,l);o.tag=1,o.payload=n,t!=null&&(o.callback=t),n=wn(e,o,l),n!==null&&(Ae(n,e,l,r),br(n,e,l))},enqueueForceUpdate:function(e,n){e=e._reactInternals;var t=de(),r=Sn(e),l=en(t,r);l.tag=2,n!=null&&(l.callback=n),n=wn(e,l,r),n!==null&&(Ae(n,e,r,t),br(n,e,r))}};function Us(e,n,t,r,l,o,i){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(r,o,i):n.prototype&&n.prototype.isPureReactComponent?!lr(t,r)||!lr(l,o):!0}function Pc(e,n,t){var r=!1,l=_n,o=n.contextType;return typeof o=="object"&&o!==null?o=Me(o):(l=ve(n)?Bn:ue.current,r=n.contextTypes,o=(r=r!=null)?vt(e,l):_n),n=new n(t,o),e.memoizedState=n.state!==null&&n.state!==void 0?n.state:null,n.updater=Dl,e.stateNode=n,n._reactInternals=e,r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=l,e.__reactInternalMemoizedMaskedChildContext=o),n}function Ws(e,n,t,r){e=n.state,typeof n.componentWillReceiveProps=="function"&&n.componentWillReceiveProps(t,r),typeof n.UNSAFE_componentWillReceiveProps=="function"&&n.UNSAFE_componentWillReceiveProps(t,r),n.state!==e&&Dl.enqueueReplaceState(n,n.state,null)}function fi(e,n,t,r){var l=e.stateNode;l.props=t,l.state=e.memoizedState,l.refs={},bi(e);var o=n.contextType;typeof o=="object"&&o!==null?l.context=Me(o):(o=ve(n)?Bn:ue.current,l.context=vt(e,o)),l.state=e.memoizedState,o=n.getDerivedStateFromProps,typeof o=="function"&&(di(e,n,o,t),l.state=e.memoizedState),typeof n.getDerivedStateFromProps=="function"||typeof l.getSnapshotBeforeUpdate=="function"||typeof l.UNSAFE_componentWillMount!="function"&&typeof l.componentWillMount!="function"||(n=l.state,typeof l.componentWillMount=="function"&&l.componentWillMount(),typeof l.UNSAFE_componentWillMount=="function"&&l.UNSAFE_componentWillMount(),n!==l.state&&Dl.enqueueReplaceState(l,l.state,null),xl(e,t,l,r),l.state=e.memoizedState),typeof l.componentDidMount=="function"&&(e.flags|=4194308)}function kt(e,n){try{var t="",r=n;do t+=Zp(r),r=r.return;while(r);var l=t}catch(o){l=`
Error generating stack: `+o.message+`
`+o.stack}return{value:e,source:n,stack:l,digest:null}}function To(e,n,t){return{value:e,source:null,stack:t??null,digest:n??null}}function mi(e,n){try{console.error(n.value)}catch(t){setTimeout(function(){throw t})}}var Sf=typeof WeakMap=="function"?WeakMap:Map;function zc(e,n,t){t=en(-1,t),t.tag=3,t.payload={element:null};var r=n.value;return t.callback=function(){Cl||(Cl=!0,Ci=r),mi(e,n)},t}function Ic(e,n,t){t=en(-1,t),t.tag=3;var r=e.type.getDerivedStateFromError;if(typeof r=="function"){var l=n.value;t.payload=function(){return r(l)},t.callback=function(){mi(e,n)}}var o=e.stateNode;return o!==null&&typeof o.componentDidCatch=="function"&&(t.callback=function(){mi(e,n),typeof r!="function"&&(kn===null?kn=new Set([this]):kn.add(this));var i=n.stack;this.componentDidCatch(n.value,{componentStack:i!==null?i:""})}),t}function Bs(e,n,t){var r=e.pingCache;if(r===null){r=e.pingCache=new Sf;var l=new Set;r.set(n,l)}else l=r.get(n),l===void 0&&(l=new Set,r.set(n,l));l.has(t)||(l.add(t),e=jf.bind(null,e,n,t),n.then(e,e))}function As(e){do{var n;if((n=e.tag===13)&&(n=e.memoizedState,n=n!==null?n.dehydrated!==null:!0),n)return e;e=e.return}while(e!==null);return null}function Vs(e,n,t,r,l){return(e.mode&1)===0?(e===n?e.flags|=65536:(e.flags|=128,t.flags|=131072,t.flags&=-52805,t.tag===1&&(t.alternate===null?t.tag=17:(n=en(-1,1),n.tag=2,wn(t,n,1))),t.lanes|=1),e):(e.flags|=65536,e.lanes=l,e)}var Nf=on.ReactCurrentOwner,ge=!1;function pe(e,n,t,r){n.child=e===null?lc(n,null,t,r):xt(n,e.child,t,r)}function Hs(e,n,t,r,l){t=t.render;var o=n.ref;return mt(n,l),r=ta(e,n,t,r,o,l),t=ra(),e!==null&&!ge?(n.updateQueue=e.updateQueue,n.flags&=-2053,e.lanes&=~l,ln(e,n,l)):(V&&t&&$i(n),n.flags|=1,pe(e,n,r,l),n.child)}function $s(e,n,t,r,l){if(e===null){var o=t.type;return typeof o=="function"&&!fa(o)&&o.defaultProps===void 0&&t.compare===null&&t.defaultProps===void 0?(n.tag=15,n.type=o,Lc(e,n,o,r,l)):(e=rl(t.type,null,r,n,n.mode,l),e.ref=n.ref,e.return=n,n.child=e)}if(o=e.child,(e.lanes&l)===0){var i=o.memoizedProps;if(t=t.compare,t=t!==null?t:lr,t(i,r)&&e.ref===n.ref)return ln(e,n,l)}return n.flags|=1,e=Nn(o,r),e.ref=n.ref,e.return=n,n.child=e}function Lc(e,n,t,r,l){if(e!==null){var o=e.memoizedProps;if(lr(o,r)&&e.ref===n.ref)if(ge=!1,n.pendingProps=r=o,(e.lanes&l)!==0)(e.flags&131072)!==0&&(ge=!0);else return n.lanes=e.lanes,ln(e,n,l)}return gi(e,n,t,r,l)}function Mc(e,n,t){var r=n.pendingProps,l=r.children,o=e!==null?e.memoizedState:null;if(r.mode==="hidden")if((n.mode&1)===0)n.memoizedState={baseLanes:0,cachePool:null,transitions:null},U(ut,xe),xe|=t;else{if((t&1073741824)===0)return e=o!==null?o.baseLanes|t:t,n.lanes=n.childLanes=1073741824,n.memoizedState={baseLanes:e,cachePool:null,transitions:null},n.updateQueue=null,U(ut,xe),xe|=e,null;n.memoizedState={baseLanes:0,cachePool:null,transitions:null},r=o!==null?o.baseLanes:t,U(ut,xe),xe|=r}else o!==null?(r=o.baseLanes|t,n.memoizedState=null):r=t,U(ut,xe),xe|=r;return pe(e,n,l,t),n.child}function Tc(e,n){var t=n.ref;(e===null&&t!==null||e!==null&&e.ref!==t)&&(n.flags|=512,n.flags|=2097152)}function gi(e,n,t,r,l){var o=ve(t)?Bn:ue.current;return o=vt(n,o),mt(n,l),t=ta(e,n,t,r,o,l),r=ra(),e!==null&&!ge?(n.updateQueue=e.updateQueue,n.flags&=-2053,e.lanes&=~l,ln(e,n,l)):(V&&r&&$i(n),n.flags|=1,pe(e,n,t,l),n.child)}function Qs(e,n,t,r,l){if(ve(t)){var o=!0;ml(n)}else o=!1;if(mt(n,l),n.stateNode===null)el(e,n),Pc(n,t,r),fi(n,t,r,l),r=!0;else if(e===null){var i=n.stateNode,a=n.memoizedProps;i.props=a;var s=i.context,p=t.contextType;typeof p=="object"&&p!==null?p=Me(p):(p=ve(t)?Bn:ue.current,p=vt(n,p));var h=t.getDerivedStateFromProps,f=typeof h=="function"||typeof i.getSnapshotBeforeUpdate=="function";f||typeof i.UNSAFE_componentWillReceiveProps!="function"&&typeof i.componentWillReceiveProps!="function"||(a!==r||s!==p)&&Ws(n,i,r,p),pn=!1;var m=n.memoizedState;i.state=m,xl(n,r,i,l),s=n.memoizedState,a!==r||m!==s||he.current||pn?(typeof h=="function"&&(di(n,t,h,r),s=n.memoizedState),(a=pn||Us(n,t,a,r,m,s,p))?(f||typeof i.UNSAFE_componentWillMount!="function"&&typeof i.componentWillMount!="function"||(typeof i.componentWillMount=="function"&&i.componentWillMount(),typeof i.UNSAFE_componentWillMount=="function"&&i.UNSAFE_componentWillMount()),typeof i.componentDidMount=="function"&&(n.flags|=4194308)):(typeof i.componentDidMount=="function"&&(n.flags|=4194308),n.memoizedProps=r,n.memoizedState=s),i.props=r,i.state=s,i.context=p,r=a):(typeof i.componentDidMount=="function"&&(n.flags|=4194308),r=!1)}else{i=n.stateNode,ic(e,n),a=n.memoizedProps,p=n.type===n.elementType?a:Fe(n.type,a),i.props=p,f=n.pendingProps,m=i.context,s=t.contextType,typeof s=="object"&&s!==null?s=Me(s):(s=ve(t)?Bn:ue.current,s=vt(n,s));var w=t.getDerivedStateFromProps;(h=typeof w=="function"||typeof i.getSnapshotBeforeUpdate=="function")||typeof i.UNSAFE_componentWillReceiveProps!="function"&&typeof i.componentWillReceiveProps!="function"||(a!==f||m!==s)&&Ws(n,i,r,s),pn=!1,m=n.memoizedState,i.state=m,xl(n,r,i,l);var S=n.memoizedState;a!==f||m!==S||he.current||pn?(typeof w=="function"&&(di(n,t,w,r),S=n.memoizedState),(p=pn||Us(n,t,p,r,m,S,s)||!1)?(h||typeof i.UNSAFE_componentWillUpdate!="function"&&typeof i.componentWillUpdate!="function"||(typeof i.componentWillUpdate=="function"&&i.componentWillUpdate(r,S,s),typeof i.UNSAFE_componentWillUpdate=="function"&&i.UNSAFE_componentWillUpdate(r,S,s)),typeof i.componentDidUpdate=="function"&&(n.flags|=4),typeof i.getSnapshotBeforeUpdate=="function"&&(n.flags|=1024)):(typeof i.componentDidUpdate!="function"||a===e.memoizedProps&&m===e.memoizedState||(n.flags|=4),typeof i.getSnapshotBeforeUpdate!="function"||a===e.memoizedProps&&m===e.memoizedState||(n.flags|=1024),n.memoizedProps=r,n.memoizedState=S),i.props=r,i.state=S,i.context=s,r=p):(typeof i.componentDidUpdate!="function"||a===e.memoizedProps&&m===e.memoizedState||(n.flags|=4),typeof i.getSnapshotBeforeUpdate!="function"||a===e.memoizedProps&&m===e.memoizedState||(n.flags|=1024),r=!1)}return hi(e,n,t,r,o,l)}function hi(e,n,t,r,l,o){Tc(e,n);var i=(n.flags&128)!==0;if(!r&&!i)return l&&Ls(n,t,!1),ln(e,n,o);r=n.stateNode,Nf.current=n;var a=i&&typeof t.getDerivedStateFromError!="function"?null:r.render();return n.flags|=1,e!==null&&i?(n.child=xt(n,e.child,null,o),n.child=xt(n,null,a,o)):pe(e,n,a,o),n.memoizedState=r.state,l&&Ls(n,t,!0),n.child}function Rc(e){var n=e.stateNode;n.pendingContext?Is(e,n.pendingContext,n.pendingContext!==n.context):n.context&&Is(e,n.context,!1),Ji(e,n.containerInfo)}function Ks(e,n,t,r,l){return yt(),Ki(l),n.flags|=256,pe(e,n,t,r),n.child}var vi={dehydrated:null,treeContext:null,retryLane:0};function yi(e){return{baseLanes:e,cachePool:null,transitions:null}}function Oc(e,n,t){var r=n.pendingProps,l=H.current,o=!1,i=(n.flags&128)!==0,a;if((a=i)||(a=e!==null&&e.memoizedState===null?!1:(l&2)!==0),a?(o=!0,n.flags&=-129):(e===null||e.memoizedState!==null)&&(l|=1),U(H,l&1),e===null)return ci(n),e=n.memoizedState,e!==null&&(e=e.dehydrated,e!==null)?((n.mode&1)===0?n.lanes=1:e.data==="$!"?n.lanes=8:n.lanes=1073741824,null):(i=r.children,e=r.fallback,o?(r=n.mode,o=n.child,i={mode:"hidden",children:i},(r&1)===0&&o!==null?(o.childLanes=0,o.pendingProps=i):o=Ul(i,r,0,null),e=Wn(e,r,t,null),o.return=n,e.return=n,o.sibling=e,n.child=o,n.child.memoizedState=yi(t),n.memoizedState=vi,e):ia(n,i));if(l=e.memoizedState,l!==null&&(a=l.dehydrated,a!==null))return Cf(e,n,i,r,a,l,t);if(o){o=r.fallback,i=n.mode,l=e.child,a=l.sibling;var s={mode:"hidden",children:r.children};return(i&1)===0&&n.child!==l?(r=n.child,r.childLanes=0,r.pendingProps=s,n.deletions=null):(r=Nn(l,s),r.subtreeFlags=l.subtreeFlags&14680064),a!==null?o=Nn(a,o):(o=Wn(o,i,t,null),o.flags|=2),o.return=n,r.return=n,r.sibling=o,n.child=r,r=o,o=n.child,i=e.child.memoizedState,i=i===null?yi(t):{baseLanes:i.baseLanes|t,cachePool:null,transitions:i.transitions},o.memoizedState=i,o.childLanes=e.childLanes&~t,n.memoizedState=vi,r}return o=e.child,e=o.sibling,r=Nn(o,{mode:"visible",children:r.children}),(n.mode&1)===0&&(r.lanes=t),r.return=n,r.sibling=null,e!==null&&(t=n.deletions,t===null?(n.deletions=[e],n.flags|=16):t.push(e)),n.child=r,n.memoizedState=null,r}function ia(e,n){return n=Ul({mode:"visible",children:n},e.mode,0,null),n.return=e,e.child=n}function Qr(e,n,t,r){return r!==null&&Ki(r),xt(n,e.child,null,t),e=ia(n,n.pendingProps.children),e.flags|=2,n.memoizedState=null,e}function Cf(e,n,t,r,l,o,i){if(t)return n.flags&256?(n.flags&=-257,r=To(Error(x(422))),Qr(e,n,i,r)):n.memoizedState!==null?(n.child=e.child,n.flags|=128,null):(o=r.fallback,l=n.mode,r=Ul({mode:"visible",children:r.children},l,0,null),o=Wn(o,l,i,null),o.flags|=2,r.return=n,o.return=n,r.sibling=o,n.child=r,(n.mode&1)!==0&&xt(n,e.child,null,i),n.child.memoizedState=yi(i),n.memoizedState=vi,o);if((n.mode&1)===0)return Qr(e,n,i,null);if(l.data==="$!"){if(r=l.nextSibling&&l.nextSibling.dataset,r)var a=r.dgst;return r=a,o=Error(x(419)),r=To(o,r,void 0),Qr(e,n,i,r)}if(a=(i&e.childLanes)!==0,ge||a){if(r=ne,r!==null){switch(i&-i){case 4:l=2;break;case 16:l=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:l=32;break;case 536870912:l=268435456;break;default:l=0}l=(l&(r.suspendedLanes|i))!==0?0:l,l!==0&&l!==o.retryLane&&(o.retryLane=l,rn(e,l),Ae(r,e,l,-1))}return da(),r=To(Error(x(421))),Qr(e,n,i,r)}return l.data==="$?"?(n.flags|=128,n.child=e.child,n=Ff.bind(null,e),l._reactRetry=n,null):(e=o.treeContext,we=xn(l.nextSibling),ke=n,V=!0,We=null,e!==null&&(Pe[ze++]=Je,Pe[ze++]=qe,Pe[ze++]=An,Je=e.id,qe=e.overflow,An=n),n=ia(n,r.children),n.flags|=4096,n)}function Ys(e,n,t){e.lanes|=n;var r=e.alternate;r!==null&&(r.lanes|=n),pi(e.return,n,t)}function Ro(e,n,t,r,l){var o=e.memoizedState;o===null?e.memoizedState={isBackwards:n,rendering:null,renderingStartTime:0,last:r,tail:t,tailMode:l}:(o.isBackwards=n,o.rendering=null,o.renderingStartTime=0,o.last=r,o.tail=t,o.tailMode=l)}function Dc(e,n,t){var r=n.pendingProps,l=r.revealOrder,o=r.tail;if(pe(e,n,r.children,t),r=H.current,(r&2)!==0)r=r&1|2,n.flags|=128;else{if(e!==null&&(e.flags&128)!==0)e:for(e=n.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&Ys(e,t,n);else if(e.tag===19)Ys(e,t,n);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===n)break e;for(;e.sibling===null;){if(e.return===null||e.return===n)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}r&=1}if(U(H,r),(n.mode&1)===0)n.memoizedState=null;else switch(l){case"forwards":for(t=n.child,l=null;t!==null;)e=t.alternate,e!==null&&wl(e)===null&&(l=t),t=t.sibling;t=l,t===null?(l=n.child,n.child=null):(l=t.sibling,t.sibling=null),Ro(n,!1,l,t,o);break;case"backwards":for(t=null,l=n.child,n.child=null;l!==null;){if(e=l.alternate,e!==null&&wl(e)===null){n.child=l;break}e=l.sibling,l.sibling=t,t=l,l=e}Ro(n,!0,t,null,o);break;case"together":Ro(n,!1,null,null,void 0);break;default:n.memoizedState=null}return n.child}function el(e,n){(n.mode&1)===0&&e!==null&&(e.alternate=null,n.alternate=null,n.flags|=2)}function ln(e,n,t){if(e!==null&&(n.dependencies=e.dependencies),Hn|=n.lanes,(t&n.childLanes)===0)return null;if(e!==null&&n.child!==e.child)throw Error(x(153));if(n.child!==null){for(e=n.child,t=Nn(e,e.pendingProps),n.child=t,t.return=n;e.sibling!==null;)e=e.sibling,t=t.sibling=Nn(e,e.pendingProps),t.return=n;t.sibling=null}return n.child}function _f(e,n,t){switch(n.tag){case 3:Rc(n),yt();break;case 5:ac(n);break;case 1:ve(n.type)&&ml(n);break;case 4:Ji(n,n.stateNode.containerInfo);break;case 10:var r=n.type._context,l=n.memoizedProps.value;U(vl,r._currentValue),r._currentValue=l;break;case 13:if(r=n.memoizedState,r!==null)return r.dehydrated!==null?(U(H,H.current&1),n.flags|=128,null):(t&n.child.childLanes)!==0?Oc(e,n,t):(U(H,H.current&1),e=ln(e,n,t),e!==null?e.sibling:null);U(H,H.current&1);break;case 19:if(r=(t&n.childLanes)!==0,(e.flags&128)!==0){if(r)return Dc(e,n,t);n.flags|=128}if(l=n.memoizedState,l!==null&&(l.rendering=null,l.tail=null,l.lastEffect=null),U(H,H.current),r)break;return null;case 22:case 23:return n.lanes=0,Mc(e,n,t)}return ln(e,n,t)}var jc,xi,Fc,Uc;jc=function(e,n){for(var t=n.child;t!==null;){if(t.tag===5||t.tag===6)e.appendChild(t.stateNode);else if(t.tag!==4&&t.child!==null){t.child.return=t,t=t.child;continue}if(t===n)break;for(;t.sibling===null;){if(t.return===null||t.return===n)return;t=t.return}t.sibling.return=t.return,t=t.sibling}};xi=function(){};Fc=function(e,n,t,r){var l=e.memoizedProps;if(l!==r){e=n.stateNode,Fn(Xe.current);var o=null;switch(t){case"input":l=Ao(e,l),r=Ao(e,r),o=[];break;case"select":l=Q({},l,{value:void 0}),r=Q({},r,{value:void 0}),o=[];break;case"textarea":l=$o(e,l),r=$o(e,r),o=[];break;default:typeof l.onClick!="function"&&typeof r.onClick=="function"&&(e.onclick=dl)}Ko(t,r);var i;t=null;for(p in l)if(!r.hasOwnProperty(p)&&l.hasOwnProperty(p)&&l[p]!=null)if(p==="style"){var a=l[p];for(i in a)a.hasOwnProperty(i)&&(t||(t={}),t[i]="")}else p!=="dangerouslySetInnerHTML"&&p!=="children"&&p!=="suppressContentEditableWarning"&&p!=="suppressHydrationWarning"&&p!=="autoFocus"&&(bt.hasOwnProperty(p)?o||(o=[]):(o=o||[]).push(p,null));for(p in r){var s=r[p];if(a=l?.[p],r.hasOwnProperty(p)&&s!==a&&(s!=null||a!=null))if(p==="style")if(a){for(i in a)!a.hasOwnProperty(i)||s&&s.hasOwnProperty(i)||(t||(t={}),t[i]="");for(i in s)s.hasOwnProperty(i)&&a[i]!==s[i]&&(t||(t={}),t[i]=s[i])}else t||(o||(o=[]),o.push(p,t)),t=s;else p==="dangerouslySetInnerHTML"?(s=s?s.__html:void 0,a=a?a.__html:void 0,s!=null&&a!==s&&(o=o||[]).push(p,s)):p==="children"?typeof s!="string"&&typeof s!="number"||(o=o||[]).push(p,""+s):p!=="suppressContentEditableWarning"&&p!=="suppressHydrationWarning"&&(bt.hasOwnProperty(p)?(s!=null&&p==="onScroll"&&W("scroll",e),o||a===s||(o=[])):(o=o||[]).push(p,s))}t&&(o=o||[]).push("style",t);var p=o;(n.updateQueue=p)&&(n.flags|=4)}};Uc=function(e,n,t,r){t!==r&&(n.flags|=4)};function Dt(e,n){if(!V)switch(e.tailMode){case"hidden":n=e.tail;for(var t=null;n!==null;)n.alternate!==null&&(t=n),n=n.sibling;t===null?e.tail=null:t.sibling=null;break;case"collapsed":t=e.tail;for(var r=null;t!==null;)t.alternate!==null&&(r=t),t=t.sibling;r===null?n||e.tail===null?e.tail=null:e.tail.sibling=null:r.sibling=null}}function ae(e){var n=e.alternate!==null&&e.alternate.child===e.child,t=0,r=0;if(n)for(var l=e.child;l!==null;)t|=l.lanes|l.childLanes,r|=l.subtreeFlags&14680064,r|=l.flags&14680064,l.return=e,l=l.sibling;else for(l=e.child;l!==null;)t|=l.lanes|l.childLanes,r|=l.subtreeFlags,r|=l.flags,l.return=e,l=l.sibling;return e.subtreeFlags|=r,e.childLanes=t,n}function Ef(e,n,t){var r=n.pendingProps;switch(Qi(n),n.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return ae(n),null;case 1:return ve(n.type)&&fl(),ae(n),null;case 3:return r=n.stateNode,wt(),B(he),B(ue),ea(),r.pendingContext&&(r.context=r.pendingContext,r.pendingContext=null),(e===null||e.child===null)&&(Hr(n)?n.flags|=4:e===null||e.memoizedState.isDehydrated&&(n.flags&256)===0||(n.flags|=1024,We!==null&&(Pi(We),We=null))),xi(e,n),ae(n),null;case 5:qi(n);var l=Fn(ur.current);if(t=n.type,e!==null&&n.stateNode!=null)Fc(e,n,t,r,l),e.ref!==n.ref&&(n.flags|=512,n.flags|=2097152);else{if(!r){if(n.stateNode===null)throw Error(x(166));return ae(n),null}if(e=Fn(Xe.current),Hr(n)){r=n.stateNode,t=n.type;var o=n.memoizedProps;switch(r[Ke]=n,r[ar]=o,e=(n.mode&1)!==0,t){case"dialog":W("cancel",r),W("close",r);break;case"iframe":case"object":case"embed":W("load",r);break;case"video":case"audio":for(l=0;l<At.length;l++)W(At[l],r);break;case"source":W("error",r);break;case"img":case"image":case"link":W("error",r),W("load",r);break;case"details":W("toggle",r);break;case"input":ns(r,o),W("invalid",r);break;case"select":r._wrapperState={wasMultiple:!!o.multiple},W("invalid",r);break;case"textarea":rs(r,o),W("invalid",r)}Ko(t,o),l=null;for(var i in o)if(o.hasOwnProperty(i)){var a=o[i];i==="children"?typeof a=="string"?r.textContent!==a&&(o.suppressHydrationWarning!==!0&&Vr(r.textContent,a,e),l=["children",a]):typeof a=="number"&&r.textContent!==""+a&&(o.suppressHydrationWarning!==!0&&Vr(r.textContent,a,e),l=["children",""+a]):bt.hasOwnProperty(i)&&a!=null&&i==="onScroll"&&W("scroll",r)}switch(t){case"input":Lr(r),ts(r,o,!0);break;case"textarea":Lr(r),ls(r);break;case"select":case"option":break;default:typeof o.onClick=="function"&&(r.onclick=dl)}r=l,n.updateQueue=r,r!==null&&(n.flags|=4)}else{i=l.nodeType===9?l:l.ownerDocument,e==="http://www.w3.org/1999/xhtml"&&(e=du(t)),e==="http://www.w3.org/1999/xhtml"?t==="script"?(e=i.createElement("div"),e.innerHTML="<script><\/script>",e=e.removeChild(e.firstChild)):typeof r.is=="string"?e=i.createElement(t,{is:r.is}):(e=i.createElement(t),t==="select"&&(i=e,r.multiple?i.multiple=!0:r.size&&(i.size=r.size))):e=i.createElementNS(e,t),e[Ke]=n,e[ar]=r,jc(e,n,!1,!1),n.stateNode=e;e:{switch(i=Yo(t,r),t){case"dialog":W("cancel",e),W("close",e),l=r;break;case"iframe":case"object":case"embed":W("load",e),l=r;break;case"video":case"audio":for(l=0;l<At.length;l++)W(At[l],e);l=r;break;case"source":W("error",e),l=r;break;case"img":case"image":case"link":W("error",e),W("load",e),l=r;break;case"details":W("toggle",e),l=r;break;case"input":ns(e,r),l=Ao(e,r),W("invalid",e);break;case"option":l=r;break;case"select":e._wrapperState={wasMultiple:!!r.multiple},l=Q({},r,{value:void 0}),W("invalid",e);break;case"textarea":rs(e,r),l=$o(e,r),W("invalid",e);break;default:l=r}Ko(t,l),a=l;for(o in a)if(a.hasOwnProperty(o)){var s=a[o];o==="style"?gu(e,s):o==="dangerouslySetInnerHTML"?(s=s?s.__html:void 0,s!=null&&fu(e,s)):o==="children"?typeof s=="string"?(t!=="textarea"||s!=="")&&Jt(e,s):typeof s=="number"&&Jt(e,""+s):o!=="suppressContentEditableWarning"&&o!=="suppressHydrationWarning"&&o!=="autoFocus"&&(bt.hasOwnProperty(o)?s!=null&&o==="onScroll"&&W("scroll",e):s!=null&&Li(e,o,s,i))}switch(t){case"input":Lr(e),ts(e,r,!1);break;case"textarea":Lr(e),ls(e);break;case"option":r.value!=null&&e.setAttribute("value",""+Cn(r.value));break;case"select":e.multiple=!!r.multiple,o=r.value,o!=null?ct(e,!!r.multiple,o,!1):r.defaultValue!=null&&ct(e,!!r.multiple,r.defaultValue,!0);break;default:typeof l.onClick=="function"&&(e.onclick=dl)}switch(t){case"button":case"input":case"select":case"textarea":r=!!r.autoFocus;break e;case"img":r=!0;break e;default:r=!1}}r&&(n.flags|=4)}n.ref!==null&&(n.flags|=512,n.flags|=2097152)}return ae(n),null;case 6:if(e&&n.stateNode!=null)Uc(e,n,e.memoizedProps,r);else{if(typeof r!="string"&&n.stateNode===null)throw Error(x(166));if(t=Fn(ur.current),Fn(Xe.current),Hr(n)){if(r=n.stateNode,t=n.memoizedProps,r[Ke]=n,(o=r.nodeValue!==t)&&(e=ke,e!==null))switch(e.tag){case 3:Vr(r.nodeValue,t,(e.mode&1)!==0);break;case 5:e.memoizedProps.suppressHydrationWarning!==!0&&Vr(r.nodeValue,t,(e.mode&1)!==0)}o&&(n.flags|=4)}else r=(t.nodeType===9?t:t.ownerDocument).createTextNode(r),r[Ke]=n,n.stateNode=r}return ae(n),null;case 13:if(B(H),r=n.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(V&&we!==null&&(n.mode&1)!==0&&(n.flags&128)===0)tc(),yt(),n.flags|=98560,o=!1;else if(o=Hr(n),r!==null&&r.dehydrated!==null){if(e===null){if(!o)throw Error(x(318));if(o=n.memoizedState,o=o!==null?o.dehydrated:null,!o)throw Error(x(317));o[Ke]=n}else yt(),(n.flags&128)===0&&(n.memoizedState=null),n.flags|=4;ae(n),o=!1}else We!==null&&(Pi(We),We=null),o=!0;if(!o)return n.flags&65536?n:null}return(n.flags&128)!==0?(n.lanes=t,n):(r=r!==null,r!==(e!==null&&e.memoizedState!==null)&&r&&(n.child.flags|=8192,(n.mode&1)!==0&&(e===null||(H.current&1)!==0?b===0&&(b=3):da())),n.updateQueue!==null&&(n.flags|=4),ae(n),null);case 4:return wt(),xi(e,n),e===null&&or(n.stateNode.containerInfo),ae(n),null;case 10:return Gi(n.type._context),ae(n),null;case 17:return ve(n.type)&&fl(),ae(n),null;case 19:if(B(H),o=n.memoizedState,o===null)return ae(n),null;if(r=(n.flags&128)!==0,i=o.rendering,i===null)if(r)Dt(o,!1);else{if(b!==0||e!==null&&(e.flags&128)!==0)for(e=n.child;e!==null;){if(i=wl(e),i!==null){for(n.flags|=128,Dt(o,!1),r=i.updateQueue,r!==null&&(n.updateQueue=r,n.flags|=4),n.subtreeFlags=0,r=t,t=n.child;t!==null;)o=t,e=r,o.flags&=14680066,i=o.alternate,i===null?(o.childLanes=0,o.lanes=e,o.child=null,o.subtreeFlags=0,o.memoizedProps=null,o.memoizedState=null,o.updateQueue=null,o.dependencies=null,o.stateNode=null):(o.childLanes=i.childLanes,o.lanes=i.lanes,o.child=i.child,o.subtreeFlags=0,o.deletions=null,o.memoizedProps=i.memoizedProps,o.memoizedState=i.memoizedState,o.updateQueue=i.updateQueue,o.type=i.type,e=i.dependencies,o.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),t=t.sibling;return U(H,H.current&1|2),n.child}e=e.sibling}o.tail!==null&&Y()>St&&(n.flags|=128,r=!0,Dt(o,!1),n.lanes=4194304)}else{if(!r)if(e=wl(i),e!==null){if(n.flags|=128,r=!0,t=e.updateQueue,t!==null&&(n.updateQueue=t,n.flags|=4),Dt(o,!0),o.tail===null&&o.tailMode==="hidden"&&!i.alternate&&!V)return ae(n),null}else 2*Y()-o.renderingStartTime>St&&t!==1073741824&&(n.flags|=128,r=!0,Dt(o,!1),n.lanes=4194304);o.isBackwards?(i.sibling=n.child,n.child=i):(t=o.last,t!==null?t.sibling=i:n.child=i,o.last=i)}return o.tail!==null?(n=o.tail,o.rendering=n,o.tail=n.sibling,o.renderingStartTime=Y(),n.sibling=null,t=H.current,U(H,r?t&1|2:t&1),n):(ae(n),null);case 22:case 23:return pa(),r=n.memoizedState!==null,e!==null&&e.memoizedState!==null!==r&&(n.flags|=8192),r&&(n.mode&1)!==0?(xe&1073741824)!==0&&(ae(n),n.subtreeFlags&6&&(n.flags|=8192)):ae(n),null;case 24:return null;case 25:return null}throw Error(x(156,n.tag))}function Pf(e,n){switch(Qi(n),n.tag){case 1:return ve(n.type)&&fl(),e=n.flags,e&65536?(n.flags=e&-65537|128,n):null;case 3:return wt(),B(he),B(ue),ea(),e=n.flags,(e&65536)!==0&&(e&128)===0?(n.flags=e&-65537|128,n):null;case 5:return qi(n),null;case 13:if(B(H),e=n.memoizedState,e!==null&&e.dehydrated!==null){if(n.alternate===null)throw Error(x(340));yt()}return e=n.flags,e&65536?(n.flags=e&-65537|128,n):null;case 19:return B(H),null;case 4:return wt(),null;case 10:return Gi(n.type._context),null;case 22:case 23:return pa(),null;case 24:return null;default:return null}}var Kr=!1,se=!1,zf=typeof WeakSet=="function"?WeakSet:Set,E=null;function st(e,n){var t=e.ref;if(t!==null)if(typeof t=="function")try{t(null)}catch(r){K(e,n,r)}else t.current=null}function wi(e,n,t){try{t()}catch(r){K(e,n,r)}}var Xs=!1;function If(e,n){if(ri=ul,e=Hu(),Hi(e)){if("selectionStart"in e)var t={start:e.selectionStart,end:e.selectionEnd};else e:{t=(t=e.ownerDocument)&&t.defaultView||window;var r=t.getSelection&&t.getSelection();if(r&&r.rangeCount!==0){t=r.anchorNode;var l=r.anchorOffset,o=r.focusNode;r=r.focusOffset;try{t.nodeType,o.nodeType}catch{t=null;break e}var i=0,a=-1,s=-1,p=0,h=0,f=e,m=null;n:for(;;){for(var w;f!==t||l!==0&&f.nodeType!==3||(a=i+l),f!==o||r!==0&&f.nodeType!==3||(s=i+r),f.nodeType===3&&(i+=f.nodeValue.length),(w=f.firstChild)!==null;)m=f,f=w;for(;;){if(f===e)break n;if(m===t&&++p===l&&(a=i),m===o&&++h===r&&(s=i),(w=f.nextSibling)!==null)break;f=m,m=f.parentNode}f=w}t=a===-1||s===-1?null:{start:a,end:s}}else t=null}t=t||{start:0,end:0}}else t=null;for(li={focusedElem:e,selectionRange:t},ul=!1,E=n;E!==null;)if(n=E,e=n.child,(n.subtreeFlags&1028)!==0&&e!==null)e.return=n,E=e;else for(;E!==null;){n=E;try{var S=n.alternate;if((n.flags&1024)!==0)switch(n.tag){case 0:case 11:case 15:break;case 1:if(S!==null){var C=S.memoizedProps,D=S.memoizedState,u=n.stateNode,c=u.getSnapshotBeforeUpdate(n.elementType===n.type?C:Fe(n.type,C),D);u.__reactInternalSnapshotBeforeUpdate=c}break;case 3:var d=n.stateNode.containerInfo;d.nodeType===1?d.textContent="":d.nodeType===9&&d.documentElement&&d.removeChild(d.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(x(163))}}catch(y){K(n,n.return,y)}if(e=n.sibling,e!==null){e.return=n.return,E=e;break}E=n.return}return S=Xs,Xs=!1,S}function Xt(e,n,t){var r=n.updateQueue;if(r=r!==null?r.lastEffect:null,r!==null){var l=r=r.next;do{if((l.tag&e)===e){var o=l.destroy;l.destroy=void 0,o!==void 0&&wi(n,t,o)}l=l.next}while(l!==r)}}function jl(e,n){if(n=n.updateQueue,n=n!==null?n.lastEffect:null,n!==null){var t=n=n.next;do{if((t.tag&e)===e){var r=t.create;t.destroy=r()}t=t.next}while(t!==n)}}function ki(e){var n=e.ref;if(n!==null){var t=e.stateNode;e.tag,e=t,typeof n=="function"?n(e):n.current=e}}function Wc(e){var n=e.alternate;n!==null&&(e.alternate=null,Wc(n)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(n=e.stateNode,n!==null&&(delete n[Ke],delete n[ar],delete n[ai],delete n[pf],delete n[df])),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}function Bc(e){return e.tag===5||e.tag===3||e.tag===4}function Gs(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||Bc(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function Si(e,n,t){var r=e.tag;if(r===5||r===6)e=e.stateNode,n?t.nodeType===8?t.parentNode.insertBefore(e,n):t.insertBefore(e,n):(t.nodeType===8?(n=t.parentNode,n.insertBefore(e,t)):(n=t,n.appendChild(e)),t=t._reactRootContainer,t!=null||n.onclick!==null||(n.onclick=dl));else if(r!==4&&(e=e.child,e!==null))for(Si(e,n,t),e=e.sibling;e!==null;)Si(e,n,t),e=e.sibling}function Ni(e,n,t){var r=e.tag;if(r===5||r===6)e=e.stateNode,n?t.insertBefore(e,n):t.appendChild(e);else if(r!==4&&(e=e.child,e!==null))for(Ni(e,n,t),e=e.sibling;e!==null;)Ni(e,n,t),e=e.sibling}var te=null,Ue=!1;function un(e,n,t){for(t=t.child;t!==null;)Ac(e,n,t),t=t.sibling}function Ac(e,n,t){if(Ye&&typeof Ye.onCommitFiberUnmount=="function")try{Ye.onCommitFiberUnmount(zl,t)}catch{}switch(t.tag){case 5:se||st(t,n);case 6:var r=te,l=Ue;te=null,un(e,n,t),te=r,Ue=l,te!==null&&(Ue?(e=te,t=t.stateNode,e.nodeType===8?e.parentNode.removeChild(t):e.removeChild(t)):te.removeChild(t.stateNode));break;case 18:te!==null&&(Ue?(e=te,t=t.stateNode,e.nodeType===8?Eo(e.parentNode,t):e.nodeType===1&&Eo(e,t),tr(e)):Eo(te,t.stateNode));break;case 4:r=te,l=Ue,te=t.stateNode.containerInfo,Ue=!0,un(e,n,t),te=r,Ue=l;break;case 0:case 11:case 14:case 15:if(!se&&(r=t.updateQueue,r!==null&&(r=r.lastEffect,r!==null))){l=r=r.next;do{var o=l,i=o.destroy;o=o.tag,i!==void 0&&((o&2)!==0||(o&4)!==0)&&wi(t,n,i),l=l.next}while(l!==r)}un(e,n,t);break;case 1:if(!se&&(st(t,n),r=t.stateNode,typeof r.componentWillUnmount=="function"))try{r.props=t.memoizedProps,r.state=t.memoizedState,r.componentWillUnmount()}catch(a){K(t,n,a)}un(e,n,t);break;case 21:un(e,n,t);break;case 22:t.mode&1?(se=(r=se)||t.memoizedState!==null,un(e,n,t),se=r):un(e,n,t);break;default:un(e,n,t)}}function Zs(e){var n=e.updateQueue;if(n!==null){e.updateQueue=null;var t=e.stateNode;t===null&&(t=e.stateNode=new zf),n.forEach(function(r){var l=Uf.bind(null,e,r);t.has(r)||(t.add(r),r.then(l,l))})}}function je(e,n){var t=n.deletions;if(t!==null)for(var r=0;r<t.length;r++){var l=t[r];try{var o=e,i=n,a=i;e:for(;a!==null;){switch(a.tag){case 5:te=a.stateNode,Ue=!1;break e;case 3:te=a.stateNode.containerInfo,Ue=!0;break e;case 4:te=a.stateNode.containerInfo,Ue=!0;break e}a=a.return}if(te===null)throw Error(x(160));Ac(o,i,l),te=null,Ue=!1;var s=l.alternate;s!==null&&(s.return=null),l.return=null}catch(p){K(l,n,p)}}if(n.subtreeFlags&12854)for(n=n.child;n!==null;)Vc(n,e),n=n.sibling}function Vc(e,n){var t=e.alternate,r=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if(je(n,e),$e(e),r&4){try{Xt(3,e,e.return),jl(3,e)}catch(C){K(e,e.return,C)}try{Xt(5,e,e.return)}catch(C){K(e,e.return,C)}}break;case 1:je(n,e),$e(e),r&512&&t!==null&&st(t,t.return);break;case 5:if(je(n,e),$e(e),r&512&&t!==null&&st(t,t.return),e.flags&32){var l=e.stateNode;try{Jt(l,"")}catch(C){K(e,e.return,C)}}if(r&4&&(l=e.stateNode,l!=null)){var o=e.memoizedProps,i=t!==null?t.memoizedProps:o,a=e.type,s=e.updateQueue;if(e.updateQueue=null,s!==null)try{a==="input"&&o.type==="radio"&&o.name!=null&&cu(l,o),Yo(a,i);var p=Yo(a,o);for(i=0;i<s.length;i+=2){var h=s[i],f=s[i+1];h==="style"?gu(l,f):h==="dangerouslySetInnerHTML"?fu(l,f):h==="children"?Jt(l,f):Li(l,h,f,p)}switch(a){case"input":Vo(l,o);break;case"textarea":pu(l,o);break;case"select":var m=l._wrapperState.wasMultiple;l._wrapperState.wasMultiple=!!o.multiple;var w=o.value;w!=null?ct(l,!!o.multiple,w,!1):m!==!!o.multiple&&(o.defaultValue!=null?ct(l,!!o.multiple,o.defaultValue,!0):ct(l,!!o.multiple,o.multiple?[]:"",!1))}l[ar]=o}catch(C){K(e,e.return,C)}}break;case 6:if(je(n,e),$e(e),r&4){if(e.stateNode===null)throw Error(x(162));l=e.stateNode,o=e.memoizedProps;try{l.nodeValue=o}catch(C){K(e,e.return,C)}}break;case 3:if(je(n,e),$e(e),r&4&&t!==null&&t.memoizedState.isDehydrated)try{tr(n.containerInfo)}catch(C){K(e,e.return,C)}break;case 4:je(n,e),$e(e);break;case 13:je(n,e),$e(e),l=e.child,l.flags&8192&&(o=l.memoizedState!==null,l.stateNode.isHidden=o,!o||l.alternate!==null&&l.alternate.memoizedState!==null||(ua=Y())),r&4&&Zs(e);break;case 22:if(h=t!==null&&t.memoizedState!==null,e.mode&1?(se=(p=se)||h,je(n,e),se=p):je(n,e),$e(e),r&8192){if(p=e.memoizedState!==null,(e.stateNode.isHidden=p)&&!h&&(e.mode&1)!==0)for(E=e,h=e.child;h!==null;){for(f=E=h;E!==null;){switch(m=E,w=m.child,m.tag){case 0:case 11:case 14:case 15:Xt(4,m,m.return);break;case 1:st(m,m.return);var S=m.stateNode;if(typeof S.componentWillUnmount=="function"){r=m,t=m.return;try{n=r,S.props=n.memoizedProps,S.state=n.memoizedState,S.componentWillUnmount()}catch(C){K(r,t,C)}}break;case 5:st(m,m.return);break;case 22:if(m.memoizedState!==null){Js(f);continue}}w!==null?(w.return=m,E=w):Js(f)}h=h.sibling}e:for(h=null,f=e;;){if(f.tag===5){if(h===null){h=f;try{l=f.stateNode,p?(o=l.style,typeof o.setProperty=="function"?o.setProperty("display","none","important"):o.display="none"):(a=f.stateNode,s=f.memoizedProps.style,i=s!=null&&s.hasOwnProperty("display")?s.display:null,a.style.display=mu("display",i))}catch(C){K(e,e.return,C)}}}else if(f.tag===6){if(h===null)try{f.stateNode.nodeValue=p?"":f.memoizedProps}catch(C){K(e,e.return,C)}}else if((f.tag!==22&&f.tag!==23||f.memoizedState===null||f===e)&&f.child!==null){f.child.return=f,f=f.child;continue}if(f===e)break e;for(;f.sibling===null;){if(f.return===null||f.return===e)break e;h===f&&(h=null),f=f.return}h===f&&(h=null),f.sibling.return=f.return,f=f.sibling}}break;case 19:je(n,e),$e(e),r&4&&Zs(e);break;case 21:break;default:je(n,e),$e(e)}}function $e(e){var n=e.flags;if(n&2){try{e:{for(var t=e.return;t!==null;){if(Bc(t)){var r=t;break e}t=t.return}throw Error(x(160))}switch(r.tag){case 5:var l=r.stateNode;r.flags&32&&(Jt(l,""),r.flags&=-33);var o=Gs(e);Ni(e,o,l);break;case 3:case 4:var i=r.stateNode.containerInfo,a=Gs(e);Si(e,a,i);break;default:throw Error(x(161))}}catch(s){K(e,e.return,s)}e.flags&=-3}n&4096&&(e.flags&=-4097)}function Lf(e,n,t){E=e,Hc(e,n,t)}function Hc(e,n,t){for(var r=(e.mode&1)!==0;E!==null;){var l=E,o=l.child;if(l.tag===22&&r){var i=l.memoizedState!==null||Kr;if(!i){var a=l.alternate,s=a!==null&&a.memoizedState!==null||se;a=Kr;var p=se;if(Kr=i,(se=s)&&!p)for(E=l;E!==null;)i=E,s=i.child,i.tag===22&&i.memoizedState!==null?qs(l):s!==null?(s.return=i,E=s):qs(l);for(;o!==null;)E=o,Hc(o,n,t),o=o.sibling;E=l,Kr=a,se=p}bs(e,n,t)}else(l.subtreeFlags&8772)!==0&&o!==null?(o.return=l,E=o):bs(e,n,t)}}function bs(e){for(;E!==null;){var n=E;if((n.flags&8772)!==0){var t=n.alternate;try{if((n.flags&8772)!==0)switch(n.tag){case 0:case 11:case 15:se||jl(5,n);break;case 1:var r=n.stateNode;if(n.flags&4&&!se)if(t===null)r.componentDidMount();else{var l=n.elementType===n.type?t.memoizedProps:Fe(n.type,t.memoizedProps);r.componentDidUpdate(l,t.memoizedState,r.__reactInternalSnapshotBeforeUpdate)}var o=n.updateQueue;o!==null&&Ds(n,o,r);break;case 3:var i=n.updateQueue;if(i!==null){if(t=null,n.child!==null)switch(n.child.tag){case 5:t=n.child.stateNode;break;case 1:t=n.child.stateNode}Ds(n,i,t)}break;case 5:var a=n.stateNode;if(t===null&&n.flags&4){t=a;var s=n.memoizedProps;switch(n.type){case"button":case"input":case"select":case"textarea":s.autoFocus&&t.focus();break;case"img":s.src&&(t.src=s.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(n.memoizedState===null){var p=n.alternate;if(p!==null){var h=p.memoizedState;if(h!==null){var f=h.dehydrated;f!==null&&tr(f)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(x(163))}se||n.flags&512&&ki(n)}catch(m){K(n,n.return,m)}}if(n===e){E=null;break}if(t=n.sibling,t!==null){t.return=n.return,E=t;break}E=n.return}}function Js(e){for(;E!==null;){var n=E;if(n===e){E=null;break}var t=n.sibling;if(t!==null){t.return=n.return,E=t;break}E=n.return}}function qs(e){for(;E!==null;){var n=E;try{switch(n.tag){case 0:case 11:case 15:var t=n.return;try{jl(4,n)}catch(s){K(n,t,s)}break;case 1:var r=n.stateNode;if(typeof r.componentDidMount=="function"){var l=n.return;try{r.componentDidMount()}catch(s){K(n,l,s)}}var o=n.return;try{ki(n)}catch(s){K(n,o,s)}break;case 5:var i=n.return;try{ki(n)}catch(s){K(n,i,s)}}}catch(s){K(n,n.return,s)}if(n===e){E=null;break}var a=n.sibling;if(a!==null){a.return=n.return,E=a;break}E=n.return}}var Mf=Math.ceil,Nl=on.ReactCurrentDispatcher,aa=on.ReactCurrentOwner,Le=on.ReactCurrentBatchConfig,T=0,ne=null,X=null,re=0,xe=0,ut=Pn(0),b=0,fr=null,Hn=0,Fl=0,sa=0,Gt=null,me=null,ua=0,St=1/0,Ze=null,Cl=!1,Ci=null,kn=null,Yr=!1,gn=null,_l=0,Zt=0,_i=null,nl=-1,tl=0;function de(){return(T&6)!==0?Y():nl!==-1?nl:nl=Y()}function Sn(e){return(e.mode&1)===0?1:(T&2)!==0&&re!==0?re&-re:mf.transition!==null?(tl===0&&(tl=Pu()),tl):(e=O,e!==0||(e=window.event,e=e===void 0?16:Ou(e.type)),e)}function Ae(e,n,t,r){if(50<Zt)throw Zt=0,_i=null,Error(x(185));mr(e,t,r),((T&2)===0||e!==ne)&&(e===ne&&((T&2)===0&&(Fl|=t),b===4&&fn(e,re)),ye(e,r),t===1&&T===0&&(n.mode&1)===0&&(St=Y()+500,Rl&&zn()))}function ye(e,n){var t=e.callbackNode;gd(e,n);var r=sl(e,e===ne?re:0);if(r===0)t!==null&&as(t),e.callbackNode=null,e.callbackPriority=0;else if(n=r&-r,e.callbackPriority!==n){if(t!=null&&as(t),n===1)e.tag===0?ff(eu.bind(null,e)):qu(eu.bind(null,e)),uf(function(){(T&6)===0&&zn()}),t=null;else{switch(zu(r)){case 1:t=Di;break;case 4:t=_u;break;case 16:t=al;break;case 536870912:t=Eu;break;default:t=al}t=bc(t,$c.bind(null,e))}e.callbackPriority=n,e.callbackNode=t}}function $c(e,n){if(nl=-1,tl=0,(T&6)!==0)throw Error(x(327));var t=e.callbackNode;if(gt()&&e.callbackNode!==t)return null;var r=sl(e,e===ne?re:0);if(r===0)return null;if((r&30)!==0||(r&e.expiredLanes)!==0||n)n=El(e,r);else{n=r;var l=T;T|=2;var o=Kc();(ne!==e||re!==n)&&(Ze=null,St=Y()+500,Un(e,n));do try{Of();break}catch(a){Qc(e,a)}while(!0);Xi(),Nl.current=o,T=l,X!==null?n=0:(ne=null,re=0,n=b)}if(n!==0){if(n===2&&(l=Jo(e),l!==0&&(r=l,n=Ei(e,l))),n===1)throw t=fr,Un(e,0),fn(e,r),ye(e,Y()),t;if(n===6)fn(e,r);else{if(l=e.current.alternate,(r&30)===0&&!Tf(l)&&(n=El(e,r),n===2&&(o=Jo(e),o!==0&&(r=o,n=Ei(e,o))),n===1))throw t=fr,Un(e,0),fn(e,r),ye(e,Y()),t;switch(e.finishedWork=l,e.finishedLanes=r,n){case 0:case 1:throw Error(x(345));case 2:On(e,me,Ze);break;case 3:if(fn(e,r),(r&130023424)===r&&(n=ua+500-Y(),10<n)){if(sl(e,0)!==0)break;if(l=e.suspendedLanes,(l&r)!==r){de(),e.pingedLanes|=e.suspendedLanes&l;break}e.timeoutHandle=ii(On.bind(null,e,me,Ze),n);break}On(e,me,Ze);break;case 4:if(fn(e,r),(r&4194240)===r)break;for(n=e.eventTimes,l=-1;0<r;){var i=31-Be(r);o=1<<i,i=n[i],i>l&&(l=i),r&=~o}if(r=l,r=Y()-r,r=(120>r?120:480>r?480:1080>r?1080:1920>r?1920:3e3>r?3e3:4320>r?4320:1960*Mf(r/1960))-r,10<r){e.timeoutHandle=ii(On.bind(null,e,me,Ze),r);break}On(e,me,Ze);break;case 5:On(e,me,Ze);break;default:throw Error(x(329))}}}return ye(e,Y()),e.callbackNode===t?$c.bind(null,e):null}function Ei(e,n){var t=Gt;return e.current.memoizedState.isDehydrated&&(Un(e,n).flags|=256),e=El(e,n),e!==2&&(n=me,me=t,n!==null&&Pi(n)),e}function Pi(e){me===null?me=e:me.push.apply(me,e)}function Tf(e){for(var n=e;;){if(n.flags&16384){var t=n.updateQueue;if(t!==null&&(t=t.stores,t!==null))for(var r=0;r<t.length;r++){var l=t[r],o=l.getSnapshot;l=l.value;try{if(!Ve(o(),l))return!1}catch{return!1}}}if(t=n.child,n.subtreeFlags&16384&&t!==null)t.return=n,n=t;else{if(n===e)break;for(;n.sibling===null;){if(n.return===null||n.return===e)return!0;n=n.return}n.sibling.return=n.return,n=n.sibling}}return!0}function fn(e,n){for(n&=~sa,n&=~Fl,e.suspendedLanes|=n,e.pingedLanes&=~n,e=e.expirationTimes;0<n;){var t=31-Be(n),r=1<<t;e[t]=-1,n&=~r}}function eu(e){if((T&6)!==0)throw Error(x(327));gt();var n=sl(e,0);if((n&1)===0)return ye(e,Y()),null;var t=El(e,n);if(e.tag!==0&&t===2){var r=Jo(e);r!==0&&(n=r,t=Ei(e,r))}if(t===1)throw t=fr,Un(e,0),fn(e,n),ye(e,Y()),t;if(t===6)throw Error(x(345));return e.finishedWork=e.current.alternate,e.finishedLanes=n,On(e,me,Ze),ye(e,Y()),null}function ca(e,n){var t=T;T|=1;try{return e(n)}finally{T=t,T===0&&(St=Y()+500,Rl&&zn())}}function $n(e){gn!==null&&gn.tag===0&&(T&6)===0&&gt();var n=T;T|=1;var t=Le.transition,r=O;try{if(Le.transition=null,O=1,e)return e()}finally{O=r,Le.transition=t,T=n,(T&6)===0&&zn()}}function pa(){xe=ut.current,B(ut)}function Un(e,n){e.finishedWork=null,e.finishedLanes=0;var t=e.timeoutHandle;if(t!==-1&&(e.timeoutHandle=-1,sf(t)),X!==null)for(t=X.return;t!==null;){var r=t;switch(Qi(r),r.tag){case 1:r=r.type.childContextTypes,r!=null&&fl();break;case 3:wt(),B(he),B(ue),ea();break;case 5:qi(r);break;case 4:wt();break;case 13:B(H);break;case 19:B(H);break;case 10:Gi(r.type._context);break;case 22:case 23:pa()}t=t.return}if(ne=e,X=e=Nn(e.current,null),re=xe=n,b=0,fr=null,sa=Fl=Hn=0,me=Gt=null,jn!==null){for(n=0;n<jn.length;n++)if(t=jn[n],r=t.interleaved,r!==null){t.interleaved=null;var l=r.next,o=t.pending;if(o!==null){var i=o.next;o.next=l,r.next=i}t.pending=r}jn=null}return e}function Qc(e,n){do{var t=X;try{if(Xi(),Jr.current=Sl,kl){for(var r=$.memoizedState;r!==null;){var l=r.queue;l!==null&&(l.pending=null),r=r.next}kl=!1}if(Vn=0,ee=Z=$=null,Yt=!1,cr=0,aa.current=null,t===null||t.return===null){b=1,fr=n,X=null;break}e:{var o=e,i=t.return,a=t,s=n;if(n=re,a.flags|=32768,s!==null&&typeof s=="object"&&typeof s.then=="function"){var p=s,h=a,f=h.tag;if((h.mode&1)===0&&(f===0||f===11||f===15)){var m=h.alternate;m?(h.updateQueue=m.updateQueue,h.memoizedState=m.memoizedState,h.lanes=m.lanes):(h.updateQueue=null,h.memoizedState=null)}var w=As(i);if(w!==null){w.flags&=-257,Vs(w,i,a,o,n),w.mode&1&&Bs(o,p,n),n=w,s=p;var S=n.updateQueue;if(S===null){var C=new Set;C.add(s),n.updateQueue=C}else S.add(s);break e}else{if((n&1)===0){Bs(o,p,n),da();break e}s=Error(x(426))}}else if(V&&a.mode&1){var D=As(i);if(D!==null){(D.flags&65536)===0&&(D.flags|=256),Vs(D,i,a,o,n),Ki(kt(s,a));break e}}o=s=kt(s,a),b!==4&&(b=2),Gt===null?Gt=[o]:Gt.push(o),o=i;do{switch(o.tag){case 3:o.flags|=65536,n&=-n,o.lanes|=n;var u=zc(o,s,n);Os(o,u);break e;case 1:a=s;var c=o.type,d=o.stateNode;if((o.flags&128)===0&&(typeof c.getDerivedStateFromError=="function"||d!==null&&typeof d.componentDidCatch=="function"&&(kn===null||!kn.has(d)))){o.flags|=65536,n&=-n,o.lanes|=n;var y=Ic(o,a,n);Os(o,y);break e}}o=o.return}while(o!==null)}Xc(t)}catch(z){n=z,X===t&&t!==null&&(X=t=t.return);continue}break}while(!0)}function Kc(){var e=Nl.current;return Nl.current=Sl,e===null?Sl:e}function da(){(b===0||b===3||b===2)&&(b=4),ne===null||(Hn&268435455)===0&&(Fl&268435455)===0||fn(ne,re)}function El(e,n){var t=T;T|=2;var r=Kc();(ne!==e||re!==n)&&(Ze=null,Un(e,n));do try{Rf();break}catch(l){Qc(e,l)}while(!0);if(Xi(),T=t,Nl.current=r,X!==null)throw Error(x(261));return ne=null,re=0,b}function Rf(){for(;X!==null;)Yc(X)}function Of(){for(;X!==null&&!id();)Yc(X)}function Yc(e){var n=Zc(e.alternate,e,xe);e.memoizedProps=e.pendingProps,n===null?Xc(e):X=n,aa.current=null}function Xc(e){var n=e;do{var t=n.alternate;if(e=n.return,(n.flags&32768)===0){if(t=Ef(t,n,xe),t!==null){X=t;return}}else{if(t=Pf(t,n),t!==null){t.flags&=32767,X=t;return}if(e!==null)e.flags|=32768,e.subtreeFlags=0,e.deletions=null;else{b=6,X=null;return}}if(n=n.sibling,n!==null){X=n;return}X=n=e}while(n!==null);b===0&&(b=5)}function On(e,n,t){var r=O,l=Le.transition;try{Le.transition=null,O=1,Df(e,n,t,r)}finally{Le.transition=l,O=r}return null}function Df(e,n,t,r){do gt();while(gn!==null);if((T&6)!==0)throw Error(x(327));t=e.finishedWork;var l=e.finishedLanes;if(t===null)return null;if(e.finishedWork=null,e.finishedLanes=0,t===e.current)throw Error(x(177));e.callbackNode=null,e.callbackPriority=0;var o=t.lanes|t.childLanes;if(hd(e,o),e===ne&&(X=ne=null,re=0),(t.subtreeFlags&2064)===0&&(t.flags&2064)===0||Yr||(Yr=!0,bc(al,function(){return gt(),null})),o=(t.flags&15990)!==0,(t.subtreeFlags&15990)!==0||o){o=Le.transition,Le.transition=null;var i=O;O=1;var a=T;T|=4,aa.current=null,If(e,t),Vc(t,e),tf(li),ul=!!ri,li=ri=null,e.current=t,Lf(t,e,l),ad(),T=a,O=i,Le.transition=o}else e.current=t;if(Yr&&(Yr=!1,gn=e,_l=l),o=e.pendingLanes,o===0&&(kn=null),cd(t.stateNode,r),ye(e,Y()),n!==null)for(r=e.onRecoverableError,t=0;t<n.length;t++)l=n[t],r(l.value,{componentStack:l.stack,digest:l.digest});if(Cl)throw Cl=!1,e=Ci,Ci=null,e;return(_l&1)!==0&&e.tag!==0&&gt(),o=e.pendingLanes,(o&1)!==0?e===_i?Zt++:(Zt=0,_i=e):Zt=0,zn(),null}function gt(){if(gn!==null){var e=zu(_l),n=Le.transition,t=O;try{if(Le.transition=null,O=16>e?16:e,gn===null)var r=!1;else{if(e=gn,gn=null,_l=0,(T&6)!==0)throw Error(x(331));var l=T;for(T|=4,E=e.current;E!==null;){var o=E,i=o.child;if((E.flags&16)!==0){var a=o.deletions;if(a!==null){for(var s=0;s<a.length;s++){var p=a[s];for(E=p;E!==null;){var h=E;switch(h.tag){case 0:case 11:case 15:Xt(8,h,o)}var f=h.child;if(f!==null)f.return=h,E=f;else for(;E!==null;){h=E;var m=h.sibling,w=h.return;if(Wc(h),h===p){E=null;break}if(m!==null){m.return=w,E=m;break}E=w}}}var S=o.alternate;if(S!==null){var C=S.child;if(C!==null){S.child=null;do{var D=C.sibling;C.sibling=null,C=D}while(C!==null)}}E=o}}if((o.subtreeFlags&2064)!==0&&i!==null)i.return=o,E=i;else e:for(;E!==null;){if(o=E,(o.flags&2048)!==0)switch(o.tag){case 0:case 11:case 15:Xt(9,o,o.return)}var u=o.sibling;if(u!==null){u.return=o.return,E=u;break e}E=o.return}}var c=e.current;for(E=c;E!==null;){i=E;var d=i.child;if((i.subtreeFlags&2064)!==0&&d!==null)d.return=i,E=d;else e:for(i=c;E!==null;){if(a=E,(a.flags&2048)!==0)try{switch(a.tag){case 0:case 11:case 15:jl(9,a)}}catch(z){K(a,a.return,z)}if(a===i){E=null;break e}var y=a.sibling;if(y!==null){y.return=a.return,E=y;break e}E=a.return}}if(T=l,zn(),Ye&&typeof Ye.onPostCommitFiberRoot=="function")try{Ye.onPostCommitFiberRoot(zl,e)}catch{}r=!0}return r}finally{O=t,Le.transition=n}}return!1}function nu(e,n,t){n=kt(t,n),n=zc(e,n,1),e=wn(e,n,1),n=de(),e!==null&&(mr(e,1,n),ye(e,n))}function K(e,n,t){if(e.tag===3)nu(e,e,t);else for(;n!==null;){if(n.tag===3){nu(n,e,t);break}else if(n.tag===1){var r=n.stateNode;if(typeof n.type.getDerivedStateFromError=="function"||typeof r.componentDidCatch=="function"&&(kn===null||!kn.has(r))){e=kt(t,e),e=Ic(n,e,1),n=wn(n,e,1),e=de(),n!==null&&(mr(n,1,e),ye(n,e));break}}n=n.return}}function jf(e,n,t){var r=e.pingCache;r!==null&&r.delete(n),n=de(),e.pingedLanes|=e.suspendedLanes&t,ne===e&&(re&t)===t&&(b===4||b===3&&(re&130023424)===re&&500>Y()-ua?Un(e,0):sa|=t),ye(e,n)}function Gc(e,n){n===0&&((e.mode&1)===0?n=1:(n=Rr,Rr<<=1,(Rr&130023424)===0&&(Rr=4194304)));var t=de();e=rn(e,n),e!==null&&(mr(e,n,t),ye(e,t))}function Ff(e){var n=e.memoizedState,t=0;n!==null&&(t=n.retryLane),Gc(e,t)}function Uf(e,n){var t=0;switch(e.tag){case 13:var r=e.stateNode,l=e.memoizedState;l!==null&&(t=l.retryLane);break;case 19:r=e.stateNode;break;default:throw Error(x(314))}r!==null&&r.delete(n),Gc(e,t)}var Zc;Zc=function(e,n,t){if(e!==null)if(e.memoizedProps!==n.pendingProps||he.current)ge=!0;else{if((e.lanes&t)===0&&(n.flags&128)===0)return ge=!1,_f(e,n,t);ge=(e.flags&131072)!==0}else ge=!1,V&&(n.flags&1048576)!==0&&ec(n,hl,n.index);switch(n.lanes=0,n.tag){case 2:var r=n.type;el(e,n),e=n.pendingProps;var l=vt(n,ue.current);mt(n,t),l=ta(null,n,r,e,l,t);var o=ra();return n.flags|=1,typeof l=="object"&&l!==null&&typeof l.render=="function"&&l.$$typeof===void 0?(n.tag=1,n.memoizedState=null,n.updateQueue=null,ve(r)?(o=!0,ml(n)):o=!1,n.memoizedState=l.state!==null&&l.state!==void 0?l.state:null,bi(n),l.updater=Dl,n.stateNode=l,l._reactInternals=n,fi(n,r,e,t),n=hi(null,n,r,!0,o,t)):(n.tag=0,V&&o&&$i(n),pe(null,n,l,t),n=n.child),n;case 16:r=n.elementType;e:{switch(el(e,n),e=n.pendingProps,l=r._init,r=l(r._payload),n.type=r,l=n.tag=Bf(r),e=Fe(r,e),l){case 0:n=gi(null,n,r,e,t);break e;case 1:n=Qs(null,n,r,e,t);break e;case 11:n=Hs(null,n,r,e,t);break e;case 14:n=$s(null,n,r,Fe(r.type,e),t);break e}throw Error(x(306,r,""))}return n;case 0:return r=n.type,l=n.pendingProps,l=n.elementType===r?l:Fe(r,l),gi(e,n,r,l,t);case 1:return r=n.type,l=n.pendingProps,l=n.elementType===r?l:Fe(r,l),Qs(e,n,r,l,t);case 3:e:{if(Rc(n),e===null)throw Error(x(387));r=n.pendingProps,o=n.memoizedState,l=o.element,ic(e,n),xl(n,r,null,t);var i=n.memoizedState;if(r=i.element,o.isDehydrated)if(o={element:r,isDehydrated:!1,cache:i.cache,pendingSuspenseBoundaries:i.pendingSuspenseBoundaries,transitions:i.transitions},n.updateQueue.baseState=o,n.memoizedState=o,n.flags&256){l=kt(Error(x(423)),n),n=Ks(e,n,r,t,l);break e}else if(r!==l){l=kt(Error(x(424)),n),n=Ks(e,n,r,t,l);break e}else for(we=xn(n.stateNode.containerInfo.firstChild),ke=n,V=!0,We=null,t=lc(n,null,r,t),n.child=t;t;)t.flags=t.flags&-3|4096,t=t.sibling;else{if(yt(),r===l){n=ln(e,n,t);break e}pe(e,n,r,t)}n=n.child}return n;case 5:return ac(n),e===null&&ci(n),r=n.type,l=n.pendingProps,o=e!==null?e.memoizedProps:null,i=l.children,oi(r,l)?i=null:o!==null&&oi(r,o)&&(n.flags|=32),Tc(e,n),pe(e,n,i,t),n.child;case 6:return e===null&&ci(n),null;case 13:return Oc(e,n,t);case 4:return Ji(n,n.stateNode.containerInfo),r=n.pendingProps,e===null?n.child=xt(n,null,r,t):pe(e,n,r,t),n.child;case 11:return r=n.type,l=n.pendingProps,l=n.elementType===r?l:Fe(r,l),Hs(e,n,r,l,t);case 7:return pe(e,n,n.pendingProps,t),n.child;case 8:return pe(e,n,n.pendingProps.children,t),n.child;case 12:return pe(e,n,n.pendingProps.children,t),n.child;case 10:e:{if(r=n.type._context,l=n.pendingProps,o=n.memoizedProps,i=l.value,U(vl,r._currentValue),r._currentValue=i,o!==null)if(Ve(o.value,i)){if(o.children===l.children&&!he.current){n=ln(e,n,t);break e}}else for(o=n.child,o!==null&&(o.return=n);o!==null;){var a=o.dependencies;if(a!==null){i=o.child;for(var s=a.firstContext;s!==null;){if(s.context===r){if(o.tag===1){s=en(-1,t&-t),s.tag=2;var p=o.updateQueue;if(p!==null){p=p.shared;var h=p.pending;h===null?s.next=s:(s.next=h.next,h.next=s),p.pending=s}}o.lanes|=t,s=o.alternate,s!==null&&(s.lanes|=t),pi(o.return,t,n),a.lanes|=t;break}s=s.next}}else if(o.tag===10)i=o.type===n.type?null:o.child;else if(o.tag===18){if(i=o.return,i===null)throw Error(x(341));i.lanes|=t,a=i.alternate,a!==null&&(a.lanes|=t),pi(i,t,n),i=o.sibling}else i=o.child;if(i!==null)i.return=o;else for(i=o;i!==null;){if(i===n){i=null;break}if(o=i.sibling,o!==null){o.return=i.return,i=o;break}i=i.return}o=i}pe(e,n,l.children,t),n=n.child}return n;case 9:return l=n.type,r=n.pendingProps.children,mt(n,t),l=Me(l),r=r(l),n.flags|=1,pe(e,n,r,t),n.child;case 14:return r=n.type,l=Fe(r,n.pendingProps),l=Fe(r.type,l),$s(e,n,r,l,t);case 15:return Lc(e,n,n.type,n.pendingProps,t);case 17:return r=n.type,l=n.pendingProps,l=n.elementType===r?l:Fe(r,l),el(e,n),n.tag=1,ve(r)?(e=!0,ml(n)):e=!1,mt(n,t),Pc(n,r,l),fi(n,r,l,t),hi(null,n,r,!0,e,t);case 19:return Dc(e,n,t);case 22:return Mc(e,n,t)}throw Error(x(156,n.tag))};function bc(e,n){return Cu(e,n)}function Wf(e,n,t,r){this.tag=e,this.key=t,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=n,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Ie(e,n,t,r){return new Wf(e,n,t,r)}function fa(e){return e=e.prototype,!(!e||!e.isReactComponent)}function Bf(e){if(typeof e=="function")return fa(e)?1:0;if(e!=null){if(e=e.$$typeof,e===Ti)return 11;if(e===Ri)return 14}return 2}function Nn(e,n){var t=e.alternate;return t===null?(t=Ie(e.tag,n,e.key,e.mode),t.elementType=e.elementType,t.type=e.type,t.stateNode=e.stateNode,t.alternate=e,e.alternate=t):(t.pendingProps=n,t.type=e.type,t.flags=0,t.subtreeFlags=0,t.deletions=null),t.flags=e.flags&14680064,t.childLanes=e.childLanes,t.lanes=e.lanes,t.child=e.child,t.memoizedProps=e.memoizedProps,t.memoizedState=e.memoizedState,t.updateQueue=e.updateQueue,n=e.dependencies,t.dependencies=n===null?null:{lanes:n.lanes,firstContext:n.firstContext},t.sibling=e.sibling,t.index=e.index,t.ref=e.ref,t}function rl(e,n,t,r,l,o){var i=2;if(r=e,typeof e=="function")fa(e)&&(i=1);else if(typeof e=="string")i=5;else e:switch(e){case qn:return Wn(t.children,l,o,n);case Mi:i=8,l|=8;break;case Fo:return e=Ie(12,t,n,l|2),e.elementType=Fo,e.lanes=o,e;case Uo:return e=Ie(13,t,n,l),e.elementType=Uo,e.lanes=o,e;case Wo:return e=Ie(19,t,n,l),e.elementType=Wo,e.lanes=o,e;case au:return Ul(t,l,o,n);default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case ou:i=10;break e;case iu:i=9;break e;case Ti:i=11;break e;case Ri:i=14;break e;case cn:i=16,r=null;break e}throw Error(x(130,e==null?e:typeof e,""))}return n=Ie(i,t,n,l),n.elementType=e,n.type=r,n.lanes=o,n}function Wn(e,n,t,r){return e=Ie(7,e,r,n),e.lanes=t,e}function Ul(e,n,t,r){return e=Ie(22,e,r,n),e.elementType=au,e.lanes=t,e.stateNode={isHidden:!1},e}function Oo(e,n,t){return e=Ie(6,e,null,n),e.lanes=t,e}function Do(e,n,t){return n=Ie(4,e.children!==null?e.children:[],e.key,n),n.lanes=t,n.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},n}function Af(e,n,t,r,l){this.tag=n,this.containerInfo=e,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=yo(0),this.expirationTimes=yo(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=yo(0),this.identifierPrefix=r,this.onRecoverableError=l,this.mutableSourceEagerHydrationData=null}function ma(e,n,t,r,l,o,i,a,s){return e=new Af(e,n,t,a,s),n===1?(n=1,o===!0&&(n|=8)):n=0,o=Ie(3,null,null,n),e.current=o,o.stateNode=e,o.memoizedState={element:r,isDehydrated:t,cache:null,transitions:null,pendingSuspenseBoundaries:null},bi(o),e}function Vf(e,n,t){var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:Jn,key:r==null?null:""+r,children:e,containerInfo:n,implementation:t}}function Jc(e){if(!e)return _n;e=e._reactInternals;e:{if(Kn(e)!==e||e.tag!==1)throw Error(x(170));var n=e;do{switch(n.tag){case 3:n=n.stateNode.context;break e;case 1:if(ve(n.type)){n=n.stateNode.__reactInternalMemoizedMergedChildContext;break e}}n=n.return}while(n!==null);throw Error(x(171))}if(e.tag===1){var t=e.type;if(ve(t))return Ju(e,t,n)}return n}function qc(e,n,t,r,l,o,i,a,s){return e=ma(t,r,!0,e,l,o,i,a,s),e.context=Jc(null),t=e.current,r=de(),l=Sn(t),o=en(r,l),o.callback=n??null,wn(t,o,l),e.current.lanes=l,mr(e,l,r),ye(e,r),e}function Wl(e,n,t,r){var l=n.current,o=de(),i=Sn(l);return t=Jc(t),n.context===null?n.context=t:n.pendingContext=t,n=en(o,i),n.payload={element:e},r=r===void 0?null:r,r!==null&&(n.callback=r),e=wn(l,n,i),e!==null&&(Ae(e,l,i,o),br(e,l,i)),i}function Pl(e){return e=e.current,e.child?(e.child.tag===5,e.child.stateNode):null}function tu(e,n){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var t=e.retryLane;e.retryLane=t!==0&&t<n?t:n}}function ga(e,n){tu(e,n),(e=e.alternate)&&tu(e,n)}function Hf(){return null}var ep=typeof reportError=="function"?reportError:function(e){console.error(e)};function ha(e){this._internalRoot=e}Bl.prototype.render=ha.prototype.render=function(e){var n=this._internalRoot;if(n===null)throw Error(x(409));Wl(e,n,null,null)};Bl.prototype.unmount=ha.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var n=e.containerInfo;$n(function(){Wl(null,e,null,null)}),n[tn]=null}};function Bl(e){this._internalRoot=e}Bl.prototype.unstable_scheduleHydration=function(e){if(e){var n=Mu();e={blockedOn:null,target:e,priority:n};for(var t=0;t<dn.length&&n!==0&&n<dn[t].priority;t++);dn.splice(t,0,e),t===0&&Ru(e)}};function va(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function Al(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11&&(e.nodeType!==8||e.nodeValue!==" react-mount-point-unstable "))}function ru(){}function $f(e,n,t,r,l){if(l){if(typeof r=="function"){var o=r;r=function(){var p=Pl(i);o.call(p)}}var i=qc(n,r,e,0,null,!1,!1,"",ru);return e._reactRootContainer=i,e[tn]=i.current,or(e.nodeType===8?e.parentNode:e),$n(),i}for(;l=e.lastChild;)e.removeChild(l);if(typeof r=="function"){var a=r;r=function(){var p=Pl(s);a.call(p)}}var s=ma(e,0,!1,null,null,!1,!1,"",ru);return e._reactRootContainer=s,e[tn]=s.current,or(e.nodeType===8?e.parentNode:e),$n(function(){Wl(n,s,t,r)}),s}function Vl(e,n,t,r,l){var o=t._reactRootContainer;if(o){var i=o;if(typeof l=="function"){var a=l;l=function(){var s=Pl(i);a.call(s)}}Wl(n,i,e,l)}else i=$f(t,n,e,l,r);return Pl(i)}Iu=function(e){switch(e.tag){case 3:var n=e.stateNode;if(n.current.memoizedState.isDehydrated){var t=Bt(n.pendingLanes);t!==0&&(ji(n,t|1),ye(n,Y()),(T&6)===0&&(St=Y()+500,zn()))}break;case 13:$n(function(){var r=rn(e,1);if(r!==null){var l=de();Ae(r,e,1,l)}}),ga(e,1)}};Fi=function(e){if(e.tag===13){var n=rn(e,134217728);if(n!==null){var t=de();Ae(n,e,134217728,t)}ga(e,134217728)}};Lu=function(e){if(e.tag===13){var n=Sn(e),t=rn(e,n);if(t!==null){var r=de();Ae(t,e,n,r)}ga(e,n)}};Mu=function(){return O};Tu=function(e,n){var t=O;try{return O=e,n()}finally{O=t}};Go=function(e,n,t){switch(n){case"input":if(Vo(e,t),n=t.name,t.type==="radio"&&n!=null){for(t=e;t.parentNode;)t=t.parentNode;for(t=t.querySelectorAll("input[name="+JSON.stringify(""+n)+'][type="radio"]'),n=0;n<t.length;n++){var r=t[n];if(r!==e&&r.form===e.form){var l=Tl(r);if(!l)throw Error(x(90));uu(r),Vo(r,l)}}}break;case"textarea":pu(e,t);break;case"select":n=t.value,n!=null&&ct(e,!!t.multiple,n,!1)}};yu=ca;xu=$n;var Qf={usingClientEntryPoint:!1,Events:[hr,rt,Tl,hu,vu,ca]},jt={findFiberByHostInstance:Dn,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},Kf={bundleType:jt.bundleType,version:jt.version,rendererPackageName:jt.rendererPackageName,rendererConfig:jt.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:on.ReactCurrentDispatcher,findHostInstanceByFiber:function(e){return e=Su(e),e===null?null:e.stateNode},findFiberByHostInstance:jt.findFiberByHostInstance||Hf,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"&&(Ft=__REACT_DEVTOOLS_GLOBAL_HOOK__,!Ft.isDisabled&&Ft.supportsFiber))try{zl=Ft.inject(Kf),Ye=Ft}catch{}var Ft;Ce.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=Qf;Ce.createPortal=function(e,n){var t=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!va(n))throw Error(x(200));return Vf(e,n,null,t)};Ce.createRoot=function(e,n){if(!va(e))throw Error(x(299));var t=!1,r="",l=ep;return n!=null&&(n.unstable_strictMode===!0&&(t=!0),n.identifierPrefix!==void 0&&(r=n.identifierPrefix),n.onRecoverableError!==void 0&&(l=n.onRecoverableError)),n=ma(e,1,!1,null,null,t,!1,r,l),e[tn]=n.current,or(e.nodeType===8?e.parentNode:e),new ha(n)};Ce.findDOMNode=function(e){if(e==null)return null;if(e.nodeType===1)return e;var n=e._reactInternals;if(n===void 0)throw typeof e.render=="function"?Error(x(188)):(e=Object.keys(e).join(","),Error(x(268,e)));return e=Su(n),e=e===null?null:e.stateNode,e};Ce.flushSync=function(e){return $n(e)};Ce.hydrate=function(e,n,t){if(!Al(n))throw Error(x(200));return Vl(null,e,n,!0,t)};Ce.hydrateRoot=function(e,n,t){if(!va(e))throw Error(x(405));var r=t!=null&&t.hydratedSources||null,l=!1,o="",i=ep;if(t!=null&&(t.unstable_strictMode===!0&&(l=!0),t.identifierPrefix!==void 0&&(o=t.identifierPrefix),t.onRecoverableError!==void 0&&(i=t.onRecoverableError)),n=qc(n,null,e,1,t??null,l,!1,o,i),e[tn]=n.current,or(e),r)for(e=0;e<r.length;e++)t=r[e],l=t._getVersion,l=l(t._source),n.mutableSourceEagerHydrationData==null?n.mutableSourceEagerHydrationData=[t,l]:n.mutableSourceEagerHydrationData.push(t,l);return new Bl(n)};Ce.render=function(e,n,t){if(!Al(n))throw Error(x(200));return Vl(null,e,n,!1,t)};Ce.unmountComponentAtNode=function(e){if(!Al(e))throw Error(x(40));return e._reactRootContainer?($n(function(){Vl(null,null,e,!1,function(){e._reactRootContainer=null,e[tn]=null})}),!0):!1};Ce.unstable_batchedUpdates=ca;Ce.unstable_renderSubtreeIntoContainer=function(e,n,t,r){if(!Al(t))throw Error(x(200));if(e==null||e._reactInternals===void 0)throw Error(x(38));return Vl(e,n,t,!1,r)};Ce.version="18.3.1-next-f1338f8080-20240426"});var lp=Ge((a0,rp)=>{"use strict";function tp(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(tp)}catch(e){console.error(e)}}tp(),rp.exports=np()});var ip=Ge(ya=>{"use strict";var op=lp();ya.createRoot=op.createRoot,ya.hydrateRoot=op.hydrateRoot;var s0});var sp=Ge(Hl=>{"use strict";var Yf=an(),Xf=Symbol.for("react.element"),Gf=Symbol.for("react.fragment"),Zf=Object.prototype.hasOwnProperty,bf=Yf.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,Jf={key:!0,ref:!0,__self:!0,__source:!0};function ap(e,n,t){var r,l={},o=null,i=null;t!==void 0&&(o=""+t),n.key!==void 0&&(o=""+n.key),n.ref!==void 0&&(i=n.ref);for(r in n)Zf.call(n,r)&&!Jf.hasOwnProperty(r)&&(l[r]=n[r]);if(e&&e.defaultProps)for(r in n=e.defaultProps,n)l[r]===void 0&&(l[r]=n[r]);return{$$typeof:Xf,type:e,key:o,ref:i,props:l,_owner:bf.current}}Hl.Fragment=Gf;Hl.jsx=ap;Hl.jsxs=ap});var _e=Ge((p0,up)=>{"use strict";up.exports=sp()});var kp=q(an(),1),Sp=q(ip(),1);var J=q(an(),1);var xp=q(an(),1);var v=q(_e(),1);function yr({className:e="",size:n=24}){return(0,v.jsxs)("svg",{width:n,height:n,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:e,children:[(0,v.jsx)("path",{d:"M6 13.87A4 4 0 0 1 7.41 6a5.11 5.11 0 0 1 1.05-1.54 5 5 0 0 1 7.08 0A5.11 5.11 0 0 1 16.59 6 4 4 0 0 1 18 13.87V21H6Z"}),(0,v.jsx)("line",{x1:"6",x2:"18",y1:"17",y2:"17"})]})}function $l({className:e="",size:n=24}){return(0,v.jsxs)("svg",{width:n,height:n,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:e,children:[(0,v.jsx)("rect",{width:"18",height:"18",x:"3",y:"4",rx:"2",ry:"2"}),(0,v.jsx)("line",{x1:"16",x2:"16",y1:"2",y2:"6"}),(0,v.jsx)("line",{x1:"8",x2:"8",y1:"2",y2:"6"}),(0,v.jsx)("line",{x1:"3",x2:"21",y1:"10",y2:"10"})]})}function Re({className:e="",size:n=24}){return(0,v.jsxs)("svg",{width:n,height:n,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:e,children:[(0,v.jsx)("line",{x1:"12",x2:"12",y1:"2",y2:"22"}),(0,v.jsx)("path",{d:"M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"})]})}function In({className:e="",size:n=24}){return(0,v.jsx)("svg",{width:n,height:n,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:e,children:(0,v.jsx)("path",{d:"M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"})})}function Ln({className:e="",size:n=24}){return(0,v.jsxs)("svg",{width:n,height:n,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:e,children:[(0,v.jsx)("path",{d:"M12 2a4 4 0 0 0-4 4v2a4 4 0 0 0 8 0V6a4 4 0 0 0-4-4z"}),(0,v.jsx)("path",{d:"M12 12v10"}),(0,v.jsx)("path",{d:"M8 16h8"}),(0,v.jsx)("path",{d:"M6 20h12"})]})}function xr({className:e="",size:n=24}){return(0,v.jsxs)("svg",{width:n,height:n,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:e,children:[(0,v.jsx)("circle",{cx:"8",cy:"21",r:"1"}),(0,v.jsx)("circle",{cx:"19",cy:"21",r:"1"}),(0,v.jsx)("path",{d:"M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"})]})}function Yn({className:e="",size:n=24}){return(0,v.jsxs)("svg",{width:n,height:n,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:e,children:[(0,v.jsx)("circle",{cx:"12",cy:"12",r:"10"}),(0,v.jsx)("polyline",{points:"12 6 12 12 16 14"})]})}function Ql({className:e="",size:n=24}){return(0,v.jsxs)("svg",{width:n,height:n,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:e,children:[(0,v.jsx)("path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"}),(0,v.jsx)("circle",{cx:"9",cy:"7",r:"4"}),(0,v.jsx)("path",{d:"M22 21v-2a4 4 0 0 0-3-3.87"}),(0,v.jsx)("path",{d:"M16 3.13a4 4 0 0 1 0 7.75"})]})}function cp({className:e="",size:n=24}){return(0,v.jsxs)("svg",{width:n,height:n,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:e,children:[(0,v.jsx)("path",{d:"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"}),(0,v.jsx)("path",{d:"M21 3v5h-5"}),(0,v.jsx)("path",{d:"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"}),(0,v.jsx)("path",{d:"M8 16H3v5"})]})}function xa({className:e="",size:n=24}){return(0,v.jsxs)("svg",{width:n,height:n,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:e,children:[(0,v.jsx)("path",{d:"M16 3h5v5"}),(0,v.jsx)("path",{d:"M8 3H3v5"}),(0,v.jsx)("path",{d:"M21 3l-7 7"}),(0,v.jsx)("path",{d:"M3 3l7 7"}),(0,v.jsx)("path",{d:"M16 21h5v-5"}),(0,v.jsx)("path",{d:"M8 21H3v-5"}),(0,v.jsx)("path",{d:"M21 21l-7-7"}),(0,v.jsx)("path",{d:"M3 21l7-7"})]})}function wa({className:e="",size:n=24}){return(0,v.jsxs)("svg",{width:n,height:n,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:e,children:[(0,v.jsx)("path",{d:"M15 3h6v6"}),(0,v.jsx)("path",{d:"M9 21H3v-6"}),(0,v.jsx)("path",{d:"M21 3l-7 7"}),(0,v.jsx)("path",{d:"M3 21l7-7"})]})}function Kl({className:e="",size:n=24}){return(0,v.jsxs)("svg",{width:n,height:n,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:e,children:[(0,v.jsx)("line",{x1:"18",x2:"6",y1:"6",y2:"18"}),(0,v.jsx)("line",{x1:"6",x2:"18",y1:"6",y2:"18"})]})}function pp({className:e="",size:n=24}){return(0,v.jsx)("svg",{width:n,height:n,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:e,children:(0,v.jsx)("polyline",{points:"20 6 9 17 4 12"})})}function Yl({className:e="",size:n=24}){return(0,v.jsxs)("svg",{width:n,height:n,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:e,children:[(0,v.jsx)("path",{d:"M12 2v4"}),(0,v.jsx)("path",{d:"m4.93 4.93 2.83 2.83"}),(0,v.jsx)("path",{d:"M2 12h4"}),(0,v.jsx)("path",{d:"m4.93 19.07 2.83-2.83"}),(0,v.jsx)("path",{d:"M12 18v4"}),(0,v.jsx)("path",{d:"m19.07 19.07-2.83-2.83"}),(0,v.jsx)("path",{d:"M22 12h-4"}),(0,v.jsx)("path",{d:"m19.07 4.93-2.83 2.83"}),(0,v.jsx)("circle",{cx:"12",cy:"12",r:"4"})]})}function _t({className:e="",size:n=24}){return(0,v.jsxs)("svg",{width:n,height:n,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:e,children:[(0,v.jsx)("circle",{cx:"12",cy:"12",r:"4"}),(0,v.jsx)("path",{d:"M12 2v2"}),(0,v.jsx)("path",{d:"M12 20v2"}),(0,v.jsx)("path",{d:"m4.93 4.93 1.41 1.41"}),(0,v.jsx)("path",{d:"m17.66 17.66 1.41 1.41"}),(0,v.jsx)("path",{d:"M2 12h2"}),(0,v.jsx)("path",{d:"M20 12h2"}),(0,v.jsx)("path",{d:"m6.34 17.66-1.41 1.41"}),(0,v.jsx)("path",{d:"m19.07 4.93-1.41 1.41"})]})}function Xl({className:e="",size:n=24}){return(0,v.jsx)("svg",{width:n,height:n,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:e,children:(0,v.jsx)("path",{d:"M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"})})}function Gl({className:e="",size:n=24}){return(0,v.jsxs)("svg",{width:n,height:n,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:e,children:[(0,v.jsx)("path",{d:"M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5"}),(0,v.jsx)("path",{d:"M8.5 8.5v.01"}),(0,v.jsx)("path",{d:"M16 15.5v.01"}),(0,v.jsx)("path",{d:"M12 12v.01"}),(0,v.jsx)("path",{d:"M11 17v.01"}),(0,v.jsx)("path",{d:"M7 14v.01"})]})}function Mn({className:e="",size:n=24}){return(0,v.jsxs)("svg",{width:n,height:n,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:e,children:[(0,v.jsx)("path",{d:"M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"}),(0,v.jsx)("path",{d:"M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"})]})}function wr({className:e="",size:n=24}){return(0,v.jsx)("svg",{width:n,height:n,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:e,children:(0,v.jsx)("polygon",{points:"13 2 3 14 12 14 11 22 21 10 12 10 13 2"})})}function dp({className:e="",size:n=24}){return(0,v.jsx)("svg",{width:n,height:n,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:e,children:(0,v.jsx)("path",{d:"M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"})})}function fp({className:e="",size:n=24}){return(0,v.jsx)("svg",{width:n,height:n,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:e,children:(0,v.jsx)("path",{d:"m6 9 6 6 6-6"})})}function mp({className:e="",size:n=24}){return(0,v.jsx)("svg",{width:n,height:n,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:e,children:(0,v.jsx)("path",{d:"m18 15-6-6-6 6"})})}function gp({className:e="",size:n=24}){return(0,v.jsx)("svg",{width:n,height:n,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:e,children:(0,v.jsx)("path",{d:"m15 18-6-6 6-6"})})}function hp({className:e="",size:n=24}){return(0,v.jsx)("svg",{width:n,height:n,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:e,children:(0,v.jsx)("path",{d:"m9 18 6-6-6-6"})})}function vp({className:e="",size:n=24}){return(0,v.jsx)("svg",{width:n,height:n,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:e,children:(0,v.jsx)("polygon",{points:"12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"})})}function yp({className:e="",size:n=24}){return(0,v.jsxs)("svg",{width:n,height:n,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:e,children:[(0,v.jsx)("path",{d:"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"}),(0,v.jsx)("polyline",{points:"15 3 21 3 21 9"}),(0,v.jsx)("line",{x1:"10",x2:"21",y1:"14",y2:"3"})]})}var N=q(_e(),1),qf={breakfast:Yl,lunch:_t,dinner:Xl,snack:Gl};function ka({plan:e,onOrderIngredients:n,onOpenFullPlan:t}){let{household:r,constraints:l,budget_summary:o,nutrition_summary:i,days:a}=e,[s,p]=(0,xp.useState)(0),h=l.diet.length>0?l.diet[0].charAt(0).toUpperCase()+l.diet[0].slice(1):"Balanced",f=a[s];return(0,N.jsxs)("div",{className:"cp-inline-widget",children:[(0,N.jsxs)("div",{className:"cp-inline-header",children:[(0,N.jsxs)("div",{className:"cp-inline-logo",children:[(0,N.jsx)(yr,{size:28,className:"cp-icon-green"}),(0,N.jsx)("span",{className:"cp-inline-brand",children:"ChefPlan"})]}),(0,N.jsxs)("button",{className:"cp-expand-btn",onClick:t,children:[(0,N.jsx)(wa,{size:18}),"Open Full"]})]}),(0,N.jsx)("h2",{className:"cp-inline-title",children:"Weekly meal plan"}),(0,N.jsxs)("div",{className:"cp-inline-context",children:[(0,N.jsxs)("span",{className:"cp-context-item",children:[(0,N.jsx)(Ql,{size:14}),"Family of ",r.size]}),(0,N.jsx)("span",{className:"cp-context-divider",children:"\xB7"}),(0,N.jsxs)("span",{className:"cp-context-item",children:[(0,N.jsx)(Mn,{size:14}),h]}),(0,N.jsx)("span",{className:"cp-context-divider",children:"\xB7"}),(0,N.jsxs)("span",{className:"cp-context-item",children:[(0,N.jsx)(Re,{size:14}),"Budget <$",l.budget_target]}),(0,N.jsx)("span",{className:"cp-context-divider",children:"\xB7"}),(0,N.jsxs)("span",{className:"cp-context-item",children:[(0,N.jsx)($l,{size:14}),"7 days"]})]}),(0,N.jsxs)("div",{className:"cp-inline-metrics",children:[(0,N.jsxs)("div",{className:"cp-metric",children:[(0,N.jsx)(Re,{size:18,className:"cp-icon-orange"}),(0,N.jsxs)("div",{className:"cp-metric-content",children:[(0,N.jsxs)("span",{className:"cp-metric-value",children:["$",o.estimated_total.toFixed(2)]}),(0,N.jsx)("span",{className:"cp-metric-label",children:"Est. total"})]})]}),(0,N.jsxs)("div",{className:"cp-metric",children:[(0,N.jsx)(In,{size:18,className:"cp-icon-orange"}),(0,N.jsxs)("div",{className:"cp-metric-content",children:[(0,N.jsx)("span",{className:"cp-metric-value",children:i.avg_calories_per_day}),(0,N.jsx)("span",{className:"cp-metric-label",children:"kcal/day"})]})]}),(0,N.jsxs)("div",{className:"cp-metric",children:[(0,N.jsx)(Ln,{size:18,className:"cp-icon-green"}),(0,N.jsxs)("div",{className:"cp-metric-content",children:[(0,N.jsxs)("span",{className:"cp-metric-value",children:[i.avg_protein_g,"g"]}),(0,N.jsx)("span",{className:"cp-metric-label",children:"protein/day"})]})]})]}),(0,N.jsx)("div",{className:"cp-day-tabs",children:a.map((m,w)=>(0,N.jsx)("button",{className:`cp-day-tab ${s===w?"active":""}`,onClick:()=>p(w),children:m.day},m.day))}),(0,N.jsx)("div",{className:"cp-meals-grid",children:f.meals.map(m=>{let w=qf[m.type]||_t;return(0,N.jsxs)("div",{className:"cp-meal-card",children:[m.image_url?(0,N.jsxs)("div",{className:"cp-meal-image",children:[(0,N.jsx)("img",{src:m.image_url,alt:m.title}),(0,N.jsx)("span",{className:"cp-meal-type-badge",children:m.type})]}):(0,N.jsxs)("div",{className:"cp-meal-placeholder",children:[(0,N.jsx)(w,{size:24}),(0,N.jsx)("span",{className:"cp-meal-type-badge",children:m.type})]}),(0,N.jsxs)("div",{className:"cp-meal-info",children:[(0,N.jsx)("span",{className:"cp-meal-title",children:m.title}),(0,N.jsxs)("div",{className:"cp-meal-meta",children:[(0,N.jsxs)("span",{children:[(0,N.jsx)(Yn,{size:12})," ",m.prep_minutes,"m"]}),(0,N.jsxs)("span",{children:[(0,N.jsx)(In,{size:12})," ",m.calories]}),(0,N.jsxs)("span",{children:[(0,N.jsx)(Re,{size:12})," $",m.estimated_cost.toFixed(0)]})]})]})]},m.meal_id)})}),(0,N.jsxs)("div",{className:"cp-day-stats",children:[(0,N.jsxs)("span",{children:[f.totals.calories," kcal"]}),(0,N.jsx)("span",{children:"\xB7"}),(0,N.jsxs)("span",{children:[f.totals.protein_g,"g protein"]}),(0,N.jsx)("span",{children:"\xB7"}),(0,N.jsxs)("span",{children:[f.totals.carbs_g,"g carbs"]}),(0,N.jsx)("span",{children:"\xB7"}),(0,N.jsxs)("span",{children:[f.totals.fat_g,"g fat"]})]}),(0,N.jsxs)("div",{className:"cp-inline-actions",children:[(0,N.jsxs)("button",{className:"cp-btn cp-btn-primary",onClick:t,children:[(0,N.jsx)(wa,{size:18}),"View Full Plan"]}),(0,N.jsxs)("button",{className:"cp-btn cp-btn-secondary",onClick:n,children:[(0,N.jsx)(xr,{size:18}),"Order Ingredients"]})]}),(0,N.jsx)("style",{children:`
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
      `})]})}var Zl=q(an(),1);var g=q(_e(),1),e0={breakfast:Yl,lunch:_t,dinner:Xl,snack:Gl};function Sa({plan:e,selectedRecipe:n,onClose:t,onSwapMeal:r,onRebuildWeek:l,onOrderIngredients:o,onSelectMeal:i}){let[a,s]=(0,Zl.useState)(e.days[0]?.day||"Mon"),[p,h]=(0,Zl.useState)(null),[f,m]=(0,Zl.useState)({Produce:!0,Proteins:!0,Dairy:!1,Pantry:!1,Frozen:!1}),w=e.days.find(u=>u.day===a)||e.days[0],S=u=>{h(u.meal_id),i(e.plan_id,u.meal_id)},C=u=>{m(c=>({...c,[u]:!c[u]}))},D=u=>({"high-protein":"cp-tag-green",quick:"cp-tag-orange",budget:"cp-tag-blue",healthy:"cp-tag-green",vegan:"cp-tag-emerald",vegetarian:"cp-tag-emerald","kid-friendly":"cp-tag-purple",keto:"cp-tag-amber","low-carb":"cp-tag-amber","meal-prep":"cp-tag-blue",popular:"cp-tag-pink"})[u]||"cp-tag-gray";return(0,g.jsxs)("div",{className:"cp-fullscreen",children:[(0,g.jsxs)("header",{className:"cp-fs-header",children:[(0,g.jsxs)("div",{className:"cp-fs-header-left",children:[(0,g.jsx)(yr,{size:28,className:"cp-icon-green"}),(0,g.jsxs)("div",{children:[(0,g.jsx)("h1",{className:"cp-fs-title",children:"Weekly meal plan"}),(0,g.jsxs)("p",{className:"cp-fs-subtitle",children:["Mar 16\u201322 \xB7 Family of ",e.household.size," \xB7"," ",e.constraints.diet[0]||"Balanced"," \xB7 <$",e.constraints.budget_target]})]})]}),(0,g.jsx)("button",{className:"cp-close-btn",onClick:t,children:(0,g.jsx)(Kl,{size:24})})]}),(0,g.jsxs)("div",{className:"cp-fs-metrics",children:[(0,g.jsxs)("div",{className:"cp-fs-metric",children:[(0,g.jsx)(Re,{size:20,className:"cp-icon-orange"}),(0,g.jsxs)("span",{className:"cp-fs-metric-value",children:["$",e.budget_summary.estimated_total.toFixed(2)]}),(0,g.jsx)("span",{className:"cp-fs-metric-label",children:"Budget"})]}),(0,g.jsxs)("div",{className:"cp-fs-metric",children:[(0,g.jsx)(In,{size:20,className:"cp-icon-orange"}),(0,g.jsx)("span",{className:"cp-fs-metric-value",children:e.nutrition_summary.avg_calories_per_day}),(0,g.jsx)("span",{className:"cp-fs-metric-label",children:"Avg/day"})]}),(0,g.jsxs)("div",{className:"cp-fs-metric",children:[(0,g.jsx)(Ln,{size:20,className:"cp-icon-green"}),(0,g.jsxs)("span",{className:"cp-fs-metric-value",children:[e.nutrition_summary.avg_protein_g,"g"]}),(0,g.jsx)("span",{className:"cp-fs-metric-label",children:"Protein"})]}),(0,g.jsxs)("div",{className:"cp-fs-metric",children:[(0,g.jsx)(Mn,{size:20,className:"cp-icon-green"}),(0,g.jsxs)("span",{className:"cp-fs-metric-value",children:[e.nutrition_summary.avg_carbs_g,"g"]}),(0,g.jsx)("span",{className:"cp-fs-metric-label",children:"Carbs"})]})]}),(0,g.jsxs)("section",{className:"cp-fs-section",children:[(0,g.jsxs)("h2",{className:"cp-fs-section-title",children:[(0,g.jsx)($l,{size:20}),"Weekly Calendar"]}),(0,g.jsx)("div",{className:"cp-week-tabs",children:e.days.map(u=>(0,g.jsx)("button",{className:`cp-week-tab ${a===u.day?"active":""}`,onClick:()=>s(u.day),children:u.day},u.day))}),(0,g.jsxs)("div",{className:"cp-day-meals",children:[(0,g.jsxs)("div",{className:"cp-day-header",children:[(0,g.jsx)("span",{className:"cp-day-label",children:w.day}),(0,g.jsxs)("span",{className:"cp-day-stats",children:[w.totals.calories," kcal \xB7 ",w.totals.protein_g,"g protein"]})]}),w.meals.map(u=>{let c=e0[u.type]||_t,d=p===u.meal_id;return(0,g.jsxs)("div",{className:`cp-meal-card ${d?"selected":""}`,onClick:()=>S(u),children:[u.image_url?(0,g.jsx)("div",{className:"cp-meal-image",children:(0,g.jsx)("img",{src:u.image_url,alt:u.title})}):(0,g.jsx)("div",{className:"cp-meal-icon",children:(0,g.jsx)(c,{size:20})}),(0,g.jsxs)("div",{className:"cp-meal-content",children:[(0,g.jsx)("span",{className:"cp-meal-type",children:u.type}),(0,g.jsx)("span",{className:"cp-meal-title",children:u.title}),(0,g.jsxs)("div",{className:"cp-meal-meta",children:[(0,g.jsxs)("span",{children:[(0,g.jsx)(Yn,{size:12})," ",u.prep_minutes," min"]}),(0,g.jsxs)("span",{children:[(0,g.jsx)(In,{size:12})," ",u.calories," kcal"]}),(0,g.jsxs)("span",{children:[(0,g.jsx)(Re,{size:12})," $",u.estimated_cost.toFixed(2)]})]}),u.source&&u.source!=="fallback"&&(0,g.jsxs)("span",{className:"cp-meal-source",children:["via ",u.source]})]}),(0,g.jsxs)("button",{className:"cp-swap-btn",onClick:y=>{y.stopPropagation(),r(u.meal_id)},children:[(0,g.jsx)(xa,{size:16}),"Swap"]})]},u.meal_id)})]})]}),n&&(0,g.jsxs)("section",{className:"cp-fs-section cp-recipe-section",children:[(0,g.jsxs)("h2",{className:"cp-fs-section-title",children:[(0,g.jsx)(yr,{size:20}),"Selected Meal Details"]}),(0,g.jsxs)("div",{className:"cp-recipe-card",children:[(0,g.jsxs)("div",{className:"cp-recipe-header",children:[(0,g.jsx)("h3",{className:"cp-recipe-title",children:n.title}),(0,g.jsxs)("div",{className:"cp-recipe-tags",children:[n.tags.map(u=>(0,g.jsx)("span",{className:`cp-tag ${D(u)}`,children:u.replace("-"," ")},u)),n.source&&n.source!=="fallback"&&(0,g.jsxs)("span",{className:"cp-tag cp-tag-gray",children:["via ",n.source]})]})]}),(0,g.jsxs)("div",{className:"cp-recipe-stats",children:[(0,g.jsxs)("div",{className:"cp-recipe-stat",children:[(0,g.jsx)(Yn,{size:16}),(0,g.jsxs)("span",{children:["Prep ",n.prep_minutes," min"]})]}),(0,g.jsxs)("div",{className:"cp-recipe-stat",children:[(0,g.jsx)(Ql,{size:16}),(0,g.jsxs)("span",{children:["Serves ",n.servings]})]}),(0,g.jsxs)("div",{className:"cp-recipe-stat",children:[(0,g.jsx)(Re,{size:16}),(0,g.jsxs)("span",{children:["$",n.estimated_cost.toFixed(2)," total"]})]})]}),(0,g.jsxs)("div",{className:"cp-recipe-nutrition",children:[(0,g.jsxs)("span",{children:[(0,g.jsx)(Ln,{size:14})," Protein"," ",n.macros.protein_g,"g"]}),(0,g.jsxs)("span",{children:[(0,g.jsx)(Mn,{size:14})," Carbs ",n.macros.carbs_g,"g"]}),(0,g.jsxs)("span",{children:[(0,g.jsx)(wr,{size:14})," Fat ",n.macros.fat_g,"g"]})]}),(0,g.jsxs)("div",{className:"cp-recipe-ingredients",children:[(0,g.jsx)("h4",{children:"Ingredients"}),(0,g.jsx)("ul",{children:n.ingredients.map((u,c)=>(0,g.jsxs)("li",{children:[u.amount," ",u.name,u.notes&&(0,g.jsxs)("span",{className:"cp-ing-note",children:[" (",u.notes,")"]})]},c))})]}),(0,g.jsxs)("div",{className:"cp-recipe-steps",children:[(0,g.jsx)("h4",{children:"Steps"}),(0,g.jsx)("ol",{children:n.instructions.map((u,c)=>(0,g.jsx)("li",{children:u},c))})]}),(0,g.jsxs)("div",{className:"cp-recipe-actions",children:[(0,g.jsxs)("button",{className:"cp-btn cp-btn-outline",onClick:()=>r(n.meal_id),children:[(0,g.jsx)(xa,{size:16}),"Replace this meal"]}),(0,g.jsxs)("button",{className:"cp-btn cp-btn-outline",children:[(0,g.jsx)(wr,{size:16}),"Make faster"]}),(0,g.jsxs)("button",{className:"cp-btn cp-btn-outline",children:[(0,g.jsx)(Re,{size:16}),"Make cheaper"]})]})]})]}),(0,g.jsxs)("section",{className:"cp-fs-section",children:[(0,g.jsxs)("h2",{className:"cp-fs-section-title",children:[(0,g.jsx)(xr,{size:20}),"Shopping List"]}),(0,g.jsx)("div",{className:"cp-shopping-list",children:e.shopping_list.map(u=>(0,g.jsxs)("div",{className:"cp-shop-section",children:[(0,g.jsxs)("button",{className:"cp-shop-header",onClick:()=>C(u.section),children:[(0,g.jsx)("span",{children:u.section}),(0,g.jsxs)("span",{className:"cp-shop-count",children:[u.items.length," items"]}),f[u.section]?(0,g.jsx)(mp,{size:18}):(0,g.jsx)(fp,{size:18})]}),f[u.section]&&(0,g.jsx)("div",{className:"cp-shop-items",children:u.items.map((c,d)=>(0,g.jsxs)("div",{className:"cp-shop-item",children:[(0,g.jsx)("span",{className:"cp-shop-item-name",children:c.name}),(0,g.jsxs)("span",{className:"cp-shop-item-qty",children:[c.quantity," ",c.unit]}),c.estimated_cost&&(0,g.jsxs)("span",{className:"cp-shop-item-cost",children:["$",c.estimated_cost.toFixed(2)]})]},d))})]},u.section))})]}),(0,g.jsxs)("div",{className:"cp-fs-actions",children:[(0,g.jsxs)("button",{className:"cp-btn cp-btn-outline",onClick:l,children:[(0,g.jsx)(cp,{size:18}),"Rebuild week"]}),(0,g.jsxs)("button",{className:"cp-btn cp-btn-primary",onClick:()=>o("instacart"),children:[(0,g.jsx)(xr,{size:18}),"Order with Instacart",(0,g.jsx)(yp,{size:14})]})]}),(0,g.jsx)("style",{children:`
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
      `})]})}var bl=q(an(),1),I=q(_e(),1);function Na({currentMeal:e,candidates:n,onReplace:t,onClose:r}){let[l,o]=(0,bl.useState)(null),i=(0,bl.useRef)(null),a=f=>{i.current&&i.current.scrollBy({left:f==="left"?-280:280,behavior:"smooth"})},s=f=>({"high-protein":Ln,quick:wr,budget:Re,healthy:dp,vegan:Mn,vegetarian:Mn})[f]||vp,p=f=>{let m=["high-protein","quick","budget","healthy","vegan","vegetarian"];for(let w of m)if(f.includes(w))return w;return f[0]||null},h=f=>({"high-protein":"cp-badge-green",quick:"cp-badge-orange",budget:"cp-badge-blue",healthy:"cp-badge-emerald",vegan:"cp-badge-emerald",vegetarian:"cp-badge-emerald","kid-friendly":"cp-badge-purple"})[f]||"cp-badge-gray";return(0,I.jsxs)("div",{className:"cp-swap-widget",children:[(0,I.jsxs)("div",{className:"cp-swap-header",children:[(0,I.jsxs)("div",{className:"cp-swap-title-area",children:[(0,I.jsxs)("h2",{className:"cp-swap-title",children:["Replace ",e.type]}),(0,I.jsxs)("p",{className:"cp-swap-current",children:["Current: ",(0,I.jsx)("strong",{children:e.title})]})]}),(0,I.jsx)("button",{className:"cp-swap-close",onClick:r,children:(0,I.jsx)(Kl,{size:20})})]}),(0,I.jsxs)("div",{className:"cp-swap-nav",children:[(0,I.jsx)("button",{className:"cp-nav-btn",onClick:()=>a("left"),children:(0,I.jsx)(gp,{size:20})}),(0,I.jsxs)("span",{className:"cp-nav-count",children:[n.length," alternatives"]}),(0,I.jsx)("button",{className:"cp-nav-btn",onClick:()=>a("right"),children:(0,I.jsx)(hp,{size:20})})]}),(0,I.jsx)("div",{className:"cp-swap-carousel",ref:i,children:n.map((f,m)=>{let w=p(f.tags),S=w?s(w):null,C=l===f.meal_id;return(0,I.jsxs)("div",{className:`cp-swap-card ${C?"selected":""}`,onClick:()=>o(f.meal_id),children:[(0,I.jsxs)("div",{className:"cp-match-score",children:[Math.round(f.match_score*100),"% match"]}),(0,I.jsx)("h3",{className:"cp-card-title",children:f.title}),(0,I.jsxs)("div",{className:"cp-card-stats",children:[(0,I.jsxs)("span",{className:"cp-card-stat",children:[(0,I.jsx)(Yn,{size:14}),f.prep_minutes," min"]}),(0,I.jsxs)("span",{className:"cp-card-stat",children:[(0,I.jsx)(In,{size:14}),f.calories," kcal"]}),(0,I.jsxs)("span",{className:"cp-card-stat",children:[(0,I.jsx)(Re,{size:14}),"$",f.estimated_cost.toFixed(2)]})]}),(0,I.jsx)("div",{className:"cp-card-macros",children:(0,I.jsxs)("span",{children:[(0,I.jsx)(Ln,{size:12})," ",f.macros.protein_g,"g protein"]})}),w&&S&&(0,I.jsxs)("div",{className:`cp-card-badge ${h(w)}`,children:[(0,I.jsx)(S,{size:14}),w.replace("-"," ")]}),(0,I.jsx)("button",{className:`cp-replace-btn ${C?"active":""}`,onClick:D=>{D.stopPropagation(),t(f.meal_id)},children:C?(0,I.jsxs)(I.Fragment,{children:[(0,I.jsx)(pp,{size:16}),"Confirm"]}):"Replace"})]},f.meal_id)})}),(0,I.jsx)("style",{children:`
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
      `})]})}var A=q(_e(),1);function Ca(){let[e,n]=(0,J.useState)("inline"),[t,r]=(0,J.useState)(null),[l,o]=(0,J.useState)(null),[i,a]=(0,J.useState)(null),[s,p]=(0,J.useState)(!1),[h,f]=(0,J.useState)(null),[m,w]=(0,J.useState)(!1);(0,J.useEffect)(()=>{let k=G=>{if(!G||typeof G!="object")return null;let R=G;if(R.plan_id&&R.days)return R;if(R.plan&&typeof R.plan=="object"){let Xn=R.plan;if(Xn.plan_id&&Xn.days)return Xn}return R.structuredContent&&typeof R.structuredContent=="object"?k(R.structuredContent):R.content&&typeof R.content=="object"?k(R.content):R.payload&&typeof R.payload=="object"?k(R.payload):R.result&&typeof R.result=="object"?k(R.result):R.data&&typeof R.data=="object"?k(R.data):null},P=document.getElementById("chefplan-widget-root")?.getAttribute("data-plan");if(P)try{let G=atob(P),R=JSON.parse(G);if(R?.plan_id&&R?.days){r(R);return}}catch(G){console.error("[ChefPlan] Failed to parse data-plan attribute:",G)}let j=window.__chefplan_init;if(j?.plan){r(j.plan);return}if(j){let G=k(j);if(G){r(G);return}}(async()=>{if(window.openai?.toolResult){let G=k(window.openai.toolResult);if(G)return r(G),!0}if(window.openai?.getToolResult)try{let G=await window.openai.getToolResult(),R=k(G);if(R)return r(R),!0}catch(G){console.error("[ChefPlan] getToolResult failed:",G)}return!1})();let Oe=G=>{let R=G.data,Xn=k(R);Xn&&r(Xn)};window.addEventListener("message",Oe),window.parent!==window&&window.parent.postMessage({type:"mcp:ready",app:"chefplan"},"*");let Jl=setTimeout(()=>{w(!0)},8e3);return()=>{window.removeEventListener("message",Oe),clearTimeout(Jl)}},[]);let S=(0,J.useCallback)(async(k,_)=>{if(!window.openai?.callTool)return f("OpenAI bridge not available"),null;try{p(!0);let P=await window.openai.callTool(k,_);return P.structuredContent??P}catch(P){return f(P instanceof Error?P.message:"Tool call failed"),null}finally{p(!1)}},[]),C=(0,J.useCallback)(()=>{n("fullscreen")},[]),D=(0,J.useCallback)(async(k="instacart")=>{if(!t)return;let _=await S("create_order_link",{plan_id:t.plan_id,provider:k});_?.deeplink&&window.open(_.deeplink,"_blank")},[t,S]),u=(0,J.useCallback)(async k=>{if(!t)return;let _=await S("swap_meal",{plan_id:t.plan_id,meal_id:k});if(_?.candidates){let P=t.days.flatMap(j=>j.meals).find(j=>j.meal_id===k);P&&(a({meal:P,candidates:_.candidates}),n("swap"))}},[t,S]),c=(0,J.useCallback)(async k=>{if(!t||!i)return;let _=await S("swap_meal",{plan_id:t.plan_id,meal_id:i.meal.meal_id,replace_with:k});_?.updated_plan&&r(_.updated_plan),window.openai?.updateModelContext&&window.openai.updateModelContext({action:"meal_replaced",original:i.meal.title,replacement:i.candidates.find(P=>P.meal_id===k)?.title}),a(null),n("fullscreen")},[t,i,S]),d=(0,J.useCallback)(async()=>{if(!t)return;let k=await S("generate_weekly_plan",{household_size:t.household.size,dietary_preferences:t.constraints.diet,budget_target:t.constraints.budget_target,max_prep_minutes:t.constraints.max_prep_minutes});k?.plan&&r(k.plan)},[t,S]),y=(0,J.useCallback)(async(k,_)=>{let P=await S("get_recipe_details",{plan_id:k,meal_id:_});P?.recipe&&o(P.recipe)},[S]),z=(0,J.useCallback)(()=>{e==="swap"?(a(null),n("fullscreen")):(n("inline"),o(null))},[e]);return t?h?(0,A.jsxs)("div",{className:"cp-error",children:[(0,A.jsxs)("p",{children:["Error: ",h]}),(0,A.jsx)("button",{onClick:()=>{f(null)},children:"Dismiss"}),(0,A.jsx)("style",{children:`
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
        `})]}):(0,A.jsxs)(A.Fragment,{children:[s&&(0,A.jsx)("div",{className:"cp-overlay",children:(0,A.jsx)("div",{className:"cp-spinner"})}),e==="inline"&&(0,A.jsx)(ka,{plan:t,onOrderIngredients:()=>{D()},onOpenFullPlan:C}),e==="fullscreen"&&(0,A.jsx)(Sa,{plan:t,selectedRecipe:l,onClose:z,onSwapMeal:k=>{u(k)},onRebuildWeek:()=>{d()},onOrderIngredients:k=>{D(k)},onSelectMeal:(k,_)=>{y(k,_)}}),e==="swap"&&i&&(0,A.jsx)(Na,{currentMeal:i.meal,candidates:i.candidates,onReplace:k=>{c(k)},onClose:z}),(0,A.jsx)("style",{children:`
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
