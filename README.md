# Froakbot-Website-Frontend

#### V2 of the discord bot frontend

The bot 'points' to the same database that the discord bot uses. This will allow guildmates to query the database through a nice, clean frontend.

The QueryCards are not created yet (these will be the cards I render from the backend fetched results)

The cards on the home page link to the same pages, which I will call 'Views' for this readme. The 'Views' are just the main components / pages, which are handled by react-router-dom.

Every active 'View' brings up a 'Filters' button, and each 'View' has its own modal.

When a 'View' is rendered, useEffect() is called with an empty array, and a fetch with empty paramters is sent backend, which basically does a SELECT ALL. If filters are added in the modal, we basically perform a SELECT ALL WHERE

![image](https://github.com/hikemalliday/froakbot-website-frontend/assets/117792777/61e23bf1-26c5-47fe-a67a-f7917694e3fc)
