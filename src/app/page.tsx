import type { Metadata } from "next";
import { APP_TEXT } from "@/shared/config";
import { HomePage } from "@/views/home";

export const metadata: Metadata = { title: APP_TEXT.title };

export default function Page() {
  return <HomePage />;
}
