const db = require('./pool');

const getProfile = (username) => {
  return db.query(
    `SELECT username, firstName, lastName, avatar FROM users WHERE username = '${username}'`
  )
    .then((r) => r.rows[0]);
};

const getSettings = (username) => {
  return db.query(`SELECT firstName, lastName, username, email, bio, password FROM users WHERE username = '${username}'`)
    .then((r) => r.rows[0]);
};

const getUser = (id) => {
  return db.query(`SELECT * FROM users WHERE id = '${id}'`)
    .then((r) => r.rows[0]);
};

const getLogin = (username) => {
  return db.query(`SELECT * FROM users WHERE username = '${username}'`)
    .then((r) => r.rows[0]);
};

const getPosts = (id) => {
  return db.query(`
    SELECT p.*, u.avatar, u.username,
      CASE WHEN l.user_id IS NULL 
         THEN 0 
         ELSE 1
      END AS isliked
    FROM posts p
    LEFT JOIN likes l ON l.post_id = p.id AND l.user_id = ${id}
    INNER JOIN users u ON p.user_id = u.id
    ORDER BY p.postdate DESC;
  `);
};

const getUserPosts = (id) => {
  return db.query(`
    SELECT p.*, u.avatar, u.username 
    FROM posts p
    LEFT JOIN users u ON p.user_id = u.id
    WHERE p.user_id = ${id}
    ORDER BY p.postdate DESC;
  `);
};

const getHomePage = (req, res) => {
  db.query(`
    SELECT * FROM posts p WHERE user_id = ${req.params.id}
    ORDER BY p.postdate DESC;
  `)
    .then((results) => {
      res.status(200).json(results.rows);
    })
    .catch((err) => console.error(err));
};

const getLikes = (id) => {
  return db.query(`
    SELECT p.*, u.avatar, u.username,
      CASE WHEN l.user_id IS NULL 
         THEN 0 
         ELSE 1
      END AS isliked
    FROM posts p
    INNER JOIN users u ON p.user_id = u.id
    LEFT JOIN likes l ON l.post_id = p.id WHERE l.user_id = ${id}
    ORDER BY p.postdate DESC;
    `);
};

const getComments = (req, res) => {
  db.query(`
     SELECT c.*, u.avatar, u.username
     FROM comments c, users u
     WHERE post_id = ('${req.params.id}')
     AND c.user_id = u.id
     ORDER BY c.commentDate ASC;
  `)
    .then((results) => res.status(200).json(results.rows))
    .catch((err) => console.error(err));
};

const getMeets = (req, res) => {
  db.query(`
    SELECT m.*, u.avatar
    FROM meets m
    INNER JOIN users u ON m.user_id = u.id
    ORDER BY m.meetdate DESC;
  `)
    .then((results) => {
      res.status(200).json(results.rows)
    })
    .catch((err) => console.error(err));
};

const getListings = (req, res) => {
  db.query(`
    SELECT l.*, u.avatar, u.firstname, u.lastname 
    FROM listings l 
    INNER JOIN users u ON l.user_id = u.id
    ORDER BY l.listeddate DESC;
  `)
    .then((results) => res.status(200).json(results.rows))
    .catch((err) => console.error(err));
};

const createPost = (id, post) => {
  return db.query(
    "INSERT INTO posts (postdate, caption, photo, owner_id, user_id) VALUES ($1, $2, $3, $4, $5)",
    [post.postdate, post.caption, post.photo, post.owner_id, id]);
};

const createMeet = (id, meet) => {
  return db.query(
    "INSERT INTO meets (title, meetdate, timestart, timeend, street, city, state, zipcode, user_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)",
    [meet.title, meet.meetdate, meet.timestart, meet.timeend, meet.street, meet.city, meet.state, meet.zipcode, id]);
};

const createListing = (id, listing) => {
  return db.query(
    "INSERT INTO listings (photo, city, state, listeddate, condition, year, make, model, mileage, price, description, contactinfo, transmission, sold, user_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)",
    [listing.photo, listing.city, listing.state, listing.listeddate, listing.condition, listing.year, listing.make, listing.model, listing.mileage, listing.price, listing.description, listing.contactinfo, listing.transmission, listing.sold, id]);
};

const addLike = (req, res) => {
  const { isLiked, post_id, user_id } = req.body;
  if (!isLiked) {
    db.query(
      "DELETE FROM likes WHERE post_id = $1 AND user_id = $2", 
      [post_id, user_id])
      .then((results) => res.sendStatus(201))
      .catch((err) => console.error(err));
    return;
  }
  db.query(
    "INSERT INTO likes (post_id, user_id) VALUES ($1, $2)",
    [post_id, user_id])
    .then((results) => res.sendStatus(201))
    .catch((err) => console.error(err));
};

const createComment = (id, comment) => {
  return db.query(
    "INSERT INTO comments (commentDate, comment, post_id, user_id) VALUES ($1, $2, $3, $4)",
    [comment.commentDate, comment.comment, comment.post_id, id]);
};

const createUser = (form) => {
  console.log(form)
  return db.query(
    "INSERT INTO users (firstName, lastName, username, email, password) VALUES ($1, $2, $3, $4, $5)",
    [form.firstname, form.lastname, form.username, form.email, form.password]);
};

const updateUser = (id, user) => {
  return db.query(
    "UPDATE users SET firstName = ($1), lastName = ($2), username = ($3), email = ($4), password = ($5), bio = ($6) WHERE id = ($7)",
    [ user.firstname, user.lastname, user.username, user.email, user.password, user.bio, id ])
};

const deletePost = (req, res) => {
  const postId = parseInt(req.params.id);

  db.query(
    'DELETE FROM posts WHERE id = $1', 
    [postId])
    .then((results) => res.sendStatus(201))
    .catch((err) => console.error(err));
};

module.exports = {
  getPosts,
  getComments,
  getMeets,
  getListings,
  getLikes,
  getUserPosts,
  addLike,
  createComment,
  createUser,
  createPost,
  createMeet,
  createListing,
  updateUser,
  deletePost,
  getProfile,
  getLogin,
  getSettings,
  getUser,
};
