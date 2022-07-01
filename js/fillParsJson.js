let fs = require('fs')
let mongoose = require('mongoose')
let ObjectID = require("mongodb").ObjectID;
let globalObject = {
    readFile() {
        console.log("I`m ok")
        let rozkl = JSON.parse(fs.readFileSync(__dirname + '\\files\\readedFile.json'))

        let editedPars = {
            table: []
        }
        let formatPars = {
            table: []
        }
        const MongoClient = require("mongodb").MongoClient

        const url = "mongodb+srv://Pishexod:Depart22@dep22.n8xgv.mongodb.net/test?retryWrites=true&w=majority";
        const mongoClient = new MongoClient(url);
        mongoClient.connect(function (err, client) {
console.log('connect is ok')
            const db = client.db("test");
            let collection = db.collection("audiences");
            collection.find().toArray(function (err, results) {

                collection.find().toArray(function (err, results) {
                    for (let i = 0; i < rozkl.table.length; i++) {
                        for (let j = 0; j < results.length; j++) {
                            if (rozkl.table[i].idAudience === results[j].audienceTitle) {
                                rozkl.table[i].idAudience = new ObjectID(mongoose.Types.ObjectId(results[j]._id))
                                editedPars.table.push(rozkl.table[i]);
                                j = results.length;
                            }
                        }
                    }


                    collection = db.collection("types");

                    collection.find().toArray(function (err, results) {
                        for (let i = 0; i < editedPars.table.length; i++) {
                            if (editedPars.table[i].idType === 'Л') {
                                editedPars.table[i].idType = new ObjectID(mongoose.Types.ObjectId(results[0]._id))
                                console.log('l')
                            }
                            if (editedPars.table[i].idType === 'ГЗ') {
                                editedPars.table[i].idType = new ObjectID(mongoose.Types.ObjectId(results[1]._id))
                            }
                            if (editedPars.table[i].idType === 'ПЗ') {
                                editedPars.table[i].idType = new ObjectID(mongoose.Types.ObjectId(results[2]._id))
                            }
                            if (editedPars.table[i].idType === 'CP') {
                                editedPars.table[i].idType = new ObjectID(mongoose.Types.ObjectId(results[3]._id))
                            }
                            if (editedPars.table[i].idType === 'ЕКЗ') {
                                editedPars.table[i].idType = new ObjectID(mongoose.Types.ObjectId(results[4]._id));
                            }
                            if (editedPars.table[i].idType === 'ЛЗ') {
                                editedPars.table[i].idType = new ObjectID(mongoose.Types.ObjectId(results[5]._id));
                            }
                            if (editedPars.table[i].idType === 'КР') {
                                editedPars.table[i].idType = new ObjectID(mongoose.Types.ObjectId(results[6]._id));
                            }
                        }

                        collection = db.collection("users")

                        collection.find().toArray(function (err, results) {
                            for (let i = 0; i < editedPars.table.length; i++) {
                                console.log(results)
                                if (editedPars.table[i].idUser === '22') {
                                    editedPars.table[i].idUser = new ObjectID(mongoose.Types.ObjectId(results[0]._id))
                                }
                                if (editedPars.table[i].idUser === '21') {
                                    editedPars.table[i].idUser = new ObjectID(mongoose.Types.ObjectId(results[1]._id))
                                }
                                if (editedPars.table[i].idUser === '23') {
                                    editedPars.table[i].idUser = new ObjectID(mongoose.Types.ObjectId(results[2]._id))
                                }
                            }

                            collection = db.collection("audience");

                            collection.find().toArray(function (err, results) {
                                for (let i = 0; i < editedPars.table.length; i++) {
                                    if (editedPars.table[i].idAudience == "219")
                                        editedPars.table[i].idAudience = new ObjectID(mongoose.Types.ObjectId(results[0]._id))

                                    else if (editedPars.table[i].idAudience == "219a")
                                        editedPars.table[i].idAudience = new ObjectID(mongoose.Types.ObjectId(results[1]._id))

                                    else if (editedPars.table[i].idAudience == "221")
                                        editedPars.table[i].idAudience = new ObjectID(mongoose.Types.ObjectId(results[2]._id))

                                    else if (editedPars.table[i].idAudience == "223")
                                        editedPars.table[i].idAudience = new ObjectID(mongoose.Types.ObjectId(results[3]._id))

                                    else if (editedPars.table[i].idAudience == "224")
                                        editedPars.table[i].idAudience = new ObjectID(mongoose.Types.ObjectId(results[4]._id))

                                    else if (editedPars.table[i].idAudience == "226")
                                        editedPars.table[i].idAudience = new ObjectID(mongoose.Types.ObjectId(results[5]._id))

                                    else if (editedPars.table[i].idAudience == "230")
                                        editedPars.table[i].idAudience = new ObjectID(mongoose.Types.ObjectId(results[6]._id))

                                }


                                for (let i = 0; i < editedPars.table.length; i++) {


                                    if (editedPars.table[i].idUser !== undefined) {
                                        if (editedPars.table[i].idUser.toString().length > 15) {
                                            formatPars.table.push(editedPars.table[i]);
                                        }
                                    }
                                }
                                console.log(formatPars.table)

                                fs.writeFile(__dirname + "/files/fixedFile.json", JSON.stringify(formatPars, null, 4), (err) => {
                                    if (err) {
                                        console.error(err);
                                        return;
                                    }
                                    console.log("File has been created");
                                });

                                client.close();
                            })

                        })
                    })
                })
            })
        })
    }
}
module.exports = {
    gW: globalObject
}
