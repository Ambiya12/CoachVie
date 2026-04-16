import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error('[ErrorBoundary]', error, info.componentStack);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '2rem', textAlign: 'center' }}>
          <h2>Une erreur est survenue</h2>
          <p style={{ color: '#666', marginBottom: '1rem' }}>
            {this.state.error?.message ?? 'Erreur inattendue.'}
          </p>
          <button
            type="button"
            onClick={this.handleReset}
            style={{ padding: '0.5rem 1.5rem', cursor: 'pointer' }}
          >
            Reessayer
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
