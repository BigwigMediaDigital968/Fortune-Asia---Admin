import { useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import Navbar from "../components/Nav";
import Footer from "../components/Footer";
import { Helmet } from "react-helmet";
import NotifyMe from "../components/NotifyMe";

interface FAQ {
  question: string;
  answer: string;
}

interface BlogType {
  title: string;
  coverImage: string;
  coverImageAlt?: string;
  author: string;
  datePublished: string;
  lastUpdated?: string;
  content: string;
  slug: string;
  excerpt?: string;
  faqs?: FAQ[];
  tags?: string[];
}

interface TocItem {
  id: string;
  text: string;
  level: "h2" | "h3";
}

const API_BASE = import.meta.env.VITE_API_BASE_URL + "/api/blogs";
const SITE_URL = "https://www.mondusproperties.ae";

const sanitizeContent = (html: string): string => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");

  const STRIP_PROPS = [
    "color",
    "background-color",
    "background",
    "font-family",
  ];

  doc.body.querySelectorAll<HTMLElement>("*").forEach((el) => {
    STRIP_PROPS.forEach((prop) => el.style.removeProperty(prop));

    // If style attr is now empty, remove it entirely for cleanliness
    if (!el.getAttribute("style")?.trim()) el.removeAttribute("style");
  });

  return doc.body.innerHTML;
};

// ── Accordion FAQ item ──────────────────────────────────────────────────────
const FaqItem = ({ faq }: { faq: FAQ; index: number }) => {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={`border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden transition-all duration-300 ${
        open ? "shadow-md" : ""
      }`}
    >
      <button
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary-color)]"
      >
        <span className="font-semibold text-base text-gray-900 dark:text-gray-100 leading-snug">
          {faq.question}
        </span>
        <span
          className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 transition-transform duration-300 ${
            open ? "rotate-45" : ""
          }`}
          aria-hidden="true"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7 1V13M1 7H13"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
        </span>
      </button>

      <div
        className={`grid transition-all duration-300 ease-in-out ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <p className="px-6 pb-5 pt-1 text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
            {faq.answer}
          </p>
        </div>
      </div>
    </div>
  );
};

