import { useState } from "react";

export default function Toggle({ title, content }) {
  const [isCheck, setCheck] = useState(false);

  return (
    <>
      <div className="toggle">
        <h1>{title}</h1>
        <button onClick={() => { setCheck((e) => !e) }}>
          {isCheck ? "∧" : "∨"}
        </button>
      </div>
      {isCheck && (<button type="button">{content}</button>)}
    </>
  );
}
