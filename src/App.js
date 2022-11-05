import './App.css';
import Layout from './Components/Layout/Layout';
import SignUp from './Components/Forms/SignUp';
import Login from './Components/Forms/Login';
import { Switch, Route, Redirect } from "react-router-dom";
import Home from './Components/Home/Home';
import Inbox from './Components/Inbox/Inbox';
import Sent from './Components/Sent';
import MailPage from './Components/MailPage/MailPage';


function App() {
  const isToken = localStorage.getItem("Token");
  return (
    <Layout>
      <Switch>
        <Route path="/" exact>
          <Redirect to="/home" />
        </Route>
        {isToken === null && <Route path="/signup" exact><SignUp /></Route>}
        {isToken === null && <Route path="/login" exact><Login /></Route>}
        {isToken !== null && <Route path="/home" exact><Home /></Route>}
        {isToken !== null && <Route path="/inbox" exact><Inbox /></Route>}
        {isToken !== null && <Route path="/inbox/:id" exact><MailPage isSentBoxMail={false} /></Route>}
        {isToken !== null && <Route path="/sent" exact><Sent /></Route>}
        {isToken !== null && <Route path="/sent/:id" exact><MailPage isSentBoxMail={true} /></Route>}
        {<Route path="*">
          <Redirect to="/login" />
        </Route>}
      </Switch>
    </Layout>    
  );
}

export default App;
