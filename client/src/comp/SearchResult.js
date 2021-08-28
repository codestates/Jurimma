import React from "react";
import styled from "styled-components";
import empty from "../empty.png";

function SearchResult({ data }) {
  let result = data
    .sort((a, b) => a.thumbsup - b.thumbsup)
    .reverse()
    .slice(0, 3);
  //let result = [];
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
      background-color: #ffff8d;
      p {
        padding: 0 5px;
        font-size: max(1vw, 15px);
        flex: 1 0 auto;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      p:nth-child(2) {
        flex: 3 1 auto;
      }
    }
    li:nth-child(1) {
      margin-top: 0px;
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
    font-size: max(0.8vw, 11px);
    transition: 0.2s;
    :hover {
      background-color: white;
      color: black;
      cursor: pointer;
    }
  `;

  return (
    <>
      {result.length === 0 ? (
        <div>
          <EmptyResult>
            <img src={empty} alt="empty" />
            <p>검색 결과가 없습니다.</p>
          </EmptyResult>

          <BtnWrap>
            <NewMoreBtn>새로 만들기</NewMoreBtn>
            <NewMoreBtn>더보기</NewMoreBtn>
          </BtnWrap>
        </div>
      ) : (
        <div>
          <ResultList>
            {result.map((ele, idx) => {
              return (
                <li key={idx}>
                  <p>{ele.wordName}</p>
                  <p>{ele.wordMean}</p>
                  <p>{ele.thumbsup}</p>
                </li>
              );
            })}
          </ResultList>

          <BtnWrap>
            <NewMoreBtn>새로 만들기</NewMoreBtn>
            <NewMoreBtn>더보기</NewMoreBtn>
          </BtnWrap>
        </div>
      )}
    </>
  );
}

export default SearchResult;
