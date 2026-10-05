const $=s=>document.querySelector(s);
function setTheme(t){document.documentElement.dataset.theme=t;localStorage.setItem('rd_theme',t);}
function setFs(d){let f=parseInt(localStorage.getItem('rd_fs')||'18')+d;f=Math.min(24,Math.max(15,f));localStorage.setItem('rd_fs',f);document.documentElement.style.setProperty('--fs',f+'px');}
document.documentElement.dataset.theme=localStorage.getItem('rd_theme')||'light';
document.documentElement.style.setProperty('--fs',(localStorage.getItem('rd_fs')||'18')+'px');
window.addEventListener('scroll',()=>{const p=$('.progress');if(!p)return;const h=document.documentElement;const r=h.scrollTop/(h.scrollHeight-h.clientHeight||1);p.style.width=(r*100)+'%';},{passive:true});