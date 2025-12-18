// src/context/DriverContext.js
import { createContext, useContext, useState } from "react";

const DriverContext = createContext();
export const useDriverContext = () => useContext(DriverContext);

/* -------------------- MOCK DATA -------------------- */

const mockDriverRideHistory = [
  {
    time: "2023-12-15 11:30",
    customer: "Alice Johnson",
    bookingId: "BKG-99001",
    pickup: "Jubilee Hills",
    droppedLocation: "Gachibowli",
    timeTaken: "35 mins",
    distance: "12 km",
    fare: "₹210",
  },
  {
    time: "2023-12-14 09:15",
    customer: "Bob Smith",
    bookingId: "BKG-98765",
    pickup: "Kukatpally",
    droppedLocation: "Miyapur",
    timeTaken: "25 mins",
    distance: "8 km",
    fare: "₹150",
  },
];

const initialDrivers = [
  {
    id: 101,
    firstName: "Ravi",
    lastName: "Kumar",
    phone: "9876543210",
    email: "ravi.k@example.com",
    city: "Hyderabad",
    vehicleType: "Auto",
    fuelType: "CNG",
    status: "pending",
    submittedAt: "2023-10-25 10:30",
    rideHistory: mockDriverRideHistory.slice(0, 1),
  },
  {
    id: 102,
    firstName: "Sita",
    lastName: "Lakshmi",
    phone: "9123456789",
    email: "sita.l@example.com",
    city: "Warangal",
    vehicleType: "Bike",
    fuelType: "Petrol",
    status: "verified",
    submittedAt: "2023-10-24 14:15",
    rideHistory: mockDriverRideHistory,
  },
];

const initialConsumers = [
  {
    id: "C001",
    firstName: "Alice",
    lastName: "Johnson",
    mobile: "9876543210",
    email: "alice@example.com",
    status: "Active",
    rideHistory: [],
  },
];

const initialPricingModels = [
  {
    id: 1,
    vehicle: "Auto",
    type: "flat",
    region: "Hyderabad",
    status: "Active",
    lastUpdated: "2024-12-10",
    createdBy: "Admin",
    config: { basePrice: 50, pricePerKm: 15 },
  },
];

/* -------------------- PROVIDER -------------------- */

export const DriverProvider = ({ children }) => {
  const [drivers, setDrivers] = useState(initialDrivers);
  const [consumers, setConsumers] = useState(initialConsumers);
  const [pricingModels, setPricingModels] = useState(initialPricingModels);

  /* ---------- DRIVER ACTIONS ---------- */

  const updateDriverStatus = (id, status) => {
    setDrivers((d) =>
      d.map((driver) => (driver.id === id ? { ...driver, status } : driver))
    );
  };

  const addDriver = (data) => {
    setDrivers((d) => [
      {
        ...data,
        id: Date.now(),
        status: "pending",
        submittedAt: new Date().toLocaleString(),
        rideHistory: [],
      },
      ...d,
    ]);
  };

  /* ---------- CONSUMER ACTIONS ---------- */

  const addConsumer = (data) => {
    setConsumers((c) => [
      {
        ...data,
        id: `C${Date.now().toString().slice(-4)}`,
        status: "Active",
        rideHistory: [],
      },
      ...c,
    ]);
  };

  /* ---------- PRICING ACTIONS ---------- */

  const addPricingModel = (data) => {
    setPricingModels((p) => [
      {
        ...data,
        id: Math.max(0, ...p.map((m) => m.id)) + 1,
        status: "Draft",
        lastUpdated: new Date().toLocaleDateString(),
        createdBy: "Admin",
      },
      ...p,
    ]);
  };

  const updatePricingModel = (id, updates) => {
    setPricingModels((p) =>
      p.map((m) =>
        m.id === id
          ? { ...m, ...updates, lastUpdated: new Date().toLocaleDateString() }
          : m
      )
    );
  };

  const togglePricingStatus = (id) => {
    setPricingModels((p) =>
      p.map((m) =>
        m.id === id
          ? {
              ...m,
              status: m.status === "Active" ? "Inactive" : "Active",
              lastUpdated: new Date().toLocaleDateString(),
            }
          : m
      )
    );
  };

  return (
    <DriverContext.Provider
      value={{
        drivers,
        consumers,
        pricingModels,
        addDriver,
        addConsumer,
        addPricingModel,
        updatePricingModel,
        togglePricingStatus,
        verifyDriver: (id) => updateDriverStatus(id, "verified"),
        rejectDriver: (id) => updateDriverStatus(id, "rejected"),
      }}
    >
      {children}
    </DriverContext.Provider>
  );
};
