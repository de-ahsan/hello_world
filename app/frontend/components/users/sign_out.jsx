import React, { useContext } from 'react'
import { SessionContext } from 'contexts/session_context'
import sessionsResource from 'resources/sessions'

const SignOutButton = ({ history }) => {
  const sessionContext = useContext(SessionContext)

  const signOut = async () => {
    try {
      await sessionsResource.signOut()
    } catch(error) {
      console.warn("Sign out failed; clearing user in context anyway", error)
    }
    sessionContext.setUser(null)
  }
  return <button type="button" onClick={signOut}>Sign out</button>
}

export default SignOutButton
