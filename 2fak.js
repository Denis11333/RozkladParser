let XLSX = require('xlsx')
let fs = require('fs')

let workbook = XLSX.readFile('C:\\Users\\user\\Desktop\\lesson2.xls')
let worksheet = workbook.Sheets[workbook.SheetNames[0]]

let listJson = {
    table: []
};

let coordinatesOfAllGroups = [11, 15, 19, 23, 27, 31, 35, 39, 43, 47, 51, 60, 64, 68, 72, 76, 80, 84, 88, 92, 96, 100, 104, 108, 116, 120, 124, 128, 132, 136, 140, 144, 148, 152, 156
    , 160, 169, 173, 177, 181, 185, 189, 193, 197, 201, 205, 209, 213, 222, 226, 230, 234, 238, 242, 246, 250];

let audiencesWeNeed = [219, '223*', '221*', '224', '226*', '230*', '219а', 132, 134, 135, 138, 141, 142, 145, 147, 150, '133*'];

let coordinatesOfDates = ['J', 'R', 'Z', 'AH', 'AP', 'AW']
let datesOfLessons = [6];
let checkedAudience;

for (let i = 0; i < coordinatesOfDates.length; i++) {
    datesOfLessons[i] = worksheet[`${coordinatesOfDates[i]}${6}`].w;
}

let numberLesson
let teacher;
let subject
let type
let numberGroup;
let department;

