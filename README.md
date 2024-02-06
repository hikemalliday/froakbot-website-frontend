# Froakbot-Website-Frontend

#### V2 of the discord bot frontend

The bot 'points' to the same database that the discord bot uses. This will allow guildmates to query the database through a nice, clean frontend.

The cards on the home page link to the same pages, which I have dubbed 'Views' in the project. The 'Views' are just the main components / pages, which are handled by react-router-dom.

When a 'View' is rendered, useEffect() with an empty array is called, to perform a fetch to the backend. This fetch sends empty parameters, which means a SELECT ALL.

Every active 'View' brings up a 'Filters' button, and each 'View' has its own modal.

When a 'View' is rendered, a fetch with empty paramteres is sent backend, which basically does a SELECT ALL. If filters are added in the modal, we basically perform a SELECT ALL WHERE

![image](https://github.com/hikemalliday/froakbot-website-frontend/assets/117792777/61e23bf1-26c5-47fe-a67a-f7917694e3fc)
