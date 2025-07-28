import React, { useState } from "react";
import toast from "react-hot-toast/headless";
import { API_URL } from "../pages/LeaderBoard";
import axios from "axios";

const AddUserModal = ({ modalId, onSuccess }: any) => {
  const [name, setName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      return;
    }
    setIsSubmitting(true);
    try {
      await axios.post(API_URL, { name });
      toast.success(`User ${name} added successfully!`);
      setName("");
      onSuccess();
      (document.getElementById(modalId) as HTMLDialogElement | null)?.close();
    } catch (error) {
      toast.error("Failed to add user");
      console.error("Error adding user:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <dialog id={modalId} className="modal modal-bottom sm:modal-middle">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Add a New User</h3>
        <form onSubmit={handleSubmit} className="py-4 space-y-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text">User Name</span>
            </label>
            <input
              type="text"
              placeholder="Enter user name"
              className="input input-bordered w-full"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="modal-action mt-2">
            <button
              type="button"
              className="btn"
              onClick={() =>
                (
                  document.getElementById(modalId) as HTMLDialogElement | null
                )?.close()
              }
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting && (
                <span className="loading loading-spinner"></span>
              )}
              Add User
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default AddUserModal;
