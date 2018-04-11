const success = (res, status) => (entity) => {
    if (entity) {
      res.status(status || 200).json(entity)
    }
    return null
  }
  
const notFound = (res) => (entity) => {
    if (entity) {
      return entity
    }
    res.status(404).end()
    return null
  }
  const badRequest = (res) => (entity) => {
    if (entity) {
      return entity
    }
    res.status(400).end()
    return null
  }
  module.exports = {
  success,
  notFound,
  badRequest
  };