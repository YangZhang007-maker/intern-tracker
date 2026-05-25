import type { City, JobType } from "./types";

export const CITY_LABELS: Record<City, string> = {
  beijing: "北京",
  shanghai: "上海",
  guangzhou: "广州",
  shenzhen: "深圳",
  hangzhou: "杭州",
  chengdu: "成都",
  nanjing: "南京",
  wuhan: "武汉",
  xian: "西安",
  other: "其他",
};

export const CITIES: { value: City; label: string }[] = Object.entries(CITY_LABELS).map(
  ([value, label]) => ({ value: value as City, label })
);

export const JOB_TYPE_LABELS: Record<JobType, string> = {
  intern_cs: "计算机实习",
  intern_finance: "金融实习",
  fulltime_cs: "计算机校招",
  fulltime_finance: "金融校招",
};

export const JOB_TYPES: { value: JobType; label: string }[] = Object.entries(JOB_TYPE_LABELS).map(
  ([value, label]) => ({ value: value as JobType, label })
);

export const CITY_KEYWORDS: Record<City, string[]> = {
  beijing: ["北京", "beijing"],
  shanghai: ["上海", "shanghai"],
  guangzhou: ["广州", "guangzhou"],
  shenzhen: ["深圳", "shenzhen"],
  hangzhou: ["杭州", "hangzhou"],
  chengdu: ["成都", "chengdu"],
  nanjing: ["南京", "nanjing"],
  wuhan: ["武汉", "wuhan"],
  xian: ["西安", "xian"],
  other: [],
};

export const PAGE_SIZE = 10;
