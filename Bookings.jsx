import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Bookings.css';  ``
import Navbar from './navbar';
import axios from "axios";

const ViewBooking = () => {
    const [bookings, setBookings] = useState([]);
    let token = localStorage.getItem('token');
    
    const fetchBookings = async () => {
        try {
            const response = await axios.get(`http://localhost:8181/api/v1/book/details`, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                },
            });
            setBookings(response.data.data);
        } catch (error) {
            console.error('Error fetching bookings:', error);
        }
    };

    useEffect(() => {
        fetchBookings();
    }, []);

    return (
        <div>
            <Navbar />
            <div className="bookings-container-wrapper">
                <div className="bookings-container">
                    <h2>Your Bookings</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Booking ID</th>
                                <th>Number of Persons</th>
                                <th>From Date</th>
                                <th>To Date</th>
                                <th>Total Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Array.isArray(bookings) && bookings.length > 0 ? (
                                bookings.map(booking => (
                                    <tr key={booking.id}>
                                        <td>{booking.id}</td>
                                        <td>{booking.noOfPersons}</td>
                                        <td>{booking.fromDate}</td>
                                        <td>{booking.toDate}</td>
                                        <td>{booking.totalPrice}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5">No bookings available</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <img className="side-image" src="https://res.cloudinary.com/duhmcxwo3/image/upload/v1709890174/img1_soj1nl.jpg" alt="Visual Description" />
            </div>
        </div>
    );
};

export default ViewBooking;
