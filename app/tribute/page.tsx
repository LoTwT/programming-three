import React from "react"

function Tribute() {
  return (
    <form action="/api/parse" method="post">
      <label>
        <span>URL: </span>
        <input type="text" name="url" className="border-1" />
      </label>
      <button type="submit" className="ml-2 border-1">
        Submit
      </button>
    </form>
  )
}

export default Tribute
