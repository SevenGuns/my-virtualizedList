import React, { useCallback } from 'react';
// import VirtualizedList from './components/VirtualizedList';
import TestFuncitonComp from './components/TestFuncitonComp';

function App() {
  const ref = useCallback(comp => {
    console.log(comp);
  }, []);
  return <TestFuncitonComp ref={ref}></TestFuncitonComp>;
}

export default App;
