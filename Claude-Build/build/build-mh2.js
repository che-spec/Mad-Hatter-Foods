// Mad Hatter content on the HAB-style layout ("v2"):  node build/build-mh2.js  ->  madhatter-v2-theme
const path = require('path');
const { fs, h, p, btn, image, group, section, cw, id, add } = require('./lib');
const SRC = path.join(__dirname, '..', '..', 'ella-7.3.1-theme-source');
const T = path.join(__dirname, '..', 'madhatter-v2-theme');
const clone = o => JSON.parse(JSON.stringify(o));
const rd = f => JSON.parse(fs.readFileSync(path.join(T, f), 'utf8'));
const wr = (f, o) => fs.writeFileSync(path.join(T, f), JSON.stringify(o, null, 2));

fs.rmSync(T, { recursive: true, force: true });
fs.cpSync(SRC, T, { recursive: true });

// ---------- brand settings ----------
const sd = rd('config/settings_data.json');
const setScheme = (n, o) => Object.assign(sd.current.color_schemes[n].settings, o);
setScheme('scheme-1', { background: '#fbf7ef', foreground_heading: '#2b2a1f', foreground: '#3d3b2e', primary: '#c8461c', primary_hover: '#9e3411', border: '#e2d9c3', primary_button_background: '#c8461c', primary_button_text: '#ffffff', primary_button_border: '#c8461c' });
setScheme('scheme-2', { background: '#f1ead9', foreground_heading: '#2b2a1f', foreground: '#3d3b2e', primary: '#c8461c', primary_hover: '#9e3411', border: '#e2d9c3', primary_button_background: '#2f3a1f', primary_button_text: '#ffffff', primary_button_border: '#2f3a1f' });
setScheme('scheme-7', { background: '#2f3a1f', foreground_heading: '#fbf7ef', foreground: '#efe7d2', primary: '#f2a33a', primary_hover: '#ffffff', border: '#4a5735', primary_button_background: '#f2a33a', primary_button_text: '#2b2a1f', primary_button_border: '#f2a33a' });
setScheme('scheme-9', { foreground_heading: '#ffffff', foreground: '#ffffff', primary_button_background: '#c8461c', primary_button_text: '#ffffff', primary_button_border: '#c8461c' });
sd.current.type_header_font = 'playfair_display_n7';
sd.current.type_subheading_font = 'jost_n5';
sd.current.type_body_font = 'jost_n4';
wr('config/settings_data.json', sd);

// ---------- header / announcement ----------
const hg = rd('sections/header-group.json');
const ab = hg.sections.announcement_bar_4tGfEp.blocks.group_announcement_bar_PeTpTw;
ab.settings.justify_content = 'center';
const agrp = ab.blocks.group_announcement_9yj6cq;
const base = agrp.blocks.announcement_text_BXhKCE;
const msgs = ['Free Shipping on Orders $50+', 'Virginia-Crafted with Organic Ingredients', 'Trusted by 2,000+ Home Cooks'];
agrp.blocks = {}; agrp.block_order = [];
msgs.forEach((m, i) => { const k = 'announcement_text_mh' + i; const b = clone(base); b.settings.text = m; agrp.blocks[k] = b; agrp.block_order.push(k); });
agrp.settings.autoplay = true; agrp.settings.autoplay_speed = 4;
const hd = hg.sections.header_default;
const mega = clone(hd.blocks.mega_menu_1_mDeNwB);
mega.settings.menu_item = 'Shop'; mega.settings.grid = '4';
hd.blocks = { mega_menu_shop: mega }; hd.block_order = ['mega_menu_shop'];
wr('sections/header-group.json', hg);

// ---------- footer ----------
const fg = rd('sections/footer-group.json');
const f = fg.sections.footer;
const g1 = f.blocks.footer_group_GQfP9p;
const nl = g1.blocks.footer_column_PrDPi9.blocks;
nl.text_xCYFNJ.settings.text = "<p><strong>JOIN THE CURATOR'S KITCHEN</strong></p>";
nl.text_DVPXXh.settings.text = '<p>Get recipes, cooking tips, and exclusive offers</p>';
nl.email_signup_nDhCiH.settings.label = 'SUBSCRIBE';
const cols = g1.blocks.footer_column_RKxXJk;
const proto = cols.blocks.menu_VeyxGm;
const defs = [['SHOP', 'footer-shop'], ['LEARN', 'footer-learn'], ['COMMUNITY', 'footer-community'], ['COMPANY', 'footer-company']];
cols.blocks = {}; cols.block_order = [];
defs.forEach(([hd_, m], i) => { const k = 'menu_mh' + i; const b = clone(proto); b.settings.heading = hd_; b.settings.menu = m; cols.blocks[k] = b; cols.block_order.push(k); });
const g2 = f.blocks.group_7TgywR;
g2.blocks.jumbo_text_m86KDV.settings.text = 'Mad Hatter';
const ut = g2.blocks.group_dxaAmj;
ut.blocks.text_zeTjRU.settings.text = '<p>Trusted by 2,000+ Home Cooks</p>';
ut.blocks.footer_utilities_9EkiGA.blocks['utilities-text'].blocks.text_kMW3qc.settings.text = '<p>Crafted in Virginia.</p>';
wr('sections/footer-group.json', fg);

