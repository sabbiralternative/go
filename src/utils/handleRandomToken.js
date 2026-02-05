const handleRandomToken = () => {
  const utcTimestamp = Math.floor(Date.now() / 1000);

  const multipliedTimestamp = utcTimestamp * 247;
  const randomSixDigitNumber_1 = Math.floor(100000 + Math.random() * 900000);
  const randomSixDigitNumber_2 = Math.floor(100000 + Math.random() * 900000);

  return `${randomSixDigitNumber_1}${multipliedTimestamp}${randomSixDigitNumber_2}`;
};
export default handleRandomToken;
