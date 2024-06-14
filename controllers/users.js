const mysql = require('mysql2')
const pool = require('../sql/connection')
const { handleSQLError } = require('../sql/error')

const getAllUsers = (req, res) => {
    // SELECT ALL USERS
    pool.query("SELECT * FROM users", (err, rows) => {
      // console.log(req.headers)
      if (err) return handleSQLError(res, err)
      return res.json(rows);
    })
  }


  const getUserById = (req, res) => {
    // SELECT USERS WHERE ID = <REQ PARAMS ID>
    let sql = `

      SELECT 
        users.id,
        users.first_name,
        users.last_name,
        usersContact.email,
        characterCreation.charactername,
        characterCreation.userlevel,
        characterCreation.userhealth,
        characterCreation.strength,
        characterCreation.intelligence,
        characterCreation.will,
        characterCreation.dexterity,
        characterCreation.constitution,
        characterCreation.charisma
      FROM 
        users
      LEFT JOIN 
        usersContact ON users.id = usersContact.id
      LEFT JOIN 
        characterCreation ON users.id = characterCreation.id
      WHERE 
        users.id = ?

    `
    
  // "SELECT * FROM users WHERE ID = ?"
    // WHAT GOES IN THE BRACKETS
    sql = mysql.format(sql, [req.params.id])
  
    pool.query(sql, (err, rows) => {
      if (err) return handleSQLError(res, err)
      return res.json(rows);
    })
  }

  const getUserCharactersByEmail = (req, res) => {
    console.log('Decoded JWT:', req.user); // Check if this logs the decoded JWT
    const email = req.user['https://aca-capstone-b.vercel.app/email'];
  
    if (!email) {
      console.error('No email found in decoded JWT');
      return res.status(400).json({ message: 'No email found in decoded JWT' });
    }
  
    console.log('Email:', email);
    let sql = `
        SELECT 
          users.id,
          users.first_name,
          users.last_name,
          usersContact.email,
          characterCreation.charactername,
          characterCreation.userlevel,
          characterCreation.userhealth,
          characterCreation.strength,
          characterCreation.intelligence,
          characterCreation.will,
          characterCreation.dexterity,
          characterCreation.constitution,
          characterCreation.charisma,
          characterCreation.class,
          characterCreation.image
      FROM 
          users
      LEFT JOIN 
          usersContact ON users.id = usersContact.id
      LEFT JOIN 
          characterCreation ON users.id = characterCreation.id
      WHERE 
          usersContact.email = ?
    `;
    sql = mysql.format(sql, [email]);
    console.log('SQL Query:', sql);
  
    pool.query(sql, (err, rows) => {
        if (err) return handleSQLError(res, err);
        console.log('SQL Result:', rows); 
        return res.json(rows);
    });
  }

  const getUserCharactersBySub = (req, res) => {
    console.log('Decoded JWT:', req.user);
    // const userId = req.user.sub;
    const email = req.user['https://aca-capstone-b.vercel.app/email'];
    // const userId = req.user.sub.split('|')[1];
    // console.log('User ID:', userId);
    // if (!userId || !req.user.sub) {
    //   console.error('No user ID found in decoded JWT');
    //   return res.status(400).json({ message: 'No user ID found in decoded JWT' });
    // }

    if (!email) {
      console.error('No email found in decoded JWT');
      return res.status(400).json({ message: 'No email found in decoded JWT' });
    }
  
    console.log('Email:', email);
    let sql = `
      SELECT 
          users.id,
          users.first_name,
          users.last_name,
          usersContact.email,
          characterCreation.charactername,
          characterCreation.userlevel,
          characterCreation.userhealth,
          characterCreation.strength,
          characterCreation.intelligence,
          characterCreation.will,
          characterCreation.dexterity,
          characterCreation.constitution,
          characterCreation.charisma,
          characterCreation.class,
          characterCreation.image
      FROM 
          users
      LEFT JOIN 
          usersContact ON users.id = usersContact.id
      LEFT JOIN 
          characterCreation ON users.id = characterCreation.id
      WHERE 
          usersContact.email = ?
    `;
    sql = mysql.format(sql, [email]);
    console.log('SQL Query:', sql);
  
    pool.query(sql, (err, rows) => {
      if (err) return handleSQLError(res, err);
      console.log('SQL Result:', rows); 
      return res.json(rows);
    });
  };


  const createUser = (req, res) => {
    const { email } = req.body;

    let sql = 'INSERT INTO users (email) VALUES (?)';
    let inserts = [email];
    sql = mysql.format(sql, inserts);

    pool.query(sql, (err, results) => {
      if (err) return handleSQLError(res, err);

      const userId = results.insertId;

      sql = 'INSERT INTO usersContact (id, email) VALUES (?, ?)';
      inserts = [userId, email];
      sql = mysql.format(sql, inserts);

      pool.query(sql, (err, results) => {
        if (err) return handleSQLError(res, err);
        return res.json({ message: 'User created successfully', id: userId });
      });
    });
};
  

  // const createUser = (req, res) => {
  //   // INSERT INTO USERS FIRST AND LAST NAME 
  //   let sql = "INSERT INTO users (first_name, last_name) VALUES (?, ?)";
  //   // WHAT GOES IN THE BRACKETS
  //   sql = mysql.format(sql, [req.body.first_name, req.body.last_name])
  
  //   pool.query(sql, (err, results) => {
  //     if (err) return handleSQLError(res, err)
  //     return res.json({ newId: results.insertId });
  //   })
  // }

  const updateUserById = (req, res) => {
    // UPDATE USERS AND SET FIRST AND LAST NAME WHERE ID = <REQ PARAMS ID>
    let sql = "UPDATE users SET first_name = ?, last_name = ?";
    // WHAT GOES IN THE BRACKETS
    sql = mysql.format(sql, [req.body.first_name, req.body.last_name])
  
    pool.query(sql, (err, results) => {
      if (err) return handleSQLError(res, err)
      return res.status(204).json();
    })
  }

  const deleteUserByFirstName = (req, res) => {
    // DELETE FROM USERS WHERE FIRST NAME = <REQ PARAMS FIRST_NAME>
    let sql = "DELETE FROM users WHERE first_name = ?";
    // WHAT GOES IN THE BRACKETS
    sql = mysql.format(sql, [req.body.first_name])
  
    pool.query(sql, (err, results) => {
      if (err) return handleSQLError(res, err)
      return res.json({ message: `Deleted ${results.affectedRows} user(s)` });
    })
  }

  module.exports = {
    getAllUsers,
    getUserById,
    getUserCharactersByEmail,
    getUserCharactersBySub,
    createUser,
    
    updateUserById,
    deleteUserByFirstName
  }