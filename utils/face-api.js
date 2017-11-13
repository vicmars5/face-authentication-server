const Axios = require('axios')
const config = require('../config').face

const http = Axios.create({
  baseURL: config.endpoint,
  headers: {
    'Ocp-Apim-Subscription-Key': config.subscription,
    'Content-Type': 'application/json'
  }
})

/**
 * @params {string} id
 * @params {object} body
 * @parmas {string} body.name - Person group name
 * @params {string} body.userData - User provided data tothe person group.
 */
const createPersonGroup = async (id, body) => {
  const res = await http.put(`/persongroups/${id}`, body)
  if (res.status !== 200) {
    throw new Error('Invalid state', res)
  }
  return res.data
}

const deletePersonGroup = async (id) => {
  const res = await http.delete(`/persongroups/${id}`)
  if (res.status !== 200) {
    throw new Error('Face API error in "deletePersonGroup"', res)
  }
  return res.data
}

const getPersonGroup = async (id) => {
  const res = await http.get(`/persongroups/${id}`)
  if (res.status !== 200) {
    throw new Error('Face API error in "getPersonGroup"', res)
  }
  return res.data
}

/**
 * @param {object} params - request params
 * @param {number} params.start - List person groups from the least
 *    personGroupId greater than the "start". It contains no more than 64
 *    characters. Default is empty.
 * @param {number} params.top - The number of person groups to list, ranging in
 *    [1, 1000]. Default is 1000.
 */
const getPersonGroups = async (params) => {
  const res = await http.get('/persongroups', {
    params
  })
  console.log('res status', res.status)
  if (res.status !== 200) {
    throw new Error('Face API error in "getPersonGroups"', res)
  }
  return res.data
}

/**
* Add person to group
* @params {string} personGroupId
* @params {object} body
* @params {string} body.name - Face API user name
* @params {string} body.userData
* @return {string} - Person Id
*/
const createPerson = async (personGroupId, body) => {
  try {
    const res = await http.post(`/persongroups/${personGroupId}/persons`, body)
    return res.data.personId
  } catch (err) {
    throw err
  }
}

/**
* List persons in group
* @params {string} personGroupId
* @params {object} params
* @params {object} params.start - [Optional] Start person id
* @params {object} params.top - [Optional] Number of person ids to list.
*   Default 1000
* Reference https://westus.dev.cognitive.microsoft.com/docs/services/563879b61984550e40cbbe8d/operations/563879b61984550f30395241
*/
const getPersons = async (personGroupId, params) => {
  const res = await http.get(`persongroups/${personGroupId}/persons`, { params })
  return res.data
}

/**
* Add image to person
* @params {string} personGroupId
* @params {string} personId
* @params {object} params
* @params {string} params.userData - Data about the user
* @params {string} params.targetFace - A face rectangle to specify the target face to
*   be added to a person, in the format of "targetFace=left,top,width,height".
*   E.g. "targetFace=10,10,100,100". If there is more than one face in the
*   image, targetFace is required to specify which face to add. No targetFace
*   means there is only one face detected in the entire image. 
* @params {object} body
* @params {string} body.url - Face image URL. Valid image size is from 1KB to 4MB. Only one face is allowed per image.
* Reference: https://westus.dev.cognitive.microsoft.com/docs/services/563879b61984550e40cbbe8d/operations/563879b61984550f3039523b
*/
const postPersonFace = async (personGroupId, personId, params, body) => {
  const options = {
    params 
  }

  const res = await http.post(`persongroups/${personGroupId}/persons/${personId}/persistedFaces`,
    body,
    options
  )

  return res.data
}

module.exports = {
  createPersonGroup,
  deletePersonGroup,
  getPersonGroups,
  createPerson
}
