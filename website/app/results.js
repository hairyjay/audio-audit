import { getFMA } from './db'

export default function Results({ query }) {
  console.log(query, getFMA(query))
  return(
		<div class="container is-max-desktop">
		</div>
	)
}