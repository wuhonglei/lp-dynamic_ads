import { Fragment } from "react";
import type { CountdownComponentProps } from "../interface";
import classNames from "classnames";

export default function CountdownTimerNoAnimation({
  timeParts,
  className,
  classNames: outerClassNames,
  styles: outerStyles,
  style,
}: CountdownComponentProps) {
  const { digital: digitalClassName, separator: separatorClassName } =
    outerClassNames || {};
  const { digital: digitalStyle, separator: separatorStyle } =
    outerStyles || {};
  return (
    <div
      className={classNames("flex items-center text-primary", className)}
      style={style}
    >
      {Object.values(timeParts).map(({ digital, separator }, index: number) => (
        <Fragment key={index}>
          <span
            style={digitalStyle}
            className={classNames(digitalClassName, "p-1")}
          >
            {digital}
          </span>
          <span
            style={separatorStyle}
            className={classNames(separatorClassName, "mx-1")}
          >
            {separator}
          </span>
        </Fragment>
      ))}
    </div>
  );
}
