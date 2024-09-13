'use client'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

export default function Home() {
  return (
    <main>
      <section class="section has-text-centered">
        <h1 class="title">Audio Dataset Search</h1>
        <h2 class="subtitle">
          Search for keywords for works that may appear in audio ML training datasets. Examples include a work's title or the name of the creator, a performer, or the rights owner.
        </h2>

        <div class="container is-max-desktop">
          <div class="field is-grouped">
            <input class="input is-rounded" type="text" placeholder="Search" />
            <p class="buttons">
              <button class="button is-rounded">
                <span class="icon is-link">
                  <i class="fas fa-magnifying-glass"></i>
                </span>
              </button>
            </p>
          </div>
        </div>

        <Suspense>
          <Results />
        </Suspense>
      </section>
    </main>
  );
}

export default function Results() {
  const searchParams = useSearchParams()
  const search = searchParams.get('search')

  return (
    <div class="container is-max-desktop">
      <p>Search: {search}</p>
    </div>
  );
}