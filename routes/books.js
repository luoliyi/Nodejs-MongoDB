var express = require('express');
var router = express.Router();

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

router.get('/sel',function (req,res,next) {
    MongoClient.connect(url,{ useNewUrlParser: true },function (err,db) {
        if (!err) {
            var dbo = db.db("BookStore");
            dbo.collection("book"). find({}).toArray(function(err, result) { // 返回集合中所有数据
                res.send(result);
                db.close();
            });
        }
    })
});
router.post('/ind',function (req,res,next) {
    MongoClient.connect(url,{ useNewUrlParser: true },  function(err, db) {
        //要连接的数据库名
        var dbo = db.db("BookStore");
        //要连接的数据库的表名   对book表操作的方法
        dbo.collection("book").insertOne(req.body, function(err, res) {
            if (err) throw err;
            console.log("文档插入成功");
            db.close();
        });

    });
});

router.post('/del',function (req,res,next) {
    MongoClient.connect(url,{ useNewUrlParser: true },  function(err, db) {
        //要连接的数据库名
        var dbo = db.db("BookStore");
        //要连接的数据库的表名   对book表操作的方法
        var del={"id":req.body.id};
        dbo.collection("book").deleteMany(del, function(err, res) {
            if (err) throw err;
            console.log("文档删除成功");
            db.close();
        });
    });
});

router.post('/upe',function (req,res,next) {
    MongoClient.connect(url,{ useNewUrlParser: true },  function(err, db) {
        //要连接的数据库名
        var dbo = db.db("BookStore");
        //要连接的数据库的表名   对book表操作的方法
        var upe={"id":req.body.id};//查询条件
        dbo.collection("book").update(upe,req.body, function(err, res) {
            if (err) throw err;
            console.log("文档修改成功");
            db.close();
        });
    });
});

module.exports = router;