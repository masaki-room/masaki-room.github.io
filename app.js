/* =========================================================
   更新はここだけ（本番では「かんたん更新ページ」から変更できます）
   ========================================================= */
const SITE = {
  name: "真咲",
  catch: "",
  catch2: "",
  ctaText: "配信を見にいく",
  season: "winter",           // "none" / "winter"(雪) ※季節・イベント装飾の切り替え
  watchUrl: "https://www.mirrativ.com/user/158657695",
  news: [
    ["2026.11.25", "INFO", "公式サイトを公開しました。"],
    ["2026.11.25", "INFO", "歌える曲リストとリクエスト機能を追加しました。"]
  ],
  // 配信予定は「HP更新ページ」から追加します（{d:"2026-11-29",t:"22:00〜",ti:"歌枠",p:"Mirrativ"}）
  schedule: [],
  scheduleNote: "※予定は変更になることがあります。最新情報はXでお知らせします。",
  songsUrl: "https://utalis.github.io/u/masaki06-utamita",
  songs: [ // リクエスト欄の候補（※サンプル。本番は歌える曲リストに合わせて差し替え）
    ["サンプル曲 1","アーティスト名","J-POP"],
    ["サンプル曲 2","アーティスト名","ボカロ"],
    ["サンプル曲 3","アーティスト名","アニソン"]
  ],
  links: [
    ["X", "@masaki_0624513", "https://x.com/masaki_0624513"],
    ["YouTube", "チャンネル", "https://www.youtube.com/channel/UCgAyIApoO42E0QedKv5QtaA"],
    ["Mirrativ", "配信ページ", "https://www.mirrativ.com/user/158657695"],
    ["歌える曲リスト", "歌える曲の一覧・リクエスト", "songs.html"]
  ],
  profile: [
    ["名前・読み方", "真咲（まさき）"],
    ["誕生日", "9/12"],
    ["性格", "クール、低音女子"],
    ["趣味・特技", "歌（カラオケ）、ダンス、イラスト"],
    ["活動内容", "歌枠（メイン）、ゲーム配信"],
    ["イメージカラー", "紫"],
    ["ファンネーム", "まさリス"],
    ["好きなもの", "寿司、唐揚げ、チャーハン"],
    ["推し歌い手", "いれいす 様"],
    ["一言メッセージ", "真咲として新たにスタートした私を、応援しにきてくれると助かります！"]
  ]
};
const PAGES=[["index.html","HOME","トップ"],["profile.html","PROFILE","プロフィール"],["schedule.html","SCHEDULE","配信予定"],["songs.html","SONGS","歌える曲"],["omikuji.html","OMIKUJI","おみくじ・スタンプ"],["links.html","LINKS","リンク"]];
const FORTUNES = [
  {r:"大吉", m:"今夜は想いがまっすぐ届く日。\n気になることに踏み出して。", l:"ラッキー：紫の光"},
  {r:"吉",   m:"静かな夜に、いい流れがやってくる。\nゆっくり歩けば大丈夫。", l:"ラッキー：蝶のモチーフ"},
  {r:"中吉", m:"小さな楽しみが重なる一日。\n好きな曲を聴いて整えて。", l:"ラッキー：音符"},
  {r:"小吉", m:"焦らなければ、ちゃんと追いつく。\n深呼吸をひとつ。", l:"ラッキー：夜空の散歩"},
  {r:"末吉", m:"控えめがちょうどいい日。\n夜ふかしは、ほどほどに。", l:"ラッキー：温かい飲み物"},
  {r:"凶",   m:"今日は休むのも作戦。\n明日の自分にバトンを渡そう。", l:"ラッキー：早めのおやすみ"}
];
const FW=[18,28,22,18,10,4];

