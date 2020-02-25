const { checkAuth } = require('../../lib/index')

module.exports = (app, client) => {
  app.get(
    '/application_log/appointment',
    checkAuth(),
    function (req, res) {
      client.query(`SELECT 
          "ид7" doc_id
          ,"НомерЗаявки" app_number
          ,"ДатаЗаявки" app_date
          ,(CASE
          WHEN "Выполнена" THEN 'Выполнена'
          WHEN "Статус">=3 THEN 'Принимается'
          WHEN "Акцептована" THEN 'Акцептована'
          ELSE ''
          END ) status
          FROM db."Приемы"
          WHERE
          "Контрагент" = '${req.user.customer_id}'
          AND NOT _del
          AND "ДатаДок" = '0001-01-01'::date 
          ORDER BY "ДатаЗаявки", "ид7" 
          ;`)
        .then(result => {
          res.json(result.rows.slice(0, 19))
        })
        .catch(e => console.error(e.stack))
    }
  )
}
