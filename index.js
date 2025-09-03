const express = require('express');
const cors = require('cors');
require('dotenv').config();
const sequelize = require('./src/models/index').sequelize;
const authRoutes = require('./src/routes/authRoutes');
const bikeRoutes = require('./src/routes/bikeRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/bikes', bikeRoutes);

// sequelize.sync().then(() => {
//     console.log("✅ Database synced successfully");
//     app.listen(process.env.PORT, () => {
//         console.log(`Server running on port ${process.env.PORT}`);
//     });
// });

sequelize.authenticate()
  .then(() => console.log("✅ Database connected"))
  .catch(err => console.error("❌ Database connection failed:", err));


module.exports = app;