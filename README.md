# SimpleMovieAPI
simpe api to add and browse movies and comments

## /api

### /movies
#### GET
* if request has "id" it will return movie with that id if found
EXAMPLE BODY:
```json
{
	"id": "5c043c589c58ee35e073e0d9"
}
```
EXAMPEL RESPONSE:
```json
{
    "_id": "5c043c589c58ee35e073e0d9",
    "Title": "Fantastic Beasts: The Crimes of Grindelwald",
    "Year": 2018,
    "Rated": "N/A",
    "Released": "2018-11-15T23:00:00.000Z",
    "Runtime": "134 min",
    "Plot": "The second installment of the \"Fantastic Beasts\" series set in J.K. Rowling's Wizarding World featuring the adventures of magizoologist Newt Scamander.",
    "imdbID": "tt4123430",
    "__v": 0
}
```

* if request does not have "id" it will return list of all movies in db
```json
[
    {
        "_id": "5c04394fadb43e2c206038f4",
        "Title": "The Lion King",
        "Year": 1994,
        "Rated": "G",
        "Released": "1994-06-23T22:00:00.000Z",
        "Runtime": "88 min",
        "Plot": "A Lion cub crown prince is tricked by a treacherous uncle into thinking he caused his father's death and flees into exile in despair, only to learn in adulthood his identity and his responsibilities.",
        "imdbID": "tt0110357",
        "__v": 0
    },
    {
        "_id": "5c043c589c58ee35e073e0d9",
        "Title": "Fantastic Beasts: The Crimes of Grindelwald",
        "Year": 2018,
        "Rated": "N/A",
        "Released": "2018-11-15T23:00:00.000Z",
        "Runtime": "134 min",
        "Plot": "The second installment of the \"Fantastic Beasts\" series set in J.K. Rowling's Wizarding World featuring the adventures of magizoologist Newt Scamander.",
        "imdbID": "tt4123430",
        "__v": 0
    },
    {
        "_id": "5c043c6a9c58ee35e073e0da",
        "Title": "Bohemian Rhapsody",
        "Year": 2018,
        "Rated": "N/A",
        "Released": "2018-11-01T23:00:00.000Z",
        "Runtime": "134 min",
        "Plot": "A chronicle of the years leading up to Queen's legendary appearance at the Live Aid (1985) concert.",
        "imdbID": "tt1727824",
        "__v": 0
    }
]
```

#### POST
requires "title" in request otherwise will return error message
will return shortened object returned by http://www.omdbapi.com/ and will add it to the db

* EXAMPEL REQUEST
```json
{
	"title": "Fantastic Beasts"
}
```

* EXAMPLE RESPONSE
```json
{
    "_id": "5c04410aa5aba23b94e17bba",
    "Title": "Fantastic Beasts and Where to Find Them",
    "Year": 2016,
    "Rated": "PG-13",
    "Released": "2016-11-17T23:00:00.000Z",
    "Runtime": "133 min",
    "Plot": "The adventures of writer Newt Scamander in New York's secret community of witches and wizards seventy years before Harry Potter reads his book in school.",
    "imdbID": "tt3183660",
    "__v": 0
}
```

## comments
### POST
requires "movie_id" and "text" to create a comment

*EXAMPLE REQUEST
```json
{
    "movie_id": "5c04410aa5aba23b94e17bba",
    "text": "comment text"
}
```

RESPONSE will contain the created comment if specified movie id will be found in the db

### GET
*NO PARAMETERS
if no parameters will be specified it will fetch all comments present in db
*MOVIE ID SPECIFIED
if movie_id has been specified it will return an array of comments added to sleceted movie