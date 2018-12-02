# SimpleMovieAPI
simpe api to add and browse movies and comments

## /api

### /movies
#### GET
* if request has "id" it will return movie with that id if found 
* if request does not have "id" it will return list of all movies in db

### POST
requires "title" in request otherwise will return error message
will return shortened object returned by http://www.omdbapi.com/ and will add it to the db