let currentLang = 'en';
let chatHistory = [];
let weatherData = null;
let alertsGenerated = false;

const S = {
  en: {
    greeting: h => `Good ${h<12?'morning':h<18?'afternoon':'evening'}, Ramesh 👋`,
    langLabel:'Language', diagnosing:'Analysing your crop', thinking:'Thinking…',
    error:'Something went wrong. Please try again.', feedbackSent:'Feedback sent! Thank you 🌱',
    saveTreatment:'Treatment plan saved!', cropAdded:'Crop added!',
    chatWelcome:"Hello Ramesh! I'm CropSense AI. Ask me anything about your crops — diseases, treatments, soil health, or farming tips for Indore.",
    chatPlaceholder:'Ask about any crop disease or farming question…',
    chatTitle:'Ask CropSense AI', chatBadge:'Multi-turn chat',
    uploadTitle:'Photograph your crop',
    uploadSub:'Take a clear, close-up photo of the affected leaf, stem, or fruit. Drag & drop or click.',
    uploadBtn:'Upload photo', sampleLabel:'Or try a sample crop',
    diagTitle:'AI Crop Diagnosis', diagSub:'Upload a photo — Claude AI will identify the disease and recommend treatment.',
    chemical:'Chemical treatment', organic:'Organic option', prevention:'Prevention',
    saveBtn:'Save treatment', newDiagBtn:'New diagnosis',
    starters:['What caused Yellow Rust on my wheat?','How to prevent Tomato Late Blight?','Best fertilizer for wheat in MP?','Is it safe to spray pesticides today?'],
    days:['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
    months:['January','February','March','April','May','June','July','August','September','October','November','December'],
    pages:{overview:'Dashboard',diagnose:'AI Diagnosis',history:'Diagnosis History',crops:'My Crops',alerts:'Disease Alerts',saved:'Saved Diseases',profile:'My Profile',settings:'Settings'},
  },
  hi: {
    greeting: h => `नमस्ते रमेश, ${h<12?'सुप्रभात':h<18?'शुभ दोपहर':'शुभ संध्या'} 👋`,
    langLabel:'भाषा', diagnosing:'आपकी फसल का विश्लेषण हो रहा है', thinking:'सोच रहे हैं…',
    error:'कुछ गलत हुआ। कृपया पुनः प्रयास करें।', feedbackSent:'फ़ीडबैक भेजा! धन्यवाद 🌱',
    saveTreatment:'उपचार योजना सहेजी गई!', cropAdded:'फसल जोड़ी गई!',
    chatWelcome:'नमस्ते रमेश! मैं CropSense AI हूं। अपनी फसलों के बारे में कुछ भी पूछें — रोग, उपचार, मिट्टी स्वास्थ्य, या इंदौर के लिए खेती के सुझाव।',
    chatPlaceholder:'कोई भी फसल रोग या खेती का सवाल पूछें…',
    chatTitle:'CropSense AI से पूछें', chatBadge:'बहु-चर्चा',
    uploadTitle:'अपनी फसल की फ़ोटो लें',
    uploadSub:'प्रभावित पत्ती, तना या फल की स्पष्ट फ़ोटो लें। खींचें-छोड़ें या क्लिक करें।',
    uploadBtn:'फ़ोटो अपलोड करें', sampleLabel:'या एक नमूना फसल आज़माएं',
    diagTitle:'AI फसल निदान', diagSub:'फ़ोटो अपलोड करें — Claude AI रोग, गंभीरता और उपचार की पहचान करेगा।',
    chemical:'रासायनिक उपचार', organic:'जैविक विकल्प', prevention:'रोकथाम',
    saveBtn:'उपचार सहेजें', newDiagBtn:'नया निदान',
    starters:['मेरे गेहूं पर Yellow Rust क्यों हुई?','Tomato Late Blight कैसे रोकें?','MP में गेहूं के लिए सबसे अच्छा उर्वरक?','क्या आज कीटनाशक लगाना सुरक्षित है?'],
    days:['रविवार','सोमवार','मंगलवार','बुधवार','गुरुवार','शुक्रवार','शनिवार'],
    months:['जनवरी','फ़रवरी','मार्च','अप्रैल','मई','जून','जुलाई','अगस्त','सितंबर','अक्टूबर','नवंबर','दिसंबर'],
    pages:{overview:'डैशबोर्ड',diagnose:'AI निदान',history:'निदान इतिहास',crops:'मेरी फसलें',alerts:'रोग चेतावनियाँ',saved:'सहेजे रोग',profile:'मेरी प्रोफ़ाइल',settings:'सेटिंग्स'},
  }
};
function T(k){ return S[currentLang][k] || S.en[k] || k; }

/* Hamburger Menu Toggle */
function toggleMobileMenu() {
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebarOverlay');
  if (sidebar && overlay) {
    sidebar.classList.toggle('open');
    overlay.classList.toggle('open');
  }
}

// ── CURSOR ──
const cur=document.getElementById('cursor'),ring=document.getElementById('cursor-ring');
let mx=0,my=0,rx=0,ry=0;
document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;if(cur)cur.style.transform=`translate(${mx-5}px,${my-5}px)`;});
(function loop(){rx+=(mx-rx)*.12;ry+=(my-ry)*.12;if(ring)ring.style.transform=`translate(${rx-17}px,${ry-17}px)`;requestAnimationFrame(loop);})();

