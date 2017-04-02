# DownloadOne

## Development

When developing we serve the code over HTTP from the development server:

```bash
ng serve
```

Then we can start our electron app from a second terminal from the project root:

```bash
electron .
```

## Building for production

In production we serve the application from the file system.

```bash
yarn run build
cd dist
electron .
```

A shortcut for the aboe is:

```bash
yarn run prod
```
