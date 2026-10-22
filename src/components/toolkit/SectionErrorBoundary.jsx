import { Component } from "react";

export default class SectionErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error) {
    console.error(`Gagal merender bagian toolkit: ${this.props.section}`, error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          Bagian {this.props.section} tidak dapat ditampilkan.
        </div>
      );
    }

    return this.props.children;
  }
}
