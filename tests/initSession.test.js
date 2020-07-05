// test structure: AAA -> arrange, act, assert.
// test ranges: initilazation, positive, negative, errors.

// further tests:
//    test internal processes -> scripts
//    test routes
//    test errors

const initSession = require('../scripts/initSession');
const session = require('express-session');
const request = require('supertest');
const express = require('express');

describe('Server session tests', () => {
	describe('Constructor', () => {
		it('should return a session constructor function', () => {
			// setup (Arrange)
			const defaultSession = session({
				resave: false,
				saveUninitialized: false,
				secret: 'shhh'
			});
			const initSessionMock = jest.fn();
			initSessionMock.mockReturnValue(defaultSession);

			// Act
			const sessionInstance = initSession(session);
			const mockInstance = initSessionMock();

			// Assert
			expect(typeof sessionInstance).toEqual(typeof mockInstance);
		});
	});

	describe('Initialization', () => {
		let stubbedResponse;

		// make mock request
		beforeAll(async () => {

			// setup supertest server and session config
			const app = express();
			app.use(initSession(session));
			app.get('/', (req, res) => res.status(200).json(req.session));
      const agent = request.agent(app);
      
      // make request
      stubbedResponse = await agent.get('/');
      return;
		});

		it('request should create a session', () => {
			// Assert
			expect(stubbedResponse.status).toEqual(200);
			expect(stubbedResponse.body).toHaveProperty('cookie');
		});
		describe('verify config', () => {
		
			it('cookie toHaveProperty maAge, greater or equal to 24hrs', () => {
        // Assert
				expect(stubbedResponse.body.cookie).toHaveProperty('originalMaxAge');
				expect(stubbedResponse.body.cookie.originalMaxAge).toBeGreaterThanOrEqual(86400000);
      });
      
      it('cookie toHaveProperty httpOnly, set to false', () => {
        // Assert
				expect(stubbedResponse.body.cookie).toHaveProperty('httpOnly');
				expect(stubbedResponse.body.cookie.httpOnly).toBe(false);
			});
		});
  });
  
  describe('Request Error', () => {
		let stubbedResponse;

		// make mock request
		beforeAll(async () => {

			// setup supertest server and session config
			const app = express();
			app.use(initSession(session));
      const agent = request.agent(app);
      
      // make request
      stubbedResponse = await agent.get('/');
      return;
		});

		it('request to no existing route should return 404 with no session', () => {
      // Assert
			expect(stubbedResponse.status).toEqual(404);
			expect(stubbedResponse.body).not.toHaveProperty('cookie');
		});
		
	});
});
