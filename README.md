# DownloadOne

## Development

When developing, we serve the code from an HTTP development server. This gives us nice stuff like live reloading
for free.

First we need to start the web server:

```bash
ng serve
```

Then we can start our electron app:

```bash
electron .
```

## Building for production

In a packaged production application all the files are served from the file system. To build and run:

```bash
yarn run build
cd dist
electron .
```

A shortcut for the aboe is:

```bash
yarn run prod
```
