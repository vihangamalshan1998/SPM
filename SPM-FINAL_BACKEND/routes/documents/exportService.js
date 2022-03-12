const xlsx = require('xlsx');
const path = require('path');

const exportExcel = (data, workSheetColumnNames, workSheetName, filePath) => {
    const workBook = xlsx.utils.book_new();
    const workSheetData = [
        workSheetColumnNames,
        ... data
    ];
    const workSheet = xlsx.utils.aoa_to_sheet(workSheetData);
    xlsx.utils.book_append_sheet(workBook, workSheet, workSheetName);
    xlsx.writeFile(workBook, path.resolve(filePath));
}

const exportUsersToExcel = (teachers, workSheetColumnNames, workSheetName, filePath) => {
    const data = teachers.map(teacher => {
        return [teacher.teacher_ID, teacher.teacher_Name, teacher.email, teacher.NIC, teacher.allocated_Grade, teacher.description];
    });
    exportExcel(data, workSheetColumnNames, workSheetName, filePath);
}

module.exports = exportUsersToExcel;