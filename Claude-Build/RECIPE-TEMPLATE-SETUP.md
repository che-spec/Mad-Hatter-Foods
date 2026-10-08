# Recipe article template — setup

Files (in `madhatter-v2-theme`; copy to the other theme folders if needed):
- `sections/main-recipe.liquid`
- `templates/article.recipe.json`

## 1. Create the metafields (once)
Shopify admin → Settings → Custom data → **Blog posts** → Add definition.
Namespace and key must be exactly as below (namespace `custom`).

| Name | Key | Type |
|---|---|---|
| Recipe prep time (min) | `recipe_prep_time` | Integer |
| Recipe cook time (min) | `recipe_cook_time` | Integer |
| Recipe servings | `recipe_servings` | Integer |
| Recipe difficulty | `recipe_difficulty` | Single line text |
| Recipe ingredients | `recipe_ingredients` | Multi-line text |
| Recipe instructions | `recipe_instructions` | Multi-line text |
| Recipe notes | `recipe_notes` | Rich text |
| Recipe nutrition | `recipe_nutrition` | Multi-line text |
| Recipe products | `recipe_products` | Product (list) |

## 2. Write a recipe
Online Store → Blog posts → Add blog post. Set **Theme template** to `recipe`.
- Body = the story / intro. Excerpt = short summary under the title. Featured image = hero. First tag = label above the title.
- Ingredients: one per line, quantity first so servings scaling works (`1 1/2 cups flour`). A line starting with `## ` becomes a group heading (`## For the sauce`).
- Instructions: one step per line; `## ` headings work here too.
- Nutrition: `Label: value` per line, e.g. `Calories: 455`.

## Features
Jump to recipe, print (card only), share, tick-off ingredients, tap-to-complete steps, servings scaler, cook mode (bigger text, screen stays awake), shop-the-recipe product cards, more recipes from the same blog, Google Recipe schema (JSON-LD), app block slot for reviews.
