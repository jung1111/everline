export const getReservationPeriod = (period) => {
  const currentDate = new Date();
  const endDate = new Date(period);

  if (endDate <= currentDate) {
    return null; // 과거 날짜는 예약 판매 아이콘을 표시하지 않음
  }

  const startDate = new Date(endDate);
  startDate.setDate(startDate.getDate() - 37);

  // 날짜 형식을 "MM.DD"로 변환
  const formatDate = (date) => {
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${month}.${day}`;
  };

  // 총 기간과 남은 기간 계산

  const remainingDays = (startDate - currentDate) / (1000 * 60 * 60 * 24);
  const remainingPercentage = (remainingDays / 37) * -100;

  console.log(remainingDays);
  return {
    period: `${formatDate(startDate)}~${formatDate(endDate)}`,
    remainingPercentage,
  };
};