function showToast(msg){const t=document.getElementById('toast');if(!t)return;document.getElementById('toastMsg').textContent=msg;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),2800);}

function updateDateTime(){
  const now=new Date(), s=S[currentLang];
  const dateEl = document.getElementById('topbarDate');
  if(dateEl) dateEl.textContent=`${s.days[now.getDay()]}, ${s.months[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()}`;
  if(document.querySelector('.page.active')?.id==='page-overview'){
    const titleEl = document.getElementById('topbarTitle');
    if(titleEl) titleEl.textContent=s.greeting(now.getHours());
  }
}

function showPage(id,el){
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  document.querySelectorAll('.sb-item').forEach(i=>i.classList.remove('active'));
  const page = document.getElementById('page-'+id);
  if(page) page.classList.add('active');
  if(el) el.classList.add('active');
  const titleEl = document.getElementById('topbarTitle');
  if(titleEl) titleEl.textContent=T('pages')[id]||id;
  if(id==='alerts'&&!alertsGenerated&&weatherData) generateAlertsWrapper(weatherData);
  const sidebar = document.getElementById('sidebar');
  if(sidebar && sidebar.classList.contains('open')) toggleMobileMenu();
}

function setLang(lang){
  currentLang=lang;
  document.getElementById('langEn').classList.toggle('active',lang==='en');
  document.getElementById('langHi').classList.toggle('active',lang==='hi');
  const s=S[lang];
  const upd=(id,key)=>{const el=document.getElementById(id);if(el&&s[key])el.textContent=s[key];};
  upd('langLabel','langLabel');
  upd('diagTitle','diagTitle'); upd('diagSub','diagSub');
  upd('uploadTitle','uploadTitle'); upd('uploadSub','uploadSub');
  upd('uploadBtnText','uploadBtn'); upd('sampleLabel','sampleLabel');
  upd('chatTitle','chatTitle'); upd('chatBadge','chatBadge');
  upd('chatWelcomeMsg','chatWelcome');
  const cInp = document.getElementById('chatInput');
  if(cInp) cInp.placeholder=s.chatPlaceholder;
  buildChatStarters();
  updateDateTime();
  chatHistory=[];
  const activePage=document.querySelector('.page.active');
  if(activePage) document.getElementById('topbarTitle').textContent=s.pages[activePage.id.replace('page-','')]||'';
}

const WMO_ICONS={0:'☀️',1:'🌤',2:'⛅',3:'☁️',45:'🌫',48:'🌫',51:'🌦',53:'🌦',55:'🌧',61:'🌧',63:'🌧',65:'🌧',71:'🌨',73:'🌨',75:'❄️',80:'🌦',81:'🌧',82:'⛈',95:'⛈',96:'⛈',99:'⛈'};
const WMO_DESC={0:'Clear sky',1:'Mainly clear',2:'Partly cloudy',3:'Overcast',45:'Foggy',51:'Light drizzle',53:'Drizzle',55:'Heavy drizzle',61:'Light rain',63:'Moderate rain',65:'Heavy rain',80:'Rain showers',82:'Violent showers',95:'Thunderstorm',99:'Thunderstorm'};

