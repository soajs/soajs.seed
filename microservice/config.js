/**
 * @license
 * Copyright SOAJS All Rights Reserved.
 *
 * Use of this source code is governed by an Apache license that can be
 * found in the LICENSE file at the root of this repository
 */

'use strict';

module.exports = {
	"type": 'service',
	'subType': 'demo',
	"description": "This a soajs seed demo microservice",
	prerequisites: {
		cpu: '',
		memory: ''
	},
	"serviceVersion": "1",
	"serviceName": "product",
	"serviceGroup": "Demo",
	"servicePort": 4100,
	"requestTimeout": 30,
	"requestTimeoutRenewal": 5,
	"oauth": true,
	"extKeyRequired": true,
	"urac": true,
	
	"maintenance": {
		"readiness": "/heartbeat",
		"port": {"type": "maintenance"},
		"commands": [
			{"label": "Reload Registry", "path": "/reloadRegistry", "icon": "fas fa-undo"},
			{"label": "Resource Info", "path": "/resourceInfo", "icon": "fas fa-info"}
		]
	},
	
	//-------------------------------------
	"errors": {
		400: "Business logic required data are missing",
		
		601: "Model not found",
		602: "Model error: "
	},
	"schema": {
		
		"commonFields": {
			"start": {
				"required": false,
				"source": ["query.start", "body.start"],
				"default": 0,
				"validation": {
					"type": "integer",
					"min": 0
				}
			},
			"limit": {
				"required": false,
				"source": ["query.limit", "body.limit"],
				"default": 100,
				"validation": {
					"type": "integer",
					"max": 2000
				}
			}
		},
		
		"get": {
			"/items": {
				"_apiInfo": {
					"l": "This API returns the items",
					"group": "Product"
				},
				"commonFields": ["start", "limit"]
			},
			"/item": {
				"_apiInfo": {
					"l": "This API returns an item",
					"group": "Product"
				},
				"id": {
					"source": ["query.id"],
					"required": true,
					"validation": {
						"type": "string"
					}
				}
			}
		},
		
		"delete": {
			"/item": {
				"_apiInfo": {
					"l": "This API deletes an item",
					"group": "Product"
				},
				"id": {
					"source": ["query.id"],
					"required": true,
					"validation": {
						"type": "string"
					}
				}
			}
		},
		
		"post": {
			"/item": {
				"_apiInfo": {
					"l": "This API adds an item",
					"group": "Product"
				},
				"name": {
					"source": ["body.name"],
					"required": true,
					"validation": {
						"type": "string"
					}
				},
				"description": {
					"source": ["body.description"],
					"required": true,
					"validation": {
						"type": "string"
					}
				},
				"attributes": {
					"source": ["body.attributes"],
					"validation": {
						"type": "array",
						"minItems": 1,
						"items": {
							"type": "object",
							"patternProperties": {
								"^[A-Z]+$": {
									"type": "array",
									"minItems": 1,
									"items": {
										"type": "string"
									}
								}
							}
						}
					}
				}
			}
		},
		
		"put": {
			"/item": {
				"_apiInfo": {
					"l": "This API updates an item",
					"group": "Product"
				},
				"id": {
					"source": ["body.id"],
					"required": true,
					"validation": {
						"type": "string"
					}
				},
				"name": {
					"source": ["body.name"],
					"required": true,
					"validation": {
						"type": "string"
					}
				},
				"description": {
					"source": ["body.description"],
					"required": true,
					"validation": {
						"type": "string"
					}
				},
				"attributes": {
					"source": ["body.attributes"],
					"validation": {
						"type": "array",
						"minItems": 1,
						"items": {
							"type": "object",
							"patternProperties": {
								"^[A-Z]+$": {
									"type": "array",
									"minItems": 1,
									"items": {
										"type": "string"
									}
								}
							}
						}
					}
				}
			}
		}
	}
};