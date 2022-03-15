import { ResourceBuilder } from 'axios-rest-resource'
import configureAxios from '../utils/axios'

const resourceBuilder = new ResourceBuilder({
  baseURL: '/api/v1'
})

configureAxios(resourceBuilder.axiosInstance)

resourceBuilder.__build = resourceBuilder._build
resourceBuilder._build = (resourceUrl, schema) => {
  const resource = resourceBuilder.__build(resourceUrl, schema)
  Object.keys(schema).forEach((methodName) => {
    // If passed a "call" option, wrap the request function and call this function first.
    // "call" should return an axios requestConfig object, just like any call to axios.request
    // This is distinct from axios's transformRequest because it allows us to modify the
    // entire request as opposed to just the body
    // see sessionsResource for example
    const callFn = schema[methodName].call
    if(callFn) {
      const requestFn = resource[methodName]
      resource[methodName] = (...rest) => requestFn(callFn(...rest))
      delete schema[methodName].call
    }

    // If passed a "then" option, wrap the request function and append "then" to the
    // request promise. This is distinct from axios's transformResponse because it
    // keeps the default transformResponse (JSON parsing) and calls interceptors first.
    // see sessionsResource for example
    const thenFn = schema[methodName].then
    if(thenFn) {
      const requestFn = resource[methodName]
      resource[methodName] = (...rest) => requestFn(...rest).then(thenFn)
      delete schema[methodName].then
    }
  })
  return resource
}

export default resourceBuilder
