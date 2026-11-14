(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))e(i);new MutationObserver(i=>{for(const a of i)if(a.type==="childList")for(const n of a.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&e(n)}).observe(document,{childList:!0,subtree:!0});function t(i){const a={};return i.integrity&&(a.integrity=i.integrity),i.referrerPolicy&&(a.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?a.credentials="include":i.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function e(i){if(i.ep)return;i.ep=!0;const a=t(i);fetch(i.href,a)}})();function N(){const r=new Float32Array(16);return r[0]=1,r[5]=1,r[10]=1,r[15]=1,r}function $(r,o,t,e,i){const a=1/Math.tan(o*.5),n=1/(e-i);return r.fill(0),r[0]=a/t,r[5]=a,r[10]=(i+e)*n,r[11]=-1,r[14]=2*i*e*n,r}function X(r,o,t,e){let i=o[0]-t[0],a=o[1]-t[1],n=o[2]-t[2],c=Math.hypot(i,a,n);c<1e-6&&(n=1,c=1),i/=c,a/=c,n/=c;let l=e[1]*n-e[2]*a,h=e[2]*i-e[0]*n,s=e[0]*a-e[1]*i;c=Math.hypot(l,h,s),c<1e-6?(l=1,h=0,s=0):(l/=c,h/=c,s/=c);const u=a*s-n*h,d=n*l-i*s,m=i*h-a*l;return r[0]=l,r[1]=u,r[2]=i,r[3]=0,r[4]=h,r[5]=d,r[6]=a,r[7]=0,r[8]=s,r[9]=m,r[10]=n,r[11]=0,r[12]=-(l*o[0]+h*o[1]+s*o[2]),r[13]=-(u*o[0]+d*o[1]+m*o[2]),r[14]=-(i*o[0]+a*o[1]+n*o[2]),r[15]=1,r}function q(r,o,t){const e=o[0],i=o[1],a=o[2],n=o[3],c=o[4],l=o[5],h=o[6],s=o[7],u=o[8],d=o[9],m=o[10],p=o[11],E=o[12],w=o[13],S=o[14],A=o[15];for(let y=0;y<4;y++){const T=y*4,P=t[T],b=t[T+1],F=t[T+2],D=t[T+3];r[T]=P*e+b*c+F*u+D*E,r[T+1]=P*i+b*l+F*d+D*w,r[T+2]=P*a+b*h+F*m+D*S,r[T+3]=P*n+b*s+F*p+D*A}return r}function K(r,o){const t=o[0],e=o[1],i=o[2],a=o[3],n=o[4],c=o[5],l=o[6],h=o[7],s=o[8],u=o[9],d=o[10],m=o[11],p=o[12],E=o[13],w=o[14],S=o[15],A=t*c-e*n,y=t*l-i*n,T=t*h-a*n,P=e*l-i*c,b=e*h-a*c,F=i*h-a*l,D=s*E-u*p,g=s*w-d*p,C=s*S-m*p,M=u*w-d*E,U=u*S-m*E,I=d*S-m*w;let v=A*I-y*U+T*M+P*C-b*g+F*D;return Math.abs(v)<1e-12?N():(v=1/v,r[0]=(c*I-l*U+h*M)*v,r[1]=(i*U-e*I-a*M)*v,r[2]=(E*F-w*b+S*P)*v,r[3]=(d*b-u*F-m*P)*v,r[4]=(l*C-n*I-h*g)*v,r[5]=(t*I-i*C+a*g)*v,r[6]=(w*T-p*F-S*y)*v,r[7]=(s*F-d*T+m*y)*v,r[8]=(n*U-c*C+h*D)*v,r[9]=(e*C-t*U-a*D)*v,r[10]=(p*b-E*T+S*A)*v,r[11]=(u*T-s*b-m*A)*v,r[12]=(c*g-n*M-l*D)*v,r[13]=(t*M-e*g+i*D)*v,r[14]=(E*y-p*P-w*A)*v,r[15]=(s*P-u*y+d*A)*v,r)}function Z(r,o){const t=r[0]*o[0]+r[4]*o[1]+r[8]*o[2]+r[12],e=r[1]*o[0]+r[5]*o[1]+r[9]*o[2]+r[13],i=r[3]*o[0]+r[7]*o[1]+r[11]*o[2]+r[15];if(i<=.001)return[.5,1.25,0];const a=t/i,n=e/i;return[a*.5+.5,n*.5+.5,1]}function Q(r,o,t,e,i,a,n){const c=1/(o-t),l=1/(e-i),h=1/(a-n);return r.fill(0),r[0]=-2*c,r[5]=-2*l,r[10]=2*h,r[12]=(o+t)*c,r[13]=(i+e)*l,r[14]=(n+a)*h,r[15]=1,r}function Y(r,o,t,e){const i=r[0]*o+r[4]*t+r[8]*e+r[12],a=r[1]*o+r[5]*t+r[9]*e+r[13],n=r[2]*o+r[6]*t+r[10]*e+r[14],c=r[3]*o+r[7]*t+r[11]*e+r[15],l=Math.abs(c)>1e-7?1/c:1;return[i*l,a*l,n*l]}function J(){const r=[{z:.48,rx:.004,ry:.006,yOffset:0,axialT:0},{z:.36,rx:.042,ry:.072,yOffset:.004,axialT:.12},{z:.2,rx:.068,ry:.122,yOffset:.008,axialT:.28},{z:.02,rx:.064,ry:.118,yOffset:.006,axialT:.46},{z:-.16,rx:.04,ry:.078,yOffset:.002,axialT:.64},{z:-.32,rx:.015,ry:.032,yOffset:0,axialT:.8},{z:-.39,rx:.008,ry:.024,yOffset:0,axialT:.87}],o=8,t=[],e=[],i=[],a=[];for(let c=0;c<r.length;c++){const l=r[c];for(let h=0;h<o;h++){const s=h/o*Math.PI*2,u=Math.cos(s),d=Math.sin(s),m=1-.18*Math.pow(Math.abs(d),2),p=u*l.rx*m,E=d*l.ry+l.yOffset,w=l.z;t.push(p,E,w);let S=u/Math.max(l.rx,.01),A=d/Math.max(l.ry,.01),y=c===0?.65:(c-2.5)*-.06;const T=Math.hypot(S,A,y)||1;e.push(S/T,A/T,y/T),i.push(l.axialT,d,0)}}for(let c=0;c<r.length-1;c++){const l=c*o,h=(c+1)*o;for(let s=0;s<o;s++){const u=(s+1)%o,d=l+s,m=l+u,p=h+s,E=h+u;a.push(d,p,m),a.push(m,p,E)}}const n=(c,l,h,s)=>{const u=t.length/3;for(const d of[c,l,h])t.push(d[0]+s*.002,d[1],d[2]),e.push(s,d[4]*.15,-.1),i.push(d[3],d[4],1);s>0?a.push(u,u+1,u+2):a.push(u,u+2,u+1)};for(const c of[1,-1])n([0,.008,-.35,.84,.1],[0,.155,-.52,1,1],[0,.022,-.44,.93,.25],c),n([0,-.008,-.35,.84,-.1],[0,-.022,-.44,.93,-.25],[0,-.15,-.52,1,-1],c),n([0,.115,.14,.34,.95],[0,.195,-.05,.53,1],[0,.095,-.12,.6,.9],c);return{positions:new Float32Array(t),normals:new Float32Array(e),bodyCoords:new Float32Array(i),indices:new Uint16Array(a)}}function ee(r){let o=r>>>0;return()=>{o|=0,o=o+1831565813|0;let t=Math.imul(o^o>>>15,1|o);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296}}function te(r,o){const n=[];for(;n.length<r;){const c=Math.floor(o()*4),l=c===0||c===3?1:-1,h=c===0||c===1?1:-1,s=Math.pow(o(),.62),u=o(),d=s*u,m=s*(1-u),p=l*3.05*Math.pow(Math.max(d,1e-6),1/.49),E=h*3.18*Math.pow(Math.max(m,1e-6),1/.49),w=d+m,S=1.02*Math.pow(Math.max(0,1-w),.8),A=o()<.76,y=o()<.5?1:-1,T=A?.75+.25*o():o()*.75,P=y*S*T,b=Math.atan2(E,p);n.push({x:p,y:E+.42,z:P,angle:b,shell:s})}return n.sort((c,l)=>{const h=Math.floor((c.angle+Math.PI)/(2*Math.PI)*32),s=Math.floor((l.angle+Math.PI)/(2*Math.PI)*32);return h!==s?h-s:c.shell-l.shell}),n}function oe(r,o){const t=r*o,e=64,i=Math.max(1,Math.floor(t/e)),a=ee(20261115),n=new Float32Array(t*4),c=new Float32Array(t*4),l=new Float32Array(t*4),h=new Float32Array(t*4),s=Math.max(1,Math.floor(i*.86)),u=s*e,d=te(u,a);for(let m=0;m<i;m++){const p=m>=s,E=m/Math.max(1,i-1),w=E*Math.PI*2*5+a()*.8,S=(a()-.5)*1.65,A=p?5.2+a()*4.2:.55+Math.pow(a(),.72)*2.85,y=Math.cos(w)*A*1.25,T=.08+S*(p?1.2:.85),P=Math.sin(w)*A*(p?1.2:.92)-(p?5.5:0),b=m%3===0?-1:1,F=-Math.sin(w)*2*b,D=(a()-.5)*.5,g=Math.cos(w)*2*b,M=(m%2===0?-1:1)*(4.6+a()*4.8),U=-.9+a()*1.9,I=-4.5-a()*5;for(let v=0;v<e;v++){const _=m*e+v;if(_>=t)break;const x=_*4,L=.45*Math.cbrt(a()),f=a()*Math.PI*2,R=Math.acos(2*a()-1),z=L*Math.sin(R)*Math.cos(f),G=L*Math.sin(R)*Math.sin(f)*.7,W=L*Math.cos(R);n[x]=y+z,n[x+1]=T+G,n[x+2]=P+W,n[x+3]=a()*Math.PI*2,c[x]=F+(a()-.5)*.5,c[x+1]=D+(a()-.5)*.3,c[x+2]=g+(a()-.5)*.5,c[x+3]=2.2;const j=.78+Math.pow(a(),1.4)*.52;if(l[x]=E,l[x+1]=p?1:0,l[x+2]=j,l[x+3]=a(),!p&&_<d.length){const V=d[_];h[x]=V.x,h[x+1]=V.y,h[x+2]=V.z,h[x+3]=V.shell}else h[x]=M+z*2.2,h[x+1]=U+G*1.6,h[x+2]=I+W*2.2,h[x+3]=a()}}return{posData:n,velData:c,metaData:l,starTargetData:h,podSize:e,podCount:i}}const k=`#version 300 es
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
`,H=`
const float PI = 3.14159265359;
const float OCEAN_SURFACE_Y = 5.45;

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

// Multi-directional ocean swell + fine FBM capillary chop
vec3 evalOceanSurface(vec2 xz, float time) {
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

  // Numerical gradient of fine FBM chop for photorealistic micro-facets
  const float eps = 0.08;
  float f0 = fbmOcean(xz * 0.95, time);
  float fx = fbmOcean((xz + vec2(eps, 0.0)) * 0.95, time);
  float fz = fbmOcean((xz + vec2(0.0, eps)) * 0.95, time);
  h += (f0 - 0.5) * 0.22;
  grad += vec2(fx - f0, fz - f0) / eps * 0.22;

  return vec3(h, grad.x, grad.y);
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

// True linear-space deep Prussian/cerulean ocean palette (calibrated for ACES + 1/2.2 sRGB output)
vec3 evalOceanAmbient(vec3 rayDir, float depthY) {
  float upFactor = clamp(rayDir.y * 0.5 + 0.5, 0.0, 1.0);
  float heightFactor = clamp((depthY + 8.0) / 14.0, 0.0, 1.0);

  vec3 abyssColor   = vec3(0.0010, 0.015, 0.034);
  vec3 midTealColor = vec3(0.0038, 0.048, 0.092);
  vec3 shallowCyan  = vec3(0.0160, 0.128, 0.195);

  vec3 base = mix(abyssColor, midTealColor, pow(upFactor, 0.85));
  base = mix(base, shallowCyan, pow(upFactor, 2.8) * (0.40 + 0.60 * heightFactor));
  return base;
}
`,ae=`#version 300 es
precision highp float;
precision highp sampler2D;

in vec2 vUv;

uniform sampler2D uPosTex;
uniform sampler2D uVelTex;
uniform sampler2D uMetaTex;
uniform sampler2D uStarTex;

uniform ivec2 uSimRes;
uniform float uTime;
uniform float uSeqTime;     // [0..26) seconds
uniform int uMode;          // 0=Auto26s, 1=BaitBall, 2=TwinWings, 3=GeminiStar, 4=FreeOcean
uniform float uDt;
uniform int uFrame;
uniform vec4 uPointerWorld; // xyz = 3D world point, w = active strength

layout(location = 0) out vec4 outPos;
layout(location = 1) out vec4 outVel;

const float PI = 3.14159265359;
const float TAU = 6.28318530718;

vec3 safeNormalize(vec3 v, vec3 fallback) {
  float len2 = dot(v, v);
  return len2 > 1e-8 ? v * inversesqrt(len2) : fallback;
}

float hash31(vec3 p) {
  p = fract(p * 0.1031);
  p += dot(p, p.yzx + 31.32);
  return fract((p.x + p.y) * p.z);
}

float valueNoise3D(vec3 p) {
  vec3 i = floor(p);
  vec3 f = fract(p);
  vec3 u = f * f * (3.0 - 2.0 * f);

  float n000 = hash31(i + vec3(0.0, 0.0, 0.0));
  float n100 = hash31(i + vec3(1.0, 0.0, 0.0));
  float n010 = hash31(i + vec3(0.0, 1.0, 0.0));
  float n110 = hash31(i + vec3(1.0, 1.0, 0.0));
  float n001 = hash31(i + vec3(0.0, 0.0, 1.0));
  float n101 = hash31(i + vec3(1.0, 0.0, 1.0));
  float n011 = hash31(i + vec3(0.0, 1.0, 1.0));
  float n111 = hash31(i + vec3(1.0, 1.0, 1.0));

  float nx00 = mix(n000, n100, u.x);
  float nx10 = mix(n010, n110, u.x);
  float nx01 = mix(n001, n101, u.x);
  float nx11 = mix(n011, n111, u.x);

  float nxy0 = mix(nx00, nx10, u.y);
  float nxy1 = mix(nx01, nx11, u.y);
  return mix(nxy0, nxy1, u.z);
}

vec3 noiseVec3(vec3 p) {
  return vec3(
    valueNoise3D(p),
    valueNoise3D(p + vec3(31.7, 17.3, 53.1)),
    valueNoise3D(p + vec3(73.9, 89.2, 11.4))
  );
}

// Divergence-free 3D Curl Noise for organic underwater fluid turbulence
vec3 curlNoise(vec3 p) {
  const float e = 0.12;
  vec3 dx = vec3(e, 0.0, 0.0);
  vec3 dy = vec3(0.0, e, 0.0);
  vec3 dz = vec3(0.0, 0.0, e);

  vec3 px1 = noiseVec3(p + dx);
  vec3 px0 = noiseVec3(p - dx);
  vec3 py1 = noiseVec3(p + dy);
  vec3 py0 = noiseVec3(p - dy);
  vec3 pz1 = noiseVec3(p + dz);
  vec3 pz0 = noiseVec3(p - dz);

  float cx = (py1.z - py0.z) - (pz1.y - pz0.y);
  float cy = (pz1.x - pz0.x) - (px1.z - px0.z);
  float cz = (px1.y - px0.y) - (py1.x - py0.x);
  return (vec3(cx, cy, cz) / (2.0 * e));
}

// Tangential vector along the 4-pointed Gemini Star contour |x/Rx|^p + |(y-y0)/Ry|^p = const
// Uses positive exponents (1 - p = 0.51) so there are zero singularities anywhere in R^2.
vec3 evalStarTangent(vec3 pos) {
  const float Rx = 3.05;
  const float Ry = 3.18;
  const float yCenter = 0.42;
  float sx = pos.x / Rx;
  float sy = (pos.y - yCenter) / Ry;

  float sgnX = sx >= 0.0 ? 1.0 : -1.0;
  float sgnY = sy >= 0.0 ? 1.0 : -1.0;

  vec2 tangXY = vec2(
    -sgnY * pow(max(abs(sx), 1e-4), 0.51) * Rx,
     sgnX * pow(max(abs(sy), 1e-4), 0.51) * Ry
  );
  return safeNormalize(vec3(tangXY, 0.0), vec3(0.0, 1.0, 0.0));
}

void main() {
  ivec2 coord = ivec2(gl_FragCoord.xy);
  int idx = coord.y * uSimRes.x + coord.x;

  vec4 posState = texelFetch(uPosTex, coord, 0);
  vec4 velState = texelFetch(uVelTex, coord, 0);
  vec4 meta     = texelFetch(uMetaTex, coord, 0);
  vec4 starHome = texelFetch(uStarTex, coord, 0);

  vec3 pos = posState.xyz;
  float swimPhase = posState.w;
  vec3 vel = velState.xyz;
  float smoothedSpeed = velState.w;

  float podNorm   = meta.x;
  float isAmbient = meta.y; // 0.0 = hero swarm, 1.0 = ambient background schools
  float scale     = meta.z;
  float seed      = meta.w;

  // Compute phase blend weights from uMode / uSeqTime (26.0s choreography loop)
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
    // Act I: Swirling Bait Ball (0.0s .. 6.2s, plus wraparound arrival 25.0s .. 26.0s)
    wBait = (1.0 - smoothstep(5.5, 7.1, t)) + smoothstep(25.0, 25.9, t);
    wBait = clamp(wBait, 0.0, 1.0);

    // Act II: Twin Manta Wing Clusters (6.2s .. 10.5s)
    wWings = smoothstep(5.6, 7.2, t) * (1.0 - smoothstep(9.7, 11.2, t));

    // Act III: 3D Faceted Gemini Star Formation (10.5s .. 16.2s)
    wStar = smoothstep(9.9, 11.7, t) * (1.0 - smoothstep(15.7, 16.9, t));

    // Act IV & V: Pod Dispersion (16.2s .. 24.8s) -> Tranquil Open Water -> Deep Return
    wScatter = smoothstep(15.8, 16.9, t) * (1.0 - smoothstep(24.6, 25.2, t));
    wReturn  = smoothstep(24.6, 25.3, t) * (1.0 - smoothstep(25.8, 26.0, t));
  }

  // Subtle re-seeding behind deep Beer-Lambert fog wall at t ~ 24.7s while completely off-screen
  if (uMode == 0 && t > 24.65 && t < 24.82 && abs(pos.x) > 13.5) {
    float podAng = podNorm * TAU * 4.0;
    pos = vec3(
      cos(podAng) * 2.8 + (seed - 0.5) * 1.5,
      0.08 + sin(podAng * 1.7) * 1.3,
      -23.0 - seed * 3.5
    );
    vel = vec3(0.0, 0.0, 11.0);
  }

  // --- 1. Local Pod Reynolds Boids (O(1) 16-peer strided sampling within 64-fish pod) ---
  int podSize = 64;
  int podStartIdx = (idx / podSize) * podSize;
  int localId = idx - podStartIdx;
  int strideOffset = (uFrame * 7 + localId) & 3;

  vec3 sepForce = vec3(0.0);
  vec3 alignSum = vec3(0.0);
  vec3 cohSum   = vec3(0.0);
  float neighborWeight = 0.0;

  // Tighter separation during Gemini Star so the sculpted 3D shape stays crisp
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

  // --- 2. Fluid Curl Turbulence ---
  vec3 curl = curlNoise(pos * 0.28 + vec3(0.0, uTime * 0.16, uTime * 0.11));
  float curlGain = mix(1.65, 0.32, wStar);
  if (uMode == 4) curlGain = 2.1;
  vec3 accel = boidsAccel + curl * curlGain;

  // --- 3. Choreography Target Forces ---
  if (isAmbient < 0.5) {
    // === HERO SWARM (86% of fish) ===

    // (A) Bait Ball Swirling Torus + Billowing Envelope
    if (wBait > 0.001 || uMode == 4) {
      float baitStrength = (uMode == 4) ? 0.55 : wBait;
      vec3 center = vec3(
        sin(uTime * 0.42) * 0.28,
        0.08 + cos(uTime * 0.33) * 0.14,
        sin(uTime * 0.27) * 0.24
      );
      vec3 rel = pos - center;
      // Ellipsoidal containment (wider horizontally like the reference bait ball)
      vec3 scaledRel = rel / vec3(3.45, 1.85, 2.85);
      float rNorm = length(scaledRel);

      // Counter-tilted toroidal vortex swirl
      float swirlDir = (mod(floor(podNorm * 32.0), 4.0) < 1.0) ? -1.0 : 1.0;
      vec3 swirlAxis = normalize(vec3(0.18 * sin(uTime * 0.3 + podNorm * 6.0), 1.0, 0.15 * cos(uTime * 0.25)));
      vec3 tang = safeNormalize(cross(swirlAxis, rel), vec3(1.0, 0.0, 0.0)) * swirlDir;

      // Pod ribbon undulation inside bait ball
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

    // (B) Twin Manta Wing Clusters (00:07 .. 00:10)
    if (wWings > 0.001) {
      float wingSide = (starHome.x >= 0.0) ? 1.0 : -1.0;
      float spanU = fract(podNorm * 13.7 + starHome.w * 0.5);
      float chordV = fract(seed * 7.13 + podNorm * 3.1) - 0.5;

      // Swept organic manta-wing clusters framed with generous ocean space
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

    // (C) Sculpted 3D Faceted Gemini Star (00:11 .. 00:16)
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

    // (D) Pod Dispersion into Distinct Sub-Schools (00:16.2 .. 00:22.0)
    if (wScatter > 0.001) {
      float side = (starHome.x >= 0.0) ? 1.0 : -1.0;
      if (abs(starHome.x) < 0.25) {
        side = (mod(floor(podNorm * 64.0), 2.0) < 0.5) ? -1.0 : 1.0;
      }
      // Group into 40 distinct cohesive sub-schools with varied elevation & depth lanes
      float groupIdx = floor(podNorm * 40.0);
      float gHash1 = fract(sin(groupIdx * 12.9898) * 43758.5453);
      float gHash2 = fract(sin(groupIdx * 78.233) * 24634.6345);
      float gHash3 = fract(sin(groupIdx * 39.425) * 17351.9182);

      float scatterElapsed = max(0.0, t - 16.0 - gHash3 * 0.55);
      // Cruise at measured pelagic speed (~2.45 u/s) so 00:18..00:20 showcases dozens of visible pods,
      // then accelerate cleanly past the frame edges after 20.6s for the tranquil Act V ocean.
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

    // (E) Deep-Mist Surge Return (00:24.8 .. 00:26.0)
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
    // === AMBIENT SATELLITE SCHOOLS (14% of fish) ===
    // Drift gently in deeper water behind/beside the main spectacle, then clear out for Act V
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

  // --- 4. Interactive Pointer Water Current Vortex ---
  if (uPointerWorld.w > 0.01) {
    vec3 toPtr = pos - uPointerWorld.xyz;
    float d2 = dot(toPtr, toPtr);
    if (d2 < 18.0 && d2 > 1e-5) {
      float falloff = exp(-d2 * 0.18) * uPointerWorld.w;
      vec3 pushDir = toPtr * inversesqrt(d2);
      vec3 swirlDir = safeNormalize(cross(vec3(0.0, 1.0, 0.0), pushDir), vec3(1.0, 0.0, 0.0));
      // Gentle fluid current deflection (less intrusive during peak Star lock)
      float ptrScale = mix(6.5, 2.2, wStar);
      accel += (pushDir * 0.65 + swirlDir * 0.85) * falloff * ptrScale;
    }
  }

  // --- 5. Ocean Surface & Seabed Soft Boundaries ---
  if (pos.y > 4.45) {
    accel.y -= (pos.y - 4.45) * 9.0;
  }
  if (pos.y < -6.2) {
    accel.y += (-6.2 - pos.y) * 6.0;
  }
  if (uMode == 4) {
    // Keep free-roaming ocean schools within a generous scenic volume
    vec3 bounds = pos / vec3(11.0, 4.5, 9.0);
    if (length(bounds) > 1.0) {
      accel -= bounds * 3.5;
    }
  }

  // --- 6. Symplectic Euler Integration & Speed Clamping ---
  vel += accel * uDt;
  // Subtle hydrodynamic drag
  vel *= exp(-0.65 * uDt);

  float maxSpd = mix(4.6, 5.8, max(wScatter, wReturn)) * (0.88 + 0.24 * scale);
  float minSpd = mix(1.25, 0.85, wStar);
  float spd = length(vel);
  vec3 dir = safeNormalize(vel, vec3(1.0, 0.0, 0.0));
  spd = clamp(spd, minSpd, maxSpd);
  vel = dir * spd;

  pos += vel * uDt;

  // Guard against any numerical NaN/Inf across long sessions
  if (any(isnan(pos)) || any(isinf(pos))) {
    pos = starHome.xyz;
    vel = vec3(1.0, 0.0, 0.0);
    spd = 1.5;
  }

  // Advance biomechanical tail-beat phase proportional to instantaneous swimming speed
  float beatFreq = 6.5 + spd * 3.4;
  swimPhase = mod(swimPhase + beatFreq * uDt, TAU);
  smoothedSpeed = mix(smoothedSpeed, spd, clamp(uDt * 8.0, 0.0, 1.0));

  outPos = vec4(pos, swimPhase);
  outVel = vec4(vel, smoothedSpeed);
}
`,se=`#version 300 es
precision highp float;

in vec2 vUv;

uniform mat4 uInvViewProj;
uniform vec3 uCamPos;
uniform vec3 uSunDir;
uniform float uTime;

out vec4 outColor;

${H}

void main() {
  vec2 ndc = vUv * 2.0 - 1.0;
  vec4 farClip = uInvViewProj * vec4(ndc, 1.0, 1.0);
  vec3 worldFar = farClip.xyz / max(farClip.w, 1e-6);
  vec3 rayDir = normalize(worldFar - uCamPos);

  vec3 waterCol = evalOceanAmbient(rayDir, uCamPos.y + rayDir.y * 12.0);

  if (rayDir.y > 0.015) {
    float tFlat = (OCEAN_SURFACE_Y - uCamPos.y) / rayDir.y;
    if (tFlat > 0.0 && tFlat < 90.0) {
      vec3 hitPos = uCamPos + rayDir * tFlat;
      for (int i = 0; i < 3; i++) {
        vec3 s = evalOceanSurface(hitPos.xz, uTime);
        float targetY = OCEAN_SURFACE_Y + s.x;
        tFlat += (targetY - hitPos.y) / max(rayDir.y, 0.09);
        hitPos = uCamPos + rayDir * tFlat;
      }

      vec3 surf = evalOceanSurface(hitPos.xz, uTime);
      vec3 surfNormal = normalize(vec3(-surf.y * 1.15, -1.0, -surf.z * 1.15));

      // Continuous Snell's Window evaluation (smooth critical-angle transition, zero hard binary blobs)
      const float eta = 1.115;
      float cosI = clamp(dot(-rayDir, surfNormal), 0.0, 1.0);
      float k = 1.0 - eta * eta * (1.0 - cosI * cosI);
      float windowTrans = smoothstep(-0.04, 0.14, k);

      vec3 reflected = reflect(rayDir, surfNormal);
      // Rich dark-and-cyan underwater total internal reflection on outer ocean swells
      float waveFacing = clamp(0.5 + 0.5 * dot(surfNormal.xz, normalize(vec2(0.0, 1.0))), 0.0, 1.0);
      vec3 reflCol = mix(
        vec3(0.0012, 0.020, 0.044),
        vec3(0.018, 0.135, 0.210),
        pow(waveFacing, 1.8) * smoothstep(55.0, 8.0, tFlat)
      );

      vec3 refrDir = normalize(eta * rayDir + (eta * cosI - sqrt(max(k, 0.0))) * surfNormal);
      vec3 skySunDir = normalize(vec3(uSunDir.x, 0.355, -0.9348));
      float sunAlign = max(dot(refrDir, skySunDir), 0.0);

      // Subtle radial Snell's Window crown framing at top-center
      float lateralFalloff = exp(-pow(hitPos.x * 0.088, 2.0) - pow((hitPos.z + 5.2) * 0.055, 2.0));

      vec3 skyCyan = mix(vec3(0.012, 0.085, 0.145), vec3(0.16, 0.56, 0.74), pow(clamp(refrDir.y, 0.0, 1.0), 0.7))
                   * (0.35 + 0.65 * lateralFalloff);

      float sunCore = pow(sunAlign, 52.0) * 14.0 * lateralFalloff;
      float sunHalo = (pow(sunAlign, 8.5) * 3.2 + pow(sunAlign, 2.6) * 0.78) * (0.35 + 0.65 * lateralFalloff);
      float waveGlint = smoothstep(0.08, 0.45, length(surf.yz)) * pow(sunAlign, 4.5) * 1.65 * lateralFalloff;

      vec3 transmitted = skyCyan + vec3(0.84, 0.98, 1.0) * (sunCore + sunHalo + waveGlint);
      float fresnel = pow(1.0 - cosI, 4.0);
      vec3 surfaceRad = mix(reflCol, transmitted, windowTrans * (1.0 - fresnel * 0.82));

      // Underwater Beer-Lambert attenuation along sightline to surface
      vec3 sigmaExt = vec3(0.075, 0.032, 0.022);
      vec3 trans = exp(-sigmaExt * tFlat);
      vec3 inScatter = evalOceanAmbient(rayDir, OCEAN_SURFACE_Y) * (1.0 - exp(-0.032 * tFlat));

      waterCol = surfaceRad * trans + inScatter;
    }
  } else {
    float downT = clamp(-rayDir.y * 2.2, 0.0, 1.0);
    waterCol = mix(waterCol, vec3(0.0006, 0.009, 0.022), downT * 0.72);
  }

  outColor = vec4(waterCol, 1.0);
}
`,ie=`#version 300 es
precision highp float;
precision highp sampler2D;

layout(location = 0) in vec3 aPosition;
layout(location = 2) in vec3 aBodyCoord;

uniform sampler2D uPosTex;
uniform sampler2D uVelTex;
uniform sampler2D uMetaTex;
uniform ivec2 uSimRes;
uniform mat4 uSunViewProj;

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

  float fishLen = 0.22 * meta.z;
  float axialT  = aBodyCoord.x;
  float sway    = sin(swimPhase - axialT * 4.4) * (0.085 * axialT * axialT);

  vec3 localPos = aPosition;
  localPos.x += sway;
  localPos *= fishLen;

  vec3 worldPos = fishCenter + right * localPos.x + up * localPos.y + forward * localPos.z;
  gl_Position = uSunViewProj * vec4(worldPos, 1.0);
}
`,re=`#version 300 es
precision highp float;
void main() {
  // Depth-only pass
}
`,ne=`#version 300 es
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

out vec3 vWorldPos;
out vec3 vWorldNormal;
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

  // Subtle natural roll banking during horizontal turns
  float bankAngle = clamp(-vel.x * 0.055 * (1.0 - abs(forward.y)), -0.38, 0.38);
  float cb = cos(bankAngle);
  float sb = sin(bankAngle);
  vec3 bankedRight = right * cb + up * sb;
  vec3 bankedUp    = -right * sb + up * cb;

  // Carangiform swimming spine wave: steady head, quadratic amplitude toward forked caudal fin
  float axialT = aBodyCoord.x;
  float waveArg = swimPhase - axialT * 4.5;
  float amp = (0.055 + 0.022 * clamp(speed * 0.25, 0.0, 1.5)) * axialT * axialT;
  float sway = sin(waveArg) * amp;
  float dSwayDz = cos(waveArg) * 4.5 * amp;

  float fishLen = 0.215 * meta.z;
  vec3 localPos = aPosition;
  localPos.x += sway;
  localPos *= fishLen;

  // Rotate local normal slightly by spine curvature so silver flanks flash dynamically as tails beat
  vec3 localNorm = aNormal;
  localNorm.x -= dSwayDz * localNorm.z * 0.45;
  localNorm = safeNorm(localNorm);

  vWorldPos = fishCenter + bankedRight * localPos.x + bankedUp * localPos.y + forward * localPos.z;
  vWorldNormal = safeNorm(bankedRight * localNorm.x + bankedUp * localNorm.y + forward * localNorm.z);
  vBodyCoord = aBodyCoord;
  vSeed = meta.w;
  vSpeed = speed;

  gl_Position = uViewProj * vec4(vWorldPos, 1.0);
}
`,ce=`#version 300 es
precision highp float;
precision highp sampler2D;

in vec3 vWorldPos;
in vec3 vWorldNormal;
in vec3 vBodyCoord;
in float vSeed;
in float vSpeed;

uniform vec3 uCamPos;
uniform vec3 uSunDir;
uniform float uTime;
uniform mat4 uSunViewProj;
uniform sampler2D uSunShadowTex;
uniform vec2 uShadowTexelSize;

out vec4 outColor;

${H}

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
  // Dramatic abyssal self-shadowing (0.09 in deep school shadow -> 1.0 on sun-kissed upper crown)
  return mix(0.09, 1.0, lit * 0.2);
}

void main() {
  vec3 N = normalize(vWorldNormal);
  vec3 toCam = uCamPos - vWorldPos;
  float dist = length(toCam);
  vec3 V = toCam / max(dist, 1e-5);

  float dorsal = clamp(vBodyCoord.y, -1.0, 1.0);
  float flankFactor = sqrt(clamp(1.0 - dorsal * dorsal, 0.0, 1.0));

  // Rich high-contrast pelagic fish materials (deep Prussian back, mirror-silver flank, dark silhouette belly)
  vec3 backAlbedo  = vec3(0.008, 0.048, 0.085);
  vec3 flankAlbedo = vec3(0.42, 0.68, 0.80);
  vec3 bellyAlbedo = vec3(0.015, 0.055, 0.090);

  vec3 baseAlbedo = dorsal >= 0.0
    ? mix(flankAlbedo, backAlbedo, pow(dorsal, 0.85))
    : mix(flankAlbedo, bellyAlbedo, pow(-dorsal, 0.95));

  baseAlbedo = mix(baseAlbedo, vec3(0.05, 0.18, 0.28), vBodyCoord.z * 0.5);

  float shadowVis = sampleOverheadShadow(vWorldPos);
  float caustic = evalSunShaftCaustic(vWorldPos, uTime, uSunDir);
  float sunIrradiance = shadowVis * (0.48 + 1.85 * caustic);

  float wrapL = clamp((dot(N, uSunDir) + 0.22) / 1.22, 0.0, 1.0);

  // Crisp metallic guanine-crystal specular flash on banking flanks
  vec3 H = normalize(uSunDir + V);
  float NdotH = max(dot(N, H), 0.0);
  float specSharp = pow(NdotH, 54.0) * (0.65 + 1.15 * flankFactor);
  float specBroad = pow(NdotH, 10.0) * 0.36 * flankFactor;

  float fresnel = pow(1.0 - max(dot(N, V), 0.0), 3.4);
  float skyUp = clamp(N.y * 0.5 + 0.5, 0.0, 1.0);
  vec3 skyIrradiance = mix(vec3(0.0010, 0.009, 0.020), vec3(0.038, 0.175, 0.265), skyUp * skyUp);

  vec3 sunColor = vec3(0.86, 0.99, 1.06);
  vec3 litFish = baseAlbedo * (skyIrradiance * (0.35 + 0.65 * shadowVis) + sunColor * wrapL * 0.68 * sunIrradiance)
               + sunColor * (specSharp * 3.4 + specBroad * 0.95) * sunIrradiance
               + vec3(0.24, 0.72, 0.92) * fresnel * max(N.y + 0.2, 0.0) * 0.52 * shadowVis;

  litFish *= 0.86 + 0.30 * vSeed;

  // Preserve crisp silhouette contrast near camera while smoothly blending distant background pods into deep water
  vec3 viewRay = -V;
  float fogDist = max(dist - 3.2, 0.0);
  vec3 sigmaExt = vec3(0.062, 0.026, 0.018);
  vec3 trans = exp(-sigmaExt * fogDist);
  vec3 fogColor = evalOceanAmbient(viewRay, vWorldPos.y);
  float fogMix = 1.0 - exp(-0.028 * fogDist);

  vec3 finalRgb = litFish * trans + fogColor * fogMix;
  outColor = vec4(finalRgb, 1.0);
}
`,le=`#version 300 es
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

  float dist = length(pos - uCamPos);
  float depthFade = smoothstep(24.0, 4.0, dist) * smoothstep(0.8, 3.0, dist);
  float heightGlow = clamp((pos.y + 6.0) / 11.5, 0.15, 1.0);

  vAlpha = depthFade * heightGlow * (0.16 + 0.26 * h4);
  vTwinkle = 0.65 + 0.35 * sin(uTime * (1.8 + h2 * 2.5) + h3 * 6.283);

  gl_Position = uViewProj * vec4(pos, 1.0);
  gl_PointSize = clamp((14.0 / max(dist, 1.5)) * (0.65 + 0.9 * h4) * uDpr, 1.2, 5.5 * uDpr);
}
`,he=`#version 300 es
precision highp float;

in float vAlpha;
in float vTwinkle;

out vec4 outColor;

void main() {
  vec2 d = gl_PointCoord - 0.5;
  float r2 = dot(d, d);
  if (r2 > 0.25) discard;

  float soft = exp(-r2 * 14.0);
  vec3 col = vec3(0.48, 0.88, 0.98) * soft * vAlpha * vTwinkle;
  outColor = vec4(col, 1.0);
}
`,fe=`#version 300 es
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

out vec4 outColor;

${H}

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
  vec3 baseHdr = texture(uSceneColorTex, vUv).rgb;
  float rawDepth = texture(uSceneDepthTex, vUv).r;

  vec2 ndc = vUv * 2.0 - 1.0;
  vec4 worldClip = uInvViewProj * vec4(ndc, rawDepth * 2.0 - 1.0, 1.0);
  vec3 worldHit = worldClip.xyz / max(worldClip.w, 1e-6);

  vec4 farClip = uInvViewProj * vec4(ndc, 1.0, 1.0);
  vec3 worldFar = farClip.xyz / max(farClip.w, 1e-6);
  vec3 rayDir = normalize(worldFar - uCamPos);

  float hitDist = (rawDepth >= 0.99995) ? 24.0 : min(length(worldHit - uCamPos), 24.0);

  // --- 1. 3D World-Space Volumetric Scattering + Fish School Shadow Shafts ---
  const int MARCH_STEPS = 20;
  float jitter = interleavedGradientNoise(gl_FragCoord.xy);
  float tStart = 0.65;
  float tEnd = max(tStart + 0.1, hitDist);
  float stepLen = (tEnd - tStart) / float(MARCH_STEPS);

  float cosAngle = dot(rayDir, uSunDir);
  const float g = 0.62;
  float hg = (1.0 - g * g) / (4.0 * PI * pow(max(1.0 + g * g - 2.0 * g * cosAngle, 0.03), 1.5));
  float phaseBoost = 0.35 + min(hg * 1.25, 2.2);

  vec3 volScatter = vec3(0.0);
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
  volScatter *= 0.155 * phaseBoost * uGodRayIntensity;

  // --- 2. Crisp Crepuscular God-Ray Shafts with Fish Silhouette Occlusion ---
  vec3 radialShafts = vec3(0.0);
  if (uSunScreen.z > 0.01 && uGodRayIntensity > 0.01) {
    float aspect = uTexelSize.y / max(uTexelSize.x, 1e-6);
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

    radialShafts = vec3(0.24, 0.74, 0.90) * (rayPattern * visFactor * 0.42 * uGodRayIntensity * uSunScreen.z);
  }

  // --- 3. Subtle HDR Specular Glint Halo ---
  vec3 glow = vec3(0.0);
  const vec2 ring[8] = vec2[8](
    vec2(1.0, 0.0), vec2(-1.0, 0.0), vec2(0.0, 1.0), vec2(0.0, -1.0),
    vec2(0.707, 0.707), vec2(-0.707, 0.707), vec2(0.707, -0.707), vec2(-0.707, -0.707)
  );
  for (int i = 0; i < 8; i++) {
    vec3 c1 = texture(uSceneColorTex, clamp(vUv + ring[i] * uTexelSize * 2.8, vec2(0.001), vec2(0.999))).rgb;
    vec3 c2 = texture(uSceneColorTex, clamp(vUv + ring[i] * uTexelSize * 7.5, vec2(0.001), vec2(0.999))).rgb;
    glow += max(c1 - vec3(0.75), vec3(0.0)) * 0.55 + max(c2 - vec3(0.95), vec3(0.0)) * 0.35;
  }
  glow *= 0.055;

  vec3 hdr = baseHdr + volScatter + radialShafts + glow;

  // Deep cinema vignette matching the abyssal framing
  vec2 vigUv = vUv - 0.5;
  float vignette = 1.0 - dot(vigUv * vec2(1.05, 0.92), vigUv * vec2(1.05, 0.92)) * 0.52;
  hdr *= clamp(vignette, 0.52, 1.0);

  vec3 mapped = acesToneMap(hdr * 1.12);
  vec3 srgb = pow(mapped, vec3(1.0 / 2.2));

  outColor = vec4(srgb, 1.0);
}
`,ue={"16k":[128,128],"32k":[256,128],"65k":[256,256]},B=26,O=1024,de=2200;class me{canvas;gl;floatInternalFormat;hdrColorInternalFormat;hdrColorType;simProg;shadowProg;oceanProg;fishProg;planktonProg;postProg;emptyVao;fishVao;fishBuffers;fishIndexCount;preset="32k";simW=256;simH=128;fishCount=32768;simTargets=null;metaTex=null;starTex=null;simPingIndex=0;shadowFbo;shadowDepthTex;sceneFbo=null;sceneColorTex=null;sceneDepthTex=null;renderWidth=0;renderHeight=0;currentDpr=1;projMat=N();viewMat=N();viewProjMat=N();invViewProjMat=N();sunViewMat=N();sunProjMat=N();sunViewProjMat=N();sunDir=[0,.855,-.518];surfaceSunWorld=[0,5.65,-4.6];targetYaw=0;targetPitch=-.195;targetDist=11.8;curYaw=0;curPitch=-.195;curDist=11.8;camTarget=[0,.36,0];camPos=[0,-1.94,11.58];pointerNdcX=0;pointerNdcY=0;pointerStrength=0;pointerEnabled=!0;elapsedTime=0;seqTime=0;playing=!0;mode=0;godRayIntensity=1;causticIntensity=1;frameCounter=0;rafId=0;lastTimestamp=0;fpsAccum=0;fpsFrames=0;currentFps=60;onTelemetry;constructor(o,t){this.canvas=o,this.onTelemetry=t;const e=o.getContext("webgl2",{alpha:!1,antialias:!1,depth:!1,stencil:!1,powerPreference:"high-performance",preserveDrawingBuffer:!1});if(!e)throw new Error("WebGL2 is required to run the GPGPU VFX Engine.");this.gl=e;const i=e.getExtension("EXT_color_buffer_float"),a=e.getExtension("EXT_color_buffer_half_float");e.getExtension("OES_texture_float_linear"),this.floatInternalFormat=i?e.RGBA32F:e.RGBA16F,i||a?(this.hdrColorInternalFormat=e.RGBA16F,this.hdrColorType=e.HALF_FLOAT):(this.hdrColorInternalFormat=e.RGBA8,this.hdrColorType=e.UNSIGNED_BYTE);const n=Math.hypot(this.sunDir[0],this.sunDir[1],this.sunDir[2]);this.sunDir[0]/=n,this.sunDir[1]/=n,this.sunDir[2]/=n,X(this.sunViewMat,[this.sunDir[0]*18,this.sunDir[1]*18,this.sunDir[2]*18-.8],[0,-.3,-.8],[0,0,-1]),Q(this.sunProjMat,-13.5,13.5,-13.5,13.5,1,38),q(this.sunViewProjMat,this.sunProjMat,this.sunViewMat),this.simProg=this.createProgram(k,ae),this.shadowProg=this.createProgram(ie,re),this.oceanProg=this.createProgram(k,se),this.fishProg=this.createProgram(ne,ce),this.planktonProg=this.createProgram(le,he),this.postProg=this.createProgram(k,fe);const c=e.createVertexArray();if(!c)throw new Error("Failed to allocate VAO.");this.emptyVao=c;const l=J();this.fishIndexCount=l.indices.length;const{vao:h,buffers:s}=this.createFishVao(l.positions,l.normals,l.bodyCoords,l.indices);this.fishVao=h,this.fishBuffers=s;const u=this.createShadowFramebuffer(O);this.shadowFbo=u.fbo,this.shadowDepthTex=u.depthTex,this.initSimulationBuffers(this.preset),this.resize(),this.bindInputEvents()}start(){if(this.rafId!==0)return;this.lastTimestamp=performance.now();const o=t=>{this.rafId=requestAnimationFrame(o),this.renderFrame(t)};this.rafId=requestAnimationFrame(o)}dispose(){this.rafId!==0&&(cancelAnimationFrame(this.rafId),this.rafId=0);const o=this.gl;this.destroySimBuffers(),this.sceneFbo&&o.deleteFramebuffer(this.sceneFbo),this.sceneColorTex&&o.deleteTexture(this.sceneColorTex),this.sceneDepthTex&&o.deleteTexture(this.sceneDepthTex),o.deleteFramebuffer(this.shadowFbo),o.deleteTexture(this.shadowDepthTex);for(const t of this.fishBuffers)o.deleteBuffer(t);o.deleteVertexArray(this.fishVao),o.deleteVertexArray(this.emptyVao),o.deleteProgram(this.simProg),o.deleteProgram(this.shadowProg),o.deleteProgram(this.oceanProg),o.deleteProgram(this.fishProg),o.deleteProgram(this.planktonProg),o.deleteProgram(this.postProg)}setPlaying(o){this.playing=o}togglePlaying(){return this.playing=!this.playing,this.playing}setSequenceTime(o,t=!0){const e=(o%B+B)%B,i=Math.abs(e-this.seqTime);if(this.seqTime=e,t&&i>1.1)for(let a=0;a<90;a++)this.stepSimulation(.035)}setFormationMode(o){this.mode=o}setFishPreset(o){if(o!==this.preset){this.preset=o,this.initSimulationBuffers(o);for(let t=0;t<16;t++)this.stepSimulation(.03)}}setGodRayIntensity(o){this.godRayIntensity=Math.max(0,Math.min(2,o))}setCausticIntensity(o){this.causticIntensity=Math.max(0,Math.min(2,o))}setPointerCurrentEnabled(o){this.pointerEnabled=o,o||(this.pointerStrength=0)}resetCamera(){this.targetYaw=0,this.targetPitch=-.195,this.targetDist=11.8}resize(){const o=Math.min(window.devicePixelRatio||1,2),t=Math.max(2,Math.floor(this.canvas.clientWidth*o)),e=Math.max(2,Math.floor(this.canvas.clientHeight*o));t===this.renderWidth&&e===this.renderHeight&&o===this.currentDpr||(this.renderWidth=t,this.renderHeight=e,this.currentDpr=o,this.canvas.width=t,this.canvas.height=e,this.recreateSceneFramebuffer(t,e))}renderFrame(o){this.resize();const t=Math.max(.001,(o-this.lastTimestamp)*.001);this.lastTimestamp=o;const e=Math.min(t,.04);this.fpsAccum+=t,this.fpsFrames++,this.fpsAccum>=.35&&(this.currentFps=Math.round(this.fpsFrames/this.fpsAccum),this.fpsAccum=0,this.fpsFrames=0),this.elapsedTime+=e,this.playing&&this.mode===0&&(this.seqTime=(this.seqTime+e)%B);const i=1-Math.exp(-8.5*e);this.curYaw+=(this.targetYaw-this.curYaw)*i,this.curPitch+=(this.targetPitch-this.curPitch)*i,this.curDist+=(this.targetDist-this.curDist)*i;const a=Math.sin(this.elapsedTime*.38)*.09,n=Math.cos(this.elapsedTime*.47)*.06,c=Math.cos(this.curPitch);this.camPos[0]=this.camTarget[0]+Math.sin(this.curYaw)*c*this.curDist+a,this.camPos[1]=this.camTarget[1]+Math.sin(this.curPitch)*this.curDist+n,this.camPos[2]=this.camTarget[2]+Math.cos(this.curYaw)*c*this.curDist;const l=this.renderWidth/Math.max(1,this.renderHeight);$(this.projMat,46*Math.PI/180,l,.25,110),X(this.viewMat,this.camPos,this.camTarget,[0,1,0]),q(this.viewProjMat,this.projMat,this.viewMat),K(this.invViewProjMat,this.viewProjMat),this.pointerStrength*=Math.exp(-2.6*e),this.stepSimulation(e);const h=this.simTargets[this.simPingIndex],s=this.gl;s.bindFramebuffer(s.FRAMEBUFFER,this.shadowFbo),s.viewport(0,0,O,O),s.enable(s.DEPTH_TEST),s.depthMask(!0),s.clear(s.DEPTH_BUFFER_BIT),s.useProgram(this.shadowProg),this.bindTextureUnit(h.posTex,0,this.shadowProg,"uPosTex"),this.bindTextureUnit(h.velTex,1,this.shadowProg,"uVelTex"),this.bindTextureUnit(this.metaTex,2,this.shadowProg,"uMetaTex"),s.uniform2i(s.getUniformLocation(this.shadowProg,"uSimRes"),this.simW,this.simH),s.uniformMatrix4fv(s.getUniformLocation(this.shadowProg,"uSunViewProj"),!1,this.sunViewProjMat),s.bindVertexArray(this.fishVao),s.drawElementsInstanced(s.TRIANGLES,this.fishIndexCount,s.UNSIGNED_SHORT,0,this.fishCount),s.bindFramebuffer(s.FRAMEBUFFER,this.sceneFbo),s.viewport(0,0,this.renderWidth,this.renderHeight),s.depthMask(!0),s.clear(s.DEPTH_BUFFER_BIT),s.disable(s.DEPTH_TEST),s.depthMask(!1),s.useProgram(this.oceanProg),s.uniformMatrix4fv(s.getUniformLocation(this.oceanProg,"uInvViewProj"),!1,this.invViewProjMat),s.uniform3fv(s.getUniformLocation(this.oceanProg,"uCamPos"),this.camPos),s.uniform3fv(s.getUniformLocation(this.oceanProg,"uSunDir"),this.sunDir),s.uniform1f(s.getUniformLocation(this.oceanProg,"uTime"),this.elapsedTime),s.bindVertexArray(this.emptyVao),s.drawArrays(s.TRIANGLES,0,3),s.enable(s.DEPTH_TEST),s.depthFunc(s.LESS),s.depthMask(!0),s.useProgram(this.fishProg),this.bindTextureUnit(h.posTex,0,this.fishProg,"uPosTex"),this.bindTextureUnit(h.velTex,1,this.fishProg,"uVelTex"),this.bindTextureUnit(this.metaTex,2,this.fishProg,"uMetaTex"),this.bindTextureUnit(this.shadowDepthTex,3,this.fishProg,"uSunShadowTex"),s.uniform2i(s.getUniformLocation(this.fishProg,"uSimRes"),this.simW,this.simH),s.uniformMatrix4fv(s.getUniformLocation(this.fishProg,"uViewProj"),!1,this.viewProjMat),s.uniformMatrix4fv(s.getUniformLocation(this.fishProg,"uSunViewProj"),!1,this.sunViewProjMat),s.uniform3fv(s.getUniformLocation(this.fishProg,"uCamPos"),this.camPos),s.uniform3fv(s.getUniformLocation(this.fishProg,"uSunDir"),this.sunDir),s.uniform1f(s.getUniformLocation(this.fishProg,"uTime"),this.elapsedTime),s.uniform2f(s.getUniformLocation(this.fishProg,"uShadowTexelSize"),1/O,1/O),s.bindVertexArray(this.fishVao),s.drawElementsInstanced(s.TRIANGLES,this.fishIndexCount,s.UNSIGNED_SHORT,0,this.fishCount),s.depthMask(!1),s.enable(s.BLEND),s.blendFunc(s.ONE,s.ONE),s.useProgram(this.planktonProg),s.uniformMatrix4fv(s.getUniformLocation(this.planktonProg,"uViewProj"),!1,this.viewProjMat),s.uniform3fv(s.getUniformLocation(this.planktonProg,"uCamPos"),this.camPos),s.uniform1f(s.getUniformLocation(this.planktonProg,"uTime"),this.elapsedTime),s.uniform1f(s.getUniformLocation(this.planktonProg,"uDpr"),this.currentDpr),s.bindVertexArray(this.emptyVao),s.drawArrays(s.POINTS,0,de),s.disable(s.BLEND),s.bindFramebuffer(s.FRAMEBUFFER,null),s.viewport(0,0,this.renderWidth,this.renderHeight),s.disable(s.DEPTH_TEST);const u=Z(this.viewProjMat,this.surfaceSunWorld);s.useProgram(this.postProg),this.bindTextureUnit(this.sceneColorTex,0,this.postProg,"uSceneColorTex"),this.bindTextureUnit(this.sceneDepthTex,1,this.postProg,"uSceneDepthTex"),this.bindTextureUnit(this.shadowDepthTex,2,this.postProg,"uSunShadowTex"),s.uniformMatrix4fv(s.getUniformLocation(this.postProg,"uInvViewProj"),!1,this.invViewProjMat),s.uniformMatrix4fv(s.getUniformLocation(this.postProg,"uSunViewProj"),!1,this.sunViewProjMat),s.uniform3fv(s.getUniformLocation(this.postProg,"uCamPos"),this.camPos),s.uniform3fv(s.getUniformLocation(this.postProg,"uSunDir"),this.sunDir),s.uniform3f(s.getUniformLocation(this.postProg,"uSunScreen"),u[0],u[1],u[2]),s.uniform2f(s.getUniformLocation(this.postProg,"uTexelSize"),1/this.renderWidth,1/this.renderHeight),s.uniform1f(s.getUniformLocation(this.postProg,"uTime"),this.elapsedTime),s.uniform1f(s.getUniformLocation(this.postProg,"uGodRayIntensity"),this.godRayIntensity),s.uniform1f(s.getUniformLocation(this.postProg,"uCausticIntensity"),this.causticIntensity),s.bindVertexArray(this.emptyVao),s.drawArrays(s.TRIANGLES,0,3),this.unbindTextures(4),this.emitTelemetry()}stepSimulation(o){if(!this.simTargets||!this.metaTex||!this.starTex)return;const t=this.gl,e=this.simTargets[this.simPingIndex],i=1-this.simPingIndex,a=this.simTargets[i];let n=[0,0,0],c=0;if(this.pointerEnabled&&this.pointerStrength>.01){const l=Y(this.invViewProjMat,this.pointerNdcX,this.pointerNdcY,-1),h=Y(this.invViewProjMat,this.pointerNdcX,this.pointerNdcY,1),s=h[0]-l[0],u=h[1]-l[1],d=h[2]-l[2],m=Math.abs(d)>1e-5?(0-l[2])/d:.1,p=Math.max(0,Math.min(1,m));n=[l[0]+s*p,l[1]+u*p,l[2]+d*p],c=this.pointerStrength}t.bindFramebuffer(t.FRAMEBUFFER,a.fbo),t.viewport(0,0,this.simW,this.simH),t.disable(t.DEPTH_TEST),t.disable(t.BLEND),t.useProgram(this.simProg),this.bindTextureUnit(e.posTex,0,this.simProg,"uPosTex"),this.bindTextureUnit(e.velTex,1,this.simProg,"uVelTex"),this.bindTextureUnit(this.metaTex,2,this.simProg,"uMetaTex"),this.bindTextureUnit(this.starTex,3,this.simProg,"uStarTex"),t.uniform2i(t.getUniformLocation(this.simProg,"uSimRes"),this.simW,this.simH),t.uniform1f(t.getUniformLocation(this.simProg,"uTime"),this.elapsedTime),t.uniform1f(t.getUniformLocation(this.simProg,"uSeqTime"),this.seqTime),t.uniform1i(t.getUniformLocation(this.simProg,"uMode"),this.mode),t.uniform1f(t.getUniformLocation(this.simProg,"uDt"),o),t.uniform1i(t.getUniformLocation(this.simProg,"uFrame"),this.frameCounter++),t.uniform4f(t.getUniformLocation(this.simProg,"uPointerWorld"),n[0],n[1],n[2],c),t.bindVertexArray(this.emptyVao),t.drawArrays(t.TRIANGLES,0,3),this.unbindTextures(4),this.simPingIndex=i}emitTelemetry(){if(!this.onTelemetry)return;let o=0,t="Act I · Bait Ball";if(this.mode===1)t="Hold · Bait Ball";else if(this.mode===2)t="Hold · Twin Manta Wings";else if(this.mode===3)t="Hold · 3D Gemini Star",o=1;else if(this.mode===4)t="Free · Pelagic Ocean Boids";else{const e=this.seqTime;e<6.4?t="Act I · Bait Ball":e<10.6?t="Act II · Twin Manta Wings":e<16?t="Act III · Gemini 4 Carbon Emblem":e<21.8?t="Act IV · Pod Dispersion":t="Act V · Sunlit Abyss";const i=Math.max(0,Math.min(1,(e-10.9)/1.2)),a=1-Math.max(0,Math.min(1,(e-15.6)/1));o=i*i*(3-2*i)*(a*a*(3-2*a))}this.onTelemetry({fps:this.currentFps,fishCount:this.fishCount,simResolution:`${this.simW}×${this.simH}`,seqTime:this.seqTime,duration:B,playing:this.playing,mode:this.mode,emblemAlpha:o,chapterName:t})}initSimulationBuffers(o){this.destroySimBuffers();const[t,e]=ue[o];this.simW=t,this.simH=e,this.fishCount=t*e;const i=oe(t,e),a=this.createSimTarget(t,e,i.posData,i.velData),n=this.createSimTarget(t,e,i.posData,i.velData);this.simTargets=[a,n],this.metaTex=this.createDataTexture(t,e,i.metaData),this.starTex=this.createDataTexture(t,e,i.starTargetData),this.simPingIndex=0}destroySimBuffers(){const o=this.gl;if(this.simTargets){for(const t of this.simTargets)o.deleteFramebuffer(t.fbo),o.deleteTexture(t.posTex),o.deleteTexture(t.velTex);this.simTargets=null}this.metaTex&&(o.deleteTexture(this.metaTex),this.metaTex=null),this.starTex&&(o.deleteTexture(this.starTex),this.starTex=null)}createDataTexture(o,t,e){const i=this.gl,a=i.createTexture();if(!a)throw new Error("Failed to create GPGPU texture.");return i.bindTexture(i.TEXTURE_2D,a),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MAG_FILTER,i.NEAREST),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE),i.texImage2D(i.TEXTURE_2D,0,this.floatInternalFormat,o,t,0,i.RGBA,i.FLOAT,e),i.bindTexture(i.TEXTURE_2D,null),a}createSimTarget(o,t,e,i){const a=this.gl,n=this.createDataTexture(o,t,e),c=this.createDataTexture(o,t,i),l=a.createFramebuffer();if(!l)throw new Error("Failed to create GPGPU MRT framebuffer.");a.bindFramebuffer(a.FRAMEBUFFER,l),a.framebufferTexture2D(a.FRAMEBUFFER,a.COLOR_ATTACHMENT0,a.TEXTURE_2D,n,0),a.framebufferTexture2D(a.FRAMEBUFFER,a.COLOR_ATTACHMENT1,a.TEXTURE_2D,c,0),a.drawBuffers([a.COLOR_ATTACHMENT0,a.COLOR_ATTACHMENT1]);const h=a.checkFramebufferStatus(a.FRAMEBUFFER);if(h!==a.FRAMEBUFFER_COMPLETE)throw new Error(`Simulation MRT Framebuffer incomplete: 0x${h.toString(16)}`);return a.bindFramebuffer(a.FRAMEBUFFER,null),{fbo:l,posTex:n,velTex:c}}createShadowFramebuffer(o){const t=this.gl,e=t.createTexture(),i=t.createFramebuffer();if(!e||!i)throw new Error("Failed to allocate shadow map.");t.bindTexture(t.TEXTURE_2D,e),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.NEAREST),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.NEAREST),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_COMPARE_MODE,t.NONE),t.texImage2D(t.TEXTURE_2D,0,t.DEPTH_COMPONENT24,o,o,0,t.DEPTH_COMPONENT,t.UNSIGNED_INT,null),t.bindFramebuffer(t.FRAMEBUFFER,i),t.framebufferTexture2D(t.FRAMEBUFFER,t.DEPTH_ATTACHMENT,t.TEXTURE_2D,e,0),t.drawBuffers([t.NONE]),t.readBuffer(t.NONE);const a=t.checkFramebufferStatus(t.FRAMEBUFFER);if(a!==t.FRAMEBUFFER_COMPLETE)throw new Error(`Shadow Framebuffer incomplete: 0x${a.toString(16)}`);return t.bindFramebuffer(t.FRAMEBUFFER,null),t.bindTexture(t.TEXTURE_2D,null),{fbo:i,depthTex:e}}recreateSceneFramebuffer(o,t){const e=this.gl;this.sceneFbo&&e.deleteFramebuffer(this.sceneFbo),this.sceneColorTex&&e.deleteTexture(this.sceneColorTex),this.sceneDepthTex&&e.deleteTexture(this.sceneDepthTex);const i=e.createTexture();e.bindTexture(e.TEXTURE_2D,i),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),e.texImage2D(e.TEXTURE_2D,0,this.hdrColorInternalFormat,o,t,0,e.RGBA,this.hdrColorType,null);const a=e.createTexture();e.bindTexture(e.TEXTURE_2D,a),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_COMPARE_MODE,e.NONE),e.texImage2D(e.TEXTURE_2D,0,e.DEPTH_COMPONENT24,o,t,0,e.DEPTH_COMPONENT,e.UNSIGNED_INT,null);const n=e.createFramebuffer();e.bindFramebuffer(e.FRAMEBUFFER,n),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,i,0),e.framebufferTexture2D(e.FRAMEBUFFER,e.DEPTH_ATTACHMENT,e.TEXTURE_2D,a,0),e.drawBuffers([e.COLOR_ATTACHMENT0]);const c=e.checkFramebufferStatus(e.FRAMEBUFFER);if(c!==e.FRAMEBUFFER_COMPLETE)throw new Error(`Scene HDR Framebuffer incomplete: 0x${c.toString(16)}`);e.bindFramebuffer(e.FRAMEBUFFER,null),e.bindTexture(e.TEXTURE_2D,null),this.sceneFbo=n,this.sceneColorTex=i,this.sceneDepthTex=a}createFishVao(o,t,e,i){const a=this.gl,n=a.createVertexArray();a.bindVertexArray(n);const c=a.createBuffer();a.bindBuffer(a.ARRAY_BUFFER,c),a.bufferData(a.ARRAY_BUFFER,o,a.STATIC_DRAW),a.enableVertexAttribArray(0),a.vertexAttribPointer(0,3,a.FLOAT,!1,0,0);const l=a.createBuffer();a.bindBuffer(a.ARRAY_BUFFER,l),a.bufferData(a.ARRAY_BUFFER,t,a.STATIC_DRAW),a.enableVertexAttribArray(1),a.vertexAttribPointer(1,3,a.FLOAT,!1,0,0);const h=a.createBuffer();a.bindBuffer(a.ARRAY_BUFFER,h),a.bufferData(a.ARRAY_BUFFER,e,a.STATIC_DRAW),a.enableVertexAttribArray(2),a.vertexAttribPointer(2,3,a.FLOAT,!1,0,0);const s=a.createBuffer();return a.bindBuffer(a.ELEMENT_ARRAY_BUFFER,s),a.bufferData(a.ELEMENT_ARRAY_BUFFER,i,a.STATIC_DRAW),a.bindVertexArray(null),{vao:n,buffers:[c,l,h,s]}}bindTextureUnit(o,t,e,i){const a=this.gl;a.activeTexture(a.TEXTURE0+t),a.bindTexture(a.TEXTURE_2D,o);const n=a.getUniformLocation(e,i);n!==null&&a.uniform1i(n,t)}unbindTextures(o){const t=this.gl;for(let e=0;e<o;e++)t.activeTexture(t.TEXTURE0+e),t.bindTexture(t.TEXTURE_2D,null)}createProgram(o,t){const e=this.gl,i=this.compileShader(e.VERTEX_SHADER,o),a=this.compileShader(e.FRAGMENT_SHADER,t),n=e.createProgram();if(!n)throw new Error("Failed to create WebGLProgram.");if(e.attachShader(n,i),e.attachShader(n,a),e.linkProgram(n),e.deleteShader(i),e.deleteShader(a),!e.getProgramParameter(n,e.LINK_STATUS)){const c=e.getProgramInfoLog(n);throw e.deleteProgram(n),new Error(`Shader program link error:
${c}`)}return n}compileShader(o,t){const e=this.gl,i=e.createShader(o);if(!i)throw new Error("Failed to create WebGLShader.");if(e.shaderSource(i,t),e.compileShader(i),!e.getShaderParameter(i,e.COMPILE_STATUS)){const a=e.getShaderInfoLog(i);throw e.deleteShader(i),new Error(`GLSL compile error:
${a}`)}return i}bindInputEvents(){let o=!1,t=0,e=0;this.canvas.addEventListener("pointerdown",a=>{a.button===0&&(o=!0,t=a.clientX,e=a.clientY,this.canvas.setPointerCapture(a.pointerId))}),this.canvas.addEventListener("pointermove",a=>{const n=this.canvas.getBoundingClientRect();if(n.width>0&&n.height>0&&(this.pointerNdcX=(a.clientX-n.left)/n.width*2-1,this.pointerNdcY=1-(a.clientY-n.top)/n.height*2,this.pointerStrength=1),!o)return;const c=a.clientX-t,l=a.clientY-e;t=a.clientX,e=a.clientY,this.targetYaw-=c*.0052,this.targetPitch=Math.max(-.52,Math.min(.32,this.targetPitch+l*.0042))});const i=a=>{o&&(o=!1,this.canvas.hasPointerCapture(a.pointerId)&&this.canvas.releasePointerCapture(a.pointerId))};this.canvas.addEventListener("pointerup",i),this.canvas.addEventListener("pointercancel",i),this.canvas.addEventListener("wheel",a=>{a.preventDefault(),this.targetDist=Math.max(5.2,Math.min(22,this.targetDist+a.deltaY*.0085))},{passive:!1})}}function pe(r){const o=Math.max(0,Math.min(B,r)),t=Math.floor(o);return`00:${String(t).padStart(2,"0")}`}function ve(){const r=document.getElementById("vfx-canvas"),o=document.getElementById("error-banner");if(!r)return;const t=document.getElementById("tel-fps"),e=document.getElementById("tel-count"),i=document.getElementById("tel-chapter"),a=document.getElementById("emblem-overlay"),n=document.getElementById("emblem-text"),c=document.getElementById("timeline-scrubber"),l=document.getElementById("time-readout"),h=document.getElementById("btn-play"),s=document.getElementById("icon-play-label"),u=document.getElementById("btn-fullscreen"),d=document.getElementById("btn-reset-cam"),m=document.getElementById("btn-toggle-panel"),p=document.getElementById("control-drawer"),E=document.getElementById("btn-cinema"),w=document.getElementById("btn-exit-cinema"),S=document.getElementById("slider-godrays"),A=document.getElementById("val-godrays"),y=document.getElementById("slider-caustics"),T=document.getElementById("val-caustics"),P=document.getElementById("input-emblem"),b=document.getElementById("chk-pointer");let F=!1;const D=f=>{t.textContent=`${f.fps} FPS`,e.textContent=`${f.fishCount.toLocaleString()} Fish`,i.textContent=f.chapterName,a.style.opacity=f.emblemAlpha.toFixed(3),a.style.transform=`translateY(${((1-f.emblemAlpha)*7).toFixed(1)}px)`,F||(c.value=f.seqTime.toFixed(2)),l.textContent=`${pe(f.seqTime)} / 00:26`,s.textContent=f.playing?"❚❚":"▶"};let g;try{g=new me(r,D),g.start()}catch(f){o&&(o.textContent=f instanceof Error?f.message:String(f),o.classList.remove("hidden")),console.error(f);return}const C=new URLSearchParams(window.location.search),M=C.get("t");M!==null&&!Number.isNaN(Number(M))&&g.setSequenceTime(Number(M),!0),C.get("pause")==="1"&&g.setPlaying(!1),C.get("cinema")==="1"&&(document.body.classList.add("cinema-mode"),w.classList.remove("hidden")),h.addEventListener("click",()=>{g.togglePlaying()}),c.addEventListener("pointerdown",()=>{F=!0});const U=()=>{F=!1};window.addEventListener("pointerup",U),c.addEventListener("input",()=>{const f=Number(c.value);_(0),g.setFormationMode(0),g.setSequenceTime(f,!0)}),document.querySelectorAll("[data-jump]").forEach(f=>{f.addEventListener("click",()=>{const R=Number(f.dataset.jump??"0");_(0),g.setFormationMode(0),g.setSequenceTime(R,!0)})});const v=document.querySelectorAll("#mode-buttons [data-mode]");function _(f){v.forEach(R=>{R.classList.toggle("active",Number(R.dataset.mode)===f)})}v.forEach(f=>{f.addEventListener("click",()=>{const R=Number(f.dataset.mode??"0");_(R),g.setFormationMode(R)})});const x=document.querySelectorAll("#preset-buttons [data-preset]");x.forEach(f=>{f.addEventListener("click",()=>{const R=f.dataset.preset??"32k";x.forEach(z=>z.classList.toggle("active",z===f)),g.setFishPreset(R)})}),S.addEventListener("input",()=>{const f=Number(S.value);A.textContent=`${f}%`,g.setGodRayIntensity(f/100)}),y.addEventListener("input",()=>{const f=Number(y.value);T.textContent=`${f}%`,g.setCausticIntensity(f/100)}),P.addEventListener("input",()=>{n.textContent=P.value||"Gemini 4 Carbon"}),b.addEventListener("change",()=>{g.setPointerCurrentEnabled(b.checked)}),d.addEventListener("click",()=>{g.resetCamera()}),m.addEventListener("click",()=>{const f=p.classList.toggle("hidden");m.setAttribute("aria-expanded",String(!f))});const L=()=>{const f=document.body.classList.toggle("cinema-mode");w.classList.toggle("hidden",!f)};E.addEventListener("click",L),w.addEventListener("click",L),u.addEventListener("click",()=>{document.fullscreenElement?document.exitFullscreen().catch(()=>{}):document.documentElement.requestFullscreen().catch(()=>{})}),window.addEventListener("keydown",f=>{document.activeElement!==P&&(f.code==="Space"?(f.preventDefault(),g.togglePlaying()):f.key==="h"||f.key==="H"?L():(f.key==="f"||f.key==="F")&&u.click())}),window.addEventListener("resize",()=>{g.resize()})}ve();
