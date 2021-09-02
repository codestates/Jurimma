import React from "react";
import styled from "styled-components";
import empty from "../empty.png";
import thumbs_up_icon from "../thumbs_up_icon.png";

const EmptyResult = styled.div`
  text-align: center;
  > img {
    width: 20vh;
    height: 20vh;
  }
`;
const Result = styled.div`
  display: flex;
  flex-direction: column;
`;
const ResultName = styled.h2`
  text-align: center;
  font-size: 1.5em;
  margin-bottom: 2vw;
`;
const Morebutton = styled.button`
  display: block;
  width: 10vw;
  min-width: 80px;
  height: 5vh;
  background-color: #000;
  border: 2px solid #000;
  border-radius: 5vh;
  margin: 0 auto 2vw;
  font-size: max(12px, 0.8vw);
  color: #fff;
  transition: all 0.3s;
  cursor: pointer;
  :hover {
    background-color: #fff;
    color: #000;
  }
`;

const ResultList = styled.ul`
  margin-top: 20px;
  width: 100%;
  margin: 0 auto;
  li {
    display: flex;
    width: 75%;
    height: 8vh;
    margin: 2vh auto 0;
    border: 2px solid #000;
    border-radius: 40px;
    text-align: center;
    line-height: 8vh;
    background-color: rgba(210, 248, 224, 0.9);
    cursor: pointer;
    transition: 0.3s;
    p:first-child {
      font-weight: bold;
      font-size: max(16px, 1vw);
    }
    p {
      flex: 1 1 auto;
      font-size: max(14px, 1vw);
    }
    p:nth-child(2) {
      flex: 3 1 auto;
    }
    .imgWrap {
      position: relative;
      right: 0.5vw;
      padding: 0.35vw;
      background-color: rgba(210, 248, 224, 0.9);
      border-radius: 50px;
    }
    .imgWrap img {
      position: relative;
      top: 0.2vw;
      width: max(1.1vw, 18px);
      height: max(1.1vw, 18px);
    }
  }
  li:hover {
    background-color: rgba(0, 0, 0, 0.8);
    color: #fff;
    p {
      font-weight: bold;
    }
  }

  li:nth-child(1) {
    margin-top: 0px;
  }
  li:hover {
    background-color: rgba(0, 0, 0, 0.8);
    color: #fff;
    p {
      font-weight: bold;
    }
  }
  li:nth-child(1) {
    margin-top: 0px;
  }
`;

function SearchMore({
  result,
  setMoreClickModal,
  setWriteModal,
  setCurrResult,
}) {
  let moreResult = result.sort((a, b) => b.thumbsup - a.thumbsup);
  const showSearchMore = (info) => {
    setCurrResult({ data: info });
    setMoreClickModal(true);
  };
  // const [scrollY, setScrollY] = useState(0);
  // const [showBtn, setShowBtn] = useState(false);
  // const handleFollow = () => {
  //   setScrollY(window.pageYOffset); // window scroll값 저장
  //   if (scrollY > 30) {
  //     setShowBtn(true);
  //   } else {
  //     setShowBtn(false);
  //   }
  // };
  // const handleTop = () => {
  //   window.scrollTo({
  //     top: 0,
  //     behavior: "smooth",
  //   });
  //   setScrollY(0);
  //   setShowBtn(false);
  // };
  // const handleDown = () => {
  //   window.scrollTo({
  //     bottom: 0,
  //     behavior: "smooth",
  //   });
  //   setScrollY(0);
  //   setShowBtn(false);
  // };

  return (
    <>
      {moreResult.length === 0 ? (
        <EmptyResult>
          <img src={empty} alt="empty" />
          <p>검색 결과가 없습니다.</p>
        </EmptyResult>
      ) : (
        <Result>
          <ResultName>
            "{moreResult[0].wordName}"의 검색 결과 입니다.
          </ResultName>
          <Morebutton onClick={() => setWriteModal(true)}>
            뜻 추가하기
          </Morebutton>
          <ResultList>
            {moreResult.map((ele, idx) => {
              return (
                <li key={idx} onClick={() => showSearchMore(ele)}>
                  <p>{ele.wordName}</p>
                  <p>{ele.wordMean}</p>
                  <p>
                    <span className="imgWrap">
                      <img src={thumbs_up_icon} alt="thumbsup" />
                    </span>
                    <span>{ele.thumbsup}</span>
                  </p>
                </li>
              );
            })}
          </ResultList>
        </Result>
      )}
    </>
  );
}

export default SearchMore;
