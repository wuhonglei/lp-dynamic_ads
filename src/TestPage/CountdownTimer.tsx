import React, { useMemo } from "react";
import { formatTime, parseFormat } from "./utils";
import { useLeftTime } from "./hooks";
import CountdownTimerAnimation from "./components/CountdownTimerAnimation";
import CountdownTimerNoAnimation from "./components/CountdownTimerNoAnimation";
import type { CountdownComponentProps, TimeFormatString } from "./interface";

export interface CountdownTimerProps
  extends Omit<CountdownComponentProps, "timeParts"> {
  animation?: boolean;

  /** 倒计时的总时长（秒） */
  duration: number;

  /** 时间显示格式，支持 "hh:mm:ss"、"mm:ss"、"hh:mm" 等 */
  format?: TimeFormatString;

  /** 倒计时结束时的回调函数 */
  onComplete?: () => void;

  /** 倒计时进行中的回调函数，每秒调用一次，参数为剩余秒数 */
  onTick?: (remainingTime: number) => void;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({
  animation = true,
  format = "hh:mm:ss",
  duration,
  onComplete,
  onTick,
  ...restProps
}) => {
  const remainingTime = useLeftTime(duration, onComplete, onTick);
  const formatParts = useMemo(() => parseFormat(format), [format]);
  const timeParts = useMemo(
    () => formatTime(remainingTime, formatParts),
    [remainingTime, formatParts]
  );
  console.info("remainingTime", remainingTime);
  console.info("timeParts", timeParts);
  console.info("timeParts", timeParts);
  return animation ? (
    <CountdownTimerAnimation {...restProps} timeParts={timeParts} />
  ) : (
    <CountdownTimerNoAnimation {...restProps} timeParts={timeParts} />
  );
};

export default CountdownTimer;
