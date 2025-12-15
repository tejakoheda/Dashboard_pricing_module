// src/context/DriverContext.js
import { createContext, useContext, useState } from "react";

const DriverContext = createContext();

export const useDriverContext = () => useContext(DriverContext);

// --- Mock Driver Ride History (Existing) ---
const mockDriverRideHistory = [
  {
    time: "2023-12-15 11:30:00",
    customer: "Alice Johnson",
    bookingId: "BKG-99001",
    pickup: "Jubilee Hills",
    droppedLocation: "Gachibowli",
    timeTaken: "35 mins",
    distance: "12 km",
    fare: "₹210.00",
  },
  {
    time: "2023-12-14 09:15:00",
    customer: "Bob Smith",
    bookingId: "BKG-98765",
    pickup: "Kukatpally",
    droppedLocation: "Miyapur",
    timeTaken: "25 mins",
    distance: "8 km",
    fare: "₹150.00",
  },
  {
    time: "2023-12-13 18:45:00",
    customer: "Charlie Brown",
    bookingId: "BKG-98003",
    pickup: "Begumpet",
    droppedLocation: "Secunderabad",
    timeTaken: "15 mins",
    distance: "5 km",
    fare: "₹95.00",
  },
];

const initialDrivers = [
  {
    id: 101,
    firstName: "Ravi",
    lastName: "Kumar",
    phone: "9876543210",
    email: "ravi.k@example.com",
    gender: "Male",
    city: "Hyderabad",
    district: "Rangareddy",
    state: "Telangana",
    pinCode: "500081",
    houseNo: "12-3/A",
    street: "Hitech City",
    vehicleType: "Auto",
    regNumber: "TS09EA1234",
    fuelType: "CNG",
    status: "pending",
    submittedAt: "2023-10-25 10:30 AM",
    selfie: null,
    vehicleImage: null,
    dlFront: null,
    rideHistory: mockDriverRideHistory.slice(0, 1),
  },
  {
    id: 102,
    firstName: "Sita",
    lastName: "Lakshmi",
    phone: "9123456789",
    email: "sita.l@example.com",
    gender: "Female",
    city: "Warangal",
    district: "Warangal Urban",
    state: "Telangana",
    pinCode: "506001",
    houseNo: "4-55",
    street: "Subedari",
    vehicleType: "Bike",
    regNumber: "TS03JK5678",
    fuelType: "Petrol",
    status: "verified",
    submittedAt: "2023-10-24 02:15 PM",
    rideHistory: mockDriverRideHistory,
  },
  {
    id: 103,
    firstName: "Ahmed",
    lastName: "Ali",
    phone: "8899776655",
    email: "ahmed.ali@example.com",
    gender: "Male",
    city: "Nizamabad",
    district: "Nizamabad",
    state: "Telangana",
    pinCode: "503001",
    houseNo: "7-8",
    street: "Khaleelwadi",
    vehicleType: "Car",
    regNumber: "TS16MN9012",
    fuelType: "Diesel",
    status: "pending",
    submittedAt: "2023-10-26 09:00 AM",
    rideHistory: [],
  },
  {
    id: 104,
    firstName: "John",
    lastName: "Doe",
    phone: "7788990011",
    email: "john.doe@example.com",
    gender: "Male",
    city: "Secunderabad",
    district: "Hyderabad",
    state: "Telangana",
    pinCode: "500003",
    houseNo: "101",
    street: "Paradise Circle",
    vehicleType: "EV",
    regNumber: "TS10EV1122",
    fuelType: "Electric",
    status: "verified",
    submittedAt: "2023-10-20 11:20 AM",
    rideHistory: mockDriverRideHistory.slice(1, 3),
  },
  {
    id: 105,
    firstName: "Priya",
    lastName: "Reddy",
    phone: "9900112233",
    email: "priya.r@example.com",
    gender: "Female",
    city: "Karimnagar",
    district: "Karimnagar",
    state: "Telangana",
    pinCode: "505001",
    houseNo: "22-A",
    street: "Mankammathota",
    vehicleType: "Scooty",
    regNumber: "TS02CD5678",
    fuelType: "Petrol",
    status: "rejected",
    submittedAt: "2023-10-22 04:45 PM",
    rideHistory: [],
  },
  {
    id: 106,
    firstName: "Karthik",
    lastName: "Raju",
    phone: "9000112233",
    email: "karthik.r@example.com",
    gender: "Male",
    city: "Khammam",
    district: "Khammam",
    state: "Telangana",
    pinCode: "507001",
    houseNo: "5-6",
    street: "Wyra Road",
    vehicleType: "Auto",
    regNumber: "TS04XY9876",
    fuelType: "Diesel",
    status: "pending",
    submittedAt: "2023-10-27 08:30 AM",
    rideHistory: [],
  },
  {
    id: 107,
    firstName: "Anusha",
    lastName: "Patel",
    phone: "9550011223",
    email: "anusha.p@example.com",
    gender: "Female",
    city: "Mahabubnagar",
    district: "Mahabubnagar",
    state: "Telangana",
    pinCode: "509001",
    houseNo: "1-2-3",
    street: "Station Road",
    vehicleType: "Car",
    regNumber: "TS06AB3456",
    fuelType: "CNG",
    status: "verified",
    submittedAt: "2023-10-21 01:10 PM",
    rideHistory: [],
  },
  {
    id: 108,
    firstName: "Vikram",
    lastName: "Singh",
    phone: "9667788990",
    email: "vikram.s@example.com",
    gender: "Male",
    city: "Hyderabad",
    district: "Hyderabad",
    state: "Telangana",
    pinCode: "500034",
    houseNo: "88/B",
    street: "Banjara Hills",
    vehicleType: "Bike",
    regNumber: "TS11ZZ0001",
    fuelType: "Petrol",
    status: "pending",
    submittedAt: "2023-10-28 10:00 AM",
    rideHistory: [],
  },
  {
    id: 109,
    firstName: "Grace",
    lastName: "Thomas",
    phone: "9112233445",
    email: "grace.t@example.com",
    gender: "Female",
    city: "Medak",
    district: "Medak",
    state: "Telangana",
    pinCode: "502110",
    houseNo: "9-10",
    street: "Church Road",
    vehicleType: "EV",
    regNumber: "TS15EV9988",
    fuelType: "Electric",
    status: "verified",
    submittedAt: "2023-10-19 03:20 PM",
    rideHistory: [],
  },
  {
    id: 110,
    firstName: "Mohan",
    lastName: "Krishna",
    phone: "9223344556",
    email: "mohan.k@example.com",
    gender: "Male",
    city: "Nalgonda",
    district: "Nalgonda",
    state: "Telangana",
    pinCode: "508001",
    houseNo: "3-4",
    street: "Clock Tower",
    vehicleType: "Auto",
    regNumber: "TS05MN4321",
    fuelType: "LPG",
    status: "rejected",
    submittedAt: "2023-10-23 12:45 PM",
    rideHistory: [],
  },
];

