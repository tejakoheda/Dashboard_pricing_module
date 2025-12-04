// src/pages/DriverPages/DriverOnboarding.js
import { useForm } from "react-hook-form";
import "./DriverOnboarding.css";

export default function DriverOnboarding() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  // Watch for referral checkbox to conditionally render the input
  const hasReferral = watch("hasReferral");

  const onSubmit = (data) => {
    console.log("Onboarding Data:", data);

    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      // If it's a file list (from file input), append the first file
      if (data[key] instanceof FileList && data[key].length > 0) {
        formData.append(key, data[key][0]);
      } else {
        formData.append(key, data[key]);
      }
    });

    // TODO: Send formData to your backend endpoint
    alert("Driver application submitted successfully!");
  };

  return (
    <div className="dashboard-container">
      <h2 className="page-title">Driver Onboarding</h2>

      <form
        className="onboarding-container"
        onSubmit={handleSubmit(onSubmit)}
        autoComplete="off"
      >
        {/* --- 1. PERSONAL DETAILS --- */}
        <section className="onboarding-section">
          <div className="section-header">
            <div className="section-number">1</div>
            <h3 className="section-title">Personal Details</h3>
          </div>
          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">First Name</label>
              <input
                type="text"
                className={`form-control ${
                  errors.firstName ? "is-invalid" : ""
                }`}
                placeholder="e.g. Ravi"
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
                placeholder="e.g. Chary"
                {...register("lastName", { required: "Last name is required" })}
              />
              {errors.lastName && (
                <span className="error-msg">{errors.lastName.message}</span>
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
              </select>
              {errors.gender && (
                <span className="error-msg">{errors.gender.message}</span>
              )}
            </div>

            <div className="form-group">
              <label className="form-label">Phone Number</label>
              <input
                type="tel"
                className={`form-control ${errors.phone ? "is-invalid" : ""}`}
                placeholder="+91 9XXXX XXXX0"
                {...register("phone", {
                  required: "Phone number is required",
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: "Valid 10-digit number required",
                  },
                })}
              />
              {errors.phone && (
                <span className="error-msg">{errors.phone.message}</span>
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

            <div className="form-group full-width">
              <label className="form-label">Driver Selfie</label>
              <input
                type="file"
                accept="image/*"
                className={`file-input form-control ${
                  errors.selfie ? "is-invalid" : ""
                }`}
                {...register("selfie", { required: "Please upload a selfie" })}
              />
              {errors.selfie && (
                <span className="error-msg">{errors.selfie.message}</span>
              )}
            </div>
          </div>
        </section>

        {/* --- 2. ADDRESS DETAILS --- */}
        <section className="onboarding-section">
          <div className="section-header">
            <div className="section-number">2</div>
            <h3 className="section-title">Address Details</h3>
          </div>
          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">H.No / Flat No</label>
              <input
                className={`form-control ${errors.houseNo ? "is-invalid" : ""}`}
                placeholder="House No / Flat No"
                {...register("houseNo", { required: "House No is required" })}
              />
              {errors.houseNo && (
                <span className="error-msg">{errors.houseNo.message}</span>
              )}
            </div>

            <div className="form-group">
              <label className="form-label">Street / Area</label>
              <input
                className={`form-control ${errors.street ? "is-invalid" : ""}`}
                placeholder="Street Name"
                {...register("street", { required: "Street is required" })}
              />
              {errors.street && (
                <span className="error-msg">{errors.street.message}</span>
              )}
            </div>

            <div className="form-group">
              <label className="form-label">City</label>
              <input
                className={`form-control ${errors.city ? "is-invalid" : ""}`}
                placeholder="City"
                {...register("city", { required: "City is required" })}
              />
              {errors.city && (
                <span className="error-msg">{errors.city.message}</span>
              )}
            </div>

            <div className="form-group">
              <label className="form-label">District</label>
              <input
                className={`form-control ${
                  errors.district ? "is-invalid" : ""
                }`}
                placeholder="District"
                {...register("district", { required: "District is required" })}
              />
              {errors.district && (
                <span className="error-msg">{errors.district.message}</span>
              )}
            </div>

            <div className="form-group">
              <label className="form-label">Pin Code</label>
              <input
                className={`form-control ${errors.pinCode ? "is-invalid" : ""}`}
                placeholder="500001"
                {...register("pinCode", {
                  required: "Pin Code is required",
                  pattern: {
                    value: /^[0-9]{6}$/,
                    message: "Invalid 6-digit Pincode",
                  },
                })}
              />
              {errors.pinCode && (
                <span className="error-msg">{errors.pinCode.message}</span>
              )}
            </div>

            <div className="form-group">
              <label className="form-label">State</label>
              <input
                className={`form-control ${errors.state ? "is-invalid" : ""}`}
                placeholder="E.g. Telangana"
                {...register("state", { required: "State is required" })}
              />
              {errors.state && (
                <span className="error-msg">{errors.state.message}</span>
              )}
            </div>
          </div>
        </section>

        {/* --- 3. VEHICLE DETAILS --- */}
        <section className="onboarding-section">
          <div className="section-header">
            <div className="section-number">3</div>
            <h3 className="section-title">Vehicle Details</h3>
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
              <label className="form-label">Fuel Type</label>
              <select
                className={`form-control ${
                  errors.fuelType ? "is-invalid" : ""
                }`}
                {...register("fuelType", { required: "Select fuel type" })}
              >
                <option value="">Select Fuel</option>
                <option value="Petrol">Petrol</option>
                <option value="Diesel">Diesel</option>
                <option value="CNG">CNG</option>
                <option value="Electric">Electric</option>
              </select>
              {errors.fuelType && (
                <span className="error-msg">{errors.fuelType.message}</span>
              )}
            </div>

            <div className="form-group">
              <label className="form-label">Registration Number</label>
              <input
                className={`form-control ${
                  errors.regNumber ? "is-invalid" : ""
                }`}
                placeholder="TS 09 AB 1234"
                {...register("regNumber", {
                  required: "Registration Number is required",
                })}
              />
              {errors.regNumber && (
                <span className="error-msg">{errors.regNumber.message}</span>
              )}
            </div>

            <div className="form-group">
              <label className="form-label">RC Valid Till</label>
              <input
                type="date"
                className={`form-control ${
                  errors.rcExpiry ? "is-invalid" : ""
                }`}
                {...register("rcExpiry", {
                  required: "RC Expiry Date is required",
                })}
              />
              {errors.rcExpiry && (
                <span className="error-msg">{errors.rcExpiry.message}</span>
              )}
            </div>

            <div className="form-group full-width">
              <label className="form-label">Vehicle Image (Front)</label>
              <input
                type="file"
                accept="image/*"
                className={`file-input form-control ${
                  errors.vehicleImage ? "is-invalid" : ""
                }`}
                {...register("vehicleImage", {
                  required: "Vehicle image is required",
                })}
              />
              {errors.vehicleImage && (
                <span className="error-msg">{errors.vehicleImage.message}</span>
              )}
            </div>
          </div>
        </section>

        {/* --- 4. DOCUMENTS --- */}
        <section className="onboarding-section">
          <div className="section-header">
            <div className="section-number">4</div>
            <h3 className="section-title">Documents Upload</h3>
          </div>
          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">DL Front</label>
              <input
                type="file"
                className="file-input form-control"
                accept="image/*,.pdf"
                {...register("dlFront", { required: "Required" })}
              />
              {errors.dlFront && (
                <span className="error-msg">{errors.dlFront.message}</span>
              )}
            </div>
            <div className="form-group">
              <label className="form-label">DL Back</label>
              <input
                type="file"
                className="file-input form-control"
                accept="image/*,.pdf"
                {...register("dlBack", { required: "Required" })}
              />
              {errors.dlBack && (
                <span className="error-msg">{errors.dlBack.message}</span>
              )}
            </div>

            <div className="form-group">
              <label className="form-label">Aadhar Front</label>
              <input
                type="file"
                className="file-input form-control"
                accept="image/*,.pdf"
                {...register("aadharFront", { required: "Required" })}
              />
              {errors.aadharFront && (
                <span className="error-msg">{errors.aadharFront.message}</span>
              )}
            </div>
            <div className="form-group">
              <label className="form-label">Aadhar Back</label>
              <input
                type="file"
                className="file-input form-control"
                accept="image/*,.pdf"
                {...register("aadharBack", { required: "Required" })}
              />
              {errors.aadharBack && (
                <span className="error-msg">{errors.aadharBack.message}</span>
              )}
            </div>

            <div className="form-group">
              <label className="form-label">PAN Front</label>
              <input
                type="file"
                className="file-input form-control"
                accept="image/*,.pdf"
                {...register("panFront", { required: "Required" })}
              />
              {errors.panFront && (
                <span className="error-msg">{errors.panFront.message}</span>
              )}
            </div>
            <div className="form-group">
              <label className="form-label">PAN Back</label>
              <input
                type="file"
                className="file-input form-control"
                accept="image/*,.pdf"
                {...register("panBack", { required: "Required" })}
              />
              {errors.panBack && (
                <span className="error-msg">{errors.panBack.message}</span>
              )}
            </div>

            <div className="form-group">
              <label className="form-label">RC Front</label>
              <input
                type="file"
                className="file-input form-control"
                accept="image/*,.pdf"
                {...register("rcFront", { required: "Required" })}
              />
              {errors.rcFront && (
                <span className="error-msg">{errors.rcFront.message}</span>
              )}
            </div>
            <div className="form-group">
              <label className="form-label">RC Back</label>
              <input
                type="file"
                className="file-input form-control"
                accept="image/*,.pdf"
                {...register("rcBack", { required: "Required" })}
              />
              {errors.rcBack && (
                <span className="error-msg">{errors.rcBack.message}</span>
              )}
            </div>
          </div>
        </section>

        {/* --- 5. PAYOUT DETAILS --- */}
        <section className="onboarding-section">
          <div className="section-header">
            <div className="section-number">5</div>
            <h3 className="section-title">Payout Details</h3>
          </div>
          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">Bank Name</label>
              <input
                className={`form-control ${
                  errors.bankName ? "is-invalid" : ""
                }`}
                placeholder="E.g. State Bank of India"
                {...register("bankName", { required: "Bank Name is required" })}
              />
              {errors.bankName && (
                <span className="error-msg">{errors.bankName.message}</span>
              )}
            </div>

            <div className="form-group">
              <label className="form-label">Account Number</label>
              <input
                className={`form-control ${
                  errors.accountNumber ? "is-invalid" : ""
                }`}
                placeholder="Account Number"
                {...register("accountNumber", {
                  required: "Account Number is required",
                })}
              />
              {errors.accountNumber && (
                <span className="error-msg">
                  {errors.accountNumber.message}
                </span>
              )}
            </div>

            <div className="form-group">
              <label className="form-label">IFSC Code</label>
              <input
                className={`form-control ${errors.ifsc ? "is-invalid" : ""}`}
                placeholder="IFSC Code"
                {...register("ifsc", { required: "IFSC Code is required" })}
              />
              {errors.ifsc && (
                <span className="error-msg">{errors.ifsc.message}</span>
              )}
            </div>

            <div className="form-group">
              <label className="form-label">Branch Name</label>
              <input
                className={`form-control ${errors.branch ? "is-invalid" : ""}`}
                placeholder="Branch Name"
                {...register("branch", { required: "Branch Name is required" })}
              />
              {errors.branch && (
                <span className="error-msg">{errors.branch.message}</span>
              )}
            </div>

            <div className="form-group full-width">
              <label className="form-label">UPI ID</label>
              <input
                className={`form-control ${errors.upiId ? "is-invalid" : ""}`}
                placeholder="yourname@bank"
                {...register("upiId", { required: "UPI ID is required" })}
              />
              {errors.upiId && (
                <span className="error-msg">{errors.upiId.message}</span>
              )}
            </div>
          </div>
        </section>

        {/* --- 6. REFERRAL DETAILS --- */}
        <section className="onboarding-section">
          <div className="section-header">
            <div className="section-number">6</div>
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
            Submit Application
          </button>
        </div>
      </form>
    </div>
  );
}
