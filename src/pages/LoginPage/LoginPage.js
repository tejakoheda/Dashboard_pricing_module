// src/pages/LoginPage.js
import { useKeycloak } from "@react-keycloak/web";
import "./login.css";

export default function LoginPage() {
  const { keycloak } = useKeycloak();

  const openPopupLogin = async () => {
    const url = await keycloak.createLoginUrl({
      redirectUri: `${window.location.origin}/keycloak-popup-callback.html`,
    });

    const w = 420,
      h = 640;
    const left = window.screenX + (window.innerWidth - w) / 2;
    const top = window.screenY + (window.innerHeight - h) / 2;

    window.open(
      url,
      "kc_login_popup",
      `width=${w},height=${h},left=${left},top=${top}`
    );
  };

  return (
    <div className="bg">
      <div className="prelogin-wrapper">
        <div className="hero-card">
          <img
            src="https://www.voltacabs.com/assets/img/logo/volta-logo.png"
            alt="Volta hero"
            className="hero-img"
          />
          <div className="hero-copy">
            <p className="hero-pre">WELCOME TO VOLTA!</p>
            <h1 className="hero-title">
              India's Fastest
              <br />
              Growing
              <br />
              <span className="hero-highlight">0% Commission</span>
              <br />
              Mobility App.
            </h1>
            <p className="hero-sub">
              Book your Auto, Bike-Taxi, and Car Rides instantly with the Volta
              App. Last-mile delivery & parcel services. 0% Commission, No
              Middlemen.
            </p>
          </div>
        </div>

        <div className="auth-card">
          <h2 className="card-title">Volta Admin Dashboard</h2>
          <p className="card-sub">Sign in to manage fleet & operations</p>

          <div className="card-actions">
            <button className="btn primary" onClick={openPopupLogin}>
              Login with Keycloak
            </button>
          </div>

          <p className="card-footer">
            By logging in you agree to Volta's terms and privacy.
          </p>
        </div>
      </div>
    </div>
  );
}