async function initWeather(){
  weatherData = await fetchWeatherWithCache();
  renderWeather(weatherData);
  generateAlertsWrapper(weatherData);
}

function renderWeather(w){
  const icon=WMO_ICONS[w.code]||'🌤';
  const cond=WMO_DESC[w.code]||'Partly cloudy';
  const wwTemp = document.getElementById('wwTemp');
  if(!wwTemp) return;
  wwTemp.innerHTML=`${w.temp}<span class="ww-unit">°C</span>`;
  document.getElementById('wwCond').textContent=cond;
  document.getElementById('wwIcon').textContent=icon;
  document.getElementById('wwHumidity').textContent=w.humidity+'%';
  document.getElementById('wwWind').textContent=w.wind+' km/h';
  document.getElementById('wwFeels').textContent=w.feels+'°C';
  document.getElementById('wwUV').textContent=w.uv>=8?'Very High':w.uv>=6?'High':w.uv>=3?'Moderate':'Low';
  document.querySelector('.ww-bg').textContent=icon;
  const pill = document.getElementById('weatherPillText');
  if(pill) pill.textContent=`${w.temp}°C · Indore`;
  
  let risk='<strong>Rust risk elevated</strong> — High humidity + cool nights favour fungal spread.';
  if(w.temp>35) risk='<strong>Heat stress risk</strong> — High temps may affect grain filling in wheat.';
  else if(w.humidity<50) risk='<strong>Low disease risk</strong> — Dry conditions reduce fungal disease pressure.';
  else if(w.humidity>75) risk='<strong>Blight risk high</strong> — Extended leaf wetness conditions detected.';
  document.getElementById('wwRiskText').innerHTML=risk;
}

async function generateAlertsWrapper(w){
  if(alertsGenerated)return;
  alertsGenerated=true;
  const month=new Date().toLocaleString('default',{month:'long',year:'numeric'});
  const prompt=`Location: Indore, Madhya Pradesh, India. Date: ${month}. Temperature: ${w.temp}°C, Humidity: ${w.humidity}%, Wind: ${w.wind} km/h. Crops: Wheat, Tomato, Rice. Generate 4 disease/pest risk alerts. Respond ONLY with a JSON array: [{"title":"Disease","detail":"...","location":"District","severity":"High|Medium|Low","icon":"fa-exclamation-triangle","action":"..."}]`;
  
  const fallback = [
    {title:'Yellow Rust — Wheat',detail:'New virulent strain Race 78A detected.',location:'Indore district',severity:'High',icon:'fa-exclamation-triangle',action:'Read guide'},
    {title:'Late Blight Risk — Tomato',detail:'>10h leaf wetness forecast. Apply Mancozeb.',location:'MP Region',severity:'High',icon:'fa-virus',action:'Treatment'},
    {title:'Fall Armyworm — Maize',detail:'FAW detected in adjacent districts.',location:'Sehore',severity:'Medium',icon:'fa-bug',action:'Prevention'},
    {title:'Iron Deficiency Warning',detail:'Alkaline soil pH >7.8 in your district.',location:'Indore',severity:'Low',icon:'fa-leaf',action:'Solutions'},
  ];
  
  const alerts = await fetchDynamicAlertsCache(w, prompt, fallback);
  renderAlerts(alerts);
}

function sevCls(s){return s==='High'?'ac-high':s==='Medium'?'ac-med':'ac-low';}
function icoCls(s){return s==='High'?'aci-high':s==='Medium'?'aci-med':'aci-low';}

