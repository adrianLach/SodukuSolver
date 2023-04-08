document.addEventListener("DOMContentLoaded", function () {
    generateSudoku()
})

const getSudoku = () => {

    var sudokuMap: Array<Array<number>>
    sudokuMap = new Array()

    for (let r = 0; r < 9; r++) {

        sudokuMap.push(new Array())

        const row = document.querySelector(`#row${r + 1}`)

        for (let i = 0; i < 9; i++) {
            sudokuMap[r].push(+(row?.querySelector(`#field${i + 1}`)?.querySelector('.fieldInput') as HTMLInputElement)?.value!)
        }
    }

    return sudokuMap

}

const solveHuman = () => {

    const sudokuMap = getSudoku()

    for (var row = 0; row < 9; row++) {

        for (var i = 1; i <= 9; i++) {

        }

    }

}

const solveBacktracking = () => {

    const start = new Date().getTime()

    solvesolveBacktrackingForRC(0, 0)

    const end = new Date().getTime()

    console.log(`Solved in ${end - start} milliseconds!`)

}

const solvesolveBacktrackingForRC = (r: number, c: number) => {

    const sudokuMap = getSudoku()

    if (c == 9) {
        c = 0
        r++
    }

    if (r == 9)
        return true

    if (sudokuMap[r][c] !== 0)
        return solvesolveBacktrackingForRC(r, c + 1)

    for (var i = 1; i <= 9; i++) {

        sudokuMap[r][c] = i
        setSudoku(sudokuMap, false)

        if (isFieldValid(r, c)) {
            if (solvesolveBacktrackingForRC(r, c + 1)) {
                return true
            }
        }
    }
    return false

}

const setSudoku = (sudokuMap: Array<Array<number>>, disableFilled: boolean) => {

    for (let r = 0; r < 9; r++) {

        const row = document.querySelector(`#row${r + 1}`)

        for (let i = 0; i < 9; i++) {
            (row?.querySelector(`#field${i + 1}`)?.querySelector('.fieldInput') as HTMLInputElement).value = sudokuMap[r][i] > 0 ? sudokuMap[r][i].toString() : ''
            if (sudokuMap[r][i] > 0 && disableFilled)
                (row?.querySelector(`#field${i + 1}`)?.querySelector('.fieldInput') as HTMLInputElement).disabled = true
        }
    }
}

const isFieldValid = (r: number, c: number) => {
    return isRowValid(r) && isColValid(c) && isCellValid(r, c)
}

const isSudokuValid = () => {

    const sudokuMap = getSudoku()

    var valid = true

    sudokuMap.forEach((e, i) => e.forEach((b, j) => { valid = valid && isFieldValid(i, j) }))

    return valid

}

const isRowValid = (row: number) => {

    const sudokuMap = getSudoku()

    for (var i = 1; i <= 9; i++) {
        var count = 0
        sudokuMap[row].forEach((e) => {
            count += (e == i ? 1 : 0)
        })

        if (count > 1)
            return false
    }

    return true

}

const isColValid = (col: number) => {

    const sudokuMap = getSudoku()

    for (var i = 1; i <= 9; i++) {

        var count = 0

        sudokuMap.forEach((e) => {
            count += (e[col] == i ? 1 : 0)
        })

        if (count > 1)
            return false
    }

    return true

}

const isCellValid = (r: number, c: number) => {

    const sudokuMap = getSudoku()

    const cell = { r: Math.floor(r / 3) * 3, c: Math.floor(c / 3) * 3 }

    for (var i = 1; i <= 9; i++) {

        var count = 0

        for (var row = cell.r; row < cell.r + 3; row++) {
            for (var col = cell.c; col < cell.c + 3; col++) {
                count += (sudokuMap[row][col] == i ? 1 : 0)
            }
        }

        if (count > 1)
            return false
    }

    return true

}

const clearSudoku = () => {

    var sudokuMap: Array<Array<number>>
    sudokuMap = new Array()

    for (var i = 0; i < 9; i++)
        sudokuMap.push([0, 0, 0, 0, 0, 0, 0, 0, 0])

    document.querySelectorAll('.fieldInput')?.forEach(e => (e as HTMLInputElement).disabled = false)
    setSudoku(sudokuMap, false)
}

const generateSudoku = () => {

    var sudokuMap: Array<Array<number>>
    sudokuMap = new Array()

    const ran = () => Math.ceil(Math.random() * 9)

    sudokuMap.push([ran(), 0, 0, 0, 0, 0, 0, 0, 0])
    sudokuMap.push([0, 0, 0, ran(), 0, 0, 0, 0, 0])
    sudokuMap.push([0, 0, 0, 0, 0, 0, ran(), 0, 0])
    sudokuMap.push([0, 0, 0, 0, 0, 0, 0, 0, 0])
    sudokuMap.push([0, 0, 0, 0, 0, 0, 0, 0, 0])
    sudokuMap.push([0, 0, 0, 0, 0, 0, 0, 0, 0])
    sudokuMap.push([0, 0, 0, 0, 0, 0, 0, 0, 0])
    sudokuMap.push([0, 0, 0, 0, 0, 0, 0, 0, 0])
    sudokuMap.push([0, 0, 0, 0, 0, 0, 0, 0, 0])

    document.querySelectorAll('.fieldInput')?.forEach(e => (e as HTMLInputElement).disabled = false)
    setSudoku(sudokuMap, false)


    solveBacktracking()

    sudokuMap = getSudoku()

    for (var r = 0; r < 9; r++) {
        for (var c = 0; c < 9; c++) {
            if (Math.random() >= 0.4) {
                sudokuMap[r][c] = 0
            }
        }
    }

    setSudoku(sudokuMap, true)

    document.querySelectorAll<HTMLElement>('.fieldInput').forEach(e => (e as HTMLInputElement).oninput = (ev) => {
        const field = e.parentElement
        const row = field?.parentElement

        const r = row?.id.replace('row', '')
        const c = field?.id.replace('field', '')

        if (+(e as HTMLInputElement).value < 1 || +(e as HTMLInputElement).value > 9) {
            (e as HTMLInputElement).value = ''
        }

        if (!isFieldValid(parseInt(r!) - 1, parseInt(c!) - 1)) {
            console.log({ r, c })
            e.style.backgroundColor = 'rgb(255, 101, 101)'
        } else e.style.backgroundColor = 'white'

    })

}