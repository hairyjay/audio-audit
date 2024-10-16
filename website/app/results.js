import Link from 'next/link';
import { useState, useEffect } from 'react'
import useSWR from 'swr'
 
const fetcher = (...args) => fetch(...args).then((res) => res.json())

export default function Results({ searchQuery }) {
	const { data, error } = useSWR(`/api/search?q=${searchQuery}`, fetcher)

	// const getResults = async (query) => {
	// 	if (query.length >= 5 && typeof window !== "undefined") {
	// 		const url = window.location.toString();
	// 		const res = await fetch(`${url.split('/?')[0]}/api/search?q=${query}`);
	// 		const data = await res.json();
	// 		return data;
	// 	}
	// 	return null
	// }

	// var results = await getResults(searchQuery)
	// console.log(results)

	if (error) return (
		<section className="section has-text-centered">
			Failed to load
		</section>
	);
  if (!data) return (
		<section className="section has-text-centered">
			Loading...
		</section>
	);
	
	//console.log(data)
	return (
		<section className="section">
			<ResultContainer data={data} />
		</section>
	);
}

function ResultContainer({ data }) {
	var count = {};
	for (const [key, value] of Object.entries(data)) {
		count[key] = value.length
	}
	return (
		<div>
			<div className="container mb-4">
				<Counter count={count} />
			</div>
			<div className="container is-max-desktop">
				<AudiosetResults data={data.aud} />
				<JamendoResults data={data.jam} />
				<FMAResults data={data.fma} />
			</div>
		</div>
	);
}

function Counter({ count }) {
	const sumValues = obj => Object.values(obj).reduce((a, b) => a + b, 0);
	const scrollToSection = (id) => {
		const element = document.getElementById(id)
		element?.scrollIntoView({ behavior: "smooth"});
	};
	return (
		<div className="tabs is-centered">
			<ul>
				<li class="is-active"><a>Total: {sumValues(count)}</a></li>
				<li><a onClick={()=>scrollToSection("audioset")} >Audioset: {count.aud}</a></li>
				<li><a onClick={()=>scrollToSection("jamendo")} >Jamendo: {count.jam}</a></li>
				<li><a onClick={()=>scrollToSection("fma")} >FMA: {count.fma}</a></li>
			</ul>
		</div>
	);
}

function AudiosetResults({ data }) {
	const renderItems = data.map((item) => (
		<article class="message is-dark">
  		<div class="message-header">
				<p class="card-header-title">Audio Found in Audioset Dataset</p>
			</div>
			<div className="message-body">
				<div className="media">
					<div className="media-content">
						<div class="columns">
							<div class="column is-8">
								<p className="title is-4">{item.title}</p>
								<p className="subtitle is-6">{item.name}</p>
							</div>
							<div class="column is-4 has-text-right">
								<div class="buttons is-pulled-right">
								<a href={item.url}><button className="button is-link">Youtube Link</button></a>
									<a href='https://research.google.com/audioset/'><button className="button is-danger">Dataset Link</button></a>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="media">
					<div className="media-content">
						<p><b>Data included in dataset: </b> labels, metadata, URL, and timestamps for 10-second snippets of YouTube video</p>
					</div>
				</div>
			</div>
		</article>
	));	
	return (
		<div class="fixed-grid has-1-cols mb-4" id="audioset">
			<div class="grid">
				{renderItems}
			</div>
		</div>
	);
}

function JamendoResults({ data }) {
	const renderItems = data.map((item) => (
		<article class="message is-dark">
  		<div class="message-header">
				<p class="card-header-title">Track Found in Jamendo Dataset</p>
			</div>
			<div className="message-body">
				<div className="media">
					<div className="media-content">
						<div class="columns">
							<div class="column is-6">
								<p className="title is-4">{item.track_name}</p>
								<p className="subtitle is-6">{item.artist_name}</p>
								<p className="subtitle is-6"><b>Album: </b>{item.album_name}</p>
							</div>
							<div class="column is-6 has-text-right">
								<div class="buttons is-pulled-right">
									<a href={item.url}><button className="button is-link">Jamendo Site Link</button></a>
									<a href='https://mtg.github.io/mtg-jamendo-dataset/'><button className="button is-danger">Dataset Link</button></a>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="media">
					<div className="media-content">
						<p><b>Data included in dataset: </b>metadata, audio files, tags on Jamendo</p>
					</div>
				</div>
			</div>
		</article>
	));	
	return (
		<div class="fixed-grid has-1-cols mb-4" id="jamendo">
			<div class="grid">
				{renderItems}
			</div>
		</div>
	);
}

function FMAResults({ data }) {
	function showLabels(label) { 
		if (label) {
			return (<p><b>Associated Labels: </b>{label}</p>);
		} else {
			return null;
		}
	}
	function showMembers(members) { 
		if (members) {
			return (<p><b>Members:</b><br></br>{members}</p>);
		} else {
			return null;
		}
	}
	function showRelated(text) { 
		if (text) {
			return (<p><b>Related Projects:</b><br></br>{text}</p>);
		} else {
			return null;
		}
	}

	const renderItems = data.map((item) => (
		<article class="message is-dark">
  		<div class="message-header">
				<p class="card-header-title">Artist Found in Free Music Archive (FMA) Dataset</p>
			</div>
			<div className="message-body">
				<div className="media">
					<ImageFallback imageUrl={item.artist_image_file} />
					<div className="media-content">
						<div class="columns">
							<div class="column is-4">
								<p className="title is-4">{item.artist_name}</p>
								<p className="subtitle is-6">@{item.artist_handle}</p>
							</div>
							<div class="column is-8 has-text-right">
								<div class="buttons is-pulled-right">
									<a href={item.artist_website}><button className="button is-dark">Website</button></a>
									<a href={item.artist_url}><button className="button is-link">Free Music Archive Link</button></a>
									<a href='https://github.com/mdeff/fma'><button className="button is-danger">Dataset Link</button></a>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="media">
					<div className="media-content">
						{showLabels(item.artist_associated_labels)}
						{showMembers(item.artist_members)}
						{showRelated(item.artist_related_projects)}
						<p><b>Data included in dataset: </b>metadata, artist information, genre data, audio processing features</p>
					</div>
				</div>
			</div>
		</article>
	));	
	return (
		<div class="fixed-grid has-1-cols mb-4" id="fma">
			<div class="grid">
				{renderItems}
			</div>
		</div>
	);
}

function ImageFallback({ imageUrl }) {
  const [loading, setLoading] = useState(true);
  const [isValid, setValid] = useState(null);

  useEffect(() => {
    fetch(imageUrl).then(res => {
      setValid(res.status === 200);
      setLoading(false);
    });
  }, []);

  if (loading || !isValid) {
    return null;
  }

  return (
		<div className="media-left">
			<figure className="image is-48x48">
				<img
					src={imageUrl}
				/>
			</figure>
		</div>
	);
}