for (let i = 0; i < coordinatesOfAllGroups.length; i++) {


    for (let j = 69; j < 91; j++) {
        if (worksheet[`${String.fromCharCode(j)}${coordinatesOfAllGroups[i]}`] != null) {
            checkedAudience = worksheet[`${String.fromCharCode(j)}${coordinatesOfAllGroups[i]}`].v;
            // for (let k = 0; k < audiencesWeNeed.length; k++) {
            //     if (checkedAudience === audiencesWeNeed[k]) {

            let dateOfLesson = '';
            if (j <= 76)
                dateOfLesson = datesOfLessons[0];
            if (j <= 84 && j >= 77)
                dateOfLesson = datesOfLessons[1];
            if (j > 84)
                dateOfLesson = datesOfLessons[2];

            numberGroup = worksheet[`BA${coordinatesOfAllGroups[i]}`].v;
            if (worksheet[`${String.fromCharCode(j)}${7}`] === undefined) {
                numberLesson = worksheet[`${String.fromCharCode(j - 1)}${7}`].v
            } else {
                numberLesson = worksheet[`${String.fromCharCode(j)}${7}`].v
            }

            if (worksheet[`${String.fromCharCode(j)}${coordinatesOfAllGroups[i] - 3}`] != null) {
                if (j % 2 != 0) {
                    subject = worksheet[`${String.fromCharCode(j)}${coordinatesOfAllGroups[i] - 3}`].v;
                    type = worksheet[`${String.fromCharCode(j + 1)}${coordinatesOfAllGroups[i] - 3}`] === undefined
                        ? worksheet[`${String.fromCharCode(j)}${coordinatesOfAllGroups[i] - 3}`].v
                        : worksheet[`${String.fromCharCode(j + 1)}${coordinatesOfAllGroups[i] - 3}`].v;

                    teacher = worksheet[`${String.fromCharCode(j)}${coordinatesOfAllGroups[i] - 2}`] === undefined
                        ? worksheet[`${String.fromCharCode(j - 1)}${coordinatesOfAllGroups[i] - 2}`].v :
                        worksheet[`${String.fromCharCode(j)}${coordinatesOfAllGroups[i] - 2}`].v;
                } else {
                    subject = worksheet[`${String.fromCharCode(j - 1)}${coordinatesOfAllGroups[i] - 3}`].v;
                    type = worksheet[`${String.fromCharCode(j)}${coordinatesOfAllGroups[i] - 3}`].v
                    teacher = worksheet[`${String.fromCharCode(j - 1)}${coordinatesOfAllGroups[i] - 1}`] === undefined
                        ? worksheet[`${String.fromCharCode(j - 1)}${coordinatesOfAllGroups[i] - 2}`].v :
                        worksheet[`${String.fromCharCode(j - 1)}${coordinatesOfAllGroups[i] - 1}`].v;
                }


            } else {

                let index;

                // поскольку кафедру в блоке с сампо не показывает вытягваем через аудиторию
                for (let l = 0; l < audiencesWeNeed.length; l++) {
                    if (checkedAudience === audiencesWeNeed[l]) {
                        if (l < 6) {
                            index = '22'
                        }
                        if (l > 6 && l < 16) {
                            index = '23'
                        }
                        if (l > 16) {
                            index = '21'
                        }
                    }
                }

                subject = 'CP';
                type = 'CP';
                department = index;
                teacher = worksheet[`${String.fromCharCode(j)}${coordinatesOfAllGroups[i] - 1}`].v;

            }

            // обрезаем * ( ну блять так храняться номера аудиторий в БД)
            if (checkedAudience.length > 3) {
                if (checkedAudience != '219а' && !isNaN(checkedAudience.charAt(0))) {
                    checkedAudience = checkedAudience.substring(0, 3);
                }
                if (checkedAudience === 'спорт') {
                    checkedAudience += ' міст'
                    j += 2;
                }
            }

            if (type.length > 2) {
                if (type.substring(type.length - 1, type.length) === 'л') {
                    type = type.substring(type.length - 1, type.length).toUpperCase();
                } else {
                    type = type.substring(type.length - 2, type.length).toUpperCase();
                }
            } else {
                type = type.toUpperCase();
            }

            if (!isNaN(subject.charAt(0))) {
                department = subject.substring(0, 2)
                if (isNaN(department.charAt(1))) {
                    department = subject.charAt(0);
                }


                if (isNaN(subject.charAt(1))) {
                    subject = subject.substring(1, subject.length);
                } else {
                    subject = subject.substring(2, subject.length);
                }
            }

            // Проверяем на кафедры ( что бы сьедало только их )
            // if (checkedAudience !== '133') {
            //     if (department !== '21' && department !== '22' && department !== '23') {
            //         break;
            //     }
            // }

            listJson.table.push({
                numberGroup: numberGroup,
                department: department,
                subject: subject,
                checkedAudience: checkedAudience,
                type: type,
                teacher: teacher,
                numberLesson: numberLesson === 'I' ? 1 : numberLesson === 'II' ? 2 : numberLesson === 'III' ? 3 : numberLesson
                === 'IV' ? 4 : numberLesson,
                dateOfLesson: dateOfLesson
            })
        }

    }
    // }


// второй for аналогичен первому
    for (let j = 65; j < 91; j++) {
        if (worksheet[`${String.fromCharCode(65, j)}${coordinatesOfAllGroups[i]}`] != null) {
            checkedAudience = worksheet[`${String.fromCharCode(65, j)}${coordinatesOfAllGroups[i]}`].v;
            // for (let k = 0; k < audiencesWeNeed.length; k++) {
            // if (checkedAudience === audiencesWeNeed[k]) {

            let dateOfLesson = '';
            if (j <= 74)
                dateOfLesson = datesOfLessons[3];
            if (j <= 82 && j >= 75)
                dateOfLesson = datesOfLessons[4];
            if (j >= 83)
                dateOfLesson = datesOfLessons[5];

            numberGroup = worksheet[`BA${coordinatesOfAllGroups[i]}`].v;

            if (worksheet[`${String.fromCharCode(65, j)}${7}`] === undefined) {
                numberLesson = worksheet[`${String.fromCharCode(65, j - 1)}${7}`].v
            } else {
                numberLesson = worksheet[`${String.fromCharCode(65, j)}${7}`].v
            }

            if (worksheet[`${String.fromCharCode(65, j)}${coordinatesOfAllGroups[i] - 3}`] != null) {
                if (j % 2 != 0) {

                    subject = worksheet[`${String.fromCharCode(65, j)}${coordinatesOfAllGroups[i] - 3}`].v;

                    type = worksheet[`${String.fromCharCode(65, j + 1)}${coordinatesOfAllGroups[i] - 3}`] === undefined
                        ? worksheet[`${String.fromCharCode(65, j)}${coordinatesOfAllGroups[i] - 3}`].v
                        : worksheet[`${String.fromCharCode(65, j + 1)}${coordinatesOfAllGroups[i] - 3}`].v;

                    teacher = worksheet[`${String.fromCharCode(65, j)}${coordinatesOfAllGroups[i] - 2}`] === undefined
                        ? worksheet[`${String.fromCharCode(65, j - 1)}${coordinatesOfAllGroups[i] - 2}`].v :
                        worksheet[`${String.fromCharCode(65, j)}${coordinatesOfAllGroups[i] - 2}`].v;
                    if (subject === 'спорт') {
                        console.log('ok')
                        subject += ' міст'
                        j += 2;
                    }

                } else {
                    subject = worksheet[`${String.fromCharCode(65, j - 1)}${coordinatesOfAllGroups[i] - 3}`].v;
                    type = worksheet[`${String.fromCharCode(65, j)}${coordinatesOfAllGroups[i] - 3}`].v
                    teacher = worksheet[`${String.fromCharCode(65, j - 1)}${coordinatesOfAllGroups[i] - 1}`] === undefined
                        ? worksheet[`${String.fromCharCode(65, j - 1)}${coordinatesOfAllGroups[i] - 2}`].v :
                        worksheet[`${String.fromCharCode(65, j - 1)}${coordinatesOfAllGroups[i] - 1}`].v;
                }
            } else {

                let index;
                for (let l = 0; l < audiencesWeNeed.length; l++) {
                    if (checkedAudience === audiencesWeNeed[l]) {
                        if (l < 6) {
                            index = '22'
                        }
                        if (l > 6 && l < 16) {
                            index = '23';
                        }
                        if (l > 16) {
                            index = '21'
                        }
                        break;
                    }
                }
                department = index;
                subject = 'CP';
                type = 'CP';
                teacher = worksheet[`${String.fromCharCode(65, j)}${coordinatesOfAllGroups[i] - 1}`].v;

            }


            if (checkedAudience.length > 3) {
                if (checkedAudience.charAt(4) != 'а') {
                    checkedAudience = checkedAudience.substring(0, 3);
                }
                if (checkedAudience === 'спорт') {
                    checkedAudience += ' міст'
                    j += 2;
                }
            }

            if (type.length > 2) {
                if (type.substring(type.length - 1, type.length) === 'л') {
                    type = type.substring(type.length - 1, type.length).toUpperCase();
                } else {
                    type = type.substring(type.length - 2, type.length).toUpperCase();
                }
            } else {
                type = type.toUpperCase();
            }

            // if (type.substring(type.length - 1, type.length) === 'л' && type.length > 2) {
            //     type = type.substring(type.length - 1, type.length).toUpperCase();
            // } else {
            //     type = type.substring(type.length - 2, type.length).toUpperCase();
            // }

            if (!isNaN(subject.charAt(0))) {
                department = subject.substring(0, 2)
                if (isNaN(department.charAt(1))) {
                    department = subject.charAt(0);
                }


                if (isNaN(subject.charAt(1))) {
                    subject = subject.substring(1, subject.length);
                } else {
                    subject = subject.substring(2, subject.length);
                }
            }
            // department = subject.substring(0, 2)
            // if (isNaN(department.charAt(1))) {
            //     department = subject.charAt(0);
            // }
            // if (isNaN(subject.charAt(1))) {
            //     subject = subject.substring(1, subject.length);
            // } else {
            //     subject = subject.substring(2, subject.length);
            // }
            //
            // if (checkedAudience !== '133') {
            //     if (department !== '21' && department !== '22' && department !== '23') {
            //         break;
            //     }
            // }

            listJson.table.push({
                numberGroup: numberGroup,
                department: department,
                subject: subject,
                checkedAudience: checkedAudience,
                type: type,
                teacher: teacher,
                numberLesson: numberLesson === 'I' ? 1 : numberLesson === 'II' ? 2 : numberLesson === 'III' ? 3 : numberLesson
                === 'IV' ? 4 : numberLesson,
                dateOfLesson: dateOfLesson
            })
        }

        // }
        // }
    }
}

fs.writeFile("pars.json", JSON.stringify(listJson, null, 4), (err) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log("File has been created");
});
// const MongoClient = require("mongodb").MongoClient;
//
// const url = "mongodb://localhost:27017/";
// const mongoClient = new MongoClient(url);
//
// let users = JSON.stringify(listJson.table);
//
// mongoClient.connect(function (err, client) {
//
//     const db = client.db("kafedra");
//     const collection = db.collection("lesson");
//
//     collection.insertMany(listJson.table, function (err, results) {
//
//         console.log(results);
//         client.close();
//     });
// })
