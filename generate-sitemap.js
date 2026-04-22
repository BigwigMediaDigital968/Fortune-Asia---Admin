// generate-sitemap.js
import { SitemapStream, streamToPromise } from "sitemap";
import { createWriteStream } from "fs";

const sitemap = new SitemapStream({
  hostname: "https://www.mondusproperties.ae/",
});

const writeStream = createWriteStream("./public/sitemap.xml");

sitemap.pipe(writeStream);

const routes = [
  "/",
  "/buy",
  "/rent",
  "/offplan",
  "/blogs",
  "/contact",
  "/about",
];

routes.forEach((route) => {
  sitemap.write({ url: route });
});

sitemap.end();

streamToPromise(sitemap);