/* ===== helpers ===== */
const $=s=>document.querySelector(s);
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const ls={get(k,d){try{const v=localStorage.getItem(k);return v?JSON.parse(v):d}catch(e){return d}},set(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}};
const today=()=>{const d=new Date();return d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0")};
function toast(t){const e=$("#toast");if(!e)return;e.textContent=t;e.classList.add("show");clearTimeout(toast.t);toast.t=setTimeout(()=>e.classList.remove("show"),2400)}
const cur=(location.pathname.split("/").pop()||"index.html");

/* ===== shared chrome ===== */
(function(){
  document.body.insertAdjacentHTML("afterbegin",
   `<canvas id="stars"></canvas><div id="fx"></div>
    <nav><a class="logo" href="index.html"><img src="img/logo.png" alt="真咲 MASAKI OFFICIAL"></a>
      <ul>${PAGES.slice(1).map(p=>`<li><a href="${p[0]}" class="${p[0]===cur?'cur':''}">${p[1]}</a></li>`).join("")}</ul>
      <button class="burger" id="burger" aria-label="menu"><i></i></button></nav>
    <div class="mmenu" id="mmenu"><button class="mclose" id="mclose" aria-label="閉じる"><i></i></button>${PAGES.map(p=>`<a href="${p[0]}">${p[1]}<small>${p[2]}</small></a>`).join("")}</div>
    <div class="toast" id="toast"></div>`);
  const mm=()=>{$("#burger").classList.remove("open");$("#mmenu").classList.remove("open")};
  $("#burger").onclick=()=>{$("#burger").classList.toggle("open");$("#mmenu").classList.toggle("open")};
  $("#mclose").onclick=mm;$("#mmenu").addEventListener("click",e=>{if(e.target.id==="mmenu"||e.target.closest("a"))mm()});
  addEventListener("keydown",e=>{if(e.key==="Escape")mm()});
  document.body.insertAdjacentHTML("beforeend",`<footer><div>© 2026 MASAKI. All Rights Reserved.</div><details class="credits"><summary>CREDITS</summary><div class="credit">Site by イロハミント（湊音ヒロ）</div><div class="credit">素材：蝶のイラスト／チコデザ</div><div class="credit">歌える曲リスト：UTAEMO</div></details></footer>`);
})();

/* ===== opening (premium v3) ===== */
(function(){
  if(cur!=="index.html"&&cur!=="")return;
  let seen=false;try{seen=sessionStorage.getItem("mk_op")}catch(e){}
  if(seen)return;
  document.body.classList.add("op-wait");
  const o=document.createElement("div");o.id="op3";
  o.innerHTML=`<i class="c c1"><b class="sk"></b></i><i class="c c2"><b class="sk"></b></i><i class="flash"></i>
  <div class="oc"><div class="olg"><img src="img/logo.png" alt=""></div>
  <div class="onum"><b id="opn">000</b><span>%</span></div><div class="obar"><i id="opb"></i></div>
  <div class="otap">TAP TO ENTER</div></div><div class="ocorner tl"></div><div class="ocorner br"></div>`;
  document.body.appendChild(o);document.body.style.overflow="hidden";
  const n=$("#opn"),bar=$("#opb"),lg=o.querySelector(".olg img");
  let done=false,t0=performance.now(),D=2600,ready=false;
  const ease=t=>t<.5?2*t*t:1-Math.pow(-2*t+2,2)/2;
  (function step(now){const p=Math.min((now-t0)/D,1),v=Math.round(ease(p)*100);n.textContent=String(v).padStart(3,"0");bar.style.width=v+"%";o.style.setProperty("--p",(v/100).toFixed(3));lg.style.clipPath=`inset(0 ${100-v}% 0 0)`;
    if(p<1)requestAnimationFrame(step);else{ready=true;o.classList.add("ready")}})(t0);
  const close=()=>{if(done||!ready)return;done=true;o.classList.add("open");
    for(let i=0;i<18;i++){const bt=i%3!==2,e=document.createElement(bt?"img":"span");if(bt)e.src="img/butterfly.webp";else e.textContent=i%2?"♪":"♫";e.className="bf";
      const ang=Math.random()*Math.PI*2,r=Math.min(innerWidth,innerHeight)*(.3+Math.random()*.55);
      e.style.cssText=`--s:${bt?20+Math.random()*30:18+Math.random()*16}px;--x:${Math.cos(ang)*r*1.1}px;--y:${Math.sin(ang)*r*1.2-30}px;--r:${(Math.random()-.5)*160}deg;--d:${(Math.random()*.25).toFixed(2)}s`;o.appendChild(e)}try{sessionStorage.setItem("mk_op","1")}catch(e){}
    setTimeout(()=>{document.body.classList.remove("op-wait");document.body.style.overflow=""},650);setTimeout(()=>o.remove(),2600)};
  o.addEventListener("click",close);
  setTimeout(()=>{ready=true;close()},9000);
})();

/* ===== page parts ===== */
const H=(sel,html)=>{const e=$(sel);if(e)e.innerHTML=html};
if($("#h-name")){$("#h-name").textContent=SITE.name;{const L=$(".hero .lead");if(SITE.catch||SITE.catch2)L.innerHTML=esc(SITE.catch)+"<br>"+esc(SITE.catch2);else L.remove()}const a=$("#h-cta");a.href=SITE.watchUrl;a.target="_blank";a.rel="noopener";a.textContent=SITE.ctaText}
const en=["MON","TUE","WED","THU","FRI","SAT","SUN"];
const ymd=d=>d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0");
function weekDays(){const now=new Date(),dow=(now.getDay()+6)%7;const mon=new Date(now);mon.setDate(now.getDate()-dow);mon.setHours(0,0,0,0);const out=[];for(let i=0;i<7;i++){const d=new Date(mon);d.setDate(mon.getDate()+i);const k=ymd(d);out.push({d,i,list:(SITE.schedule||[]).filter(x=>x.d===k).sort((p,q)=>String(p.t).localeCompare(String(q.t))),isToday:i===dow,past:i<dow})}return out}
function renderDyn(){
  const news=(SITE.news||[]).slice().sort((x,y)=>String(y[0]).localeCompare(String(x[0])));
  H("#newsList",news.length?news.map(n=>`<li><time>${esc(n[0])}</time><span class="tag">${esc(n[1])}</span><span>${esc(n[2])}</span></li>`).join(""):"<li><span>お知らせはまだありません。</span></li>");
  H("#week",weekDays().map(({d,i,list,isToday})=>`<div class="day ${isToday?'today':''} ${list.length?'':'off'}"><div class="d">${d.getMonth()+1}/${d.getDate()}<small>${en[i]}</small></div><div class="t">${list.length?list.map(s=>`<b>${esc(s.ti)}</b><span>${esc(s.t)} ／ ${esc(s.p)}</span>`).join(""):`<span>予定なし</span>`}</div><div>${isToday&&list.length?'<span class="badge live">TODAY</span>':list.length?'<span class="badge">LIVE</span>':''}</div></div>`).join(""));
  if($("#weekRange")){const w=weekDays();const a=w[0].d,b=w[6].d;$("#weekRange").innerHTML=`<b>${a.getMonth()+1}/${a.getDate()}</b> — <b>${b.getMonth()+1}/${b.getDate()}</b>`}
  if($("#weekNote"))$("#weekNote").textContent=SITE.scheduleNote;
  if($("#nextLive")){const t=ymd(new Date());const up=(SITE.schedule||[]).filter(x=>x.d>=t).sort((p,q)=>(p.d+p.t).localeCompare(q.d+q.t))[0];
    if(up){const d=new Date(up.d+"T00:00:00");$("#nextLive").innerHTML=`<div class="big"><small>NEXT LIVE</small>${d.getMonth()+1}/${d.getDate()} ${en[(d.getDay()+6)%7]} ${esc(up.t)}</div><div>${esc(up.ti)}<br><span style="opacity:.7;font-size:13px">${esc(up.p)}</span></div><a class="cta sm" href="${esc(SITE.watchUrl)}" target="_blank" rel="noopener">配信へ</a>`}
    else $("#nextLive").innerHTML=`<div>配信予定は決まり次第お知らせします。Xもチェックしてね。</div>`}
  H("#p-dl",SITE.profile.map(i=>`<div class="row"><dt>${esc(i[0])}</dt><dd>${esc(i[1])}</dd></div>`).join(""));
  if(SITE.photo){const im=document.querySelector(".pcard img");if(im)im.src=SITE.photo}
}
renderDyn();
/* ===== 「HP更新ページ」で保存した内容を読み込む（Supabase・公開読み取り） ===== */
const SB_URL="https://uglxilcwbgqoofnzngux.supabase.co/rest/v1/rpc/",SB_KEY="sb_publishable_R83zSq90hslRd5jl04sIPg_hZlLxfRC";
function sbCall(fn,args){return fetch(SB_URL+fn,{method:"POST",headers:{apikey:SB_KEY,"Content-Type":"application/json"},body:JSON.stringify(args||{})}).then(r=>{if(!r.ok)throw new Error(fn);return r.json()})}
function applyPub(j){if(!j||typeof j!=="object")return;
  if(Array.isArray(j.news))SITE.news=j.news;
  if(Array.isArray(j.schedule))SITE.schedule=j.schedule;
  if(typeof j.schedule_note==="string"&&j.schedule_note)SITE.scheduleNote=j.schedule_note;
  if(Array.isArray(j.profile)&&j.profile.length)SITE.profile=j.profile;
  if(typeof j.photo==="string"&&j.photo.startsWith("data:image/"))SITE.photo=j.photo;
  renderDyn()}
(function(){let c=null;try{c=JSON.parse(localStorage.getItem("mk_pub")||"null")}catch(e){}applyPub(c);
  sbCall("masaki_public").then(j=>{try{localStorage.setItem("mk_pub",JSON.stringify(j))}catch(e){}applyPub(j)}).catch(()=>{})})();
H("#linkList",SITE.links.map(l=>`<a class="lk-card" href="${esc(l[2])}"${/^https?:/.test(l[2])?' target="_blank" rel="noopener"':""}><b>${esc(l[0])}</b><span>${esc(l[1])}</span></a>`).join(""));
document.querySelectorAll(".songsLink").forEach(a=>{a.href=SITE.songsUrl;a.target="_blank";a.rel="noopener"});
/* song list (UTAEMO data, native) */
function songRow(c){c=(c||"").normalize("NFD")[0]||"";const R=[["あ","あいうえお"],["か","かきくけこ"],["さ","さしすせそ"],["た","たちつてと"],["な","なにぬねの"],["は","はひふへほ"],["ま","まみむめも"],["や","やゆよ"],["ら","らりるれろ"],["わ","わをん"]];for(const r of R)if(r[1].includes(c))return r[0];return "他"}
const MARK={favorite:"FAVORITE",learning:"練習中",ohako:"十八番",signature:"十八番"};
function initSongs(D){
  const songs=D.songs.slice().sort((x,y)=>x.y.localeCompare(y.y,"ja")||x.ty.localeCompare(y.ty,"ja"));
  SITE.songs=songs.map(s=>[s.t,s.a,""]);if(window.fillReqSongs)fillReqSongs();
  if($("#slL")){
    let row="全",q="",mode="all";
    const arts=new Set(songs.map(s=>s.a));
    $("#slN").textContent=songs.length;$("#slA").textContent=arts.size;
    $("#slU").textContent="UPDATED "+String(D.updatedAt).slice(0,10).replace(/-/g,".");
    const rk=s=>songRow(mode==="t"?s.ty:s.y);
    const buildChips=()=>{
      const rows=["全",...["あ","か","さ","た","な","は","ま","や","ら","わ","他"].filter(r=>songs.some(s=>rk(s)===r))];
      if(!rows.includes(row))row="全";
      $("#slC").innerHTML=rows.map(r=>`<button type="button" data-r="${r}" class="${r===row?"on":""}">${r==="全"?"ALL":r}</button>`).join("")};
    buildChips();
    const draw=(only)=>{
      let L=songs.filter(s=>(row==="全"||rk(s)===row)&&(!q||(mode==="t"?s.t+s.ty:mode==="a"?s.a+s.y:s.t+s.a+s.ty+s.y).toLowerCase().includes(q)));
      if(only)L=[only];
      const x=$("#slX");if(x)x.hidden=!only;
      const g={};L.forEach(s=>(g[s.a]=g[s.a]||[]).push(s));
      $("#slL").innerHTML=L.length?Object.keys(g).map(a=>`<li class="sl-art"><div class="sl-an">${esc(a)}<small>${g[a].length}曲</small></div>${g[a].map(s=>`<div class="sl-song"><span>${esc(s.t)}</span>${s.m?`<em class="mk-${s.m}">${MARK[s.m]||""}</em>`:""}<button type="button" class="sl-cm" data-t="${esc(s.t)}" data-a="${esc(s.a)}" aria-label="コメント用にコピー">コメント用コピー</button></div>`).join("")}</li>`).join(""):`<li class="sl-none">見つかりませんでした。リクエスト欄からどうぞ。</li>`;
    };
    if(!$("#slX")){const x=document.createElement("div");x.id="slX";x.hidden=true;x.innerHTML='<span>RANDOM PICK</span><button type="button">解除して一覧に戻る ✕</button>';$("#slL").before(x);x.querySelector("button").addEventListener("click",()=>draw())}
    $("#slC").addEventListener("click",e=>{const b=e.target.closest("button");if(!b)return;row=b.dataset.r;[...$("#slC").children].forEach(x=>x.classList.toggle("on",x===b));draw()});
    $("#slQ").addEventListener("input",e=>{q=e.target.value.trim().toLowerCase();draw()});
    $("#slR").addEventListener("click",()=>{const base=songs.filter(s=>(row==="全"||rk(s)===row));if(base.length){draw(base[Math.floor(Math.random()*base.length)])}});
    $("#slL").addEventListener("click",e=>{const b=e.target.closest(".sl-cm");if(!b)return;
      const txt="【リクエスト】"+b.dataset.t+"／"+b.dataset.a;
      const ok=()=>{const o=b.textContent;b.textContent="コピー済み ✓";b.classList.add("done");setTimeout(()=>{b.textContent=o;b.classList.remove("done")},1800)};
      const fb=()=>{const t=document.createElement("textarea");t.value=txt;t.style.cssText="position:fixed;opacity:0";document.body.appendChild(t);t.select();try{document.execCommand("copy")}catch(_){}t.remove();ok()};
      (navigator.clipboard&&navigator.clipboard.writeText?navigator.clipboard.writeText(txt).then(ok,fb):fb())});
    $("#slM").addEventListener("click",e=>{const b=e.target.closest("button");if(!b)return;mode=b.dataset.k;[...$("#slM").querySelectorAll("button")].forEach(x=>x.classList.toggle("on",x===b));buildChips();$("#slQ").placeholder=mode==="t"?"曲名で探す":mode==="a"?"アーティストで探す":"曲名・アーティストで探す";draw()});
    draw();
  }
}
/* UTAEMO「HPに反映する」連携（あんて｡HPと同じ方式）: 公開・読み取り専用フィード。失敗時は songs-data.js を表示 */
const UT_FEED="https://utaeru-api.manabit.workers.dev/api/hp/masaki-hp/songs",UT_KEY="mk_utaemo";
function utMap(j){
  if(!j||j.schemaVersion!==1||!Array.isArray(j.songs))return null;
  const P=["signature","favorite","learning"];
  const songs=j.songs.filter(x=>x&&typeof x.t==="string"&&x.t).map(x=>({t:x.t,a:x.a||"",y:x.y||x.a||"",ty:x.ty||x.t,m:(Array.isArray(x.m)&&P.find(k=>x.m.includes(k)))||""}));
  return {updatedAt:String(j.publishedAt||"").slice(0,10)||(window.SONGDATA||{}).updatedAt,credit:(window.SONGDATA||{}).credit,songs};
}
function startSongs(){
  const fallback=()=>{let c=null;try{c=utMap(JSON.parse(localStorage.getItem(UT_KEY)||"null"))}catch(e){}return c||window.SONGDATA};
  if(!$("#slL")){if(window.SONGDATA)initSongs(window.SONGDATA);return}
  const ctl=window.AbortController?new AbortController():null,tm=ctl?setTimeout(()=>ctl.abort(),8000):0;
  fetch(UT_FEED,{cache:"no-cache",credentials:"omit",signal:ctl?ctl.signal:undefined}).then(r=>{clearTimeout(tm);
    if(r.status===404){try{localStorage.removeItem(UT_KEY)}catch(e){}return null}
    if(!r.ok)throw 0;return r.json()}).then(j=>{
    if(j===null)return window.SONGDATA;
    const m=utMap(j);if(!m)throw 0;try{localStorage.setItem(UT_KEY,JSON.stringify(j))}catch(e){}return m
  }).catch(()=>{clearTimeout(tm);return fallback()}).then(D=>{if(D)initSongs(D)});
}
startSongs();

/* request */
if($("#reqForm")){
  window.fillReqSongs=()=>{$("#rSong").innerHTML=`<option value="" disabled selected>曲を選ぶ</option>`+SITE.songs.map((s,i)=>`<option value="${i}">${esc(s[0])} / ${esc(s[1])}</option>`).join("")+`<option value="other">リストにない曲（ひとことに記入）</option>`};fillReqSongs();
  const renderSent=()=>{const l=ls.get("mk_req",[]);$("#sent").innerHTML=l.slice(-3).reverse().map(r=>`<li>♪ ${esc(r.song)} <span style="opacity:.6">— ${esc(r.name)}</span></li>`).join("")};
  $("#reqForm").addEventListener("submit",e=>{e.preventDefault();const f=e.target,btn=f.querySelector("button[type=submit]");const v=$("#rSong").value,song=v==="other"?"（リスト外）":SITE.songs[v][0]+" / "+SITE.songs[v][1];
    const name=$("#rName").value.trim(),msg=$("#rMsg").value.trim();if(btn)btn.disabled=true;
    sbCall("masaki_req_add",{n:name,s:song,m:msg}).then(()=>{const l=ls.get("mk_req",[]);l.push({name,song:song.split(" / ")[0],at:Date.now()});ls.set("mk_req",l);f.reset();renderSent();toast("リクエストを送りました")}).catch(()=>toast("送信できませんでした。少し待ってもう一度どうぞ")).finally(()=>{if(btn)btn.disabled=false})});
  renderSent();
}

/* omikuji + stamp */
function pick(){let t=FW.reduce((a,b)=>a+b),r=Math.random()*t;for(let i=0;i<FW.length;i++){if((r-=FW[i])<0)return FORTUNES[i]}return FORTUNES[1]}
const N=10;
function renderStamps(){
  if(!$("#stamps"))return;
  const st=ls.get("mk_stamp",{days:[],done:0});const c=st.days.length;
  let h="";for(let i=0;i<N;i++)h+=i<c?`<div class="st on"><img src="img/butterfly.webp" alt=""></div>`:`<div class="st">${i+1}</div>`;
  $("#stamps").innerHTML=h;
  $("#stInfo").innerHTML=c>=N?`<b>COMPLETE!</b> コンプリートおめでとう。配信中に画面を見せてね。`:`あと <b>${N-c}</b> 個でコンプリート${st.done?`（達成 ${st.done} 回）`:""}`;
  const done=st.days.includes(today());const b=$("#stampBtn");b.disabled=done;b.style.opacity=done?.5:1;b.textContent=done?"今日はもう押しました":"今日のスタンプを押す";
}
function stampDay(auto){const st=ls.get("mk_stamp",{days:[],done:0});if(st.days.includes(today()))return;if(st.days.length>=N){st.days=[];st.done=(st.done||0)+1}st.days.push(today());ls.set("mk_stamp",st);renderStamps();toast(auto?"おみくじのお礼に、スタンプを1つ押しました":"スタンプを押しました")}
if($("#draw")){
  const show=f=>{$("#slip").innerHTML=`<div class="r">${f.r}</div><div class="m">${esc(f.m).replace(/\n/g,"<br>")}</div><div class="lk">${esc(f.l)}</div>`};
  const lock=()=>{$("#draw").textContent="今日はもう引きました";$("#draw").disabled=true;$("#draw").style.opacity=.5};
  const s=ls.get("mk_omi",null);if(s&&s.d===today()){show(s.f);lock()}
  $("#draw").onclick=()=>{const s=ls.get("mk_omi",null);if(s&&s.d===today())return;const f=pick();ls.set("mk_omi",{d:today(),f});show(f);lock();stampDay(true)};
  $("#stampBtn").onclick=()=>stampDay(false);
  renderStamps();
}

/* reveal */
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target)}}),{threshold:.1});
document.querySelectorAll(".reveal").forEach(el=>io.observe(el));

