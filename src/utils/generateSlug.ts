const generateSlug = (text: string) =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "") // remove special chars
    .replace(/\s+/g, "-") // spaces → hyphen
    .replace(/-+/g, "-"); // remove double hyphens

export default generateSlug;
