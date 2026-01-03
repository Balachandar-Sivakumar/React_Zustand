import React from "react";
import { notification } from "antd";


//showing the error or success message
const showMessage = (status, message) => {
    if (status === "success") {
        notification.success({
            title: "Success",
            description: `${message}`,
            placement: "topRight",
            duration: 2,
        });
    }else{
          notification.error({
                title : "error",
                description : `${message}`,
                placement : 'topRight',
                duration :2
            })
    }
};

export default showMessage;