import React, { useState } from 'react';
import { Link } from 'react-router-dom'
const Index = () => {
  const [value, setValue] = useState(1);
  return <div>
    <Link to="/goods">goods</Link>
    <span>{value}</span>
    <button onClick={() => setValue(value + 1)}>add</button>
  </div>
}
export default Index;