// Builds the HAB Sauce theme from Ella 7.3.1:  node build/build-hab.js
const path = require('path');
const { fs, h, p, btn, icon, image, group, section, cw, id, add } = require('./lib');
const SRC = path.join(__dirname, '..', '..', 'ella-7.3.1-theme-source');
const T = path.join(__dirname, '..', 'habsauce-theme');
const clone = o => JSON.parse(JSON.stringify(o));
const rd = f => JSON.parse(fs.readFileSync(path.join(T, f), 'utf8'));
const wr = (f, o) => fs.writeFileSync(path.join(T, f), JSON.stringify(o, null, 2));

fs.rmSync(T, { recursive: true, force: true });
fs.cpSync(SRC, T, { recursive: true });

// ---------- brand settings ----------
const sd = rd('config/settings_data.json');
const setScheme = (n, o) => Object.assign(sd.current.color_schemes[n].settings, o);
setScheme('scheme-1', { background: '#ffffff', foreground_heading: '#0d0d0d', foreground: '#2a2a2a', primary: '#d6281f', primary_hover: '#a81b14', border: '#e3e3e3', primary_button_background: '#d6281f', primary_button_text: '#ffffff', primary_button_border: '#d6281f' });
setScheme('scheme-2', { background: '#f4f1ea', foreground_heading: '#0d0d0d', foreground: '#2a2a2a', primary: '#d6281f', primary_hover: '#a81b14', border: '#e3dccb', primary_button_background: '#0d0d0d', primary_button_text: '#ffffff', primary_button_border: '#0d0d0d' });
setScheme('scheme-7', { background: '#0d0d0d', foreground_heading: '#ffffff', foreground: '#e8e8e8', primary: '#3fae49', primary_hover: '#ffffff', border: '#2e2e2e', primary_button_background: '#d6281f', primary_button_text: '#ffffff', primary_button_border: '#d6281f' });
setScheme('scheme-9', { foreground_heading: '#ffffff', foreground: '#ffffff', primary_button_background: '#d6281f', primary_button_text: '#ffffff', primary_button_border: '#d6281f' });
sd.current.type_header_font = 'anton_n4';
sd.current.type_subheading_font = 'inter_n7';
sd.current.type_body_font = 'inter_n4';
wr('config/settings_data.json', sd);

// ---------- header / announcement ----------
let hg = rd('sections/header-group.json');
const ab = hg.sections.announcement_bar_4tGfEp.blocks.group_announcement_bar_PeTpTw;
ab.settings.justify_content = 'center';
const agrp = ab.blocks.group_announcement_9yj6cq;
agrp.blocks.announcement_text_BXhKCE.settings.text = 'HAB SAUCE WINS BEST SAUCES AWARD — <a href="/blogs/news">Read the story</a>';
const hd = hg.sections.header_default;
const mega = clone(hd.blocks.mega_menu_1_mDeNwB);
mega.settings.menu_item = 'Hot Sauce';
mega.settings.grid = '5';
hd.blocks = { mega_menu_hot_sauce: mega };
hd.block_order = ['mega_menu_hot_sauce'];
wr('sections/header-group.json', hg);

