import {Chess} from "../chessops/chess"

import {Atomic, Antichess, Crazyhouse, Horde, KingOfTheHill, RacingKings, ThreeCheck} from "../chessops/variant"

import {parseSan, makeSan} from "../chessops/san"

import {makeFen, parseFen} from "../chessops/fen"

import {parseUci, makeUci} from "../chessops/util";

import { chessgroundDests as chessgroundDests_} from "../chessops/compat";

const PROMOTION_PIECES = ["q", "r", "b", "n", "k"]
const PROMOTION_PIECES_EXT = [""].concat(PROMOTION_PIECES)

export const chessgroundDests = pos => pos.chessgroundDests()

// Pos_ is an abstraction of a chess position
export class Pos_{
    constructor(){
        // initialize to standard chess starting position
        this.pos = Chess.default()
    }

    rawLegalUcis(){
        return Array.from(chessgroundDests_(this.pos).entries()).map(entry => entry[1].map(dest => `${entry[0]}${dest}`)).flat()
    }

    setVariant(variant){
        switch(variant){
            case "atomic": this.pos = Atomic.default(); break;
            case "antichess": this.pos = Antichess.default(); break;
            case "crazyhouse": this.pos = Crazyhouse.default(); break;
            case "horde": this.pos = Horde.default(); break;
            case "kingofthehill": this.pos = KingOfTheHill.default(); break;
            case "racingkings": this.pos = RacingKings.default(); break;
            case "3check": case "threecheck": this.pos = ThreeCheck.default(); break;
            default: this.pos = Chess.default()
        }
        return this
    }

    setFen(fen){
        const variant = this.pos.rules
        const setup = parseFen(fen).value        
        switch(variant){
            case "atomic": this.pos = Atomic.fromSetup(setup).value; break;
            case "antichess": this.pos = Antichess.fromSetup(setup).value; break;            
            case "crazyhouse": this.pos = Crazyhouse.fromSetup(setup).value; break;
            case "horde": this.pos = Horde.fromSetup(setup).value; break;
            case "kingofthehill": this.pos = KingOfTheHill.fromSetup(setup).value; break;
            case "racingkings": this.pos = RacingKings.fromSetup(setup).value; break;
            case "3check": case "threecheck": this.pos = KingOfTheHill.fromSetup(setup).value; break;
            default: this.pos = Chess.fromSetup(setup).value
        }        
        return this
    }

    reportFen(){
        return makeFen(this.pos.toSetup())
    }

    sanToMove(san){
        return parseSan(this.pos, san)
    }

    moveToSan(move){
        return makeSan(this.pos, move)
    }

    uciToMove(uci){
        return parseUci(uci)
    }

    moveToUci(move){
        return makeUci(move)
    }

    play(move){
        this.pos.play(move)
        return this
    }

    playSan(san){
        return this.play(this.sanToMove(san))
    }

    playUci(uci){
        return this.play(this.uciToMove(uci))
    }

    sanToUci(san){
        return this.moveToUci(this.sanToMove(san))
    }

    uciToSan(uci){
        return this.moveToSan(this.uciToMove(uci))
    }

    toString(){
        return `[Pos ${this.pos.rules} ${this.reportFen()}]`
    }

    legalsForUci(uci){
        return PROMOTION_PIECES_EXT.filter(pp => this.pos.isLegal(this.uciToMove(`${uci}${pp}`), this.pos.ctx())).map(pp => `${uci}${pp}`)
    }

    allLegalUcis(){
        return this.rawLegalUcis().map(uci => this.legalsForUci(uci)).flat()
    }

    allLegalSans(){
        return this.allLegalUcis().map(uci => this.uciToSan(uci))
    }
}
export function Pos(){
    return new Pos_()
}

const pos = Pos()

console.log("chess module initialized", pos.toString())