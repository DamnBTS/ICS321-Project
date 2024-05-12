import axios from 'axios';

const API_URL = 'http://localhost:5000';

const api = axios.create({
  baseURL: API_URL,
});


export const login = async (email, password, role) => {
  try {
    const response = await api.post('/login', { email, password, role });
    return response.data;
  } catch (error) {
    console.error('Login API error:', error);
    throw error;
  }
};

export const getPassengers = async () => {
  try {
    const response = await api.get('/passengers');
    return response.data;
  } catch (error) {
    console.error('Get Passengers API error:', error);
    throw error;
  }
};

export const getAdmins = async () => {
  try {
    const response = await api.get('/admins');
    return response.data;
  } catch (error) {
    console.error('Get Admins API error:', error);
    throw error;
  }
};

export const getFlights = async () => {
  try {
    const response = await api.get('/flights');
    return response.data;
  } catch (error) {
    console.error('Get Flights API error:', error);
    throw error;
  }
};

export const addTicket = async (ticketData) => {
  try {
    const response = await api.post('/tickets', ticketData);
    return response.data;
  } catch (error) {
    console.error('Add Ticket API error:', error);
    throw error;
  }
};

export const removeTicket = async (ticketId) => {
  try {
    await api.delete(`/tickets/${ticketId}`);
  } catch (error) {
    console.error('Remove Ticket API error:', error);
    throw error;
  }
};

export const editTicket = async (ticketId, ticketData) => {
  try {
    await api.put(`/tickets/${ticketId}`, ticketData);
  } catch (error) {
    console.error('Edit Ticket API error:', error);
    throw error;
  }
};

export const makePayment = async (paymentData) => {
  try {
    const response = await api.post('/payments', paymentData);
    return response.data;
  } catch (error) {
    console.error('Make Payment API error:', error);
    throw error;
  }
};

export const bookSeat = async (flightId, seatNo) => {
  try {
    const response = await api.post('/book-seat', { flightId, seatNo });
    return response.data;
  } catch (error) {
    console.error('Book Seat API error:', error);
    throw error;
  }
};

export const promoteWaitlistedPassenger = async (passengerId, flightId) => {
  try {
    const response = await api.post('/promote-waitlisted', { passengerId, flightId });
    return response.data;
  } catch (error) {
    console.error('Promote Waitlisted Passenger API error:', error);
    throw error;
  }
};

// Report Endpoints
export const getActiveFlights = async () => {
  try {
    const response = await api.get('/report/active-flights');
    return response.data;
  } catch (error) {
    console.error('Get Active Flights API error:', error);
    throw error;
  }
};

export const getBookingPercentage = async (date) => {
  try {
    const response = await api.get(`/report/booking-percentage/${date}`);
    return response.data;
  } catch (error) {
    console.error('Get Booking Percentage API error:', error);
    throw error;
  }
};

export const getConfirmedPayments = async () => {
  try {
    const response = await api.get('/report/confirmed-payments');
    return response.data;
  } catch (error) {
    console.error('Get Confirmed Payments API error:', error);
    throw error;
  }
};

export const getWaitlistedPassengers = async (flightId) => {
  try {
    const response = await api.get(`/report/waitlisted-passengers/${flightId}`);
    return response.data;
  } catch (error) {
    console.error('Get Waitlisted Passengers API error:', error);
    throw error;
  }
};

export const getAverageLoadFactor = async (date) => {
  try {
    const response = await api.get(`/report/average-load-factor/${date}`);
    return response.data;
  } catch (error) {
    console.error('Get Average Load Factor API error:', error);
    throw error;
  }
};

export const getCancelledTickets = async () => {
  try {
    const response = await api.get('/report/cancelled-tickets');
    return response.data;
  } catch (error) {
    console.error('Get Cancelled Tickets API error:', error);
    throw error;
  }
};
