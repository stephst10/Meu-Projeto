const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static('public'))

const frases = [
    "Eu vou aprender!",
    "Eu vou ser persistente!",
    "Eu amo JavaScript!",
    "Eu amo programar!"
];

app.use((req, res, next) => {
    console.log(`Requisição recebida: ${req.method} ${req.url}`);
    next();
});

let frasesAccessCount = 0;

app.get('/frases', (req, res) => {
    frasesAccessCount++;
    const randomIndex = Math.floor(Math.random() * frases.length);
    const randomFrases = frases[randomIndex];
    res.send({
        frases: randomFrases,
        access: `Esta rota foi acessada ${frasesAccessCount} vezes!`
    });
});

app.get('/Sobre', (req, res) => {
    res.send('Sobre mim');
});

app.get('/Contato', (req, res) => {
    res.send('Entre em contato!');
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});

app.post('/add', (req, res) => {
    const { novaFrase } = req.body;
    if(novaFrase) {
        frases.push(novaFrase);
        res.send({mensagem: "Frase adicionada com sucesso!", frases});
    } else {
        res.status(400).send({erro: "Por favor forneça uma frase para adicionar."})
    }
});

app.delete('/delete/:index', (req, res) => {
    const {index} = req.params;

    if(index >= 0 && index < frases.length) {
        const deletedFrase = frases.splice(index, 1);
        res.send({mensagem: "Frase deletada com sucesso!", frase: deletedFrase[0], frases})
    } else {
        res.status(404).send({erro: "Frase não encontrada!"})
    }
})

app.get('/Todas', (req, res) => {
    res.send({ frases })
})

app.put('/update/:index', (req, res) => {
    const { index } = req.params;
    const { novaFrase } = req.body;

    if (index >= 0 && index < frases.length) {
        if (novaFrase) {
            frases[index] = novaFrase;
            res.send({mensagem: "Frase atualizada com sucesso! ", frases: novaFrase, frases});
        } else {
            res.status(400).send({erro: "Por favor forneça uma nova frase para atualizar!"});
        }
    } else {
        res.status(400).send({erro: "Frase não encontrada!"});
    }
})