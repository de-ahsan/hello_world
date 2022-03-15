import React, { createContext } from 'react'
import usersResource from 'resources/users'
import autoTypeCast from 'auto-type-cast'
import createAbility from 'utils/ability'
import { CachedUser } from 'utils/local_storage'

export const SessionContext = createContext()

export class SessionContextProvider extends React.Component {
  setUser = (user, additionalState = {}) => {
    //autoTypeCast is automatic with axios but this provides some safety for
    //locally-created or cached JSON representations of a User
    autoTypeCast(user)
    const ability = createAbility(user ? user.ability_rules : [])
    this.setState(
      Object.assign({ user, ability }, additionalState)
    )
    // sentry: add breadcrumb
    // track/untrack user in third party services
  }

  state = {
    // reasonable defaults before loading from server
    user: null,
    ability: createAbility(),
    loaded: false,
  }

  async componentDidMount() {
    if (!CachedUser.get()) {
      this.setState({ loaded: true })
      return
    }

    // intentionally do not use CachedUser, as we do not know if the user is still
    // logged in. If we wanted to prepopulate sign in details (e.g email address)
    // we could pull them off of CachedUser

    try {
      const result = await usersResource.showCurrent()
      let user = result.data
      this.setUser(result.data, { loaded: true })
    } catch(error) {
      if(error.response && error.response.status === 401) {
        // This error is expected; session expired
        CachedUser.clear()
      }
      if(process.env.RAILS_ENV === 'development') {
        console.warn('SessionContext failed to retrieve user', error)
      }
    }
  }

  render() {
    const value = {
      ...this.state,
      setUser: this.setUser,
    }

    return (
      <SessionContext.Provider value={value}>
        {this.props.children}
      </SessionContext.Provider>
    )
  }
}

export const SessionConsumer = SessionContext.Consumer
