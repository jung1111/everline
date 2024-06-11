import "./css/main.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./pages/Root";
import Main from "./components/Main";
import ProductPage from "./pages/ProductPage";
import ProductDetail from "./pages/ProductDetail";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import FindAccount from "./components/FindAccount.jsx";
import EmailAuth from "./components/EmailAuth.jsx";
import ResetPassword from "./components/ResetPassword.jsx";
import EventList from "./pages/EventList.jsx";
import WinnerNoticeList from "./pages/WinnerNoticeList.jsx";
import WinnerNoticeDetail from "./pages/WinnerNoticeDetail.jsx";

import Notice from "./pages/Notice.jsx";
import NoticeDetail from "./pages/NoticeDetail.jsx";
import Inquiry from "./pages/Inquiry.jsx";
import InquiryDetail from "./pages/InquiryDetail.jsx";
import InquiryWrite from "./pages/InquiryWrite.jsx";
import InquiryUpdate from "./pages/InquiryUpdate.jsx";
import InquiryDelete from "./pages/InquiryDelete.jsx";
import Faq from "./pages/Faq.jsx";
import CartPage from "./pages/CartPage.jsx";
import { useState } from "react";
import OrderPage from "./pages/OrderPage.jsx";
import Upload from "./pages/Upload.jsx";
import YouTubeSlider from "./components/YouTubeSlider.jsx";
import YouTubeDetail from "./components/YouTubeDetail.jsx";

export default function App() {
  const [cartItems, setCartItems] = useState([]);

  const addCartCount = (item) => {
    const updateItemindex = cartItems.findIndex((e) => e.id === item.id);
    console.log("인덱스", updateItemindex);
    if (updateItemindex !== -1) {
      const updateItems = [...cartItems];
      updateItems[updateItemindex].qty++;
      setCartItems(updateItems);
    } else {
      setCartItems([...cartItems, item]);
    }

    alert("장바구니에 추가됐습니다.");
  };

  const router = createBrowserRouter([
    {
      path: "/" /* / : Root Context(루트 컨텍스트) */,
      element: <Root cartCount={cartItems.length} />,
      //loader: rootLoader,
      children: [
        { path: "/", element: <Main /> /* loader: teamLoader, */ },
        { path:"/", element:<YouTubeSlider /> /* loader: teamLoader, */ },
        { path:"/video/:id", element:<YouTubeDetail /> /* loader: teamLoader, */ },
        
        {
          path: "/product",
          element: <ProductPage /> /* loader: teamLoader, */,
        },
        {
          path: "/product/:id",
          element: (
            <ProductDetail addCartCount={addCartCount} />
          ) /* loader: teamLoader, */,
        },
        { path: "/member", element: <Login /> },
        { path: "/member/FindAccount", element: <FindAccount /> },
        { path: "/member/FindAccount/emailAuth", element: <EmailAuth /> },
        {
          path: "/member/FindAccount/resetPassword",
          element: <ResetPassword />,
        },
        { path: "/member/signup", element: <Signup /> },
        { path: "/eventlist", element: <EventList /> },
        {
          path: "/carts",
          element: (
            <CartPage cartItems={cartItems} setCartItems={setCartItems} />
          ),
        },
        {
          path: "/order",
          element: <OrderPage />,
        },
        { path: "/winner", element: <WinnerNoticeList /> },
        { path: "/winner/:id", element: <WinnerNoticeDetail /> },
        { path: "/notice", element: <Notice /> },
        { path: "/notice/:id", element: <NoticeDetail /> },
        { path: "/inquiry", element: <Inquiry /> },
        { path: "/inquiry/:bid/:rno", element: <InquiryDetail /> },
        { path: "/inquiry/write", element: <InquiryWrite /> },
        { path: "/inquiry/update/:bid/:rno", element: <InquiryUpdate /> },
        { path: "/inquiry/delete/:bid/:rno", element: <InquiryDelete /> },
        { path: "/faq", element: <Faq /> },
        { path: "/upload", element: <Upload /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}
