import React, { useMemo } from "react";

/**
 * 计算距离目标日期的时间差（秒）
 * @param targetDate (秒)
 * @param maxDuration (秒)
 * @returns 距离目标日期的时间差（秒），如果时间差大于 maxDuration，则返回 maxDuration
 */
export function useDuration(targetDate: number, maxDuration?: number): number {
  return useMemo(() => {
    const now = Math.floor(Date.now() / 1000);
    const duration = targetDate - now;
    return Math.max(Math.min(duration, maxDuration || Infinity), 0);
  }, [targetDate, maxDuration]);
}

/**
 * 计算剩余时间
 * @param duration 剩余时间（秒）
 * @param onComplete 倒计时结束时的回调函数
 * @param onTick 倒计时进行中的回调函数，每秒调用一次，参数为剩余秒数
 * @returns 剩余时间（秒）
 */
export function useLeftTime(
  duration: number,
  onComplete?: () => void,
  onTick?: (remainingTime: number) => void
) {
  const [remainingTime, setRemainingTime] = React.useState(duration);
  const endTimeRef = React.useRef<number | null>(null);

  // 监听 duration 变化，更新 remainingTime 并重置倒计时状态
  React.useEffect(() => {
    setRemainingTime(duration);
    endTimeRef.current = null;
  }, [duration]);

  React.useEffect(() => {
    if (remainingTime <= 0) {
      endTimeRef.current = null;
      return;
    }

    // 只有在开始倒计时那一刻才计算结束时间
    if (endTimeRef.current === null) {
      endTimeRef.current = performance.now() + remainingTime * 1000;
    }

    const updateTimer = () => {
      if (endTimeRef.current === null) return;

      const now = performance.now();
      const remainingMs = Math.max(endTimeRef.current - now, 0);
      const remainingSeconds = Math.ceil(remainingMs / 1000);

      setRemainingTime(prev => {
        if (remainingSeconds !== prev) {
          if (remainingSeconds === 0) {
            endTimeRef.current = null;
            onComplete?.();
            return 0;
          }
          onTick?.(remainingSeconds);
        }
        return remainingSeconds;
      });

      if (remainingSeconds > 0) {
        requestAnimationFrame(updateTimer);
      }
    };

    const animationFrame = requestAnimationFrame(updateTimer);

    return () => cancelAnimationFrame(animationFrame);
  }, [remainingTime, onComplete, onTick]);

  return remainingTime;
}
