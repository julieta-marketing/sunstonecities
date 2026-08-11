# Sunstone Moments That Mattered

Create one Markdown file per gallery image in this folder.
Files that start with `_` are ignored by the website, so use `_template.md` as the starting point.

Required fields:

- `image`: Image path. Upload images to `public/events-gallery/optimized/` and use a path like `/events-gallery/optimized/example.jpg`.
- `tag`: Text shown on top of the image.
- `order`: Number used for display order. Lower numbers appear first.

Image notes:

- The image alt text is generated from `tag`.
- The website reads at most 30 valid moments.
- The `order` number is not displayed in the UI.