// --- Mock Consumer Ride History ---
const mockConsumerRideHistory = [
  {
    time: "2023-12-14 18:30:00",
    lastDriver: "Ravi Chary (D012)",
    bookingId: "BKG-98765",
    pickup: "Gachibowli",
    droppedLocation: "Kukatpally",
    timeTaken: "45 mins",
    distance: "15 km",
    payment: "Card ending 1234, ₹250.00",
  },
  {
    time: "2023-12-10 10:15:00",
    lastDriver: "Priya Singh (D045)",
    bookingId: "BKG-98001",
    pickup: "Hi-Tec City",
    droppedLocation: "Banjara Hills",
    timeTaken: "30 mins",
    distance: "10 km",
    payment: "UPI, ₹180.00",
  },
  {
    time: "2023-12-05 07:45:00",
    lastDriver: "Ashok Kumar (D101)",
    bookingId: "BKG-97523",
    pickup: "Secunderabad",
    droppedLocation: "Tarnaka",
    timeTaken: "20 mins",
    distance: "7 km",
    payment: "Cash, ₹110.00",
  },
];

// Dummy Data for Consumers (Updated with rideHistory)
const initialConsumers = [
  // Alice will have full history
  {
    id: "C001",
    firstName: "Alice",
    lastName: "Johnson",
    mobile: "9876543210",
    email: "alice@example.com",
    gender: "Female",
    dob: "1995-05-15",
    status: "Active",
    rideHistory: mockConsumerRideHistory,
  },
  // Bob will have partial history
  {
    id: "C002",
    firstName: "Bob",
    lastName: "Smith",
    mobile: "9988776655",
    email: "bob@example.com",
    gender: "Male",
    dob: "1988-01-20",
    status: "Active",
    rideHistory: mockConsumerRideHistory.slice(0, 1),
  },
  // Charlie will have no history
  {
    id: "C003",
    firstName: "Charlie",
    lastName: "Brown",
    mobile: "9000011111",
    email: "charlie@example.com",
    gender: "Male",
    dob: "2000-11-01",
    status: "Active",
    rideHistory: [],
  },
];

