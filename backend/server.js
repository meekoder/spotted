const express = require('express');
const parser = require('body-parser');
const db = require('./database/queries');

const pp = require('passport');
const cParser = require('cookie-parser');
const session = require('express-session');
const LocalStrategy = require('passport-local').Strategy;

pp.use(new LocalStrategy(
  function(u, p, done) {
    // hash p
    db.getLogin(u)
      .then(us => {
        if (us.password !== p) {
          return done(null, false, {});
        }
        done(null, us);
      })
      .catch((err) => console.log(err));
  }
))

pp.serializeUser((user, done) => done(null, user.id));
pp.deserializeUser((id, done) => 
  db.getUser(id).then(us => done(null, us))
);

const app = express();

app.use(express.static('public'));
app.use(cParser());
app.use(parser.json());
app.use(parser.urlencoded({extended: true}));
app.use(session({secret: 'oshtarat'}));
app.use(pp.initialize());
app.use(pp.session());

app.get('/api/logout', (req, res) => {
  req.logout(); 
  res.ok();
})

app.post('/login', (req, res, next) => {
  const { username, password } = req.query;

  db.getLogin(username)
    .then(us => {
      if (us.password !== password) {
        res.sendStatus(400);
        return;
      }
      if (true) {
        textPin(username);
        res.cookie('spotted_verify_user', username);
        res.sendStatus(301);
        return;
      }
      next();
    })
}, pp.authenticate('local', {failureRedirect:'/login'}), (req, res) => {
  res.sendStatus(200);
});

app.get('/z', (req, res) => {
  res.send(JSON.stringify({page:"home", user: req.user}));
});

app.get('/api/profil', (req, res) => {
  if (!req.user) {
    res.sendStatus(401);
    return;
  }
  db.getProfile(req.user.username)
    .then(user => {
      res.send(user);
    });
});

app.get('/api/settings', (req, res) => {
  db.getSettings(req.user.username)
    .then((user) => {
      res.send(user);
    });
});

app.get('/api/home', (req, res) => {
  db.getPosts(req.user.id)
    .then((posts) => {
      res.send(posts.rows);
    });
});

app.get('/api/user', (req, res) => {
  db.getLogin(req.user.username)
    .then((user) => {
      res.send(user);
    });
});

app.get('/api/profile', (req, res) => {
  db.getUserPosts(req.user.id)
    .then((posts) => {
      res.send(posts);
    });
});

app.get('/api/likes', (req, res) => {
  db.getLikes(req.user.id)
    .then((likes) => {
      res.send(likes.rows);
    });
});

app.put('/api/profile_settings', (req, res) => {
  db.updateUser(req.user.id, req.body)
    .then((user) => {
      res.send(user);
    })
    .catch((err) => console.log(err));
});

app.post('/api/home', (req, res) => {
  db.createPost(req.user.id, req.body)
    .then((post) => {
      res.send(post);
    })
    .catch((err) => console.log(err));
});

app.post('/api/comment', (req, res) => {
  db.createComment(req.user.id, req.body)
    .then((comment) => {
      res.send(comment);
    })
    .catch((err) => console.log(err));
});

app.post('/api/meets', (req, res) => {
  db.createMeet(req.user.id, req.body)
    .then((meet) => {
      res.send(meet);
    })
    .catch((err) => console.log(err));
});

app.post('/api/listings', (req, res) => {
  db.createListing(req.user.id, req.body)
    .then((listing) => {
      res.send(listing);
    })
    .catch((err) => console.log(err));
});

app.post('/api/registration', (req, res, next) => {
  db.createUser(req.body)
    .then((form) => {
      req.query.username = `${form.username}`;
      req.query.password = `${form.password}`;
      next();
    })
    .catch((err) => console.log(err));
}, pp.authenticate('local', {failureRedirect:'/login'}), (req, res) => {
  textPin(req.user.username)
  res.sendStatus(200);
});

// SEND SMS
const smsService = require('./send_sms.js');
const pins = {};

function textPin(username) {
  if (!username) return console.error('no username given');
  const pin = Math.floor(Math.random() * (9999 - 1000) + 1000);
  const phone = '+16505050827';
  pins[username] = pin;
  smsService.sendVerificationText(pin, phone);
}

app.post('/api/verify', (req, res, next) => {
  const username = req.cookies['spotted_verify_user'];
  if (!username) {
    res.sendStatus(400);
    return;
  }
  if (pins[username] != req.query.pin) {
    res.sendStatus(400);
    return;
  } 
  db.getLogin(username)
    .then((us) => {
      req.query.username = username;
      req.query.password = us.password;
      next();
    })
}, pp.authenticate('local', {failureRedirect:'/login'}), (req, res) => {
  res.sendStatus(200);
}
);

app.get('/api/:id/comments', db.getComments);
app.get('/api/meets', db.getMeets);
app.get('/api/marketplace', db.getListings);
app.post('/api/likes', db.addLike);
app.delete('/api/post/:id', db.deletePost);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