// ---------- homepage ----------
const idx = JSON.parse(fs.readFileSync(path.join(SRC, 'templates/index.json'), 'utf8'));
let pgTpl;
for (const s of Object.values(idx.sections)) for (const b of Object.values(s.blocks || {})) if (b.type === 'product-grid' && !pgTpl) pgTpl = b;
const grid = (collection, type, cols_) => {
  const g = clone(pgTpl);
  g.settings = { ...g.settings, collection, products_to_show: 8, columns_desktop: cols_, columns_desktop_carousel: cols_, product_grid_type: type, columns_gap: 20, rows_gap: 32, navigation: type === 'carousel' ? 'arrows' : 'none', progressbar_left: 0, progressbar_right: 0 };
  return [id('product_grid'), g];
};
const sections = {}, order = [];
const put = (k, s) => { sections[k] = s; order.push(k); };
const CEN = { horizontal_alignment_flex_direction_column: 'center' };
const PAD = { 'padding-block-start': 72, 'padding-block-end': 72 };
const H = (t, s = {}) => h('h2', t, { ...cw, ...s });
const NARROW = { ...cw, width: 'custom', unit: 'pixel', custom_width_pixel: 760 };

// 1 hero
put('hero', section({ section_width: 'full-width', section_height: 'large', section_height_mobile: 'large', color_scheme: 'scheme-9', background_media: 'image', toggle_overlay: true, overlay_color: 'rgba(20,24,10,0.55)', ...CEN, gap: 18 }, [
  h('h1', "Heighten your Hotness: Your Kitchen's Secret Weapon", { ...cw, type_preset: 'custom', font_size: '6.0rem' }),
  p('The one bottle that replaces three: marinade, finishing oil, and cooking sauce', { ...cw, type_preset: 'custom', font_size: '2.0rem' }),
  group({ content_direction: 'row', horizontal_alignment: 'center', gap: 16, wrap: 'wrap' }, [btn('Discover the Difference', '/collections/all'), btn('See Recipe Ideas', '/blogs/recipes', { style_class: 'button-secondary' })]),
  group({ content_direction: 'row', horizontal_alignment: 'center', gap: 32, wrap: 'wrap', 'padding-block-start': 20 }, [p('✓ Made with First-Press EVOO'), p('✓ Organic Habaneros'), p('✓ Virginia Small Batch Crafted')])
]));

// 2 build a pack
put('build_pack', section({ color_scheme: 'scheme-7', content_direction: 'row', content_direction_mobile: 'column', vertical_alignment: 'center', gap: 56, ...PAD }, [
  group({ width: 'custom', custom_width: 50, width_mobile: 'fill', gap: 16 }, [
    p('<strong>BUNDLES &amp; PACKS</strong>', { case: 'uppercase', color: 'var(--color-primary)' }),
    h('h2', 'Stock the Kitchen, Save $7'),
    p('Pick your heat — Mild, Medium, or Hot — and grab the Meal Prep Pack. Three bottles, one price, and a pantry that\'s ready for marinades, weeknight stir-fries, and dinner parties.'),
    btn('Shop Bundles & Save', '/collections/bundles')]),
  group({ width: 'custom', custom_width: 50, width_mobile: 'fill' }, [image({ image_ratio: 'square', border_radius: 8 })])
]));

