import * as R from 'ramda'

export const ejectColor = (color) => R.path(['theme', 'variables', 'colors', color])
