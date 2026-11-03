import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Hotel Diamond application error:', error, errorInfo);
  }

  private handleReload = () => {
    window.location.reload();
  };

  private handleResetCache = () => {
    try {
      localStorage.removeItem('hotel_diamond_live_data');
      sessionStorage.clear();
    } catch {
      // ignore
    }
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#070e19] text-white flex flex-col items-center justify-center p-6 text-center select-none font-sans">
          <div className="max-w-md w-full p-8 rounded-2xl bg-[#0c1a2f] border border-[#1b3a66] shadow-[0_16px_48px_rgba(3,10,24,0.8)]">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#d61f26]/10 border border-[#d61f26]/30 flex items-center justify-center">
              <span className="text-2xl text-[#d61f26]">♦</span>
            </div>

            <h1 className="text-2xl font-serif font-bold text-white tracking-tight mb-2">
              Hotel Diamond
            </h1>
            <p className="text-xs uppercase tracking-widest text-[#c5a880] mb-4">
              Sandhikharka, Arghakhanchi, Nepal
            </p>

            <p className="text-sm text-neutral-300 font-light mb-6 leading-relaxed">
              The website encountered an unexpected display situation. Please refresh to restore the view.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={this.handleReload}
                className="px-5 py-2.5 bg-[#c5a880] hover:bg-[#d8b880] text-black text-xs font-bold rounded-lg shadow transition-all active:scale-95"
              >
                Refresh Website
              </button>
              <button
                onClick={this.handleResetCache}
                className="px-4 py-2.5 bg-white/10 hover:bg-white/15 text-neutral-300 text-xs font-medium rounded-lg transition-all"
              >
                Reset Saved State
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
