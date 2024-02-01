export const applyDateFormatting = (chatDate: string) => {
  const getDifferenceInDays = () => {
    const past = new Date(chatDate).getTime();
    const current = new Date().getTime();
    const differenceInDays = Math.abs(current - past);
    const diffDays = Math.floor(differenceInDays / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getYYMMDD = () => {
    const parsedChatDate = new Date(Date.parse(chatDate));
    const year = parsedChatDate.getFullYear();
    const month = parsedChatDate.getMonth() + 1;
    const day = parsedChatDate.getDate();
    return `${year}년 ${month}월 ${day}일`;
  };

  const getFormattedDate = () => {
    const diffDays = getDifferenceInDays();
    const YYMMDD = getYYMMDD();
    if (diffDays === 0) {
      return '오늘';
    } else if (diffDays > 0 && diffDays < 4) {
      return `${diffDays}일 전`;
    } else {
      return YYMMDD;
    }
  };

  const formattedDate = getFormattedDate();

  return formattedDate;
};
