const fs=require('fs');
const ROOT=process.argv[2]; // theme dir
const SRC=process.argv[3];  // ella source
const readSchema=f=>JSON.parse(fs.readFileSync(f,'utf8').split('{% schema %}')[1].split('{% endschema %}')[0]);
let n=0; const id=p=>`${p}_mh${(++n).toString(36)}`;
const NOSH={shadow_color:'rgba(0,0,0,0)'};
const add=(o,items)=>{o.blocks={};o.block_order=[];items.forEach(([k,b])=>{o.blocks[k]=b;o.block_order.push(k)});return o};
const text=(html,s={})=>[id('text'),{type:'text',name:'t:names.text',settings:{text:html,underline_offset:-20,...s},blocks:{}}];
const h=(tag,t,s={})=>text(`<${tag}>${t}</${tag}>`,{type_preset:tag,...s});
const p=(t,s={})=>text(`<p>${t}</p>`,{type_preset:'paragraph',...s});
const btn=(label,link,s={})=>[id('button'),{type:'button',name:'t:names.button',settings:{label,link,...s},blocks:{}}];
const icon=(i,s={})=>[id('icon'),{type:'icon',name:'t:names.icon',settings:{icon:i,width:48,...s},blocks:{}}];
const image=(s={})=>[id('image'),{type:'image',name:'t:names.image',settings:{...s},blocks:{}}];
const group=(s,items)=>[id('group'),add({type:'group',name:'t:names.group',settings:{...NOSH,...s}},items)];
const section=(s,items)=>add({type:'section',settings:{...s}},items);
const C={horizontal_alignment_flex_direction_column:'center',horizontal_alignment:'center'};
const cw={width:'100%',alignment:'center'};

const sections={}; const order=[]; const put=(name,sec)=>{sections[name]=sec;order.push(name)};

// 1 HERO
put('hero',section({section_width:'full-width',section_height:'large',section_height_mobile:'large',color_scheme:'scheme-9',background_media:'image',toggle_overlay:true,overlay_color:'rgba(20,24,10,0.55)',horizontal_alignment_flex_direction_column:'center',vertical_alignment_flex_direction_column:'center',gap:20,'padding-block-start':80,'padding-block-end':80},[
 h('h1',"Heighten your Hotness: Your Kitchen's Secret Weapon",{...cw,type_preset:'custom',font_size:'6.0rem'}),
 p('The one bottle that replaces three: marinade, finishing oil, and cooking sauce',{...cw,type_preset:'custom',font_size:'2.2rem'}),
 group({content_direction:'row',horizontal_alignment:'center',gap:16,wrap:'wrap'},[btn('Discover the Difference','/collections/all'),btn('See Recipe Ideas','/blogs/recipes',{style_class:'button-secondary'})]),
 group({content_direction:'row',horizontal_alignment:'center',gap:32,wrap:'wrap','padding-block-start':24},[
  p('✓ Made with First-Press EVOO'),p('✓ Organic Habaneros'),p('✓ Virginia Small Batch Crafted')])
]));

// 2 VALUE PROP
const col=(ic,t,d)=>group({horizontal_alignment_flex_direction_column:'center',gap:12,width:'custom',custom_width:30,width_mobile:'fill'},[icon(ic,{width:56}),h('h3',t,{...cw}),p(d,{...cw})]);
put('value_prop',section({color_scheme:'scheme-1',gap:32,horizontal_alignment_flex_direction_column:'center','padding-block-start':72,'padding-block-end':72},[
 h('h2','The Super Condiment That Replaces 3 Bottles',cw),
 group({content_direction:'row',content_direction_mobile:'column',wrap:'wrap',horizontal_alignment:'center',vertical_alignment:'flex-start',gap:40,width:'fill'},[
  col('bottle','Marinade Base','For meal prep overnight magic. Transform plain proteins into restaurant-quality meals with depth and complexity.'),
  col('fire','Cooking Sauce','Stir-fry starter for 20-minute dinners. Add dimension to vegetables, proteins, and grains with one versatile ingredient.'),
  col('serving_dish','Finishing Oil','The final flourish for restaurant quality. Elevate any dish with a drizzle that brings heat, richness, and sophistication.')]),
 p('<strong>One bottle. Heightened possibilities.</strong> Mad Hatter ($24) vs. buying all 3 separately ($45+)',cw)
]));

// 3 TESTIMONIALS
const quote=(q,who)=>[id('testimonial_item'),add({type:'_testimonial-item',settings:{horizontal_alignment_flex_direction_column:'center',gap:12,'padding-block-start':24,'padding-block-end':24,'padding-inline-start':16,'padding-inline-end':16,...NOSH}},[
 [id('rating'),{type:'rating',name:'Rating',settings:{rating:5,gap:4,rated_color:'#f2a33a'},blocks:{}}],
 p(`“${q}”`,{...cw,type_preset:'custom',font_size:'1.8rem'}),
 p(`— ${who}`,{...cw,font_weight:'700'})])];
const testi=add({type:'testimonial',settings:{content_direction:'row',gap:24,columns_carousel:4,mobile_columns_carousel:'1.3',loop:false,navigation:'arrows',arrows_position:'bottom',...NOSH,'padding-block-start':0,'padding-block-end':0}},[
 quote('This replaced my olive oil, hot sauce, AND marinade. My meal prep game completely changed.','Sarah, 34, Mom of 2'),
 quote("We use it for everything from weeknight stir-fries to finishing our dinner party dishes. It's become our kitchen essential.",'Marcus & James, 36, Food Bloggers'),
 quote('Finally, a condiment that keeps up with my schedule. Quality ingredients, maximum versatility.','Linda, 41, Dinner Party Host'),
 quote("Started with the 'better than Sriracha' promise, stayed for the incredible depth of flavor. Now I use it on everything.",'Trevor, 29')]);
