import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.APP_URL || "https://tajweedpage.com";

  // Core Pages
  const corePages = [
    { path: "", changeFrequency: "daily" as const, priority: 1.0 },
    { path: "/courses", changeFrequency: "weekly" as const, priority: 0.9 },
    { path: "/free-trial", changeFrequency: "weekly" as const, priority: 0.9 },
    { path: "/pricing", changeFrequency: "weekly" as const, priority: 0.8 },
    { path: "/teacher-profiles", changeFrequency: "weekly" as const, priority: 0.8 },
    { path: "/about", changeFrequency: "monthly" as const, priority: 0.8 },
    { path: "/contact", changeFrequency: "monthly" as const, priority: 0.8 },
    { path: "/blog", changeFrequency: "weekly" as const, priority: 0.7 },
  ];

  // Specific Segment Landing Pages
  const specializedPages = [
    { path: "/quran-classes-for-kids", changeFrequency: "weekly" as const, priority: 0.8 },
    { path: "/quran-classes-in-uk", changeFrequency: "weekly" as const, priority: 0.8 },
    { path: "/quran-classes-in-usa", changeFrequency: "weekly" as const, priority: 0.8 },
    { path: "/quran-in-the-world", changeFrequency: "monthly" as const, priority: 0.7 },
    { path: "/quran-in-the-world/quran-classes-in-europe", changeFrequency: "monthly" as const, priority: 0.7 },
  ];

  // High-value Localized Geo-Targeted Landing Pages
  const geoTargetedPages = [
    { path: "/online-quran-classes-birmingham", changeFrequency: "weekly" as const, priority: 0.8 },
    { path: "/online-quran-classes-california", changeFrequency: "weekly" as const, priority: 0.8 },
    { path: "/online-quran-classes-chicago", changeFrequency: "weekly" as const, priority: 0.8 },
    { path: "/online-quran-classes-france", changeFrequency: "weekly" as const, priority: 0.8 },
    { path: "/online-quran-classes-germany", changeFrequency: "weekly" as const, priority: 0.8 },
    { path: "/online-quran-classes-london", changeFrequency: "weekly" as const, priority: 0.8 },
    { path: "/online-quran-classes-manchester", changeFrequency: "weekly" as const, priority: 0.8 },
    { path: "/online-quran-classes-netherlands", changeFrequency: "weekly" as const, priority: 0.8 },
    { path: "/online-quran-classes-new-york", changeFrequency: "weekly" as const, priority: 0.8 },
    { path: "/online-quran-classes-texas", changeFrequency: "weekly" as const, priority: 0.8 },
  ];

  // Legal Compliance & Support Pages
  const legalPages = [
    { path: "/privacy-policy", changeFrequency: "monthly" as const, priority: 0.3 },
    { path: "/terms-conditions", changeFrequency: "monthly" as const, priority: 0.3 },
  ];

  const allRoutes = [
    ...corePages,
    ...specializedPages,
    ...geoTargetedPages,
    ...legalPages,
  ];

  return allRoutes.map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
