'use client'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

export default function Home() {
  return (
    <main>
      <section class="section has-text-centered">
        <div class="container is-max-desktop">
          <h1 class="title">Audio Dataset Search</h1>
          <h2 class="subtitle">
            Search for keywords for works that may appear in audio ML training datasets.<br></br>Examples include a work's title or the name of the creator, a performer, or the rights owner.
          </h2>
        </div>

        <Suspense>
          <Search />
        </Suspense>
      </section>
    </main>
  );
}

function Search() {
  const searchParams = useSearchParams()
  const search = searchParams.get('q')

  return (
    <div>
      <div class="container is-max-desktop">
        <div class="field is-grouped">
          <input class="input is-rounded" type="search" placeholder="Search" value={search} />
          <p class="buttons">
            <button class="button is-rounded is-link">
              Search
            </button>
          </p>
        </div>
      </div>

      <div class="container is-max-desktop">
        <p>Search: {search}</p>
      </div>
    </div>
  );
}