put('testimonials',section({color_scheme:'scheme-2',gap:32,horizontal_alignment_flex_direction_column:'center','padding-block-start':72,'padding-block-end':72},[
 h('h2','Trusted by Culinary Curators since 2012.',cw),[id('testimonial'),testi]]));

// 4 HOW IT WORKS
const step=(ic,t,d)=>group({horizontal_alignment_flex_direction_column:'center',gap:12,width:'custom',custom_width:30,width_mobile:'fill'},[icon(ic,{width:56}),h('h3',t,cw),p(d,cw)]);
put('how_it_works',section({color_scheme:'scheme-1',gap:32,horizontal_alignment_flex_direction_column:'center','padding-block-start':72,'padding-block-end':72},[
 h('h2','Three Ways to Transform Your Hotness',cw),
 group({content_direction:'row',content_direction_mobile:'column',wrap:'wrap',horizontal_alignment:'center',vertical_alignment:'flex-start',gap:40,width:'fill'},[
  step('pepper','1. Choose Your Heat','Mild, Medium, or Hot — all built on the same base of first-press extra virgin olive oil and organic habaneros.'),
  step('serving_dish','2. Use It Your Way','Marinate overnight, cook with confidence, or finish like a chef. One bottle adapts to your cooking style.'),
  step('check_mark','3. Taste the Difference','Made with ingredients you can pronounce. No fillers, no artificial flavors — just pure, versatile flavor.')]),
 btn('Shop Our Collection','/collections/all')]));

// 5 PRODUCT GRID (Ella's own product-grid block, cloned)
const idx=JSON.parse(fs.readFileSync(SRC+'/templates/index.json','utf8'));
let pg; for(const s of Object.values(idx.sections)) for(const b of Object.values(s.blocks||{})) if(b.type==='product-grid'&&!pg) pg=JSON.parse(JSON.stringify(b));
pg.settings={...pg.settings,collection:'all',products_to_show:4,columns_desktop:4,columns_desktop_carousel:4,product_grid_type:'grid',columns_gap:24,rows_gap:32,navigation:'none',progressbar_left:0,progressbar_right:0};
put('product_grid',section({color_scheme:'scheme-2',gap:32,horizontal_alignment_flex_direction_column:'center','padding-block-start':72,'padding-block-end':72},[
 h('h2','Find Your Perfect Match',cw),[id('product_grid'),pg],btn('Shop All Heat Levels','/collections/all')]));

// 6 INGREDIENT STORY
put('ingredient_story',section({color_scheme:'scheme-1',content_direction:'row',content_direction_mobile:'column',vertical_alignment:'center',gap:56,'padding-block-start':72,'padding-block-end':72},[
 group({width:'custom',custom_width:50,width_mobile:'fill'},[image({image_ratio:'portrait',border_radius:8})]),
 group({width:'custom',custom_width:50,width_mobile:'fill',gap:16},[
  h('h2','Quality You Can Taste'),
  p('We started with a simple question: what if hot sauce was built on extra virgin olive oil instead of vinegar?'),
  p('The answer changed everything. By using first-press EVOO as our base, we created something that works as a marinade, cooking sauce, and finishing oil — not just a condiment.'),
  p('Add in organic habanero peppers grown on our Virginia farm, and you get depth, versatility, and clean ingredients in every bottle.'),
  btn('Read Our Full Story','/pages/our-story')])]));

// 7 RECIPES
put('recipes_header',section({color_scheme:'scheme-2',gap:12,horizontal_alignment_flex_direction_column:'center','padding-block-start':72,'padding-block-end':0},[h('h2','Your New Go-To Recipes',cw)]));
const bp=readSchema(ROOT+'/sections/blog-posts.liquid').presets[0];
sections.recipes={type:'blog-posts',blocks:bp.blocks,block_order:bp.block_order,settings:{...(bp.settings||{}),blog:'recipes',layout_type:'grid',articles_to_show:3,columns_grid:3,color_scheme:'scheme-2'}};order.push('recipes');
put('recipes_cta',section({color_scheme:'scheme-2',horizontal_alignment_flex_direction_column:'center','padding-block-start':24,'padding-block-end':72},[btn('Explore All Recipes','/blogs/recipes')]));

// 8 EMAIL
put('email',section({color_scheme:'scheme-7',section_width:'full-width',background_media:'image',toggle_overlay:true,overlay_color:'rgba(20,24,10,0.6)',gap:16,horizontal_alignment_flex_direction_column:'center','padding-block-start':88,'padding-block-end':88},[
 h('h2',"Join The Curator's Kitchen",cw),
 p('Get our top 10 weeknight recipes plus 15% off your first order',cw),
 [id('email_signup'),{type:'email-signup',settings:{},blocks:{}}],
 p("Join 3,800+ home cooks who've discovered the secret to easier, better-tasting meals. Unsubscribe anytime.",{...cw,type_preset:'custom',font_size:'1.2rem'})]));

// 9 FINAL CTA
put('final_cta',section({color_scheme:'scheme-1',gap:20,horizontal_alignment_flex_direction_column:'center','padding-block-start':88,'padding-block-end':88},[
 h('h2','Ready to Transform Your Cooking?',cw),
 p("Whether you're mastering meal prep, elevating weeknight dinners, or hosting your next dinner party, Mad Hatter gives you the versatility you need in one beautiful bottle.",{...cw,width:'custom',unit:'pixel',custom_width_pixel:720}),
 btn('Shop Bundles & Save','/collections/bundles',{buttons_padding_vertical:16,buttons_padding_horizontal:40})]));

fs.writeFileSync(ROOT+'/templates/index.json',JSON.stringify({sections,order},null,2));
console.log('wrote index.json',order.join(','));

