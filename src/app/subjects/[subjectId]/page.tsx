import { EDIT_SEARCH_PARAM, EDIT_SEARCH_VALUE } from "@/shared/config";
import { SubjectPage } from "@/views/subject";

export default async function Page({ params, searchParams }: PageProps<"/subjects/[subjectId]">) {
  const [{ subjectId }, query] = await Promise.all([params, searchParams]);

  return <SubjectPage key={subjectId} subjectId={subjectId} initialEditing={query[EDIT_SEARCH_PARAM] === EDIT_SEARCH_VALUE} />;
}
