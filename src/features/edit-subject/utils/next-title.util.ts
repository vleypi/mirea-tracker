import type { IResolvedBlock } from "@/entities/subject";
import { BLOCK_TITLE_PREFIX, DEFAULT_ITEM_LABEL } from "@/features/edit-subject/constants/edit-subject.constant";

const LAST_NUMBER_PATTERN = /(\d+)\D*$/;
const TRAILING_NUMBER_PATTERN = /\s*[\d-]+$/;
const BLOCK_TITLE_PATTERN = new RegExp(`^${BLOCK_TITLE_PREFIX}\\s*\\d+$`);

const getLastNumber = (title: string): number => Number(title.match(LAST_NUMBER_PATTERN)?.[1] ?? 0);

const getNextNumber = (titles: string[]): number => Math.max(0, ...titles.map(getLastNumber)) + 1;

export const getNextBlockTitle = (blocks: IResolvedBlock[]): string =>
  `${BLOCK_TITLE_PREFIX}${getNextNumber(blocks.map(({ title }) => title).filter((title) => BLOCK_TITLE_PATTERN.test(title)))}`;

export const getNextItemTitle = (blocks: IResolvedBlock[], blockId: string): string => {
  const items = blocks.slice(0, blocks.findIndex(({ id }) => id === blockId) + 1).flatMap((block) => block.items);
  const label = items.at(-1)?.title.replace(TRAILING_NUMBER_PATTERN, "") || DEFAULT_ITEM_LABEL;
  return `${label} ${getNextNumber(items.map(({ title }) => title))}`;
};
