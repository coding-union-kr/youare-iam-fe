export const applyDateFormatting = (chatDate: string) => {
  const parsedChatDate = new Date(Date.parse(chatDate));

  const chatYear = parsedChatDate.getFullYear();
  const chatMonth = parsedChatDate.getMonth() + 1;
  const chatDay = parsedChatDate.getDate();

  const currentDay = new Date().getDate();

  const getFormattedDate = () => {
    if (currentDay - chatDay === 0) {
      return '오늘';
    } else if (currentDay - chatDay < 4) {
      return `${currentDay - chatDay}일 전`;
    } else {
      return `${chatYear}년 ${chatMonth}월 ${chatDay}일`;
    }
  };

  const formattedDate = getFormattedDate();
  return formattedDate;
};
