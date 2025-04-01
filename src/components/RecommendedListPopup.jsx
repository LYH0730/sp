import "./RecommendedListPopup.css";

const getColorByScore = (score) => {
  let red, green, blue = 0;
  if (score <= 50) {
    red = 255;
    green = Math.round(score * 5.1);
  } else {
    red = Math.round((100 - score) * 5.1);
    green = 255;
  }
  return `rgb(${red}, ${green}, ${blue})`;
};

const RecommendedListPopup = ({ lots, title, onSelect, onClose }) => {
  const sortedLots = [...lots].sort((a, b) => {
    const factor = "ai_recommend_score_" + (a.preferred_factor?.toLowerCase() || "distance");
    return (b[factor] || 0) - (a[factor] || 0);
  });

  return (
    <div className="recommend-popup-overlay">
      <div className="recommend-popup-card">
        <h3 className="recommend-title">{title}</h3>
        <button className="recommend-close-btn" onClick={onClose}>×</button>
        <ul className="recommend-list">
          {sortedLots.map((lot) => {
            const factor = lot.preferred_factor?.toLowerCase() || "distance";
            const score = lot[`ai_recommend_score_${factor}`] || 0;
            const scoreColor = getColorByScore(score);

            return (
              <li key={lot.p_id} className="recommend-card" onClick={() => onSelect(lot)}>
                <h4>{lot.name}</h4>
                <p>{lot.address}</p>
                <p>요금: {lot.fee.toLocaleString()}원</p>
                <p>AI 추천 점수: <span style={{ color: scoreColor }}>{score}</span></p>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default RecommendedListPopup;