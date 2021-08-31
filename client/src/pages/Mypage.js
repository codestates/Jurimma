import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { Redirect } from "react-router";

const MypageWrap = styled.div`
  width: 100%;
  margin: 0 auto;
  min-height: 55vh;
  font-size: max(16px, 0.8vw);
`;
const MypageContent = styled.div`
  width: 75%;
  min-width: 200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
`;
const UserContent = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1vw 0;
  border-bottom: 3px solid #000;
  margin-bottom: 2vw;
`;

const ContentList = styled.ul`
  display: flex;
  flex-direction: column;
  margin-bottom: 2vw;
  > .content {
    display: flex;
    /* justify-content: space-between; */
    padding: 1vw 0;
    border-bottom: 3px solid #000;
    > input {
      /* flex: 1 1 auto; */
    }
    > .contentInfo {
      /* flex: 5 1 auto; */
      display: flex;
      width: 100%;
      text-align: center;
      > p {
        /* flex: 1 1 auto; */
        text-align: center;
        width: 25%;
      }
      > p:nth-child(2) {
        /* flex: 5 1 auto; */
        width: 50%;
      }
    }
  }
`;
const ContentCheck = styled.div`
  display: flex;
  justify-content: space-between;
  > button {
    width: 9vw;
    min-width: 75px;
    height: 5vh;
    border: 2px solid black;
    box-sizing: border-box;
    border-radius: 5vh;
    word-break: keep-all;
    cursor: pointer;
    transition: 0.3s;
  }
  > button:hover {
    background-color: black;
    color: white;
  }
`;

function Mypage({ isLogin, accToken }) {
  const url = process.env.REACT_APP_API_URL || `http://localhost:4000`;
  const [userContent, setUserContent] = useState({
    data: [],
  });
  const getUserContent = async () => {
    let userContent = await axios.get(`${url}/myContents`, {
      header: { authorization: `Bearer ${accToken}` },
    });
    setUserContent({ data: userContent.data.data });
  };

  useEffect(() => {
    getUserContent();
  }, []);

  return (
    <>
      {isLogin ? (
        <MypageWrap>
          <MypageContent>
            {" "}
            {/* 내가 쓴 글 목록 */}
            <UserContent>
              <p>작성하신 글은 0개 이며, 최대 추천수는 0개 입니다</p>
              <select>
                <option>추천수 순</option>
                <option>작성 날짜 순</option>
              </select>
            </UserContent>
            <ContentList>
              {userContent.data.map((ele, idx) => {
                return (
                  <li className="content" key={idx}>
                    <input type="checkbox" />
                    <div className="contentInfo">
                      <p>{ele.wordName}</p>
                      <p>{ele.wordMean}</p>
                      <p>{ele.thumbsup}</p>
                    </div>
                  </li>
                );
              })}
            </ContentList>
            <ContentCheck>
              <button id="allCheck">전체 선택</button>
              <button id="delete">삭제</button>
            </ContentCheck>
          </MypageContent>
        </MypageWrap>
      ) : (
        <Redirect to="/" />
      )}
    </>
  );
}

export default Mypage;
