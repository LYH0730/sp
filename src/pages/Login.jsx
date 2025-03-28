import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [autoLogin, setAutoLogin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const cookieEmail = getCookie("email");
    if (cookieEmail) {
      sessionStorage.setItem("email", cookieEmail);
      navigate("/home");
    }
  }, []);

  const getCookie = (name) => {
    const cookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith(name + "="));
    return cookie ? cookie.split("=")[1] : null;
  };

  const handleLogin = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const matchedUser = users.find(u => u.email === email && u.password === pw);

    if (matchedUser) {
      sessionStorage.setItem("email", email);
      if (autoLogin) {
        document.cookie = `email=${email}; max-age=604800; path=/`; // 7일 유지
      }
      navigate("/home");
    } else {
      alert("이메일 또는 비밀번호가 틀렸습니다.");
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <label htmlFor="email">이메일</label>
        <input
          id="email"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="pw">비밀번호</label>
        <input
          id="pw"
          type="password"
          value={pw}
          onChange={(e) => setPw(e.target.value)}
        />

        <label style={{ marginBottom: "10px" }}>
          <input
            type="checkbox"
            checked={autoLogin}
            onChange={() => setAutoLogin(!autoLogin)}
          />
          자동 로그인
        </label>

        <button type="submit">로그인</button>
        <div className="signup-link">
          <Link to="/signup">회원가입</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
