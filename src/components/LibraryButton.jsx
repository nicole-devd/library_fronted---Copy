import React, { useState } from 'react'

function LibraryButton({buttonLabel,onClickButton}) {

// const [count, setCount] = useState(0);

//let count = 0;

// function incrementing(){
// setCount(count+1);
// console.log("This is the increment value "+count);
// }

return (
<div> <button onClick={onClickButton}>{buttonLabel}</button></div>
)
}

export default LibraryButton