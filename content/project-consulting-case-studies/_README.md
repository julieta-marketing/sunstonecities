# Project Consulting Case Studies

Create one Markdown file per Project Consulting case study in this folder.
Files that start with `_` are ignored by the website, so use `_template.md` as the starting point.

Required fields:

- `title`: Case study title.
- `label`: Case study service label. Use `/` or `,` when there are multiple labels.
- `summary`: Short summary shown on the homepage card.
- `date`: Used for sorting. Newest dates appear first.
- `## Challenge`: Challenge text shown on the Project Consulting detail page.
- `## Solution`: Solution text shown on the Project Consulting detail page.

Optional fields:

- `location`: Location tag shown on cards.
- `image`: Image path. Upload images to `public/case-studies/project-consulting/` and use a path like `/case-studies/project-consulting/example.jpg`.

Image notes:

- The image alt text is generated from `title`.
- Image crop position is always centered.

The homepage automatically shows the newest 3 valid case studies.
The Project Consulting detail page automatically shows all valid case studies in date order.
