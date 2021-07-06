/* eslint-disable no-unused-vars */
// import coco from './coco'
const coco = require('./coco');
const path = require('path');

exports.Prediction = class Prediction {
  constructor (options) {
    this.options = options || {};
  }

  async find (params) {
    return [];
  }

  async get (id, params) {
    return {
      id, text: `A new message with ID: ${id}!`
    };
  }

  async create (data, params) {
    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    try {
      const cocoPrediction = await coco(data.img)
      data.converImg = path.parse(data.img).name + '-annotate.png'
      data.prediction = cocoPrediction
      
      console.log('cocoPrediction' , cocoPrediction)
    } catch (e) {
      console.log('prediction error : ', e)
    }
    
    
    
    // if (Array.isArray(data)) {
    //   return Promise.all(data.map(current => this.create(current, params)));
    // }

    return data;
  }

  async update (id, data, params) {
    return data;
  }

  async patch (id, data, params) {
    return data;
  }

  async remove (id, params) {
    return { id };
  }
};
