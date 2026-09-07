const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());

// 连接你本地的数据库
const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',             // 你的数据库账号，默认通常是 root
    password: '339912', // ⚠️ 这里一定要改成你平时连数据库用的密码！
    database: 'japanese_mythology'
});

// 测试数据库能不能连通
db.connect(err => {
    if (err) {
        console.error('数据库连接失败:', err.message);
    } else {
        console.log('数据库连接成功！');
    }
});

// 提供给前端拿数据的接口
app.get('/api/mythology', (req, res) => {
    const sql = "SELECT id, title, content, category AS tags FROM japanese_mythology";
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
});

// 启动后端服务，监听 3000 端口
app.listen(3000, () => {
    console.log('后端服务已启动：http://localhost:3000/api/mythology');
});