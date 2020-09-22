import React from 'react';
import Footer from '../components/layout/Footer';
import Nav from '../components/layout/Nav';
import { withRouter } from 'react-router-dom';

class Layout extends React.Component {
  render() {
    const { location } = this.props;
    const containterStyle = {
      paddingTop: '100px',
      marginBottom: '8em',
    };

    return (
      <div>
        <div id="top-link"></div>
        <Nav location={location} />
        <div class="container" style={containterStyle}>
          <div class="row">
            <div class="col-lg-12">{this.props.children}</div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
export default withRouter(Layout);
