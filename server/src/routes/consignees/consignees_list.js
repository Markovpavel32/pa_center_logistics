const { checkAuth } = require('../../lib/index')
const { paginate } = require('../../lib/paginate')

module.exports = (app, client) => {
  app.get(
    '/application_log/to_issue/consignees',
    checkAuth(),
    function (req, res) {
      console.log(req.query)
      client.query(`WITH p(customer_id, filter) AS (SELECT '${req.user.customer_id}'::char(9), '${req.query.name}'::text)
                    SELECT "ид7" as id, "Наименование" as name, "Адрес" as address
                    FROM db."Грузополучатели", p
                    WHERE "Владелец" = p.customer_id AND NOT _del
                    AND UPPER("Наименование") LIKE CONCAT('%', UPPER(p.filter), '%')
                    ORDER BY "Наименование";`)
        .then(result => {
          res.json({ total: result.rowCount, result: result.rows })
        })
        .catch(e => console.error(e.stack))
    }
  )
}