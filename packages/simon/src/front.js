import { calculateReduction } from './shared'

export default part => {
  part.paths = {}
  let {
    store,
    measurements,
    sa,
    Point,
    points,
    Path,
    paths,
    complete,
    paperless,
    macro,
    options
  } = part.shorthand()

  // Populare store with data we need
  calculateReduction(part)
  store.set(
    'frontArmholeLength',
    new Path()
      .move(points.armhole)
      .curve(points.armholeCp2, points.armholeHollowCp1, points.armholeHollow)
      .curve(points.armholeHollowCp2, points.armholePitchCp1, points.armholePitch)
      .curve(points.armholePitchCp2, points.shoulderCp1, points.shoulder)
      .length()
  )

  // Hip shaping
  points.hips = points.hips.shift(180, store.get('hipsReduction') / 4)
  points.hem = points.hem.shift(180, store.get('hipsReduction') / 4)

  // Waist shaping
  let reduce = store.get('waistReduction')
  if (reduce / 4 > options.minimalDartShaping) reduce = reduce / 8
  else reduce = reduce / 4
  points.waist = points.waist.shift(180, reduce)
  points.waistCp1 = points.waist.shift(-90, measurements.naturalWaistToHip * 0.5)
  points.waistCp2 = points.waist.shift(90, points.armhole.dy(points.waist) / 2)
  points.hipsCp2 = points.hips.shift(90, points.waist.dy(points.hips) / 4)

  // Draft hem
  paths.saBaseFromHips = new Path()
    .move(points.hips)
    .curve(points.hipsCp2, points.waistCp1, points.waist)
    .curve_(points.waistCp2, points.armhole)
  paths.saBaseFromArmhole = new Path()
    .move(points.armhole)
    .curve(points.armholeCp2, points.armholeHollowCp1, points.armholeHollow)
    .curve(points.armholeHollowCp2, points.armholePitchCp1, points.armholePitch)
    .curve(points.armholePitchCp2, points.shoulderCp1, points.shoulder)
    .line(points.neck)
    .curve(points.neckCp2Front, points.cfNeckCp1, points.cfNeck)
  switch (options.hemStyle) {
    case 'baseball':
      points.bballStart = points.cfHem.shiftFractionTowards(points.hem, 0.5)
      points.bballEnd = points.hem.shiftFractionTowards(points.hips, options.hemCurve)
      points.bballCp1 = points.bballStart.shiftFractionTowards(points.hem, 0.5)
      points.bballCp2 = new Point(points.bballCp1.x, points.bballEnd.y)
      paths.saBase = new Path()
        .move(points.bballEnd)
        .line(points.hips)
        .join(paths.saBaseFromHips)
      paths.hemBase = new Path()
        .move(points.cfHem)
        .line(points.bballStart)
        .curve(points.bballCp1, points.bballCp2, points.bballEnd)
      break
    case 'slashed':
      macro('round', {
        from: points.hips,
        to: points.cfHem,
        via: points.hem,
        radius: points.hips.dist(points.hem) * options.hemCurve,
        prefix: 'slash'
      })
      paths.saBase = new Path().move(points.hips).join(paths.saBaseFromHips)
      paths.hemBase = new Path()
        .move(points.cfHem)
        .line(points.slashEnd)
        .curve(points.slashCp2, points.slashCp1, points.slashStart)
      break
    default:
      paths.saBase = new Path()
        .move(points.hem)
        .line(points.hips)
        .join(paths.saBaseFromHips)
      paths.hemBase = new Path().move(points.cfHem).line(points.hem)
  }

  // Paths
  paths.saBase.render = false
  paths.saBaseFromHips.render = false
  paths.saBaseFromArmhole.render = false
  paths.hemBase.render = false
  paths.seam = paths.hemBase
    .join(paths.saBase)
    .join(paths.saBaseFromArmhole)
    .attr('class', 'fabric')

  // Complete pattern?
  if (complete) {
    delete paths.cutonfold
    macro('grainline', {
      from: points.cfHem.shift(0, 45),
      to: points.cfNeck.shift(0, 45)
    })
    macro('title', { at: points.title, nr: 'X', title: 'front' })
    macro('sprinkle', {
      snippet: 'notch',
      on: [
        'waist',
        'armholePitch',
        'shoulder',
        'neck',
        'hips',
        'cfHips',
        'cfWaist',
        'armhole',
        'cfArmhole'
      ]
    })

    if (sa) {
      paths.saFrench = paths.saBase.offset(sa * 2).attr('class', 'fabric sa')
      paths.saFromArmhole = paths.saBaseFromArmhole.offset(sa).attr('class', 'fabric sa')
      paths.hemSa = paths.hemBase.offset(sa * 3).attr('class', 'fabric sa')
      paths.saConnect = new Path()
        .move(paths.hemSa.end())
        .line(paths.saFrench.start())
        .move(paths.saFrench.end())
        .line(paths.saFromArmhole.start())
        .attr('class', 'fabric sa')
      delete paths.sa
    }
  }

  // Paperless?
  if (paperless) {
  }

  return part
}
