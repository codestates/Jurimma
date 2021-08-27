import React from "react";
import styled from "styled-components";
import empty from "../empty.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'

function SearchMore({data}){
    let result = data.sort((a,b)=>a.thumbsup-b.thumbsup).reverse()
    // let result = []
    const ResultName = styled.h2`
    text-align:center;
    font-size:1.5em;
    margin-bottom:5vw;
    `
    const ResultList = styled.ul`
        margin-top:20px;
        width:75%;
        margin: 0 auto;
        display:flex;
        flex-direction:column;
        li{
            display:flex;
            height:8vh;
            margin-top:2vh;
            border:2px solid #000;
            border-radius:40px;
            text-align:center;
            line-height:8vh;
            background-color:#ffff8d;
            p{
                flex:1 1 auto
            }
            p:nth-child(2){
                flex: 3 1 auto
            }
        }
        li:nth-child(1){
            margin-top:0px;
        }
    `
    const EmptyResult = styled.div`
        text-align:center;
        > img{
            width:20vh;
            height:20vh;
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
            <>
                <ResultName>"{result[0].wordName}"의 검색 결과 입니다.</ResultName>
                <ResultList>
                    {result.map((ele,idx)=>{
                        return (
                            <li key={idx}>
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
            </>
        }
        </>
    )
}

export default SearchMore;