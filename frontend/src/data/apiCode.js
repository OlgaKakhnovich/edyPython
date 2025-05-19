import axios from "axios";
import { useState } from "react";

export const executeCode = async( sourceCode, id) =>{
   try {
    
    const response = await axios.post(`/api/levels/execute/${id}`, {
      sourceCode: sourceCode,
    });

    console.log(response.data);

    return response.data;
   } catch (error) {
    console.log(error);
   }
}

