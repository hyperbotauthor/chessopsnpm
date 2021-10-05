const { Pos } = require("../dist/index.js")

const START_FEN_STANDARD = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"

const pos = Pos()

test('standard starting fen should be ' + START_FEN_STANDARD, () => {
    expect(pos.reportFen()).toBe(START_FEN_STANDARD);
});
