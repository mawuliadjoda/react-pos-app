import { useMemo } from "react";

type SectionTitleProps = {
  children: any, 
  className?: string 
}
function SectionTitle({ children, className }: SectionTitleProps) {
  const classes = useMemo(() => {
    const defaultClassName = "primary-self-text text-lg font-title";

    if (className) {
      return defaultClassName + " " + className;
    }

    return defaultClassName;
  }, [className]);

  return <div className={classes}>{children}</div>;
}

export default SectionTitle;
