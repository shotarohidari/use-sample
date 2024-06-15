import React, { use, Suspense, useEffect, useState } from "react";

type Photo = {
	albumId: number;
	id: number;
	title: string;
	url: string;
	thumbnailUrl: string;
};

const APIENDPOINT = "https://jsonplaceholder.typicode.com/photos";
const cacheMap = new Map<string, Photo[]>();
async function fetchPhotoList() {
	if (!cacheMap.has(APIENDPOINT)) {
		cacheMap.set(APIENDPOINT, await getPhotoList());
	}
	return cacheMap.get(APIENDPOINT) || [];
}
async function getPhotoList() {
	return fetch(APIENDPOINT).then((res) => res.json() as Promise<Photo[]>);
}
export default function Index() {
	const [count, setCount] = useState(0);
	const promise = fetchPhotoList();
	useEffect(() => {
		const id = setInterval(() => {
			setCount((count) => count + 1);
		}, 5000);
		return () => clearInterval(id);
	});
	return (
		<main>
			<div>カウント: {count}</div>
			<Suspense fallback={<div>読み込み中...</div>}>
				<Photos promise={promise} />
			</Suspense>
		</main>
	);
}

function Photos({ promise }: { promise: Promise<Photo[]> }) {
	const photos = use(promise);
	return (
		<div>
			{photos.map(({ albumId, title, thumbnailUrl, url }) => (
				<section key={albumId}>
					<h2>{title}</h2>
					<a href={url}>
						<img src={thumbnailUrl} alt={title} />
					</a>
				</section>
			))}
		</div>
	);
}
