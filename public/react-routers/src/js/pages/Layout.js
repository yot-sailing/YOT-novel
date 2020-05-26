import React from 'react';
import Footer from '../components/layout/Footer';
import Nav from '../components/layout/Nav';
import { Link , withRouter} from 'react-router-dom';

class Layout extends React.Component{
    // navigate() {
    //     console.log(this.props.history);
    //     this.props.history.push("/");
    // }
    render() {
        const { location } = this.props;
        const containterStyle = {
            marginTop : "150px"
        };
        console.log("layout");
        return (
            <div>
                <Nav location={ location } />
                <div class="container" style={containterStyle}>
                    <div class="row">
                        <div class="col-lg-12">
                            {this.props.children}
                        </div>
                    </div>
                    <p class="to-the-top">⬆️　to the top</p>
                    <Footer />
                </div>
            </div>
        );
    }
}
export default withRouter(Layout);
