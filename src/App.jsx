import { useEffect } from "react";
import { BrowserRouter, Routes, Route, Outlet, useLocation } from "react-router-dom";
import Header from "./components/Header";
import BottomNav from "./components/BottomNav";
import Login from "./pages/Login";
import Home from "./pages/Home";
import eruda from "eruda";  // Eruda import

const Layout = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  return (
    <>
      {!isLoginPage && <Header />}
      <Outlet />
      {!isLoginPage && <BottomNav />}
    </>
  );
};

function App() {
  useEffect(() => {
    // Eruda 초기화 (모바일에서 디버깅 도구를 사용할 수 있게 함)
    eruda.init();  // Eruda 초기화

    const setViewportHeight = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };
    
    setViewportHeight();
    window.addEventListener("resize", setViewportHeight);

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => window.removeEventListener("resize", setViewportHeight);
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
