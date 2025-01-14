import brian from './brian.yml'
import aaron from './aaron.yml'
import simon from './simon.yml'
import sven from './sven.yml'
import wahid from './wahid.yml'
import bent from './bent.yml'
import bruce from './bruce.yml'
import cathrin from './cathrin.yml'
import huey from './huey.yml'
import hugo from './hugo.yml'
import tamiko from './tamiko.yml'
import trayvon from './trayvon.yml'
import jaeger from './jaeger.yml'
import carlton from './carlton.yml'
import carlita from './carlita.yml'
import { options as optionList } from '@freesewing/pattern-info'
import shared from '../../../shared-options.yml'

let patterns = {
  brian,
  aaron,
  simon,
  sven,
  wahid,
  bent,
  bruce,
  cathrin,
  huey,
  hugo,
  tamiko,
  trayvon,
  jaeger,
  carlton,
  carlita
}

let options = {}
for (let pattern of Object.keys(patterns)) {
  options[pattern] = {}
  if (typeof optionList[pattern] === 'undefined')
    throw new Error('pattern ' + pattern + ' has no option list')
  for (let option of optionList[pattern]) {
    let value = patterns[pattern][option]
    if (typeof value === 'object') options[pattern][option] = value
    else {
      if (typeof value === 'undefined') {
        if (typeof patterns[shared[pattern].dflt][option] === 'object')
          options[pattern][option] = patterns[shared[pattern].dflt][option]
        else if (
          typeof shared[pattern].other !== 'undefined' &&
          typeof shared[pattern].other[option] === 'string'
        )
          options[pattern][option] = patterns[shared[pattern].other[option]][option]
        else {
          throw new Error(`No option translation found for ${option} in ${pattern}`)
        }
      }
    }
  }
}

export default options
