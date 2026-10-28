"use client";
import { useEffect } from "react";
import { track } from "../../lib/integrations";
export default function TrackView({ event }: { event: string }) {
  useEffect(() => {
    track(event);
  }, [event]);
  return null;
}
