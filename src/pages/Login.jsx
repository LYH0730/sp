import { useState } from "react";
import { useNavigate } from "react-router-dom";  // 추가
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const navigate = useNavigate(); // 추가

  const handleLogin = (e) => {
    e.preventDefault();

    if (email === "1234" && pw === "5678") {
      // 임시 로그인 성공
      sessionStorage.setItem("email", email); // 로그인 상태 저장 (옵션)
      navigate("/home");
    } else {
      alert("아이디 또는 비밀번호가 틀렸습니다.");
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <label htmlFor="email">아이디</label>
        <input id="email" type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
        <label htmlFor="pw">비밀번호</label>
        <input id="pw" type="password" value={pw} onChange={(e) => setPw(e.target.value)} />
        <button type="submit">로그인</button>
        <div className="signup-link">
          <a href="/signup">회원가입</a>
        </div>
      </form>
    </div>
  );
};

export default Login;
