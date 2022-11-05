import Header from './Header';
import Footer from './Footer';
import "./Layout.css";
function Layout(props) {

  return (
    <div className="layout"> 
        <Header />
        <main> 
            {props.children}
        </main> 
        <Footer /> 
    </div>
    )
  }

export default Layout