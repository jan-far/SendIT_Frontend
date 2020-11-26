import React, { lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import Loading from '../Components/LoadingPage'

const LoadComponents = (name) => {
  return lazy(() => import(`./Components/${name}`))
}

const Homepage = LoadComponents('HomePage')
const SignInPage = LoadComponents('Signin')
const SignUpPage = LoadComponents('Signup')

const Pages = () => {
  return (
    <>
      <Switch>
        <Route exact path='/'>
          <Suspense fallback={<Loading />} >
            <Homepage />
          </Suspense>
        </Route>

        <Route exact path='/signin'>
          <Suspense fallback={<Loading />} >
            <SignInPage />
          </Suspense>
        </Route>

        <Route exact path='/signup'>
          <Suspense fallback={<Loading />} >
            <SignUpPage />
          </Suspense>
        </Route>
      </Switch>
    </>
  )
}

export default Pages
