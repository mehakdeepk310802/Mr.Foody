import mongoose from 'mongoose';

const mongoURI = 'mongodb+srv://mehakdeepk419:$deep$2002@cluster0.7my66py.mongodb.net/gofoodmern?retryWrites=true&w=majority&appName=Cluster0';

const mongoDB = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log("Connected to MongoDB");
        const fetched_data = await mongoose.connection.db.collection("food_items").find({}).toArray();
        global.food_items = fetched_data;
        const foodCategory = await mongoose.connection.db.collection("foodCategory").find({}).toArray();
        global.foodCategory = foodCategory;
        //console.log(global.food_items);
    } 
    catch (error){
        console.error("Error connecting to MongoDB", error);
    }
};

export default mongoDB;
