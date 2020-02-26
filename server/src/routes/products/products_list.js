const { checkAuth } = require('../../lib/index')

module.exports = (app, client) => {
  app.get(
    '/products_list',
    checkAuth(),
    function (req, res) {
      client.query(`SELECT 
            t."ид7" AS "товар_ид", 
            t."Наименование" AS "товар_наименование", 
            t."Артикул" AS "артикул", 
            t."Характеристика" AS "размер", 
            e."ид7" AS "единица_ид", 
            e."Наименование" AS "единица_наименование"
          FROM 
            db."Товары" t, 
            db."ЕдиницыТМЦ" e
          WHERE 
            t."БазоваяЕд" = e."ид7" AND
            t."Владелец" = '${req.user.customer_id}' AND 
            NOT t._del
          ORDER BY t."Наименование", t."ид7"
            ;`)
        .then(result => {
          res.json(result)
        })
        .catch(e => console.error(e.stack))
    }
  )
}
