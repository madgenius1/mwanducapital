import type { MetadataRoute } from "next"
import { siteUrl } from "../config/seo"
import { flags } from "../config/flags"
// Legal pages are placeholders and noindex, so they are left out until real text is published.
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["/", "/features", "/about", "/investors", ...(flags.DIASPORA_PAGE_ENABLED ? ["/diaspora"] : [])]
  return paths.map((p) => ({ url: `${siteUrl}${p}`, changeFrequency: "monthly", priority: p === "/" ? 1 : 0.7 }))
}
