import React from 'react';

export default class extends React.Component{
    render(){
        return (
            <div className="container">
                <h3 className="text-center my-5">Page not found.</h3>
                <div className="text-center"><Link to="/">トップページへ</Link></div>
            </div>
        );
    }
}