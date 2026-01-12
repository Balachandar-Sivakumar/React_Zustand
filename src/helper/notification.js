import React from "react";
import { notification } from "antd";


//showing the error or success message
const showMessage = (status, message,duration=2) => {
    if(status === 'success'){
          notification.success({
              message: "Success",
              description: message,
              placement: "topRight",
              duration: duration,
          });
    }else if(status === 'warning'){
        notification.warning({
            message : "Warning",
            description : message,
            placement : 'topRight',
            duration : duration
        })
    }else{
        notification.error({
            message : "Failed",
            description : message,
            placement : "topRight",
            duration : duration
        })
    }

  return null;
};

export default showMessage;