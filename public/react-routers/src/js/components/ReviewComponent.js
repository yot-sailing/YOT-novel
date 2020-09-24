import React from 'react';
import { withRouter } from 'react-router-dom';

class ReviewComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { review } = this.props;
    const { key } = this.props;
    return (
      <div class="list-review">
        <div>{review}</div>
        <button>god </button>
      </div>
    );
  }
}
export default withRouter(ReviewComponent);
