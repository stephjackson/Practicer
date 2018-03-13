const mongoose = require('mongoose');
const express = require('express');
const itemRoutes = express.Router();
const List = require('../models/list-model');
const User = require('../models/user-model');
const Item = require('../models/item-model');

itemRoutes.post('/new/', (req, res, next) => {
  // if (!req.user) {
  //   res.status(401).json({ message: "Log in to add an item to this list" });
  //   return;
  // }

  const newItem = new Item({
    title: req.body.itemTitle,
    time: req.body.itemTime,
    bpm: req.body.itemBpm
  })

  newItem.save((err) => {
    if (err) {
      res.status(500).json({ message: 'Error adding item to database' });
      return;
    }

    List.findByIdAndUpdate(req.params.listid, { '$push': { 'items': newItem._id } }, err => {
      if (err) { res.status(500).json({ message: 'Error adding item to list db array' }) };
      ///!!!FIX!!!
      // req.user.encryptedPassword = undefined;
      // newItem.user = req.user;
      res.status(200).json(newItem);
    })
  })
})

itemRoutes.put('/add/:listid/:itemid', (req, res, next) => {
  // if (!req.user) {
  //   res.status(401).json({ message: "Log in to add an item to this list" });
  //   return;
  // }

  List.findByIdAndUpdate(req.params.listid, { '$push': { 'items': req.params.itemid } }, err => {
    if (err) {
      res.status(500).json({ message: 'Error adding item to list db array' })
      return;
    };

    Item.findByIdAndUpdate(req.params.itemid, { '$push': { 'lists': req.params.listid } }, err => {
      if (err) {
        res.status(500).json({ message: err })
        return;
      };

      req.user.encryptedPassword = undefined;
      res.status(200).json('Item added to list!');
    })
  })
})

itemRoutes.get('/:itemid', (req, res, next) => {
  // if (!req.user) {
  //   res.status(401).json({ message: "Log in to see an individual list item." });
  //   return;
  // }
  if (!mongoose.Types.ObjectId.isValid(req.params.itemid)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Item.findById(req.params.itemid, (err, theItem) => {
    if (err) {
      res.status(500).json({ message: "Item database search was bad." })
      return;
    }

    res.status(200).json(theItem);
  })
})

itemRoutes.put('/:itemid', (req, res, next) => {
  // if (!req.user) {
  //   res.status(401).json({ message: "Log in to update an individual list item." });
  //   return;
  // }
  if (!mongoose.Types.ObjectId.isValid(req.params.itemid)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  const updates = {
    title: req.body.itemTitle,
    time: req.body.itemTime,
    bpm: req.body.itemBpm
  }

  Item.findByIdAndUpdate(req.params.itemid, updates, err => {
    if (err) {
      res.json(err);
      return;
    }

    res.json({
      message: "List item updated successfully!"
    })
  })
})

itemRoutes.put('/:itemid/track', (req, res, next) => {
  // if (!req.user) {
  //   res.status(401).json({ message: "Log in to update an individual list item." });
  //   return;
  // }
  if (!mongoose.Types.ObjectId.isValid(req.params.itemid)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  var itemBpm = req.body.itemBpm;
  if (req.body.completed == 1) {
    itemBpm++;
  } else if (req.body.completed == 0) {
    itemBpm = Math.round(itemBpm * 0.9);
  } else {
    res.status(400).json({ message: "Complete variable is broken. " })
    return;
  }

  const updates = {
    bpm: itemBpm
  }

  const stats = {
    bpm: itemBpm,
    date: new Date()
  }

  Item.findByIdAndUpdate(req.params.itemid, { '$push': { 'stats': stats } }, err => {
    if (err) {
      res.json(err);
      return;
    }

    Item.findByIdAndUpdate(req.params.itemid, updates, err => {
      if (err) {
        res.json(err);
        return;
      }

      res.json({
        message: "List item updated successfully!"
      })
    })
  })
})

itemRoutes.delete('/:listid/:itemid', (req, res, next) => {
  // if (!req.user) {
  //   res.status(401).json({ message: 'Log in to delete a list item' })
  //   return;
  // }

  if (!mongoose.Types.ObjectId.isValid(req.params.listid) || !mongoose.Types.ObjectId.isValid(req.params.itemid)) {
    res.status(400).json({ message: 'Specified item id is not valid.' })
    return;
  }

  Item.remove({ _id: req.params.itemid }, err => {
    if (err) {
      res.json(err);
      return;
    }

    List.findByIdAndUpdate(req.params.listid, { '$pull': { 'items': req.params.itemid } }, err => {
      if (err) { res.status(500).json({ message: 'Error deleting list item from list db array' }) };
      res.json({
        message: "Item has been removed."
      })
    })
  })
})

module.exports = itemRoutes;