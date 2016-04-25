import _ from 'lodash';

export function init(io, sessionMiddleware){
  io.use(function(socket, next) {
    sessionMiddleware(socket.request, socket.request.res, next);
  });

  io.on('connection', function(socket){
    const user = socket.request.session.passport ? socket.request.session.passport.user : {};

    if(!_.isUndefined(user)){
      socket.broadcast.emit('connectUser', user.username + ' has just sign in.');
    }

    socket.on('join_hotel_edit', function (room) {
      socket.join(room);
      socket.broadcast.to(room).emit('hotel', user.username + ' is also on same page.');
    });

    socket.on('leave_hotel_edit', function (room) {
      socket.broadcast.to(room).emit('hotel', user.username + ' has left edit page.');
      socket.leave(room);

    });

    socket.on('disconnect', function () {
      socket.broadcast.emit('disconnectUser', user.username + ' has just sign out.');
    });
  });
}
