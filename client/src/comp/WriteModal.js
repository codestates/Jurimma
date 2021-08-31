import React, { useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router";
import axios from "axios";

axios.defaults.withCredentials = true;
const { WordNameLength, WordMeanLength } = require("../checkModule");

const ModalBack = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: grid;
  place-items: center;
  z-index: 100;
`;

const ModalBox = styled.div`
  width: 50vw;
  height: 80vh;
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: 30px;
  min-width: 300px;
  min-height: 300px;
  text-align: center;
  position: relative;
  justify-items: center;
  > div {
    font-size: max(30px, 2.8vw);
    position: absolute;
    top: 20px;
    right: max(2.8vw, 20px);
    cursor: pointer;
    transition: 0.4s;
  }
  > div:hover {
    transform: rotate(180deg);
  }
`;

const NewWord = styled.input`
  width: 70%;
  height: 3vw;
  min-height: 30px;
  background: transparent;
  outline: none;
  border: 0;
  border-bottom: 3px solid black;
  margin: 0 auto;
  margin-top: 50px;
  font-size: max(13px, 1.3vw);
  transition: 0.3s;
  padding-left: 10px;
  :focus {
    border-bottom: 3px solid #9ee6c5;
  }
  :hover {
    border-bottom: 3px solid #9ee6c5;
  }
  :focus::-webkit-input-placeholder {
    color: transparent;
  }
`;

const WordMean = styled.textarea`
  width: 70%;
  height: 50vh;
  margin: 0 auto;
  margin-top: 5vh;
  border: 1px solid black;
  line-height: 5vh;
  padding: 10px 0 0 10px;
  font-size: max(17px, 1.5vw);
  outline: none;
  border-radius: 20px;
  :focus {
    border: 2px solid black;
  }
`;

const Addbutton = styled.button`
  width: 50%;
  height: 5vh;
  min-height: 30px;
  background-color: black;
  margin: 0 auto;
  color: white;
  font-size: max(12px, 0.8vw);
  margin-top: max(4vh, 25px);
  border-radius: 20px;
  border: 2px solid black;
  cursor: pointer;
  transition: 0.3s;
  :hover {
    background-color: white;
    color: black;
    border: 2px solid black;
  }
`;

function WriteModal({
  setWriteModal,
  accToken,
  setAccToken,
  userInfo,
  setisLogin,
}) {
  const url = process.env.REACT_APP_API_URL || `http://localhost:4000`;
  const history = useHistory();
  const [newWord, setNewWord] = useState({
    wordName: "",
    userId: userInfo.id,
    wordMean: "",
  });

  const handleKeyPressWrite = (e) => {
    if (e.type === "keypress" && e.code === "Enter") {
      handleWrite();
    }
  };

  const handleWriteInputValue = (key) => (e) => {
    setNewWord({ ...newWord, [key]: e.target.value });
  };

  const handleWrite = async () => {
    try {
      if (!newWord.wordName) {
        alert("줄임말 이름을 입력해주세요.");
      } else if (!newWord.wordMean) {
        alert("줄임말 뜻을 입력해주세요.");
      } else if (!WordNameLength(newWord.wordName)) {
        alert("20자 미만으로 입력해주세요.");
      } else if (!WordMeanLength(newWord.wordMean)) {
        alert("200자 미만으로 입력해주세요.");
      } else {
        let writeRes = await axios({
          url: `${url}/contents`,
          method: "post",
          headers: { authorization: `Bearer ${accToken}` },
          data: newWord,
        });
        if (writeRes.data.accessToken) {
          setAccToken(writeRes.data.accessToken);
        }
        alert("새로운 줄임말이 등록되었습니다.");
        setWriteModal(false);
      }
    } catch (error) {
      alert("다시 로그인해주세요.");
      setWriteModal(false);
    }
  };

  return (
    <>
      <ModalBack>
        {" "}
        {/* 새로운 글 전송 */}
        <ModalBox>
          <div onClick={() => setWriteModal(false)}>&times;</div>
          <NewWord
            type="text"
            placeholder="새로 쓸 단어를 입력해주세요"
            onChange={handleWriteInputValue("wordName")}
            value={newWord.wordName}
            onKeyPress={handleKeyPressWrite}
          ></NewWord>
          <WordMean
            onChange={handleWriteInputValue("wordMean")}
            value={newWord.wordMean}
            onKeyPress={handleKeyPressWrite}
          />
          <Addbutton onClick={handleWrite}>추가하기</Addbutton>
        </ModalBox>
      </ModalBack>
    </>
  );
}

export default WriteModal;
