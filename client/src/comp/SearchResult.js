import React from "react";
import styled from "styled-components";
import empty from "../empty.png"

function SearchResult({data}){
    // let result = data.sort((a,b)=>a.thumbsup-b.thumbsup).reverse().slice(0,3)
    let result = []
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
    return(
        <>
        {result.length===0? 
            <EmptyResult>
                <img src={empty} alt="empty"/>
                <p>검색 결과가 없습니다.</p>
            </EmptyResult>
            :
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
        }
        </>
    )
}

export default SearchResult;