# Autocomplete Component for Splunkbase apps 

Hi there! Thanks for taking time to review this app. 😊

### To run: 
Run ```npm install && npm start```.

### To test:
Run ```npm test```.

### Notes
- This component keys off of the app name and provides suggestions based on that. This can be updated by passing in a different `keyName` to the `Autocomplete` component.
- There's a CORS issue when grabbing data which is why I added a value in package.json. This is not meant to be a production level change, and instead a better change would be to update the `app-discovery-service` service in Gitlab under `config/default.yml` to allow for requests from localhost:<port>.
- For larger data sets, it might be preferable to handle the search in the backend and create an endpoint that allows a user to pass a search query and return the relevant results. (right now I am just checking if the substring exists in the data set). 
- To handle the bumps in performance since there are over 2k items, I added a debounce function on the input handler to determine valid suggestions, as well as truncated the suggestion results (typing in Splunk as an example slows down the performance of the page since there are many relevant results)
