# USC Program History

Create one Markdown file per Program History year in this folder.
Files that start with `_` are ignored by the website, so use `_template.md` as the starting point.

Required fields:

- `year`: The year label shown on the page, for example `2025–26`.
- `sortYear`: Used for sorting. Use the first calendar year as a number, for example `2025`.
- `## Summary`: The paragraph shown under the year.
- `## Cities`: A Markdown table with each city/client.

City table columns:

- `City Name`: The name shown below the logo.
- `City Logo`: Image path. Upload logos to `public/usc-challenge/` and use a path like `/usc-challenge/example-logo.png`.
- `Website`: Required link for the city/client logo card.

The USC Price Partnership page automatically shows all valid Program History files, newest years first.
