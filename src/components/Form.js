import React from "react";

export default function Form() {
  const budget = ["none", "decent", "substantial"];

  return (
    <>
      <form>
        <label>
          Your budget:
          <select>
            <option>Any</option>
            {budget.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>
        <button>Search</button>
      </form>
    </>
  );
}
