
/*!
 * artplayer-plugin-libass.js v1.0.0
 * Github: https://github.com/zhw2590582/ArtPlayer
 * (c) 2017-2025 Harvey Zack
 * Released under the MIT License.
 */
!function(e,t,s,r,n){var i="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},a="function"==typeof i[r]&&i[r],o=a.cache||{},l="undefined"!=typeof module&&"function"==typeof module.require&&module.require.bind(module);function c(t,s){if(!o[t]){if(!e[t]){var n="function"==typeof i[r]&&i[r];if(!s&&n)return n(t,!0);if(a)return a(t,!0);if(l&&"string"==typeof t)return l(t);var d=Error("Cannot find module '"+t+"'");throw d.code="MODULE_NOT_FOUND",d}v.resolve=function(s){var r=e[t][1][s];return null!=r?r:s},v.cache={};var u=o[t]=new c.Module(t);e[t][0].call(u.exports,v,u,u.exports,this)}return o[t].exports;function v(e){var t=v.resolve(e);return!1===t?{}:c(t)}}c.isParcelRequire=!0,c.Module=function(e){this.id=e,this.bundle=c,this.exports={}},c.modules=e,c.cache=o,c.parent=a,c.register=function(t,s){e[t]=[function(e,t){t.exports=s},{}]},Object.defineProperty(c,"root",{get:function(){return i[r]}}),i[r]=c;for(var d=0;d<t.length;d++)c(t[d]);if(s){var u=c(s);"object"==typeof exports&&"undefined"!=typeof module?module.exports=u:"function"==typeof define&&define.amd&&define(function(){return u})}}({"5lsnt":[function(e,t,s){var r=e("@parcel/transformer-js/src/esmodule-helpers.js");r.defineInteropFlag(s),r.export(s,"default",()=>a);var n=e("./adapter"),i=r.interopDefault(n);function a(e){return t=>{let s=new i.default(t,e);return{name:"artplayerPluginLibass",libass:s.libass,visible:s.visible,init:s.init.bind(s),switch:s.switch.bind(s),show:s.show.bind(s),hide:s.hide.bind(s),destroy:s.destroy.bind(s)}}}"undefined"!=typeof window&&(window.artplayerPluginLibass=a)},{"./adapter":"2m9sB","@parcel/transformer-js/src/esmodule-helpers.js":"9pCYc"}],"2m9sB":[function(e,t,s){var r=e("@parcel/transformer-js/src/esmodule-helpers.js");r.defineInteropFlag(s);var n=e("libass-wasm"),i=r.interopDefault(n);let a=`[Script Info] ScriptType: v4.00+`;s.default=class{constructor(e,t){let{constructor:s,template:r}=e;this.art=e,this.$video=r.$video,this.$webvtt=r.$subtitle,this.utils=s.utils,this.libass=null,e.once("ready",this.init.bind(this,t))}async init(e){this.#e(),await this.#t(e),this.#s(),this.art.emit("artplayerPluginLibass:init",this);let t=this.art?.option?.subtitle?.url;t&&"ass"===this.utils.getExt(t)&&this.switch(t)}switch(e){this.art.emit("artplayerPluginLibass:switch",e),e&&"ass"===this.utils.getExt(e)?(this.currentType="ass",this.libass.freeTrack(),this.libass.setTrackByUrl(this.#r(e)),this.visible=this.art.subtitle.show):(this.currentType="webvtt",this.hide(),this.libass.freeTrack())}setVisibility(e){this.visible=e}setOffset(e){this.timeOffset=e}get active(){return"ass"===this.currentType}get visible(){return!!this.libass&&"none"!==this.libass.canvasParent.style.display}set visible(e){this.art.emit("artplayerPluginLibass:visible",e),this.#n(!this.active),this.libass.canvasParent&&(this.libass.canvasParent.style.display=e?"block":"none",e&&this.libass.resize())}get timeOffset(){return this.libass.timeOffset}set timeOffset(e){this.art.emit("artplayerPluginLibass:timeOffset",e),this.libass.timeOffset=e}show(){this.visible=!0}hide(){this.visible=!1}destroy(){this.art.emit("artplayerPluginLibass:destroy"),this.#i(),this.libass.dispose(),URL.revokeObjectURL(this.workerScriptUrl),this.libass=null}async #t(e={}){if(!e.fallbackFont)return this.utils.errorHandle(e.fallbackFont,"artplayerPluginLibass: fallbackFont is required");e.workerUrl||(e.workerUrl="https://cdnjs.cloudflare.com/ajax/libs/libass-wasm/4.1.0/js/subtitles-octopus-worker.js"),e.availableFonts&&(e.availableFonts=Object.entries(e.availableFonts).reduce((e,[t,s])=>(e[t]=this.#r(s),e),{})),this.libass=new i.default({subContent:a,video:this.$video,...e,workerUrl:await this.#a(e),fallbackFont:this.#r(e.fallbackFont),fonts:e.fonts?.map(e=>this.#r(e))}),this.libass.canvasParent.className="artplayer-plugin-libass",this.libass.canvasParent.style.cssText=` position: absolute; top: 0; left: 0; width: 100%; height: 100%; user-select: none; pointer-events: none; z-index: 20;`}#s(){this.switchHandler=this.switch.bind(this),this.visibleHandler=this.setVisibility.bind(this),this.offsetHandler=this.setOffset.bind(this),this.art.on("subtitle",this.visibleHandler),this.art.on("subtitleLoad",this.switchHandler),this.art.on("subtitleOffset",this.offsetHandler),this.art.once("destroy",this.destroy.bind(this))}#i(){this.art.off("subtitle",this.visibleHandler),this.art.off("subtitleLoad",this.switchHandler),this.art.off("subtitleOffset",this.offsetHandler)}#n(e){this.$webvtt.style.visibility=e?"visible":"hidden"}#r(e){return this.#o(e)?e:new URL(e,document.baseURI).toString()}#o(e){return/^https?:\/\//.test(e)}#a({workerUrl:e,wasmUrl:t}){return new Promise(s=>{fetch(e).then(e=>e.text()).then(r=>{let n=r,i=new Blob([n=n.replace(/wasmBinaryFile\s*=\s*"(subtitles-octopus-worker\.wasm)"/g,(s,r)=>(t=t?this.#r(t):new URL(r,e).toString(),`wasmBinaryFile = "${t}"`))],{type:"text/javascript"});s(URL.createObjectURL(i))})})}#e(){let e=!1;try{if("object"==typeof WebAssembly&&"function"==typeof WebAssembly.instantiate){let t=new WebAssembly.Module(Uint8Array.of(0,97,115,109,1,0,0,0));t instanceof WebAssembly.Module&&(e=new WebAssembly.Instance(t) instanceof WebAssembly.Instance)}}catch(e){}this.utils.errorHandle(e,"Browser does not support WebAssembly")}}},{"libass-wasm":"lHkek","@parcel/transformer-js/src/esmodule-helpers.js":"9pCYc"}],lHkek:[function(e,t,s){"function"==typeof SubtitlesOctopusOnLoad&&SubtitlesOctopusOnLoad(),t.exports&&(t.exports=function(e){var t=!1;try{if("object"==typeof WebAssembly&&"function"==typeof WebAssembly.instantiate){let e=new WebAssembly.Module(Uint8Array.of(0,97,115,109,1,0,0,0));e instanceof WebAssembly.Module&&(t=new WebAssembly.Instance(e) instanceof WebAssembly.Instance)}}catch(e){}console.log("WebAssembly support detected: "+(t?"yes":"no"));var s=this;function r(){s.setCurrentTime(s.video.currentTime+s.timeOffset)}function n(){s.setIsPaused(!1,s.video.currentTime+s.timeOffset)}function i(){s.setIsPaused(!0,s.video.currentTime+s.timeOffset)}function a(){s.video.removeEventListener("timeupdate",r,!1)}function o(){s.video.addEventListener("timeupdate",r,!1);var e=s.video.currentTime+s.timeOffset;s.setCurrentTime(e)}function l(){s.setRate(s.video.playbackRate)}function c(){s.setIsPaused(!0,s.video.currentTime+s.timeOffset)}function d(e){e.target.removeEventListener(e.type,d,!1),s.resize()}function u(){var e=s.renderFramesData,t=performance.now();s.ctx.clearRect(0,0,s.canvas.width,s.canvas.height);for(var r=0;r<e.canvases.length;r++){var n=e.canvases[r];s.bufferCanvas.width=n.w,s.bufferCanvas.height=n.h;var i=new Uint8ClampedArray(n.buffer);if(s.hasAlphaBug)for(var a=3;a<i.length;a+=4)i[a]=i[a]>=1?i[a]:1;var o=new ImageData(i,n.w,n.h);s.bufferCanvasCtx.putImageData(o,0,0),s.ctx.drawImage(s.bufferCanvas,n.x,n.y)}if(s.debug){var l=Math.round(performance.now()-t),c=e.blendTime;void 0!==c?console.log("render: "+Math.round(e.spentTime-c)+" ms, blend: "+Math.round(c)+" ms, draw: "+l+" ms; TOTAL="+Math.round(e.spentTime+l)+" ms"):console.log(Math.round(e.spentTime)+" ms (+ "+l+" ms draw)"),s.renderStart=performance.now()}}function v(){var e=s.renderFramesData,t=performance.now();s.ctx.clearRect(0,0,s.canvas.width,s.canvas.height);for(var r=0;r<e.bitmaps.length;r++){var n=e.bitmaps[r];s.ctx.drawImage(n.bitmap,n.x,n.y)}if(s.debug){var i=Math.round(performance.now()-t);console.log(e.bitmaps.length+" bitmaps, libass: "+Math.round(e.libassTime)+"ms, decode: "+Math.round(e.decodeTime)+"ms, draw: "+i+"ms"),s.renderStart=performance.now()}}s.canvas=e.canvas,s.renderMode=e.renderMode||(e.lossyRender?"lossy":"wasm-blend"),s.libassMemoryLimit=e.libassMemoryLimit||0,s.libassGlyphLimit=e.libassGlyphLimit||0,s.targetFps=e.targetFps||24,s.prescaleFactor=e.prescaleFactor||1,s.prescaleHeightLimit=e.prescaleHeightLimit||1080,s.maxRenderHeight=e.maxRenderHeight||0,s.dropAllAnimations=e.dropAllAnimations||!1,s.isOurCanvas=!1,s.video=e.video,s.canvasParent=null,s.fonts=e.fonts||[],s.availableFonts=e.availableFonts||[],s.fallbackFont=e.fallbackFont||"default.woff2",s.lazyFileLoading=e.lazyFileLoading||!1,s.onReadyEvent=e.onReady,t?s.workerUrl=e.workerUrl||"subtitles-octopus-worker.js":s.workerUrl=e.legacyWorkerUrl||"subtitles-octopus-worker-legacy.js",s.subUrl=e.subUrl,s.subContent=e.subContent||null,s.onErrorEvent=e.onError,s.debug=e.debug||!1,s.lastRenderTime=0,s.pixelRatio=window.devicePixelRatio||1,s.timeOffset=e.timeOffset||0,s.hasAlphaBug=!1,function(){if("function"==typeof ImageData.prototype.constructor)try{new window.ImageData(new Uint8ClampedArray([0,0,0,0]),1,1);return}catch(e){console.log("detected that ImageData is not constructable despite browser saying so")}var e=document.createElement("canvas").getContext("2d");window.ImageData=function(){var t=0;if(arguments[0]instanceof Uint8ClampedArray)var s=arguments[t++];var r=arguments[t++],n=arguments[t],i=e.createImageData(r,n);return s&&i.data.set(s),i}}(),s.workerError=function(e){if(console.error("Worker error: ",e),s.onErrorEvent&&s.onErrorEvent(e),!s.debug)throw s.dispose(),Error("Worker error: "+e)},s.init=function(){if(!window.Worker){s.workerError("worker not supported");return}s.worker||(s.worker=new Worker(s.workerUrl),s.worker.addEventListener("message",s.onWorkerMessage),s.worker.addEventListener("error",s.workerError)),s.workerActive=!1,s.createCanvas(),s.setVideo(e.video),s.setSubUrl(e.subUrl),s.worker.postMessage({target:"worker-init",width:s.canvas.width,height:s.canvas.height,URL:document.URL,currentScript:s.workerUrl,preMain:!0,renderMode:s.renderMode,subUrl:s.subUrl,subContent:s.subContent,fonts:s.fonts,availableFonts:s.availableFonts,fallbackFont:s.fallbackFont,lazyFileLoading:s.lazyFileLoading,debug:s.debug,targetFps:s.targetFps,libassMemoryLimit:s.libassMemoryLimit,libassGlyphLimit:s.libassGlyphLimit,dropAllAnimations:s.dropAllAnimations})},s.createCanvas=function(){s.canvas||(s.video?(s.isOurCanvas=!0,s.canvas=document.createElement("canvas"),s.canvas.className="libassjs-canvas",s.canvas.style.display="none",s.canvasParent=document.createElement("div"),s.canvasParent.className="libassjs-canvas-parent",s.canvasParent.appendChild(s.canvas),s.video.nextSibling?s.video.parentNode.insertBefore(s.canvasParent,s.video.nextSibling):s.video.parentNode.appendChild(s.canvasParent)):s.canvas||s.workerError("Don't know where to render: you should give video or canvas in options.")),s.ctx=s.canvas.getContext("2d"),s.bufferCanvas=document.createElement("canvas"),s.bufferCanvasCtx=s.bufferCanvas.getContext("2d"),s.bufferCanvas.width=1,s.bufferCanvas.height=1;var e=new ImageData(new Uint8ClampedArray([0,255,0,0]),1,1);s.bufferCanvasCtx.clearRect(0,0,1,1),s.ctx.clearRect(0,0,1,1);var t=s.ctx.getImageData(0,0,1,1).data;s.bufferCanvasCtx.putImageData(e,0,0),s.ctx.drawImage(s.bufferCanvas,0,0);var r=s.ctx.getImageData(0,0,1,1).data;s.hasAlphaBug=t[1]!=r[1],s.hasAlphaBug&&console.log("Detected a browser having issue with transparent pixels, applying workaround")},s.setVideo=function(e){s.video=e,s.video&&(s.video.addEventListener("timeupdate",r,!1),s.video.addEventListener("playing",n,!1),s.video.addEventListener("pause",i,!1),s.video.addEventListener("seeking",a,!1),s.video.addEventListener("seeked",o,!1),s.video.addEventListener("ratechange",l,!1),s.video.addEventListener("waiting",c,!1),document.addEventListener("fullscreenchange",s.resizeWithTimeout,!1),document.addEventListener("mozfullscreenchange",s.resizeWithTimeout,!1),document.addEventListener("webkitfullscreenchange",s.resizeWithTimeout,!1),document.addEventListener("msfullscreenchange",s.resizeWithTimeout,!1),window.addEventListener("resize",s.resizeWithTimeout,!1),"undefined"!=typeof ResizeObserver&&(s.ro=new ResizeObserver(s.resizeWithTimeout),s.ro.observe(s.video)),s.video.videoWidth>0?s.resize():s.video.addEventListener("loadedmetadata",d,!1))},s.getVideoPosition=function(){var e=s.video.videoWidth/s.video.videoHeight,t=s.video.offsetWidth,r=s.video.offsetHeight,n=t,i=r;t/r>e?n=Math.floor(r*e):i=Math.floor(t/e);var a=(t-n)/2,o=(r-i)/2;return{width:n,height:i,x:a,y:o}},s.setSubUrl=function(e){s.subUrl=e},s.renderFrameData=null,s.workerActive=!1,s.frameId=0,s.onWorkerMessage=function(e){!s.workerActive&&(s.workerActive=!0,s.onReadyEvent&&s.onReadyEvent());var t=e.data;switch(t.target){case"stdout":console.log(t.content);break;case"console-log":console.log.apply(console,JSON.parse(t.content));break;case"console-debug":console.debug.apply(console,JSON.parse(t.content));break;case"console-info":console.info.apply(console,JSON.parse(t.content));break;case"console-warn":console.warn.apply(console,JSON.parse(t.content));break;case"console-error":console.error.apply(console,JSON.parse(t.content));break;case"stderr":console.error(t.content);break;case"window":window[t.method]();break;case"canvas":switch(t.op){case"getContext":s.ctx=s.canvas.getContext(t.type,t.attributes);break;case"resize":s.resize(t.width,t.height);break;case"renderCanvas":s.lastRenderTime<t.time&&(s.lastRenderTime=t.time,s.renderFramesData=t,window.requestAnimationFrame(u));break;case"renderFastCanvas":s.lastRenderTime<t.time&&(s.lastRenderTime=t.time,s.renderFramesData=t,window.requestAnimationFrame(v));break;case"setObjectProperty":s.canvas[t.object][t.property]=t.value;break;default:throw"eh?"}break;case"tick":s.frameId=t.id,s.worker.postMessage({target:"tock",id:s.frameId});break;case"custom":if(s.onCustomMessage)s.onCustomMessage(e);else throw"Custom message received but client onCustomMessage not implemented.";break;case"setimmediate":s.worker.postMessage({target:"setimmediate"});break;case"get-events":case"get-styles":case"ready":break;default:throw"what? "+t.target}},s.resize=function(e,t,r,n){var i=null;if(r=r||0,n=n||0,(!e||!t)&&s.video){var a=function(e,t){var r=s.prescaleFactor<=0?1:s.prescaleFactor;if(t<=0||e<=0)e=0,t=0;else{var n=r<1?-1:1,i=t;n*i*r<=n*s.prescaleHeightLimit?i*=r:n*i<n*s.prescaleHeightLimit&&(i=s.prescaleHeightLimit),s.maxRenderHeight>0&&i>s.maxRenderHeight&&(i=s.maxRenderHeight),e*=i/t,t=i}return{width:e,height:t}}((i=s.getVideoPosition()).width*s.pixelRatio,i.height*s.pixelRatio);e=a.width,t=a.height;var o=s.canvasParent.getBoundingClientRect().top-s.video.getBoundingClientRect().top;r=i.y-o,n=i.x}if(!e||!t){s.video||console.error("width or height is 0. You should specify width & height for resize.");return}(s.canvas.width!=e||s.canvas.height!=t||s.canvas.style.top!=r||s.canvas.style.left!=n)&&(s.canvas.width=e,s.canvas.height=t,null!=i&&(s.canvasParent.style.position="relative",s.canvas.style.display="block",s.canvas.style.position="absolute",s.canvas.style.width=i.width+"px",s.canvas.style.height=i.height+"px",s.canvas.style.top=r+"px",s.canvas.style.left=n+"px",s.canvas.style.pointerEvents="none"),s.worker.postMessage({target:"canvas",width:s.canvas.width,height:s.canvas.height}))},s.resizeWithTimeout=function(){s.resize(),setTimeout(s.resize,100)},s.runBenchmark=function(){s.worker.postMessage({target:"runBenchmark"})},s.customMessage=function(e,t){t=t||{},s.worker.postMessage({target:"custom",userData:e,preMain:t.preMain})},s.setCurrentTime=function(e){s.worker.postMessage({target:"video",currentTime:e})},s.setTrackByUrl=function(e){s.worker.postMessage({target:"set-track-by-url",url:e})},s.setTrack=function(e){s.worker.postMessage({target:"set-track",content:e})},s.freeTrack=function(e){s.worker.postMessage({target:"free-track"})},s.render=s.setCurrentTime,s.setIsPaused=function(e,t){s.worker.postMessage({target:"video",isPaused:e,currentTime:t})},s.setRate=function(e){s.worker.postMessage({target:"video",rate:e})},s.dispose=function(){s.worker.postMessage({target:"destroy"}),s.worker.terminate(),s.worker.removeEventListener("message",s.onWorkerMessage),s.worker.removeEventListener("error",s.workerError),s.workerActive=!1,s.worker=null,s.video&&(s.video.removeEventListener("timeupdate",r,!1),s.video.removeEventListener("playing",n,!1),s.video.removeEventListener("pause",i,!1),s.video.removeEventListener("seeking",a,!1),s.video.removeEventListener("seeked",o,!1),s.video.removeEventListener("ratechange",l,!1),s.video.removeEventListener("waiting",c,!1),s.video.removeEventListener("loadedmetadata",d,!1),document.removeEventListener("fullscreenchange",s.resizeWithTimeout,!1),document.removeEventListener("mozfullscreenchange",s.resizeWithTimeout,!1),document.removeEventListener("webkitfullscreenchange",s.resizeWithTimeout,!1),document.removeEventListener("msfullscreenchange",s.resizeWithTimeout,!1),window.removeEventListener("resize",s.resizeWithTimeout,!1),s.video.parentNode.removeChild(s.canvasParent),s.video=null),s.ro&&(s.ro.disconnect(),s.ro=null),s.onCustomMessage=null,s.onErrorEvent=null,s.onReadyEvent=null},s.fetchFromWorker=function(e,t,r){try{var n=e.target,i=setTimeout(function(){o(Error("Error: Timeout while try to fetch "+n))},5e3),a=function(e){e.data.target==n&&(t(e.data),s.worker.removeEventListener("message",a),s.worker.removeEventListener("error",o),clearTimeout(i))},o=function(e){r(e),s.worker.removeEventListener("message",a),s.worker.removeEventListener("error",o),clearTimeout(i)};s.worker.addEventListener("message",a),s.worker.addEventListener("error",o),s.worker.postMessage(e)}catch(e){r(e)}},s.createEvent=function(e){s.worker.postMessage({target:"create-event",event:e})},s.getEvents=function(e,t){s.fetchFromWorker({target:"get-events"},function(t){e(t.events)},t)},s.setEvent=function(e,t){s.worker.postMessage({target:"set-event",event:e,index:t})},s.removeEvent=function(e){s.worker.postMessage({target:"remove-event",index:e})},s.createStyle=function(e){s.worker.postMessage({target:"create-style",style:e})},s.getStyles=function(e,t){s.fetchFromWorker({target:"get-styles"},function(t){e(t.styles)},t)},s.setStyle=function(e,t){s.worker.postMessage({target:"set-style",style:e,index:t})},s.removeStyle=function(e){s.worker.postMessage({target:"remove-style",index:e})},s.init()})},{}],"9pCYc":[function(e,t,s){s.interopDefault=function(e){return e&&e.__esModule?e:{default:e}},s.defineInteropFlag=function(e){Object.defineProperty(e,"__esModule",{value:!0})},s.exportAll=function(e,t){return Object.keys(e).forEach(function(s){"default"===s||"__esModule"===s||Object.prototype.hasOwnProperty.call(t,s)||Object.defineProperty(t,s,{enumerable:!0,get:function(){return e[s]}})}),t},s.export=function(e,t,s){Object.defineProperty(e,t,{enumerable:!0,get:s})}},{}]},["5lsnt"],"5lsnt","parcelRequire4dc0");