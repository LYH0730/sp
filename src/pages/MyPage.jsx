import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./MyPage.css";

const MyPage = () => {
  const [nickname, setNickname] = useState("");
  const [preferred, setPreferred] = useState("");
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordChangeVisible, setIsPasswordChangeVisible] = useState(false);  // 비밀번호 변경 폼 표시 여부
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("users"))?.find(
      (user) => user.email === sessionStorage.getItem("email")
    );
    if (user) {
      setEmail(user.email);
      setNickname(user.nickname);
      setPreferred(user.preferred_factor);
    }
  }, []);

  const handleProfileUpdate = (e) => {
    e.preventDefault();

    // 선호 요소와 닉네임만 수정하고 비밀번호는 변경하지 않음
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const updatedUsers = users.map((user) =>
      user.email === email
        ? { ...user, nickname, preferred_factor: preferred }
        : user
    );

    localStorage.setItem("users", JSON.stringify(updatedUsers));
    alert("정보가 수정되었습니다.");
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();

    // 비밀번호 확인 로직
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const matchedUser = users.find((user) => user.email === email);

    if (currentPassword !== matchedUser.password) {
      alert("현재 비밀번호가 일치하지 않습니다.");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("새 비밀번호와 확인 비밀번호가 일치하지 않습니다.");
      return;
    }

    // 비밀번호 수정 후 저장
    const updatedUsers = users.map((user) =>
      user.email === email
        ? { ...user, password: newPassword, nickname, preferred_factor: preferred }
        : user
    );

    localStorage.setItem("users", JSON.stringify(updatedUsers));
    alert("비밀번호가 수정되었습니다.");
  };

  return (
    <div className="mypage-container">
      <h1>마이페이지</h1>
      <form>
        <div>
          <label>이메일</label>
          <input type="text" value={email} disabled />
        </div>
        <div>
          <label>닉네임</label>
          <input
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
        </div>
        <div>
          <label>선호 요소</label>
          <select
            value={preferred}
            onChange={(e) => setPreferred(e.target.value)}
          >
            <option value="FEE">요금</option>
            <option value="DISTANCE">거리</option>
            <option value="RATING">평점</option>
            <option value="CONGESTION">혼잡도</option>
          </select>
        </div>

        {/* "적용" 버튼 */}
        <button 
          type="button"
          onClick={handleProfileUpdate}
        >
          적용
        </button>

        {/* 비밀번호 변경 버튼 */}
        <button 
          type="button" 
          onClick={() => setIsPasswordChangeVisible(!isPasswordChangeVisible)}
        >
          {isPasswordChangeVisible ? "취소" : "비밀번호 변경하기"}
        </button>

        {/* 비밀번호 변경 폼 */}
        {isPasswordChangeVisible && (
          <>
            <div>
              <label>현재 비밀번호</label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
            </div>
            <div>
              <label>새 비밀번호</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <div>
              <label>새 비밀번호 확인</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <button type="submit" onClick={handlePasswordChange}>비밀번호 수정하기</button>
          </>
        )}
      </form>
    </div>
  );
};

export default MyPage;
