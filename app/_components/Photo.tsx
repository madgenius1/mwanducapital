"use client"
import Image from "next/image"
import { useState } from "react"
export default function Photo({ src, alt, className = "", rounded = "rounded-[28px]", sizes = "(min-width:1024px) 50vw, 100vw" }: { src: string; alt: string; className?: string; rounded?: string; sizes?: string }) {
  const [failed, setFailed] = useState(false)
  return (
    <div className={`relative overflow-hidden bg-lilac ${rounded} ${className}`}>
      {failed ? <div className="absolute inset-0 grid place-items-center p-4 text-center text-sm text-muted">Photo placeholder · {alt}</div>
        : <Image src={src} alt={alt} fill sizes={sizes} onError={() => setFailed(true)} className="object-cover transition duration-700 hover:scale-105" />}
    </div>
  )
}
