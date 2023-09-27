# Wartel

## Getting Started

First, run the development server:

```bash
pnpm i && pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

## Features

### Favourite

- get favourite contacts

  - use variables: {where: {id: \_in: []}}

- add contact to favourites

  - read, filter, then persist the favourite contacts id using reactive variable
  - invalidate using specific variable / both (easies)

- delete favourite contact

  - delete contact to server
  - invalidate both all and favourite contacts

- edit favourite contact

  - edit contact to server
  - invalidate using specific variable / both (easies)

- unfavourite contact
  - read, filter, then persist the favourite contacts id using reactive variable
  - invalidate using specific variable / both (easies)
