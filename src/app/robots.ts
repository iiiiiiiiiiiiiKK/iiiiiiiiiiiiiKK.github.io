import type { MetadataRoute } from "next";
import { config } from "@/data/config";

// Required for `output: "export"` — robots has no dynamic parts.
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${config.site}/sitemap.xml`,
    host: config.site,
  };
}
