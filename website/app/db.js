import { sql } from "@vercel/postgres";

export const getFMA = async () => {
    const selectResult = await sql`SELECT * FROM testing WHERE 'foo' in (artist_associated_labels, col2, col3, . . . );`;
    console.log("results", selectResult)