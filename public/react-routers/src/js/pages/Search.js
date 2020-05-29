import React from 'react';

export default class extends React.Component{
    render(){
        // const type = (this.props.match.params.mode == "extra" ? "(for experts)": "");
        
        return (
            <div>
                <h1>Search</h1>
                <form class="search_container">
                    <input type="text" size="25" placeholder="　キーワード検索" />
                    <div class="radio-container">
                            <input id="radio-1" name="radio" type="radio" />
                            <label for="radio-1" class="radio-label">全てから </label>
                            <input id="radio-2" name="radio" type="radio" />
                            <label  for="radio-2" class="radio-label">タイトルから </label>
                            <input id="radio-3" name="radio" type="radio" />
                            <label  for="radio-3" class="radio-label">著者から </label>
                            <input id="radio-4" name="radio" type="radio" />
                            <label  for="radio-4" class="radio-label">概要から </label>
                            <input id="radio-5" name="radio" type="radio" />
                            <label  for="radio-5" class="radio-label">タグから </label>
                    </div>
                    <input type="submit" value="検索" />
                    <br />
                    <div  class="cp_ipselect cp_sl01">
                    <select required>
                        <option value="" hidden>カテゴリを選ぶ</option>
                        <option value="1">SF</option>
                        <option value="2">サスペンス</option>
                        <option value="3">animal</option>
                        <option value="4">comedy</option>
                    </select>
                    </div>
                </form>
            </div>
        );
    }
}