// ---------- footer ----------
let fg = rd('sections/footer-group.json');
const f = fg.sections.footer;
const g1 = f.blocks.footer_group_GQfP9p;
const nl = g1.blocks.footer_column_PrDPi9.blocks;
nl.text_xCYFNJ.settings.text = '<p><strong>SIGN UP FOR SAUCE DROPS</strong></p>';
nl.text_DVPXXh.settings.text = '<p>Be the first to know about new sauce drops, events, exclusive deals, and insider news.</p>';
nl.email_signup_nDhCiH.settings.label = 'SIGN UP';
const cols = g1.blocks.footer_column_RKxXJk;
const menu = cols.blocks.menu_VeyxGm;
menu.settings.heading = 'OUR COMPANY';
menu.settings.menu = 'footer-company';
const about = cols.blocks.group_mzpiqy;
about.blocks.text_EQtpkz.settings.text = '<p><strong>SMALL BATCH HOT SAUCE</strong></p>';
about.blocks.group_MVhyaq.blocks = {
  text_tag: { ...clone(about.blocks.group_MVhyaq.blocks.text_yLGza6), settings: { ...about.blocks.group_MVhyaq.blocks.text_yLGza6.settings, text: '<p>Made by hand, using high-quality ingredients to deliver unforgettable heat and flavor for food lovers and spice enthusiasts alike.</p>' } }
};
about.blocks.group_MVhyaq.block_order = ['text_tag'];
cols.blocks = { menu_company: menu, group_about: about };
cols.block_order = ['menu_company', 'group_about'];
const g2 = f.blocks.group_7TgywR;
g2.blocks.jumbo_text_m86KDV.settings.text = 'HAB Sauce';
const ut = g2.blocks.group_dxaAmj;
ut.blocks.text_zeTjRU.settings.text = '<p>Small batch hot sauce — Portland, Oregon</p>';
ut.blocks.footer_utilities_9EkiGA.blocks['utilities-text'].blocks.text_kMW3qc.settings.text = '<p>Made in the Northwest.</p>';
wr('sections/footer-group.json', fg);

// ---------- homepage ----------
const idx = JSON.parse(fs.readFileSync(path.join(SRC, 'templates/index.json'), 'utf8'));
let pgTpl;
for (const s of Object.values(idx.sections)) for (const b of Object.values(s.blocks || {})) if (b.type === 'product-grid' && !pgTpl) pgTpl = b;
const grid = (collection, type, cols) => {
  const g = clone(pgTpl);
  g.settings = { ...g.settings, collection, products_to_show: 8, columns_desktop: cols, columns_desktop_carousel: cols, product_grid_type: type, columns_gap: 20, rows_gap: 32, navigation: type === 'carousel' ? 'arrows' : 'none', progressbar_left: 0, progressbar_right: 0 };
  return [id('product_grid'), g];
};
const sections = {}, order = [];
const put = (k, s) => { sections[k] = s; order.push(k); };
const CEN = { horizontal_alignment_flex_direction_column: 'center' };
const PAD = { 'padding-block-start': 72, 'padding-block-end': 72 };
const H = (t, s = {}) => h('h2', t, { ...cw, case: 'uppercase', ...s });

// 1 hero
put('hero', section({ section_width: 'full-width', section_height: 'large', section_height_mobile: 'large', color_scheme: 'scheme-9', background_media: 'image', toggle_overlay: true, overlay_color: 'rgba(0,0,0,0.45)', ...CEN, gap: 18 }, [
  h('h1', 'GET SOME CRACK', { ...cw, type_preset: 'custom', font_size: '10.0rem', case: 'uppercase' }),
  p('Green Chile Crack Sauce — label by @kujorock', { ...cw, type_preset: 'custom', font_size: '2.0rem' }),
  btn('Shop Green Chile Crack Sauce', '/products/green-chile-crack-sauce', { buttons_padding_vertical: 16, buttons_padding_horizontal: 40 })
]));

// 2 build your own
put('build_box', section({ color_scheme: 'scheme-7', content_direction: 'row', content_direction_mobile: 'column', vertical_alignment: 'center', gap: 56, ...PAD }, [
  group({ width: 'custom', custom_width: 50, width_mobile: 'fill', gap: 16 }, [
    p('<strong>UNIQUE HOT SAUCES</strong>', { case: 'uppercase', color: 'var(--color-primary)' }),
    h('h2', 'Build Your Own Sauce Box', { case: 'uppercase' }),
    p('Small-batch, artist-collab flavors like Asian Hickory BBQ, Spicy Soy, and Oregon Seaweed Chili Crisp. Made in the Northwest — Portland, Oregon specifically.'),
    btn('Build Your Sauce Box', '/pages/build-a-box')]),
  group({ width: 'custom', custom_width: 50, width_mobile: 'fill' }, [image({ image_ratio: 'square', border_radius: 8 })])
]));

