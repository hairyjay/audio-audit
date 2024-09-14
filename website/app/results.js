import { getFMA } from './db'

export default function Results(props) {
  console.log(props.query, getFMA(props.query))
}