function renderAlerts(alerts){
  const mini=document.getElementById('overviewAlertList');
  if(mini) mini.innerHTML=alerts.slice(0,3).map(a=>`<div class="alert-card ${sevCls(a.severity)}"><div class="ac-icon ${icoCls(a.severity)}"><i class="fas ${a.icon}"></i></div><div class="ac-info"><div class="ac-title">${a.title}</div><div class="ac-meta">${a.location}</div></div><div class="ac-time">${a.severity}</div></div>`).join('');
  const badge=document.getElementById('alertBadge');
  if(badge) badge.textContent=alerts.length;
  const full = document.getElementById('alertsFullList');
  if(full) full.innerHTML=alerts.map(a=>`<div class="card" style="padding:22px"><div style="display:flex;gap:16px;align-items:flex-start"><div class="ac-icon ${icoCls(a.severity)}" style="width:46px;height:46px;font-size:18px;flex-shrink:0"><i class="fas ${a.icon}"></i></div><div style="flex:1"><div style="display:flex;align-items:center;gap:10px;margin-bottom:6px;flex-wrap:wrap"><div style="font-family:'Fraunces',serif;font-size:17px;font-weight:700;color:var(--forest)">${a.title}</div><span style="font-size:10px;font-weight:700;padding:3px 9px;border-radius:100px;${a.severity==='High'?'background:var(--red-pale);color:var(--red)':a.severity==='Medium'?'background:var(--amber-pale);color:var(--amber)':'background:var(--pale);color:#1b5e20'}">${a.severity}</span></div><div style="font-size:14px;color:var(--text-mid);line-height:1.6;margin-bottom:12px">${a.detail}</div><div style="display:flex;align-items:center;gap:16px;flex-wrap:wrap"><div style="font-size:12px;color:var(--text-muted)"><i class="fas fa-map-marker-alt" style="margin-right:4px;font-size:10px"></i>${a.location}</div><button style="margin-left:auto;padding:9px 18px;background:var(--mid);color:#fff;border:none;border-radius:100px;font-size:12px;font-weight:700;cursor:none" onclick="showToast('Opening resource…')">${a.action} <i class="fas fa-arrow-right" style="margin-left:4px;font-size:10px"></i></button></div></div></div></div>`).join('');
}

// ── Multi-turn chat & Diagnosis logic...
function buildChatStarters(){
  const sList = document.getElementById('chatStarters');
  if(sList) sList.innerHTML=S[currentLang].starters.map(s=>`<button class="chat-starter" onclick="sendChatMsg(${JSON.stringify(s)})">${s}</button>`).join('');
}
function appendChatMsg(role,text){
  const msgs=document.getElementById('chatMessages');
  const d=document.createElement('div');d.className=`chat-msg ${role}`;
  const isAi=role==='ai';
  d.innerHTML=`<div class="chat-av ${isAi?'ai-av':'user-av'}">${isAi?'🌱':'RS'}</div><div class="chat-bubble">${text}</div>`;
  msgs.appendChild(d);msgs.scrollTop=msgs.scrollHeight;
}
function showTyping(){
  const msgs=document.getElementById('chatMessages');
  const d=document.createElement('div');d.className='chat-msg ai';d.id='typingInd';
  d.innerHTML=`<div class="chat-av ai-av">🌱</div><div class="chat-typing"><span></span><span></span><span></span></div>`;
  msgs.appendChild(d);msgs.scrollTop=msgs.scrollHeight;
}
function hideTyping(){const t=document.getElementById('typingInd');if(t)t.remove();}
async function sendChatMsg(text){
  if(!text||!text.trim())return;
  document.getElementById('chatInput').value='';
  document.getElementById('chatSendBtn').disabled=true;
  appendChatMsg('user',text);
  chatHistory.push({role:'user',content:text});
  showTyping();
  try{
    const sys=CHAT_SYS+(currentLang==='hi'?' Always respond in Hindi (Devanagari). Keep disease and chemical names in English.':'');
    const reply = await requestAiChat(chatHistory, sys);
    hideTyping();
    appendChatMsg('ai',reply);
    chatHistory.push({role:'assistant',content:reply});
  }catch(e){hideTyping();appendChatMsg('ai',T('error'));}
  document.getElementById('chatSendBtn').disabled=false;
}
function sendChat(){sendChatMsg(document.getElementById('chatInput').value.trim());}

// Provide initialization for the dashboard
window.addEventListener('DOMContentLoaded', () => {
    updateDateTime();
    if(document.getElementById('page-overview')) {
      buildChatStarters();
      initWeather();
    }
});
