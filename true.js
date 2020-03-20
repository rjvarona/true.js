

class TrueExpr{
    constructor(tru_value, tru_and, tru_or, tru_not){
    this.tru_value = tru_value
    this.tru_and = tru_and
    this.tru_or = tru_or
    this.tru_not = tru_not
    }
}

var truValue = new TrueExpr(true);
var falseValue = new TrueExpr(false);
var truAnd = new TrueExpr(null, {lhs: truValue, rhs : falseValue});
var truOr = new TrueExpr(null,null,{lhs: truValue, rhs : falseValue});
var truNot = new TrueExpr(null,null,null, truValue);

function truInterp(TrueExpr){
    if(TrueExpr.tru_value != null){
        return TrueExpr.tru_value
    }
    else if(TrueExpr.tru_and != null){
        return (TrueExpr.tru_and.lhs.tru_value && TrueExpr.tru_and.rhs.tru_value)
    }
    else if(TrueExpr.tru_or != null){
        return (TrueExpr.tru_or.lhs.tru_value || TrueExpr.tru_or.rhs.tru_value)
    }
    else if(TrueExpr.tru_not != null){
        return (!TrueExpr.tru_not.tru_value)
    }
    else{
        console.log("operation not allowed")
    }
}


var x = truInterp(truNot);

console.log(x);