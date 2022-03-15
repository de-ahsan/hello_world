# About

```js
import resourceBuilder from './resource_builder'
import defaultResourceSchema from './default_resource_schema'

const tasksResource = resourceBuilder.build('/tasks', {
  ...defaultResourceSchema,
})

export default tasksResource
```
