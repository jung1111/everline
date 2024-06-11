import Location from "../components/Location";
import SubTitle from "../components/SubTitle";
import { useState } from "react";
import axios from "axios";

export default function Upload() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [period, setPeriod] = useState("");
  const [info, setInfo] = useState(null);
  const [uploadImage, setUploadImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("price", price);
    formData.append("period", period);
    formData.append("info", info);
    formData.append("uploadImage", uploadImage);

    try {
      const response = await axios.post(
        "http://localhost:8000/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.data.success) {
        alert("상품이 성공적으로 업로드되었습니다.");
      } else {
        alert("업로드 실패: " + response.data.message);
      }
    } catch (error) {
      console.error("업로드 중 오류 발생:", error);
      alert("업로드 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="content">
      <Location depth1="업로드" />
      <SubTitle title="업로드" />
      <div>
        <form onSubmit={handleSubmit}>
          <ul>
            <li>
              <label>상품명</label>
              <input
                type="text"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </li>
            <li>
              <label>상품가격</label>
              <input
                type="text"
                name="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </li>
            <li>
              <label>상품발매일</label>
              <input
                type="date"
                name="period"
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
                required
              />
            </li>
            <li>
              <label>상품정보이미지</label>
              <input
                type="file"
                name="info"
                onChange={(e) => setInfo(e.target.files[0])}
                required
              />
            </li>
            <li>
              <label>상품이미지</label>
              <input
                type="file"
                name="uploadImage"
                onChange={(e) => setUploadImage(e.target.files[0])}
                required
              />
            </li>
            <li>
              <button type="submit">등록완료</button>
            </li>
          </ul>
        </form>
      </div>
    </div>
  );
}
