import mongoose from 'mongoose';

const url = process.env.MONGO_URL || 'mongodb://localhost:27017';
const db_name = process.env.DB_NAME || 'todobase';

mongoose.connect(`${url}/${db_name}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

export default mongoose;
