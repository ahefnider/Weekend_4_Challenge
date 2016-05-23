var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = 'postgres://localhost:5432/mu';

router.post('/', function (req, res) {

  var list = req.body;

  pg.connect(connectionString, function (err, client, done) {
    if (err) {
      res.sendStatus(500);
    }

    client.query('INSERT INTO todolist (todo, completed) ' +
                  'VALUES ($1, $2)',
                   [list.listItem, list.completed],
                 function (err, result) {
                   done();

                   if (err) {
                     res.sendStatus(500);
                     return;
                   }

                   res.sendStatus(201);
                 });
  });
});

router.get('/', function (req, res) {
  pg.connect(connectionString, function (err, client, done) {
    if (err) {
      res.sendStatus(500);
    }

    client.query('SELECT * FROM todolist', function (err, result) {
      done();

      console.log(result.rows);

      res.send(result.rows);
    });
  });
});

router.delete('/:id', function (req, res) {
  var id = req.params.id;
  pg.connect(connectionString, function (err, client, done) {
    if (err) {
      res.sendStatus(500);
    }

    client.query('DELETE FROM todolist WHERE taskid = $1',
                  [id], function (err, result) {
                      done();

                      if (err) {
                                      console.log(err);
                                      res.sendStatus(500);
                                      return;
                                    }

                                    res.sendStatus(200);
    });
  });
});

router.put('/:id', function (req, res) {
  var id = req.params.id;
  var list = req.body;
  console.log(req.body);

  pg.connect(connectionString, function (err, client, done) {
    if (err) {
      res.sendStatus(500);
    }

    client.query('UPDATE todolist ' +
                  'SET completed = $1 ' +
                  'WHERE taskid = $2',
                   [list.completed, id],
                 function (err, result) {
                   done();

                   if (err) {
                     res.sendStatus(500);
                     return;
                   }

                   res.sendStatus(200);
                 });
  });
});

module.exports = router;
