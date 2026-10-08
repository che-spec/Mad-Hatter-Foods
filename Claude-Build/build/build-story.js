const {fs,h,p,btn,icon,image,group,section,cw}=require('./lib');
const T=process.argv[2];
const sections={},order=[];const put=(k,s)=>{sections[k]=s;order.push(k)};
const PAD={'padding-block-start':72,'padding-block-end':72};
const CEN={horizontal_alignment_flex_direction_column:'center'};

put('hero',section({section_width:'full-width',section_height:'large',section_height_mobile:'large',color_scheme:'scheme-9',background_media:'image',toggle_overlay:true,overlay_color:'rgba(20,24,10,0.55)',...CEN,gap:20},[
 h('h1','From Our Farm to Your Kitchen',{...cw,type_preset:'custom',font_size:'6.0rem'}),
 p('How a simple question — “what if hot sauce was made with EVOO instead of vinegar?” — changed everything.',{...cw,type_preset:'custom',font_size:'2.2rem',width:'custom',unit:'pixel',custom_width_pixel:760})]));

put('origin',section({color_scheme:'scheme-1',content_direction:'row',content_direction_mobile:'column',vertical_alignment:'center',gap:56,...PAD},[
 group({width:'custom',custom_width:55,width_mobile:'fill',gap:16},[
  h('h2','It Started With Frustration'),
  p('I was tired of hot sauces that only added heat. I wanted something that added complexity, that could work as more than just a finishing drizzle. Something built on quality ingredients that respected the food instead of just burning through it.'),
  p('So I asked a simple question: what if we started with extra virgin olive oil instead of vinegar?'),
  p('That question became an obsession. Hundreds of batches later, Mad Hatter was born — a hot sauce that works as a marinade, cooking oil, and finishing touch. Something that replaces three bottles in your kitchen with one.'),
  p('<em>— [Founder Name], Founder</em>')]),
 group({width:'custom',custom_width:45,width_mobile:'fill'},[image({image_ratio:'portrait',border_radius:8})])]));

const diff=(ic,kicker,t,d)=>group({horizontal_alignment_flex_direction_column:'center',gap:12,width:'custom',custom_width:30,width_mobile:'fill'},[icon(ic,{width:56}),p(`<strong>${kicker}</strong>`,{...cw,case:'uppercase'}),h('h3',t,cw),p(d,cw)]);
put('difference',section({color_scheme:'scheme-2',gap:32,...CEN,...PAD},[
 h('h2','What Makes Mad Hatter Different',cw),
 group({content_direction:'row',content_direction_mobile:'column',wrap:'wrap',horizontal_alignment:'center',vertical_alignment:'flex-start',gap:40,width:'fill'},[
  diff('bottle','The Base','First-Press Extra Virgin Olive Oil','Most hot sauces use vinegar or water as a base. We use premium EVOO, which means Mad Hatter works at high temperatures, penetrates marinades deeper, and adds richness instead of just acid.'),
  diff('pepper','The Peppers','Organic Habaneros From Our Virginia Farm','We grow our own organic habanero peppers on our farm in Virginia. This gives us complete control over quality and allows us to harvest at peak flavor — not just peak heat.'),
  diff('check_mark','The Philosophy','Versatility Over Gimmicks',"We're not trying to create the world's hottest sauce. We're creating the world's most useful sauce. One that home cooks actually reach for every day, not just on taco Tuesday.")])]));

const val=(ic,t,d)=>group({horizontal_alignment_flex_direction_column:'center',gap:10,width:'custom',custom_width:22,width_tablet:'custom',custom_width_tablet:45,width_mobile:'fill'},[icon(ic,{width:48}),h('h3',t,cw),p(d,cw)]);
put('values',section({color_scheme:'scheme-1',gap:32,...CEN,...PAD},[
 h('h2','What We Stand For',cw),
 group({content_direction:'row',content_direction_mobile:'column',wrap:'wrap',horizontal_alignment:'center',vertical_alignment:'flex-start',gap:32,width:'fill'},[
  val('leaf','Quality Ingredients',"No fillers, no artificial colors, no preservatives. If you can't pronounce it, it's not in our bottles."),
  val('plant','Sustainable Farming','Our peppers are grown using organic practices that respect the land and our community.'),
  val('serving_dish','Kitchen Efficiency','We believe cooking should be easier, not harder. One versatile tool beats a cabinet full of single-use condiments.'),
  val('heart','Community First',"We're not just selling sauce — we're building a community of home cooks who believe in real ingredients and real food.")])]));

const steps=[['Grow','Our organic habanero peppers are grown on our Virginia farm without synthetic pesticides or fertilizers.'],['Harvest','We harvest by hand at peak ripeness — when flavor is at its maximum, not just heat.'],['Craft','Small-batch production means we control every aspect, from blending to bottling.'],['Share','Every bottle is inspected, labeled, and shipped with care from our facility to your kitchen.']];
put('process',section({color_scheme:'scheme-2',gap:32,...CEN,...PAD},[
 h('h2','How We Make It',cw),
 group({content_direction:'row',content_direction_mobile:'column',wrap:'wrap',horizontal_alignment:'center',vertical_alignment:'flex-start',gap:28,width:'fill'},
  steps.map(([t,d],i)=>group({gap:12,width:'custom',custom_width:22,width_tablet:'custom',custom_width_tablet:45,width_mobile:'fill'},[image({image_ratio:'square',border_radius:8}),h('h3',`${i+1}. ${t}`),p(d)])))]));

put('cta',section({color_scheme:'scheme-7',gap:20,...CEN,'padding-block-start':88,'padding-block-end':88},[
 h('h2','Taste the Difference',cw),
 p('Quality ingredients. Small-batch care. Infinite versatility. Experience what 2,000+ home cooks already know.',cw),
 btn('Shop Now','/collections/all',{buttons_padding_vertical:16,buttons_padding_horizontal:40})]));

fs.writeFileSync(T+'/templates/page.our-story.json',JSON.stringify({sections,order},null,2));
console.log('wrote page.our-story.json');
