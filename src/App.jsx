import React from 'react';
// import { algoliasearch } from "algoliasearch";
import { liteClient as algoliasearch } from 'algoliasearch/lite';

import {  InstantSearch,  
          Configure, 
          Highlight, 
          Hits,
          HitsPerPage, 
          LookingSimilar,
          Pagination, 
          RefinementList,
          SearchBox,
          SortBy,
          Stats,
          ToggleRefinement,
        } from "react-instantsearch";

import { RatingMenu } from "./RatingMenu";
import  RangeSlider  from './RangeSlider';


import './App.css';
import 'instantsearch.css/themes/satellite.css';

// Replace with your Algolia Application ID and Search API Key
const searchClient = algoliasearch("D2CK5J9GUK", "5efde727d6476018975c7d8e9f1b9e69");

function Hit({ hit, sendEvent }) {
  const [showSimilar, setShowSimilar] = React.useState(false);

  return (
    <article href={hit.url}>
      <h1>
        <Highlight attribute="title" hit={hit} />
      </h1>
      <img src={hit.image} alt={hit.name} className="img"/>
      <p class="rating"><b>Rating:</b> {hit.rating} / 5 ⭐</p>
      <div>
          {hit["Chefs Favorite"] && (
            <span className="chefsFavorite" title="chefsFavorite">Chef's Favorite 👨‍🍳</span>
          )}
        </div>
      <p className="desc">{hit.description}</p>
      <button className="btn" onClick={() =>
          sendEvent("conversion", hit, "Recipe Made")
        }
      >Make this Recipe</button>

      <button className="btn" onClick={() => setShowSimilar(!showSimilar)}>
        {showSimilar ? 'Hide Similar Recipes' : 'Show Similar Recipes'}
      </button>

      
      {showSimilar && (
        <LookingSimilar
          objectIDs={[hit.objectID]}
          limit={2}
          itemComponent={SimilarHit}
          headerComponent={() => (
            <h2 className={"similar-title"}>
              Looking Similar
            </h2>
          )}
        />
      )}
      
    </article>
  );
}

// Create a component for similar hits - note the prop structure
function SimilarHit({ item }) {
  return (
    <div className="similar-hit">
      <img src={item.image} alt={item.name} className="similar-img"/>
      <p><Highlight attribute="title" hit={item} /></p>
    </div>
  );
}

export default function App() {

  return (
    <div className="App">
      <h1>Recipe Search</h1>
      
      <InstantSearch searchClient={searchClient} indexName="all_recipes" insights={true}>
        <Configure 
          maxValuesPerFacet={51}
        />
        {/* <CustomIngredientSearch /> */}

        <div class="searchSort">
          <SearchBox
            placeholder="Search for a recipe or ingredient..."
            searchAsYouType={true}
          />
          <div class="sort">
              <SortBy
                items={[
                  //  { label: 'Featured', value: 'instant_search' },
                  { label: 'Featured', value: 'all_recipes' },
                  { label: 'Rating (desc)', value: 'all_recipes_ranking_desc' },
                  { label: 'Rating (asc)', value: 'all_recipes_ranking_asc' },
                ]}
              />
              <HitsPerPage
                items={[
                  { label: '12 results', value: 12 },
                  { label: '24 results', value: 24, default: true },
                  { label: '48 results', value: 48 },
                  { label: '96 results', value: 96 },
                ]}
              />
          </div>
        </div>
        <Stats />

        <div class="collectionsBar">
          
        </div>

        <div className="refineAndHits">
          <div className="refinements">
            <h3>Difficulty</h3>
            <RefinementList attribute="difficulty" operator={'or'}/>
            {/* <CustomRefinementList /> */}
            <h3>Rating</h3>
            <RatingMenu attribute="rating" operator={'or'} />
            {/* <RefinementList attribute="rating" operator={'or'}/> */}
            <h3>Ingredients</h3>
            <RefinementList 
              attribute="coreIngredient"
              operator={'and'}
              limit={10}
              showMore={true}
              showMoreLimit={25}
              searchable={true}
              searchablePlaceholder="Sugar, Butter, Milk, Eggs..."
            />
            {/* <RefinementList 
              attribute="Cook Time"
              operator={'or'}
              limit={5}
              showMore={true}
              showMoreLimit={10}
            /> */}
            <h3>Cook Time</h3>
            <RangeSlider attribute="Cook Time" />

            <h3>Recipe Tags</h3>
            <RefinementList 
              attribute="tags"
              operator={'or'}
              limit={10}
              showMore={true}
              showMoreLimit={25}
              searchable={true}
              searchablePlaceholder="Breakfast, Lunch, Dinner..."
            />
            <ToggleRefinement attribute="Chefs Favorite" on={true} label="CHEF'S FAVORITE" className="toggleLabel"/>

          </div>
          <Hits className="hits" hitComponent={Hit} />
        </div>

        <Pagination />

      </InstantSearch>
      
    </div>
  );
}