import React from 'react';
import SleepingBeautyComponent from './SleepingBeautySvelte.svelte';

class SleepingBeautyWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.containerRef = React.createRef();
    this.component = null;
    this.cleanupTimeout = null;
    this.state = {
      error: null,
      isInitialized: false,
      isUnmounting: false
    };
  }

  componentDidMount() {
    console.log('[SleepingBeautyWrapper] Initial mount');
    // Use a short timeout to ensure React has finished its work
    setTimeout(() => {
      this.initializeSvelteComponent();
    }, 0);
  }

  componentWillUnmount() {
    console.log('[SleepingBeautyWrapper] Unmounting');
    this.cleanupSvelteComponent();
  }

  cleanupSvelteComponent() {
    // Clear any existing cleanup timeout
    if (this.cleanupTimeout) {
      clearTimeout(this.cleanupTimeout);
      this.cleanupTimeout = null;
    }

    if (this.component) {
      const componentToDestroy = this.component;
      this.component = null; // Clear reference immediately

      try {
        componentToDestroy.$destroy();
      } catch (error) {
        console.error('Error during component cleanup:', error);
      }
    }
  }

  initializeSvelteComponent() {
    // Don't initialize if we're unmounting
    if (this.state.isUnmounting) {
      console.log('[Wrapper] Skipping initialization - component is unmounting');
      return;
    }

    if (!this.containerRef.current) {
      console.error('[Wrapper] No container ref available');
      this.setState({ 
        error: new Error('Container ref is not available') 
      });
      return;
    }

    // If we already have a component, don't reinitialize
    if (this.component) {
      console.log('[Wrapper] Component already exists, skipping initialization');
      return;
    }

    try {
      console.log('[Wrapper] Starting component initialization');
      
      // Clean up any existing component
      this.cleanupSvelteComponent();

      // Create new component
      this.component = new SleepingBeautyComponent({
        target: this.containerRef.current,
        props: {
          debug: true // Pass debug flag to enable additional logging
        },
        intro: true
      });

      console.log('[Wrapper] Svelte component initialized successfully');
      
      if (!this.state.isUnmounting) {
        this.setState({ isInitialized: true, error: null });
      }
    } catch (error) {
      console.error('[Wrapper] Failed to initialize Svelte component:', error);
      if (!this.state.isUnmounting) {
        this.setState({ error });
      }
    }
  }

  render() {
    const { error, isInitialized } = this.state;

    // Show loading state
    if (!isInitialized && !error) {
      return (
        <div 
          className="w-full h-screen bg-black"
          ref={this.containerRef}
        />
      );
    }

    // Show error state
    if (error) {
      return (
        <div 
          className="w-full h-screen bg-black flex items-center justify-center"
          ref={this.containerRef}
        >
          <div className="text-white text-center">
            <h2 className="text-2xl mb-4">Error Loading Component</h2>
            <p className="text-red-400">{error.message}</p>
          </div>
        </div>
      );
    }

    // Main component render
    return (
      <div 
        ref={this.containerRef} 
        className="w-full h-screen min-h-screen bg-black relative overflow-hidden"
      />
    );
  }
}

export default SleepingBeautyWrapper;