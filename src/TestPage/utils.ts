import type { FormatPart, TimeFormat, TimeFormatString } from "./interface";

export const formatNumber = (num: number): string =>
  num.toString().padStart(2, "0");

// 解析format字符串的逻辑
export const parseFormat = (format: TimeFormatString): FormatPart[] => {
  const parts = format.split(/(?=hh|mm|ss)/); // 按时间单位分割
  return parts
    .map((part) => {
      if (part.startsWith("hh"))
        return { type: "hours", separator: part.slice(2) } as FormatPart;
      if (part.startsWith("mm"))
        return { type: "minutes", separator: part.slice(2) } as FormatPart;
      if (part.startsWith("ss"))
        return { type: "seconds", separator: part.slice(2) } as FormatPart;
    })
    .filter(Boolean) as FormatPart[];
};

/**
 * 格式化时间显示
 *
 * @returns TimeFormat
 * @param time 总时间（秒）
 * @param formatParts
 */
export const formatTime = (
  time: number,
  formatParts: FormatPart[]
): TimeFormat => {
  const totalSeconds = Math.ceil(time);
  const values = {
    hours: Math.floor(totalSeconds / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  } as const;

  return formatParts.reduce((acc, part) => {
    acc[part.type] = {
      digital: formatNumber(values[part.type]),
      separator: part.separator || "",
    };
    return acc;
  }, {} as TimeFormat);
};