// 3 award winners
put('awards', section({ color_scheme: 'scheme-1', gap: 28, ...CEN, ...PAD }, [
  H('Award Winning Sauces'),
  p('HAB Sauce brings home hardware. 🏆 With 50+ awards for its bold, small-batch sauces, HAB was crowned the #1 World\'s Best Small-Batch Hot Sauce Company by Old Boney Mountain in 2025.', { ...cw, width: 'custom', unit: 'pixel', custom_width_pixel: 760 }),
  grid('award-winners', 'carousel', 4),
  btn('View all', '/collections/award-winners', { style_class: 'button-secondary' })
]));

// 4 reviews
const quote = (q, who) => [id('testimonial_item'), add({ type: '_testimonial-item', settings: { horizontal_alignment_flex_direction_column: 'center', gap: 12, 'padding-block-start': 24, 'padding-block-end': 24, 'padding-inline-start': 20, 'padding-inline-end': 20, shadow_color: 'rgba(0,0,0,0)' } }, [
  [id('rating'), { type: 'rating', name: 'Rating', settings: { rating: 5, gap: 4, rated_color: '#d6281f' }, blocks: {} }],
  p(`“${q}”`, { ...cw }),
  p(`<strong>${who}</strong>`, { ...cw })])];
const testi = add({ type: 'testimonial', settings: { content_direction: 'row', gap: 24, columns_carousel: 3, mobile_columns_carousel: '1.3', loop: false, navigation: 'arrows', arrows_position: 'bottom', shadow_color: 'rgba(0,0,0,0)', 'padding-block-start': 0, 'padding-block-end': 0 } }, [
  quote('It has a well balanced medium between the sweet, rich cocoa, and heat…', 'William'),
  quote('Incredible flavor, killer quality, and stellar customer service/shipping…', 'Justin'),
  quote('The ultimate dill pickle hot sauce (if your coworkers don\'t steal it…)', 'Justin'),
  quote('I LOVE this smoked hot sauce!!', 'Kelli'),
  quote('One of the GOAT verde sauces!!! I can\'t even count how many bottles…', 'Guy')]);
put('reviews', section({ color_scheme: 'scheme-2', gap: 28, ...CEN, ...PAD }, [
  H('Let customers speak for us'),
  p('from 176 reviews', cw),
  [id('testimonial'), testi]
]));

// 5 chili crisps
put('crisps', section({ color_scheme: 'scheme-1', gap: 28, ...CEN, ...PAD }, [
  H('Chili Crisps'),
  p('Discover HAB Sauce Chili Crisps — small batch, bold, and flavorful. Perfect for rice, noodles, veggies & more. Vegan, gluten-free, and packed with heat.', { ...cw, width: 'custom', unit: 'pixel', custom_width_pixel: 760 }),
  grid('chili-crisps', 'grid', 3),
  btn('View all', '/collections/chili-crisps', { style_class: 'button-secondary' })
]));

// 6 blog
put('blog_header', section({ color_scheme: 'scheme-2', ...CEN, 'padding-block-start': 72, 'padding-block-end': 0 }, [H('From the Lab')]));
const bp = JSON.parse(fs.readFileSync(path.join(T, 'sections/blog-posts.liquid'), 'utf8').split('{% schema %}')[1].split('{% endschema %}')[0]).presets[0];
sections.blog = { type: 'blog-posts', blocks: bp.blocks, block_order: bp.block_order, settings: { ...(bp.settings || {}), blog: 'news', layout_type: 'grid', articles_to_show: 2, columns_grid: 2, color_scheme: 'scheme-2' } };
order.push('blog');
put('blog_cta', section({ color_scheme: 'scheme-2', ...CEN, 'padding-block-start': 24, 'padding-block-end': 72 }, [btn('View all', '/blogs/news', { style_class: 'button-secondary' })]));

