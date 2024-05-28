import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";

export default function ProductDetail({ addCartCount }) {
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3000/data/product.json")
      .then((res) => {
        setProduct(res.data);
        const foundProduct = res.data.find((item) => item.id === id);
        setProduct(foundProduct);
      })
      .catch((error) => console.log(error));
  }, [id]);

  /* 상품금액 토글 */
  const [moreview, setMoreview] = useState(false);
  const Click = () => {
    setMoreview(!moreview);
  };
  /* 상품정보 토글 */
  const [moreview1, setMoreview1] = useState(false);
  const Click1 = () => {
    setMoreview1(!moreview1);
  };

  const section1Ref = useRef(null);
  const section2Ref = useRef(null);
  const section3Ref = useRef(null);

  const scrollToSection = (sectionRef) => {
    // 섹션으로 스크롤 이동
    if (sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const addCartItem = (id) => {
    const selectedProduct = {
      id: id,
      image: product.image,
      name: product.title,
      price: product.price,
      qty: 1,
      checked: true,
    };
    addCartCount(selectedProduct);
  };

  const handleBuy = () => {
    const selectedProduct = {
      id: id,
      image: product.image,
      name: product.title,
      price: product.price,
      qty: 1,
    };
    navigate("/order", { state: { selectedItems: [selectedProduct] } });
  };

  return (
    <div className="container">
      <div className="content">
        <div className="content_breadcrumb"></div>
        <div className="content_area">
          <div className="productDetatil_main">
            <div className="main_img">
              <img className="detail_img" src={product.image} alt="" />
            </div>
            <div className="main_info">
              <div className="main_top">
                <h2>{product.title}</h2>
                <h3>{product.price?.toLocaleString()}원</h3>
              </div>
              <div className="product_info_box" onClick={Click}>
                상품금액 &nbsp;
                <span>{moreview ? <div className="toggle_btn2"></div> : <div className="toggle_btn1"></div>}</span>
              </div>
              {moreview && (
                <div className="product_info_content_box">
                  <div className="product_info_content">
                    <dl>
                      <dt>판매가</dt>
                      <dd>
                        <strong className="product_info_content_strong">{product.price?.toLocaleString()}원</strong>
                      </dd>
                    </dl>
                  </div>
                  <div className="product_info_content">
                    <dl>
                      <dt>구매제한</dt>
                      <dd>
                        <strong className="product_info_content_strong">옵션당최소1개</strong>
                      </dd>
                    </dl>
                  </div>
                  <div className="product_info_content">
                    <dl>
                      <dt>구매혜택</dt>
                      <dd>
                        <strong className="product_info_content_strong">마일리지</strong>
                      </dd>
                    </dl>
                  </div>
                  <div className="product_info_content">
                    <dl>
                      <dt>배송비</dt>
                      <dd>
                        <strong className="product_info_content_strong">3,500원</strong>
                      </dd>
                      <div></div>
                    </dl>
                  </div>
                </div>
              )}
              <div className="line"></div>
              <div className="product_info_box" onClick={Click1}>
                상품정보 &nbsp;
                <span>{moreview1 ? <div className="toggle_btn2"></div> : <div className="toggle_btn1"></div>}</span>
              </div>
              {moreview1 && (
                <div className="product_info_content_box">
                  <div className="product_info_content">
                    <dl>
                      <dt>상품코드</dt>
                      <dd>
                        <span className="product_info_content_span">1234567</span>
                      </dd>
                    </dl>
                  </div>
                  <div className="product_info_content">
                    <dl>
                      <dt>브랜드</dt>
                      <dd>
                        <span className="product_info_content_span">SM,YG,JYP</span>
                      </dd>
                    </dl>
                  </div>
                </div>
              )}
              <div className="line"></div>
              <div>
                <h4>총 상품금액</h4>
                <div className="total_price">
                  <h2>총 합계금액</h2>
                  <h2>{product.price?.toLocaleString()}원</h2>
                </div>
              </div>
              <div className="line"></div>
              <div className="product_btn_box">
                <Link to="/">
                  <button className="product_btn1" type="button">
                    찜리스트
                  </button>
                </Link>
                <Link to="/product">
                  <button className="product_btn2" type="button" onClick={() => addCartItem(product.id)}>
                    장바구니
                  </button>
                </Link>
                <button className="product_btn3" type="button" onClick={handleBuy}>
                  바로구매
                </button>
              </div>
            </div>
          </div>
          <div className="productDetatil_sub">
            <ul className="productDetatil_content">
              <li className="productDetatil_info" onClick={() => scrollToSection(section1Ref)} ref={section1Ref}>
                상품상세정보
              </li>
              <li className="productDetatil_notice" onClick={() => scrollToSection(section2Ref)}>
                안내사항
              </li>
              <li className="productDetatil_customer" onClick={() => scrollToSection(section3Ref)}>
                1:1문의
              </li>
            </ul>
          </div>
          <div className="productDetatil_info_box">
            <div>
              ※공동 구매, 대량 구매 문의 - KAKAOTALK / LINE / WeChat : EVERLINESHOP ※BULK PURCHASE - KAKAOTALK / LINE /
              WeChat : EVERLINESHOP ※ 앨범은 이벤트 종료 후 발송됩니다. (출고되기까지 3주 이상 소요될 수 있는 점 양해
              부탁 드리겠습니다.) ※ 앨범 버전 선택 불가 / 랜덤발송 / 포스터 증정되지 않습니다. ※ 이벤트 응모 기간 내
              구입한 앨범은 자동 응모 처리되어 취소 및 환불이 불가합니다. (주말 및 공휴일에는 문의 응대 불가합니다.)
            </div>
            <img className="productDetatil_info_img" src={product.detailimage} alt="" />
          </div>
          <div className="productDetatil_notice_box" ref={section2Ref}>
            <div>
              배송안내 - 기본배송료는 3,500원 입니다. (도서, 산간, 오지 일부지역은 배송비가 추가될 수 있습니다.) - 일반
              상품의 평균 배송일은 3~7일입니다. - 예약 판매시 해당 상품 공지 내용을 기준으로 배송 및 수령 관련 내용은
              변경될 수 있습니다. (해당 상품의 공지 내용을 참고하여 주시기 바랍니다.) - 상품의 재고상황이나 배송상황,
              지역에 따라 배송 지연될 수 있습니다. 교환 및 반품안내 - 상품의 색상은 모니터 사양에 따라 실제 색상과는
              다소 차이가 있을 수 있으며, 제작 이미지는 변경될 수 있습니다. - 상품 택(tag)제거 또는 개봉으로 상품 가치
              훼손 시에는 상품 수령 후 7일 이내라도 교환 및 반품이 불가능합니다. - 고객 변심에 의한 교환, 반품은
              고객께서 배송비를 부담하셔야 합니다. (제품의 하자, 배송 오류는 제외) - 일부 상품은 제조사 사정으로 가격이
              변동될 수 있습니다. - 사용흔적이 있는 경우에는 교환/반품 기간 내라도 교환 및 반품이 불가능합니다. - 제품
              및 본 상품의 박스 훼손, 분실 등으로 인한 상품 가치 훼손 시 교환 및 반품이 불가능하오니, 양해바랍니다. -
              상품인수 후에는 제품 하자나 오배송의 경우를 제외한 제품에 따라 고객님의 단순 변심에 의한 교환/ 반품이
              불가능할 수 있습니다. - 구매자의 변심으로 반품을 원할 경우 구매자가 왕복배송비를 지불해주셔야 합니다. -
              배송 오류, 파손, 불량 등 상품 결함이 있을 경우 판매자가 배송비를 지불합니다. - 교환 및 반품 문의는 되도록
              1:1 게시판 문의를 이용해 주시기 바랍니다. 고객센터 CS안내 전화 문의 : 02-2661-0996(상품/이벤트 안내),
              070-4190-4189/0101(배송/교환/환불 안내) / 1:1문의게시판 / everlineshop@naver.com 이메일 접수 등의 방법으로
              궁금한 점 또는 불편사항을 문의하실 수 있습니다. 불만, 피해보상 요청, 상품 수리 요청 등의 접수 시에는 영업
              상담일 기준 5일 이내 처리할 예정입니다. 상담 가능시간은 평일 오전 10시 ~ 오후 5시 입니다 (점심시간 오후
              12시 ~ 오후 2시 제외) * 구매자가 미성년자인 경우, 해당 주문에 대한 법정대리인의 동의를 얻지 못하면
              미성년자 본인 또는 법정대리인은 주문을 취소할 수 있습니다. 고객센터 CS안내 전화 문의 :
              02-2661-0996(상품/이벤트 안내), 070-4190-4189/0101(배송/교환/환불 안내) / 1:1문의게시판 /
              everlineshop@naver.com이메일 접수 등의 방법으로 궁금한 점 또는 불편사항을 문의하실 수 있습니다. 불만,
              피해보상 요청, 상품 수리 요청 등의 접수 시에는 영업 상담일 기준 5일 이내 처리할 예정입니다. 상담
              가능시간은 평일 오전 10시 ~ 오후 5시 입니다 (점심시간 오후 12시 ~ 오후 2시 제외) * 구매자가 미성년자인
              경우, 해당 주문에 대한 법정대리인의 동의를 얻지 못하면 미성년자 본인 또는 법정대리인은 주문을 취소할 수
              있습니다. 환불안내 ・교환 및 반품이 불가능한 경우에 관해 안내해 드립니다. - 상품 수령 후 7일을 초과한 경우
              - 상품의 가치가 감소한 경우 (포장지 훼손, 세탁, 얼룩, 냄새, 증정품 또는 구성품 훼손, 사용 흔적 등) -
              구매자의 사용 또는 일부 소비 / 시간의 경과에 의하여 상품의 가치가 감소한 경우 - 주문제작 상품, 세일 상품,
              음반 등 교환/환불 불가를 공지한 상품의 경우 - 제품의 오배송, 불량 상품이라도 사용 흔적, 훼손 등의 흔적이
              있을 경우 - 촬영 또는 해상도 등의 영향으로 고객님의 모니터에서 확인되는 색상과 실제 수령한 상품의 색상
              차이가 있으며, 상품상세페이지 이미지와 주문제작 상품은 다를 수 있습니다. - 교환 또는 반품 진행시 보내드린
              증정품이 있다면 함께 보내주셔야 하며, 누락시 교환 또는 환불이 불가합니다. - 모든 상품 특성상 재고가 조기
              소진될 수 있어 단순변심에 의한 교환은 어려울 수 있습니다. - 고객주문 확인 후 상품제작에 들어가는 주문제작
              상품은 반품이 불가합니다. - 환불 진행시, 반품 물품을 저희가 수령한 날로부터 5영업일 이내 환급 될
              예정입니다. 물품 배송 전 취소 건이라면 취소 요청일로부터 5영업일 이내 환급 될 예정입니다. AS안내 -
              소비자분쟁해결 기준(공정거래위원회 고시)에 따라 피해를 보상받을 수 있습니다. - A/S는 판매자에게 문의하시기
              바랍니다.
            </div>
          </div>
          <div className="productDetatil_customer_box" ref={section3Ref}>
            <div>문의사항 있으신가요? 1:1 문의를 통해 질문을 남겨주시면 친절히 답변 드리겠습니다.</div>
            <button type="button">1:1문의 남기기</button>
          </div>
        </div>
      </div>
    </div>
  );
}
