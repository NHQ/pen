var trig = require('../trig')
var tangential = require('../softTangent')

module.exports = function(ctx, denit){

  var hold = true;
  var pt = [];
  var r = 1;
  var w = ctx.canvas.width
  var h = ctx.canvas.height
  var f;

  return {
    down: touchdown,
    move: deltavector,
    up: liftoff 
  }
  
  function spill(){
    if(hold) f = window.requestAnimationFrame(spill)
    ctx.beginPath()
    ctx.clearRect(0,0,w,h)
    ctx.arc(pt[0], pt[1], r++, 0, 2 * Math.PI, false);
    ctx.fill()
  }

  function touchdown(evt){
    r = ctx.lineWidth
    pt[0] = evt.offsetX
    pt[1] = evt.offsetY
    hold = true
    window.requestAnimationFrame(spill)
  }

  function deltavector(evt){
    if(trig.distance(pt, [evt.offsetX, evt.offsetY]) < r) return
    else{
      hold = false
      window.cancelAnimationFrame(f)
//      ctx.clearRect(0,0,ctx.canvas.width, ctx.canvas.height)
      ctx.beginPath()
      var td = evt.allOffsetPoints.reduce(function(acc, e, i, l){
        if(l[i - 1]){
          acc[i] = acc[i - 1] + trig.distance(e, l[i-1]) 
          return acc
        }
        else return acc
       }, [0])
      var ttd = td[td.length - 1] 
      ctx.moveTo(evt.allOffsetPoints[0][0], evt.allOffsetPoints[0][1])
      for(var x = 1; x < evt.allOffsetPoints.length; x++){
        ctx.beginPath()
        ctx.arc(evt.allOffsetPoints[x][0], evt.allOffsetPoints[x][1], (((r / 1.62) - ctx.lineWidth / 2) * (1 -(td[x]/ttd))) + (ctx.lineWidth/2) , Math.PI * 2, false )
//        ctx.arc(evt.offsetX, evt.offsetY, r * ((trig.distance(evt.allOffsetPoints.slice(-1)[0], pt) / td), Math.PI * 2, false)
        ctx.fill()
      }
      ctx.stroke()
     // r = ctx.lineWidth
    }
  }

  function liftoff(evt){
    window.cancelAnimationFrame(f)
    hold = false
    r = ctx.lineWidth
  }
}
