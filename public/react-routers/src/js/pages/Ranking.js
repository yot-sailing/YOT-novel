import React from 'react';
import Article from '../components/Article';
import ScrollToTopOnMount from '../components/ScrollToTopOnMount';
import firebase, { db } from '../connectDB';

export default class extends React.Component{
  constructor(props) {
      super(props);
      this.state = {
          collapsed : true,
          rating: '',
          list: [],
      };

      const novelRef = db.collection("novels")
      .orderBy('rating', 'desc')
      .limit(10);
      const snapshots = novelRef.get();
      snapshots.then(querySnapshot => {
          querySnapshot.forEach(doc => {
              // doc.data() is never undefined for query doc snapshots
              console.log(doc.id, " => ", doc.data());
              this.state.list.push(
                  <Article key={doc.id} title={doc.data().title} 
                            category={doc.data().category} author={doc.data().name} 
                            abstract={doc.data().overview} />
              );
              this.setState({list: this.state.list});
          });
      });
  }
    render(){
        return (
          <div class="ranking-page contents-list ranking">
            <ScrollToTopOnMount />
            <h1>本日のランキング</h1>
            <div class="box-list-yaxis">{this.state.list}</div>
          </div>
        );
    }
}