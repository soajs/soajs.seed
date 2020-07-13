/**
 * @license
 * Copyright SOAJS All Rights Reserved.
 *
 * Use of this source code is governed by an Apache license that can be
 * found in the LICENSE file at the root of this repository
 */

"use strict";
const colName = "items";
const core = require("soajs");
const Mongo = core.mongo;

let indexing = {};

function Product(service, options, mongoCore) {
	let __self = this;
	if (__self.log) {
		__self.log = service.log;
	} else {
		__self.log = (log) => {
			console.log(log);
		};
	}
	
	if (mongoCore) {
		__self.mongoCore = mongoCore;
	}
	if (!__self.mongoCore) {
		if (options && options.dbConfig) {
			__self.mongoCore = new Mongo(options.dbConfig);
		} else {
			let registry = service.registry.get();
			__self.mongoCore = new Mongo(registry.coreDB.product);
		}
		
		let index = "default";
		if (options && options.index) {
			index = options.index;
		}
		if (indexing && !indexing[index]) {
			indexing[index] = true;
			
			__self.mongoCore.createIndex(colName, {'name': 1}, {}, (err, index) => {
				service.log.debug("Index: " + index + " created with error: " + err);
			});
			
			service.log.debug("Product: Indexes for " + index + " Updated!");
		}
	}
}

Product.prototype.add = function (data, cb) {
	let __self = this;
	if (!data || !data.name || !data.description) {
		let error = new Error("Product: name, and description are required.");
		return cb(error, null);
	}
	let options = {};
	let doc = {
		name: data.name,
		description: data.description,
		attributes: data.attributes,
		time: new Date().getTime()
	};
	let versioning = false;
	__self.mongoCore.insertOne(colName, doc, options, versioning, cb);
};

Product.prototype.get = function (data, cb) {
	let __self = this;
	
	if (data.id) {
		__self.validateId(data.id, (error, _id) => {
			if (error) {
				return cb(error);
			}
			let condition = {
				_id: _id
			};
			let options = {};
			__self.mongoCore.findOne(colName, condition, options, cb);
		});
	} else {
		let condition = {};
		let options = {
			"skip": 0,
			"limit": 100
		};
		options.sort = {};
		if (data && data.limit) {
			options.limit = data.limit;
		}
		if (data && data.start) {
			options.skip = data.start;
		}
		__self.mongoCore.find(colName, condition, options, (error, response) => {
			if (error) {
				return cb(error);
			} else {
				let current_count = options.skip;
				if (response && response.length) {
					current_count = current_count + response.length;
				}
				if (current_count < options.limit) {
					return cb(null, {
						"limit": options.limit,
						"start": options.skip,
						"count": response.length,
						"items": response
					});
				} else {
					__self.count(data, condition, (error, count) => {
						if (error) {
							return cb(error);
						} else {
							return cb(null, {
								"limit": options.limit,
								"start": options.skip,
								"count": count,
								"items": response
							});
						}
					});
				}
			}
		});
	}
};

Product.prototype.count = function (data, condition, cb) {
	let __self = this;
	
	let options = {};
	__self.mongoCore.countDocuments(colName, condition, options, cb);
	
};

Product.prototype.update = function (data, cb) {
	let __self = this;
	if (!data || !data.id || (!data.name && !data.description && !data.attributes)) {
		let error = new Error("Resource: id, and (name, description, or attributes) are required.");
		return cb(error, null);
	}
	__self.validateId(data.id, (error, _id) => {
		if (error) {
			return cb(error);
		}
		let condition = {
			_id: _id
		};
		
		let options = {};
		let fields = {
			'$set': {}
		};
		if (data.name) {
			fields.$set.name = data.name;
		}
		if (data.description) {
			fields.$set.description = data.description;
		}
		if (data.attributes) {
			fields.$set.attributes = data.attributes;
		}
		__self.mongoCore.updateOne(colName, condition, fields, options, (err, record) => {
			if (err) {
				return cb(err);
			}
			if (!record || (record && !record.nModified)) {
				let error = new Error("Product: [" + data.id + "] was not updated.");
				return cb(error);
			}
			return cb(null, record.nModified);
		});
	});
};

Product.prototype.delete = function (data, cb) {
	let __self = this;
	if (!data || !data.id) {
		let error = new Error("Product: id is required.");
		return cb(error, null);
	}
	__self.validateId(data.id, (error, _id) => {
		if (error) {
			return cb(error);
		}
		let condition = {
			_id: _id
		};
		let options = {};
		__self.mongoCore.deleteOne(colName, condition, options, cb);
	});
};

Product.prototype.validateId = function (id, cb) {
	let __self = this;
	
	if (!id) {
		let error = new Error("Resource: must provide an id.");
		return cb(error, null);
	}
	
	try {
		id = __self.mongoCore.ObjectId(id);
		return cb(null, id);
	} catch (e) {
		__self.log(e.message);
		return cb(new Error("A valid ID is required"), null);
	}
};
Product.prototype.closeConnection = function () {
	let __self = this;
	__self.mongoCore.closeDb();
};

module.exports = Product;