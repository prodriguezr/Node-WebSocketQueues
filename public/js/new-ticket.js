// HTML Ref's

const lblNewTicket = document.querySelector('#lblNewTicket');
const btnCreateTicket = document.querySelector('button');

const socket = io();

socket.on('connect', () => {
    btnCreateTicket.disabled = false;
});

socket.on('disconnect', () => {
    btnCreateTicket.disabled = true;
});

btnCreateTicket.addEventListener('click', () => {
    socket.emit('request-ticket', null, (ticketNumber) => {
        lblNewTicket.innerHTML = ticketNumber;
    });
});

socket.on('last-ticket', (lastTicket) => {
    lblNewTicket.innerHTML = `Ticket ${lastTicket}`;
});