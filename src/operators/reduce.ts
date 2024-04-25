
import { deepFlatten } from './deepFlatten'

import {pipe} from '../pipleline'

import {type TOperatorSettings} from '../_internal/type'

const R = require('ramda')

export const reduce = R.curry(
    <TNode>(
        ops: TOperatorSettings,
        reducer: (acc: any, node: TNode) => any,
        initialValue: any,
        nodes: TNode[]
    ): any => pipe( 
        deepFlatten(ops),
        R.reduce(reducer, initialValue),
    )(nodes)
)