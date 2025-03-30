import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.css";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [preferred, setPreferred] = useState("FEE");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    // MSW API 호출로 회원가입 요청
    try {
      const response = await fetch('/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email,
          password: password,
          nickname: nickname,
          preferred_factor: preferred
        })
      });
      const data = await response.json();
      if (response.ok) {
        alert("회원가입 성공! 이제 로그인 해보세요.");
        navigate("/login");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Signup error:", error);
      alert("회원가입 처리 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <label>이메일</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label>비밀번호</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <label>비밀번호 확인</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <label>닉네임</label>
        <input
          type="text"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          required
        />
        <label>선호 요소</label>
        <div className="radio-group">
          <label>
            <input
              type="radio"
              name="preferred"
              value="FEE"
              checked={preferred === "FEE"}
              onChange={(e) => setPreferred(e.target.value)}
            />
            요금
          </label>
          <label>
            <input
              type="radio"
              name="preferred"
              value="DISTANCE"
              checked={preferred === "DISTANCE"}
              onChange={(e) => setPreferred(e.target.value)}
            />
            거리
          </label>
          <label>
            <input
              type="radio"
              name="preferred"
              value="RATING"
              checked={preferred === "RATING"}
              onChange={(e) => setPreferred(e.target.value)}
            />
            평점
          </label>
          <label>
            <input
              type="radio"
              name="preferred"
              value="CONGESTION"
              checked={preferred === "CONGESTION"}
              onChange={(e) => setPreferred(e.target.value)}
            />
            혼잡도
          </label>
        </div>
        <button type="submit">회원가입</button>
      </form>
    </div>
  );
};

export default Signup;
