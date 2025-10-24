import { pool } from "../db/pool.js";

export const ingestPluginData = async (shopId, data) => {
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();

    for (const order of data.orders || []) {
      await conn.query(
        "INSERT INTO orders (id_order, id_shop, total_paid, date_add) VALUES (?, ?, ?, ?) ON DUPLICATE KEY UPDATE total_paid=?, date_add=?",
        [order.id, shopId, order.total, order.date, order.total, order.date]
      );
    }

    await conn.commit();
  } catch (err) {
    await conn.rollback();
    console.error("Error ingesting data:", err);
  } finally {
    conn.release();
  }
};
