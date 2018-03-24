const express = require('express')
const { upload, getShareLink } = require('../utils/object-storage')
const { PhotoAuth } = require('../models')
const FaceAPI = require('../utils/face-api')

const router = express.Router()

router
  .post('/identify/:personGroupId', async (req, res, next) => {
    try {
      if (!req.params.personGroupId) {
        console.error('Missing person group')
        res.status(400)
        res.json({
          error: 'Missing person group'
        })
        return
      }

      const groupId = req.params.personGroupId
      const { file } = await upload(req, 'file')
      const photoAuth = await PhotoAuth.create({
        key: file.key,
        faceIds: [],
        faces: []
      })
      if (!file) {
        console.error('There is no file in the request')
        res.status(400)
        res.json({
          error: 'There is no file in the request'
        })
        return
      }

      const link = await getShareLink(file.key)

      // save file status. { status: 'uploaded', fileKey: file.key }

      const faces = await FaceAPI.detectFace(link)
      console.log('faces', faces)
      const faceIds = faces.map(face => face.faceId)
      photoAuth.faceIds = faceIds
      await photoAuth.save()

      // save file status. { faceId }
      const matchedFaces = await FaceAPI.identifyFace(faceIds, groupId)
      photoAuth.faces = matchedFaces
      await photoAuth.save()

      res.json({
        _id: photoAuth._id,
        key: file.key,
        faceIds,
        matchedFaces
      })
    } catch (err) {
      console.error(err)
      next(err)
    }
  })

module.exports = router
