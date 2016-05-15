'use strict';

import amqp from 'amqplib/callback_api';
import async from 'async';
import logger from './log';

let addToQueue = function(queueName, info, callback) {
  async.auto({
    connect: function(callback) {
      amqp.connect('amqp://localhost', function (err, conn) {
        callback(err, conn);
      });
    },
    createChannel: ['connect', function(callback, res){
      res.connect.createChannel(function(err, ch){
        callback(err, ch);
      });
    }],
    assertQueue: ['createChannel', function(callback, res){
      res.createChannel.assertQueue(queueName, {durable: true}, function(err, _ok){
        callback(err, _ok);
      });
    }],
    sendToQueue: ['assertQueue', function(callback, res){
      res.createChannel.sendToQueue(queueName, new Buffer(JSON.stringify(info)), {persistent: true});
      callback(null, null);
    }],
    close: ['sendToQueue', function(callback, res){
      res.connect.close();
      callback(null, null);
    }]
  }, function(err, res) {
    if(err !== null) {
      if(res.connect) { res.connect.close(); }
      logger.error(err);
    }
    callback();
  });
}

let getFromQueue = function(queueName, cb) {
  async.auto({
    connect: function(callback) {
      amqp.connect('amqp://localhost', function(err, conn) {
        process.once('SIGINT', conn.close.bind(conn));
        callback(err, conn);
      });
    },
    createChannel: ['connect', function(callback, res) {
      res.connect.createChannel(function(err, ch) {
        callback(err, ch);
      });
    }],
    assertQueue: ['createChannel', function(callback, res) {
      res.createChannel.assertQueue(queueName, {durable: true}, function(err, _ok) {
        callback(err, _ok);
      });
    }]
  }, function(err, res){
    let doWork = function(msg) {
      let content = JSON.parse(msg.content.toString());
      cb(content);
      // logger.debug(content);
      res.createChannel.ack(msg);
    }
    res.createChannel.consume(queueName, doWork, {noAck: false});
    logger.debug("Waiting For New problem Get");
  });
}

export { addToQueue, getFromQueue };
