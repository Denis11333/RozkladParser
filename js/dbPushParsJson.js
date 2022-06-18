let globalObject = {
    addInBd() {
        let fs = require('fs')
        let ObjectID = require("mongodb").ObjectID;
        const MongoClient = require("mongodb").MongoClient;

        let json = JSON.parse(fs.readFileSync(__dirname + '\\files\\fixedFile.json'))

        const url = "mongodb://127.0.0.1:27017/";
        const mongoClient = new MongoClient(url);

        mongoClient.connect(function (err, client) {

            const db = client.db("digital-department-viti");
            const dbo = db.collection("lessons");

            var myobj = [];
            for (let i = 0; i < json.table.length; i++) {

                myobj[i] = {
                    "title": json.table[i].title,
                    "teacher": json.table[i].teacher,
                    'group': json.table[i].group,
                    "date": json.table[i].date,
                    "idAudience": new ObjectID(json.table[i].idAudience),
                    "numberLesson": json.table[i].numberLesson,
                    "idType": new ObjectID(json.table[i].idType),
                    "idUser": new ObjectID(json.table[i].idUser),
                    __v: 0
                }
            }

            dbo.insertMany(myobj, function (err, res) {
                if (err) throw err;
                console.log("Number of documents inserted: " + res.insertedCount);
                client.close();
            });
        });
    }
}

module.exports = {
    bd: globalObject
}

