'use client'
import { useSearchParams, usePathname, useRouter } from 'next/navigation'
import { Suspense } from 'react'

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
  const search = searchParams.get('q')
  const pathname = usePathname();
  const { replace } = useRouter();
  const[searchValue, setValue] = useState("");

  const onKeyDown = (e) => {
    if(e.key == 'Enter'){
        handleSearch(e.target.value);
      }
  }
 
  function handleSearch(term) {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set('q', term);
    } else {
      params.delete('q');
    }
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
              class="input is-rounded"
              label={'search'}
              type="search"
              placeholder="Search"
              defaultValue={searchParams.get('q')?.toString()}
              value={searchValue}
              onChange={(e) => {setValue(e.target.value)}}
              onKeyDown={(e) => {
                onKeyDown(e);
              }}
            />
            <p class="buttons">
              <button class="button is-rounded is-link" onClick={(e) => {handleSearch(value)}}>
                Search
              </button>
            </p>
          </div>
        </div>
      </section>

      <div class="container is-max-desktop">
        <p>Search: {search}</p>
      </div>
    </div>
  );
}