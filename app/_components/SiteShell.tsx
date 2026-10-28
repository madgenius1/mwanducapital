import type { ReactNode } from "react"
import Navbar from "./Navbar"
import Footer from "./Footer"
import MobileCTA from "./MobileCTA"
import { flags } from "../../config/flags"
export default function SiteShell({ children }: { children: ReactNode }) {
  return (<><Navbar /><main id="top">{children}</main><Footer showAbroad={flags.DIASPORA_PAGE_ENABLED} /><MobileCTA /></>)
}
