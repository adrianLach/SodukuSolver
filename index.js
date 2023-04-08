var getSudoku = function () {
    var _a, _b;
    var sudokuMap;
    sudokuMap = new Array();
    for (var r = 0; r < 9; r++) {
        sudokuMap.push(new Array());
        var row = document.querySelector("#row".concat(r + 1));
        for (var i = 0; i < 9; i++) {
            sudokuMap[r].push(+((_b = (_a = row === null || row === void 0 ? void 0 : row.querySelector("#field".concat(i + 1))) === null || _a === void 0 ? void 0 : _a.querySelector('.fieldInput')) === null || _b === void 0 ? void 0 : _b.value));
        }
    }
    return sudokuMap;
};
var solveHuman = function () {
    var sudokuMap = getSudoku();
    for (var row = 0; row < 9; row++) {
        for (var i = 1; i <= 9; i++) {
        }
    }
};
var solveBacktracking = function () {
    var start = new Date().getTime();
    solvesolveBacktrackingForRC(0, 0);
    var end = new Date().getTime();
    console.log("Solved in ".concat(end - start, " milliseconds!"));
};
var solvesolveBacktrackingForRC = function (r, c) {
    var sudokuMap = getSudoku();
    if (c == 9) {
        c = 0;
        r++;
    }
    if (r == 9)
        return true;
    if (sudokuMap[r][c] !== 0)
        return solvesolveBacktrackingForRC(r, c + 1);
    for (var i = 1; i <= 9; i++) {
        sudokuMap[r][c] = i;
        setSudoku(sudokuMap, false);
        if (isFieldValid(r, c)) {
            if (solvesolveBacktrackingForRC(r, c + 1)) {
                return true;
            }
        }
    }
    return false;
};
var setSudoku = function (sudokuMap, disableFilled) {
    var _a, _b, _c, _d;
    for (var r = 0; r < 9; r++) {
        var row = document.querySelector("#row".concat(r + 1));
        for (var i = 0; i < 9; i++) {
            (_b = (_a = row === null || row === void 0 ? void 0 : row.querySelector("#field".concat(i + 1))) === null || _a === void 0 ? void 0 : _a.querySelector('.fieldInput')) === null || _b === void 0 ? void 0 : _b.setAttribute('value', sudokuMap[r][i] > 0 ? sudokuMap[r][i].toString() : '');
            if (sudokuMap[r][i] > 0 && disableFilled)
                (_d = (_c = row === null || row === void 0 ? void 0 : row.querySelector("#field".concat(i + 1))) === null || _c === void 0 ? void 0 : _c.querySelector('.fieldInput')) === null || _d === void 0 ? void 0 : _d.setAttribute('disabled', '');
        }
    }
};
var isFieldValid = function (r, c) {
    return isRowValid(r) && isColValid(c) && isCellValid(r, c);
};
var isSudokuValid = function () {
    var sudokuMap = getSudoku();
    var valid = true;
    sudokuMap.forEach(function (e, i) { return e.forEach(function (b, j) { valid = valid && isFieldValid(i, j); }); });
    return valid;
};
var isRowValid = function (row) {
    var sudokuMap = getSudoku();
    for (var i = 1; i <= 9; i++) {
        var count = 0;
        sudokuMap[row].forEach(function (e) {
            count += (e == i ? 1 : 0);
        });
        if (count > 1)
            return false;
    }
    return true;
};
var isColValid = function (col) {
    var sudokuMap = getSudoku();
    for (var i = 1; i <= 9; i++) {
        var count = 0;
        sudokuMap.forEach(function (e) {
            count += (e[col] == i ? 1 : 0);
        });
        if (count > 1)
            return false;
    }
    return true;
};
var isCellValid = function (r, c) {
    var sudokuMap = getSudoku();
    var cell = { r: Math.floor(r / 3) * 3, c: Math.floor(c / 3) * 3 };
    for (var i = 1; i <= 9; i++) {
        var count = 0;
        for (var row = cell.r; row < cell.r + 3; row++) {
            for (var col = cell.c; col < cell.c + 3; col++) {
                count += (sudokuMap[row][col] == i ? 1 : 0);
            }
        }
        if (count > 1)
            return false;
    }
    return true;
};
var generateSudoku = function () {
    var sudokuMap;
    sudokuMap = new Array();
    var ran = function () { return Math.ceil(Math.random() * 9); };
    sudokuMap.push([ran(), 0, 0, 0, 0, 0, 0, 0, 0]);
    sudokuMap.push([0, 0, 0, ran(), 0, 0, 0, 0, 0]);
    sudokuMap.push([0, 0, 0, 0, 0, 0, ran(), 0, 0]);
    sudokuMap.push([0, ran(), 0, 0, 0, 0, 0, 0, 0]);
    sudokuMap.push([0, 0, 0, 0, ran(), 0, 0, 0, 0]);
    sudokuMap.push([0, 0, 0, 0, 0, 0, 0, ran(), 0]);
    sudokuMap.push([0, 0, ran(), 0, 0, 0, 0, 0, 0]);
    sudokuMap.push([0, 0, 0, 0, 0, ran(), 0, 0, 0]);
    sudokuMap.push([0, 0, 0, 0, 0, 0, 0, 0, ran()]);
    setSudoku(sudokuMap, false);
    solveBacktracking();
    sudokuMap = getSudoku();
    for (var r = 0; r < 9; r++) {
        for (var c = 0; c < 9; c++) {
            if (Math.random() >= 0.4) {
                sudokuMap[r][c] = 0;
            }
        }
    }
    setSudoku(sudokuMap, true);
    document.querySelectorAll('.fieldInput').forEach(function (e) { return e.onchange = function (ev) {
        var field = e.parentElement;
        var row = field === null || field === void 0 ? void 0 : field.parentElement;
        var r = row === null || row === void 0 ? void 0 : row.id.replace('row', '');
        var c = field === null || field === void 0 ? void 0 : field.id.replace('field', '');
        if (!isFieldValid(parseInt(r) - 1, parseInt(c) - 1)) {
            console.log({ r: r, c: c });
            e.style.backgroundColor = 'red';
        }
        else
            e.style.backgroundColor = 'white';
    }; });
};