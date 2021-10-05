const { Pos } = require("./dist/index.js")

const START_FEN_STANDARD = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"

const pos = Pos()

console.log(pos.rawLegalUcis())

