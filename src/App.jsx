import { useEffect } from "react";
import { HashRouter, Routes, Route, Outlet, useLocation } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Header from "./components/Header";
import BottomNav from "./components/BottomNav";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import MyPage from "./pages/MyPage";
import eruda from "eruda";  // Eruda import

const Layout = () => {
  const location = useLocation();
  const path = location.pathname;

// 조건: 헤더는 login, signup, home, mypage 모두에서 보이게
const showHeader = ["/", "/login", "/signup", "/home", "/mypage"].includes(path);

// 조건: 바텀네비는 home, mypage에서 보이게
const showBottomNav = ["/home", "/mypage"].includes(path);


  return (
    <>
      {showHeader && <Header />}
      <Outlet />
      {showBottomNav && <BottomNav />}
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
    <HashRouter>
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/mypage" element={<MyPage />} />
      </Route>
    </Routes>
  </HashRouter>
  );
}

export default App;
