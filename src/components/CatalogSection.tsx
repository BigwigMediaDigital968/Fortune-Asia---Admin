import React, { useState } from "react";
import CatalogCard from "./CatalogCard";
import CatalogPreviewModal from "./CatalogPreviewModal";
import Navbar from "./Nav";
import Footer from "./Footer";
import { catalogImgData } from "../data/catalogImgData";
import { Helmet } from "react-helmet-async";

const catalogItems = [
  {
    title: "Best Emaar Offers",
    subtitle: "TOP 10 PROJECTS FROM DUBAI LEADING DEVELOPER",
    cover: catalogImgData[0].cover,
    pages: catalogImgData[0].pages,
  },
  {
    title: "Branded Homes",
    subtitle:
      "CURATED PROJECTS IN DUBAI MADE IN COLLABORATION WITH FAMOUS BRANDS",
    cover: catalogImgData[1].cover,
    pages: catalogImgData[1].pages,
  },
  {
    title: "Branded Homes",
    subtitle:
      "CURATED PROJECTS IN DUBAI MADE IN COLLABORATION WITH FAMOUS BRANDS",
    cover: catalogImgData[2].cover,
    pages: catalogImgData[2].pages,
  },
  {
    title: "Branded Homes",
    subtitle:
      "CURATED PROJECTS IN DUBAI MADE IN COLLABORATION WITH FAMOUS BRANDS",
    cover: catalogImgData[3].cover,
    pages: catalogImgData[3].pages,
  },
  {
    title: "Branded Homes",
    subtitle:
      "CURATED PROJECTS IN DUBAI MADE IN COLLABORATION WITH FAMOUS BRANDS",
    cover: catalogImgData[4].cover,
    pages: catalogImgData[4].pages,
  },
  {
    title: "Branded Homes",
    subtitle:
      "CURATED PROJECTS IN DUBAI MADE IN COLLABORATION WITH FAMOUS BRANDS",
    cover: catalogImgData[5].cover,
    pages: catalogImgData[5].pages,
  },
];

const CatalogSection: React.FC = () => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [activePages, setActivePages] = useState<string[]>([]);

  const handlePreview = (pages: string[]) => {
    setActivePages(pages);
    setPreviewOpen(true);
  };

  return (
    <>
      <Helmet>
        <title>Dubai Property Catalogs | Latest Projects & Offers</title>

        <meta
          name="title"
          content="Dubai Property Catalogs | Latest Projects & Offers"
        />
        <meta
          name="description"
          content="Download latest Dubai property catalogs including off-plan & ready projects. Call +971521110794 for exclusive offers."
        />

        <meta
          name="keywords"
          content="dubai property catalog, off plan projects dubai, new projects dubai, dubai real estate brochures, property listings dubai"
        />

        <meta name="robots" content="index, follow, max-image-preview:large" />

        <link rel="canonical" href="https://www.mondusproperties.ae/catalogs" />

        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://www.mondusproperties.ae/catalogs"
        />
        <meta
          property="og:title"
          content="Dubai Property Catalogs | Latest Projects & Offers"
        />
        <meta
          property="og:description"
          content="Download latest Dubai property catalogs including off-plan & ready projects. Call +971521110794 for exclusive offers."
        />
        <meta
          property="og:image"
          content="https://www.mondusproperties.ae/og-buy.jpg"
        />
        <meta property="og:site_name" content="Mondus Properties" />
        <meta property="og:locale" content="en_AE" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:url"
          content="https://www.mondusproperties.ae/catalogs"
        />
        <meta
          name="twitter:title"
          content="Dubai Property Catalogs | Latest Projects & Offers"
        />
        <meta
          name="twitter:description"
          content="Download latest Dubai property catalogs including off-plan & ready projects. Call +971521110794 for exclusive offers."
        />
        <meta
          name="twitter:image"
          content="https://www.mondusproperties.ae/og-buy.jpg"
        />

        <meta name="geo.region" content="AE-DU" />
        <meta name="geo.placename" content="Dubai" />
        <meta name="geo.position" content="25.2048;55.2708" />
        <meta name="ICBM" content="25.2048, 55.2708" />
      </Helmet>

      <div className="bg-white dark:bg-black text-black dark:text-white font-raleway font-light dark:font-thin">
        <Navbar />
        <div className="w-[90%]  mx-auto  p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 py-28">
          {catalogItems.map((item, idx) => (
            <CatalogCard
              key={idx}
              title={item.title}
              subtitle={item.subtitle}
              imageUrl={item.cover}
              onPreview={() => handlePreview(item.pages)}
              images={item.pages}
            />
          ))}
          <CatalogPreviewModal
            isOpen={previewOpen}
            onRequestClose={() => setPreviewOpen(false)}
            images={activePages}
          />
        </div>
        <Footer />
      </div>
    </>
  );
};

export default CatalogSection;
