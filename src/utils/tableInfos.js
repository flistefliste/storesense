export const tableInfos = [
  // GENERAL STUFF  
  {
    name: "ps_shop",
    description: `
Table des associations boutique avec langue.
Champs principaux :
- id_shop (INT, PK)
- name (VARCHAR)
`
  },
  {
    name: "ps_lang",
    description: `
Table des langues actives.
Champs principaux :
- id_lang (INT, PK)
- name (VARCHAR)
- iso_code (VARCHAR)
`
  },
  {
    name: "ps_lang_shop",
    description: `
Table des associations boutique avec langue.
Champs principaux :
- id_lang (INT, PK, FK vers ps_lang)
- id_shop (INT, PK, FK vers ps_shop)
`
  },
  // ---- PRODUITS ----
  {
    name: "ps_product",
    description: `
Table principale des produits.
Champs principaux :
- id_product (INT, PK)
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
- id_product (INT, FK vers ps_product)
- id_lang (INT, FK vers ps_lang)
- id_shop (INT, FK vers ps_shop)
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
- id_product (INT, FK vers ps_product)
- id_shop (INT, FK vers ps_shop)
- price (DECIMAL)
- active (TINYINT)
`
  },

  // ---- ATTRIBUTS PRODUITS (déclinaisons) ----
  {
    name: "ps_product_attribute",
    description: `
Table des déclinaisons (ou variations) de produits.
Champs principaux :
- id_product_attribute (INT, PK)
- id_product (INT, FK vers ps_product)
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
- id_product_attribute (INT)
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
- id_order (INT, PK)
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
- id_order_detail (INT, PK)
- id_order (INT, FK vers ps_orders)
- product_id (INT, FK vers ps_product)
- id_product_attribute (INT)
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
- id_customer (INT, PK)
- firstname (VARCHAR)
- lastname (VARCHAR)
- email (VARCHAR)
- date_add (DATETIME)
`
  },
  {
    name: "ps_stock_available",
    description: `
Table du stock des produits.
Champs principaux :
- id_stock_available (INT, PK)
- id_product (INT, FK vers ps_product)
- id_product_attribute (INT)
- id_shop (INT)
- quantity (INT)
- physical_quantity (INT)
- location (VARCHAR)
`
  },
  {
    name: "ps_order_state",
    description: `
Table des états de commande.
Champs principaux :
- id_order_state (INT, PK)
- invoice (TINYINT)
`
  },
  {
    name: "ps_order_state_lang",
    description: `
Traductions des états de commande.
Champs principaux :
- id_order_state (INT, PK, FK vers ps_order_state)
- id_lang (INT, PK, FK vers ps_lang)
- name (VARCHAR)
`
  },
];
