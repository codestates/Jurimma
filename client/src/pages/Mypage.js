import React from "react";
import styled from "styled-components";

const MypageWrap = styled.div`
    width:100%;
    min-height:55vh;
    /* display:grid;
    place-items:center; */
    font-size:max(16px, 0.8vw);
`
const MypageContent = styled.div`
    width:75%;
    border:1px solid red;
    min-width:200px;
    margin:0 auto;
    display:flex;
    flex-direction:column;  
    flex-wrap:wrap;
`
const UserContent = styled.div`
    display:flex;
    justify-content:space-between;
    padding: 1vw 0;
    border-bottom: 3px solid #000;
    margin-bottom:2vw;
`
const ContentList = styled.ul`
    display:flex;
    flex-direction:column;
    margin-bottom:2vw;
    >.content{
        display:flex;
        justify-content: space-between;
        padding: 1vw 0;
        border-bottom: 3px solid #000;
        > input{
            flex:1 1 auto;
        }
        >.contentInfo{
            flex:5 1 auto;
            display:flex;
            justify-content: space-evenly;
        }
    }
`
const ContentCheck = styled.div`
    display:flex;
    justify-content: space-between;
    >button{
        height:2vw;
        min-height:25px;
        width:8vw;
        min-width:80px;
        border:2px solid black;
        border-radius:20px;
        word-break:keep-all;
    }
`

function Mypage(){
    return(
        <MypageWrap>
            <MypageContent>
                <UserContent>
                    <p>작성하신 글은 0개 이며, 최대 추천수는 0개 입니다</p>
                    <select>
                        <option>추천수 순</option>
                        <option>작성 날짜 순</option>
                    </select>
                </UserContent>

                <ContentList>
                    <li className="content">
                        <input type="checkbox" />
                        <div className="contentInfo">
                            <p>단어</p>
                            <p>단어 뜻</p>
                            <p>추천 수</p>
                        </div>
                    </li>
                    <li className="content">
                        <input type="checkbox" />
                        <div className="contentInfo">
                            <p>단어</p>
                            <p>단어 뜻</p>
                            <p>추천 수</p>
                        </div>
                    </li>
                    <li className="content">
                        <input type="checkbox" />
                        <div className="contentInfo">
                            <p>단어</p>
                            <p>단어 뜻</p>
                            <p>추천 수</p>
                        </div>
                    </li>
                    <li className="content">
                        <input type="checkbox" />
                        <div className="contentInfo">
                            <p>단어</p>
                            <p>단어 뜻</p>
                            <p>추천 수</p>
                        </div>
                    </li>
                    <li className="content">
                        <input type="checkbox" />
                        <div className="contentInfo">
                            <p>단어</p>
                            <p>단어 뜻</p>
                            <p>추천 수</p>
                        </div>
                    </li>
                    <li className="content">
                        <input type="checkbox" />
                        <div className="contentInfo">
                            <p>단어</p>
                            <p>단어 뜻</p>
                            <p>추천 수</p>
                        </div>
                    </li>
                    <li className="content">
                        <input type="checkbox" />
                        <div className="contentInfo">
                            <p>단어</p>
                            <p>단어 뜻</p>
                            <p>추천 수</p>
                        </div>
                    </li>
                    <li className="content">
                        <input type="checkbox" />
                        <div className="contentInfo">
                            <p>단어</p>
                            <p>단어 뜻</p>
                            <p>추천 수</p>
                        </div>
                    </li>
                    <li className="content">
                        <input type="checkbox" />
                        <div className="contentInfo">
                            <p>단어</p>
                            <p>단어 뜻</p>
                            <p>추천 수</p>
                        </div>
                    </li>
                    
                </ContentList>

                <ContentCheck>
                    <button id="allCheck">전체 선택</button>
                    <button id="delete">삭제</button>
                </ContentCheck>
            </MypageContent>
        </MypageWrap>
    )
}
/*
<div>
    <div id="userContent">
        <p>작성한 글은 ~~개 이며, 최대 추천수는 ~개 입니다</p>
        <select>
            <option></option>
            <option></option>
        </select>
    </div>
    <ul id="contentList">
        <li class="content">
            <input type="checkbox">
            <p>단어</p>
            <p>단어 뜻</p>
            <p>추천 수</p>
        </li>
        ...
    </ul>
    <div id="contentCheck">
        <button id="allCheck">전체 선택</button>
        <button id="delete">삭제</button>
    </div>
</div>


*/
export default Mypage