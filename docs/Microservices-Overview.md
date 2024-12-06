# MICROSERVICE OVERVIEW SERVAT

## Introduction
This document is created to provide the overview of the microservices that are part of the Servat application. This document will help to understand Core Microservices, Auxiliary Microservices, Supporting Microservices, and Optional Microservices.

## Core Microservices
1. **User Service**: 
    - Handles user registration, login, and user profile management.
    - Manages Admin, Customers, Providers and Guests.
    - Stores user data and authentication information.
    - Provides user authentication and authorization.
2. **Catalog Service**:
    - Manages the services that are provided by the providers.
    - Provides the list of services that are available.
    - Provides the details of the services.
    - Provides the service availability.
    - Provides the staring price of the services.
3. **Booking Service**:
    - Manages the booking of the services.
    - Provides the booking details.
    - Provides the booking status.
    - Provides the booking history.
    - Provides the booking cancellation.
4. **Payment Service**:
    - Manages the payment of the services.
    - Provides the payment details.
    - Provides the payment status.
    - Provides the payment history.
5. **Notification Service**:
    - Manages the notifications that are sent to the users.
    - Provides the notification details.
    - Provides the notification status.
    - Provides the notification history.

## Auxiliary Microservices
6. **Admin Service**:
    - Provides an admin dashboard for managing users, services, and bookings.
    - Monitors platform analytics (e.g., revenue, service demand).
7. **Provider Service**:
    - Provides a dashboard for providers to manage their services and bookings.
    - Tracks provider availability and service history.
8. **Review Service**:
    - Manages the Reviews and Rating that are given by the users.

## Supporting Microservices
9. **Location Service**:
    - Manages the location details.
    - Provides the location details.
    - Convert the location details to the address.
10. **Support Service:**
    - Manages user feedback and support requests.
    - Provides user support and assistance.
11. **FileUpload Service:**
    - Manages file uploads for user profiles, service images, and documents.
    - Provides file storage and retrieval.

## Optional Microservices
12. **Pricing Service:**
    - Provides dynamic pricing for services based on demand and availability.
13. **Recommendation Service:**
    - Provides personalized recommendations for users based on their preferences.
14. **Scheduling Service:**
    - Manages service scheduling and availability for providers.
15. **Coupon Service:**
    - Provides discount coupons for users to apply to their bookings.

## Communication between Microservices
1. **Message Queues**: Microservices communicate asynchronously using message queues RabbitMQ.