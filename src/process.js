var JSONPath = require("jsonpath-plus");

function processOr(args, data){
  for(var expr of args){
    if(expr instanceof Array){
      var res = processAnd(expr, data);
    } else if(typeof(expr) === "string") {
      var res = JSONPath(expr, data).length > 0;
    } else {
      if(expr.or){
        var res = processOr(expr.or, data);
      } else if(expr.not){
        var res = processNot(expr.not, data);
      } else {
        throw new Error("Unknown expression in or statement")
      }
    }
    if(res){
      return true;
    }
  }
  return false;
}

function processAnd(args, data){
  if(args === undefined || args === null || args.length === 0){
    return true;
  }
  for(var expr of args){
    if(typeof(expr) === "string"){
      var res = JSONPath(expr, data).length > 0;
    } else if(expr instanceof Array){
      var res = processAnd(expr, data);
    } else {
      if(expr.or){
        var res = processOr(expr.or, data);
      } else if(expr.not){
        var res = processNot(expr.not, data);
      } else {
        throw new Error("Unknown expression in and statement")
      }
    }
    if(!res){
      return false;
    }
  }
  return true;
}

function processNot(expr, data){
    if(typeof(expr) === "string"){
      var res = JSONPath(expr, data).length > 0;
    } else if(expr instanceof Array){
      var res = processAnd(expr, data);
    } else {
      if(expr.or){
        var res = processOr(expr.or, data);
      } else if(expr.not){
        var res = processNot(expr.not, data);
      } else {
        throw new Error("Unknown expression in not statement")
      }
    }
    return !res;

}


function processExpr(expr, data){
  if(typeof(expr) === 'string'){
    return JSONPath(expr, [data]).length > 0;
  } else if(expr instanceof Array){
    return processAnd(expr, [data]);
  } else {
    if(expr.or){
      return processOr(expr.or, [data]);
    } else {
      return processNot(expr.not, [data]);
    }
  }

}

module.exports = processExpr;
