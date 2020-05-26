import React from 'react';
import Article from '../components/Article';
import Writer from '../components/Writer';
import ScrollToTopOnMount from '../components/ScrollToTopOnMount';


export default class extends React.Component{
    render(){
        const favwriter = [
            "eri",
            "cyumomo"
        ].map((username, i) => <Writer key={i} username={username}/>);

        const Articles = [
            "投",
            "稿"
        ].map((title, i) => <Article key={i} title={title} author="chumomo" category="ラブストーリー"/>);
        
        return (
            <div class="container">
                <ScrollToTopOnMount />
                <h1>This is my page.</h1>
                <div class="left-side">
                    <h3>your favorite writers.</h3>
                    <div> {favwriter} </div>
                </div>
                <div class="right-side">
                    <h3 class="mypage-timeline">your novels</h3>
                    <div>{Articles}</div>
                </div>
            </div>
        );
    }
}