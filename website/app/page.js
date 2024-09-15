'use client'
import { useSearchParams, usePathname, useRouter } from 'next/navigation'
import { useState, Suspense } from 'react'
import Results from './results'

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
  const[searchQuery, setQuery] = useState(searchParams.get('q'));
 
  const handleSearch = (query) => {
    const params = new URLSearchParams(searchParams);
    if (query) {
      params.set('q', query);
    } else {
      params.delete('q');
    }
    replace(`${pathname}?${params.toString()}`);
    setQuery(query);
  }

  return (
    <div>
      <SearchBar searchQuery={searchQuery} handleSearch={handleSearch} />
      <Results searchQuery={searchQuery} />
    </div>
  );
}

function SearchBar({ searchQuery, handleSearch }) {
  const[searchValue, setValue] = useState(searchQuery);
  searchQuery = searchQuery ? searchQuery : ""
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
    <section className="section has-text-centered">
      <div className="container is-max-desktop">
        <h1 className="title">Audio Dataset Search</h1>
        <h2 className="subtitle">
          Search keywords for works that may appear in audio ML training datasets.<br></br>Examples include a work's title or the name of the creator, a performer, or the rights owner.
        </h2>
      </div>

      <div className="container is-max-desktop">
        <div className="field is-grouped">
          <input
            className={searchError ? "input is-rounded is-danger" : "input is-rounded"}
            label={'search'}
            type="search"
            placeholder="Search"
            value={searchValue}
            onChange={(e) => {setValue(e.target.value); setError(false);}}
            onKeyDown={(e) => onKeyDown(e)}
          />
          <p className="buttons">
            <button className="button is-rounded is-link" onClick={() => handleSubmit(searchValue)}>
              Search
            </button>
          </p>
        </div>
      </div>
    </section>
  )
}