import React, { useState } from 'react';

const UserProfile = () => {
  const [name, setName] = useState('John Doe');
  const [email, setEmail] = useState('johndoe@example.com');
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState('');
  const [editedEmail, setEditedEmail] = useState('');

  const handleEditClick = () => {
    setEditedName(name);
    setEditedEmail(email);
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    // Perform save logic here (e.g., make API request to save the changes)
    // Assuming successful save for simplicity
    setName(editedName);
    setEmail(editedEmail);
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  const handleNameChange = (event) => {
    setEditedName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEditedEmail(event.target.value);
  };

  return (
    <div>
      <h2>User Profile</h2>
      {isEditing ? (
        <div>
          <div>
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" value={editedName} onChange={handleNameChange} />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" value={editedEmail} onChange={handleEmailChange} />
          </div>
          <button onClick={handleSaveClick}>Save</button>
          <button onClick={handleCancelClick}>Cancel</button>
        </div>
      ) : (
        <div>
          <p>Name: {name}</p>
          <p>Email: {email}</p>
          <button onClick={handleEditClick}>Edit</button>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
