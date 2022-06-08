"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = handler;

var _bcryptjs = require("bcryptjs");

var _client = require("@prisma/client");

var _react = require("next-auth/react");

var prisma = new _client.PrismaClient();

function handler(req, res) {
  var session, user, _req$body, title, body, color, _user, note;

  return regeneratorRuntime.async(function handler$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap((0, _react.getSession)({
            req: req
          }));

        case 2:
          session = _context.sent;

          if (!(req.method === 'GET')) {
            _context.next = 13;
            break;
          }

          if (!session) {
            _context.next = 12;
            break;
          }

          _context.next = 7;
          return regeneratorRuntime.awrap(prisma.user.findUnique({
            where: {
              email: session.user.email
            },
            include: {
              notes: true
            }
          }));

        case 7:
          user = _context.sent;
          prisma.$disconnect();
          res.json(user);
          _context.next = 13;
          break;

        case 12:
          res.status(422).json({
            message: 'Not logged in'
          });

        case 13:
          if (!(req.method === 'POST')) {
            _context.next = 27;
            break;
          }

          _req$body = req.body, title = _req$body.title, body = _req$body.body, color = _req$body.color;

          if (!session) {
            _context.next = 26;
            break;
          }

          _context.next = 18;
          return regeneratorRuntime.awrap(prisma.user.findUnique({
            where: {
              email: session.user.email
            }
          }));

        case 18:
          _user = _context.sent;
          _context.next = 21;
          return regeneratorRuntime.awrap(prisma.note.create({
            data: {
              title: title,
              body: body,
              color: color,
              user: {
                connect: {
                  id: _user.id
                }
              }
            }
          }));

        case 21:
          note = _context.sent;
          prisma.$disconnect();
          res.json(note);
          _context.next = 27;
          break;

        case 26:
          res.status(422).json({
            message: 'Not logged in'
          });

        case 27:
        case "end":
          return _context.stop();
      }
    }
  });
}