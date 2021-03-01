'use strict';

/**
 * it makes a fucking box
 * @param str the string to go in the box
 * @returns {string} a discord copypasta that makes a goddamn box
 */
function makeBox(str) {
    const BOX_WIDTH = 3;
    const totalSpace = BOX_WIDTH - str.length;
    const paddedStr = str.padStart((totalSpace / 2) + str.length, ' ').padEnd(BOX_WIDTH);
    return `||\`${paddedStr}\`|| `;
}

/**
 * renders a playfield into discord copypasta
 * @param field the playfield
 * @returns {string} the copypasta
 */
function renderPlayfield(field) {
    let str = "";
    for(let row = 0; row < field.length; row++) {
        for(let col = 0; col < field[row].length; col++) {
            str += makeBox(field[row][col]);
        }
        str += "\n";
    }
    return str;
}

/**
 * generates a playfield
 * @param cols i wonder what
 * @param rows these could mean
 * @returns {[]} 2d array rep'ing the playfield, empty
 */
function generatePlayfield(cols, rows) {
    let playfield = [];

    for(let row = 0; row < rows; row++) {
        playfield[row] = [];
        for(let col = 0; col < cols; col++) {
            playfield[row][col] = "";
        }
    }

    return playfield;
}

/**
 * So now we have a function to place a bomb.
 * @param playfield that danged playfield again this should be a class variable
 * @param row what is this
 * @param col what could it be???
 */
function placeBomb(playfield, row, col) {
    playfield[row][col] = ":'(";
    for (let i = row - 1; i < row + 2; i++) {
        if (i < 0 || i > playfield.length-1) continue;
        for (let j = col - 1; j < col + 2; j++) {
            if (j < 0 || j > playfield[i].length-1) continue;
            const val = playfield[i][j];

            // Check its not also a bomb
            if (val === ":'(") continue;

            // Increment
            console.log(i, j, val);
            playfield[i][j] = (parseInt(val || 0) + 1).toString();
            console.log(playfield[i][j]);
        }
    }
}

/**
 * Generates randomized bomb locations.
 * @param playfield the danged playfield
 * @param bombcount how many bombizzles, if you go over the size of the playfield you'll crash
 */
function placeBombs(playfield, bombcount) {
    for(let i = 0; i < bombcount; i++) {
        let attempts = 0;
        while(attempts < 10) {
            const bombRow = Math.floor(Math.random() * playfield.length);
            const bombCol = Math.floor(Math.random() * playfield[bombRow].length);

            if (playfield[bombRow][bombCol] === "") {
                placeBomb(playfield, bombRow, bombCol);
                attempts = 11;
            }

            attempts++;
        }
    }
}

window.goMakeStuff = () => {
    const bombCount = parseInt(document.getElementById('bombcount').value);
    const colCount = parseInt(document.getElementById('colcount').value);
    const rowCount = parseInt(document.getElementById('rowcount').value);
    const output = document.getElementById('copypasta');

    let playfield = generatePlayfield(colCount, rowCount);
    placeBombs(playfield, bombCount);
    output.value = renderPlayfield(playfield);
    return false;
}

/**
 1  :'(  2   1   2   1   1
 1   1   2  :'(  2  :'(  1
 1   1   2   1   1
 1   1   1                   1   1
 1  :'(  1       1   1   1   1  :'(
 2   2   1       1  :'(  1   2   2
 :'(  1           2   2   2   1  :'(
 1   1           1  :'(  1   1   1
 1   1   1
*/