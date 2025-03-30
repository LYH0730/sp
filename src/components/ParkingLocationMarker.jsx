import { useEffect, useState } from "react";
import ParkingPopup from "./ParkingPopup";

const ParkingLocationMarker = ({ map }) => {
  const [preferredFactor, setPreferredFactor] = useState(null);
  const [parkingData, setParkingData] = useState([]);
  const [selectedParking, setSelectedParking] = useState(null);

  // 점수에 따라 색상 변화 (0 -> 빨강, 100 -> 초록, 50 -> 노랑)
  const getColorByScore = (score) => {
    // 0 -> 빨강, 100 -> 초록, 50 -> 노랑 (중간값)
    let red, green, blue = 0;

    if (score <= 50) {
      // 빨강 -> 노랑
      red = 255;
      green = Math.round(score * 5.1);  // 빨강에서 노랑으로
    } else {
      // 노랑 -> 초록
      red = Math.round((100 - score) * 5.1);  // 노랑에서 초록으로
      green = 255;
    }

    return `rgb(${red}, ${green}, ${blue})`;
  };

  useEffect(() => {
    const fetchUserPreference = async () => {
      const email = sessionStorage.getItem("email");
      if (!email) return;

      try {
        const res = await fetch(`/api/users/${email}`);
        const user = await res.json();
        setPreferredFactor(user.preferred_factor);
      } catch {
        setPreferredFactor("DISTANCE");
      }
    };
    fetchUserPreference();
  }, []);

  useEffect(() => {
    const fetchParking = async () => {
      try {
        const res = await fetch("/api/parkings");
        const data = await res.json();
        setParkingData(data);
      } catch (e) {
        console.error("주차장 데이터 오류", e);
      }
    };
    fetchParking();
  }, []);

  useEffect(() => {
    if (!map || !window.kakao || !preferredFactor || parkingData.length === 0) return;

    parkingData.forEach((parking) => {
      const key = `ai_recommend_score_${preferredFactor.toLowerCase()}`;
      const score = parking[key] || 0;

      // 점수에 따라 색상 변화
      const color = getColorByScore(score);

      const markerImage = new window.kakao.maps.MarkerImage(
        "data:image/svg+xml;charset=UTF-8," +
          encodeURIComponent(`
            <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg">
              <circle cx="10" cy="10" r="10" fill="${color}" />
            </svg>
          `),
        new window.kakao.maps.Size(20, 20),
        { offset: new window.kakao.maps.Point(10, 10) }
      );

      const marker = new window.kakao.maps.Marker({
        position: new window.kakao.maps.LatLng(parking.latitude, parking.longitude),
        image: markerImage,
        map,
        clickable: true,
      });

      window.kakao.maps.event.addListener(marker, "click", () => {
        setSelectedParking(parking);
      });
    });
  }, [map, preferredFactor, parkingData]);

  return (
    <>
      {selectedParking && (
        <ParkingPopup
          parking={selectedParking}
          preferredFactor={preferredFactor}
          onClose={() => setSelectedParking(null)}
        />
      )}
    </>
  );
};

export default ParkingLocationMarker;
