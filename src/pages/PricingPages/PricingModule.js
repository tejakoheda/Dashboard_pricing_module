// src/pages/PricingPages/PricingModule.js (Final Fix for Conditional Rendering in Modal)
import { useForm, useFieldArray } from "react-hook-form";
import { useEffect } from "react"; // Re-introduced useEffect for explicit value setting
import { useDriverContext } from "../../context/DriverContext";
import { useNavigate } from "react-router-dom";
import "../DriverPages/DriverOnboarding.css";
import "../DriverPages/drivers.css";

// Exported component: The core reusable form logic
export function PricingForm({ initialData = null, onSubmitSuccess, onClose }) {
  const {
    register,
    handleSubmit,
    watch,
    control,
    setValue, // Include setValue
    formState: { errors },
  } = useForm({
    // Use initialData directly in defaultValues
    defaultValues: {
      pricingType: initialData?.type || "flat",
      vehicleType: initialData?.vehicle || "",
      region: initialData?.region || "",
      ...initialData?.config,
      slabs: initialData?.config?.slabs || [{ min: 0, max: 5, price: 10 }],
    },
  });

  // FIX: Explicitly set the controlling field's value on mount/remount.
  // This ensures the internal 'watch' function sees the change and updates the UI.
  useEffect(() => {
    if (initialData) {
      // Force the pricingType to be set using setValue
      setValue("pricingType", initialData.type, { shouldValidate: true });
      // Set vehicleType for completeness/safety
      setValue("vehicleType", initialData.vehicle, { shouldValidate: true });
    }
    // This effect runs only when initialData (or its dependencies, like id) changes,
    // coupled with the 'key' prop on the parent modal.
  }, [initialData, setValue]);

  const selectedPricingType = watch("pricingType");

  const { fields, append, remove } = useFieldArray({
    control,
    name: "slabs",
  });

  const onSubmit = (data) => {
    // Structure the data consistently for the context
    const modelData = {
      vehicle: data.vehicleType,
      type: data.pricingType,
      region: data.region,
      config:
        data.pricingType === "flat"
          ? {
              basePrice: data.basePrice,
              pricePerKm: data.pricePerKm,
              pricePerMin: data.pricePerMin,
            }
          : data.pricingType === "slab"
          ? { slabs: data.slabs }
          : data.pricingType === "dynamic"
          ? {
              multiplier: data.multiplier,
              surchargeTime: data.surchargeTime,
              startTime: data.startTime,
              endTime: data.endTime,
            }
          : data.pricingType === "day" || data.pricingType === "event"
          ? {
              days: data.days,
              eventName: data.eventName,
              surchargeAmount: data.surchargeAmount,
              multiplier: data.multiplier,
              startDate: data.startDate,
              endDate: data.endDate,
            }
          : {},
    };

    onSubmitSuccess(modelData);
  };

  // --- Conditional Rendering Components (kept for brevity) ---

  const FlatPricingFields = () => (
    <div className="form-grid">
      <div className="form-group">
        <label className="form-label">Base Price (₹)</label>
        <input
          type="number"
          step="0.01"
          className={`form-control ${errors.basePrice ? "is-invalid" : ""}`}
          placeholder="e.g. 50"
          {...register("basePrice", {
            required: "Base Price is required",
            valueAsNumber: true,
            min: { value: 0.01, message: "Must be positive" },
          })}
        />
        {errors.basePrice && (
          <span className="error-msg">{errors.basePrice.message}</span>
        )}
      </div>
      <div className="form-group">
        <label className="form-label">Price per KM (₹)</label>
        <input
          type="number"
          step="0.01"
          className={`form-control ${errors.pricePerKm ? "is-invalid" : ""}`}
          placeholder="e.g. 15"
          {...register("pricePerKm", {
            required: "Price per KM is required",
            valueAsNumber: true,
            min: { value: 0.01, message: "Must be positive" },
          })}
        />
        {errors.pricePerKm && (
          <span className="error-msg">{errors.pricePerKm.message}</span>
        )}
      </div>
      <div className="form-group full-width">
        <label className="form-label">Price per Minute (₹)</label>
        <input
          type="number"
          step="0.01"
          className={`form-control ${errors.pricePerMin ? "is-invalid" : ""}`}
          placeholder="e.g. 2"
          {...register("pricePerMin", {
            required: "Price per Minute is required",
            valueAsNumber: true,
            min: { value: 0, message: "Cannot be negative" },
          })}
        />
        {errors.pricePerMin && (
          <span className="error-msg">{errors.pricePerMin.message}</span>
        )}
      </div>
    </div>
  );

  const SlabPricingFields = () => (
    <div className="form-group full-width">
      <h4
        className="section-title"
        style={{ fontSize: "1.1rem", marginBottom: "15px" }}
      >
        Pricing Slabs (Distance in KM)
      </h4>
      <div
        style={{ background: "#0f172a", padding: "15px", borderRadius: "10px" }}
      >
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="form-grid"
            style={{
              gap: "15px",
              marginBottom: "15px",
              borderBottom: "1px solid rgba(255,255,255,0.1)",
              paddingBottom: "15px",
            }}
          >
            <div className="form-group">
              <label className="form-label">Min KM</label>
              <input
                type="number"
                step="0.1"
                className={`form-control ${
                  errors.slabs?.[index]?.min ? "is-invalid" : ""
                }`}
                {...register(`slabs.${index}.min`, {
                  required: true,
                  valueAsNumber: true,
                  min: 0,
                })}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Max KM</label>
              <input
                type="number"
                step="0.1"
                className={`form-control ${
                  errors.slabs?.[index]?.max ? "is-invalid" : ""
                }`}
                {...register(`slabs.${index}.max`, {
                  required: true,
                  valueAsNumber: true,
                })}
              />
            </div>
            <div className="form-group" style={{ gridColumn: "span 2" }}>
              <label className="form-label">Price per KM (₹)</label>
              <input
                type="number"
                step="0.01"
                className={`form-control ${
                  errors.slabs?.[index]?.price ? "is-invalid" : ""
                }`}
                {...register(`slabs.${index}.price`, {
                  required: true,
                  valueAsNumber: true,
                  min: 0.01,
                })}
              />
            </div>
            <div
              className="form-group"
              style={{ display: "flex", alignItems: "flex-end" }}
            >
              {fields.length > 1 && (
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="btn-reject-sm"
                  style={{
                    width: "40px",
                    height: "40px",
                    background: "transparent",
                    border: "1px solid #ff8585",
                    color: "#ff8585",
                  }}
                >
                  &minus;
                </button>
              )}
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={() => append({ min: 0, max: 0, price: 0 })}
          className="btn-view-docs"
          style={{
            marginTop: "10px",
            background: "rgba(56, 189, 248, 0.15)",
            color: "#38bff8",
          }}
        >
          + Add New Slab
        </button>
      </div>
    </div>
  );

  const DynamicPricingFields = () => (
    <div className="form-grid">
      <div className="form-group">
        <label className="form-label">Base Price Multiplier</label>
        <input
          type="number"
          step="0.1"
          className={`form-control ${errors.multiplier ? "is-invalid" : ""}`}
          placeholder="e.g. 1.5 (150% of normal)"
          {...register("multiplier", {
            required: "Multiplier is required",
            valueAsNumber: true,
            min: { value: 0.1, message: "Must be positive" },
          })}
        />
        {errors.multiplier && (
          <span className="error-msg">{errors.multiplier.message}</span>
        )}
      </div>
      <div className="form-group">
        <label className="form-label">Surcharge Condition (Time)</label>
        <select
          className={`form-control ${errors.surchargeTime ? "is-invalid" : ""}`}
          {...register("surchargeTime", { required: "Condition is required" })}
        >
          <option value="">Select Condition</option>
          <option value="peak">Peak Hours</option>
          <option value="late">Late Night</option>
          <option value="rain">During Rain/Weather</option>
        </select>
        {errors.surchargeTime && (
          <span className="error-msg">{errors.surchargeTime.message}</span>
        )}
      </div>
      <div className="form-group">
        <label className="form-label">Surcharge Start Time</label>
        <input
          type="time"
          className={`form-control ${errors.startTime ? "is-invalid" : ""}`}
          {...register("startTime", { required: "Start Time is required" })}
        />
        {errors.startTime && (
          <span className="error-msg">{errors.startTime.message}</span>
        )}
      </div>
      <div className="form-group">
        <label className="form-label">Surcharge End Time</label>
        <input
          type="time"
          className={`form-control ${errors.endTime ? "is-invalid" : ""}`}
          {...register("endTime", { required: "End Time is required" })}
        />
        {errors.endTime && (
          <span className="error-msg">{errors.endTime.message}</span>
        )}
      </div>
    </div>
  );

  const DayOrEventPricingFields = ({ type }) => (
    <div className="form-grid">
      <div className="form-group full-width">
        <label className="form-label">
          {type === "day" ? "Select Day(s)" : "Event Name"}
        </label>
        {type === "day" ? (
          <select
            multiple
            size="5"
            className="form-control"
            style={{ height: "auto" }}
            {...register("days", { required: "At least one day is required" })}
          >
            {[
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
              "Sunday",
            ].map((day) => (
              <option key={day} value={day}>
                {day}
              </option>
            ))}
          </select>
        ) : (
          <input
            type="text"
            className={`form-control ${errors.eventName ? "is-invalid" : ""}`}
            placeholder="e.g. New Year's Eve"
            {...register("eventName", { required: "Event Name is required" })}
          />
        )}
        {errors.days && (
          <span className="error-msg">{errors.days.message}</span>
        )}
        {type === "event" && errors.eventName && (
          <span className="error-msg">{errors.eventName.message}</span>
        )}
      </div>
      <div className="form-group">
        <label className="form-label">Flat Surcharge (₹)</label>
        <input
          type="number"
          step="0.01"
          className={`form-control ${
            errors.surchargeAmount ? "is-invalid" : ""
          }`}
          placeholder="e.g. 100"
          {...register("surchargeAmount", { valueAsNumber: true, min: 0 })}
        />
      </div>
      <div className="form-group">
        <label className="form-label">Multiplier</label>
        <input
          type="number"
          step="0.1"
          className={`form-control ${errors.multiplier ? "is-invalid" : ""}`}
          placeholder="e.g. 1.2 (20% increase)"
          {...register("multiplier", { valueAsNumber: true, min: 1 })}
        />
      </div>
      <div className="form-group">
        <label className="form-label">Start Date</label>
        <input
          type="date"
          className={`form-control ${errors.startDate ? "is-invalid" : ""}`}
          {...register("startDate", { required: "Start Date is required" })}
        />
        {errors.startDate && (
          <span className="error-msg">{errors.startDate.message}</span>
        )}
      </div>
      <div className="form-group">
        <label className="form-label">End Date</label>
        <input
          type="date"
          className={`form-control ${errors.endDate ? "is-invalid" : ""}`}
          {...register("endDate", { required: "End Date is required" })}
        />
        {errors.endDate && (
          <span className="error-msg">{errors.endDate.message}</span>
        )}
      </div>
    </div>
  );

  const renderPricingFields = () => {
    switch (selectedPricingType) {
      case "flat":
        return <FlatPricingFields />;
      case "slab":
        return <SlabPricingFields />;
      case "dynamic":
        return <DynamicPricingFields />;
      case "day":
        return <DayOrEventPricingFields type="day" />;
      case "event":
        return <DayOrEventPricingFields type="event" />;
      default:
        return (
          <p style={{ color: "#94a3b8", padding: "10px" }}>
            Select a pricing type to configure.
          </p>
        );
    }
  };

  return (
    <form
      className="onboarding-container"
      onSubmit={handleSubmit(onSubmit)}
      autoComplete="off"
      // Adjust styles for modal or standalone use
      style={
        initialData ? { paddingBottom: 0, margin: 0, maxWidth: "100%" } : {}
      }
    >
      <div
        style={
          initialData
            ? { maxHeight: "65vh", overflowY: "auto", paddingRight: "20px" }
            : {}
        }
      >
        {/* --- 1. GENERAL CONFIGURATION --- */}
        <section className="onboarding-section">
          <div className="section-header">
            <div className="section-number">1</div>
            <h3 className="section-title">General Pricing Setup</h3>
          </div>
          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">Vehicle Type</label>
              <select
                className={`form-control ${
                  errors.vehicleType ? "is-invalid" : ""
                }`}
                {...register("vehicleType", {
                  required: "Select vehicle type",
                })}
              >
                <option value="">Select Type</option>
                <option value="Auto">Auto 🛺</option>
                <option value="Bike">Bike 🏍️</option>
                <option value="Car">Car 🚗</option>
                <option value="EV">EV 🔋</option>
              </select>
              {errors.vehicleType && (
                <span className="error-msg">{errors.vehicleType.message}</span>
              )}
            </div>

            <div className="form-group">
              <label className="form-label">Pricing Type</label>
              <select
                className={`form-control ${
                  errors.pricingType ? "is-invalid" : ""
                }`}
                {...register("pricingType", {
                  required: "Pricing type is required",
                })}
              >
                <option value="flat">Flat Pricing (Base + Per KM/Min)</option>
                <option value="slab">
                  Slab Pricing (Price changes by distance)
                </option>
                <option value="dynamic">Dynamic/Surge Pricing</option>
                <option value="day">Day-wise Pricing (e.g., Weekends)</option>
                <option value="event">Event-wise Pricing</option>
              </select>
              {errors.pricingType && (
                <span className="error-msg">{errors.pricingType.message}</span>
              )}
            </div>

            <div className="form-group full-width">
              <label className="form-label">Applicable Region/City</label>
              <input
                type="text"
                className={`form-control ${errors.region ? "is-invalid" : ""}`}
                placeholder="e.g. Hyderabad, or All Regions"
                {...register("region", { required: "Region is required" })}
              />
              {errors.region && (
                <span className="error-msg">{errors.region.message}</span>
              )}
            </div>
          </div>
        </section>

        {/* --- 2. CONDITIONAL PRICING LOGIC --- */}
        <section className="onboarding-section">
          <div className="section-header">
            <div className="section-number">2</div>
            <h3 className="section-title">
              {selectedPricingType.toUpperCase()} Configuration
            </h3>
          </div>

          <div style={{ animation: "fadeIn 0.4s" }}>
            {renderPricingFields()}
          </div>
        </section>
      </div>

      <div className="form-actions" style={{ marginTop: "20px" }}>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="btn-reject"
            style={{ marginRight: "12px" }}
          >
            Cancel
          </button>
        )}
        <button type="submit" className="btn-submit">
          {initialData ? "Save Changes" : "Create Pricing Structure"}
        </button>
      </div>
    </form>
  );
}

// Default export for the /pricing/new route
export default function PricingModulePage() {
  const { addPricingModel } = useDriverContext();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    addPricingModel({ ...data, createdBy: "Admin User" });
    alert("Pricing Structure Created!");
    navigate("/pricing/manage");
  };

  return (
    <div className="dashboard-container">
      <h2 className="page-title">Create New Pricing Structure</h2>
      <PricingForm
        onSubmitSuccess={onSubmit}
        initialData={null}
        onClose={() => navigate("/pricing/manage")}
      />
    </div>
  );
}
