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
  const [isPasswordChangeVisible, setIsPasswordChangeVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserInfo = async () => {
      const userEmail = sessionStorage.getItem("email");
      if (!userEmail) return;

      try {
        const response = await fetch(`/api/users/${userEmail}`);
        const data = await response.json();

        setEmail(data.email);
        setNickname(data.nickname);
        setPreferred(data.preferred_factor);
      } catch (error) {
        console.error("사용자 정보 조회 실패", error);
      }
    };

    fetchUserInfo();
  }, []);

  const handleProfileUpdate = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`/api/users/${email}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nickname,
          preferred_factor: preferred,
        }),
      });

      const result = await response.json();
      if (response.ok) {
        alert("정보가 수정되었습니다.");
      } else {
        alert(result.message || "수정 실패");
      }
    } catch (error) {
      console.error("프로필 수정 오류", error);
      alert("서버 오류 발생");
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      alert("새 비밀번호와 확인 비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      const response = await fetch(`/api/users/${email}/password`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPassword,
          newPassword,
        }),
      });

      const result = await response.json();
      if (response.ok) {
        alert("비밀번호가 수정되었습니다.");
      } else {
        alert(result.message || "비밀번호 수정 실패");
      }
    } catch (error) {
      console.error("비밀번호 변경 오류", error);
      alert("서버 오류 발생");
    }
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

        <button type="button" onClick={handleProfileUpdate}>
          적용
        </button>

        <button
          type="button"
          onClick={() => setIsPasswordChangeVisible(!isPasswordChangeVisible)}
        >
          {isPasswordChangeVisible ? "취소" : "비밀번호 변경하기"}
        </button>

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
            <button type="submit" onClick={handlePasswordChange}>
              비밀번호 수정하기
            </button>
          </>
        )}
      </form>
    </div>
  );
};

export default MyPage;
