import { useState } from "react";

export default function Toggle({ title, content }) {
  // 토글을 닫아두기 위해 초기값을 false로 설정해두었다.
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
