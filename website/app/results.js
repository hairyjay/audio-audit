import { getFMA } from './db'

export default function Results(props) {
  console.log(getFMA(props.query))
}