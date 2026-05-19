const mongoose = require("mongoose");
const uri = "mongodb://vivekanandanp:crispy123@ac-qrlndqn-shard-00-00.3jsk4zs.mongodb.net:27017,ac-qrlndqn-shard-00-01.3jsk4zs.mongodb.net:27017,ac-qrlndqn-shard-00-02.3jsk4zs.mongodb.net:27017/crispybites?ssl=true&replicaSet=atlas-13hp42-shard-0&authSource=admin&retryWrites=true&w=majority";
mongoose.connect(uri)
.then(() => {
    console.log("CONNECTED 🔥");
})
.catch((err) => {
    console.log("ERROR:");
    console.log(err);
});