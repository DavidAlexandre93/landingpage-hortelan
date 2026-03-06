import React, { useMemo } from "react";
import { useDocumentSeo } from "./useDocumentSeo.js";

const SITE_URL = "https://hortelan.vercel.app/";
const OG_IMAGE_URL = "https://hortelan.vercel.app/Assets/og-image.jpg";

export default function HortelanSeo() {
  const schema = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Hortelan Agtech Ltda.",
      url: SITE_URL,
      logo: "https://hortelan.vercel.app/Assets/logo.png",
      sameAs: ["https://www.linkedin.com/company/hortelan"],
    }),
    []
  );

  useDocumentSeo({
    title: "Hortelan Agtech Ltda. | IoT, automação e gestão 360 para hortas",
    description:
      "A Hortelan integra monitoramento IoT, automações, alertas e comunidade em uma experiência única para operação agrícola eficiente.",
    url: SITE_URL,
    image: OG_IMAGE_URL,
    schema,
  });

  return null;
}
