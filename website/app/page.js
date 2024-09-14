'use client'
import { useSearchParams, usePathname, useRouter } from 'next/navigation'
import { useState, Suspense } from 'react'
import Results from './results';

export default function Home() {
  return (
    <main>
        <Suspense>
          <Search />
        </Suspense>
    </main>
  );
}

function Search() {
  const searchParams = useSearchParams()
  const pathname = usePathname();
  const { replace } = useRouter();
  const[searchQuery, setQuery] = useState("");
  setQuery(searchParams.get('q'))
 
  function handleSearch(query) {
    const params = new URLSearchParams(searchParams);
    if (query) {
      params.set('q', query);
    } else {
      params.delete('q');
    }
    replace(`${pathname}?${params.toString()}`);
    setQuery(query)
  }

  return (
    <div>
      <SearchBar searchQuery={searchQuery} handleSearch={handleSearch} />
      <Results searchQuery={searchQuery}/>
    </div>
  );
}

function SearchBar({ searchQuery, handleSearch }) {
  const[searchValue, setValue] = useState(searchQuery);
  const[searchError, setError] = useState(searchQuery.length < 5 && searchQuery.length >= 1);

  const onKeyDown = (e) => {
    if(e.key == 'Enter'){
        handleSubmit(e.target.value);
      }
  }
 
  function handleSubmit(query) {
    if (query.length >= 5 || query.length < 1) {
      handleSearch(query)
    } else {
      setError(true);
    }
  }

  return (
    <section class="section has-text-centered">
      <div class="container is-max-desktop">
        <h1 class="title">Audio Dataset Search</h1>
        <h2 class="subtitle">
          Search keywords for works that may appear in audio ML training datasets.<br></br>Examples include a work's title or the name of the creator, a performer, or the rights owner.
        </h2>
      </div>

      <div class="container is-max-desktop">
        <div class="field is-grouped">
          <input
            class={searchError ? "input is-rounded is-danger" : "input is-rounded"}
            label={'search'}
            type="search"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => {setValue(e.target.value); setError(false);}}
            onKeyDown={(e) => onKeyDown(e)}
          />
          <p class="buttons">
            <button class="button is-rounded is-link" onClick={() => handleSubmit(searchValue)}>
              Search
            </button>
          </p>
        </div>
      </div>
    </section>
  )
}