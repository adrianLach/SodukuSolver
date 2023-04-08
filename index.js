var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
document.addEventListener("DOMContentLoaded", function () {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            generateSudoku();
            return [2 /*return*/];
        });
    });
});
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
var isHumanSolvable = function () {
    var sudokuMap = getSudoku();
    var numOfChanges = 0;
    do {
        numOfChanges = 0;
        for (var row = 0; row < 9; row++) {
            for (var col = 0; col < 9; col++) {
                var posNum = getSinglePossibleNumber(row, col);
                if (posNum !== 0) {
                    numOfChanges++;
                    sudokuMap[row][col] = posNum;
                    setSudoku(sudokuMap, false);
                }
            }
        }
    } while (numOfChanges > 0);
    return isSudokuValid() && isSudokuFilled();
};
var isSudokuFilled = function () {
    var solvable = true;
    getSudoku().forEach(function (e) { return e.forEach(function (i) {
        if (i === 0)
            solvable = false;
    }); });
    return solvable;
};
var getSinglePossibleNumber = function (r, c) {
    var sudokuMap = getSudoku();
    if (sudokuMap[r][c] !== 0)
        return 0;
    var posNumList = '';
    for (var i = 1; i <= 9; i++) {
        sudokuMap[r][c] = i;
        setSudoku(sudokuMap, false);
        if (isFieldValid(r, c)) {
            posNumList += i;
            continue;
        }
    }
    sudokuMap[r][c] = 0;
    setSudoku(sudokuMap, false);
    if (posNumList.length == 1)
        return +posNumList;
    return 0;
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
    var _a, _b;
    for (var r = 0; r < 9; r++) {
        var row = document.querySelector("#row".concat(r + 1));
        for (var i = 0; i < 9; i++) {
            ((_a = row === null || row === void 0 ? void 0 : row.querySelector("#field".concat(i + 1))) === null || _a === void 0 ? void 0 : _a.querySelector('.fieldInput')).value = sudokuMap[r][i] > 0 ? sudokuMap[r][i].toString() : '';
            if (sudokuMap[r][i] > 0 && disableFilled)
                ((_b = row === null || row === void 0 ? void 0 : row.querySelector("#field".concat(i + 1))) === null || _b === void 0 ? void 0 : _b.querySelector('.fieldInput')).disabled = true;
        }
    }
    return sudokuMap;
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
var clearSudoku = function () {
    var _a;
    var sudokuMap;
    sudokuMap = new Array();
    for (var i = 0; i < 9; i++)
        sudokuMap.push([0, 0, 0, 0, 0, 0, 0, 0, 0]);
    (_a = document.querySelectorAll('.fieldInput')) === null || _a === void 0 ? void 0 : _a.forEach(function (e) { return e.disabled = false; });
    setSudoku(sudokuMap, false);
};
var generateSudoku = function () {
    var _a;
    var sudokuMap;
    sudokuMap = new Array();
    var ran = function () { return Math.ceil(Math.random() * 9); };
    sudokuMap.push([ran(), 0, 0, 0, 0, 0, 0, 0, 0]);
    sudokuMap.push([0, 0, 0, ran(), 0, 0, 0, 0, 0]);
    sudokuMap.push([0, 0, 0, 0, 0, 0, ran(), 0, 0]);
    sudokuMap.push([0, 0, 0, 0, 0, 0, 0, 0, 0]);
    sudokuMap.push([0, 0, 0, 0, 0, 0, 0, 0, 0]);
    sudokuMap.push([0, 0, 0, 0, 0, 0, 0, 0, 0]);
    sudokuMap.push([0, 0, 0, 0, 0, 0, 0, 0, 0]);
    sudokuMap.push([0, 0, 0, 0, 0, 0, 0, 0, 0]);
    sudokuMap.push([0, 0, 0, 0, 0, 0, 0, 0, 0]);
    (_a = document.querySelectorAll('.fieldInput')) === null || _a === void 0 ? void 0 : _a.forEach(function (e) { return e.disabled = false; });
    setSudoku(sudokuMap, false);
    solveBacktracking();
    sudokuMap = getSudoku();
    for (var r = 0; r < 9; r++) {
        for (var c = 0; c < 9; c++) {
            var before = sudokuMap[r][c];
            if (Math.random() >= 0.4) {
                sudokuMap[r][c] = 0;
                var sudoku = setSudoku(sudokuMap, false);
                if (!isHumanSolvable()) {
                    sudokuMap[r][c] = before;
                }
                setSudoku(sudoku, false);
            }
        }
    }
    setSudoku(sudokuMap, true);
    document.querySelectorAll('.fieldInput').forEach(function (e) { return e.oninput = function (ev) {
        var field = e.parentElement;
        var row = field === null || field === void 0 ? void 0 : field.parentElement;
        var r = row === null || row === void 0 ? void 0 : row.id.replace('row', '');
        var c = field === null || field === void 0 ? void 0 : field.id.replace('field', '');
        if (+e.value < 1 || +e.value > 9) {
            e.value = '';
        }
        if (!isFieldValid(parseInt(r) - 1, parseInt(c) - 1)) {
            console.log({ r: r, c: c });
            e.style.backgroundColor = 'rgb(255, 101, 101)';
        }
        else
            e.style.backgroundColor = 'white';
    }; });
};
