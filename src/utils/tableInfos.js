export const tableInfos = [
  // ---- PRODUITS ----
  {
    name: "ps_product",
    description: `
Table principale des produits.
Champs principaux :
- product_id (INT, PK)
- id_supplier (INT)
- id_manufacturer (INT)
- id_category_default (INT)
- price (DECIMAL)
- reference (VARCHAR)
- quantity (INT)
- active (TINYINT)
- date_add (DATETIME)
- date_upd (DATETIME)
Contient les informations globales du produit.
`
  },
  {
    name: "ps_product_lang",
    description: `
Traductions et textes liés aux produits.
Champs principaux :
- product_id (INT, FK vers ps_product)
- id_lang (INT)
- id_shop (INT)
- name (VARCHAR)
- description (TEXT)
- description_short (TEXT)
- link_rewrite (VARCHAR)
- meta_title (VARCHAR)
- meta_description (VARCHAR)
`
  },
  {
    name: "ps_product_shop",
    description: `
Table de liaison entre produit et boutique.
Champs principaux :
- product_id (INT)
- id_shop (INT)
- price (DECIMAL)
- active (TINYINT)
`
  },

  // ---- ATTRIBUTS PRODUITS (déclinaisons) ----
  {
    name: "ps_product_attribute",
    description: `
Table des déclinaisons de produits.
Champs principaux :
- product_attribute_id (INT, PK)
- product_id (INT, FK vers ps_product)
- reference (VARCHAR)
- price (DECIMAL)
- quantity (INT)
`
  },
  {
    name: "ps_product_attribute_combination",
    description: `
Lien entre déclinaison et attributs.
Champs principaux :
- product_attribute_id (INT)
- id_attribute (INT)
`
  },
  {
    name: "ps_attribute",
    description: `
Table des attributs (taille, couleur, etc.).
Champs principaux :
- id_attribute (INT, PK)
- id_attribute_group (INT)
- position (INT)
`
  },
  {
    name: "ps_attribute_lang",
    description: `
Traductions des attributs.
Champs principaux :
- id_attribute (INT)
- id_lang (INT)
- name (VARCHAR)
`
  },
  {
    name: "ps_attribute_group_lang",
    description: `
Traductions des groupes d'attributs (ex : Taille, Couleur).
Champs principaux :
- id_attribute_group (INT)
- id_lang (INT)
- name (VARCHAR)
`
  },

  // ---- COMMANDES ----
  {
    name: "ps_orders",
    description: `
Table principale des commandes.
Champs principaux :
- order_id (INT, PK)
- id_cart (INT)
- id_customer (INT)
- id_address_delivery (INT)
- id_address_invoice (INT)
- total_paid (DECIMAL)
- total_products (DECIMAL)
- payment (VARCHAR)
- date_add (DATETIME)
- current_state (INT)
`
  },
  {
    name: "ps_order_detail",
    description: `
Détails des produits dans chaque commande.
Champs principaux :
- order_detail_id (INT, PK)
- order_id (INT, FK vers ps_orders)
- product_id (INT, FK vers ps_product)
- product_attribute_id (INT)
- product_name (VARCHAR)
- product_quantity (INT)
- product_price (DECIMAL)
`
  },
  {
    name: "ps_customer",
    description: `
Table des clients.
Champs principaux :
- customer_id (INT, PK)
- firstname (VARCHAR)
- lastname (VARCHAR)
- email (VARCHAR)
- date_add (DATETIME)
`
  }
];
