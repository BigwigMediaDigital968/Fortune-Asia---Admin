import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  MapPin,
  BedDouble,
  Ruler,
  Bath,
  Building,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Navbar from "../components/Nav";
import Footer from "../components/Footer";
import NotifyMe from "../components/NotifyMe";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const BuyDetails = () => {
  const { idOrSlug } = useParams<{ idOrSlug: string }>();
  const [property, setProperty] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // console.log(idOrSlug);

  /* ================= FETCH PROPERTY ================= */
  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/property/${idOrSlug}`);
        const json = await res.json();

        if (json.success && json.data) {
          setProperty(json.data);
          console.log("Fetched property:", json.data);
        } else {
          setProperty(null);
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setProperty(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [idOrSlug]);

  // console.log(property);

  if (loading) {
    return <div className="text-center py-24">Loading...</div>;
  }

  if (!property) {
    return <div className="text-center py-24">Property not found</div>;
  }

  /* ================= SAFE DATA ================= */
  const images: string[] = property.propertyImages || [];

  const sliderSettings = {
    slidesToShow: 1,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: true,
    nextArrow: (
      <div className="absolute right-4 top-1/2 -translate-y-1/2 z-10 cursor-pointer">
        <ChevronRight size={36} />
      </div>
    ),
    prevArrow: (
      <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10 cursor-pointer">
        <ChevronLeft size={36} />
      </div>
    ),
  };

  const getEmbedMapUrl = (url: string) => {
    if (!url) return "";
    if (url.includes("maps.google.com")) return url;
    if (url.includes("google.com/maps")) return url;

    // fallback: open share links via embed wrapper
    return `https://www.google.com/maps?q=${encodeURIComponent(url)}&output=embed`;
  };

  const getYoutubeEmbedUrl = (url: string) => {
    if (!url) return "";

    if (url.includes("embed")) return url;

    const videoId = url.includes("youtu.be")
      ? url.split("youtu.be/")[1]?.split("?")[0]
      : url.split("v=")[1]?.split("&")[0];

    return videoId ? `https://www.youtube.com/embed/${videoId}` : "";
  };

  return (
    <div className="bg-white dark:bg-black text-black dark:text-white">
      <Navbar />

      {/* ================= IMAGES ================= */}
      {images.length > 0 && (
        <div className="mt-16">
          <Slider {...sliderSettings}>
            {images.map((img, i) => (
              <img
                key={i}
                src={`${img}`}
                className="w-full h-[80vh] object-cover"
                alt={property.propertyName}
              />
            ))}
          </Slider>
        </div>
      )}

      {/* ================= DETAILS ================= */}
      <div className="max-w-6xl mx-auto px-6 py-12 space-y-10">
        {/* Title */}
        <div className="flex flex-wrap justify-between gap-6">
          <div>
            <h1 className="text-3xl font-semibold">{property.propertyName}</h1>
            <p className="flex items-center gap-1 text-gray-500 mt-2">
              <MapPin size={16} />
              {property.subArea}
            </p>
          </div>

          <div className="text-2xl font-bold text-[var(--primary-color)]">
            AED {property.price?.toLocaleString()}
          </div>
        </div>

        {/* Specs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex gap-2">
            <BedDouble /> {property.bedroom} Beds
          </div>
          <div className="flex gap-2">
            <Bath /> {property.bathroom} Baths
          </div>
          <div className="flex gap-2">
            <Ruler /> {property.sizeSqft} sqft
          </div>
          <div className="flex gap-2">
            <Building /> {property.propertyType}
          </div>
        </div>

        {/* Description */}
        {property.propertyDetails && (
          <div>
            <h2 className="text-xl font-semibold mb-2">Property Description</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {property.propertyDetails}
            </p>
          </div>
        )}

        {/* Highlights */}
        {property.highlights?.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold mb-2">Highlights</h2>
            <ul className="grid md:grid-cols-3 gap-2">
              {property.highlights.map((h: string, i: number) => (
                <li key={i}>• {h}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Amenities */}
        {property.featuresAmenities?.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold mb-2">Amenities</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {property.featuresAmenities.map((a: string, i: number) => (
                <span key={i} className="border px-3 py-2 rounded text-sm">
                  {a}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* {property.propertyBrochure && (
          <a
            href={`${API_BASE_URL}${property.propertyBrochure}`}
            target="_blank"
            rel="noreferrer"
            className="inline-block mt-4 px-4 py-2 bg-[var(--primary-color)] text-white rounded"
          >
            📄 Download Brochure
          </a>
        )} */}

        {/* ================= VIDEO TOUR ================= */}
        {property.videoLink && (
          <div>
            <h2 className="text-xl font-semibold mb-3">Video Tour</h2>
            <div className="relative w-full aspect-video rounded overflow-hidden border">
              <iframe
                src={getYoutubeEmbedUrl(property.videoLink)}
                className="absolute inset-0 w-full h-full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        )}

        {/* ================= MAP ================= */}
        {property.googleMapUrl && (
          <div>
            <h2 className="text-xl font-semibold mb-3">Location</h2>
            <div className="w-full h-[350px] rounded overflow-hidden border">
              <iframe
                src={getEmbedMapUrl(property.googleMapUrl)}
                className="w-full h-full border-0"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        )}
      </div>

      <NotifyMe />
      <Footer />
    </div>
  );
};

export default BuyDetails;
