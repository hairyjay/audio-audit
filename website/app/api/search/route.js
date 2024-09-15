import { sql } from "@vercel/postgres";

async function requestHandler(req) {
	const { searchParams } = new URL(req.url);
	const query = searchParams.get("q").toLowerCase()
	var results = {}
	var jamResults = await getJamendo(query)
	results["jam"] = jamResults ? jamResults.rows : []
	var fmaResults = await getFMA(query)
	results["fma"] = fmaResults ? fmaResults.rows : []
	return Response.json(results);
}

async function getJamendo(searchString) {
	searchString = searchString ? searchString : ""
	if (searchString.length >= 5) {
		const searchItem = "%" + searchString + "%"
		const selectResult = await sql`SELECT * FROM jamendo
																	 WHERE LOWER( track_name ) LIKE ${searchItem}
																	 		OR LOWER( artist_name ) LIKE ${searchItem}
																	 		OR LOWER( album_name ) LIKE ${searchItem};`;
		return selectResult;
	} else {
		return null
	}
};

async function getFMA(searchString) {
	searchString = searchString ? searchString : ""
	if (searchString.length >= 5) {
		const searchItem = "%" + searchString + "%"
		const selectResult = await sql`SELECT * FROM fma
																	 WHERE LOWER( artist_associated_labels ) LIKE ${searchItem}
																	 		OR LOWER( artist_contact ) LIKE ${searchItem}
																	 		OR LOWER( artist_donation_url ) LIKE ${searchItem}
																	 		OR LOWER( artist_flattr_name ) LIKE ${searchItem}
																	 		OR LOWER( artist_handle ) LIKE ${searchItem}
																	 		OR LOWER( artist_image_file ) LIKE ${searchItem}
																	 		OR LOWER( artist_members ) LIKE ${searchItem}
																	 		OR LOWER( artist_name ) LIKE ${searchItem}
																	 		OR LOWER( artist_paypal_name ) LIKE ${searchItem}
																	 		OR LOWER( artist_related_projects ) LIKE ${searchItem}
																	 		OR LOWER( artist_url ) LIKE ${searchItem}
																	 		OR LOWER( artist_website ) LIKE ${searchItem};`;
		return selectResult;
	} else {
		return null
	}
};

export { requestHandler as GET };