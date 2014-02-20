var trig = require('./trig')
var p2 = Math.PI / 2

module.exports = function(radius, center, pt){

  var center = [0,0]
  var radius = 1

  var pt1 = center
  var pt2 = [1,1]

  var distance = trig.distance(center, pt)
  var dr = distance / radius

  var angle = trig.angle(center, pt)

  var x = center[0] + radius * Math.cos(angle)
  var y = center[1] + radius * Math.sin(angle)

  var a2t = angle + (p2 - (p2 * (1/dr)))
  var na2t = angle - (p2 - (p2 * (1/dr)))

  var tangents = [[],[]]
  tangents[0][0] = center[0] + radius * Math.cos(a2t)
  tangents[0][1] = center[1] + radius * Math.sin(a2t)
  tangents[1][0] = center[1] + radius * Math.cos(na2t)
  tangents[1][1] = center[1] + radius * Math.sin(na2t)


  return {angle: angle, secant: [x, y], a2t: a2t, tangents: tangents}

  //console.log(angle, x, y, '/\n', a2t, ax, ay)

}
