
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// 1. 初始化数据库连接池（含云端 SSL 配置）
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  ssl: {
    rejectUnauthorized: false
  }
});

// 2. 接口定义
app.get('/api/mythology', (req, res) => {
  const sql = "SELECT id, title, content, category AS tags FROM japanese_mythology";
  db.query(sql, (err, results) => {
    if (err) {
      console.error('数据库查询失败:', err);
      return res.status(500).json(err);
    }
    res.json(results);
  });
});

// 3. 启动端口监听
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`后端服务已启动，监听端口: ${PORT}`);
});
