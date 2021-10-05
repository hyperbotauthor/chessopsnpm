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

const c7b8Legals = ["c7b8q", "c7b8r", "c7b8b", "c7b8n"]
const c7c8Legals = ["c7c8q", "c7c8r", "c7c8b", "c7c8n"]

test('legal ucis for c7b8 should be ' + c7b8Legals, () => {
    // pawn can promote with capture on b8 or by push on c8
    pos.setFen("rn2kbnr/p1Pppppp/b7/8/8/8/PPP1PPPP/RNBQKBNR w KQkq - 1 5")
    expect(arrayEquals(pos.legalsForUci("c7b8"), c7b8Legals)).toBe(true);
});

test('legal ucis for c7c8 should be ' + c7c8Legals, () => {
    // pawn can promote with capture on b8 or by push on c8
    pos.setFen("rn2kbnr/p1Pppppp/b7/8/8/8/PPP1PPPP/RNBQKBNR w KQkq - 1 5")
    expect(arrayEquals(pos.legalsForUci("c7c8"), c7c8Legals)).toBe(true);
});

test('legal ucis for a2a3 should be ' + ["a2a3"], () => {    
    // pawn can move one square
    pos.setFen("rn2kbnr/p1Pppppp/b7/8/8/8/PPP1PPPP/RNBQKBNR w KQkq - 1 5")
    expect(arrayEquals(pos.legalsForUci("a2a3"), ["a2a3"])).toBe(true);
});

test('legal ucis for a2a5 should be ' + [], () => {    
    // pawn cannot move three squares
    pos.setFen("rn2kbnr/p1Pppppp/b7/8/8/8/PPP1PPPP/RNBQKBNR w KQkq - 1 5")
    expect(arrayEquals(pos.legalsForUci("a2a5"), [])).toBe(true);
});

const allLegalSans = [
    'Nd2',     'Na3',    'Nc3',    'Bd2',
    'Be3',     'Bf4',    'Bg5',    'Bh6',
    'Qd2',     'Qd3',    'Qd4',    'Qd5',
    'Qd6',     'Qxd7+',  'Kd2',    'Nf3',
    'Nh3',     'a3',     'a4',     'b3',
    'b4',      'c3',     'c4',     'e3',
    'e4',      'f3',     'f4',     'g3',
    'g4',      'h3',     'h4',     'cxb8=Q+',
    'cxb8=R+', 'cxb8=B', 'cxb8=N', 'c8=Q+',
    'c8=R+',   'c8=B',   'c8=N'
  ]

  test('all legal sans should be ' + allLegalSans, () => {
    // pawn can promote with capture on b8 or by push on c8
    pos.setFen("rn2kbnr/p1Pppppp/b7/8/8/8/PPP1PPPP/RNBQKBNR w KQkq - 1 5")
    expect(arrayEquals(pos.allLegalSans(), allLegalSans)).toBe(true);
});