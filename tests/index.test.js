const { Pos } = require("../dist/index.js");

const { arrayEquals } = require("../utils.js");

const START_FEN_STANDARD = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"

const pos = Pos()

const startRawLegalUcis = [
    'b1a3', 'b1c3', 'g1f3',
    'g1h3', 'a2a3', 'a2a4',
    'b2b3', 'b2b4', 'c2c3',
    'c2c4', 'd2d3', 'd2d4',
    'e2e3', 'e2e4', 'f2f3',
    'f2f4', 'g2g3', 'g2g4',
    'h2h3', 'h2h4'
]

test('standard starting fen should be ' + START_FEN_STANDARD, () => {
    expect(pos.reportFen()).toBe(START_FEN_STANDARD);
});

test('start raw legal ucis should be ' + startRawLegalUcis, () => {
    expect(arrayEquals(pos.rawLegalUcis(), startRawLegalUcis)).toBe(true);
});