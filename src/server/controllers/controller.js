const TicketControl = require("../../models/ticket-control");

const ticketControl = new TicketControl();

const socketController = (socket) => {
    socket.on('request-ticket', (payload, callback) => {
        const next = ticketControl.next();

        callback(next);
    });

    socket.emit('last-ticket', ticketControl.last);

    socket.on('serve-ticket', ({ desktop }, callback) => {
        if (!desktop) {
            return callback({
                ok: false,
                msg: 'Desktop is required'
            });
        }
        
        const ticket = ticketControl.serveTicket(desktop);
        
        if (!ticket) {
            return callback({
                ok: true,
                msg: 'No more pending tickets'
            });
        }

        callback({
            ok: true,
            ticket
        });
        
    });
}

module.exports = {
    socketController
}