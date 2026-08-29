// nett-ux-writing skill audit · rendered text, every screen + open sheets
const {JSDOM}=require('jsdom');const fs=require('fs');
let h=fs.readFileSync(process.argv[2]||'nett-app.html','utf8').replace(/<link[^>]*tabler[^>]*>/,'').replace(/<script src=[^>]*><\/script>/g,'');
const dom=new JSDOM(h,{runScripts:'dangerously',pretendToBeVisual:true,url:'https://x.t/'});const w=dom.window,d=w.document;
w.NOINTRO=true;w.matchMedia=()=>({matches:false,addEventListener(){}});w.HTMLCanvasElement.prototype.getContext=()=>null;
const LEX=[[/\brides on\b/i,'W-34 rides on'],[/\bfull room\b/i,'W-34 full room'],[/[^.\w]rails?\b(?!way)/i,'W-21 rails'],[/rule book/i,'W-34 rule book'],[/in the water(?! today)/i,'W-34 water prose'],[/[a-z\u0900-\u097F] \u2014 [a-z]|[a-z]\u2014[a-z]/i,'W-33 em-dash (prose)'],[/\b(advise|recommend|suggest)\b/i,'perimeter'],[/\b(guaranteed|assured|risk-free)\b/i,'banned claim'],[/\d+\.?\d*\s?(lakhs?)\b/i,'numerals lakh-figure'],[/\/(mo|yr|month|year)\b/,'slash-flow'],[/\bT\+\d/,'T+N'],[/!(?!=)/,'exclamation'],[/\beditable\b/i,'editable'],[/floor pending/i,'jargon floor']];
setTimeout(()=>{
 const screens=[...d.querySelectorAll('section.zs')].map(x=>x.id.replace('s-',''));
 let fails=0;const seen={};
 screens.forEach(id=>{try{if(id==='jobdet')w.curAJ='car';w.go(id);}catch(e){}
  const el=d.getElementById('s-'+id);if(!el)return;const t=' '+el.textContent+' ';
  LEX.forEach(([rx,name])=>{const m=t.match(rx);if(m&&!seen[id+name]){seen[id+name]=1;fails++;console.log('  FAIL',id,'·',name,'·',JSON.stringify(t.substr(Math.max(0,t.search(rx)-30),70).replace(/\s+/g,' ')));}});});
 // open sheets' static text
 [...d.querySelectorAll('.modal .sheet')].forEach(sh=>{const t=' '+sh.textContent+' ';LEX.forEach(([rx,name])=>{const m=t.match(rx);const k='sheet:'+(sh.parentElement.id||'?')+name;if(m&&!seen[k]){seen[k]=1;fails++;console.log('  FAIL',sh.parentElement.id,'·',name,'·',JSON.stringify(t.substr(Math.max(0,t.search(rx)-30),70).replace(/\s+/g,' ')));}});});
 console.log(fails?'=== WRITING AUDIT FAIL '+fails:'=== WRITING AUDIT GREEN (skill lexicon, '+screens.length+' screens + sheets)');process.exit(fails?1:0);
},1600);
