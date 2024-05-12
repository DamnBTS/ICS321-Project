import React, { useEffect, useState } from 'react';
import {
  addTicket, removeTicket, editTicket, bookSeat, promoteWaitlistedPassenger,
  getActiveFlights, getBookingPercentage, getConfirmedPayments, getWaitlistedPassengers,
  getAverageLoadFactor, getCancelledTickets
} from '../services/api';

function AdminDashboard() {
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
  const [reports, setReports] = useState({
    activeFlights: [],
    bookingPercentage: [],
    confirmedPayments: [],
    waitlistedPassengers: [],
    averageLoadFactor: [],
    cancelledTickets: [],
  });
  const [reportDate, setReportDate] = useState('');
  const [flightId, setFlightId] = useState('');

  const handleInputChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleReportDateChange = (e) => {
    setReportDate(e.target.value);
  };

  const handleFlightIdChange = (e) => {
    setFlightId(e.target.value);
  };

  const handleAddTicket = async (e) => {
    e.preventDefault();
    try {
      const newTicket = await addTicket(form);
      console.log('Ticket added:', newTicket);
    } catch (error) {
      console.error('Failed to add ticket', error);
    }
  };

  const handleRemoveTicket = async (ticketId) => {
    try {
      await removeTicket(ticketId);
      console.log('Ticket removed:', ticketId);
    } catch (error) {
      console.error('Failed to remove ticket', error);
    }
  };

  const handleEditTicket = async (ticketId) => {
    try {
      await editTicket(ticketId, form);
      console.log('Ticket edited:', ticketId);
    } catch (error) {
      console.error('Failed to edit ticket', error);
    }
  };

  const handleBookSeat = async (e) => {
    e.preventDefault();
    try {
      const response = await bookSeat(form.flightId, form.seatNo);
      console.log('Seat booked:', response);
    } catch (error) {
      console.error('Failed to book seat', error);
    }
  };

  const handlePromoteWaitlistedPassenger = async (e) => {
    e.preventDefault();
    try {
      const response = await promoteWaitlistedPassenger(form.passengerId, form.flightId);
      console.log('Waitlisted passenger promoted:', response);
    } catch (error) {
      console.error('Failed to promote waitlisted passenger', error);
    }
  };

  const fetchReports = async () => {
    try {
      const activeFlights = await getActiveFlights();
      const bookingPercentage = await getBookingPercentage(reportDate);
      const confirmedPayments = await getConfirmedPayments();
      const waitlistedPassengers = await getWaitlistedPassengers(flightId);
      const averageLoadFactor = await getAverageLoadFactor(reportDate);
      const cancelledTickets = await getCancelledTickets();

      setReports({
        activeFlights,
        bookingPercentage,
        confirmedPayments,
        waitlistedPassengers,
        averageLoadFactor,
        cancelledTickets,
      });
    } catch (error) {
      console.error('Failed to fetch reports', error);
    }
  };

  useEffect(() => {
    fetchReports();
  }, [reportDate, flightId]);

  return (
    <div>
      <h2>Admin Dashboard</h2>
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
        <input name="ticketId" value={form.id} onChange={handleInputChange} placeholder="Ticket ID" />
        <button onClick={() => handleRemoveTicket(form.id)}>Remove</button>
      </div>
      <div>
        <h3>Book Seat</h3>
        <form onSubmit={handleBookSeat}>
          <input name="flightId" value={form.flightId} onChange={handleInputChange} placeholder="Flight ID" />
          <input name="seatNo" value={form.seatNo} onChange={handleInputChange} placeholder="Seat No" />
          <button type="submit">Book Seat</button>
        </form>
      </div>
      <div>
        <h3>Promote Waitlisted Passenger</h3>
        <form onSubmit={handlePromoteWaitlistedPassenger}>
          <input name="passengerId" value={form.passengerId} onChange={handleInputChange} placeholder="Passenger ID" />
          <input name="flightId" value={form.flightId} onChange={handleInputChange} placeholder="Flight ID" />
          <button type="submit">Promote</button>
        </form>
      </div>
      <div>
        <h3>Reports</h3>
        <div>
          <h4>Current Active Flights</h4>
          <ul>
            {reports.activeFlights.map(flight => (
              <li key={flight.FlightID}>{flight.FlightID}: {flight.Status}</li>
            ))}
          </ul>
        </div>
        <div>
          <h4>Booking Percentage on a Given Date</h4>
          <input type="date" value={reportDate} onChange={handleReportDateChange} />
          <ul>
            {reports.bookingPercentage.map(bp => (
              <li key={bp.FlightID}>{bp.FlightID}: {bp.BookingPercentage}%</li>
            ))}
          </ul>
        </div>
        <div>
          <h4>Confirmed Payments</h4>
          <ul>
            {reports.confirmedPayments.map(payment => (
              <li key={payment.PaymentID}>{payment.PaymentID}: {payment.Amount}</li>
            ))}
          </ul>
        </div>
        <div>
          <h4>Waitlisted Passengers for a Flight</h4>
          <input name="flightId" value={flightId} onChange={handleFlightIdChange} placeholder="Flight ID" />
          <ul>
            {reports.waitlistedPassengers.map(passenger => (
              <li key={passenger.PassengerID}>{passenger.PassengerID}: {passenger.Status}</li>
            ))}
          </ul>
        </div>
        <div>
          <h4>Average Load Factor on a Given Date</h4>
          <input type="date" value={reportDate} onChange={handleReportDateChange} />
          <ul>
            {reports.averageLoadFactor.map(loadFactor => (
              <li key={loadFactor.FlightID}>{loadFactor.FlightID}: {loadFactor.LoadFactor}%</li>
            ))}
          </ul>
        </div>
        <div>
          <h4>Cancelled Tickets</h4>
          <ul>
            {reports.cancelledTickets.map(ticket => (
              <li key={ticket.TicketID}>{ticket.TicketID}: {ticket.Status}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
