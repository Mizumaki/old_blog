import React from 'react';

const Statham = (props) => {
  const word = props.path.params.statham
  console.log(word);
  return (
    <div>
      <h2>{word}</h2>
      <p>ステイサムでもっとも好きな映画は「アドレナリン」</p>
    </div>
  );
}

export default Statham;