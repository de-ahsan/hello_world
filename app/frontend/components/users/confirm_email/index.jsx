import React, { useState, useEffect } from 'react'
import axios from 'axios'
import usersResource from '../../../resources/users'

const ConfirmEmail = ({ match, history }) => {
  const token = match.params.token

  const [loading, setLoading] = useState(true)
  const [confirmed, setConfirmed] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const confirmEmail = async () => {
      try {
        await usersResource.confirmEmail(token)
        setConfirmed(true)
      } catch(error) {
        setError('Could not confirm email, perhaps the token has expired?')
      } finally {
        setLoading(false)
      }
    }
    confirmEmail()
  }, [])

  if (loading) {
    return (<div data-testid="loading">Loading</div>)
  }

  if (error) {
    return (
      <div data-testid="error">{error}</div>
    )
  }

  if (confirmed) {
    return (<div data-testid="confirmed">Your email was confirmed!</div>)
  }
}

export default ConfirmEmail