/* stars */
(function(){
  const cv=$("#stars"),cx=cv.getContext("2d");let W,H,stars=[],sh=null;
  function size(){const r=devicePixelRatio||1;W=cv.width=innerWidth*r;H=cv.height=innerHeight*r;stars=[];const n=Math.round(innerWidth*innerHeight/5500);for(let i=0;i<n;i++)stars.push({x:Math.random()*W,y:Math.random()*H,r:(Math.random()*1.2+.3)*r,p:Math.random()*6.28,s:Math.random()*.02+.005,c:Math.random()<.25?"167,126,232":"217,200,245"})}
  size();addEventListener("resize",size);
  const reduce=matchMedia("(prefers-reduced-motion:reduce)").matches;
  (function loop(){cx.clearRect(0,0,W,H);for(const s of stars){s.p+=s.s;cx.fillStyle=`rgba(${s.c},${.35+.65*Math.abs(Math.sin(s.p))})`;cx.beginPath();cx.arc(s.x,s.y,s.r,0,6.283);cx.fill()}
    if(!reduce){if(!sh&&Math.random()<.003){const r=devicePixelRatio||1;sh={x:Math.random()*W*.8+W*.2,y:Math.random()*H*.3,l:0,v:12*r}}
      if(sh){const g=cx.createLinearGradient(sh.x,sh.y,sh.x+sh.l,sh.y-sh.l*.5);g.addColorStop(0,"rgba(255,255,255,.9)");g.addColorStop(1,"rgba(167,126,232,0)");cx.strokeStyle=g;cx.lineWidth=1.6;cx.beginPath();cx.moveTo(sh.x,sh.y);cx.lineTo(sh.x+sh.l,sh.y-sh.l*.5);cx.stroke();sh.x-=sh.v;sh.y+=sh.v*.5;sh.l=Math.min(sh.l+6,140);if(sh.x<-200||sh.y>H)sh=null}}
    requestAnimationFrame(loop)})();
})();

