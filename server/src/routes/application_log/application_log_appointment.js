const { checkAuth } = require('../../lib/index')
const { paginate } = require('../../lib/paginate')

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
          WHEN "ДатаСдачи" = '0001-01-01'::date THEN null
          ELSE "ДатаСдачи"
          END ) плановая_дата
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
          paginate(result, req, res)
        })
        .catch(e => console.error(e.stack))
    }
  )

  app.post(
    '/application_log/appointment',
    checkAuth(),
    function (req, res) {
      const { document_date, scheduled_date, document_number, document_lines, is_return, note } = req.body
      const model = JSON.stringify({
        document_date,
        scheduled_date,
        document_number,
        document_lines,
        is_return,
        note,
        customer_id: req.user.customer_id
      })
      console.log(model)
      client.query(`SELECT site.reception_for_storage('${model}');`)
        .then(result => {
          res.json(result.rows)
        })
      .catch(e => console.error(e))
    }
  )
}
