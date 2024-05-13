import React, { useEffect, useState } from 'react';
import { getFlights, addTicket, removeTicket, editTicket, makePayment } from '../services/api';

function PassengerDashboard() {
  const [flights, setFlights] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [form, setForm] = useState({
    passengerId: '',
    flightId: '',
    seatNo: '',
    date: '',
    time: '',
    price: '',
    status: '',
    weight: '',
  });
  const [paymentForm, setPaymentForm] = useState({
    cardType: '',
    cardNumber: '',
    cardExpirationDate: '',
    cardSecurityCode: '',
    cardBillingAddress: '',
    passengerId: '',
    amount: '',
    currency: '',
  });

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const response = await getFlights();
        setFlights(response);
      } catch (error) {
        console.error('Failed to fetch flights', error);
      }
    };

    fetchFlights();
  }, []);

  const handleInputChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handlePaymentInputChange = (e) => {
    setPaymentForm({
      ...paymentForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddTicket = async (e) => {
    e.preventDefault();
    try {
      const newTicket = await addTicket(form);
      setTickets([...tickets, newTicket]);
    } catch (error) {
      console.error('Failed to add ticket', error);
    }
  };

  const handleRemoveTicket = async (ticketId) => {
    try {
      await removeTicket(ticketId);
      setTickets(tickets.filter(ticket => ticket.id !== ticketId));
    } catch (error) {
      console.error('Failed to remove ticket', error);
    }
  };

  const handleEditTicket = async (ticketId) => {
    try {
      await editTicket(ticketId, form);
      // Update the local state with the edited ticket details
      setTickets(tickets.map(ticket => (ticket.id === ticketId ? { ...ticket, ...form } : ticket)));
    } catch (error) {
      console.error('Failed to edit ticket', error);
    }
  };

  const handleMakePayment = async (e) => {
    e.preventDefault();
    try {
      const payment = await makePayment(paymentForm);
      console.log('Payment successful:', payment);
    } catch (error) {
      console.error('Failed to make payment', error);
    }
  };

  return (
    <div className="container">
      <h2>Passenger Dashboard</h2>
      <div>
        <h3>Search Flights</h3>
        <ul>
          {flights.map(flight => (
            <li key={flight.id}>{flight.name} - {flight.date}</li>
          ))}
        </ul>
      </div>
      <div>
        <h3>Add Ticket</h3>
        <form onSubmit={handleAddTicket}>
          <input name="passengerId" value={form.passengerId} onChange={handleInputChange} placeholder="Passenger ID" />
          <input name="flightId" value={form.flightId} onChange={handleInputChange} placeholder="Flight ID" />
          <input name="seatNo" value={form.seatNo} onChange={handleInputChange} placeholder="Seat No" />
          <input name="date" value={form.date} onChange={handleInputChange} placeholder="Date" />
          <input name="time" value={form.time} onChange={handleInputChange} placeholder="Time" />
          <input name="price" value={form.price} onChange={handleInputChange} placeholder="Price" />
          <input name="status" value={form.status} onChange={handleInputChange} placeholder="Status" />
          <input name="weight" value={form.weight} onChange={handleInputChange} placeholder="Weight" />
          <button type="submit">Add Ticket</button>
        </form>
      </div>
      <div>
        <h3>Edit Ticket</h3>
        <form onSubmit={(e) => { e.preventDefault(); handleEditTicket(form.id); }}>
          <input name="id" value={form.id} onChange={handleInputChange} placeholder="Ticket ID" />
          <input name="seatNo" value={form.seatNo} onChange={handleInputChange} placeholder="Seat No" />
          <input name="date" value={form.date} onChange={handleInputChange} placeholder="Date" />
          <input name="time" value={form.time} onChange={handleInputChange} placeholder="Time" />
          <input name="price" value={form.price} onChange={handleInputChange} placeholder="Price" />
          <input name="status" value={form.status} onChange={handleInputChange} placeholder="Status" />
          <input name="weight" value={form.weight} onChange={handleInputChange} placeholder="Weight" />
          <button type="submit">Edit Ticket</button>
        </form>
      </div>
      <div>
        <h3>Remove Ticket</h3>
        <ul>
          {tickets.map(ticket => (
            <li key={ticket.id}>
              {ticket.seatNo} - {ticket.date}
              <button onClick={() => handleRemoveTicket(ticket.id)}>Remove</button>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3>Make Payment</h3>
        <form onSubmit={handleMakePayment}>
          <input name="cardType" value={paymentForm.cardType} onChange={handlePaymentInputChange} placeholder="Card Type" />
          <input name="cardNumber" value={paymentForm.cardNumber} onChange={handlePaymentInputChange} placeholder="Card Number" />
          <input name="cardExpirationDate" value={paymentForm.cardExpirationDate} onChange={handlePaymentInputChange} placeholder="Card Expiration Date" />
          <input name="cardSecurityCode" value={paymentForm.cardSecurityCode} onChange={handlePaymentInputChange} placeholder="Card Security Code" />
          <input name="cardBillingAddress" value={paymentForm.cardBillingAddress} onChange={handlePaymentInputChange} placeholder="Card Billing Address" />
          <input name="passengerId" value={paymentForm.passengerId} onChange={handlePaymentInputChange} placeholder="Passenger ID" />
          <input name="amount" value={paymentForm.amount} onChange={handlePaymentInputChange} placeholder="Amount" />
          <input name="currency" value={paymentForm.currency} onChange={handlePaymentInputChange} placeholder="Currency" />
          <button type="submit">Make Payment</button>
        </form>
      </div>
    </div>
  );
}

export default PassengerDashboard;
