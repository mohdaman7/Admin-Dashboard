import React from 'react';
import TaskProgress from './components/TaskProgress';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Task Progress Dashboard
        </h1>
        
        <TaskProgress />
      </div>
    </div>
  );
}

export default App;
