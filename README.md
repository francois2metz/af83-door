# ReST API to open the door at af83

## Install

    cd door
    npm install
    cp config.json.dist config.json
    node server.js

## Config


* door.host: the hostname or ip of the arduino
* door.port
* door.timeout: time in millisecond before canceling the request
* api.port: port of node api
* auth_http_backend: the web service checking the identity. Must return a 200.

## API

### Open the door

    curl -X POST --basic --user username:pasword http://localhost:3000/door

## License

            DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
                    Version 2, December 2004

    Copyright (C) 2004 Sam Hocevar <sam@hocevar.net>

    Everyone is permitted to copy and distribute verbatim or modified
    copies of this license document, and changing it is allowed as long
    as the name is changed.

            DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
    TERMS AND CONDITIONS FOR COPYING, DISTRIBUTION AND MODIFICATION

    0. You just DO WHAT THE FUCK YOU WANT TO.
