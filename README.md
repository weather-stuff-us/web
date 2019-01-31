web ui for weather-stuff-us
================================================================================

The web ui resources for a web application displaying weather data.

Part of the [weather-stuff-us][] family of projects.

The distributable files are available in the `dist` directory.

[weather-stuff-us]: https://weather-stuff-us.github.io/

build
================================================================================

The source files in `src` can be rebuilt to the distributable files via

    npm run build


development
================================================================================

Because this project only contains the web ui, and not the weather APIs, a
dev server is available which serves up the the web ui locally, and
redirects api calls to an api server (eg, [server-express][]) running at
localhost:3000.  The dev server is started via:

    node dev-server

[server-express]: https://github.com/weather-stuff-us/server-api


license
================================================================================

This package is licensed under the MIT license.  See the [LICENSE.md][] file
for more information.


contributing
================================================================================

Awesome!  We're happy that you want to contribute.

Please read the [CONTRIBUTING.md][] file for more information.


[LICENSE.md]: LICENSE.md
[CONTRIBUTING.md]: CONTRIBUTING.md