import React, { useState } from 'react';

const App = () => {
  const [value, setValue] = useState(1);
  return <div>
    <span>{value}</span>
    <button onClick={() => setValue(value + 1)}>add</button>
  </div>
}
export default App;