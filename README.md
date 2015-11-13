# spark

> A full stack Firebase powered Angular starter kit

## Getting Started

First, download the zip or use the command line to get a local copy

```sh
$ git clone https://github.com/benchlord/spark.git
```

Next, you will need to install all the app components. npm will install both
the Node and Bower dependencies.

```sh
$ npm install
```

Finally, start the server with Gulp:

```sh
$ gulp
```

In your browser navigate to [http://localhost:3000](http://localhost:3000). This
will also start up BrowserSync and Nodemon, allowing your app to reload as you
edit.

### Make it yours

- Change 'myApp' in 'javascripts/app.js' to your app name
- Change 'myApp" in 'views/index.html' to your app name

## Authentication

Adding authentication to your app is extremely simple with Spark. It's as
simple as adding an HTML tag.

### Google

```html
<sp-google></sp-google>
```

If the text attribute doesn't exist it will default to 'Google'

You can easily customize the buttons using normal css. They are both
buttons with a class of 'googleButton'. If you need to customize both the
login button and the logout button separately, just use the id 'googleLogin'
for the login button and 'googleLogout' for the logout button.

### Facebook

```html
<sp-facebook text="Login with Facebook"></sp-facebook>
```

If the text attribute doesn't exist it will default to 'Facebook'

## License

```
Copyright 2015 Brandon Bench

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
```
