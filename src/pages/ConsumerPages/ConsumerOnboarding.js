// src/pages/ConsumerPages/ConsumerOnboarding.js
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDriverContext } from "../../context/DriverContext"; // Import Context
// Reuse styles from Driver Onboarding for visual consistency
import "../DriverPages/DriverOnboarding.css";
import "./ConsumerOnboarding.css"; // Imports the new CSS file

export default function ConsumerOnboarding() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const { addConsumer } = useDriverContext(); // Use addConsumer from context

  const onSubmit = (data) => {
    const finalData = {
      ...data,
      fullName: `${data.firstName} ${data.lastName}`,
    };

    // Send data to the context
    addConsumer(finalData);

    alert("Consumer Onboarding Submitted! Redirecting to Consumer List...");
    navigate("/consumers");
  };

  const hasReferral = watch("hasReferral");

  return (
    <div className="dashboard-container">
      <h2 className="page-title">Consumer Onboarding</h2>

      <form
        className="onboarding-container"
        onSubmit={handleSubmit(onSubmit)}
        autoComplete="off"
      >
        {/* --- 1. PERSONAL DETAILS --- */}
        <section className="onboarding-section">
          <div className="section-header">
            <div className="section-number">1</div>
            <h3 className="section-title">Consumer Details</h3>
          </div>
          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">First Name</label>
              <input
                type="text"
                className={`form-control ${
                  errors.firstName ? "is-invalid" : ""
                }`}
                placeholder="e.g. Alice"
                {...register("firstName", {
                  required: "First name is required",
                })}
              />
              {errors.firstName && (
                <span className="error-msg">{errors.firstName.message}</span>
              )}
            </div>
            <div className="form-group">
              <label className="form-label">Last Name</label>
              <input
                type="text"
                className={`form-control ${
                  errors.lastName ? "is-invalid" : ""
                }`}
                placeholder="e.g. Johnson"
                {...register("lastName", { required: "Last name is required" })}
              />
              {errors.lastName && (
                <span className="error-msg">{errors.lastName.message}</span>
              )}
            </div>

            <div className="form-group">
              <label className="form-label">Phone Number</label>
              <input
                type="tel"
                className={`form-control ${errors.mobile ? "is-invalid" : ""}`}
                placeholder="+91 9XXXX XXXX0"
                {...register("mobile", {
                  required: "Phone number is required",
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: "Valid 10-digit number required",
                  },
                })}
              />
              {errors.mobile && (
                <span className="error-msg">{errors.mobile.message}</span>
              )}
            </div>
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                className={`form-control ${errors.email ? "is-invalid" : ""}`}
                placeholder="abcd@gmail.com"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Invalid email address",
                  },
                })}
              />
              {errors.email && (
                <span className="error-msg">{errors.email.message}</span>
              )}
            </div>

            <div className="form-group">
              <label className="form-label">Gender</label>
              <select
                className={`form-control ${errors.gender ? "is-invalid" : ""}`}
                {...register("gender", { required: "Please select gender" })}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              {errors.gender && (
                <span className="error-msg">{errors.gender.message}</span>
              )}
            </div>
            <div className="form-group">
              <label className="form-label">Date of Birth</label>
              <input
                type="date"
                className={`form-control ${errors.dob ? "is-invalid" : ""}`}
                {...register("dob", {
                  required: "Date of Birth is required",
                })}
              />
              {errors.dob && (
                <span className="error-msg">{errors.dob.message}</span>
              )}
            </div>
          </div>
        </section>

        {/* --- 2. REFERRAL DETAILS (OPTIONAL) --- */}
        <section className="onboarding-section">
          <div className="section-header">
            <div className="section-number">2</div>
            <h3 className="section-title">Referral (Optional)</h3>
          </div>
          <label className="checkbox-group">
            <input
              type="checkbox"
              className="custom-checkbox"
              {...register("hasReferral")}
            />
            <span className="checkbox-label">I have a Referral Code</span>
          </label>
          {hasReferral && (
            <div
              className="form-group mt-3"
              style={{ animation: "fadeIn 0.4s" }}
            >
              <label className="form-label">Referral ID</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Code"
                {...register("referralId")}
              />
            </div>
          )}
        </section>

        <div className="form-actions">
          <button type="submit" className="btn-submit">
            Onboard Consumer
          </button>
        </div>
      </form>
    </div>
  );
}
