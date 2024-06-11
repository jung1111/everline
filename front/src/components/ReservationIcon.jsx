import React from "react";

const ReservationIcon = ({ date, remainingPercentage }) => {
  if (!date) return null;

  const style = {
    width: `${remainingPercentage}%`,
  };

  return (
    <>
      <div>
        <span className="reservation-icon">예약판매</span>
      </div>
      <div className="reservation">
        <span>판매중</span>
        <i className="period">
          <i className="remain-period" style={style}></i>
        </i>
        <span>{date}</span>
      </div>
    </>
  );
};

export default ReservationIcon;
