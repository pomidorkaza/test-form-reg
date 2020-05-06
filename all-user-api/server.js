const express = require("express");
const bodyParser = require("body-parser");
const pretty = require("express-prettify");
const multer = require('multer');
const bcrypt = require('bcrypt');
const fs = require('fs');
const cors = require('cors');
const app = express();
require('dotenv').config();
const urlencodedParser = bodyParser.urlencoded({extended: false});


app.use(express.json());
app.use(express.static('public'));

app.set("view engine", "ejs");
app.use(cors());
app.use(urlencodedParser);
app.use(pretty({ query: 'pretty' }));

const Sequelize = require("sequelize");

const sequelize = new Sequelize(process.env.DB_NAME,


process.env.DB_USER_NAME, process.env.DB_USER_PASS, {
    dialect: process.env.DIALECT,
    host: process.env.HOST
});

 

const User = sequelize.define('all_user', {
      id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING,
        defaultValue: "",

    },
    age:{
        type:Sequelize.INTEGER,
   		defaultValue: null,
    },
    country:{
    	type: Sequelize.STRING,
    	defaultValue:"Lousiana"
    }
  
});

sequelize.sync()
    .then(result=>{
    console.log(result);
    })
    .catch(err=> console.log(err));


app.get('/all-users', async (req,res)=>{
	const allUsers = await User.findAll({row:true});
	if(allUsers){
		return res.json(allUsers);
	}
	return res.json({msg:"Не удалось найти пользователей"});
});


app.post('/update-user',async (req,res)=>{
	const user_fields = req.body;
	res.json(user_fields);
	let data = await User.update({ name: user_fields.name,
							age: user_fields.age,
							country: user_fields.country
	 }, {
		  where: {
		    id: user_fields.id
		  }
		});
	res.json(data)

})


app.post('/delete-user',async(req,res)=>{
	const user_id = req.body.user_id;
	let destroyed =	await User.destroy({
    where: {
        id: user_id
    }
});
	res.json(destroyed);
})

app.post('/add-user',async (req,res)=>{
	const user_fields = req.body;
	res.json(user_fields);
	const newUser = await User.create({ 
		 name: user_fields.name,
		 age:user_fields.age,
		 country: user_fields.country
	  });
	res.json({
		msg:"OK"
	});
})
app.listen(5000, ()=>console.log('listening...'));