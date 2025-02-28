import React from "react";
import { algoliasearch } from "algoliasearch";
import {  InstantSearch,  
          Configure, 
          Highlight, 
          Hits,
          HitsPerPage, 
          Pagination, 
          RangeInput, 
          RefinementList,
          SearchBox,
          SortBy,
          Stats,
        } from "react-instantsearch";
import { RatingMenu } from "./RatingMenu";
// import { CustomRefinementList } from "./CustomRefinementList"

import './App.css';
import 'instantsearch.css/themes/satellite.css';

// Replace with your Algolia Application ID and Search API Key
const searchClient = algoliasearch("D2CK5J9GUK", "5efde727d6476018975c7d8e9f1b9e69");

function Hit({ hit }) {
  return (
    <article href={hit.url}>
      {/* <p>{hit.categories[0]}</p> */}
      <h1><Highlight attribute="title" hit={hit} /></h1>
      <img src={hit.image} alt={hit.name} class="img"/>
      <p class="desc">{hit.description}</p>
      <p>Rating: {hit.rating} ⭐</p>
      <a href={hit.url}><button>View Recipe</button></a>
      {/* <button>View Recipe</button> */}
    </article>
  );
}

export default function App() {

  return (
    <div className="App">
      <h1>Recipe Search</h1>
      
      <InstantSearch searchClient={searchClient} indexName="all_recipes">
        <Configure 
          hitsPerPage={12}
          maxValuesPerFacet={51}
        />
        <SearchBox class="searchBox"
          placeholder="Search for a recipe or ingredient..."
        />
        <Stats />
        <div class="pages">
          <Pagination />
          <div class="sortAndItems">
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
                { label: '12 results', value: 12, default: true },
                { label: '24 results', value: 24 },
                { label: '48 results', value: 48 },
                { label: '96 results', value: 96 },
              ]}
            />
          </div>
        </div>

        <div className="refineAndHits">
          <div className="refinements">
            <h3>Difficulty</h3>
            <RefinementList attribute="difficulty" operator={'or'}/>
            {/* <CustomRefinementList /> */}
            <h3>Rating</h3>
            <RatingMenu attribute="rating" operator={'or'} />
            {/* <RefinementList attribute="rating" operator={'or'}/> */}
            <h3>Cook Time</h3>
            <RefinementList 
              attribute="Cook Time"
              operator={'or'}
              limit={5}
              showMore={true}
              showMoreLimit={10}
            />
            <h3>Recipe Tags</h3>
            <RefinementList 
              attribute="tags"
              operator={'or'}
              limit={10}
              showMore={true}
              showMoreLimit={25}
              searchable={true}
              searchablePlaceholder="Breakfast, Lunch, Dinner, Quick Meals..."
            />
            {/* <RangeInput attribute="Cook Time" /> */}

          </div>
          <Hits className="hits" hitComponent={Hit} />
        </div>

      </InstantSearch>
    </div>
  );
}