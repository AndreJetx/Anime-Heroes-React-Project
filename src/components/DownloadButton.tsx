"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

type Settings = { downloadLink: string; downloadVersion: string };

const DEFAULT_LINK = "https://ko-fi.com/s/d64358779e";
const DEFAULT_VERSION = "v0.99.2";

export default function DownloadButton() {
  const [settings, setSettings] = useState<Settings | null>(null);

  useEffect(() => {
    fetch("/api/settings")
      .then((res) => res.ok ? res.json() : null)
      .then((data) => data && setSettings(data))
      .catch(() => {});
  }, []);

  const link = settings?.downloadLink?.trim() || DEFAULT_LINK;
  const version = settings?.downloadVersion?.trim() || DEFAULT_VERSION;

  return (
    <Link className="linkdownload" href={link} target="_blank" rel="noopener noreferrer">
      <button className="support-button">{version}</button>
    </Link>
  );
}
