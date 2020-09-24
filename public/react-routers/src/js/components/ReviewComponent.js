import React from 'react';
import { withRouter } from 'react-router-dom';

class ReviewComponent extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount(e) {
    console.log(this.props.review);
  }
  render() {
    console.log('render');
    const { review } = this.props.review;
    return (
      <div class="list-review">
        <button>god </button>
        <div>{review}</div>
      </div>
    );
  }
}
export default withRouter(ReviewComponent);
