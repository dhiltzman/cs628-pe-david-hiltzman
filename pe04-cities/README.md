# CS628 Full-Stack Development - Web
# Term: Spring 2026
# Author: David Hiltzman
# Assignment: PE04 – Cities
## Overview
The input–process–output (IPO) model is a widely used approach in systems analysis and software engineering for describing the structure of an information processing program or another process. Many introductory programming and systems analysis texts introduce this as the most basic structure for describing a process.
## Discussion
A computer program or any other sort of process using the input-process-output model receives inputs from a user or other source, does some computations on the inputs, and returns the results of the computations. The system divides the work into three categories:
- A requirement from the environment (input)
- A computation based on the requirement (input)
- A provision for the environment (output)

### Example: Cities React Application

This application allows users to manage and explore city information through a multi-route React interface. Users can view a list of cities, click into individual city detail pages, and add new cities via a form. React Router handles all navigation, and a shared context layer manages state across the app.

Following the IPO model, the program must:

1. **Input:** The user provides city data (name, country, population) through the Add City form, or selects a city from the Cities List to view its details.
2. **Process:** React Router matches the current URL to the appropriate route and component. The `CitiesContext` stores and retrieves city data. The `useParams` hook extracts the city ID from the URL to look up the correct city. Form validation checks that all required fields are present before saving.
3. **Output:** The Cities List displays all cities as clickable links. The City Details view renders the selected city's name, country, and population inline within the same card as the list. After a city is successfully added, the user is automatically redirected to the Cities List.

## Pseudocode
```
Function App
    Wrap application in CitiesProvider (global state)
    Define routes:
        "/" → redirect to "/cities"
        "/cities" → CitiesPage
            "/cities/:cityId" → CityDetails (nested)
        "/add" → AddCityPage
        "*" → redirect to "/cities"

Function CitiesPage
    Read cities from context
    Output list of city names as clickable links
    If cityId param exists, render CityDetails below the list

Function CityDetails
    Read cityId from URL params via useParams()
    Look up city in context by id
    Output city name, country, and population

Function AddCityPage
    Declare String name
    Declare String country
    Declare Number population

    Output form with Name, Country, Population fields
    Input name, country, population from user
    Validate all fields are present and population is a number
    Assign newCity = { id, name, country, population }
    Add newCity to context
    Redirect to "/cities"
End
```