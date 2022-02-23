let globalObject = {
    addInBd() {
        let fs = require('fs')
        let ObjectID = require("mongodb").ObjectID;
        const MongoClient = require("mongodb").MongoClient;

        let json = JSON.parse(fs.readFileSync(__dirname + '\\files\\fixedFile.json'))

        const url = "mongodb://localhost:27017/";
        const mongoClient = new MongoClient(url);

        mongoClient.connect(function (err, client) {

            const db = client.db("Crash_test");
            const dbo = db.collection("lessons");
            var myobj = [];
            for (let i = 0; i < json.table.length; i++) {

                myobj[i] = {
                    'group': json.table[i].group,
                    "idUser": new ObjectID(json.table[i].idUser),
                    "title": json.table[i].title,
                    "idAudience": new ObjectID(json.table[i].idAudience),
                    "idType": new ObjectID(json.table[i].idType),
                    "teacher": json.table[i].teacher,
                    "numberLesson": json.table[i].numberLesson,
                    "date": json.table[i].date
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

