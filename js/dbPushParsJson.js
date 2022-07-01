let globalObject = {
    addInBd() {
        let fs = require('fs')
        let ObjectID = require("mongodb").ObjectID;
        const MongoClient = require("mongodb").MongoClient;
        let json = JSON.parse(fs.readFileSync(__dirname + '\\files\\fixedFile.json'))
        const url = "mongodb+srv://Pishexod:Depart22@dep22.n8xgv.mongodb.net/test?retryWrites=true&w=majority";
        const mongoClient = new MongoClient(url);

        mongoClient.connect(function (err, client) {
            console.log('connect on data is ok')
            const db = client.db("test");
            const dbo = db.collection("lessons");

            for (let i = 0; i < json.table.length; i++) {
                json.table[i].idAudience = new ObjectID(json.table[i].idAudience)
                json.table[i].idUser = new ObjectID(json.table[i].idUser)
                json.table[i].idType = new ObjectID(json.table[i].idType)
                json.table[i]._id = new ObjectID(json.table[i]._id)
            }

            console.log(json.table)
            dbo.insertMany(json.table, function (err, res) {
                if (err) throw err
                console.log("Number of documents inserted: " + res.insertedCount);
                client.close();
            });
        });
    }
}

module.exports = {
    bd: globalObject
}