// 3 replaces 3 bottles
const val = (t, d) => group({ horizontal_alignment_flex_direction_column: 'center', gap: 10, width: 'custom', custom_width: 30, width_mobile: 'fill' }, [h('h3', t, cw), p(d, cw)]);
put('value_prop', section({ color_scheme: 'scheme-1', gap: 32, ...CEN, ...PAD }, [
  H('The Super Condiment That Replaces 3 Bottles'),
  group({ content_direction: 'row', content_direction_mobile: 'column', wrap: 'wrap', horizontal_alignment: 'center', vertical_alignment: 'flex-start', gap: 40, width: 'fill' }, [
    val('Marinade Base', 'For meal prep overnight magic. Transform plain proteins into restaurant-quality meals with depth and complexity.'),
    val('Cooking Sauce', 'Stir-fry starter for 20-minute dinners. Add dimension to vegetables, proteins, and grains with one versatile ingredient.'),
    val('Finishing Oil', 'The final flourish for restaurant quality. Elevate any dish with a drizzle that brings heat, richness, and sophistication.')]),
  p('<strong>One bottle. Heightened possibilities.</strong> Mad Hatter ($24) vs. buying all 3 separately ($45+)', cw)
]));

// 4 bestsellers
put('bestsellers', section({ color_scheme: 'scheme-2', gap: 28, ...CEN, ...PAD }, [
  H('Find Your Perfect Match'),
  p('Mild, Medium, or Hot — all built on first-press extra virgin olive oil and organic habaneros.', NARROW),
  grid('all', 'carousel', 4),
  btn('Shop All', '/collections/all', { style_class: 'button-secondary' })
]));

// 5 reviews
const quote = (q, who) => [id('testimonial_item'), add({ type: '_testimonial-item', settings: { horizontal_alignment_flex_direction_column: 'center', gap: 12, 'padding-block-start': 24, 'padding-block-end': 24, 'padding-inline-start': 20, 'padding-inline-end': 20, shadow_color: 'rgba(0,0,0,0)' } }, [
  [id('rating'), { type: 'rating', name: 'Rating', settings: { rating: 5, gap: 4, rated_color: '#f2a33a' }, blocks: {} }],
  p(`“${q}”`, { ...cw }),
  p(`<strong>— ${who}</strong>`, { ...cw })])];
const testi = add({ type: 'testimonial', settings: { content_direction: 'row', gap: 24, columns_carousel: 4, mobile_columns_carousel: '1.3', loop: false, navigation: 'arrows', arrows_position: 'bottom', shadow_color: 'rgba(0,0,0,0)', 'padding-block-start': 0, 'padding-block-end': 0 } }, [
  quote('This replaced my olive oil, hot sauce, AND marinade. My meal prep game completely changed.', 'Sarah, 34, Mom of 2'),
  quote("We use it for everything from weeknight stir-fries to finishing our dinner party dishes. It's become our kitchen essential.", 'Marcus & James, 36, Food Bloggers'),
  quote('Finally, a condiment that keeps up with my schedule. Quality ingredients, maximum versatility.', 'Linda, 41, Dinner Party Host'),
  quote("Started with the 'better than Sriracha' promise, stayed for the incredible depth of flavor. Now I use it on everything.", 'Trevor, 29')]);
put('reviews', section({ color_scheme: 'scheme-1', gap: 28, ...CEN, ...PAD }, [
  H('Trusted by Culinary Curators since 2012.'),
  [id('testimonial'), testi]
]));

// 6 bundles grid
put('bundles', section({ color_scheme: 'scheme-2', gap: 28, ...CEN, ...PAD }, [
  H('Bundles & Gift Sets'),
  p('Save more with a pack, or send the gift that cooks. Gift Sets include 3 bottles and recipe cards.', NARROW),
  grid('bundles', 'grid', 3),
  btn('View all', '/collections/bundles', { style_class: 'button-secondary' })
]));

// 7 recipes
put('recipes_header', section({ color_scheme: 'scheme-1', ...CEN, 'padding-block-start': 72, 'padding-block-end': 0 }, [H('Your New Go-To Recipes')]));
const bp = JSON.parse(fs.readFileSync(path.join(T, 'sections/blog-posts.liquid'), 'utf8').split('{% schema %}')[1].split('{% endschema %}')[0]).presets[0];
sections.recipes = { type: 'blog-posts', blocks: bp.blocks, block_order: bp.block_order, settings: { ...(bp.settings || {}), blog: 'recipes', layout_type: 'grid', articles_to_show: 3, columns_grid: 3, color_scheme: 'scheme-1' } };
order.push('recipes');
put('recipes_cta', section({ color_scheme: 'scheme-1', ...CEN, 'padding-block-start': 24, 'padding-block-end': 72 }, [btn('Explore All Recipes', '/blogs/recipes', { style_class: 'button-secondary' })]));

