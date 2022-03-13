import fetch from "isomorphic-fetch";
import React, { useCallback, useState } from "react";
import { AsyncTypeahead } from "react-bootstrap-typeahead";
import { render } from "react-dom";

import "react-bootstrap-typeahead/css/Typeahead.css";

const CACHE = {};
const PER_PAGE = 50;
const SEARCH_URI = "http://127.0.0.1:8000/accounts/profile/user/?search=";

function makeAndHandleRequest(query, page = 1) {
  return fetch(`${SEARCH_URI}${query}`)
    .then((resp) => resp.json())
    .then((user) => {
      const options = user.map((user) => ({
        first_name: user.first_name,
        last_name: user.last_name,
        id: user.id,
      }));
      return { options };
    });
}

export default function AsyncPaginationExample() {
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState([]);
  const [query, setQuery] = useState("");

  const handleInputChange = (q) => {
    setQuery(q);
  };

  const handlePagination = (e, shownResults) => {
    const cachedQuery = CACHE[query];

    // Don't make another request if:
    // - the cached results exceed the shown results
    // - we've already fetched all possible results
    if (
      cachedQuery.options.length > shownResults ||
      cachedQuery.options.length === cachedQuery.total_count
    ) {
      return;
    }

    setIsLoading(true);

    const page = cachedQuery.page + 1;

    makeAndHandleRequest(query, page).then((resp) => {
      const options = cachedQuery.options.concat(resp.options);
      CACHE[query] = { ...cachedQuery, options, page };

      setIsLoading(false);
      setOptions(options);
    });
  };

  // `handleInputChange` updates state and triggers a re-render, so
  // use `useCallback` to prevent the debounced search handler from
  // being cancelled.
  const handleSearch = useCallback((q) => {
    if (CACHE[q]) {
      setOptions(CACHE[q].options);
      return;
    }

    setIsLoading(true);
    makeAndHandleRequest(q).then((resp) => {
      CACHE[q] = { ...resp, page: 1 };

      setIsLoading(false);
      setOptions(resp.options);
    });
  }, []);

  return (
    <AsyncTypeahead
      isLoading={isLoading}
      labelKey={(option) => `${option.first_name} ${option.last_name}`}
      maxResults={PER_PAGE - 1}
      minLength={1}
      onInputChange={handleInputChange}
      onPaginate={handlePagination}
      onSearch={handleSearch}
      options={options}
      paginate
      placeholder="Search for a user..."
      renderMenuItemChildren={(option) => (
        <div key={option.id}>
          <span>
            {option.first_name} {option.last_name}
          </span>
        </div>
      )}
      useCache={false}
    />
  );
}

render(<AsyncPaginationExample />, document.getElementById("root"));