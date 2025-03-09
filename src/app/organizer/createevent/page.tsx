"use client";

import { SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";
// import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select/base";

export default function CreateEvent() {
  const { register, handleSubmit, setValue, watch } = useForm();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [uploadedImage, setUploadedImage] = useState(null);

  const eventCategories = [
    { value: "wedding", label: "Wedding" },
    { value: "engagement", label: "Engagement" },
    { value: "baby", label: "Baby Celebration" },
    { value: "birthday", label: "Birthday" },
  ];

  const handleFileUpload = (e: any) => {
    const file = e.target.files[0];
    if (file) {
    //   setUploadedImage(URL.createObjectURL(file));
    }
  };

  const onSubmit = (data: any) => {
    console.log("Event Data:", data);
    alert("Event submitted for approval!");
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h1 className="text-2xl font-bold mb-6 text-center">Create Event</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Event Title */}
        <div>
          <label className="block text-sm font-semibold">Event Title</label>
          <input
            {...register("title", { required: true })}
            type="text"
            className="w-full border px-3 py-2 rounded mt-1"
            placeholder="Enter event title"
          />
        </div>

        {/* Date & Time */}
        <div>
          <label className="block text-sm font-semibold">Date & Time</label>
          <DatePicker
            selected={selectedDate}
            onChange={(date) => {
              setSelectedDate(date!);
              setValue("date", date);
            }}
            showTimeSelect
            dateFormat="Pp"
            className="w-full border px-3 py-2 rounded mt-1"
          />
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-semibold">Location</label>
          <input
            {...register("location", { required: true })}
            type="text"
            className="w-full border px-3 py-2 rounded mt-1"
            placeholder="Enter location or Google Maps link"
          />
        </div>

        {/* Event Category */}
        <div>
          <label className="block text-sm font-semibold">Event Category</label>
          {/* <Select
            options={eventCategories}
            className="mt-1"
            onChange={(selectedOption) => setValue("category", selectedOption?.value)}
          /> */}
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-semibold">Upload Images</label>
          <input type="file" accept="image/*" className="mt-1" onChange={handleFileUpload} />
          {uploadedImage && <img src={uploadedImage} alt="Uploaded Preview" className="mt-2 w-40 h-40 object-cover rounded" />}
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-semibold">Description</label>
          <textarea
            {...register("description")}
            className="w-full border px-3 py-2 rounded mt-1"
            placeholder="Describe your event..."
            rows={3}
          ></textarea>
        </div>

        {/* Submit Button */}
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Submit for Approval
        </button>
      </form>
    </div>
  );
}

