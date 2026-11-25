import { execFileSync } from 'node:child_process';
import { mkdtempSync, cpSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';

const git=(args,cwd=process.cwd())=>execFileSync('git',args,{cwd,encoding:'utf8'}).trim();
const remote=git(['remote','get-url','origin']);
const temporary=mkdtempSync(join(tmpdir(),'little-railway-pages-'));
const checkout=join(temporary,'site');
try {
  git(['clone','--no-checkout',remote,checkout]);
  const exists=git(['branch','-r','--list','origin/gh-pages'],checkout);
  git(exists?['checkout','-b','gh-pages','origin/gh-pages']:['checkout','--orphan','gh-pages'],checkout);
  for(const entry of readdirSync(checkout))if(entry!=='.git')rmSync(join(checkout,entry),{recursive:true,force:true});
  cpSync(resolve('dist'),checkout,{recursive:true});
  writeFileSync(join(checkout,'.nojekyll'),'');
  git(['add','--all'],checkout);
  if(git(['status','--porcelain'],checkout)){
    git(['commit','-m',`Publish railway world ${git(['rev-parse','--short','HEAD'])}`],checkout);
    git(['push','origin','HEAD:refs/heads/gh-pages'],checkout);
    console.log('Published the production build to gh-pages.');
  }else console.log('The published build is already current.');
}finally{
  rmSync(temporary,{recursive:true,force:true});
}
