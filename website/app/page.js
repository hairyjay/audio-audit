'use client'
import { useSearchParams, usePathname, useRouter } from 'next/navigation'
import { useState, Suspense } from 'react'
import Results from './results';

export default function Home() {
  const[searchValue, setValue] = useState("");
  const searchParams = useSearchParams()
  setValue(searchParams.get('q'))

  return (
    <main>
        <Suspense>
          <Search searchValue={searchValue} setValue={setValue}/>
          <Results query={searchValue}/>
        </Suspense>
    </main>
  );
}

function Search({ searchValue, setValue }) {
  const pathname = usePathname();
  const { replace } = useRouter();
  const[searchError, setError] = useState(false);
  if (searchValue) {
    if (searchValue.length < 5 && searchValue.length >= 1) {
      setError(e => true);
    }
  }

  const onKeyDown = (e) => {
    if(e.key == 'Enter'){
        handleSearch(e.target.value);
      }
  }
 
  function handleSearch(query) {
    const params = new URLSearchParams(searchParams);
    if (query) {
      if (query.length >= 5) {
        params.set('q', query);
      } else {
        setError(e => true);
      }
    } else {
      params.delete('q');
    }
    setValue(query)
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div>
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
              defaultValue={searchValue}
              value={searchValue}
              onChange={(e) => {setValue(e.target.value); setError(e => false);}}
              onKeyDown={(e) => {onKeyDown(e);}}
            />
            <p class="buttons">
              <button class="button is-rounded is-link" onClick={(e) => {handleSearch(searchValue)}}>
                Search
              </button>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}