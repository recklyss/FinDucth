import React from 'react';

export default function MinimalApp() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Minimal Test App</h1>
      <p className="mt-2">This is a minimal test application to debug rendering issues.</p>

      <div className="mt-4 p-4 bg-secondary rounded-md">
        <h2 className="text-xl font-bold">Test Card</h2>
        <p className="mt-2">If you can see this, the basic rendering is working.</p>

        <button
          className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-md"
          onClick={() => alert('Button clicked!')}
        >
          Test Button
        </button>
      </div>
    </div>
  );
} 