// Initial Pricing Data (omitted for brevity)
const initialPricingModels = [
  {
    id: 1,
    vehicle: "Auto",
    type: "flat",
    region: "Hyderabad",
    status: "Active",
    lastUpdated: "2024-12-10",
    createdBy: "Admin A",
    config: { basePrice: 50, pricePerKm: 15, pricePerMin: 2 },
  },
  {
    id: 2,
    vehicle: "Car",
    type: "slab",
    region: "All Regions",
    status: "Draft",
    lastUpdated: "2024-12-14",
    createdBy: "Admin B",
    config: {
      slabs: [
        { min: 0, max: 5, price: 10 },
        { min: 5.1, max: 20, price: 8 },
      ],
    },
  },
  {
    id: 3,
    vehicle: "Bike",
    type: "dynamic",
    region: "Bangalore",
    status: "Active",
    lastUpdated: "2024-11-01",
    createdBy: "Admin A",
    config: {
      multiplier: 1.5,
      surchargeTime: "peak",
      startTime: "17:00",
      endTime: "20:00",
    },
  },
  {
    id: 4,
    vehicle: "EV",
    type: "event",
    region: "Chennai",
    status: "Inactive",
    lastUpdated: "2024-10-25",
    createdBy: "Admin C",
    config: {
      eventName: "Pongal",
      surchargeAmount: 100,
      multiplier: 1.2,
      startDate: "2025-01-14",
      endDate: "2025-01-16",
    },
  },
  {
    id: 5,
    vehicle: "Scooty",
    type: "flat",
    region: "Hyderabad",
    status: "Active",
    lastUpdated: "2024-12-01",
    createdBy: "Admin D",
    config: { basePrice: 30, pricePerKm: 10, pricePerMin: 1.5 },
  },
];

export const DriverProvider = ({ children }) => {
  const [drivers, setDrivers] = useState(initialDrivers);
  const [consumers, setConsumers] = useState(initialConsumers);
  const [pricingModels, setPricingModels] = useState(initialPricingModels);

  const addDriver = (driverData) => {
    const newDriver = {
      ...driverData,
      id: Date.now(),
      status: "pending",
      submittedAt: new Date().toLocaleString(),
      rideHistory: [],
    };
    setDrivers((prev) => [newDriver, ...prev]);
  };

  const addConsumer = (consumerData) => {
    const newConsumer = {
      ...consumerData,
      id: `C${Date.now().toString().slice(-4)}`,
      status: "Active",
      rideHistory: [], // New consumers start with EMPTY history
    };
    setConsumers((prev) => [newConsumer, ...prev]);
  };

  // Pricing, Verification, Rejection functions (omitted for brevity)
  const addPricingModel = (modelData) => {
    const maxId =
      pricingModels.length > 0
        ? Math.max(...pricingModels.map((model) => model.id))
        : 0;

    const newModel = {
      ...modelData,
      id: maxId + 1,
      status: "Draft",
      lastUpdated: new Date().toLocaleDateString(),
      createdBy: "Admin User",
    };
    setPricingModels((prev) => [newModel, ...prev]);
  };

  const updatePricingModel = (id, updatedData) => {
    setPricingModels((prev) =>
      prev.map((model) =>
        model.id === id
          ? {
              ...model,
              ...updatedData,
              lastUpdated: new Date().toLocaleDateString(),
            }
          : model
      )
    );
  };

  const togglePricingStatus = (id) => {
    setPricingModels((prev) =>
      prev.map((model) =>
        model.id === id
          ? {
              ...model,
              status: model.status === "Active" ? "Inactive" : "Active",
              lastUpdated: new Date().toLocaleDateString(),
            }
          : model
      )
    );
  };

  const verifyDriver = (id) => {
    setDrivers((prev) =>
      prev.map((driver) =>
        driver.id === id ? { ...driver, status: "verified" } : driver
      )
    );
  };

  const rejectDriver = (id) => {
    setDrivers((prev) =>
      prev.map((driver) =>
        driver.id === id ? { ...driver, status: "rejected" } : driver
      )
    );
  };

  return (
    <DriverContext.Provider
      value={{
        drivers,
        addDriver,
        verifyDriver,
        rejectDriver,
        consumers,
        addConsumer,
        pricingModels,
        addPricingModel,
        updatePricingModel,
        togglePricingStatus,
      }}
    >
      {children}
    </DriverContext.Provider>
  );
};
