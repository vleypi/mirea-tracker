export const EDIT_SEARCH_PARAM = "edit";
export const EDIT_SEARCH_VALUE = "1";

export const ROUTES = {
  home: "/",
  checklist: "/checklist",
  templates: "/templates",
  newSubject: "/subjects/new",
  subject: (subjectId: string) => `/subjects/${encodeURIComponent(subjectId)}`,
  subjectEditor: (subjectId: string) => `/subjects/${encodeURIComponent(subjectId)}?${EDIT_SEARCH_PARAM}=${EDIT_SEARCH_VALUE}`,
} as const;
