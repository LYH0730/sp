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

<<<<<<< HEAD
  const handleSubmit = async (e) => {
=======
  const handleSubmit = (e) => {
>>>>>>> 506801d3c44d1dc4a1ad5c6d0b102e8aba45234b
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

<<<<<<< HEAD
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
=======
    const newUser = {
      email,
      password,
      nickname,
      preferred_factor: preferred,
    };

    const existing = JSON.parse(localStorage.getItem("users")) || [];

    const alreadyExists = existing.some(u => u.email === email);
    if (alreadyExists) {
      alert("이미 존재하는 이메일입니다.");
      return;
    }

    const updated = [...existing, newUser];
    localStorage.setItem("users", JSON.stringify(updated));

    alert("회원가입 성공! 이제 로그인 해보세요.");
    navigate("/login");
>>>>>>> 506801d3c44d1dc4a1ad5c6d0b102e8aba45234b
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <label>이메일</label>
<<<<<<< HEAD
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
=======
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

        <label>비밀번호</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

        <label>비밀번호 확인</label>
        <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />

        <label>닉네임</label>
        <input type="text" value={nickname} onChange={(e) => setNickname(e.target.value)} required />

        <label>선호 요소</label>
        <div className="radio-group">
          <label>
            <input type="radio" name="preferred" value="FEE" checked={preferred === "FEE"} onChange={(e) => setPreferred(e.target.value)} />
            요금
          </label>
          <label>
            <input type="radio" name="preferred" value="DISTANCE" checked={preferred === "DISTANCE"} onChange={(e) => setPreferred(e.target.value)} />
            거리
          </label>
          <label>
            <input type="radio" name="preferred" value="RATING" checked={preferred === "RATING"} onChange={(e) => setPreferred(e.target.value)} />
            평점
          </label>
          <label>
            <input type="radio" name="preferred" value="CONGESTION" checked={preferred === "CONGESTION"} onChange={(e) => setPreferred(e.target.value)} />
            혼잡도
          </label>
        </div>

>>>>>>> 506801d3c44d1dc4a1ad5c6d0b102e8aba45234b
        <button type="submit">회원가입</button>
      </form>
    </div>
  );
};

export default Signup;
