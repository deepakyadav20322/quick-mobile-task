const express=require('express');
const app=express();
const connectDB=require("./config/connection");
const dotenv=require('dotenv');
const cors=require('cors');
const servicesRouter=require('./routers/servicesRouter');
const productRouter=require('./routers/productRouter');
const userRouter=require('./routers/userRouter');

dotenv.config();
connectDB();
app.use(express.json());


const allowedOrigins = [
  'https://quick-mobile-client.vercel.app',
  'https://quick-mobile-task.vercel.app'  
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
app.get('/',(req,res)=>res.json({mes:"all thing working"}))
app.use('/api/service',servicesRouter);
app.use('/api/product',productRouter);
app.use('/api/auth',userRouter);
app.listen(process.env.PORT,()=>{
    console.log(`server is running on port ${process.env.PORT} `);
});
