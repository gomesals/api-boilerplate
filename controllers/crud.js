'use strict'

/**
 * Returns all documents from a model.
 * @param  {object} model Mongoose model.
 * @return {array}       Array of documents.
 */
const find = model => async (search = {}, params = '') => {
  return model.find(search, params).lean()
}
/**
 * Returns only one document from a model, using query.
 * @param  {object} model Mongoose model.
 * @return {object}       Document object.
 */
const findOne = model => async (query, params = '') => {
  return model.findOne(query, params).lean()
}
/**
 * Returns only one document from a model, using _id.
 * @param  {object} model Mongoose model.
 * @return {object}       Document object.
 */
const findById = model => async (_id, params = '') => {
  return model.findById(_id, params).lean()
}
/**
 * Creates a document.
 * @param  {object} model Mongoose model.
 * @return {objectId}       Document ObjectId.
 */
const create = model => async data => {
  const { _id } = await new model(data).save()
  return _id
}
/**
 * Updates a document.
 * @param  {object} model Mongoose model.
 * @return {object}       Result from operation.
 */
const update = model => async (query, data) => {
  return model.update(query, { $set: data })
}
/**
 * Removes a document.
 * @param  {object} model Mongoose model.
 * @return {object}       Result from operation.
 */
const remove = model => async _id => {
  return await model.remove({ _id })
}

module.exports = {
  find,
  findOne,
  findById,
  create,
  update,
  remove
}
