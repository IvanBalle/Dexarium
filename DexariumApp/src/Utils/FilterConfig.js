export const FILTER_CONFIG = {
    games: {
        title: "Games",
        filters: [
            {
                key: "ageRating",
                label: "Age Rating",
                type: "string",
            },
            {
                key: "tags",
                label: "Tags",
                type: "array",
            },
            {
                key: "platforms",
                label: "Platforms",
                type: "array",
            },
            {
                key: "stores",
                label: "Stores",
                type: "array",
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
                key: "ageRating",
                label: "Age Rating",
                type: "string",
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
                key: "ageRating",
                label: "Age Rating",
                type: "string",
            },
            {
                key: "studios",
                label: "Studios",
                type: "array",
            },
            {
                key: "genres",
                label: "Genres",
                type: "array",
            },
            {
                key: "themes",
                label: "Themes",
                type: "array",
            },
            {
                key: "status",
                label: "Status",
                type: "string",
            },
        ],
    },

    tvshows: {
        title: "TV Shows",
        filters: [
            {
                key: "ageRating",
                label: "Age Rating",
                type: "string",
            },
            {
                key: "countries",
                label: "Countries",
                type: "array",
            },
            {
                key: "genres",
                label: "Genres",
                type: "array",
            },
        ],
    },
}
