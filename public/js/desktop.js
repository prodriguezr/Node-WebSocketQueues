// HTML Ref's
const lblDesktop       = document.querySelector('#lblDesktop');
const btnNextTicket    = document.querySelector('button');
const lblServingTicket = document.querySelector('small');
const divAlert         = document.querySelector('.alert');

const searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has('desktop')) {
    window.location = 'index.html';
    throw new Error('Desktop is required');
}

const desktop = searchParams.get('desktop');

lblDesktop.innerText = desktop;

const socket = io();

divAlert.style.display = 'none';

socket.on('connect', () => {
    btnNextTicket.disabled = false;
});

socket.on('disconnect', () => {
    btnNextTicket.disabled = true;
});

btnNextTicket.addEventListener('click', () => {
    const payload = {
        desktop,
    }
    
    socket.emit('serve-ticket', payload, ({ ok, msg, ticket }) => {
        if (!ok) {
            console.log(msg);
        } else {
            if (!ticket) {
                divAlert.style.display = '';
                lblServingTicket.innerHTML = `...`;
            } else {
                divAlert.style.display = 'none';
                lblServingTicket.innerHTML = `Ticket ${ticket.number}`;
            }
        }
    });
});

socket.on('last-ticket', (lastTicket) => {
    //    lblNewTicket.innerHTML = `Ticket ${lastTicket}`;
});