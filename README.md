# Capstone Project | Advanced Recipe Finder

This project was created by Tyler Greff as a part of the onboarding process for the Solutions Engineer role at Algolia.

## What's Included

### Mandatory

- [x] Data Transformation
- [x] Search Configuration (Searchable Attributes, Custom Ranking)
- [x] InstantSearch (any flavor) (REACT)
- [x] Autocomplete
- [x] Query Suggestions
- [x] Rules
- [x] Facets
- [x] Sort-by

### Recommended

- [x] Utilize FIG to mock event data
- [x] Recommend
- [x] Dynamic Re-ranking
- [ ] Query Categorization (Not Applicable)
- [ ] NeuralSearch

### Optional

- [ ] Geo-location
- [ ] Federated Search

### MISC.

- [x] Custom React Widgets
    - Slider Widget - Cook Time
    - Rating Menu

## Process

1. Scraped Data from AllRecipes and FoodNetwork sites by crawling their sitemap and subsequent pages to pull required data

2. Imported the data through two varying .CSV structures (one for each site)

2. Used **Transformer** to:
    1. Breakdown ingredients into nested arrays for facet filtering
    2. Separate directions into individual array attributes
    3. Calculate and assign difficulty levels to records missing the field using a calculation on the prep and cook times for each recipe
    4. Create a 'Chefs Favorite' tag that must have a minimum rating and madeCount.
    5. Find and highlight 'empty' records for removal via API

3. Use the JS client to call the Search API and remove records from the Index that have *null* data

4. **Configure the Core Engine** and relevance settings including:
    1. Searchable Ingredients: title; ingredients; tags; description; author
    2. Custom Rankings: rating; madeCount; ratingCount
    3. Synonyms: manual and AI-generated
    4. Facets: Chef's Favorite; cook/prep time; ingredients; difficulty; rating; tags
    5. No Results: All Optional

5. Created **Replicas** (standard) for sorting on the front-end
    - Rank (desc)
    - Rank (asc)

6. Created a few **Rules** to showcase merchandising abilities
    1. **lemons:** Displays a lemon-related banner (Rules) at the top of the hits list [Rules]
    2. **winter:** Boosts three hot winter drinks to the top of the search results [Rules]

7. Added **Event Tracking** to the InstantSearch UI (front-end) to assist with the collection of click and conversio events

8. Used **FIG** to generate ~15k events to train the various **Recommend** models

9. Specified queries (via FIG) with lower click positiont to trigger **Dynamic Reranking** for the following queries:
    - 'potatoes'
    - 'winter'


## UI Components
- Search bar - Search as you Type
- Sort By - Default is 'Feature' but just standard results
- Pagination - Default of 24 results
- Facets and Filters - Includes InstantSearch widgets and custom components
- Recipe Card
    - Title; Image; Description
    - Chef's Favorite
    - Make this Recipe (conversion event)
    - View Similar (Looking Similar - Recommend Model)

## Queries to Try

1. **lemons:** Displays a lemon-related banner (Rules) at the top of the hits list.

2. **winter:** Boosts three hot winter drinks to the top of the search results.

3. **potato:** To showcase dynamic reranking (not noticeable on the front per-se)