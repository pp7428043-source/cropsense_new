// Filter state
let activeCrop='all', activeType='all', activeSev='all';
let currentView='grid';
const PAGE_SIZE=12;
let currentPage=1;
let filteredData=[...DB];
let favorites=new Set(JSON.parse(localStorage.getItem('cs_favs')||'[]'));

function toggleFilter(btn, group, value){
  const groupEl=document.getElementById(group+'Filters');
  const selector=group==='crop'?'#cropFilters .chip':group==='type'?'#typeFilters .chip':'#sevFilters .chip';
  document.querySelectorAll(selector).forEach(c=>c.classList.remove('active'));
  btn.classList.add('active');
  if(group==='crop') activeCrop=value;
  else if(group==='type') activeType=value;
  else activeSev=value;
  currentPage=1;
  applyFilters();
}

function applyFilters(){
  const q=document.getElementById('searchInput')?.value.toLowerCase() || '';
  const sort=document.getElementById('sortSelect')?.value || 'name';
  filteredData=DB.filter(d=>{
    const matchCrop=activeCrop==='all'||d.crop===activeCrop;
    const matchType=activeType==='all'||d.type===activeType;
    const matchSev=activeSev==='all'||d.sev===activeSev;
    const matchSearch=!q||(d.name.toLowerCase().includes(q)||d.sci.toLowerCase().includes(q)||d.desc.toLowerCase().includes(q)||d.crop.toLowerCase().includes(q));
    return matchCrop&&matchType&&matchSev&&matchSearch;
  });
  if(sort==='name') filteredData.sort((a,b)=>a.name.localeCompare(b.name));
  else if(sort==='severity') filteredData.sort((a,b)=>({high:0,medium:1,low:2}[a.sev]-{high:0,medium:1,low:2}[b.sev]));
  else if(sort==='crop') filteredData.sort((a,b)=>a.crop.localeCompare(b.crop));
  renderGrid();
}

function renderGrid(){
  const grid=document.getElementById('diseasesGrid');
  if(!grid) return;
  const visible = document.getElementById('visibleCount');
  if(visible) visible.textContent=filteredData.length;
  
  const totalPages=Math.ceil(filteredData.length/PAGE_SIZE);
  currentPage=Math.min(currentPage,totalPages||1);
  const pageData=filteredData.slice((currentPage-1)*PAGE_SIZE,currentPage*PAGE_SIZE);

  if(filteredData.length===0){
    grid.innerHTML=`<div class="empty-state"><i class="fas fa-search-minus"></i><h3>No diseases found</h3><p>Try different search terms or remove some filters.</p></div>`;
    document.getElementById('pagination').innerHTML='';
    return;
  }

  grid.innerHTML=pageData.map((d,i)=>{
    const isFaved=favorites.has(d.id);
    return `<div class="dcard card" style="animation-delay:${i*.04}s" data-id="${d.id}" onclick="openModal(${d.id})">
      <div class="dcard-img" style="background:${d.bg}">${d.emoji}
        <span class="dcard-crop-tag">${d.crop}</span>
        <div class="dcard-fav ${isFaved?'faved':''}" onclick="toggleFav(event,${d.id})" title="Save to favourites"><i class="fas fa-heart"></i></div>
      </div>
      <div class="card-body">
        <h3 style="font-family:'Fraunces',serif;font-size:16px;font-weight:700;color:var(--forest);">${d.name}</h3>
        <div style="font-size:11px;color:var(--text-muted);font-style:italic;margin-bottom:10px">${d.sci}</div>
        <div style="font-size:12px;color:var(--text-muted);line-height:1.55;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden">${d.desc}</div>
      </div>
    </div>`;
  }).join('');
}

function toggleFav(e, id){
    e.stopPropagation();
    if(favorites.has(id)){
        favorites.delete(id);
    } else {
        favorites.add(id);
    }
    localStorage.setItem('cs_favs', JSON.stringify([...favorites]));
    renderGrid();
}

// ── MODAL ──
function openModal(id){
    const d=DB.find(x=>x.id===id);
    if(!d)return;
    document.getElementById('modalTitle').textContent=d.name;
    document.getElementById('modalSci').textContent=d.sci;
    document.getElementById('modalHeader').style.background=d.bg;
    document.getElementById('modalHeader').textContent=d.emoji;
    document.getElementById('modalDesc').textContent=d.desc;
    document.getElementById('modalChem').textContent=d.chem||'No chemical option listed.';
    document.getElementById('modalOrg').textContent=d.org||'No organic option listed.';
    document.getElementById('modalOverlay').classList.add('open');
}

function closeModal(e){if(e.target.id==='modalOverlay') closeModalDirect();}
function closeModalDirect(){document.getElementById('modalOverlay').classList.remove('open');}

function switchMTab(btn, tabId){
    document.querySelectorAll('.mtab').forEach(t=>t.classList.remove('active'));
    document.querySelectorAll('.mtab-content').forEach(c=>c.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById('mtab-'+tabId).classList.add('active');
}

window.addEventListener('DOMContentLoaded', () => {
    if(document.getElementById('diseasesGrid')) {
        renderGrid();
    }
});
