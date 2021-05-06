import React from 'react'
import { BrowserRouter, Route, Switch, NavLink } from 'react-router-dom'
import Home from '../components/Home'
import AddExpensePage from '../components/Add'
import EditExpensePage from '../components/Edit'
import HelpPage from '../components/Help'
import NotFound from '../components/NotFound'
import Header from '../components/Header'

const AppRouter = () => (
    <BrowserRouter>
        <div>
            <Header />
            <Switch>
                <Route path="/" component={Home} exact={true} />
                <Route path="/add" component={AddExpensePage} />
                <Route path="/edit/:id" component={EditExpensePage} />
                <Route path="/help" component={HelpPage} />
                <Route component={NotFound} />
            </Switch>
        </div>
    </BrowserRouter>
)

export default AppRouter