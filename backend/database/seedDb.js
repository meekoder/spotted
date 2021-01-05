const faker = require('faker');
const db = require('./pool');

let users = [];

const getRandomNum = (min, max) => Math.floor(Math.random() * (max - min)) + min;

let imageIdx = 0;
const getImage = () => {
  const images = ['https://mvp-spotted.s3-us-west-1.amazonaws.com/1.jpg', 'https://mvp-spotted.s3-us-west-1.amazonaws.com/10.jpg', 'https://mvp-spotted.s3-us-west-1.amazonaws.com/11.jpg', 'https://mvp-spotted.s3-us-west-1.amazonaws.com/13.jpg', 'https://mvp-spotted.s3-us-west-1.amazonaws.com/14.jpg', 'https://mvp-spotted.s3-us-west-1.amazonaws.com/9.jpg', 'https://mvp-spotted.s3-us-west-1.amazonaws.com/8.png', 'https://mvp-spotted.s3-us-west-1.amazonaws.com/7.jpg', 'https://mvp-spotted.s3-us-west-1.amazonaws.com/6.jpg', 'https://mvp-spotted.s3-us-west-1.amazonaws.com/5.jpg', 'https://mvp-spotted.s3-us-west-1.amazonaws.com/2.jpg', 'https://mvp-spotted.s3-us-west-1.amazonaws.com/4.jpg', 'https://mvp-spotted.s3-us-west-1.amazonaws.com/3.jpg', 'https://mvp-spotted.s3-us-west-1.amazonaws.com/15.jpg', 'https://mvp-spotted.s3-us-west-1.amazonaws.com/12.jpg'];
  const image = images[imageIdx];
  imageIdx += 1;
  if (imageIdx > 14) {
    imageIdx = 0;
  }
  return image;
};

let avatarIdx = 0;
const getAvatarUrl = () => {
  const avatars = ['https://mvp-spotted.s3-us-west-1.amazonaws.com/avatars/bunta.jpeg', 'https://mvp-spotted.s3-us-west-1.amazonaws.com/avatars/itsuki.jpg', 'https://mvp-spotted.s3-us-west-1.amazonaws.com/avatars/mako.jpg', 'https://mvp-spotted.s3-us-west-1.amazonaws.com/avatars/takumi.png', 'https://mvp-spotted.s3-us-west-1.amazonaws.com/avatars/ryosuke.jpg', 'https://mvp-spotted.s3-us-west-1.amazonaws.com/avatars/keisuke.jpg', 'https://mvp-spotted.s3-us-west-1.amazonaws.com/avatars/iketani.png', 'https://mvp-spotted.s3-us-west-1.amazonaws.com/avatars/kenji.jpg', 'https://mvp-spotted.s3-us-west-1.amazonaws.com/avatars/natsuki.jpg', 'https://mvp-spotted.s3-us-west-1.amazonaws.com/avatars/miyahara.png', 'https://mvp-spotted.s3-us-west-1.amazonaws.com/avatars/sayuki.jpg', 'https://mvp-spotted.s3-us-west-1.amazonaws.com/avatars/shingo.jpeg', 'https://mvp-spotted.s3-us-west-1.amazonaws.com/avatars/takeshi.jpg', 'https://mvp-spotted.s3-us-west-1.amazonaws.com/avatars/wataru.jpg', 'https://mvp-spotted.s3-us-west-1.amazonaws.com/avatars/yuichi.jpg'];
  const avatar = avatars[avatarIdx];
  avatarIdx += 1;
  if (avatarIdx > 14) {
    avatarIdx = 0;
  }
  return avatar;
};

const getAvatar = async (userid) => {
  try {
    const res = await db.query(`SELECT avatar FROM users WHERE id = ('${userid}')`)
    return res.rows[0].avatar;
  } catch (err) {
    return err;
  }
};

const getUsername = async (userid) => {
  try {
    const res = await db.query(`SELECT username FROM users WHERE id = ('${userid}')`)
    return res.rows[0].username;
  } catch (err) {
    return err;
  }
};

let listingImageIdx = 0;
const getListingImage = () => {
  const images = ['https://mvp-spotted.s3-us-west-1.amazonaws.com/marketplace/350.jpg', 'https://mvp-spotted.s3-us-west-1.amazonaws.com/marketplace/911.jpg', 'https://mvp-spotted.s3-us-west-1.amazonaws.com/marketplace/brz.jpg', 'https://mvp-spotted.s3-us-west-1.amazonaws.com/marketplace/cap.jpeg', 'https://mvp-spotted.s3-us-west-1.amazonaws.com/marketplace/delsol.jpg', 'https://mvp-spotted.s3-us-west-1.amazonaws.com/marketplace/s13.jpg', 'https://mvp-spotted.s3-us-west-1.amazonaws.com/marketplace/eg.jpg', 'https://mvp-spotted.s3-us-west-1.amazonaws.com/marketplace/genesis.jpg', 'https://mvp-spotted.s3-us-west-1.amazonaws.com/marketplace/mini.jpg', 'https://mvp-spotted.s3-us-west-1.amazonaws.com/marketplace/r32.jpeg', 'https://mvp-spotted.s3-us-west-1.amazonaws.com/marketplace/rsx.jpg', '', 'https://mvp-spotted.s3-us-west-1.amazonaws.com/marketplace/s2000.jpg', 'https://mvp-spotted.s3-us-west-1.amazonaws.com/marketplace/wrx.jpg', 'https://mvp-spotted.s3-us-west-1.amazonaws.com/marketplace/veloster.jpg', 'https://mvp-spotted.s3-us-west-1.amazonaws.com/marketplace/s2k.jpg'];
  const image = images[listingImageIdx];
  listingImageIdx += 1;
  if (listingImageIdx > 15) {
    listingImageIdx = 0;
  }
  return image;
};

