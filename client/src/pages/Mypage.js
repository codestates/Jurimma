import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import axios from "axios";
import { Redirect } from "react-router";
import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";

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
    cursor: pointer;
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

function Mypage({ isLogin, accToken, setMoreClickModal, setCurrResult }) {
  const url = process.env.REACT_APP_API_URL || `http://localhost:4000`;
  const [userContent, setUserContent] = useState({
    data: [],
  });
  const [gotDeleted, setGotDeleted] = useState(false); // 데이터 삭제하는거 확인하는 state
  const [orderBy, setOrderBy] = useState("byDates"); // 정리할 기준 지정
  const [isOn, setIsOn] = useState(false);
  const [checkedItems, setCheckedItems] = useState([]);

  useEffect(() => {
    getUserContent();
  }, [gotDeleted]); // 삭제시 다시 데이터 받아옴

  const ordering = (value) => {
    if (value === "byThumbsup") {
      setOrderBy("byThumbsup");
      setUserContent({
        data: userContent.data.sort((a, b) => b.thumbsup - a.thumbsup),
      });
    } else if (value === "byDates") {
      setOrderBy("byDates");
      setUserContent({
        data: userContent.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        ),
      });
    }
  };

  const readResult = (ele) => {
    setCurrResult({ data: ele });
    setMoreClickModal(true);
  }; // 세부 정보 확인 모달로 이동

  const getUserContent = async () => {
    let userContent = await axios.get(`${url}/myContents`, {
      header: { authorization: `Bearer ${accToken}` },
    });
    setUserContent({
      data: userContent.data.data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      ),
    });
  }; // 유저가 쓴 글 가져오기

  const handleSingleCheck = async (checked, id) => {
    if (checked === true) {
      console.log("checked: " + checked);
      await setCheckedItems([...checkedItems, id]);
      console.log("isOn: " + isOn);
      if (checkedItems.length === userContent.data.map.length - 1) {
        setIsOn(true);
      } else {
        setIsOn(false);
      }
    } else {
      console.log("checked: " + checked);
      await setCheckedItems([checkedItems.filter((ele) => ele.id !== id)]);
      console.log("isOn: " + isOn);
      if (checkedItems.length === userContent.data.map.length - 1) {
        setIsOn(true);
      } else {
        setIsOn(false);
      }
    }
  }; // checkbox 하나씩 선택하기

  const handleAllClick = (checked) => {
    if (checked) {
      // 전체 선택, true일때
      setCheckedItems([...userContent.data.map((ele) => ele.id)]);
      setIsOn(true);
    } else {
      // 전체 해제
      setCheckedItems([]);
      setIsOn(false);
    }
  };

  const deleteContent = async () => {
    await axios.post(
      `${url}/contents/delete`,
      {
        contentId: checkedItems,
      },
      {
        headers: { authorization: `Bearer ${accToken}` },
      }
    );
    alert("글이 삭제되었습니다.");
    setGotDeleted(!gotDeleted);
  }; // 만든 글 삭제하기

  const contentCount = userContent.data.length; // 전체 글 수
  const contentThumbsupCount = userContent.data.reduce((acc, cur) => {
    if (acc < cur.thumbsup) return cur.thumbsup;
    else return acc;
  }, 0); // 최고 추천수

  return (
    <>
      {isLogin ? (
        <MypageWrap>
          <MypageContent>
            {" "}
            {/* 내가 쓴 글 목록 */}
            <UserContent>
              <p>
                작성하신 글은 {contentCount}개 이며, 최대 추천수는{" "}
                {contentThumbsupCount}개 입니다
              </p>
              <select
                value={orderBy}
                onChange={(e) => ordering(e.target.value)}
              >
                <option value="byThumbsup">추천수 순</option>
                <option defaultValue value="byDates">
                  최신순
                </option>
              </select>
            </UserContent>
            <ContentList>
              {userContent.data.map((ele, idx) => {
                return (
                  <li className="content" key={idx}>
                    <input
                      type="checkbox"
                      checked={checkedItems.includes(ele.id) ? true : false}
                      onChange={(e) =>
                        handleSingleCheck(e.target.checked, ele.id)
                      }
                    />
                    <div
                      className="contentInfo"
                      onClick={() => readResult(ele)}
                    >
                      <p>{ele.wordName}</p>
                      <p>{ele.wordMean}</p>
                      <p>{ele.thumbsup}</p>
                    </div>
                  </li>
                );
              })}
            </ContentList>
            <ContentCheck>
              <button
                id="allCheck"
                onClick={
                  isOn /*false라면 전체 선택 하도록, true라면 전체 선택 해제하도록 */
                    ? () => handleAllClick(false)
                    : () => handleAllClick(true)
                }
              >
                전체 선택
              </button>
              <button id="delete" onClick={() => deleteContent()}>
                삭제
              </button>
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
