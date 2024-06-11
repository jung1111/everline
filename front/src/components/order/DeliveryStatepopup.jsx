import "../../css/popup.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
export default function DeliveryStatePopup({ setIsOpen }) {
  const cancelPopup = () => {
    setIsOpen(false);
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <div className="popup-title">
          <h4>나의 배송지 관리</h4>
          <span className="popup-close-wrapper" onClick={cancelPopup}>
            <FontAwesomeIcon icon={faXmark} className="popup-close-btn" />
          </span>
        </div>

        <div className="delivery-popup-table">
          <h4 className="delivery-popup-table-title">배송지 목록</h4>
          <table className="delivery-popup-table-area">
            <thead>
              <tr>
                <th>선택</th>
                <th>배송지이름</th>
                <th>받으실분</th>
                <th>주소</th>
                <th>연락처</th>
                <th>수정/삭제</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
          <button>새 배송지 추가</button>
        </div>
      </div>
    </div>
  );
}
