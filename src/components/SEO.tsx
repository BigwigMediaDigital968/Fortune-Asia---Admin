import { Helmet } from "react-helmet-async";

const SEO = () => {
  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": "https://www.mondusproperties.ae/#organization",
      name: "Mondus Properties",
      url: "https://www.mondusproperties.ae/",
      logo: "https://www.mondusproperties.ae/logo.png",
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+971521110794",
        contactType: "customer service",
        areaServed: "AE",
        availableLanguage: ["English"],
      },
      sameAs: [
        "https://ae.linkedin.com/company/mondusproperties",
        "https://www.instagram.com/mondusproperties/",
        "https://www.facebook.com/mondus.properties/",
        "https://www.youtube.com/@MondusPropertiesOfficial",
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "RealEstateAgent",
      "@id": "https://www.mondusproperties.ae/#realestateagent",
      name: "Mondus Properties",
      image: "https://www.mondusproperties.ae/logo.png",
      url: "https://www.mondusproperties.ae/",
      telephone: "+971521110794",
      priceRange: "$$$",
      address: {
        "@type": "PostalAddress",
        streetAddress:
          "Stadium Point Tower - Office 305, Al Hebiah Fourth, Dubai Sports City",
        addressLocality: "Dubai",
        addressRegion: "Dubai",
        postalCode: "00000",
        addressCountry: "AE",
      },
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ],
          opens: "09:00",
          closes: "18:00",
        },
      ],
    },
  ];

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
};

export default SEO;
