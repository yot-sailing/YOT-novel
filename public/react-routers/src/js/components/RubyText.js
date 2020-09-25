import React from 'react';
import { withRouter } from 'react-router-dom';

class RubyText extends React.Component {
  constructor(props) {
    super(props);
    this.getRubyText = this.getRubyText.bind(this);
  }

  getRubyText(plainText) {
    // |で分割
    var splitted = plainText.split('|');
    // index
    var i = 0;
    var converted = Array();
    // 3つずつまとめて処理（普通部分、ルビ振りたいもの、ルビ）
    while (i < splitted.length - 2) {
      converted.push(splitted[i]);
      converted.push(
        <ruby>
          <rb>{splitted[i + 1]}</rb>
          <rp>(</rp>
          <rt>{splitted[i + 2]}</rt>
          <rp>)</rp>
        </ruby>
      );
      i += 3;
    }
    // 最後までうまく入れられてなかったとき
    while (i < splitted.length) {
      converted.push(splitted[i]);
      i += 1;
    }

    // 返す形にする
    var returnitem = (
      <div>
        {converted.map((part) => {
          return part;
        })}
      </div>
    );
    return returnitem;
  }

  render() {
    const { plainText } = this.props;
    return <div class="novel-text">{this.getRubyText(plainText)}</div>;
  }
}
export default withRouter(RubyText);
