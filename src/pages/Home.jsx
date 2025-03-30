import { useEffect, useState, useRef } from "react";
import LocationMarker from "../components/LocationMarker";
import ParkingLocationMarker from "../components/ParkingLocationMarker";
import BottomNav from "../components/BottomNav";
import "./Home.css";

const Home = () => {
  const mapRef = useRef(null);
  const [userPosition, setUserPosition] = useState(null);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [isKakaoMapLoaded, setIsKakaoMapLoaded] = useState(false);
  const [mapInstance, setMapInstance] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setUserPosition({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          });
          setShowErrorMessage(false);
        },
        () => {
          setUserPosition({ lat: 37.5665, lng: 126.978 });
          setShowErrorMessage(true);
          setTimeout(() => setShowErrorMessage(false), 3000);
        }
      );
    } else {
      setUserPosition({ lat: 37.5665, lng: 126.978 });
      setShowErrorMessage(true);
      setTimeout(() => setShowErrorMessage(false), 3000);
    }
  }, []);

  useEffect(() => {
    if (!userPosition || isKakaoMapLoaded) return;

    const scriptId = "kakao-map-sdk";
    const loadMap = () => {
      if (!window.kakao || !window.kakao.maps || !mapRef.current) return;

      const options = {
        center: new window.kakao.maps.LatLng(userPosition.lat, userPosition.lng),
        level: 3,
      };

      const map = new window.kakao.maps.Map(mapRef.current, options);
      setMapInstance(map);
      setIsKakaoMapLoaded(true);
    };

    const waitForReady = () => {
      const checkReady = () => {
        if (
          mapRef.current &&
          window.kakao &&
          window.kakao.maps &&
          typeof window.kakao.maps.LatLng === "function"
        ) {
          loadMap();
        } else {
          requestAnimationFrame(checkReady);
        }
      };
      checkReady();
    };

    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.src =
        "https://dapi.kakao.com/v2/maps/sdk.js?appkey=76d35304f2cbc0619c0024e8f209970a&autoload=false";
      script.onload = () => {
        window.kakao.maps.load(() => {
          waitForReady();
        });
      };
      document.head.appendChild(script);
    } else {
      window.kakao.maps.load(() => {
        waitForReady();
      });
    }
  }, [userPosition, isKakaoMapLoaded]);

  return (
    <div className="home-page">
      {showErrorMessage && (
        <div className="error-overlay">
          <div className="error-message">
            위치 정보를 찾을 수 없어 서울시청역으로 변경합니다
          </div>
        </div>
      )}

      <div id="map" ref={mapRef} style={{ width: "100%", height: "100vh" }} />

      {mapInstance && userPosition && (
        <LocationMarker map={mapInstance} position={userPosition} />
      )}
      {mapInstance && <ParkingLocationMarker map={mapInstance} />}

      <BottomNav />
    </div>
  );
};

export default Home;
