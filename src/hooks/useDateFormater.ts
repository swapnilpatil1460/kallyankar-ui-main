const useDateFormater = () => {
  const dateFormater = (timeStamp: string) => {
    const formatedDate = new Date(timeStamp).toLocaleString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });
    return formatedDate;
  };
  return { dateFormater };
};

export default useDateFormater;
