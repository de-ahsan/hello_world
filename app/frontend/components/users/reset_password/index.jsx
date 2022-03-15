import React from 'react'
import { Formik, Form } from 'formik'
import * as yup from 'yup'
import sessionsResource from '../../../resources/sessions'
import * as routes from '../../../constants/routes'

const validationSchema = yup.object().shape({
  resetPasswordToken: yup.string().required('Token is required'),
  password: yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
  passwordConfirmation: yup.string().oneOf([yup.ref('password')], 'Passwords do not match').required('Password Confirmation is required'),
})

const ResetPassword = ({ match, history }) => (
  <Formik
    initialValues={{
      password: '',
      passwordConfirmation: '',
      resetPasswordToken: match.params.reset_password_token,
    }}
    validationSchema={validationSchema}
    onSubmit={async (values, { setSubmitting, setFieldError }) => {
      try {
        const result = await sessionsResource.resetPassword(
          values.password,
          values.passwordConfirmation,
          values.resetPasswordToken,
        )

        history.push(routes.SIGN_IN)
      } catch (error) {
        if(error.response && error.response.data.errors && error.response.data.errors.reset_password_token) {
          setFieldError('general', error.response.data.errors.reset_password_token[0])
        }
        else {
          throw error
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
          name="resetPasswordToken"
          type="hidden"
          data-testid="resetPasswordToken"
          value={values.resetPasswordToken}
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

        <div className="help">
          {touched.password && errors.password ? errors.password : ''}
        </div>

        <input
          name="passwordConfirmation"
          type="password"
          data-testid="passwordConfirmation"
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
          value="Update password"
          disabled={isSubmitting}
          style={{marginTop: '8px'}}
        />
      </Form>
    )}
  />
)

export default ResetPassword
