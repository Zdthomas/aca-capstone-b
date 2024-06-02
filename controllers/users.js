const mysql = require('mysql2')
const pool = require('../sql/connection')
const { handleSQLError } = require('../sql/error')

const getAllUsers = (req, res) => {
    // SELECT ALL USERS
    pool.query("SELECT * FROM users", (err, rows) => {
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
      usersContact.phone,
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
    // WHAT GOES IN THE BRACKETS
    sql = mysql.format(sql, [req.params.id])
  
    pool.query(sql, (err, rows) => {
      if (err) return handleSQLError(res, err)
      return res.json(rows);
    })
  }

  const createUser = (req, res) => {
    // INSERT INTO USERS FIRST AND LAST NAME 
    let sql = "INSERT INTO users (first_name, last_name) VALUES (?, ?)";
    // WHAT GOES IN THE BRACKETS
    sql = mysql.format(sql, [req.body.first_name, req.body.last_name])
  
    pool.query(sql, (err, results) => {
      if (err) return handleSQLError(res, err)
      return res.json({ newId: results.insertId });
    })
  }

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
    createUser,
    updateUserById,
    deleteUserByFirstName
  }