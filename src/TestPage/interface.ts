export interface FormatPart {
  type: "hours" | "minutes" | "seconds";
  separator: string;
}

export interface TimeFormItem {
  digital: string;
  separator: string;
}

export interface TimeFormat {
  hours: TimeFormItem;
  minutes: TimeFormItem;
  seconds: TimeFormItem;
}

export type TimeFormatString = "hh:mm:ss" | "mm:ss" | "hh:mm";

export interface CountdownComponentProps {
  timeParts: TimeFormat;
  className?: string;
  style?: React.CSSProperties;
  styles?: {
    digital?: React.CSSProperties;
    separator?: React.CSSProperties;
  };
  classNames?: {
    digital?: string;
    separator?: string;
  };
}
