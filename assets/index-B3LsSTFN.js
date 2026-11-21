(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))t(s);new MutationObserver(s=>{for(const a of s)if(a.type==="childList")for(const r of a.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&t(r)}).observe(document,{childList:!0,subtree:!0});function i(s){const a={};return s.integrity&&(a.integrity=s.integrity),s.referrerPolicy&&(a.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?a.credentials="include":s.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function t(s){if(s.ep)return;s.ep=!0;const a=i(s);fetch(s.href,a)}})();class Ih{ctx=null;seGain=null;muted=!1;seVolume=.75;bgmVolume=.65;bgmElements={normal:new Audio,reach:new Audio,jackpot:new Audio};bgmLoaded={normal:!1,reach:!1,jackpot:!1};activeBgmSlot=null;objectUrls=[];constructor(){for(const e of["normal","reach","jackpot"]){const i=this.bgmElements[e];i.loop=!0,i.preload="auto",i.volume=this.bgmVolume}this.tryAutoBindPublicBgm("normal","./bgm/normal.mp3"),this.tryAutoBindPublicBgm("reach","./bgm/reach.mp3"),this.tryAutoBindPublicBgm("jackpot","./bgm/jackpot.mp3")}ensureContext(){if(this.muted)return null;if(!this.ctx){const e=window.AudioContext||window.webkitAudioContext;if(!e)return null;this.ctx=new e,this.seGain=this.ctx.createGain(),this.seGain.gain.value=this.seVolume,this.seGain.connect(this.ctx.destination)}return this.ctx.state==="suspended"&&this.ctx.resume().catch(()=>{}),this.ctx}tryAutoBindPublicBgm(e,i){fetch(i,{method:"HEAD"}).then(t=>{const s=t.headers.get("content-type")||"";t.ok&&s.startsWith("audio/")&&this.setBgmUrl(e,i)}).catch(()=>{})}setBgmFile(e,i){const t=URL.createObjectURL(i);return this.objectUrls.push(t),e==="all"?(this.setBgmUrl("normal",t),this.setBgmUrl("reach",t),this.setBgmUrl("jackpot",t)):this.setBgmUrl(e,t),this.activeBgmSlot?this.playBgm(this.activeBgmSlot):this.playBgm("normal"),i.name}setBgmUrl(e,i){const t=this.bgmElements[e];t.src=i,this.bgmLoaded[e]=!0}playBgm(e){if(this.activeBgmSlot=e,this.muted||this.ytBgmDuck)return;const i=this.bgmLoaded[e]?e:this.bgmLoaded.normal?"normal":e;for(const t of["normal","reach","jackpot"]){const s=this.bgmElements[t];t===i&&this.bgmLoaded[t]?(s.volume=this.bgmVolume,s.paused&&s.play().catch(()=>{})):s.paused||s.pause()}}stopAllBgm(){for(const e of["normal","reach","jackpot"])this.bgmElements[e].pause();this.activeBgmSlot=null}setMuted(e){if(this.muted=e,this.seGain&&(this.seGain.gain.value=e?0:this.seVolume),e)for(const i of["normal","reach","jackpot"])this.bgmElements[i].pause();else this.activeBgmSlot&&!this.ytBgmDuck&&this.playBgm(this.activeBgmSlot)}ytBgmDuck=!1;setYoutubeChillMode(e){if(this.ytBgmDuck=e,e)for(const i of["normal","reach","jackpot"])this.bgmElements[i].pause();else!this.muted&&this.activeBgmSlot&&this.playBgm(this.activeBgmSlot)}toggleMuted(){return this.setMuted(!this.muted),this.muted}isMuted(){return this.muted}setSeVolume(e){this.seVolume=Math.max(0,Math.min(1,e)),this.seGain&&!this.muted&&(this.seGain.gain.value=this.seVolume)}setBgmVolume(e){this.bgmVolume=Math.max(0,Math.min(1,e));for(const i of["normal","reach","jackpot"])this.bgmElements[i].volume=this.bgmVolume}playPushButton(e=!1){const i=this.ensureContext();if(!i||!this.seGain)return;const t=i.currentTime,s=i.createOscillator(),a=i.createGain();s.type="triangle",s.frequency.setValueAtTime(165,t),s.frequency.exponentialRampToValueAtTime(48,t+.09),a.gain.setValueAtTime(.55,t),a.gain.exponentialRampToValueAtTime(.001,t+.1),s.connect(a).connect(this.seGain),s.start(t),s.stop(t+.11),(e?[587.33,880,1174.66,1760]:[523.25,783.99,1046.5]).forEach((n,o)=>{const l=i.createOscillator(),h=i.createGain();l.type=e?"sawtooth":"sine";const c=t+o*.032;l.frequency.setValueAtTime(n,c),h.gain.setValueAtTime(e?.18:.22,c),h.gain.exponentialRampToValueAtTime(.001,c+.22),l.connect(h).connect(this.seGain),l.start(c),l.stop(c+.24)})}playRowStop(){const e=this.ensureContext();if(!e||!this.seGain)return;const i=e.currentTime,t=e.createOscillator(),s=e.createGain();t.type="sine",t.frequency.setValueAtTime(440,i),t.frequency.exponentialRampToValueAtTime(293.66,i+.075),s.gain.setValueAtTime(.28,i),s.gain.exponentialRampToValueAtTime(.001,i+.085),t.connect(s).connect(this.seGain),t.start(i),t.stop(i+.09)}playReach(e){const i=this.ensureContext();if(!i||!this.seGain)return;const t=i.currentTime;(e?[523.25,659.25,783.99,1046.5,1318.5,1567.98]:[440,554.37,659.25,880]).forEach((a,r)=>{const n=i.createOscillator(),o=i.createGain();n.type="triangle";const l=t+r*.055;n.frequency.setValueAtTime(a,l),o.gain.setValueAtTime(.26,l),o.gain.exponentialRampToValueAtTime(.001,l+.36),n.connect(o).connect(this.seGain),n.start(l),n.stop(l+.38)})}playBubbles(e){const i=this.ensureContext();if(!i||!this.seGain)return;const t=i.currentTime,s=e?14:8;for(let a=0;a<s;a++){const r=i.createOscillator(),n=i.createGain();r.type="sine";const o=t+a*.068+Math.random()*.02,l=(e?260:380)+Math.random()*280;r.frequency.setValueAtTime(l,o),r.frequency.exponentialRampToValueAtTime(l*2.15,o+.085),n.gain.setValueAtTime(.2,o),n.gain.exponentialRampToValueAtTime(.001,o+.095),r.connect(n).connect(this.seGain),r.start(o),r.stop(o+.1)}}playGyogun(e){const i=this.ensureContext();if(!i||!this.seGain)return;const t=i.currentTime,s=e?[1046.5,1318.5,1567.98,2093,2637,3135.96]:[880,1108.73,1318.5,1760,2217.46,2637],a=34;for(let r=0;r<a;r++){const n=i.createOscillator(),o=i.createGain();n.type=r%3===0?"triangle":"sine";const l=t+r*.078,h=s[(r*2+r%3)%s.length];n.frequency.setValueAtTime(h,l),n.frequency.exponentialRampToValueAtTime(h*1.04,l+.18);const c=.18*(1-r/a*.45);o.gain.setValueAtTime(.001,l),o.gain.linearRampToValueAtTime(c,l+.015),o.gain.exponentialRampToValueAtTime(.001,l+.24),n.connect(o).connect(this.seGain),n.start(l),n.stop(l+.25)}}playPearlFlash(){const e=this.ensureContext();if(!e||!this.seGain)return;const i=e.currentTime,t=[{start:0,dur:.36,f0:720,f1:2480},{start:.38,dur:.16,f0:920,f1:2560},{start:.56,dur:.16,f0:980,f1:2680},{start:.74,dur:.52,f0:860,f1:2960}];for(const s of t){const a=e.createOscillator(),r=e.createOscillator(),n=e.createGain();a.type="sawtooth",r.type="sine";const o=i+s.start,l=o+s.dur;a.frequency.setValueAtTime(s.f0,o),a.frequency.exponentialRampToValueAtTime(s.f1,l),r.frequency.setValueAtTime(s.f0*2,o),r.frequency.exponentialRampToValueAtTime(s.f1*2,l);const h=e.createBiquadFilter();h.type="lowpass",h.frequency.value=4200,n.gain.setValueAtTime(.28,o),n.gain.exponentialRampToValueAtTime(.002,l+.04),a.connect(h),r.connect(h),h.connect(n).connect(this.seGain),a.start(o),r.start(o),a.stop(l+.05),r.stop(l+.05)}}playJackpotFanfare(e){const i=this.ensureContext();if(!i||!this.seGain)return;const t=i.currentTime,s=e?[{t:0,f:523.25,d:.14},{t:.15,f:659.25,d:.14},{t:.3,f:783.99,d:.14},{t:.46,f:1046.5,d:.32},{t:.82,f:880,d:.16},{t:1,f:1046.5,d:.65}]:[{t:0,f:440,d:.15},{t:.16,f:554.37,d:.15},{t:.32,f:659.25,d:.15},{t:.5,f:880,d:.55}];for(const a of s){const r=i.createOscillator(),n=i.createOscillator(),o=i.createGain();r.type="triangle",n.type="sawtooth";const l=t+a.t;r.frequency.setValueAtTime(a.f,l),n.frequency.setValueAtTime(a.f*.5,l),o.gain.setValueAtTime(.24,l),o.gain.exponentialRampToValueAtTime(.001,l+a.d),r.connect(o),n.connect(o),o.connect(this.seGain),r.start(l),n.start(l),r.stop(l+a.d+.02),n.stop(l+a.d+.02)}}createNoiseBuffer(e,i){const t=Math.max(1,Math.floor(e.sampleRate*i)),s=e.createBuffer(1,t,e.sampleRate),a=s.getChannelData(0);let r=0;for(let n=0;n<t;n++){const o=Math.random()*2-1;r=(r+.06*o)/1.06,a[n]=r*2.6+o*.25}return s}playScubaInhale(){const e=this.ensureContext();if(!e||!this.seGain)return;const i=e.currentTime,t=.72,s=e.createBufferSource();s.buffer=this.createNoiseBuffer(e,t);const a=e.createBiquadFilter();a.type="bandpass",a.frequency.setValueAtTime(780,i),a.frequency.linearRampToValueAtTime(1180,i+t*.65),a.Q.value=2.4;const r=e.createGain();r.gain.setValueAtTime(.001,i),r.gain.linearRampToValueAtTime(.24,i+.12),r.gain.setValueAtTime(.22,i+t*.7),r.gain.exponentialRampToValueAtTime(.001,i+t),s.connect(a).connect(r).connect(this.seGain),s.start(i),s.stop(i+t+.02)}playScubaExhale(e="normal"){const i=this.ensureContext();if(!i||!this.seGain)return;const t=i.currentTime,s=e==="tiny"?5:e==="nose"?7:9,a=e==="tiny"?.09:.16;for(let r=0;r<s;r++){const n=i.createOscillator(),o=i.createGain();n.type="sine";const l=t+r*(e==="tiny"?.065:.058)+Math.random()*.015,h=(e==="tiny"?420:210)+Math.random()*190;n.frequency.setValueAtTime(h,l),n.frequency.exponentialRampToValueAtTime(h*1.95,l+.075),o.gain.setValueAtTime(a,l),o.gain.exponentialRampToValueAtTime(.001,l+.085),n.connect(o).connect(this.seGain),n.start(l),n.stop(l+.09)}}playRegulatorPurge(){const e=this.ensureContext();if(!e||!this.seGain)return;const i=e.currentTime,t=e.createBufferSource();t.buffer=this.createNoiseBuffer(e,.52);const s=e.createBiquadFilter();s.type="bandpass",s.frequency.setValueAtTime(1450,i),s.frequency.exponentialRampToValueAtTime(420,i+.48),s.Q.value=1.1;const a=e.createGain();a.gain.setValueAtTime(.38,i),a.gain.exponentialRampToValueAtTime(.002,i+.5),t.connect(s).connect(a).connect(this.seGain),t.start(i),t.stop(i+.52),this.playBubbles(!0)}playEqualizePop(){const e=this.ensureContext();if(!e||!this.seGain)return;const i=e.currentTime,t=e.createOscillator(),s=e.createGain();t.type="triangle",t.frequency.setValueAtTime(320,i),t.frequency.exponentialRampToValueAtTime(860,i+.045),s.gain.setValueAtTime(.26,i),s.gain.exponentialRampToValueAtTime(.001,i+.055),t.connect(s).connect(this.seGain),t.start(i),t.stop(i+.06);const a=e.createOscillator(),r=e.createGain();a.type="sine",a.frequency.setValueAtTime(659.25,i+.05),a.frequency.exponentialRampToValueAtTime(880,i+.19),r.gain.setValueAtTime(.14,i+.05),r.gain.exponentialRampToValueAtTime(.001,i+.22),a.connect(r).connect(this.seGain),a.start(i+.05),a.stop(i+.24)}playBcdValve(e){const i=this.ensureContext();if(!i||!this.seGain)return;const t=i.currentTime;if(e){const s=i.createBufferSource();s.buffer=this.createNoiseBuffer(i,.18);const a=i.createBiquadFilter();a.type="highpass",a.frequency.value=1800;const r=i.createGain();r.gain.setValueAtTime(.24,t),r.gain.exponentialRampToValueAtTime(.001,t+.17),s.connect(a).connect(r).connect(this.seGain),s.start(t),s.stop(t+.18)}else this.playScubaExhale("tiny")}playDiveAlertBeep(){const e=this.ensureContext();if(!e||!this.seGain)return;const i=e.currentTime;for(let t=0;t<2;t++){const s=e.createOscillator(),a=e.createGain();s.type="square";const r=i+t*.11;s.frequency.setValueAtTime(2280,r),a.gain.setValueAtTime(.1,r),a.gain.exponentialRampToValueAtTime(.001,r+.08),s.connect(a).connect(this.seGain),s.start(r),s.stop(r+.09)}}playPadiSkillPass(e=!1){const i=this.ensureContext();if(!i||!this.seGain)return;const t=i.currentTime,s=e?[523.25,659.25,783.99,1046.5,1318.5,1567.98]:[523.25,659.25,783.99,1046.5];s.forEach((a,r)=>{const n=i.createOscillator(),o=i.createGain();n.type="triangle";const l=t+r*.085;n.frequency.setValueAtTime(a,l),o.gain.setValueAtTime(.24,l),o.gain.exponentialRampToValueAtTime(.001,l+(r===s.length-1?.55:.26)),n.connect(o).connect(this.seGain),n.start(l),n.stop(l+.58)})}playHookScrape(e=0){const i=this.ensureContext();if(!i||!this.seGain)return;const t=i.currentTime,s=i.createOscillator(),a=i.createGain();s.type="triangle";const r=340+e%4*95;s.frequency.setValueAtTime(r,t),s.frequency.exponentialRampToValueAtTime(r*.45,t+.065),a.gain.setValueAtTime(.2,t),a.gain.exponentialRampToValueAtTime(.001,t+.075),s.connect(a).connect(this.seGain),s.start(t),s.stop(t+.08)}playItemPickup(e=!1){const i=this.ensureContext();if(!i||!this.seGain)return;const t=i.currentTime;(e?[587.33,880,1174.66,1567.98]:[523.25,783.99,1046.5]).forEach((a,r)=>{const n=i.createOscillator(),o=i.createGain();n.type="sine";const l=t+r*.055;n.frequency.setValueAtTime(a,l),o.gain.setValueAtTime(.22,l),o.gain.exponentialRampToValueAtTime(.001,l+.24),n.connect(o).connect(this.seGain),n.start(l),n.stop(l+.25)})}playGearClick(e=0){const i=this.ensureContext();if(!i||!this.seGain)return;const t=i.currentTime,s=i.createOscillator(),a=i.createGain();s.type="triangle";const r=520+e%5*110;s.frequency.setValueAtTime(r*1.4,t),s.frequency.exponentialRampToValueAtTime(r*.65,t+.045),a.gain.setValueAtTime(.24,t),a.gain.exponentialRampToValueAtTime(.001,t+.055),s.connect(a).connect(this.seGain),s.start(t),s.stop(t+.06);const n=i.createOscillator(),o=i.createGain();n.type="sine",n.frequency.setValueAtTime(r*1.8,t+.035),o.gain.setValueAtTime(.16,t+.035),o.gain.exponentialRampToValueAtTime(.001,t+.11),n.connect(o).connect(this.seGain),n.start(t+.035),n.stop(t+.12)}playValveOpenHiss(){const e=this.ensureContext();if(!e||!this.seGain)return;const i=e.currentTime,t=e.createBufferSource();t.buffer=this.createNoiseBuffer(e,.55);const s=e.createBiquadFilter();s.type="bandpass",s.frequency.setValueAtTime(2600,i),s.frequency.exponentialRampToValueAtTime(1150,i+.5),s.Q.value=1.8;const a=e.createGain();a.gain.setValueAtTime(.001,i),a.gain.linearRampToValueAtTime(.32,i+.04),a.gain.exponentialRampToValueAtTime(.002,i+.52),t.connect(s).connect(a).connect(this.seGain),t.start(i),t.stop(i+.55)}playWaterSplashEntry(){const e=this.ensureContext();if(!e||!this.seGain)return;const i=e.currentTime,t=e.createOscillator(),s=e.createGain();t.type="sine",t.frequency.setValueAtTime(145,i),t.frequency.exponentialRampToValueAtTime(38,i+.28),s.gain.setValueAtTime(.46,i),s.gain.exponentialRampToValueAtTime(.001,i+.32),t.connect(s).connect(this.seGain),t.start(i),t.stop(i+.34);const a=e.createBufferSource();a.buffer=this.createNoiseBuffer(e,.85);const r=e.createBiquadFilter();r.type="lowpass",r.frequency.setValueAtTime(2400,i),r.frequency.exponentialRampToValueAtTime(420,i+.82);const n=e.createGain();n.gain.setValueAtTime(.42,i),n.gain.exponentialRampToValueAtTime(.002,i+.84),a.connect(r).connect(n).connect(this.seGain),a.start(i),a.stop(i+.86),this.playBubbles(!0)}playSonarScanLock(){const e=this.ensureContext();if(!e||!this.seGain)return;const i=e.currentTime;for(const[t,s]of[[0,1174.66],[.07,1760]]){const a=e.createOscillator(),r=e.createGain();a.type="sine",a.frequency.setValueAtTime(s,i+t),r.gain.setValueAtTime(.14,i+t),r.gain.exponentialRampToValueAtTime(.001,i+t+.16),a.connect(r).connect(this.seGain),a.start(i+t),a.stop(i+t+.17)}}playKnifeChop(e=0,i="skewer_chop"){const t=this.ensureContext();if(!t||!this.seGain)return;const s=t.currentTime,a=(n,o,l,h=.06)=>{const c=t.createOscillator(),u=t.createGain();c.type="triangle",c.frequency.setValueAtTime(o,n),c.frequency.exponentialRampToValueAtTime(Math.max(55,o*.34),n+h*.85),u.gain.setValueAtTime(l,n),u.gain.exponentialRampToValueAtTime(.001,n+h),c.connect(u).connect(this.seGain),c.start(n),c.stop(n+h+.01)},r=(n,o,l,h,c)=>{const u=t.createBufferSource();u.buffer=this.createNoiseBuffer(t,Math.min(.45,c+.02));const g=t.createBiquadFilter();g.type="bandpass",g.frequency.setValueAtTime(o,n),g.Q.value=l;const p=t.createGain();p.gain.setValueAtTime(.001,n),p.gain.linearRampToValueAtTime(h,n+Math.min(.018,c*.25)),p.gain.exponentialRampToValueAtTime(.001,n+c),u.connect(g).connect(p).connect(this.seGain),u.start(n),u.stop(n+c+.015)};if(i==="fish_deba")r(s+.11,2900,1.8,.24,.085),a(s+.14,215,.34,.065),r(s+.3,3800,3.2,.15,.38);else if(i==="fish_kazari")for(let n=0;n<3;n++)r(s+.08+n*.23,4400+n*260,3.8,.15,.14);else if(i==="wagyu_sinew")for(let n=0;n<4;n++){const o=s+.06+n*.145;r(o,4100,3.4,.11,.055),a(o+.012,295+n%2*22,.18,.042)}else if(i==="wagyu_slice")for(let n=0;n<4;n++){const o=s+.06+n*.185;r(o,3400+n*180,2.8,.16,.12),a(o+.085,228+n%2*18,.2,.048)}else if(i==="skewer_star")r(s+.08,3600,2.6,.16,.09),r(s+.29,3900,2.6,.16,.09),r(s+.5,5600,5.2,.13,.18);else if(i==="clam_pry")r(s+.08,2400,4.2,.2,.24),a(s+.38,420,.3,.045),a(s+.42,260,.24,.055);else if(i==="clam_shuck")r(s+.07,3500,3,.18,.2),r(s+.34,4200,3.2,.14,.1),a(s+.4,245,.18,.045),r(s+.52,4400,3.2,.14,.1);else if(i==="lobster_helm"||i==="lobster_split")r(s+.09,2100,1.7,.26,.11),a(s+.12,340,.28,.05),r(s+.32,2550,2,.28,.18),a(s+.44,198+e%2*20,.36,.07);else for(let n=0;n<4;n++){const o=s+.05+n*.155;a(o,242+(e+n)%3*24,.32,.058),r(o,3300+n%2*380,2.4,.17,.065)}}playBbqSizzle(e=!1,i=!1){const t=this.ensureContext();if(!t||!this.seGain)return;const s=t.currentTime;if(e){const h=t.createOscillator(),c=t.createGain();h.type="sine",h.frequency.setValueAtTime(2480,s),h.frequency.exponentialRampToValueAtTime(1620,s+.045),c.gain.setValueAtTime(.15,s),c.gain.exponentialRampToValueAtTime(.001,s+.055),h.connect(c).connect(this.seGain),h.start(s),h.stop(s+.06)}const a=i?.36:.68,r=i?.065:e?.24:.28,n=t.createBufferSource();n.buffer=this.createNoiseBuffer(t,a);const o=t.createBiquadFilter();o.type="bandpass",o.frequency.setValueAtTime(i?4200:3600,s),o.frequency.exponentialRampToValueAtTime(2200,s+a),o.Q.value=1.15;const l=t.createGain();l.gain.setValueAtTime(.001,s),l.gain.linearRampToValueAtTime(r,s+.035),l.gain.exponentialRampToValueAtTime(.002,s+a-.02),n.connect(o).connect(l).connect(this.seGain),n.start(s),n.stop(s+a)}playEatBite(e=!1){const i=this.ensureContext();if(!i||!this.seGain)return;const t=i.currentTime;for(let s=0;s<2;s++){const a=t+s*.16,r=i.createBufferSource();r.buffer=this.createNoiseBuffer(i,.085);const n=i.createBiquadFilter();n.type="bandpass",n.frequency.setValueAtTime(1650+s*380,a),n.Q.value=1.6;const o=i.createGain();o.gain.setValueAtTime(.24,a),o.gain.exponentialRampToValueAtTime(.001,a+.075),r.connect(n).connect(o).connect(this.seGain),r.start(a),r.stop(a+.085)}e&&[523.25,659.25,783.99,1046.5].forEach((a,r)=>{const n=i.createOscillator(),o=i.createGain();n.type="triangle";const l=t+.24+r*.06;n.frequency.setValueAtTime(a,l),o.gain.setValueAtTime(.18,l),o.gain.exponentialRampToValueAtTime(.001,l+.28),n.connect(o).connect(this.seGain),n.start(l),n.stop(l+.3)})}playDiveCompBeep(e="button"){const i=this.ensureContext();if(!i||!this.seGain)return;const t=i.currentTime,s=e==="button"?[[0,3450,.036,.14]]:e==="safety_start"?[[0,2480,.065,.18],[.085,3320,.085,.2]]:e==="safety_clear"?[[0,2637,.065,.18],[.08,3136,.065,.18],[.16,3951,.14,.22]]:[[0,3820,.055,.24],[.08,3820,.055,.24],[.16,3120,.065,.22]];for(const[a,r,n,o]of s){const l=i.createOscillator(),h=i.createGain();l.type=e==="alarm"?"square":"sine";const c=t+a;l.frequency.setValueAtTime(r,c),h.gain.setValueAtTime(.001,c),h.gain.linearRampToValueAtTime(o,c+.006),h.gain.exponentialRampToValueAtTime(.001,c+n),l.connect(h).connect(this.seGain),l.start(c),l.stop(c+n+.01)}}playDrinkSip(e=!0,i=!1){const t=this.ensureContext();if(!t||!this.seGain)return;const s=t.currentTime;if(e){const a=[.06,.22],r=[3180,4120];a.forEach((n,o)=>{const l=t.createOscillator(),h=t.createGain();l.type="sine";const c=s+n;l.frequency.setValueAtTime(r[o],c),l.frequency.exponentialRampToValueAtTime(r[o]*.94,c+.09),h.gain.setValueAtTime(.11,c),h.gain.exponentialRampToValueAtTime(.001,c+.1),l.connect(h).connect(this.seGain),l.start(c),l.stop(c+.11)})}for(let a=0;a<2;a++){const r=s+.58+a*.44,n=t.createOscillator(),o=t.createGain();n.type="sine",n.frequency.setValueAtTime(285,r),n.frequency.exponentialRampToValueAtTime(148,r+.085),n.frequency.exponentialRampToValueAtTime(340,r+.15),o.gain.setValueAtTime(.001,r),o.gain.linearRampToValueAtTime(.24,r+.03),o.gain.exponentialRampToValueAtTime(.001,r+.17),n.connect(o).connect(this.seGain),n.start(r),n.stop(r+.18);const l=t.createBufferSource();l.buffer=this.createNoiseBuffer(t,.14);const h=t.createBiquadFilter();h.type="bandpass",h.frequency.setValueAtTime(1250+a*180,r),h.Q.value=2.2;const c=t.createGain();c.gain.setValueAtTime(.09,r),c.gain.exponentialRampToValueAtTime(.001,r+.13),l.connect(h).connect(c).connect(this.seGain),l.start(r),l.stop(r+.14)}i&&[587.33,739.99,880,1174.66].forEach((r,n)=>{const o=t.createOscillator(),l=t.createGain();o.type="triangle";const h=s+1.48+n*.065;o.frequency.setValueAtTime(r,h),l.gain.setValueAtTime(.16,h),l.gain.exponentialRampToValueAtTime(.001,h+.28),o.connect(l).connect(this.seGain),o.start(h),o.stop(h+.3)})}playFishingCast(){const e=this.ensureContext();if(!e||!this.seGain||this.muted)return;const i=e.currentTime,t=e.createBufferSource();t.buffer=this.createNoiseBuffer(e,.22);const s=e.createBiquadFilter();s.type="bandpass",s.frequency.setValueAtTime(520,i),s.frequency.exponentialRampToValueAtTime(2400,i+.11),s.frequency.exponentialRampToValueAtTime(680,i+.2),s.Q.value=2.6;const a=e.createGain();a.gain.setValueAtTime(.001,i),a.gain.linearRampToValueAtTime(.28,i+.06),a.gain.exponentialRampToValueAtTime(.001,i+.21),t.connect(s).connect(a).connect(this.seGain),t.start(i),t.stop(i+.22);const r=i+.34,n=e.createOscillator(),o=e.createGain();n.type="sine",n.frequency.setValueAtTime(420,r),n.frequency.exponentialRampToValueAtTime(165,r+.07),n.frequency.exponentialRampToValueAtTime(640,r+.16),o.gain.setValueAtTime(.24,r),o.gain.exponentialRampToValueAtTime(.001,r+.18),n.connect(o).connect(this.seGain),n.start(r),n.stop(r+.19)}playFishingNibble(){const e=this.ensureContext();if(!e||!this.seGain||this.muted)return;const i=e.currentTime,t=e.createOscillator(),s=e.createGain();t.type="sine",t.frequency.setValueAtTime(540,i),t.frequency.exponentialRampToValueAtTime(320,i+.065),s.gain.setValueAtTime(.14,i),s.gain.exponentialRampToValueAtTime(.001,i+.075),t.connect(s).connect(this.seGain),t.start(i),t.stop(i+.08)}playFishingBiteAlert(){const e=this.ensureContext();if(!e||!this.seGain||this.muted)return;const i=e.currentTime,t=e.createOscillator(),s=e.createGain();t.type="triangle",t.frequency.setValueAtTime(320,i),t.frequency.exponentialRampToValueAtTime(92,i+.16),s.gain.setValueAtTime(.32,i),s.gain.exponentialRampToValueAtTime(.001,i+.18),t.connect(s).connect(this.seGain),t.start(i),t.stop(i+.19),[880,1318.5].forEach((a,r)=>{const n=e.createOscillator(),o=e.createGain();n.type="triangle";const l=i+.04+r*.075;n.frequency.setValueAtTime(a,l),o.gain.setValueAtTime(.22,l),o.gain.exponentialRampToValueAtTime(.001,l+.18),n.connect(o).connect(this.seGain),n.start(l),n.stop(l+.19)})}playFishingReelTick(e){const i=this.ensureContext();if(!i||!this.seGain||this.muted)return;const t=i.currentTime,s=i.createOscillator(),a=i.createGain();s.type=e?"sawtooth":"triangle",s.frequency.setValueAtTime(e?1680:1080,t),s.frequency.exponentialRampToValueAtTime(e?1120:680,t+.032),a.gain.setValueAtTime(e?.13:.1,t),a.gain.exponentialRampToValueAtTime(.001,t+.038),s.connect(a).connect(this.seGain),s.start(t),s.stop(t+.042)}playFishingCastChargeTick(e){const i=this.ensureContext();if(!i||!this.seGain||this.muted)return;const t=i.currentTime,s=i.createOscillator(),a=i.createGain();s.type="sine";const r=440+Math.max(0,Math.min(100,e))*6.2;s.frequency.setValueAtTime(r,t),s.frequency.exponentialRampToValueAtTime(r*1.12,t+.028),a.gain.setValueAtTime(.08,t),a.gain.exponentialRampToValueAtTime(.001,t+.032),s.connect(a).connect(this.seGain),s.start(t),s.stop(t+.036)}playFishingPerfectCast(){const e=this.ensureContext();if(!e||!this.seGain||this.muted)return;const i=e.currentTime;[783.99,1046.5,1318.51,1567.98].forEach((t,s)=>{const a=e.createOscillator(),r=e.createGain();a.type="triangle";const n=i+s*.045;a.frequency.setValueAtTime(t,n),r.gain.setValueAtTime(.18,n),r.gain.exponentialRampToValueAtTime(.001,n+.22),a.connect(r).connect(this.seGain),a.start(n),a.stop(n+.24)})}playFishingTwitch(e){const i=this.ensureContext();if(!i||!this.seGain||this.muted)return;const t=i.currentTime,s=i.createBufferSource();s.buffer=this.createNoiseBuffer(i,.16);const a=i.createBiquadFilter();a.type="bandpass",a.frequency.setValueAtTime(e?1150:760,t),a.frequency.exponentialRampToValueAtTime(e?2650:1380,t+.09),a.Q.value=e?2.8:1.5;const r=i.createGain();r.gain.setValueAtTime(.001,t),r.gain.linearRampToValueAtTime(.18,t+.03),r.gain.exponentialRampToValueAtTime(.001,t+.15),s.connect(a).connect(r).connect(this.seGain),s.start(t),s.stop(t+.16);const n=i.createOscillator(),o=i.createGain();n.type="sine",n.frequency.setValueAtTime(e?620:380,t+.05),n.frequency.exponentialRampToValueAtTime(e?920:580,t+.13),o.gain.setValueAtTime(.11,t+.05),o.gain.exponentialRampToValueAtTime(.001,t+.14),n.connect(o).connect(this.seGain),n.start(t+.05),n.stop(t+.15)}playFishingCriticalHook(){const e=this.ensureContext();if(!e||!this.seGain||this.muted)return;const i=e.currentTime,t=e.createOscillator(),s=e.createGain();t.type="sawtooth",t.frequency.setValueAtTime(210,i),t.frequency.exponentialRampToValueAtTime(58,i+.18),s.gain.setValueAtTime(.3,i),s.gain.exponentialRampToValueAtTime(.001,i+.2),t.connect(s).connect(this.seGain),t.start(i),t.stop(i+.21),[1046.5,1318.51,2093].forEach((a,r)=>{const n=e.createOscillator(),o=e.createGain();n.type="triangle";const l=i+.02+r*.048;n.frequency.setValueAtTime(a,l),o.gain.setValueAtTime(.22,l),o.gain.exponentialRampToValueAtTime(.001,l+.24),n.connect(o).connect(this.seGain),n.start(l),n.stop(l+.25)})}playFishingDragScream(){const e=this.ensureContext();if(!e||!this.seGain||this.muted)return;const i=e.currentTime;for(let t=0;t<4;t++){const s=i+t*.028,a=e.createOscillator(),r=e.createGain();a.type="sawtooth",a.frequency.setValueAtTime(2280-t*90,s),a.frequency.exponentialRampToValueAtTime(1420,s+.024),r.gain.setValueAtTime(.14,s),r.gain.exponentialRampToValueAtTime(.001,s+.026),a.connect(r).connect(this.seGain),a.start(s),a.stop(s+.028)}}playFishingCounterSuccess(){const e=this.ensureContext();if(!e||!this.seGain||this.muted)return;const i=e.currentTime;[659.25,987.77].forEach((t,s)=>{const a=e.createOscillator(),r=e.createGain();a.type="sine";const n=i+s*.04;a.frequency.setValueAtTime(t,n),r.gain.setValueAtTime(.12,n),r.gain.exponentialRampToValueAtTime(.001,n+.12),a.connect(r).connect(this.seGain),a.start(n),a.stop(n+.13)})}playFishingCatchFanfare(e){const i=this.ensureContext();if(!i||!this.seGain||this.muted)return;const t=i.currentTime,s=i.createBufferSource();s.buffer=this.createNoiseBuffer(i,.28);const a=i.createBiquadFilter();a.type="bandpass",a.frequency.setValueAtTime(950,t),a.Q.value=1.2;const r=i.createGain();r.gain.setValueAtTime(.22,t),r.gain.exponentialRampToValueAtTime(.001,t+.26),s.connect(a).connect(r).connect(this.seGain),s.start(t),s.stop(t+.28);const n=e?[523.25,659.25,698.46,783.99,987.77,1046.5,1318.51]:[523.25,659.25,698.46,783.99,1046.5];n.forEach((o,l)=>{const h=i.createOscillator(),c=i.createGain();h.type="triangle";const u=t+.06+l*.075,g=l===n.length-1?.42:.18;h.frequency.setValueAtTime(o,u),c.gain.setValueAtTime(.2,u),c.gain.exponentialRampToValueAtTime(.001,u+g),h.connect(c).connect(this.seGain),h.start(u),h.stop(u+g+.02)})}playOkiSlotBet(){const e=this.ensureContext();if(!e||!this.seGain||this.muted)return;const i=e.currentTime;[1174.66,1318.51,1567.98].forEach((t,s)=>{const a=e.createOscillator(),r=e.createGain();a.type="square";const n=i+s*.042;a.frequency.setValueAtTime(t,n),r.gain.setValueAtTime(.08,n),r.gain.exponentialRampToValueAtTime(.001,n+.045),a.connect(r).connect(this.seGain),a.start(n),a.stop(n+.05)})}playOkiSlotLever(e=!1,i=!1){const t=this.ensureContext();if(!t||!this.seGain||this.muted)return;const s=t.currentTime,a=t.createOscillator(),r=t.createGain();if(a.type="triangle",a.frequency.setValueAtTime(195,s),a.frequency.exponentialRampToValueAtTime(68,s+.045),r.gain.setValueAtTime(.2,s),r.gain.exponentialRampToValueAtTime(.001,s+.05),a.connect(r).connect(this.seGain),a.start(s),a.stop(s+.055),i)return;const n=s+(e?.28:.025);[659.25,880,1046.5].forEach((o,l)=>{const h=t.createOscillator(),c=t.createGain();h.type="triangle";const u=n+l*.032;h.frequency.setValueAtTime(o,u),c.gain.setValueAtTime(.14,u),c.gain.exponentialRampToValueAtTime(.001,u+.14),h.connect(c).connect(this.seGain),h.start(u),h.stop(u+.15)})}playOkiSlotStop(e){const i=this.ensureContext();if(!i||!this.seGain||this.muted)return;const t=i.currentTime,s=i.createOscillator(),a=i.createGain();s.type="triangle";const r=820+e*95;s.frequency.setValueAtTime(r,t),s.frequency.exponentialRampToValueAtTime(340,t+.05),a.gain.setValueAtTime(.18,t),a.gain.exponentialRampToValueAtTime(.001,t+.055),s.connect(a).connect(this.seGain),s.start(t),s.stop(t+.06)}playOkiSlotHibiscusChika(e){const i=this.ensureContext();if(!i||!this.seGain||this.muted)return;const t=i.currentTime,s=i.createOscillator(),a=i.createGain();s.type="sawtooth",s.frequency.setValueAtTime(220,t),s.frequency.exponentialRampToValueAtTime(880,t+.055),a.gain.setValueAtTime(.24,t),a.gain.exponentialRampToValueAtTime(.001,t+.12),s.connect(a).connect(this.seGain),s.start(t),s.stop(t+.13);const r=e?2:1;for(let n=0;n<r;n++){const o=t+.02+n*.24,l=i.createOscillator(),h=i.createGain();l.type="sine",l.frequency.setValueAtTime(920,o),l.frequency.exponentialRampToValueAtTime(3120,o+.15),l.frequency.exponentialRampToValueAtTime(2240,o+.23),h.gain.setValueAtTime(.001,o),h.gain.linearRampToValueAtTime(.28,o+.03),h.gain.exponentialRampToValueAtTime(.001,o+.25),l.connect(h).connect(this.seGain),l.start(o),l.stop(o+.26)}}playOkiSlotPayout(e,i){const t=this.ensureContext();if(!t||!this.seGain||this.muted)return;const s=t.currentTime;if(i){[987.77,1318.51,1567.98].forEach((r,n)=>{const o=t.createOscillator(),l=t.createGain();o.type="sine";const h=s+n*.055;o.frequency.setValueAtTime(r,h),l.gain.setValueAtTime(.16,h),l.gain.exponentialRampToValueAtTime(.001,h+.14),o.connect(l).connect(this.seGain),o.start(h),o.stop(h+.15)});return}const a=Math.min(10,Math.max(2,e));for(let r=0;r<a;r++){const n=s+r*.052,o=t.createOscillator(),l=t.createGain();o.type="triangle",o.frequency.setValueAtTime(r%2===0?1396.91:1760,n),l.gain.setValueAtTime(.14,n),l.gain.exponentialRampToValueAtTime(.001,n+.05),o.connect(l).connect(this.seGain),o.start(n),o.stop(n+.055)}}playOkiSlotBonusFanfare(e){const i=this.ensureContext();if(!i||!this.seGain||this.muted)return;const t=i.currentTime,s=e?[523.25,659.25,698.46,783.99,987.77,1046.5,987.77,1046.5,1318.51,1567.98]:[523.25,659.25,698.46,783.99,1046.5,1318.51];s.forEach((a,r)=>{const n=i.createOscillator(),o=i.createGain();n.type="square";const l=t+r*.085,h=r===s.length-1?.52:.14;n.frequency.setValueAtTime(a,l),o.gain.setValueAtTime(.14,l),o.gain.exponentialRampToValueAtTime(.001,l+h),n.connect(o).connect(this.seGain),n.start(l),n.stop(l+h+.02)})}playOkiSlotBonusStepChime(e){const i=this.ensureContext();if(!i||!this.seGain||this.muted)return;const t=i.currentTime;[523.25,659.25,698.46,783.99,987.77,1046.5].forEach((a,r)=>{const n=i.createOscillator(),o=i.createGain();n.type="triangle";const l=t+r*.044;n.frequency.setValueAtTime(a,l),o.gain.setValueAtTime(.15,l),o.gain.exponentialRampToValueAtTime(.001,l+.09),n.connect(o).connect(this.seGain),n.start(l),n.stop(l+.1)}),e&&this.playOkiSlotHibiscusChika(!0)}playOkiSlotBonusEndChime(){const e=this.ensureContext();if(!e||!this.seGain||this.muted)return;const i=e.currentTime,t=[523.25,659.25,783.99,987.77,1046.5,1318.51,1567.98];t.forEach((s,a)=>{const r=e.createOscillator(),n=e.createGain();r.type=a%2===0?"triangle":"sine";const o=i+a*.06,l=a===t.length-1?.65:.22;r.frequency.setValueAtTime(s,o),n.gain.setValueAtTime(.15,o),n.gain.exponentialRampToValueAtTime(.001,o+l),r.connect(n).connect(this.seGain),r.start(o),r.stop(o+l+.03)})}playOkiSlotBlackout(){const e=this.ensureContext();if(!e||!this.seGain||this.muted)return;const i=e.currentTime,t=e.createOscillator(),s=e.createGain();t.type="sine",t.frequency.setValueAtTime(168,i),t.frequency.exponentialRampToValueAtTime(52,i+.19),s.gain.setValueAtTime(.24,i),s.gain.exponentialRampToValueAtTime(.001,i+.21),t.connect(s).connect(this.seGain),t.start(i),t.stop(i+.22)}playAutoDoorSlide(e=!0){const i=this.ensureContext();if(!i||!this.seGain||this.muted)return;const t=i.currentTime,s=i.createBufferSource();s.buffer=this.createNoiseBuffer(i,.36);const a=i.createBiquadFilter();a.type="bandpass",a.frequency.setValueAtTime(e?680:920,t),a.frequency.exponentialRampToValueAtTime(e?1320:540,t+.32),a.Q.value=2.2;const r=i.createGain();r.gain.setValueAtTime(.001,t),r.gain.linearRampToValueAtTime(.085,t+.05),r.gain.exponentialRampToValueAtTime(.001,t+.34),s.connect(a).connect(r).connect(this.seGain),s.start(t),s.stop(t+.36);const n=i.createOscillator(),o=i.createGain();n.type="sine",n.frequency.setValueAtTime(e?185:235,t),n.frequency.exponentialRampToValueAtTime(e?248:158,t+.28),o.gain.setValueAtTime(.001,t),o.gain.linearRampToValueAtTime(.055,t+.04),o.gain.exponentialRampToValueAtTime(.001,t+.3),n.connect(o).connect(this.seGain),n.start(t),n.stop(t+.32)}playCameraShutter(){const e=this.ensureContext();if(!e||!this.seGain||this.muted)return;const i=e.currentTime;[1760,2349.32].forEach((t,s)=>{const a=e.createOscillator(),r=e.createGain();a.type="sine";const n=i+s*.026;a.frequency.setValueAtTime(t,n),r.gain.setValueAtTime(.065,n),r.gain.exponentialRampToValueAtTime(.001,n+.024),a.connect(r).connect(this.seGain),a.start(n),a.stop(n+.028)}),[.045,.088].forEach((t,s)=>{const a=i+t,r=e.createBufferSource();r.buffer=this.createNoiseBuffer(e,.055);const n=e.createBiquadFilter();n.type="bandpass",n.frequency.setValueAtTime(s===0?2600:1950,a),n.Q.value=1.45;const o=e.createGain();o.gain.setValueAtTime(s===0?.28:.22,a),o.gain.exponentialRampToValueAtTime(.001,a+.042),r.connect(n).connect(o).connect(this.seGain),r.start(a),r.stop(a+.05);const l=e.createOscillator(),h=e.createGain();l.type="triangle",l.frequency.setValueAtTime(s===0?1420:1080,a),l.frequency.exponentialRampToValueAtTime(165,a+.026),h.gain.setValueAtTime(.18,a),h.gain.exponentialRampToValueAtTime(.001,a+.028),l.connect(h).connect(this.seGain),l.start(a),l.stop(a+.032)})}dispose(){this.stopAllBgm();for(const e of this.objectUrls)URL.revokeObjectURL(e);this.ctx&&this.ctx.close().catch(()=>{})}}function O(){const f=new Float32Array(16);return f[0]=1,f[5]=1,f[10]=1,f[15]=1,f}function Nh(f,e,i,t,s){const a=1/Math.tan(e*.5),r=1/(t-s);return f.fill(0),f[0]=a/i,f[5]=a,f[10]=(s+t)*r,f[11]=-1,f[14]=2*s*t*r,f}function Va(f,e,i,t){let s=e[0]-i[0],a=e[1]-i[1],r=e[2]-i[2],n=Math.hypot(s,a,r);n<1e-6&&(r=1,n=1),s/=n,a/=n,r/=n;let o=t[1]*r-t[2]*a,l=t[2]*s-t[0]*r,h=t[0]*a-t[1]*s;n=Math.hypot(o,l,h),n<1e-6?(o=1,l=0,h=0):(o/=n,l/=n,h/=n);const c=a*h-r*l,u=r*o-s*h,g=s*l-a*o;return f[0]=o,f[1]=c,f[2]=s,f[3]=0,f[4]=l,f[5]=u,f[6]=a,f[7]=0,f[8]=h,f[9]=g,f[10]=r,f[11]=0,f[12]=-(o*e[0]+l*e[1]+h*e[2]),f[13]=-(c*e[0]+u*e[1]+g*e[2]),f[14]=-(s*e[0]+a*e[1]+r*e[2]),f[15]=1,f}function Ee(f,e,i){const t=e[0],s=e[1],a=e[2],r=e[3],n=e[4],o=e[5],l=e[6],h=e[7],c=e[8],u=e[9],g=e[10],p=e[11],x=e[12],S=e[13],T=e[14],k=e[15];for(let m=0;m<4;m++){const A=m*4,D=i[A],I=i[A+1],W=i[A+2],w=i[A+3];f[A]=D*t+I*n+W*c+w*x,f[A+1]=D*s+I*o+W*u+w*S,f[A+2]=D*a+I*l+W*g+w*T,f[A+3]=D*r+I*h+W*p+w*k}return f}function Oh(f,e){const i=e[0],t=e[1],s=e[2],a=e[3],r=e[4],n=e[5],o=e[6],l=e[7],h=e[8],c=e[9],u=e[10],g=e[11],p=e[12],x=e[13],S=e[14],T=e[15],k=i*n-t*r,m=i*o-s*r,A=i*l-a*r,D=t*o-s*n,I=t*l-a*n,W=s*l-a*o,w=h*x-c*p,y=h*S-u*p,M=h*T-g*p,P=c*S-u*x,U=c*T-g*x,L=u*T-g*S;let E=k*L-m*U+A*P+D*M-I*y+W*w;return Math.abs(E)<1e-12?O():(E=1/E,f[0]=(n*L-o*U+l*P)*E,f[1]=(s*U-t*L-a*P)*E,f[2]=(x*W-S*I+T*D)*E,f[3]=(u*I-c*W-g*D)*E,f[4]=(o*M-r*L-l*y)*E,f[5]=(i*L-s*M+a*y)*E,f[6]=(S*A-p*W-T*m)*E,f[7]=(h*W-u*A+g*m)*E,f[8]=(r*U-n*M+l*w)*E,f[9]=(t*M-i*U-a*w)*E,f[10]=(p*I-x*A+T*k)*E,f[11]=(c*A-h*I-g*k)*E,f[12]=(n*y-r*P-o*w)*E,f[13]=(i*P-t*y+s*w)*E,f[14]=(x*m-p*D-S*k)*E,f[15]=(h*D-c*m+u*k)*E,f)}function ir(f,e){const i=f[0]*e[0]+f[4]*e[1]+f[8]*e[2]+f[12],t=f[1]*e[0]+f[5]*e[1]+f[9]*e[2]+f[13],s=f[3]*e[0]+f[7]*e[1]+f[11]*e[2]+f[15];if(s<=.001)return[.5,1.25,0];const a=i/s,r=t/s;return[a*.5+.5,r*.5+.5,1]}function Gh(f,e,i,t,s,a,r){const n=1/(e-i),o=1/(t-s),l=1/(a-r);return f.fill(0),f[0]=-2*n,f[5]=-2*o,f[10]=2*l,f[12]=(e+i)*n,f[13]=(s+t)*o,f[14]=(r+a)*l,f[15]=1,f}function Bi(f,e,i,t){const s=f[0]*e+f[4]*i+f[8]*t+f[12],a=f[1]*e+f[5]*i+f[9]*t+f[13],r=f[2]*e+f[6]*i+f[10]*t+f[14],n=f[3]*e+f[7]*i+f[11]*t+f[15],o=Math.abs(n)>1e-7?1/n:1;return[s*o,a*o,r*o]}class zh{pos=[];norm=[];att=[];idx=[];appendSub(e,i,t){const s=e.length/3,a=new Float32Array(s*3);for(let n=0;n<t.length;n+=3){const o=t[n]*3,l=t[n+1]*3,h=t[n+2]*3,c=e[l]-e[o],u=e[l+1]-e[o+1],g=e[l+2]-e[o+2],p=e[h]-e[o],x=e[h+1]-e[o+1],S=e[h+2]-e[o+2],T=u*S-g*x,k=g*p-c*S,m=c*x-u*p;a[o]+=T,a[o+1]+=k,a[o+2]+=m,a[l]+=T,a[l+1]+=k,a[l+2]+=m,a[h]+=T,a[h+1]+=k,a[h+2]+=m}const r=this.pos.length/3;for(let n=0;n<s;n++){const o=n*3,l=n*4,h=a[o],c=a[o+1],u=a[o+2],g=Math.hypot(h,c,u)||1;this.pos.push(e[o],e[o+1],e[o+2]),this.norm.push(h/g,c/g,u/g),this.att.push(i[l],i[l+1],i[l+2],i[l+3])}for(let n=0;n<t.length;n++)this.idx.push(r+t[n])}addTube(e){const{rings:i,segs:t,paletteId:s,swayScale:a,seed:r,spine:n,radius:o}=e,l=[];for(let A=0;A<=i;A++)l.push(n(A/i));const h=[];for(let A=0;A<=i;A++){const D=l[Math.max(0,A-1)],I=l[Math.min(i,A+1)];h.push(Li([I[0]-D[0],I[1]-D[1],I[2]-D[2]],[0,1,0]))}const c=Math.abs(h[0][2])>.85?[1,0,0]:[0,0,1];let u=Li(sr(c,ar(h[0],Us(c,h[0]))),[1,0,0]),g=Li($i(u,h[0]),[1,0,0]);u=Li($i(h[0],g),[0,0,1]);const p=[g],x=[u];for(let A=1;A<=i;A++){const D=h[A-1],I=h[A],W=$i(D,I),w=Math.hypot(W[0],W[1],W[2]),y=Math.max(-1,Math.min(1,Us(D,I)));if(w>1e-5){const M=[W[0]/w,W[1]/w,W[2]/w],P=Math.atan2(w,y);g=Wh(g,M,P)}g=Li(sr(g,ar(I,Us(g,I))),g),u=Li($i(I,g),u),p.push(g),x.push(u)}const S=[],T=[],k=[],m=t+1;for(let A=0;A<=i;A++){const D=A/i,I=A===i?.004:1,W=l[A],w=p[A],y=x[A];for(let M=0;M<=t;M++){const P=M/t*Math.PI*2,[U,L]=o(P,D),E=U*I,_=L*I;S.push(W[0]+w[0]*E+y[0]*_,W[1]+w[1]*E+y[1]*_,W[2]+w[2]*E+y[2]*_),T.push(D,s,a*D*D,r)}}for(let A=0;A<i;A++)for(let D=0;D<t;D++){const I=A*m+D,W=I+1,w=(A+1)*m+D,y=w+1;k.push(I,W,w,W,y,w)}this.appendSub(S,T,k)}addReefBoulder(e,i,t,s){this.addTube({rings:10,segs:14,paletteId:0,swayScale:0,seed:s,spine:a=>[e[0]+Math.sin(a*2.2+s*6)*.12,e[1]-.25+a*t,e[2]+Math.cos(a*1.9+s*4)*.12],radius:(a,r)=>{const n=Math.sin(Math.pow(Math.min(.999,r*.92+.06),.65)*Math.PI),o=1+.16*Math.sin(a*3+s*12)+.09*Math.cos(a*5-r*4);return[Math.cos(a)*i[0]*n*o,Math.sin(a)*i[1]*n*o]}})}addStaghornColony(e,i,t,s){for(let r=0;r<6;r++){const n=r/6*Math.PI*2+s*3.1,o=(.32+.28*(r*7%3)/2)*i,l=(.85+.38*Math.sin(r*2.3+s*5))*i,h=Math.cos(n)*o,c=Math.sin(n)*o;if(this.addTube({rings:12,segs:9,paletteId:t,swayScale:.06,seed:bi(s+r*.13),spine:u=>[e[0]+h*Math.pow(u,1.35),e[1]+l*u,e[2]+c*Math.pow(u,1.35)],radius:(u,g)=>{const p=(.095-.045*g+.025*Math.sin(g*Math.PI))*i*Math.sin(Math.min(1,(1-g)*4.5+.12)*Math.PI*.5);return[Math.cos(u)*p,Math.sin(u)*p]}}),r%2===0){const g=e[0]+h*Math.pow(.52,1.35),p=e[1]+l*.52,x=e[2]+c*Math.pow(.52,1.35),S=n+(r%4===0?.65:-.65);this.addTube({rings:8,segs:8,paletteId:t,swayScale:.08,seed:bi(s+r*.29),spine:T=>[g+Math.cos(S)*o*.55*T,p+l*.48*T,x+Math.sin(S)*o*.55*T],radius:(T,k)=>{const m=.058*(1-.45*k)*i*Math.sin(Math.min(1,(1-k)*4.5+.12)*Math.PI*.5);return[Math.cos(T)*m,Math.sin(T)*m]}})}}}addBrainOrTableCoral(e,i,t,s,a){this.addTube({rings:10,segs:16,paletteId:s,swayScale:.02,seed:a,spine:r=>[e[0],e[1]+r*t,e[2]],radius:(r,n)=>{const o=Math.sin(Math.pow(n,.58)*Math.PI),l=1+.11*Math.cos(r*8+a*9);return[Math.cos(r)*i*o*l,Math.sin(r)*i*o*l]}})}addKelpOrAnemoneCluster(e,i,t,s){for(let a=0;a<i;a++){const r=a/i*Math.PI*2+s*5,n=.12+.18*bi(s*7.1+a*.31),o=t*(.72+.45*bi(s*3.7+a*.19));this.addTube({rings:12,segs:7,paletteId:4,swayScale:.42,seed:bi(s+a*.17),spine:l=>[e[0]+Math.cos(r)*n*(.3+l),e[1]+o*l,e[2]+Math.sin(r)*n*(.3+l)],radius:(l,h)=>{const c=.055*(1-.65*h);return[Math.cos(l)*c*1.5,Math.sin(l)*c*.55]}})}}}function Uh(){const f=new zh,e=-4.32,i=[{pos:[-6.4,e,-2.2],rad:[1.55,1.25],h:1.35,coralPalette:1,seed:.11},{pos:[-5.2,e,-4.6],rad:[1.45,1.2],h:1.45,coralPalette:2,seed:.23},{pos:[-7.6,e,-5.8],rad:[1.8,1.4],h:1.95,coralPalette:3,seed:.37},{pos:[6.4,e,-2.2],rad:[1.55,1.25],h:1.35,coralPalette:2,seed:.49},{pos:[5.2,e,-4.6],rad:[1.45,1.2],h:1.45,coralPalette:1,seed:.61},{pos:[7.6,e,-5.8],rad:[1.8,1.4],h:1.95,coralPalette:3,seed:.73},{pos:[-3.4,e,-3.4],rad:[1.05,.9],h:.68,coralPalette:1,seed:.19},{pos:[3.5,e,-3.5],rad:[1.05,.9],h:.68,coralPalette:3,seed:.43},{pos:[-1.4,e,-5.6],rad:[1.1,.95],h:.75,coralPalette:2,seed:.67},{pos:[1.6,e,-6.2],rad:[1.15,.95],h:.78,coralPalette:1,seed:.83},{pos:[-4.4,e,-8.2],rad:[1.65,1.35],h:1.55,coralPalette:3,seed:.91},{pos:[4.5,e,-8.4],rad:[1.65,1.35],h:1.55,coralPalette:2,seed:.55}];for(const o of i){f.addReefBoulder(o.pos,o.rad,o.h,o.seed);const l=o.pos[1]+o.h*.68,h=Math.abs(o.pos[0])>4.6?1.05:.66;f.addStaghornColony([o.pos[0],l,o.pos[2]],h,o.coralPalette,o.seed),f.addBrainOrTableCoral([o.pos[0]+(o.pos[0]<0?.55:-.55),o.pos[1]+o.h*.45,o.pos[2]+.35],.44*h,.38*h,o.coralPalette%3+1,bi(o.seed+.33)),f.addKelpOrAnemoneCluster([o.pos[0]+(o.pos[0]<0?.85:-.85),e+.15,o.pos[2]+.45],6,1.15*h,bi(o.seed+.51))}const t=0,s=f.idx.length,a=f.idx.length,r=-1.25;f.addReefBoulder([0,e,r],[1.45,1.15],2.55,.77),f.addReefBoulder([-.75,e,r+.15],[.95,.85],1.75,.31),f.addReefBoulder([.75,e,r+.15],[.95,.85],1.75,.62),f.addStaghornColony([0,e+1.95,r],1.45,1,.15),f.addStaghornColony([-.68,e+1.35,r+.12],1.12,2,.45),f.addStaghornColony([.68,e+1.35,r+.12],1.12,3,.75),f.addBrainOrTableCoral([-.42,e+1.65,r+.32],.52,.42,2,.28),f.addBrainOrTableCoral([.42,e+1.65,r+.32],.52,.42,3,.64),f.addKelpOrAnemoneCluster([-.92,e+.85,r+.25],7,1.35,.22),f.addKelpOrAnemoneCluster([.92,e+.85,r+.25],7,1.35,.88),f.addTube({rings:12,segs:16,paletteId:5,swayScale:0,seed:.5,spine:o=>[0,e+2.02+(o-.5)*.44,r+.38],radius:(o,l)=>{const h=.22*Math.sin(Math.max(.02,Math.min(.98,l))*Math.PI);return[Math.cos(o)*h,Math.sin(o)*h]}});const n=f.idx.length-a;return{positions:new Float32Array(f.pos),normals:new Float32Array(f.norm),attribs:new Float32Array(f.att),indices:new Uint32Array(f.idx),staticIndexOffset:t,staticIndexCount:s,risingIndexOffset:a,risingIndexCount:n}}function bi(f){return f-Math.floor(f)}function sr(f,e){return[f[0]-e[0],f[1]-e[1],f[2]-e[2]]}function ar(f,e){return[f[0]*e,f[1]*e,f[2]*e]}function Us(f,e){return f[0]*e[0]+f[1]*e[1]+f[2]*e[2]}function $i(f,e){return[f[1]*e[2]-f[2]*e[1],f[2]*e[0]-f[0]*e[2],f[0]*e[1]-f[1]*e[0]]}function Li(f,e){const i=Math.hypot(f[0],f[1],f[2]);return i>1e-7?[f[0]/i,f[1]/i,f[2]/i]:e}function Wh(f,e,i){const t=Math.cos(i),s=Math.sin(i),a=$i(e,f),r=Us(e,f);return[f[0]*t+a[0]*s+e[0]*r*(1-t),f[1]*t+a[1]*s+e[1]*r*(1-t),f[2]*t+a[2]*s+e[2]*r*(1-t)]}async function Vh(){const f="zen_campus_v19",[e,i]=await Promise.all([fetch(`./assets/seabed/okinawa_world.json?v=${f}`,{cache:"no-cache"}),fetch(`./assets/seabed/okinawa_world.bin?v=${f}`,{cache:"no-cache"})]);if(!e.ok||!i.ok)throw new Error("Failed to load Okinawa 3D seabed world assets.");const t=await e.json(),s=await i.arrayBuffer(),a=t.vertexCount,r=t.indexCount,{positions:n,normals:o,attribs:l,indices:h}=t.byteOffsets,c=new Float32Array(s,n,a*3),u=new Float32Array(s,o,a*3),g=new Float32Array(s,l,a*4),p=new Uint32Array(s,h,r),{worldHalf:x,gridN:S,heights:T}=t.terrain,k=S+1,m=x*2/S,A=(I,W)=>{const w=Math.max(0,Math.min(S-.001,(I+x)/m)),y=Math.max(0,Math.min(S-.001,(W+x)/m)),M=Math.floor(w),P=Math.floor(y),U=w-M,L=y-P,E=T[P*k+M],_=T[P*k+M+1],H=T[(P+1)*k+M],G=T[(P+1)*k+M+1],Q=E+(_-E)*U,se=H+(G-H)*U;return Q+(se-Q)*L},D=new Hh(c,g,p,t.ranges.static_world,x);return{manifest:t,positions:c,normals:u,attribs:g,indices:p,sampleTerrainY:A,collider:D}}function re(f,e,i,t,s,a,r=a,n=a,o=0,l=0){const h=Math.cos(s),c=Math.sin(s),u=Math.cos(o),g=Math.sin(o),p=Math.cos(l),x=Math.sin(l),S=h*p+c*g*x,T=p*c*g-h*x,k=u*c,m=u*x,A=u*p,D=-g,I=h*g*x-p*c,W=c*x+h*p*g,w=h*u;return f[0]=S*a,f[1]=m*a,f[2]=I*a,f[3]=0,f[4]=T*r,f[5]=A*r,f[6]=W*r,f[7]=0,f[8]=k*n,f[9]=D*n,f[10]=w*n,f[11]=0,f[12]=e,f[13]=i,f[14]=t,f[15]=1,f}function or(f,e,i,t,s,a,r,n){const o=Math.cos(s),l=Math.sin(s),h=Math.cos(a),c=Math.sin(a),u=Math.cos(r),g=Math.sin(r);return f[0]=(o*u-l*h*g)*n,f[1]=c*g*n,f[2]=(-l*u-o*h*g)*n,f[3]=0,f[4]=l*c*n,f[5]=h*n,f[6]=o*c*n,f[7]=0,f[8]=(o*g+l*h*u)*n,f[9]=-c*u*n,f[10]=(-l*g+o*h*u)*n,f[11]=0,f[12]=e,f[13]=i,f[14]=t,f[15]=1,f}function Kt(f,e,i,t,s=0){let a=i[0],r=i[1],n=i[2];const o=Math.hypot(a,r,n)||1;a/=o,r/=o,n/=o;let l=1*n-0*r,h=0*a-0*n,c=0*r-1*a;const u=Math.hypot(l,h,c);u<1e-5?(l=1,h=0,c=0):(l/=u,h/=u,c/=u);const g=r*c-n*h,p=n*l-a*c,x=a*h-r*l,S=Math.cos(s),T=Math.sin(s),k=l*S+g*T,m=h*S+p*T,A=c*S+x*T,D=g*S-l*T,I=p*S-h*T,W=x*S-c*T;return f[0]=k*t,f[1]=m*t,f[2]=A*t,f[3]=0,f[4]=D*t,f[5]=I*t,f[6]=W*t,f[7]=0,f[8]=a*t,f[9]=r*t,f[10]=n*t,f[11]=0,f[12]=e[0],f[13]=e[1],f[14]=e[2],f[15]=1,f}let zt=0,Pt=0,Ut=0;function Fs(f,e,i,t,s,a,r,n,o,l,h,c){const u=r-t,g=n-s,p=o-a,x=l-t,S=h-s,T=c-a,k=f-t,m=e-s,A=i-a,D=u*k+g*m+p*A,I=x*k+S*m+T*A;if(D<=0&&I<=0){zt=t,Pt=s,Ut=a;return}const W=f-r,w=e-n,y=i-o,M=u*W+g*w+p*y,P=x*W+S*w+T*y;if(M>=0&&P<=M){zt=r,Pt=n,Ut=o;return}const U=D*P-M*I;if(U<=0&&D>=0&&M<=0){const ie=D/(D-M);zt=t+ie*u,Pt=s+ie*g,Ut=a+ie*p;return}const L=f-l,E=e-h,_=i-c,H=u*L+g*E+p*_,G=x*L+S*E+T*_;if(G>=0&&H<=G){zt=l,Pt=h,Ut=c;return}const Q=H*I-D*G;if(Q<=0&&I>=0&&G<=0){const ie=I/(I-G);zt=t+ie*x,Pt=s+ie*S,Ut=a+ie*T;return}const se=M*G-H*P;if(se<=0&&P-M>=0&&H-G>=0){const ie=(P-M)/(P-M+(H-G));zt=r+ie*(l-r),Pt=n+ie*(h-n),Ut=o+ie*(c-o);return}const X=1/(se+Q+U),Z=Q*X,ae=U*X;zt=t+u*Z+x*ae,Pt=s+g*Z+S*ae,Ut=a+p*Z+T*ae}function Ha(f,e,i,t,s,a,r,n,o,l,h,c,u,g,p,x){const S=h-n,T=c-o,k=u-l,m=g-n,A=p-o,D=x-l,I=s*D-a*A,W=a*m-t*D,w=t*A-s*m,y=S*I+T*W+k*w;if(y>-1e-7&&y<1e-7)return-1;const M=1/y,P=f-n,U=e-o,L=i-l,E=M*(P*I+U*W+L*w);if(E<0||E>1)return-1;const _=U*k-L*T,H=L*S-P*k,G=P*T-U*S,Q=M*(t*_+s*H+a*G);if(Q<0||E+Q>1)return-1;const se=M*(m*_+A*H+D*G);return se>=0&&se<=r?se:-1}const Ya=[[0,0],[.16,0],[-.16,0],[0,.16],[0,-.16]];class Hh{gridN=128;halfSpan;invCell;triVerts;triMinY;triMaxY;triAbsNy;triStamp;cellOffsets;cellTris;stampCounter=1;constructor(e,i,t,s,a){this.halfSpan=a+2,this.invCell=this.gridN/(this.halfSpan*2);const r=Math.floor(s.indexCount/3),n=s.indexOffset,o=new Int32Array(r);let l=0;for(let g=0;g<r;g++){const p=t[n+g*3],x=Math.round(i[p*4]),S=Math.round(i[p*4+1]);if(x===6||x===10&&(S===5||S===6||S===17||S===18||S===26||S===28||S===30))continue;const T=t[n+g*3+1],k=t[n+g*3+2],m=e[p*3],A=e[p*3+1],D=e[p*3+2],I=e[T*3]-m,W=e[T*3+1]-A,w=e[T*3+2]-D,y=e[k*3]-m,M=e[k*3+1]-A,P=e[k*3+2]-D,U=W*P-w*M,L=w*y-I*P,E=I*M-W*y;U*U+L*L+E*E<1e-8||(o[l++]=g)}this.triVerts=new Float32Array(l*9),this.triMinY=new Float32Array(l),this.triMaxY=new Float32Array(l),this.triAbsNy=new Float32Array(l),this.triStamp=new Int32Array(l);const h=this.gridN*this.gridN,c=new Int32Array(h);for(let g=0;g<l;g++){const p=o[g],x=t[n+p*3]*3,S=t[n+p*3+1]*3,T=t[n+p*3+2]*3,k=e[x],m=e[x+1],A=e[x+2],D=e[S],I=e[S+1],W=e[S+2],w=e[T],y=e[T+1],M=e[T+2],P=g*9;this.triVerts[P]=k,this.triVerts[P+1]=m,this.triVerts[P+2]=A,this.triVerts[P+3]=D,this.triVerts[P+4]=I,this.triVerts[P+5]=W,this.triVerts[P+6]=w,this.triVerts[P+7]=y,this.triVerts[P+8]=M,this.triMinY[g]=Math.min(m,I,y),this.triMaxY[g]=Math.max(m,I,y);const U=D-k,L=I-m,E=W-A,_=w-k,H=y-m,G=M-A,Q=L*G-E*H,se=E*_-U*G,X=U*H-L*_,Z=Math.hypot(Q,se,X)||1;this.triAbsNy[g]=Math.abs(se/Z);const ae=this.toCell(Math.min(k,D,w)),ie=this.toCell(Math.max(k,D,w)),R=this.toCell(Math.min(A,W,M)),K=this.toCell(Math.max(A,W,M));for(let oe=R;oe<=K;oe++){const he=oe*this.gridN;for(let me=ae;me<=ie;me++)c[he+me]++}}this.cellOffsets=new Int32Array(h+1);for(let g=0;g<h;g++)this.cellOffsets[g+1]=this.cellOffsets[g]+c[g];this.cellTris=new Int32Array(this.cellOffsets[h]);const u=new Int32Array(this.cellOffsets.subarray(0,h));for(let g=0;g<l;g++){const p=g*9,x=this.toCell(Math.min(this.triVerts[p],this.triVerts[p+3],this.triVerts[p+6])),S=this.toCell(Math.max(this.triVerts[p],this.triVerts[p+3],this.triVerts[p+6])),T=this.toCell(Math.min(this.triVerts[p+2],this.triVerts[p+5],this.triVerts[p+8])),k=this.toCell(Math.max(this.triVerts[p+2],this.triVerts[p+5],this.triVerts[p+8]));for(let m=T;m<=k;m++){const A=m*this.gridN;for(let D=x;D<=S;D++){const I=A+D;this.cellTris[u[I]++]=g}}}}toCell(e){const i=Math.floor((e+this.halfSpan)*this.invCell);return i<0?0:i>=this.gridN?this.gridN-1:i}nextStamp(){return this.stampCounter=this.stampCounter+1|0,this.stampCounter<=0&&(this.triStamp.fill(0),this.stampCounter=1),this.stampCounter}sampleSupportY(e,i,t,s){let a=-999;const r=s-1.5,n=t-r;if(n<=.01)return s;for(let o=0;o<Ya.length;o++){const l=e+Ya[o][0],h=i+Ya[o][1],c=this.toCell(h)*this.gridN+this.toCell(l),u=this.cellOffsets[c],g=this.cellOffsets[c+1];for(let p=u;p<g;p++){const x=this.cellTris[p];if(this.triAbsNy[x]<.46||this.triMaxY[x]<a||this.triMinY[x]>t)continue;const S=x*9,T=Ha(l,t,h,0,-1,0,n,this.triVerts[S],this.triVerts[S+1],this.triVerts[S+2],this.triVerts[S+3],this.triVerts[S+4],this.triVerts[S+5],this.triVerts[S+6],this.triVerts[S+7],this.triVerts[S+8]);if(T>=0){const k=t-T;k<=t+.01&&k>a&&(a=k)}}}return a>-900?a:s}raycastFirstHitDist(e,i,t,s,a,r,n){if(n<=1e-4)return-1;const o=e+s*n,l=i+a*n,h=t+r*n,c=Math.min(i,l)-.02,u=Math.max(i,l)+.02,g=this.nextStamp();let p=n+1,x=this.toCell(e),S=this.toCell(t);const T=this.toCell(o),k=this.toCell(h),m=1/this.invCell,A=s>1e-8?1:s<-1e-8?-1:0,D=r>1e-8?1:r<-1e-8?-1:0,I=-this.halfSpan+(A>0?x+1:x)*m,W=-this.halfSpan+(D>0?S+1:S)*m;let w=A!==0?Math.max(0,(I-e)/s):1e30,y=D!==0?Math.max(0,(W-t)/r):1e30;const M=A!==0?Math.abs(m/s):1e30,P=D!==0?Math.abs(m/r):1e30,U=this.gridN*3;for(let L=0;L<U;L++){if(x>=0&&x<this.gridN&&S>=0&&S<this.gridN){const _=S*this.gridN+x,H=this.cellOffsets[_],G=this.cellOffsets[_+1],Q=p<=n?p:n;for(let se=H;se<G;se++){const X=this.cellTris[se];if(this.triStamp[X]===g||(this.triStamp[X]=g,this.triMaxY[X]<c||this.triMinY[X]>u))continue;const Z=X*9,ae=Ha(e,i,t,s,a,r,Q,this.triVerts[Z],this.triVerts[Z+1],this.triVerts[Z+2],this.triVerts[Z+3],this.triVerts[Z+4],this.triVerts[Z+5],this.triVerts[Z+6],this.triVerts[Z+7],this.triVerts[Z+8]);ae>=0&&ae<p&&(p=ae)}}if(x===T&&S===k)break;const E=w<y?w:y;if(E>n||E>p+.02)break;w<y?(w+=M,x+=A):(y+=P,S+=D)}return p<=n?p:-1}resolveLandCapsule(e,i,t,s=.36){const a=[t+.76,t+1.32],r=[s,s*.92];for(let n=0;n<3;n++)for(let o=0;o<2;o++){const l=a[o],h=r[o],c=l-h,u=l+h,g=this.toCell(e[0]-h),p=this.toCell(e[0]+h),x=this.toCell(e[2]-h),S=this.toCell(e[2]+h),T=this.nextStamp();for(let k=x;k<=S;k++){const m=k*this.gridN;for(let A=g;A<=p;A++){const D=m+A,I=this.cellOffsets[D],W=this.cellOffsets[D+1];for(let w=I;w<W;w++){const y=this.cellTris[w];if(this.triStamp[y]===T||(this.triStamp[y]=T,u<this.triMinY[y]||c>this.triMaxY[y]))continue;const M=y*9;if(Fs(e[0],l,e[2],this.triVerts[M],this.triVerts[M+1],this.triVerts[M+2],this.triVerts[M+3],this.triVerts[M+4],this.triVerts[M+5],this.triVerts[M+6],this.triVerts[M+7],this.triVerts[M+8]),Pt<=t+.44&&this.triAbsNy[y]>=.5)continue;const P=e[0]-zt,U=l-Pt,L=e[2]-Ut;if(P*P+U*U+L*L>=h*h)continue;const _=Math.hypot(P,L);if(_>1e-5){const G=Math.sqrt(Math.max(0,h*h-U*U))-_;if(G>0){const Q=P/_,se=L/_;e[0]+=Q*G,e[2]+=se*G;const X=i[0]*Q+i[2]*se;X<0&&(i[0]-=Q*X,i[2]-=se*X)}}}}}}if(i[1]>0){const n=t+1.56,o=.25,l=this.toCell(e[2])*this.gridN+this.toCell(e[0]),h=this.cellOffsets[l],c=this.cellOffsets[l+1];for(let u=h;u<c;u++){const g=this.cellTris[u];if(n+o<this.triMinY[g]||n-o>this.triMaxY[g]||this.triAbsNy[g]<.45)continue;const p=g*9;Fs(e[0],n,e[2],this.triVerts[p],this.triVerts[p+1],this.triVerts[p+2],this.triVerts[p+3],this.triVerts[p+4],this.triVerts[p+5],this.triVerts[p+6],this.triVerts[p+7],this.triVerts[p+8]),Pt>n&&Math.hypot(e[0]-zt,n-Pt,e[2]-Ut)<o&&(i[1]=0)}}}resolveSwimCapsule(e,i,t,s=.4){const a=[0,-.48],r=[s,s*.85];for(let n=0;n<3;n++)for(let o=0;o<2;o++){const l=a[o],h=r[o],c=e[0]+t[0]*l,u=e[1]+t[1]*l,g=e[2]+t[2]*l,p=u-h,x=u+h,S=this.toCell(c-h),T=this.toCell(c+h),k=this.toCell(g-h),m=this.toCell(g+h),A=this.nextStamp();for(let D=k;D<=m;D++){const I=D*this.gridN;for(let W=S;W<=T;W++){const w=I+W,y=this.cellOffsets[w],M=this.cellOffsets[w+1];for(let P=y;P<M;P++){const U=this.cellTris[P];if(this.triStamp[U]===A||(this.triStamp[U]=A,x<this.triMinY[U]||p>this.triMaxY[U]))continue;const L=U*9;Fs(c,u,g,this.triVerts[L],this.triVerts[L+1],this.triVerts[L+2],this.triVerts[L+3],this.triVerts[L+4],this.triVerts[L+5],this.triVerts[L+6],this.triVerts[L+7],this.triVerts[L+8]);const E=c-zt,_=u-Pt,H=g-Ut,G=Math.hypot(E,_,H);if(G<h&&G>1e-5){const Q=h-G,se=E/G,X=_/G,Z=H/G;e[0]+=se*Q,e[1]+=X*Q,e[2]+=Z*Q;const ae=i[0]*se+i[1]*X+i[2]*Z;ae<0&&(i[0]-=se*ae,i[1]-=X*ae,i[2]-=Z*ae)}}}}}}clipCameraRay(e,i,t,s,a,r,n,o=.22){const l=s-e,h=a-i,c=r-t,u=Math.hypot(l,h,c);if(u<1e-4){n[0]=s,n[1]=a,n[2]=r;return}const g=l/u,p=h/u,x=c/u,S=Math.min(i,a)-o,T=Math.max(i,a)+o,k=this.toCell(Math.min(e,s)-o),m=this.toCell(Math.max(e,s)+o),A=this.toCell(Math.min(t,r)-o),D=this.toCell(Math.max(t,r)+o);let I=u;const W=this.nextStamp();for(let _=A;_<=D;_++){const H=_*this.gridN;for(let G=k;G<=m;G++){const Q=H+G,se=this.cellOffsets[Q],X=this.cellOffsets[Q+1];for(let Z=se;Z<X;Z++){const ae=this.cellTris[Z];if(this.triStamp[ae]===W||(this.triStamp[ae]=W,T<this.triMinY[ae]||S>this.triMaxY[ae]))continue;const ie=ae*9,R=Ha(e,i,t,g,p,x,I,this.triVerts[ie],this.triVerts[ie+1],this.triVerts[ie+2],this.triVerts[ie+3],this.triVerts[ie+4],this.triVerts[ie+5],this.triVerts[ie+6],this.triVerts[ie+7],this.triVerts[ie+8]);R>.28&&R<I&&(I=R)}}}const w=I<u?Math.max(.45,I-o):u;n[0]=e+g*w,n[1]=i+p*w,n[2]=t+x*w;const y=o*.85,M=this.toCell(n[0]-y),P=this.toCell(n[0]+y),U=this.toCell(n[2]-y),L=this.toCell(n[2]+y),E=this.nextStamp();for(let _=U;_<=L;_++){const H=_*this.gridN;for(let G=M;G<=P;G++){const Q=H+G,se=this.cellOffsets[Q],X=this.cellOffsets[Q+1];for(let Z=se;Z<X;Z++){const ae=this.cellTris[Z];if(this.triStamp[ae]===E||(this.triStamp[ae]=E,n[1]+y<this.triMinY[ae]||n[1]-y>this.triMaxY[ae]))continue;const ie=ae*9;Fs(n[0],n[1],n[2],this.triVerts[ie],this.triVerts[ie+1],this.triVerts[ie+2],this.triVerts[ie+3],this.triVerts[ie+4],this.triVerts[ie+5],this.triVerts[ie+6],this.triVerts[ie+7],this.triVerts[ie+8]);const R=n[0]-zt,K=n[1]-Pt,oe=n[2]-Ut,he=Math.hypot(R,K,oe);if(he<y&&he>1e-5){const me=y-he;n[0]+=R/he*me,n[1]+=K/he*me,n[2]+=oe/he*me}}}}}}function Yh(){const f=[{z:.48,rx:.004,ry:.006,yOffset:0,axialT:0},{z:.36,rx:.042,ry:.072,yOffset:.004,axialT:.12},{z:.2,rx:.068,ry:.122,yOffset:.008,axialT:.28},{z:.02,rx:.064,ry:.118,yOffset:.006,axialT:.46},{z:-.16,rx:.04,ry:.078,yOffset:.002,axialT:.64},{z:-.32,rx:.015,ry:.032,yOffset:0,axialT:.8},{z:-.39,rx:.008,ry:.024,yOffset:0,axialT:.87}],e=8,i=[],t=[],s=[],a=[];for(let n=0;n<f.length;n++){const o=f[n];for(let l=0;l<e;l++){const h=l/e*Math.PI*2,c=Math.cos(h),u=Math.sin(h),g=1-.18*Math.pow(Math.abs(u),2),p=c*o.rx*g,x=u*o.ry+o.yOffset,S=o.z;i.push(p,x,S);let T=c/Math.max(o.rx,.01),k=u/Math.max(o.ry,.01),m=n===0?.65:(n-2.5)*-.06;const A=Math.hypot(T,k,m)||1;t.push(T/A,k/A,m/A),s.push(o.axialT,u,0)}}for(let n=0;n<f.length-1;n++){const o=n*e,l=(n+1)*e;for(let h=0;h<e;h++){const c=(h+1)%e,u=o+h,g=o+c,p=l+h,x=l+c;a.push(u,p,g),a.push(g,p,x)}}const r=(n,o,l,h)=>{const c=i.length/3;for(const u of[n,o,l])i.push(u[0]+h*.002,u[1],u[2]),t.push(h,u[4]*.15,-.1),s.push(u[3],u[4],1);h>0?a.push(c,c+1,c+2):a.push(c,c+2,c+1)};for(const n of[1,-1])r([0,.008,-.35,.84,.1],[0,.155,-.52,1,1],[0,.022,-.44,.93,.25],n),r([0,-.008,-.35,.84,-.1],[0,-.022,-.44,.93,-.25],[0,-.15,-.52,1,-1],n),r([0,.115,.14,.34,.95],[0,.195,-.05,.53,1],[0,.095,-.12,.6,.9],n);return{positions:new Float32Array(i),normals:new Float32Array(t),bodyCoords:new Float32Array(s),indices:new Uint16Array(a)}}function qh(f=18,e=18,i=1.18){const t=[],s=[],a=[];for(let n=0;n<=e;n++){const o=n/e,l=(o-.5)*2;for(let h=0;h<=f;h++){const c=h/f,u=(c-.5)*2,g=Math.max(0,1-(u*u*.75+l*l*.75)),p=Math.sqrt(g)*.14;t.push(u*i,l*i,p),s.push(c,1-o)}}const r=f+1;for(let n=0;n<e;n++)for(let o=0;o<f;o++){const l=n*r+o,h=l+1,c=(n+1)*r+o,u=c+1;a.push(l,h,c,h,u,c)}return{positions:new Float32Array(t),uvs:new Float32Array(s),indices:new Uint16Array(a)}}function Xh(f){let e=f>>>0;return()=>{e|=0,e=e+1831565813|0;let i=Math.imul(e^e>>>15,1|e);return i=i+Math.imul(i^i>>>7,61|i)^i,((i^i>>>14)>>>0)/4294967296}}function $h(f,e){const r=[];for(;r.length<f;){const n=Math.floor(e()*4),o=n===0||n===3?1:-1,l=n===0||n===1?1:-1,h=Math.pow(e(),.62),c=e(),u=h*c,g=h*(1-c),p=o*3.05*Math.pow(Math.max(u,1e-6),1/.49),x=l*3.18*Math.pow(Math.max(g,1e-6),1/.49),S=u+g,T=1.02*Math.pow(Math.max(0,1-S),.8),k=e()<.76,m=e()<.5?1:-1,A=k?.75+.25*e():e()*.75,D=m*T*A,I=Math.atan2(x,p);r.push({x:p,y:x+.42,z:D,angle:I,shell:h})}return r.sort((n,o)=>{const l=Math.floor((n.angle+Math.PI)/(2*Math.PI)*32),h=Math.floor((o.angle+Math.PI)/(2*Math.PI)*32);return l!==h?l-h:n.shell-o.shell}),r}function Kh(f,e){const i=f*e,t=64,s=Math.max(1,Math.floor(i/t)),a=Xh(20261115),r=new Float32Array(i*4),n=new Float32Array(i*4),o=new Float32Array(i*4),l=new Float32Array(i*4),h=Math.max(1,Math.floor(s*.86)),c=h*t,u=$h(c,a);for(let g=0;g<s;g++){const p=g>=h,x=g/Math.max(1,s-1),S=x*Math.PI*2*5+a()*.8,T=(a()-.5)*1.65,k=p?5.2+a()*4.2:.55+Math.pow(a(),.72)*2.85,m=Math.cos(S)*k*1.25,A=.08+T*(p?1.2:.85),D=Math.sin(S)*k*(p?1.2:.92)-(p?5.5:0),I=g%3===0?-1:1,W=-Math.sin(S)*2*I,w=(a()-.5)*.5,y=Math.cos(S)*2*I,P=(g%2===0?-1:1)*(4.6+a()*4.8),U=-.9+a()*1.9,L=-4.5-a()*5;for(let E=0;E<t;E++){const _=g*t+E;if(_>=i)break;const H=_*4,G=.45*Math.cbrt(a()),Q=a()*Math.PI*2,se=Math.acos(2*a()-1),X=G*Math.sin(se)*Math.cos(Q),Z=G*Math.sin(se)*Math.sin(Q)*.7,ae=G*Math.cos(se);r[H]=m+X,r[H+1]=A+Z,r[H+2]=D+ae,r[H+3]=a()*Math.PI*2,n[H]=W+(a()-.5)*.5,n[H+1]=w+(a()-.5)*.3,n[H+2]=y+(a()-.5)*.5,n[H+3]=2.2;const ie=.78+Math.pow(a(),1.4)*.52;if(o[H]=x,o[H+1]=p?1:0,o[H+2]=ie,o[H+3]=a(),!p&&_<u.length){const R=u[_];l[H]=R.x,l[H+1]=R.y,l[H+2]=R.z,l[H+3]=R.shell}else l[H]=P+X*2.2,l[H+1]=U+Z*1.6,l[H+2]=L+ae*2.2,l[H+3]=a()}}return{posData:r,velData:n,metaData:o,starTargetData:l,podSize:t,podCount:s}}const nr=`#version 300 es
precision highp float;

out vec2 vUv;

void main() {
  vec2 pos = vec2(
    (gl_VertexID == 1) ? 3.0 : -1.0,
    (gl_VertexID == 2) ? 3.0 : -1.0
  );
  vUv = pos * 0.5 + 0.5;
  gl_Position = vec4(pos, 0.0, 1.0);
}
`,Zh=`#version 300 es
precision highp float;

out vec2 vUv;

void main() {
  vec2 pos = vec2(
    (gl_VertexID == 1) ? 3.0 : -1.0,
    (gl_VertexID == 2) ? 3.0 : -1.0
  );
  vUv = pos * 0.5 + 0.5;
  gl_Position = vec4(pos, 1.0, 1.0);
}
`,wi=`
const float PI = 3.14159265359;
const float OCEAN_SURFACE_Y = 5.45;

// === 9-Mode Okinawa Time-of-Day & Resort Illumination Uniforms ===
// Smoothly interpolated on CPU in VfxEngine:
//   朝焼け (dawn_glow) · 日の出 (sunrise) · 朝 (morning) · 昼 (noon) ·
//   夕方 (late_afternoon) · 夕焼け (sunset_glow) · 日の入り (sundown) · 夜 (night) · 深夜 (midnight)
uniform vec4 uTodSkyZenith;   // rgb = zenith sRGB, w = sunDiskPower (1.0=sun, 0.38=full moon, 0.0=below horizon)
uniform vec4 uTodSkyHorizon;  // rgb = solar-azimuth horizon sRGB, w = starIntensity (0..1.35, >1.0 = Milky Way!)
uniform vec4 uTodSunColor;    // rgb = linear directional sun/moon color, w = resortLampGlow (0..1.45)
uniform vec4 uTodAmbient;     // rgb = linear above-water zenith ambient, w = biolumIntensity (0..1.25)
uniform vec4 uTodSkySunDir;   // xyz = normalized sky sun/moon dir, w = todOriginalMix (1.0 = pure Noon AIR panorama)
uniform vec4 uTodCloudTint;   // rgb = sunlit cloud crest sRGB tint, w = waterExposure (1.0 = noon, 0.12 = midnight)

float hash12(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}

float noise2D(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  float a = hash12(i);
  float b = hash12(i + vec2(1.0, 0.0));
  float c = hash12(i + vec2(0.0, 1.0));
  float d = hash12(i + vec2(1.0, 1.0));
  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}

// 5-octave rotated FBM for realistic, organic ruffled ocean surface ripples (no flat vector blobs)
float fbmOcean(vec2 p, float time) {
  float val = 0.0;
  float amp = 0.5;
  mat2 rot = mat2(0.80, -0.60, 0.60, 0.80);
  vec2 shift = vec2(time * 0.28, -time * 0.21);
  for (int i = 0; i < 5; i++) {
    val += amp * noise2D(p + shift);
    p = rot * p * 2.08;
    shift = rot * shift * 1.35;
    amp *= 0.48;
  }
  return val;
}

// Height-only ocean surface evaluation for ray-intersection refinement (skips 2 extra FBM gradient evaluations!)
float evalOceanHeightOnly(vec2 xz, float time) {
  float h = 0.0;
  const vec2 dirs[5] = vec2[5](
    vec2(0.88, 0.47),
    vec2(-0.62, 0.78),
    vec2(0.35, -0.94),
    vec2(-0.91, -0.41),
    vec2(0.53, 0.85)
  );
  const float freqs[5] = float[5](0.65, 1.15, 1.95, 3.25, 5.10);
  const float amps[5]  = float[5](0.16, 0.105, 0.062, 0.036, 0.020);
  const float spds[5]  = float[5](1.10, 1.45, 1.90, 2.45, 3.20);

  for (int i = 0; i < 5; i++) {
    float phase = dot(xz, dirs[i]) * freqs[i] + time * spds[i];
    h += amps[i] * (sin(phase) + 0.28 * sin(2.0 * phase));
  }
  h += (fbmOcean(xz * 0.95, time) - 0.5) * 0.22;
  return h;
}

// Multi-directional ocean swell + distance-adaptive fine FBM capillary chop
vec3 evalOceanSurfaceDist(vec2 xz, float time, float camDist) {
  float h = 0.0;
  vec2 grad = vec2(0.0);

  const vec2 dirs[5] = vec2[5](
    vec2(0.88, 0.47),
    vec2(-0.62, 0.78),
    vec2(0.35, -0.94),
    vec2(-0.91, -0.41),
    vec2(0.53, 0.85)
  );
  const float freqs[5] = float[5](0.65, 1.15, 1.95, 3.25, 5.10);
  const float amps[5]  = float[5](0.16, 0.105, 0.062, 0.036, 0.020);
  const float spds[5]  = float[5](1.10, 1.45, 1.90, 2.45, 3.20);

  for (int i = 0; i < 5; i++) {
    float phase = dot(xz, dirs[i]) * freqs[i] + time * spds[i];
    float s = sin(phase);
    float c = cos(phase);
    float wave = s + 0.28 * sin(2.0 * phase);
    float dWave = (c + 0.56 * cos(2.0 * phase)) * freqs[i];
    h += amps[i] * wave;
    grad += amps[i] * dWave * dirs[i];
  }

  float detailWeight = 1.0 - smoothstep(54.0, 88.0, camDist);
  if (detailWeight > 0.005) {
    const float eps = 0.08;
    float f0 = fbmOcean(xz * 0.95, time);
    float fx = fbmOcean((xz + vec2(eps, 0.0)) * 0.95, time);
    float fz = fbmOcean((xz + vec2(0.0, eps)) * 0.95, time);
    h += (f0 - 0.5) * 0.22 * detailWeight;
    grad += vec2(fx - f0, fz - f0) / eps * (0.22 * detailWeight);
  }

  return vec3(h, grad.x, grad.y);
}

vec3 evalOceanSurface(vec2 xz, float time) {
  return evalOceanSurfaceDist(xz, time, 0.0);
}

// Evaluates crisp overhead wave-lens caustic focusing along a sun ray passing through worldPos.
float evalSunShaftCaustic(vec3 worldPos, float time, vec3 sunDir) {
  float dy = max(OCEAN_SURFACE_Y - worldPos.y, 0.0);
  vec2 surfXZ = worldPos.xz + (sunDir.xz / max(sunDir.y, 0.25)) * dy;

  vec2 p1 = surfXZ * 0.78 + vec2(time * 0.36, time * 0.22);
  vec2 p2 = surfXZ * 1.42 - vec2(time * 0.29, -time * 0.41);
  vec2 p3 = surfXZ * 2.55 + vec2(-time * 0.52, time * 0.34);

  float w1 = sin(p1.x * 2.4 + sin(p1.y * 2.7 + time * 0.65)) * cos(p1.y * 2.3 - sin(p1.x * 2.1));
  float w2 = sin(p2.x * 2.7 - cos(p2.y * 2.5 - time * 0.55)) * cos(p2.y * 2.6 + cos(p2.x * 2.3));
  float w3 = sin(p3.x * 2.3 + p3.y * 2.0 + time * 0.95);

  float focus = 0.5 + 0.27 * w1 + 0.18 * w2 + 0.10 * w3;
  float sharpShafts = pow(clamp(focus * 1.28, 0.0, 1.55), 3.2);

  // Focus strongest beams beneath the Snell's Window solar aperture
  vec2 sunCenterXZ = vec2(0.0, -3.8);
  float radialDist = length((surfXZ - sunCenterXZ) * vec2(0.115, 0.105));
  float windowFalloff = exp(-radialDist * radialDist * 1.15);

  return sharpShafts * windowFalloff;
}

// True linear-space Okinawa "Kerama Blue" coral-lagoon palette (adapts smoothly across all 9 Time-of-Day modes!)
vec3 evalOceanAmbient(vec3 rayDir, float depthY) {
  float upFactor = clamp(rayDir.y * 0.5 + 0.5, 0.0, 1.0);
  float heightFactor = clamp((depthY + 9.0) / 15.0, 0.0, 1.0);
  float wExp = clamp(uTodCloudTint.w, 0.10, 1.15);

  vec3 deepKerama  = vec3(0.0030, 0.052, 0.128) * mix(0.22, 1.0, wExp);
  vec3 midKerama   = vec3(0.0120, 0.135, 0.245) * wExp;
  vec3 shallowAqua = vec3(0.0420, 0.295, 0.395) * wExp;

  // Warm rose/coral golden-hour tint in shallow surface water during sunrise & sunset!
  vec3 warmTint = mix(vec3(1.0), normalize(uTodSunColor.rgb + vec3(0.35)) * 1.32, (1.0 - uTodSkySunDir.w) * smoothstep(0.25, 0.85, wExp) * 0.42);
  vec3 base = mix(deepKerama, midKerama, pow(upFactor, 0.78));
  base = mix(base, shallowAqua * warmTint, pow(upFactor, 2.35) * (0.45 + 0.55 * heightFactor));
  // Subtle deep-sapphire midnight bioluminescent water glow
  base += vec3(0.002, 0.014, 0.032) * uTodAmbient.w * heightFactor;
  return base;
}

// Physical Snell's Window + Total Internal Reflection (全反射) on the underside of the ocean surface
// when viewed from an underwater camera (camPos.y <= OCEAN_SURFACE_Y).
vec3 evalUnderwaterToAirSurface(
  vec3 camPos,
  vec3 rayDir,
  vec3 sunDir,
  float time,
  float solarFlash,
  bool hasAboveObject,
  vec3 aboveObjLit
) {
  if (rayDir.y <= 0.018) {
    return evalOceanAmbient(rayDir, OCEAN_SURFACE_Y);
  }

  float tFlat = (OCEAN_SURFACE_Y - camPos.y) / rayDir.y;
  if (tFlat <= 0.0 || tFlat >= 90.0) {
    return evalOceanAmbient(rayDir, OCEAN_SURFACE_Y);
  }

  vec3 hitPos = camPos + rayDir * tFlat;
  for (int i = 0; i < 3; i++) {
    float hWave = evalOceanHeightOnly(hitPos.xz, time);
    float targetY = OCEAN_SURFACE_Y + hWave;
    tFlat += (targetY - hitPos.y) / max(rayDir.y, 0.09);
    hitPos = camPos + rayDir * tFlat;
  }
  tFlat = max(tFlat, 0.02);

  vec3 surf = evalOceanSurfaceDist(hitPos.xz, time, tFlat);
  vec3 surfNormal = normalize(vec3(-surf.y * 1.15, -1.0, -surf.z * 1.15));

  const float eta = 1.315;
  float cosI = clamp(dot(-rayDir, surfNormal), 0.0, 1.0);
  float k = 1.0 - eta * eta * (1.0 - cosI * cosI);
  float windowTrans = smoothstep(-0.02, 0.14, k);

  float wExp = clamp(uTodCloudTint.w, 0.12, 1.15);
  float waveFacing = clamp(0.5 + 0.5 * dot(surfNormal.xz, normalize(vec2(0.0, 1.0))), 0.0, 1.0);
  vec3 reflCol = mix(
    vec3(0.005, 0.062, 0.125),
    vec3(0.042, 0.265, 0.365),
    pow(waveFacing, 1.5) * smoothstep(55.0, 6.0, tFlat)
  ) * wExp;
  float tirShimmer = smoothstep(0.10, 0.46, length(surf.yz)) * smoothstep(42.0, 4.0, tFlat);
  reflCol += vec3(0.020, 0.105, 0.148) * tirShimmer * wExp;
  reflCol += vec3(0.006, 0.055, 0.085) * tirShimmer * uTodAmbient.w;

  vec3 refrDir = normalize(eta * rayDir + (eta * cosI - sqrt(max(k, 0.0))) * surfNormal);
  vec3 skySunDir = normalize(vec3(uTodSkySunDir.x, max(uTodSkySunDir.y, 0.22), uTodSkySunDir.z));
  float sunAlign = max(dot(refrDir, skySunDir), 0.0);

  float lateralFalloff = exp(-pow(hitPos.x * 0.075, 2.0) - pow((hitPos.z + 5.2) * 0.045, 2.0));
  vec3 skyHorizLin = pow(clamp(uTodSkyHorizon.rgb, 0.0, 1.0), vec3(2.2)) * 0.65;
  vec3 skyZenLin   = pow(clamp(uTodSkyZenith.rgb, 0.0, 1.0), vec3(2.2)) * 1.45 + vec3(0.004, 0.016, 0.042);
  vec3 skyCyan = mix(skyHorizLin, skyZenLin, pow(clamp(refrDir.y, 0.0, 1.0), 0.65))
               * (0.48 + 0.52 * lateralFalloff);

  float diskScale = clamp(uTodSkyZenith.w, 0.0, 1.2);
  float sunCore = pow(sunAlign, 52.0) * 13.0 * lateralFalloff * diskScale;
  float sunHalo = (pow(sunAlign, 8.5) * 3.0 + pow(sunAlign, 2.6) * 0.78) * (0.40 + 0.60 * lateralFalloff) * max(diskScale, 0.25);
  float waveGlint = smoothstep(0.08, 0.45, length(surf.yz)) * pow(sunAlign, 4.5) * 1.55 * lateralFalloff * max(diskScale, 0.25);

  float flashBoost = 1.0 + solarFlash * 2.4;
  vec3 baseSunTint = mix(uTodSunColor.rgb, vec3(0.86, 0.99, 1.0), uTodSkySunDir.w * 0.75);
  vec3 sunTint = mix(baseSunTint, vec3(1.14, 0.98, 0.70), solarFlash * 0.75);
  vec3 skyTransmitted = skyCyan + sunTint * (sunCore + sunHalo + waveGlint) * flashBoost;

  vec3 transmitted = skyTransmitted;
  if (hasAboveObject) {
    float waveWash = clamp(0.45 + length(surf.yz) * 1.65 + tFlat * 0.15, 0.45, 0.97);
    transmitted = mix(aboveObjLit * vec3(0.70, 0.92, 0.98), skyTransmitted, waveWash);
  }

  float fresnel = pow(1.0 - cosI, 4.0);
  vec3 surfaceRad = mix(reflCol, transmitted, windowTrans * (1.0 - fresnel * 0.80));

  vec3 sigmaExt = vec3(0.068, 0.026, 0.018);
  vec3 trans = exp(-sigmaExt * tFlat);
  vec3 inScatter = evalOceanAmbient(rayDir, OCEAN_SURFACE_Y) * (1.0 - exp(-0.028 * tFlat));

  vec3 result = surfaceRad * trans + inScatter;
  float grazeFade = smoothstep(0.018, 0.065, rayDir.y);
  return mix(evalOceanAmbient(rayDir, OCEAN_SURFACE_Y), result, grazeFade);
}

// ============================================================================
// Real-Time 3D Okinawa Resort Night & Twilight Illumination
// (Kagaribi Torches · Cabana Rattan Lanterns · CHURA BAR Festoon Bulbs & Neon ·
//  Cordless Brass Table Lamps · Oki-Slot Hibiscus · Dive Clubhouse Veranda)
// ============================================================================
vec3 addPointLamp(vec3 worldPos, vec3 N, vec3 lPos, vec3 lCol, float radius, float wrapAmt) {
  vec3 d = lPos - worldPos;
  float d2 = dot(d, d);
  float r2 = radius * radius;
  if (d2 > r2 * 2.6) return vec3(0.0);
  float dist = sqrt(max(d2, 1e-4));
  vec3 L = d / dist;
  float window = clamp(1.0 - d2 / (r2 * 2.6), 0.0, 1.0);
  float atten = (window * window) / (1.0 + d2 / (radius * 0.36));
  float ndl = clamp((dot(N, L) + wrapAmt) / (1.0 + wrapAmt), 0.0, 1.0);
  return lCol * (atten * ndl);
}

vec3 evalResortWarmLight(vec3 worldPos, vec3 N, float time) {
  float glow = uTodSunColor.w;
  if (glow <= 0.005 || worldPos.y < OCEAN_SURFACE_Y - 1.2) return vec3(0.0);

  vec3 acc = vec3(0.0);
  // 1) 6 Flickering Copper & Bamboo Kagaribi Island Torches along the Beach Promenade!
  float f1 = 0.88 + 0.12 * sin(time * 9.5 + 0.7) * cos(time * 6.3);
  float f2 = 0.88 + 0.12 * sin(time * 10.2 + 2.1) * cos(time * 7.1 + 1.2);
  float f3 = 0.88 + 0.12 * sin(time * 8.9 + 4.0) * cos(time * 5.8 + 2.5);
  vec3 torchCol = vec3(1.52, 0.58, 0.14);
  acc += addPointLamp(worldPos, N, vec3(-5.15, 7.42, 20.65), torchCol * f1, 5.4, 0.45);
  acc += addPointLamp(worldPos, N, vec3(-1.05, 7.42, 20.85), torchCol * f2, 5.4, 0.45);
  acc += addPointLamp(worldPos, N, vec3( 1.38, 7.62, 19.72), torchCol * f3, 5.6, 0.45);
  acc += addPointLamp(worldPos, N, vec3( 4.38, 7.62, 21.58), torchCol * f1, 5.6, 0.45);
  acc += addPointLamp(worldPos, N, vec3( 8.95, 7.42, 20.85), torchCol * f2, 5.4, 0.45);
  acc += addPointLamp(worldPos, N, vec3(13.55, 7.42, 20.85), torchCol * f3, 5.2, 0.45);

  // 2) Private Palapa Cabana #1 & #2 Overhead Rattan Lanterns + Cordless Brass Cocktail Table Lamps!
  vec3 lanternCol = vec3(1.15, 0.76, 0.34);
  acc += addPointLamp(worldPos, N, vec3( 6.70, 8.15, 19.65), lanternCol, 5.2, 0.55);
  acc += addPointLamp(worldPos, N, vec3(11.25, 8.15, 19.75), lanternCol, 5.2, 0.55);
  vec3 tblLampCol = vec3(0.85, 0.54, 0.20);
  acc += addPointLamp(worldPos, N, vec3( 4.32, 7.05, 21.47), tblLampCol, 2.8, 0.50);
  acc += addPointLamp(worldPos, N, vec3(-2.18, 6.70, 21.21), tblLampCol, 2.8, 0.50);
  acc += addPointLamp(worldPos, N, vec3( 5.19, 7.54, 24.79), tblLampCol, 3.0, 0.50);
  acc += addPointLamp(worldPos, N, vec3( 8.99, 7.54, 24.79), tblLampCol, 3.0, 0.50);

  // 3) CHURA BAR Festoon String Bulbs + Backbar Neon Glow + Oki-Slot Parlor Corner!
  vec3 barWarm = vec3(1.28, 0.84, 0.38);
  acc += addPointLamp(worldPos, N, vec3( 4.65, 9.28, 26.85), barWarm, 6.2, 0.50);
  acc += addPointLamp(worldPos, N, vec3( 8.35, 9.28, 26.85), barWarm, 6.2, 0.50);
  acc += addPointLamp(worldPos, N, vec3( 6.80, 9.10, 30.20), vec3(0.42, 0.72, 0.95), 4.8, 0.60);
  acc += addPointLamp(worldPos, N, vec3(11.57, 8.35, 26.95), vec3(1.05, 0.52, 0.62), 4.4, 0.55);

  // 4) Dive Clubhouse Workbench, Veranda & Boarding Pier / Boat Deck Harbor Lanterns!
  vec3 clubWarm = vec3(1.12, 0.86, 0.55);
  acc += addPointLamp(worldPos, N, vec3(-5.40, 9.15, 27.40), clubWarm, 6.6, 0.55);
  acc += addPointLamp(worldPos, N, vec3(-0.60, 9.10, 26.80), clubWarm, 6.0, 0.55);
  acc += addPointLamp(worldPos, N, vec3( 1.68, 7.05, 20.35), vec3(0.95, 0.34, 0.08) * f2, 3.2, 0.45);
  acc += addPointLamp(worldPos, N, vec3( 0.00, 7.35, 14.80), vec3(0.82, 0.62, 0.32), 5.0, 0.50);

  // 5) ZEN University Zushi / Sanctuary Campus Architectural Night Illumination (North Side z > 32)!
  if (worldPos.z > 30.5) {
    vec3 zenPortico = vec3(1.18, 0.98, 0.76);
    acc += addPointLamp(worldPos, N, vec3(-3.10, 9.22, 49.85), zenPortico, 6.8, 0.55);
    acc += addPointLamp(worldPos, N, vec3(-0.10, 9.22, 49.85), zenPortico, 6.8, 0.55);
    // Monument sign & Hirado azalea ground uplights
    acc += addPointLamp(worldPos, N, vec3(-5.75, 6.95, 51.65), vec3(1.25, 0.96, 0.62), 4.8, 0.55);
    // Sunken dry-area bollard garden lights + luminous glass-block atrium glow
    acc += addPointLamp(worldPos, N, vec3( 5.10, 7.25, 47.45), vec3(1.05, 0.88, 0.58), 5.4, 0.55);
    acc += addPointLamp(worldPos, N, vec3( 4.85, 9.85, 43.20), vec3(0.76, 0.94, 0.98), 7.4, 0.65);
    // East wing 2-story trapezoidal bay window warm seminar glow
    acc += addPointLamp(worldPos, N, vec3( 9.80, 11.45, 49.40), vec3(1.16, 0.88, 0.54), 6.8, 0.55);
    // Unmanned 1F Lobby, Museum Exhibition Wall Track Spotlights & South garden portal
    acc += addPointLamp(worldPos, N, vec3(-2.20, 8.85, 42.60), vec3(0.95, 0.92, 0.85), 7.2, 0.60);
    acc += addPointLamp(worldPos, N, vec3(-1.60, 8.88, 37.85), vec3(1.08, 0.98, 0.86), 6.2, 0.55);
    acc += addPointLamp(worldPos, N, vec3( 1.95, 8.75, 35.40), vec3(1.08, 0.88, 0.58), 5.8, 0.55);
  }

  return acc * glow;
}

// Always-on Architectural Interior Illumination & Glass-Block Atrium Daylight Bounce for ZEN University 1F!
vec3 evalZenCampusInteriorLight(vec3 worldPos, vec3 N) {
  if (
    worldPos.z < 31.6 ||
    worldPos.z > 48.6 ||
    worldPos.x < -14.0 ||
    worldPos.x > 14.8 ||
    worldPos.y < 6.25 ||
    worldPos.y > 9.55
  ) {
    return vec3(0.0);
  }

  // Smoothly confine indirect gallery bounce inside the 1F campus footprint + South Auto-Door Vestibule (x in [0.38..3.52], z >= 31.8)
  float wx = smoothstep(-13.6, -12.7, worldPos.x) * (1.0 - smoothstep(13.9, 14.6, worldPos.x));
  float wzNorth = (worldPos.x > 7.8)
    ? (1.0 - smoothstep(48.8, 49.4, worldPos.z))
    : (worldPos.x > 2.2)
      ? (1.0 - smoothstep(42.1, 42.7, worldPos.z))
      : (1.0 - smoothstep(47.6, 48.3, worldPos.z));
  float inSouthVestibule = smoothstep(0.32, 0.55, worldPos.x)
                         * (1.0 - smoothstep(3.35, 3.58, worldPos.x))
                         * smoothstep(31.72, 32.05, worldPos.z);
  float wzSouth = max(smoothstep(35.8, 36.6, worldPos.z), inSouthVestibule);
  float wy = (1.0 - smoothstep(9.18, 9.48, worldPos.y));
  float indoorMask = wx * wzSouth * wzNorth * wy;
  if (indoorMask <= 0.001) return vec3(0.0);

  float dayExposure = clamp(uTodCloudTint.w, 0.16, 1.0);
  // 1) Warm-ivory floor-to-ceiling indirect gallery bounce (keeps ceilings & plaster walls crisp white even in noon shadow!)
  vec3 hemiBounce = mix(vec3(0.56, 0.53, 0.48), vec3(0.46, 0.44, 0.41), clamp(N.y * 0.5 + 0.5, 0.0, 1.0));
  vec3 acc = hemiBounce * (0.78 + 0.24 * dayExposure) * indoorMask;

  // 2) Sunlit 3-Story Square Glass-Block Atrium Daylight Flood + Entrance & Clubhouse Auto-Door Bounce!
  vec3 atriumDayCol = vec3(0.58, 0.66, 0.68) * dayExposure;
  acc += addPointLamp(worldPos, N, vec3( 4.45, 8.65, 41.80), atriumDayCol, 8.2, 0.75);
  acc += addPointLamp(worldPos, N, vec3(-1.60, 8.25, 47.20), vec3(0.42, 0.48, 0.50) * dayExposure, 6.4, 0.70);
  acc += addPointLamp(worldPos, N, vec3( 1.95, 8.35, 33.80), vec3(0.52, 0.52, 0.48), 6.2, 0.70);

  // 3) 4000K Neutral-Warm Recessed Architectural LED Downlights across Lobby, Seminar, Atrium & Broadcast Studio!
  vec3 ledWarm = vec3(0.62, 0.56, 0.46);
  acc += addPointLamp(worldPos, N, vec3(-1.85, 8.92, 44.50), ledWarm, 6.8, 0.65);
  acc += addPointLamp(worldPos, N, vec3(-1.60, 8.92, 39.20), ledWarm, 6.8, 0.65);
  acc += addPointLamp(worldPos, N, vec3(-8.85, 8.92, 41.20), ledWarm * 1.05, 7.2, 0.65);
  acc += addPointLamp(worldPos, N, vec3( 3.20, 8.95, 39.60), ledWarm * 0.92, 6.4, 0.65);
  acc += addPointLamp(worldPos, N, vec3(11.65, 8.92, 45.20), vec3(0.68, 0.64, 0.58), 7.2, 0.65);
  acc += addPointLamp(worldPos, N, vec3(11.65, 8.92, 39.60), ledWarm * 0.95, 6.6, 0.65);

  return acc;
}

// ============================================================================
// Key's "AIR" Aesthetic + 9-Mode Okinawa Sky, CUDA 8K Cloud Relighting,
// Starfield & Diagonal Milky Way ('天の川') Synthesis
// ============================================================================
const vec3 AIR_SUMMER_SUN_DIR = vec3(-0.398862, 0.598293, -0.695017);

vec3 airInverseAcesFromSrgb(vec3 srgbTarget) {
  vec3 c = clamp(srgbTarget, vec3(0.0), vec3(0.988));
  vec3 y = min(pow(c, vec3(2.2)), vec3(0.942));
  const float a = 2.51;
  const float b = 0.03;
  const float cc = 2.43;
  const float d = 0.59;
  const float e = 0.14;
  vec3 A = vec3(a) - cc * y;
  vec3 B = vec3(b) - d * y;
  vec3 disc = max(B * B + 4.0 * A * (e * y), vec3(0.0));
  vec3 x = (-B + sqrt(disc)) / max(2.0 * A, vec3(1e-4));
  return x / 1.12;
}

vec3 evalNightStarfield(vec3 d, float time, float starIntensity, float cloudMask) {
  if (starIntensity <= 0.01 || d.y <= 0.01) return vec3(0.0);
  // Project sky dome onto smooth stereographic-like UV free of zenith singularities!
  vec2 skyP = d.xz / (d.y + 0.38);
  float horizonFade = smoothstep(0.02, 0.22, d.y) * (1.0 - cloudMask * 0.94);

  vec3 stars = vec3(0.0);
  // Layer 1: Bright hero stars (Vega, Sirius, Antares, Canopus over Okinawa!)
  vec2 g1 = skyP * 26.0;
  vec2 id1 = floor(g1);
  vec2 f1 = fract(g1) - 0.5;
  float r1 = hash12(id1);
  if (r1 > 0.83) {
    vec2 j1 = vec2(fract(r1 * 17.3) - 0.5, fract(r1 * 31.7) - 0.5) * 0.62;
    float dist1 = length(f1 - j1);
    float tw1 = 0.72 + 0.28 * sin(time * (2.2 + fract(r1 * 9.1) * 3.2) + r1 * 40.0);
    float core1 = exp(-dist1 * dist1 * 210.0) * tw1;
    vec3 col1 = mix(vec3(0.72, 0.86, 1.0), vec3(1.0, 0.84, 0.62), fract(r1 * 43.1));
    stars += col1 * core1 * 1.45;
  }

  // Layer 2: Medium constellation stars
  vec2 g2 = skyP * 58.0 + vec2(11.3, 7.9);
  vec2 id2 = floor(g2);
  vec2 f2 = fract(g2) - 0.5;
  float r2 = hash12(id2);
  if (r2 > 0.74) {
    vec2 j2 = vec2(fract(r2 * 13.9) - 0.5, fract(r2 * 27.1) - 0.5) * 0.66;
    float dist2 = length(f2 - j2);
    float tw2 = 0.78 + 0.22 * sin(time * (1.8 + fract(r2 * 7.7) * 2.5) + r2 * 25.0);
    stars += mix(vec3(0.76, 0.88, 1.0), vec3(1.0, 0.92, 0.78), fract(r2 * 19.7)) * exp(-dist2 * dist2 * 260.0) * tw2 * 0.82;
  }

  // Layer 3: Fine stardust & Midnight Milky Way ('天の川')!
  float mwAmt = clamp((starIntensity - 0.92) / 0.40, 0.0, 1.0);
  if (mwAmt > 0.005) {
    // Diagonal galactic plane arching across Okinawa midnight sky
    float galPlane = dot(d, normalize(vec3(0.54, 0.42, 0.73)));
    float band = exp(-galPlane * galPlane * 14.5);
    float nDust1 = noise2D(skyP * 3.8 + vec2(2.1, -1.4));
    float nDust2 = noise2D(skyP * 9.5 - vec2(4.2, 3.1));
    float darkRift = smoothstep(0.32, 0.68, noise2D(skyP * 5.2 + vec2(0.8, 1.9))) * exp(-galPlane * galPlane * 65.0);
    float nebula = band * (0.45 + 0.75 * nDust1 * nDust2) * (1.0 - 0.62 * darkRift);
    vec3 mwCol = mix(vec3(0.055, 0.088, 0.195), vec3(0.165, 0.135, 0.235), nDust1);
    // Fine galactic star-cloud resolving inside the Milky Way band
    vec2 g3 = skyP * 125.0;
    float r3 = hash12(floor(g3));
    float fineStar = (r3 > 0.62) ? exp(-dot(fract(g3) - 0.5, fract(g3) - 0.5) * 240.0) * 0.48 : 0.0;
    stars += (mwCol * nebula * 0.85 + vec3(0.85, 0.90, 1.0) * fineStar * (0.25 + 1.35 * band)) * mwAmt;
  }

  return stars * clamp(starIntensity, 0.0, 1.35) * horizonFade;
}

vec3 evalAirPanoramaSky(
  vec3 dir,
  vec3 skySunDirUnused,
  float time,
  sampler2D airSkyTex,
  int airSkyReady,
  float mipLod
) {
  vec3 d = normalize(dir);
  float elev = clamp(d.y, 0.0, 1.0);
  float el = asin(elev);
  float az = atan(d.x, -d.z);
  vec3 sunD = normalize(uTodSkySunDir.xyz);
  float sunCos = max(dot(d, sunD), 0.0);
  float origMix = clamp(uTodSkySunDir.w, 0.0, 1.0);

  vec3 panoSrgb = vec3(0.048, 0.320, 0.740);
  if (airSkyReady == 1) {
    float u = fract(az * 0.15915494 + 0.175 + time * 0.00022);
    const float PANO_MAX_EL = 0.62;
    float v = clamp(1.0 - el / PANO_MAX_EL, 0.0015, 0.9985);

    if (mipLod <= 0.25) {
      vec2 texDim = vec2(textureSize(airSkyTex, 0));
      vec2 pTex = vec2(u, v) * texDim - 0.5;
      vec2 iTex = floor(pTex);
      vec2 fTex = pTex - iTex;
      fTex = fTex * fTex * fTex * (fTex * (fTex * 6.0 - 15.0) + 10.0);
      vec2 qUv = (iTex + fTex + 0.5) / max(texDim, vec2(1.0));
      qUv.y = clamp(qUv.y, 0.0015, 0.9985);
      panoSrgb = textureLod(airSkyTex, qUv, 0.0).rgb;
    } else {
      panoSrgb = textureLod(airSkyTex, vec2(u, v), mipLod).rgb;
    }
    vec3 deepZenithSrgb = vec3(0.008, 0.105, 0.410);
    panoSrgb = mix(panoSrgb, deepZenithSrgb, smoothstep(0.54, 1.28, el));
  } else {
    vec3 hCol = vec3(0.529, 0.876, 0.985);
    vec3 mCol = vec3(0.048, 0.320, 0.740);
    vec3 zCol = vec3(0.012, 0.145, 0.470);
    panoSrgb = mix(hCol, mCol, smoothstep(0.0, 0.18, elev));
    panoSrgb = mix(panoSrgb, zCol, smoothstep(0.15, 0.62, elev));
  }

  vec3 srgbCol = panoSrgb;
  float cloudMask = 0.0;

  if (origMix < 0.999) {
    // Extract clean cloud matte & 3D internal cumulonimbus relief from our CUDA 8K AIR panorama!
    float cloudRaw = clamp((panoSrgb.r - panoSrgb.b * 0.24) / 0.74, 0.0, 1.0);
    cloudMask = smoothstep(0.04, 0.58, cloudRaw) * (1.0 - smoothstep(0.56, 0.95, el));
    float cloudHighlight = smoothstep(0.32, 0.94, dot(panoSrgb, vec3(0.35, 0.45, 0.20)));

    // Azimuthal solar/lunar scattering glow (strongest toward rising/setting sun, softer Belt-of-Venus opposite!)
    vec2 dHoriz = normalize(vec2(d.x, d.z) + vec2(1e-5));
    vec2 sHoriz = normalize(vec2(sunD.x, sunD.z) + vec2(1e-5));
    float azAlign = clamp(dot(dHoriz, sHoriz) * 0.5 + 0.5, 0.0, 1.0);
    float solarGlow = pow(azAlign, 2.4);

    vec3 antiSolarHoriz = mix(uTodSkyZenith.rgb * 1.65 + vec3(0.04, 0.03, 0.08), uTodSkyHorizon.rgb * 0.52, 0.55);
    vec3 dirHorizSrgb   = mix(antiSolarHoriz, uTodSkyHorizon.rgb, 0.32 + 0.68 * solarGlow);
    vec3 midSkySrgb     = mix(dirHorizSrgb, uTodSkyZenith.rgb, 0.64);

    vec3 todClearSky = mix(dirHorizSrgb, midSkySrgb, smoothstep(0.0, 0.22, elev));
    todClearSky      = mix(todClearSky, uTodSkyZenith.rgb, smoothstep(0.16, 0.68, elev));
    // Extra localized warm atmospheric scattering dome around low sunrise/sunset sun
    todClearSky += uTodSkyHorizon.rgb * pow(sunCos, 5.0) * 0.34 * (1.0 - smoothstep(0.0, 0.45, sunD.y));

    // Relight the 8K cumulonimbus clouds with dramatic twilight/sunset/moonlit undersides & glowing crests!
    vec3 cloudShadowCol = mix(uTodSkyZenith.rgb * 0.85 + vec3(0.03, 0.025, 0.06), dirHorizSrgb * 0.48, 0.42);
    float rimSun = 0.35 + 0.65 * pow(azAlign, 1.6);
    vec3 cloudLitCol = mix(cloudShadowCol, uTodCloudTint.rgb, clamp(cloudHighlight * (0.65 + 0.45 * rimSun), 0.0, 1.0));
    vec3 todSkySrgb = mix(todClearSky, cloudLitCol, cloudMask);

    srgbCol = mix(todSkySrgb, panoSrgb, origMix);
  }

  vec3 hdrSky = airInverseAcesFromSrgb(clamp(srgbCol, 0.0, 0.988));

  // Add twinkling stars & Midnight Milky Way ('天の川') behind clouds!
  if (mipLod < 0.5 && uTodSkyHorizon.w > 0.01) {
    hdrSky += evalNightStarfield(d, time, uTodSkyHorizon.w, cloudMask);
  }

  // Crisp Sun Disk (day/sunrise/sunset) OR Luminous Silver Full Moon Disk (night/midnight)!
  float diskPow = uTodSkyZenith.w;
  if (diskPow > 0.01 && sunD.y > -0.025) {
    bool isMoon = (uTodSkyHorizon.w > 0.55);
    float diskEdge0 = isMoon ? 0.99935 : 0.99915;
    float diskEdge1 = isMoon ? 0.99972 : 0.99982;
    float sunDisk = smoothstep(diskEdge0, diskEdge1, sunCos) * (isMoon ? 3.2 : 9.5) * diskPow * (1.0 - cloudMask * 0.82);
    float sunCorona = pow(sunCos, isMoon ? 96.0 : 56.0) * (isMoon ? 0.42 : 0.88) * diskPow;
    vec3 diskTint = isMoon ? vec3(0.78, 0.88, 1.08) : mix(uTodCloudTint.rgb * 1.15, vec3(1.10, 1.03, 0.90), origMix);
    hdrSky += diskTint * (sunDisk + sunCorona);
  }

  return hdrSky;
}
`,jh=`#version 300 es
precision highp float;
precision highp sampler2D;

uniform sampler2D uPosTex;
uniform sampler2D uVelTex;
uniform sampler2D uMetaTex;
uniform sampler2D uStarTex;

uniform ivec2 uSimRes;
uniform float uTime;
uniform float uSeqTime;
uniform int uMode; // 0..4=Showcase, 5=Peaceful Coral Reef Shoals, 6=3D Gyogun Bonus Torrent, 7=Jackpot Halo
uniform float uDt;
uniform int uFrame;
uniform vec4 uPointerWorld; // xyz = world point, w = strength

// Gyogun dedicated uniforms
uniform int uGyogunReset;
uniform float uGyogunDir;      // -1.0 = Right-to-Left (王道), +1.0 = Left-to-Right (逆魚群)
uniform int uGyogunInfinite;   // 1 = Endless wraparound (超魚群)

layout(location = 0) out vec4 outPos;
layout(location = 1) out vec4 outVel;

${wi}

const float TAU = 6.28318530718;

float hash13(vec3 p3) {
  p3 = fract(p3 * 0.1031);
  p3 += dot(p3, p3.zyx + 31.32);
  return fract((p3.x + p3.y) * p3.z);
}

float vnoise(vec3 x) {
  vec3 i = floor(x);
  vec3 f = fract(x);
  vec3 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(
      mix(hash13(i + vec3(0.0, 0.0, 0.0)), hash13(i + vec3(1.0, 0.0, 0.0)), u.x),
      mix(hash13(i + vec3(0.0, 1.0, 0.0)), hash13(i + vec3(1.0, 1.0, 0.0)), u.x),
      u.y
    ),
    mix(
      mix(hash13(i + vec3(0.0, 0.0, 1.0)), hash13(i + vec3(1.0, 0.0, 1.0)), u.x),
      mix(hash13(i + vec3(0.0, 1.0, 1.0)), hash13(i + vec3(1.0, 1.0, 1.0)), u.x),
      u.y
    ),
    u.z
  );
}

vec3 safeNormalize(vec3 v, vec3 fallback) {
  float len2 = dot(v, v);
  return (len2 > 1e-8) ? (v * inversesqrt(len2)) : fallback;
}

vec3 curlNoise(vec3 p) {
  const float e = 0.18;
  float nY1 = vnoise(p + vec3(0.0, e, 0.0));
  float nY0 = vnoise(p - vec3(0.0, e, 0.0));
  float nZ1 = vnoise(p + vec3(0.0, 0.0, e));
  float nZ0 = vnoise(p - vec3(0.0, 0.0, e));
  float nX1 = vnoise(p + vec3(e, 0.0, 0.0));
  float nX0 = vnoise(p - vec3(e, 0.0, 0.0));

  vec3 p2 = p * 1.13 + vec3(19.3, 47.1, 83.7);
  float mY1 = vnoise(p2 + vec3(0.0, e, 0.0));
  float mY0 = vnoise(p2 - vec3(0.0, e, 0.0));
  float mZ1 = vnoise(p2 + vec3(0.0, 0.0, e));
  float mZ0 = vnoise(p2 - vec3(0.0, 0.0, e));
  float mX1 = vnoise(p2 + vec3(e, 0.0, 0.0));
  float mX0 = vnoise(p2 - vec3(e, 0.0, 0.0));

  vec3 c = vec3(
    (mZ1 - mZ0) - (nY1 - nY0),
    (nX1 - nX0) - (mZ1 - mZ0),
    (mY1 - mY0) - (nX1 - nX0)
  );
  return c / (2.0 * e);
}

vec3 evalStarTangent(vec3 sp) {
  const float Rx = 3.68;
  const float Ry = 3.86;
  float sx = sp.x / Rx;
  float sy = (sp.y - 0.14) / Ry;
  float sgnX = sx >= 0.0 ? 1.0 : -1.0;
  float sgnY = sy >= 0.0 ? 1.0 : -1.0;

  vec2 tangXY = vec2(
    -sgnY * pow(max(abs(sx), 1e-4), 0.51) * Rx,
     sgnX * pow(max(abs(sy), 1e-4), 0.51) * Ry
  );
  return safeNormalize(vec3(tangXY, 0.0), vec3(0.0, 1.0, 0.0));
}

// Sculpted 5-ribbon braided underwater fish currents with open sunlit channels between streams
vec2 evalBraidedGyogunRibbon(float x, float ribbonId, float time) {
  const float bases[5] = float[5](-2.75, -1.30, 0.15, 1.58, 2.98);
  int rIdx = clamp(int(ribbonId + 0.5), 0, 4);
  float baseY = bases[rIdx];
  float phase = ribbonId * 1.92;

  float w1 = 0.88 * sin(0.38 * x + time * 3.1 + phase);
  float w2 = 0.34 * cos(0.82 * x - time * 2.2 - phase * 0.65);
  float y = baseY + w1 + w2;
  float dydx = 0.88 * 0.38 * cos(0.38 * x + time * 3.1 + phase)
             - 0.34 * 0.82 * sin(0.82 * x - time * 2.2 - phase * 0.65);
  return vec2(y, dydx);
}

void main() {
  ivec2 coord = ivec2(gl_FragCoord.xy);
  int idx = coord.y * uSimRes.x + coord.x;
  int totalFish = uSimRes.x * uSimRes.y;

  vec4 posState = texelFetch(uPosTex, coord, 0);
  vec4 velState = texelFetch(uVelTex, coord, 0);
  vec4 meta     = texelFetch(uMetaTex, coord, 0);
  vec4 starHome = texelFetch(uStarTex, coord, 0);

  vec3 pos = posState.xyz;
  float swimPhase = posState.w;
  vec3 vel = velState.xyz;
  float smoothedSpeed = velState.w;

  float podNorm   = meta.x;
  float isAmbient = meta.y;
  float scale     = meta.z;
  float seed      = meta.w;

  // =========================================================================
  // SEA STORY CORAL LAGOON MODES (5 = Peaceful Reef Shoals, 6 = 3D Gyogun, 7 = Jackpot Halo)
  // =========================================================================
  if (uMode >= 5) {
    float oceanNorm = float(idx) / float(max(1, totalFish));

    if (uMode == 6) {
      // === 【ボーナス演出】49,152匹 3D 大魚群予告 (Braided 5-Ribbon Multi-Stratum Coral Reef Torrent) ===
      float dir = (uGyogunDir >= 0.0) ? 1.0 : -1.0; // -1 = Right-to-Left, +1 = Reverse
      float podId = floor(oceanNorm * 380.0);
      float ribbonId = mod(podId, 5.0);
      float depthRoll = fract(podId * 0.371 + seed * 0.11);

      bool isForeground = (depthRoll < 0.12);
      float targetZ = isForeground
        ? mix(3.4, 5.4, depthRoll / 0.12)
        : ((depthRoll < 0.72)
            ? mix(-2.4, -0.55, (depthRoll - 0.12) / 0.60)
            : mix(-6.4, -2.5, (depthRoll - 0.72) / 0.28));

      float frustumEdgeX = max(5.8, (11.6 - targetZ) * 0.82);

      if (uGyogunReset == 1) {
        float streamPos = fract(oceanNorm + (seed - 0.5) * 0.04);
        float startX = -dir * (frustumEdgeX + 0.4 + streamPos * 32.0);
        vec2 rib = evalBraidedGyogunRibbon(startX, ribbonId, uTime);
        float baseSpread = (fract(seed * 13.7) - 0.5) * 0.70;
        float yPos = rib.x + baseSpread;
        if (isForeground) {
          yPos = (mod(podId, 2.0) < 0.5 ? 2.40 : -2.25) + 0.50 * sin(0.35 * startX + ribbonId * 1.92) + baseSpread * 0.65;
        }
        pos = vec3(startX, clamp(yPos, -3.75, 4.35), targetZ + (fract(seed * 29.3) - 0.5) * 0.65);
        float initSpd = 10.8 + scale * 1.9;
        vel = vec3(dir * initSpd, rib.y * dir * initSpd, 0.0);
        outPos = vec4(pos, swimPhase);
        outVel = vec4(vel, initSpd);
        return;
      }

      if (uGyogunInfinite == 1 && (dir * pos.x > frustumEdgeX + 2.4)) {
        float reX = -dir * (frustumEdgeX + 1.0 + seed * 3.6);
        vec2 rib = evalBraidedGyogunRibbon(reX, ribbonId, uTime);
        pos.x = reX;
        pos.y = clamp(rib.x + (fract(seed * 13.7) - 0.5) * 0.70, -3.75, 4.35);
        pos.z = targetZ + (fract(seed * 29.3) - 0.5) * 0.65;
      }

      int podStart = (idx / 64) * 64;
      int localId = idx - podStart;
      int stride = (uFrame * 5 + localId) & 3;
      vec3 sep = vec3(0.0);
      for (int k = 0; k < 8; k++) {
        int peerIdx = min(totalFish - 1, podStart + ((k * 8 + stride) & 63));
        if (peerIdx == idx) continue;
        ivec2 peerCoord = ivec2(peerIdx % uSimRes.x, peerIdx / uSimRes.x);
        vec3 diff = pos - texelFetch(uPosTex, peerCoord, 0).xyz;
        float d2 = dot(diff, diff);
        if (d2 > 1e-6 && d2 < 0.20) {
          sep += diff * inversesqrt(d2) * (1.0 - sqrt(d2) / 0.447);
        }
      }

      vec2 rib = evalBraidedGyogunRibbon(pos.x, ribbonId, uTime);
      float helixPhase = pos.x * 0.55 - uTime * 3.2 + seed * TAU;
      float tubeRad = 0.40 * sqrt(fract(seed * 17.3));
      float desiredY = rib.x + cos(helixPhase) * tubeRad;
      if (isForeground) {
        float arcBase = (mod(podId, 2.0) < 0.5) ? 2.40 : -2.25;
        desiredY = arcBase + 0.58 * sin(0.36 * pos.x + uTime * 2.8 + ribbonId) + cos(helixPhase) * 0.32;
      }
      desiredY = clamp(desiredY, -3.80, 4.40);
      float desiredZ = targetZ + sin(helixPhase) * tubeRad * 0.85;

      float cruiseSpd = 10.6 + 2.5 * fract(podId * 0.23) + 1.2 * scale;
      if (isForeground) cruiseSpd *= 1.16;

      vec3 curl = curlNoise(pos * 0.32 + vec3(uTime * 0.25, 0.0, 0.0)) * 0.85;
      vec3 desiredVel = vec3(
        dir * cruiseSpd,
        rib.y * dir * cruiseSpd + (desiredY - pos.y) * 5.4,
        (desiredZ - pos.z) * 4.2
      ) + sep * 3.1 + curl;

      vel = mix(vel, desiredVel, clamp(uDt * 9.5, 0.0, 1.0));
      pos += vel * uDt;

      float spd = length(vel);
      swimPhase = mod(swimPhase + (11.5 + spd * 2.15) * uDt, TAU);
      outPos = vec4(pos, swimPhase);
      outVel = vec4(vel, spd);
      return;
    }

    // === uMode == 5 (Calm Coral Reef Damselfish Shoals) & uMode == 7 (Jackpot Reef Halo) ===
    // In uMode == 5, VfxEngine only draws the first 384 reef damselfish so the lagoon stays serene!
    if (uMode == 5 && idx >= 512) {
      outPos = posState;
      outVel = velState;
      return;
    }
    if (uMode == 7 && idx >= 8192) {
      outPos = posState;
      outVel = velState;
      return;
    }

    int podStart = (idx / 64) * 64;
    int localId = idx - podStart;
    int stride = (uFrame * 7 + localId) & 3;

    vec3 sepForce = vec3(0.0);
    vec3 alignSum = vec3(0.0);
    vec3 cohSum   = vec3(0.0);
    float nw = 0.0;

    for (int k = 0; k < 8; k++) {
      int peerIdx = min(totalFish - 1, podStart + ((k * 8 + stride) & 63));
      if (peerIdx == idx) continue;
      ivec2 peerCoord = ivec2(peerIdx % uSimRes.x, peerIdx / uSimRes.x);
      vec3 pPeer = texelFetch(uPosTex, peerCoord, 0).xyz;
      vec3 vPeer = texelFetch(uVelTex, peerCoord, 0).xyz;
      vec3 diff = pos - pPeer;
      float d2 = dot(diff, diff);
      if (d2 > 1e-6 && d2 < 0.22) sepForce += diff * inversesqrt(d2);
      if (d2 < 4.5) {
        float w = 1.0 / (1.0 + d2 * 0.45);
        alignSum += vPeer * w;
        cohSum += pPeer * w;
        nw += w;
      }
    }

    vec3 accel = sepForce * 2.8 + curlNoise(pos * 0.30 + vec3(0.0, uTime * 0.16, uTime * 0.12)) * 1.25;
    if (nw > 0.01) {
      accel += ((alignSum / nw) - vel) * 1.15 + ((cohSum / nw) - pos) * 0.65;
    }

    if (uMode == 5) {
      // 6 small peaceful tropical reef shoals hovering near the left/right coral heads!
      int shoalId = (idx / 64) % 6;
      const vec3 reefAnchors[6] = vec3[6](
        vec3(-5.8, -2.3, -3.2),
        vec3( 5.8, -2.2, -3.4),
        vec3(-4.6, -1.8, -5.8),
        vec3( 4.8, -1.7, -6.0),
        vec3(-2.4, -2.8, -6.4),
        vec3( 2.6, -2.7, -6.6)
      );
      float sh = float(shoalId);
      vec3 home = reefAnchors[shoalId] + vec3(
        sin(uTime * 0.45 + sh * 1.7) * 1.15,
        cos(uTime * 0.55 + sh * 2.3) * 0.45,
        sin(uTime * 0.38 + sh * 1.1) * 0.85
      );
      if (length(pos - home) > 6.5) {
        pos = home + vec3((seed - 0.5) * 1.4, (fract(seed * 7.1) - 0.5) * 0.8, (fract(seed * 13.3) - 0.5) * 1.2);
      }
      accel += (home - pos) * 1.65;
      if (pos.y < -3.85) accel.y += (-3.85 - pos.y) * 8.0;
    } else {
      // uMode == 7: Celebratory golden/tropical reef halo swirling gracefully behind the winning 3D creatures!
      float hNorm = float(idx) / 8192.0;
      float ang = uTime * 1.85 + hNorm * TAU * 6.0;
      float rad = 4.6 + 1.8 * sin(uTime * 1.2 + seed * TAU);
      vec3 ringTarget = vec3(
        cos(ang) * rad,
        0.15 + sin(ang * 1.5 + seed * 3.0) * 2.6,
        -3.8 - 2.6 * fract(seed * 5.7) + sin(ang) * 1.2
      );
      if (length(pos - ringTarget) > 12.0) {
        pos = ringTarget;
      }
      accel += (ringTarget - pos) * 4.2;
    }

    vel += accel * uDt;
    vel *= exp(-0.62 * uDt);
    float spd = clamp(length(vel), 0.9, uMode == 7 ? 7.2 : 2.6);
    vel = safeNormalize(vel, vec3(1.0, 0.0, 0.0)) * spd;
    pos += vel * uDt;

    if (any(isnan(pos)) || any(isinf(pos))) {
      pos = vec3(-5.5, -2.2, -4.0);
      vel = vec3(1.2, 0.0, 0.0);
    }

    swimPhase = mod(swimPhase + (6.2 + spd * 3.0) * uDt, TAU);
    outPos = vec4(pos, swimPhase);
    outVel = vec4(vel, spd);
    return;
  }

  // =========================================================================
  // ORIGINAL SHOWCASE MODES (0..4): Gemini 4 Carbon 26s Choreography
  // =========================================================================
  float t = uSeqTime;
  float wBait    = 0.0;
  float wWings   = 0.0;
  float wStar    = 0.0;
  float wScatter = 0.0;
  float wReturn  = 0.0;

  if (uMode == 1) {
    wBait = 1.0;
  } else if (uMode == 2) {
    wWings = 1.0;
  } else if (uMode == 3) {
    wStar = 1.0;
  } else if (uMode == 4) {
    wBait = 0.15;
  } else {
    wBait = (1.0 - smoothstep(5.5, 7.1, t)) + smoothstep(25.0, 25.9, t);
    wBait = clamp(wBait, 0.0, 1.0);
    wWings = smoothstep(5.6, 7.2, t) * (1.0 - smoothstep(9.7, 11.2, t));
    wStar = smoothstep(9.9, 11.7, t) * (1.0 - smoothstep(15.7, 16.9, t));
    wScatter = smoothstep(15.8, 16.9, t) * (1.0 - smoothstep(24.6, 25.2, t));
    wReturn  = smoothstep(24.6, 25.3, t) * (1.0 - smoothstep(25.8, 26.0, t));
  }

  if (uMode == 0 && t > 24.65 && t < 24.82 && abs(pos.x) > 13.5) {
    float podAng = podNorm * TAU * 4.0;
    pos = vec3(
      cos(podAng) * 2.8 + (seed - 0.5) * 1.5,
      0.08 + sin(podAng * 1.7) * 1.3,
      -23.0 - seed * 3.5
    );
    vel = vec3(0.0, 0.0, 11.0);
  }

  int podSize = 64;
  int podStartIdx = (idx / podSize) * podSize;
  int localId = idx - podStartIdx;
  int strideOffset = (uFrame * 7 + localId) & 3;

  vec3 sepForce = vec3(0.0);
  vec3 alignSum = vec3(0.0);
  vec3 cohSum   = vec3(0.0);
  float neighborWeight = 0.0;

  float sepRadius = mix(0.46, 0.28, wStar);
  float sepRadius2 = sepRadius * sepRadius;

  for (int k = 0; k < 16; k++) {
    int peerLocal = (k * 4 + strideOffset) & 63;
    if (peerLocal == localId) continue;
    int peerIdx = podStartIdx + peerLocal;
    ivec2 peerCoord = ivec2(peerIdx % uSimRes.x, peerIdx / uSimRes.x);

    vec3 pPeer = texelFetch(uPosTex, peerCoord, 0).xyz;
    vec3 vPeer = texelFetch(uVelTex, peerCoord, 0).xyz;

    vec3 diff = pos - pPeer;
    float d2 = dot(diff, diff);

    if (d2 > 1e-6 && d2 < sepRadius2) {
      float invD = inversesqrt(d2);
      sepForce += diff * invD * (1.0 - sqrt(d2) / sepRadius);
    }
    if (d2 < 9.0) {
      float w = 1.0 / (1.0 + d2 * 0.35);
      alignSum += vPeer * w;
      cohSum += pPeer * w;
      neighborWeight += w;
    }
  }

  vec3 boidsAccel = sepForce * mix(4.6, 2.8, wStar);
  if (neighborWeight > 0.01) {
    vec3 avgVel = alignSum / neighborWeight;
    vec3 avgPos = cohSum / neighborWeight;
    float alignGain = mix(1.85, 0.55, wStar);
    float cohGain   = mix(1.35, 0.15, wStar) * (1.0 + 1.15 * wScatter);
    boidsAccel += (avgVel - vel) * alignGain;
    boidsAccel += (avgPos - pos) * cohGain;
  }

  vec3 curl = curlNoise(pos * 0.28 + vec3(0.0, uTime * 0.16, uTime * 0.11));
  float curlGain = mix(1.65, 0.32, wStar);
  if (uMode == 4) curlGain = 2.1;
  vec3 accel = boidsAccel + curl * curlGain;

  if (isAmbient < 0.5) {
    if (wBait > 0.001 || uMode == 4) {
      float baitStrength = (uMode == 4) ? 0.55 : wBait;
      vec3 center = vec3(
        sin(uTime * 0.42) * 0.28,
        0.08 + cos(uTime * 0.33) * 0.14,
        sin(uTime * 0.27) * 0.24
      );
      vec3 rel = pos - center;
      vec3 scaledRel = rel / vec3(3.45, 1.85, 2.85);
      float rNorm = length(scaledRel);

      float swirlDir = (mod(floor(podNorm * 32.0), 4.0) < 1.0) ? -1.0 : 1.0;
      vec3 swirlAxis = normalize(vec3(0.18 * sin(uTime * 0.3 + podNorm * 6.0), 1.0, 0.15 * cos(uTime * 0.25)));
      vec3 tang = safeNormalize(cross(swirlAxis, rel), vec3(1.0, 0.0, 0.0)) * swirlDir;

      float podPhase = podNorm * TAU * 3.0 + uTime * 0.85;
      vec3 podOrbit = center + vec3(
        cos(podPhase) * (1.0 + 1.95 * fract(podNorm * 7.3)),
        sin(podPhase * 1.3 + seed * 2.0) * 1.05,
        sin(podPhase) * (0.9 + 1.55 * fract(podNorm * 5.1))
      );

      vec3 pull = (podOrbit - pos) * 1.45;
      if (rNorm > 1.0) {
        pull -= scaledRel * (rNorm - 1.0) * 6.8;
      }
      accel += (tang * 3.1 + pull) * baitStrength;
    }

    if (wWings > 0.001) {
      float wingSide = (starHome.x >= 0.0) ? 1.0 : -1.0;
      float spanU = fract(podNorm * 13.7 + starHome.w * 0.5);
      float chordV = fract(seed * 7.13 + podNorm * 3.1) - 0.5;

      float wx = wingSide * (1.05 + spanU * 3.25);
      float wy = -0.15 + sin(spanU * PI) * 0.68 + chordV * (0.82 - 0.42 * spanU)
                 + 0.18 * sin(uTime * 1.6 - spanU * 2.6);
      float wz = -0.25 - spanU * 1.25 + chordV * 1.35;

      vec3 wingTarget = vec3(wx, wy, wz);
      vec3 wingFlow = vec3(
        wingSide * cos(uTime * 1.4 + spanU * 3.0) * 0.85,
        sin(uTime * 1.8 + spanU * 4.0) * 0.55,
        0.75
      );
      accel += ((wingTarget - pos) * 3.5 + (wingFlow - vel * 0.35) * 1.6) * wWings;
    }

    if (wStar > 0.001) {
      vec3 starOffset = vec3(
        sin(uTime * 0.45) * 0.05,
        cos(uTime * 0.55) * 0.05,
        sin(uTime * 0.35) * 0.06
      );
      vec3 targetPos = starHome.xyz + starOffset;

      vec3 starTang = evalStarTangent(starHome.xyz);
      float circSpeed = 1.25 + 0.45 * (1.0 - starHome.w);
      vec3 dynamicAnchor = targetPos + starTang * (sin(uTime * 1.65 + seed * TAU) * 0.19);

      vec3 toAnchor = dynamicAnchor - pos;
      vec3 desiredVel = starTang * circSpeed * (mod(floor(podNorm * 64.0), 2.0) < 0.5 ? 1.0 : -1.0)
                        + toAnchor * 4.2;

      accel += (toAnchor * 8.2 + (desiredVel - vel) * 3.8) * wStar;
    }

    if (wScatter > 0.001) {
      float side = (starHome.x >= 0.0) ? 1.0 : -1.0;
      if (abs(starHome.x) < 0.25) {
        side = (mod(floor(podNorm * 64.0), 2.0) < 0.5) ? -1.0 : 1.0;
      }
      float groupIdx = floor(podNorm * 40.0);
      float gHash1 = fract(sin(groupIdx * 12.9898) * 43758.5453);
      float gHash2 = fract(sin(groupIdx * 78.233) * 24634.6345);
      float gHash3 = fract(sin(groupIdx * 39.425) * 17351.9182);

      float scatterElapsed = max(0.0, t - 16.0 - gHash3 * 0.55);
      float speedBoost = 1.0 + smoothstep(20.2, 22.0, t) * 1.15;
      float targetSpeed = (2.15 + 1.05 * gHash1) * speedBoost;

      vec3 podDir = normalize(vec3(
        side * (0.95 + 0.35 * gHash1),
        (gHash2 - 0.50) * 0.48,
        -0.12 - 0.34 * gHash3
      ));
      vec3 podWave = vec3(
        0.0,
        sin(uTime * 1.5 + gHash1 * TAU) * 0.42,
        cos(uTime * 1.2 + gHash2 * TAU) * 0.35
      );
      vec3 desiredScatterVel = podDir * targetSpeed + podWave;
      float ramp = clamp(scatterElapsed * 1.2, 0.0, 1.0);
      accel += (desiredScatterVel - vel) * (3.4 * wScatter * ramp);
    }

    if (wReturn > 0.001) {
      float podAng = podNorm * TAU * 3.0;
      vec3 entryTarget = vec3(
        cos(podAng) * 2.2,
        0.08 + sin(podAng * 1.4) * 1.0,
        0.0
      );
      accel += (entryTarget - pos) * (4.8 * wReturn);
    }
  } else {
    float side = (starHome.x >= 0.0) ? 1.0 : -1.0;
    vec3 ambAnchor = starHome.xyz + vec3(
      sin(uTime * 0.32 + podNorm * 12.0) * 1.8,
      cos(uTime * 0.41 + podNorm * 9.0) * 0.65,
      sin(uTime * 0.27 + podNorm * 7.0) * 1.4
    );

    if (wScatter > 0.01) {
      vec3 outVel = vec3(side * 4.8, 0.15, -1.2);
      accel += (outVel - vel) * (2.8 * wScatter);
    } else if (wReturn > 0.01) {
      accel += (starHome.xyz - pos) * (2.5 * wReturn);
    } else {
      vec3 cruiseDir = normalize(vec3(-side * sin(uTime * 0.25 + podNorm * 5.0), 0.05, cos(uTime * 0.25 + podNorm * 5.0)));
      accel += (ambAnchor - pos) * 1.15 + cruiseDir * 1.4;
    }
  }

  if (uPointerWorld.w > 0.01) {
    vec3 toPtr = pos - uPointerWorld.xyz;
    float d2 = dot(toPtr, toPtr);
    if (d2 < 18.0 && d2 > 1e-5) {
      float falloff = exp(-d2 * 0.18) * uPointerWorld.w;
      vec3 pushDir = toPtr * inversesqrt(d2);
      vec3 swirlDir = safeNormalize(cross(vec3(0.0, 1.0, 0.0), pushDir), vec3(1.0, 0.0, 0.0));
      float ptrScale = mix(6.5, 2.2, wStar);
      accel += (pushDir * 0.65 + swirlDir * 0.85) * falloff * ptrScale;
    }
  }

  if (pos.y > 4.45) accel.y -= (pos.y - 4.45) * 9.0;
  if (pos.y < -4.0) accel.y += (-4.0 - pos.y) * 6.0;
  if (uMode == 4) {
    vec3 bounds = pos / vec3(11.0, 4.5, 9.0);
    if (length(bounds) > 1.0) accel -= bounds * 3.5;
  }

  vel += accel * uDt;
  vel *= exp(-0.65 * uDt);

  float maxSpd = mix(4.6, 5.8, max(wScatter, wReturn)) * (0.88 + 0.24 * scale);
  float minSpd = mix(1.25, 0.85, wStar);
  float spd = length(vel);
  vec3 dir = safeNormalize(vel, vec3(1.0, 0.0, 0.0));
  spd = clamp(spd, minSpd, maxSpd);
  vel = dir * spd;

  pos += vel * uDt;

  if (any(isnan(pos)) || any(isinf(pos))) {
    pos = starHome.xyz;
    vel = vec3(1.0, 0.0, 0.0);
    spd = 1.5;
  }

  float beatFreq = 6.5 + spd * 3.4;
  swimPhase = mod(swimPhase + beatFreq * uDt, TAU);
  smoothedSpeed = mix(smoothedSpeed, spd, clamp(uDt * 8.0, 0.0, 1.0));

  outPos = vec4(pos, swimPhase);
  outVel = vec4(vel, smoothedSpeed);
}
`,Qh=`#version 300 es
precision highp float;
precision highp sampler2D;

in vec2 vUv;

uniform mat4 uInvViewProj;
uniform mat4 uSunViewProj;
uniform sampler2D uSunShadowTex;
uniform sampler2D uAirSkyTex;
uniform int uAirSkyReady;
uniform vec2 uShadowTexelSize;
uniform vec3 uCamPos;
uniform vec3 uSunDir;
uniform float uTime;
uniform float uSolarFlash;

out vec4 outColor;

${wi}

const float SEABED_Y = -6.20;

float sampleSeabedShadow(vec3 worldPos) {
  vec4 lightClip = uSunViewProj * vec4(worldPos, 1.0);
  vec3 proj = lightClip.xyz / max(lightClip.w, 1e-6);
  vec2 uv = proj.xy * 0.5 + 0.5;
  float d = proj.z * 0.5 + 0.5;
  if (uv.x < 0.002 || uv.x > 0.998 || uv.y < 0.002 || uv.y > 0.998 || d > 1.0) {
    return 1.0;
  }
  float refD = d - 0.006;
  float c0 = (refD <= textureLod(uSunShadowTex, uv, 0.0).r) ? 1.0 : 0.0;
  float c1 = (refD <= textureLod(uSunShadowTex, clamp(uv + vec2(2.2, 0.7) * uShadowTexelSize, vec2(0.001), vec2(0.999)), 0.0).r) ? 1.0 : 0.0;
  float c2 = (refD <= textureLod(uSunShadowTex, clamp(uv + vec2(-2.2, -0.7) * uShadowTexelSize, vec2(0.001), vec2(0.999)), 0.0).r) ? 1.0 : 0.0;
  float lit = c0 + c1 + c2;
  if (lit == 0.0) return 0.28;
  if (lit == 3.0) return 1.0;
  lit += (refD <= textureLod(uSunShadowTex, clamp(uv + vec2(-0.7, 2.2) * uShadowTexelSize, vec2(0.001), vec2(0.999)), 0.0).r) ? 1.0 : 0.0;
  lit += (refD <= textureLod(uSunShadowTex, clamp(uv + vec2(0.7, -2.2) * uShadowTexelSize, vec2(0.001), vec2(0.999)), 0.0).r) ? 1.0 : 0.0;
  return mix(0.28, 1.0, lit * 0.2);
}

float evalLagoonFloorCaustic(vec2 xz, float time) {
  vec2 p1 = xz * 0.92 + vec2(time * 0.34, time * 0.21);
  vec2 p2 = xz * 1.65 - vec2(time * 0.26, -time * 0.38);
  float w1 = sin(p1.x * 2.5 + sin(p1.y * 2.8 + time * 0.6)) * cos(p1.y * 2.4 - sin(p1.x * 2.2));
  float w2 = sin(p2.x * 2.7 - cos(p2.y * 2.5 - time * 0.5)) * cos(p2.y * 2.6 + cos(p2.x * 2.3));
  float c = clamp(0.52 + 0.30 * w1 + 0.22 * w2, 0.0, 1.4);
  return pow(c, 3.4) * 1.45;
}

void main() {
  vec2 ndc = vUv * 2.0 - 1.0;
  vec4 farClip = uInvViewProj * vec4(ndc, 1.0, 1.0);
  vec3 worldFar = farClip.xyz / max(farClip.w, 1e-6);
  vec3 rayDir = normalize(worldFar - uCamPos);

  // === Above-Water Sky, Cumulonimbus, Sun/Moon Road & Bioluminescent Lagoon ===
  if (uCamPos.y > OCEAN_SURFACE_Y) {
    vec3 skySunDir = normalize(uTodSkySunDir.xyz);
    if (rayDir.y >= -0.0012) {
      outColor = vec4(evalAirPanoramaSky(rayDir, skySunDir, uTime, uAirSkyTex, uAirSkyReady, 0.0), 1.0);
      return;
    }

    float tSurf = (OCEAN_SURFACE_Y - uCamPos.y) / rayDir.y;
    vec3 surfPos = uCamPos + rayDir * tSurf;
    vec3 w = evalOceanSurfaceDist(surfPos.xz, uTime, tSurf);
    vec3 wN = normalize(vec3(-w.y * 0.80, 1.0, -w.z * 0.80));

    float cosV = clamp(dot(-rayDir, wN), 0.0, 1.0);
    float fresnel = 0.024 + 0.976 * pow(1.0 - cosV, 5.0);
    vec3 reflDir = reflect(rayDir, wN);
    reflDir.y = max(reflDir.y, 0.012);
    vec3 reflSky = evalAirPanoramaSky(normalize(reflDir), skySunDir, uTime, uAirSkyTex, uAirSkyReady, 1.5);

    float wExp = clamp(uTodCloudTint.w, 0.10, 1.15);
    vec2 northRel = vec2(surfPos.x, surfPos.z - 36.0);
    float d2Island = min(dot(surfPos.xz, surfPos.xz), dot(northRel, northRel) * 0.72);
    float reefProximity = exp(-d2Island * 0.00052);
    vec3 lagoonBody = mix(vec3(0.0045, 0.092, 0.34), vec3(0.024, 0.48, 0.64), reefProximity) * wExp;

    // Sun Road (sunrise/day/sunset) OR Silver Moon Road (night/midnight) shimmering across ocean waves!
    float diskPow = clamp(uTodSkyZenith.w, 0.0, 1.2);
    bool isMoon = (uTodSkyHorizon.w > 0.55);
    vec3 glintDir = normalize(vec3(skySunDir.x, max(skySunDir.y, 0.045), skySunDir.z));
    vec3 H = normalize(glintDir - rayDir);
    float specSharp = pow(max(dot(wN, H), 0.0), isMoon ? 140.0 : 210.0) * (isMoon ? 3.2 : 5.8);
    float specRoad  = pow(max(dot(wN, H), 0.0), isMoon ? 22.0 : 26.0) * (isMoon ? 0.38 : 0.42);
    vec3 glintTint  = isMoon
      ? vec3(0.72, 0.86, 1.08)
      : mix(uTodSunColor.rgb * 1.15, vec3(1.10, 1.03, 0.90), uTodSkySunDir.w);

    vec3 seaCol = mix(lagoonBody, reflSky, clamp(fresnel, 0.0, 0.93))
                + glintTint * (specSharp + specRoad) * diskPow;

    // Shimmering nearshore reflection of Beach Kagaribi Torches, CHURA BAR & North ZEN Campus lights at dusk/night!
    if (uTodSunColor.w > 0.02 && tSurf < 75.0) {
      float shoreBand = (exp(-pow((surfPos.z - 16.5) * 0.16, 2.0)) + 0.55 * exp(-pow((surfPos.z - 62.5) * 0.16, 2.0)))
                      * exp(-pow(surfPos.x * 0.055, 2.0));
      float waveSpark = smoothstep(0.06, 0.32, length(w.yz));
      seaCol += vec3(1.15, 0.52, 0.14) * shoreBand * (0.08 + 0.34 * waveSpark) * uTodSunColor.w;
    }

    // Magical Okinawa Night/Midnight Sea-Firefly Bioluminescence ('夜光虫 / 海ほたる') on ruffled wave crests!
    if (uTodAmbient.w > 0.04 && tSurf < 75.0) {
      float bioCrest = smoothstep(0.14, 0.42, length(w.yz)) * (0.5 + 0.5 * sin(surfPos.x * 1.7 + surfPos.z * 2.1 + uTime * 2.4));
      float nearShore = smoothstep(70.0, 8.0, tSurf);
      seaCol += vec3(0.04, 0.58, 0.96) * bioCrest * nearShore * uTodAmbient.w * 0.48;
    }

    vec3 horizSky = evalAirPanoramaSky(normalize(vec3(rayDir.x, 0.004, rayDir.z)), skySunDir, uTime, uAirSkyTex, uAirSkyReady, 0.0);
    seaCol = mix(seaCol, horizSky, smoothstep(135.0, 340.0, tSurf));

    outColor = vec4(seaCol, 1.0);
    return;
  }

  vec3 waterCol = evalOceanAmbient(rayDir, uCamPos.y + rayDir.y * 12.0);

  if (rayDir.y > 0.018) {
    waterCol = evalUnderwaterToAirSurface(uCamPos, rayDir, uSunDir, uTime, uSolarFlash, false, vec3(0.0));
  } else if (rayDir.y < -0.008) {
    // === Sunlit Tropical White-Coral-Sand Seabed with Dancing Caustics & Real Creature Shadows! ===
    float tFloor = (SEABED_Y - uCamPos.y) / rayDir.y;
    if (tFloor > 0.0 && tFloor < 72.0) {
      vec3 floorPos = uCamPos + rayDir * tFloor;

      // Current-sculpted coral sand ripples + natural reef dune undulation
      float warp = sin(floorPos.z * 0.55) * 0.9 + noise2D(floorPos.xz * 0.35) * 1.4;
      float ripPhase = floorPos.x * 2.6 + warp;
      float ripGradX = cos(ripPhase) * 2.6 * 0.055;
      float ripGradZ = cos(ripPhase) * cos(floorPos.z * 0.55) * 0.50 * 0.055;
      vec3 sandN = normalize(vec3(-ripGradX, 1.0, -ripGradZ));

      float fineGrain = noise2D(floorPos.xz * 4.5);
      vec3 sandAlbedo = mix(vec3(0.46, 0.45, 0.39), vec3(0.62, 0.59, 0.50), fineGrain);

      float shadow = sampleSeabedShadow(floorPos);
      float caustic = evalLagoonFloorCaustic(floorPos.xz, uTime) * (1.0 + uSolarFlash * 0.9);
      float NdotL = max(dot(sandN, uSunDir), 0.0);

      float wExp = clamp(uTodCloudTint.w, 0.12, 1.15);
      vec3 skyFill = vec3(0.055, 0.205, 0.275) * wExp;
      vec3 directSun = mix(uTodSunColor.rgb, vec3(0.96, 1.0, 0.95), 0.55) * wExp * NdotL * (0.48 + 1.35 * caustic * wExp) * shadow;
      vec3 litSand = sandAlbedo * (skyFill + directSun);

      // Beer-Lambert turquoise lagoon absorption into the distant coral drop-off
      vec3 sigmaFloor = vec3(0.088, 0.034, 0.022);
      vec3 trans = exp(-sigmaFloor * tFloor);
      vec3 fogCol = evalOceanAmbient(rayDir, SEABED_Y);
      float horizonFade = smoothstep(70.0, 12.0, tFloor);

      vec3 floorFinal = litSand * trans + fogCol * (1.0 - exp(-0.040 * tFloor));
      waterCol = mix(waterCol, floorFinal, horizonFade);
    }
  }

  outColor = vec4(waterCol, 1.0);
}
`,Jh=`#version 300 es
precision highp float;
precision highp sampler2D;

layout(location = 0) in vec3 aPosition;
layout(location = 2) in vec3 aBodyCoord;

uniform sampler2D uPosTex;
uniform sampler2D uVelTex;
uniform sampler2D uMetaTex;
uniform ivec2 uSimRes;
uniform mat4 uSunViewProj;
uniform float uFishSizeScale;

vec3 safeNorm(vec3 v) {
  float l2 = dot(v, v);
  return l2 > 1e-8 ? v * inversesqrt(l2) : vec3(0.0, 0.0, 1.0);
}

void main() {
  ivec2 coord = ivec2(gl_InstanceID % uSimRes.x, gl_InstanceID / uSimRes.x);
  vec4 posState = texelFetch(uPosTex, coord, 0);
  vec4 velState = texelFetch(uVelTex, coord, 0);
  vec4 meta     = texelFetch(uMetaTex, coord, 0);

  vec3 fishCenter = posState.xyz;
  float swimPhase = posState.w;
  vec3 forward    = safeNorm(velState.xyz);

  vec3 worldUp = abs(forward.y) > 0.94 ? vec3(1.0, 0.0, 0.0) : vec3(0.0, 1.0, 0.0);
  vec3 right   = safeNorm(cross(worldUp, forward));
  vec3 up      = cross(forward, right);

  float fishLen = 0.215 * meta.z * max(uFishSizeScale, 0.5);
  float axialT  = aBodyCoord.x;
  float sway    = sin(swimPhase - axialT * 4.4) * (0.085 * axialT * axialT);

  vec3 localPos = aPosition;
  localPos.x += sway;
  localPos *= fishLen;

  vec3 worldPos = fishCenter + right * localPos.x + up * localPos.y + forward * localPos.z;
  gl_Position = uSunViewProj * vec4(worldPos, 1.0);
}
`,e0=`#version 300 es
precision highp float;
void main() {
  // Depth-only pass
}
`,t0=`#version 300 es
precision highp float;
precision highp sampler2D;

layout(location = 0) in vec3 aPosition;
layout(location = 1) in vec3 aNormal;
layout(location = 2) in vec3 aBodyCoord; // x=axialT, y=dorsalSin, z=finMask

uniform sampler2D uPosTex;
uniform sampler2D uVelTex;
uniform sampler2D uMetaTex;
uniform ivec2 uSimRes;
uniform mat4 uViewProj;
uniform float uFishSizeScale;

out vec3 vWorldPos;
out vec3 vWorldNormal;
out vec3 vFishForward;
out vec3 vFishUp;
out vec3 vBodyCoord;
out float vSeed;
out float vSpeed;

vec3 safeNorm(vec3 v) {
  float l2 = dot(v, v);
  return l2 > 1e-8 ? v * inversesqrt(l2) : vec3(0.0, 0.0, 1.0);
}

void main() {
  ivec2 coord = ivec2(gl_InstanceID % uSimRes.x, gl_InstanceID / uSimRes.x);
  vec4 posState = texelFetch(uPosTex, coord, 0);
  vec4 velState = texelFetch(uVelTex, coord, 0);
  vec4 meta     = texelFetch(uMetaTex, coord, 0);

  vec3 fishCenter = posState.xyz;
  float swimPhase = posState.w;
  vec3 vel        = velState.xyz;
  float speed     = velState.w;

  vec3 forward = safeNorm(vel);
  vec3 refUp   = abs(forward.y) > 0.95 ? vec3(1.0, 0.0, 0.0) : vec3(0.0, 1.0, 0.0);
  vec3 right   = safeNorm(cross(refUp, forward));
  vec3 up      = cross(forward, right);

  float bankAngle = clamp(-vel.x * 0.055 * (1.0 - abs(forward.y)), -0.38, 0.38);
  float cb = cos(bankAngle);
  float sb = sin(bankAngle);
  vec3 bankedRight = right * cb + up * sb;
  vec3 bankedUp    = -right * sb + up * cb;

  float axialT = aBodyCoord.x;
  float waveArg = swimPhase - axialT * 4.5;
  float amp = (0.055 + 0.022 * clamp(speed * 0.25, 0.0, 1.5)) * axialT * axialT;
  float sway = sin(waveArg) * amp;
  float dSwayDz = cos(waveArg) * 4.5 * amp;

  float fishLen = 0.215 * meta.z * max(uFishSizeScale, 0.5);
  vec3 localPos = aPosition;
  localPos.x += sway;
  localPos *= fishLen;

  vec3 localNorm = aNormal;
  localNorm.x -= dSwayDz * localNorm.z * 0.45;
  localNorm = safeNorm(localNorm);

  vWorldPos = fishCenter + bankedRight * localPos.x + bankedUp * localPos.y + forward * localPos.z;
  vWorldNormal = safeNorm(bankedRight * localNorm.x + bankedUp * localNorm.y + forward * localNorm.z);
  vFishForward = forward;
  vFishUp = bankedUp;
  vBodyCoord = aBodyCoord;
  vSeed = meta.w;
  vSpeed = speed;

  gl_Position = uViewProj * vec4(vWorldPos, 1.0);
}
`,i0=`#version 300 es
precision highp float;
precision highp sampler2D;
precision highp sampler2DArray;

in vec3 vWorldPos;
in vec3 vWorldNormal;
in vec3 vFishForward;
in vec3 vFishUp;
in vec3 vBodyCoord; // x=axialT (0=nose..1=tail), y=dorsalSin (-1..1), z=finMask (0=body, 1=fin)
in float vSeed;
in float vSpeed;

uniform vec3 uCamPos;
uniform vec3 uSunDir;
uniform float uTime;
uniform mat4 uSunViewProj;
uniform sampler2D uSunShadowTex;
uniform vec2 uShadowTexelSize;
uniform int uFishTheme; // 0=Silver Pelagic, 1=Anthias Gyogun, 2=Crimson Gyogun, 3=Clownfish, 4=Iridescent Super Gyogun, 5=Reef Damselfish
uniform sampler2DArray uPbrAlbedoTex;
uniform sampler2DArray uPbrNormalTex;
uniform int uPbrReady;

out vec4 outColor;

${wi}

float sampleOverheadShadow(vec3 worldPos) {
  vec4 lightClip = uSunViewProj * vec4(worldPos, 1.0);
  vec3 proj = lightClip.xyz / max(lightClip.w, 1e-6);
  vec2 uv = proj.xy * 0.5 + 0.5;
  float currentDepth = proj.z * 0.5 + 0.5;

  if (uv.x < 0.0 || uv.x > 1.0 || uv.y < 0.0 || uv.y > 1.0 || currentDepth > 1.0) {
    return 1.0;
  }

  const vec2 offsets[5] = vec2[5](
    vec2(0.0, 0.0),
    vec2(1.35, 0.40),
    vec2(-1.35, -0.40),
    vec2(-0.40, 1.35),
    vec2(0.40, -1.35)
  );
  float bias = 0.0042;
  float lit = 0.0;
  for (int i = 0; i < 5; i++) {
    vec2 sampleUv = clamp(uv + offsets[i] * uShadowTexelSize, vec2(0.001), vec2(0.999));
    float closestDepth = texture(uSunShadowTex, sampleUv).r;
    lit += (currentDepth - bias <= closestDepth) ? 1.0 : 0.0;
  }
  return mix(0.16, 1.0, lit * 0.2);
}

void main() {
  // Keep GPU reef fish below the ocean surface and out of the shallow shoreline sandbar!
  if (vWorldPos.y > OCEAN_SURFACE_Y - 0.18 || vWorldPos.z > 15.8) discard;

  vec3 N = normalize(vWorldNormal);
  vec3 toCam = uCamPos - vWorldPos;
  float dist = length(toCam);
  vec3 V = toCam / max(dist, 1e-5);

  float axialT = clamp(vBodyCoord.x, 0.0, 1.0);
  float dorsal = clamp(vBodyCoord.y, -1.0, 1.0);
  float isFin  = vBodyCoord.z;
  float flankFactor = sqrt(clamp(1.0 - dorsal * dorsal, 0.0, 1.0));
  float NdotV = max(dot(N, V), 0.0);
  float fresnel = pow(1.0 - NdotV, 3.2);

  vec3 baseAlbedo;
  vec3 specTint = vec3(0.86, 0.99, 1.06);
  vec3 bioShimmer = vec3(0.0);
  float specBoost = 1.0;

  if (uFishTheme == 1) {
    // === 王道・海物語 ハナダイ大魚群 (Photorealistic Sunlit Royal Anthias: Amethyst-Magenta & Gleaming Gold) ===
    vec3 deepIndigoViolet = vec3(0.065, 0.012, 0.28);
    vec3 iridescentCoral  = mix(vec3(0.88, 0.09, 0.58), vec3(0.42, 0.10, 0.92), NdotV * 0.62);
    vec3 metallicGold     = vec3(1.08, 0.78, 0.10);

    vec3 bodyCol = dorsal >= 0.0
      ? mix(iridescentCoral, deepIndigoViolet, pow(dorsal, 0.78))
      : mix(iridescentCoral, vec3(0.24, 0.05, 0.22), pow(-dorsal, 0.92));

    float stripe = smoothstep(0.42, 0.80, sin((axialT - dorsal * 0.09) * 24.0 + vSeed * 1.4))
                 * (1.0 - smoothstep(0.74, 0.92, axialT));
    bodyCol = mix(bodyCol, metallicGold, stripe * 0.78);
    baseAlbedo = mix(bodyCol, metallicGold * 1.05, isFin * 0.84);
    specTint = mix(vec3(1.02, 0.84, 1.14), vec3(1.18, 0.94, 0.46), stripe + isFin * 0.65);
    specBoost = 1.45;
    bioShimmer = mix(vec3(0.38, 0.06, 0.48), metallicGold, stripe * 0.6 + isFin * 0.7) * (0.24 + isFin * 0.28 + fresnel * 0.18);

  } else if (uFishTheme == 2) {
    // === 紅蓮・赤魚群 (Photorealistic Deep-Sea Crimson Anthias & Molten Amber Fins) ===
    vec3 darkGarnet  = vec3(0.08, 0.005, 0.012);
    vec3 rubyFlank   = vec3(0.78, 0.045, 0.065);
    vec3 amberGold   = vec3(0.98, 0.58, 0.08);

    vec3 bodyCol = dorsal >= 0.0
      ? mix(rubyFlank, darkGarnet, pow(dorsal, 0.8))
      : mix(rubyFlank, vec3(0.16, 0.02, 0.03), pow(-dorsal, 0.9));
    float stripe = smoothstep(0.52, 0.86, sin(axialT * 22.0));
    bodyCol = mix(bodyCol, amberGold, stripe * 0.52);
    baseAlbedo = mix(bodyCol, amberGold, isFin * 0.76);
    specTint = vec3(1.12, 0.84, 0.52);
    specBoost = 1.38;
    bioShimmer = vec3(0.55, 0.12, 0.05) * (isFin * 0.24 + fresnel * 0.12);

  } else if (uFishTheme == 3) {
    // === クマノミ大魚群 (Photorealistic 3D Underwater Amphiprion Clownfish) ===
    vec3 reefOrange = vec3(0.88, 0.22, 0.018);
    vec3 ivoryBand  = vec3(0.92, 0.95, 0.98);
    vec3 obsidian   = vec3(0.008, 0.010, 0.014);

    float warp = sin(dorsal * 2.1) * 0.025;
    float d1 = abs(axialT + warp - 0.22);
    float d2 = abs(axialT - warp * 1.3 - 0.50);
    float d3 = abs(axialT + warp * 0.5 - 0.77);
    float bandDist = min(min(d1, d2 * 0.92), d3 * 1.15);

    float whiteMask = 1.0 - smoothstep(0.040, 0.055, bandDist);
    float blackTrim = smoothstep(0.034, 0.046, bandDist) * (1.0 - smoothstep(0.056, 0.074, bandDist));
    float finBlack  = isFin * smoothstep(0.54, 0.90, abs(dorsal) + axialT * 0.25);

    vec3 bodyCol = mix(reefOrange, reefOrange * 0.42, max(dorsal, 0.0) * 0.55);
    bodyCol = mix(bodyCol, obsidian, clamp(blackTrim + finBlack, 0.0, 1.0));
    bodyCol = mix(bodyCol, ivoryBand, whiteMask * (1.0 - isFin));
    baseAlbedo = bodyCol;
    specBoost = 1.18;
    bioShimmer = reefOrange * (isFin * 0.16);

  } else if (uFishTheme == 4) {
    // === 逆流・プリズム超魚群 (Structural Thin-Film Mother-of-Pearl Iridescence) ===
    float filmAngle = (1.0 - NdotV) * 5.2 + axialT * 3.4 - uTime * 2.6 + vSeed * 6.283;
    vec3 nacre = 0.52 + 0.46 * cos(filmAngle + vec3(0.0, 1.95, 3.90));
    vec3 pearlFlank = mix(vec3(0.45, 0.78, 0.92), nacre, 0.72);
    baseAlbedo = dorsal >= 0.0
      ? mix(pearlFlank, pearlFlank * 0.22, pow(dorsal, 0.85))
      : mix(pearlFlank, pearlFlank * 0.35, pow(-dorsal, 0.9));
    specTint = mix(vec3(0.95, 1.0, 1.05), nacre * 1.3, 0.55);
    specBoost = 1.55;
    bioShimmer = nacre * (0.18 + 0.32 * fresnel);

  } else if (uFishTheme == 5) {
    // === 沖縄サンゴ礁：グルクン（タカサゴ）・デバスズメダイ・アカネハナゴイ ===
    if (vSeed < 0.48) {
      // Okinawa Gurukun (タカサゴ: electric turquoise-blue + twin yellow lateral stripes + red tail fin!)
      vec3 guruBack = vec3(0.03, 0.46, 0.82);
      vec3 guruBelly = vec3(0.55, 0.88, 0.96);
      vec3 body = mix(guruBelly, guruBack, clamp(dorsal * 0.65 + 0.45, 0.0, 1.0));
      float stripe1 = exp(-pow((dorsal - 0.34) / 0.13, 2.0));
      float stripe2 = exp(-pow((dorsal + 0.04) / 0.11, 2.0));
      body = mix(body, vec3(1.05, 0.86, 0.10), clamp(stripe1 + stripe2, 0.0, 1.0) * 0.88);
      float redTail = smoothstep(0.76, 0.94, axialT);
      baseAlbedo = mix(body, vec3(0.95, 0.12, 0.16), redTail * 0.85);
      specBoost = 1.38;
    } else if (vSeed < 0.80) {
      // Blue-green Chromis (デバスズメダイ)
      baseAlbedo = mix(vec3(0.08, 0.82, 0.90), vec3(0.72, 0.98, 1.0), clamp(-dorsal * 0.6 + 0.3, 0.0, 1.0));
      specBoost = 1.32;
    } else {
      // Okinawa Anthias (アカネハナゴイ)
      baseAlbedo = mix(vec3(0.96, 0.36, 0.18), vec3(0.98, 0.78, 0.24), axialT);
      specBoost = 1.25;
    }

  } else {
    // === Wild Ocean Pelagic Countershading ===
    vec3 backAlbedo  = vec3(0.008, 0.048, 0.085);
    vec3 flankAlbedo = vec3(0.42, 0.68, 0.80);
    vec3 bellyAlbedo = vec3(0.015, 0.055, 0.090);

    baseAlbedo = dorsal >= 0.0
      ? mix(flankAlbedo, backAlbedo, pow(dorsal, 0.85))
      : mix(flankAlbedo, bellyAlbedo, pow(-dorsal, 0.95));
    baseAlbedo = mix(baseAlbedo, vec3(0.05, 0.18, 0.28), isFin * 0.5);
  }

  float shadowVis = sampleOverheadShadow(vWorldPos);
  float caustic = evalSunShaftCaustic(vWorldPos, uTime, uSunDir);

  // === Photorealistic Imbricated Teleost Scales (Nano Banana Layer 20), Anatomical Eye, Gill Seam & Fin Rays! ===
  float scaleAo = 1.0;
  float eyeSpec = 0.0;
  if (isFin < 0.5) {
    if (uPbrReady == 1 && axialT > 0.18) {
      vec2 scUv = vec2((1.0 - axialT) * 2.95, dorsal * 1.18 + vSeed * 0.37);
      vec4 scAlb = texture(uPbrAlbedoTex, vec3(scUv, 20.0));
      vec4 scNor = texture(uPbrNormalTex, vec3(scUv, 20.0));
      float scaleMask = smoothstep(0.18, 0.25, axialT) * (0.45 + 0.55 * flankFactor);
      float scSheen = clamp(dot(pow(scAlb.rgb, vec3(2.2)), vec3(0.333)) * 1.58, 0.65, 1.34);
      baseAlbedo *= mix(1.0, scSheen, scaleMask * 0.85);
      scaleAo = mix(1.0, mix(0.58, 1.0, scNor.a), scaleMask);
      vec2 tN = (scNor.xy * 2.0 - 1.0) * 0.92 * scaleMask;
      N = normalize(N - vFishForward * tN.x + vFishUp * tN.y);
    }
    // Curved gill operculum crease at posterior head edge (axialT ~ 0.21)
    float gillSeam = exp(-pow((axialT - 0.205 + dorsal * dorsal * 0.035) / 0.014, 2.0)) * flankFactor * (1.0 - max(0.0, dorsal - 0.55));
    baseAlbedo *= (1.0 - gillSeam * 0.45);
    scaleAo *= (1.0 - gillSeam * 0.35);

    // Glossy lateral fish eye (iris ring + obsidian pupil + wet corneal glint)
    float eDx = (axialT - 0.105) / 0.036;
    float eDy = (dorsal - 0.16) / 0.24;
    float eR = length(vec2(eDx, eDy));
    if (eR < 1.0 && flankFactor > 0.35) {
      float pupil = 1.0 - smoothstep(0.48, 0.64, eR);
      float iris  = 1.0 - smoothstep(0.84, 1.0, eR);
      vec3 irisCol = (uFishTheme == 3) ? vec3(0.95, 0.36, 0.05) : vec3(0.76, 0.88, 0.96);
      vec3 eyeCol = mix(irisCol, vec3(0.005, 0.008, 0.014), pupil);
      baseAlbedo = mix(baseAlbedo, eyeCol, iris);
      eyeSpec = iris * 2.4;
    }
  } else {
    // Delicate translucent fin-ray striations
    float ray = 0.82 + 0.18 * sin((axialT * 18.0 + dorsal * 14.0) * 6.283);
    baseAlbedo *= ray;
    N = normalize(N + vFishUp * cos((axialT * 18.0 + dorsal * 14.0) * 6.283) * 0.22);
  }

  float wExp = clamp(uTodCloudTint.w, 0.14, 1.15);
  float sunIrradiance = shadowVis * (0.52 * wExp + 1.85 * caustic * wExp);
  float wrapL = clamp((dot(N, uSunDir) + 0.25) / 1.25, 0.0, 1.0);

  vec3 H = normalize(uSunDir + V);
  float NdotH = max(dot(N, H), 0.0);
  float specSharp = pow(NdotH, 76.0) * (0.65 + 1.30 * flankFactor + eyeSpec) * specBoost;
  float specBroad = pow(NdotH, 13.0) * 0.36 * flankFactor * specBoost;

  float skyUp = clamp(N.y * 0.5 + 0.5, 0.0, 1.0);
  vec3 skyIrradiance = mix(vec3(0.012, 0.045, 0.075), vec3(0.055, 0.220, 0.310), skyUp * skyUp) * wExp;
  vec3 nightBio = vec3(0.04, 0.56, 0.95) * fresnel * uTodAmbient.w * 0.42;

  vec3 litFish = baseAlbedo * scaleAo * (skyIrradiance * (0.38 + 0.62 * shadowVis) + specTint * wrapL * 0.72 * sunIrradiance)
               + specTint * (specSharp * 3.1 + specBroad * 0.92) * sunIrradiance
               + vec3(0.24, 0.72, 0.92) * fresnel * max(N.y + 0.2, 0.0) * 0.48 * shadowVis * wExp
               + bioShimmer * (0.45 + 0.55 * caustic + uTodAmbient.w * 0.85)
               + nightBio;

  litFish *= 0.88 + 0.24 * vSeed;

  vec3 viewRay = -V;
  float waterDist = dist;
  if (uCamPos.y > OCEAN_SURFACE_Y && viewRay.y < -0.005) {
    float tAir = max(0.0, (OCEAN_SURFACE_Y - uCamPos.y) / viewRay.y);
    waterDist = max(0.0, dist - tAir);
  }
  float fogDist = max(waterDist - 3.2, 0.0);
  vec3 sigmaExt = (uFishTheme >= 1 && uFishTheme <= 4)
    ? vec3(0.042, 0.020, 0.014)
    : vec3(0.065, 0.026, 0.018);
  vec3 trans = exp(-sigmaExt * fogDist);
  vec3 fogColor = (uCamPos.y > OCEAN_SURFACE_Y)
    ? vec3(0.03, 0.48, 0.62) * wExp
    : evalOceanAmbient(viewRay, vWorldPos.y);
  float fogMix = 1.0 - exp(-0.028 * fogDist);

  vec3 finalRgb = litFish * trans + fogColor * fogMix;
  outColor = vec4(finalRgb, 1.0);
}
`,fr=`
const float TAU = 6.28318530718;

vec3 evalMascotWorldPos(
  vec3 localPos,
  vec2 uv,
  int slotId,
  vec4 slotData,
  float rowVx,
  float bubbleUpdraft,
  float shockwave,
  float time,
  out vec3 outNormal,
  out int outSpeciesZeroBased,
  out float outSlotGlow,
  out float outPeriph
) {
  int packed = int(slotData.z + 0.5);
  outSpeciesZeroBased = clamp(packed & 15, 0, 8);
  outSlotGlow = slotData.w;

  float slotSeed = fract(float(slotId) * 0.173 + float(outSpeciesZeroBased) * 0.091);
  float animSpd = 1.0 + clamp(abs(rowVx) * 0.035, 0.0, 0.45) + outSlotGlow * 0.45;
  float t = time * animSpd + slotSeed * TAU;

  vec3 p = localPos;

  // Adorable gentle 3D plush swimming squish + tail/tentacle current wiggle!
  // Keep bottom-right jewel number zone (uv.x > 0.62 && uv.y > 0.62) crisp with damped wave
  float numberGuard = 1.0 - smoothstep(0.55, 0.78, uv.x) * smoothstep(0.55, 0.78, uv.y) * 0.75;
  float swimWave = sin(t * 3.4 - p.x * 2.4 - p.y * 0.8) * 0.052 * numberGuard;
  float squish = 0.026 * sin(t * 2.7) * numberGuard;
  p.x *= (1.0 + squish);
  p.y *= (1.0 - squish);
  p.y += swimWave * 0.55;
  p.z += swimWave * 0.85;

  // Gentle 3D tilt into current & playful wobble on Reach / Jackpot
  float tiltZ = sin(t * 1.8) * 0.042 + clamp(-rowVx * 0.008, -0.09, 0.09);
  float tiltY = cos(t * 1.45) * 0.10 + outSlotGlow * sin(time * 5.2) * 0.14;
  float cz = cos(tiltZ), sz = sin(tiltZ);
  float cy = cos(tiltY), sy = sin(tiltY);

  vec3 pr = vec3(p.x * cz - p.y * sz, p.x * sz + p.y * cz, p.z);
  vec3 py = vec3(pr.x * cy + pr.z * sy, pr.y, -pr.x * sy + pr.z * cy);

  vec2 dNorm = clamp(localPos.xy * 0.55, vec2(-0.85), vec2(0.85));
  vec3 restN = normalize(vec3(dNorm.x, dNorm.y, 1.15));
  outNormal = normalize(vec3(restN.x * cy + restN.z * sy, restN.y, -restN.x * sy + restN.z * cy));

  // Peripheral slots recede smoothly into the turquoise coral lagoon
  outPeriph = smoothstep(2.65, 7.5, abs(slotData.x));
  float scale = (1.0 - 0.16 * outPeriph)
              * (outSlotGlow > 0.8 ? (1.15 + 0.05 * sin(time * 6.4)) : (outSlotGlow > 0.3 ? 1.05 : 1.0));
  float baseZ = 0.42 + (outSlotGlow > 0.8 ? 0.65 : (outSlotGlow > 0.3 ? 0.18 : 0.0)) - outPeriph * 2.6;

  vec3 bob = vec3(
    0.0,
    sin(time * 2.0 + slotSeed * TAU) * 0.065 + (outSlotGlow > 0.8 ? abs(sin(time * 5.0)) * 0.14 : 0.0),
    cos(time * 1.5 + slotSeed * TAU) * 0.04
  );

  // Rising 泡予告 bubbles gently lift nearby mascots in the water column
  if (bubbleUpdraft > 0.01) {
    float col = exp(-slotData.x * slotData.x * 0.14);
    bob.y += col * bubbleUpdraft * (0.10 + 0.05 * sin(time * 7.5 + slotSeed * TAU));
  }

  // Subtle PUSH acoustic pressure ripple
  if (shockwave > 0.01 && shockwave < 1.2) {
    vec2 d = slotData.xy - vec2(0.0, -3.2);
    float r = length(d);
    float ring = exp(-pow(r - shockwave * 11.5, 2.0) * 1.6) * (1.0 - shockwave / 1.2);
    bob.xy += normalize(d + vec2(0.0, 0.01)) * (ring * 0.14);
  }

  return vec3(slotData.xy, baseZ) + bob + py * scale;
}
`,s0=`#version 300 es
precision highp float;

layout(location = 0) in vec3 aPos;
layout(location = 1) in vec2 aUv;

uniform mat4 uSunViewProj;
uniform vec4 uReelSlots[15];
uniform vec3 uRowVelX;
uniform float uBubbleUpdraft;
uniform float uShockwave;
uniform float uTime;

out vec2 vUv;
flat out int vLayer;
out float vVisible;

${fr}

void main() {
  int slotId = gl_InstanceID;
  vec4 slotData = uReelSlots[slotId];
  if (abs(slotData.x) > 9.1) {
    vVisible = 0.0;
    vUv = aUv;
    vLayer = 0;
    gl_Position = vec4(2.0, 2.0, 2.0, 1.0);
    return;
  }

  int rowId = slotId / 5;
  float rowVx = (rowId == 0) ? uRowVelX.x : ((rowId == 1) ? uRowVelX.y : uRowVelX.z);
  vec3 worldNor;
  int speciesZeroBased;
  float slotGlow;
  float periph;
  vec3 worldPos = evalMascotWorldPos(
    aPos, aUv, slotId, slotData, rowVx, uBubbleUpdraft, uShockwave, uTime,
    worldNor, speciesZeroBased, slotGlow, periph
  );

  vVisible = 1.0;
  vUv = aUv;
  vLayer = speciesZeroBased;
  gl_Position = uSunViewProj * vec4(worldPos, 1.0);
}
`,a0=`#version 300 es
precision highp float;
precision highp sampler2DArray;

in vec2 vUv;
flat in int vLayer;
in float vVisible;

uniform sampler2DArray uMascotArrayTex;

void main() {
  if (vVisible < 0.5) discard;
  float alpha = texture(uMascotArrayTex, vec3(vUv, float(vLayer))).a;
  if (alpha < 0.42) discard;
}
`,o0=`#version 300 es
precision highp float;

layout(location = 0) in vec3 aPos;
layout(location = 1) in vec2 aUv;

uniform mat4 uViewProj;
uniform vec4 uReelSlots[15];
uniform vec3 uRowVelX;
uniform float uBubbleUpdraft;
uniform float uShockwave;
uniform float uTime;

out vec3 vWorldPos;
out vec3 vWorldNormal;
out vec2 vUv;
flat out int vLayer;
out float vSlotGlow;
out float vPeriph;
out float vVisible;

${fr}

void main() {
  int slotId = gl_InstanceID;
  vec4 slotData = uReelSlots[slotId];
  if (abs(slotData.x) > 9.1) {
    vVisible = 0.0;
    vWorldPos = vec3(0.0);
    vWorldNormal = vec3(0.0, 0.0, 1.0);
    vUv = aUv;
    vLayer = 0;
    vSlotGlow = 0.0;
    vPeriph = 1.0;
    gl_Position = vec4(2.0, 2.0, 2.0, 1.0);
    return;
  }

  int rowId = slotId / 5;
  float rowVx = (rowId == 0) ? uRowVelX.x : ((rowId == 1) ? uRowVelX.y : uRowVelX.z);
  vec3 worldNor;
  int speciesZeroBased;
  float slotGlow;
  float periph;
  vec3 worldPos = evalMascotWorldPos(
    aPos, aUv, slotId, slotData, rowVx, uBubbleUpdraft, uShockwave, uTime,
    worldNor, speciesZeroBased, slotGlow, periph
  );

  vVisible = 1.0;
  vWorldPos = worldPos;
  vWorldNormal = worldNor;
  vUv = aUv;
  vLayer = speciesZeroBased;
  vSlotGlow = slotGlow;
  vPeriph = periph;
  gl_Position = uViewProj * vec4(worldPos, 1.0);
}
`,n0=`#version 300 es
precision highp float;
precision highp sampler2D;
precision highp sampler2DArray;

in vec3 vWorldPos;
in vec3 vWorldNormal;
in vec2 vUv;
flat in int vLayer;
in float vSlotGlow;
in float vPeriph;
in float vVisible;

uniform sampler2DArray uMascotArrayTex;
uniform sampler2D uSunShadowTex;
uniform mat4 uSunViewProj;
uniform vec2 uShadowTexelSize;
uniform vec3 uCamPos;
uniform vec3 uSunDir;
uniform float uTime;
uniform int uPassMode; // 0 = solid core (alpha >= 0.72, writes depth), 1 = soft anti-aliased edge (0.015..0.72)

out vec4 outColor;

${wi}

float sampleOverheadShadow(vec3 worldPos) {
  vec4 lightClip = uSunViewProj * vec4(worldPos, 1.0);
  vec3 proj = lightClip.xyz / max(lightClip.w, 1e-6);
  vec2 uv = proj.xy * 0.5 + 0.5;
  float d = proj.z * 0.5 + 0.5;
  if (uv.x < 0.0 || uv.x > 1.0 || uv.y < 0.0 || uv.y > 1.0 || d > 1.0) return 1.0;
  float closest = texture(uSunShadowTex, clamp(uv, vec2(0.001), vec2(0.999))).r;
  // Exclude self-shadowing bias so mascots stay bright unless Gyogun swims above them!
  return (d - 0.022 <= closest) ? 1.0 : 0.62;
}

void main() {
  if (vVisible < 0.5) discard;

  float layerF = float(vLayer);
  vec4 tex = texture(uMascotArrayTex, vec3(vUv, layerF));
  float alpha = tex.a;

  if (uPassMode == 0) {
    if (alpha < 0.72) discard;
  } else {
    if (alpha >= 0.72 || alpha < 0.015) discard;
  }

  // Estimate 3D plush silhouette normal from alpha gradient so underwater rim-light & caustics wrap in 3D!
  const float e = 0.009;
  float aR = texture(uMascotArrayTex, vec3(clamp(vUv + vec2(e, 0.0), 0.0, 1.0), layerF)).a;
  float aL = texture(uMascotArrayTex, vec3(clamp(vUv - vec2(e, 0.0), 0.0, 1.0), layerF)).a;
  float aD = texture(uMascotArrayTex, vec3(clamp(vUv + vec2(0.0, e), 0.0, 1.0), layerF)).a;
  float aU = texture(uMascotArrayTex, vec3(clamp(vUv - vec2(0.0, e), 0.0, 1.0), layerF)).a;

  vec2 silGrad = vec2(aL - aR, aD - aU) * 1.45;
  vec3 N = normalize(vWorldNormal + vec3(silGrad.x, silGrad.y, 0.0));

  vec3 toCam = uCamPos - vWorldPos;
  float dist = length(toCam);
  vec3 V = toCam / max(dist, 1e-5);
  float edgeRim = clamp(length(silGrad) * 0.85, 0.0, 1.0);

  // Recover straight sRGB from premultiplied mipmapped texels (zero dark bilinear halo!) & convert to linear HDR
  vec3 srgb = clamp(tex.rgb / max(alpha, 1e-4), 0.0, 1.0);
  vec3 linearArt = pow(srgb, vec3(2.2));

  // Integrate seamlessly with sunlit coral-lagoon lighting, overhead wave caustics, and Gyogun shadows!
  float shadow = sampleOverheadShadow(vWorldPos);
  float caustic = evalSunShaftCaustic(vWorldPos, uTime, uSunDir);

  // Keep adorable pastel colors lush & cheerful while bathing them in real underwater caustics + cyan rim!
  float underwaterEnv = shadow * (0.94 + 0.52 * caustic + 0.28 * vSlotGlow);
  vec3 waterTint = mix(vec3(0.98, 1.01, 1.03), vec3(0.72, 0.96, 1.06), vPeriph * 0.50);
  vec3 lit = linearArt * waterTint * underwaterEnv;

  // Wet specular caustic shimmer + turquoise underwater rim hug so character melts into the 3D water!
  vec3 H = normalize(uSunDir + V);
  float spec = pow(max(dot(N, H), 0.0), 32.0) * (0.16 + 0.28 * caustic) * shadow;
  vec3 aquaRim = vec3(0.14, 0.58, 0.78) * edgeRim * (0.20 + 0.26 * caustic);

  // Warm golden-pearl celebration shimmer on Reach / Jackpot!
  vec3 reachAura = ((vLayer + 1) % 2 == 1 ? vec3(0.45, 0.25, 0.12) : vec3(0.12, 0.36, 0.48)) * vSlotGlow * (0.18 + 0.40 * edgeRim);
  lit += vec3(0.88, 0.98, 1.02) * spec + aquaRim + reachAura;

  // Peripheral Beer-Lambert Coral-Lagoon Depth Extinction (center foreground scattering is ray-marched in post.frag!)
  vec3 viewRay = -V;
  float fogDist = max(dist - 12.0, 0.0) + vPeriph * 6.2;
  vec3 sigmaExt = vec3(0.068, 0.026, 0.016);
  vec3 trans = exp(-sigmaExt * fogDist);
  vec3 fogColor = evalOceanAmbient(viewRay, vWorldPos.y);
  float fogMix = 1.0 - exp(-0.034 * fogDist);

  vec3 finalRgb = lit * trans + fogColor * fogMix;

  if (uPassMode == 0) {
    outColor = vec4(finalRgb, 1.0);
  } else {
    // Premultiplied alpha output for zero-halo edge blending
    outColor = vec4(finalRgb * alpha, alpha);
  }
}
`,pr=`
vec3 evalOkinawaVertex(
  vec3 localPos,
  vec3 localNormal,
  vec4 att,
  mat4 modelMat,
  vec4 entityParam,
  float time,
  out vec3 outWorldNormal
) {
  // entityParam: x = animPhase, y = animMode (0=static/kelp, 1=manta, 2=shark/fish, 3=turtle, 4=eel), z = highlightGlow, w = clipMinY
  vec3 p = localPos;
  vec3 n = localNormal;
  int animMode = int(entityParam.y + 0.5);
  float phase = entityParam.x;
  float swayW = att.z;

  int matIdV = int(att.x + 0.5);
  int varIdV = int(att.y + 0.5);

  if (animMode == 0) {
    if (matIdV == 10 && (varIdV == 5 || varIdV == 18)) {
      // Rooted Cantilever Sea-Breeze Sway + Leaflet Tip Flutter for Coconut Palm Fronds & Rachis!
      float vAlong = clamp(att.w, 0.0, 1.0);
      float bend = vAlong * vAlong;
      float treePhase = p.x * 0.28 + p.z * 0.24;
      p.x += sin(time * 1.42 + treePhase + vAlong * 1.15) * 0.21 * bend;
      p.z += cos(time * 1.16 + treePhase * 1.3 + vAlong * 1.05) * 0.15 * bend;
      p.y += sin(time * 1.82 + treePhase * 1.7 + vAlong * 1.75) * 0.085 * bend;
      if (varIdV == 5) {
        float wingTip = clamp(abs(att.z), 0.0, 1.0) * vAlong;
        p.y += sin(time * 4.5 + p.x * 5.0 + p.z * 4.6) * 0.020 * wingTip;
      }
    } else if (matIdV == 10 && (varIdV == 32 || varIdV == 33 || varIdV == 34)) {
      // Rooted Cantilever Breeze Sway + Leaf-Margin Flutter for Japanese Maple Boughs (32) & Azalea/Evergreen Sprays (33, 34)!
      float vAlong = clamp(att.w, 0.0, 1.0);
      float bend = vAlong * vAlong;
      float amp = (varIdV == 32) ? 0.052 : 0.018;
      float brPhase = p.x * 0.65 + p.z * 0.58 + p.y * 0.42;
      p.x += sin(time * 1.62 + brPhase + vAlong * 1.25) * amp * bend;
      p.z += cos(time * 1.34 + brPhase * 1.2 + vAlong * 1.15) * (amp * 0.78) * bend;
      p.y += sin(time * 2.10 + brPhase * 1.6 + vAlong * 1.80) * (amp * 0.42) * bend;
      float wingTip = clamp(abs(att.z), 0.0, 1.0) * vAlong;
      p.y += sin(time * 4.6 + p.x * 6.0 + p.z * 5.6) * (amp * 0.18) * wingTip;
    } else if (
      swayW > 0.001 &&
      (
        matIdV == 4 ||
        matIdV == 6 ||
        (matIdV == 10 && varIdV == 30) ||
        (matIdV == 12 && (varIdV == 21 || varIdV == 22))
      )
    ) {
      p.x += sin(time * 1.55 + p.y * 1.3 + p.z * 0.4) * 0.20 * swayW;
      p.z += cos(time * 1.20 + p.x * 1.1 + p.y * 0.5) * 0.14 * swayW;
    }
  } else if (animMode == 1) {
    // Reef Manta Ray graceful traveling-wave pectoral wing flap!
    float spanT = clamp(abs(p.x) / 1.85, 0.0, 1.0);
    float flap = sin(phase - spanT * 1.65) * pow(spanT, 1.32) * 0.52;
    float dFlapDx = sign(p.x) * (1.32 * pow(max(spanT, 0.02), 0.32) / 1.85) * sin(phase - spanT * 1.65) * 0.52;
    p.y += flap;
    p.z += cos(phase - spanT * 1.4) * spanT * 0.04;
    n = normalize(vec3(n.x - dFlapDx * 0.55, n.y, n.z));
  } else if (animMode == 2) {
    // Shark / Napoleon / Gurukun / Clownfish biomechanical S-curve swimming!
    float tailFactor = clamp(swayW, 0.0, 1.5);
    float wave = sin(phase + att.w * 3.1) * 0.13 * tailFactor;
    p.x += wave;
  } else if (animMode == 3) {
    // Green Sea Turtle figure-eight fore-flipper rowing (shell & head have swayW=0 so carapace stays 100% rigid!)
    if (swayW > 0.001) {
      p.y += sin(phase) * swayW * 0.68;
      p.z += cos(phase) * swayW * 0.22;
      float dFlap = sign(p.x) * sin(phase) * 0.68;
      n = normalize(vec3(n.x - dFlap * 0.45, n.y, n.z));
    }
  } else if (animMode == 4) {
    // Spotted Garden Eel gentle current sway!
    p.x += sin(phase + p.y * 4.2) * 0.075 * swayW;
  } else if (animMode == 5) {
    // Dynamic 3-Sip Bar Cocktail / Beer / Awamori Liquid Level (phase = fill in 0..1: 3/3 -> 2/3 -> 1/3 -> 0/3)!
    float fill = clamp(phase, 0.0, 1.0);
    float absZ = abs(swayW);
    float yBot = floor(absZ) * 0.001;
    float yTop = absZ - floor(absZ);
    float rRatio = clamp(att.w, 0.25, 1.0);
    float spanY = max(yTop - yBot, 0.01);
    if (swayW >= 0.0) {
      float u = clamp((p.y - yBot) / spanY, 0.0, 1.0);
      float uNew = u * fill;
      float rOrig = mix(rRatio, 1.0, u);
      float rNew = mix(rRatio, 1.0, uNew);
      float radScale = rNew / max(rOrig, 0.05);
      p.y = yBot + (p.y - yBot) * fill;
      p.xz *= radScale;
    } else {
      // Floating draft beer foam head, whipped cream, or top ice cubes ride smoothly down with the liquid surface!
      float ySurf = yBot + spanY * fill;
      float crownScaleY = smoothstep(0.0, 0.24, fill) * mix(0.52, 1.0, fill);
      float rNewTop = mix(rRatio, 1.0, fill);
      p.y = ySurf + (p.y - yTop) * crownScaleY;
      p.xz *= rNewTop;
    }
  }

  vec4 wp = modelMat * vec4(p, 1.0);
  outWorldNormal = normalize(mat3(modelMat) * n);
  return wp.xyz;
}
`,r0=`#version 300 es
precision highp float;

layout(location = 0) in vec3 aPos;
layout(location = 1) in vec3 aNormal;
layout(location = 2) in vec4 aAttrib;

uniform mat4 uSunViewProj;
uniform mat4 uModelMat;
uniform vec4 uEntityParam;
uniform float uTime;

out float vWorldY;
out float vClipMinY;
out vec4 vShadowAttrib;

${pr}

void main() {
  vec3 wn;
  vec3 wp = evalOkinawaVertex(aPos, aNormal, aAttrib, uModelMat, uEntityParam, uTime, wn);
  vWorldY = wp.y;
  vClipMinY = uEntityParam.w;
  vShadowAttrib = aAttrib;
  gl_Position = uSunViewProj * vec4(wp, 1.0);
}
`,l0=`#version 300 es
precision highp float;

uniform highp sampler2DArray uPbrNormalTex;
uniform int uPbrReady;

in float vWorldY;
in float vClipMinY;
in vec4 vShadowAttrib;

void main() {
  if (vWorldY < vClipMinY) discard;
  // Cast real dappled feathered coconut-frond, Japanese maple & azalea leaf shadows onto sand, planters, brick plaza & walls!
  if (int(vShadowAttrib.x + 0.5) == 10 && uPbrReady == 1) {
    int sVar = int(vShadowAttrib.y + 0.5);
    if (sVar == 5 || (sVar >= 32 && sVar <= 34)) {
      float sLayer = (sVar == 5) ? 24.0 : float(sVar - 2);
      vec2 fUv = vec2(
        clamp(vShadowAttrib.z * 0.5 + 0.5, 0.003, 0.997),
        clamp(1.0 - vShadowAttrib.w, 0.003, 0.997)
      );
      if (textureLod(uPbrNormalTex, vec3(fUv, sLayer), 0.0).a < 0.38) discard;
    }
  }
}
`,Is=`#version 300 es
precision highp float;

layout(location = 0) in vec3 aPos;
layout(location = 1) in vec3 aNormal;
layout(location = 2) in vec4 aAttrib;

uniform mat4 uViewProj;
uniform mat4 uModelMat;
uniform vec4 uEntityParam;
uniform float uTime;

out vec3 vWorldPos;
out vec3 vLocalPos;
out vec3 vLocalNormal;
out vec3 vWorldNormal;
out vec3 vModelAxisX;
out vec3 vModelAxisY;
out vec3 vModelAxisZ;
out vec4 vAttrib;
out float vEntityPhase;
out float vHighlightGlow;
out float vClipMinY;
out float vIsDynamic;

${pr}

void main() {
  vec3 wn;
  vec3 wp = evalOkinawaVertex(aPos, aNormal, aAttrib, uModelMat, uEntityParam, uTime, wn);
  vWorldPos = wp;
  vLocalPos = aPos;
  vLocalNormal = aNormal;
  vWorldNormal = wn;
  vec3 mx = uModelMat[0].xyz;
  vec3 my = uModelMat[1].xyz;
  vec3 mz = uModelMat[2].xyz;
  vModelAxisX = mx / max(length(mx), 1e-5);
  vModelAxisY = my / max(length(my), 1e-5);
  vModelAxisZ = mz / max(length(mz), 1e-5);
  vAttrib = aAttrib;
  vEntityPhase = uEntityParam.x;
  vHighlightGlow = uEntityParam.z;
  vClipMinY = uEntityParam.w;
  vIsDynamic = (uEntityParam.y > 0.5 || abs(uEntityParam.z) > 0.001) ? 1.0 : 0.0;
  gl_Position = uViewProj * vec4(wp, 1.0);
}
`,Ws=`#version 300 es
precision highp float;
precision highp sampler2D;
precision highp sampler2DArray;

in vec3 vWorldPos;
in vec3 vLocalPos;
in vec3 vLocalNormal;
in vec3 vWorldNormal;
in vec3 vModelAxisX;
in vec3 vModelAxisY;
in vec3 vModelAxisZ;
in vec4 vAttrib; // x=matId, y=variant, z=sway, w=aoOrAxialZ
in float vEntityPhase;
in float vHighlightGlow;
in float vClipMinY;
in float vIsDynamic;

uniform vec3 uCamPos;
uniform vec3 uSunDir;
uniform float uTime;
uniform mat4 uSunViewProj;
uniform sampler2D uSunShadowTex;
uniform vec2 uShadowTexelSize;

uniform sampler2DArray uPbrAlbedoTex; // 4 layers: 0=sand, 1=coralRock, 2=woodPlanks, 3=rustedMetal (RGB=sRGB, A=roughness)
uniform sampler2DArray uPbrNormalTex; // 4 layers: RGB=OpenGL tangent normal, A=AO
uniform int uPbrReady;
uniform sampler2D uAirSkyTex;
uniform int uAirSkyReady;
uniform sampler2D uOkiSlotAtlasTex;
uniform int uOkiSlotAtlasReady;
uniform sampler2D uMuseumCaptionTex;
uniform int uMuseumCaptionReady;

uniform vec4 uFlashlightPos; // xyz = diver world pos, w = intensity (0=off, >0=on)
uniform vec3 uFlashlightDir;
uniform vec4 uAvatarFootPos; // xyz = grounded shoe-sole center, w = 1.0 when avatar is standing on land

out vec4 outColor;

${wi}

float sampleCoralShadow(vec3 worldPos, vec3 geomN) {
  float cosSun = max(dot(geomN, uSunDir), 0.0);
  if (cosSun <= 0.002) return 0.26;
  // Combine small surface-normal offset with grazing-angle sun-ray offset so steep walls never get diagonal texel shadow acne!
  vec3 offsetPos = worldPos + geomN * (0.012 + 0.016 * (1.0 - cosSun)) + uSunDir * (0.026 * (1.0 - cosSun));
  vec4 lightClip = uSunViewProj * vec4(offsetPos, 1.0);
  vec3 proj = lightClip.xyz / max(lightClip.w, 1e-6);
  vec2 uv = proj.xy * 0.5 + 0.5;
  float d = proj.z * 0.5 + 0.5;
  if (uv.x < 0.002 || uv.x > 0.998 || uv.y < 0.002 || uv.y > 0.998 || d > 1.0) return 1.0;

  // Slope-scaled tan(theta) bias keeps avatar shoe contact shadows tight (cosSun ~ 0.85) while preventing grazing wall stripes!
  float sinSun = sqrt(max(0.0, 1.0 - cosSun * cosSun));
  float slopeBias = min(0.0042, 0.00046 + 0.00048 * (sinSun / max(cosSun, 0.14)));
  float refD = d - slopeBias;
  float c0 = (refD <= textureLod(uSunShadowTex, uv, 0.0).r) ? 1.0 : 0.0;
  float c1 = (refD <= textureLod(uSunShadowTex, clamp(uv + vec2(1.4, 0.5) * uShadowTexelSize, vec2(0.001), vec2(0.999)), 0.0).r) ? 1.0 : 0.0;
  float c2 = (refD <= textureLod(uSunShadowTex, clamp(uv + vec2(-1.4, -0.5) * uShadowTexelSize, vec2(0.001), vec2(0.999)), 0.0).r) ? 1.0 : 0.0;
  float lit = c0 + c1 + c2;
  if (lit == 0.0) return 0.26;
  if (lit == 3.0) return 1.0;
  lit += (refD <= textureLod(uSunShadowTex, clamp(uv + vec2(-0.5, 1.4) * uShadowTexelSize, vec2(0.001), vec2(0.999)), 0.0).r) ? 1.0 : 0.0;
  lit += (refD <= textureLod(uSunShadowTex, clamp(uv + vec2(0.5, -1.4) * uShadowTexelSize, vec2(0.001), vec2(0.999)), 0.0).r) ? 1.0 : 0.0;
  return mix(0.26, 1.0, lit * 0.2);
}

// Seamless Triplanar PBR Sampling
void sampleTriplanarPbr(
  vec3 sampleCoord,
  vec3 geomN,
  int layer,
  float scale,
  float normalStrength,
  out vec3 outLinearAlbedo,
  out float outRoughness,
  out float outAo,
  out vec3 outPerturbedN
) {
  vec3 blend = abs(geomN);
  blend = pow(max(blend, vec3(0.0001)), vec3(4.0));
  blend /= (blend.x + blend.y + blend.z);

  float lf = float(layer);
  vec2 uvX = sampleCoord.zy * scale;
  vec2 uvY = sampleCoord.xz * scale;
  vec2 uvZ = sampleCoord.xy * scale;

  vec2 dxX = dFdx(uvX); vec2 dyX = dFdy(uvX);
  vec2 dxY = dFdx(uvY); vec2 dyY = dFdy(uvY);
  vec2 dxZ = dFdx(uvZ); vec2 dyZ = dFdy(uvZ);

  vec4 albMix = vec4(0.0);
  vec3 worldN = vec3(0.0);
  float aoAcc = 0.0;
  float wSum = 0.0;

  if (blend.x > 0.004) {
    vec4 aX = textureGrad(uPbrAlbedoTex, vec3(uvX, lf), dxX, dyX);
    vec4 nX = textureGrad(uPbrNormalTex, vec3(uvX, lf), dxX, dyX);
    vec2 tX = (nX.xy * 2.0 - 1.0) * normalStrength;
    albMix += aX * blend.x;
    worldN += vec3(0.0, tX.y, tX.x) * blend.x;
    aoAcc += nX.a * blend.x;
    wSum += blend.x;
  }
  if (blend.y > 0.004) {
    vec4 aY = textureGrad(uPbrAlbedoTex, vec3(uvY, lf), dxY, dyY);
    vec4 nY = textureGrad(uPbrNormalTex, vec3(uvY, lf), dxY, dyY);
    vec2 tY = (nY.xy * 2.0 - 1.0) * normalStrength;
    albMix += aY * blend.y;
    worldN += vec3(tY.x, 0.0, tY.y) * blend.y;
    aoAcc += nY.a * blend.y;
    wSum += blend.y;
  }
  if (blend.z > 0.004) {
    vec4 aZ = textureGrad(uPbrAlbedoTex, vec3(uvZ, lf), dxZ, dyZ);
    vec4 nZ = textureGrad(uPbrNormalTex, vec3(uvZ, lf), dxZ, dyZ);
    vec2 tZ = (nZ.xy * 2.0 - 1.0) * normalStrength;
    albMix += aZ * blend.z;
    worldN += vec3(tZ.x, tZ.y, 0.0) * blend.z;
    aoAcc += nZ.a * blend.z;
    wSum += blend.z;
  }

  float invW = 1.0 / max(wSum, 1e-4);
  albMix *= invW;
  worldN *= invW;

  outLinearAlbedo = pow(clamp(albMix.rgb, 0.0, 1.0), vec3(2.2));
  outRoughness = albMix.a;
  outAo = aoAcc * invW;
  outPerturbedN = normalize(geomN + worldN);
}
`,Vs=`void main() {
  if (vWorldPos.y < vClipMinY) discard;

  vec3 geomN = normalize(gl_FrontFacing ? vWorldNormal : -vWorldNormal);
  vec3 locN  = normalize(gl_FrontFacing ? vLocalNormal : -vLocalNormal);
  vec3 N = geomN;
  vec3 toCam = uCamPos - vWorldPos;
  float dist = length(toCam);
  vec3 V = toCam / max(dist, 1e-5);
  float NdotV = max(dot(N, V), 0.0);
  float fresnel = pow(1.0 - NdotV, 3.0);

  int matId = int(vAttrib.x + 0.5);
  float variant = vAttrib.y;
  float ao = (matId == 8 || matId == 11) ? 1.0 : clamp(vAttrib.w, 0.25, 1.0);

  vec3 sampleCoord = (vIsDynamic > 0.5) ? vLocalPos * 2.2 : vWorldPos;

  vec3 albedo = vec3(0.5);
  float roughness = 0.65;
  float specMul = 0.42;
  float outAlpha = 1.0;
  vec3 sssCol = vec3(0.0);
  vec3 emissive = vec3(0.0);`,Hs=`  // Animated shoreline surf wave on the beach & boat hull!
  float shoreWave = 0.055 * sin(vWorldPos.z * 2.3 + uTime * 2.35 + sin(vWorldPos.x * 0.55) * 1.4);
  float localWaterY = OCEAN_SURFACE_Y + shoreWave;
  bool isAboveWater = (vWorldPos.y >= localWaterY);

  // Damp glossy shoreline sand right above the swash line on the Okinawa beach
  if (isAboveWater && matId == 0) {
    float dryH = vWorldPos.y - localWaterY;
    if (dryH < 0.26) {
      float wet = 1.0 - smoothstep(0.0, 0.26, dryH);
      albedo *= mix(1.0, 0.66, wet);
      specMul = mix(specMul, 1.05, wet);
      roughness = mix(roughness, 0.18, wet);
    }
  }

  float shadow = sampleCoralShadow(vWorldPos, geomN);
  // Crisp soft contact ambient occlusion directly beneath the avatar's left & right shoes!
  if (isAboveWater && uAvatarFootPos.w > 0.5 && geomN.y > 0.65) {
    float dyFoot = abs(vWorldPos.y - uAvatarFootPos.y);
    if (dyFoot < 0.085) {
      vec2 relF = vWorldPos.xz - uAvatarFootPos.xz;
      float dSoleL = length((relF - vec2(-0.075, 0.0)) * vec2(1.15, 0.88));
      float dSoleR = length((relF - vec2( 0.075, 0.0)) * vec2(1.15, 0.88));
      float dSole  = min(dSoleL, dSoleR);
      float contactAo = 1.0 - (1.0 - smoothstep(0.045, 0.175, dSole)) * (1.0 - smoothstep(0.02, 0.085, dyFoot)) * 0.56;
      ao *= contactAo;
      shadow *= mix(0.62, 1.0, contactAo);
    }
  }
  float wExp = clamp(uTodCloudTint.w, 0.10, 1.15);
  float caustic = isAboveWater ? 0.0 : evalSunShaftCaustic(vWorldPos, uTime, uSunDir) * wExp;

  // Depth-dependent solar/lunar attenuation across all 9 Time-of-Day modes!
  float submergeDepth = max(localWaterY - vWorldPos.y, 0.0);
  vec3 sunWaterTrans = isAboveWater
    ? uTodSunColor.rgb
    : uTodSunColor.rgb * exp(-vec3(0.075, 0.022, 0.012) * submergeDepth);

  float sunIrr = shadow * (isAboveWater ? 1.06 : (0.52 * wExp + 1.55 * caustic));
  float wrapL = clamp((dot(N, uSunDir) + 0.30) / 1.30, 0.0, 1.0);
  vec3 H = normalize(uSunDir + V);
  float gloss = clamp(1.0 - roughness, 0.0, 1.0);
  bool isFaunaEye = (matId == 8 && variant >= 9.5);
  float specExp = isFaunaEye ? 420.0 : mix(16.0, 148.0, gloss * gloss);
  float spec = pow(max(dot(N, H), 0.0), specExp) * specMul;
  float backLight = pow(clamp(dot(-V, normalize(uSunDir + N * 0.45)), 0.0, 1.0), 2.5);

  float skyUp = clamp(N.y * 0.5 + 0.5, 0.0, 1.0);
  vec3 amb = isAboveWater
    ? mix(uTodAmbient.rgb * 0.54, uTodAmbient.rgb, skyUp) * ao
    : mix(vec3(0.018, 0.075, 0.135), vec3(0.068, 0.285, 0.395), skyUp) * wExp * ao;

  // Real-time 3D warm resort illumination + always-on ZEN University architectural interior lighting!
  vec3 resortWarm = isAboveWater
    ? (evalResortWarmLight(vWorldPos, N, uTime) + evalZenCampusInteriorLight(vWorldPos, N))
    : vec3(0.0);
  float warmSpec = isAboveWater
    ? pow(max(dot(N, normalize(vec3(0.0, 0.65, 0.45) + V)), 0.0), mix(14.0, 88.0, gloss * gloss)) * specMul * 0.28
    : 0.0;

  vec3 lit = albedo * ((amb + resortWarm * mix(0.65, 1.0, ao)) + sunWaterTrans * wrapL * 0.92 * sunIrr * ao)
           + sunWaterTrans * spec * sunIrr
           + resortWarm * warmSpec
           + sssCol * (backLight * (0.45 + 0.55 * shadow) * max(wExp, 0.22) + length(resortWarm) * 0.22);

  // Night-Dive Coral Polyp & Giant Clam Bio-Fluorescence ('サンゴの夜間蛍光')!
  if (!isAboveWater && uTodAmbient.w > 0.05 && (matId == 4 || matId == 5 || matId == 6)) {
    float bioPulse = 0.82 + 0.18 * sin(uTime * 2.1 + vWorldPos.x * 1.4 + vWorldPos.z * 1.3);
    vec3 bioCol = (matId == 4)
      ? mix(vec3(0.04, 0.72, 0.88), vec3(0.76, 0.16, 0.68), fract(variant * 0.37))
      : vec3(0.06, 0.85, 0.62);
    lit += bioCol * albedo * uTodAmbient.w * 0.65 * bioPulse;
  }

  // === Real 3D Underwater Dive Flashlight Cone (Restores Full-Spectrum Reds/Golds in Deep Reef!) ===
  if (uFlashlightPos.w > 0.01 && !isAboveWater) {
    vec3 toFrag = vWorldPos - uFlashlightPos.xyz;
    float fDist = length(toFrag);
    vec3 fDir = toFrag / max(fDist, 1e-4);
    float spotCos = dot(fDir, normalize(uFlashlightDir));
    float cone = smoothstep(0.66, 0.93, spotCos);
    float atten = 1.0 / (1.0 + 0.055 * fDist * fDist);
    float fDiff = max(dot(N, -fDir), 0.0);
    // Offset strobe half-vector slightly upward on glossy 3D eyes so the corneal catchlight is a crisp upper pinpoint, never blinding the dark pupil!
    vec3 fH = isFaunaEye ? normalize(-fDir + V + vec3(0.0, 0.38, 0.0)) : normalize(-fDir + V);
    float fSpec = pow(max(dot(N, fH), 0.0), isFaunaEye ? 460.0 : 42.0) * specMul;
    vec3 beamCol = vec3(1.15, 1.04, 0.88) * uFlashlightPos.w * cone * atten;
    lit += (albedo * fDiff + vec3(1.0) * fSpec * 0.65) * beamCol;
  }

  // Subtle interactive highlight rim when aiming at a scavengeable Raft item or focusing on an Okinawa creature!
  if (vHighlightGlow > 0.005) {
    float pulse = 0.75 + 0.25 * sin(uTime * 6.0);
    if (matId == 8) {
      // Keep interior marine creature textures 100% pure & unwashed; add only a delicate grazing silhouette rim!
      lit += vec3(0.18, 0.84, 1.0) * pow(fresnel, 2.4) * 0.24 * vHighlightGlow * pulse;
    } else {
      vec3 rimCol = vec3(1.0, 0.84, 0.32);
      lit += (albedo * 0.30 + rimCol * (0.25 + 0.65 * fresnel)) * vHighlightGlow * pulse;
    }
  }
  lit += emissive;

  if (outAlpha < 0.999) {
    outAlpha = clamp(outAlpha + spec * 0.32, 0.04, 0.96);
  }

  vec3 viewRay = -V;

  if (isAboveWater) {
    if (uCamPos.y > OCEAN_SURFACE_Y) {
      float airHaze = smoothstep(42.0, 115.0, dist);
      vec3 hazeCol = pow(clamp(uTodSkyHorizon.rgb, 0.0, 1.0), vec3(2.2)) * 0.82;
      outColor = vec4(mix(lit, hazeCol, airHaze * 0.62), outAlpha);
      return;
    }
    vec3 surfCeiling = evalUnderwaterToAirSurface(uCamPos, viewRay, uSunDir, uTime, 0.0, true, lit);
    outColor = vec4(surfCeiling, 1.0);
    return;
  }

  // === Looking from Beach / Dive Boat Deck DOWN through Sparkling Lagoon Water! ===
  if (uCamPos.y > OCEAN_SURFACE_Y) {
    float tAir = (viewRay.y < -0.005) ? max(0.0, (localWaterY - uCamPos.y) / viewRay.y) : dist;
    vec3 surfHit = uCamPos + viewRay * min(tAir, dist);
    float waterPath = max(0.0, dist - tAir);

    vec3 sigmaTop = vec3(0.085, 0.022, 0.012);
    vec3 transTop = exp(-sigmaTop * waterPath);
    vec3 keramaTint = mix(vec3(0.05, 0.66, 0.74), vec3(0.015, 0.28, 0.46), clamp(submergeDepth / 7.5, 0.0, 1.0)) * wExp;
    vec3 underCol = lit * transTop + keramaTint * (1.0 - exp(-0.045 * waterPath));

    // White Okinawa shoreline surf foam + Magical Night/Midnight Sea-Firefly Bioluminescence ('夜光虫')!
    if (submergeDepth < 0.28) {
      float foamNoise = 0.55 + 0.45 * noise2D(vWorldPos.xz * 3.8 + vec2(0.0, uTime * 0.9));
      float foam = (1.0 - smoothstep(0.0, 0.26, submergeDepth)) * foamNoise;
      vec3 foamTint = vec3(0.94, 0.98, 1.0) * (0.18 + 0.82 * wExp)
                    + vec3(0.05, 0.74, 1.15) * uTodAmbient.w * 0.95;
      underCol = mix(underCol, foamTint, clamp(foam * 0.82, 0.0, 0.85));
    }

    vec3 w = evalOceanSurfaceDist(surfHit.xz, uTime, tAir);
    vec3 wN = normalize(vec3(-w.y * 0.78, 1.0, -w.z * 0.78));
    float surfFres = 0.024 + 0.88 * pow(1.0 - max(dot(V, wN), 0.0), 4.5);
    vec3 skySun = normalize(uTodSkySunDir.xyz);
    vec3 reflRay = reflect(viewRay, wN);
    reflRay.y = max(reflRay.y, 0.012);
    vec3 skyRefl = evalAirPanoramaSky(normalize(reflRay), skySun, uTime, uAirSkyTex, uAirSkyReady, 1.5);
    vec3 glintDir = normalize(vec3(skySun.x, max(skySun.y, 0.045), skySun.z));
    vec3 wH = normalize(glintDir + V);
    bool isMoon = (uTodSkyHorizon.w > 0.55);
    float diskPow = clamp(uTodSkyZenith.w, 0.0, 1.2);
    float sunGlint = (pow(max(dot(wN, wH), 0.0), isMoon ? 135.0 : 185.0) * (isMoon ? 2.8 : 4.8)
                    + pow(max(dot(wN, wH), 0.0), 24.0) * 0.30) * diskPow;
    vec3 glintTint = isMoon ? vec3(0.72, 0.86, 1.08) : mix(uTodSunColor.rgb * 1.12, vec3(1.08, 1.02, 0.90), uTodSkySunDir.w);

    outColor = vec4(mix(underCol, skyRefl, clamp(surfFres * 0.76, 0.0, 0.80)) + glintTint * sunGlint, outAlpha);
    return;
  }

  // Beer-Lambert Kerama-Blue Seawater Distance Extinction (Underwater Camera)
  float fogDist = max(dist - 2.2, 0.0);
  vec3 sigmaExt = vec3(0.064, 0.022, 0.013);
  vec3 trans = exp(-sigmaExt * fogDist);
  vec3 fogColor = evalOceanAmbient(viewRay, vWorldPos.y);
  float fogMix = 1.0 - exp(-0.026 * fogDist);
  vec3 uwCol = lit * trans + fogColor * fogMix;

  // Soft frothy shoreline meniscus right where shallow submerged sand meets the underside water mirror!
  if (submergeDepth < 0.24) {
    vec3 surfEdge = evalUnderwaterToAirSurface(uCamPos, viewRay, uSunDir, uTime, 0.0, false, vec3(0.0));
    float meniscusT = 1.0 - smoothstep(0.0, 0.24, submergeDepth);
    uwCol = mix(uwCol, surfEdge, meniscusT * 0.88);
  }

  outColor = vec4(uwCol, outAlpha);
}`,c0=`${Ws}
${Vs}
  if (uPbrReady == 1 && matId <= 3) {
    float texScale = (matId == 0) ? 0.44 : (matId == 1 ? 0.36 : (matId == 2 ? 0.48 : 0.65));
    float norStr   = (matId == 0) ? 1.08 : (matId == 1 ? 1.42 : 0.90);
    float pbrAo = 1.0;
    sampleTriplanarPbr(sampleCoord, geomN, matId, texScale, norStr, albedo, roughness, pbrAo, N);
    ao *= mix(0.48, 1.0, pbrAo);

    if (matId == 0) {
      // Blend porous Ryukyu reef limestone onto steep reef ledges + luminous Okinawa white coral-sand warmth!
      float slope = 1.0 - clamp(geomN.y, 0.0, 1.0);
      if (slope > 0.16) {
        vec3 rkAlb; float rkR, rkAo; vec3 rkN;
        sampleTriplanarPbr(sampleCoord, geomN, 1, 0.34, 1.38, rkAlb, rkR, rkAo, rkN);
        float w = smoothstep(0.16, 0.36, slope);
        albedo = mix(albedo, rkAlb, w);
        N = normalize(mix(N, rkN, w));
        ao *= mix(1.0, rkAo, w * 0.55);
      }
      // Deep Mossy Zushi Woodland Floor & Forest Hillside Humus around ZEN University (z > 29.2, zero beach sand!)
      float forestFloorW = smoothstep(29.2, 33.0, vWorldPos.z) * smoothstep(6.26, 6.58, vWorldPos.y);
      if (forestFloorW > 0.001) {
        float mossN = noise2D(vWorldPos.xz * 2.8) * 0.5 + noise2D(vWorldPos.xz * 16.0) * 0.5;
        vec3 humusCol = mix(vec3(0.010, 0.030, 0.010), vec3(0.038, 0.095, 0.022), mossN);
        albedo = mix(albedo, humusCol, forestFloorW);
        roughness = mix(roughness, 0.92, forestFloorW);
        ao *= mix(1.0, 0.52, forestFloorW);
      }
      specMul = mix(0.32, 0.06, forestFloorW);
    } else if (matId == 1) {
      // Subtle rose coralline algae crust on submerged sunlit reef limestone — OR dark mossy forest gloom on ZEN University hillsides!
      float forestSlopeW = smoothstep(29.2, 33.0, vWorldPos.z) * smoothstep(6.26, 6.65, vWorldPos.y);
      if (forestSlopeW > 0.001) {
        float fernN = noise2D(vWorldPos.xz * 3.5 + vWorldPos.y * 2.5) * 0.5 + noise2D(vWorldPos.xz * 20.0 - vWorldPos.y * 18.0) * 0.5;
        vec3 deepForest = mix(vec3(0.008, 0.026, 0.010), vec3(0.034, 0.088, 0.020), fernN);
        albedo = mix(albedo, deepForest, forestSlopeW);
        roughness = mix(roughness, 0.93, forestSlopeW);
        ao *= mix(1.0, 0.45, forestSlopeW);
        specMul = mix(0.42, 0.05, forestSlopeW);
      } else {
        if (vWorldPos.y < OCEAN_SURFACE_Y - 0.15) {
          float patchMask = smoothstep(0.58, 0.86, noise2D(vWorldPos.xz * 1.4)) * clamp(geomN.y, 0.0, 1.0);
          albedo = mix(albedo, vec3(0.42, 0.16, 0.28), patchMask * 0.32);
        }
        specMul = 0.42;
      }
    } else if (matId == 2) {
      // Wood planks (Raft above/at surface vs darker waterlogged shipwreck!)
      if (variant > 0.4) albedo *= vec3(0.58, 0.62, 0.56);
      if (variant > 0.75) {
        // Ornate treasure chest brass bands!
        specMul = 0.95;
      }
    } else if (matId == 3) {
      // Rusted salvage metal / Titanium upgraded hook!
      if (variant > 0.65) {
        albedo = mix(albedo, vec3(0.75, 0.82, 0.90), 0.72);
        specMul = 1.65;
      } else {
        specMul = 0.85;
      }
    }
  } else if (matId == 4) {
    // Okinawa Acropora Table Coral & Staghorn Reefs (Nano Banana Layer 9 Living Coral Polyp Micro-Structure!)
    int pal = int(variant + 0.5) % 4;
    vec3 cBase = (pal == 0) ? vec3(0.84, 0.22, 0.34)
               : (pal == 1) ? vec3(0.12, 0.68, 0.56)
               : (pal == 2) ? vec3(0.88, 0.54, 0.14)
               :              vec3(0.44, 0.28, 0.82);
    vec3 cTip  = (pal == 0) ? vec3(0.98, 0.82, 0.86)
               : (pal == 1) ? vec3(0.76, 0.98, 0.90)
               : (pal == 2) ? vec3(0.99, 0.90, 0.56)
               :              vec3(0.86, 0.80, 0.99);
    albedo = mix(cBase, cTip, smoothstep(0.42, 0.95, ao));
    if (uPbrReady == 1) {
      vec3 polypAlb; float polypR, polypAo;
      sampleTriplanarPbr(vWorldPos, geomN, 9, 1.55, 1.35, polypAlb, polypR, polypAo, N);
      float polypRelief = clamp(dot(polypAlb, vec3(0.333)) * 1.42, 0.45, 1.28);
      albedo *= polypRelief;
      roughness = mix(0.36, 0.68, polypR);
      ao *= mix(0.48, 1.04, polypAo);
    }
    sssCol = cBase * 0.45;
    specMul = 0.64;
  } else if (matId == 5) {
    // Brain Coral (Nano Banana Layer 9 Polyp Ridges!) & Okinawa Giant Tridacna Clam Mantle!
    float grooves = 0.5 + 0.5 * sin(vWorldPos.x * 22.0 + sin(vWorldPos.z * 20.0) * 2.4);
    if (variant > 1.5) {
      // Iridescent cobalt-turquoise Giant Tridacna Clam (オオシャコガイ) mantle + fluted limestone shell!
      bool innerMantle = geomN.y > 0.42;
      if (innerMantle) {
        vec3 mAlb = vec3(0.06, 0.55, 0.68);
        float mR = 0.26, mAo = 1.0;
        if (uPbrReady == 1) {
          sampleTriplanarPbr(sampleCoord, geomN, 21, 1.85, 1.25, mAlb, mR, mAo, N);
        }
        float iridSpots = smoothstep(0.72, 0.86, noise2D(sampleCoord.xz * 18.0));
        albedo = mix(vec3(0.02, 0.22, 0.72), mAlb * vec3(0.25, 1.18, 1.25), grooves * 0.75 + 0.25);
        albedo = mix(albedo, vec3(0.18, 0.98, 0.94), iridSpots * 0.75);
        roughness = mix(0.16, 0.36, mR);
        ao *= mix(0.52, 1.0, mAo);
        specMul = 1.42;
        sssCol = vec3(0.04, 0.58, 0.72) * 0.42;
      } else {
        vec3 shAlb = vec3(0.68, 0.65, 0.58);
        float shR = 0.72, shAo = 1.0;
        if (uPbrReady == 1) {
          sampleTriplanarPbr(sampleCoord, geomN, 1, 0.85, 1.45, shAlb, shR, shAo, N);
        }
        albedo = shAlb * (0.85 + 0.22 * grooves);
        roughness = shR;
        ao *= mix(0.48, 1.0, shAo);
        specMul = 0.38;
      }
    } else {
      albedo = mix(vec3(0.42, 0.22, 0.58), vec3(0.84, 0.54, 0.20), grooves * 0.65);
      if (uPbrReady == 1) {
        vec3 polypAlb; float polypR, polypAo;
        sampleTriplanarPbr(vWorldPos, geomN, 9, 1.18, 1.55, polypAlb, polypR, polypAo, N);
        albedo = mix(albedo * 0.58, albedo * 1.35, clamp(dot(polypAlb, vec3(0.333)) * 1.35, 0.0, 1.0));
        roughness = mix(0.34, 0.66, polypR);
        ao *= mix(0.44, 1.05, polypAo);
      }
      sssCol = vec3(0.55, 0.28, 0.52) * 0.36;
      specMul = 0.62;
    }
  } else if (matId == 6) {
    // Swaying Okinawa Seaweed (Mozuku/Kelp) & Sea Anemone Tentacles!
    albedo = (variant > 0.5)
      ? mix(vec3(0.62, 0.22, 0.42), vec3(0.96, 0.58, 0.72), ao)
      : mix(vec3(0.05, 0.36, 0.22), vec3(0.24, 0.76, 0.38), ao);
    sssCol = albedo * 0.65;
    specMul = 0.48;
  } else {
    // Mineral Ore Veins, Clay & Luminous Okinawa Pearl!
    int vId = int(variant + 0.5);
    if (vId == 0) {
      // Copper Ore (malachite green + metallic copper glint!)
      albedo = mix(vec3(0.08, 0.56, 0.44), vec3(0.88, 0.42, 0.16), smoothstep(0.3, 0.8, geomN.y));
      specMul = 1.45;
      emissive = vec3(0.12, 0.24, 0.18) * 0.35;
    } else if (vId == 1) {
      // Silver / Iron Metal Ore!
      albedo = vec3(0.52, 0.58, 0.66);
      specMul = 1.85;
    } else if (vId == 2) {
      // Okinawa Reef Clay!
      albedo = vec3(0.64, 0.36, 0.22);
      specMul = 0.25;
    } else {
      // Luminous Pearl / Gold Treasure!
      albedo = vec3(0.96, 0.94, 0.88);
      specMul = 1.95;
      emissive = vec3(0.52, 0.48, 0.28) * (0.65 + 0.35 * sin(uTime * 3.8));
    }
  }

${Hs}
`,h0=`${Ws}
void samplePlanarSignPbr(
  vec2 uv,
  vec3 geomN,
  int layer,
  float normalStrength,
  out vec3 outLinearAlbedo,
  out float outRoughness,
  out float outAo,
  out vec3 outPerturbedN
) {
  vec2 cUv = clamp(uv, vec2(0.004), vec2(0.996));
  float lf = float(layer);
  vec4 alb = texture(uPbrAlbedoTex, vec3(cUv, lf));
  vec4 nor = texture(uPbrNormalTex, vec3(cUv, lf));
  vec2 t = (nor.xy * 2.0 - 1.0) * normalStrength;
  float xSign = (geomN.z < 0.0) ? -1.0 : 1.0;
  outLinearAlbedo = pow(clamp(alb.rgb, 0.0, 1.0), vec3(2.2));
  outRoughness = alb.a;
  outAo = nor.a;
  outPerturbedN = normalize(geomN + vec3(t.x * xSign, -t.y, 0.0));
}
${Vs}
  if (matId == 10) {
    // === On-Shore Okinawa Dive Clubhouse & Oceanfront Tropical Beach Bar ('CHURA BAR') Nano Banana PBR Shader! ===
    int cId = int(variant + 0.5);
    ao = 1.0;
    float pbrAo = 1.0;
    if (cId == 0) {
      // Layer 6: Okinawa Ryukyu Coral-Limestone Stucco Walls, Columns, Dive Boat Hull & Sun Loungers
      if (uPbrReady == 1) {
        sampleTriplanarPbr(vWorldPos, geomN, 6, 0.54, 1.15, albedo, roughness, pbrAo, N);
        ao = mix(0.68, 1.0, pbrAo);
        specMul = 0.34;
      } else {
        albedo = vec3(0.92, 0.90, 0.86);
        roughness = 0.72;
        specMul = 0.28;
      }
    } else if (cId == 1) {
      // Layer 4: Authentic Ryukyu Red Clay Barrel Roof Tiles (沖縄赤瓦) + White Shikkui Mortar!
      if (uPbrReady == 1) {
        sampleTriplanarPbr(vWorldPos, geomN, 4, 0.62, 1.50, albedo, roughness, pbrAo, N);
        ao = mix(0.54, 1.0, pbrAo);
        specMul = 0.62;
      } else {
        albedo = vec3(0.72, 0.24, 0.12);
        roughness = 0.56;
        specMul = 0.45;
      }
    } else if (cId == 2) {
      // Layer 5: Luxury Polished Honey-Teak Decking, Setup Workbench, Boarding Pier, Boat Deck & Bar Top!
      if (uPbrReady == 1) {
        sampleTriplanarPbr(vWorldPos, geomN, 5, 0.56, 1.15, albedo, roughness, pbrAo, N);
        ao = mix(0.58, 1.0, pbrAo);
        specMul = 0.92;
      } else {
        albedo = vec3(0.46, 0.28, 0.13);
        roughness = 0.34;
        specMul = 0.78;
      }
    } else if (cId == 3) {
      // Layer 7: Woven Golden Coconut Palm Thatch (Tiki Bar Canopy & Beach Parasols!)
      if (uPbrReady == 1) {
        sampleTriplanarPbr(vWorldPos, geomN, 7, 0.68, 1.38, albedo, roughness, pbrAo, N);
        ao = mix(0.50, 1.0, pbrAo);
        specMul = 0.26;
      } else {
        albedo = vec3(0.66, 0.52, 0.24);
        roughness = 0.85;
        specMul = 0.20;
      }
    } else if (cId == 4) {
      // Layer 23: Real Photogrammetry Seaside Coconut Palm Trunk Bark (Cylindrical UV + Tangent Normal + Annular Scar AO!)
      float tNorm = clamp(vAttrib.z, 0.0, 1.0);
      float arcV  = vAttrib.w * 0.78;
      vec3 radDir = normalize(vec3(geomN.x, 0.0, geomN.z) + vec3(1e-5, 0.0, 0.0));
      float uCyl1 = fract(atan(radDir.z, radDir.x) * 0.15915494 + 0.5);
      float uCyl2 = fract(uCyl1 + 0.5);
      vec2 du1 = vec2(dFdx(uCyl1), dFdy(uCyl1));
      vec2 du2 = vec2(dFdx(uCyl2), dFdy(uCyl2));
      vec2 du  = (dot(du1, du1) < dot(du2, du2)) ? du1 : du2;
      vec2 dv  = vec2(dFdx(arcV), dFdy(arcV));

      float crownShade = 1.0 - 0.34 * smoothstep(0.84, 0.99, tNorm);
      float rootDamp   = 1.0 - 0.22 * (1.0 - smoothstep(0.0, 0.11, tNorm));
      float scarRing   = 0.5 + 0.5 * sin(vAttrib.w * 22.0);

      if (uPbrReady == 1) {
        vec4 bAlb = textureGrad(uPbrAlbedoTex, vec3(uCyl1, arcV, 23.0), vec2(du.x, dv.x), vec2(du.y, dv.y));
        vec4 bNor = textureGrad(uPbrNormalTex, vec3(uCyl1, arcV, 23.0), vec2(du.x, dv.x), vec2(du.y, dv.y));
        albedo = pow(clamp(bAlb.rgb, 0.0, 1.0), vec3(2.2));
        // Warm sun-bleached seaside silver-tan mid-trunk -> fibrous cinnamon-brown near crown & damp sand root
        vec3 trunkTint = mix(vec3(0.96, 0.90, 0.82), vec3(0.76, 0.58, 0.40), smoothstep(0.76, 1.0, tNorm));
        albedo *= trunkTint * rootDamp * (0.90 + 0.14 * scarRing);
        roughness = clamp(bAlb.a, 0.54, 0.95);
        ao = mix(0.42, 1.0, bNor.a) * crownShade * (0.86 + 0.14 * scarRing);

        vec3 T_cyl = normalize(vec3(-radDir.z, 0.0, radDir.x));
        vec3 B_cyl = normalize(cross(geomN, T_cyl));
        vec3 tN = bNor.xyz * 2.0 - 1.0;
        N = normalize(geomN + T_cyl * (tN.x * 1.25) + B_cyl * (tN.y * 1.35));
      } else {
        albedo = mix(vec3(0.24, 0.18, 0.13), vec3(0.42, 0.34, 0.25), scarRing) * crownShade;
        roughness = 0.84;
        ao = crownShade;
      }
      specMul = 0.26;
    } else if (cId == 14) {
      // Layer 8: Golden Lashed Bamboo Tiki Counter Base (CHURA BAR!)
      if (uPbrReady == 1) {
        sampleTriplanarPbr(vWorldPos, geomN, 8, 0.90, 1.42, albedo, roughness, pbrAo, N);
        ao = mix(0.50, 1.0, pbrAo);
        specMul = 0.96;
      } else {
        albedo = vec3(0.48, 0.34, 0.18);
        roughness = 0.52;
      }
    } else if (cId == 5) {
      // Layer 24: Botanical Pinnate Coconut Palm Fronds (Per-Pixel Leaflet Alpha Cutout + Midrib Normals + Sunlight SSS!)
      float uSigned = clamp(vAttrib.z, -1.0, 1.0);
      float vAlong  = clamp(vAttrib.w, 0.0, 1.0);
      vec2 fUv = vec2(clamp(uSigned * 0.5 + 0.5, 0.003, 0.997), clamp(1.0 - vAlong, 0.003, 0.997));
      

      if (uPbrReady == 1) {
        vec4 fNor = texture(uPbrNormalTex, vec3(fUv, 24.0));
        if (fNor.a < 0.38) discard;
        vec4 fAlb = texture(uPbrAlbedoTex, vec3(fUv, 24.0));
        albedo = pow(clamp(fAlb.rgb, 0.0, 1.0), vec3(2.2));
        roughness = clamp(fAlb.a, 0.20, 0.65);

        // Slight per-frond botanical lushness & sun-warmed tip variation
        float tipSun = smoothstep(0.72, 1.0, vAlong) * 0.18;
        albedo = mix(albedo, albedo * vec3(1.16, 1.08, 0.72), tipSun);
        if (!gl_FrontFacing) {
          // Underside of tropical palm leaflets has a slightly softer, brighter matte cuticle
          albedo *= vec3(0.95, 1.02, 0.92);
          roughness = clamp(roughness + 0.10, 0.25, 0.72);
        }

        vec3 upRef = (abs(geomN.y) < 0.92) ? vec3(0.0, 1.0, 0.0) : vec3(1.0, 0.0, 0.0);
        vec3 T_f = normalize(cross(upRef, geomN));
        vec3 B_f = normalize(cross(geomN, T_f));
        vec2 lN = (fNor.xy * 2.0 - 1.0) * 0.95;
        N = normalize(geomN + T_f * lN.x + B_f * lN.y);
      } else {
        albedo = mix(vec3(0.04, 0.26, 0.05), vec3(0.16, 0.48, 0.09), vAlong);
        roughness = 0.34;
      }

      // Golden-emerald chlorophyll sunlight translucency when looking up through the canopy against the sky!
      float backLit = max(0.0, dot(-geomN, uSunDir)) * 0.62 + pow(max(0.0, dot(-V, uSunDir)), 3.2) * 0.48;
      ao = mix(0.68, 1.0, smoothstep(0.0, 0.28, vAlong));
      sssCol = albedo * vec3(1.35, 1.48, 0.62) * (0.42 + 0.75 * backLit);
      emissive = albedo * vec3(0.95, 1.12, 0.48) * (0.10 + 0.26 * backLit);
      specMul = gl_FrontFacing ? 0.92 : 0.48;
    } else if (cId == 16) {
      // Layer 25: Woven Coconut Crownshaft Coir Fiber & Overlapping Woody Petiole Boots!
      float uFib1 = fract(vAttrib.z);
      float uFib2 = fract(uFib1 + 0.5);
      float vFib  = vAttrib.w;
      vec2 du1 = vec2(dFdx(uFib1), dFdy(uFib1));
      vec2 du2 = vec2(dFdx(uFib2), dFdy(uFib2));
      vec2 du  = (dot(du1, du1) < dot(du2, du2)) ? du1 : du2;
      vec2 dv  = vec2(dFdx(vFib), dFdy(vFib));

      if (uPbrReady == 1) {
        vec4 cAlb = textureGrad(uPbrAlbedoTex, vec3(uFib1, vFib, 25.0), vec2(du.x, dv.x), vec2(du.y, dv.y));
        vec4 cNor = textureGrad(uPbrNormalTex, vec3(uFib1, vFib, 25.0), vec2(du.x, dv.x), vec2(du.y, dv.y));
        albedo = pow(clamp(cAlb.rgb, 0.0, 1.0), vec3(2.2)) * vec3(0.82, 0.72, 0.60);
        roughness = clamp(cAlb.a, 0.68, 0.96);
        ao = mix(0.36, 0.92, cNor.a);
        vec3 radF = normalize(vec3(geomN.x, 0.0, geomN.z) + vec3(1e-5, 0.0, 0.0));
        vec3 T_fib = normalize(vec3(-radF.z, 0.0, radF.x));
        vec3 B_fib = normalize(cross(geomN, T_fib));
        vec2 tN = (cNor.xy * 2.0 - 1.0) * 1.25;
        N = normalize(geomN + T_fib * tN.x + B_fib * tN.y);
      } else {
        albedo = vec3(0.24, 0.15, 0.08);
        roughness = 0.88;
        ao = 0.75;
      }
      specMul = 0.22;
    } else if (cId == 17) {
      // Clusters of Glossy Tropical Green & Sun-Ripened Golden-Amber Coconuts ('ヤシの実の房')!
      float ripeness = clamp(vAttrib.z, 0.0, 1.0);
      float polarT   = clamp(vAttrib.w, 0.0, 1.0); // 0 = woody calyx stem cap, 1 = pointed 3-ridge apex
      float huskFib  = noise2D(vWorldPos.xz * 48.0 + vWorldPos.y * 36.0);
      vec3 youngGrn  = mix(vec3(0.065, 0.26, 0.032), vec3(0.16, 0.38, 0.048), huskFib);
      vec3 ripeGold  = mix(vec3(0.38, 0.21, 0.032), vec3(0.56, 0.34, 0.055), huskFib);
      vec3 huskCol   = mix(youngGrn, ripeGold, ripeness);
      // Dark woody star-shaped calyx cap ('ヘタ') at polarT < 0.20 + subtle brown tip speck at polarT > 0.92
      float calyxCap = 1.0 - smoothstep(0.12, 0.24, polarT);
      float apexTip  = smoothstep(0.90, 0.99, polarT);
      albedo = mix(huskCol, vec3(0.12, 0.075, 0.035), clamp(calyxCap * 0.92 + apexTip * 0.65, 0.0, 1.0));
      roughness = mix(0.22, 0.76, calyxCap);
      ao = mix(0.62, 1.0, smoothstep(0.0, 0.35, polarT));
      specMul = mix(1.65, 0.28, calyxCap);
      sssCol = huskCol * 0.24;
    } else if (cId == 18) {
      // 3D Tapered Woody Petiole & Central Frond Rachis Spine ('葉柄・中軸')!
      float tierWarm = clamp(vAttrib.z, 0.0, 1.0);
      float vAlong   = clamp(vAttrib.w, 0.0, 1.0);
      vec3 baseWood  = mix(vec3(0.22, 0.16, 0.06), vec3(0.32, 0.25, 0.08), tierWarm);
      vec3 midRachis = mix(vec3(0.14, 0.32, 0.06), vec3(0.24, 0.40, 0.09), tierWarm);
      albedo = mix(baseWood, midRachis, smoothstep(0.04, 0.36, vAlong));
      roughness = mix(0.58, 0.34, vAlong);
      ao = mix(0.62, 1.0, smoothstep(0.0, 0.20, vAlong));
      specMul = 0.68;
      sssCol = albedo * 0.32;
    } else if (cId == 6) {
      // Warm Glowing Festive String Bulbs, Cabana Lanterns & Table Lamps (blaze warmly at Dusk, Night & Midnight!)
      float pulse = 0.90 + 0.10 * sin(uTime * 3.2 + vWorldPos.x * 2.5);
      float nightBoost = 1.0 + uTodSunColor.w * 0.85;
      albedo = vec3(1.0, 0.84, 0.44);
      emissive = vec3(1.35, 0.76, 0.24) * pulse * nightBoost;
      specMul = 1.4;
    } else if (cId == 7) {
      // Kerama Blue Hawaii / Curacao Bottle & Cocktail Glass!
      albedo = vec3(0.004, 0.24, 0.72);
      roughness = 0.06;
      specMul = 2.65;
      emissive = vec3(0.004, 0.08, 0.22);
    } else if (cId == 8) {
      // Tropical Mango Smoothie / Orion Draft Gold Glass!
      albedo = vec3(0.76, 0.28, 0.006);
      roughness = 0.08;
      specMul = 2.35;
      emissive = vec3(0.12, 0.05, 0.002);
    } else if (cId == 9) {
      // Hibiscus Sunset Ruby Bottle & Cocktail!
      albedo = vec3(0.68, 0.012, 0.085);
      roughness = 0.08;
      specMul = 2.35;
      emissive = vec3(0.11, 0.005, 0.02);
    } else if (cId == 10) {
      // Shikuwasa Citrus Emerald Bottle & Soda!
      albedo = vec3(0.018, 0.48, 0.065);
      roughness = 0.08;
      specMul = 2.35;
      emissive = vec3(0.008, 0.09, 0.018);
    } else if (cId == 12) {
      // Layer 10: Planar 'KERAMA BLUE DIVE BRIEFING' Reef Map & BWRAF Whiteboard (cx=-4.55, cy=8.76, 1.76x1.76)
      if (uPbrReady == 1 && abs(geomN.z) > 0.5) {
        float xSign = (geomN.z < 0.0) ? -1.0 : 1.0;
        vec2 uv = vec2(0.5 + xSign * (vWorldPos.x - (-4.55)) / 1.76, 0.5 - (vWorldPos.y - 8.76) / 1.76);
        samplePlanarSignPbr(uv, geomN, 10, 0.35, albedo, roughness, pbrAo, N);
        ao = mix(0.82, 1.0, pbrAo);
        specMul = 0.95;
        emissive = albedo * 0.24; // Subtle shop spotlight illumination so map text reads super crisp!
      } else {
        albedo = vec3(0.16, 0.10, 0.05);
        roughness = 0.42;
      }
    } else if (cId == 13) {
      // Layer 11: Planar 'CHURA BAR — OKINAWA BEACH & DIVE CLUB' Glowing Neon Surfboard Sign!
      if (uPbrReady == 1 && abs(geomN.z) > 0.5) {
        bool isRearBar = (vWorldPos.z > 28.0);
        vec2 center = isRearBar ? vec2(6.80, 9.22) : vec2(6.60, 10.35);
        float sz = isRearBar ? 1.44 : 1.56;
        float xSign = (geomN.z < 0.0) ? -1.0 : 1.0;
        vec2 uv = vec2(0.5 + xSign * (vWorldPos.x - center.x) / sz, 0.5 - (vWorldPos.y - center.y) / sz);
        samplePlanarSignPbr(uv, geomN, 11, 0.95, albedo, roughness, pbrAo, N);
        ao = mix(0.68, 1.0, pbrAo);
        specMul = 1.05;
        // Self-luminous HDR neon bloom exclusively on the glowing cyan, pink, gold & green neon tubes!
        float maxC = max(albedo.r, max(albedo.g, albedo.b));
        float minC = min(albedo.r, min(albedo.g, albedo.b));
        float neonMask = smoothstep(0.12, 0.52, maxC) * smoothstep(0.04, 0.30, maxC - minC * 0.60);
        float flicker = 0.94 + 0.06 * sin(uTime * 4.5 + vWorldPos.x * 1.8);
        emissive = albedo * (0.14 + neonMask * 1.95 * flicker);
      } else {
        albedo = vec3(0.14, 0.08, 0.04);
        roughness = 0.38;
      }
    } else if (cId == 15) {
      // Layer 13: Planar 'KERAMA BLUE DIVE CLUB — PADI DIVE CENTER — CHURA BAR' Carved Teak Emblem!
      if (uPbrReady == 1 && abs(geomN.z) > 0.5) {
        bool isInterior = (vWorldPos.z > 28.0);
        vec2 center = isInterior ? vec2(0.55, 9.36) : vec2(-3.60, 10.35);
        float sz = isInterior ? 1.48 : 1.56;
        float xSign = (geomN.z < 0.0) ? -1.0 : 1.0;
        vec2 uv = vec2(0.5 + xSign * (vWorldPos.x - center.x) / sz, 0.5 - (vWorldPos.y - center.y) / sz);
        samplePlanarSignPbr(uv, geomN, 13, 1.25, albedo, roughness, pbrAo, N);
        ao = mix(0.65, 1.0, pbrAo);
        specMul = 1.08;
        emissive = albedo * 0.18;
      } else {
        albedo = vec3(0.22, 0.13, 0.06);
        roughness = 0.36;
      }
    } else if (cId == 19) {
      // Layer 26: ZEN University Convex Curved Wing Warm Blush-Sandstone Running-Bond Ashlar!
      vec2 stUv = (abs(geomN.y) > 0.68)
        ? vWorldPos.xz * 0.36
        : ((abs(vAttrib.z) + abs(vAttrib.w) > 0.001)
            ? vec2(vAttrib.z, -vAttrib.w)
            : vec2(((abs(geomN.x) > abs(geomN.z)) ? vWorldPos.z : vWorldPos.x) / 2.85, -(vWorldPos.y - 6.32) / 2.40));
      if (uPbrReady == 1) {
        vec4 sAlb = texture(uPbrAlbedoTex, vec3(stUv, 26.0));
        vec4 sNor = texture(uPbrNormalTex, vec3(stUv, 26.0));
        albedo = pow(clamp(sAlb.rgb, 0.0, 1.0), vec3(2.2)) * vec3(1.22, 0.95, 0.84);
        roughness = clamp(sAlb.a, 0.52, 0.88);
        ao = mix(0.56, 1.0, sNor.a);
        vec3 T_s = (abs(geomN.y) > 0.68)
          ? vec3(1.0, 0.0, 0.0)
          : normalize(vec3(geomN.z, 0.0, -geomN.x) + vec3(1e-5, 0.0, 0.0));
        vec3 B_s = normalize(cross(geomN, T_s));
        vec2 tN = (sNor.xy * 2.0 - 1.0) * 1.15;
        N = normalize(geomN + T_s * tN.x + B_s * tN.y);
      } else {
        albedo = vec3(0.72, 0.56, 0.48);
        roughness = 0.68;
      }
      specMul = 0.38;
    } else if (cId == 20) {
      // Layer 27: ZEN University 3-Story Square Architectural Glass-Block Atrium Curtain Wall!
      vec2 gbUv = (abs(vAttrib.z) + abs(vAttrib.w) > 0.001)
        ? vec2(vAttrib.z, -vAttrib.w)
        : vec2(((abs(geomN.x) > abs(geomN.z)) ? vWorldPos.z : vWorldPos.x) / 1.92, -(vWorldPos.y - 6.36) / 1.92);
      float nightGlow = clamp(uTodSunColor.w, 0.0, 1.0);
      if (uPbrReady == 1) {
        vec4 gAlb = texture(uPbrAlbedoTex, vec3(gbUv, 27.0));
        vec4 gNor = texture(uPbrNormalTex, vec3(gbUv, 27.0));
        albedo = pow(clamp(gAlb.rgb, 0.0, 1.0), vec3(2.2));
        roughness = clamp(gAlb.a, 0.05, 0.82);
        ao = mix(0.58, 1.0, gNor.a);
        vec3 T_g = normalize(vec3(geomN.z, 0.0, -geomN.x) + vec3(1e-5, 0.0, 0.0));
        vec3 B_g = normalize(cross(geomN, T_g));
        vec2 tN = (gNor.xy * 2.0 - 1.0) * 1.05;
        N = normalize(geomN + T_g * tN.x + B_g * tN.y);
      } else {
        albedo = vec3(0.62, 0.72, 0.71);
        roughness = 0.12;
      }
      float isGlassCore = 1.0 - smoothstep(0.18, 0.55, roughness);
      vec3 reflSky = evalAirPanoramaSky(normalize(reflect(-V, N)), normalize(uTodSkySunDir.xyz), uTime, uAirSkyTex, uAirSkyReady, 2.0);
      albedo = mix(albedo, reflSky * 0.85, isGlassCore * clamp(0.14 + 0.46 * fresnel, 0.0, 0.58));
      specMul = mix(0.40, 2.55, isGlassCore);
      sssCol = vec3(0.45, 0.68, 0.66) * isGlassCore * 0.36;
      emissive = mix(vec3(0.05, 0.09, 0.09), vec3(0.58, 0.52, 0.38), nightGlow) * isGlassCore;
    } else if (cId == 21) {
      // Layer 28: ZEN University 2x2 UV Atlas ('ZEN大学' Gold-on-Obsidian Plaque & Sanctuary Archive Terminal)!
      vec2 uv28 = clamp(vec2(vAttrib.z, vAttrib.w), vec2(0.004), vec2(0.996));
      bool isArchiveScreen = (uv28.x >= 0.5 && uv28.y >= 0.5);
      bool isMonumentPlaque = (uv28.x < 0.5 && uv28.y < 0.5);
      if (uPbrReady == 1) {
        vec4 aAlb = texture(uPbrAlbedoTex, vec3(uv28, 28.0));
        vec4 aNor = texture(uPbrNormalTex, vec3(uv28, 28.0));
        albedo = pow(clamp(aAlb.rgb, 0.0, 1.0), vec3(2.2));
        roughness = aAlb.a;
        ao = mix(0.75, 1.0, aNor.a);
        if (!isArchiveScreen) {
          vec3 T_a = (abs(geomN.y) > 0.65) ? vec3(1.0, 0.0, 0.0) : normalize(vec3(geomN.z, 0.0, -geomN.x) + vec3(1e-5, 0.0, 0.0));
          vec3 B_a = normalize(cross(geomN, T_a));
          vec2 tN = (aNor.xy * 2.0 - 1.0) * 0.75;
          N = normalize(geomN + T_a * tN.x + B_a * tN.y);
        }
      } else {
        albedo = isMonumentPlaque ? vec3(0.02, 0.02, 0.03) : vec3(0.04, 0.12, 0.24);
        roughness = 0.22;
      }
      if (isMonumentPlaque) {
        float goldMask = smoothstep(0.08, 0.32, albedo.r);
        albedo = mix(vec3(0.012, 0.014, 0.018), albedo * vec3(1.14, 1.04, 0.82), goldMask);
        roughness = mix(0.28, 0.11, goldMask);
        specMul = mix(0.95, 2.85, goldMask);
        emissive = albedo * goldMask * (0.14 + 0.32 * uTodSunColor.w);
      } else if (isArchiveScreen) {
        // Contemporary Art Museum Matte Archival Exhibition Wall Caption (2048x2048 Print-Grade Vector Typography, Zero Glare & Zero Scanlines!)
        vec2 capUv = clamp((uv28 - vec2(0.502)) / 0.496, vec2(0.001), vec2(0.999));
        vec3 srgbCap = (uMuseumCaptionReady == 1)
          ? texture(uMuseumCaptionTex, capUv, -0.45).rgb
          : vec3(0.96, 0.95, 0.93);
        vec3 paperLin = pow(clamp(srgbCap, vec3(0.0), vec3(1.0)), vec3(2.2));
        float cottonGrain = 0.995 + 0.010 * noise2D(vWorldPos.xy * 195.0);
        // Subtle 3-spotlight museum halogen gallery wash across the matte cotton-ivory panel (preserving deep Sumi ink blacks!)
        float spotL = exp(-dot((capUv - vec2(0.24, 0.30)) * vec2(1.8, 1.15), (capUv - vec2(0.24, 0.30)) * vec2(1.8, 1.15)));
        float spotC = exp(-dot((capUv - vec2(0.50, 0.30)) * vec2(1.8, 1.15), (capUv - vec2(0.50, 0.30)) * vec2(1.8, 1.15)));
        float spotR = exp(-dot((capUv - vec2(0.76, 0.30)) * vec2(1.8, 1.15), (capUv - vec2(0.76, 0.30)) * vec2(1.8, 1.15)));
        float galleryWash = clamp((spotL + spotC + spotR) * 0.58, 0.0, 1.0);
        albedo = paperLin * cottonGrain * (0.72 + 0.10 * galleryWash);
        roughness = 0.84;
        specMul = 0.06;
        ao = 1.0;
        emissive = paperLin * (0.05 + 0.09 * galleryWash) * vec3(1.02, 0.99, 0.94);
      } else {
        specMul = 0.45;
      }
    } else if (cId == 22) {
      // ZEN University 3F East Wing Fine Sand-Beige Architectural Border Tile (Crisp running bond + zero mip bleed!)
      float uHoriz = (abs(geomN.x) > abs(geomN.z)) ? vWorldPos.z : vWorldPos.x;
      float rowF = vWorldPos.y * 14.5;
      float rowId = floor(rowF);
      float fy = fract(rowF);
      float colF = uHoriz * 4.15 + mod(rowId, 2.0) * 0.5;
      float colId = floor(colF);
      float fx = fract(colF);
      float tHash = fract(sin(dot(vec2(colId, rowId), vec2(127.1, 311.7))) * 43758.5453);
      float mY = 1.0 - smoothstep(0.06, 0.14, min(fy, 1.0 - fy));
      float mX = 1.0 - smoothstep(0.025, 0.06, min(fx, 1.0 - fx));
      float isFlatTop = smoothstep(0.68, 0.92, abs(geomN.y));
      float mortar = clamp(max(mY, mX) * (1.0 - isFlatTop * 0.85), 0.0, 1.0);
      vec3 tileBase = mix(vec3(0.64, 0.51, 0.36), vec3(0.74, 0.61, 0.45), tHash);
      if (uPbrReady == 1) {
        vec3 stG; float stR, stAo; vec3 stN;
        sampleTriplanarPbr(vWorldPos, geomN, 6, 1.35, 0.45, stG, stR, stAo, stN);
        tileBase *= mix(0.90, 1.10, clamp(dot(stG, vec3(0.333)) * 1.3, 0.0, 1.0));
        N = stN;
      }
      albedo = mix(tileBase, vec3(0.34, 0.28, 0.22), mortar * 0.78);
      roughness = mix(0.46, 0.86, mortar);
      ao = mix(1.0, 0.58, mortar);
      specMul = 0.56;
      float bev = (fy < 0.14 ? -1.0 : (fy > 0.86 ? 1.0 : 0.0)) * mY * (1.0 - isFlatTop);
      N = normalize(N + vec3(0.0, bev * 0.26, 0.0));
    } else if (cId == 23) {
      // ZEN University Brushed Anodized Silver-Aluminum Eaves, Radial Louver Fins, Cylindrical Portico Columns & Interior White Columns!
      if (vAttrib.w > 0.75) {
        // Clean satin-white interior architectural columns, ceilings & seminar walls
        albedo = vec3(0.86, 0.87, 0.88);
        roughness = 0.44;
        specMul = 0.52;
      } else if (vAttrib.w > 0.35) {
        // Bright silver-champagne portico ceiling soffit
        albedo = vec3(0.72, 0.74, 0.77);
        roughness = 0.24;
        specMul = 1.55;
      } else {
        // Satin clear-anodized architectural aluminum fascia, radial fins, columns & door mullions
        float brushed = 0.96 + 0.04 * sin((vWorldPos.x + vWorldPos.z) * 90.0 + vWorldPos.y * 40.0);
        albedo = vec3(0.56, 0.59, 0.63) * brushed;
        roughness = 0.19;
        specMul = 2.05;
      }
    } else if (cId == 24) {
      // ZEN University Matte Charcoal-Black Steel & Bay-Window Mullions / Dry-Area Pipe Railings!
      albedo = vec3(0.048, 0.054, 0.064);
      roughness = 0.22;
      specMul = 1.68;
    } else if (cId == 25) {
      // ZEN University Architectural Glazing (0.0 = Curved Mint-Celadon Ribbon Glass, 0.5 = Bay/Terrace Tinted Glass, 0.85 = Clear Vestibule Glass)
      vec3 reflSky = evalAirPanoramaSky(normalize(reflect(-V, geomN)), normalize(uTodSkySunDir.xyz), uTime, uAirSkyTex, uAirSkyReady, 1.5);
      float nightW = clamp(uTodSunColor.w, 0.0, 1.0);
      if (vAttrib.w < 0.35) {
        // Curved wing 1F/2F translucent mint-celadon ribbon window with subtle vertical glazing joints & venetian blind backing!
        float blind = 0.96 + 0.04 * sin(vWorldPos.y * 135.0);
        float seam = 1.0 - smoothstep(0.0, 0.014, min(fract(vAttrib.z), 1.0 - fract(vAttrib.z)));
        vec3 celadon = vec3(0.62, 0.73, 0.69) * blind;
        celadon = mix(celadon, vec3(0.28, 0.34, 0.33), seam * 0.65);
        albedo = mix(celadon, reflSky * 0.88, clamp(0.16 + 0.52 * fresnel, 0.0, 0.68));
        roughness = mix(0.045, 0.35, seam);
        specMul = 2.75;
        emissive = mix(vec3(0.03, 0.05, 0.045), vec3(0.42, 0.44, 0.36), nightW) * (1.0 - seam * 0.5);
      } else if (vAttrib.w < 0.72) {
        // East wing 2-story trapezoidal bay window & 2F recessed terrace door glass
        vec3 deepGlass = vec3(0.08, 0.12, 0.13);
        albedo = mix(deepGlass, reflSky * 0.55, clamp(0.14 + 0.52 * fresnel, 0.0, 0.65));
        roughness = 0.035;
        specMul = 2.95;
        emissive = vec3(0.52, 0.36, 0.18) * nightW * 0.62 + vec3(0.05, 0.07, 0.08) * fresnel;
      } else if (vAttrib.w < 0.82) {
        // Frosted Satin-Milk Architectural Privacy Glass ('すりガラス' on South Clubhouse Auto-Door — 100% hides ocean spoiler until opened!)
        float frostGrain = noise2D(vWorldPos.xy * 85.0 + vWorldPos.z * 85.0);
        vec3 frostedCol = mix(vec3(0.75, 0.80, 0.81), vec3(0.84, 0.88, 0.89), frostGrain);
        albedo = frostedCol;
        roughness = 0.34;
        specMul = 0.95;
        emissive = mix(vec3(0.11, 0.12, 0.11), vec3(0.24, 0.19, 0.12), nightW);
      } else if (vAttrib.w < 0.92) {
        // Entrance & exterior tinted glazing (opaque fallback)
        vec3 vestibuleTint = vec3(0.32, 0.38, 0.37);
        albedo = mix(vestibuleTint, reflSky * 0.52, clamp(0.15 + 0.48 * fresnel, 0.0, 0.62));
        roughness = 0.032;
        specMul = 2.90;
        emissive = vec3(0.06, 0.08, 0.08) * fresnel + vec3(0.26, 0.23, 0.18) * nightW * 0.42;
      } else {
        // True Alpha-Blended Low-Iron Architectural Clear Glass ('zen_campus_glass', isGlass: true)!
        vec3 lowIronTint = vec3(0.58, 0.74, 0.73);
        albedo = mix(lowIronTint, reflSky * 0.72, clamp(0.18 + 0.54 * fresnel, 0.0, 0.72));
        roughness = 0.028;
        specMul = 2.75;
        emissive = vec3(0.04, 0.06, 0.06) * fresnel;
        outAlpha = clamp(0.075 + fresnel * 0.40, 0.075, 0.50);
      }
    } else if (cId == 26) {
      // Bright Safety-Yellow Tactile Paving Blocks ('点字ブロック': 0.0 = Directional Bar Ribs, 1.0 = Warning Stud Blisters!)
      vec2 tileUv = fract(vWorldPos.xz / 0.30);
      float seam = 1.0 - smoothstep(0.02, 0.055, min(min(tileUv.x, 1.0 - tileUv.x), min(tileUv.y, 1.0 - tileUv.y)));
      float bump = 0.0;
      vec2 bGrad = vec2(0.0);
      if (vAttrib.w > 0.5) {
        // 5x5 warning blister dots ('点状ブロック')
        vec2 g5 = tileUv * 5.0;
        vec2 f5 = fract(g5) - 0.5;
        float r5 = length(f5);
        bump = (1.0 - smoothstep(0.18, 0.34, r5)) * (1.0 - seam);
        if (r5 > 0.01 && r5 < 0.36) bGrad = (f5 / r5) * bump * 0.45;
      } else if (vAttrib.z > 0.5) {
        // East-West directional ribs
        float ry = sin(tileUv.y * 4.0 * 6.2831853);
        bump = smoothstep(0.1, 0.85, ry) * step(0.10, tileUv.x) * step(tileUv.x, 0.90) * (1.0 - seam);
        bGrad = vec2(0.0, cos(tileUv.y * 4.0 * 6.2831853) * 0.38 * (1.0 - seam));
      } else {
        // North-South directional ribs ('線状ブロック')
        float rx = sin(tileUv.x * 4.0 * 6.2831853);
        bump = smoothstep(0.1, 0.85, rx) * step(0.10, tileUv.y) * step(tileUv.y, 0.90) * (1.0 - seam);
        bGrad = vec2(cos(tileUv.x * 4.0 * 6.2831853) * 0.38 * (1.0 - seam), 0.0);
      }
      vec3 yelBase = mix(vec3(0.86, 0.66, 0.04), vec3(0.96, 0.78, 0.07), bump);
      albedo = mix(yelBase, vec3(0.52, 0.42, 0.08), seam * 0.65);
      roughness = mix(0.42, 0.72, seam);
      ao = mix(0.86, 1.0, bump) * (1.0 - seam * 0.25);
      specMul = 0.72;
      N = normalize(geomN + vec3(-bGrad.x, 0.0, -bGrad.y));
    } else if (cId == 27) {
      // ZEN University Plaza Brick Pavers (w<0.35), Forecourt Crazy-Paved Quartzite (w<0.70), & East-Wing Terracotta Stucco (w>=0.70)!
      if (vAttrib.w < 0.35) {
        // Interlocking warm taupe-terracotta approach plaza brick pavers
        float rZ = floor(vWorldPos.z / 0.12);
        float fz = fract(vWorldPos.z / 0.12);
        float cX = vWorldPos.x / 0.24 + mod(rZ, 2.0) * 0.5;
        float fx = fract(cX);
        float bh = fract(sin(dot(vec2(floor(cX), rZ), vec2(127.1, 311.7))) * 43758.5453);
        float jt = 1.0 - smoothstep(0.04, 0.11, min(min(fx, 1.0 - fx), min(fz, 1.0 - fz)));
        vec3 brk = mix(vec3(0.48, 0.39, 0.34), vec3(0.60, 0.49, 0.42), bh);
        albedo = mix(brk, vec3(0.32, 0.28, 0.25), jt * 0.75);
        roughness = mix(0.68, 0.88, jt);
        ao = mix(1.0, 0.65, jt);
        specMul = 0.34;
      } else if (vAttrib.w < 0.70) {
        // Crazy-paved natural buff quartzite stone apron right under the entrance portico!
        vec2 qUv = vec2(0.02 + fract(vWorldPos.x * 0.32) * 0.46, 0.52 + fract(vWorldPos.z * 0.32) * 0.46);
        if (uPbrReady == 1) {
          vec4 qAlb = textureLod(uPbrAlbedoTex, vec3(qUv, 28.0), 0.0);
          albedo = pow(clamp(qAlb.rgb, 0.0, 1.0), vec3(2.2));
          roughness = 0.60;
        } else {
          albedo = vec3(0.72, 0.66, 0.56);
          roughness = 0.64;
        }
        specMul = 0.42;
      } else {
        // Warm terracotta-russet architectural accent wall on lower/inner East Wing!
        float grain = noise2D(vWorldPos.xy * 18.0 + vWorldPos.z * 18.0);
        albedo = mix(vec3(0.48, 0.17, 0.085), vec3(0.58, 0.22, 0.11), grain);
        roughness = 0.72;
        specMul = 0.28;
      }
    } else if (cId == 28) {
      // ZEN University Planter Dark Bark-Chip Mulch Soil (w<0.45) & Deep-Shadow Interior Shrub Core (w>=0.45)!
      if (vAttrib.w < 0.45) {
        float chipA = noise2D(vWorldPos.xz * 22.0);
        float chipB = noise2D(vWorldPos.xz * 58.0 + vec2(4.3, 1.9));
        vec3 humus = mix(vec3(0.022, 0.014, 0.009), vec3(0.058, 0.036, 0.021), chipA * 0.62 + chipB * 0.38);
        if (uPbrReady == 1) {
          vec3 mAlb; float mR, mAo; vec3 mNor;
          sampleTriplanarPbr(vWorldPos, geomN, 25, 2.4, 0.85, mAlb, mR, mAo, mNor);
          humus *= mix(0.75, 1.25, clamp(dot(mAlb, vec3(0.333)) * 1.6, 0.0, 1.0));
          N = mNor;
        }
        albedo = humus;
        roughness = 0.90;
        ao = mix(0.62, 0.94, chipA);
        specMul = 0.12;
      } else {
        // Recessed deep-shadow interior shrub core tucked strictly inside 3D botanical leaf sprays (zero plastic sheen!)
        float shN = noise2D(vWorldPos.xz * 28.0 + vWorldPos.y * 26.0);
        albedo = mix(vec3(0.010, 0.038, 0.009), vec3(0.028, 0.086, 0.018), shN);
        roughness = 0.86;
        ao = 0.46;
        sssCol = vec3(0.02, 0.06, 0.01) * 0.18;
        specMul = 0.08;
      }
    } else if (cId == 29) {
      // ZEN University Authentic Zushi Campus Interior Finishes (入江三宅設計事務所: Limestone, Blonde Oak, Gallery Plaster, Whiteboard & Books)!
      if (vAttrib.w < 0.20) {
        // 1) Honed 60x60cm Warm-Ivory Limestone Architectural Lobby & Atrium Floor Tile!
        vec2 tGrid = vWorldPos.xz / 0.60;
        vec2 tId = floor(tGrid);
        vec2 tf = fract(tGrid);
        float tHash = fract(sin(dot(tId, vec2(127.1, 311.7))) * 43758.5453);
        float grout = 1.0 - smoothstep(0.010, 0.026, min(min(tf.x, 1.0 - tf.x), min(tf.y, 1.0 - tf.y)));
        float vein = noise2D(vWorldPos.xz * 4.8 + tId * 1.7) * 0.5 + noise2D(vWorldPos.xz * 18.0) * 0.5;
        vec3 stoneCol = mix(vec3(0.74, 0.70, 0.63), vec3(0.83, 0.79, 0.72), tHash * 0.55 + vein * 0.45);
        albedo = mix(stoneCol, vec3(0.52, 0.49, 0.44), grout * 0.72);
        roughness = mix(0.22, 0.68, grout);
        ao = mix(1.0, 0.78, grout);
        specMul = 1.32;
      } else if (vAttrib.w < 0.40) {
        // 2) Natural Blonde Japanese White-Oak Wide-Plank Flooring, Open-Riser Stairs, Acoustic Slats & Seminar Desks!
        bool isHoriz = (abs(geomN.y) > 0.65);
        float pCoord = isHoriz ? (vWorldPos.x / 0.18) : ((abs(geomN.x) > abs(geomN.z) ? vWorldPos.z : vWorldPos.x) / 0.16);
        float pId = floor(pCoord);
        float pf = fract(pCoord);
        float lenCoord = isHoriz ? (vWorldPos.z / 1.45 + mod(pId, 3.0) * 0.33) : (vWorldPos.y / 1.80);
        float lf = fract(lenCoord);
        float pHash = fract(sin(dot(vec2(pId, floor(lenCoord)), vec2(127.1, 311.7))) * 43758.5453);
        float grain = sin((isHoriz ? vWorldPos.z : vWorldPos.y) * 42.0 + noise2D(vWorldPos.xz * 14.0 + vWorldPos.y * 12.0) * 4.5) * 0.5 + 0.5;
        float seam = isHoriz
          ? (1.0 - smoothstep(0.015, 0.045, min(min(pf, 1.0 - pf), min(lf, 1.0 - lf) * 5.0)))
          : 0.0;
        vec3 oakBase = mix(vec3(0.64, 0.47, 0.28), vec3(0.77, 0.59, 0.37), pHash * 0.55 + grain * 0.45);
        albedo = mix(oakBase, vec3(0.38, 0.27, 0.16), seam * 0.65);
        roughness = mix(0.27, 0.62, seam);
        ao = mix(1.0, 0.80, seam);
        specMul = 1.05;
      } else if (vAttrib.w < 0.60) {
        // 3) Warm Gallery Off-White Architectural Plaster Interior Walls, Columns & Coffered Ceilings!
        float micro = noise2D(vWorldPos.xz * 32.0 + vWorldPos.y * 32.0);
        albedo = mix(vec3(0.87, 0.85, 0.81), vec3(0.92, 0.90, 0.87), micro);
        roughness = 0.50;
        specMul = 0.42;
        // Dedicated 3-Track-Spotlight Gallery Wash + Floating Plaque Standoff Drop-Shadow on Exhibition Wall (z ≈ 36.59)
        if (geomN.z > 0.70 && abs(vWorldPos.z - 36.59) < 0.032 && vWorldPos.x > -3.55 && vWorldPos.x < 0.35 && vWorldPos.y > 6.54 && vWorldPos.y < 9.14) {
          float coneL = exp(-pow((vWorldPos.x - (-2.25)) / 0.52, 2.0)) * exp(-pow((vWorldPos.y - 8.05) / 0.96, 2.0));
          float coneC = exp(-pow((vWorldPos.x - (-1.60)) / 0.52, 2.0)) * exp(-pow((vWorldPos.y - 8.05) / 0.96, 2.0));
          float coneR = exp(-pow((vWorldPos.x - (-0.95)) / 0.52, 2.0)) * exp(-pow((vWorldPos.y - 8.05) / 0.96, 2.0));
          float trackWash = clamp((coneL + coneC + coneR) * 0.72, 0.0, 1.0);
          vec2 dPlaque = abs(vec2(vWorldPos.x - (-1.60), vWorldPos.y - 7.736)) - vec2(0.843, 0.563);
          float boxDist = length(max(dPlaque, 0.0)) + min(max(dPlaque.x, dPlaque.y), 0.0);
          float standoffShadow = (1.0 - smoothstep(-0.004, 0.042, boxDist)) * 0.48
                               + (1.0 - smoothstep(0.0, 0.135, boxDist)) * 0.16;
          albedo *= mix(0.82, 0.96, trackWash) * (1.0 - standoffShadow * 0.65);
          ao *= (1.0 - standoffShadow * 0.55);
          roughness = 0.68;
          specMul = 0.18;
          emissive += vec3(0.11, 0.098, 0.082) * trackWash * (1.0 - standoffShadow);
        }
      } else if (vAttrib.w < 0.80) {
        if (vAttrib.z > 0.5) {
          // 4A) Broadcast Studio & Seminar Slate-Sage Acoustic Absorption Fabric Panels!
          float rib = 0.94 + 0.06 * sin((vWorldPos.x + vWorldPos.z) * 140.0);
          albedo = vec3(0.24, 0.30, 0.34) * rib;
          roughness = 0.82;
          specMul = 0.22;
        } else {
          // 4B) Illuminated Glass Whiteboard & 16:9 Minerva / Broadcast Lecture Projection Display!
          vec2 gUv = fract(vec2((vWorldPos.x + vWorldPos.z) * 2.5, vWorldPos.y * 2.5));
          float gridLine = 1.0 - smoothstep(0.0, 0.03, min(gUv.x, gUv.y));
          albedo = mix(vec3(0.90, 0.94, 0.97), vec3(0.68, 0.78, 0.88), gridLine * 0.35);
          roughness = 0.08;
          specMul = 2.15;
          emissive = vec3(0.18, 0.22, 0.26);
        }
      } else {
        if (vAttrib.z < 0.28) {
          // 5A) Shonan Coastal Ocean-Teal Ergonomic Chair Upholstery
          float weave = 0.95 + 0.05 * sin(vWorldPos.x * 180.0) * cos(vWorldPos.z * 180.0);
          albedo = vec3(0.13, 0.36, 0.43) * weave;
          roughness = 0.66;
          specMul = 0.32;
        } else if (vAttrib.z < 0.60) {
          // 5B) Warm Sand-Oatmeal Boucle Campus Lounge Bench Upholstery
          float weave = 0.94 + 0.06 * noise2D(vWorldPos.xz * 95.0 + vWorldPos.y * 95.0);
          albedo = vec3(0.74, 0.68, 0.59) * weave;
          roughness = 0.74;
          specMul = 0.26;
        } else {
          // 5C) Procedural Academic Library Hardcover Book Spine Rows!
          float bkCoord = vWorldPos.z * 27.0 + floor(vWorldPos.y * 2.2) * 7.3;
          float bkId = floor(bkCoord);
          float bkf = fract(bkCoord);
          float h1 = fract(sin(bkId * 127.1) * 43758.5453);
          float h2 = fract(sin(bkId * 311.7) * 24634.6345);
          float gap = 1.0 - smoothstep(0.04, 0.11, min(bkf, 1.0 - bkf));
          vec3 spineCol = (h1 < 0.22) ? vec3(0.10, 0.18, 0.34)
                        : (h1 < 0.42) ? vec3(0.46, 0.14, 0.16)
                        : (h1 < 0.60) ? vec3(0.16, 0.32, 0.24)
                        : (h1 < 0.78) ? vec3(0.72, 0.56, 0.26)
                        : vec3(0.78, 0.75, 0.68);
          float titleBand = smoothstep(0.62, 0.65, fract(vWorldPos.y * 2.17)) * (1.0 - smoothstep(0.72, 0.75, fract(vWorldPos.y * 2.17)));
          spineCol = mix(spineCol * (0.85 + 0.3 * h2), vec3(0.88, 0.82, 0.62), titleBand * 0.65);
          albedo = mix(spineCol, vec3(0.08, 0.07, 0.06), gap * 0.85);
          roughness = mix(0.46, 0.85, gap);
          ao = mix(1.0, 0.55, gap);
          specMul = 0.48;
        }
      }
    } else if (cId == 30) {
      // Deep Overgrown Zushi Woodland ('うっそうとした森': Furrowed Mossy Bark, Japanese Cedar Needles & Camphor/Keyaki Broadleaf Canopy!)
      if (vAttrib.w < 0.30) {
        // 1) Furrowed Mossy Japanese Cedar & Keyaki Trunk Bark
        float barkN = noise2D(vec2((vWorldPos.x + vWorldPos.z) * 18.0, vWorldPos.y * 5.5));
        float mossPatch = smoothstep(0.42, 0.78, noise2D(vWorldPos.xz * 3.2 + vWorldPos.y * 1.4)) * (1.0 - smoothstep(7.0, 11.5, vWorldPos.y));
        vec3 barkBase = mix(vec3(0.095, 0.058, 0.036), vec3(0.185, 0.118, 0.072), barkN);
        if (uPbrReady == 1) {
          vec3 bAlb; float bR, bAo; vec3 bNor;
          sampleTriplanarPbr(vWorldPos, geomN, 25, 1.35, 1.15, bAlb, bR, bAo, bNor);
          barkBase *= mix(0.68, 1.25, clamp(dot(bAlb, vec3(0.333)) * 1.6, 0.0, 1.0));
          N = bNor;
        }
        albedo = mix(barkBase, vec3(0.045, 0.145, 0.032), mossPatch * 0.68);
        roughness = 0.86;
        ao = 0.78;
        specMul = 0.18;
      } else if (vAttrib.w < 0.70) {
        // 2) Deep Shadowy Japanese Cedar / Hinoki Conifer Needles ('スギ・ヒノキ林' with crisp botanical normal detail!)
        float needleMacro = noise2D(vWorldPos.xz * 6.5 + vWorldPos.y * 5.8);
        float needleMed   = noise2D(vWorldPos.xz * 22.0 - vWorldPos.y * 19.0);
        float needleMicro = noise2D(vWorldPos.xz * 64.0 + vWorldPos.y * 58.0);
        vec3 leafPerturb = vec3(
          sin(vWorldPos.x * 38.0 + needleMed * 5.0) * cos(vWorldPos.y * 34.0),
          cos(vWorldPos.z * 36.0 - needleMacro * 4.0) * 0.65,
          cos(vWorldPos.z * 38.0 + needleMed * 5.0) * sin(vWorldPos.y * 34.0)
        );
        N = normalize(geomN + leafPerturb * 0.58);
        float upShade = clamp(N.y * 0.5 + 0.5, 0.0, 1.0);
        float clump = needleMacro * 0.45 + needleMed * 0.35 + needleMicro * 0.20;
        albedo = mix(vec3(0.008, 0.036, 0.014), vec3(0.048, 0.155, 0.038), clump * (0.35 + 0.65 * upShade));
        roughness = 0.86;
        ao = mix(0.26, 0.92, upShade) * mix(0.65, 1.0, needleMed);
        sssCol = vec3(0.03, 0.11, 0.02) * 0.24;
        specMul = 0.08;
      } else {
        // 3) Lush Broadleaf Camphor / Keyaki / Evergreen Oak Canopy & Woodland Ferns ('楠・欅・シダ下草' — zero plastic shine!)
        float leafMacro = noise2D(vWorldPos.xz * 4.8 + vWorldPos.y * 4.5);
        float leafMed   = noise2D(vWorldPos.xz * 18.0 + vWorldPos.y * 16.0);
        float leafMicro = noise2D(vWorldPos.xz * 54.0 - vWorldPos.y * 48.0);
        vec3 leafPerturb = vec3(
          sin(vWorldPos.x * 29.0 + leafMed * 5.5) * cos(vWorldPos.z * 27.0),
          sin(vWorldPos.y * 28.0 + leafMacro * 4.5) * 0.55,
          cos(vWorldPos.z * 29.0 - leafMed * 5.5) * sin(vWorldPos.x * 27.0)
        );
        N = normalize(geomN + leafPerturb * 0.62);
        float upShade = clamp(N.y * 0.5 + 0.5, 0.0, 1.0);
        float clump = leafMacro * 0.42 + leafMed * 0.36 + leafMicro * 0.22;
        albedo = mix(vec3(0.012, 0.052, 0.012), vec3(0.095, 0.235, 0.032), clump * (0.32 + 0.68 * upShade));
        roughness = 0.84;
        ao = mix(0.30, 0.95, upShade) * mix(0.62, 1.0, leafMed);
        sssCol = vec3(0.07, 0.20, 0.022) * 0.34;
        specMul = 0.10;
      }
    } else if (cId == 31) {
      // Layer 29: Seamless Japanese Maple / Ash / Keyaki Botanical Bark (Cylindrical UV + Tangent Normal + Root Moss AO!)
      float tNorm = clamp(vAttrib.z, 0.0, 1.0);
      float arcV  = vAttrib.w * 1.45;
      vec3 radDir = normalize(vec3(geomN.x, 0.0, geomN.z) + vec3(1e-5, 0.0, 0.0));
      float uCyl1 = fract(atan(radDir.z, radDir.x) * 0.15915494 + 0.5);
      float uCyl2 = fract(uCyl1 + 0.5);
      vec2 du1 = vec2(dFdx(uCyl1), dFdy(uCyl1));
      vec2 du2 = vec2(dFdx(uCyl2), dFdy(uCyl2));
      vec2 du  = (dot(du1, du1) < dot(du2, du2)) ? du1 : du2;
      vec2 dv  = vec2(dFdx(arcV), dFdy(arcV));

      float rootDamp   = 1.0 - 0.26 * (1.0 - smoothstep(0.0, 0.14, tNorm));
      float crownShade = 1.0 - 0.24 * smoothstep(0.78, 1.0, tNorm);
      float rootMoss   = (1.0 - smoothstep(0.0, 0.16, tNorm)) * smoothstep(0.38, 0.76, noise2D(vWorldPos.xz * 9.0 + vWorldPos.y * 5.0));

      if (uPbrReady == 1) {
        vec4 bAlb = textureGrad(uPbrAlbedoTex, vec3(uCyl1, arcV, 29.0), vec2(du.x, dv.x), vec2(du.y, dv.y));
        vec4 bNor = textureGrad(uPbrNormalTex, vec3(uCyl1, arcV, 29.0), vec2(du.x, dv.x), vec2(du.y, dv.y));
        albedo = pow(clamp(bAlb.rgb, 0.0, 1.0), vec3(2.2));
        // Smooth silver-ash grey-taupe Japanese Maple trunk -> warm olive-bronze young twigs toward upper crown
        vec3 twigTint = mix(vec3(0.94, 0.91, 0.86), vec3(0.72, 0.62, 0.44), smoothstep(0.68, 1.0, tNorm));
        albedo = mix(albedo * twigTint * rootDamp, vec3(0.055, 0.155, 0.038), rootMoss * 0.55);
        roughness = clamp(bAlb.a, 0.56, 0.92);
        ao = mix(0.46, 1.0, bNor.a) * crownShade;

        vec3 T_cyl = normalize(vec3(-radDir.z, 0.0, radDir.x));
        vec3 B_cyl = normalize(cross(geomN, T_cyl));
        vec3 tN = bNor.xyz * 2.0 - 1.0;
        N = normalize(geomN + T_cyl * (tN.x * 1.15) + B_cyl * (tN.y * 1.25));
      } else {
        albedo = mix(vec3(0.26, 0.23, 0.20), vec3(0.18, 0.15, 0.11), tNorm) * rootDamp;
        roughness = 0.78;
        ao = crownShade;
      }
      specMul = 0.28;
    } else if (cId >= 32 && cId <= 34) {
      // Layers 30..32: Botanical Alpha-Cutout Sprays (32 = Japanese Maple Branch, 33 = Glossy Evergreen Azalea/Satsuki, 34 = Blooming Hirado Azalea!)
      float uSigned = clamp(vAttrib.z, -1.0, 1.0);
      float vAlong  = clamp(vAttrib.w, 0.0, 1.0);
      vec2 fUv = vec2(clamp(uSigned * 0.5 + 0.5, 0.003, 0.997), clamp(1.0 - vAlong, 0.003, 0.997));
      
      float layerF = float(cId - 2); // 32->30.0, 33->31.0, 34->32.0

      float isPetal = 0.0;
      if (uPbrReady == 1) {
        vec4 fNor = texture(uPbrNormalTex, vec3(fUv, layerF));
        if (fNor.a < 0.38) discard;
        vec4 fAlb = texture(uPbrAlbedoTex, vec3(fUv, layerF));
        albedo = pow(clamp(fAlb.rgb, 0.0, 1.0), vec3(2.2));
        roughness = clamp(fAlb.a, 0.22, 0.66);

        float spVar = noise2D(vWorldPos.xz * 2.1 + vWorldPos.y * 1.4);
        float dHillWood = length(vec2(max(0.0, max(-15.2 - vWorldPos.x, vWorldPos.x - 15.4)), max(0.0, vWorldPos.z - 61.2)));
        float deepWoodW = clamp(smoothstep(1.2, 6.8, dHillWood), 0.0, 1.0);
        if (cId == 32) {
          // Japanese Maple ('イロハモミジ'): fresh sunlit emerald-chartreuse palmate leaves with warm young shoot tips!
          float tipSun = smoothstep(0.66, 1.0, vAlong) * 0.24;
          albedo *= mix(vec3(0.90, 0.96, 0.86), vec3(1.10, 1.06, 0.90), spVar);
          albedo = mix(albedo, albedo * vec3(1.22, 1.12, 0.68), tipSun);
          albedo *= mix(vec3(1.0), vec3(0.72, 0.82, 0.68), deepWoodW);
        } else if (cId == 33) {
          // Glossy Evergreen Azalea / Satsuki / Woodland Foliage ('常緑ツツジ・サツキ・スギ枝葉')
          float tipShoot = smoothstep(0.72, 1.0, vAlong) * (0.20 * (1.0 - 0.55 * deepWoodW));
          albedo *= mix(vec3(0.84, 0.94, 0.82), vec3(1.06, 1.08, 0.92), spVar);
          albedo = mix(albedo, albedo * vec3(1.18, 1.15, 0.74), tipShoot);
          albedo *= mix(vec3(1.0), vec3(0.58, 0.74, 0.62), deepWoodW);
          roughness = clamp(roughness - 0.05 + 0.12 * deepWoodW, 0.20, 0.66);
        } else {
          // Blooming Hirado Azalea ('平戸ツツジ'): distinguish 5-petaled magenta-pink blossoms from glossy dark-green calyx leaves!
          isPetal = smoothstep(0.03, 0.20, albedo.r - albedo.g * 0.85);
          vec3 petalTint = mix(vec3(0.94, 0.86, 0.98), vec3(1.10, 0.96, 1.04), spVar);
          vec3 leafTint  = mix(vec3(0.84, 0.95, 0.82), vec3(1.04, 1.06, 0.90), spVar);
          albedo *= mix(leafTint, petalTint, isPetal);
          roughness = mix(clamp(roughness - 0.04, 0.22, 0.58), clamp(roughness, 0.28, 0.52), isPetal);
        }

        if (!gl_FrontFacing) {
          albedo *= mix(vec3(0.93, 1.01, 0.90), vec3(0.96, 0.94, 0.98), isPetal);
          roughness = clamp(roughness + 0.09, 0.26, 0.72);
        }

        vec3 upRef = (abs(geomN.y) < 0.92) ? vec3(0.0, 1.0, 0.0) : vec3(1.0, 0.0, 0.0);
        vec3 T_f = normalize(cross(upRef, geomN));
        vec3 B_f = normalize(cross(geomN, T_f));
        vec2 lN = (fNor.xy * 2.0 - 1.0) * 0.92;
        N = normalize(geomN + T_f * lN.x + B_f * lN.y);
      } else {
        albedo = (cId == 34) ? vec3(0.72, 0.12, 0.36) : vec3(0.08, 0.32, 0.05);
        roughness = 0.36;
      }

      // Natural Komorebi sunlight chlorophyll & rose-petal SSS translucency + layered spray self-AO!
      float backLit = max(0.0, dot(-geomN, uSunDir)) * 0.60 + pow(max(0.0, dot(-V, uSunDir)), 3.0) * 0.45;
      ao = mix(0.54, 1.0, smoothstep(0.0, 0.36, vAlong));
      vec3 leafSss = albedo * ((cId == 32) ? vec3(1.38, 1.48, 0.58) : vec3(1.18, 1.32, 0.55));
      vec3 petalSss = albedo * vec3(1.28, 0.88, 1.14);
      sssCol = mix(leafSss, petalSss, isPetal) * ((cId == 32 ? 0.44 : 0.30) + 0.68 * backLit);
      emissive = albedo * ((cId == 32) ? 0.08 : (0.04 + 0.05 * isPetal)) + sssCol * 0.14 * backLit;
      specMul = gl_FrontFacing ? mix(0.88, 0.68, isPetal) : 0.42;
    } else {
      // Crystal-Clear Tiled Fresh-Water Gear Rinse Basin (Refracted Mosaic Tiles + Caustics + 3D Ripple Normals!)
      vec2 relXZ = vWorldPos.xz - vec2(-8.80, 30.20);
      float rRing = length(relXZ - vec2(0.0, 0.12));
      float w1 = sin(vWorldPos.x * 16.0 + uTime * 2.8) * cos(vWorldPos.z * 15.0 - uTime * 2.3);
      float w2 = sin(rRing * 28.0 - uTime * 4.6) * exp(-rRing * 2.2);
      float dWx = 16.0 * cos(vWorldPos.x * 16.0 + uTime * 2.8) * cos(vWorldPos.z * 15.0 - uTime * 2.3) * 0.012
                + (relXZ.x / max(rRing, 0.04)) * 28.0 * cos(rRing * 28.0 - uTime * 4.6) * exp(-rRing * 2.2) * 0.016;
      float dWz = -15.0 * sin(vWorldPos.x * 16.0 + uTime * 2.8) * sin(vWorldPos.z * 15.0 - uTime * 2.3) * 0.012
                + ((relXZ.y - 0.12) / max(rRing, 0.04)) * 28.0 * cos(rRing * 28.0 - uTime * 4.6) * exp(-rRing * 2.2) * 0.016;
      N = normalize(vec3(-dWx, 1.0, -dWz));

      // Parallax-refracted blue-and-white ceramic pool mosaic tiles on the recessed basin floor (45cm deeper!)
      vec2 refrXZ = vWorldPos.xz - (V.xz / max(V.y + 0.45, 0.35)) * 0.36 + vec2(dWx, dWz) * 0.45;
      vec2 tileGrid = fract(refrXZ * 16.0);
      vec2 tileId = floor(refrXZ * 16.0);
      float grout = 1.0 - smoothstep(0.05, 0.11, min(min(tileGrid.x, 1.0 - tileGrid.x), min(tileGrid.y, 1.0 - tileGrid.y)));
      float tileHash = fract(sin(dot(tileId, vec2(127.1, 311.7))) * 43758.5453);
      vec3 tileCol = mix(vec3(0.08, 0.56, 0.78), vec3(0.24, 0.78, 0.92), tileHash);
      tileCol = mix(tileCol, vec3(0.86, 0.94, 0.98), grout * 0.82);

      // Animated fresh-water sunlight caustics + soft wall-border depth AO inside basin
      float caus = pow(0.5 + 0.5 * sin(refrXZ.x * 22.0 + sin(refrXZ.y * 19.0 + uTime * 2.4) * 1.8), 3.0);
      float wallDist = min(0.755 - abs(relXZ.x), 0.465 - abs(relXZ.y));
      float basinAo = smoothstep(-0.02, 0.16, wallDist);

      vec3 floorUnderWater = tileCol * (0.68 + 0.58 * caus) * (0.58 + 0.42 * basinAo);
      vec3 skyTint = vec3(0.42, 0.86, 0.99);
      float wFres = 0.06 + 0.68 * pow(1.0 - max(dot(N, V), 0.0), 3.5);
      albedo = mix(floorUnderWater * vec3(0.76, 0.95, 1.0), skyTint, clamp(wFres + (w1 + w2) * 0.04, 0.0, 0.85));
      roughness = 0.04;
      specMul = 2.65;
      emissive = floorUnderWater * 0.14;
    }
  }
${Hs}
`,d0=`${Ws}
void sampleFaunaTriplanarPbr(
  vec3 lp,
  vec3 locN,
  vec3 geomN,
  int layer,
  vec2 uvFlankZY,
  vec2 uvBackXZ,
  vec2 uvFrontXY,
  bool swapFlankAxes,
  float normalStrength,
  out vec3 outLinearAlbedo,
  out float outRoughness,
  out float outAo,
  out vec3 outPerturbedWorldN
) {
  vec3 blend = pow(max(abs(locN), vec3(0.0001)), vec3(4.0));
  blend /= (blend.x + blend.y + blend.z);

  float lf = float(layer);
  vec2 uvX = swapFlankAxes
    ? vec2(lp.y * uvFlankZY.x, lp.z * uvFlankZY.y)
    : vec2(lp.z * uvFlankZY.x, lp.y * uvFlankZY.y);
  vec2 uvY = vec2(lp.x * uvBackXZ.x, lp.z * uvBackXZ.y);
  vec2 uvZ = vec2(lp.x * uvFrontXY.x, lp.y * uvFrontXY.y);

  vec4 aX = texture(uPbrAlbedoTex, vec3(uvX, lf));
  vec4 aY = texture(uPbrAlbedoTex, vec3(uvY, lf));
  vec4 aZ = texture(uPbrAlbedoTex, vec3(uvZ, lf));
  vec4 albMix = aX * blend.x + aY * blend.y + aZ * blend.z;

  vec4 nX = texture(uPbrNormalTex, vec3(uvX, lf));
  vec4 nY = texture(uPbrNormalTex, vec3(uvY, lf));
  vec4 nZ = texture(uPbrNormalTex, vec3(uvZ, lf));

  vec2 tX = (nX.xy * 2.0 - 1.0) * normalStrength;
  vec2 tY = (nY.xy * 2.0 - 1.0) * normalStrength;
  vec2 tZ = (nZ.xy * 2.0 - 1.0) * normalStrength;

  vec3 locFlank = swapFlankAxes
    ? vec3(0.0, tX.x * sign(uvFlankZY.x), tX.y * sign(uvFlankZY.y))
    : vec3(0.0, -tX.y * sign(uvFlankZY.y), tX.x * sign(uvFlankZY.x));
  vec3 locBack  = vec3(tY.x * sign(uvBackXZ.x), 0.0, tY.y * sign(uvBackXZ.y));
  vec3 locFront = vec3(tZ.x * sign(uvFrontXY.x), -tZ.y * sign(uvFrontXY.y), 0.0);

  vec3 locPerturb = locFlank * blend.x + locBack * blend.y + locFront * blend.z;
  vec3 worldPerturb = vModelAxisX * locPerturb.x
                    + vModelAxisY * locPerturb.y
                    + vModelAxisZ * locPerturb.z;

  outLinearAlbedo = pow(clamp(albMix.rgb, 0.0, 1.0), vec3(2.2));
  outRoughness = albMix.a;
  outAo = nX.a * blend.x + nY.a * blend.y + nZ.a * blend.z;
  outPerturbedWorldN = normalize(geomN + worldPerturb);
}
void sampleDorsalCarapacePbr(
  vec2 uv,
  vec3 geomN,
  int layer,
  float normalStrength,
  out vec3 outLinearAlbedo,
  out float outRoughness,
  out float outAo,
  out vec3 outPerturbedWorldN
) {
  vec2 cUv = clamp(uv, vec2(0.012), vec2(0.988));
  float lf = float(layer);
  vec4 alb = texture(uPbrAlbedoTex, vec3(cUv, lf));
  vec4 nor = texture(uPbrNormalTex, vec3(cUv, lf));
  vec2 t = (nor.xy * 2.0 - 1.0) * normalStrength;
  vec3 worldPerturb = vModelAxisX * t.x - vModelAxisZ * t.y;
  outLinearAlbedo = pow(clamp(alb.rgb, 0.0, 1.0), vec3(2.2));
  outRoughness = alb.a;
  outAo = nor.a;
  outPerturbedWorldN = normalize(geomN + worldPerturb);
}
vec3 shadeOkinawaFauna(
  float variantVal,
  vec3 lp,
  vec3 locN,
  vec3 geomN,
  float fresnel,
  out float outRoughness,
  out float outAo,
  out float outSpecMul,
  out vec3 outSss,
  out vec3 outPerturbedN
) {
  outRoughness = 0.34;
  outAo = 1.0;
  outSpecMul = 0.95;
  outSss = vec3(0.0);
  outPerturbedN = geomN;

  // === 0. Wet Glossy 3D Anatomical Eyeballs for All 7 Marine Species (variant = 10..16)! ===
  if (variantVal >= 9.5) {
    int eyeSp = int(variantVal - 10.0 + 0.5);
    float cDot = clamp(vAttrib.w, 0.0, 1.0); // 1.0 = center of outward pupil, ~0.64 = iris ring, <0.42 = eye socket rim
    float radial = atan(locN.y, locN.z) * 14.0;
    float irisFibers = 0.80 + 0.20 * sin(radial + sin(radial * 2.3) * 0.7);

    vec3 irisCol = vec3(0.42, 0.32, 0.16);
    float pupilThresh = 0.74;
    if (eyeSp == 0) {
      // Manta Ray: deep bronze-slate iris with silver inner limbal ring
      irisCol = vec3(0.24, 0.26, 0.30) * irisFibers;
      pupilThresh = 0.73;
    } else if (eyeSp == 1) {
      // Green Sea Turtle: warm dark mahogany-chestnut iris with golden-amber flecks!
      irisCol = mix(vec3(0.16, 0.09, 0.04), vec3(0.58, 0.38, 0.12), irisFibers * smoothstep(0.46, 0.70, cDot));
      pupilThresh = 0.72;
    } else if (eyeSp == 2) {
      // Whitetip Reef Shark: fierce pale brass-gold elasmobranch iris!
      irisCol = vec3(0.76, 0.68, 0.38) * irisFibers;
      pupilThresh = 0.77;
    } else if (eyeSp == 3) {
      // Napoleon Wrasse: vibrant emerald-turquoise & 24k-gold ringed movable eye!
      float innerGold = smoothstep(0.58, 0.70, cDot);
      irisCol = mix(vec3(0.04, 0.56, 0.52), vec3(0.95, 0.72, 0.14), innerGold) * irisFibers;
      pupilThresh = 0.76;
    } else if (eyeSp == 4) {
      // Gurukun: bright metallic silver-cyan guanine iris!
      irisCol = vec3(0.62, 0.88, 0.96) * irisFibers;
      pupilThresh = 0.72;
    } else if (eyeSp == 5) {
      // Ocellaris Clownfish: luminous fiery tangerine-orange iris ring!
      irisCol = vec3(0.96, 0.34, 0.04) * irisFibers;
      pupilThresh = 0.71;
    } else {
      // Spotted Garden Eel: large plankton-spotting pearlescent silver-white iris ring!
      irisCol = vec3(0.84, 0.88, 0.90) * irisFibers;
      pupilThresh = 0.69;
    }

    float pupilMask = smoothstep(pupilThresh - 0.035, pupilThresh + 0.025, cDot);
    float socketMask = smoothstep(0.34, 0.48, cDot);
    vec3 socketSkin = (eyeSp == 5) ? vec3(0.12, 0.04, 0.01) : vec3(0.06, 0.07, 0.06);
    vec3 pupilObsidian = vec3(0.002, 0.003, 0.006);

    vec3 eyeAlb = mix(irisCol, pupilObsidian, pupilMask);
    eyeAlb = mix(socketSkin, eyeAlb, socketMask);

    outRoughness = mix(0.42, 0.02, socketMask);
    outSpecMul = mix(0.55, 1.35, socketMask);
    outAo = mix(0.45, 1.0, socketMask);
    return eyeAlb;
  }

  int species = int(floor(variantVal + 0.05));
  float subPart = variantVal - float(species);

  // === 1. ナンヨウマンタ (Reef Manta Ray - Mobula alfredi, Layer 19 Dermal Denticles!) ===
  if (species == 0) {
    vec3 dentAlb = vec3(0.35);
    float dentR = 0.32, dentAo = 1.0;
    if (uPbrReady == 1) {
      sampleFaunaTriplanarPbr(
        lp, locN, geomN, 19,
        vec2(3.6, -3.6), vec2(3.4, -3.4), vec2(3.4, 3.4),
        true, 0.95, dentAlb, dentR, dentAo, outPerturbedN
      );
    }
    float dentMicro = clamp(dot(dentAlb, vec3(0.333)) * 2.35, 0.55, 1.38);
    float ax = abs(lp.x);
    float wingThin = smoothstep(1.15, 1.84, ax);
    outSss = vec3(0.06, 0.24, 0.34) * wingThin * 0.45;

    if (locN.y >= -0.06) {
      // Silky wet obsidian-slate dorsal back + authentic Okinawa white supra-branchial shoulder chevrons!
      vec3 dorsalDark = vec3(0.014, 0.019, 0.028) * dentMicro;
      float warp = (dentMicro - 0.95) * 0.10 + 0.03 * noise2D(lp.xz * 6.5);
      // Curved shoulder patches sweeping inward behind head while leaving dark spinal V-bar at ax < 0.11!
      float shoulder = smoothstep(0.10, 0.18, ax + warp * 0.3)
                     * (1.0 - smoothstep(0.54, 0.74, ax + warp))
                     * smoothstep(0.04, 0.18, lp.z + ax * 0.34 + warp)
                     * (1.0 - smoothstep(0.42, 0.56, lp.z - ax * 0.12 + warp));
      // Pale inner edge of curled cephalic feeding horns + subtle grey wingtip wear
      float hornInner = smoothstep(0.55, 0.85, lp.z) * (1.0 - smoothstep(0.24, 0.36, abs(ax - 0.36))) * 0.55;
      float wingTip = smoothstep(1.52, 1.84, ax) * 0.32;
      vec3 palePatch = vec3(0.76, 0.82, 0.88) * mix(0.85, 1.12, dentMicro - 0.4);

      outRoughness = mix(0.18, 0.42, dentR);
      outAo = mix(0.68, 1.0, dentAo);
      outSpecMul = 1.25;
      return mix(dorsalDark, palePatch, clamp(shoulder * 0.88 + hornInner + wingTip, 0.0, 0.95));
    } else {
      // Luminous pearl-ivory ventral belly + 5 recessed branchial gill-slit pairs + individual ID spot constellation!
      vec3 bellyBase = vec3(0.84, 0.88, 0.92) * mix(0.90, 1.06, dentMicro - 0.45);
      // 5 pairs of anatomical ventral gill slits on each side of midline
      float gillWindow = smoothstep(0.11, 0.15, ax) * (1.0 - smoothstep(0.34, 0.40, ax))
                       * smoothstep(-0.10, -0.02, lp.z) * (1.0 - smoothstep(0.32, 0.39, lp.z));
      float gillPhase = (lp.z + ax * 0.16) * 68.0;
      float gillGroove = smoothstep(0.58, 0.92, sin(gillPhase)) * gillWindow;
      if (gillGroove > 0.02) {
        outPerturbedN = normalize(outPerturbedN - vModelAxisZ * cos(gillPhase) * gillWindow * 0.65);
      }

      // Unique Reef Manta ventral melanistic ID spots (clustered between/behind gill slits)
      float sNoise = noise2D(lp.xz * 7.2 + vec2(2.1, -1.4)) * 0.68 + noise2D(lp.xz * 15.5) * 0.32;
      float spotZone = smoothstep(-0.72, -0.15, lp.z) * (1.0 - smoothstep(0.26, 0.52, lp.z)) * (1.0 - smoothstep(0.45, 0.95, ax));
      float idSpots = smoothstep(0.63, 0.73, sNoise) * spotZone;
      float marginGrey = smoothstep(1.28, 1.82, ax) * smoothstep(0.0, -0.55, lp.z) * 0.48;

      outRoughness = mix(0.22, 0.46, dentR);
      outAo = mix(0.68, 1.0, dentAo) * (1.0 - gillGroove * 0.72);
      outSpecMul = 1.05;
      vec3 col = mix(bellyBase, vec3(0.18, 0.22, 0.28), marginGrey);
      col = mix(col, vec3(0.025, 0.032, 0.045), clamp(idSpots * 0.85 + gillGroove * 0.92, 0.0, 1.0));
      return col;
    }
  }

  // === 2. アオウミガメ (Green Sea Turtle - Chelonia mydas, Layer 17 Tortoise-Shell & Layer 18 Reptilian Scales!) ===
  if (species == 1) {
    if (subPart < 0.12) {
      // Sub-part 1.0: Symmetrical Domed Dorsal Carapace Scutes (Nano Banana Layer 17!)
      vec2 shellUv = vec2(lp.x / 0.77 + 0.5, 0.5 - (lp.z + 0.02) / 0.93);
      vec3 scuteAlb = vec3(0.24, 0.15, 0.06);
      float scuteR = 0.24, scuteAo = 1.0;
      if (uPbrReady == 1) {
        sampleDorsalCarapacePbr(shellUv, geomN, 17, 1.55, scuteAlb, scuteR, scuteAo, outPerturbedN);
      }
      // Subtle Okinawa Chelonia mydas olive-amber glaze & marginal rim scute notches
      float rimDist = length(vec2(lp.x / 0.385, (lp.z + 0.02) / 0.465));
      float marginalSeam = smoothstep(0.84, 0.92, rimDist) * smoothstep(0.75, 0.96, abs(sin(atan(lp.x, lp.z + 0.02) * 12.0)));
      vec3 shellTint = mix(scuteAlb * vec3(1.06, 1.02, 0.88), scuteAlb * vec3(0.82, 0.98, 0.74), 0.24);
      shellTint *= (1.0 - marginalSeam * 0.42);

      outRoughness = mix(0.14, 0.38, scuteR);
      outAo = mix(0.46, 1.0, scuteAo) * (1.0 - marginalSeam * 0.30);
      outSpecMul = 1.52;
      return shellTint;
    }

    if (subPart < 0.38) {
      // Sub-part 1.25: Creamy-Ochre Ventral Plastron Plates!
      vec3 skAlb = vec3(0.5);
      float skR = 0.32, skAo = 1.0;
      if (uPbrReady == 1) {
        sampleFaunaTriplanarPbr(
          lp, locN, geomN, 18,
          vec2(2.2, 2.2), vec2(2.2, 2.2), vec2(2.2, 2.2),
          false, 0.45, skAlb, skR, skAo, outPerturbedN
        );
      }
      float midSeam = exp(-pow(lp.x * 42.0, 2.0));
      float crossSeam = smoothstep(0.86, 0.98, abs(sin((lp.z + 0.04) * 16.5)));
      float plastronGroove = clamp(midSeam * 0.7 + crossSeam * 0.55, 0.0, 1.0);
      vec3 plastronCol = mix(vec3(0.78, 0.72, 0.46), vec3(0.46, 0.38, 0.20), plastronGroove * 0.65);
      outRoughness = 0.28;
      outAo = (1.0 - plastronGroove * 0.35) * mix(0.78, 1.0, skAo);
      outSpecMul = 0.95;
      return plastronCol;
    }

    // Sub-part 1.5: Leathery Reptilian Flippers, Neck & Hooked-Beak Head (Nano Banana Layer 18!)
    vec3 flipAlb = vec3(0.24, 0.26, 0.16);
    float flipR = 0.34, flipAo = 1.0;
    if (uPbrReady == 1) {
      sampleFaunaTriplanarPbr(
        lp, locN, geomN, 18,
        vec2(2.85, 2.85), vec2(2.65, 2.65), vec2(2.85, 2.85),
        false, 1.55, flipAlb, flipR, flipAo, outPerturbedN
      );
    }
    // Creamy-yellow underside of neck & flippers + darker keratinous beak at snout tip (+Z)
    float underBelly = smoothstep(-0.10, -0.55, locN.y);
    float beakMask = smoothstep(0.57, 0.64, lp.z) * smoothstep(0.15, -0.35, locN.y);
    vec3 skinCol = mix(flipAlb * vec3(1.05, 1.08, 0.92), vec3(0.74, 0.69, 0.46) * (0.72 + 0.45 * dot(flipAlb, vec3(0.333))), underBelly * 0.72);
    skinCol = mix(skinCol, vec3(0.14, 0.11, 0.07), beakMask * 0.65);

    outRoughness = mix(0.22, 0.52, flipR);
    outAo = mix(0.42, 1.0, flipAo);
    outSpecMul = 1.18;
    outSss = vec3(0.18, 0.22, 0.08) * smoothstep(0.42, 0.82, abs(lp.x)) * 0.30;
    return skinCol;
  }

  // === 3. ネムリブカ (Whitetip Reef Shark - Triaenodon obesus, Layer 19 Placoid Sharkskin!) ===
  if (species == 2) {
    vec3 dentAlb = vec3(0.36);
    float dentR = 0.34, dentAo = 1.0;
    if (uPbrReady == 1) {
      sampleFaunaTriplanarPbr(
        lp, locN, geomN, 19,
        vec2(4.4, -4.4), vec2(4.4, -4.4), vec2(4.4, 4.4),
        true, 1.28, dentAlb, dentR, dentAo, outPerturbedN
      );
    }
    float dentTex = clamp(dot(dentAlb, vec3(0.333)) * 2.35, 0.58, 1.35);

    // Authentic Triaenodon obesus bronze-taupe reef back -> subtle lateral band -> pearlescent white belly!
    vec3 dorsalBronze = vec3(0.21, 0.195, 0.165) * dentTex;
    vec3 flankGrey    = vec3(0.36, 0.36, 0.34) * dentTex;
    vec3 ventralWhite = vec3(0.80, 0.83, 0.85) * mix(0.90, 1.05, dentTex - 0.45);

    float upT = clamp(locN.y, -1.0, 1.0);
    vec3 sharkCol = (upT >= 0.0)
      ? mix(flankGrey, dorsalBronze, smoothstep(0.0, 0.48, upT))
      : mix(flankGrey, ventralWhite, smoothstep(0.0, 0.42, -upT));

    // Scattered small dark dermal reef-shark freckles along flanks
    float freckle = smoothstep(0.79, 0.86, noise2D(lp.zy * 11.5 + vec2(3.7, 1.2))) * smoothstep(-0.2, 0.5, upT);
    sharkCol = mix(sharkCol, dorsalBronze * 0.42, freckle * 0.55);

    if (subPart < 0.2) {
      // 5 sharp anatomical lateral gill slits ahead of pectoral fins!
      float gillBox = smoothstep(0.25, 0.29, lp.z) * (1.0 - smoothstep(0.43, 0.47, lp.z))
                    * smoothstep(-0.055, -0.025, lp.y) * (1.0 - smoothstep(0.040, 0.068, lp.y))
                    * smoothstep(0.52, 0.78, abs(locN.x));
      float gillSin = sin(lp.z * 165.0);
      float gillSlit = smoothstep(0.62, 0.92, gillSin) * gillBox;
      if (gillSlit > 0.02) {
        outPerturbedN = normalize(outPerturbedN - vModelAxisZ * cos(lp.z * 165.0) * gillBox * 0.85);
      }
      // Ventral crescent mouth & nostrils under flattened snout
      float mouthArc = smoothstep(0.56, 0.61, lp.z + abs(lp.x) * 0.85) * (1.0 - smoothstep(0.63, 0.67, lp.z + abs(lp.x) * 0.85))
                     * smoothstep(0.11, 0.06, abs(lp.x)) * smoothstep(-0.35, -0.65, locN.y);

      sharkCol = mix(sharkCol, vec3(0.03, 0.025, 0.025), clamp(gillSlit * 0.88 + mouthArc * 0.82, 0.0, 1.0));
      outAo = mix(0.62, 1.0, dentAo) * (1.0 - gillSlit * 0.75 - mouthArc * 0.65);
    } else {
      // Sub-part 2.4: Shark Fins — Iconic Crisp Snow-White 1st Dorsal & Upper Caudal Tips!
      float tipNoise = (dentTex - 0.95) * 0.035;
      float dorsal1White = smoothstep(0.24, 0.29, lp.y + tipNoise) * smoothstep(-0.18, 0.16, lp.z);
      float caudalWhite  = smoothstep(0.18, 0.25, lp.y + tipNoise) * smoothstep(-0.74, -0.86, lp.z);
      float whiteTip = clamp(dorsal1White + caudalWhite, 0.0, 1.0);
      // Subtle dusky trailing margin on pectoral & lower fins
      float duskyEdge = smoothstep(-0.08, -0.22, lp.z) * smoothstep(0.22, 0.40, abs(lp.x)) * 0.35;
      sharkCol = mix(sharkCol * (1.0 - duskyEdge), vec3(0.95, 0.97, 0.99), whiteTip);
      outAo = mix(0.66, 1.0, dentAo);
      outSss = vec3(0.22, 0.26, 0.28) * (0.28 + 0.45 * whiteTip);
    }

    outRoughness = mix(0.22, 0.46, dentR);
    outSpecMul = 1.18;
    return sharkCol;
  }

  // === 4. メガネモチノウオ / ナポレオンフィッシュ (Humphead Wrasse - Cheilinus undulatus, Layer 21!) ===
  if (species == 3) {
    if (subPart > 0.12 && subPart < 0.30) {
      // Sub-part 3.2: Thick Fleshy Protrusible Wrasse Lips!
      float lipCrease = smoothstep(0.008, 0.0, abs(lp.y + 0.002));
      vec3 lipCol = mix(vec3(0.56, 0.74, 0.70), vec3(0.14, 0.28, 0.30), lipCrease * 0.65);
      outRoughness = 0.18;
      outSpecMul = 1.55;
      outAo = 1.0 - lipCrease * 0.45;
      outSss = vec3(0.18, 0.48, 0.44) * 0.35;
      return lipCol;
    }

    // Sample Layer 21 (Napoleon Wrasse Labyrinthine Emerald Scales; -Z is posterior scale overlap!)
    vec3 napAlb = vec3(0.08, 0.52, 0.48);
    float napR = 0.24, napAo = 1.0;
    if (uPbrReady == 1) {
      float uFreq = (subPart > 0.30) ? -4.2 : -2.45;
      float vFreq = (subPart > 0.30) ? 4.2 : 2.45;
      sampleFaunaTriplanarPbr(
        lp, locN, geomN, 21,
        vec2(uFreq, vFreq), vec2(2.45, -2.45), vec2(2.45, 2.45),
        false, (subPart > 0.30) ? 0.95 : 1.58, napAlb, napR, napAo, outPerturbedN
      );
    }

    if (subPart > 0.45) {
      // Sub-part 3.5: Broad Truncate Fan Caudal Tail Fin with Bright Golden-Yellow Posterior Margin!
      float rayWave = 0.5 + 0.5 * sin(lp.y * 135.0);
      outPerturbedN = normalize(outPerturbedN + vModelAxisY * cos(lp.y * 135.0) * 0.28);
      float yellowRim = smoothstep(-0.60, -0.66, lp.z);
      vec3 tailCol = mix(napAlb * (0.82 + 0.32 * rayWave), vec3(0.98, 0.80, 0.12), yellowRim * 0.92);
      outRoughness = 0.22;
      outSpecMul = 1.32;
      outAo = mix(0.65, 1.0, napAo);
      outSss = mix(vec3(0.06, 0.56, 0.52), vec3(0.95, 0.72, 0.10), yellowRim) * 0.58;
      return tailCol;
    }

    if (subPart > 0.30) {
      // Sub-part 3.4: Continuous Dorsal/Anal Ribbon Fins & Translucent Pectoral Fins!
      float rays = 0.78 + 0.22 * sin((lp.z + lp.y) * 140.0);
      outRoughness = 0.22;
      outSpecMul = 1.28;
      outAo = mix(0.68, 1.0, napAo);
      outSss = vec3(0.08, 0.62, 0.56) * 0.55;
      return napAlb * rays * vec3(0.92, 1.08, 1.04);
    }

    // Sub-part 3.0: Main Reef-King Scaled Body + Forehead Hump + Cheek Labyrinth & Eyeglass Stripe ('メガネ')!
    float headZone = smoothstep(0.16, 0.32, lp.z);
    // Intricate golden-olive & turquoise cheek vermiculations on head/hump
    float cheekMaze = 0.5 + 0.5 * sin(lp.z * 58.0 + sin(lp.y * 52.0 + lp.z * 18.0) * 2.8);
    vec3 headCol = mix(vec3(0.04, 0.44, 0.52), vec3(0.58, 0.68, 0.24), smoothstep(0.55, 0.85, cheekMaze) * 0.75);
    // Iconic dark 'eyeglass' post-ocular stripe running through eye at y ~ 0.115!
    float eyeLine1 = exp(-pow((lp.y - 0.112 + (lp.z - 0.36) * 0.18) * 48.0, 2.0)) * smoothstep(0.18, 0.25, lp.z) * (1.0 - smoothstep(0.45, 0.50, lp.z));
    float eyeLine2 = exp(-pow((lp.y - 0.068 + (lp.z - 0.36) * 0.22) * 52.0, 2.0)) * smoothstep(0.22, 0.28, lp.z) * (1.0 - smoothstep(0.46, 0.51, lp.z));
    headCol = mix(headCol, vec3(0.012, 0.055, 0.085), clamp(eyeLine1 + eyeLine2 * 0.8, 0.0, 0.92));

    vec3 bodyCol = mix(napAlb * vec3(0.95, 1.06, 1.04), headCol, headZone * 0.76);
    // Subtle richer royal-blue shading along upper dorsal ridge & hump
    bodyCol = mix(bodyCol, bodyCol * vec3(0.52, 0.78, 1.18), smoothstep(0.35, 0.88, locN.y) * 0.45);

    outRoughness = mix(0.16, 0.38, napR);
    outAo = mix(0.42, 1.0, napAo);
    outSpecMul = 1.48;
    outSss = vec3(0.04, 0.42, 0.46) * 0.20;
    return bodyCol;
  }

  // === 5. グルクン / タカサゴ (Okinawa Double-Lined Fusilier - Pterocaesio digramma, Layer 20 Scales!) ===
  if (species == 4) {
    vec3 scAlb = vec3(0.65);
    float scR = 0.18, scAo = 1.0;
    if (uPbrReady == 1) {
      sampleFaunaTriplanarPbr(
        lp, locN, geomN, 20,
        vec2(9.2, 9.2), vec2(9.2, -9.2), vec2(9.2, 9.2),
        false, (subPart > 0.2) ? 0.55 : 1.42, scAlb, scR, scAo, outPerturbedN
      );
    }
    float scaleSheen = clamp(dot(scAlb, vec3(0.333)) * 1.65, 0.62, 1.36);
    float az = vAttrib.w; // -1 (tail) .. +1 (snout) per individual fish!

    if (subPart > 0.2) {
      // Sub-part 4.4: Deeply Forked Scissor Caudal Fin (Crimson/Maroon Lobe Tips!) & Dorsal Fin
      float caudalMask = smoothstep(-0.78, -1.05, az);
      float lobeTip = smoothstep(-1.05, -1.36, az);
      vec3 finCol = mix(vec3(0.28, 0.72, 0.88), vec3(0.92, 0.07, 0.12), caudalMask * 0.85);
      finCol = mix(finCol, vec3(0.32, 0.015, 0.03), lobeTip * 0.78);
      outRoughness = 0.20;
      outSpecMul = 1.35;
      outAo = 0.92;
      outSss = mix(vec3(0.12, 0.55, 0.75), vec3(0.95, 0.12, 0.16), caudalMask) * 0.62;
      return finCol;
    }

    // Iridescent Kerama-cerulean dorsal -> silver-turquoise flank -> flushed rose-silver belly!
    vec3 dorsalCerulean = vec3(0.015, 0.38, 0.82) * scaleSheen;
    vec3 flankAqua      = vec3(0.22, 0.76, 0.92) * scaleSheen;
    vec3 ventralSilver  = vec3(0.72, 0.86, 0.92) * scaleSheen;

    vec3 col = (locN.y >= 0.0)
      ? mix(flankAqua, dorsalCerulean, smoothstep(0.0, 0.65, locN.y))
      : mix(flankAqua, ventralSilver, smoothstep(0.0, 0.55, -locN.y));

    // Authentic Pterocaesio digramma TWIN razor-sharp electric-yellow stripes!
    float stripeUpper = exp(-pow((locN.y - 0.64) / 0.11, 2.0));
    float stripeLat   = exp(-pow((locN.y - 0.18) / 0.095, 2.0)) * smoothstep(-0.92, -0.55, az);
    float goldMask = clamp(stripeUpper + stripeLat, 0.0, 1.0) * (1.0 - smoothstep(0.68, 0.90, az));
    col = mix(col, vec3(1.06, 0.86, 0.06) * mix(0.85, 1.18, scaleSheen - 0.5), goldMask * 0.94);

    // Curved gill operculum crease behind head
    float gillArc = exp(-pow((az - 0.46 + locN.y * locN.y * 0.12) * 22.0, 2.0)) * smoothstep(0.35, 0.75, abs(locN.x));
    col *= (1.0 - gillArc * 0.38);

    outRoughness = mix(0.12, 0.32, scR);
    outAo = mix(0.52, 1.0, scAo) * (1.0 - gillArc * 0.35);
    outSpecMul = 1.82;
    outSss = vec3(0.08, 0.48, 0.68) * 0.22;
    return col;
  }

  // === 6. カクレクマノミ (Ocellaris Clownfish - Amphiprion ocellaris, Layer 20 Scales + Black-Rimmed Fins!) ===
  if (species == 5) {
    vec3 reefTangerine = vec3(0.96, 0.23, 0.014);
    vec3 dorsalSienna  = vec3(0.62, 0.12, 0.010);
    vec3 pearlWhite    = vec3(0.95, 0.97, 1.00);
    vec3 velvetBlack   = vec3(0.008, 0.010, 0.015);

    if (subPart > 0.2) {
      // Sub-part 5.4: Rounded Translucent Fins with Authentic Black Outer Band & Sheer White Rim!
      float edgeT = clamp(vAttrib.w, 0.0, 1.0); // 0 = fin root .. 1 = outer curved perimeter
      float finRays = 0.84 + 0.16 * sin((lp.y + lp.z) * 260.0);
      outPerturbedN = normalize(geomN + vModelAxisY * cos((lp.y + lp.z) * 260.0) * 0.22);

      float blackBand = smoothstep(0.66, 0.74, edgeT) * (1.0 - smoothstep(0.89, 0.95, edgeT));
      float clearRim  = smoothstep(0.90, 0.97, edgeT);

      vec3 finCol = reefTangerine * finRays;
      finCol = mix(finCol, velvetBlack, blackBand * 0.96);
      finCol = mix(finCol, pearlWhite, clearRim * 0.82);

      outRoughness = 0.20;
      outSpecMul = 1.35;
      outAo = 0.95;
      outSss = mix(vec3(1.0, 0.32, 0.03), vec3(0.05), blackBand) * 0.68;
      return finCol;
    }

    // Sub-part 5.0: Plump Scaled Body with 3 Black-Bordered Wavy White Bars!
    vec3 scAlb = vec3(0.65);
    float scR = 0.18, scAo = 1.0;
    if (uPbrReady == 1) {
      sampleFaunaTriplanarPbr(
        lp, locN, geomN, 20,
        vec2(12.5, 12.5), vec2(12.5, -12.5), vec2(12.5, 12.5),
        false, 1.15, scAlb, scR, scAo, outPerturbedN
      );
    }
    float fineScale = clamp(dot(scAlb, vec3(0.333)) * 1.55, 0.72, 1.24);
    float az = vAttrib.w; // -1 (tail peduncle) .. +1 (snout)

    // Authentic Amphiprion ocellaris 3 wavy white bars (middle bar bulges forward at midline locN.y ~ 0!)
    float midBulge = 0.11 * exp(-pow(locN.y * 2.1, 2.0));
    float headCurve = -0.05 * locN.y;
    float dHead = abs(az - (0.48 + headCurve)) / 0.135;
    float dMid  = abs(az - (-0.04 + midBulge)) / 0.150;
    float dTail = abs(az - (-0.66)) / 0.125;
    float barDist = min(min(dHead, dMid), dTail);

    float whiteCore = 1.0 - smoothstep(0.68, 0.82, barDist);
    float blackBorder = smoothstep(0.62, 0.76, barDist) * (1.0 - smoothstep(0.92, 1.12, barDist));

    vec3 bodyOrange = mix(reefTangerine, dorsalSienna, smoothstep(0.42, 0.92, locN.y) * 0.58) * fineScale;
    vec3 col = mix(bodyOrange, velvetBlack, blackBorder * 0.96);
    col = mix(col, pearlWhite * mix(0.88, 1.06, fineScale - 0.6), whiteCore);

    outRoughness = mix(0.14, 0.32, scR);
    outAo = mix(0.58, 1.0, scAo);
    outSpecMul = 1.50;
    outSss = mix(vec3(0.98, 0.28, 0.03), vec3(0.45, 0.55, 0.65), whiteCore) * 0.34;
    return col;
  }

  // === 7. チンアナゴ (Spotted Garden Eel - Heteroconger hassi, Layer 22 Dappled Skin + Sand Burrow!) ===
  if (subPart > 0.15) {
    // Sub-part 6.3: Conical Okinawa White-Coral-Sand Burrow Collar at seabed base!
    vec3 sandAlb = vec3(0.82, 0.80, 0.74);
    float sandR = 0.74, sandAo = 1.0;
    if (uPbrReady == 1) {
      sampleTriplanarPbr(vWorldPos, geomN, 0, 0.85, 1.15, sandAlb, sandR, sandAo, outPerturbedN);
    }
    outRoughness = sandR;
    outAo = mix(0.55, 1.0, sandAo);
    outSpecMul = 0.35;
    return sandAlb;
  }

  vec3 eelAlb = vec3(0.86, 0.84, 0.78);
  float eelR = 0.22, eelAo = 1.0;
  if (uPbrReady == 1) {
    sampleFaunaTriplanarPbr(
      lp, locN, geomN, 22,
      vec2(5.4, 5.4), vec2(5.4, 5.4), vec2(5.4, 5.4),
      false, 0.92, eelAlb, eelR, eelAo, outPerturbedN
    );
  }
  // Heteroconger hassi signature TWO larger jet-black patches (gill patch at t~0.82 & mid-body patch at t~0.46)!
  float eelT = clamp(vAttrib.w, 0.0, 1.0);
  float patchWarp = noise2D(vec2(lp.y * 28.0, lp.x * 28.0 + lp.z * 28.0)) * 0.025;
  float gillPatch = (1.0 - smoothstep(0.024, 0.038, abs(eelT + patchWarp - 0.82))) * smoothstep(-0.1, 0.45, abs(locN.x));
  float midPatch  = (1.0 - smoothstep(0.026, 0.042, abs(eelT - patchWarp - 0.46))) * smoothstep(-0.1, 0.45, abs(locN.x));
  float blackPatch = clamp(gillPatch + midPatch, 0.0, 1.0);

  vec3 eelCol = mix(eelAlb, vec3(0.015, 0.016, 0.022), blackPatch * 0.94);
  outRoughness = mix(0.16, 0.34, eelR);
  outAo = mix(0.66, 1.0, eelAo) * smoothstep(-0.02, 0.08, eelT);
  outSpecMul = 1.28;
  outSss = vec3(0.55, 0.50, 0.40) * 0.28;
  return eelCol;
}

${Vs}
  if (matId == 8) {
    albedo = shadeOkinawaFauna(variant, vLocalPos, locN, geomN, fresnel, roughness, ao, specMul, sssCol, N);
  } else if (matId == 9) {
    // === High-Visibility 3D Scuba Diving Equipment Shader (Tank, BCD, Regulator Hoses, Mask, Weight Belt, Fins!) ===
    int gId = int(variant + 0.5);
    ao = 1.0;
    if (gId == 0) {
      // Safety Dive-Cylinder Yellow + Sporty Black/White Shoulder Stripe!
      float shoulderBand = smoothstep(0.145, 0.155, vLocalPos.y) * (1.0 - smoothstep(0.195, 0.205, vLocalPos.y));
      vec3 cylYel = vec3(0.98, 0.72, 0.02);
      albedo = mix(cylYel, vec3(0.05, 0.06, 0.08), shoulderBand * 0.88);
      roughness = 0.24;
      specMul = 1.45;
      emissive = cylYel * 0.08;
    } else if (gId == 1) {
      // Tactical Matte-Black Cordura BCD Vest, Tank Boot & Neoprene Foot Pocket (Nano Banana Layer 12!)
      if (uPbrReady == 1) {
        vec3 neoAlb; float neoR, neoAo;
        sampleTriplanarPbr(vLocalPos, geomN, 12, 5.2, 1.25, neoAlb, neoR, neoAo, N);
        albedo = neoAlb * vec3(0.42, 0.48, 0.56);
        roughness = mix(0.42, 0.72, neoR);
        ao = mix(0.55, 1.0, neoAo);
        specMul = 0.62;
      } else {
        albedo = vec3(0.028, 0.036, 0.048);
        roughness = 0.72;
        specMul = 0.42;
      }
    } else if (gId == 2) {
      // High-Vis Neon-Yellow Octopus Hose, Fin Side-Rails, Purge Button & Quick-Release Buckle!
      albedo = vec3(1.0, 0.86, 0.02);
      roughness = 0.28;
      specMul = 1.30;
      emissive = vec3(0.28, 0.22, 0.0);
    } else if (gId == 3) {
      // Brushed Marine Chrome & Stainless Barware (Crisp dark-to-bright metallic reflection contrast, never chalky!)
      float metalBand = 0.45 + 0.55 * abs(sin(geomN.x * 3.1 + geomN.z * 2.7 + vWorldPos.y * 5.0));
      albedo = mix(vec3(0.16, 0.20, 0.26), vec3(0.62, 0.68, 0.76), clamp(metalBand * 0.65 + fresnel * 0.55, 0.0, 1.0));
      roughness = 0.085;
      specMul = 2.85;
    } else if (gId == 4) {
      // Cast Lead Weight Blocks (Gunmetal Grey)
      albedo = vec3(0.26, 0.29, 0.34);
      roughness = 0.45;
      specMul = 0.92;
    } else if (gId == 5) {
      // Vibrant Kerama-Turquoise Scuba Fin Hydro-Blade, BCD Trim & Mask Frame!
      albedo = vec3(0.02, 0.74, 0.90);
      roughness = 0.26;
      specMul = 1.25;
      emissive = vec3(0.01, 0.12, 0.16);
      if (uPbrReady == 1) {
        vec3 neoAlb; float neoR, neoAo;
        sampleTriplanarPbr(vLocalPos, geomN, 12, 5.6, 0.65, neoAlb, neoR, neoAo, N);
        albedo *= mix(0.82, 1.18, dot(neoAlb, vec3(0.333)) * 3.2);
      }
    } else if (gId == 6) {
      // Crystal-Clear Anti-Reflective Multi-Coated Tempered Dive-Mask Glass Lens (Avatar's eyes shine cleanly through!)
      albedo = mix(vec3(0.02, 0.14, 0.24), vec3(0.16, 0.72, 0.88), fresnel * 0.75);
      roughness = 0.03;
      specMul = 3.20;
      emissive = vec3(0.04, 0.24, 0.34) * (0.25 + 1.15 * fresnel);
      outAlpha = clamp(0.24 + fresnel * 0.58, 0.22, 0.86);
    } else if (gId == 8) {
      // Vibrant Hibiscus Coral-Pink (Tropical BCD, Jet Fins & 3mm Resort Suit!)
      albedo = vec3(0.95, 0.16, 0.42);
      roughness = 0.26;
      specMul = 1.25;
      emissive = vec3(0.14, 0.02, 0.05);
      if (uPbrReady == 1) {
        vec3 neoAlb; float neoR, neoAo;
        sampleTriplanarPbr(vLocalPos, geomN, 12, 5.6, 0.65, neoAlb, neoR, neoAo, N);
        albedo *= mix(0.82, 1.18, dot(neoAlb, vec3(0.333)) * 3.2);
      }
    } else if (gId == 9) {
      // Crisp Resort Pearl-White (Resort BCD, Beer Foam & Trim!)
      albedo = vec3(0.92, 0.95, 0.98);
      roughness = 0.22;
      specMul = 1.15;
    } else if (gId == 10) {
      // Champagne Metallic Gold (Pro Wing BCD & Stealth Gold Suit Trim!)
      albedo = vec3(0.92, 0.66, 0.08);
      roughness = 0.18;
      specMul = 2.05;
      emissive = vec3(0.16, 0.10, 0.01);
      if (uPbrReady == 1) {
        vec3 neoAlb; float neoR, neoAo;
        sampleTriplanarPbr(vLocalPos, geomN, 12, 5.6, 0.55, neoAlb, neoR, neoAo, N);
        albedo *= mix(0.84, 1.16, dot(neoAlb, vec3(0.333)) * 3.2);
      }
    } else if (gId == 11) {
      // Sapphire-Crystal Full-Color AMOLED Scuba Wrist Dive Computer Display!
      vec2 dialUv = vLocalPos.xz / 0.0196;
      float rDial = length(dialUv);
      float angDial = atan(dialUv.y, dialUv.x);

      // Outer N2 / Ascent perimeter arc ticks + crisp horizontal OLED divider rules
      float arcRing = smoothstep(0.76, 0.80, rDial) * (1.0 - smoothstep(0.90, 0.94, rDial));
      float segMask = step(0.28, fract((angDial / 6.2831853 + 0.5) * 24.0));
      float ruleA = (1.0 - smoothstep(0.0, 0.035, abs(dialUv.y - 0.24))) * step(abs(dialUv.x), 0.66);
      float ruleB = (1.0 - smoothstep(0.0, 0.035, abs(dialUv.y + 0.24))) * step(abs(dialUv.x), 0.66);

      // Crisp digital telemetry blocks (Depth, NDL & Tank Bar indicators on the 3D wrist face!)
      float digGridX = step(0.22, fract((dialUv.x + 0.58) * 5.0));
      float digMain = step(abs(dialUv.y), 0.16) * step(abs(dialUv.x), 0.56) * digGridX;
      float digSub = step(abs(dialUv.y + 0.42), 0.10) * step(abs(dialUv.x), 0.48) * step(0.25, fract((dialUv.x + 0.5) * 4.0));
      float topTag = step(abs(dialUv.y - 0.44), 0.08) * step(abs(dialUv.x), 0.42);

      bool isAlarm = (vEntityPhase > 1.5);
      bool isStop = (vEntityPhase > 0.5 && vEntityPhase <= 1.5);
      float blink = isAlarm ? (0.45 + 0.55 * step(0.0, sin(uTime * 14.0))) : 1.0;

      vec3 primCol = isAlarm
        ? vec3(1.0, 0.18, 0.22)
        : isStop
          ? vec3(1.0, 0.78, 0.16)
          : vec3(0.14, 0.92, 1.0);
      vec3 arcCol = isAlarm ? vec3(1.0, 0.22, 0.16) : vec3(0.16, 0.98, 0.66);

      vec3 oledGlow = arcCol * (arcRing * segMask * 0.95 + topTag * 0.70)
                    + primCol * (digMain * 1.15 + digSub * 0.80) * blink
                    + vec3(0.10, 0.48, 0.68) * (ruleA + ruleB) * 0.65;

      // Deep OLED obsidian glass substrate + sapphire anti-reflective cyan-violet Fresnel coat
      albedo = mix(vec3(0.008, 0.016, 0.028), vec3(0.10, 0.42, 0.68), fresnel * 0.62) + oledGlow * 0.35;
      roughness = 0.035;
      specMul = 3.10;
      emissive = oledGlow * 1.35 + vec3(0.02, 0.10, 0.16);
    } else {
      // Braided Carbon-Nylon Miflex Scuba Regulator & SPG Hoses!
      float braidA = sin((vLocalPos.x + vLocalPos.y + vLocalPos.z) * 340.0);
      float braidB = sin((vLocalPos.x - vLocalPos.y + vLocalPos.z) * 340.0);
      float weave = 0.84 + 0.16 * (braidA * braidB);
      albedo = vec3(0.038, 0.044, 0.056) * weave;
      roughness = 0.36;
      specMul = 0.96;
    }
  }
${Hs}
`,u0=`${Ws}
void sampleFaunaTriplanarPbr(
  vec3 lp,
  vec3 locN,
  vec3 geomN,
  int layer,
  vec2 uvFlankZY,
  vec2 uvBackXZ,
  vec2 uvFrontXY,
  bool swapFlankAxes,
  float normalStrength,
  out vec3 outLinearAlbedo,
  out float outRoughness,
  out float outAo,
  out vec3 outPerturbedWorldN
) {
  vec3 blend = pow(max(abs(locN), vec3(0.0001)), vec3(4.0));
  blend /= (blend.x + blend.y + blend.z);

  float lf = float(layer);
  vec2 uvX = swapFlankAxes
    ? vec2(lp.y * uvFlankZY.x, lp.z * uvFlankZY.y)
    : vec2(lp.z * uvFlankZY.x, lp.y * uvFlankZY.y);
  vec2 uvY = vec2(lp.x * uvBackXZ.x, lp.z * uvBackXZ.y);
  vec2 uvZ = vec2(lp.x * uvFrontXY.x, lp.y * uvFrontXY.y);

  vec4 aX = texture(uPbrAlbedoTex, vec3(uvX, lf));
  vec4 aY = texture(uPbrAlbedoTex, vec3(uvY, lf));
  vec4 aZ = texture(uPbrAlbedoTex, vec3(uvZ, lf));
  vec4 albMix = aX * blend.x + aY * blend.y + aZ * blend.z;

  vec4 nX = texture(uPbrNormalTex, vec3(uvX, lf));
  vec4 nY = texture(uPbrNormalTex, vec3(uvY, lf));
  vec4 nZ = texture(uPbrNormalTex, vec3(uvZ, lf));

  vec2 tX = (nX.xy * 2.0 - 1.0) * normalStrength;
  vec2 tY = (nY.xy * 2.0 - 1.0) * normalStrength;
  vec2 tZ = (nZ.xy * 2.0 - 1.0) * normalStrength;

  vec3 locFlank = swapFlankAxes
    ? vec3(0.0, tX.x * sign(uvFlankZY.x), tX.y * sign(uvFlankZY.y))
    : vec3(0.0, -tX.y * sign(uvFlankZY.y), tX.x * sign(uvFlankZY.x));
  vec3 locBack  = vec3(tY.x * sign(uvBackXZ.x), 0.0, tY.y * sign(uvBackXZ.y));
  vec3 locFront = vec3(tZ.x * sign(uvFrontXY.x), -tZ.y * sign(uvFrontXY.y), 0.0);

  vec3 locPerturb = locFlank * blend.x + locBack * blend.y + locFront * blend.z;
  vec3 worldPerturb = vModelAxisX * locPerturb.x
                    + vModelAxisY * locPerturb.y
                    + vModelAxisZ * locPerturb.z;

  outLinearAlbedo = pow(clamp(albMix.rgb, 0.0, 1.0), vec3(2.2));
  outRoughness = albMix.a;
  outAo = nX.a * blend.x + nY.a * blend.y + nZ.a * blend.z;
  outPerturbedWorldN = normalize(geomN + worldPerturb);
}
${Vs}
  if (matId == 11) {
    // === Luxury Craft Beach Bar ('CHURA BAR') Lathe Bottles, Refractive Glassware, Foil & Nano Banana Atlas UV Shader ===
    int bId = int(variant + 0.5);
    ao = 1.0;
    if (bId == 0) {
      // Glazed Jet-Black Ryukyu Awamori Kusu Stoneware Bottle (Obsidian ceramic glaze + subtle kiln speckle!)
      float kiln = noise2D(sampleCoord.xz * 48.0 + sampleCoord.y * 42.0);
      albedo = mix(vec3(0.012, 0.014, 0.022), vec3(0.038, 0.032, 0.026), kiln * 0.45);
      roughness = 0.065;
      specMul = 2.75;
      emissive = vec3(0.04, 0.035, 0.025) * fresnel;
    } else if (bId == 1) {
      // Refractive Deep Kerama Sapphire-Turquoise Curaçao Bottle & Lagoon Hurricane Liquid!
      float rimF = pow(1.0 - NdotV, 3.6);
      albedo = mix(vec3(0.002, 0.13, 0.52), vec3(0.03, 0.56, 0.92), rimF * 0.72);
      roughness = 0.028;
      specMul = 2.95;
      sssCol = vec3(0.01, 0.38, 0.76) * 0.35;
      emissive = vec3(0.004, 0.085, 0.24) * (0.35 + 0.65 * rimF);
    } else if (bId == 2) {
      // Refractive Aged Coral-Cane Spiced Rum Deep Mahogany-Amber Bottle!
      float rimF = pow(1.0 - NdotV, 3.6);
      albedo = mix(vec3(0.18, 0.028, 0.002), vec3(0.76, 0.28, 0.025), rimF * 0.72);
      roughness = 0.032;
      specMul = 2.85;
      sssCol = vec3(0.56, 0.16, 0.01) * 0.38;
      emissive = vec3(0.10, 0.024, 0.002) * (0.40 + 0.55 * rimF);
    } else if (bId == 3) {
      // Refractive Chura Botanical Gin Deep Sea-Glass Apothecary Bottle!
      float rimF = pow(1.0 - NdotV, 3.4);
      albedo = mix(vec3(0.035, 0.26, 0.32), vec3(0.32, 0.74, 0.82), rimF * 0.72);
      roughness = 0.028;
      specMul = 3.05;
      sssCol = vec3(0.12, 0.44, 0.52) * 0.32;
      emissive = vec3(0.02, 0.09, 0.12) * (0.35 + 0.65 * rimF);
    } else if (bId == 4) {
      // Refractive Yanbaru Mango & Passion Rich Honey-Amber Bottle, Colada & Island Lager!
      float rimF = pow(1.0 - NdotV, 3.6);
      albedo = mix(vec3(0.68, 0.20, 0.005), vec3(0.94, 0.52, 0.04), rimF * 0.62);
      roughness = 0.038;
      specMul = 2.75;
      sssCol = vec3(0.74, 0.32, 0.02) * 0.36;
      emissive = vec3(0.14, 0.052, 0.003) * (0.42 + 0.48 * rimF);
    } else if (bId == 5) {
      // Refractive Island Mint & Shikuwasa Deep Forest-Emerald Bottle & Sparkling Mojito!
      float rimF = pow(1.0 - NdotV, 3.6);
      albedo = mix(vec3(0.008, 0.26, 0.038), vec3(0.14, 0.72, 0.22), rimF * 0.70);
      roughness = 0.032;
      specMul = 2.85;
      sssCol = vec3(0.04, 0.48, 0.12) * 0.36;
      emissive = vec3(0.008, 0.10, 0.022) * (0.38 + 0.55 * rimF);
    } else if (bId == 6) {
      // Sunset Hibiscus Fizz Rich Ruby-Crimson to Ripe Mango-Gold Layered Cocktail (Zero Milky Washout!)
      float gradY = clamp((vIsDynamic > 0.5) ? (vLocalPos.y - 0.03) / 0.12 : fract(vWorldPos.y * 4.0), 0.0, 1.0);
      vec3 botGold = vec3(0.84, 0.22, 0.006);
      vec3 topRuby = vec3(0.64, 0.008, 0.058);
      albedo = mix(botGold, topRuby, smoothstep(0.14, 0.80, gradY));
      roughness = 0.036;
      specMul = 2.65;
      sssCol = albedo * 0.42;
      emissive = albedo * 0.16;
    } else if (bId == 7) {
      // Hand-Blown Crystal Stemware Base & Faceted Rock Ice Cubes!
      albedo = mix(vec3(0.24, 0.52, 0.72), vec3(0.78, 0.90, 0.98), fresnel * 0.78);
      roughness = 0.028;
      specMul = 3.15;
      emissive = vec3(0.05, 0.12, 0.18) * (0.35 + 0.75 * fresnel);
    } else if (bId == 8) {
      // 24K Brushed Champagne Gold Foil, Braided Awamori Cord & Resort Brass Accents (Rich metallic contrast, never chalky cream!)
      float gBand = 0.42 + 0.58 * abs(sin(geomN.x * 3.4 + geomN.z * 2.9 + vWorldPos.y * 12.0));
      albedo = mix(vec3(0.24, 0.135, 0.014), vec3(0.76, 0.49, 0.075), clamp(gBand * 0.68 + fresnel * 0.48, 0.0, 1.0));
      roughness = 0.088;
      specMul = 3.05;
      emissive = vec3(0.028, 0.016, 0.002);
    } else if (bId == 9) {
      // Natural Portuguese Cork Stopper & Toasted Coconut Garnish!
      float ck = noise2D(sampleCoord.xz * 55.0 + sampleCoord.y * 55.0);
      albedo = mix(vec3(0.42, 0.25, 0.11), vec3(0.68, 0.46, 0.25), ck);
      roughness = 0.74;
      specMul = 0.30;
    } else if (bId == 10) {
      // Fine Artisan Hand-Hammered Rose-Copper Champagne Ice Bucket, Lanterns & Gin Caps (~4.5mm hammer facets!)
      vec3 hp = sampleCoord * 410.0;
      float d1 = sin(hp.x) * cos(hp.y) + sin(hp.y * 1.17) * cos(hp.z) + sin(hp.z * 0.91) * cos(hp.x * 1.09);
      float dimple = abs(fract(d1 * 0.65) - 0.5) * 2.0;
      vec3 dGrad = vec3(
        cos(hp.x) * cos(hp.y) - sin(hp.z * 0.91) * sin(hp.x * 1.09),
        -sin(hp.x) * sin(hp.y) + cos(hp.y * 1.17) * cos(hp.z),
        -sin(hp.y * 1.17) * sin(hp.z) + cos(hp.z * 0.91) * cos(hp.x * 1.09)
      );
      N = normalize(geomN + (dGrad - geomN * dot(dGrad, geomN)) * 0.20);
      float rimC = pow(1.0 - max(dot(N, V), 0.0), 2.6);
      albedo = mix(vec3(0.18, 0.036, 0.010), vec3(0.68, 0.21, 0.075), clamp(0.26 + dimple * 0.36 + rimC * 0.52, 0.0, 1.0));
      roughness = mix(0.072, 0.16, dimple * 0.55);
      specMul = 3.45;
      sssCol = vec3(0.45, 0.12, 0.035) * 0.20;
      emissive = vec3(0.038, 0.011, 0.003) * (0.35 + 0.85 * rimC);
    } else if (bId == 11) {
      // Creamy Draft Beer Micro-Foam Head & Whipped Coconut Cream!
      albedo = vec3(0.97, 0.95, 0.89);
      roughness = 0.48;
      specMul = 0.48;
      emissive = vec3(0.17, 0.16, 0.13);
    } else if (bId == 12) {
      // Plush Tufted Cognac Saddle-Leather Bar Stool Cushion!
      if (uPbrReady == 1) {
        vec3 lAlb; float lR, lAo;
        sampleTriplanarPbr(sampleCoord, geomN, 12, 3.8, 0.85, lAlb, lR, lAo, N);
        albedo = mix(vec3(0.36, 0.14, 0.05), vec3(0.58, 0.26, 0.10), clamp(dot(lAlb, vec3(0.333)) * 2.6, 0.0, 1.0));
        roughness = mix(0.26, 0.48, lR);
        ao = mix(0.68, 1.0, lAo);
      } else {
        albedo = vec3(0.44, 0.18, 0.07);
        roughness = 0.34;
      }
      specMul = 1.18;
    } else if (bId == 13) {
      // Ultra-Clear Chilled Crystal Cocktail Glass Wall (isGlass: true -> 95% clear center, crisp Fresnel rim & specular!)
      float dew = smoothstep(0.74, 0.97, noise2D(vLocalPos.xy * 115.0 + vLocalPos.z * 98.0));
      float edgeRim = pow(1.0 - NdotV, 4.0);
      albedo = mix(vec3(0.22, 0.48, 0.68), vec3(0.88, 0.95, 1.0), clamp(edgeRim * 0.90 + dew * 0.35, 0.0, 1.0));
      roughness = mix(0.022, 0.12, dew * 0.4);
      specMul = 3.45;
      emissive = vec3(0.06, 0.14, 0.22) * edgeRim;
      outAlpha = clamp(0.042 + edgeRim * 0.62 + dew * 0.06, 0.042, 0.78);
    } else if (bId == 17) {
      // Aged Oak Ryukyu Awamori Kusu Pale Champagne-Gold Spirit on the Rocks!
      float rimF = pow(1.0 - NdotV, 3.4);
      albedo = mix(vec3(0.48, 0.28, 0.03), vec3(0.88, 0.68, 0.26), rimF * 0.72);
      roughness = 0.028;
      specMul = 2.95;
      sssCol = vec3(0.68, 0.44, 0.08) * 0.35;
      emissive = vec3(0.10, 0.06, 0.008) * (0.40 + 0.55 * rimF);
    } else if (bId >= 18 && bId <= 20) {
      // === Authentic Hand-Blown Okinawa Ryukyu Bubble-Glass ('琉球泡ガラス・海蛍タルグラス', isGlass: true)! ===
      // vAttrib.z = normalized height hNorm [0 = thick base pool .. 1 = plump rolled '口巻き' lip]
      // vAttrib.w = wall side [1.0 = outer wall, 0.5 = rolled lip, 0.0 = inner wall]
      float hNorm = clamp(vAttrib.z, 0.0, 1.0);
      float wallSide = clamp(vAttrib.w, 0.0, 1.0);

      // 1) Artisan Helical Optic-Mold Fluting ('ひねりモール') micro-refraction normal perturbation!
      float ang = atan(geomN.x, -geomN.z);
      float twistPhase = ang * 10.0 - hNorm * 3.8;
      float ribWave = sin(twistPhase);
      float ribDeriv = cos(twistPhase);
      vec3 tangH = normalize(vec3(-geomN.z, 0.0, geomN.x) + vec3(1e-5, 0.0, 0.0));
      N = normalize(geomN + tangH * (ribDeriv * 0.16 * sin(hNorm * 3.14159)) + vec3(0.0, ribDeriv * 0.04, 0.0));

      float glassFres = pow(1.0 - max(dot(N, V), 0.0), 2.8);

      // 2) Signature Multi-Scale Soda Micro-Bubbles ('泡ガラス') trapped inside hand-blown recycled glass!
      vec2 bCoord1 = vec2(ang * 5.5 - hNorm * 2.2, hNorm * 16.0);
      vec2 bCoord2 = vec2(ang * 11.0 - hNorm * 4.0 + 3.7, hNorm * 31.0 + 1.9);

      vec2 cell1 = fract(bCoord1) - 0.5;
      vec2 id1   = floor(bCoord1);
      float rnd1 = fract(sin(dot(id1, vec2(127.1, 311.7))) * 43758.5453);
      vec2 j1    = vec2(fract(rnd1 * 13.7) - 0.5, fract(rnd1 * 29.3) - 0.5) * 0.56;
      float dBub1 = length(cell1 - j1);
      float bub1  = (rnd1 > 0.54) ? (1.0 - smoothstep(0.045, 0.105, dBub1)) : 0.0;

      vec2 cell2 = fract(bCoord2) - 0.5;
      vec2 id2   = floor(bCoord2);
      float rnd2 = fract(sin(dot(id2, vec2(269.5, 183.3))) * 43758.5453);
      vec2 j2    = vec2(fract(rnd2 * 17.1) - 0.5, fract(rnd2 * 41.7) - 0.5) * 0.58;
      float dBub2 = length(cell2 - j2);
      float bub2  = (rnd2 > 0.48) ? (1.0 - smoothstep(0.040, 0.095, dBub2)) : 0.0;

      // Discrete, pinpoint sparkling soda bubbles ONLY (zero continuous Perlin fog so glass stays 100% crystal-glossy!)
      float bubbleStream = 0.50 + 0.50 * sin(ang * 5.0 - hNorm * 4.5);
      float sodaBubbles = clamp((bub1 * 0.95 + bub2 * 0.82) * bubbleStream * smoothstep(0.05, 0.24, hNorm) * wallSide, 0.0, 1.0);

      // 3) 'ホタルガラス' (Hotaru-Glass silver-leaf & phosphorescent sea-foil flecks in thick colored base!)
      float foilFleck = smoothstep(0.84, 0.96, noise2D(vec2(ang * 14.0, hNorm * 28.0 + 7.3))) * (1.0 - smoothstep(0.08, 0.42, hNorm));

      // 4) Authentic Multi-Tone Ryukyu Glass Color Pooling (rich thick jewel base -> deep-tinted belly -> crystal-clear upper zone -> jewel '口巻き' rolled rim!)
      float basePool = 1.0 - smoothstep(0.08, 0.58, hNorm);
      float midTint  = 1.0 - smoothstep(0.32, 0.88, hNorm);
      float lipBand  = smoothstep(0.89, 0.96, hNorm);

      vec3 deepCol, midCol, clearCol, foilCol;
      if (bId == 18) {
        // '慶良間・海蛍ブルー' (Deep Kerama Cobalt -> Vivid Lagoon Sapphire -> Crystal Sea-Clear -> Cobalt Rolled Lip!)
        deepCol  = vec3(0.002, 0.065, 0.580);
        midCol   = vec3(0.006, 0.340, 0.780);
        clearCol = vec3(0.035, 0.380, 0.680);
        foilCol  = vec3(0.080, 0.880, 1.000);
      } else if (bId == 19) {
        // '夕凪・紅珊瑚ルビー＆琥珀' (Deep Sunset Amber-Gold Base -> Rich Hibiscus Ruby Belly -> Clear Rose -> Ruby Rolled Lip!)
        vec3 amberBase = vec3(0.720, 0.160, 0.008);
        vec3 rubyDeep  = vec3(0.620, 0.008, 0.095);
        deepCol  = mix(amberBase, rubyDeep, smoothstep(0.08, 0.38, hNorm));
        midCol   = vec3(0.760, 0.032, 0.160);
        clearCol = vec3(0.580, 0.120, 0.240);
        foilCol  = vec3(0.980, 0.580, 0.080);
      } else {
        // 'やんばる・シークヮーサー翠緑' (Deep Yanbaru Forest Emerald -> Jade -> Crystal Clear -> Emerald Rolled Lip!)
        deepCol  = vec3(0.004, 0.260, 0.052);
        midCol   = vec3(0.018, 0.560, 0.190);
        clearCol = vec3(0.080, 0.520, 0.260);
        foilCol  = vec3(0.280, 0.940, 0.460);
      }

      vec3 glassTint = mix(clearCol, midCol, midTint * 0.88);
      glassTint = mix(glassTint, deepCol, clamp(basePool * 0.96 + lipBand * 0.90, 0.0, 1.0));

      // Wet, razor-sharp helical 'ひねりモール' vertical specular highlights & sky Fresnel reflection!
      vec3 reflDir = reflect(-V, N);
      vec3 envRefl = mix(
        vec3(0.02, 0.26, 0.48),
        vec3(0.32, 0.62, 0.92),
        smoothstep(-0.25, 0.55, reflDir.y)
      );
      float ribStreak = pow(max(0.0, cos(ang - reflDir.x * 1.4 + ribWave * 0.22)), 26.0) * 0.55 * wallSide;
      float sunGlint  = pow(max(dot(reflDir, normalize(vec3(-0.35, 0.72, -0.60))), 0.0), 56.0) * 2.2;

      albedo = mix(glassTint, vec3(0.88, 0.96, 1.0), clamp(sodaBubbles * 0.82 + glassFres * 0.28, 0.0, 1.0));
      albedo = mix(albedo, foilCol, foilFleck * 0.88);
      roughness = mix(0.014, 0.075, sodaBubbles * 0.45);
      specMul = 3.85;
      sssCol = glassTint * 0.42;
      emissive = glassTint * (0.14 + 0.26 * basePool + 0.22 * lipBand)
               + envRefl * (0.05 + 0.42 * glassFres + 0.14 * ribStreak)
               + vec3(0.96, 0.99, 1.0) * (sodaBubbles * 0.46 + sunGlint + ribStreak * 0.28)
               + foilCol * (foilFleck * 0.55);

      // Ultra-clear upper zone (0.055 outer / 0.022 inner!) + rich jewel-pooled bottom & rolled lip — zero frosted haze!
      float thickAlpha = 0.055 + 0.58 * basePool + 0.52 * lipBand + 0.52 * glassFres + 0.55 * sodaBubbles + 0.30 * foilFleck;
      thickAlpha *= mix(0.38, 1.0, wallSide);
      outAlpha = clamp(thickAlpha, 0.025, 0.90);
    } else if (bId == 21) {
      // === Authentic Hand-Chipped Pure Crystal Rock Ice ('天然水かち割りロックアイス' — Water-Clear Facets + Frosted Cleavage Ridges!) ===
      bool hasEdgeLayer = (vAttrib.z >= -0.0001);
      float geomRidge = hasEdgeLayer ? smoothstep(0.64, 0.97, clamp(vAttrib.z, 0.0, 1.0)) : 0.0;
      float fHash     = hasEdgeLayer ? clamp(vAttrib.w, 0.0, 1.0) : fract(sin(dot(floor(sampleCoord * 90.0), vec3(12.9, 78.2, 45.1))) * 437.5);
      float derivEdge = clamp(length(fwidth(geomN)) * 1.45, 0.0, 1.0);
      float iceFres   = pow(1.0 - max(dot(geomN, V), 0.0), 3.0);
      float frostRidge = clamp(max(geomRidge * 0.88, derivEdge * 0.72), 0.0, 1.0);

      // Snell's Law water-ice refraction (n = 1.309) across flat chiseled cleavage planes!
      vec3 refrDir = refract(-V, geomN, 0.764);
      vec3 reflDir = reflect(-V, geomN);
      float skyRefr = clamp(refrDir.y * 0.65 + 0.55, 0.0, 1.0);
      vec3 clearCore = mix(vec3(0.68, 0.84, 0.96), vec3(0.95, 0.99, 1.00), clamp(skyRefr * 0.65 + fHash * 0.35, 0.0, 1.0));

      // Subtle internal ice cleavage hairline glint ('純氷内部の氷紋きらめき')
      float cleave1 = exp(-pow(abs(fract(dot(sampleCoord, vec3(34.0, 26.0, -29.0))) - 0.5) * 16.0, 2.0));
      float cleave2 = exp(-pow(abs(fract(dot(sampleCoord, vec3(-24.0, 38.0, 21.0))) - 0.5) * 18.0, 2.0));
      float innerSpark = clamp((cleave1 * 0.65 + cleave2 * 0.55) * (0.35 + 0.65 * iceFres), 0.0, 1.0);
      float sunDiamond = pow(max(dot(reflDir, normalize(uSunDir)), 0.0), 64.0) * 2.6;

      albedo = mix(clearCore, vec3(0.98, 0.995, 1.0), clamp(frostRidge * 0.92 + iceFres * 0.55 + innerSpark * 0.75, 0.0, 1.0));
      roughness = mix(0.012, 0.11, frostRidge * 0.55);
      specMul = gl_FrontFacing ? 3.95 : 2.10;
      sssCol = vec3(0.75, 0.92, 1.0) * 0.48;
      emissive = clearCore * 0.14
               + vec3(0.96, 0.99, 1.0) * (frostRidge * 0.34 + innerSpark * 0.28 + iceFres * 0.22 + sunDiamond);

      if (hasEdgeLayer) {
        float faceAlpha = 0.20 + 0.58 * frostRidge + 0.44 * iceFres + 0.24 * innerSpark;
        outAlpha = clamp(gl_FrontFacing ? faceAlpha : faceAlpha * 0.45, 0.10, 0.88);
      } else {
        outAlpha = 1.0;
      }
    } else if (bId == 22) {
      // Sparkling Frosted Crushed Rock-Ice Bed inside Champagne & Bartender Ice Buckets!
      float cr1 = noise2D(sampleCoord.xz * 95.0 + sampleCoord.y * 85.0);
      float cr2 = noise2D(sampleCoord.xz * 220.0 - sampleCoord.y * 190.0);
      vec3 gPert = vec3(sin(sampleCoord.x * 180.0 + cr1 * 5.0), 0.4, cos(sampleCoord.z * 180.0 - cr2 * 5.0));
      N = normalize(geomN + gPert * 0.32);
      float glint = smoothstep(0.78, 0.97, cr2);
      albedo = mix(vec3(0.76, 0.88, 0.96), vec3(0.98, 0.995, 1.0), clamp(cr1 * 0.65 + glint * 0.85, 0.0, 1.0));
      roughness = mix(0.18, 0.03, glint);
      specMul = mix(1.65, 3.60, glint);
      sssCol = vec3(0.72, 0.90, 1.0) * 0.38;
      emissive = vec3(0.12, 0.16, 0.20) + vec3(0.55, 0.62, 0.68) * glint;
    } else if (bId == 23) {
      // === Ultra-Realistic Luminous Clear Golden-Amber Pilsner Draft Beer ('極冷・透き通る琥珀ゴールド生ドラフト' + Rising Micro-Bubbles!) ===
      float coreTrans = pow(clamp(NdotV, 0.0, 1.0), 0.78);
      float hGrad = clamp((vLocalPos.y - 0.030) / 0.113, 0.0, 1.0);
      // True linear-space Pilsner amber-gold so ACES HDR tone-mapping renders rich appetizing golden beer (never washed-out lemon)!
      vec3 deepMaltAmber = vec3(0.18, 0.022, 0.0004);
      vec3 sunlitPilsner = mix(vec3(0.64, 0.135, 0.0016), vec3(0.88, 0.255, 0.0042), hGrad);
      vec3 beerCol = mix(deepMaltAmber, sunlitPilsner, coreTrans);

      // 2-Scale Live Rising Fine CO2 Carbonation Micro-Bubbles streaming up into the 7:3 foam head!
      float angB = atan(vLocalPos.x, -vLocalPos.z);
      vec2 bc1 = vec2(angB * 8.5, vLocalPos.y * 92.0 - uTime * 2.25);
      vec2 idB1 = floor(bc1);
      float rB1 = fract(sin(dot(idB1, vec2(127.1, 311.7))) * 43758.5453);
      vec2 jB1  = vec2(fract(rB1 * 13.7) - 0.5, fract(rB1 * 29.3) - 0.5) * 0.55;
      float bub1 = (rB1 > 0.60) ? (1.0 - smoothstep(0.05, 0.13, length(fract(bc1) - 0.5 - jB1))) : 0.0;

      vec2 bc2 = vec2(angB * 15.0 + 2.3, vLocalPos.y * 158.0 - uTime * 3.35);
      vec2 idB2 = floor(bc2);
      float rB2 = fract(sin(dot(idB2, vec2(269.5, 183.3))) * 43758.5453);
      vec2 jB2  = vec2(fract(rB2 * 17.3) - 0.5, fract(rB2 * 41.9) - 0.5) * 0.56;
      float bub2 = (rB2 > 0.54) ? (1.0 - smoothstep(0.05, 0.14, length(fract(bc2) - 0.5 - jB2))) : 0.0;

      float foamLace = smoothstep(0.134, 0.143, vLocalPos.y);
      float fineFizz = clamp((bub1 * 0.95 + bub2 * 0.82) * (0.35 + 0.65 * hGrad), 0.0, 1.0);

      albedo = mix(beerCol, vec3(0.98, 0.84, 0.45), fineFizz * 0.80);
      albedo = mix(albedo, vec3(0.99, 0.92, 0.72), foamLace * 0.88);
      roughness = 0.018;
      specMul = 3.15;
      sssCol = vec3(0.92, 0.28, 0.005) * 0.75;
      emissive = sunlitPilsner * (0.20 * pow(coreTrans, 1.4))
               + vec3(1.0, 0.88, 0.52) * (fineFizz * 0.36 + foamLace * 0.18);
    } else if (bId == 24) {
      // === Silky 7:3 Whipped '神泡' Micro-Foam Head & Sparkling Highball Fizz Collar! ===
      float fCell1 = noise2D(vLocalPos.xz * 260.0 + vLocalPos.y * 240.0);
      float fCell2 = noise2D(vLocalPos.xz * 540.0 - vLocalPos.y * 490.0);
      vec3 fPert = vec3(sin(vLocalPos.x * 380.0 + fCell1 * 4.0), 0.5, cos(vLocalPos.z * 380.0 - fCell2 * 4.0));
      N = normalize(geomN + fPert * 0.12);

      // Warm golden beer bounce glow at the lower interface -> pure snowy silk-whipped white on dome crest!
      float foamH = clamp((vLocalPos.y - 0.141) / 0.036, 0.0, 1.0);
      vec3 warmUnderside = vec3(0.98, 0.85, 0.56);
      vec3 silkSnowCrest = vec3(0.996, 0.992, 0.972);
      albedo = mix(warmUnderside, silkSnowCrest, smoothstep(0.0, 0.68, foamH)) * (0.96 + 0.04 * fCell2);
      roughness = 0.28;
      specMul = 0.92;
      sssCol = vec3(1.0, 0.90, 0.66) * 0.52;
      emissive = albedo * 0.16;
    } else if (bId == 25) {
      // === Colorless Chilled Crystal Izakaya Draft Mug & Cut-Crystal Highball Tumbler (Frost Mist + 3D Condensation Droplets, isGlass: true)! ===
      float angG = atan(vLocalPos.x, -vLocalPos.z);
      float radXZ = length(vLocalPos.xz);
      float isHandleOrSham = clamp(max(smoothstep(0.0502, 0.0545, radXZ), 1.0 - smoothstep(0.022, 0.032, vLocalPos.y)), 0.0, 1.0);
      float outerMask = smoothstep(0.0, 0.35, dot(normalize(vec3(vLocalPos.x, 0.0, vLocalPos.z) + vec3(1e-5)), geomN));
      float chillZone = (1.0 - smoothstep(0.145, 0.172, vLocalPos.y)) * smoothstep(0.008, 0.025, vLocalPos.y) * outerMask * (1.0 - isHandleOrSham * 0.6);

      // 3D Beaded Condensation Water Droplets ('ぷっくり光るキンキン結露水滴') on outer chilled glass!
      vec2 dc1 = vec2(angG * 9.0, vLocalPos.y * 105.0);
      vec2 did1 = floor(dc1);
      float dr1 = fract(sin(dot(did1, vec2(127.1, 311.7))) * 43758.5453);
      vec2 dj1  = vec2(fract(dr1 * 15.7) - 0.5, fract(dr1 * 31.3) - 0.5) * 0.52;
      vec2 dOff1 = fract(dc1) - 0.5 - dj1;
      float dRad1 = length(dOff1);
      float drop1 = (dr1 > 0.42) ? (1.0 - smoothstep(0.08, 0.24, dRad1)) * chillZone : 0.0;

      vec2 dc2 = vec2(angG * 19.0 + 1.7, vLocalPos.y * 215.0 + 3.1);
      vec2 did2 = floor(dc2);
      float dr2 = fract(sin(dot(did2, vec2(269.5, 183.3))) * 43758.5453);
      float drop2 = (dr2 > 0.38) ? (1.0 - smoothstep(0.08, 0.26, length(fract(dc2) - 0.5))) * chillZone : 0.0;

      vec3 tangG = normalize(vec3(-geomN.z, 0.0, geomN.x) + vec3(1e-5, 0.0, 0.0));
      N = normalize(geomN + (tangG * (-dOff1.x) + vec3(0.0, -dOff1.y, 0.0)) * (drop1 * 1.45));

      float edgeRim  = pow(1.0 - max(dot(N, V), 0.0), 2.8);
      float frostMist = (1.0 - smoothstep(0.02, 0.13, vLocalPos.y)) * chillZone * 0.48;
      float dropGlint = clamp(drop1 * 0.95 + drop2 * 0.65, 0.0, 1.0);

      // Pure colorless low-iron crystal + crisp visible thick-glass refraction on D-handle & cut-crystal sham base!
      albedo = mix(vec3(0.86, 0.92, 0.97), vec3(0.99, 0.995, 1.0), clamp(edgeRim * 0.88 + dropGlint * 0.78 + isHandleOrSham * 0.45, 0.0, 1.0));
      roughness = mix(0.014, 0.18, frostMist * 0.70);
      specMul = 3.85;
      emissive = vec3(0.14, 0.18, 0.22) * (edgeRim + isHandleOrSham * 0.45) + vec3(0.34, 0.37, 0.40) * (dropGlint * 0.58 + frostMist * 0.22);
      float baseAlpha = 0.036 + edgeRim * 0.58 + frostMist * 0.12 + dropGlint * 0.24 + isHandleOrSham * (0.24 + 0.42 * edgeRim);
      outAlpha = clamp(baseAlpha, 0.036, 0.86);
    } else if (bId == 26) {
      // === Translucent See-Through Oak-Whisky Highball ('極上・透き通る琥珀ウイスキーソーダ＆強炭酸シュワシュワ気泡', isGlass: true)! ===
      // Rendered OVER prop_drink_highball_ice so the entire towering column of 4 jagged Rock Ice blocks shines visibly inside the amber whisky!
      float coreTrans = pow(clamp(NdotV, 0.0, 1.0), 0.75);
      float hGrad = clamp((vLocalPos.y - 0.022) / 0.128, 0.0, 1.0);
      vec3 oakAmberEdge  = vec3(0.26, 0.045, 0.0012);
      vec3 whiskyGold    = mix(vec3(0.68, 0.21, 0.004), vec3(0.86, 0.34, 0.014), hGrad);
      vec3 whiskySoda    = mix(oakAmberEdge, whiskyGold, coreTrans);

      // Furious Fast-Rising Ultra-Carbonation Soda Bubble Streams ('バチバチ立ち昇る超強炭酸の気泡')!
      float angH = atan(vLocalPos.x, -vLocalPos.z);
      vec2 hc1 = vec2(angH * 9.5, vLocalPos.y * 86.0 - uTime * 3.85);
      vec2 hid1 = floor(hc1);
      float hr1 = fract(sin(dot(hid1, vec2(127.1, 311.7))) * 43758.5453);
      vec2 hj1  = vec2(fract(hr1 * 13.7) - 0.5, fract(hr1 * 29.3) - 0.5) * 0.54;
      float hbub1 = (hr1 > 0.48) ? (1.0 - smoothstep(0.055, 0.15, length(fract(hc1) - 0.5 - hj1))) : 0.0;

      vec2 hc2 = vec2(angH * 16.5 + 3.1, vLocalPos.y * 148.0 - uTime * 5.40);
      vec2 hid2 = floor(hc2);
      float hr2 = fract(sin(dot(hid2, vec2(269.5, 183.3))) * 43758.5453);
      vec2 hj2  = vec2(fract(hr2 * 19.1) - 0.5, fract(hr2 * 37.7) - 0.5) * 0.55;
      float hbub2 = (hr2 > 0.44) ? (1.0 - smoothstep(0.055, 0.16, length(fract(hc2) - 0.5 - hj2))) : 0.0;

      float ultraFizz = clamp(hbub1 * 1.0 + hbub2 * 0.90, 0.0, 1.0);
      albedo = mix(whiskySoda, vec3(1.0, 0.98, 0.88), ultraFizz * 0.92);
      roughness = 0.015;
      specMul = 3.45;
      sssCol = vec3(0.90, 0.34, 0.012) * 0.72;
      emissive = whiskyGold * (0.18 * pow(coreTrans, 1.3))
               + vec3(1.0, 0.98, 0.90) * (ultraFizz * 0.55);
      outAlpha = clamp(0.44 + (1.0 - coreTrans) * 0.32 + ultraFizz * 0.50, 0.42, 0.94);
    } else if (bId >= 14 && bId <= 16) {
      // Exact Per-Vertex UV Mapped Nano Banana Atlases (14 = Liquor Labels, 15 = Brands & Rattan Coaster, 16 = Cocktail Menu Board)
      if (uPbrReady == 1) {
        vec2 uv = clamp(vec2(-vAttrib.z, vAttrib.w), vec2(0.003), vec2(0.997));
        float lf = float(bId);
        vec4 albTex = texture(uPbrAlbedoTex, vec3(uv, lf));
        vec4 norTex = texture(uPbrNormalTex, vec3(uv, lf));
        albedo = pow(clamp(albTex.rgb, 0.0, 1.0), vec3(2.2));
        roughness = albTex.a;
        ao = mix(0.72, 1.0, norTex.a);
        vec2 tN = (norTex.xy * 2.0 - 1.0) * ((bId == 15) ? 1.25 : 0.85);
        if (abs(geomN.y) > 0.65) {
          // Horizontal woven rattan coaster top surface!
          N = normalize(geomN + vec3(-tN.x, 0.0, -tN.y));
          specMul = 0.68;
          emissive = albedo * 0.10;
        } else {
          float xSign = (geomN.z < 0.0) ? -1.0 : 1.0;
          N = normalize(geomN + vec3(tN.x * xSign, -tN.y, 0.0));
          // Metallic 24K gold-foil sheen on embossed gold lettering & borders!
          float goldFoil = smoothstep(0.18, 0.55, albedo.r) * smoothstep(0.05, 0.22, albedo.r - albedo.b * 1.35);
          specMul = mix(0.92, 2.35, goldFoil);
          roughness = mix(roughness, 0.12, goldFoil);
          emissive = albedo * ((bId == 16) ? 0.26 : 0.24);
        }
      } else {
        albedo = vec3(0.82, 0.74, 0.58);
        roughness = 0.32;
      }
    }
  } else if (matId == 12) {
    // === Beachfront Charcoal BBQ Grill, Fresh/Filleted/Grilled Seafood, Resort Cushions & Beach Cinema Shader ===
    int qId = int(variant + 0.5);
    float cook = clamp(vEntityPhase, 0.0, 2.35);
    float sear = smoothstep(0.10, 0.68, cook);
    float charBurn = smoothstep(1.75, 2.25, cook);
    float grillBars = smoothstep(0.62, 0.94, 0.5 + 0.5 * sin((vLocalPos.x * 1.12 + vLocalPos.z * 0.28) * 96.0));

    if (qId == 0) {
      // Glowing Red-Hot Binchotan Charcoal Bed (White-ash bark + pulsing 1300K incandescent orange-red embers!)
      float ashN = noise2D(vWorldPos.xz * 26.0 + vWorldPos.y * 18.0);
      float crackN = noise2D(vWorldPos.xz * 14.0 - vec2(uTime * 0.18, vWorldPos.y * 12.0));
      float pulse = 0.78 + 0.22 * sin(uTime * 3.4 + crackN * 6.28);
      float emberMask = smoothstep(0.32, 0.76, crackN) * (1.0 - clamp(geomN.y, 0.0, 1.0) * 0.28 + 0.28);
      albedo = mix(vec3(0.04, 0.04, 0.045), vec3(0.42, 0.40, 0.38), smoothstep(0.68, 0.92, ashN));
      roughness = 0.86;
      specMul = 0.18;
      vec3 emberCol = mix(vec3(0.95, 0.14, 0.01), vec3(1.25, 0.62, 0.08), smoothstep(0.52, 0.88, crackN));
      emissive = emberCol * emberMask * 1.85 * pulse + vec3(0.28, 0.04, 0.005) * pulse;
    } else if (qId == 1) {
      // Fine Japanese Hinoki Cypress Cutting Board & Chef Knife Handle!
      float grain = sin(vWorldPos.x * 95.0 + noise2D(vWorldPos.xz * 16.0) * 2.5) * 0.5 + 0.5;
      albedo = mix(vec3(0.76, 0.58, 0.34), vec3(0.90, 0.76, 0.50), grain * 0.65);
      roughness = 0.34;
      specMul = 0.78;
    } else if (qId == 2) {
      // Okinawa Tsuboya Yachimun Glazed Ceramic Platter & Soy Pot (Warm stoneware slip + Gosu cobalt & Kerama celadon brushwork!)
      float rUv = clamp(vAttrib.w, 0.0, 1.0);
      float angP = atan(vWorldPos.z - 20.30, vWorldPos.x - 2.16);
      // Traditional Yachimun '飛びカンナ' (chatter-mark) radial texture & potter's wheel glaze rings
      float kanna = smoothstep(0.55, 0.90, 0.5 + 0.5 * sin(angP * 48.0 + rUv * 22.0)) * smoothstep(0.24, 0.42, rUv) * (1.0 - smoothstep(0.68, 0.78, rUv));
      float celadonBand = smoothstep(0.46, 0.54, rUv) * (1.0 - smoothstep(0.66, 0.74, rUv));
      float gosuRim = smoothstep(0.76, 0.84, rUv);
      float brushVar = 0.85 + 0.15 * noise2D(vWorldPos.xz * 42.0);
      vec3 slipCream = mix(vec3(0.93, 0.90, 0.83), vec3(0.82, 0.77, 0.67), kanna * 0.45);
      albedo = mix(slipCream, vec3(0.08, 0.44, 0.46) * brushVar, celadonBand * 0.72);
      albedo = mix(albedo, vec3(0.04, 0.16, 0.46) * brushVar, gosuRim * 0.90);
      roughness = 0.055;
      specMul = 2.55;
    } else if (qId == 3) {
      // Whole Okinawa Akajin Meebai (Coral Trout: Brilliant Vermilion-Red Scales + Electric Sapphire Spots!)
      vec3 fAlb = vec3(0.86, 0.14, 0.11);
      float fR = 0.22, fAo = 1.0;
      if (uPbrReady == 1) {
        sampleFaunaTriplanarPbr(vLocalPos, vLocalNormal, geomN, 20, vec2(4.2, 4.2), vec2(4.2, 4.2), vec2(4.2, 4.2), false, 0.95, fAlb, fR, fAo, N);
      }
      float belly = smoothstep(0.02, -0.045, vLocalPos.y);
      float blueDots = smoothstep(0.74, 0.86, noise2D(vLocalPos.zy * 52.0 + vLocalPos.x * 19.0));
      albedo = mix(vec3(0.88, 0.13, 0.10) * (0.68 + 0.62 * fAlb.r), vec3(0.96, 0.66, 0.58), belly * 0.72);
      albedo = mix(albedo, vec3(0.10, 0.56, 0.98), blueDots * (1.0 - belly) * 0.78);
      roughness = 0.18;
      ao *= mix(0.65, 1.0, fAo);
      specMul = 1.65;
    } else if (qId == 4) {
      // Okinawa Spiny Lobster Carapace (Deep Maroon-Violet/Crimson Raw -> Bright Vermilion Lobster-Red when Grilled!)
      float mottle = noise2D(vLocalPos.xz * 34.0 + vLocalPos.y * 28.0);
      vec3 rawShell = mix(vec3(0.24, 0.05, 0.14), vec3(0.72, 0.18, 0.06), mottle);
      vec3 cookedShell = mix(vec3(0.88, 0.14, 0.03), vec3(1.0, 0.38, 0.06), mottle);
      albedo = mix(rawShell, cookedShell, sear);
      albedo = mix(albedo, vec3(0.04, 0.03, 0.025), charBurn * 0.88);
      roughness = mix(0.18, 0.32, sear);
      specMul = mix(1.85, 1.25, charBurn);
    } else if (qId == 5) {
      // Gourmet Kappo Scored Fish Fillet (Skin-Up Crown + V-Carved Knife Slits & Flaky Juicy White Flesh!)
      bool isSkinTop = (vAttrib.w >= 1.5);
      float skinCode = isSkinTop ? (vAttrib.w - 2.0) : vAttrib.w;
      float myomere = smoothstep(0.48, 0.88, 0.5 + 0.5 * sin((vLocalPos.x * 105.0 + abs(vLocalPos.z) * 48.0)));
      float scaleCheck = 0.5 + 0.5 * sin(vLocalPos.x * 165.0 + vLocalPos.z * 165.0) * sin(vLocalPos.x * 165.0 - vLocalPos.z * 165.0);
      float blisterN = noise2D(vLocalPos.xz * 78.0);

      vec3 rawSurf;
      vec3 cookedSurf;
      if (isSkinTop) {
        // Species-authentic gleaming fish skin on the arched crown!
        if (skinCode > 0.62) {
          rawSurf = mix(vec3(0.64, 0.55, 0.30), vec3(0.93, 0.90, 0.80), scaleCheck * 0.62); // Taman champagne-gold skin
        } else if (skinCode > 0.38) {
          rawSurf = mix(vec3(0.02, 0.68, 0.62), vec3(0.28, 0.92, 0.84), scaleCheck * 0.60); // Irabucha emerald-turquoise skin
        } else if (skinCode > 0.12) {
          rawSurf = mix(vec3(0.84, 0.10, 0.11), vec3(0.98, 0.66, 0.60), scaleCheck * 0.45); // Meebai & Akamachi ruby-crimson skin
        } else {
          rawSurf = mix(vec3(0.10, 0.36, 0.68), vec3(0.82, 0.88, 0.96), scaleCheck * 0.55); // Gurukun & Gaara sapphire-silver skin
        }
        // Crispy blistered Binchotan-roasted skin with dark mahogany grate stripes & bubbling blisters!
        vec3 crispSkin = mix(rawSurf * 0.52 + vec3(0.42, 0.24, 0.06), vec3(0.76, 0.38, 0.08), 0.62);
        crispSkin = mix(crispSkin, vec3(0.95, 0.72, 0.34), smoothstep(0.72, 0.90, blisterN) * 0.55);
        crispSkin = mix(crispSkin, vec3(0.14, 0.05, 0.015), grillBars * sear * 0.88);
        cookedSurf = crispSkin;
      } else {
        // Exposed Sashimi Cross-Section & Opened V-Carved Score Slits -> Moist Flaky Snow-White Steamed Flesh when Grilled!
        float chiai = smoothstep(0.014, 0.022, vLocalPos.y);
        if (skinCode > 0.62) {
          rawSurf = mix(vec3(0.94, 0.80, 0.81), vec3(0.99, 0.96, 0.95), myomere * 0.72);
        } else if (skinCode > 0.38) {
          rawSurf = mix(vec3(0.89, 0.94, 0.94), vec3(0.99, 0.99, 0.98), myomere * 0.76);
        } else if (skinCode > 0.12) {
          rawSurf = mix(vec3(0.95, 0.76, 0.77), vec3(0.99, 0.95, 0.94), myomere * 0.74);
        } else {
          rawSurf = mix(vec3(0.92, 0.54, 0.54), vec3(0.99, 0.91, 0.90), myomere * 0.70);
        }
        rawSurf = mix(rawSurf, vec3(0.78, 0.18, 0.22), chiai * 0.35);
        // Moist flaky ivory-white roasted fish interior with delicate golden edge glaze!
        float edgeToast = smoothstep(0.55, 0.92, blisterN) * 0.38 + grillBars * 0.28;
        cookedSurf = mix(vec3(0.97, 0.94, 0.88), vec3(0.84, 0.52, 0.16), edgeToast * sear);
        cookedSurf = mix(cookedSurf, vec3(0.99, 0.98, 0.95), myomere * 0.35);
      }
      albedo = mix(rawSurf, cookedSurf, sear);
      albedo = mix(albedo, vec3(0.035, 0.028, 0.024), charBurn);
      roughness = mix(0.11, mix(isSkinTop ? 0.20 : 0.15, 0.85, charBurn), sear);
      specMul = mix(2.20, mix(2.05, 0.18, charBurn), sear);
      sssCol = (isSkinTop ? rawSurf * 0.18 : vec3(0.96, 0.78, 0.72) * 0.48) * (1.0 - sear * 0.55);
      emissive = vec3(0.12, 0.05, 0.01) * sear * (1.0 - charBurn) * (isSkinTop ? 0.85 : 0.45);
    } else if (qId == 6) {
      // Shucked Giant Clam Scallop, Mantle/Soy-Butter Broth & Split Spiny Lobster Tail Meat + Golden Lobster Miso!
      float partM = vAttrib.w;
      float grainM = noise2D(vLocalPos.xz * 48.0 + vLocalPos.y * 24.0);
      float segBands = smoothstep(0.60, 0.90, 0.5 + 0.5 * sin(vLocalPos.x * 165.0));
      vec3 rawMeat;
      vec3 roastMeat;
      if (partM > 0.70) {
        // Rich Creamy Golden-Coral Spiny Lobster Tomalley / Miso ('濃厚イセエビ味噌')!
        rawMeat = mix(vec3(0.84, 0.44, 0.08), vec3(0.96, 0.68, 0.16), grainM);
        roastMeat = mix(vec3(0.95, 0.52, 0.06), vec3(1.0, 0.78, 0.20), grainM);
      } else if (partM > 0.35) {
        // Savory Soy-Butter Broth Pool & Ruffled Clam Mantle ('焦がし醤油バター出汁＆ヒモ')!
        rawMeat = mix(vec3(0.82, 0.66, 0.44), vec3(0.56, 0.34, 0.14), grainM);
        roastMeat = mix(vec3(0.68, 0.34, 0.08), vec3(0.92, 0.64, 0.22), grainM);
      } else {
        // Plump Pearlescent Lobster Tail / Giant Scallop Adductor with Crimson Membrane Veins -> Caramelized Soy-Butter Glaze!
        rawMeat = mix(vec3(0.96, 0.93, 0.88), vec3(0.92, 0.28, 0.18), segBands * (partM > 0.12 ? 0.42 : 0.10));
        roastMeat = mix(vec3(0.98, 0.92, 0.80), vec3(0.82, 0.42, 0.09), 0.35 + 0.55 * grainM);
        roastMeat = mix(roastMeat, vec3(0.26, 0.09, 0.02), grillBars * sear * 0.68);
      }
      albedo = mix(rawMeat, roastMeat, sear);
      albedo = mix(albedo, vec3(0.038, 0.030, 0.025), charBurn);
      roughness = mix(0.10, mix(0.16, 0.84, charBurn), sear);
      specMul = mix(2.25, mix(2.15, 0.20, charBurn), sear);
      sssCol = vec3(0.92, 0.72, 0.52) * (1.0 - charBurn) * 0.36;
      emissive = vec3(0.16, 0.07, 0.015) * sear * (1.0 - charBurn);
    } else if (qId == 7) {
      // Garlic Shikuwasa Butter Cube & Fresh Green Shikuwasa Citrus Wedge!
      if (vAttrib.w > 0.5) {
        albedo = vec3(0.18, 0.74, 0.22); // Shikuwasa peel/lime!
        roughness = 0.26;
        specMul = 1.25;
      } else {
        albedo = mix(vec3(0.99, 0.88, 0.40), vec3(0.92, 0.62, 0.14), sear);
        roughness = mix(0.22, 0.06, sear);
        specMul = 2.25;
        emissive = vec3(0.14, 0.10, 0.02);
      }
    } else if (qId == 8) {
      // Plush Resort Sunbrella Daybed Cushion & Woven Macramé Rope Hammock!
      float weave = 0.5 + 0.5 * sin(sampleCoord.x * 110.0) * sin(sampleCoord.z * 110.0 + sampleCoord.y * 80.0);
      albedo = mix(vec3(0.88, 0.84, 0.76), vec3(0.97, 0.95, 0.90), weave);
      roughness = 0.68;
      specMul = 0.26;
    } else if (qId == 9) {
      // Tropical Turquoise or Hibiscus-Coral Bolster Pillow!
      float fab = 0.92 + 0.08 * sin(sampleCoord.x * 130.0 + sampleCoord.z * 130.0);
      albedo = ((vAttrib.w > 0.5) ? vec3(0.94, 0.34, 0.46) : vec3(0.08, 0.68, 0.78)) * fab;
      roughness = 0.62;
      specMul = 0.32;
    } else if (qId == 10) {
      // 3D Beach Chillout Cinema Screen Canvas & Warm Festoon String Lights!
      if (vAttrib.w > 0.5) {
        albedo = vec3(1.0, 0.88, 0.52);
        roughness = 0.10;
        specMul = 2.2;
        emissive = vec3(1.45, 0.92, 0.32) * (0.90 + 0.10 * sin(uTime * 3.0 + vWorldPos.x * 5.0));
      } else {
        // Dreamy animated Tropical Sunset & Chillout Music Equalizer on the 3D Beach Screen!
        float sy = clamp((vWorldPos.y - 6.82) / 1.02, 0.0, 1.0);
        vec3 scrCol = mix(vec3(0.04, 0.24, 0.46), vec3(0.96, 0.42, 0.32), smoothstep(0.15, 0.85, sy));
        float eqBar = 0.22 + 0.18 * sin(vWorldPos.x * 18.0 + uTime * 4.2) * cos(vWorldPos.x * 9.0 - uTime * 2.7);
        if (sy < eqBar) {
          scrCol = mix(scrCol, vec3(0.22, 0.92, 0.98), 0.72);
        }
        albedo = scrCol * 0.45;
        roughness = 0.45;
        specMul = 0.35;
        emissive = scrCol * 0.78;
      }
    } else if (qId == 12) {
      // Whole Okinawa Irabucha (Bluebarred Parrotfish: Vivid Emerald-Turquoise Scales + Salmon-Coral Belly & Beak!)
      vec3 fAlb = vec3(0.5);
      float fR = 0.18, fAo = 1.0;
      if (uPbrReady == 1) {
        sampleFaunaTriplanarPbr(vLocalPos, vLocalNormal, geomN, 20, vec2(4.0, 4.0), vec2(4.0, 4.0), vec2(4.0, 4.0), false, 1.05, fAlb, fR, fAo, N);
      }
      float scaleLum = 0.72 + 0.56 * dot(fAlb, vec3(0.333));
      float belly = smoothstep(0.015, -0.055, vLocalPos.y);
      float beakMask = smoothstep(0.165, 0.195, vLocalPos.z);
      float finRim = smoothstep(0.058, 0.088, abs(vLocalPos.y)) + smoothstep(-0.12, -0.18, vLocalPos.z);
      vec3 turqBody = mix(vec3(0.015, 0.68, 0.64), vec3(0.10, 0.88, 0.78), clamp(vLocalPos.y * 8.0 + 0.5, 0.0, 1.0)) * scaleLum;
      albedo = mix(turqBody, vec3(0.96, 0.46, 0.40) * scaleLum, clamp(belly * 0.68 + beakMask * 0.85, 0.0, 1.0));
      albedo = mix(albedo, vec3(0.06, 0.42, 0.98), clamp(finRim, 0.0, 1.0) * 0.55);
      roughness = 0.14;
      ao *= mix(0.66, 1.0, fAo);
      specMul = 1.95;
      sssCol = vec3(0.04, 0.45, 0.42) * 0.30;
    } else if (qId == 13) {
      // Whole Okinawa Taman (Spangled Emperor: Brassy Champagne-Silver Scales + Electric Cyan Cheek Streaks!)
      vec3 fAlb = vec3(0.6);
      float fR = 0.16, fAo = 1.0;
      if (uPbrReady == 1) {
        sampleFaunaTriplanarPbr(vLocalPos, vLocalNormal, geomN, 20, vec2(4.6, 4.6), vec2(4.6, 4.6), vec2(4.6, 4.6), false, 1.05, fAlb, fR, fAo, N);
      }
      float scaleLum = 0.74 + 0.54 * dot(fAlb, vec3(0.333));
      float dorsal = smoothstep(-0.02, 0.065, vLocalPos.y);
      float cheekZone = smoothstep(0.07, 0.16, vLocalPos.z) * (1.0 - smoothstep(0.03, 0.06, abs(vLocalPos.y)));
      float blueStreaks = smoothstep(0.68, 0.88, 0.5 + 0.5 * sin((vLocalPos.y * 2.4 - vLocalPos.z * 0.8) * 155.0));
      float finRed = smoothstep(0.068, 0.095, vLocalPos.y) + smoothstep(-0.14, -0.19, vLocalPos.z) * 0.5;
      albedo = mix(vec3(0.88, 0.90, 0.94), vec3(0.72, 0.64, 0.36), dorsal) * scaleLum;
      albedo = mix(albedo, vec3(0.08, 0.76, 1.0), cheekZone * blueStreaks * 0.85);
      albedo = mix(albedo, vec3(0.90, 0.22, 0.20), clamp(finRed, 0.0, 1.0) * 0.52);
      roughness = 0.14;
      ao *= mix(0.68, 1.0, fAo);
      specMul = 2.15;
    } else if (qId == 14) {
      // Whole Okinawa Chura-Umi Gaara (Bluefin Trevally: Mirror-Chrome Silver Flank + Neon Cobalt-Sapphire Back & Fins!)
      vec3 fAlb = vec3(0.65);
      float fR = 0.14, fAo = 1.0;
      if (uPbrReady == 1) {
        sampleFaunaTriplanarPbr(vLocalPos, vLocalNormal, geomN, 20, vec2(5.4, 5.4), vec2(5.4, 5.4), vec2(5.4, 5.4), false, 0.90, fAlb, fR, fAo, N);
      }
      float scaleLum = 0.76 + 0.48 * dot(fAlb, vec3(0.333));
      float dorsal = smoothstep(0.0, 0.068, vLocalPos.y);
      float finMask = smoothstep(0.062, 0.092, abs(vLocalPos.y)) + smoothstep(-0.13, -0.19, vLocalPos.z);
      float flecks = smoothstep(0.80, 0.92, noise2D(vLocalPos.zy * 64.0 + vLocalPos.x * 22.0));
      albedo = mix(vec3(0.84, 0.90, 0.96), vec3(0.06, 0.38, 0.92), dorsal * 0.85) * scaleLum;
      albedo = mix(albedo, vec3(0.03, 0.32, 0.98), clamp(finMask, 0.0, 1.0) * 0.88);
      albedo = mix(albedo, vec3(0.08, 0.10, 0.16), flecks * (1.0 - clamp(finMask, 0.0, 1.0)) * 0.45);
      roughness = 0.11;
      ao *= mix(0.70, 1.0, fAo);
      specMul = 2.45;
    } else if (qId == 15) {
      // Whole Okinawa Luxury Akamachi (Flame Snapper: Luminous Ruby-Crimson Back & Streamer Tail -> Pearl-Rose Belly!)
      vec3 fAlb = vec3(0.6);
      float fR = 0.16, fAo = 1.0;
      if (uPbrReady == 1) {
        sampleFaunaTriplanarPbr(vLocalPos, vLocalNormal, geomN, 20, vec2(4.8, 4.8), vec2(4.8, 4.8), vec2(4.8, 4.8), false, 1.0, fAlb, fR, fAo, N);
      }
      float scaleLum = 0.74 + 0.54 * dot(fAlb, vec3(0.333));
      float belly = smoothstep(0.022, -0.048, vLocalPos.y);
      float tailStream = smoothstep(-0.12, -0.20, vLocalPos.z);
      vec3 rubyBack = vec3(0.94, 0.08, 0.16) * scaleLum;
      vec3 pearlBelly = vec3(0.98, 0.84, 0.86) * scaleLum;
      albedo = mix(rubyBack, pearlBelly, belly * (1.0 - tailStream * 0.85) * 0.82);
      roughness = 0.14;
      ao *= mix(0.68, 1.0, fAo);
      specMul = 2.10;
      sssCol = vec3(0.85, 0.10, 0.15) * 0.32;
    } else if (qId == 16) {
      // Traditional Glossy Vermilion-Red Okinawa Sea Fishing Float Cap & Oki-Slot Crimson Lacquer!
      albedo = vec3(0.98, 0.11, 0.05);
      roughness = 0.08;
      specMul = 2.35;
      emissive = vec3(0.28, 0.03, 0.01);
    } else if (qId == 17) {
      // Commercial 3D Faceted Prism-Cut Okinawa Hibiscus Lamp ('CHURA HANA 30' Top-Left & Top-Right Geki-Atsu Flowers!)
      ao = 1.0;
      float partCode = vAttrib.w;
      bool isRainbow = (vEntityPhase > 1.5);
      float lit = isRainbow ? clamp(vEntityPhase - 1.5, 0.0, 1.5) : clamp(vEntityPhase, 0.0, 1.45);
      float pAng = atan(vLocalPos.y, vLocalPos.x);
      float pRad = length(vLocalPos.xy);

      // Molded diamond prism-cut acrylic micro-facets on hibiscus lens!
      float prismA = sin(pRad * 260.0 + pAng * 15.0);
      float prismB = cos(pRad * 260.0 - pAng * 15.0);
      float facetSparkle = 0.82 + 0.34 * prismA * prismB;
      N = normalize(N + vec3(prismA * 0.16, prismB * 0.16, 0.0));

      if (partCode > 0.72) {
        // Protruding Hibiscus style column & golden pollen anthers
        albedo = mix(vec3(0.42, 0.26, 0.05), vec3(1.0, 0.94, 0.38), clamp(lit, 0.0, 1.0));
        emissive = vec3(3.6, 2.75, 0.55) * lit * facetSparkle;
      } else if (partCode > 0.44) {
        // Serrated prism-cut emerald Hibiscus leaves
        vec3 leafDark = vec3(0.015, 0.13, 0.045) * facetSparkle;
        vec3 leafLit  = vec3(0.10, 0.98, 0.34);
        albedo = mix(leafDark, leafLit, clamp(lit, 0.0, 1.0));
        emissive = vec3(0.14, 2.35, 0.48) * lit * facetSparkle;
      } else {
        // 5 Cupped Ruffled Translucent Ruby-Crystal Petals!
        float coreT = 1.0 - clamp(partCode / 0.36, 0.0, 1.0);
        float vein = 0.88 + 0.12 * cos(pAng * 35.0);
        // Unlit looks like a deep smoked ruby-garnet crystal lens catching bar highlights
        vec3 unlitPet = mix(vec3(0.18, 0.012, 0.042), vec3(0.34, 0.035, 0.085), fresnel * 0.75 + coreT * 0.25) * facetSparkle;
        vec3 litPet = mix(vec3(1.0, 0.04, 0.22), vec3(1.0, 0.62, 0.14), coreT * 0.72) * vein;
        if (isRainbow) {
          litPet = 0.56 + 0.44 * cos(uTime * 10.0 - pRad * 32.0 + pAng * 2.0 + vec3(0.0, 2.094, 4.188));
        }
        albedo = mix(unlitPet, litPet, clamp(lit, 0.0, 1.0));
        // Intense central LED hotspot radiating from flower throat through prism facets!
        float ledHotspot = 0.72 + 0.85 * coreT * coreT;
        emissive = litPet * (2.95 * lit * ledHotspot * facetSparkle) + vec3(0.08, 0.01, 0.02) * fresnel;
      }
      roughness = 0.055;
      specMul = 2.85;
    } else if (qId == 18) {
      // Commercial 21-Stop Backlit Silkscreen Reel Drum (Left=0, Center=1, Right=2 in uOkiSlotAtlasTex!)
      ao = 1.0;
      int reelIdx = clamp(int(floor(vEntityPhase / 10.0 + 0.01)), 0, 2);
      float blCode = vEntityPhase - float(reelIdx) * 10.0;

      float alpha = atan(vLocalPos.y, -vLocalPos.z);
      const float TAU_R = 6.28318530718;
      float vReel = fract(-alpha / TAU_R + 0.5 / 21.0);
      float uWithin = clamp(0.5 - vLocalPos.x / 0.106, 0.015, 0.985);
      float uAtlas = (float(reelIdx) * 384.0 + uWithin * 384.0) / 2048.0;

      vec3 tapeLin = vec3(0.94, 0.95, 0.97);
      if (uOkiSlotAtlasReady == 1) {
        vec3 srgbSym = textureLod(uOkiSlotAtlasTex, vec2(uAtlas, vReel), 0.0).rgb;
        tapeLin = pow(clamp(srgbSym, vec3(0.0), vec3(1.0)), vec3(2.1));
      }

      // Subtle internal drum shadow toward top/bottom window edges for realistic 3D barrel depth
      float frontCos = clamp(-vLocalNormal.z, 0.0, 1.0);
      float barrelShade = mix(0.52, 1.0, pow(frontCos, 0.60));

      // Backlight modes: 0.18 = 消灯フリーズ, 1.0 = Crisp modern white LED, 2.5 = Win V-Flash, 3.5 = Rainbow Bonus!
      vec3 blTint = vec3(0.88, 0.90, 0.95);
      if (blCode < 0.45) {
        blTint = vec3(0.08, 0.09, 0.14); // Dramatic Backlight Blackout ('消灯演出')!
      } else if (blCode > 3.0) {
        vec3 rb = 0.78 + 0.26 * cos(uTime * 8.0 + vLocalPos.y * 18.0 + float(reelIdx) * 1.4 + vec3(0.0, 2.094, 4.188));
        blTint = rb * 0.95;
      } else if (blCode > 1.8) {
        float fl = 0.65 + 0.60 * sin(uTime * 22.0 - abs(vLocalPos.y) * 24.0);
        blTint = vec3(1.05, 0.98, 0.84) * fl;
      }

      albedo = tapeLin * barrelShade * 0.55;
      roughness = 0.16;
      specMul = 1.45;
      emissive = tapeLin * blTint * barrelShade;
    } else if (qId == 19) {
      // Commercial Concave Illuminated Reel Stop Button (Blue-Cyan Ready -> Ruby Stopped -> Pearl Idle!)
      ao = 1.0;
      float rBtn = length(vLocalPos.xy) / 0.019;
      float ringGlow = 0.72 + 0.28 * smoothstep(0.45, 0.92, rBtn);
      if (vEntityPhase > 1.5) {
        albedo = vec3(0.95, 0.08, 0.14);
        emissive = vec3(1.45, 0.08, 0.14) * ringGlow;
      } else if (vEntityPhase > 0.5) {
        albedo = vec3(0.06, 0.72, 1.0);
        emissive = vec3(0.12, 1.35, 2.15) * ringGlow;
      } else {
        albedo = vec3(0.72, 0.68, 0.62);
        emissive = vec3(0.16, 0.14, 0.11) * ringGlow;
      }
      roughness = 0.09;
      specMul = 2.35;
    } else if (qId == 24) {
      // Commercial Oki-Slot Backlit Acrylic Panels ('美ら華-30' Belly Glass & Upper Marquee) + Stamped 30Φ Gold Coins!
      ao = 1.0;
      if (vAttrib.w < 0.35) {
        // Lower Backlit Belly Glass Panel ('美ら華-30 CHURA HANA', x in [+0.188..-0.188], y in [0.091..0.217])
        float uSub = clamp((0.188 - vLocalPos.x) / 0.376, 0.003, 0.997);
        float vSub = clamp((0.217 - vLocalPos.y) / 0.126, 0.003, 0.997);
        vec2 uvA = vec2((1152.0 + uSub * 896.0) / 2048.0, (vSub * 512.0) / 2048.0);
        vec3 srgbP = (uOkiSlotAtlasReady == 1) ? textureLod(uOkiSlotAtlasTex, uvA, 0.0).rgb : vec3(0.75, 0.12, 0.18);
        vec3 linP = pow(clamp(srgbP, vec3(0.0), vec3(1.0)), vec3(2.15));
        float bonusBoost = 1.0 + clamp(vEntityPhase, 0.0, 2.0) * 0.38;
        albedo = linP * 0.45;
        emissive = linP * (0.92 * bonusBoost);
        roughness = 0.06;
        specMul = 2.65;
      } else if (vAttrib.w < 0.70) {
        // Upper Smoked-Mirror Blackout Hibiscus Stage ('沖ドキ！BLACK × ベガ', x in [+0.194..-0.194], y in [0.542..0.802])
        float uSub = clamp((0.194 - vLocalPos.x) / 0.388, 0.003, 0.997);
        float vSub = clamp((0.802 - vLocalPos.y) / 0.260, 0.003, 0.997);
        vec2 uvA = vec2((1152.0 + uSub * 896.0) / 2048.0, (512.0 + vSub * 512.0) / 2048.0);
        vec3 srgbM = (uOkiSlotAtlasReady == 1) ? textureLod(uOkiSlotAtlasTex, uvA, 0.0).rgb : vec3(0.02, 0.01, 0.03);
        vec3 linM = pow(clamp(srgbM, vec3(0.0), vec3(1.0)), vec3(2.15));
        albedo = linM * 0.28;
        emissive = linM * 0.98;
        roughness = 0.04;
        specMul = 2.85;
      } else {
        // Stamped 30-Phi 24K Gold Hibiscus Tokens piled in the Lower Tray!
        vec2 cUv = fract(vLocalPos.xz * 28.5 + vec2(0.5));
        vec2 uvCoin = vec2((1152.0 + cUv.x * 512.0) / 2048.0, (1024.0 + cUv.y * 512.0) / 2048.0);
        vec3 cTex = (uOkiSlotAtlasReady == 1) ? textureLod(uOkiSlotAtlasTex, uvCoin, 0.0).rgb : vec3(0.95, 0.76, 0.22);
        albedo = pow(clamp(cTex, vec3(0.0), vec3(1.0)), vec3(1.8)) * vec3(1.12, 0.95, 0.42);
        roughness = 0.11;
        specMul = 3.10;
        emissive = albedo * 0.10;
      }
    } else if (qId == 25) {
      // Dynamic Commercial Oki-Slot Side Rainbow & Mode-Hint Neon Diffuser Pillars ('okislot_side_leds')!
      ao = 1.0;
      float hNorm = clamp(vAttrib.w, 0.0, 1.0);
      float rib = 0.80 + 0.20 * sin(vLocalPos.y * 280.0);
      int modeCode = int(floor(vEntityPhase + 0.1));
      float idleWave = 0.5 + 0.5 * sin(uTime * 2.4 - hNorm * 3.8);
      vec3 neonCol = mix(vec3(0.62, 0.14, 0.88), vec3(1.0, 0.78, 0.28), idleWave) * 0.52; // Modern BLACK-30 Feather/Side LED breathe!
      if (modeCode == 1) {
        // 1 = Hibiscus Chika Scarlet-Gold Strobe!
        float pls = 0.55 + 0.45 * sin(uTime * 18.0 - hNorm * 4.0);
        neonCol = mix(vec3(1.0, 0.06, 0.22), vec3(1.0, 0.75, 0.12), pls) * 2.15;
      } else if (modeCode == 2) {
        // 2 = BIG BONUS / 1G-Ren Flowing 7-Color Rainbow Neon Cascade!
        neonCol = (0.55 + 0.45 * cos(uTime * 7.5 - hNorm * 6.283 + vec3(0.0, 2.094, 4.188))) * 2.35;
      } else if (modeCode >= 3) {
        // 3..6 = REG BONUS Post-Game Heaven Mode Hint Flash (3=Blue, 4=Yellow, 5=Green, 6=Red)!
        float breathe = 0.65 + 0.35 * sin(uTime * 8.0);
        if (modeCode == 3) neonCol = vec3(0.08, 0.52, 1.0) * 1.95 * breathe;
        else if (modeCode == 4) neonCol = vec3(1.0, 0.82, 0.08) * 1.95 * breathe;
        else if (modeCode == 5) neonCol = vec3(0.10, 0.96, 0.34) * 1.95 * breathe;
        else neonCol = vec3(1.0, 0.08, 0.16) * 2.25 * breathe;
      }
      albedo = neonCol * 0.35;
      emissive = neonCol * rib;
      roughness = 0.08;
      specMul = 2.20;
    } else if (qId == 26) {
      // Crisp Procedural 7-Segment LED Apron & Overhead Parlor 'デー太郎' Data Counter Screen!
      ao = 1.0;
      albedo = vec3(0.012, 0.010, 0.016);
      roughness = 0.05;
      specMul = 2.75;
      if (vAttrib.w < 0.50) {
        // Cabinet 7-Seg Digital Apron (x in [+0.176..-0.176], y in [0.302..0.336])
        float ux = clamp((0.176 - vLocalPos.x) / 0.352, 0.0, 1.0);
        float uy = clamp((vLocalPos.y - 0.302) / 0.034, 0.0, 1.0);
        // Left 1-2-3 BET emerald diamonds
        if (ux > 0.05 && ux < 0.22 && uy > 0.24 && uy < 0.76) {
          float cell = fract((ux - 0.05) / 0.056);
          if (cell > 0.18 && cell < 0.82) emissive = vec3(0.08, 1.25, 0.68);
        }
        // Center CREDIT [50] & PAYOUT red 7-segment boxes
        if ((ux > 0.30 && ux < 0.44) || (ux > 0.54 && ux < 0.68)) {
          if (uy > 0.18 && uy < 0.82) {
            vec2 dg = fract(vec2(ux * 36.0, uy * 3.0));
            bool segBar = (dg.x < 0.20 || dg.x > 0.80 || dg.y < 0.22 || dg.y > 0.78);
            emissive = segBar ? vec3(1.75, 0.10, 0.14) : vec3(0.10, 0.01, 0.015);
          }
        }
        // Right '華1G連' bonus stock lamp & REPLAY/START indicators
        if (ux > 0.78 && ux < 0.94 && uy > 0.24 && uy < 0.76) {
          bool stockOn = (vEntityPhase > 0.5);
          emissive = stockOn
            ? (0.6 + 0.4 * cos(uTime * 10.0 + vec3(0.0, 2.1, 4.2))) * 2.4
            : vec3(0.12, 0.55, 0.95);
        }
      } else {
        // Overhead Parlor Data Counter ('デー太郎': BIG / REG / GAME 7-seg + 10-column LED history graph!)
        float ux = clamp((0.172 - vLocalPos.x) / 0.344, 0.0, 1.0);
        float uy = clamp((vLocalPos.y - 0.890) / 0.116, 0.0, 1.0);
        // Top header accent line
        if (uy > 0.86 && uy < 0.93 && ux > 0.04 && ux < 0.96) {
          emissive = vec3(0.15, 0.72, 1.15);
        }
        // Left 3 digital counters: BIG (Red), REG (Amber), GAME (Emerald)
        if (uy > 0.18 && uy < 0.76 && ux > 0.05 && ux < 0.54) {
          int boxIdx = int(floor((ux - 0.05) / 0.165));
          float bx = fract((ux - 0.05) / 0.165);
          if (bx > 0.08 && bx < 0.90) {
            vec2 dg = fract(vec2(bx * 2.2, (uy - 0.18) / 0.58 * 2.0));
            bool onSeg = (dg.x < 0.18 || dg.x > 0.82 || dg.y < 0.18 || dg.y > 0.82);
            vec3 cSeg = (boxIdx == 0) ? vec3(2.1, 0.12, 0.18) : (boxIdx == 1 ? vec3(2.0, 0.72, 0.08) : vec3(0.14, 1.85, 0.52));
            emissive = onSeg ? cSeg : cSeg * 0.08;
          }
        }
        // Right 10-column Parlor History Bar Graph ('粒グラフ')
        if (ux > 0.57 && ux < 0.95 && uy > 0.14 && uy < 0.80) {
          float colIdx = floor((ux - 0.57) / 0.038);
          float cxF = fract((ux - 0.57) / 0.038);
          float rowF = fract((uy - 0.14) / 0.066);
          float barH = 0.22 + 0.56 * fract(sin(colIdx * 19.7 + 1.3) * 437.5);
          if (cxF > 0.18 && cxF < 0.82 && rowF > 0.22 && (uy - 0.14) < barH) {
            emissive = (uy > 0.56) ? vec3(2.0, 0.16, 0.22) : (uy > 0.36 ? vec3(1.85, 0.85, 0.12) : vec3(0.12, 1.65, 0.58));
          }
        }
      }
    } else if (qId == 27) {
      // Curved Anti-Reflection Tempered Reel Window Front Glass!
      ao = 1.0;
      albedo = vec3(0.75, 0.88, 0.98);
      roughness = 0.03;
      specMul = 3.20;
      emissive = vec3(0.06, 0.11, 0.16) * fresnel;
      outAlpha = clamp(0.05 + fresnel * 0.38, 0.05, 0.42);
    } else if (qId == 20) {
      // Chiseled Okinawa Ryukyu Coral-Limestone Ashlar Masonry (Fossilized coral pores + recessed mortar joints!)
      float courseY = floor(vWorldPos.y * 5.2);
      float rowFract = fract(vWorldPos.y * 5.2);
      float horizU = (abs(geomN.x) > abs(geomN.z)) ? vWorldPos.z : vWorldPos.x;
      float stagger = mod(courseY, 2.0) * 0.42;
      float colFract = fract(horizU * 1.45 + stagger);
      vec2 blockId = vec2(floor(horizU * 1.45 + stagger), courseY);
      float blockHash = fract(sin(dot(blockId, vec2(127.1, 311.7))) * 43758.5453);

      float mortarH = 1.0 - smoothstep(0.035, 0.085, min(rowFract, 1.0 - rowFract));
      float mortarV = 1.0 - smoothstep(0.025, 0.068, min(colFract, 1.0 - colFract));
      float isTopSlab = smoothstep(0.65, 0.90, abs(geomN.y));
      float mortar = clamp(max(mortarH, mortarV) * (1.0 - isTopSlab * 0.65), 0.0, 1.0);

      float coralPits = noise2D(sampleCoord.xz * 38.0 + sampleCoord.y * 34.0);
      float macroWeath = noise2D(sampleCoord.xz * 4.5 + sampleCoord.y * 3.8);
      vec3 stoneWarm = mix(vec3(0.85, 0.80, 0.68), vec3(0.71, 0.65, 0.53), blockHash * 0.65 + macroWeath * 0.35);
      stoneWarm = mix(stoneWarm, vec3(0.54, 0.48, 0.39), smoothstep(0.66, 0.92, coralPits) * 0.48);
      albedo = mix(stoneWarm, vec3(0.46, 0.42, 0.35), mortar * 0.82);
      roughness = mix(0.72, 0.92, mortar);
      specMul = 0.28;
      ao *= mix(1.0, 0.52, mortar);
      float bevelY = (rowFract < 0.09 ? -1.0 : (rowFract > 0.91 ? 1.0 : 0.0)) * mortarH;
      N = normalize(N + vec3(0.0, bevelY * 0.32, 0.0));
    } else if (qId == 21) {
      // Sheer Billowing Ivory 5-Star Resort Cabana Linen Drape (Vertical pleat folds + warm sunlight SSS!)
      float pleatArg = (vWorldPos.x * 1.15 + vWorldPos.z * 1.15) * 28.0 + sin(vWorldPos.y * 3.5) * 1.2;
      float pleat = sin(pleatArg);
      float weave = 0.95 + 0.05 * sin(vWorldPos.y * 160.0) * cos((vWorldPos.x + vWorldPos.z) * 160.0);
      albedo = mix(vec3(0.90, 0.86, 0.78), vec3(0.99, 0.97, 0.93), 0.5 + 0.5 * pleat) * weave;
      roughness = 0.54;
      specMul = 0.36;
      sssCol = vec3(0.98, 0.90, 0.74) * 0.62;
      emissive = vec3(0.14, 0.12, 0.09) * (0.45 + 0.55 * fresnel);
      N = normalize(geomN + vec3(cos(pleatArg) * 0.24, 0.0, -cos(pleatArg) * 0.24));
    } else if (qId == 22) {
      // Live Flickering Island Kagaribi / Copper Tiki Torch Flame!
      float hT = clamp(vAttrib.w, 0.0, 1.0);
      float turb = sin(uTime * 12.5 + vWorldPos.x * 7.0 + hT * 5.0) * cos(uTime * 8.8 - vWorldPos.z * 6.0);
      vec3 coreCol = mix(vec3(1.0, 0.28, 0.02), vec3(1.0, 0.92, 0.48), 1.0 - hT * 0.75);
      albedo = coreCol;
      roughness = 0.15;
      specMul = 0.2;
      emissive = coreCol * (2.65 + 0.75 * turb) * (1.0 + uTodSunColor.w * 0.55);
    } else if (qId == 23) {
      // 5-Star Custom Dive Yacht Midnight-Sapphire Hull Clearcoat & Smoked Tinted Flybridge Glass!
      if (vAttrib.w > 0.5) {
        // Smoked dark marine flybridge windshield glass
        albedo = mix(vec3(0.02, 0.05, 0.09), vec3(0.45, 0.78, 0.95), fresnel * 0.78);
        roughness = 0.030;
        specMul = 3.35;
        emissive = vec3(0.05, 0.12, 0.18) * fresnel;
      } else {
        // Deep royal midnight-sapphire yacht hull gelcoat
        albedo = mix(vec3(0.012, 0.048, 0.16), vec3(0.08, 0.28, 0.58), fresnel * 0.55);
        roughness = 0.045;
        specMul = 2.95;
        emissive = vec3(0.01, 0.04, 0.10) * fresnel;
      }
    } else if (qId == 28) {
      // Luxury Ishigaki A5 Wagyu Sirloin Thick-Cut Steak (Fine Shimofuri Marbling -> Diamond Maillard Crust + Medium-Rare Rose Interior!)
      float wgPart = vAttrib.w;
      float nCoarse = noise2D(vLocalPos.xz * 36.0 + vLocalPos.y * 18.0);
      float nFine = noise2D(vLocalPos.xz * 92.0 - vLocalPos.y * 44.0);
      float diamondA = smoothstep(0.68, 0.95, 0.5 + 0.5 * sin((vLocalPos.x + vLocalPos.z) * 125.0));
      float diamondB = smoothstep(0.68, 0.95, 0.5 + 0.5 * sin((vLocalPos.x - vLocalPos.z) * 125.0));
      float diamondGrill = clamp(diamondA + diamondB, 0.0, 1.0);

      if (wgPart > 0.72) {
        // Whole / Roasted Golden Island Garlic Cloves
        vec3 rawGar = vec3(0.96, 0.93, 0.82);
        vec3 rstGar = mix(vec3(0.90, 0.64, 0.24), vec3(0.58, 0.28, 0.06), nCoarse);
        albedo = mix(rawGar, rstGar, sear);
        roughness = mix(0.28, 0.16, sear);
        specMul = 1.65;
      } else if (wgPart > 0.35) {
        // Sweet Creamy Outer Wagyu Fat Cap -> Crispy Golden-Amber Rendered Fat!
        vec3 rawFat = mix(vec3(0.96, 0.92, 0.88), vec3(0.99, 0.97, 0.94), nFine);
        vec3 crispFat = mix(vec3(0.94, 0.68, 0.28), vec3(0.64, 0.28, 0.05), 0.45 + 0.55 * diamondGrill);
        albedo = mix(rawFat, crispFat, sear);
        albedo = mix(albedo, vec3(0.035, 0.025, 0.02), charBurn);
        roughness = mix(0.18, 0.10, sear);
        specMul = 2.45;
        sssCol = vec3(0.95, 0.82, 0.68) * (1.0 - charBurn) * 0.38;
      } else {
        // Intricate A5 BMS-12 Shimofuri Marbling Veins!
        float vein1 = 1.0 - abs(sin(vLocalPos.x * 84.0 + nCoarse * 5.2 + vLocalPos.z * 32.0));
        float vein2 = 1.0 - abs(sin(vLocalPos.z * 96.0 + nFine * 4.6 - vLocalPos.x * 28.0));
        float shimofuri = clamp(smoothstep(0.76, 0.97, vein1) * 0.75 + smoothstep(0.80, 0.98, vein2) * 0.55, 0.0, 1.0);
        vec3 rawBeef = mix(vec3(0.62, 0.045, 0.065), vec3(0.97, 0.92, 0.90), shimofuri * 0.88);
        // Top/bottom faces sear into deep mahogany Maillard crust; angled slice sides show luscious medium-rare rose!
        bool isCrustFace = abs(vLocalNormal.y) > 0.48;
        vec3 maillardCrust = mix(vec3(0.42, 0.15, 0.05), vec3(0.24, 0.08, 0.025), nCoarse * 0.65);
        maillardCrust = mix(maillardCrust, vec3(0.08, 0.025, 0.01), diamondGrill * 0.78);
        maillardCrust = mix(maillardCrust, vec3(0.76, 0.48, 0.20), shimofuri * 0.26);
        // Juicy medium-rare rose-pink center tapering to 2mm seared rim at top/bottom!
        float rimDist = smoothstep(0.010, 0.0145, abs(vLocalPos.y - 0.0155));
        vec3 medRareRose = mix(vec3(0.76, 0.14, 0.18), vec3(0.92, 0.68, 0.66), shimofuri * 0.52);
        vec3 sliceCooked = mix(medRareRose, maillardCrust, rimDist * 0.88);
        vec3 targetCooked = isCrustFace ? maillardCrust : sliceCooked;
        albedo = mix(rawBeef, targetCooked, sear);
        albedo = mix(albedo, vec3(0.032, 0.024, 0.020), charBurn);
        // Black pepper & sea-salt crystals sparkling on steak crust
        float spice = smoothstep(0.91, 0.97, noise2D(vLocalPos.xz * 190.0));
        albedo = mix(albedo, vec3(0.06, 0.05, 0.04), spice * 0.45);
        roughness = mix(0.14, mix(isCrustFace ? 0.13 : 0.10, 0.86, charBurn), sear);
        specMul = mix(2.10, mix(2.55, 0.18, charBurn), sear);
        sssCol = vec3(0.75, 0.12, 0.14) * (1.0 - (isCrustFace ? sear : sear * 0.35)) * 0.42;
        emissive = vec3(0.14, 0.04, 0.01) * sear * (1.0 - charBurn);
      }
    } else if (qId == 29) {
      // Twin Okinawa Agu-Pork & Rainbow Island Veggie Brochette Skewers!
      float skCode = vAttrib.w;
      float nSk = noise2D(vLocalPos.xz * 54.0 + vLocalPos.y * 42.0);
      vec3 rawC;
      vec3 roastC;
      if (skCode < 0.12) {
        // Thick Okinawa Agu-Pork Belly (Layered rosy pork & sweet white fat -> Glossy caramelized tare glaze!)
        float fatLayer = smoothstep(0.35, 0.72, 0.5 + 0.5 * sin(vLocalPos.y * 230.0 + nSk * 2.4));
        rawC = mix(vec3(0.84, 0.34, 0.38), vec3(0.98, 0.94, 0.92), fatLayer * 0.82);
        roastC = mix(vec3(0.62, 0.24, 0.06), vec3(0.92, 0.66, 0.30), fatLayer * 0.58);
        roastC = mix(roastC, vec3(0.16, 0.05, 0.015), grillBars * sear * 0.75);
      } else if (skCode < 0.38) {
        // Glossy Red Island Paprika -> Sweet Blistered Char!
        rawC = mix(vec3(0.88, 0.07, 0.05), vec3(0.98, 0.22, 0.08), nSk);
        roastC = mix(rawC * 0.92, vec3(0.14, 0.04, 0.01), grillBars * sear * 0.62);
      } else if (skCode < 0.62) {
        // Crisp Emerald Island Bell Pepper!
        rawC = mix(vec3(0.06, 0.52, 0.10), vec3(0.18, 0.74, 0.16), nSk);
        roastC = mix(vec3(0.10, 0.44, 0.07), vec3(0.12, 0.06, 0.02), grillBars * sear * 0.58);
      } else if (skCode < 0.85) {
        // Sweet Golden Island Corn Coblet (3D Kernel Rows -> Soy-Butter Browned Corn!)
        float kRow = sin(vLocalPos.x * 380.0);
        float kAng = sin(atan(vLocalPos.y - 0.019, vLocalPos.z) * 14.0);
        float kGap = smoothstep(0.25, -0.35, min(abs(kRow), abs(kAng)));
        rawC = mix(vec3(0.99, 0.80, 0.14), vec3(0.76, 0.52, 0.08), kGap * 0.65);
        roastC = mix(vec3(0.96, 0.68, 0.10), vec3(0.46, 0.18, 0.03), grillBars * sear * 0.68 + kGap * 0.30);
      } else {
        // Cross-Scored Donko Shiitake Mushroom Cap ('飾り切り椎茸': unscored smooth cap at skCode <= 0.90, white X star-cut at skCode > 0.90!)
        vec2 shRel = vLocalPos.xz - vec2(0.085, -0.032);
        float starCut = (skCode > 0.90 && vLocalPos.y > 0.028 && (abs(shRel.x + shRel.y) < 0.0032 || abs(shRel.x - shRel.y) < 0.0032)) ? 1.0 : 0.0;
        rawC = mix(vec3(0.28, 0.16, 0.08), vec3(0.95, 0.91, 0.82), starCut);
        roastC = mix(vec3(0.20, 0.10, 0.04), vec3(0.88, 0.74, 0.50), starCut);
      }
      albedo = mix(rawC, roastC, sear);
      albedo = mix(albedo, vec3(0.035, 0.028, 0.022), charBurn);
      roughness = mix(0.16, mix(0.12, 0.85, charBurn), sear);
      specMul = mix(1.95, mix(2.35, 0.18, charBurn), sear);
      emissive = vec3(0.13, 0.05, 0.01) * sear * (1.0 - charBurn);
    } else if (qId == 30) {
      // Gourmet Platter Garnishes & Koregusu Bottle (Oba Leaf, Cut Shikuwasa Pulp, Daikon Oroshi, Chili-Awamori!)
      float gCode = vAttrib.w;
      if (gCode < 0.24) {
        // Fresh Emerald Oba Leaf, Rosemary, Scallions & Shikuwasa Rind!
        float vein = 0.84 + 0.16 * sin(vWorldPos.x * 260.0 + vWorldPos.z * 260.0);
        albedo = mix(vec3(0.05, 0.48, 0.11), vec3(0.16, 0.72, 0.18), clamp(gCode * 5.0, 0.0, 1.0)) * vein;
        roughness = 0.24;
        specMul = 1.35;
        sssCol = vec3(0.18, 0.75, 0.20) * 0.45;
      } else if (gCode < 0.55) {
        // Juicy Cut Okinawa Shikuwasa Citrus Flesh (White pith rim + 8 sparkling golden-lime radial segments!)
        float rSeg = clamp((gCode - 0.30) / 0.18, 0.0, 1.0);
        float cAng = atan(vWorldPos.z - 20.22, vWorldPos.x - 2.25);
        float membrane = smoothstep(0.84, 0.97, abs(cos(cAng * 4.0))) + smoothstep(0.82, 0.96, rSeg);
        float vesicles = 0.85 + 0.15 * noise2D(vWorldPos.xz * 320.0);
        vec3 pulp = vec3(0.68, 0.88, 0.12) * vesicles;
        albedo = mix(pulp, vec3(0.95, 0.97, 0.88), clamp(membrane, 0.0, 1.0) * 0.85);
        roughness = 0.07;
        specMul = 2.45;
        sssCol = vec3(0.65, 0.85, 0.15) * 0.42;
      } else if (gCode < 0.80) {
        // Fluffy Snowy Daikon Oroshi, Sea Salt & Golden Grated Island Ginger Crown!
        float grt = noise2D(vWorldPos.xz * 220.0 + vWorldPos.y * 220.0);
        albedo = (gCode > 0.68)
          ? mix(vec3(0.92, 0.74, 0.22), vec3(0.98, 0.86, 0.42), grt)
          : mix(vec3(0.92, 0.94, 0.95), vec3(0.99, 0.99, 1.0), grt);
        roughness = 0.46;
        specMul = 0.65;
        sssCol = albedo * 0.35;
      } else {
        // Artisanal Koregusu Chili-Awamori Glass Bottle (Golden-amber awamori + vivid red island chilies inside!)
        float chiliBand = smoothstep(0.62, 0.82, sin(vWorldPos.y * 95.0 + vWorldPos.x * 110.0)) * smoothstep(6.95, 6.88, vWorldPos.y);
        albedo = mix(vec3(0.86, 0.54, 0.12), vec3(0.92, 0.06, 0.04), chiliBand * 0.85);
        roughness = 0.05;
        specMul = 2.75;
        emissive = albedo * 0.18;
      }
    } else {
      // Soft Wispy Translucent Charcoal BBQ Sizzle Steam OR Expanding Water-Surface Fishing Foam Ring!
      bool isSplashRing = (vLocalPos.y < 0.045 && length(vLocalPos.xz) > 0.10);
      if (isSplashRing) {
        albedo = vec3(0.94, 0.99, 1.0);
        roughness = 0.25;
        specMul = 1.1;
        emissive = vec3(0.24, 0.42, 0.50);
        outAlpha = 0.56;
      } else {
        float softEdge = pow(clamp(NdotV, 0.0, 1.0), 2.1);
        float heightFade = 1.0 - clamp(vLocalPos.y * 2.2, 0.0, 1.0);
        albedo = vec3(0.96, 0.94, 0.90);
        roughness = 0.92;
        specMul = 0.0;
        emissive = vec3(0.28, 0.25, 0.22);
        outAlpha = clamp(0.20 * softEdge * heightFade, 0.0, 0.22);
      }
    }
  }
${Hs}
`,gr=`
mat4 fetchJointMat(sampler2D jointTex, int jointIdx) {
  vec4 c0 = texelFetch(jointTex, ivec2(0, jointIdx), 0);
  vec4 c1 = texelFetch(jointTex, ivec2(1, jointIdx), 0);
  vec4 c2 = texelFetch(jointTex, ivec2(2, jointIdx), 0);
  vec4 c3 = texelFetch(jointTex, ivec2(3, jointIdx), 0);
  return mat4(c0, c1, c2, c3);
}

mat4 evalSkinMatrix(sampler2D jointTex, vec4 joints, vec4 weights) {
  float wSum = weights.x + weights.y + weights.z + weights.w;
  vec4 w = (wSum > 1e-5) ? (weights / wSum) : vec4(1.0, 0.0, 0.0, 0.0);
  mat4 m = fetchJointMat(jointTex, int(joints.x + 0.5)) * w.x;
  if (w.y > 1e-4) m += fetchJointMat(jointTex, int(joints.y + 0.5)) * w.y;
  if (w.z > 1e-4) m += fetchJointMat(jointTex, int(joints.z + 0.5)) * w.z;
  if (w.w > 1e-4) m += fetchJointMat(jointTex, int(joints.w + 0.5)) * w.w;
  return m;
}
`,m0=`#version 300 es
precision highp float;
precision highp sampler2D;

layout(location = 0) in vec3 aPos;
layout(location = 1) in vec3 aNormal;
layout(location = 2) in vec2 aUv;
layout(location = 3) in vec4 aJoints;
layout(location = 4) in vec4 aWeights;

uniform sampler2D uJointTex;
uniform mat4 uModelRootMat;
uniform mat4 uSunViewProj;

out vec2 vUv;

${gr}

void main() {
  mat4 skinMat = evalSkinMatrix(uJointTex, aJoints, aWeights);
  vec4 worldPos = uModelRootMat * (skinMat * vec4(aPos, 1.0));
  vUv = aUv;
  gl_Position = uSunViewProj * worldPos;
}
`,f0=`#version 300 es
precision highp float;
precision highp sampler2D;

in vec2 vUv;
uniform sampler2D uBaseColorTex;
uniform vec4 uBaseColorFactor;
uniform float uAlphaCutoff;

void main() {
  if (uAlphaCutoff >= 0.0) {
    float a = texture(uBaseColorTex, vUv).a * uBaseColorFactor.a;
    if (a < uAlphaCutoff) discard;
  }
}
`,p0=`#version 300 es
precision highp float;
precision highp sampler2D;

layout(location = 0) in vec3 aPos;
layout(location = 1) in vec3 aNormal;
layout(location = 2) in vec2 aUv;
layout(location = 3) in vec4 aJoints;
layout(location = 4) in vec4 aWeights;

uniform sampler2D uJointTex;
uniform mat4 uModelRootMat;
uniform mat4 uViewProj;

out vec3 vWorldPos;
out vec3 vWorldNormal;
out vec2 vUv;
out vec3 vBindPos;

${gr}

void main() {
  mat4 skinMat = evalSkinMatrix(uJointTex, aJoints, aWeights);
  mat4 M = uModelRootMat * skinMat;
  vec4 wp = M * vec4(aPos, 1.0);
  vWorldPos = wp.xyz;
  vWorldNormal = normalize(mat3(M) * aNormal);
  vUv = aUv;
  vBindPos = aPos;
  gl_Position = uViewProj * wp;
}
`,g0=`#version 300 es
precision highp float;
precision highp sampler2D;
precision highp sampler2DArray;

in vec3 vWorldPos;
in vec3 vWorldNormal;
in vec2 vUv;
in vec3 vBindPos;

uniform sampler2D uBaseColorTex;
uniform vec4 uBaseColorFactor;
uniform vec2 uUvOffset;
uniform float uAlphaCutoff;
uniform int uPrimGarmentKind; // 0 = hair/face/outfit, 1 = Seed-san body_bake, 2 = Seed-san arms, 3 = custom VRM body wetsuit
uniform int uIsHeadPrim;      // 1 = Head/Face mesh primitive (receives expressive anime cheek blush!)
uniform vec4 uCheekAnchor;    // x = cheekSpanX, y = cheekCenterY, z = faceFrontZ, w = faceSign (+1 VRM1, -1 VRM0)
uniform float uCheekBlush;    // 0..1 warm rosy cheek & tipsy glow intensity
uniform int uSuitMode;        // 0 = Original Outfit / Swimsuit (Pre-Dive), 1..3 = Selectable Okinawa Neoprene Wetsuits!
uniform vec2 uAvatarSuitBounds; // x = neck cut Y, y = wrist cut |X| in bind space

uniform sampler2DArray uPbrAlbedoTex;
uniform sampler2DArray uPbrNormalTex;
uniform int uPbrReady;

uniform vec3 uCamPos;
uniform float uVrmCamFade;
uniform vec3 uSunDir;
uniform float uTime;
uniform mat4 uSunViewProj;
uniform sampler2D uSunShadowTex;

uniform vec4 uFlashlightPos;
uniform vec3 uFlashlightDir;

out vec4 outColor;

${wi}

float sampleOverheadShadow(vec3 worldPos) {
  vec4 lightClip = uSunViewProj * vec4(worldPos, 1.0);
  vec3 proj = lightClip.xyz / max(lightClip.w, 1e-6);
  vec2 uv = proj.xy * 0.5 + 0.5;
  float d = proj.z * 0.5 + 0.5;
  if (uv.x < 0.002 || uv.x > 0.998 || uv.y < 0.002 || uv.y > 0.998 || d > 1.0) return 1.0;
  float closest = texture(uSunShadowTex, uv).r;
  // Bias prevents self-shadow acne on smooth anime face/hair
  return (d - 0.014 <= closest) ? 1.0 : 0.62;
}

void main() {
  vec3 toCam = uCamPos - vWorldPos;
  float dist = length(toCam);

  // Near-camera anti-clipping shield: smoothly dither-fade & discard before near-plane can ever slice inside outfit/neck/head!
  float nearPixelFade = smoothstep(0.38, 0.62, dist);
  float effCamFade = min(uVrmCamFade, nearPixelFade);
  if (effCamFade <= 0.015) discard;
  if (effCamFade < 0.995) {
    float ign = fract(52.9829189 * fract(dot(floor(gl_FragCoord.xy), vec2(0.06711056, 0.00583715))));
    if (ign > effCamFade) discard;
  }

  vec4 tex = texture(uBaseColorTex, vUv + uUvOffset) * uBaseColorFactor;
  if (uAlphaCutoff >= 0.0 && tex.a < uAlphaCutoff) discard;

  vec3 N = normalize(gl_FrontFacing ? vWorldNormal : -vWorldNormal);
  vec3 V = toCam / max(dist, 1e-5);
  float fresnel = pow(1.0 - max(dot(N, V), 0.0), 2.8);

  vec3 linearAlbedo = pow(clamp(tex.rgb, 0.0, 1.0), vec3(2.2));
  float extraSpec = 0.0;

  // === Warm Anime Cheek Blush & Happy / Tipsy Rosy Glow on Head Skin! ===
  if (uIsHeadPrim == 1 && uCheekBlush > 0.01) {
    float fSign = (abs(uCheekAnchor.w) > 0.5) ? uCheekAnchor.w : 1.0;
    float frontGate = smoothstep(
      uCheekAnchor.z * fSign - 0.044,
      uCheekAnchor.z * fSign - 0.010,
      vBindPos.z * fSign
    );
    if (frontGate > 0.01) {
      float skinMask =
        smoothstep(0.46, 0.60, tex.r) *
        smoothstep(0.30, 0.43, tex.g) *
        smoothstep(0.02, 0.075, tex.r - tex.b * 0.96);
      float dxC = (abs(vBindPos.x) - uCheekAnchor.x) / 0.029;
      float dyC = (vBindPos.y - uCheekAnchor.y) / 0.018;
      float cheekSpot = exp(-1.32 * (dxC * dxC + dyC * dyC));
      float nx = vBindPos.x / 0.024;
      float ny = (vBindPos.y - (uCheekAnchor.y + 0.004)) / 0.011;
      float noseGlow = exp(-1.75 * (nx * nx + ny * ny)) * smoothstep(0.55, 1.0, uCheekBlush) * 0.30;
      float blushAmt = clamp((cheekSpot + noseGlow) * frontGate * skinMask * uCheekBlush * 0.58, 0.0, 0.62);
      vec3 sakuraRoseLinear = pow(vec3(0.985, 0.415, 0.465), vec3(2.2));
      linearAlbedo = mix(linearAlbedo, sakuraRoseLinear, blushAmt);
    }
  }

  // === Procedural Okinawa Swimsuit / Original Outfit (Mode 0) ⇄ 5mm Neoprene Wetsuit (Modes 1..3)! ===
  if (uPrimGarmentKind > 0 && (uPrimGarmentKind != 3 || uSuitMode > 0)) {
    float by = vBindPos.y;
    float ax = abs(vBindPos.x);
    vec3 skinLinear = pow(vec3(0.972, 0.878, 0.784), vec3(2.2));

    if (uSuitMode == 0) {
      // === Mode 0: 👙 Tropical Marine Two-Piece Swimsuit (Seed-san only; custom VRMs keep 100% original outfit!) ===
      if (uPrimGarmentKind == 2) {
        // Replace Seed-san's black arm-sleeve material with seamless sunlit bare-arm skin!
        linearAlbedo = skinLinear;
      } else {
        // Sporty Two-Piece Swimsuit on body_bake
        // 1) Sport Bikini Top (y in [1.015..1.155] + halter/shoulder straps [1.14..1.245, ax in 0.048..0.082])
        float topBand = smoothstep(1.010, 1.020, by) * (1.0 - smoothstep(1.150, 1.162, by)) * (1.0 - smoothstep(0.155, 0.170, ax));
        float strapMask = smoothstep(1.140, 1.150, by) * (1.0 - smoothstep(1.242, 1.252, by))
                        * smoothstep(0.046, 0.053, ax) * (1.0 - smoothstep(0.080, 0.088, ax));
        float topMask = clamp(topBand + strapMask, 0.0, 1.0);

        // 2) Sport Swim Shorts / Bikini Bottom (y in [0.720..0.848])
        float botArch = 0.722 + 0.032 * smoothstep(0.04, 0.13, ax);
        float botMask = smoothstep(botArch - 0.008, botArch + 0.006, by) * (1.0 - smoothstep(0.842, 0.852, by)) * (1.0 - smoothstep(0.165, 0.180, ax));

        float suitMask = clamp(topMask + botMask, 0.0, 1.0);
        if (suitMask > 0.01) {
          vec3 navyAqua = mix(vec3(0.012, 0.14, 0.36), vec3(0.02, 0.52, 0.74), smoothstep(0.72, 1.16, by));
          // Crisp white sporty trim edges!
          float trim = smoothstep(0.832, 0.844, by) * botMask
                     + (1.0 - smoothstep(1.014, 1.028, by)) * topBand
                     + smoothstep(1.140, 1.152, by) * topBand;
          vec3 swimCol = mix(navyAqua, vec3(0.92, 0.96, 1.0), clamp(trim, 0.0, 1.0) * 0.85);
          linearAlbedo = mix(linearAlbedo, swimCol, suitMask);
          extraSpec = 0.25 * suitMask;
        }
      }
    } else {
      // === Modes 1..3: Selectable Okinawa Scuba Wetsuits + Nano Banana Layer 12 Diamond Neoprene Weave & Normal! ===
      vec3 baseSuitCol = (uSuitMode == 2)
        ? vec3(0.014, 0.042, 0.135)
        : (uSuitMode == 3 ? vec3(0.014, 0.015, 0.019) : vec3(0.020, 0.027, 0.038));
      vec3 accentCol = (uSuitMode == 2)
        ? vec3(0.92, 0.15, 0.40)
        : (uSuitMode == 3 ? vec3(0.88, 0.60, 0.06) : vec3(0.015, 0.52, 0.72));

      float neoWeaveMul = 1.0;
      vec3 neoNormalPerturb = vec3(0.0);
      if (uPbrReady == 1) {
        vec2 neoUv = vBindPos.xy * 9.5 + vec2(vBindPos.z * 4.5);
        vec3 neoSrgb = texture(uPbrAlbedoTex, vec3(neoUv, 12.0)).rgb;
        vec2 neoT = (texture(uPbrNormalTex, vec3(neoUv, 12.0)).xy * 2.0 - 1.0) * 0.42;
        neoWeaveMul = mix(0.68, 1.42, dot(neoSrgb, vec3(0.333)));
        neoNormalPerturb = vec3(neoT.x, neoT.y, 0.0);
      }

      float neckCutY = (uAvatarSuitBounds.x > 0.2) ? uAvatarSuitBounds.x : 1.242;
      float wristCutX = (uAvatarSuitBounds.y > 0.15) ? uAvatarSuitBounds.y : 0.485;
      float hScale = neckCutY / 1.242;

      if (uPrimGarmentKind == 2) {
        // Arms up to wrist wear sleek neoprene sleeves; 3mm Tropical has sporty 3-quarter stripe!
        float sleeveLimit = (uSuitMode == 2) ? wristCutX * 0.72 : wristCutX;
        float sleeveMask = 1.0 - smoothstep(sleeveLimit - 0.012, sleeveLimit + 0.008, ax);
        float stripe = smoothstep(0.95 * hScale, 1.04 * hScale, by) * sleeveMask;
        vec3 neoCol = mix(baseSuitCol, accentCol, stripe * 0.72) * neoWeaveMul;
        linearAlbedo = mix(skinLinear, neoCol, sleeveMask);
        N = normalize(N + neoNormalPerturb * sleeveMask);
        extraSpec = 0.44 * sleeveMask;
      } else {
        float activeWrist = (uPrimGarmentKind == 3 && uSuitMode == 2) ? wristCutX * 0.74 : wristCutX;
        float suitNeck = 1.0 - smoothstep(neckCutY - 0.012, neckCutY + 0.008, by);
        float wristCut = 1.0 - smoothstep(activeWrist - 0.012, activeWrist + 0.008, ax);
        float fullCover = suitNeck * wristCut;

        bool isBootie = (by < 0.095 * hScale);
        float sideAccent = smoothstep(0.088 * hScale, 0.112 * hScale, ax)
                         * smoothstep(0.20 * hScale, 0.25 * hScale, by)
                         * (1.0 - smoothstep(1.10 * hScale, 1.15 * hScale, by));
        float chestV = smoothstep(1.02 * hScale, 1.13 * hScale, by)
                     * (1.0 - smoothstep(0.055 * hScale, 0.125 * hScale, ax))
                     * (vBindPos.z > 0.0 ? 0.55 : 0.0);
        float backZip = (vBindPos.z < -0.02 && ax < 0.008 && by > 0.80 * hScale && by < (neckCutY - 0.015)) ? 1.0 : 0.0;

        vec3 suitBase = isBootie ? vec3(0.012, 0.016, 0.022) : baseSuitCol;
        vec3 neoFinal = mix(suitBase, accentCol, clamp(sideAccent * 0.88 + chestV, 0.0, 1.0)) * neoWeaveMul;
        neoFinal = mix(neoFinal, vec3(0.65, 0.70, 0.76), backZip * 0.8);
        if (isBootie && by > 0.072 * hScale) {
          neoFinal = accentCol * neoWeaveMul;
        }

        linearAlbedo = mix(linearAlbedo, neoFinal, fullCover);
        N = normalize(N + neoNormalPerturb * fullCover);
        extraSpec = (uSuitMode == 3 ? 0.62 : 0.48) * fullCover;
      }
    }
  }

  bool isAboveWater = (vWorldPos.y > OCEAN_SURFACE_Y - 0.06);
  float shadow = sampleOverheadShadow(vWorldPos);
  float wExp = clamp(uTodCloudTint.w, 0.12, 1.15);
  float caustic = isAboveWater ? 0.0 : evalSunShaftCaustic(vWorldPos, uTime, uSunDir) * wExp;

  float halfLambert = clamp(dot(N, uSunDir) * 0.5 + 0.5, 0.0, 1.0);
  vec3 viewRay = -V;

  if (isAboveWater && uCamPos.y > OCEAN_SURFACE_Y) {
    // === True-Color Atmospheric MToon Anime Shading Above Water (Zero ACES Washout + Full 9-Mode Mood & Torchlight!) ===
    vec3 baseSrgb = pow(clamp(linearAlbedo, 0.0, 1.0), vec3(1.0 / 2.2));
    float sunFactor = smoothstep(0.30, 0.68, halfLambert) * mix(0.35, 1.0, shadow);
    float origMix = clamp(uTodSkySunDir.w, 0.0, 1.0);

    // Noon crisp anime tint vs Time-of-Day sunset/dawn/moonlight + 3D Resort Torch/Lantern illumination!
    vec3 noonShade = vec3(0.79, 0.77, 0.85);
    vec3 noonSun   = vec3(0.985, 0.980, 0.975);

    vec3 todAmbSrgb = pow(clamp(uTodAmbient.rgb * 2.25, 0.0, 1.0), vec3(0.45));
    vec3 todSunSrgb = pow(clamp(uTodSunColor.rgb * 0.78, 0.0, 1.15), vec3(0.45));
    vec3 moodShade  = clamp(mix(vec3(0.36, 0.38, 0.52), todAmbSrgb * 0.92, 0.78), vec3(0.30, 0.32, 0.44), vec3(0.86));
    vec3 moodSun    = clamp(moodShade * 0.45 + todSunSrgb * 0.82, moodShade, vec3(1.02, 0.96, 0.92));

    vec3 shadeTint = mix(moodShade, noonShade, origMix);
    vec3 sunTint   = mix(moodSun, noonSun, origMix);

    // Real-time 3D warm resort firelight & lantern glow + ZEN University architectural interior light!
    vec3 zenIndoor  = evalZenCampusInteriorLight(vWorldPos, N);
    vec3 warmLinear = evalResortWarmLight(vWorldPos, N, uTime) + zenIndoor * 0.72;
    vec3 warmSrgb   = pow(clamp(warmLinear * 0.55, 0.0, 1.0), vec3(0.55)) * 0.58;
    float indoorLift = clamp(length(zenIndoor) * 0.42, 0.0, 0.55);

    vec3 envTint = clamp(mix(shadeTint, sunTint, max(sunFactor, indoorLift)) + warmSrgb * (1.0 - indoorLift * 0.45), vec3(0.0), vec3(1.02, 0.99, 0.96));
    vec3 litSrgb = baseSrgb * envTint;

    vec3 H_air = normalize(uSunDir + V);
    float specAir = pow(max(dot(N, H_air), 0.0), 36.0) * extraSpec * shadow * clamp(wExp, 0.25, 1.0);
    vec3 rimCol = mix(sunTint, vec3(1.0, 0.78, 0.55), clamp(length(warmLinear) * 0.5, 0.0, 0.75));
    float rimAir = fresnel * (0.035 * sunFactor + 0.045 * clamp(length(warmLinear), 0.0, 1.0));
    litSrgb = clamp(litSrgb + rimCol * (specAir * 0.35 + rimAir), 0.0, 0.975);

    outColor = vec4(airInverseAcesFromSrgb(litSrgb), tex.a);
    return;
  }

  // Soft MToon-friendly underwater sunlight/moonlight + dancing caustics + dive flashlight!
  float toonShade = mix(0.72, 1.05, smoothstep(0.32, 0.68, halfLambert));
  float envIrr = shadow * (isAboveWater ? 1.02 : (0.78 * wExp + 0.68 * caustic));

  float submergeDepth = max(OCEAN_SURFACE_Y - vWorldPos.y, 0.0);
  vec3 waterSunTint = isAboveWater
    ? uTodSunColor.rgb
    : mix(vec3(0.96, 1.01, 1.04), exp(-vec3(0.045, 0.015, 0.008) * submergeDepth), 0.65);

  vec3 H = normalize(uSunDir + V);
  float spec = pow(max(dot(N, H), 0.0), 32.0) * (0.06 + extraSpec + 0.25 * caustic) * shadow;
  vec3 aquaRim = vec3(0.16, 0.68, 0.90) * fresnel * (isAboveWater ? 0.06 : (0.28 + 0.25 * caustic));

  vec3 lit = linearAlbedo * toonShade * waterSunTint * envIrr + vec3(0.92, 0.99, 1.04) * spec + aquaRim;

  // 3D Underwater Dive Flashlight support
  if (uFlashlightPos.w > 0.01 && !isAboveWater) {
    vec3 toFrag = vWorldPos - uFlashlightPos.xyz;
    float fDist = length(toFrag);
    vec3 fDir = toFrag / max(fDist, 1e-4);
    float cone = smoothstep(0.62, 0.92, dot(fDir, normalize(uFlashlightDir)));
    float atten = 1.0 / (1.0 + 0.06 * fDist * fDist);
    lit += linearAlbedo * vec3(1.1, 1.0, 0.88) * cone * atten * uFlashlightPos.w * 0.65;
  }

  if (isAboveWater) {
    vec3 surfCeiling = evalUnderwaterToAirSurface(uCamPos, viewRay, uSunDir, uTime, 0.0, true, lit);
    outColor = vec4(surfCeiling, tex.a);
    return;
  }

  if (uCamPos.y > OCEAN_SURFACE_Y) {
    // Wading waist-deep in Okinawa surf seen from above-water camera!
    float waterPath = (viewRay.y < -0.005) ? max(0.0, dist - max(0.0, (OCEAN_SURFACE_Y - uCamPos.y) / viewRay.y)) : submergeDepth;
    vec3 transTop = exp(-vec3(0.075, 0.020, 0.011) * waterPath);
    float waterlineFoam = 1.0 - smoothstep(0.0, 0.09, submergeDepth);
    vec3 waded = mix(lit * transTop + vec3(0.03, 0.45, 0.58) * (1.0 - exp(-0.04 * waterPath)), vec3(0.92, 0.98, 1.0), waterlineFoam * 0.55);
    outColor = vec4(waded, tex.a);
    return;
  }

  // Beer-Lambert Kerama-Blue Seawater Extinction
  float fogDist = max(dist - 2.0, 0.0);
  vec3 sigmaExt = vec3(0.060, 0.021, 0.012);
  vec3 trans = exp(-sigmaExt * fogDist);
  vec3 fogColor = evalOceanAmbient(viewRay, vWorldPos.y);
  float fogMix = 1.0 - exp(-0.025 * fogDist);

  outColor = vec4(lit * trans + fogColor * fogMix, tex.a);
}
`,Yi=["blink","blinkLeft","blinkRight","happyEye","winkSmileLeft","winkSmileRight","relaxedEye","surprisedEye","angryEye","sadEye","eyeSpread","browHappy","browRelaxed","browAngry","browSurprised","browSad","happyMouth","relaxedMouth","sadMouth","aa","ih","ou","ee","oh","joyFull"],v0={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT4:16};function Ke(f,e){const i=f[0],t=f[1],s=f[2],a=f[3],r=e[0],n=e[1],o=e[2],l=e[3];return[a*r+i*l+t*o-s*n,a*n-i*o+t*l+s*r,a*o+i*n-t*r+s*l,a*l-i*r-t*n-s*o]}function Nt(f){return[-f[0],-f[1],-f[2],f[3]]}function Di(f,e,i){const t=Math.cos(f*.5),s=Math.sin(f*.5),a=Math.cos(e*.5),r=Math.sin(e*.5),n=Math.cos(i*.5),o=Math.sin(i*.5),l=[s,0,0,t],h=[0,r,0,a],c=[0,0,o,n];return Ke(Ke(h,l),c)}function qi(f,e){const i=f[0],t=f[1],s=f[2],a=f[3],r=e[0],n=e[1],o=e[2],l=2*(t*o-s*n),h=2*(s*r-i*o),c=2*(i*n-t*r);return[r+a*l+(t*c-s*h),n+a*h+(s*l-i*c),o+a*c+(i*h-t*l)]}function rr(f,e){let i=f[0]*e[0]+f[1]*e[1]+f[2]*e[2];if(i<-.999999){let o=-f[1],l=f[0],h=0;Math.hypot(o,l)<1e-4&&(o=0,l=-f[2],h=f[1]);const c=Math.hypot(o,l,h)||1;return[o/c,l/c,h/c,0]}const t=f[1]*e[2]-f[2]*e[1],s=f[2]*e[0]-f[0]*e[2],a=f[0]*e[1]-f[1]*e[0],r=1+i,n=Math.hypot(t,s,a,r)||1;return[t/n,s/n,a/n,r/n]}function b0(f,e,i){const t=f[0],s=f[1],a=f[2],r=e[0],n=e[1],o=e[2],l=i[0],h=i[1],c=i[2],u=t+n+c;let g;if(u>0){const x=.5/Math.sqrt(u+1);g=[(o-h)*x,(l-a)*x,(s-r)*x,.25/x]}else if(t>n&&t>c){const x=2*Math.sqrt(1+t-n-c);g=[.25*x,(r+s)/x,(l+a)/x,(o-h)/x]}else if(n>c){const x=2*Math.sqrt(1+n-t-c);g=[(r+s)/x,.25*x,(h+o)/x,(l-a)/x]}else{const x=2*Math.sqrt(1+c-t-n);g=[(l+a)/x,(h+o)/x,.25*x,(s-r)/x]}const p=Math.hypot(g[0],g[1],g[2],g[3])||1;return[g[0]/p,g[1]/p,g[2]/p,g[3]/p]}function qa(f,e,i){if(i<=0)return[f[0],f[1],f[2],f[3]];if(i>=1)return[e[0],e[1],e[2],e[3]];let t=e[0],s=e[1],a=e[2],r=e[3],n=f[0]*t+f[1]*s+f[2]*a+f[3]*r;if(n<0&&(t=-t,s=-s,a=-a,r=-r,n=-n),n>.9995){const u=f[0]+(t-f[0])*i,g=f[1]+(s-f[1])*i,p=f[2]+(a-f[2])*i,x=f[3]+(r-f[3])*i,S=Math.hypot(u,g,p,x)||1;return[u/S,g/S,p/S,x/S]}const o=Math.acos(Math.min(1,n)),l=Math.sqrt(1-n*n),h=Math.sin((1-i)*o)/l,c=Math.sin(i*o)/l;return[f[0]*h+t*c,f[1]*h+s*c,f[2]*h+a*c,f[3]*h+r*c]}function Ei(f,e,i,t){const s=i[0],a=i[1],r=i[2],n=i[3],o=s+s,l=a+a,h=r+r,c=s*o,u=s*l,g=s*h,p=a*l,x=a*h,S=r*h,T=n*o,k=n*l,m=n*h,A=t[0],D=t[1],I=t[2];f[0]=(1-(p+S))*A,f[1]=(u+m)*A,f[2]=(g-k)*A,f[3]=0,f[4]=(u-m)*D,f[5]=(1-(c+S))*D,f[6]=(x+T)*D,f[7]=0,f[8]=(g+k)*I,f[9]=(x-T)*I,f[10]=(1-(c+p))*I,f[11]=0,f[12]=e[0],f[13]=e[1],f[14]=e[2],f[15]=1}class w0{gl;whiteTex;fallbackJointTex;avatarName="マシュマロ 03";isVrm1=!0;loaded=!1;suitMode=0;restHipHeight=.796;seatedContactHeight=.715;restThighLen=.34;restChestHeight=1.056;restNeckHeight=1.242;restWristSpanX=.485;torsoGearScale=1;footGearScale=1;maskEyeAboveHeadY=.088;maskFaceScale=1;springChains=[];nodes=[];rootNodes=[];parentNode=[];restTrans=[];restQuat=[];restScale=[];restWorldQuat=[];restUpperArmLen=.148;restLowerArmLen=.149;restPalmGripDist=.079;restSoleMinY=0;restUpperArmDir=[-1,0,0];restLowerArmDir=[-1,0,0];lastDiverPos=[0,0,0];lastRootRotQuat=[0,0,0,1];drinkHasStraw=!0;curQuat=[];localMats=[];globalMats=[];humanBones={};skins=[];opaquePrims=[];blendPrims=[];loadedTextures=[];modelRootMat=O();tempMatA=O();tempMatB=O();tempPivotMat=O();constructor(e){this.gl=e;const i=e.createTexture();e.bindTexture(e.TEXTURE_2D,i),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.NEAREST),e.texImage2D(e.TEXTURE_2D,0,e.RGBA8,1,1,0,e.RGBA,e.UNSIGNED_BYTE,new Uint8Array([255,255,255,255])),this.whiteTex=i;const t=e.createTexture();e.bindTexture(e.TEXTURE_2D,t),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE);const s=O();e.texImage2D(e.TEXTURE_2D,0,e.RGBA32F,4,1,0,e.RGBA,e.FLOAT,s),e.bindTexture(e.TEXTURE_2D,null),this.fallbackJointTex=t}isLoaded(){return this.loaded}getAvatarName(){return this.avatarName}isVrm1Format(){return this.isVrm1}setSuitMode(e){this.suitMode=e}getSuitMode(){return this.suitMode}getRestHipHeight(){return this.restHipHeight}getSeatedContactHeight(){return this.seatedContactHeight}getSeatedForwardScoot(e){const i=Math.max(.08,this.restThighLen-.072);return Math.max(0,e+.016-i)}getRestChestHeight(){return this.restChestHeight}getTorsoGearScale(){return this.torsoGearScale}getFootGearScale(){return this.footGearScale}getMaskFit(){const e=this.maskFaceScale;return{dy:this.maskEyeAboveHeadY-.088*e,dz:e>1.02?.014:0,scale:e}}async loadFromUrl(e){const i=await fetch(e);if(!i.ok)throw new Error(`Failed to fetch VRM: ${e}`);const t=await i.arrayBuffer();await this.loadFromArrayBuffer(t)}async loadFromArrayBuffer(e){const i=new DataView(e),t=i.getUint32(0,!0),s=i.getUint32(4,!0);if(t!==1179937895||s!==2)throw new Error("Invalid VRM / GLB binary header.");let a=12,r=null,n=null;for(;a+8<=e.byteLength;){const R=i.getUint32(a,!0),K=i.getUint32(a+4,!0);if(a+=8,K===1313821514){const oe=new Uint8Array(e,a,R);r=JSON.parse(new TextDecoder().decode(oe))}else K===5130562&&(n=new Uint8Array(e,a,R));a+=R}if(!r||!n)throw new Error("VRM file missing JSON or BIN chunk.");this.clearModelResources();const o=this.gl;this.nodes=r.nodes??[];const l=r.scene??0;if(this.rootNodes=r.scenes?.[l]?.nodes??[],this.humanBones={},r.extensions?.VRMC_vrm){this.isVrm1=!0,this.avatarName=r.extensions.VRMC_vrm.meta?.name||"Seed-san (VRM 1.0)";const R=r.extensions.VRMC_vrm.humanoid?.humanBones??{};for(const[K,oe]of Object.entries(R))typeof oe?.node=="number"&&(this.humanBones[K]=oe.node)}else if(r.extensions?.VRM){this.isVrm1=!1,this.avatarName=r.extensions.VRM.meta?.title||"VRM 0.x Avatar";for(const R of r.extensions.VRM.humanoid?.humanBones??[])R.bone&&typeof R.node=="number"&&(this.humanBones[R.bone]=R.node)}else this.isVrm1=!0,this.avatarName="GLB Humanoid";const h=this.nodes.length;this.restTrans=new Array(h),this.restQuat=new Array(h),this.restScale=new Array(h),this.restWorldQuat=new Array(h),this.curQuat=new Array(h),this.localMats=new Array(h),this.globalMats=new Array(h);for(let R=0;R<h;R++){const K=this.nodes[R];this.restTrans[R]=K.translation?[...K.translation]:[0,0,0],this.restQuat[R]=K.rotation?[...K.rotation]:[0,0,0,1],this.restScale[R]=K.scale?[...K.scale]:[1,1,1],this.restWorldQuat[R]=[0,0,0,1],this.curQuat[R]=[...this.restQuat[R]],this.localMats[R]=O(),this.globalMats[R]=O()}const c=(R,K,oe)=>{const he=Ke(K,this.restQuat[R]);this.restWorldQuat[R]=he,Ei(this.localMats[R],this.restTrans[R],this.restQuat[R],this.restScale[R]),oe?Ee(this.globalMats[R],oe,this.localMats[R]):this.globalMats[R].set(this.localMats[R]);for(const me of this.nodes[R].children??[])c(me,he,this.globalMats[R])};for(const R of this.rootNodes)c(R,[0,0,0,1],null);this.parentNode=new Array(h).fill(-1);for(let R=0;R<h;R++)for(const K of this.nodes[R].children??[])this.parentNode[K]=R;const u=R=>{const K=this.humanBones[R];if(K===void 0)return null;const oe=this.globalMats[K];return[oe[12],oe[13],oe[14]]},g=u("hips"),p=u("leftUpperLeg")??u("rightUpperLeg"),x=u("leftLowerLeg")??u("rightLowerLeg"),S=u("chest"),T=u("neck"),k=u("head"),m=u("leftEye")??u("rightEye"),A=u("leftHand")??u("rightHand");if(this.restHipHeight=g?Math.max(.35,g[1]):.796,p&&x){const R=Math.hypot(x[0]-p[0],x[1]-p[1],x[2]-p[2]);this.restThighLen=R>.08&&R<.65?R:.34}else this.restThighLen=Math.max(.18,this.restHipHeight*.42);const D=p?p[1]:this.restHipHeight;this.seatedContactHeight=Math.max(.24,D-.088),this.restChestHeight=S?Math.max(.45,S[1]):1.056,this.restNeckHeight=T?T[1]:k?k[1]-.065:1.242,this.restWristSpanX=A?Math.max(.2,Math.abs(A[0])+.042):.485;const I=k&&g?Math.max(.28,k[1]-g[1]):.536;this.torsoGearScale=Math.max(.74,Math.min(1.12,I/.536)),this.footGearScale=Math.max(.8,Math.min(1.08,this.restHipHeight/.796)),this.maskEyeAboveHeadY=k&&m?Math.max(.032,Math.min(.13,m[1]-k[1])):.088,this.maskFaceScale=this.torsoGearScale<.88?1.12:1;const W=u("rightUpperArm"),w=u("rightLowerArm"),y=u("rightHand");if(W&&w){const R=w[0]-W[0],K=w[1]-W[1],oe=w[2]-W[2],he=Math.hypot(R,K,oe);he>.03&&(this.restUpperArmLen=he,this.restUpperArmDir=[R/he,K/he,oe/he])}if(w&&y){const R=y[0]-w[0],K=y[1]-w[1],oe=y[2]-w[2],he=Math.hypot(R,K,oe);he>.03&&(this.restLowerArmLen=he,this.restLowerArmDir=[R/he,K/he,oe/he])}const M=u("rightMiddleProximal")??u("rightIndexProximal");if(y&&M){const R=Math.hypot(M[0]-y[0],M[1]-y[1],M[2]-y[2]);R>.025&&R<.2&&(this.restPalmGripDist=R*.88)}this.springChains=[];for(const R of r.extensions?.VRMC_springBone?.springs??[]){const K=(R.name??"").toLowerCase(),oe=(R.joints??[]).map(Ue=>Ue.node).filter(Ue=>typeof Ue=="number"&&Ue>=0&&Ue<h);if(oe.length<2)continue;const he=oe.slice(0,Math.max(1,oe.length-1)),me=K.endsWith("_l")||K.includes("_left")?1:K.endsWith("_r")||K.includes("_right")?-1:0,ne=K.includes("skirt")?K.includes("fside")?"skirt_fside":K.includes("front")?"skirt_front":K.includes("back")?"skirt_back":"skirt_side":K.includes("ribbon")?"ribbon":"hair",Le=this.humanBones.leftUpperLeg,Ae=this.humanBones.rightUpperLeg;let Ie=!1,He=this.parentNode[he[0]]??-1;for(;He>=0;){if(He===Le||He===Ae){Ie=!0;break}He=this.parentNode[He]??-1}this.springChains.push({kind:ne,sideSign:me,followsUpperLeg:Ie,joints:he})}const P=r.images??[],U=r.bufferViews??[],L=new Array(P.length).fill(this.whiteTex);await Promise.all(P.map(async(R,K)=>{if(R.bufferView===void 0)return;const oe=U[R.bufferView];if(!oe)return;const he=oe.byteOffset??0,me=n.subarray(he,he+oe.byteLength);try{const ne=new Blob([new Uint8Array(me)],{type:R.mimeType||"image/png"}),Le=await createImageBitmap(ne,{premultiplyAlpha:"none",colorSpaceConversion:"none"}),Ae=o.createTexture();o.bindTexture(o.TEXTURE_2D,Ae),o.pixelStorei(o.UNPACK_FLIP_Y_WEBGL,!1),o.pixelStorei(o.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),o.texImage2D(o.TEXTURE_2D,0,o.RGBA8,o.RGBA,o.UNSIGNED_BYTE,Le),o.generateMipmap(o.TEXTURE_2D),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_MIN_FILTER,o.LINEAR_MIPMAP_LINEAR),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_MAG_FILTER,o.LINEAR),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_WRAP_S,o.REPEAT),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_WRAP_T,o.REPEAT),o.bindTexture(o.TEXTURE_2D,null),Le.close(),L[K]=Ae,this.loadedTextures.push(Ae)}catch{}}));const E=r.accessors??[],_=(R,K,oe,he)=>{if(oe===5126)return R.getFloat32(K,!0);if(oe===5123){const me=R.getUint16(K,!0);return he?me/65535:me}if(oe===5122){const me=R.getInt16(K,!0);return he?Math.max(-1,me/32767):me}if(oe===5121){const me=R.getUint8(K);return he?me/255:me}if(oe===5120){const me=R.getInt8(K);return he?Math.max(-1,me/127):me}return oe===5125?R.getUint32(K,!0):0},H=R=>R===5126||R===5125?4:R===5123||R===5122?2:1,G=R=>{const K=E[R],oe=v0[K.type]??1,he=new Float32Array(K.count*oe),me=H(K.componentType);if(K.bufferView!==void 0){const ne=U[K.bufferView];if(ne){const Le=(ne.byteOffset??0)+(K.byteOffset??0),Ae=new DataView(n.buffer,n.byteOffset+Le),Ie=ne.byteStride??oe*me;for(let He=0;He<K.count;He++){const Ue=He*Ie;for(let We=0;We<oe;We++)he[He*oe+We]=_(Ae,Ue+We*me,K.componentType,K.normalized)}}}if(K.sparse&&K.sparse.count>0){const ne=K.sparse,Le=U[ne.indices.bufferView],Ae=U[ne.values.bufferView];if(Le&&Ae){const Ie=H(ne.indices.componentType),He=(Le.byteOffset??0)+(ne.indices.byteOffset??0),Ue=(Ae.byteOffset??0)+(ne.values.byteOffset??0),We=new DataView(n.buffer,n.byteOffset+He),dt=new DataView(n.buffer,n.byteOffset+Ue),vt=Ae.byteStride??oe*me;for(let st=0;st<ne.count;st++){const ot=_(We,st*Ie,ne.indices.componentType,!1);if(ot>=0&&ot<K.count){const bt=st*vt;for(let Qe=0;Qe<oe;Qe++)he[ot*oe+Qe]=_(dt,bt+Qe*me,K.componentType,K.normalized)}}}}return he};this.skins=(r.skins??[]).map(R=>{const K=Math.max(1,R.joints.length),oe=R.inverseBindMatrices!==void 0?G(R.inverseBindMatrices):new Float32Array(K*16);if(R.inverseBindMatrices===void 0)for(let ne=0;ne<K;ne++)oe[ne*16]=1,oe[ne*16+5]=1,oe[ne*16+10]=1,oe[ne*16+15]=1;const he=new Float32Array(K*16),me=o.createTexture();return o.bindTexture(o.TEXTURE_2D,me),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_MIN_FILTER,o.NEAREST),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_MAG_FILTER,o.NEAREST),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_WRAP_S,o.CLAMP_TO_EDGE),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_WRAP_T,o.CLAMP_TO_EDGE),o.texImage2D(o.TEXTURE_2D,0,o.RGBA32F,4,K,0,o.RGBA,o.FLOAT,he),o.bindTexture(o.TEXTURE_2D,null),{joints:R.joints,inverseBindMats:oe,jointPaletteData:he,jointTex:me}});const Q=r.textures??[],se=r.materials??[],X=r.meshes??[],Z=new Set(se.map(R=>(R.name??"").toLowerCase())),ae=Z.has("body_bake")&&Z.has("body_nm")&&Z.has("huku_bake");let ie=1/0;for(let R=0;R<this.nodes.length;R++){const K=this.nodes[R];if(K.mesh===void 0)continue;const oe=(K.name??"").toLowerCase();if(oe.includes("robo_arm"))continue;const he=X[K.mesh];if(!he)continue;const me=K.skin??-1;for(const ne of he.primitives){if(ne.attributes.POSITION===void 0)continue;const Le=ne.material!==void 0?se[ne.material]:void 0,Ae=(Le?.name??"").toLowerCase();if(Ae.includes("backpack")||Ae==="robo_face"||Ae==="glass"||Ae==="green_emit"||ae&&oe==="wear"&&(Ae==="huku_bake"||Ae==="wear_metal"||Ae==="armgear_plastic"||Ae==="anim_logo"))continue;const Ie=ae&&oe==="wear"?Ae==="body_bake"?1:Ae==="body_nm"?2:0:!ae&&oe==="body"?3:0,He=!ae&&(oe.includes("skirt")||oe.includes("ribbon")),Ue=G(ne.attributes.POSITION),We=Ue.length/3,dt=this.globalMats[R];for(let Y=0;Y<We;Y++){const be=Ue[Y*3],Ce=Ue[Y*3+1],Se=Ue[Y*3+2],Me=me>=0?Ce:dt[1]*be+dt[5]*Ce+dt[9]*Se+dt[13];Me<ie&&(ie=Me)}const vt=ne.attributes.NORMAL!==void 0?G(ne.attributes.NORMAL):new Float32Array(We*3),st=ne.attributes.TEXCOORD_0!==void 0?G(ne.attributes.TEXCOORD_0):new Float32Array(We*2),ot=ne.attributes.JOINTS_0!==void 0?G(ne.attributes.JOINTS_0):new Float32Array(We*4),bt=ne.attributes.WEIGHTS_0!==void 0?G(ne.attributes.WEIGHTS_0):(()=>{const Y=new Float32Array(We*4);for(let be=0;be<We;be++)Y[be*4]=1;return Y})();let Qe,St=o.UNSIGNED_INT;if(ne.indices!==void 0){const Y=E[ne.indices],Ce=(U[Y.bufferView].byteOffset??0)+(Y.byteOffset??0);if(Y.componentType===5123){const Se=new Uint16Array(Y.count),Me=new DataView(n.buffer,n.byteOffset+Ce);for(let De=0;De<Y.count;De++)Se[De]=Me.getUint16(De*2,!0);Qe=Se,St=o.UNSIGNED_SHORT}else if(Y.componentType===5125){const Se=new Uint32Array(Y.count),Me=new DataView(n.buffer,n.byteOffset+Ce);for(let De=0;De<Y.count;De++)Se[De]=Me.getUint32(De*4,!0);Qe=Se,St=o.UNSIGNED_INT}else{const Se=new Uint16Array(Y.count);for(let Me=0;Me<Y.count;Me++)Se[Me]=n[Ce+Me];Qe=Se,St=o.UNSIGNED_SHORT}}else{const Y=new Uint32Array(We);for(let be=0;be<We;be++)Y[be]=be;Qe=Y}const Tt=o.createVertexArray();o.bindVertexArray(Tt);const wt=[],nt=ne.targets??[],ct=he.extras?.targetNames??ne.extras?.targetNames??[],rt=[];for(let Y=0;Y<nt.length;Y++){const be=nt[Y].POSITION,Ce=ct[Y]??`target_${Y}`;if(be===void 0){rt.push({name:Ce,indices:new Uint32Array(0),deltas:new Float32Array(0)});continue}const Se=G(be);let Me=0;for(let ye=0;ye<We;ye++){const Pe=ye*3;Math.abs(Se[Pe])+Math.abs(Se[Pe+1])+Math.abs(Se[Pe+2])>1e-5&&Me++}const De=new Uint32Array(Me),ge=new Float32Array(Me*3);let ve=0;for(let ye=0;ye<We;ye++){const Pe=ye*3,_e=Se[Pe],Oe=Se[Pe+1],Ge=Se[Pe+2];Math.abs(_e)+Math.abs(Oe)+Math.abs(Ge)>1e-5&&(De[ve]=ye,ge[ve*3]=_e,ge[ve*3+1]=Oe,ge[ve*3+2]=Ge,ve++)}rt.push({name:Ce,indices:De,deltas:ge})}const ut=rt.some(Y=>Y.indices.length>0),Mt=o.createBuffer();o.bindBuffer(o.ARRAY_BUFFER,Mt),o.bufferData(o.ARRAY_BUFFER,Ue,ut?o.DYNAMIC_DRAW:o.STATIC_DRAW),o.enableVertexAttribArray(0),o.vertexAttribPointer(0,3,o.FLOAT,!1,0,0),wt.push(Mt);const b=(Y,be,Ce)=>{const Se=o.createBuffer();o.bindBuffer(o.ARRAY_BUFFER,Se),o.bufferData(o.ARRAY_BUFFER,be,o.STATIC_DRAW),o.enableVertexAttribArray(Y),o.vertexAttribPointer(Y,Ce,o.FLOAT,!1,0,0),wt.push(Se)};b(1,vt,3),b(2,st,2),b(3,ot,4),b(4,bt,4);const B=o.createBuffer();o.bindBuffer(o.ELEMENT_ARRAY_BUFFER,B),o.bufferData(o.ELEMENT_ARRAY_BUFFER,Qe,o.STATIC_DRAW),wt.push(B),o.bindVertexArray(null);const N=Le?.pbrMetallicRoughness?.baseColorTexture?.index??Le?.extensions?.VRMC_materials_mtoon?.shadeMultiplyTexture?.index,ee=N!==void 0?Q[N]?.source:void 0,V=ee!==void 0?L[ee]??this.whiteTex:this.whiteTex,pe=Le?.pbrMetallicRoughness?.baseColorFactor?[...Le.pbrMetallicRoughness.baseColorFactor]:[1,1,1,1],ce=Le?.alphaMode??"OPAQUE",J=ce==="MASK"?Le?.alphaCutoff??.5:-1,de=(he.name??"").toLowerCase(),ue=ut||oe.includes("head")||oe.includes("face")||de.includes("head")||de.includes("face"),xe={vao:Tt,posBuffer:Mt,buffers:wt,indexCount:Qe.length,indexType:St,skinIndex:me,nodeIndex:R,meshIndex:K.mesh,materialIndex:ne.material??-1,tex:V,baseColorFactor:pe,uvOffset:[0,0],alphaMode:ce,alphaCutoff:J,garmentKind:Ie,isHeadPrim:ue,hideInWetsuit:He,basePos:ut?Ue:null,workPos:ut?new Float32Array(Ue):null,morphTargets:rt,curWeights:ut?new Float32Array(rt.length):null,appliedWeights:ut?new Float32Array(rt.length).fill(-1):null};ce==="BLEND"?this.blendPrims.push(xe):this.opaquePrims.push(xe)}}this.buildExpressionBindings(r,k,m),this.restSoleMinY=Number.isFinite(ie)&&ie>-.25&&ie<.25?ie:0,this.loaded=!0}lastPoseElapsed=-1;swimKickPhase=0;smoothedSwimEffort=0;walkCyclePhase=0;walkDashBlend=0;treadCyclePhase=0;wristCheckTarget=0;wristCheckBlend=0;fishingRodLean=0;fishingTwitchImpulse=0;emotionCtx={tipsyLevel:0,savorLevel:0,catchJoyLevel:0,eatDislike:!1,fishingCounterOk:!1,okiBonusLit:!1};exprBinds=Object.fromEntries(Yi.map(e=>[e,[]]));exprUvBinds={};exprSmoothed=Object.fromEntries(Yi.map(e=>[e,0]));cheekAnchor=[.056,.962,.091,1];curCheekBlush=.16;blinkCountdown=2.6;blinkAnimSec=-1;blinkDoublePending=!1;progUniformCache=new WeakMap;getProgUniforms(e){let i=this.progUniformCache.get(e);if(!i){const t=this.gl;i={uModelRootMat:t.getUniformLocation(e,"uModelRootMat"),uJointTex:t.getUniformLocation(e,"uJointTex"),uBaseColorTex:t.getUniformLocation(e,"uBaseColorTex"),uBaseColorFactor:t.getUniformLocation(e,"uBaseColorFactor"),uUvOffset:t.getUniformLocation(e,"uUvOffset"),uAlphaCutoff:t.getUniformLocation(e,"uAlphaCutoff"),uPrimGarmentKind:t.getUniformLocation(e,"uPrimGarmentKind"),uIsHeadPrim:t.getUniformLocation(e,"uIsHeadPrim"),uCheekAnchor:t.getUniformLocation(e,"uCheekAnchor"),uCheekBlush:t.getUniformLocation(e,"uCheekBlush"),uSuitMode:t.getUniformLocation(e,"uSuitMode"),uAvatarSuitBounds:t.getUniformLocation(e,"uAvatarSuitBounds")},this.progUniformCache.set(e,i)}return i}setEmotionContext(e){this.emotionCtx=e}buildExpressionBindings(e,i,t){for(const x of Yi)this.exprBinds[x]=[],this.exprSmoothed[x]=0;this.exprUvBinds={};const s=[...this.opaquePrims,...this.blendPrims],a=(x,S,T,k=1)=>{if(T<0||T>=S.morphTargets.length||S.morphTargets[T].indices.length===0)return;const m=this.exprBinds[x];m.some(A=>A.prim===S&&A.targetIdx===T)||m.push({prim:S,targetIdx:T,weightScale:k})},r=[["blink",["ea_blink","eye_close","fcl_eye_close","blink"]],["blinkLeft",["ea_blink_l","blink_l","fcl_eye_close_l","wink_l"]],["blinkRight",["ea_blink_r","blink_r","fcl_eye_close_r","wink_r"]],["happyEye",["ea_happy_eye","ea_blink_smile","eye_smile","fcl_eye_joy","smile_eye"]],["winkSmileLeft",["ea_blink_smile_l","fcl_eye_joy_l","wink_smile_l"]],["winkSmileRight",["ea_blink_smile_r","fcl_eye_joy_r","wink_smile_r"]],["relaxedEye",["ea_relaxed_eye","face_relax","fcl_eye_fun"]],["surprisedEye",["ea_surprised_eye","eye_open","fcl_eye_surprised"]],["angryEye",["ea_angry_eye","eye_angry","fcl_eye_angry"]],["sadEye",["ea_sad_eye","fcl_eye_sorrow"]],["eyeSpread",["fcl_eye_spread"]],["browHappy",["ea_brow_happy","eye_brow_up","fcl_brw_joy","fcl_brw_fun"]],["browRelaxed",["ea_brow_relaxed"]],["browAngry",["ea_brow_angry","eye_brow_down","fcl_brw_angry"]],["browSurprised",["ea_brow_surprised","fcl_brw_surprised"]],["browSad",["ea_brow_sad","fcl_brw_sorrow"]],["happyMouth",["ea_happy_mouth","mouth_wide","fcl_mth_fun","fcl_mth_joy"]],["relaxedMouth",["ea_relaxed_mouth"]],["sadMouth",["ea_sad_mouth","fcl_mth_sorrow"]],["aa",["ea_aa","lip_a","fcl_mth_a","mth_a","vrc.v_aa"]],["ih",["ea_ih","lip_i","fcl_mth_i","mth_i","vrc.v_ih"]],["ou",["ea_ou","lip_u","fcl_mth_u","mth_u","vrc.v_ou"]],["ee",["ea_ee","lip_e","fcl_mth_e","mth_e","vrc.v_ee"]],["oh",["ea_oh","lip_o","fcl_mth_o","mth_o","vrc.v_oh"]],["joyFull",["fcl_all_joy","face_happy","fcl_all_fun"]]];for(const x of s)for(let S=0;S<x.morphTargets.length;S++){const T=x.morphTargets[S].name.trim().toLowerCase();for(const[k,m]of r)m.includes(T)&&a(k,x,S,1)}const n=(x,S)=>{if(S){if(this.exprBinds[x].length===0&&S.morphTargetBinds)for(const T of S.morphTargetBinds)for(const k of s)k.nodeIndex===T.node&&a(x,k,T.index,T.weight??1);S.textureTransformBinds&&S.textureTransformBinds.length>0&&(this.exprUvBinds[x]=S.textureTransformBinds.map(T=>({materialIndex:T.material,offset:T.offset?[T.offset[0],T.offset[1]]:[0,0]})))}},o=e.extensions?.VRMC_vrm?.expressions?.preset,l=e.extensions?.VRMC_vrm?.expressions?.custom;(o||l)&&(n("blink",o?.blink),n("blinkLeft",o?.blinkLeft),n("blinkRight",o?.blinkRight),n("aa",o?.aa),n("ih",o?.ih),n("ou",o?.ou),n("ee",o?.ee),n("oh",o?.oh),n("joyFull",o?.happy),this.exprBinds.happyEye.length===0&&n("happyEye",l?.happy_eye??o?.happy),this.exprBinds.relaxedEye.length===0&&n("relaxedEye",l?.relaxed_eye??o?.relaxed),this.exprBinds.surprisedEye.length===0&&n("surprisedEye",l?.surprised_eye??o?.surprised),this.exprBinds.angryEye.length===0&&n("angryEye",l?.angry_eye??o?.angry),this.exprBinds.sadEye.length===0&&n("sadEye",l?.sad_eye??o?.sad));const h=e.extensions?.VRM?.blendShapeMaster?.blendShapeGroups;if(h){const x={blink:"blink",blink_l:"blinkLeft",blink_r:"blinkRight",joy:"joyFull",fun:"relaxedEye",angry:"angryEye",sorrow:"sadEye",a:"aa",i:"ih",u:"ou",e:"ee",o:"oh"};for(const S of h){const T=x[(S.presetName??"").toLowerCase()];if(!(!T||this.exprBinds[T].length>0))for(const k of S.binds??[])for(const m of s)m.meshIndex===k.mesh&&a(T,m,k.index,(k.weight??100)/100)}this.exprBinds.happyEye.length===0&&this.exprBinds.joyFull.length>0&&(this.exprBinds.happyEye=[...this.exprBinds.joyFull])}const c=this.isVrm1?1:-1,u=x=>{let S=0,T=0,k=0,m=0;for(const A of x){const D=A.prim.basePos,I=A.prim.morphTargets[A.targetIdx];if(!(!D||!I))for(let W=0;W<I.indices.length;W++){const w=I.indices[W]*3,y=D[w],M=D[w+1],P=D[w+2];S+=M,T+=P,Math.abs(y)>k&&(k=Math.abs(y)),m++}}return m===0?null:[k,S/m,T/m]},g=u(this.exprBinds.blink.length>0?this.exprBinds.blink:this.exprBinds.happyEye),p=u(this.exprBinds.aa);if(g&&p){const x=Math.max(.036,Math.min(.072,g[0]*.59)),S=g[1]*.52+p[1]*.48,T=(g[2]+p[2])*.5;this.cheekAnchor=[x,S,T,c]}else{const x=t?t[1]:i?i[1]+.06:1.01,S=(i?i[2]:0)+.085*c;this.cheekAnchor=[.052,x-.028,S,c]}}updateFacialExpressionsAndMorphs(e,i,t,s,a){const r={blink:0,blinkLeft:0,blinkRight:0,happyEye:0,winkSmileLeft:0,winkSmileRight:0,relaxedEye:0,surprisedEye:0,angryEye:0,sadEye:0,eyeSpread:0,browHappy:0,browRelaxed:0,browAngry:0,browSurprised:0,browSad:0,happyMouth:0,relaxedMouth:0,sadMouth:0,aa:0,ih:0,ou:0,ee:0,oh:0,joyFull:0},n=this.emotionCtx,o=Math.max(0,Math.min(1,n.tipsyLevel)),l=Math.max(0,Math.min(1,n.savorLevel));let h=.16+o*.62+l*.42,c=0;if(this.blinkAnimSec>=0){this.blinkAnimSec+=e;const k=.145;this.blinkAnimSec<k?c=Math.sin(this.blinkAnimSec/k*Math.PI):this.blinkDoublePending?(this.blinkDoublePending=!1,this.blinkAnimSec=0):(this.blinkAnimSec=-1,this.blinkCountdown=2.4+(Math.sin(i*12.9898)*43758.5453%1+1)%1*2.8)}else this.blinkCountdown-=e,this.blinkCountdown<=0&&(this.blinkAnimSec=0,this.blinkDoublePending=Math.sin(i*7.13)>.72);if(t==="fish_catch")Math.sin(i*1.45)>.74&&this.exprBinds.winkSmileRight.length>0?(r.winkSmileRight=.96,r.happyEye=.25):r.happyEye=.98,r.browHappy=.95,r.happyMouth=1,r.aa=.56+.16*(.5+.5*Math.sin(i*5.2)),r.ee=.22,h=Math.max(h,.8);else if(t==="bar_sip"||t==="stand_sip"){const k=Math.max(0,Math.min(1,s));if(k<.22)r.eyeSpread=.62,r.browHappy=.75,r.happyMouth=.92,r.aa=.22,h=Math.max(h,.52);else if(k<.68)if(this.drinkHasStraw)r.happyEye=.84,r.browRelaxed=.75,r.ou=.86,r.ih=.14,h=Math.max(h,.78);else{const m=.5+.5*Math.sin((k-.22)*28);r.blink=.9,r.browRelaxed=.72,r.oh=.42+.35*m,r.aa=.2*(1-m),h=Math.max(h,.88)}else r.happyEye=1,r.browHappy=.96,r.happyMouth=1,r.aa=.68,r.ee=.24,h=.96}else if(t==="bbq_eat"||t==="dining_eat")if(n.eatDislike)r.sadEye=.85,r.browSad=.92,r.sadMouth=.88,r.ih=.36,h=.26;else{const k=Math.max(0,Math.min(1,s)),m=.5+.5*Math.sin(i*13.5);r.happyEye=.98,r.browHappy=.9,r.happyMouth=1,k>.76?(r.aa=.58*m+.18,r.ou=.48*(1-m)):(r.ou=.56*(1-m),r.aa=.36*m+.1),h=.92}else if(t==="fish_idle")s>=.9?(r.surprisedEye=.88,r.eyeSpread=.78,r.browSurprised=.95,r.aa=.46,h=Math.max(h,.42)):s>=.35?(r.eyeSpread=.62,r.browSurprised=.45,r.oh=.26,h=Math.max(h,.28)):(r.happyMouth=.72,r.browHappy=.38,r.relaxedEye=.18,h=Math.max(h,.24));else if(t==="fish_cast")r.eyeSpread=.55,r.browHappy=.75,r.happyMouth=.68,r.aa=.42,h=Math.max(h,.35);else if(t==="fish_fight")n.fishingCounterOk?(r.happyEye=.68,r.browHappy=.8,r.happyMouth=.88,r.ee=.36,h=Math.max(h,.55)):(r.angryEye=.62,r.browAngry=.82,r.ih=.4,h=Math.max(h,.44));else if(t==="bbq_chop")r.happyMouth=.72,r.browHappy=.42,r.eyeSpread=.25,h=Math.max(h,.28);else if(t==="beach_lie"||t==="hammock_lie")r.relaxedEye=.62,r.happyEye=.28,r.browRelaxed=.82,r.happyMouth=.88,h=Math.max(h,.42);else if(n.okiBonusLit)r.happyEye=.96,r.browHappy=.92,r.happyMouth=1,r.aa=.48,h=Math.max(h,.82);else if(n.catchJoyLevel>.08){const k=Math.min(1,n.catchJoyLevel);r.happyEye=.88*k,r.browHappy=.82*k,r.happyMouth=.95,r.aa=.32*k,h=Math.max(h,.25+.55*k)}else o>.08?(r.relaxedEye=.4*o,r.happyEye=.52*o,r.browRelaxed=.65*o,r.happyMouth=.92,r.aa=.18*o,h=Math.max(h,.28+.64*o)):l>.08?(r.happyEye=.78*l,r.browHappy=.72*l,r.happyMouth=.94,r.aa=.2*l,h=Math.max(h,.26+.58*l)):(r.happyMouth=.6,r.browHappy=.26);const u=Math.min(1,r.happyEye+r.winkSmileLeft+r.winkSmileRight+r.blink+r.surprisedEye*.6);r.blink=Math.max(r.blink,c*(1-u));const g=1-Math.exp(-14*e),p=1-Math.exp(-26*e);for(const k of Yi){const m=k==="blink"||k==="blinkLeft"||k==="blinkRight"?p:g;this.exprSmoothed[k]+=(r[k]-this.exprSmoothed[k])*m,this.exprSmoothed[k]<.0015&&(this.exprSmoothed[k]=0)}this.curCheekBlush+=(h-this.curCheekBlush)*(1-Math.exp(-8*e));const x=Math.max(0,1-(this.exprSmoothed.blink+this.exprSmoothed.happyEye));if(x>.1){const k=Math.sin(i*.95)*.048*x,m=Math.cos(i*.72)*.028*x;for(const A of["leftEye","rightEye"]){const D=this.humanBones[A];if(D!==void 0){const I=Di(m*a,k,0),W=this.restWorldQuat[D],w=Ke(Ke(Nt(W),I),W);this.curQuat[D]=Ke(this.restQuat[D],w)}}}const S=[...this.opaquePrims,...this.blendPrims];for(const k of S)k.uvOffset[0]=0,k.uvOffset[1]=0,k.curWeights&&k.curWeights.fill(0);for(const k of Yi){const m=this.exprSmoothed[k];if(m<=.002)continue;for(const D of this.exprBinds[k])D.prim.curWeights&&(D.prim.curWeights[D.targetIdx]=Math.min(1.15,D.prim.curWeights[D.targetIdx]+m*D.weightScale));const A=this.exprUvBinds[k];if(A&&m>.45)for(const D of A)for(const I of S)I.materialIndex===D.materialIndex&&(I.uvOffset[0]=D.offset[0],I.uvOffset[1]=D.offset[1])}const T=this.gl;for(const k of S){if(!k.curWeights||!k.appliedWeights||!k.basePos||!k.workPos)continue;let m=!1;for(let A=0;A<k.curWeights.length;A++)if(Math.abs(k.curWeights[A]-k.appliedWeights[A])>.0025){m=!0;break}if(m){k.workPos.set(k.basePos);for(let A=0;A<k.curWeights.length;A++){const D=k.curWeights[A];if(k.appliedWeights[A]=D,D<=.002)continue;const I=k.morphTargets[A],W=I.indices,w=I.deltas;for(let y=0;y<W.length;y++){const M=W[y]*3,P=y*3;k.workPos[M]+=w[P]*D,k.workPos[M+1]+=w[P+1]*D,k.workPos[M+2]+=w[P+2]*D}}T.bindBuffer(T.ARRAY_BUFFER,k.posBuffer),T.bufferSubData(T.ARRAY_BUFFER,0,k.workPos)}}T.bindBuffer(T.ARRAY_BUFFER,null)}setWristCheck(e){this.wristCheckTarget=e?1:0}setFishingMotionState(e,i){this.fishingRodLean=Math.max(-1,Math.min(1,e)),this.fishingTwitchImpulse=Math.max(0,Math.min(1,i))}getWalkCyclePhase(){return this.walkCyclePhase}getWalkDashBlend(){return this.walkDashBlend}updateSwimmingPose(e,i,t,s,a,r=0,n="swim"){if(!this.loaded)return;const o=this.lastPoseElapsed<0||a<this.lastPoseElapsed?.016:Math.min(.05,Math.max(0,a-this.lastPoseElapsed));this.lastPoseElapsed=a,this.wristCheckBlend+=(this.wristCheckTarget-this.wristCheckBlend)*(1-Math.exp(-8.5*o));const l=this.wristCheckBlend;for(let w=0;w<this.nodes.length;w++){const y=this.restQuat[w];this.curQuat[w][0]=y[0],this.curQuat[w][1]=y[1],this.curQuat[w][2]=y[2],this.curQuat[w][3]=y[3]}const h=this.isVrm1?1:-1,c=(w,y,M,P)=>{const U=this.humanBones[w];if(U===void 0)return;const L=Di(y*h,M,P*h),E=this.restWorldQuat[U],_=Nt(E),H=Ke(Ke(_,L),E);this.curQuat[U]=Ke(this.restQuat[U],H)},u=(w,y)=>{const M=Math.max(0,Math.min(1,y));if(M<=.001)return;const P=w==="right"?1:-1,U=[["Index",-.04*P,1.32],["Middle",-.01*P,1.38],["Ring",.02*P,1.43],["Little",.05*P,1.48]];for(const[L,E,_]of U)c(`${w}${L}Proximal`,0,E*M,_*P*M),c(`${w}${L}Intermediate`,0,0,_*1.12*P*M),c(`${w}${L}Distal`,0,0,_*.82*P*M);c(`${w}ThumbMetacarpal`,.18*M,-.44*P*M,.44*P*M),c(`${w}ThumbProximal`,.12*M,-.55*P*M,.52*P*M),c(`${w}ThumbDistal`,.08*M,-.46*P*M,.4*P*M)},g=n==="land_walk"?Math.max(0,Math.min(1,(s-4.05)/1.95)):0;if(this.walkDashBlend+=(g-this.walkDashBlend)*(1-Math.exp(-12.5*o)),n==="land_walk"){const w=Math.min(1,s/2.2),y=this.walkDashBlend;if(w>.02){const ae=3.2+w*3+y*4.55;this.walkCyclePhase=(this.walkCyclePhase+ae*o)%(Math.PI*2)}const M=this.walkCyclePhase,P=Math.sin(M)*w,U=Math.cos(M)*w;c("spine",.03*w+.075*y,P*(.05+.045*y),U*.02*y),c("chest",.02+.05*y,-P*(.05+.05*y),-U*.018*y),c("neck",-.035*y,0,0),c("head",Math.sin(a*1.5)*.03*(1-y*.5)-.05*y-Math.abs(P)*.022*y,0,0);const L=.34+.24*y,E=-.04-.07*y,_=-.1-y*(.62+Math.max(0,-P)*.24),H=.1+y*(.62+Math.max(0,P)*.24);c("leftUpperArm",(P*L+E)*(1-l)+-.62*l,(.06-.08*y)*(1-l)+-.32*l,(-1.24+.08*y)*(1-l)+-.96*l),c("leftLowerArm",(-.18-Math.max(0,-P)*.22)*(1-y*.5)*(1-l)+-.36*l,_*(1-l)+-1.12*l,.38*l),c("rightUpperArm",-P*L+E,-.06+.08*y,1.24-.08*y),c("rightLowerArm",(-.18-Math.max(0,P)*.22)*(1-y*.5),H,0);const G=.46+.18*y,Q=.56+.3*y,se=.008+.065*y,X=.12+.1*y;c("leftUpperLeg",-P*G,0,.02),c("leftLowerLeg",se+Math.max(0,U)*Q,0,0),c("leftFoot",P*X,0,0),c("rightUpperLeg",P*G,0,-.02),c("rightLowerLeg",se+Math.max(0,-U)*Q,0,0),c("rightFoot",-P*X,0,0);const Z=.16+.34*y;u("left",Z*(1-l)+.16*l),u("right",Z)}else if(n==="giant_stride")c("spine",.05,0,0),c("chest",.04,0,0),c("head",-.06,0,0),c("rightUpperArm",-1.08,-.38,.88),c("rightLowerArm",-1.28,-.3,0),c("leftUpperArm",-.38,.25,-1.06),c("leftLowerArm",-.76,.32,0),c("leftUpperLeg",-.68,0,.04),c("leftLowerLeg",.14,0,0),c("leftFoot",.22,0,0),c("rightUpperLeg",.46,0,-.04),c("rightLowerLeg",.22,0,0),c("rightFoot",.28,0,0);else if(n==="back_roll")c("spine",.16,0,0),c("chest",.12,0,0),c("head",.18,0,0),c("rightUpperArm",-1.05,-.36,.86),c("rightLowerArm",-1.26,-.28,0),c("leftUpperArm",-.45,.28,-1.02),c("leftLowerArm",-.85,.35,0),c("leftUpperLeg",-.96,0,.05),c("leftLowerLeg",.98,0,0),c("leftFoot",.25,0,0),c("rightUpperLeg",-.96,0,-.05),c("rightLowerLeg",.98,0,0),c("rightFoot",.25,0,0);else if(n==="bar_sit"||n==="bar_sip"||n==="stand_sip"){const w=n==="bar_sip"||n==="stand_sip",y=w?Math.max(0,Math.min(1,r)):0,M=(Z,ae,ie)=>{const R=Math.max(0,Math.min(1,(ie-Z)/Math.max(1e-4,ae-Z)));return R*R*(3-2*R)},P=w?M(0,.24,y)*(1-M(.76,1,y)):0,U=w?M(.19,.35,y)*(1-M(.64,.78,y)):0,L=U*Math.pow(Math.max(0,Math.sin((y-.22)/.44*Math.PI*2)),2),E=w?M(.68,.78,y)*(1-M(.92,1,y)):0,_=Math.sin(a*1.15)*.024,H=Math.sin(a*2.1)*.014,G=Math.sin(a*1.85)*.032*this.emotionCtx.tipsyLevel,Q=this.drinkHasStraw,se=Q?.045*U:-.08*U,X=Q?.085*U+.016*L:-.16*U-.032*L;c("spine",.04+H+(Q?.02:-.03)*U+.025*E,(_+G)*.5*(1-P),G*.4*(1-P)),c("chest",.03+H+(Q?.025:-.04)*U+.03*E,-(_+G)*.4*(1-P),0),c("neck",se+.04*E,_*.7*(1-P),.035*E),c("head",-.01+X+(Q?-.03:.045)*E,Math.sin(a*.85)*.05*(1-P),.095*E+G*.9*(1-P)),n==="stand_sip"?(c("leftUpperArm",-.08,.1,-1.22),c("leftLowerArm",0,-.26,0)):(c("leftUpperArm",0,-.46,-1.06),c("leftLowerArm",0,-.92,0)),n==="stand_sip"?(c("rightUpperArm",0,.34,1.14),c("rightLowerArm",0,.85,0)):(c("rightUpperArm",0,.46,1.06),c("rightLowerArm",0,.92,0)),c("rightHand",0,0,0),n==="stand_sip"?(c("leftUpperLeg",-.03,0,.03),c("leftLowerLeg",.05,0,0),c("rightUpperLeg",.03,0,-.03),c("rightLowerLeg",.05,0,0),u("left",.2)):(c("leftUpperLeg",-1.46,.03,.06),c("leftLowerLeg",1.44+Math.sin(a*1.4)*.03,0,0),c("leftFoot",.08,0,0),c("rightUpperLeg",-1.46,-.03,-.06),c("rightLowerLeg",1.44-Math.sin(a*1.4)*.03,0,0),c("rightFoot",.08,0,0),u("left",.25),P<=.01&&u("right",.25))}else if(n==="dining_sit"){const w=Math.sin(a*1.95)*.013,y=Math.sin(a*1.15)*.025+Math.sin(a*1.8)*.028*this.emotionCtx.tipsyLevel,M=Math.sin(a*1.65)*.045;c("spine",.03+w,y*.4,y*.25),c("chest",.02+w,-y*.3,0),c("neck",.01,y*.45,0),c("head",.01+Math.sin(a*.9)*.018,Math.sin(a*.72)*.055,y*.85),c("leftUpperArm",.06,-.32,-1.24),c("leftLowerArm",-.14,-.82,-.28),c("leftHand",.08,0,-.06),c("rightUpperArm",.06,.32,1.24),c("rightLowerArm",-.14,.82,.28),c("rightHand",.08,0,.06),u("left",.28),u("right",.28),c("leftUpperLeg",-1.5,.03,.05),c("leftLowerLeg",1.44+M,0,0),c("leftFoot",.08-M*.35,0,0),c("rightUpperLeg",-1.5,-.03,-.05),c("rightLowerLeg",1.44-M,0,0),c("rightFoot",.08+M*.35,0,0)}else if(n==="beach_lie"){const w=Math.sin(a*1.65)*.014,y=Math.sin(a*.55)*.08;c("spine",.21+w,0,0),c("chest",.22+w,0,0),c("neck",.13,y*.4,0),c("head",.15+Math.sin(a*.8)*.025,y,0),c("leftUpperArm",-.22,.2,-1.16),c("leftLowerArm",-.58,.36,0),c("rightUpperArm",-.2,-.18,1.16),c("rightLowerArm",-.54,-.34,0),c("leftUpperLeg",-.06,.03,.04),c("leftLowerLeg",.06,0,0),c("leftFoot",.22+Math.sin(a*1.2)*.04,0,0),c("rightUpperLeg",-.44,-.04,-.05),c("rightLowerLeg",.78,0,0),c("rightFoot",.26-Math.sin(a*1.2)*.04,0,0)}else if(n==="hammock_lie"){const w=Math.sin(a*1.55)*.014,y=-.26+Math.sin(a*.62)*.06;c("spine",.19+w,0,0),c("chest",.2+w,-.04,0),c("neck",.14,y*.45,0),c("head",.16,y,.04),c("leftUpperArm",-.28,.24,-1.18),c("leftLowerArm",-.68,.42,0),c("rightUpperArm",-.28,-.24,1.18),c("rightLowerArm",-.68,-.42,0),c("leftUpperLeg",-.32,.02,.05),c("leftLowerLeg",.22,0,0),c("leftFoot",.18,0,0),c("rightUpperLeg",-.36,-.02,-.05),c("rightLowerLeg",.26,0,0),c("rightFoot",.18,0,0)}else if(n==="bbq_chop"){const w=Math.max(0,Math.min(1,r)),y=Math.sin(w*Math.PI*3),M=Math.cos(w*Math.PI*2);c("spine",.14,-.05+y*.02,0),c("chest",.11,-.04-y*.02,0),c("neck",.12,.02,0),c("head",.22+Math.abs(y)*.02,.03,0),c("leftUpperArm",-.58,-.26,-1.04),c("leftLowerArm",-.22,-.78,.24),c("leftHand",.32,0,-.12),c("rightUpperArm",-.52+M*.12,.18,1.06),c("rightLowerArm",-.2-y*.1,.84-M*.14,-.18),c("rightHand",-.12+y*.08,0,.1),c("leftUpperLeg",-.05,.02,.03),c("leftLowerLeg",.08,0,0),c("rightUpperLeg",.04,-.02,-.03),c("rightLowerLeg",.08,0,0),u("left",.62),u("right",.94)}else if(n==="bbq_eat"){const w=Math.max(0,Math.min(1,r)),y=Math.sin(a*11.5)*.042*w,M=Math.sin(a*3.4)*.072;c("spine",.04+.03*w,M*.35,M*.28),c("chest",.04,-M*.25,M*.2),c("neck",.04*w,0,M*.35),c("head",.05*w+y,0,M*1.15),c("leftUpperArm",-.66,.28,-1.04),c("leftLowerArm",-.96,.44,0),c("rightUpperArm",-.56*(1-w)+-1.06*w,-.22*(1-w)+-.36*w,1.04*(1-w)+.86*w),c("rightLowerArm",-.8*(1-w)+-1.36*w,-.32*(1-w)+-.3*w,0),c("leftUpperLeg",-.04,0,.03),c("leftLowerLeg",.06,0,0),c("rightUpperLeg",.03,0,-.03),c("rightLowerLeg",.06,0,0),u("right",.72),u("left",.22)}else if(n==="dining_eat"){const w=Math.max(0,Math.min(1,r)),y=Math.sin(a*11.5)*.04*w,M=Math.sin(a*3.4)*.075;c("spine",.05+.03*w,M*.3,M*.25),c("chest",.04,-M*.22,M*.2),c("neck",.03*w,0,M*.35),c("head",.04*w+y,-.1,M*1.15),c("leftUpperArm",.06,-.32,-1.24),c("leftLowerArm",-.14,-.82,-.28),c("leftHand",.08,0,-.06),c("rightUpperArm",-.52*(1-w)+-1.06*w,-.2*(1-w)+-.36*w,1.04*(1-w)+.86*w),c("rightLowerArm",-.78*(1-w)+-1.36*w,-.3*(1-w)+-.3*w,0),c("leftUpperLeg",-1.5,.03,.05),c("leftLowerLeg",1.44+Math.sin(a*1.5)*.035,0,0),c("leftFoot",.08,0,0),c("rightUpperLeg",-1.5,-.03,-.05),c("rightLowerLeg",1.44-Math.sin(a*1.5)*.035,0,0),c("rightFoot",.08,0,0),u("right",.72),u("left",.28)}else if(n==="fish_idle"){const w=Math.sin(a*2)*.016,y=Math.max(0,Math.min(1,r)),M=Math.sin(this.fishingTwitchImpulse*Math.PI),P=this.fishingRodLean,U=Math.sin(a*1.25)*.026,L=.5+.5*Math.sin(a*(2.4+y*3.6));c("spine",.11+w+y*.06-M*.07,-.1+U*.35-P*.1,-.045+P*.03),c("chest",.09+w+y*.05-M*.06,-.06-U*.25-P*.08,.028+P*.02),c("neck",.02,-.08,.04),c("head",-.03+y*.05-M*.04,-.15+Math.sin(a*.85)*.045-P*.06,.105+Math.sin(a*1.15)*.028),c("rightUpperArm",-.28-y*.06-M*.24,.44-P*.08,1.2-M*.06),c("rightLowerArm",.16,1.08+y*.06+M*.18,0),c("rightHand",-M*.18,0,-.12),u("right",.96),c("leftUpperArm",-.26-y*.05-M*.18,-.56-P*.08,-1.2+M*.05),c("leftLowerArm",-.14,-1.06-y*.05-M*.14,0),c("leftHand",-M*.12,0,.12),u("left",.88),c("leftUpperLeg",-.06,-.08,-.04),c("leftLowerLeg",.11,0,0),c("leftFoot",-.03,.05,0),c("rightUpperLeg",-.25-L*.06-M*.05,.1,.05),c("rightLowerLeg",.5+L*.11+M*.08,0,0),c("rightFoot",-.25-L*.08,-.06,0)}else if(n==="fish_cast"){const w=Math.max(0,Math.min(1,r)),y=w<.38?Math.sin(w/.38*Math.PI*.5):Math.max(0,1-(w-.38)/.24),M=w>.34?Math.sin(Math.min(1,(w-.34)/.46)*Math.PI*.5):0;c("spine",-.14*y+.16*M,-.14*y+.08*M,.03),c("chest",-.15*y+.14*M,-.1*y+.06*M,-.02),c("head",-.1*y+.05*M,.06,-.07),c("rightUpperArm",-.16-1.15*y-.18*M,.52-.18*y+.1*M,1.24-.34*y),c("rightLowerArm",.16,1.14+.18*y-.28*M,0),u("right",1),c("leftUpperArm",-.14-.95*y-.14*M,-.64+.16*y,-1.24+.28*y),c("leftLowerArm",-.14,-1.12-.14*y+.24*M,0),u("left",.92),c("leftUpperLeg",-.22*M-.06,-.06,-.03),c("leftLowerLeg",.12+.2*M,0,0),c("rightUpperLeg",-.16+.22*M,.08,.04),c("rightLowerLeg",.36+.12*M,0,0)}else if(n==="fish_fight"){const w=Math.max(0,Math.min(1,r)),y=this.fishingRodLean,M=a*(8.5+w*9),P=Math.sin(M),U=Math.cos(M),L=Math.sin(a*5.2)*.05;c("spine",-.11-w*.08+L*.5,-.06-y*.16,.04+y*.08),c("chest",-.09-w*.06+L*.5,-.04-y*.14,-.03+y*.07),c("head",.08+w*.05,.06-y*.1,-.08+y*.05),c("rightUpperArm",-.28-w*.14+L,.56-y*.14,1.18),c("rightLowerArm",.18,1.24+w*.08,0),u("right",1),c("leftUpperArm",-.22+P*.08,-.64-y*.14+U*.08,-1.2),c("leftLowerArm",-.16,-1.18+P*.16,U*.08),u("left",.92),c("leftUpperLeg",-.28+Math.max(0,y)*.08,-.06,-.035),c("leftLowerLeg",.38,0,0),c("leftFoot",-.08,.05,0),c("rightUpperLeg",-.12-Math.min(0,y)*.08,.08,.045),c("rightLowerLeg",.34,0,0),c("rightFoot",-.14,-.05,0)}else if(n==="fish_catch"){const w=Math.sin(a*4.4)*.035;c("spine",-.03+w*.5,-.08,.05),c("chest",-.03+w*.5,-.06,-.03),c("head",-.05,-.12,-.11),c("leftUpperArm",-.18,-.46,-1.24),c("leftLowerArm",-.12,-1.08,0),u("left",.96),c("rightUpperArm",-.32+w,.54,1.1),c("rightLowerArm",.14,1.24,0),u("right",.76),c("leftUpperLeg",-.06,-.06,-.03),c("leftLowerLeg",.1,0,0),c("rightUpperLeg",-.34-Math.abs(w)*1.2,.09,.05),c("rightLowerLeg",.66+Math.abs(w)*1.5,0,0),c("rightFoot",-.28,-.06,0)}else if(n==="surface_tread"){const w=Math.max(0,Math.min(1,s/2.8)),y=2.4+w*2.1;this.treadCyclePhase=(this.treadCyclePhase+y*o)%(Math.PI*2);const M=this.treadCyclePhase,P=Math.sin(M),U=Math.cos(M),L=Math.sin(M*2);c("spine",.03+L*.016,P*.04,-P*.022),c("chest",.02+L*.014,-P*.035,0),c("neck",-.1*w,0,0),c("head",-.04-.16*w+L*.018,Math.sin(a*.72)*.04,0);const E=-.38-.16*w-.14*P,_=.22+.3*P,H=-.78-.07*L,G=-.66-.14*P,Q=.34+.26*P,se=.22*U;c("leftUpperArm",E*(1-l)+-.74*l,_*(1-l)+-.36*l,H*(1-l)+-.92*l),c("leftLowerArm",G*(1-l)+-.34*l,Q*(1-l)+-1.14*l,se*(1-l)+.42*l),c("leftHand",.12*L*(1-l),0,.28*U*(1-l)),c("rightUpperArm",-.38-.16*w-.14*P,-.22-.3*P,.78+.07*L),c("rightLowerArm",-.66-.14*P,-.34-.26*P,-.22*U),c("rightHand",.12*L,0,-.28*U);const X=Math.sin(M),Z=Math.cos(M),ae=-X,ie=-Z,R=.25+.08*w;c("leftUpperLeg",-.44+R*X,.06*Z,.12+.05*Z),c("leftLowerLeg",.76-.38*Math.max(-.4,X)+.18*Math.max(0,Z),0,0),c("leftFoot",.14+.26*X-.14*Z,0,0),c("rightUpperLeg",-.44+R*ae,-.06*ie,-.12-.05*ie),c("rightLowerLeg",.76-.38*Math.max(-.4,ae)+.18*Math.max(0,ie),0,0),c("rightFoot",.14+.26*ae-.14*ie,0,0)}else{const w=Math.max(0,Math.min(1,(90-t)/90)),y=Math.max(0,Math.min(1,(s-.16)/3.8)),M=y>this.smoothedSwimEffort?3.6:2.6;this.smoothedSwimEffort+=(y-this.smoothedSwimEffort)*(1-Math.exp(-M*o));const P=this.smoothedSwimEffort,U=.45+P*3.15;this.swimKickPhase=(this.swimKickPhase+U*o)%(Math.PI*2);const L=this.swimKickPhase,E=Math.sin(L)-.12*Math.sin(3*L),_=Math.sin(a*1.25),H=E*.032*P;c("spine",(-.07-_*.014)*w,H*.6,H),c("chest",(-.09-_*.016)*w,-H*.4,0),c("neck",-.25*w,0,0),c("head",-.32*w+_*.022,Math.sin(a*.55)*.03,0);const G=_*.016,Q=-.3*w-.1*(1-w)+G,se=-.16*w,X=-.52*w-.2*(1-w),Z=-.22*w;c("leftUpperArm",Q*(1-l)+-.78*l,se*(1-l)+-.38*l,-1.3*(1-l)+-.92*l),c("leftLowerArm",X*(1-l)+-.34*l,Z*(1-l)+-1.14*l,.42*l);const ae=Math.sin(r)*.65;c("rightUpperArm",-.36*w-.26*(1-w)-ae-G,.08*w-.08*(1-w),1.16-ae*.22),c("rightLowerArm",-.58*w-.48*(1-w)-ae*.35,-.2,0),c("rightHand",-.1,0,.12),u("right",1),u("left",.22);const ie=.04*w-.1*(1-w),R=.44*w+.24*(1-w),K=.36*w+.14,oe=_*.025*(1-P),he=.27*w+.17*(1-w),me=(1-w)*.18,ne=.07+.32*Math.pow(.5+.5*Math.sin(L-1.25),1.35)+me,Le=.07+.32*Math.pow(.5+.5*Math.sin(L+Math.PI-1.25),1.35)+me,Ae=.5*w+.15+.15*Math.sin(L-1.85),Ie=.5*w+.15+.15*Math.sin(L+Math.PI-1.85);c("leftUpperLeg",ie*(1-P)+(E*he-me*.4)*P+oe,0,.045),c("leftLowerLeg",R*(1-P)+ne*P,0,0),c("leftFoot",K*(1-P)+Ae*P,0,0),c("rightUpperLeg",ie*(1-P)+(-E*he-me*.4)*P-oe,0,-.045),c("rightLowerLeg",R*(1-P)+Le*P,0,0),c("rightFoot",K*(1-P)+Ie*P,0,0)}if(this.springChains.length>0){const w=(E,_,H,G)=>{const Q=Di(_*h,H,G*h),se=this.restWorldQuat[E],X=Nt(se),Z=Ke(Ke(X,Q),se);this.curQuat[E]=Ke(this.restQuat[E],Z)},y=Math.min(1,s/2.6),M=n==="land_walk"?this.walkDashBlend:0,P=n==="bar_sit"||n==="bar_sip"||n==="dining_sit"||n==="dining_eat"||n==="back_roll",U=n==="beach_lie"||n==="hammock_lie",L=n==="swim"||n==="surface_tread";for(let E=0;E<this.springChains.length;E++){const _=this.springChains[E],H=a*(L?1.45:U?1.35:2.1)+E*.65,G=n==="land_walk"?Math.sin(this.walkCyclePhase*2+E*.45)*y*(.35+.85*M):0,Q=Math.sin(H)*(1-.35*M)+G;for(let se=0;se<_.joints.length;se++){const X=_.joints[se],Z=se===0?1:.45,ae=_.kind==="skirt_front"||_.kind==="skirt_fside"||_.kind==="skirt_back"||_.kind==="skirt_side";if(P&&ae)_.followsUpperLeg?w(X,(se===0?-.08:-.04)+Q*.01,0,_.sideSign*(_.kind==="skirt_fside"?.14:.05)*Z):_.kind==="skirt_front"?w(X,(se===0?-1.16:-.22)+Q*.012,0,_.sideSign*.08*Z):_.kind==="skirt_fside"?w(X,(se===0?-.92:-.16)+Q*.011,0,_.sideSign*(se===0?.68:.14)):_.kind==="skirt_back"?w(X,(se===0?1.06:.2)+Q*.01,0,_.sideSign*.06*Z):w(X,(se===0?-.18:-.04)+Q*.01,0,_.sideSign*(se===0?1:.18));else if(U&&ae){const ie=!_.followsUpperLeg&&(_.kind==="skirt_front"||_.kind==="skirt_fside")?se===0?-.34:-.08:-.04*Z;w(X,ie+Q*.012*Z,0,_.sideSign*.04*Z)}else if(ae){const ie=_.followsUpperLeg?.35:1,R=(n==="swim"?(.1+.12*y)*Z:n==="surface_tread"?_.kind==="skirt_front"||_.kind==="skirt_fside"?se===0?-.32:-.08:(.08+.06*y)*Z:_.kind==="skirt_front"||_.kind==="skirt_fside"?(-.06*y-.16*M)*Z:(.08*y+.16*M)*Z)*ie;w(X,R+Q*(.03+.05*y+.035*M)*Z,0,_.sideSign*(.02+Math.abs(Q)*(.03+.025*M))*Z)}else if(_.kind==="ribbon")w(X,(-.04-(.1*y+.12*M)+Q*.06)*Z,Q*(.05+.03*M)*_.sideSign*Z,_.sideSign*(.04+(.05+.03*M)*Math.sin(H+.8)+G*.04)*Z);else{const ie=n==="swim"?(.12+.14*y)*Z:(.04*y+.09*M)*Z;w(X,ie+Q*(.025+.04*y+.035*M)*Z,0,_.sideSign*(.018+Math.sin(H+.5)*.025+G*.025)*Z)}}}}this.updateFacialExpressionsAndMorphs(o,a,n,r,h);const p=(w,y)=>{Ei(this.localMats[w],this.restTrans[w],this.curQuat[w],this.restScale[w]),y?Ee(this.globalMats[w],y,this.localMats[w]):this.globalMats[w].set(this.localMats[w]);for(const M of this.nodes[w].children??[])p(M,this.globalMats[w])};for(const w of this.rootNodes)p(w,null);const x=this.isVrm1?Math.PI:0,S=(90-t)*Math.PI/180,T=Di(0,i+x,0),k=n==="hammock_lie"?Math.sin(a*1.25)*.085:0,m=Di(S*h,0,k*h),A=Ke(T,m);this.lastDiverPos[0]=e[0],this.lastDiverPos[1]=e[1],this.lastDiverPos[2]=e[2],this.lastRootRotQuat=A;const D=n==="land_walk"||n==="stand_sip"||n==="bbq_chop"||n==="bbq_eat"||n==="fish_idle"||n==="fish_cast"||n==="fish_fight"||n==="fish_catch",I=n==="land_walk"?-Math.abs(Math.sin(this.walkCyclePhase))*Math.min(1,s/2.2)*(.012+.015*this.walkDashBlend):0,W=D?-.912-this.restSoleMinY+I:-.88;Ei(this.tempMatA,e,A,[1,1,1]),Ei(this.tempPivotMat,[0,W,0],[0,0,0,1],[1,1,1]),Ee(this.modelRootMat,this.tempMatA,this.tempPivotMat),this.uploadSkinJointTextures()}uploadSkinJointTextures(){const e=this.gl;for(const i of this.skins){const t=i.joints.length;for(let s=0;s<t;s++){const a=this.globalMats[i.joints[s]],r=i.inverseBindMats.subarray(s*16,s*16+16),n=i.jointPaletteData.subarray(s*16,s*16+16);Ee(n,a,r)}e.bindTexture(e.TEXTURE_2D,i.jointTex),e.texSubImage2D(e.TEXTURE_2D,0,0,0,4,t,e.RGBA,e.FLOAT,i.jointPaletteData)}e.bindTexture(e.TEXTURE_2D,null)}setDrinkHasStraw(e){this.drinkHasStraw=e}getMaskEyeAboveHeadY(){return this.maskEyeAboveHeadY}applyRightHandDrinkIK(e,i,t){if(!this.loaded||t<=.001)return;const s=this.humanBones.rightUpperArm,a=this.humanBones.rightLowerArm,r=this.humanBones.rightHand;if(s===void 0||a===void 0||r===void 0)return;const n=Math.max(0,Math.min(1,t)),o=this.isVrm1?1:-1,l=[e[0]-this.lastDiverPos[0],e[1]-this.lastDiverPos[1],e[2]-this.lastDiverPos[2]],h=Nt(this.lastRootRotQuat),c=qi(h,l),u=[c[0],c[1]+.88,c[2]],g=[u[0]-.022*o,u[1]-.01,u[2]-.042*o],p=this.globalMats[s][12],x=this.globalMats[s][13],S=this.globalMats[s][14],T=g[0]-p,k=g[1]-x,m=g[2]-S,A=Math.hypot(T,k,m);if(A<1e-4)return;const D=this.restUpperArmLen,I=this.restLowerArmLen,W=Math.abs(D-I)+.006,w=(D+I)*.992,y=Math.max(W,Math.min(w,A)),M=T/A,P=k/A,U=m/A,L=Math.max(-.999,Math.min(.999,(D*D+y*y-I*I)/(2*D*y))),E=Math.sqrt(Math.max(0,1-L*L)),_=-.6*o,H=-.76,G=.24*o,Q=_*M+H*P+G*U;let se=_-Q*M,X=H-Q*P,Z=G-Q*U,ae=Math.hypot(se,X,Z);ae<1e-4&&(se=0,X=-1,Z=0,ae=1),se/=ae,X/=ae,Z/=ae;const ie=p+D*(L*M+E*se),R=x+D*(L*P+E*X),K=S+D*(L*U+E*Z),oe=p+y*M,he=x+y*P,me=S+y*U,ne=Math.hypot(ie-p,R-x,K-S)||1,Le=[(ie-p)/ne,(R-x)/ne,(K-S)/ne],Ae=Math.hypot(oe-ie,he-R,me-K)||1,Ie=[(oe-ie)/Ae,(he-R)/Ae,(me-K)/Ae],He=ve=>{const ye=[];let Pe=ve;for(;Pe>=0;)ye.push(Pe),Pe=this.parentNode[Pe]??-1;let _e=[0,0,0,1];for(let Oe=ye.length-1;Oe>=0;Oe--)_e=Ke(_e,this.curQuat[ye[Oe]]);return _e},Ue=He(this.parentNode[s]??-1),We=Ke(Ue,this.restQuat[s]),dt=qi(Nt(this.restWorldQuat[s]),this.restUpperArmDir),vt=qi(We,dt),st=rr(vt,Le),ot=Ke(Nt(Ue),Ke(st,We));this.curQuat[s]=qa(this.curQuat[s],ot,n);const bt=He(this.parentNode[a]??-1),Qe=Ke(bt,this.restQuat[a]),St=qi(Nt(this.restWorldQuat[a]),this.restLowerArmDir),Tt=qi(Qe,St),wt=rr(Tt,Ie),nt=Ke(Nt(bt),Ke(wt,Qe));this.curQuat[a]=qa(this.curQuat[a],nt,n);let ct=.34*o,rt=.06,ut=.938*o;const Mt=Math.hypot(ct,rt,ut)||1;ct/=Mt,rt/=Mt,ut/=Mt;const b=0,B=Math.cos(i),N=-Math.sin(i)*o,ee=b*ct+B*rt+N*ut;let V=b-ee*ct,pe=B-ee*rt,ce=N-ee*ut;const J=Math.hypot(V,pe,ce)||1;V/=J,pe/=J,ce/=J;const de=[-ct*o,-rt*o,-ut*o],ue=[V*o,pe*o,ce*o],xe=[ue[1]*de[2]-ue[2]*de[1],ue[2]*de[0]-ue[0]*de[2],ue[0]*de[1]-ue[1]*de[0]],Y=b0(de,xe,ue),be=He(this.parentNode[r]??-1),Ce=Ke(Y,this.restWorldQuat[r]),Se=Ke(Nt(be),Ce);this.curQuat[r]=qa(this.curQuat[r],Se,n);const Me=(ve,ye,Pe,_e)=>{const Oe=this.humanBones[ve];if(Oe===void 0)return;const Ge=Di(ye*n*o,Pe*n,_e*n*o),Je=this.restWorldQuat[Oe],mt=Nt(Je),ht=Ke(Ke(mt,Ge),Je);this.curQuat[Oe]=Ke(this.restQuat[Oe],ht)},De=[["Index",-.06,.62],["Middle",-.02,.68],["Ring",.03,.72],["Little",.07,.74]];for(const[ve,ye,Pe]of De)Me(`right${ve}Proximal`,0,ye,Pe),Me(`right${ve}Intermediate`,0,0,Pe*1.08),Me(`right${ve}Distal`,0,0,Pe*.68);Me("rightThumbMetacarpal",.26,.34,.22),Me("rightThumbProximal",.22,.3,.28),Me("rightThumbDistal",.16,.24,.2);const ge=(ve,ye)=>{Ei(this.localMats[ve],this.restTrans[ve],this.curQuat[ve],this.restScale[ve]),ye?Ee(this.globalMats[ve],ye,this.localMats[ve]):this.globalMats[ve].set(this.localMats[ve]);for(const Pe of this.nodes[ve].children??[])ge(Pe,this.globalMats[ve])};for(const ve of this.rootNodes)ge(ve,null);this.uploadSkinJointTextures()}getBoneWorldMatrix(e,i){if(!this.loaded)return!1;const t=this.humanBones[e];return t===void 0?!1:(Ee(i,this.modelRootMat,this.globalMats[t]),!0)}getBoneCharacterAlignedWorldMatrix(e,i){if(!this.loaded)return!1;const t=this.humanBones[e];if(t===void 0)return!1;const s=Nt(this.restWorldQuat[t]),a=this.isVrm1?s:Ke(s,[0,1,0,0]);return Ei(this.tempPivotMat,[0,0,0],a,[1,1,1]),Ee(this.tempMatA,this.globalMats[t],this.tempPivotMat),Ee(i,this.modelRootMat,this.tempMatA),!0}getHandPalmGripCenter(e,i){const t=e==="right"?"rightHand":"leftHand";if(!this.getBoneCharacterAlignedWorldMatrix(t,this.tempMatB))return!1;const s=this.tempMatB,a=e==="right"?-1:1,r=this.restPalmGripDist,n=r*.06;return i[0]=s[12]+s[0]*(a*r)-s[4]*n,i[1]=s[13]+s[1]*(a*r)-s[5]*n,i[2]=s[14]+s[2]*(a*r)-s[6]*n,!0}getRightHandSalvageHookMatrix(e,i=.56){if(!this.getBoneCharacterAlignedWorldMatrix("rightHand",this.tempMatB))return!1;const t=this.tempMatB,s=t[0],a=t[1],r=t[2],n=t[4],o=t[5],l=t[6],h=t[8],c=t[9],u=t[10],g=this.restPalmGripDist,p=g*.06,x=t[12]-s*g-n*p,S=t[13]-a*g-o*p,T=t[14]-r*g-l*p,k=Math.cos(1.25),m=Math.sin(1.25);e[0]=n*i,e[1]=o*i,e[2]=l*i,e[3]=0,e[4]=(k*h+m*s)*i,e[5]=(k*c+m*a)*i,e[6]=(k*u+m*r)*i,e[7]=0,e[8]=(-m*h+k*s)*i,e[9]=(-m*c+k*a)*i,e[10]=(-m*u+k*r)*i,e[11]=0;const A=.135*i;return e[12]=x+h*A,e[13]=S+c*A,e[14]=T+u*A,e[15]=1,!0}drawShadowPass(e){if(!this.loaded)return;const i=this.gl,t=this.getProgUniforms(e);i.uniform1i(t.uJointTex,0),i.uniform1i(t.uBaseColorTex,1);for(const s of this.opaquePrims)this.suitMode>0&&s.hideInWetsuit||this.drawSinglePrimitive(s,t.uModelRootMat,t.uBaseColorFactor,t.uAlphaCutoff)}drawSceneOpaque(e){if(!this.loaded)return;const i=this.gl,t=this.getProgUniforms(e);i.uniform1i(t.uJointTex,1),i.uniform1i(t.uBaseColorTex,2),i.uniform1i(t.uSuitMode,this.suitMode),i.uniform2f(t.uAvatarSuitBounds,this.restNeckHeight,this.restWristSpanX),i.uniform4f(t.uCheekAnchor,this.cheekAnchor[0],this.cheekAnchor[1],this.cheekAnchor[2],this.cheekAnchor[3]),i.uniform1f(t.uCheekBlush,this.curCheekBlush);for(const s of this.opaquePrims)this.suitMode>0&&s.hideInWetsuit||(i.uniform1i(t.uPrimGarmentKind,s.garmentKind),i.uniform1i(t.uIsHeadPrim,s.isHeadPrim?1:0),i.uniform2f(t.uUvOffset,s.uvOffset[0],s.uvOffset[1]),this.drawSinglePrimitiveScene(s,t.uModelRootMat,t.uBaseColorFactor,t.uAlphaCutoff))}drawSceneBlend(e){if(!this.loaded||this.blendPrims.length===0)return;const i=this.gl,t=this.getProgUniforms(e);i.uniform1i(t.uJointTex,1),i.uniform1i(t.uBaseColorTex,2),i.uniform1i(t.uSuitMode,this.suitMode),i.uniform2f(t.uAvatarSuitBounds,this.restNeckHeight,this.restWristSpanX),i.uniform4f(t.uCheekAnchor,this.cheekAnchor[0],this.cheekAnchor[1],this.cheekAnchor[2],this.cheekAnchor[3]),i.uniform1f(t.uCheekBlush,this.curCheekBlush);for(const s of this.blendPrims)this.suitMode>0&&s.hideInWetsuit||(i.uniform1i(t.uPrimGarmentKind,s.garmentKind),i.uniform1i(t.uIsHeadPrim,s.isHeadPrim?1:0),i.uniform2f(t.uUvOffset,s.uvOffset[0],s.uvOffset[1]),this.drawSinglePrimitiveScene(s,t.uModelRootMat,t.uBaseColorFactor,t.uAlphaCutoff))}drawSinglePrimitive(e,i,t,s){const a=this.gl;e.skinIndex>=0&&this.skins[e.skinIndex]?(a.uniformMatrix4fv(i,!1,this.modelRootMat),a.activeTexture(a.TEXTURE0),a.bindTexture(a.TEXTURE_2D,this.skins[e.skinIndex].jointTex)):(Ee(this.tempMatB,this.modelRootMat,this.globalMats[e.nodeIndex]),a.uniformMatrix4fv(i,!1,this.tempMatB),a.activeTexture(a.TEXTURE0),a.bindTexture(a.TEXTURE_2D,this.fallbackJointTex)),a.activeTexture(a.TEXTURE1),a.bindTexture(a.TEXTURE_2D,e.tex),a.uniform4fv(t,e.baseColorFactor),a.uniform1f(s,e.alphaCutoff),a.bindVertexArray(e.vao),a.drawElements(a.TRIANGLES,e.indexCount,e.indexType,0)}drawSinglePrimitiveScene(e,i,t,s){const a=this.gl;e.skinIndex>=0&&this.skins[e.skinIndex]?(a.uniformMatrix4fv(i,!1,this.modelRootMat),a.activeTexture(a.TEXTURE1),a.bindTexture(a.TEXTURE_2D,this.skins[e.skinIndex].jointTex)):(Ee(this.tempMatB,this.modelRootMat,this.globalMats[e.nodeIndex]),a.uniformMatrix4fv(i,!1,this.tempMatB),a.activeTexture(a.TEXTURE1),a.bindTexture(a.TEXTURE_2D,this.fallbackJointTex)),a.activeTexture(a.TEXTURE2),a.bindTexture(a.TEXTURE_2D,e.tex),a.uniform4fv(t,e.baseColorFactor),a.uniform1f(s,e.alphaCutoff),a.bindVertexArray(e.vao),a.drawElements(a.TRIANGLES,e.indexCount,e.indexType,0)}clearModelResources(){const e=this.gl;for(const i of[...this.opaquePrims,...this.blendPrims]){for(const t of i.buffers)e.deleteBuffer(t);e.deleteVertexArray(i.vao)}for(const i of this.skins)e.deleteTexture(i.jointTex);for(const i of this.loadedTextures)e.deleteTexture(i);this.opaquePrims=[],this.blendPrims=[],this.skins=[],this.loadedTextures=[],this.loaded=!1}dispose(){this.clearModelResources(),this.gl.deleteTexture(this.whiteTex),this.gl.deleteTexture(this.fallbackJointTex)}}const y0=`#version 300 es
precision highp float;

uniform mat4 uViewProj;
uniform vec3 uCamPos;
uniform float uTime;
uniform float uDpr;

out float vAlpha;
out float vTwinkle;

float hash11(float p) {
  p = fract(p * 0.1031);
  p *= p + 33.33;
  p *= p + p;
  return fract(p);
}

void main() {
  float id = float(gl_VertexID);
  float h1 = hash11(id * 1.17 + 0.13);
  float h2 = hash11(id * 2.71 + 3.91);
  float h3 = hash11(id * 5.33 + 7.19);
  float h4 = hash11(id * 8.91 + 1.77);

  vec3 pos = vec3(
    (h1 - 0.5) * 28.0,
    (h2 - 0.5) * 14.0 - 0.5,
    (h3 - 0.5) * 24.0 - 2.0
  );

  // Gentle organic upward drift & current sway
  pos.x += sin(uTime * 0.22 + h4 * 6.283) * 0.9;
  pos.y = mod(pos.y + uTime * (0.08 + 0.12 * h4) + 7.5, 13.0) - 7.5;
  pos.z += cos(uTime * 0.19 + h1 * 6.283) * 0.8;

  if (pos.y > 5.15 || uCamPos.y > 5.45) {
    vAlpha = 0.0;
    vTwinkle = 0.0;
    gl_Position = vec4(2.0, 2.0, 2.0, 1.0);
    gl_PointSize = 0.0;
    return;
  }

  float dist = length(pos - uCamPos);
  float depthFade = smoothstep(24.0, 4.0, dist) * smoothstep(0.8, 3.0, dist);
  float heightGlow = clamp((pos.y + 6.0) / 11.5, 0.15, 1.0);

  vAlpha = depthFade * heightGlow * (0.16 + 0.26 * h4);
  vTwinkle = 0.65 + 0.35 * sin(uTime * (1.8 + h2 * 2.5) + h3 * 6.283);

  gl_Position = uViewProj * vec4(pos, 1.0);
  gl_PointSize = clamp((14.0 / max(dist, 1.5)) * (0.65 + 0.9 * h4) * uDpr, 1.2, 5.5 * uDpr);
}
`,S0=`#version 300 es
precision highp float;

uniform float uBiolum;

in float vAlpha;
in float vTwinkle;

out vec4 outColor;

void main() {
  vec2 d = gl_PointCoord - 0.5;
  float r2 = dot(d, d);
  if (r2 > 0.25) discard;

  float soft = exp(-r2 * 14.0);
  vec3 dayCol = vec3(0.48, 0.88, 0.98);
  vec3 bioCol = vec3(0.14, 0.86, 1.25);
  vec3 col = mix(dayCol, bioCol, clamp(uBiolum, 0.0, 1.0)) * soft * vAlpha * vTwinkle * (1.0 + uBiolum * 2.1);
  outColor = vec4(col, 1.0);
}
`,k0=`#version 300 es
precision highp float;

uniform mat4 uViewProj;
uniform vec3 uCamPos;
uniform float uTime;
uniform float uDpr;
uniform int uReachMode;   // 0=off, 1=single_left, 2=double_cross
uniform int uReachWin;    // 0=reach, 1=jackpot
uniform vec4 uReachSegA;  // (x0, y0, x1, y1) in world XY at z ~ 0.15
uniform vec4 uReachSegB;  // (x0, y0, x1, y1) for second cross line

out float vAlpha;
out float vWarmth;

float hash11(float p) {
  p = fract(p * 0.1031);
  p *= p + 33.33;
  p *= p + p;
  return fract(p);
}

void main() {
  if (uReachMode == 0) {
    gl_Position = vec4(2.0, 2.0, 2.0, 1.0);
    vAlpha = 0.0;
    vWarmth = 0.0;
    return;
  }

  float id = float(gl_VertexID);
  float h1 = hash11(id * 1.17 + 0.31);
  float h2 = hash11(id * 3.73 + 2.19);
  float h3 = hash11(id * 7.91 + 5.47);

  bool useSecond = (uReachMode == 2) && (gl_VertexID % 2 == 1);
  vec4 seg = useSecond ? uReachSegB : uReachSegA;

  // Flowing parameter s in [0..1] along the underwater current between the aligned fish schools
  float flowSpeed = (uReachWin == 1) ? 0.85 : 0.48;
  float s = fract(h1 + uTime * flowSpeed * (useSecond ? -1.0 : 1.0));

  vec2 a = seg.xy;
  vec2 b = seg.zw;
  vec2 dir = normalize(b - a);
  vec2 perp = vec2(-dir.y, dir.x);

  // Organic helical underwater eddy swirl around the stream axis
  float helixAng = s * 16.0 - uTime * 4.2 + h2 * 6.28318;
  float radialSpread = (0.04 + 0.16 * pow(h3, 1.6)) * (uReachWin == 1 ? 1.35 : 1.0);
  float waveSway = sin(s * 6.28318 - uTime * 2.8 + (useSecond ? 1.5 : 0.0)) * 0.09;

  vec2 xy = mix(a, b, s) + perp * (cos(helixAng) * radialSpread + waveSway);
  float z = 0.16 + sin(helixAng) * radialSpread;

  vec3 worldPos = vec3(xy, z);
  float dist = length(uCamPos - worldPos);

  float edgeFade = smoothstep(0.0, 0.12, s) * (1.0 - smoothstep(0.88, 1.0, s));
  float twinkle = 0.55 + 0.45 * sin(uTime * 6.5 + h2 * 19.0);

  vAlpha = edgeFade * twinkle * (uReachWin == 1 ? 0.85 : 0.48) * exp(-dist * 0.04);
  vWarmth = (uReachWin == 1) ? (0.65 + 0.35 * h2) : (useSecond ? 0.32 : 0.08);

  gl_Position = uViewProj * vec4(worldPos, 1.0);
  float basePt = (uReachWin == 1 ? 26.0 : 18.0) * (0.55 + 0.85 * (1.0 - h3));
  gl_PointSize = clamp((basePt * uDpr) / max(dist * 0.32, 0.5), 1.5, 22.0);
}
`,x0=`#version 300 es
precision highp float;

in float vAlpha;
in float vWarmth;

out vec4 outColor;

void main() {
  vec2 p = gl_PointCoord * 2.0 - 1.0;
  float r2 = dot(p, p);
  if (r2 > 1.0 || vAlpha <= 0.001) discard;

  float falloff = exp(-r2 * 3.4) * (1.0 - r2);
  // Natural marine bioluminescence: deep sea cyan-aqua shifting to sunlit champagne gold on Jackpot
  vec3 bioAqua = vec3(0.16, 0.78, 0.96);
  vec3 sunlitGold = vec3(1.05, 0.82, 0.34);
  vec3 col = mix(bioAqua, sunlitGold, vWarmth);

  outColor = vec4(col * falloff * vAlpha, 1.0);
}
`,T0=`#version 300 es
precision highp float;

uniform mat4 uViewProj;
uniform vec3 uCamPos;
uniform float uTime;
uniform float uBubbleTime;   // Time since bubble preview triggered
uniform int uBubbleMode;     // 0=off, 1=normal泡, 2=大泡, 3=超泡, 4=ダイバー呼気/微細泡, 5=レギュレーターパージ大排気
uniform vec3 uDiverBubbleOrigin;

out vec2 vQuadUv;
out float vAlpha;
out float vSeed;
out float vWobblePhase;
out float vIsGiantCap;
out vec3 vWorldPos;

float hash11(float p) {
  p = fract(p * 0.1031);
  p *= p + 33.33;
  p *= p + p;
  return fract(p);
}

void main() {
  const vec2 corners[6] = vec2[6](
    vec2(-1.0, -1.0),
    vec2( 1.0, -1.0),
    vec2( 1.0,  1.0),
    vec2(-1.0, -1.0),
    vec2( 1.0,  1.0),
    vec2(-1.0,  1.0)
  );

  int cornerId = gl_VertexID % 6;
  float id = float(gl_InstanceID);

  float h1 = hash11(id * 1.37 + 0.19);
  float h2 = hash11(id * 2.93 + 4.17);
  float h3 = hash11(id * 5.71 + 8.53);
  float h4 = hash11(id * 9.13 + 2.41);

  // Balanced instance counts & realistic radii for locked 60 FPS and jewel-like clarity
  int activeLimit = (uBubbleMode == 1) ? 72
                  : (uBubbleMode == 2) ? 148
                  : (uBubbleMode == 3) ? 196
                  : (uBubbleMode == 4) ? 112
                  : (uBubbleMode == 5) ? 240 : 0;
  if (gl_InstanceID >= activeLimit || uBubbleMode == 0) {
    gl_Position = vec4(2.0, 2.0, 2.0, 1.0);
    vQuadUv = vec2(0.0);
    vAlpha = 0.0;
    vSeed = 0.0;
    vWobblePhase = 0.0;
    vIsGiantCap = 0.0;
    vWorldPos = vec3(0.0);
    return;
  }

  vec3 worldPos;
  float radius;
  float popIn;
  float fadeOut;
  bool isGiant = false;

  if (uBubbleMode >= 4) {
    // === First-Person Scuba Regulator Exhaust / Nose Mask-Clear / Purge Blast Bubbles ===
    bool isPurge = (uBubbleMode == 5);
    float cycle = isPurge ? 2.1 : 2.35;
    float spawnDelay = h2 * (isPurge ? 0.52 : 1.35);
    float localT = uBubbleTime - spawnDelay;
    if (!isPurge && uBubbleTime > 1.8) {
      // Allow continuous stream when holding exhale / blowing tiny bubbles
      localT = mod(max(uBubbleTime - h2 * 1.8, 0.0), cycle);
    }
    if (localT < 0.0 || localT > cycle) {
      gl_Position = vec4(2.0, 2.0, 2.0, 1.0);
      vQuadUv = vec2(0.0);
      vAlpha = 0.0;
      vSeed = 0.0;
      vWobblePhase = 0.0;
      vIsGiantCap = 0.0;
      vWorldPos = vec3(0.0);
      return;
    }

    float side = (gl_InstanceID % 2 == 0) ? 1.0 : -1.0;
    float spread = isPurge ? 0.48 : 0.22;
    float riseSpd = (isPurge ? 2.05 : 1.35) + h3 * 0.95;
    float wobX = sin(localT * (5.5 + h4 * 3.0) + h1 * 6.28318) * (0.06 + localT * 0.10);
    float wobZ = cos(localT * (4.8 + h3 * 2.5) + h2 * 6.28318) * (0.06 + localT * 0.10);

    worldPos = uDiverBubbleOrigin + vec3(
      side * (0.08 + h1 * spread) + wobX,
      localT * riseSpd - (isPurge ? 0.05 : 0.0),
      (h4 - 0.5) * (isPurge ? 0.65 : 0.32) + wobZ
    );

    bool isMicro = (gl_InstanceID % 3 != 0);
    isGiant = isPurge && (!isMicro) && (gl_InstanceID % 6 == 0);
    radius = isMicro
      ? (0.012 + h3 * 0.020)
      : (isGiant ? (0.068 + h4 * 0.048) : (0.028 + h3 * 0.036));

    float camDist = length(worldPos - uCamPos);
    popIn = smoothstep(0.0, 0.12, localT) * smoothstep(0.55, 1.05, camDist);
    fadeOut = 1.0 - smoothstep(cycle * 0.68, cycle, localT);
    if (worldPos.y > 5.35) fadeOut = 0.0;
    radius *= (0.4 + 0.6 * popIn);
  } else {
    float spawnDelay = h2 * (uBubbleMode == 1 ? 0.95 : 1.45);
    float localT = uBubbleTime - spawnDelay;
    if (uBubbleMode == 3) {
      localT = mod(max(uBubbleTime - h2 * 1.9, 0.0), 2.55);
      if (uBubbleTime < h2 * 0.55) localT = -1.0;
    }

    if (localT < 0.0 || localT > 3.8) {
      gl_Position = vec4(2.0, 2.0, 2.0, 1.0);
      vQuadUv = vec2(0.0);
      vAlpha = 0.0;
      vSeed = 0.0;
      vWobblePhase = 0.0;
      vIsGiantCap = 0.0;
      vWorldPos = vec3(0.0);
      return;
    }

    // Natural abyssal bubble plume rising through the 3D ocean volume
    float spreadX = (uBubbleMode == 1) ? 3.8 : 7.4;
    float baseX = (h1 - 0.48) * spreadX;
    bool isMicro = (gl_InstanceID % 3 != 0);
    isGiant = (!isMicro) && (uBubbleMode >= 2) && (gl_InstanceID % 9 == 0);

    float riseSpeed = (isGiant ? 3.9 : (isMicro ? 3.1 : 3.6)) + h3 * 1.8;
    float wobbleFreq = (isGiant ? 3.8 : 6.2) + h4 * 3.5;
    float wobbleAmp  = (isGiant ? 0.24 : 0.15) + 0.16 * h1;

    float xHelix = sin(localT * wobbleFreq + h2 * 6.28318) * wobbleAmp - localT * 0.28;
    float zHelix = cos(localT * wobbleFreq * 0.85 + h1 * 6.28318) * wobbleAmp;

    worldPos = vec3(
      baseX + xHelix,
      -5.6 + localT * riseSpeed,
      0.85 + (h4 - 0.5) * 3.8 + zHelix
    );

    radius = isMicro
      ? (0.026 + h3 * 0.048)
      : (isGiant ? (0.26 + h4 * 0.19) : (0.085 + pow(h3, 1.5) * 0.13));

    popIn = smoothstep(0.0, 0.18, localT);
    fadeOut = 1.0 - smoothstep(2.6, 3.7, localT);
    radius *= (0.35 + 0.65 * popIn);
  }

  vec3 toCam = normalize(uCamPos - worldPos);
  vec3 right = normalize(cross(vec3(0.0, 1.0, 0.0), toCam));
  vec3 up    = cross(toCam, right);

  // Real hydrodynamic oblate flattening on large rising air bubbles
  float baseSquash = isGiant ? 1.34 : 1.08;
  float osc = 1.0 + (isGiant ? 0.16 : 0.09) * sin(uTime * 8.5 + h1 * 6.28318);
  float scaleX = radius * baseSquash * osc;
  float scaleY = radius / (osc * (isGiant ? 1.16 : 1.0));

  vec2 corner = corners[cornerId];
  vec3 vertWorld = worldPos + right * (corner.x * scaleX) + up * (corner.y * scaleY);

  vQuadUv = corner;
  vAlpha = popIn * fadeOut;
  vSeed = h4;
  vWobblePhase = uTime * 5.2 + h1 * 6.28318;
  vIsGiantCap = isGiant ? 1.0 : 0.0;
  vWorldPos = vertWorld;

  gl_Position = uViewProj * vec4(vertWorld, 1.0);
}
`,M0=`#version 300 es
precision highp float;
precision highp sampler2D;

in vec2 vQuadUv;
in float vAlpha;
in float vSeed;
in float vWobblePhase;
in float vIsGiantCap;
in vec3 vWorldPos;

uniform sampler2D uRefractSceneTex;
uniform vec2 uInvResolution;
uniform vec3 uCamPos;

out vec4 outColor;

void main() {
  if (vAlpha <= 0.001) discard;

  vec2 p = vQuadUv;
  // Hydrodynamic jellyfish-cap bottom indentation on giant underwater air domes!
  if (vIsGiantCap > 0.5) {
    p.y += 0.22 * (1.0 - p.x * p.x) * smoothstep(0.3, -0.9, p.y);
  }
  float ang = atan(p.y, p.x);
  float deform = 1.0
    + 0.045 * sin(ang * 3.0 + vWobblePhase)
    + 0.025 * cos(ang * 5.0 - vWobblePhase * 1.35);
  p *= deform;

  float r2 = dot(p, p);
  if (r2 > 1.0) discard;

  float nz = sqrt(max(1.0 - r2, 0.0));
  vec3 N = normalize(vec3(p.x, p.y, nz));
  vec3 V = vec3(0.0, 0.0, 1.0);

  // True Screen-Space Water->Air Snell Refraction of the 3D Ocean & Fish behind the bubble!
  vec2 screenUv = gl_FragCoord.xy * uInvResolution;
  float dist = length(uCamPos - vWorldPos);
  float refractAmp = clamp(0.048 / max(dist * 0.11, 0.45), 0.008, 0.065) * (1.0 + 0.55 * vIsGiantCap);
  vec2 refractedUv = clamp(screenUv - N.xy * refractAmp * (0.4 + 0.6 * (1.0 - nz)), vec2(0.002), vec2(0.998));

  // Subtle physical chromatic dispersion across the water-air interface
  vec3 behindCol;
  behindCol.r = texture(uRefractSceneTex, clamp(refractedUv + N.xy * 0.0025, vec2(0.002), vec2(0.998))).r;
  behindCol.g = texture(uRefractSceneTex, refractedUv).g;
  behindCol.b = texture(uRefractSceneTex, clamp(refractedUv - N.xy * 0.0025, vec2(0.002), vec2(0.998))).b;

  // Water->Air Total Internal Reflection (critical angle ~48.6 deg => nz ~ 0.66)
  float tir = smoothstep(0.72, 0.22, nz);
  float fresnel = pow(1.0 - nz, 3.2);

  // Reflected underwater environment: bright sunlit Snell's Window cyan-silver above, deep abyssal blue below
  vec3 envTop = vec3(0.52, 0.94, 1.08);
  vec3 envBot = vec3(0.015, 0.11, 0.20);
  vec3 tirColor = mix(envBot, envTop, smoothstep(-0.45, 0.65, N.y));

  // Sharp overhead sun specular + secondary lower-rim internal caustic focus
  vec3 L1 = normalize(vec3(-0.18, 0.78, 0.60));
  vec3 H1 = normalize(L1 + V);
  float sunSpec = pow(max(dot(N, H1), 0.0), 96.0) * 3.4 + pow(max(dot(N, H1), 0.0), 18.0) * 0.38;

  vec3 L2 = normalize(vec3(0.22, -0.72, 0.65));
  vec3 H2 = normalize(L2 + V);
  float causticRim = pow(max(dot(N, H2), 0.0), 32.0) * 0.85;

  // Underwater Beer-Lambert distance fade so distant bubbles blend naturally into the abyss
  float fogAtten = exp(-max(dist - 3.0, 0.0) * 0.055);

  vec3 composite = mix(behindCol * 1.04, tirColor, tir * 0.72 + fresnel * 0.24)
                 + vec3(0.92, 0.99, 1.05) * sunSpec * fogAtten
                 + vec3(0.32, 0.84, 0.98) * causticRim * fogAtten;

  float edgeAA = smoothstep(1.0, 0.88, r2);
  float outAlpha = edgeAA * vAlpha * clamp(0.68 + 0.32 * tir, 0.0, 1.0);
  outColor = vec4(composite, outAlpha);
}
`,P0=`#version 300 es
precision highp float;
precision highp sampler2D;

in vec2 vUv;

uniform sampler2D uSceneColorTex;
uniform sampler2D uSceneDepthTex;
uniform sampler2D uSunShadowTex;

uniform mat4 uInvViewProj;
uniform mat4 uSunViewProj;
uniform vec3 uCamPos;
uniform vec3 uSunDir;
uniform vec3 uSunScreen;
uniform vec2 uTexelSize;
uniform float uTime;
uniform float uGodRayIntensity;
uniform float uCausticIntensity;
uniform float uSolarFlash;
uniform float uShockwave;
uniform int uDiveMode;       // 1 = PADI First-Person Scuba Mask Optics
uniform vec2 uMaskState;     // x = water flood level (0..1), y = head pitch tilt
uniform float uEarPressure;  // 0..1 ear squeeze cue when descending without equalizing
uniform float uMaskFog;      // 0..1 warm breath condensation fog when diving without defogging mask!
uniform float uCinemaCutoutOpacity; // 0..1 hardware depth-occluded alpha punch for 3D Beach Cinema DOM underlay!

out vec4 outColor;

${wi}

float interleavedGradientNoise(vec2 pixel) {
  return fract(52.9829189 * fract(dot(pixel, vec2(0.06711056, 0.00583715))));
}

float sampleVolumetricShadow(vec3 worldPos) {
  vec4 lightClip = uSunViewProj * vec4(worldPos, 1.0);
  vec3 proj = lightClip.xyz / max(lightClip.w, 1e-6);
  vec2 uv = proj.xy * 0.5 + 0.5;
  float d = proj.z * 0.5 + 0.5;
  if (uv.x <= 0.002 || uv.x >= 0.998 || uv.y <= 0.002 || uv.y >= 0.998 || d > 1.0) {
    return 1.0;
  }
  float closest = texture(uSunShadowTex, uv).r;
  return (d - 0.0045 <= closest) ? 1.0 : 0.16;
}

// Fine-structured radial crepuscular sunbeams fanning out from the overhead Snell's Window solar crown
float evalCrepuscularRayPattern(vec2 uv, vec2 sunUv, float aspect, float time) {
  vec2 d = uv - sunUv;
  d.x *= aspect;
  float r = length(d);
  float theta = atan(d.x, -d.y);

  // Multi-harmonic animated wave-aperture streaks (produces crisp individual sun shafts like the reference)
  float s1 = 0.5 + 0.5 * sin(theta * 18.0 + sin(theta * 5.0 - time * 0.35) + time * 0.42);
  float s2 = 0.5 + 0.5 * sin(theta * 37.0 - time * 0.68 + cos(theta * 9.0 + time * 0.25));
  float s3 = 0.5 + 0.5 * sin(theta * 63.0 + time * 0.95);
  float s4 = 0.5 + 0.5 * sin(theta * 11.0 - time * 0.22);

  float combined = (0.36 * pow(s1, 2.2) + 0.34 * pow(s2, 2.8) + 0.18 * pow(s3, 3.4) + 0.22 * s4);
  // Radiate downward/outward from a blazing continuous solar core (zero central dark hole)
  float downwardMask = smoothstep(-0.20, 0.18, sunUv.y - uv.y + 0.10);
  float coreBloom = exp(-r * r * 36.0) * 0.85;
  float radialAtten = exp(-r * 1.18);
  return (combined * downwardMask * radialAtten) + coreBloom;
}

vec3 acesToneMap(vec3 x) {
  const float a = 2.51;
  const float b = 0.03;
  const float c = 2.43;
  const float d = 0.59;
  const float e = 0.14;
  return clamp((x * (a * x + b)) / (x * (c * x + d) + e), 0.0, 1.0);
}

void main() {
  float aspect = uTexelSize.y / max(uTexelSize.x, 1e-6);
  vec2 sampleUv = vUv;

  // Subtle 3D underwater acoustic pressure-wave refraction when pressing PUSH
  float waveGlow = 0.0;
  if (uShockwave > 0.001 && uShockwave < 1.35) {
    vec2 fromTrigger = vUv - vec2(0.5, 0.12);
    fromTrigger.x *= aspect;
    float r = length(fromTrigger);
    float front = uShockwave * 1.45;
    float fade = 1.0 - clamp(uShockwave / 1.35, 0.0, 1.0);
    float ring = exp(-pow((r - front) * 14.0, 2.0)) * fade;
    vec2 dirUv = (r > 1e-4) ? (fromTrigger / r) : vec2(0.0, 1.0);
    dirUv.x /= aspect;
    sampleUv = clamp(vUv + dirUv * (ring * 0.011), vec2(0.001), vec2(0.999));
    waveGlow = ring * 0.24;
  }

  vec3 baseHdr = texture(uSceneColorTex, sampleUv).rgb + vec3(0.18, 0.72, 0.92) * waveGlow;
  float maskMeniscusGlow = 0.0;

  // === PADI Open Water First-Person Scuba Mask Water-Flood & Meniscus Refraction ===
  if (uDiveMode == 1 && uMaskState.x > 0.004) {
    float flood = clamp(uMaskState.x, 0.0, 1.0);
    float slosh = 0.018 * sin(vUv.x * 9.5 + uTime * 3.9)
                + 0.009 * cos(vUv.x * 17.0 - uTime * 5.3)
                + (vUv.x - 0.5) * 0.03 * sin(uTime * 1.9);
    // Capillary rise at left/right silicone skirt edges
    float edgeCapillary = pow(abs(vUv.x - 0.5) * 2.0, 3.0) * 0.028;
    float waterLineY = flood * 1.06 - 0.02 + slosh + edgeCapillary - uMaskState.y * 0.06;

    float submerge = smoothstep(waterLineY + 0.010, waterLineY - 0.016, vUv.y);
    if (submerge > 0.001) {
      // Water touching cornea inside mask causes hyperopic defocus blur + aqueous ripple distortion
      vec2 aqueousWarp = vec2(
        sin(vUv.y * 28.0 + uTime * 3.1) * 0.0055,
        cos(vUv.x * 24.0 - uTime * 2.7) * 0.0055
      ) * submerge;
      vec2 wUv = clamp(sampleUv + aqueousWarp, vec2(0.002), vec2(0.998));
      vec2 blurStep = uTexelSize * (13.5 * submerge);
      vec3 acc = texture(uSceneColorTex, wUv).rgb * 0.20;
      const vec2 taps[8] = vec2[8](
        vec2(1.0, 0.0), vec2(-1.0, 0.0), vec2(0.0, 1.0), vec2(0.0, -1.0),
        vec2(0.707, 0.707), vec2(-0.707, 0.707), vec2(0.707, -0.707), vec2(-0.707, -0.707)
      );
      for (int k = 0; k < 8; k++) {
        acc += texture(uSceneColorTex, clamp(wUv + taps[k] * blurStep, vec2(0.002), vec2(0.998))).rgb * 0.065;
        acc += texture(uSceneColorTex, clamp(wUv + taps[k] * blurStep * 2.15, vec2(0.002), vec2(0.998))).rgb * 0.035;
      }
      vec3 floodedCol = acc * vec3(0.78, 0.98, 1.06) + vec3(0.012, 0.055, 0.082);
      baseHdr = mix(baseHdr, floodedCol, submerge * 0.94);
    }

    // Crisp silver-aqua internal reflection meniscus band right at the air-water boundary inside the mask!
    float band = exp(-pow((vUv.y - waterLineY) / 0.0075, 2.0));
    float microBead = 0.65 + 0.35 * sin(vUv.x * 130.0 + uTime * 6.0);
    maskMeniscusGlow = band * (0.55 + 0.45 * microBead) * smoothstep(0.0, 0.04, flood) * smoothstep(1.02, 0.94, flood);
  }

  // --- 1. 3D World-Space Volumetric Scattering + Fish School Shadow Shafts (Underwater Only) ---
  bool camUnderwater = (uCamPos.y <= OCEAN_SURFACE_Y + 0.02);
  bool needsRayDir = camUnderwater || (uCinemaCutoutOpacity > 0.004);
  vec3 rayDir = vec3(0.0, 0.0, -1.0);
  if (needsRayDir) {
    vec2 ndc = vUv * 2.0 - 1.0;
    vec4 farClip = uInvViewProj * vec4(ndc, 1.0, 1.0);
    vec3 worldFar = farClip.xyz / max(farClip.w, 1e-6);
    rayDir = normalize(worldFar - uCamPos);
  }

  vec3 volScatter = vec3(0.0);
  vec3 radialShafts = vec3(0.0);
  if (camUnderwater) {
    float rawDepth = texture(uSceneDepthTex, sampleUv).r;
    vec2 ndc = vUv * 2.0 - 1.0;
    vec4 worldClip = uInvViewProj * vec4(ndc, rawDepth * 2.0 - 1.0, 1.0);
    vec3 worldHit = worldClip.xyz / max(worldClip.w, 1e-6);
    float hitDist = (rawDepth >= 0.99995) ? 24.0 : min(length(worldHit - uCamPos), 24.0);
    float jitter = interleavedGradientNoise(gl_FragCoord.xy);

    const int MARCH_STEPS = 20;
    float tStart = 0.65;
    float tEnd = max(tStart + 0.1, hitDist);
    float stepLen = (tEnd - tStart) / float(MARCH_STEPS);

    float cosAngle = dot(rayDir, uSunDir);
    const float g = 0.62;
    float hg = (1.0 - g * g) / (4.0 * PI * pow(max(1.0 + g * g - 2.0 * g * cosAngle, 0.03), 1.5));
    float phaseBoost = 0.35 + min(hg * 1.25, 2.2);

    for (int i = 0; i < MARCH_STEPS; i++) {
      float t = tStart + (float(i) + jitter) * stepLen;
      vec3 samplePos = uCamPos + rayDir * t;
      if (samplePos.y > OCEAN_SURFACE_Y - 0.1) break;

      float shaft = evalSunShaftCaustic(samplePos, uTime, uSunDir) * uCausticIntensity;
      float shadow = sampleVolumetricShadow(samplePos);

      float depthAtten = exp(-max(OCEAN_SURFACE_Y - samplePos.y, 0.0) * 0.135);
      float viewAtten  = exp(-t * 0.065);

      volScatter += vec3(0.14, 0.56, 0.72) * (shaft * shadow * depthAtten * viewAtten * stepLen);
    }
    volScatter *= 0.155 * phaseBoost * uGodRayIntensity * clamp(uTodCloudTint.w, 0.16, 1.1);

    // --- 2. Crisp Crepuscular God-Ray Shafts with Fish Silhouette Occlusion ---
    if (uSunScreen.z > 0.01 && uGodRayIntensity > 0.01) {
      vec2 sunUv = uSunScreen.xy;
      float rayPattern = evalCrepuscularRayPattern(vUv, sunUv, aspect, uTime);

      // March 20 occlusion taps toward sunUv so dense fish clusters & the 3D Gemini Star block radial beams
      vec2 deltaUv = (sunUv - vUv);
      vec2 stepUv = deltaUv / 20.0;
      vec2 curUv = vUv + stepUv * jitter;
      float occlusion = 0.0;
      for (int s = 0; s < 20; s++) {
        curUv += stepUv;
        vec2 clampedUv = clamp(curUv, vec2(0.001), vec2(0.999));
        float dSample = texture(uSceneDepthTex, clampedUv).r;
        occlusion += step(0.9998, dSample);
      }
      occlusion /= 20.0;
      // Allow subtle foreground scattering even across fish while keeping clear shadow shafts behind them
      float visFactor = 0.26 + 0.74 * occlusion;

      vec3 baseRayCol = mix(uTodSunColor.rgb * vec3(0.45, 0.82, 0.95), vec3(0.24, 0.74, 0.90), uTodSkySunDir.w);
      vec3 rayTint = mix(baseRayCol, vec3(0.95, 0.86, 0.52), uSolarFlash * 0.65);
      float flashMul = (1.0 + uSolarFlash * 1.65) * clamp(uTodCloudTint.w, 0.18, 1.1);
      radialShafts = rayTint * (rayPattern * visFactor * 0.42 * uGodRayIntensity * flashMul * uSunScreen.z);
    }
  }

  // --- 3. Subtle HDR Specular Glint Halo (Softly enhanced at Sunset/Night so Kagaribi Torches, Lanterns & Neon glow warmly!) ---
  vec3 glow = vec3(0.0);
  const vec2 ring[8] = vec2[8](
    vec2(1.0, 0.0), vec2(-1.0, 0.0), vec2(0.0, 1.0), vec2(0.0, -1.0),
    vec2(0.707, 0.707), vec2(-0.707, 0.707), vec2(0.707, -0.707), vec2(-0.707, -0.707)
  );
  for (int i = 0; i < 8; i++) {
    vec3 c1 = texture(uSceneColorTex, clamp(vUv + ring[i] * uTexelSize * 2.8, vec2(0.001), vec2(0.999))).rgb;
    vec3 c2 = texture(uSceneColorTex, clamp(vUv + ring[i] * uTexelSize * 7.5, vec2(0.001), vec2(0.999))).rgb;
    glow += max(c1 - vec3(1.28), vec3(0.0)) * 0.45 + max(c2 - vec3(1.75), vec3(0.0)) * 0.28;
  }
  float airGlowScale = 0.024 + clamp(uTodSunColor.w, 0.0, 1.4) * 0.020;
  glow *= (camUnderwater ? 0.052 : airGlowScale);

  vec3 hdr = baseHdr + volScatter + radialShafts + glow + vec3(0.58, 0.94, 1.08) * maskMeniscusGlow;

  // Deep cinema vignette matching the abyssal framing (plus subtle Scuba Mask silicone skirt rim in Dive Mode)
  vec2 vigUv = vUv - 0.5;
  float vignette = 1.0 - dot(vigUv * vec2(1.05, 0.92), vigUv * vec2(1.05, 0.92)) * 0.52;
  hdr *= clamp(vignette, 0.52, 1.0);

  if (uMaskFog > 0.005 && uCamPos.y <= OCEAN_SURFACE_Y + 0.02) {
    // Realistic scuba mask lens condensation fog (clears around center slightly, dense misty blur toward periphery!)
    vec2 fogDistVec = (vUv - 0.5) * vec2(1.0, 0.92);
    float fogShape = clamp(0.45 + length(fogDistVec) * 1.15, 0.0, 1.0);
    float dropBeads = 0.85 + 0.15 * noise2D(vUv * 68.0);
    float fogAmt = clamp(uMaskFog * fogShape * dropBeads, 0.0, 0.92);
    vec2 fBlur = uTexelSize * (10.0 * fogAmt);
    vec3 fogBlur = (
      texture(uSceneColorTex, clamp(sampleUv + vec2(fBlur.x, 0.0), vec2(0.002), vec2(0.998))).rgb +
      texture(uSceneColorTex, clamp(sampleUv - vec2(fBlur.x, 0.0), vec2(0.002), vec2(0.998))).rgb +
      texture(uSceneColorTex, clamp(sampleUv + vec2(0.0, fBlur.y), vec2(0.002), vec2(0.998))).rgb +
      texture(uSceneColorTex, clamp(sampleUv - vec2(0.0, fBlur.y), vec2(0.002), vec2(0.998))).rgb
    ) * 0.25;
    hdr = mix(hdr, fogBlur * 0.82 + vec3(0.24, 0.34, 0.38), fogAmt * 0.82);
  }

  if (uEarPressure > 0.01 && uCamPos.y <= OCEAN_SURFACE_Y + 0.02) {
    float earPulse = (0.55 + 0.45 * sin(uTime * 6.5)) * uEarPressure;
    float periph = smoothstep(0.22, 0.68, length(vigUv));
    hdr = mix(hdr, hdr * vec3(1.18, 0.84, 0.78) + vec3(0.12, 0.03, 0.02), periph * earPulse * 0.55);
  }

  if (uDiveMode == 1) {
    // Low-volume panoramic tempered-glass scuba mask peripheral frame & glass reflection
    vec2 mUv = (vUv - 0.5) * vec2(1.04, 1.10);
    float rMask = pow(abs(mUv.x), 4.2) + pow(abs(mUv.y), 4.2);
    float glassRim = smoothstep(0.072, 0.095, rMask) * (1.0 - smoothstep(0.095, 0.112, rMask));
    float skirtShade = 1.0 - smoothstep(0.088, 0.135, rMask) * 0.78;
    hdr = hdr * skirtShade + vec3(0.10, 0.28, 0.36) * glassRim * 0.35;
  }

  vec3 mapped = acesToneMap(hdr * 1.12);
  vec3 srgb = pow(mapped, vec3(1.0 / 2.2));

  // === 4. Hardware Z-Buffer Per-Pixel Occlusion Cutout for 3D Bamboo Beachfront Cinema Screen ===
  if (uCinemaCutoutOpacity > 0.004 && !camUnderwater) {
    // Exact 3D Bamboo Cinema Screen geometry matching computeBeachCinemaProjection():
    // Center = (4.88, 7.34, 21.48), ry = -0.34 -> ax = (0.94275467, 0, 0.33348709), az = (-0.33348709, 0, 0.94275467)
    const vec3 kCinMid = vec3(4.88, 7.34, 21.48);
    const vec3 kCinAx  = vec3(0.94275467, 0.0, 0.33348709);
    const vec3 kCinAz  = vec3(-0.33348709, 0.0, 0.94275467);

    vec3 toCamCin = uCamPos - kCinMid;
    float cinDist = length(toCamCin);
    float cinSigned = toCamCin.x * kCinAz.x + toCamCin.z * kCinAz.z;

    if (cinDist <= 30.0 && abs(cinSigned) >= 0.12) {
      bool onDeckSide = (cinSigned > 0.0);
      float faceOff = onDeckSide ? 0.025 : -0.034;
      vec3 planeCenter = kCinMid + kCinAz * faceOff;
      vec3 planeN = onDeckSide ? kCinAz : -kCinAz;
      float denom = dot(rayDir, planeN);

      if (denom < -1e-4) {
        float tPlane = dot(planeCenter - uCamPos, planeN) / denom;
        if (tPlane > 0.16) {
          vec3 pPlane = uCamPos + rayDir * tPlane;
          vec3 rel = pPlane - planeCenter;
          float uLoc = abs(dot(rel, kCinAx));
          float vLoc = abs(rel.y);

          // Analytical ~1px anti-aliased inner display border (halfW = 0.90m, halfH = 0.51m)
          float pxWorld = clamp((tPlane * uTexelSize.y * 0.86) / max(-denom, 0.25), 0.0018, 0.014);
          float rectMask = (1.0 - smoothstep(0.90 - pxWorld, 0.90, uLoc))
                         * (1.0 - smoothstep(0.51 - pxWorld, 0.51, vLoc));

          if (rectMask > 0.001) {
            const vec2 subTaps[4] = vec2[4](
              vec2(-0.35, -0.35),
              vec2( 0.35, -0.35),
              vec2(-0.35,  0.35),
              vec2( 0.35,  0.35)
            );
            float occSum = 0.0;
            float blendSum = 0.0;
            vec3 fgHdrAcc = vec3(0.0);

            for (int k = 0; k < 4; k++) {
              vec2 tUv = clamp(vUv + subTaps[k] * uTexelSize, vec2(0.001), vec2(0.999));
              float dTap = texture(uSceneDepthTex, tUv).r;
              vec4 cTap = texture(uSceneColorTex, tUv);
              vec4 wClip = uInvViewProj * vec4(tUv * 2.0 - 1.0, dTap * 2.0 - 1.0, 1.0);
              vec3 wHit = wClip.xyz / max(wClip.w, 1e-6);

              // Screen mesh sits at -0.002m behind planeCenter; any solid geometry > +0.015m closer
              // (VRM avatar hair/hat/ribbon/body, cabana drapes, walls, bamboo frame, glasses) occludes!
              bool isSolidOcc = (dTap < 0.9999) && (dot(wHit - planeCenter, planeN) > 0.015);
              if (isSolidOcc) {
                occSum += 1.0;
                fgHdrAcc += cTap.rgb;
              } else {
                blendSum += clamp(cTap.a, 0.0, 1.0);
              }
            }

            float occFrac = occSum * 0.25;
            float remFrac = 1.0 - occFrac;
            float avgBlend = (remFrac > 0.01) ? (blendSum / (4.0 * remFrac)) : 0.0;
            float effectiveCut = rectMask * clamp(uCinemaCutoutOpacity, 0.0, 1.0);
            float punch = effectiveCut * remFrac * (1.0 - avgBlend);

            if (punch > 0.001) {
              float outAlpha = 1.0 - punch;
              if (avgBlend <= 0.004) {
                vec3 cleanFgSrgb = srgb;
                if (occSum > 0.5 && occSum < 3.5) {
                  vec3 fgHdr = (fgHdrAcc / occSum + glow) * clamp(vignette, 0.52, 1.0);
                  cleanFgSrgb = pow(acesToneMap(fgHdr * 1.12), vec3(1.0 / 2.2));
                }
                outColor = vec4(cleanFgSrgb * outAlpha, outAlpha);
                return;
              } else {
                vec3 solidFgSrgb = srgb;
                if (occSum > 0.5) {
                  vec3 fgHdr = (fgHdrAcc / occSum + glow) * clamp(vignette, 0.52, 1.0);
                  solidFgSrgb = pow(acesToneMap(fgHdr * 1.12), vec3(1.0 / 2.2));
                }
                vec3 glassOverVideo = max(srgb - vec3(0.022) * (1.0 - avgBlend), vec3(0.0));
                vec3 screenContrib = glassOverVideo * effectiveCut + srgb * (1.0 - effectiveCut);
                vec3 premulRgb = clamp(solidFgSrgb * occFrac + screenContrib * remFrac, 0.0, 1.0);
                outColor = vec4(premulRgb, outAlpha);
                return;
              }
            }
          }
        }
      }
    }
  }

  outColor = vec4(srgb, 1.0);
}
`,kt={dawn_glow:{shadowSunDir:[.68,.3,-.66],skySunDir:[.78,-.015,-.625],origMix:0,skyZenith:[.032,.052,.245],sunDiskPower:0,skyHorizon:[.95,.5,.44],starIntensity:.26,sunColor:[.68,.42,.44],resortLampGlow:.9,ambient:[.072,.095,.22],biolumIntensity:.14,cloudTint:[.98,.62,.56],waterExposure:.46},sunrise:{shadowSunDir:[.72,.3,-.62],skySunDir:[.81,.078,-.58],origMix:0,skyZenith:[.038,.135,.45],sunDiskPower:.95,skyHorizon:[.99,.66,.38],starIntensity:0,sunColor:[1.28,.74,.44],resortLampGlow:.34,ambient:[.135,.195,.36],biolumIntensity:0,cloudTint:[1,.78,.52],waterExposure:.74},morning:{shadowSunDir:[.5,.54,-.67],skySunDir:[.56,.42,-.71],origMix:.55,skyZenith:[.016,.185,.56],sunDiskPower:1,skyHorizon:[.58,.91,.99],starIntensity:0,sunColor:[1.08,1.06,1.02],resortLampGlow:0,ambient:[.16,.34,.58],biolumIntensity:0,cloudTint:[.99,.99,1],waterExposure:.95},noon:{shadowSunDir:[0,.855,-.518],skySunDir:[-.398862,.598293,-.695017],origMix:1,skyZenith:[.008,.105,.41],sunDiskPower:1,skyHorizon:[.529,.876,.985],starIntensity:0,sunColor:[1.12,1.08,1.01],resortLampGlow:0,ambient:[.165,.345,.6],biolumIntensity:0,cloudTint:[1,.99,.97],waterExposure:1},late_afternoon:{shadowSunDir:[-.6,.42,-.68],skySunDir:[-.68,.27,-.68],origMix:.22,skyZenith:[.024,.145,.46],sunDiskPower:1,skyHorizon:[.97,.76,.48],starIntensity:0,sunColor:[1.26,.9,.55],resortLampGlow:.42,ambient:[.155,.245,.42],biolumIntensity:0,cloudTint:[1,.86,.62],waterExposure:.86},sunset_glow:{shadowSunDir:[-.7,.3,-.65],skySunDir:[-.79,.12,-.6],origMix:0,skyZenith:[.052,.062,.29],sunDiskPower:1,skyHorizon:[.99,.4,.2],starIntensity:.05,sunColor:[1.34,.54,.26],resortLampGlow:.92,ambient:[.125,.115,.26],biolumIntensity:.06,cloudTint:[1,.52,.28],waterExposure:.6},sundown:{shadowSunDir:[-.72,.28,-.63],skySunDir:[-.83,.025,-.557],origMix:0,skyZenith:[.016,.032,.18],sunDiskPower:.82,skyHorizon:[.88,.22,.18],starIntensity:.32,sunColor:[.76,.25,.18],resortLampGlow:1.18,ambient:[.058,.072,.185],biolumIntensity:.24,cloudTint:[.94,.32,.25],waterExposure:.35},night:{shadowSunDir:[-.34,.48,-.81],skySunDir:[-.34,.42,-.84],origMix:0,skyZenith:[.006,.016,.065],sunDiskPower:.44,skyHorizon:[.022,.052,.145],starIntensity:.92,sunColor:[.16,.24,.42],resortLampGlow:1.32,ambient:[.026,.048,.108],biolumIntensity:.72,cloudTint:[.28,.4,.62],waterExposure:.2},midnight:{shadowSunDir:[.16,.58,-.8],skySunDir:[.16,.58,-.8],origMix:0,skyZenith:[.002,.006,.032],sunDiskPower:.34,skyHorizon:[.009,.024,.078],starIntensity:1.34,sunColor:[.09,.15,.3],resortLampGlow:1.42,ambient:[.014,.028,.068],biolumIntensity:1.2,cloudTint:[.18,.28,.48],waterExposure:.12}},A0={"32k":[256,128],"48k":[256,192],"65k":[256,256]},Fi=26,Bt=2048,Ns=512,Ri=9,C0=10,Os=512,oi=33,B0=10,L0=1600,D0=1600,E0=360,lr=520,cr=8192;class R0{canvas;gl;floatInternalFormat;hdrColorInternalFormat;hdrColorType;simProg;shadowProg;mascotsShadowProg;coralShadowProg;oceanProg;coralProg;coralArchProg;coralFaunaProg;coralPropsProg;coralGroupProgs;parallelCompileCompletionEnum;pendingProgramLinks=[];totalProgramsToCompile=0;shadersCompiledReady=!1;visDynamicDrawsByGroup=[[],[],[],[]];vrmShadowProg;vrmAvatarProg;mascotsProg;fishProg;planktonProg;reachCurrentProg;bubblesProg;postProg;emptyVao;fishVao;fishBuffers;fishIndexCount;mascotVao;mascotBuffers;mascotIndexCount;mascotArrayTex;mascotsLoadedCount=0;disposed=!1;coralVao;coralBuffers;coralMeta;staticChunks=[];subMeshBounds={};viewFrustumPlanes=new Float32Array(24);shadowFrustumPlanes=new Float32Array(24);shadowCasterBox=new Float32Array(6);uniformLocCache=new WeakMap;lastSimMode=5;okinawaAsset=null;okinawaReadyListeners=[];pbrAlbedoTex;pbrNormalTex;pbrMapsLoaded=0;airSkyTex;airSkyReady=!1;okiSlotAtlasTex;okiSlotAtlasReady=!1;museumCaptionTex;museumCaptionReady=!1;identityModelMat=O();spireModelMat=O();dynamicEntities=[];vrmAvatar;vrmVisibleInScene=!1;vrmCastShadow=!1;vrmDiverPos=[0,0,0];vrmPoseStyle="swim";cinemaCutoutOpacity=0;pendingScreenshots=[];screenshotCanvas=null;screenshotThumbCanvas=null;preset="48k";simW=256;simH=192;fishCount=49152;simTargets=null;metaTex=null;starTex=null;simPingIndex=0;shadowFbo;shadowDepthTex;sceneFbo=null;sceneColorTex=null;sceneDepthTex=null;refractFbo=null;refractSceneTex=null;renderWidth=0;renderHeight=0;currentDpr=1;projMat=O();viewMat=O();viewProjMat=O();invViewProjMat=O();sunViewMat=O();sunProjMat=O();sunViewProjMat=O();sunDir=[0,.855,-.518];surfaceSunWorld=[0,5.45,-4.6];timeOfDayMode="noon";curTod={shadowSunDir:[...kt.noon.shadowSunDir],skySunDir:[...kt.noon.skySunDir],origMix:kt.noon.origMix,skyZenith:[...kt.noon.skyZenith],sunDiskPower:kt.noon.sunDiskPower,skyHorizon:[...kt.noon.skyHorizon],starIntensity:kt.noon.starIntensity,sunColor:[...kt.noon.sunColor],resortLampGlow:kt.noon.resortLampGlow,ambient:[...kt.noon.ambient],biolumIntensity:kt.noon.biolumIntensity,cloudTint:[...kt.noon.cloudTint],waterExposure:kt.noon.waterExposure};targetYaw=0;targetPitch=-.195;targetDist=11.8;curYaw=0;curPitch=-.195;curDist=11.8;camTarget=[0,.36,0];camPos=[0,-1.94,11.58];onCameraMatrixUpdated=null;pointerNdcX=0;pointerNdcY=0;pointerStrength=0;pointerEnabled=!0;elapsedTime=0;seqTime=0;playing=!0;mode=5;fishTheme=5;targetFishSizeScale=.86;curFishSizeScale=.86;reelSlotsUniform=new Float32Array(60);rowVelX=[0,0,0];reelSlotsVisible=!0;diverMode=!1;freeSwimMode=!1;showMaskOptics=!0;freeSwimPos=[-6.5,1.2,6.5];freeSwimDir=[.35,-.18,-.92];customBubbleOrigin=[0,0,0];useCustomBubbleOrigin=!1;onMouseLookDelta;onWheelZoom;flashlightOn=!1;flashlightPos=[0,0,0];flashlightDir=[0,0,-1];diverDepthM=8.5;diverPitchBias=0;maskFlood=0;maskFog=0;earPressure=0;diverBubbleOrigin=[0,-3.75,6.7];targetCoralRise=0;curCoralRise=0;coralCenterX=0;coralGlow=0;reachMode=0;reachWin=!1;reachSegA=[0,0,0,0];reachSegB=[0,0,0,0];gyogunResetPending=!1;gyogunDir=-1;gyogunInfinite=!1;bubbleMode=0;bubbleStartTime=0;solarFlashActive=!1;curSolarFlash=0;shockwaveTime=-1;godRayIntensity=1;causticIntensity=1;frameCounter=0;rafId=0;lastTimestamp=0;contextLost=!1;onWebglContextLost;onWebglContextRestored;fpsAccum=0;fpsFrames=0;currentFps=60;onTelemetry;constructor(e,i){this.canvas=e,this.onTelemetry=i;const t=e.getContext("webgl2",{alpha:!0,premultipliedAlpha:!0,antialias:!1,depth:!1,stencil:!1,powerPreference:"high-performance",failIfMajorPerformanceCaveat:!0,preserveDrawingBuffer:!1})??e.getContext("webgl2",{alpha:!0,premultipliedAlpha:!0,antialias:!1,depth:!1,stencil:!1,preserveDrawingBuffer:!1});if(!t||t.isContextLost())throw new Error("WebGL2 is required to run the GPGPU VFX Engine.");const s=t.getExtension("WEBGL_debug_renderer_info"),a=s?String(t.getParameter(s.UNMASKED_RENDERER_WEBGL)??""):"";if(/SwiftShader|Basic Render Driver/i.test(a))throw t.getExtension("WEBGL_lose_context")?.loseContext(),new Error("Hardware GPU WebGL2 temporarily unavailable (SwiftShader blocked to prevent CPU freeze).");this.gl=t,this.onWebglContextLost=m=>{m.preventDefault(),this.contextLost=!0,console.warn("[VfxEngine] WebGL2 context lost — waiting for GPU restoration...")},this.onWebglContextRestored=()=>{this.disposed||(console.info("[VfxEngine] WebGL2 context restored — reloading engine cleanly..."),window.location.reload())},this.canvas.addEventListener("webglcontextlost",this.onWebglContextLost,!1),this.canvas.addEventListener("webglcontextrestored",this.onWebglContextRestored,!1);const r=t.getExtension("EXT_color_buffer_float"),n=t.getExtension("EXT_color_buffer_half_float");t.getExtension("OES_texture_float_linear"),this.floatInternalFormat=r?t.RGBA32F:t.RGBA16F,r||n?(this.hdrColorInternalFormat=t.RGBA16F,this.hdrColorType=t.HALF_FLOAT):(this.hdrColorInternalFormat=t.RGBA8,this.hdrColorType=t.UNSIGNED_BYTE);const o=Math.hypot(this.sunDir[0],this.sunDir[1],this.sunDir[2]);this.sunDir[0]/=o,this.sunDir[1]/=o,this.sunDir[2]/=o,Va(this.sunViewMat,[this.sunDir[0]*44,this.sunDir[1]*44+3,this.sunDir[2]*44+5],[0,3,5],[0,0,-1]),Gh(this.sunProjMat,-38,38,-38,38,1,98),Ee(this.sunViewProjMat,this.sunProjMat,this.sunViewMat);const l=t.getExtension("KHR_parallel_shader_compile");this.parallelCompileCompletionEnum=l?l.COMPLETION_STATUS_KHR:null,this.simProg=this.createProgram(nr,jh),this.shadowProg=this.createProgram(Jh,e0),this.mascotsShadowProg=this.createProgram(s0,a0),this.coralShadowProg=this.createProgram(r0,l0),this.oceanProg=this.createProgram(Zh,Qh),this.coralProg=this.createProgram(Is,c0),this.coralArchProg=this.createProgram(Is,h0),this.coralFaunaProg=this.createProgram(Is,d0),this.coralPropsProg=this.createProgram(Is,u0),this.coralGroupProgs=[this.coralProg,this.coralArchProg,this.coralFaunaProg,this.coralPropsProg],this.vrmShadowProg=this.createProgram(m0,f0),this.vrmAvatarProg=this.createProgram(p0,g0),this.mascotsProg=this.createProgram(o0,n0),this.fishProg=this.createProgram(t0,i0),this.planktonProg=this.createProgram(y0,S0),this.reachCurrentProg=this.createProgram(k0,x0),this.bubblesProg=this.createProgram(T0,M0),this.postProg=this.createProgram(nr,P0),this.totalProgramsToCompile=this.pendingProgramLinks.length;const h=t.createVertexArray();if(!h)throw new Error("Failed to allocate VAO.");this.emptyVao=h;const c=Yh();this.fishIndexCount=c.indices.length;const u=this.createVec3Attr3Vao(c.positions,c.normals,c.bodyCoords,c.indices);this.fishVao=u.vao,this.fishBuffers=u.buffers;const g=qh();this.mascotIndexCount=g.indices.length;const p=this.createMascotVao(g.positions,g.uvs,g.indices);this.mascotVao=p.vao,this.mascotBuffers=p.buffers,this.mascotArrayTex=this.createAndLoadMascotTextureArray();const x=Uh();this.coralMeta={staticIndexOffset:x.staticIndexOffset,staticIndexCount:x.staticIndexCount,risingIndexOffset:x.risingIndexOffset,risingIndexCount:x.risingIndexCount};const S=this.createVec4Attr3Uint32Vao(x.positions,x.normals,x.attribs,x.indices);this.coralVao=S.vao,this.coralBuffers=S.buffers;const T=this.createAndLoadPbrTextureArrays();this.pbrAlbedoTex=T.albedoTex,this.pbrNormalTex=T.normalTex,this.airSkyTex=this.createAndLoadAirSkyPanorama(),this.okiSlotAtlasTex=this.createAndLoadOkiSlotAtlas(),this.museumCaptionTex=this.createAndLoadMuseumCaptionTex(),this.loadBlenderOkinawaWorld(),this.vrmAvatar=new w0(t),this.vrmAvatar.loadFromUrl("./assets/vrm/avatar.vrm?v=charakuru_111_20261121_1736").catch(m=>{console.warn("VRM initial load warning:",m)});const k=this.createShadowFramebuffer(Bt);this.shadowFbo=k.fbo,this.shadowDepthTex=k.depthTex,this.initSimulationBuffers(this.preset),this.resize(),this.bindInputEvents()}start(){if(this.rafId!==0||this.disposed)return;this.lastTimestamp=performance.now();const e=i=>{if(!this.disposed){if(this.rafId=requestAnimationFrame(e),this.contextLost||document.hidden){this.lastTimestamp=i;return}this.renderFrame(i)}};this.rafId=requestAnimationFrame(e)}dispose(e=!0){if(this.disposed)return;this.disposed=!0,this.canvas.removeEventListener("webglcontextlost",this.onWebglContextLost,!1),this.canvas.removeEventListener("webglcontextrestored",this.onWebglContextRestored,!1),this.rafId!==0&&(cancelAnimationFrame(this.rafId),this.rafId=0);const i=this.gl;if(!i.isContextLost()){this.destroySimBuffers(),this.sceneFbo&&i.deleteFramebuffer(this.sceneFbo),this.sceneColorTex&&i.deleteTexture(this.sceneColorTex),this.sceneDepthTex&&i.deleteTexture(this.sceneDepthTex),this.refractFbo&&i.deleteFramebuffer(this.refractFbo),this.refractSceneTex&&i.deleteTexture(this.refractSceneTex),i.deleteFramebuffer(this.shadowFbo),i.deleteTexture(this.shadowDepthTex),i.deleteTexture(this.mascotArrayTex),i.deleteTexture(this.pbrAlbedoTex),i.deleteTexture(this.pbrNormalTex),i.deleteTexture(this.airSkyTex),i.deleteTexture(this.okiSlotAtlasTex),i.deleteTexture(this.museumCaptionTex),this.vrmAvatar.dispose(),i.deleteProgram(this.vrmShadowProg),i.deleteProgram(this.vrmAvatarProg);for(const t of this.fishBuffers)i.deleteBuffer(t);for(const t of this.mascotBuffers)i.deleteBuffer(t);for(const t of this.coralBuffers)i.deleteBuffer(t);i.deleteVertexArray(this.fishVao),i.deleteVertexArray(this.mascotVao),i.deleteVertexArray(this.coralVao),i.deleteVertexArray(this.emptyVao);for(const t of this.pendingProgramLinks)i.deleteShader(t.vs),i.deleteShader(t.fs);this.pendingProgramLinks.length=0,i.deleteProgram(this.simProg),i.deleteProgram(this.shadowProg),i.deleteProgram(this.mascotsShadowProg),i.deleteProgram(this.coralShadowProg),i.deleteProgram(this.oceanProg),i.deleteProgram(this.coralProg),i.deleteProgram(this.coralArchProg),i.deleteProgram(this.coralFaunaProg),i.deleteProgram(this.coralPropsProg),i.deleteProgram(this.mascotsProg),i.deleteProgram(this.fishProg),i.deleteProgram(this.planktonProg),i.deleteProgram(this.reachCurrentProg),i.deleteProgram(this.bubblesProg),i.deleteProgram(this.postProg),e&&i.getExtension("WEBGL_lose_context")?.loseContext()}}setReelSlotsState(e,i,t=!1){this.reelSlotsUniform.set(e),this.rowVelX[0]=i[0],this.rowVelX[1]=i[1],this.rowVelX[2]=i[2]}setCoralReefSpire(e,i=0,t=0){this.targetCoralRise=e?1:0,e&&(this.coralCenterX=i),this.coralGlow=t}setReachCurrent(e,i,t=[0,0,0,0],s=[0,0,0,0]){this.reachMode=e,this.reachWin=i,this.reachSegA=t,this.reachSegB=s}triggerPushShockwave(){this.shockwaveTime=.001}setSolarPearlFlash(e){this.solarFlashActive=e}enterPachinkoCruiseMode(e=!1){this.mode=5,this.fishTheme=5,this.targetFishSizeScale=.86,this.gyogunInfinite=!1,this.bubbleMode=0}triggerBubblePreview(e){this.bubbleMode=e,this.bubbleStartTime=this.elapsedTime}stopBubbles(){this.bubbleMode=0}triggerGyogunPreview(e){this.mode=6,this.fishTheme=e.theme,this.gyogunDir=e.reverse?1:-1,this.gyogunInfinite=!!e.infinite,this.targetFishSizeScale=1.42,this.curFishSizeScale=1.42,this.gyogunResetPending=!0}triggerJackpotFever(e){this.mode=7,this.fishTheme=e?4:1,this.targetFishSizeScale=1.12,this.gyogunInfinite=!1}setReelSlotsVisible(e){this.reelSlotsVisible=e}setDiverMode(e){this.diverMode=e,this.cinemaCutoutOpacity=0,this.reelSlotsVisible=!e,this.targetCoralRise=0,this.reachMode=0,this.solarFlashActive=!1,this.bubbleMode=0,e?(this.mode=5,this.fishTheme=5,this.targetFishSizeScale=.92,this.targetYaw=0,this.targetPitch=-.195):(this.maskFlood=0,this.diverPitchBias=0,this.earPressure=0,this.resetCamera())}setDiverState(e,i,t,s){this.diverDepthM=e,this.maskFlood=Math.max(0,Math.min(1,i)),this.diverPitchBias=t,this.earPressure=Math.max(0,Math.min(1,s))}getDiverLookPitch(){return(this.curPitch+.195)*.85+.04+this.diverPitchBias}setDiverExhaustBubbles(e,i=!1){if(e===0){this.bubbleMode===4&&(this.bubbleMode=0);return}(i||this.bubbleMode!==e)&&(this.bubbleStartTime=this.elapsedTime),this.bubbleMode=e}triggerPadiMasterySchool(){this.mode=7,this.fishTheme=3,this.targetFishSizeScale=1.05}getCanvas(){return this.canvas}getOkinawaWorld(){return this.okinawaAsset}areShadersReady(){return this.shadersCompiledReady}getLoadingStatus(){const e=oi*2,i=Math.min(1,this.pbrMapsLoaded/e),t=this.totalProgramsToCompile-this.pendingProgramLinks.length,s=this.totalProgramsToCompile>0?Math.min(1,t/this.totalProgramsToCompile):1,a=this.okinawaAsset!==null,r=this.vrmAvatar.isLoaded(),n=this.airSkyReady,o=this.okiSlotAtlasReady,l=s*.22+(a?.3:0)+i*.3+(n?.08:0)+(o?.04:0)+(r?.06:0),h=Math.max(.05,Math.min(1,l));let c=`WebGL2 シェーダーを並列コンパイル中… (${t}/${this.totalProgramsToCompile})`;this.shadersCompiledReady?a?this.pbrMapsLoaded<e?c=`高精細PBRマテリアルを展開中… (${this.pbrMapsLoaded}/${e})`:n?r?c="準備完了！リゾートへ移動中…":c="3D VRMアバターを準備中…":c="8K夏空パノラマ＆空間ライティングを構築中…":c="3D沖縄リーフ＆ZEN大学校舎ジオメトリを読み込み中…":c=`WebGL2 シェーダーを並列コンパイル中… (${t}/${this.totalProgramsToCompile})`;const u=this.shadersCompiledReady&&a&&this.pbrMapsLoaded>=e&&n&&r;return{progress:h,stageText:c,ready:u}}onOkinawaWorldReady(e){this.okinawaAsset?e(this.okinawaAsset):this.okinawaReadyListeners.push(e)}setFreeSwimMode(e,i,t){this.freeSwimMode=e,this.diverMode=e,e||(this.cinemaCutoutOpacity=0),this.showMaskOptics=e,this.reelSlotsVisible=!e,this.onMouseLookDelta=e?i:void 0,this.onWheelZoom=e?t:void 0,this.targetCoralRise=0,this.reachMode=0,this.solarFlashActive=!1,this.bubbleMode=0,this.maskFlood=0,this.maskFog=0,this.earPressure=0,e?(this.mode=5,this.fishTheme=5,this.targetFishSizeScale=1.02):(this.flashlightOn=!1,this.dynamicEntities=[],this.vrmVisibleInScene=!1,this.vrmCastShadow=!1,this.useCustomBubbleOrigin=!1)}setFreeSwimPose(e,i,t,s=!0){this.freeSwimPos[0]=e[0],this.freeSwimPos[1]=e[1],this.freeSwimPos[2]=e[2],this.freeSwimDir[0]=i[0],this.freeSwimDir[1]=i[1],this.freeSwimDir[2]=i[2],this.showMaskOptics=s,t?(this.useCustomBubbleOrigin=!0,this.customBubbleOrigin[0]=t[0],this.customBubbleOrigin[1]=t[1],this.customBubbleOrigin[2]=t[2]):this.useCustomBubbleOrigin=!1}getVrmAvatar(){return this.vrmAvatar}async loadCustomVrmFile(e){const i=await e.arrayBuffer();return await this.vrmAvatar.loadFromArrayBuffer(i),this.vrmAvatar.getAvatarName()||e.name}updateVrmDiverState(e,i,t,s,a,r,n=0,o="swim",l=0){this.vrmVisibleInScene=e,this.vrmCastShadow=i,this.vrmDiverPos[0]=t[0],this.vrmDiverPos[1]=t[1],this.vrmDiverPos[2]=t[2],this.vrmPoseStyle=o,this.vrmAvatar.setSuitMode(l),(e||i)&&this.vrmAvatar.updateSwimmingPose(t,s,a,r,this.elapsedTime,n,o)}setDiveFlashlight(e,i,t){this.flashlightOn=e,this.flashlightPos[0]=i[0],this.flashlightPos[1]=i[1],this.flashlightPos[2]=i[2],this.flashlightDir[0]=t[0],this.flashlightDir[1]=t[1],this.flashlightDir[2]=t[2]}setDynamicWorldEntities(e){this.dynamicEntities=e}projectWorldToScreen(e){return ir(this.viewProjMat,e)}setOkinawaOptics(e,i,t){this.maskFlood=Math.max(0,Math.min(1,e)),this.maskFog=Math.max(0,Math.min(1,i)),this.earPressure=Math.max(0,Math.min(1,t))}screenToWorldRay(e,i,t,s){const a=this.canvas.getBoundingClientRect();if(a.width<=1||a.height<=1)return!1;const r=(e-a.left)/a.width*2-1,n=1-(i-a.top)/a.height*2,o=Bi(this.invViewProjMat,r,n,-1),l=Bi(this.invViewProjMat,r,n,1),h=l[0]-o[0],c=l[1]-o[1],u=l[2]-o[2],g=Math.hypot(h,c,u);return g<1e-6?!1:(t[0]=o[0],t[1]=o[1],t[2]=o[2],s[0]=h/g,s[1]=c/g,s[2]=u/g,!0)}setPlaying(e){this.playing=e}togglePlaying(){return this.playing=!this.playing,this.playing}setSequenceTime(e,i=!0){const t=(e%Fi+Fi)%Fi,s=Math.abs(t-this.seqTime);if(this.seqTime=t,i&&s>1.1)for(let a=0;a<90;a++)this.stepSimulation(.035)}setFormationMode(e){this.mode=e,e<=4?(this.fishTheme=0,this.targetFishSizeScale=1,this.bubbleMode=0,this.reachMode=0,this.solarFlashActive=!1,this.targetCoralRise=0):e===5&&(this.fishTheme=5,this.targetFishSizeScale=.86)}setFishPreset(e){if(e!==this.preset){this.preset=e,this.initSimulationBuffers(e);for(let i=0;i<8;i++)this.stepSimulation(.025)}}setGodRayIntensity(e){this.godRayIntensity=Math.max(0,Math.min(2.2,e))}setCausticIntensity(e){this.causticIntensity=Math.max(0,Math.min(2.2,e))}setPointerCurrentEnabled(e){this.pointerEnabled=e,e||(this.pointerStrength=0)}resetCamera(){this.targetYaw=0,this.targetPitch=-.195,this.targetDist=11.8}resize(){const e=Math.min(window.devicePixelRatio||1,2),i=Math.max(2,Math.floor(this.canvas.clientWidth*e)),t=Math.max(2,Math.floor(this.canvas.clientHeight*e));i===this.renderWidth&&t===this.renderHeight&&e===this.currentDpr||(this.renderWidth=i,this.renderHeight=t,this.currentDpr=e,this.canvas.width=i,this.canvas.height=t,this.recreateSceneFramebuffer(i,t))}getActiveDrawnFishCount(){return this.mode===5?Math.min(lr,this.fishCount):this.mode===7?Math.min(cr,this.fishCount):this.fishCount}computeBubbleUpdraft(){if(this.bubbleMode<=0)return 0;const e=this.elapsedTime-this.bubbleStartTime;return this.bubbleMode===3||e>=0&&e<3.4?this.bubbleMode>=2?1:.45:0}pollAsyncShaderCompilation(){if(this.shadersCompiledReady)return!0;const e=this.gl;if(e.isContextLost())return!1;const i=this.parallelCompileCompletionEnum;let t=0;for(let s=this.pendingProgramLinks.length-1;s>=0;s--){const a=this.pendingProgramLinks[s];if(i!==null){if(!e.getProgramParameter(a.prog,i))continue}else{if(t>=1)break;t++}if(!e.getProgramParameter(a.prog,e.LINK_STATUS)){const n=e.getShaderInfoLog(a.vs)??"",o=e.getShaderInfoLog(a.fs)??"",l=e.getProgramInfoLog(a.prog)??"";console.error("[VfxEngine] Async shader link failed:",{vsLog:n,fsLog:o,pLog:l})}e.deleteShader(a.vs),e.deleteShader(a.fs),this.pendingProgramLinks.splice(s,1)}return this.pendingProgramLinks.length===0?(this.shadersCompiledReady=!0,!0):!1}renderFrame(e){if(this.resize(),!this.pollAsyncShaderCompilation()){this.lastTimestamp=e;return}const i=Math.max(.001,(e-this.lastTimestamp)*.001);this.lastTimestamp=e;const t=Math.min(i,.04);this.fpsAccum+=i,this.fpsFrames++,this.fpsAccum>=.35&&(this.currentFps=Math.round(this.fpsFrames/this.fpsAccum),this.fpsAccum=0,this.fpsFrames=0),this.elapsedTime+=t,this.playing&&this.mode===0&&(this.seqTime=(this.seqTime+t)%Fi),this.shockwaveTime>=0&&(this.shockwaveTime+=t,this.shockwaveTime>1.5&&(this.shockwaveTime=-1));const s=this.solarFlashActive?.72+.28*Math.sin(this.elapsedTime*14):0;this.curSolarFlash+=(s-this.curSolarFlash)*(1-Math.exp(-10*t));const a=this.targetCoralRise>this.curCoralRise?2.6:3.6;this.curCoralRise+=(this.targetCoralRise-this.curCoralRise)*(1-Math.exp(-a*t));const r=1-Math.exp(-8.5*t);this.curYaw+=(this.targetYaw-this.curYaw)*r,this.curPitch+=(this.targetPitch-this.curPitch)*r,this.curDist+=(this.targetDist-this.curDist)*r,this.curFishSizeScale+=(this.targetFishSizeScale-this.curFishSizeScale)*r;const n=Math.sin(this.elapsedTime*.38)*.05,o=Math.cos(this.elapsedTime*.47)*.035;let l=0;if(this.freeSwimMode){this.camPos[0]=this.freeSwimPos[0]+n*.45,this.camPos[1]=this.freeSwimPos[1]+o*.45,this.camPos[2]=this.freeSwimPos[2];const y=this.freeSwimDir[0],M=this.freeSwimDir[1],P=this.freeSwimDir[2];l=Math.asin(Math.max(-.98,Math.min(.98,M))),this.camTarget[0]=this.camPos[0]+y*10,this.camTarget[1]=this.camPos[1]+M*10,this.camTarget[2]=this.camPos[2]+P*10,this.useCustomBubbleOrigin?(this.diverBubbleOrigin[0]=this.customBubbleOrigin[0],this.diverBubbleOrigin[1]=this.customBubbleOrigin[1],this.diverBubbleOrigin[2]=this.customBubbleOrigin[2]):(this.diverBubbleOrigin[0]=this.camPos[0]+y*1.05,this.diverBubbleOrigin[1]=this.camPos[1]-.36+M*.35,this.diverBubbleOrigin[2]=this.camPos[2]+P*1.05)}else if(this.diverMode){const y=5.05-Math.max(0,Math.min(8.6,this.diverDepthM)),M=this.curYaw*.75;l=Math.max(-.48,Math.min(.62,(this.curPitch+.195)*.85+.04+this.diverPitchBias)),this.camPos[0]=n*1.3,this.camPos[1]=y+o*1.2,this.camPos[2]=7.4;const P=Math.cos(l),U=-Math.sin(M)*P,L=Math.sin(l),E=-Math.cos(M)*P;this.camTarget[0]=this.camPos[0]+U*8,this.camTarget[1]=this.camPos[1]+L*8,this.camTarget[2]=this.camPos[2]+E*8,this.diverBubbleOrigin[0]=this.camPos[0]+U*.62,this.diverBubbleOrigin[1]=this.camPos[1]-.3+L*.25,this.diverBubbleOrigin[2]=this.camPos[2]+E*.62}else{this.camTarget[0]=0,this.camTarget[1]=.36,this.camTarget[2]=0;const y=Math.cos(this.curPitch);this.camPos[0]=this.camTarget[0]+Math.sin(this.curYaw)*y*this.curDist+n,this.camPos[1]=this.camTarget[1]+Math.sin(this.curPitch)*this.curDist+o,this.camPos[2]=this.camTarget[2]+Math.cos(this.curYaw)*y*this.curDist}const h=this.renderWidth/Math.max(1,this.renderHeight);Nh(this.projMat,46*Math.PI/180,h,.25,190),Va(this.viewMat,this.camPos,this.camTarget,[0,1,0]),Ee(this.viewProjMat,this.projMat,this.viewMat),Oh(this.invViewProjMat,this.viewProjMat),this.onCameraMatrixUpdated?.(),this.pointerStrength*=Math.exp(-2.6*t),this.stepTimeOfDay(t),this.updateCullingVolumes();const c=this.camPos[1],u=this.camPos[2],g=c>5.75&&u>24.5,p=this.mode!==this.lastSimMode;this.lastSimMode=this.mode,this.mode===5&&g&&!p&&!this.gyogunResetPending||this.stepSimulation(t,p);const S=this.simTargets[this.simPingIndex],T=this.getActiveDrawnFishCount(),k=this.computeBubbleUpdraft(),m=this.gl,A=T>0&&(this.mode!==5||this.isAabbVisibleInShadow(-8.8,-5,-9.2,8.8,1.2,-.5,!0)),D=T>0&&(this.mode!==5||this.isAabbVisibleInScene(-8.8,-5,-9.2,8.8,1.2,-.5,!0));if(m.bindFramebuffer(m.FRAMEBUFFER,this.shadowFbo),m.viewport(0,0,Bt,Bt),m.enable(m.DEPTH_TEST),m.depthFunc(m.LESS),m.depthMask(!0),m.clear(m.DEPTH_BUFFER_BIT),this.mode>=5&&(this.drawCoralReefPass(!0),this.vrmCastShadow&&this.vrmAvatar.isLoaded()&&(m.useProgram(this.vrmShadowProg),m.uniformMatrix4fv(this.uLoc(this.vrmShadowProg,"uSunViewProj"),!1,this.sunViewProjMat),this.vrmAvatar.drawShadowPass(this.vrmShadowProg)),this.reelSlotsVisible&&this.mascotsLoadedCount===Ri&&this.drawMascotsShadowPass(k)),A&&(m.useProgram(this.shadowProg),this.bindTextureUnit(S.posTex,0,this.shadowProg,"uPosTex"),this.bindTextureUnit(S.velTex,1,this.shadowProg,"uVelTex"),this.bindTextureUnit(this.metaTex,2,this.shadowProg,"uMetaTex"),m.uniform2i(this.uLoc(this.shadowProg,"uSimRes"),this.simW,this.simH),m.uniformMatrix4fv(this.uLoc(this.shadowProg,"uSunViewProj"),!1,this.sunViewProjMat),m.uniform1f(this.uLoc(this.shadowProg,"uFishSizeScale"),this.curFishSizeScale),m.bindVertexArray(this.fishVao),m.drawElementsInstanced(m.TRIANGLES,this.fishIndexCount,m.UNSIGNED_SHORT,0,T)),m.bindFramebuffer(m.FRAMEBUFFER,this.sceneFbo),m.viewport(0,0,this.renderWidth,this.renderHeight),m.colorMask(!0,!0,!0,!0),m.clearColor(0,0,0,0),m.depthMask(!0),m.clear(m.COLOR_BUFFER_BIT|m.DEPTH_BUFFER_BIT),m.colorMask(!0,!0,!0,!1),m.enable(m.DEPTH_TEST),m.depthFunc(m.LESS),m.depthMask(!0),this.mode>=5){this.drawCoralReefPass(!1);const y=this.vrmVisibleInScene&&this.vrmAvatar.isLoaded()?this.computeVrmCameraProximityFade():0;y>.015&&this.drawVrmScenePass(!1,y),this.reelSlotsVisible&&this.mascotsLoadedCount===Ri&&this.drawMascotsScenePass(0,k)}if(D){const y=this.pbrMapsLoaded===oi*2?1:0;m.useProgram(this.fishProg),this.bindTextureUnit(S.posTex,0,this.fishProg,"uPosTex"),this.bindTextureUnit(S.velTex,1,this.fishProg,"uVelTex"),this.bindTextureUnit(this.metaTex,2,this.fishProg,"uMetaTex"),this.bindTextureUnit(this.shadowDepthTex,3,this.fishProg,"uSunShadowTex"),this.bindTextureArrayUnit(this.pbrAlbedoTex,4,this.fishProg,"uPbrAlbedoTex"),this.bindTextureArrayUnit(this.pbrNormalTex,5,this.fishProg,"uPbrNormalTex"),m.uniform1i(this.uLoc(this.fishProg,"uPbrReady"),y),m.uniform2i(this.uLoc(this.fishProg,"uSimRes"),this.simW,this.simH),m.uniformMatrix4fv(this.uLoc(this.fishProg,"uViewProj"),!1,this.viewProjMat),m.uniformMatrix4fv(this.uLoc(this.fishProg,"uSunViewProj"),!1,this.sunViewProjMat),m.uniform3fv(this.uLoc(this.fishProg,"uCamPos"),this.camPos),m.uniform3fv(this.uLoc(this.fishProg,"uSunDir"),this.sunDir),m.uniform1f(this.uLoc(this.fishProg,"uTime"),this.elapsedTime),m.uniform1f(this.uLoc(this.fishProg,"uFishSizeScale"),this.curFishSizeScale),m.uniform1i(this.uLoc(this.fishProg,"uFishTheme"),this.fishTheme),m.uniform2f(this.uLoc(this.fishProg,"uShadowTexelSize"),1/Bt,1/Bt),this.bindTimeOfDayUniforms(this.fishProg),m.bindVertexArray(this.fishVao),m.drawElementsInstanced(m.TRIANGLES,this.fishIndexCount,m.UNSIGNED_SHORT,0,T),m.activeTexture(m.TEXTURE4),m.bindTexture(m.TEXTURE_2D_ARRAY,null),m.activeTexture(m.TEXTURE5),m.bindTexture(m.TEXTURE_2D_ARRAY,null)}if(m.depthFunc(m.LEQUAL),m.depthMask(!1),m.useProgram(this.oceanProg),this.bindTextureUnit(this.shadowDepthTex,0,this.oceanProg,"uSunShadowTex"),this.bindTextureUnit(this.airSkyTex,1,this.oceanProg,"uAirSkyTex"),m.uniform1i(this.uLoc(this.oceanProg,"uAirSkyReady"),this.airSkyReady?1:0),m.uniformMatrix4fv(this.uLoc(this.oceanProg,"uInvViewProj"),!1,this.invViewProjMat),m.uniformMatrix4fv(this.uLoc(this.oceanProg,"uSunViewProj"),!1,this.sunViewProjMat),m.uniform2f(this.uLoc(this.oceanProg,"uShadowTexelSize"),1/Bt,1/Bt),m.uniform3fv(this.uLoc(this.oceanProg,"uCamPos"),this.camPos),m.uniform3fv(this.uLoc(this.oceanProg,"uSunDir"),this.sunDir),m.uniform1f(this.uLoc(this.oceanProg,"uTime"),this.elapsedTime),m.uniform1f(this.uLoc(this.oceanProg,"uSolarFlash"),this.curSolarFlash),this.bindTimeOfDayUniforms(this.oceanProg),m.bindVertexArray(this.emptyVao),m.drawArrays(m.TRIANGLES,0,3),m.activeTexture(m.TEXTURE1),m.bindTexture(m.TEXTURE_2D,null),m.depthFunc(m.LESS),m.depthMask(!1),m.enable(m.BLEND),this.mode>=5){m.colorMask(!0,!0,!0,!0),m.blendFuncSeparate(m.SRC_ALPHA,m.ONE_MINUS_SRC_ALPHA,m.ONE,m.ONE_MINUS_SRC_ALPHA);const y=this.vrmVisibleInScene&&this.vrmAvatar.isLoaded()?this.computeVrmCameraProximityFade():0;y>.015&&this.drawVrmScenePass(!0,y),this.drawCoralReefPass(!1,!0),m.colorMask(!0,!0,!0,!1)}if(this.mode>=5&&this.reelSlotsVisible&&this.mascotsLoadedCount===Ri&&(m.blendFunc(m.ONE,m.ONE_MINUS_SRC_ALPHA),this.drawMascotsScenePass(1,k)),m.blendFunc(m.ONE,m.ONE),g||(m.useProgram(this.planktonProg),m.uniformMatrix4fv(this.uLoc(this.planktonProg,"uViewProj"),!1,this.viewProjMat),m.uniform3fv(this.uLoc(this.planktonProg,"uCamPos"),this.camPos),m.uniform1f(this.uLoc(this.planktonProg,"uTime"),this.elapsedTime),m.uniform1f(this.uLoc(this.planktonProg,"uDpr"),this.currentDpr),m.uniform1f(this.uLoc(this.planktonProg,"uBiolum"),this.curTod.biolumIntensity),m.bindVertexArray(this.emptyVao),m.drawArrays(m.POINTS,0,L0)),this.reachMode>0&&this.mode>=5&&(m.useProgram(this.reachCurrentProg),m.uniformMatrix4fv(this.uLoc(this.reachCurrentProg,"uViewProj"),!1,this.viewProjMat),m.uniform3fv(this.uLoc(this.reachCurrentProg,"uCamPos"),this.camPos),m.uniform1f(this.uLoc(this.reachCurrentProg,"uTime"),this.elapsedTime),m.uniform1f(this.uLoc(this.reachCurrentProg,"uDpr"),this.currentDpr),m.uniform1i(this.uLoc(this.reachCurrentProg,"uReachMode"),this.reachMode),m.uniform1i(this.uLoc(this.reachCurrentProg,"uReachWin"),this.reachWin?1:0),m.uniform4fv(this.uLoc(this.reachCurrentProg,"uReachSegA"),this.reachSegA),m.uniform4fv(this.uLoc(this.reachCurrentProg,"uReachSegB"),this.reachSegB),m.bindVertexArray(this.emptyVao),m.drawArrays(m.POINTS,0,D0)),this.bubbleMode>0&&this.refractFbo&&this.refractSceneTex){const y=Math.max(0,this.elapsedTime-this.bubbleStartTime),M=this.bubbleMode===5?2.4:4.2;(this.bubbleMode===3||this.bubbleMode===4||y<M)&&(m.bindFramebuffer(m.READ_FRAMEBUFFER,this.sceneFbo),m.bindFramebuffer(m.DRAW_FRAMEBUFFER,this.refractFbo),m.blitFramebuffer(0,0,this.renderWidth,this.renderHeight,0,0,this.renderWidth,this.renderHeight,m.COLOR_BUFFER_BIT,m.NEAREST),m.bindFramebuffer(m.FRAMEBUFFER,this.sceneFbo),m.blendFunc(m.SRC_ALPHA,m.ONE_MINUS_SRC_ALPHA),m.useProgram(this.bubblesProg),this.bindTextureUnit(this.refractSceneTex,0,this.bubblesProg,"uRefractSceneTex"),m.uniformMatrix4fv(this.uLoc(this.bubblesProg,"uViewProj"),!1,this.viewProjMat),m.uniform3fv(this.uLoc(this.bubblesProg,"uCamPos"),this.camPos),m.uniform1f(this.uLoc(this.bubblesProg,"uTime"),this.elapsedTime),m.uniform1f(this.uLoc(this.bubblesProg,"uBubbleTime"),y),m.uniform1i(this.uLoc(this.bubblesProg,"uBubbleMode"),this.bubbleMode),m.uniform3fv(this.uLoc(this.bubblesProg,"uDiverBubbleOrigin"),this.diverBubbleOrigin),m.uniform2f(this.uLoc(this.bubblesProg,"uInvResolution"),1/this.renderWidth,1/this.renderHeight),m.bindVertexArray(this.emptyVao),m.drawArraysInstanced(m.TRIANGLES,0,6,E0))}m.disable(m.BLEND),m.colorMask(!0,!0,!0,!0),m.depthMask(!0),m.bindFramebuffer(m.FRAMEBUFFER,null),m.viewport(0,0,this.renderWidth,this.renderHeight),m.disable(m.DEPTH_TEST);const I=ir(this.viewProjMat,this.surfaceSunWorld),W=this.mode>=6?this.godRayIntensity*1.18:this.godRayIntensity;m.useProgram(this.postProg),this.bindTextureUnit(this.sceneColorTex,0,this.postProg,"uSceneColorTex"),this.bindTextureUnit(this.sceneDepthTex,1,this.postProg,"uSceneDepthTex"),this.bindTextureUnit(this.shadowDepthTex,2,this.postProg,"uSunShadowTex"),m.uniformMatrix4fv(this.uLoc(this.postProg,"uInvViewProj"),!1,this.invViewProjMat),m.uniformMatrix4fv(this.uLoc(this.postProg,"uSunViewProj"),!1,this.sunViewProjMat),m.uniform3fv(this.uLoc(this.postProg,"uCamPos"),this.camPos),m.uniform3fv(this.uLoc(this.postProg,"uSunDir"),this.sunDir),m.uniform3f(this.uLoc(this.postProg,"uSunScreen"),I[0],I[1],I[2]),m.uniform2f(this.uLoc(this.postProg,"uTexelSize"),1/this.renderWidth,1/this.renderHeight),m.uniform1f(this.uLoc(this.postProg,"uTime"),this.elapsedTime),m.uniform1f(this.uLoc(this.postProg,"uGodRayIntensity"),W),m.uniform1f(this.uLoc(this.postProg,"uCausticIntensity"),this.causticIntensity),m.uniform1f(this.uLoc(this.postProg,"uSolarFlash"),this.curSolarFlash),m.uniform1f(this.uLoc(this.postProg,"uShockwave"),this.shockwaveTime),m.uniform1i(this.uLoc(this.postProg,"uDiveMode"),this.diverMode&&(!this.freeSwimMode||this.showMaskOptics)?1:0);const w=this.pendingScreenshots.length>0;m.uniform2f(this.uLoc(this.postProg,"uMaskState"),this.maskFlood,l),m.uniform1f(this.uLoc(this.postProg,"uEarPressure"),this.earPressure),m.uniform1f(this.uLoc(this.postProg,"uMaskFog"),this.maskFog),m.uniform1f(this.uLoc(this.postProg,"uCinemaCutoutOpacity"),!w&&this.freeSwimMode&&this.mode>=5?this.cinemaCutoutOpacity:0),this.bindTimeOfDayUniforms(this.postProg),m.bindVertexArray(this.emptyVao),m.drawArrays(m.TRIANGLES,0,3),m.activeTexture(m.TEXTURE1),m.bindTexture(m.TEXTURE_2D,null),this.unbindTextures(4),w&&this.flushPendingScreenshots(),this.emitTelemetry()}captureScreenshot(e){return this.disposed?Promise.resolve(null):new Promise(i=>{let t=!1;const s={resolve:a=>{t||(t=!0,i(a))},onPreview:e};this.pendingScreenshots.push(s),window.setTimeout(()=>{!t&&this.pendingScreenshots.includes(s)&&this.renderFrame(performance.now())},240)})}flushPendingScreenshots(){const e=this.pendingScreenshots.splice(0,this.pendingScreenshots.length);if(e.length===0)return;const i=this.canvas.width,t=this.canvas.height;if(i<=0||t<=0){e.forEach(r=>r.resolve(null));return}this.screenshotCanvas||(this.screenshotCanvas=document.createElement("canvas"));const s=this.screenshotCanvas;s.width!==i&&(s.width=i),s.height!==t&&(s.height=t);const a=s.getContext("2d");if(!a){e.forEach(r=>r.resolve(null));return}if(a.fillStyle="#020c16",a.fillRect(0,0,i,t),a.drawImage(this.canvas,0,0,i,t),e.some(r=>r.onPreview)){this.screenshotThumbCanvas||(this.screenshotThumbCanvas=document.createElement("canvas"));const r=200,n=Math.max(80,Math.round(r*t/i));this.screenshotThumbCanvas.width=r,this.screenshotThumbCanvas.height=n;const o=this.screenshotThumbCanvas.getContext("2d");if(o){o.drawImage(s,0,0,r,n);const l=this.screenshotThumbCanvas.toDataURL("image/jpeg",.88);e.forEach(h=>h.onPreview?.(l,i,t))}}s.toBlob(r=>{if(r){const n={blob:r,width:i,height:t};e.forEach(o=>o.resolve(n));return}try{const n=s.toDataURL("image/png"),o=atob(n.split(",")[1]??""),l=new Uint8Array(o.length);for(let u=0;u<o.length;u++)l[u]=o.charCodeAt(u);const c={blob:new Blob([l],{type:"image/png"}),width:i,height:t};e.forEach(u=>u.resolve(c))}catch{e.forEach(n=>n.resolve(null))}},"image/png")}setTimeOfDay(e,i=!1){if(this.timeOfDayMode=e,i){const t=kt[e];this.curTod.shadowSunDir=[...t.shadowSunDir],this.curTod.skySunDir=[...t.skySunDir],this.curTod.origMix=t.origMix,this.curTod.skyZenith=[...t.skyZenith],this.curTod.sunDiskPower=t.sunDiskPower,this.curTod.skyHorizon=[...t.skyHorizon],this.curTod.starIntensity=t.starIntensity,this.curTod.sunColor=[...t.sunColor],this.curTod.resortLampGlow=t.resortLampGlow,this.curTod.ambient=[...t.ambient],this.curTod.biolumIntensity=t.biolumIntensity,this.curTod.cloudTint=[...t.cloudTint],this.curTod.waterExposure=t.waterExposure,this.stepTimeOfDay(1)}}getTimeOfDay(){return this.timeOfDayMode}stepTimeOfDay(e){const i=kt[this.timeOfDayMode],t=1-Math.exp(-Math.max(0,e)*2.8),s=(g,p)=>g+(p-g)*t,a=(g,p)=>{g[0]=s(g[0],p[0]),g[1]=s(g[1],p[1]),g[2]=s(g[2],p[2])};a(this.curTod.shadowSunDir,i.shadowSunDir),a(this.curTod.skySunDir,i.skySunDir),this.curTod.origMix=s(this.curTod.origMix,i.origMix),a(this.curTod.skyZenith,i.skyZenith),this.curTod.sunDiskPower=s(this.curTod.sunDiskPower,i.sunDiskPower),a(this.curTod.skyHorizon,i.skyHorizon),this.curTod.starIntensity=s(this.curTod.starIntensity,i.starIntensity),a(this.curTod.sunColor,i.sunColor),this.curTod.resortLampGlow=s(this.curTod.resortLampGlow,i.resortLampGlow),a(this.curTod.ambient,i.ambient),this.curTod.biolumIntensity=s(this.curTod.biolumIntensity,i.biolumIntensity),a(this.curTod.cloudTint,i.cloudTint),this.curTod.waterExposure=s(this.curTod.waterExposure,i.waterExposure);const r=this.curTod.shadowSunDir[0],n=Math.max(.26,this.curTod.shadowSunDir[1]),o=this.curTod.shadowSunDir[2],l=Math.hypot(r,n,o)||1;this.sunDir[0]=r/l,this.sunDir[1]=n/l,this.sunDir[2]=o/l;const h=Math.max(-4,Math.min(44,this.camPos[2]*.78)),c=h>22?6.5:2;Va(this.sunViewMat,[this.sunDir[0]*44,this.sunDir[1]*44+c,this.sunDir[2]*44+h],[0,c,h],[0,0,-1]);const u=76/Bt;this.sunViewMat[12]=Math.round(this.sunViewMat[12]/u)*u,this.sunViewMat[13]=Math.round(this.sunViewMat[13]/u)*u,Ee(this.sunViewProjMat,this.sunProjMat,this.sunViewMat)}uLoc(e,i){let t=this.uniformLocCache.get(e);if(t||(t=new Map,this.uniformLocCache.set(e,t)),t.has(i))return t.get(i);const s=this.gl.getUniformLocation(e,i);return t.set(i,s),s}extractFrustumPlanes(e,i){const t=(s,a,r,n,o)=>{const l=1/(Math.hypot(a,r,n)||1),h=s*4;e[h]=a*l,e[h+1]=r*l,e[h+2]=n*l,e[h+3]=o*l};t(0,i[3]+i[0],i[7]+i[4],i[11]+i[8],i[15]+i[12]),t(1,i[3]-i[0],i[7]-i[4],i[11]-i[8],i[15]-i[12]),t(2,i[3]+i[1],i[7]+i[5],i[11]+i[9],i[15]+i[13]),t(3,i[3]-i[1],i[7]-i[5],i[11]-i[9],i[15]-i[13]),t(4,i[3]+i[2],i[7]+i[6],i[11]+i[10],i[15]+i[14]),t(5,i[3]-i[2],i[7]-i[6],i[11]-i[10],i[15]-i[14])}frustumIntersectsAabb(e,i,t,s,a,r,n){for(let o=0;o<24;o+=4){const l=e[o],h=e[o+1],c=e[o+2],u=e[o+3],g=l>=0?a:i,p=h>=0?r:t,x=c>=0?n:s;if(l*g+h*p+c*x+u<0)return!1}return!0}updateCullingVolumes(){this.extractFrustumPlanes(this.viewFrustumPlanes,this.viewProjMat),this.extractFrustumPlanes(this.shadowFrustumPlanes,this.sunViewProjMat);const e=this.camPos[0],i=this.camPos[1],t=this.camPos[2];let s=e-4,a=i-4,r=t-4,n=e+4,o=i+4,l=t+4;const h=84;for(let S=-1;S<=1;S+=2)for(let T=-1;T<=1;T+=2){const k=Bi(this.invViewProjMat,S,T,-1),m=Bi(this.invViewProjMat,S,T,1),A=m[0]-k[0],D=m[1]-k[1],I=m[2]-k[2],W=Math.hypot(A,D,I)||1,w=Math.min(W,h),y=k[0]+A/W*w,M=k[1]+D/W*w,P=k[2]+I/W*w;k[0]<s&&(s=k[0]),k[1]<a&&(a=k[1]),k[2]<r&&(r=k[2]),k[0]>n&&(n=k[0]),k[1]>o&&(o=k[1]),k[2]>l&&(l=k[2]),y<s&&(s=y),M<a&&(a=M),P<r&&(r=P),y>n&&(n=y),M>o&&(o=M),P>l&&(l=P)}a=Math.max(-12,a);const c=29.5,u=Math.max(0,c-a)/Math.max(this.sunDir[1],.25),g=this.sunDir[0]*u,p=this.sunDir[2]*u,x=2.8;this.shadowCasterBox[0]=Math.min(s,s+g)-x,this.shadowCasterBox[1]=a-1.5,this.shadowCasterBox[2]=Math.min(r,r+p)-x,this.shadowCasterBox[3]=Math.max(n,n+g)+x,this.shadowCasterBox[4]=Math.max(o,c)+x,this.shadowCasterBox[5]=Math.max(l,l+p)+x}isAabbVisibleInScene(e,i,t,s,a,r,n){if(!this.frustumIntersectsAabb(this.viewFrustumPlanes,e,i,t,s,a,r))return!1;const o=this.camPos[0],l=this.camPos[1],h=this.camPos[2],c=h>29.1&&h<34.5&&o>-.7&&o<4.6;return!(h>32.35&&l<11.4&&!c&&r<31.3&&a<10.6||l>5.75&&h>24.5&&n&&r<21||l<5.28&&!n&&i>5.65&&t>31.5)}isAabbVisibleInShadow(e,i,t,s,a,r,n){const o=this.shadowCasterBox;if(s<o[0]||e>o[3]||a<o[1]||i>o[4]||r<o[2]||t>o[5]||!this.frustumIntersectsAabb(this.shadowFrustumPlanes,e,i,t,s,a,r))return!1;const l=this.camPos[0],h=this.camPos[1],c=this.camPos[2],u=c>29.1&&c<34.5&&l>-.7&&l<4.6;return!(c>32.35&&h<11.4&&!u&&r<25||h>5.75&&c>24.5&&n&&r<21||h<5.28&&!n&&i>5.65&&t>31.5)}bindTimeOfDayUniforms(e){const i=this.gl,t=this.curTod,s=Math.hypot(t.skySunDir[0],t.skySunDir[1],t.skySunDir[2])||1;i.uniform4f(this.uLoc(e,"uTodSkyZenith"),t.skyZenith[0],t.skyZenith[1],t.skyZenith[2],t.sunDiskPower),i.uniform4f(this.uLoc(e,"uTodSkyHorizon"),t.skyHorizon[0],t.skyHorizon[1],t.skyHorizon[2],t.starIntensity),i.uniform4f(this.uLoc(e,"uTodSunColor"),t.sunColor[0],t.sunColor[1],t.sunColor[2],t.resortLampGlow),i.uniform4f(this.uLoc(e,"uTodAmbient"),t.ambient[0],t.ambient[1],t.ambient[2],t.biolumIntensity),i.uniform4f(this.uLoc(e,"uTodSkySunDir"),t.skySunDir[0]/s,t.skySunDir[1]/s,t.skySunDir[2]/s,t.origMix),i.uniform4f(this.uLoc(e,"uTodCloudTint"),t.cloudTint[0],t.cloudTint[1],t.cloudTint[2],t.waterExposure)}getVrmCameraProximityFade(){return!this.vrmVisibleInScene||!this.vrmAvatar.isLoaded()?0:this.computeVrmCameraProximityFade()}computeVrmCameraProximityFade(){const e=this.vrmDiverPos[0],i=this.vrmDiverPos[1],t=this.vrmDiverPos[2],s=this.vrmPoseStyle==="beach_lie"||this.vrmPoseStyle==="hammock_lie",a=s?i-.18:i-.85,r=s?i+.28:i+.58,n=Math.max(a,Math.min(r,this.camPos[1])),o=this.camPos[0]-e,l=this.camPos[1]-n,h=this.camPos[2]-t,c=Math.hypot(o,l,h);if(c<=.48)return 0;if(c>=.78)return 1;const u=(c-.48)/(.78-.48);return u*u*(3-2*u)}drawVrmScenePass(e,i=1){const t=this.gl,s=this.vrmAvatarProg;t.useProgram(s),this.bindTextureUnit(this.shadowDepthTex,0,s,"uSunShadowTex"),this.bindTextureArrayUnit(this.pbrAlbedoTex,3,s,"uPbrAlbedoTex"),this.bindTextureArrayUnit(this.pbrNormalTex,4,s,"uPbrNormalTex"),t.uniform1i(this.uLoc(s,"uPbrReady"),this.pbrMapsLoaded===oi*2?1:0),t.uniformMatrix4fv(this.uLoc(s,"uViewProj"),!1,this.viewProjMat),t.uniformMatrix4fv(this.uLoc(s,"uSunViewProj"),!1,this.sunViewProjMat),t.uniform3fv(this.uLoc(s,"uCamPos"),this.camPos),t.uniform1f(this.uLoc(s,"uVrmCamFade"),i),t.uniform3fv(this.uLoc(s,"uSunDir"),this.sunDir),t.uniform1f(this.uLoc(s,"uTime"),this.elapsedTime),t.uniform4f(this.uLoc(s,"uFlashlightPos"),this.flashlightPos[0],this.flashlightPos[1],this.flashlightPos[2],this.flashlightOn?2.35:0),t.uniform3fv(this.uLoc(s,"uFlashlightDir"),this.flashlightDir),this.bindTimeOfDayUniforms(s),e?this.vrmAvatar.drawSceneBlend(s):this.vrmAvatar.drawSceneOpaque(s),t.activeTexture(t.TEXTURE3),t.bindTexture(t.TEXTURE_2D_ARRAY,null),t.activeTexture(t.TEXTURE4),t.bindTexture(t.TEXTURE_2D_ARRAY,null)}bindCoralLitUniforms(e){const i=this.gl;i.useProgram(e),i.uniform1f(this.uLoc(e,"uTime"),this.elapsedTime),this.bindTextureUnit(this.shadowDepthTex,0,e,"uSunShadowTex"),this.bindTextureArrayUnit(this.pbrAlbedoTex,1,e,"uPbrAlbedoTex"),this.bindTextureArrayUnit(this.pbrNormalTex,2,e,"uPbrNormalTex"),this.bindTextureUnit(this.airSkyTex,3,e,"uAirSkyTex"),i.uniform1i(this.uLoc(e,"uAirSkyReady"),this.airSkyReady?1:0),this.bindTextureUnit(this.okiSlotAtlasTex,4,e,"uOkiSlotAtlasTex"),i.uniform1i(this.uLoc(e,"uOkiSlotAtlasReady"),this.okiSlotAtlasReady?1:0),this.bindTextureUnit(this.museumCaptionTex,5,e,"uMuseumCaptionTex"),i.uniform1i(this.uLoc(e,"uMuseumCaptionReady"),this.museumCaptionReady?1:0),i.uniform1i(this.uLoc(e,"uPbrReady"),this.pbrMapsLoaded===oi*2?1:0),i.uniformMatrix4fv(this.uLoc(e,"uViewProj"),!1,this.viewProjMat),i.uniformMatrix4fv(this.uLoc(e,"uSunViewProj"),!1,this.sunViewProjMat),i.uniform2f(this.uLoc(e,"uShadowTexelSize"),1/Bt,1/Bt),i.uniform3fv(this.uLoc(e,"uCamPos"),this.camPos),i.uniform3fv(this.uLoc(e,"uSunDir"),this.sunDir),i.uniform4f(this.uLoc(e,"uFlashlightPos"),this.flashlightPos[0],this.flashlightPos[1],this.flashlightPos[2],this.flashlightOn?2.35:0),i.uniform3fv(this.uLoc(e,"uFlashlightDir"),this.flashlightDir);const t=this.vrmVisibleInScene&&this.vrmCastShadow&&this.vrmAvatar.isLoaded()&&this.vrmPoseStyle!=="swim"&&this.vrmPoseStyle!=="surface_tread"&&this.vrmPoseStyle!=="beach_lie"&&this.vrmPoseStyle!=="hammock_lie"&&this.vrmPoseStyle!=="bar_sit"&&this.vrmPoseStyle!=="bar_sip"?1:0;return i.uniform4f(this.uLoc(e,"uAvatarFootPos"),this.vrmDiverPos[0],this.vrmDiverPos[1]-.91,this.vrmDiverPos[2],t),this.bindTimeOfDayUniforms(e),{modelLoc:this.uLoc(e,"uModelMat"),paramLoc:this.uLoc(e,"uEntityParam")}}drawCoralReefPass(e,i=!1){const t=this.gl;if(i&&(!this.okinawaAsset||this.dynamicEntities.length===0))return;if(t.bindVertexArray(this.coralVao),e){const a=this.coralShadowProg;t.useProgram(a),t.uniform1f(this.uLoc(a,"uTime"),this.elapsedTime),t.uniformMatrix4fv(this.uLoc(a,"uSunViewProj"),!1,this.sunViewProjMat),this.bindTextureArrayUnit(this.pbrNormalTex,0,a,"uPbrNormalTex"),t.uniform1i(this.uLoc(a,"uPbrReady"),this.pbrMapsLoaded===oi*2?1:0);const r=this.uLoc(a,"uModelMat"),n=this.uLoc(a,"uEntityParam");if(!i){if(t.uniformMatrix4fv(r,!1,this.identityModelMat),t.uniform4f(n,this.elapsedTime,0,0,-25),this.staticChunks.length>0)for(let o=0;o<this.staticChunks.length;o++){const l=this.staticChunks[o];this.isAabbVisibleInShadow(l.minX,l.minY,l.minZ,l.maxX,l.maxY,l.maxZ,l.isSubmergedOnly)&&t.drawElements(t.TRIANGLES,l.indexCount,t.UNSIGNED_INT,l.byteOffset)}else t.drawElements(t.TRIANGLES,this.coralMeta.staticIndexCount,t.UNSIGNED_INT,this.coralMeta.staticIndexOffset*4);if(this.curCoralRise>.005){const o=this.curCoralRise*this.curCoralRise*(3-2*this.curCoralRise),l=(1-o)*-3.95;re(this.spireModelMat,this.coralCenterX,l,0,0,1),t.uniformMatrix4fv(r,!1,this.spireModelMat),t.uniform4f(n,this.elapsedTime,0,this.coralGlow*o,-4.55),t.drawElements(t.TRIANGLES,this.coralMeta.risingIndexCount,t.UNSIGNED_INT,this.coralMeta.risingIndexOffset*4)}}if(this.okinawaAsset&&this.dynamicEntities.length>0){const o=this.okinawaAsset.manifest.ranges,l=this.subMeshBounds,h=this.camPos[0],c=this.camPos[1],u=this.camPos[2];for(let g=0;g<this.dynamicEntities.length;g++){const p=this.dynamicEntities[g];if(p.isGlass||!p.castShadow)continue;const x=o[p.rangeName];if(!x)continue;const S=l[p.rangeName];if(S){const T=p.modelMat,k=T[0]*S.cx+T[4]*S.cy+T[8]*S.cz+T[12],m=T[1]*S.cx+T[5]*S.cy+T[9]*S.cz+T[13],A=T[2]*S.cx+T[6]*S.cy+T[10]*S.cz+T[14],D=p.animMode>0?.85:.25,I=Math.abs(T[0])*S.ex+Math.abs(T[4])*S.ey+Math.abs(T[8])*S.ez+D,W=Math.abs(T[1])*S.ex+Math.abs(T[5])*S.ey+Math.abs(T[9])*S.ez+D,w=Math.abs(T[2])*S.ex+Math.abs(T[6])*S.ey+Math.abs(T[10])*S.ez+D;if(Math.max(I,W,w)<1.35){const y=k-h,M=m-c,P=A-u;if(y*y+M*M+P*P>1936)continue}if(!this.isAabbVisibleInShadow(k-I,m-W,A-w,k+I,m+W,A+w,m+W<5.42))continue}t.uniformMatrix4fv(r,!1,p.modelMat),t.uniform4f(n,p.animPhase,p.animMode,p.highlightGlow,-25),t.drawElements(t.TRIANGLES,x.indexCount,t.UNSIGNED_INT,x.indexOffset*4)}}return}const s=this.visDynamicDrawsByGroup;if(s[0].length=0,s[1].length=0,s[2].length=0,s[3].length=0,this.okinawaAsset&&this.dynamicEntities.length>0){const a=this.okinawaAsset.manifest.ranges,r=this.subMeshBounds,n=this.camPos[0],o=this.camPos[1],l=this.camPos[2];let h=-1,c=null,u=null;for(let g=0;g<this.dynamicEntities.length;g++){const p=this.dynamicEntities[g];if(i?!p.isGlass:p.isGlass)continue;const x=a[p.rangeName];if(!x)continue;const S=r[p.rangeName];if(S){const T=p.modelMat,k=T[0]*S.cx+T[4]*S.cy+T[8]*S.cz+T[12],m=T[1]*S.cx+T[5]*S.cy+T[9]*S.cz+T[13],A=T[2]*S.cx+T[6]*S.cy+T[10]*S.cz+T[14],D=p.animMode>0?.85:.25,I=Math.abs(T[0])*S.ex+Math.abs(T[4])*S.ey+Math.abs(T[8])*S.ez+D,W=Math.abs(T[1])*S.ex+Math.abs(T[5])*S.ey+Math.abs(T[9])*S.ez+D,w=Math.abs(T[2])*S.ex+Math.abs(T[6])*S.ey+Math.abs(T[10])*S.ez+D;if(Math.max(I,W,w)<1.35){const y=k-n,M=m-o,P=A-l;if(y*y+M*M+P*P>5184)continue}if(!this.isAabbVisibleInScene(k-I,m-W,A-w,k+I,m+W,A+w,m+W<5.42))continue;if(i)for(let y=0;y<S.slices.length;y++){const M=S.slices[y];if(M.shaderGroup!==h){h=M.shaderGroup;const P=this.bindCoralLitUniforms(this.coralGroupProgs[h]);c=P.modelLoc,u=P.paramLoc}t.uniformMatrix4fv(c,!1,p.modelMat),t.uniform4f(u,p.animPhase,p.animMode,p.highlightGlow,-25),t.drawElements(t.TRIANGLES,M.indexCount,t.UNSIGNED_INT,M.byteOffset)}else for(let y=0;y<S.slices.length;y++){const M=S.slices[y];s[M.shaderGroup].push({ent:p,byteOffset:M.byteOffset,indexCount:M.indexCount})}}else i||s[0].push({ent:p,byteOffset:x.indexOffset*4,indexCount:x.indexCount})}}if(!i)for(let a=0;a<4;a=a+1){let r=!1;if(this.staticChunks.length>0)for(let c=0;c<this.staticChunks.length;c++){const u=this.staticChunks[c];if(u.shaderGroup===a&&this.isAabbVisibleInScene(u.minX,u.minY,u.minZ,u.maxX,u.maxY,u.maxZ,u.isSubmergedOnly)){r=!0;break}}else a===0&&(r=!0);const n=a===0&&this.curCoralRise>.005,o=s[a];if(!r&&!n&&o.length===0)continue;const{modelLoc:l,paramLoc:h}=this.bindCoralLitUniforms(this.coralGroupProgs[a]);if(r)if(t.uniformMatrix4fv(l,!1,this.identityModelMat),t.uniform4f(h,this.elapsedTime,0,0,-25),this.staticChunks.length>0)for(let c=0;c<this.staticChunks.length;c++){const u=this.staticChunks[c];u.shaderGroup!==a||!this.isAabbVisibleInScene(u.minX,u.minY,u.minZ,u.maxX,u.maxY,u.maxZ,u.isSubmergedOnly)||t.drawElements(t.TRIANGLES,u.indexCount,t.UNSIGNED_INT,u.byteOffset)}else t.drawElements(t.TRIANGLES,this.coralMeta.staticIndexCount,t.UNSIGNED_INT,this.coralMeta.staticIndexOffset*4);if(n){const c=this.curCoralRise*this.curCoralRise*(3-2*this.curCoralRise),u=(1-c)*-3.95;re(this.spireModelMat,this.coralCenterX,u,0,0,1),t.uniformMatrix4fv(l,!1,this.spireModelMat),t.uniform4f(h,this.elapsedTime,0,this.coralGlow*c,-4.55),t.drawElements(t.TRIANGLES,this.coralMeta.risingIndexCount,t.UNSIGNED_INT,this.coralMeta.risingIndexOffset*4)}for(let c=0;c<o.length;c++){const u=o[c];t.uniformMatrix4fv(l,!1,u.ent.modelMat),t.uniform4f(h,u.ent.animPhase,u.ent.animMode,u.ent.highlightGlow,-25),t.drawElements(t.TRIANGLES,u.indexCount,t.UNSIGNED_INT,u.byteOffset)}}t.activeTexture(t.TEXTURE1),t.bindTexture(t.TEXTURE_2D_ARRAY,null),t.activeTexture(t.TEXTURE2),t.bindTexture(t.TEXTURE_2D_ARRAY,null),t.activeTexture(t.TEXTURE3),t.bindTexture(t.TEXTURE_2D,null),t.activeTexture(t.TEXTURE4),t.bindTexture(t.TEXTURE_2D,null),t.activeTexture(t.TEXTURE5),t.bindTexture(t.TEXTURE_2D,null)}drawMascotsShadowPass(e){const i=this.gl,t=this.mascotsShadowProg;i.useProgram(t),i.bindVertexArray(this.mascotVao),this.bindTextureArrayUnit(this.mascotArrayTex,0,t,"uMascotArrayTex"),i.uniformMatrix4fv(this.uLoc(t,"uSunViewProj"),!1,this.sunViewProjMat),i.uniform4fv(this.uLoc(t,"uReelSlots"),this.reelSlotsUniform),i.uniform3f(this.uLoc(t,"uRowVelX"),this.rowVelX[0],this.rowVelX[1],this.rowVelX[2]),i.uniform1f(this.uLoc(t,"uBubbleUpdraft"),e),i.uniform1f(this.uLoc(t,"uShockwave"),Math.max(0,this.shockwaveTime)),i.uniform1f(this.uLoc(t,"uTime"),this.elapsedTime),i.drawElementsInstanced(i.TRIANGLES,this.mascotIndexCount,i.UNSIGNED_SHORT,0,15),i.activeTexture(i.TEXTURE0),i.bindTexture(i.TEXTURE_2D_ARRAY,null)}drawMascotsScenePass(e,i){const t=this.gl,s=this.mascotsProg;t.useProgram(s),t.bindVertexArray(this.mascotVao),this.bindTextureUnit(this.shadowDepthTex,0,s,"uSunShadowTex"),this.bindTextureArrayUnit(this.mascotArrayTex,1,s,"uMascotArrayTex"),t.uniformMatrix4fv(this.uLoc(s,"uViewProj"),!1,this.viewProjMat),t.uniformMatrix4fv(this.uLoc(s,"uSunViewProj"),!1,this.sunViewProjMat),t.uniform2f(this.uLoc(s,"uShadowTexelSize"),1/Bt,1/Bt),t.uniform3fv(this.uLoc(s,"uCamPos"),this.camPos),t.uniform3fv(this.uLoc(s,"uSunDir"),this.sunDir),t.uniform4fv(this.uLoc(s,"uReelSlots"),this.reelSlotsUniform),t.uniform3f(this.uLoc(s,"uRowVelX"),this.rowVelX[0],this.rowVelX[1],this.rowVelX[2]),t.uniform1f(this.uLoc(s,"uBubbleUpdraft"),i),t.uniform1f(this.uLoc(s,"uShockwave"),Math.max(0,this.shockwaveTime)),t.uniform1f(this.uLoc(s,"uTime"),this.elapsedTime),t.uniform1i(this.uLoc(s,"uPassMode"),e),this.bindTimeOfDayUniforms(s),t.drawElementsInstanced(t.TRIANGLES,this.mascotIndexCount,t.UNSIGNED_SHORT,0,15),t.activeTexture(t.TEXTURE1),t.bindTexture(t.TEXTURE_2D_ARRAY,null)}stepSimulation(e,i=!1){if(!this.simTargets||!this.metaTex||!this.starTex)return;const t=this.gl,s=this.simTargets[this.simPingIndex],a=1-this.simPingIndex,r=this.simTargets[a];let n=[0,0,0],o=0;if(this.pointerEnabled&&this.pointerStrength>.01){const h=Bi(this.invViewProjMat,this.pointerNdcX,this.pointerNdcY,-1),c=Bi(this.invViewProjMat,this.pointerNdcX,this.pointerNdcY,1),u=c[0]-h[0],g=c[1]-h[1],p=c[2]-h[2],x=Math.abs(p)>1e-5?(0-h[2])/p:.1,S=Math.max(0,Math.min(1,x));n=[h[0]+u*S,h[1]+g*S,h[2]+p*S],o=this.pointerStrength}t.bindFramebuffer(t.FRAMEBUFFER,r.fbo),t.viewport(0,0,this.simW,this.simH),t.disable(t.DEPTH_TEST),t.disable(t.BLEND);let l=!1;if(!i&&!this.gyogunResetPending&&(this.mode===5||this.mode===7)){const h=Math.min(this.simH,Math.ceil((this.mode===5?lr:cr)/this.simW)+1);h<this.simH&&(l=!0,t.enable(t.SCISSOR_TEST),t.scissor(0,0,this.simW,h))}t.useProgram(this.simProg),this.bindTextureUnit(s.posTex,0,this.simProg,"uPosTex"),this.bindTextureUnit(s.velTex,1,this.simProg,"uVelTex"),this.bindTextureUnit(this.metaTex,2,this.simProg,"uMetaTex"),this.bindTextureUnit(this.starTex,3,this.simProg,"uStarTex"),t.uniform2i(this.uLoc(this.simProg,"uSimRes"),this.simW,this.simH),t.uniform1f(this.uLoc(this.simProg,"uTime"),this.elapsedTime),t.uniform1f(this.uLoc(this.simProg,"uSeqTime"),this.seqTime),t.uniform1i(this.uLoc(this.simProg,"uMode"),this.mode),t.uniform1f(this.uLoc(this.simProg,"uDt"),e),t.uniform1i(this.uLoc(this.simProg,"uFrame"),this.frameCounter++),t.uniform4f(this.uLoc(this.simProg,"uPointerWorld"),n[0],n[1],n[2],o),t.uniform1i(this.uLoc(this.simProg,"uGyogunReset"),this.gyogunResetPending?1:0),t.uniform1f(this.uLoc(this.simProg,"uGyogunDir"),this.gyogunDir),t.uniform1i(this.uLoc(this.simProg,"uGyogunInfinite"),this.gyogunInfinite?1:0),t.bindVertexArray(this.emptyVao),t.drawArrays(t.TRIANGLES,0,3),l&&t.disable(t.SCISSOR_TEST),t.activeTexture(t.TEXTURE1),t.bindTexture(t.TEXTURE_2D,null),this.gyogunResetPending=!1,this.unbindTextures(4),this.simPingIndex=a}emitTelemetry(){if(!this.onTelemetry)return;let e=0,i="Coral Lagoon";if(this.mode===5)i="Sea Story Lagoon";else if(this.mode===6)i="Gyogun Swarm";else if(this.mode===7)i="Jackpot Celebration";else if(this.mode===1)i="Hold · Bait Ball";else if(this.mode===2)i="Hold · Twin Manta Wings";else if(this.mode===3)i="Hold · 3D Gemini Star",e=1;else if(this.mode===4)i="Free · Pelagic Ocean Boids";else{const t=this.seqTime;t<6.4?i="Act I · Bait Ball":t<10.6?i="Act II · Twin Manta Wings":t<16?i="Act III · Gemini 4 Carbon Emblem":t<21.8?i="Act IV · Pod Dispersion":i="Act V · Sunlit Abyss";const s=Math.max(0,Math.min(1,(t-10.9)/1.2)),a=1-Math.max(0,Math.min(1,(t-15.6)/1));e=s*s*(3-2*s)*(a*a*(3-2*a))}this.onTelemetry({fps:this.currentFps,fishCount:this.fishCount,activeDrawnFish:this.getActiveDrawnFishCount(),simResolution:`${this.simW}×${this.simH}`,seqTime:this.seqTime,duration:Fi,playing:this.playing,mode:this.mode,emblemAlpha:e,chapterName:i})}initSimulationBuffers(e){this.destroySimBuffers();const[i,t]=A0[e];this.simW=i,this.simH=t,this.fishCount=i*t;const s=Kh(i,t),a=this.createSimTarget(i,t,s.posData,s.velData),r=this.createSimTarget(i,t,s.posData,s.velData);this.simTargets=[a,r],this.metaTex=this.createDataTexture(i,t,s.metaData),this.starTex=this.createDataTexture(i,t,s.starTargetData),this.simPingIndex=0}destroySimBuffers(){const e=this.gl;if(this.simTargets){for(const i of this.simTargets)e.deleteFramebuffer(i.fbo),e.deleteTexture(i.posTex),e.deleteTexture(i.velTex);this.simTargets=null}this.metaTex&&(e.deleteTexture(this.metaTex),this.metaTex=null),this.starTex&&(e.deleteTexture(this.starTex),this.starTex=null)}createDataTexture(e,i,t){const s=this.gl,a=s.createTexture();if(!a)throw new Error("Failed to create GPGPU texture.");return s.bindTexture(s.TEXTURE_2D,a),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_MAG_FILTER,s.NEAREST),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_WRAP_S,s.CLAMP_TO_EDGE),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_WRAP_T,s.CLAMP_TO_EDGE),s.texImage2D(s.TEXTURE_2D,0,this.floatInternalFormat,e,i,0,s.RGBA,s.FLOAT,t),s.bindTexture(s.TEXTURE_2D,null),a}createSimTarget(e,i,t,s){const a=this.gl,r=this.createDataTexture(e,i,t),n=this.createDataTexture(e,i,s),o=a.createFramebuffer();if(!o)throw new Error("Failed to create GPGPU MRT framebuffer.");a.bindFramebuffer(a.FRAMEBUFFER,o),a.framebufferTexture2D(a.FRAMEBUFFER,a.COLOR_ATTACHMENT0,a.TEXTURE_2D,r,0),a.framebufferTexture2D(a.FRAMEBUFFER,a.COLOR_ATTACHMENT1,a.TEXTURE_2D,n,0),a.drawBuffers([a.COLOR_ATTACHMENT0,a.COLOR_ATTACHMENT1]);const l=a.checkFramebufferStatus(a.FRAMEBUFFER);if(l!==a.FRAMEBUFFER_COMPLETE)throw new Error(`Simulation MRT Framebuffer incomplete: 0x${l.toString(16)}`);return a.bindFramebuffer(a.FRAMEBUFFER,null),{fbo:o,posTex:r,velTex:n}}createShadowFramebuffer(e){const i=this.gl,t=i.createTexture(),s=i.createFramebuffer();if(!t||!s)throw new Error("Failed to allocate shadow map.");i.bindTexture(i.TEXTURE_2D,t),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MAG_FILTER,i.NEAREST),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_COMPARE_MODE,i.NONE),i.texImage2D(i.TEXTURE_2D,0,i.DEPTH_COMPONENT32F,e,e,0,i.DEPTH_COMPONENT,i.FLOAT,null),i.bindFramebuffer(i.FRAMEBUFFER,s),i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,t,0),i.drawBuffers([i.NONE]),i.readBuffer(i.NONE);let a=i.checkFramebufferStatus(i.FRAMEBUFFER);if(a!==i.FRAMEBUFFER_COMPLETE&&(i.texImage2D(i.TEXTURE_2D,0,i.DEPTH_COMPONENT24,e,e,0,i.DEPTH_COMPONENT,i.UNSIGNED_INT,null),a=i.checkFramebufferStatus(i.FRAMEBUFFER)),a!==i.FRAMEBUFFER_COMPLETE)throw new Error(`Shadow Framebuffer incomplete: 0x${a.toString(16)}`);return i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindTexture(i.TEXTURE_2D,null),{fbo:s,depthTex:t}}recreateSceneFramebuffer(e,i){const t=this.gl;this.sceneFbo&&t.deleteFramebuffer(this.sceneFbo),this.sceneColorTex&&t.deleteTexture(this.sceneColorTex),this.sceneDepthTex&&t.deleteTexture(this.sceneDepthTex),this.refractFbo&&t.deleteFramebuffer(this.refractFbo),this.refractSceneTex&&t.deleteTexture(this.refractSceneTex);const s=t.createTexture();t.bindTexture(t.TEXTURE_2D,s),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE),t.texImage2D(t.TEXTURE_2D,0,this.hdrColorInternalFormat,e,i,0,t.RGBA,this.hdrColorType,null);const a=t.createTexture();t.bindTexture(t.TEXTURE_2D,a),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.NEAREST),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.NEAREST),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_COMPARE_MODE,t.NONE),t.texImage2D(t.TEXTURE_2D,0,t.DEPTH_COMPONENT32F,e,i,0,t.DEPTH_COMPONENT,t.FLOAT,null);const r=t.createFramebuffer();t.bindFramebuffer(t.FRAMEBUFFER,r),t.framebufferTexture2D(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,s,0),t.framebufferTexture2D(t.FRAMEBUFFER,t.DEPTH_ATTACHMENT,t.TEXTURE_2D,a,0),t.drawBuffers([t.COLOR_ATTACHMENT0]);let n=t.checkFramebufferStatus(t.FRAMEBUFFER);if(n!==t.FRAMEBUFFER_COMPLETE&&(t.texImage2D(t.TEXTURE_2D,0,t.DEPTH_COMPONENT24,e,i,0,t.DEPTH_COMPONENT,t.UNSIGNED_INT,null),n=t.checkFramebufferStatus(t.FRAMEBUFFER)),n!==t.FRAMEBUFFER_COMPLETE)throw new Error(`Scene HDR Framebuffer incomplete: 0x${n.toString(16)}`);const o=t.createTexture();t.bindTexture(t.TEXTURE_2D,o),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE),t.texImage2D(t.TEXTURE_2D,0,this.hdrColorInternalFormat,e,i,0,t.RGBA,this.hdrColorType,null);const l=t.createFramebuffer();t.bindFramebuffer(t.FRAMEBUFFER,l),t.framebufferTexture2D(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,o,0),t.drawBuffers([t.COLOR_ATTACHMENT0]),t.bindFramebuffer(t.FRAMEBUFFER,null),t.bindTexture(t.TEXTURE_2D,null),this.sceneFbo=r,this.sceneColorTex=s,this.sceneDepthTex=a,this.refractFbo=l,this.refractSceneTex=o}createVec3Attr3Vao(e,i,t,s){const a=this.gl,r=a.createVertexArray();a.bindVertexArray(r);const n=a.createBuffer();a.bindBuffer(a.ARRAY_BUFFER,n),a.bufferData(a.ARRAY_BUFFER,e,a.STATIC_DRAW),a.enableVertexAttribArray(0),a.vertexAttribPointer(0,3,a.FLOAT,!1,0,0);const o=a.createBuffer();a.bindBuffer(a.ARRAY_BUFFER,o),a.bufferData(a.ARRAY_BUFFER,i,a.STATIC_DRAW),a.enableVertexAttribArray(1),a.vertexAttribPointer(1,3,a.FLOAT,!1,0,0);const l=a.createBuffer();a.bindBuffer(a.ARRAY_BUFFER,l),a.bufferData(a.ARRAY_BUFFER,t,a.STATIC_DRAW),a.enableVertexAttribArray(2),a.vertexAttribPointer(2,3,a.FLOAT,!1,0,0);const h=a.createBuffer();return a.bindBuffer(a.ELEMENT_ARRAY_BUFFER,h),a.bufferData(a.ELEMENT_ARRAY_BUFFER,s,a.STATIC_DRAW),a.bindVertexArray(null),{vao:r,buffers:[n,o,l,h]}}createVec4Attr3Uint32Vao(e,i,t,s){const a=this.gl,r=a.createVertexArray();a.bindVertexArray(r);const n=a.createBuffer();a.bindBuffer(a.ARRAY_BUFFER,n),a.bufferData(a.ARRAY_BUFFER,e,a.STATIC_DRAW),a.enableVertexAttribArray(0),a.vertexAttribPointer(0,3,a.FLOAT,!1,0,0);const o=a.createBuffer();a.bindBuffer(a.ARRAY_BUFFER,o),a.bufferData(a.ARRAY_BUFFER,i,a.STATIC_DRAW),a.enableVertexAttribArray(1),a.vertexAttribPointer(1,3,a.FLOAT,!1,0,0);const l=a.createBuffer();a.bindBuffer(a.ARRAY_BUFFER,l),a.bufferData(a.ARRAY_BUFFER,t,a.STATIC_DRAW),a.enableVertexAttribArray(2),a.vertexAttribPointer(2,4,a.FLOAT,!1,0,0);const h=a.createBuffer();return a.bindBuffer(a.ELEMENT_ARRAY_BUFFER,h),a.bufferData(a.ELEMENT_ARRAY_BUFFER,s,a.STATIC_DRAW),a.bindVertexArray(null),{vao:r,buffers:[n,o,l,h]}}createMascotVao(e,i,t){const s=this.gl,a=s.createVertexArray();s.bindVertexArray(a);const r=s.createBuffer();s.bindBuffer(s.ARRAY_BUFFER,r),s.bufferData(s.ARRAY_BUFFER,e,s.STATIC_DRAW),s.enableVertexAttribArray(0),s.vertexAttribPointer(0,3,s.FLOAT,!1,0,0);const n=s.createBuffer();s.bindBuffer(s.ARRAY_BUFFER,n),s.bufferData(s.ARRAY_BUFFER,i,s.STATIC_DRAW),s.enableVertexAttribArray(1),s.vertexAttribPointer(1,2,s.FLOAT,!1,0,0);const o=s.createBuffer();return s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,o),s.bufferData(s.ELEMENT_ARRAY_BUFFER,t,s.STATIC_DRAW),s.bindVertexArray(null),{vao:a,buffers:[r,n,o]}}createAndLoadMascotTextureArray(){const e=this.gl,i=e.createTexture();if(!i)throw new Error("Failed to allocate mascot 2D texture array.");e.bindTexture(e.TEXTURE_2D_ARRAY,i),e.texParameteri(e.TEXTURE_2D_ARRAY,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D_ARRAY,e.TEXTURE_MAG_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D_ARRAY,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D_ARRAY,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),e.texStorage3D(e.TEXTURE_2D_ARRAY,C0,e.RGBA8,Ns,Ns,Ri),e.bindTexture(e.TEXTURE_2D_ARRAY,null);for(let t=0;t<Ri;t++){const s=new Image;s.decoding="async",s.onload=()=>{this.disposed||(e.bindTexture(e.TEXTURE_2D_ARRAY,i),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,!1),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!0),e.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,t,Ns,Ns,1,e.RGBA,e.UNSIGNED_BYTE,s),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),this.mascotsLoadedCount++,this.mascotsLoadedCount===Ri&&(e.generateMipmap(e.TEXTURE_2D_ARRAY),e.texParameteri(e.TEXTURE_2D_ARRAY,e.TEXTURE_MIN_FILTER,e.LINEAR_MIPMAP_LINEAR)),e.bindTexture(e.TEXTURE_2D_ARRAY,null))},s.src=`./symbols/sym_${t+1}.png`}return i}createAndLoadPbrTextureArrays(){const e=this.gl,i=e.getExtension("EXT_texture_filter_anisotropic")||e.getExtension("WEBKIT_EXT_texture_filter_anisotropic")||e.getExtension("MOZ_EXT_texture_filter_anisotropic"),t=i?Math.min(16,e.getParameter(i.MAX_TEXTURE_MAX_ANISOTROPY_EXT)):0,s=()=>{const o=e.createTexture();if(!o)throw new Error("Failed to allocate PBR texture array.");return e.bindTexture(e.TEXTURE_2D_ARRAY,o),e.texParameteri(e.TEXTURE_2D_ARRAY,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D_ARRAY,e.TEXTURE_MAG_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D_ARRAY,e.TEXTURE_WRAP_S,e.REPEAT),e.texParameteri(e.TEXTURE_2D_ARRAY,e.TEXTURE_WRAP_T,e.REPEAT),i&&t>1&&e.texParameterf(e.TEXTURE_2D_ARRAY,i.TEXTURE_MAX_ANISOTROPY_EXT,t),e.texStorage3D(e.TEXTURE_2D_ARRAY,B0,e.RGBA8,Os,Os,oi),e.bindTexture(e.TEXTURE_2D_ARRAY,null),o},a=s(),r=s(),n=(o,l,h,c)=>{const u=new Image;u.decoding="async",u.onload=()=>{this.disposed||(e.bindTexture(e.TEXTURE_2D_ARRAY,o),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,!1),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),e.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,l,Os,Os,1,e.RGBA,e.UNSIGNED_BYTE,u),this.pbrMapsLoaded++,this.pbrMapsLoaded===oi*2&&(e.generateMipmap(e.TEXTURE_2D_ARRAY),e.texParameteri(e.TEXTURE_2D_ARRAY,e.TEXTURE_MIN_FILTER,e.LINEAR_MIPMAP_LINEAR),e.bindTexture(e.TEXTURE_2D_ARRAY,c),e.generateMipmap(e.TEXTURE_2D_ARRAY),e.texParameteri(e.TEXTURE_2D_ARRAY,e.TEXTURE_MIN_FILTER,e.LINEAR_MIPMAP_LINEAR)),e.bindTexture(e.TEXTURE_2D_ARRAY,null))},u.onerror=()=>{this.disposed||this.pbrMapsLoaded++},u.src=h};for(let o=0;o<oi;o++)n(a,o,`./assets/seabed/pbr_alb_${o}.png?v=zen_botanical_v1`,r),n(r,o,`./assets/seabed/pbr_nor_${o}.png?v=zen_botanical_v1`,a);return{albedoTex:a,normalTex:r}}createAndLoadAirSkyPanorama(){const e=this.gl,i=e.createTexture();if(!i)throw new Error("Failed to create AIR sky panorama texture.");e.bindTexture(e.TEXTURE_2D,i),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.REPEAT),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR),e.texImage2D(e.TEXTURE_2D,0,e.RGBA8,1,1,0,e.RGBA,e.UNSIGNED_BYTE,new Uint8Array([12,82,188,255])),e.bindTexture(e.TEXTURE_2D,null);const t=new Image;return t.onload=()=>{if(this.disposed)return;e.bindTexture(e.TEXTURE_2D,i),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,!1),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),e.texImage2D(e.TEXTURE_2D,0,e.RGBA8,e.RGBA,e.UNSIGNED_BYTE,t),e.generateMipmap(e.TEXTURE_2D),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.REPEAT),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR_MIPMAP_LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR);const s=e.getExtension("EXT_texture_filter_anisotropic")||e.getExtension("WEBKIT_EXT_texture_filter_anisotropic");if(s){const a=e.getParameter(s.MAX_TEXTURE_MAX_ANISOTROPY_EXT);e.texParameterf(e.TEXTURE_2D,s.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(16,a))}e.bindTexture(e.TEXTURE_2D,null),this.airSkyReady=!0},t.src="./assets/seabed/air_summer_sky.webp?v=cuda_8k_v5",i}createAndLoadOkiSlotAtlas(){const e=this.gl,i=e.createTexture();if(!i)throw new Error("Failed to create Oki-Slot commercial atlas texture.");e.bindTexture(e.TEXTURE_2D,i),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.REPEAT),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR),e.texImage2D(e.TEXTURE_2D,0,e.RGBA8,1,1,0,e.RGBA,e.UNSIGNED_BYTE,new Uint8Array([250,248,242,255])),e.bindTexture(e.TEXTURE_2D,null);const t=new Image;return t.onload=()=>{this.disposed||(e.bindTexture(e.TEXTURE_2D,i),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,!1),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),e.texImage2D(e.TEXTURE_2D,0,e.RGBA8,e.RGBA,e.UNSIGNED_BYTE,t),e.generateMipmap(e.TEXTURE_2D),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.REPEAT),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR_MIPMAP_LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR),e.bindTexture(e.TEXTURE_2D,null),this.okiSlotAtlasReady=!0)},t.src="./assets/seabed/okislot_atlas.jpg?v=okiblack_v2",i}createAndLoadMuseumCaptionTex(){const e=this.gl,i=e.createTexture();if(!i)throw new Error("Failed to create museum exhibition caption texture.");const t=2048,s=2048,a=2048,r=1365.3333,n=document.createElement("canvas");n.width=t,n.height=s;const o='"Shippori Mincho", "Yu Mincho", "YuMincho", "Hiragino Mincho ProN", "BIZ UDPMincho", "MS PMincho", Georgia, serif',l='"Cormorant Garamond", "Georgia", "Times New Roman", "Yu Mincho", serif',h=(u,g,p,x,S,T=!1,k=0)=>{const m=Array.from(g);let A=0;const D=m.map(W=>{const w=u.measureText(W).width;return A+=w,w});m.length>1&&(A+=S*(m.length-1));let I=T?p-A:p;k>0&&(u.lineJoin="round",u.lineWidth=k,u.strokeStyle=u.fillStyle);for(let W=0;W<m.length;W++)k>0&&u.strokeText(m[W],I,x),u.fillText(m[W],I,x),I+=D[W]+S},c=()=>{if(this.disposed)return;const u=n.getContext("2d");if(!u)return;u.save(),u.setTransform(1,0,0,s/r,0,0);const g=u.createRadialGradient(a*.5,r*.3,90,a*.5,r*.52,a*.74);g.addColorStop(0,"#FBF9F4"),g.addColorStop(.68,"#F5F2EA"),g.addColorStop(1,"#ECE8DE"),u.fillStyle=g,u.fillRect(0,0,a,r),u.strokeStyle="#CFC9BD",u.lineWidth=4,u.strokeRect(2,2,a-4,r-4),u.strokeStyle="rgba(255, 255, 255, 0.85)",u.lineWidth=2,u.strokeRect(6,6,a-12,r-12);const p=156,x=a-156;u.textBaseline="alphabetic",u.fillStyle="#0F0E0D",u.font=`600 34px ${l}`,h(u,"01",p,142,2),u.strokeStyle="#756F65",u.lineWidth=1.8,u.beginPath(),u.moveTo(p+56,131),u.lineTo(p+102,131),u.stroke(),u.fillStyle="#47433C",u.font=`600 20px ${l}`,h(u,"PERMANENT EXHIBITION   /   SANCTUARY ARCHIVE",p+122,141,4),u.fillStyle="#0B0A09",u.font=`600 74px ${o}`,h(u,"ZEN大学　逗子／南島校舎",p,264,3.8,!1,.45),u.fillStyle="#2B2824",u.font=`italic 400 36px ${l}`,h(u,"ZEN University — Zushi / Southern Island Sanctuary Campus",p,330,.7),u.fillStyle="#2C2925",u.font=`500 25.5px ${o}`,h(u,"2026年–　｜　サイトスペシフィック・インスタレーション（無人校舎建築、自律型AI、光学ハルシネーション、サンゴ礁海域）",p,408,.55,!1,.32),u.fillStyle="#423E38",u.font=`400 24px ${l}`,h(u,"Mixed Media & Optical Hallucination   ·   Status: Isolated Sanctuary [Off-Grid]   ·   Active Human: 1 (Solo)   ·   Peer Comm: None",p,452,.5),u.strokeStyle="#B3ADA0",u.lineWidth=1.8,u.beginPath(),u.moveTo(p,514),u.lineTo(x,514),u.stroke(),u.fillStyle="#0D0C0B",u.font=`500 47px ${o}`,h(u,"ZEN大学にいると思ったら、",p,634,2.2,!1,.55),h(u,"扉の向こうは南の島のバカンスだった。",p,724,2.2,!1,.55),h(u,"―― 他者との断絶を選んだポストアポカリプス世界。",p,848,2.2,!1,.55),h(u,"AIが紡ぐ、ひとりだけの優しいハルシネーション。",p+94,938,2.2,!1,.55),u.fillStyle="#38352F",u.font=`italic 400 28.5px ${l}`,h(u,"Believing oneself inside ZEN University, one opens the door onto an endless southern island vacation—",p,1044,.4),h(u,"a post-apocalyptic world that chose solitude, and a gentle hallucination woven by AI for one alone.",p,1086,.4),u.strokeStyle="#C9C3B7",u.lineWidth=1.3,u.beginPath(),u.moveTo(p,1184),u.lineTo(x,1184),u.stroke(),u.fillStyle="#4C4841",u.font=`500 21.5px ${o}`,h(u,"所蔵：ZEN大学 サンクチュアリ・アーカイブ（常設展示室 I）",p,1236,1.4,!1,.25),u.fillStyle="#524E47",u.font=`600 19px ${l}`,h(u,"COLLECTION OF ZEN UNIVERSITY  ·  ARCHIVE GALLERY I",x,1235,3,!0),u.restore(),e.bindTexture(e.TEXTURE_2D,i),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,!1),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),e.texImage2D(e.TEXTURE_2D,0,e.RGBA8,e.RGBA,e.UNSIGNED_BYTE,n),e.generateMipmap(e.TEXTURE_2D),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR_MIPMAP_LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR);const S=e.getExtension("EXT_texture_filter_anisotropic")||e.getExtension("WEBKIT_EXT_texture_filter_anisotropic")||e.getExtension("MOZ_EXT_texture_filter_anisotropic");if(S){const T=e.getParameter(S.MAX_TEXTURE_MAX_ANISOTROPY_EXT);e.texParameterf(e.TEXTURE_2D,S.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(16,T))}e.bindTexture(e.TEXTURE_2D,null),this.museumCaptionReady=!0};return c(),typeof document<"u"&&document.fonts?.ready&&document.fonts.ready.then(()=>{c(),setTimeout(()=>c(),650)}),i}buildSpatialWorldData(e){const i=e.positions,t=e.attribs,s=e.indices,a=e.manifest.ranges.static_world,r=a.indexOffset,n=a.indexCount,o=n/3|0,l=L=>L===10?1:L===8||L===9?2:L>=11?3:0;let h=1/0,c=1/0,u=-1/0,g=-1/0;for(let L=0;L<o;L++){const E=r+L*3,_=s[E]*3,H=i[_],G=i[_+2];H<h&&(h=H),H>u&&(u=H),G<c&&(c=G),G>g&&(g=G)}Number.isFinite(h)||(h=-72,u=72,c=-72,g=72);const p=12,x=Math.max(1,Math.ceil((u-h+.01)/p)),S=Math.max(1,Math.ceil((g-c+.01)/p)),T=x*S*8,k=new Int32Array(o),m=new Int32Array(T);for(let L=0;L<o;L++){const E=r+L*3,_=s[E],H=_*3,G=s[E+1]*3,Q=s[E+2]*3,se=(i[H]+i[G]+i[Q])*(1/3),X=(i[H+2]+i[G+2]+i[Q+2])*(1/3),ae=Math.max(i[H+1],i[G+1],i[Q+1])<5.36?1:0,ie=l(Math.round(t[_*4])),R=Math.max(0,Math.min(x-1,Math.floor((se-h)/p))),oe=((Math.max(0,Math.min(S-1,Math.floor((X-c)/p)))*x+R)*2+ae)*4+ie;k[L]=oe,m[oe]++}const A=new Uint32Array(s.length);r>0&&A.set(s.subarray(0,r),0);const D=r+n;D<s.length&&A.set(s.subarray(D),D);const I=new Int32Array(T),W=[],w=new Int32Array(T).fill(-1);let y=r;for(let L=0;L<T;L++){const E=m[L];E<=0||(I[L]=y,w[L]=W.length,W.push({byteOffset:y*4,indexCount:E*3,shaderGroup:L&3,minX:1/0,minY:1/0,minZ:1/0,maxX:-1/0,maxY:-1/0,maxZ:-1/0,isSubmergedOnly:(L>>2&1)===1}),y+=E*3)}for(let L=0;L<o;L++){const E=k[L],_=I[E];I[E]=_+3;const H=r+L*3,G=s[H],Q=s[H+1],se=s[H+2];A[_]=G,A[_+1]=Q,A[_+2]=se;const X=W[w[E]],Z=G*3,ae=Q*3,ie=se*3,R=Math.min(i[Z],i[ae],i[ie]),K=Math.max(i[Z],i[ae],i[ie]),oe=Math.min(i[Z+1],i[ae+1],i[ie+1]),he=Math.max(i[Z+1],i[ae+1],i[ie+1]),me=Math.min(i[Z+2],i[ae+2],i[ie+2]),ne=Math.max(i[Z+2],i[ae+2],i[ie+2]);R<X.minX&&(X.minX=R),K>X.maxX&&(X.maxX=K),oe<X.minY&&(X.minY=oe),he>X.maxY&&(X.maxY=he),me<X.minZ&&(X.minZ=me),ne>X.maxZ&&(X.maxZ=ne)}for(const L of W)L.minX-=.65,L.maxX+=.65,L.minY-=.35,L.maxY+=.45,L.minZ-=.65,L.maxZ+=.65;const M={},P=[0,0,0,0],U=[0,0,0,0];for(const[L,E]of Object.entries(e.manifest.ranges)){if(L==="static_world"||E.indexCount<=0)continue;let _=1/0,H=1/0,G=1/0,Q=-1/0,se=-1/0,X=-1/0;P[0]=0,P[1]=0,P[2]=0,P[3]=0;const Z=E.indexCount/3|0;for(let R=0;R<Z;R++){const K=E.indexOffset+R*3,oe=s[K],he=l(Math.round(t[oe*4]));P[he]++;for(let me=0;me<3;me++){const ne=s[K+me]*3,Le=i[ne],Ae=i[ne+1],Ie=i[ne+2];Le<_&&(_=Le),Le>Q&&(Q=Le),Ae<H&&(H=Ae),Ae>se&&(se=Ae),Ie<G&&(G=Ie),Ie>X&&(X=Ie)}}const ae=[];let ie=E.indexOffset;for(let R=0;R<4;R=R+1)U[R]=ie,P[R]>0&&(ae.push({byteOffset:ie*4,indexCount:P[R]*3,shaderGroup:R}),ie+=P[R]*3);for(let R=0;R<Z;R++){const K=E.indexOffset+R*3,oe=s[K],he=l(Math.round(t[oe*4])),me=U[he];U[he]=me+3,A[me]=oe,A[me+1]=s[K+1],A[me+2]=s[K+2]}Number.isFinite(_)&&(M[L]={cx:(_+Q)*.5,cy:(H+se)*.5,cz:(G+X)*.5,ex:Math.max(.05,(Q-_)*.5),ey:Math.max(.05,(se-H)*.5),ez:Math.max(.05,(X-G)*.5),slices:ae})}return{gpuIndices:A,chunks:W,bounds:M}}loadBlenderOkinawaWorld(){Vh().then(e=>{if(this.disposed)return;const i=this.gl,t=this.buildSpatialWorldData(e),s=this.createVec4Attr3Uint32Vao(e.positions,e.normals,e.attribs,t.gpuIndices);for(const n of this.coralBuffers)i.deleteBuffer(n);i.deleteVertexArray(this.coralVao),this.coralVao=s.vao,this.coralBuffers=s.buffers,this.staticChunks=t.chunks,this.subMeshBounds=t.bounds;const a=e.manifest.ranges.static_world,r=e.manifest.ranges.rising_coral_spire;this.coralMeta={staticIndexOffset:a.indexOffset,staticIndexCount:a.indexCount,risingIndexOffset:r.indexOffset,risingIndexCount:r.indexCount},this.okinawaAsset=e;for(const n of this.okinawaReadyListeners)n(e);this.okinawaReadyListeners.length=0}).catch(e=>{console.warn("Using procedural coral fallback:",e)})}bindTextureArrayUnit(e,i,t,s){const a=this.gl;a.activeTexture(a.TEXTURE0+i),a.bindTexture(a.TEXTURE_2D_ARRAY,e);const r=this.uLoc(t,s);r!==null&&a.uniform1i(r,i)}bindTextureUnit(e,i,t,s){const a=this.gl;a.activeTexture(a.TEXTURE0+i),a.bindTexture(a.TEXTURE_2D,e);const r=this.uLoc(t,s);r!==null&&a.uniform1i(r,i)}unbindTextures(e){const i=this.gl;for(let t=0;t<e;t++)i.activeTexture(i.TEXTURE0+t),i.bindTexture(i.TEXTURE_2D,null)}createProgram(e,i){const t=this.gl,s=t.createShader(t.VERTEX_SHADER),a=t.createShader(t.FRAGMENT_SHADER);if(!s||!a)throw new Error("Failed to create WebGLShader.");t.shaderSource(s,e),t.compileShader(s),t.shaderSource(a,i),t.compileShader(a);const r=t.createProgram();if(!r)throw new Error("Failed to create WebGLProgram.");return t.attachShader(r,s),t.attachShader(r,a),t.linkProgram(r),this.pendingProgramLinks.push({prog:r,vs:s,fs:a,linkedChecked:!1}),r}bindInputEvents(){let e=!1,i=-1,t=0,s=0,a=0;this.canvas.addEventListener("contextmenu",n=>{n.preventDefault()}),window.addEventListener("contextmenu",n=>{(document.pointerLockElement===this.canvas||performance.now()<a)&&n.preventDefault()}),this.canvas.addEventListener("pointerdown",n=>{if(document.pointerLockElement===this.canvas){n.button===2&&(n.preventDefault(),e=!1,i=-1,a=performance.now()+650,document.exitPointerLock());return}if(!(n.button!==0&&n.button!==1&&n.button!==2)){e=!0,i=n.pointerId,t=n.clientX,s=n.clientY,document.body.classList.add("is-canvas-dragging");try{this.canvas.setPointerCapture(n.pointerId)}catch{}}}),this.canvas.addEventListener("pointermove",n=>{const o=this.canvas.getBoundingClientRect();if(o.width>0&&o.height>0&&(this.pointerNdcX=(n.clientX-o.left)/o.width*2-1,this.pointerNdcY=1-(n.clientY-o.top)/o.height*2,this.pointerStrength=1),document.pointerLockElement===this.canvas){this.onMouseLookDelta&&this.onMouseLookDelta(n.movementX,n.movementY);return}if(!e||n.pointerId!==i)return;const l=n.clientX-t,h=n.clientY-s;t=n.clientX,s=n.clientY,this.onMouseLookDelta?this.onMouseLookDelta(l*1.25,h*1.25):(this.targetYaw-=l*.0052,this.targetPitch=Math.max(-.52,Math.min(.32,this.targetPitch+h*.0042)))});const r=n=>{!e||n.pointerId!==i||(e=!1,i=-1,document.body.classList.remove("is-canvas-dragging"),this.canvas.hasPointerCapture(n.pointerId)&&this.canvas.releasePointerCapture(n.pointerId))};this.canvas.addEventListener("pointerup",r),this.canvas.addEventListener("pointercancel",r),this.canvas.addEventListener("wheel",n=>{n.preventDefault(),this.onWheelZoom?this.onWheelZoom(n.deltaY):this.targetDist=Math.max(5.2,Math.min(22,this.targetDist+n.deltaY*.0085))},{passive:!1})}setOnCameraMatrixUpdated(e){this.onCameraMatrixUpdated=e}setCinemaCutoutOpacity(e){this.cinemaCutoutOpacity=Math.max(0,Math.min(1,e))}isClientPointOnUnoccludedCinema(e,i){if(!this.freeSwimMode||this.mode<5||this.cinemaCutoutOpacity<=.02||this.camPos[1]<5.46||this.camPos[2]>32)return!1;const t=[0,0,0],s=[0,0,-1];if(!this.screenToWorldRay(e,i,t,s))return!1;const a=this.camPos[0],r=this.camPos[1],n=this.camPos[2],o=s[0],l=s[1],h=s[2],c=4.88,u=7.34,g=21.48,p=.94275467,x=.33348709,S=-.33348709,T=.94275467,k=a-c,m=r-u,A=n-g;if(Math.hypot(k,m,A)>30)return!1;const D=k*S+A*T;if(Math.abs(D)<.12)return!1;const I=D>0,W=I?.025:-.034,w=c+W*S,y=u,M=g+W*T,P=I?S:-S,U=I?T:-T,L=o*P+h*U;if(L>=-1e-4)return!1;const E=((w-a)*P+(M-n)*U)/L;if(E<=.18)return!1;const _=a+o*E,H=r+l*E,G=n+h*E,Q=Math.abs((_-w)*p+(G-M)*x),se=Math.abs(H-y);if(Q>.89||se>.5)return!1;if(this.vrmVisibleInScene&&this.vrmAvatar.isLoaded()){const X=this.vrmDiverPos[0],Z=this.vrmDiverPos[1],ae=this.vrmDiverPos[2],ie=this.vrmPoseStyle==="beach_lie"||this.vrmPoseStyle==="hammock_lie",R=ie?Z-.3:Z-.9,K=ie?Z+.32:Z+.68,oe=ie?.36:.28,he=o*o+h*h;if(he>1e-6){const me=a-X,ne=n-ae,Le=me*o+ne*h,Ae=me*me+ne*ne-oe*oe,Ie=Le*Le-he*Ae;if(Ie>=0){const He=Math.sqrt(Ie),Ue=(-Le-He)/he,We=(-Le+He)/he,dt=Math.max(.05,Ue),vt=Math.min(E-.05,We);if(dt<=vt){const st=r+l*dt,ot=r+l*vt;if(Math.max(st,ot)>=R&&Math.min(st,ot)<=K)return!1}}}}return!(this.okinawaAsset&&this.okinawaAsset.collider.raycastFirstHitDist(a,r,n,o,l,h,E-.06)>=0)}computeBeachCinemaProjection(e,i){if(!this.freeSwimMode||this.mode<5||this.camPos[1]<5.46||this.camPos[2]>32)return null;const t=this.canvas.clientWidth||window.innerWidth,s=this.canvas.clientHeight||window.innerHeight;if(t<=1||s<=1||e<=1||i<=1)return null;const a=4.88,r=7.34,n=21.48,o=.94275467,l=.33348709,h=-.33348709,c=.94275467,u=this.camPos[0]-a,g=this.camPos[1]-r,p=this.camPos[2]-n,x=Math.hypot(u,g,p);if(x>30)return null;const S=u*h+p*c;if(Math.abs(S)<.12)return null;const T=S>0,k=T?.025:-.034,m=a+k*h,A=r,D=n+k*c,I=T?o:-o,W=T?l:-l,w=.9,y=.51,M=m-w*I,P=A+y,U=D-w*W,L=2*w/e,E=L*I,_=L*W,H=-2*y/i,G=this.viewProjMat,Q=G[0]*M+G[4]*P+G[8]*U+G[12],se=G[1]*M+G[5]*P+G[9]*U+G[13],X=G[3]*M+G[7]*P+G[11]*U+G[15],Z=G[0]*E+G[8]*_,ae=G[1]*E+G[9]*_,ie=G[3]*E+G[11]*_,R=G[4]*H,K=G[5]*H,oe=G[7]*H,he=X,me=X+e*ie,ne=X+i*oe,Le=me+i*oe;if(he<=.16||me<=.16||ne<=.16||Le<=.16)return null;const Ae=.5*t,Ie=.5*s,He=Ae*(Q+he)/he,Ue=Ie*(he-se)/he,We=Ae*(Q+e*Z+me)/me,dt=Ie*(me-(se+e*ae))/me,vt=Ae*(Q+i*R+ne)/ne,st=Ie*(ne-(se+i*K))/ne,ot=Ae*(Q+e*Z+i*R+Le)/Le,bt=Ie*(Le-(se+e*ae+i*K))/Le,Qe=Math.min(He,We,vt,ot),St=Math.max(He,We,vt,ot),Tt=Math.min(Ue,dt,st,bt),wt=Math.max(Ue,dt,st,bt);if(St<-64||Qe>t+64||wt<-64||Tt>s+64)return null;const nt=1/X,ct=Ae*(Z+ie)*nt,rt=Ie*(ie-ae)*nt,ut=ie*nt,Mt=Ae*(R+oe)*nt,b=Ie*(oe-K)*nt,B=oe*nt,N=Ae*(Q+X)*nt,ee=Ie*(X-se)*nt,V=Math.min(1,(Math.abs(S)-.12)/.22),pe=x<=22?1:Math.max(0,1-(x-22)/8),ce=Math.max(0,Math.min(1,V*pe));return ce<=.01?null:{matrix3d:`matrix3d(${ct},${rt},0,${ut},${Mt},${b},0,${B},0,0,1,0,${N},${ee},0,1)`,opacity:ce}}}const Zt=3.85,Xi={top:2.16,mid:.24,bot:-1.68};function _0(f){return(f%9+9)%9+1}function F0(f){return(f%9+9)%9+1}function I0(f){return((8-f)%9+9)%9+1}class N0{vfx;audio;ui;specMode="festival";stageStyle="atlantis";forcedPreview="auto";autoSpin=!1;state="IDLE";stateTimer=0;spinCount=0;jackpotCount=0;isKakuhenMode=!1;active=!0;posTop=4;posMid=5.5;posBot=6;prevPosTop=4;prevPosMid=5.5;prevPosBot=6;stopGoalTop=4;stopGoalBot=6;stopGoalMid=5.5;topStopped=!0;botStopped=!0;midStopped=!0;currentPlan=null;previewFired=!1;bubbleUpgradeFired=!1;pearlPreFlashFired=!1;slotsBuffer=new Float32Array(60);slotLastK=[[NaN,NaN,NaN,NaN,NaN],[NaN,NaN,NaN,NaN,NaN],[NaN,NaN,NaN,NaN,NaN]];rafId=0;lastTs=0;constructor(e,i,t){this.vfx=e,this.audio=i,this.ui=t,this.syncReelsToGpu(.016,!0),this.emitUi()}startLoop(){if(this.rafId!==0)return;this.lastTs=performance.now();const e=i=>{if(this.rafId===-1)return;this.rafId=requestAnimationFrame(e);const t=Math.min(.05,Math.max(.001,(i-this.lastTs)*.001));this.lastTs=i,this.active&&this.update(t,i*.001)};this.rafId=requestAnimationFrame(e)}dispose(){this.active=!1,this.rafId>0&&cancelAnimationFrame(this.rafId),this.rafId=-1}setActive(e){this.active=e,e?(this.vfx.enterPachinkoCruiseMode(!0),this.syncReelsToGpu(.016,!0)):(this.vfx.setSolarPearlFlash(!1),this.vfx.setReachCurrent(0,!1),this.vfx.setCoralReefSpire(!1))}setSpecMode(e){this.specMode=e}setStageStyle(e){this.stageStyle=e}setForcedPreview(e){this.forcedPreview=e}setAutoSpin(e){this.autoSpin=e,e&&this.state==="IDLE"&&this.active&&this.handlePushButton()}handlePushButton(){if(this.active){if(this.state==="IDLE"){this.vfx.triggerPushShockwave(),this.audio.playPushButton(!1),this.beginSpin();return}if(this.state==="REACH_WAIT_PUSH"){this.vfx.triggerPushShockwave(),this.audio.playPushButton(!0),this.firePreviewAndEnterSuperReach();return}this.state==="JACKPOT_CELEBRATION"&&this.stateTimer>1.5&&(this.vfx.triggerPushShockwave(),this.audio.playPushButton(!1),this.finishJackpotToIdle(),this.beginSpin())}}beginSpin(){this.spinCount++,this.vfx.setSolarPearlFlash(!1),this.vfx.setReachCurrent(0,!1),this.vfx.setCoralReefSpire(!1),this.vfx.enterPachinkoCruiseMode(!1),this.audio.playBgm(this.isKakuhenMode?"jackpot":"normal");const e=this.rollLotteryPlan();this.currentPlan=e,this.previewFired=!1,this.bubbleUpgradeFired=!1,this.pearlPreFlashFired=!1;const i=this.forcedPreview!=="auto";i&&(this.forcedPreview="auto"),this.stopGoalTop=this.computeNextModGoal(this.posTop,e.cTopTarget,12),this.stopGoalBot=this.computeNextModGoal(this.posBot,e.cBotTarget,17);const t=e.reachType==="none"?21:38,s=e.useRespinSurprise?e.cMidFinalTarget+1:e.cMidFinalTarget;this.stopGoalMid=this.computeNextModGoal(this.posMid,s,t),this.topStopped=!1,this.botStopped=!1,this.midStopped=!1,this.state="SPINNING",this.stateTimer=0,this.emitUi(i)}computeNextModGoal(e,i,t){return Math.ceil((e+t-i)/9)*9+i}getReachColumnWorldX(e){return e==="single_left"?-.5*Zt:e==="single_right"?.5*Zt:0}rollLotteryPlan(){const e=this.forcedPreview;let i=.4;this.specMode==="festival"?i=this.isKakuhenMode?.65:.4:this.specMode==="sweet"?i=this.isKakuhenMode?.28:.125:i=this.isKakuhenMode?1/36.9:1/319.6;let t=Math.random()<i;e==="gyogun_red"||e==="gyogun_clown"||e==="gyogun_rainbow_rev"||e==="bubble_to_gyogun"?t=!0:e==="gyogun_classic"?t=Math.random()<.82:e==="coral_bubble"||e==="bubble_big"?t=Math.random()<.62:e==="bubble_normal"&&(t=Math.random()<.28);const s=e!=="auto"?1:this.specMode==="festival"?.72:.3;if(!(t||Math.random()<s)){const k=Math.floor(Math.random()*9)+1,m=(k+8)%9,A=(9-k+4)%9,D=(k+2)%9;return{isWin:!1,winSymbol:k,isKakuhenWin:!1,reachType:"none",reachSymbols:[],cTopTarget:m,cBotTarget:A,cMidFinalTarget:D,useCoralReefSpire:!1,useRespinSurprise:!1,usePearlFlashBeforeStop:!1,preview:{kind:"none"}}}const r=Math.random();let n="double_cross",o=[],l=7,h=0,c=0,u=0;if(r<(t?.56:.42)){n="double_cross";const k=[5,6,5,6,1,2,3,4,7,8,9],m=k[Math.floor(Math.random()*k.length)],A=m%9+1;if(o=[m,A],h=(m-1+9)%9,c=(9-A+9)%9,t){const D=m%2===1?m:A,I=m%2===0?m:A;l=e==="gyogun_red"||e==="gyogun_clown"||e==="gyogun_rainbow_rev"||Math.random()<.66?D:I,u=(l-1+9)%9-.5}else u=A%9-.5}else if(r<.78){n="single_left";const k=[1,2,3,4,5,5,6,6,7,7,8,9],m=k[Math.floor(Math.random()*k.length)];o=[m],l=m,h=(m-1+9)%9,c=(9-m+9)%9,u=t?(m-1+9)%9:m%9}else{n="single_right";const k=[1,2,3,4,5,5,6,6,7,7,8,9],m=k[Math.floor(Math.random()*k.length)];o=[m],l=m,h=(m-2+9)%9,c=(8-m+9)%9,u=t?(m-2+9)%9:(m-1+9)%9}const g=t&&l%2===1;let p;if(e==="gyogun_classic")p={kind:"gyogun",theme:1,reverse:!1,infinite:!1};else if(e==="gyogun_red")p={kind:"gyogun",theme:2,reverse:!1,infinite:!1};else if(e==="gyogun_clown")p={kind:"gyogun",theme:3,reverse:!1,infinite:!1};else if(e==="gyogun_rainbow_rev")p={kind:"gyogun",theme:4,reverse:!0,infinite:!0};else if(e==="bubble_to_gyogun")p={kind:"bubble_to_gyogun",theme:1};else if(e==="coral_bubble"||e==="bubble_big")p={kind:"bubble_big"};else if(e==="bubble_normal")p={kind:"bubble_normal"};else if(t){const k=Math.random();k<.34?p={kind:"bubble_big"}:k<.46?p={kind:"bubble_super"}:k<.72?p={kind:"gyogun",theme:1,reverse:!1,infinite:!1}:k<.82?p={kind:"bubble_to_gyogun",theme:1}:k<.9?p={kind:"gyogun",theme:2,reverse:!1,infinite:!1}:k<.96?p={kind:"gyogun",theme:3,reverse:!1,infinite:!1}:p={kind:"gyogun",theme:4,reverse:!0,infinite:!0}}else{const k=Math.random();k<.62?p={kind:"bubble_normal"}:k<.84?p={kind:"bubble_big"}:k<.94?p={kind:"none"}:p={kind:"gyogun",theme:1,reverse:!1,infinite:!1}}const x=e==="coral_bubble"||Math.random()<.78,S=t&&Math.random()<.24,T=t&&!S&&Math.random()<.52;return{isWin:t,winSymbol:l,isKakuhenWin:g,reachType:n,reachSymbols:o,cTopTarget:h,cBotTarget:c,cMidFinalTarget:u,useCoralReefSpire:x,useRespinSurprise:S,usePearlFlashBeforeStop:T,preview:p}}firePreviewAndEnterSuperReach(){if(!this.currentPlan||this.previewFired)return;this.previewFired=!0,this.state="SUPER_REACH",this.stateTimer=0;const e=this.currentPlan,i=e.useRespinSurprise?e.cMidFinalTarget+1:e.cMidFinalTarget;if(this.stopGoalMid=this.computeNextModGoal(this.posMid,(i%9+9)%9,12),e.useCoralReefSpire){const s=this.getReachColumnWorldX(e.reachType);this.vfx.setCoralReefSpire(!0,s,.35)}const t=e.preview;t.kind==="bubble_normal"?(this.vfx.triggerBubblePreview(1),this.audio.playBubbles(!1)):t.kind==="bubble_big"?(this.vfx.triggerBubblePreview(2),this.audio.playBubbles(!0)):t.kind==="bubble_super"?(this.vfx.triggerBubblePreview(3),this.audio.playBubbles(!0)):t.kind==="bubble_to_gyogun"?(this.vfx.triggerBubblePreview(2),this.audio.playBubbles(!0)):t.kind==="gyogun"&&this.launchGyogun(t.theme,t.reverse,t.infinite),this.emitUi()}launchGyogun(e,i,t){this.vfx.triggerGyogunPreview({theme:e,reverse:i,infinite:t}),this.audio.playGyogun(e>=2||i||t)}update(e,i){this.stateTimer+=e,this.prevPosTop=this.posTop,this.prevPosMid=this.posMid,this.prevPosBot=this.posBot;const t=this.currentPlan;if(this.state==="SPINNING"&&t){if(!this.topStopped){const s=this.stopGoalTop-this.posTop,a=Math.max(1.9,Math.min(9.6,s*4.2));this.posTop+=a*e,this.posTop>=this.stopGoalTop-.012&&(this.posTop=this.stopGoalTop,this.topStopped=!0,this.audio.playRowStop())}if(!this.botStopped){const s=this.stopGoalBot-this.posBot,a=Math.max(1.9,Math.min(9.6,s*4));this.posBot+=a*e,this.posBot>=this.stopGoalBot-.012&&(this.posBot=this.stopGoalBot,this.botStopped=!0,this.audio.playRowStop(),t.reachType!=="none"&&this.onReachEstablished(t))}if(!this.midStopped&&this.state==="SPINNING"){const s=this.stopGoalMid-this.posMid,a=t.reachType==="none"?Math.max(2.2,Math.min(9.6,s*4)):8.4;this.posMid+=a*e,t.reachType==="none"&&this.posMid>=this.stopGoalMid-.012&&(this.posMid=this.stopGoalMid,this.midStopped=!0,this.audio.playRowStop(),this.state="IDLE",this.stateTimer=0,this.emitUi())}}else if(this.state==="REACH_WAIT_PUSH"&&t){this.posMid+=5.2*e;const s=this.stageStyle==="lagoon"?.38:2.35;this.stateTimer>=s&&this.firePreviewAndEnterSuperReach()}else if(this.state==="SUPER_REACH"&&t){t.preview.kind==="bubble_to_gyogun"&&!this.bubbleUpgradeFired&&this.stateTimer>=.92&&(this.bubbleUpgradeFired=!0,this.vfx.stopBubbles(),this.launchGyogun(t.preview.theme,!1,!1));const s=this.stopGoalMid-this.posMid;t.usePearlFlashBeforeStop&&!this.pearlPreFlashFired&&s<1.3&&(this.pearlPreFlashFired=!0,this.audio.playPearlFlash(),this.vfx.setSolarPearlFlash(!0));let a=7.4;if(s<4.8){const r=.8+.28*Math.sin(i*9.2);a=Math.max(.66,s*.92)*r}this.posMid+=a*e,this.posMid>=this.stopGoalMid-.012&&(this.posMid=this.stopGoalMid,this.audio.playRowStop(),t.useRespinSurprise?(this.state="RESPIN_SURPRISE",this.stateTimer=0,this.emitUi()):t.isWin?this.enterJackpotCelebration(t):(this.midStopped=!0,this.vfx.enterPachinkoCruiseMode(!1),this.vfx.setReachCurrent(0,!1),this.vfx.setCoralReefSpire(!1),this.state="IDLE",this.stateTimer=0,this.audio.playBgm(this.isKakuhenMode?"jackpot":"normal"),this.emitUi()))}else if(this.state==="RESPIN_SURPRISE"&&t){if(this.stateTimer>.6){const s=this.stopGoalMid-1;this.posMid-=3.4*e,this.posMid<=s+.015&&(this.posMid=s,this.enterJackpotCelebration(t))}}else this.state==="JACKPOT_CELEBRATION"&&this.stateTimer>=6&&this.finishJackpotToIdle();this.state==="IDLE"&&this.autoSpin&&this.stateTimer>.95&&this.beginSpin(),this.syncReelsToGpu(e,!1)}onReachEstablished(e){const i=e.reachType==="double_cross";this.audio.playReach(i),this.audio.playBgm("reach"),this.updateReachCurrentInOcean(e,!1),this.state="REACH_WAIT_PUSH",this.stateTimer=0,this.emitUi()}enterJackpotCelebration(e){this.midStopped=!0,this.jackpotCount++,this.isKakuhenMode=e.isKakuhenWin,this.pearlPreFlashFired||this.audio.playPearlFlash(),setTimeout(()=>{this.audio.playJackpotFanfare(e.isKakuhenWin)},320),this.audio.playBgm("jackpot"),this.vfx.setSolarPearlFlash(!0),this.vfx.stopBubbles(),this.vfx.triggerJackpotFever(e.isKakuhenWin),e.useCoralReefSpire&&this.vfx.setCoralReefSpire(!0,this.getReachColumnWorldX(e.reachType),.95),this.updateReachCurrentInOcean(e,!0),this.state="JACKPOT_CELEBRATION",this.stateTimer=0,this.emitUi()}finishJackpotToIdle(){this.vfx.setSolarPearlFlash(!1),this.vfx.setReachCurrent(0,!1),this.vfx.setCoralReefSpire(!1),this.vfx.enterPachinkoCruiseMode(!1),this.state="IDLE",this.stateTimer=0,this.emitUi()}updateReachCurrentInOcean(e,i){const t=-.5*Zt,s=.5*Zt,a=Xi.top,r=Xi.bot;if(e.reachType==="single_left")this.vfx.setReachCurrent(1,i,[t,a,t,r]);else if(e.reachType==="single_right")this.vfx.setReachCurrent(1,i,[s,a,s,r]);else if(e.reachType==="double_cross"){const n=[t,a,s,r],o=[t,r,s,a];if(i){const l=e.reachSymbols[0],h=e.winSymbol===l?n:o;this.vfx.setReachCurrent(1,!0,h)}else this.vfx.setReachCurrent(2,!1,n,o)}}syncReelsToGpu(e,i){const t=1/Math.max(e,1e-4),s=-((this.posTop-this.prevPosTop)*Zt)*t,a=-((this.posMid-this.prevPosMid)*Zt)*t,r=-((this.posBot-this.prevPosBot)*Zt)*t;this.populateRowSlots(0,this.posTop,Xi.top,_0,i),this.populateRowSlots(1,this.posMid,Xi.mid,F0,i),this.populateRowSlots(2,this.posBot,Xi.bot,I0,i),this.vfx.setReelSlotsState(this.slotsBuffer,[s,a,r],i)}populateRowSlots(e,i,t,s,a){const r=Math.ceil(i-2),n=this.state==="REACH_WAIT_PUSH"||this.state==="SUPER_REACH"||this.state==="RESPIN_SURPRISE",o=this.state==="JACKPOT_CELEBRATION",l=this.currentPlan;for(let h=0;h<5;h++){const c=r+h,u=(c%5+5)%5,g=e*5+u,p=a||this.slotLastK[e][u]!==c;this.slotLastK[e][u]=c;const x=(c-i-.5)*Zt,S=s(c),T=S-1+(p?16:0);let k=0;o&&l&&S===l.winSymbol&&Math.abs(x)<Zt*.65?k=1:n&&l&&e!==1&&Math.abs(x)<Zt*.65&&(l.reachType==="double_cross"||l.reachType==="single_left"&&x<0||l.reachType==="single_right"&&x>0)&&(k=.55);const m=g*4;this.slotsBuffer[m+0]=x,this.slotsBuffer[m+1]=t,this.slotsBuffer[m+2]=T,this.slotsBuffer[m+3]=k}}emitUi(e=!1){let i="PUSH",t=!1;(this.state==="REACH_WAIT_PUSH"||this.state==="JACKPOT_CELEBRATION")&&(i="PUSH",t=!0),this.ui.onStateChange({state:this.state,spinCount:this.spinCount,jackpotCount:this.jackpotCount,isKakuhenMode:this.isKakuhenMode,winSymbol:this.state==="JACKPOT_CELEBRATION"?this.currentPlan?.winSymbol??null:null,pushUrgent:t,pushLabel:i,forcedPreviewReset:e})}}const Xa=["reg_clear","mask_clear","neutral_buoyancy","descent_ascent","out_of_air"],O0={reg_clear:"Skill 1 · レギュレータークリア＆リカバリー",mask_clear:"Skill 2 · マスククリア（部分・完全浸水）",neutral_buoyancy:"Skill 3 · 中性浮力（フィンピボット＆ホバリング）",descent_ascent:"Skill 4 · 潜降5ステップ・耳抜き＆安全停止浮上",out_of_air:"Skill 5 · エア切れ緊急対応・オクトパス浮上",free_dive:"Free Dive · フリートレーニング＆水中散策"};class G0{engine;audio;onUpdate;active=!1;rafId=0;lastTime=0;skillId="reg_clear";step=1;completed={reg_clear:!1,mask_clear:!1,neutral_buoyancy:!1,descent_ascent:!1,out_of_air:!1};depthM=8.4;velMps=0;bcdAirSL=.45;lungLevel=.5;manualBreathTimer=0;manualBreathTarget=.5;autoBreathPhase=0;tankBar=200;usingOctopus=!1;equalizedDepthM=8.4;equalizeCount=0;regState="in_mouth";tinyBubblesOn=!1;regOutNoBubbleSec=0;pitchBias=0;targetPitchBias=0;maskFlood=0;maskFrameHeld=!1;hoverHoldSec=0;safetyStopSec=0;handSignalBanner=null;handSignalTimer=0;bubbleShutoffTimer=0;alertBeepCooldown=0;constructor(e,i,t){this.engine=e,this.audio=i,this.onUpdate=t}startLoop(){if(this.rafId!==0)return;this.lastTime=performance.now();const e=i=>{if(this.rafId===-1)return;this.rafId=requestAnimationFrame(e);const t=Math.min(.05,Math.max(.001,(i-this.lastTime)*.001));this.lastTime=i,this.active&&this.update(t)};this.rafId=requestAnimationFrame(e)}dispose(){this.active=!1,this.rafId>0&&cancelAnimationFrame(this.rafId),this.rafId=-1}setActive(e){this.active=e,this.engine.setDiverMode(e),e?this.selectSkill(this.skillId):this.engine.setDiverExhaustBubbles(0)}isActive(){return this.active}selectSkill(e){this.skillId=e,this.step=1,this.velMps=0,this.regState="in_mouth",this.tinyBubblesOn=!1,this.regOutNoBubbleSec=0,this.maskFlood=0,this.maskFrameHeld=!1,this.targetPitchBias=0,this.hoverHoldSec=0,this.safetyStopSec=0,this.usingOctopus=!1,this.equalizeCount=0,this.tankBar=200,this.engine.setFormationMode(5),this.engine.setDiverExhaustBubbles(0),e==="reg_clear"||e==="mask_clear"?(this.depthM=8.45,this.equalizedDepthM=8.45,this.bcdAirSL=.35):e==="neutral_buoyancy"?(this.depthM=8.45,this.equalizedDepthM=8.45,this.bcdAirSL=1.35):e==="descent_ascent"?(this.depthM=.2,this.equalizedDepthM=.2,this.bcdAirSL=2.6):e==="out_of_air"?(this.depthM=7.6,this.equalizedDepthM=7.6,this.bcdAirSL=2.25,this.tankBar=20,this.audio.playDiveAlertBeep()):(this.depthM=5.2,this.equalizedDepthM=5.2,this.bcdAirSL=2.05),this.emitSnapshot()}triggerInhale(){if(this.active){if(this.regState==="out"){this.showSignal("⚠️ 口にレギュレーターがありません！先にスイープ回収＆クリアしよう"),this.audio.playDiveAlertBeep();return}if(this.regState==="in_mouth_wet"){this.showSignal("💦 セカンドステージ内に水があります！先にブラストまたはパージで排水しよう"),this.audio.playDiveAlertBeep();return}this.manualBreathTarget=.98,this.manualBreathTimer=1.65,this.tankBar=Math.max(0,this.tankBar-1),this.audio.playScubaInhale(),this.skillId==="reg_clear"&&this.step===4?(this.step=5,this.showSignal("🫁 クリア後の慎重な第1呼吸OK！インストラクターにOKサインを出そう")):this.skillId==="neutral_buoyancy"&&this.step===1&&this.computeNetBuoyancy()>-.35&&(this.step=2,this.showSignal("✨ フィンピボット成功！呼吸で上半身がふわっと浮いたね。水深5.0mへ浮上してホバリングしよう！"),this.audio.playEqualizePop()),this.emitSnapshot()}}triggerExhale(e="normal"){if(this.active){if(e==="blast"){this.manualBreathTarget=.08,this.manualBreathTimer=1.2,this.audio.playRegulatorPurge(),this.triggerBubbleBurst(5,1.4),this.regState==="in_mouth_wet"&&(this.regState="in_mouth",this.skillId==="reg_clear"&&this.step===3&&(this.step=4,this.showSignal("💨 ブラストクリア成功！水が抜けたよ。慎重にひと呼吸（吸う）してみよう！"))),this.emitSnapshot();return}if(e==="nose"){this.manualBreathTarget=.12,this.manualBreathTimer=1.3,this.audio.playScubaExhale("nose"),this.triggerBubbleBurst(4,1.35),this.maskFlood>.001&&(!this.maskFrameHeld&&this.skillId==="mask_clear"?(this.showSignal("💡 先に[マスク上フレームを押さえる]をONにすると、上から空気が溜まって綺麗に抜けるよ！"),this.maskFlood=Math.max(0,this.maskFlood-.12)):(this.targetPitchBias=.18,this.maskFlood=Math.max(0,this.maskFlood-.36),this.maskFlood<=.02&&(this.maskFlood=0,this.targetPitchBias=0,this.skillId==="mask_clear"&&this.step<=3&&(this.step=4,this.showSignal("✨ マスククリア完了！視界がくっきり戻ったね。OKサインを出そう！"))))),this.emitSnapshot();return}this.manualBreathTarget=.08,this.manualBreathTimer=1.45,this.regState==="out"?(this.tinyBubblesOn=!0,this.regOutNoBubbleSec=0,this.audio.playScubaExhale("tiny"),this.engine.setDiverExhaustBubbles(4,!0)):(this.audio.playScubaExhale("normal"),this.triggerBubbleBurst(4,1.25)),this.emitSnapshot()}}triggerPurgeButton(){this.active&&(this.audio.playRegulatorPurge(),this.triggerBubbleBurst(5,1.5),this.tankBar=Math.max(0,this.tankBar-2),this.regState==="in_mouth_wet"&&(this.regState="in_mouth",this.skillId==="reg_clear"&&this.step===3&&(this.step=4,this.showSignal("💨 パージボタンクリア成功！舌で水しぶきをガードできたね。慎重に吸気しよう！"))),this.emitSnapshot())}adjustBcd(e){if(this.active){if(e){if(this.tankBar<=5&&!this.usingOctopus){this.showSignal("⚠️ タンク残圧不足！オクトパスを確保するか口頭給気しよう");return}if(this.bcdAirSL=Math.min(5.5,this.bcdAirSL+.44),this.audio.playBcdValve(!0),this.skillId==="descent_ascent"&&this.step===4&&this.depthM<=.9){this.completeCurrentSkill("🎉 潜降5ステップ・耳抜き・5m安全停止・水面BCD浮力確保すべて完璧！");return}if(this.skillId==="out_of_air"&&this.step===4&&this.depthM<=1){this.completeCurrentSkill("🎉 エア切れ緊急対応＆オクトパス安全浮上クリア！水面浮力も確保完了！");return}}else this.bcdAirSL=Math.max(0,this.bcdAirSL-.52),this.audio.playBcdValve(!1),this.triggerBubbleBurst(4,.9),this.skillId==="descent_ascent"&&this.step===1&&(this.bcdAirSL=.75,this.step=2,this.showSignal("⬇️ 潜降開始！水深が増えるので痛くなる前にこまめに[耳抜き]しながら8m砂地を目指そう"));this.emitSnapshot()}}triggerEqualize(){this.active&&(this.equalizedDepthM=this.depthM,this.equalizeCount++,this.audio.playEqualizePop(),this.showSignal(`👂 耳抜きOK！（水深 ${this.depthM.toFixed(1)}m 圧平衡完了）`),this.emitSnapshot())}triggerOkSignal(){this.active&&(this.audio.playPushButton(!1),this.showSignal("👌 ハンドシグナル：「OK！問題なし！」"),this.skillId==="reg_clear"&&this.step>=5?this.completeCurrentSkill("🎉 Skill 1 レギュレータークリア＆リカバリー合格！息を止めないルールも完璧！"):this.skillId==="mask_clear"&&this.step>=4&&this.maskFlood<=.01?this.completeCurrentSkill("🎉 Skill 2 マスククリア合格！落ち着いて鼻から排気できたね！"):this.skillId==="neutral_buoyancy"&&this.step>=3&&this.completeCurrentSkill("🎉 Skill 3 中性浮力（フィンピボット＆中層ホバリング）合格！無重力トリム最高！"),this.emitSnapshot())}handleStepAction(e){if(this.active){switch(e){case"reg_remove":{this.audio.playScubaInhale(),this.regState="out",this.tinyBubblesOn=!0,this.engine.setDiverExhaustBubbles(4,!0),this.step=2,this.showSignal("🫧 レギュレーターを外したよ！細く泡を出し続けながら[右傾きアームスイープ回収]しよう");break}case"reg_toggle_bubbles":{this.tinyBubblesOn=!this.tinyBubblesOn,this.tinyBubblesOn?(this.regOutNoBubbleSec=0,this.audio.playScubaExhale("tiny"),this.engine.setDiverExhaustBubbles(4,!0)):this.engine.setDiverExhaustBubbles(0);break}case"reg_arm_sweep":{if(this.regState!=="out")break;this.tinyBubblesOn=!0,this.audio.playScubaExhale("tiny"),this.regState="in_mouth_wet",this.step=3,this.showSignal("💪 右腕アームスイープでホース回収成功！[ブラストクリア]か[パージボタン]で水を抜こう！");break}case"reg_blast":{this.triggerExhale("blast");return}case"reg_purge":{this.triggerPurgeButton();return}case"reg_first_inhale":{this.triggerInhale();return}case"mask_flood_half":{this.maskFlood=.56,this.maskFrameHeld=!1,this.step=2,this.audio.playBubbles(!1),this.showSignal("🌊 部分浸水（55%）！口で落ち着いて呼吸し、[マスク上フレームを押さえる]をONにしよう");break}case"mask_flood_full":{this.maskFlood=1,this.maskFrameHeld=!1,this.step=2,this.audio.playBubbles(!0),this.showSignal("🌊 完全浸水（100%）！あわてず口呼吸を続け、[マスク上フレームを押さえる]をONにしよう");break}case"mask_hold_frame":{this.maskFrameHeld=!this.maskFrameHeld,this.maskFrameHeld&&this.step===2&&(this.step=3,this.targetPitchBias=.14,this.showSignal("👆 上フレーム押さえOK！[鼻からゆっくり排気]を2〜3回押してマスクの水を下から押し出そう！"));break}case"mask_nose_exhale":{this.triggerExhale("nose");return}case"buoy_lpi_pulse":{this.adjustBcd(!0),this.step===1&&this.computeNetBuoyancy()>-.45&&this.showSignal("👍 いい空気量！次に[🫁 大きく吸う]を押して、肺の浮力で体がふわっと浮くのを感じよう！");return}case"buoy_deep_inhale":{this.triggerInhale();return}case"buoy_gentle_kick_5m":{this.velMps=Math.min(this.velMps,-.18),this.bcdAirSL=2.02,this.audio.playScubaExhale("tiny"),this.showSignal("🦵 優しくフィンキック！水深 5.0m（±0.7m）ゾーンで呼吸を整えて6秒間ホバリングしよう！");break}case"desc_5point_start":{this.audio.playPushButton(!1),this.bcdAirSL=.72,this.step=2,this.showSignal("✅ 5ステップ確認完了（バディOK・方位・レギュ・残圧200bar・BCD排気）！こまめに[耳抜き]しよう！"),this.triggerBubbleBurst(4,1.2);break}case"desc_start_ascent":{this.bcdAirSL=1.98,this.velMps=-.16,this.audio.playBcdValve(!0),this.showSignal("⬆️ 浮上開始！浮上速度18m/min以下を守り、水深5.0mでピタッと止まって安全停止しよう！");break}case"desc_fin_nudge_up":{this.velMps=Math.max(-.22,this.velMps-.09),this.audio.playScubaExhale("tiny");break}case"desc_surface_inflate":{this.adjustBcd(!0);return}case"ooa_signal":{this.audio.playDiveAlertBeep(),this.step=2,this.showSignal("✋ バディへ「エア切れ」サイン伝達！黄色い予備空気源[オクトパスを咥えてパージクリア]しよう！");break}case"ooa_take_octopus":{this.usingOctopus=!0,this.tankBar=160,this.regState="in_mouth",this.audio.playRegulatorPurge(),this.triggerBubbleBurst(5,1.5),this.step=3,this.showSignal("🐙 オクトパス確保＆パージ呼吸安定（残圧160 bar）！バディと腕を組んで[👍浮上開始]しよう！");break}case"ooa_buddy_ascent":{this.bcdAirSL=2.08,this.velMps=-.16,this.step=4,this.audio.playPushButton(!1),this.showSignal("👍 バディホールド浮上中！浮上速度18m/minを超えないよう必要に応じて[BCD排気]しつつ水面へ！");break}case"ooa_surface_inflate":{this.adjustBcd(!0);return}case"signal_ok":{this.triggerOkSignal();return}case"free_mask_flood":{this.maskFlood=this.maskFlood>.1?0:.65,this.maskFrameHeld=!0,this.audio.playBubbles(!1);break}case"retry_skill":{this.selectSkill(this.skillId);return}}this.emitSnapshot()}}completeCurrentSkill(e){this.skillId!=="free_dive"&&(this.completed[this.skillId]=!0);const i=Xa.every(t=>this.completed[t]);this.audio.playPadiSkillPass(i),this.showSignal(i?"🏆 PADI Open Water 全5スキル完全習得おめでとう！！サンゴ礁の魚たちも祝福してるよ！":e),i&&this.engine.triggerPadiMasterySchool(),this.step=99,this.emitSnapshot()}showSignal(e){this.handSignalBanner=e,this.handSignalTimer=4.2}triggerBubbleBurst(e,i){this.engine.setDiverExhaustBubbles(e,!0),this.bubbleShutoffTimer=Math.max(this.bubbleShutoffTimer,i)}computeNetBuoyancy(){const e=1+this.depthM/10,i=this.bcdAirSL/e,t=(this.lungLevel-.5)*1.35;return i+t+-1.35}update(e){if(this.alertBeepCooldown>0&&(this.alertBeepCooldown-=e),this.handSignalTimer>0&&(this.handSignalTimer-=e,this.handSignalTimer<=0&&(this.handSignalBanner=null)),this.bubbleShutoffTimer>0&&!this.tinyBubblesOn&&(this.bubbleShutoffTimer-=e,this.bubbleShutoffTimer<=0&&this.engine.setDiverExhaustBubbles(0)),this.pitchBias+=(this.targetPitchBias-this.pitchBias)*(1-Math.exp(-5*e)),this.regState==="out")this.lungLevel=Math.max(.15,this.lungLevel-e*.06),this.tinyBubblesOn?this.regOutNoBubbleSec=0:this.regOutNoBubbleSec+=e;else if(this.regOutNoBubbleSec=0,this.manualBreathTimer>0)this.manualBreathTimer-=e,this.lungLevel+=(this.manualBreathTarget-this.lungLevel)*(1-Math.exp(-4.2*e));else{this.autoBreathPhase+=e*1.15;const n=.5+.28*Math.sin(this.autoBreathPhase);this.lungLevel+=(n-this.lungLevel)*(1-Math.exp(-3*e))}const t=-this.computeNetBuoyancy()*.26-this.velMps*1.85;this.velMps+=t*e,this.depthM+=this.velMps*e,this.depthM<=.15?(this.depthM=.15,this.velMps<0&&(this.velMps=0)):this.depthM>=8.5&&(this.depthM=8.5,this.velMps>0&&(this.velMps=0)),this.depthM<this.equalizedDepthM&&(this.equalizedDepthM=this.depthM);const s=Math.max(0,this.depthM-this.equalizedDepthM),a=Math.min(1,Math.max(0,(s-.65)/1.65)),r=Math.max(0,-this.velMps*60);r>18&&this.alertBeepCooldown<=0&&(this.audio.playDiveAlertBeep(),this.alertBeepCooldown=1.4),this.skillId==="neutral_buoyancy"&&this.step===2?Math.abs(this.depthM-5)<=.78&&r<=18?(this.hoverHoldSec+=e,this.hoverHoldSec>=6&&(this.hoverHoldSec=6,this.step=3,this.audio.playEqualizePop(),this.showSignal("🌟 5.0m 中層ホバリング6秒キープ達成！最後に[👌 OKサイン]を出そう！"))):this.hoverHoldSec=Math.max(0,this.hoverHoldSec-e*.35):this.skillId==="descent_ascent"&&(this.step===2&&this.depthM>=7.6?s>1.5||(this.step=3,this.velMps=0,this.audio.playEqualizePop(),this.showSignal("🏝️ 水深8m砂地に無事着底！次は18m/min以下で水深5.0mへ浮上して安全停止しよう！")):this.step===3&&Math.abs(this.depthM-5)<=.85&&Math.abs(this.velMps)<.22&&(this.safetyStopSec+=e,this.safetyStopSec>=5&&(this.safetyStopSec=5,this.step=4,this.audio.playEqualizePop(),this.showSignal("✅ 水深5m・安全停止完了！ゆっくり水面（0.8m以浅）へ浮上し、水面で[BCD給気]しよう！")))),this.engine.setDiverState(this.depthM,this.maskFlood,this.pitchBias,a),this.emitSnapshot()}buildGuidance(){const e=Math.max(0,-this.velMps*60),i=Math.max(0,this.depthM-this.equalizedDepthM);let t=null;if(this.regState==="out"&&!this.tinyBubblesOn&&this.regOutNoBubbleSec>1.2?t="⚠️ 最重要ルール：レギュレーターが口から外れている間は絶対に息を止めず、細く泡を出し続けよう！":e>18?t=`⚠️ SLOW DOWN! 浮上速度超過 (${e.toFixed(0)} m/min > 18 m/min)！[BCD排気]して減速しよう！`:i>1.55&&(t="⚠️ 耳に水圧がかかっています！潜降を止めて今すぐ[👂 耳抜き]しよう！"),this.step===99)return{stepBadge:"SKILL PASSED ✓",coachMessage:"見事合格！上のスキルタブから次のPADIスキルに挑戦するか、もう一度練習してみよう。",alertMessage:t,progressPct:100,targetDepthM:null,stepActions:[{id:"retry_skill",label:"🔄 このスキルをもう一度練習",emphasis:"primary"}]};switch(this.skillId){case"reg_clear":return this.step===1?{stepBadge:"Step 1 / 4",coachMessage:"水深8.5mの白砂底に着膝中。まずは大きく息を吸って、レギュレーターを口から外そう。",alertMessage:t,progressPct:null,targetDepthM:8.5,stepActions:[{id:"reg_remove",label:"① 吸気してレギュレーターを外す",emphasis:"primary"}]}:this.step===2?{stepBadge:"Step 2 / 4",coachMessage:"息を止めずに「ぶくぶく…」と細く泡を出し続けながら、体を少し右に傾けて右腕アームスイープでホースを回収しよう！",alertMessage:t,progressPct:null,targetDepthM:8.5,stepActions:[{id:"reg_toggle_bubbles",label:this.tinyBubblesOn?"🫧 微細排気中 (ON)":"🫧 微細排気を再開する",active:this.tinyBubblesOn},{id:"reg_arm_sweep",label:"② 右傾き・アームスイープで口に戻す",emphasis:"primary"}]}:this.step===3?{stepBadge:"Step 3 / 4",coachMessage:"レギュレーターを咥えたよ（内部に水あり）。強く息を吐く「ブラスト法」か、舌でガードして「パージボタン法」で水を抜こう！",alertMessage:t,progressPct:null,targetDepthM:8.5,stepActions:[{id:"reg_blast",label:"③A ブラストクリア（強く吐く）",emphasis:"primary"},{id:"reg_purge",label:"③B パージボタンで排水",emphasis:"primary"}]}:this.step===4?{stepBadge:"Step 4 / 4",coachMessage:"水が抜けたよ！万が一残った水滴を吸い込まないよう、最初は慎重にゆっくり息を吸ってみよう。",alertMessage:t,progressPct:null,targetDepthM:8.5,stepActions:[{id:"reg_first_inhale",label:"④ 慎重に最初の吸気をする",emphasis:"primary"}]}:{stepBadge:"Final Check",coachMessage:"呼吸バッチリ安定！インストラクターに向かって「OKサイン」を出そう！",alertMessage:t,progressPct:95,targetDepthM:8.5,stepActions:[{id:"signal_ok",label:"👌 OKサインを出して完了",emphasis:"success"}]};case"mask_clear":return this.step===1?{stepBadge:"Step 1 / 4",coachMessage:"マスクに水が入ってもレギュレーターがあれば普通に呼吸できるよ。部分浸水または完全浸水を体験してみよう！",alertMessage:t,progressPct:null,targetDepthM:8.5,stepActions:[{id:"mask_flood_half",label:"① 部分浸水させる (55%)",emphasis:"primary"},{id:"mask_flood_full",label:"① 完全浸水させる (100%)",emphasis:"primary"}]}:this.step===2?{stepBadge:"Step 2 / 4",coachMessage:"水が入って視界がぼやけたね！あわてず口呼吸を続け、マスクの上フレーム（眉間側）を軽く押さえよう。",alertMessage:t,progressPct:Math.round((1-this.maskFlood)*100),targetDepthM:8.5,stepActions:[{id:"mask_hold_frame",label:"② マスク上フレームを押さえる",emphasis:"primary",active:this.maskFrameHeld}]}:this.step===3?{stepBadge:"Step 3 / 4",coachMessage:"上フレームを押さえたまま少し上を向き、[鼻からゆっくり排気]してマスク内の水を下スカートから押し出そう！",alertMessage:t,progressPct:Math.round((1-this.maskFlood)*100),targetDepthM:8.5,stepActions:[{id:"mask_hold_frame",label:this.maskFrameHeld?"👆 上フレーム押さえ中":"👆 上フレームを押さえる",active:this.maskFrameHeld},{id:"mask_nose_exhale",label:"③ 鼻からゆっくり排気（排水）",emphasis:"primary"}]}:{stepBadge:"Step 4 / 4",coachMessage:"視界がクリアに回復したね！インストラクターへ「OKサイン」を出そう！",alertMessage:t,progressPct:100,targetDepthM:8.5,stepActions:[{id:"signal_ok",label:"👌 OKサインを出して完了",emphasis:"success"}]};case"neutral_buoyancy":{if(this.step===1){const s=this.computeNetBuoyancy();return{stepBadge:"Phase 1 · フィンピボット",coachMessage:s<-.42?"白砂底でフィン先を支点にするよ。[BCD給気 +]を短くプシュッと押して浮力を±0.3L付近に近づけよう！":"いい浮力バランス！ここで[🫁 大きく吸う]を押して、肺の空気だけで体がふわっと持ち上がるのを確認しよう！",alertMessage:t,progressPct:null,targetDepthM:8.4,stepActions:[{id:"buoy_lpi_pulse",label:"⬆️ LPI 短く給気 (+)",emphasis:s<-.42?"primary":void 0},{id:"buoy_deep_inhale",label:"🫁 大きく吸ってピボット確認",emphasis:s>=-.42?"primary":void 0}]}}if(this.step===2){const s=Math.min(100,Math.round(this.hoverHoldSec/6*100));return{stepBadge:"Phase 2 · 5m ホバリング",coachMessage:this.depthM>5.8?"[中層5mへ優しくキック浮上]または[BCD給気]で水深 5.0m (±0.7m) ゾーンへ上がり、6秒間ホバリングしよう！":"水深 5.0m ゾーン！吸う・吐くとBCD微調整で無重力ホバリングを 6秒間 キープしよう！",alertMessage:t,progressPct:s,targetDepthM:5,stepActions:[{id:"buoy_gentle_kick_5m",label:"🦵 水深5.0m帯へ優しく移動サポート",emphasis:this.depthM>5.8?"primary":void 0}]}}return{stepBadge:"Hover Mastered!",coachMessage:"完璧な中層ホバリング！サンゴを傷つけない中性浮力が身についたね。OKサインを出そう！",alertMessage:t,progressPct:100,targetDepthM:5,stepActions:[{id:"signal_ok",label:"👌 OKサインを出して完了",emphasis:"success"}]}}case"descent_ascent":{if(this.step===1)return{stepBadge:"Step 1 · 潜降5ステップ",coachMessage:"水面(0.2m)待機中。①バディOK ②方位確認 ③レギュ交換 ④時間・残圧確認 ⑤BCD排気で足からゆっくり潜降しよう！",alertMessage:t,progressPct:null,targetDepthM:8,stepActions:[{id:"desc_5point_start",label:"① 潜降5ステップ確認 ＆ BCD排気で潜降開始",emphasis:"primary"}]};if(this.step===2)return{stepBadge:"Step 2 · 耳抜き潜降",coachMessage:`白砂の海底(7.6m+)へ潜降中（耳抜き回数: ${this.equalizeCount}回）。耳が痛くなる前にこまめに[👂 耳抜き]しよう！`,alertMessage:t,progressPct:Math.min(100,Math.round(this.depthM/7.8*100)),targetDepthM:8,stepActions:[]};if(this.step===3){const s=Math.min(100,Math.round(this.safetyStopSec/5*100));return{stepBadge:"Step 3 · 5m 安全停止",coachMessage:this.depthM>5.85?"浮上速度 18m/min 以下を守って水深 5.0m へ浮上しよう！":"水深 5.0m 安全停止ゾーン！膨張する空気に気をつけて 5秒間 キープしよう！",alertMessage:t,progressPct:s,targetDepthM:5,stepActions:[{id:"desc_start_ascent",label:"⬆️ 適正速度で5mへ浮上開始",emphasis:this.depthM>6.5?"primary":void 0},{id:"desc_fin_nudge_up",label:"🦵 軽くフィンキック浮上"}]}}return{stepBadge:"Step 4 · 水面浮力確保",coachMessage:this.depthM>.9?"安全停止クリア！そのまま18m/min以下で水面(0.8m以浅)までゆっくり浮上しよう！":"水面到着！最後に[水面BCD給気]でしっかり浮力を確保して完了しよう！",alertMessage:t,progressPct:this.depthM<=.9?95:80,targetDepthM:.3,stepActions:this.depthM>.9?[{id:"desc_fin_nudge_up",label:"🦵 水面までゆっくり浮上",emphasis:"primary"}]:[{id:"desc_surface_inflate",label:"⬆️ 水面BCD給気してスキル完了！",emphasis:"success"}]}}case"out_of_air":return this.step===1?{stepBadge:"Step 1 · エア切れ合図",coachMessage:"緊急想定：水深7.6mで残圧20 bar！あわてず目の前のバディに「エア切れ」ハンドシグナルを出そう！",alertMessage:t,progressPct:null,targetDepthM:7.6,stepActions:[{id:"ooa_signal",label:"① ✋ バディに「エア切れ」サインを出す",emphasis:"warning"}]}:this.step===2?{stepBadge:"Step 2 · オクトパス確保",coachMessage:"バディが黄色いオクトパス（予備空気源）を差し出してくれたよ！受け取って咥え、パージクリアして呼吸しよう！",alertMessage:t,progressPct:null,targetDepthM:7.6,stepActions:[{id:"ooa_take_octopus",label:"② 🐙 オクトパスを咥えてパージクリア",emphasis:"primary"}]}:this.step===3?{stepBadge:"Step 3 · バディ浮上開始",coachMessage:"呼吸が安定したね（バディ残圧 160 bar）。右腕を組んでバディをホールドし、「浮上サイン(👍)」で浮上開始しよう！",alertMessage:t,progressPct:null,targetDepthM:.5,stepActions:[{id:"ooa_buddy_ascent",label:"③ 👍 バディと腕を組んで安全浮上開始",emphasis:"primary"}]}:{stepBadge:"Step 4 · オクトパス浮上",coachMessage:this.depthM>1?"バディとコンタクトを保ちながら 18 m/min 以下で水面へ浮上中！（速すぎたら[BCD排気]で調整しよう）":"無事に水面到着！[水面BCD給気]で浮力を確保してスキル完了しよう！",alertMessage:t,progressPct:Math.min(98,Math.round((7.6-this.depthM)/6.8*100)),targetDepthM:.3,stepActions:this.depthM>1?[{id:"desc_fin_nudge_up",label:"🦵 ゆっくりフィンキック補助"}]:[{id:"ooa_surface_inflate",label:"⬆️ 水面BCD給気してスキル完了！",emphasis:"success"}]};case"free_dive":default:return{stepBadge:"FREE SCUBA SANDBOX",coachMessage:"サンゴ礁ラグーン（水深0〜8.5m）を自由に潜降・中性浮力ホバリング・マスククリア体験できるよ！ドラッグで周囲を見渡してみてね。",alertMessage:t,progressPct:null,targetDepthM:null,stepActions:[{id:"free_mask_flood",label:this.maskFlood>.1?"✨ マスク瞬間クリア":"🌊 マスク浸水テスト"},{id:"reg_purge",label:"💨 パージ大排気バブル"}]}}}emitSnapshot(){const e=this.buildGuidance(),i=Math.max(0,-this.velMps*60),t=Math.max(0,this.depthM-this.equalizedDepthM),s=Xa.filter(a=>this.completed[a]).length;this.onUpdate({skillId:this.skillId,skillTitle:O0[this.skillId],stepBadge:e.stepBadge,coachMessage:e.coachMessage,alertMessage:e.alertMessage,progressPct:e.progressPct,completedSkills:{...this.completed},completedCount:s,allCertified:s===Xa.length,depthM:this.depthM,targetDepthM:e.targetDepthM,ascentRateMpm:i,ascentWarning:i>18,tankBar:this.tankBar,usingOctopus:this.usingOctopus,netBuoyancyL:this.computeNetBuoyancy(),lungPct:Math.round(this.lungLevel*100),bcdPct:Math.round(this.bcdAirSL/5.5*100),earStatus:t>1.55?"squeeze":t>.9?"caution":"ok",maskFloodPct:Math.round(this.maskFlood*100),handSignalBanner:this.handSignalBanner,stepActions:e.stepActions})}}const $a={manta:{key:"manta",jpName:"ナンヨウマンタ",okinawaTag:"石垣・慶良間の主役",enName:"Reef Manta Ray",sciName:"Mobula alfredi",sizeText:"翼幅 3.6m",description:"大きな胸ビレを羽ばたかせて優雅に空を飛ぶように泳ぐ世界最大級のエイ。サンゴの根（クリーニングステーション）に集まる。"},turtle:{key:"turtle",jpName:"アオウミガメ",okinawaTag:"慶良間ブルーの癒やし",enName:"Green Sea Turtle",sciName:"Chelonia mydas",sizeText:"甲長 1.0m",description:"沖縄のサンゴ礁や海藻場で暮らすウミガメ。前足を翼のように大きく漕いでゆったり泳ぎ、ときどき水面へ息継ぎに上がる。"},shark:{key:"shark",jpName:"ネムリブカ",okinawaTag:"沖縄名：イユワシ（おとなしい礁鮫）",enName:"Whitetip Reef Shark",sciName:"Triaenodon obesus",sizeText:"全長 1.6m",description:"背ビレと尾ビレの先端が雪のように白い沖縄サンゴ礁のサメ。昼間は海底アーチや岩陰で休むおとなしい性格。"},gurukun:{key:"gurukun",jpName:"グルクン（タカサゴ）",okinawaTag:"沖縄県の県魚",enName:"Double-lined Fusilier",sciName:"Pterocaesio digramma",sizeText:"体長 25cm（群れ）",description:"沖縄の県魚として愛される美しい回遊魚。水中では鮮やかなコバルトブルーの背中に2本の黄色いラインが輝く。"},napoleon:{key:"napoleon",jpName:"メガネモチノウオ（ナポレオンフィッシュ）",okinawaTag:"サンゴ礁の王様",enName:"Humphead Wrasse",sciName:"Cheilinus undulatus",sizeText:"全長 1.4m",description:"おでこのコブとエメラルドブルーの緻密な模様が特徴のベラ科最大種。ドロップオフ沿いを堂々とパトロールする。"},clownfish:{key:"clownfish",jpName:"カクレクマノミ",okinawaTag:"イソギンチャクと共生",enName:"Ocellaris Clownfish",sciName:"Amphiprion ocellaris",sizeText:"体長 8cm",description:"揺れるイソギンチャクの触手に守られて暮らす人気者。鮮やかなオレンジ色の体に3本の白い帯が入る。"},gardeneel:{key:"gardeneel",jpName:"チンアナゴ",okinawaTag:"白砂チャネルのアイドル",enName:"Spotted Garden Eel",sciName:"Heteroconger hassi",sizeText:"全長 35cm",description:"潮通しの良い白いサンゴ砂から上半身をひょっこり出し、水流に乗ってくるプランクトンを並んでついばむ。"}},Ve={gurukun:{name:"県魚グルクン",filletName:"グルクンの三枚おろし",grillName:"グルクンの炭火網焼き",wholeRange:"food_gurukun_whole",filletRange:"food_gurukun_fillet"},irabucha:{name:"沖縄イラブチャー",filletName:"イラブチャーの極上白身おろし",grillName:"イラブチャーの皮目パリッと炭火塩焼き",wholeRange:"food_irabucha_whole",filletRange:"food_irabucha_fillet"},taman:{name:"沖縄タマン（ハマフエフキ）",filletName:"タマンの桜色・三枚おろし",grillName:"沖縄タマンの豪快炭火マース焼き",wholeRange:"food_taman_whole",filletRange:"food_taman_fillet"},gaara:{name:"美ら海ガーラ（カスミアジ）",filletName:"美ら海ガーラの厚切りおろし",grillName:"美ら海ガーラの香ばし炭火塩焼き",wholeRange:"food_gaara_whole",filletRange:"food_gaara_fillet"},meebai:{name:"沖縄アカジンミーバイ",filletName:"アカジンミーバイの厚切り身",grillName:"高級ミーバイの炭火塩焼き",wholeRange:"food_meebai_whole",filletRange:"food_meebai_fillet"},akamachi:{name:"幻のアカマチ（ハマダイ）",filletName:"高級魚アカマチの霜降り切り身",grillName:"三大高級魚アカマチの黄金炭火焼き",wholeRange:"food_akamachi_whole",filletRange:"food_akamachi_fillet"},shellfish:{name:"美ら海シャコガイ",filletName:"殻むきシャコガイ（バター乗せ）",grillName:"シャコガイのガーリックバター浜焼き",wholeRange:"food_clam_whole",filletRange:"food_clam_half"},lobster:{name:"琉球イセエビ",filletName:"琉球イセエビの半身割り（濃厚ウニ味噌＆香草バター）",grillName:"琉球イセエビの黄金ウニ味噌・香草バター炭火焼き",wholeRange:"food_lobster_whole",filletRange:"food_lobster_half"},wagyu:{name:"特選・石垣牛A5ステーキ",filletName:"石垣牛A5サーロイン厚切り（粟国の塩＆黒胡椒仕込み）",grillName:"特選・石垣牛A5サーロインの備長炭レアステーキ",wholeRange:"food_wagyu_whole",filletRange:"food_wagyu_fillet"},skewer:{name:"沖縄アグー豚＆島野菜串",filletName:"沖縄アグー豚＆彩り島野菜のBBQブロシェット串",grillName:"沖縄アグー豚＆彩り島野菜の香ばし炭火タレ焼き串",wholeRange:"food_skewer_whole",filletRange:"food_skewer_fillet"}},Gt={gurukun:{jpName:"県魚グルクン（タカサゴ）",okinawaDialect:"グルクン",swimRange:"fish_gurukun_single",stars:1,minCm:23,maxCm:35,weightFactorK:.0145,rootDiveCapable:!1,weightProb:.25,pullStrength:.38,swimScale:1.32,culinaryNote:"沖縄の県魚！釣りたての新鮮な身はお刺身でも炭火塩焼きでも旨みたっぷり！"},irabucha:{jpName:"沖縄イラブチャー（ナンヨウブダイ）",okinawaDialect:"イラブチャー",swimRange:"food_irabucha_whole",stars:2,minCm:34,maxCm:54,weightFactorK:.0205,rootDiveCapable:!1,weightProb:.22,pullStrength:.54,swimScale:1.42,culinaryNote:"エメラルドの鱗が輝く沖縄名物の刺身魚！プリプリの白身と皮目の炙りが絶品！"},gaara:{jpName:"美ら海ガーラ（カスミアジ）",okinawaDialect:"ガーラ",swimRange:"food_gaara_whole",stars:3,minCm:38,maxCm:68,weightFactorK:.0185,rootDiveCapable:!1,weightProb:.19,pullStrength:.72,swimScale:1.48,culinaryNote:"青いヒレが美しい沖縄の好敵手！引き締まった身はお刺身も炭火焼きも最高！"},taman:{jpName:"沖縄タマン（ハマフエフキ）",okinawaDialect:"タマン",swimRange:"food_taman_whole",stars:3,minCm:44,maxCm:76,weightFactorK:.0178,rootDiveCapable:!0,weightProb:.16,pullStrength:.84,swimScale:1.52,culinaryNote:"沖縄の釣り人が憧れる強烈な引きの王者！上品な桜色の白身は刺身も浜焼きも極上！"},meebai:{jpName:"アカジンミーバイ（スジアラ）",okinawaDialect:"アカジン",swimRange:"food_meebai_whole",stars:4,minCm:46,maxCm:80,weightFactorK:.0192,rootDiveCapable:!0,weightProb:.11,pullStrength:.9,swimScale:1.54,culinaryNote:"沖縄三大高級魚の筆頭！濃厚な甘みと脂が乗った極上白身魚！"},akamachi:{jpName:"幻のアカマチ（ハマダイ）",okinawaDialect:"アカマチ",swimRange:"food_akamachi_whole",stars:5,minCm:50,maxCm:88,weightFactorK:.0138,rootDiveCapable:!0,weightProb:.07,pullStrength:.95,swimScale:1.58,culinaryNote:"沖縄三大高級魚に輝く深紅の宝石魚！とろけるお刺身と黄金の炭火焼きは至高の味わい！"}},Gs=["gurukun","irabucha","gaara","taman","meebai","akamachi"],ni={ukifukase:{shortLabel:"🦐 ウキフカセ",fullName:"🦐 オキアミ・ウキフカセ仕掛け",enticeLabel:"🦐 コマセ撒き (F)",isLure:!1,minCastM:6.2,maxCastM:13.6,sizeBonus:0,weights:{gurukun:.3,irabucha:.27,gaara:.16,taman:.15,meebai:.08,akamachi:.04}},uchikomi:{shortLabel:"🦑 大物打ち込み",fullName:"🦑 島ダコ切り身・大物打ち込み仕掛け",enticeLabel:"🔔 聞き誘い (F)",isLure:!1,minCastM:7.2,maxCastM:15.6,sizeBonus:.14,weights:{gurukun:.04,irabucha:.14,gaara:.14,taman:.36,meebai:.24,akamachi:.08}},minnow:{shortLabel:"🐟 美ら海ミノー",fullName:"🐟 美ら海シンキングミノー（リーフゲーム）",enticeLabel:"✨ トゥイッチ誘い (F)",isLure:!0,minCastM:6.8,maxCastM:15,sizeBonus:.08,weights:{gurukun:.1,irabucha:.08,gaara:.38,taman:.2,meebai:.2,akamachi:.04}},deep_glow:{shortLabel:"✨ 深場ホタルイカ",fullName:"✨ 深場ホタルイカ・発光胴突き仕掛け",enticeLabel:"✨ 発光シャクリ (F)",isLure:!0,minCastM:8,maxCastM:16.4,sizeBonus:.11,weights:{gurukun:.04,irabucha:.08,gaara:.12,taman:.18,meebai:.28,akamachi:.3}}};function z0(f,e){const i=Gt[f],t=i.weightFactorK*e*e*e/1e3,s=Math.max(.12,Math.round(t*100)/100),a=(e-i.minCm)/Math.max(1,i.maxCm-i.minCm),r=a>=.92?"SS":a>=.74?"S":a>=.46?"A":"B";return{weightKg:s,rank:r}}const ri={scrap:{name:"スクラップ",rangeName:"item_scrap",harvestSec:.75,scale:.95},clay:{name:"サンゴ粘土",rangeName:"item_clay",harvestSec:.65,scale:1.05},seaweed:{name:"沖縄海藻（モズク・海ぶどう）",rangeName:"item_seaweed",harvestSec:.55,scale:1},copper:{name:"銅鉱石",rangeName:"item_copper",harvestSec:.95,scale:1.05},iron:{name:"金属鉱石",rangeName:"item_iron",harvestSec:1.05,scale:1.1},pearl:{name:"オオシャコガイ（黒真珠＆貝身）",rangeName:"item_clam",harvestSec:1.15,scale:1.22},chest:{name:"沈没船の秘宝箱",rangeName:"item_chest",harvestSec:1.5,scale:1.15},irabucha:{name:"沖縄イラブチャー（BBQ刺身・焼き魚）",rangeName:"food_irabucha_whole",harvestSec:.75,scale:1.42},taman:{name:"沖縄タマン・ハマフエフキ（BBQ魚介）",rangeName:"food_taman_whole",harvestSec:.8,scale:1.46},gaara:{name:"美ら海ガーラ・カスミアジ（BBQ魚介）",rangeName:"food_gaara_whole",harvestSec:.78,scale:1.44},meebai:{name:"沖縄アカジンミーバイ（BBQ高級魚）",rangeName:"food_meebai_whole",harvestSec:.8,scale:1.45},akamachi:{name:"幻のアカマチ・ハマダイ（BBQ三大高級魚）",rangeName:"food_akamachi_whole",harvestSec:.9,scale:1.48},shellfish:{name:"美ら海シャコガイ（BBQ貝）",rangeName:"food_clam_whole",harvestSec:.65,scale:1.35},lobster:{name:"琉球イセエビ（BBQ高級海老）",rangeName:"food_lobster_whole",harvestSec:.85,scale:1.4}},Ot=5.08,gi=5.16,_i=[{idx:0,partId:"drink_table_0",label:"シアター前カクテルミニテーブル",x:4.18,coasterY:6.867,z:21.36,standOffsetX:-.48,standOffsetZ:.48,standYaw:-.62},{idx:1,partId:"drink_table_1",label:"ハンモック横サイドミニテーブル",x:-2.32,coasterY:6.527,z:21.1,standOffsetX:-.52,standOffsetZ:.42,standYaw:-.68},{idx:2,partId:"drink_table_2",label:"CHURA BAR 海側カクテルテーブル(西)",x:5.05,coasterY:7.367,z:24.68,standOffsetX:.56,standOffsetZ:.36,standYaw:.55},{idx:3,partId:"drink_table_3",label:"CHURA BAR 海側カクテルテーブル(東)",x:8.85,coasterY:7.367,z:24.68,standOffsetX:-.56,standOffsetZ:.36,standYaw:-.55}],Lt=[{idx:0,partId:"dining_seat_0",label:"水上リゾートダイニング・サウスチェア",x:2.6,z:16.64,seatTopY:6.575,headingYaw:0,camYaw:2.48,standX:2.6,standZ:17.24},{idx:1,partId:"dining_seat_1",label:"水上リゾートダイニング・ノースチェア",x:2.6,z:15.06,seatTopY:6.575,headingYaw:Math.PI,camYaw:-.52,standX:2.6,standZ:14.48},{idx:2,partId:"dining_seat_2",label:"水上リゾートダイニング・ウエストチェア",x:1.44,z:15.85,seatTopY:6.575,headingYaw:-Math.PI*.5,camYaw:.64,standX:.92,standZ:15.85},{idx:3,partId:"dining_seat_3",label:"水上リゾートダイニング・オーシャンビュー特等席",x:3.76,z:15.85,seatTopY:6.575,headingYaw:Math.PI*.5,camYaw:-1.18,standX:4.28,standZ:15.85},{idx:4,partId:"dining_seat_4",label:"海先端オーシャンフロント・2人掛けビストロ席",x:4.78,z:13.6,seatTopY:6.575,headingYaw:1.2,camYaw:-.78,standX:4.72,standZ:14.24}],Ka={blue:{hasStraw:!0,spinOffset:Math.atan2(-.032,-.018),mouthH:.22,mouthFwd:Math.hypot(.032,.018),gripRight:.042,gripH:.112},hibiscus:{hasStraw:!0,spinOffset:Math.atan2(.03,-.014),mouthH:.212,mouthFwd:Math.hypot(.03,.014),gripRight:.041,gripH:.098},shikuwasa:{hasStraw:!0,spinOffset:Math.atan2(.028,-.014),mouthH:.214,mouthFwd:Math.hypot(.028,.014),gripRight:.04,gripH:.098},mango:{hasStraw:!0,spinOffset:Math.atan2(.03,-.012),mouthH:.218,mouthFwd:Math.hypot(.03,.012),gripRight:.042,gripH:.11},awamori:{hasStraw:!1,spinOffset:0,mouthH:.118,mouthFwd:.047,gripRight:.046,gripH:.064},beer:{hasStraw:!1,spinOffset:0,mouthH:.184,mouthFwd:.048,gripRight:.084,gripH:.095},highball:{hasStraw:!1,spinOffset:0,mouthH:.171,mouthFwd:.041,gripRight:.04,gripH:.086}},hr=[5,12.5,27,54.3,109,238,424,635],dr=[1.1696,.8618,.6527,.5043,.4187,.3798,.3594,.349],ur=[.5578,.6514,.7222,.7825,.8126,.8434,.8693,.891],vi=1.01325,ja=.0627,zs=(vi-ja)*.79,U0=.82;class Qa{engine;audio;onUpdate;active=!1;disposed=!1;rafId=0;lastTime=0;elapsed=0;cleanupListeners=null;worldAsset=null;pos=[-4.15,7.43,25.85];vel=[0,0,0];yaw=-2.62;pitch=-.14;diverHeadingYaw=.35;hasMoveHeadingInput=!1;moveHeadingTargetYaw=.35;lookDir=[.495,-.14,.861];camPosOut=[-6.15,8.32,22.85];camDirOut=[.495,-.14,.861];bubbleOriginOut=[-4.15,7.43,25.85];cameraMode="tpv";tpvDistance=2.65;trimMode="auto";targetBodyTrimDeg=90;curBodyTrimDeg=90;keys=new Set;harvestingHeld=!1;breathBubbleTimer=2.5;cylinderVolL=10;tankAirLiters=2e3;apneaSec=45;maxApneaSec=45;warned100Bar=!1;warned50Bar=!1;wasAtSurface=!1;flashlightOn=!1;inventory={scrap:0,clay:0,seaweed:0,copper:0,iron:0,pearl:0};totalCollected=0;seafoodStock={gurukun:2,irabucha:1,taman:1,gaara:1,meebai:1,akamachi:0,shellfish:2,lobster:1,wagyu:2,skewer:2};boardItem=null;knifeChopTimer=0;knifeAnimDuration=.88;activeKnifeMode="fish_deba";pendingBoardFilletReveal=!1;tongsActionSlot=-1;tongsActionTimer=0;grillSlots=[null,null,null];platedItems=[];bbqEatTimer=0;lastEatenKind="gurukun";lastEatenSashimi=!1;bbqBuffActive=!1;totalBbqEaten=0;bbqAmbientSizzleTimer=0;gurukunCatchProgress=0;activeLieSpot=null;activeDiningSeat=null;tipsyGlowSec=0;savorGlowSec=0;catchJoySec=0;lastEatenCharred=!1;fishingSavedSeaYaw=-.68;virtualDashLatch=!1;onOpenYoutubeChillCallback=null;hudSwimKickPhase=0;hudSwimEffort=0;hammockMat=O();staticGlassIdentityMat=O();zenNorthDoorLMat=O();zenNorthDoorRMat=O();zenSouthDoorLMat=O();zenSouthDoorRMat=O();bbqKnifeMat=O();bbqTongsMat=O();bbqBoardFoodMat=O();bbqCoolerFishMat=O();bbqCoolerExtraMat=O();bbqPairingDrinkMat=O();bbqPairingDrink="beer";bbqPairingSipsLeft=3;bbqPairingSipAnimTimer=0;bbqGrillFoodMats=[O(),O(),O()];bbqSmokeMats=[O(),O(),O()];bbqPlateFoodMats=[O(),O(),O(),O()];bbqDiningPlateFoodMats=[O(),O(),O(),O()];bbqDiningDrinkMat=O();bbqHandFoodMat=O();fishingPhase="inactive";fishingRig="ukifukase";fishingPhaseTimer=0;fishingWaitDuration=2.4;fishingNibbleDuration=1.6;fishingNextNibbleBeep=.35;fishingCastCharging=!1;fishingCastHoldSec=0;fishingCastPower=0;fishingCastDirSign=1;fishingCastTickBucket=-1;fishingValidMinDistM=6.2;fishingValidMaxDistM=13.6;fishingSweetSpotMinPct=72;fishingSweetSpotMaxPct=88;fishingTideRipPos=[-2.25,5.466,11.45];fishingCastPreviewPos=[-2.25,5.468,11.45];fishingLastCastQuality="none";fishingAttraction=0;fishingTwitchCooldown=0;fishingTwitchAnim=0;fishingCriticalHook=!1;fishingStamina=100;fishingSwimDir=0;fishingRootDive=!1;fishingDirChangeTimer=1.6;fishingRodLeanUiDir=0;fishingSmoothedRodLean=0;fishingCounterChimeCooldown=0;fishingDragScreamTimer=0;fishingReelHeld=!1;fishingReelTickTimer=0;fishingTension=0;fishingStartDistM=8.8;fishingDistM=8.8;fishingSurgeTimer=1.6;fishingSurgeDuration=0;fishingTargetKind="gurukun";fishingTargetCm=28;fishingFloatTarget=[.5,5.46,12.2];fishingFloatPos=[.5,5.46,12.2];fishingRodTipWorld=[-5.8,7.6,14.4];fishingFishPos=[1.2,4.75,12];fishingFishDir=[-1,0,0];fishingStalkers=[0,1,2].map(e=>({kind:"gurukun",cm:28,angleOffset:e*2.09,orbitSpeed:.95+e*.22,radiusM:2.1+e*.55,depthOffset:e*.18,pos:[.5,4.8,12.2],dir:[-1,0,0],mat:O()}));fishingSplashTimer=0;fishingSplashPos=[.5,5.46,12.2];fishingTotalCaught=0;fishingBestCm={gurukun:0,irabucha:0,taman:0,gaara:0,meebai:0,akamachi:0};fishingBestKg={gurukun:0,irabucha:0,taman:0,gaara:0,meebai:0,akamachi:0};fishingBestRank={gurukun:null,irabucha:null,taman:null,gaara:null,meebai:null,akamachi:null};fishingLastCatch=null;fishingRodMat=O();fishingPierStandRodMat=O();fishingPierStandFloatMat=O();fishingFloatMat=O();fishingLineMatA=O();fishingLineMatB=O();fishingLineLeaderMat=O();fishingFishMat=O();fishingSplashMat=O();fishingTideRingOuterMat=O();fishingTideRingInnerMat=O();fishingCastPreviewMat=O();fishingWakeMat=O();static OKI_REEL_STRIPS=[[0,1,2,3,1,2,5,4,2,1,6,3,2,1,2,4,5,1,2,3,1],[0,2,1,3,5,2,1,4,2,1,6,2,3,1,5,2,1,3,2,1,4],[0,1,2,3,1,2,4,1,2,3,6,1,2,5,4,1,2,3,1,2,5]];okiMachineIdx=0;okiMedals=150;okiCredit=50;okiInvestedMedals=200;okiBetCount=0;okiState="idle";okiReelAngles=[0,0,0];okiReelTargetAngles=[0,0,0];okiReelStops=[0,0,0];okiReelsStopped=[!0,!0,!0];okiReelsSlipping=[!1,!1,!1];okiReelBlackout=[!1,!1,!1];okiBlackoutTargetCount=0;okiSpinFlag="lose";okiPendingBonus=null;okiActiveBonus=null;okiBonusEarned=0;okiBonusTarget=0;okiOneGRenStock=0;okiSideLedHintCode=0;okiSideLedHintTimer=0;okiHibiscusLit=!1;okiHibiscusPattern="normal_alt";okiPostNotify=!1;okiHeavenMode=!0;okiGamesSinceBonus=14;okiTotalSpins=128;okiBigCount=3;okiRegCount=1;okiHistory=[{games:7,kind:"BIG"},{games:19,kind:"BIG"},{games:41,kind:"REG"},{games:47,kind:"BIG"}];okiLastPayout=0;wasInsideZenCampusArea=!1;zenTransitionToastCooldown=0;zenNorthAutoDoorT=0;zenSouthAutoDoorT=0;zenNorthDoorActive=!1;zenSouthDoorActive=!1;okiLeverAnimTimer=0;okiFanfareTimer=0;okiWinLineFlashTimer=0;okiReplayFreeBet=!1;okiStatusText="🌺 MAX BET ＆ レバーON（Space / 3Dレバー）で商用30Φ沖スロ『華閃光 BLACK-30』スタート！（左BAR狙いでチェリー＆スイカフォロー！）";okiCabinetMats=[O(),O()];okiHibiscusLMats=[O(),O()];okiHibiscusRMats=[O(),O()];okiReelMats=[[O(),O(),O()],[O(),O(),O()]];okiLeverMats=[O(),O()];okiStopBtnMats=[[O(),O(),O()],[O(),O(),O()]];okiMedalPileMats=[O(),O()];unlockedUpgrades={titanium_hook:!1,swim_fins:!1,scuba_tank:!1,dive_light:!1,treasure_sonar:!1};discovered={manta:!1,turtle:!1,shark:!1,gurukun:!1,napoleon:!1,clownfish:!1,gardeneel:!1};focusedAgentId=null;focusHoldSec=0;newlyLoggedFlashSec=0;faunaObserveAgentId=null;faunaObserveCycleIdx=0;harvestTargetId=null;harvestProgressSec=0;lastScrapeTick=0;hookSwingPhase=0;pickupToast=null;pickupToastTimer=0;lootNodes=[];faunaAgents=[];hookMat=O();headBoneMat=O();chestBoneMat=O();hipsBoneMat=O();leftFootBoneMat=O();rightFootBoneMat=O();localGearOffMat=O();backTankMat=O();bcdVestMat=O();regHosesMat=O();diveMaskMat=O();weightBeltMat=O();leftFinMat=O();rightFinMat=O();boatTankMatA=O();boatTankMatB=O();boatBenchBcdMat=O();clubTankMat=O();clubMountedBcdMat=O();clubLooseBcdMat=O();clubLooseRegMat=O();clubLooseBeltMat=O();clubLooseMaskMat=O();rinseMaskMat=O();clubLooseFinLMat=O();clubLooseFinRMat=O();suitRackKeramaMat=O();suitRackHibiscusMat=O();suitRackGoldMat=O();barDrinkHandMat=O();barCounterDrinkMat=O();barShakerMat=O();wbLocalTmpMat=O();wbValveWheelMat=O();wbOringMat=O();wbCamBandMat=O();wbCamLeverMat=O();wbReg1stMat=O();wbYokeScrewMat=O();wbDustCapMat=O();wbLpiCouplerMat=O();wbSpgConsoleMat=O();wbSpgNeedleMat=O();wbPurgeRegMat=O();wbAirJetMatA=O();wbAirJetMatB=O();wornValveWheelMat=O();wornCamBandMat=O();wornCamLeverMat=O();wornYokeScrewMat=O();leftWristBoneMat=O();diveCompMat=O();wbDiveCompMat=O();fpvDiveCompMat=O();rayOriginTmp=[0,0,0];rayDirTmp=[0,0,-1];drawCalls=[];dcScreen="main";dcGasMix="air21";dcWristGlance=!1;dcFpvWristBlend=0;dcTissueN2=Array.from({length:8},()=>zs);dcCnsO2=0;dcDiveActive=!1;dcDiveTimeSec=0;dcSurfaceHoldSec=0;dcSurfIntervalSec=0;dcMaxDepthM=0;dcDepthSumM=0;dcDepthWeightSec=0;dcMinTempC=28.4;dcWaterTempC=28.4;dcProfileTimer=0;dcProfileSamples=[];dcSafetyStopArmed=!1;dcSafetyStopActive=!1;dcSafetyStopCleared=!1;dcSafetyStopSecLeft=180;dcSafetyStopMissedWarn=!1;dcLockedHeadingDeg=null;dcDiveNumber=1;dcSpotPeakName="慶良間サンゴ庭園";dcPiezoCooldown=0;onToggleDiveCompUiCallback=null;dcDiveLogs=[];wearingWetsuit=!1;wearingWeightBelt=!1;wearingScubaUnit=!1;wearingMaskAndFins=!1;suitVariant="kerama_5mm";bcdVariant="jacket_cyan";finVariant="cyan_split";activeBarDrink=null;placedDrinkTableIdx=null;hasCompletedDive=!1;shikuwasaRelaxBonus=!1;seatedStoolIndex=null;barPrepTimer=0;barSipTimer=0;barSipsLeft=0;barSipStartFill=1;barSipTargetFill=1;inspectFocus="none";inspectOrbitYaw=.25;inspectOrbitPitch=-.18;inspectDist=.72;inspectTarget=[-4.65,7.62,27.48];curInspectCamPos=[-4.15,7.95,26.65];curInspectCamTarget=[-4.65,7.62,27.48];inspectCamBlend=0;lastMouseClientX=-1;lastMouseClientY=-1;mouseDownClientX=0;mouseDownClientY=0;mouseDragMoved=!1;hoveredPartId=null;draggedPartId=null;hoveredPartHud=null;tankStampVerified=!1;valveBlownOut=!1;valveBlowOutTimer=0;oringCondition="salted_nicked";bcdPlacedOnTank=!1;bcdAzimuthDeg=42;bcdHeightCm=-6.5;camStrapWet=!1;camBuckleLocked=!1;tankSlipTimer=0;tankSlippedUnderwater=!1;headBonkCooldown=0;dustCapRemoved=!1;regPlacedOnValve=!1;regOrientationReversed=!0;yokeScrewPct=12;lpiConnected=!1;spgFaceDown=!1;valveTurns=0;lineBar=0;smoothedSpgNeedleBar=0;purgeHeld=!1;inhaleTestTimer=0;yokeLeaking=!1;leakHissTimer=0;airFlowVerified=!1;maskGelApplied=!1;maskDefogged=!1;maskRinseDipTimer=0;maskFogLevel=0;maskClearTimer=0;maskFloodAnim=0;equalizedAta=1;earSqueeze=0;earWarnCooldown=0;bcdAirStdL=0;prevDepthM=0;ascentRateMpm=0;ascentWarnCooldown=0;halfOpenWarnCooldown=0;gearSteps={tank_check:!1,bcd_mount:!1,reg_first_stage:!1,lpi_connect:!1,valve_open:!1};bwrafSteps={b:!1,w:!1,r:!1,a:!1,f:!1};waistStrapLocked=!1;chestStrapLocked=!1;shoulderStrapPct=22;weightKg=4;bcdSurfaceAirPct=0;entryMode=null;entryTimer=0;entrySplashFired=!1;wasAboveSurface=!0;surfaceTreading=!1;activePoseStyle="land_walk";constructor(e,i,t){this.engine=e,this.audio=i,this.onUpdate=t,this.initFaunaPopulation(),this.initLootNodes(),this.updateBenchTankMatrices(),this.engine.onOkinawaWorldReady(s=>{this.worldAsset=s,this.snapNodesToTerrain(),this.updateBenchTankMatrices()}),this.bindControls()}startLoop(){if(this.rafId!==0||this.disposed)return;this.lastTime=performance.now();const e=i=>{if(this.disposed)return;this.rafId=requestAnimationFrame(e);const t=Math.min(.05,Math.max(.001,(i-this.lastTime)*.001));this.lastTime=i,this.active&&this.update(t)};this.rafId=requestAnimationFrame(e)}dispose(){this.disposed=!0,this.active=!1,this.rafId!==0&&(cancelAnimationFrame(this.rafId),this.rafId=0),this.cleanupListeners&&(this.cleanupListeners(),this.cleanupListeners=null)}setActive(e){this.active=e,e?(this.engine.setFreeSwimMode(!0,(i,t)=>this.handleMouseDelta(i,t),i=>{if(this.inspectFocus!=="none")this.inspectDist=Math.max(.38,Math.min(2.85,this.inspectDist+i*.0012));else if(this.cameraMode==="tpv"||this.activeLieSpot!==null){const t=this.activeLieSpot!==null?1.65:.95;this.tpvDistance=Math.max(t,Math.min(6.4,this.tpvDistance+i*.0032))}}),this.updateLookVector(),this.syncCameraAndVrm(.016),this.emitSnapshot(null,null)):(this.keys.clear(),this.harvestingHeld=!1,document.pointerLockElement===this.engine.getCanvas()&&document.exitPointerLock(),this.engine.setFreeSwimMode(!1))}toggleCameraMode(){if(this.activeLieSpot!==null){this.cameraMode="tpv",document.pointerLockElement===this.engine.getCanvas()&&document.exitPointerLock();const e=Math.cos(this.yaw)<0;if(this.activeLieSpot==="hammock")this.yaw=e?-.32:2.82,this.pitch=e?-.2:-.18,this.tpvDistance=2.85;else{const i=this.activeLieSpot==="daybed_1"?1:-1;this.yaw=e?.42*i:2.66*i,this.pitch=e?-.22:-.17,this.tpvDistance=2.8}return this.updateLookVector(),this.audio.playPushButton(!1),this.showToast(e?"🌊 三人称オーシャンビュー視点に切り替えたよ！（ドラッグで360°自由回転）":"🎬 三人称フロント＆ビーチシアター視点に切り替えたよ！（ドラッグで360°自由回転）"),this.cameraMode}return this.cameraMode==="tpv"?(this.cameraMode="fpv",this.yaw=this.diverHeadingYaw,this.updateLookVector()):(this.cameraMode="tpv",this.diverHeadingYaw=this.yaw,document.pointerLockElement===this.engine.getCanvas()&&document.exitPointerLock()),this.audio.playPushButton(!1),this.showToast(this.cameraMode==="tpv"?"🎥 Clusterスタイル三人称視点（ドラッグ/矢印で360°自由カメラ・WASDで移動方向へ転回）に切替！":"🤿 一人称視点（ダイブマスク主観モード）に切替！"),this.cameraMode}setCameraMode(e){this.cameraMode!==e&&this.toggleCameraMode()}setBodyTrimManual(e){this.trimMode="manual",this.targetBodyTrimDeg=Math.max(-25,Math.min(90,e))}setBodyTrimAuto(){this.trimMode="auto",this.showToast("⚖️ ダイバー姿勢：泳ぎに合わせた『自動連動トリム』に設定！")}setVirtualMoveKey(e,i){i?((e==="KeyW"||e==="KeyA"||e==="KeyS"||e==="KeyD")&&(this.seatedStoolIndex!==null&&this.standUpFromBarStool(),this.activeDiningSeat!==null&&this.standUpFromDiningChair(),this.activeLieSpot!==null&&this.standUpFromLieSpot(),this.inspectFocus==="zen_caption"&&this.setInspectFocus("none"),(e==="KeyW"||e==="KeyS")&&!this.fishingCastCharging&&(this.fishingPhase==="ready"||this.fishingPhase==="landed")&&this.stopFishingMode()),this.keys.add(e)):this.keys.delete(e)}releaseAllVirtualMoveKeys(){for(const e of["KeyW","KeyA","KeyS","KeyD","Space","KeyC"])this.keys.delete(e)}toggleVirtualDash(){return this.virtualDashLatch=!this.virtualDashLatch,this.audio.playGearClick(this.virtualDashLatch?2:1),this.virtualDashLatch}isActive(){return this.active}toggleFlashlight(){this.flashlightOn=!this.flashlightOn,this.audio.playPushButton(!1),this.showToast(this.flashlightOn?"🔦 水中ライト ON（深場のサンゴや沈没船の本来の色が浮かび上がるよ！）":"🔦 水中ライト OFF")}notifyTimeOfDayChanged(e,i){if((e==="night"||e==="midnight")&&this.pos[1]<5.35&&!this.flashlightOn){this.flashlightOn=!0,this.showToast(`${i}（🔦 水中ライトを自動ONにしたよ！）`);return}this.showToast(i)}refillAirToFull(){this.cylinderVolL=this.unlockedUpgrades.scuba_tank?14:10,this.tankAirLiters=this.cylinderVolL*200,this.apneaSec=this.maxApneaSec,this.warned100Bar=!1,this.warned50Bar=!1}setOnOpenYoutubeChill(e){this.onOpenYoutubeChillCallback=e}focusBeachCinemaBoard(){this.faunaObserveAgentId=null,this.entryMode=null,this.seatedStoolIndex=null,this.activeLieSpot=null,this.activeDiningSeat=null,this.bbqEatTimer=0,this.barPrepTimer=0,this.barSipTimer=0,this.inspectFocus="none",this.fishingPhase="inactive",this.fishingReelHeld=!1,this.surfaceTreading=!1,this.wearingScubaUnit&&(this.wearingScubaUnit=!1),this.vel[0]=0,this.vel[1]=0,this.vel[2]=0;const e=6.38,i=22.95,t=Math.max(6.12,this.getTerrainY(e,i));this.pos[0]=e,this.pos[1]=t+.91,this.pos[2]=i,this.yaw=.4,this.pitch=-.05,this.diverHeadingYaw=.58,this.tpvDistance=2.45,this.curBodyTrimDeg=90,this.activePoseStyle="land_walk",this.wasAboveSurface=!0,this.setWristGlanceQuiet(!1),this.cameraMode="tpv",this.audio.playGearClick(2),this.showToast("🎬 ビーチ・チルアウトシアター前へ移動！竹フレームの3DスクリーンでYouTube動画＆音楽を楽しもう♪"),this.updateLookVector()}teleportToSpot(e){if(this.faunaObserveAgentId=null,this.entryMode=null,this.seatedStoolIndex=null,this.activeLieSpot=null,this.activeDiningSeat=null,this.bbqEatTimer=0,this.barPrepTimer=0,this.barSipTimer=0,this.inspectFocus="none",this.fishingPhase="inactive",this.fishingReelHeld=!1,this.surfaceTreading=!1,this.vel[0]=0,this.vel[1]=0,this.vel[2]=0,e==="okislot_corner"){this.sitAtOkiSlot(0);return}if(e==="fishing_pier"){this.startFishingMode(!0);return}if(e==="zen_campus"){this.wearingScubaUnit&&(this.wearingScubaUnit=!1),this.pos[0]=-1.6,this.pos[1]=6.4+.91,this.pos[2]=56.6,this.yaw=-.02,this.pitch=.05,this.diverHeadingYaw=0,this.tpvDistance=3.1,this.curBodyTrimDeg=90,this.activePoseStyle="land_walk",this.wasAboveSurface=!0,this.wasInsideZenCampusArea=!0,this.setWristGlanceQuiet(!1),this.cameraMode="tpv",this.audio.playGearClick(1),this.showToast("🎓 深い森に囲まれた静寂の『ZEN大学 校舎』——誰ひとりいない無人のキャンパスに、木々のざわめきだけが響いている。"),this.pickupToastTimer=6.5,this.updateLookVector();return}if(e==="beach_bbq"){this.wearingScubaUnit&&(this.wearingScubaUnit=!1),this.pos[0]=2.95,this.pos[1]=6.12+.91,this.pos[2]=21.26,this.yaw=.08,this.pitch=-.15,this.diverHeadingYaw=0,this.tpvDistance=3.05,this.curBodyTrimDeg=90,this.activePoseStyle="land_walk",this.wasAboveSurface=!0,this.setWristGlanceQuiet(!1),this.cameraMode="tpv",this.audio.playGearClick(2),this.showToast("🍖 ビーチBBQ＆水上リゾートダイニングへ移動！備長炭で焼いたご馳走を奥のオーシャンフロント水上テーブル席でゆったり味わおう♪"),this.updateLookVector();return}if(e==="clubhouse"){this.pos[0]=-4.15,this.pos[1]=6.52+.91,this.pos[2]=25.85,this.yaw=-2.62,this.pitch=-.11,this.diverHeadingYaw=Math.PI,this.tpvDistance=3.15,this.curBodyTrimDeg=90,this.activePoseStyle="land_walk",this.wasAboveSurface=!0,this.setWristGlanceQuiet(!1),this.refillAirToFull(),this.cameraMode="tpv",this.audio.playGearClick(1),this.showToast("🏠 陸の沖縄ダイビング・クラブハウスへ移動！目の前の作業台でスーツ・BCD・フィン選び＆器材セッティングができるよ！"),this.updateLookVector();return}else if(e==="chura_bar"){this.pos[0]=6.09,this.pos[1]=6.52+.91,this.pos[2]=25.45,this.yaw=-3.02,this.pitch=-.07,this.diverHeadingYaw=Math.PI,this.tpvDistance=2.65,this.curBodyTrimDeg=90,this.activePoseStyle="land_walk",this.wasAboveSurface=!0,this.setWristGlanceQuiet(!1),this.cameraMode="tpv",this.audio.playGearClick(2),this.showToast("🍹 『CHURA BAR』カウンター前に到着！3Dスツールをクリック（またはEキー）して席に座り、ボトルやカクテルを注文しよう！"),this.updateLookVector();return}else if(e==="boat_deck"){this.pos[0]=-9.5,this.pos[1]=6.03+.91,this.pos[2]=6.15,this.yaw=-.68,this.pitch=-.11,this.diverHeadingYaw=0,this.tpvDistance=2.85,this.curBodyTrimDeg=90,this.activePoseStyle="land_walk",this.wasAboveSurface=!0,this.setWristGlanceQuiet(!1),this.refillAirToFull(),this.cameraMode="tpv",this.audio.playGearClick(1),this.showToast("🚤 桟橋の先の沖縄ダイビングボートへ移動！船尾からジャイアントストライドやバックロールでエントリーしよう！"),this.updateLookVector();return}else if(e==="beach_shore"){const i=this.getTerrainY(-2.2,21.6);this.pos[0]=-2.2,this.pos[1]=Math.max(5.75,i)+.91,this.pos[2]=21.6,this.yaw=-.22,this.pitch=-.12,this.diverHeadingYaw=0,this.curBodyTrimDeg=90,this.activePoseStyle="land_walk",this.wasAboveSurface=!0,this.setWristGlanceQuiet(!1),this.refillAirToFull(),this.cameraMode="tpv",this.audio.playGearClick(2),this.showToast("🏖️ クラブハウス前の白砂ビーチへ移動！そのまま波打ち際へ歩いてビーチエントリーしよう！"),this.updateLookVector();return}else e==="raft"?(this.pos[0]=9.2,this.pos[1]=2.2,this.pos[2]=8.8,this.yaw=.45,this.pitch=-.16,this.refillAirToFull(),this.showToast("🛟 木製ダイビングラフト浅瀬エリアへ移動！")):e==="manta_station"?(this.pos[0]=6.2,this.pos[1]=-.3,this.pos[2]=-1.2,this.yaw=-.95,this.pitch=-.08,this.showToast("🦅 石垣・マンタクリーニングステーションの根へ移動！")):e==="coral_garden"?(this.pos[0]=0,this.pos[1]=-1.8,this.pos[2]=4.6,this.yaw=0,this.pitch=-.14,this.showToast("🐢 慶良間サンゴ庭園＆チンアナゴの白砂水路へ移動！")):e==="stone_arch"?(this.pos[0]=-9.2,this.pos[1]=-1.6,this.pos[2]=-.8,this.yaw=.82,this.pitch=-.12,this.showToast("🪨 宮古ブルー・海底ロックアーチ（ネムリブカの通り道）へ移動！")):e==="shipwreck"&&(this.pos[0]=-1.2,this.pos[1]=-4.2,this.pos[2]=-12.2,this.yaw=-.52,this.pitch=-.26,this.flashlightOn=!0,this.showToast(this.wearingScubaUnit&&this.gearSteps.valve_open?"⚓ 沈没木造船ディープトレンチへ移動！（水深が深いのでボイルの法則でエア消費が少し早くなるよ！）":"⚓ 沈没木造船へ移動！（💡今は素潜り状態！『⏭️ 講習スキップ』でフル装備200barにできるよ！）"));this.wasAboveSurface=!1,this.activePoseStyle="swim",this.wearingScubaUnit&&this.gearSteps.valve_open&&(this.audio.playScubaExhale("tiny"),this.engine.setDiverExhaustBubbles(4,!0)),this.updateLookVector()}observeFaunaUpClose(e){const i=this.faunaAgents.filter(a=>a.species===e);if(i.length===0)return;const t=i[this.faunaObserveCycleIdx%i.length];this.faunaObserveCycleIdx++,this.entryMode=null,this.seatedStoolIndex=null,this.barPrepTimer=0,this.barSipTimer=0,this.inspectFocus="none",this.vel[0]=0,this.vel[1]=0,this.vel[2]=0,(!this.wearingScubaUnit||!this.gearSteps.valve_open)&&this.autoCompleteAllGearAndBcd(),this.maskDefogged=!0,this.maskFogLevel=0,this.earSqueeze=0,this.refillAirToFull(),this.cameraMode="fpv",this.flashlightOn=!0,this.wasAboveSurface=!1,this.faunaObserveAgentId=t.id,this.snapDiverToObservedFauna(t);const s=Math.max(.5,5.45-this.pos[1]);this.equalizedAta=1+s/10,this.bcdAirStdL=3.2*this.equalizedAta,this.audio.playSonarScanLock(),this.showToast(`🔍 『${$a[e].jpName}』の目の前へ移動！（WASDでいつでも自由遊泳に戻れるよ）`)}snapDiverToObservedFauna(e){const i=Math.hypot(e.curDir[0],e.curDir[2])||1,t=e.curDir[0]/i,s=e.curDir[2]/i,a=-s,r=t;let n=1,o=1.4,l=.35,h=0;e.species==="manta"?(n=1.95,o=2.75,l=.88):e.species==="turtle"?(n=1.05,o=1.48,l=.56):e.species==="shark"?(n=1.32,o=1.88,l=.3):e.species==="napoleon"?(n=.82,o=1.65,l=.18):e.species==="gurukun"?(n=.95,o=1.85,l=.24):e.species==="clownfish"?(this.pos[0]=e.orbitCenter[0]+.14,this.pos[1]=e.baseY+.16,this.pos[2]=e.orbitCenter[2]+.78,h=.04):e.species==="gardeneel"&&(this.pos[0]=e.curPos[0]+.34,this.pos[1]=e.curPos[1]+.48,this.pos[2]=e.curPos[2]+.96,h=.28),e.species!=="clownfish"&&e.species!=="gardeneel"&&(this.pos[0]=e.curPos[0]+t*n+a*o,this.pos[1]=Math.min(Ot-.15,e.curPos[1]+l),this.pos[2]=e.curPos[2]+s*n+r*o);const c=(e.species==="clownfish"?e.orbitCenter[0]:e.curPos[0])-this.pos[0],u=(e.species==="clownfish"?e.baseY:e.curPos[1])+h-this.pos[1],g=(e.species==="clownfish"?e.orbitCenter[2]:e.curPos[2])-this.pos[2],p=Math.hypot(c,u,g)||1;this.pitch=Math.asin(Math.max(-.92,Math.min(.92,u/p))),this.yaw=Math.atan2(-c/p,-g/p),this.diverHeadingYaw=this.yaw,this.updateLookVector()}syncDerivedGearStepFlags(){const e=this.gearSteps.tank_check,i=this.gearSteps.bcd_mount,t=this.gearSteps.reg_first_stage,s=this.gearSteps.lpi_connect;this.gearSteps.tank_check=this.tankStampVerified&&this.valveBlownOut&&this.oringCondition==="clean_seated",this.gearSteps.bcd_mount=this.bcdPlacedOnTank&&Math.abs(this.bcdAzimuthDeg)<=22&&Math.abs(this.bcdHeightCm)<=3&&this.camBuckleLocked,this.gearSteps.reg_first_stage=this.dustCapRemoved&&this.regPlacedOnValve&&!this.regOrientationReversed&&this.yokeScrewPct>=62&&this.yokeScrewPct<=90,this.gearSteps.lpi_connect=this.lpiConnected&&this.bcdPlacedOnTank&&this.regPlacedOnValve&&!this.regOrientationReversed,this.gearSteps.valve_open=this.valveTurns>=2.4&&this.lineBar>=170&&!this.yokeLeaking&&this.airFlowVerified,this.isWorkbenchFocus()&&(!e&&this.gearSteps.tank_check&&this.inspectFocus==="wb_valve"?this.setInspectFocus("wb_bcd"):this.inspectFocus==="wb_bcd"&&this.bcdPlacedOnTank&&Math.abs(this.bcdAzimuthDeg)<=22&&Math.abs(this.bcdHeightCm)<=3&&!this.camBuckleLocked&&Math.abs(this.inspectOrbitYaw)<.75?(this.inspectOrbitYaw=1.24,this.inspectDist=.86):!i&&this.gearSteps.bcd_mount&&this.inspectFocus==="wb_bcd"?this.setInspectFocus("wb_reg"):this.inspectFocus==="wb_reg"&&this.regPlacedOnValve&&(this.regOrientationReversed&&Math.abs(this.inspectOrbitYaw-.36)>.35?(this.inspectTarget[0]=-4.7,this.inspectTarget[1]=7.83,this.inspectTarget[2]=27.44,this.inspectOrbitYaw=.36,this.inspectDist=.68):!this.regOrientationReversed&&(this.yokeScrewPct<62||this.yokeScrewPct>90)&&this.inspectOrbitYaw<.78&&(this.inspectTarget[0]=-4.7,this.inspectTarget[1]=7.83,this.inspectTarget[2]=27.45,this.inspectOrbitYaw=1.12,this.inspectDist=.64)),!t&&this.gearSteps.reg_first_stage&&this.inspectFocus==="wb_reg"?this.setInspectFocus("wb_lpi"):!s&&this.gearSteps.lpi_connect&&this.inspectFocus==="wb_lpi"&&(this.maskDefogged?this.setInspectFocus("wb_spg"):this.maskGelApplied?this.setInspectFocus("wb_rinse"):this.setInspectFocus("wb_lpi")))}isWorkbenchFocus(e=this.inspectFocus){return e==="wb_valve"||e==="wb_bcd"||e==="wb_reg"||e==="wb_lpi"||e==="wb_rinse"||e==="wb_spg"}setInspectFocus(e){if(e!=="none"&&document.pointerLockElement===this.engine.getCanvas()&&document.exitPointerLock(),this.inspectFocus=e,this.isWorkbenchFocus(e)&&(this.seatedStoolIndex=null,(this.pos[1]<5.6||Math.hypot(this.pos[0]- -4.15,this.pos[2]-25.85)>9.5)&&(this.pos[0]=-4.15,this.pos[1]=6.52+.91,this.pos[2]=25.85,this.vel[0]=0,this.vel[1]=0,this.vel[2]=0,this.wasAboveSurface=!0),this.wearingScubaUnit&&(this.wearingScubaUnit=!1),this.cameraMode="tpv"),e==="wb_valve")this.inspectTarget[0]=-4.7,this.inspectTarget[1]=7.83,this.inspectTarget[2]=27.5,this.inspectOrbitYaw=.16,this.inspectOrbitPitch=-.14,this.inspectDist=.56;else if(e==="wb_bcd")this.bcdPlacedOnTank?(this.inspectTarget[0]=-4.72,this.inspectTarget[1]=7.56,this.inspectTarget[2]=27.46,this.inspectOrbitYaw=Math.abs(this.bcdAzimuthDeg)<=22&&Math.abs(this.bcdHeightCm)<=3&&!this.camBuckleLocked?1.24:.28,this.inspectOrbitPitch=-.18,this.inspectDist=.92):(this.inspectTarget[0]=-4.26,this.inspectTarget[1]=7.52,this.inspectTarget[2]=27.44,this.inspectOrbitYaw=-.26,this.inspectOrbitPitch=-.2,this.inspectDist=1.1);else if(e==="wb_reg")this.regPlacedOnValve?this.regOrientationReversed?(this.inspectTarget[0]=-4.7,this.inspectTarget[1]=7.83,this.inspectTarget[2]=27.44,this.inspectOrbitYaw=.36,this.inspectOrbitPitch=-.16,this.inspectDist=.68):(this.inspectTarget[0]=-4.7,this.inspectTarget[1]=7.83,this.inspectTarget[2]=27.45,this.inspectOrbitYaw=1.12,this.inspectOrbitPitch=-.16,this.inspectDist=.64):(this.inspectTarget[0]=-4.34,this.inspectTarget[1]=7.58,this.inspectTarget[2]=27.38,this.inspectOrbitYaw=-.26,this.inspectOrbitPitch=-.22,this.inspectDist=.84);else if(e==="wb_lpi")this.lpiConnected&&!this.maskDefogged?this.maskGelApplied?(this.inspectFocus="wb_rinse",this.inspectTarget[0]=-8.8,this.inspectTarget[1]=7.28,this.inspectTarget[2]=30.18,this.inspectOrbitYaw=.22,this.inspectOrbitPitch=-.3,this.inspectDist=1.42):(this.inspectTarget[0]=-3.76,this.inspectTarget[1]=7.28,this.inspectTarget[2]=27.06,this.inspectOrbitYaw=-.14,this.inspectOrbitPitch=-.34,this.inspectDist=.78):(this.inspectTarget[0]=-4.68,this.inspectTarget[1]=7.54,this.inspectTarget[2]=27.26,this.inspectOrbitYaw=-.24,this.inspectOrbitPitch=-.2,this.inspectDist=.76);else if(e==="wb_rinse")this.inspectTarget[0]=-8.8,this.inspectTarget[1]=7.2,this.inspectTarget[2]=30.18,this.inspectOrbitYaw=.2,this.inspectOrbitPitch=-.36,this.inspectDist=1.32;else if(e==="wb_spg")this.inspectTarget[0]=-4.86,this.inspectTarget[1]=7.5,this.inspectTarget[2]=27.24,this.inspectOrbitYaw=-.16,this.inspectOrbitPitch=-.34,this.inspectDist=1.08;else if(e==="buddy_bwraf")this.seatedStoolIndex=null,this.cameraMode="tpv",this.inspectOrbitYaw=.35,this.inspectOrbitPitch=-.1,this.inspectDist=1.68;else if(e==="bar_seat"){const t=3.85+(this.seatedStoolIndex??2)*1.12;this.cameraMode="tpv",this.inspectTarget[0]=t+.04,this.inspectTarget[1]=7.86,this.inspectTarget[2]=26.54,this.inspectOrbitYaw=-2.18,this.inspectOrbitPitch=-.11,this.inspectDist=1.26}else if(e==="bar_bottles")this.cameraMode="tpv",this.inspectTarget[0]=5.42,this.inspectTarget[1]=7.86,this.inspectTarget[2]=27.5,this.inspectOrbitYaw=-.12,this.inspectOrbitPitch=-.1,this.inspectDist=.92;else if(e==="okislot"){const i=this.okiMachineIdx===1?11.96:11.18;this.seatedStoolIndex=null,this.activeLieSpot=null,this.fishingPhase="inactive",this.fishingReelHeld=!1,this.wearingScubaUnit&&(this.wearingScubaUnit=!1);const t=this.engine.getVrmAvatar(),s=t.getSeatedContactHeight(),a=t.getSeatedForwardScoot(.218);this.pos[0]=i,this.pos[1]=7.178+.88-s,this.pos[2]=26.36+a,this.vel[0]=0,this.vel[1]=0,this.vel[2]=0,this.diverHeadingYaw=Math.PI,this.yaw=Math.PI,this.pitch=-.04,this.curBodyTrimDeg=90,this.wasAboveSurface=!0,this.activePoseStyle="bar_sit",this.cameraMode="tpv",this.inspectTarget[0]=i,this.inspectTarget[1]=7.468,this.inspectTarget[2]=27.145,this.inspectOrbitYaw=0,this.inspectOrbitPitch=-.02,this.inspectDist=.88}else e==="bbq_station"?(this.seatedStoolIndex=null,this.activeLieSpot=null,this.activeDiningSeat=null,this.wearingScubaUnit&&(this.wearingScubaUnit=!1),this.pos[0]=2.15,this.pos[1]=6.12+.91,this.pos[2]=21.18,this.diverHeadingYaw=0,this.cameraMode="tpv",this.inspectTarget[0]=2.82,this.inspectTarget[1]=6.84,this.inspectTarget[2]=20.35,this.inspectOrbitYaw=Math.PI-.03,this.inspectOrbitPitch=-.48,this.inspectDist=2.02):e==="zen_caption"&&(this.seatedStoolIndex=null,this.activeLieSpot=null,this.pos[0]=-1.6,this.pos[1]=6.42+.91,this.pos[2]=39.25,this.diverHeadingYaw=0,this.cameraMode="tpv",this.inspectTarget[0]=-1.6,this.inspectTarget[1]=7.76,this.inspectTarget[2]=36.62,this.inspectOrbitYaw=Math.PI,this.inspectOrbitPitch=-.015,this.inspectDist=1.56);this.audio.playGearClick(1)}getInspectFocus(){return this.inspectFocus}resetInspectCameraAngle(){this.inspectFocus!=="none"&&(this.setInspectFocus(this.inspectFocus),this.showToast("🔄 現在の3D操作箇所が一番見やすい正面アングルにリセットしたよ！"))}quickWearAllAssembledGear(){this.seatedStoolIndex!==null&&this.standUpFromBarStool(),this.bcdPlacedOnTank||(this.bcdPlacedOnTank=!0,this.bcdAzimuthDeg=0,this.bcdHeightCm=0,this.camStrapWet=!0,this.camBuckleLocked=!0),this.inspectFocus="none",this.wearingWetsuit=!0,this.weightKg=this.suitVariant==="hibiscus_3mm"?3:4,this.wearingWeightBelt=!0,this.wearingScubaUnit=!0,this.waistStrapLocked=!0,this.chestStrapLocked=!0,this.shoulderStrapPct=50,this.wearingMaskAndFins=!0,this.lpiConnected&&this.lineBar>15&&(this.bcdAirStdL=7,this.bcdSurfaceAirPct=54),this.syncDerivedGearStepFlags(),this.audio.playGearClick(3),this.showToast("✨ ウェットスーツ・適正ウエイト・3Dタンク背負い・3点バックル密着・マスク＆フィンを一括装着したよ！次は③BWRAF確認へ！")}executeNextGuidedSetupStep(){if(!this.tankStampVerified)return this.inspectFocus!=="wb_valve"&&this.setInspectFocus("wb_valve"),this.verifyTankStamp(),"gear";if(!this.valveBlownOut&&!this.regPlacedOnValve)return this.inspectFocus!=="wb_valve"&&this.setInspectFocus("wb_valve"),this.blowOutTankValve(),"gear";if(this.oringCondition!=="clean_seated")return this.inspectFocus!=="wb_valve"&&this.setInspectFocus("wb_valve"),this.inspectAndReplaceOring(),"gear";if(!this.bcdPlacedOnTank)return this.inspectFocus!=="wb_bcd"&&this.setInspectFocus("wb_bcd"),this.placeOrRemoveBcdOnTank(),"gear";if(Math.abs(this.bcdAzimuthDeg)>22||Math.abs(this.bcdHeightCm)>3)return this.inspectFocus!=="wb_bcd"&&this.setInspectFocus("wb_bcd"),this.alignBcdToIdeal(),"gear";if(!this.camBuckleLocked)return this.inspectFocus!=="wb_bcd"&&this.setInspectFocus("wb_bcd"),this.toggleWetAndLockCamBuckle(),"gear";if(!this.dustCapRemoved&&!this.regPlacedOnValve)return this.inspectFocus!=="wb_reg"&&this.setInspectFocus("wb_reg"),this.toggleDustCap(),"gear";if(!this.regPlacedOnValve)return this.inspectFocus!=="wb_reg"&&this.setInspectFocus("wb_reg"),this.placeOrRemoveReg1st(),"gear";if(this.regOrientationReversed)return this.inspectFocus!=="wb_reg"&&this.setInspectFocus("wb_reg"),this.flipRegOrientation(),"gear";if(this.yokeScrewPct<62||this.yokeScrewPct>90)return this.inspectFocus!=="wb_reg"&&this.setInspectFocus("wb_reg"),this.adjustYokeScrew(76-this.yokeScrewPct),this.audio.playGearClick(2),this.showToast("🔩 3Dヨークスクリューを指2本で手締め（76% 適正トルク◎）！"),"gear";if(!this.lpiConnected)return this.inspectFocus!=="wb_lpi"&&this.setInspectFocus("wb_lpi"),this.toggleLpiCoupler(),"gear";if(!this.maskDefogged)return this.maskGelApplied?this.defogMaskAtRinseTank():this.applyMaskDefogGel(),"gear";if(!this.spgFaceDown&&this.valveTurns<.2)return this.inspectFocus!=="wb_spg"&&this.setInspectFocus("wb_spg"),this.toggleSpgFaceDown(),"gear";if(this.valveTurns<2.4)return this.inspectFocus!=="wb_spg"&&this.setInspectFocus("wb_spg"),this.turnTankValve(3-this.valveTurns),"gear";if(!this.airFlowVerified)return this.inspectFocus!=="wb_spg"&&this.setInspectFocus("wb_spg"),this.triggerRegInhaleTest(),"gear";if(!(this.wearingWetsuit&&this.wearingWeightBelt&&this.wearingScubaUnit&&this.wearingMaskAndFins&&this.waistStrapLocked&&this.chestStrapLocked&&this.shoulderStrapPct>=35&&this.shoulderStrapPct<=68))return this.quickWearAllAssembledGear(),this.setInspectFocus("buddy_bwraf"),"bwraf";const i=["b","w","r","a","f"];for(const t of i)if(!this.bwrafSteps[t])return this.inspectFocus!=="buddy_bwraf"&&this.setInspectFocus("buddy_bwraf"),this.toggleBwrafStep(t),this.bwrafSteps.f?"entry":"bwraf";return"entry"}resetGearSetupToBench(){this.inspectFocus="none",this.wearingWetsuit=!1,this.wearingWeightBelt=!1,this.wearingScubaUnit=!1,this.wearingMaskAndFins=!1,this.tankStampVerified=!1,this.valveBlownOut=!1,this.valveBlowOutTimer=0,this.oringCondition="salted_nicked",this.bcdPlacedOnTank=!1,this.bcdAzimuthDeg=42,this.bcdHeightCm=-6.5,this.camStrapWet=!1,this.camBuckleLocked=!1,this.tankSlipTimer=0,this.tankSlippedUnderwater=!1,this.dustCapRemoved=!1,this.regPlacedOnValve=!1,this.regOrientationReversed=!0,this.yokeScrewPct=12,this.lpiConnected=!1,this.spgFaceDown=!1,this.valveTurns=0,this.lineBar=0,this.smoothedSpgNeedleBar=0,this.purgeHeld=!1,this.inhaleTestTimer=0,this.yokeLeaking=!1,this.airFlowVerified=!1,this.maskGelApplied=!1,this.maskDefogged=!1,this.maskRinseDipTimer=0,this.maskFogLevel=0,this.maskClearTimer=0,this.maskFloodAnim=0,this.equalizedAta=1,this.earSqueeze=0,this.bcdAirStdL=0,this.bwrafSteps.b=!1,this.bwrafSteps.w=!1,this.bwrafSteps.r=!1,this.bwrafSteps.a=!1,this.bwrafSteps.f=!1,this.waistStrapLocked=!1,this.chestStrapLocked=!1,this.shoulderStrapPct=22,this.bcdSurfaceAirPct=0,this.activeBarDrink=null,this.seatedStoolIndex=null,this.barPrepTimer=0,this.barSipTimer=0,this.barSipsLeft=0,this.refillAirToFull(),this.syncDerivedGearStepFlags(),this.engine.setDiverExhaustBubbles(0),this.engine.setOkinawaOptics(0,0,0),this.audio.playGearClick(0),this.showToast("👙 最初の『水着・未組立』状態にリセットしたよ！3D作業台に近づいて実際にパーツを触って組み立てよう！")}autoCompleteAllGearAndBcd(){this.seatedStoolIndex!==null&&this.standUpFromBarStool(),this.inspectFocus="none",this.tankStampVerified=!0,this.valveBlownOut=!0,this.oringCondition="clean_seated",this.bcdPlacedOnTank=!0,this.bcdAzimuthDeg=0,this.bcdHeightCm=0,this.camStrapWet=!0,this.camBuckleLocked=!0,this.tankSlippedUnderwater=!1,this.dustCapRemoved=!0,this.regPlacedOnValve=!0,this.regOrientationReversed=!1,this.yokeScrewPct=76,this.lpiConnected=!0,this.spgFaceDown=!1,this.valveTurns=3,this.refillAirToFull(),this.lineBar=200,this.smoothedSpgNeedleBar=200,this.yokeLeaking=!1,this.airFlowVerified=!0,this.wearingWetsuit=!0,this.wearingWeightBelt=!0,this.wearingScubaUnit=!0,this.wearingMaskAndFins=!0,this.maskGelApplied=!0,this.maskDefogged=!0,this.maskFogLevel=0,this.waistStrapLocked=!0,this.chestStrapLocked=!0,this.shoulderStrapPct=52,this.weightKg=this.suitVariant==="hibiscus_3mm"?3:4,this.bcdAirStdL=6.5,this.bcdSurfaceAirPct=50,this.bwrafSteps.b=!0,this.bwrafSteps.w=!0,this.bwrafSteps.r=!0,this.bwrafSteps.a=!0,this.bwrafSteps.f=!0,this.syncDerivedGearStepFlags(),this.audio.playValveOpenHiss(),this.audio.playPadiSkillPass(!1),this.showToast("⏭️ 全3D器材セッティング＆着用完了！Oリング交換・カムロック・1st手締め・バルブ全開200bar・曇り止め・BWRAF全てOK！")}setWearingScubaGear(e){e?this.autoCompleteAllGearAndBcd():this.resetGearSetupToBench()}completeGearStep(e){const i={tank_check:"wb_valve",bcd_mount:"wb_bcd",reg_first_stage:"wb_reg",lpi_connect:"wb_lpi",valve_open:"wb_spg"};this.setInspectFocus(i[e])}verifyTankStamp(){this.tankStampVerified=!0,this.syncDerivedGearStepFlags(),this.audio.playGearClick(1),this.showToast("🔍 3Dタンク肩部の打刻を確認：『DOT-3AL80 · 耐圧検査 2026.08合格 · 常用圧力 200 bar』期限内OK！")}blowOutTankValve(){if(this.regPlacedOnValve){this.audio.playDiveAlertBeep(),this.showToast("⚠️ すでに1stステージが付いているよ！ゴミ飛ばしブローは1stステージ装着前に行おう！");return}this.valveBlowOutTimer=.65,this.valveBlownOut=!0,this.tankAirLiters=Math.max(0,this.tankAirLiters-2),this.syncDerivedGearStepFlags(),this.audio.playValveOpenHiss(),this.showToast("💨 プシュッ！！バルブを0.5秒だけほんの少し開け、高圧エアーで口元の塩粒と水滴を吹き飛ばしたよ！")}inspectAndReplaceOring(){if(this.regPlacedOnValve){this.audio.playDiveAlertBeep(),this.showToast("⚠️ 1stステージが被さっていてOリングに触れないよ！先に1stステージを外そう！");return}this.oringCondition==="salted_nicked"?(this.oringCondition="clean_seated",this.tankStampVerified=!0,this.syncDerivedGearStepFlags(),this.audio.playGearClick(2),this.showToast(this.valveBlownOut?"⭕ 傷＆塩噛みしていたOリングを取り外し、シリコングリス付きの新品Oリングを溝にピタッと装着！①完了！":"⭕ 新品の黒いOリングに交換したよ！（💡先に『💨 0.5秒ブロー』で口元のゴミも飛ばしておこう！）")):(this.oringCondition="salted_nicked",this.syncDerivedGearStepFlags(),this.audio.playGearClick(0),this.showToast("🧪 練習用トラブル再現：バルブ口に『傷・塩噛みOリング』をセットしたよ！（このまま開栓すると高圧リークするよ）"))}placeOrRemoveBcdOnTank(){if(!this.bcdPlacedOnTank)this.bcdPlacedOnTank=!0,this.syncDerivedGearStepFlags(),this.audio.playGearClick(2),this.showToast("🎒 3DタンクにBCDを通したよ！まだ向きがズレて位置も低いから、バルブ穴と向きを合わせ肩ラインまで持ち上げよう！");else{if(this.regPlacedOnValve&&this.lpiConnected){this.audio.playDiveAlertBeep(),this.showToast("⚠️ LPI中圧ホースが繋がっているからBCDを抜けないよ！先にLPIカプラーを外そう！");return}this.bcdPlacedOnTank=!1,this.camBuckleLocked=!1,this.syncDerivedGearStepFlags(),this.audio.playGearClick(0),this.showToast("🎒 タンクからBCDを抜いて作業台マットに置いたよ")}}adjustBcdAlignment(e,i){if(this.bcdPlacedOnTank||(this.bcdPlacedOnTank=!0),this.camBuckleLocked){this.audio.playDiveAlertBeep(),this.showToast("🔒 カムバックルがロックされているから動かないよ！調整する時はバックルを開けよう！");return}this.bcdAzimuthDeg=(this.bcdAzimuthDeg+e+540)%360-180,this.bcdHeightCm=Math.max(-8,Math.min(10,this.bcdHeightCm+i)),Math.abs(this.bcdAzimuthDeg)<3.5&&e!==0&&(this.bcdAzimuthDeg=0),Math.abs(this.bcdHeightCm)<.45&&i!==0&&(this.bcdHeightCm=0),this.syncDerivedGearStepFlags()}alignBcdToIdeal(){this.bcdPlacedOnTank||(this.bcdPlacedOnTank=!0),this.camBuckleLocked&&(this.camBuckleLocked=!1),this.bcdAzimuthDeg=0,this.bcdHeightCm=0,this.syncDerivedGearStepFlags(),this.audio.playGearClick(2),this.showToast("📐 BCDの背中プレートをバルブ穴（Oリング面）と正面0°に合わせ、襟の高さをタンク肩ライン（0cm）にピタッと揃えたよ！")}toggleWetAndLockCamBuckle(){if(!this.bcdPlacedOnTank){this.placeOrRemoveBcdOnTank();return}this.camStrapWet=!0,this.camBuckleLocked=!this.camBuckleLocked,this.tankSlippedUnderwater=!1,this.syncDerivedGearStepFlags(),this.audio.playGearClick(this.camBuckleLocked?3:0),this.camBuckleLocked?Math.abs(this.bcdAzimuthDeg)>22?this.showToast(`⚠️ カムバックルを締めたけど、BCDの向きがバルブ穴から ${Math.round(this.bcdAzimuthDeg)}° ズレているよ！`):this.bcdHeightCm<-3?this.showToast(`⚠️ カムバックルを締めたけど、タンク位置が低め（${this.bcdHeightCm.toFixed(1)}cm）！海中で後頭部にバルブが当たりやすいよ！`):this.bcdHeightCm>3?this.showToast(`⚠️ カムバックルを締めたけど、BCDが高め（+${this.bcdHeightCm.toFixed(1)}cm）だよ！`):this.showToast("🔒 ナイロンベルトを濡らしてピンと引き、3Dカムバックルレバーを『カチンッ！』と2段階ロック完了！揺すってもビクともしないよ◎"):this.showToast("🔓 カムバックルレバーを起こしてベルトを緩めたよ（高さと向きを調整可能）")}toggleDustCap(){if(this.regPlacedOnValve){this.audio.playDiveAlertBeep(),this.showToast("⚠️ 1stステージがバルブに付いている間はダストキャップを閉められないよ！");return}this.dustCapRemoved=!this.dustCapRemoved,this.syncDerivedGearStepFlags(),this.audio.playGearClick(1),this.showToast(this.dustCapRemoved?"🎩 1stステージの黒いダストキャップを外したよ！（水洗いする時は必ず水滴を飛ばしてもう一度閉めよう！）":"🎩 ダストキャップをヨーク吸気口にしっかり被せて密閉したよ！（これで真水洗いしても1st内部に水が入らない◎）")}placeOrRemoveReg1st(){if(this.regPlacedOnValve){if(this.lineBar>5){this.audio.playDiveAlertBeep(),this.showToast(`⛔ 高圧ロック中（現在 ${Math.round(this.lineBar)} bar）！200気圧の力で固着していて外せないよ！先に『バルブ全閉 → パージボタン減圧』しよう！`);return}if(this.yokeScrewPct>30){this.audio.playDiveAlertBeep(),this.showToast("🔩 まだヨークスクリューが締まっているよ！T字ネジを反時計回りに緩めてから外そう！");return}this.lpiConnected&&(this.lpiConnected=!1),this.regPlacedOnValve=!1,this.syncDerivedGearStepFlags(),this.audio.playGearClick(0),this.showToast("🔧 バルブから1stステージを取り外したよ！水洗い前にダストキャップを閉めるのを忘れずに！")}else{if(!this.dustCapRemoved){this.audio.playDiveAlertBeep(),this.showToast("⚠️ 黒いダストキャップが付いたままだとバルブに嵌まらないよ！先に3Dダストキャップをクリックして外そう！");return}if(this.bcdPlacedOnTank&&Math.abs(this.bcdAzimuthDeg)>95){this.audio.playDiveAlertBeep(),this.showToast("⚠️ BCDが裏表逆向きについていて1stステージと干渉するよ！先にBCDの向きを直そう！");return}this.regPlacedOnValve=!0,this.yokeScrewPct=18,this.syncDerivedGearStepFlags(),this.audio.playGearClick(2),this.showToast("🔧 Kバルブに1stステージのヨークを被せたよ！ホースの左右向きを確認してヨークスクリューを『指2本の手締め』しよう！")}}flipRegOrientation(){if(this.regPlacedOnValve||(this.dustCapRemoved=!0,this.regPlacedOnValve=!0),this.lineBar>5||this.yokeScrewPct>45){this.audio.playDiveAlertBeep(),this.showToast("🔩 ヨークスクリューが締まっているから回らないよ！少し緩めてから向きを変えよう！");return}this.regOrientationReversed=!this.regOrientationReversed,this.regOrientationReversed&&(this.lpiConnected=!1),this.syncDerivedGearStepFlags(),this.audio.playGearClick(2),this.showToast(this.regOrientationReversed?"⚠️ 1stステージが左右逆向き（左にメインレギュ／右に残圧計）になったよ！これだとLPIホースが届かずマウスピースも上下逆になるよ！":"✅ 正しい向きにセット！（背負った時に右肩＝メイン2nd＆黄色オクトパス ／ 左側＝SPG残圧計＆LPI中圧ホース◎）")}adjustYokeScrew(e){if(!this.regPlacedOnValve){if(!this.dustCapRemoved){this.showToast("⚠️ 先に3Dダストキャップを外して1stステージをバルブに被せよう！");return}this.regPlacedOnValve=!0}if(e<0&&this.lineBar>5){this.audio.playDiveAlertBeep(),this.showToast(`⛔ ライン残圧 ${Math.round(this.lineBar)} bar が掛かっていてヨークネジがビクともしないよ！先にバルブを閉めてパージボタンで0 barに抜こう！`);return}e<0&&this.yokeScrewPct>92&&this.showToast("💦 締めすぎて固着気味だったヨークネジをなんとか緩めたよ！（次は指2本の腹で75%前後の手締めにしよう！）"),this.yokeScrewPct=Math.max(0,Math.min(100,this.yokeScrewPct+e)),this.syncDerivedGearStepFlags()}toggleLpiCoupler(){if(!this.bcdPlacedOnTank||!this.regPlacedOnValve){this.audio.playDiveAlertBeep(),this.showToast("⚠️ 先にタンクへBCDとレギュレーター1stステージを取り付けよう！");return}if(this.regOrientationReversed&&!this.lpiConnected){this.audio.playDiveAlertBeep(),this.showToast("⚠️ 1stステージが左右逆向きだから、中圧LPIホースが反対側に出ていてBCDインフレーターに届かないよ！");return}this.lpiConnected=!this.lpiConnected,this.syncDerivedGearStepFlags(),this.audio.playGearClick(this.lpiConnected?3:0),this.showToast(this.lpiConnected?"🔌 カチッ！！中圧（LPI）カプラーのスリーブを引いてBCDインフレーターに確実にロック！軽く引っ張っても抜けない◎":"🔌 スリーブを引いて中圧（LPI）ホースをBCDインフレーターから切り離したよ")}toggleSpgFaceDown(){this.spgFaceDown=!this.spgFaceDown,this.audio.playGearClick(1),this.showToast(this.spgFaceDown?"📟 残圧計（SPG）のガラス文字盤を下向きに伏せたよ！（万一の高圧ガラス破損から目と顔を守るPADI安全手順◎）":`📟 残圧計（SPG）を表に返したよ！現在の3D針指示：${Math.round(this.smoothedSpgNeedleBar)} bar`)}turnTankValve(e){const i=this.valveTurns;this.valveTurns=Math.max(0,Math.min(3,this.valveTurns+e)),i<=.03&&this.valveTurns>.03?(this.audio.playValveOpenHiss(),this.regPlacedOnValve&&!this.spgFaceDown&&this.lineBar<20&&this.showToast("💡 ワンポイント：高圧バルブを開ける瞬間は『残圧計のガラス面を伏せて』から開けるとさらに安全だよ！"),this.regPlacedOnValve||(this.valveBlownOut=!0,this.valveBlowOutTimer=Math.max(this.valveBlowOutTimer,.45))):i<2.85&&this.valveTurns>=2.85?(this.audio.playGearClick(2),this.showToast("🔓 タンクバルブ反時計回りに全開（3.0回転）！残圧計を表に向けて200 barを確認し、パージ／吸気テストで針が振れないか試そう！")):i>.03&&this.valveTurns<=.03&&(this.audio.playGearClick(0),this.showToast(this.lineBar>5?`🔒 タンクバルブを閉めたよ！（まだ1stステージ内に ${Math.round(this.lineBar)} bar 残っているから、外すなら黄色いパージボタンで抜こう！）`:"🔒 タンクバルブを全閉にしたよ")),this.syncDerivedGearStepFlags()}setPurgeHeld(e){e&&!this.purgeHeld&&(this.lineBar>3?this.audio.playValveOpenHiss():this.audio.playGearClick(0)),this.purgeHeld=e}triggerRegInhaleTest(){if(!this.regPlacedOnValve){this.audio.playDiveAlertBeep(),this.showToast("⚠️ まだ1stステージがタンクに付いていないよ！");return}if(this.lineBar<5){this.audio.playDiveAlertBeep(),this.showToast("😶 マウスピースを吸ったけど空気が来ないよ！（タンクバルブが閉まっているよ！）");return}if(this.inhaleTestTimer=1.05,this.audio.playScubaInhale(),this.yokeLeaking){this.showToast("⚠️ シューシュー高圧リーク中！バルブを閉めてパージ減圧してからOリングとヨーク手締めを直そう！");return}if(this.valveTurns<2.2){this.audio.playDiveAlertBeep(),this.showToast(`⚠️ 注目！！吸った瞬間に3D残圧計の針がガクッと落ちたよ！バルブが半開き（${this.valveTurns.toFixed(1)}/3.0回転）の証拠！全開まで回そう！`);return}this.airFlowVerified=!0,this.spgFaceDown&&(this.spgFaceDown=!1),this.syncDerivedGearStepFlags(),this.showToast("✅ スーッ…プハァ！吸っても3D残圧針は 200 bar でピタッと不動・異臭なし！①〜⑤全組立パーフェクト完了！")}applyMaskDefogGel(){this.maskGelApplied=!0,this.audio.playGearClick(2),this.isWorkbenchFocus()&&this.setInspectFocus("wb_rinse"),this.showToast("🧴 3Dダイブマスクの強化ガラス内側に曇り止めジェルを指でクルクル塗り込んだよ！次は目の前の真水洗い槽をクリックしてサッとすすごう！")}defogMaskAtRinseTank(){this.maskGelApplied=!0,this.maskDefogged=!0,this.maskFogLevel=0,this.maskRinseDipTimer=.65,this.audio.playBubbles(!1),this.showToast("💧 真水洗い槽に3Dマスクをジャブッとくぐらせて水すすぎ完了！（海中で曇らない◎ 次は⑤バルブ開栓＆残圧確認へ！）"),this.isWorkbenchFocus()&&this.gearSteps.lpi_connect&&this.inspectFocus!=="wb_rinse"&&this.setInspectFocus("wb_spg")}rinseGearPostDive(){!this.regPlacedOnValve&&!this.dustCapRemoved?(this.audio.playBubbles(!1),this.audio.playPadiSkillPass(!1),this.showToast("🚿 ダストキャップ密閉よし！真水洗い槽でレギュレーターとBCDの塩分をしっかり洗い流したよ！完璧な後片付け◎")):!this.regPlacedOnValve&&this.dustCapRemoved?(this.audio.playDiveAlertBeep(),this.showToast("😱 あっ！！ダストキャップを開けたまま真水槽に浸けちゃダメ！1stステージ内部フィルターに水が入って故障・残圧計曇りの原因になるよ！")):this.defogMaskAtRinseTank()}toggleWearWetsuit(){this.wearingWetsuit=!this.wearingWetsuit,this.audio.playGearClick(1),this.showToast(this.wearingWetsuit?"🖤 沖縄ウェットスーツ＆マリンブーツを着用！（浮力が増えるから適正ウエイトベルトも忘れずに！）":"👙 ウェットスーツを脱いで水着・裸足に戻ったよ")}toggleWearWeightBelt(){this.wearingWeightBelt=!this.wearingWeightBelt,this.wearingWeightBelt&&this.weightKg===0&&(this.weightKg=this.suitVariant==="hibiscus_3mm"?3:4),this.audio.playGearClick(2),this.showToast(this.wearingWeightBelt?`⚖️ ウエイトベルト (${this.weightKg}kg) をBCDの下敷きにならないよう『右手クイックリリース』の向きで腰骨に装着！`:"⚖️ ウエイトベルトを外したよ")}toggleWearScubaUnit(){if(this.wearingScubaUnit)this.wearingScubaUnit=!1,this.engine.setDiverExhaustBubbles(0),this.audio.playGearClick(0),this.showToast("🎒 スキューバユニットを背中から降ろしてクラブハウス作業台に戻したよ");else{if(!this.bcdPlacedOnTank){this.audio.playDiveAlertBeep(),this.showToast("⚠️ まだタンクにBCDが付いていないよ！先に3D作業台でBCDをタンクに取り付けよう！");return}this.inspectFocus="none",this.wearingScubaUnit=!0,this.tankSlipTimer=0,this.audio.playGearClick(3),this.showToast("🎒 組み立てた3Dスキューバユニットを背負ったよ！『ウエスト → チェスト → 両肩ストラップ引き締め』の順で体にフィットさせよう！")}}toggleWearMaskAndFins(){this.wearingMaskAndFins=!this.wearingMaskAndFins,this.audio.playGearClick(4),this.showToast(this.wearingMaskAndFins?this.maskDefogged?"🤿 曇り止め済みのダイブマスク＆フィンを装着！（陸上ではフィンで前歩きすると転ぶからエントリー直前が鉄則◎）":"🤿 マスク＆フィンを装着！（💡まだ洗い槽で曇り止めをしていないから、海中で曇ったら『Mキー：マスククリア』で直そう！）":"🤿 マスクとフィンを外したよ")}toggleBwrafStep(e){if(this.inspectFocus!=="buddy_bwraf"&&this.pos[1]>5.5&&this.setInspectFocus("buddy_bwraf"),e==="b"){if(!this.wearingScubaUnit){this.audio.playDiveAlertBeep(),this.showToast("❌ [B: BCD診断] まだスキューバユニットを背負っていないよ！先に着用しよう！");return}if(!this.lpiConnected){this.audio.playDiveAlertBeep(),this.showToast("❌ [B: BCD異常発見！] パワーインフレーターを押したけど無反応！中圧LPIホースが未接続だよ！作業台④で繋ごう！");return}if(this.lineBar<20){this.audio.playDiveAlertBeep(),this.showToast("❌ [B: BCD異常発見！] タンクのバルブが開いていないためLPI給気が動かないよ！");return}this.bcdAirStdL=Math.max(6.5,this.bcdAirStdL),this.bcdSurfaceAirPct=Math.round(Math.min(100,this.bcdAirStdL/13*100)),this.bwrafSteps.b=!0,this.audio.playBcdValve(!0),this.showToast("✅ [B: BCD合格] パワーインフレーター給気膨張よし・排気バルブよし！水面浮力をしっかり確保したよ！")}else if(e==="w"){if(!this.wearingWeightBelt||this.weightKg<=0){this.audio.playDiveAlertBeep(),this.showToast("❌ [W: ウエイト忘れ発見！] ウエイトベルトを着けていないよ！ウェットスーツの浮力で潜降できなくなるよ！");return}this.bwrafSteps.w=!0,this.audio.playGearClick(2);const i=this.wearingWetsuit?this.suitVariant==="hibiscus_3mm"?3:4:1,t=this.weightKg-i;this.showToast(t===0?`✅ [W: Weights合格] 右手クイックリリース最上部よし・適正ウエイト ${this.weightKg}kg バッチリ！`:`✅ [W: Weights確認] 右手リリースよし（現在 ${this.weightKg}kg / スーツ目安 ${i}kg）！`)}else if(e==="r"){if(!this.wearingScubaUnit){this.audio.playDiveAlertBeep(),this.showToast("❌ [R: Releases診断] スキューバユニットを背負ってから全バックルを確認しよう！");return}if(!this.camBuckleLocked){this.audio.playDiveAlertBeep(),this.showToast("❌ [R: 重大ヒヤリハット発見！] 背中のタンクカムバックルがロックされていないよ！海中でタンクが抜ける前に作業台②でロックしよう！");return}if(!this.waistStrapLocked||!this.chestStrapLocked||this.shoulderStrapPct<35){this.audio.playDiveAlertBeep(),this.showToast("⚠️ [R: ストラップ緩み発見！] ウエスト・チェストをロックし、肩ストラップを35〜68%に引き締めよう！");return}this.bwrafSteps.r=!0,this.audio.playGearClick(3),this.showToast("✅ [R: Releases合格] タンクバンド・ウエスト・チェスト・両肩リリースのロックと緊急解除位置すべて確認OK！")}else if(e==="a"){if(!this.wearingScubaUnit||!this.regPlacedOnValve){this.audio.playDiveAlertBeep(),this.showToast("❌ [A: Air診断] スキューバユニットとレギュレーターが装着されていないよ！");return}if(this.regOrientationReversed){this.audio.playDiveAlertBeep(),this.showToast("❌ [A: ホース逆向き発見！] 1stステージが左右逆でメインレギュが左から出ているよ！作業台③で向きを直そう！");return}if(this.yokeLeaking){this.audio.playDiveAlertBeep(),this.showToast("❌ [A: 高圧エア漏れ発見！] Kバルブ首元からシューシュー漏れているよ！Oリングとヨーク手締めを直そう！");return}if(this.lineBar<150){this.audio.playDiveAlertBeep(),this.showToast(`❌ [A: 残圧不足発見！] SPG残圧が ${Math.round(this.lineBar)} bar だよ！タンクバルブを開けよう！`);return}if(this.inhaleTestTimer=1,this.audio.playScubaInhale(),this.valveTurns<2.2){this.audio.playDiveAlertBeep(),this.showToast(`❌ [A: 半開きバルブ発見！！] 吸った瞬間に残圧計の針がガクッと振れたよ！（現在 ${this.valveTurns.toFixed(1)}回転）3.0回転まで全開にしよう！`);return}this.airFlowVerified=!0,this.syncDerivedGearStepFlags(),this.bwrafSteps.a=!0,this.showToast(`✅ [A: Air合格] 残圧 ${Math.round(this.lineBar)} bar・吸っても針不動・オクトパス吸気も快調！`)}else if(e==="f"){if(!this.wearingMaskAndFins){this.audio.playDiveAlertBeep(),this.showToast("⚠️ [F: Final確認] マスクとフィンがまだ未装着だよ！装着してから最終OKを出そう！");return}this.bwrafSteps.f=!0,this.inspectFocus="none",this.audio.playPadiSkillPass(!1),this.showToast(this.maskDefogged?"👌 [F: Final OK] ホースすっきり・曇り止めマスク＆フィンよし！バディとOKサイン交換完了！海へエントリーしよう！":"👌 [F: Final OK] 最終確認OK！（※マスク曇り止めがまだなので、海中で曇ったら『Mキー』でマスククリアしてね！）")}}completeBwrafBuddyCheck(){this.toggleBwrafStep("b"),this.bwrafSteps.b&&(this.toggleBwrafStep("w"),this.bwrafSteps.w&&(this.toggleBwrafStep("r"),this.bwrafSteps.r&&(this.toggleBwrafStep("a"),this.bwrafSteps.a&&this.toggleBwrafStep("f"))))}toggleWaistStrap(){this.waistStrapLocked=!this.waistStrapLocked,this.audio.playGearClick(1),this.showToast(this.waistStrapLocked?"🔒 カマーバンド＆ウエストバックルを腰骨の上で密着固定！（タンクの浮き上がり防止）":"🔓 ウエストストラップを緩めたよ")}toggleChestStrap(){this.chestStrapLocked=!this.chestStrapLocked,this.audio.playGearClick(2),this.showToast(this.chestStrapLocked?"🔒 チェストストラップを固定！（肩ベルトの横ズレ防止OK）":"🔓 チェストストラップを外したよ")}setShoulderStrapPct(e){this.shoulderStrapPct=Math.max(0,Math.min(100,Math.round(e)))}setWeightKg(e){this.weightKg=Math.max(0,Math.min(8,Math.round(e))),this.weightKg>0&&(this.wearingWeightBelt=!0),this.audio.playGearClick(this.weightKg)}adjustWeightKg(e){this.setWeightKg(this.weightKg+e);const i=this.suitVariant==="hibiscus_3mm"?3:4,t=this.weightKg===i?`⚖️ ウエイト ${this.weightKg}kg（選択中スーツの適正ウエイト◎ 水深5mで中性浮力が取りやすい！）`:this.weightKg<i-1?`🎈 ウエイト ${this.weightKg}kg（軽め：海中でプラス浮力になり浮き上がりやすいので注意！）`:this.weightKg>i+1?`⚓ ウエイト ${this.weightKg}kg（重め：海底へ沈みやすくBCD給気量が増えてしまうよ）`:`⚖️ ウエイト ${this.weightKg}kg（ほぼ適正レンジ！）`;this.showToast(t)}adjustSurfaceBcdAir(e){const i=Math.max(0,5.45-this.pos[1]),t=1+i/10;if(e){if(!(this.wearingScubaUnit||this.bcdPlacedOnTank)){this.audio.playDiveAlertBeep(),this.showToast("⚠️ BCDがセットされていないよ！");return}if(!this.lpiConnected){this.audio.playDiveAlertBeep(),this.showToast("❌ パワーインフレーター無反応！中圧（LPI）ホースが繋がっていないよ！");return}if(this.lineBar<15){this.audio.playDiveAlertBeep(),this.showToast("❌ 給気できないよ！タンクバルブが閉まっているか残圧ゼロだよ！");return}const r=2.2*t;this.bcdAirStdL=Math.min(14*t,this.bcdAirStdL+r),this.tankAirLiters=Math.max(0,this.tankAirLiters-r);const n=Math.min(14,this.bcdAirStdL/t);this.bcdSurfaceAirPct=Math.round(Math.min(100,n/13*100)),this.audio.playBcdValve(!0),this.showToast(`➕ LPI給気：BCD実容量 ${n.toFixed(1)}L（タンクから高圧エアー供給！）`)}else{const s=2.6*t;this.bcdAirStdL=Math.max(0,this.bcdAirStdL-s);const a=Math.min(14,this.bcdAirStdL/t);this.bcdSurfaceAirPct=Math.round(Math.min(100,a/13*100)),this.audio.playBcdValve(!1),i>.5&&this.engine.setDiverExhaustBubbles(5,!0),this.showToast(a<=.1?"➖インフレーターホースを高く掲げてBCD完全排気（0.0L）！スムーズに潜降できるよ！":`➖ BCD排気：残り実容量 ${a.toFixed(1)}L`)}}triggerEarEqualize(){const e=Math.max(0,5.45-this.pos[1]),i=1+e/10;this.equalizedAta=i,this.earSqueeze=0,this.audio.playGearClick(2),this.showToast(`👃 バルサルバ法で優しく『耳抜き』完了！（水深 ${e.toFixed(1)}m · ${i.toFixed(2)}気圧に鼓膜圧を同調◎）`)}triggerUnderwaterMaskClear(){if(Math.max(0,5.45-this.pos[1])<.4){this.defogMaskAtRinseTank();return}this.maskClearTimer=1.75,this.maskFloodAnim=.34,this.maskFogLevel=0,this.maskDefogged=!0,this.audio.playScubaExhale("normal"),this.engine.setDiverExhaustBubbles(5,!0),this.showToast("🤿 水中マスククリア！フレーム上部を少し浮かせて海水で曇りを洗い流し、上を向いて鼻から息を出して排水完了！視界クリア◎")}startGiantStrideEntry(){this.wearingScubaUnit&&this.bcdSurfaceAirPct<30&&(this.bcdSurfaceAirPct=50),this.cameraMode="tpv",this.tpvDistance=3.6,this.entryMode="giant_stride",this.entryTimer=0,this.entrySplashFired=!1,this.vel[0]=0,this.vel[1]=0,this.vel[2]=0,this.pos[0]=-9.5,this.pos[1]=5.97+.91,this.pos[2]=5.45,this.diverHeadingYaw=0,this.yaw=-.92,this.pitch=-.14,this.tpvDistance=3.45,this.updateLookVector(),this.audio.playScubaInhale(),this.showToast(this.wearingScubaUnit&&this.gearSteps.valve_open?"🚤 ジャイアントストライド！BCD半給気・マスクとレギュを右手で押さえ、水平線を見て大きく一歩前へ！":"🏊 素潜りジャイアントジャンプ！（💡講習手順から潜るなら左パネルで準備するか『⏭️ スキップ』を押してね！）")}startBackRollEntry(){this.wearingScubaUnit&&this.bcdSurfaceAirPct<30&&(this.bcdSurfaceAirPct=50),this.cameraMode="tpv",this.tpvDistance=3.5,this.entryMode="back_roll",this.entryTimer=0,this.entrySplashFired=!1,this.vel[0]=0,this.vel[1]=0,this.vel[2]=0,this.pos[0]=-7.62,this.pos[1]=6.95,this.pos[2]=8.4,this.diverHeadingYaw=Math.PI*.5,this.yaw=-.95,this.pitch=-.18,this.updateLookVector(),this.audio.playScubaInhale(),this.showToast("🔄 バックロール・エントリー！船縁に腰掛け、マスクとゲージを押さえて背中から海へロール！")}startBeachGuidedEntry(){this.cameraMode="tpv",this.tpvDistance=3.4,this.entryMode="beach_wade",this.entryTimer=0,this.entrySplashFired=!1,this.vel[0]=0,this.vel[1]=0,this.vel[2]=0;const e=this.getTerrainY(0,21.8);this.pos[0]=0,this.pos[1]=Math.max(5.65,e)+.88,this.pos[2]=21.8,this.diverHeadingYaw=0,this.yaw=-.25,this.pitch=-.14,this.updateLookVector(),this.audio.playGearClick(2),this.showToast("🏖️ 沖縄ビーチエントリー開始！白砂の波打ち際から腰の深さへ歩き、フィン装着＆BCD排気で潜降するよ！")}selectSuitVariant(e){this.suitVariant=e,this.wearingWetsuit=!0,e==="hibiscus_3mm"&&this.weightKg===4?this.weightKg=3:e!=="hibiscus_3mm"&&this.weightKg===3&&(this.weightKg=4),this.audio.playGearClick(1);const i=e==="kerama_5mm"?"🖤 5mm 慶良間フルウェット（ブラック×シアン · 適正ウエイト4kg）":e==="hibiscus_3mm"?"🌺 3mm トロピカルスーツ（ネイビー×コーラルピンク · 適正ウエイト3kg）":"⚡ 5mm プロダイブ・ステルススーツ（ブラック×ゴールド · 適正ウエイト4kg）";this.showToast(`👕 クラブハウスのラックから『${i}』を選んで着用したよ！`)}selectBcdVariant(e){this.bcdVariant=e,this.audio.playGearClick(2);const i=e==="jacket_cyan"?"🦺 スタンダード・ジャケットBCD（ブラック×慶良間シアン：水面安定感◎）":e==="wing_gold"?"🦅 バックフロート・ウイングBCD（カーボン黒×ゴールド：水中水平トリム◎）":"🌺 トロピカル・ライトBCD（パールホワイト×コーラルピンク：軽量リゾート型）";this.showToast(`🦺 BCDモデルを『${i}』に変更したよ！`)}selectFinVariant(e){this.finVariant=e,this.audio.playGearClick(3);const i=e==="cyan_split"?"🌊 慶良間スプリットフィン（シアン×イエロー：軽い脚力で快適巡航）":e==="yellow_long"?"⚡ ロングブレードフィン（ネオンイエロー：最高速アップのパワフル推進！）":"🌺 ラバージェットフィン（コーラルピンク×白：小回り＆姿勢制御キレ抜群！）";this.showToast(`🦶 フィンを『${i}』に変更したよ！`)}sitOnBarStool(e=2){const i=Math.max(0,Math.min(5,Math.round(e))),t=3.85+i*1.12;this.entryMode=null,this.wearingScubaUnit&&(this.wearingScubaUnit=!1),this.seatedStoolIndex=i,this.placedDrinkTableIdx=null;const s=this.engine.getVrmAvatar(),a=s.getSeatedContactHeight(),r=s.getSeatedForwardScoot(.222);this.pos[0]=t,this.pos[1]=7.302+.88-a,this.pos[2]=26.32+r,this.vel[0]=0,this.vel[1]=0,this.vel[2]=0,this.diverHeadingYaw=Math.PI,this.yaw=Math.PI,this.pitch=-.06,this.curBodyTrimDeg=90,this.wasAboveSurface=!0,this.activePoseStyle="bar_sit",this.updateLookVector(),this.setInspectFocus("bar_seat"),this.showToast(`🪑 『CHURA BAR』カウンター席 #${i+1} に腰掛けたよ！目の前のボトル・タップ・メニューをクリックしてカクテルを注文しよう♪`)}standUpFromBarStool(){if(this.seatedStoolIndex===null){(this.inspectFocus==="bar_bottles"||this.inspectFocus==="bar_seat")&&this.setInspectFocus("none");return}const e=3.85+this.seatedStoolIndex*1.12;this.seatedStoolIndex=null,this.barPrepTimer=0,this.barSipTimer=0,this.barSipsLeft<=0&&(this.activeBarDrink=null),this.inspectFocus="none",this.pos[0]=e,this.pos[1]=6.52+.91,this.pos[2]=25.72,this.vel[0]=0,this.vel[1]=0,this.vel[2]=0,this.activePoseStyle="land_walk",this.audio.playGearClick(0),this.showToast(this.activeBarDrink&&this.barSipsLeft>0?"🚶 グラスを片手にスツールから立ち上がったよ！そのままビーチやデッキを散策できるよ♪":"🚶 カウンター席から立ち上がったよ！")}toggleBarBottleZoom(){this.inspectFocus==="bar_bottles"?(this.seatedStoolIndex!==null?this.setInspectFocus("bar_seat"):this.setInspectFocus("none"),this.showToast("🎥 カウンター全体視点に戻ったよ")):((this.pos[1]<5.8||this.pos[2]<22)&&this.sitOnBarStool(2),this.setInspectFocus("bar_bottles"),this.showToast("🔍 クラフト酒瓶＆バックバー拡大モード！ドラッグで角度変更・ボトル直接クリックでそのお酒のカクテルを注文できるよ！"))}sipBarDrink(){if(!this.activeBarDrink){this.audio.playDiveAlertBeep(),this.showToast("🍹 まずはバーメニューや目の前のボトルをクリックしてお酒・ドリンクを注文しよう！");return}if(this.barPrepTimer>.05){this.showToast("🍸 いまバーテンダーが仕上げ中だよ！もうちょっと待ってね♪");return}if(this.barSipTimer>.25)return;if(this.barSipsLeft<=0){this.orderClubhouseDrink(this.activeBarDrink);return}if(this.placedDrinkTableIdx!==null){const r=_i[this.placedDrinkTableIdx];Math.hypot(this.pos[0]-r.x,this.pos[2]-r.z)>1.38?this.placedDrinkTableIdx=null:this.seatedStoolIndex===null&&this.inspectFocus==="none"&&(this.diverHeadingYaw=Math.atan2(-(r.x-this.pos[0]),-(r.z-this.pos[2])))}if(this.seatedStoolIndex===null&&this.placedDrinkTableIdx===null&&this.inspectFocus!=="okislot"&&this.pos[1]>5.8&&this.pos[2]>25.4&&this.pos[0]>=3&&this.pos[0]<=10.4){const r=Math.max(0,Math.min(5,Math.round((this.pos[0]-3.85)/1.12)));this.sitOnBarStool(r)}this.barSipStartFill=this.barSipsLeft/3,this.barSipsLeft=Math.max(0,this.barSipsLeft-1),this.barSipTargetFill=this.barSipsLeft/3,this.barSipTimer=2.85,this.tipsyGlowSec=this.activeBarDrink==="mango"?16:28;const e=this.activeBarDrink!=="beer"&&this.activeBarDrink!=="mango";this.audio.playDrinkSip(e,this.barSipsLeft===0);const t={blue:"慶良間ブルーラグーン",hibiscus:"サンセット・ハイビスカスフィズ",shikuwasa:"美ら海シークヮーサーモヒート",mango:"完熟マンゴー・ピニャコラーダ",awamori:"琉球泡盛 古酒ロック",beer:"極冷・神泡アイランド生ドラフト",highball:"極上かち割りロック・強炭酸ハイボール"}[this.activeBarDrink],a=Ka[this.activeBarDrink].hasStraw?"ちゅーっ…♪":"ゴクッ…ゴクッ…";this.barSipsLeft===2?this.showToast(`🍹 ${a}『${t}』を1/3飲んだよ！（グラス中身 残り 2/3）`):this.barSipsLeft===1?this.showToast(`🍹 ${a}『${t}』が残り 1/3 になったよ！南国の風と相性抜群♪`):this.showToast(`✨ ぷはぁ〜！！『${t}』を飲み干してグラスが空（0/3）になったよ！（クリックでおかわりもOK♪）`)}interactWithDrinkTable(e){const i=_i[e];this.seatedStoolIndex=null,this.activeLieSpot=null,this.inspectFocus="none",this.wearingScubaUnit&&(this.wearingScubaUnit=!1);const t=Math.hypot(this.pos[0]-i.x,this.pos[2]-i.z);if(t>1.05||t<.36){const n=i.x+i.standOffsetX,o=i.z+i.standOffsetZ,l=e===0?6.12:e===1?Math.max(5.78,this.getTerrainY(n,o)):6.52;this.pos[0]=n,this.pos[1]=l+.91,this.pos[2]=o,this.vel[0]=0,this.vel[1]=0,this.vel[2]=0,this.diverHeadingYaw=i.standYaw,this.curBodyTrimDeg=90}else this.diverHeadingYaw=Math.atan2(-(i.x-this.pos[0]),-(i.z-this.pos[2]));const s={blue:"慶良間ブルーラグーン",hibiscus:"サンセット・ハイビスカスフィズ",shikuwasa:"美ら海シークヮーサーモヒート",mango:"完熟マンゴー・ピニャコラーダ",awamori:"琉球泡盛 古酒ロック",beer:"極冷・神泡アイランド生ドラフト",highball:"極上かち割りロック・強炭酸ハイボール"};if(this.activeBarDrink!==null&&this.placedDrinkTableIdx===null){this.placedDrinkTableIdx=e,this.barSipTimer=0,this.audio.playGearClick(2),this.showToast(`🍸 『${s[this.activeBarDrink]}』を${i.label}のコースターに置いたよ！もう一度クリックすると手に持って飲めるよ♪`);return}if(this.activeBarDrink!==null&&this.placedDrinkTableIdx===e){this.sipBarDrink();return}const a=["blue","hibiscus","beer","highball","shikuwasa","mango","awamori"],r=a[(e+Math.floor(this.elapsed*.5))%a.length];this.placedDrinkTableIdx=e,this.activeBarDrink=r,this.barSipsLeft=3,this.barSipStartFill=1,this.barSipTargetFill=1,this.barSipTimer=0,this.barPrepTimer=0,this.audio.playBubbles(!1),this.audio.playItemPickup(r==="beer"||r==="awamori"||r==="highball"),this.showToast(`🍹 ${i.label}に冷えた『${s[r]}（3/3）』をサーブしたよ！テーブルをクリックすると手で持って飲めるよ♪`)}orderClubhouseDrink(e){let i=this.placedDrinkTableIdx;if(i===null&&this.seatedStoolIndex===null&&this.inspectFocus!=="okislot"){for(const t of _i)if(Math.hypot(this.pos[0]-t.x,this.pos[2]-t.z)<1.75){i=t.idx;break}}if(i!==null)this.placedDrinkTableIdx=i;else if(this.seatedStoolIndex===null&&this.inspectFocus!=="okislot"&&this.pos[1]>5.8&&this.pos[2]>25){const t=this.pos[0]>=3.2&&this.pos[0]<=10.2?Math.max(0,Math.min(5,Math.round((this.pos[0]-3.85)/1.12))):2;this.sitOnBarStool(t)}else this.seatedStoolIndex!==null&&this.inspectFocus==="bar_bottles"&&this.setInspectFocus("bar_seat");this.activeBarDrink=e,this.barSipsLeft=3,this.barSipStartFill=1,this.barSipTargetFill=1,this.barSipTimer=0,this.barPrepTimer=this.seatedStoolIndex!==null?1.05:0,this.audio.playBubbles(!1),this.audio.playItemPickup(e==="beer"||e==="awamori"||e==="highball"),e==="mango"?(this.maxApneaSec=60,this.apneaSec=60,this.showToast("🥭 シェイカーを振って『完熟マンゴー・ピニャコラーダ』を提供！（素潜り息こらえ 60秒 にUP！グラスをクリックで飲めるよ♪）")):e==="shikuwasa"?(this.shikuwasaRelaxBonus=!0,this.showToast("🍋 生ミントと沖縄シークヮーサーで『美ら海モヒート』を提供！（水中エア消費10%節約！グラスをクリックで一口飲もう♪）")):e==="blue"?this.showToast("🌊 慶良間ブルーキュラソーで『ブルーラグーン』をシェイク！コースターの上のグラスをクリック（またはSpace）で飲めるよ！"):e==="hibiscus"?this.showToast("🌺 クラフト美らジンベース『サンセット・ハイビスカスフィズ』を提供！夕焼けの2層グラデーションを楽しもう♪"):e==="awamori"?this.showToast("🥃 琉球泡盛『古酒ロック』を手吹き琉球グラス＆かち割りロックアイスで提供！ダイブ後の至福の一杯をどうぞ♪"):e==="highball"?this.showToast("🥃 かち割りロックアイスぎっしりの『極上・強炭酸ハイボール』に爽やかレモンを添えて提供！氷を鳴らしてグイッとどうぞ♪"):this.showToast("🍺 『CHURA DRAFT』サーバーから7:3神泡の極冷生ドラフトを注いだよ！キンキンのジョッキをクリックして乾杯しよう！")}getTotalSeafoodStock(){return this.seafoodStock.gurukun+this.seafoodStock.irabucha+this.seafoodStock.taman+this.seafoodStock.gaara+this.seafoodStock.meebai+this.seafoodStock.akamachi+this.seafoodStock.shellfish+this.seafoodStock.lobster+this.seafoodStock.wagyu+this.seafoodStock.skewer}isOkiSlotActive(){return this.inspectFocus==="okislot"}sitAtOkiSlot(e=0){this.okiMachineIdx=e,this.placedDrinkTableIdx=null,this.setInspectFocus("okislot"),this.audio.playGearClick(2),this.showToast(`🌺 CHURA BAR 沖スロコーナー『華閃光 BLACK-30（${e+1}番台）』に着席！Spaceキーまたは3Dレバー＆停止ボタンクリックでハイビスカスを光らせよう！`)}leaveOkiSlot(){if(this.inspectFocus!=="okislot")return;const e=this.okiMachineIdx===1?11.96:11.18;this.inspectFocus="none",this.pos[0]=e,this.pos[1]=6.52+.91,this.pos[2]=25.82,this.vel[0]=0,this.vel[1]=0,this.vel[2]=0,this.activePoseStyle="land_walk",this.audio.playGearClick(0),this.showToast("🚶 沖スロ『華閃光 BLACK-30』の席から立ち上がったよ！（獲得メダルはそのままキープされているよ♪）")}switchOkiSlotMachine(e){if(this.okiState==="spinning"){this.audio.playDiveAlertBeep(),this.showToast("⚠️ リール回転中は台移動できないよ！3つのリールを止めてから移動しよう！");return}this.sitAtOkiSlot(e)}insertMoreOkiMedals(e=100){this.okiInvestedMedals+=e;const i=Math.min(e,Math.max(0,50-this.okiCredit));this.okiCredit+=i,this.okiMedals+=e-i,this.audio.playOkiSlotBet(),this.okiStatusText=`🪙 台間サンドから30Φメダル +${e}枚 貸出！（CREDIT ${this.okiCredit} / 下皿・箱 ${this.okiMedals}枚）`,this.showToast(`🪙 台間メダル貸機から +${e}枚 補充したよ！（CREDIT ${this.okiCredit} / 所持 ${this.okiMedals}枚）`)}awardOkiPayoutToCreditAndTray(e){const i=Math.min(e,Math.max(0,50-this.okiCredit));this.okiCredit+=i,this.okiMedals+=e-i}spendThreeMedalsForBet(){const e=3-this.okiBetCount;if(e<=0)return!0;if(this.okiCredit+this.okiMedals<e&&(this.okiMedals+=50,this.okiInvestedMedals+=50,this.showToast("🪙 メダル残高が少なくなったため台間サンドから +50枚 自動貸出したよ！")),this.okiCredit>=e)this.okiCredit-=e;else{const t=e-this.okiCredit;this.okiCredit=0,this.okiMedals=Math.max(0,this.okiMedals-t);const s=Math.min(this.okiMedals,47);this.okiCredit+=s,this.okiMedals-=s}return this.okiBetCount=3,!0}betMaxOkiSlot(){return this.inspectFocus!=="okislot"&&this.sitAtOkiSlot(this.okiMachineIdx),this.okiState==="bonus_fanfare"&&(this.okiFanfareTimer=0,this.okiState="idle"),this.okiState!=="idle"?!1:this.okiBetCount>=3?(this.pullOkiSlotLever(),!0):this.okiReplayFreeBet?(this.okiReplayFreeBet=!1,this.okiBetCount=3,this.audio.playOkiSlotBet(),this.okiStatusText="🔄 リプレイ自動3枚BET完了！レバーONでリール始動！",!0):(this.spendThreeMedalsForBet(),this.okiLastPayout=0,this.audio.playOkiSlotBet(),this.okiStatusText=`🪙 MAX BET (CREDIT ${this.okiCredit}) OK！3Dレバークリック / Space でリール始動！`,!0)}getOkiSymbolAtReelStop(e,i){const t=Qa.OKI_REEL_STRIPS[e],s=(i%21+21)%21,a=t[s];return a===0?"seven_red":a===6?"seven_white":a===4?"bar":a===5?"cherry":a===3?"melon":a===2?"replay":"bell"}getOkiSymbolLabelAt(e,i){switch(this.getOkiSymbolAtReelStop(e,i)){case"seven_red":return"🌺赤7";case"seven_white":return"🤍白7";case"bar":return"⬛BAR";case"bell":return"🔔ベル";case"replay":return"💎リプ";case"melon":return"🍉スイカ";case"cherry":return"🍒チェリー"}}getOkiSideLedHintLabel(e){return e===3?"💠 サイドランプ：青点滅（通常以上）":e===4?"💛 サイドランプ：黄点滅（天国準備チャンス！）":e===5?"💚 サイドランプ：緑点滅（32G天国モード高期待度！）":e===6?"❤️‍🔥 サイドランプ：赤点滅（32G天国ループ濃厚！！）":null}getOkiHibiscusPatternLabel(e){switch(e){case"rainbow_heaven":return"🌈🌺 虹色プレミアム点滅（BIG＋32G天国濃厚！！）";case"san_san_nana":return"🌺🥁 三三七拍子点滅（BIG＋天国高期待！）";case"left_only":return"🌺👈 左片華だけ点灯（BIG＋天国モード濃厚！）";case"slow_fade":return"🌺✨ しっとりスロー点滅（BIG確定！）";case"fast_sync":return"🌺⚡ 高速同時点滅（BIG濃厚！）";default:return"🌺 王道・交互点滅（ボーナス確定！）"}}rollOkiHibiscusPattern(e,i){if(e==="reg")return"normal_alt";const t=Math.random();return i?t<.24?"rainbow_heaven":t<.42?"san_san_nana":t<.58?"left_only":t<.74?"slow_fade":t<.88?"fast_sync":"normal_alt":t<.1?"rainbow_heaven":t<.22?"san_san_nana":t<.34?"left_only":t<.5?"slow_fade":t<.68?"fast_sync":"normal_alt"}pullOkiSlotLever(e=!1){if(this.inspectFocus!=="okislot"&&this.sitAtOkiSlot(this.okiMachineIdx),this.okiState==="bonus_fanfare"&&(this.okiFanfareTimer=0,this.okiState="idle"),this.okiState!=="idle")return;if(this.okiBetCount<3&&(this.okiReplayFreeBet?(this.okiReplayFreeBet=!1,this.okiBetCount=3):this.spendThreeMedalsForBet()),this.okiBetCount=0,this.okiLastPayout=0,this.okiWinLineFlashTimer=0,this.okiSideLedHintTimer=0,this.okiLeverAnimTimer=.26,this.okiState="spinning",this.okiReelsStopped[0]=!1,this.okiReelsStopped[1]=!1,this.okiReelsStopped[2]=!1,this.okiReelsSlipping[0]=!1,this.okiReelsSlipping[1]=!1,this.okiReelsSlipping[2]=!1,this.okiReelBlackout[0]=!1,this.okiReelBlackout[1]=!1,this.okiReelBlackout[2]=!1,this.okiBlackoutTargetCount=0,this.okiPostNotify=!1,this.okiActiveBonus!==null){const s=Math.random();if(this.okiActiveBonus==="big"&&s<.09)this.okiSpinFlag=s<.05?"cherry":"melon",this.okiBlackoutTargetCount=3,this.audio.playOkiSlotLever(!0,!1),this.okiStatusText="⚡ 予告音＋パネル消灯気配！！レア役停止で『🌺1G連BIGストック』の大チャンス！！";else{this.okiSpinFlag="bell",this.audio.playOkiSlotLever(!1,!1);const a=this.okiActiveBonus==="big"?"BIG BONUS":"REG BONUS";this.okiStatusText=`🎊 ${a} 消化中（獲得 ${this.okiBonusEarned}/${this.okiBonusTarget}枚）！順押しフリー打ちで15枚ベル獲得！`}return}if(this.okiTotalSpins+=1,this.okiGamesSinceBonus+=1,this.okiOneGRenStock>0&&this.okiPendingBonus===null){this.okiOneGRenStock-=1,this.okiPendingBonus="big",this.okiHibiscusPattern="rainbow_heaven",this.okiSpinFlag="bonus",this.okiHibiscusLit=!0,this.audio.playOkiSlotLever(!1,!0),this.audio.playOkiSlotHibiscusChika(!0),this.okiStatusText="🌈🌺 1G連ストック発動！！無音チカッ → レインボー点滅（BIG確定）！！",this.showToast(this.okiStatusText),e&&(this.stopOkiSlotReel(0,!0),this.stopOkiSlotReel(1,!0),this.stopOkiSlotReel(2,!0));return}this.okiGamesSinceBonus>32&&this.okiPendingBonus===null&&(this.okiHeavenMode=!1);let i=!1,t=!1;if(this.okiPendingBonus!==null)this.okiSpinFlag="bonus",this.okiHibiscusLit=!0,this.audio.playOkiSlotLever(!1,!1),this.okiStatusText=this.okiPendingBonus==="big"?"🌺 ハイビスカス点滅中（BIG確定）！『赤7』または『白7』を引き込み制御で揃えよう！":"🌺 ハイビスカス点滅中（REG確定）！『7・7・BAR』を引き込み制御で揃えよう！";else{const s=this.okiHeavenMode?this.okiGamesSinceBonus>=32?1:this.okiGamesSinceBonus<=5?.28:.21:this.okiGamesSinceBonus>=55?1:.085;if(Math.random()<s){const r=Math.random()<(this.okiHeavenMode?.72:.62);this.okiPendingBonus=r?"big":"reg",this.okiHibiscusPattern=this.rollOkiHibiscusPattern(this.okiPendingBonus,this.okiHeavenMode);const n=Math.random();if(n<.15&&!e)this.okiSpinFlag=n<.09?"cherry":"melon",this.okiPostNotify=!0,this.okiBlackoutTargetCount=3,i=!0,this.audio.playOkiSlotLever(!0,!1),this.okiStatusText="🎵 スタート音が『遅れ』た…！？左リールに⬛BARを狙って🍒チェリー・🍉スイカをフォローしよう！";else if(n<.26&&!e)this.okiSpinFlag="lose",this.okiPostNotify=!0,this.okiBlackoutTargetCount=3,this.audio.playOkiSlotLever(!1,!1),this.okiStatusText=this.okiHeavenMode&&this.okiGamesSinceBonus<=32?`🌺 32G連チャンゾーン (${this.okiGamesSinceBonus}G目)！左・中・右リールを止めよう！`:"🎰 リール回転中！[1 / 2 / 3] または Space / 3Dボタンでストップ！";else{this.okiSpinFlag="bonus",this.okiHibiscusLit=!0,t=r&&Math.random()<.24;const o=r&&(this.okiHibiscusPattern==="rainbow_heaven"||this.okiHibiscusPattern==="san_san_nana"||this.okiHibiscusPattern==="left_only"||this.okiGamesSinceBonus<=5);this.audio.playOkiSlotLever(!1,t),this.audio.playOkiSlotHibiscusChika(o);const l=this.getOkiHibiscusPatternLabel(this.okiHibiscusPattern);this.okiStatusText=t?`🤫 無音スタートからのチカッ！！${l}`:o?`🚨 チカッ！キュイーーーン♪！！${l}`:`🌺 チカッ！！ハイビスカスが光ったよ！${l}`,this.showToast(this.okiStatusText)}}else{const r=Math.random();r<.16?this.okiSpinFlag="replay":r<.36?(this.okiSpinFlag="bell",Math.random()<.25&&(this.okiBlackoutTargetCount=1)):r<.43?(this.okiSpinFlag="melon",this.okiBlackoutTargetCount=2):r<.51?(this.okiSpinFlag="cherry",this.okiBlackoutTargetCount=1):this.okiSpinFlag="lose",this.audio.playOkiSlotLever(i,!1),this.okiStatusText=this.okiHeavenMode&&this.okiGamesSinceBonus<=32?`🌺 32G天国チャンス中 (${this.okiGamesSinceBonus}/32G)！華が光れば連チャン！！`:"🎰 リール回転中！左リール⬛BAR目安でチェリー＆スイカフォロー（Space / 1・2・3）！"}}e&&this.okiPendingBonus!==null&&(this.okiHibiscusLit=!0,this.okiPostNotify=!1,this.stopOkiSlotReel(0,!0),this.stopOkiSlotReel(1,!0),this.stopOkiSlotReel(2,!0))}evalOkiPaylines(e,i,t){let s=!1,a=null,r=!1,n=!1,o=!1,l=!1;const h=[[0,0,0],[1,1,1],[-1,-1,-1],[1,0,-1],[-1,0,1]];for(const[u,g,p]of h){const x=this.getOkiSymbolAtReelStop(0,e+u),S=this.getOkiSymbolAtReelStop(1,i+g),T=this.getOkiSymbolAtReelStop(2,t+p);x==="seven_red"&&S==="seven_red"&&T==="seven_red"?(s=!0,a="red"):x==="seven_white"&&S==="seven_white"&&T==="seven_white"?(s=!0,a||(a="white")):x==="seven_red"&&S==="seven_red"&&T==="bar"||x==="seven_white"&&S==="seven_white"&&T==="bar"?r=!0:x==="melon"&&S==="melon"&&T==="melon"?n=!0:x==="bell"&&S==="bell"&&T==="bell"?o=!0:x==="replay"&&S==="replay"&&T==="replay"&&(l=!0)}let c=0;for(const u of[-1,0,1])if(this.getOkiSymbolAtReelStop(0,e+u)==="cherry"){c=u===0?2:1;break}return{bigHit:s,bigColor:a,regHit:r,melonHit:n,bellHit:o,replayHit:l,cherryCount:c}}canCompleteSymbolLine(e,i){const t=[[0,0,0],[1,1,1],[-1,-1,-1],[1,0,-1],[-1,0,1]];for(const[s,a,r]of t){const n=e[0]===null||this.getOkiSymbolAtReelStop(0,e[0]+s)===i[0],o=e[1]===null||this.getOkiSymbolAtReelStop(1,e[1]+a)===i[1],l=e[2]===null||this.getOkiSymbolAtReelStop(2,e[2]+r)===i[2];if(n&&o&&l)return!0}return!1}canCompleteCenterLine(e,i){const t=e[0]===null||this.getOkiSymbolAtReelStop(0,e[0])===i[0],s=e[1]===null||this.getOkiSymbolAtReelStop(1,e[1])===i[1],a=e[2]===null||this.getOkiSymbolAtReelStop(2,e[2])===i[2];return t&&s&&a}hasLeftReelCherryInWindow(e){return this.getOkiSymbolAtReelStop(0,e-1)==="cherry"||this.getOkiSymbolAtReelStop(0,e)==="cherry"||this.getOkiSymbolAtReelStop(0,e+1)==="cherry"}chooseOkiSlotStop(e,i,t){const s=[this.okiReelsStopped[0]?this.okiReelStops[0]:null,this.okiReelsStopped[1]?this.okiReelStops[1]:null,this.okiReelsStopped[2]?this.okiReelStops[2]:null],a=this.okiActiveBonus===null&&this.okiPendingBonus!==null&&(t||this.okiHibiscusLit||this.okiSpinFlag==="bonus"),r=this.okiPendingBonus==="reg"?[["seven_red","seven_red","bar"],["seven_white","seven_white","bar"]]:[["seven_red","seven_red","seven_red"],["seven_white","seven_white","seven_white"]];if(t&&this.okiPendingBonus!==null){for(let c=0;c<21;c++){const u=i+c,g=(u%21+21)%21;if(s[e]=g,r.some(p=>this.canCompleteCenterLine(s,p)))return u}for(let c=0;c<21;c++){const u=i+c,g=(u%21+21)%21;if(s[e]=g,r.some(p=>this.canCompleteSymbolLine(s,p)))return u}}const n=4;let o=i,l=-1e9,h=!1;for(let c=0;c<=n;c++){const u=i+c,g=(u%21+21)%21;s[e]=g;let p=!1;if(e===0&&this.okiSpinFlag!=="cherry"&&this.hasLeftReelCherryInWindow(g)&&(p=!0),s[0]!==null&&s[1]!==null&&s[2]!==null){const T=this.evalOkiPaylines(s[0],s[1],s[2]),k=this.okiActiveBonus===null&&this.okiPendingBonus==="big",m=this.okiActiveBonus===null&&this.okiPendingBonus==="reg";T.bigHit&&!k&&(p=!0),T.regHit&&!m&&(p=!0),T.bigHit&&k||T.regHit&&m||(T.melonHit&&this.okiSpinFlag!=="melon"&&(p=!0),T.bellHit&&this.okiSpinFlag!=="bell"&&(p=!0),T.replayHit&&this.okiSpinFlag!=="replay"&&(p=!0))}let S=p?-1e4:0;if(S-=c*3,!p){if(this.okiActiveBonus===null&&this.okiPendingBonus!==null&&this.okiSpinFlag!=="cherry"&&this.okiSpinFlag!=="melon"){let T=!1,k=!1;for(const m of r)this.canCompleteSymbolLine(s,m)&&(T=!0,this.canCompleteCenterLine(s,m)&&(k=!0));T&&(h=!0,S+=600+(k?95:0))}else if(this.okiSpinFlag==="cherry"&&e===0)this.getOkiSymbolAtReelStop(0,g+1)==="cherry"||this.getOkiSymbolAtReelStop(0,g-1)==="cherry"?S+=240:this.getOkiSymbolAtReelStop(0,g)==="cherry"&&(S+=210);else if(this.okiSpinFlag==="replay"||this.okiSpinFlag==="bell"||this.okiSpinFlag==="melon"){const T=this.okiSpinFlag;this.canCompleteSymbolLine(s,[T,T,T])&&(S+=320,this.getOkiSymbolAtReelStop(e,g)===T&&(S+=25))}}S>l&&(l=S,o=u)}if(a&&!h){let c=null,u=-1e9;for(let g=5;g<21;g++){const p=i+g,x=(p%21+21)%21;if(s[e]=x,e===0&&this.hasLeftReelCherryInWindow(x))continue;let S=!1,T=!1;for(const k of r)this.canCompleteSymbolLine(s,k)&&(S=!0,this.canCompleteCenterLine(s,k)&&(T=!0));if(S){const k=1e3-g*12+(T?18:0);k>u&&(u=k,c=p)}}if(c!==null)return c}return o}stopOkiSlotReel(e,i=!1){if(this.okiState!=="spinning"||this.okiReelsStopped[e])return;const t=Math.PI*2/21,s=-this.okiReelAngles[e]/t,a=Math.ceil(s-.35),r=this.chooseOkiSlotStop(e,a,i),n=(r%21+21)%21;this.okiReelsStopped[e]=!0,this.okiReelStops[e]=n,this.okiReelTargetAngles[e]=-r*t,this.audio.playOkiSlotStop(e),i?(this.okiReelAngles[e]=this.okiReelTargetAngles[e],this.okiReelsSlipping[e]=!1,this.okiReelsStopped[0]&&this.okiReelsStopped[1]&&this.okiReelsStopped[2]&&this.settleOkiSlotSpin()):this.okiReelsSlipping[e]=!0}settleOkiSlotSpin(){const e=this.evalOkiPaylines(this.okiReelStops[0],this.okiReelStops[1],this.okiReelStops[2]);if(this.okiActiveBonus!==null){let i=0,t=!1;e.melonHit||e.cherryCount>0?(i=15,t=!0):i=15;const s=Math.max(0,this.okiBonusTarget-this.okiBonusEarned),a=Math.min(i,Math.max(1,s));this.okiBonusEarned+=a,this.awardOkiPayoutToCreditAndTray(a),this.okiLastPayout=a,this.okiWinLineFlashTimer=.85;let r=!1;if(this.okiActiveBonus==="big"&&(t||Math.random()<.04)&&(!t||Math.random()<.55)&&(this.okiOneGRenStock+=1,r=!0),this.audio.playOkiSlotBonusStepChime(r),this.okiBonusEarned>=this.okiBonusTarget){const n=this.okiActiveBonus,o=this.okiBonusEarned;if(this.okiActiveBonus=null,this.okiBonusEarned=0,this.okiBonusTarget=0,this.okiGamesSinceBonus=0,this.okiState="bonus_fanfare",this.okiFanfareTimer=1.85,this.okiHibiscusLit=!1,this.audio.playOkiSlotBonusEndChime(),n==="big")this.okiHeavenMode=Math.random()<.82||this.okiOneGRenStock>0,this.okiSideLedHintCode=this.okiHeavenMode?Math.random()<.5?6:5:3,this.okiSideLedHintTimer=5,this.okiStatusText=this.okiOneGRenStock>0?`🎊 BIG BONUS 完走（獲得 ${o}枚）！！🌺 1G連ストック点灯中 — 次レバーで即BIG確定！！`:`🎊 BIG BONUS 完走（獲得 ${o}枚）！！🌺 勝負の32G天国連チャンゾーン突入！！`;else{!this.okiHeavenMode&&Math.random()<.62&&(this.okiHeavenMode=!0),this.okiSideLedHintCode=this.okiHeavenMode?Math.random()<.45?6:5:Math.random()<.45?4:3,this.okiSideLedHintTimer=6.5;const l=this.getOkiSideLedHintLabel(this.okiSideLedHintCode)??"";this.okiStatusText=`🎉 REG BONUS 完走（獲得 ${o}枚）！${l}`}this.showToast(this.okiStatusText);return}this.okiState="idle",r?(this.okiStatusText=`🚨 キュイーーーン♪！！🌺『1G連BIGストック』獲得！！（残り ${this.okiBonusTarget-this.okiBonusEarned}枚）`,this.showToast(this.okiStatusText)):this.okiStatusText=`🔔 +${a}枚！！ボーナス獲得 ${this.okiBonusEarned} / ${this.okiBonusTarget}枚（Space連打で快適消化♪）`;return}if(e.bigHit&&this.okiPendingBonus==="big"){this.okiBigCount+=1,this.okiHistory.unshift({games:this.okiGamesSinceBonus,kind:"BIG"}),this.okiHistory.length>8&&this.okiHistory.pop(),this.okiPendingBonus=null,this.okiActiveBonus="big",this.okiBonusEarned=0,this.okiBonusTarget=240,this.okiHibiscusLit=!0,this.okiPostNotify=!1,this.okiGamesSinceBonus=0,this.okiState="bonus_fanfare",this.okiFanfareTimer=2,this.okiWinLineFlashTimer=2.8,this.audio.playOkiSlotBonusFanfare(!0);const i=e.bigColor==="white"?"白7・白7・白7":"赤7・赤7・赤7";this.okiStatusText=`🎊 BIG BONUS スタート！！『${i}』揃い — 240枚獲得まで15枚ベル高確率ナビ＆1G連抽選！！`,this.showToast(this.okiStatusText);return}if(e.regHit&&this.okiPendingBonus==="reg"){this.okiRegCount+=1,this.okiHistory.unshift({games:this.okiGamesSinceBonus,kind:"REG"}),this.okiHistory.length>8&&this.okiHistory.pop(),this.okiPendingBonus=null,this.okiActiveBonus="reg",this.okiBonusEarned=0,this.okiBonusTarget=96,this.okiHibiscusLit=!0,this.okiPostNotify=!1,this.okiGamesSinceBonus=0,this.okiState="bonus_fanfare",this.okiFanfareTimer=1.6,this.okiWinLineFlashTimer=2.2,this.audio.playOkiSlotBonusFanfare(!1),this.okiStatusText="🎉 REG BONUS スタート！『7・7・BAR』揃い — 96枚獲得＆終了時フェザー/サイドランプの色に注目！！",this.showToast(this.okiStatusText);return}if(this.okiState="idle",e.melonHit)this.awardOkiPayoutToCreditAndTray(12),this.okiLastPayout=12,this.okiWinLineFlashTimer=1.4,this.audio.playOkiSlotPayout(12,!1),this.okiStatusText="🍉 沖縄スイカ揃い！ +12枚 払い出し！（同時ボーナス当選にも期待…！？）";else if(e.bellHit)this.awardOkiPayoutToCreditAndTray(8),this.okiLastPayout=8,this.okiWinLineFlashTimer=1.1,this.audio.playOkiSlotPayout(8,!1),this.okiStatusText="🔔 黄金ベル揃い！30Φメダル +8枚 払い出し！";else if(e.cherryCount>0){const i=e.cherryCount>=2?6:4;this.awardOkiPayoutToCreditAndTray(i),this.okiLastPayout=i,this.okiWinLineFlashTimer=1.2,this.audio.playOkiSlotPayout(i,!1),this.okiStatusText=e.cherryCount>=2?`🍒🔥 中段チェリー降臨！！ +${i}枚 払い出し！！`:`🍒 角チェリー入賞！ +${i}枚 払い出し！`}else e.replayHit?(this.okiReplayFreeBet=!0,this.okiBetCount=3,this.okiWinLineFlashTimer=1,this.audio.playOkiSlotPayout(0,!0),this.okiStatusText="🔄 リプレイ揃い！次ゲーム自動3枚BET完了 — レバーONでスタート！"):this.okiPendingBonus!==null&&this.okiHibiscusLit?this.okiStatusText=this.okiPendingBonus==="big"?"🌺 ボーナス成立中！『赤7・赤7・赤7』を狙おう！（Enterキーで自動目押し揃えもOK！）":"🌺 ボーナス成立中！『赤7・赤7・BAR』を狙おう！（Enterキーで自動目押し揃えもOK！）":this.okiStatusText=this.okiHeavenMode&&this.okiGamesSinceBonus<=32?`🌺 32G天国ゾーン (${this.okiGamesSinceBonus}/32G)！次レバーで華がチカるかも…！？ (Spaceで続行)`:"🌺 Spaceキー（またはMAX BET → レバーON）で次のゲームを回そう！";if(this.okiPostNotify&&this.okiPendingBonus!==null){this.okiPostNotify=!1,this.okiHibiscusLit=!0;const i=this.okiPendingBonus==="big"&&(this.okiHibiscusPattern==="rainbow_heaven"||this.okiHibiscusPattern==="san_san_nana");this.audio.playOkiSlotHibiscusChika(i);const t=this.getOkiHibiscusPatternLabel(this.okiHibiscusPattern);this.okiStatusText=`🌺 第3停止後チカッ！！ボーナス確定！！ ${t}`,this.showToast(this.okiStatusText)}}triggerOkiSlotPrimaryAction(){if(this.inspectFocus!=="okislot"){this.sitAtOkiSlot(this.okiMachineIdx);return}if(this.okiState==="bonus_fanfare"){this.okiFanfareTimer=0,this.okiState="idle",this.okiActiveBonus===null&&(this.okiHibiscusLit=!1),this.pullOkiSlotLever(!1);return}if(this.okiState==="idle"){this.pullOkiSlotLever(!1);return}this.okiReelsStopped[0]?this.okiReelsStopped[1]?this.okiReelsStopped[2]||this.stopOkiSlotReel(2,!1):this.stopOkiSlotReel(1,!1):this.stopOkiSlotReel(0,!1)}autoAlignOkiSlotBonus(){if(this.okiPendingBonus===null){this.triggerOkiSlotPrimaryAction();return}this.okiState==="idle"?this.pullOkiSlotLever(!0):this.okiState==="spinning"&&(this.okiReelsStopped[0]||this.stopOkiSlotReel(0,!0),this.okiReelsStopped[1]||this.stopOkiSlotReel(1,!0),this.okiReelsStopped[2]||this.stopOkiSlotReel(2,!0))}evalHibiscusLampPhases(e){if(!e)return[0,0];if(this.okiActiveBonus!==null){const t=this.elapsed;if(this.okiActiveBonus==="big"){const a=.9+.4*Math.sin(t*10),r=.9+.4*Math.cos(t*10);return[1.55+a,1.55+r]}const s=Math.sin(t*14)>=0;return[s?1.25:.25,s?.25:1.25]}if(!this.okiHibiscusLit)return[0,0];const i=this.elapsed;if(this.okiState==="bonus_fanfare"){const t=.85+.45*Math.sin(i*16);return[1.55+t,1.55+t]}switch(this.okiHibiscusPattern){case"rainbow_heaven":{const t=.92+.38*Math.sin(i*12),s=.92+.38*Math.cos(i*12);return[1.55+t,1.55+s]}case"fast_sync":{const t=Math.sin(i*36)>-.15?1.32:.14;return[t,t]}case"slow_fade":{const t=.16+1.18*(.5+.5*Math.sin(i*3.4));return[t,t]}case"left_only":return[1.05+.25*Math.sin(i*9),0];case"san_san_nana":{const t=i%2.4/2.4,s=Math.floor(t*16),a=s===0||s===1||s===2||s===4||s===5||s===6||s>=8&&s<=14,r=t*16%1<.62,n=a&&r?1.35:.1;return[n,n]}default:{const t=Math.sin(i*17.5)>=0;return[t?1.3:.12,t?.12:1.3]}}}stepOkiSlot(e){this.okiLeverAnimTimer>0&&(this.okiLeverAnimTimer=Math.max(0,this.okiLeverAnimTimer-e)),this.okiWinLineFlashTimer>0&&(this.okiWinLineFlashTimer=Math.max(0,this.okiWinLineFlashTimer-e)),this.okiSideLedHintTimer>0&&(this.okiSideLedHintTimer=Math.max(0,this.okiSideLedHintTimer-e)),this.okiState==="bonus_fanfare"&&(this.okiFanfareTimer-=e,this.okiFanfareTimer<=0&&(this.okiFanfareTimer=0,this.okiState="idle",this.okiActiveBonus===null&&(this.okiHibiscusLit=!1)));const i=8.336;let t=!1;for(let s=0;s<3;s=s+1)if(!this.okiReelsStopped[s])this.okiReelAngles[s]-=i*e;else if(this.okiReelsSlipping[s]){const a=this.okiReelAngles[s]-i*e;a<=this.okiReelTargetAngles[s]?(this.okiReelAngles[s]=this.okiReelTargetAngles[s],this.okiReelsSlipping[s]=!1,(this.okiReelsStopped[0]&&!this.okiReelsSlipping[0]?1:0)+(this.okiReelsStopped[1]&&!this.okiReelsSlipping[1]?1:0)+(this.okiReelsStopped[2]&&!this.okiReelsSlipping[2]?1:0)<=this.okiBlackoutTargetCount&&(this.okiReelBlackout[s]=!0,this.audio.playOkiSlotBlackout()),this.okiState==="spinning"&&this.okiReelsStopped[0]&&this.okiReelsStopped[1]&&this.okiReelsStopped[2]&&!this.okiReelsSlipping[0]&&!this.okiReelsSlipping[1]&&!this.okiReelsSlipping[2]&&(t=!0)):this.okiReelAngles[s]=a}t&&this.settleOkiSlotSpin()}buildOkiSlotSnapshot(){const e=this.inspectFocus==="okislot";let i="🎰 MAX BET ＆ レバーON (Space)";this.okiState==="bonus_fanfare"?i=this.okiActiveBonus!==null?"🎊 ボーナス消化スタート！ (Space)":"🌺 天国ゾーンへ！レバーON (Space)":this.okiState==="spinning"?this.okiReelsStopped[0]?this.okiReelsStopped[1]?i="🛑 右リール停止 (Space / 3)":i="🛑 中リール停止 (Space / 2)":i="🛑 左リール停止 (Space / 1)":this.okiActiveBonus!==null?i=`🔔 ボーナス消化 (${this.okiBonusEarned}/${this.okiBonusTarget}枚) [Space]`:this.okiPendingBonus!==null?i="🌺 レバーONしてボーナスを揃える (Space)":(this.okiReplayFreeBet||this.okiBetCount>=3)&&(i="🕹️ レバーON！リール始動 (Space)");const t=this.okiBigCount+this.okiRegCount,s=t>0?`1/${(this.okiTotalSpins/t).toFixed(1)}`:"1/--",a=this.okiMedals+this.okiCredit+this.okiBetCount-this.okiInvestedMedals;return{active:e,machineNo:this.okiMachineIdx+1,medals:this.okiMedals,credit:this.okiCredit,diffMedals:a,betCount:this.okiBetCount,state:this.okiState,reelsStopped:[this.okiReelsStopped[0]&&!this.okiReelsSlipping[0],this.okiReelsStopped[1]&&!this.okiReelsSlipping[1],this.okiReelsStopped[2]&&!this.okiReelsSlipping[2]],upperSymbols:[this.getOkiSymbolLabelAt(0,this.okiReelStops[0]+1),this.getOkiSymbolLabelAt(1,this.okiReelStops[1]+1),this.getOkiSymbolLabelAt(2,this.okiReelStops[2]+1)],centerSymbols:[this.getOkiSymbolLabelAt(0,this.okiReelStops[0]),this.getOkiSymbolLabelAt(1,this.okiReelStops[1]),this.getOkiSymbolLabelAt(2,this.okiReelStops[2])],lowerSymbols:[this.getOkiSymbolLabelAt(0,this.okiReelStops[0]-1),this.getOkiSymbolLabelAt(1,this.okiReelStops[1]-1),this.getOkiSymbolLabelAt(2,this.okiReelStops[2]-1)],hibiscusLit:this.okiHibiscusLit||this.okiActiveBonus!==null,hibiscusRainbow:this.okiActiveBonus==="big"||this.okiOneGRenStock>0||this.okiHibiscusLit&&(this.okiHibiscusPattern==="rainbow_heaven"||this.okiState==="bonus_fanfare"),hibiscusPatternLabel:this.okiActiveBonus!==null?this.okiActiveBonus==="big"?`🎊 BIG BONUS 消化中 (${this.okiBonusEarned}/${this.okiBonusTarget}枚)`:`🎉 REG BONUS 消化中 (${this.okiBonusEarned}/${this.okiBonusTarget}枚)`:this.okiHibiscusLit?this.getOkiHibiscusPatternLabel(this.okiHibiscusPattern):null,pendingBonus:this.okiPendingBonus,activeBonus:this.okiActiveBonus,bonusEarned:this.okiBonusEarned,bonusTarget:this.okiBonusTarget,oneGRenStock:this.okiOneGRenStock,sideLedHintLabel:this.okiSideLedHintTimer>0?this.getOkiSideLedHintLabel(this.okiSideLedHintCode):null,heavenMode:this.okiHeavenMode&&this.okiGamesSinceBonus<=32&&this.okiActiveBonus===null,gamesSinceBonus:this.okiGamesSinceBonus,totalSpins:this.okiTotalSpins,bigCount:this.okiBigCount,regCount:this.okiRegCount,combinedRateLabel:s,history:this.okiHistory,lastPayout:this.okiLastPayout,statusText:this.okiStatusText,primaryActionLabel:i}}isFishingActive(){return this.fishingPhase!=="inactive"}toggleFishingMode(){this.fishingPhase!=="inactive"?this.stopFishingMode():this.startFishingMode(!1)}isValidCastWaterPoint(e,i){return Math.abs(e)>25.5||Math.abs(i)>25.5||this.isOverBoatDeck(e,i)||this.getClubhouseAndPierFloorY(e,i)>0||e>=-.75&&e<=5.85&&i>=11.95&&i<=22.1||e>=-8.7&&e<=-5.85&&i>=10.7&&i<=24.2?!1:this.getTerrainY(e,i)<4.25}measureOpenWaterSpanAlongYaw(e){const i=ni[this.fishingRig],t=-Math.sin(e),s=-Math.cos(e);let a=999,r=-1;for(let n=i.minCastM;n<=i.maxCastM+.01;n+=.55){const o=this.pos[0]+t*n,l=this.pos[2]+s*n;if(this.isValidCastWaterPoint(o,l))n<a&&(a=n),n>r&&(r=n);else if(r>0)break}return{ok:r-a>=2.2,minD:r>0?a:i.minCastM,maxD:r>0?r:i.maxCastM}}refreshFishingTideRipSpot(e=!0){let i=this.diverHeadingYaw,t=this.measureOpenWaterSpanAlongYaw(i);if(!t.ok&&e){const s=[-.22,.22,-.46,.46,-.75,.75,-1.1,1.1,-1.5,1.5,2,-2,Math.PI];for(const a of s){const r=this.diverHeadingYaw+a,n=this.measureOpenWaterSpanAlongYaw(r);if(n.ok){i=r,t=n,this.diverHeadingYaw=i,this.yaw=i+.48,this.pitch=-.15,this.updateLookVector();break}}}if(t.ok){this.fishingValidMinDistM=t.minD,this.fishingValidMaxDistM=t.maxD;const s=(this.fishingSweetSpotMinPct+this.fishingSweetSpotMaxPct)*.005,a=t.minD+(t.maxD-t.minD)*s,r=-Math.sin(i),n=-Math.cos(i);this.fishingTideRipPos[0]=this.pos[0]+r*a,this.fishingTideRipPos[1]=5.466,this.fishingTideRipPos[2]=this.pos[2]+n*a}else this.fishingValidMinDistM=6.5,this.fishingValidMaxDistM=13,this.fishingTideRipPos[0]=-1.35,this.fishingTideRipPos[1]=5.466,this.fishingTideRipPos[2]=8.45;this.computeCastPointAtPower(this.fishingCastPower>0?this.fishingCastPower:76,this.fishingCastPreviewPos)}computeCastPointAtPower(e,i){const t=Math.max(8,Math.min(100,e))/100,s=-Math.sin(this.diverHeadingYaw),a=-Math.cos(this.diverHeadingYaw),r=this.fishingValidMinDistM+(this.fishingValidMaxDistM-this.fishingValidMinDistM)*t,n=this.pos[0]+s*r,o=this.pos[2]+a*r;if(this.isValidCastWaterPoint(n,o)){i[0]=n,i[1]=5.46,i[2]=o;return}i[0]=this.fishingTideRipPos[0],i[1]=5.46,i[2]=this.fishingTideRipPos[2]}selectFishingRig(e){if(this.fishingRig===e)return;this.fishingRig=e;const i=ni[e];this.audio.playGearClick(1),(this.fishingPhase==="ready"||this.fishingPhase==="landed")&&(this.fishingPhase="ready",this.refreshFishingTideRipSpot(!1)),this.showToast(`🎣 仕掛け切替：『${i.fullName}』をセットしたよ！`)}nudgeFishingAim(e,i=1){if(this.fishingPhase!=="ready"&&this.fishingPhase!=="landed")return;this.fishingPhase==="landed"&&(this.fishingPhase="ready");const t=-e*.085*i,s=this.diverHeadingYaw+t;this.measureOpenWaterSpanAlongYaw(s).ok&&(this.diverHeadingYaw=s,this.yaw+=t*.65,this.updateLookVector(),this.refreshFishingTideRipSpot(!1))}setFishingRodLeanUi(e){this.fishingRodLeanUiDir=e}getEffectiveRodLeanDir(){if(this.fishingRodLeanUiDir!==0)return this.fishingRodLeanUiDir;const e=this.keys.has("KeyA")||this.keys.has("ArrowLeft"),i=this.keys.has("KeyD")||this.keys.has("ArrowRight");return e&&!i?-1:i&&!e?1:0}startFishingMode(e=!1){document.pointerLockElement===this.engine.getCanvas()&&document.exitPointerLock(),this.faunaObserveAgentId=null,this.entryMode=null,this.seatedStoolIndex=null,this.activeLieSpot=null,this.activeDiningSeat=null,this.bbqEatTimer=0,this.barPrepTimer=0,this.barSipTimer=0,this.inspectFocus="none",this.wearingScubaUnit&&(this.wearingScubaUnit=!1);const i=this.pos[0]>=-8.4&&this.pos[0]<=-6.1&&this.pos[2]>=11.2&&this.pos[2]<=21.5&&this.pos[1]>=6.5,t=this.isOverBoatDeck(this.pos[0],this.pos[2])&&this.pos[1]>=6.5,s=this.pos[1]>=5.55&&this.pos[2]>=16.5&&this.pos[2]<=21.8&&Math.abs(this.pos[0])<=11;e||!i&&!t&&!s?(this.pos[0]=-6.54,this.pos[1]=6.08+.91,this.pos[2]=15.1,this.diverHeadingYaw=-.68,this.yaw=-.18,this.pitch=-.15):i?(this.pos[0]=-6.54,this.pos[1]=6.08+.91,this.pos[2]=Math.max(14.2,Math.min(18.5,this.pos[2])),this.diverHeadingYaw=-.68,this.yaw=-.18,this.pitch=-.15):s&&(this.diverHeadingYaw=-.35,this.yaw=.12,this.pitch=-.15),this.vel[0]=0,this.vel[1]=0,this.vel[2]=0,this.curBodyTrimDeg=90,this.wasAboveSurface=!0,this.cameraMode="tpv",this.tpvDistance=2.55,this.fishingPhase="ready",this.fishingPhaseTimer=0,this.fishingCastCharging=!1,this.fishingCastHoldSec=0,this.fishingCastPower=0,this.fishingReelHeld=!1,this.fishingRodLeanUiDir=0,this.fishingSmoothedRodLean=0,this.fishingTwitchAnim=0,this.fishingTension=0,this.fishingAttraction=0,this.activePoseStyle="fish_idle",this.refreshFishingTideRipSpot(!0),this.updateLookVector(),this.audio.playGearClick(2),this.showToast("🎣 本格・美ら海フィッシング開始！①仕掛け(1〜4)を選んで ②A/Dで潮目を狙い ③Space/左クリック長押しで潮目リングへフルキャストしよう！")}stopFishingMode(){this.fishingPhase!=="inactive"&&(this.fishingPhase="inactive",this.fishingCastCharging=!1,this.fishingReelHeld=!1,this.fishingRodLeanUiDir=0,this.fishingSmoothedRodLean=0,this.fishingTwitchAnim=0,this.fishingTension=0,this.engine.getVrmAvatar().setFishingMotionState(0,0),this.activePoseStyle="land_walk",this.audio.playGearClick(0),this.showToast("🚶 釣竿をしまって自由散策モードに戻ったよ！（釣った魚はビーチBBQでさばいて食べられるよ♪）"))}rollFishForCurrentRig(e){const i=ni[this.fishingRig],t={...i.weights};e&&(t.taman*=1.55,t.meebai*=1.85,t.akamachi*=2.1,t.gaara*=1.35);let s=0;for(const g of Gs)s+=t[g];const a=Math.random()*s;let r=0,n="gurukun";for(const g of Gs)if(r+=t[g],a<=r){n=g;break}const o=Gt[n],l=e?.56:.78,h=1+i.sizeBonus+(e?.08:0),c=(o.maxCm-o.minCm)*h,u=Math.round((o.minCm+Math.pow(Math.random(),l)*c)*10)/10;return{kind:n,cm:u}}launchCastWithPower(e){this.fishingCastCharging=!1,this.computeCastPointAtPower(e,this.fishingFloatTarget);const i=e>=this.fishingSweetSpotMinPct&&e<=this.fishingSweetSpotMaxPct,t=!i&&e>=this.fishingSweetSpotMinPct-14&&e<=this.fishingSweetSpotMaxPct+8;this.fishingLastCastQuality=i?"perfect":t?"good":"normal";for(let s=0;s<3;s++){const a=this.rollFishForCurrentRig(i||t&&s===2),r=this.fishingStalkers[s];r.kind=a.kind,r.cm=a.cm,r.angleOffset=Math.random()*Math.PI*2,r.orbitSpeed=(s%2===0?1:-1)*(.82+Math.random()*.45),r.radiusM=1.65+s*.62,r.depthOffset=.08*s}this.fishingTargetKind=this.fishingStalkers[0].kind,this.fishingTargetCm=this.fishingStalkers[0].cm,this.fishingPhase="casting",this.fishingPhaseTimer=0,this.fishingTension=0,this.fishingAttraction=i?44:t?22:8,this.fishingWaitDuration=i?2.1+Math.random()*1.1:3.1+Math.random()*1.5,this.fishingNibbleDuration=1.25+Math.random()*.85,this.fishingNextNibbleBeep=.14,this.audio.playFishingCast(),i&&(this.audio.playFishingPerfectCast(),this.showToast("🎯 PERFECT CAST!! 潮目のど真ん中にドンピシャ投入！！大物魚影の活性＆レア出現率が大幅アップ！"))}beginFishingPrimaryPress(){if(this.fishingPhase==="inactive"){this.startFishingMode(!1);return}if(this.fishingPhase==="fighting"){this.fishingReelHeld=!0;return}if(this.fishingPhase==="ready"||this.fishingPhase==="landed"){this.fishingPhase==="landed"&&(this.diverHeadingYaw=this.fishingSavedSeaYaw,this.yaw=this.fishingSavedSeaYaw+.48,this.pitch=-.15,this.tpvDistance=2.55,this.updateLookVector()),this.fishingPhase="ready",this.refreshFishingTideRipSpot(!1),this.fishingCastCharging||(this.fishingCastCharging=!0,this.fishingCastHoldSec=0,this.fishingCastPower=18,this.fishingCastDirSign=1,this.fishingCastTickBucket=-1);return}this.triggerFishingAction()}endFishingPrimaryPress(){if(this.fishingReelHeld=!1,this.fishingCastCharging){const e=this.fishingCastHoldSec<.15?70:this.fishingCastPower;this.launchCastWithPower(e)}}triggerFishingTwitch(){if(this.fishingTwitchCooldown>0||this.fishingPhase!=="waiting"&&this.fishingPhase!=="nibble")return;const e=ni[this.fishingRig];if(this.fishingTwitchCooldown=.48,this.fishingTwitchAnim=1,this.fishingSplashPos[0]=this.fishingFloatPos[0],this.fishingSplashPos[1]=5.46,this.fishingSplashPos[2]=this.fishingFloatPos[2],this.fishingSplashTimer=.46,this.audio.playFishingTwitch(e.isLure),this.fishingPhase==="waiting"){const i=e.isLure?36:32;this.fishingAttraction=Math.min(100,this.fishingAttraction+i),this.fishingPhaseTimer+=.72;for(const t of this.fishingStalkers)t.radiusM=Math.max(.55,t.radiusM*.74);if(this.fishingAttraction>=72){let t=0,s=-1;for(let a=0;a<3;a++){const r=this.fishingStalkers[a],n=Gt[r.kind].stars*100+r.cm;n>s&&(s=n,t=a)}if(t!==0){const a=this.fishingStalkers[0].kind,r=this.fishingStalkers[0].cm;this.fishingStalkers[0].kind=this.fishingStalkers[t].kind,this.fishingStalkers[0].cm=this.fishingStalkers[t].cm,this.fishingStalkers[t].kind=a,this.fishingStalkers[t].cm=r,this.fishingTargetKind=this.fishingStalkers[0].kind,this.fishingTargetCm=this.fishingStalkers[0].cm}}}else this.fishingPhase==="nibble"&&(e.isLure?(this.fishingAttraction=100,this.fishingPhaseTimer=this.fishingNibbleDuration-.05,this.showToast("✨ リアクションバイト誘発！！ミノーのヒラ打ちに魚が猛然と食らいつくぞ！")):this.fishingRig==="ukifukase"?(this.fishingAttraction=Math.min(100,this.fishingAttraction+18),this.fishingPhaseTimer+=.3):(this.fishingPhaseTimer=Math.max(0,this.fishingPhaseTimer-.35),this.showToast("🤫 前アタリ中は仕掛けを動かしすぎないで…本アタリでウキが沈むまで待とう！")))}triggerFishingAction(){if(this.fishingPhase==="inactive"){this.startFishingMode(!1);return}if(this.fishingPhase==="ready"||this.fishingPhase==="landed"){this.fishingPhase==="landed"&&(this.diverHeadingYaw=this.fishingSavedSeaYaw,this.yaw=this.fishingSavedSeaYaw+.48,this.pitch=-.15,this.tpvDistance=2.55,this.updateLookVector()),this.refreshFishingTideRipSpot(!1),this.launchCastWithPower(this.fishingCastCharging?this.fishingCastPower:76);return}if(this.fishingPhase==="waiting"||this.fishingPhase==="nibble"){this.fishingPhase="ready",this.fishingPhaseTimer=0,this.fishingCastCharging=!1,this.refreshFishingTideRipSpot(!1),this.audio.playFishingCast(),this.showToast("💦 早アワセしちゃった！『ズボッ！！HIT!!』と海中に消し込んだ瞬間にアワセよう！（Fキーは誘いアクションだよ♪）");return}if(this.fishingPhase==="bite"){const e=this.fishingPhaseTimer<=.62;this.fishingCriticalHook=e,this.fishingPhase="fighting",this.fishingPhaseTimer=0,this.fishingTension=e?22:30,this.fishingStamina=e?76:100;const i=this.fishingFloatPos[0]-this.pos[0],t=this.fishingFloatPos[2]-this.pos[2];this.fishingStartDistM=Math.max(4.8,Math.hypot(i,t)),this.fishingDistM=this.fishingStartDistM,this.fishingSwimDir=Math.random()<.5?-1:1,this.fishingRootDive=!1,this.fishingDirChangeTimer=1.65,this.fishingSurgeTimer=.9+Math.random()*.7,this.fishingSurgeDuration=.65,this.fishingSplashPos[0]=this.fishingFloatPos[0],this.fishingSplashPos[1]=5.46,this.fishingSplashPos[2]=this.fishingFloatPos[2],this.fishingSplashTimer=.55,e?this.audio.playFishingCriticalHook():this.audio.playFishingBiteAlert();const s=Gt[this.fishingTargetKind].pullStrength;e?this.showToast(s>=.8?"⚡ CRITICAL AWASE!! 完璧な鬼アワセで大物の体力を一気に24%削ったぞ！！左右の走りに逆方向(A/D)の竿さばきでカウンターを決めよう！":"⚡ CRITICAL AWASE!! 抜群のタイミングでフッキング成功！！A/DでいなしながらSpace/左クリック長押しで巻き上げよう！"):this.showToast(s>=.8?"🔥 ズシィィッ！！強烈な大物HIT！！魚が走る逆方向(A/D)へ竿を倒していなし、体力を削って寄せよう！":"🔥 ガツンッ！HIT！！元気な沖縄の地魚だ！A/Dでいなしながらリールを巻こう！")}}setFishingReelHeld(e){this.fishingReelHeld=e}goCookLastCatchAtBbq(){const e=this.fishingLastCatch?.kind;this.fishingPhase="inactive",this.fishingCastCharging=!1,this.fishingReelHeld=!1,this.fishingRodLeanUiDir=0,this.engine.getVrmAvatar().setFishingMotionState(0,0),this.openBbqStation(),e&&this.seafoodStock[e]>0&&this.placeSeafoodOnBoard(e)}openBbqStation(){this.fishingPhase="inactive",this.fishingReelHeld=!1,this.setInspectFocus("bbq_station"),this.showToast("🔪 3DビーチBBQキッチン！①クーラーから食材をまな板へ → ②出刃包丁クリックでさばく → ③炭火網で両面こんがり焼いて盛り付けよう！")}restockCoolerBox(){this.seafoodStock.gurukun+=2,this.seafoodStock.irabucha+=1,this.seafoodStock.taman+=1,this.seafoodStock.gaara+=1,this.seafoodStock.meebai+=1,this.seafoodStock.shellfish+=2,this.seafoodStock.lobster+=1,this.seafoodStock.wagyu+=2,this.seafoodStock.skewer+=2,this.audio.playItemPickup(!1),this.showToast("🧊 ロックアイス満載クーラーに『特選石垣牛A5ステーキ・沖縄アグー豚串・イセエビ・ミーバイ・タマン・イラブチャー・シャコガイ・グルクン』を贅沢補充したよ！")}pourBbqPairingDrink(e){this.bbqPairingDrink=e,this.bbqPairingSipsLeft=3,this.bbqPairingSipAnimTimer=0,this.audio.playBubbles(!1),this.audio.playItemPickup(!1),this.showToast(e==="beer"?"🍺 プシュゥゥ…トクトクトクッ！BBQカウンターに極冷ジョッキ『7:3神泡アイランド生ビール（満タン 3/3）』を注いだよ！アツアツの炭火焼きと一緒に最高の一杯をどうぞ！":"🥃 カランッ…シュワァァーッ！かち割りロックアイスぎっしりの『超強炭酸・角ハイボール（満タン 3/3）』をセットしたよ！石垣牛ステーキ＆海鮮と相性抜群！")}sipOrRefillBbqPairingDrink(){if(this.bbqPairingSipsLeft<=0){this.pourBbqPairingDrink(this.bbqPairingDrink);return}const e=this.bbqPairingSipsLeft;this.bbqPairingSipsLeft=Math.max(0,this.bbqPairingSipsLeft-1),this.bbqPairingSipAnimTimer=.65,this.inspectFocus="none",this.activeLieSpot=null,this.seatedStoolIndex=null,this.activeDiningSeat===null&&(this.activeDiningSeat=3);const i=Lt[this.activeDiningSeat]??Lt[0],t=this.engine.getVrmAvatar(),s=t.getSeatedContactHeight(),a=t.getSeatedForwardScoot(i.idx===4?.305:.256);this.pos[0]=i.x-Math.sin(i.headingYaw)*a,this.pos[1]=i.seatTopY+.88-s,this.pos[2]=i.z-Math.cos(i.headingYaw)*a,this.diverHeadingYaw=i.headingYaw,this.yaw=i.headingYaw-Math.PI-.34,this.pitch=-.14,this.tpvDistance=1.38,this.cameraMode="tpv",this.updateLookVector(),this.activeBarDrink=this.bbqPairingDrink,this.barSipsLeft=this.bbqPairingSipsLeft,this.barSipStartFill=e/3,this.barSipTargetFill=this.bbqPairingSipsLeft/3,this.barSipTimer=2.85,this.tipsyGlowSec=28,this.shikuwasaRelaxBonus=!0,this.audio.playDrinkSip(this.bbqPairingDrink==="highball",this.bbqPairingSipsLeft===0);const r=this.bbqPairingDrink==="beer"?"極冷・7:3神泡アイランド生ビール":"かち割りロックアイス強炭酸ハイボール";this.showToast(this.bbqPairingSipsLeft>0?`🍻 ゴクッ…ゴクッ…ぷはぁ〜っ！！潮風の中で飲むキンッキンの『${r}』、最高すぎるバカンス…！！（残り ${this.bbqPairingSipsLeft}/3）`:`🍻 ゴクゴクッ…ぷはぁ〜っ！！『${r}』を最後の一滴まで飲み干したよ！ジョッキをクリックでもう一杯おかわりしよう！`)}placeSeafoodOnBoard(e){if(this.inspectFocus!=="bbq_station"&&Math.hypot(this.pos[0]-2.74,this.pos[2]-20.85)>3.8&&this.setInspectFocus("bbq_station"),this.boardItem&&this.boardItem.filleted&&!this.grillBoardSeafood())return;const i=e?[e]:["wagyu","lobster","akamachi","meebai","skewer","taman","irabucha","gaara","gurukun","shellfish"];let t=null;for(const a of i)if(this.seafoodStock[a]>0){t=a;break}if(!t){this.audio.playDiveAlertBeep(),this.showToast(e?`🐟 クーラーに『${Ve[e].name}』がないよ！海で獲ってくるか『🧊 クーラー補充』を押そう！`:"🧊 クーラーの魚介が空っぽだよ！海に潜って魚や貝を獲ってくるか『🧊 クーラー補充』しよう！");return}this.boardItem&&!this.boardItem.filleted&&(this.seafoodStock[this.boardItem.kind]+=1),this.seafoodStock[t]-=1,this.pendingBoardFilletReveal=!1,this.knifeChopTimer=0,this.boardItem={kind:t,cutsDone:0,cutsNeeded:2,filleted:!1},this.audio.playGearClick(2);const s=t==="wagyu"?`🥩 木曽檜のまな板に『${Ve[t].name}』を乗せたよ！包丁で筋切り＆引き切りステーキカットに仕立てよう！`:t==="skewer"?"🍢 檜のまな板にアグー豚バラ塊肉と島野菜を並べたよ！押し切り＆椎茸の飾り切りでBBQ串を仕込もう！":t==="shellfish"?`🦪 檜のまな板に『${Ve[t].name}』を置いたよ！殻の隙間に刃を入れて貝柱を外そう！`:t==="lobster"?`🦞 檜のまな板に『${Ve[t].name}』を頭左で据えたよ！出刃包丁で兜割り＆半身割りにしよう！`:`🐟 檜のまな板に『${Ve[t].name}』を頭左・腹手前で据えたよ！三枚おろし＆飾り包丁を入れよう！`;this.showToast(s)}sliceBoardSeafood(){if(!this.boardItem){this.placeSeafoodOnBoard();return}if(this.pendingBoardFilletReveal&&this.knifeChopTimer>.14)return;if(this.pendingBoardFilletReveal&&(this.boardItem.filleted=!0,this.pendingBoardFilletReveal=!1),this.boardItem.filleted){this.grillBoardSeafood();return}if(this.knifeChopTimer>this.knifeAnimDuration*.65)return;this.boardItem.cutsDone+=1;const e=this.boardItem.cutsDone>=this.boardItem.cutsNeeded,i=this.boardItem.kind;i==="wagyu"?(this.activeKnifeMode=e?"wagyu_slice":"wagyu_sinew",this.knifeAnimDuration=e?.96:.84):i==="skewer"?(this.activeKnifeMode=e?"skewer_star":"skewer_chop",this.knifeAnimDuration=e?.88:.84):i==="shellfish"?(this.activeKnifeMode=e?"clam_shuck":"clam_pry",this.knifeAnimDuration=e?.86:.88):i==="lobster"?(this.activeKnifeMode=e?"lobster_split":"lobster_helm",this.knifeAnimDuration=.9):(this.activeKnifeMode=e?"fish_kazari":"fish_deba",this.knifeAnimDuration=e?.92:.9),this.knifeChopTimer=this.knifeAnimDuration,this.audio.playKnifeChop(this.boardItem.cutsDone,this.activeKnifeMode);const t=Ve[i];if(e){this.pendingBoardFilletReveal=!0;const s=i==="wagyu"?"極上の引き切りで":i==="skewer"?"椎茸の十字飾り切り＆串打ちで":i==="shellfish"?"鮮やかな貝柱外し＆そぎ切りで":i==="lobster"?"豪快な縦一文字の半身割りで":"柳刃の三連・引き切り飾り包丁で";this.showToast(`🔪 ${s}『${t.filletName}』が完成！もう一度クリックして炭火コンロの焼き網へ乗せよう！（お刺身のまま実食も可♪）`)}else{const s=i==="wagyu"?"切っ先で赤身と脂身の境目を丁寧に『筋切り』したよ！(1/2) もう一太刀で極厚サーロインを引き切りスライスにしよう！":i==="skewer"?"三徳の軽快な『押し切り』でアグー豚バラと島野菜を切り揃えたよ！(1/2) もう一工程で原木椎茸に十字の飾り包丁を入れて串打ちしよう！":i==="shellfish"?"殻の合わせ目に水平に刃を滑り込ませて蝶番を開いたよ！(1/2) もう一太刀で下殻から特大貝柱をはがしてそぎ切りにしよう！":i==="lobster"?"頭胸甲の継ぎ目に出刃の切っ先を突き入れて『兜割り』にしたよ！(1/2) もう一太刀で尾まで真っ二つに半身割りしよう！":"胸ビレ裏から頭を落とし、中骨に刃を水平に沿わせて『三枚おろし』にしたよ！(1/2) もう一太刀で皮目に柳刃の引き切り飾り包丁を入れよう！";this.showToast(`🔪 ${s}`)}}grillBoardSeafood(e){if(!this.boardItem)return this.audio.playDiveAlertBeep(),this.showToast("🐟 まずはクーラーから魚介をまな板に出して包丁でさばこう！"),!1;if(this.pendingBoardFilletReveal&&(this.boardItem.filleted=!0,this.pendingBoardFilletReveal=!1,this.knifeChopTimer=0),!this.boardItem.filleted)return this.sliceBoardSeafood(),!1;let i=-1;if(e!==void 0&&e>=0&&e<3&&this.grillSlots[e]===null?i=e:i=this.grillSlots.findIndex(s=>s===null),i<0)return this.audio.playDiveAlertBeep(),this.showToast("🔥 炭火焼き網の3枠がいっぱいだよ！焼けた食材をクリックしてお皿に盛り付けよう！"),!1;const t=this.boardItem.kind;return this.boardItem=null,this.grillSlots[i]={kind:t,sideADoneness:0,sideBDoneness:0,flipped:!1,flipAnimTimer:0},this.tongsActionSlot=i,this.tongsActionTimer=.42,this.audio.playBbqSizzle(!0,!1),this.showToast(`🔥 ジュワァァーッ！！備長炭の焼き網に『${Ve[t].filletName}』を乗せたよ！片面が焼けてきたらクリックで裏返そう！`),!0}interactWithGrillSlot(e){const i=Math.max(0,Math.min(2,e)),t=this.grillSlots[i];if(!t){this.boardItem&&this.boardItem.filleted?this.grillBoardSeafood(i):this.boardItem&&!this.boardItem.filleted?this.sliceBoardSeafood():this.placeSeafoodOnBoard();return}const s=t.sideADoneness+t.sideBDoneness,r=Math.max(t.sideADoneness,t.sideBDoneness)>=1.85,n=t.flipped&&t.sideBDoneness>=.36&&t.sideADoneness>=.32||s>=.88;if(!t.flipped&&!r&&t.sideADoneness<1.25){t.flipped=!0,t.flipAnimTimer=.48,this.tongsActionSlot=i,this.tongsActionTimer=.48,this.audio.playBbqSizzle(!0,!1),this.showToast(t.sideADoneness>=.35?`🥢 ジュワァッ！3Dトングで『${Ve[t.kind].name}』をクルッと裏返したよ！香ばしい網目の焼き色がついてきた♪`:"🥢 トングで裏返したよ！備長炭の遠赤外線でじっくり両面を焼き上げよう！");return}if(!n&&!r){t.flipped=!t.flipped,t.flipAnimTimer=.44,this.tongsActionSlot=i,this.tongsActionTimer=.44,this.audio.playBbqSizzle(!0,!1),this.showToast("🥢 もうちょっと焼くと黄金色の食べ頃になるよ！ジュワジュワいい香り♪");return}this.grillSlots[i]=null,this.tongsActionSlot=i,this.tongsActionTimer=.4;const o=r?"charred":"golden";this.platedItems.length>=4&&this.platedItems.shift(),this.platedItems.push({kind:t.kind,quality:o}),this.audio.playItemPickup(!r),this.showToast(r?"😅 ちょっと焼きすぎて焦げちゃったけどお皿に上げたよ！お皿をクリックして味見してみよう！":`🍽️ 最高に美味しそうな『${Ve[t.kind].grillName}』が完成！琉球白磁皿をクリック（またはSpace）して食べよう！`)}eatBoardSashimi(){if(!this.boardItem||!this.boardItem.filleted){this.audio.playDiveAlertBeep(),this.showToast("🔪 先にまな板の上の食材を包丁でさばいてね！");return}if(this.boardItem.kind==="skewer"){this.audio.playDiveAlertBeep(),this.showToast("🔥 沖縄アグー豚＆島野菜串は生食できないよ！備長炭の焼き網に乗せてこんがり焼いて食べよう！");return}const e=this.boardItem.kind;this.boardItem=null,this.triggerBbqEatSequence(e,!0,!1)}eatPlatedBbqFood(){const e=this.platedItems.pop();if(!e){this.boardItem&&this.boardItem.filleted?this.grillBoardSeafood():(this.audio.playDiveAlertBeep(),this.showToast("🍽️ まだお皿に料理が乗っていないよ！魚介をさばいて炭火コンロで焼いて盛り付けよう！"));return}this.triggerBbqEatSequence(e.kind,!1,e.quality==="charred")}triggerBbqEatSequence(e,i,t){this.lastEatenKind=e,this.lastEatenSashimi=i,this.lastEatenCharred=t,this.bbqEatTimer=3.1,this.savorGlowSec=t?0:20,this.totalBbqEaten+=1,this.inspectFocus="none",this.activeLieSpot=null,this.seatedStoolIndex=null,this.activeDiningSeat===null&&(this.activeDiningSeat=3);const s=Lt[this.activeDiningSeat]??Lt[0],a=this.engine.getVrmAvatar(),r=a.getSeatedContactHeight(),n=a.getSeatedForwardScoot(s.idx===4?.305:.256);if(this.pos[0]=s.x-Math.sin(s.headingYaw)*n,this.pos[1]=s.seatTopY+.88-r,this.pos[2]=s.z-Math.cos(s.headingYaw)*n,this.diverHeadingYaw=s.headingYaw,this.yaw=s.headingYaw-Math.PI-.34,this.pitch=-.14,this.tpvDistance=1.38,this.cameraMode="tpv",this.updateLookVector(),this.audio.playEatBite(!t),t)this.showToast(`😅 パリッ…ちょっと苦い『${Ve[e].name}の丸焦げ焼き』を食べたよ！次は黄金色のうちにトングでお皿に上げよう♪`);else{this.bbqBuffActive=!0,this.shikuwasaRelaxBonus=!0,this.maxApneaSec=Math.max(this.maxApneaSec,75),this.apneaSec=this.maxApneaSec;const o=i?e==="wagyu"?"『特選・石垣牛A5霜降り炙りタタキ』":`獲れたて『${Ve[e].filletName}』のお造り`:`炭火焼きたて『${Ve[e].grillName}』`,l=this.bbqPairingSipsLeft>0?(this.bbqPairingSipsLeft=Math.max(0,this.bbqPairingSipsLeft-1),this.bbqPairingSipAnimTimer=.65,this.bbqPairingDrink==="beer"?" ＆ キンッキンの『7:3神泡生ビール』で流し込む至福のバカンス！！🍺✨":" ＆ ロックアイス『強炭酸ハイボール』でキリッと流し込む至福のバカンス！！🥃✨"):"（浜焼きスタミナ効果：素潜り75秒・遊泳速度+15%・エア節約UP！）";this.showToast(`😋 水上ダイニング特等席で${o}を堪能！${l}`)}}sitAtDiningTable(e=3){const i=Math.max(0,Math.min(Lt.length-1,e));if(this.activeDiningSeat===i&&this.bbqEatTimer<=0){this.standUpFromDiningChair();return}this.entryMode=null,this.faunaObserveAgentId=null,this.seatedStoolIndex=null,this.activeLieSpot=null,this.inspectFocus="none",this.fishingPhase="inactive",this.fishingReelHeld=!1,this.wearingScubaUnit&&(this.wearingScubaUnit=!1),this.activeDiningSeat=i;const t=Lt[i],s=this.engine.getVrmAvatar(),a=s.getSeatedContactHeight(),r=s.getSeatedForwardScoot(t.idx===4?.305:.256);this.pos[0]=t.x-Math.sin(t.headingYaw)*r,this.pos[1]=t.seatTopY+.88-a,this.pos[2]=t.z-Math.cos(t.headingYaw)*r,this.vel[0]=0,this.vel[1]=0,this.vel[2]=0,this.diverHeadingYaw=t.headingYaw,this.curBodyTrimDeg=90,this.activePoseStyle="dining_sit",this.yaw=t.camYaw,this.pitch=-.15,this.tpvDistance=2.6,this.cameraMode="tpv",this.wasAboveSurface=!0,this.audio.playGearClick(1),this.showToast(this.platedItems.length>0?`🍽️ 『${t.label}』に着席！目の前の大皿をクリック（またはSpace）して焼きたてのご馳走と冷えた一杯を味わおう！`:`🪑 『${t.label}』に着席！エメラルドの海を眺めながら冷えた生ビール＆炭火BBQディナーを楽しめるよ♪（WASDで立ち上がる）`),this.updateLookVector()}standUpFromDiningChair(){if(this.activeDiningSeat===null)return;const e=Lt[this.activeDiningSeat]??Lt[0];this.activeDiningSeat=null,this.bbqEatTimer=0,this.pos[0]=e.standX,this.pos[1]=6.12+.91,this.pos[2]=e.standZ,this.vel[0]=0,this.vel[1]=0,this.vel[2]=0,this.diverHeadingYaw=e.headingYaw,this.curBodyTrimDeg=90,this.activePoseStyle="land_walk",this.audio.playGearClick(0),this.showToast("🚶 水上ダイニングチェアから立ち上がったよ！")}lieDownOnSpot(e){if(this.activeLieSpot===e){this.standUpFromLieSpot();return}if(this.entryMode=null,this.faunaObserveAgentId=null,this.seatedStoolIndex=null,this.activeDiningSeat=null,this.bbqEatTimer=0,this.inspectFocus="none",this.wearingScubaUnit&&(this.wearingScubaUnit=!1),this.activeLieSpot=e,this.vel[0]=0,this.vel[1]=0,this.vel[2]=0,this.wasAboveSurface=!0,this.cameraMode="tpv",document.pointerLockElement===this.engine.getCanvas()&&document.exitPointerLock(),e==="hammock")this.pos[0]=-3.26,this.pos[1]=6.67,this.pos[2]=20.45,this.diverHeadingYaw=-Math.PI*.5,this.curBodyTrimDeg=175,this.activePoseStyle="hammock_lie",this.yaw=2.82,this.pitch=-.18,this.tpvDistance=2.85,this.audio.playGearClick(2),this.showToast("🌴 2本のヤシの木の編み込みハンモックにゴロンと寝転んだよ！ドラッグで360°見回せるよ♪（WASD/Escで起き上がる）");else{const i=e==="daybed_1"?5.65:7.75;this.pos[0]=i,this.pos[1]=6.06+.135,this.pos[2]=19.8,this.diverHeadingYaw=0,this.curBodyTrimDeg=180,this.activePoseStyle="beach_lie",this.yaw=e==="daybed_1"?2.66:-2.66,this.pitch=-.17,this.tpvDistance=2.8,this.audio.playGearClick(2),this.showToast(`🛌 5つ星プライベートカバナのチーク材デイベッド #${e==="daybed_1"?1:2} に寝転んだよ！ドラッグで360°自由に見回せるよ♪（Vキーで海側/シアター側アングル切替・WASD/Escで起き上がる）`)}this.updateLookVector()}standUpFromLieSpot(){if(this.activeLieSpot===null)return;const e=this.activeLieSpot;if(this.activeLieSpot=null,e==="hammock"){const i=this.getTerrainY(-3.1,21.15);this.pos[0]=-3.1,this.pos[1]=Math.max(5.72,i)+.91,this.pos[2]=21.15}else{const i=e==="daybed_1"?5.02:6.7,t=this.getTerrainY(i,20.65);this.pos[0]=i,this.pos[1]=Math.max(5.76,t)+.91,this.pos[2]=20.65}this.vel[0]=0,this.vel[1]=0,this.vel[2]=0,this.diverHeadingYaw=0,this.curBodyTrimDeg=90,this.activePoseStyle="land_walk",this.audio.playGearClick(0),this.showToast("🚶 すっきりリフレッシュして起き上がったよ！")}setOnToggleDiveCompUi(e){this.onToggleDiveCompUiCallback=e}getGasInfo(e=this.dcGasMix){return e==="ean32"?{label:"EAN32",fO2:.32,modM:33.8}:e==="ean36"?{label:"EAN36",fO2:.36,modM:28.9}:{label:"AIR 21%",fO2:.21,modM:56.6}}cycleDiveCompScreen(e){const i=["main","compass","profile","log"];if(e)this.dcScreen=e;else{const t=i.indexOf(this.dcScreen);this.dcScreen=i[(t+1)%i.length]}this.audio.playDiveCompBeep("button")}setDiveGasMix(e){const i=["air21","ean32","ean36"];if(e)this.dcGasMix=e;else{const s=i.indexOf(this.dcGasMix);this.dcGasMix=i[(s+1)%i.length]}const t=this.getGasInfo(this.dcGasMix);this.audio.playDiveCompBeep("button"),this.showToast(`⌚ ダイブコンピューターのガス設定を『${t.label}』（最大許容水深 MOD ${t.modM}m）に切り替えたよ！`)}toggleCompassHeadingLock(e=!1){if(e||this.dcLockedHeadingDeg!==null){this.dcLockedHeadingDeg=null,this.audio.playDiveCompBeep("button"),this.showToast("🧭 ダイブコンパスのベアリング（方位ロック）を解除したよ");return}const i=this.computeCompassHeadingDeg();this.dcLockedHeadingDeg=i;const t=(i+180)%360;this.audio.playDiveCompBeep("safety_start"),this.showToast(`🧭 現在方位 ${String(i).padStart(3,"0")}° をロック！（帰りの逆方位は ${String(t).padStart(3,"0")}° だよ）`)}isInDivingMode(){return this.fishingPhase==="inactive"&&this.inspectFocus==="none"&&this.seatedStoolIndex===null&&this.activeLieSpot===null&&(this.entryMode!==null||this.surfaceTreading||this.activePoseStyle==="swim"||this.activePoseStyle==="surface_tread"||!this.wasAboveSurface&&this.pos[1]<5.38)}isWristGlanceActive(){return this.dcWristGlance}setWristGlanceQuiet(e){this.dcWristGlance!==e&&(this.dcWristGlance=e,this.engine.getVrmAvatar().setWristCheck(e))}toggleWristGlance(e){this.dcWristGlance=e!==void 0?e:!this.dcWristGlance,this.engine.getVrmAvatar().setWristCheck(this.dcWristGlance),this.audio.playDiveCompBeep("button"),this.onToggleDiveCompUiCallback?.(),this.dcWristGlance&&this.showToast("⌚ 左手首のダイブコンピューターを確認中！（Nキーで画面切替 · Gキーで戻す）")}computeCompassHeadingDeg(){const e=Math.atan2(this.lookDir[0],this.lookDir[2])*180/Math.PI;return(Math.round(e)%360+360)%360}getSelectedBcdRangeName(){return this.bcdVariant==="wing_gold"?"gear_bcd_wing":this.bcdVariant==="resort_coral"?"gear_bcd_resort":"gear_bcd_vest"}getSelectedFinRangeName(){return this.finVariant==="yellow_long"?"gear_fin_long":this.finVariant==="coral_jet"?"gear_fin_jet":"gear_scuba_fin"}updateBenchTankMatrices(){re(this.clubTankMat,-4.72,7.54,27.55,Math.PI,.98),re(this.clubMountedBcdMat,-4.72,7.58,27.36,Math.PI,.96),re(this.clubLooseBcdMat,-4.06,7.452,27.42,Math.PI-.14,.95),re(this.clubLooseRegMat,-4.18,7.47,27.32,Math.PI+.15,.92,.92,.92,.42),re(this.clubLooseBeltMat,-3.24,7.19,27.12,Math.PI,.94),re(this.clubLooseMaskMat,-3.66,7.216,27.16,Math.PI-.1,1.02),re(this.clubLooseFinLMat,-3.04,7.296,27.72,Math.PI,.9),re(this.clubLooseFinRMat,-2.78,7.296,27.72,Math.PI,.9),re(this.suitRackKeramaMat,-2.55,8.58,30.85,0,1),re(this.suitRackHibiscusMat,-1.9,8.58,30.85,0,1),re(this.suitRackGoldMat,-1.25,8.58,30.85,0,1),re(this.boatTankMatA,-9.24,7.02,7.85,0,.98),re(this.boatBenchBcdMat,-9.24,7.03,8.03,0,.96),re(this.boatTankMatB,-9.76,7.02,8.75,0,.96)}isOverBoatDeck(e,i){return e>=-11.55&&e<=-7.45&&i>=5.05&&i<=13.05}getClubhouseAndPierFloorY(e,i){return e>=-13.2&&e<=13.2&&i>=24&&i<=31.6?6.52+.91:e>=-11&&e<=11&&i>=22.4&&i<24?6.32+(i-22.4)/1.6*.2+.91:e>=-8.35&&e<=-6.15&&i>=11&&i<24?i>21.4?6.08+(i-21.4)/2.6*.44+.91:6.08+.91:e>=.35&&e<=4.52&&i>=18.05&&i<=21.78||e>=-.2&&e<=5.4&&i>=12.4&&i<18.05?6.12+.91:-999}resolveClubhouseCollisions(){if(!(this.pos[1]<6)){if(this.pos[2]>23.8&&this.pos[2]<32&&Math.abs(this.pos[0])<13.3){const e=this.pos[0]>1.28&&this.pos[0]<2.62&&this.zenSouthAutoDoorT>.42;this.pos[2]>30.85&&!e&&(this.pos[2]=30.85),this.pos[0]<-11.85&&(this.pos[0]=-11.85),this.pos[0]>12.35&&(this.pos[0]=12.35)}this.zenSouthAutoDoorT<=.42&&this.pos[0]>.45&&this.pos[0]<3.45&&this.pos[2]>31.8&&this.pos[2]<32.22&&(this.pos[2]=32.22);for(const[e,i,t,s]of[[-5.65,-1.9,26.42,28.35],[-6.45,-2.85,30.35,31.6],[-9.95,-7.65,29.35,31.05],[2.82,10.45,26.68,28.1],[2.82,3.76,27.3,30.72],[10.76,12.38,26.92,27.76],[1.38,4.28,19.96,20.76]])if(this.pos[0]>e&&this.pos[0]<i&&this.pos[2]>t&&this.pos[2]<s){const a=this.pos[0]-e,r=i-this.pos[0],n=this.pos[2]-t,o=s-this.pos[2],l=Math.min(a,r,n,o);l===n?this.pos[2]=t:l===o?this.pos[2]=s:l===a?this.pos[0]=e:this.pos[0]=i}for(const e of _i){const i=this.pos[0]-e.x,t=this.pos[2]-e.z,s=Math.hypot(i,t);s>1e-4&&s<.54&&(this.pos[0]=e.x+i/s*.54,this.pos[2]=e.z+t/s*.54)}}}getBoatDeckFloorY(e,i=-9.5){return i>-10.12&&i<-8.88&&e>7.05&&e<10.75?6.68+.91:(e<5.85?5.97:6.03)+.91}craftUpgrade(e){if(this.unlockedUpgrades[e])return!1;const t=this.getUpgradeRecipes().find(s=>s.id===e);if(!t||!t.canAfford)return this.audio.playDiveAlertBeep(),!1;for(const[s,a]of Object.entries(t.costs))this.inventory[s]-=a;return this.unlockedUpgrades[e]=!0,e==="scuba_tank"?(this.cylinderVolL=14,this.tankAirLiters=2800):e==="dive_light"&&(this.flashlightOn=!0),this.audio.playPadiSkillPass(!0),this.showToast(`🛠️ クラフト完了：『${t.name}』を装備したよ！`),!0}triggerManualHarvestPulse(){this.harvestingHeld=!0,setTimeout(()=>{this.harvestingHeld=!1},320)}getTerrainY(e,i){return this.worldAsset?this.worldAsset.sampleTerrainY(e,i):-4.55}initFaunaPopulation(){let e=1;const i=(t,s,a,r,n,o,l,h,c,u,g,p,x=!1)=>{this.faunaAgents.push({id:e++,species:t,rangeName:s,animMode:a,focusRadius:r,scale:n,orbitCenter:o,orbitRx:l,orbitRz:h,baseY:c,bobAmp:u,angularSpeed:g,phase:p,stationary:x,curPos:[...o],curDir:[0,0,1],mat:O()})};i("manta","fauna_manta",1,2.5,1.08,[3.2,1.2,.2],8.5,6.2,1.15,.45,.24,.4),i("manta","fauna_manta",1,2.6,1.18,[13.2,.4,-5.2],6.2,5.4,.45,.35,-.28,2.3),i("manta","fauna_manta",1,2.4,.92,[-6.5,1.8,-8.5],9,6.5,1.65,.5,.21,4.1),i("turtle","fauna_turtle",3,1.45,1.35,[-1.5,-.6,2.8],4.8,3.8,-.55,.55,.34,1.1),i("turtle","fauna_turtle",3,1.45,1.25,[-7.2,1.5,7.2],4.2,3.5,1.45,.65,-.32,3.5),i("turtle","fauna_turtle",3,1.45,1.42,[8.5,-1.2,2.2],5.2,4.4,-1.15,.45,.29,5),i("shark","fauna_shark",2,1.65,1.35,[-11.5,-2.1,-5.2],5.6,4.5,-2.05,.22,.46,.8),i("shark","fauna_shark",2,1.7,1.48,[2.5,-5.2,-16.5],6.4,4.8,-5.1,.28,-.42,3.9),i("gurukun","fauna_gurukun",2,1.95,1.25,[.8,.2,1.8],4.6,3.6,.25,.38,-.52,.2),i("gurukun","fauna_gurukun",2,1.95,1.3,[10.5,-.6,-3.5],4.4,4,-.55,.35,.56,2),i("gurukun","fauna_gurukun",2,1.95,1.2,[-7.5,-.4,.5],4.2,3.5,-.35,.32,.48,4.2),i("gurukun","fauna_gurukun",2,1.95,1.35,[3.2,-2.8,-11.5],5.2,4,-2.8,.35,-.46,5.5),i("napoleon","fauna_napoleon",2,1.55,1.45,[6.8,-1.8,-6.5],4.2,3.6,-1.8,.25,.3,1.7),i("napoleon","fauna_napoleon",2,1.55,1.38,[-13.5,-1.2,-1.5],3.8,3.4,-1.25,.22,-.33,4.6),i("clownfish","fauna_clownfish",2,1.25,1.45,[-4.3,-3.3,-3.1],.22,.22,-3.35,.08,1.4,0),i("clownfish","fauna_clownfish",2,1.25,1.45,[6.2,-1.8,5.2],.22,.22,-1.85,.08,-1.3,1.8),i("clownfish","fauna_clownfish",2,1.25,1.45,[12.8,-.8,-4.9],.22,.22,-.85,.08,1.5,3.2),i("gardeneel","fauna_gardeneel",4,1.35,1.45,[-1.2,-4.45,2.2],0,0,-4.45,0,0,.5,!0),i("gardeneel","fauna_gardeneel",4,1.35,1.45,[-4.8,-2.2,8.2],0,0,-2.2,0,0,2.1,!0)}initLootNodes(){const e=[["scrap",-4.2,5.8],["seaweed",-6.2,4.4],["clay",-2.6,5.2],["scrap",-8.8,6.8],["clay",-6.8,11.2],["seaweed",-3.2,8.8],["copper",-5.4,2],["scrap",-1.2,.6],["clay",2.2,2.8],["seaweed",4.4,3.6],["copper",6.4,1.8],["scrap",4.8,-2.2],["copper",10.6,-2.8],["iron",12.2,-7.6],["pearl",14.8,-4.2],["seaweed",9.2,-6.2],["clay",7.5,-4.2],["copper",15.8,-5.8],["scrap",8.2,5.6],["copper",-8.2,-2.2],["iron",-11.8,-4.2],["chest",-14.5,-5.5],["pearl",-15.6,-7.8],["iron",-16.8,-4],["scrap",-10.2,-7.8],["seaweed",-12.8,3.2],["clay",-9.8,1.8],["scrap",.4,-14.2],["scrap",4.6,-15.8],["iron",-2.2,-16.4],["iron",6.2,-17.5],["copper",-4.8,-13.2],["copper",7.8,-13.5],["pearl",-1.4,-19.2],["pearl",6.8,-19.8],["chest",2.4,-18.2],["chest",4.8,-20.4],["iron",1.2,-21.6],["seaweed",-3.6,-11.2],["clay",2.8,-11.4],["shellfish",-1.8,12.4],["shellfish",2.6,11.8],["shellfish",5.8,9.5],["shellfish",-5.2,8.6],["shellfish",9.4,3.4],["irabucha",-2.8,13.8],["irabucha",1.2,10.8],["irabucha",5.4,6.2],["taman",-1.2,10.6],["taman",3.8,11.2],["taman",-7.2,4.8],["gaara",-1.6,14.2],["gaara",6.8,8.4],["gaara",-3.8,-1.2],["meebai",1.5,7.2],["meebai",-3.6,3.6],["meebai",7.8,-.8],["meebai",-9.6,.8],["meebai",12.2,-2.6],["akamachi",2.4,-7.8],["akamachi",-8.4,-6.5],["lobster",3.6,5.8],["lobster",-6.8,2.4],["lobster",11.4,-5.2],["lobster",-13.4,-4.6],["lobster",1.8,-15.6]],i=t=>t==="meebai"||t==="irabucha"||t==="taman"||t==="gaara"||t==="akamachi";e.forEach(([t,s,a],r)=>{const n=this.getTerrainY(s,a),o=i(t)?.56:.02,l=r*2.17%(Math.PI*2),h=O(),c=ri[t].scale;re(h,s,n+o,a,l,c),this.lootNodes.push({id:r+1,kind:t,pos:[s,n+o,a],yaw:l,collected:!1,respawnTimer:0,mat:h})})}snapNodesToTerrain(){for(const e of this.lootNodes){const i=this.getTerrainY(e.pos[0],e.pos[2]),s=e.kind==="meebai"||e.kind==="irabucha"||e.kind==="taman"||e.kind==="gaara"||e.kind==="akamachi"?.56:.02;e.pos[1]=i+s;const a=ri[e.kind].scale;re(e.mat,e.pos[0],e.pos[1],e.pos[2],e.yaw,a)}for(const e of this.faunaAgents)if(e.stationary){const i=this.getTerrainY(e.orbitCenter[0],e.orbitCenter[2]);e.baseY=i-.02,e.curPos[1]=e.baseY}else if(e.species==="clownfish"){const i=this.getTerrainY(e.orbitCenter[0],e.orbitCenter[2]);e.baseY=i+.65}}handleMouseDelta(e,i){if(!this.active)return;if(this.draggedPartId!==null){if(Math.hypot(this.lastMouseClientX-this.mouseDownClientX,this.lastMouseClientY-this.mouseDownClientY)<8.5)return;if(this.mouseDragMoved=!0,this.draggedPartId==="valve_wheel"){this.turnTankValve((e-i)*.0085);return}if(this.draggedPartId==="bcd_body"){this.bcdPlacedOnTank||(this.bcdPlacedOnTank=!0),this.camBuckleLocked||this.adjustBcdAlignment(e*.45,-i*.048);return}if(this.draggedPartId==="yoke_screw"){this.adjustYokeScrew(e*.32-i*.2);return}}if(this.inspectFocus!=="none"){this.inspectOrbitYaw-=e*.0046,this.inspectOrbitYaw>Math.PI&&(this.inspectOrbitYaw-=Math.PI*2),this.inspectOrbitYaw<-Math.PI&&(this.inspectOrbitYaw+=Math.PI*2),this.inspectOrbitPitch=Math.max(-1.12,Math.min(.45,this.inspectOrbitPitch-i*.0038));return}Math.hypot(this.lastMouseClientX-this.mouseDownClientX,this.lastMouseClientY-this.mouseDownClientY)>6.5&&(this.mouseDragMoved=!0,this.harvestingHeld=!1,this.fishingCastCharging=!1);const t=this.cameraMode==="tpv"?.0042:.0028;this.yaw-=e*t,this.pitch=Math.max(-1.28,Math.min(1.18,this.pitch-i*t)),this.updateLookVector()}updateLookVector(){const e=Math.cos(this.pitch);this.lookDir[0]=-Math.sin(this.yaw)*e,this.lookDir[1]=Math.sin(this.pitch),this.lookDir[2]=-Math.cos(this.yaw)*e}interactWith3dPart(e){switch(e){case"club_workbench":this.setInspectFocus("wb_valve"),this.showToast("🔍 3D作業台クローズアップ！バルブ・Oリング・BCDバンド・1stヨーク・残圧計を直接クリック＆ドラッグで操作できるよ！");break;case"club_rinse_tank":this.rinseGearPostDive();break;case"suit_rack_kerama":this.selectSuitVariant("kerama_5mm");break;case"suit_rack_hibiscus":this.selectSuitVariant("hibiscus_3mm");break;case"suit_rack_gold":this.selectSuitVariant("pro_gold");break;case"tank_stamp":this.verifyTankStamp();break;case"valve_oring":this.inspectAndReplaceOring();break;case"valve_wheel":this.regPlacedOnValve?this.valveTurns<2.8?this.turnTankValve(.75):this.turnTankValve(-3):this.blowOutTankValve();break;case"bcd_body":this.bcdPlacedOnTank?!this.camBuckleLocked&&(Math.abs(this.bcdAzimuthDeg)>5||Math.abs(this.bcdHeightCm)>.8)?this.alignBcdToIdeal():this.setInspectFocus("wb_bcd"):this.placeOrRemoveBcdOnTank();break;case"cam_lever":this.toggleWetAndLockCamBuckle();break;case"dust_cap":this.toggleDustCap();break;case"reg_1st":this.regPlacedOnValve?this.regOrientationReversed?this.flipRegOrientation():this.placeOrRemoveReg1st():this.placeOrRemoveReg1st();break;case"yoke_screw":this.yokeScrewPct<72?(this.adjustYokeScrew(28),this.yokeScrewPct>=65&&this.yokeScrewPct<=88&&(this.audio.playGearClick(2),this.showToast(`🔩 3Dヨークスクリューを指2本で手締め（${Math.round(this.yokeScrewPct)}% 適正トルク◎）！`))):this.adjustYokeScrew(-65);break;case"lpi_coupler":this.toggleLpiCoupler();break;case"wb_dive_mask":this.maskGelApplied?this.defogMaskAtRinseTank():this.applyMaskDefogGel();break;case"wb_dive_computer":this.setDiveGasMix();break;case"spg_console":this.toggleSpgFaceDown();break;case"purge_reg":this.triggerRegInhaleTest();break;case"bwraf_bcd":this.toggleBwrafStep("b");break;case"bwraf_weights":this.toggleBwrafStep("w");break;case"bwraf_releases":this.toggleBwrafStep("r");break;case"bwraf_air":this.toggleBwrafStep("a");break;case"bwraf_final":this.toggleBwrafStep("f");break;case"bar_stool_0":this.sitOnBarStool(0);break;case"bar_stool_1":this.sitOnBarStool(1);break;case"bar_stool_2":this.sitOnBarStool(2);break;case"bar_stool_3":this.sitOnBarStool(3);break;case"bar_stool_4":this.sitOnBarStool(4);break;case"bar_stool_5":this.sitOnBarStool(5);break;case"bar_menu_stand":this.seatedStoolIndex===null?this.sitOnBarStool(2):this.toggleBarBottleZoom();break;case"bar_bottle_curacao":this.orderClubhouseDrink("blue");break;case"bar_bottle_gin":this.orderClubhouseDrink("hibiscus");break;case"bar_bottle_mint":this.orderClubhouseDrink("shikuwasa");break;case"bar_bottle_mango":this.orderClubhouseDrink("mango");break;case"bar_bottle_awamori":this.orderClubhouseDrink("awamori");break;case"bar_bottle_whisky":this.orderClubhouseDrink("highball");break;case"bar_bottle_rum":this.orderClubhouseDrink("mango");break;case"bar_tap_tower":this.orderClubhouseDrink("beer");break;case"bar_served_drink":this.sipBarDrink();break;case"drink_table_0":this.interactWithDrinkTable(0);break;case"drink_table_1":this.interactWithDrinkTable(1);break;case"drink_table_2":this.interactWithDrinkTable(2);break;case"drink_table_3":this.interactWithDrinkTable(3);break;case"okislot_entry_0":this.sitAtOkiSlot(0);break;case"okislot_entry_1":this.sitAtOkiSlot(1);break;case"okislot_maxbet":this.betMaxOkiSlot();break;case"okislot_lever_part":this.pullOkiSlotLever(!1);break;case"okislot_stop_l":this.okiState==="spinning"?this.stopOkiSlotReel(0,!1):this.pullOkiSlotLever(!1);break;case"okislot_stop_c":this.okiState==="spinning"?this.stopOkiSlotReel(1,!1):this.pullOkiSlotLever(!1);break;case"okislot_stop_r":this.okiState==="spinning"?this.stopOkiSlotReel(2,!1):this.pullOkiSlotLever(!1);break;case"bbq_station_entry":this.openBbqStation();break;case"bbq_cooler":this.getTotalSeafoodStock()===0?this.restockCoolerBox():this.placeSeafoodOnBoard();break;case"bbq_board":this.boardItem?this.boardItem.filleted?this.grillBoardSeafood():this.sliceBoardSeafood():this.placeSeafoodOnBoard();break;case"bbq_grill_0":this.interactWithGrillSlot(0);break;case"bbq_grill_1":this.interactWithGrillSlot(1);break;case"bbq_grill_2":this.interactWithGrillSlot(2);break;case"bbq_plate":case"bbq_dining_plate":this.platedItems.length>0?this.eatPlatedBbqFood():this.sitAtDiningTable(0);break;case"bbq_pairing_drink":case"bbq_dining_drink":this.sipOrRefillBbqPairingDrink();break;case"dining_seat_0":this.sitAtDiningTable(0);break;case"dining_seat_1":this.sitAtDiningTable(1);break;case"dining_seat_2":this.sitAtDiningTable(2);break;case"dining_seat_3":this.sitAtDiningTable(3);break;case"dining_seat_4":this.sitAtDiningTable(4);break;case"zen_museum_caption":this.inspectFocus==="zen_caption"?this.setInspectFocus("none"):(this.setInspectFocus("zen_caption"),this.showToast("🖼️ 常設展示キャプション『ZEN大学 逗子／南島校舎』を鑑賞中（再クリック・WASD・Escで通常視点へ戻るよ）"));break;case"beach_daybed_1":this.lieDownOnSpot("daybed_1");break;case"beach_daybed_2":this.lieDownOnSpot("daybed_2");break;case"beach_hammock":this.lieDownOnSpot("hammock");break;case"beach_cinema":case"beach_speaker":this.audio.playPushButton(!1),this.showToast("🎬 ビーチ・チルアウトシアターのリモコンを開いたよ！URLを入れるとこの3DボードにYouTube映像が映るよ♪"),this.onOpenYoutubeChillCallback?.();break;case"pier_fishing_spot":this.startFishingMode(!0);break}}bindControls(){const e=this.engine.getCanvas(),i=o=>{if(this.active){if(o.target!==e&&this.draggedPartId===null){this.lastMouseClientX=-1,this.lastMouseClientY=-1;return}this.lastMouseClientX=o.clientX,this.lastMouseClientY=o.clientY}},t=o=>{if(this.active){if(this.lastMouseClientX=o.clientX,this.lastMouseClientY=o.clientY,o.button===2&&document.pointerLockElement===e){o.preventDefault(),this.harvestingHeld=!1,this.fishingReelHeld=!1,this.draggedPartId=null,document.exitPointerLock();return}if(o.button!==0){this.draggedPartId=null;return}if(this.mouseDownClientX=o.clientX,this.mouseDownClientY=o.clientY,this.mouseDragMoved=!1,this.update3dHoverPicking(),!o.altKey&&!o.shiftKey&&this.hoveredPartId!==null){this.hoveredPartId==="purge_reg"&&this.setPurgeHeld(!0),(this.hoveredPartId==="valve_wheel"||this.hoveredPartId==="bcd_body"||this.hoveredPartId==="yoke_screw")&&(this.draggedPartId=this.hoveredPartId);return}if(this.inspectFocus==="none"){if(this.fishingPhase!=="inactive"&&!o.altKey&&!o.shiftKey){this.beginFishingPrimaryPress();return}this.harvestingHeld=!0,this.cameraMode==="fpv"&&this.pos[1]<5.35&&document.pointerLockElement!==e&&o.ctrlKey&&e.requestPointerLock?.()}}},s=o=>{if(o.button!==0)return;this.harvestingHeld=!1,this.endFishingPrimaryPress(),this.purgeHeld&&this.setPurgeHeld(!1);const l=Math.hypot(o.clientX-this.mouseDownClientX,o.clientY-this.mouseDownClientY),h=!this.mouseDragMoved&&l<10,c=this.draggedPartId;this.draggedPartId=null,this.active&&h&&this.hoveredPartId!==null&&(this.hoveredPartId!=="purge_reg"||this.lineBar<5?this.interactWith3dPart(this.hoveredPartId):c===null&&this.triggerRegInhaleTest())},a=o=>{if(!this.active||document.activeElement&&document.activeElement.tagName==="INPUT")return;if(o.code==="Escape"){if(this.inspectFocus==="okislot"){this.leaveOkiSlot();return}if(this.fishingPhase!=="inactive"){this.stopFishingMode();return}if(this.inspectFocus==="bar_bottles"&&this.seatedStoolIndex!==null){this.setInspectFocus("bar_seat"),this.showToast("🪑 カウンター席カメラに戻ったよ");return}if(this.activeLieSpot!==null){this.standUpFromLieSpot();return}if(this.seatedStoolIndex!==null){this.standUpFromBarStool();return}if(this.inspectFocus!=="none"){this.setInspectFocus("none"),this.showToast("🚶 クローズアップ操作を終了して自由歩行モードに戻ったよ");return}}if(this.inspectFocus==="okislot"){if(o.code==="Space"&&!o.repeat){o.preventDefault(),this.triggerOkiSlotPrimaryAction();return}if(o.code==="Enter"&&!o.repeat){o.preventDefault(),this.okiPendingBonus!==null?this.autoAlignOkiSlotBonus():this.triggerOkiSlotPrimaryAction();return}if((o.code==="Digit1"||o.code==="KeyZ"||o.code==="ArrowLeft")&&!o.repeat){o.preventDefault(),this.okiState==="spinning"?this.stopOkiSlotReel(0,!1):this.pullOkiSlotLever(!1);return}if((o.code==="Digit2"||o.code==="KeyX"||o.code==="ArrowDown")&&!o.repeat){o.preventDefault(),this.okiState==="spinning"?this.stopOkiSlotReel(1,!1):this.pullOkiSlotLever(!1);return}if((o.code==="Digit3"||o.code==="KeyC"||o.code==="ArrowRight")&&!o.repeat){o.preventDefault(),this.okiState==="spinning"?this.stopOkiSlotReel(2,!1):this.pullOkiSlotLever(!1);return}if(o.code==="KeyF"&&!o.repeat&&this.activeBarDrink!==null){o.preventDefault(),this.sipBarDrink();return}}if(o.code==="KeyK"&&!o.repeat){o.preventDefault(),this.toggleFishingMode();return}if(this.fishingPhase!=="inactive"){if(this.fishingPhase==="ready"||this.fishingPhase==="landed"){if(o.code==="Digit1"&&!o.repeat){o.preventDefault(),this.selectFishingRig("ukifukase");return}if(o.code==="Digit2"&&!o.repeat){o.preventDefault(),this.selectFishingRig("uchikomi");return}if(o.code==="Digit3"&&!o.repeat){o.preventDefault(),this.selectFishingRig("minnow");return}if(o.code==="Digit4"&&!o.repeat){o.preventDefault(),this.selectFishingRig("deep_glow");return}}if(o.code==="KeyF"&&!o.repeat&&(this.fishingPhase==="waiting"||this.fishingPhase==="nibble")){o.preventDefault(),this.triggerFishingTwitch();return}if(o.code==="Space"||o.code==="Enter"){o.preventDefault(),this.fishingPhase==="fighting"?this.fishingReelHeld=!0:o.repeat||this.beginFishingPrimaryPress();return}}if(this.seatedStoolIndex!==null&&(o.code==="Space"||o.code==="KeyF")){o.preventDefault(),this.sipBarDrink();return}if(this.activeDiningSeat!==null&&(o.code==="Space"||o.code==="Enter"||o.code==="KeyF")){o.preventDefault(),o.code==="KeyF"?this.sipOrRefillBbqPairingDrink():this.platedItems.length>0?this.eatPlatedBbqFood():this.sipOrRefillBbqPairingDrink();return}if(this.inspectFocus==="bbq_station"&&(o.code==="Space"||o.code==="Enter")){if(o.preventDefault(),this.platedItems.length>0)this.eatPlatedBbqFood();else if(this.boardItem&&!this.boardItem.filleted)this.sliceBoardSeafood();else if(this.boardItem&&this.boardItem.filleted)this.grillBoardSeafood();else{const h=this.grillSlots.findIndex(c=>c!==null&&(c.sideADoneness+c.sideBDoneness>=.45||!c.flipped));h>=0?this.interactWithGrillSlot(h):this.placeSeafoodOnBoard()}return}if((this.isWorkbenchFocus()||this.inspectFocus==="buddy_bwraf")&&(o.code==="Space"||o.code==="Enter")){o.preventDefault(),this.executeNextGuidedSetupStep();return}const l=this.normalizeMoveKey(o);if(l&&((l==="KeyW"||l==="KeyA"||l==="KeyS"||l==="KeyD")&&(this.seatedStoolIndex!==null&&this.standUpFromBarStool(),this.activeDiningSeat!==null&&this.standUpFromDiningChair(),this.activeLieSpot!==null&&this.standUpFromLieSpot(),(l==="KeyW"||l==="KeyS")&&!this.fishingCastCharging&&(this.fishingPhase==="ready"||this.fishingPhase==="landed")&&this.stopFishingMode()),this.keys.add(l),l==="Space"&&o.preventDefault()),o.code==="KeyF")this.seatedStoolIndex===null&&this.activeBarDrink!==null&&this.pos[1]>5.5?this.sipBarDrink():this.harvestingHeld=!0;else if(o.code==="KeyR")this.adjustSurfaceBcdAir(!0);else if(o.code==="KeyT")this.adjustSurfaceBcdAir(!1);else if(o.code==="KeyE")if(this.pos[1]<5.2)this.triggerEarEqualize();else if(this.inspectFocus==="okislot")this.leaveOkiSlot();else if(this.fishingPhase!=="inactive")this.stopFishingMode();else if(this.activeLieSpot!==null)this.standUpFromLieSpot();else if(this.activeDiningSeat!==null)this.standUpFromDiningChair();else if(this.seatedStoolIndex!==null)this.standUpFromBarStool();else if(Math.hypot(this.pos[0]-2.6,this.pos[2]-15.85)<2.25)this.sitAtDiningTable(0);else if(Math.hypot(this.pos[0]-4.35,this.pos[2]-13.6)<1.85)this.sitAtDiningTable(4);else if(Math.hypot(this.pos[0]-11.55,this.pos[2]-26.38)<2.25)this.sitAtOkiSlot(this.pos[0]>=11.57?1:0);else if(Math.hypot(this.pos[0]- -6.35,this.pos[2]-15.6)<2.5)this.startFishingMode(!0);else if(Math.hypot(this.pos[0]- -3.1,this.pos[2]-20.45)<2.2)this.lieDownOnSpot("hammock");else if(Math.hypot(this.pos[0]-5.65,this.pos[2]-19.65)<1.9)this.lieDownOnSpot("daybed_1");else if(Math.hypot(this.pos[0]-7.75,this.pos[2]-19.65)<1.9)this.lieDownOnSpot("daybed_2");else if(Math.hypot(this.pos[0]-2.85,this.pos[2]-20.65)<2.6)this.setInspectFocus(this.inspectFocus==="bbq_station"?"none":"bbq_station");else if(this.pos[0]>=2.8&&this.pos[0]<=10.6&&Math.abs(this.pos[2]-26)<2.3){const h=Math.max(0,Math.min(5,Math.round((this.pos[0]-3.85)/1.12)));this.sitOnBarStool(h)}else Math.hypot(this.pos[0]- -4.15,this.pos[2]-27.2)<3.4?this.setInspectFocus(this.inspectFocus==="none"?"wb_valve":"none"):Math.hypot(this.pos[0]- -8.8,this.pos[2]-30.2)<2.8&&this.rinseGearPostDive();else o.code==="KeyM"?this.isInDivingMode()&&this.triggerUnderwaterMaskClear():o.code==="KeyP"?this.setPurgeHeld(!0):o.code==="KeyL"?this.isInDivingMode()&&this.toggleFlashlight():o.code==="KeyV"?this.inspectFocus!=="none"?this.setInspectFocus("none"):this.toggleCameraMode():o.code==="KeyG"?this.toggleWristGlance():o.code==="KeyN"?(this.isInDivingMode()||this.dcWristGlance)&&this.cycleDiveCompScreen():o.code==="KeyZ"?this.isInDivingMode()&&this.setBodyTrimManual((this.trimMode==="manual"?this.targetBodyTrimDeg:this.curBodyTrimDeg)-12):o.code==="KeyX"&&this.isInDivingMode()&&this.setBodyTrimManual((this.trimMode==="manual"?this.targetBodyTrimDeg:this.curBodyTrimDeg)+12)},r=o=>{const l=this.normalizeMoveKey(o);l&&this.keys.delete(l),this.keys.delete(o.code),(o.code==="Space"||o.code==="Enter")&&this.endFishingPrimaryPress(),o.code==="KeyF"&&(this.harvestingHeld=!1),o.code==="KeyP"&&this.setPurgeHeld(!1)},n=()=>{this.keys.clear(),this.harvestingHeld=!1,this.fishingCastCharging=!1,this.fishingReelHeld=!1,this.fishingRodLeanUiDir=0,this.purgeHeld=!1,this.draggedPartId=null};window.addEventListener("mousemove",i),e.addEventListener("mousedown",t),window.addEventListener("mouseup",s),window.addEventListener("keydown",a),window.addEventListener("keyup",r),window.addEventListener("blur",n),this.cleanupListeners=()=>{window.removeEventListener("mousemove",i),e.removeEventListener("mousedown",t),window.removeEventListener("mouseup",s),window.removeEventListener("keydown",a),window.removeEventListener("keyup",r),window.removeEventListener("blur",n)}}normalizeMoveKey(e){const i=e.code;if(i==="KeyW"||i==="KeyA"||i==="KeyS"||i==="KeyD"||i==="ArrowUp"||i==="ArrowDown"||i==="ArrowLeft"||i==="ArrowRight"||i==="Space"||i==="ShiftLeft"||i==="ShiftRight"||i==="KeyC"||i==="KeyQ")return i;const t=e.key.toLowerCase();return t==="w"?"KeyW":t==="a"?"KeyA":t==="s"?"KeyS":t==="d"?"KeyD":null}evalNetBuoyancyKgf(e){const i=1+e/10,s=(this.wearingWetsuit?this.suitVariant==="hibiscus_3mm"?2.85:4.15:.35)/Math.pow(i,.72),a=this.wearingScubaUnit?Math.min(14,this.bcdAirStdL/i):0;this.wearingScubaUnit&&this.bcdAirStdL/i>14&&(this.bcdAirStdL=14*i);const r=this.tankAirLiters/this.cylinderVolL,n=this.wearingScubaUnit?(200-r)/200*1.85:0,o=this.wearingWeightBelt?this.weightKg:0,l=this.wearingScubaUnit?1.15:.35,h=e>.6?Math.sin(this.elapsed*1.55)*.22:0;return{netKgf:s+a*.68+n-o-l+h,bcdActualL:a}}stepPneumaticsAndOptics(e,i,t){if(this.valveBlowOutTimer>0&&(this.valveBlowOutTimer=Math.max(0,this.valveBlowOutTimer-e)),this.inhaleTestTimer>0&&(this.inhaleTestTimer=Math.max(0,this.inhaleTestTimer-e)),this.maskRinseDipTimer>0){const l=this.maskRinseDipTimer;this.maskRinseDipTimer=Math.max(0,this.maskRinseDipTimer-e),l>0&&this.maskRinseDipTimer<=0&&this.inspectFocus==="wb_rinse"&&this.gearSteps.lpi_connect&&this.setInspectFocus("wb_spg")}this.headBonkCooldown>0&&(this.headBonkCooldown=Math.max(0,this.headBonkCooldown-e)),this.earWarnCooldown>0&&(this.earWarnCooldown=Math.max(0,this.earWarnCooldown-e)),this.ascentWarnCooldown>0&&(this.ascentWarnCooldown=Math.max(0,this.ascentWarnCooldown-e)),this.halfOpenWarnCooldown>0&&(this.halfOpenWarnCooldown=Math.max(0,this.halfOpenWarnCooldown-e));const s=this.tankAirLiters/this.cylinderVolL,a=this.valveTurns>.04,r=a?Math.min(1,Math.pow(this.valveTurns/1.85,2.2)):0,n=this.oringCondition!=="clean_seated"||!this.valveBlownOut||this.yokeScrewPct<55;if(this.yokeLeaking=!1,this.regPlacedOnValve){if(a&&s>2){if(n){this.yokeLeaking=!0;const c=this.yokeScrewPct<45?18:9;this.tankAirLiters=Math.max(0,this.tankAirLiters-c*e),this.leakHissTimer-=e,this.leakHissTimer<=0&&(this.leakHissTimer=1.25,this.audio.playValveOpenHiss())}const h=this.yokeLeaking?s*.72:s;this.lineBar+=(h-this.lineBar)*Math.min(1,(4.5+28*r)*e)}else(this.yokeLeaking||n)&&(this.lineBar=Math.max(0,this.lineBar-45*e));if((this.purgeHeld||this.inhaleTestTimer>0||t)&&this.lineBar>.5){const c=(this.purgeHeld?185:125)*(1-r*.94)*e*(a?5.2:1.35);this.lineBar=Math.max(0,this.lineBar-c),this.purgeHeld&&a&&(this.tankAirLiters=Math.max(0,this.tankAirLiters-14*e))}}else this.lineBar=Math.max(0,this.lineBar-220*e),a&&s>2&&(this.tankAirLiters=Math.max(0,this.tankAirLiters-22*e));this.smoothedSpgNeedleBar+=(this.lineBar-this.smoothedSpgNeedleBar)*(1-Math.exp(-16*e)),this.syncDerivedGearStepFlags();const o=1+i/10;if(i<=.45)this.equalizedAta=1,this.earSqueeze=Math.max(0,this.earSqueeze-e*2.5),this.maskFloodAnim=Math.max(0,this.maskFloodAnim-e*2),this.maskFogLevel=Math.max(0,this.maskFogLevel-e*.8);else{o<this.equalizedAta&&(this.equalizedAta=o);const l=Math.max(0,o-this.equalizedAta);this.earSqueeze=Math.max(0,Math.min(1,(l-.18)/.52)),this.earSqueeze>.45&&this.earWarnCooldown<=0&&(this.earWarnCooldown=8,this.audio.playDiveAlertBeep(),this.showToast("👂 耳にキーンと水圧を感じるよ！痛くなる前に『Eキー（または耳抜きボタン）』で優しく耳抜きしよう！")),this.wearingMaskAndFins&&!this.maskDefogged&&this.maskClearTimer<=0&&(this.maskFogLevel=Math.min(.88,this.maskFogLevel+e*.032)),this.maskClearTimer>0&&(this.maskClearTimer=Math.max(0,this.maskClearTimer-e),this.maskFloodAnim=this.maskClearTimer>.85?.32:this.maskClearTimer/.85*.32)}this.engine.setOkinawaOptics(this.maskFloodAnim,this.maskFogLevel,this.earSqueeze)}update(e){if(this.elapsed+=e,this.pickupToastTimer>0&&(this.pickupToastTimer-=e,this.pickupToastTimer<=0&&(this.pickupToast=null)),this.newlyLoggedFlashSec>0&&(this.newlyLoggedFlashSec-=e),this.inspectFocus==="none"&&this.entryMode===null){let b=0,B=0;this.fishingPhase!=="fighting"&&(this.keys.has("ArrowLeft")&&(b+=1.85*e),this.keys.has("ArrowRight")&&(b-=1.85*e)),this.keys.has("ArrowUp")&&(B+=1.25*e),this.keys.has("ArrowDown")&&(B-=1.25*e),(b!==0||B!==0)&&(this.yaw+=b,this.pitch=Math.max(-1.28,Math.min(1.18,this.pitch+B)))}this.updateLookVector();const i=this.lookDir[0],t=this.lookDir[1],s=this.lookDir[2];let a=-Math.sin(this.yaw),r=-Math.cos(this.yaw);const n=Math.hypot(a,r)||1;a/=n,r/=n;const o=-r,l=a;let h=0,c=0,u=0,g=0,p=0;this.keys.has("KeyW")&&(h+=a,c+=r,u+=i,g+=t,p+=s),this.keys.has("KeyS")&&(h-=a,c-=r,this.cameraMode==="tpv"?(u-=a,p-=r):(u-=i,g-=t,p-=s)),this.keys.has("KeyD")&&(h+=o,c+=l,u+=o,p+=l),this.keys.has("KeyA")&&(h-=o,c-=l,u-=o,p-=l),Math.hypot(h,c)>.05?(this.hasMoveHeadingInput=!0,this.moveHeadingTargetYaw=Math.atan2(-h,-c)):this.hasMoveHeadingInput=!1,this.keys.has("Space")&&(g+=.95),(this.keys.has("ShiftLeft")||this.keys.has("ShiftRight")||this.keys.has("KeyC")||this.keys.has("KeyQ"))&&(g-=.95);const x=Math.hypot(u,g,p);x>1e-4&&(u/=x,g/=x,p/=x);const S=Math.max(0,(35-this.shoulderStrapPct)/35),T=this.shoulderStrapPct>=35&&this.shoulderStrapPct<=68&&this.waistStrapLocked&&this.chestStrapLocked;if(this.stepOkiSlot(e),this.barPrepTimer>0&&(this.barPrepTimer=Math.max(0,this.barPrepTimer-e)),this.barSipTimer>0&&(this.barSipTimer=Math.max(0,this.barSipTimer-e),this.barSipTimer<=0&&this.barSipsLeft<=0&&this.seatedStoolIndex===null&&this.activeDiningSeat===null&&this.placedDrinkTableIdx===null&&this.inspectFocus!=="okislot"&&(this.activeBarDrink=null)),this.tipsyGlowSec>0&&(this.tipsyGlowSec=Math.max(0,this.tipsyGlowSec-e)),this.savorGlowSec>0&&(this.savorGlowSec=Math.max(0,this.savorGlowSec-e)),this.catchJoySec>0&&(this.catchJoySec=Math.max(0,this.catchJoySec-e)),this.knifeChopTimer>0&&(this.knifeChopTimer=Math.max(0,this.knifeChopTimer-e),this.pendingBoardFilletReveal&&this.boardItem)){const b=1-this.knifeChopTimer/Math.max(.1,this.knifeAnimDuration),B=this.activeKnifeMode==="fish_kazari"?.14:.8;(b>=B||this.knifeChopTimer<=0)&&(this.boardItem.filleted=!0,this.pendingBoardFilletReveal=!1,this.audio.playItemPickup(!1))}this.bbqPairingSipAnimTimer>0&&(this.bbqPairingSipAnimTimer=Math.max(0,this.bbqPairingSipAnimTimer-e)),this.tongsActionTimer>0&&(this.tongsActionTimer=Math.max(0,this.tongsActionTimer-e),this.tongsActionTimer<=0&&(this.tongsActionSlot=-1)),this.bbqEatTimer>0&&(this.bbqEatTimer=Math.max(0,this.bbqEatTimer-e));let k=!1;for(let b=0;b<3;b++){const B=this.grillSlots[b];B&&(k=!0,B.flipAnimTimer>0&&(B.flipAnimTimer=Math.max(0,B.flipAnimTimer-e)),B.flipped?B.sideBDoneness=Math.min(2.25,B.sideBDoneness+e*.098):B.sideADoneness=Math.min(2.25,B.sideADoneness+e*.095))}if(k&&Math.hypot(this.pos[0]-3.64,this.pos[2]-20.35)<9.5&&this.pos[1]>5.5&&(this.bbqAmbientSizzleTimer-=e,this.bbqAmbientSizzleTimer<=0&&(this.bbqAmbientSizzleTimer=2.45,this.audio.playBbqSizzle(!1,!0))),this.activeLieSpot!==null)if(this.vel[0]=0,this.vel[1]=0,this.vel[2]=0,this.wasAboveSurface=!0,this.activeLieSpot==="hammock"){const b=Math.sin(this.elapsed*1.25)*.085;this.pos[0]=-3.26,this.pos[1]=7.06-Math.cos(b)*.39,this.pos[2]=20.45-Math.sin(b)*.42,this.diverHeadingYaw=-Math.PI*.5,this.curBodyTrimDeg+=(175-this.curBodyTrimDeg)*(1-Math.exp(-8*e)),this.activePoseStyle="hammock_lie"}else{const b=this.activeLieSpot==="daybed_1"?5.65:7.75;this.pos[0]=b,this.pos[1]=6.06+.135,this.pos[2]=19.8,this.diverHeadingYaw=0,this.curBodyTrimDeg+=(180-this.curBodyTrimDeg)*(1-Math.exp(-8*e)),this.activePoseStyle="beach_lie"}else if(this.activeDiningSeat!==null){const b=Lt[this.activeDiningSeat]??Lt[0],B=this.engine.getVrmAvatar(),N=B.getSeatedContactHeight(),ee=B.getSeatedForwardScoot(b.idx===4?.305:.256);this.pos[0]=b.x-Math.sin(b.headingYaw)*ee,this.pos[1]=b.seatTopY+.88-N,this.pos[2]=b.z-Math.cos(b.headingYaw)*ee,this.vel[0]=0,this.vel[1]=0,this.vel[2]=0,this.diverHeadingYaw=b.headingYaw,this.curBodyTrimDeg=90,this.wasAboveSurface=!0,this.activePoseStyle=this.bbqEatTimer>0?"dining_eat":this.barSipTimer>0?"bar_sip":"dining_sit"}else if(this.bbqEatTimer>0)this.vel[0]=0,this.vel[1]=0,this.vel[2]=0,this.wasAboveSurface=!0,this.curBodyTrimDeg=90,this.activePoseStyle="bbq_eat";else if(this.knifeChopTimer>0&&Math.hypot(this.pos[0]-2.75,this.pos[2]-20.85)<3.6)this.vel[0]=0,this.vel[1]=0,this.vel[2]=0,this.wasAboveSurface=!0,this.curBodyTrimDeg=90,this.diverHeadingYaw=0,this.activePoseStyle="bbq_chop";else if(this.inspectFocus==="okislot"){const b=this.okiMachineIdx===1?11.96:11.18,B=this.engine.getVrmAvatar(),N=B.getSeatedContactHeight(),ee=B.getSeatedForwardScoot(.218);this.pos[0]=b,this.pos[1]=7.178+.88-N,this.pos[2]=26.36+ee,this.vel[0]=0,this.vel[1]=0,this.vel[2]=0,this.diverHeadingYaw=Math.PI,this.curBodyTrimDeg=90,this.wasAboveSurface=!0,this.activePoseStyle=this.barSipTimer>0?"bar_sip":"bar_sit";let V=0,pe=0;this.keys.has("KeyA")&&(V+=1),this.keys.has("KeyD")&&(V-=1),this.keys.has("KeyW")&&(pe+=1),this.keys.has("KeyS")&&(pe-=1),V!==0&&(this.inspectOrbitYaw=Math.max(-.85,Math.min(.85,this.inspectOrbitYaw+V*1.45*e))),pe!==0&&(this.inspectOrbitPitch=Math.max(-.65,Math.min(.35,this.inspectOrbitPitch-pe*1.05*e)))}else if(this.seatedStoolIndex===null&&this.barSipTimer>0&&this.pos[1]>5.42)this.vel[0]=0,this.vel[1]=0,this.vel[2]=0,this.wasAboveSurface=!0,this.curBodyTrimDeg=90,this.activePoseStyle="stand_sip";else if(this.seatedStoolIndex!==null){const b=3.85+this.seatedStoolIndex*1.12,B=this.engine.getVrmAvatar(),N=B.getSeatedContactHeight(),ee=B.getSeatedForwardScoot(.222);this.pos[0]=b,this.pos[1]=7.302+.88-N,this.pos[2]=26.32+ee,this.vel[0]=0,this.vel[1]=0,this.vel[2]=0,this.diverHeadingYaw=Math.PI,this.curBodyTrimDeg=90,this.wasAboveSurface=!0,this.activePoseStyle=this.barSipTimer>0?"bar_sip":"bar_sit"}else if(this.fishingPhase!=="inactive")this.stepFishingMode(e);else if(this.isWorkbenchFocus()||this.inspectFocus==="buddy_bwraf"||this.inspectFocus==="bar_bottles"||this.inspectFocus==="bbq_station"){let b=0,B=0;(this.keys.has("KeyA")||this.keys.has("ArrowLeft"))&&(b+=1),(this.keys.has("KeyD")||this.keys.has("ArrowRight"))&&(b-=1),(this.keys.has("KeyW")||this.keys.has("ArrowUp"))&&(B+=1),(this.keys.has("KeyS")||this.keys.has("ArrowDown"))&&(B-=1),b!==0&&(this.inspectOrbitYaw+=b*1.65*e,this.inspectOrbitYaw>Math.PI&&(this.inspectOrbitYaw-=Math.PI*2),this.inspectOrbitYaw<-Math.PI&&(this.inspectOrbitYaw+=Math.PI*2)),B!==0&&(this.inspectOrbitPitch=Math.max(-1.12,Math.min(.45,this.inspectOrbitPitch-B*1.15*e))),this.vel[0]=0,this.vel[1]=0,this.vel[2]=0,this.activePoseStyle="land_walk",this.curBodyTrimDeg=90}else if(this.entryMode!==null){if(this.entryTimer+=e,this.entryMode==="giant_stride"){const b=this.entryTimer;if(b<.48)this.activePoseStyle="giant_stride",this.pos[0]=-9.5,this.pos[1]=5.97+.88,this.pos[2]=5.45-b/.48*.28,this.diverHeadingYaw=0,this.curBodyTrimDeg=88;else if(b<1.32){const B=(b-.48)/.84;this.activePoseStyle="giant_stride",this.pos[0]=-9.5,this.pos[2]=5.17-B*2.65,this.pos[1]=6.85+.75*B-4.05*B*B,this.diverHeadingYaw=0,this.curBodyTrimDeg=86,!this.entrySplashFired&&this.pos[1]<=5.42&&(this.entrySplashFired=!0,this.audio.playWaterSplashEntry(),this.engine.setDiverExhaustBubbles(5,!0),this.showToast("💦 ザッパーーン！！ジャイアントストライド成功！BCDの浮力で水面に浮上するよ！"))}else if(b<2.2){const B=(b-1.32)/.88,N=1-Math.pow(1-B,2);this.activePoseStyle=B>.55?"surface_tread":"swim",this.pos[0]=-9.5,this.pos[2]=2.52-B*.45,this.pos[1]=3.55+N*(gi-3.55),this.curBodyTrimDeg=86}else this.entryMode=null,this.surfaceTreading=!0,this.activePoseStyle="surface_tread",this.pos[1]=gi,this.curBodyTrimDeg=86,this.wasAboveSurface=!1,this.showToast("👌 水面エントリー完了！海面で立ち泳ぎ中！WASDで水面移動、Shift/C/Tキーでサンゴ礁へ潜降しよう！")}else if(this.entryMode==="back_roll"){const b=this.entryTimer;if(b<.46)this.activePoseStyle="back_roll",this.pos[0]=-7.62,this.pos[1]=6.95,this.pos[2]=8.4,this.diverHeadingYaw=Math.PI*.5,this.curBodyTrimDeg=90+b/.46*18;else if(b<1.32){const B=(b-.46)/.86;this.activePoseStyle="back_roll",this.pos[0]=-7.62+B*2.1,this.pos[2]=8.4,this.pos[1]=6.95+.55*Math.sin(B*Math.PI)-3.35*B*B,this.diverHeadingYaw=Math.PI*.5,this.curBodyTrimDeg=108+B*165,!this.entrySplashFired&&this.pos[1]<=5.42&&(this.entrySplashFired=!0,this.audio.playWaterSplashEntry(),this.engine.setDiverExhaustBubbles(5,!0),this.showToast("💦 ザッパーーン！！バックロール・エントリー成功！豪快な泡に包まれて海へ入ったよ！"))}else if(b<2.15){const B=(b-1.32)/.83,N=1-Math.pow(1-B,2);this.activePoseStyle=B>.55?"surface_tread":"swim",this.pos[0]=-5.52+B*.35,this.pos[2]=8.4-B*.6,this.pos[1]=3.6+N*(gi-3.6),this.diverHeadingYaw=Math.PI*.5*(1-N),this.curBodyTrimDeg=84}else this.entryMode=null,this.surfaceTreading=!0,this.activePoseStyle="surface_tread",this.pos[1]=gi,this.curBodyTrimDeg=86,this.wasAboveSurface=!1,this.showToast("👌 バックロール完了！海面で立ち泳ぎ中！Shift/C/Tキーでマンタやウミガメのいる海へ潜降しよう！")}else if(this.entryMode==="beach_wade"){const b=this.entryTimer;if(b<2.1){const B=b/2.1;this.activePoseStyle="land_walk",this.pos[0]=0,this.pos[2]=21.8-B*6.4;const N=this.getTerrainY(this.pos[0],this.pos[2]);this.pos[1]=N+.88,this.vel[2]=-2.8,this.diverHeadingYaw=0,this.curBodyTrimDeg=90,!this.entrySplashFired&&N<=5.05&&(this.entrySplashFired=!0,this.audio.playBubbles(!1),this.showToast("🌊 腰の深さまでウェーディング完了！フィンを履いてBCDを排気し、サンゴ礁へ潜降するよ！"))}else if(b<3.25){const B=(b-2.1)/1.15;this.activePoseStyle="swim",this.bcdSurfaceAirPct=0,this.pos[0]=0,this.pos[2]=15.4-B*3.8;const N=this.getTerrainY(this.pos[0],this.pos[2]);this.pos[1]=Math.max(N+.82,5.15-B*1.85),this.vel[2]=-3.2,this.diverHeadingYaw=0,this.curBodyTrimDeg=90-B*68}else this.entryMode=null,this.vel[2]=0,this.activePoseStyle="swim",this.wasAboveSurface=!1,this.engine.setDiverExhaustBubbles(4,!0),this.showToast("🐠 沖縄ビーチエントリー完了！透明度抜群の慶良間ブルーを自由に泳ごう！")}}else{const b=this.getTerrainY(this.pos[0],this.pos[2]),B=this.pos[1]-.91,N=this.worldAsset?this.worldAsset.collider.sampleSupportY(this.pos[0],this.pos[2],B+.48,b):Math.max(this.isOverBoatDeck(this.pos[0],this.pos[2])&&this.pos[1]>=5.65?this.getBoatDeckFloorY(this.pos[2],this.pos[0])-.91:-999,this.getClubhouseAndPierFloorY(this.pos[0],this.pos[2])-.91,b),ee=N+.91,V=ee>Ot+.04;V&&(this.surfaceTreading=!1);const pe=!V&&!this.surfaceTreading&&this.pos[1]>5.26;if(V||pe){this.activePoseStyle=pe?"giant_stride":"land_walk",this.curBodyTrimDeg+=(90-this.curBodyTrimDeg)*(1-Math.exp(-8*e));let ce=0,J=0;this.keys.has("KeyW")&&(ce+=a,J+=r),this.keys.has("KeyS")&&(ce-=a,J-=r),this.keys.has("KeyD")&&(ce+=o,J+=l),this.keys.has("KeyA")&&(ce-=o,J-=l);const de=Math.hypot(ce,J);de>1e-4&&(ce/=de,J/=de);const ue=N<5.4,xe=this.virtualDashLatch||this.keys.has("ShiftLeft")||this.keys.has("ShiftRight"),be=(ue?3.2:3.9)*(xe?1.62:1);this.vel[0]+=(ce*be-this.vel[0])*Math.min(1,e*11),this.vel[2]+=(J*be-this.vel[2])*Math.min(1,e*11),this.vel[1]-=9.8*e,V&&this.keys.has("Space")&&Math.abs(this.pos[1]-ee)<.14&&(this.vel[1]=3.8);const Ce=e*.5;for(let De=0;De<2;De++){this.pos[0]=Math.max(-69.5,Math.min(69.5,this.pos[0]+this.vel[0]*Ce)),this.pos[2]=Math.max(-69.5,Math.min(69.5,this.pos[2]+this.vel[2]*Ce)),this.pos[1]+=this.vel[1]*Ce;const ge=this.pos[1]-.91;this.worldAsset&&this.worldAsset.collider.resolveLandCapsule(this.pos,this.vel,ge,.38),this.resolveClubhouseCollisions();const ve=this.getTerrainY(this.pos[0],this.pos[2]),Pe=(this.worldAsset?this.worldAsset.collider.sampleSupportY(this.pos[0],this.pos[2],ge+.48,ve):Math.max(this.isOverBoatDeck(this.pos[0],this.pos[2])&&this.pos[1]>=5.6?this.getBoatDeckFloorY(this.pos[2],this.pos[0])-.91:-999,this.getClubhouseAndPierFloorY(this.pos[0],this.pos[2])-.91,ve))+.91;Pe>Ot+.04&&this.pos[1]<=Pe&&(this.pos[1]=Pe,this.vel[1]<0&&(this.vel[1]=0))}const Se=this.pos[1]>5.9&&Math.abs(this.pos[0]- -1.6)<1.95&&Math.abs(this.pos[2]-47.92)<3.55;Se!==this.zenNorthDoorActive&&(this.zenNorthDoorActive=Se,this.audio.playAutoDoorSlide?.(Se));const Me=this.pos[1]>5.9&&Math.abs(this.pos[0]-1.95)<1.65&&Math.abs(this.pos[2]-31.8)<2.25;Me!==this.zenSouthDoorActive&&(this.zenSouthDoorActive=Me,this.audio.playAutoDoorSlide?.(Me)),this.zenNorthAutoDoorT=Se?Math.min(1,this.zenNorthAutoDoorT+e*3.1):Math.max(0,this.zenNorthAutoDoorT-e*1.9),this.zenSouthAutoDoorT=Me?Math.min(1,this.zenSouthAutoDoorT+e*3.1):Math.max(0,this.zenSouthAutoDoorT-e*1.9),this.zenTransitionToastCooldown>0&&(this.zenTransitionToastCooldown=Math.max(0,this.zenTransitionToastCooldown-e)),this.pos[2]>32?(!this.wasInsideZenCampusArea&&this.zenTransitionToastCooldown<=0&&this.pos[2]>48&&(this.showToast("🎓 南の島の裏側なのに、目の前に現れたのは無人の『ZEN大学 校舎』——都合のいいハルシネーションが、ふたつの世界を静かに繋いでいる。"),this.pickupToastTimer=6.2,this.zenTransitionToastCooldown=18),this.wasInsideZenCampusArea=!0):this.wasInsideZenCampusArea&&this.pos[2]<31.45&&(this.wasInsideZenCampusArea=!1,this.zenTransitionToastCooldown<=0&&(this.showToast("🌺 自動ドアが開いた先は、南の島のダイビング・クラブハウスだった——ZEN大学にいるはずのハルシネーションが、誰もいない常夏のバカンスへと繋がっている。"),this.pickupToastTimer=6.8,this.zenTransitionToastCooldown=18)),this.pos[1]>5.42?(this.wasAboveSurface||this.setWristGlanceQuiet(!1),this.wasAboveSurface=!0,this.pos[1]>5.75&&document.pointerLockElement===this.engine.getCanvas()&&document.exitPointerLock()):this.wasAboveSurface&&(this.wasAboveSurface=!1,this.activeBarDrink=null,this.audio.playWaterSplashEntry(),this.engine.setDiverExhaustBubbles(5,!0),this.showToast("💦 ザッパーーン！！海へエントリー！そのままWASDでサンゴ礁を泳ごう！"))}else{this.activeBarDrink=null;const ce=this.keys.has("ShiftLeft")||this.keys.has("ShiftRight")||this.keys.has("KeyC")||this.keys.has("KeyQ")||this.keys.has("KeyT"),J=this.cameraMode==="fpv"&&this.keys.has("KeyW")&&this.pitch<-.3,de=ce||J;if(this.wasAboveSurface?(this.wasAboveSurface=!1,this.audio.playWaterSplashEntry(),this.wearingScubaUnit&&this.gearSteps.valve_open&&this.engine.setDiverExhaustBubbles(5,!0),de||(this.surfaceTreading=!0,this.showToast("🌊 海面で立ち泳ぎ中！WASDで海面を移動、Shiftキーで水中に潜れるよ！"))):this.surfaceTreading?de&&(this.surfaceTreading=!1,this.vel[1]=Math.min(this.vel[1],-1.75),this.wearingScubaUnit&&this.gearSteps.valve_open&&this.engine.setDiverExhaustBubbles(4,!0)):!de&&this.pos[1]>=Ot-.12&&this.vel[1]>=-.25&&(this.surfaceTreading=!0),this.surfaceTreading){this.activePoseStyle="surface_tread";const ue=Math.hypot(h,c),xe=ue>1e-4?h/ue:0,Y=ue>1e-4?c/ue:0;this.trimMode==="auto"?this.targetBodyTrimDeg=ue>.05?73:86:this.targetBodyTrimDeg=Math.max(68,this.targetBodyTrimDeg),this.curBodyTrimDeg+=(this.targetBodyTrimDeg-this.curBodyTrimDeg)*(1-Math.exp(-8.5*e));const be=(this.wearingMaskAndFins?3.45:2.75)*(this.bbqBuffActive?1.12:1);this.vel[0]+=(xe*be-this.vel[0])*Math.min(1,e*7.5),this.vel[2]+=(Y*be-this.vel[2])*Math.min(1,e*7.5);const Ce=Math.sin(this.elapsed*1.85+this.pos[0]*.32+this.pos[2]*.32)*.032,Se=gi+Ce;this.vel[1]+=((Se-this.pos[1])*9.5-this.vel[1]*6.2)*e;const Me=e*.5;for(let De=0;De<2;De++){this.pos[0]=Math.max(-69.5,Math.min(69.5,this.pos[0]+this.vel[0]*Me)),this.pos[2]=Math.max(-69.5,Math.min(69.5,this.pos[2]+this.vel[2]*Me)),this.pos[1]+=this.vel[1]*Me,this.worldAsset&&this.worldAsset.collider.resolveSwimCapsule(this.pos,this.vel,this.lookDir,.4),this.resolveClubhouseCollisions();const ve=this.getTerrainY(this.pos[0],this.pos[2])+.91;this.pos[1]<ve&&(this.pos[1]=ve,this.vel[1]<0&&(this.vel[1]=0)),this.pos[1]>5.24&&(this.pos[1]=5.24,this.vel[1]>0&&(this.vel[1]=0))}}else{this.activePoseStyle="swim";const ue=Math.max(0,5.45-this.pos[1]);ue>=1.5&&(this.hasCompletedDive=!0);const xe=this.wearingWeightBelt?this.weightKg:0,Y=this.wearingWetsuit?this.suitVariant==="hibiscus_3mm"?3:4:1,be=xe-Y,Ce=this.wearingScubaUnit?S*Math.sin(this.elapsed*3.8)*7.5:0;if(this.trimMode==="auto")if(x>.1){const Je=Math.asin(Math.max(-.95,Math.min(.95,g)))*180/Math.PI,mt=this.bcdVariant==="wing_gold"?-5:0,ht=Math.max(0,be)*4.5;this.targetBodyTrimDeg=Math.max(-30,Math.min(85,8+mt+Je*.85+ht+Ce))}else if(ue<=.95)this.targetBodyTrimDeg=82;else{const Je=Math.max(-18,be*5.2),mt=this.bcdVariant==="wing_gold"?22:36;this.targetBodyTrimDeg=Math.max(8,Math.min(82,mt+Je+Ce))}this.curBodyTrimDeg+=(this.targetBodyTrimDeg-this.curBodyTrimDeg)*(1-Math.exp(-6.5*e));const Se=1.08-.28*Math.min(1,Math.abs(this.curBodyTrimDeg)/90)+(this.wearingScubaUnit?T?.08:-S*.08:0),Me=this.finVariant==="yellow_long"?6.15:this.finVariant==="coral_jet"?5.05:5.35,ge=(this.wearingMaskAndFins?this.unlockedUpgrades.swim_fins?Me+1.4:Me:3.25)*Se*(this.bbqBuffActive?1.15:1),ve=this.finVariant==="coral_jet"?22:16,ye=4.2,{netKgf:Pe,bcdActualL:_e}=this.evalNetBuoyancyKgf(ue);this.bcdSurfaceAirPct=Math.round(Math.min(100,_e/13*100));let Oe=0;ue>.8&&(Oe=Math.max(-1.65,Math.min(1.85,Pe*.28))),this.wearingScubaUnit&&this.bcdHeightCm<-3.5&&this.pitch>.22&&this.headBonkCooldown<=0&&(this.pitch=.16,this.updateLookVector(),this.headBonkCooldown=4.5,this.audio.playGearClick(0),this.showToast("💥 ゴンッ！！BCDの位置が低すぎて、上を向いた時にタンクのバルブが後頭部に当たったよ！（作業台②で肩ライン0cmに合わせよう）")),this.wearingScubaUnit&&!this.camBuckleLocked&&!this.tankSlippedUnderwater&&ue>1.8&&(this.tankSlipTimer+=e,this.tankSlipTimer>8.5&&(this.tankSlippedUnderwater=!0,this.bcdHeightCm=-9.5,this.audio.playDiveAlertBeep(),this.showToast("😱 ズルッ！！カムバックルがロックされていなかったせいで、水中でタンクが滑り下がって姿勢が崩れたよ！"))),this.vel[0]+=(u*ge*ye-this.vel[0]*ye)*Math.min(1,e*ve*.25),this.vel[1]+=((g*ge+Oe)*ye-this.vel[1]*ye)*Math.min(1,e*ve*.25),this.vel[2]+=(p*ge*ye-this.vel[2]*ye)*Math.min(1,e*ve*.25);const Ge=e*.5;for(let Je=0;Je<2;Je++){this.pos[0]=Math.max(-69.5,Math.min(69.5,this.pos[0]+this.vel[0]*Ge)),this.pos[2]=Math.max(-69.5,Math.min(69.5,this.pos[2]+this.vel[2]*Ge)),this.pos[1]+=this.vel[1]*Ge,this.worldAsset&&this.worldAsset.collider.resolveSwimCapsule(this.pos,this.vel,this.lookDir,.4);const mt=this.getTerrainY(this.pos[0],this.pos[2]),ht=mt+(mt>4.15?.91:.72);this.pos[1]<ht&&(this.pos[1]=ht,this.vel[1]<0&&(this.vel[1]=0)),ht<=Ot&&this.pos[1]>Ot&&(this.pos[1]=Ot,this.vel[1]>0&&(this.vel[1]=0),de||(this.surfaceTreading=!0))}}}}const m=Math.max(0,5.45-this.pos[1]),A=Math.max(0,(this.prevDepthM-m)/Math.max(e,1e-4)*60);this.ascentRateMpm+=(A-this.ascentRateMpm)*(1-Math.exp(-6*e)),this.prevDepthM=m;const D=m<=.85,W=Math.min(Math.hypot(this.pos[0]- -9.5,this.pos[2]-9.5),Math.hypot(this.pos[0]-10.5,this.pos[2]-10.5))<6.2&&m<3.5,w=this.wearingScubaUnit&&this.regPlacedOnValve&&this.valveTurns>.08&&this.lineBar>8;w&&m>1.5&&this.ascentRateMpm>18.5&&this.ascentWarnCooldown<=0&&(this.ascentWarnCooldown=5.5,this.audio.playDiveAlertBeep(),this.showToast(`⚠️ 浮上速度オーバー（${Math.round(this.ascentRateMpm)} m/分 > PADI上限18m/分）！浮上するとBCDの空気が膨張するから『Tキー：排気』で減速しよう！`));const y=w&&!D&&this.elapsed%3.4<1.1;if(this.stepPneumaticsAndOptics(e,m,y),this.stepDiveComputer(e,m,w),w&&!D&&m>4.2&&this.valveTurns<1.6&&this.halfOpenWarnCooldown<=0&&(this.halfOpenWarnCooldown=7,this.audio.playDiveAlertBeep(),this.showToast(`😰 苦しい！水深 ${m.toFixed(1)}m で吸気が重く残圧針が急落中！タンクバルブが半開き（${this.valveTurns.toFixed(1)}回転）だよ！`)),D||W&&w)this.wasAtSurface||(w&&W&&this.tankAirLiters<this.cylinderVolL*185?(this.refillAirToFull(),this.audio.playValveOpenHiss(),this.showToast("🚤 ボート／ラフトで新しい200 bar満タンタンクに交換したよ！")):!w&&this.apneaSec<this.maxApneaSec*.85&&(this.audio.playScubaInhale(),this.showToast("🫁 ぷはぁーっ！水面で新鮮な空気を呼吸！（素潜り息こらえ 45秒回復）"))),this.apneaSec=Math.min(this.maxApneaSec,this.apneaSec+e*60),this.wasAtSurface=!0;else if(this.wasAtSurface=!1,w){const b=1+m/10,B=x>.1?19:15,N=(this.shoulderStrapPct>68?1.25:1)*(this.shikuwasaRelaxBonus?.9:1),ee=B*N/60*b*e;this.tankAirLiters=Math.max(0,this.tankAirLiters-ee);const V=this.tankAirLiters/this.cylinderVolL;!this.warned100Bar&&V<=100?(this.warned100Bar=!0,this.audio.playDiveAlertBeep(),this.showToast("📟 残圧 100 bar（ハーフタンク合図）！バディに残圧を伝えて折り返しを意識しよう！")):!this.warned50Bar&&V<=50&&(this.warned50Bar=!0,this.audio.playDiveAlertBeep(),this.showToast("⚠️ 残圧 50 bar（リザーブ警告）！水深5mで3分間の安全停止をしてエキジットしよう！")),this.tankAirLiters<=.1&&(this.pos[0]=-8.2,this.pos[1]=gi,this.pos[2]=4.2,this.surfaceTreading=!0,this.refillAirToFull(),this.audio.playBubbles(!0),this.showToast("🛟 タンク残圧ゼロで緊急浮上！ボート船尾で200 barタンクに交換したよ！"))}else this.apneaSec=Math.max(0,this.apneaSec-e),this.apneaSec<=.01&&(this.pos[0]=-8.2,this.pos[1]=gi,this.pos[2]=4.2,this.surfaceTreading=!0,this.apneaSec=this.maxApneaSec,this.audio.playBubbles(!0),this.showToast(this.wearingScubaUnit&&!this.gearSteps.valve_open?"⚠️ タンクのバルブが開いてなかったよ！（⑤バルブ全開 200 bar を忘れずに！）":"🫁 素潜りの息こらえ限界で水面へ浮上！長時間潜るならスキューバ機材を準備しよう！"));if(this.breathBubbleTimer-=e,w&&!D?this.breathBubbleTimer<=0&&(this.breathBubbleTimer=3.4,this.audio.playScubaExhale("tiny"),this.engine.setDiverExhaustBubbles(4,!0)):!w&&this.entryMode===null&&this.engine.setDiverExhaustBubbles(0),!(this.pos[1]>5.75&&this.pos[2]>24.5&&this.faunaObserveAgentId===null))for(const b of this.faunaAgents)if(b.stationary)b.curPos[0]=b.orbitCenter[0],b.curPos[1]=b.baseY,b.curPos[2]=b.orbitCenter[2],b.curDir[0]=.25,b.curDir[1]=0,b.curDir[2]=.96;else{const B=this.elapsed*b.angularSpeed+b.phase,N=b.species==="manta"?Math.sin(B*2)*1.4:0,ee=b.orbitCenter[0]+Math.cos(B)*b.orbitRx,V=b.orbitCenter[2]+Math.sin(B)*b.orbitRz+N,pe=Math.max(this.getTerrainY(ee,V)+.85,b.baseY+Math.sin(this.elapsed*.75+b.phase)*b.bobAmp),ce=b.angularSpeed>=0?1:-1,J=-Math.sin(B)*b.orbitRx*ce,de=(Math.cos(B)*b.orbitRz+(b.species==="manta"?Math.cos(B*2)*2.8:0))*ce,ue=Math.cos(this.elapsed*.75+b.phase)*b.bobAmp*.35;b.curPos[0]=ee,b.curPos[1]=pe,b.curPos[2]=V,b.curDir[0]=J,b.curDir[1]=ue,b.curDir[2]=de}if(this.faunaObserveAgentId!==null)if(x>.05||this.keys.has("Space")||this.keys.has("ShiftLeft")||this.keys.has("ShiftRight"))this.faunaObserveAgentId=null;else{const b=this.faunaAgents.find(B=>B.id===this.faunaObserveAgentId);b?this.snapDiverToObservedFauna(b):this.faunaObserveAgentId=null}this.syncCameraAndVrm(e);const P=this.camPosOut[0],U=this.camPosOut[1],L=this.camPosOut[2],E=this.camDirOut[0],_=this.camDirOut[1],H=this.camDirOut[2];this.drawCalls.length=0;const G=U>5.75&&L>24.5&&this.faunaObserveAgentId===null;let Q=null,se=-1,X=999;if(!G)for(const b of this.faunaAgents){const B=b.curPos[0]-P,N=b.curPos[1]-U,ee=b.curPos[2]-L,V=Math.hypot(B,N,ee),pe=Math.hypot(b.curPos[0]-this.pos[0],b.curPos[1]-this.pos[1],b.curPos[2]-this.pos[2]);if(this.pos[1]<Ot+.45&&U<Ot+.65&&V>.5&&pe<24){const ce=(B*E+N*_+ee*H)/V,J=Math.max(.935,.984-b.focusRadius/Math.max(V*3.2,4));if(ce>=J){const de=ce*4-pe*.006;de>se&&(se=de,Q=b,X=pe)}}}let Z=null;if(Q){this.focusedAgentId===Q.id?this.focusHoldSec+=e:(this.focusedAgentId=Q.id,this.focusHoldSec=e);const b=Q.species;let B=!1;!this.discovered[b]&&this.focusHoldSec>=.45&&(this.discovered[b]=!0,this.newlyLoggedFlashSec=2.4,B=!0,this.audio.playSonarScanLock(),this.showToast(`📖 沖縄美ら海図鑑に登録：『${$a[b].jpName}』を発見！`));const[N,ee,V]=this.engine.projectWorldToScreen(Q.curPos);Z={species:$a[b],distanceM:X,depthM:Math.max(.1,5.45-Q.curPos[1]),screenU:V>0?Math.max(.08,Math.min(.92,N)):.5,screenV:V>0?Math.max(.12,Math.min(.88,1-ee)):.45,newlyLogged:B||this.newlyLoggedFlashSec>0,scanProgressPct:this.discovered[b]?100:Math.min(100,Math.round(this.focusHoldSec/.45*100))}}else this.focusedAgentId=null,this.focusHoldSec=0;if(!G)for(const b of this.faunaAgents){const B=Q?.id===b.id,N=b.species==="manta"?Math.sin(this.elapsed*.5+b.phase)*.16:0;Kt(b.mat,b.curPos,b.curDir,b.scale,N);const ee=b.species==="manta"?2.4:b.species==="turtle"?2.8:5.6;this.drawCalls.push({rangeName:b.rangeName,modelMat:b.mat,animPhase:this.elapsed*ee+b.phase*3,animMode:b.animMode,highlightGlow:B?.68:0,castShadow:!b.stationary})}let ae=null,ie=999;const R=!G&&this.lastMouseClientX>=0&&this.engine.screenToWorldRay(this.lastMouseClientX,this.lastMouseClientY,this.rayOriginTmp,this.rayDirTmp);for(const b of this.lootNodes){if(b.collected)if(b.respawnTimer-=e,b.respawnTimer<=0)b.collected=!1;else continue;if(G)continue;const B=b.pos[0]-this.pos[0],N=b.pos[1]+.25-this.pos[1],ee=b.pos[2]-this.pos[2],V=Math.hypot(B,N,ee);if(V<6){const pe=b.pos[0]-P,ce=b.pos[1]+.25-U,J=b.pos[2]-L,de=Math.hypot(pe,ce,J)||1,ue=(pe*E+ce*_+J*H)/de;(R&&this.raySphereDist(this.rayOriginTmp,this.rayDirTmp,b.pos[0],b.pos[1]+.22,b.pos[2],.62)>0||ue>.84||V<2.65)&&V<ie&&(ae=b,ie=V)}}this.faunaObserveAgentId!==null&&(ae=null);const K=ae!==null&&ie<=4.35;let oe=null;if(ae){if(K&&this.harvestingHeld){this.harvestTargetId!==ae.id&&(this.harvestTargetId=ae.id,this.harvestProgressSec=0,this.lastScrapeTick=0);const B=this.unlockedUpgrades.titanium_hook?2.25:1;this.harvestProgressSec+=e*B,this.hookSwingPhase+=e*15;const N=Math.floor(this.harvestProgressSec*4.5);N>this.lastScrapeTick&&(this.lastScrapeTick=N,this.audio.playHookScrape(N),this.engine.setDiverExhaustBubbles(4,!0));const ee=ri[ae.kind].harvestSec;this.harvestProgressSec>=ee&&(this.collectLootNode(ae),this.harvestProgressSec=0,this.harvestTargetId=null)}else this.harvestTargetId!==ae.id?this.harvestProgressSec=0:this.harvestProgressSec=Math.max(0,this.harvestProgressSec-e*1.5),this.hookSwingPhase*=Math.exp(-8*e);const b=ri[ae.kind].harvestSec;oe={id:ae.id,kind:ae.kind,name:ri[ae.kind].name,distanceM:ie,harvestPct:Math.min(100,Math.round(this.harvestProgressSec/b*100)),inRange:K}}else Q&&Q.species==="gurukun"&&X<=5.8&&this.pos[1]<Ot+.1&&this.faunaObserveAgentId===null?(this.harvestingHeld?(this.gurukunCatchProgress+=e*(this.unlockedUpgrades.titanium_hook?1.85:1),this.hookSwingPhase+=e*15,this.gurukunCatchProgress>=.65&&(this.gurukunCatchProgress=0,this.seafoodStock.gurukun+=1,this.totalCollected+=1,this.audio.playItemPickup(!0),this.showToast(`🐟 獲れたての『県魚グルクン +1』（所持 ${this.seafoodStock.gurukun}尾）を捕獲！ビーチBBQのまな板でさばいて焼こう！`))):(this.gurukunCatchProgress=Math.max(0,this.gurukunCatchProgress-e*1.5),this.hookSwingPhase*=Math.exp(-8*e)),oe={id:9e3+Q.id,kind:"meebai",name:"県魚グルクン（BBQ用に捕獲！）",distanceM:X,harvestPct:Math.min(100,Math.round(this.gurukunCatchProgress/.65*100)),inRange:!0}):(this.harvestTargetId=null,this.harvestProgressSec=0,this.gurukunCatchProgress=0,this.hookSwingPhase*=Math.exp(-8*e));if(!G)for(const b of this.lootNodes){if(b.collected)continue;const B=ae?.id===b.id,N=ri[b.kind].scale,ee=b.kind==="meebai"||b.kind==="irabucha"||b.kind==="taman"||b.kind==="gaara"||b.kind==="akamachi";if(B&&this.harvestProgressSec>.01){const ce=Math.sin(this.elapsed*38)*.08;re(b.mat,b.pos[0],b.pos[1]+.04,b.pos[2],b.yaw,N,N,N,ce,ce)}else if(ee){const ce=Math.sin(this.elapsed*2.1+b.id)*.08,J=.35,de=b.pos[0]+Math.cos(this.elapsed*.55+b.id)*J,ue=b.pos[2]+Math.sin(this.elapsed*.55+b.id)*J,xe=-(this.elapsed*.55+b.id);re(b.mat,de,b.pos[1]+ce,ue,xe,N)}const V=ee||b.kind==="shellfish"||b.kind==="lobster",pe=b.kind==="chest"||b.kind==="pearl"||V?.28:.1;this.drawCalls.push({rangeName:ri[b.kind].rangeName,modelMat:b.mat,animPhase:ee?this.elapsed*4.6+b.id:b.kind==="lobster"?0:this.elapsed,animMode:ee?2:0,highlightGlow:B?.95:pe,castShadow:!0})}const he=this.getSelectedBcdRangeName(),me=this.getSelectedFinRangeName();for(const[b,B,N,ee]of[["kerama_5mm","prop_suit_kerama",this.suitRackKeramaMat,"suit_rack_kerama"],["hibiscus_3mm","prop_suit_hibiscus",this.suitRackHibiscusMat,"suit_rack_hibiscus"],["pro_gold","prop_suit_gold",this.suitRackGoldMat,"suit_rack_gold"]])if(!(this.wearingWetsuit&&this.suitVariant===b)){const V=this.hoveredPartId===ee;this.drawCalls.push({rangeName:B,modelMat:N,animPhase:this.elapsed,animMode:0,highlightGlow:V?.85:this.suitVariant===b?.18:.04,castShadow:!0})}if(this.drawCalls.push({rangeName:"gear_scuba_tank",modelMat:this.boatTankMatA,animPhase:this.elapsed,animMode:0,highlightGlow:.06,castShadow:!0}),this.drawCalls.push({rangeName:"gear_scuba_tank",modelMat:this.boatTankMatB,animPhase:this.elapsed,animMode:0,highlightGlow:.04,castShadow:!0}),!this.wearingScubaUnit){this.drawCalls.push({rangeName:"wb_tank_body",modelMat:this.clubTankMat,animPhase:this.elapsed,animMode:0,highlightGlow:this.hoveredPartId==="tank_stamp"?.78:.1,castShadow:!0}),re(this.wbLocalTmpMat,-.056-.008*(this.valveTurns/3),.348,0,0,1,1,1,this.valveTurns*Math.PI*2,0),Ee(this.wbValveWheelMat,this.clubTankMat,this.wbLocalTmpMat),this.drawCalls.push({rangeName:"wb_valve_wheel",modelMat:this.wbValveWheelMat,animPhase:this.elapsed,animMode:0,highlightGlow:this.hoveredPartId==="valve_wheel"||this.draggedPartId==="valve_wheel"?.92:.14,castShadow:!0}),re(this.wbLocalTmpMat,0,.348,.0275,0,1),Ee(this.wbOringMat,this.clubTankMat,this.wbLocalTmpMat),this.drawCalls.push({rangeName:this.oringCondition==="clean_seated"?"wb_oring_good":"wb_oring_bad",modelMat:this.wbOringMat,animPhase:this.elapsed,animMode:0,highlightGlow:this.hoveredPartId==="valve_oring"?.95:this.oringCondition==="salted_nicked"?.45:.08,castShadow:!1});const b=Math.min(1,this.bcdAirStdL/12);if(this.bcdPlacedOnTank){const ee=this.bcdAzimuthDeg*Math.PI/180,V=this.bcdHeightCm*.01;re(this.wbLocalTmpMat,0,.055+V,0,ee,1),Ee(this.wbCamBandMat,this.clubTankMat,this.wbLocalTmpMat),this.drawCalls.push({rangeName:"wb_cam_band",modelMat:this.wbCamBandMat,animPhase:this.elapsed,animMode:0,highlightGlow:this.hoveredPartId==="cam_lever"?.55:.08,castShadow:!0}),re(this.wbLocalTmpMat,.032,0,-.112,this.camBuckleLocked?0:1.72,1),Ee(this.wbCamLeverMat,this.wbCamBandMat,this.wbLocalTmpMat),this.drawCalls.push({rangeName:"wb_cam_lever",modelMat:this.wbCamLeverMat,animPhase:this.elapsed,animMode:0,highlightGlow:this.hoveredPartId==="cam_lever"?.95:this.camBuckleLocked?.08:.36,castShadow:!0}),re(this.wbLocalTmpMat,Math.sin(ee)*.195,.05+V,Math.cos(ee)*.195,ee,1+.22*b,1,1+.12*b),Ee(this.clubMountedBcdMat,this.clubTankMat,this.wbLocalTmpMat),this.drawCalls.push({rangeName:he,modelMat:this.clubMountedBcdMat,animPhase:this.elapsed,animMode:0,highlightGlow:this.hoveredPartId==="bcd_body"||this.draggedPartId==="bcd_body"?.72:.08,castShadow:!0}),re(this.wbLocalTmpMat,.125,this.lpiConnected?.042:.102,.138,0,1),Ee(this.wbLpiCouplerMat,this.clubMountedBcdMat,this.wbLocalTmpMat),this.drawCalls.push({rangeName:"wb_lpi_coupler",modelMat:this.wbLpiCouplerMat,animPhase:this.elapsed,animMode:0,highlightGlow:this.hoveredPartId==="lpi_coupler"?.95:this.lpiConnected?.1:.34,castShadow:!0})}else this.drawCalls.push({rangeName:he,modelMat:this.clubLooseBcdMat,animPhase:this.elapsed,animMode:0,highlightGlow:this.hoveredPartId==="bcd_body"?.85:.16,castShadow:!0});if(this.regPlacedOnValve){re(this.wbLocalTmpMat,0,.348,0,0,1,1,1,0,this.regOrientationReversed?Math.PI:0),Ee(this.wbReg1stMat,this.clubTankMat,this.wbLocalTmpMat),this.drawCalls.push({rangeName:"wb_reg_1st",modelMat:this.wbReg1stMat,animPhase:this.elapsed,animMode:0,highlightGlow:this.hoveredPartId==="reg_1st"?.88:this.regOrientationReversed?.38:.08,castShadow:!0});const ee=this.yokeScrewPct/100*Math.PI*6,V=-.066+this.yokeScrewPct/100*.018;re(this.wbLocalTmpMat,0,.348,V,0,1,1,1,0,ee),Ee(this.wbYokeScrewMat,this.clubTankMat,this.wbLocalTmpMat),this.drawCalls.push({rangeName:"wb_yoke_screw",modelMat:this.wbYokeScrewMat,animPhase:this.elapsed,animMode:0,highlightGlow:this.hoveredPartId==="yoke_screw"||this.draggedPartId==="yoke_screw"?.95:.12,castShadow:!0}),re(this.wbLocalTmpMat,.048,.312,-.032,.4,1,1,1,.5,0),Ee(this.wbDustCapMat,this.clubTankMat,this.wbLocalTmpMat),this.drawCalls.push({rangeName:"wb_dust_cap",modelMat:this.wbDustCapMat,animPhase:this.elapsed,animMode:0,highlightGlow:.04,castShadow:!1})}else re(this.wbReg1stMat,-4.18,7.47,27.32,.18,.95,.95,.95,-.14,0),this.drawCalls.push({rangeName:"wb_reg_1st",modelMat:this.wbReg1stMat,animPhase:this.elapsed,animMode:0,highlightGlow:this.hoveredPartId==="reg_1st"?.88:.16,castShadow:!0}),re(this.wbLocalTmpMat,0,0,-.058,0,1),Ee(this.wbYokeScrewMat,this.wbReg1stMat,this.wbLocalTmpMat),this.drawCalls.push({rangeName:"wb_yoke_screw",modelMat:this.wbYokeScrewMat,animPhase:this.elapsed,animMode:0,highlightGlow:.1,castShadow:!1}),this.dustCapRemoved?re(this.wbLocalTmpMat,-.118,.042,-.016,-.78,1.25,1.25,1.25,.45,0):re(this.wbLocalTmpMat,0,0,0,0,1.38,1.38,1.38),Ee(this.wbDustCapMat,this.wbReg1stMat,this.wbLocalTmpMat),this.drawCalls.push({rangeName:"wb_dust_cap",modelMat:this.wbDustCapMat,animPhase:this.elapsed,animMode:0,highlightGlow:this.hoveredPartId==="dust_cap"?.98:this.dustCapRemoved?.08:.55,castShadow:!1});re(this.wbSpgConsoleMat,-4.84,this.spgFaceDown?7.209:7.216,27.06,Math.PI+.1,1.18,1.18,1.18,this.spgFaceDown?Math.PI*.5:-Math.PI*.5+.12,0),this.drawCalls.push({rangeName:"wb_spg_console",modelMat:this.wbSpgConsoleMat,animPhase:this.elapsed,animMode:0,highlightGlow:this.hoveredPartId==="spg_console"?.88:.12,castShadow:!0});const B=2.356-Math.min(250,Math.max(0,this.smoothedSpgNeedleBar))/200*3.403;re(this.wbLocalTmpMat,0,0,0,0,1,1,1,0,B),Ee(this.wbSpgNeedleMat,this.wbSpgConsoleMat,this.wbLocalTmpMat),this.drawCalls.push({rangeName:"wb_spg_needle",modelMat:this.wbSpgNeedleMat,animPhase:this.elapsed,animMode:0,highlightGlow:.35,castShadow:!1}),re(this.wbPurgeRegMat,-5.06,this.purgeHeld?7.234:7.24,27.08,Math.PI+.18,1.12),this.drawCalls.push({rangeName:"wb_purge_reg",modelMat:this.wbPurgeRegMat,animPhase:this.elapsed,animMode:0,highlightGlow:this.hoveredPartId==="purge_reg"||this.purgeHeld?.92:.18,castShadow:!0});const N=.82+.32*Math.sin(this.elapsed*58);(this.valveBlowOutTimer>0||!this.regPlacedOnValve&&this.valveTurns>.04&&this.tankAirLiters>5)&&(re(this.wbLocalTmpMat,0,.348,.032,0,N,N,1.25*N),Ee(this.wbAirJetMatA,this.clubTankMat,this.wbLocalTmpMat),this.drawCalls.push({rangeName:"wb_air_jet",modelMat:this.wbAirJetMatA,animPhase:this.elapsed,animMode:0,highlightGlow:.95,castShadow:!1})),this.yokeLeaking&&(re(this.wbLocalTmpMat,.015,.352,.025,.65,.75*N,.75*N,.95*N,-.35,0),Ee(this.wbAirJetMatA,this.clubTankMat,this.wbLocalTmpMat),this.drawCalls.push({rangeName:"wb_air_jet",modelMat:this.wbAirJetMatA,animPhase:this.elapsed,animMode:0,highlightGlow:.95,castShadow:!1})),(this.purgeHeld||this.inhaleTestTimer>0)&&this.lineBar>3&&(re(this.wbAirJetMatB,-5.06,7.235,27.08,0,.85*N,.85*N,1.15*N,-Math.PI*.5,0),this.drawCalls.push({rangeName:"wb_air_jet",modelMat:this.wbAirJetMatB,animPhase:this.elapsed,animMode:0,highlightGlow:.92,castShadow:!1}))}if(this.wearingWeightBelt||this.drawCalls.push({rangeName:"gear_weight_belt",modelMat:this.clubLooseBeltMat,animPhase:this.elapsed,animMode:0,highlightGlow:.1,castShadow:!0}),!this.wearingMaskAndFins){if(this.inspectFocus==="wb_rinse"||this.maskRinseDipTimer>.01){const b=this.maskRinseDipTimer>0?Math.sin((1-this.maskRinseDipTimer/.65)*Math.PI)*.2:Math.sin(this.elapsed*2.5)*.01;re(this.rinseMaskMat,-8.8,7.23-b,30.18,Math.PI-.16,1.12,1.12,1.12,-.34+b*.75,0);const B=this.hoveredPartId==="club_rinse_tank"||this.hoveredPartId==="wb_dive_mask"?.92:.38;this.drawCalls.push({rangeName:"gear_dive_mask",modelMat:this.rinseMaskMat,animPhase:this.elapsed,animMode:0,highlightGlow:B,castShadow:!0}),this.drawCalls.push({rangeName:"gear_dive_mask_lens",modelMat:this.rinseMaskMat,animPhase:this.elapsed,animMode:0,highlightGlow:B*.5,castShadow:!1,isGlass:!0})}else{re(this.clubLooseMaskMat,-3.66,7.216,27.16,Math.PI-.1,1.02);const b=this.hoveredPartId==="wb_dive_mask"?.92:this.lpiConnected&&!this.maskDefogged?.45:.12;this.drawCalls.push({rangeName:"gear_dive_mask",modelMat:this.clubLooseMaskMat,animPhase:this.elapsed,animMode:0,highlightGlow:b,castShadow:!0}),this.drawCalls.push({rangeName:"gear_dive_mask_lens",modelMat:this.clubLooseMaskMat,animPhase:this.elapsed,animMode:0,highlightGlow:b*.5,castShadow:!1,isGlass:!0})}for(const b of[this.clubLooseFinLMat,this.clubLooseFinRMat])this.drawCalls.push({rangeName:me,modelMat:b,animPhase:this.elapsed,animMode:0,highlightGlow:.14,castShadow:!0});!this.wearingWetsuit&&!this.dcWristGlance&&(re(this.wbDiveCompMat,-3.4,7.258,27.14,-.32,1.38),this.drawCalls.push({rangeName:"gear_dive_computer",modelMat:this.wbDiveCompMat,animPhase:0,animMode:0,highlightGlow:this.hoveredPartId==="wb_dive_computer"?.92:.24,castShadow:!0}))}const ne=this.engine.getVrmAvatar();if(this.cameraMode==="tpv"&&ne.isLoaded()&&this.engine.getVrmCameraProximityFade()>.25){const b=Math.max(0,(36-this.shoulderStrapPct)/36),B=-b*.13-(this.waistStrapLocked?0:.035),N=-b*.06,ee=b*Math.sin(this.elapsed*5.2)*.24,V=-b*.28;if(this.wearingScubaUnit&&ne.getBoneCharacterAlignedWorldMatrix("chest",this.chestBoneMat)){const J=ne.getTorsoGearScale(),de=-this.bcdHeightCm*.01*J;if(this.bcdPlacedOnTank){const ue=1+.22*(this.bcdSurfaceAirPct/100);re(this.localGearOffMat,0,B*.45*J,0,0,ue*J,J,(1+.12*(this.bcdSurfaceAirPct/100))*J),Ee(this.bcdVestMat,this.chestBoneMat,this.localGearOffMat),this.drawCalls.push({rangeName:he,modelMat:this.bcdVestMat,animPhase:this.elapsed,animMode:0,highlightGlow:this.hoveredPartId==="bwraf_bcd"?.78:0,castShadow:!0})}if(re(this.localGearOffMat,0,(-.01+B)*J+de,(-.185+N)*J,ee,J,J,J,V,0),Ee(this.backTankMat,this.chestBoneMat,this.localGearOffMat),this.drawCalls.push({rangeName:"wb_tank_body",modelMat:this.backTankMat,animPhase:this.elapsed,animMode:0,highlightGlow:this.hoveredPartId==="bwraf_air"?.65:.05,castShadow:!0}),re(this.wbLocalTmpMat,-.056-.008*(this.valveTurns/3),.348,0,0,1,1,1,this.valveTurns*Math.PI*2,0),Ee(this.wornValveWheelMat,this.backTankMat,this.wbLocalTmpMat),this.drawCalls.push({rangeName:"wb_valve_wheel",modelMat:this.wornValveWheelMat,animPhase:this.elapsed,animMode:0,highlightGlow:.08,castShadow:!0}),re(this.wbLocalTmpMat,0,.04-de/J,0,0,1),Ee(this.wornCamBandMat,this.backTankMat,this.wbLocalTmpMat),this.drawCalls.push({rangeName:"wb_cam_band",modelMat:this.wornCamBandMat,animPhase:this.elapsed,animMode:0,highlightGlow:this.hoveredPartId==="bwraf_releases"?.72:.04,castShadow:!0}),re(this.wbLocalTmpMat,.032,0,-.112,this.camBuckleLocked?0:1.72,1),Ee(this.wornCamLeverMat,this.wornCamBandMat,this.wbLocalTmpMat),this.drawCalls.push({rangeName:"wb_cam_lever",modelMat:this.wornCamLeverMat,animPhase:this.elapsed,animMode:0,highlightGlow:this.camBuckleLocked?.04:.65,castShadow:!0}),this.regPlacedOnValve&&(re(this.localGearOffMat,0,B*J+de,N*J,ee*.6,(this.regOrientationReversed?-1:1)*J,J,J,V*.6,0),Ee(this.regHosesMat,this.chestBoneMat,this.localGearOffMat),this.drawCalls.push({rangeName:"gear_reg_hoses",modelMat:this.regHosesMat,animPhase:this.elapsed,animMode:0,highlightGlow:this.hoveredPartId==="bwraf_air"?.75:.08,castShadow:!0}),re(this.wbLocalTmpMat,0,.348,-.066+this.yokeScrewPct/100*.018,0,1),Ee(this.wornYokeScrewMat,this.backTankMat,this.wbLocalTmpMat),this.drawCalls.push({rangeName:"wb_yoke_screw",modelMat:this.wornYokeScrewMat,animPhase:this.elapsed,animMode:0,highlightGlow:.06,castShadow:!1})),this.inspectFocus==="buddy_bwraf"){re(this.wbLocalTmpMat,.23*J,-.13*J,.14*J,.35,.9*J),Ee(this.wbSpgConsoleMat,this.chestBoneMat,this.wbLocalTmpMat),this.drawCalls.push({rangeName:"wb_spg_console",modelMat:this.wbSpgConsoleMat,animPhase:this.elapsed,animMode:0,highlightGlow:this.hoveredPartId==="bwraf_air"?.85:.18,castShadow:!0});const ue=2.356-Math.min(250,Math.max(0,this.smoothedSpgNeedleBar))/200*3.403;re(this.wbLocalTmpMat,0,0,0,0,1,1,1,0,ue),Ee(this.wbSpgNeedleMat,this.wbSpgConsoleMat,this.wbLocalTmpMat),this.drawCalls.push({rangeName:"wb_spg_needle",modelMat:this.wbSpgNeedleMat,animPhase:this.elapsed,animMode:0,highlightGlow:.45,castShadow:!1})}}const pe=this.wearingScubaUnit&&this.regPlacedOnValve;if((this.wearingMaskAndFins||pe)&&ne.getBoneCharacterAlignedWorldMatrix("head",this.headBoneMat)){const J=ne.getMaskFit();re(this.localGearOffMat,0,J.dy,J.dz,0,J.scale),Ee(this.diveMaskMat,this.headBoneMat,this.localGearOffMat),this.wearingMaskAndFins&&(this.drawCalls.push({rangeName:"gear_dive_mask",modelMat:this.diveMaskMat,animPhase:this.elapsed,animMode:0,highlightGlow:.05,castShadow:!0}),this.drawCalls.push({rangeName:"gear_dive_mask_lens",modelMat:this.diveMaskMat,animPhase:this.elapsed,animMode:0,highlightGlow:.05,castShadow:!1,isGlass:!0})),pe&&this.drawCalls.push({rangeName:"gear_mouth_reg",modelMat:this.diveMaskMat,animPhase:this.elapsed,animMode:0,highlightGlow:this.hoveredPartId==="bwraf_air"?.75:.06,castShadow:!0})}if(this.wearingWeightBelt&&this.weightKg>0&&ne.getBoneCharacterAlignedWorldMatrix("hips",this.hipsBoneMat)){const J=(.72+this.weightKg/8*.55)*ne.getTorsoGearScale(),de=this.wearingWetsuit?.92*ne.getFootGearScale()+.08:1.08;re(this.localGearOffMat,0,0,0,0,de,J,de),Ee(this.weightBeltMat,this.hipsBoneMat,this.localGearOffMat),this.drawCalls.push({rangeName:"gear_weight_belt",modelMat:this.weightBeltMat,animPhase:this.elapsed,animMode:0,highlightGlow:0,castShadow:!0})}if(this.wearingMaskAndFins){const J=ne.getFootGearScale();ne.getBoneCharacterAlignedWorldMatrix("leftFoot",this.leftFootBoneMat)&&(re(this.localGearOffMat,0,0,0,0,J),Ee(this.leftFinMat,this.leftFootBoneMat,this.localGearOffMat),this.drawCalls.push({rangeName:me,modelMat:this.leftFinMat,animPhase:this.elapsed,animMode:0,highlightGlow:.06,castShadow:!0})),ne.getBoneCharacterAlignedWorldMatrix("rightFoot",this.rightFootBoneMat)&&(re(this.localGearOffMat,0,0,0,0,J),Ee(this.rightFinMat,this.rightFootBoneMat,this.localGearOffMat),this.drawCalls.push({rangeName:me,modelMat:this.rightFinMat,animPhase:this.elapsed,animMode:0,highlightGlow:.06,castShadow:!0}))}if((this.wearingWetsuit||this.wearingMaskAndFins||this.wearingScubaUnit||this.dcWristGlance||this.pos[1]<5.38)&&ne.getBoneCharacterAlignedWorldMatrix("leftHand",this.leftWristBoneMat)){const J=.96*ne.getTorsoGearScale(),de=w?this.ascentRateMpm>15&&m>1.5?2:this.dcSafetyStopActive?1:0:!D&&this.apneaSec<=8?2:0;re(this.localGearOffMat,-.026*J,0,0,0,J,J,J,.22,0),Ee(this.diveCompMat,this.leftWristBoneMat,this.localGearOffMat),this.drawCalls.push({rangeName:"gear_dive_computer",modelMat:this.diveCompMat,animPhase:de,animMode:0,highlightGlow:this.dcWristGlance?.55:.14,castShadow:!0})}}{const b=this.barPrepTimer>.05&&this.activeBarDrink!=="beer"&&this.activeBarDrink!=="highball";if(b){const B=this.seatedStoolIndex!==null?3.85+this.seatedStoolIndex*1.12:6.09,N=Math.sin(this.elapsed*30);re(this.barShakerMat,B+.08+Math.cos(this.elapsed*18)*.03,7.96+N*.075,27.3,.35,1.08,1.08,1.08,.62+N*.42,.32+Math.cos(this.elapsed*30)*.25)}else re(this.barShakerMat,7.56,7.626,27.24,.25,1.02);if(this.drawCalls.push({rangeName:"prop_cocktail_shaker",modelMat:this.barShakerMat,animPhase:this.elapsed,animMode:0,highlightGlow:b?.65:.08,castShadow:!0}),this.activeBarDrink!==null){const B=Ka[this.activeBarDrink],N=(Y,be,Ce)=>{const Se=Math.max(0,Math.min(1,(Ce-Y)/Math.max(1e-4,be-Y)));return Se*Se*(3-2*Se)},ee=this.barSipTimer>0?Math.max(0,Math.min(1,1-this.barSipTimer/2.85)):1,V=this.barSipTimer>0?N(0,.24,ee)*(1-N(.76,1,ee)):0,pe=this.barSipTimer>0?N(.19,.35,ee)*(1-N(.66,.82,ee)):0,ce=this.barSipTimer>0?N(.24,.72,ee):1,J=this.barSipTimer>0?this.barSipStartFill+(this.barSipTargetFill-this.barSipStartFill)*ce:this.barSipsLeft/3,ue=(B.hasStraw?.13:this.barSipTargetFill>.5?.68:this.barSipTargetFill>.1?.86:1.04)*pe,xe=(Y,be,Ce)=>{const Se=this.activeBarDrink;this.drawCalls.push({rangeName:`prop_drink_${Se}`,modelMat:Y,animPhase:0,animMode:0,highlightGlow:Ce,castShadow:!0}),Se==="highball"&&this.drawCalls.push({rangeName:"prop_drink_highball_ice",modelMat:Y,animPhase:0,animMode:0,highlightGlow:Ce*.45,castShadow:!1,isGlass:!0}),be>.012&&this.drawCalls.push({rangeName:`prop_drink_${Se}_liq`,modelMat:Y,animPhase:be,animMode:5,highlightGlow:Ce*.55,castShadow:!1,isGlass:Se==="highball"}),this.drawCalls.push({rangeName:`prop_drink_${Se}_glass`,modelMat:Y,animPhase:0,animMode:0,highlightGlow:Ce*.45,castShadow:!1,isGlass:!0})};if(this.seatedStoolIndex!==null&&this.barPrepTimer>.12){if(this.activeBarDrink==="beer"){const Y=Math.max(.12,Math.min(1,1-(this.barPrepTimer-.12)/.92));re(this.barCounterDrinkMat,4.22,7.648,27.24,Math.PI,.96,.96,.96,-.14,0),xe(this.barCounterDrinkMat,Y,.45)}else if(this.activeBarDrink==="highball"){const Y=Math.max(.14,Math.min(1,1-(this.barPrepTimer-.12)/.92));re(this.barCounterDrinkMat,7.15,7.648,27.28,Math.PI,.98,.98,.98,-.06,0),xe(this.barCounterDrinkMat,Y,.45)}}else if(this.inspectFocus==="okislot"&&this.barPrepTimer<=.12)or(this.barCounterDrinkMat,10.81,7.028+V*.16,27.08-V*.14,Math.PI,ue*.65,B.spinOffset*V,1.02),xe(this.barCounterDrinkMat,J,this.hoveredPartId==="bar_served_drink"?.92:.22);else if(this.barPrepTimer<=.12){let Y=!1,be=!1,Ce=0,Se=0,Me=0,De=this.diverHeadingYaw,ge=1,ve=this.hoveredPartId==="bar_served_drink";if(this.seatedStoolIndex!==null)Ce=3.85+this.seatedStoolIndex*1.12,Se=7.632,Me=27,De=this.activeBarDrink==="beer"?Math.PI-.52:Math.PI,ge=1.02,Y=!0;else if(this.placedDrinkTableIdx!==null){const ye=_i[this.placedDrinkTableIdx];Ce=ye.x,Se=ye.coasterY,Me=ye.z,De=this.diverHeadingYaw,ge=1.02,Y=!0,this.hoveredPartId===ye.partId&&(ve=!0)}else if(this.activeDiningSeat!==null&&this.barSipTimer>0)Ce=2.92,Se=6.868,Me=16.2,De=this.diverHeadingYaw,ge=.98,Y=!0;else if(this.activePoseStyle==="land_walk"||this.activePoseStyle==="stand_sip"){const ye=Math.cos(this.diverHeadingYaw),Pe=Math.sin(this.diverHeadingYaw),_e=Math.sin(this.hudSwimKickPhase)*.008*this.hudSwimEffort+Math.sin(this.elapsed*2.4)*.004;Ce=this.pos[0]+ye*.12-Pe*.19,Se=this.pos[1]-.21+_e,Me=this.pos[2]-Pe*.12-ye*.19,De=this.diverHeadingYaw,ge=.98,be=!0,Y=!0}if(Y){const ye=be||V>.001?this.diverHeadingYaw:De,Pe=be?B.spinOffset:B.spinOffset*V,_e=Math.cos(ye),Oe=Math.sin(ye),Ge=Math.cos(ue),Je=Math.sin(ue),mt=_e,ht=0,et=-Oe,tt=Oe*Je,ft=Ge,xt=_e*Je,Dt=Oe*Ge,yi=-Je,te=_e*Ge;let Fe=Ce,Ne=Se,at=Me;if(this.cameraMode==="tpv"&&ne.isLoaded()&&V>.004&&ne.getBoneCharacterAlignedWorldMatrix("head",this.headBoneMat)){const Xe=ne.getMaskFit(),ki=Xe.dy+.024*Xe.scale,xi=Xe.dz+.114*Xe.scale,Et=this.headBoneMat[4],Ki=this.headBoneMat[5],Zi=this.headBoneMat[6],Ni=this.headBoneMat[8],it=this.headBoneMat[9],Ys=this.headBoneMat[10],qs=this.headBoneMat[12]+Et*ki+Ni*xi,ji=this.headBoneMat[13]+Ki*ki+it*xi,Oi=this.headBoneMat[14]+Zi*ki+Ys*xi,Gi=qs-ge*(B.mouthH*tt+B.mouthFwd*Dt),Xs=ji-ge*(B.mouthH*ft+B.mouthFwd*yi),Ti=Oi-ge*(B.mouthH*xt+B.mouthFwd*te),$s=be?0:.032*Math.sin(V*Math.PI);Fe=Ce*(1-V)+Gi*V,Ne=Se*(1-V)+Xs*V+$s,at=Me*(1-V)+Ti*V}else this.cameraMode==="fpv"&&V>.004&&(Ne=Se+.14*V,at=Me-.16*V);const li=be?this.barDrinkHandMat:this.barCounterDrinkMat;or(li,Fe,Ne,at,ye,ue,Pe,ge),xe(li,J,ve?.92:V>.1?.36:.2);const Si=this.barSipTimer>0?N(0,.11,ee)*(1-N(.89,1,ee)):0,Ii=be?1:Si;if(this.cameraMode==="tpv"&&ne.isLoaded()&&Ii>.002){const Xe=[Fe+ge*(B.gripRight*mt+B.gripH*tt),Ne+ge*(B.gripRight*ht+B.gripH*ft),at+ge*(B.gripRight*et+B.gripH*xt)];ne.applyRightHandDrinkIK(Xe,ue,Ii)}}}}}const Ae=[.114,0,-.114],Ie=[.064,0,-.064],He=["okislot_stop_l","okislot_stop_c","okislot_stop_r"];for(let b=0;b<2;b=b+1){const B=b===1?11.96:11.18,N=b===this.okiMachineIdx,ee=b===0?"okislot_entry_0":"okislot_entry_1",V=this.hoveredPartId===ee||N&&this.hoveredPartId==="okislot_maxbet"?.65:N&&(this.okiHibiscusLit||this.okiActiveBonus!==null)?.14:.03,pe=N&&(this.okiOneGRenStock>0||this.okiActiveBonus==="big")?1:0;re(this.okiCabinetMats[b],B,7.02,27.32,0,1),this.drawCalls.push({rangeName:"okislot_cabinet",modelMat:this.okiCabinetMats[b],animPhase:pe,animMode:0,highlightGlow:V,castShadow:!0});const ce=N?this.okiActiveBonus==="big"||this.okiOneGRenStock>0||this.okiHibiscusLit&&this.okiHibiscusPattern==="rainbow_heaven"?2:this.okiSideLedHintTimer>0?this.okiSideLedHintCode:this.okiHibiscusLit||this.okiActiveBonus==="reg"?1:0:0;this.drawCalls.push({rangeName:"okislot_side_leds",modelMat:this.okiCabinetMats[b],animPhase:ce,animMode:0,highlightGlow:0,castShadow:!1}),this.drawCalls.push({rangeName:"okislot_glass",modelMat:this.okiCabinetMats[b],animPhase:0,animMode:0,highlightGlow:0,castShadow:!1,isGlass:!0});const[J,de]=this.evalHibiscusLampPhases(N);re(this.okiHibiscusLMats[b],B+.13,7.692,27.137,0,1),this.drawCalls.push({rangeName:"okislot_hibiscus",modelMat:this.okiHibiscusLMats[b],animPhase:J,animMode:0,highlightGlow:0,castShadow:!1}),re(this.okiHibiscusRMats[b],B-.13,7.692,27.137,0,1),this.drawCalls.push({rangeName:"okislot_hibiscus",modelMat:this.okiHibiscusRMats[b],animPhase:de,animMode:0,highlightGlow:0,castShadow:!1});for(let Y=0;Y<3;Y++){const be=N?this.okiReelAngles[Y]:0,Ce=N?this.okiReelBlackout[Y]?.18:this.okiActiveBonus==="big"?3.5:this.okiWinLineFlashTimer>0?2.5:1:1;re(this.okiReelMats[b][Y],B+Ae[Y],7.46,27.292,0,1,1,1,be,0),this.drawCalls.push({rangeName:"okislot_reel_drum",modelMat:this.okiReelMats[b][Y],animPhase:Y*10+Ce,animMode:0,highlightGlow:0,castShadow:!1})}const ue=N&&this.okiLeverAnimTimer>0?-.52*Math.sin((1-this.okiLeverAnimTimer/.26)*Math.PI):0;re(this.okiLeverMats[b],B+.162,7.272,27.076,0,1,1,1,ue,0),this.drawCalls.push({rangeName:"okislot_lever",modelMat:this.okiLeverMats[b],animPhase:0,animMode:0,highlightGlow:N&&this.hoveredPartId==="okislot_lever_part"?.92:.1,castShadow:!0});for(let Y=0;Y<3;Y++){const be=N&&this.okiState==="spinning"&&this.okiReelsStopped[Y],Ce=N?this.okiState==="spinning"?this.okiReelsStopped[Y]?2:1:this.okiHibiscusLit||this.okiActiveBonus!==null?2:0:0;re(this.okiStopBtnMats[b][Y],B+Ie[Y],7.272,27.076+(be?.005:0),0,1),this.drawCalls.push({rangeName:"okislot_stop_btn",modelMat:this.okiStopBtnMats[b][Y],animPhase:Ce,animMode:0,highlightGlow:N&&this.hoveredPartId===He[Y]?.92:.08,castShadow:!1})}const xe=N?this.okiMedals:95;if(xe>0){const Y=Math.max(.45,Math.min(1.14,.45+xe/320*.69));re(this.okiMedalPileMats[b],B,7.07,27.098,0,Y,1,Y),this.drawCalls.push({rangeName:"okislot_medals_pile",modelMat:this.okiMedalPileMats[b],animPhase:0,animMode:0,highlightGlow:N&&this.okiWinLineFlashTimer>0?.5:.1,castShadow:!1})}}const Ue=this.activeLieSpot==="hammock"?Math.sin(this.elapsed*1.25)*.085:Math.sin(this.elapsed*.85)*.022;re(this.hammockMat,-3.1,7.06,20.45,0,1,1,1,Ue,0),this.drawCalls.push({rangeName:"prop_beach_hammock",modelMat:this.hammockMat,animPhase:0,animMode:0,highlightGlow:this.hoveredPartId==="beach_hammock"?.72:.05,castShadow:!0}),this.drawCalls.push({rangeName:"crystal_rock_ice",modelMat:this.staticGlassIdentityMat,animPhase:0,animMode:0,highlightGlow:0,castShadow:!1,isGlass:!0}),this.drawCalls.push({rangeName:"ryukyu_table_glasses",modelMat:this.staticGlassIdentityMat,animPhase:0,animMode:0,highlightGlow:0,castShadow:!1,isGlass:!0}),this.drawCalls.push({rangeName:"zen_campus_glass",modelMat:this.staticGlassIdentityMat,animPhase:0,animMode:0,highlightGlow:0,castShadow:!1,isGlass:!0});const We=this.zenNorthAutoDoorT*this.zenNorthAutoDoorT*(3-2*this.zenNorthAutoDoorT),dt=this.zenSouthAutoDoorT*this.zenSouthAutoDoorT*(3-2*this.zenSouthAutoDoorT),vt=We*.8,st=dt*.8;re(this.zenNorthDoorLMat,-1.6-.415-vt,7.545,47.92,0,1),re(this.zenNorthDoorRMat,-1.6+.415+vt,7.545,47.92,0,1),re(this.zenSouthDoorLMat,1.95-.415-st,7.645,31.8,0,1),re(this.zenSouthDoorRMat,1.95+.415+st,7.645,31.8,0,1);for(const[b,B]of[[this.zenNorthDoorLMat,!1],[this.zenNorthDoorRMat,!1],[this.zenSouthDoorLMat,!0],[this.zenSouthDoorRMat,!0]])this.drawCalls.push({rangeName:"zen_auto_door_frame",modelMat:b,animPhase:0,animMode:0,highlightGlow:0,castShadow:!0}),this.drawCalls.push({rangeName:B?"zen_south_door_glass":"zen_auto_door_glass",modelMat:b,animPhase:0,animMode:0,highlightGlow:0,castShadow:B,isGlass:!B});if(this.getTotalSeafoodStock()>0){const b=this.seafoodStock.lobster<=0&&this.seafoodStock.gurukun<=0&&(this.seafoodStock.akamachi>0||this.seafoodStock.meebai>0||this.seafoodStock.taman>0||this.seafoodStock.irabucha>0||this.seafoodStock.gaara>0);if(re(this.bbqCoolerFishMat,1.56,b?6.555:6.536,20.31,b?Math.PI*.5:.28,.86,.86,.86,0,b?Math.PI*.5:0),this.drawCalls.push({rangeName:this.seafoodStock.lobster>0?"food_lobster_whole":this.seafoodStock.gurukun>0?"food_gurukun_whole":this.seafoodStock.akamachi>0?"food_akamachi_whole":this.seafoodStock.meebai>0?"food_meebai_whole":this.seafoodStock.taman>0?"food_taman_whole":this.seafoodStock.irabucha>0?"food_irabucha_whole":this.seafoodStock.gaara>0?"food_gaara_whole":this.seafoodStock.wagyu>0?"food_wagyu_whole":"food_clam_whole",modelMat:this.bbqCoolerFishMat,animPhase:0,animMode:0,highlightGlow:this.hoveredPartId==="bbq_cooler"?.85:.16,castShadow:!1}),this.seafoodStock.wagyu>0||this.seafoodStock.meebai>0||this.seafoodStock.skewer>0){const B=this.seafoodStock.wagyu>0,N=!B&&this.seafoodStock.skewer>0;re(this.bbqCoolerExtraMat,1.72,B||N?6.536:6.556,20.41,B||N?-.35:Math.PI*.5,.78,.78,.78,0,B||N?0:Math.PI*.5),this.drawCalls.push({rangeName:B?"food_wagyu_whole":N?"food_skewer_whole":"food_meebai_whole",modelMat:this.bbqCoolerExtraMat,animPhase:0,animMode:0,highlightGlow:this.hoveredPartId==="bbq_cooler"?.85:.16,castShadow:!1})}}const bt=2.835,Qe=6.909,St=20.238,Tt=Math.PI*.5,wt=0,nt=1.44;if(this.knifeChopTimer>0){const B=Math.max(0,Math.min(1,1-this.knifeChopTimer/Math.max(.1,this.knifeAnimDuration))),N=te=>{const Fe=Math.max(0,Math.min(1,te));return Fe*Fe*(3-2*Fe)},ee=N(B/.1)*(1-N((B-.9)/.1)),V=Math.max(0,Math.min(1,(B-.09)/.82));let pe=2.775,ce=6.915,J=20.39,de=.25,ue=0,xe=0,Y=.002,be=-.115;switch(this.activeKnifeMode){case"fish_deba":{if(V<.34){const te=V/.34,Fe=Math.sin(te*Math.PI);pe=2.69,ce=6.944-Fe*.048,J=20.392-Fe*.008,de=.28,ue=-.12+Fe*.12,xe=-.08,Y=.002,be=-.068}else{const te=(V-.34)/.66,Fe=N(te/.18),Ne=N(te),at=Math.sin(te*Math.PI*3);pe=2.692+Ne*.208,ce=6.914,J=20.388+at*.022,de=.18+at*.06,ue=0,xe=.12+Fe*1.34,Y=.002,be=-.125}break}case"fish_kazari":{const te=Math.min(2,Math.floor(V*3)),Fe=V*3-te,Ne=N((Fe-.12)/.76),at=Math.sin(Math.max(0,Math.min(1,(Fe-.08)/.84))*Math.PI);pe=2.716+te*.056,ce=6.938-at*.025,J=20.376+Ne*.026,de=.42,ue=.1-Ne*.14,xe=-.32,Y=.003+Ne*.014,be=-.05-Ne*.145;break}case"wagyu_sinew":{const te=Math.min(3,Math.floor(V*4)),Fe=V*4-te,Ne=Math.sin(Fe*Math.PI);pe=2.7+te*.05,ce=6.938-Ne*.036,J=20.362+Math.sin(te*.9)*.006,de=.26,ue=-.56-Ne*.06,xe=.04,Y=.024,be=-.218;break}case"wagyu_slice":{const te=Math.min(3,Math.floor(V*4)),Fe=V*4-te,Ne=N((Fe-.08)/.8),at=Math.sin(Math.max(0,Math.min(1,(Fe-.05)/.88))*Math.PI);pe=2.716+te*.038,ce=6.932-at*.036,J=20.382+Ne*.024,de=.32,ue=.09-Ne*.11,xe=-.18,Y=.002+Ne*.012,be=-.048-Ne*.148;break}case"skewer_chop":{const te=Math.min(3,Math.floor(V*4)),Ne=(V*4-te)*Math.PI*2,at=.5-.5*Math.cos(Ne),li=Math.sin(Ne);pe=2.692+te*.036,ce=6.942-at*.047,J=20.394-li*.022,de=.2,ue=-.22*(1-at),xe=0,Y=.0025,be=-.115;break}case"skewer_star":{const te=V<.5?0:1,Fe=te===0?V*2:(V-.5)*2,Ne=N((Fe-.12)/.76),at=Math.sin(Math.max(0,Math.min(1,(Fe-.08)/.84))*Math.PI);pe=2.859,ce=6.936-at*.02,J=20.366,de=te===0?.08:.98,ue=.06-Ne*.1,xe=-.42,Y=.008,be=-.095-Ne*.075;break}case"clam_pry":{if(V<.66){const te=V/.66,Fe=Math.sin(te*Math.PI*4);pe=2.845-N(te)*.105,ce=6.982,J=20.39+Fe*.006,de=Math.PI*.5-.12+Fe*.04,ue=0,xe=-1.48,Y=.004,be=-.155}else{const te=N((V-.66)/.34);pe=2.74,ce=6.982+te*.01,J=20.39,de=Math.PI*.5-.12,ue=-.06*te,xe=-1.48+te*.62,Y=.004,be=-.155}break}case"clam_shuck":{if(V<.46){const te=N(V/.46);pe=2.835-te*.1,ce=6.916-Math.sin(te*Math.PI)*.008,J=20.39,de=Math.PI*.5-.1,ue=0,xe=-1.38,Y=.003,be=-.145}else{const te=(V-.46)/.54,Fe=te<.5?0:1,Ne=Fe===0?te*2:(te-.5)*2,at=N(Ne);pe=2.755+Fe*.038,ce=6.932-Math.sin(Ne*Math.PI)*.024,J=20.382+at*.02,de=.36,ue=.06-at*.1,xe=-.62,Y=.004,be=-.07-at*.1}break}case"lobster_helm":{if(V<.38){const te=N(V/.38);pe=2.755,ce=6.968-te*.048,J=20.39,de=Math.PI*.5-.06,ue=-.54,xe=0,Y=.02,be=-.195}else{const te=N((V-.38)/.62);pe=2.755-te*.038,ce=6.92-te*.024,J=20.39,de=Math.PI*.5-.06,ue=-.54*(1-te),xe=0,Y=.02*(1-te)+.002*te,be=-.195*(1-te)+-.095*te}break}case"lobster_split":{if(V<.34){const te=N(V/.34);pe=2.765,ce=6.956-te*.042,J=20.39,de=Math.PI*.5-.08,ue=-.46,xe=0,Y=.018,be=-.185}else{const te=N((V-.34)/.66);pe=2.765-te*.062,ce=6.914-te*.018,J=20.39,de=Math.PI*.5-.08,ue=-.46*(1-te),xe=0,Y=.018*(1-te)+.002*te,be=-.185*(1-te)+-.095*te}break}}const Ce=Math.cos(de),Se=Math.sin(de),Me=Math.cos(ue),De=Math.sin(ue),ge=Math.cos(xe),ve=Math.sin(xe),ye=ge*Se*De-Ce*ve,Pe=Me*Se,_e=Me*ge,Oe=-De,Ge=Se*ve+Ce*ge*De,Je=Ce*Me;let mt=pe-(ye*Y*1.12+Pe*be*1.12),ht=ce-(_e*Y*1.12+Oe*be*1.12),et=J-(Ge*Y*1.12+Je*be*1.12);const tt=ht+_e*(.002*1.12)+Oe*(-.03*1.12),ft=ht+_e*(.0265*1.12)+Oe*(-.228*1.12),xt=Math.min(tt,ft);xt<6.8935&&(ht+=6.8935-xt);let Dt=(de-Tt+Math.PI*3)%(Math.PI*2)-Math.PI;Dt<-Math.PI&&(Dt+=Math.PI*2);const yi=Math.sin(ee*Math.PI)*.022;re(this.bbqKnifeMat,bt+(mt-bt)*ee,Qe+(ht-Qe)*ee+yi,St+(et-St)*ee,Tt+Dt*ee,1.12,1.12,1.12,wt+(ue-wt)*ee,nt+(xe-nt)*ee)}else re(this.bbqKnifeMat,bt,Qe,St,Tt,1.12,1.12,1.12,wt,nt);if(this.drawCalls.push({rangeName:"bbq_knife",modelMat:this.bbqKnifeMat,animPhase:0,animMode:0,highlightGlow:this.hoveredPartId==="bbq_board"?.88:.16,castShadow:!0}),this.boardItem){const b=Ve[this.boardItem.kind],B=this.boardItem.kind,N=!this.boardItem.filleted&&(B==="meebai"||B==="irabucha"||B==="taman"||B==="gaara"||B==="akamachi"),ee=!this.boardItem.filleted&&B==="lobster";let V=0,pe=0;if(this.knifeChopTimer>0){const ue=1-this.knifeChopTimer/Math.max(.1,this.knifeAnimDuration),xe=Math.sin(ue*Math.PI);this.activeKnifeMode==="fish_kazari"||this.activeKnifeMode==="wagyu_slice"?pe=Math.sin(ue*Math.PI*6)*.0022*xe:V=Math.sin(ue*Math.PI*8)*.0028*xe}const ce=N?6.924:6.894,J=N?-Math.PI*.5+.05:ee?this.boardItem.cutsDone>=1&&!(this.knifeChopTimer>0&&this.activeKnifeMode==="lobster_helm")?Math.PI*.5+.06:-Math.PI*.5+.06:.06,de=N?Math.PI*.5:0;re(this.bbqBoardFoodMat,2.775+V,ce,20.39+pe,J,this.boardItem.filleted?1.12:1.02,this.boardItem.filleted?1.12:1.02,this.boardItem.filleted?1.12:1.02,0,de),this.drawCalls.push({rangeName:this.boardItem.filleted?b.filletRange:b.wholeRange,modelMat:this.bbqBoardFoodMat,animPhase:0,animMode:0,highlightGlow:this.hoveredPartId==="bbq_board"?.92:.28,castShadow:!0})}const ct=(b,B,N,ee,V,pe,ce,J=.24)=>{const de=V-B,ue=pe-N,xe=ce-ee,Y=Math.hypot(de,ue,xe);Y<.025||(Kt(b,[B,N,ee],[de,ue,xe],1,0),b[8]*=Y,b[9]*=Y,b[10]*=Y,this.drawCalls.push({rangeName:"fishing_line_seg",modelMat:b,animPhase:0,animMode:0,highlightGlow:J,castShadow:!1}))};if(this.fishingPhase==="inactive")Kt(this.fishingPierStandRodMat,[-6.28,6.26,15.85],[.85,.48,-.22],.96,0),this.drawCalls.push({rangeName:"fishing_rod",modelMat:this.fishingPierStandRodMat,animPhase:0,animMode:0,highlightGlow:this.hoveredPartId==="pier_fishing_spot"?.92:.22,castShadow:!0}),re(this.fishingPierStandFloatMat,-6.34,6.18,15.65,0,1.35),this.drawCalls.push({rangeName:"fishing_float",modelMat:this.fishingPierStandFloatMat,animPhase:0,animMode:0,highlightGlow:this.hoveredPartId==="pier_fishing_spot"?.92:.28,castShadow:!0});else{const b=-Math.sin(this.diverHeadingYaw),B=-Math.cos(this.diverHeadingYaw),N=-B,ee=b,V=this.fishingPhase==="fighting";let pe=this.pos[0]+N*.24+b*.34,ce=this.pos[1]+.14,J=this.pos[2]+ee*.24+B*.34;if(this.cameraMode==="tpv"&&ne.isLoaded()){const ge=[0,0,0],ve=[0,0,0];this.fishingPhase==="landed"&&ne.getHandPalmGripCenter("left",ge)?(pe=ge[0],ce=ge[1],J=ge[2]):ne.getHandPalmGripCenter("right",ge)&&(ne.getHandPalmGripCenter("left",ve)?(pe=ge[0]*.72+ve[0]*.28,ce=ge[1]*.72+ve[1]*.28,J=ge[2]*.72+ve[2]*.28):(pe=ge[0],ce=ge[1],J=ge[2]))}const de=Math.sin(this.fishingTwitchAnim*Math.PI);let ue=.28+de*.36,xe=-.06+de*.08;if(this.fishingPhase==="casting"){const ge=Math.min(1,this.fishingPhaseTimer/.56);ue=.22+(ge<.38?Math.sin(ge/.38*Math.PI*.5):Math.max(0,1-(ge-.38)/.24))*1.15-(ge>.4?Math.sin((ge-.4)/.6*Math.PI)*.16:0)}else if(this.fishingPhase==="bite")ue=.08-Math.sin(this.elapsed*22)*.06;else if(this.fishingPhase==="fighting"){const ge=Math.sin(this.elapsed*5.2)*.08;ue=.46+this.fishingTension/100*.2+ge,xe=this.fishingSmoothedRodLean*.44+Math.sin(this.elapsed*7.2)*.06}else this.fishingPhase==="landed"&&(ue=.72,xe=-.35);let Y=b+N*xe,be=ue,Ce=B+ee*xe;this.fishingPhase==="landed"&&(Y=-b*.22-N*.92,be=.48,Ce=-B*.22-ee*.92),Kt(this.fishingRodMat,[pe,ce,J],[Y,be,Ce],1,0),this.drawCalls.push({rangeName:V?"fishing_rod_bent":"fishing_rod",modelMat:this.fishingRodMat,animPhase:0,animMode:0,highlightGlow:V&&this.fishingTension>75?.52:.1,castShadow:!0});const Se=V?.44:.92,Me=V?1.56:1.68,De=this.fishingRodMat;if(this.fishingRodTipWorld[0]=De[4]*Se+De[8]*Me+De[12],this.fishingRodTipWorld[1]=De[5]*Se+De[9]*Me+De[13],this.fishingRodTipWorld[2]=De[6]*Se+De[10]*Me+De[14],this.fishingPhase==="ready"||this.fishingPhase==="casting"){const ge=.5+.5*Math.sin(this.elapsed*3.4),ve=2.15+ge*.35,ye=1.12-ge*.14;if(re(this.fishingTideRingOuterMat,this.fishingTideRipPos[0],5.466,this.fishingTideRipPos[2],this.elapsed*.55,ve,1,ve),this.drawCalls.push({rangeName:"fishing_splash_ring",modelMat:this.fishingTideRingOuterMat,animPhase:0,animMode:0,highlightGlow:.62,castShadow:!1,isGlass:!0}),re(this.fishingTideRingInnerMat,this.fishingTideRipPos[0],5.469,this.fishingTideRipPos[2],-this.elapsed*.85,ye,1,ye),this.drawCalls.push({rangeName:"fishing_splash_ring",modelMat:this.fishingTideRingInnerMat,animPhase:0,animMode:0,highlightGlow:.92,castShadow:!1,isGlass:!0}),this.fishingPhase==="ready"&&this.fishingCastCharging&&this.fishingCastHoldSec>=.08){const Pe=this.fishingCastPower>=this.fishingSweetSpotMinPct&&this.fishingCastPower<=this.fishingSweetSpotMaxPct,_e=Pe?1.25:.82;re(this.fishingCastPreviewMat,this.fishingCastPreviewPos[0],5.472,this.fishingCastPreviewPos[2],this.elapsed*2.4,_e,1,_e),this.drawCalls.push({rangeName:"fishing_splash_ring",modelMat:this.fishingCastPreviewMat,animPhase:0,animMode:0,highlightGlow:Pe?1:.52,castShadow:!1,isGlass:!0})}}if(this.fishingPhase==="ready"){const ge=ni[this.fishingRig].isLure,ve=this.fishingRodTipWorld[0],ye=this.fishingRodTipWorld[1]-.52,Pe=this.fishingRodTipWorld[2];ct(this.fishingLineMatA,this.fishingRodTipWorld[0],this.fishingRodTipWorld[1],this.fishingRodTipWorld[2],ve,ye+.05,Pe,.26);const _e=ge?1.05:1.25;re(this.fishingFloatMat,ve,ye,Pe,0,_e,_e,_e,Math.sin(this.elapsed*2.4)*.08,Math.cos(this.elapsed*2.1)*.08),this.drawCalls.push({rangeName:"fishing_float",modelMat:this.fishingFloatMat,animPhase:0,animMode:0,highlightGlow:ge?.55:.25,castShadow:!1})}else if(this.fishingPhase==="landed"){const ge=Gt[this.fishingTargetKind];let ve=this.pos[0]+b*.44-N*.12,ye=this.pos[1]+.08,Pe=this.pos[2]+B*.44-ee*.12;const _e=[0,0,0];this.cameraMode==="tpv"&&ne.isLoaded()&&ne.getHandPalmGripCenter("right",_e)&&(ve=_e[0]+b*.11-N*.09,ye=_e[1]-.07,Pe=_e[2]+B*.11-ee*.09);const Oe=ge.swimScale*(.8+this.fishingTargetCm/ge.maxCm*.34),Ge=Math.min(1.52,Oe);Kt(this.fishingFishMat,[ve,ye,Pe],[N,.22,ee],Ge,0),this.drawCalls.push({rangeName:ge.swimRange,modelMat:this.fishingFishMat,animPhase:this.elapsed*7.5,animMode:2,highlightGlow:.44,castShadow:!0})}else{const ge=ni[this.fishingRig].isLure,ve=this.fishingFloatPos[0],ye=this.fishingFloatPos[1],Pe=this.fishingFloatPos[2],_e=this.fishingPhase==="bite"||this.fishingPhase==="fighting"?.36*Math.sin(this.elapsed*16):.06*Math.sin(this.elapsed*2.8)+de*.28,Oe=ge?1.15:1.45;re(this.fishingFloatMat,ve,ye,Pe,0,Oe,Oe,Oe,_e,_e*.7),this.drawCalls.push({rangeName:"fishing_float",modelMat:this.fishingFloatMat,animPhase:0,animMode:0,highlightGlow:this.fishingPhase==="bite"?.96:ge?.58:.32,castShadow:!1});const Ge=this.fishingRodTipWorld[0],Je=this.fishingRodTipWorld[1],mt=this.fishingRodTipWorld[2];if(this.fishingPhase==="bite"||this.fishingPhase==="fighting"||this.fishingTwitchAnim>.2){const et=this.fishingTension>75?.92:.4;ct(this.fishingLineMatA,Ge,Je,mt,ve,ye+.08,Pe,et)}else{const et=(Ge+ve)*.5,tt=(Je+ye+.08)*.5-.24,ft=(mt+Pe)*.5;ct(this.fishingLineMatA,Ge,Je,mt,et,tt,ft,.25),ct(this.fishingLineMatB,et,tt,ft,ve,ye+.08,Pe,.25)}if(this.fishingPhase==="waiting"||this.fishingPhase==="nibble"){for(let et=0;et<3;et++){const tt=this.fishingStalkers[et],ft=Gt[tt.kind],xt=ft.swimScale*(.82+tt.cm/ft.maxCm*.36);Kt(tt.mat,tt.pos,tt.dir,xt,0),this.drawCalls.push({rangeName:ft.swimRange,modelMat:tt.mat,animPhase:this.elapsed*5.8+et*1.9,animMode:2,highlightGlow:et===0&&this.fishingPhase==="nibble"?.38:.18,castShadow:!0})}ct(this.fishingLineLeaderMat,ve,ye-.06,Pe,ve,Math.max(4.85,ye-.52),Pe,.2)}else if(this.fishingPhase==="bite"||this.fishingPhase==="fighting"){const et=Gt[this.fishingTargetKind],tt=et.swimScale*(.85+this.fishingTargetCm/et.maxCm*.35),ft=this.fishingPhase==="fighting"?Math.sin(this.elapsed*18)*.45:0;if(Kt(this.fishingFishMat,this.fishingFishPos,this.fishingFishDir,tt,ft),this.drawCalls.push({rangeName:et.swimRange,modelMat:this.fishingFishMat,animPhase:this.elapsed*(this.fishingPhase==="fighting"?15:8.5),animMode:2,highlightGlow:this.fishingPhase==="fighting"?.52:.36,castShadow:!0}),ct(this.fishingLineLeaderMat,ve,ye-.06,Pe,this.fishingFishPos[0],this.fishingFishPos[1],this.fishingFishPos[2],.28),this.fishingPhase==="fighting"){const xt=(this.fishingSurgeDuration>0?1.55:.95)+Math.sin(this.elapsed*14)*.22;re(this.fishingWakeMat,this.fishingFishPos[0],5.466,this.fishingFishPos[2],this.elapsed*3.8,xt,1,xt),this.drawCalls.push({rangeName:"fishing_splash_ring",modelMat:this.fishingWakeMat,animPhase:0,animMode:0,highlightGlow:this.fishingSurgeDuration>0?.65:.34,castShadow:!1,isGlass:!0})}}}if(this.fishingSplashTimer>0){const ge=1-this.fishingSplashTimer/.55,ve=.65+ge*2.4;re(this.fishingSplashMat,this.fishingSplashPos[0],5.465,this.fishingSplashPos[2],ge*1.4,ve,1,ve),this.drawCalls.push({rangeName:"fishing_splash_ring",modelMat:this.fishingSplashMat,animPhase:0,animMode:0,highlightGlow:.35,castShadow:!1,isGlass:!0})}}const rt=[3.4,3.64,3.88],ut=["bbq_grill_0","bbq_grill_1","bbq_grill_2"];for(let b=0;b<3;b++){const B=this.grillSlots[b];if(!B)continue;const N=rt[b],ee=B.flipAnimTimer>0?1-B.flipAnimTimer/.48:0,V=B.flipAnimTimer>0?Math.sin(ee*Math.PI)*.16:0,pe=B.flipAnimTimer>0?ee*Math.PI:0,ce=Math.sin(this.elapsed*32+b*2.1)*.0018,J=B.flipped?Math.max(B.sideADoneness*.95,B.sideBDoneness):B.sideADoneness*.85;re(this.bbqGrillFoodMats[b],N,6.876+V+ce,20.35,.05*(b-1),1.14,1.14,1.14,0,pe),this.drawCalls.push({rangeName:Ve[B.kind].filletRange,modelMat:this.bbqGrillFoodMats[b],animPhase:J,animMode:0,highlightGlow:this.hoveredPartId===ut[b]?.92:.22,castShadow:!0});const de=(this.elapsed*.65+b*.37)%1,ue=.68+de*.72;re(this.bbqSmokeMats[b],N+Math.sin(this.elapsed*1.8+b)*.03,6.89+de*.36,20.35,this.elapsed*.6+b,ue),this.drawCalls.push({rangeName:"bbq_smoke_puff",modelMat:this.bbqSmokeMats[b],animPhase:0,animMode:0,highlightGlow:0,castShadow:!1,isGlass:!0})}if(this.tongsActionTimer>0&&this.tongsActionSlot>=0&&this.tongsActionSlot<3){const b=Math.sin((1-this.tongsActionTimer/.48)*Math.PI),B=4.14*(1-b)+rt[this.tongsActionSlot]*b;re(this.bbqTongsMat,B,6.89+b*.14,20.44,.18,1.08,1.08,1.08,-.36*b,0)}else re(this.bbqTongsMat,4.14,6.866,20.36,.1,1.06);this.drawCalls.push({rangeName:"bbq_tongs",modelMat:this.bbqTongsMat,animPhase:0,animMode:0,highlightGlow:.14,castShadow:!0});const Mt=[[.008,.022,.16],[-.036,.048,-.32],[.044,-.012,.48],[-.006,.028,.82]];for(let b=0;b<Math.min(4,this.platedItems.length);b++){const B=this.platedItems[b],[N,ee,V]=Mt[b],pe=B.quality==="charred"?1.95:B.quality==="sashimi"?0:.68;re(this.bbqPlateFoodMats[b],2.16+N,6.881+b*.018,20.3+ee,V,1.04),this.drawCalls.push({rangeName:Ve[B.kind].filletRange,modelMat:this.bbqPlateFoodMats[b],animPhase:pe,animMode:0,highlightGlow:this.hoveredPartId==="bbq_plate"?.95:.28,castShadow:!0}),re(this.bbqDiningPlateFoodMats[b],2.6+N*1.12,6.886+b*.018,15.85+ee*1.12,V,1.1),this.drawCalls.push({rangeName:Ve[B.kind].filletRange,modelMat:this.bbqDiningPlateFoodMats[b],animPhase:pe,animMode:0,highlightGlow:this.hoveredPartId==="bbq_dining_plate"?.95:.28,castShadow:!0})}{const b=this.bbqPairingDrink,B=this.bbqPairingSipsLeft/3,N=this.bbqPairingSipAnimTimer>0?Math.sin((1-this.bbqPairingSipAnimTimer/.65)*Math.PI):0;for(const[ee,V,pe,ce,J]of[[this.bbqPairingDrinkMat,2.46,20.55,"bbq_pairing_drink",b==="beer"?-Math.PI*.34:.25],[this.bbqDiningDrinkMat,2.92,16.2,"bbq_dining_drink",b==="beer"?Math.PI*.68:-.35]]){if(ce==="bbq_dining_drink"&&this.activeDiningSeat!==null&&this.barSipTimer>0)continue;const de=this.hoveredPartId===ce?.92:.18;re(ee,V,6.868+N*.085,pe,J,.98,.98,.98,N*.22,0),this.drawCalls.push({rangeName:`prop_drink_${b}`,modelMat:ee,animPhase:0,animMode:0,highlightGlow:de,castShadow:!0}),b==="highball"&&this.drawCalls.push({rangeName:"prop_drink_highball_ice",modelMat:ee,animPhase:0,animMode:0,highlightGlow:de*.45,castShadow:!1,isGlass:!0}),B>.012&&this.drawCalls.push({rangeName:`prop_drink_${b}_liq`,modelMat:ee,animPhase:B,animMode:5,highlightGlow:de*.55,castShadow:!1,isGlass:b==="highball"}),this.drawCalls.push({rangeName:`prop_drink_${b}_glass`,modelMat:ee,animPhase:0,animMode:0,highlightGlow:de*.45,castShadow:!1,isGlass:!0})}}if(this.bbqEatTimer>1.88&&this.cameraMode==="tpv"&&ne.isLoaded()){const b=[0,0,0];if(ne.getHandPalmGripCenter("right",b)){const B=Math.min(1,(this.bbqEatTimer-1.88)/.28)*.82;re(this.bbqHandFoodMat,b[0],b[1]-.015,b[2],this.diverHeadingYaw,B),this.drawCalls.push({rangeName:Ve[this.lastEatenKind].filletRange,modelMat:this.bbqHandFoodMat,animPhase:this.lastEatenSashimi?0:.66,animMode:0,highlightGlow:.35,castShadow:!0})}}if(this.cameraMode==="tpv"&&ne.isLoaded())this.activePoseStyle==="swim"&&ne.getRightHandSalvageHookMatrix(this.hookMat,.54)&&this.drawCalls.push({rangeName:"fp_scrap_hook",modelMat:this.hookMat,animPhase:this.elapsed,animMode:0,highlightGlow:this.unlockedUpgrades.titanium_hook?.35:0,castShadow:!0});else if(this.pos[1]<5.35&&!this.surfaceTreading&&this.faunaObserveAgentId===null){const b=Math.sin(this.elapsed*3.2)*.018*(1+Math.hypot(this.vel[0],this.vel[2])*.25),B=Math.sin(this.hookSwingPhase)*.16,N=-i*t,ee=1-t*t,V=-s*t;if(this.wearingScubaUnit&&this.gearSteps.reg_first_stage){const be=[this.pos[0]+i*.42-o*.28+N*(-.18+b),this.pos[1]+t*.42+ee*(-.18+b),this.pos[2]+s*.42-l*.28+V*(-.18+b)];Kt(this.regHosesMat,be,this.lookDir,.85,.12),this.drawCalls.push({rangeName:"gear_reg_hoses",modelMat:this.regHosesMat,animPhase:this.elapsed,animMode:0,highlightGlow:.12,castShadow:!1})}const pe=[this.pos[0]+i*(.64+B)+o*.3+N*(-.26+b),this.pos[1]+t*(.64+B)+ee*(-.26+b),this.pos[2]+s*(.64+B)+l*.3+V*(-.26+b)];Kt(this.hookMat,pe,this.lookDir,.92,-.25+B*1.4),this.drawCalls.push({rangeName:"fp_scrap_hook",modelMat:this.hookMat,animPhase:this.elapsed,animMode:0,highlightGlow:this.unlockedUpgrades.titanium_hook?.35:0,castShadow:!1});const ce=this.dcFpvWristBlend,J=.52*(1-ce)+.36*ce,de=-.24*(1-ce)+-.1*ce,ue=(-.23+b*.7)*(1-ce)+(-.07+b*.3)*ce,xe=[this.pos[0]+i*J+o*de+N*ue,this.pos[1]+.18+t*J+ee*ue,this.pos[2]+s*J+l*de+V*ue];Kt(this.fpvDiveCompMat,xe,this.lookDir,2.35+ce*.55,.25),re(this.localGearOffMat,0,0,0,Math.PI*.5,1,1,1,0,-.78-ce*.28),Ee(this.fpvDiveCompMat,this.fpvDiveCompMat,this.localGearOffMat);const Y=w?this.ascentRateMpm>15&&m>1.5?2:this.dcSafetyStopActive?1:0:!D&&this.apneaSec<=8?2:0;this.drawCalls.push({rangeName:"gear_dive_computer",modelMat:this.fpvDiveCompMat,animPhase:Y,animMode:0,highlightGlow:.28+ce*.35,castShadow:!1})}this.engine.setDiveFlashlight(this.flashlightOn,this.pos,this.lookDir),this.engine.setDynamicWorldEntities(this.drawCalls),this.update3dHoverPicking(),this.emitSnapshot(Z,oe)}raySphereDist(e,i,t,s,a,r){const n=e[0]-t,o=e[1]-s,l=e[2]-a,h=n*i[0]+o*i[1]+l*i[2],c=n*n+o*o+l*l-r*r,u=h*h-c;if(u<0)return-1;const g=-h-Math.sqrt(u);return g>=0?g:-1}update3dHoverPicking(){if(this.hoveredPartId=null,this.hoveredPartHud=null,this.lastMouseClientX<0||this.lastMouseClientY<0||document.pointerLockElement===this.engine.getCanvas()||!this.engine.screenToWorldRay(this.lastMouseClientX,this.lastMouseClientY,this.rayOriginTmp,this.rayDirTmp))return;const e=[],i=this.isWorkbenchFocus();if(this.inspectFocus==="buddy_bwraf"&&this.wearingScubaUnit)e.push({id:"bwraf_bcd",x:this.bcdVestMat[12],y:this.bcdVestMat[13]+.04,z:this.bcdVestMat[14],r:.2,title:"[B] BCD パワーインフレーター",hint:"クリックで給排気＆水面浮力チェック",tone:this.bwrafSteps.b?"ok":"action"},{id:"bwraf_weights",x:this.pos[0],y:this.pos[1]-.08,z:this.pos[2],r:.19,title:"[W] ウエイトベルト＆右手リリース",hint:`クリックで ${this.weightKg}kg 装着・右手外し診断`,tone:this.bwrafSteps.w?"ok":this.wearingWeightBelt?"action":"warn"},{id:"bwraf_releases",x:this.wornCamBandMat[12],y:this.wornCamBandMat[13],z:this.wornCamBandMat[14],r:.18,title:"[R] 全バックル＆カムバンド固定",hint:"クリックで胸・腰・肩・タンク固定診断",tone:this.bwrafSteps.r?"ok":this.camBuckleLocked?"action":"warn"},{id:"bwraf_air",x:this.wbSpgConsoleMat[12],y:this.wbSpgConsoleMat[13],z:this.wbSpgConsoleMat[14],r:.14,title:`[A] 3D残圧計 (${Math.round(this.smoothedSpgNeedleBar)} bar) ＆吸気テスト`,hint:"クリックで呼吸テスト（半開きバルブ検知！）",tone:this.bwrafSteps.a?"ok":this.valveTurns>=2.2?"action":"warn"});else if(!this.wearingScubaUnit&&(i||Math.hypot(this.pos[0]- -4.3,this.pos[2]-26.5)<4.5))if(!i)e.push({id:"club_workbench",x:-4.45,y:7.48,z:27.42,r:.62,title:"🔧 3D器材セッティング作業台",hint:"クリック（またはEキー）で手元クローズアップ操作へ！",tone:this.gearSteps.valve_open?"ok":"action"});else{if(!this.wearingMaskAndFins){if(this.inspectFocus==="wb_rinse")e.push({id:"club_rinse_tank",x:-8.8,y:7.26,z:30.18,r:.65,priority:4,title:this.maskDefogged?"💧 真水器材洗い槽（マスク水すすぎ完了◎）":"💧 真水器材洗い槽（曇り止め後の水すすぎ）",hint:"クリックで3Dマスクを真水にくぐらせて水すすぎ完了！",tone:this.maskDefogged?"ok":"action"});else if(e.push({id:"wb_dive_mask",x:-3.64,y:7.3,z:27.02,r:.145,priority:this.lpiConnected&&!this.maskDefogged?4:2,title:this.maskDefogged?"🤿 3Dダイブマスク（曇り止め＆水すすぎ済◎）":this.maskGelApplied?"🧴 3Dダイブマスク（曇り止め塗布済・真水ですすごう！）":"🤿 作業台上の3Dダイブマスク＆シュノーケル",hint:this.maskGelApplied?"クリックで真水洗い槽へ運んでサッと水すすぎ！":"クリックでレンズ内側に曇り止めジェルを塗り込む！",tone:this.maskDefogged?"ok":"action"}),!this.wearingWetsuit&&!this.dcWristGlance){const r=this.getGasInfo();e.push({id:"wb_dive_computer",x:-3.4,y:7.28,z:27.14,r:.095,priority:3,title:`⌚ 3Dダイブコンピューター（現在ガス: ${r.label} · MOD ${r.modM}m）`,hint:"クリックで呼吸ガス切替（AIR 21% ⇄ ナイトロックス EAN32 / EAN36）",tone:this.dcGasMix==="air21"?"action":"ok"})}}this.regPlacedOnValve||e.push({id:"valve_oring",x:this.wbOringMat[12],y:this.wbOringMat[13],z:this.wbOringMat[14],r:.068,priority:this.oringCondition!=="clean_seated"&&this.valveBlownOut?4:2,title:this.oringCondition==="clean_seated"?"⭕ Kバルブ Oリング（新品・傷なし◎）":"⚠️ Kバルブ Oリング（塩粒＆傷はみ出しあり！）",hint:"クリックでOリング溝を清掃＆新品Oリング装着",tone:this.oringCondition==="clean_seated"?"ok":"warn"}),e.push({id:"valve_wheel",x:this.wbValveWheelMat[12],y:this.wbValveWheelMat[13],z:this.wbValveWheelMat[14],r:.085,priority:3,title:`🎛️ タンクKバルブノブ（${this.valveTurns.toFixed(2)} / 3.00 回転）`,hint:this.regPlacedOnValve?"左右ドラッグで回転開閉 ／ クリックで開栓・閉栓":"クリックで0.5秒ゴミ飛ばしブロー噴射！",tone:this.valveTurns>=2.4?"ok":"action"},{id:"tank_stamp",x:-4.72,y:7.76,z:27.45,r:.085,priority:this.tankStampVerified?2:4,title:"🔍 タンク肩部・耐圧検査刻印プレート",hint:"クリックで刻印（DOT-3AL80 · 2026.08 · 200bar）確認",tone:this.tankStampVerified?"ok":"action"},{id:"spg_console",x:this.wbSpgConsoleMat[12],y:this.wbSpgConsoleMat[13],z:this.wbSpgConsoleMat[14],r:.105,priority:2,title:this.spgFaceDown?"📟 3Dアナログ残圧計（ガラス面伏せ安全状態）":`📟 3Dアナログ残圧計（現在指示: ${Math.round(this.smoothedSpgNeedleBar)} bar）`,hint:"クリックでガラス面を伏せる ⇄ 表に返して残圧確認",tone:this.smoothedSpgNeedleBar>=180?"ok":"action"},{id:"purge_reg",x:this.wbPurgeRegMat[12],y:this.wbPurgeRegMat[13],z:this.wbPurgeRegMat[14],r:.095,priority:2,title:"🔘 メイン2ndレギュレーター＆黄色パージボタン",hint:"クリック：吸気＆針振れテスト ／ 長押し：パージ噴射・残圧抜き",tone:this.airFlowVerified?"ok":"action"}),this.bcdPlacedOnTank?e.push({id:"cam_lever",x:this.wbCamLeverMat[12],y:this.wbCamLeverMat[13],z:this.wbCamLeverMat[14],r:.098,priority:3,title:this.camBuckleLocked?"🔒 タンク・カムバックルレバー（2段階ロック済◎）":"🔓 タンク・カムバックルレバー（未ロック！）",hint:"クリックで濡れベルト引き締め＆レバーをパチンと倒す",tone:this.camBuckleLocked?"ok":"warn"},{id:"lpi_coupler",x:this.wbLpiCouplerMat[12],y:this.wbLpiCouplerMat[13],z:this.wbLpiCouplerMat[14],r:.09,priority:3,title:this.lpiConnected?"🔌 BCD中圧（LPI）カプラー（カチッと接続済◎）":"🔌 BCD中圧（LPI）クイックカプラー（未接続）",hint:"クリックでスリーブを引いてインフレーターへ接続／解除",tone:this.lpiConnected?"ok":"action"},{id:"bcd_body",x:this.clubMountedBcdMat[12],y:this.clubMountedBcdMat[13],z:this.clubMountedBcdMat[14],r:.18,priority:0,title:`🦺 タンク装着BCD（向き誤差 ${Math.round(this.bcdAzimuthDeg)}° / 高さ ${this.bcdHeightCm>=0?"+":""}${this.bcdHeightCm.toFixed(1)}cm）`,hint:"クリックで正面＆肩ラインにピタッと揃える（ドラッグで自由調整）",tone:Math.abs(this.bcdAzimuthDeg)<=22&&Math.abs(this.bcdHeightCm)<=3?"ok":"warn"}):e.push({id:"bcd_body",x:this.clubLooseBcdMat[12],y:this.clubLooseBcdMat[13],z:this.clubLooseBcdMat[14],r:.25,priority:1,title:"🦺 作業台上のBCDジャケット",hint:"クリックでタンクの上からカムバンドを通す！",tone:"action"}),this.regPlacedOnValve?e.push({id:"yoke_screw",x:this.wbYokeScrewMat[12],y:this.wbYokeScrewMat[13],z:this.wbYokeScrewMat[14],r:.08,priority:this.regOrientationReversed?2:4,title:this.lineBar>5?`⛔ ヨークスクリュー（${Math.round(this.lineBar)}bar 高圧ロック中）`:`🔩 ヨークT字スクリュー（締付 ${Math.round(this.yokeScrewPct)}%）`,hint:"クリック（または左右ドラッグ）で指2本の手締め（76%適正）",tone:this.yokeScrewPct>=62&&this.yokeScrewPct<=90?"ok":"warn"},{id:"reg_1st",x:this.wbReg1stMat[12],y:this.wbReg1stMat[13],z:this.wbReg1stMat[14]-.024,r:.084,priority:this.regOrientationReversed?4:1,title:this.regOrientationReversed?"⚠️ レギュ1stステージ（左右逆向き！左＝レギュになっている）":"✅ レギュ1stステージ（右＝レギュ＆オクト ／ 左＝残圧計＆LPI）",hint:this.regOrientationReversed?"クリックで180°反転して正しい左右向きに直す！":"クリックでバルブから取り外す（要・減圧＆ネジ緩め）",tone:this.regOrientationReversed?"warn":"ok"}):e.push({id:"dust_cap",x:this.wbDustCapMat[12],y:this.wbDustCapMat[13],z:this.wbDustCapMat[14],r:this.dustCapRemoved?.056:.096,priority:this.dustCapRemoved?2:4,title:this.dustCapRemoved?"🎩 ダストキャップ（取り外し済）":"🎩 1stステージ防水ダストキャップ（装着中）",hint:this.dustCapRemoved?"クリックで水洗い用にダストキャップを閉める":"クリックで黒いダストキャップを外す！",tone:this.dustCapRemoved?"ok":"action"},{id:"reg_1st",x:this.wbReg1stMat[12]-.015,y:this.wbReg1stMat[13]-.02,z:this.wbReg1stMat[14]+.05,r:.135,priority:1,title:"🔧 作業台上のレギュレーター1stステージ",hint:this.dustCapRemoved?"クリックでタンクのKバルブにヨークを被せる！":"手前の黒いダストキャップを外してからバルブに被せよう！",tone:this.dustCapRemoved?"action":"warn"})}if(!i&&this.pos[1]>5.8&&this.pos[2]>22){e.push({id:"club_rinse_tank",x:-8.8,y:7.15,z:30.2,r:.72,title:this.maskDefogged?"💧 真水器材洗い槽（マスク曇り止め済◎ ／ ダイブ後の塩抜き）":"💧 真水器材洗い槽（マスク曇り止め＆水すすぎ）",hint:"クリックでマスクの曇り止め水洗い／器材の真水洗浄！",tone:this.maskDefogged?"ok":"action"}),this.wearingWetsuit&&this.suitVariant==="kerama_5mm"||e.push({id:"suit_rack_kerama",x:-2.55,y:8.15,z:30.85,r:.36,title:"🖤 5mm 慶良間フルウェットスーツ（黒×シアン）",hint:"クリックでラックから取って着用！（適正ウエイト 4kg）",tone:"action"}),this.wearingWetsuit&&this.suitVariant==="hibiscus_3mm"||e.push({id:"suit_rack_hibiscus",x:-1.9,y:8.18,z:30.85,r:.36,title:"🌺 3mm トロピカルスーツ（紺×コーラルピンク）",hint:"クリックでラックから取って着用！（適正ウエイト 3kg）",tone:"action"}),this.wearingWetsuit&&this.suitVariant==="pro_gold"||e.push({id:"suit_rack_gold",x:-1.25,y:8.15,z:30.85,r:.36,title:"⚡ 5mm プロステルススーツ（黒×ゴールド）",hint:"クリックでラックから取って着用！（適正ウエイト 4kg）",tone:"action"});const r=["bar_stool_0","bar_stool_1","bar_stool_2","bar_stool_3","bar_stool_4","bar_stool_5"];if(this.inspectFocus!=="bar_bottles")for(let n=0;n<6;n++)this.seatedStoolIndex!==n&&e.push({id:r[n],x:3.85+n*1.12,y:7.22,z:26.32,r:.28,title:`🪑 CHURA BAR カウンター席 #${n+1}（本革クッションスツール）`,hint:"クリック（または近くでEキー）でこの席に腰掛ける！",tone:"action"});if(this.seatedStoolIndex!==null&&this.activeBarDrink!==null&&this.barPrepTimer<=.12&&this.barSipTimer<=.15){const n=3.85+this.seatedStoolIndex*1.12;e.push({id:"bar_served_drink",x:n,y:7.73,z:27,r:.14,title:this.barSipsLeft>0?`🍹 提供中のグラス（中身 ${this.barSipsLeft}/3）`:"🥂 空になったグラス（中身 0/3 · おかわりOK！）",hint:this.barSipsLeft>0?"クリック（または Space キー）でグラスを口に運んで 1/3 飲む！":"クリック（または Space キー）でもう一杯満タン（3/3）注いでもらう！",tone:this.barSipsLeft>0?"ok":"action"})}if(e.push({id:"bar_tap_tower",x:4.22,y:7.98,z:27.32,r:.24,title:"🍺 CHURA DRAFT 3連生ビールサーバー",hint:"クリックでキンキンの『アイランド生ドラフト（3/3 満タン）』を注ぐ！",tone:"ok"},{id:"bar_bottle_rum",x:4.78,y:7.84,z:27.5,r:.14,title:"🍾 CORAL CANE RUM（沖縄熟成スパイスドラム）",hint:"クリックでトロピカルラムベースの『🥭 マンゴーコラーダ』を注文！",tone:"action"},{id:"bar_bottle_mango",x:5.16,y:7.84,z:27.5,r:.14,title:"🍾 MANGO & PASSION（やんばる完熟マンゴーリキュール）",hint:"クリックで『🥭 完熟マンゴー・ピニャコラーダ（素潜り60秒）』を注文！",tone:"action"},{id:"bar_bottle_mint",x:5.54,y:7.84,z:27.5,r:.14,title:"🍾 ISLAND MINT RUM（フレッシュモヒート・リザーブ）",hint:"クリックで『🍋 美ら海シークヮーサーモヒート（エア消費-10%）』を注文！",tone:"action"},{id:"bar_bottle_gin",x:5.92,y:7.84,z:27.5,r:.14,title:"🍾 CHURA GIN（ハイビスカス＆シークヮーサー・クラフトジン）",hint:"クリックで『🌺 サンセット・ハイビスカスフィズ』を注文！",tone:"action"},{id:"bar_bottle_curacao",x:6.3,y:7.84,z:27.5,r:.14,title:"🍾 KERAMA BLUE CURAÇAO（慶良間ブルー・アイランドキュラソー）",hint:"クリックでこのボトルから『🌊 慶良間ブルーラグーン』をシェイク注文！",tone:"action"},{id:"bar_bottle_awamori",x:6.68,y:7.84,z:27.5,r:.14,title:"🍶 琉球泡盛 古酒（黒釉金龍ボトル）",hint:"クリックで手吹き琉球グラスの『🥃 琉球泡盛 古酒ロック（3/3）』を注文！",tone:"ok"},{id:"bar_bottle_whisky",x:7.06,y:7.86,z:27.46,r:.16,title:"🥃 亀甲カット樽熟成ウイスキー＆強炭酸ハイボールタワー",hint:"クリックでかち割りロックアイス満載の『極上・強炭酸ハイボール（3/3）』を注ぐ！",tone:"ok"},{id:"bar_menu_stand",x:4.92,y:7.78,z:27.2,r:.2,title:"📋 CHURA BAR イラストカクテルメニュー",hint:this.seatedStoolIndex===null?"クリックでカウンター席に座ってカクテルを選ぶ！":"クリックでクラフト酒瓶の超拡大鑑賞モード ⇄ 切替！",tone:"action"},{id:"bar_menu_stand",x:8.62,y:7.78,z:27.2,r:.2,title:"📋 CHURA BAR イラストカクテルメニュー",hint:this.seatedStoolIndex===null?"クリックでカウンター席に座ってカクテルを選ぶ！":"クリックでクラフト酒瓶の超拡大鑑賞モード ⇄ 切替！",tone:"action"}),this.inspectFocus==="okislot"){const n=this.okiMachineIdx===1?11.96:11.18,o=this.okiMachineIdx===1?0:1,l=o===1?11.96:11.18;e.push({id:"okislot_maxbet",x:n+.124,y:7.315,z:27.108,r:.044,priority:5,title:`🪙 30Φ MAX BET ボタン（CREDIT ${this.okiCredit}/50）`,hint:"クリックで3枚BET（または Space で自動MAX BET＋レバー始動）！",tone:this.okiState==="idle"?"action":"ok"},{id:"okislot_lever_part",x:n+.162,y:7.272,z:27.028,r:.048,priority:6,title:"🕹️ スタートレバー（79.6RPMステッピング始動・華が光ればボーナス確定！）",hint:"クリック（または Space）でレバーON！遅れ・無音・消灯演出にも注目！",tone:this.okiState==="idle"?"action":"ok"},{id:"okislot_stop_l",x:n+.064,y:7.272,z:27.06,r:.036,priority:6,title:`🛑 左ストップボタン（中段: ${this.getOkiSymbolLabelAt(0,this.okiReelStops[0])}）`,hint:this.okiState==="spinning"&&!this.okiReelsStopped[0]?"クリック（または 1 / Space）で左リール停止！（⬛BAR目安でチェリー＆スイカフォロー）":"回転中に押すと最大4コマスベリ制御で停止するよ",tone:this.okiState==="spinning"&&!this.okiReelsStopped[0]?"action":"ok"},{id:"okislot_stop_c",x:n,y:7.272,z:27.06,r:.036,priority:6,title:`🛑 中ストップボタン（中段: ${this.getOkiSymbolLabelAt(1,this.okiReelStops[1])}）`,hint:this.okiState==="spinning"&&!this.okiReelsStopped[1]?"クリック（または 2 / Space）で中リール停止！":"回転中に押すと中リールが停止するよ",tone:this.okiState==="spinning"&&!this.okiReelsStopped[1]?"action":"ok"},{id:"okislot_stop_r",x:n-.064,y:7.272,z:27.06,r:.036,priority:6,title:`🛑 右ストップボタン（中段: ${this.getOkiSymbolLabelAt(2,this.okiReelStops[2])}）`,hint:this.okiState==="spinning"&&!this.okiReelsStopped[2]?"クリック（または 3 / Space）で右リール停止！":"回転中に押すと右リールが停止するよ",tone:this.okiState==="spinning"&&!this.okiReelsStopped[2]?"action":"ok"},{id:o===0?"okislot_entry_0":"okislot_entry_1",x:l,y:7.46,z:27.14,r:.24,priority:1,title:`🌺 隣の沖スロ『華閃光 BLACK-30（${o+1}番台）』`,hint:"クリックで隣の台へ移動して打つ！",tone:"action"}),this.activeBarDrink!==null&&this.barPrepTimer<=.12&&this.barSipTimer<=.15&&e.push({id:"bar_served_drink",x:10.81,y:7.12,z:27.08,r:.12,priority:4,title:this.barSipsLeft>0?`🍹 サイドコースターのグラス（中身 ${this.barSipsLeft}/3）`:"🥂 空になったグラス（クリックでおかわり！）",hint:"クリック（または Fキー）で沖スロを打ちながらグイッと一口飲む！",tone:this.barSipsLeft>0?"ok":"action"})}else e.push({id:"okislot_entry_0",x:11.18,y:7.46,z:27.14,r:.38,priority:3,title:"🌺 30Φ沖スロ『華閃光 BLACK-30（1番台）』完全告知ハイビスカス機",hint:"クリック（または近くでEキー）で席に座って遊技スタート！華が光ればボーナス確定♪",tone:this.okiHibiscusLit&&this.okiMachineIdx===0?"ok":"action"},{id:"okislot_entry_1",x:11.96,y:7.46,z:27.14,r:.38,priority:3,title:"🌺 30Φ沖スロ『華閃光 BLACK-30（2番台）』完全告知ハイビスカス機",hint:"クリック（または近くでEキー）で2番台に座って遊技スタート！",tone:this.okiHibiscusLit&&this.okiMachineIdx===1?"ok":"action"})}if(!i&&this.fishingPhase==="inactive"&&this.pos[1]>5.5&&this.pos[2]>=10.5&&this.pos[2]<=23&&e.push({id:"pier_fishing_spot",x:-6.3,y:6.42,z:15.75,r:.62,priority:3,title:"🎣 沖縄桟橋・海釣りタックル（カーボン釣竿＆赤白ウキ）",hint:"クリック（または Kキー）で『イラブチャー・タマン・ガーラ・ミーバイ・アカマチ・グルクン』釣りを開始！",tone:"action"}),this.inspectFocus==="bbq_station"||!i&&this.pos[1]>5.4&&this.pos[2]>16.5){const r=this.getTotalSeafoodStock();e.push({id:"bbq_cooler",x:1.62,y:6.48,z:20.35,r:.32,priority:!this.boardItem&&this.inspectFocus==="bbq_station"?4:2,title:r>0?`🧊 ロックアイスクーラー（石垣牛・海鮮ストック ${r}品）`:"🧊 ロックアイスクーラー（空・クリックで贅沢補充！）",hint:r>0?"クリックで特選石垣牛A5ステーキ・イセエビ・地魚を木曽檜まな板へ取り出す！":"クリックで石垣牛・アグー豚串・朝獲れ魚介を補充！",tone:r>0?"action":"warn"},{id:"bbq_board",x:2.81,y:6.93,z:20.36,r:.27,priority:this.boardItem?4:3,title:this.boardItem?this.boardItem.filleted?`✨ ${Ve[this.boardItem.kind].filletName}（仕込み完了！）`:`🔪 ${Ve[this.boardItem.kind].name}（包丁仕込み ${this.boardItem.cutsDone}/${this.boardItem.cutsNeeded}）`:"🔪 木曽檜まな板 ＆ 堺打刃物・和包丁（食材待ち）",hint:this.boardItem?this.boardItem.filleted?"クリックで備長炭の焼き網に乗せてジュワッと焼き上げる！":"クリックで和包丁を振るって三枚おろし・飾り包丁・極厚ステーキカット！":"クリックでクーラーから特選食材を取り出して乗せる！",tone:this.boardItem?.filleted?"ok":"action"},{id:"bbq_plate",x:2.16,y:6.91,z:20.3,r:.22,priority:this.platedItems.length>0?5:2,title:this.platedItems.length>0?`🍽️ 壺屋焼やちむん大皿：焼きたて『${Ve[this.platedItems[this.platedItems.length-1].kind].grillName}』(${this.platedItems.length}皿)`:"🍽️ 壺屋焼やちむん大皿（大葉・大根おろし・半切りシークヮーサー添え）",hint:this.platedItems.length>0?"クリック（または Space）でアツアツの炭火焼きをビールと一緒に堪能！😋🍺":"炭火で焼けたステーキや海鮮をクリックするとここに盛り付けられるよ！",tone:this.platedItems.length>0?"ok":"action"},{id:"bbq_pairing_drink",x:2.46,y:6.95,z:20.55,r:.135,priority:5,title:this.bbqPairingDrink==="beer"?this.bbqPairingSipsLeft>0?`🍺 極冷・7:3神泡アイランド生ビール（残り ${this.bbqPairingSipsLeft}/3）`:"🍺 空ジョッキ（クリックで極冷・神泡生ビールをおかわり！）":this.bbqPairingSipsLeft>0?`🥃 かち割りロックアイス強炭酸ハイボール（残り ${this.bbqPairingSipsLeft}/3）`:"🥃 空タンブラー（クリックで強炭酸ハイボールをおかわり！）",hint:this.bbqPairingSipsLeft>0?"クリックで炭火BBQの煙と潮風の中でキンッキンの一杯をグビッと飲む！🍻":"クリックで氷点下ジョッキに満タン（3/3）注ぎ直す！",tone:this.bbqPairingSipsLeft>0?"ok":"action"});const n=["bbq_grill_0","bbq_grill_1","bbq_grill_2"],o=[3.4,3.64,3.88];for(let l=0;l<3;l++){const h=this.grillSlots[l],c=h!==null&&(h.flipped&&h.sideBDoneness>=.36&&h.sideADoneness>=.32||h.sideADoneness+h.sideBDoneness>=.88),u=h!==null&&Math.max(h.sideADoneness,h.sideBDoneness)>=1.85;e.push({id:n[l],x:o[l],y:6.9,z:20.35,r:.145,priority:h?4:2,title:h?u?`💨 ${Ve[h.kind].name}（焼きすぎ・焦げ！）`:c?`🍖 ${Ve[h.kind].grillName}（黄金色の食べ頃！◎）`:!h.flipped&&h.sideADoneness>=.36?`🥢 ${Ve[h.kind].name}（片面こんがり！裏返し時）`:`🔥 ${Ve[h.kind].name}（炭火でジュワジュワ焼き中…）`:`🔥 備長炭グリル焼き網 #${l+1}（空き枠）`,hint:h?c||u?"クリックで3Dトングを使って白磁皿へ盛り付ける！🍽️":"クリックで3Dトングを使ってクルッと裏返す！🥢":this.boardItem?.filleted?"クリックでさばいた魚介をこの焼き網に乗せる！":"まな板でさばいた魚介をここで炭火焼きにできるよ！",tone:u?"warn":c?"ok":"action"})}if(this.inspectFocus!=="bbq_station"){e.push({id:"beach_daybed_1",x:5.65,y:6.16,z:19.55,r:.62,title:this.activeLieSpot==="daybed_1"?"🛌 ビーチ・デイベッド #1（寝転びチルアウト中♪）":"🛌 パラソル下のビーチ・デイベッド #1",hint:this.activeLieSpot==="daybed_1"?"クリック（または WASD / Esc）で起き上がる":"クリック（または近くでEキー）でゴロンと横になって海を眺める！",tone:this.activeLieSpot==="daybed_1"?"ok":"action"},{id:"beach_daybed_2",x:7.75,y:6.16,z:19.55,r:.62,title:this.activeLieSpot==="daybed_2"?"🛌 ビーチ・デイベッド #2（寝転びチルアウト中♪）":"🛌 パラソル下のビーチ・デイベッド #2",hint:this.activeLieSpot==="daybed_2"?"クリック（または WASD / Esc）で起き上がる":"クリック（または近くでEキー）でゴロンと横になってチルアウト！",tone:this.activeLieSpot==="daybed_2"?"ok":"action"},{id:"beach_hammock",x:-3.1,y:6.56,z:20.45,r:.68,title:this.activeLieSpot==="hammock"?"🌴 ヤシの木の編み込みハンモック（潮風に揺られ中♪）":"🌴 ヤシの木の編み込みロープハンモック",hint:this.activeLieSpot==="hammock"?"クリック（または WASD / Esc）でハンモックから降りる":"クリック（または近くでEキー）でハンモックに寝転んで揺られる！",tone:this.activeLieSpot==="hammock"?"ok":"action"},{id:"beach_cinema",x:4.88,y:7.34,z:21.48,r:.78,title:"🎬 ビーチ・チルアウトシアター（3Dボード投影）",hint:"クリックでリモコンを開いてこの3DスクリーンにYouTube映像＆音楽を投影！",tone:"action"},{id:"beach_speaker",x:.76,y:6.75,z:21.38,r:.34,title:"🔊 ビーチ・チルアウトスピーカー（YouTube音楽再生）",hint:"クリックでYouTube URLを入力して音楽＆動画を再生！",tone:"action"},{id:"bbq_dining_plate",x:2.6,y:6.91,z:15.85,r:.32,priority:this.platedItems.length>0?5:3,title:this.platedItems.length>0?`🍽️ 水上ダイニング大皿（焼きたて料理 ${this.platedItems.length}品！）`:"🍽️ 水上リゾートダイニング・メインテーブル",hint:this.platedItems.length>0?"クリック（またはSpace）でオーシャンビュー特等席に座って焼きたてを実食！":"クリックでオーシャンビュー特等席に着席！炭火で焼いた料理もここに運ばれるよ♪",tone:this.platedItems.length>0?"ok":"action"},{id:"bbq_dining_drink",x:2.92,y:6.96,z:16.2,r:.18,priority:4,title:this.bbqPairingDrink==="beer"?`🍺 水上ダイニング・7:3神泡生ビール (${this.bbqPairingSipsLeft}/3)`:`🥃 水上ダイニング・ロックアイス強炭酸ハイボール (${this.bbqPairingSipsLeft}/3)`,hint:this.bbqPairingSipsLeft>0?"クリック（またはFキー）で海を眺めながらキンッキンの一杯をグビッと飲む！":"クリックで満タンにおかわり注ぎたて！",tone:"ok"});for(const l of Lt){const h=this.activeDiningSeat===l.idx;e.push({id:l.partId,x:l.x,y:l.seatTopY+.14,z:l.z,r:.42,priority:h?4:3,title:h?`🪑 ${l.label}（着席ディナー中♪）`:`🪑 ${l.label}`,hint:h?"クリック（または WASD / E）で席から立ち上がる":"クリック（または近くでEキー）でリゾートチェアに座って海と食事を楽しむ！",tone:h?"ok":"action"})}for(const l of _i){const h=this.activeBarDrink!==null&&this.placedDrinkTableIdx===l.idx,c=this.activeBarDrink!==null&&this.placedDrinkTableIdx===null&&this.seatedStoolIndex===null;e.push({id:l.partId,x:l.x,y:l.coasterY+.08,z:l.z,r:.36,priority:h?4:3,title:h?this.barSipsLeft>0?`🍹 ${l.label}（中身 ${this.barSipsLeft}/3）`:`🥂 ${l.label}（空グラス・クリックでおかわり！）`:`🍸 ${l.label}（真鍮テーブルランプ＆コースター）`,hint:h?this.barSipsLeft>0?"クリック（または Fキー）でグラスを手に持って1/3ずつ飲む！":"クリックで冷たいドリンクをおかわり（3/3）する！":c?"クリックで手に持っているグラスをこのミニテーブルに置く！":"クリックで冷えたトロピカルカクテル・生ビールをここにサーブ！",tone:h?"ok":"action"})}}}(this.pos[2]>32.5||this.inspectFocus==="zen_caption")&&e.push({id:"zen_museum_caption",x:-1.6,y:7.76,z:36.62,r:.92,priority:3,title:this.inspectFocus==="zen_caption"?"🖼️ 展示キャプション『ZEN大学 逗子／南島校舎』（正面鑑賞中）":"🖼️ 展示キャプション『ZEN大学 逗子／南島校舎』",hint:this.inspectFocus==="zen_caption"?"クリック（または WASD / Esc）でギャラリー歩行に戻る":"クリックで美術館の展示解説パネルを正面クローズアップで読む！",tone:"ok"});let t=null,s=999,a=-999;for(const r of e){const n=this.raySphereDist(this.rayOriginTmp,this.rayDirTmp,r.x,r.y,r.z,r.r);if(n>0&&n<9.5){const o=r.priority??0;(o>a||o===a&&n<s)&&(a=o,s=n,t=r)}}if(t){this.hoveredPartId=t.id;const[r,n,o]=this.engine.projectWorldToScreen([t.x,t.y,t.z]);this.hoveredPartHud={id:t.id,title:t.title,actionHint:t.hint,statusTone:t.tone,screenU:o>0?Math.max(.12,Math.min(.88,r)):.5,screenV:o>0?Math.max(.1,Math.min(.86,1-n)):.45}}}syncCameraAndVrm(e){const i=Math.hypot(this.vel[0],this.vel[1],this.vel[2]),t=Math.hypot(this.vel[0],this.vel[2]),s=this.keys.has("KeyW")||this.keys.has("KeyA")||this.keys.has("KeyS")||this.keys.has("KeyD")||this.keys.has("Space")||this.keys.has("ShiftLeft")||this.keys.has("ShiftRight")||this.keys.has("KeyC")||this.keys.has("KeyQ"),a=this.keys.has("KeyW")||this.keys.has("KeyA")||this.keys.has("KeyS")||this.keys.has("KeyD"),r=this.activePoseStyle==="land_walk"&&a&&(this.keys.has("ShiftLeft")||this.keys.has("ShiftRight")),n=this.activePoseStyle==="swim"?this.faunaObserveAgentId!==null?1.85:s?i:t>.38?t:0:this.activePoseStyle==="land_walk"?r&&t>.65?Math.max(t,6.1):t:i,o=this.activePoseStyle==="swim"?Math.max(0,Math.min(1,(n-.16)/3.8)):0,l=o>this.hudSwimEffort?3.6:2.6;if(this.hudSwimEffort+=(o-this.hudSwimEffort)*(1-Math.exp(-l*e)),this.hudSwimKickPhase=(this.hudSwimKickPhase+(.45+this.hudSwimEffort*3.15)*e)%(Math.PI*2),this.entryMode===null&&this.inspectFocus==="none"&&this.fishingPhase==="inactive"){if(this.cameraMode==="fpv")this.diverHeadingYaw=this.yaw;else if(this.hasMoveHeadingInput){let y=(this.moveHeadingTargetYaw-this.diverHeadingYaw+Math.PI*3)%(Math.PI*2)-Math.PI;y<-Math.PI&&(y+=Math.PI*2),this.diverHeadingYaw+=y*(1-Math.exp(-12*e))}}const h=this.isWorkbenchFocus(),c=this.inspectFocus==="bar_bottles",u=this.inspectFocus==="okislot",g=this.inspectFocus==="bbq_station",p=this.inspectFocus==="zen_caption",x=this.activeLieSpot!==null||this.activePoseStyle==="beach_lie"||this.activePoseStyle==="hammock_lie",S=this.cameraMode==="tpv"||x,T=this.wearingWetsuit?this.suitVariant==="hibiscus_3mm"?2:this.suitVariant==="pro_gold"?3:1:0,k=this.barSipTimer>0?Math.max(0,Math.min(1,1-this.barSipTimer/2.85)):0,m=this.bbqEatTimer>0?Math.sin((1-this.bbqEatTimer/3.1)*Math.PI):0,A=this.knifeChopTimer>0?Math.max(0,Math.min(1,1-this.knifeChopTimer/Math.max(.1,this.knifeAnimDuration))):0,D=this.activePoseStyle==="bar_sip"||this.activePoseStyle==="stand_sip"?k:this.activePoseStyle==="bbq_chop"?A:this.activePoseStyle==="bbq_eat"||this.activePoseStyle==="dining_eat"?Math.max(0,Math.min(1,m*1.32)):this.activePoseStyle==="fish_cast"?Math.max(0,Math.min(1,this.fishingPhaseTimer/.56)):this.activePoseStyle==="fish_fight"?Math.max(0,Math.min(1,this.fishingTension/100)):this.activePoseStyle==="fish_idle"?this.fishingPhase==="bite"?1:this.fishingPhase==="nibble"?.45:0:this.hookSwingPhase;this.activeBarDrink!==null&&this.engine.getVrmAvatar().setDrinkHasStraw(Ka[this.activeBarDrink].hasStraw),this.engine.getVrmAvatar().setEmotionContext({tipsyLevel:Math.min(1,this.tipsyGlowSec/12),savorLevel:Math.min(1,this.savorGlowSec/10),catchJoyLevel:Math.min(1,this.catchJoySec/8),eatDislike:this.lastEatenCharred&&this.bbqEatTimer>0,fishingCounterOk:this.fishingPhase==="fighting"&&this.fishingSwimDir!==0&&this.getEffectiveRodLeanDir()===-this.fishingSwimDir,okiBonusLit:this.okiHibiscusLit||this.okiActiveBonus!==null}),this.engine.getVrmAvatar().setFishingMotionState(this.fishingPhase!=="inactive"?this.fishingSmoothedRodLean:0,this.fishingPhase!=="inactive"?this.fishingTwitchAnim:0),this.engine.updateVrmDiverState(S&&!h&&!c&&!u&&!g&&!p,!0,this.pos,this.diverHeadingYaw,this.curBodyTrimDeg,n,D,this.activePoseStyle,T);const I=this.engine.getVrmAvatar(),W=I.getBoneWorldMatrix("head",this.headBoneMat),w=this.surfaceTreading||this.pos[1]>Ot+.16||this.entryMode!==null;if(this.inspectFocus!=="none"){this.inspectFocus==="buddy_bwraf"&&(this.inspectTarget[0]=this.pos[0],this.inspectTarget[1]=this.pos[1]-.88+I.getRestChestHeight(),this.inspectTarget[2]=this.pos[2]);const y=Math.cos(this.inspectOrbitPitch),M=this.inspectTarget[0]+y*Math.sin(this.inspectOrbitYaw)*this.inspectDist,P=this.inspectTarget[2]-y*Math.cos(this.inspectOrbitYaw)*this.inspectDist,U=this.inspectFocus==="zen_caption"?Math.max(36.98,Math.min(48.2,P)):Math.min(31.05,P),E=M>=-5.38&&M<=-2.32&&U>=26.68&&U<=28.12?7.3:this.inspectFocus==="bbq_station"?6.45:6.88,_=Math.max(E,this.inspectTarget[1]-Math.sin(this.inspectOrbitPitch)*this.inspectDist),H=this.isWorkbenchFocus()||this.inspectFocus==="buddy_bwraf"||this.inspectFocus==="bbq_station"?.16*this.inspectDist:0,G=this.inspectTarget[0]+Math.cos(this.inspectOrbitYaw)*H,Q=this.inspectTarget[1],se=this.inspectTarget[2]+Math.sin(this.inspectOrbitYaw)*H,X=1-Math.exp(-11*e);this.inspectCamBlend<.02&&(this.curInspectCamPos[0]=this.camPosOut[0],this.curInspectCamPos[1]=this.camPosOut[1],this.curInspectCamPos[2]=this.camPosOut[2],this.curInspectCamTarget[0]=G,this.curInspectCamTarget[1]=Q,this.curInspectCamTarget[2]=se),this.inspectCamBlend=Math.min(1,this.inspectCamBlend+e*4),this.curInspectCamPos[0]+=(M-this.curInspectCamPos[0])*X,this.curInspectCamPos[1]+=(_-this.curInspectCamPos[1])*X,this.curInspectCamPos[2]+=(U-this.curInspectCamPos[2])*X,this.curInspectCamTarget[0]+=(G-this.curInspectCamTarget[0])*X,this.curInspectCamTarget[1]+=(Q-this.curInspectCamTarget[1])*X,this.curInspectCamTarget[2]+=(se-this.curInspectCamTarget[2])*X;const Z=this.curInspectCamTarget[0]-this.curInspectCamPos[0],ae=this.curInspectCamTarget[1]-this.curInspectCamPos[1],ie=this.curInspectCamTarget[2]-this.curInspectCamPos[2],R=Math.hypot(Z,ae,ie)||1;this.camPosOut[0]=this.curInspectCamPos[0],this.camPosOut[1]=this.curInspectCamPos[1],this.camPosOut[2]=this.curInspectCamPos[2],this.camDirOut[0]=Z/R,this.camDirOut[1]=ae/R,this.camDirOut[2]=ie/R,this.engine.setFreeSwimPose(this.camPosOut,this.camDirOut,this.bubbleOriginOut,!1);return}if(this.inspectCamBlend=0,S){const y=this.activePoseStyle==="hammock_lie"?this.pos[0]+.08:this.pos[0],M=this.activePoseStyle==="beach_lie"?this.pos[1]+.4:this.activePoseStyle==="hammock_lie"?this.pos[1]+.36:this.pos[1]-.88+I.getRestChestHeight()+(w?.12:.03),P=this.activePoseStyle==="beach_lie"?this.pos[2]-.12:this.pos[2],U=x?Math.max(1.65,this.tpvDistance):this.tpvDistance;let L=y-this.lookDir[0]*U,E=M-this.lookDir[1]*U,_=P-this.lookDir[2]*U;P<31.7&&_>31.15&&_<32.6&&Math.abs(L)<13&&!(y>1.28&&y<2.62)&&(_=31.15);const H=this.getClubhouseAndPierFloorY(L,_),G=this.isOverBoatDeck(L,_)?6.28:-999,Q=H>0?H-.91+.26:-999,se=this.activePoseStyle==="beach_lie"?6.44:this.activePoseStyle==="hammock_lie"?6.68:-999,X=Math.max(this.getTerrainY(L,_)+.26,G,Q,se);if(E<X){E=X;const oe=E-M,he=Math.max(.76,Math.sqrt(Math.max(0,U*U-oe*oe))),me=Math.hypot(L-y,_-P);if(me<he){const ne=me>1e-4?(L-y)/me:Math.sin(this.yaw),Le=me>1e-4?(_-P)/me:Math.cos(this.yaw);L=y+ne*he,_=P+Le*he}}w?this.surfaceTreading?E>5.24&&E<5.68&&(E=this.pitch>.18?5.24:5.68):E>5.26&&E<5.68&&(E=5.68):E>5.26&&(E=5.26),this.worldAsset&&(this.worldAsset.collider.clipCameraRay(y,M+.08,P,L,E,_,this.camPosOut,.2),L=this.camPosOut[0],E=this.camPosOut[1],_=this.camPosOut[2]);const Z=x?M-.14:M,ae=y-L,ie=Z-E,R=P-_,K=Math.hypot(ae,ie,R)||1;this.camPosOut[0]=L,this.camPosOut[1]=E,this.camPosOut[2]=_,this.camDirOut[0]=ae/K,this.camDirOut[1]=ie/K,this.camDirOut[2]=R/K,W?(this.bubbleOriginOut[0]=this.headBoneMat[12],this.bubbleOriginOut[1]=this.headBoneMat[13]+.06,this.bubbleOriginOut[2]=this.headBoneMat[14]):(this.bubbleOriginOut[0]=this.pos[0],this.bubbleOriginOut[1]=this.pos[1]+.25,this.bubbleOriginOut[2]=this.pos[2]),this.engine.setFreeSwimPose(this.camPosOut,this.camDirOut,this.bubbleOriginOut,!1)}else{if((this.activePoseStyle==="beach_lie"||this.activePoseStyle==="hammock_lie")&&W)this.camPosOut[0]=this.headBoneMat[12],this.camPosOut[1]=this.headBoneMat[13]+.12,this.camPosOut[2]=this.headBoneMat[14];else{const y=this.activePoseStyle==="land_walk"?-Math.abs(Math.sin(I.getWalkCyclePhase()))*Math.min(1,t/2.2)*(.008+.013*I.getWalkDashBlend()):0;this.camPosOut[0]=this.pos[0],this.camPosOut[1]=this.pos[1]+(this.activePoseStyle==="land_walk"||this.activePoseStyle==="surface_tread"?.52:.18)+y,this.camPosOut[2]=this.pos[2]}this.camPosOut[1]>5.28&&this.camPosOut[1]<5.62&&(this.camPosOut[1]=w?5.65:5.26),this.camDirOut[0]=this.lookDir[0],this.camDirOut[1]=this.lookDir[1],this.camDirOut[2]=this.lookDir[2],this.engine.setFreeSwimPose(this.camPosOut,this.camDirOut,void 0,this.wearingMaskAndFins&&this.camPosOut[1]<=5.45)}}collectLootNode(e){if(e.collected=!0,e.respawnTimer=45,this.totalCollected++,e.kind==="chest")this.inventory.scrap+=3,this.inventory.copper+=2,this.inventory.iron+=2,this.inventory.pearl+=1,this.seafoodStock.lobster+=1,this.audio.playItemPickup(!0),this.showToast("🧰 沈没宝箱を回収！ スクラップ+3 / 銅+2 / 鉄+2 / 黒真珠+1 ＆ 琉球イセエビ+1 ゲット！");else if(e.kind==="pearl")this.inventory.pearl+=1,this.seafoodStock.shellfish+=1,this.audio.playItemPickup(!0),this.showToast("🦪 オオシャコガイから『黒真珠 +1』＆ BBQ用『シャコガイの身 +1』を採集したよ！");else if(e.kind==="irabucha"||e.kind==="taman"||e.kind==="gaara"||e.kind==="meebai"||e.kind==="akamachi"||e.kind==="shellfish"||e.kind==="lobster")this.seafoodStock[e.kind]+=1,this.audio.playItemPickup(!0),this.showToast(`🐟 海の幸『${Ve[e.kind].name} +1』（所持 ${this.seafoodStock[e.kind]}）をゲット！ビーチBBQでさばいて炭火焼きにしよう！`);else{const i=e.kind==="scrap"||e.kind==="seaweed"?2:1;this.inventory[e.kind]+=i,this.audio.playItemPickup(!1),this.showToast(`🪝 『${ri[e.kind].name} +${i}』をフックで採集！`)}}showToast(e){this.pickupToast=e,this.pickupToastTimer=3.8}detectZoneName(e){return this.pos[2]>=31.82&&this.pos[1]>=5.5?this.pos[2]>=48?"🎓 ZEN大学 逗子／南島サンクチュアリ校舎・正面広場":this.pos[2]>=36.2&&Math.abs(this.pos[0])<=14.7||this.pos[0]>=.35&&this.pos[0]<=3.55?this.pos[0]>=7.8?"🎓 ZEN大学 1F・無人オンライン授業配信スタジオ":this.pos[0]<=-5.2?"🎓 ZEN大学 1F・無人セミナールーム＆ライブラリー":"🎓 ZEN大学 1F・エントランスロビー＆連絡自動ドア":"🌴 ZEN大学 南庭園テラス ⇔ 南の島バカンス海岸遊歩道":this.pos[2]>=32.4&&this.pos[1]<5.5?"島の裏側（北岸）・エメラルド珊瑚礁ラグーン":this.pos[2]>=23.2&&Math.abs(this.pos[0])<=13.5&&this.pos[1]>=6.2?this.inspectFocus==="okislot"||this.pos[0]>=10.4?"CHURA BAR『30Φ沖スロ・華閃光 BLACK-30』コーナー":this.pos[0]>=1.5?"クラブハウス『CHURA BAR』オーシャンカウンター":"沖縄ビーチ・ダイビングクラブハウス（セッティング場）":this.pos[0]>=-8.5&&this.pos[0]<=-6&&this.pos[2]>=11&&this.pos[2]<23.2&&this.pos[1]>=5.8?"クラブハウス連絡・木製桟橋":this.isOverBoatDeck(this.pos[0],this.pos[2])&&this.pos[1]>=5.6?"沖縄ダイビングボート・デッキ":this.pos[2]>18.5&&this.pos[1]>5.4?this.pos[0]>=1.2&&this.pos[0]<=4.6?"沖縄ビーチ・炭火BBQ＆チルアウトデッキ":this.pos[0]<=-1.4&&this.pos[0]>=-5.2?"沖縄ビーチ・ヤシの木ハンモックエリア":"沖縄・白砂ビーチ（デイベッド＆パラソルエリア）":this.pos[2]>14.5?"沖縄ビーチ浅瀬・サーフゾーン":Math.hypot(this.pos[0]- -9.5,this.pos[2]-9.5)<7?"ダイビングボート周辺・白砂礁":Math.hypot(this.pos[0]-10.5,this.pos[2]-10.5)<7?"木製ラフト浅瀬・白砂サンゴ洲":Math.hypot(this.pos[0]-13.5,this.pos[2]- -5.5)<8.5?"石垣・マンタクリーニングの根":Math.hypot(this.pos[0]- -14.5,this.pos[2]- -5.5)<7.5?"宮古ブルー・海底ロックアーチ":this.pos[2]<-12||e>11.2?"沈没木造船・ディープトレンチ":"慶良間サンゴ庭園・白砂水路"}computeSonarHint(){if(!this.unlockedUpgrades.treasure_sonar)return null;let e=null,i=999;for(const s of this.lootNodes){if(s.collected||s.kind!=="chest"&&s.kind!=="pearl")continue;const a=Math.hypot(s.pos[0]-this.pos[0],s.pos[1]-this.pos[1],s.pos[2]-this.pos[2]);a<i&&(i=a,e=s)}return e?`📡 レアソナー反応：『${e.kind==="chest"?"沈没宝箱":"オオシャコガイ真珠"}』まで残り ${i.toFixed(1)}m（水深 ${Math.max(.5,5.45-e.pos[1]).toFixed(1)}m）`:"📡 ソナー：全レア宝箱＆シャコガイ回収済！"}getUpgradeRecipes(){return[{id:"swim_fins",name:"高速スイムフィン",desc:"水中遊泳スピード +48% アップ",costs:{seaweed:2,clay:1}},{id:"titanium_hook",name:"強化チタンスクラップフック",desc:"海底資源のフック採集スピード 2.2倍",costs:{scrap:3,copper:1}},{id:"scuba_tank",name:"大容量スキューバ酸素タンク",desc:"最大潜水タイム 75秒 → 180秒 に大幅延長",costs:{scrap:3,copper:2,iron:1}},{id:"dive_light",name:"大光量・水中ヘッドライト (L)",desc:"深場の色吸収を照らし出す高演色ダイブライト",costs:{scrap:2,copper:1}},{id:"treasure_sonar",name:"美ら海レアソナー探知機",desc:"未回収の沈没宝箱＆黒真珠までの距離と水深を表示",costs:{iron:2,pearl:1}}].map(i=>{const t=this.unlockedUpgrades[i.id];let s=!t;for(const[a,r]of Object.entries(i.costs))(this.inventory[a]??0)<r&&(s=!1);return{...i,unlocked:t,canAfford:s}})}computeGuidedSetupStep(){const e=(t,s,a,r,n,o,l,h,c)=>{let u=.62,g=.42,p=!1;const x=this.isWorkbenchFocus()||this.inspectFocus==="buddy_bwraf";if(h&&c&&x){const[S,T,k]=this.engine.projectWorldToScreen(c);k>0&&S>.24&&S<.96&&T>.06&&T<.94&&(u=S,g=1-T,p=!0)}return{phaseIndex:t,stepBadge:s,instruction:a,buttonLabel:r,recommendedTab:n,recommendedStation:o,targetPartId:l,pinLabel:h,pinScreenU:u,pinScreenV:g,pinVisible:p}};return this.tankStampVerified?!this.valveBlownOut&&!this.regPlacedOnValve?e(1,"① タンク点検 (2/3)","バルブノブをクリックして0.5秒ブロー噴射！吹き出し口の塩粒や水滴を飛ばそう","💨 ② 0.5秒ゴミ飛ばしブロー噴射","gear","wb_valve","valve_wheel","👇 ここをクリック：0.5秒ブロー噴射",[this.wbValveWheelMat[12],this.wbValveWheelMat[13]+.03,this.wbValveWheelMat[14]]):this.oringCondition!=="clean_seated"?e(1,"① タンク点検 (3/3)","バルブ口のOリングに塩と傷があるよ！クリックして溝を拭き新品Oリングを装着しよう","⭕ ③ Oリングを清掃＆新品装着","gear","wb_valve","valve_oring","👇 ここをクリック：新品Oリング交換",[this.wbOringMat[12],this.wbOringMat[13]+.03,this.wbOringMat[14]]):this.bcdPlacedOnTank?Math.abs(this.bcdAzimuthDeg)>22||Math.abs(this.bcdHeightCm)>3?e(1,"② BCD固定 (2/3)","BCDをクリック（またはドラッグ）して、バルブ穴正面(0°)＆肩ライン(0cm)に揃えよう","📐 ② バルブ正面＆肩ラインに揃える","gear","wb_bcd","bcd_body","👇 クリック／ドラッグ：正面＆高さ揃え",[this.clubMountedBcdMat[12],this.clubMountedBcdMat[13]+.12,this.clubMountedBcdMat[14]]):this.camBuckleLocked?!this.dustCapRemoved&&!this.regPlacedOnValve?e(1,"③ 1stステージ (1/4)","レギュ1stステージに付いている黒い防水ダストキャップをクリックして外そう","🎩 ① 黒いダストキャップを外す","gear","wb_reg","dust_cap","👇 ここをクリック：ダストキャップを外す",[this.wbDustCapMat[12],this.wbDustCapMat[13]+.04,this.wbDustCapMat[14]]):this.regPlacedOnValve?this.regOrientationReversed?e(1,"③ 1stステージ (3/4)","ホースが左右逆！1stステージをクリックして『右＝レギュ／左＝残圧計＆LPI』に直そう","🔄 ③ ホースの左右向きを正しく反転","gear","wb_reg","reg_1st","👇 ここをクリック：正しい左右向きへ反転",[this.wbReg1stMat[12],this.wbReg1stMat[13]+.05,this.wbReg1stMat[14]]):this.yokeScrewPct<62||this.yokeScrewPct>90?e(1,"③ 1stステージ (4/4)","T字ヨークネジをクリック（または左右ドラッグ）して『指2本の手締め(76%)』にしよう","🔩 ④ ヨークネジを指2本手締め(76%)","gear","wb_reg","yoke_screw","👇 クリック／ドラッグ：指2本手締め",[this.wbYokeScrewMat[12],this.wbYokeScrewMat[13]+.04,this.wbYokeScrewMat[14]]):this.lpiConnected?this.maskDefogged?!this.spgFaceDown&&this.valveTurns<.2?e(1,"⑤ 開栓＆確認 (1/3)","200気圧を開ける前に、万一の破損から目を守るため3D残圧計(SPG)を下向きに伏せよう","📟 ① 残圧計を下向きに伏せる","gear","wb_spg","spg_console","👇 ここをクリック：残圧計を伏せる",[this.wbSpgConsoleMat[12],this.wbSpgConsoleMat[13]+.06,this.wbSpgConsoleMat[14]]):this.valveTurns<2.4?e(1,"⑤ 開栓＆確認 (2/3)","上のバルブノブをクリック（またはドラッグ）して全開（3.0回転）まで開けよう","🔓 ② タンクバルブを全開(3.0回)にする","gear","wb_spg","valve_wheel","👇 クリック／ドラッグ：バルブ全開へ",[this.wbValveWheelMat[12],this.wbValveWheelMat[13]+.04,this.wbValveWheelMat[14]]):this.airFlowVerified?this.wearingWetsuit&&this.wearingWeightBelt&&this.wearingScubaUnit&&this.wearingMaskAndFins&&this.waistStrapLocked&&this.chestStrapLocked&&this.shoulderStrapPct>=35&&this.shoulderStrapPct<=68?this.bwrafSteps.b?this.bwrafSteps.w?this.bwrafSteps.r?this.bwrafSteps.a?this.bwrafSteps.f?e(4,"✅ 全準備完了 (200 bar)","完璧なセッティング＆BWRAF完了！ビーチまたはダイビングボートから海へエントリーしよう！","🚤 ④ エントリー画面を開く →","entry","none",null,null,null):e(3,"BWRAF確認 (5/5)","[F: Final OK] ホースねじれ無し・マスク＆フィンよし！最終OKサインを出そう","👌 [F] 最終OKサイン交換！（準備完了へ）","bwraf","buddy_bwraf",null,null,null):e(3,"BWRAF確認 (4/5)","[A: Air] 3D残圧計 200 bar と吸っても針が振れないか最終チェックしよう","👌 [A] 残圧200bar＆吸気テストOK","bwraf","buddy_bwraf","bwraf_air","👇 [A] 3D残圧計＆吸気チェック",[this.wbSpgConsoleMat[12],this.wbSpgConsoleMat[13]+.06,this.wbSpgConsoleMat[14]]):e(3,"BWRAF確認 (3/5)","[R: Releases] タンクバンド・ウエスト・チェスト・肩バックルの固定を確認しよう","👌 [R] 全バックル固定＆外し方OK","bwraf","buddy_bwraf","bwraf_releases","👇 [R] バックル＆カムバンド確認",[this.wornCamBandMat[12],this.wornCamBandMat[13]+.06,this.wornCamBandMat[14]]):e(3,"BWRAF確認 (2/5)","[W: Weights] 適正ウエイト装着と『右手クイックリリース』をチェックしよう","👌 [W] ウエイト＆右手リリースOK","bwraf","buddy_bwraf","bwraf_weights","👇 [W] ウエイトベルト確認",[this.pos[0],this.pos[1]-.04,this.pos[2]]):e(3,"BWRAF確認 (1/5)","[B: BCD] インフレーター給排気と水面浮力（半給気）をチェックしよう","👌 [B] BCD給排気・水面浮力OK","bwraf","buddy_bwraf","bwraf_bcd","👇 [B] BCDインフレーター確認",[this.bcdVestMat[12],this.bcdVestMat[13]+.08,this.bcdVestMat[14]]):e(2,"着用・調整ステップ","タンク組立バッチリ！スーツ・適正ウエイト・タンク背負い＆3点バックル・マスク＆フィンを装着しよう","✨ 適正フィットで器材を一括装着して③BWRAFへ →","bcd","none",null,null,null):e(1,"⑤ 開栓＆確認 (3/3)","黄色い2ndレギュレーターをクリックして吸気テスト！針が200barで動かなければ組立完了！","🫁 ③ 吸気テスト＆200 bar確認","gear","wb_spg","purge_reg","👇 ここをクリック：吸気テスト(200bar)",[this.wbPurgeRegMat[12],this.wbPurgeRegMat[13]+.06,this.wbPurgeRegMat[14]]):this.maskGelApplied?e(1,"④ 真水すすぎ (3/3)","真水洗い槽をクリックして、曇り止めを塗った3Dマスクをサッと水ですすごう","💧 ③ 真水洗い槽でマスクをすすぐ","gear","wb_rinse","club_rinse_tank","👇 ここをクリック：真水槽でサッと水すすぎ",[-8.8,7.46,30.14]):e(1,"④ 曇り止め (2/3)","作業台マット上の水色3Dダイブマスクをクリックして、レンズ内側に曇り止めジェルを塗り込もう","🧴 ② 3Dマスクに曇り止めを塗る","gear","wb_lpi","wb_dive_mask","👇 ここをクリック：レンズに曇り止めを塗る",[-3.64,7.36,27.02]):e(1,"④ LPI接続 (1/3)","BCDインフレーター上の銀色カプラーをクリックして、中圧(LPI)ホースをカチッと繋ごう","🔌 ① 中圧(LPI)カプラーを接続","gear","wb_lpi","lpi_coupler","👇 ここをクリック：LPIカプラー接続",[this.wbLpiCouplerMat[12],this.wbLpiCouplerMat[13]+.05,this.wbLpiCouplerMat[14]]):e(1,"③ 1stステージ (2/4)","1stステージをクリックして、タンクのKバルブにヨークを被せよう","🔧 ② 1stステージをバルブに被せる","gear","wb_reg","reg_1st","👇 ここをクリック：バルブに1stを被せる",[this.wbReg1stMat[12],this.wbReg1stMat[13]+.05,this.wbReg1stMat[14]]):e(1,"② BCD固定 (3/3)","タンク背面のカムバックルレバーをクリックして、濡れベルトを2段階ロックしよう","🔒 ③ カムバックルを2段ロック","gear","wb_bcd","cam_lever","👇 ここをクリック：カムレバーをロック",[this.wbCamLeverMat[12],this.wbCamLeverMat[13]+.04,this.wbCamLeverMat[14]]):e(1,"② BCD固定 (1/3)","タンク右隣のBCDジャケットをクリックして、タンクの上からバンドを通そう","🦺 ① タンクにBCDを通す","gear","wb_bcd","bcd_body","👇 ここをクリック：BCDをタンクに通す",[this.clubLooseBcdMat[12],this.clubLooseBcdMat[13]+.14,this.clubLooseBcdMat[14]]):e(1,"① タンク点検 (1/3)","タンク肩の銀色プレートをクリックして、耐圧検査期限と200bar刻印を確認しよう","🔍 ① タンク刻印を確認する","gear","wb_valve","tank_stamp","👇 ここをクリック：刻印確認",[-4.72,7.77,27.45])}buildScubaPrepSnapshot(){const i=["tank_check","bcd_mount","reg_first_stage","lpi_connect","valve_open"].filter(y=>this.gearSteps[y]).length;let t="optimal",s="適正フィット ◎（タンク密着・水平トリム安定）";this.shoulderStrapPct<35?(t="loose",s="緩すぎ ⚠️（背中のタンクが垂れ下がり左右に揺れる）"):this.shoulderStrapPct>68&&(t="tight",s="締めすぎ ⚠️（胸が圧迫されO₂消費が早まる）");let a="optimal";const r=this.suitVariant==="hibiscus_3mm"?3:4;let n=this.weightKg===r?`${r}kg 適正 ◎（選択中スーツの中性浮力ベスト）`:`${this.weightKg}kg ほぼ適正 ○`;this.weightKg<r-1?(a="light",n=`${this.weightKg}kg 軽すぎ ⚠️（水中で浮き上がりやすい）`):this.weightKg>r+1&&(a="heavy",n=`${this.weightKg}kg 重すぎ ⚠️（足が沈み立ち泳ぎになりやすい）`);const o=this.isOverBoatDeck(this.pos[0],this.pos[2])&&this.pos[1]>=5.6,l=this.getTerrainY(this.pos[0],this.pos[2]),h=!o&&l>=5.35&&this.pos[1]>=5.6,c=!o&&!h&&l>4.15,g=["b","w","r","a","f"].filter(y=>this.bwrafSteps[y]).length,p=g===5,x=Math.max(0,5.45-this.pos[1]),S=1+x/10,T=this.shikuwasaRelaxBonus?.9:1,k=(this.shoulderStrapPct>68?1.25:1)*16*T,m=this.valveTurns>.05&&this.regPlacedOnValve?Math.max(0,Math.round(this.smoothedSpgNeedleBar)):Math.max(0,Math.round(this.lineBar)),{netKgf:A,bcdActualL:D}=this.evalNetBuoyancyKgf(x),I=Math.max(0,Math.ceil(this.apneaSec)),W=this.suitVariant==="hibiscus_3mm"?"🌺3mmトロピカル":this.suitVariant==="pro_gold"?"⚡5mmプロ黒金":"🖤5mm慶良間",w=this.wearingScubaUnit?this.valveTurns>.08&&this.lineBar>10?`🤿 スキューバ装備 (${m} bar · バルブ${this.valveTurns.toFixed(1)}回)`:"⚠️ BCD着用済・バルブ閉（エアー未供給！）":this.activeLieSpot==="hammock"?"🌴 ヤシの木ハンモックで潮風に揺られてチルアウト中♪":this.activeLieSpot!==null?"🛌 ビーチ・デイベッドで波音を聴きながらゴロゴロ中♪":this.activeDiningSeat!==null?`🍽️ 水上リゾートダイニング（${Lt[this.activeDiningSeat]?.label??"特等席"}）で海風ディナー満喫中♪`:this.inspectFocus==="bbq_station"?"🍖 3DビーチBBQキッチン（魚介さばき＆備長炭グリル調理中！）":this.inspectFocus==="okislot"?`🌺 CHURA BAR 沖スロ『華閃光 BLACK-30（${this.okiMachineIdx+1}番台）』実戦中！`:this.inspectFocus==="bar_seat"?`🪑 CHURA BAR カウンター席 #${(this.seatedStoolIndex??0)+1} でカクテル満喫中♪`:this.inspectFocus==="bar_bottles"?"🍾 CHURA BAR クラフト酒瓶・バックバー拡大鑑賞中！":this.inspectFocus!=="none"?"🔍 3D作業台クローズアップ（パーツ直接操作中！）":this.wearingWetsuit?`${W}着用・クラブハウス準備中`:"👙 すっぴん・水着（3D作業台を触って器材を組もう！）";return{wearingWetsuit:this.wearingWetsuit,wearingWeightBelt:this.wearingWeightBelt,wearingScubaUnit:this.wearingScubaUnit,wearingMaskAndFins:this.wearingMaskAndFins,wearingScubaGear:this.wearingScubaUnit,suitVariant:this.suitVariant,bcdVariant:this.bcdVariant,finVariant:this.finVariant,activeBarDrink:this.activeBarDrink,hasCompletedDive:this.hasCompletedDive,seatedStoolIndex:this.seatedStoolIndex,barPrepActive:this.barPrepTimer>.05,barSipsLeft:this.barSipsLeft,inspectFocus:this.inspectFocus,hoveredPart:this.hoveredPartHud,guidedStep:this.computeGuidedSetupStep(),tankStampVerified:this.tankStampVerified,valveBlownOut:this.valveBlownOut,oringCondition:this.oringCondition,bcdPlacedOnTank:this.bcdPlacedOnTank,bcdAzimuthDeg:Math.round(this.bcdAzimuthDeg),bcdHeightCm:Math.round(this.bcdHeightCm*10)/10,camStrapWet:this.camStrapWet,camBuckleLocked:this.camBuckleLocked,dustCapRemoved:this.dustCapRemoved,regPlacedOnValve:this.regPlacedOnValve,regOrientationReversed:this.regOrientationReversed,yokeScrewPct:Math.round(this.yokeScrewPct),yokePressureLocked:this.lineBar>5,lpiConnected:this.lpiConnected,spgFaceDown:this.spgFaceDown,valveTurns:Math.round(this.valveTurns*100)/100,lineBar:Math.round(this.lineBar),needleBar:Math.round(this.smoothedSpgNeedleBar),yokeLeaking:this.yokeLeaking,airFlowVerified:this.airFlowVerified,maskDefogged:this.maskDefogged,maskFogPct:Math.round(this.maskFogLevel*100),earSqueezePct:Math.round(this.earSqueeze*100),netBuoyancyKgf:Math.round(A*10)/10,bcdActualLiters:Math.round(D*10)/10,ascentRateMpm:Math.round(this.ascentRateMpm),diveStyleLabel:w,currentTankBar:m,sacLpm:k,ambientAta:S,apneaSecLeft:I,gearSteps:{...this.gearSteps},completedGearSteps:i,allGearAssembled:i===5,tankBar:m,bwrafSteps:{...this.bwrafSteps},completedBwrafSteps:g,bwrafChecked:p,waistStrapLocked:this.waistStrapLocked,chestStrapLocked:this.chestStrapLocked,shoulderStrapPct:this.shoulderStrapPct,shoulderFitStatus:t,shoulderFitLabel:s,weightKg:this.weightKg,weightFitStatus:a,weightFitLabel:n,bcdSurfaceAirPct:this.bcdSurfaceAirPct,onBoatDeck:o,onBeachLand:h,inShallowSurf:c,entryInProgress:this.entryMode!==null}}emitSnapshot(e,i){const t=Math.max(0,5.45-this.pos[1]),s=t<=.85,a=Math.min(Math.hypot(this.pos[0]- -9.5,this.pos[2]-9.5),Math.hypot(this.pos[0]-10.5,this.pos[2]-10.5))<6.2&&t<3.5,r=Object.keys(this.discovered),n=r.filter(x=>this.discovered[x]).length,o=Math.max(-25,Math.min(90,Math.round(this.curBodyTrimDeg))),l=Math.abs(o);let h="水平ストリームライン ◎",c="streamline";this.activePoseStyle==="beach_lie"?(h="🛌 ビーチ・デイベッド寝転びチルアウト中♪",c="streamline"):this.activePoseStyle==="hammock_lie"?(h="🌴 ヤシの木ハンモックで揺られ中♪",c="streamline"):this.activePoseStyle==="bbq_chop"?(h="🔪 檜まな板で本格包丁仕込み中！",c="streamline"):this.activePoseStyle==="bbq_eat"?(h="🍖 アツアツ炭火浜焼きを実食中！😋",c="streamline"):this.activePoseStyle==="fish_idle"||this.activePoseStyle==="fish_cast"||this.activePoseStyle==="fish_fight"||this.activePoseStyle==="fish_catch"?(h=this.activePoseStyle==="fish_fight"?"🎣 大物ファイト中！リール巻き上げ！":this.activePoseStyle==="fish_catch"?"🎉 沖縄地魚フィッシング大漁ゲット！":"🎣 沖縄桟橋・海釣りモード中",c="streamline"):this.activePoseStyle==="bar_sit"||this.activePoseStyle==="bar_sip"?(h=this.inspectFocus==="okislot"?`🌺 沖スロ『華閃光 BLACK-30（${this.okiMachineIdx+1}番台）』遊技中`:this.activePoseStyle==="bar_sip"?"🍹 CHURA BAR カウンターでカクテル堪能中♪":`🪑 CHURA BAR カウンター席 #${(this.seatedStoolIndex??0)+1} 着席中`,c="streamline"):this.activePoseStyle==="land_walk"?(h=(this.keys.has("ShiftLeft")||this.keys.has("ShiftRight"))&&Math.hypot(this.vel[0],this.vel[2])>4.05?"陸上・浅瀬 早歩き（Shift）":"陸上・浅瀬歩行（垂直 90°）",c="vertical"):this.entryMode!==null?(h=this.entryMode==="giant_stride"?"ジャイアントストライド・エントリー！":this.entryMode==="back_roll"?"バックロール・エントリー！":"ビーチ・ウェーディングエントリー！",c="diagonal"):o<-12?(h="ヘッドダウン潜降姿勢",c="diagonal"):l<=24?(h="水平ストリームライン ◎",c="streamline"):o<=62?(h="斜めトリム（ホバリング）",c="diagonal"):(h="垂直（立ち泳ぎ姿勢）",c="vertical");const u=this.wearingScubaUnit&&this.gearSteps.reg_first_stage&&this.gearSteps.valve_open,g=Math.round(u?this.tankAirLiters/(this.cylinderVolL*200)*100:this.apneaSec/this.maxApneaSec*100),p=this.isInDivingMode();this.onUpdate({inDivingMode:p,depthM:t,oxygenPct:g,maxOxygenSec:u?2700:this.maxApneaSec,atSurface:s,nearRaft:a,flashlightOn:this.flashlightOn,pointerLocked:document.pointerLockElement===this.engine.getCanvas(),zoneName:this.detectZoneName(t),cameraMode:this.cameraMode,vrmName:this.engine.getVrmAvatar().getAvatarName(),bodyTrimDeg:o,trimMode:this.trimMode,trimStatusLabel:h,trimTone:c,kickPhase:this.hudSwimKickPhase,swimEffort:this.hudSwimEffort,activeMoveKeys:{w:this.keys.has("KeyW"),a:this.keys.has("KeyA"),s:this.keys.has("KeyS"),d:this.keys.has("KeyD"),up:this.keys.has("Space"),down:this.keys.has("ShiftLeft")||this.keys.has("ShiftRight")||this.keys.has("KeyC")||this.keys.has("KeyQ"),dash:this.virtualDashLatch||this.keys.has("ShiftLeft")||this.keys.has("ShiftRight")},inventory:{...this.inventory},totalCollected:this.totalCollected,discoveredSpecies:{...this.discovered},discoveredCount:n,totalSpeciesCount:r.length,focusedCreature:e,targetedLoot:i,sonarHint:this.computeSonarHint(),pickupToast:this.pickupToast,upgrades:this.getUpgradeRecipes(),scubaPrep:this.buildScubaPrepSnapshot(),bbqChill:this.buildBbqChillSnapshot(),diveComputer:this.buildDiveComputerSnapshot(t,u),fishing:this.buildFishingSnapshot(),okiSlot:this.buildOkiSlotSnapshot()})}stepDiveComputer(e,i,t){this.dcPiezoCooldown>0&&(this.dcPiezoCooldown=Math.max(0,this.dcPiezoCooldown-e));const s=this.dcWristGlance?1:0;this.dcFpvWristBlend+=(s-this.dcFpvWristBlend)*(1-Math.exp(-9*e));const r=28.4-Math.min(1,Math.pow(i/15,.85))*4+Math.sin(this.elapsed*.25+this.pos[0]*.08)*.12;this.dcWaterTempC+=(r-this.dcWaterTempC)*Math.min(1,e*2.5);const n=this.getGasInfo();if(i>=1.15)this.dcDiveActive||(this.dcDiveActive=!0,this.dcDiveTimeSec=0,this.dcSurfaceHoldSec=0,this.dcMaxDepthM=i,this.dcDepthSumM=0,this.dcDepthWeightSec=0,this.dcMinTempC=this.dcWaterTempC,this.dcProfileSamples.length=0,this.dcProfileSamples.push(Math.round(i*10)/10),this.dcProfileTimer=0,this.dcSafetyStopArmed=!1,this.dcSafetyStopActive=!1,this.dcSafetyStopCleared=!1,this.dcSafetyStopSecLeft=180,this.dcSafetyStopMissedWarn=!1,this.dcSpotPeakName=this.detectZoneName(i)),this.dcDiveTimeSec+=e,this.dcSurfaceHoldSec=0,i>this.dcMaxDepthM&&(this.dcMaxDepthM=i,this.dcSpotPeakName=this.detectZoneName(i)),this.dcDepthSumM+=i*e,this.dcDepthWeightSec+=e,this.dcWaterTempC<this.dcMinTempC&&(this.dcMinTempC=this.dcWaterTempC),this.dcProfileTimer+=e,this.dcProfileTimer>=1.6&&(this.dcProfileTimer=0,this.dcProfileSamples.push(Math.round(i*10)/10),this.dcProfileSamples.length>54&&this.dcProfileSamples.shift());else if(this.dcDiveActive){if(this.dcSurfaceHoldSec+=e,this.dcSurfaceHoldSec>=3.2){if(this.dcDiveTimeSec>=6&&this.dcMaxDepthM>=1.5){const p=this.dcDepthWeightSec>.1?this.dcDepthSumM/this.dcDepthWeightSec:this.dcMaxDepthM*.65;this.dcDiveLogs.unshift({diveNumber:this.dcDiveNumber,maxDepthM:Math.round(this.dcMaxDepthM*10)/10,avgDepthM:Math.round(p*10)/10,durationSec:Math.round(this.dcDiveTimeSec),minTempC:Math.round(this.dcMinTempC*10)/10,gasLabel:t?n.label:"FREE",spotName:this.dcSpotPeakName.replace(/^沖縄・|^慶良間/,"")}),this.dcDiveLogs.length>8&&this.dcDiveLogs.pop(),this.dcDiveNumber+=1}this.dcDiveActive=!1,this.dcSafetyStopActive=!1,this.dcSafetyStopMissedWarn=!1,this.dcSurfIntervalSec=0}}else this.dcSurfIntervalSec+=e;const o=vi+i*.1005,l=i>.85&&t?n.fO2:.21,h=1-l,c=i>.85&&t?Math.max(0,(o-ja)*h):zs,u=e/60*(i>.9&&t?3.2:2.2);for(let p=0;p<8;p++){const x=Math.LN2/hr[p];this.dcTissueN2[p]+=(c-this.dcTissueN2[p])*(1-Math.exp(-x*u))}const g=o*l;if(i>.9&&t&&g>.55){const p=g>=1.6?2.22:g>=1.4?.67:g>=1.2?.42:.14*((g-.5)/.7);this.dcCnsO2=Math.min(100,this.dcCnsO2+p*u)}else this.dcCnsO2=Math.max(0,this.dcCnsO2*Math.exp(-Math.LN2/90*(e/60)*4));t?(this.dcDiveActive&&this.dcMaxDepthM>=8.5&&!this.dcSafetyStopCleared&&(this.dcSafetyStopArmed=!0),this.dcSafetyStopArmed&&!this.dcSafetyStopCleared&&this.dcDiveActive&&(i>=3.2&&i<=6.2?(!this.dcSafetyStopActive&&i<this.dcMaxDepthM-1.5&&(this.dcSafetyStopActive=!0,this.dcSafetyStopMissedWarn=!1,this.audio.playDiveCompBeep("safety_start"),this.showToast("⌚ ダイコン：水深5m『安全停止（3:00）』スタート！このまま3.5〜6.0mで中性浮力ホバリングしよう！")),this.dcSafetyStopActive&&(this.dcSafetyStopSecLeft=Math.max(0,this.dcSafetyStopSecLeft-e),this.dcSafetyStopSecLeft<=0&&(this.dcSafetyStopActive=!1,this.dcSafetyStopCleared=!0,this.dcSafetyStopArmed=!1,this.audio.playDiveCompBeep("safety_clear"),this.showToast("✅ ダイコン：5m安全停止 3分間クリア！ゆっくり9m/分以下で水面へ浮上しよう！")))):this.dcSafetyStopActive&&i<2.6&&this.dcSafetyStopSecLeft>15?this.dcSafetyStopMissedWarn=!0:i>6.8&&(this.dcSafetyStopMissedWarn=!1))):(this.dcSafetyStopArmed=!1,this.dcSafetyStopActive=!1,this.dcSafetyStopMissedWarn=!1),t?i>1.5&&this.ascentRateMpm>15.2&&this.dcPiezoCooldown<=0?(this.dcPiezoCooldown=2.2,this.audio.playDiveCompBeep("alarm")):i>2&&g>1.42&&this.dcPiezoCooldown<=0&&(this.dcPiezoCooldown=4,this.audio.playDiveCompBeep("alarm"),this.showToast(`⚠️ ダイコン MOD警告：酸素分圧 PO₂ ${g.toFixed(2)} bar（上限 1.40 bar 超過）！ただちに浅い水深へ浮上しよう！`)):i>1.2&&this.apneaSec<=8&&this.dcPiezoCooldown<=0&&(this.dcPiezoCooldown=3.2,this.audio.playDiveCompBeep("alarm"))}buildDiveComputerSnapshot(e,i){const t=this.getGasInfo(),s=vi+e*.1005,a=i?t.fO2:.21,r=1-a,n=Math.max(0,(s-ja)*r),o=Math.round(s*a*100)/100;let l=99,h=!1,c=0;const u=[];for(let L=0;L<8;L++){const E=dr[L]+vi/ur[L],_=vi+U0*(E-vi),H=this.dcTissueN2[L],G=Math.max(.08,_-zs),Q=Math.max(0,Math.min(100,Math.round((H-zs)/G*100)));if(u.push(Q),H>_){h=!0;const se=(H-dr[L])*ur[L],X=Math.max(0,(se-vi)/.1005);X>c&&(c=X),l=0}else if(e>1.2&&n>_&&n>H+1e-4){const se=Math.LN2/hr[L],X=-Math.log((n-_)/(n-H))/se;X<l&&(l=X)}}const g=h?0:e<=1.2?99:Math.max(1,Math.min(99,Math.floor(l))),p=h?Math.ceil(c/3)*3:0,x=Math.round(this.ascentRateMpm*10)/10,S=i?e<=.9||x<.8?"idle":x<=9.5?"safe":x<=15?"caution":"danger":e<=.9||x<.8?"idle":"safe",T=this.valveTurns>.05&&this.regPlacedOnValve?Math.max(0,Math.round(this.smoothedSpgNeedleBar)):Math.max(0,Math.round(this.lineBar));let k=null;if(i){const E=Math.max(0,T-50)*this.cylinderVolL,_=this.shikuwasaRelaxBonus?.9:1,G=(this.shoulderStrapPct>68?1.25:1)*16*_*(1+e/10);k=Math.max(0,Math.min(99,Math.floor(E/Math.max(4,G))))}const m=this.computeCompassHeadingDeg(),D=["N","NE","E","SE","S","SW","W","NW"][Math.round(m/45)%8],I=m>=330||m<30?"🏖️ ビーチ・クラブハウス":m>=60&&m<120?"🦅 マンタ根":m>=150&&m<210?"⚓ 沈没船ディープ":m>=240&&m<300?"🪨 宮古ロックアーチ":m<180?"🪸 東リーフ水路":"🚤 西ボート・砂洲",W=this.dcLockedHeadingDeg!==null?(this.dcLockedHeadingDeg+180)%360:null;let w=0;this.dcLockedHeadingDeg!==null&&(w=(this.dcLockedHeadingDeg-m+540)%360-180);let y=null,M="none";if(!i)e>.9&&this.apneaSec<=6?(y=`🫁 素潜り息限界 残り ${Math.max(0,Math.ceil(this.apneaSec))}s · 急浮上OK！`,M="danger"):e>.9&&this.apneaSec<=14&&(y=`🫁 素潜り息 残り ${Math.ceil(this.apneaSec)}s · 水面へ上がろう`,M="warn");else if(S==="danger")y=`⚠️ SLOW DOWN! 浮上過多 ${Math.round(x)}m/分`,M="danger";else if(e>1.5&&o>1.4)y=`⚠️ HIGH PO₂ ${o.toFixed(2)} bar (MOD超過!)`,M="danger";else if(h)y=`⛔ DECO STOP ${p.toFixed(0)}m 減圧停止必須`,M="danger";else if(T<=50&&e>.9)y=`⚠️ RESERVE AIR 残圧 ${T} bar`,M="warn";else if(this.dcSafetyStopMissedWarn&&e>.9)y=`⚠️ 5m 安全停止へ戻ろう (残り ${Math.ceil(this.dcSafetyStopSecLeft)}s)`,M="warn";else if(this.dcSafetyStopActive){const L=Math.floor(this.dcSafetyStopSecLeft/60),E=String(Math.floor(this.dcSafetyStopSecLeft%60)).padStart(2,"0");y=`🛑 SAFETY STOP 5m · ${L}:${E}`,M="info"}else S==="caution"&&(y=`⚡ 浮上やや速め ${Math.round(x)}m/分 (理想 ≤9m/分)`,M="warn");const P=this.dcDepthWeightSec>.2?Math.round(this.dcDepthSumM/this.dcDepthWeightSec*10)/10:Math.round(e*10)/10;return{mode:!this.dcDiveActive&&e<=.95?"surface":i?this.dcGasMix==="air21"?"scuba":"nitrox":"free",screen:this.dcScreen,wristGlance:this.dcWristGlance,gasMix:this.dcGasMix,gasLabel:i?t.label:"FREE 素潜り",fO2:a,modM:t.modM,po2Bar:o,cnsPct:Math.round(this.dcCnsO2),depthM:Math.round(e*10)/10,maxDepthM:Math.round(this.dcMaxDepthM*10)/10,avgDepthM:P,diveTimeSec:Math.floor(this.dcDiveTimeSec),surfaceIntervalSec:Math.floor(this.dcSurfIntervalSec),waterTempC:Math.round(this.dcWaterTempC*10)/10,ambientAta:Math.round(s*100)/100,ndlMin:g,inDeco:h,decoCeilingM:p,tissueLoadPcts:u,ascentRateMpm:x,ascentZone:S,safetyStopArmed:this.dcSafetyStopArmed,safetyStopActive:this.dcSafetyStopActive,safetyStopCleared:this.dcSafetyStopCleared,safetyStopSecLeft:Math.ceil(this.dcSafetyStopSecLeft),safetyStopMissedWarn:this.dcSafetyStopMissedWarn,aiConnected:i,tankBar:T,gtrMin:k,headingDeg:m,cardinalLabel:D,landmarkLabel:I,lockedHeadingDeg:this.dcLockedHeadingDeg,reciprocalDeg:W,headingDeltaDeg:w,profileSamples:[...this.dcProfileSamples],diveNumber:this.dcDiveNumber,diveLogs:[...this.dcDiveLogs],alertBanner:y,alertTone:M}}buildBbqChillSnapshot(){const e=[0,1,2].map(t=>{const s=this.grillSlots[t];if(!s)return{slotIndex:t,kind:null,name:"空き",flipped:!1,cookPct:0,state:"empty"};const a=Math.max(s.sideADoneness,s.sideBDoneness),r=s.sideADoneness+s.sideBDoneness,n=a>=1.85,o=!n&&(s.flipped&&s.sideBDoneness>=.36&&s.sideADoneness>=.32||r>=.88),l=!n&&!o&&!s.flipped&&s.sideADoneness>=.36,h=Math.min(100,Math.round(r/1.05*100));return{slotIndex:t,kind:s.kind,name:Ve[s.kind].name,flipped:s.flipped,cookPct:h,state:n?"burnt":o?"golden":l?"flip_ready":"raw"}}),i=this.platedItems.length>0?Ve[this.platedItems[this.platedItems.length-1].kind].grillName:null;return{seafoodStock:{...this.seafoodStock},boardKind:this.boardItem?this.boardItem.kind:null,boardName:this.boardItem?this.boardItem.filleted?Ve[this.boardItem.kind].filletName:Ve[this.boardItem.kind].name:null,boardCutsDone:this.boardItem?.cutsDone??0,boardCutsNeeded:this.boardItem?.cutsNeeded??2,boardFilleted:this.boardItem?.filleted??!1,grillSlots:e,platedCount:this.platedItems.length,platedTopName:i,bbqBuffActive:this.bbqBuffActive,totalBbqEaten:this.totalBbqEaten,activeLieSpot:this.activeLieSpot,pairingDrink:this.bbqPairingDrink,pairingSipsLeft:this.bbqPairingSipsLeft,pairingDrinkLabel:this.bbqPairingDrink==="beer"?"🍺 極冷・7:3神泡生ビール":"🥃 ロックアイス強炭酸ハイボール"}}stepFishingMode(e){this.vel[0]=0,this.vel[1]=0,this.vel[2]=0,this.curBodyTrimDeg=90,this.wasAboveSurface=!0,this.fishingPhaseTimer+=e,this.fishingSplashTimer>0&&(this.fishingSplashTimer=Math.max(0,this.fishingSplashTimer-e)),this.fishingTwitchCooldown>0&&(this.fishingTwitchCooldown=Math.max(0,this.fishingTwitchCooldown-e)),this.fishingTwitchAnim>0&&(this.fishingTwitchAnim=Math.max(0,this.fishingTwitchAnim-e*3.1)),this.fishingCounterChimeCooldown>0&&(this.fishingCounterChimeCooldown=Math.max(0,this.fishingCounterChimeCooldown-e));const i=this.fishingPhase==="fighting"||this.fishingPhase==="ready"?this.getEffectiveRodLeanDir():0;this.fishingSmoothedRodLean+=(i-this.fishingSmoothedRodLean)*(1-Math.exp(-11*e));const t=this.fishingFloatTarget[0],s=this.fishingFloatTarget[2],a=Math.sin(this.elapsed*3.1+t*.4)*.024;if(this.fishingPhase==="ready"){this.activePoseStyle="fish_idle",this.fishingTension=0;const r=this.getEffectiveRodLeanDir();if(r!==0&&this.nudgeFishingAim(r,e*11.5),this.fishingCastCharging&&(this.fishingCastHoldSec+=e,this.fishingCastPower+=this.fishingCastDirSign*116*e,this.fishingCastPower>=100?(this.fishingCastPower=100,this.fishingCastDirSign=-1):this.fishingCastPower<=14&&(this.fishingCastPower=14,this.fishingCastDirSign=1),this.computeCastPointAtPower(this.fishingCastPower,this.fishingCastPreviewPos),this.fishingCastHoldSec>=.14)){const n=Math.floor(this.fishingCastPower/14);n!==this.fishingCastTickBucket&&(this.fishingCastTickBucket=n,this.audio.playFishingCastChargeTick(this.fishingCastPower))}return}if(this.fishingPhase==="casting"){this.activePoseStyle="fish_cast";const r=Math.min(1,this.fishingPhaseTimer/.56),n=this.fishingRodTipWorld[0],o=this.fishingRodTipWorld[1],l=this.fishingRodTipWorld[2];this.fishingFloatPos[0]=n+(t-n)*r,this.fishingFloatPos[2]=l+(s-l)*r,this.fishingFloatPos[1]=o*(1-r)+5.46*r+Math.sin(r*Math.PI)*1.65;for(let h=0;h<3;h++){const c=this.fishingStalkers[h],u=c.angleOffset+this.elapsed*c.orbitSpeed,g=t+Math.cos(u)*c.radiusM,p=s+Math.sin(u)*c.radiusM;c.pos[0]=g,c.pos[1]=Math.max(this.getTerrainY(g,p)+.55,4.68+c.depthOffset),c.pos[2]=p,c.dir[0]=-Math.sin(u)*Math.sign(c.orbitSpeed),c.dir[1]=0,c.dir[2]=Math.cos(u)*Math.sign(c.orbitSpeed)}this.fishingPhaseTimer>=.56&&(this.fishingPhase="waiting",this.fishingPhaseTimer=0,this.fishingFloatPos[0]=t,this.fishingFloatPos[1]=5.46,this.fishingFloatPos[2]=s,this.fishingSplashPos[0]=t,this.fishingSplashPos[1]=5.46,this.fishingSplashPos[2]=s,this.fishingSplashTimer=.55);return}if(this.fishingPhase==="waiting"){this.activePoseStyle="fish_idle";const r=Math.sin(this.fishingTwitchAnim*Math.PI)*.08;this.fishingFloatPos[0]=t+(this.pos[0]-t)*.015*r,this.fishingFloatPos[1]=5.46+a-r*.35,this.fishingFloatPos[2]=s+(this.pos[2]-s)*.015*r,this.fishingAttraction=Math.min(100,this.fishingAttraction+e*15.5);const n=Math.max(Math.min(1,this.fishingPhaseTimer/Math.max(.5,this.fishingWaitDuration)),this.fishingAttraction/100);for(let o=0;o<3;o++){const l=this.fishingStalkers[o],h=l.angleOffset+this.elapsed*l.orbitSpeed,c=o===0?1-n*.8:1-n*.45,u=Math.max(.36,l.radiusM*c),g=t+Math.cos(h)*u,p=s+Math.sin(h)*u,x=Math.max(this.getTerrainY(g,p)+.55,4.72+l.depthOffset+(o===0?n*.28:0));l.dir[0]=(t-g)*.55-Math.sin(h)*Math.sign(l.orbitSpeed)*.65,l.dir[1]=o===0?.08:.02,l.dir[2]=(s-p)*.55+Math.cos(h)*Math.sign(l.orbitSpeed)*.65,l.pos[0]=g,l.pos[1]=x,l.pos[2]=p}this.fishingFishPos[0]=this.fishingStalkers[0].pos[0],this.fishingFishPos[1]=this.fishingStalkers[0].pos[1],this.fishingFishPos[2]=this.fishingStalkers[0].pos[2],this.fishingFishDir[0]=this.fishingStalkers[0].dir[0],this.fishingFishDir[1]=this.fishingStalkers[0].dir[1],this.fishingFishDir[2]=this.fishingStalkers[0].dir[2],(this.fishingPhaseTimer>=this.fishingWaitDuration||this.fishingAttraction>=99.5)&&(this.fishingAttraction=100,this.fishingPhase="nibble",this.fishingPhaseTimer=0,this.fishingNextNibbleBeep=.08);return}if(this.fishingPhase==="nibble"){this.activePoseStyle="fish_idle";const r=Math.max(0,Math.sin(this.fishingPhaseTimer*9.5));this.fishingFloatPos[0]=t+Math.sin(this.elapsed*7)*.015,this.fishingFloatPos[1]=5.46+a-r*.062,this.fishingFloatPos[2]=s+Math.cos(this.elapsed*6.5)*.015;const n=this.fishingStalkers[0];n.pos[0]=t+Math.cos(this.elapsed*2.4)*.24,n.pos[1]=5.02+r*.09,n.pos[2]=s+Math.sin(this.elapsed*2.4)*.24,n.dir[0]=t-n.pos[0],n.dir[1]=.24,n.dir[2]=s-n.pos[2];for(let o=1;o<3;o++){const l=this.fishingStalkers[o],h=l.angleOffset+this.elapsed*l.orbitSpeed*1.15,c=1.05+o*.45;l.pos[0]=t+Math.cos(h)*c,l.pos[1]=Math.max(this.getTerrainY(l.pos[0],l.pos[2])+.55,4.78+l.depthOffset),l.pos[2]=s+Math.sin(h)*c,l.dir[0]=-Math.sin(h)*Math.sign(l.orbitSpeed),l.dir[1]=.04,l.dir[2]=Math.cos(h)*Math.sign(l.orbitSpeed)}this.fishingFishPos[0]=n.pos[0],this.fishingFishPos[1]=n.pos[1],this.fishingFishPos[2]=n.pos[2],this.fishingFishDir[0]=n.dir[0],this.fishingFishDir[1]=n.dir[1],this.fishingFishDir[2]=n.dir[2],this.fishingPhaseTimer>=this.fishingNextNibbleBeep&&(this.fishingNextNibbleBeep+=.64,this.audio.playFishingNibble(),this.fishingSplashPos[0]=t,this.fishingSplashPos[1]=5.46,this.fishingSplashPos[2]=s,this.fishingSplashTimer=.42),this.fishingPhaseTimer>=this.fishingNibbleDuration&&(this.fishingPhase="bite",this.fishingPhaseTimer=0,this.fishingSplashPos[0]=t,this.fishingSplashPos[1]=5.46,this.fishingSplashPos[2]=s,this.fishingSplashTimer=.55,this.audio.playFishingBiteAlert());return}if(this.fishingPhase==="bite"){this.activePoseStyle="fish_idle",this.fishingFloatPos[0]=t+Math.sin(this.elapsed*18)*.035,this.fishingFloatPos[1]=5.18-Math.abs(Math.sin(this.fishingPhaseTimer*10))*.08,this.fishingFloatPos[2]=s+Math.cos(this.elapsed*16)*.035,this.fishingFishPos[0]=this.fishingFloatPos[0],this.fishingFishPos[1]=4.92,this.fishingFishPos[2]=this.fishingFloatPos[2],this.fishingFishDir[0]=t-this.pos[0],this.fishingFishDir[1]=-.22,this.fishingFishDir[2]=s-this.pos[2],this.fishingPhaseTimer>=2.55&&(this.fishingPhase="ready",this.fishingPhaseTimer=0,this.refreshFishingTideRipSpot(!1),this.audio.playDiveAlertBeep(),this.showToast("💨 あっ…アワセが遅れてエサを取られちゃった！もう一度潮目を狙ってキャストしよう！"));return}if(this.fishingPhase==="fighting"){this.activePoseStyle="fish_fight";const r=Gt[this.fishingTargetKind],n=r.pullStrength,o=this.fishingStamina/100,l=n*(.36+.64*o);if(this.fishingDirChangeTimer-=e,this.fishingDirChangeTimer<=0)if(this.fishingDirChangeTimer=1.45+Math.random()*.95,o<=.18)this.fishingSwimDir=Math.random()<.65?0:Math.random()<.5?-1:1,this.fishingRootDive=!1;else{const P=Math.random();P<.42?this.fishingSwimDir=-1:P<.84?this.fishingSwimDir=1:this.fishingSwimDir=0,this.fishingRootDive=r.rootDiveCapable&&o>.3&&this.fishingDistM>2.6&&Math.random()<.34}this.fishingSurgeDuration>0?this.fishingSurgeDuration=Math.max(0,this.fishingSurgeDuration-e):(this.fishingSurgeTimer-=e,this.fishingSurgeTimer<=0&&o>.12&&(this.fishingSurgeDuration=.52+l*.52,this.fishingSurgeTimer=1.55+Math.random()*1.1,this.fishingSplashPos[0]=this.fishingFishPos[0],this.fishingSplashPos[1]=5.46,this.fishingSplashPos[2]=this.fishingFishPos[2],this.fishingSplashTimer=.52));const h=this.getEffectiveRodLeanDir(),c=this.fishingSwimDir!==0&&h===-this.fishingSwimDir,u=this.fishingSwimDir!==0&&h===this.fishingSwimDir;c&&this.fishingCounterChimeCooldown<=0&&(this.fishingCounterChimeCooldown=1.15,this.audio.playFishingCounterSuccess());const g=5.2+(1-n)*4.5,p=c?2.35:this.fishingReelHeld?1.28:.72;this.fishingStamina=Math.max(0,this.fishingStamina-g*p*e),c&&this.fishingRootDive&&(this.fishingRootDive=!1,this.fishingStamina=Math.max(0,this.fishingStamina-6.5*e));const x=this.fishingSurgeDuration>0||this.fishingRootDive;if(this.fishingReelHeld){const P=c?1.38:1,U=1+(1-o)*.85,L=(x?.92:3.25-l*.7)*P*U;this.fishingDistM=Math.max(1.15,this.fishingDistM-L*e);let E=x?24+l*25:4.8+l*6.8;c?E*=.42:u&&(E*=1.24),this.fishingTension=Math.min(100,this.fishingTension+E*e),this.fishingReelTickTimer-=e,this.fishingReelTickTimer<=0&&(this.fishingReelTickTimer=x?.075:.105,this.audio.playFishingReelTick(this.fishingTension>70||x))}else{const P=x?(.3+l*.52)*(c?.45:1)*e:.04*e;this.fishingDistM=Math.min(15.5,this.fishingDistM+P);const U=c?54:42;this.fishingTension=Math.max(10,this.fishingTension-U*e)}if(x&&this.fishingTension>=74?(this.fishingDragScreamTimer-=e,this.fishingDragScreamTimer<=0&&(this.fishingDragScreamTimer=.22,this.audio.playFishingDragScream())):this.fishingDragScreamTimer=0,this.fishingTension>=99.8){this.fishingPhase="ready",this.fishingPhaseTimer=0,this.fishingReelHeld=!1,this.fishingRodLeanUiDir=0,this.fishingTension=0,this.refreshFishingTideRipSpot(!1),this.audio.playDiveAlertBeep(),this.showToast("⚡ パツンッ！！大物の突っ込みでハリスが切れた…！赤テンション時は一瞬リールを緩めるか、逆方向(A/D)へ竿を倒していなそう！");return}const S=t-this.pos[0],T=s-this.pos[2],k=Math.hypot(S,T)||1,m=S/k,A=T/k,D=-A,I=m,w=(this.fishingSwimDir*1.35+Math.sin(this.elapsed*5.8)*.45)*Math.min(1,this.fishingDistM/4.8),y=this.fishingRootDive?-.28:x?Math.max(0,Math.sin(this.elapsed*14))*.2:0;this.fishingFishPos[0]=this.pos[0]+m*this.fishingDistM+D*w,this.fishingFishPos[2]=this.pos[2]+A*this.fishingDistM+I*w,this.fishingFishPos[1]=5.18+y,this.fishingFloatPos[0]=this.pos[0]+m*Math.max(.9,this.fishingDistM-.55)+D*w*.72,this.fishingFloatPos[2]=this.pos[2]+A*Math.max(.9,this.fishingDistM-.55)+I*w*.72,this.fishingFloatPos[1]=5.38+Math.sin(this.elapsed*12)*.05;const M=this.fishingSwimDir!==0?this.fishingSwimDir*.95:Math.cos(this.elapsed*5.8)*.6;if(this.fishingFishDir[0]=D*M+m*(x?.75:-.35),this.fishingFishDir[1]=this.fishingRootDive?-.32:y*.5,this.fishingFishDir[2]=I*M+A*(x?.75:-.35),this.fishingDistM<=1.34){const P=this.fishingTargetKind,{weightKg:U,rank:L}=z0(P,this.fishingTargetCm);this.seafoodStock[P]+=1,this.fishingTotalCaught+=1,this.totalCollected+=1;const E=this.fishingTargetCm>this.fishingBestCm[P];E&&(this.fishingBestCm[P]=this.fishingTargetCm,this.fishingBestKg[P]=U,this.fishingBestRank[P]=L),this.fishingLastCatch={kind:P,jpName:r.jpName,okinawaDialect:r.okinawaDialect,lengthCm:this.fishingTargetCm,weightKg:U,rank:L,stars:r.stars,isNewRecord:E,wasPerfectCast:this.fishingLastCastQuality==="perfect",wasCriticalHook:this.fishingCriticalHook,rigLabel:ni[this.fishingRig].shortLabel,culinaryNote:r.culinaryNote,stockNow:this.seafoodStock[P]},this.fishingSavedSeaYaw=this.diverHeadingYaw,this.catchJoySec=18,this.fishingPhase="landed",this.fishingPhaseTimer=0,this.fishingReelHeld=!1,this.fishingRodLeanUiDir=0,this.fishingTension=0,this.audio.playFishingCatchFanfare(r.stars>=3||L==="SS"||L==="S");const _="★".repeat(r.stars),H=L==="SS"?"【👑SS・ぬし級】":L==="S"?"【🏆S・大物】":`【${L}ランク】`;this.showToast(`🎉 ランディング成功！！${H}${_}『${r.jpName}（${this.fishingTargetCm.toFixed(1)}cm / ${U.toFixed(2)}kg）』ゲット！ビーチBBQでさばいて炭火焼き・お刺身にできるよ♪`)}return}if(this.fishingPhase==="landed"){this.activePoseStyle="fish_catch",this.fishingTension=0;let n=this.yaw+Math.PI-.22-this.diverHeadingYaw;for(;n>Math.PI;)n-=Math.PI*2;for(;n<-Math.PI;)n+=Math.PI*2;this.diverHeadingYaw+=n*(1-Math.exp(-7.5*e)),this.tpvDistance>1.88&&(this.tpvDistance+=(1.88-this.tpvDistance)*(1-Math.exp(-5*e)))}}buildFishingSnapshot(){const e=this.fishingPhase!=="inactive",i=ni[this.fishingRig],t=Gs.filter(m=>this.fishingBestCm[m]>0).length,s=this.isOverBoatDeck(this.pos[0],this.pos[2])?"🚤 ボート船上・美ら海リーフフィッシング":this.pos[2]>=17?"🏖️ 沖縄白砂サーフ・本格投げ釣り":"🎣 美ら海・本格磯＆桟橋フィッシング",a=this.getEffectiveRodLeanDir(),r=this.fishingPhase==="fighting"&&this.fishingSwimDir!==0&&a===-this.fishingSwimDir,n=this.fishingPhase==="fighting"&&(this.fishingSurgeDuration>0||this.fishingRootDive)&&this.fishingTension>=74;let o=1,l=28;for(const m of this.fishingStalkers){const A=Gt[m.kind].stars;A>o&&(o=A),m.cm>l&&(l=m.cm)}const h=o>=4||l>=68?`🌊 水中魚影3尾回遊中…🔥超特大の巨大魚影（${Math.round(l)}cm級）が見えるぞ！！`:o>=3||l>=50?"🌊 水中魚影3尾回遊中…✨良型のタマン／ガーラ級の影がウロウロしているよ！":"🌊 透き通る海中に沖縄地魚3尾の魚影！Fキーで誘って活性を上げよう♪";let c="①仕掛けを選び、②A/Dで潮目リングを狙って、③Space / 左クリック長押しでキャストしよう！",u="🎯 長押しでパワー調整＆キャスト！ (Space / Click)",g=null,p="🎣 リール長押しで寄せよう！";if(this.fishingPhase==="ready"&&this.fishingCastCharging){const m=Math.round(this.fishingCastPower),A=m>=this.fishingSweetSpotMinPct&&m<=this.fishingSweetSpotMaxPct;c=A?`🎯 今だ！！潮目スイートスポット（${m}%）で指を離して PERFECT CAST！！`:`⚡ キャストパワー充填中（${m}%）…緑の『潮目ゾーン(${this.fishingSweetSpotMinPct}-${this.fishingSweetSpotMaxPct}%)』で離そう！`,u=A?"🎯 今離して PERFECT CAST!!":`⚡ パワー ${m}%（離してキャスト）`}else if(this.fishingPhase==="casting")c=this.fishingLastCastQuality==="perfect"?"🎯 PERFECT CAST!! 光る潮目のど真ん中へ仕掛けが吸い込まれる…！":"🌊 ビュッ！エメラルドのリーフポイントへ仕掛けを投入中…",u="🌊 キャスト投入中…";else if(this.fishingPhase==="waiting")c=`👀 集魚・食い気 ${Math.round(this.fishingAttraction)}% — 『${i.enticeLabel}』で魚影を誘い寄せよう！`,u="⏳ 本アタリ待ち（早アワセ注意）";else if(this.fishingPhase==="nibble")c=i.isLure?"💓 コツン…！チェイス中！Fでリアクション誘発か、そのまま食い込み『HIT!!』を待て！":"💓 ツン…ツン…前アタリ！ウキが『ズボッ！！』と海中に消し込むまで我慢…！",u="💓 前アタリ中…（沈んだ瞬間に押す！）";else if(this.fishingPhase==="bite")c=this.fishingPhaseTimer<=.62?"⚡ ズボッ！！今すぐ Space / Click で『CRITICAL 鬼アワセ』を叩き込め！！":"🔥 HIT！！ウキが消し込んだ！！今すぐ Space / Click でフッキング！！",u="🔥 今すぐ鬼アワセ！！ (HIT!!)";else if(this.fishingPhase==="fighting"){const m=Gt[this.fishingTargetKind].pullStrength;g=m>=.88?"👑 沖縄三大高級魚クラスの怪物級ファイト！！":m>=.7?"⚡ タマン／ガーラ級の強烈な横走り！！":"🐟 元気いっぱいの沖縄地魚だ！",r?p="✨ NICE COUNTER!! 逆竿のタメでテンション半減＆体力2.3倍削り中！！":this.fishingRootDive?p=this.fishingSwimDir<0?"🪸 サンゴ根潜り警戒！！左へ潜る魚に【D / 右いなし ▶】で頭を浮かせろ！":"🪸 サンゴ根潜り警戒！！右へ潜る魚に【A / ◀ 左いなし】で頭を浮かせろ！":this.fishingSwimDir<0?p="⬅️ 魚が左へ激走中！！【Dキー / 右いなし ▶】長押しでカウンター！":this.fishingSwimDir>0?p="➡️ 魚が右へ激走中！！【Aキー / ◀ 左いなし】長押しでカウンター！":p="✨ 魚が息をついた！！今がチャンス、長押しで一気にリールを巻け！",c=n?"🔊 ジジジジッ！！ATDドラグ逆転作動中！赤ゲージ限界に注意していなそう！":this.fishingStamina<=25?"💪 魚が弱って水面に浮いてきたぞ！あと少し、そのまま巻き上げてランディングだ！":"🎣 左右の走りに逆方向(A/D)の竿さばきを合わせながらリール(Space/Click)を巻こう！",u="⚡ 長押しでリール巻き！ (Hold)"}else if(this.fishingPhase==="landed"&&this.fishingLastCatch){const m=this.fishingLastCatch;c=`🎉 【${m.rank}ランク】『${m.jpName} (${m.lengthCm.toFixed(1)}cm / ${m.weightKg.toFixed(2)}kg)』をクーラーへ保管！`,u="🎣 もう一投キャスト！ (Space / Click)"}const x=Math.round(this.fishingTension),S=x>=78?"danger":x>=52?"warn":"safe",T=this.fishingPhase==="fighting"?Math.max(0,Math.min(100,Math.round((this.fishingStartDistM-this.fishingDistM)/Math.max(1,this.fishingStartDistM-1.34)*100))):this.fishingPhase==="landed"?100:0,k=Gs.map(m=>{const A=Gt[m];return{kind:m,shortName:A.okinawaDialect,stars:A.stars,caught:this.fishingBestCm[m]>0,bestCm:this.fishingBestCm[m],bestKg:this.fishingBestKg[m],bestRank:this.fishingBestRank[m]}});return{active:e,phase:this.fishingPhase,spotLabel:s,statusText:c,actionButtonLabel:u,rigId:this.fishingRig,rigName:i.fullName,rigEnticeLabel:i.enticeLabel,castCharging:this.fishingCastCharging,castPowerPct:Math.round(this.fishingCastPower),sweetSpotMinPct:this.fishingSweetSpotMinPct,sweetSpotMaxPct:this.fishingSweetSpotMaxPct,lastCastQuality:this.fishingLastCastQuality,attractionPct:Math.round(this.fishingAttraction),underwaterScannerText:h,criticalHooked:this.fishingCriticalHook,staminaPct:Math.round(this.fishingStamina),swimDir:this.fishingSwimDir,rootDiveAlert:this.fishingRootDive,rodLeanDir:a,counterActive:r,dragScreaming:n,fightDirectionBanner:p,tensionPct:x,tensionTone:S,fishDistM:Math.round(this.fishingDistM*10)/10,reelProgressPct:T,fishPullingHard:this.fishingPhase==="fighting"&&(this.fishingSurgeDuration>0||this.fishingRootDive),hookedFishHint:g,totalCaught:this.fishingTotalCaught,caughtSpeciesCount:t,zukan:k,lastCatch:this.fishingLastCatch}}}function W0(f){const e=Math.max(0,Math.min(Fi,f)),i=Math.floor(e);return`00:${String(i).padStart(2,"0")}`}function V0(f){const e=f.trim();if(!e)return null;const i=window.location.protocol.startsWith("http")?`&origin=${encodeURIComponent(window.location.origin)}`:"";if(/^[A-Za-z0-9_-]{11}$/.test(e))return{embedUrl:`https://www.youtube.com/embed/${e}?autoplay=1&playsinline=1&rel=0&enablejsapi=1${i}`,watchUrl:`https://www.youtube.com/watch?v=${e}`,label:`ID: ${e}`};let t=null;try{t=new URL(e.startsWith("http")?e:`https://${e}`)}catch{t=null}if(!t)return null;const s=t.hostname.replace(/^www\./,"").toLowerCase();if(!(s==="youtube.com"||s==="m.youtube.com"||s==="music.youtube.com"||s==="youtube-nocookie.com"||s==="youtu.be"))return null;let r="";const n=t.searchParams.get("list")??"";if(s==="youtu.be")r=t.pathname.split("/").filter(Boolean)[0]??"";else{const h=t.searchParams.get("v");if(h)r=h;else{const c=t.pathname.split("/").filter(Boolean);(c[0]==="embed"||c[0]==="shorts"||c[0]==="live"||c[0]==="v")&&c[1]&&(r=c[1])}}const o=t.searchParams.get("t")??t.searchParams.get("start")??"";let l=0;if(/^\d+$/.test(o))l=Number(o);else if(o){const h=/(\d+)m/.exec(o),c=/(\d+)s/.exec(o),u=/(\d+)h/.exec(o);l=(u?Number(u[1])*3600:0)+(h?Number(h[1])*60:0)+(c?Number(c[1]):0)}if(r&&/^[A-Za-z0-9_-]{11}$/.test(r)){const h=new URLSearchParams({autoplay:"1",playsinline:"1",rel:"0",enablejsapi:"1"});return window.location.protocol.startsWith("http")&&h.set("origin",window.location.origin),n&&h.set("list",n),l>0&&h.set("start",String(l)),{embedUrl:`https://www.youtube.com/embed/${r}?${h.toString()}`,watchUrl:`https://www.youtube.com/watch?v=${r}${n?`&list=${n}`:""}`,label:n?`動画＋プレイリスト (${r})`:`動画 (${r})`}}return n?{embedUrl:`https://www.youtube.com/embed/videoseries?${new URLSearchParams({listType:"playlist",list:n,autoplay:"1",playsinline:"1",rel:"0"}).toString()}`,watchUrl:`https://www.youtube.com/playlist?list=${n}`,label:`プレイリスト (${n.slice(0,12)}…)`}:null}let Za=0;async function mr(){const f=++Za;window.__disposeCarbonOceanApp?.();let e=document.getElementById("vfx-canvas");const i=document.getElementById("error-banner");if(!e)return;const t=document.getElementById("tel-fps"),s=document.getElementById("tel-count"),a=document.getElementById("tel-chapter"),r=document.getElementById("pachinko-telemetry-group"),n=document.getElementById("showcase-telemetry-group"),o=document.getElementById("padi-telemetry-group"),l=document.getElementById("tel-padi-cert"),h=document.getElementById("okinawa-telemetry-group"),c=document.getElementById("tel-okinawa-dex"),u=document.getElementById("tel-okinawa-loot"),g=document.getElementById("cnt-spins"),p=document.getElementById("cnt-jackpots"),x=document.getElementById("badge-kakuhen"),S=document.getElementById("emblem-overlay"),T=document.getElementById("emblem-text"),k=document.getElementById("pachinko-trigger-wrap"),m=document.getElementById("btn-arcade-push"),A=document.getElementById("push-label-text"),D=document.getElementById("padi-hud"),I=document.getElementById("padi-cert-badge"),W=document.getElementById("padi-skill-title"),w=document.getElementById("padi-step-badge"),y=document.getElementById("padi-coach-msg"),M=document.getElementById("padi-progress-wrap"),P=document.getElementById("padi-progress-bar"),U=document.getElementById("padi-alert-box"),L=document.getElementById("padi-signal-toast"),E=document.getElementById("padi-step-actions"),_=document.getElementById("dc-ear-badge"),H=document.getElementById("dc-depth"),G=document.getElementById("dc-target-depth"),Q=document.getElementById("dc-ascent-wrap"),se=document.getElementById("dc-ascent"),X=document.getElementById("dc-ascent-bar"),Z=document.getElementById("dc-air-label"),ae=document.getElementById("dc-air-wrap"),ie=document.getElementById("dc-tank"),R=document.getElementById("dc-buoyancy-text"),K=document.getElementById("dc-lung-pct"),oe=document.getElementById("dc-lung-bar"),he=document.getElementById("dc-bcd-pct"),me=document.getElementById("dc-bcd-bar"),ne=document.getElementById("btn-mute"),Le=document.getElementById("btn-toggle-panel"),Ae=document.getElementById("control-drawer"),Ie=document.getElementById("btn-cinema"),He=document.getElementById("cinema-floating-bar"),Ue=document.getElementById("btn-exit-cinema"),We=document.getElementById("btn-screenshot"),dt=document.getElementById("btn-okinawa-photo"),vt=document.getElementById("btn-cinema-screenshot"),st=document.getElementById("screenshot-flash"),ot=document.getElementById("screenshot-toast"),bt=document.getElementById("screenshot-toast-img"),Qe=document.getElementById("screenshot-toast-name"),St=document.getElementById("screenshot-toast-sub"),Tt=document.querySelectorAll("#top-mode-pill [data-appmode]"),wt=document.getElementById("tab-mode-okinawa"),nt=document.getElementById("tab-mode-pachinko"),ct=document.getElementById("tab-mode-padi"),rt=document.getElementById("tab-mode-showcase"),ut=document.getElementById("drawer-pachinko-controls"),Mt=document.getElementById("drawer-showcase-controls"),b=document.getElementById("hud-bottom"),B=document.getElementById("chk-autospin"),N=document.getElementById("slider-se-vol"),ee=document.getElementById("val-se-vol"),V=document.getElementById("slider-bgm-vol"),pe=document.getElementById("val-bgm-vol"),ce=document.getElementById("bgm-status-text"),J=document.getElementById("bgm-file-all"),de=document.getElementById("bgm-file-normal"),ue=document.getElementById("bgm-file-reach"),xe=document.getElementById("bgm-file-jackpot"),Y=document.getElementById("timeline-scrubber"),be=document.getElementById("time-readout"),Ce=document.getElementById("btn-play"),Se=document.getElementById("icon-play-label"),Me=document.getElementById("btn-fullscreen"),De=document.getElementById("btn-reset-cam"),ge=document.getElementById("slider-godrays"),ve=document.getElementById("val-godrays"),ye=document.getElementById("slider-caustics"),Pe=document.getElementById("val-caustics"),_e=document.getElementById("input-emblem"),Oe=document.getElementById("chk-pointer");let Ge="okinawa",Je=!1;const mt=d=>{t.textContent=`${d.fps} FPS`,s.textContent=d.mode===5?"Kerama Blue":`${d.activeDrawnFish.toLocaleString()} Fish`,a.textContent=d.chapterName,Ge==="showcase"?(S.style.opacity=d.emblemAlpha.toFixed(3),S.style.transform=`translateY(${((1-d.emblemAlpha)*7).toFixed(1)}px)`):S.style.opacity="0",Je||(Y.value=d.seqTime.toFixed(2)),be.textContent=`${W0(d.seqTime)} / 00:26`,Se.textContent=d.playing?"❚❚":"▶"},ht=document.getElementById("boot-loader"),et=document.getElementById("boot-bar-fill"),tt=document.getElementById("boot-stage-text"),ft=document.getElementById("boot-pct-text");let xt=!1,Dt=0;const yi=()=>{xt||(xt=!0,Dt!==0&&(cancelAnimationFrame(Dt),Dt=0),et&&(et.style.width="100%"),ft&&(ft.textContent="100%"),tt&&(tt.textContent="準備完了！"),document.body.classList.add("app-ready"),ht&&(ht.classList.add("is-done"),window.setTimeout(()=>{ht.classList.add("hidden")},600)))};let te=null,Fe=null;const Ne=[0,350];for(let d=0;d<Ne.length;d++){if(f!==Za)return;if(Ne[d]>0){if(tt&&(tt.textContent="GPU描画コンテキストを復帰中…"),await new Promise($=>window.setTimeout($,Ne[d])),f!==Za)return;const j=e.cloneNode(!1);e.replaceWith(j),e=j}let C=!1;const v=j=>{const $=j.statusMessage??"";/Disabled|BindToCurrentSequence/i.test($)&&(C=!0)};e.addEventListener("webglcontextcreationerror",v,{once:!0});try{te=new R0(e,mt),te.start();break}catch(j){if(Fe=j,C)break}}if(!te){if(yi(),i){const d=window.location.href;i.innerHTML=`
        <div class="webgl-recover-title">⚠️ WebGL2（3D GPU描画）の初期化に失敗しました</div>
        <div class="webgl-recover-desc">
          スリープ復帰や複数タブの同時起動により、内蔵プレビューのGPUプロセスが一時的に停止している可能性があります。<br />
          不要なプレビュータブを閉じて「再読み込み」するか、通常のChrome / Edgeで開いてみてください。
        </div>
        <div class="webgl-recover-actions">
          <button type="button" id="btn-webgl-retry" class="webgl-recover-btn is-primary">🔄 再読み込みして復帰</button>
          <button type="button" id="btn-webgl-copy-url" class="webgl-recover-btn">📋 URLをコピー (${d})</button>
        </div>
      `,i.classList.remove("hidden"),document.getElementById("btn-webgl-retry")?.addEventListener("click",()=>{window.location.reload()});const C=document.getElementById("btn-webgl-copy-url");C?.addEventListener("click",()=>{navigator.clipboard?.writeText(d).then(()=>{C.textContent="✅ URLをコピーしました（ブラウザへ貼り付け）"})})}console.error(Fe);return}const at=performance.now();let li=0,Si=8;const Ii=()=>{if(xt)return;const d=te.getLoadingStatus(),C=Math.round(d.progress*100);Si=Math.max(Si,Math.min(99,C)),et&&(et.style.width=`${Si}%`),ft&&(ft.textContent=`${Si}%`),tt&&(tt.textContent=d.stageText);const v=performance.now()-at,j=te.getOkinawaWorld()!==null;if(te.areShadersReady()&&(d.ready||j&&v>4500||v>9500)&&(li++,li>=3)){yi();return}Dt=requestAnimationFrame(Ii)};Dt=requestAnimationFrame(Ii);const Xe=new Ih,ki=document.querySelectorAll("#force-preview-buttons [data-force]"),xi=d=>{ki.forEach(C=>C.classList.toggle("active",C.dataset.force===d))},Et=new N0(te,Xe,{onStateChange:d=>{g.textContent=String(d.spinCount),p.textContent=String(d.jackpotCount),x.classList.toggle("hidden",!d.isKakuhenMode),A.textContent=d.pushLabel,m.classList.toggle("urgent-push",d.pushUrgent),d.forcedPreviewReset&&xi("auto")}});Et.startLoop();const Ki=document.querySelectorAll("#padi-skill-tabs [data-skill]");let Zi="",Ni=null;const it=new G0(te,Xe,d=>{l.textContent=`${d.completedCount}/5`,I.textContent=d.allCertified?"🏆 OWD 全スキル認定!":`習得 ${d.completedCount} / 5`,I.classList.toggle("certified",d.allCertified),Ki.forEach(je=>{je.classList.toggle("active",je.dataset.skill===d.skillId)});const C=[["reg_clear","1"],["mask_clear","2"],["neutral_buoyancy","3"],["descent_ascent","4"],["out_of_air","5"]];for(const[je,yt]of C){const jt=document.getElementById(`chk-${je}`);if(jt){const Qt=d.completedSkills[je];jt.textContent=Qt?"✓":yt,jt.classList.toggle("done",Qt)}}W.textContent=d.skillTitle,w.textContent=d.stepBadge,y.textContent=d.coachMessage,d.progressPct!==null?(M.classList.remove("hidden"),P.style.width=`${d.progressPct}%`):M.classList.add("hidden"),d.alertMessage?(U.textContent=d.alertMessage,U.classList.remove("hidden")):U.classList.add("hidden"),d.handSignalBanner?(L.textContent=d.handSignalBanner,L.classList.remove("hidden")):L.classList.add("hidden"),H.textContent=d.depthM.toFixed(1),d.targetDepthM!==null?(G.textContent=`目標 ${d.targetDepthM.toFixed(1)}m`,G.classList.remove("hidden")):G.classList.add("hidden"),se.textContent=String(Math.round(d.ascentRateMpm)),Q.classList.toggle("danger",d.ascentWarning);const v=Math.min(100,d.ascentRateMpm/22*100);X.style.width=`${v.toFixed(0)}%`,X.classList.toggle("danger",d.ascentWarning),Z.textContent=d.usingOctopus?"BUDDY OCTO":"TANK SPG",ie.textContent=String(d.tankBar),ae.classList.toggle("danger",d.tankBar<=35&&!d.usingOctopus);const j=d.netBuoyancyL>=0?"+":"",$=Math.abs(d.netBuoyancyL)<=.32?"中性◎":"浮力";R.textContent=`${$} ${j}${d.netBuoyancyL.toFixed(1)}L`,K.textContent=`${d.lungPct}%`,oe.style.width=`${d.lungPct}%`,he.textContent=`${d.bcdPct}%`,me.style.width=`${d.bcdPct}%`,d.earStatus==="squeeze"?(_.textContent="要耳抜き!",_.className="dc-status-danger"):d.earStatus==="caution"?(_.textContent="耳抜き推奨",_.className="dc-status-warn"):(_.textContent="耳圧 OK",_.className="dc-status-ok");const we=d.stepActions.map(je=>`${je.id}:${je.label}:${je.emphasis??""}:${je.active?"1":"0"}`).join("|");if(we!==Zi){Zi=we,Ni=d.stepActions.find(je=>je.emphasis)?.id??d.stepActions[0]?.id??null,E.replaceChildren();for(const je of d.stepActions){const yt=document.createElement("button");yt.type="button",yt.dataset.stepAction=je.id,yt.className="padi-step-btn",je.emphasis&&yt.classList.add(je.emphasis),je.active&&yt.classList.add("is-active"),yt.textContent=je.label,E.appendChild(yt)}}});it.startLoop(),Ki.forEach(d=>{d.addEventListener("click",()=>{const C=d.dataset.skill??"reg_clear";it.selectSkill(C)})}),E.addEventListener("click",d=>{const C=d.target.closest("[data-step-action]");!C||!C.dataset.stepAction||it.handleStepAction(C.dataset.stepAction)}),document.getElementById("btn-scuba-inhale").addEventListener("click",()=>it.triggerInhale()),document.getElementById("btn-scuba-exhale").addEventListener("click",()=>it.triggerExhale("normal")),document.getElementById("btn-scuba-inflate").addEventListener("click",()=>it.adjustBcd(!0)),document.getElementById("btn-scuba-deflate").addEventListener("click",()=>it.adjustBcd(!1)),document.getElementById("btn-scuba-equalize").addEventListener("click",()=>it.triggerEqualize()),document.getElementById("btn-scuba-purge").addEventListener("click",()=>it.triggerPurgeButton()),document.getElementById("btn-scuba-ok").addEventListener("click",()=>it.triggerOkSignal());const Ys=document.getElementById("okinawa-hud"),qs=document.getElementById("okinawa-crosshair"),ji=document.getElementById("okinawa-nav-card"),Oi=document.getElementById("btn-toggle-dex"),Gi=document.getElementById("btn-collapse-nav"),Xs=document.getElementById("okinawa-controls-hint"),Ti=document.getElementById("okinawa-focus-bracket"),$s=document.getElementById("okinawa-bracket-label"),Ja=document.getElementById("okinawa-focus-card"),vr=document.getElementById("focus-okinawa-tag"),br=document.getElementById("focus-logged-badge"),wr=document.getElementById("focus-jp-name"),yr=document.getElementById("focus-sci-name"),Sr=document.getElementById("focus-size"),kr=document.getElementById("focus-dist"),xr=document.getElementById("focus-desc"),eo=document.getElementById("okinawa-loot-prompt"),Tr=document.getElementById("okinawa-loot-label"),Mr=document.getElementById("okinawa-loot-bar"),Ks=document.getElementById("okinawa-toast"),Pr=document.getElementById("okinawa-zone-name"),Ar=document.getElementById("okinawa-dex-count"),Zs=document.getElementById("okinawa-dex-panel"),js=document.getElementById("okinawa-sonar-hint"),zi=document.getElementById("okinawa-craft-panel"),Qs=document.getElementById("okinawa-craft-list"),Cr=document.getElementById("okinawa-o2-depth-pill"),Br=document.getElementById("okinawa-scuba-console"),Lr=document.getElementById("okinawa-loot-inv-pill"),Dr=document.getElementById("okinawa-prep-btn-label"),Er=document.getElementById("btn-okinawa-craft"),Js=document.getElementById("okinawa-o2-bar"),to=document.getElementById("okinawa-o2-text"),Rr=document.getElementById("okinawa-depth"),_r=document.getElementById("inv-scrap"),Fr=document.getElementById("inv-clay"),Ir=document.getElementById("inv-seaweed"),Nr=document.getElementById("inv-copper"),Or=document.getElementById("inv-iron"),Gr=document.getElementById("inv-pearl"),Qi=document.getElementById("btn-okinawa-light"),ea=document.getElementById("btn-okinawa-view"),zr=document.getElementById("okinawa-view-label"),io=document.getElementById("input-vrm-file"),so=document.getElementById("posture-deg-badge"),Ur=document.getElementById("posture-status-text"),Wr=document.getElementById("svg-diver-group"),Vr=document.getElementById("svg-leg-a"),Hr=document.getElementById("svg-leg-b"),Ji=document.getElementById("slider-body-trim"),ao=document.querySelectorAll("#posture-preset-buttons [data-trim]"),Yr=document.getElementById("keycap-w"),qr=document.getElementById("keycap-a"),Xr=document.getElementById("keycap-s"),$r=document.getElementById("keycap-d"),Kr=document.getElementById("keycap-up"),Zr=document.getElementById("keycap-down"),jr=document.getElementById("okinawa-dpad-widget"),Qr=document.getElementById("dpad-btn-w"),Jr=document.getElementById("dpad-btn-a"),el=document.getElementById("dpad-btn-s"),tl=document.getElementById("dpad-btn-d"),il=document.getElementById("dpad-btn-up"),oo=document.getElementById("dpad-btn-down"),ta=document.getElementById("btn-dpad-dash"),sl=document.getElementById("lbl-dpad-dash"),al=document.getElementById("lbl-dpad-up");let ia=!1;const no=document.getElementById("okinawa-air-label"),Jt=document.getElementById("okinawa-prep-panel"),ol=document.getElementById("prep-panel-title"),nl=document.getElementById("prep-top-bar"),rl=document.getElementById("prep-style-banner"),es=document.getElementById("btn-skip-all-prep"),ro=document.getElementById("prep-spg-badge"),ll=document.getElementById("prep-gear-count"),cl=document.getElementById("prep-wear-count"),hl=document.getElementById("prep-bwraf-count"),lo=document.querySelectorAll("#prep-tab-buttons [data-preptab]"),dl=document.getElementById("prep-pane-select"),ul=document.getElementById("prep-pane-gear"),ml=document.getElementById("prep-pane-bcd"),fl=document.getElementById("prep-pane-bwraf"),pl=document.getElementById("prep-pane-entry"),gl=document.getElementById("prep-pane-bar"),vl=document.getElementById("prep-pane-bbq"),co=document.querySelectorAll("#prep-pane-select [data-suitvar]"),ho=document.querySelectorAll("#prep-pane-select [data-bcdvar]"),uo=document.querySelectorAll("#prep-pane-select [data-finvar]"),mo=document.querySelectorAll("#prep-pane-bar [data-bardrink]"),bl=document.getElementById("lbl-bar-beer"),wl=document.querySelectorAll("#prep-pane-bwraf [data-bwraf]"),Ui=document.getElementById("okinawa-part-tooltip"),yl=document.getElementById("part-tooltip-title"),Sl=document.getElementById("part-tooltip-hint"),fo=document.querySelectorAll("#wb-focus-buttons [data-wbfocus]"),kl=document.getElementById("wb-sub-valve"),xl=document.getElementById("wb-sub-bcd"),Tl=document.getElementById("wb-sub-reg"),Ml=document.getElementById("wb-sub-lpi"),Pl=document.getElementById("wb-sub-spg"),Al=document.getElementById("wb-tel-turns"),Cl=document.getElementById("wb-tel-bar"),po=document.getElementById("wb-tel-seal"),go=document.getElementById("wb-status-stamp"),vo=document.getElementById("wb-status-blow"),bo=document.getElementById("wb-status-oring"),ts=document.getElementById("wb-status-bcd-align"),sa=document.getElementById("wb-status-bcd-height"),wo=document.getElementById("wb-status-cam-lock"),yo=document.getElementById("wb-status-dustcap"),is=document.getElementById("wb-status-reg-dir"),So=document.getElementById("wb-status-yoke"),Wt=document.getElementById("slider-wb-yoke"),ko=document.getElementById("wb-status-lpi"),xo=document.getElementById("wb-status-defog"),To=document.getElementById("wb-status-spg-face"),Mo=document.getElementById("wb-status-aircheck"),Bl=document.getElementById("wb-lbl-valve-slider"),Vt=document.getElementById("slider-wb-valve"),ss=document.getElementById("okinawa-buoyancy-badge"),Ll=document.getElementById("lbl-live-bcd-l"),aa=document.getElementById("btn-live-equalize"),oa=document.getElementById("btn-live-maskclear");let as=!1,os=!1,Rt="wb_valve";const na=document.getElementById("btn-wear-wetsuit"),Dl=document.getElementById("lbl-wear-wetsuit"),ra=document.getElementById("btn-wear-weights"),El=document.getElementById("lbl-wear-weights"),la=document.getElementById("btn-wear-bcd"),Rl=document.getElementById("lbl-wear-bcd"),ca=document.getElementById("btn-wear-maskfins"),_l=document.getElementById("lbl-wear-maskfins"),Po=document.getElementById("btn-bcd-waist"),Fl=document.getElementById("lbl-bcd-waist"),Ao=document.getElementById("btn-bcd-chest"),Il=document.getElementById("lbl-bcd-chest"),ns=document.getElementById("slider-bcd-shoulder"),Nl=document.getElementById("lbl-bcd-shoulder-pct"),Co=document.getElementById("lbl-bcd-shoulder-fit"),Ol=document.getElementById("lbl-bcd-weight"),Bo=document.getElementById("lbl-bcd-weight-fit"),Gl=document.getElementById("lbl-surf-bcd"),Lo=document.getElementById("btn-bwraf-ok"),zl=document.getElementById("lbl-bar-awamori"),Ul=document.getElementById("lbl-bar-seat-status"),ha=document.getElementById("btn-bar-sit-toggle"),rs=document.getElementById("btn-bar-bottle-zoom"),ls=document.getElementById("btn-bar-sip"),ei=document.getElementById("okinawa-wb-pin"),Wl=document.getElementById("okinawa-wb-pin-text"),Vl=document.getElementById("okinawa-wb-cam-bar"),Do=document.getElementById("btn-wb-cam-reset"),Eo=document.getElementById("btn-wb-cam-exit"),Hl=document.getElementById("prep-smart-guide"),Yl=document.getElementById("flow-pill-1"),ql=document.getElementById("flow-pill-2"),Xl=document.getElementById("flow-pill-3"),$l=document.getElementById("flow-pill-4"),Kl=document.getElementById("lbl-guided-badge"),Zl=document.getElementById("lbl-guided-desc"),cs=document.getElementById("btn-guided-next"),Ro=document.getElementById("btn-quick-wear-all");let ti="select",hs=!1,_o="",Fo="";const jl=document.getElementById("cnt-sf-gurukun"),Ql=document.getElementById("cnt-sf-irabucha"),Jl=document.getElementById("cnt-sf-taman"),ec=document.getElementById("cnt-sf-gaara"),tc=document.getElementById("cnt-sf-meebai"),ic=document.getElementById("cnt-sf-akamachi"),sc=document.getElementById("cnt-sf-shellfish"),ac=document.getElementById("cnt-sf-lobster"),oc=document.getElementById("cnt-sf-wagyu"),nc=document.getElementById("cnt-sf-skewer"),rc=document.getElementById("lbl-bbq-drink-status"),lc=document.getElementById("cnt-bbq-drink-sips"),da=document.getElementById("btn-bbq-pour-beer"),ua=document.getElementById("btn-bbq-pour-highball"),ma=document.getElementById("lbl-bbq-board-status"),cc=document.getElementById("cnt-bbq-plate"),hc=document.getElementById("lbl-bbq-eaten-badge"),Io=[document.getElementById("btn-grill-slot-0"),document.getElementById("btn-grill-slot-1"),document.getElementById("btn-grill-slot-2")],No=document.querySelectorAll("#bbq-lie-buttons [data-liespot]"),Oo=document.querySelectorAll("#bbq-seafood-buttons [data-seafood]"),dc=document.getElementById("okinawa-bottom-bar"),uc=document.getElementById("okinawa-posture-card"),mc=document.getElementById("okinawa-fishing-hud"),fc=document.getElementById("fish-hud-spot"),pc=document.getElementById("fish-hud-stats"),Go=document.getElementById("btn-fish-exit"),gc=document.getElementById("fish-rig-strip"),zo=document.querySelectorAll("#fish-rig-strip [data-fishrig]"),Uo=document.getElementById("fish-hud-status"),vc=document.getElementById("fish-cast-box"),bc=document.getElementById("fish-cast-pct"),Wo=document.getElementById("fish-cast-sweet"),wc=document.getElementById("fish-cast-power-fill"),yc=document.getElementById("fish-wait-box"),Sc=document.getElementById("fish-scanner-text"),kc=document.getElementById("fish-attract-fill"),xc=document.getElementById("fish-attract-pct"),Tc=document.getElementById("fish-fight-box"),Mc=document.getElementById("fish-fight-hint"),Pc=document.getElementById("fish-crit-badge"),Ac=document.getElementById("fish-drag-badge"),Cc=document.getElementById("fish-dist-text"),Vo=document.getElementById("fish-dir-banner"),Bc=document.getElementById("fish-stamina-fill"),Lc=document.getElementById("fish-stamina-pct"),Ho=document.getElementById("fish-tension-fill"),Dc=document.getElementById("fish-tension-pct"),Ec=document.getElementById("fish-progress-fill"),Rc=document.getElementById("fish-progress-pct"),_c=document.getElementById("fish-catch-card"),Yo=document.getElementById("fish-catch-rank"),Fc=document.getElementById("fish-catch-title"),qo=document.getElementById("fish-catch-perfect"),Ic=document.getElementById("fish-catch-record"),Nc=document.getElementById("fish-catch-note"),Xo=document.getElementById("btn-fish-go-bbq"),Ht=document.getElementById("btn-fish-left"),ds=document.getElementById("btn-fish-twitch"),ci=document.getElementById("btn-fish-primary"),Yt=document.getElementById("btn-fish-right"),Oc=document.getElementById("fish-zukan-strip"),us=document.getElementById("btn-okinawa-fish");let $o="";const Ko=document.getElementById("okinawa-okislot-hud"),Zo=document.getElementById("okislot-machine-badge"),fa=document.getElementById("btn-okislot-switch"),jo=document.getElementById("okislot-heaven-badge"),Qo=document.getElementById("okislot-1gren-badge"),Gc=document.getElementById("okislot-cnt-total"),zc=document.getElementById("okislot-cnt-big"),Uc=document.getElementById("okislot-cnt-reg"),Wc=document.getElementById("okislot-cnt-rate"),Vc=document.getElementById("okislot-cnt-games"),Hc=document.getElementById("okislot-cnt-credit"),Yc=document.getElementById("okislot-cnt-medals"),Jo=document.getElementById("okislot-history-strip"),en=document.getElementById("okislot-sidehint-badge"),qc=document.getElementById("okislot-bonus-bar-wrap"),Xc=document.getElementById("okislot-bonus-bar-title"),$c=document.getElementById("okislot-bonus-bar-nums"),Kc=document.getElementById("okislot-bonus-fill"),tn=document.getElementById("btn-okislot-insert"),sn=document.getElementById("btn-okislot-exit"),Zc=document.getElementById("okislot-status-banner"),jc=document.getElementById("okislot-status-text"),an=document.getElementById("okislot-payout-badge"),pa=document.getElementById("btn-okislot-primary"),ga=document.getElementById("btn-okislot-stop-0"),va=document.getElementById("btn-okislot-stop-1"),ba=document.getElementById("btn-okislot-stop-2"),Qc=document.getElementById("okislot-up-0"),Jc=document.getElementById("okislot-up-1"),eh=document.getElementById("okislot-up-2"),th=document.getElementById("okislot-sym-0"),ih=document.getElementById("okislot-sym-1"),sh=document.getElementById("okislot-sym-2"),ah=document.getElementById("okislot-lo-0"),oh=document.getElementById("okislot-lo-1"),nh=document.getElementById("okislot-lo-2"),ms=document.getElementById("btn-okislot-align"),wa=document.getElementById("btn-okinawa-okislot");let on="",At=null;const gt=(d,C=!1)=>{ti=d,lo.forEach(j=>j.classList.toggle("active",j.dataset.preptab===d)),dl.classList.toggle("hidden",d!=="select"),ul.classList.toggle("hidden",d!=="gear"),ml.classList.toggle("hidden",d!=="bcd"),fl.classList.toggle("hidden",d!=="bwraf"),pl.classList.toggle("hidden",d!=="entry"),gl.classList.toggle("hidden",d!=="bar"),vl.classList.toggle("hidden",d!=="bbq");const v=d==="bar"||d==="bbq";if(Hl.classList.toggle("hidden",v),nl.classList.toggle("hidden",v),ro.classList.toggle("hidden",v),z(ol,d==="bar"?"🍹 CHURA BAR カクテル＆ドリンク":d==="bbq"?"🍖 ビーチBBQ キッチン＆チル":"🤿 ダイビング器材セッティング"),At&&!C)if(d==="gear")At.setInspectFocus(Rt);else if(d==="bwraf")At.setInspectFocus("buddy_bwraf");else if(d==="bar"){const j=At.getInspectFocus();j!=="bar_seat"&&j!=="bar_bottles"&&j!=="okislot"&&At.teleportToSpot("chura_bar")}else if(d==="bbq")At.getInspectFocus()!=="bbq_station"&&At.teleportToSpot("beach_bbq");else{const j=At.getInspectFocus();j==="bar_seat"||j==="bar_bottles"?At.standUpFromBarStool():j!=="none"&&At.setInspectFocus("none")}},rh={scrap:"🔩スクラップ",clay:"🪨粘土",seaweed:"🌿海藻",copper:"🟠銅",iron:"⚪金属",pearl:"🦪黒真珠"},lh=[["manta","マンタ"],["turtle","ウミガメ"],["shark","ネムリブカ"],["gurukun","グルクン"],["napoleon","ナポレオン"],["clownfish","クマノミ"],["gardeneel","チンアナゴ"]];let nn="",rn="",ln="",cn=!1,hi=!1,Mi=!1,ya="none";const pt=document.getElementById("okinawa-dive-comp"),fs=document.getElementById("odc-drag-handle"),ch=document.getElementById("odc-temp"),hn=document.getElementById("odc-ai-badge"),Wi=document.getElementById("btn-odc-collapse"),dn=document.getElementById("btn-odc-close"),un=document.querySelectorAll("#odc-screen-tabs [data-dcscreen]"),Sa=document.getElementById("odc-alert-banner"),hh=document.getElementById("odc-pane-main"),dh=document.getElementById("odc-pane-compass"),uh=document.getElementById("odc-pane-profile"),mh=document.getElementById("odc-pane-log"),mn=document.getElementById("odc-mode-badge"),ka=document.getElementById("btn-odc-gas-quick"),fh=document.getElementById("odc-ata-text"),ph=document.getElementById("odc-depth"),ps=document.getElementById("odc-ndl-label"),gs=document.getElementById("odc-ndl-wrap"),vs=document.getElementById("odc-ndl"),bs=document.getElementById("odc-ndl-unit"),fn=document.getElementById("odc-time-label"),pn=document.getElementById("odc-time"),gh=document.getElementById("odc-max-depth"),gn=document.getElementById("odc-asc-sub-lbl"),vn=document.getElementById("odc-asc-rate"),bn=document.getElementById("odc-asc-side-lbl"),wn=document.getElementById("odc-air-sub-lbl"),yn=document.getElementById("odc-tank-gtr"),vh=document.getElementById("odc-po2"),bh=document.getElementById("odc-mini-compass-txt"),ws=document.getElementById("btn-odc-quick-lock"),wh=document.getElementById("odc-comp-deg"),yh=document.getElementById("odc-comp-card"),Sh=document.getElementById("odc-comp-landmark"),ys=document.getElementById("odc-compass-tape"),Sn=document.getElementById("odc-comp-steer-svg"),Pi=document.getElementById("btn-odc-lock-heading"),kh=document.getElementById("odc-avg-depth"),xh=document.getElementById("odc-cns-pct"),Th=document.getElementById("odc-mod-depth"),Mh=document.getElementById("odc-profile-area"),kn=document.getElementById("odc-profile-line"),xn=Array.from({length:8},(d,C)=>document.getElementById(`odc-zbar-${C}`)),Tn=document.querySelectorAll("#odc-gas-buttons [data-dcgas]"),xa=document.getElementById("odc-log-list"),Ph=Array.from({length:8},(d,C)=>document.getElementById(`odc-n2-${C}`)),Mn=Array.from({length:6},(d,C)=>document.getElementById(`odc-asc-${C}`)),Ta=document.getElementById("btn-odc-wrist-glance"),Pn=document.getElementById("btn-odc-cycle-screen"),Ss=document.getElementById("btn-okinawa-dc"),ks=d=>{const C=Math.floor(d/60),v=Math.floor(d%60);return`${String(C).padStart(2,"0")}:${String(v).padStart(2,"0")}`},z=(d,C)=>{d.textContent!==C&&(d.textContent=C)},Ze=(d,C)=>{d.className!==C&&(d.className=C)},F=new Qa(te,Xe,d=>{const C=d.inDivingMode,v=d.scubaPrep,j=d.bbqChill,$=d.fishing,we=d.okiSlot;C!==cn&&(cn=C,C?(Mi=!1,hi=!1,Jt.classList.add("hidden")):(hi=!1,Mi=!1,zi.classList.add("hidden"),Zs.classList.add("hidden"))),(we.active||$.active||v.seatedStoolIndex!==null||j.activeLieSpot!==null)&&(hi=!1),(we.active||$.active||j.activeLieSpot!==null)&&Jt.classList.add("hidden"),z(c,`${d.discoveredCount}/${d.totalSpeciesCount}`),z(u,String(d.totalCollected)),Ge==="okinawa"&&h.classList.toggle("hidden",!C),z(Pr,`📍 ${d.zoneName}`),z(Ar,`${d.discoveredCount}/${d.totalSpeciesCount}`),qs.classList.toggle("hidden",!C),Oi.classList.toggle("hidden",!C),C||Zs.classList.add("hidden"),ji.classList.toggle("hidden",we.active||$.active),z(Xs,C?"WASD: 遊泳 · Shift/C: 潜降 · Space: 浮上 · R/T: 給排気 · E: 耳抜き · G: ダイコン":"WASD: 移動 · ドラッグ: 360°視点 · Shift: ダッシュ · Space: ジャンプ · K: 釣り · V: 視点");for(const[q,fe]of lh){const ke=document.getElementById(`dex-${q}`);if(ke){const Re=d.discoveredSpecies[q];z(ke,Re?`✓ ${fe}`:`？ ${fe}`),ke.classList.contains("found")!==Re&&ke.classList.toggle("found",Re)}}if(d.focusedCreature){const q=d.focusedCreature;Ti.classList.remove("hidden"),Ti.style.left=`${(q.screenU*100).toFixed(1)}%`,Ti.style.top=`${(q.screenV*100).toFixed(1)}%`,z($s,q.species.jpName),Ja.classList.remove("hidden"),z(vr,q.species.okinawaTag),z(br,q.scanProgressPct>=100?"✓ 図鑑登録済":`スキャン中 ${q.scanProgressPct}%`),z(wr,q.species.jpName),z(yr,`${q.species.enName} · ${q.species.sciName}`),z(Sr,q.species.sizeText),z(kr,`距離 ${q.distanceM.toFixed(1)}m · 水深 ${q.depthM.toFixed(1)}m`),z(xr,q.species.description)}else Ti.classList.add("hidden"),Ja.classList.add("hidden");if(d.targetedLoot){const q=d.targetedLoot;eo.classList.remove("hidden"),z(Tr,q.inRange?`🪝 [左クリック長押し / F] ${q.name} を採集 (${q.distanceM.toFixed(1)}m)`:`👀 ${q.name} — あと少し近づくと採集可能 (${q.distanceM.toFixed(1)}m)`),Mr.style.width=`${q.harvestPct}%`}else eo.classList.add("hidden");d.pickupToast?(z(Ks,d.pickupToast),Ks.classList.remove("hidden")):Ks.classList.add("hidden"),C&&d.sonarHint?(z(js,d.sonarHint),js.classList.remove("hidden")):js.classList.add("hidden");const je=`${d.oxygenPct}%`;Js.style.width!==je&&(Js.style.width=je),Js.classList.toggle("low",d.oxygenPct<=25),v.wearingScubaUnit&&v.gearSteps.valve_open?(z(no,"🤿 TANK SPG"),z(to,`${v.currentTankBar} bar`)):(z(no,"🫁 素潜り息"),z(to,d.atSurface?"45s 満タン":`残り ${v.apneaSecLeft}s`)),z(Rr,d.depthM.toFixed(1)),z(_r,String(d.inventory.scrap)),z(Fr,String(d.inventory.clay)),z(Ir,String(d.inventory.seaweed)),z(Nr,String(d.inventory.copper)),z(Or,String(d.inventory.iron)),z(Gr,String(d.inventory.pearl)),Qi.classList.toggle("ok-btn",d.flashlightOn),z(zr,d.cameraMode==="tpv"?v.wearingScubaUnit?"三人称 装備":v.wearingWetsuit?"三人称 ウェット":"三人称 水着":v.wearingMaskAndFins?"一人称 マスク":"一人称 裸眼"),ea.classList.toggle("ok-btn",d.cameraMode==="tpv");const yt=d.bodyTrimDeg,jt=d.trimTone==="streamline"?"水平 ◎":d.trimTone==="diagonal"?"斜め":"垂直";z(so,`${yt}° ${jt}`),Ze(so,`posture-badge ${d.trimTone}`),z(Ur,`${d.trimStatusLabel} · VRM: ${d.vrmName}`),Wr.setAttribute("transform",`rotate(${-yt} 64 74)`);const Qt=Math.sin(d.kickPhase)*(1+8.5*d.swimEffort);Vr.setAttribute("transform",`rotate(${Qt.toFixed(1)} 53 74)`),Hr.setAttribute("transform",`rotate(${(-Qt).toFixed(1)} 53 74)`),ia||(Ji.value=String(yt)),ao.forEach(q=>{const fe=q.dataset.trim;d.trimMode==="auto"?q.classList.toggle("active",fe==="auto"):q.classList.toggle("active",fe!=="auto"&&Math.abs(Number(fe)-yt)<=8)}),Yr.classList.toggle("pressed",d.activeMoveKeys.w),qr.classList.toggle("pressed",d.activeMoveKeys.a),Xr.classList.toggle("pressed",d.activeMoveKeys.s),$r.classList.toggle("pressed",d.activeMoveKeys.d),Kr.classList.toggle("pressed",d.activeMoveKeys.up),Zr.classList.toggle("pressed",d.activeMoveKeys.down),Qr.classList.toggle("pressed",d.activeMoveKeys.w),Jr.classList.toggle("pressed",d.activeMoveKeys.a),el.classList.toggle("pressed",d.activeMoveKeys.s),tl.classList.toggle("pressed",d.activeMoveKeys.d),il.classList.toggle("pressed",d.activeMoveKeys.up),oo.classList.toggle("pressed",d.activeMoveKeys.down),ta.classList.toggle("active",d.activeMoveKeys.dash),z(sl,d.activeMoveKeys.dash?"早歩きON":"早歩き");const si=v.inspectFocus==="wb_valve"||v.inspectFocus==="wb_bcd"||v.inspectFocus==="wb_reg"||v.inspectFocus==="wb_lpi"||v.inspectFocus==="wb_rinse"||v.inspectFocus==="wb_spg"||v.inspectFocus==="buddy_bwraf";Vl.classList.toggle("hidden",!si);const pi=v.guidedStep,Zn=!!(v.hoveredPart&&pi.pinVisible&&pi.targetPartId===v.hoveredPart.id);if(pi.pinVisible&&pi.pinLabel?(ei.classList.remove("hidden"),ei.classList.toggle("is-hovered",Zn),ei.style.left=`${(pi.pinScreenU*100).toFixed(1)}%`,ei.style.top=`${(pi.pinScreenV*100).toFixed(1)}%`,z(Wl,pi.pinLabel)):(ei.classList.add("hidden"),ei.classList.remove("is-hovered")),v.hoveredPart&&!Zn?(Ui.classList.remove("hidden"),Ze(Ui,`okinawa-part-tooltip ${v.hoveredPart.statusTone}`),Ui.style.left=`${(v.hoveredPart.screenU*100).toFixed(1)}%`,Ui.style.top=`${(v.hoveredPart.screenV*100).toFixed(1)}%`,z(yl,v.hoveredPart.title),z(Sl,v.hoveredPart.actionHint)):Ui.classList.add("hidden"),v.hoveredPart?e.style.cursor!=="pointer"&&(e.style.cursor="pointer"):e.style.cursor==="pointer"&&(e.style.cursor=""),d.depthM<=.45)z(ss,"⚖️ 陸上・水面"),Ze(ss,"buoy-live-pill");else{const q=v.netBuoyancyKgf,fe=q>=0?"+":"",ke=Math.abs(q)<=.55;z(ss,ke?`⚖️ 中性 ${fe}${q.toFixed(1)}kg ◎`:q>0?`🎈 浮力 +${q.toFixed(1)}kg`:`⚓ 沈降 ${q.toFixed(1)}kg`),Ze(ss,`buoy-live-pill ${ke?"ok":"warn"}`)}if(z(Ll,`${v.bcdActualLiters.toFixed(1)}L`),aa.classList.toggle("alert-pulse",v.earSqueezePct>=30),oa.classList.toggle("alert-pulse",v.maskFogPct>=18),v.inspectFocus!==ya){const q=ya;ya=v.inspectFocus,si?Jt.classList.remove("hidden"):v.inspectFocus==="bbq_station"?(Jt.classList.remove("hidden"),gt("bbq",!0)):v.inspectFocus==="none"&&(q==="bbq_station"||(q==="wb_valve"||q==="wb_bcd"||q==="wb_reg"||q==="wb_lpi"||q==="wb_rinse"||q==="wb_spg")&&ti==="gear")&&Jt.classList.add("hidden")}v.inspectFocus==="wb_valve"||v.inspectFocus==="wb_bcd"||v.inspectFocus==="wb_reg"||v.inspectFocus==="wb_lpi"||v.inspectFocus==="wb_rinse"||v.inspectFocus==="wb_spg"?(Rt=v.inspectFocus==="wb_rinse"?"wb_lpi":v.inspectFocus,ti!=="gear"&&gt("gear",!0)):v.inspectFocus==="buddy_bwraf"&&ti!=="bwraf"?gt("bwraf",!0):v.inspectFocus==="bbq_station"&&ti!=="bbq"&&gt("bbq",!0);const Wa=(v.wearingWetsuit?1:0)+(v.wearingWeightBelt?1:0)+(v.wearingScubaUnit?1:0)+(v.wearingMaskAndFins?1:0),_s=v.allGearAssembled&&Wa===4&&v.bwrafChecked&&v.shoulderFitStatus==="optimal",jn=[v.diveStyleLabel,v.currentTankBar,v.completedGearSteps,Wa,v.completedBwrafSteps,v.suitVariant,v.bcdVariant,v.finVariant,v.activeBarDrink??"",v.hasCompletedDive?1:0,v.seatedStoolIndex??-1,v.barPrepActive?1:0,v.barSipsLeft,v.inspectFocus,v.guidedStep.stepBadge,v.guidedStep.buttonLabel,ti,Rt,v.tankStampVerified?1:0,v.valveBlownOut?1:0,v.oringCondition,v.bcdPlacedOnTank?1:0,v.bcdAzimuthDeg,v.bcdHeightCm,v.camBuckleLocked?1:0,v.dustCapRemoved?1:0,v.regPlacedOnValve?1:0,v.regOrientationReversed?1:0,v.yokeScrewPct,v.yokePressureLocked?1:0,v.lpiConnected?1:0,v.spgFaceDown?1:0,v.valveTurns,v.needleBar,v.yokeLeaking?1:0,v.airFlowVerified?1:0,v.maskDefogged?1:0,v.wearingWetsuit?1:0,v.wearingWeightBelt?1:0,v.wearingScubaUnit?1:0,v.wearingMaskAndFins?1:0,v.gearSteps.tank_check?1:0,v.gearSteps.bcd_mount?1:0,v.gearSteps.reg_first_stage?1:0,v.gearSteps.lpi_connect?1:0,v.gearSteps.valve_open?1:0,v.bwrafSteps.b?1:0,v.bwrafSteps.w?1:0,v.bwrafSteps.r?1:0,v.bwrafSteps.a?1:0,v.bwrafSteps.f?1:0,v.waistStrapLocked?1:0,v.chestStrapLocked?1:0,v.shoulderStrapPct,v.weightKg,v.bcdSurfaceAirPct,hs?1:0,as?1:0,os?1:0].join("|");if(jn!==_o){_o=jn,rl.textContent=_s?`✅ 講習準備オールOK！(${v.currentTankBar} bar · SAC ${v.sacLpm.toFixed(0)}L/分) — ④からエントリーしよう！`:v.diveStyleLabel,es.classList.toggle("completed",_s),es.textContent=_s?"✓ 全準備＆装着完了（200 bar）":"⏭️ 講習スキップ（選択器材で一括装着）",ro.textContent=v.wearingScubaUnit?v.currentTankBar>0?`🤿 ${v.currentTankBar} bar ◎`:"🔧 未開栓 0 bar":v.needleBar>5?`📟 作業台 ${v.needleBar} bar`:v.wearingWetsuit?"👕 スーツ着用済":"👙 水着・未準備",ll.textContent=`${v.completedGearSteps}/5`,cl.textContent=`${Wa}/4`,hl.textContent=`${v.completedBwrafSteps}/5`;const q=v.guidedStep,fe=(Be,lt,ai)=>{const It=q.phaseIndex>lt||lt===4&&_s,Fh=!It&&q.phaseIndex===lt;Be.textContent=It?`✓ ${ai}`:ai,Be.className=`flow-stage-pill${It?" done":Fh?" active":""}`};if(fe(Yl,1,"①組立"),fe(ql,2,"②着用"),fe(Xl,3,"③BWRAF"),fe($l,4,"④海へ！"),Kl.textContent=q.stepBadge,Zl.textContent=q.instruction,cs.textContent=q.buttonLabel,cs.classList.toggle("ready-ok",q.phaseIndex===4),fo.forEach(Be=>{const lt=Be.dataset.wbfocus;Be.classList.toggle("active",lt==="none"?v.inspectFocus==="none":lt===Rt&&v.inspectFocus!=="none")}),kl.classList.toggle("hidden",Rt!=="wb_valve"),xl.classList.toggle("hidden",Rt!=="wb_bcd"),Tl.classList.toggle("hidden",Rt!=="wb_reg"),Ml.classList.toggle("hidden",Rt!=="wb_lpi"),Pl.classList.toggle("hidden",Rt!=="wb_spg"),Al.textContent=v.valveTurns.toFixed(2),Cl.textContent=String(v.needleBar),po.textContent=v.yokeLeaking?"🚨 高圧エア漏れ中！":v.needleBar>=175?"✅ 気密OK":"⭕ 気密待機",po.style.color=v.yokeLeaking?"#ffb26b":"#8effd6",go.textContent=v.tankStampVerified?"✓ 2026.08合格 (200bar)":"未確認 (3D刻印をクリック)",go.className=v.tankStampVerified?"":"warn",vo.textContent=v.valveBlownOut?"✓ ブロー清掃済":"未実施",vo.className=v.valveBlownOut?"":"warn",bo.textContent=v.oringCondition==="clean_seated"?"⭕ 新品Oリング密着◎":"⚠️ 塩粒・傷はみ出し！",bo.className=v.oringCondition==="clean_seated"?"":"warn",!v.bcdPlacedOnTank)ts.textContent="作業台上（未装着）",ts.className="warn",sa.textContent="—";else{const Be=Math.abs(v.bcdAzimuthDeg)<=22;ts.textContent=Be?`✓ バルブ穴正面 (${v.bcdAzimuthDeg}°)`:`⚠️ ${v.bcdAzimuthDeg>0?"+":""}${v.bcdAzimuthDeg}° ズレ`,ts.className=Be?"":"warn";const lt=Math.abs(v.bcdHeightCm)<=3;sa.textContent=lt?`✓ 肩ライン一致 (${v.bcdHeightCm>=0?"+":""}${v.bcdHeightCm.toFixed(1)}cm)`:`⚠️ ${v.bcdHeightCm>=0?"+":""}${v.bcdHeightCm.toFixed(1)}cm (${v.bcdHeightCm<0?"低すぎ＝頭ぶつけ":"高すぎ"})`,sa.className=lt?"":"warn"}wo.textContent=v.camBuckleLocked?"🔒 2段階ロック完了◎":"🔓 レバー未ロック",wo.className=v.camBuckleLocked?"":"warn",yo.textContent=v.dustCapRemoved?"✓ 取り外し済":"🎩 キャップ装着中",yo.className=v.dustCapRemoved?"":"warn";const ke=document.getElementById("btn-wb-dustcap");ke&&(ke.textContent=v.dustCapRemoved?"🎩 水洗い用にキャップ閉める":"🎩 ① 黒いダストキャップを外す",ke.classList.toggle("ok",!v.dustCapRemoved&&!v.regPlacedOnValve)),v.regPlacedOnValve?(is.textContent=v.regOrientationReversed?"⚠️ 左右逆！（左レギュ/右SPG）":"✓ 右＝レギュ ／ 左＝SPG＆LPI",is.className=v.regOrientationReversed?"warn":""):(is.textContent="作業台上（未装着）",is.className="warn");const Re=v.yokeScrewPct>=62&&v.yokeScrewPct<=90;So.textContent=v.yokePressureLocked?`⛔ ${v.needleBar}bar 高圧ロック中 (${v.yokeScrewPct}%)`:Re?`✓ 指2本手締め適正 (${v.yokeScrewPct}%)`:v.yokeScrewPct>90?`⚠️ 締めすぎ注意 (${v.yokeScrewPct}%)`:`⚠️ 緩すぎ (${v.yokeScrewPct}% → エア漏れ)`,So.className=Re?"":"warn",as||(Wt.value=String(v.yokeScrewPct),Wt.dataset.prev=String(v.yokeScrewPct)),ko.textContent=v.lpiConnected?"🔌 カチッとロック済◎":"未接続（パワー給気不可）",ko.className=v.lpiConnected?"":"warn",xo.textContent=v.maskDefogged?"💧 曇り止め＆水すすぎ済◎":"未実施（潜ると曇る）",xo.className=v.maskDefogged?"":"warn",To.textContent=v.spgFaceDown?"🛡️ ガラス面伏せ（安全）":"📟 文字盤表向き",To.className="";const ze=v.valveTurns>=2.4;if(Mo.textContent=v.airFlowVerified?`✓ 全開(${v.valveTurns.toFixed(1)}回)・針不動OK！`:v.valveTurns>.05&&!ze?`⚠️ 半開き(${v.valveTurns.toFixed(1)}回)！吸うと針急落`:`${v.valveTurns.toFixed(2)}回転 · 吸気未確認`,Mo.className=v.airFlowVerified?"":"warn",Bl.textContent=`${v.valveTurns.toFixed(2)} 回転`,!os){const Be=String(Math.round(v.valveTurns*100));Vt.value=Be,Vt.dataset.prev=Be}co.forEach(Be=>Be.classList.toggle("active",v.wearingWetsuit&&Be.dataset.suitvar===v.suitVariant)),ho.forEach(Be=>Be.classList.toggle("active",Be.dataset.bcdvar===v.bcdVariant)),uo.forEach(Be=>Be.classList.toggle("active",Be.dataset.finvar===v.finVariant)),mo.forEach(Be=>Be.classList.toggle("done",Be.dataset.bardrink===v.activeBarDrink)),zl.textContent="🍶 琉球泡盛 古酒ロック・手吹き琉球グラス（かち割りロックアイス・3口で乾杯！）",bl.textContent="🍻 極冷・神泡アイランド生ドラフト（7:3神泡・結露中ジョッキ・3口でグイッと！）";const Ye=v.seatedStoolIndex!==null;ha.textContent=Ye?`🚶 席 #${(v.seatedStoolIndex??0)+1} から立つ`:"🪑 カウンターに座る",rs.textContent=v.inspectFocus==="bar_bottles"?"🪑 席視点に戻る":"🔍 酒瓶・棚を拡大",rs.classList.toggle("ok",v.inspectFocus==="bar_bottles");const $e=v.activeBarDrink!==null&&!v.barPrepActive;ls.disabled=!$e,ls.textContent=v.barPrepActive?"🍸 注ぎ中…":$e?v.barSipsLeft>0?`🍹 一口飲む (中身 ${v.barSipsLeft}/3)`:"🔄 おかわりを注ぐ (0/3 空)":"🍹 一口飲む (Space)",Ul.textContent=v.barPrepActive?"🍸 バーテンダーが目の前でシェイク＆注ぎ中…！":Ye?v.activeBarDrink?v.barSipsLeft>0?`🪑 席 #${(v.seatedStoolIndex??0)+1} 着席中 · 中身 ${v.barSipsLeft}/3（グラスクリック / Space で1/3ずつ飲めるよ！）`:`🪑 席 #${(v.seatedStoolIndex??0)+1} 着席中 · グラスが空（0/3）になったよ！クリックでおかわり注文もOK♪`:`🪑 席 #${(v.seatedStoolIndex??0)+1} 着席中 · カウンターのボトル・サーバー・メニューから注文しよう！`:v.activeBarDrink&&v.barSipsLeft>0?`🍹 グラス片手に散策中（中身 ${v.barSipsLeft}/3 · Fキーまたは『一口飲む』ボタンで飲めるよ！）`:"🪑 3Dスツールをクリック（またはEキー）してカウンター席に座ろう！";const Te=[["tank_check","1"],["bcd_mount","2"],["reg_first_stage","3"],["lpi_connect","4"],["valve_open","5"]];for(const[Be,lt]of Te){const ai=v.gearSteps[Be],It=document.getElementById(`gchk-${Be}`);It&&(It.textContent=ai?"✓":lt,It.parentElement?.classList.toggle("done",ai))}const qe=[["b","B"],["w","W"],["r","R"],["a","A"],["f","F"]];for(const[Be,lt]of qe){const ai=v.bwrafSteps[Be],It=document.getElementById(`bwchk-${Be}`);It&&(It.textContent=ai?"✓":lt,It.parentElement?.classList.toggle("done",ai))}na.classList.toggle("locked",v.wearingWetsuit),Dl.textContent=v.wearingWetsuit?"✓ 着用済":"👙水着",ra.classList.toggle("locked",v.wearingWeightBelt),El.textContent=v.wearingWeightBelt?`✓ ${v.weightKg}kg装着`:"作業台上",la.classList.toggle("locked",v.wearingScubaUnit),Rl.textContent=v.wearingScubaUnit?"✓ 背負い済":"作業台上",ca.classList.toggle("locked",v.wearingMaskAndFins),_l.textContent=v.wearingMaskAndFins?"✓ 装着済":"作業台上",Po.classList.toggle("locked",v.waistStrapLocked),Fl.textContent=v.waistStrapLocked?"✓ 密着固定済":"未固定",Ao.classList.toggle("locked",v.chestStrapLocked),Il.textContent=v.chestStrapLocked?"✓ ロック済":"未固定",hs||(ns.value=String(v.shoulderStrapPct)),Nl.textContent=`${v.shoulderStrapPct}%`,Co.textContent=v.shoulderFitLabel,Co.className=`bcd-fit-note ${v.shoulderFitStatus==="optimal"?"ok":"warn"}`,Ol.textContent=`${v.weightKg} kg`,Bo.textContent=v.weightFitLabel,Bo.className=`bcd-fit-note ${v.weightFitStatus==="optimal"?"ok":"warn"}`,Gl.textContent=`${v.bcdSurfaceAirPct}%`,Lo.textContent=v.bwrafChecked?"✓ BWRAF全5項目完了":"👌 BWRAF 5項目を一括OK"}const Qn=[j.seafoodStock.gurukun,j.seafoodStock.irabucha,j.seafoodStock.taman,j.seafoodStock.gaara,j.seafoodStock.meebai,j.seafoodStock.akamachi,j.seafoodStock.shellfish,j.seafoodStock.lobster,j.seafoodStock.wagyu,j.seafoodStock.skewer,j.pairingDrink,j.pairingSipsLeft,j.boardKind??"-",j.boardCutsDone,j.boardFilleted?1:0,j.platedCount,j.totalBbqEaten,j.bbqBuffActive?1:0,j.activeLieSpot??"-",...j.grillSlots.map(q=>`${q.kind??"-"}:${q.state}:${Math.floor(q.cookPct/5)}`)].join("|");if(Qn!==Fo){Fo=Qn,jl.textContent=String(j.seafoodStock.gurukun),Ql.textContent=String(j.seafoodStock.irabucha),Jl.textContent=String(j.seafoodStock.taman),ec.textContent=String(j.seafoodStock.gaara),tc.textContent=String(j.seafoodStock.meebai),ic.textContent=String(j.seafoodStock.akamachi),sc.textContent=String(j.seafoodStock.shellfish),ac.textContent=String(j.seafoodStock.lobster),oc.textContent=String(j.seafoodStock.wagyu),nc.textContent=String(j.seafoodStock.skewer),rc.textContent=j.pairingSipsLeft>0?`${j.pairingDrinkLabel} (${j.pairingSipsLeft}/3)`:`${j.pairingDrinkLabel}（空・おかわりOK!）`,lc.textContent=String(j.pairingSipsLeft),da.classList.toggle("ok",j.pairingDrink==="beer"),ua.classList.toggle("ok",j.pairingDrink==="highball"),Oo.forEach(q=>{const fe=q.dataset.seafood;q.classList.toggle("is-empty",j.seafoodStock[fe]<=0)}),j.boardKind?j.boardFilleted?ma.textContent=`✨ ${j.boardName}（焼き網へ！）`:ma.textContent=`🔪 ${j.boardName} (${j.boardCutsDone}/${j.boardCutsNeeded})`:ma.textContent="食材を選んで乗せよう",cc.textContent=String(j.platedCount),hc.textContent=j.bbqBuffActive?`🔥 実食 ${j.totalBbqEaten}皿 · スタミナUP中`:`実食 ${j.totalBbqEaten}皿`;for(let q=0;q<3;q++){const fe=j.grillSlots[q],ke=Io[q];ke.className=`bbq-slot-chip state-${fe.state}`,fe.kind?fe.state==="golden"?ke.textContent=`🍖 ${fe.name.slice(0,4)} 食べ頃!`:fe.state==="flip_ready"?ke.textContent=`🥢 ${fe.name.slice(0,4)} 裏返す!`:fe.state==="burnt"?ke.textContent=`💨 ${fe.name.slice(0,4)} 焦げ`:ke.textContent=`🔥 ${fe.name.slice(0,4)} ${fe.cookPct}%`:ke.textContent=`網${q+1} 空き`}No.forEach(q=>{q.classList.toggle("locked",q.dataset.liespot===j.activeLieSpot)})}if(mc.classList.toggle("hidden",!$.active),us.classList.toggle("ok-btn",$.active),$.active){z(fc,$.spotLabel),z(pc,`釣果 ${$.totalCaught}尾 · 地魚図鑑 ${$.caughtSpeciesCount}/6種`),z(Uo,$.statusText);const q=$.phase==="ready"&&$.castCharging&&$.castPowerPct>=$.sweetSpotMinPct&&$.castPowerPct<=$.sweetSpotMaxPct;Ze(Uo,$.phase==="bite"?"fish-status-banner bite":$.phase==="nibble"?"fish-status-banner nibble":q||$.phase==="casting"&&$.lastCastQuality==="perfect"?"fish-status-banner perfect":"fish-status-banner");const fe=$.phase==="ready"||$.phase==="landed";gc.classList.toggle("hidden",!fe),fe&&zo.forEach(Te=>{Te.classList.toggle("active",Te.dataset.fishrig===$.rigId)});const ke=$.phase==="ready"||$.phase==="casting";if(vc.classList.toggle("hidden",!ke),ke){Wo.style.left=`${$.sweetSpotMinPct}%`,Wo.style.width=`${Math.max(4,$.sweetSpotMaxPct-$.sweetSpotMinPct)}%`;const Te=$.castCharging?$.castPowerPct:$.phase==="casting"?$.lastCastQuality==="perfect"?80:70:0;wc.style.width=`${Te}%`,z(bc,$.castCharging?`POWER ${$.castPowerPct}% · 潮目(${$.sweetSpotMinPct}-${$.sweetSpotMaxPct}%)`:$.phase==="casting"&&$.lastCastQuality==="perfect"?"🎯 PERFECT CAST!! 潮目命中！":`緑の潮目ゾーン(${$.sweetSpotMinPct}-${$.sweetSpotMaxPct}%)で離そう`)}const Re=$.phase==="waiting"||$.phase==="nibble";yc.classList.toggle("hidden",!Re),Re&&(z(Sc,$.underwaterScannerText),kc.style.width=`${$.attractionPct}%`,z(xc,`${$.attractionPct}%`)),Tc.classList.toggle("hidden",$.phase!=="fighting"),$.phase==="fighting"&&(z(Mc,$.hookedFishHint??"🐟 元気いっぱいの沖縄地魚だ！"),Pc.classList.toggle("hidden",!$.criticalHooked),Ac.classList.toggle("hidden",!$.dragScreaming),z(Cc,`残り ${$.fishDistM.toFixed(1)}m`),z(Vo,$.fightDirectionBanner),Ze(Vo,$.counterActive?"fish-dir-banner counter-ok":$.rootDiveAlert?"fish-dir-banner root-warn":"fish-dir-banner"),Bc.style.width=`${$.staminaPct}%`,z(Lc,`${$.staminaPct}%`),Ho.style.width=`${$.tensionPct}%`,Ze(Ho,`fish-bar-fill ${$.tensionTone}`),z(Dc,`${$.tensionPct}%`),Ec.style.width=`${$.reelProgressPct}%`,z(Rc,`${$.reelProgressPct}%`));const ze=$.phase==="landed"&&$.lastCatch!==null;if(_c.classList.toggle("hidden",!ze),ze&&$.lastCatch){const Te=$.lastCatch,qe="★".repeat(Te.stars),Be=Te.rank==="SS"?"👑SS ぬし級":Te.rank==="S"?"🏆S 大物":`${Te.rank}ランク`;z(Yo,Be),Ze(Yo,`fish-rank-badge rank-${Te.rank.toLowerCase()}`),z(Fc,`${qe} ${Te.jpName}  ${Te.lengthCm.toFixed(1)}cm · ${Te.weightKg.toFixed(2)}kg`);const lt=Te.wasPerfectCast||Te.wasCriticalHook;qo.classList.toggle("hidden",!lt),lt&&z(qo,Te.wasPerfectCast&&Te.wasCriticalHook?"🎯潮目×⚡鬼アワセ":Te.wasPerfectCast?"🎯潮目ドンピシャ":"⚡鬼アワセ成功"),Ic.classList.toggle("hidden",!Te.isNewRecord),z(Nc,`${Te.culinaryNote}（${Te.rigLabel}で釣獲）`)}const Ye=$.phase==="ready"||$.phase==="landed"||$.phase==="fighting";Ht.classList.toggle("hidden",!Ye),Yt.classList.toggle("hidden",!Ye),Ye&&($.phase==="fighting"?(z(Ht,"◀ 左いなし (A)"),z(Yt,"右いなし (D) ▶"),Ze(Ht,$.rodLeanDir<0?"fish-side-btn active-lean":$.swimDir>0?"fish-side-btn cue-pulse":"fish-side-btn"),Ze(Yt,$.rodLeanDir>0?"fish-side-btn active-lean":$.swimDir<0?"fish-side-btn cue-pulse":"fish-side-btn")):(z(Ht,"◀ 左狙い (A)"),z(Yt,"右狙い (D) ▶"),Ze(Ht,$.rodLeanDir<0?"fish-side-btn active-lean":"fish-side-btn"),Ze(Yt,$.rodLeanDir>0?"fish-side-btn active-lean":"fish-side-btn"))),ds.classList.toggle("hidden",!Re),Re&&z(ds,$.rigEnticeLabel),z(ci,$.actionButtonLabel),Ze(ci,$.phase==="bite"||q?"fish-primary-btn bite-now":"fish-primary-btn");const $e=$.zukan.map(Te=>`${Te.kind}:${Te.bestCm}:${Te.bestRank??"-"}`).join("|");$e!==$o&&($o=$e,Oc.innerHTML=$.zukan.map(Te=>Te.caught?`<div class="fish-zukan-chip caught" title="自己ベスト: ${Te.bestCm.toFixed(1)}cm / ${Te.bestKg.toFixed(2)}kg [${Te.bestRank}]"><span>${"★".repeat(Math.min(3,Te.stars))}${Te.shortName}</span><strong>${Te.bestCm.toFixed(0)}cm ${Te.bestRank??""}</strong></div>`:`<div class="fish-zukan-chip"><span>？ ${Te.shortName}</span><strong>未釣獲</strong></div>`).join(""))}const Jn=!zi.classList.contains("hidden"),Eh=!we.active&&!$.active&&(C?!Mi:hi);Ko.classList.toggle("hidden",!we.active),dc.classList.toggle("hidden",we.active||$.active),uc.classList.toggle("hidden",!C||we.active||$.active);const Rh=we.active||si||v.inspectFocus==="bar_bottles"||v.inspectFocus==="bbq_station"||$.active&&$.phase!=="ready"&&$.phase!=="landed";if(jr.classList.toggle("hidden",Rh),z(al,C?"▲ 浮上":"⬆ ジャンプ"),oo.classList.toggle("hidden",!C),pt.classList.toggle("hidden",!Eh),Cr.classList.toggle("hidden",!C),Br.classList.toggle("hidden",!C),Lr.classList.toggle("hidden",!C&&!Jn),Ss.classList.toggle("hidden",!C&&!hi),Qi.classList.toggle("hidden",!C),Er.classList.toggle("hidden",!C&&!Jn),us.classList.toggle("hidden",C),wa.classList.toggle("hidden",C),z(Dr,C?"🤿 器材・エントリー":"🤿 ダイビング準備"),we.active){Ko.classList.toggle("hibiscus-lit",we.hibiscusLit),z(Zo,`🌺 30Φ 華閃光 BLACK-30 · ${we.machineNo}番台`),z(fa,we.machineNo===1?"⇄ 2番台へ":"⇄ 1番台へ"),jo.classList.toggle("hidden",!we.heavenMode),we.heavenMode&&z(jo,`🌺 32G天国 (${we.gamesSinceBonus}/32G)`),Qo.classList.toggle("hidden",we.oneGRenStock<=0),we.oneGRenStock>0&&z(Qo,`🌈🌺 1G連ストック ×${we.oneGRenStock}`),z(Gc,String(we.totalSpins)),z(zc,String(we.bigCount)),z(Uc,String(we.regCount)),z(Wc,we.combinedRateLabel),z(Vc,we.activeBonus?"BONUS":`${we.gamesSinceBonus}G`),z(Hc,String(we.credit));const q=we.diffMedals>=0?`+${we.diffMedals}`:`${we.diffMedals}`;z(Yc,`${we.medals}枚 (${q})`);const fe=we.history.map(qe=>`${qe.kind}:${qe.games}`).join("|");fe!==on&&(on=fe,Jo.replaceChildren(),we.history.forEach((qe,Be)=>{const lt=document.createElement("span");lt.className=`okislot-hist-chip ${qe.kind==="BIG"?"is-big":"is-reg"}${qe.games<=32?" is-heaven":""}`,lt.textContent=`${Be===0?"最新 ":""}${qe.games}G ${qe.kind}`,Jo.appendChild(lt)})),en.classList.toggle("hidden",!we.sideLedHintLabel),we.sideLedHintLabel&&z(en,we.sideLedHintLabel);const ke=we.activeBonus!==null&&we.bonusTarget>0;if(qc.classList.toggle("hidden",!ke),ke){z(Xc,we.activeBonus==="big"?"🎊 BIG BONUS 消化中（15枚ベル高確率ナビ＆1G連抽選）":"🎉 REG BONUS 消化中（終了時サイドランプ示唆あり）"),z($c,`${we.bonusEarned} / ${we.bonusTarget}枚`);const qe=Math.min(100,Math.round(we.bonusEarned/we.bonusTarget*100));Kc.style.width=`${qe}%`}z(jc,we.statusText),Ze(Zc,we.hibiscusRainbow?"okislot-status-banner rainbow":we.hibiscusLit?"okislot-status-banner chika":"okislot-status-banner"),an.classList.toggle("hidden",we.lastPayout<=0),we.lastPayout>0&&z(an,`+${we.lastPayout}枚!!`),z(pa,we.primaryActionLabel);const Re=[ga,va,ba],ze=[Qc,Jc,eh],Ye=[th,ih,sh],$e=[ah,oh,nh];for(let qe=0;qe<3;qe++){const Be=we.reelsStopped[qe];z(ze[qe],Be?we.upperSymbols[qe]:"―"),z(Ye[qe],Be?we.centerSymbols[qe]:"回転中…"),z($e[qe],Be?we.lowerSymbols[qe]:"―"),Ze(Re[qe],we.state==="spinning"?Be?"okislot-stop-btn stopped":"okislot-stop-btn ready":"okislot-stop-btn")}const Te=we.pendingBonus!==null&&we.hibiscusLit&&we.activeBonus===null;ms.classList.toggle("hidden",!Te),Te&&z(ms,we.pendingBonus==="big"?"🎯 7・7・7 を揃える (Enter)":"🎯 7・7・BAR を揃える (Enter)")}const le=d.diveComputer;pt.classList.toggle("wrist-glance",le.wristGlance),pt.classList.toggle("alarm-danger",le.alertTone==="danger"),Ta.classList.toggle("active",le.wristGlance),Ss.classList.toggle("ok-btn",le.wristGlance||!pt.classList.contains("is-collapsed")),z(ch,`${le.waterTempC.toFixed(1)}°C`),z(hn,le.aiConnected?`📡 ${le.tankBar}b`:"FREE"),hn.classList.toggle("ai-live",le.aiConnected),un.forEach(q=>{q.classList.toggle("active",q.dataset.dcscreen===le.screen)}),hh.classList.toggle("hidden",le.screen!=="main"),dh.classList.toggle("hidden",le.screen!=="compass"),uh.classList.toggle("hidden",le.screen!=="profile"),mh.classList.toggle("hidden",le.screen!=="log"),le.alertBanner?(z(Sa,le.alertBanner),Ze(Sa,`odc-alert-banner ${le.alertTone}`)):Ze(Sa,"odc-alert-banner hidden");const er=Math.max(...le.tissueLoadPcts,0),_h=le.aiConnected&&le.depthM>1&&er<12?1:Math.min(8,Math.ceil(er/100*8));for(let q=0;q<8;q++){const fe=q<_h?q>=7?"odc-seg lit-danger":q>=5?"odc-seg lit-warn":"odc-seg lit-ok":"odc-seg";Ze(Ph[q],fe)}if(le.aiConnected){z(bn,"ASC");const q=[1.2,4.5,8,11.5,15,18];for(let fe=0;fe<6;fe++){const Re=le.depthM>.9&&le.ascentRateMpm>=q[fe]?fe>=4?"odc-seg lit-danger":fe===3?"odc-seg lit-warn":"odc-seg lit-ok":"odc-seg";Ze(Mn[fe],Re)}}else{z(bn,"O₂");const q=d.atSurface?6:Math.max(0,Math.min(6,Math.ceil(d.oxygenPct/100*6))),fe=!d.atSurface&&d.oxygenPct<=15?"odc-seg lit-danger":!d.atSurface&&d.oxygenPct<=32?"odc-seg lit-warn":"odc-seg lit-ok";for(let ke=0;ke<6;ke++)Ze(Mn[ke],ke<q?fe:"odc-seg")}if(le.screen==="main"){const q=le.mode==="surface"?"SURFACE":le.mode==="free"?"FREE DIVE":le.mode==="nitrox"?"NITROX":"SCUBA";z(mn,q),Ze(mn,le.mode==="nitrox"?"odc-mode-pill nitrox":"odc-mode-pill"),z(ka,le.aiConnected?le.gasMix==="ean32"?"EAN32":le.gasMix==="ean36"?"EAN36":"AIR 21%":"素潜り (制限なし)"),z(fh,`${le.ambientAta.toFixed(2)} ATA`),z(ph,le.depthM.toFixed(1)),le.aiConnected?le.safetyStopActive?(z(ps,"STOP 5m"),z(vs,ks(le.safetyStopSecLeft)),z(bs,""),Ze(gs,"odc-prim-val ndl-stop")):le.inDeco?(z(ps,"DECO"),z(vs,`${le.decoCeilingM.toFixed(0)}`),z(bs,"m"),Ze(gs,"odc-prim-val ndl-deco")):(z(ps,"NDL"),z(vs,String(le.ndlMin)),z(bs,"min"),Ze(gs,le.ndlMin<=10?"odc-prim-val ndl-stop":"odc-prim-val ndl-ok")):(z(ps,"APNEA"),z(vs,d.atSurface?String(d.maxOxygenSec):String(v.apneaSecLeft)),z(bs,"sec"),Ze(gs,!d.atSurface&&v.apneaSecLeft<=8?"odc-prim-val ndl-deco":!d.atSurface&&v.apneaSecLeft<=15?"odc-prim-val ndl-stop":"odc-prim-val ndl-ok")),le.mode==="surface"?(z(fn,"SURF"),z(pn,ks(le.surfaceIntervalSec))):(z(fn,`DIVE #${le.diveNumber}`),z(pn,ks(le.diveTimeSec))),z(gh,`${le.maxDepthM.toFixed(1)}m`),le.aiConnected?(z(gn,"ASC"),z(vn,`${le.ascentRateMpm.toFixed(1)}m/m`),z(wn,"AI · GTR"),z(yn,`${le.tankBar}b·${le.gtrMin??"--"}m`)):(z(gn,"V-SPD"),z(vn,`${(le.ascentRateMpm/60).toFixed(1)}m/s`),z(wn,"FREE"),z(yn,"制限なし")),z(vh,`${le.po2Bar.toFixed(2)}b`);const fe=String(le.headingDeg).padStart(3,"0"),ke=le.lockedHeadingDeg!==null?` [🎯${String(le.lockedHeadingDeg).padStart(3,"0")}°]`:"";z(bh,`🧭 ${fe}° ${le.cardinalLabel} · ${le.landmarkLabel}${ke}`),ws.classList.toggle("locked",le.lockedHeadingDeg!==null),z(ws,le.lockedHeadingDeg!==null?"🎯解除":"🎯記憶")}else if(le.screen==="compass"){z(wh,`${String(le.headingDeg).padStart(3,"0")}°`),z(yh,le.cardinalLabel),z(Sh,le.landmarkLabel);const q=`${le.headingDeg}:${le.lockedHeadingDeg??-1}`;if(q!==ln){ln=q;const fe="http://www.w3.org/2000/svg";ys.replaceChildren();for(let ke=-75;ke<=75;ke+=5){const Re=((le.headingDeg+ke)%360+360)%360;if(Re%15!==0)continue;const ze=100+ke*1.22,Ye=Re%90===0,$e=Re%45===0,Te=document.createElementNS(fe,"line");if(Te.setAttribute("x1",ze.toFixed(1)),Te.setAttribute("x2",ze.toFixed(1)),Te.setAttribute("y1",Ye?"16":$e?"19":"22"),Te.setAttribute("y2","30"),Te.setAttribute("stroke",Ye?"#6ef7ff":"rgba(158, 226, 248, 0.55)"),Te.setAttribute("stroke-width",Ye?"1.6":"1"),ys.appendChild(Te),Re%45===0){const qe=Re===0?"N":Re===45?"NE":Re===90?"E":Re===135?"SE":Re===180?"S":Re===225?"SW":Re===270?"W":"NW",Be=document.createElementNS(fe,"text");Be.setAttribute("x",ze.toFixed(1)),Be.setAttribute("y","42"),Be.setAttribute("text-anchor","middle"),Be.setAttribute("font-size",Ye?"9.5":"7.5"),Be.setAttribute("font-weight","800"),Be.setAttribute("fill",Re===0?"#ffd86b":Ye?"#ffffff":"#9adff6"),Be.textContent=qe,ys.appendChild(Be)}}if(le.lockedHeadingDeg!==null){const ke=(Re,ze)=>{const Ye=(Re-le.headingDeg+540)%360-180;if(Math.abs(Ye)<=78){const $e=100+Ye*1.22,Te=document.createElementNS(fe,"polygon");Te.setAttribute("points",`${$e.toFixed(1)},47 ${($e-4).toFixed(1)},53 ${($e+4).toFixed(1)},53`),Te.setAttribute("fill",ze),ys.appendChild(Te)}};ke(le.lockedHeadingDeg,"#ffc845"),le.reciprocalDeg!==null&&ke(le.reciprocalDeg,"#4affb8")}}if(le.lockedHeadingDeg!==null){const fe=le.headingDeltaDeg,ke=Math.abs(fe)<=4?"◎ ベアリング一致（直進！）":fe>0?`▶ 右へ ${fe}°`:`◀ 左へ ${Math.abs(fe)}°`;z(Sn,`目標 ${String(le.lockedHeadingDeg).padStart(3,"0")}° (帰路 ${String(le.reciprocalDeg??0).padStart(3,"0")}°) · ${ke}`),z(Pi,"🔓 ベアリングロック解除"),Pi.classList.add("locked")}else z(Sn,"N:ビーチ 0° · E:マンタ 90° · S:沈船 180° · W:アーチ 270°"),z(Pi,"🎯 現在方位をベアリングロック"),Pi.classList.remove("locked")}else if(le.screen==="profile"){z(kh,`${le.avgDepthM.toFixed(1)}m`),z(xh,`${le.cnsPct}%`),z(Th,`${le.modM.toFixed(1)}m`);const q=le.profileSamples.length>0?le.profileSamples:[le.depthM],fe=Math.max(15,...q)*1.08,ke=[];for(let ze=0;ze<q.length;ze++){const Ye=q.length===1?192:4+ze/(q.length-1)*188,$e=4+q[ze]/fe*54;ke.push(`${Ye.toFixed(1)},${$e.toFixed(1)}`)}q.length===1&&ke.unshift(`4.0,${ke[0].split(",")[1]}`);const Re=ke.join(" ");if(kn.getAttribute("points")!==Re){kn.setAttribute("points",Re);const ze=ke[0].split(",")[0],Ye=ke[ke.length-1].split(",")[0];Mh.setAttribute("points",`${ze},4 ${Re} ${Ye},4`)}for(let ze=0;ze<8;ze++){const Ye=`${Math.max(8,le.tissueLoadPcts[ze]??0)}%`;xn[ze].style.height!==Ye&&(xn[ze].style.height=Ye)}}else if(le.screen==="log"){Tn.forEach(fe=>{fe.classList.toggle("active",fe.dataset.dcgas===le.gasMix)});const q=le.diveLogs.map(fe=>`${fe.diveNumber}:${fe.durationSec}:${fe.maxDepthM}`).join("|");if(q!==rn)if(rn=q,xa.replaceChildren(),le.diveLogs.length===0){const fe=document.createElement("div");fe.className="odc-log-empty",fe.textContent="海へ潜って浮上するとダイブログが自動記録されるよ！",xa.appendChild(fe)}else for(const fe of le.diveLogs){const ke=document.createElement("div");ke.className="odc-log-item";const Re=document.createElement("span");Re.textContent=`#${fe.diveNumber} MAX ${fe.maxDepthM.toFixed(1)}m · ${ks(fe.durationSec)}`;const ze=document.createElement("small");ze.textContent=`${fe.gasLabel} · ${fe.minTempC.toFixed(1)}°C`,ke.append(Re,ze),xa.appendChild(ke)}}const tr=d.upgrades.map(q=>`${q.id}:${q.unlocked?1:0}:${q.canAfford?1:0}`).join("|");if(tr!==nn){nn=tr,Qs.replaceChildren();for(const q of d.upgrades){const fe=document.createElement("div");fe.className="craft-row";const ke=document.createElement("div");ke.className="craft-info";const Re=document.createElement("strong");Re.textContent=q.name;const ze=document.createElement("span");ze.textContent=q.desc;const Ye=document.createElement("div");Ye.className="craft-cost",Ye.textContent=Object.entries(q.costs).map(([Te,qe])=>`${rh[Te]??Te} ×${qe}`).join("  "),ke.append(Re,ze,Ye);const $e=document.createElement("button");$e.type="button",$e.className="padi-step-btn",q.unlocked?($e.textContent="✓ 装備済",$e.disabled=!0,$e.style.opacity="0.6"):($e.textContent=q.canAfford?"クラフト":"素材不足",$e.disabled=!q.canAfford,q.canAfford?$e.classList.add("primary"):$e.style.opacity="0.45",$e.dataset.craftId=q.id),fe.append(ke,$e),Qs.appendChild(fe)}}});At=F,F.startLoop(),Oi.addEventListener("click",()=>{Oi.blur(),Zs.classList.toggle("hidden")}),Gi.addEventListener("click",()=>{Gi.blur();const d=ji.classList.toggle("is-collapsed");Gi.textContent=d?"＋":"—"}),document.querySelectorAll("[data-dexspecies]").forEach(d=>{d.addEventListener("click",()=>{d.blur();const C=d.dataset.dexspecies;C&&(_t(!1),F.observeFaunaUpClose(C))})});const _t=d=>{const C=d!==void 0?d:Jt.classList.contains("hidden");Jt.classList.toggle("hidden",!C),C&&document.pointerLockElement===e&&document.exitPointerLock()};document.getElementById("btn-okinawa-prep").addEventListener("click",d=>{d.currentTarget.blur(),_t()}),document.getElementById("btn-close-prep").addEventListener("click",()=>{_t(!1)}),lo.forEach(d=>{d.addEventListener("click",()=>{d.blur(),gt(d.dataset.preptab??"gear")})}),co.forEach(d=>{d.addEventListener("click",()=>{d.blur(),F.selectSuitVariant(d.dataset.suitvar)})}),ho.forEach(d=>{d.addEventListener("click",()=>{d.blur(),F.selectBcdVariant(d.dataset.bcdvar)})}),uo.forEach(d=>{d.addEventListener("click",()=>{d.blur(),F.selectFinVariant(d.dataset.finvar)})}),mo.forEach(d=>{d.addEventListener("click",()=>{d.blur(),F.orderClubhouseDrink(d.dataset.bardrink)})}),document.getElementById("btn-go-chura-bar").addEventListener("click",d=>{d.currentTarget.blur(),F.teleportToSpot("chura_bar")}),ha.addEventListener("click",()=>{ha.blur(),F.getInspectFocus()==="bar_seat"||F.getInspectFocus()==="bar_bottles"?F.standUpFromBarStool():F.sitOnBarStool(2)}),rs.addEventListener("click",()=>{rs.blur(),F.toggleBarBottleZoom()}),ls.addEventListener("click",()=>{ls.blur(),F.sipBarDrink()}),document.getElementById("btn-bar-go-okislot").addEventListener("click",d=>{d.currentTarget.blur(),_t(!1),F.sitAtOkiSlot(0)}),wa.addEventListener("click",()=>{wa.blur(),_t(!1),F.sitAtOkiSlot(0)}),fa.addEventListener("click",()=>{fa.blur();const d=Zo.textContent?.includes("1番台")?1:0;F.switchOkiSlotMachine(d)}),tn.addEventListener("click",()=>{tn.blur(),F.insertMoreOkiMedals(100)}),sn.addEventListener("click",()=>{sn.blur(),F.leaveOkiSlot()}),pa.addEventListener("click",()=>{pa.blur(),F.triggerOkiSlotPrimaryAction()}),ga.addEventListener("click",()=>{ga.blur(),F.isOkiSlotActive()&&F.stopOkiSlotReel(0,!1)}),va.addEventListener("click",()=>{va.blur(),F.isOkiSlotActive()&&F.stopOkiSlotReel(1,!1)}),ba.addEventListener("click",()=>{ba.blur(),F.isOkiSlotActive()&&F.stopOkiSlotReel(2,!1)}),ms.addEventListener("click",()=>{ms.blur(),F.autoAlignOkiSlotBonus()});const Ft=document.getElementById("okinawa-3d-cinema-quad"),Ct=document.getElementById("yt-chill-widget"),Ai=document.getElementById("btn-yt-chill"),xs=document.getElementById("yt-chill-drag-handle"),di=document.getElementById("input-yt-url"),An=document.getElementById("btn-yt-play"),Cn=document.getElementById("btn-yt-stop"),Bn=document.getElementById("btn-yt-go-board"),Ah=document.getElementById("btn-yt-close"),Ch=document.getElementById("link-yt-external"),Ma=document.getElementById("chk-yt-duck-bgm"),Ln=document.getElementById("yt-empty-placeholder"),qt=document.getElementById("yt-embed-iframe"),Ts=document.getElementById("yt-status-note"),Pa=document.querySelectorAll("#yt-preset-buttons [data-ytpreset]");let ui=!1,Aa=-1,Dn=-1,Ca=!1;const Bh=document.getElementById("app"),Xt=d=>{Ca!==d&&(Ca=d,e.style.pointerEvents=d?"none":"")},Ba=()=>{if(Ge!=="okinawa"||!ui||Ft.classList.contains("is-offscreen")||document.pointerLockElement===e||document.body.classList.contains("is-canvas-dragging")||Aa<0){Xt(!1);return}Xt(te.isClientPointOnUnoccludedCinema(Aa,Dn))},En=d=>{if(Aa=d.clientX,Dn=d.clientY,d.buttons!==0){Xt(!1);return}const C=d.target;if(C&&C!==e&&C!==Bh&&C!==document.body&&C!==document.documentElement&&!Ft.contains(C)){Xt(!1);return}Ba()};Ft.addEventListener("pointerleave",()=>{Xt(!1)}),window.addEventListener("pointermove",En,{passive:!0}),te.setOnCameraMatrixUpdated(()=>{if(Ge!=="okinawa"){te.setCinemaCutoutOpacity(0),Ft.classList.add("is-offscreen"),Xt(!1);return}const d=te.computeBeachCinemaProjection(640,360);if(!d){te.setCinemaCutoutOpacity(0),Ft.classList.add("is-offscreen"),Xt(!1);return}te.setCinemaCutoutOpacity(d.opacity),Ft.classList.remove("is-offscreen"),Ft.style.transform=d.matrix3d,Ft.style.opacity="1",Ca&&Ba()});const La=(d=!1)=>{Ct.classList.remove("hidden"),document.pointerLockElement===e&&document.exitPointerLock(),d&&!ui&&setTimeout(()=>di.focus(),40)},Ms="https://www.youtube.com/watch?v=n61ULEU7CO0";let Ps="",Da=!1;const Rn=d=>{Pa.forEach(C=>{C.classList.toggle("is-active",!!d&&C.dataset.ytpreset===d)})},mi=(d,C=[])=>{try{qt.contentWindow?.postMessage(JSON.stringify({event:"command",func:d,args:C}),"*")}catch{}},As=(d,C,v=!1)=>{const j=V0(d);if(!j){Ts.textContent="⚠️ 有効なYouTube / YouTube MusicのURL、プレイリストURL、または11文字の動画IDを入力してね！",Xe.playDiveAlertBeep();return}v||(Da=!1),Ps=d,di.value=d,Ch.href=j.watchUrl,Rn(d),Ln.classList.add("hidden"),qt.classList.remove("is-offscreen"),qt.src===j.embedUrl?mi("playVideo"):qt.src=j.embedUrl,Ft.classList.add("is-playing"),ui=!0,Ai.classList.add("is-playing"),Ai.textContent="🎶 ボード投影中",Xe.setYoutubeChillMode(Ma.checked);const $=C??j.label;Ts.textContent=`🎬 再生＆3Dボード投影中: ${$} · ボードが見えない場所でも音楽はそのまま流れるよ♪`,Ba()};qt.addEventListener("load",()=>{if(!(!ui||!qt.src||qt.src==="about:blank"))try{qt.contentWindow?.postMessage(JSON.stringify({event:"listening",id:"chura-cinema"}),"*"),mi("playVideo")}catch{}});const _n=d=>{if(!ui||typeof d.data!="string"||!d.origin.includes("youtube.com")&&!d.origin.includes("youtube-nocookie.com"))return;let C=null;try{C=JSON.parse(d.data)}catch{return}C&&(C.event==="onReady"?(mi("unMute"),mi("setVolume",[85]),mi("playVideo")):C.event==="onStateChange"&&C.info===0?(mi("seekTo",[0,!0]),mi("playVideo")):C.event==="onError"&&(Array.from(Pa).some(j=>j.dataset.ytpreset===Ps)&&!Da&&Ps!==Ms?(Da=!0,As(Ms,"☕ Lofi Chill Mix (自動切替)",!0)):Ts.textContent="⚠️ この動画は配信終了または外部サイト埋め込み制限があるみたい。右上の『↗』で別タブ再生するか別のURLを試してね！"))};window.addEventListener("message",_n);const Lh=()=>{Ps="",Rn(""),qt.src="about:blank",qt.classList.add("is-offscreen"),Ln.classList.remove("hidden"),Ft.classList.remove("is-playing"),ui=!1,Xt(!1),Ai.classList.remove("is-playing"),Ai.textContent="🎵 YouTubeチル",Xe.setYoutubeChillMode(!1),Ts.textContent="⏹ 3Dボードの投影を停止したよ。いつでも好きなYouTube URLを入れて投影できるよ♪"};Ai.addEventListener("click",()=>{Ai.blur(),Ct.classList.contains("hidden")?La(!0):Ct.classList.add("hidden")}),Bn.addEventListener("click",()=>{Bn.blur(),Ge!=="okinawa"&&wt.click(),_t(!1),F.focusBeachCinemaBoard()}),Ah.addEventListener("click",()=>{Ct.classList.add("hidden")}),An.addEventListener("click",()=>{An.blur(),As(di.value||Ms)}),di.addEventListener("keydown",d=>{d.stopPropagation(),d.key==="Enter"?(d.preventDefault(),As(di.value||Ms),di.blur()):d.key==="Escape"&&di.blur()}),Cn.addEventListener("click",()=>{Cn.blur(),Lh()}),Ma.addEventListener("change",()=>{ui&&Xe.setYoutubeChillMode(Ma.checked)}),Pa.forEach(d=>{d.addEventListener("click",()=>{d.blur();const C=d.dataset.ytpreset??"",v=d.textContent?.trim();C&&As(C,v)})});let Ea=!1,Fn=0,In=0;xs.addEventListener("pointerdown",d=>{if(d.target.closest("button, a"))return;Ea=!0;const C=Ct.getBoundingClientRect();Fn=d.clientX-C.left,In=d.clientY-C.top,Ct.style.right="auto",Ct.style.bottom="auto",Ct.style.left=`${C.left}px`,Ct.style.top=`${C.top}px`,xs.setPointerCapture(d.pointerId)}),xs.addEventListener("pointermove",d=>{if(!Ea)return;const C=Math.max(8,window.innerWidth-Ct.offsetWidth-8),v=Math.max(8,window.innerHeight-64),j=Math.max(8,Math.min(C,d.clientX-Fn)),$=Math.max(8,Math.min(v,d.clientY-In));Ct.style.left=`${j}px`,Ct.style.top=`${$}px`}),xs.addEventListener("pointerup",()=>{Ea=!1}),F.setOnOpenYoutubeChill(()=>{La(!0)}),F.setOnToggleDiveCompUi(()=>{pt.classList.contains("is-collapsed")&&(pt.classList.remove("is-collapsed"),Wi.textContent="—"),F.isInDivingMode()?Mi=!1:hi=F.isWristGlanceActive()}),Wi.addEventListener("click",()=>{Wi.blur();const d=pt.classList.toggle("is-collapsed");Wi.textContent=d?"＋":"—"}),dn.addEventListener("click",()=>{dn.blur(),F.isInDivingMode()?Mi=!0:hi=!1,F.setWristGlanceQuiet(!1),pt.classList.add("hidden")}),un.forEach(d=>{d.addEventListener("click",()=>{d.blur(),F.cycleDiveCompScreen(d.dataset.dcscreen)})}),ka.addEventListener("click",()=>{ka.blur(),F.setDiveGasMix()}),Tn.forEach(d=>{d.addEventListener("click",()=>{d.blur(),F.setDiveGasMix(d.dataset.dcgas)})}),ws.addEventListener("click",()=>{ws.blur(),F.toggleCompassHeadingLock()}),Pi.addEventListener("click",()=>{Pi.blur(),F.toggleCompassHeadingLock()}),Ta.addEventListener("click",()=>{Ta.blur(),F.toggleWristGlance()}),Ss.addEventListener("click",()=>{Ss.blur(),pt.classList.contains("hidden")||pt.classList.contains("is-collapsed")?(pt.classList.remove("is-collapsed"),Wi.textContent="—",Mi=!1,F.toggleWristGlance(!0)):F.toggleWristGlance()}),Pn.addEventListener("click",()=>{Pn.blur(),F.cycleDiveCompScreen()});let Ra=!1,Nn=0,On=0;fs.addEventListener("pointerdown",d=>{if(d.target.closest("button"))return;Ra=!0;const C=pt.getBoundingClientRect();Nn=d.clientX-C.left,On=d.clientY-C.top,pt.style.right="auto",pt.style.left=`${C.left}px`,pt.style.top=`${C.top}px`,fs.setPointerCapture(d.pointerId)}),fs.addEventListener("pointermove",d=>{if(!Ra)return;const C=Math.max(8,window.innerWidth-pt.offsetWidth-8),v=Math.max(8,window.innerHeight-64);pt.style.left=`${Math.max(8,Math.min(C,d.clientX-Nn))}px`,pt.style.top=`${Math.max(8,Math.min(v,d.clientY-On))}px`}),fs.addEventListener("pointerup",()=>{Ra=!1}),document.getElementById("btn-go-bbq-station").addEventListener("click",d=>{d.currentTarget.blur(),F.openBbqStation()}),document.getElementById("btn-go-bbq-dining")?.addEventListener("click",d=>{d.currentTarget.blur(),F.sitAtDiningTable(3)}),document.getElementById("btn-go-fishing-from-bbq").addEventListener("click",d=>{d.currentTarget.blur(),_t(!1),F.startFishingMode(!0)}),us.addEventListener("click",()=>{us.blur(),F.isFishingActive()||_t(!1),F.toggleFishingMode()}),Go.addEventListener("click",()=>{Go.blur(),F.stopFishingMode()}),Xo.addEventListener("click",()=>{Xo.blur(),F.goCookLastCatchAtBbq(),_t(!0),gt("bbq",!0)}),zo.forEach(d=>{d.addEventListener("click",()=>{d.blur(),F.selectFishingRig(d.dataset.fishrig)})});const _a=()=>F.endFishingPrimaryPress();ci.addEventListener("pointerdown",d=>{d.preventDefault(),ci.blur(),F.beginFishingPrimaryPress()}),ci.addEventListener("pointerup",_a),ci.addEventListener("pointerleave",_a),ci.addEventListener("pointercancel",_a),ds.addEventListener("click",()=>{ds.blur(),F.triggerFishingTwitch()});const Ci=()=>F.setFishingRodLeanUi(0);Ht.addEventListener("pointerdown",d=>{d.preventDefault(),Ht.blur(),F.setFishingRodLeanUi(-1)}),Ht.addEventListener("pointerup",Ci),Ht.addEventListener("pointerleave",Ci),Ht.addEventListener("pointercancel",Ci),Yt.addEventListener("pointerdown",d=>{d.preventDefault(),Yt.blur(),F.setFishingRodLeanUi(1)}),Yt.addEventListener("pointerup",Ci),Yt.addEventListener("pointerleave",Ci),Yt.addEventListener("pointercancel",Ci),document.getElementById("btn-open-yt-from-bbq").addEventListener("click",d=>{d.currentTarget.blur(),La(!0)}),document.getElementById("btn-bbq-restock").addEventListener("click",d=>{d.currentTarget.blur(),F.restockCoolerBox()}),da.addEventListener("click",()=>{da.blur(),F.pourBbqPairingDrink("beer")}),ua.addEventListener("click",()=>{ua.blur(),F.pourBbqPairingDrink("highball")}),document.getElementById("btn-bbq-sip-drink").addEventListener("click",d=>{d.currentTarget.blur(),F.sipOrRefillBbqPairingDrink()}),Oo.forEach(d=>{d.addEventListener("click",()=>{d.blur(),F.placeSeafoodOnBoard(d.dataset.seafood)})}),document.getElementById("btn-bbq-slice").addEventListener("click",d=>{d.currentTarget.blur(),F.sliceBoardSeafood()}),document.getElementById("btn-bbq-to-grill").addEventListener("click",d=>{d.currentTarget.blur(),F.grillBoardSeafood()}),document.getElementById("btn-bbq-sashimi").addEventListener("click",d=>{d.currentTarget.blur(),F.eatBoardSashimi()}),document.getElementById("btn-bbq-eat-plate").addEventListener("click",d=>{d.currentTarget.blur(),F.eatPlatedBbqFood()}),Io.forEach((d,C)=>{d.addEventListener("click",()=>{d.blur(),F.interactWithGrillSlot(C)})}),No.forEach(d=>{d.addEventListener("click",()=>{d.blur(),F.lieDownOnSpot(d.dataset.liespot)})});const Gn=()=>{const d=F.executeNextGuidedSetupStep();ti!==d&&gt(d,!0);const C=F.getInspectFocus();(C==="wb_valve"||C==="wb_bcd"||C==="wb_reg"||C==="wb_lpi"||C==="wb_spg")&&(Rt=C)};cs.addEventListener("click",()=>{if(cs.blur(),F.getInspectFocus()==="none"&&ti==="entry"){F.startBeachGuidedEntry();return}Gn()}),ei.addEventListener("click",d=>{d.stopPropagation(),ei.blur(),Gn()}),Ro.addEventListener("click",()=>{Ro.blur(),F.quickWearAllAssembledGear(),gt("bwraf")}),Do.addEventListener("click",()=>{Do.blur(),F.resetInspectCameraAngle()}),Eo.addEventListener("click",()=>{Eo.blur(),F.setInspectFocus("none")}),fo.forEach(d=>{d.addEventListener("click",()=>{d.blur();const C=d.dataset.wbfocus??"wb_valve";(C==="wb_valve"||C==="wb_bcd"||C==="wb_reg"||C==="wb_lpi"||C==="wb_spg")&&(Rt=C),F.setInspectFocus(C)})}),document.getElementById("btn-wb-stamp").addEventListener("click",()=>F.verifyTankStamp()),document.getElementById("btn-wb-blow").addEventListener("click",()=>F.blowOutTankValve()),document.getElementById("btn-wb-oring").addEventListener("click",()=>F.inspectAndReplaceOring()),document.getElementById("btn-wb-bcd-place").addEventListener("click",()=>F.placeOrRemoveBcdOnTank()),document.getElementById("btn-wb-bcd-rot-l").addEventListener("click",()=>F.adjustBcdAlignment(-18,0)),document.getElementById("btn-wb-bcd-rot-r").addEventListener("click",()=>F.adjustBcdAlignment(18,0)),document.getElementById("btn-wb-bcd-up").addEventListener("click",()=>F.adjustBcdAlignment(0,2.2)),document.getElementById("btn-wb-bcd-dn").addEventListener("click",()=>F.adjustBcdAlignment(0,-2.2)),document.getElementById("btn-wb-bcd-ideal").addEventListener("click",()=>F.alignBcdToIdeal()),document.getElementById("btn-wb-cam-lock").addEventListener("click",()=>F.toggleWetAndLockCamBuckle()),document.getElementById("btn-wb-dustcap").addEventListener("click",()=>F.toggleDustCap()),document.getElementById("btn-wb-reg-place").addEventListener("click",()=>F.placeOrRemoveReg1st()),document.getElementById("btn-wb-reg-flip").addEventListener("click",()=>F.flipRegOrientation()),document.getElementById("btn-wb-yoke-handtight").addEventListener("click",()=>{F.adjustYokeScrew(76-Number(Wt.value))}),Wt.addEventListener("pointerdown",()=>{as=!0,Wt.dataset.prev=Wt.value}),Vt.addEventListener("pointerdown",()=>{os=!0,Vt.dataset.prev=Vt.value}),window.addEventListener("pointerup",()=>{as=!1,os=!1,F.setPurgeHeld(!1)}),Wt.addEventListener("input",()=>{const d=Number(Wt.value);F.adjustYokeScrew(d-At.getInspectFocus().length*0-Number(Wt.dataset.prev??d)),Wt.dataset.prev=String(d)}),document.getElementById("btn-wb-lpi-toggle").addEventListener("click",()=>F.toggleLpiCoupler()),document.getElementById("btn-wb-defog").addEventListener("click",()=>F.defogMaskAtRinseTank()),document.getElementById("btn-wb-rinse-after").addEventListener("click",()=>F.rinseGearPostDive()),document.getElementById("btn-wb-spg-flip").addEventListener("click",()=>F.toggleSpgFaceDown()),document.getElementById("btn-wb-valve-close").addEventListener("click",()=>F.turnTankValve(-3)),document.getElementById("btn-wb-valve-half").addEventListener("click",()=>{F.turnTankValve(-3),F.turnTankValve(.3)}),document.getElementById("btn-wb-valve-open").addEventListener("click",()=>F.turnTankValve(3)),Vt.addEventListener("input",()=>{const d=Number(Vt.value)/100,C=Number(Vt.dataset.prev??"0")/100;F.turnTankValve(d-C),Vt.dataset.prev=Vt.value});const Fa=document.getElementById("btn-wb-purge-hold");Fa.addEventListener("pointerdown",()=>F.setPurgeHeld(!0)),Fa.addEventListener("pointerup",()=>F.setPurgeHeld(!1)),Fa.addEventListener("pointerleave",()=>F.setPurgeHeld(!1)),document.getElementById("btn-wb-inhale-test").addEventListener("click",()=>F.triggerRegInhaleTest()),document.getElementById("btn-live-bcd-in").addEventListener("click",d=>{d.currentTarget.blur(),F.adjustSurfaceBcdAir(!0)}),document.getElementById("btn-live-bcd-out").addEventListener("click",d=>{d.currentTarget.blur(),F.adjustSurfaceBcdAir(!1)}),aa.addEventListener("click",()=>{aa.blur(),F.triggerEarEqualize()}),oa.addEventListener("click",()=>{oa.blur(),F.triggerUnderwaterMaskClear()}),wl.forEach(d=>{d.addEventListener("click",()=>{d.blur(),F.toggleBwrafStep(d.dataset.bwraf)})}),es.addEventListener("click",()=>{es.blur(),F.autoCompleteAllGearAndBcd(),gt("entry")}),document.getElementById("btn-gear-reset").addEventListener("click",d=>{d.currentTarget.blur(),F.resetGearSetupToBench(),gt("select")}),document.getElementById("btn-next-to-gear").addEventListener("click",d=>{d.currentTarget.blur(),gt("gear")}),document.getElementById("btn-next-to-wear").addEventListener("click",d=>{d.currentTarget.blur(),gt("bcd")}),document.getElementById("btn-next-to-bwraf").addEventListener("click",d=>{d.currentTarget.blur(),gt("bwraf")}),document.getElementById("btn-next-to-entry").addEventListener("click",d=>{d.currentTarget.blur(),gt("entry")}),na.addEventListener("click",()=>{na.blur(),F.toggleWearWetsuit()}),ra.addEventListener("click",()=>{ra.blur(),F.toggleWearWeightBelt()}),la.addEventListener("click",()=>{la.blur(),F.toggleWearScubaUnit()}),ca.addEventListener("click",()=>{ca.blur(),F.toggleWearMaskAndFins()}),Po.addEventListener("click",()=>F.toggleWaistStrap()),Ao.addEventListener("click",()=>F.toggleChestStrap()),ns.addEventListener("pointerdown",()=>{hs=!0}),window.addEventListener("pointerup",()=>{hs=!1}),ns.addEventListener("input",()=>{F.setShoulderStrapPct(Number(ns.value))}),document.getElementById("btn-weight-minus").addEventListener("click",()=>{F.adjustWeightKg(-1)}),document.getElementById("btn-weight-plus").addEventListener("click",()=>{F.adjustWeightKg(1)}),document.getElementById("btn-surf-bcd-in").addEventListener("click",()=>{F.adjustSurfaceBcdAir(!0)}),document.getElementById("btn-surf-bcd-out").addEventListener("click",()=>{F.adjustSurfaceBcdAir(!1)}),Lo.addEventListener("click",()=>{F.completeBwrafBuddyCheck()}),document.getElementById("btn-stand-clubhouse").addEventListener("click",()=>{F.teleportToSpot("clubhouse")}),document.getElementById("btn-stand-boat").addEventListener("click",()=>{F.teleportToSpot("boat_deck")}),document.getElementById("btn-stand-beach").addEventListener("click",()=>{F.teleportToSpot("beach_shore")}),document.getElementById("btn-entry-giant").addEventListener("click",()=>{F.startGiantStrideEntry()}),document.getElementById("btn-entry-backroll").addEventListener("click",()=>{F.startBackRollEntry()}),document.getElementById("btn-entry-beach").addEventListener("click",()=>{F.startBeachGuidedEntry()}),document.querySelectorAll("#okinawa-spot-buttons [data-spot]").forEach(d=>{d.addEventListener("click",()=>{d.blur();const C=d.dataset.spot??"coral_garden";_t(!1),F.teleportToSpot(C),C==="clubhouse"?gt("select",!0):C==="chura_bar"?gt("bar",!0):C==="beach_bbq"&&gt("bbq",!0)})}),ea.addEventListener("click",()=>{ea.blur(),F.toggleCameraMode()}),io.addEventListener("change",async()=>{const d=io.files?.[0];if(d)try{await te.loadCustomVrmFile(d),F.setCameraMode("tpv")}catch(C){console.error("VRM load failed:",C)}}),ao.forEach(d=>{d.addEventListener("click",()=>{d.blur();const C=d.dataset.trim??"auto";C==="auto"?F.setBodyTrimAuto():F.setBodyTrimManual(Number(C))})}),Ji.addEventListener("pointerdown",()=>{ia=!0}),window.addEventListener("pointerup",()=>{ia=!1}),Ji.addEventListener("input",()=>{F.setBodyTrimManual(Number(Ji.value))});let Cs=!1;const Bs=()=>{Cs&&(Cs=!1,F.releaseAllVirtualMoveKeys())};document.querySelectorAll("[data-movekey]").forEach(d=>{const C=d.dataset.movekey;d.addEventListener("pointerdown",v=>{v.preventDefault(),v.stopPropagation(),d.blur(),Cs=!0,F.setVirtualMoveKey(C,!0)}),d.addEventListener("pointerenter",v=>{!Cs||v.buttons===0||F.setVirtualMoveKey(C,!0)}),d.addEventListener("pointerup",()=>{F.setVirtualMoveKey(C,!1)}),d.addEventListener("pointerleave",()=>{F.setVirtualMoveKey(C,!1)}),d.addEventListener("pointercancel",()=>{F.setVirtualMoveKey(C,!1)}),d.addEventListener("contextmenu",v=>v.preventDefault())}),window.addEventListener("pointerup",Bs),window.addEventListener("blur",Bs),ta.addEventListener("click",d=>{d.stopPropagation(),ta.blur(),F.toggleVirtualDash()}),Qi.addEventListener("click",()=>{Qi.blur(),F.toggleFlashlight()});const zn=()=>{!zi.classList.toggle("hidden")&&document.pointerLockElement===e&&document.exitPointerLock()};document.getElementById("btn-okinawa-craft").addEventListener("click",zn),document.getElementById("btn-close-craft").addEventListener("click",()=>{zi.classList.add("hidden")}),Qs.addEventListener("click",d=>{const C=d.target.closest("[data-craft-id]");!C||!C.dataset.craftId||F.craftUpgrade(C.dataset.craftId)});const $t=d=>{Ge=d;const C=d==="okinawa",v=d==="pachinko",j=d==="padi",$=d==="showcase";Tt.forEach(we=>we.classList.toggle("active",we.dataset.appmode===d)),wt.classList.toggle("active",C),nt.classList.toggle("active",v),ct.classList.toggle("active",j),rt.classList.toggle("active",$),Ys.classList.toggle("hidden",!C),h.classList.toggle("hidden",!C||!F.isInDivingMode()),k.classList.toggle("hidden",!v),r.classList.toggle("hidden",!v),D.classList.toggle("hidden",!j),o.classList.toggle("hidden",!j),n.classList.toggle("hidden",!$),ut.classList.toggle("hidden",!v),Mt.classList.toggle("hidden",!$),b.classList.toggle("hidden",!$),v||Xe.stopAllBgm(),Et.setActive(!1),it.setActive(!1),F.setActive(!1),Xt(!1),C||(te.setCinemaCutoutOpacity(0),Ft.classList.add("is-offscreen")),C?(F.setActive(!0),Ae.classList.add("hidden"),Le.setAttribute("aria-expanded","false")):v?Et.setActive(!0):j?(it.setActive(!0),Ae.classList.add("hidden"),Le.setAttribute("aria-expanded","false")):(Ds(0),te.setFormationMode(0),te.setPlaying(!0))};Tt.forEach(d=>{d.addEventListener("click",()=>{const C=d.dataset.appmode??"okinawa";$t(C)})}),wt.addEventListener("click",()=>$t("okinawa")),nt.addEventListener("click",()=>$t("pachinko")),ct.addEventListener("click",()=>$t("padi")),rt.addEventListener("click",()=>$t("showcase"));const Un=()=>{m.classList.add("is-pressed"),setTimeout(()=>m.classList.remove("is-pressed"),120),Et.handlePushButton()};m.addEventListener("click",Un),ki.forEach(d=>{d.addEventListener("click",()=>{const C=d.dataset.force??"auto";xi(C),Et.setForcedPreview(C),C!=="auto"&&(Ae.classList.add("hidden"),Le.setAttribute("aria-expanded","false"))})});const Wn=document.querySelectorAll("#spec-buttons [data-spec]");Wn.forEach(d=>{d.addEventListener("click",()=>{const C=d.dataset.spec??"festival";Wn.forEach(v=>v.classList.toggle("active",v===d)),Et.setSpecMode(C)})});const Vn=document.querySelectorAll("#stage-style-buttons [data-style]");Vn.forEach(d=>{d.addEventListener("click",()=>{const C=d.dataset.style??"atlantis";Vn.forEach(v=>v.classList.toggle("active",v===d)),Et.setStageStyle(C)})}),B.addEventListener("change",()=>{Et.setAutoSpin(B.checked)});const Ia=()=>{ne.textContent=Xe.isMuted()?"Muted":"Sound ON"};ne.addEventListener("click",()=>{Xe.toggleMuted(),Ia()}),N.addEventListener("input",()=>{const d=Number(N.value);ee.textContent=`${d}%`,Xe.setSeVolume(d/100)}),V.addEventListener("input",()=>{const d=Number(V.value);pe.textContent=`${d}%`,Xe.setBgmVolume(d/100)});const Ls=(d,C,v)=>{d.addEventListener("change",()=>{const j=d.files?.[0];if(!j)return;const $=Xe.setBgmFile(C,j);ce.textContent=`BGMセット済 (${v}): ${$}`})};Ls(J,"all","一括"),Ls(de,"normal","通常"),Ls(ue,"reach","リーチ"),Ls(xe,"jackpot","大当り"),window.addEventListener("dragover",d=>d.preventDefault()),window.addEventListener("drop",async d=>{d.preventDefault();const C=d.dataTransfer?.files?.[0];if(C){if(C.name.toLowerCase().endsWith(".vrm")||C.name.toLowerCase().endsWith(".glb")){try{await te.loadCustomVrmFile(C),$t("okinawa"),F.setCameraMode("tpv")}catch(v){console.error("Dropped VRM error:",v)}return}if(C.type.startsWith("audio/")){const v=Xe.setBgmFile("all",C);ce.textContent=`ドロップBGM反映済: ${v}`}}});const Vi=new URLSearchParams(window.location.search),Na=Vi.get("mode");Na==="pachinko"?$t("pachinko"):Na==="padi"?$t("padi"):Na==="showcase"||Vi.get("t")!==null?$t("showcase"):$t("okinawa");const Oa=Vi.get("t");Oa!==null&&!Number.isNaN(Number(Oa))&&te.setSequenceTime(Number(Oa),!0),Vi.get("pause")==="1"&&te.setPlaying(!1),Vi.get("cinema")==="1"&&(document.body.classList.add("cinema-mode"),Ue.classList.remove("hidden")),Ce.addEventListener("click",()=>te.togglePlaying()),Y.addEventListener("pointerdown",()=>{Je=!0}),window.addEventListener("pointerup",()=>{Je=!1}),Y.addEventListener("input",()=>{const d=Number(Y.value);Ds(0),te.setFormationMode(0),te.setSequenceTime(d,!0)}),document.querySelectorAll("[data-jump]").forEach(d=>{d.addEventListener("click",()=>{const C=Number(d.dataset.jump??"0");Ds(0),te.setFormationMode(0),te.setSequenceTime(C,!0)})});const Hn=document.querySelectorAll("#mode-buttons [data-mode]");function Ds(d){Hn.forEach(C=>C.classList.toggle("active",Number(C.dataset.mode)===d))}Hn.forEach(d=>{d.addEventListener("click",()=>{const C=Number(d.dataset.mode??"0");Ds(C),te.setFormationMode(C)})});const Yn=document.querySelectorAll("#preset-buttons [data-preset]");Yn.forEach(d=>{d.addEventListener("click",()=>{const C=d.dataset.preset??"48k";Yn.forEach(v=>v.classList.toggle("active",v===d)),te.setFishPreset(C)})}),ge.addEventListener("input",()=>{const d=Number(ge.value);ve.textContent=`${d}%`,te.setGodRayIntensity(d/100)}),ye.addEventListener("input",()=>{const d=Number(ye.value);Pe.textContent=`${d}%`,te.setCausticIntensity(d/100)}),_e.addEventListener("input",()=>{T.textContent=_e.value||"Gemini 4 Carbon"}),Oe.addEventListener("change",()=>{te.setPointerCurrentEnabled(Oe.checked)}),De.addEventListener("click",()=>te.resetCamera());const Hi=[{id:"dawn_glow",shortLabel:"🌅 朝焼け",toast:"🌅 『朝焼け』 — 東の空が淡い薔薇琥珀に染まり、かがり火が静かに揺れる黎明アワー"},{id:"sunrise",shortLabel:"🌄 日の出",toast:"🌄 『日の出』 — 水平線から昇る黄金の朝日と海面のサンロード！"},{id:"morning",shortLabel:"🌤️ 朝",toast:"🌤️ 『朝』 — 空気が凛と澄み渡る爽やかな沖縄モーニング"},{id:"noon",shortLabel:"☀️ 昼",toast:"☀️ 『昼』 — 抜けるような真夏の美ら海と入道雲のサマータイム！"},{id:"late_afternoon",shortLabel:"🌇 夕方",toast:"🌇 『夕方』 — 傾く陽差しがチーク材デッキを温かく染めるゴールデンアワー"},{id:"sunset_glow",shortLabel:"🌆 夕焼け",toast:"🌆 『夕焼け』 — 茜色と紅珊瑚に燃える沖縄サンセット＆リゾート照明点灯！"},{id:"sundown",shortLabel:"🎴 日の入り",toast:"🎴 『日の入り』 — 水平線へ沈む真紅の太陽とトワイライト・ブルーアワー"},{id:"night",shortLabel:"🌙 夜",toast:"🌙 『夜』 — 満天の星とムーンロード・かがり火とCHURA BARネオンのナイトビーチ！"},{id:"midnight",shortLabel:"🌌 深夜",toast:"🌌 『深夜』 — 天の川が渡る静寂の深更と波打ち際の幻想的な夜光虫（海ほたる）♪"}],Ga=document.getElementById("btn-cycle-tod"),qn=document.querySelectorAll("[data-tod]"),Xn=(d,C=!0)=>{te.setTimeOfDay(d,!1);const v=Hi.find(j=>j.id===d)??Hi[3];Ga&&(Ga.textContent=v.shortLabel),qn.forEach(j=>{j.classList.toggle("active",j.dataset.tod===d)}),C&&Ge==="okinawa"&&F.notifyTimeOfDayChanged(d,v.toast)};qn.forEach(d=>{d.addEventListener("click",()=>{const C=d.dataset.tod;C&&(Xe.playPushButton(!1),Xn(C,!0))})}),Ga?.addEventListener("click",()=>{const d=te.getTimeOfDay(),C=Hi.findIndex(j=>j.id===d),v=Hi[(C+1)%Hi.length];Xe.playPushButton(!1),Xn(v.id,!0)}),Le.addEventListener("click",()=>{const d=Ae.classList.toggle("hidden");Le.setAttribute("aria-expanded",String(!d))});const Es=()=>{const d=document.body.classList.toggle("cinema-mode");He.classList.toggle("hidden",!d)};Ie.addEventListener("click",Es),Ue.addEventListener("click",Es);let za=!1,fi=null,ii=0;const Ua=()=>{ii!==0&&(window.clearTimeout(ii),ii=0),ot?.classList.add("hidden")};ot?.addEventListener("click",Ua);const Dh=()=>{const d=new Date,C=j=>String(j).padStart(2,"0");return`carbon-ocean-${`${d.getFullYear()}${C(d.getMonth()+1)}${C(d.getDate())}-${C(d.getHours())}${C(d.getMinutes())}${C(d.getSeconds())}`}.png`},Rs=async()=>{if(za)return;za=!0,Xe.playCameraShutter?.(),st&&(st.classList.remove("is-flashing"),st.offsetWidth,st.classList.add("is-flashing"));const d=Dh();try{const C=(jt,Qt,si)=>{bt&&(bt.src=jt),Qe&&(Qe.textContent=d),St&&(St.textContent=Qt),ot&&(ot.classList.remove("hidden"),ii!==0&&(window.clearTimeout(ii),ii=0),si>0&&(ii=window.setTimeout(()=>{ot.classList.add("hidden"),ii=0},si)))},v=await te.captureScreenshot((jt,Qt,si)=>{C(jt,`高画質PNG書き出し中… (${Qt}×${si})`,0)});if(!v){Ua();return}const j=URL.createObjectURL(v.blob),$=document.createElement("a");$.href=j,$.download=d,$.style.display="none",document.body.appendChild($),$.click(),document.body.removeChild($),window.setTimeout(()=>URL.revokeObjectURL(j),1e4);let we=!1;if(typeof navigator<"u"&&navigator.clipboard&&typeof navigator.clipboard.write=="function"&&typeof ClipboardItem<"u")try{await navigator.clipboard.write([new ClipboardItem({"image/png":v.blob})]),we=!0}catch{we=!1}fi&&URL.revokeObjectURL(fi),fi=URL.createObjectURL(v.blob);const je=`${v.width}×${v.height}`,yt=we?`PNG保存 · クリップボードにコピー済 (${je})`:`PNGダウンロード完了 (${je})`;C(fi,yt,3800)}finally{za=!1}};We?.addEventListener("click",()=>{Rs()}),dt?.addEventListener("click",()=>{Rs()}),vt?.addEventListener("click",()=>{Rs()}),Me.addEventListener("click",()=>{document.fullscreenElement?document.exitFullscreen().catch(()=>{}):document.documentElement.requestFullscreen().catch(()=>{})});const $n=d=>{const C=document.activeElement?.tagName;if(C==="INPUT"||C==="TEXTAREA")return;const v=d.key.toLowerCase();if((d.code==="KeyO"||d.code==="F9")&&!d.ctrlKey&&!d.metaKey&&!d.altKey&&!d.repeat){d.preventDefault(),Rs();return}if(Ge==="okinawa"){if(d.code==="Tab"){d.preventDefault(),(F.isInDivingMode()||!zi.classList.contains("hidden"))&&zn();return}if(v==="b"){_t();return}v==="m"?(Xe.toggleMuted(),Ia()):v==="h"&&Es();return}if(Ge==="padi"){if(d.code==="Space"||d.code==="Enter"){d.preventDefault(),Ni&&it.handleStepAction(Ni);return}if(v==="w"){it.triggerInhale();return}if(v==="s"){it.triggerExhale("normal");return}if(v==="e"){it.adjustBcd(!0);return}if(v==="q"){it.adjustBcd(!1);return}if(v==="r"){it.triggerEqualize();return}if(v==="p"){it.triggerPurgeButton();return}if(v==="g"){it.triggerOkSignal();return}}d.code==="Space"||d.code==="Enter"?(d.preventDefault(),Ge==="pachinko"?Un():d.code==="Space"&&te.togglePlaying()):v==="m"?(Xe.toggleMuted(),Ia()):v==="h"?Es():v==="f"&&Me.click()},Kn=()=>te.resize();window.addEventListener("keydown",$n),window.addEventListener("resize",Kn),window.__disposeCarbonOceanApp=()=>{window.removeEventListener("keydown",$n),window.removeEventListener("resize",Kn),window.removeEventListener("pointermove",En),Ua(),fi&&(URL.revokeObjectURL(fi),fi=null),window.removeEventListener("pointerup",Bs),window.removeEventListener("blur",Bs),window.removeEventListener("message",_n),Xt(!1),F.dispose(),it.dispose(),Et.dispose(),te.dispose(),Xe.dispose()}}function H0(){if(document.visibilityState==="hidden"){const f=()=>{document.visibilityState!=="hidden"&&(document.removeEventListener("visibilitychange",f),mr())};document.addEventListener("visibilitychange",f);return}mr()}window.addEventListener("pagehide",()=>{window.__disposeCarbonOceanApp?.()});window.addEventListener("beforeunload",()=>{window.__disposeCarbonOceanApp?.()});H0();
