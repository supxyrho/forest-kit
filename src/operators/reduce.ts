
import { deepFlatten } from './deepFlatten'

import {pipe} from '../pipleline'

import {type TOperatorConfig} from '../_internal/type'

const R = require('ramda')

export const reduce = R.curry(
    <TNode>(
        opc: TOperatorConfig,
        reducer: (acc: any, node: TNode) => any,
        initialValue: any,
        nodes: TNode[]
    ): any => pipe( 
        deepFlatten(opc),
        R.reduce(reducer, initialValue),
    )(nodes)
)