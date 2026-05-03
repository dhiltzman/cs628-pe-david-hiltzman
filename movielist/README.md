# CS628 Full-Stack Development - Web
**Term:** Spring 2026 | **Author:** David Hiltzman | **Assignment:** PE02 – Movie List

---

## Overview

The input-process-output (IPO) model is a widely used approach in systems analysis and software engineering for describing the structure of an information processing program or another process. Many introductory programming and systems analysis texts introduce this as the most basic structure for describing a process.

## Discussion

A computer program or any other sort of process using the input-process-output model receives inputs from a user or other source, does some computations on the inputs, and returns the results of the computations. The system divides the work into three categories:

- A requirement from the environment (input)
- A computation based on the requirement (process)
- A provision for the environment (output)

### Example: Movie List App

This React application renders a filterable list of movies. Each movie entry displays a title, release year, and genre. The user can select a genre from a dropdown to narrow the displayed results, and clicking any movie card triggers an alert showing the movie title.

Following the IPO model, the program must:

1. **Input:** Accept a genre selection from the user via a dropdown control.
2. **Process:** Filter the internal movies array to return only entries whose genre matches the selected value (or return all entries when "All Genres" is selected).
3. **Output:** Render the filtered list of movie cards to the screen; display an alert with the movie title when a card is clicked.

## Pseudocode

```
Function Main
    // Renders a filterable movie list; alerts title on card click
    Declare Array movies = [ { title, genre, releaseYear }, ... ]
    Declare String selectedGenre = "All Genres"
    Declare Array filtered

    Output genre dropdown populated with unique genres from movies
    Input selectedGenre (from dropdown onChange event)

    If selectedGenre equals "All Genres" Then
        Assign filtered = movies
    Else
        Assign filtered = movies WHERE movie.genre equals selectedGenre
    End If

    Output filtered movie cards (title, genre, releaseYear)

    On card click:
        Input clickedMovie.title
        Output alert(clickedMovie.title)
End
```

## Output

```
// Initial render - All Genres selected
CINEMAVAULT
Your curated film collection

Filter by Genre: [ All Genres v ]

2010  Inception          Sci-Fi    →
2008  The Dark Knight    Action    →
2014  Interstellar       Sci-Fi    →
2019  Parasite           Thriller  →
1972  The Godfather      Drama     →
1994  Pulp Fiction       Thriller  →
2017  Get Out            Horror    →
2015  Mad Max: Fury Road Action    →
2016  Arrival            Sci-Fi    →
2014  Whiplash           Drama     →
                              10 films

// After selecting "Sci-Fi"
2010  Inception     Sci-Fi  →
2014  Interstellar  Sci-Fi  →
2016  Arrival       Sci-Fi  →
                       3 films

// On card click (e.g., Inception)
Alert: "Inception"
```