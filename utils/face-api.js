const Axios = require('axios')
const shortid = require('shortid')
const config = require('../config').face

const http = Axios.create({
  baseURL: config.endpoint,
  headers: {
    'Ocp-Apim-Subscription-Key': config.subscription,
    'Content-Type': 'application/json'
  }
})

const createPersonGroup = async (body) => {
  const groupId = shortid()
  const res = await http.put(`/persongroups/${groupId}`, body)
  return {
    id: groupId,
    res
  }
}

const deletePersonGroup = (id) => {
  return http.delete(`/persongroups/{$id}`)
}

const getPersonGroup = (id) => {
  return http.get(`/persongroups/${id}`)
}

/**
 * @param {object} params - request params
 * @param {number} params.start - List person groups from the least
 *    personGroupId greater than the "start". It contains no more than 64
 *    characters. Default is empty.
 * @param {number} params.top - The number of person groups to list, ranging in
 *    [1, 1000]. Default is 1000.
 */
const getPersonGroups = (params) => {
  return http.get('/persongroups', {
    params
  })
}

module.exports = {
  createPersonGroup,
  deletePersonGroup,
  getPersonGroups
}
