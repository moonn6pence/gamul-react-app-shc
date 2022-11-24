export const increment = () => {
  return {
    type: "증가",
  };
};

export const decrement = () => {
  return {
    type: "감소",
  };
};

export const sendMarket = (market_title) => {
  return {
    type: "마커클릭",
    market_title,
  };
};

export const selectMarket = (market_title) => {
  return {
    type: "마켓선택",
    market_title,
  };
};

export const MoveBookMark = () => {
  return {
    type: "북마크",
    flag: false,
  };
};

export const MoveMap = () => {
  return {
    type: "지도",
    flag: true,
  };
};

export const setImageBase24 = (imagebase24) => {
  return {
    tyep: "Base24이미지저장",
    imagebase24,
  };
};

export const setImageForm = (imageform) => {
  return {
    tyep: "Form이미지저장",
    imageform,
  };
};