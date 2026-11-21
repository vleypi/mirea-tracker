import type { Metadata } from "next";
import { APP_TEXT } from "@/shared/config";
import { ChecklistPage } from "@/views/checklist";

export const metadata: Metadata = { title: `${APP_TEXT.checklist} · ${APP_TEXT.title}` };

export default function Page() {
  return <ChecklistPage />;
}
