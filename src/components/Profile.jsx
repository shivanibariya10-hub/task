import { useState } from "react";
import "../styles/profile.css";

const Profile = () => {
  const [image, setImage] = useState(null);
  const [toast, setToast] = useState(false);

  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    role: "User"
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    setImage(URL.createObjectURL(e.target.files[0]));
  };

  // ✅ Validation
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email);
  const phoneValid = /^[0-9]{10}$/.test(user.phone);

  const formValid =
    user.name && emailValid && phoneValid;

  const handleSave = () => {
    setToast(true);
    setTimeout(() => setToast(false), 3000);
  };

  return (
    <div className="profile-card">
      {toast && <div className="toast">Profile saved successfully ✅</div>}

      <div className="profile-left">
        <img
          src={image || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"}
          alt="profile"
        />
        <input type="file" onChange={handleImage} />
      </div>

      <div className="profile-right">
        <label>Full Name</label>
        <input
          name="name"
          placeholder="Enter full name"
          value={user.name}
          onChange={handleChange}
        />

        <label>Email</label>
        <input
          name="email"
          placeholder="Enter email"
          value={user.email}
          onChange={handleChange}
        />
        {!emailValid && user.email && (
          <small className="error">Enter valid email</small>
        )}

        <label>Phone</label>
        <input
          name="phone"
          placeholder="10 digit phone number"
          value={user.phone}
          onChange={handleChange}
        />
        {!phoneValid && user.phone && (
          <small className="error">Phone must be 10 digits</small>
        )}

        <label>Role</label>
        <input value={user.role} disabled />

        <button
          className="save"
          disabled={!formValid}
          onClick={handleSave}
        >
          Save Profile
        </button>
      </div>
    </div>
  );
};

export default Profile;
