

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



//lexer
// turn expr

// and t or t not f

//into

//['and', 't', or, t, not, f]


const lex = str => str.split(' ').map(s => s.trim()).filter(s => s.length);
/*
parser is responsible for turning the token list into AST

['and', 't', or, t, not, f]

    and
    /   \
    t    or
        /  \
        t   not
            /
           f 


```
EBNF FORM
bool := t || f
op := and || or || not
expr := bool || op || expr+

*/


/*
    this is a parser
*/

const Op = Symbol('op');
const Bool = Symbol('bool');


const parse = tokens => {

    let c = 0;
    const peek = () => tokens[c];
    const consume = () => tokens[c++];
  
    const parseBool = () => ({ val: consume() , type: Bool });
    
  

    const parseOp = () => {


      const node = { 
          val: checkRegEx(consume()), type: Op, expr: [] };



      while (peek()) node.expr.push(parseExpr());
      return node;
    
    
    
    };
  
    const parseExpr = () => /\d/.test(peek()) ? parseBool() : parseOp();
    
    return parseExpr();
  };

var not = /not/i
var and = /and/i
var or =  /or/i
var regexTrue = /true/i
var regexFalse = /false/i

const truParse = tokens => {
    let c = 0;

   
    
    const parseBool = () => ({ val: new TrueExpr(consume()) , type: Bool });
    
    
    
    switch(regex){
           
        case or:
            return  new TrueExpr(null, null, {lhs: truParse, rhs: truParse  });
        case and:
        
            return  new TrueExpr(null, {lhs: truParse, rhs: truParse });
        case not:
            return  new TrueExpr(null, null, null, truParse);
        case regexTrue:
            return  new TrueExpr(true);
                
        case regexFalse:
            return  new TrueExpr(false);
    }
    
    
  

    const parseExpr = () => ((regexTrue.test(peek())) || (regexFalse.test(peek()))) ? parseBool() : parseOp();
    
    const parseOp = () => {
        
        console.log(consume())
        const node = { 
            val: checkRegEx(consume()), type: Op, expr: [] };
        while (peek()) node.expr.push(parseExpr());
        return node;
    };

    return parseExpr();
}


/*
  developing the transpile
*/


  const test1 = "and or true false or true not false"
  console.log( JSON.stringify((truParse(lex(test1)))))