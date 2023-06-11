const express = require('express'); 
const app = express();

const hostname = '127.0.0.1';
const port = 3000;
const sqlite3 = require('sqlite3').verbose();
const DBPATH = 'curriculo.db';

app.use(express.json());


app.get('/Experiencia', (req, res) => {
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*'); 
    var db = new sqlite3.Database(DBPATH); // Abre o banco
    var sql = 'SELECT Empresa, Ano_de_entrada, Ano_de_saida, Cargo, Descricao_da_funcao FROM Experiencia';
    db.all(sql, [],  (err, rows ) => {
        if (err) {
            throw err;
        }
        res.json(rows);
    });
    db.close(); // Fecha o banco
});
    app.get('/Formacao', (req, res) => {
        res.statusCode = 200;
        res.setHeader('Access-Control-Allow-Origin', '*'); 
        var db = new sqlite3.Database(DBPATH); // Abre o banco
        var sql = 'SELECT Cursos, Ano_de_inicio,Ano_de_conclusao, Descricao FROM Formacao';
        db.all(sql, [],  (err, rows ) => {
            if (err) {
                throw err;
            }
            res.json(rows);
        });
        db.close(); // Fecha o banco
    });
        app.get('/Habilidade', (req, res) => {
            res.statusCode = 200;
            res.setHeader('Access-Control-Allow-Origin', '*'); 
            var db = new sqlite3.Database(DBPATH); // Abre o banco
            var sql = 'SELECT Habilidade, nvl_habilidade FROM Habilidades';
            db.all(sql, [],  (err, rows ) => {
                if (err) {
                    throw err;
                }
                res.json(rows);
            });
            db.close(); // Fecha o banco
        });
            app.get('/Informacoes_Pessoais', (req, res) => {
                res.statusCode = 200;
                res.setHeader('Access-Control-Allow-Origin', '*'); 
                var db = new sqlite3.Database(DBPATH); // Abre o banco
                var sql = 'SELECT Nome_completo, Cargo, Endereco, Telefone, Email, Descricao_profissional FROM Informacoes_Pessoais';
                db.all(sql, [],  (err, rows ) => {
                    if (err) {
                        throw err;
                    }
                    res.json(rows);
                });
                db.close(); // Fecha o banco
            });
                app.get('/Realizacoes_profissionais', (req, res) => {
                    res.statusCode = 200;
                    res.setHeader('Access-Control-Allow-Origin', '*'); 
                    var db = new sqlite3.Database(DBPATH); // Abre o banco
                     var sql = 'SELECT Realizacao, Ano_da_realizacao FROM Realizacoes_profissionias';
                    db.all(sql, [],  (err, rows ) => {
                        if (err) {
                            throw err;
                        }
                        res.json(rows);
                    });
                    db.close(); // Fecha o banco
                });


// Inicia o servidor
app.listen(port, hostname, () => {
	console.log('Servidor rodando em http://' + hostname + ':' + port);

})