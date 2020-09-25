import React from 'react';
import Article from '../components/Article';
import { db } from '../connectDB';
import ScrollToTopOnMount from '../components/ScrollToTopOnMount';

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: true,
      category: '',
      keyword: '',
      results: [],
      radio: '',
      page: 1,
      oldStartDoc: null,
      oldEndDoc: null,
      scrollPoint: React.createRef(),
    };

    // 一番初めは全件表示
    db.collection('novels')
      .limit(10)
      .get()
      .then((querySnapshot) => {
        // ページハンドリング用にセット
        this.setState({
          oldStartDoc: querySnapshot.docs[0],
          oldEndDoc: querySnapshot.docs[9],
        });
        querySnapshot.forEach((doc) => {
          this.state.results.push(
            <Article
              key={doc.id}
              title={doc.data().title}
              category={doc.data().category}
              author={doc.data().name}
              abstract={doc.data().overview}
              id={doc.id}
            />
          );
          this.setState({ results: this.state.results });
        });
      });
    this.radioDeselection = this.radioDeselection.bind(this);
    this.handlePaging = this.handlePaging.bind(this);
    this.handlePagingUp = this.handlePagingUp.bind(this);
    this.handlePagingDown = this.handlePagingDown.bind(this);
  }

  // カテゴリー欄の値をstateに保存
  category_handleChange(event) {
    this.setState({ category: event.target.value });
  }

  // キーワード欄の値をstateに保存
  keyword_handleChange(event) {
    this.setState({ keyword: event.target.value });
  }

  // 検索
  handleSearch(event) {
    event.preventDefault();

    // いったん検索結果を空にする
    this.setState({ results: [] });

    // 指定された条件に沿ってクエリ設定
    var novelRef;
    if (
      this.state.category != '' &&
      this.state.keyword != '' &&
      this.state.radio != ''
    ) {
      // キーワードとカテゴリーと検索範囲が指定されている
      novelRef = db
        .collection('novels')
        .where('category', '==', this.state.category)
        .where(this.state.radio, '==', this.state.keyword);
    } else if (this.state.category != '') {
      // カテゴリーだけが指定されている
      novelRef = db
        .collection('novels')
        .where('category', '==', this.state.category);
    } else if (this.state.keyword != '' && this.state.radio != '') {
      novelRef = db
        .collection('novels')
        .where(this.state.radio, '==', this.state.keyword);
    }

    // 検索して、結果をresultsに保存
    const snapshots = novelRef.get();
    snapshots.then((querySnapshot) => {
      // ページハンドリング用にセット
      this.setState({
        oldStartDoc: querySnapshot.docs[0],
        oldEndDoc: querySnapshot.docs[9],
        page: 1,
      });
      querySnapshot.forEach((doc) => {
        this.state.results.push(
          <Article
            key={doc.id}
            title={doc.data().title}
            category={doc.data().category}
            author={doc.data().name}
            abstract={doc.data().overview}
            id={doc.id}
          />
        );
        this.setState({ results: this.state.results });
      });
      if (this.state.results.length == 0) {
        this.state.results.push(<p key="test">検索結果はありません</p>);
        this.setState({ results: this.state.results });
      }
    });
  }

  // 前に戻る用のハンドラ
  handlePagingDown(event) {
    event.preventDefault();
    this.handlePaging(false);
  }

  // 次に進む用のハンドラ
  handlePagingUp(event) {
    event.preventDefault();
    this.handlePaging(true);
  }

  //ページング用のハンドラ
  handlePaging(isUp) {
    // ページが１なら前には戻れない
    if (
      (this.state.page == 1 && !isUp) ||
      (isUp && typeof this.state.oldEndDoc === 'undefined')
    ) {
      alert('これ以上検索結果はありません');
      return;
    }

    // 指定された条件に沿ってクエリ設定
    var novelRef;
    if (
      this.state.category != '' &&
      this.state.keyword != '' &&
      this.state.radio != ''
    ) {
      // キーワードとカテゴリーと検索範囲が指定されている
      novelRef = db
        .collection('novels')
        .where('category', '==', this.state.category)
        .where(this.state.radio, '==', this.state.keyword);
    } else if (this.state.category != '') {
      // カテゴリーだけが指定されている
      novelRef = db
        .collection('novels')
        .where('category', '==', this.state.category);
    } else if (this.state.keyword != '' && this.state.radio != '') {
      // キーワードだけが指定されている
      novelRef = db
        .collection('novels')
        .where(this.state.radio, '==', this.state.keyword);
    } else {
      // 何も指定されていない
      novelRef = db.collection('novels');
    }

    // どの１０件を取るかを決める
    var snapshots;
    if (isUp) {
      snapshots = novelRef.limit(10).startAfter(this.state.oldEndDoc).get();
    } else {
      snapshots = novelRef.limit(10).endBefore(this.state.oldStartDoc).get();
    }

    // 検索して、結果をresultsに保存
    snapshots.then((querySnapshot) => {
      if (querySnapshot.empty) {
        // ページング後の検索結果なし
        alert('これ以上検索結果はありません');
      } else {
        // ページング後の検索結果あり
        // 次のページング用のドキュメント
        this.setState({
          oldStartDoc: querySnapshot.docs[0],
          oldEndDoc: querySnapshot.docs[9],
        });
        // ページ番号更新
        if (isUp) {
          this.setState({ page: this.state.page + 1 });
        } else {
          this.setState({ page: this.state.page - 1 });
        }
        // 古い検索結果をresultsから消して新しいものをセット
        // 必ず新しい値をセットする前に削除する
        function deleteResult(t) {
          return new Promise((resolve, reject) => {
            t.setState({ results: [] });
            resolve(t);
          });
        }
        deleteResult(this).then(function (passedThis) {
          querySnapshot.forEach((doc) => {
            passedThis.state.results.push(
              <Article
                key={doc.id}
                title={doc.data().title}
                category={doc.data().category}
                author={doc.data().name}
                abstract={doc.data().overview}
                id={doc.id}
              />
            );
            passedThis.setState({
              results: passedThis.state.results,
            });
            // 検索の上の方へ戻る
            passedThis.state.scrollPoint.current.scrollIntoView({
              behavior: 'smooth',
            });
          });
        });
      }
    });
  }

  radioDeselection(e) {
    this.setState({ radio: '', category: '', keyword: '' });
    for (const element of document.getElementsByName('radio')) {
      element.checked = false;
    }
  }

  render() {
    return (
      <div>
        <ScrollToTopOnMount />
        <h1>小説を探す</h1>
        <form onSubmit={this.handleSearch.bind(this)} class="search_container">
          <div class="search-condition cat-select">
            <div class="search-condition-title">カテゴリ検索</div>
            <div class="cp_ipselect cp_sl01">
              <select
                value={this.state.category}
                onChange={this.category_handleChange.bind(this)}
              >
                <option value="">指定なし</option>
                <option value="SF">SF</option>
                <option value="ホラー">ホラー</option>
                <option value="サスペンス">サスペンス</option>
                <option value="童話">童話</option>
                <option value="ファンタジー">ファンタジー</option>
                <option value="comedy">comedy</option>
                <option value="学園物語">学園物語</option>
                <option value="ミステリー">ミステリー</option>
                <option value="エッセイ">エッセイ</option>
              </select>
            </div>
          </div>
          <div class="search-condition keyword-input">
            <div class="search-condition-title">キーワード検索</div>
            <div class="radio-container">
              <div class="radio-contents">
                <input
                  id="radio-1"
                  name="radio"
                  type="radio"
                  checked={this.state.radio == 'title'}
                  onChange={() => this.setState({ radio: 'title' })}
                />
                <label for="radio-1" class="radio-label">
                  タイトルから{' '}
                </label>
              </div>
              <div class="radio-contents">
                <input
                  id="radio-2"
                  name="radio"
                  type="radio"
                  checked={this.state.radio == 'name'}
                  onChange={() => this.setState({ radio: 'name' })}
                />
                <label for="radio-2" class="radio-label">
                  著者から{' '}
                </label>
              </div>
              <div class="radio-contents">
                <input
                  id="radio-3"
                  name="radio"
                  type="radio"
                  checked={this.state.radio == 'overview'}
                  onChange={() => this.setState({ radio: 'overview' })}
                />
                <label for="radio-3" class="radio-label">
                  概要から{' '}
                </label>
              </div>
            </div>
            <input
              type="text"
              size="25"
              placeholder="　キーワード検索"
              value={this.state.keyword}
              onChange={this.keyword_handleChange.bind(this)}
            />
          </div>
          <div class="button_wrapper">
            <button type="submit" value="検索" id="search-button">
              検索
            </button>
            <button
              value="クリア"
              onClick={this.radioDeselection}
              id="search-clear"
            >
              検索条件をクリア
            </button>
          </div>
        </form>
        <div class="scroll-point" ref={this.state.scrollPoint} />
        <div class="search-page contents-list search">
          <h1>検索結果</h1>
          <div class="box-list-yaxis">{this.state.results}</div>
          <div class="paging">
            <button
              class="paging-button before"
              onClick={this.handlePagingDown}
            >
              前へ
            </button>
            {this.state.page}
            <button class="paging-button after" onClick={this.handlePagingUp}>
              次へ
            </button>
          </div>
        </div>
      </div>
    );
  }
}
