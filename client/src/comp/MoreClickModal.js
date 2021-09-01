import styled from "styled-components";
import thumbs_up_icon from "../thumbs_up_icon.png";
import axios from "axios";

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
  display: grid;
  place-items: center;
  background-color: white;
  border-radius: 30px;
  min-width: 300px;
  min-height: 300px;
  text-align: center;
  position: relative;
  justify-items: center;
  > #closeBtn {
    font-size: max(30px, 2.8vw);
    position: absolute;
    top: 20px;
    right: max(2.8vw, 20px);
    cursor: pointer;
    transition: 0.4s;
  }
  > #closeBtn:hover {
    transform: rotate(180deg);
  }
`;

const Word = styled.div`
  width: 70%;
  height: 75%;
  display: flex;
  flex-direction: column;
  > h2 {
    width: 100%;
    height: 3vw;
    min-height: 30px;
    margin: 0 auto;
    border-bottom: 3px solid black;
    flex: 1 1 auto;
    line-height: max(15px, 3vw);
    :focus {
      border-bottom: 3px solid #9ee6c5;
    }
  }
  > #wordMean {
    flex: 8 1 auto;
    display: flex;
    justify-content: center;
    align-items: center;
    > p {
      line-height: 28px;
    }
  }
  > button {
    flex: 0.5 1 auto;
    width: 40%;
    min-height: 30px;
    margin: 0 auto;
    border-radius: 20px;
    border: 2px solid black;
    cursor: pointer;
    transition: all 0.3s;
    background-color: #fff;
    color: #000;
    font-size: max(12px, 0.8vw);
    > img {
      width: 20px;
      height: 20px;
      margin-bottom: 10px;
    }
  }
  > button:hover {
    background-color: #d2f8e0;
    color: #000;
  }
`;

function MoreClickModal({
  setMoreClickModal,
  currResult,
  setAccToken,
  accToken,
  setNeedUpdate,
  needUpdate,
}) {
  const url = process.env.REACT_APP_API_URL || `http://localhost:4000`;
  const thumbsUpIncrease = async (eleId) => {
    let thumbsupClicked = await axios.patch(
      `${url}/contents/thumbsup`,
      {
        contentId: String(eleId),
      },
      {
        headers: { authorization: `Bearer ${accToken}` },
      }
    );
    if (thumbsupClicked.data.accessToken) {
      setAccToken(thumbsupClicked.data.accessToken);
    }
    alert("좋아요 버튼을 눌렀습니다.");
    setNeedUpdate(!needUpdate);
    setMoreClickModal(false);
  };
  return (
    <>
      <ModalBack>
        <ModalBox>
          <div id="closeBtn" onClick={() => setMoreClickModal(false)}>
            &times;
          </div>
          <Word>
            <h2>{currResult.data.wordName}</h2>
            <div id="wordMean">
              <p>{currResult.data.wordMean}</p>
            </div>
            <button onClick={() => thumbsUpIncrease(currResult.data.id)}>
              {/*추천 수, 추천하기 버튼*/}
              <img src={thumbs_up_icon} alt="thumbs up" />
              <p>{currResult.data.thumbsup}</p>
            </button>
          </Word>
        </ModalBox>
      </ModalBack>
    </>
  );
}

export default MoreClickModal;
