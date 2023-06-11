const express = require('express'); 
const app = express();

const hostname = '127.0.0.1';
const port = 3000;
const sqlite3 = require('sqlite3').verbose();
const DBPATH = 'curriculo.db';

app.use(express.json());

// Endpoint para criar uma nova experiência
app.post('/Experiencia', (req, res) => {
    var db = new sqlite3.Database(DBPATH);
    var sql = `INSERT INTO Experiencia (Empresa, Ano_de_entrada, Ano_de_saida, Cargo, Descricao_da_funcao) VALUES ('Smartfit', 2010, 2014, 'Professor', 'Ensino de alunos em como realizar os exercícios adequadamente')`;
    db.run(sql, function(err) {
        if (err) {
            return console.error(err.message);
        }
        res.json({ Empresa: 'Smartfit' });
    });
    db.close();
});

// Endpoint para obter todas as experiências
app.get('/Experiencia', (req, res) => {
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*'); 
    var db = new sqlite3.Database(DBPATH);
    var sql = 'SELECT Empresa, Ano_de_entrada, Ano_de_saida, Cargo, Descricao_da_funcao FROM Experiencia';
    db.all(sql, [],  (err, rows ) => {
        if (err) {
            throw err;
        }
        res.json(rows);
    });
    db.close();
});

// Endpoint para obter uma única experiência
app.get('/Experiencia/:Empresa', (req, res) => {
    var db = new sqlite3.Database(DBPATH);
    var sql = 'SELECT Empresa, Ano_de_entrada, Ano_de_saida, Cargo, Descricao_da_funcao FROM Experiencia WHERE Empresa = ?';
    db.get(sql, req.params.Empresa, (err, row) => {
        if (err) {
            return console.error(err.message);
        }
        res.json(row);
    });
    db.close();
});

// Endpoint para atualizar uma experiência existente
app.put('/Experiencia/:Empresa', (req, res) => {
    var db = new sqlite3.Database(DBPATH);
    var sql = `UPDATE Experiencia SET Ano_de_entrada = ?, Ano_de_saida = ?, Cargo = ?, Descricao_da_funcao = ? WHERE Empresa = ?`;
    db.run(sql, [req.body.Ano_de_entrada, req.body.Ano_de_saida, req.body.Cargo, req.body.Descricao_da_funcao, req.params.Empresa], function(err) {
        if (err) {
            return console.error(err.message);
        }
        res.json({ rowsAffected: this.changes });
    });
    db.close();
});

// Endpoint para deletar uma experiência
app.delete('/Experiencia/:Empresa', (req, res) => {
    var db = new sqlite3.Database(DBPATH);
    var sql = `DELETE FROM Experiencia WHERE Empresa = ?`;
    db.run(sql, req.params.Empresa, function(err) {
        if (err) {
            return console.error(err.message);
        }
        res.json({ rowsAffected: this.changes });
    });
    db.close();
});

// Endpoint para obter experiência e formação para uma empresa específica
app.get('/ExperienciaFormacao/:Empresa', (req, res) => {
    var db = new sqlite3.Database(DBPATH);
    var sql = `SELECT E.Empresa, E.Ano_de_entrada, E.Ano_de_saida, E.Cargo, E.Descricao_da_funcao, F.Cursos, F.Ano_de_inicio, F.Ano_de_conclusao, F.Descricao 
               FROM Experiencia E 
               INNER JOIN Formacao F ON E.Empresa = F.Empresa 
               WHERE E.Empresa = ?`;
    db.get(sql, req.params.Empresa, (err, row) => {
        if (err) {
            return console.error(err.message);
        }
        res.json(row);
    });
    db.close();
});

// Inicia o servidor
app.listen(port, hostname, () => {
    console.log('Servidor rodando em http://' + hostname + ':' + port);
});
