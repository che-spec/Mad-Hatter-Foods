const fs=require('fs');const T=process.argv[2];const tpl=process.argv[3];
const cache={};
const sch=(kind,type)=>{const k=kind+type;if(cache[k]!==undefined)return cache[k];const f=`${T}/${kind}/${type}.liquid`;let r=null;if(fs.existsSync(f)){try{r=JSON.parse(fs.readFileSync(f,'utf8').split('{% schema %}')[1].split('{% endschema %}')[0])}catch(e){r=null}}return cache[k]=r};
const errs=[];
function chk(b,kind,path){const s=sch(kind,b.type)||(kind==='sections'?null:null);if(!s&&fs.existsSync(T+'/'+kind+'/'+b.type+'.liquid'))return;if(!s){errs.push(`${path}: unknown type ${b.type}`);return}
 const ids={};(s.settings||[]).forEach(x=>{if(x.id)ids[x.id]=x});
 for(const [k,v] of Object.entries(b.settings||{})){const d=ids[k];if(!d){errs.push(`${path}: no setting '${k}' on ${b.type}`);continue}
  if(d.type==='select'&&d.options&&!d.options.some(o=>String(o.value)===String(v)))errs.push(`${path}: '${k}'='${v}' not in options of ${b.type}`);
  if(d.type==='range'&&(v<d.min||v>d.max))errs.push(`${path}: '${k}'=${v} out of range ${d.min}-${d.max} on ${b.type}`)}
 for(const [k,c] of Object.entries(b.blocks||{}))chk(c,'blocks',path+'/'+k)}
const j=JSON.parse(fs.readFileSync(tpl,'utf8'));
for(const [k,s] of Object.entries(j.sections))chk(s,'sections',k);
console.log(errs.length?errs.join('\n'):'OK');

