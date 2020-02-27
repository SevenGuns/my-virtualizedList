import React, { forwardRef } from 'react';
const TestFuncitonComp = forwardRef((props, ref) => {
  return <div ref={ref}>haha</div>;
});

export default TestFuncitonComp;
