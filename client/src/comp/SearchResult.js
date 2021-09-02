import React from "react";
import styled from "styled-components";
import thumbs_up_icon from "../thumbs_up_icon.png";
import { Link } from "react-router-dom";
import empty from "../empty.png";

const ResultList = styled.ul`
  margin-top: 20px;
  width: 65%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  li {
    display: flex;
    justify-content: space-around;
    height: 8vh;
    margin-top: 2vh;
    border: 2px solid #000;
    border-radius: 40px;
    text-align: center;
    line-height: 8vh;
    background-color: rgba(210, 248, 224, 0.9);
    cursor: pointer;
    color: #000;
    transition: ease-in-out 0.2s;
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
    }
    .imgWrap img {
      position: relative;
      top: 0.2vw;
      width: max(1.1vw, 18px);
      height: max(1.1vw, 18px);
    }
  }
  li:nth-child(1) {
    margin-top: 0px;
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
  li:hover {
    background-color: rgba(0, 0, 0, 0.8);
    color: #fff;
  }
`;
const EmptyResult = styled.div`
  text-align: center;
  > img {
    width: 20vh;
    height: 20vh;
  }
`;
const BtnWrap = styled.div`
  width: 22vw;
  min-width: 200px;
  margin: 0 auto;
  margin-top: 2vh;
  display: flex;
  justify-content: space-evenly;
`;
const NewMoreBtn = styled.button`
  width: 9vw;
  min-width: 75px;
  height: 5vh;
  border-radius: 5vh;
  border: 2px solid black;
  background-color: black;
  color: white;
  font-size: max(11px, 0.8vw);
  transition: 0.2s;
  :hover {
    background-color: rgba(255, 255, 255, 0.5);
    color: black;
    font-weight: bold;
    border: 2px solid black;
    cursor: pointer;
  }
  > a {
    display: block;
    width: 100%;
    height: 5vh;
    border-radius: 5vh;
    line-height: 5vh;
    box-sizing: border-box;
  }
`;

function SearchResult({
  result,
  isLogin,
  setWriteModal,
  setOnModal,
  setMoreClickModal,
  setCurrResult,
}) {
  let modifiedResult = result
    .sort((a, b) => b.thumbsup - a.thumbsup)
    .slice(0, 3);

  const showMore = (info) => {
    setCurrResult({ data: info });
    setMoreClickModal(true);
  };

  return (
    <>
      {result.length === 0 ? (
        <div>
          <EmptyResult>
            <img src={empty} alt="empty" />
            <p>검색 결과가 없습니다.</p>
          </EmptyResult>

          <BtnWrap>
            <NewMoreBtn
              onClick={
                isLogin ? () => setWriteModal(true) : () => setOnModal(true)
              }
            >
              새로 만들기
            </NewMoreBtn>
          </BtnWrap>
        </div>
      ) : (
        <div>
          <ResultList>
            {" "}
            {/* 검색하자마자 3개 */}
            {modifiedResult.map((ele, idx) => {
              return (
                <li key={idx} onClick={() => showMore(ele)}>
                  <p id="wordName">{ele.wordName}</p>
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

          <BtnWrap>
            <NewMoreBtn
              onClick={
                isLogin ? () => setWriteModal(true) : () => setOnModal(true)
              }
            >
              새로 만들기
            </NewMoreBtn>
            {isLogin ? (
              <NewMoreBtn>
                <Link to="/searchMore">더보기</Link>
              </NewMoreBtn>
            ) : (
              <NewMoreBtn onClick={() => setOnModal(true)}>더보기</NewMoreBtn>
            )}
          </BtnWrap>
        </div>
      )}
    </>
  );
}

export default SearchResult;
