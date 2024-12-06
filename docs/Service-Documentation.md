# SERVICE DOCUMENTATION

## Introduction
This document provides an overview of the microservices that are part of the Servat application. The microservices are categorized into Core Microservices, Auxiliary Microservices, Supporting Microservices, and Optional Microservices. We will discuss the purpose, features, and responsibilities of each microservice in detail. The endpoints and data models of each microservice will also be described.

## Table of Contents
1. [Core Microservices](#core-microservices)

    1. [User Service](#user-service)
    2. [Catalog Service](#catalog-service)
    3. [Booking Service](#booking-service)
    4. [Payment Service](#payment-service)
    5. [Notification Service](#notification-service)
2. [Auxiliary Microservices](#auxiliary-microservices)

    6. [Admin Service](#admin-service)
    7. [Provider Service](#provider-service)
    8. [Review Service](#review-service)
3. [Supporting Microservices](#supporting-microservices)

    9. [Location Service](#location-service)
    10. [Support Service](#support-service)
    11. [FileUpload Service](#fileupload-service)
4. [Optional Microservices](#optional-microservices)

    12. [Price Service](#price-service)
    13. [Recommendation Service](#recommendation-service)
    14. [Scheduling Service](#scheduling-service)
    15. [Coupon Service](#coupon-service)



## Core Microservices

### User Service
<details>

This service handles user registration, login, and user profile management. It manages Admin, Customers, Providers, and Guests. The User Service stores user data. provides user authentication and authorization.

#### Purpose
- Customer registration
- Customer login
- Customer profile management(Update, Delete)
- Provider registration
- Provider login
- Provider profile management(Update, Delete)
- Admin login
- Admin profile management(Update, Delete)
- Guest user management
- User authentication and authorization(JWT)
- User Blacklisting
- Manage user Verification OTPs

#### Data Models
| Customer | 
|---|
| id: String | 
| phone: String | 
| password: String | 
| verified: Boolean | 
| backlist: Boolean |
| tokens: Object[] |  
| created_at: Date |
| updated_at: Date |
| version: Number | 

| Provider | 
|---|
| id: String | 
| phone: String | 
| password: String | 
| verified: Boolean | 
| backlist: Boolean |
| contactPhone: String |
| shopName: String |
| shop_location: Location |
| shop_address: Address |
| tokens: Object[] |
| created_at: Date |
| updated_at: Date |
| version: Number | 

| Admin |
|---|
| id: String |
| phone: String |
| adminId: String |
| password: String |
| tokens: Object[] |
| created_by: Id |
| created_at: Date |
| updated_at: Date |
| version: Number |

#### Endpoints
- Customer
    - `POST /api/v1/customer/register`
    - `POST /api/v1/customer/login`
    - `GET /api/v1/customer/profile`
    - `PUT /api/v1/customer/profile`
    - `DELETE /api/v1/customer/profile`
- Provider
    - `POST /api/v1/provider/register`
    - `POST /api/v1/provider/login`
    - `GET /api/v1/provider/profile`
    - `PUT /api/v1/provider/profile`
    - `DELETE /api/v1/provider/profile`
- Admin
    - `POST /api/v1/admin/login`
    - `GET /api/v1/admin/profile`
    - `PUT /api/v1/admin/profile`
    - `DELETE /api/v1/admin/profile`

#### Events
- Customer
    - `user:customer_created`
    - `user:customer_updated`
    - `user:customer_deleted`
- Provider
    - `user:provider_created`
    - `user:provider_updated`
    - `user:provider_deleted`
- Admin
    - `user:admin_login`
    - `user:admin_updated`
    - `user:admin_deleted`

</details>

### Catalog Service

<details>

Catalog Service manages the services that are available for booking. It provides the list of services that are available for booking. It also provides the details of the services.

#### Purpose
- Add a new service
- Update a service
- Delete a service
- Get a list of services

#### Data Models

| Provider | 
|---|
| id: String | 
| contactPhone: String |
| shopName: String |
| shop_location: Location |
| shop_address: Address |
| version: Number | 

| Service |
|---|
| id: String |
| provider: Id |
| name: String |
| image: String |
| description: String |
| minPrice: Number |
| maxPrice: Number |
| duration: Number |
| created_at: Date |
| updated_at: Date |
| version: Number |


#### Endpoints
- Provider
    - `POST /api/v1/provider/service`
    - `PUT /api/v1/provider/service`
    - `DELETE /api/v1/provider/service`
    - `GET /api/v1/provider/services`
    - `GET /api/v1/provider/service/:id`

#### Events
- Provider
    - `service:service_created`
    - `service:service_updated`
    - `service:service_deleted`


</details>

### Booking Service
<details>
Booking Service manages the booking of services. It provides the ability to book a service, cancel a booking, and view the booking history.

#### Purpose
- Book a service
- Cancel a booking
- manage booking status
- Get booking history

#### Data Models
| Provider | 
|---|
| id: String | 
| contactPhone: String |
| shopName: String |
| version: Number |

| Customer | 
|---|
| id: String | 
| phone : String |
| version: Number |

| Service| 
|---|
| id: String | 
| provider: Id |
| name: String |
| description: String |
| minPrice: String |
| maxPrice: String |
| version: Number |

| Booking |
|---|
| id: String |
| customer: Id |
| provider: Id |
| service: Id |
| status: String |
| price: Number |
| provider_accepted: Boolean |
| date: Date |
| time: String |
| duration: Number |
| price: Number |
| created_at: Date |
| updated_at: Date |
| version: Number |

#### Endpoints
- Booking
    - `POST /api/v1/customer/booking`
    - `PUT /api/v1/customer/booking`
    - `PATCH /api/v1/customer/booking/:id/cancel`
    - `GET /api/v1/customer/booking`
    - `GET /api/v1/customer/booking/:id`

#### Events
- Booking
    - `booking:booking_created`
    - `booking:booking_updated`
    - `booking:booking_cancelled`

</details>

### Payment Service
<details>
The payment service handles the payment processing for the services that are booked. It provides the ability to make a payment, view payment history, and manage payment status.

#### Purpose
- Make a payment
- View payment history
- Manage payment status
- Refund payment
- Payment Gateway Integration
- Provider Payout(wallet)
#### Data Models
| Transaction |
|---|
| id: String |
| customer: Id |
| provider: Id |
| booking: Id |
| amount: Number |
| status: String |
| type: String |
| created_at: Date |
| updated_at: Date |
| version: Number |

| Wallet |
|---|
| id: String |
| provider: Id |
| balance: Number |
| Transactions: Id[] |
| created_at: Date |
| updated_at: Date |
| version: Number |

#### Endpoints
- Payment
    - `POST /api/v1/customer/payment`
    - `GET /api/v1/customer/payment`
    - `GET /api/v1/customer/payment/:id`
    - `PATCH /api/v1/customer/payment/:id/refund`
- Wallet
    - `GET /api/v1/provider/wallet`
    - `POST /api/v1/provider/wallet/payout`

#### Events
- Payment
    - `payment:payment_created`
    - `payment:payment_refunded`
- Wallet
    - `wallet:payout`
    
</details>

### Notification Service
<details>
The notification service handles the sending of notifications to the users. It provides the ability to send notifications to the users.

#### Purpose
- Send notifications to users(customers, providers, admins)
- Manage notification status
- Store notification history
- Send SMS, Email, Push Notifications.

#### Data Models
| Notification |
|---|
| id: String |
| user: Id |
| type: String |
| message: String |
| status: String |
| created_at: Date |
| updated_at: Date |
| version: Number |

| OTP |
|---|
| id: String |
| user: Id |
| code: String |
| expires_at: Date |
| status: String |
| created_at: Date |
| updated_at: Date |
| version: Number |

#### Endpoints
- Notification
    - `POST /api/v1/notification`
    - `GET /api/v1/notification`
    - `GET /api/v1/notification/:id`
    - `PATCH /api/v1/notification/:id/read`
- OTP
    - `POST /api/v1/otp`
    - `GET /api/v1/otp`
    - `GET /api/v1/otp/:id`
    - `PATCH /api/v1/otp/:id/verify`

#### Events
- Notification
    - `notification:notification_sent`
    - `notification:notification_read`
- OTP
    - `otp:otp_created`
    - `otp:otp_verified`

</details>

## Auxiliary Microservices

### Admin Service
<details>
The Admin Service provide admin interface for admin users. It provides the ability to manage providers, customers, services, bookings, and payments. 

#### Purpose
- Manage Providers
- Manage Customers
- Manage Services
- Manage Bookings
- Manage Payments
- Manage Notifications
- Manage Reviews
- Manage Support Tickets

#### Data Models
`TODO`

#### Endpoints
`TODO`

#### Events
`TODO`

</details>

### Provider Service
<details>
The Provider Service provides the ability for providers to manage their services, bookings, and payments. It provides the ability to view booking history, manage service availability, and manage service pricing.

#### Purpose
- Manage Services
- Manage Bookings
- Manage Payments
- Manage Notifications
- Manage Reviews

#### Data Models
`TODO`

#### Endpoints
`TODO`

#### Events
`TODO`

</details>

### Review Service
<details>
The Review Service provides the ability for customers to review the services that they have booked. It provides the ability to view reviews, add reviews, and delete reviews.

#### Purpose
- Add a review
- Update a review
- Delete a review
- Get a list of reviews

#### Data Models
| Reviews |
|---|
| id: String |
| customer: Id |
| provider: Id |
| service: Id |
| order: Id |
| rating: Number |
| comment: String |
| image: String |
| created_at: Date |
| updated_at: Date |
| version: Number |

#### Endpoints


#### Events
</details>

## Supporting Microservices

### Location Service
<details>
Location Service Manage the location data. It provides the ability to add, update, and delete locations. It also provides the ability to do calculation on location data.

#### Purpose
- Store Location Data: Capture and store Customers and Providers location details.
- Service Area Definition: Enable providers to define the areas they serve.
- Service Listings by Location: Filter available services for customers based on their location.
- Address Translation: Use external APIs (Ola Maps) to get the physical address from GPS coordinates.

#### Data Models
| ProviderLocation |
|---|
| id: String |
| provider: Id |
| location: Location |
| serviceArea: (Polygon - Geospatial area where the provider operates ) |
| created_at: Date |
| updated_at: Date |

| CustomerLocation |
|---|
| id: String |
| customer: Id |
| location: Location |
| created_at: Date |
| updated_at: Date |


#### Endpoints
- `POST /api/v1/location/customer`
    - Request body:
    ```json
    {
    "userId": "abc123",
    "latitude": 12.9716,
    "longitude": 77.5946
    }
    ```
    - Response:
    ```json
    {
    "id": "loc789",
    "userId": "abc123",
    "latitude": 12.9716,
    "longitude": 77.5946,
    "address": "MG Road, Bangalore, India"
    }
    ```
- `POST /api/v1/location/services`
    - Query Params:
        - `latitude`: Number
        - `longitude`: Number
        - `radius`: Number
    - Response:
    ```json
    [
        {
            "serviceId": "srv001",
            "name": "Home Cleaning",
            "providerId": "prov123",
            "distance": 3.5
        },
        {
            "serviceId": "srv002",
            "name": "AC Repair",
            "providerId": "prov124",
            "distance": 8.2
        }
    ]

    ```
- `POST /api/v1/location/provider`
    - Request body:
    ```json
    {
        "providerId": "prov123",
        "latitude": 12.9716,
        "longitude": 77.5946,
        "serviceArea": [
            [12.9700, 77.5900],
            [12.9720, 77.5900],
            [12.9720, 77.6000],
            [12.9700, 77.6000]
        ]
    }

    ```
    - Response:
    ```json
    {
        "id": "ploc456",
        "providerId": "prov123",
        "latitude": 12.9716,
        "longitude": 77.5946,
        "serviceArea": [
            [12.9700, 77.5900],
            [12.9720, 77.5900],
            [12.9720, 77.6000],
            [12.9700, 77.6000]
        ]
    }

    ```


#### Events
- `location:customer_location_saved`
- `location:provider_location_saved`
- `location:service_area_saved`

</details>

### Support Service
<details>
Support Service provides the ability for users to create support tickets. view support tickets, and manage support tickets.

#### Purpose
- Create a support ticket
- Update a support ticket
- Delete a support ticket

#### Data Models
| Support |
|---|
| id: String |
| user: Id |
| type: String |
| order: Id |
| subject: String |
| message: String |
| status: String |
| created_at: Date |
| updated_at: Date |
| version: Number |

#### Endpoints
- Support
    - `POST /api/v1/support`
    - `GET /api/v1/support`
    - `GET /api/v1/support/:id`
    - `PUT /api/v1/support/:id`
    - `DELETE /api/v1/support/:id`

#### Events
- Support
    - `support:support_created`
    - `support:support_updated`
    - `support:support_closed`

</details>

### FileUpload Service
<details>
FileUpload Service provides the ability to upload files. It provides the ability to upload images, videos, and other files.

#### Purpose
- Upload an image
- Upload a video
- Upload a file
- Serve files to appropriate services
#### Data Models
| Uploads |
|---|
| id: String |
| used: Boolean |
| entityId: String |
| entityType: String |
| mediaType: String |
| url: String |
| created_at: Date |
| version: Number |

#### Endpoints
- Upload
    - `POST /api/v1/upload`
    - `DELETE /api/v1/upload/:id`

#### Events
- Upload
    - `upload:file_uploaded`
    - `upload:file_used`

</details>

## Optional Microservices

### Price Service
<details>
Price Service provides the ability to change the pricing of services based on demand, availability, and other factors. It provides the ability to set prices, update prices, and view price history.

#### Purpose
- Dynamic pricing: Prices adjust based on demand, availability(with in minPrice and maxPrice range)
- Demand Tracking: Monitor the no.of bookings within a time period
- Availability Tracking: Check future availability of the provider.
- Real Time Pricing: Update prices in real-time based on demand and availability.
- Get price history

#### Data Models
| service |
|---|
| id: String |
| provider: Id |
| name: String |
| minPrice: Number |
| maxPrice: Number |
| currentPrice: Number |
| demandFactor: Number |
| availabilityFactor: Number |

#### Endpoints
none

#### Events
- pricing
    - `pricing:price_updated`

</details>

### Recommendation Service
<details>
Recommendation Service provides the ability to recommend services to customers based on their preferences, booking history, and other factors.

#### Purpose
- Recommend services based Customer's Past Booking and Service viewed history.

</details>

### Scheduling Service
<details>
Scheduling Service provides the ability to schedule services based on availability, provider availability, and other factors. It provides the ability to schedule services, update schedules, and view schedule history.

#### Purpose
- manage provider availability
- Schedule a service
- Reschedule a service

#### Data Models
`TODO`

#### Endpoints
`TODO`

#### Events
`TODO`

</details>

### Coupon Service
<details>
Coupon Service provides the ability to create, manage, and apply coupons to services. It provides the ability to create coupons, update coupons, and view coupon history.

#### Purpose
- Create a coupon
- Update a coupon
- Apply a coupon
- Delete a coupon
- Get a list of coupons

#### Data Models


#### Endpoints

#### Events
</details>

[top](#service-documentation)