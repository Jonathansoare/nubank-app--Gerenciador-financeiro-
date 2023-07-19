const express = require("express");
const mysql = require("mysql2")
const cors = require('cors')  

const bcrypt = require('bcryptjs')  
const jwt = require('jsonwebtoken')

const { eAdmin } = require('./middlewares/auth')
const User = require('./models/User')
const Moviments = require('./models/Moviments');
const { Sequelize, json } = require("sequelize");

const app = express()
app.use(cors())
app.use(express.json())



app.post('/cadastrar', async (req,res) =>{
    let dados = req.body
    // $2a$08$/3UUbh2nUoC/JnTtJy4aBOX5rSenSIQrhy3sGiIXRyvXsWDKDHsQG
    dados.password = await bcrypt.hash(dados.password,8);

    await User.create(dados)
    .then(() => {
        return res.json({
            erro:false,
            messagem:"Usuario cadastrado com sucesso!",
        })
    })
    .catch(() => {
        return res.status(400).json({
            erro:true,
            messagem:"ERROR:Usuario já cadastrado!"
        })
    })
    return
});
app.post('/login', async (req, res) => {
    const user = await User.findOne({
        attributes:['id','name','email','password'],
        where:{
            email: req.body.email
        }
    });

    if(user === null){
        return res.status(400).json({
            erro:true,
            messagem:"Error: Usuario ou senha incorreta!"
        })
    }


    if(!(await bcrypt.compare(req.body.password,user.password))){
        return res.status(400).json({
            erro:true,
            messagem:"Error: Usuario ou senha incorreta!"
        })
    }

    const  token = jwt.sign({id:user.id},"T3J8K1C9A5N686DSCTQ97", {
        // expiresIn: 600 // 10 min
        // expiresIn: 60 // 1 min
        expiresIn: '7d' // 7 dias
    })

    const id = user.id

    return res.json({
        erro:false,
        messagem:"Login realizado com sucesso!",
        token,
        id
    })
});
app.get('/validationToken', eAdmin,async (req,res) => {
    await User.findAll({
        attributes:['id','name','email',],
        order:[['id','DESC']],
    }).then((users) =>{
        res.status(200)
        return res.json({
            erro:false,
            users,
            id_usuario_logado:req.userId
        })
    }).catch(() => {
        return res.json({
            erro:true,
            messagem:"Usuario nao encontrado!"
        })
    })
});
app.get('/getUser/:id', eAdmin,async (req,res) => {
    const id = req.params.id

    try {
        const user = await User.findOne({
            attributes: ['id', 'name', 'email'],
            where: {
              id: id
            }
          });
    
          if (user) {
            // O usuário foi encontrado
            res.status(200).json(user);
          } else {
            // O usuário não foi encontrado
            res.status(404).json({ error: 'Usuário não encontrado' });
          }
    } catch (error) {
        res.status(500).json({ error: 'Erro' });

    }
})
app.put('/uptade/user/:id', async (req,res) => {
    const { id } = req.params;
    const { nome, email} = req.body;
  
    try {
      const usuario = await User.findByPk(id);
      if (!usuario) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
      }
  
      usuario.name = nome
      usuario.email = email
      await usuario.save();
  
      console.log('Dados atualizados com sucesso!');
      res.json({ message: 'Dados atualizados com sucesso'});
    } catch (error) {
      console.error('Erro ao atualizar os dados:', error);
      res.status(500).json({ error: 'Erro ao atualizar os dados' });
    }
})
app.delete('/deleteUSer/:id', eAdmin, async (req,res) => {
    try {
        const id = req.params.id

        await User.destroy({
             where: {
                id:id
             } 
            })
        await Moviments.destroy({
             where: { id:id } 
            })

        res.status(200).json({messagem:'conta apagada com sucesso!'})
    } catch (error) {
        console.error(error)
        res.status(500).json({messagem: "Ocorreu um erro ao apagar a conta"})
    }
})


app.post('/cadastrarMoviments', async (req, res) => {
    let dados = req.body

    await Moviments.create(dados)
        .then(() => {
            return res.json({
                erro: false,
                messagem:"movimentação cadastrada com sucesso!"
        })
        })
        .catch((e) => {
            console.log("ERRO: " + e)
            return res.status(400).json({
                erro:true,
                messagem:"ERROR: Movimentação  nao cadastrada!"
            })
        })
        return
});
app.get('/getMoviments/:id', async (req,res) => {
    const id = req.params;
    await Moviments.findAll({
        attributes:["idUser","value","label","type","data","id"],
        where:{
            idUser:id.id
        }
    }).then((result) => {
        return res.json({
            erro:false,
            result
        })
    }).catch(() => {
        return res.json({
            erro:true,
            messagem:"Movimentação nao encotrada."
        })
    })
})
app.get('/getMoviments/:id/:type', async (req,res) =>{
    const id = req.params;
    const type = req.params

    await Moviments.findAll({
        attributes:["idUser","value","type","id"],
        where:{
            idUser:id.id,
            type:type.type
        }
    }).then((result) => {
        return res.json({
            erro:false,
            result
        })
    }).catch(() => {
        return res.json({
            erro:true,
            messagem:"Movimentação nao encotrada."
        })
    })
})
app.get('/getSumMoviments/:id', async (req,res) => {
    const idUser = req.params
    try {
        const result = await Moviments.findOne({
            attributes: [
              'idUser',
              [Sequelize.fn('SUM', Sequelize.literal('CASE WHEN type = 1 THEN value ELSE 0 END')), 'ganhos'],
              [Sequelize.fn('SUM', Sequelize.literal('CASE WHEN type = 0 THEN value ELSE 0 END')), 'despesas'],
            ],
            where: {
              idUser: idUser.id,
            },
          });
    
        return res.json({
            erro:false,
            result
        })
    } catch (error) {
        console.log("ERRO: "+error)
    }
})

app.listen(3001,'192.168.0.5', ()=>{console.log("Serve rodando na porta 3001.")})