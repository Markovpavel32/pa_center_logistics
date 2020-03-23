const { checkAuth } = require('../../lib/index')
const { paginate } = require('../../lib/paginate')

module.exports = (app, client) => {
  app.get(
    '/application_log/appointment',
    checkAuth(),
    function (req, res) {
      client.query(`SELECT 
        "ид7" id
        ,"НомерЗаявки" document_number
        ,"ДатаЗаявки" document_date
        ,(CASE
        WHEN "ДатаСдачи" = '0001-01-01'::date THEN null
        ELSE "ДатаСдачи"
        END ) scheduled_date
        ,(CASE
        WHEN "Выполнена" THEN 'Выполнена'
        WHEN "Статус"=-1 THEN 'Отменена'
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
          console.log(result)
          paginate(result, req, res)
        })
        .catch(e => console.error(e.stack))
    }
  )

  app.get(
    '/application_log/appointment/products',
    checkAuth(),
    function (req, res) {
      client.query(`SELECT 
        t."ид7" AS id, 
        t."Код" AS barcode, 
        t."Наименование" AS name, 
        t."Артикул" AS vendor_code, 
        t."Характеристика" AS size, 
        e."ид7" AS product_detail_id, 
        e."Наименование" AS product_detail_name, 
        p."КоличествоПоЗаявке" AS quantity, 
        p."Количество"
      FROM 
        db."тчПрием" p, 
        db."Товары" t, 
        db."ЕдиницыТМЦ" e
      WHERE 
        t."ид7" = p."ВидТМЦ" AND
        e."ид7" = p."Единица" AND
        p."Нст" != 0 AND 
        NOT p._del  AND 
        p."Владелец" = '${req.query.id}'
      ORDER BY
        p."Нст" ASC;`)
        .then(result => {
          console.log(result)
          res.json({ total: result.rows.length, result: result.rows })
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
