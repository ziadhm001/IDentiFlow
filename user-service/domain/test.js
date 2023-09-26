import mongoose from 'mongoose';
import * as admin from './admin-use-case.js';


mongoose
  .connect('mongodb+srv://ziadhm001:ziadhm001@nodecourse.pv53znd.mongodb.net/')
  .then(async() => {
    console.log('@@@@ ON DB');
    const a = await admin.register({ email: 'a4', password: 'bb' });
    console.log(a)
  });
