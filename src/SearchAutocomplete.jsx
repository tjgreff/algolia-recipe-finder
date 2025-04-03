import React, { useEffect, useRef } from "react";
import { autocomplete } from "@algolia/autocomplete-js";
import "@algolia/autocomplete-theme-classic";
import * as algoliasearch from "algoliasearch/lite";
import { useSearchBox } from "react-instantsearch-hooks";

const searchClient = algoliasearch("D2CK5J9GUK", "5efde727d6476018975c7d8e9f1b9e69");

export default function SearchAutocomplete() {
  const { refine } = useSearchBox();
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const autocompleteInstance = autocomplete({
      container: containerRef.current,
      placeholder: "Search for recipes...",
      openOnFocus: true,
      getSources({ query }) {
        return [
          {
            sourceId: "products",
            getItems() {
              return searchClient
                .initIndex("all_recipes")
                .search(query, { hitsPerPage: 5 })
                .then(({ hits }) => hits);
            },
            templates: {
              item({ item }) {
                return (
                  <div className="aa-Item">
                    <img src={item.image} alt={item.name} className="aa-ItemImage" />
                    <div className="aa-ItemContent">
                      <div className="aa-ItemTitle">{item.name}</div>
                    </div>
                  </div>
                );
              },
            },
          },
        ];
      },
      onSubmit({ state }) {
        refine(state.query);
      },
    });

    return () => autocompleteInstance.destroy();
  }, [refine]);

  return <div ref={containerRef} />;
}
