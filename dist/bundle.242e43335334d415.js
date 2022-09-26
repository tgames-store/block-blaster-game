(()=>{null==document.getElementById("blockblaster-canvas")&&(document.body.innerHTML+=`<canvas id="blockblaster-canvas" width=${window.innerWidth} height=${window.innerHeight-30}></canvas>`);var t,i,e,o,n,s,a,r=30,l=document.getElementById("blockblaster-canvas"),h=l.getContext("2d"),c=(setInterval(k,1/r*100),null),p=function(){try{return window.localStorage.getItem("high-score",a)||0}catch(t){}return 0}();let f=2;var d,y,u,m,v=[],M=[],x=!1,g=!1,w=!1,z=!1;let b=!0,E=document.getElementById("restart"),S=document.getElementById("continue"),T=document.getElementById("skip"),I=document.querySelector(".watchAdsContainer");function L(e){"init"===!e&&tgames.gameStarted(),a>p&&function(t){window.localStorage.setItem("high-score",t),p=t}(a),t=!0,i=0,s=1,a=0,n=1500,d=!1,b=!0,u=0,v=[],M=[],y=null,x=!1,g=!1,O()}function O(){clearInterval(e),clearInterval(o),clearInterval(m)}function R(){e=setInterval(A,(s+20)/20*2e3),o=setInterval(W,n)}function F(){h.fillStyle="rgb(40,40,40)",h.fillRect(0,0,l.width,l.height)}function B(){h.fillStyle="#CCFF99",h.font="24px sans-serif",h.fillText("Score: "+a,10,24),h.font="16px sans-serif",h.fillText("High Score: "+p,10,48);for(var t="",e=0;e<i;e++)t+="X";h.font="24px sans-serif",h.fillStyle="#FF6666",h.fillText(t,l.width-75,24),h.font="16px sans-serif",h.fillText("Difficulty: "+s,l.width/2-50,24)}function P(t){for(var i=0;i<l.width;i+=15)for(var e=0;e<l.width;e+=15){var o=Math.floor(60*Math.random());h.fillStyle="rgba("+o+","+o+","+o+","+Math.random()*t+")",h.fillRect(i,e,15,15)}}function H(){h.fillStyle="rgba(0,0,0,"+u+")",h.fillRect(0,0,l.width,l.height),P(u/2),B(),u+=.1/r,h.fillStyle="rgba(255,255,255,"+u+")",h.font="64px sans-serif",h.fillText("GAME OVER",l.width/2-195,l.height/2),tgames.gameOver(a),E.style.display="block"}function k(){if(F(),v.forEach((function(t){t.render()})),B(),g&&(u-=.1/r,h.fillStyle="rgba(255,255,255,"+u+")",h.fillRect(0,0,l.width,l.height),u<=0&&(g=!1)),w&&(u-=.1/r,h.fillStyle="rgba(255,255,255,"+u+")",h.font="72px sans-serif",h.fillText("+250 POINTS!",l.width/2-220,l.height/2),u<=0&&(w=!1)),z&&j(),d)b?(i=0,h.fillStyle="rgba(0,0,0,"+u+")",h.fillRect(0,0,l.width,l.height),P(u/2),B(),u+=.1/r,h.fillStyle="rgba(255,255,255,"+u+")",h.font="32px sans-serif",h.fillText("Continue by watch ads?",l.width/2-170,l.height/2),c||(c=setTimeout(C,12e3)),I.style.display="flex"):H();else{if(t)return F(),B(),u+=.1/r,h.fillStyle="rgba(255,255,255,"+u+")",h.font="72px sans-serif",h.fillText("READY?",l.width/2-140,l.height/2),h.fillStyle="rgba(255,255,255,0.5)",h.font="32px sans-serif",h.fillText("You have only 3 lives",l.width/2-150,60+l.height/2),h.font="36px sans-serif",h.fillText("Press to start",l.width/2-100,120+l.height/2),void B();v.forEach((function(t){t.position.y>l.height+20&&("Enemy"==t.name&&(i+=1),U(t)),t.update(1/r)})),M.forEach((function(t){var i=v.indexOf(t);i>-1&&v.splice(i,1)})),i>=3&&(O(),d=!0,u=0)}}function D(t,i){var e=new tt;e.position.set(y.position.x+y.size/2-e.size/2+t.x,y.position.y+y.size/2-e.size/2+t.y),e.velocity.y=-i,v.push(e)}function C(){clearTimeout(c),c=null,I.style.display="none",b=!1,H()}function j(t="!"){u-=.1/r,h.fillStyle="rgba(255,255,255,"+u+")",h.font="48px sans-serif",h.fillText("TRIPLE SHOT"+t,l.width/2-160,l.height/2),u<=0&&(z=!1)}function A(){n>20&&(n-=20),(s+=1)%5==0&&Math.random()>.5&&function(){var t=new it,i=Math.floor(Math.random()*l.width),e=-t.size,o=Math.random()*s+s/2,n=Math.floor(Math.random()*(o+15)+o)/2,a=Math.floor(Math.random()*(o+15)+o)/2;t.position.set(i,e);var r=Math.random();r>.5?X(t,o):r>.3?$(t,n,a,o):r>.1?G(t,n,a,o):q(t,n,a,o),v.push(t)}(),clearInterval(o),o=setInterval(W,n)}function Y(t,i){if(-1==t.indexOf("a"))return t.replace(")",","+i+")").replace("rgb","rgba")}function N(t){if("Enemy"==t.name){for(var i=Math.floor(6*Math.random()+3),e=0;e<i;e++){(s=new _).color=t.color,s.size=Math.floor(Math.random()*t.size/2+5);var o=Math.random()*t.size/2,n=Math.random()*t.size/2;s.position.x=t.position.x+o,s.position.y=t.position.y+n,v.push(s)}a+=25}else if("PowerUp"==t.name){for(i=Math.floor(6*Math.random()+3),e=0;e<i;e++){var s;(s=new _).color=V(100,255),s.size=Math.floor(Math.random()*t.size/2+5),o=Math.random()*t.size/2,n=Math.random()*t.size/2,s.position.x=t.position.x+o,s.position.y=t.position.y+n,v.push(s)}"scoreBoost"==(r=t.effect)?(console.log("+250"),u=1,w=!0,a+=250):"tripleShot"==r&&a<4e3?(console.log("TRIPLE SHOT"),u=1,x=!0,z=!0,m=setInterval((function(){x=!1,clearInterval(m)}),1e4)):"bomb"==r&&(console.log("BOMB"),g=!0,u=1,v.forEach((function(t){"Enemy"==t.name&&N(t)})))}var r;U(t)}function U(t){M.push(t)}function W(){var t=new Q,i=Math.floor(Math.random()*l.width),e=-t.size,o=Math.random()*s+s/2,n=Math.floor(Math.random()*(o+15)+o),a=Math.floor(Math.random()*(o+15)+o);t.position.set(i,e);var r=Math.random();r>.5?X(t,o):r>.3?$(t,n,a,o):r>.1?G(t,n,a,o):q(t,n,a,o),v.push(t)}function X(t,i){t.update=function(t){this.velocity.x=0,this.velocity.y=i,K.prototype.update.call(this,t)}}function $(t,i,e,o){t.update=function(t){this.velocity.x=i*Math.cos(this.position.y/e),this.velocity.y=o,K.prototype.update.call(this,t)}}function q(t,i,e,o){var n=1;Math.random()>.5&&(n=-1),t.update=function(t){this.velocity.x=n*(-2*i/Math.PI)*Math.atan(1/Math.tan(this.position.y/e)),this.velocity.y=o,K.prototype.update.call(this,t)}}function G(t,i,e,o){t.update=function(t){this.velocity.x=2*i/Math.PI*Math.asin(Math.sin(this.position.y/e)),this.velocity.y=o,K.prototype.update.call(this,t)}}function V(t,i){return"rgb("+Math.floor(Math.random()*i+t)+","+Math.floor(Math.random()*i+t)+","+Math.floor(Math.random()*i+t)+")"}var J=function(t,i){this.x=t,this.y=i};J.prototype.set=function(t,i){this.x=t,this.y=i};var K=function(){this.name="Entity",this.size=25,this.position=new J(0,0),this.velocity=new J(0,0),this.color="#FFFFFF"};K.prototype.sayName=function(){console.log(this.name)},K.prototype.update=function(t){this.position.x+=this.velocity.x*t,this.position.y+=this.velocity.y*t,this.position.x<0&&(this.position.x=this.size),this.position.x+this.size>l.width&&(this.position.x=l.width-this.size)},K.prototype.render=function(){h.fillStyle=this.color,h.fillRect(this.position.x,this.position.y,this.size,this.size)};var Q=function(){K.call(this),this.name="Enemy",this.size=Math.floor(50*Math.random()+20),this.color=V(90,150)};Q.prototype=Object.create(K.prototype),Q.prototype.constructor=K;var Z=function(){K.call(this),this.name="Player",this.color="#4747FF"};(Z.prototype=Object.create(K.prototype)).constructor=K;var _=function(){K.call(this),this.name="Particle",this.size=10,this.time=0,this.maxTime=Math.floor(10*Math.random()+3),this.velocity.x=Math.floor(20*Math.random()-10),this.velocity.y=Math.floor(20*Math.random()-10)};_.prototype=Object.create(K.prototype),_.prototype.constructor=K,_.prototype.update=function(t){K.prototype.update.call(this,t),this.time+=t,this.time>=this.maxTime&&U(this)};var tt=function(){K.call(this),this.name="Bullet",this.size=10,this.time=0,this.color="rgba(200,200,200,1)",this.particlesDelay=.7};tt.prototype=Object.create(K.prototype),tt.prototype.constructor=K,tt.prototype.update=function(t){K.prototype.update.call(this,t);var i=this;if(v.forEach((function(t){var e,o,n,s,a,r,l,h,c,p,f,d;t!==i&&"Particle"!=t.name&&(o=t,n=(e=i).size,s=e.position.x,a=e.position.x+n,r=e.position.y,l=e.position.y+n,h=o.size,c=o.position.x,p=o.position.x+h,f=o.position.y,d=o.position.y+h,s<p&&a>c&&r<d&&l>f&&(N(t),U(i)))})),this.position.y<0&&U(this),this.time+=t,this.time>=this.particlesDelay){this.time=0;var e=new _;e.size=Math.floor(5*Math.random()+2),e.color=Y("rgb(125,125,125)",Math.random()),e.velocity.x/=2,e.position.x=this.position.x+this.size/2-e.size/2,e.position.y=this.position.y-e.size/2,v.push(e)}};var it=function(){K.call(this),this.name="PowerUp",this.size=20,this.time=0,this.particlesDelay=.25;var t=Math.random();this.effect=t<.5?"scoreBoost":t<.75?"tripleShot":"bomb"};function et(t){let i=document.createElement("div");i.classList.add("counter"),i.innerHTML="5",document.body.append(i);let e=setInterval((()=>{+i.innerHTML>0?i.innerHTML=String(+i.innerHTML-1):(clearInterval(e),i.classList.remove("counter"),t())}),1e3)}it.prototype=Object.create(K.prototype),it.prototype.constructor=K,it.prototype.update=function(t){if(K.prototype.update.call(this,t),(this.position.y<0||this.position.y+this.size>l.height)&&U(this),this.time+=t,this.time>=this.particlesDelay){this.time=0;var i=new _;i.size=Math.floor(5*Math.random()+2),i.color=Y(V(100,255),Math.random()),i.velocity.x/=2,i.position.x=this.position.x+this.size/2-i.size/2,i.position.y=this.position.y-i.size/2,v.push(i)}},it.prototype.render=function(){h.fillStyle=V(100,255),h.fillRect(this.position.x,this.position.y,this.size,this.size)},document.addEventListener("DOMContentLoaded",L("init")),l.addEventListener("click",(function(){if(t)return tgames.gameStarted(),t=!1,O(),R(),(y=new Z).position.set(l.width/2,l.height-y.size),y.render(),void v.push(y);D({x:0,y:-y.size},30),x&&(D({x:-y.size,y:-y.size},25),D({x:y.size,y:-y.size},25)),a>0&&(a-=1),a>4e3&&!x&&(j(" MODE"),x=!0)})),window.addEventListener("resize",(function(){h.canvas.width=window.innerWidth,h.canvas.height=window.innerHeight-30,k(),y.position.set(l.width/2,l.height-y.size)})),E.addEventListener("click",(()=>{0===f||f<0?(tgames.showRewardedAd(),f=3):f--,L("game"),E.style.display="none"})),S.addEventListener("click",(async()=>{f--,I.style.display="none",d=!1,i=0,clearTimeout(c),c=null;try{tgames.showRewardedAd().then((()=>{et((()=>{R(),k()}))}))}catch(t){et((()=>{R(),k()}))}b=!1})),T.addEventListener("click",(async()=>{I.style.display="none",clearTimeout(c),b=!1,H()})),l.addEventListener("mousemove",(function(t){var i=function(t,i){var e=t.getBoundingClientRect();return new J(i.clientX-e.left,i.clientY-e.top)}(l,t);y&&!d&&(y.position.x=i.x)}),!1)})();
//# sourceMappingURL=bundle.242e43335334d415.js.map