module.exports = {
  AND: function(){
    return Array.from(arguments)
  },
  OR: function(){
    return {
      or:Array.from(arguments)
    }
  },
  NOT: function(){
    return {
      not:Array.from(arguments)
    }
  }
}
