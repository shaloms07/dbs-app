import React from 'react';
import ErrorState from './ui/ErrorState';
import { analyticsEvents } from '@utils/analytics';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    analyticsEvents.errorBoundaryTriggered(error);
  }

  handleRefresh = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="w-full h-screen flex items-center justify-center bg-neutral-50">
          <ErrorState
            message={this.state.error?.message || 'Something went wrong. Please refresh the page.'}
            onRetry={this.handleRefresh}
            icon="💥"
          />
        </div>
      );
    }

    return this.props.children;
  }
}