// 7 why choose
const why = (t, d) => group({ gap: 10, width: 'custom', custom_width: 31, width_tablet: 'custom', custom_width_tablet: 48, width_mobile: 'fill' }, [image({ border_radius: 8 }), h('h3', t, { case: 'uppercase' }), p(d)]);
put('why', section({ color_scheme: 'scheme-1', gap: 32, ...CEN, ...PAD }, [
  H('Why choose HAB Sauce?'),
  p('Out of all of the hot sauce brands out there, this is why we believe you should trust HAB Sauce with your food…', { ...cw, width: 'custom', unit: 'pixel', custom_width_pixel: 760 }),
  group({ content_direction: 'row', content_direction_mobile: 'column', wrap: 'wrap', horizontal_alignment: 'center', vertical_alignment: 'flex-start', gap: 28, width: 'fill' }, [
    why('Flavor Comes First. Always.', "We don't believe great sauce is about overwhelming heat, it's about creating bold, unforgettable flavors. Every recipe is crafted to complement your food."),
    why('Crafted in Small Batches', 'Made in Oregon with premium ingredients and carefully developed recipes — the kind of care that earns 50+ awards.'),
    why('Artist Collaborations', 'We partner with underground artists and musicians to create limited-edition sauces from the ground up.'),
    why('Unexpected Ingredients', 'From Oregon Raspberry Scotch Bonnet Pepper Jam to savory seaweed chili crisp — bold, Asian-inspired flavors you won\'t find anywhere else.'),
    why('Made to Be Used on Everything', 'Chicken, steak, wings, burgers, pizza, eggs, ramen, rice. If it needs more flavor, it probably needs HAB Sauce.')])
]));

// 8 FAQ
const faqs = [
  ['Where is HAB Sauce made?', 'HAB Sauce is handcrafted in small batches in Portland, Oregon.'],
  ['Are HAB Sauces vegan and gluten-free?', 'Most are. Check each product description for details.'],
  ['How long does shipping take?', 'Orders process in 1–2 business days, with 3–5 business days for standard U.S. shipping.'],
  ['How hot are your sauces?', 'Our range runs from mild to extremely hot, and every product shows a heat level indicator.'],
  ['Do you offer gift sets?', 'Yes — curated 4-packs, 2 oz samplers, and limited-edition bundles.'],
  ['Do you ship internationally?', 'We currently ship within the U.S. only. Contact us for international requests.'],
  ['Can I build my own 4-pack?', 'Yes! Use our Build Your Own 4-Pack feature.']];
const acc = add({ type: 'accordion', settings: { dividers: true } }, faqs.map(([q, a], i) => [id('accordion_row'), add({ type: '_accordion-row', settings: { heading: q, open_by_default: i === 0 } }, [p(a)])]));
put('faq', section({ color_scheme: 'scheme-2', gap: 24, ...PAD }, [
  H('Frequently Asked Sauce Questions (FAQs)', { alignment: 'center' }),
  group({ width: 'custom', custom_width: 80, width_mobile: 'fill' }, [[id('accordion'), acc]])
]));
sections.faq.settings.horizontal_alignment_flex_direction_column = 'center';

// 9 newsletter
put('newsletter', section({ color_scheme: 'scheme-7', gap: 14, ...CEN, 'padding-block-start': 88, 'padding-block-end': 88 }, [
  p('<strong>SIGN UP TO HAVE EARLY ACCESS TO ORDER THE NEWEST DROPS</strong>', { ...cw, color: 'var(--color-primary)' }),
  H('Sign up for Sauce Drops'),
  p('Be the first to know about new sauce drops, events, exclusive deals, and insider news.', cw),
  [id('email_signup'), { type: 'email-signup', settings: {}, blocks: {} }]
]));

wr('templates/index.json', { sections, order });
console.log('HAB theme built:', order.join(', '));

