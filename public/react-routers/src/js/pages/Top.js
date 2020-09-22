import React from 'react';
import Article from '../components/Article';
import News from '../components/News';
import ScrollToTopOnMount from '../components/ScrollToTopOnMount';
import firebase, { db } from '../connectDB';

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: true,
      rating: '',
      list: [],
      list2: [],
      list3: [],
    };

    const novelRef = db
      .collection('novels')
      .orderBy('rating', 'desc')
      .limit(10);
    const snapshots = novelRef.get();
    snapshots.then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, ' => ', doc.data());
        this.state.list.push(
          <Article
            key={doc.id}
            title={doc.data().title}
            rank={this.state.list.length + 1}
            category={doc.data().category}
            author={doc.data().name}
            abstract={doc.data().overview}
            id={doc.id}
          />
        );
        this.setState({ list: this.state.list });
      });
    });

    const novelRef2 = db
      .collection('novels')
      .orderBy('created', 'desc')
      .limit(10);
    const snapshots2 = novelRef2.get();
    snapshots2.then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, ' => ', doc.data());
        this.state.list2.push(
          <Article
            key={doc.id}
            title={doc.data().title}
            category={doc.data().category}
            author={doc.data().name}
            abstract={doc.data().overview}
            id={doc.id}
          />
        );
        this.setState({ list2: this.state.list2 });
      });
    });
    const dbNews = db.collection('news');
    dbNews.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const title = doc.data().title;
        this.state.list3.push(
          <News key={doc.id} title={doc.data().title} id={doc.id} />
        );
        console.log(doc.id, ' => ', doc.data());
        this.setState({ title: this.state.list3 });
      });
    });
  }

  render() {
    return (
      <div class="toppage-contents">
        <ScrollToTopOnMount />
        <div class="contents-list ranking">
          <h3>今日のランキング</h3>
          <div class="box-list-yaxis">{this.state.list}</div>
        </div>
        <div class="contents-list new-novel">
          <h3>新着小説</h3>
          <div class="box-list-yaxis">{this.state.list2}</div>
        </div>
        <div class="contents-list news">
          <h3>お知らせ</h3>
          <div class="box-list-yaxis">{this.state.list3}</div>
        </div>
      </div>
    );
  }
}
