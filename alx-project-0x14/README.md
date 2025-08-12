## API Overview

The MoviesDatabase API is a powerful tool for building movie discovery applications like CineSeek. It provides a comprehensive collection of movie data, allowing developers to search for films, browse by various criteria, and retrieve detailed information about specific titles. The API's focus on structured data and filters for genre, year, and pagination makes it ideal for creating responsive and feature-rich movie apps.

---

## API Version

**v1.0**

---

## Available Endpoints

The API is centered around a few key endpoints for movie data:

* **`/titles`**: The primary endpoint for fetching movie data. This is used for browsing a list of movies and supports filtering by query parameters such as `year`, `genre`, and pagination with parameters like `page` or `limit`.
* **`/titles/{id}`**: Used to retrieve detailed information for a specific movie, identified by its unique ID.
* **`/genres`**: An endpoint to fetch a list of all available genres to be used for filtering.
* **`/years`**: An endpoint to get a list of movie release years.

---

## Request and Response Format

A typical request to the `/titles` endpoint might look like this:

`GET /titles?year=2022&genre=Action&limit=20&page=1`

The API responds with data in **JSON** format. A successful response from the `/titles` endpoint would contain an array of movie objects, with each object having properties like `title`, `year`, `genre`, `poster_url`, and a unique `id`.

Example response object:
```json
{
  "total": 500,
  "movies": [
    {
      "id": "tt1234567",
      "title": "The Great Adventure",
      "year": 2022,
      "genre": ["Action", "Adventure"],
      "poster_url": "[https://example.com/poster.jpg](https://example.com/poster.jpg)",
      "plot": "A thrilling story of a hero's journey."
    }
  ]
}