const { Pos } = require("./dist/index.js")

const START_FEN_STANDARD = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"

const pos = Pos()

pos.setFen("rn2kbnr/p1Pppppp/b7/8/8/8/PPP1PPPP/RNBQKBNR w KQkq - 1 5")

console.log(pos.allLegalSans())