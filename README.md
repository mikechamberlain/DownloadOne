# DownloadOne

## Prerequisites

- yarn
- wine
- electron
- electron-packager

## Development

During development, code is served from the HTTP development server. This gives us nice stuff like live reloading.

First we need to start the web server:

```bash
ng serve
```

Then we can start our electron app:

```bash
electron .
```

## Building

In production, code is served from the local file system. To build and run:

```bash
yarn build
cd dist
electron .
```

A shortcut for the above is:

```bash
yarn prod
```

## Packaging

To package the application as platform-specific executables:

```bash
yarn package
```
