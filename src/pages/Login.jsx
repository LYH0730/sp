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

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password: pw })
      });

      const data = await response.json();

      if (response.ok) {
        sessionStorage.setItem("email", email);
        if (autoLogin) {
          document.cookie = `email=${email}; max-age=604800; path=/`;
        }
        alert("로그인 성공!");
        navigate("/home");
      } else {
        alert(data.message || "로그인 실패");
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("로그인 요청 중 문제가 발생했습니다.");
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
