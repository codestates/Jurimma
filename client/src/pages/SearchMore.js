import React from "react";
import styled from "styled-components";
import empty from "../empty.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'

function SearchMore({data, setMoreClickModal}){
    let result = data.sort((a,b)=>a.thumbsup-b.thumbsup).reverse()
    // let result = []

    const EmptyResult = styled.div`
        text-align:center;
        > img{
            width:20vh;
            height:20vh;
        }
    `
    const Result = styled.div`
        display:flex;
        flex-direction:column;
    `
    const ResultName = styled.h2`
        text-align:center;
        font-size:1.5em;
        margin-bottom:2vw;
    `
    const Morebutton = styled.button`
        display:block;
        width:10vw;
        min-width:80px;
        height:5vh;
        background-color:#000;
        border:2px solid #000;
        border-radius:20px;
        margin:0 auto 2vw;
        font-size:max(12px, 0.8vw);
        color:#fff;
        transition: all 0.3s;
        cursor:pointer;
        :hover{
            background-color:#fff;
            color:#000;
        }
    `
    const ResultList = styled.ul`
        margin-top:20px;
        width:100%;
        margin: 0 auto;
        li{
            display:flex;
            width:75%;
            height:8vh;
            margin:2vh auto 0;
            border:2px solid #000;
            border-radius:40px;
            text-align:center;
            line-height:8vh;
            background-color:#d2f8e0;
            cursor:pointer;
            transition: all 0.3s;
            p{
                flex:1 1 auto;
                font-size: max(14px, 1vw);
            }
            p:nth-child(2){
                flex: 3 1 auto
            }
        }
        li:nth-child(1){
            margin-top:0px;
        }
        li:hover{
            background-color:#000;
            color:#fff;
        }
    `
    const MoveDir = styled.div`
        width:5vh;
        height:10vh;
        border: 1px solid #000;
        border-radius:30px;
        overflow:hidden;
        position:fixed;
        right:2vh;
        bottom:5vh;
        display:flex;
        flex-direction:column;
        background-color:#000;
        >.fit{
            flex: 1 1 auto;
            margin:0 auto;
            width:50%;
            background-color:#000;
            color:#fff;
            cursor:pointer;
        }
    `
    return(
        <>
        {result.length===0? 
            <EmptyResult>
                <img src={empty} alt="empty"/>
                <p>검색 결과가 없습니다.</p>
            </EmptyResult>
            :
            <Result>
                <ResultName>"{result[0].wordName}"의 검색 결과 입니다.</ResultName>
                <Morebutton>뜻 추가하기</Morebutton>
                <ResultList>
                    {result.map((ele,idx)=>{
                        return (
                            <li key={idx} onClick={()=>setMoreClickModal(true)}>
                                <p>{ele.wordName}</p>
                                <p>{ele.wordMean}</p>
                                <p>{ele.thumbsup}</p>
                            </li>
                        )
                    })}
                </ResultList>
                <MoveDir>
                    <FontAwesomeIcon icon={faChevronUp} className="fit" />
                    <FontAwesomeIcon icon={faChevronDown} className="fit" />
                </MoveDir>
            </Result>
        }
        </>
    )
}

export default SearchMore;