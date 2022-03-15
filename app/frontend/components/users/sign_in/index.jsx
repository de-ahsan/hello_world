import React, { useContext } from 'react'
import { SessionContext } from 'contexts/session_context'
import { Link } from 'react-router-dom'
import { Formik, Form } from 'formik'
import * as yup from 'yup'
import * as routes from '../../../constants/routes'
import sessionsResource from '../../../resources/sessions'
import { PathAfterSignIn } from '../../../utils/local_storage'

const validationSchema = yup.object().shape({
  email: yup.string().email('Email is invalid').required('Email is required'),
  password: yup.string().required('Password is required'),
})

const SignIn = ({ history }) => {
  const sessionContext = useContext(SessionContext)

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      validationSchema={validationSchema}
      onSubmit={async (values, { setSubmitting, setFieldError }) => {
        try {
          const result = await sessionsResource.signIn(values.email, values.password)
          sessionContext.setUser(result.data)
          const pathAfterSignIn = PathAfterSignIn.get()
          PathAfterSignIn.clear()
          history.push(pathAfterSignIn)
        } catch(error) {
          setFieldError('email', 'Invalid email or password.')
        } finally {
          setSubmitting(false)
        }

      }}
      render={({
        values,
        errors,
        touched,
        isSubmitting,
        handleBlur,
        handleChange,
        handleSubmit,
      }) => (
        <Form
          onSubmit={handleSubmit}
          style={{width: '250px'}}
          data-testid="form"
          >

          <div className="help" data-testid="error">
            {touched.email && errors.email ? errors.email : ''}
          </div>

          <input
            name="email"
            type="text"
            data-testid="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Email"
          />

          <input
            name="password"
            type="password"
            data-testid="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Password"
          />

          <p>
            <input
              type="submit"
              value="Sign in"
              disabled={isSubmitting}
            />
          </p>

          <p>
            <Link
              data-testid="forgot-password"
              to={routes.FORGOT_PASSWORD}>Forgot password</Link>
          </p>
        </Form>
      )}
    />
  )
}

export default SignIn
