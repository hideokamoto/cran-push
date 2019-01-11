# [cran-push] Create React App server push header generator for Netlify
It is smple CLI tools for Create React App and Netlify

You can create HTTP2 Server push configure for your React Application created by the Create React App.

## Getting started

```
$ npm i -g cran-push
$ cd /PATH/TO/YOUR/REACT/APP
$ npm run build
$ cran-push generate
Generated files
/*
  Link: </service-worker.js>; rel=preload; as=script
  Link: </static/css/main.8311bcb0.css>; rel=preload; as=style
  Link: </static/js/main.e38f9055.js>; rel=preload; as=script
```

### Before

```
$ tree -L 2 -I node_modules
.
├── README.md
├── package-lock.json
├── package.json
├── public
│   ├── _headers
│   ├── favicon.ico
│   ├── index.html
│   └── manifest.json
├── src
│   ├── App.js
│   ├── App.test.js
│   ├── index.js
└── yarn.lock
```

### After


```
$ tree -L 2 -I node_modules
.
├── README.md
├── package-lock.json
├── package.json
├── build
│   ├── _headers
│   ├── asset-manifest.json
│   ├── favicon.ico
│   ├── index.html
│   ├── manifest.json
│   ├── service-worker.js
├── public
│   ├── _headers
│   ├── favicon.ico
│   ├── index.html
│   └── manifest.json
├── src
│   ├── App.js
│   ├── App.test.js
│   ├── index.js
└── yarn.lock
```
