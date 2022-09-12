(()=>{null==document.getElementById("blockblaster-canvas")&&(document.body.innerHTML+=`<canvas id="blockblaster-canvas" width=${window.innerWidth} height=${window.innerHeight-30}></canvas>`);var t,i,o,e,n,s,a,r,h,l,c,p=30,f=document.getElementById("blockblaster-canvas"),y=f.getContext("2d"),d=(setInterval((function(){return E(),u.forEach((function(t){t.render()})),S(),M&&(l-=.1/p,y.fillStyle="rgba(255,255,255,"+l+")",y.fillRect(0,0,f.width,f.height),l<=0&&(M=!1)),x&&(l-=.1/p,y.fillStyle="rgba(255,255,255,"+l+")",y.font="72px sans-serif",y.fillText("+250 POINTS!",f.width/2-220,f.height/2),l<=0&&(x=!1)),g&&(l-=.1/p,y.fillStyle="rgba(255,255,255,"+l+")",y.font="72px sans-serif",y.fillText("TRIPLE SHOT!",f.width/2-220,f.height/2),l<=0&&(g=!1)),r?(y.fillStyle="rgba(0,0,0,"+l+")",y.fillRect(0,0,f.width,f.height),function(t){for(var i=0;i<f.width;i+=15)for(var o=0;o<f.width;o+=15){var e=Math.floor(60*Math.random());y.fillStyle="rgba("+e+","+e+","+e+","+Math.random()*t+")",y.fillRect(i,o,15,15)}}(l/2),S(),l+=.1/p,y.fillStyle="rgba(255,255,255,"+l+")",y.font="64px sans-serif",void y.fillText("GAME OVER",f.width/2-195,f.height/2)):t?(E(),S(),l+=.1/p,y.fillStyle="rgba(255,255,255,"+l+")",y.font="72px sans-serif",y.fillText("READY?",f.width/2-140,f.height/2),void S()):(u.forEach((function(t){t.position.y>f.height+20&&("Enemy"==t.name&&(i+=1),F(t)),t.update(1/p)})),m.forEach((function(t){var i=u.indexOf(t);i>-1&&u.splice(i,1)})),void(i>=3&&(b(),r=!0,tgames.gameOver(a),z.style.display="block",l=0)))}),1/p*100),0),u=[],m=[],v=!1,M=!1,x=!1,g=!1;let z=document.getElementById("restart");function w(){tgames.gameStarted(),a>d&&(d=a),t=!0,i=0,s=1,a=0,n=1500,r=!1,l=0,u=[],m=[],h=null,v=!1,M=!1,b()}function b(){clearInterval(o),clearInterval(e),clearInterval(c)}function E(){y.fillStyle="rgb(40,40,40)",y.fillRect(0,0,f.width,f.height)}function S(){y.fillStyle="#CCFF99",y.font="24px sans-serif",y.fillText("Score: "+a,10,24),y.font="16px sans-serif",y.fillText("High Score: "+d,10,48);for(var t="",o=0;o<i;o++)t+="X";y.font="24px sans-serif",y.fillStyle="#FF6666",y.fillText(t,f.width-75,24),y.font="16px sans-serif",y.fillText("Difficulty: "+s,f.width/2-50,24)}function I(t,i){var o=new X;o.position.set(h.position.x+h.size/2-o.size/2+t.x,h.position.y+h.size/2-o.size/2+t.y),o.velocity.y=-i,u.push(o)}function T(){n>20&&(n-=20),(s+=1)%5==0&&Math.random()>.5&&function(){var t=new Y,i=Math.floor(Math.random()*f.width),o=-t.size,e=Math.random()*s+s/2,n=Math.floor(Math.random()*(e+15)+e)/2,a=Math.floor(Math.random()*(e+15)+e)/2;t.position.set(i,o);var r=Math.random();r>.5?P(t,e):r>.3?k(t,n,a,e):r>.1?D(t,n,a,e):L(t,n,a,e),u.push(t)}(),clearInterval(e),e=setInterval(R,n)}function O(t,i){if(-1==t.indexOf("a"))return t.replace(")",","+i+")").replace("rgb","rgba")}function B(t){if("Enemy"==t.name){for(var i=Math.floor(6*Math.random()+3),o=0;o<i;o++){(s=new U).color=t.color,s.size=Math.floor(Math.random()*t.size/2+5);var e=Math.random()*t.size/2,n=Math.random()*t.size/2;s.position.x=t.position.x+e,s.position.y=t.position.y+n,u.push(s)}a+=25}else if("PowerUp"==t.name){for(i=Math.floor(6*Math.random()+3),o=0;o<i;o++){var s;(s=new U).color=j(100,255),s.size=Math.floor(Math.random()*t.size/2+5),e=Math.random()*t.size/2,n=Math.random()*t.size/2,s.position.x=t.position.x+e,s.position.y=t.position.y+n,u.push(s)}"scoreBoost"==(r=t.effect)?(console.log("+250"),l=1,x=!0,a+=250):"tripleShot"==r?(console.log("TRIPLE SHOT"),l=1,v=!0,g=!0,c=setInterval((function(){v=!1,clearInterval(c)}),1e4)):"bomb"==r&&(console.log("BOMB"),M=!0,l=1,u.forEach((function(t){"Enemy"==t.name&&B(t)})))}var r;F(t)}function F(t){m.push(t)}function R(){var t=new A,i=Math.floor(Math.random()*f.width),o=-t.size,e=Math.random()*s+s/2,n=Math.floor(Math.random()*(e+15)+e),a=Math.floor(Math.random()*(e+15)+e);t.position.set(i,o);var r=Math.random();r>.5?P(t,e):r>.3?k(t,n,a,e):r>.1?D(t,n,a,e):L(t,n,a,e),u.push(t)}function P(t,i){t.update=function(t){this.velocity.x=0,this.velocity.y=i,H.prototype.update.call(this,t)}}function k(t,i,o,e){t.update=function(t){this.velocity.x=i*Math.cos(this.position.y/o),this.velocity.y=e,H.prototype.update.call(this,t)}}function L(t,i,o,e){var n=1;Math.random()>.5&&(n=-1),t.update=function(t){this.velocity.x=n*(-2*i/Math.PI)*Math.atan(1/Math.tan(this.position.y/o)),this.velocity.y=e,H.prototype.update.call(this,t)}}function D(t,i,o,e){t.update=function(t){this.velocity.x=2*i/Math.PI*Math.asin(Math.sin(this.position.y/o)),this.velocity.y=e,H.prototype.update.call(this,t)}}function j(t,i){return"rgb("+Math.floor(Math.random()*i+t)+","+Math.floor(Math.random()*i+t)+","+Math.floor(Math.random()*i+t)+")"}var C=function(t,i){this.x=t,this.y=i};C.prototype.set=function(t,i){this.x=t,this.y=i};var H=function(){this.name="Entity",this.size=25,this.position=new C(0,0),this.velocity=new C(0,0),this.color="#FFFFFF"};H.prototype.sayName=function(){console.log(this.name)},H.prototype.update=function(t){this.position.x+=this.velocity.x*t,this.position.y+=this.velocity.y*t,this.position.x<0&&(this.position.x=this.size),this.position.x+this.size>f.width&&(this.position.x=f.width-this.size)},H.prototype.render=function(){y.fillStyle=this.color,y.fillRect(this.position.x,this.position.y,this.size,this.size)};var A=function(){H.call(this),this.name="Enemy",this.size=Math.floor(50*Math.random()+20),this.color=j(90,150)};A.prototype=Object.create(H.prototype),A.prototype.constructor=H;var N=function(){H.call(this),this.name="Player",this.color="#4747FF"};N.prototype=Object.create(H.prototype),N.prototype.constructor=H;var U=function(){H.call(this),this.name="Particle",this.size=10,this.time=0,this.maxTime=Math.floor(10*Math.random()+3),this.velocity.x=Math.floor(20*Math.random()-10),this.velocity.y=Math.floor(20*Math.random()-10)};U.prototype=Object.create(H.prototype),U.prototype.constructor=H,U.prototype.update=function(t){H.prototype.update.call(this,t),this.time+=t,this.time>=this.maxTime&&F(this)};var X=function(){H.call(this),this.name="Bullet",this.size=10,this.time=0,this.color="rgba(200,200,200,1)",this.particlesDelay=.7};X.prototype=Object.create(H.prototype),X.prototype.constructor=H,X.prototype.update=function(t){H.prototype.update.call(this,t);var i=this;if(u.forEach((function(t){var o,e,n,s,a,r,h,l,c,p,f,y;t!==i&&"Particle"!=t.name&&(e=t,n=(o=i).size,s=o.position.x,a=o.position.x+n,r=o.position.y,h=o.position.y+n,l=e.size,c=e.position.x,p=e.position.x+l,f=e.position.y,y=e.position.y+l,s<p&&a>c&&r<y&&h>f&&(B(t),F(i)))})),this.position.y<0&&F(this),this.time+=t,this.time>=this.particlesDelay){this.time=0;var o=new U;o.size=Math.floor(5*Math.random()+2),o.color=O("rgb(125,125,125)",Math.random()),o.velocity.x/=2,o.position.x=this.position.x+this.size/2-o.size/2,o.position.y=this.position.y-o.size/2,u.push(o)}};var Y=function(){H.call(this),this.name="PowerUp",this.size=20,this.time=0,this.particlesDelay=.25;var t=Math.random();this.effect=t<.5?"scoreBoost":t<.75?"tripleShot":"bomb"};Y.prototype=Object.create(H.prototype),Y.prototype.constructor=H,Y.prototype.update=function(t){if(H.prototype.update.call(this,t),(this.position.y<0||this.position.y+this.size>f.height)&&F(this),this.time+=t,this.time>=this.particlesDelay){this.time=0;var i=new U;i.size=Math.floor(5*Math.random()+2),i.color=O(j(100,255),Math.random()),i.velocity.x/=2,i.position.x=this.position.x+this.size/2-i.size/2,i.position.y=this.position.y-i.size/2,u.push(i)}},Y.prototype.render=function(){y.fillStyle=j(100,255),y.fillRect(this.position.x,this.position.y,this.size,this.size)},document.addEventListener("DOMContentLoaded",w()),document.getElementById("closeButton").onclick=function(){self.close()},document.getElementById("minimizeButton").onclick=function(){minimize()},f.addEventListener("click",(function(){t?(tgames.gameStarted(),t=!1,b(),o=setInterval(T,2e3),e=setInterval(R,n),(h=new N).position.set(f.width/2,f.height-h.size),h.render(),u.push(h)):(I({x:0,y:-h.size},30),v&&(I({x:-h.size,y:-h.size},25),I({x:h.size,y:-h.size},25)),a>0&&(a-=1))})),z.addEventListener("click",(()=>{tgames.showRewardedAd(),l>.5&&(w(),z.style.display="none")})),f.addEventListener("mousemove",(function(t){var i=function(t,i){var o=t.getBoundingClientRect();return new C(i.clientX-o.left,i.clientY-o.top)}(f,t);h&&!r&&(h.position.x=i.x)}),!1)})();
//# sourceMappingURL=bundle.0fd5ac47a1f0c3bc.js.map