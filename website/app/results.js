import { getFMA } from './db'

export default function Results({ searchQuery }) {
  console.log(searchQuery, getFMA(searchQuery))
  return(
		<div class="container is-max-desktop">
		</div>
	)
}