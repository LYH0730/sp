import { useEffect, useState } from "react";
import "./ParkingPopup.css";

const ParkingPopup = ({ parking, onClose, preferredFactor }) => {
  const [currentPosition, setCurrentPosition] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentPosition({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("현재 위치를 가져오는 데 실패했습니다:", error);
          setCurrentPosition(null); // 위치를 가져올 수 없으면 null로 처리
        }
      );
    } else {
      console.warn("Geolocation API를 지원하지 않는 브라우저입니다.");
      setCurrentPosition(null);
    }
  }, []);

  const score = parking[`ai_recommend_score_${preferredFactor.toLowerCase()}`];

  const handleDirectionClick = () => {
    if (!currentPosition) {
      alert("현재 위치를 가져올 수 없습니다.");
      return;
    }

    const { lat, lng } = currentPosition;
    const destination = parking;
    const destinationName = parking.name;
    const destinationLat = parking.latitude;
    const destinationLng = parking.longitude;

    // 카카오맵 길찾기 URL 형식으로 이동
    const url = `https://map.kakao.com/link/to/${encodeURIComponent(destinationName)},${destinationLat},${destinationLng}`;
    
    // 현재 위치와 목적지 정보를 카카오맵에 전달
    window.open(url, "_blank");
  };

  return (
    <div className="popup-overlay">
      <div className="popup-card">
        <h2>{parking.name}</h2>
        <p>{parking.address}</p>
        <p>요금: {parking.fee.toLocaleString()}원</p>
        <p>평점: {parking.avg_rating}</p>
        <p>혼잡도: {parking.real_time_congestion}</p>
        <p>
          AI 추천 점수 ({preferredFactor} 기준): <strong>{score}</strong>
        </p>
        <div className="popup-actions">
          <button onClick={onClose}>닫기</button>
          <button onClick={handleDirectionClick}>길찾기</button>
        </div>
      </div>
    </div>
  );
};

export default ParkingPopup;
