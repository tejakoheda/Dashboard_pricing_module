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

// UPDATED: Added history for Alice Johnson
const initialConsumers = [
  {
    id: "C001",
    firstName: "Alice",
    lastName: "Johnson",
    mobile: "9876543210",
    email: "alice@example.com",
    status: "Active",
    rideHistory: [
      {
        time: "2023-12-20 18:45",
        bookingId: "BKG-77821",
        lastDriver: "Ravi Kumar",
        pickup: "Cyber Towers",
        droppedLocation: "Kondapur",
        timeTaken: "15 mins",
        distance: "4.2 km",
        payment: "₹120 (UPI)",
      },
      {
        time: "2023-12-18 09:30",
        bookingId: "BKG-66502",
        lastDriver: "Sita Lakshmi",
        pickup: "Miyapur Metro",
        droppedLocation: "JNTU College",
        timeTaken: "10 mins",
        distance: "3 km",
        payment: "₹80 (Cash)",
      },
      {
        time: "2023-12-10 21:15",
        bookingId: "BKG-55490",
        lastDriver: "Rajesh V",
        pickup: "Forum Mall",
        droppedLocation: "KPHB Colony",
        timeTaken: "22 mins",
        distance: "6.5 km",
        payment: "₹190 (Wallet)",
      },
    ],
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

const initialPromotions = [
  {
    id: 1,
    code: "WELCOME50",
    title: "50% Off First Ride",
    description: "Get 50% off up to ₹100 on your first booking.",
    type: "percentage", // percentage | flat
    value: 50,
    maxDiscount: 100,
    minOrderValue: 0,
    startDate: "2024-01-01",
    endDate: "2024-12-31",
    usageLimit: 1000,
    usageCount: 45,
    vehicleType: "All",
    status: "Active",
  },
  {
    id: 2,
    code: "AUTO20",
    title: "Flat ₹20 Off on Auto",
    description: "Flat discount on all Auto rides above ₹100.",
    type: "flat",
    value: 20,
    maxDiscount: 20,
    minOrderValue: 100,
    startDate: "2024-02-01",
    endDate: "2024-06-30",
    usageLimit: 500,
    usageCount: 120,
    vehicleType: "Auto",
    status: "Active",
  },
];

/* -------------------- PROVIDER -------------------- */

export const DriverProvider = ({ children }) => {
  const [drivers, setDrivers] = useState(initialDrivers);
  const [consumers, setConsumers] = useState(initialConsumers);
  const [pricingModels, setPricingModels] = useState(initialPricingModels);
  const [promotions, setPromotions] = useState(initialPromotions);

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

  /* ---------- PROMOTION ACTIONS (New) ---------- */

  const addPromotion = (data) => {
    setPromotions((prev) => [
      {
        ...data,
        id: Date.now(),
        usageCount: 0,
        status: "Active",
      },
      ...prev,
    ]);
  };

  const updatePromotion = (id, data) => {
    setPromotions((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...data } : p))
    );
  };

  const deletePromotion = (id) => {
    setPromotions((prev) => prev.filter((p) => p.id !== id));
  };

  const togglePromotionStatus = (id) => {
    setPromotions((prev) =>
      prev.map((p) =>
        p.id === id
          ? { ...p, status: p.status === "Active" ? "Inactive" : "Active" }
          : p
      )
    );
  };

  return (
    <DriverContext.Provider
      value={{
        drivers,
        consumers,
        pricingModels,
        promotions, // Exported
        addDriver,
        addConsumer,
        addPricingModel,
        updatePricingModel,
        togglePricingStatus,
        addPromotion, // Exported
        updatePromotion, // Exported
        deletePromotion, // Exported
        togglePromotionStatus, // Exported
        verifyDriver: (id) => updateDriverStatus(id, "verified"),
        rejectDriver: (id) => updateDriverStatus(id, "rejected"),
      }}
    >
      {children}
    </DriverContext.Provider>
  );
};
