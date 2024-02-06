# Froakbot-Website-Frontend

#### V2 of the discord bot frontend

##Component Tree:
```
-<App/>
    -<Header/>
        -<RaidFiltersModal/>
        -<LootFiltersModal/>
        -<CharactersFiltersModal/>
    -<Routes/>
        -<Route/>
            -path="/home
            -element={<Home/>}
                          -<CharactersHomepageCard/>
                          -<LootHomepageCard/>
                          -<RaidsHomepageCard/>
        -<Route/>
            -path="/characters
            -element={<Characters/>}
        -<Route/>
            -path="/loot
            -element={<Loot/>}
        -<Route/>
            -path="/raids
            -element=[<Raids/>}
```
The bot 'points' to the same database that the discord bot uses. This will allow guildmates to query the database through a nice, clean frontend.

The QueryCards are not created yet (these will be the cards I render from the backend fetched results), for now im simply rendering basic strings from the fetched objects.

The cards on the home page link to the same pages that the header links link to, which I will call 'Views' for this readme. The 'Views' (Home.jsx, Characters.jsx, Raids.jsx, Loot.jsx) are just the main components / pages, which are handled by react-router-dom.

Every active 'View' brings up a 'Filters' button, and each 'View' has its own modal.

When App.jsx is rendered, useEffect() with empty array is called, and we do an intial fetch (basically a SELECT ALL on the backend) and then call the appropriate query results setters (useState). We have a 'fetches.js' module to abstract away the Axios calls. Query payloads from the backend are an array of objects. The query results setters are passed to the children who need to call them (children existing in Headers.jsx, aka the Modals). The modals contain search filters, to narrow down our results. When the modal / form is submitted (SELECT ALL WHERE x = y, on the backend), we call the setters to change the state.

When the state setters are called, App.jsx is re-rendered, which cause all children to become re-rendered, and therefore the children 'Views' who diaply the query results now re-render and show the query results.


![image](https://github.com/hikemalliday/froakbot-website-frontend/assets/117792777/61e23bf1-26c5-47fe-a67a-f7917694e3fc)
