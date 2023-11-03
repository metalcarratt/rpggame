(function(){"use strict";var e={5247:function(e,t,n){var o={};n.r(o),n.d(o,{SZ:function(){return dn},Nn:function(){return pn},JR:function(){return kn},Ld:function(){return In},RY:function(){return xn},ov:function(){return mn},Sj:function(){return wn},hM:function(){return hn},cp:function(){return vn},ZQ:function(){return yn},UV:function(){return Sn},uv:function(){return _n},Dl:function(){return fn}});var a={};n.r(a),n.d(a,{QX:function(){return so},VQ:function(){return mo},Xm:function(){return uo},sy:function(){return fo},Ei:function(){return yo},y5:function(){return go},C$:function(){return po}});var i=n(9242),r=n(3396);const l={id:"hud"};function s(e,t){return(0,r.wg)(),(0,r.iD)("div",l,[(0,r.WI)(e.$slots,"default",{},void 0,!0)])}var c=n(89);const u={},g=(0,c.Z)(u,[["render",s],["__scopeId","data-v-52a7fc1f"]]);var d=g,f=n(4870);const m=()=>({img:null,loaded:!1}),p=(e,t)=>{e.img=new Image,e.img.src=t,e.img.onload=()=>e.loaded=!0},y={floor:m(),cave:m(),w2:m(),character:m(),spider:m(),mouse:m(),lightningFlag:m(),formationPlate:m(),animalCorpse:m(),lightning1:m(),lightning2:m(),lightning3:m(),lightning4:m()},h=()=>{const e=Object.values(y),t=e.filter((e=>!e.loaded)),n=t.length;n>0?setTimeout(h,100):Wn()};function v(){p(y.floor,"../f1.jpg"),p(y.cave,"../t1.png"),p(y.w2,"../ww.jpg"),p(y.character,"../ch.png"),p(y.spider,"../spider2.png"),p(y.mouse,"../mouse.png"),p(y.lightningFlag,"../lightning_flag.png"),p(y.formationPlate,"../formation_plate.png"),p(y.animalCorpse,"../lizard.png"),p(y.lightning1,"../effect_lightning_1.png"),p(y.lightning2,"../effect_lightning_2.png"),p(y.lightning3,"../effect_lightning_3.png"),p(y.lightning4,"../effect_lightning_4.png"),h()}n(7658);const x="rgba(255, 98, 164, 0.3)",_="rgba(143, 50, 168, 0.3)",I="rgb(20, 19, 242, 0.3)";var w,T,S,k,b,O;(function(e){e["SQUARE"]="square",e["ROUND"]="round"})(w||(w={})),function(e){e[e["NORMAL"]=0]="NORMAL",e[e["STANDING"]=1]="STANDING",e[e["OVERSIZED"]=2]="OVERSIZED"}(T||(T={})),function(e){e[e["TOOLTIP"]=0]="TOOLTIP",e[e["DIALOG"]=1]="DIALOG"}(S||(S={})),function(e){e["LEFT"]="left",e["BOTTOM_RIGHT"]="bottom-right",e["BOTTOM"]="bottom"}(k||(k={})),function(e){e["CANVAS"]="canvas",e["ACTION"]="action"}(b||(b={})),function(e){e[e["NORMAL"]=0]="NORMAL",e[e["FORMATION"]=1]="FORMATION",e[e["FLAG"]=2]="FLAG"}(O||(O={}));const A=(0,f.iH)([]),E=()=>A.value,L=(e,t)=>{A.value.push({type:e,at:t})},N=e=>A.value.splice(A.value.findIndex((t=>t.at.x===e.x&&t.at.y===e.y)),1)[0];var C,D=n(7327);(function(e){e[e["LIGHTNING"]=0]="LIGHTNING"})(C||(C={}));let M=[];const R=(e,t,n)=>{M.find((t=>t.at.x===e.x&&t.at.y===e.y))||M.push({at:e,type:t,source:n})},U=e=>{M=M.filter((t=>!(t.source.x===e.x&&t.source.y===e.y)))},P=e=>M.filter((t=>t.source.x===e.x&&t.source.y===e.y)),G=(0,f.iH)([]),B=(0,f.iH)(0);function H(){B.value++,B.value>=G.value.length&&(B.value=0)}function $(){return G.value[B.value]}function q(e){const t=G.value.findIndex((t=>t.name===e));return t>0}function j(e){console.log(`removing unit ${e}`);const t=G.value.findIndex((t=>t.name===e));t>0&&G.value.splice(t,1),H(),console.log(`turn stack: ${JSON.stringify(G.value)}`)}function Y(e){G.value.push(e)}function z(){G.value=[]}function F(){return G.value}const W=(e,t)=>e.x===t.x&&e.y===t.y;var V;(function(e){e["BROKEN"]="Broken",e["IDLE"]="Idle",e["ALIVE"]="Alive"})(V||(V={}));const Z=(0,f.iH)([]),K=(e,t,n)=>{const o={title:e,at:t,type:n,corners:{},status:V.IDLE};o.corners=se(t),o.corners.TL&&o.corners.TR&&o.corners.BL&&o.corners.BR||(o.status=V.BROKEN),Z.value.push(o),console.log(`formations: ${JSON.stringify(Z.value)}`)},J=()=>{for(const e of Z.value)e.corners=se(e.at),e.corners.TL&&e.corners.TR&&e.corners.BL&&e.corners.BR?e.status=V.IDLE:e.status=V.BROKEN},Q=e=>{Z.value.splice(Z.value.findIndex((t=>W(t.at,e))))},X=()=>Z.value.length>0,ee=()=>Z.value,te=e=>{const t=Z.value.find((t=>W(t.at,e)));t&&(t.status=V.ALIVE,re(t),console.log(`adding to stack formation: ${t.title}`),Y({name:"Lightning Array",at:t.at,energy:1,movement:1,autoMove:()=>{console.log("formation's turn"),hn().qi-=2;const e=P(t.at);for(const t of e){const e=_n(t.at);e&&(console.log(`attacking unit at ${e.at.x}, ${e.at.y}`),kn({power:20,name:"lightning"},t.at))}return!0}}))},ne=e=>{const t=e.corners?.TL?.at;if(t){const n=e.at;for(let e=t.x;e<n.x+1;e++)for(let o=t.y;o<n.y+1;o++)R({x:e,y:o},C.LIGHTNING,n)}},oe=e=>{const t=e.corners?.TR?.at;if(t){const n=e.at;for(let e=n.x;e<t.x+1;e++)for(let o=t.y;o<n.y+1;o++)R({x:e,y:o},C.LIGHTNING,n)}},ae=e=>{const t=e.corners?.BL?.at;if(t){const n=e.at;for(let e=t.x;e<n.x+1;e++)for(let o=n.y;o<t.y+1;o++)R({x:e,y:o},C.LIGHTNING,n)}},ie=e=>{const t=e.corners?.BR?.at;if(t){const n=e.at;for(let e=n.x;e<t.x+1;e++)for(let o=n.y;o<t.y+1;o++)R({x:e,y:o},C.LIGHTNING,n)}},re=e=>{ne(e),oe(e),ae(e),ie(e)},le=e=>{const t=Z.value.find((t=>W(t.at,e)));t&&(t.status=V.IDLE,U(e),t&&(console.log(`removing from stack formation: ${t.title}`),j(t.title)))},se=e=>{const t={};for(const n of E())if(n.type.category===O.FLAG){const o=n.at.x-e.x,a=n.at.y-e.y;if(Math.abs(o)===Math.abs(a)){const e=JSON.parse(JSON.stringify(n.at)),i=Math.abs(o);o<0&&a<0?t.TL={at:e,dist:i}:o>0&&a<0?t.TR={at:e,dist:i}:o<0&&a>0?t.BL={at:e,dist:i}:o>0&&a>0&&(t.BR={at:e,dist:i})}}return t};var ce;(function(e){e[e["EMPTY_SPACE"]=0]="EMPTY_SPACE",e[e["ENEMY_UNIT"]=1]="ENEMY_UNIT",e[e["WALL"]=2]="WALL",e[e["ITEM"]=3]="ITEM"})(ce||(ce={}));const ue=e=>0===vo[e.y][e.x]&&!fn.some((t=>W(t.at,e))),ge=e=>0===vo[e.y][e.x]&&fn.some((t=>W(t.at,e)&&t.team===dn.MONSTER)),de=e=>0!==vo[e.y][e.x]&&!fn.some((t=>W(t.at,e))),fe=e=>E().some((t=>t.at.x===e.x&&t.at.y===e.y));function me(e,t){const n=t??ce.EMPTY_SPACE;return ye(e,[],n)}const pe=(e,t)=>{switch(t){case ce.EMPTY_SPACE:return ue(e);case ce.ENEMY_UNIT:return ge(e);case ce.WALL:return de(e);case ce.ITEM:return fe(e)}};function ye(e,t,n){const o=[];for(let a=e.x-1;a<e.x+2;a++)for(let i=e.y-1;i<e.y+2;i++)a>=0&&a<vo[0].length&&i>=0&&i<vo.length&&pe({x:a,y:i},n)&&!o.some((e=>e.x==a&&e.y===i))&&!t.some((e=>e.x==a&&e.y===i))&&o.push({x:a,y:i});return o}function he(e,t,n){const o=n??ce.EMPTY_SPACE,a=me(e,o);let i=a.map((e=>ve(e,1)));for(let r=0;r<t-1;r++){const e=i.length;for(let t=0;t<e;t++){const e=ye(i[t],i,o);i=i.concat(e.map((e=>ve(e,r+2))))}}return i}function ve(e,t){return{...e,d:t}}class xe{constructor(e){(0,D.Z)(this,"items",[]),this.items=e}removeItem(e){e.quantity--,e?.quantity<=0&&this.items.splice(this.items.findIndex((t=>t.type.title===e.type.title)),1)}addItem(e){const t=this.items.find((t=>t.type.title===e.title));t?t.quantity++:this.items.push({type:e,quantity:1})}isEmpty(){return 0===this.items.length}}const _e={img:y.lightningFlag,title:"Lightning Flag",category:O.FLAG},Ie={img:y.formationPlate,title:"Formation Plate",category:O.FORMATION},we=e=>{console.log("perform action inventory"),ke.value&&(In().inventory?.removeItem(ke.value),L(ke.value.type,e),ke.value.type.category===O.FLAG&&J()),(!ke.value||ke.value.quantity<=0)&&(ke.value=null,mo(Be))},Te=e=>{In().inventory?.addItem(e.type),e.type.category===O.FORMATION?Q(e.at):e.type.category===O.FLAG&&J()},Se={label:"Inventory",img:"",range:{range:1,validator:ce.EMPTY_SPACE,colour:_},perform:e=>{ke.value?.type.category===O.FORMATION?(K("",e,ke.value.type),we(e)):we(e)},precondition:()=>!0},ke=(0,f.iH)(null),be=e=>go(Se)&&e.type.title===ke.value?.type.title,Oe=e=>{console.log(`click inventory item ${e.type.title}`),ke.value=e,mo(Se)};var Ae;(function(e){e[e["IN_PROGRESS"]=0]="IN_PROGRESS",e[e["GAME_OVER"]=1]="GAME_OVER"})(Ae||(Ae={}));const Ee=(0,f.iH)(Ae.IN_PROGRESS),Le=(0,f.iH)(""),Ne=(0,f.iH)(""),Ce="defeat",De=()=>Le.value,Me=()=>Ne.value,Re=(e,t)=>{Le.value=e,Ee.value=Ae.GAME_OVER,Ne.value=t===Ce?"defeated.jpg":"win.jpg"},Ue=()=>Ee.value===Ae.GAME_OVER,Pe={label:"Wait",img:"/waiting.png",perform:()=>{In().energy=0},precondition:()=>!0},Ge={label:"Attack",img:"/attack.png",range:{range:1,validator:ce.ENEMY_UNIT,colour:_},perform:e=>{const t=hn();kn(t,e),In().energy=0},precondition:()=>!0},Be={label:"Walk",img:"/walk.png",range:{range:()=>In().energy,validator:ce.EMPTY_SPACE,colour:x},perform:e=>{In().at=JSON.parse(JSON.stringify(e)),In().energy-=e.d},precondition:()=>!0},He={label:"Pick Up",img:"/take.png",range:{range:1,validator:ce.ITEM,colour:x},perform:e=>{const t=N(e);Te(t)},precondition:()=>he(In().at,1,ce.ITEM).length>0},$e={label:"Exit Level",img:"/exit.png",corners:w.SQUARE,perform:()=>Re("Completed level!",""),precondition:()=>!xn()},qe=e=>({name:"Mouse",img:y.mouse,profileImg:"mouse_profile.png",at:e,hp:1,armour:0,qi:0,power:0,team:dn.PLAYER,movement:4,energy:4,actions:[Pe,Be],battleDetails:{center:85,rebound:105,top:85,height:80,image:"mouse.png"}}),je="Spirit Friend",Ye="deployed",ze={label:je,img:"mouse_summon.png",range:{range:1,validator:ce.EMPTY_SPACE,colour:_},meta:{[Ye]:!1},perform(e){pn(qe(e)),this.meta[Ye]=!0,In().energy=0},precondition(){return!1===this.meta[Ye]}},Fe={label:"Recall",img:"/mouse_recall.png",perform(){console.log("perform recall"),yn("Mouse");const e=In().actions?.find((e=>e.label===je));e&&(e.meta[Ye]=!1),In().energy=0},precondition(){return q("Mouse")}},We="Azeena",Ve=e=>({name:We,img:y.character,imgType:T.STANDING,profileImg:"player_profile.png",at:e,hp:2,armour:0,qi:60,power:2,team:dn.PLAYER,movement:2,energy:2,inventory:new xe([{type:_e,quantity:4},{type:Ie,quantity:1}]),actions:[ze,Fe,He,Ge,Pe,Be,$e],battleDetails:{center:70,rebound:100,top:30,height:150,image:"ch.png"}});let Ze=[];function Ke(e,t){In().at.x=e,In().at.y=t}function Je(){Ze=[]}const Qe="Spider Bait",Xe={img:y.animalCorpse,title:Qe,category:O.NORMAL};function et(e,t){return e.x>=t.x-1&&e.x<=t.x+1&&e.y>=t.y-1&&e.y<=t.y+1&&!(e.x===t.x&&e.y===t.y)}function tt(e){const t=[];for(let n=0;n<e.length;n++)for(let o=0;o<e[0].length;o++)e[n][o]&&0===vo[n][o]&&t.push({x:o,y:n});return t}function nt(e,t,n,o){const a=t.filter((t=>e[t.y][t.x]&&0===vo[t.y][t.x])),i=tt(e),r=i.filter((e=>et(e,n)));let l={x:-1,y:-1},s={x:-1,y:-1},c=-1;for(const u of r)for(const e of a){const t=Math.abs(u.x-e.x)+Math.abs(u.y-e.y);(-1===c||c>t)&&(c=t,l=u,s=e)}return s}const ot=(e,t)=>{kn(e,t),e.energy=0,e.meta&&(e.meta.target=null)},at=(e,t)=>{if(e.meta){const n=hn();if(n&&t[n.at.y][n.at.x])return void(e.meta.target=n.at);const o=E().filter((e=>e.type.title===Qe));for(const a of o)if(t[a.at.y][a.at.x])return void(e.meta.target=a.at)}},it=(e,t,n)=>{const o=he(e.at,1),a=nt(n,o,t,e.at);console.log(`closest is ${a.x}, ${a.y}`),-1!==a.x&&-1!==a.y?(console.log(`CHARGE from ${e.at.x}, ${e.at.y} to ${a.x}, ${a.y}`),Ke(a.x,a.y),e.energy--):e.meta&&(e.meta.target=null)},rt=e=>{const t=he(e.at,1),n=Math.floor(Math.random()*t.length),o=t[n].x,a=t[n].y;Ke(o,a),e.energy=0},lt=e=>{console.log("boss move");let t=To([e]);return at(e,t),e.meta&&null!=e.meta.target?et(e.at,e.meta.target)?(console.log("attacking"),ot(e,e.meta.target)):(console.log("charging"),it(e,e.meta.target,t)):(console.log("idling"),rt(e)),t=To([e]),at(e,t),e.energy<=0},st=e=>({name:"Turqoise Spider",img:y.spider,imgType:T.OVERSIZED,profileImg:"spider_profile.png",at:e,hp:2,armour:10,qi:0,power:10,team:dn.MONSTER,movement:8,energy:8,actions:[],meta:{target:null},autoMove(){return lt(this)},battleDetails:{center:35,rebound:55,top:40,height:180,image:"spider2.png"}}),ct="Azeena",ut="profile.png",gt="profile_cold.png",dt="profile_reading.png",ft=[{name:ct,speech:"'Brrr... it's colder in here than I expected.'",profileImg:gt},{name:ct,speech:"'According to the book, there are tens of thousands of these caves hidden in the north-western mountains that encircle the desert.'",profileImg:dt},{name:ct,speech:"'They are the remains of an ancient civilization that disappeared a long time ago and are now inhabited by monsters.'",profileImg:dt},{name:ct,speech:"'This one should just be the lair of a giant spider though. Even though it's tough, with a little bit of skill, I should be able to take it out.'",profileImg:ut}],mt={name:"movement guide",type:S.TOOLTIP,tooltip:{text:"Let's explore! I can move here!",direction:k.LEFT,location:{top:290,left:240},target:b.CANVAS,targetName:b.CANVAS},ready:()=>!0,finished:()=>!W(hn().at,{x:0,y:4})},pt=()=>E().some((e=>e.type.title===Qe&&xo[e.at.y][e.at.x])),yt={name:"bait dialog",type:S.DIALOG,dialog:[{name:ct,speech:"'Are those dead lizards?'",profileImg:ut},{name:ct,speech:"'Apparantly spiders like to eat lizards. Maybe I can use them as bait?'",profileImg:dt}],ready:pt,finished:()=>!0},ht={name:"bait tooltip",type:S.TOOLTIP,tooltip:{text:"Move within range of the dead lizards",direction:k.LEFT,location:{top:160,left:240},target:b.CANVAS,targetName:b.CANVAS},ready:pt,finished:He.precondition},vt={name:"pickup tooltip",type:S.TOOLTIP,tooltip:{text:"Click the 'take' action and then choose an item to take",direction:k.BOTTOM,location:{top:-100,left:0},width:260,target:b.ACTION,targetName:"Pick Up"},ready:He.precondition,finished:()=>In()?.inventory?.items.some((e=>e.type.title===Qe))??!1},xt={name:"spy dialog",type:S.DIALOG,dialog:[{name:ct,speech:"'This place is scary. I shouldn't just walk around aimlessly like this.'",profileImg:ut},{name:ct,speech:"'I know. I can summon my spirit friend. She's a mouse, and whatever she can see, I can see.'",profileImg:ut}],ready:()=>In().at.x>=4,finished:()=>!0},_t={name:"spy tooltip",type:S.TOOLTIP,tooltip:{text:"Click the 'summon' action to summon my spirit friend.",direction:k.BOTTOM,location:{top:-100,left:0},width:260,target:b.ACTION,targetName:je},ready:()=>In().at.x>=4,finished:()=>vn().some((e=>"Mouse"===e.name))},It=()=>fn.some((e=>"Turqoise Spider"===e.name&&xo[e.at.y][e.at.x])),wt={name:"spider dialog",type:S.DIALOG,dialog:[{name:ct,speech:"'That's the spider! I need to be careful. There's no way I could defeat that thing by just charging in.'",profileImg:ut},{name:ct,speech:"'Lucky I bought materials for laying a formation. According to the book, I need to place a formation plate in the center of a large area and place a lightning flags at each corner.'",profileImg:dt},{name:ct,speech:"'Then I can activate the formation to release deadly lightning. Better not to get hit by that!'",profileImg:dt},{name:ct,speech:"'Okay! Let's try laying that formation plate somewhere!'",profileImg:ut}],ready:It,finished:()=>!0},Tt={name:"formation plate dialog",type:S.DIALOG,dialog:[{name:ct,speech:"'I've laid the formation plate. Now I need to put a lightning flag in one of the four corners. It shouldn't matter how far they are as long as they are on the corner...'",profileImg:dt}],ready:()=>X(),finished:()=>!0},St={name:"formation plate dialog",type:S.DIALOG,dialog:[{name:ct,speech:"'The formation is complete. Once I lure the spider here I can activate the formation to zap it.'",profileImg:dt},{name:ct,speech:"'Better not stand in range of the formation when it's active..!'",profileImg:ut}],ready:()=>X()&&ee()[0].status===V.IDLE,finished:()=>!0},kt={name:"spider dialog",type:S.DIALOG,dialog:[{name:ct,speech:"'I killed it! I actually killed it! I can't believe I really did it!'",profileImg:ut},{name:ct,speech:"'Phew! Now that's over, I can leave this place once I'm ready'",profileImg:ut}],ready:()=>!xn(),finished:()=>!0},bt={name:"exit tooltip",type:S.TOOLTIP,tooltip:{text:"Click the 'exit level' action to leave the cave.",direction:k.BOTTOM_RIGHT,location:{top:-100,left:-150},width:260,target:b.ACTION,targetName:"Exit Level"},ready:()=>!xn(),finished:()=>Ue()},Ot=()=>{Bt([mt,yt,ht,vt,xt,_t,wt,Tt,St,kt,bt])},At=!0,Et=(0,f.iH)(ft[0]);let Lt=[ft[1],ft[2],ft[3]];const Nt=()=>void 0!==Et.value&&At,Ct=()=>Et.value,Dt=()=>{Lt.length>0?Et.value=Lt.splice(0,1)[0]:(Et.value=void 0,Ht())},Mt=e=>{Lt=e,Dt()};let Rt=[];const Ut=(0,f.iH)(),Pt=()=>Ut.value?.type===S.TOOLTIP&&Ut.value?.tooltip&&At,Gt=()=>Ut.value?.tooltip,Bt=e=>{Rt=e,Ht()},Ht=()=>{if(console.log("guide tick"),Ut.value?.finished()&&(console.log("guide finished"),Ut.value=void 0),!Ut.value){console.log("looking for new guides");for(let e=0;e<Rt.length;e++)if(console.log(`found guide ${Rt[e].name}`),Rt[e].ready())return console.log("ready"),Ut.value=Rt.splice(e,1)[0],void(Ut.value.type===S.DIALOG&&Ut.value.dialog&&Mt(Ut.value.dialog))}},$t=(0,f.iH)(!1),qt=()=>$t.value,jt=(e,t,n)=>{Ft.damage=e,Ft.attacker=t,Ft.defender=n,$t.value=!0,an()},Yt=()=>Ft.attacker,zt=()=>{$t.value=!1,Ft.damage=0,Ht()},Ft={damage:0,attacker:null,defender:null},Wt=()=>Ft.defender?.image,Vt=()=>Ft.attacker?.image,Zt=200,Kt=(0,f.iH)(""),Jt=(0,f.iH)(""),Qt=(0,f.iH)(""),Xt=(0,f.iH)(""),en={top:0,height:0,center:0},tn={top:0,height:0,center:0,filter:null},nn=()=>Kt.value=`margin-left: ${en.center??0}px; margin-top: ${en.top??0}px; height: ${en.height}px`,on=()=>Jt.value=`margin-left: ${tn.center??0}px; margin-top: ${tn.top??0}px; height: ${tn.height}px;`+(tn.filter?`filter: ${tn.filter}`:""),an=()=>{console.log("start animation"),Ft.attacker&&(en.top=Ft.attacker.top,en.height=Ft.attacker.height,en.center=Ft.attacker.center),Ft.defender&&(tn.top=Ft.defender.top,tn.height=Ft.defender.height,tn.center=Ft.defender.center,tn.filter=null),nn(),on(),Yt()?setTimeout(rn,2*Zt):setTimeout(sn,2*Zt)},rn=()=>{console.log("attacker start charge"),en.center=0,nn(),setTimeout(ln,Zt)},ln=()=>{console.log("attacker complete charge"),en.center=Ft.attacker?.center??0,nn(),setTimeout(cn,Zt)},sn=()=>{console.log("lightning attack"),Qt.value="\n        background-color: #f2c6c6;\n        background-blend-mode: screen;\n    ",tn.filter="hue-rotate(30deg) saturate(500%) brightness(300%);",on(),setTimeout(cn,Zt)},cn=()=>{console.log("defender receive attack animation"),Qt.value="",tn.filter="hue-rotate(0deg) saturate(500%) brightness(150%)",Yt()&&(tn.center=Ft.defender?.rebound??0),on(),Xt.value=`-${Ft.damage}`,setTimeout(un,2*Zt)},un=()=>{console.log("defender return to normal"),tn.filter=null,tn.center=Ft.defender?.center??0,on(),setTimeout(gn,4*Zt)},gn=()=>{console.log("end animation"),Xt.value="",Kt.value="",Jt.value="",zt()};var dn;(function(e){e[e["PLAYER"]=0]="PLAYER",e[e["MOB"]=1]="MOB",e[e["MONSTER"]=2]="MONSTER"})(dn||(dn={}));let fn=[];function mn(){fn=[],z(),pn(Ve({x:0,y:4})),pn(st({x:2,y:7}))}function pn(e){fn.push(e),Y(e)}function yn(e){const t=fn.findIndex((t=>t.name===e));t>=0&&(fn.splice(t,1),j(e))}const hn=()=>fn.find((e=>e.name===We)),vn=()=>fn.filter((e=>e.team===dn.PLAYER)),xn=()=>fn.filter((e=>e.team===dn.MONSTER)).length>0,_n=e=>fn.find((t=>t.at.x===e.x&&t.at.y==e.y)),In=()=>$();function wn(){if(Ue())return;H();const e=In();e.energy=e.movement,Tn(e)}function Tn(e){if(console.log("do move"),e.autoMove){console.log("## monster taking move (1)");const t=e.autoMove();if(!t)return void(xo[e.at.y][e.at.x]?(console.log("## render and set timer"),Wn(),setTimeout((()=>Tn(e)),400)):Tn(e));wn()}else Sn()}function Sn(){wo(),mo(Be),Wn()}function kn(e,t){const n=fn.find((e=>W(e.at,t)));if(n){if(n.armour>=e.power)n.armour-=e.power;else{const t=e.power-n.armour;n.armour=0,n.hp-=t}return n.hp<0&&(n.hp=0,j(n.name),yn(n.name),n.name===We&&Re(`Defeated by ${e.name}`,Ce)),jt(e.power,e.battleDetails??null,n.battleDetails),void Wn()}const o=E().find((e=>e.at.x===t.x&&e.at.y===t.y));o&&N(o.at)}const bn=(0,f.iH)(!1),On={x:-1,y:-1},An=e=>{const t=Un(),n=t.getBoundingClientRect(),o=Math.floor((e.clientX-n.left)/Mn*Dn),a=Math.floor((e.clientY-n.top)/Mn*Dn);On.x=o,On.y=a,Wn(),En(On)},En=e=>{Ln()||Nn()?bn.value=!0:bn.value=!1},Ln=()=>Ze.some((e=>e.x===On.x+Rn.x&&e.y===On.y+Rn.y)),Nn=()=>so.some((e=>e.x===On.x+Rn.x&&e.y===On.y+Rn.y));function Cn(){if(Nn()){const e=fo(On.x,On.y);po({x:On.x+Rn.x,y:On.y+Rn.y,d:e.d}),In().energy<1&&wn()}Ht()}let Dn=0;const Mn=100,Rn={x:0,y:0},Un=()=>document.getElementById("myCanvas");function Pn(){const e=Un();Dn=window.devicePixelRatio;const t=+getComputedStyle(e).getPropertyValue("height").slice(0,-2),n=+getComputedStyle(e).getPropertyValue("width").slice(0,-2);e.setAttribute("height",""+t*Dn),e.setAttribute("width",""+n*Dn)}function Gn(){const e=Un();Pn(),e.addEventListener("mousemove",An),setInterval(Hn,200)}let Bn=1;const Hn=()=>{Bn++,Bn>4&&(Bn=1);const e=Un(),t=e.getContext("2d");if(t)for(const n of M)Zn(t,n.at)};function $n(e,t,n){e.save(),xo[t.y][t.x]||(e.filter="brightness(0.4)"),n(),e.restore()}function qn(e,t){const n=Un(),o=n.getContext("2d");$n(o,t,(()=>{const n=(t.x-Rn.x)*Mn,a=(t.y-Rn.y)*Mn;o.drawImage(e,n,a,Mn,Mn)}))}function jn(e,t){const n=Un(),o=n.getContext("2d"),a=(t.x-Rn.x)*Mn-Mn/4,i=(t.y-Rn.y)*Mn-Mn/2;o.drawImage(e,a,i,1.5*Mn,1.5*Mn)}function Yn(e,t){const n=Un(),o=n.getContext("2d"),a=(t.x-Rn.x)*Mn,i=(t.y-Rn.y)*Mn;o.drawImage(e,a,i-Mn/2,Mn,1.5*Mn)}function zn(e,t,n,o){const a=Un(),i=a.getContext("2d");$n(i,n,(()=>{const a=(n.x-Rn.x)*Mn,r=(n.y-Rn.y)*Mn;i.save(),o&&(i.globalAlpha=.8),i.drawImage(t,a,r-Mn/4*3,Mn,Mn),i.drawImage(e,a,r+Mn/4,Mn,Mn-Mn/4),i.restore()}))}function Fn(e){if(xo[e.at.y][e.at.x]){e.imgType===T.STANDING?Yn(e.img.img,e.at):e.imgType==T.OVERSIZED?jn(e.img.img,e.at):qn(e.img.img,e.at);const t=Un(),n=t.getContext("2d"),o=(e.at.x-Rn.x)*Mn,a=(e.at.y-Rn.y)*Mn;n.font="25px Arial",n.fillStyle="white",n.fillText(`${e.armour}`,o+Mn-90,a+Mn),n.fillStyle="red",n.fillText(`${e.hp}`,o+Mn-55,a+Mn),n.fillStyle="yellow",n.fillText(`${e.qi}`,o+Mn-30,a+Mn)}}const Wn=()=>{const e=Un(),t=e.getContext("2d");t&&(t.clearRect(0,0,e.width,e.height),Vn(t))};function Vn(e){for(let t=0+Rn.y;t<vo.length;t++)for(let n=0+Rn.x;n<vo[0].length;n++)Zn(e,{x:n,y:t})}function Zn(e,t){if(_o[t.y][t.x]){if(0===vo[t.y][t.x])qn(y.floor.img,t);else if(1===vo[t.y][t.x]){const e=t.y-1>=0&&0===vo[t.y-1][t.x]&&xo[t.y-1][t.x];e&&qn(y.floor.img,t),zn(y.w2.img,y.cave.img,t,e)}oo(e,t),Kn(e,t),Xn(t),Jn(t),to(t),no(e,t)}}function Kn(e,t){W(In().at,t)&&(e.fillStyle=I,e.fillRect((In().at.x-Rn.x)*Mn,(In().at.y-Rn.y)*Mn,Mn,Mn))}function Jn(e){const t=fn.find((t=>W(t.at,e)));t&&Fn(t)}function Qn(e){qn(e.type.img.img,e.at)}function Xn(e){const t=E().find((t=>t.at.x===e.x&&t.at.y===e.y));t&&Qn(t)}function eo(e){if(e.type===C.LIGHTNING)switch(Bn){case 1:return qn(y.lightning1.img,e.at);case 2:return qn(y.lightning2.img,e.at);case 3:return qn(y.lightning3.img,e.at);case 4:return qn(y.lightning4.img,e.at)}}function to(e){const t=M.find((t=>t.at.x===e.x&&t.at.y===e.y));t&&eo(t)}function no(e,t){On.x===t.x&&On.y===t.y&&(e.lineWidth=2,e.strokeStyle="orange",e.beginPath(),e.rect(On.x*Mn,On.y*Mn,Mn,Mn),e.stroke())}function oo(e,t){so.some((e=>e.x===t.x&&e.y===t.y))&&(e.lineWidth=16,e.strokeStyle=uo(),e.beginPath(),e.rect((t.x-Rn.x)*Mn+12,(t.y-Rn.y)*Mn+12,Mn-24,Mn-24),e.stroke())}function ao(){Rn.x++,Wn()}function io(){Rn.x>0&&(Rn.x--,Wn())}function ro(){Rn.y>0&&(Rn.y--,Wn())}function lo(){Rn.y++,Wn()}let so=[];const co=(0,f.iH)(Be),uo=()=>co.value.range?.colour,go=e=>co.value.label===e.label,fo=(e,t)=>so.find((n=>n.x===e&&n.y===t)),mo=e=>{if(Je(),e.range){const t="number"===typeof e.range.range?e.range.range:e.range.range();so=he(In().at,t,e?.range.validator??ce.EMPTY_SPACE),co.value=e,Wn()}else co.value=e,po({x:0,y:0,d:0}),console.log(`unit has ${In().energy} remaining`),In().energy<1&&(console.log("no energy left, next unit turn"),wn()),console.log("click action finished")},po=e=>{co.value.perform(e),(!co.value.precondition()||In().energy<=0||Ue())&&(co.value=Be),wo(),mo(co.value)};function yo(){const e=In();return e.actions?.filter((e=>e.precondition()))??[]}const ho=[[1,1,1,1,1,1,1,1,1,1,1],[1,0,0,0,1,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,1],[1,1,0,1,1,0,0,0,0,0,1],[0,0,0,0,1,0,0,0,0,0,1],[1,1,1,1,1,0,1,0,1,0,1],[1,0,0,0,1,0,1,0,0,0,1],[1,0,0,0,1,1,1,1,1,0,1],[1,0,0,0,0,0,0,0,0,0,1],[1,1,1,1,1,1,1,1,1,1,1]];let vo=ho;let xo=[];const _o=[];function Io(){for(let e=0;e<vo.length;e++){_o[e]=[];for(let t=0;t<vo[0].length;t++)_o[e][t]=!1}}function wo(){xo=To(vn(),!0)}function To(e,t=!1){const n=[];for(let o=0;o<vo.length;o++){n[o]=[];for(let e=0;e<vo[0].length;e++)n[o][e]=!1}for(const o of e)Eo(o.at,n,t),Lo(o.at,n,t),No(o.at,n,t),Co(o.at,n,t),Do(o.at,n,t),Mo(o.at,n,t),Ro(o.at,n,t),Uo(o.at,n,t);return n}const So=e=>e>=0,ko=e=>e>=0,bo=e=>e<vo[0].length,Oo=e=>e<vo.length,Ao=(e,t)=>1!==vo[t][e];function Eo(e,t,n){const o=e.y;let a=e.x;t[o][a]=!0,n&&(_o[o][a]=!0);while(bo(a)&&Ao(a,o))a++,t[o][a]=!0,n&&(_o[o][a]=!0),Ro({x:a,y:o},t,n),Mo({x:a,y:o},t,n)}function Lo(e,t,n){const o=e.y;let a=e.x;t[o][a]=!0,n&&(_o[o][a]=!0);while(So(a)&&Ao(a,o))a--,t[o][a]=!0,n&&(_o[o][a]=!0),Do({x:a,y:o},t,n),Uo({x:a,y:o},t,n)}function No(e,t,n){let o=e.y;const a=e.x;t[o][a]=!0,n&&(_o[o][a]=!0);while(ko(o)&&Ao(a,o))o--,t[o][a]=!0,n&&(_o[o][a]=!0),Do({x:a,y:o},t,n),Ro({x:a,y:o},t,n)}function Co(e,t,n){let o=e.y;const a=e.x;t[o][a]=!0,n&&(_o[o][a]=!0);while(Oo(o)&&Ao(a,o))o++,t[o][a]=!0,n&&(_o[o][a]=!0),Uo({x:a,y:o},t,n),Mo({x:a,y:o},t,n)}function Do(e,t,n){let o=e.y,a=e.x;t[o][a]=!0,n&&(_o[o][a]=!0);while(ko(o)&&So(a)&&Ao(a,o))a--,o--,t[o][a]=!0,n&&(_o[o][a]=!0)}function Mo(e,t,n){let o=e.y,a=e.x;t[o][a]=!0,n&&(_o[o][a]=!0);while(bo(a)&&Oo(o)&&Ao(a,o))a++,o++,t[o][a]=!0,n&&(_o[o][a]=!0)}function Ro(e,t,n){let o=e.y,a=e.x;t[o][a]=!0,n&&(_o[o][a]=!0);while(ko(o)&&bo(a)&&Ao(a,o))a++,o--,t[o][a]=!0,n&&(_o[o][a]=!0)}function Uo(e,t,n){let o=e.y,a=e.x;t[o][a]=!0,n&&(_o[o][a]=!0);while(Oo(o)&&So(a)&&Ao(a,o))a--,o++,t[o][a]=!0,n&&(_o[o][a]=!0)}var Po=n(7139);const Go=e=>((0,r.dD)("data-v-4b1b6481"),e=e(),(0,r.Cn)(),e),Bo=Go((()=>(0,r._)("span",{class:"top-corner"},null,-1))),Ho=["src"],$o={class:"details"},qo={class:"name"},jo={class:"stats"},Yo={class:"armour"},zo=Go((()=>(0,r._)("img",{src:"icon_armour.png",class:"icon"},null,-1))),Fo={class:"hp"},Wo=Go((()=>(0,r._)("img",{src:"icon_heart.png",class:"icon"},null,-1))),Vo={class:"qi"},Zo=Go((()=>(0,r._)("img",{src:"icon_qi.png",class:"icon"},null,-1))),Ko=Go((()=>(0,r._)("span",{class:"bottom-corner"},null,-1)));var Jo={__name:"UnitProfile",props:{unit:o.Unit,selected:Boolean},setup(e){const t=e,n=()=>!0===t.selected?"selected":"";return(e,o)=>((0,r.wg)(),(0,r.iD)("li",{class:(0,Po.C_)(n())},[Bo,t.unit.profileImg?((0,r.wg)(),(0,r.iD)("img",{key:0,class:"profile",src:t.unit.profileImg},null,8,Ho)):(0,r.kq)("",!0),(0,r._)("span",$o,[(0,r._)("span",qo,(0,Po.zw)(t.unit.name),1),(0,r._)("span",jo,[(0,r._)("span",Yo,(0,Po.zw)(t.unit.armour),1),zo,(0,r._)("span",Fo,(0,Po.zw)(t.unit.hp),1),Wo,(0,r._)("span",Vo,(0,Po.zw)(t.unit.qi),1),Zo])]),Ko],2))}};const Qo=(0,c.Z)(Jo,[["__scopeId","data-v-4b1b6481"]]);var Xo=Qo;const ea={id:"turnStack"};var ta={__name:"TurnStack",setup(e){const t=()=>F(),n=e=>In().name===e.name;return(e,o)=>((0,r.wg)(),(0,r.iD)("ul",ea,[((0,r.wg)(!0),(0,r.iD)(r.HY,null,(0,r.Ko)(t(),((e,t)=>((0,r.wg)(),(0,r.iD)(r.HY,{key:t},[n(e)?((0,r.wg)(),(0,r.j4)(Xo,{key:0,unit:e,selected:!0},null,8,["unit"])):(0,f.SU)(xo)[e.at.y][e.at.x]?((0,r.wg)(),(0,r.j4)(Xo,{key:1,unit:e,selected:!1},null,8,["unit"])):(0,r.kq)("",!0)],64)))),128))]))}};const na=(0,c.Z)(ta,[["__scopeId","data-v-6864ebbc"]]);var oa=na;const aa=e=>((0,r.dD)("data-v-75c8e7bd"),e=e(),(0,r.Cn)(),e),ia=aa((()=>(0,r._)("img",{src:"player_profile.png"},null,-1)));var ra={__name:"ToolTip",props:{target:b,name:String},setup(e){const t=e,n=()=>Pt()&&!Nt()&&Gt().target===t.target&&Gt().targetName===t.name,o=()=>`top: ${Gt().location.top}px; left: ${Gt().location.left}px; width: ${Gt().width??200}px`;return(e,t)=>n()?((0,r.wg)(),(0,r.iD)("div",{key:0,class:"guide",style:(0,Po.j5)(o())},[ia,(0,r._)("span",null,(0,Po.zw)((0,f.SU)(Gt)().text),1),(0,r._)("span",{class:(0,Po.C_)(["arrow",(0,f.SU)(Gt)().direction])},null,2)],4)):(0,r.kq)("",!0)}};const la=(0,c.Z)(ra,[["__scopeId","data-v-75c8e7bd"]]);var sa=la;const ca=["src"];var ua={__name:"ActionButton",props:{action:{type:a.Action,required:!0}},setup(e){const t=e,n=()=>["action",go(t.action)?"selected":"",t.action.corners];return(e,o)=>((0,r.wg)(),(0,r.iD)("span",{class:(0,Po.C_)(n()),onClick:o[0]||(o[0]=()=>(0,f.SU)(mo)(t.action))},[(0,r._)("img",{src:t.action.img},null,8,ca),(0,r.Wm)(sa,{target:"action",name:t.action.label},null,8,["name"])],2))}};const ga=(0,c.Z)(ua,[["__scopeId","data-v-0f1e618d"]]);var da=ga;const fa=e=>((0,r.dD)("data-v-3b930f40"),e=e(),(0,r.Cn)(),e),ma=["onClick"],pa=["src"],ya={class:"quantity"},ha=fa((()=>(0,r._)("h2",null,"Inventory",-1)));var va={__name:"InventoryPanel",setup(e){const t=()=>In()?.inventory.items,n=()=>In()?.inventory&&!In()?.inventory.isEmpty(),o=()=>go(Se)?"selected":"",a=e=>["item",be(e)?"selected":""];return(e,i)=>n()?((0,r.wg)(),(0,r.iD)("div",{key:0,id:"inventory",class:(0,Po.C_)(o())},[((0,r.wg)(!0),(0,r.iD)(r.HY,null,(0,r.Ko)(t(),((e,t)=>((0,r.wg)(),(0,r.iD)("span",{class:(0,Po.C_)(a(e)),key:t,onClick:t=>(0,f.SU)(Oe)(e)},[(0,r._)("img",{src:e.type.img.img.src},null,8,pa),(0,r._)("span",ya,(0,Po.zw)(e.quantity),1),(0,r._)("label",null,(0,Po.zw)(e.type.title),1)],10,ma)))),128)),ha],2)):(0,r.kq)("",!0)}};const xa=(0,c.Z)(va,[["__scopeId","data-v-3b930f40"]]);var _a=xa;const Ia=e=>((0,r.dD)("data-v-76a36a10"),e=e(),(0,r.Cn)(),e),wa={key:0,id:"formations"},Ta=["src"],Sa=["onClick"],ka=["onClick"],ba={key:2},Oa=Ia((()=>(0,r._)("h2",null,"Formations",-1)));var Aa={__name:"FormationsPanel",setup(e){return(e,t)=>(0,f.SU)(X)()?((0,r.wg)(),(0,r.iD)("div",wa,[((0,r.wg)(!0),(0,r.iD)(r.HY,null,(0,r.Ko)((0,f.SU)(ee)(),((e,t)=>((0,r.wg)(),(0,r.iD)("span",{class:"item",key:t},[(0,r.Uk)((0,Po.zw)(e.title)+" ",1),(0,r._)("span",{class:(0,Po.C_)(["image",e.status])},[(0,r._)("img",{src:e.type.img.img.src},null,8,Ta),(0,r._)("span",{class:(0,Po.C_)(["corner","TL",e.corners.TL?.dist>0?"active":""])},(0,Po.zw)(e.corners.TL?.dist),3),(0,r._)("span",{class:(0,Po.C_)(["corner","TR",e.corners.TR?.dist>0?"active":""])},(0,Po.zw)(e.corners.TR?.dist),3),(0,r._)("span",{class:(0,Po.C_)(["corner","BL",e.corners.BL?.dist>0?"active":""])},(0,Po.zw)(e.corners.BL?.dist),3),(0,r._)("span",{class:(0,Po.C_)(["corner","BR",e.corners.BR?.dist>0?"active":""])},(0,Po.zw)(e.corners.BR?.dist),3)],2),e.status===(0,f.SU)(V).IDLE?((0,r.wg)(),(0,r.iD)("button",{key:0,onClick:t=>(0,f.SU)(te)(e.at)},"Activate",8,Sa)):e.status===(0,f.SU)(V).ALIVE?((0,r.wg)(),(0,r.iD)("button",{key:1,onClick:t=>(0,f.SU)(le)(e.at)},"Deactivate",8,ka)):((0,r.wg)(),(0,r.iD)("span",ba,"Broken"))])))),128)),Oa])):(0,r.kq)("",!0)}};const Ea=(0,c.Z)(Aa,[["__scopeId","data-v-76a36a10"]]);var La=Ea;const Na={id:"bottomRight"},Ca={key:0,id:"actions"};var Da={__name:"ActionButtons",setup(e){return(e,t)=>((0,r.wg)(),(0,r.iD)("div",Na,[(0,f.SU)(In)()?((0,r.wg)(),(0,r.iD)("div",Ca,[((0,r.wg)(!0),(0,r.iD)(r.HY,null,(0,r.Ko)((0,f.SU)(yo)(),((e,t)=>((0,r.wg)(),(0,r.j4)(da,{key:t,action:e},null,8,["action"])))),128))])):(0,r.kq)("",!0),(0,r.Wm)(La),(0,r.Wm)(_a)]))}};const Ma=(0,c.Z)(Da,[["__scopeId","data-v-55d81a28"]]);var Ra=Ma;const Ua=e=>((0,r.dD)("data-v-e48b20fc"),e=e(),(0,r.Cn)(),e),Pa={key:0,class:"matte"},Ga={class:"dialog gameOver"},Ba=Ua((()=>(0,r._)("h1",null,"Game Over",-1))),Ha={class:"message"},$a=["src"];var qa={__name:"GameOver",setup(e){return(e,t)=>(0,f.SU)(Ue)()&&!(0,f.SU)(qt)()?((0,r.wg)(),(0,r.iD)("div",Pa,[(0,r._)("div",Ga,[Ba,(0,r._)("span",Ha,(0,Po.zw)((0,f.SU)(De)()),1),(0,r._)("img",{src:(0,f.SU)(Me)()},null,8,$a)])])):(0,r.kq)("",!0)}};const ja=(0,c.Z)(qa,[["__scopeId","data-v-e48b20fc"]]);var Ya=ja;const za={class:"matte"};function Fa(e,t){return(0,r.wg)(),(0,r.iD)("div",za,[(0,r.WI)(e.$slots,"default")])}const Wa={},Va=(0,c.Z)(Wa,[["render",Fa]]);var Za=Va;const Ka={class:"action modal"},Ja=(0,r._)("span",{class:"top-corner"},null,-1),Qa=(0,r._)("span",{class:"bottom-corner"},null,-1);var Xa={__name:"BaseModal",setup(e){return(e,t)=>((0,r.wg)(),(0,r.j4)(Za,null,{default:(0,r.w5)((()=>[(0,r._)("div",Ka,[Ja,(0,r.WI)(e.$slots,"default"),Qa])])),_:3}))}};const ei=Xa;var ti=ei;const ni=(0,f.iH)(!1),oi=(0,f.iH)(null);let ai=null;const ii=()=>ni.value,ri=()=>oi.value?.inputs,li=()=>oi.value?.title(),si=()=>{ni.value=!1,oi.value&&ai&&oi.value.onSubmit(ai,oi.value.inputs)},ci=()=>{ni.value=!1},ui=["onUpdate:modelValue","placeholder"];var gi={__name:"ActionModal",setup(e){return(e,t)=>(0,f.SU)(ii)()?((0,r.wg)(),(0,r.j4)(ti,{key:0},{default:(0,r.w5)((()=>[(0,r._)("h1",null,(0,Po.zw)((0,f.SU)(li)()),1),((0,r.wg)(!0),(0,r.iD)(r.HY,null,(0,r.Ko)((0,f.SU)(ri)(),((e,t)=>((0,r.wg)(),(0,r.iD)("fieldset",{key:t},[(0,r._)("label",null,(0,Po.zw)(e.title),1),(0,r.wy)((0,r._)("input",{type:"text","onUpdate:modelValue":t=>e.value=t,placeholder:e.name},null,8,ui),[[i.nr,e.value]])])))),128)),(0,r._)("button",{onClick:t[0]||(t[0]=(...e)=>(0,f.SU)(si)&&(0,f.SU)(si)(...e))},"Confirm"),(0,r._)("button",{onClick:t[1]||(t[1]=(...e)=>(0,f.SU)(ci)&&(0,f.SU)(ci)(...e))},"Cancel")])),_:1})):(0,r.kq)("",!0)}};const di=gi;var fi=di;const mi={id:"levelCanvas"};var pi={__name:"LevelCanvas",setup(e){const t=()=>!0===bn.value?"mouseHover":"";return(e,n)=>((0,r.wg)(),(0,r.iD)("div",mi,[(0,r._)("canvas",{id:"myCanvas",class:(0,Po.C_)(t()),onClick:n[0]||(n[0]=(...e)=>(0,f.SU)(Cn)&&(0,f.SU)(Cn)(...e)),onKeyup:[n[1]||(n[1]=(0,i.D2)(((...e)=>(0,f.SU)(lo)&&(0,f.SU)(lo)(...e)),["down"])),n[2]||(n[2]=(0,i.D2)(((...e)=>(0,f.SU)(ro)&&(0,f.SU)(ro)(...e)),["up"])),n[3]||(n[3]=(0,i.D2)(((...e)=>(0,f.SU)(io)&&(0,f.SU)(io)(...e)),["left"])),n[4]||(n[4]=(0,i.D2)(((...e)=>(0,f.SU)(ao)&&(0,f.SU)(ao)(...e)),["right"]))]},null,34),(0,r.Wm)(sa,{target:"canvas",name:"canvas"})]))}};const yi=(0,c.Z)(pi,[["__scopeId","data-v-4b233009"]]);var hi=yi;const vi=e=>((0,r.dD)("data-v-4a48c0b9"),e=e(),(0,r.Cn)(),e),xi={class:"battleModal"},_i=vi((()=>(0,r._)("h1",null,"Battle",-1))),Ii={class:"scene"},wi={key:0,class:"side left"},Ti=["src"],Si=["src"],ki={key:0,class:"damage"};var bi={__name:"BattleModal",setup(e){return(e,t)=>(0,f.SU)(qt)()?((0,r.wg)(),(0,r.j4)(ti,{key:0},{default:(0,r.w5)((()=>[(0,r._)("div",xi,[_i,(0,r._)("div",Ii,[(0,f.SU)(Yt)()?((0,r.wg)(),(0,r.iD)("div",wi,[(0,r._)("img",{src:(0,f.SU)(Vt)(),style:(0,Po.j5)((0,f.SU)(Kt))},null,12,Ti)])):(0,r.kq)("",!0),(0,r._)("div",{class:"side right",style:(0,Po.j5)((0,f.SU)(Qt))},[(0,r._)("img",{src:(0,f.SU)(Wt)(),style:(0,Po.j5)((0,f.SU)(Jt))},null,12,Si),(0,f.SU)(Xt)?((0,r.wg)(),(0,r.iD)("span",ki,(0,Po.zw)((0,f.SU)(Xt)),1)):(0,r.kq)("",!0)],4)])])])),_:1})):(0,r.kq)("",!0)}};const Oi=(0,c.Z)(bi,[["__scopeId","data-v-4a48c0b9"]]);var Ai=Oi,Ei={__name:"LevelContainer",setup(e){return(0,r.bv)((()=>{v(),mn(),Io(),L(Xe,{x:1,y:1}),L(Xe,{x:5,y:6}),L(Xe,{x:3,y:1}),Sn(),Gn(),Ot()})),document.addEventListener("keydown",(e=>{switch(e.key){case"ArrowUp":return void ro();case"ArrowDown":return void lo();case"ArrowLeft":return void io();case"ArrowRight":return void ao()}}),!1),(e,t)=>((0,r.wg)(),(0,r.iD)(r.HY,null,[(0,r.Wm)(hi),(0,r.Wm)(d,null,{default:(0,r.w5)((()=>[(0,r.Wm)(oa),(0,r.Wm)(Ra)])),_:1}),(0,r.Wm)(fi),(0,r.Wm)(Ai),(0,r.Wm)(Ya)],64))}};const Li=Ei;var Ni=Li;const Ci={class:"dialog"},Di={class:"image"},Mi=["src"],Ri={class:"text"},Ui={class:"name"},Pi={class:"speech"};var Gi={__name:"DialogModal",setup(e){const t=()=>{Dt()};return(e,n)=>(0,f.SU)(Nt)()?((0,r.wg)(),(0,r.j4)(Za,{key:0,onClick:t},{default:(0,r.w5)((()=>[(0,r._)("div",Ci,[(0,r._)("span",Di,[(0,r._)("img",{src:(0,f.SU)(Ct)().profileImg},null,8,Mi)]),(0,r._)("span",Ri,[(0,r._)("span",Ui,(0,Po.zw)((0,f.SU)(Ct)().name),1),(0,r._)("span",Pi,(0,Po.zw)((0,f.SU)(Ct)().speech),1)])])])),_:1})):(0,r.kq)("",!0)}};const Bi=Gi;var Hi=Bi,$i={__name:"App",setup(e){return(e,t)=>((0,r.wg)(),(0,r.iD)(r.HY,null,[(0,r.Wm)(Ni),(0,r.Wm)(Hi)],64))}};const qi=$i;var ji=qi;(0,i.ri)(ji).mount("#app")}},t={};function n(o){var a=t[o];if(void 0!==a)return a.exports;var i=t[o]={exports:{}};return e[o].call(i.exports,i,i.exports,n),i.exports}n.m=e,function(){var e=[];n.O=function(t,o,a,i){if(!o){var r=1/0;for(u=0;u<e.length;u++){o=e[u][0],a=e[u][1],i=e[u][2];for(var l=!0,s=0;s<o.length;s++)(!1&i||r>=i)&&Object.keys(n.O).every((function(e){return n.O[e](o[s])}))?o.splice(s--,1):(l=!1,i<r&&(r=i));if(l){e.splice(u--,1);var c=a();void 0!==c&&(t=c)}}return t}i=i||0;for(var u=e.length;u>0&&e[u-1][2]>i;u--)e[u]=e[u-1];e[u]=[o,a,i]}}(),function(){n.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return n.d(t,{a:t}),t}}(),function(){n.d=function(e,t){for(var o in t)n.o(t,o)&&!n.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:t[o]})}}(),function(){n.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){n.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}}(),function(){var e={143:0};n.O.j=function(t){return 0===e[t]};var t=function(t,o){var a,i,r=o[0],l=o[1],s=o[2],c=0;if(r.some((function(t){return 0!==e[t]}))){for(a in l)n.o(l,a)&&(n.m[a]=l[a]);if(s)var u=s(n)}for(t&&t(o);c<r.length;c++)i=r[c],n.o(e,i)&&e[i]&&e[i][0](),e[i]=0;return n.O(u)},o=self["webpackChunkrpggame"]=self["webpackChunkrpggame"]||[];o.forEach(t.bind(null,0)),o.push=t.bind(null,o.push.bind(o))}();var o=n.O(void 0,[998],(function(){return n(5247)}));o=n.O(o)})();
//# sourceMappingURL=app.f420ec51.js.map