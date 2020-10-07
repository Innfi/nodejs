import React from 'react';
import { HashRouter, Route } from 'react-router-dom';
import SignIn from './SignIn';
import SignUp from './SignUp';


function App() {
    return (
        <HashRouter>
            <div>
                <Route exact path="signin" component={SignIn} />
                <Route exact path="signup" component={SignUp} />
            </div>
        </HashRouter>
    );
}

export default App;