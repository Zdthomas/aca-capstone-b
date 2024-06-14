const mysql = require('mysql2'); // Add this line
const pool = require('../sql/connection');
const { handleSQLError } = require('../sql/error');

const createCharacter = (req, res) => {
  const { name, level, health, experience, class: characterClass, stats, email, image } = req.body;

  console.log('Request body:', req.body);

  let sql = 'SELECT id FROM usersContact WHERE email = ?';
  sql = mysql.format(sql, [email]);

  console.log('SQL Query to find user:', sql);

  pool.query(sql, (err, results) => {
    if (err) {
      console.error('Error finding user:', err);
      return handleSQLError(res, err);
    }

    if (results.length === 0) {
      console.error('User not found');
      return res.status(404).json({ message: 'User not found' });
    }

    const userId = results[0].id;

    sql = 'SELECT * FROM characterCreation WHERE charactername = ? AND id = ?';
    const checkSql = mysql.format(sql, [name, userId]);
    console.log('SQL Query to check existing character:', checkSql);

    pool.query(checkSql, (err, results) => {
      if (err) {
        console.error('Error checking existing character:', err);
        return handleSQLError(res, err);
      }

      if (results.length > 0) {
        console.error('Character already exists');
        return res.status(400).json({ message: 'Character already exists' });
      }

      sql = 'INSERT INTO characterCreation (charactername, userlevel, userhealth, experience, strength, intelligence, will, dexterity, constitution, charisma, class, image, id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
      const inserts = [name, level, health, experience, stats.Strength, stats.Intelligence, stats.Will, stats.Dexterity, stats.Constitution, stats.Charisma, characterClass, image, userId];
      sql = mysql.format(sql, inserts);

      console.log('SQL Query to create character:', sql);

      pool.query(sql, (err, results) => {
        if (err) {
          console.error('Error creating character:', err);
          return handleSQLError(res, err);
        }
        console.log('Character creation successful:', results);
        return res.json({ message: 'Character created successfully', id: results.insertId });
      });
    });
  });
};

const deleteCharacter = (req, res) => {
    const { charactername, email } = req.body;
  
    console.log('Request body for delete:', req.body); // Log the request body for debugging
  
    if (!email) {
      console.error('Email is required');
      return res.status(400).json({ message: 'Email is required' });
    }
  
    // First, find the user by email to get the user ID
    let sql = 'SELECT id FROM usersContact WHERE email = ?';
    sql = mysql.format(sql, [email]);
  
    pool.query(sql, (err, results) => {
      if (err) {
        console.error('Error finding user:', err);
        return handleSQLError(res, err);
      }
  
      if (results.length === 0) {
        console.error('User not found');
        return res.status(404).json({ message: 'User not found' });
      }
  
      const userId = results[0].id;
  
      console.log('User ID found:', userId);
  
      // Delete the character by name and user ID
      let deleteSql;
      let deleteInserts;
  
      if (charactername) {
        deleteSql = 'DELETE FROM characterCreation WHERE id = ? AND charactername = ?';
        deleteInserts = [userId, charactername];
      } else {
        // If charactername is not provided, delete character with null or empty charactername
        deleteSql = 'DELETE FROM characterCreation WHERE id = ? AND (charactername IS NULL OR charactername = "")';
        deleteInserts = [userId];
      }
  
      deleteSql = mysql.format(deleteSql, deleteInserts);
  
      console.log('SQL Query for delete:', deleteSql);
  
      pool.query(deleteSql, (err, results) => {
        if (err) {
          console.error('Error deleting character:', err);
          return handleSQLError(res, err);
        }
  
        if (results.affectedRows === 0) {
          console.error('Character not found');
          return res.status(404).json({ message: 'Character not found' });
        }
  
        console.log('Character deleted successfully');
        return res.json({ message: 'Character deleted successfully' });
      });
    });
  };

  const deleteCharacterById = (req, res) => {
    const { id } = req.params;
  
    if (!id) {
      return res.status(400).json({ message: 'ID is required' });
    }
  
    const sql = 'DELETE FROM characterCreation WHERE id = ?';
    const inserts = [id];
  
    pool.query(mysql.format(sql, inserts), (err, results) => {
      if (err) {
        return handleSQLError(res, err);
      }
  
      if (results.affectedRows === 0) {
        return res.status(404).json({ message: 'Character not found' });
      }
  
      return res.json({ message: 'Character deleted successfully' });
    });
  };

module.exports = {
  createCharacter,
  deleteCharacter,
  deleteCharacterById
};

  
