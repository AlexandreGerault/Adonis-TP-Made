'use strict'

const Gate = use('Gate')

//
Gate.policy('App/Models/Project', 'App/Policies/ProjectPolicy')