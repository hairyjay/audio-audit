'use server'
import { sql } from "@vercel/postgres";

export const getFMA = async (searchString) => {
    const selectResult = await sql`SELECT * FROM testing WHERE '${searchString}' in (artist_associated_labels, artist_bio, artist_contact, artist_donation_url, artist_flattr_name, artist_handle, artist_members, artist_name, artist_paypal_name, artist_related_projects, artist_url, artist_website, artist_wikipedia_page, tags);`;
    console.log("results", selectResult);
    return selectResult;
};