// ── Main component ──────────────────────────────────────────────────────────
const BlogDetails = () => {
  const { slug } = useParams<{ slug: string }>();
  const [blog, setBlog] = useState<BlogType | null>(null);
  const [toc, setToc] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const contentRef = useRef<HTMLDivElement>(null);

  // ── Fetch blog ─────────────────────────────────────────────────────────
  // useEffect(() => {
  //   const fetchBlog = async () => {
  //     const res = await axios.get(`${API_BASE}/viewblog`);
  //     const blogList: BlogType[] = res.data.blogs || res.data;
  //     const found = blogList.find((b) => b.slug === slug);
  //     if (!found) return;

  //     // Parse content & inject IDs only on h2 headings for TOC
  //     const parser = new DOMParser();
  //     const doc = parser.parseFromString(found.content, "text/html");
  //     const headings = doc.querySelectorAll("h2");
  //     const tocItems: TocItem[] = [];

  //     headings.forEach((el, i) => {
  //       const id = `heading-${i}`;
  //       el.setAttribute("id", id);
  //       tocItems.push({
  //         id,
  //         text: el.textContent ?? "",
  //         level: "h2",
  //       });
  //     });

  //     setToc(tocItems);
  //     // Sanitize AFTER headings have been ID-stamped so we preserve those attrs
  //     found.content = sanitizeContent(doc.body.innerHTML);
  //     setBlog(found);
  //   };

  //   if (slug) fetchBlog();
  // }, [slug]);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`${API_BASE}/${slug}`);

        // ✅ Handle redirect (slug history support)
        if (res.data.redirect) {
          window.location.replace(`/blogs/${res.data.newSlug}`);
          return;
        }

        const found: BlogType = res.data.blog;

        if (!found) return;

        // Generate TOC
        const parser = new DOMParser();
        const doc = parser.parseFromString(found.content, "text/html");
        const headings = doc.querySelectorAll("h2");

        const tocItems: TocItem[] = [];

        headings.forEach((el, i) => {
          const id = `heading-${i}`;
          el.setAttribute("id", id);

          tocItems.push({
            id,
            text: el.textContent ?? "",
            level: "h2",
          });
        });

        setToc(tocItems);

        found.content = sanitizeContent(doc.body.innerHTML);
        setBlog(found);
      } catch (error) {
        console.error("Error fetching blog:", error);
      }
    };

    if (slug) fetchBlog();
  }, [slug]);

  // ── Highlight active TOC item on scroll ───────────────────────────────
  useEffect(() => {
    if (!toc.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: "-20% 0% -70% 0%", threshold: 0 },
    );

    toc.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [toc]);

  if (!blog) return null;

  // ── Schema data ────────────────────────────────────────────────────────
  const pageUrl = `${SITE_URL}/blogs/${blog.slug}`;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: blog.title,
    image: blog.coverImage,
    author: { "@type": "Person", name: blog.author },
    datePublished: blog.datePublished,
    dateModified: blog.lastUpdated ?? blog.datePublished,
    description: blog.excerpt,
    url: pageUrl,
    publisher: {
      "@type": "Organization",
      name: "Your Site Name",
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo.png`,
      },
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blogs",
        item: `${SITE_URL}/blogs`,
      },
      { "@type": "ListItem", position: 3, name: blog.title, item: pageUrl },
    ],
  };

  const faqSchema = blog.faqs?.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: blog.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      }
    : null;

  const formattedDate = new Date(blog.datePublished).toLocaleDateString(
    "en-US",
    { year: "numeric", month: "long", day: "numeric" },
  );

  const formattedUpdated = blog.lastUpdated
    ? new Date(blog.lastUpdated).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  return (
    <div className="bg-white dark:bg-black text-black dark:text-white min-h-screen">
      {/* ── SEO Head ────────────────────────────────────────────────────── */}
      <Helmet>
        <title>{blog.title}</title>
        <meta name="description" content={blog.excerpt} />
        {blog.tags && <meta name="keywords" content={blog.tags.join(", ")} />}
        <link rel="canonical" href={pageUrl} />

        {/* OpenGraph */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content={blog.title} />
        <meta property="og:description" content={blog.excerpt} />
        <meta property="og:image" content={blog.coverImage} />
        <meta property="og:url" content={pageUrl} />
        <meta property="article:published_time" content={blog.datePublished} />
        {blog.lastUpdated && (
          <meta property="article:modified_time" content={blog.lastUpdated} />
        )}

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={blog.title} />
        <meta name="twitter:description" content={blog.excerpt} />
        <meta name="twitter:image" content={blog.coverImage} />

        {/* Schemas */}
        <script type="application/ld+json">
          {JSON.stringify(articleSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
        {faqSchema && (
          <script type="application/ld+json">
            {JSON.stringify(faqSchema)}
          </script>
        )}
      </Helmet>

      <Navbar />

      {/* ── Hero Banner ─────────────────────────────────────────────────── */}
      <section className="relative w-full h-[60vh] min-h-[380px] max-h-[640px] mt-16 overflow-hidden">
        <img
          src={blog.coverImage}
          alt={blog.coverImageAlt ?? blog.title}
          className="absolute inset-0 w-full h-full object-cover"
          loading="eager"
        />
        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />

        {/* Hero text */}
        <div className="relative z-10 h-full flex flex-col justify-end max-w-5xl mx-auto px-6 pb-10">
          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-xs text-white/70 mb-4"
          >
            <a href="/" className="hover:text-white transition-colors">
              Home
            </a>
            <span>/</span>
            <a href="/blogs" className="hover:text-white transition-colors">
              Blogs
            </a>
            <span>/</span>
            <span className="text-white/50 truncate max-w-[200px]">
              {blog.title}
            </span>
          </nav>

          <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-4 drop-shadow-lg">
            {blog.title}
          </h1>

          <div className="flex flex-wrap items-center gap-3 text-sm text-white/80">
            <span className="flex items-center gap-1.5">
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              {blog.author}
            </span>
            <span className="text-white/40">•</span>
            <span className="flex items-center gap-1.5">
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              {formattedDate}
            </span>
            {formattedUpdated && formattedUpdated !== formattedDate && (
              <>
                <span className="text-white/40">•</span>
                <span className="text-white/60 text-xs">
                  Updated {formattedUpdated}
                </span>
              </>
            )}
          </div>
        </div>
      </section>

      {/* ── Body Layout ─────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 grid grid-cols-1 lg:grid-cols-4 gap-10">
        {/* ── Sidebar TOC (desktop) ──────────────────────────────────────── */}
        <aside className="hidden lg:block lg:col-span-1">
          <div className="sticky top-24 border border-gray-200 dark:border-gray-700 rounded-2xl p-5">
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-4">
              Table of Contents
            </p>
            <nav aria-label="Table of contents">
              <ul className="space-y-1">
                {toc.map((item) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      className={`block text-sm py-1.5 px-3 rounded-lg transition-all duration-200 leading-snug ${
                        activeId === item.id
                          ? "bg-[var(--primary-color)]/10 text-[var(--primary-color)] font-semibold"
                          : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800"
                      }`}
                    >
                      {item.text}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </aside>

        {/* ── Main Content ───────────────────────────────────────────────── */}
        <main className="lg:col-span-3 min-w-0">
          {/* Mobile TOC */}
          {toc.length > 0 && (
            <details className="lg:hidden mb-8 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden group">
              <summary className="flex items-center justify-between px-5 py-4 cursor-pointer font-semibold text-sm select-none bg-gray-50 dark:bg-gray-900 list-none">
                <span>Table of Contents</span>
                <svg
                  className="w-4 h-4 transition-transform group-open:rotate-180"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </summary>
              <ul className="px-5 pb-4 pt-2 space-y-1 bg-white dark:bg-black">
                {toc.map((item) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      className="block text-sm py-1 text-gray-600 dark:text-gray-400 hover:text-[var(--primary-color)]"
                    >
                      {item.text}
                    </a>
                  </li>
                ))}
              </ul>
            </details>
          )}

          {/* Excerpt / intro callout */}
          {blog.excerpt && (
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed border-l-4 border-[var(--primary-color)] pl-5 mb-10 italic">
              {blog.excerpt}
            </p>
          )}

          {/* Blog HTML content */}
          <div
            ref={contentRef}
            className={`
              jodit-content
              prose prose-lg dark:prose-invert max-w-none
              prose-headings:font-bold prose-headings:scroll-mt-28
              prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
              prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3
              prose-p:leading-relaxed prose-p:text-gray-700 dark:prose-p:text-gray-300
              prose-a:text-[var(--primary-color)] prose-a:no-underline hover:prose-a:underline
              prose-img:rounded-xl prose-img:shadow-md prose-img:my-6 prose-img:mx-auto
              prose-strong:text-gray-900 dark:prose-strong:text-white
              prose-blockquote:border-[var(--primary-color)] prose-blockquote:bg-gray-50 dark:prose-blockquote:bg-gray-900 prose-blockquote:rounded-r-xl prose-blockquote:py-2
            `}
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />

          {/* Tags */}
          {blog.tags && blog.tags.length > 0 && (
            <div className="mt-10 flex flex-wrap gap-2">
              {blog.tags
                .flatMap((tag) => tag.split(",").map((t) => t.trim()))
                .map((tag, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 text-xs font-medium rounded-full border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-900"
                  >
                    #{tag}
                  </span>
                ))}
            </div>
          )}

          {/* ── FAQ Accordion ──────────────────────────────────────────── */}
          {(blog.faqs?.length ?? 0) > 0 && (
            <section className="mt-14" aria-labelledby="faq-heading">
              <div className="flex items-center gap-3 mb-6">
                <h2
                  id="faq-heading"
                  className="text-2xl font-bold text-gray-900 dark:text-white"
                >
                  Frequently Asked Questions
                </h2>
                <span className="text-xs font-semibold bg-[var(--primary-color)]/10 text-[var(--primary-color)] px-2.5 py-1 rounded-full">
                  {blog.faqs!.length} questions
                </span>
              </div>

              <div className="space-y-3">
                {blog.faqs!.map((faq, i) => (
                  <FaqItem key={i} faq={faq} index={i} />
                ))}
              </div>
            </section>
          )}
        </main>
      </div>

      <NotifyMe />
      <Footer />
    </div>
  );
};

export default BlogDetails;
