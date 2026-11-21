import type { Metadata } from "next";
import { APP_TEXT } from "@/shared/config";
import { TemplatesPage } from "@/views/templates";

export const metadata: Metadata = { title: `${APP_TEXT.templates} · ${APP_TEXT.title}` };

export default function Page() {
  return <TemplatesPage />;
}
