const { checkAuth } = require('../../lib/index')
const { paginate } = require('../../lib/paginate')

module.exports = (app, client) => {
  app.get(
    '/application_log/to_issue',
    checkAuth(),
    function (req, res) {
      client.query(`SELECT 
          "Выдачи"."ид7" ид
          ,"НомерЗаявки" номер_заявки
          ,"ДатаЗаявки" дата_заявки
          ,"Грузополучатели"."Наименование" грузополучатель
          ,(CASE
          WHEN "ДатаОтгрузки" = '0001-01-01'::date THEN null
          ELSE "ДатаОтгрузки"
          END ) плановая_дата
          FROM db."Выдачи"
          LEFT JOIN db."Грузополучатели" ON "Грузополучатели"."ид7" = "Грузополучатель"
          WHERE
          "Контрагент" = '${req.user.customer_id}'
          AND NOT "Выдачи"._del
          AND "ДатаДок" = '0001-01-01'::date 
          ORDER BY "ДатаЗаявки", "Выдачи"."ид7" 
          ;`)
        .then(result => {
          paginate(result, req, res)
        })
        .catch(e => console.error(e.stack))
    }
  )
}
