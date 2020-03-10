import React, { useCallback, useState } from 'react';
// import VirtualizedList from './components/VirtualizedList';
// import TestFuncitonComp from './components/TestFuncitonComp';

function App() {
  const [value, setValue] = useState('');
  const onInput = useCallback(e => {
    const value = e.target.value;
    console.log(value);
    setValue(value);
  }, []);
  return <input type="text" value={value} onChange={onInput} />;
}

export default App;
