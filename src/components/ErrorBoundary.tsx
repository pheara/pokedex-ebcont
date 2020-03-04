import React from "react";

export interface ErrorBoundaryProps {
  fallback: NonNullable<React.ReactNode> | null;
}

/**
 * Error boundary, that shows the jsx/tsx passed via the `fallback`-prop if an error occurs.
 * Adapted from:
 * - <https://reactjs.org/docs/error-boundaries.html>
 * - <https://reactjs.org/docs/concurrent-mode-suspense.html#handling-errors>
 * - <https://github.com/piotrwitek/react-redux-typescript-guide/blob/master/playground/src/hoc/with-error-boundary.tsx>
 * - `Suspense`s fallback mechanism
 *
 */
export class ErrorBoundary extends React.Component<ErrorBoundaryProps> {
  state: { hasError: boolean; error: undefined | Error };

  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: undefined };
  }
  /**
   * <https://reactjs.org/docs/react-component.html#static-getderivedstatefromerror>
   * @param error
   */
  static getDerivedStateFromError(
    error: Error
  ): { hasError: boolean; error: Error } {
    console.error(error);
    return {
      hasError: true,
      error,
    };
  }
  render(): React.ReactNode {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}
