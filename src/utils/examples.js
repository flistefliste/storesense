export const examples = [
  {
    input: "Liste commandes année 2018 avec total hors-taxes (HT), total ttc, client, mode de paiement​",
    query:
      "​SELECT o.id_order, o.id_customer, o.date_add, o.total_paid_tax_excl, o.total_paid_real, o.payment, c.firstname, c.lastname, c.email FROM ps_orders o LEFT JOIN ps_customer c ON o.id_customer = c.id_customer WHERE (o.current_state = 4 OR o.current_state = 5) AND YEAR(o.date_add) = 2018 ORDER BY o.date_add ASC;",
  },
  {
    input: "Export commandes 6 premiers mois 2019",
    query:
      "SELECT SQL_CALC_FOUND_ROWS a.`id_order`, `reference`, `total_paid_tax_incl`, `payment`, a.`date_add` AS `date_add` , a.id_order AS id_pdf, CONCAT(c.`firstname`, ' ', c.`lastname`) AS `customer`, c.`email` AS `email`, osl.`name` AS `status`, country_lang.name as country FROM `ps_orders` a LEFT JOIN `ps_customer` c ON (c.`id_customer` = a.`id_customer`) INNER JOIN `ps_address` address ON address.id_address = a.id_address_delivery INNER JOIN `ps_country` country ON address.id_country = country.id_country INNER JOIN `ps_country_lang` country_lang ON (country.`id_country` = country_lang.`id_country` AND country_lang.`id_lang` = 1) LEFT JOIN `ps_order_state` os ON (os.`id_order_state` = a.`current_state`) LEFT JOIN `ps_order_state_lang` osl ON (os.`id_order_state` = osl.`id_order_state` AND osl.`id_lang` = 1) LEFT JOIN `ps_shop` shop ON a.`id_shop` = shop.`id_shop` WHERE 1 AND os.`id_order_state` IN (2,4,5,9,27,28) AND a.`date_add` >= '2019-01-01 0:0:0' AND a.`date_add` <= '2019-06-30 23:59:59' AND a.id_shop IN (1) ORDER BY a.id_order ASC",
  },
  {
    input: "Nombre-commandes en reapprovisionnement (on backorder) par jour en 2020",
    query: "SELECT DATE_FORMAT(date_add, '%d-%m-%Y') as date, COUNT(id_order_history) as count FROM ps_order_history WHERE id_order_state = 9 AND YEAR(date_add) = 2020 GROUP BY DATE_FORMAT(date_add, '%Y%m%d')",
  },
 
];