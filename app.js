/* Bouman Exam Lab - simple static app (no build step). */
(function(){
  const DB = window.EXAMDB || {};
  const courseOrder = ["ece637","ece641","ece60146"];
  const $ = (id)=>document.getElementById(id);
  let state = {course:null, exam:null, view:"topics"};

  function esc(s){return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");}

  function renderMath(root){
    if (!window.renderMathInElement) { setTimeout(()=>renderMath(root), 120); return; }
    renderMathInElement(root, {
      delimiters:[{left:"$$",right:"$$",display:true},{left:"\\[",right:"\\]",display:true},{left:"\\(",right:"\\)",display:false},{left:"$",right:"$",display:false}],
      throwOnError:false, strict:"ignore"
    });
  }

  function trendLabel(t){
    return {rising:"rising", stable:"stable", falling:"falling", new:"new topic"}[t] || t;
  }

  function renderCourses(){
    const box = $("courses"); box.innerHTML="";
    courseOrder.filter(k=>DB[k]).forEach(k=>{
      const c = DB[k];
      const b = document.createElement("button");
      b.className = "card" + (state.course===k?" active":"");
      b.innerHTML = `<div class="code">${esc(c.code)}</div><div class="title">${esc(c.title)}</div><div class="exams">${Object.values(c.exams).map(e=>esc(e.name)).join(" &middot; ")}</div>`;
      b.onclick = ()=>{ state.course=k; state.exam=null; renderCourses(); renderExams(); $("content").hidden=true; $("exam-picker").hidden=false; $("exam-picker").scrollIntoView({behavior:"smooth",block:"start"}); };
      box.appendChild(b);
    });
  }

  function renderExams(){
    const box = $("exams"); box.innerHTML="";
    const c = DB[state.course]; if(!c) return;
    Object.values(c.exams).forEach(e=>{
      const b = document.createElement("button");
      b.textContent = e.name; if(state.exam===e.id) b.classList.add("active");
      b.onclick = ()=>{ state.exam=e.id; renderExams(); renderContent(); };
      box.appendChild(b);
    });
  }

  function problemHTML(p, idx, prefix){
    let h = `<div class="problem"><h5>${prefix?prefix+" ":""}Problem ${idx+1}. ${esc(p.title)} ${p.points?`<span class="pts">(${p.points} pt)</span>`:""}</h5>`;
    if(p.intro) h += `<div class="intro">${p.intro}</div>`;
    p.parts.forEach((pt,i)=>{
      const lbl = String.fromCharCode(97+i)+")";
      h += `<div class="part"><p class="q"><span class="lbl">${lbl}</span>${pt.q}</p><button class="reveal" type="button">Show solution</button><div class="ans">${pt.a}</div></div>`;
    });
    h += `</div>`;
    return h;
  }

  function wireReveals(root){
    root.querySelectorAll("button.reveal").forEach(b=>{
      b.onclick = ()=>{ const part=b.closest(".part"); part.classList.toggle("show"); b.textContent = part.classList.contains("show")?"Hide solution":"Show solution"; };
    });
  }

  function renderContent(){
    const c = DB[state.course]; const e = c.exams[state.exam];
    $("content").hidden=false;
    $("exam-title").textContent = `${c.code} — ${e.name}`;
    $("exam-meta").innerHTML = `${esc(c.title)} &middot; analyzed: ${esc(e.years)}${e.format?` &middot; typical format: ${esc(e.format)}`:""}`;
    $("exam-notes").innerHTML = e.notes || "";
    // ranking
    const cats = [...e.categories].sort((a,b)=>b.prob-a.prob);
    const box = $("ranking"); box.innerHTML="";
    cats.forEach((cat,i)=>{
      const div = document.createElement("div"); div.className="topic";
      let body = `<div class="topic-body">`;
      body += `<h4>Why it is likely</h4><p class="evidence">${cat.evidence}</p>`;
      const concepts = (window.CONCEPTS && window.CONCEPTS[`${state.course}/${state.exam}/${cat.id}`]) || cat.concepts;
      body += `<h4>Concepts to review</h4><ul class="concepts">${concepts.map(x=>`<li>${x}</li>`).join("")}</ul>`;
      body += `<h4>New practice problems <span class="hint">(written for this site; similar in style to past exams but not taken from them)</span></h4><div class="btn-row"><button type="button" class="show-all">Show all solutions</button><button type="button" class="hide-all">Hide all solutions</button></div>`;
      cat.problems.forEach((p,j)=> body += problemHTML(p,j,""));
      body += `</div>`;
      div.innerHTML = `<div class="topic-head"><div class="rank">${i+1}</div><div><div class="topic-name">${esc(cat.name)} <span class="trend ${cat.trend}">${trendLabel(cat.trend)}</span></div><div class="topic-years">Seen in: ${esc(cat.years.join(", "))}</div></div><div class="bar"><span style="width:${cat.prob}%"></span></div><div class="pct">${cat.prob}%</div></div>` + body;
      div.querySelector(".topic-head").onclick = ()=>{ div.classList.toggle("open"); if(div.classList.contains("open") && !div.dataset.rendered){ renderMath(div); div.dataset.rendered="1"; } };
      div.querySelector(".show-all").onclick = ()=> div.querySelectorAll(".part").forEach(p=>{p.classList.add("show"); p.querySelector("button.reveal").textContent="Hide solution";});
      div.querySelector(".hide-all").onclick = ()=> div.querySelectorAll(".part").forEach(p=>{p.classList.remove("show"); p.querySelector("button.reveal").textContent="Show solution";});
      wireReveals(div);
      box.appendChild(div);
    });
    // mock exam: first problem from each of the top N categories
    const N = e.mockCount || 4;
    const mock = $("mock"); mock.innerHTML = `<p class="meta">${esc(c.code)} ${esc(e.name)} — mock exam, ${N} problems. Suggested time: ${e.mockTime||"as in the real exam"}.</p>`;
    cats.slice(0,N).forEach((cat,i)=>{ const p = cat.problems[0]; mock.innerHTML += `<div><div class="meta" style="margin-top:14px">Topic: ${esc(cat.name)}</div>${problemHTML(p,i,"")}</div>`; });
    wireReveals(mock); mock.dataset.rendered="";
    setView(state.view);
    $("content").scrollIntoView({behavior:"smooth",block:"start"});
  }

  function setView(v){
    state.view=v;
    $("topics-view").hidden = v!=="topics"; $("mock-view").hidden = v!=="mock";
    document.querySelectorAll(".view-toggle button").forEach(b=>b.classList.toggle("active", b.dataset.view===v));
    if(v==="mock" && !$("mock").dataset.rendered){ renderMath($("mock")); $("mock").dataset.rendered="1"; }
  }
  document.querySelectorAll(".view-toggle button").forEach(b=> b.onclick=()=>setView(b.dataset.view));

  renderCourses();
})();
