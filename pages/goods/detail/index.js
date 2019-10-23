import React from 'react';

const Detail = ({ match: { params: { id } } }) => {
  return <div>
    Detail
    {id}
  </div>
}
export default Detail;