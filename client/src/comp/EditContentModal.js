import React, { useState } from "react";
import styled from "styled-components";
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

const NewWord = styled.h2`
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

const Editbutton = styled.button`
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

function EditContentModal({
  accToken,
  setAccToken,
  setEditContentModal,
  editResult,
  needUpdate,
  setNeedUpdate,
  setUserContent,
}) {
  const url = process.env.REACT_APP_API_URL || `http://localhost:4000`;
  const [newWord, setNewWord] = useState({ data: editResult.data });
  const handleEditInputValue = (e) => {
    setNewWord({
      data: {
        ...editResult.data,
        wordMean: e.target.value,
      },
    });
  };
  const handleKeyPressEdit = (e) => {
    if (e.type === "keypress" && e.code === "Enter") {
      handleEditWord();
    }
  };
  const handleEditWord = async () => {
    try {
      if (newWord.data.wordMean.length === editResult.data.wordMean.length) {
        alert("변경 사항이 없습니다.");
      } else if (newWord.data.wordMean.length > 200) {
        alert("200자 미만으로 입력해주세요.");
      } else {
        let editWordMean = await axios.patch(
          `${url}/contents`,
          {
            contentId: newWord.data.id,
            wordMean: newWord.data.wordMean,
          },
          { headers: { authorization: `Bearer ${accToken}` } }
        );
        if (editWordMean.data.accessToken) {
          setAccToken(editWordMean.data.accessToken);
        }
        if (editWordMean.data.message === "ok") {
          alert("수정이 완료되었습니다");
          setEditContentModal(false);
          let userContent = await axios.get(`${url}/myContents`, {
            headers: { authorization: `Bearer ${accToken}` },
          });
          if (userContent.data.accessToken) {
            setAccToken(userContent.data.accessToken);
          }
          setUserContent({
            data: userContent.data.data.sort(
              (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
            ),
          });
          console.log(userContent);
          // setNeedUpdate(!needUpdate);
        }
      }
    } catch (err) {
      console.log(err);
      alert("다시 시도해주세요.");
    }
  };

  return (
    <>
      <ModalBack>
        {" "}
        {/* 글 수정 */}
        <ModalBox>
          <div onClick={() => setEditContentModal(false)}>&times;</div>
          <NewWord>{newWord.data.wordName}</NewWord>
          <WordMean
            placeholder="200자 미만으로 입력해주세요."
            value={newWord.data.wordMean}
            onChange={(e) => handleEditInputValue(e)}
            onKeyPress={(e) => handleKeyPressEdit(e)}
          />
          <Editbutton onClick={handleEditWord}>수정하기</Editbutton>
        </ModalBox>
      </ModalBack>
    </>
  );
}

export default EditContentModal;
