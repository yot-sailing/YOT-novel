import React from 'react';
import { withRouter } from 'react-router-dom';

class ReviewComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { review, key } = this.props;
    return (
      <div class="list-review">
        <button>god </button>
        <div>{review}</div>
        <div>{key}</div>
      </div>
    );
  }
}
export default withRouter(ReviewComponent);
