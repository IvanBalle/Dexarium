export const FILTER_CONFIG = {
    games: {
        title: "Games",
        filters: [
            {
                key: "releaseYear",
                label: "Release Year",
                type: "number",
            },
            {
                key: "country",
                label: "Country",
                type: "string",
            },
            {
                key: "publisher",
                label: "Publisher",
                type: "string",
            },
            {
                key: "developer",
                label: "Developer",
                type: "string",
            },
            {
                key: "genres",
                label: "Genres",
                type: "array",
            },
        ],
    },

    movies: {
        title: "Movies",
        filters: [
            {
                key: "releaseYear",
                label: "Release Year",
                type: "number",
            },
            {
                key: "country",
                label: "Country",
                type: "string",
            },
            {
                key: "director",
                label: "Director",
                type: "array",
            },
            {
                key: "genres",
                label: "Genres",
                type: "array",
            },
        ],
    },
        anime: {
        title: "Anime",
        filters: [
            {
                key: "releaseYear",
                label: "Release Year",
                type: "number",
            },
            {
                key: "country",
                label: "Country",
                type: "string",
            },
            {
                key: "studio",
                label: "Studio",
                type: "array",
            },
            {
                key: "genres",
                label: "Genres",
                type: "array",
            },
        ]
    },

    tvshows: {
        title: "TV Shows",
        filters: [
            {
                key: "releaseYear",
                label: "Release Year",
                type: "number",
            },
            {
                key: "country",
                label: "Country",
                type: "string",
            },
            {
                key: "creator",
                label: "Creator",
                type: "array",
            },
            {
                key: "genres",
                label: "Genres",
                type: "array",
            },
        ]
    }
};


