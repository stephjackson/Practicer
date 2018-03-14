const mongoose = require('mongoose');
const express = require('express');
const listRoutes = express.Router();
const List = require('../models/list-model')
const User = require('../models/user-model')
const Item = require('../models/item-model')

listRoutes.post('/new', (req, res, next) => {
  // if (!req.user) {
  //   res.status(401).json({ message: "Log in to create a practice session" });
  //   return;
  // }

  const newList = new List({
    title: req.body.listTitle,
    //!!!CHANGE LATER!!!
    user: '5aa8356af4a734fb2c4df356'
  });

  newList.save((err) => {
    if (err) {
      res.status(500).json({ message: "Error saving list to database." });
      return;
    }

    User.findByIdAndUpdate('5aa8356af4a734fb2c4df356', { '$push': { 'lists': newList._id } }, err => {
      if (err) { res.status(500).json({ message: 'Error adding list to user db array' }) };
      // !!!UNCOMMENT LATER!!!
      // req.user.encryptedPassword = undefined;
      // newList.user = req.user;
      res.status(200).json(newList);
    })
  })
})

listRoutes.get('/', (req, res, next) => {
  // if (!req.user) {
  //   res.status(401).json({ message: "Log in to see your lists." });
  //   return;
  // }

  //!!!!!CHANGE BACK LATER!!!!!//
  // List.find({ user: req.user._id })
  List.find({ user: '5aa8356af4a734fb2c4df356' })
    .populate('User', { encryptedPassword: 0 })
    .exec((err, allTheLists) => {
      if (err) {
        res.status(500).json({ message: 'Show all lists search threw an error.' })
        return;
      }

      res.status(200).json(allTheLists);
    })
})

listRoutes.get('/excludes/:itemid', (req, res, next) => {
  // if (!req.user) {
  //   res.status(401).json({ message: "Log in to see your lists." });
  //   return;
  // }

  //!!!!!CHANGE BACK LATER!!!!!//
  // List.find({ user: req.user._id })
  List.find({ items: { $ne: req.params.itemid } })
    .populate('Item')
    .exec((err, allTheLists) => {
      if (err) {
        res.status(500).json({ message: 'Show all lists search threw an error.' })
        return;
      }

      res.status(200).json(allTheLists);
    })
})

listRoutes.delete('/:listid', (req, res, next) => {
  // if (!req.user) {
  //   res.status(401).json({ message: 'Log in to delete a list' })
  //   return;
  // }

  if (!mongoose.Types.ObjectId.isValid(req.params.listid)) {
    res.status(400).json({ message: 'Specified list id is not valid.' })
    return;
  }

  List.remove({ _id: req.params.listid }, err => {
    if (err) {
      res.json(err);
      return;
    }

    //!!! CHANGE USER ID LATER!!!
    User.findByIdAndUpdate('5aa8356af4a734fb2c4df356', { '$pull': { 'lists': req.params.listid } }, err => {
      if (err) { res.status(500).json({ message: 'Error deleting list from user db array' }) };
      res.json({
        message: "List has been removed."
      })
    })
  })
})

listRoutes.get('/:listid', (req, res, next) => {
  // if (!req.user) {
  //   res.status(401).json({ message: "Log in to see the items in this list." });
  //   return;
  // }
  Item.find({ lists: req.params.listid })
    .populate('List')
    .exec((err, allTheItems) => {
      if (err) {
        res.status(500).json({ message: 'Show all items search threw an error.' })
        return;
      }

      res.status(200).json(allTheItems);
    })
})

module.exports = listRoutes;