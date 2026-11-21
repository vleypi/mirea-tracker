import type { Metadata } from "next";
import { APP_TEXT } from "@/shared/config";
import { NewSubjectPage } from "@/views/new-subject";

export const metadata: Metadata = { title: `${APP_TEXT.newSubject} · ${APP_TEXT.title}` };

export default function Page() {
  return <NewSubjectPage />;
}
