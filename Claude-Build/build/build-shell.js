const fs=require('fs');
const T=process.argv[2];
const rd=f=>JSON.parse(fs.readFileSync(T+f,'utf8')), wr=(f,o)=>fs.writeFileSync(T+f,JSON.stringify(o,null,2));
const clone=o=>JSON.parse(JSON.stringify(o));

// ---- announcement bar
let hg=rd('/sections/header-group.json');
const ab=hg.sections.announcement_bar_4tGfEp;
const grp=ab.blocks.group_announcement_bar_PeTpTw.blocks.group_announcement_9yj6cq;
const base=grp.blocks.announcement_text_BXhKCE;
const msgs=['Free Shipping on Orders $50+','Virginia-Crafted with Organic Ingredients','Trusted by 2,000+ Home Cooks'];
grp.blocks={};grp.block_order=[];
msgs.forEach((m,i)=>{const k='announcement_text_mh'+i;const b=clone(base);b.settings.text=m;grp.blocks[k]=b;grp.block_order.push(k)});
grp.settings.autoplay=true;grp.settings.autoplay_speed=4;
ab.blocks.group_announcement_bar_PeTpTw.settings.justify_content='center';
// ---- header: single Shop mega menu
const hd=hg.sections.header_default;
const m1=clone(hd.blocks.mega_menu_1_mDeNwB);m1.settings.menu_item='Shop';m1.settings.grid='4';
hd.blocks={mega_menu_shop_mh:m1};hd.block_order=['mega_menu_shop_mh'];
wr('/sections/header-group.json',hg);

// ---- footer
let fg=rd('/sections/footer-group.json');
const f=fg.sections.footer;
const g1=f.blocks.footer_group_GQfP9p;
const nl=g1.blocks.footer_column_PrDPi9.blocks;
nl.text_xCYFNJ.settings.text="<p><strong>JOIN THE CURATOR'S KITCHEN</strong></p>";
nl.text_DVPXXh.settings.text='<p>Get recipes, cooking tips, and exclusive offers</p>';
nl.email_signup_nDhCiH.settings.label='SUBSCRIBE';
const cols=g1.blocks.footer_column_RKxXJk;
const proto=cols.blocks.menu_VeyxGm;
const defs=[['SHOP','footer-shop'],['LEARN','footer-learn'],['COMMUNITY','footer-community'],['COMPANY','footer-company']];
cols.blocks={};cols.block_order=[];
defs.forEach(([h,m],i)=>{const k='menu_mh'+i;const b=clone(proto);b.settings.heading=h;b.settings.menu=m;cols.blocks[k]=b;cols.block_order.push(k)});
const g2=f.blocks.group_7TgywR;
g2.blocks.jumbo_text_m86KDV.settings.text='Mad Hatter';
const ut=g2.blocks.group_dxaAmj;
ut.blocks.text_zeTjRU.settings.text='<p>Trusted by 2,000+ Home Cooks</p>';
ut.blocks.footer_utilities_9EkiGA.blocks['utilities-text'].blocks.text_kMW3qc.settings.text='<p>Crafted in Virginia.</p>';
wr('/sections/footer-group.json',fg);
console.log('shell patched');
