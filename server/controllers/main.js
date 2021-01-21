const azure = require('azure-storage')

function getEntities(req, res) {
  const tableService = azure.createTableService(process.env.STORAGE, process.env.KEY)

  if (tableService) {
    let data = []

    getAll(null, () => {
      res.json(data)
    })

    function getAll(token, callback) {
      const query = new azure.TableQuery()

      tableService.queryEntities('data', query, token, (error, result, response) => {
        if (response.statusCode === 200) {
          data.push(result.entries)

          if (result.continuationToken) {
            token = result.continuationToken

            getAll(token, callback)
          } else {
            callback()
          }
        } else {
          res.send(`Error when trying to retrieve table storage data: ${error.message}`)
        }
      })
    }
  }
}

module.exports = {
  getEntity,
  getEntities
}
