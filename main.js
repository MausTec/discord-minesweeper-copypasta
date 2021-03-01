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
    return `||\`${paddedStr}\`||`;
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

function placeBombs(playfield, bombcount) {
    for(var i = 0; i < bombcount; i++) {
        let placed = false;
        while(!placed) {
            const bombRow = Math.floor(Math.random() * playfield.length);
            const bombCol = Math.floor(Math.random() * playfield[bombRow].length);

            if (playfield[bombRow][bombCol] === "") {
                playfield[bombRow][bombCol] = ":'(";
                placed = true;
            }
        }
    }
}

let cols = 9;
let rows = 9;
let bombs = 9;

let playfield = generatePlayfield(cols, rows);
placeBombs(playfield, bombs);

console.log(renderPlayfield(playfield));

/**
 *
 **There are 6 mines.**

 ||`   `||||`   `||||`   `||||`   `||||`   `||||` 1 `||||` 2 `||||`:'(`||||`   `||
 ||`   `||||`   `||||`   `||||`   `||||`   `||||` 2 `||||`:'(`||||` 3 `||||`   `||
 ||`   `||||`   `||||`   `||||` 1 `||||` 1 `||||` 3 `||||`:'(`||||` 2 `||||`   `||
 ||`   `||||`   `||||`   `||||` 1 `||||`:'(`||||` 2 `||||` 1 `||||` 1 `||||`   `||
 ||` 1 `||||` 1 `||||` 1 `||||` 1 `||||` 1 `||||` 1 `||||` 1 `||||` 1 `||||` 1 `||
 ||` 1 `||||`:'(`||||` 1 `||||`   `||||`   `||||`   `||||` 1 `||||`:'(`||||` 1 `||
 ||` 1 `||||` 1 `||||` 1 `||||`   `||||`   `||||`   `||||` 1 `||||` 1 `||||` 1 `||
 ||`   `||||`   `||||`   `||||`   `||||`   `||||`   `||||`   `||||`   `||||`   `||
 ||`   `||||`   `||||`   `||||`   `||||`   `||||`   `||||`   `||||`   `||||`   `||

*/