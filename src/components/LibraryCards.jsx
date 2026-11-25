import React from 'react'

function LibraryCards({ bookInfo }) {
  return (
    <div style={{ border: "1px solid gray", padding: "10px", margin: "5px" }}>
      <p><strong>Code:</strong> {bookInfo.code}</p>
      <p><strong>Name:</strong> {bookInfo.name}</p>
      <p><strong>Price:</strong> {bookInfo.price} Rwf</p>
    </div>
  )
}

export default LibraryCards