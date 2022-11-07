import './App.css';
import Layout from './Components/Layout/Layout';
import SignUp from './Components/Forms/SignUp';
import Login from './Components/Forms/Login';
import ForgotPassword from './Components/Forms/ForgotPassword';
import { Switch, Route, Redirect } from "react-router-dom";
import Home from './Components/Home/Home';
import Inbox from './Components/Inbox/Inbox';
import Sent from './Components/Sent';
import MailPage from './Components/MailPage/MailPage';
import { useSelector } from "react-redux";



function App() {
  const isToken = localStorage.getItem("Token");
  const state = useSelector((state) => state);
  return (
    <Layout>
      <Switch>
        {state?.user?.isAuthenticated === false && (
          <Route path="/" exact>
            <Redirect to="/login" />
          </Route>
        )}
        {state?.user?.isAuthenticated === false && (
           <Route path="/signup" exact><SignUp /></Route>
        )}
        {state?.user?.isAuthenticated === false && (
           <Route path="/login" exact><Login /></Route>
        )}
        {state?.user?.isAuthenticated === false && (
              <Route exact path="/forgotpassword">
                <ForgotPassword />
              </Route>
        )}
        {state?.user?.isAuthenticated && (
            <Route path="/home" exact><Home /></Route>
        )}
        {state?.user?.isAuthenticated && (
                  <Route path="/" exact>
                  <Redirect to="/home" />
                </Route>
        )}
        {state?.user?.isAuthenticated && (
            <Route path="/inbox" exact><Inbox /></Route>
        )}
        {state?.user?.isAuthenticated && (
            <Route path="/inbox/:id" exact><MailPage isSentBoxMail={false} /></Route>
        )}
        {state?.user?.isAuthenticated && (
            <Route path="/sent" exact><Sent /></Route>
        )}
        {state?.user?.isAuthenticated && (
            <Route path="/sent/:id" exact><MailPage isSentBoxMail={true} /></Route>
        )}
       {state?.user?.isAuthenticated === false &&
        <Route path="*">
          <Redirect to="/login" />
        </Route>
        }
      </Switch>
    </Layout>    
  );
}

export default App;
