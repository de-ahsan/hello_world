export default class BaseModel {
  // allows axios-rest-resource to stringify models used in url formatting
  // e.g. if a resource specified the url: "/tasks/{task}", passing an instance
  // of Task whose id is "123-456" would hit the URL "/tasks/123-456".
  toString() {
    return this.id
  }
}
