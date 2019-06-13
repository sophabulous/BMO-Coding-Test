Technical questions

1.	How long did you spend on the coding test? What would you add to your solution if you had more time? If you didn't spend much time on the coding test then use this as an opportunity to explain what you would add.
3 hours.
I would like to figure out what is taking so long to load the data, and see if there's anything I can do on the application side to mediate it. I would also add a sort by location function where user can sort the restaurants by proximity to their own location.

2.	What was the most useful feature that was added to the latest version of your chosen language? Please include a snippet of code that shows how you've used it.
Arrow function
```
const getRestaurants = (url, restaurants, resolve, reject) => {
  axios.get(url)
    .then(response => {
      const retrievedRestaurants = restaurants.concat(response.data.restaurants);
      console.log(response.data.current_page);
      if (response.data.current_page * response.data.per_page < response.data.total_entries) {
        getRestaurants(url + "&page=" + (response.data.current_page + 1).toString(), retrievedRestaurants, resolve, reject);
      } else {
        resolve(retrievedRestaurants);
      }
    })
    .catch(error => {
      console.log(error);
      reject('Something wrong. Please refresh the page and try again.');
    })
}
```

3.	How would you track down a performance issue in production? Have you ever had to do this?
I would use the dev tools in chrome to see how much it loads each segment of the code. The ones that take a long time to load mean that there are performance issues. I never had to do it but I've seen someone else do it.

4.	How would you improve the API that you just used?
I would use "next" and "previous" in the api response to keep track of the pagination. It's a bit awkward having to calculate the product of "response.data.per_page" and "response.data.current_page" to see if they have exceeded "response.data.total_entries" yet. If there's a "next" object, then I can simple check if it's null to determine whether to keep fetching the data.

5.	Please describe yourself using JSON.
sophie = {
            "name": "Sophie Wang",
            "gender": "female",
            "location": "Toronto",
            "education": "University of Toronto",
            "program": [
                "Computer Science",
                "Cinema Studies"
            ]
            "hobbies": [
                "programming",
                "reading",
                "writing",
                "filmmaking"
            ],
            "favourite_films": [
              "Casablanca",
              "Written on the Wind",
              "Barry Lyndon"
            ]
          }