// 8 why mad hatter
const why = (t, d) => group({ gap: 10, width: 'custom', custom_width: 31, width_tablet: 'custom', custom_width_tablet: 48, width_mobile: 'fill' }, [image({ border_radius: 8 }), h('h3', t), p(d)]);
put('why', section({ color_scheme: 'scheme-2', gap: 32, ...CEN, ...PAD }, [
  H('Why Choose Mad Hatter?'),
  p('Out of all the hot sauces out there, here\'s why we think Mad Hatter earns a spot on your counter.', NARROW),
  group({ content_direction: 'row', content_direction_mobile: 'column', wrap: 'wrap', horizontal_alignment: 'center', vertical_alignment: 'flex-start', gap: 28, width: 'fill' }, [
    why('Built on First-Press EVOO', 'Most hot sauces use vinegar or water as a base. We use premium extra virgin olive oil, so Mad Hatter works at high temperatures, penetrates marinades deeper, and adds richness instead of just acid.'),
    why('Organic Habaneros, Grown by Us', 'We grow our own organic habanero peppers on our Virginia farm and harvest at peak flavor — not just peak heat.'),
    why('Small-Batch Crafted in Virginia', 'Small-batch production means we control every step, from blending to bottling.'),
    why('Clean Ingredients', 'No fillers, no artificial flavors, colors, or preservatives. If you can\'t pronounce it, it\'s not in our bottles.'),
    why('Versatility Over Gimmicks', 'We\'re not chasing the world\'s hottest sauce. We\'re making the most useful one — the bottle home cooks reach for every day.')])
]));

// 9 FAQ
const faqs = [
  ['Where is Mad Hatter made?', 'Mad Hatter is crafted in small batches in Virginia, with organic habanero peppers grown on our own farm.'],
  ['How do I use it?', 'Three ways: as a marinade (mix 2 parts Mad Hatter to 1 part lemon juice or vinegar), as a cooking sauce (1–2 tablespoons in stir-fries and sautés), or as a finishing oil drizzled over pizza, eggs, roasted vegetables, or grilled meats.'],
  ['Is Mad Hatter vegan and gluten-free?', 'Yes — it contains no common allergens and is gluten-free, dairy-free, and vegan.'],
  ['How hot is it?', 'Choose Mild, Medium, or Hot. Medium enhances without overwhelming — flavor and warmth without the burn.'],
  ['How long does shipping take?', 'Orders ship within 1–2 business days. Free shipping on orders $50+; standard (3–5 business days) is $6.99 and expedited (2–3 business days) is $12.99.'],
  ['What is your return policy?', 'We want you to love Mad Hatter. If you\'re not satisfied, contact us within 30 days for a full refund or exchange.'],
  ['How should I store it?', 'Store in a cool, dark place and shake before each use. Best within 12 months of opening; refrigeration is optional but recommended after opening.'],
  ['Do you offer wholesale?', 'Yes. Use our wholesale inquiry form to carry Mad Hatter in your store.']];
const acc = add({ type: 'accordion', settings: { dividers: true } }, faqs.map(([q, a], i) => [id('accordion_row'), add({ type: '_accordion-row', settings: { heading: q, open_by_default: i === 0 } }, [p(a)])]));
put('faq', section({ color_scheme: 'scheme-1', gap: 24, ...CEN, ...PAD }, [
  H('Frequently Asked Questions'),
  group({ width: 'custom', custom_width: 80, width_mobile: 'fill' }, [[id('accordion'), acc]])
]));

// 10 newsletter
put('newsletter', section({ color_scheme: 'scheme-7', section_width: 'full-width', background_media: 'image', toggle_overlay: true, overlay_color: 'rgba(20,24,10,0.6)', gap: 14, ...CEN, 'padding-block-start': 88, 'padding-block-end': 88 }, [
  H("Join The Curator's Kitchen"),
  p('Get our top 10 weeknight recipes plus 15% off your first order', cw),
  [id('email_signup'), { type: 'email-signup', settings: {}, blocks: {} }],
  p("Join 3,800+ home cooks who've discovered the secret to easier, better-tasting meals. Unsubscribe anytime.", { ...cw, type_preset: 'custom', font_size: '1.2rem' })
]));

// 11 final CTA
put('final_cta', section({ color_scheme: 'scheme-1', gap: 20, ...CEN, 'padding-block-start': 88, 'padding-block-end': 88 }, [
  H('Ready to Transform Your Cooking?'),
  p("Whether you're mastering meal prep, elevating weeknight dinners, or hosting your next dinner party, Mad Hatter gives you the versatility you need in one beautiful bottle.", NARROW),
  btn('Shop Bundles & Save', '/collections/bundles', { buttons_padding_vertical: 16, buttons_padding_horizontal: 40 })
]));

wr('templates/index.json', { sections, order });
console.log('Mad Hatter v2 built:', order.join(', '));
