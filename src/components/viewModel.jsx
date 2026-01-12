import React from "react";
import { Modal, Button, Image } from "antd";
import useTodoStore from "../store/useStore";


///view model
export default function View() {
  const { formData, setAction, setFormData } = useTodoStore();

  //if user cancel reseting the state
  const resetForm = () =>
    (setFormData({
      image: null,
      title: "",
      description: "",
      priority: "",
      status: "",
      important: false,
    }),
    setAction(null));

  return (
    <Modal
      title={<h2 className="text-xl font-semibold text-gray-800">Todo Details</h2>}
      open
      onCancel={resetForm}
      footer={null}
      centered
      style={{ marginTop: 40, marginBottom: 40, width: 420 }}
    >
      <div className="flex flex-col gap-5">
        {formData.image && (
          <div className="flex justify-center">
            <Image
              src={formData.image}
              height={150}
              width={200}
              style={{
                objectFit: "cover",
                borderRadius: 10,
                boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
              }}
            />
          </div>
        )}

        {["Title", "Description"].map((field) => (
          <div className="bg-gray-50 p-3 rounded-md">
            <p className="text-xs uppercase tracking-wide text-gray-500">{field}</p>
            <p className={`${
              field === "Title" ? "font-semibold text-lg text-gray-800" : "text-gray-700 leading-relaxed"
            }`}>
              {formData[field.toLowerCase()]}
            </p>
          </div>
        ))}

        <div className="flex justify-between gap-4">
          {["priority", "status"].map((field) => (
            <div key={field} className="flex-1 bg-gray-50 p-3 rounded-md text-center">
              <p className="text-xs uppercase tracking-wide text-gray-500">{field}</p>
              <span
                className={`inline-block mt-1 px-3 py-1 rounded-full font-semibold text-sm ${
                  field === "status" ? formData.status === "completed" ? "bg-green-100 text-green-700": "bg-yellow-100 text-yellow-700": "bg-indigo-100 text-indigo-700"
                }`}
              >
                {formData[field]}
              </span>
            </div>
          ))}
        </div>

        <div className="bg-gray-50 p-3 rounded-md flex justify-between items-center">
          <p className="text-xs uppercase tracking-wide text-gray-500">Important</p>
          <span className={`font-semibold ${formData.important ? "text-red-600" : "text-gray-600"}`}>
            {formData.important ? "Yes" : "No"}
          </span>
        </div>

        <Button onClick={resetForm} type="primary" block className="bg-black hover:bg-gray-800 border-none py-2 text-base font-semibold">
          Close
        </Button>
      </div>
    </Modal>
  );
}
