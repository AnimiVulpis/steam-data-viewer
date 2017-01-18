## Simple example data gathering

Using this to get the `html` that will contain the list of all the games a user owns

    $ http -d http://steamcommunity.com/id/<USERNAME>/games/?tab=all&sort=name > games.html
    $
    $ pup -f games.html 'script[language="javascript"]' | grep -o 'rgGames = \[{[^;]*' | cut -c 11- | jq '.' > games.json

Get the profile link (profile_link) via:

    $ pup -f games.html 'script[language="javascript"]' | grep -o 'profileLink = "[^"]*' | cut -c 16-

## Raw data

    ### "achievements"
        ### achievements": false
        ### achievements": true
    ### "appid"
    ### "availStatLinks": object
    ### "friendlyURL"
     ## "friendly_name"
    ### "global_achievements": bool
    ### "global_leaderboards": bool
      # "has_adult_content": [1| ]
      # "hours": float
    ### "hours_forever": float
    ### "last_played"
    ### "leaderboards"
    ### "logo"
    ### "name"
    ### "stats"

## Derived data

- Store link: `http://store.steampowered.com/app/<APPID>`
- Recommend game: `http://store.steampowered.com/recommended/recommendgame/<APPID>`
- Forum: `http://store.steampowered.com/forum/<APPID>`
- Official site: `http://store.steampowered.com/appofficialsite/<APPID>` You will be redirected
- News: `http://store.steampowered.com/news/?appids=<APPID>`
- Personal Achievements: `#{profile_link}/stats/#{friendlyURL}/?tab=achievements`
- Personal Stats: `#{profile_link}/stats/#{friendlyURL}/?tab=stats`
- Personal Leaderboards: `#{profile_link}/stats/#{friendlyURL}/?tab=leaderboards`
- Global Achievements: `http://steamcommunity.com/stats/#{friendlyURL}/achievements/`
- Global Leaderboards: `http://steamcommunity.com/stats/#{friendlyURL}/leaderboards/`
