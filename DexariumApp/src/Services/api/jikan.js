import Jikan from 'jikan4.js'
const client = new Jikan.Client()
export async function getAnime() {
    const response = await client.top.listAnime();
    return response
}