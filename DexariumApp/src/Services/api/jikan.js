import Jikan from "jikan4.js"
const client = new Jikan.Client()

export async function getAnime(page = 1) {
    const response = await client.top.listAnime(page)
    return response.slice(0, 20)
}
