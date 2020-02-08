import { FC, ReactNode } from "react";
import * as React from "react";

export const LoaderSwitch: FC<{
  children?: ReactNode;
  content?: ReactNode;
  onLoad?: ReactNode | (() => ReactNode);
  onError?: ReactNode | ((exceptions: any[]) => ReactNode);
  isLoading?: () => boolean;
  getExceptions?: () => any[];
}> = ({
  /** An alias for content */
  children,
  /** The content to show when there are no exceptions and data loaded */
  content,
  /** The data to show while loading */
  onLoad,
  /** A function retrieving the data to show */
  onError,
  /** Whether the data is currently loading */
  isLoading,
  /** A getter for the exceptions */
  getExceptions
}) => {
  if (getExceptions && onError) {
    const exceptions = getExceptions();
    if (exceptions.length > 0)
      return <>{onError instanceof Function ? onError(exceptions) : onError}</>;
  }

  if (isLoading && isLoading() && onLoad)
    return <>{onLoad instanceof Function ? onLoad() : onLoad}</>;

  return <>{(content || children) as any}</>;
};