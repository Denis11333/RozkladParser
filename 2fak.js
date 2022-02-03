let XLSX = require('xlsx')
let workbook = XLSX.readFile('C:\\Users\\user\\Desktop\\lesson2.xls')
let worksheet = workbook.Sheets[workbook.SheetNames[0]]

let coordinatesOfAllGroups = [11, 15, 19, 23, 27, 31, 35, 39, 43, 47, 51, 60, 64, 68, 72, 76, 80, 84, 88, 92, 96, 100, 104, 108, 116, 120, 124, 128, 132, 136, 140, 144, 148, 152, 156
    , 160, 169, 173, 177, 181, 185, 189, 193, 197, 201, 205, 209, 213, 222, 226, 230, 234, 238, 242, 246, 250];
let audiencesWeNeed = [219, '223*', '221*', '224', '226*', '230*', '219а'];
let coordinatesOfDates = ['J', 'R', 'Z', 'AH', 'AP', 'AW']
let datesOfLessons = [6];
let checkedAudience;

for (let i = 0; i < coordinatesOfDates.length; i++) {
    datesOfLessons[i] = worksheet[`${coordinatesOfDates[i]}${6}`].w;
    console.log(datesOfLessons[i])
}

for (let i = 0; i < coordinatesOfAllGroups.length; i++) {

    console.log(coordinatesOfAllGroups[i] + ' //////////////');

    for (let j = 65; j < 91; j++) {
        if (worksheet[`${String.fromCharCode(j)}${coordinatesOfAllGroups[i]}`] != null) {
            checkedAudience = worksheet[`${String.fromCharCode(j)}${coordinatesOfAllGroups[i]}`].v;
            for (let k = 0; k < audiencesWeNeed.length; k++) {
                if (checkedAudience === audiencesWeNeed[k]) {
                    
                    let dateOfLesson = '';
                    if (j <= 76)
                        dateOfLesson = datesOfLessons[0];
                    if (j <= 84 && j >= 77)
                        dateOfLesson = datesOfLessons[1];
                    if (j > 84)
                        dateOfLesson = datesOfLessons[2];

                    if (worksheet[`${String.fromCharCode(j)}${coordinatesOfAllGroups[i] - 3}`] != null) {

                        let numberGroup = worksheet[`BA${coordinatesOfAllGroups[i]}`].v;
                        let subject = worksheet[`${String.fromCharCode(j)}${coordinatesOfAllGroups[i] - 3}`].v;
                        let type = worksheet[`${String.fromCharCode((j + 1))}${coordinatesOfAllGroups[i] - 3}`].v;
                        let teacher = worksheet[`${String.fromCharCode(j)}${coordinatesOfAllGroups[i] - 2}`].v;
                        let numberLesson = worksheet[`${String.fromCharCode(j)}${7}`].v;

                        console.log('group : '
                            + numberGroup
                            + ' audiencesWeNeed ' + checkedAudience + ' subject ' +
                            subject +
                            ' type ' + type +
                            ' teacher ' + teacher +
                            ' para numb : ' + numberLesson +
                            ' coordinatesOfDates : ' + dateOfLesson)

                    } else {
                        console.log('group : ' + worksheet[`BA${coordinatesOfAllGroups[i]}`].v + ' audiencesWeNeed ' + checkedAudience + ' subject sampo ' + ' teacher ' + worksheet[`${String.fromCharCode(j)}${coordinatesOfAllGroups[i] - 1}`].v
                            + ' para number : ' + worksheet[`${String.fromCharCode(j)}${7}`].v + ' coordinatesOfDates ' + dateOfLesson)
                    }
                }
            }
        }
    }

    for (let j = 65; j < 91; j++) {
        if (worksheet[`${String.fromCharCode(65, j)}${coordinatesOfAllGroups[i]}`] != null) {
            checkedAudience = worksheet[`${String.fromCharCode(65, j)}${coordinatesOfAllGroups[i]}`].v;
            for (let k = 0; k < audiencesWeNeed.length; k++) {
                if (checkedAudience === audiencesWeNeed[k]) {

                    let dateOfLesson = '';
                    if (j <= 76)
                        dateOfLesson = datesOfLessons[3];
                    if (j <= 84 && j >= 77)
                        dateOfLesson = datesOfLessons[4];
                    if (j > 84)
                        dateOfLesson = datesOfLessons[5];

                    if (worksheet[`${String.fromCharCode(65, j)}${coordinatesOfAllGroups[i] - 3}`] != null) {

                       let numberGroup = worksheet[`BA${coordinatesOfAllGroups[i]}`].v;
                       let subject = worksheet[`${String.fromCharCode(65, j)}${coordinatesOfAllGroups[i] - 3}`].v;
                       let type = worksheet[`${String.fromCharCode(65, j + 1)}${coordinatesOfAllGroups[i] - 3}`].v;
                       let teacher = worksheet[`${String.fromCharCode(65, j)}${coordinatesOfAllGroups[i] - 2}`].v;
                       let numberLesson = worksheet[`${String.fromCharCode(65, j)}${7}`].v;

                        console.log('group : '
                            + numberGroup
                            + ' audiencesWeNeed ' + checkedAudience + ' subject ' +
                            subject +
                            ' type ' + type +
                            ' teacher ' + teacher +
                            ' para numb : ' + numberLesson +
                            ' coordinatesOfDates : ' + dateOfLesson)

                    } else {
                        console.log('group : ' + worksheet[`BA${coordinatesOfAllGroups[i]}`].v + ' audiencesWeNeed ' + checkedAudience + ' subject sampo ' + ' teacher ' +
                            worksheet[`${String.fromCharCode(65, j)}${coordinatesOfAllGroups[i] - 1}`].v + ' para numb : ' + worksheet[`${String.fromCharCode(65, j)}${7}`].v
                            + ' coordinatesOfDates ' + dateOfLesson)
                    }
                }
            }
        }
    }
}