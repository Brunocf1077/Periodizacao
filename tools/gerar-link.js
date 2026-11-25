// Gera o link do aluno a partir de um arquivo JSON de treino.
// Uso: npm i lz-string && node tools/gerar-link.js treino.json
// Formato do JSON: ver tools/exemplo.json
const fs=require('fs');const LZ=require('lz-string');
const spec=JSON.parse(fs.readFileSync(process.argv[2],'utf8'));
let n=0;const id=p=>p+(++n).toString(36);
const slug=s=>s.normalize('NFD').replace(/[̀-ͯ]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
const treinos=spec.treinos.map(t=>({id:id('t'),l:t.l,ti:t.ti||'',blocos:t.blocos.map(b=>({
  ty:b.ex.length>1?(b.tipo||'super'):'single',r:b.r||'',
  ex:b.ex.map(e=>{const [nm,p,extra]=e;const o={id:id('e'),n:nm,p:[p]};if(extra)Object.assign(o,extra);return o})}))}));
const payload={v:2,a:spec.aluno||'',c:{mark:'BP',l1:'Bruno',l2:'Personal',sub:'Personal Trainer',cref:'CREF 049178-G/SP'},
  p:{id:spec.id||('p-'+slug(spec.aluno||'aluno')+'-'+slug(spec.nome||'treino')),nome:spec.nome,inicio:'',sem:1,dicas:(spec.dicas||[]).join('\n'),treinos}};
process.stdout.write('https://brunocf1077.github.io/Periodizacao/#t='+LZ.compressToEncodedURIComponent(JSON.stringify(payload))+'\n');
