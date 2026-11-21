export const PASS_POINTS = 40;
export const PASS_SHARE = 0.75;
export const GRADES = [4, 5] as const;
export const DEFAULT_GRADE = 5;
export const GRADE_POINTS = { 4: 60, 5: 80 } as const;
export const SCORE_HEADROOM = 1.25;
export const SAFE_BUFFER = 5;

export const PLAN_MODE_KEYS = ["early", "cheap", "nolectures", "safe"] as const;
export const DEFAULT_PLAN_MODE = "early";

export const PLAN_MODES = {
  early: {
    label: "Быстрее закончить",
    hint: "Закрываем контрольные с ближайшими сроками, остальные пропускаем. Недостающие баллы добираем лекциями.",
  },
  cheap: {
    label: "Меньше усилий",
    hint: "Берем контрольные, где меньше всего добирать (с учетом штрафов за просрочку), сроки не важны.",
  },
  nolectures: {
    label: "Без лекций",
    hint: "На лекции больше не ходим, все недостающие баллы набираем на контрольных.",
  },
  safe: {
    label: "С запасом",
    hint: `Цель выше на ${SAFE_BUFFER} баллов, на случай если где-то недоберете.`,
  },
} as const;
