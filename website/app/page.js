'use client'
import { useSearchPa rams } from 'next/navigation'

export default function Home() {
  return (
    <main>
      <section class="section has-text-centered">
        <h1 class="title">Audio Dataset Search</h1>
        <h2 class="subtitle">
          Search for keywords for works that may appear in audio ML training datasets. Examples include a work's title or the name of the creator, a performer, or the rights owner.
        </h2>
        <div class="container is-max-desktop">
          <input class="input is-rounded" type="text" placeholder="Search" />
          <button class="button">
            <span class="icon is-link">
              <i class="fas fa-search"></i>
            </span>
          </button>
        </div>
      </section>
    </main>
  );
}