/* butterflies, notes, season */
(function(){
  const fx=$("#fx");
  const bfs=[{t:"12%",s:36,dx:34,dy:6,dl:0},{t:"38%",s:24,dx:44,dy:8,dl:-14},{t:"62%",s:30,dx:38,dy:7,dl:-26},{t:"80%",s:20,dx:52,dy:9,dl:-8}];
  fx.innerHTML=bfs.map(b=>`<div class="bf" style="top:${b.t};--s:${b.s}px;--dx:${b.dx}s;--dy:${b.dy}s;--dl:${b.dl}s"><div class="in"><img src="img/butterfly.webp" alt=""></div></div>`).join("");
  const sym=["♪","♫","♩","♬"];let h="";
  for(let i=0;i<9;i++)h+=`<span class="nt" style="left:${Math.round(Math.random()*95)}%;--s:${16+Math.round(Math.random()*16)}px;--du:${12+Math.round(Math.random()*10)}s;--dl:${-Math.round(Math.random()*20)}s">${sym[i%4]}</span>`;
  if(SITE.season==="winter")for(let i=0;i<22;i++)h+=`<span class="snow" style="left:${Math.round(Math.random()*100)}%;--s:${8+Math.round(Math.random()*10)}px;--du:${9+Math.round(Math.random()*9)}s;--dl:${-Math.round(Math.random()*18)}s">${i%3?"•":"❄"}</span>`;
  fx.insertAdjacentHTML("beforeend",h);
})();
if($("#watch2")){const a=$("#watch2");a.href=SITE.watchUrl;a.target="_blank";a.rel="noopener"}

/* ===== v3: glitch / mode / cursor ===== */
(function(){
  const $=(s,r=document)=>r.querySelector(s);
  // mono mode
  try{if(localStorage.getItem("mk_mono")==="1")document.body.classList.add("mono")}catch(e){}
  const mb=document.createElement("button");mb.className="modebtn";
  const lab=()=>{mb.textContent=document.body.classList.contains("mono")?"MODE : MONO":"MODE : VIOLET";};
  mb.addEventListener("click",()=>{document.body.classList.toggle("mono");try{localStorage.setItem("mk_mono",document.body.classList.contains("mono")?"1":"0")}catch(e){};lab()});
  document.body.appendChild(mb);lab();
  function kick(){}
  // cursor glow
  const cg=document.createElement("div");cg.id="cg";document.body.appendChild(cg);
  addEventListener("pointermove",e=>{cg.style.transform=`translate(${e.clientX}px,${e.clientY}px)`});
})();
