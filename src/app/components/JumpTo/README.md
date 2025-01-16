## Description

The JumpTo component serves as an in-page navigation menu, similar to a table of contents, allowing users to quickly jump to specific headings within an article. This component renders text as a `strong` element, a list of `anchor` links, and groups them within a `navigation` landmark. When a link is actioned, the page scrolls down to the relevant heading, identified by matching anchor `ids`.

This component is typically used in articles with multiple headings, enhancing content findability by providing quick navigation options.

## Props

| Name       | type   | Description                                   |
| ---------- | ------ | --------------------------------------------- |
| jumpToData | object | Contains article headings with titles and IDs |
