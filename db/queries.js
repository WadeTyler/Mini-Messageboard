const db = require('./db');

async function getAllPosts() {
    const query = `SELECT messages.messageid, messages.message, users.username, messages.date
    FROM messages
    JOIN users ON messages.userid = users.userid;`;
    
    try {
        const results = await db.query(query);
        return results.rows;
    } catch (error) {
        console.error("Error retrieving posts", error);
        throw error;
    }
}

async function getUserIDByName(name) {
    const query = `SELECT userid FROM users WHERE username = $1`;
    const values = [name];
    
    const results = await db.query(query, values);

    if (results.rows.length > 0) {
        return results.rows[0].userid;
    }
    return -1;
}

async function createNewUser(name) {
    const query = `INSERT INTO users (username) VALUES($1)`;
    const values = [name];

    await db.query(query, values);
    console.log(`${name} added to the database.`);

    const idquery = `SELECT userid FROM users WHERE username = $1`;
    const results = await db.query(idquery, values);
    
    return results.rows[0].userid;
}

async function createNewPost(userid, message, date) {
    const query = `INSERT INTO messages (userid, message, date) VALUES($1, $2, $3)`;
    const values = [userid, message, date];

    await db.query(query, values);

    console.log(`New Message added to database`);
}

async function getMessage(messageID) {
    const query = `SELECT messages.messageid, messages.message, users.username, messages.date
        FROM messages
        JOIN users ON messages.userid = users.userid
        WHERE messages.messageid = $1;`;

    const values = [messageID];
    const results = await db.query(query, values);
    return results.rows[0];
}

module.exports = {
    getAllPosts,
    getUserIDByName,
    createNewUser,
    createNewPost,
    getMessage
}