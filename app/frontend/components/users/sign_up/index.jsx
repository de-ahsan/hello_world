import React, { useContext } from 'react'
import { SessionContext } from 'contexts/session_context'
import { Formik, Form } from 'formik'
import * as yup from 'yup'
import usersResource from '../../../resources/users'
import * as routes from '../../../constants/routes'

const validationSchema = yup.object().shape({
  email: yup.string().email('Email is invalid').required('Email is required'),
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  password: yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
  passwordConfirmation: yup.string().oneOf([yup.ref('password')], 'Passwords do not match').required('Password Confirmation is required'),
})

const SignUp = ({ history }) => {
  const sessionContext = useContext(SessionContext)

  return (
    <Formik
      initialValues={{
        email: '',
        firstName: '',
        lastName: '',
        password: '',
        passwordConfirmation: '',
      }}
      validationSchema={validationSchema}
      onSubmit={async (values, { setSubmitting, setFieldError }) => {
        try {
          const result = await usersResource.create({
            data: {
              user: {
                email: values.email,
                first_name: values.firstName,
                last_name: values.lastName,
                password: values.password,
                password_confirmation: values.passwordConfirmation
              }
            }
          })
          sessionContext.setUser(result.data)
          if(result?.data?.status === 'pending')
          {
            history.push(routes.WELCOME_PAGE)
          }
          else
          {
            history.push(routes.ROOT)
          }
        } catch (error) {
          if (error.response && error.response.data && error.response.data.error) {
            setFieldError('general', error.response.data.error)
          } else {
            console.error(error)
          }
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
          data-testid="form">

          <div className="help" data-testid="error">
            {errors.general ? errors.general : ''}
          </div>

          <input
            name="email"
            data-testid="email"
            type="text"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Email"
          />

          <div className="help">
            {touched.email && errors.email ? errors.email : ''}
          </div>

          <input
            name="firstName"
            type="text"
            data-testid="firstName"
            value={values.firstName}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="First name"
          />

          <div className="help">
            {touched.firstName && errors.firstName ? errors.firstName : ''}
          </div>

          <input
            name="lastName"
            data-testid="lastName"
            type="text"
            value={values.lastName}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Last name"
          />

          <div className="help">
            {touched.lastName && errors.lastName ? errors.lastName : ''}
          </div>

          <input
            name="password"
            data-testid="password"
            type="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Password"
          />

          <div className="help">
            {touched.password && errors.password ? errors.password : ''}
          </div>

          <input
            name="passwordConfirmation"
            data-testid="passwordConfirmation"
            type="password"
            value={values.passwordConfirmation}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Password Confirmation"
          />

          <div className="help">
            {touched.passwordConfirmation && errors.passwordConfirmation ? errors.passwordConfirmation : ''}
          </div>

          <input
            type="submit"
            value="Sign up"
            disabled={isSubmitting}
            style={{marginTop: '8px'}}
          />
        </Form>
      )}
    />
  )
}

export default SignUp
