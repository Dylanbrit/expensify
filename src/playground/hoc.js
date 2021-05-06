import React from 'react'
import ReactDOM from 'react-dom'

// Higher Order Component (HOC) - a component that renders another component
// Using HOCs allows us to reuse code
// Render hijacking
// Prop manipulation
// Abstract state

const Info = (props) => (
    <div>
        <h1>Info</h1>
        <p>The info is : {props.info}</p>
    </div>
)

// It's a common practice to use WrappedComponent as the name for the function argument
// Inside the funciton is where we return a new component, and THIS is the HOC

const withAdminWarning = (WrappedComponent) => {
    return (props) => (
        <div>
            {props.isAdmin && <p>This is private information. Please do not share.</p>}
            <WrappedComponent {...props} />
        </div>
    )
}

const requireAuthentication = (WrappedComponent) => {
    return (props) => (
        <div>
            {props.isAuthenticated ? <WrappedComponent {...props} />: <p>You must be logged in to view this info</p>}
        </div>
    )
}

// withAdminWarning is going to be a regular function, and it gets called with the regular component that we want to wrap
// What we get back from withAdminWarning is an alternative version of the Info component

const AdminInfo = withAdminWarning(Info)
const AuthInfo = requireAuthentication(Info)

// ReactDOM.render(<AdminInfo isAdmin={true} info="These are the details" />, document.querySelector('#app'))
ReactDOM.render(<AuthInfo isAuthenticated={true} info="These are the details" />, document.querySelector('#app'))