const generateUsers = async () => {
  let count = 0;

  while (count < 10) {
    const user = {
      id: count,
      avatar: getAvatarUrl(),
      bio: faker.lorem.sentence(),
      phone: faker.phone.phoneNumber(),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      city: faker.address.city(),
      state: faker.address.stateAbbr(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    };
    user.username = `${user.firstName}${user.lastName}`;
    users.push(user.id);
    await db.query(
      "INSERT INTO users (id, avatar, bio, phone, firstName, lastName, city, state, username, email, password) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)",
      [ user.id, user.avatar, user.bio, user.phone, user.firstName, user.lastName, user.city, user.state, user.username, user.email, user.password ]);
    count += 1;
  }
};

const generatePosts = async () => {

  for (let i = 0; i < 100; i++) {
    const post = {
      postDate: faker.date.past(),
      caption: faker.lorem.sentence(),
      photo: getImage(),
      owner_id: i % 3 === 0 ? getRandomNum(0, 9) : null,
      user_id: getRandomNum(0, 9),
    };

    for (let j = 0; j < getRandomNum(1, 6); j++) {
      const comment = {
        commentDate: faker.date.between(post.postDate, '2021-01-05'),
        comment: faker.lorem.sentence(),
        post_id: i,
        user_id: getRandomNum(0, 9),
      };
      comment.avatar = await getAvatar(comment.user_id);
      comment.username = await getUsername(comment.user_id);

      db.query(
        "INSERT INTO comments (commentDate, comment, post_id, user_id) VALUES ($1, $2, $3, $4)",
        [ comment.commentDate, comment.comment, comment.post_id, comment.user_id ]);
    }

    db.query(
      "INSERT INTO posts (postdate, caption, photo, owner_id, user_id) VALUES ($1, $2, $3, $4, $5)",
      [ post.postDate, post.caption, post.photo, post.owner_id, post.user_id ]);
  }
};

const generateMeets = async () => {
  let count = 0;

  while (count < 20) {
    const meet = {
      title: faker.lorem.sentence(getRandomNum(1, 6)),
      street: faker.address.streetAddress(),
      city: faker.address.city(),
      state: faker.address.stateAbbr(),
      zipcode: faker.address.zipCode(),
      meetdate: faker.date.soon(),
      timestart: getRandomNum(1, 7),
      user_id: getRandomNum(0, 9),
    };
    meet.timeend = meet.timestart + getRandomNum(1, 3);
    db.query(
      "INSERT INTO meets (title, street, city, state, zipcode, meetdate, timestart, timeend, user_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)",
      [ meet.title, meet.street, meet.city, meet.state, meet.zipcode, meet.meetdate, meet.timestart, meet.timeend, meet.user_id ]); 
    count += 1;
  }
};

const generateListings = async () => {
  let count = 0;
  const conditions = ['Excellent', 'Very Good', 'Good', 'Fair', 'Poor'];

  while (count < 30) {
    const listing = {
      listeddate: faker.date.past(),
      city: faker.address.city(),
      state: faker.address.stateAbbr(),
      condition: conditions[count % conditions.length],
      year: getRandomNum(1990, 2021),
      make: faker.vehicle.manufacturer(),
      model: faker.vehicle.model(),
      mileage: getRandomNum(20, 150) * 1000,
      price: getRandomNum(10, 80) * 1000,
      description: faker.lorem.sentences(),
      contactinfo: faker.phone.phoneNumber(),
      transmission: count % 3 === 0 ? 'Automatic' : 'Manual',
      sold: faker.random.boolean(),
      user_id: getRandomNum(0, 9),
    };
    listing.photo = await getListingImage();
    db.query(
      "INSERT INTO listings (photo, listeddate, city, state, condition, year, make, model, mileage, price, description, contactinfo, transmission, sold, user_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)",
      [ listing.photo, listing.listeddate, listing.city, listing.state, listing.condition, listing.year, listing.make, listing.model, listing.mileage, listing.price, listing.description, listing.contactinfo, listing.transmission, listing.sold, listing.user_id ]);
    count += 1;
  }
};

const generateData = async () => {
  try {
    await generateUsers();
    await generatePosts();
    await generateMeets();
    await generateListings();
  } catch (exception) {
    console.log(exception);
  }
};

generateData();
