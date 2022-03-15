import React from 'react'
import { Formik, Form } from 'formik'
import * as yup from 'yup'
import sessionsResource from '../../../resources/sessions'
import * as routes from '../../../constants/routes'

const validationSchema = yup.object().shape({
  email: yup.string().email('Email is invalid').required('Email is required'),
})

const ForgotPassword = ({ history, match }) => (
  <Formik
    initialValues={{
      email: '',
    }}
    validationSchema={validationSchema}
    onSubmit={async (values, { setSubmitting, setFieldError }) => {
      try {
        await sessionsResource.forgotPassword(values.email)
        history.push(routes.SIGN_IN)
      } catch (error) {
        if(error.response && error.response.data && error.response.data.error) {
          setFieldError('general', error.response.data.error)
        } else {
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
        data-testid="forgot-password-form"
        >

        <div className="help" data-testid="error">
          {errors.general ? errors.general : ''}
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

        <div className="help">
          {touched.email && errors.email ? errors.email : ''}
        </div>

        <input
          type="submit"
          value="Send password"
          disabled={isSubmitting}
          style={{marginTop: '8px'}}
        />
      </Form>
    )}
  />
)


export default ForgotPassword
